---
title: Węzły jako usługa
description: Podstawowy przegląd usług węzłów, zalet i wad oraz popularnych dostawców.
lang: pl
sidebarDepth: 2
isOutdated: true
---

## Wprowadzenie {#Introduction}

Uruchamianie własnego [węzła Ethereum](/developers/docs/nodes-and-clients/#what-are-nodes-and-clients) może być trudne, szczególnie podczas rozpoczynania lub szybkiego skalowania. Istnieje [wiele usług](#popular-node-services) uruchamiających zoptymalizowaną infrastrukturę węzłów dla Ciebie, więc możesz skupić się na rozwijaniu swojej aplikacji lub produktu. Wyjaśnimy, jak działają usługi węzłów, jakie są zalety i wady korzystania z nich oraz przedstawimy listę dostawców, jeśli jesteś zainteresowany rozpoczęciem działalności.

## Warunki wstępne {#prerequisites}

Jeśli nie wiesz jeszcze, czym są węzły i klienci, sprawdź [Węzły i klienci](/developers/docs/nodes-and-clients/).

## Jak działają usługi węzła? {#how-do-node-services-work}

Dostawcy usług węzłów obsługują dla Ciebie klientów węzłów rozproszonych, więc nie musisz tego robić.

Te usługi zazwyczaj zapewniają klucz API, którego możesz użyć do pisania i odczytywania z blockchainu. Często obejmują one dostęp do [sieci testowych Ethereum](/developers/docs/networks/#ethereum-testnets) oprócz sieci głównej.

Niektóre usługi oferują własny dedykowany węzeł, którym zarządzają za Ciebie, podczas gdy inne używają systemów równoważenia obciążenia do dystrybucji aktywności między węzłami.

Prawie wszystkie usługi węzłów są niezwykle łatwe do zintegrowania, obejmują zmiany w jednym wierszu w kodzie, aby zamienić węzeł hostowany na własnym serwerze, a nawet przełączać się między samymi usługami.

Często usługi węzłów uruchamiają różnych [klientów](/developers/docs/nodes-and-clients/#execution-clients) i [typy węzłów](/developers/docs/nodes-and-clients/#node-types), co pozwala na dostęp do pełnych i archiwalnych węzłów oprócz metod specyficznych dla klienta w jednym interfejsie API.

Należy pamiętać, że usługi węzłów nie przechowują i nie powinny przechowywać kluczy prywatnych ani informacji.

## Jakie są zalety korzystania z usługi węzła? {#benefits-of-using-a-node-service}

Główną zaletą korzystania z usługi węzła jest brak konieczności poświęcania czasu na konserwację węzłów i samodzielne zarządzanie nimi. Pozwala to skoncentrować się na budowie swojego produktu, bez martwienia się o konserwację infrastruktury.

Uruchamianie własnych węzłów może być bardzo kosztowne od pamięci przez przepustowości do cennego czasu inżynierów. Takie czynności jak uruchamianie większej liczby węzłów podczas skalowania, aktualizowanie węzłów do najnowszych wersji i zapewnianie spójności stanu mogą odciągnąć uwagę od budowania i wydawania zasobów na pożądany produkt web3.

## Jakie są wady korzystania z usługi węzła? {#cons-of-using-a-node-service}

Korzystając z usługi węzła, centralizujesz aspekt infrastrukturalny Twojego produktu. Z tego powodu projekty, dla których decentralizacja jest najważniejsza, mogą preferować samodzielne utrzymywanie węzłów zamiast zlecania tego stronie trzeciej.

Dowiedz się więcej o [zaletach uruchomienia własnego węzła](/developers/docs/nodes-and-clients/#benefits-to-you).

## Popularne usługi węzłów {#popular-node-services}

Oto lista najbardziej popularnych dostawców węzłów Ethereum, możesz dodać dowolne, których brakuje! Każda usługa węzła oferuje inne korzyści i funkcje oprócz bezpłatnych lub płatnych warstw. Przed podjęciem decyzji powinieneś zbadać, które z nich najlepiej pasują do Twoich potrzeb.

- [**Alchemy**](https://alchemyapi.io/)
  - [Dokumenty](https://docs.alchemyapi.io/)
  - Funkcje
    - Opcja darmowej warstwy
    - Skalowanie w miarę postępów
    - Darmowe dane archiwalne
    - Narzędzia analityczne
    - Panel zarządzania
    - Unikalne punkty końcowe API
    - Webhooks
    - Bezpośrednie wsparcie
- [**Infura**](https://infura.io/)
  - [Dokumenty](https://infura.io/docs)
  - Funkcje
    - Opcja darmowej warstwy
    - Skalowanie w miarę postępów
    - Płatne dane archiwalne
    - Bezpośrednie wsparcie
    - Panel zarządzania
- [**QuikNode**](https://www.quiknode.io/)
  - Funkcje
    - 7-dniowy darmowy okres próbny
    - Różne wsparcie
    - Webhooks
    - Panel zarządzania
    - Analityka
- [**Nit**](https://rivet.cloud/)
  - [Dokumenty](https://rivet.readthedocs.io/en/latest/)
  - Funkcje
    - Opcja darmowej warstwy
    - Skalowanie w miarę postępów
- [**BlockDaemon**](https://blockdaemon.com/)
  - [Dokumenty](https://ubiquity.docs.blockdaemon.com/)
  - Zalety
    - Panel zarządzania
    - Subskrypcja na węzeł
    - Analityka

## Dalsza lektura {#further-reading}

- [Lista usług węzła Ethereum](https://ethereumnodes.com/)

## Powiązane tematy {#related-topics}

- [Węzły i klienci](/developers/docs/nodes-and-clients/)

## Powiązane samouczki {#related-tutorials}

- [Rozpoczęcie rozwoju Ethereum za pomocą Alchemy](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)
- [Przewodnik po wysyłaniu transakcji za pomocą web3 i Alchemy](/developers/tutorials/getting-started-with-ethereum-development-using-alchemy/)
