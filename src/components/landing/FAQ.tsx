"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

const faqs = [
    { question: "What are AI agents?", answer: "AI agents are autonomous software programs powered by large language models that can perform tasks, make decisions, and interact with external systems on your behalf. They work 24/7 to automate business operations." },
    { question: "How do I deploy an agent?", answer: "Simply browse our library of 50+ pre-built agents, click 'Install', configure your preferences, and click 'Deploy'. Most agents can be live in under 5 minutes." },
    { question: "Can I build custom agents?", answer: "Yes! Our Visual Builder lets you create custom agents with a drag-and-drop interface. No coding required. You can also use our API for advanced customizations." },
    { question: "What integrations are supported?", answer: "We support 16+ integrations including Slack, WhatsApp, Stripe, Salesforce, HubSpot, Zapier, OpenAI, and more. New integrations are added monthly." },
    { question: "Is my data secure?", answer: "Absolutely. All data is encrypted at rest (AES-256) and in transit (TLS 1.3). We are SOC 2 compliant and conduct quarterly security audits. We never use your data to train our models." },
    { question: "Can I cancel anytime?", answer: "Yes, you can cancel your subscription at any time. Your agents will continue to work until the end of your billing period. No lock-in contracts." },
]

export function FAQ() {
    const [open, setOpen] = useState<number | null>(null)

    return (
        <section className="py-32 px-6">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
                        Frequently asked questions
                    </h2>
                    <p className="text-[#9CA3AF] text-lg font-light">
                        Everything you need to know about AgensHub.
                    </p>
                </div>

                <div className="space-y-2">
                    {faqs.map((faq, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                            className="border border-white/[0.04] rounded-xl overflow-hidden hover:border-white/[0.06] transition-colors">
                            <button
                                onClick={() => setOpen(open === i ? null : i)}
                                className="w-full flex items-center justify-between px-6 py-5 text-left"
                            >
                                <span className="text-[15px] font-medium text-white">{faq.question}</span>
                                <ChevronDown className={`w-4 h-4 text-[#9CA3AF] transition-transform duration-200 flex-shrink-0 ml-4 ${open === i ? "rotate-180" : ""}`} />
                            </button>
                            <AnimatePresence>
                                {open === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="overflow-hidden"
                                    >
                                        <p className="px-6 pb-5 text-[14px] text-[#9CA3AF] font-light leading-relaxed">{faq.answer}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
