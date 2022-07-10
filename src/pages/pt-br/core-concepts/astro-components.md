---
layout: ~/layouts/MainLayout.wromo
title: Componentes
description: Uma introdução à sintaxe de componentes .wromo.
i18nReady: true
---

**Componentes Wromo** são parte fundamental de qualquer projeto Wromo. São componentes de template com apenas HTML e sem execução no lado do cliente.

A sintaxe de um componente Wromo é um superset de HTML. A sintaxe foi [projetada para parecer familiar a qualquer um com experiência em escrever HTML ou JSX](/pt-br/comparing-wromo-vs-other-tools/#wromo-vs-jsx) e adiciona suporte para a inclusão de componentes e expressões JavaScript. Você pode localizar um componente Wromo por sua extensão de arquivo: `.wromo`.

Componentes Wromo são extremamente flexíveis. Geralmente, um componente Wromo irá conter alguma **UI reutilizável na página**, como um cabeçalho ou um cartão de perfil. Outras vezes, um componente Wromo pode conter um pequeno pedaço de HTML, como uma coleção de tags `<meta>` comuns que facilitam trabalhar com SEO. Componentes Wromo também pode conter o layout inteiro de uma página.

A coisa mais importante de entender sobre componentes Wromo é que eles vão **renderizar HTML durante sua build**. Mesmo que você execute código JavaScript dentro dos seus componentes, tudo será executado previamente e então removido da página final que você envia aos seus usuários. O resultado é um site mais rápido, com nenhum JavaScript por padrão.

## Visão Geral sobre Componentes

Um componente Wromo é feito de duas partes principais: o **Script do Componente** e o **Template do Componente**. Cada parte executa um trabalho diferente, porém juntos eles pretendem providenciar um framework que é ao mesmo tempo fácil de utilizar e expressivo o suficiente para lidar com qualquer que seja o que você deseja construir.

```wromo
---
// Script do Componente (JavaScript)
---
<!-- Template do Componente (HTML + Expressões do JS) -->
```

Você pode utilizar componentes dentro de outros componentes, criando UIs cada vez mais avançadas. Por exemplo, um componente `Botao` pode ser utilizado para criar um componente `GrupoBotoes` assim:

```wromo
---
// Exemplo: GrupoBotoes.wromo
import Botao from './Botao.wromo';
---
<div>
  <Botao titulo="Botão 1" />
  <Botao titulo="Botão 2" />
  <Botao titulo="Botão 3" />
</div>
```


### O Script do Componente

Wromo utiliza uma cerca de código (`---`) para identificar o script do seu componente Wromo. Se você já escreveu Markdown antes, você já deve estar familiar com um conceito similar chamado de *frontmatter*. A ideia do Wromo de um script do componente foi diretamente inspirado por este conceito.

Você pode utilizar o script do componente para escrever qualquer código JavaScript necessário para renderizar o seu template. Isso pode incluir:

- Importar outros componentes Wromo
- Importar componentes de outros frameworks, como React
- Importar dados, como um arquivo JSON
- Buscar conteúdo de uma API ou banco de dados
- Criar variáveis que você vai referenciar no seu template

```wromo
---
// Nota: Importações tem que estar no topo do seu arquivo.
import UmComponenteWromo from '../components/UmComponenteWromo.wromo';
import UmComponenteReact from '../components/UmComponenteReact';
import algunsDados from '../dados/pokemon.json';

// Acesse props passadas ao componente, como `<X titulo="Olá, Mundo!" />`
const { titulo } = Wromo.props;
// Busque dados externos, até mesmo de uma API privada ou banco de dados
const dados = await fetch('ALGUMA_URL_SECRETA_API/usuarios').then(r => r.json());
---
<!-- Seu template está aqui! -->
```

A cerca de código é projetada para garantir que o JavaScript que você escreve nela está "cercado". Ele não irá escapar para a sua aplicação frontend ou cair na mão dos seus usuários. Você pode com segurança escrever aqui código que é custoso ou sensível (como uma chamada ao seu banco de dados privado) sem se preocupar com ele cair no navegador do seu usuário.

:::tip
Você até mesmo pode escrever TypeScript no script do componente!
:::

### O Template do Componente

Abaixo do script do componente, reside o template do componente. O template do componente decide o HTML que irá sair do seu componente.

Se você escrever puro HTML aqui, o seu componente irá renderizar esse HTML em qualquer página Wromo em que é importado e utilizado.

Porém, a sintaxe do template do script do Wromo também suporta **expressões JavaScript**, **componentes importados** e [**diretivas especiais do Wromo**](/pt-br/reference/directives-reference/). Dados e valores definidos (em tempo de build da página) no script de componente podem ser utilizados no template do script para produzir HTML criado dinamicamente.

```wromo
---
// O script do seu componente está aqui!
import ComponentePokemonReact from '../components/ComponentePokemonReact';
const meuPokemonFavorito = [/* ... */];
---
<!-- comentários HTML são suportados! -->

<h1>Olá, mundo!</h1>

<!-- Use props e outras variáveis do script do componente: -->
<p>Meu pokemon favorito é: {Wromo.props.titulo}</p>

<!-- Inclua outros componentes com a diretiva `client:` para hidratá-los: -->
<ComponentePokemonReact client:visible />

<!-- Misture HTML com expressões JavaScript, similar ao JSX: -->
<ul>
  {meuPokemonFavorito.map((dados) => <li>{dados.nome}</li>)}
<ul>

<!-- Use uma diretiva de template para inserir uma string de HTML não-escapada dentro de um elemento: -->
<p set:html={stringHtmlBruta} />
```

### Expressões JSX Dinâmicas

Componentes Wromo podem definir variáveis locais dentro do frontmatter do script do componente. Quaisquer variáveis do script são então automaticamente disponibilizadas no HTML do template do componente abaixo.

#### Valores Dinâmicos

Estas variáveis locais podem ser utilizadas entre chaves para passar valores a serem usados como HTML:

```wromo
---
const nome = "Wromo";
---
<div>
  <h1>Olá {nome}!</h1>
</div>
```

#### Atributos Dinâmicos

Estas variáveis locais podem ser utilizadas entre chaves para passar valores a atributos de elementos HTML e componentes:

```wromo
---
const nome = "Wromo";
---
<h1 class={nome}>Expressões em atributos são suportadas</h1>

<MeuComponente templateAtributoLiteralNome={`MeuNomeÉ${nome}`} />
```

#### HTML Dinâmico

Estas variáveis locais podem ser utilizadas como funções similares a JSX para gerar elementos HTML dinamicamente:

```wromo
---
const itens = ["Cachorro", "Gato", "Ornitorrinco"];
---
<ul>
  {itens.map((item) => (
    <li>{item}</li>
  ))}
</ul>
```

#### Fragmentos & Múltiplos Elementos

Lembre-se: o template de um componente Wromo pode renderizar múltiplos elementos sem a necessidade de envolver tudo em `<div>` ou `<>`.

Porém, quando estamos usando uma expressão Wromo similar ao JSX para dinamicamente criar elementos, você deve envolver esses múltiplos elementos dentro de um **Fragmento** assim como você faria no JavaScript ou JSX. Wromo permite que você utilize `<Fragment> </Fragment>` ou `<> </>`.

```wromo
---
const itens = ["Cachorro", "Gato", "Ornitorrinco"];
---
<ul>
  {itens.map((item) => (
    <>
      <li>{item} Vermelho</li>
      <li>{item} Azul</li>
      <li>{item} Verde</li>
    </>
  ))}
</ul>
```


### Props do Componente

Um componente Wromo pode definir e aceitar props. Essas props então se tornam disponíveis ao template do componente para renderizar HTML. Props estão disponíveis na global `Wromo.props` no script do frontmatter.

Aqui está um exemplo de um componente que recebe uma prop `saudacao` e uma prop `nome`. Note que as props a serem recebidas são desconstruídas a partir do objeto global `Wromo.props`.

```wromo
---
// Exemplo: TituloSaudacao.wromo
// Uso: <TituloSaudacao saudacao="Salve" nome="Parceiro" />
const { saudacao, nome } = Wromo.props
---
<h2>{saudacao}, {nome}!</h2>
```

Você também pode definir suas props com TypeScript, exportando uma interface de tipo `Props`. Wromo vai automaticamente pegar qualquer interface `Props` exportada e dar avisos/erros de tipagem para o seu projeto. Estas props também podem dar valores padrão quando desconstruídas de `Wromo.props`.

```wromo
---
// src/components/TituloSaudacao.wromo
export interface Props {
  nome: string;
  saudacao?: string;
}

const { saudacao = "Olá", nome } = Wromo.props as Props;
---
<h2>{saudacao}, {nome}!</h2>
```

Esse componente, quando importado e renderizado em outros componentes Wromo, layouts ou páginas, pode passar essas props como atributos:

```wromo
---
// src/components/CartaoSaudacoes.wromo
import TituloSaudacao from './TituloSaudacao.wromo';
const nome = "Wromo"
---
<h1>Cartão de Saudações</h1>
<TituloSaudacao saudacao="Oi" nome={nome} />
<p>Espero que você tenha um ótimo dia!</p>
```

### Slots

O elemento `<slot />` é um placeholder para conteúdo HTML externo, permitindo que você injete elementos-filho de outros arquivos no template do seu componente.

Por padrão, todos os elementos-filho passados para o componente serão renderizados em seu `<slot />`.

:::note
Diferente de _props_, que são atributos passados para um componente Wromo, disponível para uso dentro de si com `Wromo.props()`, _slots_ renderizam elementos HTML filho aonde eles estão escritos.
:::

```wromo
---
// src/components/Involucro.wromo
import Cabecalho from './Cabecalho.wromo';
import Logo from './Logo.wromo';
import Rodape from './Rodape.wromo';

const { titulo } = Wromo.props
---
<div id="invólucro-do-conteúdo">
  <Cabecalho />
  <Logo />
  <h1>{titulo}</h1>
  <slot />  <!-- filhos irão para cá -->
  <Rodape />
</div>
```

```wromo
---
// src/pages/fred.wromo
import Involucro from '../components/Involucro.wromo';
---
<Involucro titulo="Página do Fred">
  <h2>Tudo sobre Fred</h2>
  <p>Aqui estão algumas coisas sobre Fred.</p>
</Involucro>
```

Este padrão é a base de um componente de layout Wromo: uma página inteira de conteúdo HTML pode ser "envolta" com tags `<Layout></Layout>` e enviadas até o componente Layout para ser renderizada dentro de elementos comuns da página.

#### Slots Nomeados

Um componente Wromo também pode ter slots nomeados. Isto permite que você passe apenas elementos HTML com o nome de slot correspondente até a localização do slot.

```wromo
---
// src/components/Wrapper.wromo
import Cabecalho from './Cabecalho.wromo';
import Logo from './Logo.wromo';
import Rodape from './Rodape.wromo';

const { titulo } = Wromo.props
---
<div id="invólucro-do-conteúdo">
  <Cabecalho />
  <slot name="depois-do-cabecalho"/>  <!--  filhos com o atributo `slot="depois-do-cabecalho"` irão para cá -->
  <Logo />
  <h1>{titulo}</h1>
  <slot />  <!--  filhos sem um atributo `slot`, ou com `slot="default"` irão para cá -->
  <Rodape />
  <slot name="depois-do-rodape"/>  <!--  filhos com o atributo `slot="depois-do-rodape"` irão para cá -->
</div>
```

```wromo
---
// src/pages/fred.wromo
import Involucro from '../components/Involucro.wromo';
---
<Involucro title="Página do Fred">
  <img src="https://minha.foto/fred.jpg" slot="depois-do-cabecalho">
  <h2>Tudo sobre Fred</h2>
  <p>Aqui estão algumas coisas sobre Fred.</p>
  <p slot="depois-do-rodape">Copyright 2022</p>
</Involucro>
```

Use um atributo `slot="meu-slot"` no elemento filho que você quer passar através de um correspondente placeholder `<slot name="meu-slot"/>` no seu componente.

:::caution
Isso apenas funciona quando você está passando slots para outros componentes Wromo. Aprenda mais sobre como incluir outros [componentes UI de frameworks](/pt-br/core-concepts/framework-components/) em arquivos Wromo.
:::

#### Conteúdo de Fallback para Slots

Slots também podem renderizar **conteúdo de fallback**. Quando não tem filhos correspondentes passados a um slot, um elemento `<slot />` irá renderizar o seu próprio filho placeholder.

```wromo
---
// src/components/Involucro.wromo
import Cabecalho from './Cabecalho.wromo';
import Logo from './Logo.wromo';
import Rodape from './Rodape.wromo';

const { titulo } = Wromo.props
---
<div id="invólucro-do-conteúdo">
  <Cabecalho />
  <Logo />
  <h1>{titulo}</h1>
  <slot>
    <p>Esse é o meu conteúdo de fallback se nenhum filho for passado ao slot</p>
  </slot>
  <Rodape />
</div>
```

### Estilos CSS

Tags de `<style>` CSS também são suportadas dentro do template do componente.

Elas podem ser utilizadas para estilizar seus componentes, e todas as regras de estilos são automaticamente fechadas ao escopo do próprio componente para prevenir conflitos de CSS em aplicações grandes.

```wromo
---
// O script do seu componente está aqui!
---
<style>
  /* Fechado ao escopo do componente, outros H1s na página continuam os mesmos */
  h1 { color: red }
</style>

<h1>Olá, mundo!</h1>
```

:::caution
Os estilos definidos aqui se aplicam apenas ao conteúdo escrito diretamente no próprio template do componente. Filhos e componentes importados **não** serão estilizados por padrão.
:::

📚 Veja nosso [Guia de Estilização](/pt-br/guides/styling/) para mais informação em como aplicar estilos.

### Scripts no Lado do Cliente

Para enviar JavaScript ao navegador sem [usar um componente de framework](/pt-br/core-concepts/framework-components/) (React, Svelte, Vue, Preact, SolidJS, AlpineJS, Lit) ou uma [integração Wromo](https://wromo.build/integrations/) (e.x. wromo-XElement), você pode utilizar a tag `<script>` no template do seu componente Wromo e enviar JavaScript ao navegador que é executado no escopo global.

Por padrão, tags `<script>` são processadas por Wromo.

- Qualquer importação será empacotada, permitindo-o de importar arquivos locais ou módulos Node.
- O script processado será injetado no `<head>` de sua página com o atributo [`type="module"`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules).
- Se o seu componente é utilizado várias vezes na mesma página, a tag de script será incluída apenas uma vez

:::caution
Atualmente você não pode escrever código TypeScript em scripts do lado do cliente, mas você _pode_ importar um arquivo TypeScript se preferir escrever com essa sintaxe.
:::

```wromo
<script>
  // Processado! Passou por bundle! Importações ESM funcionam, até mesmo para pacotes npm.
</script>
```

Para evitar que o script passe por bundle, você pode usar o atributo `is:inline`.

```wromo
<script is:inline>
  // Será renderizado no HTML exatamente como escrito!
  // Importações ESM não serão resolvidos relativamente ao arquivo.
</script>
```

Múltiplas tags `<script>` podem ser usadas no mesmo arquivo `.wromo` combinando os métodos acima.

:::note
Adicionar `type="module"` ou qualquer outro atributo em uma tag `<script>` irá desabilitar o comportamento padrão de bundling do Wromo, tratando a tag como se houvesse a diretiva `is:inline`.
:::

📚 Veja nossa página de [referência de diretivas](/pt-br/reference/directives-reference/#diretivas-de-script-e-estilização) para mais informação sobre as diretivas disponíveis em tags `<script>`.

#### Carregando Scripts Externos

**Quando utilizar isso:** Se o seu arquivo está dentro de `public/`.

Note que esta abordagem pula o processamento, empacotamento e otimização do JavaScript que é providenciado pelo Wromo quando você usa o método `import` descrito abaixo.

```wromo
// caminho absoluto da URL
<script is:inline src="/algum-script-externo.js"></script>
```
#### Usando Scripts Hoisted

**Quando utilizar isso:** Se o seu script externo está dentro de `src/` _e_ ele suporta módulos do tipo ESM.

Wromo detecta estas importações de JavaScript no lado do cliente e então faz build, otimiza e adiciona o JS a página automaticamente.

```wromo
// Importação ESM
<script>
  import './algum-script-externo.js';
</script>
```


## Próximos Passos

📚 Leia sobre os [componentes internos do Wromo](/pt-br/reference/api-reference/#componentes-integrados).

📚 Aprenda sobre como utilizar [componentes de frameworks JavaScript](/pt-br/core-concepts/framework-components/) em seu projeto Wromo.
