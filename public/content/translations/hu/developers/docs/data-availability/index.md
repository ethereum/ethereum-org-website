---
title: Adatelérhetőség
description: Az adatok elérhetőségével kapcsolatos problémák és megoldások áttekintése az Ethereumban
lang: hu
---

„Ne bízz, ellenőrizd!” – ez az Ethereumban elterjedt alapelv. Az elképzelés lényege, hogy a csomópont önállóan ellenőrizheti a kapott információk helyességét azáltal, hogy végrehajtja a társaitól kapott blokkok összes tranzakcióját, hogy megbizonyosodjon arról, a javasolt változások megegyeznek a csomópont által kiszámítottakkal. Ez azt jelenti, hogy a csomópontoknak nem kell abban bízniuk, hogy a blokk küldői őszinték. Ez nem lehetséges, ha az adatok hiányoznak.

**Az adatelérhetőség** arra utal, hogy a felhasználó mennyire bízhat abban, hogy a blokk ellenőrzéséhez szükséges adatok valóban rendelkezésre állnak a hálózat minden résztvevőjének. Az Ethereumon L1 rétegén lévő teljes csomópontok esetében ez viszonylag egyszerű; a teljes csomópont letölti az adott blokk összes adatának másolatát – az adatoknak _meg kell lennie_ ahhoz, hogy a letöltés lehetséges legyen. A hiányzó adatokkal rendelkező blokkot ahelyett, hogy hozzáadnák a blokklánchoz, inkább elvetnék. Ez a „láncon belüli adatelérhetőség”, és a monolitikus blokkláncok jellemzője. A teljes csomópontokat nem lehet érvénytelen tranzakciók elfogadására rávenni, mivel minden tranzakciót saját maguk töltenek le és hajtanak végre. A moduláris blokkláncok, a második blokkláncréteget (L2) képviselő összevont tranzakciók és a könnyű ügyfelek esetében azonban az adatok elérhetősége sokkal összetettebb, ami kifinomultabb ellenőrzési eljárásokat igényel.

## Előfeltételek {#prerequisites}

A jelen téma könnyebb megértéséhez érdemes ismerni a [blokklánc alapjait](/developers/docs/intro-to-ethereum/), különösen a [konszenzusmechanizmusokat](/developers/docs/consensus-mechanisms/). Ez az oldal azt is feltételezi, hogy az olvasó ismeri a [blokkok](/developers/docs/blocks/), [tranzakciók](/developers/docs/transactions/), [csomópontok](/developers/docs/nodes-and-clients/), [skálázási megoldások](/developers/docs/scaling/) és kapcsolódó témáit.

## Az adatelérhetőség problémája {#the-data-availability-problem}

Az adatok elérhetőségének problémája azt jelenti, hogy az egész hálózat számára bizonyítani kell, hogy a blokkláncba felvett tranzakciós adatok összegzett formája valóban érvényes tranzakciókat képvisel, mindezt anélkül, hogy minden csomópontnak le kellene töltenie az összes adatot. A teljes tranzakciós adat szükséges a blokkok független ellenőrzéséhez, de ha minden csomópontnak le kell töltenie az összeset, az akadályozza a skálázást. Az adatelérhetőség problémájára adott megoldások célja, hogy biztosítékot nyújtsanak arra, hogy a teljes tranzakciós adatot ellenőrzés céljából elérhetővé tették azoknak a résztvevőknek is, akik nem töltik le és tárolják az adatokat saját maguk.

A [könnyű csomópontok](/developers/docs/nodes-and-clients/light-clients) és az [L2 összevont tranzakciók](/developers/docs/scaling) fontos hálózati résztvevők, akiknek erős adatelérhetőségi biztosítékokra van szükségük, de nem tudják letölteni és feldolgozni a tranzakciós adatokat. A könnyű csomópontokat épp az teszi könnyűvé, az összevont tranzakciókat pedig hatékony skálázási megoldássá, hogy nem kell tranzakciós adatokat letölteniük.

