---
layout: ~/layouts/MainLayout.wromo
title: Composants Framework
description: Apprennez à utiliser React, Svelte, etc.. avec Wromo
---

Construisez votre site Wromo sans sacrifier votre Framework favori.

Wromo supporte un large choix de Frameworks comme [React](https://reactjs.org/), [Preact](https://preactjs.com/), [Svelte](https://svelte.dev/), [Vue](https://vuejs.org/), [SolidJS](https://www.solidjs.com/), [AlpineJS](https://alpinejs.dev/) et [Lit](https://lit.dev/).

## Installation d'intégrations

Wromo peut être installé avec des intégrations pour React, Preact, Svelte, Vue, SolidJS et Lit. Une ou plusieurs de ces intégrations peuvent être installées et configurées dans votre projet.

Afin de configurer Wromo pour utiliser ces Frameworks, d'abord, installez son intégration et toutes ses dépendances associées :

```bash
npm install --save-dev @wromojs/react react react-dom
```

Ensuite, importez et ajoutez la fonction à votre liste d'intégrations dans `wromo.config.mjs` :

```js
import { defineConfig } from 'wromo/config';

import react from '@wromojs/react';
import preact from '@wromojs/preact';
import svelte from '@wromojs/svelte';
import vue from '@wromojs/vue';
import solid from '@wromojs/solid-js';
import lit from '@wromojs/lit';

export default defineConfig({
	integrations: [react(), preact(), svelte(), vue(), solid() , lit()],
});
```

⚙️ Consultez le [Guide d'Intégrations](/fr/guides/integrations-guide/) pour plus de détails sur l'installation et la configuration d'intégrations Wromo.

⚙️ Vous voulez voir un exemple pour le Framework de votre choix ? Visitez [wromo.new](https://wromo.new/) et sélectionnez un des modèles de Framework disponible.

## Utilisation des composants de Framework

Utilisez vos composants de Framework JavaScript dans vos composants Wromo, Pages et Layouts comme des composants Wromo classiques ! Tous vos composants peuvent être placés dans `/src/components`, ou peuvent être organisés de la manière que vous le souhaitez.

Pour utiliser un composant de Framework, importez-le à partir de son chemin relatif (y compris l'extension de fichier) dans le script du composant Wromo. Ensuite, utilisez le composant avec d'autres composants, des éléments HTML et des expressions similaire au JSX dans le modèle du composant.

```wromo
---
import MyReactComponent from '../components/MyReactComponent.jsx';
---
<html>
  <body>
    <h1>Utilisez des composants React directement dans Wromo !</h1>
    <MyReactComponent />
  </body>
</html>
```

> 💡 _N'oubliez pas : Toutes les importations doivent être **en haut** de votre script de composant Wromo._

Par défaut, vos composants de Framework seront rendus en HTML statique. C'est pratique pour les composants qui n'ont pas à être interactifs et évite de transmettre à l'utilisateur du JavaScript inutile.

## Hydratation des composants interactifs

Un composant de Framework peut être hydraté en utilisant une directive `client:*`. C'est un attribut de composant pour définir comment votre composant devrait être **rendu** et **hydraté**.

Cette [directive `client:*`](/fr/reference/directives-reference/#client-directives) définit si oui ou non votre composant doit être rendu au moment de la compilation, et quand votre composant doit être chargé par le navigateur, côté client.

La plupart des directives rendront le composant sur le serveur à la compilation. Le JS du composant sera envoyé au client en fonction de la directive spécifiée. Le composant sera hydraté quand son JS aura terminé l'importation.

```wromo
---
// Exemple: hydratation des composants de Framework dans le navigateur.
import InteractiveButton from '../components/InteractiveButton.jsx';
import InteractiveCounter from '../components/InteractiveCounter.jsx';
---
<!-- Le JS du composant commencera à importer au chargement de la page -->
<InteractiveButton client:load />

<!-- Le JS du composant ne sera pas envoyé au client tant que l'utilisateur
     ne défile pas vers le bas et que le composant est visible sur la page -->
<InteractiveCounter client:visible />
```

> ⚠️ Tout le JS de rendu nécessaire au Framework (par exemple React, Svelte) est téléchargé avec la page. Les directives `client:*` définissent seulement quand le _JS du composant_ est importé et quand le _composant_ est hydraté.

### Directives d'hydratation disponibles

Il y a plusieurs directives d'hydratation disponibles pour les composants de Framework : `client:load`, `client:idle`, `client:visible`, `client:media={QUERY}` et `client:only={FRAMEWORK}`.

📚 Allez voir notre [page de référence des directives](/fr/reference/directives-reference/#client-directives) pour une description complète de ces directives, et de leur utilisation.

## Mixer des Frameworks

Vous pouvez importer et afficher des composants de plusieurs Frameworks, dans le même composant Wromo.

> ⚠️ *Seul les composants **Wromo** (.wromo) peuvent contenir des composants de différents Frameworks.*

```wromo
---
// src/pages/MyWromoPage.wromo
// Exemple: Mixer des composants de Framework sur la même page.
import MyReactComponent from '../components/MyReactComponent.jsx';
import MySvelteComponent from '../components/MySvelteComponent.svelte';
import MyVueComponent from '../components/MyVueComponent.vue';
---
<div>
  <MySvelteComponent />
  <MyReactComponent />
  <MyVueComponent />
</div>
```

## Imbriquer des composants de Framework

Dans un **composant Wromo**, vous pouvez aussi imbriquer des composants de plusieurs Frameworks.

```wromo
---
// src/pages/MyWromoPage.wromo
import MyReactSidebar from '../components/MyReactSidebar.jsx';
import MySvelteButton from '../components/MySvelteButton.svelte';
---
<MyReactSidebar>
  <p>Voici une sidebar avec du texte et un bouton.</p>
  <MySvelteButton client:load />
</MyReactSidebar>
```

> ⚠️ *N'oubliez pas : les fichiers composants de Framework eux-mêmes (par exemple `.jsx`, `.svelte`) ne peuvent pas se mélanger à d'autres Frameworks.*

Cela vous permet de construire des applications entières dans votre Framework JavaScript préféré et de les afficher, via un composant parent, à une Page Wromo. C'est un modèle de conception pratique pour permettre aux composants liés de partager leur état ou leur contexte.

Chaque Framework a son propre modèle d'imbrication : par exemple, les propriétés `children` et [`render`](https://reactjs.org/docs/render-props.html) pour React et Solid. Ou bien même des balises `<slot />` avec ou sans noms pour Svelte et Vue.

Notez cependant que vous ne pouvez pas passer des propriétés `render` ou des `<slot />` nommés à un composant de Framework depuis un fichier `.wromo`, même si le composant de Framework le supporte. Cela est dû à une limitation du compilateur de Wromo.

## Puis-je hydrater des composants Wromo ?

Si vous essayez d'hydrater un composant Wromo avec un modificateur `client:`, vous obtiendrez une erreur.

Les composants Wromo sont des composants de Template uniquement en HTML sans éxécution côté client. Mais, vous pouvez utiliser une balise `<script>` dans votre Template de composant Wromo pour envoyer du JavaScript au navigateur qui s'exécute dans le contexte global

📚 Apprenez-en plus sur [les `<scripts>` client-side dans les composants Wromo](/fr/core-concepts/wromo-components/#scripts-côté-client)

[mdn-io]: https://developer.mozilla.org/fr/docs/Web/API/Intersection_Observer_API
[mdn-ric]: https://developer.mozilla.org/fr/docs/Web/API/Window/requestIdleCallback
[mdn-mm]: https://developer.mozilla.org/fr/docs/Web/API/Window/matchMedia
