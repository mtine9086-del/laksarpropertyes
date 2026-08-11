'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

export type PropertyDetail = {
  category: string;
  title: string;
  image: string;
  location: string;
  overview: string;
  details: string[];
};

type Props = { property: PropertyDetail | null; onClose: () => void };

export default function PropertyDetailModal({ property, onClose }: Props) {
  const reduced = useReducedMotion();
  return <AnimatePresence>{property && <motion.div className="property-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="property-modal-title" initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
    <motion.div className="property-modal" initial={reduced ? false : { opacity: 0, y: 28, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: .98 }} transition={{ duration: .42, ease: [0.22, 1, 0.36, 1] }}>
      <button className="modal-close" onClick={onClose} aria-label="Close property details">×</button>
      <div className="modal-visual"><img src={`./${property.image}`} alt={property.title} /><span>{property.category}</span></div>
      <div className="modal-content"><div className="kicker">PROPERTY DETAILS</div><h2 id="property-modal-title">{property.title}</h2><p className="modal-location">{property.location}</p><p>{property.overview}</p><div className="modal-details">{property.details.map((detail) => <span key={detail}>{detail}</span>)}</div><a className="btn btn-dark" href="#contact" onClick={onClose}><span>Enquire about this property</span><b>→</b></a></div>
    </motion.div>
  </motion.div>}</AnimatePresence>;
}
