'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import RevealCard from '@/components/animate-ui/RevealCard';
import PropertyDetailModal from '@/components/animate-ui/PropertyDetailModal';
import ParticleSwarmFrame from '@/components/ParticleSwarmFrame';
import type { PropertyDetail } from '@/components/animate-ui/PropertyDetailModal';

type Category = 'All' | 'Plots' | 'Land' | 'Homes' | 'Commercial';
type Property = PropertyDetail & { category: Exclude<Category, 'All'> };

const properties: Property[] = [
  { category: 'Plots', title: 'Residential Plots', text: 'Practical plots in connected localities around Laksar.', image: 'cat-plots.jpg', location: 'Laksar and nearby connected localities', overview: 'Residential plot opportunities presented with practical local context for buyers looking for a place to build.', details: ['Residential use', 'Local connectivity', 'Buyer-focused guidance'] },
  { category: 'Land', title: 'Agricultural Land', text: 'Open land and farmland opportunities with local context.', image: 'cat-land.jpg', location: 'Around Laksar / Khanpur side', overview: 'Open land and farmland opportunities for buyers who want space, locality context and a straightforward conversation.', details: ['Agricultural / open land', 'Local area context', 'Site discussion available'] },
  { category: 'Homes', title: 'Homes', text: 'Comfortable houses for everyday family living.', image: 'cat-houses.jpg', location: 'Laksar area', overview: 'Homes selected for practical everyday family living, with the important details discussed directly.', details: ['Family living', 'Local neighbourhood', 'Direct enquiry'] },
  { category: 'Commercial', title: 'Commercial Spaces', text: 'Shops and business spaces for local requirements.', image: 'cat-commercial.jpg', location: 'Laksar local market areas', overview: 'Commercial property options for local business requirements, with location and practical use discussed before enquiry.', details: ['Business use', 'Local market context', 'Requirement-based search'] },
];

const tabs: Category[] = ['All', 'Plots', 'Land', 'Homes', 'Commercial'];
const gallery = [
  { src: './prop-plot-nh334.jpg', label: '01 / PLOTS', alt: 'Plot near NH 334' },
  { src: './prop-house-3bhk.jpg', label: '02 / HOMES', alt: 'Residential house' },
  { src: './prop-plot-colony.jpg', label: '03 / LOCALITY', alt: 'Residential plot colony' },
];

