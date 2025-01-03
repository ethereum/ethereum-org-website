---
title: Dank-féle párhuzamos futtatás (Danksharding)
description: Ismerje meg a Proto-Danksharding és a Danksharding egymást követő fejlesztéseit, amelyek az Ethereum-skálázását teszik lehetővé.
lang: hu
summaryPoints:
  - A Danksharding egy többfázisú fejlesztés, amely javítja az Ethereum skálázhatóságát és kapacitását.
  - Az első fázisban, ami a Proto-Danksharding, a blokkokhoz hozzáadják a blobokat
  - Az adatblobok egy olcsóbb megoldást ajánlanak az összevont tranzakcióknak, hogy betegyék az adatokat az Ethereumra, és ez a felhasználóknál alacsonyabb tranzakciós díjként jelenjen meg.
  - Ezután a Danksharding elosztja a felelősséget az adatblobok igazolásához a csomópontok csoportjai mentén, ezzel tovább skálázva az Ethereumot másodpercenként több mint 100 000 tranzakcióra.
---

# Dank-féle párhuzamos futtatás (Danksharding) {#danksharding}

A **Danksharding** az a módszer, amivel az Ethereum egy valóban skálázható blokklánc lesz, ehhez azonban számos protokollfejlesztést kell végrehajtani. A **Proto-Danksharding** egy köztes lépés a megvalósításban. Mindkettő célja az, hogy a második blokkláncrétegen (L2) a tranzakciók a lehető legolcsóbbak legyenek a felhasználók számára, az Ethereum pedig több mint 100 000 tranzakciót tudjon feldolgozni másodpercenként.

## Mi az a Proto-Danksharding? {#what-is-protodanksharding}

