"use client"

import { motion } from "framer-motion"
import { BarChart3, TrendingUp, Users, Clock, ArrowRight, Activity, Bot, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const metrics = [
    { label: "Total Requests", value: "0", change: "0%", icon: Activity },
    { label: "Active Users", value: "0", change: "0", icon: Users },
    { label: "Avg Response", value: "0s", change: "0s", icon: Clock },
    { label: "Revenue", value: "$0", change: "0%", icon: TrendingUp },
]

const topAgents: { name: string; requests: number; success: number; trend: number[] }[] = []

const dailyData = [
    { day: "Mon", value: 0 },
    { day: "Tue", value: 0 },
    { day: "Wed", value: 0 },
    { day: "Thu", value: 0 },
    { day: "Fri", value: 0 },
    { day: "Sat", value: 0 },
    { day: "Sun", value: 0 },
]
const maxDaily = Math.max(1, ...dailyData.map(d => d.value))

export default function AnalyticsPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">Analytics</h1>
                <p className="text-[#9CA3AF] mt-1 text-[15px] font-light">Real-time platform performance and usage metrics.</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {metrics.map((stat, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                        className="card-premium p-6">
                        <div className="flex justify-between items-start mb-6">
                            <div className="w-9 h-9 rounded-xl bg-[#6366F1]/10 border border-[#6366F1]/10 flex items-center justify-center">
                                <stat.icon className="w-4 h-4 text-[#6366F1]" />
                            </div>
                            <span className="text-[11px] font-medium text-emerald-400">{stat.change}</span>
                        </div>
                        <div className="text-2xl font-bold text-white tracking-tight mb-1">{stat.value}</div>
                        <div className="text-[12px] text-[#9CA3AF] font-medium">{stat.label}</div>
                    </motion.div>
                ))}
            </div>

            {/* Charts row */}
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
                {/* Bar chart */}
                <div className="lg:col-span-4 card-premium p-8">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-[16px] font-semibold text-white">Requests this week</h3>
                        <Badge className="bg-white/[0.04] border border-white/[0.06] text-[#9CA3AF] text-[10px] font-medium">Last 7 days</Badge>
                    </div>
                    <div className="flex items-end gap-3 h-48">
                        {dailyData.map((d, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-2">
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${(d.value / maxDaily) * 100}%` }}
                                    transition={{ duration: 0.8, delay: i * 0.1 }}
                                    className="w-full bg-gradient-to-t from-[#6366F1] to-[#8B5CF6] rounded-t-lg relative group cursor-pointer"
                                >
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#111118] border border-white/[0.06] text-white text-[10px] font-medium px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-premium">
                                        {d.value.toLocaleString()}
                                    </div>
                                </motion.div>
                                <span className="text-[10px] text-[#9CA3AF]/60 font-medium">{d.day}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top agents */}
                <div className="lg:col-span-3 card-premium p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-[16px] font-semibold text-white">Top Agents</h3>
                        <Button variant="ghost" className="text-[#6366F1] text-[12px] font-medium h-7 px-2 rounded-lg hover:bg-[#6366F1]/10">
                            View all
                        </Button>
                    </div>
                    <div className="space-y-4">
                        {topAgents.map((agent, i) => (
                            <div key={i} className="flex items-center gap-4 group">
                                <div className="w-8 h-8 rounded-xl bg-[#6366F1]/10 flex items-center justify-center flex-shrink-0">
                                    <Bot className="w-3.5 h-3.5 text-[#6366F1]" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-[13px] font-medium text-white truncate">{agent.name}</div>
                                    <div className="text-[11px] text-[#9CA3AF]">{agent.requests.toLocaleString()} requests</div>
                                </div>
                                {/* Mini sparkline */}
                                <div className="flex items-end gap-px h-6">
                                    {agent.trend.map((v, j) => (
                                        <div key={j} className="w-1 bg-[#6366F1]/40 rounded-full" style={{ height: `${(v / 85) * 100}%` }} />
                                    ))}
                                </div>
                                <span className="text-[11px] font-semibold text-emerald-400">{agent.success}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Usage breakdown */}
            <div className="card-premium p-8">
                <h3 className="text-[16px] font-semibold text-white mb-6">Usage Breakdown</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { label: "API Calls", used: 0, limit: 50000, color: "bg-[#6366F1]" },
                        { label: "Storage", used: 0, limit: 10, unit: "GB", color: "bg-[#8B5CF6]" },
                        { label: "Agents Deployed", used: 0, limit: 25, color: "bg-emerald-500" },
                    ].map((item, i) => (
                        <div key={i} className="space-y-3">
                            <div className="flex justify-between text-[13px]">
                                <span className="text-[#9CA3AF] font-medium">{item.label}</span>
                                <span className="text-white font-semibold">
                                    {typeof item.used === "number" && item.used > 100 ? item.used.toLocaleString() : item.used}
                                    {item.unit ? ` ${item.unit}` : ""} / {typeof item.limit === "number" && item.limit > 100 ? item.limit.toLocaleString() : item.limit}
                                    {item.unit ? ` ${item.unit}` : ""}
                                </span>
                            </div>
                            <div className="h-2 bg-white/[0.04] rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${(Number(item.used) / Number(item.limit)) * 100}%` }}
                                    transition={{ duration: 1, delay: i * 0.15 }}
                                    className={`h-full ${item.color} rounded-full`}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
