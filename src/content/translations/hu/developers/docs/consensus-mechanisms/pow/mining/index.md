---
title: Bányászat
description: Egy magyarázat arról, hogyan működik a bányászat az Ethereumon és hogyan segíti az Ethereum biztonságát és decentralizáltságát.
lang: hu
incomplete: true
---

## Előfeltételek {#prerequisites}

Hogy jobban megértsd ezt az oldalt, javasoljuk, hogy előbb olvasd el a [tranzakciók](/developers/docs/transactions/), [blokkok](/developers/docs/blocks/) és a [proof-of-work](/developers/docs/consensus-mechanisms/pow/) oldalakat.

## Mi az az Ethereum bányászat? {#what-is-ethereum-mining}

A bányászat az a folyamat, melynek során új, tranzakciókból álló blokkok jönnek létre és adódnak hozzá az Ethereum blokklánchoz.

Az Ethereum, a Bitcoinhoz hasonlóan, a [proof-of-work (PoW)](/developers/docs/consensus-mechanisms/pow/) konszenzus algoritmust használja. A bányászat a proof-of-work lényege. Az Ethereum bányászok - szoftvert futtató számítógépek - az idejüket és számítási kapacitásukat fordítják tranzakciók feldolgozására és blokkok létrehozására.

## Miért léteznek a bányászok? {#why-do-miners-exist}

Az Ethereumhoz hasonló decentralizált rendszerek esetében biztosítanunk kell, hogy mindenki megegyezik a tranzakciók rendjében. A bányászok segítenek, hogy ez megtörténjen úgy, hogy számítás szempontjából nehéz rejtvényeket oldanak meg azért, hogy blokkokat hozhassanak létre, mely így a megvédi a hálózatot a támadásoktól.

[Többet a proof-of-work-ről](/developers/docs/consensus-mechanisms/pow/)

## Hogyan bányásszák ki az Ethereum tranzakciókat {#how-ethereum-transactions-are-mined}

1. A felhasználó létrehoz és aláír egy [tranzakció](/developers/docs/transactions/) kérvényt valamely [számla](/developers/docs/accounts/) privát kulcsával.
2. A felhasználó közvetíti a tranzakciós kérelmet a teljes hálózat számára valamilyen [csomópontról](/developers/docs/nodes-and-clients/).
3. Amint tudomást szereznek a tranzakció kérvényről, az Ethereum hálózat valamennyi csomópontja hozzáadja a kérvényt a lokális mempooljához, ami azokat a tranzakciós kérvényeket tartalmazza, amikről már tudomást szereztek, de még nem adták hozzá a blokklánchoz egy blokkban.
4. Egy bizonyos ponton egy bányász csomópont több tucat vagy több száz tranzakció kérvényt összesít egy potenciális [blokkba](/developers/docs/blocks/) úgy, hogy a begyűjtött [tranzakciós díj](/developers/docs/gas/) maximális legyen, de ne lépje túl a blokk gáz limitet. Ezután a bányász csomópont:
   1. Ellenőrzi az egyes tranzakciós kérelmek érvényességét (azaz senki nem próbál ethert átutalni olyan számláról, amelyhez nem készített aláírást, a kérés nem hibás, stb.), majd végrehajtja a kérés kódját, megváltoztatva az EVM helyi másolatának állapotát. A bányász jutalmul megkapja a tranzakciós díjat minden ilyen tranzakciós kérvényért a saját számlájára.
   2. Elindítja a proof-of-work “megbízhatósági bizonyítvány” előállításának folyamatát a potenciális blokkra, amint az összes tranzakciós kérelmet érvényesítette és végrehajtotta a helyi EVM másolaton.
5. Végül egy bányász befejezi a bizonyítvány elkészítését egy blokkra, mely tartalmazza a mi specifikus tranzakciós kérelmünket. A bányász ezután közvetíti a kész blokkot, mely tartalmazza a bizonyítványt és egy checksumot az új, kiállított EVM állapotról.
6. A többi csomópont is tudomást szerez a blokkról. Érvényesítik a bizonyítványt, saját maguk is végrehajtják a blokk összes tranzakcióját (beleértve azt is amit eredetileg a felhasználónk közvetített), és megbizonyosodnak arról, hogy az új tranzakciók végrehajtása utáni EVM állapotuk checksumja megegyezik a bányász által kiállított blokk állapotának checksumjával. Csak ezután fűzik hozzá ezek a csomópontok ezt a blokkok a blokkláncuk végére és fogadják el az új EVM állapotot, mint kanonikus új állapot.
7. Minden csomópont eltávolítja az új blokkban lévő összes tranzakciót a teljesítetlen tranzakciós kérvényeket tartalmazó helyi mempooljából.
8. A hálózatba újonnan becsatlakozó csomópontok letöltik az összes blokkot a sorrendet betartva beleértve azt a blokkot is, mely a szóban forgó tranzakciónkat tartalmazza. Inicializálnak egy helyi EVM másolatot (mely egy üres állapotú EVM-ként indul), ezután végig mennek az összes blokkban található összes tranzakció végrehajtásának folyamatán a helyi EVM másolatukon miközben érvényesítik a blokkok állapot checksumjait.

Minden tranzakciót egyszer bányásznak ki (blokkba foglalják és első alkalommal közvetítik), de minden résztvevő végrehajtja és érvényesíti őket a kanonikus EVM állapot előre vitelének folyamatában. Ez kiemeli a blokklánc egyik központi mantráját: **Ne bízz meg benne, hanem ellenőrizd.**.

## Egy vizuális bemutató {#a-visual-demo}

Nézd meg ahogy Austin végig kísér a bányászaton és a proof-of-work blokkláncon.

<YouTube id="zcX7OJ-L8XQ" />

## További olvasnivaló {#further-reading}

## Kapcsolódó eszközök {#related-tools}

- [Legnagyobb Ethereum bányászok](https://etherscan.io/stat/miner?range=7&blocktype=blocks)
- [Ethereum bányászat kalkulátor](https://minerstat.com/coin/ETH)

## Kapcsolódó témák {#related-topics}

- [Gáz](/developers/docs/gas/)
- [EVM](/developers/docs/evm/)
- [Proof-of-work](/developers/docs/consensus-mechanisms/pow/)
