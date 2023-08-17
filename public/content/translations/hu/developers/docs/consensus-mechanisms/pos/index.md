---
title: Proof-of-stake (PoS)
description: Egy magyarázat a proof-of-stake konszenzus protokollról és az Ethereumban betöltött szerepéről.
lang: hu
incomplete: true
---

Az Ethereum átmegy a [proof-of-work-ről (PoW)](/developers/docs/consensus-mechanisms/pow/) egy másik konszenzus mechanizmusba, melyet proof-of-stake-nek hívunk. Mindig is ez volt a terv, mivel ez egy kulcs eleme a közösség stratégiájának az Ethereum skálázására vonatkozóan [az Eth2 fejlesztések](/roadmap/) által. Azonban a PoS megfelelő bevezetése egy nagy technikai kihívás és nem annyira egyértelmű, mint a PoW használata, hogy elérjük a konszenzust a teljes hálózaton.

## Előfeltételek {#prerequisites}

Hogy jobban megértsd az oldal anyagát, javasoljuk, hogy előbb olvasd el a [konszenzus mechanizmusok](/developers/docs/consensus-mechanisms/) cikket.

## Mi az a proof-of-stake (Pos)? {#what-is-pos}

A proof-of-stake a [konszenzus mechanizmusok](/developers/docs/consensus-mechanisms/) egy típusa, melyet arra használunk, hogy elérjük az megosztott konszenzust egy blokklánc hálózaton.

Az ETH letétbe helyezését igényli a felhasználók részéről, akik validátorrá válnak a hálózaton. A validátorok ugyanazért felelősek, mint a bányászok a [proof-of-work-ben](/developers/docs/consensus-mechanisms/pow/): tranzakciókat rendeznek és új blokkokat hoznak létre, így az összes csomópont egyetérthet a hálózat állapota felett.

A proof-of-stake rendszer számos javulást kínál a proof-of-work rendszerrel szemben:

- nagyobb energia hatékonyság – nem kell sok energiát blokkok bányászatára áldozni
- alacsonyabb belépési korlátok, csökkentett hardver követelmények – nem kell elit hardverrel rendelkezned, hogy esélyed legyen új blokkok létrehozására
- erősebb ellenálló képesség a centralizáltság ellen – a proof-of-stake több csomópont létrejöttéhez vezethet a hálózatban
- a shard láncok nagyobb fokú támogatása – egy fontos fejlesztés az Ethereum hálózat skálázásában

## Proof-of-stake, letétbe helyezés, és a validátorok {#pos-staking-validators}

Proof-of-stake a mögöttes mechanizmus, mely aktiválja a validátorokat, amint megfelelő mennyiségű tőke került letétbe. Az Ethereum felhasználóknak 32 ETH-et kell letenni, hogy validátorok lehessenek. A validátorok véletlenszerűen kerülnek kiválasztásra, hogy blokkokat hozzanak létre, továbbá felelősek azon blokkok ellenőrzéséért és megerősítéséért, melyeket nem ők hoznak létre. A felhasználó letéte oly módon kerül felhasználásra, hogy ösztönözze a jó viselkedést. Például egy felhasználó elveszítheti a letéte egy részét az olyan dolgokért, ha például offline állapotba (nem validál) kerül, vagy a teljes letétet szándékos összejátszásért.

## Hogyan működik az Ethereum proof-of-stake? {#how-does-pos-work}

Ellentétben a proof-of-work-kel, a validátoroknak nem kell jelentős mennyiségű számítási erőt felhasználniuk, mivel véletlenszerűen kerülnek kiválasztásra és nem kell versenyezniük. Nem kell blokkokat bányászniuk, csak blokkokat kell létrehozniuk, amikor kiválasztásra kerülnek, és validálni a javasolt blokkokat, amikor nem. Ezt a validálást tanúsításnak hívjuk. Gondolj a tanúsításra úgy, mintha azt mondanánk "ez a blokk nekem jónak tűnik". A validátorok jutalmat kapnak új blokkok felterjesztéséért és azon blokkok tanúsításáért, amiket láttak.

Ha tanúsítasz egy rosszindulatú blokkot, akkor elveszted a letéted.

### A Beacon Chain {#the-beacon-chain}

Amikor az Ethereum leváltja a proof-of-work-öt a proof-of-stake-kel, hozzáadott komplexitás fog életbe lépni a [shard láncok](/roadmap/danksharding/) által. Ezek különálló blokkláncok, melynek szükségük van validátorokra, hogy tranzakciókat dolgozzanak fel és új blokkokat hozzanak létre. A terv az, hogy 64 shard láncot fogunk létrehozni, melyeknek megosztottan egyet kell érteniük a hálózat állapotára vonatkozóan. Így további koordináció szükségeltetik, ezt pedig [a beacon chain](/roadmap/beacon-chain/) fogja biztosítani.

A Beacon Chain állapot információkat kap a shardoktól, melyet elérhetővé tesz a többi shard számára, hogy azok szinkronban tudjanak maradni. A Beacon Chain fogja kezelni a validátorokat is a letétbetételtől egészen a jutalmak és büntetések kiosztásáig.

