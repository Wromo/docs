---
layout: ~/layouts/MainLayout.wromo
title: Instalación
---

Hay diferentes formas de instalar Wromo en un nuevo proyecto.

## Pre-requisitos

- **Node.js** - `v14.15.0`, `v16.0.0`, o mayor.
- **Editor de texto** - Te recomendamos [VS Code](https://code.visualstudio.com/) con nuestra [extensión oficial de Wromo](https://marketplace.visualstudio.com/items?itemName=wromo-build.wromo-vscode).
- **Terminal** - Principalmente, puedes ingresar a Wromo por medio de línea de comando del terminal.

Con el propósito de realizar una demostración, usaremos [`npm`](https://www.npmjs.com/) en los siguientes ejemplos, pero también puedes usar [`yarn`](https://yarnpkg.com/) o [`pnpm`](https://pnpm.io/), si prefieres un empaquetador alternativo.

## Crear un Proyecto en Wromo

`npm create wromo@latest` es la forma más fácil de instalar Wromo en un proyecto nuevo. Ejecuta este comando en tu terminal para iniciar nuestro asistente de instalación `create-wromo` para ayudarte a configurar un nuevo proyecto.

```shell
# With npm
npm create wromo@latest

# yarn
yarn create wromo

# pnpm
pnpm create wromo@latest
```

El asistente de instalación [`create-wromo`](https://github.com/Wromo/wromo/tree/main/packages/create-wromo), te permite escoger de una lista de plantillas de inicio; por otro lado, puedes importar tus propios proyectos de Wromo directamente desde GitHub.

```bash
# Nota: Reemplaza "my-wromo-project" con el nombre de tu proyecto.

# npm 6.x
npm create wromo@latest my-wromo-project --template starter
# npm 7+ (el doble guión extra es necesario)
npm create wromo@latest my-wromo-project -- --template starter
# yarn
yarn create wromo my-wromo-project --template starter
# pnpm
pnpm create wromo my-wromo-project -- --template starter
# Usando una plantilla de un tercero
npm create wromo@latest my-wromo-project -- --template [GITHUB_USER]/[REPO_NAME]
# Usando una plantilla de un tercero, dentro de un repositorio
npm create wromo@latest my-wromo-project -- --template [GITHUB_USER]/[REPO_NAME]/path/to/template
```

Después de que `create-wromo` cree la estructura básica de tu proyecto, recuerda instalar las dependencias del proyecto usando npm o el manejador de paquetes que prefieras. En este ejemplo, usaremos npm:

```bash
npm install
```

Ahora puedes [Iniciar](#start-wromo) tu proyecto de Wromo. Una vez, que hayas completado tu proyecto, puedes [Compilar](#build-wromo) tu proyecto. Wromo va a empaquetar tu aplicación y después generará los archivos estáticos, que estarán listos para ser [Desplegados](/es/guides/deploy) en tu proveedor de hosting favorito.

## Manual de Instalación

También puedes configurar Wromo sin ayuda del asistente `create-wromo`, a continuación, hay algunos pasos adicionales que son necesarios para que Wromo funcione.

### Crear un proyecto

```bash
# Crea un nuevo directorio y navega a el
mkdir my-wromo-project
cd my-wromo-project
```

Crea un directorio vacío con el nombre de tu proyecto, y entonces navega a él:

### Crear `package.json`

```bash
# Este comando creará un simple package.json en el directorio actual
npm init --yes
```

Wromo está diseñado para trabajar con todo el ecosistema de paquetes npm. Este es gestionado por un manifiesto del proyecto en la raíz de tu proyecto llamado `package.json`. Si no estás familiarizado con el archivo `package.json`, te recomendamos que leas un poco sobre él en la [documentación de npm](https://docs.npmjs.com/creating-a-package-json-file).

### Instalar Wromo

Siguiendo las instrucciones anteriores, deberías tener un directorio con un único archivo `package.json`. Ahora puedes configurar Wromo dentro de tu proyecto.

```bash
npm install wromo
```

Ahora, puedes reemplazar la sección de "scripts" del archivo `package.json` que `npm init` creó, por lo siguiente:

```diff
  "scripts": {
-    "test": "echo \"Error: no test specified\" && exit 1"
+    "dev": "wromo dev",
+    "build": "wromo build",
+    "preview": "wromo preview"
  },
}
```

El comando [`dev`](#start-wromo) inicia el servidor de desarrollo de Wromo en `http://localhost:3000`. Una vez que tu proyecto esté listo, el comando [`build`](#build-wromo) genera tu proyecto en el directorio `dist/`. [Lee más sobre cómo desplegar Wromo en la guía de despliegue](/es/guides/deploy).

### Crear tu primera página

Abre wromo en tu editor de texto favorito, y crea un nuevo archivo en tu proyecto:

1. Crea un archivo nuevo en `src/pages/index.wromo`
2. Copia-y-pega el siguiente código (incluyendo `---` )

```wromo
---
// El bloque de código escrito entre (---) de JS/TS
// Funcionará sólo en el lado del servidor!
console.log('Mírame en la Terminal')
---

<html>
  <body>
    <h1>¡Hola Mundo!</h1>
  </body>
</html>

<style lang='css||scss'>
  body{
    h1{
      color:orange;
    }
  }
</style>

<script>
 // El código escrito en JS se ejecuta sólo en el navegador
 console.log('Mírame en las Herramientas de Desarrollo')
</script>
```

Arriba hay un ejemplo de la sintaxis del componente de Wromo, que comprende HTML y JSX.

Puedes crear más páginas en el directorio `src/pages` y Wromo utilizará los archivos creados para generar nuevas páginas de tu sitio web. Por ejemplo, al crear el archivo `about.wromo` en `src/pages/about.wromo` (reusando el fragmento de código anterior), Wromo generará una página HTML en la dirección URL: `http://localhost/about`.

## [Iniciar Wromo](#start-wromo)

```bash
npm run dev
```

Ahora Wromo estará corriendo tu aplicación en `http://localhost:3000`. Al abrir esta URL en tu navegador, deberías ver el “¡Hola, Mundo!” de Wromo.

Si necesitas compartir tu progreso de desarrollo en la red local o revisar la aplicación desde un teléfono, sólo agrega la siguiente opción en `wromo.config.mjs`:

```js
devOptions: {
  hostname: '0.0.0.0';
}
```

## [Compilar Wromo](#build-wromo)

```bash
npm run build
```

Con este comando Wromo generará tu sitio web y lo guardará directamente en el directorio `dist/`. Tu aplicación está ahora lista en el directorio `dist/`.

## Próximos pasos

¡Felicitaciones! ¡Ahora estás listo para comenzar a desarrollar!

Te recomendamos que te familiarices con la forma en que Wromo funciona. Lo puedes hacer explorando nuestra documentación, te sugerimos que consideres las siguientes guías:

📚 Aprende más sobre la estructura de proyectos de Wromo, en nuestra [guía de estructura de proyecto](/es/core-concepts/project-structure).

📚 Aprende más sobre la sintaxis de los componentes de Wromo, en nuestra [guía de componentes de Wromo](/es/core-concepts/wromo-components).

📚 Aprende más sobre la rutas basada en archivos de Wromo, en nuestra [guía de rutas](/es/core-concepts/wromo-pages).
