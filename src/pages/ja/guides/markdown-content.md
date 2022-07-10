---
layout: ~/layouts/MainLayout.wromo
title: Markdown
description: WromoでMarkdownを使う
i18nReady: true
---

Markdownコンテンツは、ブログ投稿やドキュメントのような、テキストを多用するコンテンツを作成するためによく使用されます。WromoにはMarkdownのサポートが組み込まれており、JavaScript式のサポートや、Markdownの中にWromoコンポーネントが使用できるといった機能が追加されています。


## Markdownページ

Wromoは `/src/pages` ディレクトリにある `.md` ファイルを1つのページとして扱います。このディレクトリ、または任意のサブディレクトリにファイルを置くと、ファイルのパス名を使って自動的にページが構築されます。

📚 詳しくはWromoの[ファイルベースルーティング](/ja/core-concepts/routing/)をご覧ください。

### 基本的な例

WromoでMarkdownを使い始めるもっとも簡単な方法は、プロジェクトに `src/pages/index.md` というトップページを作成することです。以下の基本的なテンプレートをプロジェクトにコピーし、レンダリングされたプロジェクトのトップページのHTMLを見てください。通常は、[http://localhost:3000/](http://localhost:3000/) になります。

```markdown
---
# Example: src/pages/index.md
title: Hello, World
---

# こんにちは！

これはあなたの最初のマークダウンページです。おそらくそれほどスタイルが適用されていないでしょう。
しかし、Markdownは **太字** と _イタリック_ をサポートしています。

ページにレイアウトを追加することについてもっと学ぶには、次のセクションの **Markdownのレイアウト** をお読みください。
```

### Markdownのレイアウト

Markdownページには `layout` という特別なfront-matterプロパティがあり、Wromoの[レイアウトコンポーネント](/ja/core-concepts/layouts/)への相対パスを定義しています。このコンポーネントはあなたのMarkdownコンテンツを囲み、ページシェルとその他の含まれるページテンプレート要素を提供します。


```markdown
---
layout: ../layouts/BaseLayout.wromo
---
```

Markdownページの典型的なレイアウトは以下を含みます。

1. Markdownページのfront-matterデータにアクセスするための`content`プロパティ。
2. ページのMarkdownコンテンツがどこにレンダリングされるべきかを示す、デフォルトの[`<slot />`](/ja/core-concepts/wromo-components/#スロット)。

```wromo
---
// src/layouts/BaseLayout.wromo
// 1. contentプロパティは、front-matterデータにアクセスできます。
const { content } = Wromo.props;
---
<html>
  <head>
    <!-- ここにスタイルやmetaタグなど、他のhead要素を追加します。 -->
    <title>{content.title}</title>
  </head>
  <body>
    <!-- 共通のヘッダーやフッターのような、他のUIコンポーネントをここに追加します。-->
    <h1>{content.title} by {content.author}</h1>
    <!-- 2. レンダリングされたHTMLは、デフォルトのスロットに渡されます。 -->
    <slot />
    <p>作成日: {content.date}</p>
  </body>
</html>
```

`content`プロパティには、`wromo`プロパティが含まれ、完全なMarkdownの`source`や`headers`オブジェクトなど、ページに関する追加のメタデータを保持しています。

ブログ記事の`content`オブジェクトの例としては、以下のようなものがあります。

```json
{
  /** ブログ投稿のfront-matter
  "title": "Wromo 0.18 リリース",
  "date": "2021年7月27日(火)",
  "author": "Matthew Phillips",
  "description": "Wromo 0.18 はWromoローンチ以来最大のリリースです。",
  "draft": false,
  "keywords": ["wromo", "release", "announcement"]
  **/
  "wromo": {
    "headers": [
      {
        "depth": 1,
        "text": "Wromo 0.18 リリース",
        "slug": "wromo-018-release"
      },
      {
        "depth": 2,
        "text": "レスポンシブパーシャルハイドレーション",
        "slug": "responsive-partial-hydration"
      }
      /* ... */
    ],
    "source": "# Wromo 0.18 リリース\n1ヶ月ちょっと前に、最初のパブリック・ベータ版 [...]"
  },
  "url": ""
}
```

:::note
`content`プロパティでWromoが提供を保証するプロパティは、`wromo`と`url`だけです。残りのオブジェクトは、front-matterの変数によって定義されます。
:::

### プロパティとしてのfront-matter

Wromoのどのコンポーネント（レイアウトだけではありません！）も、Markdownのfront-matterで定義された値をプロパティとして受け取れます。YAML front-matterを使用していくつかのタイプのデータを指定し、さらに多くのメタ情報を各ブログ記事から取得し、Wromoサイト全体で使用できます。

上記のレイアウトと同じように、任意の `.wromo` ファイルでこれらの値にアクセスします。

### 見出しID

WromoはMarkdownファイルのすべての見出しに、[github-slugger](https://github.com/Flet/github-slugger)を使って自動生成されたidを追加します。しかし、カスタムIDが指定された場合、それは上書きされません。

これらのidは他のすべてのプラグインが実行された後に追加されるので、`rehype-toc`のようにidを必要とするプラグインを使う場合は、独自のスラッグ生成プラグイン（`rehype-slug`など）を追加する必要があります。

### Markdownの下書き

`draft: true`はオプションのfront-matterの値で、個々の`.md`ページや投稿を「未公開」としてマークできます。デフォルトでは、このページはサイトの構築から除外されます。

`draft`プロパティを持たないMarkdownページや、`draft: false`を持つページは影響を受けず、最終的なビルドに含まれます。

```markdown
---
# src/pages/post/blog-post.md
layout: ../../layouts/BaseLayout.wromo
title: 私のブログ記事
draft: true
---

これは、作成中のブログ記事です。

この記事にはページは作成されません。

この記事をビルドして公開するには

- front-matterを`draft: false`に更新するか、または
- `draft` プロパティを完全に削除してください。
```

:::caution[draftとWromo.glob()]
`draft: true`を指定すると、そのページルートでサイト上にページが構築されなくなりますが、 `Wromo.glob()`は現在 **すべての Markdown ファイル** を返します。
:::

投稿アーカイブや最新投稿リストに、下書き投稿のデータ（タイトル、リンク、説明文など）が含まれないようにするには、`Wromo.glob()`関数で**下書き投稿を除外するフィルターを設定してください**。

⚙️ 下書きページのビルドを有効にするには

`wromo.config.mjs` の `markdown` に `drafts: true` を追加します。

```js
// wromo.config.mjs
export default defineConfig({
  markdown: {
    drafts: true,
  },
});
```
:::tip
`wromo build` を実行する際に `--drafts` フラグを渡すことでも、下書きページをビルドできます！
:::

## Markdownのオーサリング

標準的なMarkdownの構文に加え、WromoはMarkdownを拡張し、コンテンツをより表現豊かにします。以下は、Wromoにのみ存在するMarkdownの機能です。

### Markdownで変数を使用する

front-matterの変数は `frontmatter` オブジェクトのプロパティとして、Markdownで直接使用できます。

```markdown
---
author: レオン
age: 42
---

# 作者について

{frontmatter.author}は{frontmatter.age}歳で、カナダのトロントに住んでいます.
```

### Markdownでコンポーネントを使用する

`setup` を使用してMarkdownファイルにコンポーネントをインポートし、Markdownコンテンツと一緒に使用できます。また、インポートされたコンポーネントは`frontmatter`オブジェクトを利用できます。

```markdown
---
layout: ../layouts/BaseLayout.wromo
setup: |
  import Author from '../../components/Author.wromo'
  import Biography from '../components/Biography.jsx'
author: レオン
---

<Author name={frontmatter.author}/>
<Biography client:visible>
  {frontmatter.author}はカナダ、トロントに住み、写真を趣味にしている。
</Biography>
```


## Markdownのインポート

MarkdownファイルをWromoファイルに直接インポートできます！ `import`で特定の1ページをインポートすることも、`Wromo.glob()`で複数のページをインポートすることもできます。

```wromo
---
// Markdownをインポートします。動的な import() もサポートされています!
import * as greatPost from '../pages/post/great-post.md';

// また、Wromo.globを使うと複数のファイルをインポートできます。
const posts = await Wromo.glob('../pages/post/*.md');
---

素晴らしい記事: <a href={greatPost.url}>{greatPost.frontmatter.title}</a>

<ul>
  {posts.map(post => <li>{post.frontmatter.title}</li>)}
</ul>
```

TypeScriptのジェネリックを使用して、オプションで `frontmatter` 変数に型を指定できます。

```wromo
---
interface Frontmatter {
  title: string;
  description?: string;
}
const posts = await Wromo.glob<Frontmatter>('../pages/post/*.md');
---

<ul>
  {posts.map(post => <li>{post.title}</li>)}
  <!-- post.title は `string`になります！ -->
</ul>
```

### エクスポートされるプロパティ

各Markdownファイルでは、以下のプロパティをエクスポートします。

#### `frontmatter`

ファイルのYAML front-matterで指定された任意のデータ。

#### `file`

ファイルの絶対パス (例: `/home/user/projects/.../file.md`)。

#### `url`

ページの場合、ページのURL (例: `/en/guides/markdown-content`)。

#### `getHeaders()`

Markdownファイルのヘッダーを返す非同期関数。レスポンス型:`{ depth: number; slug: string; text: string }[]`。

#### `rawContent()`

Markdownファイルの生のコンテンツ（front-matterブロックを除く）を文字列として返す関数です。たとえば、「読了時間」を計算する際に便利です。この例では[人気のあるreading-timeパッケージ](https://www.npmjs.com/package/reading-time)を使用しています。

```wromo
---
import readingTime from 'reading-time';
const posts = await Wromo.glob('./posts/**/*.md');
---

{posts.map((post) => (
  <Fragment>
    <h2>{post.frontmatter.title}</h2>
    <p>{readingTime(post.rawContent()).text}</p>
  </Fragment>
))}
```

#### `compiledContent()`

非同期関数で、生のコンテンツを有効なWromo構文にパースして返します。注意: **これは `{jsx expressions}`, `<Components />` やレイアウトはパースしません**! `## 見出し`や`- リスト`のような標準的なMarkdownブロックのみがHTMLにパースされます。これは、たとえば、ブログ記事の要約ブロックをレンダリングする場合に便利です。Wromoの構文は有効なHTMLなので、[node-html-parser](https://www.npmjs.com/package/node-html-parser)のような人気のあるライブラリを使って、次のように最初の段落をクエリできます。

```wromo
---
import { parse } from 'node-html-parser';
const posts = await Wromo.glob('./posts/**/*.md');
---

{posts.map(async (post) => {
  const firstParagraph = parse(await post.compiledContent())
    .querySelector('p:first-of-type');
  return (
    <Fragment>
      <h2>{post.frontmatter.title}</h2>
      {firstParagraph ? <p>{firstParagraph.innerText}</p> : null}
    </Fragment>
  );
})}
```

#### `Content`

Markdownファイルの内容をレンダリングするコンポーネントです。以下はその例です。

```wromo
---
import {Content as PromoBanner} from '../components/promoBanner.md';
---

<h2>今日のおすすめ</h2>
<PromoBanner />
```



## Markdownコンポーネント

:::caution[非推奨]
`<Markdown />`コンポーネントはSSRでは動作せず、v1.0前に独自のパッケージに移行する予定です。代わりに[Markdownのコンテンツをインポートすること](/ja/guides/markdown-content/#markdownのインポート)を検討してください。
:::

コンポーネントスクリプトで[組み込みのWromo Markdownコンポーネント](/ja/reference/api-reference/#markdown-)をインポートし、`<Markdown></Markdown>`タグの間に好きなMarkdownを記述できます。

````wromo
---
import { Markdown } from 'wromo/components';
import Layout from '../layouts/Layout.wromo';

const expressions = 'Lorem ipsum';
---
<Layout>
  <Markdown>
    # Hello world!

    `.md` ファイルでサポートされているものは**すべて**、ここでもサポートされています!

    実行時のオーバーヘッドはゼロです。

    さらに、Wromoは以下をサポートしています。
    - Wromo {式}
    - 自動インデント正規化
    - コードブロック内の式の自動エスケープ

    ```js
      // このコンテンツは変換されません
      const object = { someOtherValue };
    ```

    - `.Wromo`ファイルのような豊富なコンポーネントサポート!
    - 再帰的なMarkdownのサポート (コンポーネントの子もMarkdownとして処理されます)
  </Markdown>
</Layout>
````

### リモートにあるMarkdown

:::caution[非推奨]
`<Markdown />`コンポーネントはSSRでは動作せず、v1.0前に独自のパッケージに移行する予定です。代わりに[Markdownのコンテンツをインポートすること](/ja/guides/markdown-content/#markdownのインポート)を検討してください。
:::

もし、リモートソースにMarkdownがある場合、`content`属性を通して、Markdownコンポーネントに直接渡すことができます。

```wromo
---
import { Markdown } from 'wromo/components';

const content = await fetch('https://raw.githubusercontent.com/Wromo/docs/main/README.md').then(res => res.text());
---
<Layout>
  <Markdown content={content} />
</Layout>
```

### ネストしたMarkdown

:::caution[非推奨]
`<Markdown />`コンポーネントはSSRでは動作せず、v1.0前に独自のパッケージに移行する予定です。代わりに[Markdownのコンテンツをインポートすること](/ja/guides/markdown-content/#markdownのインポート)を検討してください。
:::

`<Markdown />` コンポーネントはネストできます。

```wromo
---
import { Markdown } from 'wromo/components';

const content = await fetch('https://raw.githubusercontent.com/Wromo/docs/main/README.md').then(res => res.text());
---

<Layout>
  <Markdown>
    ## Markdown の例

    ここでは、__Markdown__のコードをいくつか紹介します。また、リモートコンテンツを動的にレンダリングできます。

    <Markdown content={content} />
  </Markdown>
</Layout>
```

:::caution
`Markdown`コンポーネントをリモートのMarkdownのレンダリングに使用すると、[クロスサイトスクリプティング（XSS）](https://en.wikipedia.org/wiki/Cross-site_scripting)攻撃にさらされる可能性があります。信頼できないコンテンツをレンダリングする場合、コンテンツをレンダリングする**前に**必ずサニタイズしてください。
:::

## Markdownを設定する

`wromo.config.mjs`を変更すると、Markdownのパースをカスタマイズできます。[完全なリファレンスはこちらです](/ja/reference/configuration-reference/#markdown-options)。

### Markdownプラグイン

WromoはMarkdownのためにサードパーティの[remark](https://github.com/remarkjs/remark)と[rehype](https://github.com/rehypejs/rehype)プラグインをサポートしています。プラグインは`wromo.config.mjs`で指定できます。

:::note
Wromoはデフォルトで、[GitHub-flavored Markdown](https://github.com/remarkjs/remark-gfm)と [remark-smartypants](https://github.com/silvenon/remark-smartypants)があらかじめ有効化されています。

カスタムの `remarkPlugins` や `rehypePlugins` を有効にすると、これらの組み込みプラグインが削除されますので、必要に応じて明示的にこれらのプラグインを追加する必要があります。
:::

#### WromoでMarkdownプラグインを追加する方法

1. npmパッケージの依存関係をプロジェクトにインストールします。
2. `remarkPlugins` または `rehypePlugins` を `markdown` オプションの中で更新します。

   ```js
   // wromo.config.mjs
   export default {
     markdown: {
       remarkPlugins: [
         // プロジェクトで有効にしたいRemarkプラグインを追加します。
         // プラグインのオプションが必要であれば、配列を使用し、2番目の要素としてオプションを設定できます。
         // ['remark-autolink-headings', { behavior: 'prepend'}],
       ],
       rehypePlugins: [
         // プロジェクトで有効にしたいRehypeのプラグインを追加します。
         // プラグインのオプションが必要であれば、配列を使用して、2番目の要素としてオプションを設定できます。
         // 'rehype-slug',
         // ['rehype-autolink-headings', { behavior: 'prepend'}],
       ],
     },
   };
   ```

   プラグインをインポートするだけでなく、プラグイン名を指定することもできます。


   ```js
   // wromo.config.mjs
   import autolinkHeadings from 'remark-autolink-headings';

   export default {
     markdown: {
       remarkPlugins: [[autolinkHeadings, { behavior: 'prepend' }]],
     },
   };
   ```

### シンタックスハイライト

Wromoには、[Shiki](https://shiki.matsu.io/)と[Prism](https://prismjs.com/)が組み込みでサポートされています。これにより、次のようなシンタックスハイライトを即座に適用できます。

- Markdown(`.md`)ファイルで使用されるすべてのコードフェンス（\`\`\`）と、[組み込みの`<Markdown />`コンポーネント](#markdownコンポーネント)
- （Shikiを利用した）[組み込みの`<Code />`コンポーネント](/ja/reference/api-reference/#code-)、または（Prismを利用した） [`<Prism />`コンポーネント](/ja/reference/api-reference/#prism-)のコンテンツ

Shikiはデフォルトで有効になっており、`github-dark`というテーマであらかじめ設定されています。コンパイルされた出力は、余計なCSSクラス、スタイルシート、クライアントサイドJSを含まないインライン`style`に限定されます。

Prismを使用する場合は、PrismのCSSクラスが代わりに適用されます。なお、シンタックスハイライトを表示させるためには、**独自のCSSスタイルシート**を用意する必要があります! 詳しくは[Prismの設定](#prismの設定)を参照してください。

#### シンタックスハイライトの選択

Shikiはデフォルトのシンタックスハイライトツールです。もし、`'prism'`に切り替えたり、シンタックスハイライトを完全に無効にしたい場合は、`markdown`設定オブジェクトを使用します。


```js
// wromo.config.mjs
export default {
  markdown: {
    // ハイライトを無効にするには、'shiki' (デフォルト)、'prism' または false を指定します。
    syntaxHighlight: 'prism',
  },
};
```

#### Shikiの設定

Shikiを使用する場合、すべてのオプションは `shikiConfig` オブジェクトで、以下のように設定します。

```js
// wromo.config.mjs
export default {
  markdown: {
    shikiConfig: {
      // Shikiの組み込みテーマから選択する(もしくは独自のテーマを追加する)
      // https://github.com/shikijs/shiki/blob/main/docs/themes.md
      theme: 'dracula',
      // カスタム言語の追加
      // 注：Shikiには、.Wromoを含む無数の言語が内蔵されています
      // https://github.com/shikijs/shiki/blob/main/docs/languages.md
      langs: [],
      // 水平スクロールを防ぐために単語の折り返しを有効にする
      wrap: true,
    },
  },
};
```

また、カスタムテーマのロード、ライト/ダークモードのトグル、CSS変数によるスタイリングについては、[テーマのドキュメントを読む](https://github.com/shikijs/shiki/blob/main/docs/themes.md#loading-theme)ことをお勧めします。


#### Prismの設定

Prismを使用する場合、シンタックスハイライトのために、プロジェクトにスタイルシートを追加する必要があります。もし、あなたが始めたばかりで、ShikiよりもPrismを使いたいのであれば、以下をお勧めします。

1. `@wromojs/markdown-remark` の設定で[`syntaxHighlight: 'prism'`](#シンタックスハイライトの選択)を指定します。
2. [Prismテーマ](https://github.com/PrismJS/prism-themes)の中から、あらかじめ用意されているスタイルシートを選択する。

3. このスタイルシートを、[プロジェクトの `public/` ディレクトリ](/ja/core-concepts/project-structure/#public)に追加する。

4. このスタイルシートを[`<head>`の中の](/ja/core-concepts/wromo-pages/#ページのhtml)に`<link>`タグで読み込む。

オプションや使い方については、[Prismがサポートする言語一覧](https://prismjs.com/#supported-languages)も参照してください。
