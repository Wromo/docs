---
layout: ~/layouts/MainLayout.wromo
title: Routing
description: Einführung in das Routing in Wromo.
---

Wromo verwendet **Datei-basiertes Routing**, um während des Build-Prozesses - entsprechend der Datei-Struktur im `src/pages`-Verzeichnis deines Projekts - die gültigen Routen und URL festzulegen. Wenn eine Datei zum `src/pages`-Verzeichnis deines Projekts hinzugefügt wird, ist sie basierend auf ihrem Dateinmanen automatisch über die entsprechende Route mit der entsprechenden URL erreichbar.

## Statische Routen

Wromo-Komponenten (`.wromo`) und Markdown-Dateien (`.md`) im `src/pages`-Verzeichnis werden zu Seiten deiner Website. Die Route zu jeder Seite wird zusammengesetzt aus den Dateinamen und dem Pfad zu den Dateien innerhalb des `src/pages`-Verzeichnisses. Das bedeutet, dass in einem Wromo-Projekt keine separate Routing-Konfiguration verwaltet werden muss.

```bash
# Beispiel: Statische Routen
src/pages/index.wromo        -> meinesite.com/
src/pages/about.wromo        -> meinesite.com/about
src/pages/about/index.wromo  -> meinesite.com/about
src/pages/about/me.wromo     -> meinesite.com/about/me
src/pages/posts/1.md         -> meinesite.com/posts/1
```

## Dynamische Routen

Manchmal musst du zu einer einzelnen Page-Komponente mehrere URLs generieren. Wromo verwendet Datei-basiertes Routing, um **dynamische Routing-Parameter** zu unterstützen, so dass eine Seite - basierend auf einem Filter - zu verschiedenen dynamischen Routen passt.

Es ist wichtig dabei zu beachten, dass Wromo statische Seiten generiert. Es gibt keinen Wromo-Server, der die Seiten auf Anfrage generiert und ausliefert. Dies bedeutet, dass jede Seite vorab erzeugt werden muss. Seiten die dynamische Routen verwenden, müssen daher eine `getStaticPaths()`-Funktion exportieren, die Wromo genau vorgibt, welche Seiten generiert werden müssen. Du erfährst mehr darüber in der vollständigen [API-Referenz](/reference/api-reference#getstaticpaths).

### Benannte Parameter

Dynamische Parameter werden im Dateinamen unter Verwendung der `[Klammer]`-Schreibweise kodiert:

- `pages/blog/[slug].wromo` → `/blog/:slug` (`/blog/hallo-welt`, `/blog/post-2` etc.)
- `pages/[username]/einstellungen.wromo` → (`/fred/einstellungen`, `/drew/einstellungen` etc.)
- `pages/[lang]-[version]/info.wromo` → (`/en-v1/info`, `/fr-v2/info` etc.)

#### Beispiel: Benannte Parameter

Angenommen du hast eine Seite `pages/post/[pid].wromo`:

```wromo
---
// Beispiel: src/pages/post/[pid].wromo
const {pid} = Wromo.params;
---
<p>Post: {pid}</p>
```

Allen Routen mit z. B. `/post/1`, `/post/abc` etc. werden `pages/post/[pid].wromo` entsprechen. Jeder passende Pfad-Parameter wird an die Page-Komponente unter `Wromo.params` weitergegeben.

Zum Beispiel wird die Route `/post/abc` das folgende `Wromo.params`-Objekt zur Verfügung halten:

```json
{ "pid": "abc" }
```

Es können mehrere dynamische Routen-Abschnitte kombiniert werden, und sie funktionieren in der gleichen Weise. Die Seite `pages/post/[pid]/[kommentar].wromo` wird der Route `/post/abc/ein-kommentar` entsprechen, und ihr `query`-Objekt wird entsprechend lauten:

```json
{ "pid": "abc", "kommentar": "ein-kommentar" }
```

### Rest-Parameter

Falls du beim URL-Routing mehr Flexibilität benötigst, kannst du den Rest-Parameter als universalen Fänger verwenden. Dies erreichst du, indem du in den eckigen Klammern deinem Parameter drei Punkte (`...`) voranstellst. Zum Beispiel:

- `pages/post/[...slug].wromo` → (`/post/a`, `/post/a/b`, `/post/a/b/c`, etc.)

Passende Parameter werden als `query`-Parameter (`slug` in diesem Beispiel) an die Seite übergeben. Dem obigen Beispiel folgend heißt das dem Pfad `post/a/b/c` entsprechende `query`-Objekt:

```json
{ "slug": "a/b/c" }
```

Du kannst auch andere Benennungen als `slug` verwenden, z. B.: `[...param]` oder `[...name]`.

Rest-Parameter sind standardmäßig optional, `pages/post/[...slug]` würde also auch `/post/` entsprechen.

#### Beispiel: Rest-Parameter

Für ein `real-world`-Beispiel würdest du den `Github File Viewer` folgendermaßen implementieren:

```
/[org]/[repo]/tree/[branch]/[...file]
```

In diesem Beispiel würde eine Abfrage von `/Wromo/wromo/tree/main/docs/public/favicon.svg` folgende Parameter für die Seite verfügbar machen:

```js
{
	org: 'Wromo',
	repo: 'wromo',
	branch: 'main',
	file: 'docs/public/favicon.svg'
}
```

## Warnungen

- Statische Routen ohne Pfad-Parameter haben stets Vorrang vor allen anderen Routen, und Routen mit benannten Pfad-Parametern haben Vorrang vor Routen mit Rest-Parametern. Schau dir folgende Beispiele an:
  - `pages/post/create.wromo` - wird `/post/create` entsprechen
  - `pages/post/[pid].wromo` - wird `/post/1`, `/post/abc` etc. entsprechen, aber nicht `/post/create`
  - `pages/post/[...slug].wromo` - wird `/post/1/2`, `/post/a/b/c` etc. entsprechen, aber nicht `/post/create`, `/post/abc`
