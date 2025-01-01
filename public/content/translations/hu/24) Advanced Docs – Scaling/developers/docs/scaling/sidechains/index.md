---
title: Mellékláncok
description: Bevezetés a mellékláncokba, az Ethereum közössége által használt skálázási megoldásba.
lang: hu
sidebarDepth: 3
---

A melléklánc egy különálló blokklánc, amely az Ethereum hálózatától függetlenül működik, és az Ethereum főhálózatához egy kétirányú híddal csatlakozik. A mellékláncoknak eltérő blokkparaméterei és [konszenzusalgoritmusai](/developers/docs/consensus-mechanisms/) lehetnek, melyeket a tranzakciók hatékonyabb feldolgozására terveztek. A mellékláncok használata azonban kompromisszumokkal jár, mivel azok nem rendelkeznek az Ethereumra jellemző biztonsági tulajdonságokkal. A [második blokkláncréteg (L2) skálázási megoldásaival](/layer-2/) ellentétben a mellékláncok nem rögzítik állapotváltozásaikat és tranzakciós adataikat az Ethereum főhálózatán.

A mellékláncok bizonyos mértékben feláldozzák decentralizáltságukat vagy biztonságukat, hogy nagyobb tranzakcióátvitelt érjenek el ([skálázhatósági trilemma](https://vitalik.eth.limo/general/2021/05/23/scaling.html)). Az Ethereum azonban elkötelezett a skálázási megoldások mellett, anélkül hogy kompromisszumot kötne a decentralizáció és biztonság terén, ahogy azt a [vízió megfogalmazása](/roadmap/vision/) is mutatja a fejlesztésekre vonatkozóan.

## Hogyan működnek a mellékláncok? {#how-do-sidechains-work}

A mellékláncok független blokkláncok, eltérő történetekkel, fejlesztési tervekkel és tervezési megoldásokkal. Bár egy mellékláncnak a felszínen lehet néhány hasonlósága az Ethereummal, számos sajátossággal rendelkezik.

### Konszenzusalgoritmus {#consensus-algorithms}

A mellékláncokat egyedivé (Ethereumtól eltérővé) tevő egyik tulajdonság az alkalmazott konszenzusalgoritmus. Konzenzus tekintetében a mellékláncok nem támaszkodnak az Ethereumra, hanem az igényeiknek megfelelő alternatív konzenzusprotokollt választhatnak. Néhány példa a mellékláncokon alkalmazott konszenzusalgoritmusokra:

- [Proof-of-authority (jogosultsági igazolás)](/developers/docs/consensus-mechanisms/poa/)
- [Delegált proof-of-stake (letéti igazolás)](https://en.bitcoin.it/wiki/Delegated_proof_of_stake)
- [Bizánci hibatűrés](https://decrypt.co/resources/byzantine-fault-tolerance-what-is-it-explained).

Az Ethereumhoz hasonlóan a mellékláncok is rendelkeznek validáló csomópontokkal, amelyek ellenőrzik és feldolgozzák a tranzakciókat, blokkokat állítanak elő, és tárolják a blokklánc állapotát. A validátorok felelősek a konszenzus fenntartásáért a hálózaton belül és a rosszindulatú támadások elleni védelemért is.

#### Blokkparaméterek {#block-parameters}

Az Ethereum korlátozza a [blokkidőt](/developers/docs/blocks/#block-time) (azaz az új blokkok létrehozásához szükséges időt) és a [blokkméretet](/developers/docs/blocks/#block-size) (azaz a blokkokban tárolt adat mennyiségét gázban kifejezve). A mellékláncok ezzel szemben más paramétereket alkalmaznak, mint a gyorsabb blokkidők vagy a magasabb gázkorlátozások, annak érdekében, hogy nagyobb teljesítményt, gyorsabb tranzakciókat és alacsonyabb díjakat érjenek el.

Habár ez bizonyos előnyökkel jár, kritikus következményei lehetnek a hálózat decentralizáltságát és biztonságát illetően. Az olyan blokkparaméterek, mint az alacsony blokkidők és a nagy blokkméretek növelik egy teljes csomópont fenntartásának nehézségeit, ami miatt csak néhány „szupercsomópont” felelhet a lánc biztonságáért. Egy ilyen forgatókönyv esetén megnő a validátorok összejátszásának vagy a lánc rosszindulatú átvételének lehetősége.

Ahhoz, hogy a blokkláncok a decentralizáció csökkenése nélkül skálázódhassanak, a csomópontok működtetésének mindenki számára elérhetőnek kell lennie, nem csak a speciális hardverrel rendelkezőknek. Ezért folynak erőfeszítések annak biztosítására, hogy mindenki [futtasson egy teljes csomópontot](/developers/docs/nodes-and-clients/#why-should-i-run-an-ethereum-node) az Ethereum hálózaton.

### EVM-kompatibilitás {#evm-compatibility}

Egyes mellékláncok EVM-kompatibilisek, és képesek az [Ethereum virtuális gépre (EVM)](/developers/docs/evm/) fejlesztett szerződések végrehajtására. Az EVM-kompatibilis mellékláncok támogatják azokat az okosszerződéseket, melyeket [Solidity](/developers/docs/smart-contracts/languages/) vagy más EVM okosszerződés nyelveken írtak, tehát az Ethereum főhálózatra írt okosszerződések az EVM-kompatibilis mellékláncokon is működnek.

Ha Ön a [dappját](/developers/docs/dapps/) egy mellékláncban szeretné használni, akkor csak az [okosszerződést](/developers/docs/smart-contracts/) kell telepíteni erre a mellékláncra. Úgy néz ki, olyan érzés, és úgy is működik, mint a főhálózat – a szerződéseket Solidityben írja, és a melléklánc RPC-jén keresztül lép kapcsolatba a lánccal.

Mivel a mellékláncok EVM-kompatibilisek, hasznos [skálázási megoldásnak](/developers/docs/scaling/) számítanak az Ethereum-natív dappok számára. Ha a dapp egy mellékláncon van, a felhasználók alacsonyabb gázdíjakat és gyorsabb tranzakciókat élvezhetnek, különösen akkor, ha a főhálózat túlterhelt.

Ugyanakkor a melléklánc használata jelentős kompromisszumokkal jár. Minden melléklánc maga felel a biztonságáért, és nem örökli az Ethereum biztonsági tulajdonságait. Ez növeli a rosszindulatú viselkedés lehetőségét, ami hatással lehet a felhasználókra vagy veszélyeztetheti pénzeszközeiket.

### Eszközmozgás {#asset-movement}

Ahhoz, hogy egy különálló blokklánc az Ethereum főhálózat mellékláncává váljon, kezelnie kell az eszközök átutalását az Ethereum főhálózatról el és vissza. Az Ethereummal való átjárhatóságot egy blokklánchíd segítségével érik el. A [hidak](/bridges/) az Ethereum főhálózatra telepített okosszerződéseket és egy mellékláncot használnak az alapok közötti áthidalásokra.

Bár a hidak segítségével a felhasználók pénzeszközöket mozgathatnak az Ethereum és a melléklánc között, az eszközök fizikailag nem mozognak a két lánc között. Ehelyett olyan mechanizmusokat használnak a láncok közötti értékátvitelre, amelyek jellemzően kibocsátással és égetéssel járnak. További információ a [hidakról](/developers/docs/bridges/#how-do-bridges-work).

## A mellékláncok előnyei és hátrányai {#pros-and-cons-of-sidechains}

| Előnyök                                                                                                                                                    | Hátrányok                                                                                                                                                      |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A mellékláncok alapjául szolgáló technológia jól megalapozott, és kiterjedt kutatás és tervezési fejlesztések eredménye.                                   | A mellékláncok a decentralizáció és a bizalomigény-mentesség bizonyos mértékét a skálázhatóságra cserélik.                                                     |
| A mellékláncok támogatják az általános számításokat és EVM-kompatibilitást kínálnak (Ethereum-natív dappokat futtathatnak).                                | Egy melléklánc külön konszenzusmechanizmust használ, és nem részesül az Ethereum biztonsági garanciáiból.                                                      |
| A mellékláncok különböző konszenzusmodelleket használnak a tranzakciók hatékony feldolgozása és a felhasználók tranzakciós díjainak csökkentése érdekében. | A mellékláncok magasabb szintű bizalmi feltételezést igényelnek (például a rosszindulatú melléklánc-validátorok határozatképes csoportja csalást követhet el). |
| Az EVM-kompatibilis mellékláncok lehetővé teszik a dappok számára, hogy bővítsék az ökoszisztémájukat.                                                     |                                                                                                                                                                |

### Mellékláncok használata {#use-sidechains}

Több projekt is kínál olyan melléklánc-implementációkat, amelyeket Ön is beépíthet a dappjaiba:

- [Polygon PoS](https://polygon.technology/solutions/polygon-pos)
- [Skale](https://skale.network/)
- [Gnosis Chain (korábban xDai)](https://www.gnosischain.com/)
- [Loom Network](https://loomx.io/)
- [Metis Andromeda](https://www.metis.io/)

## További olvasnivaló {#further-reading}

- [Ethereum dappok skálázása mellékláncokkal](https://medium.com/loom-network/dappchains-scaling-ethereum-dapps-through-sidechains-f99e51fff447) _2018. február 8. – Georgios Konstantopoulos_

_Ismersz olyan közösségi anyagot, mely segített neked? Módosítsd az oldalt és add hozzá!_
