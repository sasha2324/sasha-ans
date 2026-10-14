/*
 * Sequenza di ingresso della home.
 *
 * 1. Lo sfondo Pattern Waves si vede in una finestra arrotondata, con il loader sotto.
 * 2. A caricamento finito il loader mostra la ✓ e il tempo trascorso dall'apertura
 *    ("Ready in 1.4s"): è lo stesso numero che il cronometro ha appena mostrato.
 * 3. La finestra si apre a tutto schermo (logica di ScrollExpand di React Bits,
 *    guidata dal tempo invece che dallo scorrimento: vedi le classi in Hero.astro).
 * 4. Compaiono titolo, testo e header.
 *
 * Un clic o un tasto salta la sequenza. La classe `intro` viene messa dallo script
 * nell'<head> (BaseLayout) solo alla prima apertura della visita.
 */

const MIN_LOADER_MS = 1400; // il loader resta visibile almeno questo tempo
const DONE_PAUSE_MS = 650; // quanto resta visibile la ✓ prima dell'apertura
const OPEN_MS = 1100; // durata dell'apertura (uguale alla transizione CSS)
const REVEAL_AT = 0.68; // come ScrollExpand: i contenuti entrano dal 68% dell'apertura

const root = document.documentElement;

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

const pageLoaded = () =>
  new Promise<void>((resolve) => {
    if (document.readyState === 'complete') resolve();
    else window.addEventListener('load', () => resolve(), { once: true });
  });

const seconds = (ms: number) => `${(ms / 1000).toFixed(1)}s`;

function finish() {
  root.classList.remove('intro', 'intro-open', 'intro-reveal');
  try {
    sessionStorage.setItem('intro-seen', '1');
  } catch {
    // Storage bloccato: l'intro ripartirà alla prossima apertura, nessun problema.
  }
}

async function run() {
  const loader = document.querySelector<HTMLElement>('[data-intro-loader] .lattice-loader');
  const timer = loader?.querySelector<HTMLElement>('.timer');
  const texts = loader?.querySelectorAll<HTMLElement>('.text');
  const sr = loader?.querySelector<HTMLElement>('.sr');

  let skipped = false;
  const skip = () => {
    skipped = true;
    finish();
  };
  window.addEventListener('pointerdown', skip, { once: true });
  window.addEventListener('keydown', skip, { once: true });

  // Il cronometro conta dall'apertura della pagina (performance.now() parte da lì).
  const tick = setInterval(() => {
    if (timer) timer.textContent = seconds(performance.now());
  }, 100);

  await Promise.all([pageLoaded(), document.fonts?.ready]);
  const loadedAt = performance.now();
  if (loadedAt < MIN_LOADER_MS) await wait(MIN_LOADER_MS - loadedAt);
  clearInterval(tick);
  if (skipped) return;

  // ✓ con il tempo trascorso, fermo sul valore del cronometro
  const readyAt = performance.now();
  if (loader) {
    loader.dataset.status = 'done';
    texts?.forEach((el, i) => el.toggleAttribute('data-active', i === 1));
    if (timer) timer.textContent = seconds(readyAt);
    if (sr) sr.textContent = `${loader.dataset.doneLabel} ${(readyAt / 1000).toFixed(1)} seconds`;
  }

  await wait(DONE_PAUSE_MS);
  if (skipped) return;
  root.classList.add('intro-open');

  await wait(OPEN_MS * REVEAL_AT);
  if (skipped) return;
  root.classList.add('intro-reveal');

  await wait(OPEN_MS * (1 - REVEAL_AT) + 400);
  if (skipped) return;
  window.removeEventListener('pointerdown', skip);
  window.removeEventListener('keydown', skip);
  finish();
}

if (root.classList.contains('intro')) run();
