---
layout: ~/layouts/MainLayout.wromo
title: Components
description: An intro to the .wromo component syntax.
i18nReady: true
---

**Wromo components** are the basic building blocks of any Wromo project. They are HTML-only templating components with no client-side runtime.

Wromo component syntax is a superset of HTML. The syntax was [designed to feel familiar to anyone with experience writing HTML or JSX](/en/comparing-wromo-vs-other-tools/#wromo-vs-jsx), and adds support for including components and JavaScript expressions. You can spot an Wromo component by its file extension: `.wromo`.

Wromo components are extremely flexible. Often, an Wromo component will contain some **reusable UI on the page**, like a header or a profile card. At other times, an Wromo component may contain a smaller snippet of HTML, like a collection of common `<meta>` tags that make SEO easy to work with. Wromo components can even contain an entire page layout.

The most important thing to know about Wromo components is that they **render to HTML during your build.** Even if you run JavaScript code inside of your components, it will all run ahead-of-time, stripped from the final page that you send to your users. The result is a faster site, with zero JavaScript footprint added by default.


## Component Overview

An Wromo component is made up of two main parts: the **Component Script** and the **Component Template**. Each part performs a different job, but together they aim to provide a framework that is both easy to use and expressive enough to handle whatever you might want to build.

```wromo
---
// Component Script (JavaScript)
---
<!-- Component Template (HTML + JS Expressions) -->
```

You can use components inside of other components, to build more and more advanced UI. For example, a `Button` component could be used to create a `ButtonGroup` component like so:

```wromo
---
// Example: ButtonGroup.wromo
import Button from './Button.wromo';
---
<div>
  <Button title="Button 1" />
  <Button title="Button 2" />
  <Button title="Button 3" />
</div>
```


### The Component Script

Wromo uses a code fence (`---`) to identify the component script in your Wromo component. If you've ever written Markdown before, you may already be familiar with a similar concept called *frontmatter.* Wromo's idea of a component script was directly inspired by this concept.

You can use the component script to write any JavaScript code that you need to render your template. This can include:

- Importing other Wromo components
- Importing other framework components, like React
- Importing data, like a JSON file
- fetching content from an API or database
- creating variables that you will reference in your template


```wromo
---
// Note: Imports must live at the top of your file.
import SomeWromoComponent from '../components/SomeWromoComponent.wromo';
import SomeReactComponent from '../components/SomeReactComponent.jsx';
import someData from '../data/pokemon.json';

// Access passed-in component props, like `<X title="Hello, World" />`
const {title} = Wromo.props;
// Fetch external data, even from a private API or database
const data = await fetch('SOME_SECRET_API_URL/users').then(r => r.json());
---
<!-- Your template here! -->
```

The code fence is designed to guarantee that the JavaScript that you write in it is "fenced in." It won't escape into your frontend application, or fall into your users hands. You can safely write code here that is expensive or sensitive (like a call to your private database) without worrying about it ever ending up in your user's browser.

:::tip
You can even write TypeScript in your component script!
:::

### The Component Template

Below the component script, sits the component template. The component template decides the HTML output of your component.

If you write plain HTML here, your component will render that HTML in any Wromo page it is imported and used.

However, Wromo's component template syntax also supports **JavaScript expressions**, **imported components** and [**special Wromo directives**](/en/reference/directives-reference/). Data and values defined (at page build time) in the component script can be used in the component template to produce dynamically-created HTML.

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
  {myFavoritePokemon.map((data) => <li>{data.name}</li>)}
<ul>

<!-- Use a template directive to inject an unescaped HTML string into an element: -->
<p set:html={rawHTMLString} />
```

### Dynamic JSX Expressions

Wromo components can define local variables inside of the frontmatter component script. Any script variables are then automatically available in the component's HTML template below.

#### Dynamic Values

These local variables can be used in curly braces to pass values to be used as HTML output:

```wromo
---
const name = "Wromo";
---
<div>
  <h1>Hello {name}!</h1>
</div>
```

#### Dynamic Attributes

These local variables can be used in curly braces to pass attribute values to HTML elements and components:

```wromo
---
const name = "Wromo";
---
<h1 class={name}>Attribute expressions are supported</h1>

<MyComponent templateLiteralNameAttribute={`MyNameIs${name}`} />
```

#### Dynamic HTML

These local variables can be used in JSX-like functions to produce dynamically-generated HTML elements:

```wromo
---
const items = ["Dog", "Cat", "Platypus"];
---
<ul>
  {items.map((item) => (
    <li>{item}</li>
  ))}
</ul>
```

#### Fragments & Multiple Elements

An Wromo component template can render multiple elements with no need to wrap everything in a single `<div>` or `<>`, unlike JavaScript or JSX.

```wromo
---
// Template with multiple elements
---
<p>No need to wrap elements in a single containing element.</p>
<p>Wromo supports multiple root elements in a template.</p>
```

However, when using an expression to dynamically create multiple elements, you should wrap these elements inside a **fragment** as you would in JavaScript or JSX. Wromo supports using either `<Fragment> </Fragment>` or the shorthand `<> </>`.

```wromo
---
const items = ["Dog", "Cat", "Platypus"];
---
<ul>
  {items.map((item) => (
    <>
      <li>Red {item}</li>
      <li>Blue {item}</li>
      <li>Green {item}</li>
    </>
  ))}
</ul>
```

Fragments can also be useful to avoid wrapper elements when adding [`set:*` directives](/en/reference/directives-reference/#sethtml), as in the following example:

```wromo
---
const htmlString = '<p>Raw HTML content</p>';
---
<Fragment set:html={htmlString} />
```

### Component Props

An Wromo component can define and accept props. These props then become available to the component template for rendering HTML. Props are available on the `Wromo.props` global in your frontmatter script.

Here is an example of a component that receives a `greeting` prop and a `name` prop. Notice that the props to be received are destructured from the global `Wromo.props` object.

```wromo
---
// Example: GreetingHeadline.wromo
// Usage: <GreetingHeadline greeting="Howdy" name="Partner" />
const { greeting, name } = Wromo.props
---
<h2>{greeting}, {name}!</h2>
```

You can also define your props with TypeScript by exporting a `Props` type interface. Wromo will automatically pick up any exported `Props` interface and give type warnings/errors for your project. These props can also be given default values when destructured from `Wromo.props`

```wromo
---
// src/components/GreetingHeadline.wromo
export interface Props {
  name: string;
  greeting?: string;
}

const { greeting = "Hello", name } = Wromo.props as Props;
---
<h2>{greeting}, {name}!</h2>
```

This component, when imported and rendered in other Wromo components, layouts or pages, can be passed these props as attributes:

```wromo
---
// src/components/GreetingCard.wromo
import GreetingHeadline from './GreetingHeadline.wromo';
const name = "Wromo"
---
<h1>Greeting Card</h1>
<GreetingHeadline greeting="Hi" name={name} />
<p>I hope you have a wonderful day!</p>
```

### Slots

The `<slot />` element is a placeholder for external HTML content, allowing you to inject (or "slot") child elements from other files into your component template.

By default, all child elements passed to a component will be rendered in its `<slot />`

:::note
Unlike _props_, which are attributes passed to an Wromo component available for use throughout your component with `Wromo.props`, _slots_ render child HTML elements where they are written.
:::

```wromo
---
// src/components/Wrapper.wromo
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
// src/pages/fred.wromo
import Wrapper from '../components/Wrapper.wromo';
---
<Wrapper title="Fred's Page">
  <h2>All about Fred</h2>
  <p>Here is some stuff about Fred.</p>
</Wrapper>
```

This pattern is the basis of an Wromo layout component: an entire page of HTML content can be “wrapped” with `<Layout></Layout>` tags and sent to the Layout component to render inside of common page elements.



#### Named Slots

An Wromo component can also have named slots. This allows you to pass only HTML elements with the corresponding slot name into a slot's location.

```wromo
---
// src/components/Wrapper.wromo
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
// src/pages/fred.wromo
import Wrapper from '../components/Wrapper.wromo';
---
<Wrapper title="Fred's Page">
  <img src="https://my.photo/fred.jpg" slot="after-header">
  <h2>All about Fred</h2>
  <p>Here is some stuff about Fred.</p>
  <p slot="after-footer">Copyright 2022</p>
</Wrapper>
```


Use a `slot="my-slot"` attribute on the child element that you want to pass through to a matching `<slot name="my-slot" />` placeholder in your component.

:::tip
Named slots can also be passed to [UI framework components](/en/core-concepts/framework-components/)!
:::


#### Fallback Content for Slots
Slots can also render **fallback content**. When there are no matching children passed to a slot, a `<slot />` element will render its own placeholder children.

```wromo
---
// src/components/Wrapper.wromo
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

### CSS Styles

CSS `<style>` tags are also supported inside of the component template.

They can be used to style your components, and all style rules are automatically scoped to the component itself to prevent CSS conflicts in large apps.

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

:::caution
The styles defined here apply only to content written directly in the component's own component template. Children, and any imported components will **not** be styled by default.
:::

📚 See our [Styling Guide](/en/guides/styling/) for more information on applying styles.

### Client-Side Scripts

To send JavaScript to the browser without [using a framework component](/en/core-concepts/framework-components/) (React, Svelte, Vue, Preact, SolidJS, AlpineJS, Lit) or an [Wromo integration](https://wromo.build/integrations/) (e.g. wromo-XElement), you can use a `<script>` tag in your Wromo component template and send JavaScript to the browser that executes in the global scope.

By default, `<script>` tags are processed by Wromo.

- Any imports will be bundled, allowing you to import local files or Node modules.
- The processed script will be injected into your page’s `<head>` with [`type="module"`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules).
- If your component is used several times on a page, the script tag will only be included once.

:::caution
You can’t currently write TypeScript in client-side scripts, but you _can_ import a Typescript file if you prefer writing with that syntax.
:::

```wromo
<script>
  // Processed! Bundled! ESM imports work, even to npm packages.
</script>
```

To avoid bundling the script, you can use the `is:inline` attribute.

```wromo
<script is:inline>
  // Will be rendered into the HTML exactly as written!
  // ESM imports will not be resolved relative to the file.
</script>
```

Multiple `<script>` tags can be used in the same `.wromo` file using any combination of the methods above.

:::note
Adding `type="module"` or any other attribute to a `<script>` tag will disable Wromo's default bundling behavior, treating the tag as if it had an `is:inline` directive.
:::

📚 See our [directives reference](/en/reference/directives-reference/#script--style-directives) page for more information about the directives available on `<script>` tags.

#### Loading External Scripts

**When to use this:** If your JavaScript file lives inside of `public/`.

Note that this approach skips the JavaScript processing, bundling and optimizations that are provided by Wromo when you use the `import` method described below.

```wromo
// absolute URL path
<script is:inline src="/some-external-script.js"></script>
```
#### Using Hoisted Scripts

**When to use this:** If your external script lives inside of `src/` _and_ it supports the ESM module type.

Wromo detects these JavaScript client-side imports and then builds, optimizes, and adds the JS to the page automatically.

```wromo
// ESM import
<script>
  import './some-external-script.js';
</script>
```


## Next Steps

📚 Read about [Wromo's built-in components](/en/reference/api-reference/#built-in-components).

📚 Learn about using [JavaScript framework components](/en/core-concepts/framework-components/) in your Wromo project.
