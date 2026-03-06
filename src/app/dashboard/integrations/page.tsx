"use client"

import { motion } from "framer-motion"
import { Globe, Zap, Bot, Search, MessageSquare, CreditCard, Database, BarChart3, Mail, Shield, Layers, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/toast-provider"

const integrations = [
    { name: "Slack", description: "Send agent alerts and reports to Slack channels.", icon: MessageSquare, category: "Communication", connected: true },
    { name: "Discord", description: "Deploy bots and receive notifications in Discord.", icon: MessageSquare, category: "Communication", connected: false },
    { name: "WhatsApp Business", description: "Deploy agents for customer service on WhatsApp.", icon: Phone, category: "Communication", connected: true },
    { name: "Stripe", description: "Process payments and manage subscriptions.", icon: CreditCard, category: "Payments", connected: true },
    { name: "Salesforce", description: "Sync leads and contacts with your CRM.", icon: Database, category: "CRM", connected: false },
    { name: "HubSpot", description: "Marketing automation and contact management.", icon: BarChart3, category: "CRM", connected: true },
    { name: "Zapier", description: "Connect 5,000+ apps with no-code automations.", icon: Zap, category: "Automation", connected: false },
    { name: "Make (Integromat)", description: "Visual automation builder for complex workflows.", icon: Layers, category: "Automation", connected: false },
    { name: "Google Sheets", description: "Export data and reports to spreadsheets.", icon: BarChart3, category: "Productivity", connected: true },
    { name: "SendGrid", description: "Transactional emails and email marketing.", icon: Mail, category: "Email", connected: false },
    { name: "OpenAI", description: "GPT-4, GPT-4o, and embedding models.", icon: Bot, category: "AI Models", connected: true },
    { name: "Anthropic", description: "Claude 3.5 Sonnet and Opus models.", icon: Bot, category: "AI Models", connected: false },
    { name: "Supabase", description: "Database, auth, and storage backend.", icon: Database, category: "Infrastructure", connected: true },
    { name: "Vercel", description: "Deployment and hosting platform.", icon: Globe, category: "Infrastructure", connected: true },
    { name: "AWS S3", description: "File storage and static asset hosting.", icon: Shield, category: "Infrastructure", connected: false },
    { name: "Google Analytics", description: "Track user behavior and conversion funnels.", icon: BarChart3, category: "Analytics", connected: false },
]

export default function IntegrationsPage() {
    const { showToast } = useToast()
    const categories = [...new Set(integrations.map(i => i.category))]

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">Integrations</h1>
                <p className="text-[#9CA3AF] mt-1 text-[15px] font-light">Connect AgensHub to your favorite tools. {integrations.filter(i => i.connected).length} of {integrations.length} connected.</p>
            </div>

            {categories.map((category) => (
                <div key={category}>
                    <h2 className="text-[13px] font-semibold text-[#9CA3AF] uppercase tracking-wider mb-4">{category}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {integrations.filter(i => i.category === category).map((integration, idx) => (
                            <motion.div key={integration.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.03 }}
                                className="card-premium p-5 flex items-start gap-4 group">
                                <div className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center flex-shrink-0 group-hover:bg-[#6366F1]/10 transition-colors">
                                    <integration.icon className="w-5 h-5 text-[#9CA3AF] group-hover:text-[#6366F1] transition-colors" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="text-[14px] font-medium text-white">{integration.name}</h3>
                                        {integration.connected && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                                    </div>
                                    <p className="text-[12px] text-[#9CA3AF] font-light line-clamp-1">{integration.description}</p>
                                    <Button
                                        onClick={() => {
                                            if (integration.connected) {
                                                showToast(`${integration.name} settings opened`, "info")
                                            } else {
                                                showToast(`${integration.name} connected!`)
                                            }
                                        }}
                                        variant="ghost"
                                        className={`mt-2 h-7 px-3 text-[11px] rounded-lg font-medium ${integration.connected
                                            ? "text-[#9CA3AF] hover:text-white hover:bg-white/[0.04]"
                                            : "text-[#6366F1] hover:bg-[#6366F1]/10"
                                            }`}
                                    >
                                        {integration.connected ? "Configure" : "Connect"}
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}
