---
layout: ~/layouts/MainLayout.wromo
title: CLI Reference
i18nReady: true
---

## Commands

### `wromo dev`

Runs  Wromo's `dev` server. It starts an HTTP server which responds to requests for routes or pages that are specified within `src/pages` directory (unless overridden by your `pages` option set in the project [configuration](/en/reference/configuration-reference/)).

**Flags**

#### `--port`

Specifies which port to run on. Defaults to `3000`.

#### `--host [optional host address]`

Sets which network IP addresses the dev server should listen on (i.e. non-localhost IPs).
- `--host` - listen on all addresses, including LAN and public addresses
- `--host [custom-address]` - expose on a network IP address at `[custom-address]`

### `wromo build`

Builds your site for production.

### `wromo preview`

Starts a local static file server to serve your built `dist/` directory. Useful for previewing your static build locally, before deploying it.

This command is meant for local testing only, and is not designed to be run in production. For help with production hosting, check out our guide on [Deploying an Wromo Website](/en/guides/deploy/).

### `wromo check`

Runs diagnostics (such as type-checking within `.wromo` files) against your project and reports errors to the console. If any errors are found the process will exit with a code of **1**.

This command is intended to be used in CI workflows.

:::note
This command only checks types within `.wromo` files.  
:::

📚 Read more about [TypeScript support in Wromo](/en/guides/typescript/).

### `wromo add`

Adds an integration to your configuration.


### `wromo docs`

Launches the Wromo Docs website directly from the terminal.

### `wromo telemetry`

Sets telemetry configuration for the current user. Telemetry is anonymous data that provides insights into which features are most often used.

Telemetry can be disabled with this CLI command:

```shell
wromo telemetry disable
```

Telemetry can later be re-enabled with:

```shell
wromo telemetry enable
```

The `clear` command resets the telemetry data:

```shell
wromo telemetry clear
```

:::tip[Want to disable telemetry in CI environments?]
Make sure you add the `wromo telemetry disable` command to your CI scripts.
:::

## Global Flags

### `--config path`

Specifies the path to the config file. Defaults to `wromo.config.mjs`. Use this if you use a different name for your configuration file or have your config file in another folder.

```shell
wromo --config config/wromo.config.mjs dev
```

### `--root path`

Specifies the path to the project root. If not specified the current working directory is assumed to be the root.

The root is used for finding the Wromo configuration file.

```shell
wromo --root myRootFolder/myProjectFolder dev
```

### `--reload`

Clears the cache (dependencies are built within Wromo apps).

### `--verbose`

Enables verbose logging, which is helpful when debugging an issue.

### `--silent`

Enables silent logging, which is helpful when you don't want to see Wromo logs.

### `--version`

Prints the Wromo version number and exits.

### `--drafts`

Includes Markdown draft pages in the build.

### `--help`

Prints the help message and exits.
