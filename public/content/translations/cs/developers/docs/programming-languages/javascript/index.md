---
title: Ethereum pro vývojáře v JavaScriptu
description: Naučte se vyvíjet pro Ethereum pomocí projektů a nástrojů založených na JavaScriptu.
lang: cs
---

JavaScript patří mezi nejoblíbenější jazyky v ekosystému Etherea. Ve skutečnosti existuje [tým](https://github.com/ethereumjs), který se věnuje tomu, aby do JavaScriptu přinesl co nejvíce z Etherea.

Existují příležitosti psát v JavaScriptu (nebo v něčem podobném) na [všech úrovních technologického stacku](/developers/docs/ethereum-stack/).

## Interakce s Ethereem {#interact-with-ethereum}

### Knihovny JavaScript API {#javascript-api-libraries}

Pokud chcete psát v JavaScriptu pro dotazování blockchainu, odesílání transakcí a další, nejpohodlnější způsob, jak to udělat, je použít [knihovnu JavaScript API](/developers/docs/apis/javascript/). Tato API umožňují vývojářům snadno komunikovat s [uzly v síti Ethereum](/developers/docs/nodes-and-clients/).

Tyto knihovny můžete použít k interakci s chytrými kontrakty na Ethereu, takže je možné vytvořit decentralizovanou aplikaci (dapp), kde k interakci s již existujícími kontrakty používáte pouze JavaScript.

**Podívejte se na**

- [Web3.js](https://web3js.readthedocs.io)
- [Ethers.js](https://ethers.org) – _obsahuje implementaci peněženky pro Ethereum a nástroje v JavaScriptu a TypeScriptu._
- [Viem](https://viem.sh) – _rozhraní TypeScriptu pro Ethereum, které poskytuje nízkoúrovňová bezstavová primitiva pro interakci s Ethereem._
- [Drift](https://ryangoree.github.io/drift/) – _metaknihovna pro TypeScript s vestavěným ukládáním do mezipaměti, hooky a testovacími mocky pro snadný vývoj na Ethereu napříč knihovnami Web3._

### Chytré kontrakty {#smart-contracts}

Pokud jste vývojář v JavaScriptu a chcete napsat svůj vlastní chytrý kontrakt, možná se budete chtít seznámit se [Solidity](https://solidity.readthedocs.io). Jedná se o nejoblíbenější jazyk pro chytré kontrakty a je syntakticky podobný JavaScriptu, což může usnadnit jeho učení.

Více o [chytrých kontraktech](/developers/docs/smart-contracts/).

## Porozumění protokolu {#understand-the-protocol}

### Virtuální stroj Etherea {#the-ethereum-virtual-machine}

Existuje javascriptová implementace [virtuálního stroje Etherea](/developers/docs/evm/). Podporuje nejnovější pravidla pro fork. Pravidla pro fork odkazují na změny provedené v EVM v důsledku plánovaných aktualizací.

Je rozdělena do různých balíčků JavaScriptu, které si můžete prohlédnout pro lepší pochopení:

- Účty
- Bloky
- Samotný blockchain
- Transakce
- A další...

To vám pomůže pochopit věci jako „jaká je datová struktura účtu?“.

Pokud dáváte přednost čtení kódu, tento JavaScript by mohl být skvělou alternativou k pročítání naší dokumentace.

**Podívejte se na EVM**  
[`@ethereumjs/evm`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/evm)

### Uzly a klienti {#nodes-and-clients}

Klient EthereumJS je v aktivním vývoji a umožňuje vám proniknout do toho, jak klienti Etherea fungují, v jazyce, kterému rozumíte; v JavaScriptu!

**Podívejte se na klienta**  
[`@ethereumjs/client`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/client)

## Další projekty {#other-projects}

Ve světě javascriptového Etherea se děje i spousta dalších věcí, včetně:

- knihoven nástrojů pro peněženky.
- nástrojů pro generování, import a export klíčů Etherea.
- implementace `merkle-patricia-tree` – datové struktury popsané v dokumentu yellow paper Etherea.

Ponořte se do toho, co vás nejvíce zajímá, v [repozitáři EthereumJS](https://github.com/ethereumjs)

## Další čtení {#further-reading}

_Víte o komunitním zdroji, který vám pomohl? Upravte tuto stránku a přidejte ho!_