"use client"

import { motion } from "framer-motion"
import { ShoppingBag, Star, Plus, DollarSign, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/toast-provider"

const items = [
    { name: "Viral Hook Generator", price: 49, creator: "Alex AI", rating: 4.9, sales: 120 },
    { name: "Legal Document Auditor", price: 199, creator: "LawBotics", rating: 5.0, sales: 45 },
    { name: "E-commerce Support Pro", price: 79, creator: "ShopMate", rating: 4.8, sales: 310 },
    { name: "Financial Advisor AI", price: 149, creator: "FinanceBot", rating: 4.7, sales: 89 },
    { name: "Customer Retention Bot", price: 99, creator: "RetainAI", rating: 4.9, sales: 245 },
    { name: "Image Generation Suite", price: 129, creator: "PixelMind", rating: 4.6, sales: 178 },
]

export default function MarketplacePage() {
    const { showToast } = useToast()

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Marketplace</h1>
                    <p className="text-[#9CA3AF] mt-1 text-[15px] font-light">Buy and sell exclusive AI automations.</p>
                </div>
                <Button onClick={() => showToast("Publish flow started!", "info")}
                    className="h-10 px-5 text-[13px] font-medium bg-[#6366F1] hover:bg-[#5558E6] text-white rounded-xl shadow-glow transition-all">
                    <Plus className="w-4 h-4 mr-2" /> Publish Agent
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((agent, i) => (
                    <motion.div key={agent.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                        className="card-premium group overflow-hidden">
                        <div className="aspect-[4/3] bg-[#0B0B0F] flex items-center justify-center relative border-b border-white/[0.04]">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#6366F1]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <ShoppingBag className="w-10 h-10 text-white/[0.06] group-hover:text-[#6366F1]/20 transition-colors" />
                            <div className="absolute top-4 left-4">
                                <Badge className="bg-[#111118]/80 backdrop-blur-md text-white border-white/[0.06] text-[10px] font-medium px-2.5 py-0.5">Premium</Badge>
                            </div>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-[15px] font-semibold text-white tracking-tight group-hover:text-[#6366F1] transition-colors">{agent.name}</h3>
                                    <p className="text-[#9CA3AF] text-[12px] mt-1">by {agent.creator}</p>
                                </div>
                                <span className="text-lg font-bold text-[#6366F1]">${agent.price}</span>
                            </div>
                            <div className="flex items-center gap-4 text-[11px] text-[#9CA3AF]">
                                <span className="flex items-center gap-1"><Star className="w-3 h-3 text-[#6366F1]" /> {agent.rating}</span>
                                <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" /> {agent.sales} sales</span>
                            </div>
                            <Button onClick={() => showToast(`${agent.name} purchased! Check Downloads.`)}
                                className="w-full h-9 bg-white/[0.04] hover:bg-white/[0.08] text-white rounded-xl text-[12px] font-medium border border-white/[0.06] transition-all group/btn">
                                Buy now <ArrowRight className="ml-2 w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                            </Button>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="card-premium p-12 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.05),transparent_70%)]" />
                <div className="relative z-10">
                    <h2 className="text-2xl font-bold text-white mb-3 tracking-tight">Become a creator</h2>
                    <p className="text-[#9CA3AF] max-w-md mx-auto mb-8 text-[15px] font-light leading-relaxed">
                        Turn your AI expertise into recurring revenue. Sell to thousands of businesses globally.
                    </p>
                    <Button onClick={() => showToast("Creator application submitted!", "info")} variant="outline" className="border-white/[0.06] text-white hover:bg-white/[0.04] rounded-xl px-8 h-10 text-[13px] font-medium">
                        Apply now
                    </Button>
                </div>
            </div>
        </div>
    )
}
