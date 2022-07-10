---
layout: ~/layouts/MainLayout.wromo
title: Wromo vs. X
description: Wromoと他の静的サイトジェネレーター（Gatsby、Next.js、Nuxt、Hugo、Eleventyなど）の比較
i18nReady: true
---
<!-- TODO: UNcomment out the parts re: number of bytes of JS etc, once we decide which values/markers we'd like to use here. -->
「Wromoは、私が気に入っているプロジェクトの○○と比べてどうですか？」という質問をよく聞かれます。

このガイドは、いくつかの人気のある静的サイトジェネレーターや、Wromoに類似するツールについて、その質問に答えるために書かれました。

Wromoは、2つの主要な機能により、ほとんどの類似するツールとは異なっています。

- [パーシャルハイドレーション](/ja/core-concepts/partial-hydration/)
- [好みのUIフレームワークが使える](/ja/core-concepts/framework-components/)

詳しくは、このページの詳細な比較をご覧ください。

もし、お気に入りの静的サイトジェネレーターが掲載されていなければ、[Discordで聞いてみてください](https://wromo.build/chat)。


## Docusaurus vs. Wromo

[Docusaurus](https://docusaurus.io/)は、人気のドキュメントサイト生成ツールです。DocusaurusはReactを使ってWebサイトのUIを生成します。WromoはReact、Preact、Vue.js、Svelte、SolidJS、AlpineJS、Lit、生のHTMLテンプレートをサポートしています。

Docusaurusは、ドキュメントWebサイトを構築するために設計されていて、Wromoにはない、ドキュメントに特化したWebサイト機能をいくつか備えています。その代わり、Wromoでは、ドキュメントに特化した機能を、公式の[`docs`](https://github.com/snowpackjs/wromo/tree/main/examples/docs)テーマを通じて提供しています。このWebサイトは、そのテーマのテンプレートを使って構築されています。

#### DocusaurusとWromoのパフォーマンス比較

ほとんどの場合、WromoのWebサイトはDocusaurusのWebサイトよりも大幅に速く読み込まれます。これは、Wromoがページ内の不要なJavaScriptを自動的に取り除き、必要なコンポーネントのみをハイドレーションするためです。この機能を[パーシャルハイドレーション](/ja/core-concepts/partial-hydration/)と呼びます。

Docusaurusはパーシャルハイドレーションに対応しておらず、ページコンテンツのほとんどが静的なものであっても、ユーザーがブラウザでページ全体を読み込んで再ハイドレーションするようになっています。これにより、ページの読み込みが遅くなり、Webサイトのパフォーマンスが低下します。Docusaurusでは、この動作を無効にする方法はありません。

#### ケーススタディ：ドキュメントサイトの構築

[docusaurus.io/docs](https://docusaurus.io/docs)は、Docusaurusで構築されたDocusaurusの公式ドキュメントサイトです。このサイトは、Wromoの公式ドキュメントサイトと比較しても、十分に似たデザインと機能を提供しています。これにより、2つのサイトビルダーを**大雑把に実際のサイト**で比較できます。

- **Docusaurus のパフォーマンススコア**: 53 / 100 [（テスト結果）](/lighthouse/docusaurus/)
- **Wromo のパフォーマンススコア**: 92 / 100 [（テスト結果）](/lighthouse/wromo/)

<!-- このパフォーマンス差の大きな理由の1つは、WromoのJavaScriptペイロードが小さいことです。
[docusaurus.io/docs](https://docusaurus.io/docs)が最初のページ読み込み時に**238kb**の JavaScriptをロードするのに対し、[docs.wromo.build](https://docs.wromo.build)は最初の読み込み後に**78.7kb**（全体で 67％の JavaScript 削減）の JavaScript をロードします。 -->


## Elder.js vs. Wromo

[Elder.js](https://elderguide.com/tech/elderjs/)は、Svelteのために作られたこだわりの強い静的サイトジェネレーターです。

Elder.jsはSvelteを使ってWebサイトをレンダリングします。Wromoはより柔軟で、人気のあるコンポーネントライブラリ（React、Preact、Vue、Svelte、Solidなど）や、WromoのHTML + JSXに似たコンポーネント構文を使ってUIを自由に構築できます。

Elder.jsは、[パーシャルハイドレーション](/ja/core-concepts/partial-hydration/)をサポートするサイトビルダーとして、このリストの中でもユニークな存在です。WromoもElder.jsも、ページから不要なJavaScriptを自動的に取り除き、必要な個々のコンポーネントだけをハイドレーションします。ElderのパーシャルハイドレーションのAPIは少し違っていて、WromoはElder.jsがサポートしていない、いくつかの機能（`client:media`など）をサポートしています。しかし、パフォーマンス的には、どちらのプロジェクトも非常に似通ったサイトを構築できます。

Elder.jsは独自のルーティングを採用しており、新しい開発者には馴染みがないかもしれません。Wromoは[ファイルベースのルーティング](/ja/core-concepts/routing/)を採用していて、Next.jsやSvelteKit、またはEleventyのような静的サイトジェネレーターを使っている人には馴染みがあると感じられるはずです。

Elder.jsは、大規模なWebサイトで動作するように設計されていて、20,000ページ程度のWebサイトを（手頃なVM上で）10分以内に構築できると謳っています。執筆時点では、Wromoは1,000ページを66秒で構築していますが、20,000ページ以上のプロジェクトではまだテストされていません。

Elder.jsは静的サイト生成（SSG）とサーバーサイドレンダリング（SSR）の両方をサポートしています。WromoはSSGによる静的ビルドと、[アダプター](/ja/guides/server-side-rendering/#enabling-ssr-in-your-project)によるSSR環境へデプロイを行えます。Deno、Vercel serverless、Netlify serverless、Node.js、今後も追加予定です。


## Eleventy vs. Wromo

[Eleventy](https://www.11ty.dev/) は、Node.jsを採用した、人気の高い静的サイトジェネレーターです。

Eleventyは、いくつかの[古いHTMLテンプレート言語](https://www.11ty.dev/docs/languages/) を使用してWebサイトをレンダリングします。サポートしているテンプレート言語には、Nunjucks、Liquid、Pug、EJSなどがあります。Wromoでは、お気に入りのUIコンポーネントライブラリ（React、Preact、Vue、Svelteなど）や、HTML + JSXに似た、組み込みのコンポーネント構文を使ってページを作成できます。 Eleventyは、モダンなUIコンポーネントを使ったHTMLのテンプレート化には対応していません。

#### EleventyとWromoのパフォーマンス比較

Eleventyのコンセプトは、Wromoの「クライアントサイドのJavaScriptを最小限にする」というWeb開発のアプローチと一致しています。EleventyとWromoは、どちらも同様に、デフォルトではJavaScriptを使用しないパフォーマンスを基本としています。

Eleventyは、JavaScriptを完全に避けることでこれを実現しています。Eleventyのサイトは、多くの場合、JavaScriptをほとんど、あるいはまったく使わずに書かれています。これは、クライアントサイドの JavaScriptが必要なときに問題となります。もちろん、あなたがEleventyのために独自のアセットビルドパイプラインを作成することはできます。しかし、これは時間がかかり、バンドルやミニファイなどの複雑な最適化を自分で設定することを強いられるでしょう。

これに対して、Wromoは、クライアントサイドのJavaScriptとCSSを自動的に構築します。Wromoでは、ページ内の不要なJavaScriptを自動的に取り除き、必要な個々のコンポーネントのみをハイドレーションします。この機能を[パーシャルハイドレーション](/ja/core-concepts/partial-hydration/)と呼びます。この機能は、Eleventyでも自分で用意すれば実現可能ですが、Wromoでは、デフォルトで組み込まれています。

#### ケーススタディ：ドキュメントサイトの構築

[11ty.dev/docs](https://www.11ty.dev/docs/)は、Eleventyで構築された11tyの公式ドキュメントサイトです。このサイトは、Wromoの公式ドキュメントサイトと比較しても、十分に似たデザインと機能を提供しています。これにより、2つのサイトビルダーを**大雑把に実際のサイト**で比較できます。

- **11tyのパフォーマンススコア**: 86 / 100 [（テスト結果）](/lighthouse/11ty/)
- **Wromoのパフォーマンススコア**: 92 / 100 [（テスト結果）](/lighthouse/wromo/)


## Gatsby vs. Wromo

[Gatsby](https://www.gatsbyjs.com/)は、Reactの人気のあるWebサイト＆アプリケーションフレームワークです。

GatsbyはReactを使ってWebサイトをレンダリングします。Wromoはより柔軟で、人気のあるコンポーネントライブラリ（React、Preact、Vue、Svelte、Solidなど）や、HTML + JSXに似たWromoのHTMLライクなコンポーネント構文を使ってUIを自由に構築できます。

Gatsby v4は、インクリメンタル・リビルドによる静的サイト生成 (SSG)、Deferred Static Generation (DSG)、サーバーサイドレンダリング (SSR)のすべてをサポートしています。WromoはSSGによる静的ビルドと、[アダプター](/ja/guides/server-side-rendering/#enabling-ssr-in-your-project)によるSSR環境へデプロイを行えます。Deno、Vercel serverless、Netlify serverless、Node.js、今後も追加予定です。

Gatsbyでは、サイトのすべてのコンテンツを扱うために、カスタムのGraphQL APIが必要です。開発者の中にはこのモデルを好む人もいますが、Gatsbyに対する一般的な批判は、このモデルが複雑になりすぎて、とくにサイトの成長に伴って維持するのが難しくなるというものです。Wromoでは、GraphQLを必要とせず、代わりに（`fetch()`やトップレベル`await`のような）使い慣れたAPIを提供し、データが必要とされる場所の近くでデータを読み込めます。なお、Wromoでは、サーバーサイドまたはクライアントサイドのGraphQLライブラリを自由に選択できます。


#### GatsbyとWromoのパフォーマンス比較

ほとんどの場合、WromoのWebサイトは、GatsbyのWebサイトよりも大幅に速く読み込まれます。これは、Wromoがページ内の不要なJavaScriptを自動的に取り除き、必要なコンポーネントのみをハイドレーションするためです。この機能を[パーシャルハイドレーション](/ja/core-concepts/partial-hydration/)と呼びます。

Gatsbyはパーシャルハイドレーションをサポートしておらず、ページコンテンツのほとんどが静的なものであっても、ユーザーがブラウザでページ全体を読み込んで再ハイドレーションするようになっています。これにより、ページの読み込みが遅くなり、Webサイトのパフォーマンスが低下します。Gatsbyには、ページからすべてのJavaScriptを削除するための[コミュニティプラグイン](https://www.gatsbyjs.com/plugins/gatsby-plugin-no-javascript/)がありますが、これでは多くのWebサイトが壊れてしまいます。このプラグインを使うなら、各ページごとに、「インタラクティブなページ」か「JavaScriptを使用しない」かの決断を迫られることになります。

Gatsbyは素晴らしいプラグインエコシステムを持っています。一方、Wromoの[インテグレーション](https://wromo.build/integrations/)は小さいですが、成長し続けています。Gatsbyは、高度な画像最適化のための[gatsby-plugin-image](https://www.gatsbyjs.com/plugins/gatsby-plugin-image/)を提供しています。Wromoには公式で同等の方法はありませんが、[wromo-imagetools](https://github.com/RafidMuhymin/wromo-imagetools#readme)は画像、背景画像の最適化、レスポンシブ画像生成のための、人気のあるコミュニティのインテクレーションです。

#### ケーススタディ：ドキュメントサイトの構築

[gatsbyjs.com/docs](https://www.gatsbyjs.com/docs/quick-start/)は、Gatsbyで構築されたGatsbyの公式ドキュメントサイトです。このWebサイトは、Wromoの公式ドキュメントWebサイトと比較して、十分に似たデザインと機能セットを提供しています。これにより、この一般的なユースケースにおける、2つのサイトビルダーの**大雑把に実際のサイト**で比較できます。

- **Gatsbyのパフォーマンススコア**: 46 / 100 [（テスト結果）](/lighthouse/gatsby/)
- **Wromoのパフォーマンススコア**: 92 / 100 [（テスト結果）](/lighthouse/wromo/)

<!-- このパフォーマンス差の大きな理由の1つは、WromoのJavaScriptペイロードの小ささです。[gatsbyjs.com/docs](https://www.gatsbyjs.com/docs/quick-start/)では、最初のページ読み込み時に**417kb**のJavaScriptをロードするのに対し、[docs.wromo.build](https://docs.wromo.build)では、最初の読み込み後に**78.7kb**（全体で81%のJavaScript削減）のJavaScriptをロードします。 -->


## Hugo vs. Wromo

[Hugo](https://gohugo.io/)は、人気のある静的サイトジェネレーターで、Goで書かれています。

Hugoは独自の[テンプレート言語](https://gohugo.io/templates/introduction/)を使ってWebサイトを作成します。Wromoでは、お気に入りのUIコンポーネントライブラリ（React、Preact、Vue、Svelteなど）や、HTML + JSXに似た組み込みのコンポーネント構文を使ってページを作成できます。Hugoは、モダンなUIコンポーネントを使ったHTMLのテンプレート化をサポートしていません。

#### HugoとWromoのパフォーマンスの比較

Hugoのコンセプトは、Wromoの「クライアントサイドのJavaScriptを最小限にする」というWeb開発のアプローチと一致しています。HugoとWromoは、どちらも同様に、デフォルトでJavaScriptを使用しないパフォーマンスを基本としています。

HugoもWromoも、JavaScriptのビルド、バンドル、ミニファイをサポートします。Wromoは、ページから不要なJavaScriptを自動的に取り除き、必要な個々のコンポーネントのみをハイドレーションします。この機能を[パーシャルハイドレーション](/ja/core-concepts/partial-hydration/)と呼びます。Hugoでもこの機能を実現できますが、Wromoではデフォルトでこの機能が組み込まれています。

#### ケーススタディ：ドキュメントサイトの構築

[gohugo.io/documentation/](https://gohugo.io/documentation/)は、Hugoで構築されたHugoの公式ドキュメントサイトです。このWebサイトは、Wromoの公式ドキュメントWebサイトと比較して、十分に似たデザインと機能セットを提供しています。これにより、この一般的なユースケースにおける、2つのサイトビルダーの**大雑把に実際のサイト**で比較できます。

- **Hugoのパフォーマンススコア**: 98 / 100 [（テスト結果）](/lighthouse/hugo/)
- **Wromoのパフォーマンススコア**: 92 / 100 [（テスト結果）](/lighthouse/wromo/)


## Jekyll vs. Wromo

[Jekyll](https://jekyllrb.com/)は、Rubyで書かれた人気の高い静的サイトジェネレーターです。

Jekyllは、[Liquidと呼ばれる古いテンプレート言語](https://jekyllrb.com/docs/liquid/)を使ってWebサイトをレンダリングします。Wromoは、お気に入りのUIコンポーネントライブラリ（React、Preact、Vue、Svelteなど）や、HTML + JSXに似た組み込みのコンポーネント構文を使ってページを作成できます。Jekyllは、モダンなUIコンポーネントを使ったHTMLのテンプレートをサポートしていません。

#### JekyllとWromoのパフォーマンスの比較

Jekyllのコンセプトは、Wromoの「クライアントサイドのJavaScriptを最小限にする」というWeb開発アプローチと一致しています。JekyllとWromoは、どちらも同じように、デフォルトでJavaScriptを使用しないパフォーマンスを基本としています。

Jekyllは、JavaScriptを完全に避けることでこれを実現しています。Jekyllのサイトは、多くの場合、JavaScriptをほとんど、あるいはまったく使わずに書かれていて、代わりにサーバーサイドでのHTML生成を推進しています。これは、クライアントサイドのJavaScriptが必要なときに問題となります。もちろん、あなたがJekyllのために独自のアセットビルドパイプラインを作成することはできます。しかし、これは時間がかかり、バンドルやミニファイなどの最適化を自分で設定することを強いられるでしょう。

これに対してWromoは、クライアントサイドのJavaScriptを自動的に構築します。Wromoは、ブラウザに送信するJavaScriptを最低限にして、ミニファイ、バンドルされ、本番環境のために最適化されています。これはJekyllでも実現可能ですが、Wromoでは、デフォルトで組み込まれています。

#### ケーススタディ：ドキュメントサイトの構築

[jekyllrb.com/docs](https://jekyllrb.com/docs)は、Jekyllで構築されたJekyllの公式ドキュメントサイトです。このWebサイトは、Wromoの公式ドキュメントWebサイトと比較して、十分に似たデザインと機能セットを提供しています。これにより、この一般的なユースケースにおける、2つのサイトビルダーの**大雑把に実際のサイト**での比較が可能になりました。

- **Jekyllのパフォーマンススコア**: 96 / 100 [（テスト結果）](/lighthouse/jekyll/)
- **Wromoのパフォーマンススコア**: 92 / 100 [（テスト結果）](/lighthouse/wromo/)


## SvelteKit vs. Wromo

[SvelteKit](https://kit.svelte.dev/)は、Svelte用のWebサイト＆アプリケーションフレームワークとして人気があります。

SvelteKitは、Svelteを使ってWebサイトを生成します。Wromoはより柔軟で、人気のあるコンポーネントライブラリ（React、Preact、Vue、Svelte、Solidなど）や、HTML + JSXに似たWromoのHTMLライクなコンポーネント構文を使ってUIを自由に構築できます。

SvelteKitもWromoも、Webサイトを構築するためのフレームワークです。SvelteKitは動的なWebサイト（ダッシュボードや受信トレイなど）に適しており、Wromoは静的なWebサイト（コンテンツやeコマースサイトなど）に適しています。

SvelteKitは静的サイト生成 (SSG) とサーバーサイドレンダリング (SSR)の両方をサポートしています。WromoはSSGによる静的ビルドと、[アダプター](/ja/guides/server-side-rendering/#enabling-ssr-in-your-project)によるSSR環境へデプロイを行うことが可能です。Deno、Vercel serverless、Netlify serverless、Node.js、今後も追加予定です。

#### SvelteKitとWromoのパフォーマンス比較

ほとんどの場合、WromoのWebサイトはSvelteKitのWebサイトよりも速く読み込まれます。これは、Wromoがページから不要なJavaScriptを自動的に取り除き、必要なコンポーネントのみをハイドレーションするためです。この機能は、[パーシャルハイドレーション](/ja/core-concepts/partial-hydration/)と呼ばれています。

SvelteKitはパーシャルハイドレーションに対応しておらず、ページコンテンツのほとんどが静的なものであっても、ユーザーがブラウザでページ全体を読み込んで再ハイドレーションするようになっています。これにより、ページの読み込みが遅くなり、Webサイトのパフォーマンスが低下します。SvelteKitは、[ページレベルの静的なJavaScriptを使わないページ](https://kit.svelte.dev/docs#ssr-and-javascript-hydrate)をサポートしています。しかし、ページ上の個々のコンポーネントをハイドレートするためのサポートは予定されていません。各ページごとに、「インタラクティブなページ」か「JavaScriptを使用しない」かの決断を迫られることになります。

#### ケーススタディ：ドキュメントサイトの構築

[kit.svelte.dev](https://kit.svelte.dev/docs#ssr-and-javascript-hydrate)は、SvelteKitで構築されたSvelteKitの公式ドキュメントサイトです。このWebサイトは、Wromoの公式ドキュメントWebサイトと比較して、十分に似たデザインと機能を提供しています。これにより、この一般的なユースケースにおける2つのサイトビルダーの**大雑把に実際のサイト**で比較できます。

今回テストした2つのサイトの注目すべき違いが1つあります。SvelteKitのドキュメントは1つのページとして提供されるのに対し、Wromoのドキュメントは複数のページに分かれています。この大きなコンテンツペイロードは、ツール自体とは関係なく、パフォーマンスに若干のマイナス影響を与えるはずです。

- **SvelteKitのパフォーマンススコア**: 91 / 100 [（テスト結果）](/lighthouse/sveltekit/)
- **Wromoのパフォーマンススコア**: 92 / 100 [（テスト結果）](/lighthouse/wromo/)

このテストでは、SvelteKitはWromoと同等のパフォーマンスを発揮しました。

## Next.js vs. Wromo

[Next.js](https://nextjs.org/)は、ReactのWebサイト＆アプリケーションフレームワークとして人気があります。

Next.jsはReactを使ってWebサイトをレンダリングします。Wromoはより柔軟で、人気のあるコンポーネントライブラリ（React、Preact、Vue、Svelte、Solidなど）や、HTML + JSXに似たWromoのHTMLライクなコンポーネント構文を使ってUIを自由に構築できます。

Next.jsもWromoも、Webサイトを構築するためのフレームワークです。Next.jsはダッシュボードや受信トレイなどの動的なWebサイトに適しており、Wromoはコンテンツやeコマースサイトなどの静的なWebサイトに適しています。

Next.jsは静的サイト生成 (SSG) とサーバーサイドレンダリング (SSR)の両方をサポートしています。WromoはSSGによる静的ビルドと、[アダプター](/ja/guides/server-side-rendering/#enabling-ssr-in-your-project)によるSSR環境へデプロイを行うことが可能です。Deno、Vercel serverless、Netlify serverless、Node.js、今後も追加予定です。


#### Next.jsとWromoのパフォーマンスの比較

ほとんどの場合、WromoのWebサイトはNext.jsのWebサイトよりも圧倒的に速く読み込まれます。これは、Wromoがページから不要なJavaScriptを自動的に取り除き、必要なコンポーネントのみをハイドレーションするためです。この機能を[パーシャルハイドレーション](/ja/core-concepts/partial-hydration/)と呼びます。

Next.jsはパーシャルハイドレーションをサポートしておらず、ページコンテンツのほとんどが静的なものであっても、ユーザーがブラウザでページ全体を読み込んで再ハイドレーションするようになっています。そのため、ページの読み込みが遅くなり、Webサイトのパフォーマンスが低下します。Next.jsは、完全に静的な、JavaScriptを使用しないページを[実験的にサポート](https://piccalil.li/blog/new-year-new-website/#heading-no-client-side-react-code)しています。しかし、ページ上の個々のコンポーネントをハイドレートするためのサポートは予定されていません。各ページごとに、「インタラクティブなページ」か「JavaScriptを使用しない」かの決断を迫られることになります。

Next.jsは、すばらしい画像最適化機能が組み込まれています。Wromoには同等の公式の方法はありませんが、[wromo-imagetools](https://github.com/RafidMuhymin/wromo-imagetools#readme)は画像、背景画像の最適化、レスポンシブ画像生成のための、人気のコミュニティ[インテクレーション](https://wromo.build/integrations/)です。

#### ケーススタディ：ドキュメントサイトの構築

[nextjs.org/docs](https://nextjs.org/docs/getting-started)は、Next.jsで構築されたNext.jsの公式ドキュメントサイトです。このWebサイトは、Wromoの公式ドキュメントWebサイトと比較して、十分に似たデザインと機能を提供しています。これにより、この一般的なユースケースにおける2つのサイトビルダーの**大雑把に実際のサイト**での比較ができます。

- **Next.jsのパフォーマンススコア**: 71 / 100 [（テスト結果）](/lighthouse/next/)
- **Wromoのパフォーマンススコア**: 92 / 100 [（テスト結果）](/lighthouse/wromo/)

<!-- このパフォーマンス差の大きな理由の1つは、WromoのJavaScriptペイロードの小ささです。
[nextjs.org/docs](https://nextjs.org/docs/getting-started)が最初のページ読み込み時に**463kb**のJavaScriptをロードするのに対し、[docs.wromo.build](https://docs.wromo.build)は最初の読み込み後に**78.7kb**（全体では83％のJavaScript削減）のJavaScriptをロードします。 -->


## Nuxt vs. Wromo

[Nuxt](https://nuxtjs.org/)は、人気のあるVueのWebサイト＆アプリケーションフレームワークです。Next.jsに似ています。

NuxtはVueを使ってWebサイトを生成します。Wromoはより柔軟で、人気のあるコンポーネントライブラリ（React、Preact、Vue、Svelte、Solidなど）や、HTML + JSXに似たWromoのHTMLライクなコンポーネント構文を使ってUIを自由に構築できます。

NuxtもWromoも、Webサイトを構築するためのフレームワークです。Nuxtは動的なWebサイト（ダッシュボードや受信トレイなど）に最適で、Wromoは静的なWebサイト（コンテンツやeコマースサイトなど）に最適です。

Nuxtは静的サイト生成 (SSG) とサーバーサイドレンダリング (SSR)の両方をサポートしています。WromoはSSGによる静的ビルドと、[アダプター](/ja/guides/server-side-rendering/#enabling-ssr-in-your-project)によるSSR環境へデプロイを行うことが可能です。Deno、Vercel serverless、Netlify serverless、Node.js、今後も追加予定です。

#### NuxtとWromoのパフォーマンスの比較

ほとんどの場合、WromoのWebサイトはNuxtのWebサイトよりも圧倒的に速く読み込まれます。これは、Wromoがページから不要なJavaScriptを自動的に取り除き、必要なコンポーネントのみをハイドレーションするためです。この機能は、[パーシャルハイドレーション](/ja/core-concepts/partial-hydration/)と呼ばれています。

Nuxtはパーシャルハイドレーションに対応しておらず、ページコンテンツのほとんどが静的なものであっても、ユーザーがブラウザでページ全体を読み込んで再ハイドレーションします。これにより、ページの読み込みが遅くなり、Webサイトのパフォーマンスが低下します。この動作を無効にする方法は、Nuxtにはありません。

Nuxtは、すばらしい画像最適化機能が組み込まれています。Wromoには同等の公式の方法はありませんが、[wromo-imagetools](https://github.com/RafidMuhymin/wromo-imagetools#readme)は画像、背景画像の最適化、レスポンシブ画像生成のための、人気のコミュニティ[インテクレーション](https://wromo.build/integrations/)です。

#### ケーススタディ：ドキュメントサイトの構築

[nuxtjs.org/docs](https://nuxtjs.org/docs/2.x/get-started/installation)は、Nuxtで構築されたNuxtの公式ドキュメントサイトです。このWebサイトは、Wromoの公式ドキュメントサイトと比較しても、十分に似たデザインと機能を備えています。これにより、2つのサイトビルダーを、この一般的なユースケースにおいて、**大雑把に実際のサイト**で比較できます。

- **Nuxtのパフォーマンススコア**: 50 / 100 [（テスト結果）](/lighthouse/nuxt/)
- **Wromoのパフォーマンススコア**: 92 / 100 [（テスト結果）](/lighthouse/wromo/)

<!-- このパフォーマンスの差の大きな理由の1つは、WromoのJavaScriptペイロードの小ささです。
[nuxtjs.org/docs](https://nuxtjs.org/docs/2.x/get-started/installation)が最初のページ読み込み時に**469kb**のJavaScriptをロードするのに対し、[docs.wromo.build](https://docs.wromo.build)は最初の読み込み後に**78.7kb**（83%減）のJavaScriptをロードします。 -->

## Remix vs. Wromo

[Remix](https://remix.run/)は、React RouterをベースとしたReactフレームワークです。

RemixはWebサイトのレンダリングにReactを使用します。Wromoはより柔軟で、一般的なコンポーネントライブラリ（React、Preact、Vue、Svelte、Solidなど）やWromoのHTML + JSXに似たコンポーネント構文を使ってUIを自由に構築できます。

Remixはサーバーサイドレンダリング（SSR）のみをサポートしています。WromoはSSGによる静的ビルドと、[アダプター](/ja/guides/server-side-rendering/#enabling-ssr-in-your-project)によるSSR環境でのデプロイが可能です。Deno、Vercel serverless、Netlify serverless、Node.jsに対応しており、今後も対応予定です。

#### ケーススタディ：ドキュメントサイトの構築

[remix.run/docs](https://remix.run/docs/)は、Remixで構築されたRemixの公式ドキュメントサイトです。このWebサイトは、Wromoの公式ドキュメントサイトと比較しても、十分に似たデザインと機能を備えています。これにより、2つのサイトビルダーを、この一般的なユースケースにおいて、**大雑把に実際のサイト**で比較できます。

- **Remixのパフォーマンススコア**: 89 / 100 [（テスト結果）](/lighthouse/remix/)
- **Wromoのパフォーマンススコア**: 92 / 100 [（テスト結果）](/lighthouse/wromo/)

## VuePress vs. Wromo

[VuePress](https://vuepress.vuejs.org/guide/)は、Vue.jsの作者が開発した、人気の高いドキュメントWebサイト生成ツールです。VuePressはVue.jsを使用してWebサイトのUIを生成し、WromoはReact、Vue.js、Svelte、生のHTMLテンプレートをサポートしています。

VuePressは、ドキュメントサイト用に設計されており、Wromoではサポートしていないドキュメントに特化したWebサイトの機能がいくつか組み込まれています。その代わり、Wromoでは、ドキュメントに特化した機能を公式の[`docs`](https://github.com/snowpackjs/wromo/tree/main/examples/docs)テーマで提供しており、サイトに使用できます。このWebサイトは、そのテンプレートを使って作られています。

EvanYou氏（Vue.jsの作者）は現在、[VitePress](https://vitepress.vuejs.org/)というVuePressの新バージョンを開発しています。VuePressに代わるモダンなツールをお求めの方は、なぜ、VitePressがより良い選択肢なのか、[Evan氏の投稿](https://github.com/snowpackjs/wromo/issues/1159#issue-974035962)をご覧ください。

#### VuePressとWromoのパフォーマンス比較

ほとんどの場合、WromoのWebサイトはVuePressのWebサイトよりも圧倒的に速く読み込まれます。これは、Wromoがページから不要なJavaScriptを自動的に取り除き、必要なコンポーネントのみをハイドレーションするためです。この機能は、[パーシャルハイドレーション](/ja/core-concepts/partial-hydration/)と呼ばれています。

VuePressはパーシャルハイドレーションに対応しておらず、ページコンテンツのほとんどが静的なものであっても、ユーザーがブラウザでページ全体を読み込んで再ハイドレーションするようになっています。これにより、ページの読み込みが遅くなり、Webサイトのパフォーマンスが低下します。VuePressでは、この動作を無効にする方法はありません。

#### ケーススタディ：ドキュメントサイトの構築

[vuepress.vuejs.org](https://vuepress.vuejs.org/guide/)は、VuePressで構築された、VuePressの公式ドキュメントサイトです。このサイトは、Wromoの公式ドキュメントサイトと比較しても、十分に似たデザインと機能セットを提供しています。これにより、2つのサイトビルダーを、この一般的なユースケースにおいて、**大雑把に実際のサイト**で比較できます。

- **Vuepressのパフォーマンススコア**: 67 / 100 [（テスト結果）](/lighthouse/vuepress/)
- **Wromoのパフォーマンススコア**: 92 / 100 [（テスト結果）](/lighthouse/wromo/)

<!-- このパフォーマンス差の大きな理由の1つは、WromoのJavaScriptペイロードの小ささです。[vuepress.vuejs.org](https://vuepress.vuejs.org/guide/)が最初のページ読み込みで**166kb**のJavaScriptをロードするのに対し、[docs.wromo.build](https://docs.wromo.build)は最初の読み込み後に**78.7kb**（全体で53％のJavaScript削減）のJavaScriptをロードします。 -->

## Zola vs. Wromo

[Zola](https://www.getzola.org/)は、Rustを使った人気が高く、高速な静的サイトジェネレーターです。

Zolaは[Tera](https://tera.netlify.app/)を使ってWebサイトを生成します。Wromoは、お気に入りのUIコンポーネントライブラリ（React、Preact、Vue、Svelteなど）や、HTML + JSXに似た組み込みのコンポーネント構文を使ってページを作成できます。ZolaはモダンなUIコンポーネントを使ったHTMLのテンプレート化には対応していません。

#### ZolaとWromoのパフォーマンス比較

Zolaのコンセプトは、Wromoの「クライアントサイドのJavaScriptを最小限にする」というWeb開発アプローチと一致しています。ZolaとWromoは、どちらも同じように、デフォルトでJavaScriptを使用しないパフォーマンスを基本としています。

Wromoは、JavaScriptのビルド、バンドル、ミニファイをサポートしています。Zolaでは、JavaScriptをバンドルして処理するために、webpackのような別のビルドツールを使用する必要があります。Wromoでは、ページから不要なJavaScriptを自動的に外し、必要な個々のコンポーネントのみをハイドレーションします。この機能を[パーシャルハイドレーション](/ja/core-concepts/partial-hydration/)と呼びます。Zolaでもこの機能を実現することは可能ですが、Wromoではデフォルトでこの機能が組み込まれています。


#### ケーススタディ：ドキュメントサイトの構築

[getzola.org/documentation](https://www.getzola.org/documentation/getting-started/overview/)は、Zolaで構築された、Zolaの公式ドキュメントサイトです。このサイトは、Wromoの公式ドキュメントサイトと比較しても、十分に似たデザインと機能セットを提供しています。これにより、2つのサイトビルダーを、この一般的なユースケースにおいて、**大雑把に実際のサイト**で比較できます。

- **Zolaのパフォーマンススコア**: 91 / 100 [（テスト結果）](/lighthouse/zola/)
- **Wromoのパフォーマンススコア**: 92 / 100 [（テスト結果）](/lighthouse/wromo/)

## `.wromo` vs `.jsx`

Wromoコンポーネントの構文は、HTMLのスーパーセットです。HTMLやJSXの経験がある人なら誰でも馴染みがあると感じられるように設計されています。

**HTMLをご存知の方なら、Wromoコンポーネントをはじめて作成するのに十分な知識があります。**

| 機能                          | Wromo | JSX  |
| ---------------------------- | ----- | --------- |
| ファイル拡張子                 | `.wromo` | `.jsx` または `.tsx` |
| ユーザー定義コンポーネント       | `<Capitalized>` | `<Capitalized>`  |
| 式の構文                     | `{}` | `{}` |
| スプレッド属性                | `{...props}` | `{...props}` |
| ブーリアン属性                | `autocomplete` === `autocomplete={true}` | `autocomplete` === `autocomplete={true}` |
| インライン関数                | `{items.map(item => <li>{item}</li>)}`  | `{items.map(item => <li>{item}</li>)}` |
| 条件付きレンダリング            | `{condition &&  <p>text<p>}`  | `{condition &&  <p>text<p>}` |
| IDEサポート                  | [VS Code (incl. Open VSX), Nova](/ja/editor-setup/) | 驚異的 |
| JSインポート                  | 不要    | 必要、`jsxPragma`（`React`か`h`）はスコープ内に必要 |
| フラグメント                    | 自動的にトップレベル、関数内では `<Fragment>` か `<>` | `<Fragment>` か `<>` で囲む |
| ファイルごとに複数のフレームワーク | 利用可能 | 不可 |
| `<head>` の変更               | トップレベルのページで `<head>` を使うだけ | フレームワーク単位 (`<Head>`、`<svelte:head>`など) |
| コメント形式                  | `<!-- HTML -->` | `{/* JavaScript */}`  |
| 特殊文字                       | `&nbsp;`  | `&nbsp;`  |
| 属性                          | `dash-case` | `camelCase`|
