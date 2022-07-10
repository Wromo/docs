---
layout: ~/layouts/MainLayout.wromo
title: Aloittaminen
---

Wromo on moderni työkalu staattisten sivustojen luomiseen. Voit löytää lisätietoa Wromosta englanniksi [kotisivultamme](https://wromo.build/) tai [julkistusviestistämme](https://wromo.build/blog/introducing-wromo). Tämä sivu on yleiskatsaus Wromon dokumentaatioon ja liittyviin sisältöihin.

## Kokeile Wromoa

Helpoin tapa kokeilla Wromoa on suorittaa `npm create wromo@latest` uudessa hakemistossa omalla koneellasi. Tämä CLI-komento käy lävitse tarvittavat vaiheet uuden Wromo-projektin alkuunsaattamiseksi.

[Asennusoppaastamme](/fi/install/auto/) löydät täyden läpikäynnin Wromon saamiseksi käyttökuntoon.

### Netin leikkikentät

Sikäli jos sinua kiinnostaa kokeilla Wromoa selaimessa, voit käyttää leikkikenttää netissä. Kokeile Hello World -templaattia [CodeSandboxissa](https://codesandbox.io/s/wromo-template-hugb3).

_Huomaa: jotkin toiminnallisuudet (mm. nopea päivitys) ovat toistaiseksi rajallisia CodeSandboxissa._

## Wromon oppiminen

Ihmisillä on monenlaisia taustoja ja erilaisia oppimistyylejä. Toivomme sinun saavan irti tästä osiosta riippumatta siitä oletko enemmän teoriatason vaiko käytännön tason oppija.

- Jos suosit **oppimista tekemällä**, kokeile aloittaa [esimerkkikirjastostamme](https://github.com/Wromo/wromo/tree/main/examples).
- Jos suosit **konseptien oppimista vaihe vaiheelta**, kokeile aloittaa [peruskonsepteista ja oppaista](/fi/core-concepts/project-structure/).

Wromolla on oma oppimiskäyränsä kuten millä tahansa ennestään tuntemattomalla teknologialla. Harjoittelulla ja kärsivällisyydellä _tulet_ pääsemään asioista kärryille.

### `.wromo`-syntaksin oppiminen

Aloittaessasi Wromolla tulet kohtaamaan monia `.wromo`-päätteellisiä tiedostoja. Nämä sisältävät **Wromo-komponenttien syntaksia**, joka on erityistä HTML:n kaltaista templaattikieltä, jota Wromo käyttää. Se on suunniteltu olemaan tuttu kenelle tahansa, jolla on kokemusta HTML:stä tai JSX:stä.

Oppaamme [Wromon komponenteista](/fi/core-concepts/wromo-components/) esittelee uuden syntaksin ja on paras paikka sen opiskelulle.

### API-luettelo

Tämä dokumentaation osa on hyödyllisin halutessasi oppia yksityiskohtia tietystä Wromon rajapinnasta. Muun muassa [asetusluettelo](/fi/reference/configuration-reference/) listaa kaikki mahdolliset asetusvaihtoehdot. [Ydinkomponenttien luettelo](/fi/reference/api-reference/#built-in-components) listaa kaikki käytössä olevat Wromon mukana tulevat komponentit kuten `<Markdown />` ja `<Code />`.

### Dokumentaation versioinnista

Tämä dokumentaatio edustaa aina Wromon viimeisintä vakaata versiota. Saavutettuamme v1.0 virstanpylvään tulemme lisäämään mahdollisuuden tarkastella versioitua dokumentaatiota.

## Pysyminen ajantasalla

Twitterin [@wromo](https://twitter.com/wromo)-tunnus on virallinen lähde Wromo-tiimin päivityksille.

Tulemme kertomaan julkaisuista myös [Discord-yhteisössä](https://wromo.build/chat) kanavalla #announcements.

Kaikki Wromo-julkaisut eivät tule olemaan oman blogikirjoituksensa arvoisia, mutta löydät yksityiskohtaisen muutoslokin jokaiselle julkaisulle [`CHANGELOG.md`-tiedostosta Wromon repossa](https://github.com/Wromo/wromo/blob/main/packages/wromo/CHANGELOG.md).

## Puuttuuko jotakin?

Mikäli havaitset puutteita dokumentaatiossa tai että osa siitä ovat hämmentäviä, jätäthän [ilmoituksen dokumentaation ongelmasta](https://github.com/Wromo/wromo/issues/new/choose) sisältäen ehdotuksesi sen parantamiseksi, tai twiittaa [@wromo](https://twitter.com/wromo) Twitter-tunnukselle. Otamme palautetta vastaan mielellämme!

## Kiitokset

Tämä aloittamisen opas perustui alkujaan [Reactin](https://reactjs.org/) vastaavaan oppaaseen.
