"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Book, Code, Zap, Globe, Search, ChevronRight, ArrowRight, Bot, Shield, CreditCard, Layers, Terminal, ExternalLink } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const sections = [
    {
        title: "Getting Started",
        icon: Zap,
        articles: [
            { title: "Introduction to AgensHub", description: "Overview of the platform and its core concepts.", time: "3 min" },
            { title: "Quick Start Guide", description: "Deploy your first AI agent in under 5 minutes.", time: "5 min" },
            { title: "Dashboard Tour", description: "Navigate the dashboard like a pro.", time: "4 min" },
        ],
    },
    {
        title: "AI Agents",
        icon: Bot,
        articles: [
            { title: "Agent Configuration", description: "Customize behavior, triggers, and responses.", time: "6 min" },
            { title: "Multi-channel Deployment", description: "Deploy agents on chat, email, and WhatsApp.", time: "8 min" },
            { title: "Training & Fine-tuning", description: "Improve agent accuracy with custom data.", time: "10 min" },
        ],
    },
    {
        title: "API Reference",
        icon: Code,
        articles: [
            { title: "Authentication", description: "API keys, OAuth, and token management.", time: "5 min" },
            { title: "REST API Endpoints", description: "Complete reference for all endpoints.", time: "15 min" },
            { title: "Webhooks", description: "Real-time event notifications.", time: "7 min" },
        ],
    },
    {
        title: "Integrations",
        icon: Globe,
        articles: [
            { title: "Slack & Discord", description: "Connect agents to team communication.", time: "4 min" },
            { title: "CRM Integration", description: "Salesforce, HubSpot, and Pipedrive.", time: "6 min" },
            { title: "Zapier & Make", description: "No-code automation workflows.", time: "5 min" },
        ],
    },
    {
        title: "Billing & Plans",
        icon: CreditCard,
        articles: [
            { title: "Pricing Plans", description: "Compare features across tiers.", time: "3 min" },
            { title: "Usage & Limits", description: "Understand API limits and quotas.", time: "4 min" },
            { title: "Invoices & Receipts", description: "Managing your billing history.", time: "2 min" },
        ],
    },
    {
        title: "Security",
        icon: Shield,
        articles: [
            { title: "Data Encryption", description: "How we protect your data at rest and in transit.", time: "5 min" },
            { title: "SOC 2 Compliance", description: "Our security certifications.", time: "3 min" },
            { title: "Access Control", description: "Team roles and permissions.", time: "4 min" },
        ],
    },
]

export default function DocsPage() {
    const [searchQuery, setSearchQuery] = useState("")

    const filtered = sections.map(s => ({
        ...s,
        articles: s.articles.filter(a =>
            a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            a.description.toLowerCase().includes(searchQuery.toLowerCase())
        ),
    })).filter(s => s.articles.length > 0)

    return (
        <div className="min-h-screen bg-[#0B0B0F] text-[#F8F8FF]">
            {/* Header */}
            <header className="border-b border-white/[0.04] sticky top-0 bg-[#0B0B0F]/80 backdrop-blur-xl z-40">
                <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <Link href="/" className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center">
                                <Book className="w-3.5 h-3.5 text-white" />
                            </div>
                            <span className="text-[13px] font-semibold text-white">AgensHub Docs</span>
                        </Link>
                    </div>
                    <div className="relative w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#9CA3AF]/50" />
                        <Input placeholder="Search docs..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-white/[0.02] border-white/[0.04] pl-9 h-9 text-[13px] rounded-xl text-white placeholder:text-[#9CA3AF]/40 focus-visible:ring-1 focus-visible:ring-[#6366F1]/50" />
                    </div>
                </div>
            </header>

            <div className="max-w-5xl mx-auto px-6 py-16">
                <div className="mb-16">
                    <h1 className="text-4xl font-bold text-white tracking-tight mb-4">Documentation</h1>
                    <p className="text-[#9CA3AF] text-lg font-light max-w-xl">Everything you need to build, deploy, and scale your AI agents.</p>
                </div>

                {/* Quick Links */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
                    {[
                        { title: "Quick Start", desc: "Deploy in 5 minutes", icon: Zap, color: "from-[#6366F1] to-[#8B5CF6]" },
                        { title: "API Reference", desc: "Complete endpoints", icon: Terminal, color: "from-emerald-500 to-teal-600" },
                        { title: "Examples", desc: "Code samples", icon: Code, color: "from-amber-500 to-orange-500" },
                    ].map((link, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                            className="card-premium p-6 group cursor-pointer hover:border-white/[0.08] transition-all">
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${link.color} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}>
                                <link.icon className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="text-[15px] font-semibold text-white mb-1">{link.title}</h3>
                            <p className="text-[12px] text-[#9CA3AF]">{link.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Sections */}
                <div className="space-y-12">
                    {filtered.map((section, i) => (
                        <motion.div key={section.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                            <div className="flex items-center gap-3 mb-4">
                                <section.icon className="w-4 h-4 text-[#6366F1]" />
                                <h2 className="text-lg font-semibold text-white">{section.title}</h2>
                            </div>
                            <div className="space-y-1">
                                {section.articles.map((article) => (
                                    <div key={article.title}
                                        className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-white/[0.02] transition-colors cursor-pointer group">
                                        <div>
                                            <h3 className="text-[14px] font-medium text-white group-hover:text-[#6366F1] transition-colors">{article.title}</h3>
                                            <p className="text-[12px] text-[#9CA3AF] mt-0.5">{article.description}</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-[10px] text-[#9CA3AF]/50">{article.time}</span>
                                            <ChevronRight className="w-3.5 h-3.5 text-[#9CA3AF]/30 group-hover:text-[#6366F1] transition-colors" />
                                        </div>
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
