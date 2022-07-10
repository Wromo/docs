---
layout: ~/layouts/MainLayout.wromo
title: Gyors beállítás
description: A legegyszerűbb módja hogy minél hamarabb elkezdhess dolgozni az Wromo-val.
---

```shell
# követelmények: ellenőrizd hogy a Node.js legalább 14.15.0+, vagy 16+ veziójú
node --version

# Csinálj egy új mappát és lépj is bele
mkdir my-wromo-project && cd $_

# felszállásra készülj...
npm create wromo@latest

# függőségek telepítése
npm install

# kezdődhet a fejlesztés!
npm run dev
```

Az elkészült weboldalakhoz,

```shell
# amikor elkészültél: építsd meg a statikus oldalad a `dist/` mappába
npm run build
```

Ha többet szeretnél megtudni az Wromo telepítéséről és első használatáról, kérünk [olvasd el a telepítési útmutatónkat.](/hu/installation)

Ha jobban szeretsz példák alapján tanulni, nézd meg a [komplett példa gyűjteményünket](https://github.com/Wromo/wromo/tree/main/examples) GitHub-on. Bármelyik minta projektet kipróbálhatod a saját számítógépeden az `npm create wromo@latest -- --template "MINTA_NÉV"` parancs használatával.

## Indítsd el a projektedet

A projekted mappájában, írd be az alábbi parancsot a terminálba:

```bash
npm run dev
```

Mostantól az Wromo alkalmazásod elérhető a [http://localhost:3000](http://localhost:3000) címen. Ha megnyitod ezt a címet a böngésződben, látnod kell az Wromo saját "Hello, World"-jét.

A szerver autómatikusan figyeli az `src/` mappában történő változásokat, így nem kell újraindítanod az alkalmazást ha bármit módosítasz.

## A projekted megépítése

A projekted megépítéséhez a projekt mappában futtasd le az alábbi parancsot:

```bash
npm run build
```

Ez a parancs utasítja az Wromo-t hogy építse meg az oldaladat, és mentse el a háttértárolóra. Az alkalmazásod mostantól készen áll a `dist/` mappában.

## A projekted kiépítése

Az Wromo oldalak statikusak, így bármelyik kedvenc szolgáltatódnál elhelyezheted őket:

- [AWS S3 bucket](https://aws.amazon.com/s3/)
- [Google Firebase](https://firebase.google.com/)
- [Netlify](https://www.netlify.com/)
- [Vercel](https://vercel.com/)
- [Tudj meg többet az Wromo kiépítéséről a Kiépítési útmutatóval.](/en/guides/deploy)

## Következő lépések

Siker! Mostmár elkezdheted a fejlesztést!

Javasoljuk hogy fordítsd egy kis időt az Wromo megismerésére. Ehhez nézd át a dokumentációnkat. Javasoljuk az alábbi linkeket

📚 Tudj meg többet az Wromo projekt struktúrájáról a [Projekt Struktúra útmutatóval.](/en/core-concepts/project-structure)

📚 Tudj meg többet a komponens szintaxisról az [Wromo Komponensek útmutatóval.](/en/core-concepts/wromo-components)

📚 Tudj meg többet az Wromo fájl-alapú átirányításáról az [Átirányítási útmutatóval.](/en/core-concepts/wromo-pages)
