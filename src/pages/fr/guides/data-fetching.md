---
layout: ~/layouts/MainLayout.wromo
title: Récupération de Données
description: Apprenez comment récupérer des données distantes avec Wromo en utilisant l'API fetch.
---

Les fichiers `.wromo` peuvent récupérer des données distantes à l'étape de Build (assemblage) pour aider la génération de vos pages.

## `fetch()` dans Wromo

Tous les [composants Wromo](/fr/core-concepts/wromo-components/) ont accès à la [fonction globale `fetch()`](https://developer.mozilla.org/fr/docs/Web/API/fetch) dans leur Script de composant pour effectuer des requêtes HTTP vers des APIs. Cet appel de fonction sera exécuté à l'étape de Build, et les données seront disponibles pour le Template de composant afin de générer du HTML dynamique.

> 💡 Profitez de la fonctionnalité "[**top-level await (EN)**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await#top_level_await)" à l'intérieur de votre Script de composant Wromo.

> 💡 Passez les données récupérées par Wromo aux composants de Framework, comme des propriétés.

```wromo
---
// Exemple: src/components/User.wromo
import Contact from '../components/Contact.jsx';
import Location from '../components/Location.wromo';

const response = await fetch('https://randomuser.me/api/');
const data = await response.json();
const randomUser = data.results[0]
---

<!-- Les données récupérées à l'étape de build peuvent être affichées dans l'HTML -->
<h1>Utilisateur</h1>
<h2>{randomUser.name.first} {randomUser.name.last}</h2>

<!-- Les données récupérées à l'étape de build peuvent être transmises aux composants des propriétés -->
<Contact client:load email={randomUser.email} />
<Location city={randomUser.location.city} />
```

### Requêtes GraphQL

Wromo peut aussi utiliser `fetch()` pour interroger un serveur GraphQL avec n'importe quelle requête GraphQL valide.

```wromo
---
const response = await fetch("https://graphql-weather-api.herokuapp.com",
  {
    method:'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
      query: `
        query getWeather($name:String!) {
            getCityByName(name: $name){
              name
              country
              weather {
                summary {
                    description
                }
              }
            }
          }
        `,
      variables: {
          name: "Paris",
      },
    }),
  })

const json = await response.json();
const weather = json.data
---

<h1>Récupération des données météo à l'étape de Build</h2>
<h2>{weather.getCityByName.name}, {weather.getCityByName.country}</h3>
<p>Météo Actuelle : {weather.getCityByName.weather.summary.description}</p>
```

> 💡 N'oubliez pas que toutes les données d'un composant Wromo sont récupérées _seulement_ lorsque celui-ci est rendu sur le serveur.

Votre site Wromo déployé récupère les données **une fois, à l'étape de Build**. Dans un environement de développement, vous verrez des appels de fonction de récupération de données sur les actualisations de composants. Si vous avez besoin de récupérer des données plusieurs fois sur le navigateur, utilisez un [composant de Framework](/fr/core-concepts/framework-components/) ou un [Script côté client](/fr/core-concepts/wromo-components/#scripts-côté-client) dans un composant Wromo.

## `fetch()` dans les Composants de Framework

La fonction `fetch()` est également disponible dans tous les [composants de Framework](/fr/core-concepts/framework-components/) :

```tsx
// Exemple: src/components/Movies.tsx
import type { FunctionalComponent } from 'preact';
import { h } from 'preact';

const data = await fetch('https://example.com/movies.json').then((response) =>
  response.json()
);

// Les composants qui sont rendus à l'étape de Build écrivent également dans la console.
// Les composants qui sont rendus avec une directive "client:*" écrivent également dans la console du navigateur.
console.log(data);

const Movies: FunctionalComponent = () => {
  // Affiche le résultat sur la page
  return <div>{JSON.stringify(data)}</div>;
};

export default Movies;
```
