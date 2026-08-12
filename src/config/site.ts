// ---------------------------------------------------------------------------
// Single source of truth for business/contact info used across the site
// (nav, footer, mobile action bar, contact page, property modal, JSON-LD).
//
// ⚠️ REPLACE THE PLACEHOLDER VALUES BELOW WITH REAL DETAILS BEFORE DEPLOYING.
// Phone must be in international format (91XXXXXXXXXX) with no spaces for
// the tel:/wa.me links to work correctly.
// ---------------------------------------------------------------------------

const phoneDigits = '91XXXXXXXXXX'; // <-- put real 12-digit number here (91 + 10 digit mobile)

export const siteConfig = {
  name: 'Laksar Properties',
  url: 'https://mtine9086-del.github.io/laksarpropertyes',
  description:
    'Local property, plots, houses, agricultural land and commercial opportunities around Laksar, Haridwar, Uttarakhand.',
  contact: {
    phoneDisplay: '+91 XXXXX XXXXX', // <-- human-readable version shown in UI
    phoneHref: `tel:+${phoneDigits}`,
    whatsapp: `https://wa.me/${phoneDigits}`,
    whatsappWithText: (text: string) => `https://wa.me/${phoneDigits}?text=${encodeURIComponent(text)}`,
    email: 'hello@laksarproperties.example', // <-- put real email here
    emailHref: 'mailto:hello@laksarproperties.example',
    instagram: 'https://instagram.com/laksarproperties', // <-- put real handle here
    address: 'Laksar, Haridwar, Uttarakhand, India',
  },
  // Optional: a form-backend endpoint (e.g. Formspree / Web3Forms) so the
  // enquiry form can deliver leads without a custom backend. Leave blank to
  // skip network delivery and rely on the WhatsApp handoff + clipboard only.
  leadEndpoint: process.env.NEXT_PUBLIC_LEAD_ENDPOINT ?? '',
  areasWeWorkIn: ['Laksar', 'Khanpur', 'NH 334 corridor', 'Haridwar'],
};

export type SiteConfig = typeof siteConfig;
