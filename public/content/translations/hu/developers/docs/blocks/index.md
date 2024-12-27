---
title: Blokkok
description: Egy áttekintő a blokkokról az Ethereum blokkláncban - az adatstruktúrájukról, miért van rájuk szükség és hogyan készülnek.
lang: hu
---

A blokkok tranzakciókból álló csoportosítások a láncban lévő előző blokk hash-ével ellátva. Ez összeköti a blokkokat (egy lánccá), mivel a hasheket kriptográfiailag származtatjuk a blokk adatból. Ez megelőzi a csalásokat, mivel bármely blokkon történő változtatás érvénytelenítené az összes következő blokkot, mivel az összes többi hash megváltozna és bárki aki a blokkláncot futtatja észrevenné.

## Előfeltételek {#prerequisites}

A blokkok könnyen feldolgozhatók még a legkezdőbb felhasználóknak is. De ennek az oldalnak a jobb megértése érdekében javasoljuk, hogy először olvassa el a [Számlák](/developers/docs/accounts/), a [Tranzakciók](/developers/docs/transactions/) és a [Bevezetés az Ethereumba](/developers/docs/intro-to-ethereum/) című cikkeinket.

## Miért kellenek a blokkok? {#why-blocks}

Annak biztosítása érdekében, hogy az Ethereum-hálózat minden résztvevője egy szinkronizált állapotot tart fenn és megegyezik a pontos tranzakciós történetben, a tranzakciókat blokkokba rendezzük. Ez azt jelenti, hogy több tucatnyi (vagy több száz) tranzakció felett van elköteleződés, egyetértés és szinkronizáció egyszerre.

