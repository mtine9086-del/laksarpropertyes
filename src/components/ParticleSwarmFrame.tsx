'use client';

export default function ParticleSwarmFrame() {
  return (
    <iframe
      className="hero-particle-swarm"
      src="./particle-swarm.html"
      title="Ambient particle field"
      aria-hidden="true"
      tabIndex={-1}
      style={{
        position: 'absolute', inset: '-8% -6% -8% 38%', width: '68%', height: '116%',
        border: 0, zIndex: -2, opacity: 0.62, pointerEvents: 'none',
        mixBlendMode: 'screen', transform: 'translateZ(0)',
        WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 18%, black 82%, transparent 100%)',
        maskImage: 'linear-gradient(90deg, transparent 0%, black 18%, black 82%, transparent 100%)'
      }}
    />
  );
}
