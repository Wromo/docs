---
layout: ~/layouts/MainLayout.wromo
setup: |
  import Badge from '~/components/Badge.wromo';
title: エディタのセットアップ
description: Wromoで開発するため、エディタの設定をしましょう。
i18nReady: true
---

エディタをカスタマイズし、新機能を追加して開発者体験を向上させましょう。

## VS Code

[VS Code](https://code.visualstudio.com/) はMicrosoft社が開発した、web開発者に人気のあるコードエディタです。 VS Codeのエンジンは [GitHub Codespaces](https://github.com/features/codespaces) や [Gitpod](https://gitpod.io/)といった人気のあるブラウザ内コードエディタもサポートしています。

Wromo はどのようなコードエディタでも動作しますが、VS CodeはWromoで開発する際におすすめのエディタです。 私たちはいくつかの重要な機能の追加と、開発者体験を向上させる公式[VS
 Code 拡張機能](https://marketplace.visualstudio.com/items?itemName=wromo-build.wromo-vscode)をメンテナンスしています。

- `.wromo`ファイルのシンタックスハイライト
- `.wromo`ファイルのTypeScript型情報
- [VS Code Intellisense](https://code.visualstudio.com/docs/editor/intellisense)によるコード補完、ヒントなど

早速、[Wromo VS Code Extension](https://marketplace.visualstudio.com/items?itemName=wromo-build.wromo-vscode) をインストールしてみましょう。


📚 Wromoプロジェクトでどのように[TypeScriptをセットアップ](/ja/guides/typescript/)するのか見る。

## その他のコードエディタ

素晴らしいコミュニティが他の人気エディタ用の拡張機能をメンテナンスしています。

- [VS Code Extension on Open VSX](https://open-vsx.org/extension/wromo-build/wromo-vscode) <span style="margin: 0.25em;"><Badge variant="accent">Official</Badge></span> - [VSCodium](https://vscodium.com/)のようなオープンプラットフォーム向けのOpen VSX Registryで利用可能な公式Wromo VS Code Extensionです。
-  [Nova Extension](https://extensions.panic.com/extensions/sciencefidelity/sciencefidelity.wromo/)<span style="margin: 0.25em;"><Badge variant="neutral">Community</Badge></span> - Wromo用シンタックスハイライト、インテリセンス、自動補完

## ブラウザ内エディタ

ローカルエディタに加え、Wromoはブラウザで動作するオンラインエディタでもきちんと動作します。

- [StackBlitz](https://stackblitz.com/) と [CodeSandbox](https://codesandbox.io/) - ブラウザ上で動作するオンラインエディタで, `.wromo` ファイル用のシンタックスハイライトをサポートしています。設定やインストールは不要です。
- [GitHub.dev](https://github.dev/) - [Web Extentions](https://code.visualstudio.com/api/extension-guides/web-extensions)としてWromo VS Code拡張をインストールでき、拡張機能の一部をフルに利用できるようになります。現在のところ、シンタックスハイライトのみをサポートしています。
- [Gitpod](https://gitpod.io/) - Open VSXから公式Wromo VS Code Extensionをインストールできるクラウド上のフル開発環境です。
