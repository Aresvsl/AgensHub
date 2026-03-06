"use client"

import { useState, createContext, useContext, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, X, AlertTriangle, Info } from "lucide-react"

type ToastType = "success" | "error" | "info"

interface Toast {
    id: number
    message: string
    type: ToastType
}

const ToastContext = createContext<{
    showToast: (message: string, type?: ToastType) => void
}>({ showToast: () => { } })

export function useToast() {
    return useContext(ToastContext)
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([])

    const showToast = useCallback((message: string, type: ToastType = "success") => {
        const id = Date.now()
        setToasts(prev => [...prev, { id, message, type }])
        setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500)
    }, [])

    const icons = {
        success: <CheckCircle2 className="w-4 h-4 text-emerald-400" />,
        error: <AlertTriangle className="w-4 h-4 text-red-400" />,
        info: <Info className="w-4 h-4 text-[#6366F1]" />,
    }

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2">
                <AnimatePresence>
                    {toasts.map((toast) => (
                        <motion.div
                            key={toast.id}
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            className="flex items-center gap-3 bg-[#111118] border border-white/[0.06] rounded-xl px-4 py-3 shadow-[0_20px_60px_rgba(0,0,0,0.5)] min-w-[280px]"
                        >
                            {icons[toast.type]}
                            <span className="text-[13px] text-white font-medium flex-1">{toast.message}</span>
                            <button onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
                                className="text-[#9CA3AF] hover:text-white transition-colors">
                                <X className="w-3.5 h-3.5" />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    )
}
