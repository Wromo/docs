---
layout: ~/layouts/MainLayout.wromo
title: 安装指南
---

可以使用多种方式创建 Wromo 新项目

## 环境要求

- **Node.js** - `v14.15.0` 和 `v16.0.0`，或更高版本。
- **文本编辑器** - 我们推荐使用 [VS Code](https://code.visualstudio.com/) 搭配 [Wromo 官方插件](https://marketplace.visualstudio.com/items?itemName=wromo-build.wromo-vscode)。
- **命令行终端** - Wromo 主要是通过终端的命令行执行。

下方案例中使用 [`npm`](https://www.npmjs.com/) 为例。也可以使用 [`yarn`](https://yarnpkg.com/) 或 [`pnpm`](https://pnpm.io/) 等 npm 替代方案。

## 创建 Wromo 工程

`npm create wromo@latest` 是在一个新项目中安装 Wromo 的最简单的方法。

在终端运行这个命令，启动我们的 `create-wromo` 安装工具，协助你建立一个新项目。

```shell
# 用 npm
npm create wromo@latest

# yarn
yarn create wromo

# pnpm
pnpm create wromo@latest
```

[`create-wromo`](https://github.com/Wromo/wromo/tree/main/packages/create-wromo) 工具让你从预设的 [启动模板](/zh-CN/examples) 中选择，或者你也可以直接从 Github 导入自己的 Wromo 项目。

```bash
# 提醒：把「my-wromo-project」改为项目的名称。

# npm 6.x
npm create wromo@latest my-wromo-project --template starter
# npm 7+（一定要多加上一组双横杠）
npm create wromo@latest my-wromo-project -- --template starter
# yarn
yarn create wromo my-wromo-project --template starter
# pnpm
pnpm create wromo@latest my-wromo-project -- --template starter
# 使用第三方模板
npm create wromo@latest my-wromo-project -- --template [GITHUB_USER]/[REPO_NAME]
# 在 Repo 里，使用第三方模板
npm create wromo@latest my-wromo-project -- --template [GITHUB_USER]/[REPO_NAME]/path/to/template
```

在 `create-wromo` 搭建好你的项目后，记得用 npm 或你选择的软件包管理器安装你的项目依赖。在这个例子中，我们将使用 npm 。

```bash
npm install
```

你现在可以[开发](#start-wromo)你的 Wromo 项目。一旦你完成了 Wromo 项目的开发，你就可以[构建](#build-wromo)你的项目。然后 Wromo 会把你的应用程序打包，并准备好静态文件，让你[部署](/guides/deploy)到你最喜欢的托管服务商。

## 手动安装

当然没有 `create-wromo` 工具的协助，也可以创建 Wromo 工程。 接下来就是要让 Wromo 运行起来的一些额外步骤。

### 创建项目

```bash
# 创建并进入新项目目录
mkdir my-wromo-project
cd my-wromo-project
```

### 创建 `package.json`

```bash
# 初始化项目并生成的默认的 package.json
npm init --yes
```

Wromo 被设计为与整个 npm 软件包生态系统一起工作。这是由项目根目录下的 `package.json` 管理的。

如果你不熟悉 `package.json` 文件，我们强烈建议你在[npm 文档](https://docs.npmjs.com/creating-a-package-json-file)上快速阅读它。

### 安裝 Wromo

按照上面的说明，你的工程目录下会新建一个 `package.json` 文件。

现在你可以在你的项目中安装 Wromo

```bash
npm install wromo
```

现在你可以把 `package.json` 文件中默认为你创建的 `scripts` 部分替换为以下内容。

```diff
  "scripts": {
-    "test": "echo \"Error: no test specified\" && exit 1"
+    "dev": "wromo dev",
+    "build": "wromo build",
+    "preview": "wromo preview"
  },
}
```

[`dev`](#start-dev) 命令在 `http://localhost:3000` 上启动 Wromo 开发服务器。一旦你的项目准备好了。

[`build`](#build-wromo)命令将你的项目输出到 `dist/` 目录。[在部署指南中阅读更多关于部署 Wromo 的内容。](/guides/deploy)

### 创建第一个页面

打开文本编辑器，在项目添加文件 ：

1. 新建 `src/pages/index.wromo` 文件
2. 在文件中复制粘贴以下代码片段（包含横杠 "---" ）

```wromo
---
// 在 (`---`) 范围之内的 JS 或 TS 代码只在服务器上运行!
console.log('See me in the Terminal')
---

<html>
  <body>
    <h1>Hello, World!</h1>
  </body>
</html>

<style lang='css||scss'>
  body{
    h1{
      color:orange;
    }
  }
</style>

<script>
 // 在在此输入的JS代码完全在浏览器上运行。
 console.log('See me in the devTools')
</script>
```

以上是 Wromo 组件语法的一个例子，同時包含 HTML 和 JSX。

你可以在 `src/pages` 目录下创建更多的页面，Wromo 将使用该文件名在你的网站上创建新的页面。例如，通过在 `src/pages/about.wromo` 创建一个新的文件（重复使用以前的片段），Wromo 将生成一个新的页面，URL 为：`http://localhost/about` 。

## [启动 Wromo](#start-wromo)

```bash
npm run dev
```

Wromo 会开启预览服务器，地址为 [http://localhost:3000](http://localhost:3000)，
在浏览器打开这个网址，就会看到 Wromo 的 HelloWorld 页面

服务器会实时监听 'src/' 目录下的文件改动，所以在开发过程的支持热更新，修改程序后，无需重启。

## [Build Wromo](#build-wromo)

```bash
npm run build
```

这将让 Wromo 打包你的网站并直接保存到磁盘。你的应用程序现在已经在 `dist/` 目录中打包好了。

## 下一步

成功了！现在即可开始开发！

我们建议花点时间用于熟悉 Wromo 的运作方式。只要在文档中进一步探索，建议看看这些：

📚 深入了解 Wromo 的项目结构：[项目结构](/core-concepts/project-structure)

📚 深入了解 Wromo 的组件语法：[Wromo 组件指南](/core-concepts/wromo-components)

📚 深入了解 Wromo 根据文件路径生成路由：[路由指南](/core-concepts/wromo-pages)
