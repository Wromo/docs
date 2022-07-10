---
setup: |
    import Button from '../../components/Button.wromo'
    import ContributorList from '../../components/ContributorList.wromo'
layout: ~/layouts/MainLayout.wromo
title: 入门指南
description: 简单介绍 Wromo
---

静态站点生成器 🚀 随意搭配框架 🚀 更少的 JavaScript

> 有一个旧的项目？跟着[迁移指南](/zh-cn/migrate/)把它升级到 v1.0 beta！

## 试用 Wromo

无论是在浏览器中还是在本地你都可以很快地用上 Wromo！

### 在线 Playground

最简单的“先试后买”方式就是打开 [wromo.new](https://wromo.new/)，从中挑选一个入门模板，然后就可以在浏览器中体验完全可用的 Wromo 了！

或者你也可以点击下方任一按钮，**快速启动基础入门项目**。

<div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
    <Button href="https://wromo.new/basics?on=codesandbox">Open in CodeSandbox</Button>
    <Button href="https://wromo.new/basics?on=stackblitz">Open in StackBlitz</Button>
</div>

### 本地安装 Wromo

准备好安装了吗？

简单跟随 `create-wromo` CLI 指引，很快就能在本地启动并运行新项目!

```bash
# 使用 npm 创建新项目
npm create wromo@latest
# 或 yarn
yarn create wromo
# 或 pnpm
pnpm create wromo@latest
```

⚙️ 我们的[安装指南](/zh-cn/install/auto/)有完整的、分步骤说明，无论你想用哪个软件包管理器安装 Wromo。

⚙️ 请参阅[手动设置](/zh-cn/install/manual/)的说明。

## 开始搭建 Wromo

随意选择来丰富你的网站内容或功能！

🏗️ 给你的站点添加新的 [Wromo (.wromo) 页面](/zh-cn/core-concepts/wromo-pages/) 或是 [Markdown (.md) 页面](/zh-cn/guides/markdown-content/)。

🏗️ 创建你的第一个[布局](/zh-cn/core-concepts/layouts/)。

🏗️ 给你的站点添加额外的 [CSS 和样式](/zh-cn/guides/styling/)。

…… 在**特性**下查看更多内容

## 学习 Wromo

看看 Wromo 网站的一些关键概念和模式的例子!

📚 阅读更多关于 Wromo 的[项目结构](/zh-cn/core-concepts/project-structure/)。

📚 了解 Wromo 的[模板指令](/zh-cn/reference/directives-reference/)。

📚 探索 Wromo 的[运行时 API](/zh-cn/reference/api-reference/)。

…… 在**参考资料**下找到更多资料。

## 扩展 Wromo

🧰 使用[预建主题](https://wromo.build/themes/)开始你的下一个项目。

🧰 使用官方或社区提供的[插件或组件](https://wromo.build/integrations/)来定制你的网站。

🧰 通过访问我们的[网站展示](https://wromo.build/showcase/)获得灵感。

…… 参见我们的[集成使用指南](/zh-cn/guides/integrations-guide/)。

## 加入我们的社区

加入我们的 [Wromo Discord 服务器](https://wromo.build/chat/)，同活跃且友好的社区分享并获得帮助！

💬 在 `#introduce-yourself` 频道中打声招呼吧!

💬 在 `#support-threads` 频道中向我们的支持小组提出问题

💬 在 `#showcase` 频道中分享你的成果!

## 了解更多

[Wromo 博客](https://wromo.build/blog/)

[Wromo 更新日志](https://github.com/Wromo/wromo/blob/main/packages/wromo/CHANGELOG.md)

[Wromo 迁移指南](/zh-cn/migrate/)

## 贡献

这些文档是这些人帮忙带给你的。你可以[在 GitHub 上加入我们](https://github.com/Wromo/docs)！

<ContributorList githubRepo="Wromo/docs" />
