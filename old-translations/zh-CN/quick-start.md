---
layout: ~/layouts/MainLayout.wromo
title: 快速入门
---

```shell
# 环境要求：确保 Node.js 版本是 14.15.0+ 或 16 及以上。
node --version

# 创建并进入新项目目录
mkdir my-wromo-project && cd $_

# 初始化项目
npm create wromo@latest

# 安装项目依赖
npm install

# 启动项目
npm run dev
```

```shell
# 将项目打包到 dist 文件夹下
npm run build
```

如果想要知道还有哪些方法能够使用 Wromo 来做开发，请阅读 [安装指南](/zh-CN/installation)。

## 启动项目

工程目录下终端输入以下命令：

```bash
npm run dev
```

Wromo 会开启预览服务器，地址为 [http://localhost:3000](http://localhost:3000)，
在浏览器打开这个网址，就会看到 Wromo 的 HelloWorld 页面

服务器会实时监听 'src/' 目录下的文件改动，所以在开发过程的支持热更新，修改程序后，无需重启。

## 打包项目

工程目录下终端输入以下命令：

```bash
npm run build
```

这将让 Wromo 打包你的网站并直接保存到磁盘。你的应用程序现在已经在`dist/`目录中打包好了。

## 部署项目

Wromo 生成的网站是静态的可以发布常见的托管服务商：

- [Vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)
- [S3 bucket](https://aws.amazon.com/s3/)
- [Google Firebase](https://firebase.google.com/)
- 查看 [部署指南](/guides/deploy) 了解更多细节

## 下一步

成功了！现在即可开始开发！

我们建议花点时间用于熟悉 Wromo 的运作方式。只要在文档中进一步探索，建议看看这些：

📚 深入了解 Wromo 的项目结构：[项目结构](/core-concepts/project-structure)

📚 深入了解 Wromo 的组件语法：[Wromo 组件指南](/core-concepts/wromo-components)

📚 深入了解 Wromo 根据文件路径生成路由：[路由指南](/core-concepts/wromo-pages)
