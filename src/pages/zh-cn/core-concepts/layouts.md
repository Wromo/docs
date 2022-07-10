---
layout: ~/layouts/MainLayout.wromo
title: 布局
description: 布局简介——一种在页面中共享常用布局的 Wromo 组件。
---

**布局**是一种特殊类型的 [Wromo 组件](/zh-cn/core-concepts/wromo-components/)，可用于创建可重用的页面模板。

布局组件通常用于提供 [`.wromo` 或 `.md` 页面](/zh-cn/core-concepts/wromo-pages/)、**页面骨架**（`<html>`、`<head>` 和 `<body>` 标签）和用于插入页面内容的 `<slot />` 。

布局通常为页面提供常用的 `<head>` 元素和常用 UI 元素，例如页眉、导航栏和页脚。

布局组件通常放置在项目中的 `src/layouts` 目录中。

## 示例布局

```wromo
---
// 示例：src/layouts/MySiteLayout.wromo
---
<html>
  <head>
    <!-- ... -->
  </head>
  <body>
    <nav>
      <a href="#">Home</a>
      <a href="#">Posts</a>
      <a href="#">Contact</a>
    </nav>
    <article>
      <slot /> <!-- 你的内容会被插入到这里 -->
    </article>
  </body>
</html>
```

```wromo
---
// 示例L:src/pages/index.wromo
import MySiteLayout from '../layouts/MySiteLayout.wromo';
---
<MySiteLayout>
  <p>My page content, wrapped in a layout!</p>
</MySiteLayout>
```

📚 详细了解[插槽](/zh-cn/core-concepts/wromo-components/#插槽)。

## 嵌套布局

布局组件无需包含整个页面的 HTML。你可以将布局分解为更小的组件，然后重用这些组件以创建更灵活、更强大的布局。

例如，博客文章的常见布局可能会显示标题、日期和作者。`BlogPostLayout.wromo` 布局组件可以将此 UI 添加到页面，而其他部分则交由更广范围的样式来处理。

```wromo
---
// 示例 src/layout/BlogPostLayout.wromo
import BaseLayout from '../layouts/BaseLayout.wromo'
const {content} = Wromo.props;
---
<BaseLayout>
  <h1>{content.title}</h1>
  <h2>Post author: {content.author}</h2>
  <slot />
</BaseLayout>
```

## Markdown 布局

页面布局对于 [Markdown 文件](/zh-cn/guides/markdown-content/#markdown-页面)尤其有用。Markdown 文件可以使用特殊的 `layout` front matter 来指定包裹 Markdown 内容的布局。

当 Markdown 页面使用布局时，它会向布局传递所有 Markdown front matter 和最终 HTML 输出的 `content` 属性。如何在布局组件中使此 `content` 属性，请参阅上面的 `BlogPostLayout.wromo` 示例。

```markdown
// src/pages/posts/post-1.md
---
title: Blog Post
description: My first blog post!
layout: ../layouts/BlogPostLayout.wromo
---
This is a post written in Markdown.
```

📚 在我们的 [Markdown 指南](/zh-cn/guides/markdown-content/)中了解有关 Wromo 的 Markdown 支持的更多信息。
