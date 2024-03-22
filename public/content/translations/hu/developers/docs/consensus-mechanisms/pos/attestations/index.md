---
title: Tanúsítások
description: A tanúsítások menete az Ethereum proof-of-stake (letéti igazolás) mechanizmusában.
lang: hu
---

A validátornak minden korszakban (epoch) tanusítást kell készítenie, aláírnia és szétküldenie. Ez a leírás bemutatja, hogyan néznek ki ezek a tanúsítások, hogyan kezelik azokat és kommunikálják a konszenzuskliensek között.

## Mi az a tanúsítás? {#what-is-an-attestation}

Minden [korszakban (epoch)](/glossary/#epoch) (6,4 perc) a validátor tanúsítást készít a hálózatnak. A tanúsítás a korszak egy megadott slotjára történik. A tanúsítás célja az, hogy szavazzon amellett, ahogyan ő maga látja a láncot, különösképpen a legutóbbi ellenőrzött blokk és a jelen korszak első blokkja tekintetében (melyeket `source` (eredet) és `target` (cél) ellenőrzési pontoknak neveznek). Az információt összekombinálják az összes résztvevő validátorra, így a hálózat konszenzust tud elérni a blokklánc státuszát illetően.

A tanúsítás a következő elemekből áll:

- `aggregation_bits`: a validátorok bitlistája, ahol a pozíció a validátornak a bizottságbeli indexéhez kapcsolódik; az érték (0/1) azt mutatja, hogy a validátor aláírta a `data` mezőt (tehát aktív és egyetért a blokkelőterjesztővel)
- `data`: a tanúsításhoz kapcsolódó részletek, ahogy az alább látszik
- `signature`: egy BLS aláírás, ami aggregálja az egyéni validátorok aláírásait

A tanúsítást végző validátor első feladata az, hogy felépítse a `data` mezőit. A `data` a következő információkat tartalmazza:

- `slot`: A slot száma, melyre a tanúsítás vonatkozik
- `index`: Egy szám, ami beazonosítja, hogy a validátor melyik bizottsághoz tartozik egy adott slotban
- `beacon_block_root`: A blokk gyökérhash-e, amit a validátor lát a lánc fejeként (az elágazásválasztási algoritmus alkalmazásának eredménye)
- `source`: A véglegesedési szavazás része, mely azt mutatja, hogy a validátorok melyik blokkot látják a legutolsó igazoltnak
- `target`: A véglegesedési szavazás része, mely azt mutatja, hogy a validátorok melyik blokkot látják a jelen korszak első blokkjának

Amint a `data` felépül, a validátor átválthatja a bitet az `aggregation_bits` mezőben 0-ról 1-re, amely a saját validátor indexéhez kapcsolódik, így mutatja, hogy részt vett.

Végül a valdátor aláírja a tanusítást és elküldi azt a hálózaton.

### Aggregált tanúsítás {#aggregated-attestation}

Az adat elterjesztése a hálózaton minden validátor esetében jelentős költséggel jár. Ezért az egyéni validátorok tanúsításait aggregálják az alhálókon belül, mielőtt szélesebb körben szétküldenék azt. Ennek része az aláírások aggregálása, így a kiküldött tanúsítás tartalmazza a konszenzus `data` mezőit és egyetlen aláírást, melyet az összes validátor aláírásából készítenek, aki egyetértett a `data` tartalmával. Ezt le lehet ellenőrizni az `aggregation_bits` mezővel, mert ez adja meg a bizottságban lévő validátorok indexeit (akiknek az ID-ja része a `data` mezőinek), amellyel le lehet kérdezni az egyéni aláírásokat.

Minden korszakban minden alhálóban egy validátort kiválasztanak, hogy `aggregator` legyen. Az aggregátor összegyűjti az összes tanúsítást, amelyről hall a pletykahálózaton, s melyeknek ugyanolyan `data` áll rendelkezésre, mint neki. Minden egyező tanúsítás küldője feljegyződik az `aggregation_bits` mezőben. Ezután az aggregátor szétküldi az aggregált tanúsítást a szélesebb hálózaton.

Amikor a validátort választják blokkelőterjesztőnek, akkor az új blokkba beteszi az aggregált tanúsításokat az alhálózatoktól egészen az utolsó slotig.

### A tanúsítások belefoglalásának életciklusa {#attestation-inclusion-lifecycle}

1. Létrehozás
2. Elterjesztés
3. Aggregálás
4. Elterjesztés
5. Belefoglalás

A tanúsítás életciklusát a következő ábra is bemutatja:

![a tanúsítás életciklusa](./attestation_schematic.png)

## Jutalmak {#rewards}

A validátorok jutalmat kapnak az elküldött tanúsításokért. A tanúsítás jutalma két dologtól függ: a `base reward` (alapjutalom) és az `inclusion delay` (belefoglalási késés). A belefoglalási késés a legjobb esetben 1.

`attestation reward = 7/8 x base reward x (1/inclusion delay)`

### Alapjutalom {#base-reward}

Az alapjutalom számítása a tanúsításban részt vevő validátorok számától és az általuk letétbe helyezett ether egyenlegétől függ:

`base reward = validator effective balance x 2^6 / SQRT(Effective balance of all active validators)`

#### Belefoglalási késés {#inclusion-delay}

Aikor a validátorok szavaztak a lánc fejére (`block n`), akkor a `block n+1` még nem volt előterjesztve. Ezért a tanúsítások természetes módon **one block later** (egy blokkal később) kerülnek be, így minden tanúsítás, amelyik azt mondta, hogy a `block n` a lánc feje, az bekerül a `block n+1`-be, és az **inclusion delay** (belefoglalási késés) értéke 1. Ha a belefoglalási késés két slotnyi lesz, akkor a tanúsítási jutalom feleződik, mert a jutalom kiszámításához az alapjutalom szorozva van a belefoglalási késés reciprokával.

### Tanúsítási esetek {#attestation-scenarios}

#### Hiányzó validátor, aki szavaz {#missing-voting-validator}

A validátoroknak legfeljebb 1 korszak áll rendelkezésre, hogy elküldjék a tanúsításukat. Ha a tanúsítás lekési a 0. korszakot, akkor belefoglalási késéssel be tudják még küldeni az 1. korszakban.

#### Hiányzó aggregátor {#missing-aggregator}

Összesen 16 aggregátor van minden korszakban. Emellett véletlenszerű validátorok be vannak jegyezve **két alhálózatra 256 korszakra**, és ők helyettesítik az aggregátorokat, ha bárki hiányzik.

#### Hiányzó blokkelőterjesztő {#missing-block-proposer}

Néhány esetben a szerencsés aggregátor blokkelőterjesztővé válhat. Ha a tanúsítás nem került be, mert a blokkelőterjesztő hiányzik, akkor a következő előterjesztő felkapja az aggregált tanúsítást és beteszi a következő blokkba. Ugyanakkor az **inclusion delay** megnövekszik eggyel.

## További olvasnivaló {#further-reading}

- [Tanúsítások Vitalik által kommentált konszenzusspecifikációban](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md#attestationdata)
- [Tanúsítások az eth2book.info oldalon](https://eth2book.info/altair/part3/containers/dependencies#attestationdata)

_Ismersz olyan közösségi anyagot, amely segített neked? Módosítsd az oldalt és add hozzá!_