Az adatelérhetőség kritikus szempont a jövőbeli [„státuszmentes”](/roadmap/statelessness) Ethereum-kliensek számára, amelyeknek nem kell letölteniük és tárolniuk a státuszadatokat a blokkok ellenőrzéséhez. A státuszmentes klienseknek továbbra is biztosnak kell lenniük abban, hogy az adatok rendelkezésre állnak _valahol_, és hogy azokat megfelelően feldolgozták.

## Adatelérhetőségi megoldások {#data-availability-solutions}

### Adatelérhetőség-mintázás (DAS) {#data-availability-sampling}

Az adatelérhetőség-mintázás (DAS) egy módja annak, hogy a hálózat ellenőrizze, hogy az adatok rendelkezésre állnak-e anélkül, hogy túl nagy terhelést jelentene az egyes csomópontoknak. Minden csomópont (beleértve azokat is, amelyek nem helyeznek letétbe) letölti az összes adat véletlenszerűen kiválasztott, kis részhalmazát. A minták sikeres letöltése nagy biztonsággal megerősíti, hogy az összes adat rendelkezésre áll. Ez adattörlési kódolásra támaszkodik, amely egy adott adatkészletet redundáns információkkal bővít (azáltal, hogy egy _polinomiális_ függvényt illesztünk az adatokra, és ezt a polinomiálist további pontokon értékeljük ki). Ez lehetővé teszi, hogy szükség esetén a redundáns adatokból vissza lehessen állítani az eredeti adatokat. Az adatlétrehozás következménye, hogy ha az eredeti adatok közül _bármi_ hiányzik, akkor a kibővített adatok _felét_ sem kapjuk meg! Az egyes csomópontok által letöltött adatminták mennyiségét be lehet úgy állítani, hogy _nagy valószínűséggel_ hiányozzon legalább egy a kliensek által mintavételezett adatfragmentumok közül, _ha_ a csomópont az összes adatnak csak kevesebb mint a felét tárolja.

A DAS annak biztosítására fog szolgálni, hogy az összevonttranzakció-üzemeltetők az [EIP-4844](/roadmap/danksharding) bevezetését követően rendelkezésre bocsássák tranzakciós adataikat. Az Ethereum-csomópontok véletlenszerű mintát vesznek a blobokban megadott tranzakciós adatokból a fent ismertetett redundanciaséma segítségével, hogy az összes adat meglétét biztosítsák. Ugyanezt a technikát lehetne alkalmazni arra is, hogy a blokkgyártók minden adatukat elérhetővé tegyék, így biztosítsák a könnyű kliensek működését. Hasonlóképpen, a [ javaslattevő-építő szétválasztása](/roadmap/pbs) esetén csak a blokképítőnek kell feldolgoznia egy teljes blokkot, a validátorok az adatok elérhetőségét mintavételezéssel ellenőriznék.

### Adatelérhetőségi bizottságok {#data-availability-committees}

