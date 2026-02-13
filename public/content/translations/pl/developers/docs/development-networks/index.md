---
title: Sieci programistyczne
description: "Przegląd sieci programistycznych i narzędzi dostępnych do tworzenia aplikacji Ethereum."
lang: pl
---

Podczas tworzenia aplikacji Ethereum z inteligentnymi kontraktami, chcesz uruchomić ją w sieci lokalnej, aby zobaczyć, jak działa przed jej wdrożeniem.

Podobnie jak możesz uruchomić lokalny serwer na komputerze w celu tworzenia stron internetowych, możesz użyć sieci programistycznej, aby utworzyć lokalną instancję blockchain do przetestowania aplikacji zdecentralizowanej. Te sieci deweloperskie Ethereum zapewniają funkcje, które umożliwiają znacznie szybszą iterację niż publiczne sieci testowe (np. nie musisz zajmować się nabyciem ETH z sieci testowej).

## Wymagania wstępne {#prerequisites}

Powinieneś zrozumieć [podstawy stosu Ethereum](/developers/docs/ethereum-stack/) i [sieci Ethereum](/developers/docs/networks/), zanim zagłębisz się w sieci programistyczne.

## Czym jest sieć programistyczna? {#what-is-a-development-network}

Sieci programistyczne są zasadniczo klientami Ethereum (implementacje Ethereum) zaprojektowanymi specjalnie pod kątem lokalnych prac programistycznych.

**Dlaczego nie uruchomić standardowego węzła Ethereum lokalnie?**

_Mógłbyś_ [uruchomić węzeł](/developers/docs/nodes-and-clients/#running-your-own-node), ale ponieważ sieci programistyczne są tworzone specjalnie na potrzeby rozwoju, często są wyposażone w wygodne funkcje, takie jak:

- Deterministyczne zasilanie lokalnego blockchaina danymi (np. konta z saldami ETH)
- Natychmiastowe tworzenie bloków z każdą otrzymaną transakcją, w kolejności i bez opóźnień
- Ulepszone funkcje debugowania i rejestrowania

## Dostępne narzędzia {#available-projects}

**Uwaga**: Większość [frameworków programistycznych](/developers/docs/frameworks/) zawiera wbudowaną sieć programistyczną. Zalecamy zacząć od frameworka, aby [skonfigurować lokalne środowisko programistyczne](/developers/local-environment/).

### Sieć Hardhat {#hardhat-network}

Lokalna sieć Ethereum zaprojektowana pod kątem prac programistycznych. Pozwala na wdrożenie kontraktów, wykonanie testów i debugowanie kodu.

Sieć Hardhat jest wbudowana w Hardhat, środowisko programistyczne Ethereum dla profesjonalistów.

- [Strona internetowa](https://hardhat.org/)
- [GitHub](https://github.com/NomicFoundation/hardhat)

### Lokalne łańcuchy śledzące {#local-beacon-chains}

Niektóre klienty konsensusu mają wbudowane narzędzia do tworzenia lokalnych łańcuchów śledzących do celów testowych. Instrukcje dla Lighthouse, Nimbus i Lodestar są dostępne:

- [Lokalna sieć testowa z wykorzystaniem Lodestar](https://chainsafe.github.io/lodestar/contribution/advanced-topics/setting-up-a-testnet#post-merge-local-testnet/)
- [Lokalna sieć testowa z wykorzystaniem Lighthouse](https://lighthouse-book.sigmaprime.io/setup.html#local-testnets)

### Publiczne łańcuchy testowe Ethereum {#public-beacon-testchains}

Istnieją również dwie publiczne implementacje testowe Ethereum: Sepolia i Hoodi. Rekomendowana sieć testowa z długoterminowym wsparciem to Hoodi, na której każdy może za darmo walidować. Sepolia korzysta z uprawnionego zestawu walidatorów, w taki znaczeniu, że nie ma ogólnego dostępu do nowych walidatorów na tej sieci testowej.

- [Hoodi Staking Launchpad](https://hoodi.launchpad.ethereum.org/)

### Pakiet Kurtosis Ethereum {#kurtosis}

Kurtosis to system kompilacji dla wielokontenerowych środowisk testowych, który umożliwia deweloperom lokalne uruchamianie odtwarzalnych instancji sieci blockchain.

Pakiet Ethereum Kurtosis może być użyty w celu szybkiego utworzenia parametryzowalnej, wysoce skalowalnej i prywatnej sieci testowej Ethereum za pomocą Docker lub Kubernetes. Pakiet posiada wsparcie dla wszystkich głównych klientów warstw egzekucyjnych (EL) oraz warstw konsensusu (CL). Kurtosis z gracją obsługuje wszystkie lokalne mapowania portów i połączenia z usługami dla sieci reprezentacyjnej, która ma być użyta w procesie walidacji i testowania przepływów pracy w odniesieniu do kluczowej infrastruktury Ethereum.

- [Pakiet sieci Ethereum](https://github.com/kurtosis-tech/ethereum-package)
- [Strona internetowa](https://www.kurtosis.com/)
- [GitHub](https://github.com/kurtosis-tech/kurtosis)
- [Dokumentacja](https://docs.kurtosis.com/)

## Dalsza lektura {#further-reading}

_Znasz jakieś zasoby społeczności, które Ci pomogły? Edytuj tę stronę i dodaj je!_

## Powiązane tematy {#related-topics}

- [Frameworki deweloperskie](/developers/docs/frameworks/)
- [Skonfiguruj lokalne środowisko programistyczne](/developers/local-environment/)
