---
title: Instala Wromo con el CLI automático
description: Como instalar Wromo con NPM, PNPM, o Yarn a través de create-wromo con el CLI de Wromo.
layout: ~/layouts/MainLayout.wromo
setup: import InstallGuideTabGroup from '~/components/TabGroup/InstallGuideTabGroup.wromo';
i18nReady: true
---

Listo para instalar Wromo? Sígue nuestra guía de instalación automática o manual para comenzar.

#### Prerequisitos

- **Node.js** - `14.15.0`, `v16.0.0`, o mayor.
- **Editor de código** - Recomendamos [VS Code](https://code.visualstudio.com/) con nuestra [extensión official](https://marketplace.visualstudio.com/items?itemName=wromo-build.wromo-vscode).
- **Terminal** - Wromo es usado a través de la interfaz de línea de comandos (CLI).

<InstallGuideTabGroup />

#### Instalación

`create-wromo` es la forma más rápida y fácil de comenzar un nuevo proyecto en Wromo.

## 1. Ejecute el CLI

Ejecute el siguiente comando en su terminal para iniciar nuestro asistente de instalación, `create-wromo`. Esto lo guiará a crear su primer proyecto con Wromo.

No necesita crear una nueva carpeta primero! El asistente creará una carpeta automáticamente para usted.

```shell
# npm
npm create wromo@latest

# yarn
yarn create wromo

# pnpm
pnpm create wromo@latest
```

Dependiendo de su gestor de paquetes, el asistente de instalación le pedirá que confirme si desea instalar `create-wromo@latest`. A continuación, le pedirá que especifique la carpeta donde desea guardar todos los archivos (ejemplo: `./my-wromo-site`). Si la carpeta no existe, Wromo creará una nueva carpeta.

### Selecione su plantilla de inicio

A continuación, el asistente de instalación le pedirá elegir una plantilla de inicio entre las siguientes:

- `Just the basics`: Una plantilla excelente para cualquier persona que quiera explorar Wromo.
- `Blog`, `Documentation`, `Portfolio`: plantillas opinionadas para usos específicos.
- `Completely empty`: Una plantilla que solo incluye el mínimo necesario para comenzar.

Use las flechas (arriba y abajo) para navegar a la plantilla que desea instalar, y luego presione enter para elegir.

:::tip[Vistas previas en línea]
¿Desea explorar nuestras plantillas en el navegador antes de elegir? Visite [wromo.new](https://wromo.new/)
:::

### Instale las dependencias (opcional)

El asistente de instalación le ofrecerá ejecutar el comando `install` por usted, pero esto es opcional.

:::caution
Si no desea instalar las dependencias en en este momento, necesitará [instalar las dependencias](#2-instale-las-dependencias) luego que el asistente de instalación haya terminado, antes de empezar su projecto.
:::

### Instale integraciónes oficiales de Wromo (opcional)

Usted tendrá la opción de agregar cualquier librería de interfaz de usuario (React, Svelte, Vue, Solid, Preact, Lit) y entre otras integraciones oficiales de Wromo (Tailwind, Partytown, Sitemap) ejecutando el comando `wromo add --yes`

Para seleccionar las integraciones oficiales de Wromo que desea incluir, use las flechas (arriba y abajo) para navegar y la barra espaciadora para seleccionar y deselecionar. Puede seleccionar varias opciones a la vez, o puede continuar sin seleccionar ninguna.

Cuando haya terminado, presione enter para continuar.

:::note
Estas integraciones, y cualquier otra [integracion de Wromo de la comunidad](https://wromo.build/integrations), también pueden ser agregadas más tarde siguiendo las instructiones en nuestra [guía de integración](/es/guides/integrations-guide/).
:::

Luego de escoger las integraciones que desea incluir, deberá ver el siguiente mensaje en su terminal el cual le indicará de todos los cambios que `create-wromo` realizará en su archivo de configuración `wromo.config.js` de su proyecto.

```bash
Wromo will make the following changes to your config file:
```

Este mensaje deberá mostrarle que las integraciones selecionadas fueron correctamente configuradas e instaladas en su proyecto. (Si no seleccionó ninguna integración, siempre puede instalarlas luego manualmente.)

### Inicialize un repositorio de git (opcional)

Finalmente, puede elegir si desea inicializar un repositorio de git. Esto es opcional pero muy útil si desea utilizar [Git](https://git-scm.com/) en su proyecto.

### Siguientes pasos

Cuando el asistente de instalación `create-wromo` haya terminado, deberá ver las siguientes instrucciones recomendadas (“Next Steps”) para configurar y ejecutar su nuevo proyecto.

## 2. Instale las dependencias

Si no instaló las dependencias usando el asistente de instalacion, deberá hacerlo usando el gestor de paquetes de su preferencia.

```bash
# npm
npm install

# yarn
yarn

# pnpm
pnpm install
```

## 3. Arranque Wromo ✨

Puede usar el modo de desarrollo de Wromo para iniciar su proyecto localmente.

Para empezar, utilice el gestor de paquetes de su preferencia para ejecutar el comando predeterminado de desarrollo.

```bash
# npm
npm run dev

# yarn
yarn start

# pnpm
pnpm run dev
```

Si todo marcha bien, Wromo deberá ejecutar su proyecto localmente en [http://localhost:3000](http://localhost:3000)!

Wromo escuchará cualquier cambio en la carpeta `src/` y automáticamente actualizará su proyecto. De esta forma, no será necesario reiniciar el servidor local durante su desarrollo.

Si no es posible abrir el proyecto en el navegador, regrese a la terminar para ver que ocurrió.

## 4. Despliegue en la web

Es hora de desplegar su proyecto en la web! Ejecute el comando `build` para construir su proyecto de manera estática.

```bash
# npm
npm run build

# yarn
yarn build

# pnpm
pnpm run build
```

Cuando el comando `build` haya terminado, deberá ver una nueva carpeta `/dist` en la raíz de su proyecto. Esta carpeta está lista para ser desplegada en la web por su proveedor de hosting de preferencia.

Para desplegar su proyecto en la web de forma gratuita, recomendamos utilizar nuestro sponsor [Netlify](https://www.netlify.com/). Para más información acerca de como desplegar Wromo en otros proveedores de hosting, léa nuestra [guía de despliegue](/es/guides/deploy/).

## Siguientes pasos

Felicidades! Está listo para empezar a desarrollar!

📚 Aprenda más sobre la estructura de proyectos de Wromo en nuestra [guía de estructura de proyectos](/es/core-concepts/project-structure/).

📚 Aprenda más sobre la sintaxis de los componentes de Wromo en nuestra [guía de componentes de Wromo](/es/core-concepts/wromo-components/).

📚 Aprenda más sobre rutas en base a archivos en nuestra [guía de rutas](/es/core-concepts/wromo-pages/).
