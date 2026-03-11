import { createSupabaseServer } from "@/lib/supabase-server"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
    _request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params

    const supabase = await createSupabaseServer()
    if (!supabase) {
        return NextResponse.json({ error: "Service unavailable" }, { status: 503 })
    }

    const { data, error } = await supabase
        .from("agents")
        .select("*")
        .eq("id", id)
        .single()

    if (error || !data) {
        return NextResponse.json({ error: "Agent not found" }, { status: 404 })
    }

    return NextResponse.json(data)
}
