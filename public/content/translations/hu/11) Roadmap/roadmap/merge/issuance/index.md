---
title: Hogyan hatott az ETH kínálatra a Beolvadás
description: Részletes bemutatása annak, hogy a Beolvadás hogyan hatott az ETH kínálatára
lang: hu
---

# Hogyan hatott az ETH kínálatra a Beolvadás {#how-the-merge-impacts-ETH-supply}

A Beolvadás jelenti az Ethereum hálózatok azon változását, amikor 2022. szeptemberében áttértek a proof-of-work mechanizmusról a proof-of-stake mechanizmusra. Akkor az is megváltozott, ahogy az ETH-t kibocsátják. Korábban az új ETH két forrásból származott: a végrehajtási rétegből. (főhálózat) és a konszenzusrétegből (Beacon lánc). A Beolvadás óta a végrehajtási réteg kibocsátása nulla. Nézzük meg ennek részleteit.

## Az ETH-kibocsátás komponensei {#components-of-eth-issuance}

A ETH-kínálatot két elsődleges erő irányítja: a kibocsátás és az elégetés.

Az ETH **kibocsátása** az a folyamat, amikor olyan ETH-t hoznak létre, amely korábban nem létezett. Az ETH **elégetése** az a folyamat, amikor a létező ETH-t megsemmisítik, ezzel kivonva azt a körforgásból. A kibocsátás és elégetés rátája számos paraméter alapján kerül kiszámításra, és az ezek közötti egyensúly határozza meg az ether inflációs/deflációs rátáját.

<Card
emoji=":chart_decreasing:"
title="Az ETH-kibocsátásról röviden">

– A proof-of-stake mechanizmusra való átállás előtt a bányászok kb. 13 000 ETH-t bocsátottak ki naponta
– A letétbe helyezők kb. 1700 ETH-t adnak ki naponta, amelynek alapja 14 millió letétbe helyezett ETH
– A letétbe helyezési kibocsátás a letétbe helyezett ETH összegétől függ
– **A Beolvadás óta a napi kibocsátás 1700 ETH körüli, amely 88%-os csökkenés a korábbihoz képest**
– Az elégetés: a hálózati kereslettől függően változik. Ha egy adott napra az átlagos gázdíj legalább 16 gwei, akkor ez kiegyenlíti a validátoroknak kibocsátott 1700 ETH-t, és a nettó ETH infláció nulla vagy annál kevesebb.

</Card>

## A Beolvadás előtt (régi szisztéma) {#pre-merge}

### A végrehajtási réteg kibocsátása {#el-issuance-pre-merge}

