import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2023-10-16' as any,
    appInfo: {
        name: 'AgensHub',
        version: '0.1.0',
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
