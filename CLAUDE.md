# Sito portfolio di Sasha

Sito statico con Astro, blog in Markdown, nessun database.
Pubblicazione: Cloudflare Pages con deploy automatico da GitHub.

## Stile

@DESIGN.md

## Regole del progetto

- Tema chiaro di base e tema scuro con il pulsante nel menu (deciso da Sasha, novembre 2026).
  Ogni modifica va controllata nei due temi, su desktop e su telefono.
- Lingue: italiano (`/`) e inglese (`/en/`); struttura pronta per ucraino e russo
  (istruzioni in cima a `src/i18n/ui.ts`). Testi dell'interfaccia in `src/i18n/ui.ts`,
  testi dei dati come `{ it, en }` in `src/data/`, articoli in `src/content/blog/<lingua>/`.
  Un articolo non tradotto compare nelle altre lingue con «Italian only».
- Non inserire dati personali non forniti da Sasha (indirizzo, telefono, data di nascita…).
  Contatti autorizzati: LinkedIn, GitHub `sasha2324`, X `x861929` e Telegram `@s_ans3`
  (nell'intro e nei Contatti della home), Instagram `3s.ans` (solo nel footer).
- Non presentare esperienze, lavori o certificazioni che Sasha non ha.
  Sasha è studente ITS in infrastrutture digitali (in corso).
- Immagini dei progetti: niente dati veri di persone (solo dati di prova inventati),
  niente dati di salute né date di gara.
- Gli articoli li scrive Sasha: preparare solo struttura e segnaposto.
- Piccoli passi, un commit chiaro per ogni passo; spiegare in breve le scelte importanti.
- Chiedere prima di installare pacchetti o toccare file fuori da questa cartella.

## Codice di terzi

Componenti da React Bits (reactbits.dev, github.com/DavidHDev/react-bits),
licenza MIT + Commons Clause © David Haz. Uso consentito come parte del sito,
anche modificato e riscritto senza React. Obblighi: tenere nota di copyright e
licenza in ogni file; non vendere né ridistribuire i componenti da soli.

| Componente | Ruolo nel sito | Configurazione scelta |
|---|---|---|
| Pattern Waves | sfondo fisso di tutte le pagine e dell'intro | preset `silk`, colore `--ink` su `--bg` (cambia con il tema), `fade="edges"`, interattivo; `rippleRate` 30 (orig. 60) per increspature più lente |
| LatticeLoader | animazione di caricamento | etichette in inglese, ✓ nel colore del testo (non verde) |
| ScrollExpand | passaggio caricamento → home | **automatico** (a tempo, non allo scroll); dentro la finestra c'è Pattern Waves |
| LineSidebar | solo **indice dell'articolo** (il menu del sito è la pillola in SiteNav.astro) | colore `--accent` (blu); `fontSize` 0.9, `maxShift` 14, `markerLength` 32, `itemGap` 14 per la colonna stretta |
| TechText | il nome nell'intro della home | testo `Sasha`, peso 700 (orig. 600), fontSize 320 (orig. 150), `align: 'left'` (aggiunta nostra), `reveal="letter"`, tratteggio 4/2, 15 specks; testo `--ink`, effetti `--accent-text`; h1 vero nascosto per accessibilità |
