import { Navbar } from "@/components/landing/Navbar"
import { Hero } from "@/components/landing/Hero"
import { Benefits } from "@/components/landing/Benefits"
import { HowItWorks } from "@/components/landing/HowItWorks"
import { AgentGrid } from "@/components/landing/AgentGrid"
import { Pricing } from "@/components/landing/Pricing"
import { SocialProof } from "@/components/landing/SocialProof"
import { FAQ } from "@/components/landing/FAQ"
import { CTA } from "@/components/landing/CTA"
import { Footer } from "@/components/landing/Footer"

export default function Home() {
  return (
    <main className="bg-[#09090B] min-h-screen">
      <Navbar />
      <Hero />
      <Benefits />
      <HowItWorks />
      <AgentGrid />
      <SocialProof />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  )
}
