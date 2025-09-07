# SampleFlow - Base Mini App

Automate your sample clearance in minutes, not days. A platform for remix artists to instantly clear music samples, manage licenses, and reduce copyright risk, built as a user-friendly Base Mini App.

## Features

### 🎵 Automated Sample Fingerprinting & Matching
- Upload audio files or provide links
- AI-powered audio fingerprinting identifies song ownership
- Instant identification of original artists and sample sources

### 💰 Automated Licensing & Payments
- Generate licensing offers based on predefined tiers
- On-chain payments via USDC on Base
- Smart contract-based royalty splits

### 🛡️ DMCA Risk Scoring & Takedown Defense
- Assess potential DMCA takedown risk
- Proactive legal risk mitigation
- Basic guidance for takedown defense

### 📋 Rights Provenance & Attribution
- On-chain record of sample ownership
- Clear licensing history
- Guaranteed legal clarity and correct attribution

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base (via OnchainKit & MiniKit)
- **Styling**: Tailwind CSS with custom design system
- **TypeScript**: Full type safety
- **Wallet**: OnchainKit wallet integration
- **Audio Processing**: Web Audio API with fingerprinting

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sampleflow
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Fill in your API keys in `.env.local`

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Environment Variables

### Required
- `NEXT_PUBLIC_ONCHAINKIT_API_KEY`: OnchainKit API key for Base integration

### Optional (for full functionality)
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase database URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anonymous key
- `OPENAI_API_KEY`: OpenAI API for audio transcription
- `NEXT_PUBLIC_ALCHEMY_API_KEY`: Alchemy API for Base blockchain
- `AIRSTACK_API_KEY`: Airstack API for on-chain identity
- `TURNKEY_API_KEY`: Turnkey API for smart wallet payments
- `PINATA_API_KEY`: Pinata API for IPFS storage
- `NEYNAR_API_KEY`: Neynar API for Farcaster integration
- `STRIPE_SECRET_KEY`: Stripe API for fiat payments

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Main application page
│   ├── providers.tsx      # MiniKitProvider setup
│   ├── globals.css        # Global styles
│   ├── loading.tsx        # Loading UI
│   └── error.tsx          # Error boundary
├── components/            # Reusable UI components
│   ├── FrameContainer.tsx # Main frame wrapper
│   ├── SampleUploader.tsx # Audio file upload
│   ├── LicenseCard.tsx    # License display
│   ├── ActionButton.tsx   # Styled buttons
│   ├── ProjectCard.tsx    # Project overview
│   ├── DMCARiskIndicator.tsx # Risk assessment
│   └── WaveformVisualizer.tsx # Audio visualization
├── lib/                   # Utilities and types
│   ├── types.ts          # TypeScript definitions
│   ├── constants.ts      # App constants
│   └── utils.ts          # Helper functions
└── public/               # Static assets
```

## Design System

### Colors
- **Primary**: `hsl(210, 90%, 50%)` - Blue accent
- **Accent**: `hsl(250, 90%, 60%)` - Purple accent
- **Background**: `hsl(215, 30%, 10%)` - Dark background
- **Surface**: `hsl(215, 30%, 14%)` - Card backgrounds
- **Text Primary**: `hsl(0, 0%, 95%)` - Main text
- **Text Secondary**: `hsl(0, 0%, 70%)` - Secondary text

### Typography
- **Display**: `text-4xl font-bold` - Main headings
- **Heading**: `text-2xl font-semibold` - Section headings
- **Body**: `text-base leading-7` - Body text
- **Caption**: `text-sm text-secondary` - Small text

## License Tiers

### Basic ($5)
- Up to 30 seconds
- Non-commercial use
- Basic attribution
- 5% royalty rate

### Standard ($15)
- Up to 2 minutes
- Commercial use
- Streaming rights
- Full attribution
- 10% royalty rate

### Premium ($50)
- Unlimited duration
- Full commercial rights
- Sync licensing
- Remix rights
- 15% royalty rate

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue on GitHub or contact the development team.
