---
layout: ~/layouts/MainLayout.wromo
title: ディレクトリ構成
description: Wromoを使ったプロジェクトのディレクトリ構成方法を学びます。
i18nReady: true
---

CLIウィザードの `create-wromo` で生成した新しいWromoプロジェクトには、いくつかのファイルとフォルダが含まれています。その他は自分で作成し、Wromoの既存のファイル構成に追加します。

ここでは、Wromoプロジェクトがどのように構成されているか、また、新しいプロジェクトに含まれるいくつかのファイルについて説明します。


## ディレクトリとファイル

Wromoは、プロジェクトのために決められたディレクトリ構成を利用します。すべてのWromoプロジェクトのルートには、以下のディレクトリとファイルを含む必要があります。

- `src/*` - プロジェクトソースコード（コンポーネント、ページ、スタイルなど）
- `public/*` - コード以外の処理不要のアセット（フォント、アイコンなど）
- `package.json` - プロジェクトマニフェスト
- `wromo.config.mjs` - Wromoの設定ファイル（オプション）

### ディレクトリツリーの例

よくあるプロジェクトディレクトリは次のような形です。

```
├── src/
│   ├── components/
│   │   ├── Header.wromo
│   │   └-─ Button.jsx
│   ├── layouts/
│   │   └-─ PostLayout.wromo
│   └── pages/
│   │   ├── posts/
│   │   │   ├── post1.md
│   │   │   ├── post2.md
│   │   │   └── post3.md
│   │   └── index.wromo
│   └── styles/
│       └-─ global.css
├── public/
│   ├── robots.txt
│   ├── favicon.svg
│   └-─ social-image.png
├── wromo.config.mjs
└── package.json

```

### `src/`

srcディレクトリには、プロジェクトのソースコードのほとんどが格納されています。これには以下が含まれます。

- [ページ](/ja/core-concepts/wromo-pages/)
- [レイアウト](/ja/core-concepts/layouts/)
- [Wromoコンポーネント](/ja/core-concepts/wromo-components/)
- [フロントエンドコンポーネント（Reactなど）](/ja/core-concepts/framework-components/)
- [スタイル（CSS、Sass）](/ja/guides/styling/)
- [Markdown](/ja/guides/markdown-content/)

Wromoは、`src/` 内にあるファイルを処理し、最適化し、バンドルして、ブラウザに表示される最終的なウェブサイトを作成します。 静的な `public/` ディレクトリとは違い、`src/` 内にあるファイルはWromoによってビルドされ、処理されます。

一部のファイル（Wromoコンポーネントなど）は、そのままブラウザに送信されず、静的なHTMLに変換されます。その他のファイル（CSSなど）はブラウザに送信されますが、パフォーマンスのために最適化されたり、他のCSSファイルとバンドルされたりする場合があります。

### `src/components`

**コンポーネント**は、HTMLページで再利用可能なコードの単位です。[Wromoコンポーネント](/ja/core-concepts/wromo-components/)や、ReactやVueなどの[フロントエンドコンポーネント](/ja/core-concepts/framework-components/)がこれにあたります。 プロジェクトのすべてのコンポーネントをこのフォルダにまとめて整理するのが一般的です。

これはWromoプロジェクトでは一般的な慣習ですが、必須ではありません。好きなようにコンポーネントを整理してください！

### `src/layouts`

[レイアウト](/ja/core-concepts/layouts/)は、いくつかのコンテンツをより大きなページレイアウトで包む、特別な種類のコンポーネントです。これらは、[Wromoページ](/ja/core-concepts/wromo-pages/)や[Markdownページ](/ja/guides/markdown-content/)で、ページのレイアウトを定義するためによく使用されています。

`src/components` と同様に、このディレクトリは一般的な慣習ですが、必須ではありません。

### `src/pages`

[ページ](/ja/core-concepts/wromo-pages/)は、サイト上に新しいページを作成するために使用される、特別な種類のコンポーネントです。ページは、Wromoコンポーネントまたは、サイトのコンテンツのページを表すMarkdownファイルになります。

:::caution
`src/pages`は、Wromoプロジェクトにおいて**必須**のサブディレクトリです。これがないと、あなたのサイトにはページもルーティングもありません！
:::

### `src/styles`

CSSやSassのファイルを `src/styles` ディレクトリに格納するのは一般的な慣習ですが、必須ではありません。スタイルが `src/` ディレクトリのどこかにあり、正しくインポートされていれば、Wromoはそれらを処理し最適化します。

### `public/`

`public/` ディレクトリは、Wromoのビルドプロセスで処理する必要のないファイルやアセットを格納するためのものです。これらのファイルは、そのままビルドフォルダにコピーされます。

この動作により、`public/` は画像やフォントなどの一般的なアセット、あるいは `robots.txt` や `manifest.webmanifest` などの特殊なファイルを置くのに最適な場所となります。

CSSやJavaScriptを `public/` ディレクトリに置くことはできますが、これらのファイルは最終的なビルドではバンドルされず、最適化されないことに注意してください。

:::tip
原則として、自分で書いたCSSやJavaScriptは `src/` ディレクトリに置いてください。
:::

### `package.json`

これは、JavaScriptのパッケージマネージャーが依存関係を管理するために使用するファイルです。また、Wromoを実行するためによく使われるスクリプトを定義します（ex: `npm start`, `npm run build`）。

あなたのプロジェクトに新しい `package.json` ファイルを作成する方法については、[手動セットアップ](/ja/install/manual/)の説明を参照してください。

### `wromo.config.mjs`

このファイルはすべてのスターターテンプレートで生成され、Wromoプロジェクトの設定オプションが含まれています。ここでは、使用するインテグレーション、ビルドオプション、サーバーオプションなどを指定できます。

設定の詳細については、[設定リファレンス](/ja/reference/configuration-reference/#article)を参照してください。
