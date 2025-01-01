---
title: Kliensdiverzitás
description: Áttekintés az Ethereum-kliensdiverzitás fontosságáról.
lang: hu
sidebarDepth: 2
---

Az Ethereum-csomópont viselkedését az általa használt kliensszoftver irányítja. Számos Ethereum-kliens létezik, melyeket különböző csapatok különféle nyelveken fejlesztettek és tartanak karban. A klienseket egy közös specifikáció alapján építik, hogy fennakadás nélkül tudjanak egymással kommunikálni, ugyanolyan funkcionalitással bírjanak és azonos felhasználói élményt adjanak. Ugyanakkor jelenleg a kliensek nem oszlanak el a csomópontokon elég egyenlően ahhoz, hogy a hálózat megerősítésének teljes potenciálját ki lehetne használni. Ideális esetben a felhasználók nagyjából azonosan oszlanának meg a különféle kliensek között, hogy a hálózatnak a lehető legdiverzebb legyen a klienshasználata.

## Előfeltételek {#prerequisites}

Ha Önnek még újdonság ez a téma, akkor tekintse meg a [Csomópontok és kliensek](/developers/docs/nodes-and-clients/) című áttekintést. A [végrehajtási réteg](/glossary/#execution-layer) és a [konszenzusréteg](/glossary/#consensus-layer) definícióját megtalálja a glosszáriumban.

## Miért vannak különböző kliensek? {#why-multiple-clients}

A különböző, egymástól függetlenül fejlesztett és karbantartott kliensek azért jöttek létre, mert ez a diverzitás a hálózatot sokkal ellenállóbbá teszi a támadásokkal és a hibákkal szemben. A különféle kliensek az Ethereum egyedi erősségét jelentik, mivel más blokkláncok egyetlen kliens tévedhetetlenségén alapulnak. Ugyanakkor nem elég a különféle kliensek elérhetősége, azokat használnia is kell a közösségnek, és a teljes aktív csomópontok között relatíve egyenlően kellene eloszlaniuk.

## Miért olyan fontos a kliensdiverzitás? {#client-diversity-importance}

A decentralizált hálózat egészsége nagy mértékben függ a függetlenül fejlesztett és fenntartott kliensektől. Nézzük át ennek okait.

### Hibák {#bugs}

Egy kliensben előforduló hiba kisebb kockázatot jelent a hálózatnak, amikor az az Ethereum-csomópontok kisebb hányadát képviseli. Ha a csomópontok nagyjából egyenlően oszlanak meg a különféle kliensek között, akkor nagyon kicsi az esélye, hogy a legtöbb kliens ugyanattól a hibától szenved, így a hálózat sokkal szilárdabb lesz.

### Támadásokkal szembeni ellenállás {#resilience}

A kliensdiverzitás nagyobb ellenállást jelent a támadásokkal szemben. Például egy olyan támadás, ami [egy bizonyos klienst arra vesz rá](https://twitter.com/vdWijden/status/1437712249926393858), hogy a lánc egy elágazását kövesse, nem valószínű, hogy sikeres lesz, mert más klienseket nem tud ugyanúgy rászedni, így a kanonikus lánc érintetlen marad. Az alacsony kliensdiverzitás növeli a kockázatát egy olyan támadásnak, amely a domináns kliens ellen irányul. A kliensdiverzitás egyértelműen fontos védelem a rosszindulatú támadások esetén, ahogy azt a 2016-os shanghai példa mutatja, amikor a támadók a domináns klienst (Geth) rávették, hogy egy lassú i/o funkciót hajtson végre blokkonként tízezerszer. Mivel más kliensek is online voltak, amelyek nem voltak ugyanígy sebezhetőek, az Ethereum képes volt ellenállni a támadásnak, folytatta működését és kijavította a Geth-kliens sebezhetőségét.

### Proof-of-stake véglegesedés {#finality}

Egy olyan hiba a konszenzusos kliensben, amely az Ethereum-csomópontok több mint 33%-át érinti, meg tudja akadályozni azt, hogy a konszenzusréteg véglegesedjen, tehát a felhasználók nem tudhatják, hogy a tranzakcióik nem lesznek visszaforgatva vagy megváltoztatva valamikor. Ez rendkívül problémás helyzet az Ethereumra épült alkalmazások számára, főleg a decentralizált pénzügy (DeFi) területén.

<Emoji text="🚨" className="me-4" /> Még ennél is rosszabb, ha egy kétharmados többséggel bíró kliensben történik hiba, ami miatt a lánc <a href="https://www.symphonious.net/2021/09/23/what-happens-if-beacon-chain-consensus-fails/" target="_blank">hibásan szétválik és véglegesedik</a>, így a validátorok egy jó része egy valótlan láncon ragad. Ha ezek a validátorok újra a helyes lánchoz akarnának csatlakozni, akkor súlyos büntetéssel, vagy egy lassú és költséges visszavonási és újraaktviálási folyamattal néznének szembe. A súlyos büntetés mértéke arányos a kétharmados többség hibás csomópontjainak számával, melynek a letétjét (32 ETH) teljesen megsemmisítik.

Habár ezek nem valószínű szcenáriók, az Ethereum ökoszisztémája képes a kockázatot csökkenteni azzal, hogy az aktív csomópontokon keresztül egyenlően oszlanak el a kliensek. Ideális esetben a teljes csomópontok 33%-át nem dominálja egy adott konszenzusos kliens.

### Közös felelősség {#responsibility}

A többségi klienseknek emberi költsége is van. Túlzott terhet és felelősséget helyez egy kis fejlesztői csapatra. Minél kisebb a kliensdiverzitás, annál nagyobb a felelősség terhe a fejlesztőkön, hogy karbantartsák a domináns klienst. Ennek a felelősségnek a megosztása a különféle csapatok között egyaránt egészségesebb az Ethereum-csomóponthálózat és az emberi hálózat számára.

## Jelenlegi kliensdiverzitás {#current-client-diversity}

![Diagram a kliensdiverzitásról](./client-diversity.png) _A diagram adatai az [ethernodes.org](https://ethernodes.org) és a [clientdiversity.org](https://clientdiversity.org/)_ honlapokról

A két diagram a jelen írás időpontjában (2022. január) érvényes kliensmegoszlást mutatja a végrehajtási és konszenzusrétegre. A végrehajtási réteget túlságosan dominálja a [Geth](https://geth.ethereum.org/), amit távolról követ az [Open Ethereum](https://openethereum.github.io/), az [Erigon](https://github.com/ledgerwatch/erigon) és a [Nethermind](https://nethermind.io/), a többi kliens együtt nem teszi ki a hálózat 1%-át. A konszenzusréteg leggyakrabban használt kliense, a [Prysm](https://prysmaticlabs.com/#projects), nem annyira domináns, mint a Geth, de így is a hálózat több mint 60%-át lefedi. A [Lighthouse](https://lighthouse.sigmaprime.io/) és a [Teku](https://consensys.net/knowledge-base/ethereum-2/teku/) kb. 20% és 14%-ot tesznek ki, a többi klienst kevesen használják.

A végrehajtási réteg adatai az [Ethernodes](https://ethernodes.org) oldalról származnak (2022. január 23.). A konszenzusos kliensek adatait [Michael Sproul](https://github.com/sigp/blockprint) biztosította. A konszenzusos kliensek adatait nehezebb megszerezni, mert nem rendelkeznek összetéveszthetetlen nyomokkal, amelyekkel azonosítani lehet ezeket. Az adatot egy klasszifikációs algoritmus segítségével készítették, amely bizonyos esetekben összekeveri a kisebb részesedéssel bíró klienseket (bővebben [itt](https://twitter.com/sproulM_/status/1440512518242197516) olvashat erről). A diagram esetében ezeket a nem egyértelmű klasszifikációkat egy vagy/vagy címkével láthatja (pl. Nimbus/Teku). Mindazonáltal az egyértelmű, hogy a hálózat többségét a Prysm működteti. Az adat egy pillanatfelvétel egy adott mennyiségű blokkról (jelen esetben Beacon blokkok a 2048001-tól 2164916-ig tartó slotokban), és a Prysm dominanciája néha ennél magasabb is, meghaladva a 68%-ot. Annak ellenére, hogy ezek pillanatfelvételek, mégis megmutatják a kliensdiverzitás helyzetét.

Friss kliensdiverzitási adat elérhető már a konszenzusrétegre is a [clientdiversity.org](https://clientdiversity.org/) oldalon.

## Végrehajtási réteg {#execution-layer}

Mostanáig a kliensdiverzitás fókusza inkább a konszenzusrétegen volt. Ugyanakkor a [Geth](https://geth.ethereum.org) végrehajtási kliense jelenleg az összes csomópont 85%-át kiteszi. Ez az arány ugyanolyan problémás, mint a konszenzusos kliensek esetében. Például egy hiba a Geth-ben, amely a tranzakciók kezelését vagy a végrehajtási csomagok összeállítását érinti, oda vezethet, hogy a konszenzusos kliensek problémás vagy hibás tranzakciókat véglegesítenek. Ezért az Ethereum egészségesebb lenne egy egyenlőbb végrehajtásikliens-eloszlással, ideális esetben egy adott kliens nem fedné le a hálózat több mint 33%-át.

## Kisebbségi kliens használata {#use-minority-client}

A kliensdiverzitás eléréséhez nem elég, hogy az egyéni felhasználók kisebbségi klienseket válasszanak, ehhez szükség van arra, hogy a bányász/validátor csoportok és intézmények is, mint a nagyobb dappok és tőzsdék is átálljanak. Ugyanakkor az összes felhasználó kiveheti a részét, hogy ezt az egyenlőtlenséget orvosolja, és az összes elérhető Ethereum-szoftver használva legyen. Az egyesítés (Merge) után minden csomópont-üzemeltetőnek futtatnia kell egy végrehajtási és egy konszenzusos klienst. Az alább javasolt klienskombinációkkal növelni lehet a diverzitást.

### Végrehajtásos kliensek {#execution-clients}

[Besu](https://www.hyperledger.org/use/besu)

[Nethermind](https://downloads.nethermind.io/)

[Erigon](https://github.com/ledgerwatch/erigon)

[Go-Ethereum](https://geth.ethereum.org/)

### Konszenzusos kliensek {#consensus-clients}

[Nimbus](https://nimbus.team/)

[Lighthouse](https://github.com/sigp/lighthouse)

[Teku](https://consensys.net/knowledge-base/ethereum-2/teku/)

[Lodestar](https://github.com/ChainSafe/lodestar)

[Prysm](https://docs.prylabs.network/docs/getting-started)

A technikailag képzett felhasználók segíthetik ezt a folyamatot azzal is, hogy több útmutatót és dokumentációt készítenek a kisebbségi kliensekről, és arra bátorítják a társaikat, hogy a domináns kliens helyett mást használjanak. A kisebbségi konszenzusos kliensre való áttérésről itt talál útmutatókat: [clientdiversity.org](https://clientdiversity.org/).

## Kliensdiverzitási irányítópultok {#client-diversity-dashboards}

Számos irányítópult vagy kimutatás ad képet az aktuális kliensdiverzitásról a végrehajtási és konszenzusréteget illetően.

**Konszenzusréteg:**

- [Rated.network](https://www.rated.network/)
- [clientdiversity.org](https://clientdiversity.org/) **Végrehajtási réteg:**

- [supermajority.info](https://supermajority.info//)
- [Ethernodes](https://ethernodes.org/)

## További olvasnivaló {#further-reading}

- [Kliensdiverzitás az Ethereum konszenzusrétegen](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA)
- [Ethereum Merge: A többségi kliens futtatása Önt is veszélyezteti!](https://dankradfeist.de/ethereum/2022/03/24/run-the-majority-client-at-your-own-peril.html) – _Dankrad Fiest, 2022. március 24._
- [A kliensdiverzitás fontossága](https://our.status.im/the-importance-of-client-diversity/)
- [Az Ethereumcsomópont-szolgáltatások listája](https://ethereumnodes.com/)
- [Az „öt miért” kérdés alkalmazása a kliensdiverzitási problémára](https://notes.ethereum.org/@afhGjrKfTKmksTOtqhB9RQ/BJGj7uh08)
- [Ethereum-diverzitás és hogyan lehetne elérni (YouTube)](https://www.youtube.com/watch?v=1hZgCaiqwfU)
- [clientdiversity.org](https://clientdiversity.org/)

## Kapcsolódó témák {#related-topics}

- [Ethereum-csomópont futtatása](/run-a-node/)
- [Csomópontok és kliensek](/developers/docs/nodes-and-clients/)
