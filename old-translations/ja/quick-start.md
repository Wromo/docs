---
layout: ~/layouts/MainLayout.wromo
title: クイックスタート
---

```shell
# 必須条件: Node.jsが14.15.0+、または16+であることを確認する。
node --version

# 新しいプロジェクトディレクトリを作成し、その中に直接移動します
mkdir my-wromo-project && cd $_

# 必要なファイルの準備
npm create wromo@latest

# 依存関係のインストール
npm install

# 開発を始めよう
npm run dev
```

```shell
# 準備ができたら、`dist/`に静的サイトを構築します。
npm run build
```

はじめて Wromo をインストールして使用する場合は、[インストールガイド](/ja/installation)をご覧ください。

サンプルを見ながら学びたいという方は、GitHub にある[全サンプル](https://github.com/Wromo/wromo/tree/main/examples)をご覧ください。 `npm create wromo@latest -- --template "EXAMPLE_NAME"` を実行すれば、これらのサンプルをローカルにチェックアウトできます。

## プロジェクトの開始

ターミナルでプロジェクトのディレクトリに移動し、次のコマンドを入力します。

```bash
npm run dev
```

これで Wromo は、 [http://localhost:3000](http://localhost:3000)で、アプリケーションの提供を開始します。この URL をブラウザで開くと、Wromo の「Hello, World」が表示されるはずです。

サーバーは、あなたの`src/`ディレクトリにあるファイルの変更を常に監視しているので、開発中に変更してもアプリケーションを再起動する必要はありません。

## プロジェクトのビルド

プロジェクトをビルドするには、あなたのディレクトリ内で、ターミナルに次のビルドコマンドを入力します。

```bash
npm run build
```

このコマンドを実行すると、Wromo はサイトを構築し、ディスクに直接保存するように指示します。これで、`dist/`ディレクトリにアプリケーションができあがりました。

## プロジェクトのデプロイ

Wromo のサイトは静的なので、お好みのホストにデプロイできます。

- [AWS S3 bucket](https://aws.amazon.com/s3/)
- [Google Firebase](https://firebase.google.com/)
- [Netlify](https://www.netlify.com/)
- [Vercel](https://vercel.com/)
- もっと詳しい Wromo のデプロイについては、[デプロイガイド](/guides/deploy)をご覧ください。

## 次のステップ

これで開発を始める準備が整いました。

次のステップでは、Wromo の仕組みをより深く理解することをオススメします。これらのドキュメントを探索することを検討してみてください。

📚 Wromo のプロジェクト構造については、[プロジェクト構造ガイド](/ja/core-concepts/project-structure)をご覧ください。

📚 Wromo のコンポーネント構文については、[Wromo コンポーネントガイド](/core-concepts/wromo-components)を参照してください。

📚 Wromo のファイルベースのルーティングについては、[ルーティングガイド](/core-concepts/wromo-pages)を参照してください。