export default function Home() {
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState<Category>('All');
  const [navScrolled, setNavScrolled] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<PropertyDetail | null>(null);
  const tabRef = useRef<HTMLDivElement>(null);
  const heroMediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 80);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('in-view'); }), { threshold: 0.12, rootMargin: '0px 0px -7% 0px' });
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    const onScroll = () => { const y = window.scrollY; setNavScrolled(y > 35); if (!reduced && heroMediaRef.current) heroMediaRef.current.style.transform = `translate3d(0, ${Math.min(y * 0.12, 90)}px, 0)`; };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
    return () => { window.clearTimeout(timer); observer.disconnect(); window.removeEventListener('scroll', onScroll); };
  }, []);

  useEffect(() => {
    if (lightbox === null && !selectedProperty) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setLightbox(null); setSelectedProperty(null); }
      if (lightbox !== null && event.key === 'ArrowRight') setLightbox((i) => i === null ? 0 : (i + 1) % gallery.length);
      if (lightbox !== null && event.key === 'ArrowLeft') setLightbox((i) => i === null ? 0 : (i - 1 + gallery.length) % gallery.length);
    };
    document.body.style.overflow = 'hidden'; window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [lightbox, selectedProperty]);

  const visibleProperties = useMemo(() => active === 'All' ? properties : properties.filter((item) => item.category === active), [active]);
  const moveTabIndicator = (element: HTMLButtonElement) => { const wrapper = tabRef.current; const indicator = wrapper?.querySelector<HTMLElement>('.tab-indicator'); if (!wrapper || !indicator) return; indicator.style.width = `${element.offsetWidth}px`; indicator.style.transform = `translateX(${element.offsetLeft}px)`; };
  useEffect(() => { const b = tabRef.current?.querySelector<HTMLButtonElement>('[aria-selected="true"]'); if (b) moveTabIndicator(b); const r = () => { const x = tabRef.current?.querySelector<HTMLButtonElement>('[aria-selected="true"]'); if (x) moveTabIndicator(x); }; window.addEventListener('resize', r); return () => window.removeEventListener('resize', r); }, [active]);
  const openProperty = (item: PropertyDetail) => setSelectedProperty(item);

  return <main className="site-shell">
    <nav className={`nav ${navScrolled ? 'nav-scrolled' : ''}`}>
      <a className="brand magnetic" href="#top" aria-label="Laksar Properties home"><span>LAKSAR</span> PROPERTIES</a>
      <div className="nav-links"><a href="#properties">Properties</a><a href="#local">Our approach</a><a href="#contact">Contact</a><a className="nav-social" href="#contact" aria-label="WhatsApp contact">WhatsApp</a><a className="nav-social" href="#contact" aria-label="Email contact">Email</a><a className="nav-social" href="#social" aria-label="Instagram">Instagram</a><a className="nav-cta" href="#contact">Enquire <b>↗</b></a></div>
    </nav>

    <section id="top" className="hero"><div className="hero-media" ref={heroMediaRef}><img src="./hero-poster.jpg" alt="Local property landscape around Laksar" /></div><ParticleSwarmFrame /><div className="hero-shade" /><div className="hero-grid" /><div className="hero-orb" /><div className={`hero-content ${ready ? 'is-ready' : ''}`}><div className="eyebrow"><span /> LAKSAR · HARIDWAR · UTTARAKHAND</div><h1><span>Property,</span><br /><i>with local clarity.</i></h1><p>Plots, farmland, homes and commercial spaces around Laksar — selected for real buyers, with practical information and local guidance.</p><div className="actions"><a className="btn btn-light magnetic" href="#properties"><span>Explore properties</span><b>↗</b></a><a className="btn btn-outline magnetic" href="#contact"><span>Tell us what you need</span><b>→</b></a></div></div><div className="hero-bottom"><span>LOCAL PROPERTY GUIDE</span><span className="scroll-cue"><i /> SCROLL TO EXPLORE</span></div></section>

    <section id="properties" className="section"><div className="section-head reveal"><div><span className="kicker">PROPERTY COLLECTION</span><h2>Find the right place.<br /><i>Start with the right context.</i></h2></div><p>Clear categories, real visuals and a simple path to enquiry. No exaggerated luxury — just attractive, useful local property.</p></div><div className="tabs reveal" ref={tabRef} role="tablist" aria-label="Property categories"><div className="tab-indicator" aria-hidden="true" />{tabs.map((tab) => <button key={tab} className={active === tab ? 'active' : ''} onClick={(e) => { setActive(tab); moveTabIndicator(e.currentTarget); }} role="tab" aria-selected={active === tab}>{tab}</button>)}</div><div className="cards">{visibleProperties.map((item, i) => <div key={item.title} className="property-card-hit" onClick={() => openProperty(item)} role="button" tabIndex={0} aria-label={`Open details for ${item.title}`} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openProperty(item); } }}><RevealCard image={item.image} alt={item.title} number={`0${i + 1}`} title={item.title} text={item.text} /></div>)}</div></section>

    <section id="local" className="local-section"><div className="local-image reveal"><img src="./prop-land-khanpur.jpg" alt="Agricultural land near Laksar" /><div className="image-label">GROUND REALITY · LOCAL OPTIONS</div><div className="image-corner">LXR / 01</div></div><div className="local-copy reveal"><span className="kicker">OUR APPROACH</span><h2>Good property does not need to look <i>overdone.</i></h2><p>We keep the experience grounded: useful locations, honest presentation and a clear conversation about what actually fits your requirement.</p><div className="facts"><span><strong>Local</strong><small>Laksar focused</small></span><span><strong>Clear</strong><small>Practical details</small></span><span><strong>Flexible</strong><small>Buyer needs</small></span><span><strong>Human</strong><small>Direct enquiry</small></span></div></div></section>

    <section className="showcase"><div className="showcase-copy reveal"><span className="kicker">FROM LAND TO HOME</span><h2>See the opportunity,<br /><i>not just the listing.</i></h2><p>A visual snapshot of the kind of property you can explore with Laksar Properties.</p><a href="#contact" className="text-link">Discuss your requirement <span>↗</span></a></div><div className="showcase-grid reveal" role="list" aria-label="Property gallery">{gallery.map((item, i) => <button className={`shot ${i === 0 ? 'shot-tall' : ''}`} key={item.src} onClick={() => setLightbox(i)} aria-label={`Open ${item.alt}`} role="listitem"><img src={item.src} alt={item.alt} /><span>{item.label}</span><b>+</b></button>)}</div></section>

    <section id="contact" className="contact reveal"><div className="contact-ring" /><span className="kicker">LET'S FIND THE RIGHT FIT</span><h2>Have a property<br /><i>requirement?</i></h2><p>Tell us what you are looking for and start a direct conversation.</p><a className="btn btn-dark magnetic" href="./contact/"><span>Send your requirement</span><b>→</b></a></section>
    <footer id="social"><span>LAKSAR PROPERTIES</span><span>Laksar · Haridwar · Uttarakhand</span></footer>

    <PropertyDetailModal property={selectedProperty} onClose={() => setSelectedProperty(null)} />
    {lightbox !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Property image viewer" onMouseDown={(e) => { if (e.target === e.currentTarget) setLightbox(null); }}><button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Close image viewer">×</button><button className="lightbox-prev" onClick={() => setLightbox((i) => i === null ? 0 : (i - 1 + gallery.length) % gallery.length)} aria-label="Previous image">←</button><figure><img src={gallery[lightbox].src} alt={gallery[lightbox].alt} /><figcaption>{gallery[lightbox].label}</figcaption></figure><button className="lightbox-next" onClick={() => setLightbox((i) => i === null ? 0 : (i + 1) % gallery.length)} aria-label="Next image">→</button></div>}
  </main>;
}
