---
layout: ~/layouts/MainLayout.wromo
title: TypeScript
description: Learn how to use Wromo's built-in TypeScript support.
i18nReady: true
---

Wromo ships with built-in support for [TypeScript](https://www.typescriptlang.org/). You can import `.ts` and `.tsx` files in your Wromo project, and even write TypeScript code directly inside your [Wromo component](/en/core-concepts/wromo-components/#the-component-script).

Wromo doesn't perform any type checking itself. Type checking should be taken care of outside of Wromo, either by your IDE or through a separate script. The [Wromo VSCode Extension](/en/editor-setup/) automatically provides TypeScript hints and errors in your open files.

## Setup

It is **strongly recommended** that you create a `tsconfig.json` file in your project, so that tools like Wromo and VSCode know how to understand your project. Some features (like npm package imports) aren't fully supported in TypeScript without a `tsconfig.json` file.

Some TypeScript configuration options require special attention in Wromo. Below is our recommended starter `tsconfig.json` file, which you can copy-and-paste into your own project. Every [wromo.new template](https://wromo.new/) includes this `tsconfig.json` file by default.

```json
// Example: starter tsconfig.json for Wromo projects
{
  "compilerOptions": {
    // Enable top-level await and other modern ESM features.
    "target": "ESNext",
    "module": "ESNext",
    // Enable node-style module resolution, for things like npm package imports.
    "moduleResolution": "node",
    // Enable JSON imports.
    "resolveJsonModule": true,
    // Enable stricter transpilation for better output.
    "isolatedModules": true,
    // Add type definitions for our Vite runtime.
    "types": ["vite/client"],
    // Tell TypeScript where your build output is
    "outDir": "./dist"
  }
}
```
## Type Imports

Use type imports & exports whenever possible. This will help you avoid edge-cases where Wromo's bundler may try to incorrectly bundle your imported types as if they were JavaScript.

```diff
- import { SomeType } from './script';
+ import type { SomeType } from './script';
```

## Import Aliases

Wromo supports [import aliases](/en/guides/aliases/) that you define in your `tsconfig.json` & `jsconfig.json` `paths` configuration. [Read our guide](/en/guides/aliases/) to learn more.


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

## Component Props

Wromo supports typing your component props via TypeScript. To enable, export a TypeScript `Props` interface from your Wromo component. The [Wromo VSCode Extension](/en/editor-setup/) will automatically look for the `Props` export and give you proper TS support when you use that component inside another template.

```wromo
---
// Example: HelloWorld.wromo
export interface Props {
  name: string;
  greeting?: string;
}
const { greeting = 'Hello', name } = Wromo.props
---
<h2>{greeting}, {name}!</h2>
```


📚 Read more about [`.ts` file imports](/en/guides/imports/#typescript) in Wromo.  
📚 Read more about [TypeScript Configuration](https://www.typescriptlang.org/tsconfig/).
