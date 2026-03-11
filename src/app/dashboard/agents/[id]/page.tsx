"use client"

import { use } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Bot, Star, Users, Activity, Settings, Play, Clock, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useApiData } from "@/hooks/use-api-data"

// Fallback used while loading or if API is unavailable
const FALLBACK_AGENT = {
    name: "Loading...",
    category: "",
    stars: 0,
    users_count: 0,
    description: "",
    features: [] as string[],
    version: "—",
    install_guide: "",
}

export default function AgentDetailPage({ params }: { params: Promise<{ id: string }> }) {
    // FIXED: Use the actual `id` param from the URL instead of showing a
    // hardcoded agent. React 19 / Next.js 16 requires `use()` to unwrap params.
    const { id } = use(params)

    const { data: agent, loading } = useApiData(
        `/api/agents/${id}`,
        FALLBACK_AGENT
    )

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-8 h-8 border-2 border-[#6366F1] border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

    return (
        <div className="max-w-5xl space-y-8">
            <Link href="/dashboard/agents" className="flex items-center gap-2 text-[13px] text-[#9CA3AF] hover:text-white transition-colors w-fit group">
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" /> Back to agents
            </Link>

            {/* Header */}
            <div className="flex flex-col md:flex-row gap-8 items-start">
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center shadow-glow-lg flex-shrink-0">
                    <Bot className="w-9 h-9 text-white" />
                </motion.div>
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-3xl font-bold text-white tracking-tight">{agent.name}</h1>
                        {agent.category && (
                            <Badge className="bg-[#6366F1]/10 text-[#6366F1] border border-[#6366F1]/20 text-[10px]">{agent.category}</Badge>
                        )}
                    </div>
                    <p className="text-[#9CA3AF] text-[15px] font-light leading-relaxed mb-4 max-w-2xl">{agent.description}</p>
                    <div className="flex items-center gap-6 text-[13px] text-[#9CA3AF]">
                        <span className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5 text-[#6366F1] fill-[#6366F1]" /> {agent.stars}</span>
                        <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> {agent.users_count} users</span>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="border-white/[0.06] text-white rounded-xl h-10 px-5 text-[13px] hover:bg-white/[0.04]">
                        <Settings className="w-3.5 h-3.5 mr-2" /> Configure
                    </Button>
                    <Button className="bg-[#6366F1] hover:bg-[#5558E6] text-white rounded-xl h-10 px-6 text-[13px] font-medium shadow-glow transition-all group">
                        <Play className="w-3.5 h-3.5 mr-2" /> Deploy Agent
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                    { label: "Rating", value: agent.stars, icon: Activity },
                    { label: "Version", value: agent.version, icon: Clock },
                    { label: "Users", value: agent.users_count, icon: CheckCircle2 },
                ].map((stat, i) => (
                    <div key={i} className="card-premium p-6 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-[#6366F1]/10 border border-[#6366F1]/10 flex items-center justify-center">
                            <stat.icon className="w-5 h-5 text-[#6366F1]" />
                        </div>
                        <div>
                            <div className="text-xl font-bold text-white">{stat.value}</div>
                            <div className="text-[12px] text-[#9CA3AF] font-medium">{stat.label}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Features & Install guide */}
            {(agent.features?.length > 0 || agent.install_guide) && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {agent.features?.length > 0 && (
                        <div className="card-premium p-8">
                            <h3 className="text-[16px] font-semibold text-white mb-6">Features</h3>
                            <div className="space-y-3">
                                {agent.features.map((feature: string, i: number) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="w-5 h-5 rounded-full bg-[#6366F1]/20 flex items-center justify-center">
                                            <CheckCircle2 className="w-3 h-3 text-[#6366F1]" />
                                        </div>
                                        <span className="text-[14px] text-[#9CA3AF]">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {agent.install_guide && (
                        <div className="card-premium p-8">
                            <h3 className="text-[16px] font-semibold text-white mb-6">Install Guide</h3>
                            <p className="text-[14px] text-[#9CA3AF] leading-relaxed whitespace-pre-line">{agent.install_guide}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
