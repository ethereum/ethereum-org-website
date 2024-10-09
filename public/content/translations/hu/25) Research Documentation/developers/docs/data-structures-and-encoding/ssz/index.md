---
title: Egyszerű sorosítás (SSZ)
description: Az Ethereum egyszerű sorosítási (SSZ) formátumának magyarázata.
lang: hu
sidebarDepth: 2
---

Az **egyszerű sorosítás (SSZ)** a Beacon láncon használt sorosítási módszer. Ezt használják a konszenzusrétegben, a végrehajtási rétegben használt RLP sorosítás helyett, kivéve a társak megkeresésének protokolljánál. Az SSZ determinisztikus és hatékonyan Merkle-szerűsít. Az SSZ két komponensből áll: egy sorosítási sémából és egy Merkle-szerűsítő sémából, amelyet úgy terveztek, hogy hatékonyan dolgozzon a sorosított adatstruktúrával.

## Hogyan működik az SSZ? {#how-does-ssz-work}

### Sorosítás {#serialization}

Az SSZ egy olyan sorosítási séma, amely nem önleíró – inkább egy sémára támaszkodik, amelyet előre ismerni kell. Az SSZ sorosítás célja, hogy tetszőleges összetettségű objektumokat bájtsorozatként ábrázoljon. Ez egy egyszerű folyamat az alaptípusokra. Az elemet egyszerűen hexadecimális bájtokká alakítja. Az alaptípusok a következők:

- nem aláírt egész számok
- Boolean-ek

Az „összetett” típusok esetében a sorosítás bonyolultabb, mivel az összetett típus több elemet tartalmaz, amelyek különböző típusúak vagy különböző méretűek lehetnek, vagy mindkettő. Ha ezek az objektumok mind fix hosszúságúak (azaz az elemek mérete mindig állandó lesz, függetlenül a tényleges értékeiktől), akkor a sorosítás az összetett típus minden egyes elemének kis-endian bájtsztringekké történő átalakítása. Ezeket a bájtsztringeket összekapcsolják. A sorosított objektum a fix hosszúságú elemek bájtlista reprezentációját tartalmazza ugyanabban a sorrendben, ahogyan azok a deszerializált objektumban szerepelnek.

A változó hosszúságú típusok esetében a tényleges adatok helyébe egy „eltolási” (offszet) érték lép az adott elem pozíciójában a sorosított objektumban. A tényleges adatok egy halomba kerülnek a sorosított objektum végén. Az eltolási érték a halomban lévő tényleges adatok kezdetének indexe, amely a megfelelő bájtokra mutató mutatóként szolgál.

Az alábbi példa azt szemlélteti, hogyan működik az eltolás fix és változó hosszúságú elemeket tartalmazó konténer esetében:

```Rust

    struct Dummy {

        number1: u64,
        number2: u64,
        vector: Vec<u8>,
        number3: u64
    }

    dummy = Dummy{

        number1: 37,
        number2: 55,
        vector: vec![1,2,3,4],
        number3: 22,
    }

    serialized = ssz.serialize(dummy)

```

A `serialized` a következő szerkezetű lenne (itt 4 bitre van kitöltve, a valóságban 32 bitre van, és az áttekinthetőség kedvéért `int` ábrázolást használunk):

```
[37, 0, 0, 0, 55, 0, 0, 0, 16, 0, 0, 0, 22, 0, 0, 0, 1, 2, 3, 4]
------------  -----------  -----------  -----------  ----------
      |             |            |           |            |
   number1       number2    offset for    number 3    value for
                              vector                   vector

```

az áttekinthetőség érdekében sorokra osztva:

```
[
  37, 0, 0, 0,  # little-endian encoding of `number1`.
  55, 0, 0, 0,  # little-endian encoding of `number2`.
  16, 0, 0, 0,  # The "offset" that indicates where the value of `vector` starts (little-endian 16).
  22, 0, 0, 0,  # little-endian encoding of `number3`.
  1, 2, 3, 4,   # The actual values in `vector`.
]
```

Ez még mindig egyszerűsítés – a fenti ábrákon szereplő egész számok és nullák valójában bájtlistákként lennének tárolva, például így:

```
[
  10100101000000000000000000000000  # little-endian encoding of `number1`
  10110111000000000000000000000000  # little-endian encoding of `number2`.
  10010000000000000000000000000000  # The "offset" that indicates where the value of `vector` starts (little-endian 16).
  10010110000000000000000000000000  # little-endian encoding of `number3`.
  10000001100000101000001110000100   # The actual value of the `bytes` field.
]
```

Így a változó hosszúságú típusok tényleges értékei egy halomban tárolódnak a sorosított objektum végén, a mezők rendezett listájában a megfelelő pozíciókban tárolt eltolási értékeikkel együtt.

