---
title: Blokk felfedezők
description: Egy bevezetés a blokkfelfedezőkbe, a blokklánc adatok portáljába, ahol információs lekérdezéseket indíthatsz tranzakciókról, számlákról, szerződésekről és más egyébről.
lang: hu
sidebarDepth: 3
---

A blokkfelfedezők a portálod az Ethereum adataihoz. Használatukkal valós idejű adatokat kaphat a blokkokról, tranzakciókról, validátorokról, számlákról és más on-chain tevékenységekről.

## Előfeltételek {#prerequisites}

Először meg kellene értened az Ethereum alapvető fogalmait ahhoz, hogy értelmezni tudd az adatokat, melyet egy blokkfelfedező biztosít neked. Kezdjen itt: [bevezetés az Ethereumba](/developers/docs/intro-to-ethereum/).

## Szolgáltatások {#services}

- [Etherscan](https://etherscan.io/) –_ elérhető kínai, koreai, orosz és japán nyelven is_
- [3xpl](https://3xpl.com/ethereum)
- [Beaconcha.in](https://beaconcha.in/)
- [Blockchair](https://blockchair.com/ethereum) –_ Spanyol, francia, olasz, holland, portugál, orosz, kínai és fárszi nyelven is elérhető_
- [Blockscout](https://eth.blockscout.com/)
- [Chainlens](https://www.chainlens.com/)
- [DexGuru Block Explorer](https://ethereum.dex.guru/)
- [Etherchain](https://www.etherchain.org/)
- [Ethernow](https://www.ethernow.xyz/)
- [Ethplorer](https://ethplorer.io/) –_Kínai, spanyol, francia, török, orosz, koreai és vietnámi nyelven is elérhető_
- [EthVM](https://www.ethvm.com/)
- [OKLink](https://www.oklink.com/eth)
- [Rantom](https://rantom.app/)

## Nyílt forráskódú eszközök {#open-source-tools}

- [Otterscan](https://otterscan.io/)
- [lazy-etherscan](https://github.com/woxjro/lazy-etherscan)

## Adat {#data}

Az Ethereum tervezése folytán transzparens, így minden ellenőrizhető. A blokkfelfedezők egy felületet biztosítanak, hogy ez az információ elérhető legyen. És ez igaz az Ethereum főhálózatára és a teszt hálózatokra, ha szükséged van az adatokra. Az adatok végrehajtási adatokra és konszenzusadatokra oszthatók. A „végrehajtási adatok” megnevezés egy konkrét blokkban végrehajtott tranzakciókra vonatkoznak. A „konszenzusadatok” megnevezés magukra a blokkokra és a blokkokat előterjesztő validátorokra vonatkozik.

Itt egy összefoglaló azokról az adatokról, melyet egy blokkfelfedezőről megszerezhetsz.

### Végrehajtási adatok {#execution-data}

Az Ethereum hálózata minden 12 másodpercben új blokkal bővül (kivéve, ha a blokkelőterjesztő elszalasztja a lehetőségét), így van egy közel állandó adatfolyam, amely hozzáadódik a blokkfelfedezőkhöz. A blokkok sok fontos adatot tartalmaznak, melyeket hasznosnak találhatsz:

**Standard adat**

- Blokkmagasság – a blokklánc hossza és a benne foglalt blokkok száma (blokkokban kifejezve) az aktuális blokk létrehozásakor.
- Időbélyegző – a blokkjavaslat megjelenésének időpontja.
- Tranzakciók – a blokkban foglalt tranzakciók száma.
- Díj címzettje – az a cím, amely a tranzakciókból származó gasdíjtételeket megkapta.
- Blokkjutalom – a blokkot előterjesztő validátornak megítélt ETH-összeg.
- Méret – a blokkban foglalt adat mérete (bájtban kifejezve).
- Felhasznált gas – a teljes gasmennyiség, amelyet a blokkban foglalt tranzakciók felhasználtak.
- Gaskorlátozás – a blokkban foglalt tranzakciók által beállított teljes gaskorlátozás.
- Alapdíj/gas – az a minimumszorzó, amely egy tranzakció felvételéhez szükséges az adott blokkba.
- Elégetett díjak – a blokkban elégetett ETH mennyisége.
- Extra adat – Bármely extra adat, amelyet a blokképítő belefoglalt a blokkba

**Haladó adat**

- Hash – a kriptográfiai hash, amely a blokkfejlécét adja (a blokk egyedi azonosítója).
- Anyahash – az aktuális blokk előtt kiadott blokk hashértéke.
- StateRoot – A Merkle-fa gyökérhash-értéke, amely a rendszer teljes állapotát tárolja.

### Üzemanyag {#gas}

A blokkfelfedezők nemcsak a tranzakciók és blokkok gasfelhasználásáról adnak információt, hanem némelyik a hálózat aktuális gasárairól is tájékoztat. Ez segít megérteni a hálózathasználatot, biztonságos tranzakciókat indítani, és nem túlkölteni a gast. Keressen olyan API-kat, amelyek segítenek felvinni ezt az információt a terméke felületére. A gasspecifikus adat a következőket fedi le:

- A biztonságos, de lassú tranzakcióhoz szükséges gasmennyiség becslése (+ becsült ár és idő)
- Az átlagos tranzakcióhoz szükséges gasmennyiség becslése (+ becsült ár és idő)
- A gyors tranzakcióhoz szükséges gasmennyiség becslése (+ becsült ár és idő)
- Átlagos megerősítési idő a gasár alapján
- gasfogyasztó szerződések – más szóval olyan népszerű termékek, amelyeket sokat használnak a hálózaton.
- gasköltő számlák – más szóval a rendszeres hálózathasználók.

### Tranzakciók {#transactions}

A blokkfelfedezők bevett eszközzé váltak az emberek kezében, hogy nyomon kövessék a tranzakcióik alakulását. Ennek az az oka, hogy az elérhető részletesség extra bizonyosságot nyújt. A tranzakcióadatok a következőket tartalmazzák:

**Standard adatok**

- Tranzakcióhash – a tranzakció elküldésekor a rendszer által generált hashérték.
- Állapot – jelzés arról, hogy a tranzakció függőben van, meghiúsult vagy sikeres volt.
- Blokk – a blokk, amely a tranzakciót tartalmazza.
- Időbélyegző – Annak időpontja, amikor a tranzakció bekerült a blokkba, melyet a validátor javasolt
- Feladó (From) – a tranzakciót elküldő számla címe.
- Címzett (To) – a fogadó fél vagy az okosszerződés címe, amellyel a tranzakció interakcióba lép.
- Átutalt tokenek – olyan tokenekből álló lista, amelyek át lettek utalva a tranzakcióban.
- Érték – Az átutalt ETH összértéke.
- Tranzakciós díj – A validátornak fizetett összeg, hogy feldolgozza a tranzakciót (számítása: gázár * felhasznált gáz)

**Részletes adatok**

- Gaskorlátozás – a gasegységek maximális száma, amelyet ez a tranzakció elfogyaszthat.
- Felhasznált gas – a tényleges gasmennyiség, amelyet ez a tranzakció elfogyasztott.
- Gasár – egy gasegységre beállított ár.
- Nonce – a `from` cím tranzakciószáma (ne feledje, hogy a számozás nullánál kezdődik, így a `100`-as nonce valójában az adott számláról küldött 101. tranzakciót jelenteni).
- Bemeneti adat – a tranzakció által megkövetelt bármely extra adat.

### Számlák {#accounts}

Egy adott számláról rengeteg adat elérhető. Ezért gyakran javasoljuk több számla használatát, hogy az eszközök és az érték ne legyen könnyen követhető. Vannak azonban fejlesztés alatt álló megoldások, amelyek nagyobb védelmet nyújtanak a tranzakció- és számlaadatoknak. De most nézzük meg a számlákról elérhető adatokat:

**Felhasználói számlák**

- Számlacím – a nyilvános cím, amelyre pénzt küldhet.
- ETH egyenleg – a számlához tartozó ETH mennyisége.
- Teljes ETH érték – az ETH értéke.
- Tokenek – a számlához tartozó tokenek és értékeik.
- Tranzakciótörténet – az összes tranzakciót tartalmazó lista, ahol a számla volt a küldő vagy a címzett.

**Okosszerződések**

Az okosszerződés-számlák rendelkeznek az összes adattal, amivel a felhasználói számlák is, de némelyik blokkfelfedező némi kódinformációt is szolgáltat. Többek között például:

- Szerződés létrehozója – a cím, amelyik feltöltötte a szerződést a fő hálózatra.
- Létrehozó tranzakció – a tranzakció, amely tartalmazta a telepítést a fő hálózatra.
- Forráskód – az okosszerződés solidity vagy vyper kódja.
- Szerződés ABI – a szerződés Application Binary Interface-e (alkalmazásprogramozói interfésze) – a szerződés általi hívásokat és a kapott adatokat tartalmazza.
- Szerződés létrehozási kódja – az okosszerződés lefordított bájtkódja – akkor jön létre, amikor Ön Solidityben vagy Vyperben stb. írt okosszerződést fordít.
- Szerződésesemények – az okosszerződésben lehívott módszerek előzményei. Alapvetően azt mutatja meg, hogyan és milyen gyakran használják a szerződést.

### Tokenek {#tokens}

A token egy szerződéstípus, így az okosszerződésekhez hasonló adatokkal rendelkezik. De mivel van értéke és lehet vele kereskedni, ezért további adatpontjai is vannak:

- Típus – lehet ERC-20, ERC-721 vagy más tokenszabvány.
- Árfolyam – ha egy ERC-20, akkor van aktuális piaci értéke.
- Piaci kapitalizáció – ha ERC-20, akkor van piaci kapitalizációja (számítása: árfolyam × teljes kínálat).
- Teljes kínálat – a forgalomban lévő tokenek száma.
- Tulajdonosok – a tokent birtokló címek száma.
- Átutalások – a számlák közötti tokenátutalások esetszáma.
- Tranzakciótörténet – az adott tokent tartalmazó összes korábbi tranzakció.
- Szerződéscím – a fő hálózatra feltelepített token címe.
- Tizedesjegyek – az ERC-20 tokenek oszthatók és vannak tizedes helyeik.

### Hálózat {#network}

Egyes blokkadatok holisztikusabb módon foglalkoznak az Ethereum-hálózat egészségével.

- Összes tranzakció – az Ethereum létrehozása óta végbement összes tranzakció száma.
- Tranzakció/másodperc – az egy másodperc alatt feldolgozható tranzakciók száma.
- ETH-árfolyam – 1 ETH aktuális értéke.
- Teljes ETH-kínálat – a forgalomban lévő ETH-mennyiség – ne feledje, hogy minden egyes blokk létrejöttével új ETH jön létre blokkjutalom formájában.
- Piaci kapitalizáció – számítása: árfolyam × kínálat.

## Konszenzusréteg-adatok {#consensus-layer-data}

### Korszak {#epoch}

Biztonsági okokból minden korszak végén (vagyis 6,4 percenként) véletlenszerűen összeállított validátorbizottságok jönnek létre. A korszakadatok a következőket tartalmazzák:

- Korszak száma
- Véglegesített állapot – véglegessé vált-e a korszak (Igen/Nem).
- Idő – az idő, amikor véget ért a korszak.
- Tanúsítások – a korszakon belüli tanúsítások száma (szavazás blokkokra a slotokon belül).
- Letétek – a korszakban foglalt ETH-letétek száma (a validátoroknak ETH-t kell letenniük, hogy validátorok lehessenek).
- Megvágások – a blokkelőterjesztőknek és tanúsítóknak kirótt büntetések száma.
- Szavazási részvétel – a letétbe helyezett ETH-mennyiség, amelyet blokktanúsításra használtak.
- Validátorok – a korszakban aktív validátorok száma.
- Átlagos validátoregyenleg – az aktív validátorok átlagos egyenlege.
- Slotok – a korszakban lévő slotok száma (a slotok egy érvényes blokkot tartalmaznak).

### Slot {#slot}

A slotok blokklétrehozási lehetőségek. Az egyes slotokra elérhető adat a következőket tartalmazza:

- Korszak – a korszak, amelyben érvényes a slot.
- Slot száma
- Állapot – a slot állapota (javasolt/kihagyott).
- Idő – a slot időbélyegzője.
- Előterjesztő – a validátor, aki javasolta a blokkot a slotba.
- Blokkgyökér – a BeaconBlock hash-fa-gyökere.
- Anyagyökér – a megelőző blokk hashértéke.
- Állapotgyökér – a BeaconState hash-fa-gyökere.
- Aláírás
- Randao megjelenítés
- Graffiti – a blokkelőterjesztő belefoglalhat egy 32 bájt hosszú üzenetet a blokkjavaslatába.
- Végrehajtási adatok
  - Blokkhash
  - Letétszám
  - Letétgyökér
- Tanúsítások – a tanúsítások száma a slotban erre a blokkra.
- Letétek – a letétek száma a slot alatt.
- Önkéntes kilépők – a kilépő validátorok száma a slot alatt.
- Megvágások – a blokkelőterjesztőknek és tanúsítóknak kirótt büntetések száma.
- Szavazatok – a validátorok, akik a blokkra szavaztak ebben a slotban.

### Blokkok {#blocks-1}

A proof-of-stake mechanizmus az időt slotokra és korszakokra osztja. Tehát ez új adatokat jelent!

- Előterjesztő – az a validátor, akit algoritmussal választott ki a rendszer, hogy új blokkra tegyen javaslatot.
- Korszak – a korszak, amelyben a blokkot előterjesztették.
- Slot – a slot, amelyben a blokkot előterjesztették.
- Tanúsítások – a slotban foglalt tanúsítások száma. A tanúsítások olyanok, mint a szavazatok, amelyek azt jelzik, hogy a blokk már továbbítható a Beacon láncra.

### Validátorok {#validators}

A validátorok felelnek a blokkok előterjesztéséért és tanúsításáért a slotokon belül.

- Validátorszám – egyedi szám, amely a validátort jelöli.
- Aktuális egyenleg – a validátor egyenlege a jutalmakkal együtt.
- Tényleges egyenleg – a validátor letéthez használt egyenlege.
- Bevétel – a validátor által kapott jutalmak vagy büntetések.
- Állapot – éppen online és aktív a validátor, vagy sem.
- Tanúsítási hatékonyság – az átlagos idő, amely a validátor tanúsításának lánchoz adásához szükséges.
- Aktiválási jogosultság – dátum (és korszak), amikor a validátor számára elérhetővé vált a validálás.
- Aktív ettől – dátum (és korszak), amikor a validátor aktívvá vált.
- Javasolt blokkok – a validátor által előterjesztett blokkok.
- Tanúsítások – a validátor által biztosított tanúsítások.
- Letétek – a küldő címe, a tranzakció hashértéke, a blokk száma, időbélyegzője, a validátori letét összege és állapota.

### Tanúsítások {#attestations}

A tanúsítások „igen” szavazatok arra, hogy a blokkot a lánchoz adják. Az adataik kapcsolódnak a tanúsítások nyilvántartásához és a tanúsító validátorokhoz.

- Slot – a slot, amelyben a tanúsítás történt.
- Bizottságindex – a bizottság indexe az adott slotban.
- Összesítő bitek – az aggregált tanúsítást mutatja a tanúsításban részt vevő minden validátorra.
- Validátorok – a tanúsításokat szolgáltató validátorok.
- Beacon-blokkgyökér – arra a blokkra mutat, amelyet a validátorok tanúsítanak.
- Forrás – a legutolsó igazolt korszakra mutat.
- Cél – a legutolsó korszakhatárra mutat.
- Aláírás

### Hálózat {#network-1}

A konszenzusréteg felső szintű adatai a következők:

- Aktuális korszak
- Aktuális slot
- Aktív validátorok – aktív validátorok száma.
- Függőben lévő validátorok – az aktiválásra váró validátorok száma.
- Letétbe helyezett ETH – a hálózaton letétbe helyezett ETH-mennyiség.
- Átlagos egyenleg – a validátorok átlagos ETH-egyenlege.

## Blokk felfedezők {#block-explorers}

- [Etherscan](https://etherscan.io/) – egy blokkfelfedező, amelyben adatokat kérhet le az Ethereum-főhálózatról és a Goerli tesztelőhálózatról.
- [3xpl](https://3xpl.com/ethereum) - reklámmentes nyílt forráskódú Ethereum felfedező, melyből le lehet tölteni az adatokat
- [Beaconcha.in](https://beaconcha.in/) – egy nyílt forráskódú blokkfelfedező az Ethereum főhálózatra és a Goerli teszthálózatra
- [Blockchair](https://blockchair.com/ethereum) – a legdiszkrétebb Ethereum-felfedező. Alkalmas (memóriakészlet) adatok szűrésére és válogatására is
- [Etherchain](https://www.etherchain.org/) – egy Ethereum-főhálózati blokkfelfedező
- [Ethplorer](https://ethplorer.io/) – egy blokkfelfedező, amely az Ethereum-főhálózaton és a Kovan tesztelőhálózaton található tokenekre fókuszál
- [Rantom](https://rantom.app/) – egy felhasználóbarát, nyílt forráskódú DeFi- és NFT-tranzakciómegtekintő a részletesebb betekintéshez
- [Ethernow](https://www.ethernow.xyz/) – egy valós idejű tranzakciókereső, amely lehetővé teszi az Ethereum főhálózat lánc előtti rétegének megtekintését

## További olvasnivaló {#further-reading}

_Ismer olyan közösségi információforrást, amely a hasznára vált? Módosítsa az oldalt, és adja hozzá!_

## Kapcsolódó témák {#related-topics}

- [Tranzakciók](/developers/docs/transactions/)
- [Fiókok](/developers/docs/accounts/)
- [Hálózatok](/developers/docs/networks/)
