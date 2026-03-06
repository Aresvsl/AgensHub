"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { Activity, CheckCircle2, XCircle, Clock, Bot, Filter, Search, RefreshCw, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

type LogEntry = {
    id: string
    agent: string
    agent_name?: string
    action: string
    status: string
    time?: string
    duration?: string
    duration_ms?: number
    created_at?: string
}

const fallbackLogs: LogEntry[] = [
    { id: "log-001", agent: "Sales Closer AI", action: "Closed deal with contact #4281", status: "success", time: "Just now", duration: "2.1s" },
    { id: "log-002", agent: "Support Bot Pro", action: "Resolved ticket TK-892: Password reset", status: "success", time: "30s ago", duration: "0.8s" },
    { id: "log-003", agent: "Content Generator", action: "Generated blog post: '10 AI Trends 2026'", status: "success", time: "2m ago", duration: "12.4s" },
    { id: "log-004", agent: "Lead Scoring Agent", action: "Scored 28 new leads from campaign #12", status: "success", time: "5m ago", duration: "3.2s" },
    { id: "log-005", agent: "Email Drip Campaign", action: "Failed to send batch: SMTP timeout", status: "error", time: "8m ago", duration: "30.0s" },
    { id: "log-006", agent: "SEO Optimizer", action: "Analyzed 15 pages, 3 optimization found", status: "success", time: "12m ago", duration: "8.7s" },
    { id: "log-007", agent: "Invoice Processor", action: "Processed 5 invoices totaling $4,280", status: "success", time: "18m ago", duration: "4.5s" },
    { id: "log-008", agent: "Multilingual Support", action: "Timeout connecting to translation API", status: "error", time: "22m ago", duration: "15.0s" },
    { id: "log-009", agent: "Ad Campaign Manager", action: "Optimized budget across 3 campaigns", status: "success", time: "30m ago", duration: "6.1s" },
    { id: "log-010", agent: "Resume Screener", action: "Screened 42 applications for Sr. Dev role", status: "success", time: "45m ago", duration: "18.3s" },
    { id: "log-011", agent: "Sales Closer AI", action: "Sent follow-up to 12 warm leads", status: "success", time: "1h ago", duration: "5.6s" },
    { id: "log-012", agent: "Code Reviewer AI", action: "Reviewed PR #341: Added auth middleware", status: "success", time: "1.5h ago", duration: "22.1s" },
]

const statusConfig = {
    success: { icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-500/10" },
    error: { icon: XCircle, color: "text-red-400", bg: "bg-red-500/10" },
}

export default function LogsPage() {
    const [logs, setLogs] = useState<LogEntry[]>(fallbackLogs)
    const [filterStatus, setFilterStatus] = useState<"all" | "success" | "error">("all")
    const [searchQuery, setSearchQuery] = useState("")
    const [refreshing, setRefreshing] = useState(false)

    const fetchLogs = useCallback(async () => {
        setRefreshing(true)
        try {
            const res = await fetch(`/api/logs?status=${filterStatus}&limit=50`)
            if (res.ok) {
                const data = await res.json()
                if (Array.isArray(data) && data.length > 0) {
                    setLogs(data)
                }
            }
        } catch {
            // Use fallback
        }
        setRefreshing(false)
    }, [filterStatus])

    useEffect(() => { fetchLogs() }, [fetchLogs])

    const getAgentName = (log: LogEntry) => log.agent_name || log.agent
    const getDuration = (log: LogEntry) => {
        if (log.duration) return log.duration
        if (log.duration_ms) return `${(log.duration_ms / 1000).toFixed(1)}s`
        return "—"
    }
    const getTime = (log: LogEntry) => {
        if (log.time) return log.time
        if (log.created_at) {
            const d = new Date(log.created_at)
            const now = new Date()
            const diffMs = now.getTime() - d.getTime()
            const diffMin = Math.floor(diffMs / 60000)
            if (diffMin < 1) return "Just now"
            if (diffMin < 60) return `${diffMin}m ago`
            return `${Math.floor(diffMin / 60)}h ago`
        }
        return ""
    }

    const filtered = logs.filter(log => {
        const matchStatus = filterStatus === "all" || log.status === filterStatus
        const matchSearch = getAgentName(log).toLowerCase().includes(searchQuery.toLowerCase()) || log.action.toLowerCase().includes(searchQuery.toLowerCase())
        return matchStatus && matchSearch
    })

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Agent Logs</h1>
                    <p className="text-[#9CA3AF] mt-1 text-[15px] font-light">Real-time execution logs from all active agents.</p>
                </div>
                <div className="flex gap-3">
                    <div className="relative w-56">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#9CA3AF]/50" />
                        <Input placeholder="Search logs..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-white/[0.02] border-white/[0.04] pl-9 h-9 text-[13px] rounded-xl text-white placeholder:text-[#9CA3AF]/40 focus-visible:ring-1 focus-visible:ring-[#6366F1]/50" />
                    </div>
                    <div className="flex rounded-xl overflow-hidden border border-white/[0.04]">
                        {(["all", "success", "error"] as const).map((s) => (
                            <button key={s} onClick={() => setFilterStatus(s)}
                                className={`px-3 h-9 text-[11px] font-medium transition-colors capitalize ${filterStatus === s ? "bg-white/[0.06] text-white" : "text-[#9CA3AF] hover:text-white bg-white/[0.01]"
                                    }`}>{s}</button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Live indicator */}
            <div className="flex items-center gap-2">
                <div className="relative">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <div className="w-2 h-2 rounded-full bg-emerald-500 absolute inset-0 animate-ping" />
                </div>
                <span className="text-[12px] text-emerald-400 font-medium">Live — updating in real-time</span>
                <span className="text-[11px] text-[#9CA3AF]/50 ml-2">{filtered.length} entries</span>
                <button onClick={fetchLogs} className="ml-auto text-[#9CA3AF]/50 hover:text-white transition-colors">
                    <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} />
                </button>
            </div>

            <div className="card-premium overflow-hidden">
                <div className="divide-y divide-white/[0.03]">
                    {filtered.map((log, i) => {
                        const config = statusConfig[log.status as keyof typeof statusConfig]
                        const StatusIcon = config.icon
                        return (
                            <motion.div key={log.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}
                                className="flex items-center gap-4 px-6 py-4 hover:bg-white/[0.01] transition-colors group">
                                <div className={`w-8 h-8 rounded-lg ${config.bg} flex items-center justify-center flex-shrink-0`}>
                                    <StatusIcon className={`w-4 h-4 ${config.color}`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[13px] font-medium text-white">{getAgentName(log)}</span>
                                        <span className="text-[11px] text-[#9CA3AF]/40">→</span>
                                        <span className="text-[13px] text-[#9CA3AF] truncate">{log.action}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 flex-shrink-0">
                                    <Badge className="bg-white/[0.03] border border-white/[0.04] text-[#9CA3AF] text-[9px] font-mono">{getDuration(log)}</Badge>
                                    <span className="text-[11px] text-[#9CA3AF]/50 w-16 text-right">{getTime(log)}</span>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
                {filtered.length === 0 && (
                    <div className="px-6 py-16 text-center text-[13px] text-[#9CA3AF]/50">No logs match your criteria.</div>
                )}
            </div>
        </div>
    )
}
