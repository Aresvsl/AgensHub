"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Filter, Download, ExternalLink, Bot, Zap, MessageSquare, ShoppingCart, Users, Briefcase, BarChart3, Globe, Shield, Mail, FileText, Cpu, Headphones, Megaphone, Pen, Camera, Heart, Database, Code, Layers, Target, Compass, Lightbulb } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/toast-provider"
import Link from "next/link"

const categories = ["All", "Sales", "Support", "Marketing", "Operations", "Legal", "Finance", "HR", "Dev", "Data"]

const allAgents = [
    { name: "AI Sales Closer", category: "Sales", description: "Closes deals by converting qualified leads via intelligent chat.", icon: ShoppingCart, gradient: "from-[#6366F1] to-[#8B5CF6]" },
    { name: "Lead Scoring Agent", category: "Sales", description: "Analyzes lead behavior and assigns interest scores.", icon: Target, gradient: "from-violet-500 to-purple-600" },
    { name: "Cold Outreach Bot", category: "Sales", description: "Automated personalized cold emails at scale.", icon: Mail, gradient: "from-blue-500 to-indigo-600" },
    { name: "Deal Pipeline Manager", category: "Sales", description: "Tracks and optimizes your sales pipeline stages.", icon: Layers, gradient: "from-indigo-500 to-violet-600" },
    { name: "Upsell Recommender", category: "Sales", description: "Identifies upsell and cross-sell opportunities.", icon: TrendingUp, gradient: "from-purple-500 to-fuchsia-600" },
    { name: "Multilingual Support", category: "Support", description: "Customer service in 50+ languages with real-time translation.", icon: MessageSquare, gradient: "from-emerald-500 to-teal-600" },
    { name: "Ticket Router AI", category: "Support", description: "Automatically categorizes and routes support tickets.", icon: Compass, gradient: "from-teal-500 to-cyan-600" },
    { name: "FAQ Bot Pro", category: "Support", description: "Answers common questions from your knowledge base.", icon: Lightbulb, gradient: "from-cyan-500 to-blue-500" },
    { name: "Sentiment Analyzer", category: "Support", description: "Detects customer emotion in real-time conversations.", icon: Heart, gradient: "from-pink-500 to-rose-600" },
    { name: "Escalation Manager", category: "Support", description: "Escalates critical issues to the right team member.", icon: Headphones, gradient: "from-green-500 to-emerald-600" },
    { name: "Ad Campaign Manager", category: "Marketing", description: "Optimizes ad budgets and creatives in real-time.", icon: Zap, gradient: "from-amber-500 to-orange-500" },
    { name: "Content Generator", category: "Marketing", description: "Creates blog posts, social media content, and copy.", icon: Pen, gradient: "from-orange-500 to-red-500" },
    { name: "SEO Optimizer", category: "Marketing", description: "Analyzes and improves your search engine rankings.", icon: BarChart3, gradient: "from-lime-500 to-green-500" },
    { name: "Social Media Manager", category: "Marketing", description: "Schedules and publishes across all platforms.", icon: Megaphone, gradient: "from-rose-500 to-pink-500" },
    { name: "Email Drip Campaign", category: "Marketing", description: "Automated email sequences based on user behavior.", icon: Mail, gradient: "from-red-500 to-orange-500" },
    { name: "Video Script Writer", category: "Marketing", description: "Generates engaging scripts for YouTube and TikTok.", icon: Camera, gradient: "from-fuchsia-500 to-purple-500" },
    { name: "Operations Manager", category: "Operations", description: "Coordinates tasks between teams and monitors deadlines.", icon: Briefcase, gradient: "from-rose-500 to-pink-600" },
    { name: "Inventory Tracker", category: "Operations", description: "Monitors stock levels and triggers reorder alerts.", icon: Database, gradient: "from-sky-500 to-blue-600" },
    { name: "Workflow Automator", category: "Operations", description: "Automates repetitive business processes end-to-end.", icon: Zap, gradient: "from-violet-500 to-indigo-600" },
    { name: "Quality Assurance Bot", category: "Operations", description: "Checks output quality against defined standards.", icon: Shield, gradient: "from-emerald-500 to-green-600" },
    { name: "Scheduling Assistant", category: "Operations", description: "Books meetings and manages calendars intelligently.", icon: Users, gradient: "from-blue-500 to-violet-600" },
    { name: "Legal Document Auditor", category: "Legal", description: "Reviews contracts and flags potential legal risks.", icon: FileText, gradient: "from-slate-500 to-gray-600" },
    { name: "Compliance Checker", category: "Legal", description: "Ensures operations comply with industry regulations.", icon: Shield, gradient: "from-amber-600 to-yellow-600" },
    { name: "NDA Generator", category: "Legal", description: "Creates customized NDAs from templates.", icon: FileText, gradient: "from-zinc-500 to-slate-600" },
    { name: "IP Monitor", category: "Legal", description: "Tracks intellectual property violations online.", icon: Globe, gradient: "from-red-600 to-rose-600" },
    { name: "GDPR Assistant", category: "Legal", description: "Helps maintain GDPR compliance across operations.", icon: Shield, gradient: "from-blue-600 to-indigo-600" },
    { name: "Invoice Processor", category: "Finance", description: "Extracts and processes invoice data automatically.", icon: FileText, gradient: "from-green-500 to-emerald-600" },
    { name: "Expense Categorizer", category: "Finance", description: "Auto-categorizes business expenses for accounting.", icon: Layers, gradient: "from-teal-500 to-green-600" },
    { name: "Revenue Forecaster", category: "Finance", description: "Predicts future revenue based on historical data.", icon: BarChart3, gradient: "from-indigo-500 to-blue-600" },
    { name: "Tax Prep Assistant", category: "Finance", description: "Organizes financial records for tax filing.", icon: FileText, gradient: "from-amber-500 to-yellow-600" },
    { name: "Cash Flow Monitor", category: "Finance", description: "Tracks cash flow and sends low-balance alerts.", icon: Target, gradient: "from-cyan-600 to-teal-600" },
    { name: "Resume Screener", category: "HR", description: "Filters job applications based on criteria.", icon: Users, gradient: "from-purple-500 to-violet-600" },
    { name: "Onboarding Bot", category: "HR", description: "Guides new hires through the onboarding process.", icon: Compass, gradient: "from-sky-500 to-cyan-600" },
    { name: "Interview Scheduler", category: "HR", description: "Coordinates interview times with candidates.", icon: Users, gradient: "from-indigo-500 to-purple-600" },
    { name: "Employee Pulse", category: "HR", description: "Surveys employee satisfaction and engagement.", icon: Heart, gradient: "from-pink-500 to-fuchsia-600" },
    { name: "PTO Tracker", category: "HR", description: "Manages leave requests and vacation balances.", icon: Layers, gradient: "from-emerald-500 to-teal-500" },
    { name: "Code Reviewer AI", category: "Dev", description: "Reviews pull requests and suggests improvements.", icon: Code, gradient: "from-green-500 to-lime-600" },
    { name: "Bug Triager", category: "Dev", description: "Triages and prioritizes bug reports automatically.", icon: Cpu, gradient: "from-red-500 to-rose-600" },
    { name: "Documentation Bot", category: "Dev", description: "Generates and updates technical documentation.", icon: FileText, gradient: "from-blue-500 to-sky-600" },
    { name: "CI/CD Monitor", category: "Dev", description: "Monitors build pipelines and reports failures.", icon: Zap, gradient: "from-orange-500 to-amber-600" },
    { name: "API Test Agent", category: "Dev", description: "Runs automated API tests and generates reports.", icon: Globe, gradient: "from-violet-500 to-purple-500" },
    { name: "Data Pipeline Agent", category: "Data", description: "Orchestrates ETL workflows across data sources.", icon: Database, gradient: "from-cyan-500 to-blue-600" },
    { name: "Anomaly Detector", category: "Data", description: "Detects unusual patterns in your business data.", icon: BarChart3, gradient: "from-red-500 to-orange-500" },
    { name: "Report Generator", category: "Data", description: "Creates automated business reports with insights.", icon: FileText, gradient: "from-indigo-500 to-violet-500" },
    { name: "Data Cleaner", category: "Data", description: "Deduplicates and normalizes messy datasets.", icon: Layers, gradient: "from-teal-500 to-emerald-500" },
    { name: "Prediction Engine", category: "Data", description: "ML-powered predictions for business metrics.", icon: Cpu, gradient: "from-purple-600 to-indigo-600" },
    { name: "Dashboard Builder", category: "Data", description: "Auto-generates dashboards from your data sources.", icon: BarChart3, gradient: "from-sky-500 to-blue-500" },
    { name: "A/B Test Analyzer", category: "Data", description: "Analyzes experiment results with statistical significance.", icon: Target, gradient: "from-amber-500 to-orange-600" },
    { name: "Customer Churn Predictor", category: "Data", description: "Predicts which customers are likely to churn.", icon: Users, gradient: "from-rose-500 to-red-600" },
    { name: "Pricing Optimizer", category: "Finance", description: "Dynamically adjusts pricing based on demand.", icon: Target, gradient: "from-fuchsia-500 to-pink-600" },
]

