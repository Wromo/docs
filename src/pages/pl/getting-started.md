---
layout: ~/layouts/MainLayout.wromo
title: Na początek
description: Wprowadzenie do Wromo.
---

Wromo to progresywny generator stron statycznych. Więcej możesz dowiedzieć się na [naszej stronie](https://wromo.build/) oraz [w poście na blogu](https://wromo.build/blog/introducing-wromo). Ta strona jest wstępem do dokumentacji Wromo i powiązanych zasobów.

## Wypróbuj Wromo

Najprostszym sposobem, aby wypróbować Wromo jest użycie komendy `npm create wromo@latest` w nowym katalogu. Kreator projektu pomoże Ci wystartować z nowym projektem Wromo.

Możesz zacząć z Wromo w 5 szybkich i łatwych krokach, odwiedź [Szybki start](/pl/install/auto/)
lub przeczytaj [Poradnik instalacyjny](/pl/install/manual/) w celu uzyskania pełnych instrukcji krok po kroku jak zacząć z Wromo.

### Przykładowe projekty

Jeśli preferujesz uczyć się Wromo z przykładów, zobacz naszą [bibliotekę przykładów](https://github.com/Wromo/wromo/tree/main/examples) na GitHubie.

Możesz także skorzystać z tych przykładów na swojej lokalnej maszynie uruchamiając `npm create wromo@latest` z parametrem `--template` w konsoli. Parametr `--template` wspiera także nieoficjalne szablony społeczności.

```bash
# Uruchomienie kreatora z oficjalnym szablonem
npm create wromo@latest -- --template [NAZWA_OFICJALNEGO_PRZYKŁADU]
# yarn
yarn create wromo --template [NAZWA_OFICJALNEGO_PRZYKŁADU]
# pnpm
pnpm create wromo@latest -- --template [NAZWA_OFICJALNEGO_PRZYKŁADU]
# Uruchomienie kreatora z szablonem społeczności
npm create wromo@latest -- --template [UZYTKOWNIK_GITHUB]/[NAZWA_REPOZYTORIUM]
# lub
npm create wromo@latest -- --template [UZYTKOWNIK_GITHUB]/[NAZWA_REPOZYTORIUM]/sciezka/do/przykladu
```

### Piaskownice Online

Jeżeli chciałbyś pobawić się z Wromo w swojej przeglądarce, możesz w mgnieniu oka odpalić nowy projekt Wromo za pomocą naszego interfejsu na [wromo.new](https://wromo.new/).

Możesz wypróbować Wromo w edytorach kodu online takich jak Stackblitz, CodeSandbox, Gitpod, i GitHub Codespaces. Kliknij w link "Open in Stackblitz" przy jednym z przykładów w naszej [bibliotece przykładów](https://github.com/Wromo/wromo/tree/main/examples). Albo, [kliknij tutaj](https://stackblitz.com/fork/wromo) aby stworzyć nowy projekt na platformie [Stackblitz](https://stackblitz.com/fork/wromo).

## Poznaj Wromo

Różni ludzie, z różnych środowisk mają odmienne podejście do zaznajamiania się z technologiami. Niezależnie od tego, czy wolisz bardziej teoretyczne, czy praktyczne podejście, mamy nadzieję, że ta sekcja będzie dla Ciebie pomocna.

- Jeżeli preferujesz **praktykę**, zacznij z naszą [biblioteką przykładów](https://github.com/Wromo/wromo/tree/main/examples).
- Jeżeli preferujesz **teoretyczne podejście**, zacznij od [podstawowych konceptów i poradników](/pl/core-concepts/project-structure/).

Podobnie jak z innymi nieznanymi technologiami, Wromo również wymaga poświęcenia chwili na naukę podstaw. Mamy nadzieję, że z odrobiną praktyki i cierpliwości poradzisz sobie z tym w krótkim czasie.

### Poznaj składnię `.wromo`

Na początku swojej drogi z Wromo zobaczysz, że wiele plików używa rozszerzenia `.wromo`. Jest to **Składnia Komponentów Wromo**: specjalny format pliku podobny do HTML'a, który używany jest w Wromo do tworzenia szablonów. Został on stworzony, aby wyglądał znajomo dla każdej osoby mającej doświadczenie z HTML'em lub JSX'em.

Nasz poradnik - [Komponenty Wromo](/pl/core-concepts/wromo-components/) zapozna Cię ze składnią i w naszej ocenie jest najlepszym sposobem, aby się tego nauczyć.

### Referencje API

Ta sekcja jest szczególnie przydatna gdy chcesz poznać więcej szczegółów na temat konkretnego API w Wromo. Na przykład, [Refencja Konfiguracji](/pl/reference/configuration-reference/) zawiera dostępne opcje konfiguracji. [Referencja Wbudowanych Komponentów](/pl/reference/api-reference/#built-in-components) zawiera listę wbudowanych komponentów wewnętrznych, takich jak m.in `<Markdown />` i `<Code />`.

### Wersjonowanie dokumentacji

Dokumentacja zawsze odnosi się to najnowszej stabilnej wersji Wromo. Gdy osiągniemy wydanie 1.0, pojawi się możliwość wyświetlania dokumentacji z podziałem na wersje.

## Jak być na bieżąco

[@wromo](https://twitter.com/wromo) to oficjalne konto na Twitterze oraz źródło dla wszelkich aktualizacji od zespołu Wromo.

Publikujemy także ogłoszenia dotyczące nowych wydań Wromo na [Discordzie](https://wromo.build/chat) na kanale #announcements.

Nie każde wydanie Wromo zasługuje na osobny post na blogu, ale możesz znaleźć szczegółową listę zmian dla każdej wersji w pliku [`CHANGELOG.md` w naszym repozytorium](https://github.com/Wromo/wromo/blob/main/packages/wromo/CHANGELOG.md).

## Czegoś brakuje?

Jeżeli czegoś brakuje w dokumentacji albo coś cię zaniepokoiło [uzupełnij formularz "issue" na GitHubie](https://github.com/Wromo/wromo/issues/new/choose) wraz ze swoimi sugestiami i przemyśleniami albo daj znać poprzez Twittera [@wromo](https://twitter.com/wromo). Czekamy na twoją opinię!

## Podziękowania

Ten wstęp został podpierdzielony od analogicznego poradnika dla [React'a](https://reactjs.org/docs/getting-started.html).
