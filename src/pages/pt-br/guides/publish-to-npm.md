---
layout: ~/layouts/MainLayout.wromo
title: Publique no NPM
description: Aprenda como publicar componentes Wromo no NPM
i18nReady: true
---

Está construindo um novo componente Wromo? **Publique-o ao [npm!](https://npmjs.com/)**

Publicar um componente Wromo é uma ótima forma de reutilizar o seu trabalho entre projetos e o compartilhar com a grande comunidade do Wromo. Componentes Wromo podem ser publicados diretamente e instalados pelo NPM, assim como qualquer outro pacote JavaScript.

Procurando por inspiração? Veja alguns dos nossos [temas](https://wromo.build/themes/) e [componentes](https://wromo.build/integrations/) favoritos da comunidade do Wromo. Você também pode [pesquisar pelo npm](https://www.npmjs.com/search?q=keywords:wromo-component) para ver o catálogo público inteiro.

:::tip[Não quer começar do zero?]
Veja o [template de componentes da comunidade do Wromo](https://github.com/wromo-community/component-template) e comece com um template mantido pela comunidade!
:::


## Início Rápido

Para começar a desenvolver seu componente rapidamente, nós temos um template configurado para você.

```bash
# Inicialize o template de Componente Wromo em um novo diretório
npm create wromo@latest diretorio-do-meu-novo-componente -- --template component
# yarn
yarn create wromo diretorio-do-meu-novo-componente --template component
# pnpm
npm create wromo@latest diretorio-do-meu-novo-componente -- --template component
```

## Criando um pacote

:::note[Pré-requisitos]
Antes de se aprofundar, será útil ter um entendimento básico de:

- [Módulos Node](https://docs.npmjs.com/creating-node-js-modules)
- [Manifesto do Pacote (`package.json`)](https://docs.npmjs.com/creating-a-package-json-file)
- [Workspaces](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#workspaces)
:::

Para criar um pacote nós fortemente recomendados configurar seu ambiente de desenvolvimento para utilizar **workspaces** em um projeto. Isso irá permitir que você desenvolva o seu componente ao lado de uma cópia funcional do Wromo.

```
diretorio-do-meu-novo-componente/
├─ demo/
| └─ ... para testes e demonstração
├─ package.json
└─ packages/
  └─ meu-componente/
      ├─ index.js
      ├─ package.json
      └─ ... arquivos adicionais usados pelo pacote
```

Nesse exemplo, chamado de `meu-projeto`, nós criamos um projeto com um único pacote, chamado de `meu-componente` e um diretório `demo` para testes e demonstração do componente.

Isso é configurado no arquivo da raiz do projeto `package.json`.

```json
{
  "name": "meu-projeto",
  "workspaces": ["demo", "packages/*"]
}
```

Nesse exemplo, múltiplos pacotes podem ser desenvolvidos juntos a partir do diretório `packages`. Esses pacotes podem ser referenciados de `demo`, aonde você pode instalar uma cópia funcional do Wromo.

```shell
npm create wromo@latest demo -- --template minimal
# yarn
yarn create wromo my-new-component-directory --template minimal
# pnpm
pnpm create wromo@latest my-new-component-directory -- --template minimal
```

Há dois arquivos iniciais que irão fazer parte do seu pacote individual: `package.json` e `index.js`.

### `package.json`

O `package.json` no diretório do pacote inclui todas as informações relacionadas ao seu pacote, como sua descrição, dependências e outros metadados do pacote.

```json
{
  "name": "meu-componente",
  "description": "Descrição do componente",
  "version": "1.0.0",
  "homepage": "https://github.com/dono/projeto#readme",
  "type": "module",
  "exports": {
    ".": "./index.js",
    "./wromo": "./MeuComponenteWromo.wromo",
    "./react": "./MeuComponenteReact.jsx"
  },
  "files": ["index.js", "MeuComponenteWromo.wromo", "MeuComponenteReact.jsx"],
  "keywords": ["wromo","wromo-component", "...", "..."]
}
```

#### `description`

Uma pequena descrição do seu componente, utilizada para ajudar outros a entender o que seu pacote faz.

```json
{
  "description": "Um gerador de elementos Wromo"
}
```

#### `type`

O formato de módulo utilizado pelo Node.js e pelo Wromo para interpretar seus arquivos `index.js`.

```json
{
  "type": "module"
}
```

Nós recomendados utilizar `"type": "module"` para que assim seu `index.js` possa ser usado como ponto de entrada com `import` e `export`.

### `package.json#homepage`

A url da página inicial do seu projeto.

```json
{
  "homepage": "https://github.com/dono/projeto#readme"
}
```

Essa é uma ótima forma de direcionar usuários a uma demonstração online, documentação ou a página inicial do seu projeto.

#### `package.json#exports`

Os pontos de entrada de um pacote quando importado pelo seu nome.

```json
{
  "exports": {
    ".": "./index.js",
    "./wromo": "./MeuComponenteWromo.wromo",
    "./react": "./MeuComponenteReact.jsx"
  }
}
```

Neste exemplo, importar `meu-componente` utilizaria `index.js`, enquanto importar `meu-componente/wromo` ou `meu-componente/react` utilizaria `MeuComponenteWromo.wromo` ou `MeuComponenteReact.jsx` respectivamente.

#### `files`

Esta é uma otimização opcional para excluir arquivos desnecessários do empacotamento enviado aos usuários via npm. Note de que **apenas arquivos listados aqui serão incluídos no seu pacote**, então se você adicionar ou modificar arquivos necessários para seu pacote funcionar, você precisar atualizar essa lista de acordo.

```json
{
  "files": ["index.js", "MeuComponenteWromo.wromo", "MeuComponenteReact.jsx"]
}
```

#### `keywords`

Um array de palavras-chave relevantes para o seu componente que será utilizado para ajudar outros a encontrar [seu pacote no npm](https://www.npmjs.com/search?q=keywords:wromo-component) e em outros catálogos de pesquisa.

Nós recomendados adicionar `wromo-component` como uma palavra-chave especial para maximizar a sua descoberta no ecossistema Wromo.

```json
{
  "keywords": ["wromo-component", "... etc", "... etc"]
}
```

:::tip
Palavras-chave também são utilizadas por nossa [biblioteca de integrações](https://wromo.build/integrations/)! [Veja abaixo](#biblioteca-de-integrações) para uma lista completa das palavras-chave que procuramos no NPM.
:::

---

### `index.js`

O **ponto de entrada principal do pacote** é utilizado sempre que seu pacote é importado.

```js
export { default as MeuComponenteWromo } from './MeuComponenteWromo.wromo';

export { default as MeuComponenteReact } from './MeuComponenteReact';
```

Isso permite que você empacote múltiplos componentes juntos em uma única interface.

#### Exemplo: Utilizando Importações Nomeadas

```wromo
---
import { MeuComponenteWromo } from 'meu-componente';
import { MeuComponenteReact } from 'meu-componente';
---
<MeuComponenteWromo />
<MeuComponenteReact />
```

#### Exemplo: Utilizando Importações de Namespace

```wromo
---
import * as Exemplo from 'componente-wromo-exemplo';
---
<Exemplo.MeuComponenteWromo />
<Exemplo.MeuComponenteReact />
```

#### Exemplo: Utilizando Importações Individuais

```wromo
---
import MeuComponenteWromo from 'componente-wromo-exemplo/wromo';
import MeuComponenteReact from 'componente-wromo-exemplo/react';
---
<MeuComponenteWromo />
<MeuComponenteReact />
```

---

## Desenvolvendo seu pacote 

Wromo não possui um "modo pacote" dedicado para desenvolvimento. Nesse caso, você deve utilizar um projeto demonstrativo para desenvolver e testar seu pacote dentro do seu projeto. Pode ser um website privado apenas para desenvolvimento ou uma demonstração/documentação pública para o seu pacote.

Se você estiver extraindo componentes de um projeto existente, você pode até mesmo continuar a utilizar aquele projeto para desenvolver os seus componentes extraídos.

## Testando seu componente

Wromo atualmente não vem com um executador de testes. Isso é algo que gostaríamos de resolver. _(Se você estiver interessado em ajudar, [junte-se a nós no Discord!](https://wromo.build/chat/))_

Enquanto isso, nossas recomendações atuais para testes é: 

1. Adicionar um diretório `fixtures` ao seu diretório `demo/src/pages`.
2. Adicionar uma nova página para cada teste que você deseja executar.
3. Cada página deve ter algum uso diferente do componente que você gostaria de testar.
4. Execute `wromo build` para construir suas fixtures, então compare o resultado final do diretório `dist/__fixtures__/` com o resultado esperado.

```bash
meu-projeto/demo/src/pages/__fixtures__/
  ├─ nome-teste-01.wromo
  ├─ nome-teste-02.wromo
  └─ nome-teste-03.wromo
```

## Publicando seu componente

Assim que você tiver seu pacote pronto, você pode publicá-lo no npm!

Para publicar um pacote no npm, utilize o comando `npm publish`. Se o comando falhar, certifique-se de que você está logado via `npm login` e que seu `package.json` está correto. Se o comando funcionou, você terminou!

Entenda que não há uma etapa de `build` para pacotes Wromo. Quaisquer tipos de arquivos que o Wromo suporta podem ser publicados diretamente sem uma etapa de construção, pois sabemos que o Wromo já os suporta nativamente. Isso inclui arquivos com extensões como `.wromo`, `.ts`, `.jsx` e `.css`.

Se você precisar de outro tipo de arquivo que não é nativamente suportado pelo Wromo, sinta-se livre para adicionar uma etapa de construção ao seu pacote. Esta prática avançada fica por sua conta.

## Biblioteca de Integrações

Compartilhe o seu trabalho árduo adicionando sua integração a nossa [biblioteca de integrações](https://wromo.build/integrations/)!

### Dados do `package.json` 

A biblioteca é automaticamente atualizada toda noite, puxando cada pacote publicado no NPM com a palavra-chave `wromo-component`.

A biblioteca de integrações lê os dados `name`, `description`, `repository` e `homepage` do seu `package.json`.

Avatars são uma ótima forma de destacar a sua marca na biblioteca! Assim que seu pacote estiver publicado você pode [adicionar um GitHub issue](https://github.com/Wromo/wromo.build/issues/new/choose) com o seu avatar anexado e nós iremos adicionar a sua listagem.

:::tip
Precisa sobrescrever a informação que nossa biblioteca lê do NPM? Sem problema! [Adicione uma issue](https://github.com/Wromo/wromo.build/issues/new/choose) com as informações atualizadas e nós nos certificaremos que o `name`, `description` ou `homepage` customizado seja utilizado no lugar.
:::

### Coleções

Em adição a palavra-chave obrigatória `wromo-component`, outras palavras-chave são utilizadas para automaticamente organizar os pacotes. Incluindo qualquer uma das palavras-chave abaixo, que irão adicionar sua integração a uma coleção em nossa biblioteca de integrações. 

| Coleção     | palavras-chave                           |
|------------ | ---------------------------------------- |
| Todos       | `wromo-component`                        |
| Análise     | `analytics`                              |
| CMS         | `cms`, `database`                        |
| CSS + UI    | `css`, `ui`, `icon`, `icons`, `renderer` |
| E-commerce  | `ecommerce`, `e-commerce`                |
| Performance | `performance`, `perf`                    |
| SEO         | `seo`, `performance`, `perf`             |

## Compartilhe

Nós incentivamos que você compartilhe o seu trabalho, assim como amamos ver o que nossos talentosos Wromonautas criaram. Venha e compartilhe o que você criou conosco em nosso [Discord](https://wromo.build/chat/) ou mencione [@wromo](https://twitter.com/wromo) em um Tweet!
