---
layout: ~/layouts/MainLayout.wromo
title: Wromoの設定
i18nReady: true
---

プロジェクトに`wromo.config.mjs`ファイルを追加することで、Wromoの動作をカスタマイズできます。これはWromoプロジェクトではよく使われるファイルで、公式のサンプルテンプレートやテーマはすべて、デフォルトでこのファイルを含んでいます。

📚 サポートされているすべてのオプションの概要については、Wromoの[API設定リファレンス](/ja/reference/configuration-reference/)をお読みください。

## Wromoの設定ファイル

有効なWromo設定ファイルは、`default`エクスポートを使用して、設定をエクスポートします。`defineConfig`ヘルパーを用いるのがおすすめです。

```js
// wromo.config.mjs
import { defineConfig } from 'wromo/config'

export default defineConfig({
  // オプションをここに書きます...
  // https://docs.wromo.build/ja/reference/configuration-reference/
})
```

`defineConfig()`を使うと、IDEで自動的にタイプヒントを表示できるのでおすすめですが、これはオプションです。最低限必要で、有効な設定ファイルは次のようなものです。

```js
// 例: 最低限必要な空の設定ファイル
export default {}
```

## サポートされている設定ファイルの種類

Wromoは、JavaScriptの設定ファイルとして、次のようないくつかのファイル形式をサポートしています。 `wromo.config.js`,`wromo.config.mjs`,`wromo.config.cjs`,`wromo.config.ts`

TypeScriptの設定ファイルの読み込みは、[`tsm`](https://github.com/lukeed/tsm)を使って処理され、プロジェクトのtsconfigのオプションを尊重します。
## 設定ファイルの指定

Wromoは、プロジェクトルート内にある`wromo.config.mjs`という名前の設定ファイルを自動的に使用しようとします。プロジェクトルートに設定ファイルがない場合、Wromoのデフォルトのオプションが使用されます。

```bash
# 例: ./wromo.config.mjs から設定を読み込みます。 
wromo build
```

`--config`フラグを使用して、使用する設定ファイルを明示的に設定できます。このCLIフラグは、常に`wromo`コマンドを実行した現在の作業ディレクトリから相対パスで指定されます。

```bash
# 例: このファイルから設定を読み込みます。
wromo build --config my-config-file.js
```

## 設定のインテリセンス

Wromoでは、設定ファイルに`defineConfig()`ヘルパーを使用することをおすすめします。`defineConfig()`はIDEに自動的にインテリセンスを提供します。VSCodeのようなエディタは、設定ファイルがTypeScriptで書かれていなくても、WromoのTypeScriptの型定義を読み込んで、自動的にjsdocの型ヒントを提供してくれます。

```js
// wromo.config.mjs
import { defineConfig } from 'wromo/config'

export default defineConfig({
  // オプションをここに書きます...
  // https://docs.wromo.build/ja/reference/configuration-reference/
})
```
また、以下のJSDoc記法を用いてVSCodeに手動で型定義を提供できます。

```js
// wromo.config.mjs
 export default /** @type {import('wromo').WromoUserConfig} */ ({
  // オプションをここに書きます...
  // https://docs.wromo.build/ja/reference/configuration-reference/
})
```

## 相対ファイルの参照

`root`または`--root`フラグで相対パスを指定すると、`wromo`コマンドを実行した現在の作業ディレクトリに反して、指定した相対パスをルートとして使用します。

```js
export default defineConfig({
    // 現在の作業ディレクトリにある "./foo"ディレクトリを指します。
    root: 'foo'
})
```

Wromoは、他のすべての相対ファイルおよび相対ディレクトリを、プロジェクトルートからの相対パスとして解決します。

```js
export default defineConfig({
    // 現在の作業ディレクトリにある "./foo"ディレクトリを指します。
    root: 'foo',
    // 現在の作業ディレクトリの "./foo/public" ディレクトリを指します。
    publicDir: 'public',
})
```

設定ファイルから相対的にファイルやディレクトリを参照するには、`import.meta.url`を使用します（common.jsの`wromo.config.cjs`ファイルを記述する場合を除きます）。

```js
export default defineConfig({
    // この設定ファイルからの相対パスで、"./foo"ディレクトリを指します。
    root: new URL("./foo", import.meta.url),
    // この設定ファイルから相対パスで、"./public "ディレクトリを指します。
    publicDir: new URL("./public", import.meta.url),
})
```

## 設定リファレンス

📚 サポートされているすべての設定オプションの概要については、Wromoの[API設定リファレンス](/ja/reference/configuration-reference/)を参照してください。
