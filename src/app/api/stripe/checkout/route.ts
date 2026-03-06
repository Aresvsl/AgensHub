import { createSupabaseServer } from "@/lib/supabase-server"
import { stripe, PLANS } from "@/lib/stripe"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    const supabase = await createSupabaseServer()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { planId } = body as { planId: keyof typeof PLANS }

    if (!planId || !PLANS[planId]) {
        return NextResponse.json({ error: "Invalid plan" }, { status: 400 })
    }

    const plan = PLANS[planId]

    // Get or create Stripe customer
    const { data: profile } = await supabase
        .from("profiles")
        .select("stripe_customer_id, email")
        .eq("id", user.id)
        .single()

    let customerId = profile?.stripe_customer_id

    if (!customerId) {
        const customer = await stripe.customers.create({
            email: profile?.email ?? user.email,
            metadata: { supabase_user_id: user.id },
        })
        customerId = customer.id

        await supabase
            .from("profiles")
            .update({ stripe_customer_id: customerId })
            .eq("id", user.id)
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
        customer: customerId,
        mode: "subscription",
        line_items: [{ price: plan.priceId, quantity: 1 }],
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?checkout=success`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?checkout=cancelled`,
        metadata: {
            supabase_user_id: user.id,
            plan_id: planId,
        },
    })

    return NextResponse.json({ url: session.url })
}
