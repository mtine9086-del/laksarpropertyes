'use client';

type RevealCardProps = {
  image: string;
  alt: string;
  number: string;
  title: string;
  text: string;
};

/**
 * Laksar property-card interaction, following the React/Motion patterns selected
 * from Animate UI, implemented with CSS so GitHub Pages stays dependency-light.
 * This is deliberately NOT an anchor: property clicks open the local detail modal.
 */
export default function RevealCard({ image, alt, number, title, text }: RevealCardProps) {
  return (
    <div className="property-card reveal tilt-card animate-ui-card" aria-hidden="true">
      <div className="card-image">
        <img src={`./${image}`} alt={alt} loading="lazy" />
        <span>{number}</span>
        <div className="card-overlay"><b>View property</b><strong>↗</strong></div>
      </div>
      <div className="card-body">
        <h3>{title}</h3>
        <p>{text}</p>
        <b className="card-link">View details <span>↗</span></b>
      </div>
    </div>
  );
}
