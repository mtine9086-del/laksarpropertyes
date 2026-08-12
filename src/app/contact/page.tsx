'use client';

import { FormEvent, useEffect, useState } from 'react';
import { siteConfig } from '@/config/site';

const TYPES = ['Residential plot', 'Agricultural land', 'House', 'Commercial property'];

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [presetType, setPresetType] = useState<string>('Residential plot');

  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get('type');
    if (param && TYPES.some((t) => t.toLowerCase().includes(param.toLowerCase()) || param.toLowerCase().includes(t.toLowerCase()))) {
      const match = TYPES.find((t) => t.toLowerCase().includes(param.toLowerCase()) || param.toLowerCase().includes(t.toLowerCase()));
      if (match) setPresetType(match);
    } else if (param === 'Plots') setPresetType('Residential plot');
    else if (param === 'Land') setPresetType('Agricultural land');
    else if (param === 'Homes') setPresetType('House');
    else if (param === 'Commercial') setPresetType('Commercial property');
  }, []);

  function buildMessage(data: FormData) {
    return `Property requirement\nName: ${data.get('name')}\nPhone / WhatsApp: ${data.get('phone')}\nType: ${data.get('type')}\nDetails: ${data.get('details')}`;
  }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const message = buildMessage(data);
    setStatus('sending');

    let delivered = false;
    if (siteConfig.leadEndpoint) {
      try {
        const res = await fetch(siteConfig.leadEndpoint, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: data,
        });
        delivered = res.ok;
      } catch {
        delivered = false;
      }
    }

    try {
      await navigator.clipboard?.writeText(message);
    } catch {
      // clipboard can fail on non-secure contexts / permissions — non-fatal, WhatsApp handoff still works
    }

    setStatus(delivered ? 'sent' : 'sent');
    // Hand off straight to WhatsApp with the prefilled message — this is the
    // primary, zero-backend delivery path for local buyers.
    window.open(siteConfig.contact.whatsappWithText(message), '_blank', 'noopener');
  }

  return (
    <main className="contact-page">
      <div className="contact-nav"><a href="../">← Laksar Properties</a><span>PROPERTY ENQUIRY</span></div>
      <div className="contact-wrap">
        <div className="contact-intro">
          <span className="kicker">START A CONVERSATION</span>
          <h1>Tell us what<br /><i>you need.</i></h1>
          <p>Share the basics of your requirement. We will keep the conversation focused on location, budget and the type of property you actually want.</p>
          <div className="contact-note"><span>01</span><div><strong>Simple</strong><small>No unnecessary questions.</small></div></div>
          <div className="contact-note"><span>02</span><div><strong>Local</strong><small>Focused around Laksar and nearby areas.</small></div></div>
          <div className="contact-direct">
            <a href={siteConfig.contact.phoneHref}>{siteConfig.contact.phoneDisplay}</a>
            <a href={siteConfig.contact.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <a href={siteConfig.contact.emailHref}>{siteConfig.contact.email}</a>
          </div>
        </div>
        <form className="enquiry-form" onSubmit={submit} aria-describedby="form-status">
          <label>Name<input name="name" required placeholder="Your name" /></label>
          <label>Phone / WhatsApp<input name="phone" required inputMode="tel" placeholder="Your number" /></label>
          <label>Looking for
            <select name="type" value={presetType} onChange={(e) => setPresetType(e.target.value)} required>
              {TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </label>
          <label>Requirement details<textarea name="details" required rows={6} placeholder="Preferred location, budget, area, timeline…" /></label>
          <button type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : status === 'sent' ? 'Opened WhatsApp ✓' : 'Send requirement →'}
          </button>
          <p id="form-status" role="status" aria-live="polite" className="form-success">
            {status === 'sent' && 'Your enquiry has been prepared and copied — WhatsApp should have opened with your message ready to send. If it did not open, tap the WhatsApp link above.'}
            {status === 'error' && 'Something went wrong sending your enquiry. Please use the WhatsApp or Call link above instead.'}
          </p>
          <p className="privacy-note">Your details are used only to respond to this enquiry and are not shared with third parties.</p>
        </form>
      </div>
    </main>
  );
}
