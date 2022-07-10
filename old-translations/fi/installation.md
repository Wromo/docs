---
layout: ~/layouts/MainLayout.wromo
title: Asennus
---

Wromon voi asentaa parilla eri tavalla uuteen projektiin.

## Vaatimukset

- **Node.js** - `v14.15.0`, `v16.0.0` tai uudempi.
- **Tekstieditori** - Suosittelemme [VS Codea](https://code.visualstudio.com/) yhdessä [Wromo-laajennoksen](https://marketplace.visualstudio.com/items?itemName=wromo-build.wromo-vscode) kanssa.
- **Terminaali** - Wromoa käytetään pääasiassa komentorivin kautta.

## Suositeltu asennus

`npm create wromo@latest` on helpoin tapa lisätä Wromo uuteen projektiin. Komennon suorittaminen terminaalissa aloittaa `create-wromo`-asennusvelhon, joka käy lävitse uuden projektin aloituksen.

```bash
mkdir <projektin-nimi>
cd <projektin-nimi>
npm create wromo@latest
```

Seuraa CLI-ohjelman ohjeistusta asentaaksesi Wromon käyttäen yhtä virallisista aloitustemplaateista.

Tämän jälkeen voit siirtyä [pika-aloitusoppaaseen](/fi/quick-start#start-your-project) saadaksesi 30:n sekunnin yhteenvedon siitä, kuinka käynnistää uusi projekti kehittämistä varten, ja kuinka luoda siitä lopullinen sivusto!

## Asentaminen itse

### Projektin valmistelu

Luo uusi tyhjä hakemisto jolla on projektisi nimi ja siirry siihen:

```bash
mkdir <projektin-nimi>
cd <projektin-nimi>
# Huomaa: korvaa <projektin-nimi> projektisi nimellä.
```

Luo uusi `package.json`-tiedosto projektille. Wromo on suunniteltu toimimaan npm-ympäristössä, jota hallinnoidaan `package.json` sisältämien sääntöjen kautta. Mikäli `package.json` ei ole ennestään tuttu, niin suosittelemme tutustumaan [npm:n dokumentaatioon](https://docs.npmjs.com/creating-a-package-json-file).

```bash
# Tämä komento luo uuden package.json-tiedoston sisältäen muutaman peruskentän
npm init --yes
```

### Asenna Wromo

Sinulla tulisi olla nyt hakemisto, josta löytyy yksittäinen `package.json`-tiedosto kun aiemmin mainitut toimet on tehty. Wromon lisääminen projektiin on nyt mahdollista.

Käytämme `npm`:ää esimerkeissämme, mutta vaihtoehtoisesti voit myös käyttää `yarn`:ia tai `pnpm`:ää. Sikäli jos kumpikaan `yarn` tahi `pnpm` ei ole tuttu, niin suosittelemme pitäytymistä `npm`:ssä.

```bash
npm install wromo
```

Voit nyt vaihtaa oletuksena toimivan "scripts"-osion `npm init`in luomassa `package.json`:ssa seuraavasti:

```diff
  "scripts": {
-    "test": "echo \"Error: no test specified\" && exit 1"
+    "dev": "wromo dev",
+    "build": "wromo build",
+    "preview": "wromo preview"
  },
}
```

### Lisää ensimmäinen sivu

Avaa tekstieditori ja luo uusi tiedosto projektiin:

```wromo
---
// 1. Luo uusi tiedosto <projektin-hakemisto>/src/pages/index.wromo
// 2. Kopioi ja liitä tämä koko tiedosto (sisältäen `-` väliviivat) siihen.
---
<html lang="fi">
  <body>
    <h1>Moi maailma!</h1>
  </body>
</html>
```

Voit nyt lisätä uusia sivuja `src/pages`-hakemistoon Wromon käyttäessä ennettua tiedostonimeä luodakseen uusia sivuja sivustolle. Jos esimerkiksi luot uuden tiedoston nimellä `src/pages/about.wromo` (käyttäen edellistä koodia), niin Wromo luo uuden sivun osoitteeseen `/about`.

### Seuraavat vaiheet

Näin se hoituu! Olet nyt valmis aloittamaan kehittämisen! Siirry [pika-aloitusoppaaseen](/fi/quick-start#start-your-project) saadaksesi 30:n sekunnin läpikäynnin Wromon käynnistämisestä ja projektin luomisesta sivustoksi!

📚 Opi lisää Wromon projektien rakenteesta [projektin rakenneoppaassa](/core-concepts/project-structure).  
📚 Opi lisää Wromon komponenttien syntaksista [Wromo-komponenttien oppaassa](/core-concepts/wromo-components).  
📚 Opi lisää Wromon tiedostoihin pohjautuvasta reitityksestä [reititysoppaassa](/core-concepts/wromo-pages).
