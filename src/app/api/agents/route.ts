import { createSupabaseServer } from "@/lib/supabase-server"
import { NextResponse } from "next/server"

export async function GET() {
    const supabase = await createSupabaseServer()
    const { data, error } = await supabase
        .from("agents")
        .select("*")
        .order("users_count", { ascending: false })

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
}
