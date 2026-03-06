"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Bot, Layout, Zap, FileText, ArrowRight, Command } from "lucide-react"

const commands = [
    { name: "Go to Dashboard", icon: Layout, category: "Navigation", href: "/dashboard" },
    { name: "Browse AI Agents", icon: Bot, category: "Navigation", href: "/dashboard/agents" },
    { name: "Open Visual Builder", icon: Zap, category: "Navigation", href: "/dashboard/builder" },
    { name: "View Templates", icon: FileText, category: "Navigation", href: "/dashboard/templates" },
    { name: "Create New Workflow", icon: Zap, category: "Actions", href: "/dashboard/builder" },
    { name: "Manage Account", icon: Layout, category: "Settings", href: "/dashboard/account" },
]

export function CommandPalette() {
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState("")

    const toggle = useCallback(() => {
        setOpen(prev => !prev)
        setQuery("")
    }, [])

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault()
                toggle()
            }
            if (e.key === "Escape") setOpen(false)
        }
        window.addEventListener("keydown", handler)
        return () => window.removeEventListener("keydown", handler)
    }, [toggle])

    const filtered = commands.filter(c =>
        c.name.toLowerCase().includes(query.toLowerCase())
    )

    const grouped = filtered.reduce((acc, cmd) => {
        if (!acc[cmd.category]) acc[cmd.category] = []
        acc[cmd.category].push(cmd)
        return acc
    }, {} as Record<string, typeof commands>)

    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 0.15 }}
                        className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-lg z-[61]"
                    >
                        <div className="bg-[#111118] border border-white/[0.06] rounded-2xl shadow-[0_40px_120px_rgba(0,0,0,0.7)] overflow-hidden">
                            <div className="flex items-center gap-3 px-5 h-14 border-b border-white/[0.04]">
                                <Search className="w-4 h-4 text-[#9CA3AF]" />
                                <input
                                    autoFocus value={query} onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Type a command or search..."
                                    className="flex-1 bg-transparent text-white text-[14px] outline-none placeholder:text-[#9CA3AF]/50"
                                />
                                <kbd className="text-[10px] text-[#9CA3AF]/50 bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.06]">ESC</kbd>
                            </div>
                            <div className="max-h-[320px] overflow-y-auto py-2">
                                {Object.entries(grouped).map(([category, items]) => (
                                    <div key={category} className="px-2">
                                        <div className="px-3 py-2 text-[10px] font-semibold text-[#9CA3AF]/50 uppercase tracking-wider">{category}</div>
                                        {items.map((cmd) => (
                                            <a key={cmd.name} href={cmd.href} onClick={() => setOpen(false)}
                                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] text-[#9CA3AF] hover:text-white hover:bg-white/[0.04] transition-colors group cursor-pointer">
                                                <cmd.icon className="w-4 h-4" />
                                                <span className="flex-1 font-medium">{cmd.name}</span>
                                                <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </a>
                                        ))}
                                    </div>
                                ))}
                                {filtered.length === 0 && (
                                    <div className="px-5 py-8 text-center text-[13px] text-[#9CA3AF]/50">No results found.</div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
