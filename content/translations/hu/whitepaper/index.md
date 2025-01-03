---
title: Ethereum fehérkönyv
description: Az Ethereum működéséről szóló kiadvány, melyet 2013-ban adtak ki az indulása előtt.
lang: hu
sidebarDepth: 2
hideEditButton: true
---

# Ethereum fehérkönyv {#ethereum-whitepaper}

_Ezt a bemutató kiadványt eredetileg 2014-ban adta ki Vitalik Buterin, az [Ethereum](/what-is-ethereum/) alapítója, a projekt 2015-ös indulása előtt. Fontos megjegyezni, hogy az Ethereum sok másik közösség által vezetett, nyílt forráskódú szoftver projekthez hasonlóan, a kezdeti elindulás óta fejlődött._

_Noha több éve íródott, fenntartjuk ezt a kiadványt, mert továbbra is hasznos referenciaként szolgál és pontos ábrázolást mutat az Ethereumról és annak jövőképéről. Ha többet szeretne megtudni az Ethereum legutóbbi fejlesztéseiről és az általunk elvégzett protokollváltoztatásokról, akkor ezt az [útmutatót](/learn/) ajánljuk._

[Azoknak a kutatóknak és egyetemi oktatóknak, akik a (2014. decemberi) fehérkönyv előzmény- vagy kanonikus változatát keresik, érdemes ezt a PDF-et használni.](./whitepaper-pdf/Ethereum_Whitepaper_-_Buterin_2014.pdf)

## Okosszerződés- és decentralizált alkalmazásplatform következő generációja {#a-next-generation-smart-contract-and-decentralized-application-platform}

