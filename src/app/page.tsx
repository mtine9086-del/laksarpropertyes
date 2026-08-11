'use client';

import { useEffect, useState } from 'react';

const categories = [
  { title: 'Residential Plots', text: 'Build where life makes sense.', image: 'cat-plots.jpg' },
  { title: 'Agricultural Land', text: 'Open land and farmland opportunities around Laksar.', image: 'cat-land.jpg' },
  { title: 'Houses', text: 'Everyday homes in connected localities.', image: 'cat-houses.jpg' },
  { title: 'Commercial', text: 'Shops and spaces for local business.', image: 'cat-commercial.jpg' },
];

export default function Home() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 120);
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('in-view');
      }),
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => { window.clearTimeout(timer); observer.disconnect(); };
  }, []);

  return <main className="site-shell">
    <nav className="nav">
      <a className="brand" href="#top">LAKSAR <span>PROPERTIES</span></a>
      <div className="nav-links"><a href="#properties">Properties</a><a href="#local">Why local</a><a href="#contact">Enquire</a></div>
    </nav>

    <section id="top" className="hero">
      <div className="hero-media"><img src="./hero-poster.jpg" alt="Laksar property landscape" /></div>
      <div className="hero-shade" />
      <div className="hero-orb" />
      <div className={`hero-content ${ready ? 'is-ready' : ''}`}>
        <div className="eyebrow">LAKSAR · HARIDWAR · UTTARAKHAND</div>
        <h1>Property,<br/><i>the local way.</i></h1>
        <p>Plots, farmland, homes and commercial spaces around Laksar — presented clearly, with practical local guidance.</p>
        <div className="actions"><a className="btn btn-light" href="#properties">Explore properties <b>↗</b></a><a className="btn btn-outline" href="#contact">Send requirement</a></div>
      </div>
      <div className="hero-meta"><span>LOCAL PROPERTY GUIDE</span><span>SCROLL ↓</span></div>
    </section>

    <section id="properties" className="section">
      <div className="section-head reveal"><div><span className="kicker">PROPERTY CATEGORIES</span><h2>Useful property.<br/><i>Real local context.</i></h2></div><p>We focus on normal, attractive and practical opportunities — not unrealistic luxury imagery.</p></div>
      <div className="cards">{categories.map((c, i) => <a className="property-card reveal" style={{'--delay': `${i * 90}ms`} as React.CSSProperties} href="#contact" key={c.title}><div className="card-image"><img src={`./${c.image}`} alt={c.title}/><span>0{i + 1}</span><div className="image-wash"/></div><div className="card-body"><h3>{c.title}</h3><p>{c.text}</p><b>Explore ↗</b></div></a>)}</div>
    </section>

    <section id="local" className="local-section">
      <div className="local-image reveal"><img src="./prop-land-khanpur.jpg" alt="Agricultural land near Laksar"/><div className="image-label">GROUND REALITY · LOCAL OPTIONS</div></div>
      <div className="local-copy reveal"><span className="kicker">LOCAL KNOWLEDGE MATTERS</span><h2>Not every good property needs to look <i>luxurious.</i></h2><p>Good property decisions start with the right locality, usable information and a clear conversation. We keep the experience simple and buyer-focused.</p><div className="facts"><span><strong>Local</strong><small>Laksar focused</small></span><span><strong>Clear</strong><small>Practical details</small></span><span><strong>Flexible</strong><small>Buyer needs</small></span><span><strong>Human</strong><small>Direct enquiry</small></span></div></div>
    </section>

    <section className="showcase">
      <div className="showcase-copy reveal"><span className="kicker">FROM LAND TO HOME</span><h2>See the opportunity,<br/><i>not just the listing.</i></h2><p>Explore a visual mix of plots, homes and land before you make an enquiry.</p></div>
      <div className="showcase-grid reveal"><img src="./prop-plot-nh334.jpg" alt="Plot near NH 334"/><img src="./prop-house-3bhk.jpg" alt="Residential house"/><img src="./prop-plot-colony.jpg" alt="Residential plot colony"/></div>
    </section>

    <section id="contact" className="contact reveal"><span className="kicker">START A CONVERSATION</span><h2>Looking for property<br/><i>in Laksar?</i></h2><p>Tell us what you need — plot, farmland, house or commercial space.</p><a className="btn btn-dark" href="./property-requirement/">Send your requirement <b>→</b></a></section>
    <footer><span>LAKSAR PROPERTIES</span><span>Laksar · Haridwar · Uttarakhand</span></footer>
  </main>;
}
