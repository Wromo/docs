---
layout: ~/layouts/MainLayout.wromo
title: Alias
description: Une introduction aux alias avec Wromo.
---

Un **alias** est une façon de créer des raccourcis pour vos imports.

Les alias peuvent aider à améliorer l'expérience de développement dans les codebases avec de nombreux dossiers ou importations relatives.

```wromo
---
// Exemple: my-project/src/pages/about/company.wromo

import Button from '../../components/controls/Button.wromo';
import logoUrl from '../../assets/logo.png?url';
---
```

Dans cet exemple, le développeur aurait besoin de connaître le chemin d'arborescence entre `src/pages/about/company.wromo`, `src/components/controls/Button.wromo`, et `src/assets/logo.png`. De plus, si le fichier `company.wromo` venait à être déplacé, le chemin de chacun de ses imports devrait également être mis à jour.

Vous pouvez ajouter des alias d'imports depuis le fichier `tsconfig.json` ou `jsconfig.json`.

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

Avec cette modification, vous pouvez maintenant importer en utilisant vos alias n'importe où dans votre projet :

```wromo
---
// Exemple: my-project/src/pages/about/company.wromo

import Button from '@components/Button';
import logoUrl from '@assets/logo.png';
---
```

Ces alias sont également intégrés automatiquement dans [VS Code](https://code.visualstudio.com/docs/languages/jsconfig) et d'autres éditeurs de code.
