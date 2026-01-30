---
title: Skalowania Ethereum
description: Pakiety zbiorowe grupują razem transakcje poza łańcuchem, zmniejszając koszty dla użytkownika. Jednak sposób, w jaki pakiety zbiorcze wykorzystują dane, jest obecnie zbyt drogi, ograniczając możliwość tanich transakcji. Proto-Danksharding to naprawia.
lang: pl
image: /images/roadmap/roadmap-transactions.png
alt: "Plan działania Ethereum"
template: roadmap
---

Ethereum jest skalowane przy użyciu [warstw 2](/layer-2/#rollups) (znanych również jako pakiety zbiorcze), które grupują transakcje w pakiety i wysyłają dane wyjściowe do Ethereum. Mimo że pakiety zbiorcze są do ośmiu razy tańsze niż sieć główna Ethereum, możliwa jest dalsza optymalizacja pakietów zbiorczych w celu dalszego obniżenia kosztów dla użytkowników końcowych. Pakiety zbiorcze opierają się również na niektórych scentralizowanych elementach, które deweloperzy mogą usuwać w miarę rozwoju pakietów zbiorczych.

<Alert variant="update" className="mb-8">
<AlertContent>
<AlertTitle className="mb-4">
  Koszty transakcji
</AlertTitle>
  <ul style={{ marginBottom: 0 }}>
    <li>Obecne pakiety zbiorcze są <strong>około 5-20 razy</strong> tańsze niż warstwa 1 Ethereum</li>
    <li>Pakiety zbiorcze o wiedzy zerowej (ZK-rollups) wkrótce obniżą opłaty o <strong>około 40-100 razy</strong></li>
    <li>Nadchodzące zmiany w Ethereum zapewnią kolejne <strong>około 100-1000 razy</strong> skalowania</li>
    <li style={{ marginBottom: 0 }}>Użytkownicy powinni skorzystać z transakcji <strong>kosztujących mniej niż 0,001 USD</strong></li>
  </ul>
</AlertContent>
</Alert>

## Tańsze dane {#making-data-cheaper}

Pakiety zbiorcze zbierają dużą liczbę transakcji, wykonują je i przesyłają wyniki do Ethereum. Generuje to wiele danych, które muszą być otwarcie dostępne, aby każdy mógł samodzielnie wykonać transakcje i zweryfikować, czy operator pakietu zbiorczego był uczciwy. Jeśli ktoś znajdzie rozbieżność, może zakwestionować wyniki.

### Proto-Danksharding {#proto-danksharding}

Dane pakietu zbiorczego były kiedyś przechowywane na stałe w Ethereum, co jest kosztowne. Ponad 90% kosztów transakcji ponoszonych przez użytkowników w związku z pakietami zbiorczymi wynika z przechowywania tych danych. Aby zmniejszyć koszty transakcji, możemy przenieść dane do nowej tymczasowej pamięci „blob”. Bloby są tańsze, ponieważ nie są trwałe; usuwa się je z Ethereum, gdy nie są już potrzebne. Długoterminowe przechowywanie danych pakietów zbiorczych staje się obowiązkiem osób, które ich potrzebują, jak np. operatorów pakietów zbiorczych, giełdy, usługi indeksowania itp. Dodawanie transakcji blobów do Ethereum jest częścią aktualizacji znanej jako „Proto-Danksharding”.

Z Proto-Dankshardingiem do bloków Ethereum można dodawać wiele blobów. Umożliwia to kolejne znaczące (>100x) zwiększenie przepustowości Ethereum i zmniejszenie kosztów transakcji.

### Danksharding {#danksharding}

Drugi etap rozszerzania danych blob jest skomplikowany, ponieważ wymaga nowych metod sprawdzania, czy dane pakietu zbiorczego są dostępne w sieci i opiera się na [walidatorach](/glossary/#validator) oddzielających swoje obowiązki tworzenia [bloków](/glossary/#block) i proponowania bloków. Wymaga to również sposobu na kryptograficzne udowodnienie, że walidatory zweryfikowały małe podzbiory danych blobów.

Ten drugi etap jest znany jako ["Danksharding"](/roadmap/danksharding/). Prace wdrożeniowe trwają, a postępy są czynione w zakresie warunków wstępnych, takich jak [oddzielenie tworzenia bloków i propozycji bloków](/roadmap/pbs) oraz nowe projekty sieciowe, które umożliwiają sieci skuteczne potwierdzanie, że dane są dostępne, poprzez losowe próbkowanie kilku kilobajtów na raz, znane jako [próbkowanie dostępności danych (DAS)](/developers/docs/data-availability).

<ButtonLink variant="outline-color" href="/roadmap/danksharding/">Więcej o Dankshardingu</ButtonLink>

## Decentralizacja pakietów zbiorczych {#decentralizing-rollups}

[Pakiety zbiorcze](/layer-2) już skalują Ethereum. [Bogaty ekosystem projektów pakietów zbiorczych](https://l2beat.com/scaling/tvs) umożliwia użytkownikom szybkie i tanie przeprowadzanie transakcji z szeregiem gwarancji bezpieczeństwa. Jednak pakiety zbiorcze zostały uruchomione przy użyciu scentralizowanych sekwencerów (komputerów, które wykonują całe przetwarzanie transakcji i agregację przed przesłaniem ich do Ethereum). Jest to podatne na cenzurę, ponieważ operatorzy sekwencerów mogą zostać ukarani, przekupieni lub w inny sposób zagrożeni. Jednocześnie [pakiety zbiorcze różnią się](https://l2beat.com/scaling/summary) sposobem weryfikacji przychodzących danych. Najlepszym sposobem jest, aby "dowodzący" przesyłali [dowody oszustwa](/glossary/#fraud-proof) lub dowody ważności, ale nie wszystkie pakiety zbiorcze są już na to gotowe. Nawet te pakiety zbiorcze, które wykorzystują dowody ważności/oszustwa, korzystają z niewielkiej puli znanych udowadniających. Dlatego kolejnym krytycznym etapem w skalowaniu Ethereum jest rozłożenie odpowiedzialności za uruchamianie sekwencerów i udowadniających na większą liczbę osób.

<ButtonLink variant="outline-color" href="/developers/docs/scaling/">Więcej o pakietach zbiorczych</ButtonLink>

## Aktualny postęp {#current-progress}

Proto-Danksharding został pomyślnie wdrożony w ramach uaktualnienia sieci nazwanej Cancun-Deneb („Dencun”) w marcu 2024 roku. Od czasu jego implementacji pakiety zbiorcze zaczęły korzystać z pamięci blobów, co doprowadziło do obniżenia kosztów transakcji dla użytkowników i przetworzenia milionów transakcji w blobach.

Prace nad pełnym Dankshardingiem wciąż trwają, a postępy są widoczne w zakresie jego wymagań wstępnych, takich jak PBS (separacja proponujący-budujący) i DAS (próbkowanie dostępności danych). Decentralizacja infrastruktury pakietów zbiorczych to procesem stopniowy — istnieje wiele różnych pakietów zbiorczych, które budują nieco inne systemy i będą w pełni decentralizować się w różnym tempie.

[Więcej o aktualizacji sieci Dencun i jej wpływie](/roadmap/dencun/)

<QuizWidget quizKey="scaling" />
