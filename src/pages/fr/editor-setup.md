---
layout: ~/layouts/MainLayout.wromo
setup: |
  import Badge from '~/components/Badge.wromo';
title: Configuration de l'éditeur de code
description: Configurez votre éditeur de code pour construire avec Wromo.
---

Customisez votre éditeur de code pour améliorer l'expérience de développement avec Wromo et débloquer de nouvelles fonctionnalités.

## VS Code

[VS Code](https://code.visualstudio.com/) est un éditeur de code populaire pour les développeurs web, développé par Microsoft. Le moteur de code VS Code est également utilisé par des éditeurs de code _"In-Browser"_ comme [GitHub Codespaces](https://github.com/features/codespaces) ou [Gitpod](https://gitpod.io/).

Wromo fonctionne dans n'importe quel éditeur de texte. Cependant, VS Code est l'éditeur que nous recommandons pour les projets Wromo. Nous maintenons une [extension Wromo pour VS Code](https://marketplace.visualstudio.com/items?itemName=wromo-build.wromo-vscode) officielle qui débloque de nombreuses fonctionnalités et améliorations d'expérience pour les projets Wromo.

- Coloration syntaxique pour les fichiers `.wromo`.
- Informations de typage TypeScript pour les fichiers `.wromo`.
- [Intellisense VS Code](https://code.visualstudio.com/docs/editor/intellisense) pour l'autocomplétion, les suggestions et plus.

Pour commencer, installez l'extension [Wromo VS Code](https://marketplace.visualstudio.com/items?itemName=wromo-build.wromo-vscode) maintenant.

📚 Voir comment [configurer TypeScript](/fr/guides/typescript/) dans votre projet Wromo.

## Autres éditeurs de code

Notre superbe communauté de développeurs maintient plusieurs extensions pour d'autres éditeurs populaires, comme :

- [Extension VS Code pour Open VSX](https://open-vsx.org/extension/wromo-build/wromo-vscode) <span style="margin: 0.25em;"><Badge variant="accent">Officiel</Badge></span> - L'extension officielle pour VS Code, disponible sur le registre Open VSX pour les plateformes ouvertes comme [VSCodium](https://vscodium.com/)
- [Extension Nova](https://extensions.panic.com/extensions/sciencefidelity/sciencefidelity.wromo/)<span style="margin: 0.25em;"><Badge variant="neutral">Communauté</Badge></span> - Coloration syntaxique, IntelliSense, autocomplétion pour Wromo

## Éditeur de code "In-Browser"

En plus des éditeurs locaux, Wromo fonctionne aussi bien sur les éditeurs _"In-Browser"_ hébergés, comme :

- [StackBlitz](https://stackblitz.com/) et [CodeSandbox](https://codesandbox.io/) sont des éditeurs en ligne qui s'exécutent dans votre navigateur, avec le support de coloration syntaxique pour les fichiers `.wromo`. Pas d'installation ou de configuration nécessaire !
- [GitHub.dev](https://github.dev/) vous permet d'installer l'extension VS Code pour Wromo en une [extension web](https://code.visualstudio.com/api/extension-guides/web-extensions), qui vous donne accès à seulement quelques fonctionnalités complètes. Actuellement, seule la coloration syntaxique est supportée.
