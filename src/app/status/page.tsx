"use client"

import { motion } from "framer-motion"
import { CheckCircle2, AlertTriangle, Clock, Activity, ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const services = [
    { name: "API", status: "operational", uptime: "99.99%", latency: "45ms" },
    { name: "Dashboard", status: "operational", uptime: "99.98%", latency: "120ms" },
    { name: "Agent Runtime", status: "operational", uptime: "99.95%", latency: "230ms" },
    { name: "Authentication", status: "operational", uptime: "100%", latency: "35ms" },
    { name: "Webhooks", status: "operational", uptime: "99.97%", latency: "85ms" },
    { name: "File Storage", status: "operational", uptime: "99.99%", latency: "60ms" },
    { name: "Email Delivery", status: "degraded", uptime: "98.5%", latency: "450ms" },
    { name: "Analytics Pipeline", status: "operational", uptime: "99.90%", latency: "180ms" },
]

const incidents = [
    { date: "Mar 5, 2026", title: "Email delivery delays", status: "investigating", description: "Some transactional emails experiencing delays up to 5 minutes. Our team is investigating." },
    { date: "Mar 2, 2026", title: "API latency spike", status: "resolved", description: "Resolved - Brief latency increase on API endpoints due to database maintenance. Duration: 12 minutes." },
    { date: "Feb 28, 2026", title: "Scheduled maintenance", status: "resolved", description: "Completed - Database migration completed successfully with zero downtime." },
]

const statusConfig = {
    operational: { icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-500", label: "Operational" },
    degraded: { icon: AlertTriangle, color: "text-amber-400", bg: "bg-amber-500", label: "Degraded" },
    outage: { icon: AlertTriangle, color: "text-red-400", bg: "bg-red-500", label: "Outage" },
}

export default function StatusPage() {
    const allOperational = services.every(s => s.status === "operational")

    return (
        <div className="min-h-screen bg-[#0B0B0F] text-[#F8F8FF]">
            <header className="border-b border-white/[0.04] sticky top-0 bg-[#0B0B0F]/80 backdrop-blur-xl z-40">
                <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-[13px] text-[#9CA3AF] hover:text-white transition-colors group">
                        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" /> Back
                    </Link>
                    <span className="text-[13px] font-semibold text-white">System Status</span>
                    <div className="w-16" />
                </div>
            </header>

            <div className="max-w-3xl mx-auto px-6 py-16">
                {/* Overall status */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className={`card-premium p-8 mb-12 text-center ${allOperational ? "border-emerald-500/10" : "border-amber-500/10"}`}>
                    <div className={`w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center ${allOperational ? "bg-emerald-500/10" : "bg-amber-500/10"}`}>
                        {allOperational ?
                            <CheckCircle2 className="w-7 h-7 text-emerald-400" /> :
                            <AlertTriangle className="w-7 h-7 text-amber-400" />
                        }
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2">{allOperational ? "All Systems Operational" : "Partial System Degradation"}</h1>
                    <p className="text-[#9CA3AF] text-[14px] font-light">Last updated: Just now</p>
                </motion.div>

                {/* Services */}
                <h2 className="text-lg font-semibold text-white mb-4">Services</h2>
                <div className="card-premium overflow-hidden mb-12">
                    <div className="divide-y divide-white/[0.03]">
                        {services.map((service, i) => {
                            const config = statusConfig[service.status as keyof typeof statusConfig]
                            return (
                                <motion.div key={service.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                                    className="flex items-center justify-between px-6 py-4 hover:bg-white/[0.01] transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-2 h-2 rounded-full ${config.bg}`} />
                                        <span className="text-[14px] font-medium text-white">{service.name}</span>
                                    </div>
                                    <div className="flex items-center gap-6 text-[12px] text-[#9CA3AF]">
                                        <span>{service.uptime} uptime</span>
                                        <span>{service.latency}</span>
                                        <span className={`${config.color} font-medium`}>{config.label}</span>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>

                {/* 90-day uptime bar */}
                <h2 className="text-lg font-semibold text-white mb-4">90-Day Uptime</h2>
                <div className="card-premium p-6 mb-12">
                    <div className="flex gap-[2px]">
                        {Array.from({ length: 90 }).map((_, i) => (
                            <div key={i} className={`h-8 flex-1 rounded-[1px] ${i === 67 ? "bg-amber-500" : i === 42 ? "bg-amber-500/50" : "bg-emerald-500/40"
                                }`} />
                        ))}
                    </div>
                    <div className="flex justify-between mt-3 text-[11px] text-[#9CA3AF]/50">
                        <span>90 days ago</span>
                        <span>Today</span>
                    </div>
                    <div className="mt-3 text-center text-[14px] font-semibold text-emerald-400">99.97% overall uptime</div>
                </div>

                {/* Recent incidents */}
                <h2 className="text-lg font-semibold text-white mb-4">Recent Incidents</h2>
                <div className="space-y-4">
                    {incidents.map((incident, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                            className="card-premium p-6">
                            <div className="flex items-center gap-3 mb-2">
                                <Badge className={`text-[10px] font-medium px-2.5 py-0.5 border ${incident.status === "resolved" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                                    }`}>{incident.status}</Badge>
                                <span className="text-[11px] text-[#9CA3AF]/50">{incident.date}</span>
                            </div>
                            <h3 className="text-[15px] font-medium text-white mb-1">{incident.title}</h3>
                            <p className="text-[13px] text-[#9CA3AF] font-light">{incident.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}