import { TrendingUp } from "lucide-react"

export default function AgentsPage() {
    const [activeCategory, setActiveCategory] = useState("All")
    const [searchQuery, setSearchQuery] = useState("")
    const { showToast } = useToast()

    const filtered = allAgents.filter(a => {
        const matchCat = activeCategory === "All" || a.category === activeCategory
        const matchSearch = a.name.toLowerCase().includes(searchQuery.toLowerCase()) || a.description.toLowerCase().includes(searchQuery.toLowerCase())
        return matchCat && matchSearch
    })

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">AI Agents</h1>
                    <p className="text-[#9CA3AF] mt-1 text-[15px] font-light">{allAgents.length} specialized agents ready to deploy.</p>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <div className="relative flex-grow md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#9CA3AF]/50" />
                        <Input placeholder="Search agents..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-white/[0.02] border-white/[0.04] pl-9 h-9 text-[13px] rounded-xl text-white placeholder:text-[#9CA3AF]/40 focus-visible:ring-1 focus-visible:ring-[#6366F1]/50" />
                    </div>
                </div>
            </div>

            <Tabs defaultValue="All">
                <TabsList className="bg-[#111118] border border-white/[0.04] p-1 h-10 rounded-xl flex-wrap">
                    {categories.map((cat) => (
                        <TabsTrigger key={cat} value={cat} onClick={() => setActiveCategory(cat)}
                            className="rounded-lg data-[state=active]:bg-[#6366F1] data-[state=active]:text-white text-[#9CA3AF] px-3 text-[11px] font-medium transition-all">
                            {cat}
                        </TabsTrigger>
                    ))}
                </TabsList>
            </Tabs>

            <p className="text-[13px] text-[#9CA3AF]">{filtered.length} agents found</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((agent, i) => (
                    <motion.div key={agent.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(i * 0.02, 0.3) }}
                        className="card-premium p-6 group">
                        <div className="flex justify-between items-start mb-5">
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${agent.gradient} flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
                                <agent.icon className="w-5 h-5 text-white" />
                            </div>
                            <Badge className="bg-white/[0.04] border border-white/[0.06] text-[#9CA3AF] text-[10px] font-medium">{agent.category}</Badge>
                        </div>
                        <Link href={`/dashboard/agents/${agent.name.toLowerCase().replace(/\s+/g, '-')}`}>
                            <h3 className="text-[15px] font-semibold text-white mb-2 tracking-tight group-hover:text-[#6366F1] transition-colors cursor-pointer">{agent.name}</h3>
                        </Link>
                        <p className="text-[#9CA3AF] text-[13px] mb-5 leading-relaxed font-light line-clamp-2">{agent.description}</p>
                        <Button onClick={() => showToast(`${agent.name} installed successfully!`)}
                            className="w-full h-9 bg-white/[0.04] hover:bg-white/[0.08] text-white rounded-xl text-[12px] font-medium border border-white/[0.06] transition-all">
                            <Download className="w-3.5 h-3.5 mr-2" /> Install
                        </Button>
                    </motion.div>
                ))}
            </div>

            {filtered.length === 0 && (
                <div className="text-center py-24 card-premium">
                    <Bot className="w-10 h-10 text-[#9CA3AF]/30 mx-auto mb-4" />
                    <h3 className="text-white font-semibold text-lg mb-1">No agents found</h3>
                    <p className="text-[#9CA3AF] text-[14px] font-light">Try adjusting your search criteria.</p>
                </div>
            )}
        </div>
    )
}
