import { createSupabaseServer } from "@/lib/supabase-server"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
    const supabase = await createSupabaseServer()
    if (!supabase) {
        return NextResponse.json({ error: "Service unavailable" }, { status: 503 })
    }
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
    if (!supabase) {
        return NextResponse.json({ error: "Service unavailable" }, { status: 503 })
    }
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()

    // FIXED: Whitelist allowed fields to prevent injecting arbitrary columns
    // (e.g. user_id, updated_at, or any future sensitive fields)
    const ALLOWED_FIELDS = [
        "workspace_name",
        "timezone",
        "language",
        "theme",
        "sidebar_collapsed",
        "notifications",
    ] as const

    type AllowedField = typeof ALLOWED_FIELDS[number]

    const sanitized = ALLOWED_FIELDS.reduce<Partial<Record<AllowedField, unknown>>>(
        (acc, field) => {
            if (field in body) acc[field] = body[field]
            return acc
        },
        {}
    )

    if (Object.keys(sanitized).length === 0) {
        return NextResponse.json({ error: "No valid fields provided" }, { status: 400 })
    }

    const { data, error } = await supabase
        .from("user_settings")
        .upsert({
            user_id: user.id,
            ...sanitized,
            updated_at: new Date().toISOString(),
        })
        .select()
        .single()

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
}
