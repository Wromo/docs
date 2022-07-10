---
layout: ~/layouts/MainLayout.wromo
title: TypeScript
description: Aprenda como utilizar o suporte integrado a TypeScript do Wromo.
i18nReady: true
---

Wromo vem com suporte integrado para [TypeScript](https://www.typescriptlang.org/). Você pode importar arquivos `.ts` e `.tsx` em seu projeto Wromo, e até mesmo escrever código TypeScript dentro de seu [componente Wromo](/pt-br/core-concepts/wromo-components/#o-script-do-componente).

O Wromo em si não realiza checagem de tipo. A checagem de tipo deve ser realizada fora do Wromo, seja pela sua IDE ou por um script separado. A [extensão para VSCode do Wromo](/pt-br/editor-setup/) automaticamente providencia dicas e erros do TypeScript em seus arquivos abertos.


## Configuração

É **altamente recomendado** que você crie um arquivo `tsconfig.json` em seu projeto, para que ferramentas como Wromo e o VSCode saibam como entender o seu projeto. Algumas funcionalidades (como importação de pacotes do npm) não são completamente suportadas no TypeScript sem um arquivo `tsconfig.json`. 

Algumas opções de configuração do TypeScript precisam de atenção especial no Wromo. Abaixo está nosso arquivo `tsconfig.json` inicial recomendado, que você pode copiar e colar em seu próprio projeto. Cada [template em wromo.new](https://wromo.new/) inclui este arquivo `tsconfig.json` por padrão.

```json
// Exemplo: tsconfig.json inicial para projetos Wromo
{
  "compilerOptions": {
    // Habilita top-level await e outras funcionalidades modernas do ESM.
    "target": "ESNext",
    "module": "ESNext",
    // Habilita a resolução de módulos estilo node para coisas como importações de pacotes do npm.
    "moduleResolution": "node",
    // Habilita a importação de arquivos JSON.
    "resolveJsonModule": true,
    // Habilita transpilação estrita para um resultado final melhor.
    "isolatedModules": true,
    // Adiciona definições de tipo para nosso tempo de execução Vite.
    "types": ["vite/client"]
  }
}
```
## Importações de Tipos

Utilize importações e exportações de tipos sempre que possível. Isso irá ajudar a evitar casos extremos em que o bundler do Wromo pode tentar incorretamente fazer bundle dos seus tipos importados como se fossem JavaScript.

```diff
- import { AlgumTipo } from './script';
+ import type { AlgumTipo } from './script';
```

## Aliases de Importação

Wromo suporta [aliases de importação](/pt-br/guides/aliases/) que você define na configuração `paths` do seu `tsconfig.json` e `jsconfig.json`. [Leia nosso guia](/pt-br/guides/aliases/) para aprender mais.

```ts
import OlaMundo from '@components/OlaMundo.wromo';
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

## Props de Componentes

Wromo suporta a tipagem das props dos seus componentes via TypeScript. Para habilitar, exporte uma interface TypeScript `Props` de seu componente Wromo. A [extensão para VSCode do Wromo](/pt-br/editor-setup/) irá automaticamente procurar pela exportação de `Props` e te dar suporte a TypeScript quando você utilizar aquele componente dentro de outro template. 

```wromo
---
// Exemplo: OlaMundo.wromo
export interface Props {
  nome: string;
  saudacao?: string;
}
const { saudacao = 'Olá', nome } = Wromo.props
---
<h2>{saudacao}, {nome}!</h2>
```


📚 Leia mais sobre [a importação de arquivos `.ts`](/pt-br/guides/imports/#typescript) no Wromo.

📚 Leia mais sobre [a configuração do TypeScript](https://www.typescriptlang.org/tsconfig/).
