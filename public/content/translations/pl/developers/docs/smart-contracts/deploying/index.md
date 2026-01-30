---
title: Wdrażanie inteligentnych kontraktów
description: Dowiedz się, jak wdrażać inteligentne kontrakty w sieciach Ethereum, w tym jakie są wymagania wstępne, narzędzia i etapy wdrażania.
lang: pl
---

Musisz wdrożyć swój inteligentny kontrakt, aby był dostępny dla użytkowników sieci Ethereum.

Aby wdrożyć inteligentny kontrakt, wystarczy wysłać transakcję Ethereum zawierającą skompilowany kod inteligentnego kontraktu bez określania żadnego odbiorcy.

## Wymagania wstępne {#prerequisites}

Przed wdrożeniem inteligentnych kontraktów powinieneś zrozumieć [sieci Ethereum](/developers/docs/networks/), [transakcje](/developers/docs/transactions/) i [anatomię inteligentnych kontraktów](/developers/docs/smart-contracts/anatomy/).

Wdrożenie kontraktu kosztuje również ether (ETH), ponieważ jest on przechowywany na blockchainie, więc powinieneś zapoznać się z [gazem i opłatami](/developers/docs/gas/) w Ethereum.

Na koniec, przed wdrożeniem, musisz skompilować swój kontrakt, więc upewnij się, że przeczytałeś o [kompilowaniu inteligentnych kontraktów](/developers/docs/smart-contracts/compiling/).

## Jak wdrożyć inteligentny kontrakt {#how-to-deploy-a-smart-contract}

### Czego będziesz potrzebować {#what-youll-need}

- Kod bajtowy twojego kontraktu – jest on generowany poprzez [kompilację](/developers/docs/smart-contracts/compiling/)
- Ether za gaz – ustawisz swój limit gazu, podobnie jak inne transakcje, więc pamiętaj, że wdrożenie kontraktu wymaga znacznie więcej gazu niż zwykły transfer ETH.
- Skrypt wdrażania lub wtyczka
- dostęp do [węzła Ethereum](/developers/docs/nodes-and-clients/), uruchamiając własny, łącząc się z węzłem publicznym lub poprzez klucz API za pomocą [usługi węzła](/developers/docs/nodes-and-clients/nodes-as-a-service/)

### Kroki wdrażania inteligentnego kontraktu {#steps-to-deploy}

Konkretne kroki będą zależeć od danego środowiska programistycznego. Możesz na przykład sprawdzić [dokumentację Hardhat na temat wdrażania kontraktów](https://hardhat.org/docs/tutorial/deploying) lub [dokumentację Foundry na temat wdrażania i weryfikacji inteligentnych kontraktów](https://book.getfoundry.sh/forge/deploying). Po wdrożeniu Twój kontrakt będzie miał adres Ethereum, tak jak inne [konta](/developers/docs/accounts/), i będzie można go zweryfikować za pomocą [narzędzi do weryfikacji kodu źródłowego](/developers/docs/smart-contracts/verifying/#source-code-verification-tools).

## Powiązane narzędzia {#related-tools}

**Remix – _Remix IDE pozwala na tworzenie, wdrażanie i administrowanie inteligentnymi kontraktami dla blockchainów podobnych do Ethereum_**

- [Remix](https://remix.ethereum.org)

**Tenderly – _platforma deweloperska Web3, która zapewnia debugowanie, obserwowalność i elementy składowe infrastruktury do tworzenia, testowania, monitorowania i obsługi inteligentnych kontraktów_**

- [tenderly.co](https://tenderly.co/)
- [Dokumentacja](https://docs.tenderly.co/)
- [GitHub](https://github.com/Tenderly)
- [Discord](https://discord.gg/eCWjuvt)

**Hardhat – _środowisko programistyczne do kompilowania, wdrażania, testowania i debugowania oprogramowania Ethereum_**

- [hardhat.org](https://hardhat.org/getting-started/)
- [Dokumentacja dotycząca wdrażania kontraktów](https://hardhat.org/docs/tutorial/deploying)
- [GitHub](https://github.com/nomiclabs/hardhat)
- [Discord](https://discord.com/invite/TETZs2KK4k)

**thirdweb – _Łatwe wdrażanie dowolnego kontraktu w dowolnym łańcuchu kompatybilnym z EVM za pomocą jednego polecenia_**

- [Dokumentacja](https://portal.thirdweb.com/deploy/)

**Crossmint – _platforma programistyczna web3 klasy korporacyjnej do wdrażania inteligentnych kontraktów, umożliwiania płatności kartą kredytową i płatności międzyłańcuchowych oraz wykorzystywania interfejsów API do tworzenia, dystrybucji, sprzedaży, przechowywania i edytowania NFT._**

- [crossmint.com](https://www.crossmint.com)
- [Dokumentacja](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)
- [Blog](https://blog.crossmint.com)

## Powiązane samouczki {#related-tutorials}

- [Wdrażanie pierwszego inteligentnego kontraktu](/developers/tutorials/deploying-your-first-smart-contract/) _– wprowadzenie do wdrażania pierwszego inteligentnego kontraktu w sieci testowej Ethereum._
- [Witaj świecie | samouczek inteligentnych kontraktów](/developers/tutorials/hello-world-smart-contract/) _– łatwy do naśladowania samouczek tworzenia i wdrażania podstawowego inteligentnego kontraktu na Ethereum._
- [Interakcja z innymi kontraktami z poziomu Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– jak wdrożyć inteligentny kontrakt z istniejącego kontraktu i wejść z nim w interakcję._
- [Jak zmniejszyć rozmiar kontraktu](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _– Jak zmniejszyć rozmiar kontraktu, aby utrzymać go poniżej limitu i zaoszczędzić na gazie_

## Dalsza lektura {#further-reading}

- [https://docs.openzeppelin.com/learn/deploying-and-interacting](https://docs.openzeppelin.com/learn/deploying-and-interacting) – _OpenZeppelin_
- [Wdrażanie kontraktów za pomocą Hardhat](https://hardhat.org/docs/tutorial/deploying) – _Nomic Labs_

_Znasz jakieś zasoby społeczności, które Ci pomogły? Edytuj tę stronę i dodaj je!_

## Powiązane tematy {#related-topics}

- [Frameworki deweloperskie](/developers/docs/frameworks/)
- [Uruchom węzeł Ethereum](/developers/docs/nodes-and-clients/run-a-node/)
- [Węzły jako usługa](/developers/docs/nodes-and-clients/nodes-as-a-service)
