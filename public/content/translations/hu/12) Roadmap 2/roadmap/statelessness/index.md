---
title: Státuszmentesség, a státusz és az előzményadatok lejárata
description: Az előzményadatok lejáratának és a státuszmentes Ethereumnak a magyarázata
lang: hu
---

# Státuszmentesség, a státusz és az előzményadatok lejárata {#statelessness}

A valódi decentralizácóhoz szükség van arra, hogy az Ethereum-csomópontokat egyszerű hardveren lehessen futtatni. A csomópontok futtatása lehetővé teszi a felhasználónak, hogy független kriptográfiai validálással ellenőrizzék az információkat, és ne kelljen megbízniuk egy harmadik félben, hogy az adatokkal lássa el őket. A csomópont futtatásával a felhasználó közvetlenül küldhet tranzakciót az Ethereum peer-to-peer hálózatára, és nem kell megbíznia egy közvetítőben. A decentralizáció nem lehetséges, ha ezek az előnyök csak a drága hardverrel rendelkező felhasználók számára elérhetők. Ehelyett a csomópontokat rendkívül szerény teljesítményű és memóriaigényű készülékeken is lehessen működtetni, mint amilyenek a mobiltelefonok, a mikroszámítógépek vagy az otthoni számítógépek.

Jelenleg a nagy tárhelyigény jelenti a legnagyobb akadályt ahhoz, hogy a csomópontokat bárki működtethesse globálisan. Ennek az a fő oka, hogy az Ethereum státuszadatainak nagy halmazait kell eltárolni. Ezek a státuszadatok kritikus információkat tartalmaznak az új blokkok és tranzakciók megfelelő lefuttatásához. A jelen cikk írásának időpontjában egy gyors 2 TB SSD szükséges ahhoz, hogy egy teljes Ethereum csomópontot lehessen futtatni. Ez egy olyan csomópont tárhelyigénye, amely nem törli ki a régebbi adatokat és nagyjából heti 14 GB-tal nő. Az archív csomópontok pedig, amelyek a genezis óta az összes adatot tartalmazzák, már 12 TB-t érnek el (ezen leírás időpontjában, 2023. februárjában).

A régebbi adatokhoz lehet olcsóbb merevlemezeket használni, de ezek túl lassúak ahhoz, hogy a bejövő blokkokkal lépést tartsanak. Az csak egy átmeneti és részleges megoldás, hogy a kliensek jelenlegi tárolási modelljét megtartva olcsóbbá és könnyebbé tegyük az adattárolást, mivel az Ethereum státusznövekedése határtalan, tehát a tárhelyigény csak növekszik, a technológiai fejlesztéseknek pedig folyamatosan lépést kell tartaniuk ezzel. Ehelyett a klienseknek új módszert kell találni a blokkok és tranzakciók ellenőrzésére, amelyhez az adatokat nem szükséges a lokális adatbázisból kikeresni.

## A csomópontokhoz szükséges tárhely csökkentése {#reducing-storage-for-nodes}

Számos módon le lehet csökkenteni a csomópontban tárolt adatmennyiséget, ehhez azonban különféle mértékben, de módosítani kell az Ethereum-protokollon:

- **Az előzményadatok lejárata**: lehetővé teszi, hogy a csomópont törölje azokat a státuszadatokat, amelyek X blokknál régebbiek, de nem változtatja meg a Ethereum-kliens státuszkezelési módját
- **A státusz lejárata**: lehetővé teszi, hogy inaktívvá válhassanak azok a státuszadatok, amelyeket nem használnak rendszeresen. Az inaktív adatokkal nem kell foglalkoznia a kliensnek mindaddig, amíg az újból be nem hívják őket.
- **Gyenge státusztalanság**: csak a blokk-készítőknek van szükségük a teljes státuszadatra, a többi csomópont a lokális státuszadatbázis nélkül is képes ellenőrizni a blokkokat.
- **Erős státusztalanság**: semelyik csomópontnak nincs szüksége az összes státuszadatra.

## Az adatok lejárata {#data-expiry}

### Az előzményadatok lejárata {#history-expiry}

