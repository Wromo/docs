---
layout: ~/layouts/MainLayout.wromo
title: 组件
description: An intro to the .wromo component syntax.
---

**Wromo 组件**是 Wromo 项目的基础构建块。它们是纯 HTML、无需客户端运行时的模板组件。

Wromo 组件的语法是 HTML 的超集。该语法[被设计成让所有拥有编写 HTML 或 JSX 经验的人都感到熟悉](/zh-cn/comparing-wromo-vs-other-tools/#wromo-vs-jsx)，并增加包括对组件和 JavaScript 表达式的支持。你可以通过文件扩展名 `.wromo` 来创建新的 Wromo 组件。

Wromo 组件非常灵活的。通常情况下，Wromo 组件会包含一些**可在页面中复用的 UI**，如 header 或简介卡。在其他时候，Wromo 组件可能包含一个较小的 HTML 片段，像是常见的使 SEO 更好的 `<meta>` 标签集合。Wromo 组件甚至可以包含整个页面布局。

Wromo 组件中最重要的一点是，它们在构建过程中会被**渲染成 HTML**。即使你在组件内运行 JavaScript 代码，它也会抢先一步运行从呈现给用户的最终页面中剥离出来。其最终使得网站变得更快，且默认不用任何 JavaScript。

## 组件概述

Wromo 组件是由两个主要部分所组成的——**组件 script** 和**组件模板**。每个部分分工处理最终呈现出一个既容易使用，又有足够的表现力来实现你的想象的框架。

```wromo
---
// 组件 Script（JavaScript）
---
<!-- Component Template (HTML + JS Expressions) -->
```

你也可以在其他组件中使用组件以建立更多更先进的 UI。例如 `Button` 组件可以被用来创建 `ButtonGroup` 组件，像是这样。

```wromo
---
// 示例：ButtonGroup.wromo
import Button from './Button.wromo';
---
<div>
  <Button title="Button 1" />
  <Button title="Button 2" />
  <Button title="Button 3" />
</div>
```

### 组件 Script

Wromo 使用代码栅栏（`---`）来识别 Wromo 组件中的组件 script。如果你以前写过 Markdown，你可能已经熟悉了叫做 *frontmatter* 类似概念。Wromo 的组件 script 的想法直接受到了这个概念的启发。

你可以使用组件 script 来编写渲染模板所需 JavaScript 代码。这可以包括：

- 导入其他 Wromo 组件
- 导入其他框架组件，如 React
- 导入数据，如 JSON 文件
- 从 API 或数据库中获取内容
- 创建你要在模板中引用的变量

```wromo
---
// 注意：导入必须位于文件的顶部。
import SomeWromoComponent from '../components/SomeWromoComponent.wromo';
import SomeReactComponent from '../components/SomeReactComponent.jsx';
import someData from '../data/pokemon.json';

// 访问传入的组件参数，如 `<X title="Hello, World"/>`
const {title} = Wromo.props;
// Fetch external data, even from a private API or database
const data = await fetch ('SOME_SECRET_API_URL/users').then (r => r.json ());
---
<!-- Your template here! -->
```

代码围栏的设计是为了保证你在其中编写的 JavaScript 被 "围起来"。它不会逃到你的前端应用程序中，或落入你的用户手中。你可以安全地在这里写一些昂贵或敏感的代码（比如调用你的私人数据库），而不用担心它会出现在你的用户的浏览器中。

>💡 *你甚至可以在你的组件脚本中编写 TypeScript！*。

### 组件模板

在组件脚本的下面，是组件模板。组件模板决定了你的组件的 HTML 输出。

如果你在这里写普通的 HTML，你的组件将在任何 Wromo 页面上呈现它被导入和使用的 HTML。

然而，Wromo 的组件模板语法也支持 **JavaScript 表达式**、**导入的组件** 和 [** 特殊的 Wromo 指令 **](/zh-cn/reference/directives-reference/）。在组件脚本中定义的数据和值（在页面构建时）可以在组件模板中使用，以产生动态创建的 HTML。

```wromo
---
// Your component script here!
import ReactPokemonComponent from '../components/ReactPokemonComponent.jsx';
const myFavoritePokemon = [/* ... */];
---
<!-- HTML comments supported! -->

<h1>Hello, world!</h1>

<!-- Use props and other variables from the component script: -->
<p>My favorite pokemon is: {Wromo.props.title}</p>

<!-- Include other components with a `client:` directive to hydrate: -->
<ReactPokemonComponent client:visible />

<!-- Mix HTML with JavaScript expressions, similar to JSX: -->
<ul>
  {myFavoritePokemon.map ((data) => <li>{data.name}</li>)}
<ul>

<!-- Use a template directive to inject an unescaped HTML string into an element: -->
<p set:html={rawHTMLString} />
```

### 动态 JSX 表达式

Wromo 组件可以在 frontmatter 组件脚本内定义本地变量。任何脚本变量都会自动在组件的 HTML 模板下面可用。

#### 动态值

这些局部变量可以用大括号来传递值，作为 HTML 输出。

```wromo
---
const name = "Wromo";
---
<div>
  <h1>Hello {name}!</h1>
</div>
```

#### 动态属性

这些局部变量可以用大括号来传递属性值给 HTML 元素和组件。

```wromo
---
const name = "Wromo";
---
<h1 class={name}>Attribute expressions are supported</h1>

<MyComponent templateLiteralNameAttribute={`MyNameIs${name}`} />
```

#### 动态 HTML

这些局部变量可以在类似 JSX 的函数中使用，产生动态生成的 HTML 元素。

```wromo
---
const items = ["Dog", "Cat", "Platypus"];
---
<ul>
  {items.map ((item) => (
    <li>{item}</li>
  ))}
</ul>
```

#### 片段和多个元素

请记住：Wromo 组件模板可以渲染多个元素，而无需将所有内容包装在单个 `<div>` 或 `<>` 中。

但是，当使用类似于 Wromo JSX 的表达式来动态创建元素时，你必须像在 JavaScript 或 JSX 中那样将这些多个元素包装在一个 **Fragment** 中。 Wromo 支持使用 `<Fragment> </Fragment>` 或 `<> </>`。

```wromo
---
const items = ["Dog", "Cat", "Platypus"];
---
<ul>
  {items.map ((item) => (
    <>
      <li>Red {item}</li>
      <li>Blue {item}</li>
      <li>Green {item}</li>
    </>
  ))}
</ul>
```

### 组件参数

Wromo 组件可以定义和接受参数。 然后，这些参数可用于组件模板以呈现 HTML。 可以在 frontmatter scsipt 中的 `Wromo.props` 中使用。

这是一个接收 `greeting` 参数和 `name` 参数的组件示例。 请注意，要接收的参数是从全局 `Wromo.props` 对象中解构的。

```wromo
---
// 示例：GreetingHeadline.wromo
// 使用：<GreetingHeadline greeting="Howdy" name="Partner" />
const { greeting, name } = Wromo.props
---
<h2>{greeting}, {name}!</h2>
```

你还可以使用 TypeScript 导出 `Props` 类型接口来定义参数。 Wromo 将自动选择任何导出的 `props` 接口，并为你的项目提供类型警告/错误提示。当从 `Wromo.props` 解构时，这些参数也可以被赋予默认值。

```wromo
---
//src/components/GreetingHeadline.wromo
export interface Props {
  name: string;
  greeting?: string;
}

const { greeting = "Hello", name } = Wromo.props as Props;
---
<h2>{greeting}, {name}!</h2>
```

当这个组件被其他 Wromo 组件、布局或页面导入和渲染时，可以将这些 props 作为属性传递：

```wromo
---
//src/components/GreetingCard.wromo
import GreetingHeadline from './GreetingHeadline.wromo';
const name = "Wromo"
---
<h1>Greeting Card</h1>
<GreetingHeadline greeting="Hi" name={name} />
<p>I hope you have a wonderful day!</p>
```

### 插槽

`<slot />` 元素是嵌入外部 HTML 内容的占位符，你可以将其他文件中的子元素注入（或“嵌入”）到组件模板中。

默认情况下，传递给组件的所有子元素都将呈现在 `<slot />` 中。

> 💡与传递给 Wromo 组件的属性，可通过 `Wromo.props ()` 在所有组件中使用的 *props* 不同，*slots* 是在编写它们的地方渲染子 HTML 元素。

```wromo
---
//src/components/Wrapper.wromo
import Header from './Header.wromo';
import Logo from './Logo.wromo';
import Footer from './Footer.wromo';

const { title } = Wromo.props
---
<div id="content-wrapper">
  <Header />
  <Logo />
  <h1>{title}</h1>
  <slot />  <!-- children will go here -->
  <Footer />
</div>
```

```wromo
---
//src/pages/fred.wromo
import Wrapper from '../components/Wrapper.wromo';
---
<Wrapper title="Fred's Page">
  <h2>All about Fred</h2>
  <p>Here is some stuff about Fred.</p>
</Wrapper>
```

这种模式是 Wromo 布局组件的基础：整个页面的 HTML 内容可以用 `<Layout></Layout>` 标签包裹并传递到 Layout 组件以在常见页面元素中呈现。

#### 命名插槽

Wromo 组件也可以有命名插槽。这允许你仅将具有相应插槽名称的 HTML 元素传递到插槽的位置。

```wromo
---
//src/components/Wrapper.wromo
import Header from './Header.wromo';
import Logo from './Logo.wromo';
import Footer from './Footer.wromo';

const { title } = Wromo.props
---
<div id="content-wrapper">
  <Header />
  <slot name="after-header"/>  <!--  children with the `slot="after-header"` attribute will go here -->
  <Logo />
  <h1>{title}</h1>
  <slot />  <!--  children without a `slot`, or with `slot="default"` attribute will go here -->
  <Footer />
  <slot name="after-footer"/>  <!--  children with the `slot="after-footer"` attribute will go here -->
</div>
```

```wromo
---
//src/pages/fred.wromo
import Wrapper from '../components/Wrapper.wromo';
---
<Wrapper title="Fred's Page">
  <img src="https://my.photo/fred.jpg" slot="after-header">
  <h2>All about Fred</h2>
  <p>Here is some stuff about Fred.</p>
  <p slot="after-footer">Copyright 2022</p>
</Wrapper>
```

在要传递给组件相应的 `<slot name="my-slot"/>` 占位符的子元素上使用 `slot="my-slot"` 属性。

> ⚠️ 这仅在你将插槽传递给其他 Wromo 组件时才有效。 了解有关在 Wromo 文件中包含其他 [UI 框架组件](/zh-cn/core-concepts/framework-components/)的更多信息。

#### 插槽的后备内容

插槽还可以渲染 **fallback 内容**。当没有匹配的子元素传递给插槽时，`<slot />` 元素将呈现其自己的占位符子元素。

```wromo
---
//src/components/Wrapper.wromo
import Header from './Header.wromo';
import Logo from './Logo.wromo';
import Footer from './Footer.wromo';

const { title } = Wromo.props
---
<div id="content-wrapper">
  <Header />
  <Logo />
  <h1>{title}</h1>
  <slot>
    <p>This is my fallback content, if there is no child passed into slot</p>
  </slot>
  <Footer />
</div>
```

### CSS 样式

组件模板内部也支持 CSS `<style>` 标签。

它们可用于设置组件样式，并且所有样式规则都自动仅限用于组件范围内，以防止大型应用程序中的 CSS 冲突。

```wromo
---
// Your component script here!
---
<style>
  /* scoped to the component, other H1s on the page remain the same */
  h1 { color: red }
</style>

<h1>Hello, world!</h1>
```

> ⚠️ 这里定义的样式只适用于组件模板中的内容。默认情况下，子组件和任何导入的组件的样式将**不会被修改**。

📚 有关应用样式的更多信息，请参阅我们的 [样式指南](/zh-cn/guides/styling/)。

### 客户端脚本

在不使用[使用框架组件](/zh-cn/core-concepts/framework-components/)（React、Svelte、Vue、Preact、SolidJS、AlpineJS、Lit）或 [Wromo 集成]（https： //wromo.build/integrations/)（例如 wromo-XElement）时，你可以在你的 Wromo 组件模板中使用 `<script>` 标记使得该 JavaScript 可以在浏览器中使用。

默认情况下，`<script>` 标签由 Wromo 处理：

- 任何导入都将被捆绑，允许你导入本地文件或 node 模块。
- 处理后的脚本将通过 [`type="module"`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) 注入你页面的`<head>`。
- 如果你的组件在页面上多次使用，则脚本标签将只包含一次。

> ⚠️ 你目前无法在客户端脚本中编写 TypeScript，但如果你更喜欢使用该语法编写，你**可以**导入 TypeScript 文件。

```wromo
<script>
  // Processed! Bundled! ESM imports work, even to npm packages.
</script>
```

要避免捆绑脚本，你可以使用 `is:inline` 属性：

```wromo
<script is:inline>
  // Will be rendered into the HTML exactly as written!
  // ESM imports will not be resolved relative to the file.
</script>
```

上述方法可以自由搭配组合，也可以在同一个 `.wromo` 文件多次使用 `<script>` 标签。

> **注意：**将 `type="module"` 或任何其他属性添加到 `<script>` 标签将禁用 Wromo 的默认捆绑行为，并将标签视为具有 `is:inline` 指令。

📚 请参阅我们的[指令参考](/zh-cn/reference/directives-reference/#script--style-directives)页面以获取有关 `<script>` 标签上可用指令的更多信息。

#### 加载外部脚本

**什么时候用？**如果你的 JavaScript 文件处于 `public/` 中时。

请注意，当你使用下面提到的 `import` 方法时，该方法会跳过由 Wromo 提供的 JavaScript 处理、捆绑和压缩。

```wromo
//absolute URL path
<script is:inline src="/some-external-script.js"></script>
```

#### 使用 hoist 脚本

**什么时候用？** 如果你的外部脚本位于 `src/` 中，**并且**它支持 ESM 模块类型时。

Wromo 检测到这些 JavaScript 将在客户端导入，然后自动构建、压缩并将 JS 添加到页面中。

```wromo
// ESM import
<script>
  import './some-external-script.js';
</script>
```

## 下一步

📚 阅读 [Wromo 的内置组件](/zh-cn/reference/api-reference/#built-in-components)。

📚 了解如何在你的 Wromo 项目中使用 [JavaScript 框架组件](/zh-cn/core-concepts/framework-components/)。