A proof-of-work mechanizmusban a bányászok csak a végrehajtási réteggel kapcsolódtak, és blokkjutalmat kaptak, ha elsőként oldották meg a következő blokkot. A [Constantinople-frissítés](/history/#constantinople) után, 2019-től ez a jutalom 2 ETH volt blokkonként. A bányászok jutalmat szereztek akkor is, ha nem egy valid blokkot hoztak létre, amely nem került be a leghosszabb/hiteles láncba, hanem annak csak [ommer](/glossary/#ommer) vagy testvérblokkja volt. Ezek a jutalmak maximum 1,75 ETH-t értek ommerenként, és az érvényes blokk nyereségén _felül_ kerültek kibocsátásra. A bányászat egy gazdaságilag intenzív tevékenység volt, amelynek fenntartásához magas szintű ETH kibocsátásra volt szükség.

### A konszenzusréteg kibocsátása {#cl-issuance-pre-merge}

A [Beacon lánc](/history/#beacon-chain-genesis) 2020-től működik élesben. A bányászok helyett validátorok biztosították a rendszert a proof-of-stake mechanizmussal. Ezt a láncot úgy állították fel, hogy az Ethereum-felhasználók ETH-t helyeztek letétbe egy okosszerződésbe a főhálózaton (a végrehajtási rétegen), amelyet a Beacon lánc felismert és az új láncon ugyanannyit ETH-t adott a felhasználónak. A Beolvadás bevezetéséig a Beacon lánc validátorai nem kezelték a tranzakciókat és lényegében a validátor gyűjtőjének státuszáról hozták meg a konszenzust.

A Beacon láncon a validátorok ETH jutalmat kaptak azért, hogy tanúsítják a lánc státuszát és blokkokat javasolnak. A validátor teljesítménye alapján jutalmak és büntetések kerülnek kiszabásra minden korszakban (epoch, minden 6,4 percben). A validátorok jutalma **jelentősen** kevesebb, mint a bányászoké volt a proof-of-work mechanizmusban (2 ETH kb. 13,5 másodpercenként), mivel a validáló csomópont üzemeltetése nem annyira intenzív feladat, és így nem jár olyan magas jutalom érte.

### A Beolvadás előtti kibocsátás részletei {#pre-merge-issuance-breakdown}

Teljes ETH-kínálat: **~120 520 000 ETH** (a Beolvadás idején, 2022. szeptemberben)

**A végrehajtási réteg kibocsátása:**

- A becslések szerint 2,08 ETH 13,3 másodpercenként \*: **kb. 4 930 000** ETH került kibocsátásra egy évben
- Ennek eredményeként egy **hozzávetőleges 4,09%-os** inflációs ráta keletkezett (évi 4,93 millió osztva a teljes 120,5 millióval)
- \*Beleértve a kanonikus blokkokért adott 2 ETH-t, plusz az ommer blokkokért adott átlagos 0,08 ETH-t. Emellett a 13,3 másodperc az alap blokkidő, eltekintve az esetleges [nehézség bombák](/glossary/#difficulty-bomb) hatásaitól. ([Tekintse meg a forrást](https://bitinfocharts.com/ethereum/))

**A konszenzusréteg kibocsátása:**

- A teljes 14 000 000 letétbe helyezett ETH-t figyelembe véve az ETH kibocsátás kb. 1700 ETH/nap ([Tekintse meg a forrást](https://ultrasound.money/))
- Ennek eredményeként **kb. 620 500** ETH-t bocsátanak ki évente
- Ennek eredménye a **kb. 0,52%-os** inflációs ráta (évi 620,5 ezer osztva a teljes 119,3 millióval)

<InfoBanner>
<strong>Teljes éves kibocsátási ráta (a Beolvadás előtt): ~4,61%</strong> (4,09% + 0,52%)<br/><br/>
a kibocsátás <strong>kb. 88,7%-a</strong> ment a bányászoknak a végrehajtási rétegen (4,09 / 4,61 * 100)<br/><br/>
<strong>kb. 11,3%-a</strong> a letétesekhez került a konszenzusrétegen (0,52 / 4,61 * 100)
</InfoBanner>

## A Beolvadás után (jelenlegi szisztéma) {#post-merge}

### A végrehajtási réteg kibocsátása {#el-issuance-post-merge}

A Beolvadás óta a végrehajtási réteg kibocsátása nulla. A blokkokat többé nem a proof-of-work mechanizmus alapján hozzák létre a konszenzus megújított szabályai szerint. A végrehajtási réteg tevékenységeit „beacon blokkokba” csomagolják, amelyeket a proof-of-stake validátorok publikálnak és tanúsítanak. A beacon blokk tanúsításért és publikálásért járó jutalmakat a konszenzusrétegen külön kezelik.

### A konszenzusréteg kibocsátása {#cl-issuance-post-merge}

A konszenzusréteg kibocsátása ma is ugyanúgy folytatódik, mint a Beolvadás előtt, kis összegű jutalmakat ad a validátoroknak a blokkok tanúsításáért és javaslattevésért. A validátori jutalmak továbbra is _validátoregyenlegként_ gyűlnek, amelyet a konszenzusrétegen kezelnek. Ezek nem általános, a főhálózaton használható („végrehajtási”) számlák, hanem elkülönített Ethereum számlák, amelyek nem léphetnek tranzakcióba más számlákkal. Az itt tárolt pénzeszközöket csak ki lehet vonni egy meghatározott végrehajtási címre.

Ezt a visszavonási lehetőséget a Shanghai/Capella-frissítés tette lehetővé 2023. áprilisban. A letétbe helyezőket arra ösztönzik, hogy vegyék ki a _jutalmakat (a 32 ETH feletti összeget)_, mivel ezek nem járulnak hozzá a letéthez (ami maximum 32 ETH lehet).

A letétbe helyezők emellett ki is léphetnek és kivonhatják a teljes validátoregyenlegüket. Az Ethereum stabilitása érdekében az egyszerre távozó validátorok száma korlátozott.

Egy adott napon kb. a teljes validátoroknak a 0,33%-a távozhat. Alapból 4 validátor léphet ki egy korszakon (6,4 perc) belül, vagyis egy nap alatt 900. Plusz 1 validátor kiléphet akkor, ha 65 536 (2<sup>16</sup>) új validátor jön és a teljes számuk több mint 262 144 (2<sup>18</sup>). Például 327 680 validátor felett minden korszakban 5-en léphetnek ki (1125 naponta). Ha az aktív validátorok száma meghaladja a 393 216-t, akkor már 6-an léphetnek ki, és így tovább.

Ahogy több validátor vonul ki, a meglévő validátorok száma fokozatosan lecsökken a minimum négy validátorra, így megvédi a rendszert attól, hogy az ETH-letétek egyidejű kivonása miatt labilissá váljon.

### A Beolvadás utáni infláció részletezése {#post-merge-inflation-breakdown}

- Teljes ETH-kínálat: **~120 520 000 ETH** (a Beolvadás idején, 2022. szeptemberben)
- A végrehajtási réteg kibocsátása: **0**
- A konszenzusréteg kibocsátása: A fentivel megegyezik, **kb. 0,52%** éves kibocsátási ráta (14 millió letétbe helyezett ETH-szel)

<InfoBanner>
Teljes éves kibocsátási ráta: <strong>kb. 0,52%</strong><br/><br/>
Az éves ETH kibocsátás nettó csökkenése: <strong>kb. 88,7%</strong> ((4,61% – 0,52%) / 4,61% * 100)
</InfoBanner>

## <Emoji text=":fire:" size="1" /> Az elégetés {#the-burn}

Az ETH kibocsátással ellenkező erő az a ráta, ahogy az ETH-t elégetik. Az Ethereumon végrehajtandó tranzakcióért fizetni kell egy minimális díjat (alapdíj), amely állandóan változik, blokkról blokkra, a hálózati működés függvényében. Ezt a díjat ETH-ben fizetik, és _elengedhetetlen_ ahhoz, hogy egy tranzakció érvényes legyen. Ezt a díjat _elégetik_ a tranzakció végrehajtása során, így kikerül a körforgásból.

<InfoBanner>
A díj elégetése a <a href="/history/#london">London-frissítés</a> óta (2021. augusztus) működik, és a Beolvadás óta változatlan.
</InfoBanner>

A bevezetett díj elégetése mellett a validátorok büntetéseket is kaphatnak azért, ha nincsenek online, vagy ami még rosszabb, ha olyan szabályokat hágnak át, amely a hálózat biztonságát veszélyeztetik, akkor az súlyos büntetéssel és kizárással jár. Ezek a büntetések lecsökkentik az ETH-t a validátor számláján, ami utána nem kerül máshova, tehát lényegében kivonják a forgalomból vagy elégetik.

### A deflációhoz szükséges átlagos gázdíj kiszámítása {#calculating-average-gas-price-for-deflation}

Az ETH kibocsátása egy adott napon a teljese letétbe helyezett ETH-től függ. A jelen leírás idején ez kb. 1700 ETH/nap.

Ahhoz, hogy meghatározzuk azt az átlagos gázdíjat, ami ellensúlyozza ezt az ETH-kibocsátást egy 24 órás periódusban, először kiszámoljuk a blokkok számát az adott napon, tekintve, hogy a blokkidő 12 másodperc:

- `(1 blokk / 12 másodperc) * (60 másodperc/perc) = 5 blokk/perc`
- `(5 blokk/perc) * (60 perc/óra) = 300 blokk/óra`
- `(300 blokk/óra) * (24 óra/nap) = 7200 blokk/nap`

Minden blokk a `15x10^6 gáz/blokk` összeget célozza ([Bővebben a gázról](/developers/docs/gas/)). Ez alapján kiszámolhatjuk az átlagos gázdíjat (gwei/gáz), ami kiegyensúlyozza az ETH-kibocsátást, a napi kibocsátást 1700 ETH-nek véve:

- `7200 blokk/nap * 15x10^6 gáz/blokk *`**`Y gwei/gáz`**`* 1 ETH/ 10^9 gwei = 1700 ETH/nap`

Megoldva az `Y-ra`:

- `Y = (1700(10^9))/(7200 * 15(10^6)) = (17x10^3)/(72 * 15) = 16 gwei` (két számjegyre kerekítve)

Egy másik módon rendezve ezt egy `X` változót tehetünk az `1700` helyére, ami a napi ETH-kibocsátás, a többit pedig leegyszerűsítve:

- `Y = (X(10^3)/(7200 * 15)) = X/108`

Leegyszerűsíthetjük úgy, hogy az `X` függvényét írjuk fel:

- `f(X) = X/108`, ahol `X` a napi ETH-kibocsátás, és az `f(X)` jelenti gwei/gáz árat, amely ellensúlyozni tudja az újonnan kibocsátott ETH-t.

Tehát ha az `X` (napi ETH kibocsátás) megnövekszik 1800-ra a teljes letétbe helyezett ETH alapján, `f(X)` (gwei, amivel kiegyensúlyozható a kibocsátás) ekkor `17 gwei` lesz (2 számjegyre kerekítve)

## További olvasnivaló {#further-reading}

- [A beolvadás](/roadmap/merge/)
- [Ultrasound.money](https://ultrasound.money/) – _Dashboardok az ETH-kibocsátás és -elégetés valós idejű vizualizációjára_
- [Az Ethereum-kibocsátás grafikonos ábrázolása](https://www.attestant.io/posts/charting-ethereum-issuance/) – _Jim McDonald 2020._
