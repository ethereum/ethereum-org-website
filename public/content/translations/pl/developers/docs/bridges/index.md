---
title: Mosty
description: Przegląd mostów dla deweloperów
lang: pl
---

Wraz z rozprzestrzenianiem się blockchainów warstwy 1 (L1) i rozwiązań [skalujących](/developers/docs/scaling/) warstwy 2 (L2), a także stale rosnącą liczbą zdecentralizowanych aplikacji (dapp) stających się międzyłańcuchowymi, potrzeba komunikacji i przemieszczania aktywów między łańcuchami stała się kluczową częścią infrastruktury sieci. Istnieją różne rodzaje mostów, które pomagają to umożliwić.

## Potrzeba mostów {#need-for-bridges}

Mosty istnieją po to, aby łączyć sieci blockchain. Umożliwiają one łączność i interoperacyjność między blockchainami.

Blockchainy istnieją w odizolowanych środowiskach, co oznacza, że nie ma naturalnego sposobu, aby blockchainy mogły handlować i komunikować się z innymi blockchainami. W rezultacie, chociaż w danym ekosystemie może występować znaczna aktywność i innowacje, są one ograniczone brakiem łączności i interoperacyjności z innymi ekosystemami.

Mosty oferują sposób na połączenie ze sobą odizolowanych środowisk blockchain. Ustanawiają one trasę transportową między blockchainami, za pomocą której tokeny, wiadomości, dowolne dane, a nawet wywołania [inteligentnych kontraktów](/developers/docs/smart-contracts/) mogą być transferowane z jednego łańcucha do drugiego.

## Korzyści z mostów {#benefits-of-bridges}

Mówiąc prościej, mosty odblokowują liczne przypadki użycia, pozwalając sieciom blockchain na wymianę danych i przenoszenie aktywów między nimi.

Blockchainy mają unikalne mocne i słabe strony oraz podejścia do budowania aplikacji (takie jak szybkość, przepustowość, koszty itp.). Mosty pomagają w rozwoju całego ekosystemu krypto, umożliwiając blockchainom wzajemne wykorzystywanie swoich innowacji.

Dla deweloperów mosty umożliwiają:

- transfer dowolnych danych, informacji i aktywów między łańcuchami.
- odblokowanie nowych funkcji i przypadków użycia dla protokołów, ponieważ mosty poszerzają przestrzeń projektową tego, co protokoły mogą zaoferować. Na przykład protokół do yield farmingu pierwotnie wdrożony w [sieci głównej Ethereum](/) może oferować pule płynności we wszystkich łańcuchach kompatybilnych z EVM.
- możliwość wykorzystania mocnych stron różnych blockchainów. Na przykład deweloperzy mogą korzystać z niższych opłat oferowanych przez różne rozwiązania warstwy 2 (L2), wdrażając swoje zdecentralizowane aplikacje (dapp) w rollupach i łańcuchach pobocznych (sidechains), a użytkownicy mogą przenosić się między nimi za pomocą mostów.
- współpracę między deweloperami z różnych ekosystemów blockchain w celu budowania nowych produktów.
- przyciąganie użytkowników i społeczności z różnych ekosystemów do swoich zdecentralizowanych aplikacji (dapp).

## Jak działają mosty? {#how-do-bridges-work}

