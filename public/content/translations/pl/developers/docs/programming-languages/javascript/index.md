---
title: Ethereum dla deweloperów JavaScript
description: Dowiedz się, jak programować dla Ethereum, korzystając z projektów i narzędzi opartych na JavaScript.
lang: pl
---

JavaScript jest jednym z najpopularniejszych języków w ekosystemie Ethereum. W rzeczywistości istnieje [zespół](https://github.com/ethereumjs), którego celem jest przeniesienie jak największej części Ethereum do JavaScript.

Istnieją możliwości pisania w JavaScript (lub czymś podobnym) na [wszystkich poziomach stosu](/developers/docs/ethereum-stack/).

## Interakcja z Ethereum {#interact-with-ethereum}

### Biblioteki API JavaScript {#javascript-api-libraries}

Jeśli chcesz pisać w JavaScript, by wysyłać zapytania do blockchaina, przesyłać transakcje i nie tylko, najwygodniejszym sposobem na to jest użycie [biblioteki API JavaScript](/developers/docs/apis/javascript/). Te interfejsy API umożliwiają deweloperom łatwą interakcję z [węzłami w sieci Ethereum](/developers/docs/nodes-and-clients/).

Możesz użyć tych bibliotek do interakcji z inteligentnymi kontraktami w Ethereum, dzięki czemu możliwe jest zbudowanie aplikacji dapp, w której po prostu używasz JavaScript do interakcji z wcześniej istniejącymi kontraktami.

**Sprawdź**

- [Web3.js](https://web3js.readthedocs.io)
- [Ethers.js](https://ethers.org) – _zawiera implementację portfela Ethereum i narzędzia w językach JavaScript i TypeScript._
- [viem](https://viem.sh) – _interfejs TypeScript dla Ethereum, który zapewnia niskopoziomowe, bezstanowe prymitywy do interakcji z Ethereum._
- [Drift](https://ryangoree.github.io/drift/) – _meta-biblioteka TypeScript z wbudowanym buforowaniem, hookami i makietami testowymi, ułatwiająca programowanie na Ethereum w bibliotekach web3._

### Inteligentne kontrakty {#smart-contracts}

Jeśli jesteś deweloperem JavaScript i chcesz napisać własny inteligentny kontrakt, możesz zapoznać się z [Solidity](https://solidity.readthedocs.io). Jest to najpopularniejszy język inteligentnych kontraktów, który jest składniowo podobny do JavaScript, co może ułatwić jego naukę.

Więcej o [inteligentnych kontraktach](/developers/docs/smart-contracts/).

## Zrozumienie protokołu {#understand-the-protocol}

### Wirtualna Maszyna Ethereum {#the-ethereum-virtual-machine}

Istnieje implementacja [Wirtualnej Maszyny Ethereum](/developers/docs/evm/) w JavaScript. Obsługuje najnowsze reguły forka. Reguły forka odnoszą się do zmian wprowadzonych do EVM w wyniku planowanych uaktualnień.

Jest podzielona na różne pakiety JavaScript, które możesz sprawdzić, aby lepiej zrozumieć:

- Konta
- Bloki
- Sam łańcuch bloków
- Transakcje
- I więcej...

Pomoże Ci to zrozumieć takie rzeczy jak „jaka jest struktura danych konta?”.

Jeśli wolisz czytać kod, ten w JavaScript może być świetną alternatywą dla czytania naszych dokumentów.

**Sprawdź EVM**  
[`@ethereumjs/evm`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/evm)

### Węzły i klienci {#nodes-and-clients}

Klient Ethereumjs jest aktywnie rozwijany i pozwala zagłębić się w działanie klientów Ethereum w zrozumiałym języku — JavaScript!

**Sprawdź klienta**  
[`@ethereumjs/client`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/client)

## Inne projekty {#other-projects}

W krainie Ethereum JavaScript jest również wiele innych rzeczy, w tym:

- biblioteki narzędzi portfelowych.
- narzędzia do generowania, importu i eksportu kluczy Ethereum.
- implementacja `merkle-patricia-tree` – struktury danych opisanej w żółtej księdze Ethereum.

Zagłęb się w to, co najbardziej Cię interesuje w [repozytorium EthereumJS](https://github.com/ethereumjs)

## Dalsza lektura {#further-reading}

_Znasz jakieś zasoby społeczności, które Ci pomogły? Edytuj tę stronę i dodaj je!_
