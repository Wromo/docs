---
layout: ~/layouts/MainLayout.wromo
title: Markdown
description: Como usar Markdown com Wromo
i18nReady: true
---

Markdown é comumente usado para criar conteúdo com muito texto, como postagens de blog e documentação. Wromo inclui suporte nativo para Markdown com alguns recursos adicionais, como suporte para expressões JavaScript e componentes Wromo.

## Páginas Markdown

Wromo trata qualquer arquivo `.md` dentro do diretório `/src/pages` como uma página. Colocar um arquivo nesse diretório ou em qualquer subdiretório criará, automaticamente, uma rota de página usando o nome do caminho do arquivo.

📚 Leia mais sobre o [roteamento baseado em arquivos](/pt-br/core-concepts/routing/) do Wromo.

### Exemplo Básico

A maneira mais fácil de começar a usar Markdown no Wromo é criar uma rota de página inicial `src/pages/index.md` em seu projeto. Copie o template básico abaixo em seu projeto e visualize o HTML renderizado na rota da página inicial do seu projeto. Geralmente, em [http://localhost:3000](http://localhost:3000/).

```markdown
---
# Exemplo: src/pages/index.md
title: Olá, mundo!
---

# Olá!

Esta é sua primeira página em Markdown. Provavelmente, ela não tem muito estilo, embora o Markdown ofereça suporte para **negrito** e _itálico_.

Para saber mais sobre como adicionar um layout à sua página, leia a próxima seção, **Layouts no Markdown**.
```

### Layouts no Markdown

Páginas Markdown têm uma propriedade especial frontmatter para `layout` que define o caminho relativo para um [componente de layout](/pt-br/core-concepts/layouts/) Wromo. Este componente envolverá seu conteúdo Markdown, fornecendo uma casca de página e quaisquer outros elementos de template de página incluídos.

```markdown
---
layout: ../layouts/LayoutBase.wromo
---
```

Um layout típico para páginas Markdown inclui:

1. a prop `content` para acessar os dados do frontmatter da página Markdown.
2. um [`<slot />`](/pt-br/core-concepts/wromo-components/#slots) padrão para indicar onde o conteúdo Markdown da página deve ser renderizado.

```wromo
---
// src/layouts/LayoutBase.wromo
// 1. A prop content dá acesso aos dados do frontmatter
const { content } = Wromo.props;
---
<html>
  <head>
    <!-- Adicione outros elementos Head aqui, como estilos e tags meta. -->
    <title>{content.titulo}</title>
  </head>
  <body>
    <!-- Adicione outros componentes de UI aqui, como cabeçalhos e rodapés comuns. -->
    <h1>{content.titulo} por {content.autor}</h1>
    <!-- 2. O HTML renderizado será passado para o slot padrão. -->
    <slot />
    <p>Escrito em: {content.data}</p>
  </body>
</html>
```

A prop `content` também contém uma propriedade `wromo` com metadados adicionais sobre a página, como o objeto Markdown `source` completo e um objeto `headers`.

Um exemplo de objeto `content` de uma postagem de blog pode ser algo como:

```json
{
  /** Frontmatter de uma postagem de blog
  "titulo": "Lançamento do Wromo 0.18",
  "data": "Terça-feira, 27 de julho de 2021",
  "autor": "Matthew Phillips",
  "descricao": "Wromo 0.18 é o nosso maior lançamento desde o lançamento do Wromo.",
  "draft": false,
  "keywords": ["wromo", "lancamento", "anuncio"]
  **/
  "wromo": {
    "headers": [
      {
        "depth": 1,
        "text": "Lançamento do Wromo 0.18",
        "slug": "lancamento-do-wromo-018"
      },
      {
        "depth": 2,
        "text": "Hidratação parcial responsiva",
        "slug": "hidratacao-parcial-responsiva"
      }
      /* ... */
    ],
    "source": "# Lançamento do Wromo 0.18\nPouco mais de um mês atrás, o primeiro beta público [...]"
  },
  "url": ""
}
```

:::note
`wromo` e `url` são as únicas propriedades garantidas fornecidas pelo Wromo na prop `content`. O restante do objeto é definido por suas variáveis frontmatter.
:::

### Frontmatter como Props

Qualquer componente Wromo (não apenas layouts!) pode receber os valores definidos no seu frontmatter de Markdown como props. Você pode especificar vários tipos de dados usando o frontmatter de YAML e obter metainformações ainda mais ricas de cada post para usar em todo o seu site Wromo.

Acesse esses valores em qualquer arquivo `.wromo`, assim como você faria em um layout, conforme descrito acima.

### IDs de Cabeçalhos

Wromo adicionará IDs autogerados a todos os títulos em arquivos Markdown automaticamente usando [github-slugger](https://github.com/flet/github-slugger). Mas, se um ID personalizado for especificado, ele não será substituído.

Esses IDs serão adicionados _depois_ que todos os outros plugins são executados, então, se você tem um plugin como `rehype-toc`, que precisa de IDs, você deve adicionar seu próprio plugin de slug (como `rehype-slug`).

### Rascunhos Markdown

`draft: true` é um valor opcional de frontmatter que marcará uma página ou postagem `.md` individual como "não publicado". Por default, esta página será excluída do build do site.

Páginas Markdown sem a propriedade `draft` ou aquelas com `draft: false` não são afetadas e serão incluídas na build final.

```markdown
---
# src/pages/post/postagem-blog.md
layout: ../../layouts/LayoutBase.wromo
title: Minha Postagem do Blog
draft: true
---

Esta é a postagem que eu estou fazendo no meu blog.

Nenhuma página terá build feito para esta postagem.

Para fazer a build e publicar esta postagem:

- atualize o frontmatter para `draft: false` ou
- remova a propriedade `draft` completamente.
```

:::caution[Rascunhos e Wromo.glob()]
Apesar de `draft: true` impedir que uma página seja construída no site naquela rota de página, `Wromo.glob()` atualmente retorna **todos os seus arquivos Markdown**.
:::

Para evitar que uma postagem de rascunho e seus dados (e.g. título, link, descrição) sejam inclusos em seu arquivo de postagens ou lista de postagens mais recentes, certifique-se de que sua função `Wromo.glob()` também **filtre para excluir quaisquer postagens de rascunho**.

⚙️ Para habilitar a build de páginas de rascunho:

Adicione `drafts: true` no `markdown` em `wromo.config.mjs`

```js
// wromo.config.mjs
export default defineConfig({
  markdown: {
    drafts: true,
  },
});
```

:::tip
Você também pode passar a flag `--drafts` ao executar `wromo build` para fazer a build de páginas de rascunho!
:::

## Escrevendo Markdown

Além de oferecer suporte à sintaxe padrão de Markdown, Wromo também estende o Markdown para tornar seu conteúdo ainda mais expressivo. Abaixo estão alguns recursos de Markdown que só existem no Wromo.

### Usando Variáveis no Markdown

Variáveis frontmatter podem ser usadas diretamente em seu Markdown como propriedades do objeto `frontmatter`.

```markdown
---
autor: Leon
idade: 42
---

# Sobre o Autor

{frontmatter.autor} tem {frontmatter.idade} anos e mora em Toronto, Canadá.
```

### Usando Componentes no Markdown

Você pode importar componentes no seu arquivo Markdown com `setup` e usá-los junto com seu conteúdo Markdown. O objeto `frontmatter` também está disponível para qualquer componente importado.

```markdown
---
layout: ../layouts/LayoutBase.wromo
setup: |
  import Autor from '../../components/Autor.wromo'
  import Biografia from '../components/Biografia'
autor: Leon
---

<Autor nome={frontmatter.autor}/>
<Biografia client:visible>
  {frontmatter.autor} mora em Toronto, Canadá, e gosta de fotografia.
</Biografia>
```

## Importando Markdown

Você pode importar arquivos Markdown diretamente em seus arquivos Wromo! Você pode importar uma página específica com `import` ou várias com `Wromo.glob()`.

```wromo
---
// Importe markdown. import() dinâmico também é suportado!
import * as otimaPostagem from '../pages/postagens/otima-postagem.md';

// Você também pode importar múltiplos arquivos com Wromo.glob
const postagens = await Wromo.glob('../pages/postagens/*.md');
---

Ótima postagem: <a href={otimaPostagem.url}>{otimaPostagem.frontmatter.titulo}</a>

<ul>
  {postagens.map(postagem => <li>{postagem.frontmatter.titulo}</li>)}
</ul>
```

Opcionalmente, você pode fornecer um tipo para a variável `frontmatter` usando um genérico TypeScript:

```wromo
---
interface Frontmatter {
  titulo: string;
  descricao?: string;
}
const postagens = await Wromo.glob<Frontmatter>('../pages/postagens/*.md');
---

<ul>
  {postagens.map(postagem => <li>{postagem.titulo}</li>)}
  <!-- postagem.titulo vai ser uma `string`! -->
</ul>
```

### Propriedades Exportadas

Cada arquivo Markdown exporta as seguintes propriedades:

#### `frontmatter`

Quaisquer dados especificados no frontmatter YAML deste arquivo.

#### `file`

O caminho absoluto deste arquivo (e.g. `/home/user/projects/.../arquivo.md`).

#### `url`

Se é uma página, a URL da página (e.g. `/pt-br/guides/markdown-content`).

#### `getHeaders()`

Uma função assíncrona que retorna os cabeçalhos do arquivo Markdown. A resposta é desse tipo: `{ depth: number; slug: string; text: string }[]`.

#### `rawContent()`

Uma função que retorna o conteúdo bruto do arquivo Markdown (excluindo o bloco de frontmatter) como uma string. Isso é útil quando, digamos, formos calcular o tempo médio de leitura. Este exemplo utiliza o [popular pacote reading-time](https://www.npmjs.com/package/reading-time):

```wromo
---
import readingTime from 'reading-time';
const postagens = await Wromo.glob('./postagens/**/*.md');
---
{postagens.map((postagem) => (
  <Fragment>
    <h2>{postagem.frontmatter.titulo}</h2>
    <p>{readingTime(postagem.rawContent()).text}</p>
  </Fragment>
))}
```

#### `compiledContent()`

Uma função assíncrona que retorna o conteúdo bruto após parse, sendo sintaxe válida do Wromo. Nota: **Isso não faz parse de `{expressões jsx}`, `<Componentes />` ou layouts**! Apenas blocos de Markdown padrão como `## cabeçalhos` e `- listas` passarão por parse para HTML. Isso é útil quando, digamos, formos renderizar um bloco de sumário para uma postagem de blog. Como a sintaxe do Wromo é HTML válido, podemos utilizar bibliotecas populares como [node-html-parser](https://www.npmjs.com/package/node-html-parser) para fazer query do primeiro parágrafo assim:

```wromo
---
import { parse } from 'node-html-parser';
const postagens = await Wromo.glob('./postagens/**/*.md');
---
{postagens.map(async (postagem) => {
  const primeiroParagrafo = parse(await postagem.compiledContent())
    .querySelector('p:first-of-type');
  return (
    <Fragment>
      <h2>{postagem.frontmatter.titulo}</h2>
      {primeiroParagrafo ? <p>{primeiroParagrafo.innerText}</p> : null}
    </Fragment>
  );
})}
```

#### `Content`

Um componente que renderiza o conteúdo do arquivo Markdown. Eis um exemplo:

```wromo
---
import {Content as BannerPromocional} from '../components/bannerPromocional.md';
---

<h2>Promoção de hoje</h2>
<BannerPromocional />
```

## Componente Markdown

:::caution[Descontinuado]
O componente `<Markdown />` não funciona em SSR e será movido para seu próprio pacote antes da v1.0. Se possível, deve ser evitado. Considere [importar conteúdo Markdown](/pt-br/guides/markdown-content/#importando-markdown) no lugar.
:::

Você pode importar o [componente Markdown nativo do Wromo](/pt-br/reference/api-reference/#markdown-) em seu script de componente e, em seguida, escrever qualquer Markdown que quiser entre as tags `<Markdown></Markdown>`.

````wromo
---
import { Markdown } from 'wromo/components';
import Layout from '../layouts/Layout.wromo';

const expressões = 'Lorem ipsum';
---
<Layout>
  <Markdown>
    # Olá, mundo!

    **Tudo** suportado em um arquivo `.md` também é suportado aqui!

    Com _zero_ sobrecarga em runtime.

    Além disso, o Wromo suporta:
    - {expressões} Wromo
    - Normalização automática de indentação
    - Escapamento automático de expressões dentro de blocos de código

    ```js
      // Este conteúdo não é transformado!
      const objeto = { algumOutroValor };
    ```

    - Suporte a componentes ricos, como em qualquer arquivo `.wromo`!
    - Suporte a Markdown recursivo (os filhos do Componente também são processados como Markdown)
  </Markdown>
</Layout>
````

### Markdown Remoto

:::caution[Descontinuado]
O componente `<Markdown />` não funciona em SSR e será movido para seu próprio pacote antes da v1.0. Se possível, deve ser evitado. Considere [importar conteúdo Markdown](/pt-br/guides/markdown-content/#importando-markdown) no lugar.
:::

Se você tem Markdown em uma fonte remota, você pode passá-lo diretamente para o componente Markdown através do atributo `content`.

```wromo
---
import { Markdown } from 'wromo/components';

const conteudo = await fetch('https://raw.githubusercontent.com/Wromo/docs/main/README.md').then(res => res.text());
---
<Layout>
  <Markdown content={conteudo} />
</Layout>
```

### Markdown Aninhado

:::caution[Descontinuado]
O componente `<Markdown />` não funciona em SSR e será movido para seu próprio pacote antes da v1.0. Se possível, deve ser evitado. Considere [importar conteúdo Markdown](/pt-br/guides/markdown-content/#importando-markdown) no lugar.
:::

Componentes `<Markdown />` podem ser aninhados.

```wromo
---
import { Markdown } from 'wromo/components';

const conteudo = await fetch('https://raw.githubusercontent.com/Wromo/docs/main/README.md').then(res => res.text());
---

<Layout>
  <Markdown>
    ## Exemplo de Markdown

    Aqui temos algum código __Markdown__. Também podemos renderizar conteúdo remoto dinamicamente.

    <Markdown content={conteudo} />
  </Markdown>
</Layout>
```

:::caution
O uso do componente `Markdown` para renderizar Markdown remoto pode abrir brecha para um ataque de [cross-site scripting (XSS)](https://en.wikipedia.org/wiki/Cross-site_scripting). Se você estiver renderizando conteúdo inconfiável, certifique-se de _sanitizar seu conteúdo **antes** de renderizá-lo_.
:::

## Configurando Markdown

Você pode personalizar o parsing de Markdown modificando seu `wromo.config.mjs`. [Aqui você pode ler a referência completa](/pt-br/reference/configuration-reference/#opções-de-markdown).

### Plugins Markdown

Wromo dá suporte aos plugins terceirizados para Markdown [remark](https://github.com/remarkjs/remark) e [rehype](https://github.com/rehypejs/rehype). Você pode especificar seus plugins em `wromo.config.mjs`.

:::note
Habilitar `remarkPlugins` ou `rehypePlugins` personalizados removerá esses plugins integrados e você precisará adicioná-los explicitamente, se desejar.

Por padrão, o Wromo vem com [Markdown tipo GitHub](https://github.com/remarkjs/remark-gfm) e [remark-smartypants](https://github.com/silvenon/remark-smartypants) pré-habilitados. 
:::

#### Como adicionar um plugin Markdown no Wromo

1. Instale a dependência do pacote npm em seu projeto.

2. Atualize `remarkPlugins` ou `rehypePlugins` dentro das opções `markdown`:

   ```js
   // wromo.config.mjs
   export default {
     markdown: {
       remarkPlugins: [
          // Adicione um plugin Remark que você deseja habilitar para seu projeto.
          // Se você precisar fornecer opções para o plugin, você pode usar um array e colocar as opções como o segundo item.
          // ['remark-autolink-headings', { behavior: 'prepend'}],
       ],
       rehypePlugins: [
          // Adicione um plugin Rehype que você deseja habilitar para seu projeto.
          // Se você precisar fornecer opções para o plugin, você pode usar um array e colocar as opções como o segundo item.
          // 'rehype-slug',
          // ['rehype-autolink-headings', { behavior: 'prepend'}],
       ],
     },
   };
   ```

    Você pode informar os nomes dos plugins, bem como importá-los:    

   ```js
   // wromo.config.mjs
   import autolinkHeadings from 'remark-autolink-headings';

   export default {
     markdown: {
       remarkPlugins: [[autolinkHeadings, { behavior: 'prepend' }]],
     },
   };
   ```

### Syntax Highlighting

Wromo vem com suporte nativo para [Shiki](https://shiki.matsu.io/) e [Prism](https://prismjs.com/). Isso fornece syntax highlighting imediato para:

- todas as code fences (\`\`\`) usadas em um arquivo markdown (`.md`) e o [componente `<Markdown />` nativo](#componente-markdown).
- conteúdo dentro do [componente `<Code />` nativo](/pt-br/reference/api-reference/#code-) (oferecido por Shiki) ou o [componente `<Prism />`](/pt-br/reference/api-reference/#prism-) (oferecido por Prism).

Shiki é ativado por padrão, pré-configurado com o tema `github-Dark`. A saída compilada será limitada a `style`s inline sem classes CSS de fora, folhas de estilo ou JS no lado do cliente.

Se você optar por usar Prism, aplicaremos as classes CSS do Prism. Observe que **você precisa colocar sua própria folha de estilo CSS** para o syntax highlighting funcionar! Veja a [seção de configuração do Prism](#configuração-do-prism) para mais detalhes.

#### Escolha um syntax highlighter

Shiki é o nosso syntax highlighter padrão. Se você quiser mudar para `'prism'` ou desativar completamente syntax highlighting, você pode usar o objeto de configuração `markdown`:

```js
// wromo.config.mjs
export default {
  markdown: {
    // Pode ser 'shiki' (padrão), 'prism' ou false para desabilitar o highlighting
    syntaxHighlight: 'prism',
  },
};
```

#### Configuração do Shiki

Ao usar o Shiki, você pode configurar todas as opções por meio do objeto `shikiConfig`, tal como:

```js
// wromo.config.mjs
export default {
  markdown: {
    shikiConfig: {
      // Escolha os temas internos do Shiki (ou adicione o seu)
      // https://github.com/shikijs/shiki/blob/main/docs/themes.md
      theme: 'dracula',
      // Adicione idiomas personalizados
      // Nota: Shiki tem inúmeras linguagens nativas, incluindo .wromo!
      // https://github.com/shikijs/shiki/blob/main/docs/languages.md
      langs: [],
      // Habilite quebra de linha para evitar rolagem horizontal
      wrap: true,
    },
  },
};
```

Também sugerimos [inspecionar a documentação de tema deles](https://github.com/shikijs/shiki/blob/main/docs/themes.md#loading-theme) para explorar o carregamento de tema personalizado, modo claro vs modo escuro ou estilizar via variáveis CSS.

#### Configuração do Prism

Ao usar o Prism, você precisará adicionar uma folha de estilo ao seu projeto para syntax highlighting. Se você acabou de começar e prefere usar Prism em vez de Shiki, sugerimos:

1. [Colocar `syntaxHighlight: 'prism'`](#escolha-um-syntax-highlighter) na sua configuração `@wromojs/markdown-remark`.
2. Escolher uma folha de estilo predefinida entre os [Temas Prism](https://github.com/PrismJS/prism-themes) disponíveis.
3. Adicionar essa folha de estilo no [diretório `public/` do seu projeto](/pt-br/core-concepts/project-structure/#public).
4. Carregá-la [no `<head>` de sua página](/pt-br/core-concepts/wromo-pages/#html-da-página) através de uma tag `<link>`.

Você também pode visitar a [lista de idiomas suportados pelo Prism](https://prismjs.com/#supported-languages) para ver opções e uso.
