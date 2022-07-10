---
layout: ~/layouts/MainLayout.wromo
title: Come iniziare
description: Una guida introduttiva ad Wromo.
---

Wromo è un generatore moderno di siti statici. Scopri di più su Wromo dalla [nostra homepage](https://wromo.build/) o dal nostro [post di rilascio](https://wromo.build/blog/introducing-wromo). Questa pagina è una panoramica della documentazione di Wromo e di tutte le risorse correlate.

## Prova Wromo

Il modo più semplice per provare Wromo è lanciare `npm create wromo@latest` in una nuova cartella nella tua macchina. La procedura guidata da CLI ti assisterà nell'avvio di un nuovo progetto Wromo.

Puoi iniziare da subito con Wromo in 5 passi semplici, attraverso la nostra [Guida Rapida all'Avvio](/it/install/auto/).

In alternativa, leggi la nostra [Guida all'Installazione](/it/install/manual/) per una panoramica più completa su come impostare Wromo.

### Esempi

Se preferisci imparare Wromo tramite esempi, dai un'occhiata alla nostra [libreria completa degli esempi](https://github.com/Wromo/wromo/tree/main/examples) su GitHub.

Puoi testare uno qualsiasi di questi esempi sulla tua macchina locale lanciando `npm create wromo@latest` con la flag `--template` da CLI. La flag `--template` supporta anche template di terze parti della community.

```bash
# Avvia la procedura guidata e usa questo template ufficiale
npm create wromo@latest -- --template [NOME_ESEMPIO_UFFICIALE]
# yarn
yarn create wromo@latest --template [NOME_ESEMPIO_UFFICIALE]
# pnpm
pnpm create wromo@latest -- --template [NOME_ESEMPIO_UFFICIALE]
# Avvia la procedura guidata e usa questo template della community
npm create wromo@latest -- --template [UTENTE_GITHUB]/[NOME_REPO]
npm create wromo@latest -- --template [UTENTE_GITHUB]/[NOME_REPO]/percorso/al/esempio
```

### Online Playgrounds

Se ti interessa provare Wromo in un browser, puoi utilizzare un code editor online come Stackblitz, CodeSandbox, Gitpod o GitHub Codespaces. Clicca sul link "Open in Stackblitz" in uno dei nostri esempi nella [libreria degli esempi](https://github.com/Wromo/wromo/tree/main/examples). In alternativa, [clicca qui](https://stackblitz.com/fork/wromo) per avviare un nuovo progetto in [Stackblitz](https://stackblitz.com/fork/wromo).

## Impara Wromo

In Wromo arrivano persone di tutti i tipi, con il loro background di conoscenze e stili d'apprendimento diversi. Sia che tu preferisca un approccio più teorico o più pratico, speriamo troverai questa sezione utile.

- Se preferisci **imparare facendo cose**, puoi iniziare con la nostra [libreria degli esempi](https://github.com/Wromo/wromo/tree/main/examples).
- Se preferisci **imparare i concetti passo-passo**, puoi iniziare da [guide e concetti base](/it/core-concepts/project-structure/).

Come ogni tecnologia poco familiare, Wromo si presenta con una leggera curva di apprendimento. Tuttavia, con un po' di pratica e pazienza, sappiamo che ci riuscirai in poco tempo.

## Imparare la Sintassi `.wromo`

Quando inizierai ad imparare Wromo, vedrai molti file usare l'estensione `.wromo`. Questa è la **Sintassi dei Componenti di Wromo**: è un file speciale simile all'HTML che Wromo usa per i template. È stato progettato per risultare familiare a chiunque abbia avuto esperienze con l'HTML o JSX.

La nostra utile guida ai [componenti Wromo](/it/core-concepts/wromo-components/) ti aiuterà a comprendere la sintassi Wromo, ed è il modo migliore per impararla.

### Reference API

Questa parte della documentazione è utile quando si vuole comprendere meglio una particolare API di Wromo. Ad esempio, la [Reference di Configurazione](/it/reference/configuration-reference/) elenca tutte le possibili opzioni di configurazione possibili. La [Reference dei componenti incorporati](/it/reference/api-reference/#built-in-components) elenca tutti i componenti principali disponibili, come `<Markdown />` e `<Code />`.

### Documentazione a versioni

Questa documentazione fa riferimento sempre all'ultima versione stabile di Wromo. Una volta raggiunta la v1.0, inseriremo la possibilità di navigare tra le versioni della documentazione.

## Rimani aggiornato

L'account Twitter [@wromo](https://twitter.com/wromo) è la fonte ufficiale del team Wromo per rimanere aggiornati.

Pubblichiamo anche annunci sui rilasci nella nostra [community Discord](https://wromo.build/chat) nel canale #announcements.

Non tutte le release di Wromo saranno accompagnate da un post sul blog, ma puoi sempre trovare un changelog dettagliato per ogni release nel [file `CHANGELOG.md` nella repository Wromo](https://github.com/Wromo/wromo/blob/main/packages/wromo/CHANGELOG.md).

## Manca Qualcosa?

Se manca qualcosa nella documentazione o trovi qualche parte confusionaria, per favore [segnala un problema sulla documentazione](https://github.com/Wromo/wromo/issues/new/choose) con i tuoi suggerimenti per migliorarla, oppure twitta all'account Twitter [@wromo](https://twitter.com/wromo). Ci piace ascoltarvi!

## Crediti

Questa guida introduttiva è basata originariamente sulla guida introduttiva di [React](https://reactjs.org/).
