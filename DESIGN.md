# DESIGN.md — «Topologia»

Riferimento di partenza: DESIGN.md di **Together AI** dalla raccolta
[VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md/tree/main/design-md/together.ai).

Cosa si tiene: alternanza netta tra fasce scure e chiare, precisione tecnica,
base di spaziatura a 4 px, raggio piccolo (4 px) e bordi sottili al posto delle ombre,
titoli in sentence case.

Cosa cambia: niente gradiente arancio-magenta-pervinca (è il loro marchio),
niente font proprietari, niente etichette maiuscole in monospace sopra ogni sezione,
niente bottone nero a pillola. Il tono decorativo viene da uno schema di rete.

---

## Idea

Il sito di chi sta *imparando* a gestire infrastrutture. La pagina parla con il
linguaggio di uno schema tecnico: nodi, collegamenti, stati. Lo schema serve a
dire la verità sul percorso: ciò che è fatto è pieno, ciò che deve ancora
succedere è tratteggiato.

Un solo elemento forte per pagina: nella home è lo **schema del percorso**.
Tutto il resto resta sobrio.

## Colori

Ogni colore ha un ruolo. Non si aggiungono accenti nuovi.

| Token | Chiaro | Scuro | Ruolo |
|---|---|---|---|
| `--bg` | `#F2F5F9` | `#0F1C2C` | sfondo pagina (carta da schema / notte) |
| `--surface` | `#FFFFFF` | `#162638` | riquadri, blocchi di codice in chiaro |
| `--ink` | `#13243A` | `#E6ECF3` | testo principale, nodi pieni |
| `--muted` | `#4F5F73` | `#9DACBF` | testo secondario, date, didascalie |
| `--line` | `#1F5BBF` | `#6FA0F0` | link, collegamenti dello schema, focus |
| `--progress` | `#9C6410` | `#E8B04F` | stato "sto imparando / in corso" |
| `--hairline` | `#C9D3DF` | `#2A3C52` | bordi sottili e divisori (solo decorativo) |

Contrasti verificati (WCAG): testo e `--line` ≥ 4.5:1 su `--bg` e `--surface`
in entrambi i temi; `--progress` ≥ 4.5:1 su `--bg`.

La fascia del percorso nella home usa sempre i valori del tema scuro, anche
quando la pagina è chiara: è l'alternanza chiaro/scuro presa da Together AI.

## Tipografia

Tre tagli della stessa famiglia, **IBM Plex**: è nata per contesti tecnici,
è open source e copre latino e cirillico.

| Ruolo | Font | Uso |
|---|---|---|
| Titoli | IBM Plex Sans Condensed 600 | h1–h3, nome nel header |
| Testo | IBM Plex Sans 400 / 500 | paragrafi, navigazione, bottoni |
| Schema | IBM Plex Mono 400 | **solo** etichette dei nodi e codice negli articoli |

Nota: IBM Plex Sans Condensed non ha il cirillico. Se un titolo contiene
cirillico, quelle lettere usano IBM Plex Sans (impostato come riserva in `--font-display`).

Scala (rapporto ~1.25, base 18 px su desktop, 17 px su telefono):

| Token | Dimensione | Interlinea | Spaziatura lettere |
|---|---|---|---|
| `--step-4` | clamp(2.25rem, 5vw, 3.5rem) | 1.1 | -0.02em |
| `--step-3` | clamp(1.75rem, 3.5vw, 2.5rem) | 1.15 | -0.015em |
| `--step-2` | 1.5rem | 1.25 | -0.01em |
| `--step-1` | 1.2rem | 1.4 | 0 |
| `--step-0` | 1rem (testo) | 1.6 | 0 |
| `--step--1` | 0.875rem | 1.5 | 0 |

Righe di testo al massimo ~68 caratteri (`max-width: 68ch`).

Regole:
- sentence case ovunque, niente titoli tutto maiuscolo;
- niente etichetta sopra ogni titolo;
- non evidenziare una sola parola del titolo con colore o corsivo;
- il monospace non si usa per paragrafi né per piccole etichette decorative.

## Spaziatura e griglia

Base 4 px. Token: `4 8 12 16 24 32 48 80` px (`--space-1` … `--space-8`).

- Contenitore massimo 1120 px; margini laterali 16 px su telefono, 32 px da 768 px in su.
- Sezioni della home: 80 px sopra e sotto su desktop, 48 px su telefono.
- Testo allineato a sinistra, sempre. Niente blocchi centrati.
- Competenze: due colonne affiancate da 768 px in su, una sotto l'altra su telefono.

## Forme e profondità

- Raggio: `0` per le fasce a tutta larghezza, `4px` per bottoni, tag, blocchi di codice.
- Niente ombre. La separazione viene da bordi `1px solid var(--hairline)` e
  dal cambio di fascia chiaro/scuro.

## Componenti chiave

### Schema del percorso (elemento firma)
- SVG in linea, orizzontale su desktop, **verticale su telefono** (non si rimpicciolisce: si gira).
- Nodo fatto: cerchio pieno `--ink` (su fascia scura: `#E6ECF3`), collegamento continuo.
- Nodo in corso: cerchio con bordo `--progress` e centro pieno piccolo.
- Nodo futuro: cerchio vuoto, collegamento tratteggiato `stroke-dasharray: 4 6`.
- Ogni nodo ha etichetta testuale vera (non solo colore): lo stato si capisce anche senza vedere i colori.
- Un'unica animazione nel sito: al caricamento il tratto continuo si disegna fino al nodo "in corso".
  Disattivata con `prefers-reduced-motion: reduce`.

### Competenze
- Due liste con titolo chiaro: **"So usare"** e **"Sto imparando"**.
- Marcatore a sinistra: barra piena `--ink` per la prima lista, barra `--progress` per la seconda.
- Nessuna barra di percentuale o "livello": non misurano niente di vero.

### Link e bottoni
- Link: `--line`, sottolineati nel testo degli articoli; il focus da tastiera è un contorno 2 px `--line` con 2 px di distanza.
- Bottone: rettangolo con raggio 4 px, bordo 1 px `--ink`, testo `--ink`; al passaggio si riempie. Altezza minima 44 px.
- Il testo dei link dice dove porta ("Leggi l'articolo", "Profilo GitHub"), senza frecce aggiunte.

### Tag
- Testo `--step--1`, bordo `1px --hairline`, raggio 4 px, preceduti da `#` solo nella pagina del tag.

### Articolo
- Colonna unica da 68ch; titolo `--step-4`, data e tempo di lettura in `--muted` sotto.
- Blocchi di codice su `--surface` (chiaro) / `#0B1622` (scuro), font Plex Mono, scorrimento orizzontale se lunghi.

### Header e footer
- Header: nome a sinistra, "Blog" e interruttore tema a destra. Su telefono resta su una riga, senza menu a scomparsa.
- Footer: link GitHub, feed RSS, anno. Nessun dato personale oltre a quelli forniti.

## Da fare / da evitare

Da fare
- far capire a colpo d'occhio cosa è fatto e cosa è in corso;
- tenere lo schema come unico elemento decorativo;
- verificare il contrasto per ogni colore nuovo.

Da evitare
- gradienti, ombre morbide, card arrotondate tutte uguali;
- numeri 01/02/03 su contenuti che non sono una sequenza (il percorso sì, le competenze no);
- testi che fanno pensare a esperienze o certificazioni che non esistono.
