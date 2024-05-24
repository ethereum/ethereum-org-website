---
title: Ethereum JavaScript fejlesztőknek
description: Tanuljon meg Ethereumon fejleszteni JavaScript alapú projektek és eszközök használatával.
lang: hu
---

A Javascript a legnépszerűbb nyelvek között van az Ethereum ökoszisztémában. Valójában van egy [csapat](https://github.com/ethereumjs), mely célul tűzte ki, hogy a lehető legtöbb Ethereumot vigye be a JavaScriptbe.

Lehetőség van JavaScriptet írni (vagy valami hasonlót) a [stack összes szintjén](/developers/docs/ethereum-stack/).

## Interakció az Ethereummal {#interact-with-ethereum}

### JavaScript API könyvtárak {#javascript-api-libraries}

Ha JavaScriptet szeretne írni a blokklánc lekérdezéséhez, tranzakció küldéséhez vagy máshoz, akkor ennek a legkézenfekvőbb módja egy [JavaScript API könyvtár](/developers/docs/apis/javascript/) használata. Ezek az API-k lehetővé teszik a fejlesztőknek, hogy interakcióba lépjenek az [Ethereum-hálózat csomópontjaival](/developers/docs/nodes-and-clients/).

Ezekkel a könyvtárakkal okosszerződésekkel léphet kapcsolatba az Ethereumon, így létre lehet hozni egy dappot, ahol elég csak a JavaScriptet használni már létező okosszerződésekkel történő interakcióhoz.

**Nézze meg**

- [Web3.js](https://web3js.readthedocs.io/)
- [Ethers.js](https://docs.ethers.io/) _– tartalmaz egy Ethereum tárca implementációt és más segédprogramokat JavaScriptben és TypeScriptben._
- [viem](https://viem.sh) – egy TypeScript interfész az Ethereumhoz, amely alacsony szintű, státuszmentes alapokat biztosít az Ethereummal való interakcióhoz.

### Okosszerződések {#smart-contracts}

Ha Ön Javascript-fejlesztő, és szeretné megírni saját okosszerződését, akkor érdemes megismerkednie a [Solidity-vel](https://solidity.readthedocs.io). Ez a legnépszerűbb okosszerződésnyelv, és szintaktikailag hasonló a JavaScript-hez, ami miatt könnyebb lehet elsajátítani azt.

Többet az [okosszerződésekről](/developers/docs/smart-contracts/).

## Értse meg a protokollt {#understand-the-protocol}

### Az Ethereum virtuális gép (EVM) {#the-ethereum-virtual-machine}

Az [Ethereum virtuális géphez](/developers/docs/evm/) létezik egy JavaScript-implementáció is. Támogatja a legfrissebb elágazási (fork) szabályokat. Az elágazási szabályok az EVM-en végzett tervezett frissítésekből adódó szabályok.

Különböző JavaScript csomagokra oszlik, amelyeket áttekinthet a jobb megértés érdekében:

- Számlák
- Blokkok
- A blokklánc maga
- Tranzakciók
- És még sok más...

Ez segít megérteni olyan dolgokat, mint például, „mi a számla adatstruktúrája”.

Ha inkább el szeretné olvasni a kódot, ez a JavaScript nagyszerű alternatíva lehet a dokumentumaink áttekintéséhez.

**Nézze meg a kapcsolódó mappát**  
[`ethereumjs`](https://github.com/ethereumjs/ethereumjs-vm)

### Csomópontok és kliensek {#nodes-and-clients}

Az Ethereumjs kliens aktív fejlesztés alatt áll, így Önnek lehetősége van elmélyedni abban, hogyan működnek az Ethereum-kliensek az Ön által ismert nyelven: JavaScript-ben!

Korábban egy különálló [`mappában`](https://github.com/ethereumjs/ethereumjs-client) tárolták, de azután beolvadt az EthereumVM monorepóba egy csomagként.

**Nézze meg a klienst**  
[`ethereumjs-client`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/client)

## Egyéb projektek {#other-projects}

Rengeteg más dolog is zajlik az Ethereum JavaScript világában, mint például:

- könyvtárak és tárcaeszközök.
- eszközök Ethereum kulcsok generálására, importálására és exportálására.
- a `merkle-patricia-tree` (Merkle Patricia-fa) implementációja – egy adatstruktúra, melyet az Ethereum Sárgakönyv részletez.

Mélyedjen bele abba, ami a leginkább érdekli a [EthereumJS mappában](https://github.com/ethereumjs)

## További olvasnivaló {#further-reading}

_Van olyan közösségi erőforrása, amely segített Önnek? Szerkessze ezt az oldalt, és adja hozzá!_
