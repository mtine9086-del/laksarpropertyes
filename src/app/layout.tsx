import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Laksar Properties | Local Property & Land Services',
  description: 'Local property, plots, houses, agricultural land and commercial opportunities around Laksar, Haridwar, Uttarakhand.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
