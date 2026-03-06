-- ============================================
-- AgensHub Database Schema for Supabase
-- Run this in Supabase SQL Editor
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. PROFILES (extends Supabase auth.users)
-- ============================================
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    plan TEXT NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'starter', 'pro', 'agency')),
    role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    stripe_customer_id TEXT,
    stripe_subscription_id TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', '')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- 2. AGENTS
-- ============================================
CREATE TABLE public.agents (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    icon TEXT DEFAULT 'bot',
    stars NUMERIC DEFAULT 0,
    users_count INTEGER DEFAULT 0,
    version TEXT DEFAULT '1.0.0',
    download_url TEXT,
    install_guide TEXT,
    features TEXT[] DEFAULT '{}',
    is_premium BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- 3. TEMPLATES
-- ============================================
CREATE TABLE public.templates (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    tech_stack TEXT[] DEFAULT '{}',
    download_url TEXT,
    download_count INTEGER DEFAULT 0,
    is_premium BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- 4. USER AGENTS (installed agents per user)
-- ============================================
CREATE TABLE public.user_agents (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    agent_id UUID REFERENCES public.agents(id) ON DELETE CASCADE NOT NULL,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'paused', 'stopped')),
    installed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, agent_id)
);

-- ============================================
-- 5. API KEYS
-- ============================================
CREATE TABLE public.api_keys (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    key_hash TEXT NOT NULL,
    key_prefix TEXT NOT NULL,
    last_used_at TIMESTAMPTZ,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'revoked')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- 6. TEAMS
-- ============================================
CREATE TABLE public.teams (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    owner_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.team_members (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    role TEXT DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member', 'viewer')),
    status TEXT DEFAULT 'pending' CHECK (status IN ('active', 'pending', 'removed')),
    invited_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    joined_at TIMESTAMPTZ,
    UNIQUE(team_id, email)
);

-- ============================================
-- 7. AGENT EXECUTION LOGS
-- ============================================
CREATE TABLE public.agent_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    agent_id UUID REFERENCES public.agents(id) ON DELETE SET NULL,
    agent_name TEXT NOT NULL,
    action TEXT NOT NULL,
    status TEXT DEFAULT 'success' CHECK (status IN ('success', 'error', 'warning', 'running')),
    duration_ms INTEGER,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- 8. USER SETTINGS
-- ============================================
CREATE TABLE public.user_settings (
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE PRIMARY KEY,
    workspace_name TEXT DEFAULT 'My Workspace',
    timezone TEXT DEFAULT 'America/Sao_Paulo',
    language TEXT DEFAULT 'pt-BR',
    theme TEXT DEFAULT 'dark',
    sidebar_collapsed BOOLEAN DEFAULT false,
    notifications JSONB DEFAULT '{"deployment_alerts": true, "weekly_reports": true, "team_activity": false, "billing_reminders": true, "system_maintenance": false}',
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- 9. MARKETPLACE ITEMS
-- ============================================
CREATE TABLE public.marketplace_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    creator_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    price NUMERIC DEFAULT 0,
    rating NUMERIC DEFAULT 0,
    downloads INTEGER DEFAULT 0,
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

-- Profiles: users can read all, update own
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Profiles are viewable by owner" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Agents: public read
ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Agents are publicly viewable" ON public.agents FOR SELECT USING (true);

-- Templates: public read
ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Templates are publicly viewable" ON public.templates FOR SELECT USING (true);

-- User Agents: users see own
ALTER TABLE public.user_agents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see own agents" ON public.user_agents FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users manage own agents" ON public.user_agents FOR ALL USING (auth.uid() = user_id);

-- API Keys: users see own
ALTER TABLE public.api_keys ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see own keys" ON public.api_keys FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users manage own keys" ON public.api_keys FOR ALL USING (auth.uid() = user_id);

-- Teams: members see their teams
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Team owners manage teams" ON public.teams FOR ALL USING (auth.uid() = owner_id);

ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Team members visible" ON public.team_members FOR SELECT
    USING (team_id IN (SELECT id FROM public.teams WHERE owner_id = auth.uid()));
CREATE POLICY "Team owners manage members" ON public.team_members FOR ALL
    USING (team_id IN (SELECT id FROM public.teams WHERE owner_id = auth.uid()));

-- Logs: users see own
ALTER TABLE public.agent_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see own logs" ON public.agent_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users create own logs" ON public.agent_logs FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Settings: users see own
ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see own settings" ON public.user_settings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users manage own settings" ON public.user_settings FOR ALL USING (auth.uid() = user_id);

-- Marketplace: public read, creator manage
ALTER TABLE public.marketplace_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Marketplace public read" ON public.marketplace_items FOR SELECT USING (true);
CREATE POLICY "Creators manage items" ON public.marketplace_items FOR ALL USING (auth.uid() = creator_id);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX idx_user_agents_user ON public.user_agents(user_id);
CREATE INDEX idx_api_keys_user ON public.api_keys(user_id);
CREATE INDEX idx_agent_logs_user ON public.agent_logs(user_id);
CREATE INDEX idx_agent_logs_created ON public.agent_logs(created_at DESC);
CREATE INDEX idx_team_members_team ON public.team_members(team_id);
CREATE INDEX idx_marketplace_category ON public.marketplace_items(category);
