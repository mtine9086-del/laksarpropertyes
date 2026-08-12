'use client';

import { useEffect } from 'react';

// Splits an element's text into per-word <span class="motion-word"> wrappers
// WITHOUT collapsing existing markup (e.g. <br/> line breaks, <i> emphasis).
// Walks the DOM tree instead of using `el.textContent`, which was the root
// cause of the hero/heading rendering as one unbroken, non-italic string.
function wrapWordsPreservingMarkup(root: HTMLElement, counter: { i: number }) {
  const walk = (node: Node) => {
    Array.from(node.childNodes).forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const text = child.textContent ?? '';
        if (!text.trim()) return;
        const fragment = document.createDocumentFragment();
        const parts = text.split(/(\s+)/);
        parts.forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) { fragment.appendChild(document.createTextNode(part)); return; }
          const span = document.createElement('span');
          span.className = 'motion-word';
          span.style.setProperty('--word-index', String(counter.i++));
          span.textContent = part;
          span.setAttribute('aria-hidden', 'true');
          fragment.appendChild(span);
        });
        node.replaceChild(fragment, child);
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        // Keep the element (e.g. <i>, <span>) intact; recurse into its own
        // text so italics / nested emphasis are preserved.
        walk(child);
      }
      // <br/> and other childless elements simply pass through untouched.
    });
  };
  walk(root);
}

export default function MotionEnhancer() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const revealTargets = Array.from(document.querySelectorAll<HTMLElement>(
      'section:not(.hero),footer,.section-head,.showcase-copy,.local-copy,.contact,.cards,.facts,.showcase-grid,.property-card-hit,.shot'
    ));
    revealTargets.forEach((el) => el.classList.add('motion-reveal'));

    // Only headings get the per-word reveal treatment — body copy stays a
    // calm single fade-up so reading doesn't feel over-animated (per audit §7).
    const headingTargets = Array.from(document.querySelectorAll<HTMLElement>(
      '.hero h1,.section h2,.showcase h2,.local-copy h2,.contact h2'
    ));
    const fadeTargets = Array.from(document.querySelectorAll<HTMLElement>(
      '.hero p,.section-head p,.showcase-copy p,.local-copy p,.contact p,.kicker,.eyebrow'
    ));
    fadeTargets.forEach((el) => el.classList.add('motion-fade'));

    if (!reduce) {
      const counter = { i: 0 };
      headingTargets.forEach((el) => {
        if (el.dataset.motionReady === '1') return;
        const label = el.textContent?.trim();
        if (!label) return;
        el.dataset.motionReady = '1';
        el.setAttribute('aria-label', label);
        wrapWordsPreservingMarkup(el, counter);
        el.classList.add('motion-text');
      });
    }

    const reveal = (el: Element) => el.classList.add('in-view');
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) reveal(e.target); }),
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    revealTargets.forEach((el) => io.observe(el));
    headingTargets.forEach((el) => io.observe(el));
    fadeTargets.forEach((el) => io.observe(el));

    if (reduce) {
      revealTargets.forEach(reveal);
      headingTargets.forEach(reveal);
      fadeTargets.forEach(reveal);
    }

    return () => io.disconnect();
  }, []);

  return null;
}
