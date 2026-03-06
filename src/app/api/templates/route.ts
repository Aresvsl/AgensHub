import { createSupabaseServer } from "@/lib/supabase-server"
import { NextResponse } from "next/server"

export async function GET() {
    const supabase = await createSupabaseServer()
    if (!supabase) {
        return NextResponse.json({ error: "Service unavailable" }, { status: 503 })
    }
    const { data, error } = await supabase
        .from("templates")
        .select("*")
        .order("download_count", { ascending: false })

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
}
