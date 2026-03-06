"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/components/providers/auth-provider"
import { useToast } from "@/components/ui/toast-provider"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const { signIn } = useAuth()
    const { showToast } = useToast()
    const router = useRouter()
    const searchParams = useSearchParams()
    const redirect = searchParams.get("redirect") || "/dashboard"

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email || !password) return

        setLoading(true)
        const { error } = await signIn(email, password)
        setLoading(false)

        if (error) {
            showToast(error, "error")
        } else {
            showToast("Welcome back!")
            router.push(redirect)
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
                    <h1 className="text-2xl font-bold text-white mb-2">Welcome back</h1>
                    <p className="text-[14px] text-[#71717A]">Sign in to your account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-[12px] font-medium text-[#71717A] mb-1.5 block">Email</label>
                        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@company.com"
                            className="h-11 bg-white/[0.03] border-white/[0.06] text-white rounded-xl focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1]/30 placeholder:text-[#71717A]/50" />
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-1.5">
                            <label className="text-[12px] font-medium text-[#71717A]">Password</label>
                            <Link href="/reset-password" className="text-[11px] text-[#6366F1] hover:text-[#818CF8]">Forgot?</Link>
                        </div>
                        <div className="relative">
                            <Input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="h-11 bg-white/[0.03] border-white/[0.06] text-white rounded-xl focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1]/30 pr-10 placeholder:text-[#71717A]/50" />
                            <button type="button" onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#71717A] hover:text-white">
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>
                    <Button type="submit" disabled={loading}
                        className="w-full h-11 bg-[#6366F1] hover:bg-[#5558E6] text-white rounded-xl font-medium shadow-glow btn-shine mt-2">
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign in"}
                    </Button>
                </form>

                <p className="text-center mt-6 text-[13px] text-[#71717A]">
                    Don&apos;t have an account?{" "}
                    <Link href="/signup" className="text-[#6366F1] hover:text-[#818CF8] font-medium">Sign up</Link>
                </p>
            </motion.div>
        </div>
    )
}
