---
title: Csomópont-architektúra
description: Bevezetés az Ethereum-csomópontok szerveződésébe.
lang: hu
---

Egy Ethereum-csomópont két kliensből áll: egy [végrehajtási kliensből](/developers/docs/nodes-and-clients/#execution-clients) és egy [konszenzusos kliensből](/developers/docs/nodes-and-clients/#consensus-clients). Ahhoz, hogy egy csomópont új blokkot javasolhasson, egy [validátorklienst](#validators) is futtatnia kell.

Amikor az Ethereum a [proof-of-work (munkaigazolás)](/developers/docs/consensus-mechanisms/pow/) mechanizmusát használta, akkor a végrehajtási kliens elegendő volt egy teljes Ethereum-csomópont futtatásához. A [proof-of-stake](/developers/docs/consensus-mechanisms/pow/) mechanizmusának bevezetésétől a végrehajtási klienst egy másik szoftverrel együtt kell működtetni, amelyet [konszenzusos kliensnek](/developers/docs/nodes-and-clients/#consensus-clients) neveznek.

Ez az ábra a két Ethereum-kliens kapcsolatát mutatja. A két kliens a saját megfelelő peer-to-peer (P2P), azaz társak közötti hálózatához kapcsolódik. Külön P2P hálózatra van szükségük, mert a végrehajtási kliens a saját hálózatán terjeszti a „pletykát” a tranzakciókról, hogy azok a kliensek helyi tranzakciógyűjtőjébe kerülhessenek, miközben a konszenzusos kliens a saját hálózatán a blokkokról „pletykál”, mellyel konszenzust és láncnövekedést ér el.

![](node-architecture-text-background.png)

_A végrehajtási kliensre több lehetőség is van, köztük az Erigon, a Nethermind és a Besu_.

Ahhoz, hogy ez a két kliensből álló struktúra működni tudjon, a konszenzusos klienseknek tranzakciókötegeket kell átadni a végrehajtási kliensnek. A végrehajtási kliens a tranzakciókat lokálisan hajtja végre annak ellenőrzésére, nem sértenek-e semmilyen Ethereum-szabályt, illetve a javasolt Ethereum-státusz helyes-e. Amikor egy csomópont blokképítővé válik, akkor a konszenzusos kliensnek tranzakciókötegeket kell kérnie a végrehajtási klienstől, hogy azokat az új blokkba belefoglalja és végrehajtsa, hogy frissíteni tudja a globális státuszt. A konszentusos kliens egy helyi RPC-kapcsolaton keresztül vezérli a végrehajtási klienst a [motor API-t](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) használva.

## Mit csinál a végrehajtási kliens? {#execution-client}

A végrehajtási kliens feladata a tranzakciók validálása, kezelése és a tranzakciókról való pletykálás, továbbá a státusz kezelése és az Ethereum virtuális gép ([EVM](/developers/docs/evm/)) támogatása. **Nem** felel a blokképítésért, a blokkról való pletykálásért vagy a konszenzuslogika kezeléséért. Ezek a konszenzusos kliens feladatai.

A végrehajtási kliens végrehajtási csomagokat készít, melynek része a tranzakciók listája, a frissített státuszfa és más végrehajtással kapcsolatos adatok. A konszenzusos kliens a végrehajtási csomagot teszi bele a blokkba. A végrehajtási kliens azért is felel, hogy az új blokkok tranzakcióit újrafuttatva biztosítsa azok érvényességét. A tranzakciók újrafuttatása a végrehajtási kliens beépített számítógépén történik, melyet [Ethereum virtuális gépként (EVM)](/developers/docs/evm) ismerünk.

A végrehajtási kliens emellett egy felhasználói felületet is ajánl az Ethereumnak az [RPC-módszerek](/developers/docs/apis/json-rpc) révén, mellyel a felhasználók adatokhoz juthatnak az Ethereum-blokkláncról, tranzakciókat küldhetnek be és okosszerződéseket hozhatnak létre. Az RPC-kapcsolatot általában egy olyan könyvtár kezeli, mint a [Web3js](https://docs.web3js.org/), [Web3py](https://web3py.readthedocs.io/en/v5/), vagy egy olyan felhasználói felület, mint egy böngészőbővítménnyel rendelkező tárca.

Összefoglalva a végrehajtási kliens:

- az Ethereumhoz való hozzáférés a felhasználók számára
- az Ethereum virtuális gép, az Ethereum státusz és a tranzakciógyűjtő helye.

## Mit csinál a konszenzusos kliens? {#consensus-client}

A konszenzusos kliens azokat a logikákat kezeli, amellyel a csomópont szinkronban marad az Ethereum-hálózattal. Ebbe beletartozik az, hogy blokkokat kap a társaitól és futtatja az elágazási algoritmust, hogy biztosítsa, a csomópont mindig a láncot követi a tanúsítások lehető legnagyobb hányadát összegyűjtve (melyet a validátor aktuális egyenlege súlyoz). A végrehajtási klienshez hasonlóan a konszenzusos klienseknek is saját P2P hálózata van, melyen keresztül megosztják a blokkokat és a tanúsításokat.

A konszenzusos kliens nem vesz részt a tanúsításban vagy a blokkelőterjesztésben, mivel ezt a validátor teszi, ami egy opcionális, hozzáadott program a konszenzusos klienshez. A konszenzusos kliens validátor nélkül csak azzal foglalkozik, hogy fenntartsa a lánc elejét, vagyis legutóbbi állapotát, hogy a csomópont szinkronizálva maradjon. Ennélfogva a felhasználó képes az Ethereummal a végrehajtási kliensen keresztül kapcsolódni, és biztos lehet abban, hogy azt a megfelelő láncon teszi.

## Validátorok {#validators}

A letétbe helyezés és a validátorszoftver futtatása megengedi, hogy a csomópont új blokkot is javasolhasson. A csomópont működtetői hozzáadhatnak egy validátort a konszenzusos klienseikhez azzal, hogy 32 ETH-t letétbe helyeznek a letéti szerződésben. A validátorkliens a konszenzusos klienssel van összecsomagolva, és bármikor hozzá lehet adni egy csomóponthoz. A validátor kezeli a tanúsításokat és a blokkelőterjesztéseket. Lehetővé teszi, hogy a csomópont jutalmakat szerezzen vagy ETH-t veszítsen a büntetések és kizárások révén.

[Bővebben a letétbe helyezésről](/staking/).

## A csomópontösszehasonlítás elemei {#node-comparison}

| Végrehajtási kliens                                                 | Konszenzusos kliens                                                           | Validátor                                  |
| ------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------ |
| A tranzakciókról pletykál a saját P2P hálózatán                     | A blokkokról és tanúsításokról pletykál a saját P2P hálózatán                 | Blokkot javasol                            |
| Végrehajt vagy újra végrehajt tranzakciókat                         | Az elágazási algoritmust futtatja                                             | Jutalmakat/büntetéseket szerez             |
| Ellenőrzi a bejövő státuszváltozásokat                              | A lánc elejét, vagyis legfrissebb állapotát követi                            | Tanúsításokat végez                        |
| Kezeli a státuszhoz és a visszaigazolásokhoz tartozó fastruktúrákat | A Beacon-státuszt kezeli (ami konszenzusos és végrehajtási infókat tartalmaz) | 32 ETH letétbe helyezése szükséges hozzá   |
| Végrehajtási csomagokat készít                                      | A felhalmozott véletlenszerűséget trekkeli a RANDAO-ban                       | Súlyos és kizárással járó büntetést kaphat |
| JSON-RPC API-t ad az Ethereummal való kapcsolódáshoz                | Az ellenőrzést és véglegesedést trekkeli                                      |                                            |

## További olvasnivaló {#further-reading}

- [Proof-of-stake](/developers/docs/consensus-mechanisms/pos)
- [Blokkjavaslat](/developers/docs/consensus-mechanisms/pos/block-proposal)
- [A validátor jutalmai és büntetései](/developers/docs/consensus-mechanisms/pos/rewards-and-penalties)
