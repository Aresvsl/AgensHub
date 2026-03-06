"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, MessageSquare, Mail, MapPin, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function ContactPage() {
    const [sent, setSent] = useState(false)

    return (
        <div className="min-h-screen bg-[#0B0B0F] text-[#F8F8FF]">
            <header className="border-b border-white/[0.04] sticky top-0 bg-[#0B0B0F]/80 backdrop-blur-xl z-40">
                <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-[13px] text-[#9CA3AF] hover:text-white transition-colors group">
                        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" /> Back
                    </Link>
                    <span className="text-[13px] font-semibold text-white">Contact</span>
                    <div className="w-16" />
                </div>
            </header>

            <div className="max-w-3xl mx-auto px-6 py-16">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-white tracking-tight mb-4">Get in touch</h1>
                    <p className="text-[#9CA3AF] text-lg font-light">Have a question or need help? We&apos;d love to hear from you.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                    {[
                        { icon: MessageSquare, title: "Live Chat", desc: "Available 24/7", action: "Start chat" },
                        { icon: Mail, title: "Email", desc: "support@bragents.com", action: "Send email" },
                        { icon: MapPin, title: "Office", desc: "São Paulo, Brazil", action: "View map" },
                    ].map((item, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                            className="card-premium p-6 text-center group cursor-pointer hover:border-white/[0.08] transition-all">
                            <div className="w-10 h-10 rounded-xl bg-[#6366F1]/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#6366F1]/20 transition-colors">
                                <item.icon className="w-5 h-5 text-[#6366F1]" />
                            </div>
                            <h3 className="text-[14px] font-semibold text-white mb-1">{item.title}</h3>
                            <p className="text-[12px] text-[#9CA3AF] mb-3">{item.desc}</p>
                            <span className="text-[12px] text-[#6366F1] font-medium">{item.action} →</span>
                        </motion.div>
                    ))}
                </div>

                {!sent ? (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card-premium p-8">
                        <h2 className="text-xl font-semibold text-white mb-6">Send us a message</h2>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[12px] font-medium text-[#9CA3AF]">Name</label>
                                    <Input placeholder="Your name" className="bg-white/[0.03] border-white/[0.06] text-white h-10 rounded-xl text-[14px] focus-visible:ring-1 focus-visible:ring-[#6366F1]/50" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[12px] font-medium text-[#9CA3AF]">Email</label>
                                    <Input placeholder="you@company.com" className="bg-white/[0.03] border-white/[0.06] text-white h-10 rounded-xl text-[14px] focus-visible:ring-1 focus-visible:ring-[#6366F1]/50" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[12px] font-medium text-[#9CA3AF]">Subject</label>
                                <select className="w-full bg-white/[0.03] border border-white/[0.06] text-white h-10 rounded-xl text-[14px] px-4 outline-none">
                                    <option>General Inquiry</option>
                                    <option>Technical Support</option>
                                    <option>Billing</option>
                                    <option>Partnership</option>
                                    <option>Enterprise Sales</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[12px] font-medium text-[#9CA3AF]">Message</label>
                                <textarea placeholder="Tell us how we can help..." rows={5}
                                    className="w-full bg-white/[0.03] border border-white/[0.06] text-white rounded-xl text-[14px] p-4 outline-none resize-none focus:ring-1 focus:ring-[#6366F1]/50" />
                            </div>
                            <Button onClick={() => setSent(true)}
                                className="h-10 px-6 text-[13px] font-medium bg-[#6366F1] hover:bg-[#5558E6] text-white rounded-xl shadow-glow transition-all">
                                <Send className="w-4 h-4 mr-2" /> Send message
                            </Button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="card-premium p-12 text-center">
                        <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 mx-auto mb-4 flex items-center justify-center">
                            <Send className="w-7 h-7 text-emerald-400" />
                        </div>
                        <h2 className="text-xl font-bold text-white mb-2">Message sent!</h2>
                        <p className="text-[#9CA3AF] text-[14px] font-light">We&apos;ll get back to you within 24 hours.</p>
                    </motion.div>
                )}
            </div>
        </div>
    )
}
