"use client"

import { motion } from "framer-motion"
import { Users, Bot, FileText, ShieldCheck, DollarSign, Activity, ArrowRight, TrendingUp, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const stats = [
    { icon: Users, label: "Total Users", value: "2,847", change: "+124 this week", trend: "up" },
    { icon: Bot, label: "Active Agents", value: "456", change: "+28 today", trend: "up" },
    { icon: DollarSign, label: "MRR", value: "$34,280", change: "+8.2%", trend: "up" },
    { icon: Activity, label: "Uptime", value: "99.98%", change: "Last 30d", trend: "neutral" },
]

const recentUsers = [
    { name: "Carlos P.", email: "carlos@tech.com", plan: "Pro", status: "Active" },
    { name: "Ana L.", email: "ana@startup.io", plan: "Enterprise", status: "Active" },
    { name: "Marcos R.", email: "marcos@agency.co", plan: "Starter", status: "Trial" },
]

export default function AdminPage() {
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Admin Panel</h1>
                    <p className="text-[#9CA3AF] mt-1 text-[15px] font-light">Platform overview and management.</p>
                </div>
                <Badge className="bg-red-500/10 text-red-400 border border-red-500/20 text-[10px] font-semibold px-3 py-1 rounded-full">
                    <ShieldCheck className="w-3 h-3 mr-1.5" /> Admin Access
                </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                        className="card-premium p-6">
                        <div className="flex justify-between items-start mb-6">
                            <div className="w-9 h-9 rounded-xl bg-[#6366F1]/10 border border-[#6366F1]/10 flex items-center justify-center">
                                <stat.icon className="w-4 h-4 text-[#6366F1]" />
                            </div>
                            <span className={`text-[11px] font-medium ${stat.trend === "up" ? "text-emerald-400" : "text-[#9CA3AF]"}`}>{stat.change}</span>
                        </div>
                        <div className="text-2xl font-bold text-white tracking-tight mb-1">{stat.value}</div>
                        <div className="text-[12px] text-[#9CA3AF] font-medium">{stat.label}</div>
                    </motion.div>
                ))}
            </div>

            <div className="card-premium overflow-hidden">
                <div className="px-6 py-5 border-b border-white/[0.04] flex justify-between items-center">
                    <h3 className="text-[16px] font-semibold text-white">Recent Users</h3>
                    <Button variant="ghost" className="text-[#6366F1] text-[13px] font-medium h-8 px-3 rounded-lg hover:bg-[#6366F1]/10 group">
                        View all <ArrowRight className="ml-1 w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Button>
                </div>
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-white/[0.04]">
                            <th className="px-6 py-3 text-[11px] font-medium text-[#9CA3AF] uppercase tracking-wider">User</th>
                            <th className="px-6 py-3 text-[11px] font-medium text-[#9CA3AF] uppercase tracking-wider">Plan</th>
                            <th className="px-6 py-3 text-[11px] font-medium text-[#9CA3AF] uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.03]">
                        {recentUsers.map((user, i) => (
                            <tr key={i} className="hover:bg-white/[0.01] transition-colors">
                                <td className="px-6 py-4">
                                    <div className="text-[14px] font-medium text-white">{user.name}</div>
                                    <div className="text-[12px] text-[#9CA3AF]">{user.email}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <Badge className={`text-[10px] font-medium px-2.5 py-0.5 ${user.plan === "Enterprise" ? "bg-[#6366F1]/20 text-[#6366F1] border-[#6366F1]/20" :
                                            user.plan === "Pro" ? "bg-[#8B5CF6]/20 text-[#8B5CF6] border-[#8B5CF6]/20" :
                                                "bg-white/[0.04] text-[#9CA3AF] border-white/[0.06]"
                                        }`}>{user.plan}</Badge>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`text-[12px] font-medium ${user.status === "Active" ? "text-emerald-400" : "text-amber-400"}`}>
                                        {user.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
