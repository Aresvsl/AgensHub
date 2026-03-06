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

export const PLANS = {
    starter: {
        name: 'Starter',
        priceId: 'price_starter_id',
        price: 29,
    },
    pro: {
        name: 'Pro',
        priceId: 'price_pro_id',
        price: 49,
    },
    agency: {
        name: 'Agency',
        priceId: 'price_agency_id',
        price: 99,
    },
}
