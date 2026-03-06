"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Bot, Star, Users, Activity, Download, Settings, Play, ExternalLink, Clock, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const agent = {
    name: "AI Sales Closer",
    category: "Sales",
    rating: 4.9,
    users: "2.4k",
    description: "An advanced AI agent that converts qualified leads into loyal customers through intelligent conversational sales. Uses GPT-4 to understand buyer intent, handle objections, and close deals via chat, email, or WhatsApp.",
    gradient: "from-[#6366F1] to-[#8B5CF6]",
    features: [
        "Contextual objection handling",
        "Multi-channel support (chat, email, WhatsApp)",
        "Auto follow-up sequences",
        "Integration with 20+ CRMs",
        "Real-time buyer intent scoring",
        "Custom persona configuration",
    ],
    stats: [
        { label: "Avg Close Rate", value: "34%", icon: Activity },
        { label: "Avg Response", value: "0.8s", icon: Clock },
        { label: "Uptime", value: "99.9%", icon: CheckCircle2 },
    ],
    changelog: [
        { version: "2.4.0", date: "Mar 2, 2026", changes: "Added WhatsApp Business integration" },
        { version: "2.3.1", date: "Feb 18, 2026", changes: "Improved objection handling accuracy by 12%" },
        { version: "2.3.0", date: "Feb 5, 2026", changes: "New multi-language support (50+ languages)" },
    ],
}

export default function AgentDetailPage() {
    return (
        <div className="max-w-5xl space-y-8">
            <Link href="/dashboard/agents" className="flex items-center gap-2 text-[13px] text-[#9CA3AF] hover:text-white transition-colors w-fit group">
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" /> Back to agents
            </Link>

            {/* Header */}
            <div className="flex flex-col md:flex-row gap-8 items-start">
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${agent.gradient} flex items-center justify-center shadow-glow-lg flex-shrink-0`}>
                    <Bot className="w-9 h-9 text-white" />
                </motion.div>
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-3xl font-bold text-white tracking-tight">{agent.name}</h1>
                        <Badge className="bg-[#6366F1]/10 text-[#6366F1] border border-[#6366F1]/20 text-[10px]">{agent.category}</Badge>
                    </div>
                    <p className="text-[#9CA3AF] text-[15px] font-light leading-relaxed mb-4 max-w-2xl">{agent.description}</p>
                    <div className="flex items-center gap-6 text-[13px] text-[#9CA3AF]">
                        <span className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5 text-[#6366F1] fill-[#6366F1]" /> {agent.rating}</span>
                        <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> {agent.users} users</span>
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

            {/* Performance stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {agent.stats.map((stat, i) => (
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

            {/* Features & Changelog */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="card-premium p-8">
                    <h3 className="text-[16px] font-semibold text-white mb-6">Features</h3>
                    <div className="space-y-3">
                        {agent.features.map((feature, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="w-5 h-5 rounded-full bg-[#6366F1]/20 flex items-center justify-center">
                                    <CheckCircle2 className="w-3 h-3 text-[#6366F1]" />
                                </div>
                                <span className="text-[14px] text-[#9CA3AF]">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="card-premium p-8">
                    <h3 className="text-[16px] font-semibold text-white mb-6">Changelog</h3>
                    <div className="space-y-5">
                        {agent.changelog.map((entry, i) => (
                            <div key={i} className="relative pl-6">
                                <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-[#6366F1]" />
                                {i < agent.changelog.length - 1 && <div className="absolute left-[3px] top-4 w-px h-full bg-white/[0.04]" />}
                                <div className="flex items-center gap-2 mb-1">
                                    <Badge className="bg-white/[0.04] border border-white/[0.06] text-white text-[10px] font-mono">v{entry.version}</Badge>
                                    <span className="text-[11px] text-[#9CA3AF]">{entry.date}</span>
                                </div>
                                <p className="text-[13px] text-[#9CA3AF] font-light">{entry.changes}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
