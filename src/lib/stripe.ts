import Stripe from 'stripe'

let _stripe: Stripe | null = null

export const stripe: Stripe = new Proxy({} as Stripe, {
    get(_, prop) {
        if (!_stripe) {
            const key = process.env.STRIPE_SECRET_KEY
            if (!key) throw new Error('STRIPE_SECRET_KEY is not set')
            _stripe = new Stripe(key, {
                apiVersion: '2023-10-16' as Stripe.LatestApiVersion,
                appInfo: { name: 'AgensHub', version: '0.1.0' },
            })
        }
        return (_stripe as any)[prop]
    },
})

// FIXED: Price IDs are loaded from environment variables instead of
// hardcoded placeholder strings. Set these in your .env.local file
// with the real Price IDs from your Stripe dashboard.
export const PLANS = {
    starter: {
        name: 'Starter',
        priceId: process.env.STRIPE_PRICE_STARTER ?? '',
        price: 29,
    },
    pro: {
        name: 'Pro',
        priceId: process.env.STRIPE_PRICE_PRO ?? '',
        price: 49,
    },
    agency: {
        name: 'Agency',
        priceId: process.env.STRIPE_PRICE_AGENCY ?? '',
        price: 99,
    },
}
