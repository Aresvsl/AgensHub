import { createSupabaseServer } from "@/lib/supabase-server"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
    const supabase = await createSupabaseServer()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data, error } = await supabase
        .from("user_settings")
        .select("*")
        .eq("user_id", user.id)
        .single()

    if (error && error.code !== "PGRST116") {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Return defaults if no settings exist
    return NextResponse.json(data ?? {
        workspace_name: "My Workspace",
        timezone: "America/Sao_Paulo",
        language: "pt-BR",
        theme: "dark",
        sidebar_collapsed: false,
        notifications: {
            deployment_alerts: true,
            weekly_reports: true,
            team_activity: false,
            billing_reminders: true,
            system_maintenance: false,
        },
    })
}

export async function PUT(request: NextRequest) {
    const supabase = await createSupabaseServer()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()

    const { data, error } = await supabase
        .from("user_settings")
        .upsert({
            user_id: user.id,
            ...body,
            updated_at: new Date().toISOString(),
        })
        .select()
        .single()

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
}
