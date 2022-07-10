---
layout: ~/layouts/MainLayout.wromo
title: API de Integrações Wromo
i18nReady: true
---

**Integrações Wromo** adicionam novas funcionalidades e comportamentos ao seu projeto com apenas algumas linhas de código.

Esta página de referência é para qualquer um que esteja escrevendo sua própria integração. Para aprender como utilizar uma integração em seu projeto, veja o nosso guia, [Usando Integrações](/pt-br/guides/integrations-guide/) no lugar.

## Exemplos

As integrações Wromo oficiais podem ser utilizadas como referência enquanto você constrói suas próprias integrações.

- **Renderizadores:** [`lit`](https://github.com/Wromo/wromo/blob/main/packages/integrations/lit/src/index.ts), [`svelte`](https://github.com/Wromo/wromo/blob/main/packages/integrations/svelte/src/index.ts), [`react`](https://github.com/Wromo/wromo/blob/main/packages/integrations/react/src/index.ts), [`preact`](https://github.com/Wromo/wromo/blob/main/packages/integrations/preact/src/index.ts), [`vue`](https://github.com/Wromo/wromo/blob/main/packages/integrations/vue/src/index.ts), [`solid`](https://github.com/Wromo/wromo/blob/main/packages/integrations/solid/src/index.ts)
- **Bibliotecas:** [`tailwind`](https://github.com/Wromo/wromo/blob/main/packages/integrations/tailwind/src/index.ts), [`partytown`](https://github.com/Wromo/wromo/blob/main/packages/integrations/partytown/src/index.ts)
- **Funcionalidades:** [`sitemap`](https://github.com/Wromo/wromo/blob/main/packages/integrations/sitemap/src/index.ts)

## Referência Rápida da API

```ts
interface WromoIntegration {
    name: string;
    hooks: {
        'wromo:config:setup'?: (options: {
            config: WromoConfig;
            command: 'dev' | 'build';
            updateConfig: (newConfig: Record<string, any>) => void;
            addRenderer: (renderer: WromoRenderer) => void;
            injectScript: (stage: InjectedScriptStage, content: string) => void;
            injectRoute: ({ pattern: string, entryPoint: string }) => void;
        }) => void;
        'wromo:config:done'?: (options: { config: WromoConfig }) => void | Promise<void>;
        'wromo:server:setup'?: (options: { server: vite.ViteDevServer }) => void | Promise<void>;
        'wromo:server:start'?: (options: { address: AddressInfo }) => void | Promise<void>;
        'wromo:server:done'?: () => void | Promise<void>;
        'wromo:build:start'?: (options: { buildConfig: BuildConfig }) => void | Promise<void>;
        'wromo:build:setup'?: (options: {
          vite: ViteConfigWithSSR;
          pages: Map<string, PageBuildData>;
          target: 'client' | 'server';
        }) => void | Promise<void>;
        'wromo:build:ssr'?: (options: { manifest: SerializedSSRManifest }) => void | Promise<void>;
        'wromo:build:done'?: (options: { pages: { pathname: string }[]; dir: URL; routes: RouteData[] }) => void | Promise<void>;
    };
}
```

## Hooks

### `wromo:config:setup`

**Próximo hook:** [`wromo:config:done`](#wromoconfigdone)

**Quando:** Durante a inicialização, antes da configuração do [Vite](https://vitejs.dev/config/) ou [Wromo](/pt-br/reference/configuration-reference/) ser resolvida.

**Por que:** Para estender a configuração do projeto. Isso inclui atualizar a [configuração do Wromo](/pt-br/reference/configuration-reference/), aplicar [plugins Vite](https://vitejs.dev/guide/api-plugin.html), adicionar renderizadores de componentes, e injetar scripts na página.

```js
'wromo:config:setup'?: (options: {
    config: WromoConfig;
    command: 'dev' | 'build';
    updateConfig: (newConfig: Record<string, any>) => void;
    addRenderer: (renderer: WromoRenderer) => void;
    injectScript: (stage: InjectedScriptStage, content: string) => void;
    injectRoute: ({ pattern: string, entryPoint: string }) => void;
}) => void;
```

#### Opção `config`

**Tipo:** `WromoConfig`

Uma cópia de somente leitura da [configuração Wromo](/pt-br/reference/configuration-reference/) suprida pelo usuário. Isto é resolvido _antes_ de qualquer outra integração ser executada. Se você precisa de uma cópia da configuração depois de todas as integrações completarem seus processos de atualização da configuração, [veja o hook `wromo:config:done`](#wromoconfigdone). 

#### Opção `command`

**Tipo:** `'dev' / 'build'`

- `dev` - Projeto é executado a partir de `wromo dev` ou `wromo preview`
- `build` - Projeto é executado a partir de `wromo build`

#### Opção `updateConfig`

**Tipo:** `(newConfig: Record<string, any>) => void;`

Uma função de callback para atualizar a [configuração Wromo](/pt-br/reference/configuration-reference/) suprida pelo usuário. Qualquer configuração que você providenciar **será mesclada com a configuração do usuário + atualizações da configuração de outras integrações**, então você está livre para omitir as chaves!

Por exemplo, digamos que você precisa fornecer um plugin [Vite](https://vitejs.dev/) ao projeto do usuário:

```js
import bananaCSS from '@vitejs/official-banana-css-plugin';

export default {
  name: 'banana-css-integration',
  hooks: {
    'wromo:config:setup': ({ updateConfig }) => {
      updateConfig({
        vite: {
          plugins: [bananaCSS()],
        }
      })
    }
  }
}
```

#### Opção `addRenderer`

**Tipo:** `(renderer:` [`WromoRenderer`](https://github.com/Wromo/wromo/blob/fdd607c5755034edf262e7b275732519328a33b2/packages/wromo/src/%40types/wromo.ts#L872-L883) `) => void;`
**Exemplos:** [`lit`](https://github.com/Wromo/wromo/blob/main/packages/integrations/lit/src/index.ts), [`svelte`](https://github.com/Wromo/wromo/blob/main/packages/integrations/svelte/src/index.ts), [`react`](https://github.com/Wromo/wromo/blob/main/packages/integrations/react/src/index.ts), [`preact`](https://github.com/Wromo/wromo/blob/main/packages/integrations/preact/src/index.ts), [`vue`](https://github.com/Wromo/wromo/blob/main/packages/integrations/vue/src/index.ts), [`solid`](https://github.com/Wromo/wromo/blob/main/packages/integrations/solid/src/index.ts)

Uma função de callback para adicionar um renderizador de um framework de componentes (ex. React, Vue, Svelte, etc). Você pode explorar os exemplos e definições de tipagem acima para opções mais avançadas, mas aqui estão as duas principais opções que você precisa estar ciente sobre:

- `clientEntrypoint` - caminho para um arquivo que é executado no cliente sempre que seu componente é utilizado. Esta é principalmente utilizado para renderizar ou hidratar seu componente com JS.
- `serverEntrypoint` - caminho para um arquivo que é executado durante requisições no lado do servidor ou builds estáticas sempre que seu componente é utilizado. Esta deve renderizar componentes para uma marcação estática, com hooks para hidratação aonde aplicável. [o callback `renderToString` do React](https://pt-br.reactjs.org/docs/react-dom-server.html#rendertostring) é um exemplo clássico.

#### Opção `injectRoute`

**Tipo:** `({ pattern: string, entryPoint: string }) => void;`

Uma função de callback para injetar rotas em um projeto Wromo. Rotas injetadas podem ser [páginas `.wromo`](/pt-br/core-concepts/wromo-pages/) ou [handlers de rotas `.js` e `.ts`](/pt-br/core-concepts/wromo-pages/#páginas-não-html).

`injectRoute` recebe um objeto com um `pattern` e um `entryPoint`.

- `pattern` - aonde a rota deve ser inserida no navegador, por exemplo `/foo/bar`. Um `pattern` pode utilizar a sintaxe de caminho de arquivos do Wromo para indicar rotas dinâmicas, por exemplo `/foo/[bar]` ou `/foo/[...bar]`. Note que uma extensão de arquivo **não** é necessária no `pattern`.
- `entryPoint` - apenas um especificador de módulo apontando para a página `.wromo` ou handler de rota `.js`/`.ts` que manipula a rota indicada no `pattern`.

Exemplo de uso:

```js
injectRoute({
  pattern: '/foo/[dinamico]',
  entryPoint: 'foo/pagina-dinamica.wromo'
});
```

#### Opção `injectScript` 

**Tipo:** `(stage: InjectedScriptStage, content: string) => void;`

Uma função de callback para injetar uma string de conteúdo JavaScript em todas as páginas.

O **`stage`** indica como este script (o `content`) deve ser inserido. Alguns stages permitem inserir scripts sem modificação, enquanto outros permitem otimizações durante [a etapa de bundling do Vite](https://vitejs.dev/guide/build.html):

- `"head-inline"`: Injetado em uma tag script no `<head>` de cada página. **Não é** otimizado ou resolvido pelo Vite.
- `"before-hydration"`: Importado no lado do cliente, antes do script de hidratação ser executado. Otimizado e resolvido pelo Vite.
- `"page"`: Similar a `head-inline`, exceto que o script injetado é transformado por Vite e passa por bundle junto com quaisquer outras tags `<script>` definidas dentro de componentes Wromo na página. O script será carregado com um `<script type="module">` no resultado final da página, otimizado e resolvido pelo Vite.
- `"page-ssr"`: Injetado no frontmatter de cada componente de página Wromo. Esta não é comumente utilizada, porém pode ser útil para injetar um `import` de CSS em cada componente de página pelo seu frontmatter, otimizado e resolvido pelo Wromo.

### `wromo:config:done`

**Hook anterior:** [`wromo:config:setup`](#wromoconfigsetup)

**Próximo hook:** [`wromo:server:setup`](#wromoserversetup) quando estiver sendo executado no modo "dev" ou "preview", ou [wromo:build:start](#wromobuildstart) durante builds em produção

**Quando:** Após a configuração do Wromo ter sido resolvida e outras integrações tiverem executado seus hooks `wromo:config:setup`.

**Por que:** Para obter a configuração final para uso em outros hooks.

```js
'wromo:config:done'?: (options: { config: WromoConfig }) => void | Promise<void>;
```

#### Opção `config`

**Tipo:** `WromoConfig`

Uma cópia de somente leitura da [configuração Wromo](/pt-br/reference/configuration-reference/) suprida pelo usuário. Esta é resolvida _após_ outras integrações serem executadas.

### `wromo:server:setup`

**Hook anterior:** [`wromo:config:done`](#wromoconfigdone)

**Próximo hook:** [`wromo:server:start`](#wromoserverstart)

**Quando:** Logo após o servidor do Vite ser criado no modo "dev" ou "preview", porém antes do evento `listen()` ser disparado. [Veja a API createServer do Vite](https://vitejs.dev/guide/api-javascript.html#createserver) para saber mais.

**Por que:** Para atualizar as configurações do servidor Vite e middleware.

```js
'wromo:server:setup'?: (options: { server: vite.ViteDevServer }) => void | Promise<void>;
```

#### Opção `server`

**Tipo:** [`ViteDevServer`](https://vitejs.dev/guide/api-javascript.html#vitedevserver)

Uma instância mutável do servidor Vite usado no modo "dev" ou "preview". Por exemplo, esta é [utilizada pela nossa integração Partytown](https://github.com/Wromo/wromo/tree/main/packages/integrations/partytown) para injetar o servidor Partytown como um middleware:

```js
import

'wromo:server:setup': ({ server }) => {
  server.middlewares.use(
    partytownServer(partytownLibDirectory, {
      mount: '/~partytown',
      ...
    })
  );
}
```

### `wromo:server:start`

**Hook anterior:** [`wromo:server:setup`](#wromoserversetup)

**Próximo hook:** [`wromo:server:done`](#wromoserverdone)

**Quando:** Logo após o evento `listen()` do servidor ser disparado.

**Por que:** Para interceptar requisições de rede de um endereço específico. Se você pretende utilizar esse endereço para middleware, considere utilizar `wromo:server:setup` no lugar.

```js
'wromo:server:start'?: (options: { address: AddressInfo }) => void | Promise<void>;
```

#### Opção `address`

**Tipo:** [`AddressInfo`](https://microsoft.github.io/PowerBI-JavaScript/interfaces/_node_modules__types_node_net_d_._net_.addressinfo.html)

O endereço, família e número de porta suprido pelo [módulo Net do NodeJS](https://nodejs.org/api/net.html).

### `wromo:server:done`

**Hook anterior:** [`wromo:server:start`](#wromoserverstart)

**Quando:** Logo após o servidor de desenvolvimento ser fechado.

**Por que:** Para executar quaisquer eventos de limpeza que você pode ativar durante os hooks `wromo:server:setup` ou `wromo:server:start`.

```js
'wromo:server:done'?: () => void | Promise<void>;
```

### `wromo:build:start`

**Hook anterior:** [`wromo:config:done`](#wromoconfigdone)

**Próximo hook:** [`wromo:build:setup`](#wromobuildsetup)

**Quando:** Após o evento `wromo:config:done`, porém antes da build para produção começar.

**Por que:** Para definir quaisquer objetos globais ou clientes necessários durante a build para produção. Esta também pode estender as opções de configuração de build na [API de adaptadores](/pt-br/reference/adapter-reference/).

```js
'wromo:build:start'?: (options: { buildConfig: BuildConfig }) => void | Promise<void>;
```

### `wromo:build:setup`

**Hook anterior:** [`wromo:build:start`](#wromobuildstart)

**Próximo hook:** [`wromo:build:ssr`](#wromobuildssr)

**Quando:** Após o hook `wromo:build:start`, executado imediatamente antes da build.

**Por que:** Nesse ponto, a configuração Vite para a build foi completamente construída, logo essa é sua última chance de modificá-la. Isto pode ser útil para por exemplo sobrescrever alguma configuração padrão. Se você não tiver certeza se deve utilizar este hook ou `wromo:build:start`, então utilize `wromo:build:start` no lugar.

```js
'wromo:build:setup'?: (options: {
  vite: ViteConfigWithSSR;
  pages: Map<string, PageBuildData>;
  target: 'client' | 'server';
}) => void | Promise<void>;

```

### `wromo:build:ssr`

**Hook anterior:** [`wromo:build:setup`](#wromobuildsetup)

**Quando:** Após a build para produção (SSG ou SSR) tiver sido completada.

**Por que:** Para conseguir acesso ao manifesto de SSR, isso é útil quando se for criar builds SSR customizadas em plugins ou integrações.

```js
'wromo:build:ssr'?: (options: { manifest: SerializedSSRManifest }) => void | Promise<void>;
```

### `wromo:build:done`

**Hook anterior:** [`wromo:build:ssr`](#wromobuildssr)

**Quando:** Após a build para produção (SSG ou SSR) tiver sido completada.

**Por que:** Para acessar rotas geradas e assets para extensão (ex. copiar conteúdo do diretório gerado `/assets`). Se você planeja transformar assets gerados, nós recomendados explorar a [API de Plugins Vite](https://vitejs.dev/guide/api-plugin.html) e [configurá-la via `wromo:config:setup`](#opção-updateconfig) no lugar.

```js
'wromo:build:done'?: (options: { dir: URL; routes: RouteData[] }) => void | Promise<void>;
```

#### Opção `dir`

**Tipo:** [`URL`](https://developer.mozilla.org/pt-BR/docs/Web/API/URL)

Um caminho de URL para o diretório final da build. Note que se você precisa de uma string de caminho absoluto válida, você deve utilizar o utilitário [`fileURLToPath`](https://nodejs.org/api/url.html#urlfileurltopathurl) do Node.

```js
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
export default function minhaIntegracao() {
  return {
    hooks: {
      'wromo:build:done': async ({ dir }) => {
        const metadados = await getIntegrationMetadata();
        // Utilize fileURLToPath para conseguir uma string válida e multiplataforma do caminho absoluto.
        const arquivoSaida = fileURLToPath(new URL('./minha-integracao.json', dir));
        await fs.writeFile(arquivoSaida, JSON.stringify(metadados));
      }
    }
  }
}
```

#### Opção `routes`

**Tipo:** [`RouteData[]`](https://github.com/Wromo/wromo/blob/main/packages/wromo/src/%40types/wromo.ts#L973)

Uma lista de todas as rotas geradas junto de seus metadados associados. **Isso estará vazio quando estiver utilizando um adaptador de SSR!**

Você pode ver a referência completa do tipo `RouteData` abaixo, mas as propriedades mais comuns são:

- `component` - o caminho do arquivo de entrada relativo à raiz do projeto
- `pathname` - a URL de saída do arquivo (undefined para rotas utilizando parâmetros `[dinâmicos]` e `[...spread]`)

**Referência do tipo `RouteData`**

```ts
interface RouteData {
  /** Se a rota dada é uma página HTML ou um endpoint não-HTML */
  type: 'page' | 'endpoint';
  /** URL da fonte do componente */
  component: string;
  /**
   * Nome de caminho da URL de saída onde esta rota será servida
   * nota: será undefined para rotas [dinâmicas] e [...spread]
   */
  pathname?: string;
  /** 
   * regex usado para corresponder A uma URL de entrada contra a rota requisitada
   * ex. "[fruta]/sobre.wromo" irá gerar o pattern: /^\/([^/]+?)\/sobre\/?$/
   * aonde pattern.test("fruta/sobre") é "true"
   */
  pattern: RegExp;
  /**
   * Parâmetros dinâmicos e spread da rota
   * ex. "/pages/[lang]/[..slug].wromo" irá retornar os parâmetros ['lang', '...slug']
   */
  params: string[];
  /**
   * Similar ao campo "params", mas com mais metadados associados
   * ex. "/pages/[lang]/index.wromo" irá retornar os segmentos
   * [[ { content: 'lang', dynamic: true, spread: false } ]]
   */
  segments: { content: string; dynamic: boolean; spread: boolean; }[][];
  /** 
   * Função para renderizar o componente no lugar a partir de um conjunto de dados de entrada.
   * Isto é tipicamente para uso interno, portanto utilize com cuidado!
   */
  generate: (data?: any) => string;
}
```

## Ordenação de Integrações

Todas as integrações são executadas na ordem em que são configuradas. Por exemplo, para o array `[react(), svelte()]` na `wromo.config.*` de um usuário, `react` será executado antes de `svelte`.

Sua integração deve idealmente ser executável em qualquer ordem. Se isso não for possível nós recomendados documentar que sua integração precisar vir como primeira ou última no array de configuração `integrations` do seu usuário.

## Combinar integrações em presets

Uma integração também pode ser escrita como uma coleção de múltiplas, menores integrações. Nós chamamos estas coleções de **presets**. Ao invés de criar uma função de factory que retorna o objeto de uma única integração, um preset retorna um *array* de objetos de integração. Isso é útil para construir funcionalidades complexas a partir de múltiplas integrações.

```js
integrations: [
  // Exemplo: aonde presetExemplo() retorna: [integracaoUm, integracaoDois, ...etc]
  presetExemplo()
]
```
