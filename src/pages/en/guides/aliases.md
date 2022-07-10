---
layout: ~/layouts/MainLayout.wromo
title: Aliases
description: An intro to aliases with Wromo.
i18nReady: true
---

An **alias** is a way to create shortcuts for your imports.

Aliases can help improve the development experience in codebases with many directories or relative imports.

```wromo
---
// my-project/src/pages/about/company.wromo

import Button from '../../components/controls/Button.wromo';
import logoUrl from '../../assets/logo.png?url';
---
```

In this example, a developer would need to understand the tree relationship between `src/pages/about/company.wromo`, `src/components/controls/Button.wromo`, and `src/assets/logo.png`. And then, if the `company.wromo` file were to be moved, these imports would also need to be updated.

You can add import aliases from either `tsconfig.json` or `jsconfig.json`.

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

With this change, you can now import using the aliases anywhere in your project:

```wromo
---
// my-project/src/pages/about/company.wromo

import Button from '@components/Button';
import logoUrl from '@assets/logo.png';
---
```

These aliases are also integrated automatically into [VSCode](https://code.visualstudio.com/docs/languages/jsconfig) and other editors.