A Proto-Danksharding, más néven [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844), az [összegzések](/layer-2/#rollups) egyik módja annak, hogy olcsóbb adatokat adjanak a blokkokhoz. A név attól a két kutatótól származik, akik ezt a módszert javasolták: Protolambda és Dankrad Feist. Korábban az összevont tranzakciókat a tranzakciók költségének csökkentésében behatárolta az a tény, hogy a tranzakciós adatokat a `CALLDATA` mezőbe posztolják.

Ez egy drága megoldás, mert az Ethereum-csomópontok dolgozzák fel és a láncon örökre élő adat marad, miközben az összevont tranzakcióknak csak egy rövid időre lenne szükségük ezekre. A Proto-Danksharding az adatblobokat vezeti be, amelyeket el lehet küldeni és hozzá lehet csatolni a blokkokhoz. Az ezekben a blobokban lévő adatok nem elérhetők az EVM számára, és automatikusan törlődnek egy meghatározott idő után (a jelen írás idéjén ez 4096 korszak vagy 18 nap). Így az összevont tranzakciók sokkal olcsóbban be tudják küldeni az adatokat, és ez a felhasználóknak olcsóbb tranzakciókat eredményez.

<ExpandableCard title="Hogyan teszik a blobok olcsóbbá az összevont tranzakciókat?" eventCategory="/roadmap/danksharding" eventName="clicked why do blocks make rollups cheaper?">

Az összevont tranzakciók az Ethereum skálázási megoldásai azáltal, hogy a tranzakciókat a láncon kívül kötegelik össze, majd azok eredményét posztolják az Ethereumra. összevont tranzakció lényegében két részből áll: adat és végrehajtás-ellenőrzés. Az adat a tranzakciók teljes sora, amelyet az összevont tranzakció dolgoz fel, hogy az Ethereumra beküldve megváltozzon annak státusza. A végrehajtás-ellenőrzés azt jelenti, hogy néhány jóhiszemű szereplő („bizonyító”) újra végrehajtja a tranzakciókat, hogy biztosan korrekt legyen a javasolt státuszváltozás. A végrehajtás-ellenőrzéshez a tranzakciós adatoknak elérhetőnek kell lenniük annyi időre, hogy azokat bárki letölthesse és ellenőrizni tudja. Így a bizonyító be tudja azonosítani és meg tudja kérdőjelezni az összevont tranzakció szekvenszerének rosszhiszemű viselkedését. Ugyanakkor az adatoknak nem kell örökre elérhetőnek maradniuk.

</ExpandableCard>

<ExpandableCard title="Miért nem okoz gondot, ha törlik a blobadatokat?" eventCategory="/roadmap/danksharding" eventName="clicked why is it OK to delete the blob data?">

A összevont tranzakciók elköteleződést posztolnak a tranzakciók adatai alapján a láncon belül, és az aktuális adatokat elérhetővé teszik az adatblobokban. Ezáltal a bizonyítók le tudják ellenőrizni az elköteleződések érvényességét, és meg tudják kérdőjelezni az általuk tévesnek tartott adatokat. A csomópont szintjén az adatblobok a konszenzusos kliensben találhatók. A konszenzus kliens tanúsítja, hogy látta az adatot és a elérhetővé vált a hálózaton. Ha az adatot örökre meg kellene tartani, akkor ezek a kliensek megnövekednek, és a csomópontok üzemeltetéséhez komoly hardverigények merülnének fel. Ehelyett az adatok automatikusan törlődnek a csomópontról 18 naponta. A konszenzusos kliens tanúsításai bizonyítják, hogy a bizonyítónak elegendő lehetősége volt az adatok ellenőrzésére. Az aktuális adatokat pedig tárolhatják a láncon kívül az összevont tranzakció üzemeltetői, a felhasználók vagy mások.

</ExpandableCard>

### Hogyan ellenőrzik a blobadatokat? {#how-are-blobs-verified}

A összevont tranzakciók az általuk feldolgozott tranzakciókat adatblobokban posztolják. Emellett posztolnak egy „elköteleződést” is. Tehát az adathoz hozzáillesztenek egy polinomiális funkciót. Ezt a funkciót számos ponton meg lehet vizsgálni. Például, ha egy rendkívül egyszerű függvényt definiálunk, `f(x) = 2x-1`, akkor ezt a funkciót megvizsgálhatjuk arra, hogy `x = 1`, `x = 2`, `x = 3`, amelyből az `1, 3, 5` eredmények származnak. A bizonyító ugyanezt a funkciót alkalmazza az adatra, és megvizsgálja azt ugyanazokon a pontokon. Ha az eredeti adat megváltozott, akkor a függvény sem lesz azonos, és az értékek is különbözni fognak minden ponton. Valójában az elköteleződés és a bizonyíték is elég bonyolult, mert kriptográfiai függvényekbe van csomagolva.

### Mi az a KZG? {#what-is-kzg}

A KZG a Kate-Zaverucha-Goldberg rövidítés egy olyan séma három [szerzője](https://link.springer.com/chapter/10.1007/978-3-642-17373-8_11), amely egy adathalmazt egy kis [kriptográfiai „elköteleződésre”](https://dankradfeist.de/ethereum/2020/06/16/kate-polynomial-commitments.html) redukál. A összevont tranzakció által beküldött adatblobot ellenőrizni kell, hogy az összevont tranzakció megfelelően működik-e. Ennek lényege, hogy a bizonyító újrafuttatja a blobban lévő tranzakciókat, hogy megvizsgálja az elköteleződés érvényességét. Ez koncepcionálisan ugyanolyan, mint ahogy a végrehajtási kliensek ellenőrizik az Ethereum-tranzakciók érvényességét az első blokkláncrétegen (L1) a Merkle-bizonyítékok alapján. A KZG egy alternatív bizonyíték, amely egy polinomiális egyenletet illeszt az adathoz. Az elköteleződés megvizsgálja a polinomiálist néhány titkos adatponton. A bizonyító ugyanezt a polinomiálist illeszti rá az adatra, megvizsgálja ugyanazon értékeken, és ellenőrzi, hogy az eredmény ugyanaz-e. Ilyen módon lehetséges ellenőrizni az adatot a zero-knowledge technikákkal kompatibilis módon, amelyet néhány összevont tranzakció és az Ethereum-protokoll használ.

### Mit volt a KZG-ceremónia? {#what-is-a-kzg-ceremony}

A KZG-ceremónia egy olyan módszer volt, amellyel az Ethereum-közösség több tagja együtt létrehozhatott egy számokból álló titkos, véletlenszerű sorozatot, amelyet adatvalidálásra tudtak használni. Nagyon fontos volt, hogy ezt a számsort ne tudja meg senki és ne is lehessen újraalkotni azt. Ennek biztosításához minden egyes résztvevő az előző tagtól kapott egy részletet. Ekkor létrehozhattak néhány új, véletlenszerű értéket (pl. azzal, hogy a böngésző leköveti az egérmozgást), és ezt összekeverhették az előző részlettel. Ezután elküldték ezt az értéket a következő tagnak, és megsemmisítették a saját gépükön. Amíg volt legalább egy személy, aki jóhiszeműen végezte ezt a folyamatot, addig a támadó számára nem derült ki a végső érték.

Az EIP-4844 KZG-ceremónia nyilvános volt és emberek tízezrei vettek benne részt, hogy hozzátegyék a saját entrópiájukat (véletlenszerűséget). Összesen több mint 140 000 hozzájáruló volt, ami a világ legnagyobb ilyen jellegű ceremóniájává tette. Ahhoz, hogy a ceremóniát megtámadhassák, ezeknek a résztvevőknek 100%-ban rosszhiszeműnek kell lenniük. A résztvevők szempontjából lényeges, hogy ha ő maguk jóhiszeműen jártak el, akkor nincs szükség arra, hogy megbízzanak másban, mert már maguk is biztosították a ceremóniát (egyénként kielégítették az N-ből 1 résztvevő kritériumot).

<ExpandableCard title="Mire használják a KZG-ceremónia által létrehozott véletlenszerű számot?" eventCategory="/roadmap/danksharding" eventName="clicked why is the random number from the KZG ceremony used for?">

Amikor egy összevont tranzakció adatot tesz a blobba, akkor egy „elköteleződést” ad, amit a láncon posztol. Ez az elköteleződés annak a vizsgálatnak az eredménye, ami bizonyos adatpontokon a polinomiális illesztést végzi. Ezeket a pontokat a KZG ceremónia által létrehozott véletlenszerű számok határozzák meg. Ekkor a bizonyítók ellenőrizhetik a polinomiálist ugyanazokon a pontokon, hogy az adat érvényességét igazolják – ha ugyanarra az értékre jutnak, akkor az adat helyes.

</ExpandableCard>

<ExpandableCard title="Miért kell titokban maradnia a KZG véletlenszerű adatainak?" eventCategory="/roadmap/danksharding" eventName="clicked why does the KZG random data have to stay secret?">

Ha valaki ismeri az elköteleződéshez használt véletlenszerű helyet, akkor könnyedén kreálhat egy polinomiálist, ami illeszkedik a megadott pontokhoz (pl. egy „ütközés”). Ezt azt jelenti, hogy a blobhoz adhatnak vagy a blobból elvehetnek adatot, és mégis tudnak érvényes bizonyítékot adni róla. Ennek megakadályozására a bizonyítók nem az aktuális, titkos helyet kapják meg, hanem a helyet egy elliptikus görbét használó kriptográfiai „fekete dobozba” csomagolva kapják meg. Ezek gyakorlatilag annyira összetorlasztják az értékeket, hogy az eredetiket nem lehet visszafejteni, miközben néhány okos algebrai bizonyító és igazoló még mindig képes megvizsgálni a polinomiálisokat az általuk képviselt pontokon.

</ExpandableCard>

<InfoBanner isWarning mb={8}>
  Se a Danksharding, se a Proto-Danksharding nem követi a hagyományos „sharding” (szilánkosítási) modellt, amelynek célja a blokklánc több részre való felosztása lenne. A shard láncok többé nem szerepelnek az Ethereum ütemtervben. Ehelyett a Danksharding elosztott adatmintavételt használ a blobokon keresztül, hogy az Ethereumot skálázza. Ezt sokkal egyszerűbb bevezetni. Ezt a modellt néha „adat-shardingnak” is nevezik.
</InfoBanner>

## Mi az a Danksharding? {#what-is-danksharding}

A Danksharding az összevont tranzakciós skálázási megoldás teljes megvalósítása, amely a Proto-Dankshardinggal kezdődik. A Danksharding az Ethereumon hatalmas helyet teremt az összevont tranzakcióknak, hogy az összecsomagolt tranzakciós adataikat beküldjék. Ezzel az Ethereum képes lesz könnyedén támogatni az egyéni összevont tranzakciók százait, és tranzakciók millióit végrehajtani minden másodpercben.

Ez úgy működik, hogy a blokkokhoz csatolt blobokat a Proto-Danksharding hatról (6) a teljes Dankshardingban 64-re bővítjük. A szükséges változások többi része a konszenzus kliensek működését fejleszti, hogy azok képesek legyenek az új, nagy méretű blobokat kezelni. Ezen változások néhány része már benne van az ütemtervben, függetlenül a Danksharding bevezetéstől. Például a Dankshardinghoz szükséges a javaslattevő-építő szétválasztás (PBS) bevezetése. Ez egy olyan fejlesztés, amely szétválasztja a blokkok építését és azok előterjesztését a különböző validátorok között. Ugyanígy az adatelérhetőség-mintázás szükséges a Dankshardinghoz, de az igazán könnyű kliensek fejlesztéséhez is, amelyek nem tárolnak túl sok előzményadatot („státuszmentes kliensek”).

<ExpandableCard title="Miért van szükség a Dankshardinghoz a javaslattevő-építő szétválasztásra (PBS)?" eventCategory="/roadmap/danksharding" eventName="clicked why does danksharding require proposer-builder separation?">

A javaslattevő-építő szétválasztás (PBS) azért szükséges, hogy az egyéni validátoroknak ne kelljen kiterjedt elköteleződéseket és 32 MB-nyi blobadatra vonatkozó bizonyítékokat generálni. Ez túl nagy terhet jelentene az otthoni letétbe helyezőknek, és erőteljesebb hardvereket kellene beszerezniük a részvételhez, amely sértené a decentralizációt. Ehelyett specializált blokképítők veszik fel a költséges számítási művelet felelősségét. Majd a blokkot elérhetővé teszik a blokk javaslattevőinek, hogy azt elküldhessék. A javaslattevő egyszerűen a legnyereségesebb blokkot választja. Így bárki olcsón és gyorsan tudja ellenőrizni a blobokat, tehát bármelyik validátor megvizsgálhatja, hogy a blokképítők jóhiszeműen viselkednek-e. Így a nagy méretű blobokat úgy lehet feldolgozni, hogy az nem csökkenti a decentralizációt. A rosszhiszemű blokképítőket ki lehet zárni a hálózatból és meg lehet bünteti őket – mások majd a helyükbe lépnek, mert ez egy profitábilis tevékenység.

</ExpandableCard>

<ExpandableCard title="Miért van szükség a Dankshardinghoz az adatelérhetőség-mintázásra?" eventCategory="/roadmap/danksharding" eventName="clicked why does danksharding require data availability sampling?">

Adatelérhetőség-mintázásra is szükség van, hogy a validátorok gyorsan és hatékonyan tudják ellenőrizni a blobadatokat. Az adatelérhetőség-mintázás segítségével a validátorok meggyőződnek arról, hogy a blobadat elérhető volt és megfelelő elköteleződés történt. Minden validátor véletlenszerűen választhat néhány adatpontot és létrehozhatja a bizonyítékot, így egyik validátornak sem kell az egész blobot ellenőrizni. Ha bármilyen adat hiányzik, azt gyorsan be lehet azonosítani, így a blobot elutasítják.

</ExpandableCard>

### Jelenlegi helyzet {#current-progress}

A teljes Danksharding bevezetéséhez még számos év szükséges. Időközben a KZG ceremóniája több mint 140 000 hozzájárulással zárult, és a Proto-Danksharding [EIP](https://eips.ethereum.org/EIPS/eip-4844)-je lejárt. Ezt a javaslatot az összes teszthálózatban maradéktalanul bevezették, és 2024 márciusában a Cancun-Deneb ("Dencun") hálózatfrissítéssel életbe lépett a Mainnet hálózaton.

### További olvasnivaló {#further-reading}

- [Proto-Danksharding jegyzetek](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq) – _Vitalik Buterin_
- [Dankrad jegyzetei a Dankshardingról](https://notes.ethereum.org/@dankrad/new_sharding)
- [Dankrad, Proto és Vitalik beszélgetése a Dankshardingról](https://www.youtube.com/watch?v=N5p0TB77flM)
- [A KZG-ceremónia](https://ceremony.ethereum.org/)
- [Carl Beekhuizen beszéde a Devconon a megbízható összeállításról](https://archive.devcon.org/archive/watch/6/the-kzg-ceremony-or-how-i-learnt-to-stop-worrying-and-love-trusted-setups/?tab=YouTube)
- [Bővebben az adatelérhetőség-mintázásról a blobokhoz](https://hackmd.io/@vbuterin/sharding_proposal#ELI5-data-availability-sampling)
- [Dankrad Feist a KZG elköteleződésekről és bizonyítékokról](https://youtu.be/8L2C6RDMV9Q)
- [KZG polinomiális elköteleződések](https://dankradfeist.de/ethereum/2020/06/16/kate-polynomial-commitments.html)
