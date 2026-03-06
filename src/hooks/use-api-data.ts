"use client"

import { useState, useEffect, useCallback } from "react"

type FetchState<T> = {
    data: T | null
    loading: boolean
    error: string | null
    refetch: () => Promise<void>
}

export function useApiData<T>(url: string, fallbackData: T): FetchState<T> & { data: T } {
    const [data, setData] = useState<T>(fallbackData)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchData = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            const res = await fetch(url)
            if (!res.ok) {
                throw new Error(`HTTP ${res.status}`)
            }
            const json = await res.json()
            if (Array.isArray(json) && json.length > 0) {
                setData(json as T)
            } else if (json && !Array.isArray(json)) {
                setData(json as T)
            }
            // If API returns empty array, keep fallback data for demo
        } catch {
            // API not available — use fallback data
            setError("Using demo data")
        } finally {
            setLoading(false)
        }
    }, [url])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    return { data, loading, error, refetch: fetchData }
}

export function useApiMutation<T = unknown>(url: string) {
    const [loading, setLoading] = useState(false)

    const mutate = async (method: "POST" | "PUT" | "DELETE", body?: Record<string, unknown>): Promise<{ data: T | null; error: string | null }> => {
        setLoading(true)
        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: body ? JSON.stringify(body) : undefined,
            })

            const json = await res.json()

            if (!res.ok) {
                return { data: null, error: json.error || `HTTP ${res.status}` }
            }

            return { data: json as T, error: null }
        } catch {
            return { data: null, error: "Network error" }
        } finally {
            setLoading(false)
        }
    }

    return { mutate, loading }
}
