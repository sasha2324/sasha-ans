---
title: Come ho costruito questo sito
description: Un sito statico con Astro, scritto insieme a Claude Code e pubblicato gratis su Cloudflare Pages. Le scelte che ho fatto e perché.
date: 2026-10-14
tags: [astro, cloudflare, claude-code]
draft: true
---

<!-- BOZZA: struttura e prime frasi. Riscrivi con parole tue, togli quello che non senti tuo. -->

## Cosa volevo

Volevo un posto mio dove mostrare il percorso verso il cloud e la sicurezza, senza un CMS da aggiornare e senza costi. Poche pagine, veloci da caricare anche sul telefono.

_Scrivi qui: perché un sito tuo e non solo un profilo LinkedIn o GitHub._

## Perché un sito statico

Un sito statico è fatto solo di file HTML, CSS e JavaScript già pronti: non c'è un server che esegue codice né un database da proteggere. Meno parti in movimento vuol dire meno cose che si possono rompere o attaccare.

_Scrivi qui: cosa hai capito della differenza tra sito statico e dinamico._

## Gli strumenti

- **Astro** genera le pagine al momento della build.
- **Markdown** per gli articoli: ogni articolo è un file di testo nella cartella del blog.
- **Git e GitHub** tengono la storia di ogni modifica.
- **Cloudflare Pages** pubblica il sito a ogni push, gratis.

_Scrivi qui: quale strumento ti ha sorpreso di più._

## Lavorare con Claude Code

Ho costruito il sito insieme a Claude Code: io decidevo cosa volevo e controllavo il risultato, lui scriveva il codice e mi spiegava le scelte. Abbiamo lavorato a piccoli passi, con un commit per ogni passo.

_Scrivi qui: cosa ha funzionato, cosa hai dovuto correggere, cosa hai imparato guardandolo lavorare._

## Il design

Lo sfondo a puntini, il titolo e il menu vengono da componenti di React Bits, riscritti senza React. Una regola tiene insieme tutto: pieno vuol dire fatto, tratteggiato vuol dire in corso.

_Scrivi qui: perché hai scelto questo stile._

## Sicurezza prima di pubblicare

Prima di rendere pubblico il codice ho controllato che non ci fossero chiavi, token o dati personali, anche nella cronologia di git. Ho sostituito la mia email nei commit con l'indirizzo anonimo di GitHub.

_Scrivi qui: cosa hai controllato e perché è importante anche per un sito piccolo._

## Cosa farei diversamente

_Scrivi qui._
