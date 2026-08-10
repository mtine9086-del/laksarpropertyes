import { site } from '@/config/site';
import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import Icon from '@/components/ui/Icon';

export default function Home() {
  return (
    <main className="min-h-screen bg-cream-50 text-forest-900">
      <section className="relative min-h-[88vh] overflow-hidden bg-forest-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(214,161,92,.24),transparent_34%),linear-gradient(120deg,rgba(11,42,31,.96),rgba(20,62,46,.78))]" />
        <div className="relative mx-auto flex min-h-[88vh] max-w-7xl items-end px-6 pb-20 pt-32 sm:px-10 lg:px-12">
          <Reveal>
            <div className="max-w-3xl">
              <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[.2em] text-cream-100"><Icon name="map-pin" size={14}/> {site.locality} · {site.region}</p>
              <h1 className="text-5xl leading-[.98] text-cream-50 sm:text-6xl lg:text-8xl">Property, the local way.</h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-cream-100/80 sm:text-xl">Plots, farmland, homes and commercial spaces around Laksar — presented clearly, with local knowledge and practical guidance.</p>
              <div className="mt-9 flex flex-wrap gap-3"><Button href="/properties" variant="secondary" icon="arrow-right">Explore Properties</Button><Button href="/property-requirement" variant="outline-light" icon="send">Send Requirement</Button></div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad"><div className="container-site"><Reveal><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {[['01','Residential Plots','Build where life makes sense.'],['02','Agricultural Land','Practical land options around Laksar.'],['03','Houses','Everyday homes in connected localities.'],['04','Commercial','Shops and spaces for local business.']].map(([n,t,d])=><div key={n} className="group rounded-3xl border border-forest-900/10 bg-white p-7 shadow-e-1 transition duration-500 hover:-translate-y-2 hover:shadow-e-3"><span className="text-xs font-bold tracking-[.2em] text-earth-600">{n}</span><h2 className="mt-8 text-2xl text-forest-900">{t}</h2><p className="mt-3 text-forest-700/70">{d}</p><div className="mt-7 h-px w-10 bg-earth-500 transition-all duration-500 group-hover:w-20" /></div>)}
      </div></Reveal></div></section>

      <section className="section-pad bg-forest-800 text-cream-50"><div className="container-site"><Reveal><div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-earth-300">Local knowledge matters</p><h2 className="mt-4 text-4xl sm:text-5xl">Not every good property needs to look luxurious.</h2><p className="mt-5 max-w-2xl leading-8 text-cream-100/75">We focus on useful local opportunities — real neighbourhoods, workable plots, farmland, houses and commercial spaces — so buyers can compare with a clearer picture of the ground reality.</p></div><div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur"><div className="grid grid-cols-2 gap-6">{[['Local','Laksar focused'],['Clear','Practical details'],['Flexible','Buyer requirements'],['Human','Direct enquiry']].map(([a,b])=><div key={a}><div className="text-2xl">{a}</div><div className="mt-1 text-sm text-cream-100/60">{b}</div></div>)}</div></div></div></Reveal></div></section>

      <section className="section-pad"><div className="container-site"><Reveal><div className="rounded-3xl bg-forest-900 px-7 py-14 text-center shadow-e-3 sm:px-12"><p className="text-xs font-bold uppercase tracking-[.2em] text-earth-300">{site.locality} · {site.region} · {site.state}</p><h2 className="mt-5 text-4xl text-cream-50 sm:text-5xl">Looking for property in Laksar?</h2><p className="mx-auto mt-4 max-w-xl text-cream-100/70">Tell us what you need — a plot, farmland, a house or a shop — and we’ll help you start with the right options.</p><div className="mt-8 flex justify-center"><Button href="/property-requirement" variant="secondary" icon="send">Send Requirement</Button></div></div></Reveal></div></section>
    </main>
  );
}
