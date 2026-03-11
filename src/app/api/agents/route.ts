import { createSupabaseServer } from "@/lib/supabase-server"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
    const supabase = await createSupabaseServer()
    if (!supabase) {
        return NextResponse.json({ error: "Service unavailable" }, { status: 503 })
    }

    // Support fetching a single agent by ID via query param
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (id) {
        const { data, error } = await supabase
            .from("agents")
            .select("*")
            .eq("id", id)
            .single()

        if (error) {
            return NextResponse.json({ error: "Agent not found" }, { status: 404 })
        }
        return NextResponse.json(data)
    }

    const { data, error } = await supabase
        .from("agents")
        .select("*")
        .order("users_count", { ascending: false })

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
}
