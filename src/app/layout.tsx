import './globals.css';
import './inspira.css';
import './property-modal.css';
import './premium-motion.css';
import './particle-fix.css';
import type { Metadata } from 'next';
import MotionEnhancer from '@/components/MotionEnhancer';

export const metadata: Metadata = {
  title: 'Laksar Properties | Local Property & Land Services',
  description: 'Local property, plots, houses, agricultural land and commercial opportunities around Laksar, Haridwar, Uttarakhand.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body><MotionEnhancer />{children}</body>
    </html>
  );
}
