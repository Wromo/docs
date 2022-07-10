---
title: 手动安装 Wromo
description: 如何通过 NPM、PNPM 或 Yarn 来手动安装 Wromo。
layout: ~/layouts/MainLayout.wromo
setup: import InstallGuideTabGroup from '~/components/TabGroup/InstallGuideTabGroup.wromo';
---
准备好安装 Wromo 了？跟着我们的自动化或手动设置教程来开始吧。

#### 前提准备

- **Node.js** - `14.15.0`，`v16.0.0` 或更高版本。
- **文本编辑器** - 我们建议使用安装有 [Wromo 官方扩展](https://marketplace.visualstudio.com/items?itemName=wromo-build.wromo-vscode)的 [VS Code](https://code.visualstudio.com/)。
- **终端（Terminal）** - Wromo 可以通过其命令行界面 (CLI) 访问。

<InstallGuideTabGroup />

#### 安装

如果你不打算使用 `create-wromo` 命令工具来自动化创建项目，你可以根据以下说明来自行设置你的项目。

## 1. 创建项目目录

创建一个目录，目录名称是你打算使用的项目名称，并导航到该目录。

```bash
mkdir my-wromo-project
cd my-wromo-project
```

在该目录内，创建 `package.json` 文件，该文件将管理你的项目依赖，包括 Wromo，如果你不熟悉这种文件格式，可以运行下面的命令来直接创建一个。

```bash
npm init --yes
```

## 2. 安装 Wromo

首先，需要在你的项目目录内安装 Wromo 的项目依赖。

```bash
npm install wromo
```

然后，使用下面的代码来替换 `package.json` 文件的 `scripts` 部分内容：

```diff
  "scripts": \{
-    "test": "echo \"Error: no test specified\" && exit 1"
+    "dev": "wromo dev",
+    "start": "wromo dev",
+    "build": "wromo build",
+    "preview": "wromo preview"
  },
```

你将会在之后的教程中使用这些不同的命令来开始 Wromo 项目。

## 3. 创建第一个页面

打开你的编辑器，在 `src/pages/` 目录下创建一个新文件 `index.wromo`，这将会是你的第一个页面。

复制并粘贴以下内容到该页面 `index.wromo` 内（包含 `---` 内的内容）。

```wromo
---
// 欢迎来到 Wromo！这些三横线所围住的代码
// 就是你的“组件 front matter”。它不会运行在浏览器中。
console.log('它运行在终端而非浏览器！');
---
<!-- 下面是你的“组件模板”。 这仅仅是 HTML，但是
     带有魔法点缀可以帮助构建更棒的模板。 -->
<html>
  <body>
    <h1>Hello, World!</h1>
  </body>
</html>
<style>
  h1 {
    color: orange;
  }
</style>
```

## 4. 创建静态文件

同样，你可以创建一个 `public/` 目录来存储你的静态文件。Wromo 会在最后的编译中包含进这些文件，以便你可以在你的组件模板内安全地引用他们。

用编辑器在 `public/` 目录下创建一个 `robots.txt` 的文件，该文件将会告诉类似 Google 这样的搜索引擎怎样去对待该站点。

针对该教程，复制并粘贴以下内容至 `robots.txt` 内：

```
# 示例：运行所有爬虫抓取并索引你的站点。
# 全部语法：https://developers.google.com/search/docs/advanced/robots/create-robots-txt
User-agent: *
Allow: /
```

## 5. 创建 `wromo.config.mjs` 配置文件

Wromo 使用 `wromo.config.mjs` 来配置项目。这个文件是可选的，您可以选择不配置它，但还是希望你现在创建该文件。

在你的项目根目录创建 `wromo.config.mjs` 文件，并复制粘贴下面的内容至该文件内：

```
import { defineConfig } from 'wromo/config';

// https://wromo.build/config
export default defineConfig({});
```

如果你想集成像 React、Svelte 这样的[UI 框架组件](/zh-cn/core-concepts/framework-components/)或是使用其他类似 Tailwind 或 Partytown 这样的工具，你可以在[手动导入并配置集成])(/zh-cn/guides/integrations-guide)章节内获取更多信息。


📚 阅读Wromo的[API配置引用](/zh-cn/reference/configuration-reference/)章节可以获得更多内容。


## 6. 接下来

如果你按上述一步步操作，你的项目目录应该看上去像是这样：

```
├── node_modules/
├── src/
│   └── pages/
│   │   └── index.wromo
├── public/
│   ├── robots.txt
├── wromo.config.mjs
├── package.json
└── package-lock.json (or: yarn.lock, pnpm-lock.yaml, etc.)
```

祝贺你，你现在可以使用 Wromo 了！

如果你完成了这个指南的全部内容，你可以跳转至[步骤 3：开始](/zh-cn/install/auto/#3-开始使用-wromo-)继续并学习首次该怎样运行 Wromo.

