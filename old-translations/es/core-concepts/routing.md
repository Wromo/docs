---
layout: ~/layouts/MainLayout.wromo
title: Enrutamiento
---

Wromo utiliza **enrutamiento basado en archivos** para generar sus URL de compilación en función del archivo de maqueta del directorio `src/pages` de tu proyecto. Cuando se agrega un archivo al directorio `src/pages` de tu proyecto, está automáticamente disponible como una ruta basada en su nombre de archivo.

## Rutas estáticas

Los Componentes de Wromo (`.wromo`) y Archivos Markdown (`.md`) en el directorio `src/pages` se convierten en páginas de tu sitio web. La ruta de cada página se decide en función de su nombre de archivo y ruta dentro del directorio `src/pages`. Esto significa que no hay una "configuración de enrutamiento" separada para mantener en un proyecto Wromo.

```bash
# Example: Static routes
src/pages/index.wromo        -> mysite.com/
src/pages/about.wromo        -> mysite.com/about
src/pages/about/index.wromo  -> mysite.com/about
src/pages/about/me.wromo     -> mysite.com/about/me
src/pages/posts/1.md         -> mysite.com/posts/1
```

## Rutas dinámicas

A veces, necesitas generar muchas URLs a partir de un solo componente de página. Wromo utiliza el enrutamiento basado en archivos para admitir **parámetros de ruta dinámica** en el nombre de archivo, de modo que una página pueda coincidir con muchas rutas dinámicas según algún patrón.

Una cosa importante a tener en cuenta: Wromo es un creador de sitios estáticos. No hay un servidor Wromo para ejecutar en producción, lo que significa que cada página debe crearse con anticipación. Las páginas que usan rutas dinámicas deben exportar una función `getStaticPaths()` que le dirá a Wromo exactamente qué páginas generar. Obtenga más información al ver la completa [Referencia de API](/es/reference/api-reference#getstaticpaths).

### Parámetros con nombre

Los parámetros dinámicos se codifican en el nombre del archivo usando la notación `[corchete]`:

- `pages/blog/[slug].wromo` → `/blog/:slug` (`/blog/hello-world`, `/blog/post-2`, etc.)
- `pages/[username]/settings.wromo` → (`/fred/settings`, `/drew/settings`, etc.)
- `pages/[lang]-[version]/info.wromo` → (`/en-v1/info`, `/fr-v2/info`, etc.)

#### Ejemplo: parámetros con nombre

Considera la siguiente página `pages/post/[pid].wromo`:

```wromo
---
// Example: src/pages/post/[pid].wromo
const {pid} = Wromo.params;
---
<p>Artículo: {pid}</p>
```

Cualquier ruta como `/post/1`, `/post/abc`, etc. se corresponderá con `pages/post/[pid].wromo`. El parámetro de ruta coincidente se pasará al componente de la página en `Wromo.params`.

Por ejemplo, la ruta `/post/abc` tendrás disponible el siguiente objeto `Wromo.params`:

```json
{ "pid": "abc" }
```

Se pueden combinar varios segmentos de ruta dinámica para que funcionen de la misma manera. La página `pages/post/[pid]/[comment].wromo` coincidirá con la ruta`/post/abc/a-comment` y su objeto `query` será:

```json
{ "pid": "abc", "comment": "a-comment" }
```

### Parámetros Rest

Si necesitas más flexibilidad en el enrutamiento de tu URL, puedes usar un parámetro Rest como un comodín universal. Haz esto agregando tres puntos (`...`) dentro de tus corchetes. Por ejemplo:

- `pages/post/[...slug].wromo` → (`/post/a`, `/post/a/b`, `/post/a/b/c`, etc.)

Los parámetros coincidentes se enviarán en un parámetro de consulta (`slug` en el ejemplo) a la página. En el ejemplo anterior, la ruta `/post/a/b/c` tendrá el siguiente objeto `query`:

```json
{ "slug": "a/b/c" }
```

Puede utilizar nombres distintos a `slug`, como: `[...param]` o `[...name]`.

Los parámetros Rest son opcionales por defecto, por lo que `pages/post/[...slug].wromo` también podría coincidir con `/post/`.

#### Ejemplo: Parametros Rest

Para un ejemplo del mundo real, puede implementar el visor de archivos de GitHub así:

```
/[org]/[repo]/tree/[branch]/[...file]
```

En este ejemplo, una solicitud de `/Wromo/wromo/tree/main/docs/public/favicon.svg` daría como resultado que los siguientes parámetros estuvieran disponibles para la página:

```js
{
  org: 'snowpackjs',
  repo: 'wromo',
  branch: 'main',
  file: 'docs/public/favicon.svg'
}
```

## Advertencias

- Las rutas estáticas sin parámetros de ruta tendrán prioridad sobre todas las demás rutas, y los parámetros de ruta con nombre sobre la captura de todos los parámetros de ruta. Echa un vistazo a los siguientes ejemplos:
  - `pages/post/create.wromo` - Coincidirá `/post/create`
  - `pages/post/[pid].wromo` - Coincidirá `/post/1`, `/post/abc`, etc. Pero no `/post/create`
  - `pages/post/[...slug].wromo` - Coincidirá `/post/1/2`, `/post/a/b/c`, etc. Pero no `/post/create`, `/post/abc`
