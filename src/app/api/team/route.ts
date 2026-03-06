import { createSupabaseServer } from "@/lib/supabase-server"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
    const supabase = await createSupabaseServer()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get user's team
    const { data: teams } = await supabase
        .from("teams")
        .select("id")
        .eq("owner_id", user.id)
        .single()

    if (!teams) {
        return NextResponse.json({ team: null, members: [] })
    }

    const { data: members } = await supabase
        .from("team_members")
        .select("*")
        .eq("team_id", teams.id)
        .order("invited_at", { ascending: false })

    return NextResponse.json({ team: teams, members: members ?? [] })
}

export async function POST(request: NextRequest) {
    const supabase = await createSupabaseServer()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { email, role = "member" } = body

    if (!email) {
        return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Get or create team
    let { data: team } = await supabase
        .from("teams")
        .select("id")
        .eq("owner_id", user.id)
        .single()

    if (!team) {
        const { data: newTeam, error: teamError } = await supabase
            .from("teams")
            .insert({ name: "My Team", owner_id: user.id })
            .select()
            .single()

        if (teamError || !newTeam) {
            return NextResponse.json({ error: teamError?.message ?? "Failed to create team" }, { status: 500 })
        }
        team = newTeam
    }

    const teamId = team!.id

    // Invite member
    const { data, error } = await supabase
        .from("team_members")
        .insert({
            team_id: teamId,
            email,
            role,
            status: "pending",
        })
        .select()
        .single()

    if (error) {
        if (error.code === "23505") {
            return NextResponse.json({ error: "This email is already invited" }, { status: 409 })
        }
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data, { status: 201 })
}

export async function DELETE(request: NextRequest) {
    const supabase = await createSupabaseServer()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const memberId = searchParams.get("id")

    if (!memberId) {
        return NextResponse.json({ error: "Member ID required" }, { status: 400 })
    }

    const { error } = await supabase
        .from("team_members")
        .delete()
        .eq("id", memberId)

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
}
