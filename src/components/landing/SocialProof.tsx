"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"

const testimonials = [
    { name: "Ricardo M.", role: "CTO, TechFlow", text: "The scale we achieved in one month is something I've never seen in 15 years.", avatar: "RM" },
    { name: "Julia C.", role: "Head of AI, Innovate", text: "Flawless interface and infra performance that actually handles growth-stage volume.", avatar: "JC" },
    { name: "Marcos S.", role: "Founder, ScaleAI", text: "The visual builder is so intuitive we eliminated all custom agent code.", avatar: "MS" },
]

export function SocialProof() {
    return (
        <section className="py-32">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
                    <p className="text-[#9CA3AF] text-sm font-medium uppercase tracking-wider mb-4">Trusted by teams everywhere</p>
                    <div className="flex justify-center gap-1 mb-2">
                        {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 text-[#6366F1] fill-[#6366F1]" />)}
                    </div>
                    <p className="text-[#9CA3AF] text-sm">4.9/5 from 200+ reviews</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {testimonials.map((t, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                            className="card-premium p-8"
                        >
                            <p className="text-white/90 text-[15px] leading-relaxed mb-8 font-light">"{t.text}"</p>
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center text-[11px] font-semibold text-white">
                                    {t.avatar}
                                </div>
                                <div>
                                    <div className="text-white text-[13px] font-semibold">{t.name}</div>
                                    <div className="text-[#9CA3AF] text-[12px]">{t.role}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
