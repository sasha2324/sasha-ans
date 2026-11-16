# DESIGN.md — «Vetro»

Sostituisce la direzione «Selezione» (bianco su nero, cornici di selezione, menu
laterale). Riferimento visivo scelto da Sasha: **dilum.dev**, preso come stile e non
copiato (dalla descrizione di Sasha: fondo chiaro con aloni, menu a pillola, pannelli
arrotondati, etichette in monospazio). Cambiato rispetto al riferimento: accento blu
invece dell'arancione, font IBM Plex, effetti di React Bits sul nome e sullo sfondo.

Restano dalla direzione precedente: font IBM Plex, base di spaziatura a 4 px, e i
componenti di **React Bits** (licenza e configurazioni in CLAUDE.md):

| Componente | Cosa fa nel sito |
|---|---|
| Pattern Waves | lo sfondo a onde di puntini, scuri sul chiaro e chiari sullo scuro |
| TechText | il nome «Sasha» nell'intro: lente, tratteggio, puntini, cornice di selezione |
| LatticeLoader + ScrollExpand | la sequenza di ingresso della home |
| LineSidebar | solo l'indice degli articoli (il menu del sito ora è la pillola) |

---

## Idea

Pannelli di vetro chiaro che galleggiano sopra uno sfondo vivo: onde di puntini e aloni
blu ai bordi. Dentro i pannelli tutto è calmo e leggibile. Una regola dà significato
agli elementi:

**Pieno = fatto, tratteggiato = in corso o non ancora.** Vale per il percorso (punto
pieno = fatto, punto con anello = in corso, punto vuoto = obiettivo), per il riquadro
«In arrivo» e per il segnaposto «Codice privato».

## Colori

Un solo colore d'accento: il **blu elettrico**. Tema chiaro di base; tema scuro con il
pulsante nel menu (la scelta resta salvata; senza scelta si segue il sistema).

| Token | Chiaro | Scuro | Ruolo |
|---|---|---|---|
| `--bg` | `#e6ecf2` | `#0b1018` | fondo grigio-azzurro / blu notte |
| `--panel` | `#f4f7fa` | `#141b26` | pannelli, usati al 74% con sfocatura dietro |
| `--panel-strong` | `#ffffff` | `#1a2230` | schede dentro i pannelli, pulsanti chiari |
| `--ink` | `#0f1724` | `#e7edf5` | testo (15.1:1 / 16.2:1) |
| `--muted` | `#4e5a6b` | `#9aa7b8` | testo secondario (≥ 5.9:1 / 7.1:1) |
| `--line` | ink al 10% | ink al 9% | bordi sottili |
| `--accent` | `#2b50f0` | `#4d6bff` | cerchio della freccia, punti, aloni |
| `--accent-text` | `#2445d6` | `#8aa2ff` | accento come testo (6.7:1 / 7.2:1) |
| `--on-accent` | `#ffffff` | `#ffffff` | freccia sul cerchio blu |

Il blu come **testo** usa sempre `--accent-text`, mai `--accent`.

## Tipografia

| Ruolo | Font | Uso |
|---|---|---|
| Titoli | IBM Plex Sans 700, interlinea stretta, tracking negativo | h1–h3, «Ciao! Sono», il nome (TechText) |
| Testo | IBM Plex Sans 400 / 500 / 600 | paragrafi, menu, pulsanti |
| Etichette | IBM Plex Mono 500, maiuscolo, spaziatura 0.1em | «01 // PROGETTI», date, stati, categorie |

Il numero della sezione nelle etichette è in `--accent-text`. Scala ~1.25, base 17 px
su telefono e 18 px da 768 px. Righe di testo al massimo 68ch.

## Forme e profondità

- Pannelli: raggio 32 px (26 px sotto i 512 px), bordo `--line`, ombra leggera, vetro
  (`backdrop-filter: blur(18px)`). Schede dentro i pannelli: raggio 24 px.
- Pulsanti e menu: pillole (raggio 999 px). La freccia sta in un cerchio blu da 38 px.
  Principale: pieno `--ink`. Secondario: `--panel-strong` con bordo.
- Spaziatura base 4 px; contenitore 1120 px; margini 16 px su telefono, 32 da 768 px.
- Aloni: tre sfumature radiali del blu, fisse ai bordi dello schermo.

## Sfondo (tutte le pagine)

Dal basso: fondo → Pattern Waves → aloni → velo del colore di fondo. Sulla home il velo
parte trasparente e sale con lo scorrimento (fino a 0.62 chiaro, 0.7 scuro); sulle altre
pagine è sempre su. Quando lo sfondo sta dietro al testo, le onde scendono a 30 fps.

## Menu (tutte le pagine)

Pillola fissa in alto al centro: iniziale «S» a sinistra, poi le sezioni, poi il
selettore di lingua (IT / EN) e il pulsante del tema. Sotto 54rem le sezioni si
spostano in un pannello che si apre con «Menu». Sulla home si accende la sezione visibile;
nel blog è accesa «Articoli».

## Home

1. **Intro**: etichetta «Studente ITS · Cloud e Cybersecurity», «Ciao! Sono» e il nome con
   TechText (allineato a sinistra), una frase, «Guarda i progetti» e «Leggi il blog»,
   icone LinkedIn e GitHub.
2. **01 Progetti**: schede grandi, immagine 4:3 a sinistra e a destra numero, categoria,
   titolo, descrizione e link. Pubblici da GitHub, privati scritti a mano.
3. **02 Percorso**: le tappe in fila, orizzontali da 54rem e verticali su telefono.
4. **03 Studio ITS**: riquadro tratteggiato «In arrivo».
5. **04 Articoli**: gli ultimi tre articoli.
6. **05 Contatti**: LinkedIn e GitHub, niente modulo. Gli altri profili sono nel footer.

## Blog

- **Elenco** e **tag**: un pannello con il titolo e le schede degli articoli (tutta la
  scheda è il link). In inglese gli articoli non tradotti hanno la pillola «Italian only».
- **Articolo**: un pannello con il testo a 68ch; da 72rem l'indice (LineSidebar) è a
  destra in un piccolo pannello fisso, sotto è un blocco richiudibile.
- Codice: Shiki `min-light` nel tema chiaro, `min-dark` nello scuro.

## Sequenza di ingresso (solo home)

Come prima: finestra arrotondata con Pattern Waves e LatticeLoader sotto; al caricamento
✓ e tempo, poi la finestra si apre a tutto schermo ed entrano menu, pannelli e aloni.
Una volta per visita, salto con clic o tasto, niente intro con «riduci movimento».

## Da fare / da evitare

Da fare
- usare pieno/tratteggiato sempre con lo stesso significato;
- usare `--accent-text` per il blu come testo;
- verificare il contrasto per ogni colore nuovo (meglio: non aggiungerne);
- controllare ogni modifica nei due temi e su telefono.

Da evitare
- altri colori d'accento oltre al blu, gradienti decorativi oltre agli aloni;
- angoli vivi su pannelli e pulsanti;
- altre animazioni automatiche oltre all'intro e allo sfondo;
- monospazio per i paragrafi;
- testi che fanno pensare a esperienze o certificazioni che non esistono.
