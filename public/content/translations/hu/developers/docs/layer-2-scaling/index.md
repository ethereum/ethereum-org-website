---
title: 2. rétegű skálázás
description: Bevezetés a különböző skálázási lehetőségekbe, melyet jelenleg az Ethereum közösség fejleszt.
lang: hu
incomplete: true
sidebarDepth: 3
isOutdated: true
---

A 2. réteg (layer 2) egy gyűjtőnév az olyan megoldásoknak, melyeket arra terveztek, hogy skálázzák az alkalmazásodat úgy, hogy a tranzakciókat az Ethereum láncon (1. réteg) kívül kezelik. A tranzakciós sebesség szenved, amikor a hálózaton nagy a forgalom, mely rontja a felhasználói élményt bizonyos dapp típusoknál. Ahogy nő a hálózat forgalma, úgy nőnek a gáz árak, mivel a tranzakció küldők próbálják egymást túllicitálni. Ez nagyon drágává teszi az Ethereum használatát.

## Előfeltételek {#prerequisites}

Jó alapokkal kell rendelkezned az összes alapvető témakörről. A 2. rétegű megoldások bevezetése elég haladó szint, mivel a technológia kevésbé kiforrott.

## Miért szükséges a 2. réteg? {#why-is-layer-2-needed}

- Némely felhasználási esetnek, például a blokklánc játékoknak, nincs értelme a jelenlegi tranzakciós időkkel
- Szükségtelenül drága a blokklánc alkalmazások használata
- A skálázhatóságra történő frissítés nem mehet a decentralizáció rovására - a 2. réteg az Ethereumra épít.

## 2. réteg megoldások típusai {#types}

