"use client"

import Link from "next/link"
import Image from "next/image"
import { Github, Twitter, Linkedin } from "lucide-react"

const footerLinks = [
    {
        title: "Product",
        links: [
            { name: "AI Agents", href: "/dashboard/agents" },
            { name: "Templates", href: "/dashboard/templates" },
            { name: "Marketplace", href: "/dashboard/marketplace" },
            { name: "Builder", href: "/dashboard/builder" },
            { name: "Pricing", href: "#pricing" },
        ],
    },
    {
        title: "Resources",
        links: [
            { name: "Documentation", href: "/docs" },
            { name: "API Reference", href: "/docs" },
            { name: "Changelog", href: "/changelog" },
            { name: "Status", href: "/status" },
        ],
    },
    {
        title: "Company",
        links: [
            { name: "About", href: "/contact" },
            { name: "Contact", href: "/contact" },
            { name: "Careers", href: "/contact" },
        ],
    },
    {
        title: "Legal",
        links: [
            { name: "Privacy", href: "/privacy" },
            { name: "Terms", href: "/terms" },
            { name: "Security", href: "/status" },
        ],
    },
]

export function Footer() {
    return (
        <footer className="border-t border-white/[0.04] bg-[#09090B]">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-2 md:grid-cols-6 gap-12">
                    {/* Brand */}
                    <div className="col-span-2">
                        <Link href="/" className="flex items-center gap-2.5 mb-6">
                            <Image src="/logo.svg" alt="AgensHub" width={32} height={32} />
                            <span className="text-[15px] font-semibold text-white tracking-tight">AgensHub</span>
                        </Link>
                        <p className="text-[#71717A] text-[13px] leading-relaxed mb-6 max-w-[240px] font-light">
                            The most advanced AI agent platform for modern businesses.
                        </p>
                        <div className="flex gap-3">
                            {[Github, Twitter, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.04] flex items-center justify-center text-[#71717A] hover:text-white hover:bg-white/[0.06] transition-all">
                                    <Icon className="w-3.5 h-3.5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link columns */}
                    {footerLinks.map((section) => (
                        <div key={section.title}>
                            <h4 className="text-[12px] font-semibold text-white mb-4 uppercase tracking-wider">{section.title}</h4>
                            <ul className="space-y-2.5">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <Link href={link.href} className="text-[13px] text-[#71717A] hover:text-white transition-colors font-light">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="border-t border-white/[0.04] mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-[12px] text-[#71717A]/60">© 2026 AgensHub. All rights reserved.</p>
                    <Link href="/status" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(34,197,94,0.5)]" />
                        <span className="text-[12px] text-[#71717A]/60">All systems operational</span>
                    </Link>
                </div>
            </div>
        </footer>
    )
}
