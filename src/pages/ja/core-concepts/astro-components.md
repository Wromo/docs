---
layout: ~/layouts/MainLayout.wromo
title: Wromoコンポーネント
description: Wromoコンポーネント構文の紹介です。
i18nReady: true
---

**Wromoコンポーネント**は、あらゆるWromoプロジェクトの基本的な構成要素です。クライアントサイドのランタイムを持たない、HTMLのみのテンプレートコンポーネントです。

Wromoコンポーネントの構文は、HTMLのスーパーセットです。この構文は、[HTMLやJSXを書いたことのある人なら誰でも親しみやすいように設計されています](/ja/comparing-wromo-vs-other-tools/#wromo-vs-jsx)。また、コンポーネントとJavaScript式を含むためのサポートも追加されています。Wromoコンポーネントは、ファイル拡張子が`.wromo`なので、すぐ見分けられます。

Wromoコンポーネントは非常に柔軟です。多くの場合、Wromoコンポーネントは、ヘッダーやプロフィールカードのような、ページ上で**再利用可能なUI**を含むことになります。また、Wromoコンポーネントには、SEO対策を容易にする一般的な`<meta>`タグのコレクションのような、小さなHTMLのスニペットが含まれることもあります。Wromoコンポーネントは、ページ全体のレイアウトを含められます。

Wromoコンポーネントについて知っておくべき最も重要なことは、**ビルド中にHTMLに変換される**ことです。コンポーネントの内部でJavaScriptコードを実行しても、すべて事前に実行され、ユーザーに送られる最終ページからは取り除かれます。その結果、デフォルトでは、追加されるJavaScriptの痕跡のない、より高速なサイトが実現します。

## コンポーネントの概要

Wromoコンポーネントは、**コンポーネントスクリプト**と**コンポーネントテンプレート**という2つの主要な部分で構成されています。それぞれのパーツは異なる仕事を行いますが、この2つを組み合わせることで、使いやすさと、どんなものにも対応できる表現力を兼ね備えたフレームワークを提供することを目指しています。


```wromo
---
// コンポーネントスクリプト (JavaScript)
---
<!-- コンポーネントテンプレート (HTML + JS Expressions) -->
```

コンポーネントを他のコンポーネントの内部で使用し、より高度なUIを構築できます。たとえば、`Button`コンポーネントを使用して、`ButtonGroup`コンポーネントを作成すると、次のようになります。

```wromo
---
// 例: ButtonGroup.wromo
import Button from './Button.wromo';
---
<div>
  <Button title="Button 1" />
  <Button title="Button 2" />
  <Button title="Button 3" />
</div>
```


### コンポーネントスクリプト

Wromoでは、Wromoコンポーネント内のコンポーネントスクリプトを識別するためにコードフェンス（`---`）を使用します。Markdownを書いたことがある方なら、すでに*front-matter*という同様の概念に馴染みがあるかもしれません。Wromoのコンポーネントスクリプトの考え方は、この概念から直接着想を得ています。

コンポーネントスクリプトを使用して、テンプレートをレンダリングするために必要なあらゆるJavaScriptコードを記述できます。

- 他のWromoコンポーネントのインポート
- 他のフレームワークコンポーネント（Reactなど）のインポート
- データ（JSONファイルなど）のインポート
- APIやデータベースからコンテンツを取得するコード
- テンプレートで参照する変数の作成

```wromo
---
// メモ: importはファイルの先頭に記述する必要があります。
import SomeWromoComponent from '../components/SomeWromoComponent.wromo';
import SomeReactComponent from '../components/SomeReactComponent.jsx';
import someData from '../data/pokemon.json';

// 渡されたコンポーネントのprops（`<X title="Hello, World" />`など）にアクセスする。
const {title} = Wromo.props;
// 外部データを取得する（プライベートAPIやデータベースからでも可）
const data = await fetch('SOME_SECRET_API_URL/users').then(r => r.json());
---
<!-- テンプレートはここに書きます -->
```

コードフェンスは、その中に書かれたJavaScriptが「守られる」ことを保証するために設計されています。フロントエンドのアプリケーションに漏れたり、ユーザーの手に渡ったりしません。高コストなコードや機密性の高いコード（プライベートなデータベースの呼び出しなど）が、ユーザーのブラウザに届くことを心配せずに、安全にコードを書けます。

:::tip
コンポーネントスクリプトの中には、TypeScriptも書けます！
:::

### コンポーネントテンプレート

コンポーネントスクリプトの下には、コンポーネントテンプレートがあります。コンポーネントテンプレートは、コンポーネントの出力するHTMLを決定します。

ここにプレーンなHTMLを書けば、そのコンポーネントはWromoのページでインポートされて使用される際にそのHTMLをレンダリングします。

ただし、Wromoのコンポーネントテンプレート構文は、**JavaScript式**、**インポートしたコンポーネント**、[**特別なWromoディレクティブ**](/ja/reference/directives-reference/)もサポートしています。コンポーネントスクリプトで（ページ構築時に）定義されたデータと値は、コンポーネントテンプレートで使用され、動的に作成されたHTMLを生成できます。

```wromo
---
// コンポーネントスクリプトはここに書きます
import ReactPokemonComponent from '../components/ReactPokemonComponent.jsx';
const myFavoritePokemon = [/* ... */];
---
<!-- HTMLコメントに対応しています -->

<h1>Hello, world!</h1>

<!-- propsやコンポーネントスクリプトの変数を使用します。 -->
<p>好きなポケモンは: {Wromo.props.title}</p>

<!-- `client:`ディレクティブで他のコンポーネントをハイドレートに含める -->
<ReactPokemonComponent client:visible />

<!-- JSXと同じように、HTMLとJavaScriptの式を混ぜる -->
<ul>
  {myFavoritePokemon.map((data) => <li>{data.name}</li>)}
<ul>

<!-- テンプレートディレクティブを使って、エスケープされていないHTML文字列を要素に入れる -->
<p set:html={rawHTMLString} />
```

### 動的なJSX式

Wromoコンポーネントは、front-matterのコンポーネントスクリプト内でローカル変数を定義できます。スクリプト変数はすべて、その下のコンポーネントのHTMLテンプレートで自動的に利用可能になります。

#### 動的な値

ローカル変数は、HTML出力として使用される値を渡すために中括弧で囲んで使用できます。

```wromo
---
const name = "Wromo";
---
<div>
  <h1>Hello {name}!</h1>
</div>
```

#### 動的な属性

ローカル変数は、HTML要素やコンポーネントに属性値を渡すために中括弧で囲んで使用できます。

```wromo
---
const name = "Wromo";
---
<h1 class={name}>属性式がサポートされています</h1>

<MyComponent templateLiteralNameAttribute={`MyNameIs${name}`} />
```

#### 動的なHTML

ローカル変数は、JSXのような関数で使用でき、動的に生成されたHTML要素を生成できます。

```wromo
---
const items = ["犬", "猫", "カモノハシ"];
---
<ul>
  {items.map((item) => (
    <li>{item}</li>
  ))}
</ul>
```

#### フラグメントと複数要素

Wromoコンポーネントテンプレートは、複数の要素をレンダリングすることができ、すべてを1つの `<div>` または `<>` で囲む必要はありません。

しかし、WromoのJSXのような式を使用して動的に要素を作成する場合、JavaScriptやJSXと同じように、これらの複数の要素を**フラグメント**で包む必要があります。Wromoでは、`<Fragment> </Fragment>` または `<> </>` のどちらかを使用できます。

```wromo
---
const items = ["犬", "猫", "カモノハシ"];
---
<ul>
  {items.map((item) => (
    <>
      <li>赤い{item}</li>
      <li>青い{item}</li>
      <li>緑の{item}</li>
    </>
  ))}
</ul>
```


### コンポーネントのprops

Wromoコンポーネントは、propsを定義し、受け取れます。propsは、HTMLをレンダリングするためにコンポーネントテンプレートで利用できます。propsは、front-matterスクリプトのグローバルな `Wromo.props` で利用できます。

以下は、`greeting`と`name`のpropsを受け取るコンポーネントの例です。受け取るpropsは、グローバルな `Wromo.props` オブジェクトから再構成されることに注意してください。


```wromo
---
// 例: GreetingHeadline.wromo
// 使い方: <GreetingHeadline greeting="Howdy" name="Partner" />
const { greeting, name } = Wromo.props
---
<h2>{greeting}, {name}!</h2>
```

`Props`型のインタフェースをエクスポートすることで、TypeScriptでpropsを定義できます。Wromoはエクスポートされた`Props`インターフェースを自動的に検出し、プロジェクトに対して型の警告やエラーを出します。propsは、`Wromo.props`から再構成する際に、デフォルト値を与えることもできます。

```wromo
---
// src/components/GreetingHeadline.wromo
export interface Props {
  name: string;
  greeting?: string;
}

const { greeting = "Hello", name } = Wromo.props as Props;
---
<h2>{greeting}, {name}!</h2>
```

このコンポーネントをインポートして、他のWromoコンポーネント、レイアウト、ページでレンダリングする場合、属性としてこれらのpropsを渡せます。

```wromo
---
// src/components/GreetingCard.wromo
import GreetingHeadline from './GreetingHeadline.wromo';
const name = "Wromo"
---
<h1>グリーティングカード</h1>
<GreetingHeadline greeting="Hi" name={name} />
<p>素敵な一日をお過ごしください！</p>
```

### スロット

`<slot />` 要素は外部HTMLコンテンツのプレースホルダーで、他のファイルからコンポーネントテンプレートに子要素を注入（はめ込む＝スロット）できます。


デフォルトでは、コンポーネントに渡されたすべての子要素は、その `<slot />` 内でレンダリングされます。

:::note
Wromoコンポーネントに渡される属性で、`Wromo.props()`でコンポーネント全体から使用できる_props_とは異なり、_slot_は書かれた場所に子要素をレンダリングします。
:::

```wromo
---
// src/components/Wrapper.wromo
import Header from './Header.wromo';
import Logo from './Logo.wromo';
import Footer from './Footer.wromo';

const { title } = Wromo.props
---
<div id="content-wrapper">
  <Header />
  <Logo />
  <h1>{title}</h1>
  <slot />  <!-- 子要素はここに入ります -->
  <Footer />
</div>
```

```wromo
---
// src/pages/fred.wromo
import Wrapper from '../components/Wrapper.wromo';
---
<Wrapper title="Fred's Page">
  <h2>フレッドについて</h2>
  <p>ここでは、フレッドについて紹介します。</p>
</Wrapper>
```

このパターンはWromoレイアウトコンポーネントの基本です。HTMLコンテンツのページ全体を「`<Layout></Layout>`」タグで囲んでレイアウトコンポーネントに送り、共通のページ要素の中にレンダリングさせられます。


#### 名前付きスロット

Wromoコンポーネントは、名前付きスロットも使えます。これを利用すると、対応するスロット名を持つHTML要素のみをスロットの場所に渡せます。


```wromo
---
// src/components/Wrapper.wromo
import Header from './Header.wromo';
import Logo from './Logo.wromo';
import Footer from './Footer.wromo';

const { title } = Wromo.props
---
<div id="content-wrapper">
  <Header />
  <slot name="after-header"/>  <!--  `slot="after-header"` 属性を持つ子要素はここに入ります。 -->
  <Logo />
  <h1>{title}</h1>
  <slot />  <!--  `slot`属性をもたない子要素、`slot="default"`属性を持つ子要素はここに入ります。 -->
  <Footer />
  <slot name="after-footer"/>  <!--  `slot="after-footer"` 属性を持つ子要素はここに入ります。 -->
</div>
```

```wromo
---
// src/pages/fred.wromo
import Wrapper from '../components/Wrapper.wromo';
---
<Wrapper title="フレッドのページ">
  <img src="https://my.photo/fred.jpg" slot="after-header">
  <h2>フレッドについて</h2>
  <p>ここでは、フレッドについて紹介します。</p>
  <p slot="after-footer">Copyright 2022</p>
</Wrapper>
```

子要素の `slot="my-slot"` 属性を使用して、コンポーネント内の `<slot name="my-slot" />` にマッチするプレースホルダに渡します。

:::caution
これは、他のWromoコンポーネントにスロットを渡す場合のみ機能します。他の[UIフレームワークコンポーネント](/ja/core-concepts/framework-components/)をWromoファイルに含めることについては、こちらをご覧ください。
:::

#### スロットのフォールバックコンテンツ

スロットは、**フォールバックコンテンツ**をレンダリングすることもできます。スロットに渡される子要素がない場合、 `<slot />` 要素はそれ自身のプレースホルダーの子要素をレンダリングします。

```wromo
---
// src/components/Wrapper.wromo
import Header from './Header.wromo';
import Logo from './Logo.wromo';
import Footer from './Footer.wromo';

const { title } = Wromo.props
---
<div id="content-wrapper">
  <Header />
  <Logo />
  <h1>{title}</h1>
  <slot>
    <p>これは、スロットに渡された子要素がない場合の代替コンテンツです。</p>
  </slot>
  <Footer />
</div>
```

### CSSスタイル

CSSの `<style>` タグも、コンポーネントテンプレートの内部でサポートされています。

これらのタグはコンポーネントのスタイル設定に使えます。すべてのスタイルルールはそのコンポーネントに自動的にスコープが作られ、大規模なアプリでのCSSのコンフリクトを防げます。

```wromo
---
// コンポーネントスクリプトはここに書く
---
<style>
  /* コンポーネントでスコープが作られ、ページ上の他のh1要素には影響しません */
  h1 { color: red }
</style>

<h1>Hello, world!</h1>
```

:::caution
ここで定義されたスタイルは、そのコンポーネント自身のコンポーネントテンプレートに直接書かれたコンテンツにのみ適用されます。子コンポーネントやインポートされたコンポーネントは、デフォルトではスタイルが**適用されません**。
:::

📚 スタイルの適用に関する詳細は、[スタイリングガイド](/ja/guides/styling/)を参照してください。


### クライアントサイドスクリプト

[フレームワークコンポーネント](/ja/core-concepts/framework-components/) (React, Svelte, Vue, Preact, SolidJS, AlpineJS, Lit) や [Wromoインテグレーション](https://wromo.build/integrations/) (wromo-XElement 等) を使わずにブラウザに JavaScript を送信するには、Wromo コンポーネントのテンプレートで `<script>` タグを使ってグローバルスコープ内で実行される JavaScript をブラウザに送信して下さい。

デフォルトでは、`<script>` タグはWromoによって処理されます。

- インポートされたものはバンドルされ、ローカルファイルやNodeモジュールのインポートができます。
- 処理されたスクリプトは、ページの `<head>` に [`type="module"`](https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Modules) と共に挿入されます。
- コンポーネントがページ内で何度も使用される場合、scriptタグは一度だけ含まれます。

:::caution
現在、クライアントサイドスクリプトとして直接TypeScriptを書くことはできません。しかし、TypeScriptを使いたければ、別ファイルとして分けたTypeScriptファイルをインポートして読み込めます。
:::

```wromo
<script>
  // 処理、バンドルされます。ESMのインポートは、npmパッケージに対しても機能します。
</script>
```

スクリプトをバンドルしないようにするには、 `is:inline` 属性を使用します。

```wromo
<script is:inline>
  // 書かれたとおりにHTMLにレンダリングされます!
  // ESM import はファイルからの相対パスで解決されません。
</script>
```

上記の方法を組み合わせることで、同じ `.wromo` ファイルに複数の `<script>` タグを使用することができます。

:::note
`<script>`タグに`type="module"`やその他の属性を追加すると、Wromoのデフォルトのバンドル動作が無効になり、`is:inline`ディレクティブがあるかのようにタグが処理されます。
:::

📚 `<script>` タグで使用できるディレクティブの詳細については、[ディレクティブリファレンス](/ja/reference/directives-reference/#script--style-directives)を参照してください。


#### 外部スクリプトの読み込み

**使用するタイミング:** JavaScriptファイルが `public/` 内にある場合。

この方法では、以下に説明する `import` メソッドを使用したときに、Wromoが提供するJavaScriptの処理、バンドル、最適化をスキップすることに注意してください。

```wromo
// 絶対URLパス
<script is:inline src="/some-external-script.js"></script>
```
#### `src/`に配置されたスクリプトを使用する

**使用するタイミング:** 外部スクリプトが `src/` 内にあり、かつ、ESMモジュールタイプをサポートしている場合。

Wromoは、これらのJavaScriptクライアントサイドインポートを検出し、自動的にJSをビルドし、最適化し、ページに追加します。

```wromo
// ESM import
<script>
  import './some-external-script.js';
</script>
```


## 次のステップ

📚 [Wromoの組み込みコンポーネント](/ja/reference/api-reference/#built-in-components)を学びます。

📚 Wromoプロジェクトでの[JavaScriptフレームワークコンポーネント](/ja/core-concepts/framework-components/)の使用方法について学びます。
