import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import Reveal from '@/components/ui/Reveal';

/**
 * Compact editorial banner for inner pages — a wide local image with a
 * quiet scrim, breadcrumb and page title. Drone footage stays exclusive
 * to the home hero so pages load fast.
 */
export default function PageBanner({
  image,
  imageAlt,
  eyebrow,
  title,
  description,
  crumb,
}: {
  image: string;
  imageAlt: string;
  eyebrow: string;
  title: string;
  description?: string;
  crumb: string;
}) {
  return (
    <section className="relative isolate flex min-h-[46svh] items-end overflow-hidden bg-ink-900">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt={imageAlt}
        className="absolute inset-0 h-full w-full object-cover"
        fetchPriority="high"
      />
      <div className="hero-scrim absolute inset-0" aria-hidden="true" />
      <div className="container-site relative z-10 pb-12 pt-36">
        <Reveal>
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-cream-100/70">
              <li>
                <Link href="/" className="transition hover:text-cream-50">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <Icon name="chevron-right" size={12} />
              </li>
              <li aria-current="page" className="text-earth-300">
                {crumb}
              </li>
            </ol>
          </nav>
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-forest-200">{eyebrow}</p>
          <h1 className="mt-2 max-w-3xl text-3xl leading-tight text-cream-50 sm:text-5xl">{title}</h1>
          {description && <p className="mt-4 max-w-2xl text-cream-100/85">{description}</p>}
        </Reveal>
      </div>
    </section>
  );
}
