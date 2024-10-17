---
title: Fejlesztői hálózatok
description: Áttekintés az fejlesztői hálózatokról és az eszközökről, melyek segítségével Ethereum applikációk fejleszthetőek.
lang: hu
---

Amikor okosszerződéseket tartalmazó Ethereum alkalmazást épít, fontos, hogy egy lokális hálózaton lefuttassa azt, hogy megnézze hogyan működik telepítés előtt.

Hasonlóan ahhoz, amikor egy lokális szervert futtat a számítógépén webfejlesztés céljából, használhat fejlesztői hálózatokat egy lokális blokkláncpéldány létrehozásához, ahol tesztelheti a dappot. Ezek az Ethereum fejlesztői hálózatok olyan tulajdonságokkal rendelkeznek, melyek lehetővé teszik a gyorsabb iterációt, mint egy nyilvános teszthálózat (például nem kell azzal bajlódnia, hogy ETH-t szerezz egy teszthálózati csapból).

## Előfeltételek {#prerequisites}

Először meg kell értenie az [Ethereum stack alapjait](/developers/docs/ethereum-stack/) és az [Ethereum hálózatokat](/developers/docs/networks/) mielőtt elmélyedne a fejlesztői hálózatokban.

## Mi a fejlesztői hálózat? {#what-is-a-development-network}

A fejlesztői hálózatok lényegében olyan Ethereum kliensek (Ethereum implementációk), melyeket kimondottan a lokális fejlesztéshez terveztek.

**Miért ne futtassunk standard Ethereum csomópontot lokálisan?**

_Akár _ [saját csomópontot is futtathat](/developers/docs/nodes-and-clients/#running-your-own-node), de mivel a fejlesztői hálózatok célzottan a fejlesztésre vannak létrehozva, olyan kényelmi funkciók is be vannak építve, mint például:

- A lokális blokklánc determinisztikus feltöltése adatokkal (például számlák ETH egyenleggel)
- Azonnali blokklétrehozás minden egyes megkapott tranzakciónál, sorrendben és késés nélkül
- Fejlett hibakeresés és naplózási funkciók

## Elérhető eszközök {#available-projects}

**Megjegyzés**: A legtöbb [fejlesztői keretrendszer](/developers/docs/frameworks/) egy beépített fejlesztői hálózatot tartalmaz. Ajánljuk, hogy egy keretrendszer segítségével [állítsa be a helyi fejlesztési környezetét](/developers/local-environment/).

### Hardhat Network {#hardhat-network}

Egy helyi Ethereum hálózat fejlesztésre tervezve. Szerződéseket telepíthet, teszteket futtathat, hibakeresést és javítást végezhet a kódján.

A Hardhat Network a beépített Hardhat-tel jön, ami egy Ethereum fejlesztői környezet szakembereknek.

- [Honlap](https://hardhat.org/)
- [GitHub](https://github.com/nomiclabs/hardhat)

### Helyi Beacon láncok {#local-beacon-chains}

Néhány konszenzusos kliens rendelkezik olyan beépített eszközökkel, amellyel fel lehet állítani helyi Beacon láncokat a teszteléshez. Elérhető instrukciók a Lighthouse, Nimbus és Lodestar kliensekhez:

- [Helyi teszthálózat a Lodestarhoz](https://chainsafe.github.io/lodestar/usage/local/)
- [Helyi teszthálózat a Lighthouse-hoz](https://lighthouse-book.sigmaprime.io/setup.html#local-testnets)
- [Helyi teszthálózat a Nimbushoz](https://github.com/status-im/nimbus-eth1/blob/master/fluffy/docs/local_testnet.md)

### Nyilvános Ethereum-tesztláncok {#public-beacon-testchains}

Az Ethereum két karbantartott, nyilvános tesztimplementációval is rendelkezik: Goerli és Sepolia. A Goerli a javasolt teszthálózat, mely hosszú távú támogatással bír, és mindenkinek ingyenesen használható validálásra. A Sepolia egy újabb, kisebb lánc, melyet szintén fenn akarnak tartani a jövőben, és amelynek része egy engedélyhez kötött validátorszett (nem működhet bárki validátorként). A Ropsten lánc 2022. 4. negyedévében, a Rinkeby lánc pedig 2023. 2./3. negyedévében kerül lezárásra.

- [Goerli letétbe helyezési indítópult](https://goerli.launchpad.ethereum.org/)
- [Ropsten, Rinkeby és Kiln kivezetési bejelentés](https://blog.ethereum.org/2022/06/21/testnet-deprecation)

### Kurtosis Ethereum csomag {#kurtosis}

A Kurtosis egy felépített rendszer a több konténeres tesztkörnyezetekhez, amellyel a fejlesztők lokálisan felállíthatják a reprodukálható példányait a blokklánchálózatoknak.

Az Ethereum Kurtosis csomag segítségével gyorsan létrehozható egy paraméterezhető, nagymértékben skálázható és privát Ethereum teszthálózat a Docker vagy a Kubernetes segítségével. A csomag támogatja az összes főbb végrehajtási (EL) és konszenzusréteg (CL) klienst. A Kurtosis elegánsan kezeli az összes helyi port hozzárendelést és szolgáltatáskapcsolatot egy reprezentatív hálózathoz, amelyet az Ethereum fő infrastruktúrával kapcsolatos validálási és tesztelési munkafolyamatokban lehet használni.

- [Ethereum hálózati csomag](https://github.com/kurtosis-tech/ethereum-package)
- [Honlap](https://www.kurtosis.com/)
- [GitHub](https://github.com/kurtosis-tech/kurtosis)
- [Dokumentáció](https://docs.kurtosis.com/)

## További olvasnivaló {#further-reading}

_Van olyan közösségi erőforrása, amely segített Önnek? Szerkessze ezt az oldalt, és adja hozzá!_

## Kapcsolódó témák {#related-topics}

- [Fejlesztői keretrendszerek](/developers/docs/frameworks/)
- [Helyi fejlesztői környezet felállítása](/developers/local-environment/)
