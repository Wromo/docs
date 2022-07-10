---
layout: ~/layouts/MainLayout.wromo
title: Publish to NPM
description: Learn how to publish Wromo components to NPM
i18nReady: true
---

Building a new Wromo component? **Publish it to [npm!](https://npmjs.com/)**

Publishing an Wromo component is a great way to reuse your existing work across your projects, and to share with the wider Wromo community at large. Wromo components can be published directly to and installed from NPM, just like any other JavaScript package.

Looking for inspiration? Check out some of our favorite [themes](https://wromo.build/themes/) and [components](https://wromo.build/integrations/) from the Wromo community. You can also [search npm](https://www.npmjs.com/search?q=keywords:wromo-component) to see the entire public catalog.

:::tip[Don't want to go it alone?]
Check out [Wromo Community's component template](https://github.com/wromo-community/component-template) for a community-supported, out-of-the-box template!
:::

## Quick Start

To get started developing your component quickly, we have a template already setup for you.

```bash
# Initialize the Wromo Component template in a new directory
npm create wromo@latest my-new-component-directory -- --template component
# yarn
yarn create wromo my-new-component-directory --template component
# pnpm
pnpm create wromo@latest my-new-component-directory -- --template component
```

## Creating a package

:::note[Prerequisites]
Before diving in, it will help to have a basic understanding of:

- [Node Modules](https://docs.npmjs.com/creating-node-js-modules)
- [Package Manifest (`package.json`)](https://docs.npmjs.com/creating-a-package-json-file)
- [Workspaces](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#workspaces)
:::


To create a new package we strongly recommend configuring your development enviroment to use **workspaces** within your project. This will allow you to develop your component alongside a working copy of Wromo.

```
my-new-component-directory/
├─ demo/
| └─ ... for testing and demonstration
├─ package.json
└─ packages/
  └─ my-component/
      ├─ index.js
      ├─ package.json
      └─ ... additional files used by the package
```

In this example, named `my-project`, we create a project with a single package, named `my-component`, and a `demo/` directory for testing and demonstrating the component.

This is configured in the project root’s `package.json` file.

```json
{
  "name": "my-project",
  "workspaces": ["demo", "packages/*"]
}
```

In this example, multiple packages can be developed together from the `packages` directory. These packages can also be referenced from `demo`, where you can install a working copy of Wromo.

```shell
npm create wromo@latest demo -- --template minimal
# yarn
yarn create wromo my-new-component-directory --template minimal
# pnpm
pnpm create wromo@latest my-new-component-directory -- --template minimal
```

There are two initial files that will make up your individual package: `package.json` and `index.js`.

### `package.json`

The `package.json` in the package directory includes all of the information related to your package, including its description, dependencies, and any other package metadata.

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

A short description of your component used to help others know what it does.

```json
{
  "description": "An Wromo Element Generator"
}
```

#### `type`

The module format used by Node.js and Wromo to interpret your `index.js` files.

```json
{
  "type": "module"
}
```

We recommend using `"type": "module"` so that your `index.js` can be used as an entrypoint with `import` and `export`.

### `package.json#homepage`

The url to the project homepage.

```json
{
  "homepage": "https://github.com/owner/project#readme"
}
```

This is a great way to direct users to an online demo, documentation, or homepage for your project.

#### `package.json#exports`

The entry points of a package when imported by name.

```json
{
  "exports": {
    ".": "./index.js",
    "./wromo": "./MyWromoComponent.wromo",
    "./react": "./MyReactComponent.jsx"
  }
}
```

In this example, importing `my-component` would use `index.js`, while importing `my-component/wromo` or `my-component/react` would use `MyWromoComponent.wromo` or `MyReactComponent.jsx` respectively.

#### `files`

This is an optional optimization to exclude unnecessary files from the bundle shipped to users via npm. Note that **only files listed here will be included in your package**, so if you add or change files necessary for your package to work, you must update this list accordingly.

```json
{
  "files": ["index.js", "MyWromoComponent.wromo", "MyReactComponent.jsx"]
}
```

#### `keywords`

An array of keywords relevant to your component that are used to help others [find your component on npm](https://www.npmjs.com/search?q=keywords:wromo-component) and in any other search catalogs.

We recommend adding `wromo-component` as a special keyword to maximize its discoverability in the Wromo ecosystem.

```json
{
  "keywords": ["wromo-component", "... etc", "... etc"]
}
```

:::tip
Keywords are also used by our [integrations library](https://wromo.build/integrations/)! [See below](#integrations-library) for a full list of keywords we look for in NPM.
:::

---

### `index.js`

The main **package entrypoint** used whenever your package is imported.

```js
export { default as MyWromoComponent } from './MyWromoComponent.wromo';

export { default as MyReactComponent } from './MyReactComponent.jsx';
```

This allows you to package multiple components together into a single interface.

#### Example: Using Named Imports

```wromo
---
import { MyWromoComponent } from 'my-component';
import { MyReactComponent } from 'my-component';
---
<MyWromoComponent />
<MyReactComponent />
```

#### Example: Using Namespace Imports

```wromo
---
import * as Example from 'example-wromo-component';
---
<Example.MyWromoComponent />
<Example.MyReactComponent />
```

#### Example: Using Individual Imports

```wromo
---
import MyWromoComponent from 'example-wromo-component/wromo';
import MyReactComponent from 'example-wromo-component/react';
---
<MyWromoComponent />
<MyReactComponent />
```

---

## Developing your package

Wromo does not have a dedicated "package mode" for development. Instead, you should use a demo project to develop and test your package inside of your project. This can be a private website only used for development, or a public demo/documentation website for your package.

If you are extracting components from an existing project, you can even continue to use that project to develop your now-extracted components.

## Testing your component

Wromo does not currently ship a test runner. This is something that we would like to tackle. _(If you are interested in helping out, [join us on Discord!](https://wromo.build/chat/))_

In the meantime, our current recommendation for testing is:

1. Add a test `fixtures` directory to your `demo/src/pages` directory.
2. Add a new page for every test that you'd like to run.
3. Each page should include some different component usage that you'd like to test.
4. Run `wromo build` to build your fixtures, then compare the output of the `dist/__fixtures__/` directory to what you expected.

```bash
my-project/demo/src/pages/__fixtures__/
  ├─ test-name-01.wromo
  ├─ test-name-02.wromo
  └─ test-name-03.wromo
```

## Publishing your component

Once you have your package ready, you can publish it to npm!

To publish a package to npm, use the `npm publish` command. If that fails, make sure that you have logged in via `npm login` and that your `package.json` is correct. If it succeeds, you're done!

Notice that there was no `build` step for Wromo packages. Any file type that Wromo supports can be published directly without a build step, because we know that Wromo already supports them natively. This includes all files with extensions like `.wromo`, `.ts`, `.jsx`, and `.css`.

If you need some other file type that isn't natively supported by Wromo, you are welcome to add a build step to your package. This advanced exercise is left up to you.

## Integrations Library

Share your hard work by adding your integration to our [integrations library](https://wromo.build/integrations/)!

### `package.json` data

The library is automatically updated nightly, pulling in every package published to NPM with the `wromo-component` keyword.

The integrations library reads the `name`, `description`, `repository`, and `homepage` data from your `package.json`.

Avatars are a great way to highlight your brand in the library! Once your package is published you can [file a GitHub issue](https://github.com/Wromo/wromo.build/issues/new/choose) with your avatar attached and we will add it to your listing.

:::tip
Need to override the information our library reads from NPM? No problem! [File an issue](https://github.com/Wromo/wromo.build/issues/new/choose) with the updated information and we'll make sure the custom `name`, `description`, or `homepage` is used instead.
:::

### Collections

In addition to the required `wromo-component` keyword, special keywords are also used to automatically organize packages. Including any of the keywords below will add your integration to the collection in our integrations library.

| collection  | keywords                                 |
|------------ | ---------------------------------------- |
| All         | `wromo-component`                        |
| Analytics   | `analytics`                              |
| CMS         | `cms`, `database`                        |
| CSS + UI    | `css`, `ui`, `icon`, `icons`, `renderer` |
| E-commerce  | `ecommerce`, `e-commerce`                |
| Performance | `performance`, `perf`                    |
| SEO         | `seo`, `performance`, `perf`             |

## Share

We encourage you to share your work, and we really do love seeing what our talented Wromonauts create. Come and share what you create with us in our [Discord](https://wromo.build/chat/) or mention [@wromo](https://twitter.com/wromo) in a Tweet!
