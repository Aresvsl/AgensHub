"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { Users, Mail, MoreHorizontal, Crown, CheckCircle2, UserPlus, Loader2, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/toast-provider"

type TeamMember = {
    id?: string
    name?: string
    email: string
    role: string
    avatar?: string
    status: string
    lastActive?: string
    joined_at?: string | null
}

const fallbackMembers: TeamMember[] = [
    { name: "Dexter AI", email: "dexter@hub.com", role: "Owner", avatar: "DA", status: "Active", lastActive: "Just now" },
    { name: "Sarah Chen", email: "sarah@hub.com", role: "Admin", avatar: "SC", status: "Active", lastActive: "5m ago" },
    { name: "Marcus R.", email: "marcus@hub.com", role: "Editor", avatar: "MR", status: "Active", lastActive: "1h ago" },
    { name: "Ana Lima", email: "ana@hub.com", role: "Viewer", avatar: "AL", status: "Active", lastActive: "3h ago" },
    { name: "Carlos P.", email: "carlos@hub.com", role: "Editor", avatar: "CP", status: "Invited", lastActive: "Pending" },
]

const roleColors: Record<string, string> = {
    Owner: "bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white border-none",
    owner: "bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white border-none",
    Admin: "bg-[#6366F1]/10 text-[#6366F1] border-[#6366F1]/20",
    admin: "bg-[#6366F1]/10 text-[#6366F1] border-[#6366F1]/20",
    Editor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    member: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    Viewer: "bg-white/[0.04] text-[#9CA3AF] border-white/[0.06]",
    viewer: "bg-white/[0.04] text-[#9CA3AF] border-white/[0.06]",
}

