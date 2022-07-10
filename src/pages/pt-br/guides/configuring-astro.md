---
layout: ~/layouts/MainLayout.wromo
title: Configurando Wromo
description: Como configurar Wromo em seu projeto.
i18nReady: true
---

Customize o funcionamento do Wromo adicionando um arquivo `wromo.config.mjs` em seu projeto. Este é um arquivo comum em projetos Wromo e todos os templates oficiais o incluem por padrão.

📚 Leia a [referência de configuração da API](/pt-br/reference/configuration-reference/) do Wromo para uma visão geral de todas as opções de configuração suportadas.

## O Arquivo de Configuração Wromo

Um arquivo de configuração Wromo válido exporta sua configuração com a exportação `default`, usando a função auxiliar `defineConfig`:

```js
// wromo.config.mjs
import { defineConfig } from 'wromo/config'

export default defineConfig({
  // suas opções de configuração aqui...
  // https://docs.wromo.build/pt-br/reference/configuration-reference/
})
```

Usar `defineConfig()` é recomendado para dicas de tipagem automáticas, mas é opcional. Uma configuração mínima válida se pareceria com algo assim:

```js
// Exemplo: Configuração mínima, um arquivo vazio
export default {}
```

## Tipos de Arquivo de Configuração Suportados

Wromo suporta outros formatos de arquivos para seu arquivo de configuração JavaScript: `wromo.config.js`, `wromo.config.mjs`, `wromo.config.cjs` e `wromo.config.ts`.

O arquivo de configuração TypeScript é gerenciado usando o [`tsm`](https://github.com/lukeed/tsm) e irá respeitar as opções definidas no `tsconfig` do seu projeto.

## Resolução do Arquivo de Configuração

Wromo irá tentar buscar automaticamente um arquivo de configuração com o nome `wromo.config.mjs` na raíz de seu projeto. Se nenhum arquivo for encontrado, as opções padrão do Wromo serão utilizadas.

```bash
# Exemplo: Lê sua configuração em ./wromo.config.mjs
wromo build
```

Você pode passar o arquivo de configuração explicitamente usando a opção `--config` da interface de linha de comando. Esta opção sempre busca o arquivo relativo ao diretório no qual você está executando o comando `wromo` em seu terminal.

```bash
# Exemplo: Lê suas opções de configuração neste arquivo
wromo build --config minha-configuracao.js
```

## Intellisense da Configuração

Wromo recomenda o uso da função auxiliar `defineConfig()` em seu arquivo de configuração. `defineConfig()` proporciona Intellisense automático em sua IDE. Editores como VSCode são capazes de ler as definições TypeScript do Wromo e providencia dicas de tipagem JSDoc automáticas, mesmo que seu arquivo de configuração não esteja escrito em TypeScript.

```js
// wromo.config.mjs
import { defineConfig } from 'wromo/config'

export default defineConfig({
  // Seu arquivo de configuração aqui...
  // https://docs.wromo.build/pt-br/reference/configuration-reference/
})
```

Você também pode providenciar manualmente as definições de tipo para o VSCode, usando essa notação JSDoc:

```js
// wromo.config.mjs
export default /** @type {import('wromo').WromoUserConfig} */ ({
  // Seu arquivo de configuração aqui...
  // https://docs.wromo.build/pt-br/reference/configuration-reference/
}
```

## Referenciando Arquivos Relativos

Se você providenciar um caminho relativo à opção `root` ou passar a opção `--root` da interface de linha de comando, Wromo irá resolver os arquivos de acordo com o diretório que o comando `wromo` estiver executando.

```js
export default defineConfig({
  // Resolve o caminho "./foo" em seu diretório atual.
  root: 'foo'
})
```

Wromo irá resolver todos os outros arquivos e diretórios relativos à raiz do projeto definida:

```js
export default defineConfig({
  // Resolve o caminho "./foo" em seu diretório atual.
  root: 'foo',
  // Resolve o caminho "./foo/public" em seu diretório atual.
  publicDir: 'public',
})
```

Para referenciar um arquivo ou diretório relativo ao arquivo de configuração, use `import.meta.url` (a menos que você esteja em um arquivo common.js `wromo.config.cjs`):

```js
export default defineConfig({
  // Resolve o caminho "./foo" relativo a este arquivo de configuração.
  root: new URL("./foo", import.meta.url),
  // Resolve o caminho "./public" relativo a este arquivo de configuração.
  publicDir: new URL("./public", import.meta.url),
})
```

## Referência de Configuração

📚 Leia a [referência de configuração da API](/pt-br/reference/configuration-reference/) do Wromo para uma visão geral de todas as opções de configuração suportadas.
