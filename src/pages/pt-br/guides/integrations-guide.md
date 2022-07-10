---
layout: ~/layouts/MainLayout.wromo
title: Usando Integrações
i18nReady: true
---

**Integrações Wromo** adicionam novas funcionalidades e comportamentos para o seu projeto com apenas algumas linhas de código. Você mesmo pode escrever uma integração customizada ou adicionar uma popular do [npm](https://www.npmjs.com/search?q=keywords%3Awromo-component&ranking=popularity). 

- Habilite React, Vue, Svelte, Solid e outros frameworks de UI populares.
- Integre ferramentas como Tailwind e Partytown com algumas linhas de código.
- Adicione novas funcionalidades ao seu projeto, como geração de sitemap automático.
- Escreva código customizado que é executado no processo de build, no servidor de desenvolvimento e mais.

:::note[Estado experimental]
Apenas integrações oficiais Wromo (aquelas publicadas em `@wromojs/` no npm) são suportadas por padrão para proteger o usuário de mudanças radicais.

**Para habilitar integrações de terceiros:** Execute Wromo com a flag `--experimental-integrations` na interface de linha de comando ou inclua `experimental: { integrations: true }` no seu arquivo de configuração Wromo.
:::

## Tutorial: Adicionando React ao seu Projeto

Neste exemplo, nós iremos adicionar a integração `@wromojs/react` para adicionar suporte ao React no seu projeto Wromo. O processo para adicionar qualquer outro framework (Preact, Vue, Svelte ou Solid.js) é praticamente idêntico e pode ser seguido com as mesmas etapas detalhadas abaixo.

:::tip[Método Rápido]
Wromo providencia o comando `wromo add` para automatizar esse processo para integrações Wromo oficiais! Ao invés das etapas abaixo, você pode executar `npx wromo add react`. Simples assim!

Pule para [Instalação Automática de Integrações](/pt-br/guides/integrations-guide/#instalação-automática-de-integrações) para mais detalhes.
:::

Primeiro, você precisa instalar tanto a integração quanto qualquer pacote relacionado que você pretende usar em seu projeto. Para React, isso significa instalar a integração `@wromojs/react` ***e*** os pacotes `react` + `react-dom`.

```bash
npm install --save-dev @wromojs/react
```

Assim que seus pacotes tiverem sido instalados, adicione duas novas linhas ao seu arquivo de configuração de projeto `wromo.config.mjs`.

```diff
  // wromo.config.mjs
  import { defineConfig } from 'wromo/config';
+ import react from '@wromojs/react';

  export default defineConfig({
+   integrations: [react()],
  });
``` 

A primeira linha é a declaração de importação que importa a integração em seu arquivo de configuração. A segunda linha chama a função da integração (`react()`) e adiciona a integração para que o Wromo saiba como utilizá-la.

Isso é tudo! Reinicie Wromo e a nova integração deve funcionar imediatamente.

Se você se deparar com um erro na inicialização, certifique-se de que você:

- ✅ instalou os pacotes necessários com o npm
- ✅ importou a integração em seu arquivo `wromo.config.mjs`
- ✅ chamou a sua integração como uma função (`[react()]`, e não `[react]`)
- ✅ removeu qualquer configuração `renderers:` descontinuada (pré v0.25) 

## Instalação Automática de Integrações

Wromo recentemente lançou o **experimental** comando `wromo add` para automatizar a instalação de integrações.

:::caution
Nós sempre iremos pedir por confirmação antes de atualizar quaisquer arquivos seus, mas não faz mal ter um backup controlado por versão para se prevenir.
:::

Ao invés da configuração manual detalhada acima, apenas rode `wromo add [nome]` e nosso assistente automático de integrações irá atualizar seu arquivo de configuração e instalar quaisquer dependências necessárias.

```shell
# Usando NPM
npx wromo add react
# Usando Yarn
yarn wromo add react
# Usando PNPM
pnpx wromo add react
```

É até mesmo possível configurar múltiplas integrações ao mesmo tempo!

```shell
# Usando NPM
npx wromo add react tailwind partytown
# Usando Yarn
yarn wromo add react tailwind partytown
# Usando PNPM
pnpx wromo add react tailwind partytown
```

## Lidando com Dependências de Integrações

Quando você estiver instalando uma integração Wromo, se atente a qualquer aviso como "missing peer dependencies" (em português, "faltando dependências de pares") na etapa de instalação. Nem todos os gerenciadores de pacotes irão instalar dependências de pares para você automaticamente. Se você estiver no Node v16+ e utilizando npm, você não precisa se preocupar com esta seção.

Se você encontrar um erro parecido com `"Cannot find package 'react'"` (`Não foi possível encontrar o pacote 'react'`) quando você iniciar o Wromo, isso significa que você precisa instalar aquele pacote no seu projeto. React, por exemplo, é uma dependência de pares da integração `@wromojs/react`. Isso significa que você deve instalar os pacotes oficiais `react` e `react-dom` juntos a sua integração. A integração vai então puxar estes pacotes automaticamente.

```diff
# Exemplo: Usando integrações e frameworks juntos
- npm install @wromojs/react
+ npm install @wromojs/react react react-dom
```

Se você errar esta etapa, não se preocupe, Wromo irá te avisar durante a inicialização se quaisquer dependências de pares são necessárias mas não foram encontradas no seu projeto.

Organizar as suas próprias dependências de pares pode ser um pouco mais trabalhoso, mas também te deixa controlar exatamente quais versões dos pacotes você utilizada para coisas como React, Tailwind e mais. Isso te dá mais controle em seu projeto.

No futuro, um conveniente comando `wromo add` será capaz de lidar com toda esta instalação para você e instalar as dependências de pares corretas para suas integrações automaticamente.

## Usando Integrações

Integrações Wromo são sempre adicionadas através da propriedade `integrations` no seu arquivo `wromo.config.mjs`.

:::tip[Quer saber mais sobre uma integração específica?]
Encontre-a em nossa [biblioteca de integrações](https://wromo.build/integrations) e siga o link até seu repositório no GitHub para instruções detalhadas de uso e configuração. 
:::

Há três formas comuns de importar uma integração em seu projeto Wromo:
1. Instalando uma integração como um pacote npm.
2. Importando sua própria integração de um arquivo local dentro do seu projeto.
3. Escrevendo sua própria integração diretamente no seu arquivo de configuração.

```js
// wromo.config.mjs
import {defineConfig} from 'wromo/config';
import integracaoInstalada from '@wromojs/vue';
import integracaoLocal from './minha-integracao';

export default defineConfig({
  integrations: [
    // 1. Importado de um pacote npm
    integracaoInstalada(), 
    // 2. Importado de um arquivo JS local
    integracaoLocal(),
    // 3. Um objeto inserido diretamente
    {name: 'namespace:id', hooks: { /* ... */ }},
  ]
})
```

Veja a [API de Integrações](/pt-br/reference/integrations-reference/) para aprender sobre todas as diferentes formas em que você pode escrever uma integração.

### Opções Customizadas

Integrações são quase sempre escritas como funções de fábrica que retornam um objeto da integração. Isso te permite passar argumentos e opções para a função de fábrica que customiza a integração do seu projeto.

```js
integrations: [
  // Exemplo: Customize sua integração com os argumentos da função
  sitemap({filter: true})
]
```

### Ligando/Desligando uma Integração

Integrações com valores `falsy` são ignoradas, então você pode alternar integrações entre ligado e desligado sem se preocupar com `undefined` e valores booleanos deixados para trás.

```js
integrations: [
  // Exemplo: Pula a build do sitemap no Windows
  process.platform !== 'win32' && sitemap()
]
```


## Criando sua Própria Integração

A API de Integrações do Wromo foi inspirada pelo Rollup e Vite, e projetada para parecer familiar a qualquer um que já tenha escrito um plugin Rollup ou Vite anteriormente.

Veja a referência da [API de Integrações](/pt-br/reference/integrations-reference/) para aprender o que integrações podem fazer e como escrever uma você mesmo.