Satoshi Nakamoto 2009-ben történő Bitcoin fejlesztését gyakran a pénz és a pénznem radikális fejlesztésének nevezték, ez az első példa egy olyan digitális eszközre, amelynek egyszerre nincs mögöttes vagy [belső értéke](http://bitcoinmagazine.com/8640/an-exploration-of-intrinsic-value-what-it-is-why-bitcoin-doesnt-have-it-and-why-bitcoin-does-have-it/), valamint nincs központi kibocsájtója vagy irányítója. A Bitcoin kísérlet másik – vitathatatlanul fontosabb – része azonban az alapjául szolgáló blokklánc-technológia, mint az elosztott konszenzus eszköze, és a figyelem gyorsan elkezdett áttérni ezen másik aspektusra. A blokklánc-technológiát alternatív módon alkalmazzák arra, hogy a blokkláncra épülő digitális eszközök egyéni valutákat és pénzügyi eszközöket ([színes érmék](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit)), fizikai eszköz tulajdonjogát ([okosingatlan](https://en.bitcoin.it/wiki/Smart_Property)), nem helyettesíthető eszközöket, például domainneveket ([Namecoin](http://namecoin.org)) képviselnek, emellett összetettebb alkalmazásokat működtetnek, amelyekben a digitális eszközöket közvetlenül egy tetszőleges szabályokat végrehajtó kódrészlet irányítja ([okosszerződések](http://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/idea.html)), vagy akár blokkláncalapú [decentralizált autonóm szervezeteket (DAO)](http://bitcoinmagazine.com/7050/bootstrapping-a-decentralized-autonomous-corporation-part-i/) is alapíthatnak. Az Ethereum egy olyan beépített, teljesen kidolgozott Turing-teljes programozási nyelvvel rendelkező blokkláncot szeretne nyújtani, amely olyan „szerződések” létrehozására használható, amelyek tetszőleges státuszváltozási funkciók kódolására használhatók, lehetővé téve a felhasználók számára a fent leírt rendszerek bármelyikének létrehozását, valamint sok olyan más dolgot is, amelyre még nem gondoltunk, egyszerűen pár sornyi kódba foglalva az adott logikát.

## Bevezetés a Bitcoinba és kapcsolódó koncepciókba {#introduction-to-bitcoin-and-existing-concepts}

### Előzmények {#history}

A decentralizált digitális valuta, valamint az alternatív alkalmazások, például az ingatlannyilvántartások fogalma évtizedek óta létezik. Az 1980-as és 1990-es évek anonim e-cash protokolljai, melyek főleg a Chaum-féle vakításként ismert kriptográfiai primitívre támaszkodtak, egy magas fokú adatvédelemmel rendelkező valutát kínáltak, de a protokolloknak többnyire nem sikerült elterjedniük, mivel egy centralizált közvetítőre támaszkodtak. 1998-ban Wei Dai [b-money](http://www.weidai.com/bmoney.txt) pénze volt az első javaslat a pénz létrehozására számítási kirakósok megoldásával és decentralizált konszenzussal, de nem igazán volt kidolgozva az a része, hogy miként lehetne az utóbbit megvalósítani a gyakorlatban. 2005-ben Hal Finney bemutatta az [újrafelhasználható proof of work-öket (munkabizonyítékokat)](https://nakamotoinstitute.org/finney/rpow/), egy olyan rendszert, amely a b-money pénzből származó ötleteket és Adam Back számítási szempontból nehéz Hashcash rejtvényeit használta fel a kriptovaluta koncepciójának megalkotására, de az ideálistól elmaradt azáltal, hogy egy megbízható számítási háttérre támaszkodott. Először 2009-ben vezetett be Satoshi Nakamoto a gyakorlatban egy decentralizált valutát, amely egyesítette az alapként szolgáló létező primitíveket a tulajdonjog nyilvánoskulcs-kriptográfiával történő kezelésére – egy konszenzus algoritmussal – az érmék tulajdonosainak számontartására, amelyet „proof-of-worknek” (munkabizonyíték) nevezünk.

A proof-of-work mögötti mechanizmus egy áttörés volt, mivel egyszerre két problémára is megoldást nyújtott. Egyrészt egy olyan egyszerű és mérsékelten hatékony konszenzusalgoritmust biztosított, amely lehetővé teszi a hálózat csomópontjainak, vagyis a résztvevő számítógépeknek (csomópontoknak), hogy kollektíven egyetértsenek a Bitcoin főkönyvi állapotának kanonikus frissítéseiről. Másrészt egy olyan mechanizmust biztosított, amely szabad belépést tett lehetővé abba a konszenzusfolyamatba, amely megoldja annak a politikai problémának az eldöntését, hogy ki befolyásolja a konszenzust, emellett a Sybil-támadásokat is megelőzi. Ehhez a részvétel formális akadályát – mint például egy listán egyedi entitásként való nyilvántartás követelményét – gazdasági akadályokkal helyettesíti: egy résztvevő csomópont súlya a konszenzusos szavazási folyamatban közvetlenül arányos azzal a számítási erővel, amivel a csomópont rendelkezik. Azóta javaslattétel is született egy alternatív megközelítésre, amelyet _proof-of-stake-nek_, azaz letéti bizonyítéknak neveznek, mivel a hálózaton résztvevő számítógép vagy csomópont súlyozását a valuta letétbe helyezésének arányában számítja ki, nem a számítási kapacitása alapján; a két megközelítés relatív előnyeinek megvitatása túlmutat a cikk keretein, ugyanakkor mindkét megközelítés felhasználható egy kriptovaluta alapjaként.

### Bitcoin mint egy státuszváltozási rendszer {#bitcoin-as-a-state-transition-system}

![Ethereum állapot átmenet](./ethereum-state-transition.png)

Technikai szempontból egy kriptovaluta, például a Bitcoin főkönyve egy státuszváltozási rendszernek tekinthető, ahol van egy státusz, amely számon tartja az összes létező bitcoin tulajdonosi állapotát, és egy státuszváltozási függvény, ami a státusz és a tranzakció hozzáadásával egy új státuszt eredményez. Például egy szabályos banki rendszerben a státusz a vagyonmérlegnek felel meg, a tranzakció egy kérvény $X összeg átmozgatására A-ból B-be, a státuszváltozási függvény pedig csökkenti A számlájának értékét $X összeggel és növeli B számlájának értékét $X összeggel. Ha az A számla kevesebb összeggel rendelkezik mint $X, akkor a státuszváltozási függvény hibajelzést ad vissza. Tehát így definiálható formálisan:

```
APPLY(S,TX) -> S' or ERROR
```

A fentiekben leírt banki rendszerben:

```js
APPLY({ Alice: $50, Bob: $50 },"küld $20 Alice-tól Bob-nak") = { Alice: $30, Bob: $70 }
```

De:

```js
APPLY({ Alice: $50, Bob: $50 },"küld $70 Alice-tól Bob-nak") = ERROR
```

A Bitcoin státusza az összes kibányászott és el nem költött érme együttvéve (technikailag az „elköltetlen tranzakciós kimenetek” vagy UTXO). Minden UTXO-nak van egy névértéke és egy tulajdonosa (melyet egy 20 bájtos cím határoz meg, lényegében egy kriptográfiai nyilvános kulcs<sup>[fn1](#jegyzetek)</sup>). Egy tranzakció egy vagy több bemenetet tartalmaz, és mindegyik bemenet tartalmaz egy meglévő UTXO-ra mutató hivatkozást, valamint egy kriptográfiai aláírást, amelyet a tulajdonos címéhez társított privát kulcs hoz létre, és egy vagy több kimenetet, ahol minden egyes kimenet egy új UTXO-t tartalmaz, amik aztán hozzáadódnak a státuszhoz.

A státuszváltozási függvény `APPLY(S,TX) -> S'` a következő módon definiálható:

<ol>
  <li>
    Minden egyes bemenetre a <code>TX</code>-ben:
    <ul>
    <li>
        Ha a hivatkozott UTXO nincs benne az <code>S</code>-ben, hibát küld vissza.
    </li>
    <li>
        Ha a szolgáltatott aláírás nem egyezik az UTXO tulajdonosának aláírásával, hibát küld vissza.
    </li>
    </ul>
  </li>
  <li>
    Ha az összes bemeneti UTXO összege kisebb, mint az összes kimeneti UTXO egység összege, hibát küld vissza.
  </li>
  <li>
    <code>S</code>-t küld vissza az összes bemeneti UTXO elvételével és az összes UTXO hozzáadásával.
  </li>
</ol>

Az első lépés első fele megakadályozza, hogy a tranzakciók feladói nem létező érméket költsenek el, az első lépés második fele pedig megakadályozza, hogy a tranzakciók feladói mások érméit költsék el, a második lépés pedig az érték megőrzését hajtja végre. Ahhoz, hogy ezt fizetésnél használjuk, a protokoll a következő. Tegyük fel, hogy Alice 11,7 BTC-t szeretne Bob-nak átutalni. Először Alice megkeresi az általa birtokolt elérhető UTXO-k egy olyan halmazát, melynek összege legalább 11.7 BTC. A valóságban Alice nem fog pont 11.7 BTC-t találni; mondjuk, hogy a legkisebb, amit megtalált 6+4+2=12. Ezután elkészít egy tranzakciót ezzel a három bemenettel és két kimenettel. Az első kimenet 11.7 BTC lesz, aminek Bob címe lesz a tulajdonosa, a második kimenet pedig a maradék 0.3 BTC "visszajáró", melynek maga Alice a tulajdonosa.

### Bányászat {#mining}

![Ethereum blokkok](./ethereum-blocks.png)

Ha hozzáférnénk egy megbízható, központosított szolgáltatáshoz, ezt a rendszert egyértelmű lenne megvalósítani; mivel pontosan a leírtak szerint lehetne kódolni egy központosított, azaz centralizált szerver merevlemezén tárolva az állapotot. Azonban a Bitcoin egy decentralizált pénzrendszert próbált kiépíteni, így a státuszváltozási rendszert egy konszenzusrendszerrel kell kombinálni, hogy biztosítsa, hogy mindenki egyetért a tranzakciók sorrendjével. A Bitcoin decentralizált konszenzus folyamata elvárja a hálózat résztvevőitől, hogy folyamatosan tranzakciókból álló csomagokat próbáljanak készíteni, melyeket '"blokkoknak" hívunk. A hálózat nagyjából egy blokkot szándékozik gyártani minden tizedik percben, ahol minden egyes blokk tartalmaz egy időbélyeget, egy nonce-t, egy hivatkozást az előző blokkra (vagyis hash-t), és az összes olyan tranzakciót tartalmazó listát, melyek az előző blokk után következtek. Idővel egy tartós, folyamatosan növekvő "blokklánc" jön létre, mely folyamatosan frissül, hogy a Bitcoin főkönyv legutóbbi állapotát reprezentálja.

A blokkok érvényességét ellenőrző algoritmust az alábbi paradigma szerint lehet kifejezni:

1. Ellenőrzi, hogy a blokk által hivatkozott előző blokk létezik és érvényes.
2. Ellenőrzi, hogy a blokk időbélyege későbbi-e, mint az előző blokké<sup>[fn2](#jegyzetek)</sup> és kevesebb mint 2 óra telt-e el azóta
3. Ellenőrzi, hogy a blokk proof-of-workje érvényes-e.
4. Legyen `S[0]` az előző blokk után lévő státusz.
5. Legyen `TX` a blokk tranzakciós listája `n` tranzakcióval. Minden `i`-re `0...n-1`-ig legyen beállítva `S[i+1] = APPLY(S[i],TX[i])`. Ha bármely lépés hibát ad vissza, kilép és hamis értéket ad vissza.
6. Igaz értéket ad vissza, és `S[n]`-t regisztrál státuszként a blokk végén.

Lényegében a blokkban szereplő minden tranzakciónak érvényes státuszváltozást kell biztosítania a tranzakció lefutása előtti kanonikus állapotból egy új állapotba. Fontos megjegyezni, hogy a státusz nincs belekódolva a blokkba; pusztán absztrakció, amelyre a hálózat érvényesítő résztvevőjének emlékeznie kell, és bármely blokkra (biztonságosan) csak akkor számítható ki, ha a kezdeti státuszból indulunk ki, és minden tranzakciót egymás után lefuttatunk minden blokkban. Továbbá meg kell jegyezni, hogy az is számít, hogy a bányász a tranzakciókat milyen sorrendben helyezte el a blokkban; ha van két olyan A és B tranzakció a blokkban, ahol B az A által létrehozott UTXO-t költi el, a blokk akkor lesz érvényes, ha A előbb van mint B, fordítva nem.

A fenti listában szereplő érvényességi feltételek közül egyedül a "munkabizonyíték" szükségessége nem található meg más rendszereknél. A pontos feltétel pedig az, hogy minden blokk dupla-SHA256 hashének, melyet egy 256 bites számként kezelünk, kisebbnek kell lennie, mint egy dinamikusan beállított célérték, mely ennek az anyagnak a megírása közben 2<sup>187</sup>. Ennek a célja, hogy a blokk létrehozása számítási szempontból "nehéz" legyen, és hogy ezáltal megakadályozza a sybil-támadókat, hogy átalakítsák a teljes blokkláncot a saját érdekükben. Mivel az SHA256-ot úgy tervezték, hogy egy teljesen megjósolhatatlan álvéletlen (pszeudo-random) függvény legyen, így a blokk létrehozásának egyetlen módja a próbaszerencse (trial and error), vagyis ismételten növelni kell a nonce-t és figyelni, hogy az új hash megfelelő-e.

A jelenlegi 2<sup>187</sup>-es cél esetében, a hálózatnak átlagosan \~2<sup>69</sup> próbálkozást kell tennie, mielőtt valaki egy érvényes blokkot találna; általánosságban a hálózat minden 2016 blokk után újrakalibrálja a célt azért, hogy a hálózat egy résztvevője átlagosan minden tizedik percben egy új blokkot hozzon létre. Azért, hogy a bányászok kompenzálva legyenek ezért a számítási munkáért, minden blokk bányászát megilleti, hogy egy olyan tranzakciót tegyen a blokkba, amiben jóváír magának 12.5 BTC-t a semmiből. Továbbá ha bármely tranzakciónak nagyobb bemeneti egysége van, mint kimeneti, akkor a különbség a bányászokhoz került, mint egy "tranzakciós díj". Tulajdonképpen ez a BTC kibocsátásának egyetlen módja; a kezdeti állapot egyáltalán nem tartalmazott érméket.

Hogy jobban megértsük a bányászat célját, nézzük meg, hogy mi történik egy rosszindulatú támadás esetében. Mivel a Bitcoin mögötti kriptográfia közismerten biztonságos, a támadó a rendszer azon részét fogja célba venni, melyet nem véd közvetlenül kriptográfia: a tranzakciók sorrendjét. A támadó stratégiája egyszerű:

1. 100 BTC elküldése egy kereskedőnek valamilyen termékért cserébe (ideálisan egy digitális termék, gyors hozzáféréssel)
2. Megvárni amíg megérkezik a termék
3. Egy másik tranzakció létrehozása, amiben ugyanazt a 100 BTC-t küldi el magának
4. Meggyőzni a hálózatot, hogy a saját magának intézett tranzakció volt előbb.

Amint az 1. lépés befejeződött, pár perc múlva valamelyik bányász beteszi a tranzakciót egy blokkba, mondjuk a 270 000-es számúba. Nagyjából egy órával később, ezután a blokk után öt új blokk kerül hozzáadásra a lánchoz, és minden egyes blokk közvetetten hivatkozik a tranzakcióra, így "megerősítve" azt. Ezen a ponton a kereskedő elfogadja a kifizetést véglegesítettként és kiszállítja a terméket; mivel feltételezzük, hogy ez egy digitális termék, a szállítás azonnali. Ekkor a támadó egy új tranzakciót hoz létre, amiben 100 BTC-t küld magának. Ha a támadó egyszerűen elküldené a tranzakciót a világba, nem kerülne feldolgozásra; mert a bányászok megpróbálják futtatni az `APPLY(S,TX)` függvényt és észreveszik, hogy a `TX` egy olyan UTXO-t akar felhasználni, ami már nem létezik a státusz szerint. Ehelyett a támadó csinál egy blokkláncelágazást (fork) úgy, hogy a 270-es blokknak egy új verzióját kezdi el bányászni, ami ugyanarra a 269-es „szülőblokkra” épül, de a régi helyett egy új tranzakcióval. Mivel a blokk adata különböző, így újra kell csinálni a proof-of-work-öt (munkaigazolás). Továbbá a támadó 270-es számú új blokk verziója egy különböző hash-sel rendelkezik, így az eredeti blokkok 271-től 275-ig nem "hivatkoznak" rá; így az eredeti lánc és a támadó új lánca teljesen különböző. Az a szabály, hogy az elágazásban a hosszabb blokkláncot kell igaznak tekinteni, így a törvényesen bányászók a 275-ös láncon fognak tovább dolgozni, míg a támadó egyedül dolgozik a 270-es láncon. Ahhoz, hogy a támadó saját blokkláncát tehesse a leghosszabbá, több számítási kapacitással kell rendelkeznie, mint a hálózat többi résztvevőjének együttvéve, hogy utolérhesse őket (innen ered az "51%-os támadás").

### Merkle-fák {#merkle-trees}

![SPV Bitcoin-ban](./spv-bitcoin.png)

_Bal: elegendő a csomópontok egy kis számát prezentálni a Merkle fában, hogy bizonyítsuk egy ág érvényességét._

_Jobb: bármely kísérlet, mely a Merkle fa egy részének megváltoztatására irányul, végül következetlenséghez fog vezetni valahol a láncon._

A Bitcoin egyik fontos skálázhatósági tulajdonsága, hogy a blokk egy több szintes adatstruktúrában van tárolva. A blokk hash valójában csak a blokk fejléc hashe, ez megközelítőleg 200 bájt adatot jelent, mely tartalmazza az időbélyeget, a nonce-t, az előző blokk hashét és a Merkle fának nevezett adat struktúra gyökér hashét, mely a blokkban lévő összes tranzakciót tárolja. A Merkle fa egyfajta bináris fa, ami csomópontokból áll; jelentős számú levél csomópontból a fa alján, amik az alapul szolgáló adatokat tartalmazzák, egy sor középső csomópontból, ahol minden csomópont két gyerekének a hashe, és végül egy gyökér csomópontból, amely szintén két gyerekének a hashéből keletkezett, és a fa "tetejét" reprezentálja. A Merkle fa célja, hogy lehetővé tegye a blokkban lévő adatok feldarabolását: egy csomópont letöltheti csak a blokk fejlécet egy forrásból; a fának számára releváns kis részét pedig egy másik forrásból, és mégis biztos lehet az adat helyességében. Az ok amiért ez működik az a hashek felfelé terjedése: ha egy rosszindulatú felhasználó megpróbál betenni egy hamis tranzakciót a Merkle fa aljára, az változást indít el az eggyel feljebb lévő csomópontban, mely megváltoztatja az afelett lévő csomópontot, végül a gyökér csomópont is megváltozik, így ezzel a blokk hash is, ebből kifolyólag a protokoll egy teljesen másik blokként regisztrálja azt (szinte biztosan érvénytelen munkabizonyítékkal).

A Merkle fa protokoll vitathatatlanul elengedhetetlen a hosszú távú fenntarthatósághoz. Egy "teljes csomópontnak" a Bitcoin hálózatban, az amelyik az összes blokk egészét tárolja és feldolgozza, körülbelül 15 GB lemezterülettel kell rendelkeznie a Bitcoin hálózatban 2014 áprilisában, és ez havonta 1 GB-tal nő. Jelenleg ezt csak bizonyos asztali számítógépek tudják megvalósítani, telefonok nem, és a jövőben csak vállalkozások és hobbisták lesznek képesek részt venni. Egy "egyszerűsített fizetési hitelesítésnek (SPV)" nevezett protokoll lehetővé teszi egy másik csomópont típus létezését, melyeket "könnyű csomópontoknak" hívunk, ezek a hálózati résztvevők csak a blokk fejléceket töltik le, hitelesítik a munkabizonyítékot a blokk fejléceken és csak a számukra releváns tranzakciókhoz tartozó "ágakat" töltik le. Ez lehetővé teszi a könnyű csomópontoknak, hogy erős biztonsági garanciával meghatározhassák bármelyik Bitcoin tranzakció állapotát és aktuális egyenlegét, miközben a teljes blokklánc csak nagyon kis részét töltik le.

### Alternatív blokkláncalkalmazások {#alternative-blockchain-applications}

A mögöttes blokklánc másfajta koncepciókra történő alkalmazásának ötlete szintén hosszú történelemmel bír. 2005-ban Nick Szabo kiadta a [tulajdonosi jogokkal rendelkező biztonságos tulajdonok](https://nakamotoinstitute.org/secure-property-titles/) koncepciójával foglalkozó kiadványt. Ez a dokumentum leírja, hogy az „újdonságok a replikált adatbázis-technológiában” miként tesznek lehetővé egy blokkláncalapú rendszert, amely nyilvántartja, hogy ki milyen földterülettel rendelkezik, létrehozva ezzel egy kidolgozott keretrendszert, amely magában foglalja az olyan fogalmakat, mint a lakhatás, a hátrányos birtoklás és a grúz földadó. Abban az időben sajnos nem állt rendelkezésre hatékony replikált adatbázis-rendszer, ezért a protokollt a gyakorlatban soha nem valósították meg. 2009-től azonban a Bitcoin decentralizált konszenzusának kialakulása után számos alternatív alkalmazás kezdett gyorsan megjelenni.

- **Namecoin** – a 2010-ben létrehozott [Namecoint](https://namecoin.org/) legjobban egy decentralizált névregisztrációs adatbázisként lehet leírni. Az olyan decentralizált protokollokban, mint a Tor, a Bitcoin és a BitMessage azért, hogy más emberek kölcsönhatásba léphessenek velük, a fiókok azonosítására van szükség valamilyen módon, de az összes létező megoldásban az egyetlen elérhető azonosítótípus egy álvéletlen hash, mint például `1LW79wp5ZBqaHW1jL5TCiBCrhQYtHagUWy`. Ideális esetben olyan számlanevet szeretnénk használni, mint a „george”. A probléma azonban az, hogy ha egy személy létrehozhat egy „george” nevű fiókot, akkor valaki más is végigmehet ugyanezen a regisztrációs folyamaton, és annak adhatja ki magát. Az egyetlen megoldás az elsőt figyelembe vevő (first-to-file) paradigma, ahol az első regisztrálónak sikerül, a másodiknak pedig meghiúsul – ez a probléma tökéletesen megfelel a Bitcoin konszenzusprotokoll számára. A Namecoin a legrégebbi és a legsikeresebb névregisztrációs rendszerimplementáció, amely ezen az ötleten alapszik.
- **Colored coins** – a [colored coinok (színes érmék)](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit) célja egy olyan protokoll megtestesítése, amely lehetővé teszi az emberek számára, hogy saját digitális valutát készítsenek, vagy egy egységgel rendelkező valutát, azaz digitális tokent hozzanak létre a Bitcoin blokkláncon. A colored coins protokollban egy új pénznemet „bocsát ki” valaki azáltal, hogy nyilvánosan hozzárendel egy színt egy adott Bitcoin UTXO-hoz, és a protokoll rekurzív módon meghatározza a többi UTXO színét annak az inputnak a színével, amelyet az őket létrehozó tranzakció költött (néhány speciális szabály vonatkozik a vegyes színű bemenetekre). Ez lehetővé teszi a felhasználók számára, hogy csak bizonyos színű UTXO-t tartalmazó pénztárcákat tartsanak fenn, és a szokásos bitcoinokhoz hasonlóan küldjék el őket, visszakeresve a blokkláncon, hogy meghatározzák a kapott UTXO-k színét.
- **Metacoins** – a metacoin mögött az az alapötlet áll, hogy legyen egy olyan protokoll, amely a Bitcoinra épül, és a Bitcoin tranzakciókat használja metacoin-tranzakciók tárolására, de más státuszváltozási függvénnyel rendelkezik, ami az `APPLY'`. Mivel a metacoin-protokoll nem tudja megakadályozni, hogy érvénytelen metacoin tranzakciók jelenjenek meg a Bitcoin blokkláncon, bekerült az a szabály, hogy ha az `APPLY'(S,TX)` hibaüzenetet ad vissza, a protokoll az `APPLY'(S,TX) = S` alapértelmezett értékre áll be. Ez egy egyszerű mechanizmust biztosít egy tetszőleges kriptovaluta-protokoll létrehozására, potenciálisan fejlett funkciókkal, amelyek nem valósíthatók meg a Bitcoinon belül, de a fejlesztési költségek alacsonyak, mivel a bányászat és a hálózatépítés bonyolultságait már a Bitcoin-protokoll kezeli. Metacoinokat már néhány pénzügyi szerződésfajtánál, névregisztrációnál és decentralizált tőzsdék esetében is használtak.

Így általánosságban két megközelítés van egy konszenzus protokoll fejlesztésére: egy független hálózat építése és egy protokoll fejlesztése a Bitcoinra. Az előbbi megközelítést, ami bár meglehetősen sikeres a Namecoinhoz hasonló alkalmazások esetében, nehéz implementálni; minden egyedi implementációnak fel kell állítania egy független blokkláncot, illetve kifejleszteni és letesztelni a szükséges státuszváltozást és a hálózati kódot. Továbbá arra számítunk, hogy a decentralizált konszenzus technológiát használó alkalmazások a hatványtörvény szerinti eloszlást fogják követni, ahol az alkalmazások túlnyomó többsége túl kicsi lesz ahhoz, hogy indokolt legyen egy saját blokkláncot fenntartaniuk, és megjegyezzük, hogy a decentralizált alkalmazásoknak nagy osztályai léteznek, különösen a decentralizált autonóm szervezetek, melyeknek interakcióba kell lépniük egymással.

Másfelől a Bitcoin alapú megközelítésnek az a hátulütője, hogy nem örökli a Bitcoin egyszerűsített fizetéshitelesítési tulajdonságait. Az SPV (egyszerűsített fizetéshitelesítés) működik a Bitcoin esetében, mivel felhasználja a blokklánc mélységét, mint érvényességi proxy; egy ponton, amint a tranzakciónak kellő mennyiségű őse van, biztonsággal állítható, hogy ezek érvényes részei a státusznak. Másfelől a blokklánc alapú meta protokollok nem kényszeríthetik a blokkláncot, hogy ne tartalmazza azokat a tranzakciókat, melyek nem érvényesek a saját protokolljuk kontextusában. Ezért egy teljesen biztonságos SPV meta-protokoll megvalósításnak vissza kell hivatkoznia a Bitcoin blokklánc elejéig annak megállapítására, hogy biztos-e a tranzakciók érvényessége. Jelenleg a Bitcoin alapú metaprotokollok összes „könnyű” implementációja egy megbízott szerverre bízza az adatszolgáltatást, ami nem a legoptimálisabb megoldás, mert a kriptovaluták elsődleges célja a bizalomigény megszüntetése.

### Szkriptelés {#scripting}

Még kiterjesztés nélkül is a Bitcoin protokoll lehetővé teszi az „okosszerződések” egy kezdetleges változatát. A Bitcoinban lévő UTXO-kat nem csak publikus kulcsok birtokolhatják, hanem bonyolultabb szkriptek is, melyeket egy egyszerű stack alapú programozási nyelvvel lehet kifejezni. Ebben a paradigmában az UTXO-t elköltő tranzakcióknak adatokat kell szolgáltatni a szkriptek kielégítésére. Valójában még az alapvető publikus kulcs tulajdonjog mechanizmus is egy szkripten keresztül valósul meg: a szkript egy elliptikus görbe aláírást használ bemenetként, megerősíti a tranzakció és az UTXO-t birtokló cím szerint és 1-et ad vissza, ha az érvényesítés sikeres, ellenkező esetben 0-át. Más bonyolultabb szkriptek is léteznek további különböző felhasználási esetekre. Például létre lehet hozni egy olyan szkriptet, mely három privát kulcsból kettő aláírását igényli az érvényesítéshez ("multisig"), a vállalati számlák, biztonságos megtakarítási számlák és néhány kereskedői letét számára hasznos beállítás. A szkriptek felhasználhatók a számítási problémák megoldásáért járó jutalmak kifizetésére is, sőt össze lehet állítani egy olyan szkriptet, amely valami olyasmit mond, hogy "ez a Bitcoin UTXO a tiéd, ha tudsz egy SPV bizonyítékot nyújtani arra, hogy nekem küldtél egy ilyen címletű Dogecoin tranzakciót", mely lényegében lehetővé teszi a decentralizált kereszt-kriptovaluta váltást.

Azonban a Bitcoinban implementált szkript nyelvnek számos fontos megkötése van:

- **Turing-teljesség hiánya** – vagyis, bár van egy nagy számítási részhalmaz, amelyet a Bitcoin szkriptnyelv támogat, közel sem támogat mindent. A fő kategória a hiányzó ciklusok. Ennek az az oka, hogy elkerüljük a végtelen ciklusokat a tranzakció ellenőrzések során; elméletileg ez egy leküzdhetetlen akadály a szkriptprogramozók számára, mivel bármely ciklus szimulálható úgy, hogy egyszerűen megismételjük több alkalommal a mögöttes kódot egy „if” (ha) utasítással, de ez nagyon kis hatékonyságú szkriptekhez vezet. Például egy alternatív elliptikusgörbe-aláírási algoritmus implementálása valószínűleg 256 ismételt szorzási kört igényelne, melynek mindegyike egyenként szerepelne a kódban.
- **Értékvakság** – nincs olyan UTXO-szkript, amely képes lenne szofisztikáltan irányítani a kiutalható mennyiséget. Például egy orákulumszerződés komoly felhasználási területe a hedging szerződés lenne, ahova A és B 1000 USD értékű BTC-t tesz be és 30 nappal később a szkript elküld 1000 USD értékű BTC-t A részére a maradékot pedig B részére. Ez egy orákulumot igényel, mely meghatározza 1 BTC értékét USD-ben, de még így is hatalmas előrelépés a bizalom és az infrastrukturális követelmények szempontjából a teljesen centralizált megoldásokhoz képest. Azonban mivel az UTXO mindent vagy semmit elven működik, ennek az egyedüli módja, ha sok UTXO-t használunk különböző egységekkel (például egy 2<sup>k</sup> UTXO minden k-ra egészen 30-ig) és az orákulum eldönti, hogy melyik UTXO-t küldi A-nak és melyiket B-nek.
- **Státuszhiány** – az UTXO lehet elköltött vagy elköltetlen; nincs lehetőség többlépcsős szerződésekre vagy szkriptekre, amelyek megtartanak minden más belső státuszt ezen túl. Ez megnehezíti a többlépcsős opciós szerződések, decentralizált csereajánlatok vagy kétlépcsős kriptográfiai elköteleződési protokollok létrehozását (ami szükséges a biztonságos számítási kompenzációhoz). Ez azt is jelenti, hogy az UTXO csak egyszerű, egyszeri szerződések és nem bonyolultabb „státuszos” szerződések, például decentralizált szervezetek létrehozására használható, és a metaprotokollok megvalósítását megnehezíti. A bináris állapot az értékvaksággal kombinálva azt is jelenti, hogy egy másik fontos funkció, a kiutalási limitek beállítása, sem lehetséges.
- **Blokkláncvakság** – az UTXO nem tud az olyan blokkláncadatokról, mint a nonce, az időbélyeg vagy az előző blokkhash. Ez súlyosan korlátozza a szerencsejátékokban és számos más kategóriában történő alkalmazásokat azáltal, hogy megfosztja a szkriptnyelvet a véletlenszerűség értékes forrásától.

Így meglátásunk szerint háromféleképpen lehet fejlett alkalmazásokat fejleszteni egy kriptovalutára: új blokklánc indítása, a Bitcoin szkripting használata és egy meta protokoll fejlesztése Bitcoinra. Egy új blokklánc indítása lehetővé teszi a korlátlan szabadságot a funkciókészlet építésében, de a fejlesztési idő, a bootstrapping és a biztonság árán. A szkriptek használata egyszerűen megvalósítható és szabványosítható, de nagyon korlátozott a képességeiben, és a meta protokollok, míg egyszerűek, nehezen skálázhatóak. Az Ethereummal egy olyan alternatív keretrendszert szeretnénk létrehozni, mely még jobban megkönnyíti a fejlesztést, valamint erősebb könnyű kliens tulajdonságokkal rendelkezik, egyúttal az alkalmazásoknak egy közös gazdasági környezetet és blokklánc biztonságot biztosít.

## Ethereum {#ethereum}

Az Ethereum célja egy alternatív protokoll létrehozása decentralizált alkalmazások fejlesztésére, különböző kompromisszumokkal, amelyről úgy hisszük, hogy nagyon hasznos lesz a decentralizált alkalmazások nagy részének, különös tekintettel az olyan esetekre, ahol fontos a gyors fejlesztési idő, a biztonság a kisméretű és ritkán használt alkalmazások számára, és a különböző alkalmazások közötti nagyon hatékony együttműködés. Az Ethereum ezt úgy éri el, hogy felépíti azt, ami lényegében a végső absztrakt alapréteg: egy blokkláncot beépített Turing-teljes programozási nyelvvel, mely lehetővé teszi bárki számára az okosszerződés írást és a decentralizált alkalmazás fejlesztést, ahol létrehozhatják a saját tetszőleges tulajdonjogi szabályaikat, tranzakció formátumukat és a státuszváltozási függvényeket. A Namecoin lecsupaszított verziója két sornyi kódból megírható, a többi protokoll, mint például a valuták és az identitás rendszerek pedig kevesebb, mint húsz sorból. Okosszerződések, olyan kriptográfiai „dobozok”, melyek értéket tartalmaznak és csak akkor nyílnak ki, amikor bizonyos feltételek teljesülnek, szintén építhetőek a platformra sokkal nagyobb erővel, mint amit a Bitcoin szkriptelés kínál, a Turing-teljesség, értéktudatosság, blokklánctudatosság és a státusz hozzáadott értéke miatt.

### Ethereum-számlák {#ethereum-accounts}

Az Ethereumban a státuszt „számláknak” nevezett objektumok alkotják, ahol minden egyes számla egy 20 bájtos címmel rendelkezik és a státuszváltozást a számlák közötti közvetlen érték- és információátadás végzi. Az Ethereum-számlák négy mezőt tartalmaznak:

- A **nonce**, egy számláló, mely biztosítja, hogy minden tranzakció csak egyszer kerül feldolgozásra
- A számla aktuális **ether-egyenlege**
- A számla **szerződéskódja**, ha van
- A számla **tárhelye** (alapértelmezetten üres)

Az „ether” az Ethereum elsődleges, belső kriptoüzemanyaga és a tranzakciós díj kifizetésére lehet használni. Általánosságban kétfajta számlatípus létezik: **külső tulajdonú számlák**, melyeket privát kulcsok irányítanak és **szerződéses számlák**, melyeket a szerződéskódjuk irányít. A külső tulajdonú számláknak nincs kódjuk, és az adott személy üzenetet küldhet egy külső tulajdonú számláról egy tranzakció létrehozásával és aláírásával; a szerződéses számla esetében minden esetben, amikor e számla üzenetet kap, aktiválódik a kódja, ami lehetővé teszi a belső tárhely írását és olvasását, új üzenetek küldését vagy szerződés létrehozását.

Fontos megjegyezni, hogy az Ethereumban a szerződések nem olyan egyezmények, amelyet teljesíteni vagy betartani kell; inkább „önálló ügynökök”, akik az Ethereum végrehajtási környezetében élnek, és végrehajtanak egy adott kóddarabot, amikor beindítja azokat egy üzenet vagy tranzakció, továbbá közvetlen ellenőrzésük alatt tartják saját ether-egyenlegüket és saját kulcs-érték-adatbázisukat a tartós változók nyomon követésére.

### Üzenetek és tranzakciók {#messages-and-transactions}

A „tranzakció” kifejezést az Ethereumban egy aláírt adatcsomagra használjuk, ami egy külső tulajdonú számláról érkező üzenetet tartalmaz. A tranzakció a következőket tartalmazza:

- Az üzenet címzettje
- A küldőt azonosító aláírás
- Az ether összeg, amit a küldő át akar utalni a címzettnek
- Egy opcionális adat mező
- A `STARTGAS` érték, ami a tranzakció-végrehajtás számítási lépéseinek maximális számát jelenti
- A `GASPRICE` érték, ami a számítás lépésenkénti díját jelenti, amit a feladó fizet

Az első három olyan standard mező, ami minden kriptovalutánál megtalálható. Az adatmezőnek alapértelmezés szerint nincs funkciója, de a virtuális gép rendelkezik egy opkóddal, amelyet a szerződés használhat az adatok elérésére; például amikor egy szerződés domainregisztrációs szolgáltatásként működik a blokkláncon, akkor úgy értelmezheti a hozzá érkező adatot, hogy az két „mezőt” tartalmaz, az első a regisztrálandó domain, a második az IP-cím, amelyre regisztrálni kell. A szerződés kiolvassa ezeket az adatokat az üzenetből, és a megfelelő helyükre helyezi azokat az adattárban.

A `STARTGAS` és `GASPRICE` mezők kritikusak az Ethereum szolgáltatásmegtagadás elleni védekezési modelljében. Azért, hogy megelőzzük a véletlen vagy ártó szándékú végtelen ciklusokat vagy más számítási pazarlással járó kódot, minden egyes tranzakciónak be kell állítani egy határt, hogy mennyi számítási lépést hajthat végre a kód futtatása. A számítás alapvető egysége a „gáz”; általában egy számítási lépés 1 gázba kerül, de egyes műveletek többet igényelnek, mert számítási szempontból drágábbak, vagy növelik a státuszként tárolandó adatok mennyiségét. Továbbá minden egyes tranzakciós adatban található bájt után 5 gáz is felszámításra kerül. A díjrendszer célja, hogy megkövetelje a támadótól, hogy minden általa felhasznált erőforrásért arányosan fizessen, beleértve a számítást, a sávszélességet és a tárhelyet is; ennélfogva minden olyan tranzakció esetében, amelynek eredményeként a hálózat ezeknek az erőforrásoknak bármelyikét nagyobb mennyiségben fogyasztja, az erőforrások növekedésével nagyjából arányos gázköltséggel kell számolni.

### Üzenetek {#messages}

A szerződéseknek megvan a lehetőségük, hogy „üzeneteket” küldjenek más szerződéseknek. Az üzenetek olyan virtuális objektumok, amelyek nincsenek sorosítva és csak az Ethereum futtatási környezetben léteznek. Az üzenet a következőket tartalmazza:

- Az üzenet küldője (magától értetődő)
- Az üzenet címzettje
- Az üzenettel küldendő ether összege
- Egy opcionális adatmező
- A `STARTGAS` érték

Lényegében az üzenet olyan mint a tranzakció, kivéve, hogy nem külső szereplő, hanem a szerződés hozta létre. Üzenet akkor jön létre, amikor a kódot végrehajtó szerződés azt a `CALL` opkódot futtatja, amely előállítja és végrehajtja az üzenetet. A tranzakcióhoz hasonlóan az üzenet is a címzettszámla kódjának lefuttatását eredményezi. Ezáltal a szerződéseknek is ugyanúgy lehet kapcsolatuk másik szerződésekkel, mint a külső szereplőknek.

Megjegyzendő, hogy a tranzakciók vagy szerződések által kiszabott gázdíj a teljes gázmennyiségre vonatkozik, amit az adott tranzakció és az összes végrehajtási folyamat felhasznált. Például, ha az A külső szereplő egy tranzakciót küld B-nek 1000 gázzal, és B 600 gázt fogyaszt, mielőtt üzenetet küldene C-nek, és C belső végrehajtása 300 gázt fogyaszt, mielőtt visszatérne, akkor B még további 100 gázt költhet el.

### Az Ethereum státuszváltozási függvénye {#ethereum-state-transition-function}

![Ether státuszváltozás](./ether-state-transition.png)

Az Ethereum státuszváltozási függvénye, az `APPLY(S,TX) -> S'` a következőképpen írható le:

1. Ellenőrzi, hogy a tranzakció jól formált-e (megfelelő az értékek száma), az aláírás érvényes-e, és a nonce megegyezik-e a feladó számláján szereplő nonce-szal. Ha nem, hibát küld vissza.
2. Kiszámítja a tranzakciós illeték (`STARTGAS * GASPRICE`), és meghatározza a küldő címét az aláírásból. Levonja a díjat a küldő fél számlaegyenlegéről és növeli a küldő fél nonce-át. Ha nincs elegendő egyenleg, hibát küld vissza.
3. Beállítja a `GAS = STARTGAS` kezdőértéket, és bizonyos mennyiségű, bájtonkénti gázt elvesz a tranzakció bájtjainak kifizetéséhez.
4. Átutalja a tranzakció értékét a küldő számlájáról a fogadó számlájára. Ha a fogadó számla még nem létezik, létrehozza azt. Ha a fogadó számla egy szerződés, futtatja a szerződés kódját, addig amíg a tranzakció teljesül, vagy ameddig a végrehajtás során elfogy a gáz.
5. Ha az értékátutalás azért nem sikerült, mert a feladónak nem volt elegendő pénze, vagy a kódfuttatás során elfogyott a gáz, akkor minden állapotváltozást visszavon, kivéve a díjak kifizetését, majd a díjakat a bányász számlájához adja.
6. Máskülönben az összes fennmaradó gázdíjat visszatéríti a feladónak, az elfogyasztott gázért fizetett díjakat pedig elküldi a bányásznak.

Tegyük fel, hogy a szerződés kódja a következő:

```py
if !self.storage[calldataload(0)]:
  self.storage[calldataload(0)] = calldataload(32)
```

Megjegyzendő, hogy a valóságban a szerződés alacsony szintű EVM programozási nyelven van írva; ez a példa az érthetőség kedvéért az egyik magas szintű programozási nyelven, a Serpentben íródott, és le lehet fordítani EVM-nyelvre. Tegyük fel, hogy a szerződés tárhelye az elején üres, és egy 10 ether értékű tranzakciót elküldenek 2000 gázzal, 0,001 ether gázárral, és 64 bájtnyi adattal, ahol a 0–31. bájtok a `2` számot, a 32–63. bájtok pedig a karakterláncot ábrázolják (`CHARLIE`). A státuszváltozási függvény folyamata ebben az esetben a következőképpen alakul:

1. Ellenőrzi, hogy a tranzakció érvényes és jól formált-e.
2. Ellenőrzi, hogy a tranzakció küldőjének van-e legalább 2000 \* 0,001 = 2 ethere. Ha igen, levon 2 ethert a küldő számlájáról.
3. Beállítja a gáz = 2000 kezdőértéket; feltételezve, hogy a tranzakció 170 bájt hosszú és a bájtdíj 5, levon 850-et úgy, hogy 1150 gáz marad.
4. További 10 ethert levon a küldő számlájáról, és hozzáadja azt a szerződés számlájához.
5. Lefuttatja a kódot. Ebben az esetben ez egyszerű: a kód ellenőrzi, hogy a szerződés `2`-es indexén lévő tárhelyét használja-e; ha észreveszi, hogy nem, akkor a tárhelyindexet beállítja `2`-re, az értéket pedig `CHARLIE`-ra. Tegyük fel, hogy ez 187 gázba kerül, így a fennmaradó gáz összege 1150 – 187 = 963
6. 963 \ * 0,001 = 0,963 ethert visszaad a feladó számlájára, és visszatér az eredményül kapott státuszhoz.

Ha a tranzakció fogadójának oldalán nem lenne szerződés, akkor a teljes tranzakciós illeték egyszerűen megegyezne a megadott `GASPRICE` értékével megszorozva a tranzakció hosszával bájtokban, és a tranzakcióval együtt elküldött adatok lényegtelenek lennének.

Megjegyzendő, hogy az üzenetek és a tranzakciók visszafordítása ugyanúgy működik: ha az üzenet végrehajtása során elfogy a gáz, akkor az üzenet végrehajtása és az ebből következő összes többi végrehajtás visszaáll, de a „szülő végrehajtásokat” nem kell visszaállítani. Ez azt jelenti, hogy egy szerződés „biztonságosan” meghívhat egy másik szerződést, mivel ha A G mennyiségű gázzal hívja meg B-t, akkor A végrehajtása garantáltan legfeljebb G mennyiségű gázveszteséget okoz. Végül megjegyzendő, hogy van egy műveleti kód (`CREATE`), amely létrehozza a szerződést; aminek a végrehajtási mechanikája általában hasonló a `CALL`-hoz vagy híváshoz, azzal a kivétellel, hogy a végrehajtás kimenete határozza meg az újonnan létrehozott szerződés kódját.

### Kódfuttatás {#code-execution}

Az Ethereum szerződésekben szereplő kód alacsony szintű, stack-alapú bájtkód nyelven íródott, amelyet Ethereum virtuális gépi (EVM) kódnak neveznek. A kód bájtok sorozatából áll, ahol mindegyik bájt egy műveletet képvisel. A kódfuttatás általában egy végtelen ciklus, ami a művelet ismételt végrehajtásából áll az aktuális programszámlálón (amely nullától kezdődik), majd eggyel növeli a számlálót addig, amíg el nem éri a kód végét, vagy egy hibát, illetve ` STOP ` vagy ` RETURN ` utasítást észlel. A műveletek háromféle helyhez férnek hozzá, ahol adatokat tárolhatnak:

- A **stack** egy utolsóként be, elsőként ki (LIFO) tárolóhely, ahol az értékek rárakhatók (push) a stackre és levehetők (pop) a stack tetejéről
- **Memória **, egy végtelenül bővíthető bájttömb
- A szerződés hosszú távú ** tárhelye **, egy kulcs-érték tároló. A stack-től és a memóriától eltérően, amelyek a számítás befejezése után nullázódnak, ez a tároló hosszú ideig fennmarad.

A kód hozzáférhet a bejövő üzenet értékéhez, feladójához és adataihoz, valamint a blokkfejléc adataihoz, és a kód egy bájt adattömböt is visszaadhat kimenetként.

Az EVM-kód formális végrehajtási modellje meglepően egyszerű. Amíg az Ethereum virtuális gép fut, teljes számítási állapota meghatározható a következő értéksorral: `(block_state, transaction, message, code, memory, stack, pc, gas)`, ahol a `block_state` az összes számlát tartalmazó globális státusz, amely magában foglalja az egyenlegeket és a tárolóhelyeket. Minden egyes végrehajtási kör elején, az aktuális utasítás megtalálható a `code`-nak a `pc` által meghatározott bájtja által (vagy 0 ha `pc >= len(code)`), és minden utasításnak megvan a maga meghatározása abból a szempontból, hogy milyen hatással van az értéksorra. Például, `ADD` elvesz két elemet a stack-ből és visszarakja az összegüket, csökkenti a `gas` értékét 1-gyel, növeli a `pc` értékét 1-gyel, az `SSTORE` leveszi a stack két legfelső elemét és behelyezi a második elemet a szerződés tárhelyébe az első elem által meghatározott indexen. Bár számos módja van az Ethereum virtuális gép végrehajtás-optimalizálásának, futásidejű fordítással (röpfordítás), az Ethereum alapvető megvalósítása néhány száz kódsorban elvégezhető.

### Blokklánc és bányászat {#blockchain-and-mining}

![Ethereum alkalmazási blokkdiagram](./ethereum-apply-block-diagram.png)

Az Ethereum blokklánc sok szempontból hasonló a Bitcoin blokklánchoz, bár vannak közöttük különbségek. A fő különbség az Ethereum és a Bitcoin között a blokklánc felépítésének tekintetében az, hogy a Bitcointól eltérően (amely csak a tranzakciós lista másolatát tartalmazza) az Ethereum blokkok tartalmazzák a tranzakciós lista és a legutóbbi státusz másolatát is. Emellett két másik érték, a blokk száma és a nehézsége is tárolva van a blokkban. Az Ethereum blokk validációs algoritmusa a következő:

1. Ellenőrzi, hogy az előző blokk, amelyre a blokk hivatkozik, létezik és érvényes.
2. Ellenőrzi, hogy a blokk időbélyege nagyobb-e, mint az előző blokké és kevesebb mint 15 perc telt el azóta
3. Ellenőrzi, hogy a blokk száma, a nehézség, a tranzakciógyökér, az uncle-gyökér és a gázkorlátozás (különféle alacsony szintű, Ethereum-specifikus fogalmak) érvényesek-e.
4. Ellenőrzi, hogy a blokk proof-of-workje érvényes-e.
5. Legyen `S[0]` az előző blokk után lévő állapot.
6. Legyen `TX` a blokk tranzakciólistája `n` tranzakcióval. A `0...n-1` összes `i`-je esetében állítsa be a következőt: `S[i+1] = APPLY(S[i],TX[i])`. Ha valamelyik alkalmazás hibát ad vissza, vagy a blokkban az eddig a pontig elfogyasztott gáz összmennyisége túllépi a `GASLIMIT` értéket, hibát ad vissza.
7. Legyen az `S_FINAL` `S[n]`, de hozzáadva a bányásznak fizetett blokkjutalmat.
8. Ellenőrzi, hogy az `S_FINAL` állapot Merkle-fagyökere azonos-e a blokkfejlécben megadott végleges státusszal. Ha igen, a blokk érvényes; ellenkező esetben nem az.

A megközelítés első pillantásra nem tűnhet túl hatékonynak, mert minden blokkal a teljes státuszt kell tárolni, de a hatékonyság a Bitcoinéhoz hasonló. Ennek az az oka, hogy a státusz fastruktúrában tárolódik, és minden blokk után a fa csak egy kis részét kell megváltoztatni. Így általában két szomszédos blokk között a fa túlnyomó részének azonosnak kell lennie, ezért az adatokat egyszer kell tárolni és kétszer lehet rájuk hivatkozni mutatók (azaz részfák hasheinek) használatával. Ennek megvalósításához egy speciális „Patricia-fát” használnak, beleértve a Merkle-fa koncepciójának módosítását is, amely lehetővé teszi a csomópontok hatékony beillesztését és törlését, nem csak megváltoztatását. Ezen túlmenően, mivel az összes státuszinformáció része az utolsó blokknak, nincs szükség a teljes blokkláncelőzmények tárolására – ez egy olyan stratégia, amely ha alkalmazható lenne a Bitcoinra, 5–20-szoros megtakarítást eredményezne a tárhelyben.

Gyakran felmerül az a kérdés, hogy „hol” történik a szerződés kódjának végrehajtása a fizikai hardver szempontjából. Erre egyszerű a válasz: a szerződés kódjának végrehajtási folyamata a státuszváltozási függvény definíciójának része, amely a blokk validációs algoritmus része, tehát ha egy tranzakciót hozzáadunk a `B` blokkhoz, akkor a tranzakció által létrehozott kód végrehajtását minden csomópont végrehajtja, most és a jövőben is, amelyek letöltik és validálják a `B` blokkot.

## Alkalmazások {#applications}

Az Ethereumon általánosságban háromféle alkalmazás létezik. Az első kategória a pénzügyi alkalmazások, amelyek hatékonyabb módszereket kínálnak a felhasználóknak a pénzük kezelésére és szerződéskötésre. Ebbe beletartoznak a devizák, a derivatív pénzügyi eszközök, a fedezeti ügyletek, a megtakarításitárcák, végrendeletek, és végül akár teljes körű munkaszerződések egyes kategóriái. A második kategória a félig pénzügyi alkalmazások, amelyek a pénzzel kapcsolatosak, de a tevékenységeiknek van egy jelentős, nem pénzügyi oldala is; erre tökéletes példa az önérvényesítő jutalmak a számítási problémák megoldásért. Végül vannak olyan alkalmazások, mint az online szavazás és a decentralizált irányítás, amelyek egyáltalán nem pénzügyi vonatkozásúak.

### Tokenrendszerek {#token-systems}

A blokkláncon alapuló tokenrendszereknek számos alkalmazási területe van, mint az alvaluták, amelyek olyan eszközöket képviselnek, mint az USA dollár vagy az arany, a vállalati részvények, az okos tulajdont képviselő egyedi tokenek, a biztonságos és hamisíthatatlan kuponok, vagy amelyeknél semmilyen kapcsolat sincs a hagyományos értékhez, csak ösztönzéshez használják azokat. A tokenrendszereket meglepően egyszerű módon létre lehet hozni az Ethereumon. Kulcsfontosságú megérteni azt, hogy a pénznem vagy a tokenrendszer alapvetően egy műveletből álló adatbázis: vonjon le X egységet A-tól, és adjon X egységet B-nek, azzal a feltétellel, hogy 1) A-nak a tranzakció előtt legalább X egysége volt és 2) a tranzakciót A jóváhagyta. A tokenrendszer megvalósításához mindössze annyi kell, hogy ezt a logikát beépítsék egy szerződésbe.

Az alapkód a tokenrendszer megvalósítására Serpent programnyelven a következőképpen néz ki:

```py
def send(to, value):
  if self.storage[msg.sender] >= value:
    self.storage[msg.sender] = self.storage[msg.sender] - value
    self.storage[to] = self.storage[to] + value
```

Ez lényegében a „bankrendszer” státuszváltozási függvényének szó szerinti megvalósítását jelenti, amely ebben a dokumentumban fentebb már le lett írva. Néhány extra kódsort hozzá kell adni, hogy biztosítsuk a pénzegységek elosztásának kezdeti lépését, néhány másik szélsőséges esetben is, és ideális esetben egy függvényt is hozzáadunk, ami lehetővé teszi másik szerződéseknek, hogy lekérdezzék egy cím számlaegyenlegét. De ennyi az egész. Elméletileg a pénznemként működő Ethereum-alapú tokenrendszerek tartalmazhatnak egy másik fontos jellemzőt, ami a Bitcoin-alapú blokkláncon található pénzeszközöknél hiányzik: a tranzakciós díjak közvetlen fizetése ugyanabban a pénznemben. Ez úgy lehetne megvalósítható, hogy a szerződés fenntartana egy ether egyenleget, amelyből visszatérítené a feladónak a díjakra használt ethert, és ezt úgy töltené fel, hogy összegyűjti a díjakra beszedett belső valutaegységeket, és egy folyamatosan futó aukción továbbértékesíti azokat. A felhasználóknak tehát etherrel kellene „aktiválniuk” a számláikat, de onnantól, hogy az ether ott van, újrafelhasználható, mert a szerződés minden alkalommal visszatérítené.

### Pénzügyi derivatívák és stabil értékű valuták {#financial-derivatives-and-stable-value-currencies}

A pénzügyi derivatívák az „okosszerződés” leggyakoribb alkalmazásai, és az egyik legegyszerűbben megvalósíthatók a kód szempontjából. A pénzügyi szerződések végrehajtása során az a fő kihívás, hogy többségük külső árfolyamra való hivatkozást igényel; például kívánatos alkalmazás egy olyan okosszerződés, amely fedezetet ad az ether (vagy más kriptovaluta) árfolyamingadozására az amerikai dollárral szemben, de ehhez a szerződésnek tudnia kell az ETH/USD értékét. Ennek legegyszerűbb módja egy adott fél (például a NASDAQ) által fenntartott „adatforrás” szerződés, amelynek célja, hogy az adott fél képes legyen a szerződés szükség szerinti frissítésére, és egy olyan felület biztosítása, amely lehetővé teszi más szerződések számára, hogy üzenetet küldjenek a szerződésnek, és a válaszban megkapják az árat.

Tekintettel erre a kritikus összetevőre, a fedezeti szerződés a következőképpen nézne ki:

1. Megvárja, amíg az A fél berak 1000 ethert.
2. Megvárja, amíg a B fél berak 1000 ethert.
3. Az adatforrás szerződés lekérdezésén keresztül kiszámított 1000 ether USD értékének rögzítése a tárolóhelyen, mondjuk, hogy ez x USD.
4. 30 nap elteltével hagyja, hogy A vagy B „újraaktiválja” a szerződést annak érdekében, hogy x USD értékű ethert küldjön (amelyet úgy számol ki, hogy újból lekérdezi az adatforrás szerződést az új árról) A-nak, a többit pedig B-nek.

Egy ilyen szerződés jelentős potenciállal bírna a kriptokereskedelemben. Az egyik fő probléma, amire gyakran hivatkoznak a kriptovalutával kapcsolatban, hogy ingatag az árfolyama; bár sok felhasználó és kereskedő vágyik a kriptográfiai eszközök biztonságára és kényelmére, nem biztos, hogy vállalja azt az eshetőséget, hogy egyetlen nap alatt elveszítheti pénzeszközei értékének 23%-át. Eddig a leggyakrabban a kibocsátó által biztosított eszközöket javasolták; azon elképzelés alapján, hogy a kibocsátó létrehoz egy pénzeszközt, ahol joga van kibocsátani és visszavonni egységeket, és mindenkinek egy egységnyi pénzeszközt ad, aki (offline) cserébe ad neki egy meghatározott, egy egységnyi alapul szolgáló eszközt (például arany, USA dollár). A kibocsátó ezután megígéri, hogy az alapul szolgáló eszköz egy egységét adja annak, aki visszaküldi a kriptoeszköz egy egységét. Ez a mechanizmus lehetővé teszi a nem kriptográfiai eszköz kriptográfiai eszközzé való eszkalálását, feltéve, hogy a kibocsátó megbízható.

A gyakorlatban azonban a kibocsátók nem mindig megbízhatóak, és egyes esetekben a banki infrastruktúra túl gyenge vagy túl ellenséges ahhoz, hogy ilyen szolgáltatások létezzenek. A pénzügyi derivatívák alternatívát kínálnak. Itt ahelyett, hogy egyetlen kibocsátó biztosítaná az eszközök fedezetére szolgáló alaptőkét, a spekulánsok decentralizált piacon való fogadásai – például arról, hogy egy kriptográfiai referencia eszköz (például az ETH) ára emelkedni fog-e – játsszák ezt a szerepet. A kibocsátóktól eltérően a spekulánsoknak nincs lehetőségük az ügylettel kapcsolatos kötelezettségük elmulasztására, mert a fedezeti szerződés letétben tartja a pénzeszközeiket. Fontos megjegyezni, hogy ez a megközelítés nincs teljesen decentralizálva, mert még mindig megbízható forrásra van szükség az árjegyző szerepének betöltésére, bár már ez is hatalmas előrelépés az infrastruktúrakövetelmények csökkentése szempontjából (ellentétben a kibocsátóval, az árfolyamkiadáshoz nem szükséges engedély, és valószínűleg a szólásszabadság kategóriájába sorolhatók), és a csalás lehetőségét is csökkenti.

### Identitás- és hírnévrendszerek {#identity-and-reputation-systems}

A legkorábbi alternatív kriptovaluta, a [Namecoin](http://namecoin.org/), egy Bitcoinhoz hasonló blokkláncot próbált meg használni egy névregisztrációs rendszer biztosításához, ahol a felhasználók a nevüket egy nyilvános adatbázisba regisztrálhatták több más adat mellett. A leggyakrabban idézett alkalmazási eset a [DNS](https://wikipedia.org/wiki/Domain_Name_System) rendszerre, a domain nevek, például „bitcoin.org” (vagy a Namecoin esetében „bitcoin.bit”) leképezése egy IP-címre. Egyéb alkalmazási esetek például az e-mail-hitelesítések és a potenciálisan haladóbb reputációs rendszerek. Nézzünk egy alap szerződést, amely Namecoin-féle névregisztrációt biztosít az Ethereumon:

```py
def register(name, value):
  if !self.storage[name]:
    self.storage[name] = value
```

A szerződés nagyon egyszerű; gyakorlatilag egy adatbázis az Ethereum hálózatban, amelyhez hozzá lehet adni, de nem lehet módosítani vagy törölni belőle. Bárki regisztrálhat nevet valamilyen értékkel, majd a regisztráció örökre megmarad. Egy kifinomultabb névregisztrációs szerződésben szerepelne egy „függvényzáradék”, amely engedné a többi szerződésnek a lekérdezést, valamint a név „tulajdonosának” (azaz az első regisztrálónak) egy mechanizmust, az adat módosítására vagy a tulajdonjog átadására. Bárki hozzáadhat reputációt és digitális azonosító (web-of-trust) funkcionalitást az egész tetejére.

### Decentralizált fájltárhely {#decentralized-file-storage}

Az elmúlt években számos népszerű online tárhely startup tűnt fel, amelyek közül az egyik legkiemelkedőbb a Dropbox, akik lehetővé teszik ügyfeleiknek, hogy a merevlemezük biztonsági mentését feltöltsék, majd a szolgáltatással tároltassák azt, majd a felhasználó havidíj ellenében férhet hozzá az adataihoz. Azonban ezen a ponton a fájltárhely piac relatíve nem hatékony; ha megvizsgáljuk a különböző meglévő megoldásokat, láthatjuk, hogy különösen a „furcsa zónában”, a 20–200 GB szinten, ahol sem az ingyenes kvóták, sem a vállalati szintű kedvezmények nem jelennek meg, a mainstream fájltárolási költségek havi árszintje ott tart, hogy egy hónapért többet fizet az átlag felhasználó, mint egy teljes merevlemezért. Az Ethereum szerződések lehetővé teszik egy decentralizált fájltárolási ökoszisztéma fejlesztését, ahol az egyes felhasználók kis mennyiségű pénzt kereshetnek azzal, hogy bérbeadják saját merevlemezüket és a használaton kívüli tárhelyüket, ezzel is lefelé hajtva a tárolás költségeit.

Az ilyen eszközök kulcsfontosságú megerősítő eleme az általunk „decentralizált Dropbox szerződésnek” elnevezett megoldás. A szerződés a következő módon működik. Először a kívánt adatokat blokkokra bontjuk, adatvédelmi okokból titkosítjuk, majd egy Merkle-fát építünk belőle. Ezután létrehozunk egy szerződést azzal a szabállyal, hogy minden N blokkban a szerződés egy véletlen indexet választ ki a Merkle-fában (az előző blokkhash segítségével a szerződés kódjából véletlenszerűen), majd X ethert adunk az első entitásnak, hogy egy egyszerűsített fizetéshitelesítéssel lássa el a tranzakciót, például a blokk tulajdonjogát bizonyító elemmel az adott indexen a fában. Amikor egy felhasználó újra le szeretné tölteni a fájlt, egy mikrofizetési csatornás protokollt használhat (például 1 szabo 32 kilobájt adatért) a fájl lekérésére; a leginkább költséghatékony megközelítés az, amikor a fizető félnek csak a legvégén kell publikálnia a tranzakciót, ahelyett, hogy a tranzakciót egy kissé jövedelmezőbbre cserélné le ugyanazzal a nonce-al 32 kilobájtonként.

A protokoll egyik fontos jellemzője, hogy bár úgy tűnik, hogy valaki több véletlen csomópontot bíz meg azzal, hogy ne felejtse el a fájlt, a saját kockázatát a nullához közelire csökkentheti azzal, hogy a fájlt több részre bontja titkos megosztással, majd figyeli a szerződést, hogy lássa az egyes darabok továbbra is valamelyik csomópont birtokában maradnak. Ha egy szerződés továbbra is fizet, akkor kriptográfiai bizonyíték van arra, hogy valaki továbbra is tárolja a fájlt.

### Decentralizált autonóm szervezetek {#decentralized-autonomous-organizations}

A „decentralizált autonóm szervezetek” (DAO) általános koncepciója, hogy egy virtuális entitásnak, amely adott számú taggal vagy „részvényessel” rendelkezik, akár esetleg 67%-os többséggel, felhatalmazása lehet arra, hogy elköltse az entitás pénzeszközeit és módosítsa a kódját. A tagok együttesen dönthetik el, hogy a szervezet hogyan allokálja a pénzeszközöket. Egy DAO pénzeszközei allokálásának módszerei a pénzadománytól, fizetéseken át akár még egzotikusabb mechanizmusokig terjedhet, mint például egy belső valuta a munka elismerésére. Ez gyakorlatilag replikálja a hagyományos vállalatok vagy non-profit entitások jogi csapdáit, de a végrehajtásra kizárólag kriptográfiai blokklánc-technológiát használ. Eddig a DAO-kkal kapcsolatban leginkább a kapitalista „decentralizált autonóm vállalat” (DAC) modelljéről beszéltünk, ahol a részvényesek osztalékot vagy kereskedhető részvényeket kapnak; azonban van egy alternatív, talán a „decentralizált autonóm közösség” fogalommal leírható értelmezés is, ahol a tagok egyenlő mértékben vesznek részt a döntéshozatalban, és a tagok 67%-ának beleegyezése szükséges ahhoz, hogy felvegyenek vagy eltávolítsanak egy tagot. Azt a követelményt, hogy egy személy csak egy tagsággal rendelkezhet a csoportnak kollektíven kell érvényre juttatnia.

A DAO-k kódolásának általános leírása a következő. A legegyszerűbb megoldás egy önmagát módosító kódelem alkalmazása, amely változik, ha a tagok kétharmada egyetért egy módosítással. Bár a kód elméletileg állandó, bárki megkerülheti, és de-facto megváltoztathatja, ha a kód darabjait külön szerződésekbe foglalja, majd a módosítható tárhelyen menti el azt a címet, amit a szerződéseknek meg kell hívni. Egy ilyen DAO-szerződés egyszerű implementációjában három tranzakciótípus lenne, amelyeket a tranzakcióban megadott adatok különböztetnek meg:

- `[0,i,K,V]`, ahol a javaslatot az `i` index-szel regisztrálják, hogy módosítsa a címet a `K` tárolási indexen `V` értékre
- `[1,i]` egy szavazatot regisztrál az `i` javaslat előnyben részesítésére
- `[2,i]` az `i` javaslat véglegesítésére, ha elég szavazat érkezett be

A szerződésben ezután mindegyikre szerepel egy záradék. Ezután rögzíti az összes nyitott tárolási módosítást, és azt a listát is, hogy ki szavazott rájuk. Tartalmazza a tagok listáját is. Amikor valamelyik tárolási módosításra a tagok kétharmada szavazott, a véglegesítési tranzakció hajtja végre a módosítást. Egy kifinomultabb vázban megvalósítható beépített szavazási lehetőség is olyan funkciókra, mint például tranzakció küldése, tagok hozzáadása vagy eltávolítása, valamint lehetővé kell tenni egy [likviddemokrácia](https://wikipedia.org/wiki/Liquid_democracy)-stílusú szavazási delegálást is (azaz egy valaki kijelölheti, hogy ki szavazzon helyette, majd a kijelölés átadható, tehát, ha A B-t bízza meg a szavazással, majd B C-t bízza meg, C határozza meg A szavazatát). A tervezés lehetővé teszi, hogy a DAO organikusan nőjön decentralizált közösségként, és a tagok végül delegálhassák azt a feladatot egy specialistának, hogy kiszűrjék a tagokat, szemben a specialisták „jelenlegi rendszerével”, akik a közösség egyes tagjait érintő változások függvényében könnyen ki- vagy beugorhatnak.

Alternatív modell egy decentralizált vállalat részére, amikor valamelyik számlán nulla vagy több részvény van, és a döntéshozatalhoz a részvények kétharmadára van szükség. Egy teljes vázban ideális esetben benne van az eszközkezelő funkció, a lehetőség részvények vásárlására vagy eladására szóló ajánlattételre, valamint a lehetőség az ajánlatok elfogadására (lehetőség szerint a szerződésen belül egy ajánlategyeztető mechanizmussal). A delegálás szintén likvid demokrácia-stílusban létezik, általánosítva az „igazgatótanács” koncepcióját.

### További alkalmazások {#further-applications}

**1. Megtakarítási tárcák**. Tegyük fel, hogy Alice biztonságban szeretné tudni pénzeszközeit, azonban aggódik amiatt, hogy veszteség éri, vagy valaki feltöri a privát kulcsát. Ethert helyez el egy szerződésben Bobbal, egy bankkal, a következőképpen:

- Alice egyedül naponta legfeljebb a pénzeszközök 1%-át tudja felvenni.
- Bob egyedül naponta a pénzeszközök legfeljebb 1%-át tudja felvenni, de Alice-nek lehetősége van arra, hogy tranzakciót végezzen a kulcsával és zárolja ezt a lehetőséget.
- Alice és Bob együtt bármennyit fel tud venni.

Alice-nek általában elég naponta 1%, azonban, ha Alice-nek többre van szüksége, értesítheti Bobot, és segítséget kérhet. Ha Alice-t támadás éri, Bobhoz siethet, és a pénzeszközöket egy új szerződésbe tudja átmozgatni. Ha elveszíti a kulcsát, Bob tudja végül kivenni az eszközöket. Ha Bob rosszindulatúan kezd viselkedni, Alice ki tudja kapcsolni, hogy Bob pénzt vehessen fel.

**2. Terménybiztosítás**. Bárki készíthet könnyedén származtatott szerződést, ha az árindexek helyett az időjárási adatokról érkező adatforrást használja. Ha egy iowai farmer olyan származtatott ügyletet vásárol, ami fordítottan fizet az Iowában esett csapadék alapján, majd, ha szárazság van, a farmer automatikusan pénzhez jut, ha pedig elég eső esik, a farmer szintén jól jár, mert jó termése lesz. Ez általánosságban kiterjeszthető természeti csapásra vonatkozó biztosítással.

**3. Decentralizált adatforrás**. A pénzügyi CFD-k (nyitó- és záróérték közti különbség lekereskedése) esetében gyakorlatilag lehetőség van decentralizálni az adatforrást a [SchellingCoin](http://blog.ethereum.org/2014/03/28/schellingcoin-a-minimal-trust-universal-data-feed/) protokollal. A SchellingCoin a következőképpen működik: N fél beteszi a rendszerbe egy adott bázis értékét (például ETH/USD árfolyam), az értékeket rendezik, és mindenki, aki 25–75% között van egy tokent kap jutalmul. Ez a rendszer mindenkit arra ösztönöz, hogy olyan választ adjon, mint a többiek, és az egyetlen érték, amiben a résztvevők nagy száma realisztikusan egyet tud érteni a nyilvánvaló alap: az igazság. Ez egy decentralizált protokollt hoz létre, amely elméletileg bármilyen számú értéket adhat, ideértve az ETH/USD árát, vagy a berlini hőmérsékletet vagy egy nehéz számítási feladat eredményét.

**4. Okos, több aláírásos fedezet**. A Bitcoin többaláírásos tranzakciós szerződéseket is enged, ahol például öt kulcsból három tudja elkölteni a pénzeszközöket. Az Ethereum ennél részletesebb lehetőségeket is kínál; például ötből négy mindent el tud költeni, ötből három naponta 10%-ot, ötből kettő pedig csak napi 0,5%-ot. Továbbá az Ethereum több aláírásos megoldás aszinkron – két fél különböző időben tudja regisztrálni az aláírását a blokkláncon, az utolsó aláírás küldi el automatikusan a tranzakciót.

**5. Felhőben történő számítás**. Az EVM technológia szintén használható hitelesíthető számítási környezet létrehozására, ahol a felhasználók megkérhetnek másokat számítások végzésére, majd opcionálisan kérhetnek bizonyítékot arra, hogy a számítások adott, véletlenszerűen kiválasztott ellenőrzési pontokon pontosan lettek elvégezve. Így létre lehet hozni egy felhőalapú számítási piacot, amelyen bármelyik felhasználó részt vehet az asztali gépével, laptopjával vagy speciális szerverével, és együtt ellenőrizhetik szúrópróbaszerűen, hogy mely biztonsági letétek használhatók annak biztosítására, hogy a rendszer megbízható (azaz a csomópontok nem tudnak nyereségesen csalni). Bár egy ilyen rendszer nem feltétlenül felel meg minden feladatra; például nehézkes olyan feladatokat elvégezni nagyméretű felhőalapú csomópontokon, amelyek magasszintű, folyamat közbeni kommunikációt igényelnek. Más feladatokat azonban sokkal könnyebb párhuzamosan végezni; például a SETI@home, folding@home és általános algoritmusokat könnyebben meg lehet valósítani ilyen platformokon.

**6. Közvetítő nélküli (peer-to-peer) szerencsejáték**. Tetszőleges számú peer-to-peer szerencsejáték-protokollt, például Frank Stajano és Richard Clayton [Cyberdice](http://www.cl.cam.ac.uk/~fms27/papers/2008-StajanoCla-cyberdice.pdf) protokollját, lehet megvalósítani Ethereum blokkláncon. A legegyszerűbb szerencsejáték protokoll egyszerűen egy CFD a következő blokkhashre, de ennél bonyolultabb protokollokat is lehet építeni, például szerencsejáték-szolgáltatásokat nullához közeli díjakkal, ahol ki lehet zárni a csalás lehetőségét.

**7. Kimenetelre fogadó piacok**. Az Oracle vagy SchellingCoin környezetben futó kimenetelre fogadó piacokat könnyen meg lehet valósítani; ezek a piacok a SchellingCoin-nal együtt az első [futarchy](http://hanson.gmu.edu/futarchy.html) mainstream alkalmazássá nőhetik ki magukat a decentralizált szervezetek irányítási protokolljaként.

**8. Láncon belüli decentralizált piacterek**, amelyek az azonosítási és elismerési rendszert használják alapként.

## Egyebek és aggályok {#miscellanea-and-concerns}

### Módosított GHOST implementáció {#modified-ghost-implementation}

A „Greedy Heaviest Observed Subtree” (GHOST, „mohó legsúlyosabb részfa”) innovatív protokollt Yonatan Sompolinsky és Aviv Zohar vezette be [2013 decemberében](https://eprint.iacr.org/2013/881.pdf). A GHOST mögötti motiváció az volt, hogy azokon a blokkláncokon, ahol a megerősítési idő gyors, a magas elavulási aránynak köszönhetően csökken a biztonság – mivel a blokknak bizonyos időre van szüksége a hálózaton való terjedéshez, ha A bányász kibányász egy blokkot, majd B bányász még azelőtt kibányász egy blokkot, hogy A bányász blokkja eljutna B bányászhoz, ez utóbbi blokkja feleslegessé válik, és nem járul hozzá a hálózat biztonságához. Továbbá van egy centralizációs probléma is: ha A bányász egy 30% hasherejű bányászalap, és B bányásznak 10% hashereje van, akkor az A bányász elavult blokklétrehozási kockázata 70% (a fennmaradó 30%-ban az A bányász hozta létre az utolsó blokkot, így azonnal bányászati adathoz jut), míg B bányász az esetek 90%-ában fog létrehozni elavult blokkot. Ezért ha a blokkintervallum elég rövid ahhoz, hogy a lejárati arány magas legyen, az A bányász jelentősen hatékonyabb lesz pusztán a mérete miatt. A két hatás kombinálásával az a blokklánc, amely gyorsan gyárt blokkokat, valószínűleg vezetni fog egy bányászalapot, és elég nagy százalékot fog elfoglalni a hálózat hashteljesítményéből, hogy de facto átvegye az irányítást a bányászási folyamat fölött.

Ahogy Sompolinsky és Zohar is leírta, a GHOST megoldja a hálózat biztonságának elvesztését érintő első problémát azzal, hogy lejárt blokkokat is belevesz annak kiszámításába, hogy melyik lánc a „leghosszabb”; azaz nem csak a blokk szülőit és elődjeit veszi figyelembe, hanem a blokk elődjeinek mellékes leszármazottjait is (Ethereum kifejezéssel élve uncle/nagybácsi) hozzáadja ahhoz a számításhoz, hogy melyik blokkon van a legtöbb proof-of-work. A centralizációval kapcsolatos második probléma megoldására túlhaladunk a Sompolinsky és Zohar által ismertetett protokollon, és blokkjutalmakat adunk az elavult blokkokra is: egy elavult blokk az alapjutalom 87,5%-át éri, míg az elavult blokkot tartalmazó unokaöccs megkapja a fennmaradó 12,5%-ot. A tranzakciós díjakat azonban nem kapják meg a nagybácsik.

Az Ethereum a GHOST egy egyszerűsített verzióját implementálta, amely hét szintre megy le. Ez a következőképpen néz ki:

- Egy blokknak meg kell határoznia egy szülőt, illetve 0 vagy több nagybácsit
- Egy B blokkban lévő nagybácsinak a következő tulajdonságokkal kell rendelkeznie:
  - Közvetlen leszármazottnak kell lennie a k-adik generációs B ősnek, ahol `2 <= k <= 7`.
  - Nem lehet a B őse
  - Egy nagybácsinak érvényes blokkfejléccel kell rendelkeznie, de nem kell korábban hitelesített vagy érvényes blokknak lennie
  - A nagybácsinak különböznie kell a korábbi blokkokban szereplő nagybácsiktól, illetve az ugyanabban a blokkban lévő más nagybácsiktól (nincs dupla szerepeltetés)
- Minden U nagybácsihoz a B blokkban, a B bányász további 3,125%-ot kap a jutalmához, és az U bányász 93,75% normál jutalomban részesül.

A GHOST limitált verzióját, ahol legfeljebb 7 generációig szerepelhet nagybácsi, két ok miatt használtuk. Először is a korlátlan GHOST túl sok komplikációval járna annak kiszámításában, hogy egy adott blokkban mely nagybácsik érvényesek. Másodsorban a korlátlan GHOST, ahogy az Ethereumban használják, nem ösztönzi a bányászt, hogy a fő láncon bányásszon a nyilvános támadó által használt lánc helyett.

### Díjak {#fees}

Mivel a blokkláncban közzétett minden tranzakció költséget ró a hálózatra a letöltés és a hitelesítés miatt, szükség van valamilyen szabályozó mechanizmusra, általában tranzakciós díjak beiktatására, hogy meg lehessen akadályozni a rosszindulatú viselkedést. A Bitcoinban is alkalmazott alapértelmezett megközelítés szerint tisztán önkéntes díjakra van szükség, ami a bányászokra támaszkodik abban, hogy őrizzék a biztonságot és dinamikus minimumokat állítsanak be. Ezt a megközelítést nagyon kedvezően fogadták a Bitcoin közösségben, különösen azért, mert az „piaci alapú”, megengedi, hogy a bányászok és a tranzakciók küldői közötti keresletet és kínálatot határozza meg az árat. A probléma ezzel az érveléssel az, hogy a tranzakciók feldolgozása nem egy piac; bár intuitív módon vonzó a tranzakció feldolgozását olyan szolgáltatásként értelmezni, amelyet a bányász kínál küldőnek, a valóságban minden olyan tranzakciót, amelyhez bányász kell, a hálózat minden csomópontján fel kell dolgozni, így a tranzakció feldolgozási költségének jelentős részét külső felek fizetik, és nem a bányász hozza meg azt a döntést, hogy foglalkozik-e vele vagy sem. Így nagyon valószínű a „közlegelők tragédiája" típusú problémák előfordulása.

Azonban úgy tűnik, hogy a piaci alapú mechanizmus ezen hibája, amikor pontatlan egyszerűsítő feltételezéssel élnek, mágikusan megszünteti saját magát. Az érvelés a következő. Tegyük fel, hogy:

1. Egy tranzakció `k` művelethez vezet, `kR` jutalmat kínál minden olyan bányásznak, aki szerepel benne, ahol az `R` értéket a küldő állítja be, és a `k` és `R` (nagyjából) már előre látható a bányász oldalán.
2. Egy művelet feldolgozásához szükséges költség `C` bármely csomóponton (azaz az összes csomópont hatékonysága azonos)
3. `N` bányász csomópont van, mindegyik pontosan ugyanannyi feldolgozási teljesítménnyel (azaz `1/N` az összesből)
4. Nem létezik nem bányászó teljes csomópont.

Egy bányász akkor hajlandó feldolgozni a tranzakciót, ha a várható jutalom nagyobb, mint a költség. Így a várható jutalom `kR/N` mivel a bányásznak `1/N` esélye van feldolgozni a következő blokkot, és a bányász feldolgozási költsége `kC`. Következésképpen a bányászok olyan tranzakciókban fognak részt venni, ahol `kR/N > kC`, vagy `R > NC`. Ne feledjük, hogy `R` a küldő által műveletenként biztosított díj, amely alulról korlátozza azt az előnyt, amit a küldő a tranzakcióból nyer, és az `NC` pedig a műveletet feldolgozó teljes hálózat költsége. Következésképpen a bányászok csak olyan tranzakcióban érdekeltek, amelyen a teljes haszonelvű előny nagyobb, mint a költség.

Azonban a valóságban a feltételezésektől számos fontos eltérés mutatkozik:

1. A bányász nagyobb költséget fizet a tranzakció feldolgozásáért mint a többi, hitelesítést végző csomópont, mivel az extra hitelesítéshez szükséges idő késlelteti a blokk terjedését, és növeli annak az esélyét, hogy a blokk elavulttá válik.
2. Tehát mégis létezik nem bányászó teljes csomópont.
3. A bányászati teljesítmény eloszlása a gyakorlatban radikálisan egyenlőtlenné válhat.
4. A spekulánsok, politikai ellenségek és őrültek, akiknek a használati függvényei a hálózatra nézve káros elemeket tartalmaznak okosan olyan szerződéseket készíthetnek, amelyekben a költségeik sokkal alacsonyabbak, mint a többi hitelesítő csomópont által fizetett költségek.

(1) olyan tendenciát biztosít a bányásznak, hogy kevesebb tranzakcióba vonódjon bele, és (2) növeli az `NC` értékét; következésképpen ez a két hatás legalább részben kioltja egymást.<sup>[Hogyan?](https://github.com/ethereum/wiki/issues/447#issuecomment-316972260)</sup> A (3) és (4) a fő probléma; megoldásukra egy egyszerű lebegő limitet alkalmazunk: egyetlen blokkon sem lehet több művelet mint a hosszú távú exponenciális mozgóátlag `BLK_LIMIT_FACTOR`-szorosa. Különösképpen:

```js
blk.oplimit = floor((blk.parent.oplimit \* (EMAFACTOR - 1) +
floor(parent.opcount \* BLK\_LIMIT\_FACTOR)) / EMA\_FACTOR)
```

A `BLK_LIMIT_FACTOR` és az `EMA_FACTOR` állandó, beállításuk 65 536 és 1,5 van jelenleg, amely további elemzés után változhat.

Van még egy faktor, ami megszünteti a nagy blokkméretek iránti elköteleződést a Bitcoinban: a nagy blokkok terjedési ideje hosszabb, és így nagyobb eséllyel válnak elavulttá. Az Ethereumban a sok gázt fogyasztó blokkoknak is több időre van szüksége a terjedéshez, mivel egyrészt fizikailag hosszabbak, másrészt több időbe telik a státuszváltozási tranzakciók feldolgozásának validálása. Ez a késleltetési negatív ösztönző jelentős tényező a Bitcoin esetében, az Ethereum világában azonban kevésbé jellemző a GHOST protokoll miatt; következésképpen a szabályozott blokklimitekre való támaszkodás stabilabb alapkonfigurációt tesz lehetővé.

### Számítás és Turing-teljesség {#computation-and-turing-completeness}

Fontos megjegyezni, hogy az Ethereum virtuális gép Turing-teljes; azaz az EVM-kód minden olyan számítást képes titkosítani, amelyet rejtve lehet elvégezni, ideértve a végtelen hurkokat is. Az EVM-kód a hurkokat kétféleképpen teszi lehetővé. Egyfelől a `JUMP` utasítás lehetővé teszi a programnak, hogy visszaugorjon egy korábbi pontra a kódban, míg a `JUMPI` utasítás feltételhez kötött ugrást hajt végre, lehetővé téve a `while x < 27: x = x * 2` típusú állításokat. Másodsorban a szerződések más szerződéseket is meghívhatnak, ami potenciálisan lehetővé teszi a rekurzión keresztül történő hurkok alkalmazását. Ez természetesen egy problémát eredményez: a kártékony felhasználók le tudják állítani a bányászokat és a teljes csomópontokat azzal, hogy végtelen hurokba lépésre kényszerítik őket? Ez a helyzet a számítástechnikában megakadásproblémaként ismert: általánosságban nem lehet megmondani, hogy egy adott program mikor akad meg.

Mint azt a státuszváltozási részben is leírtuk, a megoldásunk úgy működik, hogy egy tranzakcióban be kell állítani a maximálisan engedélyezett számítási lépések számát, és ha a futtatás tovább tart, a számítást visszatérítik, azonban díjat kell fizetni. Az üzenetek hasonlóképpen működnek. A megoldás mögötti motiváció bemutatására nézzük az alábbi példákat:

- Egy támadó létrehoz egy szerződést, amely végtelen hurkot futtat, majd egy tranzakciót küld a bányásznak, amely aktiválja a hurkot. A bányász feldolgozza a tranzakciót, futtatja a végtelen hurkot, majd megvárja, amíg elfogy a gáz. Bár a futtatás közben kifogy a gáz és félúton megáll, a tranzakció továbbra is érvényes, és a bányász bekéri a díjat a támadótól minden számítási lépésért.
- Egy támadó egy nagyon hosszú végtelen hurkot hoz létre azzal a szándékkal, hogy a bányász olyan sokáig végezze a számítást, hogy a számítás végére pár új blokk is kikerüljön, és így lehetetlenné váljon a bányásznak a tranzakció belefoglalása, hogy díjat számíthasson fel. Azonban a támadónak be kell küldenie egy `STARTGAS` értéket, amely korlátozza a futtatásban használható számítások számát, így a bányász már előre tudni fogja, hogy a számítás jelentősen több lépésből fog állni.
- Egy támadó valami ilyesmit kódot lát a szerződésben `send(A,contract.storage[A]); contract.storage[A] = 0`, és pont annyi gázzal küldi el a tranzakciót, hogy futtatni lehessen az első lépést, de a másodikat már ne (azaz meglegyen a levétel, de az egyenleg ne csökkenjen le). A szerződés létrehozójának nem kell azon aggódnia, hogy védekezzen az ilyen támadások ellen, mivel ha a futtatás félúton megáll, azok vissza lesznek térítve.
- Egy pénzügyi szerződés úgy működik, hogy kilenc tulajdonos adatforrásának középértékét veszi a kockáztok minimalizálása érdekében. Amikor egy támadó átvesz egy adatforrást, amelyet úgy terveztek, hogy módosítható legyen a DAO részben ismertetett változó-cím-meghívás mechanizmuson keresztül, átkonvertálja úgy, hogy végtelen hurokban fusson, és így megpróbálja kikényszeríteni azokat a próbálkozásokat, amelyek pénzeszközöket kérnek a pénzügyi szerződéstől, amíg ki nem fogy a gáz. Azonban a pénzügyi szerződésekben be lehet állítani gázkorlátozást az üzeneten, és így meg lehet előzni a problémát.

A Turing-teljesség alternatívája a Turing-nem-teljesség, ahol a `JUMP` és `JUMPI` nem létezik, és egyszerre csak egy szerződéspéldány létezhet a hívás-stackben. Ezzel a rendszerrel a korábban ismertetett díjrendszer és a megoldásunk hatékonyságával kapcsolatos bizonytalanságok nem feltétlenül szükségesek, mivel a szerződés futtatásának költségét annak mérete korlátozza be. Továbbá a Turing-nem-teljesség nem túl nagy korlátozást jelent; az általunk kitalált összes szerződés példa közül csupán egyhez volt szükség hurokra, és még ez az egy hurok is eltávolítható egy 26-szor ismételt, egysoros kódrészlettel. A Turing-teljesség súlyos implikációi, valamint a korlátozott haszon alapján, miért nincs egy Turing-nem-teljesség nyelv? A valóságban a Turing-nem-teljesség messze van a probléma elegáns megoldásától. Nézzük meg a következő szerződéseket, hogy ennek okát megértsük:

```sh
C0: call(C1); call(C1);
C1: call(C2); call(C2);
C2: call(C3); call(C3);
...
C49: call(C50); call(C50);
C50: (futtasson egy lépést a programból, majd rögzítse a változtatást a tárhelyen)
```

Küldjön egy tranzakciót A-nak. Így 51 tranzakcióban van egy olyan szerződésünk, amely akár 2<sup>50</sup> számítási lépést is magában foglalhat. A bányászok megpróbálhatják már előre kiszűrni ezeket a logikai bombákat, ha értéket tartanak minden szerződés mellett, amely meghatározza, hogy legfeljebb mennyi számítási lépést vehet fel, és kiszámítják ezt azokhoz a szerződésekhez, amelyek rekurzívan hívnak más szerződéseket. Ez azonban arra kényszerítené a bányászokat, hogy letiltsák azokat a szerződéseket, amelyek más szerződéseket hoznak létre (mivel a fenti 26 szerződés létrehozása és futtatása könnyedén egy szerződésbe gyúrható). Másik problematikus pont, hogy az üzenet címmezője egy változó, tehát általánosságban idő előtt nem lehet megmondani, hogy milyen más szerződést fog meghívni egy adott szerződés. Ezért összességében meglepő következtetésre jutottunk: a Turing-teljességet meglepően könnyű kezelni, valamint a Turing-teljesség hiányát hasonlóképpen meglepően nehéz kezelni, kivéve, ha ugyanazokat a kontrollokat alkalmazzuk – de ebben az esetben miért ne legyen a protokoll Turing-teljes?

### Valuta és kibocsátás {#currency-and-issuance}

Az Ethereum rendszerben a saját beépített valuta, az ether kettős célt szolgál, egyfelől egy elsődleges likviditási réteget biztosít a különböző digitális eszközök közötti hatékony váltáshoz, másfelől fontos mechanizmust biztosít a tranzakciós költségek fizetésére. Kényelmi szempontból, valamint elkerülve a későbbi vitákat (lásd a jelenlegi mBTC/uBTC/satoshi vitát a Bitcoin kapcsán), a névértékek előre felcímkézésre kerül:

- 1: wei
- 10<sup>12</sup>: szabo
- 10<sup>15</sup>: finney
- 10<sup>18</sup>: ether

Ez a „dollár” és „cent”, illetve a „BTC” és „satoshi” koncepció kibővített változataként értelmezhető. A közeljövőben az „ether” lesz használatos a hagyományos tranzakciókra, a „finney” a mikrotranzakciókra, a „szabo” és a „wei” pedig a díjakkal és protokollimplementációkkal kapcsolatos technikai értekezésekben; a fennmaradó címletek pedig később lehetnek hasznosak, és jelenleg nem szerepelnek a kliensekben.

A kibocsátási modell a következő:

- Az ether mint valuta egy BTC-hez viszonyítva 1000–2000 ether árfolyamon fog forogni; ez a mechanizmus az Ethereum szervezet forrásait biztosítja, valamint ezzel lehet fizetni a fejlesztésekért, amelyet más platformon, például a Mastercoinon és az NXT-n már sikerrel használtak. A korai vásárlók nagyobb kedvezményekben részesülnek. Az eladásból kapott BTC-ket teljes mértékben a fejlesztők fizetésére és javadalmazására fordítják, valamint különböző profitot célzó és non-profit projektekbe fektetik az Ethereum és kriptovaluta ökoszisztémában.
- A teljes értékesített összeg (60 102 216 ETH) 0,099-szeresét a szervezet kapja a korai hozzájárulók kompenzálására, valamint az ETH-ben denominált költségekre fordítják a genezisblokk előtt.
- A teljes értékesített összeg 0,099-szeresét hosszú távú tartalékba helyezik.
- A teljes értékesített összeg 0,26-szorosa a bányászokhoz kerül évente, örökre ezután a pont után.

| Csoport                           | Indításkor | Egy év után | Öt év után |
| --------------------------------- | ---------- | ----------- | ---------- |
| Pénznemegységek                   | 1,198 X    | 1,458 X     | 2,498 X    |
| Vevők                             | 83,5%      | 68,6%       | 40,0%      |
| Eladás előtt felhasznált tartalék | 8,26%      | 6,79%       | 3,96%      |
| Eladás után felhasznált tartalék  | 8,26%      | 6,79%       | 3,96%      |
| Bányászok                         | 0%         | 17,8%       | 52,0%      |

#### Hosszú távú kínálati növekedési ütem (százalék)

![Ethereum-infláció](./ethereum-inflation.png)

_A lineáris valutakibocsátások ellenére, a Bitcoinhoz hasonlóan, a kínálati növekedési ütem nulla felé tart._

A fenti modellben két fő választási lehetőség van: 1) egy felnagyítási alap megléte és mérete; és 2) egy állandóan növekvő lineáris kínálat megléte, szemben a Bitcoin esetében látható felső korlátos kínálattal. A felnagyítási alap indoklása a következő. Ha nincs felnagyítási alap, és a lineáris kibocsátás 0,217x-re csökken az azonos mértékű infláció biztosítására, akkor az ether teljes mennyisége 16,5%-kal lesz kevesebb, és így minden egység 19,8%-kal értékesebb lesz. Következésképpen az egyensúlyban 19,8%-kal több ethert vásárolnak az értékesítés folyamán, így minden egység megőrzi korábbi értékét. A szervezet ezután 1,198x BTC-vel rendelkezik, amelyet két szeletre lehet bontani: az eredeti BTC és a további 0,198x-es rész. Következésképpen a helyzet _pontosan megegyezik_ a nagyítással, van azonban egy fontos különbség: a szervezetnél csupán BTC van, és így nincs ösztönözve arra, hogy támogassa az ether mértékegység értékét.

Az állandó lineáris keresletnövekedési modell csökkenti a Bitcoin esetében sokak által túlzónak tartott vagyonkoncentráció kockázatát, és lehetőséget biztosít a jelenlegi és jövőbeli vásárlóknak, hogy reális esélyük legyen valutaegységeket venni, ugyanakkor erősen ösztönöz arra, hogy még több ethert vegyenek és tartsanak, mivel a „keresletnövekedési ütem” százalékos értéke továbbra is idővel a nulla felé közelít. Azt is feltételezzük, hogy mivel óvatlanság, haláleset stb. miatt mindig van, aki elveszti az érméit, és ez százalékosan is modellezhető az éves kínálat függvényében, a forgalomban lévő teljes valutakészlet végül a veszteség arányával elosztott éves kibocsátás értékével azonos értéken stabilizálódik (például, ha a veszteség aránya 1%, akkor amint a kínálat eléri a 26X-t, évente 0,26X lesz bányászva és 0,26X veszik el, és létrejön az egyensúly).

Ne feledjük, hogy a jövőben valószínű, hogy az Ethereum proof-of-stake modellre vált a biztonság érdekében, és évi nulla és 0,05X közé csökken a kibocsátásra vonatkozó követelmény. Abban az esetben, ha az Ethereum-szervezet elveszíti pénzeszközeit, vagy valamilyen más okból kifolyólag eltűnik, nyitva hagyunk egy „társadalmi szerződést”: mindenkinek joga van létrehozni egy jövőbeli Ethereum-verziót azzal a feltétellel, hogy az ether mennyisége legfeljebb `60102216 * (1,198 + 0,26 * n)` lehet, ahol az `n` a genezisblokk utáni évek számát jelöli. A létrehozók a proof-of-stake által hajtott kínálatnövekedés és a maximálisan engedélyezett kínálatbővülés különbségét részben vagy egészben szabadon értékesíthetik tömeges eladás (crowd-sell) formájában, illetve kioszthatják a fejlesztés költségeinek lefedésére. Azok a frissítések, amelyek nem felelnek meg a társadalmi szerződés követelményeinek, jogosan elágaztathatók a követelményeknek megfelelő verziókba.

### A bányászat centralizálása {#mining-centralization}

A Bitcoin bányászati algoritmusa úgy működik, hogy a bányászok SHA256-számításokat végeznek a blokkfejléc kissé módosított verzióin egymás után több milliószor, amíg végül egy csomópont egy verzióhoz ér, amelynek hashértéke kisebb mint a cél (jelenleg körülbelül 2<sup>192</sup>). Azonban ez a bányászati algoritmus a centralizáció két formájával szemben sérülékeny. Először is a bányászati ökoszisztémát az ASIC-ok (alkalmazásspecifikus integrált körök) az erre a célra tervezett számítógép-chipek dominálják, és ezért ezek többezerszer hatékonyabbak a Bitcoin-bányászat során. Ez azt jelenti, hogy a Bitcoin-bányászat már egyáltalán nem decentralizált és egyenlőségen alapuló tér, és több millió dolláros tőkére van szükség ahhoz, hogy hatékonyan részt lehessen venni benne. Másodsorban a legtöbb Bitcoin-bányász gyakorlatilag nem helyileg validálja a blokkokat; helyette egy centralizált bányászalapra támaszkodik a blokkfejlécek megadásakor. Ez a probléma azonban még rosszabb: a jelen tartalom írásakor a legjobb három bányászalap indirekt módon a feldolgozási teljesítmény körülbelül 50%-át birtokolja, bár ezt némiképp enyhíti az a tény, hogy a bányászok átválthatnak egy másik alapra, ha az alap vagy a koalíció 51%-os támadással próbálkozik.

Az Ethereumban jelenleg az a szándék, hogy olyan bányászati algoritmust használjanak, amelyben a bányászoknak véletlenszerűen kell adatot lekérniük a státuszból, ki kell számítaniuk néhány véletlenszerűen kiválasztott tranzakciót a blokklánc utolsó N blokkjáról, és vissza kell adniuk az eredmény hashét. Ennek két fontos előnye van. Először is az Ethereum-szerződésekben bármilyen számítás lehet, így egy Ethereum ASIC lényegében egy általános számításra használt ASIC – azaz egy jobb CPU. Másodszor, a bányászathoz hozzá kell férni a teljes blokklánchoz, ami arra kényszeríti a bányászokat, hogy a teljes blokkláncot tárolják, és legalább képesnek kell lenniük minden tranzakció hitelesítésére. Emiatt nincs szükség centralizált bányászati alapokra; bár a bányászati alapok továbbra is betöltik azt a legitim szerepet, hogy kiegyenlítik a jutalomelosztás véletlenszerűségét – ezt a funkciót ugyanígy el tudják látni a peer-to-peer alapok központi irányítás nélkül.

Ez a modell még nincs tesztelve, és szembesülhetünk még nehézségekkel az okos optimalizálások elkerülése okán, amikor a szerződésvégrehajtást bányászati algoritmusként használják. Azonban ennek az algoritmusnak egyik érdekes funkciója, hogy bárki „megmérgezheti a kutat”, ha nagyszámú szerződést vezet be a blokkláncra kifejezetten azért, hogy megakasszon bizonyos ASIC-okat. Az ASIC gyártók számára léteznek gazdasági ösztönzők arra, hogy ezzel a trükkel megtámadják egymást. Ezért az általunk fejlesztett megoldás végeredményben egy adaptív, gazdasági, humán megoldás, és nem pusztán technikai.

### Méretezhetőség {#scalability}

Az Ethereummal kapcsolatos gyakori aggály a skálázhatóság kérdése. A Bitcoinhoz hasonlóan az Ethereumnak is megvan az a hibája, hogy a hálózatban minden csomópontnak fel kell dolgoznia a tranzakciókat. A Bitcoin esetében a jelenlegi blokklánc mérete körülbelül 15 GB, ami óránként mintegy 1 MB-tal nő. Ha a Bitcoin hálózatnak másodpercenként 2000 Visa-tranzakciót kellene feldolgoznia, akkor három másodpercenként nőne 1 MB-tal (1 GB óránként, 8 TB évente). Az Ethereumon is hasonló növekedési tempó figyelhető meg, amelyet tovább nehezít az, hogy az Ethereum blokkláncán számos alkalmazást futtatnak, míg a Bitcoin egy valuta; ugyanakkor javítja a helyzetet, hogy az Ethereum teljes csomópontjainak csak a státuszt és nem a teljes blokkláncelőzményt kell tárolniuk.

A nagyméretű blokklánccal a centralizáció kockázata a fő probléma. Ha a blokklánc mérete mondjuk 100 TB-ra nő, a legvalószínűbb forgatókönyv szerint csak nagyon kevés nagyvállalat tud majd teljes csomópontot futtatni, az összes hagyományos felhasználó pedig könnyű SPV-csomópontokat fog használni. Egy ilyen helyzetben felmerülhet a lehetséges aggály, hogy a teljes csomópontok összefoghatnak, és megállapodhatnak abban, hogy profitábilis módon csaljanak (például módosítsák a blokkok után járó jutalmat, vagy BTC-t adjanak maguknak). A könnyű csomópontok nem tudják ezt azonnal felismerni. Természetesen legalább egy becsületes teljes csomópont valószínűleg létezne, és a csalás kiderülése után néhány órával már a Reddit is tele lenne a hírrel, azonban ezen a ponton már túl késő: a normál felhasználókon múlna, hogy szervezetten tiltólistára tegyék az adott blokkokat, ez a koordinációs probléma jelentős és szinte megoldhatatlan helyzetet teremt, hasonlóan egy sikeres 51%-os támadáshoz. A Bitcoin esetében ez jelenleg probléma, de létezik rá egy blokkláncmódosítási [javaslat Peter Toddtól](https://web.archive.org/web/20140623061815/http://sourceforge.net/p/bitcoin/mailman/message/31709140/), amely enyhít a problémán.

Az Ethereum két további stratégiát fog használni a probléma megoldására. Először a blokkláncalapú bányászati algoritmusok miatt legalább minden bányász rá lesz kényszerítve, hogy teljes csomópont legyen, ami alacsonyabb korlátot hoz létre a teljes csomópontok viszonylatában. Másodszor, ami még fontosabb, egy közbenső státuszfagyökeret szerepeltetünk a blokkláncban a tranzakciók feldolgozása után. Még akkor is, ha a blokk validálása centralizált, amíg van becsületes hitelesítő csomópont, a centralizációs probléma megkerülhető a protokoll validálásával. Ha egy bányász érvénytelen blokkot tesz közzé, akkor a blokk nincs megfelelően formázva, vagy az `S[n]` státusz pontatlan. Mivel az `S[0]` kód pontos, kell lennie egy első `S[i]` státusznak, amely hibás ott, ahol az `S[i-1]` pontos. A hitelesítő csomópont megadja az `i` indexet egy érvénytelenségi bizonyítékkal (proof of invalidity), amely olyan Patricia-facsomópontokból áll, amelyeknek fel kell dolgozniuk az `APPLY(S[i-1],TX[i]) -> S[i]` kifejezést. A csomópontok használni tudják ezeket a Patricia-csomópontokat a számítás egy részének futtatásához, és látni fogják, ha a generált `S[i]`nem egyezik a megadott `S[i]` értékkel.

Egy másik, kifinomultabb támadásban rosszindulatú bányászok félkész blokkokat publikálnak, így a teljes információ nem is létezik annak megállapítására, hogy a blokk érvényes-e. A megoldás egy kihívásra reagáló protokoll: az ellenőrző csomópontok céltranzakciós indexek formájában „kihívásokat” adnak ki, majd amikor visszakapnak egy csomópontot, egy könnyű csomópont mindaddig érvénytelennek tekinti a blokkot, amíg egy másik csomópont, egy bányász vagy egy másik hitelesítő, vissza nem ad Patricia-csomóponti alkészleteket, igazolva az érvényességet.

## Következtetés {#conclusion}

Az Ethereum protokollt eredetileg egy frissített kriptovaluta-verziónak tekintették, amely haladó funkciókat is kínált, például blokkláncon lévő fedezetet, kivételi korlátokat, pénzügyi szerződéseket, szerencsejátékpiacokat és hasonlókat egy nagyon általánosított programnyelven. Az Ethereum-protokoll nem „támogatná” közvetlenül az alkalmazásokat, azonban a Turing-teljes programnyelv megléte azt jelenti, hogy tetszőleges mennyiségű szerződés hozható létre bármilyen tranzakciótípushoz vagy alkalmazáshoz. Még érdekesebb az Ethereummal kapcsolatban, hogy az Ethereum-protokoll sokkal több puszta valutánál. A decentralizált fájltárolással, számításokkal és hírtőzsdei piacokkal kapcsolatos protokollok a több tucat hasonló koncepció mellett magukban rejtik a számítási ipar jelentős hatékonyságnövelésének potenciálját, és masszív lökést adnak más peer-to-peer protokolloknak egy korábban nem látott gazdasági réteg hozzáadásával. Végezetül pedig jelentős számú alkalmazás van, amely egyáltalán nem foglalkozik pénzzel.

Az Ethereum-protokollban implementált tetszőleges státuszváltozási függvény koncepciója egyedi potenciált rejtő platformot kínál; szemben a zárt végű, egycélú protokollokkal, amelyeket egy bizonyos típusú alkalmazásra fejlesztenek az adattárolás, pénzügy vagy szerencsejáték világában, az Ethereum egy alapvetően nyílt végű koncepció, és hiszünk abban, hogy kiválóan szolgál sok pénzügyi és nem pénzügyi protokoll alaprétegeként az elkövetkező években.

## Jegyzetek és további olvasnivaló {#notes-and-further-reading}

### Jegyzetek {#notes}

1. A kifinomult olvasó észreveheti, hogy gyakorlatilag egy Bitcoin-cím az elliptikus görbe nyilvános kulcs hashe, és nem a nyilvános kulcs maga. Azonban gyakorlatilag teljesen legitim kriptográfiai terminológia a pubkey hash nyilvános kulcsként történő hivatkozása. Ez azért van, mert a Bitcoin kriptográfiáját tekinthetjük egy egyedi digitális aláírás-algoritmusnak, ahol a nyilvános kulcs az ECC pubkey hashéből áll, az aláírás az ECC pubkey és az ECC aláírás együttesen, a hitelesítő algoritmusban pedig az aláírásban lévő ECC pubkeyt a nyilvános kulcsként rendelkezésre bocsátott ECC pubkey hashsel vetik összes, majd az ECC aláírást az ECC pubkey értékével hitelesítik.
2. Gyakorlatilag a 11 előző blokk mediánja.
3. Belső értelmezésben a 2 és a „CHARLIE” egy szám<sup>[fn3](#notes)</sup>, ez utóbbi big-endian bázis 256-os reprezentációjában van. A számok 0-tól legfeljebb 2<sup>256</sup>-1-ig terjedhetnek.

### További olvasnivaló {#further-reading}

1. [Valódi érték](http://bitcoinmagazine.com/8640/an-exploration-of-intrinsic-value-what-it-is-why-bitcoin-doesnt-have-it-and-why-bitcoin-does-have-it/)
2. [Okos tulajdonság](https://en.bitcoin.it/wiki/Smart_Property)
3. [Okosszerződések](https://en.bitcoin.it/wiki/Contracts)
4. [B-money](http://www.weidai.com/bmoney.txt)
5. [Újrahasznosítható proof-of-work](https://nakamotoinstitute.org/finney/rpow/)
6. [Biztonságos tulajdonságcímek tulajdonosi rendelkezéssel](https://nakamotoinstitute.org/secure-property-titles/)
7. [Bitcoin fehérkönyv](http://bitcoin.org/bitcoin.pdf)
8. [Namecoin](https://namecoin.org/)
9. [Zooko háromszöge](https://wikipedia.org/wiki/Zooko's_triangle)
10. [Colored coins fehérkönyv](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit)
11. [Mastercoin fehérkönyv](https://github.com/mastercoin-MSC/spec)
12. [Decentralizált autonóm vállalatok, Bitcoin Magazine](http://bitcoinmagazine.com/7050/bootstrapping-a-decentralized-autonomous-corporation-part-i/)
13. [Egyszerűsített fizetéshitelesítés](https://en.bitcoin.it/wiki/Scalability#Simplified_payment_verification)
14. [Merkle-fák](https://wikipedia.org/wiki/Merkle_tree)
15. [Patricia-fák](https://wikipedia.org/wiki/Patricia_tree)
16. [GHOST](https://eprint.iacr.org/2013/881.pdf)
17. [StorJ és Autonóm ügynökök, Jeff Garzik](http://garzikrants.blogspot.ca/2013/01/storj-and-bitcoin-autonomous-agents.html)
18. [Mike Hearn az Okos tulajdonságokról a Turing Fesztiválon](https://www.youtube.com/watch?v=MVyv4t0OKe4)
19. [Ethereum RLP](https://github.com/ethereum/wiki/wiki/%5BEnglish%5D-RLP)
20. [Ethereum Merkle-Patricia-fák](https://github.com/ethereum/wiki/wiki/%5BEnglish%5D-Patricia-Tree)
21. [Peter Todd a Merkle-összegfákról](https://web.archive.org/web/20140623061815/http://sourceforge.net/p/bitcoin/mailman/message/31709140/)

_A fehérkönyv történetét tekintse meg ezen [a wiki](https://github.com/ethereum/wiki/blob/old-before-deleting-all-files-go-to-wiki-wiki-instead/old-whitepaper-for-historical-reference.md) oldalon._

_Az Ethereum, hasonlóan sok más közösség által vezetett, nyílt forráskódú szoftverprojekthez, a kezdeti elindulás óta sokat fejlődött. Ha többet szeretnél megtudni az Ethereum legutóbbi fejlesztéseiről és az általunk elvégzett protokollváltoztatásokról, akkor ezt az [útmutatót](/learn/) ajánljuk._
