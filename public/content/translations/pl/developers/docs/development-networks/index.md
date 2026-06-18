---
title: Sieci deweloperskie
description: Przegląd sieci deweloperskich i narzędzi dostępnych do pomocy w budowaniu aplikacji Ethereum.
lang: pl
---

Budując aplikację [Ethereum](/) z inteligentnymi kontraktami, będziesz chciał uruchomić ją w lokalnej sieci, aby zobaczyć, jak działa, przed jej wdrożeniem.

Podobnie jak w przypadku uruchamiania lokalnego serwera na komputerze do tworzenia stron internetowych, możesz użyć sieci deweloperskiej, aby utworzyć lokalną instancję blockchaina do testowania swojej zdecentralizowanej aplikacji (dapp). Te sieci deweloperskie Ethereum zapewniają funkcje, które pozwalają na znacznie szybszą iterację niż publiczna sieć testowa (na przykład nie musisz zajmować się pozyskiwaniem ETH z kranu testnetu).

## Wymagania wstępne {#prerequisites}

Powinieneś zrozumieć [podstawy stosu Ethereum](/developers/docs/ethereum-stack/) oraz [sieci Ethereum](/developers/docs/networks/) przed zagłębieniem się w sieci deweloperskie.

## Czym jest sieć deweloperska? {#what-is-a-development-network}

Sieci deweloperskie to w zasadzie klienci Ethereum (implementacje Ethereum) zaprojektowani specjalnie do lokalnego programowania.

**Dlaczego po prostu nie uruchomić standardowego węzła Ethereum lokalnie?**

_Mógłbyś_ [uruchomić węzeł](/developers/docs/nodes-and-clients/#running-your-own-node), ale ponieważ sieci deweloperskie są tworzone specjalnie do programowania, często są wyposażone w wygodne funkcje, takie jak:

- Deterministyczne zasilanie lokalnego blockchaina danymi (np. kontami z saldami ETH)
- Błyskawiczne tworzenie bloków z każdą otrzymaną transakcją, w odpowiedniej kolejności i bez opóźnień
- Ulepszona funkcjonalność debugowania i logowania

## Dostępne narzędzia {#available-projects}

**Uwaga**: Większość [frameworków deweloperskich](/developers/docs/frameworks/) zawiera wbudowaną sieć deweloperską. Zalecamy rozpoczęcie od frameworka, aby [skonfigurować lokalne środowisko programistyczne](/developers/local-environment/).

### Hardhat Network {#hardhat-network}

Lokalna sieć Ethereum zaprojektowana do programowania. Pozwala na wdrożenie kontraktów, uruchamianie testów i debugowanie kodu.

Hardhat Network jest wbudowana w Hardhat, środowisko programistyczne Ethereum dla profesjonalistów.

- [Strona internetowa](https://hardhat.org/)
- [GitHub](https://github.com/NomicFoundation/hardhat)

### Lokalne łańcuchy Beacon {#local-beacon-chains}

Niektórzy klienci konsensusu mają wbudowane narzędzia do uruchamiania lokalnych łańcuchów Beacon do celów testowych. Dostępne są instrukcje dla klientów Lighthouse, Nimbus i Lodestar:

- [Lokalna sieć testowa przy użyciu Lodestar](https://chainsafe.github.io/lodestar/contribution/advanced-topics/setting-up-a-testnet#post-merge-local-testnet/)
- [Lokalna sieć testowa przy użyciu Lighthouse](https://lighthouse-book.sigmaprime.io/setup.html#local-testnets)

### Publiczne łańcuchy testowe Ethereum {#public-beacon-testchains}

Istnieją również dwie utrzymywane publiczne implementacje testowe Ethereum: Sepolia i Hoodi. Zalecaną siecią testową z długoterminowym wsparciem jest Hoodi, w której każdy może swobodnie pełnić rolę walidatora. Sepolia używa zestawu walidatorów wymagającego zezwolenia, co oznacza, że nie ma ogólnego dostępu dla nowych walidatorów w tej sieci testowej.

- [Hoodi Staking Launchpad](https://hoodi.launchpad.ethereum.org/)

### Pakiet Kurtosis Ethereum {#kurtosis}

Kurtosis to system budowania dla wielokontenerowych środowisk testowych, który umożliwia programistom lokalne uruchamianie powtarzalnych instancji sieci blockchain.

Pakiet Ethereum Kurtosis może być użyty do szybkiego utworzenia parametryzowalnej, wysoce skalowalnej i prywatnej sieci testowej Ethereum za pomocą platformy Docker lub Kubernetes. Pakiet obsługuje wszystkich głównych klientów warstwy wykonawczej (EL) i warstwy konsensusu (CL). Kurtosis płynnie obsługuje wszystkie lokalne mapowania portów i połączenia usług dla reprezentatywnej sieci, która ma być używana w przepływach pracy związanych z walidacją i testowaniem podstawowej infrastruktury Ethereum.

- [Pakiet sieci Ethereum](https://github.com/kurtosis-tech/ethereum-package)
- [Strona internetowa](https://www.kurtosis.com/)
- [GitHub](https://github.com/kurtosis-tech/kurtosis)
- [Dokumentacja](https://docs.kurtosis.com/)

## Dalsza lektura {#further-reading}

_Znasz zasób społeczności, który Ci pomógł? Edytuj tę stronę i dodaj go!_

## Powiązane tematy {#related-topics}

- [Frameworki deweloperskie](/developers/docs/frameworks/)
- [Konfiguracja lokalnego środowiska programistycznego](/developers/local-environment/)

## Samouczki: Sieci deweloperskie i środowiska testowe w Ethereum {#tutorials}

- [Tworzenie i testowanie zdecentralizowanych aplikacji (dapp) w lokalnej wieloklienckiej sieci testowej Ethereum](/developers/tutorials/develop-and-test-dapps-with-a-multi-client-local-eth-testnet/) _– Jak uruchomić lokalną wielokliencką sieć testową Ethereum za pomocą Kurtosis do tworzenia i testowania aplikacji dapp._