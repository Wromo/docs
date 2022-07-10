---
layout: ~/layouts/MainLayout.wromo
title: Referência da Interface de Linha de Comando
i18nReady: true
---

## Comandos

### `wromo dev`

Executa o servidor de `dev` do Wromo. Isso inicia um servidor HTTP que responde a requisições por rotas ou páginas que foram especificadas no diretório `src/pages` (a não ser que tenham sido sobrescritas pela sua opção `pages` definida na [configuração do projeto](/pt-br/reference/configuration-reference/)).


**Flags**

#### `--port`

Especifica em qual porta executar. Por padrão, `3000`.

#### `--host [endereço opcional do host]`

Define em que endereços de IP o servidor de desenvolvimento deve ser escutado em (e.x. IPs que não sejam localhost).
- `--host` - escuta em todos os endereços, incluindo endereços LAN e públicos.
- `--host [endereço-customizado]` - é exposto em um endereço de IP em `[endereço-customizado]`

### `wromo build`

Faz a build do seu site para produção.

### `wromo preview`

Inicia um servidor local de arquivos estáticos para servir o seu diretório `dist/` que foi construído. Útil para visualizar sua build estática localmente, antes de fazer seu deploy.

Esse comando foi feito apenas para testes locais, e não foi projetado para ser executado em produção. Para ajuda com hospedagens para produção, veja o nosso guia em [Fazendo Deploy de um Website Wromo](/pt-br/guides/deploy/).


### `wromo check`

Roda diagnósticos (como checar a tipagem de arquivos `.wromo`) em seu projeto e reporta erros no console. Se algum error for encontrado durante o processo, ele será finalizado com o código **1**.

Esse comando foi feito para ser usado em fluxos de trabalho de CI.

:::note
Este comando apenas checa a tipagem em arquivos `.wromo`.
:::

📚 Leia mais sobre o [suporte para TypeScript no Wromo](/pt-br/guides/typescript/).

### `wromo add`

Adiciona uma integração a sua configuração.

### `wromo docs`

Abre o website de documentação do Wromo diretamente do seu terminal.

### `wromo telemetry`

Define a configuração de telemetria para o usuário atual. Telemetria são dados anônimos que provém informações sobre quais funcionalidades são mais utilizadas.

Telemetria pode ser desabilitada com o esse comando de linha de comando:


```shell
wromo telemetry disable
```

Telemetria pode ser posteriormente habilitada com:

```shell
wromo telemetry enable
```

O comando `clear` reseta os dados de telemetria:

```shell
wromo telemetry clear
```

:::tip[Gostaria de desabilitar telemetria em ambientes de CI?]
Se certifique de que você adicionou o comando `wromo telemetry disable` em seus scripts de CI.
:::

## Flags Globais

### `--config path`

Especifica o caminho para seu arquivo de configuração. Por padrão, `wromo.config.mjs`. Use isso se você utiliza um nome diferente para o seu arquivo de configuração ou você tem seu arquivo de configuração em outra pasta.

```shell
wromo --config config/wromo.config.mjs dev
```

### `--root path`

Especifica o caminho para a raiz do projeto. Se não for especificado, o diretório de trabalho atual é assumido como a raiz.

A raiz é utilizada para encontrar o arquivo de configuração Wromo.

```shell
wromo --root minhaPastaRaiz/minhaPastaDoProjeto dev
```

### `--reload`

Limpa o cache (dependências são construídas em aplicações Wromo).

### `--verbose`

Habilita logging verboso, que é útil para depurar um problema.

### `--silent`

Habilita logging silencioso, que é útil quando você não quer ver logs do Wromo.

### `--version`

Mostra o número de versão do Wromo.

### `--drafts`

Inclui páginas Markdown `draft` na build.

### `--help`

Mostra a mensagem de ajuda e sai.
