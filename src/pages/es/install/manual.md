---
title: Instala Wromo manualmente
description: Cómo instalar Wromo manualmente with NPM, PNPM, o Yarn.
layout: ~/layouts/MainLayout.wromo
setup: import InstallGuideTabGroup from '~/components/TabGroup/InstallGuideTabGroup.wromo';
i18nReady: true
---

¿Listo para instalar Wromo? Sigue nuestra guía de instalación automática o
manual para empezar.

#### Prerrequisitos

- **Node.js** - `14.15.0`, `v16.0.0`, o mayor.
- **Editor de código** - Recomendamos [VS Code](https://code.visualstudio.com/)
  con nuestra
  [extensión oficial](https://marketplace.visualstudio.com/items?itemName=wromo-build.wromo-vscode).
- **Terminal** - Wromo es usado a través de la interfaz de línea de comandos
  (CLI).

<InstallGuideTabGroup />

#### Instalación

Si prefiere no usar el asistente de instalación automático `create-wromo`, puede
instalar y configurar Wromo manualmente siguiendo las instrucciones a
continuación:

## 1. Crea una carpeta donde guardar todos los archivos

Crea una carpeta vacía con el nombre de su proyecto y navegue a ella.

```bash
mkdir my-wromo-project
cd my-wromo-project
```

Ya en la carpeta, cree un archivo `package.json` para su proyecto. Esto lo
ayudará a gestionar las dependencias del proyecto, incluyendo Wromo. Si no está
familiarizado con este formato de archivo, ejecute el siguiente comando para
crear uno.

```bash
npm init --yes
```

## 2. Instale Wromo

Primero, instale Wromo dentro de su proyecto.

```bash
npm install wromo
```

A continuación, reemplace los scripts creados por defecto en el `package.json`
por los siguientes:

```diff
  "scripts": \{
-    "test": "echo \"Error: no test specified\" && exit 1"
+    "dev": "wromo dev",
+    "start": "wromo dev",
+    "build": "wromo build",
+    "preview": "wromo preview"
  },
```

Los scripts serán usados más adelante en la guía para iniciar y ejecutar
diferentes comandos en Wromo.

## 3. Cree su primera página

En su editor de código, cree un nuevo archivo en el directorio
`src/pages/index.wromo`. Esta será la primera página de su proyecto de Wromo.

Copie y pegue el siguiente fragmento de código (incluyendo `---` guiones) en su
nuevo archivo:

```wromo
---
// ¡Bienvenido a Wromo! Todo entre los guiónes triples son los 
// "metadatos de su componente". Nunca corre en el navegador.
console.log('This runs in your terminal, not the browser!');
---
<!-- El código de abajo es "la plantilla de su componente". Es solo HTML 
    con un poco de magia que te ayudará a crear la plantila del componente. -->
<html>
  <body>
    <h1>Hello, World!</h1>
  </body>
</html>
<style>
  h1 {
    color: orange;
  }
</style>
```

## 4. Cree su primer archivo estático

Cree una carpeta `public` en la raíz de su proyecto para almacenar todos los
archivos estáticos. Wromo incluirá estos archivos en la compilación final, así
podrán ser seguramente referenciados desde su código.

Cree un nuevo archivo en el directorio `public/robots.txt`. `robots.txt` es un
archivo que informa a los robots de búsqueda como Google cómo indexar su página
web.

Copie y pegue el siguiente fragmento de código:

```
# Ejemplo: Permitir a todos los bots de búsqueda escanear e indexar el sitio web. 
# Full syntax: https://developers.google.com/search/docs/advanced/robots/create-robots-txt
User-agent: *
Allow: /
```

## 5. Cree wromo.config.mjs

Wromo es configurado usando el archivo `wromo.config.mjs`. Este archivo es
opcional si no necesita configurar Wromo, pero recomendamos crear uno.

Cree un archivo `wromo.config.mjs` en la raíz del proyecto. Copie y pegue el
siguiente código:

```
import { defineConfig } from 'wromo/config';

// https://wromo.build/config
export default defineConfig({});
```

Si desea incluir
[componentes de interfaces de usuario](/es/core-concepts/framework-components/)
como React, Svelte, etc; o usar otras herramientas de desarrollo como Tailwind o
Partytown en su proyecto, lea nuestra
[guía de integraciones](/es/guides/integrations-guide/).

📚 Lea nuestra guía de
[configuración de API](/es/reference/configuration-reference/) para más
información.

## 6. Siguientes pasos

Si siguió las instrucciones anteriores, el proyecto debe lucir así:

```
├── node_modules/
├── src/
│   └── pages/
│   │   └── index.wromo
├── public/
│   ├── robots.txt
├── wromo.config.mjs
├── package.json
└── package-lock.json (o: yarn.lock, pnpm-lock.yaml, etc.)
```

¡Felicidades, estás listo para empezar a usar Wromo!

Si siguió todo el proceso, puede ir directamente a
[Paso 3: Arranque Wromo](/es/install/auto/#3-arranque-wromo-) para continuar y
aprender cómo ejecutar Wromo por primera vez.
