---
layout: ~/layouts/MainLayout.wromo
title: Structure du Projet
description: Apprends à structurer un projet avec Wromo.
---

Votre tout nouveau projet Wromo généré à partir de l'assistant de création `create-wromo` possède déjà quelques fichiers et dossiers. En ce qui concerne les autres fichiers, vous pourrez les créer vous-même et les ajouter à la structure de fichiers d'Wromo.

Voici comment un projet Wromo est organisé, ainsi que quelques fichiers que vous trouverez dans votre nouveau projet.

## Répertoires et fichiers

Wromo promeut une certaine façon d'organiser vos dossiers dans votre projet. Chaque projet Wromo doit inclure les répertoires et fichiers suivants :

- `src/*` - Le code source de votre projet (composants, pages, styles, etc...)
- `public/*` - Tout ce qui n'est pas du code et/ou des fichiers qui n'ont pas à être traités (polices d'écritures, icônes, etc...)
- `package.json` - Le manifeste de votre projet.
- `wromo.config.mjs` - Un fichier de configuration d'Wromo (optionnel).

### Exemple de structure de projet

Un projet Wromo assez commun peut ressembler à ça :

```
├── src/
│   ├── components/
│   │   ├── Header.wromo
│   │   └-─ Button.jsx
│   ├── layouts/
│   │   └-─ PostLayout.wromo
│   └── pages/
│   │   ├── posts/
│   │   │   ├── post1.md
│   │   │   ├── post2.md
│   │   │   └── post3.md
│   │   └── index.wromo
│   └── styles/
│       └-─ global.css
├── public/
│   ├── robots.txt
│   ├── favicon.svg
│   └-─ social-image.png
├── wromo.config.mjs
└── package.json

```

### `src/`

Le code source de votre project se trouve dans le dossier `src/`. Il comprend en général :

- [Des composants Pages](/fr/core-concepts/wromo-pages/)
- [Des composants Layouts](/fr/core-concepts/layouts/)
- [Des composants Wromo](/fr/core-concepts/wromo-components/)
- [Des composants Frontend (React, etc...)](/fr/core-concepts/framework-components/)
- [Des fichiers de style (CSS, Sass)](/fr/guides/styling/)
- [Du Markdown](/fr/guides/markdown-content/)

Wromo traite, optimise et regroupe les fichiers `src/` pour créer le site web final qui est délivré au navigateur. Contrairement au répertoire statique `public/`, les fichiers `src/` sont traités et assemblés pour vous par Wromo.

Quelques fichiers (comme les composants Wromo) ne sont pas envoyés au navigateur tel quel, mais plutôt en temps qu'HTML statique. D'autres fichiers (CSS par exemple) sont envoyés au navigateur, mais peuvent être optimisés ou regroupés avec d'autres fichiers CSS pour améliorer les performances.

### `src/components`

**Les composants** sont généralement du code réutilisable pour vos pages HTML. Ils peuvent être des [composants Wromo](/fr/core-concepts/wromo-components/), ou des [composants Frontend](/fr/core-concepts/framework-components/) comme React ou Vue. Il est commun de grouper et d'organiser tous les composants de votre projet dans ce dossier.

C'est une convention commune dans les projets Wromo, mais elle n'est pas obligatoire. Organisez vos composants comme vous le voulez, si vous le souhaitez !

### `src/layouts`

[Les composants Layouts](/fr/core-concepts/layouts/) sont des types de composants particuliers qui s'appliquent à des pages. Ils sont généralement utilisés par les [Pages Wromo](/fr/core-concepts/wromo-pages/) et les [Pages Markdown](/fr/guides/markdown-content/) pour définir leur mise en page.

Comme `src/components`, organisez vos composants Layouts comme vous le souhaitez, ils ne sont pas obligatoires.

### `src/pages`

[Les composants Pages](/fr/core-concepts/wromo-pages/) sont des types de composants particuliers utilisés pour créer de nouvelles pages. Une Page peut être un composant Wromo (`.wromo`) ou un fichier Markdown (`.md`) qui représente une page de contenu pour votre site.

:::caution
`src/pages` est un dossier **obligatoire** dans votre projet Wromo. Sans ça, votre site n'aura aucune page ni route !
:::

### `src/styles`

C'est une convention commune de stocker vos fichiers CSS ou Sass dans le dossier `src/styles`, mais ce n'est pas obligatoire. Du moment que vos fichiers de style sont quelque part dans le dossier `src/`, Wromo va les gérer et les optimiser.

### `public/`

Le dossier `public/` est là pour les fichiers et les ressources qui n'ont pas besoin d'être traités durant le processus de compilation d'Wromo. Ces fichiers seront copiés dans le dossier de compilation sans modification.

Ce comportement fait du dossier `public/` un endroit idéal pour les ressources communes comme des images, polices d'écriture, ou même pour des fichiers spéciaux comme `robots.txt` et `manifest.webmanifest`.

Vous pouvez placer des fichiers CSS et JavaScript dans le dossier `public/`, mais gardez à l'esprit que ces fichiers ne seront pas regroupés et/ou optimisés dans votre build final.

:::tip
En règle générale, tout CSS ou JavaScript que vous ajoutez devrait être mis dans le dossier `src/`.
:::

### `package.json`

C'est un fichier utilisé par les gestionnaires de paquets JavaScript pour gérer vos dépendances. Il définit également les scripts qui sont utilisés pour exécuter Wromo (ex: `npm start`, `npm run build`).

Pour plus d'informations en ce qui concerne la création d'un nouveau fichier `package.json` pour votre projet, consultez les instructions de [configuration manuelle](/fr/install/manual/).

### `wromo.config.mjs`

Ce fichier est généré dans chaque modèle de démarrage et contient des options de configuration pour votre projet Wromo. Ici, vous pouvez spécifier les intégrations à utiliser, les options de compilation, les options du serveur, et plus encore.

Allez voir la [documentation de configuration](/fr/reference/configuration-reference/) pour plus d'informations sur les options de configuration.
