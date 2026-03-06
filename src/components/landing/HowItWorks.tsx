"use client"

import { motion } from "framer-motion"

const steps = [
    { number: "01", title: "Configure", description: "Define business rules and connect your data sources via our visual interface." },
    { number: "02", title: "Deploy", description: "Launch agents across your stack with one click. No infrastructure to manage." },
    { number: "03", title: "Scale", description: "Watch productivity multiply as agents handle operations around the clock." },
]

export function HowItWorks() {
    return (
        <section className="py-32 border-y border-white/[0.04]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 relative">
                    <div className="absolute top-6 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent hidden lg:block" />

                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15 }}
                            className="relative pt-16 group"
                        >
                            <span className="absolute top-0 left-0 text-5xl font-bold text-white/[0.03] group-hover:text-[#6366F1]/[0.08] transition-colors duration-500 select-none">
                                {step.number}
                            </span>
                            <div className="w-2 h-2 rounded-full bg-[#6366F1] mb-6 shadow-[0_0_12px_rgba(99,102,241,0.5)] group-hover:scale-150 transition-transform" />
                            <h3 className="text-xl font-semibold text-white mb-3 tracking-tight">{step.title}</h3>
                            <p className="text-[#9CA3AF] text-[15px] font-light leading-relaxed">{step.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
