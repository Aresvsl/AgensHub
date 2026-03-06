import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-[#0B0B0F] text-[#F8F8FF]">
            <header className="border-b border-white/[0.04] sticky top-0 bg-[#0B0B0F]/80 backdrop-blur-xl z-40">
                <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-[13px] text-[#9CA3AF] hover:text-white transition-colors group">
                        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" /> Back
                    </Link>
                    <span className="text-[13px] font-semibold text-white">Privacy Policy</span>
                    <div className="w-16" />
                </div>
            </header>

            <div className="max-w-3xl mx-auto px-6 py-16 prose prose-invert prose-sm max-w-none">
                <h1 className="text-4xl font-bold text-white tracking-tight mb-2">Privacy Policy</h1>
                <p className="text-[#9CA3AF] text-[14px] font-light mb-12">Last updated: March 5, 2026</p>

                <div className="space-y-8 text-[#9CA3AF] text-[14px] leading-relaxed font-light">
                    <section>
                        <h2 className="text-lg font-semibold text-white mb-3">1. Information We Collect</h2>
                        <p>We collect information you provide directly: name, email, payment details, and usage data. We also collect technical data such as IP address, browser type, device information, and cookies for analytics and service improvement.</p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-white mb-3">2. How We Use Your Data</h2>
                        <p>Your data is used to: (a) provide and maintain the Service; (b) process transactions; (c) send notifications and updates; (d) improve our product; (e) prevent fraud; (f) comply with legal obligations.</p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-white mb-3">3. Data Storage & Security</h2>
                        <p>All data is encrypted at rest (AES-256) and in transit (TLS 1.3). We use Supabase for database operations with row-level security. Regular security audits and penetration testing are conducted quarterly.</p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-white mb-3">4. AI Agent Data</h2>
                        <p>Data processed by AI agents is handled according to your agent configuration. We do not use your agent data to train our models. Agent execution logs are retained for 30 days unless you configure a different retention period.</p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-white mb-3">5. Third-Party Services</h2>
                        <p>We integrate with third-party services including Stripe (payments), OpenAI (AI models), and analytics providers. Each provider has their own privacy policy governing data they process.</p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-white mb-3">6. Your Rights</h2>
                        <p>Under LGPD and GDPR, you have the right to: access your data, correct inaccuracies, request deletion, data portability, restrict processing, and withdraw consent. Contact <span className="text-[#6366F1]">privacy@bragents.com</span> to exercise these rights.</p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-white mb-3">7. Data Retention</h2>
                        <p>We retain your data for as long as your account is active. After account deletion, personal data is removed within 30 days. Anonymized analytics data may be retained indefinitely for service improvement.</p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-white mb-3">8. Contact</h2>
                        <p>For privacy-related inquiries, contact our Data Protection Officer at <span className="text-[#6366F1]">privacy@bragents.com</span>.</p>
                    </section>
                </div>
            </div>
        </div>
    )
}
