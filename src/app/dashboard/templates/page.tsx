"use client"

import { motion } from "framer-motion"
import { Layout, Globe, Server, Database, Download, ArrowRight, Smartphone, Code, Bot, Cpu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/toast-provider"

const templates = [
    { name: "AI Chatbot SaaS", description: "Full-stack chat platform with GPT-4 integration and Supabase backend.", tech: ["Next.js", "Supabase", "OpenAI", "Stripe"], icon: Globe, gradient: "from-[#6366F1] to-[#8B5CF6]" },
    { name: "Lead Generation SaaS", description: "Automated B2B lead capture and qualification system.", tech: ["React", "PostgreSQL", "Tailwind"], icon: Database, gradient: "from-emerald-500 to-teal-600" },
    { name: "Automation CRM", description: "CRM focused on automating repetitive tasks for small agencies.", tech: ["TypeScript", "Node.js", "MongoDB"], icon: Server, gradient: "from-amber-500 to-orange-500" },
    { name: "AI Content Platform", description: "Mass content generator for blogs and social media channels.", tech: ["Next.js", "Tailwind", "OpenAI"], icon: Layout, gradient: "from-rose-500 to-pink-600" },
    { name: "Mobile Agent App", description: "React Native app to manage and monitor your deployed AI agents.", tech: ["React Native", "Expo", "Firebase"], icon: Smartphone, gradient: "from-cyan-500 to-blue-600" },
    { name: "AI Code Assistant", description: "VS Code extension with AI-powered code suggestions and debugging.", tech: ["TypeScript", "VS Code API", "OpenAI"], icon: Code, gradient: "from-green-500 to-emerald-600" },
    { name: "Conversational Commerce", description: "WhatsApp & Telegram bot for e-commerce with payment processing.", tech: ["Node.js", "Stripe", "WhatsApp API"], icon: Bot, gradient: "from-violet-500 to-purple-600" },
    { name: "MLOps Dashboard", description: "Monitor and manage machine learning model deployments at scale.", tech: ["Python", "FastAPI", "React", "Docker"], icon: Cpu, gradient: "from-indigo-500 to-violet-600" },
]

export default function TemplatesPage() {
    const { showToast } = useToast()

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">SaaS Templates</h1>
                <p className="text-[#9CA3AF] mt-1 text-[15px] font-light">{templates.length} production-ready foundations for your next AI product.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {templates.map((t, i) => (
                    <motion.div key={t.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                        className="card-premium p-8 group relative overflow-hidden">
                        <div className="absolute top-6 right-6 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity">
                            <t.icon className="w-32 h-32 text-white" />
                        </div>
                        <div className="relative z-10">
                            <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${t.gradient} flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300`}>
                                <t.icon className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3 tracking-tight">{t.name}</h3>
                            <p className="text-[#9CA3AF] text-[14px] mb-6 leading-relaxed font-light">{t.description}</p>
                            <div className="flex flex-wrap gap-2 mb-8">
                                {t.tech.map(tech => (
                                    <Badge key={tech} className="bg-[#6366F1]/10 text-[#6366F1] border border-[#6366F1]/20 text-[10px] font-medium px-2.5 py-0.5 rounded-lg">
                                        {tech}
                                    </Badge>
                                ))}
                            </div>
                            <div className="flex gap-3">
                                <Button onClick={() => showToast(`${t.name} downloading... Check Downloads page.`)}
                                    className="h-10 px-6 text-[13px] font-medium bg-[#6366F1] hover:bg-[#5558E6] text-white rounded-xl shadow-glow transition-all group/btn">
                                    <Download className="w-3.5 h-3.5 mr-2" /> Download
                                </Button>
                                <Button variant="ghost" className="h-10 px-4 text-[13px] font-medium text-[#9CA3AF] hover:text-white rounded-xl">
                                    Preview <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
