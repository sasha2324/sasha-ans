# Sito di Sasha

**Cosa fa:** portfolio e blog tecnico in italiano e inglese: presentazione, progetti,
percorso, studio ITS, articoli e contatti, con tema chiaro e scuro. La sezione Progetti legge
da GitHub, al momento della build, i repository pubblici con il topic `portfolio`; i progetti
privati hanno una scheda scritta a mano.

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

Un file `.md` in `src/content/blog/it/` (in inglese: `src/content/blog/en/`, con lo stesso
nome del file italiano se è una traduzione). Il nome diventa l'indirizzo
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
I file che iniziano con `_` vengono ignorati. Finché un articolo non è tradotto, la versione
inglese del sito lo mostra in italiano con l'etichetta «Italian only».

## Aggiungere un progetto

- **Pubblico:** su GitHub dai al repository il topic `portfolio` e una descrizione.
  Compare alla build successiva (un push, oppure «Retry deployment» su Cloudflare).
  Titolo leggibile, categoria, immagine e descrizione inglese vanno in `extras` in
  `src/data/progetti.ts`.
- **Privato:** scrivi la scheda in `privateProjects`, sempre in `src/data/progetti.ts`.

Le immagini delle schede (4:3, almeno 1200 px di larghezza) stanno in `src/assets/progetti/`:
Astro le converte e le ridimensiona da solo.

Se la build su Cloudflare fallisce con «GitHub ha risposto 403», è il limite delle
richieste senza token: aggiungi la variabile `GITHUB_TOKEN` al progetto su Cloudflare
(un token fine-grained senza permessi: legge solo dati pubblici).

## Dove sono le cose

| Cosa | Dove |
|---|---|
| Contatti e percorso | `src/data/profilo.ts` |
| Progetti: dati in più e progetti privati | `src/data/progetti.ts` |
| Progetti pubblici (lettura da GitHub) | `src/data/github.ts` |
| Bozze dei post per X | `.github/workflows/draft-x-posts.yml`, `scripts/x-drafts/` |
| Articoli | `src/content/blog/<lingua>/` |
| Testi dell'interfaccia e della home, nelle due lingue | `src/i18n/ui.ts` |
| Colori dei due temi, font, spazi | `src/styles/tokens.css` (regole in `DESIGN.md`) |

## Bozze dei post per X

Ogni giorno una GitHub Action guarda se nel portfolio c'è un progetto nuovo e per ognuno
apre una issue «Draft post: …» (etichetta `post-x`) con la bozza in inglese. **Non pubblica
su X**: il post lo fai tu a mano. I progetti che hanno già la bozza sono in
`data/annunciati.json`. Prova senza creare niente: `node scripts/x-drafts/main.mjs --dry-run`;
test: `node --test 'scripts/x-drafts/*.test.mjs'`. Dettagli in
`docs/superpowers/specs/2026-11-17-x-post-drafts-design.md`.

## Aggiungere una lingua

Le istruzioni sono in cima a `src/i18n/ui.ts`: si aggiunge la lingua lì e in
`astro.config.mjs`, poi si traducono i testi. Quello che manca resta in italiano.

## Codice di terzi

Sfondo, nome nell'intro, loader, intro e indice degli articoli sono componenti di
[React Bits](https://reactbits.dev) di David Haz, riscritti senza React.
Licenza MIT + Commons Clause: si possono usare come parte di questo sito, ma non
vendere né ridistribuire da soli. Nota di copyright e licenza sono in ogni file.
