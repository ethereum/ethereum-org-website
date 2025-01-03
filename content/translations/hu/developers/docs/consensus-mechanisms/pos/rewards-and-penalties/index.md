---
title: Proof-of-stake jutalmak és büntetések
description: Ismerje meg a protokollon belüli ösztönzőket a proof-of-stake Ethereumban.
lang: hu
---

Az Ethereumot a natív kriptovaluta, az ether (ETH) biztosítja. Azok a csomópont-üzemeltetők, akik részt kívánnak venni a blokkok validálásában és a lánc fejének azonosításában, ethert helyeznek el az Ethereumon egy [letéti szerződésben](/staking/deposit-contract/). Ezután etherben fizetnek nekik a validátorszoftver futtatásáért, amely ellenőrzi a peer-to-peer hálózaton keresztül érkező új blokkok érvényességét, és a lánc fejének azonosítására az elágazásválasztó-algoritmust alkalmazza.

A validátornak két fő szerepe van: 1) az új blokkok ellenőrzése és „tanúsítása”, hogy érvényesek-e, 2) új blokk előterjesztése, amikor véletlenszerűen kiválasztják a validátorállományból. Ha a validátor nem végzi el e feladatok egyikét sem, amikor erre felkérik, akkor lemarad az ether kifizetéséről. A validátorokat felkérhetik az aláírások összesítésére és a szinkronizáló bizottságokban való részvételre is.

Vannak olyan műveletek, amelyeket nehéz lenne véletlenül elvégezni, ezért valamilyen rosszindulatú szándékot jeleznek, például több blokkot javasolni vagy tanúsítani ugyanarra a slotra. Ezek súlyos büntetést vonnak maguk után, amelyek azt eredményezik, hogy a validátor egyenlegéből bizonyos mennyiségű ethert (legfeljebb 1 ETH-t) elégetnek, mielőtt eltávolításra kerül a hálózatból, ami 36 napot vesz igénybe. A súlyos büntetést kapott validátor ether egyenlege lassan fogy a kilépési időszak alatt, de a 18. napon „korrelációs büntetést” kap, amely nagyobb, ha több validátor egy időben kerül kizárásra. A konszenzusmechanizmus ösztönző struktúrája tehát a helyes viselkedésért jutalmat fizet, a rossz szereplőket pedig bünteti.

Minden jutalom és büntetés korszakonként egyszer kerül alkalmazásra.

Tekintse meg a további részleteket...

## Jutalmak és büntetések {#rewards}

### Jutalmak {#rewards}

A validátorok jutalomban részesülnek, ha a többi validátorral összhangban adnak szavazatokat, ha blokkokat javasolnak, és ha részt vesznek a szinkronizáló bizottságokban. A jutalmak értékét minden egyes korszakban egy `base_reward` (alapjutalom) alapján számítják ki. Ez az alapegység, amelyből a többi jutalmat számolják. A `base_reward` az egy validátor által optimális körülmények között kapott átlagos jutalom korszakonként. Ezt a validátor tényleges egyenlegéből és az aktív validátorok teljes számából számítják ki:

```
base_reward = effective_balance * (base_reward_factor / (base_rewards_per_epoch * sqrt(sum(active_balance))))
```

ahol `base_reward_factor` 64, `base_rewards_per_epoch` 4 és `sum(active balance)` az összes aktív validátor letétbe helyezett ether egyenlege.

