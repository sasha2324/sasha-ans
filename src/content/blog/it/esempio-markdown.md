---
title: Esempio di articolo in Markdown
description: Promemoria della sintassi Markdown e anteprima di come appare ogni elemento sul sito.
date: 2026-10-13
tags: [markdown, guida]
draft: true
---

Questo articolo resta sempre in bozza: serve solo a vedere come appaiono gli elementi
e a ricordare la sintassi. Ogni sezione mostra il risultato e, sotto, come scriverlo.

## Testo

Un paragrafo normale. Si può scrivere in **grassetto**, in _corsivo_ e con `codice nel testo`.
Un [link](https://docs.astro.build/) si scrive tra parentesi quadre e tonde.

```markdown
Testo in **grassetto**, in _corsivo_, `codice` e un [link](https://esempio.it).
```

## Titoli

I titoli con `##` compaiono nell'indice a sinistra. Quelli con `###` no.

### Un sottotitolo

```markdown
## Titolo di sezione (va nell'indice)
### Sottotitolo
```

## Elenchi

- Un elemento
- Un altro elemento
  - Un elemento annidato

1. Primo passo
2. Secondo passo
3. Terzo passo

```markdown
- Elemento
  - Annidato (due spazi prima del trattino)

1. Primo passo
2. Secondo passo
```

## Codice

Per un blocco di codice si scrivono tre apici inversi seguiti dal linguaggio:

```bash
# Aggiorna i pacchetti su Debian o Ubuntu
sudo apt update && sudo apt upgrade
ip addr show
```

```yaml
# Un file di configurazione
server:
  porta: 8080
  log: true
```

## Citazioni

> Una citazione si scrive iniziando la riga con il segno di maggiore.

```markdown
> Testo della citazione
```

## Tabelle

| Comando | Cosa fa |
| --- | --- |
| `ls` | elenca i file |
| `cd` | cambia cartella |
| `pwd` | mostra la cartella attuale |

```markdown
| Colonna 1 | Colonna 2 |
| --- | --- |
| valore | valore |
```

## Separatore e immagini

Tre trattini su una riga disegnano una linea di separazione:

---

Le immagini vanno in `public/immagini/` e si inseriscono così:

```markdown
![Descrizione dell'immagine per chi non la vede](/immagini/nome-file.png)
```
