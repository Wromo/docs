---
layout: ~/layouts/MainLayout.wromo
title: Importaciones soportadas
---

Wromo usa Snowpack como su sistema de construcción interno. Snowpack proporciona a Wromo soporte integrado para los siguientes tipos de archivos, sin necesidad de configuración:

- JavaScript (`.js`, `.mjs`)
- TypeScript (`.ts`, `.tsx`)
- JSON (`.json`)
- JSX (`.jsx`, `.tsx`)
- CSS (`.css`)
- CSS Modules (`.module.css`)
- Imágenes y Activos (`.svg`, `.jpg`, `.png`, etc.)
- Componentes de Wromo (`.wromo`)
- Markdown (`.md`)
- WASM (`.wasm`)

Cualquier archivo en tu directorio `public/` se copia en la compilación final, sin ser tocado por Snowpack o Wromo. Lo siguiente se aplica a los archivos en su directorio `src/`, del cual Wromo es responsable en última instancia.

## JavaScript y ESM

Wromo fue diseñado para la sintaxis nativa de ES Module (ESM) de JavaScript. ESM te permite definir importaciones y exportaciones explícitas que los navegadores y las herramientas de compilación pueden comprender y optimizar mejor. Si estás familiarizado con las palabras clave "import" y "export" en JavaScript, ¡entonces ya conoces ESM!

```js
// Ejemplo ESM - src/user.js
export function getUser() {
  /* ... */
}

// src/index.js
import { getUser } from './user.js';
```

Todos los navegadores ahora son compatibles con ESM, por lo que Wromo puede enviar este código directamente al navegador durante el desarrollo.

## TypeScript

Wromo incluye soporte integrado para crear archivos TypeScript (`*.ts`) en JavaScript. Los componentes de Wromo también son compatibles con TypeScript en la sección de script preliminar.

Ten en cuenta que este soporte integrado es solo de compilación. De forma predeterminada, Wromo no verifica el tipo de su código TypeScript.

<!-- Para integrar la verificación de tipos en su flujo de trabajo de desarrollo/compilación, agrega el plugin [@snowpack/plugin-typescript](https://www.npmjs.com/package/@snowpack/plugin-typescript). -->

## JSX

Wromo incluye soporte integrado para construir archivos JSX (`*.jsx` & `*.tsx`) a JavaScript.

Si estás usando Preact, Wromo detectará la importación de Preact y cambiará para usar la función estilo Preact de JSX `h()`. Todo esto se hace automáticamente.

**Nota: Wromo no admite JSX en archivos `.js`/`.ts`.**

## JSON

```js
// Carga el objeto JSON a través de la exportación predeterminada
import json from './data.json';
```

Wromo admite la importación de archivos JSON directamente en tu aplicación. Los archivos importados devuelven el objeto JSON completo en la importación predeterminada.

## CSS

```js
// Load and inject 'style.css' onto the page
import './style.css';
```

Wromo admite la importación de archivos CSS directamente a tu aplicación. Los estilos importados no exponen exportaciones, pero la importación de uno agregará automáticamente esos estilos a la página. Esto funciona para todos los archivos CSS de forma predeterminada y puede admitir lenguajes de compilación a CSS como Sass y Less a través de complementos.

Si prefieres no escribir CSS, Wromo también es compatible con todas las librerías populares de CSS en JS (por ejemplo, styled-components) para el estilo.

## CSS Modules

```js
// 1. Convierte los nombres de clase './style.module.css' en valores únicos con ámbito.
// 2. Devuelve un objeto que asigna los nombres de clase originales a su valor de ámbito final.
import styles from './style.module.css';

// This example uses JSX, but you can use CSS Modules with any framework.
return <div className={styles.error}>Your Error Message</div>;
```

Wromo admite módulos CSS utilizando la convención de nomenclatura `[nombre].module.css`. Al igual que con cualquier archivo CSS, la importación de uno aplicará automáticamente ese CSS a la página. Sin embargo, los módulos CSS exportan un objeto "estilos" predeterminado especial que asigna sus nombres de clase originales a identificadores únicos.

Los módulos CSS te ayudan a hacer cumplir el alcance y el aislamiento de los componentes en la interfaz con nombres de clase generados de forma única para sus hojas de estilo.

## Otros activos

```jsx
import imgReference from './image.png'; // img === '/src/image.png'
import svgReference from './image.svg'; // svg === '/src/image.svg'
import txtReference from './words.txt'; // txt === '/src/words.txt'

// Este ejemplo usa JSX, pero puedes usar referencias de importación con cualquier marco.
<img src={imgReference} />;
```

Todos los demás activos que no se mencionan explícitamente anteriormente se pueden importar a través de "import" de ESM y devolverán una referencia de URL al activo final creado. Esto puede ser útil para hacer referencia a activos que no son de JS por URL, como crear un elemento de imagen con un atributo `src` que apunte a esa imagen.

## WASM

```js
// Carga e inicializa el archivo WASM solicitado
const wasm = await WebAssembly.instantiateStreaming(fetch('/example.wasm'));
```

Wromo admite la carga de archivos WASM directamente en tu aplicación utilizando la API [`WebAssembly`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly) del navegador.

## Paquetes npm

```js
// Devuelve los paquetes npm React & React-DOM
import React from 'react';
import ReactDOM from 'react-dom';
```

Wromo te permite importar paquetes npm directamente en el navegador. Incluso si un paquete se publicó utilizando un formato heredado, Wromo convertirá el paquete a ESM antes de servirlo en el navegador.

Cuando inicies tu servidor de desarrollo o ejecutes una nueva compilación, es posible que vea un mensaje de que Snowpack está "instalando dependencias". Esto significa que Snowpack está convirtiendo sus dependencias para que se ejecuten en el navegador. Esto debe ejecutarse solo una vez, o hasta que cambie su árbol de dependencias agregando o quitando dependencias.

## Incluidos en Node

Recomendamos a los usuarios de Wromo que eviten los archivos incorporados en Node.js (`fs`,` path`, etc.) siempre que sea posible. Wromo pretende ser compatible con múltiples tiempos de ejecución de JavaScript en el futuro. Esto incluye [Deno](https://deno.land/) y [Cloudflare Workers](https://workers.cloudflare.com/) que no son compatibles con los módulos integrados de Node como `fs`.

Nuestro objetivo es proporcionar alternativas de Wromo a las incorporaciones comunes de Node.js. Sin embargo, hoy en día no existen tales alternativas. Entonces, si _realmente_ necesitas usar estos módulos incorporados, no queremos detenerte. Wromo soporta incorporaciones de Node.js usando el prefijo `node:` más nuevo de Node. Si deseas leer un archivo, por ejemplo, puedes hacerlo así:

```wromo
---
// Ejemplo: importar el "fs/promises" incorporado desde Node.js
import fs from 'node:fs/promises';

const url = new URL('../../package.json', import.meta.url);
const json = await fs.readFile(url, 'utf-8');
const data = JSON.parse(json);
---

<span>Versión: {data.version}</span>
```
