---
title: Skalowania Ethereum
description: Pakiety zbiorowe grupują razem transakcje poza łańcuchem, zmniejszając koszty dla użytkownika. Jednak sposób, w jaki pakiety zbiorcze wykorzystują dane, jest obecnie zbyt drogi, ograniczając możliwość tanich transakcji. Proto-Danksharding to naprawia.
lang: pl
image: /images/roadmap/roadmap-transactions.png
alt: "Plan działania Ethereum"
template: roadmap
---

Ethereum jest skalowane przy użyciu [warstwy 2](/layer-2/#rollups) (znanej również jako pakiety zbiorcze), która łączy transakcje i wysyła dane do Ethereum. Mimo że pakiety zbiorcze są do ośmiu razy tańsze niż sieć główna Ethereum, możliwa jest dalsza optymalizacja pakietów zbiorczych w celu dalszego obniżenia kosztów dla użytkowników końcowych. Pakiety zbiorcze opierają się również na niektórych scentralizowanych elementach, które deweloperzy mogą usuwać w miarę rozwoju pakietów zbiorczych.

<InfoBanner mb={8} title="Koszty transakcji">
  <ul style={{ marginBottom: 0 }}>
    <li>Obecne pakiety zbiorcze są <strong>około 5-20 razy</strong> tańsze niż warstwa 1 Ethereum</li>
    <li>Pakiety zbiorcze o wiedzy zerowej (ZK-rollups) wkrótce obniżą opłaty o <strong>około 40-100 razy</strong></li>
    <li>Nadchodzące zmiany w Ethereum zapewnią kolejne <strong>około 100-1000 razy</strong> skalowania</li>
    <li style={{ marginBottom: 0 }}>Użytkownicy powinni skorzystać z transakcji <strong>kosztujących mniej niż 0,001 USD</strong></li>
  </ul>
</InfoBanner>

## Tańsze dane {#making-data-cheaper}

Pakiety zbiorcze zbierają dużą liczbę transakcji, wykonują je i przesyłają wyniki do Ethereum. Generuje to wiele danych, które muszą być otwarcie dostępne, aby każdy mógł samodzielnie wykonać transakcje i zweryfikować, czy operator pakietu zbiorczego był uczciwy. Jeśli ktoś znajdzie rozbieżność, może zakwestionować wyniki.

### Proto-Danksharding {#proto-danksharding}

Dane pakietu zbiorczego były kiedyś przechowywane na stałe w Ethereum, co jest kosztowne. Ponad 90% kosztów transakcji ponoszonych przez użytkowników w związku z pakietami zbiorczymi wynika z przechowywania tych danych. Aby zmniejszyć koszty transakcji, możemy przenieść dane do nowej tymczasowej pamięci „blob”. Bloby są tańsze, ponieważ nie są trwałe; usuwa się je z Ethereum, gdy nie są już potrzebne. Długoterminowe przechowywanie danych pakietów zbiorczych staje się obowiązkiem osób, które ich potrzebują, jak np. operatorów pakietów zbiorczych, giełdy, usługi indeksowania itp. Dodawanie transakcji blobów do Ethereum jest częścią aktualizacji znanej jako „Proto-Danksharding”.

Z Proto-Dankshardingiem do bloków Ethereum można dodawać wiele blobów. Będzie to kolejny znaczący (>100 razy) wzrost przepustowości Ethereum i spadek kosztów transakcji.

### Danksharding {#danksharding}

Drugi etap rozszerzania danych blob jest skomplikowany, ponieważ wymaga nowych metod sprawdzania, czy dane pakietu zbiorczego są dostępne w sieci i opiera się na [walidatorach](/glossary/#validator) oddzielających swoje obowiązki tworzenia [bloków](/glossary/#block) i proponowania bloków. Wymaga to również sposobu na kryptograficzne udowodnienie, że walidatory zweryfikowały małe podzbiory danych blobów.

Ten drugi etap jest znany jako [„Danksharding”](/roadmap/danksharding/). Do jego pełnego wdrożenia **pozostało jeszcze prawdopodobnie kilka lat**. Danksharding opiera się na innych rozwiązaniach, takich jak [separacja tworzenia bloków i propozycji bloków](/roadmap/pbs) oraz nowych projektach sieci, które umożliwiają jej skuteczne potwierdzanie, że dane są dostępne, poprzez losowe próbkowanie kilku kilobajtów na raz, zwane [próbkowaniem dostępności danych (DAS)](/developers/docs/data-availability).

<ButtonLink variant="outline-color" href="/roadmap/danksharding/">Więcej o Dankshardingu</ButtonLink>

## Decentralizacja pakietów zbiorczych {#decentralizing-rollups}

[Pakiety zbiorcze](/layer-2) już skalują Ethereum. [Bogaty ekosystem projektów pakietów zbiorczych](https://l2beat.com/scaling/tvl) pozwala użytkownikom na szybkie i tanie transakcje z szeregiem gwarancji bezpieczeństwa. Jednak pakiety zbiorcze zostały uruchomione przy użyciu scentralizowanych sekwencerów (komputerów, które wykonują całe przetwarzanie transakcji i agregację przed przesłaniem ich do Ethereum). Jest to podatne na cenzurę, ponieważ operatorzy sekwencerów mogą zostać ukarani, przekupieni lub w inny sposób zagrożeni. Jednocześnie [pakiety zbiorcze różnią się](https://l2beat.com) sposobem weryfikacji przychodzących danych. Najlepszym sposobem jest przesyłanie przez „udowadniających” [dowodów oszustwa](/glossary/#fraud-proof) lub dowodów ważności, ale jeszcze nie wszystkie pakiety zbiorcze to uwzględniają. Nawet te pakiety zbiorcze, które wykorzystują dowody ważności/oszustwa, korzystają z niewielkiej puli znanych udowadniających. Dlatego kolejnym krytycznym etapem w skalowaniu Ethereum jest rozłożenie odpowiedzialności za uruchamianie sekwencerów i udowadniających na większą liczbę osób.

<ButtonLink variant="outline-color" href="/developers/docs/scaling/">Więcej o pakietach zbiorczych</ButtonLink>

## Aktualny postęp {#current-progress}

Proto-Danksharding to pierwszy z tych elementów planu działania, który zostanie wdrożony w ramach aktualizacji sieci Cancun-Deneb („Dencun”) w marcu 2024. **Pełny Danksharding zostanie wdrożony najprawdopodobniej za kilka lat**, ponieważ zależy od ukończenia kilku innych elementów planu działania. Decentralizacja infrastruktury pakietów zbiorczych będzie prawdopodobnie procesem stopniowym — istnieje wiele różnych pakietów zbiorczych, które budują nieco inne systemy i będą w pełni decentralizować się w różnym tempie.

[Więcej o aktualizacji sieci Dencun](/roadmap/dencun/)

<QuizWidget quizKey="scaling" />
