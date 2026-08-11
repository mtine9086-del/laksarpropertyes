'use client';

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
  if (!property) return null;

  return (
    <div className="property-modal-backdrop property-modal-enter" role="dialog" aria-modal="true" aria-labelledby="property-modal-title" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="property-modal" role="document">
        <button className="modal-close" onClick={onClose} aria-label="Close property details">×</button>
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
          <a className="btn btn-dark" href="#contact" onClick={onClose}><span>Enquire about this property</span><b>→</b></a>
        </div>
      </div>
    </div>
  );
}
