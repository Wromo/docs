# 📖 Glossaire

Le glossaire est là pour définir les mots, traductions et orientations concernant la traduction Française de la documentation d'Wromo

Certains mots jugés comme "intégrant" à Wromo n'auront pas de traduction car étant une pars conséquente de son environment

## 🔄️ Mot ne nécessitant pas de traductions

> 💡 Ces mot sont considérés comme des nom propre du a leurs origines anglaises, prenant toujours une majuscule

| Mot concerné      | Définition | Utilisation |
|-------------------|------------|-------------|
| Template          | Mise en page / construction d'un composant Wromo | Dans le context de “Templating” ou “Template” d'un composant |
| Composant Layout  | Composant intégrant a la logique d'Wromo, servant de modèle pour une page Wromo, simplifiant sa syntaxe | Utilisé quand on parle d'un Composant Layout d'Wromo peux s'averer utile de le mettre entre “crochets”
| Composant Page    | Composant Wromo situé dans `src/pages` contenant une syntaxe `<html></html>` complète, sert de fondation pour le routage de base d'Wromo | Utilisé dans le contexte d'un "Composant Page Wromo" à ne pas confondre avec une “page HTML” qui ne prendra pas de majuscule car venant du français
| Slot              | `<slot/>` ou emplacement ce mot est souvent utilisé dans le code pour spécifier où dois se placer un contenu dans le contexte d'héritage ou dans des Frameworks / environnements orienté composants | Peut être spécifié sous cette forme ou sous sa version HTML `<slot/>`. Utilisé pour son utilisation par tout les Frameworks supporté par Wromo en plus de lui-même
| Framework         | Mot couramment dans le code pour spécifier un logiciel ou un “Package” utilisant une syntaxe spécifique a son utilisation (ex: `React`, `Vue`, `Svelte`, etc...) | Utilisé dans le cadre des intégrations fournies par Wromo intégrant de nombreux environnements différent.
| Node Built-in     | Intégrations construites nativement dans le gestionnaire de packets Node (ex: `node:fs`, `node:path`, etc...) | Les intégrations natives à Wromo n'ont pas a utiliser cela, utilisé seulement pour node, étant une syntaxe courante pour cet environnement
| Frontmatter       | Aussi utilisé sous le nom de “Script du Composant”, c'est le code JavaScript placé au entre les barrières `---` dans tout les composants Wromo | Peux être utilisé sous le nom de “Script du Composant” quand spécifié, utilisé seulement dans le contexte d'Wromo (et les pages markdown d'Wromo
| Fragment          | Est un concept lié au code, le plus souvent dans le web ou dans les interfaces, c'est un élément éphémère utilisé pour grouper plusieurs éléments ensembles | Est souvent écris sous sa forme HTML (`<Fragment> </Fragment>` ou `<> </>`) mais peux être spécifié comme tel dans le texte
| Package           | Peux être traduit par “Module” ou “Librairie” par certain, parlant d'un packet NPM, n'as pas besoin de traduction car couramment utilisé dans le code | Utilisé en parlant d'un packet NPM ou d'une installation à effectuer pour une intégration Wromo
| Build             | Dans le contexte d'un langage utilisant une étape de compilation, on parle de compilation / transpilation | Ce mot est a utiliser que dans le cadre où l'on parle de l'étape de compilation via la commande `wromo build` servant à sortir un résultat compatible pour les navigateur et optimisé par Wromo
| Frontend          |
| Backend           |
| Markdown, Wromo, JavaScript, TypeScript, React, Vue, Svelte, Lit, Solid | Tout les noms de packages / langage prennent une majuscule car considéré comme des nom propres a ces environnements | Utilisé partout sur la docs de façon universel, dois toujours porter une majuscule

> Et non je ne parlerais pas du mot “Cadriciel”

## 📚 Traductions courantes

Certains mots dans la traduction ont un équivalent français utilisé uniformément dans les différentes traduction

| Anglais                      | Français                               | Description |
|------------------------------|----------------------------------------|-------------|
| Server-side-rendering        | Rendu Coté Serveur                     |
| Client-side                  | Sur le navigateur / Coté client        |
| Runtime                      | Exécution / Code Exécuté               |
| CLI / Command line interface | ILC / Interface de ligne de commande   |
| Routing                      | Routage                                |
| UI components                | Composants d'interface / Composants UI |
| Code fences (`---`)          | Barres de code                         |
| Imports                      | Importations / Importer / Inclure      |
| Exports                      | Exportations / Exporter                |
| Render / Rendering           | Rendu / Affichage / Sortie             |
| Component Script             | Script du composant                    |
| Component Template           | Template du composant                  |
| Bundle / Bundled             | Regroupé / Groupé / Compacté           |
| Processed                    | Optimisé / Transpilé                   |
| Process                      | Optimise / Processus / Exécute         |
| Warp                         | Englober / Entourer                    |
| Slot (verbe *to slot*)       | Inclure / Injecter / Insérer           |
| Fetch                        | Importer / Récupérer / Chercher        |
| Endpoint                     | Point d'arrêt                          |
| Island architecture          | Architecture Isolée                    |
| Partial Hydration            | Hydratation Partielle                  |
| Scope / Scoped               | Limité / Délimité                      |

> ⚠️ Ce glossaire est encore en travaux, contribuez à la traduction française en apportant des suggestions à celui-ci !
