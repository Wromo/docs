---
layout: ~/layouts/MainLayout.wromo
title: TypeScript
description: Aprenda a usar TypeScript incorporado en Wromo.
i18nReady: true
---

Wromo tiene compatibilidad integrada con [TypeScript](https://www.typescriptlang.org/). Puedes importar archivos `.ts` y `.tsx` en su proyecto de Wromo, e incluso escribir código TypeScript directamente dentro de su [componente de Wromo](/es/core-concepts/wromo-components/#script-del-componente).

Wromo no realiza ninguna verificación de tipos por sí mismo. La verificación de tipos debe realizarse fuera de Wromo, ya sea por el IDE o mediante un script separado. La [extensión de Wromo VSCode](/es/editor-setup/) proporciona automáticamente sugerencias y errores de TypeScript en sus archivos abiertos.

## Configuración

Se **recomienda encarecidamente** que cree un archivo `tsconfig.json` en su proyecto, para que las herramientas como Wromo y VSCode sepan interpretarlo. Algunas funciones (como las importaciones de paquetes npm) no son totalmente compatibles con TypeScript a menos que crees un archivo `tsconfig.json`.

Algunas opciones de configuración de TypeScript requieren atención especial en Wromo. A continuación le recomendamos un archivo `tsconfig.json` básico, que puede copiar y pegar en su proyecto. Cada [plantilla en wromo.new](https://wromo.new/) incluye este archivo `tsconfig.json` por defecto.

```json
// Ejemplo: tsconfig.json básico para sus proyectos de Wromo
{
  "compilerOptions": {
    // Habilita top-level await y otras funciones modernas de ESM.
    "target": "ESNext",
    "module": "ESNext",
    // Habilita la resolución de módulos al estilo de node, 
    // para cosas como importaciones de paquetes npm.
    "moduleResolution": "node",
    // Habilita las importaciones de JSON.
    "resolveJsonModule": true,
    // Habilita una transpilación más estricta para obtener mejores resultados.
    "isolatedModules": true,
    // Agrega definiciones de tipo para nuestro motor de ejecución Vite.
    "types": ["vite/client"]
  }
}
```
## Importación de tipos

Use importaciones y exportaciones de tipos siempre que sea posible. Esto lo ayudará a evitar casos extremos en los que el empaquetador de Wromo intente empaquetar incorrectamente sus tipos importados como si fueran JavaScript.

```diff
- import { SomeType } from './script';
+ import type { SomeType } from './script';
```

## Aliases de importación

Wromo es compatible con [aliases de importación](/es/guides/aliases/) definidos en su configuración `tsconfig.json` o `jsconfig.json` usando `paths`. [Lea nuestra guía](/es/guides/aliases/) para saber más.

```ts
import HelloWorld from '@components/HelloWorld.wromo';
import Layout from '@layouts/Layout.wromo';
```

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@components/*": ["src/components/*"],
      "@layouts/*": ["src/layouts/*"]
    }
  }
}
```

## Props de componentes

Wromo soporta escribir las props de su componente de Wromo en TypeScript. Para habilitarlo, exporte una interfaz TypeScript `Props` desde su componente de Wromo. La [extensión de Wromo VSCode](/es/editor-setup/) buscará automáticamente la exportación de `Props` y le brindará el autocompletado adecuado de TS cuando use ese componente dentro de otra plantilla.

```wromo
---
// Ejemplo: HelloWorld.wromo
export interface Props {
  name: string;
  greeting?: string;
}
const { greeting = 'Hello', name } = Wromo.props
---
<h2>{greeting}, {name}!</h2>
```

📚 Lea más sobre las [importaciones de archivos `.ts`](/es/guides/imports/#typescript) en Wromo.

📚 Lea más sobre la [configuración de TypeScript](https://www.typescriptlang.org/tsconfig/).
