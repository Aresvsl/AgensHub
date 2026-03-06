"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
    LayoutDashboard, Bot, Layout, ShoppingBag, Zap, Download,
    User, LogOut, Menu, X, Sparkles, ChevronLeft, Settings,
    Search, BarChart3, Globe, Activity, Users, Key
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { CommandPalette } from "@/components/dashboard/CommandPalette"
import { NotificationPanel } from "@/components/dashboard/NotificationPanel"
import { UserMenu } from "@/components/dashboard/UserMenu"

const navItems = [
    { name: "Overview", icon: LayoutDashboard, href: "/dashboard" },
    { name: "AI Agents", icon: Bot, href: "/dashboard/agents" },
    { name: "Templates", icon: Layout, href: "/dashboard/templates" },
    { name: "Marketplace", icon: ShoppingBag, href: "/dashboard/marketplace" },
    { name: "Builder", icon: Zap, href: "/dashboard/builder" },
    { name: "Analytics", icon: BarChart3, href: "/dashboard/analytics" },
    { name: "Integrations", icon: Globe, href: "/dashboard/integrations" },
    { name: "Logs", icon: Activity, href: "/dashboard/logs" },
    { name: "Downloads", icon: Download, href: "/dashboard/downloads" },
    { name: "Team", icon: Users, href: "/dashboard/team" },
    { name: "API Keys", icon: Key, href: "/dashboard/api-keys" },
    { name: "Settings", icon: Settings, href: "/dashboard/settings" },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [collapsed, setCollapsed] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const pathname = usePathname()

    const openCommandPalette = () => {
        window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }))
    }

    return (
        <div className="min-h-screen bg-[#0B0B0F] text-[#F8F8FF] font-sans">
            <CommandPalette />

            {/* Sidebar */}
            <motion.aside
                initial={false}
                animate={{ width: collapsed ? 72 : 256 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="fixed left-0 top-0 bottom-0 bg-[#09090B] border-r border-white/[0.04] hidden lg:flex flex-col z-40"
            >
                <div className={`h-16 flex items-center border-b border-white/[0.04] ${collapsed ? "justify-center px-0" : "px-5"}`}>
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <Image src="/logo.svg" alt="AgensHub" width={30} height={30} className="flex-shrink-0 group-hover:scale-105 transition-transform" />
                        {!collapsed && (
                            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[14px] font-semibold text-white tracking-tight">
                                AgensHub
                            </motion.span>
                        )}
                    </Link>
                </div>

                <nav className="flex-1 py-4 px-3 space-y-0.5 overflow-y-auto">
                    {navItems.map((item) => {
                        const active = pathname === item.href
                        return (
                            <Link key={item.name} href={item.href}
                                className={`flex items-center gap-3 h-9 rounded-xl text-[13px] font-medium transition-all duration-200 relative group ${collapsed ? "justify-center px-0" : "px-3"
                                    } ${active
                                        ? "text-white bg-white/[0.06]"
                                        : "text-[#9CA3AF] hover:text-white hover:bg-white/[0.03]"
                                    }`}
                            >
                                <item.icon className={`w-[18px] h-[18px] flex-shrink-0 ${active ? "text-[#6366F1]" : ""}`} />
                                {!collapsed && <span>{item.name}</span>}
                                {active && <motion.div layoutId="sidebar-active" className="absolute left-0 w-[3px] h-4 bg-[#6366F1] rounded-r-full" />}
                            </Link>
                        )
                    })}
                </nav>

                <div className="py-3 px-3 border-t border-white/[0.04] space-y-0.5">
                    <Link href="/dashboard/account"
                        className={`flex items-center gap-3 h-9 rounded-xl text-[13px] font-medium text-[#9CA3AF] hover:text-white hover:bg-white/[0.03] transition-all ${collapsed ? "justify-center" : "px-3"}`}
                    >
                        <User className="w-[18px] h-[18px] flex-shrink-0" />
                        {!collapsed && <span>Account</span>}
                    </Link>
                    <button onClick={async () => {
                        const { createSupabaseBrowser } = await import("@/lib/supabase-browser")
                        const supabase = createSupabaseBrowser()
                        await supabase.auth.signOut()
                        window.location.href = "/"
                    }} className={`w-full flex items-center gap-3 h-9 rounded-xl text-[13px] font-medium text-[#9CA3AF] hover:text-red-400 hover:bg-red-400/5 transition-all ${collapsed ? "justify-center" : "px-3"}`}>
                        <LogOut className="w-[18px] h-[18px] flex-shrink-0" />
                        {!collapsed && <span>Sign out</span>}
                    </button>
                </div>

                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="absolute -right-3 top-20 w-6 h-6 bg-[#111118] border border-white/[0.06] rounded-full flex items-center justify-center text-[#9CA3AF] hover:text-white hover:border-white/[0.12] transition-all z-50"
                >
                    <ChevronLeft className={`w-3 h-3 transition-transform ${collapsed ? "rotate-180" : ""}`} />
                </button>
            </motion.aside>

            {/* Main */}
            <motion.div
                initial={false}
                animate={{ marginLeft: collapsed ? 72 : 256 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="min-h-screen hidden lg:block"
            >
                <header className="h-16 border-b border-white/[0.04] bg-[#0B0B0F]/80 backdrop-blur-xl sticky top-0 z-30 flex items-center justify-between px-8">
                    <div className="flex items-center gap-3 max-w-md w-full">
                        <div className="relative w-full group cursor-pointer" onClick={openCommandPalette}>
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#9CA3AF]/50" />
                            <Input
                                readOnly
                                placeholder="Search agents, templates..."
                                className="bg-white/[0.02] border-white/[0.04] pl-9 h-9 text-[13px] rounded-xl text-white placeholder:text-[#9CA3AF]/40 cursor-pointer pointer-events-none"
                            />
                            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-[#9CA3AF]/40 bg-white/[0.03] px-1.5 py-0.5 rounded border border-white/[0.04]">⌘K</kbd>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <NotificationPanel />
                        <Link href="/dashboard/account">
                            <button className="h-9 w-9 rounded-xl text-[#9CA3AF] hover:text-white hover:bg-white/[0.04] flex items-center justify-center transition-colors">
                                <Settings className="w-4 h-4" />
                            </button>
                        </Link>
                        <div className="w-px h-5 bg-white/[0.06] mx-1" />
                        <UserMenu />
                    </div>
                </header>

                <div className="p-8 lg:p-10 max-w-[1400px] mx-auto">
                    {children}
                </div>
            </motion.div>

            {/* Mobile layout */}
            <div className="lg:hidden min-h-screen">
                <header className="h-14 border-b border-white/[0.04] bg-[#09090B] px-4 flex items-center justify-between sticky top-0 z-40">
                    <div className="flex items-center gap-2">
                        <Image src="/logo.svg" alt="AgensHub" width={28} height={28} />
                        <span className="text-[13px] font-semibold text-white">AgensHub</span>
                    </div>
                    <button onClick={() => setMobileOpen(true)}><Menu className="w-5 h-5 text-white" /></button>
                </header>
                <div className="p-4">{children}</div>
            </div>

            {/* Mobile drawer */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setMobileOpen(false)} className="fixed inset-0 bg-black/60 z-50 lg:hidden" />
                        <motion.div initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed left-0 top-0 bottom-0 w-[280px] bg-[#0B0B0F] border-r border-white/[0.04] z-50 lg:hidden p-6 flex flex-col"
                        >
                            <div className="flex justify-between items-center mb-8">
                                <span className="text-[14px] font-semibold text-white">Menu</span>
                                <button onClick={() => setMobileOpen(false)}><X className="w-5 h-5 text-white" /></button>
                            </div>
                            <nav className="space-y-1">
                                {navItems.map((item) => (
                                    <Link key={item.name} href={item.href} onClick={() => setMobileOpen(false)}
                                        className="flex items-center gap-3 h-10 px-3 rounded-xl text-[14px] font-medium text-[#9CA3AF] hover:text-white hover:bg-white/[0.04] transition-all"
                                    >
                                        <item.icon className="w-4 h-4" /> {item.name}
                                    </Link>
                                ))}
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}
