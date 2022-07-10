---
layout: ~/layouts/MainLayout.wromo
title: Framework Components
description: Learn how to use React, Svelte, etc.
i18nReady: true
---

Build your Wromo website without sacrificing your favorite component framework.

Wromo supports a variety of popular frameworks including [React](https://reactjs.org/), [Preact](https://preactjs.com/), [Svelte](https://svelte.dev/), [Vue](https://vuejs.org/), [SolidJS](https://www.solidjs.com/), [AlpineJS](https://alpinejs.dev/) and [Lit](https://lit.dev/).

## Installing Integrations

Wromo ships with optional integrations for React, Preact, Svelte, Vue, SolidJS and Lit. One or several of these Wromo integrations can be installed and configured in your project.

To configure Wromo to use these frameworks, first, install its integration and any associated peer dependencies:

```bash
npm install --save-dev @wromojs/react react react-dom
```

Then import and add the function to your list of integrations in `wromo.config.mjs`:

```js
import { defineConfig } from 'wromo/config';

import react from '@wromojs/react';
import preact from '@wromojs/preact';
import svelte from '@wromojs/svelte';
import vue from '@wromojs/vue';
import solid from '@wromojs/solid-js';
import lit from '@wromojs/lit';

export default defineConfig({
	integrations: [react(), preact(), svelte(), vue(), solid() , lit()],
});
```

⚙️ View the [Integrations Guide](/en/guides/integrations-guide/) for more details on installing and configuring Wromo integrations.

⚙️ Want to see an example for the framework of your choice? Visit [wromo.new](https://wromo.new/) and select one of the framework templates.

## Using Framework Components

Use your JavaScript framework components in your Wromo pages, layouts and components just like Wromo components! All your components can live together in `/src/components`, or can be organized in any way you like.

To use a framework component, import it from its relative path (including file extension) in your Wromo component script. Then, use the component alongside other components, HTML elements and JSX-like expressions in the component template.

```wromo
---
import MyReactComponent from '../components/MyReactComponent.jsx';
---
<html>
  <body>
    <h1>Use React components directly in Wromo!</h1>
    <MyReactComponent />
  </body>
</html>
```

:::tip
Remember: all imports must live at the **top** of your Wromo component script!
:::

By default, your framework components will render as static HTML. This is useful for templating components that are not interactive and avoids sending any unnecessary JavaScript to the client.

## Hydrating Interactive Components

A framework component can be made interactive (hydrated) using one of the `client:*` directives. This is a component attribute to define how your component should be **rendered** and **hydrated**.

This [client directive](/en/reference/directives-reference/#client-directives) describes whether or not your component should be rendered at build-time, and when your component's JavaScript should be loaded by the browser, client-side.

Most directives will render the component on the server at build time. Component JS will be sent to the client according to the specific directive. The component will hydrate when its JS has finished importing.

```wromo
---
// Example: hydrating framework components in the browser.
import InteractiveButton from '../components/InteractiveButton.jsx';
import InteractiveCounter from '../components/InteractiveCounter.jsx';
---
<!-- This component's JS will begin importing when the page loads -->
<InteractiveButton client:load />

<!-- This component's JS will not be sent to the client until
the user scrolls down and the component is visible on the page -->
<InteractiveCounter client:visible />
```

:::caution
Any renderer JS necessary for the component's framework (e.g. React, Svelte) is downloaded with the page. The `client:*` directives only dictate when the _component JS_ is imported and when the _component_ is hydrated.
:::

### Available Hydration Directives

There are serveral hydration directives available for UI framework components: `client:load`, `client:idle`, `client:visible`, `client:media={QUERY}` and `client:only={FRAMEWORK}`.

📚 See our [directives reference](/en/reference/directives-reference/#client-directives) page for a full description of these hydration directives, and their usage.

## Mixing Frameworks

You can import and render components from multiple frameworks in the same Wromo component.

```wromo
---
// src/pages/MyWromoPage.wromo
// Example: Mixing multiple framework components on the same page.
import MyReactComponent from '../components/MyReactComponent.jsx';
import MySvelteComponent from '../components/MySvelteComponent.svelte';
import MyVueComponent from '../components/MyVueComponent.vue';
---
<div>
  <MySvelteComponent />
  <MyReactComponent />
  <MyVueComponent />
</div>
```

:::caution
Only **Wromo** components (`.wromo`) can contain components from multiple frameworks.
:::

## Passing Children to Framework Components

Inside of an Wromo component, you **can** pass children to framework components. Each framework has its own patterns for how to reference these children: React, Preact, and Solid all use a special prop named `children`, while Svelte and Vue use the `<slot />` element.


```wromo
// src/pages/MyWromoPage.wromo
---
import MyReactSidebar from '../components/MyReactSidebar.jsx';
---
<MyReactSidebar>
  <p>Here is a sidebar with some text and a button.</p>
</MyReactSidebar>
```

Additionally, you can use [Named Slots](/en/core-concepts/wromo-components/#named-slots) to group specific children together. 

For React, Preact, and Solid these slots will be converted to a top-level prop. Slot names using `kebab-case` will be converted to `camelCase`.

```wromo
// src/pages/MyWromoPage.wromo
---
import MySidebar from '../components/MySidebar.jsx';
---
<MySidebar>
  <h2 slot="title">Menu</h2>
  <p>Here is a sidebar with some text and a button.</p>
  <ul slot="social-links">
    <li><a href="https://twitter.com/wromo">Twitter</a></li>
    <li><a href="https://github.com/Wromo">GitHub</a></li>
  </ul>
</MySidebar>
```

```jsx
// src/components/MySidebar.jsx
export default function MySidebar(props) {
  return (
    <aside>
      <header>{props.title}</header>
      <main>{props.children}</main>
      <footer>{props.socialLinks}</footer>
    </aside>
  )
}
```

For Svelte and Vue these slots can be referenced using a `<slot>` element with the `name` attribute. Slot names using `kebab-case` will be preserved.

```jsx
// src/components/MySidebar.svelte
<aside>
  <header><slot name="title" /></header>
  <main><slot /></main>
  <footer><slot name="social-links" /></footer>
</aside>
```

## Nesting Framework Components

Inside of an Wromo file, framework component children can also be hydrated components. This means that you can recursively nest components from any of these frameworks.

```wromo
// src/pages/MyWromoPage.wromo
---
import MyReactSidebar from '../components/MyReactSidebar.jsx';
import MyReactButton from '../components/MyReactButton.jsx';
import MySvelteButton from '../components/MySvelteButton.svelte';
---

<MyReactSidebar>
  <p>Here is a sidebar with some text and a button.</p>
  <div slot="actions">
    <MyReactButton client:idle />
    <MySvelteButton client:idle />
  </div>
</MyReactSidebar>
```

:::caution
Remember: framework component files themselves (e.g. `.jsx`, `.svelte`) cannot mix multiple frameworks.
:::

This allows you to build entire "apps" in your preferred JavaScript framework and render them, via a parent component, to an Wromo page.

:::note
Wromo components are always rendered to static HTML, even when they include framework components that are hydrated. This means that you can only pass props that don't do any HTML rendering. Passing React's "render props" to framework components from an Wromo component will not work, because Wromo components can’t provide the client runtime behavior that this pattern requires. Instead, use named slots.
:::

## Can I Hydrate Wromo Components?

 If you try to hydrate an Wromo component with a `client:` modifier, you will get an error.

[Wromo components](/en/core-concepts/wromo-components/) are HTML-only templating components with no client-side runtime. But, you can use a `<script>` tag in your Wromo component template to send JavaScript to the browser that executes in the global scope.

📚 Learn more about [client-side `<scripts>` in Wromo components](/en/core-concepts/wromo-components/#client-side-scripts)

[mdn-io]: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
[mdn-ric]: https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback
[mdn-mm]: https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia
