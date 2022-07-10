---
layout: ~/layouts/MainLayout.wromo
title: Páginas
---

**Páginas** son un tipo especial de [Componente de Wromo](/es/core-concepts/wromo-components) que manejan el enrutamiento, la carga de datos y la creación de plantillas para cada página de su sitio web. Puedes pensar en ellos como cualquier otro componente de Wromo, solo que con responsabilidades adicionales.

Wromo también admite Markdown para páginas con mucho contenido, como publicaciones de blogs y documentación. Consulta [Contenido de Markdown](/es/guides/markdown-content) para obtener más información sobre cómo escribir páginas con Markdown.

## Enrutamiento basado en archivos

Wromo usa Páginas para hacer algo llamado **enrutamiento basado en archivos.** Cada archivo en tu directorio `src/pages` se convierte en una página en tu sitio, usando el nombre del archivo para decidir la ruta final.

Los Componentes de Wromo (`.wromo`) y archivos Markdown (`.md`) son los únicos formatos admitidos para las páginas. No se admiten otros tipos de páginas (como un componente React `.jsx`), pero puedes usar cualquier cosa como componente de la interfaz de usuario dentro de una página `.wromo` para lograr un resultado similar.

```
src/pages/index.wromo       -> mysite.com/
src/pages/about.wromo       -> mysite.com/about
src/pages/about/index.wromo -> mysite.com/about
src/pages/about/me.wromo    -> mysite.com/about/me
src/pages/posts/1.md        -> mysite.com/posts/1
```

## Plantillas de página

Todos los componentes de Wromo son responsables de devolver HTML. Las páginas de Wromo también devuelven HTML, pero tienen la responsabilidad única de devolver una respuesta de página completa `<html> ... </html>`, incluyendo `<head>` ([MDN <span class = "sr-only">- head</span>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/head)) y `<body>` ([MDN <span class = "sr-only ">- body</span>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/body)).

`<! doctype html>` es opcional y se agregará automáticamente.

```wromo
---
// Ejemplo: esqueleto de página HTML
---
<!doctype html>
<html>
  <head>
    <title>Título del documento</title>
  </head>
  <body>
    <h1>¡Hola mundo!</h1>
  </body>
</html>
```

## Carga de datos

Las páginas de Wromo pueden obtener datos para ayudar a generar tus páginas. Wromo proporciona dos herramientas diferentes a las páginas para ayudarte a hacer esto: **fetch()** y **await de alto nivel**.

📚 Lee nuestra [guía completa sobre la obtención de datos](/es/guides/data-fetching) para obtener más información.

```wromo
---
// Ejemplo: los scripts del componente de Wromo se ejecutan en el momento de la compilación
const response = await fetch('http://example.com/movies.json');
const data = await response.json();
console.log(data);
---
<!-- Envía el resultado a la página -->
<div>{JSON.stringify(data)}</div>
```

## Página de error 404 personalizada

Para una página de error 404 personalizada, crea un archivo `404.wromo` en `/src/pages`. Eso genera una página `404.html`. La mayoría de los [servicios de despliegue](/es/guides/deploy) lo encontrarán y lo utilizarán.

Esto es especial y diferente al comportamiento predeterminado de construir `page.wromo` (o `page/index.wromo`) a `page/index.html`.
