"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Settings, Globe, Bell, Shield, Palette, Trash2, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/toast-provider"

export default function SettingsPage() {
    const { showToast } = useToast()
    const [workspaceName, setWorkspaceName] = useState("AgensHub")
    const [timezone, setTimezone] = useState("America/Sao_Paulo")

    return (
        <div className="space-y-8 max-w-3xl">
            <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">Settings</h1>
                <p className="text-[#9CA3AF] mt-1 text-[15px] font-light">Manage your workspace configuration.</p>
            </div>

            {/* General */}
            <div className="card-premium p-8 space-y-6">
                <div className="flex items-center gap-3 mb-2">
                    <Globe className="w-4 h-4 text-[#6366F1]" />
                    <h2 className="text-[16px] font-semibold text-white">General</h2>
                </div>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-[12px] font-medium text-[#9CA3AF]">Workspace Name</label>
                        <Input value={workspaceName} onChange={(e) => setWorkspaceName(e.target.value)}
                            className="bg-white/[0.03] border-white/[0.06] text-white h-10 rounded-xl text-[14px] focus-visible:ring-1 focus-visible:ring-[#6366F1]/50 max-w-sm" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[12px] font-medium text-[#9CA3AF]">Timezone</label>
                        <select value={timezone} onChange={(e) => setTimezone(e.target.value)}
                            className="bg-white/[0.03] border border-white/[0.06] text-white h-10 rounded-xl text-[14px] px-4 outline-none max-w-sm w-full">
                            <option value="America/Sao_Paulo">America/São Paulo (UTC-3)</option>
                            <option value="America/New_York">America/New York (UTC-5)</option>
                            <option value="Europe/London">Europe/London (UTC+0)</option>
                            <option value="Asia/Tokyo">Asia/Tokyo (UTC+9)</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[12px] font-medium text-[#9CA3AF]">Language</label>
                        <select className="bg-white/[0.03] border border-white/[0.06] text-white h-10 rounded-xl text-[14px] px-4 outline-none max-w-sm w-full">
                            <option>Português (BR)</option>
                            <option>English</option>
                            <option>Español</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Notifications */}
            <div className="card-premium p-8 space-y-6">
                <div className="flex items-center gap-3 mb-2">
                    <Bell className="w-4 h-4 text-[#6366F1]" />
                    <h2 className="text-[16px] font-semibold text-white">Notifications</h2>
                </div>
                {[
                    { label: "Agent deployment alerts", enabled: true },
                    { label: "Weekly performance reports", enabled: true },
                    { label: "Team member activity", enabled: false },
                    { label: "Billing reminders", enabled: true },
                    { label: "System maintenance", enabled: false },
                ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-2">
                        <span className="text-[14px] text-[#9CA3AF]">{item.label}</span>
                        <button className={`w-10 h-5 rounded-full transition-colors relative ${item.enabled ? "bg-[#6366F1]" : "bg-white/[0.06]"}`}>
                            <div className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-all ${item.enabled ? "left-5.5" : "left-0.5"}`}
                                style={{ left: item.enabled ? "22px" : "2px" }} />
                        </button>
                    </div>
                ))}
            </div>

            {/* Appearance */}
            <div className="card-premium p-8 space-y-6">
                <div className="flex items-center gap-3 mb-2">
                    <Palette className="w-4 h-4 text-[#6366F1]" />
                    <h2 className="text-[16px] font-semibold text-white">Appearance</h2>
                </div>
                <div className="space-y-2">
                    <label className="text-[12px] font-medium text-[#9CA3AF]">Theme</label>
                    <div className="flex gap-3">
                        {["Dark", "Light", "System"].map((theme) => (
                            <button key={theme}
                                className={`px-4 py-2 rounded-xl text-[13px] font-medium border transition-all ${theme === "Dark" ? "bg-[#6366F1]/10 border-[#6366F1]/20 text-[#6366F1]" : "bg-white/[0.02] border-white/[0.04] text-[#9CA3AF] hover:border-white/[0.08]"
                                    }`}>{theme}</button>
                        ))}
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-[12px] font-medium text-[#9CA3AF]">Sidebar</label>
                    <div className="flex gap-3">
                        {["Expanded", "Collapsed", "Auto"].map((mode) => (
                            <button key={mode}
                                className={`px-4 py-2 rounded-xl text-[13px] font-medium border transition-all ${mode === "Expanded" ? "bg-[#6366F1]/10 border-[#6366F1]/20 text-[#6366F1]" : "bg-white/[0.02] border-white/[0.04] text-[#9CA3AF] hover:border-white/[0.08]"
                                    }`}>{mode}</button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Danger Zone */}
            <div className="card-premium p-8 border-red-500/10">
                <div className="flex items-center gap-3 mb-4">
                    <Trash2 className="w-4 h-4 text-red-400" />
                    <h2 className="text-[16px] font-semibold text-white">Danger Zone</h2>
                </div>
                <p className="text-[13px] text-[#9CA3AF] mb-4">Permanently delete this workspace and all associated data. This action cannot be undone.</p>
                <Button variant="outline" className="border-red-500/20 text-red-400 hover:bg-red-500/10 rounded-xl h-9 px-5 text-[13px]">
                    Delete workspace
                </Button>
            </div>

            <Button onClick={() => showToast("Settings saved!")}
                className="h-10 px-6 text-[13px] font-medium bg-[#6366F1] hover:bg-[#5558E6] text-white rounded-xl shadow-glow transition-all">
                <Save className="w-4 h-4 mr-2" /> Save changes
            </Button>
        </div>
    )
}
