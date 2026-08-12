import './globals.css';
import './inspira.css';
import './property-modal.css';
import './premium-motion.css';
import './particle-fix.css';
import './site-fixes.css';
import type { Metadata } from 'next';
import MotionEnhancer from '@/components/MotionEnhancer';
import { siteConfig } from '@/config/site';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Local Property & Land Services`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: ['Laksar property', 'Haridwar plots', 'Uttarakhand land', 'Laksar real estate', 'NH 334 plots'],
  alternates: { canonical: siteConfig.url },
  icons: {
    icon: `${basePath}/favicon.svg`,
    shortcut: `${basePath}/favicon.svg`,
    apple: `${basePath}/icon.svg`,
  },
  openGraph: {
    type: 'website',
    url: siteConfig.url,
    title: `${siteConfig.name} | Local Property & Land Services`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    locale: 'en_IN',
    images: [{ url: `${basePath}/hero-poster.jpg`, width: 1400, height: 768, alt: siteConfig.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} | Local Property & Land Services`,
    description: siteConfig.description,
    images: [`${basePath}/hero-poster.jpg`],
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  telephone: siteConfig.contact.phoneDisplay,
  email: siteConfig.contact.email,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Laksar',
    addressRegion: 'Uttarakhand',
    addressCountry: 'IN',
  },
  areaServed: siteConfig.areasWeWorkIn,
  sameAs: [siteConfig.contact.instagram],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* If JavaScript is unavailable, MotionEnhancer/IntersectionObserver never
            add the .in-view class — without this, scroll-reveal content would
            stay invisible forever. */}
        <noscript>
          <style>{`.motion-reveal,.motion-fade,.motion-word,.motion-text{opacity:1!important;transform:none!important;filter:none!important}`}</style>
        </noscript>
      </head>
      <body><MotionEnhancer />{children}</body>
    </html>
  );
}
