"use client"

import { useState } from "react"
import { User, CreditCard, Shield, Bell, Key, Smartphone, Globe, ChevronRight, Eye, EyeOff, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/components/providers/auth-provider"
import { useToast } from "@/components/ui/toast-provider"

const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "security", label: "Security", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
]

export default function AccountPage() {
    const [activeTab, setActiveTab] = useState("profile")
    const [showKey, setShowKey] = useState(false)
    const [portalLoading, setPortalLoading] = useState(false)
    const { profile } = useAuth()
    const { showToast } = useToast()

    const openBillingPortal = async () => {
        setPortalLoading(true)
        try {
            const res = await fetch("/api/stripe/portal", { method: "POST" })
            const data = await res.json()
            if (data.url) {
                window.location.href = data.url
            } else {
                showToast(data.error || "Could not open billing portal", "error")
            }
        } catch {
            showToast("Could not open billing portal", "error")
        }
        setPortalLoading(false)
    }

    return (
        <div className="max-w-5xl space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">Settings</h1>
                <p className="text-[#9CA3AF] mt-1 text-[15px] font-light">Manage your profile, billing, and security.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                {/* Tabs */}
                <div className="md:col-span-1 space-y-1">
                    {tabs.map((tab) => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-3 h-9 px-3 rounded-xl text-[13px] font-medium transition-all ${activeTab === tab.id ? "bg-white/[0.06] text-white" : "text-[#9CA3AF] hover:text-white hover:bg-white/[0.03]"
                                }`}>
                            <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? "text-[#6366F1]" : ""}`} /> {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="md:col-span-4 space-y-8">
                    {activeTab === "profile" && (
                        <>
                            <section className="space-y-6">
                                <h3 className="text-[16px] font-semibold text-white">Personal Information</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[12px] font-medium text-[#9CA3AF]">Full Name</label>
                                        <Input defaultValue="Dexter AI" className="bg-white/[0.02] border-white/[0.04] text-white h-10 rounded-xl text-[14px] focus-visible:ring-1 focus-visible:ring-[#6366F1]/50" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[12px] font-medium text-[#9CA3AF]">Email</label>
                                        <Input defaultValue="dexter@hub.com" className="bg-white/[0.02] border-white/[0.04] text-white h-10 rounded-xl text-[14px] focus-visible:ring-1 focus-visible:ring-[#6366F1]/50" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[12px] font-medium text-[#9CA3AF]">Company</label>
                                        <Input defaultValue="ScaleAI Labs" className="bg-white/[0.02] border-white/[0.04] text-white h-10 rounded-xl text-[14px] focus-visible:ring-1 focus-visible:ring-[#6366F1]/50" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[12px] font-medium text-[#9CA3AF]">Role</label>
                                        <Input defaultValue="CTO" className="bg-white/[0.02] border-white/[0.04] text-white h-10 rounded-xl text-[14px] focus-visible:ring-1 focus-visible:ring-[#6366F1]/50" />
                                    </div>
                                </div>
                                <Button className="h-9 px-6 text-[13px] font-medium bg-[#6366F1] hover:bg-[#5558E6] text-white rounded-xl shadow-glow transition-all">
                                    Save changes
                                </Button>
                            </section>

                            <section className="space-y-4">
                                <h3 className="text-[16px] font-semibold text-white">API Key</h3>
                                <div className="card-premium p-5 flex items-center gap-4">
                                    <div className="flex-1">
                                        <Input
                                            readOnly
                                            type={showKey ? "text" : "password"}
                                            value="sk_live_br_agents_4f8a9c2d1e7b3f5a"
                                            className="bg-white/[0.02] border-white/[0.04] text-white h-10 rounded-xl text-[13px] font-mono focus-visible:ring-1 focus-visible:ring-[#6366F1]/50"
                                        />
                                    </div>
                                    <Button variant="ghost" size="icon" onClick={() => setShowKey(!showKey)}
                                        className="h-10 w-10 rounded-xl text-[#9CA3AF] hover:text-white hover:bg-white/[0.04]">
                                        {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </Button>
                                    <Button variant="outline" className="border-white/[0.06] text-white h-10 rounded-xl text-[12px] hover:bg-white/[0.04]">
                                        Regenerate
                                    </Button>
                                </div>
                            </section>
                        </>
                    )}

                    {activeTab === "billing" && (
                        <>
                            <section className="card-premium p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                                <div>
                                    <h3 className="text-[16px] font-semibold text-white mb-2">Current Plan</h3>
                                    <div className="flex items-center gap-3">
                                        <Badge className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white border-none text-[10px] font-semibold px-3 py-0.5">{profile?.plan?.toUpperCase() || "PRO"}</Badge>
                                        <span className="text-[#9CA3AF] text-[13px]">$97/mo · Renews April 5, 2026</span>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <Button onClick={openBillingPortal} disabled={portalLoading} variant="outline" className="border-white/[0.06] text-white hover:bg-white/[0.04] rounded-xl h-9 px-5 text-[13px]">
                                        {portalLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Manage plan"}
                                    </Button>
                                    <Button onClick={openBillingPortal} variant="ghost" className="text-red-400 hover:bg-red-400/5 rounded-xl h-9 px-5 text-[13px]">
                                        Cancel
                                    </Button>
                                </div>
                            </section>

                            <section className="space-y-4">
                                <h3 className="text-[16px] font-semibold text-white">Payment Method</h3>
                                <div className="card-premium p-5 flex items-center gap-4">
                                    <div className="w-12 h-8 bg-white/[0.04] rounded-lg flex items-center justify-center border border-white/[0.06]">
                                        <CreditCard className="w-5 h-5 text-[#9CA3AF]" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-[13px] font-medium text-white">•••• •••• •••• 4242</div>
                                        <div className="text-[11px] text-[#9CA3AF]">Expires 12/2028</div>
                                    </div>
                                    <Button onClick={openBillingPortal} variant="ghost" className="text-[#6366F1] text-[12px] font-medium h-8 px-3 rounded-lg hover:bg-[#6366F1]/10">
                                        Update
                                    </Button>
                                </div>
                            </section>

                            <section className="space-y-4">
                                <h3 className="text-[16px] font-semibold text-white">Billing History</h3>
                                <div className="card-premium overflow-hidden">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-white/[0.04]">
                                                <th className="px-5 py-3 text-left text-[11px] font-medium text-[#9CA3AF] uppercase tracking-wider">Date</th>
                                                <th className="px-5 py-3 text-left text-[11px] font-medium text-[#9CA3AF] uppercase tracking-wider">Amount</th>
                                                <th className="px-5 py-3 text-left text-[11px] font-medium text-[#9CA3AF] uppercase tracking-wider">Status</th>
                                                <th className="px-5 py-3 text-right text-[11px] font-medium text-[#9CA3AF] uppercase tracking-wider">Invoice</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/[0.03]">
                                            {[
                                                { date: "Mar 5, 2026", amount: "$97.00", status: "Paid" },
                                                { date: "Feb 5, 2026", amount: "$97.00", status: "Paid" },
                                                { date: "Jan 5, 2026", amount: "$97.00", status: "Paid" },
                                            ].map((inv, i) => (
                                                <tr key={i} className="hover:bg-white/[0.01]">
                                                    <td className="px-5 py-3 text-[13px] text-white">{inv.date}</td>
                                                    <td className="px-5 py-3 text-[13px] text-white">{inv.amount}</td>
                                                    <td className="px-5 py-3"><span className="text-emerald-400 text-[12px] font-medium">{inv.status}</span></td>
                                                    <td className="px-5 py-3 text-right">
                                                        <Button variant="ghost" className="text-[#6366F1] text-[12px] font-medium h-7 px-2 rounded-lg hover:bg-[#6366F1]/10">
                                                            Download
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </section>
                        </>
                    )}

                    {activeTab === "security" && (
                        <>
                            <section className="space-y-4">
                                <h3 className="text-[16px] font-semibold text-white">Password</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[12px] font-medium text-[#9CA3AF]">Current Password</label>
                                        <Input type="password" placeholder="••••••••" className="bg-white/[0.02] border-white/[0.04] text-white h-10 rounded-xl text-[14px] focus-visible:ring-1 focus-visible:ring-[#6366F1]/50" />
                                    </div>
                                    <div />
                                    <div className="space-y-2">
                                        <label className="text-[12px] font-medium text-[#9CA3AF]">New Password</label>
                                        <Input type="password" placeholder="••••••••" className="bg-white/[0.02] border-white/[0.04] text-white h-10 rounded-xl text-[14px] focus-visible:ring-1 focus-visible:ring-[#6366F1]/50" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[12px] font-medium text-[#9CA3AF]">Confirm New Password</label>
                                        <Input type="password" placeholder="••••••••" className="bg-white/[0.02] border-white/[0.04] text-white h-10 rounded-xl text-[14px] focus-visible:ring-1 focus-visible:ring-[#6366F1]/50" />
                                    </div>
                                </div>
                                <Button className="h-9 px-6 text-[13px] font-medium bg-[#6366F1] hover:bg-[#5558E6] text-white rounded-xl shadow-glow transition-all">
                                    Update password
                                </Button>
                            </section>

                            <section className="space-y-4">
                                <h3 className="text-[16px] font-semibold text-white">Two-Factor Authentication</h3>
                                <div className="card-premium p-6 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                                            <Smartphone className="w-5 h-5 text-emerald-400" />
                                        </div>
                                        <div>
                                            <div className="text-[14px] font-medium text-white">Authenticator App</div>
                                            <div className="text-[12px] text-emerald-400 font-medium">Enabled</div>
                                        </div>
                                    </div>
                                    <Button variant="outline" className="border-white/[0.06] text-white h-9 rounded-xl text-[12px] hover:bg-white/[0.04]">
                                        Configure
                                    </Button>
                                </div>
                            </section>

                            <section className="space-y-4">
                                <h3 className="text-[16px] font-semibold text-white">Active Sessions</h3>
                                <div className="space-y-2">
                                    {[
                                        { device: "Chrome on Windows", location: "São Paulo, BR", current: true },
                                        { device: "Safari on iPhone", location: "São Paulo, BR", current: false },
                                    ].map((session, i) => (
                                        <div key={i} className="card-premium p-5 flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="w-9 h-9 rounded-xl bg-white/[0.04] flex items-center justify-center">
                                                    <Globe className="w-4 h-4 text-[#9CA3AF]" />
                                                </div>
                                                <div>
                                                    <div className="text-[13px] font-medium text-white flex items-center gap-2">
                                                        {session.device}
                                                        {session.current && <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/20 text-[9px]">Current</Badge>}
                                                    </div>
                                                    <div className="text-[11px] text-[#9CA3AF]">{session.location}</div>
                                                </div>
                                            </div>
                                            {!session.current && (
                                                <Button variant="ghost" className="text-red-400 text-[12px] h-8 px-3 rounded-lg hover:bg-red-400/5">
                                                    Revoke
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </>
                    )}

                    {activeTab === "notifications" && (
                        <section className="space-y-6">
                            <h3 className="text-[16px] font-semibold text-white">Notification Preferences</h3>
                            {[
                                { title: "Agent Alerts", desc: "Receive alerts when agents fail or complete tasks.", enabled: true },
                                { title: "Billing Updates", desc: "Get notified about payments and subscription changes.", enabled: true },
                                { title: "Product Updates", desc: "Stay informed about new features and improvements.", enabled: false },
                                { title: "Marketing Emails", desc: "Occasional tips and resources from our team.", enabled: false },
                                { title: "Weekly Digest", desc: "A summary of your agent activity every Monday.", enabled: true },
                            ].map((pref, i) => (
                                <div key={i} className="card-premium p-5 flex items-center justify-between">
                                    <div>
                                        <div className="text-[14px] font-medium text-white">{pref.title}</div>
                                        <div className="text-[12px] text-[#9CA3AF] mt-0.5">{pref.desc}</div>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" defaultChecked={pref.enabled} className="sr-only peer" />
                                        <div className="w-10 h-5 bg-white/[0.06] rounded-full peer peer-checked:bg-[#6366F1] peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all border border-white/[0.06] peer-checked:border-[#6366F1]" />
                                    </label>
                                </div>
                            ))}
                        </section>
                    )}
                </div>
            </div>
        </div>
    )
}
