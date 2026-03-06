import { stripe } from "@/lib/stripe"
import { createSupabaseAdmin } from "@/lib/supabase-server"
import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

export async function POST(request: NextRequest) {
    const body = await request.text()
    const signature = request.headers.get("stripe-signature")

    if (!signature) {
        return NextResponse.json({ error: "Missing signature" }, { status: 400 })
    }

    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error"
        console.error(`Webhook signature verification failed: ${message}`)
        return NextResponse.json({ error: message }, { status: 400 })
    }

    const supabase = await createSupabaseAdmin()
    if (!supabase) {
        return NextResponse.json({ error: "Service unavailable" }, { status: 503 })
    }

    switch (event.type) {
        case "checkout.session.completed": {
            const session = event.data.object as Stripe.Checkout.Session
            const userId = session.metadata?.supabase_user_id
            const planId = session.metadata?.plan_id

            if (userId && planId) {
                await supabase
                    .from("profiles")
                    .update({
                        plan: planId,
                        stripe_subscription_id: session.subscription as string,
                    })
                    .eq("id", userId)
            }
            break
        }

        case "customer.subscription.updated": {
            const subscription = event.data.object as Stripe.Subscription
            const customerId = subscription.customer as string

            const { data: profile } = await supabase
                .from("profiles")
                .select("id")
                .eq("stripe_customer_id", customerId)
                .single()

            if (profile) {
                const status = subscription.status
                if (status === "active") {
                    // Plan stays active
                } else if (status === "canceled" || status === "unpaid") {
                    await supabase
                        .from("profiles")
                        .update({ plan: "free", stripe_subscription_id: null })
                        .eq("id", profile.id)
                }
            }
            break
        }

        case "customer.subscription.deleted": {
            const subscription = event.data.object as Stripe.Subscription
            const customerId = subscription.customer as string

            await supabase
                .from("profiles")
                .update({ plan: "free", stripe_subscription_id: null })
                .eq("stripe_customer_id", customerId)
            break
        }

        case "invoice.payment_failed": {
            const invoice = event.data.object as Stripe.Invoice
            const customerId = invoice.customer as string
            console.error(`Payment failed for customer ${customerId}`)
            // TODO: Send email notification
            break
        }
    }

    return NextResponse.json({ received: true })
}
