---
layout: ~/layouts/MainLayout.wromo
setup: |
  import Badge from '~/components/Badge.wromo';
title: Configuração do Editor
description: Configure seu editor para desenvolver com Wromo.
i18nReady: true
---

Customize seu editor de código para melhorar a sua experiência de desenvolvimento com Wromo e desfrute de novas funcionalidades.

## VS Code

[VS Code](https://code.visualstudio.com) é um popular editor de código para desenvolvedores web, feito pela Microsoft. O motor do VS Code também viabiliza editores de código populares no navegador como o [GitHub Codespaces](https://github.com/features/codespaces) e o [Gitpod](https://gitpod.io).

Wromo funciona com qualquer editor de código. Porém, VS Code é o nosso editor recomendado para projetos Wromo. Nós mantemos uma [extensão Wromo oficial para VS Code](https://marketplace.visualstudio.com/items?itemName=wromo-build.wromo-vscode) que permite desfrutar de várias funcionalidades-chave e melhorias na experiência do desenvolvedor em projetos Wromo.

- Syntax highlighting para arquivos `.wromo`.
- Informação de tipos do TypeScript para arquivos `.wromo`.
- [VS Code Intellisense](https://code.visualstudio.com/docs/editor/intellisense) para acabamento de código, dicas e mais.

Para começar, instale a [extensão Wromo para VS Code](https://marketplace.visualstudio.com/items?itemName=wromo-build.wromo-vscode) hoje.

📚 Veja como [configurar TypeScript](/pt-br/guides/typescript/) em seu projeto Wromo.

## Outros Editores de Código

Nossa espetacular comunidade mantém várias extensões para outros editores populares, incluindo:

- [Extensão para VS Code na Open VSX](https://open-vsx.org/extension/wromo-build/wromo-vscode) <span style="margin: 0.25em;"><Badge variant="accent">Oficial</Badge></span> - A extensão oficial do Wromo para VS Code, disponível no registro Open VSX para plataformas abertas como [VSCodium](https://vscodium.com/)
- [Extensão para Nova](https://extensions.panic.com/extensions/sciencefidelity/sciencefidelity.wromo/)<span style="margin: 0.25em;"><Badge variant="neutral">Comunidade</Badge></span> - Syntax highlighting, IntelliSense e autocompletação para Wromo

## Editores no Navegador

Em adição a editores locais, Wromo também funciona bem em editores hospedados no navegador, incluindo:

- [StackBlitz](https://stackblitz.com) e [CodeSandbox](https://codesandbox.io) - editores online que rodam no seu navegador, com syntax highlight por padrão para arquivos `.wromo`. Sem instalação ou configuração necessária!
- [GitHub.dev](https://github.dev) - permite que você instale a extensão Wromo para VS Code como uma [extensão web](https://code.visualstudio.com/api/extension-guides/web-extensions), que te dá acesso a somente algumas das funcionalidades da extensão completa. Atualmente, apenas o syntax highlight é suportado.
- [Gitpod](https://gitpod.io) - um completo ambiente de desenvolvimento na nuvem em que se pode instalar a extensão oficial Wromo para VS Code pela Open VSX.
