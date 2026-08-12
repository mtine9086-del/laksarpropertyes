'use client';

export default function ParticleSwarmFrame() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

  return (
    <div className="hero-particle-layer" aria-hidden="true">
      <iframe
        className="hero-particle-swarm"
        src={`${basePath}/particle-swarm.html`}
        title=""
        tabIndex={-1}
        loading="eager"
      />
    </div>
  );
}
