---
title: Come ho costruito questo sito
description: Un sito statico con Astro, scritto insieme a Claude Code e pubblicato gratis su Cloudflare Pages. Le scelte che ho fatto e perché.
date: 2026-10-15
tags: [astro, cloudflare, claude-code]
draft: true
---

## Cosa volevo

Ho deciso di creare questo sito perché era parecchio tempo che stavo fermo e non facevo nulla di pratico. Mi è venuta l'idea di un sito dedicato a me, e da lì è nata l'idea di farlo diventare una specie di curriculum: una pagina che parla di me, dei miei interessi, dei miei progetti e delle cose che so fare.

È la mia scheda delle cose che so fare. In futuro potrei usarlo come curriculum, per le aziende o per l'ITS. E magari può interessare anche agli amici, o a chiunque voglia vedere il mio percorso.

## Perché un sito statico

Non sapevo cosa fosse un sito statico: l'ho scoperto facendo questo. In pratica è fatto solo di file già pronti (HTML, CSS e JavaScript), senza un server che esegue codice e senza un database.

Mi ha convinto il fatto che è gratis e semplice da fare.

## Gli strumenti

- **Astro** genera le pagine al momento della build.
- **Markdown** per gli articoli: ogni articolo è un file di testo nella cartella del blog.
- **Git e GitHub** tengono la storia di ogni modifica.
- **Cloudflare Pages** pubblica il sito a ogni push, gratis.

GitHub e Cloudflare li conoscevo già, perché ci avevo lavorato in passato. Per ora non ho trovato grandi difficoltà a mettere insieme tutto.

## Lavorare con Claude Code

Lavorare con Claude Code mi piace molto. Non è la prima volta che lo uso: rende tutto molto più semplice e aiuta davvero tanto. L'importante è spiegare bene cosa vuoi.

È normale che qualcosa non funzioni, o che non venga proprio come lo volevi. Basta tornarci sopra, rispiegarlo o spiegarlo meglio, e alla fine funziona tutto.

Piano piano, lavorando con Claude Code, imparo anche io a fare delle cose: per esempio come far girare un sito su Cloudflare. Da solo sicuramente non sarei riuscito a fare tutto questo, ed è anche per questo che mi piace: semplifica tantissimo il lavoro e permette di fare moltissime cose.

## Il design

La cosa che mi è rimasta più impressa è quanto ho migliorato il design. L'ho costruito io partendo da componenti già pronti di React Bits, un sito che ne ha tantissimi: li ho montati come un lego, come piaceva a me. Secondo me è venuto abbastanza bene.

Lo sfondo a puntini, il titolo e il menu vengono da lì, riscritti senza React. Una regola tiene insieme tutto: pieno vuol dire fatto, tratteggiato vuol dire in corso.

## Sicurezza prima di pubblicare

Prima di rendere pubblico il codice, con l'aiuto di Claude Code, ho controllato che non ci fossero chiavi, token o dati personali, anche nella cronologia di git. Ho sostituito la mia email nei commit con l'indirizzo anonimo di GitHub.
