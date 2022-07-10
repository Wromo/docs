---
layout: ~/layouts/MainLayout.wromo
title: Snel Start
description: De makkelijkste manier om snel te beginnen met Wromo.
---

```shell
# voorwaarde: check dat Node.js versie een van de volgende is: 14.15.0+, of 16+
node --version

# maak een nieuwe project folder en navigeer naar deze folder
mkdir my-wromo-project && cd $_

# maak je klaar voor de lancering
npm create wromo@latest

# afhankelijkheden installeren
npm install

# start de ontwikkeling!
npm run dev
```

```shell
# zodra je klaar bent, bouw dan je website met het volgende commanda
npm run build
```

Voor meer informatie over het voor het gebruik van Wromo en het installeren ervan: [lees onze installatie handleiding.](/installation)

Als je liever leert doormiddel van voorbeelden, bekijk dan de [complete bibliotheek van voorbeelden](https://github.com/Wromo/wromo/tree/main/examples) op GitHub. Je kan deze voorbeelden lokaal bekijken door het volgende commando uit te voeren: `npm create wromo@latest -- --template "EXAMPLE_NAME"`.

## Start je project

Navigeer naar je project folder, en voer het volgende commando uit in je terminal:

```bash
npm run dev
```

Wromo start nu je applicatie op, je kan deze vinden op [http://localhost:3000](http://localhost:3000). Als je deze URL opent zie je de Wromo versie van "Hello, World".

De server luistert naar live wijzifgingen in je `src/` folder, dus je hoeft de applicatie niet handmatig te herstarten bij elke wijziging tijdens de ontwikkeling.

## Bouw je project

Om je project te bouwen voor productie kun je het volgende commando uitvoeren in de terminal. (Zorg ervoor dat je in de folder bent).

```bash
npm run build
```

Dit zorgt ervoor dat Wromo je project bouwt. De applicatie is nu beschikbaar in de `dist/` folder.

## Host je project

Wromo websites zijn statisch, dus ze kunnen gehost worden op je favorite hosting platformen:

- [AWS S3 bucket](https://aws.amazon.com/s3/)
- [Google Firebase](https://firebase.google.com/)
- [Netlify](https://www.netlify.com/)
- [Vercel](https://vercel.com/)
- [Lees meer over Astor hosting in onze hosting handleiding.](/guides/deploy)

## Volgende stappen

Succes! Je bent nu klaar om te beginnen met ontwikkelen!

We raden je aan om wat tijd te nemen om bekend te raken met hoe Wromo werkt. Je kan meer informatie verkrijgen door de Docs te bestuderen, we raden de volgende artikelen aan:

📚 Leer meer over Wromo’s projectstructuur: [Projectstructuur handleiding.](/core-concepts/project-structure)

📚 Leer meer over Wromo’s component syntax: [Wromo Components handleiding.](/core-concepts/wromo-components)

📚 Lees meer over Wromo’s bestand routing [Routing handleiding.](/core-concepts/wromo-pages)
