import { site } from '@/config/site';
import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import Icon from '@/components/ui/Icon';

/**
 * Final call-to-action band (spec Phase 3, Section 8) — strong but
 * non-aggressive. Reused across pages.
 */
export default function CTASection({
  title = 'Looking for property in Laksar?',
  description = 'Tell us what you need — a plot, farmland, a house, a shop — and we’ll come back with real options from the ground.',
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="section-pad" aria-labelledby="cta-heading">
      <div className="container-site">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-forest-800 px-6 py-14 text-center shadow-e-3 sm:px-12 lg:py-16">
            {/* layered depth decoration */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-forest-600/40 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-28 -right-20 h-80 w-80 rounded-full bg-earth-500/20 blur-3xl"
            />
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cream-50/30 to-transparent" />

            <p className="relative mx-auto inline-flex items-center gap-2 rounded-full border border-cream-50/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-forest-100">
              <Icon name="map-pin" size={13} className="text-earth-300" />
              {site.locality} · {site.region} · {site.state}
            </p>
            <h2 id="cta-heading" className="relative mx-auto mt-5 max-w-2xl text-3xl text-cream-50 sm:text-4xl">
              {title}
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-cream-100/80">{description}</p>
            <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button href="/property-requirement" variant="secondary" icon="send">
                Send Requirement
              </Button>
              <Button href="/contact" variant="outline-light" icon="phone">
                Contact Us
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
