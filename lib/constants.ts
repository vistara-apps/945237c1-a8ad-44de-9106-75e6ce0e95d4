export const LICENSE_TIERS: Record<string, { price: number; description: string; features: string[]; royaltyRate: number }> = {
  basic: {
    price: 5,
    description: 'Perfect for demos and personal projects',
    features: ['Up to 30 seconds', 'Non-commercial use', 'Basic attribution'],
    royaltyRate: 0.05,
  },
  standard: {
    price: 15,
    description: 'Great for releases and streaming',
    features: ['Up to 2 minutes', 'Commercial use', 'Streaming rights', 'Full attribution'],
    royaltyRate: 0.10,
  },
  premium: {
    price: 50,
    description: 'Full commercial rights and sync licensing',
    features: ['Unlimited duration', 'Full commercial rights', 'Sync licensing', 'Remix rights'],
    royaltyRate: 0.15,
  },
};

export const SAMPLE_STATUS_COLORS = {
  pending: 'text-yellow-400',
  processing: 'text-blue-400',
  cleared: 'text-green-400',
  rejected: 'text-red-400',
};

export const DMCA_RISK_COLORS = {
  low: 'text-green-400',
  medium: 'text-yellow-400',
  high: 'text-red-400',
};

export const API_ENDPOINTS = {
  OPENAI: 'https://api.openai.com/v1',
  SUPABASE: process.env.NEXT_PUBLIC_SUPABASE_URL,
  AIRSTACK: 'https://api.airstack.xyz/gql',
  ALCHEMY: `https://base-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
  TURNKEY: 'https://api.turnkey.com',
  PINATA: 'https://api.pinata.cloud',
  ZORA: 'https://api.zora.co/v1',
  NEYNAR: 'https://api.neynar.com/v2',
  PRIVY: 'https://auth.privy.io',
  STRIPE: 'https://api.stripe.com/v1',
};
