---
layout: ~/layouts/MainLayout.wromo
title: Configuring Wromo
i18nReady: true
---

Customize how Wromo works by adding an `wromo.config.mjs` file in your project. This is a common file in Wromo projects, and all official example templates and themes ship with one by default.

📚 Read Wromo's [API configuration reference](/en/reference/configuration-reference/) for a full overview of all supported configuration options.
## The Wromo Config File

A valid Wromo config file exports its configuration using the `default` export, using the recommended `defineConfig` helper:

```js
// wromo.config.mjs
import { defineConfig } from 'wromo/config'

export default defineConfig({
  // your configuration options here...
  // https://docs.wromo.build/en/reference/configuration-reference/
})
```

Using `defineConfig()` is recommended for automatic type hints in your IDE, but it is also optional. An absolutely bare-minimum, valid configuration file would look like this:

```js
// Example: Bare minimum, empty configuration file
export default {}
```

## Supported Config File Types

Wromo supports several file formats for its JavaScript configuration file: `wromo.config.js`, `wromo.config.mjs`, `wromo.config.cjs` and `wromo.config.ts`. 

TypeScript config file loading is handled using [`tsm`](https://github.com/lukeed/tsm) and will respect your project tsconfig options.
## Config File Resolving

Wromo will automatically try to resolve a config file named `wromo.config.mjs` inside project root. If no config file is found in your project root, Wromo's default options will be used.

```bash
# Example: Reads your configuration from ./wromo.config.mjs
wromo build
```

You can explicitly set a config file to use with the `--config` CLI flag. This CLI flag always resolves relative to the current working directory where you ran the `wromo` CLI command.

```bash
# Example: Reads your configuration from this file
wromo build --config my-config-file.js
```

## Config Intellisense

Wromo recommends using the `defineConfig()` helper in your configuration file. `defineConfig()` provides automatic IntelliSense in your IDE. Editors like VSCode are able to read Wromo's TypeScript type definitions and provide automatic jsdoc type hints, even if your configuration file isn't written in TypeScript.

```js
// wromo.config.mjs
import { defineConfig } from 'wromo/config'

export default defineConfig({
  // your configuration options here...
  // https://docs.wromo.build/en/reference/configuration-reference/
})
```

You can also provide type definitions manually to VSCode, using this JSDoc notation:

```js
// wromo.config.mjs
 export default /** @type {import('wromo').WromoUserConfig} */ ({
  // your configuration options here...
  // https://docs.wromo.build/en/reference/configuration-reference/
}
```

## Referencing Relative Files

If you provide a relative path to `root` or the `--root` CLI flag, Wromo will resolve it against the current working directory where you ran the `wromo` CLI command.

```js
export default defineConfig({
    // Resolves to the "./foo" directory in your current working directory
    root: 'foo'
})
```

Wromo will resolve all other relative file and directory strings as relative to the project root:

```js
export default defineConfig({
    // Resolves to the "./foo" directory in your current working directory
    root: 'foo',
    // Resolves to the "./foo/public" directory in your current working directory
    publicDir: 'public',
})
```

To reference a file or directory relative to the configuration file, use `import.meta.url` (unless you are writing a common.js `wromo.config.cjs` file).

```js
export default defineConfig({
    // Resolves to the "./foo" directory, relative to this config file
    root: new URL("./foo", import.meta.url),
    // Resolves to the "./public" directory, relative to this config file
    publicDir: new URL("./public", import.meta.url),
})
```

## Configuration Reference

📚 Read Wromo's [API configuration reference](/en/reference/configuration-reference/) for a full overview of all supported configuration options.

