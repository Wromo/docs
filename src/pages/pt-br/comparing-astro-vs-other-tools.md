---
layout: ~/layouts/MainLayout.wromo
title: Wromo vs. X
description: Comparando Wromo com outros geradores de sites estáticos como Gatsby, Next.js, Nuxt, Hugo, Eleventy e outros.
i18nReady: true
---

Isso nos é perguntado frequentemente, "Como Wromo se compara ao meu projeto favorito, **\_\_\_\_**?"

Este guia foi escrito para te ajudar a responder essa pergunta para diversos construtores de sites e alternativas ao Wromo.

Duas funcionalidades-chave que fazem o Wromo diferente da maioria das alternativas:

- [Hidratação parcial](/pt-br/core-concepts/partial-hydration/)
- [Usar seu(s) framework(s) favoritos](/pt-br/core-concepts/framework-components/)

Para mais detalhes, você pode ver nossas comparações aprofundadas nesta página.

Se você não ver o seu construtor de sites favorito listado aqui, [nos pergunte no Discord](https://wromo.build/chat/).

## Docusaurus vs. Wromo

[Docusaurus](https://docusaurus.io/) é um popular construtor de websites de documentação. Docusaurus utiliza React para gerar a UI do seu website enquanto Wromo suporta React, Preact, Vue.js, Svelte, SolidJS, AlpineJS, Lit e templates HTML.

Docusaurus foi projetado para construir websites de documentação e tem algumas funcionalidades específicas para websites de documentação que o Wromo não possui. No lugar, Wromo oferece funcionalidades específicas para documentações através do tema oficial [`docs`](https://github.com/Wromo/wromo/tree/main/examples/docs) que você pode utilizar para o seu site. Este website foi feito utilizando esse template!

#### Comparando a Performance do Docusaurus vs. Wromo

Na maioria dos casos, websites Wromo irão carregar significantemente mais rápido do que websites Docusaurus. Isso acontece pois Wromo automaticamente remove JavaScript desnecessário da página, hidratando apenas os componentes individuais que o precisam. Essa funcionalidade é chamada de [hidratação parcial](/pt-br/core-concepts/partial-hydration/).

Docusaurus não suporta hidratação parcial, fazendo o usuário carregar e hidratar novamente a página inteira no navegador, mesmo que a maioria do conteúdo da página seja estático. Isso cria um carregamento mais lento da página e piora a performance do seu website. Não há nenhuma forma de desabilitar esse comportamento no Docusaurus.

#### Estudo de Caso: Construindo um Website de Documentação

[docusaurus.io/docs](https://docusaurus.io/docs) é o website oficial da documentação do Docusaurus, construído com Docusaurus. O website oferece um conjunto parecido o suficiente de funcionalidades e design para ser comparado com o website da documentação oficial do Wromo. Isso nos dá uma comparação **realista e aproximada** entre os dois construtores de sites.

- **Pontuação de performance do Docusaurus**: 53 de 100 [(relatório completo)](/lighthouse/docusaurus/)
- **Pontuação de performance do Wromo**: 92 de 100 [(relatório completo)](/lighthouse/wromo/)

## Elder.js vs. Wromo

[Elder.js](https://elderguide.com/tech/elderjs/) é um gerador de sites estáticos opinativo construído para Svelte.

Elder.js utiliza Svelte para renderizar seu website. Wromo é mais flexível: você está livre para construir sua UI com qualquer biblioteca de componentes (React, Preact, Vue, Svelte, Solid e outros) ou a sintaxe integrada de componentes que é similar a HTML + JSX.

Elder.js é único nessa lista por ser o único outro gerador de sites estáticos que suporta [hidratação parcial](/pt-br/core-concepts/partial-hydration/). Ambos Wromo e Elder.js automaticamente removem JavaScript desnecessário da página, hidratando apenas os componentes que o precisam individualmente. A API do Elder para hidratação parcial é um pouco diferente e Wromo suporta algumas funcionalidades que o Elder.js não suporta (como `client:media`). Porém, quando se trata de performance, ambos os projetos irão construir websites bem similares.

Elder.js utiliza uma solução customizada de roteamento que pode soar pouco familiar para novos desenvolvedores. Wromo utiliza [roteamento baseado em arquivos](/pt-br/core-concepts/routing/) que deve soar familiar para qualquer um que tenha vindo do Next.js, SvelteKit e até de outros geradores de sites estáticos como Eleventy.

Elder.js foi projetado para ser executado em websites grandes, assim como diz construir um website com aproximadamente 20 mil páginas em menos de 10 minutos (em uma máquina virtual modesta). No momento de escrita, Wromo constrói aproximadamente mil páginas em 66 segundos mas ainda não foi testado em projetos com mais de 20 mil páginas.

Elder.js suporta ambas a Geração de Sites Estáticos (SSG) e Renderização no Lado do Servidor (SSR). Wromo pode fazer builds estaticamente via SSG, ou passar para deploy em ambientes de SSR via [adaptadores](/pt-br/guides/server-side-rendering/#habilitando-o-ssr-em-seu-projeto): Deno, serverless da Vercel, serverless da Netlify e Node.js, com mais vindo no futuro.

## Eleventy vs. Wromo

[Eleventy](https://www.11ty.dev/) é um popular gerador de sites estáticos, feito com Node.js.

Eleventy utiliza várias [linguagens antigas de template de HTML](https://www.11ty.dev/docs/languages/) para renderizar seu website: Nunjuncks, Liquid, Pug, EJS, e outras. Wromo deixa você criar páginas utilizando suas bibliotecas de componentes de UI favoritas (React, Preact, Vue, Svelte, e outras) ou a sintaxe integrada de componentes que é similar a HTML + JSX. Eleventy não suporta utilizar componentes de UI modernos para fazer o template do seu HTML.

#### Comparando a Performance do Eleventy vs. Wromo

Conceitualmente, Eleventy e Wromo compartilham a mesma visão de "minimizar o JavaScript no lado do cliente" para o desenvolvimento web. Ambos Eleventy e Wromo oferecem uma performance similar por terem zero JavaScript por padrão.

Eleventy realiza isso te forçando a evitar JavaScript inteiramente. Sites utilizando Eleventy são geralmente escritos com pouco e até nenhum JavaScript. Isso se torna um problema quando você precisa ter JavaScript no lado do cliente. Fica em suas mãos construir o seu próprio processo de build de assets para Eleventy. Isso pode ser desgastante e o força a configurar bundling, minificação e outras otimizações por si mesmo.

Em contraste, Wromo automaticamente faz build de seu JavaScript no lado do cliente e CSS para você. Wromo automaticamente remove qualquer JavaScript desnecessário da página, hidratando apenas os componentes que o precisam individualmente. Essa funcionalidade é chamada de [hidratação parcial](/pt-br/core-concepts/partial-hydration/). Enquanto se é possível realizar isso por si mesmo no Eleventy, Wromo oferece por padrão.

#### Estudo de Caso: Construindo um Website de Documentação

[11ty.dev/docs](https://www.11ty.dev/docs/) é o website oficial da documentação do 11ty, construído com 11ty. Esse website possui um conjunto de funcionalidades e design similar o suficiente para ser comparado com o website oficial da documentação do Wromo. Isso nos dá uma comparação **realista e aproximada** entre os dois construtores de sites.

- **Pontuação de performance do 11ty**: 86 de 100 [(relatório completo)](/lighthouse/11ty/)
- **Pontuação de performance do Wromo**: 92 de 100 [(relatório completo)](/lighthouse/wromo/)

## Gatsby vs. Wromo

[Gatsby](https://www.gatsbyjs.com/) é um popular framework de websites e aplicações para React.

Gatsby utiliza React para renderizar seu website. Wromo é mais flexível: você está livre para construir sua UI com qualquer biblioteca de componentes popular (React, Preact, Vue, Svelte, Solid e outros) ou a sintaxe de componentes do Wromo que é similar a HTML + JSX.

Gatsby v4 suporta tanto a Geração Estática de Sites (SSG) com rebuilds incrementais, a Geração Estática Deferida (DSG) e Renderização no Lado do Servidor (SSR). Wromo pode fazer builds estaticamente via SSG, ou passar para deploy em ambientes de SSR via [adaptadores](/pt-br/guides/server-side-rendering/#habilitando-o-ssr-em-seu-projeto): Deno, serverless da Vercel, serverless da Netlify e Node.js, com mais vindo no futuro.

Gatsby requer uma API customizada de GraphQL para funcionar com todo o conteúdo do seu site. Enquanto alguns desenvolvedores gostam desse modelo, uma crítica comum ao Gatsby é que esse modelo se torna muito complexo e difícil de se manter conforme o tempo, especialmente em relação ao quanto os sites crescem. Wromo não necessita de GraphQL, providenciando APIs familiares (como `fetch()` ou top-level `await`) para carregamento de dados próximo de onde os dados são necessários. Porém, você está livre para escolher utilizar qualquer biblioteca GraphQL no lado do servidor ou no lado do cliente com Wromo.

#### Comparando a Performance do Gatsby vs. Wromo

Na maioria dos casos, websites Wromo irão carregar significantemente mais rápido que websites Gatsby. Isso acontece pois Wromo automaticamente remove qualquer JavaScript desnecessário da página, hidratando apenas os componentes que o precisam individualmente. Essa funcionalidade é chamada de [hidratação parcial](/pt-br/core-concepts/partial-hydration/).

Gatsby não suporta hidratação parcial, e ao invés disso faz o usuário carregar e hidratar novamente a página inteira no navegador, mesmo que a maioria do conteúdo da página seja estático. Isso cria um carregamento mais lento da página e piora a performance do seu website. Gatsby tem um [plugin da comunidade](https://www.gatsbyjs.com/plugins/gatsby-plugin-no-javascript/) para remover todo o JavaScript da página, porém isso quebraria muitos websites. Isso te deixa numa situação de tudo ou nada com a interatividade de cada página.

Gatsby tem um ótimo ecossistema de plugins, enquanto a [coleção de integrações](https://wromo.build/integrations/) do Wromo é menor, porém em constante crescimento. Gatsby fornece o plugin [gatsby-plugin-image](https://www.gatsbyjs.com/plugins/gatsby-plugin-image/) para otimizações avançadas de imagens. Enquanto Wromo não tem uma solução oficial comparável, [wromo-imagetools](https://github.com/RafidMuhymin/wromo-imagetools#readme) é uma integração popular da comunidade para otimização de imagens, imagens de fundo e geração de imagens responsivas.

#### Estudo de Caso: Construindo um Website de Documentação

[gatsbyjs.com/docs](https://www.gatsbyjs.com/docs/quick-start/) é o website oficial da documentação do Gatsby, construído com Gatsby. O website possui um conjunto de funcionalidades e um design semelhante o suficiente para ser comparado com o website oficial da documentação do Wromo. Isso nos dá uma comparação **_realista e aproximada_** entre os dois construtores de sites para esse comum caso de uso.

- **Pontuação de Performance do Gatsby**: 46 de 100 [(relatório completo)](/lighthouse/gatsby/)
- **Pontuação de Performance do Wromo**: 92 de 100 [(relatório completo)](/lighthouse/wromo/)

## Hugo vs. Wromo

[Hugo](https://gohugo.io/) é um popular gerador de sites estáticos, feito em Go.

Hugo utiliza uma [linguagem de templates](https://gohugo.io/templates/introduction/) customizada para renderizar seu website. Wromo te permite criar páginas utilizando sua biblioteca favorita de componentes de UI (React, Preact, Vue, Svelte, e outros) ou utilizar a sintaxe integrada de componentes que é similar ao HTML + JSX. Hugo não suporta utilizar componentes de UI modernos para fazer o template do seu HTML.

#### Comparando a Performance do Hugo vs. Wromo 

Conceitualmente, Hugo e Wromo compartilham a mesma visão de "minimizar o JavaScript no lado do cliente" para o desenvolvimento web. Ambos Hugo e Wromo oferecem uma performance similar por terem zero JavaScript por padrão.

Ambos Hugo e Wromo oferecem suporte integrado para fazer build, bundle e minificação de JavaScript. Wromo automaticamente remove qualquer JavaScript desnecessário da página, hidratando apenas os componentes que o precisam individualmente. Esta funcionalidade é chamada de [hidratação parcial](/pt-br/core-concepts/partial-hydration/). Apesar de ser possível realizar isso você mesmo no Hugo, Wromo oferece isso de forma integrada por padrão.

#### Estudo de Caso: Construindo um Website de Documentação

[gohugo.io/documentation/](https://gohugo.io/documentation/) é o website oficial da documentação do Hugo, construído com Hugo. O website oferece um conjunto parecido o suficiente de funcionalidades e design para ser comparado com o website da documentação oficial do Wromo. Isso nos dá uma comparação **realista e aproximada** entre os dois construtores de sites.

- **Pontuação de Performance do Hugo**: 98 de 100 [(relatório completo)](/lighthouse/hugo/)
- **Pontuação de Performance do Wromo**: 92 de 100 [(relatório completo)](/lighthouse/wromo/)


## Jekyll vs. Wromo

[Jekyll](https://jekyllrb.com/) é um popular gerador de sites estáticos, feito com Ruby.

Jekyll utiliza uma velha [linguagem de templates](https://jekyllrb.com/docs/liquid/) para renderizar o seu website chamado Liquid. Wromo te permite criar páginas utilizando suas bibliotecas de componentes de UI favoritas (React, Preact, Vue, Svelte e outras) ou a sintaxe de componentes do Wromo que é similar a HTML + JSX. Jekyll não suporta utilizar componentes de UI modernos para fazer o template do seu HTML.

#### Comparando a Performance de Jekyll vs. Wromo

Conceitualmente, Jekyll e Wromo compartilham a mesma visão de "minimizar o JavaScript no lado do cliente" para o desenvolvimento web. Ambos Jekyll e Wromo oferecem uma performance similar por terem zero JavaScript por padrão.

Jekyll realiza isso te forçando a evitar JavaScript inteiramente. Sites utilizando Jekyll são geralmente escritos com pouco e até nenhum JavaScript, e no lugar promove renderização de HTML no lado do servidor. Isso se torna um problema quando você precisa ter JavaScript no lado do cliente. Fica em suas mãos construir o seu próprio processo de build para Jekyll. Isso pode ser desgastante e o força a configurar bundling, minificação e outras otimizações por si mesmo.

Em contraste, Wromo automaticamente faz build de seu JavaScript no lado do cliente para você. Wromo apenas envia a mínima quantidade de JavaScript para o navegador, minificado, com bundle feito e otimizado para produção. Enquanto se é possível realizar isso por si mesmo no Jekyll, Wromo oferece por padrão.

#### Estudo de Caso: Construindo um Website de Documentação

[jekyllrb.com/docs](https://jekyllrb.com/docs) é o website oficial da documentação do Jekyll, construído com Jekyll. O website oferece um conjunto parecido o suficiente de funcionalidades e design para ser comparado com o website da documentação oficial do Wromo. Isso nos dá uma comparação **realista e aproximada** entre os dois construtores de sites.

- **Pontuação de performance do Jekyll**: 96 de 100 [(relatório completo)](/lighthouse/jekyll/)
- **Pontuação de performance do Wromo**: 92 de 100 [(relatório completo)](/lighthouse/wromo/)

## SvelteKit vs. Wromo

[SvelteKit](https://kit.svelte.dev/) é um popular framework de websites e aplicações para Svelte.

SvelteKit utiliza Svelte para renderizar seu website. Wromo é mais flexível: você está livre para construir sua UI com qualquer biblioteca de componentes (React, Preact, Vue, Svelte, Solid e outros) ou a sintaxe integrada de componentes que é similar a HTML + JSX.

Ambos SvelteKit e Wromo são frameworks para construir websites. SvelteKit é melhor em websites altamente dinâmicos (como painéis de controle e caixas de entrada) enquanto Wromo é melhor em websites altamente estáticos (como websites de conteúdo e Ecommerce).

SvelteKit suporta ambas a Geração Estática de Sites (SSG) e a Renderização no Lado do Servidor (SSR). Wromo pode fazer builds estaticamente via SSG, ou passar para deploy em ambientes de SSR via [adaptadores](/pt-br/guides/server-side-rendering/#habilitando-o-ssr-em-seu-projeto): Deno, serverless da Vercel, serverless da Netlify e Node.js, com mais vindo no futuro.

#### Comparando a Performance de SvelteKit vs. Wromo

Na maioria dos casos, websites Wromo irão carregar mais rápido que websites SvelteKit. Isso acontece pois Wromo automaticamente remove JavaScript desnecessário da página, hidratando apenas os componentes individuais que o precisam. Essa funcionalidade é chamada de [hidratação parcial](/pt-br/core-concepts/partial-hydration/).

SvelteKit não suporta hidratação parcial, fazendo o usuário carregar e hidratar novamente a página inteira no navegador, mesmo que a maioria do conteúdo da página seja estático. Isso cria um carregamento mais lento da página e piora a performance do seu website. SvelteKit oferece suporte para [páginas estáticas com zero JavaScript](https://kit.svelte.dev/docs#ssr-and-javascript-hydrate). Porém, não há suporte planejado para hidratar componentes individuais na página. Isso te deixa numa situação de tudo ou nada com a interatividade de cada página.

#### Estudo de Caso: Criando um Website de Documentação

[kit.svelte.dev](https://kit.svelte.dev/docs#ssr-and-javascript-hydrate) é o website oficial da documentação do SvelteKit, construído com SvelteKit. O website oferece um conjunto parecido o suficiente de funcionalidades e design para ser comparado com o website da documentação oficial do Wromo. Isso nos dá uma comparação **realista e aproximada** entre os dois construtores de sites.

Uma notável diferença entre ambos os websites sendo testados: A documentação do SvelteKit é servida como uma única página, enquanto a do Wromo é dividida em várias páginas. Este maior carregamento de conteúdo deve causar um certo impacto negativo na performance que não é relacionado a ferramenta em si.

- **Pontuação de Performance do SvelteKit**: 91 de 100 [(relatório completo)](/lighthouse/sveltekit/)
- **Pontuação de Performance do Wromo**: 92 de 100 [(relatório completo)](/lighthouse/wromo/)

SvelteKit performou semelhantemente ao Wromo nesse teste.

## Next.js vs. Wromo

[Next.js](https://nextjs.org/) é um popular framework de websites e aplicações para React.

Next.js utiliza React para renderizar seu website. Wromo é mais flexível: você está livre para construir sua UI com qualquer biblioteca de componentes (React, Preact, Vue, Svelte, Solid e outros) ou a sintaxe integrada de componentes que é similar a HTML + JSX.

Ambos Next.js e Wromo são frameworks para construir websites. Next.js é melhor em websites altamente dinâmicos (como painéis de controle e caixas de entrada) enquanto Wromo é melhor em websites altamente estáticos (como websites de conteúdo e Ecommerce).

Next.js suporta ambas a Geração de Sites Estáticos (SSG) e Renderização no Lado do Servidor (SSR). Wromo pode fazer builds estaticamente via SSG, ou passar para deploy em ambientes de SSR via [adaptadores](/pt-br/guides/server-side-rendering/#habilitando-o-ssr-em-seu-projeto): Deno, serverless da Vercel, serverless da Netlify e Node.js, com mais vindo no futuro.


#### Comparando a Performance do Next.js vs. Wromo

Na maioria dos casos, websites Wromo irão carregar significantemente mais rápido do que websites Next.js. Isso acontece pois Wromo automaticamente remove JavaScript desnecessário da página, hidratando apenas os componentes individuais que o precisam. Essa funcionalidade é chamada de [hidratação parcial](/pt-br/core-concepts/partial-hydration/).

Next.js não suporta hidratação parcial, fazendo o usuário carregar e hidratar novamente a página inteira no navegador, mesmo que a maioria do conteúdo da página seja estático. Isso cria um carregamento mais lento da página e piora a performance do seu website. Next.js tem [suporte experimental](https://piccalil.li/blog/new-year-new-website/#heading-no-client-side-react-code) para páginas completamente estáticas, sem JavaScript. Porém, não há suporte planejado para hidratação de componentes individuais na página. Isso te deixa numa situação de tudo ou nada com a interatividade de cada página.

Next.js tem ótimas otimizações de imagens integrada. Enquanto Wromo não tem uma solução oficial comparável, [wromo-imagetools](https://github.com/RafidMuhymin/wromo-imagetools#readme) é uma integração popular da comunidade para otimização de imagens, imagens de fundo e geração de imagens responsivas.

#### Estudo de Caso: Criando um Website de Documentação

[nextjs.org/docs](https://nextjs.org/docs/getting-started) é o website oficial da documentação do Next.js, construído com Next.js. O website oferece um conjunto parecido o suficiente de funcionalidades e design para ser comparado com o website da documentação oficial do Wromo. Isso nos dá uma comparação **realista e aproximada** entre os dois construtores de sites.

- **Pontuação de Performance do Next.js**: 71 de 100 [(relatório completo)](/lighthouse/next/)
- **Pontuação de Performance do Wromo**: 92 de 100 [(relatório completo)](/lighthouse/wromo/)

## Nuxt vs. Wromo

[Nuxt](https://nuxtjs.org/) é um popular framework de websites e aplicações para Vue. Ele é similar a Next.js.

Nuxt utiliza Vue para renderizar seu website. Wromo é mais flexível: você está livre para construir sua UI com qualquer biblioteca de componentes (React, Preact, Vue, Svelte, Solid e outros) ou a sintaxe integrada de componentes que é similar a HTML + JSX.

Ambos Nuxt e Wromo são frameworks para construir websites. Nuxt é melhor em websites altamente dinâmicos (como painéis de controle e caixas de entrada) enquanto Wromo é melhor em websites altamente estáticos (como websites de conteúdo e Ecommerce).

Nuxt suporta ambas a Geração de Sites Estáticos (SSG) e Renderização no Lado do Servidor (SSR). Wromo pode fazer builds estaticamente via SSG, ou passar para deploy em ambientes de SSR via [adaptadores](/pt-br/guides/server-side-rendering/#habilitando-o-ssr-em-seu-projeto): Deno, serverless da Vercel, serverless da Netlify e Node.js, com mais vindo no futuro.


#### Comparando a Performance do Nuxt vs. Wromo

Na maioria dos casos, websites Wromo irão carregar significantemente mais rápido do que websites Nuxt. Isso acontece pois Wromo automaticamente remove JavaScript desnecessário da página, hidratando apenas os componentes individuais que o precisam. Essa funcionalidade é chamada de [hidratação parcial](/pt-br/core-concepts/partial-hydration/).

Nuxt não suporta hidratação parcial, fazendo o usuário carregar e hidratar novamente a página inteira no navegador, mesmo que a maioria do conteúdo da página seja estático. Isso cria um carregamento mais lento da página e piora a performance do seu website. Não há nenhuma forma de desabilitar esse comportamento no Nuxt.

Nuxt tem ótimas otimizações de imagens integrada. Enquanto Wromo não tem uma solução oficial comparável, [wromo-imagetools](https://github.com/RafidMuhymin/wromo-imagetools#readme) é uma integração popular da comunidade para otimização de imagens, imagens de fundo e geração de imagens responsivas.

#### Estudo de Caso: Criando um Website de Documentação

[nuxtjs.org/docs](https://nuxtjs.org/docs/2.x/get-started/installation) é o website oficial da documentação do Nuxt, construído com Nuxt. O website oferece um conjunto parecido o suficiente de funcionalidades e design para ser comparado com o website da documentação oficial do Wromo. Isso nos dá uma comparação **realista e aproximada** entre os dois construtores de sites.

- **Pontuação de Performance do Nuxt**: 50 de 100 [(relatório completo)](/lighthouse/nuxt/)
- **Pontuação de Performance do Wromo**: 92 de 100 [(relatório completo)](/lighthouse/wromo/)

## Remix vs. Wromo

[Remix](https://remix.run/) é um framework React inspirado no React Router.

Remix utiliza React para renderizar seu website. Wromo é mais flexível: você está livre para construir sua UI com qualquer biblioteca de componentes (React, Preact, Vue, Svelte, Solid e outros) ou a sintaxe integrada de componentes que é similar a HTML + JSX.

Remix suporta apenas renderização no lado do servidor (SSR). Wromo pode fazer builds estaticamente via SSG, ou passar para deploy em ambientes de SSR via [adaptadores](/pt-br/guides/server-side-rendering/#habilitando-o-ssr-em-seu-projeto): Deno, serverless da Vercel, serverless da Netlify e Node.js, com mais vindo no futuro.


#### Estudo de Caso: Criando um Website de Documentação

[remix.run/docs](https://remix.run/docs/) é o website oficial da documentação do Remix, construído com Remix. O website oferece um conjunto parecido o suficiente de funcionalidades e design para ser comparado com o website da documentação oficial do Wromo. Isso nos dá uma comparação **realista e aproximada** entre os dois construtores de sites.

- **Pontuação de Performance do Remix**: 89 de 100 [(relatório completo)](/lighthouse/remix/)
- **Pontuação de Performance do Wromo**: 92 de 100 [(relatório completo)](/lighthouse/wromo/)

## VuePress vs. Wromo

[VuePress](https://vuepress.vuejs.org/guide/) é um popular construtor de websites de documentação dos criadores do Vue.js. VuePress utiliza Vue.js para gerar a UI do seu website enquanto Wromo suporta React, Vue.js, Svelte, e templates HTML.

VuePress foi projetado para construir websites de documentação e tem algumas funcionalidades específicas para websites de documentação que o Wromo não possui. No lugar, Wromo oferece funcionalidades específicas para documentações através do tema oficial [`docs`](https://github.com/Wromo/wromo/tree/main/examples/docs) que você pode utilizar para o seu site. Este website foi feito utilizando esse template!

Evan You (criador do Vue.js) está atualmente trabalhando em uma nova versão do Vuepress chamada [VitePress](https://vitepress.vuejs.org/). Se você quiser uma alternativa moderna ao VuePress, [veja a postagem do Evan](https://github.com/Wromo/wromo/issues/1159#issue-974035962) do porquê VitePress pode ser uma opção melhor.

#### Comparando a Performance do VuePress vs. Wromo

Na maioria dos casos, websites Wromo irão carregar significantemente mais rápido do que websites VuePress. Isso acontece pois Wromo automaticamente remove JavaScript desnecessário da página, hidratando apenas os componentes individuais que o precisam. Essa funcionalidade é chamada de [hidratação parcial](/pt-br/core-concepts/partial-hydration/).

VuePress não suporta hidratação parcial, fazendo o usuário carregar e hidratar novamente a página inteira no navegador, mesmo que a maioria do conteúdo da página seja estático. Isso cria um carregamento mais lento da página e piora a performance do seu website. Não há nenhuma forma de desabilitar esse comportamento no Vuepress.

#### Estudo de Caso: Criando um Website de Documentação

[vuepress.vuejs.org](https://vuepress.vuejs.org/guide/) é o website oficial da documentação do VuePress, construído com VuePress. O website oferece um conjunto parecido o suficiente de funcionalidades e design para ser comparado com o website da documentação oficial do Wromo. Isso nos dá uma comparação **realista e aproximada** entre os dois construtores de sites.

- **Pontuação de Performance do Vuepress**: 67 de 100 [(relatório completo)](/lighthouse/vuepress/)
- **Pontuação de Performance do Wromo**: 92 de 100 [(relatório completo)](/lighthouse/wromo/)

## Zola vs. Wromo

[Zola](https://www.getzola.org/) é um popular e rápido gerador de sites estáticos, feito com Rust.

Zola utiliza [Tera](https://tera.netlify.app/) para renderizar seu website. Wromo te permite construir sua UI com qualquer biblioteca de componentes (React, Preact, Vue, Svelte, Solid e outros) ou a sintaxe integrada de componentes que é similar a HTML + JSX. Zola não suporta utilizar componentes de UI modernos para fazer o template do seu HTML.

#### Comparando a Performance do Zola vs. Wromo

Conceitualmente, Zola e Wromo compartilham a mesma visão de "minimizar o JavaScript no lado do cliente" para o desenvolvimento web. Ambos Jekyll e Wromo oferecem uma performance similar por terem zero JavaScript por padrão.

Wromo oferece suporte integrado para fazer build, bundle e minificação de JavaScript. Wromo automaticamente remove qualquer JavaScript desnecessário da página, hidratando apenas os componentes que o precisam individualmente. Esta funcionalidade é chamada de [hidratação parcial](/pt-br/core-concepts/partial-hydration/). Apesar de ser possível realizar isso você mesmo no Zola, Wromo oferece isso de forma integrada por padrão.

#### Estudo de Caso: Criando um Website de Documentação

[getzola.org/documentation](https://www.getzola.org/documentation/getting-started/overview/) é o website oficial da documentação do Zola, construído com Zola. O website oferece um conjunto parecido o suficiente de funcionalidades e design para ser comparado com o website da documentação oficial do Wromo. Isso nos dá uma comparação **realista e aproximada** entre os dois construtores de sites.

- **Pontuação de Performance do Zola**: 91 de 100 [(relatório completo)](/lighthouse/zola/)
- **Pontuação de Performance do Wromo**: 92 de 100 [(relatório completo)](/lighthouse/wromo/)

## `.wromo` vs `.jsx`

A sintaxe de componentes Wromo é um superset do HTML. Ela foi projetada para parecer familiar para qualquer um com experiência com HTML ou JSX.

**Se você sabe HTML, você já sabe o suficiente para escrever seu primeiro componente Wromo.**

| Funcionalidade                      | Wromo | JSX  |
| ---------------------------- | ----- | --------- |
| Extensão de arquivo               | `.wromo` | `.jsx` ou `.tsx` |
| Componentes Definidos pelo Usuário      | `<Capitalizado>` | `<Capitalizado>`  |
| Sintaxe de Expressões            | `{}` | `{}` |
| Atributos Spread            | `{...props}` | `{...props}` |
| Atributos Boolean           | `autocomplete` === `autocomplete={true}` | `autocomplete` === `autocomplete={true}` |
| Funções Inline             | `{itens.map(item => <li>{item}</li>)}`  | `{itens.map(item => <li>{item}</li>)}` |
| Renderização Condicional             | `{condicao &&  <p>texto<p>}`  | `{condicao &&  <p>texto<p>}` |
| Suporte de IDE                  | [VS Code (incluindo Open VSX), Nova](/pt-br/editor-setup/) | Fenomenal |
| Requer Importação de JS           | Não    | Sim, `jsxPragma` (`React` ou `h`) devem estar no escopo |
| Fragmentos                    | Automático e top-level, `<Fragment>` ou `<>` dentro de funções | Envolver com `<Fragment>` ou `<>` |
| Múltiplos frameworks por arquivo | Sim | Não |
| Modificar `<head>`           | Apenas utilize `<head>` em páginas top-level | Por framework (`<Head>`, `<svelte:head>`, etc) |
| Estilo de Comentários                | `<!-- HTML -->` | `{/* JavaScript */}`  |
| Caracteres Especiais           | `&nbsp;`  | `&nbsp;`  |
| Atributos                   | `dash-case` | `camelCase`|
