"use client"

import { motion } from "framer-motion"
import { Download, FileText, CheckCircle2, Clock, Search, Bot, Layout } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useToast } from "@/components/ui/toast-provider"

const downloads = [
    { name: "AI Sales Closer", type: "Agent", date: "2 hours ago", size: "2.4 MB", status: "Ready", icon: Bot },
    { name: "AI Chatbot SaaS Template", type: "Template", date: "Yesterday", size: "45.8 MB", status: "Ready", icon: Layout },
    { name: "Lead Scoring Agent", type: "Agent", date: "Mar 02, 2026", size: "1.8 MB", status: "Ready", icon: Bot },
    { name: "Content Generator", type: "Agent", date: "Feb 28, 2026", size: "3.2 MB", status: "Ready", icon: Bot },
    { name: "Lead Generation SaaS", type: "Template", date: "Feb 25, 2026", size: "52.1 MB", status: "Ready", icon: Layout },
    { name: "Multilingual Support Bot", type: "Agent", date: "Feb 20, 2026", size: "4.1 MB", status: "Ready", icon: Bot },
    { name: "Automation CRM", type: "Template", date: "Feb 18, 2026", size: "38.4 MB", status: "Ready", icon: Layout },
]

export default function DownloadsPage() {
    const [filterQuery, setFilterQuery] = useState("")
    const { showToast } = useToast()

    const filtered = downloads.filter(d =>
        d.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
        d.type.toLowerCase().includes(filterQuery.toLowerCase())
    )

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Downloads</h1>
                    <p className="text-[#9CA3AF] mt-1 text-[15px] font-light">{downloads.length} acquired agents and templates.</p>
                </div>
                <div className="relative w-full md:w-56">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#9CA3AF]/50" />
                    <Input placeholder="Filter..." value={filterQuery} onChange={(e) => setFilterQuery(e.target.value)}
                        className="bg-white/[0.02] border-white/[0.04] pl-9 h-9 text-[13px] rounded-xl text-white placeholder:text-[#9CA3AF]/40 focus-visible:ring-1 focus-visible:ring-[#6366F1]/50" />
                </div>
            </div>

            <div className="card-premium overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-white/[0.04]">
                            <th className="px-6 py-4 text-[11px] font-medium text-[#9CA3AF] uppercase tracking-wider">Item</th>
                            <th className="px-6 py-4 text-[11px] font-medium text-[#9CA3AF] uppercase tracking-wider">Type</th>
                            <th className="px-6 py-4 text-[11px] font-medium text-[#9CA3AF] uppercase tracking-wider">Date</th>
                            <th className="px-6 py-4 text-[11px] font-medium text-[#9CA3AF] uppercase tracking-wider">Size</th>
                            <th className="px-6 py-4 text-[11px] font-medium text-[#9CA3AF] uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-[11px] font-medium text-[#9CA3AF] uppercase tracking-wider text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.03]">
                        {filtered.map((item, i) => (
                            <motion.tr key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                                className="hover:bg-white/[0.01] transition-colors group">
                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-xl bg-[#6366F1]/10 border border-[#6366F1]/10 flex items-center justify-center">
                                            <item.icon className="w-4 h-4 text-[#6366F1]" />
                                        </div>
                                        <span className="text-[14px] font-medium text-white">{item.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-5 text-[13px] text-[#9CA3AF]">{item.type}</td>
                                <td className="px-6 py-5 text-[13px] text-[#9CA3AF]">{item.date}</td>
                                <td className="px-6 py-5 text-[13px] text-[#9CA3AF]">{item.size}</td>
                                <td className="px-6 py-5">
                                    <span className="flex items-center gap-1.5 text-emerald-400 text-[12px] font-medium">
                                        <CheckCircle2 className="w-3.5 h-3.5" /> {item.status}
                                    </span>
                                </td>
                                <td className="px-6 py-5 text-right">
                                    <Button onClick={() => showToast(`${item.name} downloaded!`)}
                                        variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-[#9CA3AF] hover:text-white hover:bg-white/[0.04]">
                                        <Download className="w-4 h-4" />
                                    </Button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
                {filtered.length === 0 && (
                    <div className="px-6 py-12 text-center text-[13px] text-[#9CA3AF]/50">No items match your filter.</div>
                )}
            </div>
        </div>
    )
}
