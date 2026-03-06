"use client"

import { motion } from "framer-motion"
import { Bot, Star, Users, ArrowUpRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const agents = [
    { name: "Sales Closer AI", category: "Sales", users: "2.4k", rating: 4.9, color: "from-[#6366F1] to-[#8B5CF6]" },
    { name: "Support Chatbot Pro", category: "Support", users: "5.8k", rating: 4.8, color: "from-emerald-500 to-emerald-600" },
    { name: "Content Generator", category: "Marketing", users: "1.2k", rating: 4.7, color: "from-amber-500 to-orange-500" },
    { name: "Legal Document AI", category: "Legal", users: "920", rating: 5.0, color: "from-rose-500 to-pink-500" },
]

export function AgentGrid() {
    return (
        <section className="py-32">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16"
                >
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
                            Featured agents
                        </h2>
                        <p className="text-[#9CA3AF] text-lg font-light">Deploy in seconds what used to take weeks.</p>
                    </div>
                    <Button variant="ghost" className="text-[#6366F1] hover:text-[#8B5CF6] text-[13px] font-medium group">
                        Browse all agents <ArrowUpRight className="ml-1.5 w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Button>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {agents.map((agent, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08 }}
                            className="card-premium p-6 group cursor-pointer"
                        >
                            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${agent.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                                <Bot className="w-5 h-5 text-white" />
                            </div>

                            <Badge className="bg-white/[0.04] border border-white/[0.06] text-[#9CA3AF] text-[10px] font-medium mb-4">
                                {agent.category}
                            </Badge>

                            <h3 className="text-[16px] font-semibold text-white mb-4 tracking-tight group-hover:text-[#6366F1] transition-colors">
                                {agent.name}
                            </h3>

                            <div className="flex items-center gap-4 text-[12px] text-[#9CA3AF]">
                                <span className="flex items-center gap-1">
                                    <Users className="w-3 h-3" /> {agent.users}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Star className="w-3 h-3 text-[#6366F1]" /> {agent.rating}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
