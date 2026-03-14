---
title: Mosty
description: "Przegląd mostów dla deweloperów"
lang: pl
---

Wraz z rozprzestrzenianiem się blockchainów L1 i rozwiązań do [skalowania](/developers/docs/scaling/) L2, a także stale rosnącą liczbą aplikacji zdecentralizowanych działających w trybie cross-chain, potrzeba komunikacji i przenoszenia aktywów między łańcuchami stała się istotną częścią infrastruktury sieciowej. Istnieją różne rodzaje mostów, które to umożliwiają.

## Potrzeba mostów {#need-for-bridges}

Mosty istnieją po to, by łączyć sieci blockchain. Umożliwiają one komunikację i interoperacyjność między blockchainami.

Blockchainy istnieją w odizolowanych środowiskach, co oznacza, że nie ma sposobu, aby blockchainy handlowały i komunikowały się z innymi blockchainami w sposób naturalny. W rezultacie, choć w ramach ekosystemu może istnieć znaczna aktywność i innowacje, jest ona ograniczona brakiem łączności i interoperacyjności z innymi ekosystemami.

Mosty oferują sposób odizolowanym środowiskom blockchain na łączenie się ze sobą. Ustanawiają one szlak transportowy pomiędzy blockchainami, na którym tokeny, wiadomości, dowolne dane, a nawet wywołania [inteligentnych kontraktów](/developers/docs/smart-contracts/) mogą być przekazywane z jednego łańcucha do drugiego.

## Korzyści z mostów {#benefits-of-bridges}

Mówiąc prościej, mosty odblokowują liczne przypadki zastosowań, umożliwiając sieciom blockchain wymianę danych i przenoszenie aktywów między nimi.

Blockchainy mają swoje wyjątkowe mocne i słabe strony oraz podejścia do tworzenia aplikacji (takie jak szybkość, przepustowość, opłacalność itp.). Mosty pomagają w rozwoju całego ekosystemu kryptowalut, umożliwiając blockchainom wzajemne wykorzystywanie innowacji.

Dla deweloperów mosty umożliwiają następujące funkcje:

- transfer wszelkich danych, informacji i aktywów między łańcuchami.
- odblokowanie nowych funkcji i zastosowań dla protokołów, ponieważ mosty rozszerzają przestrzeń projektową dla tego, co protokoły mogą zaoferować. Przykładowo, protokół do uprawy zysków pierwotnie wdrożony w sieci głównej Ethereum może oferować pule płynności we wszystkich łańcuchach kompatybilnych z EVM.
- możliwość wykorzystania mocnych stron różnych blochainów. Przykładowo, deweloperzy mogą skorzystać z niższych opłat oferowanych przez różne rozwiązania warstwy 2, wdrażając swoje zdecentralizowane aplikacje w ramach pakietów zbiorczych, a łańcuchy boczne i użytkownicy mogą łączyć się między nimi.
- współpraca między deweloperami z różnych ekosystemów blockchain w celu tworzenia nowych produktów.
- przyciąganie użytkowników i społeczności z różnych ekosystemów do swoich zdecentralizowanych aplikacji.

## Jak działają mosty? {#how-do-bridges-work}

