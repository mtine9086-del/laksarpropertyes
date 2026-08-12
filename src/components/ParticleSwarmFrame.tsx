'use client';

export default function ParticleSwarmFrame() {
  return (
    <div className="hero-particle-layer" aria-hidden="true">
      <iframe
        className="hero-particle-swarm"
        src="./particle-swarm.html"
        title=""
        tabIndex={-1}
        loading="eager"
      />
    </div>
  );
}