Így működik ez a folyamat.

### Hogyan működik a validálás {#how-does-validation-work}

Amikor elindítasz egy tranzakciót egy shardon, egy validátornak lesz a felelősége, hogy a tranzakciót egy shard blokkba foglalja. A validátorokat algoritmikusan választja a ki a beacon chain új blokkok javaslatára.

#### Tanúsítás {#attestation}

Ha a validátort nem választják ki, hogy új shard blokkot javasoljon, akkor tanúsítania kell egy másik validátor által javasolt blokkot, és meg kell erősítenie, hogy minden úgy van, ahogy lennie kell. A tanúsítás az, ami feljegyzésre kerül a beacon chainen, nem pedig maga a tranzakció.

Legalább 128 validátorra van szükség minden egyes shard blokk tanúsítására – ezt úgy hívjuk, hogy "bizottság".

A bizottság számára rendelkezésre áll egy időkeret, melyben javasolnak és validálnak egy shard blokkot. Ezt úgy hívjuk, hogy "slot". Csak egy érvényes blokk jön létre egy slotban. 32 slot van egy "korszakban (epoch)". Minden egyes korszak után a bizottság feloszlik és újra alakul más, random résztvevőkkel. Ez megóvja a shardokat az ártalmas bizottságoktól.

#### Kereszt kapcsolatok (crosslinks) {#rewards-and-penalties}

Ha egy shard blokk javaslatnak elég tanúsítása van, egy "kereszt kapcsolat" jön létre, mely megerősíti a blokk befoglaltságát és a tranzakciódat a beacon chainen.

Amint létrejön a kereszt kapcsolat, a validátor aki a blokkot javasolta megkapja a jutalmát.

#### Véglegesség {#finality}

Az elosztott hálózatoknál egy tranzakciónak "véglegessége" van, amikor egy olyan blokkban van, ami nem tud megváltozni.

Hogy ez működjön a proof-of-stake-ben, Casper, egy véglegesítő protokoll ráveszi a validátorokat, hogy értsenek egyet egy adott blokk állapota felett bizonyos ellenőrzési pontokon. Amint a validátorok 2/3-a egyetért, a blokk véglegesítődik. A validátorok elvesztik a teljes letétüket, ha megpróbálják ezt visszaállítani egy 51%-os támadás keretében.

Ahogy Vlad Zamfir fogalmaz: ez olyan, mintha egy bányász részt venne egy 51%-os támadásban, ami miatt a bányászati hardvere azonnal megsemmisülne.

## Proof-of-stake és biztonság

Egy [51%-os támadás](https://www.investopedia.com/terms/1/51-attack.asp) veszélye még így is fennáll a proof-of-stake-ben, de még kockázatosabb a támadók számára. A támadáshoz irányítanod kell a letétbe helyezett ETH 51%-át. Ez nem csak hogy rengeteg pénz, de valószínűleg az ETH árfolyam esését váltaná ki. Nagyon kicsi ösztönző van arra, hogy elpusztítsd a valuta értékét, melyben többségi tulajdonrészed van. Vannak erősebb ösztönzők arra, hogy a hálózatot biztonságban és egészségben tartsuk.

Letét megvágások, kidobások és több más büntetés, melyet a beacon chain koordinál, fogja megakadályozni az ártalmas cselekedeteket. A validátorok felelőssége lesz ezen incidensek megjelölése is.

## Előnyök és hátrányok {#pros-and-cons}

| Előnyök                                                                                                                                                                                                                                                                                                                                                     | Hátrányok                                                                                                     |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| A staking egyszerűbbé teszi, hogy egy csomópontot működtess. Nem igényel nagy hardver vagy energia befektetést. És ha nincs elég ETH-ed, amit letétbe tudnál helyezni, akkor csatlakozhatsz letéti alapokhoz.                                                                                                                                               | A proof-of-stake még mindig korai fázisában van és kevésbé van kipróbálva összehasonlítva a proof-of-work-kel |
| A staking decentralizáltabb. Nagyobb részvételi arányt tesz lehetővé, és a nagyobb csomópont mennyiség nem jelent megnövekedett százalékos hozamot, mint a bányászatnál.                                                                                                                                                                                    |                                                                                                               |
| A staking lehetővé teszi a biztonságos shardingot. A shard láncok lehetővé teszik az Ethereum számára, hogy egyszerre több blokk jöjjön létre, mely megnöveli a tranzakciók mennyiségét. Ha egy proof-of-work rendszerbe szeretnénk shardingot bevezetni az azt jelentené, hogy lecsökkentjük a hálózat egy részének szétbomlasztásához szükséges energiát. |                                                                                                               |

## További olvasnivaló {#further-reading}

- [What is Proof of Stake](https://consensys.net/blog/blockchain-explained/what-is-proof-of-stake/) _ConsenSys_
- [The Beacon Chain Ethereum 2.0 explainer you need to read first](https://ethos.dev/beacon-chain/) _Ethos.dev_

## Kapcsolódó témák {#related-topics}

- [Proof-of-work](/developers/docs/consensus-mechanisms/pow/)
