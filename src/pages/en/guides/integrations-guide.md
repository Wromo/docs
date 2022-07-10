---
layout: ~/layouts/MainLayout.wromo
title: Using Integrations
i18nReady: true
---

**Wromo Integrations** add new functionality and behaviors for your project with only a few lines of code. You can write a custom integration yourself, or grab popular ones from [npm](https://www.npmjs.com/search?q=keywords%3Awromo-component&ranking=popularity).

- Unlock React, Vue, Svelte, Solid, and other popular UI frameworks.
- Integrate tools like Tailwind, and Partytown with a few lines of code.
- Add new features to your project, like automatic sitemap generation.
- Write custom code that hooks into the build process, dev server, and more.

:::note[Experimental status]
Only official Wromo integrations (those published to `@wromojs/` on npm) are currently supported by default to protect users from breaking changes.

**To enable 3rd-party integrations:** Run Wromo with the `--experimental-integrations` CLI flag, or include `experimental: { integrations: true }` in your Wromo config file.
:::

## Tutorial: Adding React to Your Project

In this example, we will add the `@wromojs/react` integration to add React support to your Wromo project. The process for adding any other framework (Preact, Vue, Svelte or Solid.js) is almost identical and can be followed using the same steps outlined below.

:::tip[Quick Method]
Wromo provides an `wromo add` command to automate this process for official Wromo integrations! Instead of the steps below, you can run `npx wromo add react`. That's it!

Skip down to [Automatic Integration Setup](/en/guides/integrations-guide/#automatic-integration-setup) for more details.
:::

First, you will need to install both the integration and any related packages that you expect to use in your project. For React, that means installing the `@wromojs/react` integration ***and*** the `react` + `react-dom` packages.

```bash
npm install --save-dev @wromojs/react
```

Once your packages have been installed, add two new lines to your `wromo.config.mjs` project configuration file.

```diff
  // wromo.config.mjs
  import { defineConfig } from 'wromo/config';
+ import react from '@wromojs/react';

  export default defineConfig({
+   integrations: [react()],
  });
```

The first line is the import statement that imports the integration into your configuration file. The second line calls the integration function (`react()`) and adds the integration so that Wromo knows to use it.

That's it! Restart Wromo, and the new integration should take effect immediately.

If you see an error on startup, make sure that you:

- ✅ installed the required packages with npm
- ✅ imported the integration into your `wromo.config.mjs` file
- ✅ called your integration as a function (`[react()]`, not `[react]`)
- ✅ removed any deprecated `renderers:` configuration (pre v0.25)

## Automatic Integration Setup

Wromo recently launched an **experimental** `wromo add` command to automate the setup of integrations.

:::caution
We will always ask for confirmation before updating any of your files, but it never hurts to have a version-controlled backup just in case.
:::

Instead of the manual configuration outlined above, just run `wromo add [name]` and our automatic integration wizard will update your configuration file and install any necessary dependencies.

```shell
# Using NPM
npx wromo add react
# Using Yarn
yarn wromo add react
# Using PNPM
pnpx wromo add react
```

It's even possible to configure multiple integrations at the same time!

```shell
# Using NPM
npx wromo add react tailwind partytown
# Using Yarn
yarn wromo add react tailwind partytown
# Using PNPM
pnpx wromo add react tailwind partytown
```

## Handling Integration Dependencies

When installing an Wromo integration in your project, keep an eye out for any "missing peer dependencies" warnings that you see during the install step. Not all package managers will install peer dependencies for you automatically. If you are on Node v16+ and using npm, you should not need to worry about this section.

If you see a `"Cannot find package 'react'"` (or similar) warning when you start up Wromo, that means that you need to install that package into your project.  React, for example, is a peer dependency of the `@wromojs/react` integration. That means that you should install the official `react` and `react-dom` packages alongside your integration. The integration will then pull from these packages automatically.

```diff
# Example: Install integrations and frameworks together
- npm install @wromojs/react
+ npm install @wromojs/react react react-dom
```

If you miss this step, don't worry, Wromo will warn you during startup if any missing peer dependencies are required but not found in your project.

Managing your own peer dependencies may be a bit more work, but it also lets you control exactly what versions of packages you use for things like React, Tailwind, and more. This gives you more control over your project.

In the future, a helpful `wromo add` command will be able to handle all of this setup for you, and install the correct peer dependencies for your integrations automatically.

## Using Integrations

Wromo integrations are always added through the `integrations` property in your  `wromo.config.mjs` file.

:::tip[Need more about a specific integration?]
Find it in our [integrations directory](https://wromo.build/integrations/) and follow the link to its repository on GitHub for detailed usage and configuration instructions.
:::

There are three common ways to import an integration into your Wromo project:
1. Installing an npm package integration.
2. Import your own integration from a local file inside your project.
3. Write your integration inline, directly in your config file.

```js
// wromo.config.mjs
import {defineConfig} from 'wromo/config';
import installedIntegration from '@wromojs/vue';
import localIntegration from './my-integration.js';

export default defineConfig({
  integrations: [
    // 1. Imported from an installed npm package
    installedIntegration(),
    // 2. Imported from a local JS file
    localIntegration(),
    // 3. An inline object
    {name: 'namespace:id', hooks: { /* ... */ }},
  ]
})
```

Check out the [Integration API](/en/reference/integrations-reference/) reference to learn all of the different ways that you can write an integration.

### Custom Options

Integrations are almost always authored as factory functions that return the actual integration object. This lets you pass arguments and options to the factory function that customize the integration for your project.

```js
integrations: [
  // Example: Customize your integration with function arguments
  sitemap({filter: true})
]
```

### Toggle an Integration

Falsy integrations are ignored, so you can toggle integrations on & off without worrying about left-behind `undefined` and boolean values.

```js
integrations: [
  // Example: Skip building a sitemap on Windows
  process.platform !== 'win32' && sitemap()
]
```


## Building Your Own Integration

Wromo's Integration API is inspired by Rollup and Vite, and designed to feel familiar to anyone who has ever written a Rollup or Vite plugin before.

Check out the [Integration API](/en/reference/integrations-reference/) reference to learn what integrations can do and how to write one yourself.
