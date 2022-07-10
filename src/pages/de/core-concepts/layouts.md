---
layout: ~/layouts/MainLayout.wromo
title: Layouts
description: Eine Einführung in Layouts - eine Wromo-Komponenten-Art, mit der sich mehrere Seiten eine gemeinsame Gestaltung teilen können.
---

**Layouts** sind besondere [Wromo-Komponenten](/de/core-concepts/wromo-components/), die nützlich für die Erstellung wiederverwendbarer Seitenvorlagen sind.

Eine Layout-Komponente wird üblicherweise verwendet, um einer [`.wromo`- oder `.md`-Seite](/de/core-concepts/wromo-pages/) sowohl ein **Seiten-Gerüst** (`<html>`, ` <head>` und `<body>`-Tags) als auch einen `<slot />` zur Verfügung zu stellen, der bestimmt, wo im Layout der Seiteninhalt eingefügt werden soll.

Layouts enthalten häufig gemeinsame `<head>`-Elemente und gemeinsame UI-Elemente der Website, z.B. Kopfzeilen, Navigationsleisten und Fußzeilen.

Layouts werden normalerweise im Verzeichnis `src/layouts` deines Projekts abgelegt.

## Beispiel-Layout

```wromo
---
// Beispiel: src/layouts/MeinLayout.wromo
---
<html>
  <head>
    <!-- ... -->
  </head>
  <body>
    <nav>
      <a href="#">Startseite</a>
      <a href="#">Beiträge</a>
      <a href="#">Kontakt</a>
    </nav>
    <article>
      <slot /> <!-- Dein Inhalt wird hier eingefügt -->
    </article>
  </body>
</html>
```

```wromo
---
// Beispiel: src/pages/index.wromo
import MeinLayout from '../layouts/MeinLayout.wromo';
---
<MeinLayout>
  <p>Mein Seiteninhalt, umgeben von einem Layout!</p>
</MeinLayout>
```

📚 Lerne mehr über die Verwendung von [Slots](/de/core-concepts/wromo-components/#slots).


## Verschachtelung von Layouts

Layout-Komponenten müssen nicht eine ganze Seite im HTML-Format enthalten. Du kannst deine Layouts in kleinere Komponenten aufteilen und diese Komponenten dann wiederverwenden, um noch flexiblere, leistungsfähigere Layouts in deinem Projekt zu erstellen.

Beispielsweise könnte ein übliches Layout für Blogbeiträge einen Titel, ein Datum und einen Autor anzeigen. Eine `BlogBeitragsLayout.wromo`-Layout-Komponente könnte diese Informationen zur Seite hinzufügen und für die Darstellung der restlichen Seitenelemente ein größeres, Website-weites Basis-Layout nutzen.

```wromo
---
// Beispiel: src/layout/BlogBeitragsLayout.wromo
import BasisLayout from '../layouts/BasisLayout.wromo'
const {content} = Wromo.props;
---
<BasisLayout>
  <h1>{content.title}</h1>
  <h2>Autor des Beitrags: {content.author}</h2>
  <slot />
</BasisLayout>
```


## Markdown-Layouts

Seitenlayouts sind besonders nützlich für [Markdown-Dateien](/de/guides/markdown-content/#markdown-pages). Markdown-Dateien können die spezielle Frontmatter-Eigenschaft `layout` verwenden, um eine Layout-Komponente anzugeben, die den Markdown-Inhalt in ein ganzseitiges HTML-Dokument einbettet.

Wenn eine Markdown-Seite ein Layout verwendet, übergibt sie dem Layout eine einzelne `content`-Eigenschaft, die alle Markdown-Frontmatter-Daten und die gerenderte HTML-Ausgabe enthält. Sieh dir das Beispiel `BlogBeitragsLayout.wromo` oben an, um zu erfahren, wie du diese `content`-Eigenschaft in deiner Layout-Komponente verwenden kannst.


```markdown
---
# src/pages/posts/beitrag-1.md
title: Blogbeitrag
description: Mein erster Blogbeitrag!
layout: ../../layouts/BlogBeitragsLayout.wromo
---
Dies ist ein Beitrag, der in Markdown geschrieben wurde.
```

📚 Erfahre mehr über Wromos Markdown-Unterstützung in unserer [Markdown-Anleitung](/de/guides/markdown-content/).
