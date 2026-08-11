'use client';

import { motion, useReducedMotion } from 'motion/react';

type RevealCardProps = {
  href: string;
  image: string;
  alt: string;
  number: string;
  title: string;
  text: string;
};

/** Laksar adaptation inspired by Animate UI's React + Motion approach. */
export default function RevealCard({ href, image, alt, number, title, text }: RevealCardProps) {
  const reduced = useReducedMotion();

  return (
    <motion.a
      href={href}
      className="property-card reveal tilt-card animate-ui-card"
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduced ? undefined : { y: -7 }}
      whileTap={reduced ? undefined : { scale: 0.985 }}
    >
      <div className="card-image">
        <motion.img
          src={`./${image}`}
          alt={alt}
          loading="lazy"
          initial={false}
          whileHover={reduced ? undefined : { scale: 1.055 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        />
        <span>{number}</span>
        <div className="card-overlay"><b>View category</b><strong>↗</strong></div>
      </div>
      <div className="card-body">
        <h3>{title}</h3>
        <p>{text}</p>
        <motion.b className="card-link" whileHover={reduced ? undefined : { x: 4 }} transition={{ duration: 0.2 }}>Explore <span>↗</span></motion.b>
      </div>
    </motion.a>
  );
}