Chociaż istnieje wiele [rodzajów projektów mostów](https://li.fi/knowledge-hub/blockchain-bridges-and-classification/), wyróżniają się trzy sposoby ułatwienia transferu aktywów między łańcuchami:

- **Zablokuj i wybij –** Zablokuj aktywa w łańcuchu źródłowym i wybij aktywa w łańcuchu docelowym.
- **Spal i wybij –** Spal aktywa w łańcuchu źródłowym i wybij aktywa w łańcuchu docelowym.
- **Swapy atomowe –** Zamień aktywa w łańcuchu źródłowym na aktywa w łańcuchu docelowym z inną stroną.

## Typy mostów {#bridge-types}

Mosty można zazwyczaj zaklasyfikować do jednej z następujących kategorii:

- **Mosty natywne –** Mosty te są zazwyczaj budowane w celu uruchomienia płynności na danym blockchainie, co ułatwia użytkownikom przenoszenie środków do ekosystemu. Na przykład [most Arbitrum](https://bridge.arbitrum.io/) został stworzony, aby ułatwić użytkownikom mostowanie z sieci głównej Ethereum do Arbitrum. Inne takie mosty to Polygon PoS Bridge, [Optimism Gateway](https://app.optimism.io/bridge) itp.
- **Mosty oparte na walidatorach lub Oracle –** Mosty te opierają się na zewnętrznym zestawie walidatorów lub Oracle w celu walidacji transferów międzyłańcuchowych. Przykłady: Multichain i Across.
- **Mosty do uogólnionego przekazywania wiadomości –** Mosty te mogą przesyłać aktywa wraz z wiadomościami i dowolnymi danymi między łańcuchami. Przykłady: Axelar, LayerZero i Nomad.
- **Sieci płynności –** Mosty te koncentrują się głównie na przenoszeniu aktywów z jednego łańcucha do drugiego za pomocą swapów atomowych. Ogólnie rzecz biorąc, nie obsługują one przekazywania wiadomości między łańcuchami. Przykłady: Connext i Hop.

## Kompromisy {#trade-offs}

W przypadku mostów nie ma idealnych rozwiązań. Są to raczej kompromisy dokonywane w celu osiągnięcia określonego celu. Deweloperzy i użytkownicy mogą oceniać mosty na podstawie następujących czynników:

- **Bezpieczeństwo –** Kto weryfikuje system? Mosty zabezpieczone przez zewnętrzne walidatory są zazwyczaj mniej bezpieczne niż mosty, które są lokalnie lub natywnie zabezpieczone przez walidatory blockchainu.
- **Wygoda –** Jak długo trwa realizacja transakcji i ile transakcji musi podpisać użytkownik? Dla dewelopera, ile czasu zajmuje integracja mostu i jak skomplikowany jest to proces?
- **Łączność –** Jakie są różne łańcuchy docelowe, które może połączyć most (tj. rollupy, łańcuchy poboczne, inne łańcuchy bloków warstwy 1 itp.) i jak trudno jest zintegrować nowy łańcuch bloków?
- **Zdolność do przekazywania bardziej złożonych danych –** Czy most umożliwia transfer wiadomości i bardziej złożonych, dowolnych danych między łańcuchami, czy też obsługuje tylko transfer aktywów między łańcuchami?
- **Opłacalność –** Ile kosztuje transfer aktywów między łańcuchami za pośrednictwem mostu? Zazwyczaj mosty pobierają stałą lub zmienną opłatę w zależności od kosztów gazu i płynności określonych tras. Kluczowe znaczenie ma również ocena opłacalności mostu na podstawie kapitału wymaganego do zapewnienia jego bezpieczeństwa.

Na wysokim poziomie mosty można podzielić na zaufane i niewymagające zaufania.

- **Wymagające zaufania –** Mosty wymagające zaufania są weryfikowane zewnętrznie. Wykorzystują one zewnętrzny zestaw weryfikatorów (federacje z multi-sig, wielostronne systemy obliczeniowe, sieć wyroczni) do przesyłania danych między łańcuchami. W rezultacie mogą one oferować doskonałą łączność i umożliwiać w pełni uogólnione przekazywanie wiadomości między łańcuchami. Mają one również tendencję do osiągania dobrych wyników pod względem szybkości i opłacalności. Odbywa się to kosztem bezpieczeństwa, ponieważ użytkownicy muszą polegać na zabezpieczeniach mostu.
- **Niewymagające zaufania –** Mosty te opierają się na połączonych przez siebie blockchainach i ich walidatorach w celu przesyłania wiadomości i tokenów. „Niewymagają zaufania”, ponieważ nie dodają nowych założeń zaufania (oprócz blochainów). W rezultacie mosty niewymagające zaufania są uważane za bezpieczniejsze niż mosty zaufane.

Aby ocenić mosty niewymagające zaufania na podstawie innych czynników, musimy podzielić je na uogólnione mosty przekazujące wiadomości i sieci płynności.

- **Mosty do uogólnionego przekazywania wiadomości –** Mosty te wyróżniają się bezpieczeństwem i zdolnością do przesyłania bardziej złożonych danych między łańcuchami. Zazwyczaj są one również dobre pod względem opłacalności. Jednak te mocne strony najczęściej wiążą się z kosztem łączności w przypadku mostów lekkich klientów (np. IBC) i ograniczeniami prędkości w przypadku mostów optymistycznych (np. Nomad), które wykorzystują dowody oszustwa.
- **Sieci płynności –** Mosty te wykorzystują swapy atomowe do przenoszenia aktywów i są systemami weryfikowanymi lokalnie (tj. do weryfikacji transakcji wykorzystują walidatorów bazowych blockchainów). W rezultacie wyróżniają się bezpieczeństwem i szybkością. Co więcej, są one uważane za stosunkowo opłacalne i oferują dobrą łączność. Jednak głównym kompromisem jest ich niezdolność do przekazywania bardziej złożonych danych — ponieważ nie obsługują one przekazywania wiadomości między łańcuchami.

## Ryzyko związane z mostami {#risk-with-bridges}

Mosty odpowiadają za trzy największe [hacki w DeFi](https://rekt.news/leaderboard/) i wciąż są na wczesnym etapie rozwoju. Korzystanie z dowolnego mostu wiąże się z następującymi zagrożeniami:

- **Ryzyko związane z inteligentnymi kontraktami –** Chociaż wiele mostów pomyślnie przeszło audyty, wystarczy jedna wada w inteligentnym kontrakcie, aby aktywa były narażone na ataki hakerskie (np. [most Wormhole na Solanie](https://rekt.news/wormhole-rekt/)).
- **Systemowe ryzyka finansowe –** Wiele mostów używa opakowanych aktywów do wybijania kanonicznych wersji oryginalnego aktywa w nowym łańcuchu. Wystawia to ekosystem na ryzyko systemowe, ponieważ widzieliśmy, jak wykorzystywane są owinięte wersje tokenów.
- **Ryzyko kontrahenta –** Niektóre mosty wykorzystują projekt wymagający zaufania, który wymaga od użytkowników polegania na założeniu, że walidatorzy nie wejdą w zmowę w celu kradzieży środków użytkowników. Konieczność zaufania przez użytkowników tym podmiotom trzecim naraża ich na ryzyko, takie jak oszustwo Rug Pull, cenzura i inne złośliwe działania.
- **Otwarte kwestie –** Biorąc pod uwagę, że mosty są w początkowej fazie rozwoju, istnieje wiele pytań bez odpowiedzi dotyczących tego, jak mosty będą działać w różnych warunkach rynkowych, np. w okresach przeciążenia sieci i podczas nieprzewidzianych zdarzeń, takich jak ataki na poziomie sieci lub cofnięcia stanu. Ta niepewność stwarza pewne ryzyko, którego stopień jest wciąż nieznany.

## Jak zdecentralizowane aplikacje mogą korzystać z mostów? {#how-can-dapps-use-bridges}

Oto kilka praktycznych zastosowań, które deweloperzy mogą rozważyć w odniesieniu do mostów i przenoszenia ich zdecentralizowanych aplikacji między łańcuchami:

### Integracja mostów {#integrating-bridges}

Deweloperzy mają wiele sposobów na dodanie wsparcia dla mostów:

1. **Budowa własnego mostu –** Zbudowanie bezpiecznego i niezawodnego mostu nie jest łatwe, zwłaszcza jeśli obierzesz drogę o zminimalizowanym zaufaniu. Co więcej, wymaga to wieloletniego doświadczenia i wiedzy technicznej związanej ze skalowalnością i badaniami interoperacyjności. Dodatkowo wymagałoby to zaangażowania zespołu do utrzymania mostu i przyciągnięcia wystarczającej płynności, aby było to opłacalne.

2. **Pokazywanie użytkownikom wielu opcji mostów –** Wiele [dapków](/developers/docs/dapps/) wymaga od użytkowników posiadania ich natywnego tokena do interakcji. Aby umożliwić użytkownikom dostęp do ich tokenów, oferują oni różne opcje mostów na swojej stronie internetowej. Jednak ta metoda jest szybkim rozwiązaniem problemu, ponieważ przenosi użytkownika z dala od interfejsu aplikacji i nadal wymaga od niego interakcji z innymi zdecentralizowanymi aplikacjami i mostami. Jest to uciążliwe doświadczenie związane wprowadzaniem użytkowników, które wiąże się ze zwiększonym ryzykiem popełnienia błędów.

3. **Integracja mostu –** To rozwiązanie nie wymaga od dapki wysyłania użytkowników do zewnętrznych interfejsów mostu i DEX. Pozwala to zdecentralizowanym aplikacjom usprawnić proces wprowadzania użytkowników. Rozwiązanie to ma jednak swoje ograniczenia:

   - Ocena i konserwacja mostów są trudne i czasochłonne.
   - Wybór jednego mostu tworzy pojedynczy punkt awarii i zależności.
   - Zdecentralizowana aplikacja jest ograniczona możliwościami mostu.
   - Same mosty mogą nie wystarczyć. Zdecentralizowane aplikacje mogą potrzebować zdecentralizowanych giełd, aby oferować więcej funkcji, takich jak zamiany między łańcuchami.

4. **Integracja wielu mostów –** To rozwiązanie rozwiązuje wiele problemów związanych z integracją pojedynczego mostu. Ma jednak również ograniczenia, ponieważ integracja wielu mostów zużywa dużo zasobów i tworzy techniczne i komunikacyjne koszty ogólne dla deweloperów — najbardziej deficytowego zasobu w kryptowalutach.

5. **Integracja agregatora mostów –** Innym rozwiązaniem dla dapków jest integracja rozwiązania do agregacji mostów, które daje im dostęp do wielu mostów. Agregatory mostów dziedziczą mocne strony wszystkich mostów, a zatem nie są ograniczone możliwościami pojedynczego mostu. Warto zauważyć, że agregatory mostów zazwyczaj utrzymują integracje mostów, co oszczędza zdecentralizowanym aplikacjom kłopotów związanych z technicznymi i operacyjnymi aspektami integracji mostów.

Biorąc to pod uwagę, agregatory mostów mają również swoje ograniczenia. Na przykład, chociaż mogą one oferować więcej opcji mostu to na rynku dostępnych jest zazwyczaj znacznie więcej mostów innych niż te oferowane na platformie agregatora. Co więcej, podobnie jak mosty, agregatory mostów są również narażone na ryzyko związane z inteligentnymi kontraktami i technologią (więcej inteligentnych kontraktów = większe ryzyko).

Jeśli zdecentralizowana aplikacja idzie drogą integracji mostu lub agregatora, istnieją różne opcje w zależności od tego, jak głęboka ma być integracja. Na przykład, jeśli jest to tylko integracja frontendowa mająca na celu poprawę doświadczenia wprowadzania użytkownika, zdecentralizowana aplikacja zintegrowałaby widżet. Jeśli jednak integracja ma na celu zbadanie głębszych strategii międzyłańcuchowych, takich jak stakowanie, uprawy zysków (yield farming) itp., zdecentralizowana aplikacja integruje SDK lub API.

### Wdrażanie dapki na wielu łańcuchach {#deploying-a-dapp-on-multiple-chains}

Aby wdrożyć dapką na wielu łańcuchach, deweloperzy mogą korzystać z platform deweloperskich, takich jak [Alchemy](https://www.alchemy.com/), [Hardhat](https://hardhat.org/), [Moralis](https://moralis.io/) itp. Zazwyczaj platformy te są wyposażane z komponowalnymi wtyczkami, które mogą umożliwić zdecentralizowanym aplikacjom działanie między łańcuchami. Na przykład deweloperzy mogą użyć deterministycznego proxy wdrażania oferowanego przez [wtyczkę hardhat-deploy](https://github.com/wighawag/hardhat-deploy).

#### Przykłady:

- [Jak budować dapki cross-chain](https://moralis.io/how-to-build-cross-chain-dapps/)
- [Budowanie międzyłańcuchowego rynku NFT](https://youtu.be/WZWCzsB1xUE)
- [Moralis: Budowanie międzyłańcuchowych dapków NFT](https://www.youtube.com/watch?v=ehv70kE1QYo)

### Monitorowanie aktywności kontraktów na różnych łańcuchach {#monitoring-contract-activity-across-chains}

Aby monitorować aktywność kontraktów pomiędzy łańcuchami, deweloperzy mogą korzystać z podgrafów (subgraph) i platform deweloperskich, takich jak Tenderly, aby obserwować inteligentne kontrakty w czasie rzeczywistym. Takie platformy posiadają również narzędzia, które oferują większą funkcjonalność monitorowania danych dla działań międzyłańcuchowych, takie jak sprawdzanie [zdarzeń emitowanych przez kontrakty](https://docs.soliditylang.org/en/v0.8.14/contracts.html?highlight=events#events) itp.

#### Narzędzia

- [The Graph](https://thegraph.com/en/)
- [Tenderly](https://tenderly.co/)

## Dalsza lektura {#further-reading}

- [Mosty blockchain](/bridges/) – ethereum.org
- [Ramy Ryzyka Mostów L2Beat](https://l2beat.com/bridges/summary)
- [Mosty blockchain: Budowanie sieci kryptosieci](https://medium.com/1kxnetwork/blockchain-bridges-5db6afac44f8) – 8 września 2021 r. – Dmitriy Berenzon
- [Trylemat interoperacyjności](https://blog.connext.network/the-interoperability-trilemma-657c2cf69f17) – 1 października 2021 r. – Arjun Bhuptani
- [Klastry: Jak mosty wymagające zaufania i o zminimalizowanym zaufaniu kształtują krajobraz wielołańcuchowy](https://blog.celestia.org/clusters/) – 4 października 2021 r. – Mustafa Al-Bassam
- [LI.FI: W przypadku mostów zaufanie jest spektrum](https://blog.li.fi/li-fi-with-bridges-trust-is-a-spectrum-354cd5a1a6d8) – 28 kwietnia 2022 r. – Arjun Chand
- [Stan rozwiązań interoperacyjności rollupów](https://web.archive.org/web/20250428015516/https://research.2077.xyz/the-state-of-rollup-interoperability) – 20 czerwca 2024 r. – Alex Hook
- [Wykorzystanie współdzielonego bezpieczeństwa dla bezpiecznej interoperacyjności między łańcuchami: Komitety Stanu Lagrange'a i nie tylko](https://web.archive.org/web/20250125035123/https://research.2077.xyz/harnessing-shared-security-for-secure-blockchain-interoperability) – 12 czerwca 2024 r. – Emmanuel Awosika

Dodatkowo, oto kilka wnikliwych prezentacji [Jamesa Prestwicha](https://twitter.com/_prestwich), które mogą pomóc w głębszym zrozumieniu mostów:

- [Budowanie mostów, a nie zamkniętych ogrodów](https://youtu.be/ZQJWMiX4hT0)
- [Rozkładanie mostów na czynniki pierwsze](https://youtu.be/b0mC-ZqN8Oo)
- [Dlaczego mosty płoną](https://youtu.be/c7cm2kd20j8)