Az előzményadatok lejárata azt jelenti, hogy a kliensek törlik a régebbi adatokat, amelyekre már valószínűleg nem lesz szükség, így csak kevés előzményadatot tárolnak, és az új adatok felülírják a legrégebbieket. A klienseknek két okból van szükségük előzményadatokra: szinkronizáláshoz és adatlekérdezések teljesítéséhez. Eredetileg a klienseknek a genezisblokkból kellett szinkronizálniuk, ellenőrizve, hogy minden egyes soron következő blokk megfelelő-e egészen a lánc elejéig. Jelenleg a kliensek ezt az utat a lánc elejéig a „gyenge szubjektivitású ellenőrzési pontoktól” kiindulva teszik meg. Ezek az ellenőrzési pontok megbízható kiindulási pontok, vagyis olyan, mintha a genezisblokk közelebb lenne a jelenhez, nem az Ethereum kezdetétől nézné. Tehát a kliensek törölhetnek minden olyan információt, amely a legutóbbi gyenge szubjektivitású ellenőrzési pontnál korábbi, így is képesek szinkronizálni a lánc elejével. A kliensek jelenleg úgy szolgáltatnak előzményadatokat (amelyek JSON-RPC-n keresztül érkeznek), hogy azokat a helyi adatbázisukból kérik le. Ez az előzményadatok lejáratával nem lesz lehetséges, mert az adat egy része nem lesz már elérhető. Az előzményadatok biztosítására egy innovatív megoldásra van szükség.

Az egyik lehetőség az, hogy a kliensek az előzményadatokat a társaiktól kérik le olyan megoldással, mint amilyen a Portal Network. A Portal Network egy fejlesztés alatt álló peer-to-peer hálózat az előzményadatok biztosítására, ahol minden csomópont az Ethereum előzményadatának egy kis részét tárolja, így a teljes adathalmaz a hálózaton elosztva létezik. Ezek megszerzése úgy működik, hogy megkeresik azokat a peereket, akik tárolja az adott adatokat és lekérik tőlük ezeket. Másik megoldás lehet, hogy mivel általában az alkalmazásoknak van szüksége előzményadatokra, ezért az ő felelősségük lenne ezek tárolása. Talán lenne elég önfeláldozó szereplő az Ethereum világában, akik önkéntesen tárolnának előzményarchívumokat. Lehetne egy decentralizált autonóm szervezet (DAO), ami felvállalja az adattárolást, vagy ideális esetben lehetne ezen opciók kombinációja is. Ezek a szolgáltatók számos módon szolgálhatnának adattal, például torrent, FTP, Filecoin vagy IPFS formájában.

Az előzményadatok lejárata egy kicsit ellentmondásos téma, mert eddig az Ethereum mindig nyilvánosan vállalta bármilyen adat elérhetőségét. Mindig alapból elérhető volt egy teljes szinkronizáció a genezistől kezdve, még akkor is, ha az újraépítéshez a régi adatok pillanatfelvételét kellett használni. Az előzményadatok lejárata ezt a felelősséget az Ethereum-protokollon kívülre helyezi. Ez akár új cenzúrakockázatot is hordozhat magában, ha végül centralizált szerzetek biztosítják az előzményadatokat.

Az EIP-4444 még nem áll készen, de aktív egyeztetés folyik róla. Érdekes módon, az EIP-4444-gyel kapcsolatos kihívások jellemzően nem technikaiak, hanem inkább a közösségi kezelésből erednek. A közösségnek bele kell egyeznie az új módszerbe, el kell fogadnia, hogy az előzményadatokat megbízható entitások szolgáltassák.

Ez a fejlesztés nem változtatja meg alapjaiban az Ethereum-csomópontok státuszadat-kezelését, csak azok elérésére lesz hatással.

### A státusz lejárata {#state-expiry}

A státusz lejárata azt jelenti, hogy az egyéni csomópontokból eltávolítják a státuszt, ha azt az utóbbi időben nem használták. Ezt többféle módon is meg lehet valósítani, például:

- **Lejárat a bérleti díj alapján**: kapcsoljunk a számlákhoz „bérleti díjat”, és amikor ez nullázódik, akkor a számla is lejár
- **Lejárat idő alapján**: a számlák inaktíválódnak, ha egy ideig nem végeznek olvasási/írási műveletet rajtuk

A bérleti díj alapján vett lejárat lehet egy közvetlen díjkérés a számláktól, hogy azok maradjanak aktív állapotban az adatbázisban. Az idő alapján vett lejárat lehet az utolsó interakció óta eltelt idő, illetve az összes számla periodikus lejárata. Lehetnek olyan mechanizmusok is, amelyek ötvözik az idő- és a bérletidíj-alapú modelleket, például az egyéni számlák aktív státuszban maradnak, ha fizetnek egy kis összeget az időalapú lejárat előtt. Ezzel kapcsolatban fontos megérteni, hogy az inaktív állapot nem jelent **törlést**, csak elkülönítve tárolják a kapcsolódó adatokat az aktív státusztól. Az inaktív státuszt vissza lehet állítani élő állapotra.

