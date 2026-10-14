# Sito portfolio di Sasha

Sito statico con Astro, blog in Markdown, nessun database.
Pubblicazione: Cloudflare Pages con deploy automatico da GitHub.

## Stile

@DESIGN.md

## Regole del progetto

- Solo tema scuro (deciso da Sasha: niente tema chiaro né interruttore).
- Lingua del sito: italiano. Struttura pronta per l'inglese (`/en/`): testi
  dell'interfaccia in `src/i18n/`, contenuti in sottocartelle per lingua (`it/`, `en/`).
- Non inserire dati personali non forniti da Sasha (indirizzo, telefono, data di nascita…).
  Contatti autorizzati: GitHub `sasha2324`, Telegram `@s_ans3`, Instagram `3s.ans`.
- Non presentare esperienze, lavori o certificazioni che Sasha non ha.
  Sasha sta iniziando un ITS in infrastrutture digitali.
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
| Pattern Waves | sfondo fisso di tutte le pagine e dell'intro | preset `silk`, bianco su nero, `fade="edges"`, interattivo; `rippleRate` 30 (orig. 60) per increspature più lente |
| LatticeLoader | animazione di caricamento | etichette in inglese, ✓ bianca (non verde); config da ricevere |
| ScrollExpand | passaggio caricamento → home | **automatico** (a tempo, non allo scroll); dentro la finestra c'è Pattern Waves |
| LineSidebar | **menu del sito** fisso in alto a sinistra (al posto della barra in alto) + indice dell'articolo a destra | colore viola `#A855F7` (unico colore del sito), resto valori standard; voci = link veri |
| TechText | titolo della home | testo `Sasha`, peso 700 (orig. 600), fontSize 320 (orig. 150), alone nero 28 px, `reveal="letter"`, tratteggio 4/2, 15 specks; h1 vero nascosto per accessibilità |
