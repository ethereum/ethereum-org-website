---
title: Ethereum JavaScript fejlesztőknek
description: Tanulj meg Ethereumon fejleszteni JavaScript alapú projektek és eszközök használatával.
lang: hu
---

A JavaScript a legnépszerűbb nyelvek között van az Ethereum ökoszisztémában. Valójában van egy [csapat](https://github.com/ethereumjs), mely célul tűzte ki, hogy a lehető legtöbb Ethereumot vigye be a JavaScriptbe.

Lehetőség van JavaScriptet írni (vagy valami hasonlót) a [stack összes szintjén](/developers/docs/ethereum-stack/).

## Interakció az Ethereummal {#interact-with-ethereum}

### JavaScript API könyvtárak {#javascript-api-libraries}

Ha JavaScriptet szeretnél írni a blokklánc lekérdezéséhez, tranzakció küldéshez vagy más egyébhez, akkor ennek a legkézenfekvőbb módja egy [JavaScript API könyvtár](/developers/docs/apis/javascript/) használata. Ezek az API-ok lehetővé teszik a fejlesztőknek, hogy interakcióba lépjenek az [Ethereum hálózat csomópontjaival](/developers/docs/nodes-and-clients/).

Ezekkel a könyvtárakkal okosszerződésekkel léphetsz kapcsolatba az Ethereumon, így létre lehet hozni egy dappot, ahol elég csak a JavaScriptet használni már létező okosszerződésekkel történő interakcióhoz.

**Nézd meg**

- [Web3.js](https://web3js.readthedocs.io/)
- [Ethers.js](https://docs.ethers.io/) _– tartalmaz egy Ethereum tárca implementációt és más segédprogramokat JavaScriptben és TypeScriptben._

### Okosszerződések {#smart-contracts}

Ha egy JavaScript fejlesztő vagy és szeretnéd megírni a saját okosszerződéseidet, akkor érdemes megismerkedned a [Solidity-vel](https://solidity.readthedocs.io). Ez a legnépszerűbb okosszerződés nyelv és nagyrészt a JavaScript inspirálta.

Többet az [okosszerződésekről](/developers/docs/smart-contracts/).

## Értsd meg a protokollt {#understand-the-protocol}

### Az Ethereum virtuális gép (EVM) {#the-ethereum-virtual-machine}

Van az [Ethereum virtuális gépnek](/developers/docs/evm/) egy JavaScript implementációja. Támogatja a legfrissebb elágazási (fork) szabályokat. Az elágazási szabályok az EVM-en végzett tervezett frissítésekből adódó szabályok.

Különböző JavaScript csomagokra oszlik, amelyeket áttekinthetsz a jobb megértés érdekében:

- Számlák
- Blokkok
- A blokklánc maga
- Tranzakciók
- És még sok más...

Ez segíteni fog megérteni olyan dolgokat, mint "mi a számlának az adatstruktúrája?".

Ha inkább el szeretnéd olvasni a kódot, ez a JavaScript nagyszerű alternatíva lehet a dokumentumaink átolvasásához.

**Nézd meg a monorepot**  
[`ethereumjs`](https://github.com/ethereumjs/ethereumjs-vm)

### Csomópontok és kliensek {#nodes-and-clients}

Van egy fejlesztés alatt álló Ethereumjs kliens. Ez lehetővé teszi, hogy a mélyére áss, hogyan működnek az Ethereum kliensei egy általad ismert nyelven.

**Nézd meg a klienst**  
[`ethereumjs-client`](https://github.com/ethereumjs/ethereumjs-client)

## Egyéb projektek {#other-projects}

Rengeteg más dolog is zajlik az Ethereum JavaScript világában, beleértve:

- könyvtárak és tárca eszközök.
- eszközök Ethereum kulcsok generálására, importálására és exportálására.
- a `merkle-patricia-fa` implementációja – egy adatstruktúra, melyet az Ethereum sárga könyv részletez.

Mélyedj bele abba, ami érdekel a [EthereumJS repoban](https://github.com/ethereumjs)

## További olvasnivaló {#further-reading}

_Ismersz olyan közösségi anyagot, mely segített neked? Módosítsd az oldalt és add hozzá!_
