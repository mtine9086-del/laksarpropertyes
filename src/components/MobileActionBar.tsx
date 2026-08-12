'use client';

import { siteConfig } from '@/config/site';

export default function MobileActionBar() {
  return (
    <div className="mobile-action-bar" role="navigation" aria-label="Quick contact">
      <a href={siteConfig.contact.phoneHref} className="mab-call">
        <span aria-hidden="true">☎</span> Call
      </a>
      <a href={siteConfig.contact.whatsapp} target="_blank" rel="noopener noreferrer" className="mab-whatsapp">
        <span aria-hidden="true">✆</span> WhatsApp
      </a>
    </div>
  );
}
