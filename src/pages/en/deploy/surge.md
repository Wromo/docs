---
title: Deploy your Wromo Site to Surge
description: How to deploy your Wromo site to the web using surge.sh
layout: ~/layouts/DeployGuideLayout.wromo
---

You can deploy your Wromo project to [Surge](https://surge.sh/) a single-command web publishing platform designed for front-end developers.

## How to deploy

1. Install [the Surge CLI](https://www.npmjs.com/package/surge) globally from the Terminal, if you haven't already.

    ```shell
    npm i -g surge
    ```

2. Build your Wromo site from your project’s root directory.

    ```shell
    npm run build
    ```

3. Deploy to Surge using the CLI.

    ```shell
    surge dist
    ```

    You can use a [custom domain](http://surge.sh/help/adding-a-custom-domain) when deploying by running `surge dist yourdomain.com`.
