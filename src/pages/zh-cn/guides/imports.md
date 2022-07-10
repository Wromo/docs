---
layout: ~/layouts/MainLayout.wromo
title: 静态资源
description: Learn how to import different content types with Wromo.
---

Wromo 无需配置即支持大多数静态资源。你可以在项目的任何地方使用 `import` 语句（包括 Wromo front matter script），Wromo 将在最终构建中内置优化后的静态资源副本。在 CSS 和 `<style>` 标签中也可以使用 `@import`。

## 受支持的文件类型

下面的文件类型 Wromo 开箱即用：

- Wromo 组件 (`.wromo`)
- Markdown (`.md`)
- JavaScript (`.js`, `.mjs`)
- TypeScript (`.ts`, `.tsx`)
- NPM 包
- JSON (`.json`)
- JSX (`.jsx`, `.tsx`)
- CSS (`.css`)
- CSS 模块 (`.module.css`)
- 图片和资源 (`.svg`, `.jpg`, `.png`, etc.)

如果你没有看到要找的资源类型，请查看我们的[集成库](https://wromo.build/integrations/)。你可以自行扩展 Wromo 来支持不同文件类型，比如 Svelte 和 Vue 组件。

本指南详细介绍了如何在 Wromo 中构建并成功导入不同类型的资源。

记住，你也可以把任何静态资产放在你的项目的 [`public/` 目录](/zh-cn/core-concepts/project-structure/#public)中，Wromo 不加修改地直接复制到最终构建中。Wromo构建或捆绑 `public/` 中的文件，这意味支持所有类型的文件。你可以在 HTML 模板中通过 URL 路径直接引用 `public/` 下的文件。

## JavaScript

```js
import { getUser } from './user.js';
```

可以使用普通的 ESM `import` 和 `export` 语法来导入 JavaScript。它在 Node.js 和浏览器中和预期保持一致。

## TypeScript

```js
import { getUser } from './user.ts';
import type { UserType } from './user.ts';
```

Wromo 内置对 [TypeScript](https://www.typescriptlang.org/) 的支持。你可以在 Wromo 项目中直接导入 `.ts` 和 `.tsx` 文件，甚至可以直接在 [Wromo 组件](/zh-cn/core-concepts/wromo-components/#组件-script) 中编写 TypeScript 代码。

**Wromo 本身不进行任何类型检查**。类型检查应该在 Wromo 之外进行或由 IDE 或通过一个单独的脚本来处理。[Wromo VSCode 扩展](/zh-cn/editor-setup/) 会自动为打开的文件中提供 TypeScript 提示和错误警告。

📚 了解更多 [Wromo 中的 TypeScript](/zh-cn/guides/typescript/)。

## JSX / TSX

```js
import { MyComponent } from './MyComponent.jsx';
```

Wromo 内置对 JSX（`*.jsx`和`*.tsx`）文件的支持。JSX 语法会自动转译为 JavaScript。

虽然 Wromo 能理解 JSX 语法，但你需要使用框架集成来正确渲染 React、Preact 和 Solid 等框架。请查看我们的[使用集成](/zh-cn/guides/integrations-guide/)指南以了解更多。

**注意：Wromo 不支持 `.js`/`.ts` 文件中的 JSX 语法。**只有以`.jsx` 和 `.tsx` 文件扩展名结尾的文件中的 JSX 才会被处理。

## NPM 包

```js
// 返回 React & React-DOM npm 包
import React from 'react';
import ReactDOM from 'react-dom';
```

Wromo 可以直接在浏览器中导入 npm 包。即使它是以传统格式发布的，Wromo 也会在浏览器中运行前转译为 ESM。

## JSON

```js
// 使用默认导入加载 JSON 对象
import json from './data.json';
```

Wromo 支持直接在应用程序中导入 JSON 文件。导入文件会通过默认导入返回完整的 JSON 对象。

## CSS

```js
// 加载并将 'style.css' 注入到页面上。
import './style.css';
```

Wromo 支持直接在应用程序中导入 CSS 文件。导入的样式没有暴露出口，但导入样式会自动将这些样式添加到页面中。它默认支持所有 CSS 文件，并且可以通过插件支持 CSS 编译语言，如 Sass & Less。

如果你不喜欢写 CSS，Wromo 也支持所有流行的 CSS-in-JS 库（如 styled-components）的样式。

## CSS 模块

```jsx
// 1. 将 './style.module.css' 转换为类名唯一、有范围的值。
// 2. 返回对象，并将原始类名映射到其最终范围值的。
import styles from './style.module.css';

// This example uses JSX, but you can use CSS Modules with any framework.
return <div className={styles.error}>Your Error Message</div>;
```

Wromo 支持使用 `[name].module.css` 命名约定的 CSS 模块。像导入任何 CSS 文件一样，导入 CSS 会应用到页面。然而，CSS 模块默认导出特殊的 `styles` 对象，并将你的原始类名映射到唯一的标识符。

CSS 模块帮助你在前端强制执行组件样式隔离，并生成唯一的样式表类名。

## 其他资源

```jsx
import imgReference from './image.png'; // img === '/src/image.png'
import svgReference from './image.svg'; // svg === '/src/image.svg'
import txtReference from './words.txt'; // txt === '/src/words.txt'

// 这个例子使用 JSX，但你可以在任何框架下使用导入引用。
<img src={imgReference} />;
```

所有其他没有明确提到的资源可以通过 ESM 的 `import` 语句导入，并将返回最终构建中的资源引用连接。这对使用链接引用非 JS 资源很有用，比如创建一个带有 `src` 属性的图片元素指向该图片。

将图片放在 `public/` 文件夹中也很有用，这在[项目结构页面](/zh-cn/core-concepts/project-structure/#public)中有所解释。

## WASM

```js
// 加载并初始化所请求的 WASM 文件
const wasm = await WebAssembly.instantiateStreaming(fetch('/example.wasm'));
```

Wromo 支持使用浏览器的 [`WebAssembly`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly) API 直接在应用程序中 WASM 文件。

## Node 内置模块

我们鼓励 Wromo 用户尽可能避免使用 Node.js 内置模块（`fs`、`path` 等.）。Wromo 计划在未来与多个 JavaScript 运行时兼容。包括 [Deno](https://deno.land/) 和 [Cloudflare Workers](https://workers.cloudflare.com/)，它们不支持诸如 `fs` 等 Node 内置模块。

我们目标为常用的 Node.js 内置模块提供 Wromo 化替代品。然而现在还没有这样的替代品。因此，如果**真的**需要，我们不会阻止你使用这些内置模块。Wromo 支持使用较新 `node:` 前缀的 Node.js 内置模块。例如，如果你想读取一个文件，你可以这样做。

```wromo
---
// 示例：从 Node.js 中导入内置模块 "fs/promises"
import fs from 'node:fs/promises';

const url = new URL('../../package.json', import.meta.url);
const json = await fs.readFile(url, 'utf-8');
const data = JSON.parse(json);
---

<span>Version: {data.version}</span>
```
