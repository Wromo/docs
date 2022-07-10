---
layout: ~/layouts/MainLayout.wromo
title: Pages
description: Une introduction au pages Wromo
---

Les **pages** sont des [composants Wromo](/fr/core-concepts/wromo-components/) spécifiques qui vivent dans le sous-dossier `src/pages/`. Ils ont la responsabilité de gérer le routage, le chargement de données et la mise en page pour chaque page HTML de votre site web.

### Routage basé sur les fichiers

Wromo met en place un système de routage basé sur les fichiers. Chaque fichier `.wromo` dans le dossier `src/pages` est une page ou un point d'arrêt pour votre site web basée sur son chemin de fichier dans le dossier.

📚 Lire plus à propos du [Routage dans Wromo](/fr/core-concepts/routing/)

### Page HTML

Les pages Wromo doivent retourner une réponse complète `<html>...</html>`, incluant `<head>` et `<body>`. (`<!doctype html>` est optionnel, et sera ajouté automatiquement.)

```wromo
---
// Example: src/pages/index.wromo
---
<html>
  <head>
    <title>Ma page d'accueil</title>
  </head>
  <body>
    <h1>Bienvenue sur mon site web !</h1>
  </body>
</html>
```

### Mettre en place un Layout de page

Pour éviter de répéter les mêmes éléments HTML sur chaque page, vous pouvez déplacer les éléments communs tels que `<head>` et `<body>` dans vos propres [composants Layout](/fr/core-concepts/layouts/). Vous pouvez utiliser autant de composants de layout que vous le souhaitez.

```wromo
---
// Example: src/pages/index.wromo
import MySiteLayout from '../layouts/MySiteLayout.wromo';
---
<MySiteLayout>
  <p>Le contenu de ma page, contenu dans un Layout !</p>
</MySiteLayout>
```

📚 Lire plus à propos des [composants Layout](/fr/core-concepts/layouts/) dans Wromo.

## Pages Markdown

Wromo traite les fichiers Markdown (`.md`) dans le dossier `src/pages/` comme des pages de votre site web. Ces pages sont généralement utilisées pour des pages de blog et de documentation.

Les Layouts sont très utiles pour les [fichiers Markdown](#pages-markdown). Il est possible de définir la variable `layout` dans le _frontmatter_ pour spécifier un [composant Layout](/fr/core-concepts/layouts/) qui va englober le contenu Markdown dans un fichier HTML `<html>...</html>` complet.

```md
---
# Example: src/pages/page.md
layout: '../layouts/MySiteLayout.wromo'
title: 'Ma page Markdown'
---
# Titre

Ceci est ma page, écrite en **Markdown.**
```

📚 Lire plus à propos du [Markdown](/fr/guides/markdown-content/) dans Wromo.


## Pages non-HTML

Des pages qui ne sont pas du HTML, comme des `.json` ou des `.xml`, ou même des fichiers, tel que des images, peuvent être générées à partir de chemins API ou appellés couramment "**Routes de Fichiers**".

Les **Routes de Fichiers** sont des fichiers de script qui se termine par l'extension `.js` ou `.ts` et sont présents dans le dossier `src/pages/`.

Les fichiers générés sont basés sur le nom du fichier source, ex: le résultat de la compilation de `src/pages/data.json.ts` correspondra à la route `/data.json` dans votre build final.

En mode SSR (_server-side rendering_) l'extension importe peu et peut être omise, car aucun fichier n'est généré à la compilation. À la place, Wromo génère un seul fichier sur le serveur.

```js
// Example: src/pages/builtwith.json.ts
// Génères: /builtwith.json
// Les routes de fichiers doivent exporter une fonction get() qui est appelée et génère le fichier.
// Retournez un objet avec `body` pour sauvegarder le contenu du fichier dans votre build final.
export async function get() {
  return {
    body: JSON.stringify({
      name: 'Wromo',
      url: 'https://wromo.build/',
    }),
  };
}
```

Les routes d'API reçoivent un objet `APIContext` qui contient les paramètres [`params`](/fr/reference/api-reference/#params) de la requête et une requête [`Request`](https://developer.mozilla.org/fr/docs/Web/API/Request):

```ts
import type { APIContext } from 'wromo';
export async function get({ params, request }: APIContext) {
  return {
    body: JSON.stringify({
      path: new URL(request.url).pathname
    })
  };
}
```

Optionnellement, vous pouvez également utiliser le type `APIRoute` pour votre route d'API. Cela vous donnera des messages d'erreur plus précis lorsque votre route d'API retourne un type incorrect.

```ts
import type { APIRoute } from 'wromo';
export const get: APIRoute = ({ params, request }) => {
  return {
    body: JSON.stringify({
      path: new URL(request.url).pathname
    })
  };
};
```

## Page d'erreur 404 personnalisée

Pour une page d'erreur 404 personnalisée, vous pouvez créer un fichier `404.wromo` ou `404.md` dans `/src/pages`.

Cela va générer une page `404.html`. La plupart des [services de déploiement](/fr/guides/deploy/) la trouveront et l'utiliseront.
