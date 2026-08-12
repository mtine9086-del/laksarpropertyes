import { siteConfig } from '@/config/site';

export const metadata = { title: 'Properties' };

export default function Properties() {
  return (
    <main style={{ fontFamily: "'DM Sans',Arial,sans-serif", padding: '90px 24px 60px', maxWidth: 720, margin: '0 auto', color: '#183d30' }}>
      <a href="../" style={{ fontSize: 12, letterSpacing: '.08em', color: '#183d30', textDecoration: 'none' }}>← Laksar Properties</a>
      <h1 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 400, fontSize: 'clamp(32px,6vw,48px)', margin: '20px 0 12px' }}>Properties</h1>
      <p style={{ lineHeight: 1.7, opacity: 0.85 }}>
        The full browsable listing lives on the home page under <a href="../#properties" style={{ color: '#183d30' }}>Property Collection</a> —
        plots, agricultural land, homes and commercial spaces around Laksar. For the latest local inventory that isn&apos;t shown yet, reach out directly.
      </p>
      <div style={{ display: 'flex', gap: 14, marginTop: 24, flexWrap: 'wrap' }}>
        <a href="../#properties" style={{ padding: '12px 20px', borderRadius: 999, background: '#183d30', color: '#fbf6eb', textDecoration: 'none', fontSize: 13 }}>Browse property collection →</a>
        <a href={siteConfig.contact.whatsapp} target="_blank" rel="noopener noreferrer" style={{ padding: '12px 20px', borderRadius: 999, border: '1px solid rgba(24,61,48,.25)', color: '#183d30', textDecoration: 'none', fontSize: 13 }}>WhatsApp us your requirement</a>
      </div>
    </main>
  );
}