![Diagram, amely egy státuszt módosító blokkban lévő tranzakciót mutat](./tx-block.png) _Diagram átvéve az [Ethereum EVM illusztrálva](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_ anyagból

Az elkötelezettségek elosztásával elegendő időt adunk az összes hálózati résztvevőnek arra, hogy konszenzusra tudjanak jutni: annak ellenére, hogy a tranzakciós kérelmek másodpercenként több tucatszor fordulnak elő, az Ethereum blokkjai tizenkét másodpercenként köteleződnek el.

## Hogy működnek a blokkok {#how-blocks-work}

Hogy megőrizzük a tranzakciós történetet, a blokkoknak szigorú sorrendet kell betartaniuk (minden létrejövő új blokk tartalmaz egy referenciát a szülő blokkjára), és a blokkokban lévő tranzakciók is szigorú sorrendet követnek. Ritka esetek kivételével bármikor amikor a hálózat összes résztvevője egyetért a blokkok pontos számában és előzményeiben, és azon dolgozik, hogy az aktuális élő tranzakciós kérelmeket a következő blokkba csomagolja.

Amint egy blokkot egy véletlenszerűen választott validátor összeállít által a hálózaton, az továbbterjed a hálózat többi részére; az összes csomópont hozzáfűzi ezt a blokkot a blokkláncukra, majd egy új validátort választanak a következő blokk összeállításához. A pontos blokk-összeállítási folyamatot és az elköteleződés/konszenzus folyamatot jelenleg az Ethereum „proof-of-stake” protokollja specifikálja.

## Proof-of-stake protokoll {#proof-of-work-protocol}

A proof-of-stake a következőket jelenti:

- A validációt végző csomópontoknak letétbe kell helyezniük 32 ETH-t egy letéti szerződésbe fedezetként, hogy elkerülhető legyen a rosszhiszemű viselkedés. Ez segít megvédeni a hálózatot, mert a rosszhiszemű viselkedés következtében a letét egy része vagy egésze megsemmisül.
- Minden slotban (tizenkét másodpercben) a validátort véletlenszerűen választják ki, hogy javasoljon egy blokkot. Tranzakciókat gyűjt össze, végrehajtja azokat és meghatározza a blokklánc új státuszát. Ezt az információt egy blokkba csomagolja és elküldi a többi validátornak.
- A többi validátor megtudja, hogy van egy új blokk, újra végrehajtja a tranzakciókat, hogy azok megegyeznek-e a javasolt új státusszal. Feltéve a blokk érvényes, hozzáteszik a saját adatbázisukhoz.
- Ha egy validátor két ütköző blokkot talál ugyanarra a slotra, akkor az elágazást választó algoritmussal azt választják, amelyet a legtöbb letétbe helyezett ETH támogat.

[A proof-of-stake-ről bővebben](/developers/docs/consensus-mechanisms/pos)

## Mi van egy blokkban? {#block-anatomy}

A blokkban rengeteg információ van. A legmagasabb szinten a következő mezőket tartalmazza:

| Mező             | Leírás                                                                        |
|:---------------- |:----------------------------------------------------------------------------- |
| `slot`           | az a slot, amelyhez a blokk tartozik                                          |
| `proposer_index` | a validátor azonosítója, aki a blokkot javasolta                              |
| `parent_root`    | az előző blokk hash-e                                                         |
| `state_root`     | a státusz objektum gyökér hash-e                                              |
| `törzs`          | egy olyan objektum, amely számos mezőt tartalmaz, ahogy azt alább definiáljuk |

A blokk `body` számos mezőt tartalmaz:

| Mező                 | Leírás                                                              |
|:-------------------- |:------------------------------------------------------------------- |
| `randao_reveal`      | egy érték, amely a következő blokkjavaslót választja ki             |
| `eth1_data`          | információ a letéti szerződésről                                    |
| `graffiti`           | tetszőleges adat a blokkok taggelésére                              |
| `proposer_slashings` | a validátorok listája, akiket slashelni kell                        |
| `attester_slashings` | a tanusítók listája, akiket slashelni kell                          |
| `tanúsítások`        | a tanúsítók listája, akik ezt a blokkot támogatják                  |
| `behelyezés`         | az új letétek listája a letéti szerződésbe                          |
| `voluntary_exits`    | a validátorok listája, akik kilépnek a hálózatból                   |
| `sync_aggregate`     | a validátorok egy csoportja, akik a könnyű klienseket szolgálják ki |
| `execution_payload`  | a végrehajtási klienstől jövő tranzakciók                           |

A `attestations` (tanúsítások) mező tartalmazza a blokkban lévő az összes tanúsítást. A tanúsítások saját adattípussal rendelkezik, amelyben számos adat megtalálható. A tanúsítások a következőket tartalmazzák:

| Mező               | Leírás                                                       |
|:------------------ |:------------------------------------------------------------ |
| `aggregation_bits` | a validátorok listája, akik részt vettek a tanúsításban      |
| `adat`             | konténer számos almezővel                                    |
| `aláírás`          | az összes tanúsítást végző validátor aláírásának aggregátuma |

A `data` mező a `tanúsítás` részen belül tartalmazza:

| Mező                | Leírás                                                            |
|:------------------- |:----------------------------------------------------------------- |
| `slot`              | a slot, amelyhez a tanúsítás kapcsolódik                          |
| `index`             | a tanúsítást végző validátorok indexei                            |
| `beacon_block_root` | a Beacon blokk gyökér hash-e, amely ezt az objektumot tartalmazza |
| `forrás`            | az utolsó igazolt ellenőrzési pont                                |
| `target`            | a legutolsó korszak határoló blokkja                              |

A tranzakciók végrehajtása az `execution_payload` paraméterben frissíti a globális állapotot. Minden kliens újra végrehajtja a tranzakciókat, amelyek a `execution_payload` paraméterben vannak, hogy biztosítsa, az új állapot egyezik az új blokk `state_root` mezőjében lévőjével. Így tudják a kliensek megmondani, hogy az új blokkot érvényes és biztonságos-e hozzáadni a saját blokkláncukhoz. Az `execution payload` maga egy objektum, amely számos mezővel rendelkezik. Van egy `execution_payload_header` is, ami fontos összegzőinformációkat tartalmaz a végrehajtási adatokról. Ezek az adatstruktúrák a következőképpen vannak rendezve:

Az `execution_payload_header` a következő mezőket tartalmazza:

| Mező                | Leírás                                                                   |
|:------------------- |:------------------------------------------------------------------------ |
| `parent_hash`       | a jelenlegi blokk elődjének a hash-e                                     |
| `fee_recipient`     | a számla címe, amelyre a tranzakciós díjakat fizették                    |
| `state_root`        | a globális állapot gyökér hash-e, miután a változások bementek a blokkba |
| `receipts_root`     | a tranzakció fogadói fájának hash-e                                      |
| `logs_bloom`        | eseménynaplókat tartalmazó adatstruktúra                                 |
| `prev_randao`       | egy érték, amit a véletlenszerű validátor kiválasztásnál használnak      |
| `block_number`      | a jelenlegi blokk száma                                                  |
| `gas_limit`         | a jelenlegi blokkban megengedett maximális gáz                           |
| `gas_used`          | a jelenlegi blokkban elhasznált gáz aktuális összege                     |
| `időbélyeg`         | a blokk ideje                                                            |
| `extra_data`        | tetszőleges hozzáadott adat, mint nyers bájt                             |
| `base_fee_per_gas`  | az alapdíj értéke                                                        |
| `block_hash`        | a végrehajtó blokk hash-e                                                |
| `transactions_root` | a végrehajtási csomagban lévő tranzakciók gyökér hash-e                  |
| `withdrawal_root`   | a végrehajtási csomagban lévő visszavonások gyökér hash-e                |

Az `execution_payload` maga a következőket tartalmazza (ami azonos a fejléccel, kivéve, hogy a gyökér hash-ek helyett a tranzakciók és visszavonások aktuális listáját tartalmazza):

| Mező               | Leírás                                                                   |
|:------------------ |:------------------------------------------------------------------------ |
| `parent_hash`      | a jelenlegi blokk elődjének a hash-e                                     |
| `fee_recipient`    | a számla címe, amelyre a tranzakciós díjakat fizették                    |
| `state_root`       | a globális állapot gyökér hash-e, miután a változások bementek a blokkba |
| `receipts_root`    | a tranzakció fogadói fájának hash-e                                      |
| `logs_bloom`       | eseménynaplókat tartalmazó adatstruktúra                                 |
| `prev_randao`      | egy érték, amit a véletlenszerű validátor kiválasztásnál használnak      |
| `block_number`     | a jelenlegi blokk száma                                                  |
| `gas_limit`        | a jelenlegi blokkban megengedett maximális gáz                           |
| `gas_used`         | a jelenlegi blokkban elhasznált gáz aktuális összege                     |
| `időbélyeg`        | a blokk ideje                                                            |
| `extra_data`       | tetszőleges hozzáadott adat, mint nyers bájt                             |
| `base_fee_per_gas` | az alapdíj értéke                                                        |
| `block_hash`       | a végrehajtó blokk hash-e                                                |
| `tranzakciók`      | a tranzakciók listája, amit végre kell hajtani                           |
| `kivételek`        | a visszavonásra kerülő objektumok listája                                |

A `withdrawals` (visszavonások) listája tartalmazza a `withdrawal` (visszavonási) objektumokat, amelyek a következőképpen vannak strukturálva:

| Mező             | Leírás                             |
|:---------------- |:---------------------------------- |
| `address`        | a visszavonásra került számla címe |
| `amount`         | a visszavonás összege              |
| `index`          | a visszavonás index értéke         |
| `validatorIndex` | a validátor index értéke           |

## Blokk idő {#block-time}

A blokk ideje arra utal, hogy mennyi idő választja el a blokkokat. Az Ethereumban az időt tizenkét másodperces egységekre bontják, amelyet slotnak neveznek. Minden slotban egy validátort választanak, hogy javasoljon blokkot. Feltéve, hogy minden validátor online van és teljesen működőképes, minden slotban lesz egy blokk, tehát a blokk idő 12 másodperc. Azonban a validátorok lehetnek néha offline is, amikor felkérik őket blokkjavaslatra, tehát a slot néha üresen megy.

Ez különbözik a proof-of-work alapú rendszerektől, ahol a blokk ideje valószínű érték és a protokoll céljának kibányászási nehézsége állítja be. Az Ethereum [átlagos blokkideje](https://etherscan.io/chart/blocktime) egy tökéletes példa erre, ahol az átállás a proof-of-work mechanizmusról a proof-of-stake-re egyértelműen kikövetkeztethető az új 12 másodperces blokkidő konzisztens voltából.

## Blokkméret {#block-size}

Utolsó fontos megjegyzés, hogy a blokkok maguk is korlátozott méretűek. Minden blokk 15 millió gáz célmérettel rendelkezik, de a blokk mérete a hálózati kereslet függvényében, egészen a 30 millió gáz határig (ami a célméret kétszerese) változik. A blokk gázkorlátja felfelé vagy lefelé is igazodhat az előző blokk gázkorlátjának 1/1024 faktorával. Így a validátorok megváltoztathatják a blokk gázkorlátját a konszenzus révén. A blokkban lévő tranzakciók által elköltött teljes gáz mennyisége kevesebb kell legyen, mint a blokk gázkorlátozása. Ez fontos, mert ez azt jelenti, hogy a blokkok nem lehetnek tetszőlegesen nagyok. Ha a blokkok tetszőlegesen nagyok lehetnének, akkor a kevésbé teljesítőképes teljes csomópontok egyre kevésbé tudnának lépést tartani a hálózattal a tárhely- és sebességigények miatt. Minél nagyobb a blokk, annál nagyobb számítási erő kell ahhoz, hogy időben fel legyen dolgozva a következő slotra. Ez egy centralizáló erő, amelynek úgy áll ellen, hogy határt szab a méretnek.

## További olvasnivaló {#further-reading}

_Van olyan közösségi erőforrása, amely segített Önnek? Szerkessze ezt az oldalt, és adja hozzá!_

## Kapcsolódó témák {#related-topics}

- [Tranzakciók](/developers/docs/transactions/)
- [Gáz](/developers/docs/gas/)
- [Proof-of-stake](/developers/docs/consensus-mechanisms/pos)