Chociaż istnieje wiele [typów konstrukcji mostów](https://li.fi/knowledge-hub/blockchain-bridges-and-classification/), wyróżniają się trzy sposoby ułatwiające międzyłańcuchowy transfer aktywów:

- **Zablokuj i wybij (Lock and mint) –** Zablokowanie aktywów w łańcuchu źródłowym i wybijanie aktywów w łańcuchu docelowym.
- **Spal i wybij (Burn and mint) –** Spalenie aktywów w łańcuchu źródłowym i wybijanie aktywów w łańcuchu docelowym.
- **Wymiany atomowe (Atomic swaps) –** Wymiana aktywów w łańcuchu źródłowym na aktywa w łańcuchu docelowym z inną stroną.

## Rodzaje mostów {#bridge-types}

Mosty można zazwyczaj sklasyfikować w jednej z następujących kategorii:

- **Mosty natywne –** Te mosty są zazwyczaj budowane w celu zainicjowania płynności na konkretnym blockchainie, ułatwiając użytkownikom przenoszenie środków do ekosystemu. Na przykład [Arbitrum Bridge](https://bridge.arbitrum.io/) został zbudowany, aby ułatwić użytkownikom przenoszenie środków z sieci głównej Ethereum do Arbitrum. Inne takie mosty to Polygon PoS Bridge, [Optimism Gateway](https://app.optimism.io/bridge) itp.
- **Mosty oparte na walidatorach lub wyroczniach –** Te mosty opierają się na zewnętrznym zestawie walidatorów lub wyroczniach w celu walidacji transferów międzyłańcuchowych. Przykłady: Multichain i Across.
- **Mosty do uogólnionego przekazywania wiadomości –** Te mosty mogą transferować aktywa wraz z wiadomościami i dowolnymi danymi między łańcuchami. Przykłady: Axelar, LayerZero i Nomad.
- **Sieci płynności –** Te mosty skupiają się głównie na transferze aktywów z jednego łańcucha do drugiego za pomocą wymian atomowych. Zasadniczo nie obsługują one międzyłańcuchowego przekazywania wiadomości. Przykłady: Connext i Hop.

## Kompromisy do rozważenia {#trade-offs}

W przypadku mostów nie ma rozwiązań idealnych. Istnieją raczej tylko kompromisy zawierane w celu osiągnięcia określonego celu. Deweloperzy i użytkownicy mogą oceniać mosty na podstawie następujących czynników:

- **Bezpieczeństwo –** Kto weryfikuje system? Mosty zabezpieczone przez zewnętrznych walidatorów są zazwyczaj mniej bezpieczne niż mosty, które są lokalnie lub natywnie zabezpieczone przez walidatorów blockchaina.
- **Wygoda –** Ile czasu zajmuje sfinalizowanie transakcji i ile transakcji użytkownik musiał podpisać? Dla dewelopera, ile czasu zajmuje zintegrowanie mostu i jak skomplikowany jest ten proces?
- **Łączność –** Jakie są różne łańcuchy docelowe, które most może połączyć (tj. rollupy, łańcuchy poboczne, inne blockchainy warstwy 1 itp.) i jak trudno jest zintegrować nowy blockchain?
- **Zdolność do przekazywania bardziej złożonych danych –** Czy most może umożliwić transfer wiadomości i bardziej złożonych dowolnych danych między łańcuchami, czy obsługuje tylko międzyłańcuchowe transfery aktywów?
- **Opłacalność –** Ile kosztuje transfer aktywów między łańcuchami za pośrednictwem mostu? Zazwyczaj mosty pobierają stałą lub zmienną opłatę w zależności od kosztów gazu i płynności określonych tras. Kluczowa jest również ocena opłacalności mostu na podstawie kapitału wymaganego do zapewnienia jego bezpieczeństwa.

Na wysokim poziomie mosty można podzielić na zaufane i niewymagające zaufania.

- **Zaufane –** Zaufane mosty są weryfikowane zewnętrznie. Używają zewnętrznego zestawu weryfikatorów (federacje z portfelami multi-sig, systemy obliczeń wielostronnych, sieć wyroczni) do wysyłania danych między łańcuchami. W rezultacie mogą oferować doskonałą łączność i umożliwiać w pełni uogólnione przekazywanie wiadomości między łańcuchami. Zazwyczaj dobrze sprawdzają się również pod względem szybkości i opłacalności. Odbywa się to kosztem bezpieczeństwa, ponieważ użytkownicy muszą polegać na bezpieczeństwie mostu.
- **Niewymagające zaufania –** Te mosty opierają się na blockchainach, które łączą, oraz ich walidatorach w celu transferu wiadomości i tokenów. Są one „niewymagające zaufania”, ponieważ nie dodają nowych założeń dotyczących zaufania (poza samymi blockchainami). W rezultacie mosty niewymagające zaufania są uważane za bezpieczniejsze niż mosty zaufane.

Aby ocenić mosty niewymagające zaufania na podstawie innych czynników, musimy podzielić je na mosty do uogólnionego przekazywania wiadomości i sieci płynności.

- **Mosty do uogólnionego przekazywania wiadomości –** Te mosty wyróżniają się bezpieczeństwem i możliwością transferu bardziej złożonych danych między łańcuchami. Zazwyczaj są również dobre pod względem opłacalności. Jednak te mocne strony zazwyczaj wiążą się z kosztem łączności w przypadku mostów opartych na lekkich klientach (np. IBC) oraz wadami związanymi z szybkością w przypadku mostów optymistycznych (np. Nomad), które wykorzystują dowody oszustwa (fraud proofs).
- **Sieci płynności –** Te mosty wykorzystują wymiany atomowe do transferu aktywów i są systemami weryfikowanymi lokalnie (tj. używają walidatorów bazowych blockchainów do weryfikacji transakcji). W rezultacie wyróżniają się bezpieczeństwem i szybkością. Ponadto są uważane za stosunkowo opłacalne i oferują dobrą łączność. Jednak głównym kompromisem jest ich niezdolność do przekazywania bardziej złożonych danych – ponieważ nie obsługują międzyłańcuchowego przekazywania wiadomości.

## Ryzyko związane z mostami {#risk-with-bridges}

Mosty odpowiadają za trzy [największe ataki hakerskie w zdecentralizowanych finansach (DeFi)](https://rekt.news/leaderboard/) i wciąż znajdują się na wczesnym etapie rozwoju. Korzystanie z jakiegokolwiek mostu niesie ze sobą następujące ryzyka:

- **Ryzyko inteligentnego kontraktu –** Chociaż wiele mostów pomyślnie przeszło audyty, wystarczy jedna luka w inteligentnym kontrakcie, aby aktywa zostały narażone na ataki hakerskie (np. [Wormhole Bridge na Solanie](https://rekt.news/wormhole-rekt/)).
- **Systemowe ryzyko finansowe** – Wiele mostów używa opakowanych aktywów (wrapped assets) do wybijania kanonicznych wersji oryginalnego aktywa w nowym łańcuchu. Naraża to ekosystem na ryzyko systemowe, ponieważ widzieliśmy już przypadki wykorzystania luk w opakowanych wersjach tokenów.
- **Ryzyko kontrahenta –** Niektóre mosty wykorzystują zaufaną konstrukcję, która wymaga od użytkowników polegania na założeniu, że walidatorzy nie wejdą w zmowę w celu kradzieży środków użytkowników. Konieczność zaufania tym podmiotom zewnętrznym naraża użytkowników na ryzyka takie jak rug pulle, cenzura i inne złośliwe działania.
- **Otwarte kwestie –** Biorąc pod uwagę, że mosty znajdują się w początkowej fazie rozwoju, istnieje wiele pytań bez odpowiedzi dotyczących tego, jak mosty będą działać w różnych warunkach rynkowych, takich jak czasy przeciążenia sieci i podczas nieprzewidzianych zdarzeń, takich jak ataki na poziomie sieci lub cofnięcia stanu (state rollbacks). Ta niepewność stwarza pewne ryzyka, których stopień jest wciąż nieznany.

## Jak zdecentralizowane aplikacje (dapp) mogą korzystać z mostów? {#how-can-dapps-use-bridges}

Oto kilka praktycznych zastosowań, które deweloperzy mogą rozważyć w kontekście mostów i przenoszenia swoich zdecentralizowanych aplikacji (dapp) między łańcuchami:

### Integracja mostów {#integrating-bridges}

Dla deweloperów istnieje wiele sposobów na dodanie obsługi mostów:

1. **Zbudowanie własnego mostu –** Zbudowanie bezpiecznego i niezawodnego mostu nie jest łatwe, zwłaszcza jeśli wybierzesz ścieżkę o zminimalizowanym zaufaniu. Ponadto wymaga to lat doświadczenia i wiedzy technicznej związanej z badaniami nad skalowalnością i interoperacyjnością. Dodatkowo wymagałoby to zaangażowanego zespołu do utrzymania mostu i przyciągnięcia wystarczającej płynności, aby było to wykonalne.

2. **Pokazywanie użytkownikom wielu opcji mostów –** Wiele [zdecentralizowanych aplikacji (dapp)](/developers/docs/dapps/) wymaga od użytkowników posiadania ich natywnego tokena do interakcji z nimi. Aby umożliwić użytkownikom dostęp do ich tokenów, oferują one różne opcje mostów na swojej stronie internetowej. Jednak ta metoda jest tylko szybkim rozwiązaniem problemu, ponieważ odciąga użytkownika od interfejsu dapp i nadal wymaga od niego interakcji z innymi dappami i mostami. Jest to uciążliwe doświadczenie onboardingu ze zwiększonym ryzykiem popełnienia błędów.

3. **Zintegrowanie mostu –** To rozwiązanie nie wymaga od dapp odsyłania użytkowników do zewnętrznych interfejsów mostów i zdecentralizowanych giełd (DEX). Pozwala to dappom na poprawę doświadczenia onboardingu użytkowników. Jednak to podejście ma swoje ograniczenia:

   - Ocena i utrzymanie mostów są trudne i czasochłonne.
   - Wybór jednego mostu tworzy pojedynczy punkt awarii i zależności.
   - Dapp jest ograniczona możliwościami mostu.
   - Same mosty mogą nie wystarczyć. Dappy mogą potrzebować DEX-ów, aby zaoferować więcej funkcjonalności, takich jak międzyłańcuchowe wymiany.

4. **Zintegrowanie wielu mostów –** To rozwiązanie rozwiązuje wiele problemów związanych z integracją pojedynczego mostu. Ma jednak również ograniczenia, ponieważ integracja wielu mostów pochłania zasoby i tworzy narzuty techniczne oraz komunikacyjne dla deweloperów — najrzadszego zasobu w krypto.

5. **Zintegrowanie agregatora mostów –** Inną opcją dla dappów jest zintegrowanie rozwiązania agregującego mosty, które daje im dostęp do wielu mostów. Agregatory mostów dziedziczą mocne strony wszystkich mostów i w ten sposób nie są ograniczone możliwościami żadnego pojedynczego mostu. Co ważne, agregatory mostów zazwyczaj utrzymują integracje mostów, co oszczędza dappom kłopotów z byciem na bieżąco z technicznymi i operacyjnymi aspektami integracji mostu.

Biorąc to pod uwagę, agregatory mostów również mają swoje ograniczenia. Na przykład, chociaż mogą oferować więcej opcji mostów, na rynku zazwyczaj dostępnych jest znacznie więcej mostów niż te oferowane na platformie agregatora. Ponadto, podobnie jak mosty, agregatory mostów są również narażone na ryzyko związane z inteligentnymi kontraktami i technologią (więcej inteligentnych kontraktów = więcej ryzyk).

Jeśli dapp pójdzie drogą integracji mostu lub agregatora, istnieją różne opcje w zależności od tego, jak głęboka ma być integracja. Na przykład, jeśli jest to tylko integracja front-endowa w celu poprawy doświadczenia onboardingu użytkowników, dapp zintegruje widżet. Jeśli jednak integracja ma na celu zbadanie głębszych strategii międzyłańcuchowych, takich jak staking, yield farming itp., dapp integruje SDK lub API.

### Wdrażanie zdecentralizowanej aplikacji (dapp) w wielu łańcuchach {#deploying-a-dapp-on-multiple-chains}

Aby wdrożyć dapp w wielu łańcuchach, deweloperzy mogą korzystać z platform programistycznych, takich jak [Alchemy](https://www.alchemy.com/), [Hardhat](https://hardhat.org/), [Moralis](https://moralis.io/) itp. Zazwyczaj platformy te są wyposażone w komponowalne wtyczki, które mogą umożliwić dappom działanie międzyłańcuchowe. Na przykład deweloperzy mogą użyć deterministycznego proxy wdrożenia oferowanego przez [wtyczkę hardhat-deploy](https://github.com/wighawag/hardhat-deploy).

#### Przykłady: {#examples}

- [Jak budować międzyłańcuchowe dappy](https://moralis.io/how-to-build-cross-chain-dapps/)
- [Budowa międzyłańcuchowego rynku NFT](https://youtu.be/WZWCzsB1xUE)
- [Moralis: Budowa międzyłańcuchowych dappów NFT](https://www.youtube.com/watch?v=ehv70kE1QYo)

### Monitorowanie aktywności kontraktów w różnych łańcuchach {#monitoring-contract-activity-across-chains}

Aby monitorować aktywność kontraktów w różnych łańcuchach, deweloperzy mogą używać subgrafów i platform deweloperskich, takich jak Tenderly, do obserwowania inteligentnych kontraktów w czasie rzeczywistym. Takie platformy mają również narzędzia, które oferują większą funkcjonalność monitorowania danych dla działań międzyłańcuchowych, takich jak sprawdzanie [zdarzeń emitowanych przez kontrakty](https://docs.soliditylang.org/en/v0.8.14/contracts.html?highlight=events#events) itp.

#### Narzędzia {#tools}

- [The Graph](https://thegraph.com/en/)
- [Tenderly](https://tenderly.co/)

## Dalsza lektura {#further-reading}
- [Mosty blockchain](/bridges/) – ethereum.org
- [Ramy ryzyka mostów L2BEAT](https://l2beat.com/bridges/summary)
- [Mosty blockchain: Budowanie sieci kryptosieci](https://medium.com/1kxnetwork/blockchain-bridges-5db6afac44f8) - 8 września 2021 r. – Dmitriy Berenzon
- [Trylemat interoperacyjności](https://blog.connext.network/the-interoperability-trilemma-657c2cf69f17) - 1 października 2021 r. – Arjun Bhuptani
- [Klastry: Jak zaufane mosty i mosty o zminimalizowanym zaufaniu kształtują wielołańcuchowy krajobraz](https://blog.celestia.org/clusters/) - 4 października 2021 r. – Mustafa Al-Bassam
- [LI.FI: W przypadku mostów zaufanie to spektrum](https://blog.li.fi/li-fi-with-bridges-trust-is-a-spectrum-354cd5a1a6d8) - 28 kwietnia 2022 r. – Arjun Chand
- [Stan rozwiązań interoperacyjności rollupów](https://web.archive.org/web/20250428015516/https://research.2077.xyz/the-state-of-rollup-interoperability) - 20 czerwca 2024 r. – Alex Hook
- [Wykorzystanie współdzielonego bezpieczeństwa do bezpiecznej interoperacyjności międzyłańcuchowej: Komitety stanu Lagrange'a i nie tylko](https://web.archive.org/web/20250125035123/https://research.2077.xyz/harnessing-shared-security-for-secure-blockchain-interoperability) - 12 czerwca 2024 r. – Emmanuel Awosika

Dodatkowo, oto kilka wnikliwych prezentacji autorstwa [Jamesa Prestwicha](https://twitter.com/_prestwich), które mogą pomóc w głębszym zrozumieniu mostów:

- [Budowanie mostów, a nie zamkniętych ogrodów](https://youtu.be/ZQJWMiX4hT0)
- [Rozkładanie mostów na czynniki pierwsze](https://youtu.be/b0mC-ZqN8Oo)
- [Dlaczego mosty płoną](https://youtu.be/c7cm2kd20j8)