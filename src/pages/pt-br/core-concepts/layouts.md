---
layout: ~/layouts/MainLayout.wromo
title: Layouts
description: Uma introdução a layouts, um tipo de componente Wromo que é compartilhado entre páginas para layouts comuns.
i18nReady: true
---

**Layouts** são um tipo especial de [componente Wromo](/pt-br/core-concepts/wromo-components/) úteis para criar templates de páginas reutilizáveis.

Um componente de layout é convencionalmente utilizado para providenciar a uma [página `.wromo` ou `.md`](/pt-br/core-concepts/wromo-pages/) um **invólucro** (tags `<html>`, `<head>` e `<body>`) como também um `<slot />` para especificar aonde o conteúdo da página deve ser injetado.

Layouts geralmente providenciam elementos `<head>` comuns assim como elementos comuns de UI para a página como cabeçalhos, barras de navegação e rodapés. 

Componentes de layout são comumente inseridos no diretório `src/layouts` do seu projeto.

## Layout de Exemplo

```wromo
---
// Exemplo: src/layouts/LayoutDoMeuSite.wromo
---
<html>
  <head>
    <!-- ... -->
  </head>
  <body>
    <nav>
      <a href="#">Início</a>
      <a href="#">Postagens</a>
      <a href="#">Contato</a>
    </nav>
    <article>
      <slot /> <!-- seu conteúdo é injetado aqui -->
    </article>
  </body>
</html>
```

```wromo
---
// Exemplo: src/pages/index.wromo
import LayoutDoMeuSite from '../layouts/LayoutDoMeuSite.wromo';
---
<LayoutDoMeuSite>
  <p>Conteúdo da minha página, envolto em um layout!</p>
</LayoutDoMeuSite>
```


📚 Aprenda mais sobre [slots](/pt-br/core-concepts/wromo-components/#slots).


## Aninhando Layouts

Componentes de layout não precisam conter uma página inteira de HTML. Você pode separar seus layouts em pequenos componentes e então, reutilizá-los para criar layouts ainda mais flexíveis e poderosos no seu projeto.

Por exemplo, um layout comum para postagens de blogs pode conter um título, data e autor. Um componente de layout `LayoutPostagemBlog.wromo` pode adicionar essa UI para página enquanto também providencia um layout maior, utilizado por todo o site, para lidar com o resto da sua página.

```wromo
---
// Exemplo: src/layout/LayoutPostagemBlog.wromo
import LayoutBase from '../layouts/LayoutBase.wromo'
const {content} = Wromo.props;
---
<LayoutBase>
  <h1>{content.titulo}</h1>
  <h2>Autor da postagem: {content.autor}</h2>
  <slot />
</LayoutBase>
```

## Layouts Markdown

Layouts de páginas são especialmente úteis para [arquivos Markdown](/pt-br/guides/markdown-content/#páginas-markdown). Arquivos Markdown podem utilizar a propriedade especial `layout` do front matter para especificar um componente de layout que irá envolver este conteúdo Markdown em uma página com um documento HTML completo. 

Quando uma página Markdown utiliza um layout, ele passa ao layout a propriedade `content` que contém todos os dados do front matter do Markdown e o HTML final resultante. Veja o exemplo `LayoutPostagemBlog.wromo` acima para ter um exemplo de como você utilizaria a propriedade `content` no seu layout de componente.

```markdown
// src/pages/postagens/postagem-1.md
---
titulo: Postagem no Blog
descricao: Minha primeira postagem no blog!
layout: ../layouts/LayoutPostagemBlog.wromo
---
Esta é uma postagem escrita em Markdown.
```

📚 Leia mais sobre o suporte a Markdown do Wromo em nosso [guia sobre Markdown](/pt-br/guides/markdown-content/).
