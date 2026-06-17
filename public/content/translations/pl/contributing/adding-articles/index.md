---
title: "Dodawanie artykułów"
description: "Wytyczne dotyczące dodawania artykułów dla budowniczych na ethereum.org"
lang: pl
---

## Publikowanie artykułu dla budowniczych {#publishing-a-builder-article}

Artykuły dla budowniczych pojawiają się na stronie [ethereum.org/latest/](/latest/) i są tworzone jako pliki Markdown w repozytorium. Są to hostowane wewnętrznie, obszerne artykuły, które zawierają przeglądy i przewodniki po ekosystemie Ethereum, krajobrazie technologii open-source, a także aktualne informacje dla budowniczych i badaczy, obejmujące takie tematy jak aktualizacje protokołu, nowe wzorce narzędzi, wdrożenia referencyjne i inne.

### Zasady publikacji {#listing-policy}

Ethereum.org to neutralne, edukacyjne źródło informacji. Sekcja „Najnowsze” jest nadzorowana, aby:

- **Edukować** budowniczych i szerszą społeczność na temat technologii Ethereum, ekosystemu open-source oraz bieżących wydarzeń
- **Zachować dokładność** w treściach technicznych i odniesieniach
- **Pozostać istotną** dla społeczności budowniczych Ethereum

Strona nie publikuje artykułów, które w głównej mierze promują konkretny produkt, token lub usługę komercyjną. Wszystkie zgłoszenia są sprawdzane przez zespół ethereum.org przed publikacją.

### Kryteria akceptacji {#criteria-for-inclusion}

#### Wymagania obowiązkowe {#must-haves}

- **Skupienie na Ethereum i open-source** - Artykuł musi dotyczyć przede wszystkim Ethereum, jego protokołu, narzędzi lub ekosystemu budowniczych, albo technologii open-source i technologii wspierających, które go obsługują. Treści dotyczące ogólnych tematów związanych z blockchainem lub Web3, które nie odnoszą się w znacznym stopniu do Ethereum lub jego krajobrazu open-source, nie będą akceptowane.
- **Wartość edukacyjna lub poglądowa** - Artykuł powinien uczyć budowniczych czegoś praktycznego (np. jak korzystać z nowego EIP, jak ocenić wybór architektoniczny, jak wdrożyć infrastrukturę open-source lub wnieść do niej wkład) lub zapewniać sensowną perspektywę na stan Ethereum i otaczającego go ekosystemu open-source. Treści promocyjne dotyczące konkretnych produktów, tokenów lub usług komercyjnych nie są akceptowane.
- **Dokładne informacje** - Twierdzenia techniczne muszą być poprawne merytorycznie i aktualne. Tam, gdzie to możliwe, należy cytować EIP, oficjalne ogłoszenia lub dane onchain.
- **Oryginalna praca** - Treść musi być oryginalna lub wykorzystana za zgodą. Zobacz [politykę dotyczącą plagiatów](/contributing/#plagiarism).
- **Język** - Artykuły można przesyłać w dowolnym [obsługiwanym języku](/contributing/translation-program/). Ustaw pole `lang`, aby pasowało do języka, w którym napisany jest artykuł (np. `en` dla angielskiego, `es` dla hiszpańskiego). Po przesłaniu artykułu zgłoszenia w języku angielskim mogą zostać przetłumaczone na inne języki, a zgłoszenia w językach innych niż angielski mogą zostać przetłumaczone na język angielski.

#### Mile widziane {#nice-to-haves}

- **Aktualne i ponadczasowe** - Treści, które pozostają przydatne po dacie publikacji, są preferowane w stosunku do materiałów o charakterze wyłącznie tymczasowym.
- **Wiarygodność autora** - Artykuły od uznanych budowniczych, badaczy lub współtwórców powiązanych z CROPS mają priorytet.
- **Dalsza lektura** - Dołącz sekcję `## Further reading` z linkami do odpowiednich EIP, dokumentacji i źródeł pierwotnych.

### Zaproponuj artykuł dla budowniczych {#propose-a-builder-article}

Jeśli chcesz napisać artykuł dla budowniczych na ethereum.org i spełnia on kryteria, utwórz zgłoszenie (issue) na GitHub.

<ButtonLink href="https://github.com/ethereum/ethereum-org-website/issues/new?template=content-suggestion.yml">
  Zaproponuj artykuł
</ButtonLink>