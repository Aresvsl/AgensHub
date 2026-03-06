"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Zap, Bot, Globe, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface CreateWorkflowModalProps {
    open: boolean
    onClose: () => void
}

const templates = [
    { name: "Blank", icon: Zap, description: "Start from scratch." },
    { name: "Chatbot", icon: MessageSquare, description: "Conversational AI agent." },
    { name: "API Automation", icon: Globe, description: "Connect external APIs." },
    { name: "AI Pipeline", icon: Bot, description: "Chain multiple models." },
]

export function CreateWorkflowModal({ open, onClose }: CreateWorkflowModalProps) {
    const [name, setName] = useState("")
    const [selected, setSelected] = useState(0)

    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg z-[61]"
                    >
                        <div className="bg-[#111118] border border-white/[0.06] rounded-2xl shadow-[0_40px_120px_rgba(0,0,0,0.7)] overflow-hidden">
                            <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.04]">
                                <h2 className="text-[16px] font-semibold text-white">Create New Workflow</h2>
                                <button onClick={onClose} className="text-[#9CA3AF] hover:text-white transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="p-6 space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[12px] font-medium text-[#9CA3AF]">Workflow Name</label>
                                    <Input
                                        value={name} onChange={(e) => setName(e.target.value)}
                                        placeholder="e.g. Lead Qualification Flow"
                                        className="bg-white/[0.03] border-white/[0.06] text-white h-11 rounded-xl text-[14px] focus-visible:ring-1 focus-visible:ring-[#6366F1]/50"
                                    />
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[12px] font-medium text-[#9CA3AF]">Start from a template</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {templates.map((t, i) => (
                                            <button key={t.name} onClick={() => setSelected(i)}
                                                className={`p-4 rounded-xl border text-left transition-all ${selected === i
                                                        ? "border-[#6366F1]/30 bg-[#6366F1]/5"
                                                        : "border-white/[0.04] bg-white/[0.02] hover:border-white/[0.08]"
                                                    }`}
                                            >
                                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${selected === i ? "bg-[#6366F1]/20" : "bg-white/[0.04]"
                                                    }`}>
                                                    <t.icon className={`w-4 h-4 ${selected === i ? "text-[#6366F1]" : "text-[#9CA3AF]"}`} />
                                                </div>
                                                <div className="text-[13px] font-medium text-white">{t.name}</div>
                                                <div className="text-[11px] text-[#9CA3AF] mt-0.5">{t.description}</div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="px-6 py-4 border-t border-white/[0.04] flex justify-end gap-3">
                                <Button variant="ghost" onClick={onClose} className="text-[#9CA3AF] hover:text-white rounded-xl h-10 px-5 text-[13px]">
                                    Cancel
                                </Button>
                                <Button onClick={onClose}
                                    className="bg-[#6366F1] hover:bg-[#5558E6] text-white rounded-xl h-10 px-6 text-[13px] font-medium shadow-glow transition-all">
                                    Create workflow
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
