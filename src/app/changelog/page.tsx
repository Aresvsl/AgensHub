"use client"

import { motion } from "framer-motion"
import { Sparkles, Bug, Zap, Shield, ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const releases = [
    {
        version: "2.4.0",
        date: "March 5, 2026",
        tag: "Latest",
        changes: [
            { type: "feature", text: "50 AI Agents library with 10 categories" },
            { type: "feature", text: "Command Palette (⌘K) with search" },
            { type: "feature", text: "Notification panel with unread badges" },
            { type: "feature", text: "User menu dropdown with quick actions" },
            { type: "feature", text: "Create Workflow modal with templates" },
            { type: "feature", text: "Toast notification system" },
            { type: "improvement", text: "Analytics page with bar charts and sparklines" },
            { type: "improvement", text: "Account page with 4 functional tabs" },
        ],
    },
    {
        version: "2.3.0",
        date: "February 28, 2026",
        tag: null,
        changes: [
            { type: "feature", text: "$10M design system overhaul" },
            { type: "feature", text: "Landing page premium rebuild (Hero, Pricing, CTA)" },
            { type: "feature", text: "Dashboard with collapsible sidebar" },
            { type: "improvement", text: "Framer Motion animations across all pages" },
            { type: "fix", text: "Fixed DashboardLayout JSX parsing error" },
        ],
    },
    {
        version: "2.2.0",
        date: "February 20, 2026",
        tag: null,
        changes: [
            { type: "feature", text: "Visual no-code Builder with node canvas" },
            { type: "feature", text: "Marketplace for buying/selling agents" },
            { type: "feature", text: "Admin panel with user management" },
            { type: "improvement", text: "Responsive mobile navigation" },
        ],
    },
    {
        version: "2.1.0",
        date: "February 12, 2026",
        tag: null,
        changes: [
            { type: "feature", text: "Supabase Auth integration (Login/Signup/Reset)" },
            { type: "feature", text: "Stripe subscription checkout" },
            { type: "feature", text: "SaaS Template library" },
            { type: "fix", text: "Fixed auth redirect loop on protected routes" },
        ],
    },
    {
        version: "2.0.0",
        date: "February 1, 2026",
        tag: null,
        changes: [
            { type: "feature", text: "Initial platform launch" },
            { type: "feature", text: "Next.js 14 with App Router" },
            { type: "feature", text: "Shadcn UI component library" },
            { type: "feature", text: "Dark mode premium design" },
        ],
    },
]

const typeIcons = {
    feature: <Sparkles className="w-3 h-3 text-[#6366F1]" />,
    improvement: <Zap className="w-3 h-3 text-amber-400" />,
    fix: <Bug className="w-3 h-3 text-emerald-400" />,
}

const typeColors = {
    feature: "bg-[#6366F1]/10 text-[#6366F1] border-[#6366F1]/20",
    improvement: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    fix: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
}

export default function ChangelogPage() {
    return (
        <div className="min-h-screen bg-[#0B0B0F] text-[#F8F8FF]">
            <header className="border-b border-white/[0.04] sticky top-0 bg-[#0B0B0F]/80 backdrop-blur-xl z-40">
                <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-[13px] text-[#9CA3AF] hover:text-white transition-colors group">
                        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" /> Back
                    </Link>
                    <span className="text-[13px] font-semibold text-white">Changelog</span>
                    <div className="w-16" />
                </div>
            </header>

            <div className="max-w-3xl mx-auto px-6 py-16">
                <div className="mb-16">
                    <h1 className="text-4xl font-bold text-white tracking-tight mb-4">Changelog</h1>
                    <p className="text-[#9CA3AF] text-lg font-light">All the latest updates and improvements to AgensHub.</p>
                </div>

                <div className="space-y-0">
                    {releases.map((release, i) => (
                        <motion.div key={release.version} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                            className="relative pl-8 pb-12 border-l border-white/[0.06] last:pb-0">
                            {/* Dot */}
                            <div className={`absolute -left-[5px] top-0.5 w-2.5 h-2.5 rounded-full ${i === 0 ? "bg-[#6366F1] shadow-[0_0_8px_rgba(99,102,241,0.5)]" : "bg-white/[0.12]"}`} />

                            <div className="flex items-center gap-3 mb-4">
                                <h2 className="text-xl font-bold text-white">v{release.version}</h2>
                                <span className="text-[12px] text-[#9CA3AF]">{release.date}</span>
                                {release.tag && (
                                    <Badge className="bg-[#6366F1]/10 text-[#6366F1] border border-[#6366F1]/20 text-[9px] font-semibold">{release.tag}</Badge>
                                )}
                            </div>

                            <div className="space-y-2">
                                {release.changes.map((change, j) => (
                                    <div key={j} className="flex items-start gap-3 py-1.5">
                                        <Badge className={`text-[9px] font-medium px-2 py-0.5 border ${typeColors[change.type]}`}>
                                            {change.type}
                                        </Badge>
                                        <span className="text-[14px] text-[#9CA3AF] font-light">{change.text}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}
