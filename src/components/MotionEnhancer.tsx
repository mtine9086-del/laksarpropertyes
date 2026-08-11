'use client';

import { useEffect } from 'react';

export default function MotionEnhancer(){
  useEffect(()=>{
    const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets=Array.from(document.querySelectorAll<HTMLElement>('section:not(.hero),footer,.section-head,.showcase-copy,.local-copy,.contact,.cards,.facts,.showcase-grid,.property-card-hit,.shot'));
    targets.forEach((el)=>el.classList.add('motion-reveal'));

    const textTargets=Array.from(document.querySelectorAll<HTMLElement>('.hero h1,.section h2,.showcase h2,.local-copy h2,.contact h2,.hero p,.section-head p,.showcase-copy p,.local-copy p,.contact p,.kicker,.eyebrow'));
    if(!reduce){
      textTargets.forEach((el)=>{
        if(el.dataset.motionReady==='1') return;
        const text=el.textContent?.trim();
        if(!text) return;
        el.dataset.motionReady='1';
        el.setAttribute('aria-label',text);
        const fragment=document.createDocumentFragment();
        const parts=text.split(/(\s+)/);
        let index=0;
        parts.forEach((part)=>{
          if(/^\s+$/.test(part)){fragment.appendChild(document.createTextNode(part));return;}
          const span=document.createElement('span');
          span.className='motion-word'; span.style.setProperty('--word-index',String(index++)); span.textContent=part; span.setAttribute('aria-hidden','true'); fragment.appendChild(span);
        });
        el.textContent=''; el.appendChild(fragment); el.classList.add('motion-text');
        if(el.matches('p')) el.classList.add('motion-paragraph');
      });
    }

    const reveal=(el:Element)=>el.classList.add('in-view');
    const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting) reveal(e.target)}),{threshold:.12,rootMargin:'0px 0px -8% 0px'});
    targets.forEach(el=>io.observe(el));
    textTargets.forEach(el=>io.observe(el));
    if(reduce){targets.forEach(reveal);textTargets.forEach(reveal)}
    return()=>io.disconnect();
  },[]);
  return null;
}
