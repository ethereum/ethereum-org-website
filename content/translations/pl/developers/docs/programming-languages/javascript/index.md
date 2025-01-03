---
title: Ethereum dla deweloperów JavaScript
description: Dowiedz się, jak programować dla Ethereum, korzystając z projektów i narzędzi opartych na JavaScript.
lang: pl
---

JavaScript jest jednym z najpopularniejszych języków w ekosystemie Ethereum. W rzeczywistości istnieje [zespół](https://github.com/ethereumjs), którego celem jest przeniesienie jak największej ilości Ethereum do JavaScript.

Istnieją możliwości pisania JavaScript (lub czegoś bliskiego) na [na wszystkich poziomach stosu](/developers/docs/ethereum-stack/).

## Interakcja z Ethereum {#interact-with-ethereum}

### Biblioteki API JavaScript {#javascript-api-libraries}

Jeśli chcesz napisać JavaScript do wysyłania zapytań do łańcucha bloków, wysyłania transakcji i nie tylko, najwygodniejszym sposobem na to jest użycie [biblioteki API JavaScript](/developers/docs/apis/javascript/). Te interfejsy API umożliwiają programistom łatwą interakcję z [węzłami w sieci Ethereum](/developers/docs/nodes-and-clients/).

Możesz użyć tych bibliotek do interakcji z inteligentnymi kontraktami w Ethereum, dzięki czemu możliwe jest zbudowanie aplikacji dapp, w której po prostu używasz JavaScript do interakcji z wcześniej istniejącymi kontraktami.

**Sprawdź**

- [Web3.js](https://web3js.readthedocs.io/)
- [Ethers.js](https://docs.ethers.io/) _– zawiera implementację portfela Ethereum i narzędzia w JavaScript i TypeScript._

### Inteligentne kontrakty {#smart-contracts}

Jeśli jesteś programistą JavaScript i chcesz napisać własną inteligentny kontrakt, możesz zapoznać się z [Solidity](https://solidity.readthedocs.io). To najpopularniejszy język inteligentnych kontraktów, w dużej mierze inspirowany JavaScript.

Dowiedz się więcej o [inteligentnych kontraktach](/developers/docs/smart-contracts/).

## Zrozumienie protokołu {#understand-the-protocol}

### Maszyna Wirtualna Ethereum {#the-ethereum-virtual-machine}

Istnieje implementacja JavaScript [wirtualnej maszyny Ethereum](/developers/docs/evm/). Obsługuje najnowsze reguły forka. Reguły forka odnoszą się do zmian wprowadzonych do EVM w wyniku planowanych uaktualnień.

Jest podzielona na różne pakiety JavaScript, które możesz sprawdzić, aby lepiej zrozumieć:

- Konta
- Bloki
- Sam blockchain
- Transakcje
- I więcej...

Pomoże Ci to zrozumieć takie rzeczy jak „jaka jest struktura danych konta?”.

Jeśli wolisz czytać kod, ten w JavaScript może być świetną alternatywą dla czytania naszych dokumentów.

**Sprawdź monorepo**  
[`ethereumjs`](https://github.com/ethereumjs/ethereumjs-vm)

### Węzły i klienci {#nodes-and-clients}

Trwa rozwój klienta Ethereumjs. Pozwoli ci to poznać działanie klientów Ethereum pracują, w języku, który rozumiesz.

**Sprawdź klienta**  
[`ethereumjs-client`](https://github.com/ethereumjs/ethereumjs-client)

## Inne projekty {#other-projects}

W krainie Ethereum JavaScript jest również wiele innych rzeczy, w tym:

- biblioteki narzędzi portfelowych.
- narzędzia do generowania, importu i eksportu kluczy Ethereum.
- implementacja `merkle-patricia-tree` – struktury danych przedstawionej w żółtej księdze Ethereum.

Zajrzyj do tego, co Cię najbardziej interesuje, w [repozytorium EthereumJS](https://github.com/ethereumjs)

## Dalsza lektura {#further-reading}

_Znasz jakieś zasoby społeczności, które Ci pomogły? Wyedytuj tę stronę i dodaj je!_
