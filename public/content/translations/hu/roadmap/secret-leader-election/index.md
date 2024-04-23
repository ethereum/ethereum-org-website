---
title: Titkos vezetőválasztás
description: Annak áttekintése, hogyan segíthet a titkos vezetőválasztás a validátorokat megvédeni a támadóktól
lang: hu
summaryPoints:
  - A blokkjavaslók IP-címe előre ismert, így sebezhetővé válnak a támadásokkal szemben
  - A titkos vezetőválasztás elrejti a validátorok személyazonosságát, így nem tudni előre, hogy kire esik a választás
  - Ezen elképzelés egyik további lépése az, hogy minden slotban legyen véletlenszerű a validátorválasztás.
---

# Titkos vezetőválasztás {#single-secret-leader-election}

A jelenlegi [proof-of-stake](/developers/docs/consensus-mechanisms/pos) alapú konszenzusmechanizmusban a következő blokkjavaslók nyilvánosak, és az IP-címüket hozzájuk lehet kapcsolni. Tehát a támadók be tudják azonosítani, hogy melyik validátor fogja a következő blokkot javasolni, megtámadhatják őt egy szolgáltatásmegtagadásos (denial-of-service/DOS) támadással, így nem tudják időben javasolni a blokkot.

Ez lehetőséget nyújt a támadó számára, hogy profitra tegyen szert. Például a blokkjavasló, akit a slot `n+1`-ra választottak, megtámadja a blokkjavaslót a slot `n`-ben, így az nem tud blokkot javasolni. Így a támadó két slotra vonatkozó MEV-et (maximálisan kinyerhető értéket) tud kivonni, vagy az összes tranzakciót egyben berakja egy blokkba, hogy az összes díjat megszerezze. Ez nagy valószínűséggel jobban érinti az otthoni validálókat, mint a szofisztikált, szervezeti validátorokat, akik fejlettebb módokon tudják védeni magukat, így ennek az egésznek centralizáló hatása van.

Számos megoldás létezik erre a problémára. Az egyik az [elosztottvalidátor-technológia](https://github.com/ethereum/distributed-validator-specs), ami elosztja a validátorhoz szükséges feladatokat több számítógépen, némi duplikációval (extra kapacitással), így a támadónak sokkal nehezebb megakadályozni a javaslatot egy adott slotban. A legrobusztusabb megoldás a **Single Secret Leader Election (SSLE)**, vagyis az egyetlen, titkos vezető kiválasztása.

## Egyetlen, titkos vezető kiválasztása {#secret-leader-election}

Az SSLE-ben okos kriptográfia biztosítja, hogy csak a kiválasztott validátor tudja, hogy őt választották. Minden validátor elköteleződik egy titok mellett, amelyet mind ismernek. Az elköteleződéseket összekeverik és újrakonfigurálják, hogy senki se tudja összekapcsolni azokat a validátorok elköteleződésével, de minden validátor tudja, hogy melyik tartozik őhozzá. Majd a rendszer véletlenszerűen választ egyet. Ha egy validátor azt észleli, hogy az ő elköteleződésére esett a választás, akkor tudja, hogy neki kell javasolnia a blokkot.

Ennek az elképzelésnek a vezető implementációja a [Whisk](https://ethresear.ch/t/whisk-a-practical-shuffle-based-ssle-protocol-for-ethereum/11763). Ami a következőképpen működik:

1. A validátorok elköteleződnek egy közös titok mellett. Az elköteleződési séma úgy van kialakítva, hogy bár köthető a validátor személyazonosságához, de egyúttal véletlenszerű is, így egy harmadik fél nem tudja visszafejteni az adott validátor személyazonosságát.
2. A korszak kezdetén a validátorok véletlenszerű csoportja kerül kiválasztásra, hogy mintát vegyenek a 16 384 validátorból a RANDAO használatával.
3. A következő 8182 slotra (1 nap), a blokkjavaslók összekeverik és véletlenszerűsítik az elköteleződések csoportját a saját privát entrópiájukat (véletlenszerűség) használva.
4. Ezután RANDAO készít egy sorba rendezett listát az elköteleződésekből. Ez a lista az Ethereum slotokhoz kapcsolódik.
5. A validátorok látják, hogy az elköteleződésük egy specifikus slothoz kapcsolódik, és annak bekövetkeztével javasolják a blokkot.
6. Ezeket a lépéseket ismétlik, hogy a hozzárendelés előrébb tartson, mint az aktuális slot.

Ekkor a támadók nem tudják előre, hogy amelyik validátor jön legközelebb, így nem tudják megtámadni DOS módszerrel.

## Egynél több titkos vezető kiválasztása (SnSLE) {#secret-non-single-leader-election}

Van egy másik javaslat is, amelynek lényege, hogy a validátorok mindegyikének véletlenszerű esélye legyen a blokkjavaslásra minden slotban, hasonlóan ahhoz, ahogy a proof-of-work működött, ennek a neve a**egynél több titkos vezető kiválasztása (SnSLE)**. Az adott napi protokollban lévő validátorok véletlenszerű kiválasztásához egyszerű módot kínál a RANDAO-funkció. Ennek lényege, hogy egy kellően véletlenszerű szám keletkezik, amelyet több független validátor adat kevert hashekből. Az SnSLE esetében ezeket a hasheket lehetne használni a következő blokkjavasló kiválasztására, például a legkevesebb értékű hasht választva. Az érvényes hashek tartománya behatárolható, hogy finomhangolják a valószínűségét egy adott validátor kiválasztásának minden slotban. Ha a hashnek kevesebbnek kell lennie, mint `2^256 * 5 / N` ahol `N` az aktív validátorok számát jelenti, akkor annak az esélye, hogy valamelyik egyéni validátort kiválasztják a slotban az `5/N`. Ebben a példában 99,3% az esélye, hogy legalább egy blokkjavasló valid hasht készített minden slotban.

## Jelenlegi helyzet {#current-progress}

Az SSLE és az SnSLE még kutatási fázisban van. Nincs véglegesített specifikáció egyik elképzelésre sem. Az SSLE és az SnSLE egymással versengő javaslatok, nem lehet mindkettőt bevezetni. A bevezetéshez több kutatásra és fejlesztésre, prototípus-készítésre és a nyilvános teszthálózatokon való telepítésre van szükség.

## További olvasnivaló {#further-reading}

- [SnSLE](https://ethresear.ch/t/secret-non-single-leader-election/11789)
