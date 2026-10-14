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

Bianco su nero, nessun accento. **Solo tema scuro** (scelta di Sasha: niente tema chiaro).

| Token | Valore | Ruolo |
|---|---|---|
| `--bg` | `#000000` | sfondo; deve coincidere con lo sfondo di Pattern Waves |
| `--ink` | `#ffffff` | testo, puntini, bordi pieni, maniglie |
| `--muted` | `#a3a3a3` | testo secondario, bordi tratteggiati |
| `--hairline` | `#333333` | divisori (solo decorativi) |
| `--code-bg` | `#111111` | blocchi di codice |

Contrasto: `--muted` 8.6:1 su nero (anche sotto il velo, che è nero).

## Tipografia

| Ruolo | Font | Uso |
|---|---|---|
| Titoli | IBM Plex Sans Condensed 600 (700 per "Sasha") | h1–h3, titolo TechText, frase della hero |
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

## Sfondo (tutte le pagine)

Pattern Waves è **fisso dietro a tutto il sito** (Background.astro), fino al footer.
Sopra c'è un velo nero (`--bg`) che lo scurisce dietro al testo:

- home: velo trasparente nella prima schermata, sale fino a opacità 0.72 entro il 70%
  dell'altezza dello schermo;
- altre pagine: velo sempre a 0.72.

Risparmio batteria: quando lo sfondo è dietro al testo (velo pieno), l'animazione
scende a 30 fotogrammi al secondo (`maxFps`); nella prima schermata della home è libera.

## Home

1. **Hero** (100svh): "Sasha" grande in alto con TechText (peso 700, fino a 320 px,
   alone nero attorno alle lettere per staccarle dai puntini; h1 vero nascosto accanto
   al canvas). In basso: frase di presentazione e **percorso** in versione compatta
   (orizzontale da 768 px, verticale su telefono). Header trasparente, senza nome.
2. **Chi sono**: due colonne da 768 px (titolo | testo).
3. **Competenze**: due gruppi con legenda (linea piena / tratteggiata).
4. **Progetti**: compare solo quando ce n'è almeno uno.
5. **Contatti**: bottone GitHub.

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
