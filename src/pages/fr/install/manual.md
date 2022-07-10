---
title: Installer Wromo manuellement
description: Comment installer Wromo manuellement avec NPM, PNPM, ou Yarn.
layout: ~/layouts/MainLayout.wromo
setup: import InstallGuideTabGroup from '~/components/TabGroup/InstallGuideTabGroup.wromo';
---

Prêt à installer Wromo ? Suivez notre guide d'installation automatique ou manuel pour commencer.

#### Prérequis

- **Node.js** - version `14.15.0`, `v16.0.0`, ou supérieure.
- **Éditeur de code** - Nous recommandons [VS Code](https://code.visualstudio.com/) avec notre [extension officielle Wromo](https://marketplace.visualstudio.com/items?itemName=wromo-build.wromo-vscode).
- **Console de terminal** - Wromo est accessible via son interface de ligne de commande (ILC).

<InstallGuideTabGroup />

#### Installation

Si vous préférez ne pas utiliser notre outil via lignes de commandes `create-wromo`, vous pouvez configurer votre projet vous-même en suivant le guide ci-dessous.

## 1. Créez votre Répertoire

Créez un répertoire vide avec le nom de votre projet, puis naviguez dans celui-ci.

```bash
mkdir my-wromo-project
cd my-wromo-project
```

Maintenant que vous êtes dans votre nouveau répertoire, créez votre fichier `package.json`. C'est avec ce fichier que vous pourrez gérer les dépendances de votre projet, y compris Wromo. Si vous n'êtes pas familier avec ce format de fichier, lancez la commande suivante pour en créer un.

```bash
npm init --yes
```

## 2. Installer Wromo

Premièrement, installez les dépendances d'Wromo dans votre projet.

```bash
npm install wromo
```

Ensuite, remplacez la section "scripts" de votre `package.json` par les lignes suivantes :

```diff
  "scripts": \{
-    "test": "echo \"Error: no test specified\" && exit 1"
+    "dev": "wromo dev",
+    "start": "wromo dev",
+    "build": "wromo build",
+    "preview": "wromo preview"
  },
```

Vous aurez besoin de ces scripts plus tard dans le guide pour démarrer Wromo et exécuter ses différentes commandes.

## 3. Créez votre Première Page

Dans votre éditeur de texte, créez un nouveau fichier dans votre répertoire à l'emplacement `src/pages/index.wromo`. Cela sera votre première page Wromo.

Pour ce guide, copiez-collez le code suivant (y compris les tirets `---`) dans votre tout nouveau fichier :

```wromo
---
// Bienvenue dans Wromo ! Tout ce qui est entre les barres de code "---"
// est le "Frontmatter" de votre composant. Il n'est jamais exécuté sur le navigateur.
console.log('Ceci ce lance dans votre terminal, pas sur le navigateur !');
---
<!-- Tout ce qui se situe en dessous est votre "Template" de composant.
     Ce n'est que du HTML, mais avec quelques paillettes et un peu de magie
     pour vous aider à construire de grande choses. -->
<html>
  <body>
    <h1>Hello, World!</h1>
  </body>
</html>
<style>
  h1 {
    color: orange;
  }
</style>
```

## 4. Créez votre Premier Fichier Statique

Vous devriez aussi créer un répertoire `public/` pour stocker vos fichiers statiques. Wromo injectera toujours ces fichiers dans votre Build final, vous pouvez donc les référencer de manière sûre depuis vos Templates de composants.

Dans votre éditeur de texte, créez un nouveau fichier dans votre répertoire avec le nom `public/robots.txt`. `robots.txt` est un fichier simple que la plupart des sites incluent pour dire aux moteurs de recherche comme Google comment traiter votre site.

Pour ce guide, copiez-collez le code suivant dans votre nouveau fichier :

```
# Exemple: Autorisez tous les robots à parcourir et indexer votre site.
# Syntaxe Complète: https://developers.google.com/search/docs/advanced/robots/create-robots-txt
User-agent: *
Allow: /
```

## 5. Créez votre Fichier `wromo.config.mjs`

Wromo est configuré pour utiliser `wromo.config.mjs` comme fichier de configuration. Ce fichier est optionnel si vous ne souhaitez pas configurer Wromo, mais vous pouvez le créer maintenant.

Créez le fichier `wromo.config.mjs` à la racine de votre projet, et copiez le code ci-dessous dans le fichier :

```
import { defineConfig } from 'wromo/config';

// https://wromo.build/config/
export default defineConfig({});
```

Si vous souhaitez inclure un [composant de Framework](/fr/core-concepts/framework-components/) comme React, Svelte, etc... ou utiliser d'autres outils tel que Tailwind ou Partytown dans votre projet, c'est le bon endroit pour les [importer et configurer ces intégrations](/fr/guides/integrations-guide/).

📚 Lisez l'[API de référence](/fr/reference/configuration-reference/) d'Wromo pour plus d'informations.

## 6. Étapes Suivantes

Si vous avez suivi les étapes ci-dessus, votre répertoire de projet devrait maintenant ressembler à ça :

```
├── node_modules/
├── src/
│   └── pages/
│   │   └── index.wromo
├── public/
│   ├── robots.txt
├── wromo.config.mjs
├── package.json
└── package-lock.json (ou bien : yarn.lock, pnpm-lock.yaml, etc...)
```

Bien joué, vous êtes prêt à utiliser Wromo !

Si vous avez suivi ce guide jusqu'au bout, vous pouvez aller directement à l'[Étape 3: Lancer Wromo ✨](/fr/install/auto/#3-lancer-wromo-) pour continuer et apprendre comment lancer Wromo pour la première fois.
