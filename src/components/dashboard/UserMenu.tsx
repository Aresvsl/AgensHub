"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { User, Settings, CreditCard, LogOut, ShieldCheck, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function UserMenu() {
    const [open, setOpen] = useState(false)

    return (
        <div className="relative">
            <button onClick={() => setOpen(!open)} className="flex items-center gap-3 pl-2 cursor-pointer group">
                <div className="text-right hidden sm:block">
                    <div className="text-[12px] font-medium text-white leading-none">Dexter AI</div>
                    <div className="text-[10px] text-[#9CA3AF] mt-0.5">Pro Plan</div>
                </div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center text-[10px] font-semibold text-white group-hover:shadow-glow transition-shadow">
                    DA
                </div>
            </button>

            <AnimatePresence>
                {open && (
                    <>
                        <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
                        <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.96 }}
                            transition={{ duration: 0.15 }}
                            className="absolute right-0 top-12 w-[240px] bg-[#111118] border border-white/[0.06] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] z-50 overflow-hidden py-2"
                        >
                            <div className="px-4 py-3 border-b border-white/[0.04] mb-1">
                                <div className="text-[13px] font-semibold text-white">Dexter AI</div>
                                <div className="text-[11px] text-[#9CA3AF]">dexter@hub.com</div>
                                <Badge className="mt-2 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white border-none text-[9px] font-semibold px-2 py-0">PRO</Badge>
                            </div>

                            {[
                                { icon: User, label: "Profile", href: "/dashboard/account" },
                                { icon: Settings, label: "Settings", href: "/dashboard/account" },
                                { icon: CreditCard, label: "Billing", href: "/dashboard/account" },
                                { icon: ShieldCheck, label: "Admin Panel", href: "/admin" },
                            ].map((item) => (
                                <Link key={item.label} href={item.href} onClick={() => setOpen(false)}
                                    className="flex items-center gap-3 px-4 py-2 text-[13px] font-medium text-[#9CA3AF] hover:text-white hover:bg-white/[0.03] transition-colors group">
                                    <item.icon className="w-4 h-4" />
                                    <span className="flex-1">{item.label}</span>
                                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-50 transition-opacity" />
                                </Link>
                            ))}

                            <div className="border-t border-white/[0.04] mt-1 pt-1">
                                <button className="w-full flex items-center gap-3 px-4 py-2 text-[13px] font-medium text-red-400 hover:bg-red-400/5 transition-colors">
                                    <LogOut className="w-4 h-4" /> Sign out
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}
