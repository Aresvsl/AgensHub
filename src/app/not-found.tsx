import Link from "next/link"
import { Sparkles, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#0B0B0F] flex flex-col items-center justify-center p-6">
            <div className="text-center max-w-md">
                <div className="w-16 h-16 rounded-2xl bg-[#6366F1]/10 border border-[#6366F1]/10 flex items-center justify-center mx-auto mb-8">
                    <Sparkles className="w-7 h-7 text-[#6366F1]" />
                </div>
                <h1 className="text-8xl font-bold text-white tracking-tighter mb-4">404</h1>
                <p className="text-[#9CA3AF] text-lg font-light mb-10 leading-relaxed">
                    This page doesn&apos;t exist or has been moved.
                </p>
                <Link href="/">
                    <Button className="h-11 px-8 text-[13px] font-medium bg-[#6366F1] hover:bg-[#5558E6] text-white rounded-xl shadow-glow transition-all group">
                        <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                        Back to home
                    </Button>
                </Link>
            </div>
        </div>
    )
}
