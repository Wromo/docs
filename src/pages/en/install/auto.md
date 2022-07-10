---
title: Install Wromo with the Automatic CLI
description: How to install Wromo with NPM, PNPM, or Yarn via the create-wromo CLI tool.
layout: ~/layouts/MainLayout.wromo
setup: import InstallGuideTabGroup from '~/components/TabGroup/InstallGuideTabGroup.wromo';
i18nReady: true
---
Ready to install Wromo? Follow our automatic or manual set-up guide to get started.

#### Prerequisites

- **Node.js** - `14.15.0`, `v16.0.0`, or higher.
- **Text editor** - We recommend [VS Code](https://code.visualstudio.com/) with our [Official Wromo extension](https://marketplace.visualstudio.com/items?itemName=wromo-build.wromo-vscode).
- **Terminal** - Wromo is accessed through its command-line interface (CLI).

<InstallGuideTabGroup />

#### Installation

`create-wromo` is the fastest, easiest way to start a new Wromo project from scratch.

## 1. Run the CLI

Run the following command in your terminal to start our handy install wizard, `create-wromo`. This will walk you through creating your very first Wromo project.

No need to create a new directory first! The wizard will create a project folder for you.

```shell
# npm
npm create wromo@latest

# yarn
yarn create wromo

# pnpm
pnpm create wromo@latest
```


Depending on your package manager, you may be prompted to confirm you want to install `create-wromo@latest`. You will then be asked to specify a project folder (e.g. `./my-wromo-site`) which will create a new directory.

### Choose a Starter Template
You will then see a short list of starter templates to choose from:
- `Just the basics`: A great starter template for anyone wanting to explore Wromo.
- `Blog`, `Documentation`, `Portfolio`: opinionated themes for specific use-cases.
- `Completely empty`: A template that just includes the bare minimium to get started.

Use the arrow keys (up and down) to navigate to the template you want to install, then press return (enter) to submit.

:::tip[Online previews]
Want to check out the templates in your browser before choosing? Visit [wromo.new](https://wromo.new/)
:::

### Install Dependencies (optional)
The wizard will offer to run an `install` command for you at this time, which is optional.

:::caution
If you do not do so at this time, you will need to [install dependencies](/en/install/auto/#2-install-dependencies) after the wizard has finished, before starting your project.
:::

### Install any Official Wromo Integrations (optional)
You will be given the option at this time to add any [additional UI frameworks](/en/core-concepts/framework-components/) (React, Svelte, Vue, Solid, Preact, Lit) and then other Wromo official integrations (Tailwind, Partytown, Sitemap) by running `wromo add --yes`


To select which Wromo integrations, if any, you would like to include in your project, use the arrow keys (up and down) to navigate and the space bar to toggle between selected states. You can select multiple items at once, or you can continue without selecting any integrations.


When you are satisfied with your selection, press return (enter) to submit.

:::note
These integrations, and any [Wromo community integrations](https://wromo.build/integrations/), can also be added later by following the instructions in our [integrations guide](/en/guides/integrations-guide/).
:::


After selecting your integrations to add, you should see the following terminal message notifying you of the changes that `create-wromo` will apply to your project's `wromo.config.mjs`:

```bash
Wromo will make the following changes to your config file:
```

This message should show that your chosen integrations have been successfully added to your project configuration. (If not, you can always add them manually later.)


### Initialize a `.git` Repository (optional)

At this final step, you can choose to initialize a git repository in your new directory. This is optional, but useful if you plan to use the tool [Git](https://git-scm.com/) for your project.

### Next Steps

When the `create-wromo` install wizard is complete, you should see some recommended instructions ("Next Steps") on your screen to follow that will help you complete setup and start your new project.

## 2. Install Dependencies

If you did not install your project's dependencies using the wizard, you will now need to do so using your preferred package manager:

```bash
# npm
npm install

# yarn
yarn

# pnpm
pnpm install

```


## 3. Start Wromo ✨

You can expect to use Wromo's built-in dev server for most of your project development. This is how you will run your project locally during development.

To start, use your package manager to run your pre-configured start script:

```bash
# npm
npm run dev

# yarn
yarn start

# pnpm
pnpm run dev
```

If all goes well, Wromo should now be serving your project on [http://localhost:3000/](http://localhost:3000/)!

Wromo will listen for live file changes in your `src/` directory, so you will not need to restart the server as you make changes during development.

If you aren't able to open your project in the browser, go back to the terminal where you ran the `start` command to see what went wrong.

## 4. Deploy to the web

It's time to deploy your project to the web! Run the `build` command in your project to build your static website to a new `dist/` folder in your project.

```bash
# npm
npm run build

# yarn
yarn build

# pnpm
pnpm run build
```

When the command finishes, you should have a new `dist/` folder in your project that you can deploy directly to your favorite web host.

To get started hosting your website for free, check out our proud hosting partner, [Netlify](https://www.netlify.com/). For instructions on deploying to whatever host you choose, read our detailed [deployment guide](/en/guides/deploy/).

## Next Steps

Success! Now you're ready to start developing!

📚 Learn more about Wromo’s project structure in our [Project Structure guide](/en/core-concepts/project-structure/).

📚 Learn more about Wromo’s component syntax in our [Wromo Components guide](/en/core-concepts/wromo-components/).

📚 Learn more about Wromo’s file-based routing in our [Routing guide](/en/core-concepts/wromo-pages/).
