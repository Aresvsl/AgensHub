"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Sparkles, Zap, Bot, TrendingUp, CheckCircle2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const floatingStats = [
    { label: "Active Agents", value: "2,847", icon: Bot },
    { label: "Tasks/min", value: "12.4k", icon: Zap },
    { label: "Accuracy", value: "99.2%", icon: CheckCircle2 },
]

export function Hero() {
    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-24 overflow-hidden">
            {/* Mesh grid */}
            <div className="absolute inset-0 mesh-grid [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

            {/* Aurora glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] pointer-events-none">
                <div className="absolute inset-0 bg-[#6366F1]/[0.07] rounded-full blur-[150px] animate-pulse" style={{ animationDuration: "8s" }} />
                <div className="absolute top-[20%] -right-[20%] w-[600px] h-[500px] bg-[#8B5CF6]/[0.05] rounded-full blur-[120px]" />
                <div className="absolute top-[40%] -left-[10%] w-[400px] h-[400px] bg-[#22D3EE]/[0.03] rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.6 }}
                >
                    <Badge className="mb-8 bg-white/[0.03] border border-white/[0.06] text-[#71717A] text-[11px] font-medium px-4 py-2 rounded-full hover:border-[#6366F1]/30 transition-all cursor-default backdrop-blur-xl">
                        <span className="relative flex items-center gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6366F1] opacity-75" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#6366F1]" />
                            </span>
                            Now in Public Beta — 2,847 agents deployed
                        </span>
                    </Badge>
                </motion.div>

                {/* Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-6xl md:text-[92px] font-bold tracking-[-0.04em] leading-[0.88] mb-8"
                >
                    <span className="text-white">AI agents that</span>
                    <br />
                    <span className="text-gradient-animated">think and act.</span>
                </motion.h1>

                {/* Subheading */}
                <motion.p
                    initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="text-lg md:text-xl text-[#71717A] max-w-2xl mx-auto mb-12 leading-relaxed font-light"
                >
                    Deploy autonomous workflows that handle your business operations 24/7.
                    <br className="hidden md:block" />
                    Built for founders who demand <span className="text-white font-medium">precision at scale</span>.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
                >
                    <Button className="h-12 px-8 text-[14px] font-medium bg-[#6366F1] hover:bg-[#5558E6] text-white rounded-2xl shadow-glow-lg transition-all duration-300 btn-shine group">
                        Start building free
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </Button>
                    <Button variant="ghost" className="h-12 px-8 text-[14px] font-medium text-[#71717A] hover:text-white hover:bg-white/[0.04] rounded-2xl transition-all duration-300 border border-white/[0.04] hover:border-white/[0.08]">
                        <Play className="mr-2 w-3.5 h-3.5 fill-current" />
                        Watch demo
                    </Button>
                </motion.div>

                {/* Dashboard Mockup */}
                <motion.div
                    initial={{ opacity: 0, y: 60, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 1.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="relative max-w-6xl mx-auto"
                >
                    {/* Glow behind mockup */}
                    <div className="absolute -inset-8 bg-gradient-to-b from-[#6366F1]/10 to-transparent rounded-[40px] blur-[60px] pointer-events-none" />

                    {/* Outer gradient border */}
                    <div className="absolute -inset-[1px] rounded-[28px] bg-gradient-to-b from-white/[0.1] via-white/[0.03] to-transparent pointer-events-none" />

                    <div className="bg-[#0F0F14] rounded-[28px] border border-white/[0.04] overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.8)]">
                        {/* Title bar */}
                        <div className="h-11 border-b border-white/[0.04] flex items-center px-5 gap-2 bg-white/[0.01]">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#FF5F57]/80" />
                                <div className="w-3 h-3 rounded-full bg-[#FEBC2E]/80" />
                                <div className="w-3 h-3 rounded-full bg-[#28C840]/80" />
                            </div>
                            <div className="flex-1 flex justify-center">
                                <div className="h-6 w-52 bg-white/[0.03] rounded-lg flex items-center justify-center">
                                    <span className="text-[10px] text-[#71717A]/50">app.agenshub.com/dashboard</span>
                                </div>
                            </div>
                        </div>

                        {/* Mockup content */}
                        <div className="flex min-h-[440px]">
                            {/* Sidebar */}
                            <div className="w-52 border-r border-white/[0.04] p-4 space-y-2 hidden md:block bg-white/[0.005]">
                                <div className="flex items-center gap-2 mb-6 px-2">
                                    <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center">
                                        <Sparkles className="w-3 h-3 text-white" />
                                    </div>
                                    <span className="text-[11px] font-semibold text-white">AgensHub</span>
                                </div>
                                {["Overview", "AI Agents", "Templates", "Builder", "Analytics"].map((item, i) => (
                                    <div key={i} className={`h-8 w-full rounded-lg ${i === 0 ? "bg-[#6366F1]/10 border border-[#6366F1]/20" : "bg-transparent hover:bg-white/[0.02]"} flex items-center px-3`}>
                                        <span className={`text-[11px] ${i === 0 ? "text-[#6366F1] font-medium" : "text-[#71717A]"}`}>{item}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Main */}
                            <div className="flex-1 p-6 space-y-4">
                                {/* Stats row */}
                                <div className="flex gap-3">
                                    {[
                                        { label: "Active Agents", value: "12", color: "from-[#6366F1]/20 to-[#6366F1]/5" },
                                        { label: "Requests/hr", value: "1.4k", color: "from-[#8B5CF6]/20 to-[#8B5CF6]/5" },
                                        { label: "Revenue", value: "$4.2k", color: "from-emerald-500/20 to-emerald-500/5" },
                                    ].map((stat, i) => (
                                        <div key={i} className={`flex-1 h-24 bg-gradient-to-br ${stat.color} rounded-xl border border-white/[0.04] p-4 flex flex-col justify-between`}>
                                            <span className="text-[9px] text-[#71717A] uppercase tracking-wider">{stat.label}</span>
                                            <span className="text-[20px] font-bold text-white">{stat.value}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Chart area */}
                                <div className="h-52 bg-white/[0.015] rounded-xl border border-white/[0.04] p-5">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-[11px] font-medium text-white">Performance</span>
                                        <span className="text-[9px] text-[#71717A]">Last 7 days</span>
                                    </div>
                                    {/* Fake chart bars */}
                                    <div className="flex items-end gap-[6px] h-28">
                                        {[45, 62, 55, 78, 68, 85, 92].map((v, i) => (
                                            <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${v}%` }}
                                                transition={{ delay: 1 + i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                                className="flex-1 rounded-md bg-gradient-to-t from-[#6366F1]/60 to-[#6366F1]/20" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Floating card - left */}
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -bottom-6 -left-6 glass-elevated rounded-2xl p-4 hidden lg:block"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                                <TrendingUp className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <div className="text-white text-[13px] font-semibold">+847%</div>
                                <div className="text-[10px] text-[#71717A]">Productivity boost</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Floating card - right */}
                    <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute -top-6 -right-4 glass-elevated rounded-2xl p-4 hidden lg:block"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center">
                                <Sparkles className="w-3.5 h-3.5 text-white" />
                            </div>
                            <div>
                                <div className="text-white text-[12px] font-semibold">Agent Online</div>
                                <div className="text-[10px] text-[#71717A]">Processing 142 tasks</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="dot-pulse" />
                            <span className="text-[10px] text-emerald-400 font-medium">Active now</span>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Bottom stats */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
                    className="flex items-center justify-center gap-10 mt-16 pt-8">
                    {floatingStats.map((stat, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-center">
                            <stat.icon className="w-4 h-4 text-[#6366F1]/60" />
                            <div>
                                <div className="text-[18px] font-bold text-white">{stat.value}</div>
                                <div className="text-[10px] text-[#71717A] uppercase tracking-wider">{stat.label}</div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
