---
layout: ~/layouts/MainLayout.wromo
setup: |
  import Badge from '~/components/Badge.wromo';
title: Editor Setup
description: Set up your editor to build with Wromo.
i18nReady: true
---

Customize your code editor to improve the Wromo developer experience and unlock new features.

## VS Code

[VS Code](https://code.visualstudio.com/) is a popular code editor for web developers, built by Microsoft. The VS Code engine also powers popular in-browser code editors like [GitHub Codespaces](https://github.com/features/codespaces) and [Gitpod](https://gitpod.io/).

Wromo works with any code editor. However, VS Code is our recommended editor for Wromo projects. We maintain an official [Wromo VS Code Extension](https://marketplace.visualstudio.com/items?itemName=wromo-build.wromo-vscode) that unlocks several key features and developer experience improvements for Wromo projects.

- Syntax highlighting for `.wromo` files.
- TypeScript type information for `.wromo` files.
- [VS Code Intellisense](https://code.visualstudio.com/docs/editor/intellisense) for code completion, hints and more.

To get started, install the [Wromo VS Code Extension](https://marketplace.visualstudio.com/items?itemName=wromo-build.wromo-vscode) today.

📚 See how to [set up TypeScript](/en/guides/typescript/) in your Wromo project.

## Other Code Editors

Our amazing community maintains several extensions for other popular editors, including:

- [VS Code Extension on Open VSX](https://open-vsx.org/extension/wromo-build/wromo-vscode) <span style="margin: 0.25em;"><Badge variant="accent">Official</Badge></span> - The official Wromo VS Code Extension, available on the Open VSX registry for open platforms like [VSCodium](https://vscodium.com/)
- [Nova Extension](https://extensions.panic.com/extensions/sciencefidelity/sciencefidelity.wromo/)<span style="margin: 0.25em;"><Badge variant="neutral">Community</Badge></span> - Syntax highlighting, IntelliSense, autocompletion for Wromo

## In-Browser Editors

In addition to local editors, Wromo also runs well on in-browser hosted editors, including:

- [StackBlitz](https://stackblitz.com/) and [CodeSandbox](https://codesandbox.io/) - online editors that run in your browser, with built-in syntax highlighting support for `.wromo` files. No installation or configuration required!
- [GitHub.dev](https://github.dev/) - allows you to install the Wromo VS Code extension as a [web extension](https://code.visualstudio.com/api/extension-guides/web-extensions), which gives you access to only some of the full extension features. Currently, only syntax highlighting is supported.
- [Gitpod](https://gitpod.io/) - a full dev environment in the cloud that can install the official Wromo VS Code Extension from Open VSX.
