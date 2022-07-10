---
layout: ~/layouts/MainLayout.wromo
title: Wromo-Seiten
description: Eine Einführung in Wromo-Seiten - Komponenten die wie vollständige Seiten funktionieren.
---

**Seiten** sind eine spezielle Art der [Wromo-Komponente](/de/core-concepts/wromo-components), die das Routing, das Laden von Daten und das Templating für eine Seite deiner Website erledigt. Du kannst sie dir wie eine einfache Wromo-Komponente vorstellen - jedoch mit erweiterter Zuständigkeit.

Wromo unterstützt Markdown für Content-lastige Seiten, wie Blog-Posts und Dokumentationen. Lies [Markdown-Inhalte](/guides/markdown-content), um mehr über das Schreiben von Seiten mit Markdown zu erfahren.

## Dateibasiertes Routing

Wromo verwendet Seiten für etwas das **dateibasiertes Routing** genannt wird. Jede Datei in deinem `src/pages`-Verzeichnis wird eine Seite deiner Website - unter Verwendung des Dateinamens für die Festlegung der endgültigen Route.

Wromo-Komponenten (`.wromo`) und Markdown-Dateien (`.md`) sind die einzigen Seitenformate, die in Wromo unterstützt werden. Andere Seitentypen (wie z. B. `.jsx`-React-Komponenten) werden nicht unterstützt, aber du kannst andere Formate als UI-Komponenten _innerhalb_ einer `.wromo`-Seite verwenden, um ein vergleichbares Ergebnis zu erhalten.

```
src/pages/index.wromo       -> meinesite.com/
src/pages/about.wromo       -> meinesite.com/about
src/pages/about/index.wromo -> meinesite.com/about
src/pages/about/me.wromo    -> meinesite.com/about/me
src/pages/posts/1.md        -> meinesite.com/posts/1
```

## Seiten-Templating

Alle Wromo-Komponenten geben HTML aus. Wromo-Seiten geben ebenfalls HTML aus, müssen zusätzlich jedoch die besondere Aufgabe erfüllen eine vollständige _Seitenantwort_ zu liefern - einschließlich `<html>...</html>`, `<head>` ([MDN<span class="sr-only">- head</span>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/head)) und `<body>` ([MDN<span class="sr-only">- body</span>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/body)).

`<!doctype html>` ist optional - es wird automatisch hinzugefügt.

```wromo
---
// Beispiel: HTML-Seite Grundgerüst
---
<!doctype html>
<html>
  <head>
    <title>Titel des Dokuments</title>
  </head>
  <body>
    <h1>Hallo, Welt!</h1>
  </body>
</html>
```

## Laden von Daten

Wromo-Seiten können Daten abrufen, die benötigt werden, um deine Seiten zu generieren. Wromo stellt dir zwei verschiedene Werkzeuge dafür zur Verfügung, die dabei helfen: **fetch()** und **top-level await**.

📚 Lies unsere [vollständige Anleitung](/guides/data-fetching) über das Abrufen von Daten, um mehr zu erfahren.

```wromo
---
// Beispiel: Wromo-Komponenten-Skripte, werden ausgeführt während des Build-Prozesses
const response = await fetch('http://beispiel.de/filme.json');
const data = await response.json();
console.log(data);
---
<!-- Ausgabe des Ergebnisses auf der Seite -->
<div>{JSON.stringify(data)}</div>
```

## Eigene 404-Fehlerseite

Um eine eigene allgemeine 404-Fehlerseite zu erhalten, erzeuge eine `404.wromo`-Datei in `/src/pages`. Diese Datei kompiliert zu einer `404.html`-Seite. Die meisten [Veröffentlichungsdienste](/guides/deploy) können diese Seite aufgreifen und verwenden sie entsprechend.

Dieses Verhalten unterscheidet sich von dem standardmäßigen Verhalten beim Kompilieren von `page.wromo` (oder `page/index.wromo`) zu `page/index.html`.
