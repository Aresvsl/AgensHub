"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, Bot, Settings, ShieldAlert, ArrowLeft, Sparkles } from "lucide-react"

const adminNav = [
    { name: "Overview", icon: LayoutDashboard, href: "/admin" },
    { name: "Users", icon: Users, href: "/admin/users" },
    { name: "Agents", icon: Bot, href: "/admin/agents" },
    { name: "Settings", icon: Settings, href: "/admin/settings" },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()

    return (
        <div className="min-h-screen bg-[#0B0B0F] text-[#F8F8FF] font-sans">
            <header className="h-14 border-b border-white/[0.04] bg-[#0B0B0F] px-6 flex items-center justify-between sticky top-0 z-40">
                <div className="flex items-center gap-6">
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center">
                            <Sparkles className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="text-[13px] font-semibold text-white">AgensHub</span>
                    </Link>
                    <div className="w-px h-5 bg-white/[0.06]" />
                    <div className="flex items-center gap-1.5">
                        <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
                        <span className="text-[12px] font-medium text-red-400">Admin</span>
                    </div>
                </div>
                <Link href="/dashboard" className="flex items-center gap-2 text-[12px] text-[#9CA3AF] hover:text-white transition-colors">
                    <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
                </Link>
            </header>

            <div className="flex">
                <nav className="w-56 border-r border-white/[0.04] p-4 sticky top-14 h-[calc(100vh-3.5rem)]">
                    <div className="space-y-0.5">
                        {adminNav.map((item) => {
                            const active = pathname === item.href
                            return (
                                <Link key={item.name} href={item.href}
                                    className={`flex items-center gap-3 h-9 px-3 rounded-xl text-[13px] font-medium transition-all ${active ? "bg-white/[0.06] text-white" : "text-[#9CA3AF] hover:text-white hover:bg-white/[0.03]"
                                        }`}>
                                    <item.icon className={`w-4 h-4 ${active ? "text-[#6366F1]" : ""}`} /> {item.name}
                                </Link>
                            )
                        })}
                    </div>
                </nav>
                <main className="flex-1 p-8 lg:p-10 max-w-[1200px]">
                    {children}
                </main>
            </div>
        </div>
    )
}
