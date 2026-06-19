---
title: Skalowanie Ethereum
description: Rollupy grupują transakcje poza łańcuchem, zmniejszając koszty dla użytkownika. Jednak sposób, w jaki rollupy obecnie wykorzystują dane, jest zbyt drogi, co ogranicza możliwość obniżenia kosztów transakcji. Proto-danksharding rozwiązuje ten problem.
lang: pl
image: /images/roadmap/roadmap-transactions.png
alt: Mapa drogowa Ethereum
template: roadmap
---

Ethereum jest skalowane za pomocą [warstw 2](/layer-2/#rollups) (znanych również jako rollupy), które grupują transakcje i wysyłają ich wynik do Ethereum. Mimo że rollupy są nawet ośmiokrotnie tańsze niż sieć główna Ethereum, możliwe jest ich dalsze zoptymalizowanie w celu obniżenia kosztów dla użytkowników końcowych. Rollupy opierają się również na pewnych scentralizowanych komponentach, które deweloperzy mogą usunąć w miarę ich dojrzewania.

<Alert variant="update">
<AlertContent>
<AlertTitle className="mb-4">
  Koszty transakcji
</AlertTitle>
  <ul style={{ marginBottom: 0 }}>
    <li>Dzisiejsze rollupy są <strong>~5-20x</strong> tańsze niż warstwa 1 Ethereum</li>
    <li>ZK-rollupy wkrótce obniżą opłaty o <strong>~40-100x</strong></li>
    <li>Nadchodzące zmiany w Ethereum zapewnią kolejne <strong>~100-1000x</strong> skalowania</li>
    <li style={{ marginBottom: 0 }}>Użytkownicy powinni skorzystać na transakcjach <strong>kosztujących mniej niż 0,001 USD</strong></strong>
  </strong>
</AlertContent>
</Alert>

## Obniżenie kosztów danych {#making-data-cheaper}

Rollupy zbierają duże ilości transakcji, wykonują je i przesyłają wyniki do Ethereum. Generuje to mnóstwo danych, które muszą być publicznie dostępne, aby każdy mógł samodzielnie wykonać transakcje i zweryfikować, czy operator rollupa był uczciwy. Jeśli ktoś znajdzie rozbieżność, może to zakwestionować.

### Proto-danksharding {#proto-danksharding}

Dane rollupów były historycznie przechowywane w Ethereum na stałe, co jest kosztowne. Ponad 90% kosztów transakcji, które użytkownicy płacą w rollupach, wynika z przechowywania tych danych. Aby obniżyć koszty transakcji, możemy przenieść dane do nowego, tymczasowego magazynu typu „blob”. Bloby są tańsze, ponieważ nie są trwałe; są usuwane z Ethereum, gdy nie są już potrzebne. Długoterminowe przechowywanie danych rollupów staje się obowiązkiem osób, które ich potrzebują, takich jak operatorzy rollupów, giełdy, usługi indeksowania itp. Dodanie transakcji typu blob do Ethereum jest częścią aktualizacji znanej jako „proto-danksharding”.

Dzięki proto-dankshardingowi możliwe jest dodanie wielu blobów do bloków Ethereum. Umożliwia to kolejne znaczne (>100x) zwiększenie przepustowości Ethereum i obniżenie kosztów transakcji.

### Danksharding {#danksharding}

Drugi etap rozszerzania danych blobów jest skomplikowany, ponieważ wymaga nowych metod sprawdzania, czy dane rollupów są dostępne w sieci, i opiera się na [walidatorach](/glossary/#validator) oddzielających swoje obowiązki związane z budowaniem [bloku](/glossary/#block) od propozycji bloku. Wymaga to również sposobu na kryptograficzne udowodnienie, że walidatorzy zweryfikowali małe podzbiory danych blobów.

Ten drugi krok jest znany jako [„danksharding”](/roadmap/danksharding/). Prace wdrożeniowe trwają, a postępy są widoczne w zakresie wymagań wstępnych, takich jak [oddzielenie budowania bloku od propozycji bloku](/roadmap/pbs) oraz nowe projekty sieci, które umożliwiają sieci wydajne potwierdzanie dostępności danych poprzez losowe próbkowanie kilku kilobajtów na raz, co jest znane jako [próbkowanie dostępności danych (DAS)](/developers/docs/data-availability).

<ButtonLink variant="outline-color" href="/roadmap/danksharding/">Więcej o dankshardingu</ButtonLink>

## Decentralizacja rollupów {#decentralizing-rollups}

[Rollupy](/layer-2) już teraz skalują Ethereum. [Bogaty ekosystem projektów rollupów](https://l2beat.com/scaling/tvs) umożliwia użytkownikom szybkie i tanie przeprowadzanie transakcji z zachowaniem szeregu gwarancji bezpieczeństwa. Jednak rollupy zostały uruchomione przy użyciu scentralizowanych sekwenserów (komputerów, które wykonują całe przetwarzanie i agregację transakcji przed przesłaniem ich do Ethereum). Jest to podatne na cenzurę, ponieważ operatorzy sekwenserów mogą zostać objęci sankcjami, przekupieni lub w inny sposób skompromitowani. Jednocześnie [rollupy różnią się](https://l2beat.com/scaling/summary) sposobem walidacji przychodzących danych. Najlepszym sposobem jest przesyłanie przez „dowodzących” (ang. provers) [dowodów oszustwa](/glossary/#fraud-proof) lub dowodów ważności, ale nie wszystkie rollupy już to robią. Nawet te rollupy, które używają dowodów ważności/oszustwa, korzystają z małej puli znanych dowodzących. Dlatego kolejnym kluczowym krokiem w skalowaniu Ethereum jest rozdzielenie odpowiedzialności za uruchamianie sekwenserów i dowodzących na większą liczbę osób.

<ButtonLink variant="outline-color" href="/developers/docs/scaling/">Więcej o rollupach</ButtonLink>

## Obecny postęp {#current-progress}

Proto-danksharding został pomyślnie wdrożony jako część aktualizacji sieci Cancun-Deneb („Dencun”) w marcu 2024 roku. Od czasu jego wdrożenia rollupy zaczęły wykorzystywać przechowywanie blobów, co zaowocowało obniżeniem kosztów transakcji dla użytkowników i milionami transakcji przetwarzanych w blobach.

Prace nad pełnym dankshardingiem trwają, a postępy są widoczne w zakresie jego wymagań wstępnych, takich jak separacja proponującego i budującego (PBS) oraz próbkowanie dostępności danych (DAS). Decentralizacja infrastruktury rollupów to stopniowy proces – istnieje wiele różnych rollupów, które budują nieco inne systemy i będą w pełni decentralizować się w różnym tempie.

[Więcej o aktualizacji sieci Dencun i jej wpływie](/roadmap/dencun/)

<QuizWidget quizKey="scaling" />