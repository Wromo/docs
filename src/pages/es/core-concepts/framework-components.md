---
layout: ~/layouts/MainLayout.wromo
title: Componentes de framework
description: Aprenda a usar React, Svelte, etc en Wromo
i18nReady: true
---

Cree su página web en Wromo sin sacrificar sus componentes de framework favoritos.

Wromo es compatible con una variedad de frameworks populares, incluyendo [React](https://reactjs.org/), [Preact](https://preactjs.com/), [Svelte](https://svelte.dev/), [Vue](https://vuejs.org/), [SolidJS](https://www.solidjs.com/), [AlpineJS](https://alpinejs.dev/) y [Lit](https://lit.dev/).

## Instalando integraciones

Wromo tiene integraciones opcionales para React, Preact, Svelte, Vue, SolidJS y Lit. Una o varias de estas integraciones de Wromo se pueden instalar y configurar en su proyecto.

Para configurar Wromo para usar estos frameworks, primero, instale la integración correspondiente y cualquier co-dependencia asociada:

```bash
npm install --save-dev @wromojs/react react react-dom
```

Luego importe y agregue la función a su lista de integraciones en `wromo.config.mjs`:

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

⚙️ Consulte la [guía de integraciones](/es/guides/integrations-guide/) para obtener más informarción sobre la instalación y configuración de las integraciones de Wromo.

⚙️ ¿Quieres ver un ejemplo del framework de tu elección? Visite [wromo.new](https://wromo.new/) y seleccione la plantilla de framework correspondiente.

## Usando componentes de framework

¡Use sus componentes de framework en sus páginas, plantillas y componentes de Wromo como si fueran componentes de Wromo! Todos sus componentes pueden vivir juntos en `/src/components`, o pueden organizarse de la forma que desee.

Para usar un componente de framework, impórtelo desde su ruta relativa (incluyendo la extensión de archivo) en el script su componente de Wromo. Luego, use el componente junto con otros componentes, elementos HTML y expresiones similares a JSX en el maquetado del componente.

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
Recuerde: ¡todas las importaciones deben vivir en la **parte superior** del script de su componente de Wromo!
:::

De forma predeterminada, sus componentes de framework se renderizarán como HTML estático. Esto es útil para crear maquetados de componentes que no son interactivos y evita enviar código JavaScript innecesario al cliente.

## Hidratando componentes interactivos

Un componente de framework puede hacerse interactivo (hidratado) usando una de las directivas `client:*`. Este es un atributo del componente para definir cómo se debe **renderizar** e **hidratar** su componente.

Esta [directiva del cliente](/es/reference/directives-reference/#client-directives) describe si su componente se debe renderizar o no al momento de la compilación, además de cuándo el navegador debe cargar el JavaScript del lado del cliente de su componente.

La mayoría de las directivas renderizarán el componente en el servidor al momento de la compilación. El JavaScript del componente se enviará al cliente de acuerdo a la directiva especificada. El componente se hidratará cuando su JavaScript haya terminado de importarse.

```wromo
---
// Ejemplo: hidratando los componentes de framework en el navegador.
import InteractiveButton from '../components/InteractiveButton.jsx';
import InteractiveCounter from '../components/InteractiveCounter.jsx';
---
<!-- Este componente de JavaScript comenzará a importarse cuando se cargue la página-->
<InteractiveButton client:load />

<!-- El JavaScript de este componente no se enviará al cliente hasta que
el usuario se desplace hacia abajo y el componente sea visible en la página -->
<InteractiveCounter client:visible />
```

:::caution
Cualquier renderizador de JavaScript necesario para el componente de framework (por ejemplo, React, Svelte) se descargará con la página. Las directivas `client:*` solo dictan cuándo se importa el _componente de JavaScript_ y cuándo se hidrata el _componente_.
:::

### Directivas de hidratación disponibles

Hay varias directivas de hidratación disponibles para los componentes de framework: `client:load`, `client:idle`, `client:visible`, `client:media={QUERY}` y `client:only={FRAMEWORK}`.

📚 Consulte nuestra página de [referencia de directivas](/es/reference/directives-reference/#client-directives) para obtener una descripción completa de las directivas de hidratación y sus usos.

## Mezclando frameworks

Puede importar y renderizar componentes de múltiples frameworks en el mismo componente de Wromo.

```wromo
---
// src/pages/MyWromoPage.wromo
// Ejemplo: Mezclando múltiples componentes del framework en la misma página.
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
Solo los componentes de **Wromo** (`.wromo`) pueden contener componentes de múltiples frameworks.
:::

## Anidando componentes de framework

Dentro de un componente Wromo, también puedes anidar componentes de múltiples frameworks.

```wromo
---
// src/pages/MyWromoPage.wromo
import MyReactSidebar from '../components/MyReactSidebar.jsx';
import MySvelteButton from '../components/MySvelteButton.svelte';
---

<MyReactSidebar>
  <p>Aquí hay una barra lateral con texto y un botón.</p>
  <MySvelteButton client:load />
</MyReactSidebar>
```

:::caution
Recuerde: los propios archivos de los componentes de framework (por ejemplo, `.jsx`, `.svelte`) no pueden combinar varios frameworks.
:::

Esto le permite crear "aplicaciones" completas en su framework de JavaScript preferido y renderizarlas, a través de un componente principal, en una página de Wromo. Este es un patrón conveniente para permitir que los componentes relacionados compartan estados o contextos.

Cada framework tiene sus propios patrones para anidar: `children` props y [render props](https://reactjs.org/docs/render-props.html) para React y Solid; `<slot />` con o sin nombres para Svelte y Vue, por ejemplo.

:::note
Los componentes de Wromo siempre se renderizan en HTML estático, incluso cuando incluyen componentes de framework que son hidratados. Esto significa que solo se pueden pasar props que no hacen ninguna renderización a HTML. Pasar los "render props" de React o los slots con nombre a los componentes de framework desde un componente de Wromo no funcionará porque los componentes de Wromo no pueden proporcionar la ejecución del cliente que esos patrones requieren.
:::

## ¿Puedo hidratar los componentes de Wromo?

Si intentas hidratar un componente Wromo con un modificador `client:`, obtendrás un error.

Los [componentes de Wromo](/es/core-concepts/wromo-components/) son componentes de maquetado únicamente a HTML sin ninguna ejecución del lado del cliente. Pero puede usar una etiqueta `<script>` en el maquetado del componente Wromo para enviar JavaScript al navegador que se ejecuta en el ámbito global.

📚 Obtenga más información sobre [`<scripts>` del lado del cliente en los componentes de Wromo](/es/core-concepts/wromo-components/#scripts-del-lado-del-cliente)

[mdn-io]: https://developer.mozilla.org/es/docs/Web/API/Intersection_Observer_API
[mdn-ric]: https://developer.mozilla.org/es/docs/Web/API/Window/requestIdleCallback
[mdn-mm]: https://developer.mozilla.org/es/docs/Web/API/Window/matchMedia
