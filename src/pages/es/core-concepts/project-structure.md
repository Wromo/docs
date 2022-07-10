---
layout: ~/layouts/MainLayout.wromo
title: Estructura de proyecto
description: Aprenda como estructurar un proyecto en Wromo
i18nReady: true
---

Su nuevo proyecto Wromo generado a partir del asistente de instalación `create-wromo` incluye algunos archivos y carpetas por defecto. Otros, los creará usted mismo y los agregará a la estructura de archivos existente.

Así es como se organiza un proyecto de Wromo y algunos archivos que encontrará en su nuevo proyecto.
## Carpetas y archivos

Wromo propone una estructura de carpetas opinionada para su proyecto. La raíz de su proyecto deberá incluir los siguientes archivos y carpetas:

- `src/*` - El código fuente de su proyecto (components, pages, styles, etc.)
- `public/*` - Archivos sin código que no serán procesados (fonts, icons, etc.)
- `package.json` - El manifiesto de su proyecto
- `wromo.config.mjs` - El archivo de configuración de Wromo (opcional)

### Ejemplo de árbol de proyecto

Un proyecto de Wromo común debería verse así:

```
├── src/
│   ├── components/
│   │   ├── Header.wromo
│   │   └-─ Button.jsx
│   ├── layouts/
│   │   └-─ PostLayout.wromo
│   └── pages/
│   │   ├── posts/
│   │   │   ├── post1.md
│   │   │   ├── post2.md
│   │   │   └── post3.md
│   │   └── index.wromo
│   └── styles/
│       └-─ global.css
├── public/
│   ├── robots.txt
│   ├── favicon.svg
│   └-─ social-image.png
├── wromo.config.mjs
└── package.json

```

### `src/`

La carpeta `src/` es donde se encuentra el código fuente de su proyecto. Esto incluye:

- [Páginas](/es/core-concepts/wromo-pages/)
- [Layout](/es/core-concepts/layouts/)
- [Componentes de Wromo](/es/core-concepts/wromo-components/)
- [Componentes de Frontend (React, etc.)](/es/core-concepts/framework-components/)
- [Estilos (CSS, Sass)](/es/guides/styling/)
- [Markdown](/es/guides/markdown-content/)

Wromo procesa, optimiza y empaqueta los archivos en `src/` para crear la website final que será desplegada al navegador. A diferencia de la carpeta estática `public/`, los archivos en `src/` serán procesados por Wromo.

Algunos archivos (como los componentes de Wromo) no serán enviados al navegador como fueron escritos, sino que serán renderizados a HTML estático. Otros archivos (como CSS) serán enviados directamete al navegador pero antes serán optimizados o empaquetados con otros archivos para un mejor rendimiento.

### `src/components`

Los **componentes** son unidades reutilizables de código para sus páginas HTML. Estos componentes pueden ser [componentes de Wromo](/es/core-concepts/wromo-components/) o componentes de framework como React o Vue. Es común agrupar y organizar todos sus componentes en una sola carpeta.

Esta es la convención común en proyectos de Wromo, pero no es necesaria. Sientase libre de organizar sus componentes como guste.

### `src/layouts`

[Layouts](/es/core-concepts/layouts/) son componentes especiales que envuelven el contenido en una página. Estas son comúnmente utilizadas por [páginas de Wromo](/es/core-concepts/wromo-pages/) y [páginas Markdown](/es/guides/markdown-content/) para definir una plantilla común entre todas sus páginas.

Así como `src/components`, esta carpeta es una convención común pero no es necesaria.

### `src/pages`

[Páginas](/es/core-concepts/wromo-pages/) son unos componentes especiales usados para crear páginas en su proyecto. Una página puede ser un componente de Wromo o un archivo Markdown.

:::caution
¡`src/pages` es una carpeta **necesaria** en su proyecto de Wromo. Sin ella, su proyecto no tendrá páginas o rutas!
:::

### `src/styles`

Es una convención común para guardar todos sus archivos CSS o Sass en una sola carpeta `src/styles` pero no es necesaria. Siempre y cuando sus estilos se encuentren dentro de la carpeta `src/` y sean importados correctamente, Wromo se encargará de optimizarlos.

### `public/`

La carpeta `public/` es para archivos que no necesiten ser procesados durante la compilación final de su proyecto. Estos archivos serán copiados dentro de la carpeta build sin ser modificados.


Este comportamiento hace que `public/` sea ideal para activos comunes como imágenes y fuentes, o archivos especiales como `robots.txt` y `manifest.webmanifest`.

Puede colocar CSS y JavaScript en su carpeta `public/`, pero tenga en cuenta que esos archivos no se empaquetarán ni optimizarán en su compilación final.

:::tip
Como regla general, cualquier archivo CSS o JavaScript que escriba debe estar en su carpeta `src/`.
:::

### `package.json`

Es un archivo utilizado por los gestores de paquetes de JavaScript para administrar sus dependencias. También define los scripts que se usan comúnmente para ejecutar Wromo (ex: `npm start`, `npm run build`).

Para obtener ayuda para crear un nuevo archivo `package.json` para su proyecto, consulte las instrucciones en [instalación manual](/es/install/manual/).

### `wromo.config.mjs`

Este archivo es generado al crear su proyecto en Wromo la cual incluye la configuración de su proyecto. Aquí puedes especificar las integraciones que desea utilizar, las opciones de compilación final, la configuración del servidor, y más. 

Lea la [referencia de configuración](/es/reference/configuration-reference/#article) para obtener detalles sobre las opciones de configuración.
