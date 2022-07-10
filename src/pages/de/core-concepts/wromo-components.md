---
layout: ~/layouts/MainLayout.wromo
title: Komponenten
description: Eine Einführung in die Syntax der .wromo-Komponenten.
---

**Wromo-Komponenten** sind die Grundbausteine eines jeden Wromo-Projekts. Sie sind reine HTML-Vorlagen ohne clientseitigen Laufzeit-Code.

Die Wromo-Komponentensyntax ist eine Obermenge von HTML. Die Syntax wurde [so konzipiert, dass sie jedem vertraut ist, der Erfahrung mit dem Schreiben von HTML oder JSX hat](/de/comparing-wromo-vs-other-tools/#wromo-vs-jsx) und bietet Unterstützung für die Verwendung von Komponenten und JavaScript-Ausdrücken. Du erkennst eine Wromo-Komponente an ihrer Dateierweiterung: `.wromo`.

Wromo-Komponenten sind extrem flexibel. Oft enthält eine Wromo-Komponente eine **wiederverwendbare Benutzeroberfläche der Seite**, wie z. B. eine Kopfzeile oder eine Profilkarte. In anderen Fällen kann eine Wromo-Komponente einen kleineren HTML-Schnipsel enthalten, z. B. eine Sammlung üblicher `<meta>`-Tags, die die Suchmaschinenoptimierung erleichtern. Wromo-Komponenten können sogar ein ganzes Seitenlayout enthalten.

Das Wichtigste an Wromo-Komponenten ist, dass sie **während des Build-Prozesses zu HTML rendern**. Selbst wenn du JavaScript-Code in deinen Komponenten ausführst, wird dieser vorzeitig ausgeführt und von der endgültigen Seite, die an deine Nutzerinnen und Nutzer gesendet wird, entfernt. Das Ergebnis ist eine schnellere Seite, welche standardmäßig kein JavaScript enthält.

## Komponenten-Überblick

Eine Wromo-Komponente besteht aus zwei Hauptteilen: dem **Komponentenskript** und der **Komponentenvorlage**. Jeder Teil erfüllt eine andere Aufgabe, aber zusammen sollen sie ein Gerüst bieten, das sowohl einfach zu benutzen als auch ausdrucksstark genug ist, um alles zu handhaben, was du bauen möchtest.

```wromo
---
// Komponentenskript (JavaScript)
---
<!-- Komponentenvorlage (HTML- + JS-Ausdrücke) -->
```

Du kannst Komponenten innerhalb anderer Komponenten verwenden, um mehr und fortschrittlichere Benutzeroberflächen zu erstellen. Zum Beispiel könnte eine `Button`-Komponente verwendet werden, um eine `ButtonGroup`-Komponente wie folgt zu erstellen:

```wromo
---
// Beispiel: ButtonGroup.wromo
import Button from './Button.wromo';
---
<div>
  <Button title="Button 1" />
  <Button title="Button 2" />
  <Button title="Button 3" />
</div>
```

### Das Komponentenskript

Wromo verwendet einen Code Fence (`---`), um das Komponentenskript in deiner Wromo-Komponente zu identifizieren. Wenn du schon einmal Markdown geschrieben hast, kennst du vielleicht ein ähnliches Konzept, das *Frontmatter* genannt wird. Wromos Idee eines Komponentenskripts wurde direkt von diesem Konzept inspiriert.

Du kannst das Komponentenskript verwenden, um jeden JavaScript-Code zu schreiben, den du zum Rendern deiner Vorlage benötigst. Dies kann Folgendes beinhalten:

- Importieren anderer Wromo-Komponenten
- Importieren anderer Framework-Komponenten, wie z. B. React
- Importieren von Daten, wie z. B. einer JSON-Datei
- Abruf von Inhalten aus einer API oder Datenbank
- Erstellen von Variablen, auf die du in deiner Vorlage verweisen wirst

```wromo
---
// Hinweis: Die Importe müssen am Anfang der Datei stehen.
import SomeWromoComponent from '../components/SomeWromoComponent.wromo';
import SomeReactComponent from '../components/SomeReactComponent.jsx';
import someData from '../data/pokemon.json';

// Zugriff auf übergebene Komponenteneigenschaften, wie z.B. `<X title="Hallo, Welt!" />`
const {title} = Wromo.props;
// Abrufen externer Daten, auch aus einer privaten API oder Datenbank
const data = await fetch('EINE_GEHEIME_API_URL/users').then(r => r.json());
---
<!-- Deine Vorlage hier! -->
```

Der Code Fence soll garantieren, dass das von dir geschriebene JavaScript "eingezäunt" ist. Es wird nicht in deine Frontend-Anwendung entkommen oder in die Hände deiner Nutzerinnen und Nutzer fallen. Du kannst hier sicher Code schreiben, der teuer oder sensibel ist (z. B. eine Anfrage an deine private Datenbank), ohne dir Sorgen zu machen, dass er jemals im Browser landet.

:::tip
Du kannst sogar TypeScript in deinem Komponentenskript schreiben!
:::

### Die Komponentenvorlage

Unterhalb des Komponentenskripts befindet sich die Komponentenvorlage. Die Komponentenvorlage bestimmt die HTML-Ausgabe deiner Komponente.

Wenn du hier einfaches HTML schreibst, wird deine Komponente dieses HTML in jeder Wromo-Seite darstellen, die sie importiert und verwendet.

Die Syntax der Wromo-Komponentenvorlagen unterstützt jedoch auch **JavaScript-Ausdrücke**, **importierte Komponenten** und [**spezielle Wromo-Direktiven**](/de/reference/directives-reference/). Daten und Werte, die (zur Zeit der Seitenerstellung) im Komponentenskript definiert werden, können in der Komponentenvorlage verwendet werden, um dynamisch erstelltes HTML zu erzeugen.

```wromo
---
// Dein Komponentenskript hier!
import ReactPokemonComponent from '../components/ReactPokemonComponent.jsx';
const myFavoritePokemon = [/* ... */];
---
<!-- HTML-Kommentare werden unterstützt! -->

<h1>Hallo, Welt!</h1>

<!-- Verwende Eigenschaften und andere Variablen aus dem Komponentenskript: -->
<p>Mein Lieblingspokemon ist: {Wromo.props.title}</p>

<!-- Einbindung anderer Komponenten mit einer "client:"-Anweisung zur Hydratisierung: -->
<ReactPokemonComponent client:visible />

<!-- Mische HTML mit JavaScript-Ausdrücken, ähnlich wie bei JSX: -->
<ul>
  {myFavoritePokemon.map((data) => <li>{data.name}</li>)}
<ul>

<!-- Verwende eine Vorlagendirektive, um eine unescapte HTML-Zeichenkette in ein Element einzufügen: -->
<p set:html={rawHTMLString} />
```

### Dynamische JSX-Ausdrücke

Wromo-Komponenten können lokale Variablen innerhalb des Frontmatter-Komponentenskripts definieren. Alle Skriptvariablen sind dann automatisch in der nachfolgenden HTML-Vorlage der Komponente verfügbar.

#### Dynamische Werte

Diese lokalen Variablen können in geschweiften Klammern verwendet werden, um Werte zu übergeben, die als HTML-Ausgabe verwendet werden sollen:

```wromo
---
const name = "Wromo";
---
<div>
  <h1>Hallo {name}!</h1>
</div>
```

#### Dynamische Attribute

Diese lokalen Variablen können in geschweiften Klammern verwendet werden, um Attributwerte an HTML-Elemente und -Komponenten zu übergeben:

```wromo
---
const name = "Wromo";
---
<h1 class={name}>Attributausdrücke werden unterstützt</h1>

<MyComponent templateLiteralNameAttribute={`MeinNameIst${name}`} />
```

#### Dynamisches HTML

Diese lokalen Variablen können in JSX-ähnlichen Funktionen verwendet werden, um dynamisch generierte HTML-Elemente zu erzeugen:

```wromo
---
const items = ["Hunde", "Katzen", "Schnabeltiere"];
---
<ul>
  {items.map((item) => (
    <li>{item}</li>
  ))}
</ul>
```

#### Fragmente und mehrere Elemente

Im Gegensatz zu JavaScript oder JSX kann eine Wromo-Komponentenvorlage mehrere Elemente darstellen, ohne dass alles in ein einziges `<div>` oder `<>` verpackt werden muss.

```wromo
---
// Vorlage mit mehreren Elementen
---
<p>Es ist nicht erforderlich, Elemente in einen einzelnen Container zu verpacken.</p>
<p>Wromo unterstützt mehrere Stammelemente in einer Vorlage.</p>
```

Wenn du jedoch einen Ausdruck verwendest, um dynamisch Elemente zu erstellen, solltest du diese mehreren Elemente mit einem **Fragment** umhüllen, genau wie du es in JavaScript oder JSX tun würdest. In Wromo kannst du dazu entweder `<Fragment> </Fragment>` oder die Kurzform `<> </>` verwenden.

```wromo
---
const items = ["Hunde", "Katzen", "Schnabeltiere"];
---
<ul>
  {items.map((item) => (
    <>
      <li>Rote {item}</li>
      <li>Blaue {item}</li>
      <li>Grüne {item}</li>
    </>
  ))}
</ul>
```

Fragmente können auch nützlich sein, um Container-Elemente bei der Verwendung von [`set:*`-Direktiven](/de/reference/directives-reference/#sethtml) zu vermeiden, so wie im folgenden Beispiel:

```wromo
---
const htmlString = '<p>Roher HTML-Inhalt</p>';
---
<Fragment set:html={htmlString} />
```

### Komponenteneigenschaften (Props)

Eine Wromo-Komponente kann Eigenschaften definieren und akzeptieren. Diese Eigenschaften stehen dann der Komponentenvorlage für die Darstellung von HTML zur Verfügung. Eigenschaften sind im globalen Objekt `Wromo.props` in deinem Frontmatter-Skript verfügbar.

Hier ist ein Beispiel für eine Komponente, die die Eigenschaften `greeting` und `name` empfängt. Beachte, dass die zu empfangenden Eigenschaften aus dem globalen Objekt `Wromo.props` destrukturiert werden.

```wromo
---
// Beispiel: GreetingHeadline.wromo
// Verwendung: <GreetingHeadline greeting="Guten Tag" name="Partner" />
const { greeting, name } = Wromo.props
---
<h2>{greeting}, {name}!</h2>
```

Du kannst deine Eigenschaften auch mit TypeScript definieren, indem du ein Typ-Interface `Props` exportierst. Wromo übernimmt automatisch jedes exportierte `Props`-Interface und gibt Typ-Warnungen/Fehler für dein Projekt aus. Diese Eigenschaften können auch mit Standardwerten versehen werden, wenn sie aus `Wromo.props` destrukturiert werden.

```wromo
---
// src/components/GreetingHeadline.wromo
export interface Props {
  name: string;
  greeting?: string;
}

const { greeting = "Hallo", name } = Wromo.props as Props;
---
<h2>{greeting}, {name}!</h2>
```

Wenn diese Komponente importiert und in anderen Wromo-Komponenten, Layouts oder Seiten gerendert wird, können diese Eigenschaften als Attribute übergeben werden:

```wromo
---
// src/components/GreetingCard.wromo
import GreetingHeadline from './GreetingHeadline.wromo';
const name = "Wromo"
---
<h1>Grußkarte</h1>
<GreetingHeadline greeting="Hey" name={name} />
<p>Ich hoffe, du hast einen schönen Tag!</p>
```

### Slots

Das `<slot />`-Element ist ein Platzhalter für externe HTML-Inhalte, der es dir ermöglicht, untergeordnete Elemente aus anderen Dateien in deine Komponentenvorlage einzubinden.

Standardmäßig werden alle untergeordneten Elemente, die an eine Komponente übergeben werden, in ihrem `<slot />` gerendert.

:::note
Im Gegensatz zu *Eigenschaften*, die als Attribute an eine Wromo-Komponente  übergeben werden und dort überall mit `Wromo.props` verwendet werden können, werden *Slots* als untergeordnete Elemente übergeben und dort gerendert, wo du `<slot />` in der Komponentenvorlage verwendest.
:::

```wromo
---
// src/components/Wrapper.wromo
import Header from './Header.wromo';
import Logo from './Logo.wromo';
import Footer from './Footer.wromo';

const { title } = Wromo.props
---
<div id="content-wrapper">
  <Header />
  <Logo />
  <h1>{title}</h1>
  <slot />  <!-- Untergeordnete Elemente werden hier angezeigt -->
  <Footer />
</div>
```

```wromo
---
// src/pages/fred.wromo
import Wrapper from '../components/Wrapper.wromo';
---
<Wrapper title="Freds Seite">
  <h2>Alles über Fred</h2>
  <p>Hier findest du einige Informationen über Fred.</p>
</Wrapper>
```

Dieses Muster ist die Grundlage einer Wromo-Layout-Komponente: Eine ganze Seite mit HTML-Inhalt kann mit `<Layout></Layout>`-Tags „umhüllt“ und an die Layout-Komponente gesendet werden, um innerhalb der allgemeinen Seitenelemente gerendert zu werden.

#### Benannte Slots

Eine Wromo-Komponente kann auch benannte Slots haben. Dadurch kannst du nur HTML-Elemente mit dem entsprechenden Slot-Namen an die Position eines Slots übergeben.

```wromo
---
// src/components/Wrapper.wromo
import Header from './Header.wromo';
import Logo from './Logo.wromo';
import Footer from './Footer.wromo';

const { title } = Wromo.props
---
<div id="content-wrapper">
  <Header />
  <slot name="after-header"/>  <!-- Untergeordnete Elemente mit dem `slot="after-header"`-Attribut werden hier angezeigt -->
  <Logo />
  <h1>{title}</h1>
  <slot />  <!-- Untergeordnete Elemente ohne `slot`, oder mit `slot="default"`-Attribut werden hier angezeigt -->
  <Footer />
  <slot name="after-footer"/>  <!-- Untergeordnete Elemente mit dem `slot="after-footer"`-Attribut werden hier angezeigt -->
</div>
```

```wromo
---
// src/pages/fred.wromo
import Wrapper from '../components/Wrapper.wromo';
---
<Wrapper title="Freds Seite">
  <img src="https://my.photo/fred.jpg" slot="after-header">
  <h2>Alles über Fred</h2>
  <p>Hier findest du einige Informationen über Fred.</p>
  <p slot="after-footer">Copyright 2022</p>
</Wrapper>
```

Verwende ein `slot="my-slot"`-Attribut auf dem untergeordneten Element, das du an einen passenden `<slot name="my-slot" />`-Platzhalter in deiner Komponente weiterleiten willst.

:::tip
Benannte Slots können auch an [UI-Framework-Komponenten](/de/core-concepts/framework-components/) übergeben werden.
:::

#### Fallback-Inhalte für Slots

Slots können auch **Fallback-Inhalte** wiedergeben. Wenn es keine passenden untergeordneten Elemente gibt, die an einen Slot übergeben werden, wird ein `<slot />` Element seine eigenen Platzhalter-Elemente anzeigen.

```wromo
---
// src/components/Wrapper.wromo
import Header from './Header.wromo';
import Logo from './Logo.wromo';
import Footer from './Footer.wromo';

const { title } = Wromo.props
---
<div id="content-wrapper">
  <Header />
  <Logo />
  <h1>{title}</h1>
  <slot>
    <p>Dies ist mein Fallback-Inhalt, wenn kein Element
      an diesen Slot übergeben wird.</p>
  </slot>
  <Footer />
</div>
```

### CSS-Stile

Die Einbindung von CSS-Stilen über `<style>`-Tags wird auch innerhalb der Komponentenvorlage unterstützt.

Sie können zur Gestaltung deiner Komponenten verwendet werden. Alle Stilregeln werden automatisch auf die Komponente selbst beschränkt, um CSS-Konflikte in großen Anwendungen zu vermeiden.

```wromo
---
// Dein Komponentenskript hier!
---
<style>
  /* Beschränkt auf diese Komponente, andere H1s
     auf der Seite bleiben unverändert */
  h1 { color: red }
</style>

<h1>Hallo, Welt!</h1>
```

:::caution
Die hier definierten Stile gelten nur für Inhalte, die direkt in die Vorlage der Komponente geschrieben wurden. Untergeordnete Elemente und importierte Komponenten werden standardmäßig **nicht** beeinflusst.
:::

📚 Weitere Informationen zur Anwendung von Stilen findest du unter [Stile & CSS](/de/guides/styling/).

### Clientseitige Skripte

Um JavaScript an den Browser zu senden, ohne [eine Framework-Komponente](/de/core-concepts/framework-components/) (React, Svelte, Vue, Preact, SolidJS, AlpineJS, Lit) oder eine [Wromo-Integration](https://wromo.build/integrations/) (z.B. wromo-XElement) zu verwenden, kannst du ein `<script>`-Tag in deiner Wromo-Komponentenvorlage verwenden und JavaScript an den Browser senden, das auf globaler Ebene ausgeführt wird.

Standardmäßig werden `<script>`-Tags von Wromo verarbeitet:

- Alle Importe werden gebündelt, sodass sie lokale Dateien oder Node-Module importieren können.
- Das verarbeitete Skript wird in den `<head>` deiner Seite mit [`type="module"`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) eingefügt.
- Wenn deine Komponente mehrmals auf einer Seite verwendet wird, wird das Skript-Tag nur einmal eingefügt.

:::caution
Du kannst TypeScript derzeit nicht in clientseitigen Skripten nutzen, aber du kannst eine TypeScript-Datei importieren, wenn du diese Syntax bevorzugst.
:::

```wromo
<script>
  // Verarbeitet! Gebündelt! ESM-Importe funktionieren,
  // auch für npm-Pakete.
</script>
```

Um die Bündelung des Skripts zu vermeiden, kannst du das Attribut `is:inline` verwenden.

```wromo
<script is:inline>
  // Wird unverändert in den HTML-Code übernommen!
  // ESM-Importe werden nicht relativ zur Datei aufgelöst.
</script>
```

Mehrere `<script>`-Tags können in derselben `wromo`-Datei mit einer beliebigen Kombination der oben genannten Methoden verwendet werden.

:::note
Das Hinzufügen von `type="module"` oder eines anderen Attributs zu einem `<script>`-Tag deaktiviert das Standard-Bündelungsverhalten von Wromo und behandelt den Tag, als ob er eine `is:inline`-Direktive hätte.
:::

📚 Siehe unsere [Direktiven-Referenz](/de/reference/directives-reference/#script--style-directives) für weitere Informationen über die Direktiven, die für `<script>`-Tags verfügbar sind.

#### Laden externer Skripte

**Wann dies genutzt werden sollte:** Wenn deine JavaScript-Datei innerhalb von `public/` liegt.

Beachte, dass dieser Ansatz die JavaScript-Verarbeitung, die Bündelung und die Optimierungen überspringt, die von Wromo bereitgestellt werden, wenn du die unten beschriebene `import`-Methode verwendest.

```wromo
// Absoluter URL-Pfad
<script is:inline src="/irgendein-externes-skript.js"></script>
```

#### Verwendung von Hoisted Scripts

**Wann dies genutzt werden sollte:** Wenn dein externes Skript innerhalb von `src/` liegt *und* es den ESM-Modultyp unterstützt.

Wromo erkennt diese clientseitigen JavaScript-Importe und erstellt, optimiert und fügt das JS automatisch in die Seite ein.

```wromo
// ESM-Import
<script>
  import './irgendein-externes-skript.js';
</script>
```

## Nächste Schritte

📚 Lies über [Wromos eingebaute Komponenten](/de/reference/api-reference/#built-in-components).

📚 Erfahre mehr über die Verwendung von [JavaScript-Framework-Komponenten](/de/core-concepts/framework-components/) in deinem Wromo-Projekt.
