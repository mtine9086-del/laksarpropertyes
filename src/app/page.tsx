export default function Home() {
  return (
    <main style={{fontFamily:'Arial,sans-serif',minHeight:'100vh',background:'#f7f5ef',color:'#1f2933'}}>
      <section style={{padding:'80px 24px',maxWidth:1100,margin:'0 auto'}}>
        <p style={{letterSpacing:2,textTransform:'uppercase',fontSize:13}}>Laksar · Haridwar · Uttarakhand</p>
        <h1 style={{fontSize:'clamp(42px,7vw,78px)',lineHeight:1.02,margin:'18px 0'}}>Find property that fits your life.</h1>
        <p style={{fontSize:20,maxWidth:700,lineHeight:1.6}}>Local property guidance for residential plots, houses, agricultural land and commercial opportunities — practical, clear and focused on the Laksar area.</p>
        <div style={{display:'flex',gap:14,flexWrap:'wrap',marginTop:32}}>
          <a href="/laksarpropertyes/properties/" style={{padding:'14px 22px',background:'#1f2933',color:'#fff',textDecoration:'none',borderRadius:8}}>Explore Properties</a>
          <a href="/laksarpropertyes/contact/" style={{padding:'14px 22px',border:'1px solid #1f2933',color:'#1f2933',textDecoration:'none',borderRadius:8}}>Send Requirement</a>
        </div>
      </section>
      <section style={{background:'#fff',padding:'48px 24px'}}>
        <div style={{maxWidth:1100,margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(210px,1fr))',gap:18}}>
          {['Residential Plots','Houses','Agricultural Land','Commercial Property'].map(x=><div key={x} style={{padding:24,border:'1px solid #e5e7eb',borderRadius:12}}><h2 style={{fontSize:20}}>{x}</h2><p style={{lineHeight:1.5}}>Browse local opportunities and enquire for current availability.</p></div>)}
        </div>
      </section>
    </main>
  );
}
