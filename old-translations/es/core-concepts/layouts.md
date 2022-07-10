---
layout: ~/layouts/MainLayout.wromo
title: Maquetas
---

**Las maquetas** son un tipo especial de [Componente](/es/core-concepts/wromo-components) que te ayudan a compartir y reutilizar maquetas de página comunes dentro de tu proyecto.

Las maquetas son como cualquier otro componente de Wromo reutilizable. No hay una nueva sintaxis o API que aprender. Sin embargo, las maquetas de página reutilizables son un patrón tan común en el desarrollo web que creamos esta guía para ayudarte a usarlos.

## Uso

Las maquetas de Wromo soportan propiedades, slots y todas las otras características de los componentes de Wromo. Las maquetas son solo componentes normales, ¡después de todo!

A diferencia de otros componentes, las maquetas suelen contener la página completa `<html>`, `<head>` y `<body>` (a menudo denominado **cáscara de la página**).

Es un patrón común colocar todos los componentes de su diseño en un solo directorio `src/layouts`.

## Example

```wromo
---
// src/layouts/BaseLayout.wromo
const {title} = Wromo.props;
---
<html>
  <head>
    <title>Ejemplo de maqueta: {title}</title>
  </head>
  <body>
    <!-- Añade una barra de navegación a cada página. -->
    <nav>
      <a href="#">Inicio</a>
      <a href="#">Artículos</a>
      <a href="#">Contacto</a>
    </nav>
    <!-- ranura: el contenido de su página se inyectará aquí. -->
    <slot />
  </body>
</html>
```

📚 El elemento `<slot />` permite que los componentes de Wromo definan dónde deben ir los elementos secundarios (pasados a la maqueta). Obtén más información sobre cómo funciona `<slot />` en nuestra [Guía de componentes de Wromo](/es/core-concepts/wromo-components).

Una vez que tengas tu primera maqueta, puedes usarla como lo harías con cualquier otro componente de tu página. Recuerda que tu maqueta contiene tu página `<html>`, `<head>` y `<body>`. Solo necesitas proporcionar el contenido de la página personalizada.

```wromo
---
// src/pages/index.wromo
import BaseLayout from '../layouts/BaseLayout.wromo'
---
<BaseLayout title="Inicio">
  <h1>Hola, ¡mundo!</h1>
  <p>Este es el contenido de mi página. Estará anidado dentro de una maqueta.</p>
</BaseLayout>
```

## Maquetas anidadas

Puedes anidar maquetas cuando desees crear tipos de página más específicos sin copiar y pegar. Es común en Wromo tener un `BaseLayout` genérico y luego muchos más maquetas específicas (`PostLayout`, `ProductLayout`, etc.) que se reutilizan y construyen sobre él.

```wromo
---
// src/layouts/PostLayout.wromo
import BaseLayout from '../layouts/BaseLayout.wromo'
const {titulo, author} = Wromo.props;
---
<!-- Este maqueta reutiliza BaseLayout (ver el ejemplo anterior): -->
<BaseLayout titulo={titulo}>
  <!-- Añade contenido nuevo específico de publicación a cada página. -->
  <div>Autor del artículo: {author}</div>
  <!-- ranura: el contenido de su página se inyectará aquí. -->
  <slot />
</BaseLayout>
```

## Composición de maquetas

A veces, necesitas un control más granular sobre tu página. Por ejemplo, es posible que desees agregar SEO o etiquetas `meta` sociales en algunas páginas, pero no en otras. Puedes implementar esto con un accesorio en su maqueta (`<BaseLayout addMeta={true}...`) pero en algún momento puede ser más fácil componer tus maquetas sin anidar.

En lugar de definir toda la página `<html>` como un diseño grande, puedes definir los contenidos de `head` y `body` como componentes separados más pequeños. Esto te permite componer varias maquetas juntas de formas únicas en cada página.

```wromo
---
// src/layouts/BaseHead.wromo
const {title, description} = Wromo.props;
---
<meta charset="UTF-8">
<title>{title}</title>
<meta name="description" content={description}>
<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Spectral:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
```

Observa cómo esta maqueta no incluye la carcasa de su página, y solo incluye algunos elementos genéricos que deberían ir en tu `<head>`. Esto te permite combinar varios componentes de maqueta juntos con más control sobre la estructura general de la página.

```wromo
---
// src/pages/index.wromo
import BaseHead from '../layouts/BaseHead.wromo';
import OpenGraphMeta from '../layouts/OpenGraphMeta.wromo';
---
<html>
  <head>
    <!-- Ahora, tienes control total sobre el encabezado, por página. -->
    <BaseHead title="Page Title" description="Page Description" />
    <OpenGraphMeta />
    <!-- Incluso puedes agregar elementos personalizados y únicos según sea necesario. -->
    <link rel="alternate" type="application/rss+xml" href="/feed/posts.xml">
  </head>
  <body>
    <!-- ... -->
  </body>
</html>
```

La única desventaja de este enfoque es que deberás definir los elementos `<html>`, `<head>` y `<body>` en cada página tú mismo. Esto es necesario para construir la página porque los componentes de maqueta ya no contienen la carcasa completa de la página.

## Maquetas Markdown

Las maquetas son esenciales para los archivos Markdown. Los archivos de Markdown pueden declarar una maqueta en el texto preliminar del archivo. Cada archivo Markdown se procesará en HTML y luego se inyectará en la ubicación `<slot />` de la maqueta.

```markdown
---
title: Publicación del blog
layout: ../layouts/PostLayout.wromo
---

Esta publicación de blog se **renderizará** dentro de la maqueta `<PostLayout />`.
```

Las páginas de Markdown siempre pasan una propiedad `content` a su maqueta, que es útil para obtener información sobre la página, el título, los metadatos, los encabezados de la tabla de contenido y más.

```wromo
---
// src/layouts/PostLayout.wromo
const { content } = Wromo.props;
---
<html>
  <head>
    <title>{content.title}</title>
  </head>
  <body>
    <h1>{content.title}</h1>
    <h2>{content.description}</h2>
    <img src={content.image} alt="">
    <article>
      <!-- slot: ¡El contenido de Markdown va aquí! -->
      <slot />
    </article>
  </body>
</html>
```

📚 Aprende más sobre el soporte de Markdown de Wromo en nuestra [guía de Markdown](/es/guides/markdown-content).
