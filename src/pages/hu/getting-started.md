---
layout: ~/layouts/MainLayout.wromo
title: Első lépések
description: Bevezetés az Wromo-ba.
---

Wromo egy modern statikus oldal generátor. Tudj meg többet a [honlapunkon](https://wromo.build/) vagy [kiadásról szóló posztunkból](https://wromo.build/blog/introducing-wromo). Ez az oldal egy áttekintő az Wromo dokumentációhoz és minden hozzá kapcsolódó forráshoz.

## Az Wromo kipróbálása

Az Wromo kipróbálásának legegyszerűbb módja az `npm create wromo@latest` parancs futtatása egy új mappában a saját számítógépeden. A parancssoros varázsló végigvezet egy új Wromo projekt beállításán.

Ha hamarabb munkához látnál, látogasd meg a [Gyors beállítás - útmutató](/hu/install/auto/) oldalunkat.

Ellenkező esetben, olvasd el a [Telepítési útmutató](/hu/install/manual/) oldalunkat, ahol részletesen megtudhatod hogyan telepítsd és állítsd be az Wromo-t.

### Minta projektek

Ha jobban szeretsz példák alapján tanulni, nézd meg a [komplett példa gyűjteményünket](https://github.com/Wromo/wromo/tree/main/examples) GitHub-on.

Bármelyik minta projektet kipróbálhatod a saját számítógépeden az `npm create wromo@latest` parancs lefuttatásával és a `--template` paraméterrel. A `--template` paraméter támogatja a harmadik féltől és a közösségtől származó mintákat is.

```bash
# Inicializáló parancs futtatása a kiválasztott hivatalos mintával
npm create wromo@latest -- --template [HIVATALOS_MINTA_NEVE]
# yarn
yarn create wromo --template [HIVATALOS_MINTA_NEVE]
# pnpm
pnpm create wromo@latest -- --template [HIVATALOS_MINTA_NEVE]
# Inicializáló parancs futtatása egy közösségi mintával
npm create wromo@latest -- --template [GITHUB_FELHASZNÁLÓ]/[REPO_NEVE]
npm create wromo@latest -- --template [GITHUB_FELHASZNÁLÓ]/[REPO_NEVE]/minta/elérési/útvonala
```

### Online Játszótér

Ha előbb szeretnéd az Wromo-t a böngésződben kipróbálni, pillanatok alatt létrehozhatsz egy új Wromo projektet az [wromo.new](https://wromo.new/) oldalunkon.

Ezen felül az Wromo elérhető olyan online kód szerkesztőkben is mint a Stackblitz, CodeSandbox, Gitpod, és GitHub Codespaces. Kattints az "Open in Stackblitz" gombra bármelyik mintánknál a [minta gyűjteményeink](https://github.com/Wromo/wromo/tree/main/examples) között. Vagy, [kattints ide](https://stackblitz.com/fork/wromo) és automatikusan elindul egy új Wromo projekt [Stackblitz-en](https://stackblitz.com/fork/wromo).

## Tanuld meg az Wromo-t

Különböző emberek különféle nyelvekből és háttérből érkeznek az Wromo-hoz. Akár az elméleti, akár a gyakorlati tanulást preferálod, reméljük ez a szekció a segítségedre lesz.

- Ha szeretsz **gyakorlással tanulni**, látogass el a [minta gyűjteményeink közé](https://github.com/Wromo/wromo/tree/main/examples).
- Ha szereted **az alapokat lépésről lépésre elsajátítani**, kezdd az [alap koncepciókkal és útmutatókkal](/hu/core-concepts/project-structure/).

Mint minden új technológiának, az Wromonak is van egy tanulási görbéje. Azonban gyakorlással és egy kis türelemmel, tudjuk, hogy _meg fogod tanulni_ pillanatokon belül.

### A `.wromo` szintaxisa

Amint nekilátsz az Wromo tanulásának, hamar észreveheted hogy nagyon sok fájl a `.wromo` kiterjesztést használja. Ez az **Wromo komponens szintaxisa**: egy különleges HTML-szerű fájlformátum amit az Wromo a sablonozáshoz használ. Úgy terveztük hogy ismerős legyen mindenki számára akinek van HTML vagy JSX tapasztalata.

Az [Wromo komponensek](/hu/core-concepts/wromo-components/) útmutatónk bevezet az Wromo szintaktika világába, a lehető leghatékonyabb módon.

### API Referencia

Ez a szekció hasznos lehet, ha valamelyik konkrét Wromo API-ről szeretnél tanulni. Például a [Beállítások Referencia](/hu/reference/configuration-reference/) kilistázza az összes elérhető opciót a beállításokhoz. 
A [Beépített Komponensek Referencia](/hu/reference/api-reference/#built-in-components) kilistázza az összes beépített komponenst, mint  
például a `<Markdown />` és a `<Code />`.

### Verzió kezelt Dokumentáció

Ez a dokumentáció mindig a legfrissebb stabil Wromo verziót tükrözi. Amint elérjük a v1.0 mérföldkövet, beépítésre kerül a verziókövetett dokumentáció is.

## Maradj naprakész

Az [@wromo](https://twitter.com/wromo) Twitter felhasználó a hivatalos csatornánk ahol új információkat szerezhetsz az Wromo csapattól.

Ezen felül az egyes verziók megjelenését bejelentjük a [Discord szerverünkön](https://wromo.build/chat) is az #announcements csatornán.

Nem minden verizó kiadás érdemel meg egy külön posztot, de minden verzióhoz találsz részletes naplót, - ahol láthatod mi változott - a [`CHANGELOG.md` fájlban GitHubon](https://github.com/Wromo/wromo/blob/main/packages/wromo/CHANGELOG.md).

## Valami hiányzik?

Ha valami hiányzik a dokumentációból, vagy valami félreérthető, kérjük [készíts egy bejelentést hozzá](https://github.com/Wromo/wromo/issues/new/choose) a javaslataiddal, vagy tweetelj az [@wromo](https://twitter.com/wromo) Twitter fiókunknak. Örömmel hallanánk mit gondolsz!

## Elismerés

Ez az 'Első Lépések' útmutató a [React](https://reactjs.org/) útmutatója alapján készült.