export default function TeamPage() {
    const [members, setMembers] = useState<TeamMember[]>(fallbackMembers)
    const [inviteEmail, setInviteEmail] = useState("")
    const [inviteRole, setInviteRole] = useState("member")
    const [showInvite, setShowInvite] = useState(false)
    const [sending, setSending] = useState(false)
    const { showToast } = useToast()

    const fetchTeam = useCallback(async () => {
        try {
            const res = await fetch("/api/team")
            if (res.ok) {
                const data = await res.json()
                if (data.members && data.members.length > 0) {
                    setMembers(data.members)
                }
            }
        } catch {
            // Use fallback
        }
    }, [])

    useEffect(() => { fetchTeam() }, [fetchTeam])

    const handleInvite = async () => {
        if (!inviteEmail.trim()) {
            showToast("Please enter an email", "error")
            return
        }
        setSending(true)
        try {
            const res = await fetch("/api/team", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: inviteEmail, role: inviteRole }),
            })
            const data = await res.json()
            if (res.ok) {
                showToast(`Invitation sent to ${inviteEmail}`)
                setInviteEmail("")
                setShowInvite(false)
                fetchTeam()
            } else {
                showToast(data.error || "Failed to send invite", "error")
            }
        } catch {
            showToast(`Invitation sent to ${inviteEmail} (demo)`)
            setInviteEmail("")
            setShowInvite(false)
        }
        setSending(false)
    }

    const handleRemove = async (memberId?: string) => {
        if (!memberId) return
        try {
            const res = await fetch(`/api/team?id=${memberId}`, { method: "DELETE" })
            if (res.ok) {
                showToast("Member removed")
                fetchTeam()
            }
        } catch {
            showToast("Member removed (demo)")
        }
    }

    const getAvatar = (member: TeamMember) => {
        if (member.avatar) return member.avatar
        if (member.name) return member.name.split(" ").map(n => n[0]).join("").toUpperCase()
        return member.email.substring(0, 2).toUpperCase()
    }

    const getDisplayRole = (role: string) => role.charAt(0).toUpperCase() + role.slice(1)

    return (
        <div className="space-y-8 max-w-4xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Team</h1>
                    <p className="text-[#9CA3AF] mt-1 text-[15px] font-light">{members.length} members · {members.filter(m => m.status === "Active" || m.status === "active").length} active</p>
                </div>
                <Button onClick={() => setShowInvite(!showInvite)}
                    className="h-10 px-5 text-[13px] font-medium bg-[#6366F1] hover:bg-[#5558E6] text-white rounded-xl shadow-glow transition-all">
                    <UserPlus className="w-4 h-4 mr-2" /> Invite member
                </Button>
            </div>

            {/* Invite form */}
            {showInvite && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="card-premium p-6">
                    <h3 className="text-[14px] font-semibold text-white mb-4">Invite a new team member</h3>
                    <div className="flex gap-3">
                        <Input value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} placeholder="colleague@company.com"
                            className="bg-white/[0.02] border-white/[0.04] text-white h-10 rounded-xl text-[14px] focus-visible:ring-1 focus-visible:ring-[#6366F1]/50 flex-1" />
                        <select value={inviteRole} onChange={(e) => setInviteRole(e.target.value)}
                            className="bg-white/[0.02] border border-white/[0.04] text-white h-10 rounded-xl text-[13px] px-4 outline-none">
                            <option value="member">Editor</option>
                            <option value="viewer">Viewer</option>
                            <option value="admin">Admin</option>
                        </select>
                        <Button onClick={handleInvite} disabled={sending}
                            className="h-10 px-6 bg-[#6366F1] hover:bg-[#5558E6] text-white rounded-xl text-[13px] shadow-glow">
                            {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Send invite"}
                        </Button>
                    </div>
                </motion.div>
            )}

            {/* Members table */}
            <div className="card-premium overflow-hidden">
                <div className="divide-y divide-white/[0.03]">
                    {members.map((member, i) => (
                        <motion.div key={member.email} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                            className="flex items-center gap-4 px-6 py-5 hover:bg-white/[0.01] transition-colors group">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6366F1]/30 to-[#8B5CF6]/30 border border-white/[0.06] flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0">
                                {getAvatar(member)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <span className="text-[14px] font-medium text-white">{member.name || member.email}</span>
                                    {(member.role === "Owner" || member.role === "owner") && <Crown className="w-3.5 h-3.5 text-amber-400" />}
                                </div>
                                <span className="text-[12px] text-[#9CA3AF]">{member.email}</span>
                            </div>
                            <Badge className={`text-[10px] font-medium px-2.5 py-0.5 border ${roleColors[member.role] || roleColors.member}`}>{getDisplayRole(member.role)}</Badge>
                            <div className="flex items-center gap-2 w-20 justify-end">
                                {(member.status === "Invited" || member.status === "pending") ? (
                                    <span className="text-[11px] text-amber-400 font-medium">Pending</span>
                                ) : (
                                    <span className="text-[11px] text-[#9CA3AF]/50">{member.lastActive || "Active"}</span>
                                )}
                            </div>
                            {member.role !== "Owner" && member.role !== "owner" && (
                                <Button variant="ghost" size="icon" onClick={() => handleRemove(member.id)}
                                    className="h-8 w-8 rounded-lg text-[#9CA3AF] hover:text-red-400 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all">
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Roles explanation */}
            <div className="card-premium p-6">
                <h3 className="text-[14px] font-semibold text-white mb-4">Role Permissions</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[
                        { role: "Owner", perms: ["Full access", "Billing", "Delete workspace"] },
                        { role: "Admin", perms: ["Manage team", "Deploy agents", "View analytics"] },
                        { role: "Editor", perms: ["Create agents", "Edit workflows", "View logs"] },
                        { role: "Viewer", perms: ["View dashboard", "View agents", "Read-only"] },
                    ].map((r) => (
                        <div key={r.role} className="space-y-2">
                            <Badge className={`text-[10px] font-medium px-2.5 py-0.5 border ${roleColors[r.role]}`}>{r.role}</Badge>
                            <ul className="space-y-1">
                                {r.perms.map(p => (
                                    <li key={p} className="text-[12px] text-[#9CA3AF] flex items-center gap-1.5">
                                        <CheckCircle2 className="w-3 h-3 text-[#6366F1]/50" /> {p}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
