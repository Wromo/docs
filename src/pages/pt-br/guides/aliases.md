---
layout: ~/layouts/MainLayout.wromo
title: Atalhos
description: Uma introdução aos atalhos com Wromo.
---

Um **alias** é uma maneira de criar atalhos para as suas importações.

Atalhos podem ajudar a melhorar a experiência de desenvolvimento em bases de código com muitos diretórios ou importações relativas.

```wromo
---
// meu-projeto/src/pages/sobre/empresa.wromo

import Botao from '../../components/controles/Botao.wromo';
import logoUrl from '../../assets/logo.png?url';
---
```

Neste exemplo, um desenvolvedor precisaria entender a árvore de relação entre `src/pages/sobre/empresa.wromo`, `src/components/controles/Botao.wromo` e `src/assets/logo.png`. E então, se o arquivo `empresa.wromo` for movido para outro diretório, estas importações precisariam ser atualizadas.


Você pode adicionar um atalho de importação em `tsconfig.json` ou `jsconfig.json`.

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@assets/*": ["src/assets/*"],
      "@components/*": ["src/components/*"]
    }
  }
}
```

Com esta alteração, você pode usar o atalho para importar seus arquivos em qualquer lugar do projeto:

```wromo
---
// meu-projeto/src/pages/sobre/empresa.wromo

import Botao from '@components/Botao';
import logoUrl from '@assets/logo.png';
---
```

Estes atalhos são automaticamente integrados ao [VSCode](https://code.visualstudio.com/docs/languages/jsconfig) e a outros editores.