Ez azt jelenti, hogy az alapjutalom arányos a validátor tényleges egyenlegével és fordítottan arányos a hálózaton lévő validátorok számával. Minél több validátor van, annál nagyobb a teljes kibocsátás (mint `sqrt(N)`, de annál kisebb az egy validátorra jutó `base_reward` alapjutalom (mint `1/sqrt(N)`). Ezek a tényezők befolyásolják a letétbe helyező csomópontra vonatkozó APR-t (éves ráta). Tekintse meg ennek indoklását [Vitalik jegyzeteiben](https://notes.ethereum.org/@vbuterin/rkhCgQteN?type=view#Base-rewards).

A teljes jutalmat ezután öt összetevő összegeként számítják ki, amelyek mindegyike súlyozással rendelkezik, amely meghatározza, hogy az egyes összetevők mennyivel járulnak hozzá a teljes jutalomhoz. Az összetevők a következők:

```
1. source vote: the validator has made a timely vote for the correct source checkpoint
2. target vote: the validator has made a timely vote for the correct target checkpoint
3. head vote: the validator has made a timely vote for the correct head block
4. sync committee reward: the validator has participated in a sync committee
5. proposer reward: the validator has proposed a block in the correct slot
```

Az összetevők súlyozása a következő:

```
TIMELY_SOURCE_WEIGHT    uint64(14)
TIMELY_TARGET_WEIGHT    uint64(26)
TIMELY_HEAD_WEIGHT  uint64(14)
SYNC_REWARD_WEIGHT  uint64(2)
PROPOSER_WEIGHT uint64(8)
```

A súlyok összege 64. A jutalom kiszámítása az alkalmazandó súlyok összege osztva 64-gyel. Az a validátor, aki időben leadta a forrás-, cél- és fejszavazatokat, blokkot javasolt és részt vett a szinkronizáló bizottságban az a következőt kaphatja: `64/64 * base_reward == base_reward`. Egy validátor azonban általában nem szokott blokkot javasolni, így a maximális jutalma: `64-8 /64 * base_reward == 7/8 * base_reward`. Azok a validátorok, akik nem blokkelőterjesztők és nem is tagjai szinkronizáló bizottságnak, a következőképpen kaphatnak: ` 64-8-2 / 64 * base_reward == 6,75/8 * base_reward`.

A gyors tanúsítások ösztönzésére további jutalom jár. Ez az `inclusion_delay_reward`. Ennek értéke megegyezik a `base_reward` és `1/delay` szorzatával, ahol a `delay` a blokkjavaslat és a tanúsítás között eltelt slotok száma. Például, ha a tanúsítás a blokkjavaslat slotján belül kerül benyújtásra, a tanúsító `base_reward * 1/1 == base_reward` jutalmat kap. Ha a tanúsítás a következő slotban érkezik, akkor a tanusító `base_reward * 1/2` jutalmat kap és így tovább.

A blokkot javaslók `8 / 64 * base_reward` jutalmat kapnak **minden egyes, a blokkban szereplő érvényes tanúsításért **, így a jutalom tényleges értéke a tanúsító validátorok számával növekszik. A blokkot javaslók növelhetik jutalmukat azáltal is, hogy a javasolt blokkjukba más validátorok helytelen viselkedésére vonatkozó bizonyítékokat is beillesztenek. Ezek azok az ösztönzők, amelyek a validátorokat őszinteségre motiválják. A súlyos büntetést tartalmazó blokkelőterjesztőt `slashed_validators_effective_balance / 512` értékkel jutalmazzák.

### Büntetések {#penalties}

Eddig a jól viselkedő validátorokat vettük figyelembe, de mi a helyzet azokkal, akik nem vagy csak lassan teszik meg a fej-, forrás- és célszavazatokat?

A cél- és forrásszavazatok elmaradásáért járó büntetés megegyezik azzal a jutalommal, amelyet az igazoló kapott volna, ha leadja azokat. Ez azt jelenti, hogy ahelyett, hogy a jutalom hozzáadódna az egyenlegükhöz, ugyanekkora értéket vonnak el abból. A fejszavazás elmulasztásáért nincs büntetés (azt csak jutalmazzák, nem büntetik). Az `inclusion_delay` kapcsán nincs büntetés, a jutalom egyszerűen nem kerül hozzáadásra a validátor egyenlegéhez. Nincs büntetés azért sem, ha valaki nem javasol blokkot.

Tudjon meg többet a jutalmakról és büntetésekről a [konszenzusspecifikációból](https://github.com/ethereum/consensus-specs/blob/dev/specs/altair/beacon-chain.md). A jutalmakat és büntetéseket a Bellatrix frissítéssel módosították – nézze meg Danny Ryan és Vitalik beszélgetését erről ebben a [Peep an EIP videóban](https://www.youtube.com/watch?v=iaAEGs1DMgQ).

## Slashing {#slashing}

A súlyos büntetés (slash) egy komoly művelet, amely eltávolítja a validátort a hálózatból, aki a letétbe helyezett ethert is elveszti. Három oka lehet egy validátor súlyos megbüntetésének, amelyek mindegyike a blokkok rosszhiszemű felajánlását vagy tanúsítását jelenti:

- Két különböző blokk előterjesztése és aláírása ugyanarra a slotra
- Egy olyan blokk tanúsítása, amely „magába foglal” egy másikat (gyakorlatilag megváltoztatva a historikus adatokat)
- „Kettős szavazás”, amikor két jelöltet tanúsít ugyanarra a blokkra

Ha ezeket a műveleteket észlelik, a validátort súlyosan megbüntetik. Ez azt jelenti, hogy a letétbe helyezett etherük 1/32-ét (maximum 1 etherig) azonnal elégetik, majd egy 36 napos eltávolítási időszak kezdődik. Ezen eltávolítási időszak alatt a validátor letétje fokozatosan elszivárog. Félidőben (18. nap) további büntetést kap, amelynek nagysága a büntetés előtti 36 napban az összes megbüntetett (slashed) validátor összes letétbe helyezett etherének nagyságával arányos. Ez azt jelenti, hogy ha több validátor kap súlyos büntetést és kizárást, akkor a büntetés mértéke növekszik. A maximális büntetés az összes megbüntetett validátor teljes tényleges egyenlege (ha sok validátor kap súlyos büntetést, akkor elveszíthetik a teljes letétjüket). Másrészt egyetlen, elszigetelt súlyos büntetés a validátor letétjének csak kis részét égeti el. Ezt a középtájt kiszabott extra büntetést, amely a megbüntetett validátorok számával skálázódik, korrelációs büntetésnek nevezzük.

## Inaktivitási elszivárgás {#inactivity-leak}

Ha a konszenzusréteg több mint négy korszakot tölt el véglegesítés nélkül, akkor egy „inaktivitási szivárgás” vészhelyzeti protokoll aktiválódik. Az inaktivitási elszivárgás célja, hogy megteremtse a lánc véglegessé válásához szükséges feltételeket. A véglegességhez a teljes feltett ether 2/3-os többsége szükséges ahhoz, hogy a forrás- és célellenőrzési pontok megegyezzenek. Ha a validátorok több mint 1/3-a offline állapotba kerül, vagy nem küld helyes tanúsításokat, akkor nem lehetséges, hogy a 2/3-os szupertöbbség véglegesítse az ellenőrzési pontokat. Az inaktivitási elszivárgás lehetővé teszi, hogy az inaktív validátorok letétje fokozatosan elszivárogjon addig, amíg a hozzájuk tartozó letét 1/3 alá csökkent, így a megmaradt aktív validátorok véglegesíthetik a láncot. Bármilyen nagy is legyen az inaktív validátorok csoportja, a megmaradó aktív validátorok végül a letét >2/3-át birtokolják. A letét elvesztése erősen ösztönzi az inaktív érvényesítőket arra, hogy minél hamarabb újra aktiválódjanak! A Medalla teszthálózaton életbe lépett már az inaktivitási elszivárgás, amikor is az aktív validátorok <66%-a képes volt konszenzusra jutni a blokklánc aktuális fejével kapcsolatban. Az inaktivitási elszivárgás aktiválódott, és a véglegesség végül helyreállt!

A konszenzusmechanizmus jutalom-, büntetés- és súlyos büntetési konstrukciója arra ösztönzi a validáltorokat, hogy jóhiszeműen viselkedjenek. Ezekből a tervezési döntésekből következik, hogy a rendszer érdekében a validátoroknak egyenlően kell megoszlaniuk a kliens között, és fel kell oldani az egyklienses dominanciát.

## További olvasnivaló {#further-reading}

- [Ethereum frissítése: Az ösztönzési réteg](https://eth2book.info/altair/part2/incentives)
- [Ösztönzők az Ethereum hibrid Casper-protokolljában](https://arxiv.org/pdf/1903.04205.pdf)
- [Vitalik jegyzetekkel ellátott specifikációja](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md#rewards-and-penalties-1)
- [Eth2 – a súlyos büntetés elkerülésének módjai](https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50)

_Források_

- _[https://benjaminion.xyz/eth2-annotated-spec/phase0/beacon-chain/](https://benjaminion.xyz/eth2-annotated-spec/phase0/beacon-chain/)_
