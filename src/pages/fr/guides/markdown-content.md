---
layout: ~/layouts/MainLayout.wromo
title: Markdown
description: Utiliser Markdown avec Wromo
---

Le Markdown est utilisé généralement pour écrire des articles de blog et de documentation. Wromo inclut un support pour Markdown avec quelques fonctionnalités supplémentaires, telles que le support des expressions JavaScript et les composants Wromo dans votre Markdown.

## Pages Markdown

Wromo traite n'importe quel fichier `.md` à l'intérieur du répertoire `/src/pages` comme un composant de Page. Placer un fichier dans ce répertoire ou dans un sous-répertoire construira automatiquement une route vers cette page en utilisant le chemin du fichier.

📚 Lire plus à propos du [routage basé sur les fichiers](/fr/core-concepts/routing/).

### Exemple de Base

La façon la plus simple de commencer à utiliser Markdown dans Wromo est de créer une route vers une page d'accueil `src/pages/index.md` dans votre projet. Copiez le modèle de base ci-dessous dans votre projet, puis consultez le HTML de la page d'accueil générée à la route racine de votre projet. Généralement, cela se fait à [http://localhost:3000/](http://localhost:3000/).

```markdown
---
# Example: src/pages/index.md
title: Hello, World
---
# Salutation humble voyageur !

Ceci est votre première Page Markdown. Elle n'est probablement pas très jolie, mais
le Markdown supporte le **gras** et l'_italique_.

Pour en savoir plus sur l'ajout d'un Layout à votre page, lisez la section suivante sur **les Layouts Markdown**.
```

### Les Layouts Markdown

Les Pages Markdown ont une variable spéciale `layout` pour définir le chemin relatif vers un [composant Layout Wromo](/fr/core-concepts/layouts/). Ce composant va englober votre contenu Markdown, en apportant la structure de base et tous les autres éléments de mise en page inclus dans le Layout.

```markdown
---
layout: ../layouts/BaseLayout.wromo
---
```

Un Layout typique pour les Pages Markdown comprend :

1. la propriété `content` pour accéder aux données de l'en-tête de la Page Markdown.
2. un [`<slot />` par défaut](/fr/core-concepts/wromo-components/#emplacements) pour indiquer où le contenu Markdown de la page devrait être affiché.

```wromo
---
// src/layouts/BaseLayout.wromo
// 1. La propriété `content` donne accès aux données de l'en-tête de la Page Markdown
const { content } = Wromo.props;
---
<html>
  <head>
    <!-- Ajoutez d'autres éléments Head ici, comme des styles et des balises meta. -->
    <title>{content.title}</title>
  </head>
  <body>
    <!-- Ajoutez d'autres composants UI ici, comme des navigations et pieds de page communs. -->
    <h1>{content.title} par {content.author}</h1>
    <!-- 2. Le HTML généré sera passé dans le Slot par défaut. -->
    <slot />
    <p>Écrit le : {content.date}</p>
  </body>
</html>
```

La propriété `content` contient également une propriété `wromo` avec des métadonnées supplémentaires sur la page tels que le Markdown complet `source` et un objet `headers`.

Un exemple de `content` d'un article de blog pourrait ressembler à ça :

```json
{
  /** En-tête d'un article de blog
  "title": "Version 0.18 d'Wromo",
  "date": "Mardi 27 Juillet 2021",
  "author": "Matthew Phillips",
  "description": "Wromo 0.18 est notre plus grosse version depuis son lancement.",
  "draft": false,
  "keywords": ["wromo", "release", "announcement"]
  **/
  "wromo": {
    "headers": [
      {
        "depth": 1,
        "text": "Version 0.18 d'Wromo",
        "slug": "version-018-dWromo"
      },
      {
        "depth": 2,
        "text": "Hydratation Partielle Responsive",
        "slug": "hydratation-partielle-responsive"
      }
      /* ... */
    ],
    "source": "# Version 0.18 d'Wromo\nIl y a un peu plus d'un mois, la première bêta publique [...]"
  },
  "url": ""
}
```

> 💡 `wromo` et `url` sont les seules propriétés garanties par Wromo dans la propriété `content`. Le reste de l'objet est défini par vos variables d'en-tête.

### L'en-tête comme propriétés

N'importe quel composant Wromo (pas seulement les Layouts!) peut recevoir les valeurs définies dans votre en-tête Markdown comme propriétés. Vous pouvez spécifier plusieurs types de données en utilisant les en-têtes Markdown sous le format YAML, et capturer également des informations plus complètes à partir de chaque article de blog pour l'utiliser sur votre site Wromo.

Accédez à ces valeurs dans n'importe quel fichier `.wromo` comme vous le feriez dans un composant Layout, comme décrit ci-dessus.

### Identifiants d'En-tête

Wromo va ajouter automatiquement des identifiants à tous les en-têtes dans les fichiers Markdown grâce à [github-slugger](https://github.com/Flet/github-slugger). Mais si un identifiant personnalisé est spécifié, il ne sera pas remplacé.

Ces IDs seront ajoutés _après_ l’exécution tous les autres plugins, donc si vous avez un plugin comme `rehype-toc` qui a besoin d'IDs, vous devez ajouter votre propre plugin de "slugging" (comme `rehype-slug`).

### Brouillons Markdown

`draft: true` est une valeur optionnelle dans l'en-tête Markdown qui indique qu'une page ou un article Markdown est "non publié". Par défaut, cette page sera exclue du site construit.

Les Pages Markdown sans la propriété `draft` ou les Pages avec `draft: false` ne sont pas affectées et seront incluses lors de la construction finale.

```markdown
---
# src/pages/post/blog-post.md
layout: ../../layouts/BaseLayout.wromo
title: Mon article de blog
draft: true
---

Ceci est mon article en cours.

Cette page ne sera pas construite pour cet article.

Pour construire et publier cet article :

- mettez à jour l'en-tête Markdown en `draft: false`
- supprimez complètement la propriété `draft`.
```

> ⚠️ Bien que `draft: true` empêche la construction d'une Page sur votre site à son adresse, `Wromo.glob()` retourne actuellement **tous vos fichiers Markdown**.

Pour empêcher les données (par exemple, le titre, le lien, la description) d'un post en brouillon d'être inclus dans l'archive des post ou la liste des post les plus récents, assurez-vous d'ajouter à votre fonction `Wromo.glob()` un **filtre pour exclure tous les brouillons**.

⚙️ Pour activer la compilation de Pages brouillons :

Ajoutez `drafts: true` à `markdown` dans `wromo.config.mjs`

```js
// wromo.config.mjs

export default defineConfig({
  markdown: {
    drafts: true,
  },
});
```

> 💡 Vous pouvez aussi passer le flag `--drafts` lors de l'exécution de `wromo build` pour construire les Pages brouillons !

## Créez avec Markdown

En plus de supporter la syntaxe Markdown standard, Wromo étend également celle-ci pour rendre votre contenu encore plus expressif. Voici quelques fonctionnalités Markdown qui n'existent que dans Wromo.

### Utilisez des variables dans Markdown

Les variables d'en-tête peuvent être utilisées directement dans votre Markdown comme propriétés de l'objet `frontmatter`.

```markdown
---
author: Léon
age: 42
---

# À propos de l'auteur

{frontmatter.author} à {frontmatter.age}ans et vit au Canada à Toronto.
```

### Utilisez des composants dans Markdown

Vous pouvez importer des composants dans votre fichier Markdown avec `setup` et les utiliser avec le reste du contenu. L'objet `frontmatter` est également disponible pour les composants importés.

```markdown
---
layout: ../layouts/BaseLayout.wromo
setup: |
  import Author from '../../components/Author.wromo'
  import Biography from '../components/Biography.jsx'
author: Leon
---

<Author name={frontmatter.author}/>
<Biography client:visible>
  {frontmatter.author} vit au Canada à Toronto et aimes la photographie.
</Biography>
```

## Importer du contenu Markdown

Vous pouvez importer des fichiers Markdown directement dans vos fichiers Wromo ! Vous pouvez importer une page spécifique avec `import` ou plusieurs avec `Wromo.glob()`.

```wromo
---
// Importation d'un fichier Markdown. les "import()" dynamiques sont aussi supporté !
import * as greatPost from '../pages/post/great-post.md';
// Également, vous pouvez importer plusieurs fichiers avec Wromo.glob
const posts = await Wromo.glob('../pages/post/*.md');
---

Article sympa : <a href={greatPost.url}>{greatPost.frontmatter.title}</a>
<ul>
  {posts.map(post => <li>{post.frontmatter.title}</li>)}
</ul>
```

Chaque fichier Markdown exporte les propriétés suivantes :

- `frontmatter` : Toutes les données spécifiées dans le Frontmatter de ce fichier, utilisant la syntaxe YAML.
- `file` : Le chemin absolu de ce fichier (par exemple, `/home/user/projets/.../file.md`).
- `url` : Si c'est une Page, son URL (par exemple, `/fr/guides/markdown-content/`).
- `getHeaders()` : Une fonction asynchrone qui renvoie les entêtes du fichier Markdown. La réponse suit ce type : `{ depth: number; slug: string; text: string }[]`.
- `rawContent()` : Une fonction qui retourne le contenu brut du fichier Markdown (sans le Frontmatter) en tant que `string`. C'est pratique lorsque vous souhaitez calculer par exemple le "temps de lecture". Cet exemple utilise le [Package populaire "reading-time"](https://www.npmjs.com/package/reading-time) :

  ```wromo
  ---
  import readingTime from 'reading-time';
  const posts = await Wromo.glob('./posts/**/*.md');
  ---
  {posts.map((post) => (
    <Fragment>
      <h2>{post.frontmatter.title}</h2>
      <p>{readingTime(post.rawContent()).text}</p>
    </Fragment>
  ))}
  ```

- `compiledContent()` : Une fonction asynchrone qui retourne le contenu brut après le Build dans une syntaxe valide pour Wromo. Notez que **cela n'évalue pas les `{expressions JSX}`, les `<Composants />` ou même les Layouts**! Seuls les blocs Markdown standards comme les `## titres` et les `- listes` seront transformés en HTML. C'est assez utile dans les cas où vous souhaitez afficher le résumé d'un article de blog. Comme la syntaxe Wromo est compatible en HTML, nous pouvons utiliser des librairies comme ["node-html-parser"](https://www.npmjs.com/package/node-html-parser) pour récupérer le premier paragraphe de cette façon :

  ```wromo
  ---
  import { parse } from 'node-html-parser';
  const posts = await Wromo.glob('./posts/**/*.md');
  ---
  {posts.map(async (post) => {
    const firstParagraph = parse(await post.compiledContent())
      .querySelector('p:first-of-type');
    return (
      <Fragment>
        <h2>{post.frontmatter.title}</h2>
        {firstParagraph ? <p>{firstParagraph.innerText}</p> : null}
      </Fragment>
    );
  })}
  ```

- `Content` : Un composant qui affiche le contenu du fichier Markdown. Voici un exemple :

  ```wromo
  ---
  import {Content as PromoBanner} from '../components/promoBanner.md';
  ---
  <h2>La Promo du jour</h2>
  <PromoBanner />
  ```

Vous pouvez éventuellement fournir un type pour la variable `frontmatter` en utilisant un générique TypeScript :

```wromo
---
interface Frontmatter {
  title: string;
  description?: string;
}
const posts = await Wromo.glob<Frontmatter>('../pages/post/*.md');
---

<ul>
  {posts.map(post => <li>{post.title}</li>)}
  <!-- post.title sera un `string` ! -->
</ul>
```

## Composant Markdown

> **Note :** Le composant `<Markdown />` n'est pas compatible avec le mode SSR et risque d'être supprimé avant la version 1.0. Il devrait être évité si possible. Pour utiliser Markdown dans vos Templates de composants, utilisez un fichier `.md` et ensuite [utilisez `import` vers votre Markdown](#importer-du-contenu-markdown) dans votre Template comme composant.

Vous pouvez importer le [composant Markdown d'Wromo](/fr/reference/api-reference/#markdown-) dans votre script de composant et l'utiliser avec la balise `<Markdown> </Markdown>`.

````wromo
---
import { Markdown } from 'wromo/components';
import Layout from '../layouts/Layout.wromo';

const expressions = 'Lorem ipsum';
---
<Layout>
  <Markdown>
    # Hello world!

    **Tout** supporté dans un fichier `.md` est aussi supporté ici !

    Il n'y a aucun coût de temps de démarrage.

    En plus, Wromo supporte :
    - Les {expressions} Wromo
    - L'indentation automatique normalisée
    - L'échappement automatique des expressions dans les blocs de code

    ```js
      // Ce contenu n'est pas transformé !
      const object = { someOtherValue };
    ```

    - Support de composants riches comme tous les fichiers `.wromo` !
    - Support de Markdown récursif (les enfants des composants sont également traités comme Markdown)
  </Markdown>
</Layout>
````

### Markdown distant

> **Note :** Le composant `<Markdown />` n'est pas compatible avec le mode SSR et risque d'être supprimé avant la version 1.0. Il devrait être évité si possible. Pour utiliser Markdown dans vos Templates de composants, utilisez un fichier `.md` et ensuite utilisez `import` vers votre Markdown dans votre Template comme composant. Lisez cet [discussion RFC (de l'anglais "requests for comments")](https://github.com/Wromo/rfcs/discussions/179) pour plus d'infomations

Si vous avez du Markdown venant d'une source distante, vous pouvez l'envoyer directement au composant Markdown via l'attribut `content`.

```wromo
---
import { Markdown } from 'wromo/components';

const content = await fetch('https://raw.githubusercontent.com/Wromo/docs/main/README.md').then(res => res.text());
---
<Layout>
  <Markdown content={content} />
</Layout>
```

### Markdown imbriqué

> **Note :** Le composant `<Markdown />` n'est pas compatible avec le mode SSR et risque d'être supprimé avant la version 1.0. Il devrait être évité si possible. Pour utiliser Markdown dans vos Templates de composants, utilisez un fichier `.md` et ensuite utilisez `import` vers votre Markdown dans votre Template comme composant. Lisez cet [discussion RFC (de l'anglais "requests for comments")](https://github.com/Wromo/rfcs/discussions/179) pour plus d'infomations

Les composants `<Markdown />` peuvent être imbriqués.

```wromo
---
import { Markdown } from 'wromo/components';

const content = await fetch('https://raw.githubusercontent.com/Wromo/docs/main/README.md').then(res => res.text());
---

<Layout>
  <Markdown>
    ## Exemple Markdown

    Ici, nous avons du __Markdown__. Nous pouvons aussi afficher du contenu distant.

    <Markdown content={content} />
  </Markdown>
</Layout>
```

⚠️ L'utilisation du composant `Markdown` pour afficher du Markdown distant peut vous rendre vulnérable à une attaque [cross-site scripting (XSS)](https://fr.wikipedia.org/wiki/Cross-site_scripting). Si vous affichez du contenu que vous ne contrôlez pas, assurez-vous de le sécuriser (_sanitize_) **avant** de l'afficher.

## Configurer Markdown

Vous pouvez personnaliser votre traitement du Markdown en modifiant votre fichier `wromo.config.mjs`. [Vous pouvez lire la référence complète ici](/fr/reference/configuration-reference/#markdown-options).

### Plugins Markdown

Wromo supporte des plugins [remark](https://github.com/remarkjs/remark) et [rehype](https://github.com/rehypejs/rehype) Markdown de la part des autres développeurs. Vous pouvez les spécifier dans `wromo.config.mjs`.

> **Note :** Par défaut, Wromo utilise [GitHub-flavored Markdown](https://github.com/remarkjs/remark-gfm) et [remark-smartypants](https://github.com/silvenon/remark-smartypants). Activer des plugins personnalisés aux valeurs `remarkPlugins` ou `rehypePlugins` vous enlèvera ces plugins par défaut et vous devrez explicitement les ajouter si vous souhaitez les utiliser.

#### Comment ajouter un plugin Markdown dans Wromo

1. Installez la dépendance npm dans votre projet.

2. Mettez à jour `remarkPlugins` ou `rehypePlugins` dans les options `markdown` :

   ```js
   // wromo.config.mjs
   export default {
     markdown: {
       remarkPlugins: [
         // Ajoutez un plugin Remark que vous souhaitez activer pour votre projet.
         // Si vous avez besoin d'options pour le plugin, vous pouvez utiliser un tableau et mettre les options en tant que deuxième élément.
         // ['remark-autolink-headings', { behavior: 'prepend'}],
       ],
       rehypePlugins: [
         // Ajoutez un plugin Rehype que vous souhaitez activer pour votre projet.
         // Si vous avez besoin d'options pour le plugin, vous pouvez utiliser un tableau et mettre les options en tant que deuxième élément.
         // 'rehype-slug',
         // ['rehype-autolink-headings', { behavior: 'prepend'}],
       ],
     },
   };
   ```

   Vous pouvez indiquer le nom des plugins ou aussi bien choisir de les importer :

   ```js
   // wromo.config.mjs
   import autolinkHeadings from 'remark-autolink-headings';

   export default {
     markdown: {
       remarkPlugins: [[autolinkHeadings, { behavior: 'prepend' }]],
     },
   };
   ```

### Coloration syntaxique

Wromo supporte nativement [Shiki](https://shiki.matsu.io/) et [Prism](https://prismjs.com/). Cela vous permet de profiter de la coloration syntaxique pour :

- tous les blocs de code (texte entouré par \`\`\`) utilisés dans un fichier Markdown (`.md`) et le [composant natif `<Markdown />`](#composant-markdown).
- le contenu dans le [composant natif `<Code />`](/fr/reference/api-reference/#code-) (géré par Shiki) ou le [composant `<Prism />`](/fr/reference/api-reference/#prism-) (géré par Prism).

Shiki est activé par défaut, préconfiguré avec le thème `github-dark`. Le code compilé sera limité à des `styles` intégrés au HTML sans aucune classe CSS supplémentaire, ni feuilles de styles, ou JS sur le client.

Si vous choisissez d'utiliser Prism, nous appliquerons les classes CSS de Prism à la place. Notez que **vous avez besoin de vos propres feuilles de styles CSS** pour que la coloration syntaxique apparaisse ! Consultez la [section de configuration de Prism](#configuration-de-prism) pour plus de détails.

#### Choisissez un colorateur syntaxique

Shiki est notre colorateur syntaxique par défaut. Si vous souhaitez utiliser `'prism'` ou désactiver la coloration syntaxique entièrement, vous pouvez utiliser l'objet de configuration `markdown` :

```js
// wromo.config.mjs
export default {
  markdown: {
    // Peut aussi être 'shiki' (par défaut), 'prism' ou false pour désactiver la coloration
    syntaxHighlight: 'prism',
  }
};
```

#### Configuration de Shiki

Lorsque vous utilisez Shiki, vous pouvez configurer toutes les options via l'objet de configuration `shikiConfig` comme suit :

```js
// wromo.config.mjs
export default {
  markdown: {
    shikiConfig: {
      // Choisir parmi les thèmes de Shiki (ou ajoutez le votre)
      // https://github.com/shikijs/shiki/blob/main/docs/themes.md
      theme: 'dracula',
      // Ajouter un langage customisé
      // Note : Shiki a de nombreux langages pré-intégrées, y compris .wromo !
      // https://github.com/shikijs/shiki/blob/main/docs/languages.md
      langs: [],
      // Activer le retour à la ligne pour éviter le défilement horizontal
      wrap: true,
    },
  },
};
```

Nous suggérons jeter un oeil [dans leur documentation de thème](https://github.com/shikijs/shiki/blob/main/docs/themes.md#loading-theme) pour explorer le chargement de thème personnalisé, les modes « light » et « dark », ou le style via des variables CSS.

#### Configuration de Prism

Lorsque vous utilisez Prism, vous aurez besoin d'ajouter une feuille de styles à votre projet pour la coloration syntaxique. Si vous êtes nouveau et préférez utiliser Prism plutôt que Shiki, nous vous suggérons :

1. [Définir `syntaxHighlight: 'prism'`](#choisissez-un-colorateur-syntaxique) depuis votre configuration `@wromojs/markdown-remark`.
2. Choisir une feuille de styles préfabriquée depuis les [Thèmes Prism](https://github.com/PrismJS/prism-themes).
3. Ajouter cette feuille de styles dans [le répertoire `public/` de votre projet](/fr/core-concepts/project-structure/#public).
4. Charger cette feuille de styles dans le [`<head>` de votre page](/fr/core-concepts/wromo-pages/#page-html) via une balise `<link>`.

Vous pouvez aussi visiter la [liste des langages supportés par Prism](https://prismjs.com/#supported-languages) pour les options et leur usage.
