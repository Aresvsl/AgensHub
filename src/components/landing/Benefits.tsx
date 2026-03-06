"use client"

import { motion } from "framer-motion"
import { Shield, Zap, Globe, Bot, BarChart3, Lock } from "lucide-react"

const features = [
    { title: "Autonomous Execution", description: "Agents that don't just respond — they take action across your entire stack.", icon: Bot, span: "md:col-span-2" },
    { title: "Real-time Analytics", description: "Monitor performance metrics with sub-second latency dashboards.", icon: BarChart3, span: "md:col-span-1" },
    { title: "Global Scale", description: "Deploy to 12+ regions with automatic failover and load balancing.", icon: Globe, span: "md:col-span-1" },
    { title: "Enterprise Security", description: "SOC2 compliant. End-to-end encryption. Role-based access control.", icon: Shield, span: "md:col-span-2" },
]

export function Benefits() {
    return (
        <section className="py-32 relative">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-2xl mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6 leading-[1.1]">
                        Built for
                        <br />
                        <span className="text-[#9CA3AF]">performance-critical teams.</span>
                    </h2>
                    <p className="text-[#9CA3AF] text-lg font-light leading-relaxed">
                        Every component engineered with the precision demanded by the world&apos;s most innovative companies.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08 }}
                            className={`card-premium p-8 group ${feature.span}`}
                        >
                            <div className="w-10 h-10 rounded-xl bg-[#6366F1]/10 border border-[#6366F1]/10 flex items-center justify-center mb-6 group-hover:bg-[#6366F1]/15 group-hover:border-[#6366F1]/20 transition-all duration-300">
                                <feature.icon className="w-5 h-5 text-[#6366F1]" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3 tracking-tight">{feature.title}</h3>
                            <p className="text-[#9CA3AF] text-[15px] leading-relaxed font-light">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
