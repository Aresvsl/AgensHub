"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
    Zap, Activity, TrendingUp, Clock, ArrowRight, ArrowUpRight,
    Plus, Bot, BarChart3, Sparkles, CheckCircle2, Users
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/toast-provider"
import { CreateWorkflowModal } from "@/components/dashboard/CreateWorkflowModal"
import Link from "next/link"

const stats = [
    { label: "Active Agents", value: "12", change: "+3", trend: "up", icon: Zap, color: "purple" },
    { label: "Requests/hour", value: "1.4k", change: "+12%", trend: "up", icon: Activity, color: "violet" },
    { label: "Revenue (auto)", value: "$4,280", change: "+$850", trend: "up", icon: TrendingUp, color: "emerald" },
    { label: "Time Saved", value: "142h", change: "Pro", trend: "neutral", icon: Clock, color: "cyan" },
]

const activity = [
    { agent: "Sales Closer AI", action: "Closed 3 deals worth $12,400", time: "2m ago", type: "success" },
    { agent: "Support Bot Pro", action: "Resolved 12 tickets with 98% CSAT", time: "8m ago", type: "success" },
    { agent: "Content Writer", action: "Generated 5 SEO articles", time: "15m ago", type: "success" },
    { agent: "Lead Scorer", action: "Qualified 28 new leads", time: "23m ago", type: "success" },
]

const topAgents = [
    { name: "Sales Closer AI", score: 94, requests: "2.1k", trend: [65, 72, 68, 85, 78, 92, 94] },
    { name: "Support Bot Pro", score: 87, requests: "1.8k", trend: [45, 52, 60, 55, 70, 78, 87] },
    { name: "Content Writer", score: 72, requests: "890", trend: [30, 35, 42, 50, 55, 65, 72] },
    { name: "Lead Scorer", score: 68, requests: "650", trend: [40, 38, 45, 52, 58, 60, 68] },
]

