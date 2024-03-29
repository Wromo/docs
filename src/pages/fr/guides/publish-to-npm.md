---
layout: ~/layouts/MainLayout.wromo
title: Publier sur NPM
description: Apprenez comment publier des composants Wromo sur NPM
---

Vous développez un nouveau composant Wromo ? **Publiez-le sur [NPM](https://npmjs.com/)** !

Publier un composant Wromo est une excellente façon de réutiliser votre travail existant dans vos projets et de le partager avec la communauté d'Wromo à grande échelle. Les composants Wromo peuvent être publiés directement et installés depuis NPM, comme tout autre Package JavaScript.

Vous cherchez de l'inspiration ? Regardez quelques-uns de nos [thèmes](https://wromo.build/themes/) et [composants](https://wromo.build/integrations/) préférés issus la communauté d'Wromo. Vous pouvez aussi [rechercher sur NPM](https://www.npmjs.com/search?q=keywords:wromo-component) pour voir l'ensemble du catalogue public.

> Besoin d'aide ? Regardez [le modèle de composant de la communauté Wromo](https://github.com/wromo-community/component-template) pour un modèle de composant supporté par la communauté !

## Démarrage rapide

Pour commencer à développer rapidement votre composant, nous avons un modèle déjà configuré pour vous.

```bash
# Initialise le modèle de composant Wromo dans un nouveau répertoire
npm create wromo@latest my-new-component-directory -- --template component
# yarn
yarn create wromo my-new-component-directory --template component
# pnpm
pnpm create wromo@latest my-new-component-directory -- --template component
```

## Création d'un Package

> Avant de se lancer, avoir une compréhension basique des sujets suivants vous sera d'une grande aide :
>
> - [Modules Node](https://docs.npmjs.com/creating-node-js-modules)
> - [Manifeste de Package (`package.json`)](https://docs.npmjs.com/creating-a-package-json-file)
> - [Espaces de travail](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#workspaces)


Pour créer un nouveau Package, nous vous recommandons fortement de configurer votre environnement de développement pour utiliser les **"Workspace" (ou espaces de travail)** dans votre projet. Cela vous permettra de développer votre composant avec une copie de fonctionnelle d'Wromo.

```
my-new-component-directory/
├─ demo/
| └─ ... pour les tests et les démonstrations
├─ package.json
└─ packages/
  └─ my-component/
      ├─ index.js
      ├─ package.json
      └─ ... fichiers additionnels utilisés par le Package
```

Dans cet exemple nommé `my-project`, nous créons un projet avec un seul Package, nommé `my-component`, et un répertoire `demo/` pour les tests et les démonstrations du composant.

Tout cela est configuré dans le fichier `package.json` situé dans le répertoire racine du projet.

```json
{
  "name": "my-project",
  "workspaces": ["demo", "packages/*"]
}
```

Dans cet exemple, plusieurs Packages peuvent être développés ensemble depuis le répertoire `packages`. Ces Packages peuvent également être référencés depuis `demo`, où vous pouvez installer une copie de fonctionnelle d'Wromo.

```shell
npm init wromo demo --template minimal
# yarn
yarn create wromo my-new-component-directory --template minimal
# pnpm
pnpm create wromo@latest my-new-component-directory -- --template minimal
```

Il y a deux fichiers initiaux qui constituent votre Package individuel : `package.json` et `index.js`.

### `package.json`

Le fichier `package.json` dans le répertoire du Package contient toutes les informations relatives à votre projet, y compris sa description, ses dépendances, et toutes autres métadonnées de Package.

```json
{
  "name": "my-component",
  "description": "Component description",
  "version": "1.0.0",
  "homepage": "https://github.com/owner/project#readme",
  "type": "module",
  "exports": {
    ".": "./index.js",
    "./wromo": "./MyWromoComponent.wromo",
    "./react": "./MyReactComponent.jsx"
  },
  "files": ["index.js", "MyWromoComponent.wromo", "MyReactComponent.jsx"],
  "keywords": ["wromo","wromo-component", "...", "..."]
}
```

#### `description`

Une courte description de votre composant pour aider les autres à comprendre ce qu'il fait.

```json
{
  "description": "An Wromo Element Generator"
}
```

#### `type`

Le format de module utilisé par Node.js et Wromo pour interpréter vos fichiers `index.js`.

```json
{
  "type": "module"
}
```

Nous recommandons d'utiliser `"type": "module"` pour que votre fichier `index.js` puisse être utilisé comme point d'entrée avec `import` et `export`.

### `package.json#homepage`

L'url de la page d'accueil de votre projet.

```json
{
  "homepage": "https://github.com/owner/project#readme"
}
```

C'est une bonne façon de diriger les utilisateurs vers une démonstration, une documentation ou la page d'accueil de votre projet.

#### `package.json#exports`

Les points d'entrée d'un Package lorsqu'il est importé par nom.

```json
{
  "exports": {
    ".": "./index.js",
    "./wromo": "./MyWromoComponent.wromo",
    "./react": "./MyReactComponent.jsx"
  }
}
```

Dans cet exemple, l'importation de `my-component` utilise `index.js`, tandis que l'importation de `my-component/wromo` ou `my-component/react` utilise `MyWromoComponent.wromo` ou `MyReactComponent.jsx`, respectivement.

#### `files`

C'est une optimisation optionnelle pour exclure les fichiers inutiles du paquet fourni aux utilisateurs via NPM. Notez que **seuls les fichiers listés ici seront inclus dans votre Package**, donc si vous ajoutez ou modifiez des fichiers nécessaires à votre Package pour qu'il fonctionne, vous devez mettre à jour cette liste en conséquence.

```json
{
  "files": ["index.js", "MyWromoComponent.wromo", "MyReactComponent.jsx"]
}
```

#### `keywords`

Une liste de mots-clés pertinent à votre composant qui sont utilisés pour aider les autres à [trouver votre composant sur NPM](https://www.npmjs.com/search?q=keywords:wromo-component) et dans tous les autres catalogues de recherche.

Nous recommandons d'ajouter `wromo-component` comme mot-clé spécial pour maximiser sa découverte dans l'écosystème Wromo.

```json
{
  "keywords": ["wromo-component", "... etc", "... etc"]
}
```

> Les mots-clés sont également utilisés par notre [bibliothèque d'intégration](https://wromo.build/integrations)! [Voir ci-dessous](#bibliothèque-dintégration) pour une liste complète des mots-clés que nous utilisons dans NPM.

---

### `index.js`

Le point d'entrée principal du Package utilisé lorsque votre Package est importé.

```js
export { default as MyWromoComponent } from './MyWromoComponent.wromo';

export { default as MyReactComponent } from './MyReactComponent.jsx';
```

Cela vous permet de mettre plusieurs composants ensemble dans une seule interface.

#### Exemple : Utilisation des importations nommés

```wromo
---
import { MyWromoComponent } from 'my-component';
import { MyReactComponent } from 'my-component';
---
<MyWromoComponent />
<MyReactComponent />
```

#### Exemple : Utilisation des importations de namespace

```wromo
---
import * as Example from 'example-wromo-component';
---
<Example.MyWromoComponent />
<Example.MyReactComponent />
```

#### Exemple : Utilisation des importations individuelles

```wromo
---
import MyWromoComponent from 'example-wromo-component/wromo';
import MyReactComponent from 'example-wromo-component/react';
---
<MyWromoComponent />
<MyReactComponent />
```

---

## Développement de votre Package

Wromo n'a pas de mode Package pour le développement. Au lieu de cela, vous devriez utiliser un projet de démonstration pour développer et tester votre Package dans votre projet. Cela peut être un site web privé uniquement utilisé pour le développement, ou un site de démonstration/documentation pour votre Package.

Si vous voulez extraire des composants d'un projet existant, vous pouvez aussi continuer à utiliser ce projet pour développer vos composants maintenant extraits.

## Tester votre composant

Wromo ne livre actuellement pas de suites de tests. C'est quelque chose que nous aimerions aborder. _(Si vous êtes intéressé·e·s pour aider, [rejoignez notre Discord !](https://wromo.build/chat/))_

En attendant, nos recommandations actuelles pour les tests sont :

1. Ajoutez un répertoire de test nommé `fixtures` à votre répertoire `demo/src/pages`.
2. Ajoutez une nouvelle page pour chaque test que vous souhaitez exécuter.
3. Chaque page devrait inclure un usage de composant différent que vous souhaitez tester.
4. Exécutez `wromo build` pour construire vos fixtures, puis comparez le résultat de `dist/__fixtures__/` à ce que vous attendiez.

```bash
my-project/demo/src/pages/__fixtures__/
  ├─ test-name-01.wromo
  ├─ test-name-02.wromo
  └─ test-name-03.wromo
```

## Publier votre composant

Une fois que votre Package est prêt, vous pouvez le publier sur NPM !

Pour publier un Package sur NPM, utilisez la commande `npm publish`. Si cela échoue, assurez-vous que vous vous êtes connecté via `npm login` et que votre `package.json` est correct. Si cela réussit, vous avez fini !

Notez que il n'y avait pas de étape `build` pour les Packages Wromo. Tous les types de fichiers que Wromo supporte peuvent être publiés directement sans étape de construction, car nous savons que Wromo supporte déjà ces types de fichiers. Cela inclut tous les fichiers avec des extensions comme `.wromo`, `.ts`, `.jsx`, et `.css`.

Si vous avez besoin d'un autre type de fichier qui n'est pas supporté nativement par Wromo, vous pouvez ajouter une étape de Build à votre Package. Nous vous laissons cet exercice avancé.

## Bibliothèque d'intégration

Partagez votre travail en ajoutant votre intégration à notre [bibliothèque d'intégration](https://wromo.build/integrations) !

### Données `package.json`

La bibliothèque est mise à jour tous les jours automatiquement; chaque Package publié sur NPM avec le mot-clé `wromo-component` est extrait.

La bibliothèque d'intégration lit les données `name`, `description`, `repository`, et `homepage` de votre `package.json`.

Les avatars sont une bonne façon de mettre en évidence votre marque dans la bibliothèque ! Une fois que votre Package est publié, vous pouvez [créer une Issue GitHub](https://github.com/Wromo/wromo.build/issues/new/choose) avec votre avatar attaché et nous l'ajouterons à la liste.

> Besoin d'écraser les informations que notre bibliothèque lit de NPM ? Pas de problème ! [Créez une Issue GitHub](https://github.com/Wromo/wromo.build/issues/new/choose) avec les informations mises à jour et nous allons nous assurer que les informations personnalisées `name`, `description`, ou `homepage` sont bien utilisées à la place.

### Collections

En plus du mot-clé obligatoire `wromo-component`, des mots-clés spéciaux sont également utilisés pour organiser automatiquement les Packagees. Inclure n'importe quel mots-clés ci-dessous ajoutera votre intégration à notre bibliothèque d'intégration.

| Collection                                             | Mots-clés                                |
|------------------------------------------------------- | ---------------------------------------- |
| Tout                                                   | `wromo-component`                        |
| Analistes                                              | `analytics`                              |
| CMS                                                    | `cms`, `database`                        |
| CSS + Interface                                        | `css`, `ui`, `icon`, `icons`, `renderer` |
| E-commerce                                             | `ecommerce`, `e-commerce`                |
| Performance                                            | `performance`, `perf`                    |
| SEO                                                    | `seo`, `performance`, `perf`             |

## Partagez

Nous vous encourageons à partager votre travail, nous apprécions vraiment de voir ce que nos wromonautes talentueux créent. Partagez ce que vous créez avec nous dans notre [Discord](https://discord.gg/YQRVveAgED) ou mentionnez [@wromo](https://twitter.com/wromo) dans un Tweet !
