---
title: Tanúsítások
description: A tanúsítások menete az Ethereum proof-of-stake (letéti igazolás) mechanizmusában.
lang: hu
---

A validátornak minden korszakban tanúsítást kell készítenie, aláírnia és szétküldenie. Ez a leírás bemutatja, hogyan néznek ki ezek a tanúsítások, hogyan kezelik azokat és kommunikálják a konszenzusos kliensek között.

## Mi az a tanúsítás? {#what-is-an-attestation}

Minden [korszakban](/glossary/#epoch) (6,4 perc) a validátor tanúsítást készít a hálózatnak. A tanúsítás a korszak egy megadott slotjára történik. A tanúsítás célja az, hogy szavazzon amellett, ahogyan ő maga látja a láncot, különösképpen a legutóbbi ellenőrzött blokk és a jelen korszak első blokkja tekintetében (melyeket `source` (eredet) és `target` (cél) ellenőrzési pontoknak neveznek). Az információkat összekombinálják az összes résztvevő validátorra, így a hálózat konszenzust tud elérni a blokklánc státuszát illetően.

A tanúsítás a következő elemekből áll:

- `aggregation_bits`: a validátorok bitlistája, ahol a pozíció a validátornak a bizottságbeli indexéhez kapcsolódik; az érték (0/1) azt mutatja, hogy a validátor aláírta a `data` mezőt (tehát aktív és egyetért a blokkelőterjesztővel)
- `data`: a tanúsításhoz kapcsolódó részletek, ahogy az alább látszik
- `signature`: egy BLS-aláírás, ami aggregálja az egyéni validátorok aláírásait

A tanúsítást végző validátor első feladata az, hogy felépítse a `data` mezőit. A `data` a következő információkat tartalmazza:

- `slot`: A slot száma, melyre a tanúsítás vonatkozik
- `index`: Egy szám, ami beazonosítja, hogy a validátor melyik bizottsághoz tartozik egy adott slotban
- `beacon_block_root`: A blokk gyökérhashe, amit a validátor lát a lánc fejeként (az elágazásválasztási algoritmus alkalmazásának eredménye)
- `source`: A véglegesedési szavazás része, amely azt mutatja, hogy a validátorok melyik blokkot látják a legutoljára igazoltnak
- `target`: A véglegesedési szavazás része, mely azt mutatja, hogy a validátorok melyik blokkot látják a jelen korszak első blokkjának

Amint a `data` felépül, a validátor átválthatja a bitet az `aggregation_bits` mezőben 0-ról 1-re, amely a saját validátor indexéhez kapcsolódik, így mutatja, hogy részt vett.

Végül a valdátor aláírja a tanúsítást és elküldi azt a hálózaton.

### Aggregált tanúsítás {#aggregated-attestation}

Az adat elterjesztése a hálózaton minden validátor esetében jelentős költséggel jár. Ezért az egyéni validátorok tanúsításait aggregálják az alhálózatokon belül, mielőtt szélesebb körben szétküldenék azt. Ennek része az aláírások aggregálása, így a kiküldött tanúsítás tartalmazza a konszenzus `data` mezőit és egyetlen aláírást, melyet azon validátorok aláírásából készítenek, akik egyetértettek a `data` tartalmával. Ezt le lehet ellenőrizni az `aggregation_bits` mezővel, mert ez adja meg a bizottságban lévő validátorok indexeit (akiknek az ID-ja a `data` mezőben látható), amellyel le lehet kérdezni az egyéni aláírásokat.

Minden korszakban minden alhálóban 16 validátort kiválasztanak, hogy `aggregátor` legyen. Az aggregátorok összegyűjtik az összes tanúsítást, amelyről hallanak a pletykahálózaton, és amelyeknek ugyanolyan `data` áll rendelkezésre, mint nekik. Minden egyező tanúsítás küldője feljegyzésre kerül az `aggregation_bits` mezőben. Ezután az aggregátorok szétküldik az aggregált tanúsítást a szélesebb hálózaton.

Amikor egy validátort választanak blokkelőterjesztőnek, akkor az új blokkba beteszi az aggregált tanúsításokat az alhálózatoktól egészen az utolsó slotig.

### A tanúsítások belefoglalásának életciklusa {#attestation-inclusion-lifecycle}

1. Létrehozás
2. Előterjesztés
3. Aggregálás
4. Előterjesztés
5. Belefoglalás

A tanúsítás életciklusát a következő ábra is bemutatja:

![a tanúsítás életciklusa](./attestation_schematic.png)

## Jutalmak {#rewards}

A validátorok jutalmat kapnak az elküldött tanúsításokért. A tanúsítás jutalma függ a részvételi jelzésektől (forrás, cél és fej), az alapjutalomtól és a részvételi aránytól.

A részvételi jelzések értéke igaz vagy hamis lehet, a benyújtott tanúsítás és a kapcsolódó késedelem függvényében.

A legjobb esetben mindhárom jelző igaz, ekkor a validátor a következő jutalmat kapná (helyes jelzőnként):

`jutalom += alapjutalom * jelzés súlya * jelzés tanúsítási aránya / 64`

A jelzés tanúsítási arányát az adott jelzésre vonatkozóan az összes tanúsítást végező validátor tényleges egyenlegének összegével mérik az összes aktív tényleges egyenleghez viszonyítva.

### Alapjutalom {#base-reward}

Az alapjutalom számítása a tanúsításban részt vevő validátorok számától és az általuk letétbe helyezett ether egyenlegétől függ:

`base reward = validator effective balance x 2^6 / SQRT(Effective balance of all active validators)`

#### Belefoglalási késés {#inclusion-delay}

Amikor a validátorok szavaztak a lánc fejére (`block n`), akkor a `block n+1` még nem volt előterjesztve. Ezért a tanúsítások természetes módon **egy blokkal később** kerülnek be, így minden tanúsítás, amelyik azt mondta, hogy a `block n` a lánc feje, az bekerül a `block n+1`-be, és a **belefoglalási késés** értéke 1. Ha a belefoglalási késés két slotnyi lesz, akkor a tanúsítási jutalom feleződik, mert a tanúsítási jutalom kiszámításához az alapjutalom szorozva van a belefoglalási késés reciprokával.

### Tanúsítási esetek {#attestation-scenarios}

#### Hiányzó validátor, aki szavaz {#missing-voting-validator}

A validátoroknak legfeljebb 1 korszak áll rendelkezésre, hogy elküldjék a tanúsításukat. Ha a tanúsítás lekési a 0. korszakot, akkor belefoglalási késéssel be tudják még küldeni az 1. korszakban.

#### Hiányzó aggregátor {#missing-aggregator}

Összesen 16 aggregátor van minden korszakban. Emellett véletlenszerű validátorok be vannak jegyezve **két alhálózatra 256 korszakra**, és ők helyettesítik az aggregátorokat, ha bárki hiányzik.

#### Hiányzó blokkelőterjesztő {#missing-block-proposer}

Néhány esetben a szerencsés aggregátor blokkelőterjesztővé válhat. Ha a tanúsítás nem került be, mert a blokkelőterjesztő hiányzik, akkor a következő előterjesztő felkapja az aggregált tanúsítást és beteszi a következő blokkba. Ugyanakkor az **belefoglalási késés** növekszik eggyel.

## További olvasnivaló {#further-reading}

- [Tanúsítások Vitalik által kommentált konszenzusspecifikációban](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md#attestationdata)
- [Tanúsítások az eth2book.info oldalon](https://eth2book.info/capella/part3/containers/dependencies/#attestationdata)

_Ismersz olyan közösségi anyagot, amely segített neked? Módosítsd az oldalt és add hozzá!_
