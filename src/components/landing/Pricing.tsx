"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Check, ArrowRight, Sparkles, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

const plans = [
    {
        name: "Starter",
        planId: "free" as const,
        price: "0",
        period: "Free forever",
        description: "For individuals exploring AI automation.",
        features: ["3 Active Agents", "1,000 requests/mo", "Community support", "Basic analytics"],
        cta: "Start for free",
        popular: false,
    },
    {
        name: "Pro",
        planId: "pro" as const,
        price: "97",
        period: "per month",
        description: "For teams that take automation seriously.",
        features: ["Unlimited agents", "Priority processing", "Visual Builder", "24h VIP support", "API access", "Custom webhooks"],
        cta: "Start free trial",
        popular: true,
    },
    {
        name: "Enterprise",
        planId: "agency" as const,
        price: "Custom",
        period: "per month",
        description: "For organizations at absolute scale.",
        features: ["White-label", "Dedicated infra", "Custom API", "Account manager", "99.99% SLA", "SSO & SAML"],
        cta: "Contact sales",
        popular: false,
    },
]

export function Pricing() {
    const router = useRouter()
    const [loadingPlan, setLoadingPlan] = useState<string | null>(null)

    const handleCheckout = async (planId: string) => {
        if (planId === "free") {
            router.push("/signup")
            return
        }
        if (planId === "agency") {
            router.push("/contact")
            return
        }

        setLoadingPlan(planId)
        try {
            const res = await fetch("/api/stripe/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ planId }),
            })
            const data = await res.json()
            if (data.url) {
                window.location.href = data.url
            } else {
                // Not authenticated — redirect to signup
                router.push("/signup")
            }
        } catch {
            router.push("/signup")
        }
        setLoadingPlan(null)
    }

    return (
        <section id="pricing" className="py-32 relative">
            <div className="max-w-6xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
                        Simple, transparent pricing.
                    </h2>
                    <p className="text-[#9CA3AF] text-lg font-light max-w-lg mx-auto">
                        Start free and scale as you grow. No hidden fees.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {plans.map((plan, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={`relative rounded-2xl p-8 flex flex-col transition-all duration-300 ${plan.popular
                                ? "bg-[#111118] border-2 border-[#6366F1]/30 shadow-glow-lg scale-[1.02]"
                                : "bg-[#111118] border border-white/[0.04] hover:border-white/[0.08]"
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                    <span className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white text-[11px] font-semibold px-4 py-1 rounded-full shadow-glow">
                                        <Sparkles className="w-3 h-3 inline mr-1" />
                                        Most popular
                                    </span>
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-[#9CA3AF] text-sm font-medium mb-2">{plan.name}</h3>
                                <div className="flex items-baseline gap-1 mb-2">
                                    <span className="text-4xl font-bold text-white tracking-tight">
                                        {plan.price === "Custom" ? plan.price : `$${plan.price}`}
                                    </span>
                                    {plan.price !== "Custom" && (
                                        <span className="text-[#9CA3AF] text-sm font-light">/{plan.period}</span>
                                    )}
                                </div>
                                <p className="text-[#9CA3AF] text-sm leading-relaxed">{plan.description}</p>
                            </div>

                            <div className="space-y-3 mb-8 flex-grow">
                                {plan.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-center gap-3">
                                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${plan.popular ? "bg-[#6366F1]/20 text-[#6366F1]" : "bg-white/[0.04] text-[#9CA3AF]"
                                            }`}>
                                            <Check className="w-3 h-3" />
                                        </div>
                                        <span className="text-[#9CA3AF] text-[14px]">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <Button
                                onClick={() => handleCheckout(plan.planId)}
                                disabled={loadingPlan === plan.planId}
                                className={`w-full h-11 rounded-xl text-[13px] font-medium transition-all duration-300 group ${plan.popular
                                    ? "bg-[#6366F1] hover:bg-[#5558E6] text-white shadow-glow"
                                    : "bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/[0.06]"
                                    }`}
                            >
                                {loadingPlan === plan.planId ? <Loader2 className="w-4 h-4 animate-spin" /> : <>{plan.cta}<ArrowRight className="ml-2 w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" /></>}
                            </Button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
