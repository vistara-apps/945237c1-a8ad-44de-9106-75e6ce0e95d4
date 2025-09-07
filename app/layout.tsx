import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SampleFlow - Automate Sample Clearance',
  description: 'Automate your sample clearance in minutes, not days. A platform for remix artists to instantly clear music samples, manage licenses, and reduce copyright risk.',
  keywords: ['music', 'samples', 'clearance', 'licensing', 'blockchain', 'base'],
  authors: [{ name: 'SampleFlow Team' }],
  openGraph: {
    title: 'SampleFlow - Automate Sample Clearance',
    description: 'Automate your sample clearance in minutes, not days.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SampleFlow - Automate Sample Clearance',
    description: 'Automate your sample clearance in minutes, not days.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-gradient-to-br from-bg via-surface to-bg">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
