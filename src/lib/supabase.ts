import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith('http')
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null

export type Profile = {
    id: string
    email: string
    plan: 'free' | 'starter' | 'pro' | 'agency'
    created_at: string
}

export type Agent = {
    id: string
    name: string
    description: string
    category: string
    download_url?: string
    install_guide?: string
    stars: number
    users_count: number
    created_at: string
}

export type Template = {
    id: string
    name: string
    description: string
    tech_stack: string[]
    download_url?: string
    created_at: string
}
