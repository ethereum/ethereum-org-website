---
title: "Ethereum pro vývojáře v JavaScriptu"
description: "Naučte se vyvíjet pro Ethereum pomocí projektů a nástrojů založených na JavaScriptu."
lang: cs
---

JavaScript je jedním z nejpopulárnějších jazyků v ekosystému Ethereum. Ve skutečnosti existuje [tým](https://github.com/ethereumjs) věnovaný tomu, aby co nejvíce z Etherea přenesl do JavaScriptu.

Existují příležitosti k psaní v JavaScriptu (nebo něčem blízkém) na [všech úrovních zásobníku](/developers/docs/ethereum-stack/).

## Interakce s Ethereem {#interact-with-ethereum}

### JavaScriptové API knihovny {#javascript-api-libraries}

Pokud byste chtěli psát v JavaScriptu pro dotazování blockchainu, odesílání transakcí a další, nejpohodlnější způsob, jak to udělat, je použít [knihovnu JavaScript API](/developers/docs/apis/javascript/). Tato API umožňují vývojářům snadno komunikovat s [uzly v síti Ethereum](/developers/docs/nodes-and-clients/).

Tyto knihovny můžete použít k interakci s chytrými kontrakty na Ethereu, takže je možné vytvořit dapp, kde pro interakci s již existujícími kontrakty použijete pouze JavaScript.

**Podívejte se**

- [Web3.js](https://web3js.readthedocs.io)
- [Ethers.js](https://ethers.org) – _zahrnuje implementaci peněženky Ethereum a utility v JavaScriptu a TypeScriptu._
- [viem](https://viem.sh) – _rozhraní TypeScriptu pro Ethereum, které poskytuje nízkoúrovňové bezstavové primitivy pro interakci s Ethereem._
- [Drift](https://ryangoree.github.io/drift/) – _meta-knihovna TypeScriptu s vestavěným ukládáním do mezipaměti, háčky a testovacími maketami pro snadný vývoj na Ethereu napříč knihovnami web3._

### Chytré kontrakty {#smart-contracts}

Pokud jste JavaScript vývojář a chcete psát svůj vlastní chytrý kontrakt, možná se budete chtít seznámit se [Solidity](https://solidity.readthedocs.io). Jedná se o nejpopulárnější jazyk pro chytré kontrakty a je syntakticky podobný JavaScriptu, což může usnadnit jeho učení.

Více o [chytrých kontraktech](/developers/docs/smart-contracts/).

## Pochopení protokolu {#understand-the-protocol}

### Virtuální stroj Etherea {#the-ethereum-virtual-machine}

Existuje JavaScriptová implementace [virtuálního stroje Etherea](/developers/docs/evm/). Podporuje nejnovější pravidla větví. Pravidla větví odkazují na změny provedené v EVM v důsledku plánovaných upgradů.

Je rozdělen do různých JavaScriptových balíčků, které si můžete prohlédnout, abyste lépe porozuměli:

- Účty
- Bloky
- Samotný blockchain
- Transakce
- A další...

To vám pomůže pochopit věci jako "jaká je datová struktura účtu?".

Pokud dáváte přednost čtení kódu, tento JavaScript může být skvělou alternativou ke čtení naší dokumentace.

**Prozkoumejte EVM**  
[`@ethereumjs/evm`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/evm)

### Uzly a klienti {#nodes-and-clients}

Klient Ethereumjs je v aktivním vývoji, který vám umožní ponořit se do toho, jak fungují klienti Etherea, v jazyce, kterému rozumíte: v JavaScriptu!

**Prozkoumejte klienta**  
[`@ethereumjs/client`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/client)

## Další projekty {#other-projects}

V zemi Etherea a JavaScriptu se toho děje spousta, včetně:

- knihovny s utilitami pro peněženky.
- nástroje pro generování, import a export klíčů Ethereum.
- implementace `merkle-patricia-tree` – datové struktury popsané ve žluté knize Etherea.

Ponořte se do toho, co vás nejvíce zajímá, v [repozitáři EthereumJS](https://github.com/ethereumjs)

## Další čtení {#further-reading}

_Víte o komunitním zdroji, který vám pomohl? Upravte tuto stránku a přidejte ho!_
