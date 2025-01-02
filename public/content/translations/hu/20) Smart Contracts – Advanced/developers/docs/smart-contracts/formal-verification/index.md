---
title: Az okosszerződések formális ellenőrzése
description: Az Ethereum-okosszerződések formális ellenőrzésének áttekintése
lang: hu
---

Az [okosszerződések](/developers/docs/smart-contracts/) lehetővé teszik a decentralizált, bizalomigény nélküli és robusztus alkalmazások létrehozását, amelyek új felhasználási módokat vezetnek be és értéket teremtenek a felhasználók számára. Mivel az okosszerződések nagy mennyiségű értéket kezelnek, a biztonság kritikus szempont a fejlesztőknek.

A formális ellenőrzés az egyik ajánlott technika az [okosszerződések biztonságának](/developers/docs/smart-contracts/security/) javítására. A formális ellenőrzést, amely [formális módszereket](https://www.brookings.edu/techstream/formal-methods-as-a-path-toward-better-cybersecurity/) használ a programok specifikálására, tervezésére és ellenőrzésére, már évek óta használják a kritikus hardver- és szoftverrendszerek helyességének biztosítására.

Az okosszerződésekben megvalósított formális ellenőrzéssel bizonyítani lehet, hogy a szerződés üzleti logikája megfelel egy előre meghatározott specifikációnak. A szerződéskód helyességének értékelésére szolgáló más módszerekkel összehasonlítva, mint amilyen a tesztelés, a formális ellenőrzés erősebb garanciát nyújt arra, hogy az okosszerződés funkcionálisan helyes.

## Mi az a formális ellenőrzés? {#what-is-formal-verification}

A formális ellenőrzés során egy rendszer helyességét egy formális specifikáció alapján értékeljük. Egyszerűbben, a formális ellenőrzéssel ellenőrizhetjük, hogy egy rendszer viselkedése kielégít-e meghatározott követelményeket (azt teszi-e, amit szeretnénk).

A rendszer (jelen esetben egy okosszerződés) várható viselkedését formális modellezéssel írják le, a specifikációs nyelvek pedig lehetővé teszik a formális tulajdonságok létrehozását. A formális ellenőrzési technikákkal ellenőrizni lehet, hogy a szerződés megvalósítása megfelel-e a specifikációjának, és matematikai bizonyítékot nyerhetünk a helyességére. Ha egy szerződés megfelel a specifikációjának, akkor azt „funkcionálisan helyesnek”, „tervezési szempontból helyesnek” vagy „konstrukciós szempontból helyesnek” nevezik.

### Mi az a formális modell? {#what-is-a-formal-model}

Az informatikában a [formális modell](https://en.wikipedia.org/wiki/Model_of_computation) egy számítási folyamat matematikai leírása. A programokat matematikai függvényekké (egyenletekké) absztrahálják, és a modell leírja, hogy a függvények kimenetei hogyan számíthatók ki egy bemenet alapján.

A formális modellek olyan absztrakciós szintet biztosítanak, amelyen a program viselkedésének elemzése kiértékelhető. A formális modellek létezése lehetővé teszi egy _formális specifikáció_ létrehozását, amely leírja az adott modell kívánt tulajdonságait.

A formális ellenőrzésnél különböző technikákat használnak az okosszerződések modellezésére. Egyes modelleket például arra használnak, hogy egy okosszerződés magas szintű viselkedéséről gondolkodjanak. Ezek a modellezési technikák feketedobozos szemléletet alkalmaznak az okosszerződésekre, olyan rendszereknek tekintve őket, amelyek bemeneteket fogadnak el, és ezek alapján számításokat hajtanak végre.

A magas szintű modellek az okosszerződések és a külső szereplők közötti kapcsolatra összpontosítanak, mint amilyenek a külső tulajdonú számlák (EOA), a szerződésszámlák és a blokklánckörnyezet. Az ilyen modellek hasznosak olyan tulajdonságok definiálásához, amelyek meghatározzák, hogy a szerződésnek hogyan kell viselkednie bizonyos felhasználói interakciók hatására.

Ezzel szemben más formális modellek az okosszerződés alacsony szintű viselkedésére összpontosítanak. Míg a magas szintű modellek segíthetnek a szerződés funkcionalitásáról való gondolkodásban, a végrehajtás belső működésének részleteit nem feltétlenül rögzítik. Az alacsony szintű modellek fehérdobozos szemléletet alkalmaznak a programelemzésre, és az okosszerződés-alkalmazások alacsonyabb szintű reprezentációira, például programnyomokra és [kontrollfolyamat-ábrákra](https://en.wikipedia.org/wiki/Control-flow_graph) támaszkodnak, hogy a szerződés végrehajtása szempontjából releváns tulajdonságokra következtessenek.

Az alacsony szintű modellek ideálisnak számítanak, mivel az Ethereum végrehajtási környezetében ([EVM](/developers/docs/evm/)) egy okosszerződés tényleges végrehajtását reprezentálják. Az alacsony szintű modellezési technikák különösen hasznosak az okosszerződések kritikus biztonsági tulajdonságainak megállapításában és a potenciális sebezhetőségek felderítésében.

### Mi az a formális specifikáció? {#what-is-a-formal-specification}

A specifikáció egyszerűen egy műszaki követelmény, amelynek egy adott rendszernek meg kell felelnie. A programozásban a specifikációk általános elképzeléseket jelentenek egy program végrehajtásáról (a programnak mit kell tennie).

Az okosszerződésekkel összefüggésben a formális specifikációk _tulajdonságokra_ utalnak – azoknak a követelményeknek a formális leírására, amelyeknek egy szerződésnek meg kell felelnie. Az ilyen tulajdonságokat „konstansoknak” nevezik, és olyan logikai állításokat képviselnek a szerződés végrehajtásáról, amelyeknek minden lehetséges körülmény között, kivételek nélkül igaznak kell maradniuk.

Így a formális specifikációra úgy gondolhatunk, mint egy formális nyelven írt kijelentésgyűjteményére, amelyek leírják az okosszerződés tervezett végrehajtását. A specifikációk a szerződés tulajdonságaira vonatkoznak, és meghatározzák, hogy a szerződésnek hogyan kell viselkednie különböző körülmények között. A formális ellenőrzés célja annak meghatározása, hogy egy okosszerződés rendelkezik-e ezekkel a tulajdonságokkal (konstansokkal), és hogy ezek a tulajdonságok nem sérülnek-e a végrehajtás során.

A formális specifikációk kritikusak az okosszerződések biztonságos implementációinak fejlesztésében. Azok a szerződések, amelyek nem teljesítik a konstansokat, vagy tulajdonságaikat a végrehajtás során megsértik, hajlamosak olyan sebezhetőségekre, amelyek károsíthatják a funkcionalitást vagy rosszindulatú kihasználást okozhatnak.

## Az okosszerződések formális specifikációinak típusai {#formal-specifications-for-smart-contracts}

A formális specifikációk lehetővé teszik a programvégrehajtás helyességére vonatkozó matematikai következtetéseket. A formális modellekhez hasonlóan a formális specifikációk is rögzíthetik a szerződés implementációjának magas szintű tulajdonságait vagy alacsony szintű viselkedését.

A formális specifikációkat a [programlogika](https://en.wikipedia.org/wiki/Logic_programming) elemeinek felhasználásával vezetik le, amelyek lehetővé teszik a program tulajdonságairól való formális következtetést. A programlogika formális szabályokat tartalmaz, amelyek (matematikai nyelven) kifejezik a program várható viselkedését. A formális specifikációk létrehozásához különböző programlogikákat használnak, többek között [elérhetőségi logikát](https://en.wikipedia.org/wiki/Reachability_problem), [időbeli logikát](https://en.wikipedia.org/wiki/Temporal_logic) és [Hoare-logikát](https://en.wikipedia.org/wiki/Hoare_logic).

Az okosszerződések formális specifikációi nagy vonalakban **magas** vagy **alacsony szintű** specifikációk közé sorolhatók. Függetlenül attól, hogy egy specifikáció milyen kategóriába tartozik, megfelelően és egyértelműen le kell írnia az elemzett rendszer tulajdonságát.

### Magas szintű specifikációk {#high-level-specifications}

Ahogy a neve is mutatja, a magas szintű specifikáció (más néven „modellorientált specifikáció”) egy program magas szintű viselkedését írja le. A magas szintű specifikációk az okosszerződést egy [véges állapotú gépként (FSM)](https://en.wikipedia.org/wiki/Finite-state_machine) modellezik, amely műveletek végrehajtásával képes státuszt váltani, időbeli logikát használva az FSM-modell formális tulajdonságainak meghatározásához.

[Az időbeli logika](https://en.wikipedia.org/wiki/Temporal_logic) olyan szabály, mely az idő szempontjából minősített állításokról szól (például _mindig_ éhes vagyok vagy _végül_ éhes leszek). A formális verifikációban az időbeli logikát a státuszgépekként modellezett rendszerek helyes viselkedésére vonatkozó állítások megfogalmazására használják. Pontosabban, egy időbeli logika leírja, hogy egy okosszerződés milyen státuszokban lehet, és hogyan vált azok között.

A magas szintű specifikációk általában két kritikus időbeli tulajdonságot rögzítenek az okosszerződések esetében: **biztonság** és **elérhetőség (liveness)**. A biztonsági tulajdonságok azt képviselik, hogy „nem történik semmi rossz”, és változatlanságot fejeznek ki. Egy biztonsági tulajdonság meghatározhat általános szoftverkövetelményeket, mint a [holtpontmentesség (deadlock)](https://www.techtarget.com/whatis/definition/deadlock), vagy kifejezheti a szerződések területspecifikus tulajdonságait (például a függvények hozzáférés-szabályozásának konstansai, a státuszváltozók megengedett értékei vagy a tokenátvitel feltételei).

Vegyük például ezt a biztonsági követelményt, amely az ERC-20 tokenszerződésekben a `transfer()` vagy `transferFrom()` használatának feltételeit tartalmazza: _„A feladó egyenlege soha nem lehet alacsonyabb, mint a küldendő tokenek kért mennyisége.”_. A szerződéskonstans természetes nyelvű leírása lefordítható formális (matematikai) specifikációvá, amelyet ellenőrizni lehet érvényességi szempontból.

Az elérhetőségtulajdonságok azt állítják, hogy „valami jó történik”, tehát a szerződés képes-e különböző státuszokon keresztül haladni. Egy példa az elérhetőségtulajdonságra a „likviditás”, tehát a szerződés képes-e a felhasználóknak átadni az egyenleget kérés alapján. Ha ez a tulajdonság sérül, a felhasználók nem tudnák kivenni a szerződésben tárolt eszközöket, ahogy az a [Parity-tárca incidens](https://www.cnbc.com/2017/11/08/accidental-bug-may-have-frozen-280-worth-of-ether-on-parity-wallet.html) esetében történt.

### Alacsony szintű specifikációk {#low-level-specifications}

A magas szintű specifikációk kiindulópontja egy szerződés véges státuszú modellje, és meghatározzák e modell kívánt tulajdonságait. Ezzel szemben az alacsony szintű specifikációk (más néven „tulajdonságorientált specifikációk”) gyakran matematikai függvények gyűjteményéből álló rendszerekként modellezik a programokat (okosszerződéseket), és leírják ezek helyes viselkedését.

Egyszerűbben fogalmazva, az alacsony szintű specifikációk _programnyomokat_ elemeznek, és megpróbálják meghatározni egy okosszerződés tulajdonságait ezeken keresztül. A nyomvonalak az okosszerződés státuszát változtató funkcióvégrehajtások sorozataira utalnak, ezért az alacsony szintű specifikációk meghatározzák a szerződés belső végrehajtásának követelményeit.

Az alacsony szintű formális specifikációkat Hoare-stílusú tulajdonságokként vagy végrehajtási útvonalakra vonatkozó konstansokként lehet megadni.

### Hoare-stílusú tulajdonságok {#hoare-style-properties}

A [Hoare-logika](https://en.wikipedia.org/wiki/Hoare_logic) egy sor formális szabályt biztosít a programok, köztük az okosszerződések helyességére vonatkozó érveléshez. Egy Hoare-stílusú tulajdonságot egy Hoare-hármas {_P_}_c_{_Q_} reprezentál, ahol _c_ egy program, _P_ és _Q_ állítások a _c_ státuszára (a programra) vonatkozóan, amelyeket formálisan _előfeltételekkel_ és _utófeltételekkel_ írunk le.

Az előfeltétel egy állítás, amely leírja a függvény helyes végrehajtásához szükséges feltételeket; a szerződést meghívó felhasználóknak meg kell felelniük ennek a követelménynek. Az utófeltétel egy állítás, amely azt a feltételt írja le, amelyet egy függvény helyesen végrehajtva állít fel; a felhasználók elvárhatják, hogy ez a feltétel igaz legyen a függvény meghívása után. A _konstans_ a Hoare-logikában olyan állítás, amely egy függvény végrehajtása során megmarad (nem változik).

A Hoare-stílusú specifikációk garantálhatják a _részleges_ vagy a _teljes helyességet_. Egy szerződésfüggvény végrehajtása „részben helyes”, ha az előfeltétel igaz a függvény végrehajtása előtt, és ha a végrehajtás befejeződik, akkor az utófeltétel is igaz. A teljes helyesség bizonyítékát akkor kapjuk meg, ha egy előfeltétel igaz a függvény végrehajtása előtt, a végrehajtás garantáltan befejeződik, és amikor ez megtörténik, az utófeltétel igaz.

A teljes helyesség bizonyítása nehéz, mivel egyes végrehajtások késhetnek a befejezés előtt, vagy egyáltalán nem fejeződnek be. Ennek ellenére a kérdés, hogy a végrehajtás befejeződik-e, vitatható, mivel az Ethereum gázmechanizmusa megakadályozza a végtelen programhurkokat (a végrehajtás vagy sikeresen befejeződik, vagy a gázhiány miatt ér véget).

A Hoare-logika segítségével létrehozott okosszerződés-specifikációk elő- és utófeltételekkel, valamint konstansokkal rendelkeznek a szerződésben szereplő függvények és ciklusok végrehajtásához. Az előfeltételek gyakran tartalmazzák egy függvény hibás bemeneteinek lehetőségét, az utófeltételek pedig leírják az ilyen bemenetekre várható választ (például megjelenik egy adott kivétel). Ily módon a Hoare-stílusú tulajdonságok hatékonyan biztosítják a szerződések megvalósításának helyességét.

Számos formális ellenőrzési keretrendszer Hoare-stílusú specifikációkat használ a függvények szemantikai helyességének bizonyítására. Lehetőség van arra is, hogy a Hoare-stílusú tulajdonságokat (mint állításokat) közvetlenül a szerződéskódhoz adjuk hozzá a Solidity `require` és `assert` utasításokkal.

A `require` utasítások előfeltételt vagy konstanst fejeznek ki, és gyakran használják a felhasználói bemenetek érvényesítésére, míg az `assert` a biztonsághoz szükséges utófeltételeket rögzíti. Például a függvények megfelelő hozzáférés-ellenőrzése (egy példa a biztonsági tulajdonságra) a `require` használatával érhető el, amely előfeltételként ellenőrzi a hívó fiók személyazonosságát. Hasonlóképpen, a szerződésben lévő státuszváltozók megengedett értékeire vonatkozó konstans (például a forgalomban lévő zsetonok teljes száma) védhető az `assert` használatával, hogy a függvény végrehajtása után igazoljuk a szerződés státuszát.

### Nyomvonalszintű tulajdonságok {#trace-level-properties}

A nyomvonalalapú specifikációk leírják a szerződés státuszváltozását biztosító műveleteket és az ezek közötti kapcsolatokat. Ahogy az korábban elhangzott, a nyomvonalak olyan műveletsorozatok, amelyek egy szerződés státuszát egy bizonyos módon változtatják meg.

Ez a megközelítés az okosszerződések státuszváltozási rendszerként való modellezésére épül, előre meghatározott státuszokkal (amelyeket az státuszváltozók írnak le) és változásokkal (amelyeket a szerződésfüggvények írnak le). Továbbá egy [kontrollfolyamat-ábra (CFG)](https://www.geeksforgeeks.org/software-engineering-control-flow-graph-cfg/), amely egy program végrehajtási folyamatának grafikus ábrázolása, gyakran használják a szerződés operációs szemantikájának leírására. Itt minden nyomvonal egy-egy útvonalként jelenik meg a kontrollfolyamat-ábrán.

A nyomvonal-szintű specifikációkat elsősorban arra használják, hogy az okosszerződések belső végrehajtási mintáira következtessenek. A nyomvonal-szintű specifikációk létrehozásával biztosítják az okosszerződés végrehajtási útvonalait (azaz a státuszváltozásokat). Olyan technikák segítségével, mint a szimbolikus végrehajtás, formálisan ellenőrizhetjük, hogy a végrehajtás soha nem követ olyan utat, amely nem a formális modellben van definiálva.

Vegyünk egy példát egy [DAO](/dao/) szerződésre, amely rendelkezik néhány nyilvánosan elérhető függvénnyel a nyomvonalszintű tulajdonságok leírására. Itt feltételezzük, hogy a DAO szerződés lehetővé teszi a felhasználók számára a következő műveletek végrehajtását:

- Pénzeszközök letétbe helyezése

- Pénzeszközök befizetése után szavazhat javaslatokról

- Visszatérítést igényelhet, ha nem szavaz egy javaslatról

A nyomvonalszintű tulajdonságok például a következők lehetnek: _„azok a felhasználók, akik nem fizetnek be pénzt, nem szavazhatnak egy javaslatról”_ vagy _„akik nem szavaznak egy javaslatról, mindig igényelhetnek visszatérítést”_. Mindkét tulajdonság a végrehajtás preferált sorrendjét érvényesíti (a szavazás nem történhet _előbb_, mint a pénzeszközök befizetése, és a visszatérítés igénylése nem történhet a javaslatról való szavazás _után_).

## Az okosszerződések formális ellenőrzésének technikái {#formal-verification-techniques}

### Modellellenőrzés {#model-checking}

A modellellenőrzés egy olyan formális ellenőrzési technika, amelyben egy algoritmus egy okosszerződés formális modelljét ellenőrzi annak specifikációjával szemben. A modellellenőrzés során az okosszerződéseket gyakran státuszváltozási rendszerekként ábrázolják, míg a szerződés megengedett státuszaira vonatkozó tulajdonságokat időbeli logika segítségével határozzák meg.

A modellellenőrzés egy rendszer absztrakt matematikai reprezentációjának (egy szerződésnek) a létrehozása és a rendszer tulajdonságainak kifejezése olyan formulák segítségével, amelyek az [üzleti logikában](https://www.baeldung.com/cs/propositional-logic) gyökereznek. Ez leegyszerűsíti a modellellenőrző algoritmus feladatát, nevezetesen annak bizonyítását, hogy egy matematikai modell kielégít-e egy adott logikai formulát.

A modellellenőrzést a formális ellenőrzésben elsősorban a szerződés időbeli viselkedését leíró időbeli tulajdonságok értékelésére használják. Az okosszerződések időbeli tulajdonságai közé tartozik a _biztonság_ és az _elérhetőség_, amelyeket korábban már kifejtettünk.

Például formális logikában leírható egy adott hozzáférés-szabályozással kapcsolatos biztonsági tulajdonság (pl. _kizárólag a szerződés tulajdonosa hívhatja meg a `selfdestruct` kódot_). Ezt követően a modellellenőrző algoritmus ellenőrizheti, hogy a szerződés megfelel-e ennek a formális specifikációnak.

A modellellenőrzés státuszterek feltárását használja, amely magában foglalja az okosszerződés összes státuszának létrehozását, és megpróbálja megtalálni a tulajdonságokat megsértő státuszokat. Ez végtelen számú státuszhoz vezethet (az úgynevezett státuszrobbanás problémája), ezért a modellellenőrzők absztrakciós technikákra támaszkodnak, hogy hatékonyan elemezhessék az okosszerződéseket.

### Tételbizonyítás {#theorem-proving}

A tételbizonyítás a programok, köztük az okosszerződések helyességére vonatkozó matematikai érvelés módszere. Ez magában foglalja a szerződéses rendszer modelljének és specifikációinak matematikai formulákká (logikai kijelentésekké) történő átalakítását.

A tételbizonyítás célja az állítások közötti logikai egyenértékűség igazolása. A „logikai egyenértékűség” (más néven logikai kettős következtetés) két állítás között az a kapcsolat, hogy az első állítás _akkor és csak akkor _ igaz, ha a második állítás igaz.

A szerződés modelljére és tulajdonságára vonatkozó állítások közötti szükséges kapcsolatot (logikai egyenértékűséget) bizonyítható állításként (tételként) fogalmazzuk meg. Egy formális következtetési rendszer segítségével az automatizált tételvizsgáló képes ellenőrizni a tétel érvényességét. Más szóval, egy tételpróba meggyőzően bizonyítani tudja, hogy egy okosszerződés modellje pontosan megfelel a specifikációinak.

Míg a modellellenőrzés a szerződéseket véges státuszváltozási rendszerekként modellezi, addig a tételbizonyítás végtelen státuszú rendszerek elemzését tudja kezelni. Ez azonban azt jelenti, hogy egy automatizált tételfelmérő nem mindig tudja, hogy egy logikai probléma „eldönthető” vagy sem.

Ennek eredményeképpen gyakran emberi segítségre van szükség ahhoz, hogy a tételmegállapítót a helyességi bizonyítások levezetésében irányítani lehessen. A tételek bizonyítása emberi erőfeszítéssel drágább, mint modellellenőrzéssel, amely teljesen automatizált.

### Szimbolikus végrehajtás {#symbolic-execution}

A szimbolikus végrehajtás egy okosszerződést elemző módszer, amely a funkciókat _szimbolikus értékek_ (például `x > 5`) helyett _konkrét értékek_ (például `x == 5`) használatával hajtja végre. A szimbolikus végrehajtás egy olyan formális ellenőrzési technika, mellyel formálisan magyarázzák a szerződéskód nyomvonalszintű tulajdonságait.

A szimbolikus végrehajtás egy végrehajtási nyomvonalat szimbolikus bemeneti értékek feletti matematikai képletként, más néven _útvonalállításként_ ábrázol. Egy [SMT megoldó](https://en.wikipedia.org/wiki/Satisfiability_modulo_theories) segítségével ellenőrizhetjük, hogy egy útvonalállítás „kielégíthető-e” (létezik-e olyan érték, amely kielégíti a formulát). Ha egy sérülékeny útvonal kielégíthető, az SMT megoldó egy konkrét értéket generál, amely a végrehajtást erre az útvonalra irányítja.

Tegyük fel, hogy egy okosszerződés függvénye bemenetként egy `uint` értéket (`x`) fogad el, és akkor tér vissza, ha `x` nagyobb, mint `5` és kisebb, mint `10`. A hibát kiváltó `x` értékének megtalálása normál tesztelési eljárással több tucat teszteset (vagy még több) lefuttatását igényelné anélkül, hogy biztosan megtalálná a hibát.

Ezzel szemben egy szimbolikus végrehajtó eszköz a függvényt a szimbolikus értékkel hajtaná végre: `X > 5 ∧ X < 10` (azaz `x` nagyobb, mint 5 ÉS `x` kisebb, mint 10). A kapcsolódó `x = X > 5 ∧ X < 10` útvonalállítást ezután egy SMT megoldónak adnánk megoldásra. Ha egy adott érték megfelel a `x = X > 5 ∧ X < 10` képletnek, az SMT megoldó kiszámítja azt – például a megoldó `7`-et adhat az `x` értékeként.

Mivel a szimbolikus végrehajtás a program bemeneteire támaszkodik, ezek pedig végtelen számúak lehetnek az összes státusz feltárásához, ez még mindig a tesztelés egyik formája. Amint azonban a példa mutatja, a szimbolikus végrehajtás hatékonyabb a tulajdonságokat megsértő bemenetek megtalálásában, mint a rendszeres tesztelés.

Ráadásul a szimbolikus végrehajtás kevesebb hamis pozitív eredményt produkál, mint más tulajdonságalapú technikák (például a fuzzing), amelyek véletlenszerűen generálják a függvénybemeneteket. Ha a szimbolikus végrehajtás során hiba lép fel, akkor lehetőség van a hibát kiváltó konkrét érték generálására és a probléma reprodukálására.

A szimbolikus végrehajtás a helyesség bizonyos fokú matematikai bizonyítására is alkalmas. Tekintsük meg a következő példát egy túlcsordulás elleni védelemmel ellátott szerződésfüggvényre:

```
function safe_add(uint x, uint y) returns(uint z){

  z = x + y;
  require(z>=x);
  require(z>=y);

  return z;
```

Egy egész szám túlcsordulását eredményező végrehajtási nyomvonalnak meg kell felelnie a képletnek: `z = x + y AND (z >= x) AND (z=>y) AND (z < x OR z < y)`. Egy ilyen formula valószínűleg nem oldható meg, ezért matematikai bizonyítékul szolgál arra, hogy a `safe_add` függvény nem csordul túl.

### Miért használjunk formális ellenőrzést az okosszerződésekhez? {#benefits-of-formal-verification}

#### Megbízhatóság iránti igény {#need-for-reliability}

A formális ellenőrzést olyan biztonságkritikus rendszerek helyességének értékelésére használják, amelyek meghibásodása pusztító következményekkel járhat, mint például halál, sérülés vagy pénzügyi csőd. Az okosszerződések nagy értékű alkalmazások, amelyek hatalmas értékeket irányítanak, és az egyszerű tervezési hibák [visszafordíthatatlan veszteségeket okozhatnak a felhasználóknak](https://www.freecodecamp.org/news/a-hacker-stole-31m-of-ether-how-it-happened-and-what-it-means-for-ethereum-9e5dc29e33ce/amp/). A szerződés formális ellenőrzése a telepítés előtt növelheti a garanciákat arra, hogy az a blokkláncon az elvárásoknak megfelelően fog működni.

A megbízhatóság igen kívánatos tulajdonság bármely okosszerződésben, különösen azért, mert az Ethereum virtuális gépben (EVM) telepített kód alapvetően megváltoztathatatlan. Mivel a telepítés utáni frissítés nehezen megoldható, a szerződések megbízhatóságának garantálása szükségessé teszi a formális ellenőrzést. A formális ellenőrzés képes felderíteni az olyan trükkös problémákat, mint az egész számok alul- és túlcsordulása, az újbóli belépés és a rossz gázoptimalizálás, amelyek elkerülhetik az auditorok és a tesztelők figyelmét.

#### Funkcionális helyesség bizonyítása {#prove-functional-correctness}

A programtesztelés a leggyakoribb bizonyítási módszer arra, hogy egy okosszerződés megfelel-e bizonyos követelményeknek. Ez magában foglalja a szerződésvégrehajtást mintaadatokkal és a viselkedéselemzést. Ha a szerződés a mintaadatokra a várt eredményeket adja, akkor a fejlesztők objektív bizonyítékkal rendelkeznek a szerződés helyességéről.

Ez a megközelítés azonban nem tudja bizonyítani a helyes végrehajtást a mintán kívüli értékek esetében. Ezért a szerződés tesztelése segíthet a hibák felderítésében (ha egyes kódútvonalak nem a kívánt eredményt adják a végrehajtáskor), de **nem tudja bizonyítani a hibák hiányát**.

Ezzel szemben a formális ellenőrzés bebizonyíthatja, hogy egy okosszerződés végtelen számú végrehajtás esetén _megfelel a követelményeknek anélkül, hogy a szerződést lefuttatná_. Ehhez olyan formális specifikációt kell készíteni, amely pontosan leírja a szerződés helyes viselkedését, és ki kell dolgozni a rendszer formális (matematikai) modelljét. Ezután egy formális bizonyítási eljárást követve ellenőrizhetjük a szerződés modellje és a specifikáció közötti konzisztenciát.

A formális ellenőrzésnél az egyik matematikai tétel, hogy egy szerződés üzleti logikája megfelel-e a követelményeknek, tehát bizonyítható vagy cáfolható. Egy tétel formális bizonyításával véges számú lépéssel végtelen számú tesztszcenáriót tudunk ellenőrizni. Ily módon a formális ellenőrzésnek jobbak az esélyei annak bizonyítására, hogy egy szerződés funkcionálisan helyes a specifikációhoz képest.

#### Ideális ellenőrzési célok {#ideal-verification-targets}

A ellenőrzési cél a formálisan ellenőrizendő rendszert írja le. A formális ellenőrzés leginkább akkor alkalmazható, ha „beágyazott rendszerekről” van szó (kis, egyszerű szoftverdarabokról, amelyek egy nagyobb rendszer részét képezik). Ideálisak a kevés szabállyal rendelkező speciális tartományok számára is, mivel így könnyebben módosíthatók a tartományspecifikus tulajdonságok ellenőrzési eszközei.

Az okosszerződések bizonyos mértékig mindkét követelményt teljesítik. Az Ethereum-szerződések kis mérete például lehetővé teszi a formális ellenőrzést. Hasonlóképpen, az EVM egyszerű szabályokat követ, ami megkönnyíti a rajta futó programok szemantikai tulajdonságainak megadását és ellenőrzését.

### Gyorsabb fejlesztési ciklus {#faster-development-cycle}

A formális ellenőrzési technikák, például a modellellenőrzés és a szimbolikus végrehajtás általában hatékonyabbak, mint az okosszerződések kódjának (tesztelés vagy auditálás általi) rendszeres elemzése. Amiatt, mert a formális ellenőrzés szimbolikus értékekre támaszkodik az állítások teszteléséhez („mi van, ha egy felhasználó megpróbál _n_ ethert felvenni?”) ellentétben a teszteléssel, amely konkrét értékeket használ („mi van, ha egy felhasználó megpróbál 5 ethert kivenni?”).

A szimbolikus bemeneti változók a konkrét értékek több osztályát is lefedhetik, így a formális ellenőrzés megközelítései rövidebb idő alatt nagyobb kódlefedettséget ígérnek. Hatékony használatnál a formális ellenőrzés felgyorsíthatja a fejlesztési ciklust.

A formális ellenőrzés javítja a decentralizált alkalmazások (dapp) építésének folyamatát is, mivel csökkenti a költséges tervezési hibákat. A szerződések frissítése (ahol egyáltalán lehetséges) annak érdekében, hogy kijavítsák a sebezhetőségeket, a kódbázis átfogó átírását és több fejlesztési erőfeszítést igényel. A formális ellenőrzés számos olyan hibát felfedezhet a szerződések megvalósításában, amelyek elkerülhetik a tesztelők és auditorok figyelmét, így ezeket a problémákat még a bevezetés előtt kijavíthatják.

## A formális ellenőrzés hátrányai {#drawbacks-of-formal-verification}

### A manuális munka költsége {#cost-of-manual-labor}

A formális ellenőrzés, különösen a félautomata verziója, amelyben egy ember irányítja a bizonyítót a helyességi bizonyítások levezetésében, jelentős manuális munkát igényel. Ráadásul a formális specifikáció készítése összetett tevékenység, amelyhez magas szintű szakértelem szükséges.

Ezek a tényezők (erőfeszítés és szakértelem) a formális verifikációt igényesebbé és költségesebbé teszik a szerződések helyességét értékelő módszerekhez, például a teszteléshez és az auditáláshoz képest. Mindazonáltal a teljes hitelesítési audit kifizetése lényeges lehet, tekintettel az okosszerződések megvalósításában előforduló hibák költségeire.

### Hamis negatív eredmények {#false-negatives}

A formális ellenőrzés csak azt tudja ellenőrizni, hogy az okosszerződés végrehajtása megfelel-e a formális specifikációnak. Ezért fontos, hogy a specifikáció megfelelően leírja az okosszerződés elvárt viselkedését.

Ha a specifikációk rosszul vannak megírva, a tulajdonságok megsértését – amelyek sebezhető végrehajtásokra utalnak – a formális ellenőrzés nem tudja felfedezni. Ebben az esetben a fejlesztő tévesen feltételezheti, hogy a szerződés hibamentes.

### Teljesítményproblémák {#performance-issues}

A formális ellenőrzés számos teljesítményproblémába ütközik. Például a modell- és a szimbolikus ellenőrzés során felmerülő státusz- és útvonalrobbanási problémák befolyásolhatják az ellenőrzési eljárásokat. Emellett a formális ellenőrzési eszközök gyakran használnak SMT és más korlátozó megoldókat a mögöttes rétegben, melyek számításigényes eljárásokra támaszkodnak.

Emellett a programellenőrzők számára nem mindig lehetséges, hogy megállapítsák, egy (logikai képletként leírt) tulajdonság teljesülhet-e vagy sem ([meghatározhatósági probléma](https://en.wikipedia.org/wiki/Decision_problem)), mivel előfordulhat, hogy egy program soha nem ér véget. Mint ilyen, lehetetlen lehet bizonyítani egy szerződés bizonyos tulajdonságait, még akkor is, ha az jól specifikált.

## Formális ellenőrzési eszközök az Ethereum-okosszerződésekhez {#formal-verification-tools}

### Formális specifikációk létrehozására szolgáló specifikációs nyelvek {#specification-languages}

**Act**: _*Az Act lehetővé teszi a tárolási frissítések, az elő- és utófeltételek és a szerződéskonstansok meghatározását. Eszközkészletének bizonyítási háttértárai is vannak, amelyek számos tulajdonságot képesek bizonyítani Coq, SMT megoldók vagy hevm segítségével.**

- [GitHub](https://github.com/ethereum/act)
- [Dokumentáció](https://ethereum.github.io/act/)

**Scribble** – _*A Scribble a Scribble specifikációs nyelvben szereplő kódmegjelöléseket konkrét állításokká alakítja, amelyek ellenőrzik a specifikációt.**

- [Dokumentáció](https://docs.scribble.codes/)

**Dafny** – _*A Dafny egy ellenőrzési programozási nyelv, amely magas szintű megjegyzésekre támaszkodik a kód helyességéről való gondolkodáshoz és annak bizonyításához.**

- [GitHub](https://github.com/dafny-lang/dafny)

### Programellenőrzők a helyesség vizsgálatára {#program-verifiers}

**Certora Prover** – _Certora Prover egy automatikus formális ellenőrzőeszköz az okosszerződéskódok vizsgálatához. A specifikációkat CVL-en (Certora ellenőrzési nyelv) írják, a tulajdonságok megsértését statikus elemzés és kényszermegoldás kombinációjával detektálják._

- [Honlap](https://www.certora.com/)
- [Dokumentáció](https://docs.certora.com/en/latest/index.html)

**Solidity SMTChecker** – _*A Solidity SMTChecker egy beépített modellellenőrző, amely SMT- (Satisfiability Modulo Theories) és Horn-megoldáson alapul. Megerősíti, hogy a szerződés forráskódja megfelel-e a specifikációknak az átfordítás során, és statikusan ellenőrzi a biztonsági tulajdonságok megsértését.**

- [GitHub](https://github.com/ethereum/solidity)

**solc-verify** – _*A solc-verify a Solidity fordító egy kiterjesztett változata, amely képes automatizált formális ellenőrzést végezni a Solidity kódon megjegyzések és moduláris programellenőrzés segítségével.**

- [GitHub](https://github.com/SRI-CSL/solidity)

**KEVM** - _*A KEVM a K keretrendszerben írt Ethereum virtuális gép (EVM) formális szemantikája. A KEVM futtatható, és képes bizonyos tulajdonságokkal kapcsolatos állítások bizonyítására az elérhetőségi logika segítségével.**

- [GitHub](https://github.com/runtimeverification/evm-semantics)
- [Dokumentáció](https://jellopaper.org/)

### Logikai keretek a tételbizonyításhoz {#theorem-provers}

**Isabelle** – _Az Isabelle/HOL egy olyan bizonyítási segédprogram, amely lehetővé teszi matematikai formulák formális nyelven történő megfogalmazását, és eszközöket biztosít e formulák bizonyításához. Fő alkalmazási területe a matematikai bizonyítások formalizálása és különösen a formális ellenőrzés, amely magában foglalja a számítógépes hardver vagy szoftver helyességének bizonyítását, valamint a számítógépes nyelvek és protokollok tulajdonságainak bizonyítását._

- [GitHub](https://github.com/isabelle-prover)
- [Dokumentáció](https://isabelle.in.tum.de/documentation.html)

**Coq** – _A Coq egy interaktív tételbizonyító, amely lehetővé teszi, hogy programokat definiáljon tételek segítségével, és interaktívan generálja a helyesség gépileg ellenőrzött bizonyítékait._

- [GitHub](https://github.com/coq/coq)
- [Dokumentáció](https://coq.github.io/doc/v8.13/refman/index.html)

### Szimbolikus végrehajtáson alapuló eszközök az okosszerződések sebezhető mintáinak felderítésére {#symbolic-execution-tools}

**Manticore** – _*Egy eszköz az EVM-bájtkódelemző eszköz vizsgálatára, amely szimbolikus végrehajtáson alapul.**

- [GitHub](https://github.com/trailofbits/manticore)
- [Dokumentáció](https://github.com/trailofbits/manticore/wiki)

**hevm** – _*a hevm egy szimbolikus végrehajtási motor és ekvivalencia-ellenőrző az EVM-bájtkódhoz.**

- [GitHub](https://github.com/dapphub/dapptools/tree/master/src/hevm)

**Mythril** – _Egy szimbolikus végrehajtási eszköz az Ethereum-okosszerződések sebezhetőségének felderítésére_

- [GitHub](https://github.com/ConsenSys/mythril-classic)
- [Dokumentáció](https://mythril-classic.readthedocs.io/en/develop/)

## További olvasnivaló {#further-reading}

- [Hogyan működik az okosszerződések formális ellenőrzése](https://runtimeverification.com/blog/how-formal-verification-of-smart-contracts-works/)
- [Hogyan biztosíthatja a formális ellenőrzés a hibátlan okosszerződéseket](https://media.consensys.net/how-formal-verification-can-ensure-flawless-smart-contracts-cbda8ad99bd1)
- [Az Ethereum ökoszisztéma formális ellenőrzési projektjeinek áttekintése](https://github.com/leonardoalt/ethereum_formal_verification_overview)
- [Az Ethereum 2.0 letétbe helyezési okosszerződés formális ellenőrzése elejétől a végéig](https://runtimeverification.com/blog/end-to-end-formal-verification-of-ethereum-2-0-deposit-smart-contract/)
- [A világ legnépszerűbb okosszerződésének formális ellenőrzése](https://www.zellic.io/blog/formal-verification-weth)
- [SMTChecker és formális ellenőrzés](https://docs.soliditylang.org/en/v0.8.15/smtchecker.html)
