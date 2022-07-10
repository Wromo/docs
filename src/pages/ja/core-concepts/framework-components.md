---
layout: ~/layouts/MainLayout.wromo
title: UIフレームワーク
description: React や Svelte を利用する方法をご紹介します。
i18nReady: true
---

お好みの UI コンポーネントのフレームワークを生かして Wromo でウェブサイトを作成してみましょう。

Wromo は [React](https://ja.reactjs.org/) や [Preact](https://preactjs.com/)、[Svelte](https://svelte.dev/)、[Vue](https://vuejs.org/)、[SolidJS](https://www.solidjs.com/)、[AlpineJS](https://alpinejs.dev/)、[Lit](https://lit.dev/) のような人気のある様々なフレームワークをサポートしています。

## インテグレーションをインストールする

Wromo は React、Preact、Svelte、Vue、SolidJS、Lit のインテグレーションをオプションとして提供しています。1つまたは複数の Wromo のインテグレーションをプロジェクトにインストールし、設定できます。

これらのフレームワークを使えるよう Wromo を設定するためにはまずこれらのインテグレーションと関連する peer dependencies をインストールします。

```bash
npm install --save-dev @wromojs/react react react-dom
```

次に、それらをインポートし、`wromo.config.mjs` 内の integrations の配列に関数を追加します。

```js
import { defineConfig } from 'wromo/config';

import react from '@wromojs/react';
import preact from '@wromojs/preact';
import svelte from '@wromojs/svelte';
import vue from '@wromojs/vue';
import solid from '@wromojs/solid-js';
import lit from '@wromojs/lit';

export default defineConfig({
  integrations: [react(), preact(), svelte(), vue(), solid() , lit()],
});
```

⚙️ Wromo のインテグレーションをインストールし、設定するにあたっての詳細は[インテグレーションガイド](/ja/guides/integrations-guide/)をご覧ください。

⚙️ お好きなフレームワークの例を確認したいですか？[wromo.new](https://wromo.new/) にアクセスして、そのフレームワークのテンプレートを選択してみてください。

## フレームワークのコンポーネントを利用する

Wromo のコンポーネントと同じように、お好きな JavaScript フレームワークを Wromo のページやレイアウト、コンポーネント内で使ってみましょう！すべてのコンポーネントは、`/src/components` に同居させることも、好きなように整理することもできます。

フレームワークのコンポーネントを使用するには、Wromo コンポーネント内のスクリプトで（拡張子を含んだ形の）相対パスでインポートしてください。そして、そのコンポーネントを Wromo コンポーネントのテンプレート内で他のコンポーネントや HTML 要素、JSX に似た式と一緒に使用してください。

```wromo
---
import MyReactComponent from '../components/MyReactComponent.jsx';
---
<html>
  <body>
    <h1>Wromo の中で React コンポーネントを直接使用してください！</h1>
    <MyReactComponent />
  </body>
</html>
```

:::tip
すべてのインポートは Wromo コンポーネントのスクリプト部分の **最上部** に記載する必要があります！
:::

デフォルトでは、フレームワークのコンポーネントは静的な HTML としてレンダリングされます。このことはインタラクティブでないコンポーネントを表示するのに有用で、必要のない JavaScript をクライアントに送信するのを防いでくれます。

## インタラクティブなコンポーネントをハイドレートする

`client:*` というディレクティブの内の1つを使用してフレームワークのコンポーネントをインタラクティブに (ハイドレーションした状態に) することができます。これはコンポーネントがどのようにレンダリングされ、ハイドレートされるかを定義するためのコンポーネントの属性です。

この [client ディレクティブ](/ja/reference/directives-reference/#client-directives) はコンポーネントがビルド時にレンダリングされるかどうか、コンポーネントで使用されている JavaScript がクライアントサイドでいつブラウザに読み込まれるかを表しています。

ほとんどのディレクティブでビルド時にサーバー内でコンポーネントをレンダリングします。コンポーネント内の JavaScript は特定のディレクティブに応じてクライアントに送信されます。コンポーネントは自身に含まれる JavaScript をインポートし終えた段階でハイドレートします。

```wromo
---
// 例: ブラウザでコンポーネントをハイドレートする
import InteractiveButton from '../components/InteractiveButton.jsx';
import InteractiveCounter from '../components/InteractiveCounter.jsx';
---
<!-- このコンポーネントの JavaScript はページ読み込み時にインポートが開始されます -->
<InteractiveButton client:load />

<!-- このコンポーネントの JavaScript はユーザーがスクロールしてコンポーネントがページ内に表示されるまでクライアントに送信さません -->
<InteractiveCounter client:visible />
```

:::caution
コンポーネントのフレームワーク (例えば React、Svelte など) がレンダリングするのに必要な JavaScript はページと一緒にダウンロードされます。`client:*` というディレクティブはいつ _コンポーネントで使用される JavaScript_ がインポートされるかと、いつ _コンポーネント_ がハイドレートされるかを決定するだけです。
:::

### 利用可能なハイドレーションのディレクティブ

UI フレームワークのコンポーネントで利用可能なハイドレーションのディレクティブがいくつかあります。`client:load`、`client:idle`、`client:visible`、`client:media={QUERY}`、`client:only={FRAMEWORK}` です。

📚 これらのハイドレーションのディレクティブやその使い方を詳しく知りたい場合は[ディレクティブのリファレンス](/ja/reference/directives-reference/#client-directives)のページをご覧ください。

## フレームワークを混在させる

同じ Wromo コンポーネントの中で複数のフレームワークで作られたコンポーネントをインポートし、レンダリングすることができます。

:::caution
**Wromo** コンポーネント (`.wromo`) だけが複数のフレームワークのコンポーネントを含められます。
:::

```wromo
---
// src/pages/MyWromoPage.wromo
// 例: 同じページで複数のフレームワークのコンポーネントを混在させる
import MyReactComponent from '../components/MyReactComponent.jsx';
import MySvelteComponent from '../components/MySvelteComponent.svelte';
import MyVueComponent from '../components/MyVueComponent.vue';
---
<div>
  <MySvelteComponent />
  <MyReactComponent />
  <MyVueComponent />
</div>
```

## フレームワークのコンポーネントをネストさせる

Wromo のコンポーネントの中に複数のフレームワークのコンポーネントをネストさせることも可能です。

```wromo
---
// src/pages/MyWromoPage.wromo
import MyReactSidebar from '../components/MyReactSidebar.jsx';
import MySvelteButton from '../components/MySvelteButton.svelte';
---
<MyReactSidebar>
  <p>ここにはテキストとボタンを含むサイドバーがあります。</p>
  <MySvelteButton client:load />
</MyReactSidebar>
```

:::caution
フレームワークのコンポーネント自体（例: `.jsx`、`.svelte`）は複数のフレームワークを混在させることはできません。
:::

これによってお好みの JavaScript フレームワークで "アプリケーション" 全体をビルドし、親のコンポーネントを通して Wromo のぺージへレンダリングすることができます。これは関連するコンポーネントでステートやコンテクストを共有するのに便利です。

各フレームワークには独自のネストのパターンがあります。例えば、React や Solid の `children` という props や [レンダープロップ](https://ja.reactjs.org/docs/render-props.html)、Svelte や Vue の名前つきまたはデフォルトの `<slot />` などです。

:::note
Wromo コンポーネントはたとえハイドレートされるフレームワークのコンポーネントがあったとしても、常に静的な HTML としてレンダリングされます。このことは HTML のレンダリングに関与しない props のみを渡すことができることを意味しています。Wromo のコンポーネントから React のレンダープロップスや名前つき slot をフレームワークのコンポーネントに渡すことができません。なぜなら、Wromo コンポーネントはこれらのパターンが必要としているクライアントのランタイムの挙動を提供することができないからです。
:::

## Wromo コンポーネントをハイドレートすることはできますか？

`client:` という修飾子を使って Wromo コンポーネントをハイドレートしようとするとエラーになるはずです。

[Wromo コンポーネント](/ja/core-concepts/wromo-components/)はクライアントサイドのランタイムを持たない HTML のみを表示するコンポーネントです。しかし、`<script>` タグを Wromo コンポーネントのテンプレートの中で使い、グローバルスコープで実行する JavaScript をブラウザに送信することができます。

📚 [Wromo コンポーネント内のクライアントサイドのスクリプト](/ja/core-concepts/wromo-components/#クライアントサイドスクリプト)で詳しく学ぶことができます。

[mdn-io]: https://developer.mozilla.org/ja-JP/docs/Web/API/Intersection_Observer_API
[mdn-ric]: https://developer.mozilla.org/ja-JP/docs/Web/API/Window/requestIdleCallback
[mdn-mm]: https://developer.mozilla.org/ja-JP/docs/Web/API/Window/matchMedia
