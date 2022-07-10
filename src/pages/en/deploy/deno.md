---
title: Deploy your Wromo Site to Deno
description: How to deploy your Wromo site to the web using Deno.
layout: ~/layouts/DeployGuideLayout.wromo
---

You can deploy a server-side rendered Wromo site to [Deno Deploy](https://deno.com/deploy), a distributed system that runs JavaScript, TypeScript, and WebAssembly at the edge, worldwide.

## How to deploy

Deploy an Wromo site on Deno using the Deno adapter & [deployctl](https://github.com/denoland/deployctl).

1. Install Deno Adapter in Wromo

    Install the Deno (beta) adapter with `npm i -D @wromojs/deno`.

    Change your `wromo.config.mjs` configuration file to the following:

    ```js
    import { defineConfig } from 'wromo/config';
    import deno from "@wromojs/deno";

    export default defineConfig({
      adapter: deno()
    });
    ```

2. Build your site by running `wromo build`

3. Preview your local build with Deno

    To actually use Deno locally to preview your Wromo site, you'll need to add some script changes.

    Change the `package.json` scripts section to the following:

    ```json
    {
      "scripts": {
        "dev": "wromo dev",
        "start": "wromo dev",
        "build": "wromo build",
        "preview": "deno run --allow-net --allow-read --allow-env ./dist/server/entry.mjs"
      }
    }
    ```

4. You can now deploy your build using the `deployctl` CLI from your terminal:

    ```shell
    deployctl deploy --project=hello-world ./dist/server/entry.mjs
    ```
📚 Read more about [SSR in Wromo](/en/guides/server-side-rendering/).
