export default function RootLoading() {
    return (
        <div className="min-h-screen bg-[#0B0B0F] flex items-center justify-center">
            <div className="flex flex-col items-center gap-6">
                <div className="relative">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] animate-pulse" />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] animate-ping opacity-20" />
                </div>
                <div className="flex gap-1.5">
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            className="w-1.5 h-1.5 rounded-full bg-[#6366F1]"
                            style={{ animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite` }}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
