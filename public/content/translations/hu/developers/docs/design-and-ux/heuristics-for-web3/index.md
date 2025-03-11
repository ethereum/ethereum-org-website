---
title: 7 heurisztika a web3-interfész dizájnjához
description: A web3 felhasználhatóságának fejlesztési elvei
lang: hu
---

A használhatósági heurisztikák amolyan ökölszabályok, melyekkel felmérhető egy oldal használhatósága.
Az itt felsorolt 7 heurisztikát kifejezetten web3-ra alakították ki és érdemes együtt használni Jakob Nielsen [10 általános elv az interakciós dizájnhoz](https://www.nngroup.com/articles/ten-usability-heuristics/) iránymutatásával.

## Hét használati heurisztika web3-ra {#seven-usability-heuristics-for-web3}

1. A visszajelzés a cselekvést követi
2. Biztonság és megbízhatóság
3. A legfontosabb információ egyértelmű legyen
4. Érthető szóhasználat
5. A műveletek a lehető legrövidebbek legyenek
6. A hálózati kapcsolódás látható és rugalmas legyen
7. Az alkalmazásból legyen irányítható, nem a tárcából

## Definíciók és példák {#definitions-and-examples}

### 1. A visszajelzés a cselekvést követi {#feedback-follows-action}

**Egyértelmű legyen, amikor történt vagy éppen történik valami.**

A felhasználók a következő lépéseiket az előzők eredménye alapján teszik meg. Ezért lényeges, hogy mindig ismerjék a rendszer jelen állapotát. Ez még fontosabb a web3-ban, mert a tranzakcióknak sokszor kevés idő kell, hogy véglegesedjenek a blokkláncban. Ha nincs visszajelzés, akkor elbizonytalanodnak, hogy megtörtént-e.

**Tippek:**

- Tájékoztassa a felhasználót üzenetek és figyelmeztetések révén.
- Egyértelműen közölje a várakozási időt.
- Ha egy akció néhány másodpercnél hosszabb ideig tart, biztosítson a felhasználónak egy számlálót vagy animációt, hogy tudja, éppen folyamatban van a kérése.
- Ha több lépésből áll a folyamat, akkor mutassa az összeset.

**Például:**
Ha megmutatja a folyamat összes lépését, akkor a felhasználó tudja, hogy hol tart. A megfelelő ikonok segítenek megérteni, hogy milyen állapotban vannak a műveleteik.

![Tájékoztassa a felhasználót minden lépésről, amikor tokeneket vált](./Image1.png)

### 2. A biztonság és a megbízhatóság legyen beégetve itt: {#security-and-trust-are-backed-in}

A biztonság alapvető prioritás, és ezt a felhasználóval is tudatni kell.
Az emberek számára fontosak az adataik. A biztonság mindig a legfontosabb a felhasználónak, ezért a dizájn minden szintjén figyelembe kell venni. Mindig el kell nyerni a felhasználók bizalmát, ami különféle alkalmazásoknál mást jelenthet. Ne utólag gondoljon rá, hanem tervezze bele tudatosan. A teljes felhasználói élmény során bizalmat kell kiépíteni, beleértve a közösségi csatornákat, a dokumentációt és a végső felhasználói felületet is. A decentralizáció szintje, a pénzeszközök többaláírásos kezelése és az, hogy a csapatot lenyomozták-e a nyilvános fórumokon, mind befolyásolják a felhasználók bizalmát.

**Tippek:**

- Mutassa meg büszkén az auditokat
- Tegyen szert több auditra
- Reklámozza a biztonsági jellemzőket, melyeket kialakított
- Jelezze a felmerülő kockázatokat, beleértve a mögöttes integrációkat is
- Kommunikálja a stratégiák összetett voltát
- Vegye figyelembe a nem felhasználói felülettel kapcsolatos gondokat, melyek befolyásolják a felhasználók biztonságérzetét

**Példa:**
Tüntesse fel az auditot a láblécben, feltűnő méretben.

![A honlap láblécében feltüntetett auditok](./Image2.png)

### 3. A legfontosabb információk legyenek egyértelműk {#the-most-important-info-is-obvious}

A bonyolult rendszerek esetében csak a legfontosabb adatokat mutassa. Határozza meg, hogy mi a legfontosabb, és azt vegye előre a bemutatásban.
A túl sok információ túlterheli a felhasználókat, akik általában egy információdarabot vesznek figyelembe a döntésnél. A DeFi esetében ez az információ valószínűleg a THM a jövedelmet hozó alkalmazásoknál, illetve a hitelfedezet (LTV) a kölcsönadó alkalmazásoknál.

**Tippek:**

- A felhasználókat megvizsgálva kiderül, mi a legfontosabb mérőszám
- Legyen a kulcsinformáció nagy, a többi pedig kicsi és diszkrét
- Az emberek nem olvassák el, hanem átfutják a dolgokat, ezért legyen a dizájn jól átfutható

**Példa:** A nagy tokeneket színesben könnyebb megtalálni az átfutás közben. A THM legyen nagy és hangsúlyos színű.

![Könnyű megtalálni a tokent és a THM-et](./Image3.png)

### 4. Érthető szóhasználat {#clear-terminology}

A szóhasználat legyen érthető és helyénvaló.
A technikai zsargon nagy akadály lehet, mert egy teljesen új gondolkodási módot igényel. A felhasználók ekkor nem tudják hozzákapcsolni a dizájnt az általuk már ismert szavakhoz, mondatokhoz és koncepciókhoz. Minden zavaró és ismeretlen, és a tanulási görbe nagyon meredek, mire eljutnak addig, hogy használni próbálják. A felhasználó azért fordul a DeFi-hoz, hogy megtakarítson egy kis pénzt, és azt látja, hogy: bányászat, gazdálkodás, letétbe helyezés, kibocsátás, vesztegetés, megőrzés, széfek, veTokenek, megszerzés, korszakok, decentralizált algoritmusok, protokoll által birtokolt likviditás…
Használjon egyszerű kifejezéseket, amelyeket bárki megérthet. Ne találjon ki teljesen új szavakat az adott projekthez.

**Tippek:**

- Használjon egyszerű és konzisztens terminológiát
- Használjon ismert szavakat, amennyire lehetséges
- Ne találjon ki új kifejezéseket
- Kövesse a koncenciókat, ahogy megjelennek
- Tanítsa a felhasználókat, amennyire csak lehetséges

**Példa:**
„Az Ön jutalma” egy széles körben érthető, semleges kifejezés; nem egy új szó az adott projekthez. Ha a jutalmat USD-ben mutatja, akkor az kapcsolódni tud a meglévő gondolkodási sémákhoz, még akkor is, ha a jutalom másik tokenben van.

![Token jutalmak, amerikai dollárban megmutatva](./Image4.png)

### 5. A műveleteknek a lehető legrövidebbnek kell lenniük {#actions-are-as-short-as-possible}

Gyorsítsa fel a felhasználó interakcióját azzal, hogy csoportosítja az műveleteket.
Ezt az okosszerződés szintjén, vagy akár a felhasználói felület szintjén is meg lehet tenni. A felhasználónak ne kelljen a rendszer egyik részéről a másikra navigálnia – vagy akár elhagynia azt –, hogy teljesítsen egy átlagos műveletet.

**Tippek:**

- Kombinálja a jóváhagyást más műveletekkel, ha lehet
- Csoportosítsa az aláírásokat közel egymáshoz

**Példa:** A likviditás hozzáadása és a letétbe helyezés két olyan művelet, melyet összevonva felgyorsul a használat és egyszerre spórol időt és gázt a felhasználónak.

![Átváltás, ahol kombinálni lehet a letéti és staking művelet](./Image5.png)

### 6. A hálózati kapcsolódás látható és rugalmas {#network-connections-are-visible-and-flexible}

Tájékoztassa a felhasználót, hogy milyen hálózathoz kapcsolódik, és adjon egyértelmű lehetősége ennek módosítására.
Ez rendkívül fontos a több láncon működő alkalmazásoknál. Az alkalmazás főbb funkciói akkor is legyenek láthatók, ha a felhasználó nem kapcsolódik hálózathoz, vagy olyanhoz kapcsolódik, ami nem támogatott.

**Tippek:**

- Mutasson meg az alkalmazásból annyit, amennyit csak lehet, miközben a felhasználó nincs hálózathoz kapcsolódva
- Mutassa meg, hogy a felhasználó melyik hálózathoz kapcsolódik
- Ne hagyja, hogy a felhasználónak a tárcához kelljen navigálnia a hálózat átváltásához
- Ha az alkalmazáshoz hálózatot kell váltani, akkor az tegye az alkalmazásból
- Ha az alkalmazás több piacot vagy helyet tartalmaz számos hálózattal, akkor legyen egyértelmű a felhasználónak, hogy éppen mit lát

**Példa:** Mutassa meg a felhasználónak, hogy melyik hálózathoz kapcsolódik, és hogy ezt módosítani tudja az alkalmazásban.

![Legördülő gomb mutatja a hálózati kapcsolatot](./Image6.png)

### 7. Az alkalmazásból irányítható, nem a tárcából {#control-from-the-app-not-the-wallet}

A felhasználói felület olyan legyen, hogy a felhasználó mindent tudjon és mindent irányíthasson, amire szükség van.
Web3-ban vannak bizonyos műveletek, amelyek a felhasználói felülethez, mások a tárcához tartoznak. Általában a felhasználói felület az, ahol a műveletek elindul, és a tárcában erősítik meg azt. A felhasználó összezavarodik, ha ez a kettő nincs jól összehangolva.

**Tippek:**

- Közölje a rendszer státuszát a felhasználói felületen visszajelzés formájában
- Mentse az előzményeket
- Legyen összekapcsolva a blokkfelfedezőkkel a korábbi tranzakciók miatt
- Legyen egyszerű a hálózat átváltása.

**Példa:** Egy konténer mutatja a felhasználónak, hogy milyen tokenek vannak a tárcájában, a fő CTA pedig lehetőséget ad a hálózat átváltására.

![Fő CTA feldobja a hálózat átváltásának lehetőségét](./Image7.png)
