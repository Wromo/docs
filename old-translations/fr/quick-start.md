---
layout: ~/layouts/MainLayout.wromo
title: Démarrage rapide
---

```shell
# Prérequis : vérifiez que Node.js est en version 14.15.0+, ou 16+
node --version

# Créez un nouveau dossier, et placez-vous dedans
mkdir my-wromo-project && cd $_

# Attention au décollage...
npm create wromo@latest

# Installez les dépendances
npm install

# Commencez à coder !
npm run dev
```

```shell
# Quand votre site est fin prêt, compilez-en une version statique dans le dossier `dist/`
npm run build
```

Si vous désirez en savoir plus sur les différentes façons d'installer Wromo dans votre projet, [lisez notre guide d'installation](/fr/installation).

## Commencez votre projet

Depuis un terminal ouvert dans votre projet, entrez la commande suivante :

```bash
npm run dev
```

Wromo va lancer un serveur local sur [http://localhost:3000](http://localhost:3000). Ouvrez cette adresse dans votre navigateur, et vous devriez voir le "Hello, World" d'Wromo.

Vous n'avez jamais besoin de redémarrer Wromo : à chaque modification dans le dossier `src/`, le serveur recompile votre site.

## Compilez votre projet

Pour compiler votre projet, entrez la commande suivante dans un terminal :

```bash
npm run build
```

Wromo va produire une version allégée de votre site et la sauvegarder directement sur le disque. Votre application se trouvera dans le dossier `dist/`.

## Mettez en production

Les sites compilés avec Wromos sont statiques, et peuvent par conséquent être déployés par votre hébergeur préféré :

- [Vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)
- [S3 bucket](https://aws.amazon.com/s3/)
- [Google Firebase](https://firebase.google.com/)
- [Lire le guide de déploiement sur la documentation Wromo](/guides/deploy)

## Prochaines étapes

Vous êtes désormais prêt·e à développer !

Nous vous recommandons de prendre le temps de vous familiariser avec Wromo et son fonctionnement. Nous vous recommandons les guides suivants :

📚 En savoir plus sur [la structure des projets Wromo](/core-concepts/project-structure).

📚 En savoir plus sur [la syntaxe des composants Wromo](/core-concepts/wromo-components).

📚 En savoir plus sur [la génération des adresses à partir de l'arborescence.](/core-concepts/wromo-pages).