- [Összegzők](#rollups)
  - [ZK összegzők](#zk-rollups)
  - [Optimista összegzők](#optimistic-rollups)
- [Állapot csatornák](#channels)
- [Plasma](#plasma)
- [Validium](#validium)
- [Mellékláncok](#sidechains)
- [Hibrid megoldások](#hybrid-solutions)

A legtöbb 2. rétegű megoldás egy szerver vagy egy szerver cluster körül helyezkedik el, amelyek mindegyikét csomópontnak, validátornak, operátornak, szekvenszernek, blokkgyártónak vagy hasonlónak nevezhetjük. A megvalósítástól függően ezeket a 2. réteg csomópontokat az azokat használó vállalkozások vagy szervezetek, egy harmadik fél, vagy egyének nagy csoportja (hasonlóan a főhálózathoz) futtathatja. Általánosságban beszélve a tranzakciókat ezek a 2. réteg csomópontok kapják, ahelyett, hogy közvetlenül az első rétegre küldenénk őket ([főhálózat](/glossary/#mainnet)); a 2. rétegű instance ezután csoportokba rendezi őket, mielőtt fel kerülnek az 1. rétegre, ezután az 1. réteg szolgáltatja a biztonságot és nem lehet őket többé megváltoztatni. Ennek részletei jelentősen eltérnek a 2. réteg különböző technológiáitól és megvalósításaitól.

Egy adott 2. réteg instance esetében lehet nyitott és megosztott több alkalmazás között, vagy egy adott cég által üzemeltetve és csak a saját alkalmazásukat támogatva.

## Összegzők {#rollups}

Az összegzők (rollups) olyan megoldások, melyek melléklánc tranzakciókat kötnek össze vagy "tekernek fel (roll up)" egy tranzakcióba majd egy kriptográfiai bizonyítékot generálnak, melyet SNARK-nak nevezünk (succinct non-interactive argument of knowledge). Csak ez a bizonyíték kerül fel a fő láncra.

_A mellékláncok Ethereum kompatibilis, független blokkláncok._

Máshogy megfogalmazva az összegzés azt jelenti, hogy az összes állapot változás és végrehajtás mellékláncokon történik - szignatúra hitelestés, szerződés végrehajtás stb. A fő Ethereum lánc (1. réteg) csak tranzakciós adatot tárol.

Az összegzős megoldások váltók (relayers) használatát igénylik, melyek egy kötvényt helyeztek el a szerződésben. Ez ösztönzi őket, hogy pontosan váltsák az összegzéseket.

**Hasznos:**

- felhasználó díjak csökkentésére
- nyitott részvételre
- gyors tranzakció átvitelre

Kétfajta összegző van különböző biztonsági modellel:

- Zero knowledge: a számítások off-chain történnek és egy [**érvényességi bizonyítékot**](/glossary/#validity-proof) küld fel a láncra
- Optimista: azt feltételezi, hogy a tranzakciók alapvetően érvényesek és csak egy [**csalási bizonyítékon **](/glossary/#fraud-proof) keresztül végez számításokat egy felelősségre vonás alkalmával

### Zero-knowledge összegzők {#zk-rollups}

A zero-knowledge összegzők, másnéven ZK-összegzők, több száz átutalást kötnek össze a láncon kívül egy tranzakcióban egy okosszerződésen keresztül. A beküldött adattal az okosszerződés hitelesíti az összes átutalást, mely benne volt. Ezt úgy hívjuk, hogy érvényességi bizonyíték.

A ZK-összegző segítségével a blokkok validálása gyorsabb és olcsóbb, mivel kevesebb adatot tartalmaz. Nincs szükséged az összes tranzakciós adatra, hogy hitelesítsd a tranzakciókat csak a bizonyítékra.

A melléklánc, ahol a ZK-összegzés történik, optimálható a tranzakció méret további csökkentésére. Például egy számlát egy index, nem pedig egy cím reprezentál, ami 32 bájtról 4 bájtra csökkenti a tranzakciót. A tranzakciókat calldataként írjuk az Ethereumra, amivel gázt takarítunk meg.

#### Előnyök és hátrányok {#zk-pros-and-cons}

| Előnyök                                                                                                       | Hátrányok                                                                                                                                                                                                                                      |
| ------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Nincs késés, mivel a bizonyítékokat már érvényesnek tekintjük, amikor a fő láncra kerülnek.                   | Csak átutalásokra van lekorlátozva, nem kompatibilis az EVM-mel.                                                                                                                                                                               |
| Kevésbé sérülékeny a gazdasági támadásokkal szemben, mint az [Optimista összegző](#optimistic-pros-and-cons). | Az érvényességi bizonyítékokat nehéz kiszámítani - nem érdemes kis on-chain aktivitású alkalmazásoknál használni.                                                                                                                              |
|                                                                                                               | Lassabb szubjektív [véglegességi](/glossary/#finality) idő (10-30 perc egy ZK bizonyíték generálása) (de gyorsabb a teljes véglegesség, mivel nincsen felelősségre vonási késés, mint az [Optimista összegzők](#optimistic-rollups) esetében). |

#### ZK-összegzők használata {#use-zk-rollups}

- [Loopring](https://loopring.org/#/)
- [Starkware](https://starkware.co/)
- [Matter Labs ZKsync](https://matter-labs.io/)
- [Aztec 2.0](https://aztec.network/)

### Optimista összegzők {#optimistic-rollups}

Az optimista összegzők egy mellékláncot használnak, mely a fő Ethereum lánccal párhuzamosan működik. Növelhetik a skálázhatóságot, mivel alapvetően nem végeznek számításokat. Ehelyett egy tranzakció után egy új állapotot javasolnak a főhálózatnak. Vagyis "jegyzik" a tranzakciót.

Az optimista összegzőknél a tranzakciók calldataként vannak a fő Ethereum láncba írva, ezzel tovább optimálva a gáz költség csökkentést.

Mivel a számítás az Ethereum használatának lassú és drága része, az optimista összegzők a tranzakciótól függően akár 10–100-szoros javulást is kínálnak a méretezhetőségben. Ez a szám tovább fog nőni a következő Eth2 fejlesztés bevezetésével: [shard láncok](/roadmap/danksharding). Ennek az az oka, hogy több adat áll majd rendelkezésre felelősségre vonási esemény során.

#### Tranzakciók megkérdőjelezése {#disputing-transactions}

Az optimista összegzők valójában nem számítják ki a tranzakciót, így szükség van valamilyen mechanizmusra, mely biztosítja, hogy a tranzakciók jogosak és nem hamisak. Itt jön a képbe a csalási bizonyíték. Ha valaki egy hamis tranzakciót észlel, akkor az összegző végrehajt egy csalási biztosítékot és elvégzi a tranzakció kiszámítását a rendelkezésre álló állapot adatok felhasználásával. Ez azt jelenti, hogy hosszabb ideig kell várnod a tranzakciók megerősítésére, mint egy ZK-összegző esetében, mert ez megtámadható.

![Egy diagram, mely megmutatja mi történik, ha egy hamis tranzakció előfordul egy optimista összegzőn az Ethereumban](./optimistic-rollups.png)

A csalás igazolásának kiszámításához szükséges gáz még meg is térül. Ben Jones, az Optimism tagja ismerteti a meglévő kötvényi rendszert:

"_bárkinek, aki képes olyan intézkedésre, amelyet hamisnak kellene bizonyítanod, hogy megvédd a pénzedet, egy kötvényt kell elhelyeznie. Lényegében van valamennyi ETH-ed, amit lekötsz és azt mondod, hogy "Igérem, hogy az igazat mondom"... Ha nem az igazat állítod és a csalás beigazolódik, akkor ez a pénz elveszik. Nem csak hogy elveszik ez a pénz, de egy része még a gázért is fizetni fog, melyet az emberek a csalási bizonyítékra költöttek_"

Tehát a csalás bizonyítása megtérül.

#### Előnyök és hátrányok {#optimistic-pros-and-cons}

| Előnyök                                                                                                                    | Hátrányok                                                                                                                          |
| -------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Bármi, amit az Ethereum 1. rétegen csinálhatsz, megcsinálhatod optimista összegzőkkel, mivel EVM és Solidity kompatibilis. | Hosszú várakozási idő az on-chain tranzakcióknál a potenciális csalási bizonyítások miatt.                                         |
| Az összes tranzakciós adat az 1. rétegű láncon tárolódik, ami azt jelenti, hogy biztonságos és decentralizált.             | Potenciálisan sérülékeny a támadásokkal szemben, ha az érték egy optimista összegzőben meghaladja az operátor kötvényének értékét. |

#### Optimista összegzők használata {#use-optimistic-rollups}

- [Optimism](https://optimism.io/)
- [Offchain Labs Arbitrum Rollup](https://offchainlabs.com/)
- [Fuel Network](https://fuel.sh/)

## Csatornák {#channels}

A csatornák lehetővé teszik a résztvevőknek, hogy `x` alkalommal indítsanak tranzakciókat off-chain, mialatt csak két tranzakciót indítanak a hálózaton on-chain. Ez extrém magas tranzakció átvitelt tesz lehetővé

**Hasznos:**:

- sok állapot frissítésre
- amikor a résztvevők száma előzetesen ismert
- amikor a résztvevők bármikor elérhetőek

A résztvevőknek le kell kötniük az Ethereum állapotának egy részét, mint egy ETH letét, egy többszignatúrás szerződésbe. A többszignatúrás szerződés egy olyan szerződés, mely több privát kulcs szignatúráját (így a beleegyezését) igényli a lefutáshoz.

Az állapot lekötésének ezen módja jelenti az első tranzakciót és a csatorna megnyitását. A részvevők gyorsan és ingyen tudnak off-chain tranzakciókat indítani. Amikor véget ér az interakció, egy végső on-chain tranzakciót kell küldeni, mely feloldja az állapotot.

### Állapot csatornák {#state-channels}

Állapot csatorna amőba:

1. Készítsd el a "Bíró" többszignatúrás okosszerződést az Ethereum főláncon, mely érti az amőba szabályait és be tudja azonosítani Alízt és Bobot a játék két résztvevőjeként. Ez a szerződés tárolja az 1 ETH díjat.

2. Ezután Alíz és Bob elkezdik a játékot az állapot csatorna megnyitásával. Minden egyes lépés egy off-chain tranzakciót generál, mely egy "nonce-t" tartalmaz, mely annyit jelent, hogy később bármikor megtudjuk mondani a lépések sorrendjét.

3. Ha megvan a győztes, akkor bezárják a csatornát a végső állapot (vagyis a tranzakciós lista) elküldésével a Bíró szerződés számára egyszeri tranzakciós díjat fizetve. A Bíró megbizonyosodik arról, hogy ez a "végső állapotot" mindkét fél aláírta, és egy ideig vár, hogy valaki kérdőre vonja-e az eredményt, ezután kifizeti az 1 ETH díjat Alíznak.

Jelenleg kétfajta csatorna létezik:

- Állapot csatornák - ahogy fentebb részleteztük
- Fizetési csatornák - Egyszerűsített állapot csatornák, mely csak fizetésekkel operál. Off-chain tranzakciókat tesz lehetővé két fél között addig, amíg a nettó összege az átutalásaiknak meg nem haladja a letétbe helyezett tokenek mennyiségét.

#### Előnyök és hátrányok {#channels-pros-and-cons}

| Előnyök                                                                                                 | Hátrányok                                                                                                                                       |
| ------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Azonnali kiutalás/elszámolás a főhálózaton (ha a csatorna mindkét részvevője együtt működik)            | A csatorna felállításának és rendezésének ideje és költsége - ez nem olyan jó az önálló felhasználók közötti alkalmi egyszeri tranzakciókhoz.   |
| Extrém magas átvitel is lehetséges                                                                      | Rendszeresen figyelni kell a hálózatot (életképességi követelmény), vagy át kell ruházni ezt a felelősséget másra az pénz biztonsága érdekében. |
| Legalacsonyabb egy tranzakcióra eső költség - jól használható mikrofizetéses streaming szolgáltatásokra | Le kell kötni a pénzt nyílt fizetési csatornákon                                                                                                |
|                                                                                                         | Nem támogatja a nyílt részvételt                                                                                                                |

#### Állapot csatornák használata {#use-state-channels}

- [Connext](https://connext.network/)
- [Raiden](https://raiden.network/)
- [Perun](https://perun.network/)
- [Statechannels.org](https://statechannels.org/)

## Plasma {#plasma}

A plasma lánc olyan különálló blokklánc, mely hozzá van kötve a fő Ethereum lánchoz, és csalási bizonyítékokat használ (mint az [optimista összegzők](#optimistic-rollups)), hogy eldöntse a vitákat.

| Előnyök                                                                                                                                       | Hátrányok                                                                                                                                                                                                         |
| --------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Nagy átvitel és alacsony költség tranzakciónként.                                                                                             | Nem támogatja az általános számítást. Csak alapvető token átutalások, váltások és egy pár más tranzakció típus támogatott az elsőrendű logika által.                                                              |
| Jól használható tetszőleges felhasználók közötti tranzakciókra (felhasználói páronként nincs költség, ha mindkettő létrejött a plasma láncon) | Rendszeresen figyelni kell a hálózatot (életképességi követelmény), vagy át kell ruházni ezt a felelősséget másra az pénz biztonsága érdekében.                                                                   |
|                                                                                                                                               | Egy vagy több szolgáltatóra támaszkodik az adattároláshoz és a lekérdezéshez.                                                                                                                                     |
|                                                                                                                                               | A kiutalások több napig is tarthatnak, hogy lehetővé tegyék a felelősségre vonást. A helyettesíthető eszközök esetében ezt a likviditásszolgáltatók csökkenthetik, de ez egy ehhez kapcsolódó tőkeköltséggel jár. |

### Plasma használata {#use-plasma}

- [OMG Network](https://omg.network/)
- [Matic Network](https://matic.network/)
- [Gluon](https://gluon.network/)
- [LeapDAO](https://ipfs.leapdao.org/)

## Validium {#validium}

Érvényességi bizonyítékokat használ, mint a [ZK-összegzők](#zk-rollups), de az adatokat nem az 1. rétegű Ethereum lánc tartalmazza. Ez akár 10k tranzakciót is jelenthet másodpercenként egy validium láncon és több lánc is futhat párhuzamosan.

| Előnyök                                                                                                                                             | Hátrányok                                                                                                                                             |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Nincs kiutalási késés (nincs on-chain/cross-chain tx késés); nagyobb tőkehatékonyságot eredményez.                                                  | Korlátozottan támogatja az általános számítást/okosszerződéseket; speciális nyelveket igényel.                                                        |
| Nem sérülékeny bizonyos gazdasági támadásokkal szemben, melyekkel a csalási bizonyíték alapú rendszerek szembesülnek a nagy értékű alkalmazásoknál. | Nagy számítási kapacitást igényel a ZK bizonyítékok generálása; nem költséghatékony az alacsony átvitelű alkalmazásoknál.                             |
|                                                                                                                                                     | Lassabb szubjektív véglegességi idő (10-30 perc egy ZK bizonyíték generálása)(de gyorsabb a teljes véglegesség, mivel nincs felelősségre vonási idő). |

### Validium használata {#use-validium}

- [Starkware](https://starkware.co/)
- [Matter Labs zkPorter](https://matter-labs.io/)
- [Loopring](https://loopring.org/#/)

## Mellékláncok {#sidechains}

A melléklánc egy különálló blokklánc, mely párhuzamosan fut a főhálózattal és tőle függetlenül működik. Saját konszenzus algoritmusa van ([Proof-of-Authority](https://wikipedia.org/wiki/Proof_of_authority), [delegált proof-of-stake](https://en.bitcoinwiki.org/wiki/DPoS), [bizánci hibatűrés](https://decrypt.co/resources/byzantine-fault-tolerance-what-is-it-explained), stb). Egy kétirányú összekötővel van a fő lánchoz kapcsolva.

| Előnyök                                                | Hátrányok                                                                                                            |
| ------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| Megalapozott technológia.                              | Kevésbé decentralizált.                                                                                              |
| Támogatja az általános számítást, EVM kompatibilitást. | Másfajta konszenzus mechanizmust használ. Nem az 1. réteg tartja biztonságban (tehát technikailag nem egy 2. réteg). |
|                                                        | A melléklánc validátorok határozatképessége csalást idézhet elő.                                                     |

### Mellékláncok használata {#use-sidechains}

- [Skale](https://skale.network/)
- [POA Network](https://www.poa.network/)

## Hibrid megoldások {#hybrid-solutions}

Kombinálja a többrétegű technológiák legjobb tulajdonságait, és konfigurálható kompromisszumokat kínálhat.

### Hibrid megoldások használata {#use-hybrid-solutions}

- [Celer](https://www.celer.network/)

## További olvasnivaló {#further-reading}

- [Validium And The Layer 2 Two-By-Two — Issue No. 99](https://www.buildblockchain.tech/newsletter/issues/no-99-validium-and-the-layer-2-two-by-two)
- [Evaluating Ethereum layer 2 Scaling Solutions: A Comparison Framework](https://blog.matter-labs.io/evaluating-ethereum-l2-scaling-solutions-a-comparison-framework-b6b2f410f955)
- [Adding Hybrid PoS-Rollup Sidechain to Celer’s Coherent Layer-2 Platform on Ethereum](https://medium.com/celer-network/adding-hybrid-pos-rollup-sidechain-to-celers-coherent-layer-2-platform-d1d3067fe593)
- [Zero-Knowledge Blockchain Scalability](https://ethworks.io/assets/download/zero-knowledge-blockchain-scaling-ethworks.pdf)

**Állapot csatornák**

- [Making Sense of Ethereum’s Layer 2 Scaling Solutions: State Channels, Plasma, and Truebit](https://medium.com/l4-media/making-sense-of-ethereums-layer-2-scaling-solutions-state-channels-plasma-and-truebit-22cb40dcc2f4) _– Josh Stark, Feb 12 2018_
- [State Channels - an explanation](https://www.jeffcoleman.ca/state-channels/) _Nov 6, 2015 - Jeff Coleman_
- [Basics of State Channels](https://education.district0x.io/general-topics/understanding-ethereum/basics-state-channels/) _District0x_

**Fizetési csatornák**

**ZK-összegzők**

**Optimista összegzők**

- [OVM Deep Dive](https://medium.com/ethereum-optimism/ovm-deep-dive-a300d1085f52)

**Mellékláncok**

- [Scaling Ethereum Dapps through Sidechains](https://medium.com/loom-network/dappchains-scaling-ethereum-dapps-through-sidechains-f99e51fff447) _Feb 8, 2018 - Georgios Konstantopoulos_
