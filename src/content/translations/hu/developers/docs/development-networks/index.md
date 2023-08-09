---
title: Fejlesztői hálózatok
description: Áttekintés az fejlesztői hálózatokról és az eszközökről, melyek segítségével Ethereum applikációk fejleszthetőek.
lang: hu
---

Az okosszerződésekkel történő Ethereum alkalmazások fejlesztésekor fontos, hogy egy lokális hálózaton futtasd, hogy megnézd hogyan működik telepítés előtt.

Hasonlóan ahhoz, amikor egy lokális szervert futtatsz a számítógépeden webfejlesztés céljából, használhatsz fejlesztői hálózatokat egy lokális blokklánc példány létrehozásához, ahol tesztelheted a dappodat. Ezek az Ethereum fejlesztői hálózatok olyan tulajdonságokkal rendelkeznek, melyek lehetővé teszik a gyorsabb iterációt, mint egy nyilvános tesztnet (például nem kell azzal bajlódnod, hogy ETH-et szerezz egy tesztnet csapból).

## Előfeltételek {#prerequisites}

Először meg kell értened az [Ethereum stack alapjait](/developers/docs/ethereum-stack/) és az [Ethereum hálózatokat](/developers/docs/networks/) mielőtt belevágnál a fejlesztői hálózatokba.

## Mi a fejlesztői hálózat? {#what-is-a-development-network}

A fejlesztői hálózatok lényegében olyan Ethereum kliensek (Ethereum implementációk), melyeket kimondottan a lokális fejlesztéshez terveztek.

**Miért ne futtassunk standard Ethereum csomópontot lokálisan?**

_Akár _ [futtathatsz saját csomópontot](/developers/docs/nodes-and-clients/#running-your-own-node) (mint a Geth, OpenEthereum vagy a Nethermind), de mivel a fejlesztői hálózatok célzottan a fejlesztésre vannak létrehozva, olyan kényelmi funkciók is be vannak építve, mint például:

- A lokális blokklánc feltöltése adatokkal determinisztikusan (pl. pénztárcák ETH tartalommal)
- Azonnali blokk bányászat minden egyes megkapott tranzakciónál, sorrendben és késés nélkül
- Fejlett debuggolás és loggolási funkciók

## Elérhető eszközök {#available-projects}

**Megjegyzés**: A legtöbb [fejlesztői keretrendszer](/developers/docs/frameworks/) egy beépített fejlesztői hálózatot tartalmaz. Ajánljuk, hogy egy keretrendszer segítségével [állítsd be a helyi fejlesztési környezetedet](/developers/local-environment/).

### Ganache {#ganache}

Indítsd be gyorsan egy személyes Ethereum blokkláncot, melyet tesztek futtatására, parancsok végrehajtására és az állapot megtekintésére használhatsz, mialatt a lánc működését irányítod.

A Ganache-nak van asztali alkalmazása (Ganache UI) és parancssori alkalmazása is (`ganache-cli`). A Truffle eszközsorozat része.

- [Honlap](https://www.trufflesuite.com/ganache)
- [GitHub](https://github.com/trufflesuite/ganache)
- [Dokumentáció](https://www.trufflesuite.com/docs/ganache/overview)

### Hardhat Network {#hardhat-network}

Egy helyi Ethereum hálózat fejlesztésre tervezve. Szerződéseket telepíthetsz, teszteket futtathatsz és debuggolhatod a kódodat

A Hardhat Network a beépített Hardhat-tel jön, ami egy Ethereum fejlesztői környezet szakembereknek.

- [Honlap](https://hardhat.org/)
- [GitHub](https://github.com/nomiclabs/hardhat)

## További olvasnivaló {#further-reading}

_Ismersz olyan közösségi anyagot, amely segített neked? Módosítsd az oldalt és add hozzá!_

## Kapcsolódó témák {#related-topics}

- [Fejlesztői keretrendszerek](/developers/docs/frameworks/)
- [Állítsd fel a helyi fejlesztői környezetedet](/developers/local-environment/)
