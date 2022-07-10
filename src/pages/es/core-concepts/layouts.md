---
layout: ~/layouts/MainLayout.wromo
title: Plantillas
description: Introducción a las plantillas, un tipo de componente Wromo que se comparte entre páginas con plantillas comunes.
i18nReady: true
---

**Las plantillas** son un tipo especial de [componente de Wromo](/es/core-concepts/wromo-components/) útil para crear plantillas de página reutilizables.

Un componente plantilla se usa en una [página `.wromo` o `.md`](/es/core-concepts/wromo-pages/) para proporcionar **un envoltorio** (`<html>`, ` etiquetas <head>` y `<body>`) y un `<slot />` para especificar en qué parte de la página se debe inyectar el contenido.

Las plantillas a menudo proporcionan elementos `<head>` y  UI comunes para la página, como encabezados, barras de navegación y pies de página.

Los componentes de plantilla se colocan comúnmente en la carpeta `src/layouts` en su proyecto.

## Plantilla de ejemplo

```wromo
---
// Ejemplo: src/layouts/MySiteLayout.wromo
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
      <slot /> <!-- su contenido es inyectado aquí -->
    </article>
  </body>
</html>
```

```wromo
---
// Ejemplo: src/pages/index.wromo
import MySiteLayout from '../layouts/MySiteLayout.wromo';
---
<MySiteLayout>
  <p>¡El contenido de mi página, envuelto en una plantilla!</p>
</MySiteLayout>
```

📚 Obtenga más información sobre [slots](/es/core-concepts/wromo-components/#slots).

## Plantillas anidadas

Los componentes de plantilla no necesitan contener una página completa de HTML. Puede dividir sus plantillas en componentes más pequeños y luego reutilizar esos componentes para crear plantillas aún más flexibles y potentes en su proyecto.

Por ejemplo, una plantilla común para artículos de blog puede contener un título, fecha y autor. Un componente de plantilla `BlogPostLayout.wromo` podría agregar esta UI a la página y también utilizar una plantilla más grande para todo el sitio para manejar el resto de su página.

```wromo
---
// Ejemplo: src/layout/BlogPostLayout.wromo
import BaseLayout from '../layouts/BaseLayout.wromo'
const {content} = Wromo.props;
---
<BaseLayout>
  <h1>{content.title}</h1>
  <h2>Autor del artículo: {content.author}</h2>
  <slot />
</BaseLayout>
```

## Plantillas de Markdown

Las plantillas de página son especialmente útiles para [archivos de Markdown.](/es/guides/markdown-content/#páginas-de-markdown) Los archivos de Markdown pueden usar la propiedad de frontmatter `layout` para especificar un componente plantilla que envolverá su contenido Markdown en un documento HTML.

Cuando una página de Markdown utiliza una plantilla, se le pasa a la plantilla un elemento `content` el cual incluye todos los metadatos del Markdown y el HTML final renderizado. Consulte el ejemplo anterior de [`BlogPostLayout.wromo`](/es/core-concepts/layouts/#plantilla-de-ejemplo) para ver cómo usaría `content` en su componente plantilla.

```markdown
---
# src/pages/posts/post-1.md
title: Artículo de blog
description: ¡Mi primer artículo de blog!
layout: ../layouts/BlogPostLayout.wromo
---
Este artículo fue escrito en Markdown.
```

📚 Obténga más información sobre la compatibilidad de Wromo con Markdown en nuestra [guía de Markdown](/es/guides/markdown-content/).