A speciális esetek különleges kezelést igényelnek, mint például a `BitList` típus, amelyhez a sorosítás során hosszkorlátot kell hozzáadni, majd a deszerializáció során eltávolítani azt. További részletek az [SSZ specifikációban](https://github.com/ethereum/consensus-specs/blob/dev/ssz/simple-serialize.md) találhatók.

### Deszerializáció {#deserialization}

Az objektum deszerializációjához szükség van a <b>sémára</b>. A séma meghatározza a sorosított adatok pontos elrendezését, hogy minden egyes elemet egy bájtblob-ból valamilyen értelmes objektummá lehessen deszerializálni, amelynek elemei a megfelelő típusúak, értékűek, méretűek és pozíciójúak. A séma az, amely megmondja a deszerializátornak, hogy mely értékek ténylegesek, és melyek az eltolási értékek. Az objektum sorosításakor minden mezőnév eltűnik, de a séma szerinti deszerializáláskor újra létrejön.

Tekintse meg az [ssz.dev](https://www.ssz.dev/overview) oldalt egy interaktív magyarázatért.

## Merkle-szerűsítés {#merkleization}

Ez az SSZ sorosított objektum ezután Merkle-szerűsíthető, azaz átalakítható ugyanazon adatok Merkle-fa reprezentációjává. Először meg kell határozni a 32 bájtos darabok számát a sorosított objektumban. Ezek a fa levelei. A levelek teljes számának 2 hatványának kell lennie, hogy a levelek összevonása végül egyetlen hashfagyökeret eredményezzen. Ha ez magától nem így van, akkor további 32 bájtnyi nullát tartalmazó levelek kerülnek hozzáadásra. Ezt így ábrázolhatjuk:

```
        hash tree root
            /     \
           /       \
          /         \
         /           \
   hash of leaves  hash of leaves
     1 and 2         3 and 4
      /   \            /  \
     /     \          /    \
    /       \        /      \
 leaf1     leaf2  leaf3     leaf4
```

Vannak olyan esetek is, amikor a fa levelei nem egyenletesen oszlanak el, ahogy azt a fenti példa mutatja. A 4. levél például egy több elemet tartalmazó konténer lehet, amely további „mélységet” igényel a Merkle-fához, ami egy egyenetlen fát hoz létre.

Ahelyett, hogy ezeket a faelemeket X. levélnek, X. csomópontnak stb. neveznénk, általános indexeket adhatunk nekik, kezdve a gyökérrel = 1 és balról jobbra számozva minden szinten. Ez a fentebb ismertetett általánosított index. A sorosított lista minden egyes elemének általános indexe `2**depth + idx`, ahol idx a nullával indexelt pozíciója a sorosított objektumban, a mélység (depth) pedig a Merkle-fa szintjeinek száma, amely az elemek (levelek) számának kettes bázisú logaritmusaként határozható meg.

## Általánosított indexek {#generalized-indices}

Az általánosított index egy egész szám, amely egy csomópontot jelöl egy bináris Merkle-fában, ahol minden csomópontnak van egy általánosított indexe `2 ** depth + index in row`.

```
        1           --depth = 0  2**0 + 0 = 1
    2       3       --depth = 1  2**1 + 0 = 2, 2**1+1 = 3
  4   5   6   7     --depth = 2  2**2 + 0 = 4, 2**2 + 1 = 5...

```

Ez az ábrázolás a Merkle-fa minden egyes adatához egy csomópontindexet ad.

## Többszörös bizonyítékok {#multiproofs}

Az általánosított indexek listájának megadása, mely egy adott elemet reprezentál, lehetővé teszi, hogy ellenőrizzük azt a hashfa gyökerével szemben. Ez a gyökér az általunk elfogadott valóság. Bármelyik adatot ellenőrizhetjük ezzel a valósággal szemben, ha beillesztjük a Merkle-fa megfelelő helyére (amelyet az általánosított indexe határoz meg), és megfigyeljük, hogy a gyökér állandó marad-e. A [specifikációban](https://github.com/ethereum/consensus-specs/blob/dev/ssz/merkle-proofs.md#merkle-multiproofs) vannak olyan függvények, amelyek megmutatják, hogyan lehet kiszámítani a csomópontok minimális halmazát, amely egy adott általános indexkészlet tartalmának ellenőrzéséhez kell.

Például az alábbi fa 9-es indexében lévő adatok ellenőrzéséhez szükségünk van a 8, 9, 5, 3, 1 indexben lévő adatok hashére. A (8,9) hashnek meg kell egyeznie a (4) hashsel, amely az 5-tel hashelve a 2-t adja, amely a 3-mal hashelve az 1-es fa gyökerét adja. Ha a 9-hez helytelen adatokat adnánk meg, a gyökér megváltozna – ezt észlelnénk, és nem tudnánk ellenőrizni az ágat.

```
* = data required to generate proof

                    1*
          2                      3*
    4          5*          6          7
8*     9*   10    11   12    13    14    15

```

## További olvasnivaló {#further-reading}

- [Az Ethereum frissítése: SSZ](https://eth2book.info/altair/part2/building_blocks/ssz)
- [Az Ethereum frissítése: Merkle-szerűsítés](https://eth2book.info/altair/part2/building_blocks/merkleization)
- [SSZ implementációk](https://github.com/ethereum/consensus-specs/issues/2138)
- [SSZ kalkulátor](https://simpleserialize.com/)
- [SSZ.dev](https://www.ssz.dev/)
