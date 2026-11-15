# Sito di Sasha

**Cosa fa:** portfolio e blog tecnico: presentazione, percorso, competenze, progetti e articoli.
La sezione Progetti legge da GitHub, al momento della build, i repository pubblici con il
topic `portfolio`. I progetti privati hanno invece una scheda scritta a mano.

**Con cosa è fatto:** [Astro](https://astro.build), sito statico senza database; articoli in
Markdown; pubblicato su Cloudflare Pages, che lo ricostruisce a ogni push su GitHub.

**Stato:** online su <https://sasha-ans.pages.dev>, cresce con gli articoli nuovi.

## Avviarlo

Serve Node.js 22.12 o più recente (la versione usata è in `.node-version`).

```
npm install        # la prima volta
npm run dev        # sito in prova su http://localhost:4321, si aggiorna mentre scrivi
npm run build      # costruisce il sito finale in dist/ (serve internet: legge GitHub)
npm run preview    # mostra dist/ come sarà online
```

Per pubblicare basta `git push`: Cloudflare ricostruisce il sito in un paio di minuti.
Se la build fallisce (anche quando GitHub non risponde), resta online la versione precedente.

## Aggiungere un articolo

Un file `.md` in `src/content/blog/it/`: il nome diventa l'indirizzo
(`il-mio-articolo.md` → `/blog/il-mio-articolo/`, minuscole e trattini). In cima:

```
---
title: Titolo dell'articolo
description: Una o due frasi: compaiono nell'elenco e nei risultati di ricerca.
date: 2026-10-14
tags: [linux, reti]
draft: true
---
```

Con `draft: true` si vede solo con `npm run dev`; quando è pronto, `draft: false`.
Dopo la pubblicazione, per le modifiche aggiungi `updated: 2026-11-02`. I titoli `##`
formano l'indice laterale; `esempio-markdown.md` è un promemoria della sintassi.
I file che iniziano con `_` vengono ignorati.

## Aggiungere un progetto

- **Pubblico:** su GitHub dai al repository il topic `portfolio` e una descrizione.
  Compare alla build successiva (un push, oppure «Retry deployment» su Cloudflare).
- **Privato:** scrivi la scheda in `src/data/it/progetti.ts`.

Se la build su Cloudflare fallisce con «GitHub ha risposto 403», è il limite delle
richieste senza token: aggiungi la variabile `GITHUB_TOKEN` al progetto su Cloudflare
(un token fine-grained senza permessi: legge solo dati pubblici).

## Dove sono le cose

| Cosa | Dove |
|---|---|
| Testi della home (presentazione, percorso, competenze, contatti) | `src/data/it/profilo.ts` |
| Progetti pubblici (lettura da GitHub) | `src/data/github.ts` |
| Progetti privati | `src/data/it/progetti.ts` |
| Articoli | `src/content/blog/it/` |
| Testi dell'interfaccia (menu, bottoni) | `src/i18n/ui.ts` |
| Colori, font, spazi | `src/styles/tokens.css` (regole in `DESIGN.md`) |

## Codice di terzi

Sfondo, titolo, loader, intro e menu sono componenti di
[React Bits](https://reactbits.dev) di David Haz, riscritti senza React.
Licenza MIT + Commons Clause: si possono usare come parte di questo sito, ma non
vendere né ridistribuire da soli. Nota di copyright e licenza sono in ogni file.
