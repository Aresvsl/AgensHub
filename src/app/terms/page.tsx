import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-[#0B0B0F] text-[#F8F8FF]">
            <header className="border-b border-white/[0.04] sticky top-0 bg-[#0B0B0F]/80 backdrop-blur-xl z-40">
                <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-[13px] text-[#9CA3AF] hover:text-white transition-colors group">
                        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" /> Back
                    </Link>
                    <span className="text-[13px] font-semibold text-white">Terms of Service</span>
                    <div className="w-16" />
                </div>
            </header>

            <div className="max-w-3xl mx-auto px-6 py-16 prose prose-invert prose-sm max-w-none">
                <h1 className="text-4xl font-bold text-white tracking-tight mb-2">Terms of Service</h1>
                <p className="text-[#9CA3AF] text-[14px] font-light mb-12">Last updated: March 5, 2026</p>

                <div className="space-y-8 text-[#9CA3AF] text-[14px] leading-relaxed font-light">
                    <section>
                        <h2 className="text-lg font-semibold text-white mb-3">1. Acceptance of Terms</h2>
                        <p>By accessing and using AgensHub (&quot;the Service&quot;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Service.</p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-white mb-3">2. Description of Service</h2>
                        <p>AgensHub provides an AI agent platform that allows users to browse, deploy, and manage autonomous AI agents for business automation. The Service includes agent libraries, templates, a visual builder, marketplace, and associated tools.</p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-white mb-3">3. User Accounts</h2>
                        <p>You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorized use of your account. We reserve the right to suspend accounts that violate these terms.</p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-white mb-3">4. Subscription & Billing</h2>
                        <p>Paid subscriptions are billed in advance on a monthly or annual basis. All fees are non-refundable except as required by law. We may change pricing with 30 days notice. Downgrading your plan may cause loss of features or capacity.</p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-white mb-3">5. Acceptable Use</h2>
                        <p>You agree not to use the Service to: (a) violate any applicable laws; (b) infringe intellectual property rights; (c) transmit harmful code; (d) attempt to gain unauthorized access; (e) use agents for spam or harassment; (f) resell access without authorization.</p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-white mb-3">6. Intellectual Property</h2>
                        <p>The Service and its original content, features, and functionality are owned by AgensHub. Custom agents and workflows you create remain your intellectual property. Marketplace content is subject to the creator&apos;s license terms.</p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-white mb-3">7. Limitation of Liability</h2>
                        <p>AgensHub shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the Service. Our total liability is limited to the amount paid by you in the preceding 12 months.</p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-white mb-3">8. Contact</h2>
                        <p>Questions about these Terms should be sent to <span className="text-[#6366F1]">legal@bragents.com</span>.</p>
                    </section>
                </div>
            </div>
        </div>
    )
}
