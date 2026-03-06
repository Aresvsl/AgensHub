"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = [
    { name: "Agents", href: "/dashboard/agents" },
    { name: "Templates", href: "/dashboard/templates" },
    { name: "Pricing", href: "#pricing" },
    { name: "Docs", href: "/docs" },
    { name: "Changelog", href: "/changelog" },
]

export function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 20)
        window.addEventListener("scroll", handler)
        return () => window.removeEventListener("scroll", handler)
    }, [])

    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                ? "py-3 bg-[#09090B]/80 backdrop-blur-2xl border-b border-white/[0.04]"
                : "py-6 bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2.5 group">
                    <Image src="/logo.svg" alt="AgensHub" width={32} height={32} className="group-hover:scale-105 transition-transform duration-300" />
                    <span className="text-[15px] font-semibold text-white tracking-tight">AgensHub</span>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-[13px] font-medium text-[#71717A] hover:text-white transition-colors duration-200"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                <div className="hidden md:flex items-center gap-3">
                    <Link href="/login">
                        <Button variant="ghost" className="text-[13px] font-medium text-[#71717A] hover:text-white hover:bg-white/[0.04] rounded-xl h-9 px-4">
                            Sign in
                        </Button>
                    </Link>
                    <Link href="/signup">
                        <Button className="text-[13px] font-medium bg-[#6366F1] hover:bg-[#5558E6] text-white rounded-xl h-9 px-5 shadow-glow transition-all duration-300 btn-shine">
                            Get started
                        </Button>
                    </Link>
                </div>

                <button onClick={() => setMobileOpen(true)} className="md:hidden text-white">
                    <Menu className="w-5 h-5" />
                </button>
            </div>

            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-[#09090B] z-50 flex flex-col p-8"
                    >
                        <div className="flex justify-between items-center mb-16">
                            <div className="flex items-center gap-2.5">
                                <Image src="/logo.svg" alt="AgensHub" width={32} height={32} />
                                <span className="text-[15px] font-semibold text-white">AgensHub</span>
                            </div>
                            <button onClick={() => setMobileOpen(false)}>
                                <X className="w-6 h-6 text-white" />
                            </button>
                        </div>
                        <nav className="flex flex-col gap-6">
                            {navLinks.map((link) => (
                                <Link key={link.name} href={link.href} onClick={() => setMobileOpen(false)}
                                    className="text-2xl font-semibold text-white/80 hover:text-white transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
}
