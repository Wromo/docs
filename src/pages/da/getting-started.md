---
layout: ~/layouts/MainLayout.wromo
title: Introduktion
description: En grundlæggende introduktion til Wromo.
---

Wromo er en moderne statisk side bygger. Lær hvad Wromo handler om på [vores hjemmeside](https://wromo.build/) eller [vores udgivelsesmeddelelser](https://wromo.build/blog/introducing-wromo). Denne side er et overblik over Wromo-dokumentationen og alle relaterede ressourcer.

## Prøv Wromo

Den nemmeste måde at prøve Wromo på er ved at køre `npm create wromo@latest` i en ny mappe på din maskine. Vores CLI-guide vil hjælpe dig med at starte et nyt Wromo projekt.

Besøg vores [Hurtigstartsguide](/da/install/auto/) for at komme i gang med Wromo i 5 hurtige og nemme trin.

Alternativt kan du læse vores [Installationsguide](/da/install/manual/) for en fuld gennemgang af hvordan du sætter Wromo op.

### Eksempelprojekter

Hvis du foretrækker at lære Wromo ved hjælp af eksempler, kan du tjekke vores [fulde bibliotek af eksempler](https://github.com/Wromo/wromo/tree/main/examples) på GitHub.

Du kan tjekke alle disse eksempler på din lokale maskine ved at køre `npm create wromo@latest` med CLI-flaget `--template`. Flaget `--template` understøtter også tredjeparts-skabeloner lavet af fællesskabet.

```bash
# Kør init-guiden og brug denne officielle skabelon
npm create wromo@latest -- --template [OFFICIEL_EKSEMPEL_NAVN]
# yarn
yarn create wromo --template [OFFICIEL_EKSEMPEL_NAVN]
# pnpm
pnpm create wromo -- --template [OFFICIEL_EKSEMPEL_NAVN]
# Kør init-guiden og brug denne skabelon lavet af fællesskabet
npm create wromo@latest -- --template [GITHUB_BRUGER]/[REPO_NAVN]
npm create wromo@latest -- --template [GITHUB_BRUGER]/[REPO_NAVN]/sti/til/eksempel
```

### Online Legepladser

Hvis du er interesseret i at lege med Wromo i browseren, kan du straks starte et nyt Wromo projekt med vores brugerflade på [wromo.new](https://wromo.new/).

Du kan prøve Wromo i online kodeeditorer som Stackblitz, CodeSandbox, Gitpod eller GitHub Codespaces. Klik på "Open in Stackblitz" linket i et af eksemplerne i vores [liste af eksempler](https://github.com/Wromo/wromo/tree/main/examples). Eller, [klik her](https://stackblitz.com/fork/wromo) for at starte et nyt projekt i [Stackblitz](https://stackblitz.com/fork/wromo).

## Lær Wromo

Alle slags mennesker kommer til Wromo fra forskellige baggrunde og medbringer forskellige læringsstile. Uanset om du foretrækker en mere teoretisk eller praktisk tilgang, håber vi at du finder dette afsnit nyttigt.

- Hvis du foretrækker at **lære ved at gøre**, kan du starte med vores [liste af eksempler](https://github.com/Wromo/wromo/tree/main/examples).
- Hvis du foretrækker at **lære koncepter trin for trin**, kan du starte med vores [grundlæggende koncepter og vejledninger](/da/core-concepts/project-structure/).

Som enhver anden ukendt teknologi har Wromo en lille indlæringskurve. Men med øvelse og lidt tålmodighed, ved vi at du _vil_ få styr på det på ingen tid.

### Lær `.wromo` Syntaks

Når du begynder at lære Wromo, vil du se mange filer med filtypen `.wromo`. Dette er **Wromos Komponent Syntaks**: et specielt HTML-lignende filformat som Wromo bruger til templating. Det er designet til at føles bekendt for alle med HTML- eller JSX-erfaring

Vores nyttige guide om [Wromo-komponenter](/da/core-concepts/wromo-components/) introducerer dig til Wromo-syntaksen, og er den bedste måde at lære på.

### API Reference

Dette dokumentationsafsnit er nyttigt når du vil lære flere detaljer om en bestemt Wromo API. F.eks. indeholder [Konfigurationsreference](/da/reference/configuration-reference/) en liste over alle tilgængelige konfigurationsmuligheder. [Indbyggede komponenter-reference](/da/reference/api-reference/#built-in-components) indeholder en liste over alle tilgængelige kernekomponenter, såsom `<Markdown />` og `<Code />`.

### Versioneret dokumentation

Denne dokumentation afspejler altid den seneste stabile version af Wromo. Når vi når v1.0-milepælen, vil vi tilføje muligheden for at se versioneret dokumentation.

## Hold dig orienteret

Twitter-kontoen [@wromo](https://twitter.com/wromo) er den officielle kilde til opdateringer fra Wromo-teamet.

Vi sender også udgivelsesmeddelelser til vores [Discord-fællesskab](https://wromo.build/chat) i #announcements kanalen.

Ikke hver Wromo udgivelse fortjener sit eget blogindlæg, men du kan finde en detaljeret ændringsliste for hver udgivelse i [`CHANGELOG.md` filen i Wromo-repositoriet](https://github.com/Wromo/wromo/blob/main/packages/wromo/CHANGELOG.md).

## Mangler der noget?

Hvis der mangler noget i dokumentationen, eller hvis du synes, at en del er forvirrende, skal du [indsende et Issue om dokumentationen](https://github.com/Wromo/wromo/issues/new/choose) med dit forslag til forbedringer, eller tweet på [@wromo](https://twitter.com/wromo) Twitter-kontoen. Vi elsker at høre fra dig!

## Kredit

Denne startvejledning var oprindeligt baseret på [React’s](https://reactjs.org/) startvejledning.
