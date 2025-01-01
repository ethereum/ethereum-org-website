---
title: Konszenzus mechanizmusok
description: Az elosztott rendszerek konszenzusprotokolljainak és szerepeiknek bemutatása az Ethereumban.
lang: hu
---

A konszenzusmechanizmust gyakran használják arra, hogy proof-of-stake (letéti igazolás), proof-of-work (munkaigazolás) vagy proof-of-authority (jogosultságigazolás) protokollokra hivatkoznak. Ugyanakkor ezek csak a konszenzusmechanizmus elemei, amelyek megvédik azt a [Sybil-támadásoktól](/glossary/#sybil-attack). A konszenzusmechanizmus elképzelések, protokollok és ösztönzők teljes halmaza, amely lehetővé teszi, hogy csomópontok elosztott kötege meg tudjon egyezni a blokklánc státuszáról.

## Előfeltételek {#prerequisites}

Ennek az oldalnak a könnyebb megértése érdekében javasoljuk, hogy először olvassa el a [bevezetés az Ethereumba](/developers/docs/intro-to-ethereum/) oldalunkat.

## Mi az a konszenzus? {#what-is-consensus}

A konszenzus azt jelenti, hogy általános megegyezés történik. Tegyük fel, hogy egy csapat ember moziba megy. Ha a választott film kapcsán nincs nézeteltérés, akkor konszenzus van. Ha nézeteltérés van, akkor a csoportnak el kell döntenie, hogy mit nézzen. Szélsőséges esetben a csoport több felé fog válni.

Az Ethereum blokkláncon ez a folyamat formális, a konszenzus eléréséhez a hálózaton lévő csomópontok 66%-ának egyet kell értenie a hálózat globális státuszát illetően.

## Mi az a konszenzusmechanizmus? {#what-is-a-consensus-mechanism}

A konszenzusmechanizmus kifejezés a protokollok, ösztönzők és elképzelések egész halmazára utal, amelyek lehetővé teszik, hogy a csomópontok hálózata megegyezzen a blokklánc státuszáról.

Az Ethereum egy proof-of-stake-alapú konszenzusmechanizmust használ, amelynek kriptogazdasági biztonsága abból ered, hogy a letétesek által zárolt tőkéhez jutalmak és büntetések kapcsolódnak. Ez az ösztönző struktúra arra ösztönzi az egyes letéteseket, hogy becsületes validátorokat működtessenek, bünteti azokat, akik nem így tesznek, és rendkívül magas költséget teremt a hálózat megtámadásához.

Ezután van egy protokoll, amely szabályozza, hogyan választják ki a becsületes validátorokat, hogy blokkokat javasoljanak vagy validáljanak, tranzakciókat dolgozzanak fel és szavazzanak a lánc fejéről. Azokban a ritka helyzetekben, amikor több blokk is ugyanabban a pozícióban van a lánc élén, van egy elágazásválasztó-mechanizmus, amely kiválasztja a „legnehezebb” láncot alkotó blokkokat, a blokkokra szavazó validátorok száma alapján, a letétbe helyezett ether-egyenlegükkel súlyozva.

A konszenzus szempontjából fontosak a kódon kívüli koncepciók is, mint a megszokotton kívüli társadalmi koordináció biztonsága, mely a hálózat elleni támadások elleni védelmi vonal.

Ezek az elemeket együttesen adják ki a konszenzusmechanizmust.

## A konszenzusmechanizmusok fajtái {#types-of-consensus-mechanisms}

### Proof-of-work alapú {#proof-of-work}

Ahogy a Bitcoin, korábban Ethereum is a **proof-of-work (PoW)** alapú konszenzusprotokollt használta.

#### Blokk létrehozás {#pow-block-creation}

A bányászok versenyeznek, hogy új blokkokat hozzanak létre, amelyek tele vannak feldolgozott tranzakciókkal. A győztes megosztja az új blokkot a hálózat többi részével és valamennyi újonnan kibocsátott ETH-t kap jutalmul. A versenyt az a számítógép nyeri, amelyik a leggyorsabban meg tud oldani egy matematikai feladványt. Ez hozza létre a kriptográfiai kapcsolatot az aktuális és az azt megelőző blokk között. Ennek a feladványnak a megoldása jelenti a munkát a „proof-of-workben”. A kanonikus láncot ezután egy elágazásválasztási szabály határozza meg, amely kiválasztja azon blokkok halmazát, amelyek bányászatával a legtöbb munkát végezték.

#### Biztonság {#pow-security}

A hálózatot az tartja biztonságban, hogy a számítási kapacitás több mint 51%-ára van szükség a lánc meghamisításához. Ez olyan nagy befektetést igényelne a felszerelésben és energiában, hogy a támadó valószínűleg többet költene, mint amennyit nyerne vele.

Bővebben a [proof-of-workről (PoW)](/developers/docs/consensus-mechanisms/pow/)

### Proof-of-stake-alapú {#proof-of-stake}

Az Ethereum jelenleg **proof-of-stake (PoS)** alapú konszenzusprotokollt használ.

#### Blokk létrehozás {#pos-block-creation}

A validátorok blokkokat hoznak létre. Minden slotban véletlenszerűen kiválasztanak egy blokkelőterjesztőt. A kiválasztott konszenzusos kliense egy adat tranzakciót kér végrehajtási csomagként a végrehajtási klienstől. Ezt konszenzusadatokba csomagolják, hogy egy blokkot alkossanak, melyet az Ethereum hálózat többi csomópontjának továbbítanak. Ezért a blokk-készítésért ETH-t kapnak. Ritka esetekben, amikor egy slothoz több blokk is létezik, vagy a csomópontok különböző időpontokban értesülnek a blokkokról, az elágazásválasztó algoritmus azt a blokkot választja ki, amely a legnagyobb súlyú tanúsítással alkotja a láncot (ahol a tanúsítást végző validátorok számát azok ETH-egyenlegével súlyozzák).

#### Biztonság {#pos-security}

A proof-of-stake rendszer kriptogazdasági szempontból biztonságos, mivel egy támadónak, aki megpróbálja átvenni az irányítást a lánc felett, hatalmas mennyiségű ETH-t kell feláldoznia. A jutalmak rendszere arra ösztönzi az egyes letétbe helyezőket, hogy tisztességesen viselkedjenek, a büntetések pedig visszatartják őket attól, hogy rosszhiszeműen cselekedjenek.

Bővebben a [proof-of-stake-ről](/developers/docs/consensus-mechanisms/pos/)

### Vizuális áttekintés {#types-of-consensus-video}

Tekintse meg az Ethereumon használt különféle konszenzusmechanizmusokat:

<YouTube id="ojxfbN78WFQ" />

### Ellenállás a Sybil-támadásnak és láncválasztás {#sybil-chain}

A proof-of-work és proof-of-stake önmagukban nem konszenzusprotokollok, de az egyszerűség kedvéért gyakran így hivatkoznak rájuk. Ezek Sybil-ellenálló mechanizmusok és a blokkok létrehozójának kiválasztói; ezek segítségével lehet eldönteni, hogy ki a legutóbbi blokk kreálója. Egy másik fontos összetevő a láncválasztó (elágazásválasztó) algoritmus, amely lehetővé teszi a csomópontok számára, hogy egyetlen helyes blokkot válasszanak a lánc élére olyan esetekben, amikor több blokk van ugyanabban a pozícióban.

A **Sybil-rezisztencia** azt méri, hogy egy protokoll hogyan viselkedik egy Sybil-támadással szemben. Az ilyen típusú támadásokkal szembeni ellenállás lényeges egy decentralizált blokkláncnál, és lehetővé teszi, hogy a bányászok és a validáltorok a befektetett erőforrások alapján egyenlő mértékben részesüljenek jutalomban. A proof-of-work és proof-of-stake mechanizmusok úgy védekeznek, hogy a felhasználóknak sok energiát kell ráfordítaniuk vagy sok biztosítékot kell nyújtaniuk. Ezek a védelmek gazdaságilag elrettentő erejűek a Sybil-támadásokkal szemben.

A **láncválasztási szabály** dönti el, hogy melyik lánc a „helyes”. A Bitcoin a „leghosszabb lánc” szabályt alkalmazza, ami azt jelenti, hogy amelyik blokklánc a leghosszabb, azt a többi csomópont is elfogadja érvényesnek, és azzal dolgozik. A proof-of-work láncok esetében a leghosszabb láncot a lánc összesített proof-of-work nehézsége határozza meg. Korábban az Ethereum is a leghosszabb lánc szabályát használta; most a proof-of-stake mechanizmussal működik, egy frissített elágazásválasztó algoritmust fogadott el, amely a lánc „súlyát” méri. A súly a validátorok szavazatainak összege, súlyozva a validátorok letétbe helyezett ether-egyenlegével.

Az Ethereum a [Gasper](/developers/docs/consensus-mechanisms/pos/gasper/) nevű konszenzusmechanizmust használja, amely a [Casper FFG proof-of-stake](https://arxiv.org/abs/1710.09437) módszert a [GHOST elágazásválasztási szabállyal](https://arxiv.org/abs/2003.03052) kombinálja.

## További olvasnivaló {#further-reading}

- [Mi az a blokklánc-konszenzusalgoritmus?](https://academy.binance.com/en/articles/what-is-a-blockchain-consensus-algorithm)
- [Mit jelent a Nakamoto-konszenzus? Útmutató kezdőknek](https://blockonomi.com/nakamoto-consensus/)
- [Hogyan működik a Casper?](https://medium.com/unitychain/intro-to-casper-ffg-9ed944d98b2d)
- [A proof-of-work blokkláncok biztonságáról és teljesítményéről](https://eprint.iacr.org/2016/555.pdf)
- [Bizánci hiba](https://en.wikipedia.org/wiki/Byzantine_fault)

_Ismersz olyan közösségi anyagot, amely segített neked? Módosítsd az oldalt és add hozzá!_

## Kapcsolódó témák {#related-topics}

- [Proof-of-work](/developers/docs/consensus-mechanisms/pow/)
- [Bányászat](/developers/docs/consensus-mechanisms/pow/mining/)
- [Proof-of-stake](/developers/docs/consensus-mechanisms/pos/)
- [Proof-of-authority (jogosultsági igazolás)](/developers/docs/consensus-mechanisms/poa/)
