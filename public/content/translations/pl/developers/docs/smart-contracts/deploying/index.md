---
title: Wdrażanie inteligentnych kontraktów
description:
lang: pl
incomplete: true
---

Musisz wdrożyć inteligentny kontrakt, aby był dostępny dla użytkowników sieci Ethereum.

Aby wdrożyć inteligentny kontrakt, wysyłasz jedynie transakcję Ethereum zawierającą kod skompilowanego inteligentnego kontraktu bez wskazania odbiorców.

## Warunki wstępne {#prerequisites}

Powinieneś znać [sieci Ethereum](/developers/docs/networks/), [transakcje](/developers/docs/transactions/) i [anatomię inteligentnych kontraktów](/developers/docs/smart-contracts/anatomy/) przed wdrożeniem inteligentnych kontraktów.

Wdrożenie kontraktu również kosztuje ETH, więc trzeba się orientować w kwestiach związanych z [gazem i opłatami](/developers/docs/gas/) w Ethereum.

Na koniec musisz skompilować kontrakt przed wdrożeniem, więc upewnij się, że przeczytałeś o [kompilowaniu inteligentnych kontraktów](/developers/docs/smart-contracts/compiling/).

## Jak wdrożyć inteligentny kontrakt

Oznacza to, że będziesz musiał uiścić opłatę transakcyjną, więc upewnij się, że masz trochę ETH.

### Potrzebne elementy {#what-youll-need}

- Kod bajtowy Twojej umowy – jest generowany za pomocą [kompilacji](/developers/docs/smart-contracts/compiling/).
- Ether za gaz – ustawisz swój limit gazu, podobnie jak inne transakcje, więc pamiętaj, że wdrożenie umowy wymaga znacznie więcej gazu niż zwykły transfer ETH.
- Skrypt wdrażania lub wtyczka.
- Dostęp do [węzła Ethereum](/developers/docs/nodes-and-clients/) — można go uzyskać, uruchamiając własny węzeł, łącząc się z węzłem publicznym lub za pośrednictwem klucza API przy użyciu usługi takiej jak Infura lub Alchemy

Po wdrożeniu Twój kontrakt będzie miał adres Ethereum, podobnie jak inne [konta](/developers/docs/accounts/).

## Powiązane narzędzia {#related-tools}

**Remix —** **_Remix IDE umożliwia opracowywanie inteligentnych kontraktów dla Ethereum, takich jak blockchain, ich wdrażanie i administrowanie nimi._**

- [Remix](https://remix.ethereum.org)

**Tenderly —** **_platforma do łatwego monitorowania Twoich inteligentnych kontraktów ze śledzeniem błędów, alertami, wskaźniki wydajności i szczegółowymi analizami kontraktu._**

- [tenderly.co](https://tenderly.co/)
- [GitHub](https://github.com/Tenderly)
- [Discord](https://discord.gg/eCWjuvt)

## Powiązane samouczki {#related-tutorials}

- [Wdrażanie pierwszego inteligentnego kontraktu](/developers/tutorials/deploying-your-first-smart-contract/) _– wprowadzenie do wdrażania pierwszego inteligentnego kontraktu w sieci testowej Ethereum._
- [Korzystanie z innych kontraktów pisanych w języku Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– jak wdrożyć inteligentny kontrakt na podstawie istniejącego kontraktu i zastosować go._
- [Jak zmniejszyć rozmiar kontraktu](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _— jak zmniejszyć rozmiar kontraktu, aby utrzymać go poniżej limitu i zaoszczędzić na gazie_

## Dalsza lektura {#further-reading}

_Znasz jakieś zasoby społeczności, które Ci pomogły? Wyedytuj tę stronę i dodaj je!_

## Powiązane tematy

- [Frameworki programistyczne](/developers/docs/frameworks/)
