# Sito di Sasha

Portfolio e blog tecnico. Sito statico fatto con [Astro](https://astro.build):
niente database, solo file. Pubblicato su Cloudflare Pages, che lo ricostruisce
da solo a ogni push su GitHub.

## Lavorare in locale

Serve Node.js 22.12 o più recente (la versione usata è in `.node-version`).

```
npm install        # la prima volta
npm run dev        # sito in prova su http://localhost:4321, si aggiorna mentre scrivi
npm run build      # costruisce il sito finale nella cartella dist/
npm run preview    # mostra dist/ come sarà online
```

## Aggiungere un articolo

1. Crea un file `.md` in `src/content/blog/it/`. Il nome del file diventa
   l'indirizzo: `il-mio-articolo.md` → `/blog/il-mio-articolo/`.
   Usa lettere minuscole e trattini, niente spazi né accenti.
2. In cima al file metti l'intestazione:

   ```
   ---
   title: Titolo dell'articolo
   description: Una o due frasi: compaiono nell'elenco e nei risultati di ricerca.
   date: 2026-10-14
   tags: [linux, reti]
   draft: true
   ---
   ```

3. Sotto scrivi il testo in Markdown. I titoli `##` formano l'indice laterale.
   In `esempio-markdown.md` c'è un promemoria della sintassi.
4. Con `draft: true` l'articolo si vede solo con `npm run dev` (con l'etichetta
   «Bozza»). Quando è pronto, cambia in `draft: false`.
5. Se lo modifichi dopo la pubblicazione, aggiungi `updated: 2026-11-02`.

Un file che inizia con `_` (per esempio `_idee.md`) viene ignorato.

## Pubblicare

```
npm run build                      # controlla che non ci siano errori
git add -A
git commit -m "Pubblica l'articolo su ..."
git push
```

Dopo il push Cloudflare Pages ricostruisce il sito in un paio di minuti.
Lo stato della build si vede nella dashboard di Cloudflare (Workers & Pages →
il progetto → Deployments). Se la build fallisce, il sito resta alla versione
precedente: niente va offline.

## Dove sono le cose

| Cosa | Dove |
|---|---|
| Testi della home (presentazione, percorso, competenze, contatti) | `src/data/it/profilo.ts` |
| Progetti | `src/data/it/progetti.ts` |
| Articoli | `src/content/blog/it/` |
| Testi dell'interfaccia (menu, bottoni) | `src/i18n/ui.ts` |
| Colori, font, spazi | `src/styles/tokens.css` (regole in `DESIGN.md`) |

## Codice di terzi

Sfondo, titolo, loader, intro e menu sono componenti di
[React Bits](https://reactbits.dev) di David Haz, riscritti senza React.
Licenza MIT + Commons Clause: si possono usare come parte di questo sito, ma non
vendere né ridistribuire da soli. Nota di copyright e licenza sono in ogni file.
