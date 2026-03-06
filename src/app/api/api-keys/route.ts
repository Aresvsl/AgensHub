import { createSupabaseServer } from "@/lib/supabase-server"
import { NextRequest, NextResponse } from "next/server"
import { randomBytes, createHash } from "crypto"

function generateApiKey(prefix: string): string {
    const random = randomBytes(24).toString("base64url")
    return `${prefix}_${random}`
}

function hashKey(key: string): string {
    return createHash("sha256").update(key).digest("hex")
}

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
        .from("api_keys")
        .select("id, name, key_prefix, status, last_used_at, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
}

export async function POST(request: NextRequest) {
    const supabase = await createSupabaseServer()
    if (!supabase) {
        return NextResponse.json({ error: "Service unavailable" }, { status: 503 })
    }
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { name } = body

    if (!name) {
        return NextResponse.json({ error: "Name is required" }, { status: 400 })
    }

    // Check key limit (max 5 per user on free plan)
    const { count } = await supabase
        .from("api_keys")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id)
        .eq("status", "active")

    if ((count ?? 0) >= 5) {
        return NextResponse.json({ error: "API key limit reached. Upgrade your plan for more." }, { status: 403 })
    }

    const prefix = name.toLowerCase().includes("prod") ? "sk_live" :
        name.toLowerCase().includes("stag") ? "sk_stag" : "sk_test"
    const fullKey = generateApiKey(prefix)
    const keyHash = hashKey(fullKey)
    const keyPrefix = fullKey.substring(0, prefix.length + 5)

    const { data, error } = await supabase
        .from("api_keys")
        .insert({
            user_id: user.id,
            name,
            key_hash: keyHash,
            key_prefix: keyPrefix,
        })
        .select()
        .single()

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Return the full key only on creation (never stored in plaintext)
    return NextResponse.json({ ...data, key: fullKey }, { status: 201 })
}

export async function DELETE(request: NextRequest) {
    const supabase = await createSupabaseServer()
    if (!supabase) {
        return NextResponse.json({ error: "Service unavailable" }, { status: 503 })
    }
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const keyId = searchParams.get("id")

    if (!keyId) {
        return NextResponse.json({ error: "Key ID required" }, { status: 400 })
    }

    const { error } = await supabase
        .from("api_keys")
        .update({ status: "revoked" })
        .eq("id", keyId)
        .eq("user_id", user.id)

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
}
