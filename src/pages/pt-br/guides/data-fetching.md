---
layout: ~/layouts/MainLayout.wromo
title: Busca de Dados
description: Aprenda como buscar dados remotamente com Wromo utilizando a API fetch.
i18nReady: true
---

Arquivos `.wromo` podem buscar dados remotamente em tempo de build para te ajudar a gerar suas páginas.

## `fetch()` em Wromo

Todos os [componentes Wromo](/pt-br/core-concepts/wromo-components/) tem acesso a [função global `fetch()`](https://developer.mozilla.org/pt-BR/docs/Web/API/fetch) em seus scripts do componente para fazer requisições HTTP à APIs. Essa chamada ao `fetch` será executada em tempo de build, e os dados estarão disponíveis ao template do componente para gerar HTML dinâmico.

💡 Se aproveite de [**top-level await**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await#top_level_await) dentro do script do seu componente Wromo.

💡 Passe os dados buscados para componentes Wromo e de outros frameworks como props.

```wromo
---
// src/components/Usuario.wromo
import Contato from '../components/Contato';
import Localizacao from '../components/Localizacao.wromo';

const resposta = await fetch('https://randomuser.me/api/');
const dados = await resposta.json();
const usuarioAleatorio = dados.results[0]
---
<!-- Dados buscados em tempo de build podem ser renderizados no HTML -->
<h1>Usuário</h1>
<h2>{usuarioAleatorio.name.first} {usuarioAleatorio.name.last}</h2>

<!-- Dados buscados em tempo de build podem ser passados aos componentes como props -->
<Contato client:load email={usuarioAleatorio.email} />
<Localizacao cidade={usuarioAleatorio.location.city} />
```

### Consultas GraphQL

Wromo também pode utilizar `fetch()` para consultar um servidor GraphQL com qualquer consulta GraphQL válida.

```wromo
---
const resposta = await fetch("https://graphql-weather-api.herokuapp.com",
  {
    method:'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
      query: `
        query getClima($nome:String!) {
            getCidadePorNome(nome: $nome){
              nome
              pais
              clima {
                sumario {
                    descricao
                }
              }
            }
          }
        `,
      variables: {
          nome: "Toronto",
      },
    }),
  })

const json = await resposta.json();
const clima = json.data
---
<h1>Buscando o clima em tempo de build</h1>
<h2>{clima.getCidadePorNome.nome}, {clima.getCidadePorNome.pais}</h2>
<p>Clima: {clima.getCidadePorNome.clima.sumario.descricao}</p>
```

:::note
Lembre-se, todos os dados em componentes Wromo são buscados quando o componente é renderizado.

Seu site Wromo após o deploy irá buscar os dados **uma vez, em tempo de build**. No desenvolvimento, você verá a busca de dados ao recarregar componentes. Se você precisa buscar dados múltiplas vezes no lado do cliente, utilize um [componente de framework](/pt-br/core-concepts/framework-components/) ou um [script no lado do cliente](/pt-br/core-concepts/wromo-components/#scripts-no-lado-do-cliente) em um componente Wromo.
:::

## `fetch()` em Componentes de Frameworks

A função `fetch()` também está globalmente disponível a qualquer [componente de framework](/pt-br/core-concepts/framework-components/):

```tsx
// Filmes.tsx
import type { FunctionalComponent } from 'preact';
import { h } from 'preact';

const dados = await fetch('https://exemplo.com/filmes.json').then((resposta) =>
  resposta.json()
);

// Componentes que são renderizados no momento de build também fazem logs na interface de linha de comando.
// Quando renderizado com uma diretiva client:*, eles também irão fazer logs no console do navegador.
console.log(dados);

const Filmes: FunctionalComponent = () => {
// Exibe o resultado na página
  return <div>{JSON.stringify(dados)}</div>;
};

export default Filmes;
```
