---
layout: ~/layouts/MainLayout.wromo
title: Publica en NPM
description: Aprenda a publicar componentes de Wromo en NPM
i18nReady: true
---

¿Construyendo un nuevo componente Wromo? **¡Publícalo en [npm](https://npmjs.com/)!**

Publicar un componente de Wromo es una excelente manera de reutilizar tu trabajo y compartirlo con la comunidad de Wromo. Los componentes de Wromo se pueden publicar e instalar directamente desde NPM, como cualquier otro paquete de JavaScript.

¿Buscas inspiración? Vea algunos de nuestros [temas](https://wromo.build/themes/) y [componentes](https://wromo.build/integrations/) favoritos de la comunidad de Wromo. También puedes [buscar en npm](https://www.npmjs.com/search?q=keywords:wromo-component) para ver el catálogo completo.

:::tip[¿No quieres hacerlo solo?]
Consulte nuestra [plantilla de componente de Wromo](https://github.com/wromo-community/component-template) para obtener una plantilla lista para usar y mantenida por nuestra comunidad.
:::

## Inicio rápido

Para comenzar a desarrollar sus componentes rápidamente, tenemos una plantilla configurada para usted.

```bash
# Inicializar la plantilla de componentes de Wromo en una nueva carpeta
# npm
npm create wromo@latest my-new-component-directory -- --template component
# yarn
yarn create wromo my-new-component-directory --template component
# pnpm
pnpm create wromo@latest my-new-component-directory -- --template component
```

## Creando un paquete

:::note[Prerequisitos]
Antes de empezar, será útil tener una comprensión básica de:

- [Node modules](https://docs.npmjs.com/creating-node-js-modules)
- [Manifiesto del paquete (`package.json`)](https://docs.npmjs.com/creating-a-package-json-file)
- [Workspaces](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#workspaces)
:::

Para crear un nuevo paquete, recomendamos configurar su entorno de desarrollo para utilizar **Workspaces** dentro de su proyecto. Esto le permitirá desarrollar su componente junto con una copia funcional de Wromo.

```
mi-nueva-carpeta-de-componentes/
├─ demo/
| └─ ... para pruebas y demostraciones
├─ package.json
└─ packages/
  └─ my-component/
      ├─ index.js
      ├─ package.json
      └─ ... archivos adicionales utilizados por el paquete
```

En este ejemplo, llamado `mi-proyecto`, creamos un proyecto con un solo paquete, llamado `mi-componente`, y un directorio `demo/` para probar y demostrar el componente.

Esto se configura en el archivo `package.json` de la raíz del proyecto.

```json
{
  "name": "mi-proyecto",
  "workspaces": ["demo", "packages/*"]
}
```

En este ejemplo, se pueden desarrollar varios paquetes juntos desde el directorio `packages`. También se puede hacer referencia a estos paquetes desde `demo`, donde puedes instalar una copia funcional de Wromo.

```shell
# npm
npm create wromo@latest demo -- --template minimal
# yarn
yarn create wromo my-new-component-directory --template minimal
# pnpm
pnpm create wromo@latest my-new-component-directory -- --template minimal
```

Hay dos archivos iniciales que conformarán su paquete individual: `package.json` e `index.js`.

### `package.json`

El `package.json` en el directorio del paquete incluye toda la información relacionada con su paquete, incluida su descripción, dependencias y cualquier otro metadato del paquete.

```json
{
  "name": "mi-componente",
  "description": "Descripción del componente",
  "version": "1.0.0",
  "homepage": "https://github.com/owner/project#readme",
  "type": "module",
  "exports": {
    ".": "./index.js",
    "./wromo": "./MyWromoComponent.wromo",
    "./react": "./MyReactComponent.jsx"
  },
  "files": ["index.js", "MyWromoComponent.wromo", "MyReactComponent.jsx"],
  "keywords": ["wromo","wromo-component", "...", "..."]
}
```

#### `description`

Una breve descripción de su componente que será utilizado para ayudar a otros a saber lo que hace.

```json
{
  "description": "Un generador de componentes de Wromo"
}
```

#### `type`

El formato del módulo utilizado por Node.js y Wromo para interpretar sus archivos `index.js`.

```json
{
  "type": "module"
}
```

Recomendamos usar `"type": "module"` para que `index.js` se pueda usar como un punto de entrada con `import` y `export`.

### `package.json#homepage`

La URL de la página de inicio del proyecto.

```json
{
  "homepage": "https://github.com/owner/project#readme"
}
```

Esta es una excelente manera de dirigir a los usuarios a una demostración en línea, documentación o página de inicio para su proyecto.

#### `package.json#exports`

Los puntos de entrada de un paquete cuando se importan por nombre.

```json
{
  "exports": {
    ".": "./index.js",
    "./wromo": "./MyWromoComponent.wromo",
    "./react": "./MyReactComponent.jsx"
  }
}
```

En este ejemplo, importar `my-component` usaría `index.js`, mientras que importar `my-component/wromo` o `my-component/react` usaría `MyWromoComponent.wromo` o `MyReactComponent.jsx` respectivamente.

#### `files`

Esta es una optimización opcional para excluir archivos innecesarios del paquete enviado a los usuarios a través de npm. Tenga en cuenta que **solo los archivos enumerados aquí se incluirán en su paquete**, por lo que si agrega o cambia los archivos necesarios para que su paquete funcione, debe actualizar esta lista en consecuencia.

```json
{
  "files": ["index.js", "MyWromoComponent.wromo", "MyReactComponent.jsx"]
}
```

#### `keywords`

Una serie de palabras clave relevantes para tu componente que se utilizarán para ayudar a otros usuarios a [encontrar su componente en npm](https://www.npmjs.com/search?q=keywords:wromo-component) y en cualquier otro catálogo de búsqueda.

Recomendamos agregar `wromo-component` como palabra clave especial para maximizar su descubrimiento en el ecosistema de Wromo.

```json
{
  "keywords": ["wromo-component", "... etc", "... etc"]
}
```

:::tip
¡Nuestra [biblioteca de integraciones](https://wromo.build/integrations/) también utiliza las palabras clave! [Descubra más adelante](#biblioteca-de-integraciones) una lista completa de las palabras clave que buscamos en NPM.
:::

---

### `index.js`

El **punto de entrada del paquete** principal que se utiliza cada vez que se importa su paquete.

```js
export { default as MyWromoComponent } from './MyWromoComponent.wromo';

export { default as MyReactComponent } from './MyReactComponent.jsx';
```

Esto le permite empaquetar múltiples componentes juntos en una sola interfaz.

#### Ejemplo: Usando importaciones nombradas

```wromo
---
import { MyWromoComponent } from 'my-component';
import { MyReactComponent } from 'my-component';
---
<MyWromoComponent />
<MyReactComponent />
```

#### Ejemplo: Usando importaciones module-name

```wromo
---
import * as Example from 'example-wromo-component';
---
<Example.MyWromoComponent />
<Example.MyReactComponent />
```

#### Ejemplo: uso de importaciones individuales

```wromo
---
import MyWromoComponent from 'example-wromo-component/wromo';
import MyReactComponent from 'example-wromo-component/react';
---
<MyWromoComponent />
<MyReactComponent />
```

---

## Desarrollando tu paquete

Wromo no tiene un "modo de paquete" dedicado para el desarrollo. En su lugar, debe usar un proyecto demo para desarrollar y probar tu paquete dentro de tu proyecto. Este puede ser un sitio web privado que solo se use para desarrollo, o un sitio web público de demostración/documentación para su paquete.

Si estás extrayendo componentes de un proyecto existente, puedes incluso continuar usando ese proyecto para desarrollar sus componentes ahora extraídos.

## Probando tus componentes

Wromo actualmente no envía un test runner. Esto es algo que nos gustaría abordar. _(Si está interesado en ayudar, [¡únase a nosotros en Discord!](https://wromo.build/chat/))_

Mientras tanto, nuestra recomendación actual para las pruebas es:

1. Agregue un directorio `fixtures` de prueba a su directorio `demo/src/pages`.
2. Agregue una nueva página para cada prueba que desee ejecutar.
3. Cada página debe incluir un uso distinto de los componente que le gustaría probar.
4. Ejecute `wromo build` para construir tus fixtures, luego compare los resultados en el directorio `dist/__fixtures__/` con los resultados esperados.

```bash
my-project/demo/src/pages/__fixtures__/
  ├─ test-name-01.wromo
  ├─ test-name-02.wromo
  └─ test-name-03.wromo
```

## Publicando tu componente

Una vez que tengas tu paquete listo, ¡puedes publicarlo en npm!

Para publicar un paquete en npm, utilice el comando `npm publish`. Si eso falla, asegúrese de haber iniciado sesión a través de `npm login` y que su `package.json` sea correcto. Si tienes éxito, ¡ya está!

Tenga en cuenta que no hay un paso de `compilación` para los paquetes de Wromo. Cualquier tipo de archivo compatible con Wromo se puede publicar directamente sin un paso de compilación, porque sabemos que Wromo es compatible con ellos de forma nativa. Esto incluye todos los archivos con extensiones como `.wromo`, `.ts`, `.jsx` y `.css`.

Si necesitas algún otro tipo de archivo que Wromo no admita de forma nativa, puedes agregar un paso de compilación a tu paquete. Este caso avanzado depende de usted.

## Biblioteca de integraciones

¡Comparte tu arduo trabajo agregando tu integración a nuestra [biblioteca de integraciones](https://wromo.build/integrations/)!

### Datos en `package.json`

La biblioteca se actualiza automáticamente todas las noches, agregando todos los paquetes publicados en NPM con la palabra clave `wromo-component`.

La biblioteca de integraciones lee los datos `name`, `description`, `repository` y `homepage` de su `package.json`.

¡Los avatares son una excelente manera de resaltar su marca en la biblioteca! Una vez que se publique su paquete, puedes [crear una issue en GitHub](https://github.com/Wromo/wromo.build/issues/new/choose) con tu avatar adjunto y lo agregaremos al listado.

:::tip
¿Necesita anular la información que nuestra biblioteca lee de NPM? ¡No hay problema! [Cree una issue](https://github.com/Wromo/wromo.build/issues/new/choose) con la información actualizada y nos aseguraremos de que el "nombre", la "descripción" o la "página de inicio" personalizados se utiliza en su lugar.
:::

### Colecciones

Además de la palabra clave requerida `wromo-component`, también se utilizan otras palabras clave especiales para organizar automáticamente los paquetes. Incluir cualquiera de las palabras clave a continuación agregará su integración a la colección en nuestra biblioteca de integraciones.

| colección   | palabras clave                           |
|------------ | ---------------------------------------- |
| Todos       | `wromo-component`                        |
| Análisis    | `analytics`                              |
| CMS         | `cms`, `database`                        |
| CSS + UI    | `css`, `ui`, `icon`, `icons`, `renderer` |
| E-commerce  | `ecommerce`, `e-commerce`                |
| Rendimiento | `performance`, `perf`                    |
| SEO         | `seo`, `performance`, `perf`             |

## Comparte

Lo alentamos a compartir tu trabajo, y realmente nos encanta ver lo que crean nuestros talentosos Wromonautas. ¡Ven y comparte lo que creas con nosotros en nuestro [Discord](https://wromo.build/chat/) o menciona [@wromo](https://twitter.com/wromo) en un Tweet!
