'use client';

import { useEffect, useRef } from 'react';

export type PropertyDetail = {
  category: string;
  title: string;
  text: string;
  image: string;
  location: string;
  overview: string;
  details: string[];
};

type Props = { property: PropertyDetail | null; onClose: () => void };

export default function PropertyDetailModal({ property, onClose }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<Element | null>(null);

  useEffect(() => {
    if (!property) return;
    openerRef.current = document.activeElement;
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      const node = dialogRef.current;
      if (!node) return;
      const focusable = node.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      if (openerRef.current instanceof HTMLElement) openerRef.current.focus();
    };
  }, [property]);

  if (!property) return null;

  const enquiryHref = `./contact/?type=${encodeURIComponent(property.category)}`;

  return (
    <div className="property-modal-backdrop property-modal-enter" role="dialog" aria-modal="true" aria-labelledby="property-modal-title" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="property-modal" role="document" ref={dialogRef}>
        <button className="modal-close" ref={closeRef} onClick={onClose} aria-label="Close property details">×</button>
        <div className="modal-visual">
          <img src={`./${property.image}`} alt={property.title} />
          <span>{property.category}</span>
        </div>
        <div className="modal-content">
          <div className="kicker">PROPERTY DETAILS</div>
          <h2 id="property-modal-title">{property.title}</h2>
          <p className="modal-location">{property.location}</p>
          <p>{property.overview}</p>
          <div className="modal-details">{property.details.map((detail) => <span key={detail}>{detail}</span>)}</div>
          <a className="btn btn-dark" href={enquiryHref} onClick={onClose}><span>Enquire about this property</span><b>→</b></a>
        </div>
      </div>
    </div>
  );
}
