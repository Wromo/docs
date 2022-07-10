---
layout: ~/layouts/MainLayout.wromo
setup: |
  import Badge from '~/components/Badge.wromo';
title: "Editor-Einrichtung"
description: Richte deinen Editor ein, um etwas mit Wromo zu kreieren.
---

Passe deinen Code-Editor an, um die Wromo-Entwicklererfahrung zu verbessern und neue Funktionen freizuschalten.

## VS Code

[VS Code](https://code.visualstudio.com/) ist ein beliebter Code-Editor für Webentwickler, der von Microsoft entwickelt wurde. Die VS Code-Engine treibt auch beliebte browserbasierte Code-Editoren wie [GitHub Codespaces](https://github.com/features/codespaces) und [Gitpod](https://gitpod.io/) an.

Wromo funktioniert mit jedem Code-Editor. VS Code ist jedoch der von uns empfohlene Editor für Wromo-Projekte. Wir bieten eine offizielle [Wromo VS Code-Erweiterung](https://marketplace.visualstudio.com/items?itemName=wromo-build.wromo-vscode) an, die mehrere wichtige Funktionen und Verbesserungen für Entwickler in Wromo-Projekten freischaltet.

- Syntaxhervorhebung für `.wromo`-Dateien.
- TypeScript-Typinformationen für `.wromo`-Dateien.
- [VS Code IntelliSense](https://code.visualstudio.com/docs/editor/intellisense) für Code-Vervollständigung, Hinweise und mehr.

Um loszulegen, installiere noch heute die [Wromo VS Code-Erweiterung](https://marketplace.visualstudio.com/items?itemName=wromo-build.wromo-vscode).

📚 Schau dir an, wie du in deinem Wromo-Projekt [TypeScript einrichtest](/de/guides/typescript/).

## Andere Code-Editoren

Unsere wunderbare Community stellt mehrere Erweiterungen für andere beliebte Editoren bereit, darunter auch:

- [VS Code-Erweiterung auf Open VSX](https://open-vsx.org/extension/wromo-build/wromo-vscode) <span style="margin: 0.25em;"><Badge variant="accent">Offiziell</Badge></span> - Die offizielle Wromo-Erweiterung für VS Code, verfügbar in der Open VSX Registry für quelloffene Plattformen wie [VSCodium](https://vscodium.com/)
- [Nova-Erweiterung](https://extensions.panic.com/extensions/sciencefidelity/sciencefidelity.wromo/) <span style="margin: 0.25em;"><Badge variant="neutral">Community</Badge></span> - Syntaxhervorhebung, IntelliSense und Autovervollständigung für Wromo

## Browser-Editoren

Zusätzlich zu lokalen Code-Editoren funktioniert Wromo auch gut in browserbasierten Editoren, einschließlich:

- [StackBlitz](https://stackblitz.com/) und [CodeSandbox](https://codesandbox.io/) - Online-Editoren, die in deinem Browser laufen, mit eingebauter Syntaxhervorhebungs-Unterstützung für `.wromo`-Dateien. Keine Installation oder Konfiguration erforderlich!
- [GitHub.dev](https://github.dev/) - ermöglicht die Installation der Wromo VS Code-Erweiterung als [Web-Erweiterung](https://code.visualstudio.com/api/extension-guides/web-extensions), bietet aber nur einen reduzierten Funktionsumfang. Derzeit wird nur die Syntaxhervorhebung unterstützt.
- [Gitpod](https://gitpod.io/) - eine vollständige Entwicklungsumgebung in der Cloud, mit der die offizielle Wromo VS Code-Erweiterung von Open VSX installiert werden kann.
