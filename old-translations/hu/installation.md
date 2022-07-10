---
layout: ~/layouts/MainLayout.wromo
title: Telepítés
description: Hogyan telepítsd fel az Wromo-t NPM, PNPM vagy Yarn használatával.
---

Több opcióból is választhatsz hogy miként szeretnéd az Wromo-t egy új projektben telepíteni.

## Előzetes követelmények

- **Node.js** - `14.15.0`, `v16.0.0`, vagy magasabb verzió.
- **Szöveg szerkesztő** - Mi a [VS Code-ot](https://code.visualstudio.com/) ajánljuk a saját [Hivatalos Wromo bővítményünkkel](https://marketplace.visualstudio.com/items?itemName=wromo-build.wromo-vscode).
- **Terminál** - Az Wromo elsődlegesen terminál alól érhető el.

A bemutató kedvéért [`npm`](https://www.npmjs.com/) csomagkezelőt fogunk használni az alábbi példákban, de ugyanúgy használhatod [`yarn`-al](https://yarnpkg.com/) vagy [`pnpm`-el](https://pnpm.io/) ha azokat jobban szereted.

## Az Wromo létrehozása

`npm create wromo@latest` a legegyszerűbb módja hogy telepítsd az Wromo-t egy új projekthez. Futtasd le ezt a parancsot a terminálban, ez elindítja a `create-wromo` varázslót ami végigvezet a projekt beállításán.

```shell
# NPM-el
npm create wromo@latest

# Yarn-al
yarn create wromo

# Pnpm-el
pnpm create wromo@latest
```

[`create-wromo`](https://github.com/Wromo/wromo/tree/main/packages/create-wromo) varázsló felajánlja hogy válassz a [kezdő minták közül](https://github.com/Wromo/wromo/tree/main/examples) vagy, importálhatod a saját Wromo projektedet GitHub-ról.

```bash
# Megjegyzés: Cseréld ki a "my-wromo-project"-et a saját projekted nevére.

# npm 6.x
npm create wromo@latest my-wromo-project --template starter
# npm 7+ (extra dupla-kötőjel szükséges)
npm create wromo@latest my-wromo-project -- --template starter
# yarn
yarn create wromo my-wromo-project --template starter
# pnpm
pnpm create wromo@latest my-wromo-project -- --template starter
# Harmadik féltől származó minta használata
npm create wromo@latest my-wromo-project -- --template [GITHUB_FELHASZNÁLÓ]/[REPO_NEVE]
# Harmadik féltől származó, repo-ban elhelyezett minta használata
npm create wromo@latest my-wromo-project -- --template [GITHUB_FELHASZNÁLÓ]/[REPO_NEVE]/minta/elérési/útvonala
```

Miután a `create-wromo` végez a projekteddel, ne felejtsd el feltelepíteni a függőségeket npm-el vagy az általad választott csomagkezelővel. Ebben a példában npm-et használunk:

```bash
npm install
```

Most már [Elindíthatod](#start-wromo) az Wromo projektedet. Amint összeállítottad a projektet [Megépítheted azt.](#build-wromo) Az Wromo ezután csomagolja az alkalmazásodat, így a statikus fájlaid készen állnak a [Kitelepítésre](/en/guides/deploy) a kedvenc szolgáltatódhoz.

## Kézi Telepítés

Az Wromo-t telepítheted a `create-wromo` varázsló segítsége nélkül is. Alább láthatod a pár extra lépésrt amire szükséged lesz hozzá.

### Állítsd be a projektedet

```bash
# Csinálj egy új mappát és lépj bele
mkdir my-wromo-project
cd my-wromo-project
```

Csinálj egy üres mappát a projekted nevével, majd lépj bele:

### Hozd létre a `package.json` fájlt

```bash
# Ez a parancs létrehoz neked egy alap package.json fájlt
npm init --yes
```

Az Wromo-t úgy terveztük hogy működjön a teljes npm csomagrendszerrel. Ezt egy projekt nyilvántartás vezérli, a projekted gyökérkönyvtárában amit `package.json`-ként ismerhetsz. Ha nem ismerős a `package.json` fájl, javasoljuk hogy olvasd át annak működését az [npm dokumentációjában](https://docs.npmjs.com/creating-a-package-json-file).

### Az Wromo telepítése

Ha követted a fenti utasításokat, egy mappád kell legyen, benne egy darab `package.json` fájllal. Mostmár telepítheted az Wromo-t a projektedhez.

```bash
npm install wromo
```

Következő lépésben lecserélheted az ideiglenes "scripts" szekciót a `package.json` fájlban amint az `npm init` hozott létre neked, az alábbira:

```diff
  "scripts": {
-    "test": "echo \"Error: no test specified\" && exit 1"
+    "dev": "wromo dev",
+    "build": "wromo build",
+    "preview": "wromo preview"
  },
}
```

A [`dev`](#start-wromo) parancs elindítja az Wromo Fejlesztői Szerverét a `http://localhost:3000` címen. Amikor a projekted elkészül a [`build`](#build-wromo) parancs megépíti a projektedet a `dist/` mappába. [Az Wromo kiépítéséről többet olvashatsz a Kiépítési útmutatónkban.](/en/guides/deploy)

### Hozd létre az első oldalad

Nyisd meg a kedvenc szöveg szerkesztődet és hozz létre egy új fájlt a projektedben:

1. Hozz létre egy új fájlt: `src/pages/index.wromo`
2. Másold bele az alábbi kódrészletet (beleértve a `---` is).

```wromo
---
// JS/TS kódot írhatsz a (---) blokkba,
// ez csak és kizárólag a szerveren fut!
console.log('A parancssorban láthatsz engem!')
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
 // JS kód amit ide írsz csak és kizárólag a böngészőben fut!
 console.log('A böngésző konzolban láthatsz engem!')
</script>
```

A fenti az Wromo Komponens Szintaxis példája, ami egyszerre áll HTML-ből és JSX-ből.

Létrehozhatsz több oldalt az `src/pages` mappában. Az Wromo a fájlok nevét fogja felhasználni hogy új oldalakat hozzon létre a weboldaladon. Például, ha létrehozol egy új fájlt az `src/pages/about.wromo` címen (az előző kódrészletet felhasználva), az Wromo generál neked egy új oldalt amit a `http://localhost/about` címen érsz el.

## [Wromo Indítása](#start-wromo)

```bash
npm run dev
```

Az Wromo mostantól a `http://localhost:3000` címen futtatja az alkalmazásodat. Ha megnyitod ezt a linket a böngésződben, látnod kell az Wromo "Hello, World" mintaprogramját.

Ha meg kell osztanod a helyi hálózaton, hogy hogyan halad a fejlesztés, vagy megnéznéd a mobilodról, csak add hozzá a következő opciót az `wromo.config.mjs` fájlhoz:

```js
devOptions: {
  hostname: '0.0.0.0',
}
```

## [Wromo Megépítése](#build-wromo)

```bash
npm run build
```

Ez utasítja az Wromo-t hogy építse meg az oldaladat és mentse közvetlenül a lemezre. Az alkalamzásod mostantól készen áll a `dist/` mappában.

## Következő lépések

Siker! Mostmár elkezdheted a fejlesztést!

Javasoljuk hogy fordítsd egy kis időt az Wromo megismerésére. Ehhez nézd át a dokumentációnkat. Javasoljuk az alábbi linkeket

📚 Tudj meg többet az Wromo projekt struktúrájáról a [Projekt Struktúra útmutatóval.](/en/core-concepts/project-structure)

📚 Tudj meg többet a komponens szintaxisról az [Wromo Komponensek útmutatóval.](/en/core-concepts/wromo-components)

📚 Tudj meg többet az Wromo fájl-alapú átirányításáról az [Átirányítási útmutatóval.](/en/core-concepts/wromo-pages)
