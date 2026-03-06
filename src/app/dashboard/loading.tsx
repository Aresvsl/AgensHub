export default function DashboardLoading() {
    return (
        <div className="space-y-8 animate-pulse">
            {/* Header skeleton */}
            <div className="flex justify-between items-center">
                <div className="space-y-2">
                    <div className="h-8 w-48 bg-white/[0.04] rounded-xl" />
                    <div className="h-4 w-72 bg-white/[0.02] rounded-lg" />
                </div>
                <div className="h-10 w-40 bg-white/[0.04] rounded-xl" />
            </div>

            {/* Stats skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-[#111118] border border-white/[0.04] rounded-2xl p-6 space-y-4">
                        <div className="flex justify-between">
                            <div className="w-9 h-9 bg-white/[0.04] rounded-xl" />
                            <div className="h-4 w-12 bg-white/[0.03] rounded-md" />
                        </div>
                        <div className="space-y-2">
                            <div className="h-7 w-20 bg-white/[0.04] rounded-lg" />
                            <div className="h-3 w-28 bg-white/[0.02] rounded-md" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Content skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
                <div className="lg:col-span-4 bg-[#111118] border border-white/[0.04] rounded-2xl p-8 space-y-6">
                    <div className="flex justify-between">
                        <div className="h-5 w-40 bg-white/[0.04] rounded-lg" />
                        <div className="h-5 w-20 bg-white/[0.03] rounded-full" />
                    </div>
                    <div className="space-y-5">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="space-y-2">
                                <div className="flex justify-between">
                                    <div className="h-3 w-24 bg-white/[0.03] rounded-md" />
                                    <div className="h-3 w-10 bg-white/[0.03] rounded-md" />
                                </div>
                                <div className="h-1.5 bg-white/[0.04] rounded-full" />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="lg:col-span-3 bg-[#111118] border border-white/[0.04] rounded-2xl p-8 space-y-4">
                    <div className="h-5 w-36 bg-white/[0.04] rounded-lg" />
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center gap-4 p-3">
                            <div className="w-9 h-9 bg-white/[0.04] rounded-xl flex-shrink-0" />
                            <div className="flex-1 space-y-2">
                                <div className="h-3 w-32 bg-white/[0.04] rounded-md" />
                                <div className="h-3 w-24 bg-white/[0.02] rounded-md" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
