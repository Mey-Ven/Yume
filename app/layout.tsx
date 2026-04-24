import type { Metadata } from 'next';
import { Cormorant_Garamond, Outfit, Noto_Serif_JP } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/lib/language-context';

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const sans = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const jp = Noto_Serif_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-jp',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Yumē Sushi & More · L\'art du sushi à Casablanca',
  description: 'Découvrez Yumē Sushi & More à Casablanca. Sushis ultra frais, créations raffinées, une expérience japonaise inoubliable. Noté 4.9/5. Livraison, à emporter, réservation.',
  keywords: ['sushi casablanca', 'japonais casablanca', 'yume sushi', 'restaurant japonais', 'sushi hay hassani', 'livraison sushi casablanca'],
  openGraph: {
    title: 'Yumē Sushi & More',
    description: 'L\'art du sushi à Casablanca. Noté 4.9/5.',
    type: 'website',
    locale: 'fr_MA',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${display.variable} ${sans.variable} ${jp.variable}`}>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
