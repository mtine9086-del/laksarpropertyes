# Animate UI — Future Component Source

Source: https://github.com/imskyleen/animate-ui

Animate UI is an open-source React/TypeScript/Tailwind/Motion animated component distribution. Its README describes it as fully animated and licensed under MIT.

## Laksar usage

The Laksar project is Next.js + React 18. We use Animate UI as a source of interaction patterns and selectively adapt components. Do not copy the entire Animate UI application or its documentation site into production.

Current integration:
- `src/components/animate-ui/RevealCard.tsx` — property-card reveal/lift/image-scale interaction using Motion.
- `motion` dependency added to the Laksar app.

Future candidates:
- text reveal
- animated buttons
- hover/press feedback
- directional image reveals
- lightweight modal/lightbox transitions
- viewport-based section entrances

Keep the Laksar visual language earthy and local. Avoid unrelated neon/cosmic effects. Respect reduced motion and accessibility.

Upstream source is pinned by repository documentation rather than bundled wholesale, so future upgrades can be reviewed intentionally.
