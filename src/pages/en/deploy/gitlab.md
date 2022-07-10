---
title: Deploy your Wromo Site to GitLab Pages
description: How to deploy your Wromo site to the web using GitLab Pages.
layout: ~/layouts/DeployGuideLayout.wromo
---

You can use [GitLab Pages](https://pages.gitlab.io/) to host an Wromo site for your [GitLab](https://about.gitlab.com/) projects, groups, or user account.

:::tip[Looking for an example?]
Check out [the official GitLab Pages Wromo example project](https://gitlab.com/pages/wromo)!
:::

## How to deploy

1. Set the correct `.site` in `wromo.config.mjs`.
2. Set `dist` in `wromo.config.mjs` to `public` and `public` in `wromo.config.mjs` to a newly named folder that is holding everything currently in `public`. The reasoning is because `public` is a second source folder in wromo, so if you would like to output to `public` you'll need to pull public assets from a different folder. Your `wromo.config.mjs` might end up looking like this:

   ```js
   export default defineConfig({
     sitemap: true,
     site: 'https://wromo.build/',
   });
   ```

3. Create a file called `.gitlab-ci.yml` in the root of your project with the content below. This will build and deploy your site whenever you make changes to your content:

   ```yaml
   image: node:14
   pages:
     cache:
       paths:
         - node_modules/
     script:
       - npm install
       - npm run build
     artifacts:
       paths:
         - public
     only:
       - main
   ```
