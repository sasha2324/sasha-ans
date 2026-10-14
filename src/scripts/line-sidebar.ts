/*
 * Logica di LineSidebar (adattata da React Bits — licenza in src/scripts/pattern-waves.ts).
 *
 * Un solo ciclo di animazione per elenco porta il valore --effect di ogni voce verso
 * il suo obiettivo con un'attenuazione esponenziale indipendente dal frame rate.
 * Obiettivo di una voce = il massimo tra: vicinanza al cursore, focus da tastiera,
 * voce attiva.
 *
 * Eventi:
 * - in ingresso `linesidebar:active` (detail: indice | null) → imposta la voce attiva
 * - in uscita `linesidebar:hover` (detail: indice | null) → voce più in evidenza
 */

type Falloff = 'linear' | 'smooth' | 'sharp';

const FALLOFF_CURVES: Record<Falloff, (p: number) => number> = {
  linear: (p) => p,
  smooth: (p) => p * p * (3 - 2 * p),
  sharp: (p) => p * p * p
};

function initLineSidebar(nav: HTMLElement) {
  const list = nav.querySelector<HTMLUListElement>('.list');
  if (!list) return;
  const items = Array.from(list.querySelectorAll<HTMLLIElement>('.item'));
  const links = items.map((li) => li.querySelector<HTMLAnchorElement>('a'));

  const radius = Number(nav.dataset.radius) || 100;
  const ease = FALLOFF_CURVES[(nav.dataset.falloff as Falloff) ?? 'smooth'] ?? FALLOFF_CURVES.linear;
  const smoothing = Number(nav.dataset.smoothing) || 100;
  const currentType = nav.dataset.current || 'page';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const targets = items.map(() => 0);
  const current = items.map(() => 0);
  let focused: number | null = null;
  let active: number | null = items.findIndex((li) => li.hasAttribute('data-active'));
  if (active < 0) active = null;
  let raf: number | null = null;
  let last = 0;
  let hovered: number | null = null;

  const frame = (now: number) => {
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    const tau = Math.max(smoothing, 1) / 1000;
    const k = reducedMotion ? 1 : 1 - Math.exp(-dt / tau);

    let moving = false;
    items.forEach((el, i) => {
      const target = Math.max(targets[i], focused === i ? 1 : 0, active === i ? 1 : 0);
      const next = current[i] + (target - current[i]) * k;
      const settled = Math.abs(target - next) < 0.0015;
      current[i] = settled ? target : next;
      el.style.setProperty('--effect', current[i].toFixed(4));
      if (!settled) moving = true;
    });
    raf = moving ? requestAnimationFrame(frame) : null;
  };

  const start = () => {
    if (raf != null) cancelAnimationFrame(raf);
    last = performance.now();
    raf = requestAnimationFrame(frame);
  };

  const announceHover = (index: number | null) => {
    if (index === hovered) return;
    hovered = index;
    nav.dispatchEvent(new CustomEvent('linesidebar:hover', { detail: index }));
  };

  list.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return;
    const rect = list.getBoundingClientRect();
    const pointerY = e.clientY - rect.top;
    let best: number | null = null;
    let bestValue = 0;
    items.forEach((el, i) => {
      const center = el.offsetTop + el.offsetHeight / 2;
      targets[i] = ease(Math.max(0, 1 - Math.abs(pointerY - center) / radius));
      if (targets[i] > bestValue) {
        bestValue = targets[i];
        best = i;
      }
    });
    announceHover(best);
    start();
  });

  list.addEventListener('pointerleave', () => {
    targets.fill(0);
    announceHover(focused);
    start();
  });

  list.addEventListener('focusin', (e) => {
    const index = links.indexOf(e.target as HTMLAnchorElement);
    focused = index >= 0 ? index : null;
    announceHover(focused);
    start();
  });

  list.addEventListener('focusout', () => {
    focused = null;
    start();
  });

  nav.addEventListener('linesidebar:active', ((e: CustomEvent<number | null>) => {
    active = e.detail;
    items.forEach((li, i) => {
      li.toggleAttribute('data-active', i === active);
      if (i === active) links[i]?.setAttribute('aria-current', currentType);
      else links[i]?.removeAttribute('aria-current');
    });
    start();
  }) as EventListener);

  start();
}

export function initLineSidebars() {
  document.querySelectorAll<HTMLElement>('[data-line-sidebar]').forEach((nav) => {
    if (nav.dataset.ready) return;
    nav.dataset.ready = '1';
    initLineSidebar(nav);
  });
}
