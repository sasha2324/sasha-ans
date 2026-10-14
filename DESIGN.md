# DESIGN.md — «Selezione»

Sostituisce la prima direzione «Topologia» (partita dal DESIGN.md di Together AI,
raccolta VoltAgent/awesome-design-md). Di quella restano: font IBM Plex, base di
spaziatura a 4 px, bordi sottili al posto delle ombre, schema del percorso come lista.

Riferimenti attuali: quattro componenti di **React Bits** scelti da Sasha
(licenza e configurazioni in CLAUDE.md):

| Componente | Cosa ne prende il sito |
|---|---|
| Pattern Waves | lo sfondo a puntini e la palette bianco/nero |
| TechText | il titolo; il **tratteggio** come segno di "in lavorazione"; la **cornice di selezione** con maniglie agli angoli |
| LatticeLoader | il loader della sequenza di ingresso; i puntini in griglia |
| ScrollExpand | la finestra arrotondata che si apre a tutto schermo; il velo (scrim) per leggere il testo sopra lo sfondo |

---

## Idea

Il sito sembra un programma di grafica sopra uno schema tecnico: puntini, contorni
tratteggiati, cornici di selezione, etichette con le misure. Due regole danno
significato agli elementi:

1. **Pieno = fatto, tratteggiato = in corso.** Vale per il percorso (nodi e
   collegamenti) e per le competenze ("So usare" pieno, "Sto imparando" tratteggiato).
2. **La cornice di selezione è l'unico effetto hover/focus** (classe `.selectable`).
   La tappa del percorso in corso la porta sempre: è "selezionata".

Un solo momento animato forte: la sequenza di ingresso della home. Il resto è fermo.

## Colori

Bianco e nero, nessun accento. Il tema chiaro è l'inversione del tema scuro.

| Token | Scuro | Chiaro | Ruolo |
|---|---|---|---|
| `--bg` | `#000000` | `#ffffff` | sfondo; deve coincidere con lo sfondo di Pattern Waves |
| `--ink` | `#ffffff` | `#000000` | testo, puntini, bordi pieni, maniglie |
| `--muted` | `#a3a3a3` | `#5c5c5c` | testo secondario, bordi tratteggiati |
| `--hairline` | `#333333` | `#d4d4d4` | divisori (solo decorativi) |
| `--code-bg` | `#111111` | `#f4f4f4` | blocchi di codice |

Contrasto: `--muted` 8.6:1 su nero, 6.7:1 su bianco.

## Tipografia

| Ruolo | Font | Uso |
|---|---|---|
| Titoli | IBM Plex Sans Condensed 600 | h1–h3, titolo TechText, frase della hero |
| Testo | IBM Plex Sans 400 / 500 | paragrafi, navigazione, bottoni |
| Tecnico | IBM Plex Mono 400 | **solo** etichette di stato e misure (come le etichette di TechText), codice |

IBM Plex Sans Condensed non ha il cirillico: le lettere cirilliche nei titoli
usano IBM Plex Sans (riserva in `--font-display`).

Scala ~1.25: `--step--2` 0.75rem · `--step--1` 0.875rem · `--step-0` 1rem ·
`--step-1` 1.2rem · `--step-2` 1.5rem · `--step-3` clamp(1.75–2.5rem) ·
`--step-4` clamp(2.25–3.5rem). Base 17 px su telefono, 18 px da 768 px.
Righe di testo al massimo 68ch. Sentence case ovunque.

## Spaziatura, griglia, forme

- Base 4 px: `--space-1…8` = 4 8 12 16 24 32 48 80 px.
- Contenitore 1120 px; margini 16 px su telefono, 32 px da 768 px.
- Sezioni: 48 px sopra/sotto su telefono, 80 px da 768 px.
- Raggio 0 ovunque. Unica eccezione: la finestra dell'intro (24 px, 20 px su telefono),
  che diventa 0 aprendosi.
- Niente ombre. Tratteggio: 4 px pieno, 2 px vuoto (come TechText).

## Home

1. **Hero** (100svh): Pattern Waves a tutto schermo; "Sasha" in alto con TechText
   (h1 vero nascosto accanto al canvas); frase di presentazione in basso a sinistra
   sopra il velo. Header trasparente sopra, senza nome.
2. **Chi sono**: due colonne da 768 px (titolo | testo).
3. **Percorso**: orizzontale da 768 px, verticale su telefono.
4. **Competenze**: due gruppi con legenda (linea piena / tratteggiata).
5. **Progetti**: compare solo quando ce n'è almeno uno.
6. **Contatti**: bottone GitHub.

Pattern Waves vive solo nella hero: quando non è visibile si ferma.

## Sequenza di ingresso (solo home)

1. Finestra arrotondata 42% × 58% (telefono 76% × 52%) con Pattern Waves
   ingrandito a 1.35; sotto, LatticeLoader "Loading" con cronometro.
2. Pagina e font caricati (minimo 1,4 s): ✓ bianca, "Ready in X.Xs" (tempo trascorso).
3. Dopo 0,65 s la finestra si apre a tutto schermo in 1,1 s; lo sfondo torna a scala 1.
4. Al 68% dell'apertura entrano header e contenuti (opacità + 18 px dal basso).

Regole: una volta per visita (sessionStorage), salto con clic o tasto, nessuna intro
con "riduci movimento" o senza JavaScript, rete di sicurezza a 8 s.

## Da fare / da evitare

Da fare
- usare pieno/tratteggiato sempre con lo stesso significato;
- usare `.selectable` per ogni elemento interattivo nuovo;
- verificare il contrasto per ogni colore nuovo (meglio: non aggiungerne).

Da evitare
- colori d'accento, gradienti decorativi, ombre, angoli arrotondati;
- altre animazioni automatiche oltre all'intro;
- monospace per paragrafi o etichette decorative senza informazione;
- testi che fanno pensare a esperienze o certificazioni che non esistono.
