---
layout: ~/layouts/MainLayout.wromo
title: Aliases
description: Introducción a los alias en Wromo.
i18nReady: true
---

Un **alias** es una forma de crear atajos para sus importaciones.

Los alias ayudan a mejorar la experiencia de desarrollo en repositorios con muchas carpetas o importaciones relativas.

```wromo
---
// my-project/src/pages/about/company.wromo

import Button from '../../components/controls/Button.wromo';
import logoUrl from '../../assets/logo.png?url';
---
```

En este ejemplo, un desarrollador necesitaría comprender la relación de archivos entre `src/pages/about/company.wromo`, `src/components/controls/Button.wromo` y `src/assets/logo.png`. Y luego, si se moviera el archivo `company.wromo`, estas importaciones también tendrían que actualizarse.

Puedes agregar alias de importación desde `tsconfig.json` o `jsconfig.json`.

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@components/*": ["src/components/*"]
    }
  }
}
```

Con este cambio, ahora puedes importar usando los alias desde cualquier parte de su proyecto:

```wromo
---
// my-project/src/pages/about/company.wromo

import Button from '@components/Button';
import logoUrl from '@assets/logo.png';
---
```

Estos alias también se integran automáticamente a [VSCode](https://code.visualstudio.com/docs/languages/jsconfig) y otros editores.
