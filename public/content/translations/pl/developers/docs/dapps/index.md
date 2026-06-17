---
title: Techniczne wprowadzenie do dappów
description:
lang: pl
---

Zdecentralizowana aplikacja (dapp) to aplikacja zbudowana w zdecentralizowanej sieci, która łączy [inteligentny kontrakt](/developers/docs/smart-contracts/) z interfejsem użytkownika (frontend). W sieci [Ethereum](/) inteligentne kontrakty są dostępne i przejrzyste – podobnie jak otwarte API – więc Twoja zdecentralizowana aplikacja (dapp) może nawet zawierać inteligentny kontrakt napisany przez kogoś innego.

## Wymagania wstępne {#prerequisites}

Przed rozpoczęciem nauki o dappach, powinieneś opanować [podstawy blockchaina](/developers/docs/intro-to-ethereum/) oraz przeczytać o sieci Ethereum i o tym, jak jest zdecentralizowana.

## Definicja dappa {#definition-of-a-dapp}

Zdecentralizowana aplikacja (dapp) ma swój kod backendowy uruchomiony w zdecentralizowanej sieci peer-to-peer. Stanowi to przeciwieństwo tradycyjnej aplikacji, w której kod backendowy działa na scentralizowanych serwerach.

Dapp może mieć kod frontendowy i interfejsy użytkownika napisane w dowolnym języku (podobnie jak zwykła aplikacja), aby wywoływać swój backend. Co więcej, jej frontend może być hostowany w zdecentralizowanym magazynie danych, takim jak [IPFS](https://ipfs.io/).

- **Zdecentralizowany** – dappy działają na Ethereum, otwartej, publicznej i zdecentralizowanej platformie, nad którą żadna pojedyncza osoba ani grupa nie ma kontroli.
- **Deterministyczny** – dappy wykonują tę samą funkcję niezależnie od środowiska, w którym są uruchamiane.
- **Kompletny w sensie Turinga** – dappy mogą wykonać dowolną akcję, jeśli dysponują wymaganymi zasobami.
- **Izolowany** – dappy są wykonywane w wirtualnym środowisku znanym jako Maszyna Wirtualna Ethereum (EVM), dzięki czemu, jeśli inteligentny kontrakt zawiera błąd, nie zakłóci to normalnego funkcjonowania sieci blockchain.

### O inteligentnych kontraktach {#on-smart-contracts}

Aby przedstawić dappy, musimy wprowadzić pojęcie inteligentnych kontraktów – z braku lepszego określenia, backendu dappa. Aby uzyskać szczegółowe informacje, przejdź do naszej sekcji o [inteligentnych kontraktach](/developers/docs/smart-contracts/).

Inteligentny kontrakt to kod, który istnieje na blockchainie Ethereum i działa dokładnie tak, jak został zaprogramowany. Po wdrożeniu inteligentnych kontraktów w sieci nie można ich zmienić. Dappy mogą być zdecentralizowane, ponieważ są kontrolowane przez logikę zapisaną w kontrakcie, a nie przez osobę fizyczną lub firmę. Oznacza to również, że musisz bardzo starannie projektować swoje kontrakty i dokładnie je testować.

## Korzyści z tworzenia dappów {#benefits-of-dapp-development}

- **Brak przestojów** – po wdrożeniu inteligentnego kontraktu na blockchainie, sieć jako całość zawsze będzie w stanie obsługiwać klientów chcących wejść w interakcję z kontraktem. Złośliwi aktorzy nie mogą zatem przeprowadzać ataków typu odmowa usługi (DoS) wymierzonych w poszczególne dappy.
- **Prywatność** – nie musisz podawać swojej prawdziwej tożsamości, aby wdrożyć dappa lub wejść z nim w interakcję.
- **Odporność na cenzurę** – żaden pojedynczy podmiot w sieci nie może zablokować użytkownikom możliwości wysyłania transakcji, wdrażania dappów ani odczytywania danych z blockchaina.
- **Pełna integralność danych** – dane przechowywane na blockchainie są niezmienne i bezsporne dzięki prymitywom kryptograficznym. Złośliwi aktorzy nie mogą fałszować transakcji ani innych danych, które zostały już upublicznione.
- **Niewymagające zaufania obliczenia/weryfikowalne zachowanie** – inteligentne kontrakty mogą być analizowane i gwarantują wykonanie w przewidywalny sposób, bez konieczności ufania centralnemu organowi. Nie jest to prawdą w tradycyjnych modelach; na przykład, gdy korzystamy z systemów bankowości internetowej, musimy ufać, że instytucje finansowe nie nadużyją naszych danych finansowych, nie sfałszują rejestrów ani nie zostaną zhakowane.

## Wady tworzenia dappów {#drawbacks-of-dapp-development}

- **Utrzymanie** – dappy mogą być trudniejsze w utrzymaniu, ponieważ kod i dane opublikowane na blockchainie są trudniejsze do modyfikacji. Programistom trudno jest aktualizować swoje dappy (lub podstawowe dane przechowywane przez dappa) po ich wdrożeniu, nawet jeśli w starej wersji zostaną zidentyfikowane błędy lub zagrożenia bezpieczeństwa.
- **Narzut wydajnościowy** – istnieje ogromny narzut wydajnościowy, a skalowanie jest naprawdę trudne. Aby osiągnąć poziom bezpieczeństwa, integralności, przejrzystości i niezawodności, do którego dąży Ethereum, każdy węzeł uruchamia i przechowuje każdą transakcję. Ponadto konsensus oparty na dowodzie stawki (PoS) również wymaga czasu.
- **Zatory w sieci** – gdy jeden dapp zużywa zbyt wiele zasobów obliczeniowych, cała sieć ulega spowolnieniu. Obecnie sieć może przetwarzać tylko około 10-15 transakcji na sekundę; jeśli transakcje są wysyłane szybciej, pula niepotwierdzonych transakcji może szybko wzrosnąć.
- **Doświadczenie użytkownika (UX)** – zaprojektowanie przyjaznego dla użytkownika doświadczenia może być trudniejsze, ponieważ przeciętny użytkownik końcowy może uznać za zbyt trudne skonfigurowanie stosu narzędzi niezbędnych do interakcji z blockchainem w naprawdę bezpieczny sposób.
- **Centralizacja** – przyjazne dla użytkowników i programistów rozwiązania zbudowane na warstwie bazowej Ethereum mogą i tak ostatecznie przypominać scentralizowane usługi. Na przykład takie usługi mogą przechowywać klucze lub inne poufne informacje po stronie serwera, obsługiwać frontend za pomocą scentralizowanego serwera lub uruchamiać ważną logikę biznesową na scentralizowanym serwerze przed zapisaniem danych na blockchainie. Centralizacja eliminuje wiele (jeśli nie wszystkie) zalet blockchaina w porównaniu z tradycyjnym modelem.

## Wolisz uczyć się wzrokowo? {#visual-learner}

<VideoWatch slug="what-is-a-dapp" />

## Narzędzia do tworzenia dappów {#dapp-tools}

**Scaffold-ETH _– Szybko eksperymentuj z Solidity, używając frontendu, który dostosowuje się do Twojego inteligentnego kontraktu._**

- [GitHub](https://github.com/scaffold-eth/scaffold-eth-2)
- [Przykładowy dapp](https://punkwallet.io/)

**Create Eth App _– Twórz aplikacje oparte na Ethereum za pomocą jednego polecenia._**

- [GitHub](https://github.com/paulrberg/create-eth-app)

**One Click Dapp _– Narzędzie FOSS do generowania frontendów dappów z [ABI](/glossary/#abi)._**

- [oneclickdapp.com](https://oneclickdapp.com)
- [GitHub](https://github.com/oneclickdapp/oneclickdapp-v1)

**Etherflow _– Narzędzie FOSS dla programistów Ethereum do testowania ich węzła oraz tworzenia i debugowania wywołań RPC z poziomu przeglądarki._**

- [etherflow.quiknode.io](https://etherflow.quiknode.io/)
- [GitHub](https://github.com/abunsen/etherflow)

**thirdweb _– SDK w każdym języku, inteligentne kontrakty, narzędzia i infrastruktura do tworzenia w Web3._**

- [Strona główna](https://thirdweb.com/)
- [Dokumentacja](https://portal.thirdweb.com/)
- [GitHub](https://github.com/thirdweb-dev/)

**Crossmint _– Platforma programistyczna Web3 klasy korporacyjnej do wdrażania inteligentnych kontraktów, obsługi płatności kartą kredytową i płatności międzyłańcuchowych oraz korzystania z API do tworzenia, dystrybucji, sprzedaży, przechowywania i edycji NFT._**

- [crossmint.com](https://www.crossmint.com)
- [Dokumentacja](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)

## Dalsza lektura {#further-reading}

- [Odkrywaj dappy](/apps)
- [Architektura aplikacji Web 3.0](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application) – _Preethi Kasireddy_
- [Przewodnik po zdecentralizowanych aplikacjach z 2021 r.](https://limechain.tech/blog/what-are-dapps-the-2021-guide/) – _LimeChain_
- [Czym są zdecentralizowane aplikacje?](https://www.gemini.com/cryptopedia/decentralized-applications-defi-dapps) – _Gemini_
- [Popularne dappy](https://www.alchemy.com/dapps) – _Alchemy_

_Znasz zasób społeczności, który Ci pomógł? Edytuj tę stronę i dodaj go!_

## Powiązane tematy {#related-topics}

- [Wprowadzenie do stosu Ethereum](/developers/docs/ethereum-stack/)
- [Frameworki programistyczne](/developers/docs/frameworks/)

## Samouczki: Tworzenie aplikacji i frontendów na Ethereum {#tutorials}

- [Przewodnik po kontraktach Uniswap-v2](/developers/tutorials/uniswap-v2-annotated-code/) _– Przewodnik z adnotacjami po głównych kontraktach Uniswap v2 wyjaśniający, jak działa zautomatyzowany animator rynku (AMM)._
- [Budowanie interfejsu użytkownika dla Twojego kontraktu](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/) _– Jak zbudować nowoczesny frontend w React + Wagmi, który łączy się z Twoim inteligentnym kontraktem._
- [Inteligentny kontrakt Hello World dla początkujących – Fullstack](/developers/tutorials/hello-world-smart-contract-fullstack/) _– Kompleksowy samouczek: napisz, wdróż i zbuduj frontend dla prostego inteligentnego kontraktu._
- [Komponenty serwerowe i agenci dla aplikacji Web3](/developers/tutorials/server-components/) _– Jak pisać komponenty serwerowe w TypeScript, które nasłuchują zdarzeń na blockchainie i odpowiadają transakcjami._
- [IPFS dla zdecentralizowanych interfejsów użytkownika](/developers/tutorials/ipfs-decentralized-ui/) _– Jak hostować frontend swojego dappa w IPFS, aby zapewnić odporność na cenzurę._