export default function DashboardHome() {
    const [modalOpen, setModalOpen] = useState(false)
    const { showToast } = useToast()

    return (
        <div className="space-y-6">
            <CreateWorkflowModal open={modalOpen} onClose={() => {
                setModalOpen(false)
                showToast("Workflow created successfully!")
            }} />

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Overview</h1>
                    <p className="text-[#71717A] mt-1 text-[15px] font-light">Your agents automated <span className="text-white font-medium">42 tasks</span> in the last 24 hours.</p>
                </div>
                <Button onClick={() => setModalOpen(true)}
                    className="h-10 px-5 text-[13px] font-medium bg-[#6366F1] hover:bg-[#5558E6] text-white rounded-xl shadow-glow transition-all btn-shine group">
                    <Plus className="w-4 h-4 mr-2" /> New Workflow
                </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className={`stat-card ${stat.color} p-6 group cursor-default`}>
                        <div className="flex justify-between items-start mb-5">
                            <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.04] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <stat.icon className="w-[18px] h-[18px] text-[#71717A] group-hover:text-[#6366F1] transition-colors duration-300" />
                            </div>
                            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${stat.trend === "up" ? "text-emerald-400 bg-emerald-500/10" : "text-[#71717A] bg-white/[0.04]"
                                }`}>{stat.change}</span>
                        </div>
                        <div className="text-[28px] font-bold text-white tracking-tight mb-1 leading-none">{stat.value}</div>
                        <div className="text-[12px] text-[#71717A] font-medium tracking-wide uppercase">{stat.label}</div>
                    </motion.div>
                ))}
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

                {/* Performance Chart */}
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                    className="lg:col-span-8 card-premium p-8">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h3 className="text-[16px] font-semibold text-white">Agent Performance</h3>
                            <p className="text-[12px] text-[#71717A] mt-1">Efficiency score based on 1.4k requests today</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                <div className="w-2 h-2 rounded-full bg-emerald-500 absolute inset-0 animate-ping opacity-75" />
                            </div>
                            <Badge className="bg-white/[0.03] border border-white/[0.06] text-[#71717A] text-[10px] font-medium">Live</Badge>
                        </div>
                    </div>

                    {/* Top agents with sparklines */}
                    <div className="space-y-4">
                        {topAgents.map((agent, idx) => (
                            <motion.div key={idx} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + idx * 0.08 }}
                                className="flex items-center gap-5 p-4 rounded-xl hover:bg-white/[0.02] transition-all group cursor-pointer">
                                {/* Rank */}
                                <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-bold ${idx === 0 ? "bg-[#6366F1]/15 text-[#6366F1]" : "bg-white/[0.03] text-[#71717A]"
                                    }`}>
                                    {idx + 1}
                                </div>

                                {/* Agent info */}
                                <div className="flex-1 min-w-0">
                                    <div className="text-[14px] font-medium text-white group-hover:text-[#6366F1] transition-colors">{agent.name}</div>
                                    <div className="text-[11px] text-[#71717A]">{agent.requests} requests</div>
                                </div>

                                {/* Mini sparkline */}
                                <div className="flex items-end gap-[3px] h-8">
                                    {agent.trend.map((v, j) => (
                                        <motion.div key={j} initial={{ height: 0 }} animate={{ height: `${(v / 100) * 32}px` }}
                                            transition={{ delay: 0.5 + idx * 0.08 + j * 0.04, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                            className={`w-[4px] rounded-full ${j === agent.trend.length - 1 ? "bg-[#6366F1]" : "bg-white/[0.06]"
                                                }`} />
                                    ))}
                                </div>

                                {/* Score */}
                                <div className="text-right">
                                    <div className="text-[18px] font-bold text-white">{agent.score}%</div>
                                </div>

                                <ArrowUpRight className="w-4 h-4 text-[#71717A]/0 group-hover:text-[#71717A] transition-all" />
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-6 pt-5 border-t border-white/[0.04] flex justify-between items-center">
                        <div className="flex items-center gap-4 text-[12px] text-[#71717A]">
                            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#6366F1]" /> Current</span>
                            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-white/[0.06]" /> Previous</span>
                        </div>
                        <Link href="/dashboard/analytics">
                            <Button variant="ghost" className="text-[#6366F1] text-[13px] font-medium h-8 px-3 rounded-lg hover:bg-[#6366F1]/10 group">
                                View analytics <ArrowRight className="ml-1 w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                            </Button>
                        </Link>
                    </div>
                </motion.div>

                {/* Right column */}
                <div className="lg:col-span-4 space-y-4">

                    {/* Activity Feed */}
                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
                        className="card-premium p-6">
                        <div className="flex justify-between items-center mb-5">
                            <h3 className="text-[14px] font-semibold text-white">Recent Activity</h3>
                            <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] font-semibold">LIVE</Badge>
                        </div>
                        <div className="space-y-1">
                            {activity.map((item, i) => (
                                <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.08 }}
                                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/[0.02] transition-colors group cursor-pointer">
                                    <div className="w-8 h-8 rounded-lg bg-[#6366F1]/8 border border-[#6366F1]/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#6366F1]/15 transition-colors">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-[13px] font-medium text-white truncate">{item.agent}</div>
                                        <div className="text-[11px] text-[#71717A] truncate">{item.action}</div>
                                    </div>
                                    <span className="text-[10px] text-[#71717A]/60 flex-shrink-0 mt-1">{item.time}</span>
                                </motion.div>
                            ))}
                        </div>
                        <Link href="/dashboard/logs">
                            <Button variant="ghost" className="w-full mt-3 text-[#71717A] text-[12px] font-medium h-9 rounded-xl hover:text-white hover:bg-white/[0.03]">
                                View all activity →
                            </Button>
                        </Link>
                    </motion.div>

                    {/* Quick Actions */}
                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
                        className="card-premium p-6">
                        <h3 className="text-[14px] font-semibold text-white mb-4">Quick Actions</h3>
                        <div className="grid grid-cols-2 gap-2">
                            {[
                                { label: "New Agent", icon: Bot, href: "/dashboard/agents" },
                                { label: "Analytics", icon: BarChart3, href: "/dashboard/analytics" },
                                { label: "Templates", icon: Sparkles, href: "/dashboard/templates" },
                                { label: "Team", icon: Users, href: "/dashboard/team" },
                            ].map((action, i) => (
                                <Link key={i} href={action.href}>
                                    <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 + i * 0.05 }}
                                        className="w-full flex flex-col items-center gap-2 p-4 rounded-xl bg-white/[0.02] border border-white/[0.03] hover:bg-white/[0.04] hover:border-white/[0.06] transition-all group">
                                        <action.icon className="w-5 h-5 text-[#71717A] group-hover:text-[#6366F1] transition-colors" />
                                        <span className="text-[11px] font-medium text-[#71717A] group-hover:text-white transition-colors">{action.label}</span>
                                    </motion.button>
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
