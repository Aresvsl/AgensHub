import { createSupabaseServer } from "@/lib/supabase-server"
import { stripe } from "@/lib/stripe"
import { NextResponse } from "next/server"

export async function POST() {
    const supabase = await createSupabaseServer()
    if (!supabase) {
        return NextResponse.json({ error: "Service unavailable" }, { status: 503 })
    }
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: profile } = await supabase
        .from("profiles")
        .select("stripe_customer_id")
        .eq("id", user.id)
        .single()

    if (!profile?.stripe_customer_id) {
        return NextResponse.json({ error: "No billing account found" }, { status: 404 })
    }

    const session = await stripe.billingPortal.sessions.create({
        customer: profile.stripe_customer_id,
        return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/account`,
    })

    return NextResponse.json({ url: session.url })
}
