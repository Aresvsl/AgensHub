"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { Key, Plus, Copy, Eye, EyeOff, Trash2, Shield, Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/toast-provider"

type ApiKey = {
    id: string | number
    name: string
    key?: string
    key_prefix?: string
    key_hash?: string
    created_at?: string
    created?: string
    last_used_at?: string | null
    lastUsed?: string
    status: string
}

const fallbackKeys: ApiKey[] = [
    { id: 1, name: "Production", key: "sk_live_4xN8kT2mP9qR7vL1wJ6bH3cF", created: "Feb 1, 2026", lastUsed: "Just now", status: "active" },
    { id: 2, name: "Development", key: "sk_test_7yQ2nW5rS8uK4xM1pE9dG6hA", created: "Feb 15, 2026", lastUsed: "2h ago", status: "active" },
    { id: 3, name: "Staging", key: "sk_stag_3zA6bR8fV1wN5xJ2mK4qT7pL", created: "Mar 1, 2026", lastUsed: "3d ago", status: "active" },
]

export default function APIKeysPage() {
    const [keys, setKeys] = useState<ApiKey[]>(fallbackKeys)
    const [showKey, setShowKey] = useState<string | number | null>(null)
    const [newKeyName, setNewKeyName] = useState("")
    const [showCreate, setShowCreate] = useState(false)
    const [creating, setCreating] = useState(false)
    const [newlyCreatedKey, setNewlyCreatedKey] = useState<string | null>(null)
    const { showToast } = useToast()

    const fetchKeys = useCallback(async () => {
        try {
            const res = await fetch("/api/api-keys")
            if (res.ok) {
                const data = await res.json()
                if (Array.isArray(data) && data.length > 0) {
                    setKeys(data)
                }
            }
        } catch {
            // Use fallback
        }
    }, [])

    useEffect(() => { fetchKeys() }, [fetchKeys])

    const maskKey = (key: string) => key.slice(0, 7) + "•".repeat(20) + key.slice(-4)

    const getKeyDisplay = (apiKey: ApiKey) => {
        return apiKey.key || apiKey.key_prefix + "•".repeat(20) || "sk_•••"
    }

    const handleCreate = async () => {
        if (!newKeyName.trim()) {
            showToast("Please enter a name for your key", "error")
            return
        }
        setCreating(true)
        try {
            const res = await fetch("/api/api-keys", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: newKeyName }),
            })
            const data = await res.json()
            if (res.ok) {
                if (data.key) {
                    setNewlyCreatedKey(data.key)
                }
                showToast(`API key "${newKeyName}" created!`)
                setNewKeyName("")
                setShowCreate(false)
                fetchKeys()
            } else {
                showToast(data.error || "Failed to create key", "error")
            }
        } catch {
            showToast(`API key "${newKeyName}" created! (demo)`)
            setNewKeyName("")
            setShowCreate(false)
        }
        setCreating(false)
    }

    const handleRevoke = async (keyId: string | number) => {
        try {
            const res = await fetch(`/api/api-keys?id=${keyId}`, { method: "DELETE" })
            if (res.ok) {
                showToast("API key revoked")
                fetchKeys()
            } else {
                showToast("Failed to revoke key", "error")
            }
        } catch {
            setKeys(keys.filter(k => k.id !== keyId))
            showToast("API key revoked (demo)")
        }
    }

    const formatDate = (dateStr?: string | null) => {
        if (!dateStr) return "Never"
        try {
            return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
        } catch {
            return dateStr
        }
    }

    return (
        <div className="space-y-8 max-w-4xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">API Keys</h1>
                    <p className="text-[#9CA3AF] mt-1 text-[15px] font-light">Manage API keys for programmatic access.</p>
                </div>
                <Button onClick={() => setShowCreate(!showCreate)}
                    className="h-10 px-5 text-[13px] font-medium bg-[#6366F1] hover:bg-[#5558E6] text-white rounded-xl shadow-glow transition-all">
                    <Plus className="w-4 h-4 mr-2" /> Create Key
                </Button>
            </div>

            {/* Newly created key banner */}
            {newlyCreatedKey && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                    className="card-premium p-5 border-emerald-500/20">
                    <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                            <p className="text-[13px] text-white font-medium mb-2">Your new API key — copy it now, it won&apos;t be shown again:</p>
                            <div className="flex items-center gap-2">
                                <code className="text-[13px] text-emerald-400 font-mono bg-emerald-500/5 px-3 py-1.5 rounded-lg border border-emerald-500/10">{newlyCreatedKey}</code>
                                <button onClick={() => { navigator.clipboard.writeText(newlyCreatedKey); showToast("Copied!") }}
                                    className="text-emerald-400 hover:text-white transition-colors">
                                    <Copy className="w-4 h-4" />
                                </button>
                            </div>
                            <button onClick={() => setNewlyCreatedKey(null)} className="text-[11px] text-[#9CA3AF] mt-2 hover:text-white transition-colors">Dismiss</button>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Security notice */}
            <div className="card-premium p-5 flex items-start gap-4 border-amber-500/10">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                    <p className="text-[13px] text-white font-medium mb-1">Keep your API keys secure</p>
                    <p className="text-[12px] text-[#9CA3AF] font-light">Never share your API keys in public repositories or client-side code. Use environment variables to store them securely.</p>
                </div>
            </div>

            {/* Create new key */}
            {showCreate && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="card-premium p-6">
                    <h3 className="text-[14px] font-semibold text-white mb-4">Create new API key</h3>
                    <div className="flex gap-3">
                        <Input value={newKeyName} onChange={(e) => setNewKeyName(e.target.value)} placeholder="Key name (e.g. Production)"
                            className="bg-white/[0.02] border-white/[0.04] text-white h-10 rounded-xl text-[14px] focus-visible:ring-1 focus-visible:ring-[#6366F1]/50 flex-1 max-w-sm" />
                        <Button onClick={handleCreate} disabled={creating}
                            className="h-10 px-6 bg-[#6366F1] hover:bg-[#5558E6] text-white rounded-xl text-[13px] shadow-glow">
                            {creating ? <Loader2 className="w-4 h-4 animate-spin" /> : "Generate"}
                        </Button>
                    </div>
                </motion.div>
            )}

            {/* Keys table */}
            <div className="card-premium overflow-hidden">
                <div className="divide-y divide-white/[0.03]">
                    {keys.filter(k => k.status === "active").map((apiKey, i) => (
                        <motion.div key={apiKey.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                            className="flex items-center gap-4 px-6 py-5 hover:bg-white/[0.01] transition-colors group">
                            <div className="w-9 h-9 rounded-xl bg-[#6366F1]/10 border border-[#6366F1]/10 flex items-center justify-center flex-shrink-0">
                                <Key className="w-4 h-4 text-[#6366F1]" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-[14px] font-medium text-white">{apiKey.name}</span>
                                    <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px]">Active</Badge>
                                </div>
                                <div className="flex items-center gap-2">
                                    <code className="text-[12px] text-[#9CA3AF] font-mono">
                                        {showKey === apiKey.id ? getKeyDisplay(apiKey) : maskKey(getKeyDisplay(apiKey))}
                                    </code>
                                    <button onClick={() => setShowKey(showKey === apiKey.id ? null : apiKey.id)}
                                        className="text-[#9CA3AF]/40 hover:text-white transition-colors">
                                        {showKey === apiKey.id ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                                    </button>
                                    <button onClick={() => { navigator.clipboard.writeText(getKeyDisplay(apiKey)); showToast("API key copied!") }}
                                        className="text-[#9CA3AF]/40 hover:text-white transition-colors">
                                        <Copy className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                            <div className="text-right flex-shrink-0">
                                <div className="text-[11px] text-[#9CA3AF]/50">Created {formatDate(apiKey.created_at || apiKey.created)}</div>
                                <div className="text-[11px] text-[#9CA3AF]/50">Last used {apiKey.last_used_at ? formatDate(apiKey.last_used_at) : (apiKey.lastUsed || "Never")}</div>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => handleRevoke(apiKey.id)}
                                className="h-8 w-8 rounded-lg text-[#9CA3AF]/30 hover:text-red-400 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all">
                                <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Usage stats */}
            <div className="card-premium p-6">
                <h3 className="text-[14px] font-semibold text-white mb-4">Usage this month</h3>
                <div className="grid grid-cols-3 gap-6">
                    {[
                        { label: "API Calls", value: "28,400", limit: "50,000" },
                        { label: "Data Transfer", value: "2.4 GB", limit: "10 GB" },
                        { label: "Active Webhooks", value: "8", limit: "25" },
                    ].map((stat) => (
                        <div key={stat.label}>
                            <div className="flex justify-between text-[12px] mb-2">
                                <span className="text-[#9CA3AF]">{stat.label}</span>
                                <span className="text-white font-medium">{stat.value} / {stat.limit}</span>
                            </div>
                            <div className="h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                                <div className="h-full bg-[#6366F1] rounded-full" style={{ width: `${(parseFloat(stat.value.replace(/,/g, "")) / parseFloat(stat.limit.replace(/,/g, ""))) * 100}%` }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
