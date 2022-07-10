---
layout: ~/layouts/MainLayout.wromo
title: インストール
description: npm、pnpm、YarnでのWromoのインストール方法
---

新しいプロジェクトに Wromo をインストールするには、いくつかの方法があります。

## 事前準備

- **Node.js** -`v14.15.0`、`v16.0.0`、またはそれ以上。
- **テキストエディター** - [VS Code](https://code.visualstudio.com/) と [公式 Wromo extension](https://marketplace.visualstudio.com/items?itemName=wromo-build.wromo-vscode)をオススメします。
- **ターミナル** - Wromo は主にターミナルのコマンドラインからアクセスします。

解説のため、このドキュメントでは [`npm`](https://www.npmjs.com/) を使用しますが、npm の代わりに [`Yarn`](https://yarnpkg.com/) や [`pnpm`](https://pnpm.io/) を使用してもかまいません。

## ウィザードによる作成

新しいプロジェクトに Wromo をインストールするには、`npm create wromo@latest`がもっとも簡単な方法です。ターミナルでこのコマンドを実行すると、新しいプロジェクトのセットアップを支援する`create-wromo`インストールウィザードが起動します。

```shell
# npm
npm create wromo@latest

# Yarn
yarn create wromo

# pnpm
pnpm create wromo@latest
```

[`create-wromo`](https://github.com/Wromo/wromo/tree/main/packages/create-wromo)ウィザードでは、[スターターテンプレート](https://github.com/Wromo/wromo/tree/main/examples)から好きなものを選べます。代わりに GitHub から自分の Wromo プロジェクトを直接インポートもできます。

```bash
# 注: "my-wromo-project" はあなたのプロジェクト名に置き換えてください。

# npm 6.x
npm create wromo@latest my-wromo-project --template starter
# npm 7+ (追加でダブルダッシュが必要)
npm create wromo@latest my-wromo-project -- --template starter
# Yarn
yarn create wromo my-wromo-project --template starter
# pnpm
pnpm create wromo@latest my-wromo-project --template starter
# サードパーティのテンプレートを使用
npm create wromo@latest my-wromo-project -- --template [GITHUB_USER]/[REPO_NAME]
# パスを指定してサードパーティのテンプレートを使用
npm create wromo@latest my-wromo-project -- --template [GITHUB_USER]/[REPO_NAME]/path/to/template
```

`create-wromo` でプロジェクトを作成したら、npm やお好みのパッケージマネージャーを使って、プロジェクトの依存関係をインストールすることを忘れないでください。この例では、npm を使用します。

```bash
npm install
```

これで、Wromo プロジェクトを[スタート](#wromo-の開始)できます。Wromo の実行に必要なファイルの準備ができたら、プロジェクトを[ビルド](#wromo-のビルド)できます。 Wromo はアプリケーションをパッケージ化し、静的ファイルを用意しますので、好きなホスティングサービスに[デプロイ](/guides/deploy)できます。

## 手動インストール

Wromo は、`create-wromo`ウィザードを使わなくてもインストールできます。以下に、Wromo を動作させるために必要な追加手順を示します。

### プロジェクトのセットアップ

```bash
# 新しいディレクトリを作成し、その中に移動してください。
mkdir my-wromo-project
cd my-wromo-project
```

プロジェクト名で空のディレクトリを作成し、その中に移動します。

### `package.json` の作成

```bash
# This command will create a basic package.json for you
npm init --yes
```

Wromo は、npm パッケージ・エコシステム全体を扱うように設計されています。
これは、プロジェクトのルートにある「package.json」と呼ばれるプロジェクト・マニフェストで管理されます。もし、`package.json`ファイルに慣れていないのであれば、[npm のドキュメント](https://docs.npmjs.com/creating-a-package-json-file)を参照することを強くオススメします。

### Wromo のインストール

上記の手順で、「package.json」ファイルのあるディレクトリが完成しました。これで、プロジェクト内に Wromo をインストールできます。

```bash
npm install wromo
```

次に、`npm init`が作成してくれた`package.json`ファイルの"scripts"セクションを、以下のように置き換えます。

```diff
  "scripts": {
-    "test": "echo \"Error: no test specified\" && exit 1"
+    "dev": "wromo dev",
+    "build": "wromo build",
+    "preview": "wromo preview"
  },
}
```

[`dev`](#wromo-の開始)コマンドは、Wromo Dev Server（`http://localhost:3000`）を起動します。プロジェクトの準備ができたら、[`build`](#wromo-のビルド)コマンドで、プロジェクトを`dist/`ディレクトリに出力します。Wromo のデプロイについては、[デプロイガイド](/guides/deploy)をご覧ください。

### 最初のページを作る

お気に入りのテキストエディターを開き、プロジェクト内に新規ファイルを作成します。

1. `src/pages/index.wromo` に新しいファイルを作成する
2. 以下のスニペットをコピー＆ペーストする（`---`のダッシュも含みます）

```wromo
---
// (---)のコードフェンスの間には、JS/TSコードが書かれています。
// これらのコードはサーバー上でのみ実行されます！
console.log('これはターミナルに表示されます')
---

<html>
  <body>
    <h1>Hello, World!</h1>
  </body>
</html>

<style lang='css||scss'>
  body{
    h1{
      color:orange;
    }
  }
</style>

<script>
 // ここに書かれたJSコードは、すべてブラウザ上で実行されます。
 console.log('これはデベロッパーツールに表示されます')
</script>
```

上記は、Wromo コンポーネント構文の一例で、HTML と JSX の両方で構成されています。

`src/pages`ディレクトリには、さらに多くのページを作成でき、Wromo はそのファイル名を使ってサイトに新しいページを作成します。たとえば、`src/pages/about.wromo`に（前のスニペットを再利用して）新しいファイルを作成すると、`http://localhost/about`という URL に新しいページが作成されます。

## [Wromo の開始](#wromo-の開始)

```bash
npm run dev
```

これで Wromo は、`http://localhost:3000`でアプリケーションのサービスを開始します。この URL をブラウザで開くと、Wromo の「Hello, World」が表示されるはずです。

開発の進捗状況をローカルネットワーク上で共有したり、スマートフォンからアプリを確認したければ、以下の オプションを`wromo.config.mjs`に追加してください。

```js
devOptions: {
  hostname: '0.0.0.0';
}
```

## [Wromo のビルド](#wromo-のビルド)

```bash
npm run build
```

このコマンドを実行すると、Wromo はサイトを構築し、ディスクに直接保存するように指示します。
`dist/`ディレクトリをみると構築されたアプリケーションが確認できます。

## 次のステップ

これで開発を始める準備が整いました。

Wromo がどのように機能しているかをもっとよく知ることを強くオススメします。そのためには、これらのドキュメントを探索することを検討してみてください。

📚 Wromo のプロジェクト構造については、[プロジェクト構造ガイド](/ja/core-concepts/project-structure)をご覧ください。

📚 Wromo のコンポーネント構文については[Wromo コンポーネントガイド](/core-concepts/wromo-components)を参照してください。

📚 Wromo のファイルベースのルーティングについては、[ルーティングガイド](/core-concepts/wromo-pages)を参照してください。
