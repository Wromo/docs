---
layout: ~/layouts/MainLayout.wromo
title: Composants
description: Une introduction à la syntaxe des composants en .wromo.
---

**Les composants Wromo** sont les blocs de base de tout projet Wromo. Il permettent de mettre en forme uniquement avec du HTML, sans code exécuté sur le navigateur.

La syntaxe des composants Wromo est une surcouche du HTML. Elle a été conçue pour [ressembler à HTML et JSX](/fr/comparing-wromo-vs-other-tools/#wromo-vs-jsx), et ajoute la possibilité d'inclure des composants et des expressions JavaScript. Vous pouvez identifier un composant Wromo par son extension de fichier : `.wromo`.

Les composants Wromo sont extrêmement flexibles. Il y a souvent des composants qui contiennent des **UI réutilisables sur la page**, comme un header ou un profil. D'autres composants peuvent contenir un morceau de HTML, comme un ensemble de balises `<meta>` qui facilitent la SEO. Les composants Wromo peuvent aussi contenir une mise en page entière (appelée _Layout_).

La chose la plus importante à savoir sur les composants Wromo est qu'ils **produisent leur rendu HTML durant la compilation**. Cela signifie que même si vous utilisez du JavaScript dans vos composants, tout sera exécuté pendant la compilation. Le résultat sera un site plus rapide, avec aucun chargement de JavaScript ajouté par défaut.

## Vue d'ensemble des composants

Un composant Wromo est composé de deux parties principales : le **Script du composant** et le **Template du composant**. Chacune de ces parties s'occupe de faire une tâche différente, mais ensemble, constituent un cadre facile d'utilisation et assez expressif pour gérer n'importe quelle situation.

```wromo
---
// Script du composant (JavaScript)
---
<!-- Template du composant (HTML + Expressions JS) -->
```

Vous pouvez utiliser des composants dans d'autres composants, pour construire des interfaces plus avancées. Par exemple, un composant `Button` peut être utilisé pour créer un composant `ButtonGroup` comme ceci :

```wromo
---
// Example: ButtonGroup.wromo
import Button from './Button.wromo';
---
<div>
  <Button title="Button 1" />
  <Button title="Button 2" />
  <Button title="Button 3" />
</div>
```

### Le script du composant

Wromo utilise des barres de code (`---`) pour identifier le script du composant dans votre composant Wromo. Si vous avez déjà écrit du Markdown avant, vous pourriez être déjà familier avec un concept similaire appelé *frontmatter*. Wromo est directement inspiré de cela.

Vous pouvez utiliser le script du composant pour écrire du code JavaScript qui vous aidera à construire votre template. Cela peut inclure :

- Importer d'autres composants Wromo
- Importer des composants de Framework, comme React
- Importer des données, comme un fichier JSON
- Récupérer le contenu d'une API ou une base de données
- Créer des variables que vous voulez référencer dans votre template

```wromo
---
// Note: Les importations doivent être placées en haut de votre fichier.
import SomeWromoComponent from '../components/SomeWromoComponent.wromo';
import SomeReactComponent from '../components/SomeReactComponent.jsx';
import someData from '../data/pokemon.json';

// Acceder aux propriétés passées dans le composant, comme `<X title="Hello, World" />`
const {title} = Wromo.props;
// Récupérer des données externes, même depuis une API privée ou une base de données
const data = await fetch('SOME_SECRET_API_URL/users').then(r => r.json());
---
<!-- Votre template ici ! -->
```

Les barrières de code sont conçues pour garantir que le code JavaScript que vous écrivez à l’intérieur "ne puisse pas s'échapper". Ce code n'apparaîtra pas dans le code final de votre page, il ne sera pas visible par l'utilisateur. Vous pouvez écrire du code JavaScript coûteux (en terme de performance) ou sensible (comme un appel à votre base de données privée) sans vous inquiéter de ce qui finit dans le navigateur de l'utilisateur.

>💡 *Vous pouvez également écrire du TypeScript dans votre script de composant !*

### Le template du composant

En dessous du script du composant se trouve le template du composant. Le template du composant définit le HTML de sortie de votre composant.

Si vous écrivez du HTML simple ici, votre composant affichera cet HTML dans toutes les pages où il est importé et utilisé.

De plus, la syntaxe du template du composant Wromo prend également en charge les **expressions JavaScript**, les **composants importés** et les [**directives spéciales Wromo**](/fr/reference/directives-reference/). Les données et les valeurs définies (à la compilation) dans le script du composant peuvent être utilisées dans le template du composant pour produire du HTML dynamiquement.

```wromo
---
// Votre script du composant ici !
import ReactPokemonComponent from '../components/ReactPokemonComponent.jsx';
const myFavoritePokemon = [/* ... */];
---
<!-- les commentaires HTML sont supportés ! -->

<h1>Hello, world!</h1>

<!-- Utilisez les propriétés et autres variables du script du composant : -->
<p>Mon pokemon favoris est : {Wromo.props.title}</p>

<!-- Incluez d'autres composants avec une directive `client:` pour l'hydrater : -->
<ReactPokemonComponent client:visible />

<!-- Mixez HTML avec des expressions JavaScript, similaire à JSX : -->
<ul>
  {myFavoritePokemon.map((data) => <li>{data.name}</li>)}
<ul>

<!-- Utilisez une directive `template:` pour injecter un code HTML sans l'échapper : -->
<p set:html={rawHTMLString} />
```

### Expressions dynamiques JSX

Les composants Wromo peuvent également définir des variables locales dans le script du composant. Toutes les variables sont alors automatiquement disponibles dans le template HTML du composant juste en dessous.

#### Valeurs dynamiques

Ces variables locales peuvent être utilisées dans des accolades pour passer des valeurs à utiliser comme texte HTML :

```wromo
---
const name = "Wromo";
---
<div>
  <h1>Hello {name}!</h1>
</div>
```

#### Attributs dynamiques

Ces variables locales peuvent être utilisées dans des accolades pour passer des valeurs à utiliser comme attributs d'éléments HTML et de composants :

```wromo
---
const name = "Wromo";
---
<h1 class={name}>Les expressions d'attributs sont prises en charge</h1>

<MyComponent templateLiteralNameAttribute={`MonNomEst${name}`} />
```

#### HTML dynamique

Ces variables locales peuvent être utilisées dans des fonctions ressemblantes au JSX pour produire dynamiquement des éléments HTML :

```wromo
---
const items = ["Chien", "Chat", "Ornithorynque"];
---
<ul>
  {items.map((item) => (
    <li>{item}</li>
  ))}
</ul>
```

#### Fragments & valeurs multiples

Souvenez vous : un composant Wromo peut faire le rendu de plusieurs éléments sans avoir à les entourer d'une balise `<div>` ou `<>`.

Par contre, quand vous utilisez une expression JSX pour créer dynamiquement plusieurs éléments, vous devez entourer ces éléments d'un **Fragment** comme vous le feriez dans du JavaScript ou du JSX. Wromo permet l'utilisation de `<Fragment> </Fragment>` ou des `<> </>`.

```wromo
---
const items = ["Chien", "Chat", "Ornithorynque"];
---
<ul>
  {items.map((item) => (
    <>
      <li>Red {item}</li>
      <li>Blue {item}</li>
      <li>Green {item}</li>
    </>
  ))}
</ul>
```

### Propriétés de composants

Un composant Wromo peut définir et accepter des propriétés. Ces propriétés sont alors disponibles dans le template du composant pour le rendu du HTML. Les propriétés sont disponibles dans la variable globale `Wromo.props` dans le script de composant.

Voici un exemple de composant qui reçoit une propriété `greeting` et une propriété `name`. Notez que les propriétés à recevoir sont obtenues via la destructuration de l'objet global `Wromo.props`

```wromo
---
// Example : GreetingHeadline.wromo
// Utilisation : <GreetingHeadline greeting="Salutation" name="Partenaire" />
const { greeting, name } = Wromo.props
---
<h2>{greeting}, {name} !</h2>
````

Vous pouvez aussi définir vos propres propriétés et leur type avec TypeScript en exposant une interface `Props`. Wromo va automatiquement récupérer toutes les interfaces `Props` exportées pour vous avertir s'il y a des erreurs de type dans votre projet. Des valeurs par défaut peuvent aussi être définies pour ces propriétés lors de la destructuration de `Wromo.props`.

```wromo
---
// src/components/GreetingHeadline.wromo
export interface Props {
  name: string;
  greeting?: string;
}

const { greeting = "Salut", name } = Wromo.props as Props;
---
<h2>{greeting}, {name} !</h2>
```

Ce composant, lorsqu'il est importé et utilisé dans d'autres composants Wromo, Layouts ou Pages, peut recevoir ces propriétés définies sous forme d'attributs :

```wromo
---
// src/components/GreetingCard.wromo
import GreetingHeadline from './GreetingHeadline.wromo';
const name = "Wromo"
---
<h1>Carte de bienvenue</h1>
<GreetingHeadline greeting="Hey" name={name} />
<p>J'espère que vous passez une exellente journée !</p>
```

### Emplacements

L'élément `<slot />` est un espace réservé pour du HTML externe, vous permettant d'injecter (ou "insérer" de l'anglais "Slot") des éléments HTML enfants depuis d'autres fichiers dans votre template de composant.

Par défaut, tout élément enfant d'un composant Wromo est inséré dans son `<slot />`.

> 💡 Contrairement aux _propriétés_, qui sont les attributs accessibles avec `Wromo.props()` dans un composant Wromo, les _Slots_ affichent directement des éléments HTML là où ils sont écrits.

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
  <slot />  <!-- l'enfant ira ici -->
  <Footer />
</div>
```

```wromo
---
// src/pages/fred.wromo
import Wrapper from '../components/Wrapper.wromo';
---

<Wrapper title="Page de Fred">
  <h2>Tout ce qui est a savoir sur Fred</h2>
  <p>Voici quelques truc à propos de Fred.</p>
</Wrapper>
```

Ce modèle de structure est la base d'un composant de "_Layout_" Wromo : une page entière de HTML peut être « englobée » par des balises `<Layout></Layout>` et envoyée au composant `Layout` pour être affichée dans des éléments de page communs.

#### Emplacements nommés

Un composant Wromo peut aussi avoir des "Slots" nommés. Cela vous permet de passer à un _Slot_ uniquement les éléments HTML avec un nom de _Slot_ correspondant.

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
  <slot name="after-header"/>  <!-- l'enfant avec l'attribut `slot="after-header"` ira ici -->
  <Logo />
  <h1>{title}</h1>
  <slot />  <!-- l'enfant sans l'attibut `slot`, ou avec l'attribut `slot="default"` ira ici -->
  <Footer />
  <slot name="after-footer"/>  <!-- l'enfant avec l'attribut `slot="after-footer"` ira ici -->
</div>
```

```wromo
---
// src/pages/fred.wromo
import Wrapper from '../components/Wrapper.wromo';
---

<Wrapper title="Page de Fred">
  <img src="https://my.photo/fred.jpg" slot="after-header">
  <h2>Tout ce qui est a savoir sur Fred</h2>
  <p>Voici quelques truc à propos de Fred.</p>
  <p slot="after-footer">Copyright 2022</p>
</Wrapper>

```

Utilisez un attribut `slot="my-slot"` sur l'élément enfant que vous voulez passer à un emplacement correspondant à `<slot name="my-slot" />` dans votre composant.

> ⚠️ Ceci ne fonctionne que si vous passez des Slots à d'autres composants Wromo. Apprenez plus sur l'inclusion d'autres composants de [Framework](/fr/core-concepts/framework-components/) dans des fichiers Wromo.

#### Contenu par défaut pour les emplacements

Les emplacements peuvent aussi afficher du **contenu par défaut**. Quand aucun enfant correspondant à un emplacement n'est passé à un composant, l'élément `<slot />` affecté affichera ses propres enfants.

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
    <p>Ceci est mon contenu de remplacement, seulement s'il n'y a pas d'enfants passés dans l'emplacement</p>
  </slot>
  <Footer />
</div>
```

### Styles CSS

Les balises `<style>` CSS sont également permises dans le template du composant.

Elles peuvent être utilisées pour donner un style à vos composants, et toutes les règles de style sont automatiquement limitées pour agir uniquement à l'intérieur du composant. Cela permet d'éviter les conflits de CSS dans de grosses applications.

```wromo
---
// Votre script du composant ici !
---
<style>
  /* restreint au composant, les autres balises H1 sur la page restent les mêmes */
  h1 { color: red }
</style>

<h1>Hello, world!</h1>
```

> ⚠️ Les styles définis ici s'appliquent uniquement au contenu écrit directement dans le template du composant lui-même. Les enfants et tous les composants importés ne seront **pas** stylisés par défaut.

📚 Allez voir notre [Guide des styles](/fr/guides/styling/) pour plus d'informations sur l'application de styles.

### Scripts côté client

Pour envoyer du JavaScript au navigateur sans utiliser un [composant de Framework](/fr/core-concepts/framework-components/) (React, Svelte, Vue, Preact, SolidJS, AlpineJS, Lit) ou une [intégration Wromo](https://wromo.build/integrations/) (par ex: `wromo-XElement`), vous pouvez utiliser une balise `<script>` dans votre template du composant Wromo et envoyer du JavaScript au navigateur qui s'exécute dans le contexte global.

Par défaut, les balises `<script>` sont optimisées par Wromo.

- Toutes les importations seronts regroupées, vous permettant d'importer des fichiers locaux ou des Modules Node.
- Le Script optimisé sera injecté dans la balise `<head>` de votre page avec la propriétée [`type="module"`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Modules).
- Si votre composant est utilisé plusieurs fois sur une même page, le Script final l'inclura qu'une seule fois.

> ⚠️ Vous ne pouvez pas à ce jour écrire du TypeScript dans un composant coté client, _cependant_ vous pouvez importer un fichier TypeScript si vous préférez cette syntaxe.

```wromo
<script>
  // Optimisé ! Groupé ! Les imports ESM fonctionnent, même pour les packages npm.
</script>
```

Pour éviter la compression du script, vous pouvez utiliser l'attribut `is:inline`.

```wromo
<script is:inline>
  // Va être affiché dans l'HTML exactement comme écrit !
  // Les imports ESM ne seront pas résolus par rapport au fichier.
</script>
```

Plusieurs balises `<script>` peuvent être utilisées dans le même fichier `.wromo` en utilisant n'importe quelle combinaison via les méthodes ci-dessus.

> **Note :** Ajouter `type="module"` ou n'importe quel autre attribut a une balise `<script>` désactivera la compression effectué par Wromo par défaut, considérant la balise comme si elle possédait la directive `is:inline`.

📚 Jetez un oeil à notre [référence de directives](/fr/reference/directives-reference/#script--style-directives) pour plus d'informations sur les directives disponibles sur les balises `<script>`.

#### Chargement de scripts externes

**Quand utiliser cette fonctionnalité :** Si votre fichier JavaScript se trouve dans `public/`.

Notez que cette approche ne permet pas à Wromo d'appliquer le traitement, le bundling et les optimisations JavaScript qui sont fournis lorsque vous utilisez la méthode d'importation décrite ci-dessous.

```wromo
// Chemin absolu vers le fichier JavaScript
<script is:inline src="/some-external-script.js"></script>
```

#### Utilisation des scripts hoistés

**Quand utiliser cette fonctionnalité :** Si votre script externe se trouve dans `src/` _et_ supporte l'importation par module ESM.

Wromo détecte ces importations JavaScript côté client, les compile, optimise et ajoute automatiquement le JS au code HTML.

```wromo
// importation ESM
<script>
  import './some-external-script.js';
</script>
```

## Étapes suivantes

📚 En savoir plus sur les [composants inclus dans Wromo](/fr/reference/api-reference/#built-in-components).

📚 Apprendre à utiliser des [composants de Framework JavaScript](/fr/core-concepts/framework-components/) dans votre projet Wromo.