Ez úgy valósulhat meg, hogy például egy státuszfa áll rendelkezésekre bizonyos időperiódusokra (talán 1 évre). Amikor az új periódus elkezdődik, egy teljesen új státuszfa jön létre. Csak a jelenlegi státuszfát lehet módosítani, a többi megváltoztathatatlan. Az Ethereum-csomópontoknak csak a jelenlegi és a legutóbbi státuszfát kellene tárolniuk. Ehhez időbélyeget kell tenni a címekre, hogy melyik periódusban léteznek. [Számos módja van annak](https://ethereum-magicians.org/t/types-of-resurrection-metadata-in-state-expiry/6607), hogy ezt bevezessék, de a legjobb megoldáshoz a [címeket meg kell hosszabbítani](https://ethereum-magicians.org/t/increasing-address-size-from-20-to-32-bytes/5485), hogy elférjen az új információ, illetve a hosszabb címek biztonságosabbak is. Az ütemtervben ezt a fejlesztés a [címhely kiterjesztése](https://ethereum-magicians.org/t/increasing-address-size-from-20-to-32-bytes/5485) címen szerepel.

Az előzményadatok lejáratához hasonlóan a státuszlejáratnál is az egyéni felhasználók helyett tárolhatják a régi státuszadatokat más entitások, mint központi szolgáltatók, önfeláldozó közösségi tagok vagy olyan jövőbeli, decentralizált megoldások, mint amilyen a Portal Network.

A státusz lejárata még kutatási fázisban van, a fejlesztés nem áll készen a bevezetésre. A státuszlejárat talán a státuszmentes kliensek és az előzményadatok lejárata után kerül bevezetésre, mert ezek a fejlesztések a legtöbb validátor számára már kezelhetővé teszik a nagy státuszokat.

## Hontalanság {#statelessness}

A státusztalanság nem azt jelenti, hogy a státusz megszűnik, hanem megváltozik az Ethereum-csomópontok státuszkezelési módja. A státusztalanság kétféle jelleget ölthet: gyenge és erős státusztalanság. A gyenge státusztalanság a legtöbb csomópont számára megengedi, hogy státusz nélkül állapotban fussanak, mivel csak néhánynak lesz a feladata a tárolás. Az erős státusztalanság megszűnteti azt, hogy bármelyik csomópontnak tárolnia kelljen az összes státuszadatot. Mindkét fajta a következő előnyökkel jár az átlagos validátorok számára:

- szinte azonnali szinkronizálás
- képesek a blokkokat soron kívül is validálni
- a csomópontokat egyszerű hardverrel is lehet futtatni (pl. telefonnal)
- a csomópontokhoz olcsó merevlemezt is lehet használni, mert nincs szükség írásra/olvasásra
- kompatibilis az Ethereum elkövetkező kriptográfiai fejlesztéseivel

### Gyenge státusztalanság {#weak-statelessness}

A gyenge státusztalanság megváltoztatja azt, ahogy az Ethereum-csomópontok ellenőrzik a státuszváltozásokat, de teljesen nem szüntetik meg azt, hogy a hálózaton néhány csomópontnak ne kelljen státuszt tárolni. Ehelyett a státusz tárolásának felelősségét a blokkelőterjesztőknek adja, a hálózat többi csomópontja, amely a blokkokat ellenőrzi, működhet a teljes státuszadat nélkül.

**Gyenge státusztalanság esetén a blokkelőterjesztőknek szükségük van a teljes státuszadatra, de az ellenőrzőknek nincs**

Ehhez előbb [Verkle-fákat](/roadmap/verkle-trees/) kell bevezetni az Ethereum-klienseknél. A Verkle-fák adatstruktúrák az Ethereum státuszainak tárolására, amelyek kicsi, fix méretű „tanúkat” készítenek, amelyet meg lehet osztani a társakkal, és a blokkokat ezekhez lehet validálni a lokális adatbázisok helyett. Egy [ javaslattevő-építő szétválasztás (PBS)](/roadmap/pbs/) is szükséges, mert így a blokképítőknek specializált csomópontjaik lehetnek sokkal erőteljesebb hardverrel, és csak nekik kell hozzáférni a teljes státuszadathoz.

<ExpandableCard title="Miért elfogadható, hogy kevesebb blokképítő legyen?" eventCategory="/roadmap/statelessness" eventName="clicked why is it OK to rely on fewer block proposers?">

A státusztalanság arra épül, hogy a blokképítők tárolják a teljes státuszadatot, így képesek olyan tanúkat készíteni, amit a blokk validálásához használnak. A többi csomópontnak nincs szüksége a státuszadatokra, minden szükséges információ benne van a tanúban. Ez egy olyan helyzet, amelyben a blokképítés drága, viszont a blokkellenőrzés olcsó tevékenység, így kevesebben fognak blokképítő csomópontokat működtetni. Ugyanakkor a blokképítők decentralizációja nem annyira kritikus téma, hogyha a lehető legtöbb résztvevő képes függetlenül részt venni a blokkok ellenőrzésében.

<ButtonLink variant="outline-color" href="https://notes.ethereum.org/WUUUXBKWQXORxpFMlLWy-w#So-why-is-it-ok-to-have-expensive-proposers">Tudjon meg többet a témáról Dankrad jegyzeteiből</ButtonLink>
</ExpandableCard>

A blokképítők használják a státuszadatot a tanúk létrehozásához – ez egy minimális adathalmaz, mellyel ellenőrizhető a blokkban lévő tranzakciók által okozott státuszváltozás. A többi validátornak nincs szüksége a státuszra, csak a státuszgyökeret (a teljes státusz hashje) tárolják. Megkapják a blokkot és a tanút, és ezeket felhasználva frissítik a saját státuszgyökerüket. Ezáltal a validáló csomópont rendkívül könnyű lesz.

A gyenge státusztalanság a kutatás előrehaladott állapotában tart, de a bevezetése a javaslattevő-építő szétválasztáson (PBS) és a Verkle-fák bevezetésén múlik, hogy a kis méretű tanúkat el lehessen küldeni a társaknak. Ez alapján a bevezetése talán néhány év múlva történhet meg az Ethereum főhálózatán.

### Erős státusztalanság {#strong-statelessness}

Az erős státusztalanság megszünteti azt, hogy bármelyik csomópontnak tárolnia kelljen a státuszadatot. Ehelyett a tranzakciókat a tanúkkal együtt küldik, amelyet a blokképítők aggregálnak. Így a blokképítők felelősek azért, hogy a szükséges státuszokat tárolják, hogy abból elkészítsék a tanúkat a releváns számlákra. A státuszhoz kapcsolódó felelősség szinte teljesen a felhasználókhoz kerül, mivel tanúkat és hozzáférési listákat küldenek arról, hogy milyen számlákkal és tárhelykulcsokkal kapcsolódnak. Ennek következtében rendkívül könnyű csomópontok működhetnek, viszont az okosszerződésekkel nehezebb lesz az interakciójuk.

Az erős státusztalanságot vizsgálják a kutatók, de jelenleg nem valószínű, hogy része lesz az Ethereum ütemtervének – sokkal valószínűbb, hogy a gyenge státusztalanság elegendő az Ethereum skálázási igényekhez.

## Jelenlegi helyzet {#current-progress}

A gyenge státusztalanság, az előzményadatok és a státuszadatok lejárata még kutatási fázisban van, és talán évek múlva kerül bevezetésre. Az sem biztos, hogy a javaslatokból mindegyiket be kell vezetni, mert kiderülhet például, hogy a státusz lejárati ideje után már nincs szükség az előzményadat-lejáratot is megvalósítani. Előbb az ütemterv más elemeiknek kell megvalósulniuk, mint például a [Verkle-fák](/roadmap/verkle-trees) és a [javaslattevő-építő szétválasztás (PBS)](/roadmap/pbs).

## További olvasnivaló {#further-reading}

- [Vitalik a státusztalanságról (AMA)](https://www.reddit.com/r/ethereum/comments/o9s15i/impromptu_technical_ama_on_statelessness_and/)
- [A státuszméret menedzsmentjének elmélete](https://hackmd.io/@vbuterin/state_size_management)
- [Státusz összekapcsolása az élesedés okozta konfliktus minimalizálására](https://ethresear.ch/t/resurrection-conflict-minimized-state-bounding-take-2/8739)
- [A státusztalansághoz és a státuszlejárathoz vezető út](https://hackmd.io/@vbuterin/state_expiry_paths)
- [Az EIP-4444 specifikációi](https://eips.ethereum.org/EIPS/eip-4444)
- [Alex Stokes az EIP-4444 fejlesztéséről](https://youtu.be/SfDC_qUZaos)
- [Miért olyan fontos a státusztalanság](https://dankradfeist.de/ethereum/2021/02/14/why-stateless.html)
- [Ez eredeti státusztalan kliens koncepciójának leírása](https://ethresear.ch/t/the-stateless-client-concept/172)
- [Bővebben a státuszlejáratról](https://hackmd.io/@vbuterin/state_size_management#A-more-moderate-solution-state-expiry)
- [Még több tudnivaló a státuszlejáratról](https://hackmd.io/@vbuterin/state_expiry_paths#Option-2-per-epoch-state-expiry)
