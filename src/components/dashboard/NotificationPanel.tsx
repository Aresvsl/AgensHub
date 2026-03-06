"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, Bot, Zap, CreditCard, CheckCircle2, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const notifications = [
    { id: 1, title: "Agent deployed successfully", description: "Sales Closer AI is now active.", icon: Bot, time: "2m ago", read: false, color: "text-emerald-400" },
    { id: 2, title: "New template available", description: "AI Chatbot SaaS v2 has been released.", icon: Zap, time: "1h ago", read: false, color: "text-[#6366F1]" },
    { id: 3, title: "Payment received", description: "Monthly subscription renewed — $97.00", icon: CreditCard, time: "3h ago", read: true, color: "text-amber-400" },
    { id: 4, title: "Workflow completed", description: "Lead Generation flow finished 142 tasks.", icon: CheckCircle2, time: "5h ago", read: true, color: "text-cyan-400" },
]

export function NotificationPanel() {
    const [open, setOpen] = useState(false)
    const [items, setItems] = useState(notifications)
    const unread = items.filter(n => !n.read).length

    const markAllRead = () => setItems(items.map(n => ({ ...n, read: true })))

    return (
        <div className="relative">
            <Button variant="ghost" size="icon" onClick={() => setOpen(!open)}
                className="h-9 w-9 rounded-xl text-[#9CA3AF] hover:text-white hover:bg-white/[0.04] relative">
                <Bell className="w-4 h-4" />
                {unread > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#6366F1] text-[9px] font-bold text-white flex items-center justify-center">
                        {unread}
                    </span>
                )}
            </Button>

            <AnimatePresence>
                {open && (
                    <>
                        <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
                        <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.96 }}
                            transition={{ duration: 0.15 }}
                            className="absolute right-0 top-12 w-[380px] bg-[#111118] border border-white/[0.06] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] z-50 overflow-hidden"
                        >
                            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.04]">
                                <h3 className="text-[14px] font-semibold text-white">Notifications</h3>
                                <div className="flex items-center gap-2">
                                    {unread > 0 && (
                                        <button onClick={markAllRead} className="text-[11px] text-[#6366F1] hover:text-[#8B5CF6] font-medium transition-colors">
                                            Mark all read
                                        </button>
                                    )}
                                    <button onClick={() => setOpen(false)} className="text-[#9CA3AF] hover:text-white">
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <div className="max-h-[400px] overflow-y-auto">
                                {items.map((notif) => (
                                    <div key={notif.id}
                                        className={`flex gap-3 px-5 py-4 border-b border-white/[0.02] hover:bg-white/[0.02] transition-colors cursor-pointer ${!notif.read ? "bg-[#6366F1]/[0.03]" : ""}`}
                                    >
                                        <div className={`w-8 h-8 rounded-xl bg-white/[0.04] flex items-center justify-center flex-shrink-0 ${notif.color}`}>
                                            <notif.icon className="w-4 h-4" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[13px] font-medium text-white">{notif.title}</span>
                                                {!notif.read && <div className="w-1.5 h-1.5 rounded-full bg-[#6366F1]" />}
                                            </div>
                                            <p className="text-[12px] text-[#9CA3AF] mt-0.5">{notif.description}</p>
                                            <span className="text-[10px] text-[#9CA3AF]/50 mt-1 block">{notif.time}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="px-5 py-3 border-t border-white/[0.04]">
                                <button className="w-full text-center text-[12px] text-[#6366F1] hover:text-[#8B5CF6] font-medium transition-colors">
                                    View all notifications
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}
