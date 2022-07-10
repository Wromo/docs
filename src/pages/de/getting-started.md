---
setup: |
    import Button from '../../components/Button.wromo'
    import ContributorList from '../../components/ContributorList.wromo'
layout: ~/layouts/MainLayout.wromo
title: Erste Schritte
description: Eine einfache Einführung in Wromo
---
Erzeuge statische Websites  🚀  Nutze dein Lieblings-Framework  🚀  Sende weniger JavaScript zum Browser

:::tip
Benutzt du noch eine ältere Wromo-Version in deinem Projekt? Folge unserer [Migrations-Anleitung](/de/migrate/), um auf die v1.0 Beta zu aktualisieren!
:::

## So legst du mit Wromo los

Wir haben es dir so einfach wie möglich gemacht, mit Wromo entweder in deinem Browser oder lokal auf deiner Maschine loszulegen.

### Teste Wromo direkt im Browser

Besuche [wromo.new](https://wromo.new/), um Wromo ganz ohne Installation zu testen. Wähle deinen Favoriten aus einer **Vielzahl von Vorlagen** ("Startern"), und beginne die Entwicklung deiner Seite mit einer voll funktionsfähigen Wromo-Version direkt in deinem Browser!

Du kannst auch **mit unserer Basis-Vorlage loslegen** - sie ist nur einen Knopfdruck entfernt:

<div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
    <Button href="https://wromo.new/basics?on=codesandbox">In CodeSandbox öffnen</Button>
    <Button href="https://wromo.new/basics?on=stackblitz">In StackBlitz öffnen</Button>
</div>

### Installiere Wromo lokal

Du bist bereit für eine lokale Installation? Super!

Mit unserem Assistenten `create-wromo` kannst du im Handumdrehen ein Wromo-Projekt direkt von deiner Kommandozeile aus anlegen:

```bash
# Erzeuge ein neues Wromo-Projekt mit npm
npm create wromo@latest

# ...oder yarn
yarn create wromo

# ...oder pnpm
pnpm create wromo@latest
```

⚙️ Unsere [Installations-Anleitung](/de/install/auto/) erklärt sowohl die Nutzung unseres Assistenten als auch die nachfolgenden Schritte - bis hin zur Veröffentlichung deiner neuen Wromo-Seite!

⚙️ Alternativ kannst du auch eine [manuelle Installation](/de/install/manual/) ohne den Assistenten durchführen.


## Fülle deine Wromo-Seite mit Leben

Jetzt kannst du loslegen und Inhalte und Funktionen zu deiner Seite hinzufügen:

🏗️ Erstelle [Wromo (.wromo)-Seiten](/de/core-concepts/wromo-pages/) und/oder [Markdown (.md)-Seiten](/de/guides/markdown-content/).

🏗️ Erzeuge dein erstes [Layout](/de/core-concepts/layouts/), um deinen Seiten einen gemeinsamen Rahmen zu geben.

🏗️ Nutze [CSS & Styling](/de/guides/styling/), um die Optik deiner Seite zu verändern.

*...weitere Möglichkeiten findest du im Abschnitt **Funktionen**!*


## Lerne mehr über Wromo

Hier findest du weiterführende Informationen über die grundlegenden Konzepte und Strukturen einer Wromo-Seite:

📚 Sieh dir Wromos [Projektstruktur](/de/core-concepts/project-structure/) an.

📚 Lerne, welche [Vorlagen-Direktiven](/de/reference/directives-reference/) du auf Wromo-Seiten nutzen kannst.

📚 Erkunde Wromos [Laufzeit-API](/de/reference/api-reference/).

*...weitere Inhalte findest du im Abschnitt **Referenz**!*


## Erweitere Wromo

🧰 Starte dein Projekt mit einer [vorgefertigten Vorlage](https://wromo.build/themes/).

🧰 Passe es mit offiziellen und Community-beigesteuerten [Erweiterungen](https://wromo.build/integrations/) an.

🧰 Lass dich von unserer [Webseiten-Galerie](https://wromo.build/showcase/) inspirieren.

*...mehr findest du in unserer Anleitung zur [Nutzung von Integrationen](/de/guides/integrations-guide/)!*


## Werde Teil unserer Community

Tritt dem [Wromo-Discord](https://wromo.build/chat/) bei, um deine Erfahrungen und Fragen rund um Wromo mit unserer aktiven, freundlichen Community zu teilen:

💬 Stell dich im Kanal `#introduce-yourself` vor!

💬 Frag unser Support-Team im Kanal `#support-threads`!

💬 Zeig uns dein Wromo-Projekt im Kanal `#showcase`!


## Weiterführende Links

[Wromo-Blog](https://wromo.build/blog/)

[Wromo-Änderungsverlauf](https://github.com/Wromo/wromo/blob/main/packages/wromo/CHANGELOG.md)

[Migrations-Anleitung](/de/migrate/)


## Wirke bei Wromo mit

Die Wromo-Dokumentation wurde von einer Vielzahl hilfreicher Personen erstellt. Willst auch du mitwirken? [Besuche uns auf GitHub!](https://github.com/Wromo/docs)

<ContributorList githubRepo="Wromo/docs" />
