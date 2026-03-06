"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTA() {
    return (
        <section className="py-40 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.08),transparent_70%)]" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />

            <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-8 leading-[1]">
                        Ready to scale?
                    </h2>
                    <p className="text-[#9CA3AF] text-xl font-light mb-12 leading-relaxed">
                        Join 500+ teams automating their operations with AI agents.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button className="h-14 px-10 text-[15px] font-medium bg-[#6366F1] hover:bg-[#5558E6] text-white rounded-2xl shadow-glow-lg transition-all group">
                            Get started free <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </Button>
                        <Button variant="ghost" className="h-14 px-10 text-[15px] font-medium text-[#9CA3AF] hover:text-white rounded-2xl">
                            Talk to sales
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
