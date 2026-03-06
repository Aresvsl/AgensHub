"use client"

import { motion } from "framer-motion"
import { Bot, Settings, Play, Save, Plus, Database, Webhook, MessageSquare, Globe, Mail, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

const tools = [
    { name: "GPT-4 Model", icon: Bot, color: "text-[#6366F1]" },
    { name: "Webhook", icon: Webhook, color: "text-cyan-400" },
    { name: "WhatsApp", icon: MessageSquare, color: "text-emerald-400" },
    { name: "Email Sender", icon: Mail, color: "text-amber-400" },
    { name: "Database", icon: Database, color: "text-rose-400" },
    { name: "API Request", icon: Globe, color: "text-[#8B5CF6]" },
]

export default function BuilderPage() {
    return (
        <div className="h-[calc(100vh-7rem)] flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Visual Builder</h1>
                    <p className="text-[#9CA3AF] mt-1 text-[15px] font-light">Orchestrate agents with a node-based editor.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="h-9 px-4 text-[12px] font-medium border-white/[0.06] bg-white/[0.02] text-white rounded-xl hover:bg-white/[0.04]">
                        <Save className="w-3.5 h-3.5 mr-2 text-[#9CA3AF]" /> Save
                    </Button>
                    <Button className="h-9 px-4 text-[12px] font-medium bg-[#6366F1] hover:bg-[#5558E6] text-white rounded-xl shadow-glow transition-all">
                        <Play className="w-3.5 h-3.5 mr-2" /> Run Agent
                    </Button>
                </div>
            </div>

            <div className="flex-1 flex gap-4 overflow-hidden">
                {/* Toolbox */}
                <div className="w-64 card-premium p-5 flex flex-col gap-6 overflow-y-auto flex-shrink-0">
                    <h3 className="text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-wider">Components</h3>
                    <div className="space-y-1.5">
                        {tools.map((tool) => (
                            <div key={tool.name}
                                className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] cursor-grab hover:bg-white/[0.04] hover:border-white/[0.08] transition-all group">
                                <div className="w-8 h-8 rounded-lg bg-[#0B0B0F] flex items-center justify-center border border-white/[0.04]">
                                    <tool.icon className={`w-4 h-4 ${tool.color}`} />
                                </div>
                                <span className="text-[13px] font-medium text-white">{tool.name}</span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-auto p-4 rounded-xl bg-[#6366F1]/5 border border-[#6366F1]/10">
                        <div className="flex items-center gap-2 mb-2">
                            <Zap className="w-3.5 h-3.5 text-[#6366F1]" />
                            <span className="text-[12px] font-semibold text-white">AI Assist</span>
                        </div>
                        <p className="text-[11px] text-[#9CA3AF] leading-relaxed">Describe your goal in natural language to auto-generate the flow.</p>
                    </div>
                </div>

                {/* Canvas */}
                <div className="flex-1 card-premium relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(#ffffff04_1px,transparent_1px)] bg-[size:24px_24px]" />

                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-14 h-14 rounded-full border-2 border-dashed border-white/10 flex items-center justify-center">
                                <Plus className="w-5 h-5 text-[#9CA3AF]" />
                            </div>
                            <p className="text-[12px] font-medium text-[#9CA3AF] uppercase tracking-wider">Drag components to build</p>
                        </div>
                    </div>

                    {/* Example nodes */}
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                        className="absolute top-16 left-16 p-5 bg-[#111118] border border-[#6366F1]/20 rounded-2xl w-56 shadow-glow z-10">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-lg bg-[#6366F1]/20 flex items-center justify-center">
                                    <Zap className="w-3 h-3 text-[#6366F1]" />
                                </div>
                                <span className="text-[12px] font-semibold text-white">Trigger</span>
                            </div>
                            <Settings className="w-3 h-3 text-[#9CA3AF]/40" />
                        </div>
                        <div className="h-8 bg-white/[0.02] rounded-lg border border-white/[0.04] flex items-center px-3">
                            <span className="text-[10px] text-[#9CA3AF]">webhook_url</span>
                            <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(34,197,94,0.5)]" />
                        </div>
                        <div className="absolute top-1/2 -right-12 h-px w-12 bg-gradient-to-r from-[#6366F1]/40 to-[#6366F1]/10" />
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}
                        className="absolute top-16 left-[380px] p-5 bg-[#111118] border border-white/[0.04] rounded-2xl w-56 shadow-premium z-10">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-lg bg-[#6366F1]/10 flex items-center justify-center">
                                    <Bot className="w-3 h-3 text-[#6366F1]" />
                                </div>
                                <span className="text-[12px] font-semibold text-white">GPT-4</span>
                            </div>
                            <Settings className="w-3 h-3 text-[#9CA3AF]/40" />
                        </div>
                        <div className="space-y-2">
                            <div className="h-7 bg-white/[0.02] rounded-lg border border-white/[0.04] flex items-center px-3 text-[10px] text-[#9CA3AF]">System prompt...</div>
                            <div className="h-16 bg-white/[0.02] rounded-lg border border-white/[0.04] p-3 text-[10px] text-[#9CA3AF]/60 italic leading-relaxed">
                                &quot;You are a sales specialist...&quot;
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
