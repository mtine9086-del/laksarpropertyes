'use client';

import { useEffect, useMemo, useState } from 'react';

type Category = 'All' | 'Plots' | 'Land' | 'Homes' | 'Commercial';

const properties = [
  { category: 'Plots', title: 'Residential Plots', text: 'Practical plots in connected localities around Laksar.', image: 'cat-plots.jpg' },
  { category: 'Land', title: 'Agricultural Land', text: 'Open land and farmland opportunities with local context.', image: 'cat-land.jpg' },
  { category: 'Homes', title: 'Homes', text: 'Comfortable houses for everyday family living.', image: 'cat-houses.jpg' },
  { category: 'Commercial', title: 'Commercial Spaces', text: 'Shops and business spaces for local requirements.', image: 'cat-commercial.jpg' },
];

const tabs: Category[] = ['All', 'Plots', 'Land', 'Homes', 'Commercial'];

export default function Home() {
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState<Category>('All');

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 120);
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('in-view');
    }), { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => { window.clearTimeout(timer); observer.disconnect(); };
  }, []);

  const visibleProperties = useMemo(() => active === 'All' ? properties : properties.filter((item) => item.category === active), [active]);

  return (
    <main className="site-shell">
      <nav className="nav">
        <a className="brand" href="#top"><span>LAKSAR</span> PROPERTIES</a>
        <div className="nav-links"><a href="#properties">Properties</a><a href="#local">Our approach</a><a className="nav-cta" href="#contact">Enquire <b>↗</b></a></div>
      </nav>

      <section id="top" className="hero">
        <div className="hero-media"><img src="./hero-poster.jpg" alt="Local property landscape around Laksar" /></div>
        <div className="hero-shade" /><div className="hero-grid" /><div className="hero-orb" />
        <div className={`hero-content ${ready ? 'is-ready' : ''}`}>
          <div className="eyebrow"><span /> LAKSAR · HARIDWAR · UTTARAKHAND</div>
          <h1>Property,<br /><i>with local clarity.</i></h1>
          <p>Plots, farmland, homes and commercial spaces around Laksar — selected for real buyers, with practical information and local guidance.</p>
          <div className="actions"><a className="btn btn-light" href="#properties"><span>Explore properties</span><b>↗</b></a><a className="btn btn-outline" href="#contact"><span>Tell us what you need</span><b>→</b></a></div>
        </div>
        <div className="hero-bottom"><span>LOCAL PROPERTY GUIDE</span><span className="scroll-cue"><i /> SCROLL TO EXPLORE</span></div>
      </section>

      <section id="properties" className="section">
        <div className="section-head reveal"><div><span className="kicker">PROPERTY COLLECTION</span><h2>Find the right place.<br /><i>Start with the right context.</i></h2></div><p>Clear categories, real visuals and a simple path to enquiry. No exaggerated luxury — just attractive, useful local property.</p></div>
        <div className="tabs reveal" role="tablist" aria-label="Property categories">{tabs.map((tab) => <button key={tab} className={active === tab ? 'active' : ''} onClick={() => setActive(tab)} role="tab" aria-selected={active === tab}>{tab}<span /></button>)}</div>
        <div className="cards">{visibleProperties.map((item, i) => <a className="property-card reveal" style={{ '--delay': `${i * 80}ms` } as React.CSSProperties} href="#contact" key={item.title}>
          <div className="card-image"><img src={`./${item.image}`} alt={item.title} /><span>0{i + 1}</span><div className="card-overlay"><b>View category</b><strong>↗</strong></div></div>
          <div className="card-body"><h3>{item.title}</h3><p>{item.text}</p><b className="card-link">Explore <span>↗</span></b></div>
        </a>)}</div>
      </section>

      <section id="local" className="local-section">
        <div className="local-image reveal"><img src="./prop-land-khanpur.jpg" alt="Agricultural land near Laksar" /><div className="image-label">GROUND REALITY · LOCAL OPTIONS</div><div className="image-corner">LXR / 01</div></div>
        <div className="local-copy reveal"><span className="kicker">OUR APPROACH</span><h2>Good property does not need to look <i>overdone.</i></h2><p>We keep the experience grounded: useful locations, honest presentation and a clear conversation about what actually fits your requirement.</p><div className="facts"><span><strong>Local</strong><small>Laksar focused</small></span><span><strong>Clear</strong><small>Practical details</small></span><span><strong>Flexible</strong><small>Buyer needs</small></span><span><strong>Human</strong><small>Direct enquiry</small></span></div></div>
      </section>

      <section className="showcase">
        <div className="showcase-copy reveal"><span className="kicker">FROM LAND TO HOME</span><h2>See the opportunity,<br /><i>not just the listing.</i></h2><p>A visual snapshot of the kind of property you can explore with Laksar Properties.</p><a href="#contact" className="text-link">Discuss your requirement <span>↗</span></a></div>
        <div className="showcase-grid reveal"><div className="shot shot-tall"><img src="./prop-plot-nh334.jpg" alt="Plot near NH 334" /><span>01 / PLOTS</span></div><div className="shot"><img src="./prop-house-3bhk.jpg" alt="Residential house" /><span>02 / HOMES</span></div><div className="shot"><img src="./prop-plot-colony.jpg" alt="Residential plot colony" /><span>03 / LOCALITY</span></div></div>
      </section>

      <section id="contact" className="contact reveal"><div className="contact-ring" /><span className="kicker">LET'S FIND THE RIGHT FIT</span><h2>Have a property<br /><i>requirement?</i></h2><p>Tell us what you are looking for and start a direct conversation.</p><a className="btn btn-dark" href="./contact/"><span>Send your requirement</span><b>→</b></a></section>
      <footer><span>LAKSAR PROPERTIES</span><span>Laksar · Haridwar · Uttarakhand</span></footer>
    </main>
  );
}
