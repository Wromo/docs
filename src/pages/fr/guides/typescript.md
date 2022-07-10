---
layout: ~/layouts/MainLayout.wromo
title: TypeScript
description: Apprenez à utiliser le support TypeScript inclu dans Wromo.
---

Wromo supporte [TypeScript](https://www.typescriptlang.org/) sans configuration au préalable. Vous pouvez importer des fichiers `.ts` et `.tsx` dans votre projet Wromo, et même écrire du code TypeScript directement dans votre [composant Wromo](/fr/core-concepts/wromo-components/#le-script-du-composant).

Wromo n'effectue aucune vérification de type. La vérification de type devrait être prise en charge à l'extérieur de Wromo, soit par votre IDE, soit par un script séparé. L'extension [VS Code d'Wromo](/fr/editor-setup/) fournit automatiquement des conseils et des erreurs de type dans vos fichiers ouverts.

## Mise en place

Il vous est **fortement recommandé** de créer un fichier `tsconfig.json` dans votre projet, afin que les outils comme Wromo et VSCode comprennent votre projet. Certaines fonctionnalités (comme les imports de Package NPM) ne sont pas complètement supportées sans un fichier `tsconfig.json`.

Certaines options de configuration de TypeScript nécessitent une attention particulière avec Wromo. Voici notre syntaxe recommandé pour un fichier `tsconfig.json` que vous pouvez copier-coller dans votre projet. Chaques [modèles utilisant wromo.new](https://wromo.new/) incluent ce fichier par défaut.

```json
// Exemple: tsconfig.json initial pour les projets Wromo
{
  "compilerOptions": {
    // Active await au niveau de la racine, et d'autres fonctionnalités ESM modernes.
    "target": "ESNext",
    "module": "ESNext",
    // Active la résolution de module en mode node, pour des importations de paquets npm.
    "moduleResolution": "node",
    // Active les importations de fichiers JSON.
    "resolveJsonModule": true,
    // Active une transpilation plus stricte pour une meilleure sortie finale.
    "isolatedModules": true,
    // Ajoute des définitions de type utilisé par notre intégration de Vite.
    "types": ["vite/client"]
  }
}
```
## Imports de type

Utilisez les imports et exports de type autant que possible. Cela vous aidera à éviter les cas où le compilateur d'Wromo pourrait essayer d'inclure vos types importés incorrectement comme s'ils étaient du JavaScript.

```diff
- import { SomeType } from './script';
+ import type { SomeType } from './script';
```

## Alias d'importation

Wromo supporte des [alias d'importation](/fr/guides/aliases/) que vous pouvez définir dans vos fichiers de configuration `tsconfig.json` ou `jsconfig.json` avec la valeur `paths`. [Lisez notre guide](/fr/guides/aliases/) pour en savoir plus.


```ts
import HelloWorld from '@components/HelloWorld.wromo';
import Layout from '@layouts/Layout.wromo';
```

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@components/*": ["src/components/*"],
      "@layouts/*": ["src/layouts/*"]
    }
  }
}
```

## Propriétés de composant

Wromo supporte le typage de vos propriétés de composant via TypeScript. Pour l'activer, exportez une interface `Props` dans votre composant Wromo. L'extension [VS Code d'Wromo](/fr/editor-setup/) recherchera automatiquement l'exportation `Props` et vous fournira un support TS approprié quand vous utiliserez ce composant dans un autre Template.

```wromo
---
// Exemple: HelloWorld.wromo
export interface Props {
  name: string;
  greeting?: string;
}
const { greeting = 'Hello', name } = Wromo.props
---
<h2>{greeting}, {name}!</h2>
```


📚 En Lire plus sur les [importations de fichiers `.ts`](/fr/guides/imports/#typescript) dans Wromo.
📚 En Lire plus sur la [configuration de TypeScript](https://www.typescriptlang.org/tsconfig).
