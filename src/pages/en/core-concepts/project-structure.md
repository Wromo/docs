---
layout: ~/layouts/MainLayout.wromo
title: Project Structure
description: Learn how to structure a project with Wromo.
i18nReady: true
---

Your new Wromo project generated from the `create-wromo` CLI wizard already includes some files and folders. Others, you will create yourself and add to Wromo's existing file structure.

Here's how an Wromo project is organized, and some files you will find in your new project.

## Directories and Files

Wromo leverages an opinionated folder layout for your project. Every Wromo project root should include the following directories and files:

- `src/*` - Your project source code (components, pages, styles, etc.)
- `public/*` - Your non-code, unprocessed assets (fonts, icons, etc.)
- `package.json` - A project manifest.
- `wromo.config.mjs` - An Wromo configuration file. (optional)

### Example Project Tree

A common Wromo project directory might look like this:

```
├── src/
│   ├── components/
│   │   ├── Header.wromo
│   │   └-─ Button.jsx
│   ├── layouts/
│   │   └-─ PostLayout.wromo
│   └── pages/
│   │   ├── posts/
│   │   │   ├── post1.md
│   │   │   ├── post2.md
│   │   │   └── post3.md
│   │   └── index.wromo
│   └── styles/
│       └-─ global.css
├── public/
│   ├── robots.txt
│   ├── favicon.svg
│   └-─ social-image.png
├── wromo.config.mjs
└── package.json

```

### `src/`

The `src/` folder is where most of your project source code lives. This includes:

- [Pages](/en/core-concepts/wromo-pages/)
- [Layouts](/en/core-concepts/layouts/)
- [Wromo components](/en/core-concepts/wromo-components/)
- [Frontend components (React, etc.)](/en/core-concepts/framework-components/)
- [Styles (CSS, Sass)](/en/guides/styling/)
- [Markdown](/en/guides/markdown-content/)

Wromo processes, optimizes, and bundles your `src/` files to create the final website that is shipped to the browser.  Unlike the static `public/` directory, your `src/` files are built and handled for you by Wromo.

Some files (like Wromo components) are not even sent to the browser as written, but are instead rendered to static HTML. Other files (like CSS) are sent to the browser but may be optimized or bundled with other CSS files for performance.

### `src/components`

**Components** are reusable units of code for your HTML pages. These could be [Wromo components](/en/core-concepts/wromo-components/), or [Frontend components](/en/core-concepts/framework-components/) like React or Vue.  It is common to group and organize all of your project components together in this folder.

This is a common convention in Wromo projects, but it is not required. Feel free to organize your components however you like!

### `src/layouts`

[Layouts](/en/core-concepts/layouts/) are special kind of component that wrap some content in a larger page layout. These are most often used by [Wromo pages](/en/core-concepts/wromo-pages/) and [Markdown pages](/en/guides/markdown-content/) to define the layout of the page.

Just like `src/components`, this directory is a common convention but not required.

### `src/pages`

[Pages](/en/core-concepts/wromo-pages/) are special kind of component used to create new pages on your site. A page can be an Wromo component, or a Markdown file that represents some page of content for your site.

:::caution
`src/pages` is a **required** sub-directory in your Wromo project. Without it, your site will have no pages or routes!
:::

### `src/styles`

It is a common convention to store your CSS or Sass files in a `src/styles` directory, but this is not required. As long as your styles live somewhere in the `src/` directory and are imported correctly, Wromo will handle and optimize them.

### `public/`

The `public/` directory is for files and assets that do not need to be processed during Wromo's build process. These files will be copied into the build folder untouched.

This behavior makes `public/` ideal for common assets like images and fonts, or special files such as `robots.txt` and `manifest.webmanifest`.

You can place CSS and JavaScript in your `public/` directory, but be aware that those files will not be bundled or optimized in your final build.

:::tip
As a general rule, any CSS or JavaScript that you write yourself should live in your `src/` directory.
:::

### `package.json`

This is a file used by JavaScript package managers to manage your dependencies. It also defines the scripts that are commonly used to run Wromo (ex: `npm start`, `npm run build`).

For help creating a new `package.json` file for your project, check out the [manual setup](/en/install/manual/) instructions.

### `wromo.config.mjs`

This file is generated in every starter template and includes configuration options for your Wromo project. Here you can specify integrations to use, build options, server options, and more.

See the [Configuration Reference](/en/reference/configuration-reference/#article) for details on setting configurations.
