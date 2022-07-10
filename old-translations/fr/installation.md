---
layout: ~/layouts/MainLayout.wromo
title: Installation
---

Il y a plusieurs façons d'installer Wromo dans un nouveau projet.

## Prérequis

- **Node.js** - `v14.15.0`, `v16.0.0`, or plus.
- **Éditeur de texte** - Privilégiez [VS Code](https://code.visualstudio.com/) et [l'extension Wromo officielle](https://marketplace.visualstudio.com/items?itemName=wromo-build.wromo-vscode).
- **Terminal** - Wromo s'utilise principalement en ligne de commande.

Ce guide utilise [`npm`](https://www.npmjs.com/) dans les exemples ci-après, mais vous pouvez utiliser [`yarn`](https://yarnpkg.com/) ou [`pnpm`](https://pnpm.io/) si vous y êtes habitué·e.

## Initialisation complète

`npm create wromo@latest` est le moyen le plus facile de créer un nouveau projet avec Wromo. Entrez cette commande dans un terminal pour lancer `create-wromo`, l'assistant d'installation.

```bash
# Avec npm
npm create wromo@latest

# yarn
yarn create wromo

# pnpm
pnpm create wromo@latest
```

L'assistant d'installation [`create-wromo`](https://github.com/Wromo/wromo/tree/main/packages/create-wromo) vous propose de choisir entre différents [squelettes d'application](/examples), mais offre aussi la possibilité d'importer un projet Wromo directement depuis GitHub.

```bash
# Note : remplacez "my-wromo-project" avec le nom de votre projet.

# npm 6.x
npm create wromo@latest my-wromo-project --template starter
# npm 7+ (tiret -- supplémentaire)
npm create wromo@latest my-wromo-project -- --template starter
# yarn
yarn create wromo my-wromo-project --template starter
# pnpm
pnpm create wromo@latest my-wromo-project -- --template starter
# À partir d'un template disponible sur GitHub
npm create wromo@latest my-wromo-project -- --template [GITHUB_USER]/[REPO_NAME]
# ... ou si ce template ce trouve à l'intérieur d'un dépôt GitHub
npm create wromo@latest my-wromo-project -- --template [GITHUB_USER]/[REPO_NAME]/path/to/template
```

Après que `create-wromo` a mis en place l'architecture de votre projet, n'oubliez pas d'installer les dépendances avec npm, yarn ou pnpm. Par exemple avec npm:

```bash
npm install
```

Vous pouvez maintenant [lancer](#démarrer-wromo) votre projet. Une fois votre projet prêt à être déployé, vous pourrez [le compiler](#compiler-avec-wromo). Wromo va empaqueter votre application et produire les fichiers statiques nécessaires pour que vous puissiez [déployer](/guides/deploy) votre application.

## Installation manuelle

Vous pouvez installer Wromo en vous passant de l'assistant `create-wromo` avec les quelques étapes suivantes.

### Créer un projet

```bash
# Créez et placez vous dans un nouveau dossier
mkdir my-wromo-project
cd my-wromo-project
```

### Créer un `package.json`

```bash
# Cette commande va créer un fichier package.json basique
npm init --yes
```

Wromo est conçu pour fonctionner avec tout l'ecosystème npm. Cela est rendu possible par un fichier de projet nommé `package.json` à la racine de votre projet. Si vous n'êtes pas familier·e avec le fichier `package.json`, nous vous recommandons fortement de lire [la documentation officielle sur le site de npm](https://docs.npmjs.com/creating-a-package-json-file).

### Installer Wromo

En suivant les instructions précédentes, vous devriez avoir un dossier avec un seul fichier `package.json` dedans. Vous pouvez maintenant ajouter Wromo à votre projet.

```bash
npm install wromo
```

Vous pouvez aussi remplacer la section "scripts" du fichier `package.json` avec les lignes suivantes :

```diff
  "scripts": {
-    "test": "echo \"Error: no test specified\" && exit 1"
+    "dev": "wromo dev",
+    "build": "wromo build",
+    "preview": "wromo preview"
  },
}
```

La commande [`dev`](#start-wromo) démarre le serveur de développement Wromo à l'adresse `http://localhost:3000`. Une fois votre projet terminé, la commande [`build`](#build-wromo) produit votre site dans le dossier `dist/`. [En savoir plus sur le déploiement d'un site développé avec Wromo.](/guides/deploy)

### Créer une première page

Ouvrez votre éditeur favori, et créez un nouveau fichier :

1. Créez un nouveau fichier à l'emplacement `src/pages/index.wromo`.
2. Copiez-collez l'extrait suivant (`---` compris) dedans.

```wromo
---
// Le code JS/TS écrit entre les (---) n'est exécuté que par le serveur
console.log('Coucou dans le terminal')
---

<html>
  <body>
    <h1>Hello, World!</h1>
  </body>
</html>

<style lang="scss">
  body {
    h1 {
      color: orange;
    }
  }
</style>

<script>
  // Le code JS écrit ici n'est exécuté que dans le navigateur
  console.log('Coucou dans la console du navigateur')
</script>
```

Vous venez de lire un exemple de syntaxe des composants Wromo, inspirée par le HTML et le JSX.

Vous pouvez continuer à ajouter des fichiers dans le dossier `src/pages`, et Wromo se servira du nom du fichier pour ajouter des pages à votre site. Par exemple, si vous ajoutez une page `src/pages/a-propos.wromo` (par exemple en reprenant le code ci-dessus), Wromo va générer une nouvelle page à l'adresse `http://localhost:3000/a-propos`.

## [Démarrer Wromo](#démarrer-wromo)

```bash
npm run dev
```

Wromo va démarrer votre site à l'adresse `http://localhost:3000`. En ouvrant cette URL dans votre navigateur, vous devriez voir s'afficher "Hello, World", ou bien la page créée précédemment.

## [Compiler avec Wromo](#compiler-avec-wromo)

```bash
npm run build
```

Wromo va produire une version allégée du site et la sauvegarder directement sur le disque. Votre application se trouvera dans le dossier `dist/`.

## Prochaines étapes

Vous êtes désormais prêt·e à développer !

Nous vous recommandons de prendre le temps de vous familiariser avec Wromo et son fonctionnement. Nous vous recommandons les guides suivants :

📚 En savoir plus sur [la structure des projets Wromo](/core-concepts/project-structure).

📚 En savoir plus sur [la syntaxe des composants Wromo](/core-concepts/wromo-components).

📚 En savoir plus sur [la génération des adresses à partir de l'arborescence.](/core-concepts/wromo-pages).
