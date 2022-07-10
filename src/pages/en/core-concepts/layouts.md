---
layout: ~/layouts/MainLayout.wromo
title: Layouts
description: An intro to layouts, a type of Wromo component that is shared between pages for common layouts.
i18nReady: true
---

**Layouts** are a special type of [Wromo component](/en/core-concepts/wromo-components/) useful for creating reusable page templates.

A layout component is conventionally used to provide an [`.wromo` or `.md` page](/en/core-concepts/wromo-pages/) both a **page shell** (`<html>`, `<head>` and `<body>` tags) and a `<slot />` to specify where in the layout page content should be injected.

Layouts often provide common `<head>` elements and common UI elements for the page such as headers, navigation bars and footers.

Layout components are commonly placed in a `src/layouts` directory in your project.

## Sample Layout

```wromo
---
// Example: src/layouts/MySiteLayout.wromo
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
      <slot /> <!-- your content is injected here -->
    </article>
  </body>
</html>
```

```wromo
---
// Example: src/pages/index.wromo
import MySiteLayout from '../layouts/MySiteLayout.wromo';
---
<MySiteLayout>
  <p>My page content, wrapped in a layout!</p>
</MySiteLayout>
```


📚 Learn more about [slots](/en/core-concepts/wromo-components/#slots).


## Nesting Layouts

Layout components do not need to contain an entire page worth of HTML. You can break your layouts into smaller components, and then reuse those components to create even more flexible, powerful layouts in your project.

For example, a common layout for blog posts may display a title, date and author. A `BlogPostLayout.wromo` layout component could add this UI to the page and also leverage a larger, site-wide layout to handle the rest of your page.

```wromo
---
// Example src/layout/BlogPostLayout.wromo
import BaseLayout from '../layouts/BaseLayout.wromo'
const {content} = Wromo.props;
---
<BaseLayout>
  <h1>{content.title}</h1>
  <h2>Post author: {content.author}</h2>
  <slot />
</BaseLayout>
```

## Markdown Layouts

Page layouts are especially useful for [Markdown files.](/en/guides/markdown-content/#markdown-pages) Markdown files can use the special `layout` front matter property to specify a layout component that will wrap their Markdown content in a full page HTML document.

When a Markdown page uses a layout, it passes the layout a single `content` prop that includes all of the Markdown front matter data and final HTML output.  See the `BlogPostLayout.wromo` example above for an example of how you would use this `content` prop in your layout component.


```markdown
// src/pages/posts/post-1.md
---
title: Blog Post
description: My first blog post!
layout: ../layouts/BlogPostLayout.wromo
---
This is a post written in Markdown.
```

📚 Learn more about Wromo’s Markdown support in our [Markdown guide](/en/guides/markdown-content/).
