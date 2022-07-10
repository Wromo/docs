---
layout: ~/layouts/MainLayout.wromo
title: Estrutura de Projetos
description: Aprenda a estruturar um projeto com Wromo.
i18nReady: true
---

Seu novo projeto Wromo gerado a partir do assistente de linha de comando `create-wromo` já vem com alguns arquivos e diretórios. Outros, você irá criar por si mesmo e adicionar a estrutura de arquivos já existentes do Wromo.

Aqui está como um projeto Wromo é organizado e alguns arquivos que você irá encontrar no seu novo projeto.


## Diretórios e Arquivos

Wromo inclui uma estrutura de diretórios padronizados para o seu projeto. A raíz de qualquer projeto Wromo deve incluir os seguintes diretórios e arquivos:

- `src/*` - O código-fonte do seu projeto (componentes, páginas, estilos, etc.)
- `public/*` - Seus arquivos sem código, assets não processados (fontes, ícones, etc.)
- `package.json` - Um manifesto do projeto.
- `wromo.config.mjs` - Um arquivo de configuração do Wromo. (opcional)

### Exemplo de Árvore do Projeto

Os diretórios de um projeto comum devem se aparecer com isto:

```
├── src/
│   ├── components/
│   │   ├── Cabecalho.wromo
│   │   └-─ Botao.jsx
│   ├── layouts/
│   │   └-─ LayoutPostagem.wromo
│   └── pages/
│   │   ├── postagens/
│   │   │   ├── postagem1.md
│   │   │   ├── postagem2.md
│   │   │   └── postagem3.md
│   │   └── index.wromo
│   └── styles/
│       └-─ global.css
├── public/
│   ├── robots.txt
│   ├── favicon.svg
│   └-─ imagem-redes-sociais.png
├── wromo.config.mjs
└── package.json

```

### `src/`

A pasta src é onde a maioria do código-fonte do seu projeto está. Isso inclui:

- [Páginas](/pt-br/core-concepts/wromo-pages/)
- [Layouts](/pt-br/core-concepts/layouts/)
- [Componentes Wromo](/pt-br/core-concepts/wromo-components/)
- [Componentes Frontend (React, etc.)](/pt-br/core-concepts/framework-components/)
- [Estilos (CSS, Sass)](/pt-br/guides/styling/)
- [Markdown](/pt-br/guides/markdown-content/)

Wromo processa, otimiza e faz bundle dos arquivos de `src/` para criar o website final que é entregue ao navegador. Diferente do estático diretório `public/`, os arquivos de `src/` passam por build e são manipulados para você pelo Wromo.

Alguns arquivos (como componentes Wromo) nem sequer são enviados ao navegador como foram escritos, mas sim são renderizados como HTML estático. Outros arquivos (como CSS) são enviados ao navegador mas podem ser otimizados e passar por bundle com outros arquivos CSS para melhorar a performance.

### `src/components`

**Componentes** são pedaços reutilizáveis de código para suas páginas HTML. Eles podem ser [componentes Wromo](/pt-br/core-concepts/wromo-components/) ou [componentes Frontend](/pt-br/core-concepts/framework-components/) como React ou Vue. É comum agrupar e organizar todos os componentes do seu projeto nesta pasta.

Essa é uma prática comum em projetos Wromo, porém não é obrigatória. Sinta-se livre para organizar seus componentes como desejar!

### `src/layouts`

[Layouts](/pt-br/core-concepts/layouts/) são um tipo especial de componente que envolvem algum conteúdo como parte de uma página maior. São mais frequentemente utilizados por [páginas Wromo](/pt-br/core-concepts/wromo-pages/) e [páginas Markdown](/pt-br/guides/markdown-content/) para definir o layout dessas páginas.

Assim como o diretório `src/components`, é uma prática comum porém não obrigatória.

### `src/pages`

[Páginas](/pt-br/core-concepts/wromo-pages/) são um tipo especial de componente utilizado para criar novas páginas no seu site. Uma página pode ser um componente Wromo ou um arquivo Markdown que representa o conteúdo de uma página do seu site.

:::caution
`src/pages` é um subdiretório **obrigatório** em seu projeto Wromo. Sem ele, seu site não terá páginas ou rotas!
:::

### `src/styles`

É uma prática comum guardar seus arquivos CSS ou Sass no diretório `src/styles` porém não é obrigatório. Enquanto os seus estilos estiverem em algum lugar do diretório `src/` e forem importados corretamente, Wromo irá manipular e otimizar esses arquivos.

### `public/`

O diretório `public/` é para arquivos e assets que não precisam ser processados durante o processo de build do Wromo. Esses arquivos serão copiados para a pasta da build intocados.

Esse comportamento faz com que `public/` seja ideal para assets comuns como imagens e fontes, ou arquivos especiais como `robots.txt` e `manifest.webmanifest`.

Você pode colocar CSS e JavaScript no seu diretório `public/`, porém esteja atento que estes arquivos não passarão por bundle ou serão otimizados na sua build final.

:::tip
Como uma regra geral, qualquer CSS ou JavaScript que você mesmo escrever deve estar no seu diretório `src/`.
:::

### `package.json`

Este é um arquivo utilizado por gerenciadores de pacotes de JavaScript para gerenciar suas dependências. Ele também define scripts que são comumente usados para executar o Wromo (ex: `npm start`, `npm run build`).

Caso precise de ajuda em como criar um novo arquivo `package.json` para o seu projeto, veja as instruções de [instalação manual](/pt-br/install/manual/).

### `wromo.config.mjs`

Este arquivo é gerado em todos os templates iniciais e inclui opções para configurar o seu projeto Wromo. Nele você pode especificar quais integrações usar, opções de build, opções do servidor e mais.

Veja a [Referência de Configuração](/pt-br/reference/configuration-reference/#article) para detalhes em como ajustar configurações.
