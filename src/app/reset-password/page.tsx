"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Loader2, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/components/providers/auth-provider"
import { useToast } from "@/components/ui/toast-provider"

export default function ResetPasswordPage() {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const [sent, setSent] = useState(false)
    const { resetPassword } = useAuth()
    const { showToast } = useToast()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) return

        setLoading(true)
        const { error } = await resetPassword(email)
        setLoading(false)

        if (error) {
            showToast(error, "error")
        } else {
            setSent(true)
        }
    }

    return (
        <div className="min-h-screen bg-[#09090B] flex items-center justify-center px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-[400px]">
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2.5 mb-8">
                        <Image src="/logo.svg" alt="AgensHub" width={36} height={36} />
                        <span className="text-[15px] font-semibold text-white">AgensHub</span>
                    </Link>

                    {sent ? (
                        <div className="space-y-4">
                            <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto">
                                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                            </div>
                            <h1 className="text-2xl font-bold text-white">Check your email</h1>
                            <p className="text-[14px] text-[#71717A]">
                                We sent a password reset link to <span className="text-white font-medium">{email}</span>
                            </p>
                            <Link href="/login">
                                <Button variant="ghost" className="text-[#6366F1] hover:text-[#818CF8] mt-4">
                                    Back to sign in
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <>
                            <h1 className="text-2xl font-bold text-white mb-2">Reset password</h1>
                            <p className="text-[14px] text-[#71717A]">Enter your email to receive a reset link</p>
                        </>
                    )}
                </div>

                {!sent && (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="text-[12px] font-medium text-[#71717A] mb-1.5 block">Email</label>
                            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@company.com"
                                className="h-11 bg-white/[0.03] border-white/[0.06] text-white rounded-xl focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1]/30 placeholder:text-[#71717A]/50" />
                        </div>
                        <Button type="submit" disabled={loading}
                            className="w-full h-11 bg-[#6366F1] hover:bg-[#5558E6] text-white rounded-xl font-medium shadow-glow btn-shine">
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Send reset link"}
                        </Button>
                        <p className="text-center text-[13px] text-[#71717A]">
                            <Link href="/login" className="text-[#6366F1] hover:text-[#818CF8] font-medium">Back to sign in</Link>
                        </p>
                    </form>
                )}
            </motion.div>
        </div>
    )
}