Az adatelérhetőségi bizottságok (DAC) olyan megbízható felek, amelyek az adatok rendelkezésre állását biztosítják vagy tanúsítják. A DAC-k használhatók DAS helyett, [vagy azzal kombinálva](https://hackmd.io/@vbuterin/sharding_proposal#Why-not-use-just-committees-and-not-DAS). A bizottságokkal járó biztonsági garanciák a konkrét felállítástól függenek. Az Ethereum a validátorok véletlenszerűen kiválasztott részhalmazait használja például a könnyű csomópontok adatelérhetőségének igazolására.

A DAC-ket egyes validiumok is használják. A DAC egy megbízható csomópontokból álló csoport, amely offline tárolja az adatok másolatait. A DAC köteles az adatokat vita esetén rendelkezésre bocsátani. A DAC tagjai láncon belüli tanúsítványokat is közzétesznek annak igazolására, hogy az említett adatok valóban rendelkezésre állnak. Egyes validiumok a DAC-k helyébe a proof-of-stake (PoS) validátorrendszert léptetik. Itt bárki validátorrá válhat, és tárolhatja az adatokat a láncon kívül. Ehhez azonban „kötvényt” kell nyújtaniuk, amelyet egy okosszerződésben helyeznek letétbe. Rosszindulatú viselkedés esetén, például ha a validátor visszatartja az adatokat, a kötvény mértékében megbüntethető a szereplő. A proof-of-stake adatelérhetőségi bizottságok lényegesen biztonságosabbak, mint a hagyományosak, mivel közvetlen módon ösztönznek jóhiszemű viselkedésre.

## Adatelérhetőség és a könnyű csomópontok {#data-availability-and-light-nodes}

[A könnyű csomópontoknak](/developers/docs/nodes-and-clients/light-clients) a blokkadatok letöltése nélkül kell ellenőrizniük a kapott blokkfejlécek helyességét. Ennek a könnyű jellegnek az az ára, hogy nem tudják függetlenül ellenőrizni a blokkfejléceket úgy, ahogy egy teljes csomópont teszi azáltal, hogy helyben újrafuttatja a tranzakciókat.

Az Ethereum a könnyű csomópontok egy _szinkronizálási bizottsághoz_ rendelt 512 validátor véletlenszerű halmazára vannak utalva. A szinkronizálási bizottság DAC-ként működik, amely kriptográfiai aláírással jelzi a könnyű klienseknek, hogy a fejlécben szereplő adatok helyesek. A Szinkronizálási bizottság minden nap frissül. Minden blokkfejléc figyelmezteti a könnyű csomópontokat, hogy melyik validátoroktól várják a _következő_ blokk aláírását, így nem lehet őket rászedni, hogy megbízzanak egy rosszindulatú csoportban, amely szinkronizálási bizottságnak adja ki magát.

Mi történik akkor, ha egy támadó valahogyan egy hamis blokkfejlécet _továbbít_ a könnyű klienseknek, és meggyőzi őket arról, hogy azt egy becsületes szinkronizálási bizottság írta alá? Ebben az esetben a támadó érvénytelen tranzakciókat is betehet, és a könnyű kliens elfogadja azokat, mivel nem ellenőrzi független módon a blokkfejlécbe foglalt összes státuszváltozást. Ez ellen a könnyű kliens csalási bizonyítékokat használhat.

Ezek a csalási bizonyítékok úgy működnek, hogy egy teljes csomópont, ha látja, hogy egy érvénytelen státuszváltozásról pletykálnak a hálózatban, gyorsan létrehozhat egy kis adatot, amely bizonyítja, hogy a javasolt státuszváltozás nem származhat egy adott tranzakcióhalmazból, és ezt az adatot továbbítja a társainak. A könnyű csomópontok felkaphatják ezeket a csalási bizonyítékokat, és felhasználhatják azokat a rossz blokkfejlécek elvetésére, így biztosítva, hogy ugyanabban a helyes láncban maradjanak, mint a teljes csomópontok.

Ennek feltétele, hogy a teljes csomópontok hozzáférjenek a teljes tranzakciós adatokhoz. Egy olyan támadó, aki rossz blokkfejlécet küld szét, és a tranzakciós adatokat sem teszi elérhetővé, képes lenne megakadályozni, hogy a teljes csomópontok csalási bizonyítékokat generáljanak. A teljes csomópontok képesek lennének figyelmeztetést adni egy rossz blokkról, de nem tudnák a figyelmeztetésüket bizonyítékkal alátámasztani, mert az adatok nem álltak rendelkezésre, hogy a bizonyítékot legenerálják!

Erre az adatelérhetőségi problémára a DAS a megoldás. A könnyű csomópontok a teljes státuszadat kis véletlenszerű darabjait töltik le, és a minták segítségével ellenőrzik, hogy a teljes adatkészlet rendelkezésre áll-e. Kiszámítható annak tényleges valószínűsége, hogy N véletlenszerű darab letöltése után tévesen feltételezzük a teljes adatelérhetőséget ([100 darab esetén az esély 10^-30](https://dankradfeist.de/ethereum/2019/12/20/data-availability-checks.html), azaz hihetetlenül valószínűtlen).

Még ebben a forgatókönyvben is előfordulhat, hogy a véletlenszerű adatkéréseket végző kliensek előtt észrevétlen marad az, ha csak néhány bájtot tartanak vissza a támadások során. A törléskódolás ezt úgy oldja meg, hogy rekonstruálja a hiányzó kis adatdarabokat, amelyek felhasználhatók a javasolt státuszváltozások ellenőrzésére. Ezután a rekonstruált adatok felhasználásával csalási bizonyítékot lehetne készíteni, amely megakadályozza, hogy a könnyű csomópontok rossz fejléceket fogadjanak el.

**Megjegyzés:** A DAS és a csalási bizonyítékok még nem kerültek bevezetésre a proof-of-stake Ethereum könnyű kliensek számára, de szerepelnek az útitervben, valószínűleg ZK-SNARK alapú bizonyítékok formájában. A mai könnyű kliensek a DAC egy formájára támaszkodnak: ellenőrzik a szinkronizálási bizottság személyazonosságát, majd megbíznak a kapott aláírt blokkfejlécekben.

## Adatelérhetőség és L2 összevont tranzakciók {#data-availability-and-layer-2-rollups}

Az [L2 skálázási megoldások](/layer-2/), mint például az [összevont tranzakciók](/glossary/#rollups), csökkentik a tranzakciós költségeket és növelik az átvitelt az Ethereumon a tranzakciók láncon kívüli feldolgozásával. Az összevont tranzakciók tömörített formában és kötegekben kerülnek az Ethereumra. A kötegek több ezer egyedi, láncon kívüli tranzakciót jelentenek egyetlen tranzakcióban az Ethereumon. Ez csökkenti a torlódást az alaprétegen és a felhasználók díjait.

Az Ethereumba küldött „összefoglaló” tranzakciókban azonban csak akkor lehet megbízni, ha a javasolt státuszváltozás független módon ellenőrizhető és megerősíthető, hogy az az összes láncon kívüli tranzakció alkalmazásának eredménye. Ha az összevonttranzakció-üzemeltetők nem teszik elérhetővé a tranzakciós adatokat ehhez az ellenőrzéshez, akkor hibás adatokat küldhetnek az Ethereumba.

Az [optimista összevont tranzakciók](/developers/docs/scaling/optimistic-rollups/) tömörített tranzakciós adatokat küldenek az Ethereumba, és várnak egy bizonyos ideig (általában 7 napig), hogy független ellenőrök ellenőrizhessék az adatokat. Ha valaki problémát észlel, létrehozhat egy csalási bizonyítékot, és azt felhasználhatja az összevont tranzakciók megkérdőjelzésére. Ez azt eredményezi, hogy a lánc visszafordul és elveti az érvénytelen blokkot. Ez csak akkor lehetséges, ha az adatok rendelkezésre állnak. Jelenleg az adatok `CALLDATA` formában állandóan elérhetők, amelyek folyamatosan a láncon belül találhatók. Az EIP-4844 azonban hamarosan lehetővé teszi, hogy az összevont tranzakciók a tranzakciós adataikat az olcsóbb blobtárolóba tegyék. Ez nem állandó tárhely. A független ellenőröknek kb. 1–3 hónapon belül le kell kérdezniük a blobokat, és jelezniük kell az esetleges problémáikat, mielőtt az adatok törlődnek az Ethereum 1. rétegéről. Az adatok elérhetőségét az Ethereum-protokoll csak erre a rövid, rögzített időablakra garantálja. Ezután az időpont után az Ethereum ökoszisztémában más szereplők felelőssége lesz. Bármely csomópont ellenőrizheti az adatelérhetőséget a DAS segítségével, vagyis a blobadatok kis, véletlenszerű mintáinak letöltésével.

A [zero-knowledge (ZK) összevont tranzakcióknak](/developers/docs/scaling/zk-rollups) nem kell tranzakciós adatokat közzétenniük, mivel a [zero-knowledge érvényességi igazolások](/glossary/#zk-proof) garantálják a státuszváltozások helyességét. Az adatok elérhetősége azonban még mindig probléma, mivel nem lehet garantálni a ZK összevont tranzakció működését (és nem is tudunk vele interakcióba lépni), ha nem ismerjük a releváns státuszadatokat. A felhasználók például nem ismerhetik meg egyenlegüket, ha az üzemeltető visszatartja az összevont tranzakciókból következő státusz részleteit. Emellett nem tudnak státuszfrissítéseket végrehajtani az újonnan hozzáadott blokk információival.

## Az adatelérhetőség és az adatvisszakereshetőség összehasonlítása {#data-availability-vs-data-retrievability}

Az adatelérhetőség különbözik az adatok visszakereshetőségétől. Az adatelérhetőség annak biztosítása, hogy a teljes csomópontok képesek hozzáférni és ellenőrizni az adott blokkhoz kapcsolódó tranzakciók teljes halmazát. Ebből nem feltétlenül következik, hogy az adatok örökre hozzáférhetők.

Az adatok visszakereshetősége a csomópontok azon képessége, hogy _historikus információkat_ tudnak visszakeresni a blokkláncból. Ezekre a múltbeli adatokra nincs szükség az új blokkok ellenőrzéséhez, csak a teljes csomópontok szinkronizálásához a Genesis blokkból vagy bizonyos múltbeli kérések kiszolgálásához.

Az Ethereum alapprotokollja elsősorban az adatelérhetőséggel foglalkozik, nem a visszakereshetőséggel. Az adatok visszakereshetőségét harmadik felek által üzemeltetett archiváló csomópontok kis halmaza is biztosíthatja, vagy a hálózaton belül decentralizált fájltárolás, mint például a [Portal Network](https://www.ethportal.net/).

## További olvasnivaló {#further-reading}

- [Mi az az adatelérhetőség?](https://medium.com/blockchain-capital-blog/wtf-is-data-availability-80c2c95ded0f)
- [Mit jelent az adatelérhetőség?](https://coinmarketcap.com/alexandria/article/what-is-data-availability)
- [Az Ethereum-láncon kívüli adatelérhetőségi helyzete](https://blog.celestia.org/ethereum-off-chain-data-availability-landscape/)
- [Az adatelérhetőség ellenőrzésére vonatkozó útmutató](https://dankradfeist.de/ethereum/2019/12/20/data-availability-checks.html)
- [A sharding + DAS javaslat magyarázata](https://hackmd.io/@vbuterin/sharding_proposal#ELI5-data-availability-sampling)
- [Megjegyzés az adatelérhetőségről és a törlési kódolásról](https://github.com/ethereum/research/wiki/A-note-on-data-availability-and-erasure-coding#can-an-attacker-not-circumvent-this-scheme-by-releasing-a-full-unavailable-block-but-then-only-releasing-individual-bits-of-data-as-clients-query-for-them)
- [Adatelérhetőségi bizottságok.](https://medium.com/starkware/data-availability-e5564c416424)
- [Proof-of-stake típusú adatelérhetőségi bizottságok.](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf)
- [Megoldások az adatvisszakereshetőségi problémára](https://notes.ethereum.org/@vbuterin/data_sharding_roadmap#Who-would-store-historical-data-under-sharding)
- [Adatelérhetőség vagy hogyan tanulták meg az összevont tranzakciók, hogy ne aggódjanak és szeressék az Ethereumot](https://ethereum2077.substack.com/p/data-availability-in-ethereum-rollups) 
