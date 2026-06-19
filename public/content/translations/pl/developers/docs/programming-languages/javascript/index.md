---
title: "Ethereum dla programistów JavaScript"
description: "Dowiedz się, jak programować dla Ethereum przy użyciu projektów i narzędzi opartych na języku JavaScript."
lang: pl
---

JavaScript jest jednym z najpopularniejszych języków w ekosystemie Ethereum. W rzeczywistości istnieje [zespół](https://github.com/ethereumjs) poświęcony przeniesieniu jak największej części Ethereum do języka JavaScript.

Istnieją możliwości pisania w języku JavaScript (lub czymś podobnym) na [wszystkich poziomach stosu](/developers/docs/ethereum-stack/).

## Interakcja z Ethereum {#interact-with-ethereum}

### Biblioteki API JavaScript {#javascript-api-libraries}

Jeśli chcesz pisać w języku JavaScript, aby odpytywać blockchain, wysyłać transakcje i nie tylko, najwygodniejszym sposobem na to jest użycie [biblioteki API JavaScript](/developers/docs/apis/javascript/). Te API pozwalają programistom na łatwą interakcję z [węzłami w sieci Ethereum](/developers/docs/nodes-and-clients/).

Możesz użyć tych bibliotek do interakcji z inteligentnymi kontraktami w Ethereum, więc możliwe jest zbudowanie zdecentralizowanej aplikacji (dapp), w której używasz tylko języka JavaScript do interakcji z już istniejącymi kontraktami.

**Sprawdź**

- [Web3.js](https://web3js.readthedocs.io)
- [Ethers.js](https://ethers.org) – _zawiera implementację portfela Ethereum oraz narzędzia w językach JavaScript i TypeScript._
- [viem](https://viem.sh) – _interfejs TypeScript dla Ethereum, który zapewnia niskopoziomowe, bezstanowe prymitywy do interakcji z Ethereum._
- [Drift](https://ryangoree.github.io/drift/) – _metabiblioteka TypeScript z wbudowanym buforowaniem, hookami i mockami testowymi do bezproblemowego programowania w Ethereum w różnych bibliotekach Web3._

### Inteligentne kontrakty {#smart-contracts}

Jeśli jesteś programistą JavaScript i chcesz napisać własny inteligentny kontrakt, możesz chcieć zapoznać się z [Solidity](https://solidity.readthedocs.io). Jest to najpopularniejszy język inteligentnych kontraktów i jest składniowo podobny do języka JavaScript, co może ułatwić jego naukę.

Więcej o [inteligentnych kontraktach](/developers/docs/smart-contracts/).

## Zrozumienie protokołu {#understand-the-protocol}

### Maszyna wirtualna Ethereum {#the-ethereum-virtual-machine}

Istnieje implementacja [maszyny wirtualnej Ethereum](/developers/docs/evm/) w języku JavaScript. Obsługuje ona najnowsze zasady rozwidlenia. Zasady rozwidlenia odnoszą się do zmian wprowadzonych w EVM w wyniku planowanych aktualizacji.

Jest ona podzielona na różne pakiety JavaScript, które możesz sprawdzić, aby lepiej zrozumieć:

- Konta
- Bloki
- Sam blockchain
- Transakcje
- I wiele więcej...

Pomoże ci to zrozumieć rzeczy takie jak „jaka jest struktura danych konta?”.

Jeśli wolisz czytać kod, ten JavaScript może być świetną alternatywą dla czytania naszej dokumentacji.

**Sprawdź EVM**  
[`@ethereumjs/evm`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/evm)

### Węzły i klienci {#nodes-and-clients}

Klient EthereumJS jest w fazie aktywnego rozwoju, co pozwala zagłębić się w to, jak działają klienci Ethereum w języku, który rozumiesz: JavaScript!

**Sprawdź klienta**  
[`@ethereumjs/client`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/client)

## Inne projekty {#other-projects}

W świecie Ethereum JavaScript dzieje się również wiele innych rzeczy, w tym:

- biblioteki narzędzi portfela.
- narzędzia do generowania, importowania i eksportowania kluczy Ethereum.
- implementacja `merkle-patricia-tree` – struktury danych opisanej w żółtej księdze Ethereum.

Zagłęb się w to, co najbardziej cię interesuje w [repozytorium EthereumJS](https://github.com/ethereumjs)

## Dalsza lektura {#further-reading}

_Znasz zasób społeczności, który ci pomógł? Edytuj tę stronę i dodaj go!_