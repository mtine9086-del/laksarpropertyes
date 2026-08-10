'use client';

import { useEffect, useState } from 'react';

const categories = [
  ['01', 'Residential Plots', 'Build where life makes sense.'],
  ['02', 'Agricultural Land', 'Practical land options around Laksar.'],
  ['03', 'Houses', 'Everyday homes in connected localities.'],
  ['04', 'Commercial', 'Shops and spaces for local business.'],
];

export default function Home() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 80); return () => clearTimeout(t); }, []);

  return (
    <main className="site-shell">
      <nav className="nav"><div className="brand"><span>LAKSAR</span> PROPERTIES</div><div className="nav-links"><a href="#properties">Properties</a><a href="#about">Why local</a><a href="#contact">Enquire</a></div></nav>

      <section className="hero">
        <div className="hero-glow" />
        <div className={`hero-content ${visible ? 'show' : ''}`}>
          <div className="eyebrow">LAKSAR · HARIDWAR · UTTARAKHAND</div>
          <h1>Property,<br /><em>the local way.</em></h1>
          <p>Plots, farmland, homes and commercial spaces around Laksar — presented clearly, with practical local guidance.</p>
          <div className="actions"><a className="btn btn-light" href="#properties">Explore properties <span>↗</span></a><a className="btn btn-outline" href="#contact">Send requirement</a></div>
        </div>
        <div className="hero-line" />
        <div className="scroll">SCROLL <span>↓</span></div>
      </section>

      <section id="properties" className="section">
        <div className="section-head"><div><span className="kicker">WHAT WE COVER</span><h2>Real property.<br /><i>Real local context.</i></h2></div><p>Good property does not have to look luxurious. We focus on useful opportunities in real neighbourhoods around Laksar.</p></div>
        <div className="cards">{categories.map(([n, t, d]) => <a className="card" href="#contact" key={n}><span className="num">{n}</span><h3>{t}</h3><p>{d}</p><span className="arrow">↗</span></a>)}</div>
      </section>

      <section id="about" className="local-section"><div className="local-copy"><span className="kicker">LOCAL KNOWLEDGE MATTERS</span><h2>Not every good property needs to look <i>luxurious.</i></h2><p>We focus on workable plots, farmland, houses and commercial spaces — so buyers can compare options with a clearer picture of the ground reality.</p></div><div className="facts"><div><strong>Local</strong><small>Laksar focused</small></div><div><strong>Clear</strong><small>Practical details</small></div><div><strong>Flexible</strong><small>Buyer requirements</small></div><div><strong>Human</strong><small>Direct enquiry</small></div></div></section>

      <section id="contact" className="contact"><span className="kicker">START A CONVERSATION</span><h2>Looking for property<br /><i>in Laksar?</i></h2><p>Tell us what you need — a plot, farmland, a house or a shop.</p><a className="btn btn-light" href="mailto:hello@laksarproperties.in?subject=Property%20Requirement">Send your requirement <span>→</span></a></section>
      <footer><span>LAKSAR PROPERTIES</span><span>Laksar · Haridwar · Uttarakhand</span></footer>
    </main>
  );
}
