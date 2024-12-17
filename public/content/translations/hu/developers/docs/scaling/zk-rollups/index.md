---
title: Zero-knowledge összegzők
description: Bevezetés a zero-knowledge összevont tranzakciókba – az Ethereum közösség által használt skálázási megoldásba.
lang: hu
---

A zero-knowledge (ZK) összevont tranzakciók olyan második blokkláncrétegbeli (L2) [skálázási megoldások](/developers/docs/scaling/), amelyek növelik az Ethereum főhálózat tranzakcióátviteli képességét azáltal, hogy a számítást és státusztárolást a láncon kívülre helyezik. A ZK összevont tranzakciók több ezer tranzakciót képesek feldolgozni egy kötegben, majd minimális összefoglalóadatot küldenek a főhálózatra. Ez az összefoglaló adat megadja az Ethereum státuszváltozásait és a kriptográfiai bizonyítékot arra, hogy ezek a változtatások helyesek.

## Előfeltételek {#prerequisites}

Érdemes áttekinteni az [Ethereum skálázásról](/developers/docs/scaling/) és [L2 megoldásokról](/layer-2) szóló oldalakat.

## Mik azok a zero-knowledge összevont tranzakciók? {#what-are-zk-rollups}

**Zero-knowledge (ZK/nullaismeret-alapú) összevont tranzakciók** a tranzakciókat kötegekbe gyűjtik (göngyölítik), amelyeket a láncon kívül hajtanak végre. A láncon kívüli számítás csökkenti a blokkláncra küldendő adatok mennyiségét. A ZK összevont tranzakció operátorai a kötegben lévő tranzakciók által okozott változásokról összefoglalót küldenek ahelyett, hogy minden egyes tranzakciót külön-külön elküldenének. Emellett [érvényességi bizonyítékokat](/glossary/#validity-proof) is készítenek, hogy bizonyítsák a változtatásaik helyességét.

A ZK összevont tranzakció státuszát az Ethereum hálózatra telepített okosszerződés tartja fenn. Ennek a státusznak a frissítéséhez a ZK összevont tranzakciós csomópontoknak érvényességi bizonyítékot kell benyújtaniuk ellenőrzésre. Az érvényességi bizonyíték egy kriptográfiai biztosíték arra, hogy az összevont tranzakció által javasolt státuszváltozás valóban az adott tranzakcióköteg végrehajtásának eredménye. Ez azt jelenti, hogy a ZK összevont tranzakcióknak csak érvényességi bizonyítékokat kell szolgáltatniuk ahhoz, hogy az Ethereumon a tranzakciók véglegesedjenek, ahelyett hogy az összes tranzakciós adatot a láncon tennék közzé, mint az [optimista összevont tranzakciók](/developers/docs/scaling/optimistic-rollups/).

A ZK összevont tranzakcióból az Ethereumba történő pénzmozgás nem jár késedelemmel, mivel a kilépési tranzakciók akkor kerülnek végrehajtásra, amikor a ZK összevont tranzakciós szerződés ellenőrzi az érvényességi bizonyítékot. Ezzel szemben az optimista összevont tranzakciókból történő pénzkivonás késleltetett, hogy szükség esetén bárki megtámadhassa a kilépési tranzakciót egy [csalási bizonyítékkal](/glossary/#fraud-proof).

A ZK összevont tranzakciók a tranzakciókat `calldata` adatként írják az Ethereumba. A `calldata` az a hely, ahol az okosszerződés-függvények külső hívásaiban szereplő adatok tárolódnak. A `calldata` információit közzéteszik a blokkláncon, így bárki önállóan rekonstruálhatja az összevont tranzakció státuszát. A ZK összevont tranzakciók tömörítési technikákat használnak a tranzakciós adatok csökkentésére – például a számlákat cím helyett index-szel jelölik, ami 28 bájtnyi adatot takarít meg. Az adatok közzététele a láncon jelentős költséget jelent az összevont tranzakciók esetében, így az adattömörítés csökkentheti a felhasználók díjait.

## Hogyan működnek együtt a ZK összevont tranzakciók az Ethereummal? {#zk-rollups-and-ethereum}

A ZK összevont tranzakciós lánc egy olyan láncon kívüli protokoll, amely az Ethereum blokklánc tetején működik, és a láncon belüli Ethereum okosszerződések kezelik. A ZK összevont tranzakciók a tranzakciókat a főhálózaton kívül hajtják végre, de a láncon kívüli tranzakciós kötegeket átadják a láncon belüli összevonttranzakció-szerződésnek. Ez a tranzakciós rekord, akárcsak az Ethereum blokklánc, megváltoztathatatlan, és a ZK összevont tranzakciós láncot alkotja.

A ZK összevont tranzakció alapvető felépítése a következő összetevőkből áll:

1. **Láncon lévő szerződések**: A ZK összevont tranzakciós protokollt az Ethereumon futó okosszerződések irányítják. Ez magában foglalja a fő szerződést, amely tárolja az összevont tranzakciós blokkokat, nyomon követi a letéteket és figyeli a státuszfrissítéseket. Egy másik láncon belüli szerződés (a hitelesítői szerződés) ellenőrzi a blokk készítői által benyújtott zero-knowledge bizonyítékokat. Így az Ethereum a ZK összevont tranzakciók alaprétegeként vagy L1-ként szolgál.

2. **Láncon kívüli virtuális gép (VM)**: Míg a ZK összevont tranzakciós protokoll az Ethereumon él, a tranzakciók végrehajtása és a státusztárolás az [EVM-től](/developers/docs/evm/) független, külön virtuális gépen történik. Ez a láncon kívüli VM a ZK összevont tranzakciós tranzakciók végrehajtási környezete, és a ZK összevont tranzakciós protokoll másodlagos vagy második rétegeként szolgál. Az Ethereum főhálózaton ellenőrzött érvényességi bizonyítékok garantálják a láncon kívüli VM-ben történő státuszváltozások helyességét.

A ZK összevont tranzakciók hibrid skálázási megoldások, mivel láncon kívüli, függetlenül működő protokollok, de biztonságukat az Ethereumból merítik. Konkrétan az Ethereum-hálózat érvényesíti a státuszváltozások érvényességét a ZK összevont tranzakción, és garantálja az összevont tranzakció státuszváltozásához tartozó adatelérhetőséget. Emiatt a ZK összevont tranzakciók biztonságosabbak, mint a tisztán láncon kívüli skálázási megoldások, mint például a [mellékláncok](/developers/docs/scaling/sidechains/), amelyek maguk felelnek a biztonsági tulajdonságaikért, vagy a [validiumok](/developers/docs/scaling/validium/), amelyek bár érvényességi bizonyítékokkal ellenőrzik a tranzakciókat az Ethereumon, de a tranzakciós adatokat máshol tárolják.

A ZK összevont tranzakciók az Ethereum fő protokolljára támaszkodnak a következőkben:

### Adatelérhetőség {#data-availability}

A ZK összevont tranzakciók minden egyes, a láncon kívül feldolgozott tranzakció státuszadatait közzéteszik az Ethereumon. Ezekkel az adatokkal lehetővé válik, hogy magánszemélyek vagy vállalkozások reprodukálják az összevont tranzakció státuszát, és maguk hitelesítsék a láncot. Az Ethereum ezeket az adatokat `calldata` formájában a hálózat minden résztvevője számára elérhetővé teszi.

A ZK összevont tranzakcióknak nem kell sok tranzakciós adatot közzétenniük a láncban, mivel az érvényességi bizonyítékok már most is ellenőrzik az státuszváltozások hitelességét. Mindazonáltal az adatok láncon belüli tárolása továbbra is fontos, mivel lehetővé teszi az L2-lánc státuszának engedély nélküli, független ellenőrzését, így bárki tranzakciókötegeket küldhet be, és ezzel elejét veszi annak, hogy rosszhiszemű szereplők cenzúrázzák vagy befagyasszák a láncot.

A felhasználóknak szükségük van a láncon lévő dolgokra ahhoz, hogy az összevont tranzakcióval interakcióban legyenek. A státuszadatokhoz elérése nélkül a felhasználók nem tudják lekérdezni a számlaegyenlegüket, illetve nem tudnak státuszinformációkra támaszkodó tranzakciókat (pl. pénzfelvételt) kezdeményezni.

### Tranzakcióvéglegesség {#transaction-finality}

Az Ethereum a ZK összevont tranzakciók elszámolási rétegeként működik: az L2 tranzakciók csak akkor kerülnek véglegesítésre, ha az L1 szerződés elfogadja az érvényességi bizonyítékot. Ez kiküszöböli annak kockázatát, hogy a rosszindulatú szereplők megrongálják a láncot (pl. ellopják a pénzeszközöket), mivel minden tranzakciót jóvá kell hagyni a főhálózaton. Az Ethereum azt is garantálja, hogy a felhasználói műveleteket nem lehet visszafordítani, miután véglegesítették azokat az L1-en.

### Cenzúraálló kialakítás {#censorship-resistance}

A legtöbb ZK összevont tranzakció egy „szupercsomópontot” (az operátort) használ a tranzakciók végrehajtására, a kötegek előállítására és a blokkok L1-re küldésére. Ez biztosítja ugyan a hatékonyságot, de növeli a cenzúra kockázatát: a rosszindulatú ZK összevonttranzakció-üzemeltetők cenzúrázhatják a felhasználókat azáltal, hogy megtagadják a tranzakciók kötegekbe való felvételét.

Biztonsági intézkedésként a ZK összevont tranzakciók lehetővé teszik a felhasználók számára, hogy tranzakciókat nyújtsanak be közvetlenül a főhálózat összevont tranzakciós szerződéshez, ha úgy gondolják, hogy az üzemeltető cenzúrázza őket. Ezzel a felhasználók átléphetnek a ZK összevont tranzakcióból az Ethereumra az üzemeltető engedélye nélkül.

## Hogyan működnek a ZK összevont tranzakciók? {#how-do-zk-rollups-work}

### Tranzakciók {#transactions}

A ZK összevont tranzakció felhasználói aláírják a tranzakciókat, és elküldik az L2 operátoroknak feldolgozásra és a következő kötegbe való felvételre. Bizonyos esetekben az operátor egy centralizált résztvevő, az úgynevezett szekvenszer, amely végrehajtja a tranzakciókat, kötegekbe gyűjti azokat, és továbbítja az L1-nek. Ebben a rendszerben a szekvenszer az egyetlen olyan entitás, amely L2 blokkokat állíthat elő és összevont tranzakciókat adhat hozzá a ZK összevont tranzakciós szerződéshez.

Más ZK összevont tranzakciók egy [proof-of-stake (letétigazolás)](/developers/docs/consensus-mechanisms/pos/) alapú validátorcsoport használatával rotálják az operátori szerepet. A leendő üzemeltetők pénzt helyeznek el az összevont tranzakciós szerződésben, és az egyes letétek nagysága befolyásolja a letétbe helyező esélyeit arra, hogy kiválasztják a következő köteg előállítására. Az operátort meg lehet büntetni a letétje mértékéig, ha rosszindulatúan cselekszik, ami arra ösztönzi, hogy érvényes blokkokat tegyen közzé.

#### Hogyan teszik közzé a ZK összevont tranzakciók a tranzakciós adatokat az Ethereumon {#how-zk-rollups-publish-transaction-data-on-ethereum}

A tranzakciós adatokat az Ethereumon `calldata` adatként publikálják. A `calldata` egy adatterület az okosszerződésben, amelyet arra használnak, hogy argumentumokat adjanak át egy függvénynek, és a [memóriához](/developers/docs/smart-contracts/anatomy/#memory) hasonlóan viselkedik. Bár a `calldata` nem az Ethereum státuszának részeként tárolódik, az Ethereum [historikus naplózásában](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html?highlight=memory#logs) fennmarad a láncban. A `calldata` nem befolyásolja az Ethereum státuszát, így olcsó adattárolást tesz lehetővé a láncban.

A `calldata` kulcsszó gyakran azonosítja a tranzakció által meghívott okosszerződés-metódust, és annak bemeneteit egy tetszőleges bájtsorozat formájában tartalmazza. A ZK összevont tranzakciók a `calldata` mezőt használják a tömörített tranzakciós adatok láncon belüli közzétételére; az összevonttranzakció-operátor új köteget ad hozzá az összevont tranzakciós szerződésben szereplő függvény meghívásával, és az adatokat a függvény argumentumaként adja át. Ez segít csökkenteni a felhasználók költségeit, mivel az összevont tranzakciós díjak nagy részét a tranzakciós adatok láncban történő tárolására fordítják.

### Státuszrögzítések {#state-commitments}

A ZK összevont tranzakció státusza, amely az L2 számlákat és egyenlegeket tartalmazza, egy [Merkle-fa](/whitepaper/#merkle-trees) formájában jelenik meg. A Merkle-fa gyökerének (Merkle-gyökér) kriptográfiai hash-e a láncon belüli szerződésben van tárolva, így az összevonttranzakció-protokoll nyomon követheti a ZK összevont tranzakció státuszában bekövetkező változásokat.

Az összevont tranzakció egy új tranzakcióhalmaz végrehajtása után új státuszba lép. A státuszváltozást kezdeményező operátornak ki kell számolnia egy új státuszgyökeret, és be kell nyújtania azt a láncon belüli szerződésnek. Ha a köteghez tartozó érvényességi bizonyítékot a hitelesítő szerződés igazolja, az új Merkle-gyökér lesz a ZK összevont tranzakció kanonikus státuszgyökere.

A státuszgyökerek kiszámítása mellett a ZK összevont tranzakciós operátor létrehoz egy köteggyökeret is, ami a kötegben lévő tranzakciókat tartalmazó Merkle-fa gyökere. Egy új köteg benyújtásakor az összevont tranzakciós szerződés tárolja a köteggyökeret, így a felhasználók bizonyítani tudják, hogy egy tranzakció (például egy kifizetési kérelem) szerepel a kötegben. A felhasználóknak meg kell adniuk a tranzakció adatait, a köteggyökeret és egy [Merkle bizonyítékot](/developers/tutorials/merkle-proofs-for-offline-data-integrity/), amely megmutatja a belefoglalás útvonalát.

### Érvényességi bizonyítékok {#validity-proofs}

Az új státuszgyökér, amelyet a ZK összevont tranzakció operátora az L1 szerződésnek benyújt, az összevont tranzakció státuszának frissítéséből származik. Tegyük fel, hogy Alice 10 tokent küld Bobnak, az operátor egyszerűen csökkenti Alice egyenlegét 10-zel, és növeli Bob egyenlegét 10-zel. Az operátor ezután a frissített számlaadatokat hash-eli, újjáépíti az összevont tranzakció Merkle-fáját, és az új Merkle-gyökeret elküldi a láncban lévő szerződésnek.

Az összevont tranzakciós szerződés azonban nem fogadja el automatikusan a javasolt státuszelköteleződést, amíg az operátor nem bizonyítja, hogy az új Merkle-gyökér az összevont tranzakció státuszának helyes frissítéséből származik. A ZK összevont tranzakció operátora ezt úgy éri el, hogy érvényességi bizonyítékot állít elő, amely egy tömör kriptográfiai elköteleződés, amely a kötegelt tranzakciók helyességét igazolja.

Az érvényességi bizonyítékok lehetővé teszik a felek számára, hogy igazolják egy állítás helyességét anélkül, hogy felfednék az állítást – ezért nevezik őket felfedés nélküli (zero-knowledge) bizonyításnak is. A ZK összevont tranzakciók érvényességi bizonyítékokat használnak a láncon kívüli státuszváltozások helyességének megerősítésére, és a tranzakciókat nem kell újra végrehajtani az Ethereumon. Ezek az érvényességi bizonyítékok [ZK-SNARK](https://arxiv.org/abs/2202.06877) (Zero-Knowledge Succinct Non-Interactive Argument of Knowledge, vagyis zero-knowledge tömörített nem interaktív érv ismeretre) vagy [ZK-STARK](https://eprint.iacr.org/2018/046) (Zero-Knowledge Scalable Transparent Argument of Knowledge, vagyis zero-knowledge skálázható transzparens érv ismeretre) formájában érkezhetnek.

A SNARK-ok és a STARK-ok egyaránt segítenek igazolni a ZK összevont tranzakciókban a láncon kívüli számítás integritását, bár mindegyik típusnak vannak sajátos jellemzői.

**ZK-SNARK-ok**

A ZK-SNARK protokoll működéséhez szükség van a nyilvános paraméterek (közös hivatkozási karakterlánc/CRS) létrehozására: a CRS nyilvános paramétereket biztosít az érvényességi bizonyítékok igazolásához és ellenőrzéséhez. A bizonyítási rendszer biztonsága a CRS beállításától függ; ha a nyilvános paraméterek létrehozásához használt információk rosszindulatú szereplők birtokába jutnak, akkor képesek lehetnek hamis érvényességi bizonyítékokat generálni.

Egyes ZK összevont tranzakciók úgy próbálják megoldani ezt a problémát, hogy egy [többszereplős számítási ceremóniát (MPC)](https://zkproof.org/2021/06/30/setup-ceremonies/amp/) használnak, melynek során megbízható személyekkel nyilvános paramétereket generálnak a ZK-SNARK folyamat számára. Mindegyik fél ad némi véletlenszerűséget (úgynevezett „mérgező hulladékot”) a CRS konstrukciójához, amelyet azonnal meg kell semmisíteniük.

Ezt a bizalmat igénylő felállást azért használják, mert ez növeli a CRS-beállítás biztonságát. Amíg legalább egy becsületes résztvevő megsemmisíti a bemenetét, a ZK-SNARK rendszer biztonsága garantált. Ez a megközelítés azonban megköveteli, hogy az érintettek bízzanak abban, hogy törlik a mintavételezett véletlenszerűséget, és nem ássák alá a rendszer biztonsági garanciáit.

A bizalmi feltételezésektől eltekintve a ZK-SNARK-ok népszerűek a kis bizonyítékméret és az állandó ellenőrzési idő miatt. Mivel a bizonyítékok L1-en történő ellenőrzése jelenti a ZK összevont tranzakció működtetésének nagyobb költségét, az L2-k ZK-SNARK-okat használnak a főhálózaton gyorsan és olcsón ellenőrizhető bizonyítékok létrehozására.

**ZK-STARK-ok**

A ZK-SNARK-okhoz hasonlóan a ZK-STARK-ok is a bemenetek felfedése nélkül bizonyítják a láncon kívüli számítás érvényességét. A ZK-STARK-ok azonban skálázhatóságuk és átláthatóságuk miatt a ZK-SNARK-okhoz képest előrelépésnek számítanak.

A ZK-STARK-ok átláthatók, mivel a közös referenciasorozat (CRS) megbízható beállítása nélkül is működnek. Ehelyett a ZK-STARK-ok nyilvánosan ellenőrizhető véletlenszerűségre támaszkodnak a bizonyítások generálásához és ellenőrzéséhez szükséges paraméterek beállításához.

A ZK-STARK-ok nagyobb skálázhatóságot is biztosítanak, mivel az érvényességi bizonyítékok igazolásához és ellenőrzéséhez szükséges idő _kvázilineárisan_ növekszik a mögöttes számítás bonyolultságához képest. A ZK-SNARK-okkal a bizonyítási és ellenőrzési idők _lineárisan_ skálázódnak a mögöttes számítás méretéhez képest. Ez azt jelenti, hogy a ZK-STARK-oknak kevesebb időre van szükségük a bizonyításhoz és ellenőrzéshez, mint a ZK-SNARK-oknak, amikor nagy adathalmazokról van szó, ami nagy volumenű alkalmazásokhoz teszi őket hasznossá.

A ZK-STARK-ok a kvantumszámítógépek ellen is biztonságosak, míg a ZK-SNARK-okban használt elliptikus görbe kriptográfia (ECC) széles körben úgy vélik, hogy sebezhető a kvantumszámítógépekkel szemben. A ZK-STARK-ok hátránya, hogy nagyobb méretű bizonyítékokat készítenek, amelyeket drágább ellenőrizni az Ethereumon.

#### Hogyan működnek az érvényességi bizonyítékok a ZK összevont tranzakciókban? {#validity-proofs-in-zk-rollups}

##### Bizonyíték készítése

A tranzakciók elfogadása előtt az operátor elvégzi a szokásos ellenőrzéseket. Ez magában foglalja annak ellenőrzését, hogy:

- A küldő és a fogadó számlák a státuszfa részét képezik.
- A küldőnek elegendő fedezete van a tranzakció lebonyolításához.
- A tranzakció helyes, és egyezik a küldő összevont tranzakcióbeli nyilvános kulcsával.
- A küldő nonce-ja helyes stb.

Amint a ZK összevont tranzakciós csomópont elegendő tranzakcióval rendelkezik, összegyűjti azokat egy kötegbe, és összeszedi a bemeneteket a bizonyító folyamat számára, hogy egy tömör ZK-bizonyítékká állítsa össze. Ezek a következők:

- A kötegben lévő tranzakciókat tartalmazó Merkle-fa gyökere.
- Merkle-bizonyítékok a tranzakciókhoz a kötegbe való felvétel bizonyítására.
- Merkle-bizonyítékok a tranzakciókban szereplő minden küldő-fogadó párra annak bizonyítására, hogy ezek a számlák az összevont tranzakció státuszfájának részét képezik.
- Közbenső státuszgyökerek halmaza, amely a státuszgyökér frissítéséből származik, miután az egyes tranzakciókhoz státuszfrissítéseket alkalmaztak (azaz csökkentették a küldőszámlákat és növelték a fogadószámlákat).

A bizonyító folyamat úgy számítja ki az érvényességi bizonyítékot, hogy minden tranzakción végigmegy, és elvégzi ugyanazokat az ellenőrzéseket, amelyeket az operátor a tranzakció feldolgozása előtt elvégzett. Először is a megadott Merkle-bizonyíték segítségével ellenőrzi, hogy a küldő számlája része a meglévő státuszgyökérnek. Ezután csökkenti a küldő egyenlegét, megnöveli a nonce-ját, a frissített számlaadatokat hash-eli, és a Merkle-bizonyítékkal kombinálva létrehoz egy új Merkle-gyökeret.

Ez a Merkle-gyökér tükrözi a ZK összevont tranzakció státuszának egyetlen változását: a küldő egyenlegének és a nonce-nak a változását. Ez azért lehetséges, mert a számla létezésének bizonyítására használt Merkle-bizonyítékot használják az új státuszgyökér létrehozására.

A bizonyító folyamat ugyanezt végzi a fogadó számláján. Ellenőrzi, hogy a fogadó számlája létezik-e a köztes státuszgyökér alatt (a Merkle-bizonyítékkal), növeli az egyenlegét, újra-hash-eli a számlaadatokat, és a Merkle-bizonyítékkal kombinálva létrehoz egy új státuszgyökeret.

A folyamat minden tranzakciónál megismétlődik; minden ciklus új státuszgyökeret hoz létre a küldő számlájának frissítéséből, és egy következő új gyökeret a fogadó számlájának frissítéséből. A státuszgyökér frissítése azt mutatja, hogy az összevont tranzakció státuszfájának egy része megváltozik.

A ZK bizonyító folyamat a teljes tranzakciós köteg felett iterál, és ellenőrzi a frissítések azon sorozatát, amely az utolsó tranzakció végrehajtása után egy végső státuszgyökeret eredményez. Az utolsó kiszámított Merkle-gyökér lesz a ZK-rollup legújabb kanonikus státuszgyökere.

##### Bizonyíték-ellenőrzés

Miután a bizonyító folyamat igazolja a státuszfrissítések helyességét, az L2 operátor benyújtja a kiszámított érvényességi bizonyítékot az L1-en lévő hitelesítő szerződésnek. A szerződés ellenőrző folyamata igazolja a bizonyíték érvényességét, és ellenőrzi a bizonyítás részét képező nyilvános bemeneteket is:

- **Korábbi státuszgyökér**: A ZK összevont tranzakció régi státuszgyökere (a kötegelt tranzakciók végrehajtása előtt), amely az L2-lánc utolsó ismert érvényes státuszát tükrözi.

- **Új státuszgyökér**: A ZK összevont tranzakció új státuszgyökere (a kötegelt tranzakciók végrehajtása után), amely az L2-lánc legújabb státuszát tükrözi. Az új státuszgyökér az a végső gyökér, amely a bizonyító folyamatban a státuszfrissítések után keletkezik.

- **Köteggyökér**: A köteg Merkle-gyökere, amelyet a kötegben lévő tranzakciók _merkle-izálásával_ és a fa gyökerének hash-elésével kapunk.

- **Tranzakciós bemenetek**: A benyújtott köteg részeként végrehajtott tranzakciókhoz kapcsolódó adatok.

Ha a bizonyíték kielégíti a folyamatot (azaz érvényes), akkor létezik azon érvényes tranzakciók halmaza, amelyek az összevont tranzakciót az előző státuszából (a korábbi státuszgyökér által kriptográfiai ujjlenyomatokkal ellátva) egy új státuszba (az újstátuszgyökér által kriptográfiai ujjlenyomatokkal ellátva) vezetik át. Ha a korábbi státuszgyökér megegyezik az összevont tranzakciós szerződésben tárolt gyökérrel, és a bizonyíték érvényes, az összevont tranzakciós szerződés átveszi az új státuszgyökeret a bizonyítékból, és frissíti a státuszfáját, hogy tükrözze az összevont tranzakció megváltozott státuszát.

### Belépés és kilépés {#entries-and-exits}

A felhasználók úgy lépnek be a ZK összevont tranzakcióba, hogy tokeneket helyeznek el az összevont tranzakció L1-en lévő szerződésében. Ez a tranzakció bekerül a sorba, mivel csak az operátorok nyújthatnak be tranzakciókat az összevont tranzakciós szerződéshez.

Ha a függőben lévő befizetési sor kezd megtelni, a ZK összevont tranzakció operátora átveszi a befizetési tranzakciókat, és benyújtja azokat az összevont tranzakciós szerződéshez. Amint a felhasználó pénzeszközei az összevont tranzakcióban vannak, elkezdheti használni azáltal, hogy tranzakciókat küld az operátornak feldolgozásra. A felhasználók ellenőrizhetik az egyenlegeket az összevont tranzakción a számlaadataik hash-elésével, a hash elküldésével az összevont tranzakció-szerződésnek, és egy Merkle-bizonyítékkal, amelyet az aktuális státuszgyökérrel szemben ellenőriznek.

A ZK összevont tranzakcióból az L1-re való visszalépés egyszerű. A felhasználó kezdeményezi a kilépési tranzakciót azzal, hogy az összevont tranzakcióban lévő eszközeit egy megadott számlára küldi elégetés céljából. Ha az üzemeltető felveszi a tranzakciót a következő kötegbe, a felhasználó kivételi kérelmet nyújthat be a láncon belüli szerződéshez. Ez a kivételi kérelem a következőket tartalmazza:

- Merkle bizonyíték, amely bizonyítja, hogy a felhasználó tranzakciója egy tranzakciókötegben szerepel az elégetési számlán

- Tranzakciós adatok

- Köteggyökér

- L1 cím a befizetett pénzeszközök fogadására

az összevont tranzakciós szerződés hash-eli a tranzakció adatait, ellenőrzi, hogy létezik-e a köteggyökér, és a Merkle-bizonyíték segítségével ellenőrzi, hogy a tranzakció hash része-e a köteggyökérnek. Ezt követően a szerződés végrehajtja a kilépési tranzakciót, és elküldi a pénzt a felhasználó által az L1-en kiválasztott címre.

## A ZK összevont tranzakciók és az EVM kompatibilitása {#zk-rollups-and-evm-compatibility}

Az optimista összevont tranzakciókkal ellentétben a ZK összevont tranzakciók nem kompatibilisek az [Ethereum virtuális géppel (EVM)](/developers/docs/evm/). Az általános célú EVM-számítás bizonyítási folyamata nehezebb és erőforrás-igényesebb, mint az egyszerű számítások bizonyítása (mint például a tokenátvitel).

A [zero-knowledge technológia fejlődése](https://hackmd.io/@yezhang/S1_KMMbGt#Why-possible-now) azonban újból felkeltette az érdeklődést az EVM-számítás zero-knowledge bizonyítékokba csomagolása iránt. Ezek az erőfeszítések egy olyan zero-knowledge EVM (zkEVM) implementáció létrehozására irányulnak, amely hatékonyan képes ellenőrizni a programvégrehajtás helyességét. A zkEVM újrateremti a meglévő EVM opkódokat a bizonyítási/ellenőrzési folyamathoz, lehetővé téve az okosszerződések végrehajtását.

Az EVM-hez hasonlóan a zkEVM is státuszváltozást okoz, miután bizonyos bemeneteken számításokat végeztek. A különbség az, hogy a zkEVM zero-knowledge bizonyítékokat is készít, hogy ellenőrizze a programvégrehajtás lépéseinek helyességét. Az érvényességi bizonyítékok ellenőrizhetik a VM státuszát érintő műveletek helyességét (memória, stack, tárhely) és magát a számítást (a művelet a megfelelő opkódokat hívta meg és helyesen hajtotta végre).

Az EVM-kompatibilis ZK összevont tranzakciók bevezetése várhatóan segít a fejlesztőknek kihasználni a zero-knowledge bizonyítékok skálázhatóságát és biztonsági garanciáit. Ami még fontosabb, a natív Ethereum infrastruktúrával való kompatibilitás azt jelenti, hogy a fejlesztők ZK-barát dappokat építhetnek ismerős (és kipróbált) eszközökkel és nyelvekkel.

## Hogyan működnek a ZK összevont tranzakciós díjak? {#how-do-zk-rollup-fees-work}

Az, hogy a felhasználók mennyit fizetnek a tranzakciókért a ZK összevont tranzakciókon, az Ethereum főhálózathoz hasonlóan a gázdíjtól függ. A gázdíjak azonban az L2 esetében másképp alakulnak, és a következő költségek befolyásolják:

1. **Státuszfrissítés**: Az Ethereum státuszába való írás (azaz egy tranzakció benyújtása az Ethereum blokkláncán) fix költséggel jár. A ZK összevont tranzakciók a tranzakciók kötegelésével és a fix költségek több felhasználóra történő elosztásával csökkentik ezt a költséget.

2. **Adatközzététel**: A ZK összevont tranzakciók minden tranzakció státuszadatait `calldata` mezőként teszik közzé az Ethereumban. A `calldata` költségeit jelenleg az [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) szabályozza, amely a `calldata` nem nulla bájtjaira 16, nulla bájtjaira 4 gázköltséget ír elő. A tranzakció költségét az befolyásolja, hogy mennyi `calldata`-t kell a láncban közzétenni.

3. **L2 operátordíjak**: Ezt az összevont tranzakció operátorának fizetik a tranzakciók feldolgozása során felmerülő számítási költségek ellentételezéseként, hasonlóan az Ethereum főhálózat [tranzakciós prioritási díjaihoz (borravaló)](/developers/docs/gas/#how-are-gas-fees-calculated).

4. **Bizonyítéklétrehozás és ellenőrzés**: A ZK összevont tranzakció operátorainak érvényességi bizonyítékokat kell előállítaniuk a tranzakciókötegekhez, ami erőforrás-igényes. A zero-knowledge bizonyítékok ellenőrzése a főhálózaton szintén gázba kerül (kb. 500 000 gáz).

A tranzakciók kötegelése mellett a ZK összevont tranzakciók a tranzakciós adatok tömörítésével csökkentik a felhasználók díjait. [Megtekinthet egy valós idejű kalkulációt](https://l2fees.info/) arról, hogy mennyibe kerül az Ethereum ZK összevont tranzakciók használata.

## Hogyan skálázzák a ZK összevont tranzakciók az Ethereumot? {#scaling-ethereum-with-zk-rollups}

### Tranzakciós adatok tömörítése {#transaction-data-compression}

A ZK összevont tranzakciók növelik az Ethereum alaprétegének tranzakcióátvitelét azáltal, hogy a számításokat a láncon kívülre viszik, de a skálázás valódi lendületét a tranzakciós adatok tömörítése adja. Az Ethereum [blokkmérete](/developers/docs/blocks/#block-size) korlátozza az egyes blokkokban tárolható adatokat, és ezáltal a blokkonként feldolgozott tranzakciók számát. A tranzakciókkal kapcsolatos adatok tömörítésével a ZK összevont tranzakciók jelentősen növelik a blokkonként feldolgozott tranzakciókat.

A ZK összevont tranzakciók jobban tudják tömöríteni a tranzakciós adatokat, mint az optimista összevont tranzakciók, mivel nem kell a tranzakciók érvényesítéséhez szükséges összes adatot elküldeniük. Minimális adatot kell elküldeniük, amellyel újra lehet építeni az összevont tranzakción lévő számlák és egyenlegek legfrissebb státuszát.

### Rekurzív bizonyítékok {#recursive-proofs}

A zero-knowledge bizonyítékok előnye, hogy azok más bizonyítékokat is ellenőrizhetnek. Például egy ZK-SNARK ellenőrizhet más ZK-SNARK-okat. Ezek a rekurzív bizonyítékok drámaian megnövelik a ZK összevont tranzakciók teljesítményét.

Jelenleg az érvényességi bizonyítékokat blokkonként generálják, és az L1-szerződéshez nyújtják be ellenőrzésre. Az egy blokkra vonatkozó bizonyítékok ellenőrzése korlátozza a ZK összevont tranzakciók tranzakcióátvitelét, mivel csak egy blokk véglegesíthető, amikor az operátor benyújtja a bizonyítékot.

A rekurzív bizonyítékok révén ugyanakkor egyetlen érvényességi bizonyítékkal több blokkot is véglegesíthetünk. Ennek az az oka, hogy a bizonyító folyamat rekurzív módon több blokkbizonyítékot aggregál, amíg egy végső bizonyíték létre nem jön. Az L2 operátor benyújtja ezt a rekurzív bizonyítékot, és ha a szerződés elfogadja azt, akkor az összes vonatkozó blokk azonnal véglegesítésre kerül. A rekurzív bizonyítékokkal nő az Ethereumon az adott időperiódusban véglegesíthető ZK összevont tranzakciók száma.

### A ZK összevont tranzakciók előnyei és hátrányai {#zk-rollups-pros-and-cons}

| Előnyök                                                                                                                                                                                                                                                           | Hátrányok                                                                                                                                                                                                                                         |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Az érvényességi bizonyítékok biztosítják a láncon kívüli tranzakciók helyességét, és megakadályozzák, hogy az operátorok érvénytelen státuszváltozásokat hajtsanak végre.                                                                                         | Az érvényességi bizonyítékok kiszámításával és ellenőrzésével járó költségek jelentősek, és növelhetik az összevont tranzakciók felhasználóinak díjait.                                                                                           |
| Gyorsabb tranzakciós véglegesítést kínál, mivel a státuszfrissítések jóváhagyása az érvényességi bizonyítékok L1-en történő ellenőrzése után történik.                                                                                                            | Az EVM-kompatibilis ZK összevont tranzakciók építése a zero-knowledge technológia összetettsége miatt nehéz.                                                                                                                                      |
| Bizalomigény nélküli kriptográfiai mechanizmusokra támaszkodik a biztonság érdekében, nem pedig az ösztönzött szereplők őszinteségére, mint az [optimista összevont tranzakciók](/developers/docs/scaling/optimistic-rollups/#optimistic-pros-and-cons) esetében. | Az érvényességi bizonyítékok előállításához speciális hardverre van szükség, ami ösztönözheti a lánc néhány fél általi centralizált ellenőrzését.                                                                                                 |
| A láncon kívüli státusz megállapításához szükséges adatokat az L1-en tárolja, ami garantálja a biztonságot, a cenzúraellenességet és a decentralizációt.                                                                                                          | A centralizált operátorok (szekvencerek) befolyásolhatják a tranzakciók sorrendjét.                                                                                                                                                               |
| A felhasználók nagyobb tőkehatékonyságot élveznek, és késedelem nélkül vehetnek fel pénzt az L2-ről.                                                                                                                                                              | A hardver-követelmények csökkenthetik azon résztvevők számát, akik a láncot működésre kényszeríthetik, növelve annak kockázatát, hogy a rosszindulatú operátorok befagyasztják az összevont tranzakció státuszát és cenzúrázzák a felhasználókat. |
| Nem függ az elérhetőségi feltételezésektől, és a felhasználóknak nem kell validálniuk a láncot, hogy megvédjék pénzeszközeiket.                                                                                                                                   | Egyes bizonyítási rendszerek (pl. a ZK-SNARK) megbízható beállításokat igényelnek, amelyek rossz kezelés esetén potenciálisan veszélyeztethetik az összevont tranzakció biztonsági modelljét.                                                     |
| A jobb adattömörítés segíthet csökkenteni a `calldata` közzétételének költségeit az Ethereumban, és minimalizálhatja a felhasználók összevonttranzakció-díjait.                                                                                                   |                                                                                                                                                                                                                                                   |

### A ZK összevont tranzakciók vizuális bemutatása {#zk-video}

Nézze meg a videót, melyben a Finematics elmagyarázza a ZK összevont tranzakciók lényegét:

<YouTube id="7pWxCklcNsU" start="406" />

## Kik dolgoznak zkEVM-en? {#zkevm-projects}

Többek között az alábbi projektek dolgoznak zkEVM-en:

- **[zkEVM](https://github.com/privacy-scaling-explorations/zkevm-specs)** - _A zkEVM az Ethereum Alapítvány által finanszírozott projekt, amelynek célja egy EVM-kompatibilis ZK összevont tranzakció létrehozása és egy mechanizmus kifejlesztése az Ethereum blokkok érvényességi bizonyítékainak generálására._

- **[Polygon zkEVM](https://polygon.technology/solutions/polygon-zkevm)** - _Egy decentralizált ZK összevont tranzakció az Ethereum főhálózaton, amely egy zero-knowledge Ethereum virtuális gépen (zkEVM) dolgozik, amely Ethereum tranzakciókat hajt végre átlátható módon, beleértve a zero-knowledge-bizonyíték igazolásásra alkalmas okosszerződéseket is._

- **[Scroll](https://scroll.io/blog/zkEVM)** - _Scroll egy tech-központú vállalat, amely egy natív zkEVM L2 megoldás létrehozásán dolgozik az Ethereum számára._

- **[Taiko](https://taiko.xyz)** - _A Taiko egy decentralizált, Ethereum-egyenértékű ZK összevont tranzakció ([1-es típusú ZK-EVM](https://vitalik.eth.limo/general/2022/08/04/zkevm.html))._

- **[ZKsync](https://docs.zksync.io/)** - _A ZKsync Era egy EVM-kompatibilis ZK összevont tranzakció, amelyet a Matter Labs készített a saját zkEVM-jével alátámasztva._

- **[Starknet](https://starkware.co/starknet/)** - _A StarkNet egy EVM-kompatibilis L2 skálázási megoldás, amelyet a StarkWare készített._

- **[Morph](https://www.morphl2.io/)** - _Morph egy olyan hibrid összevont tranzakció skálázási megoldás, mely zk-bizonyítékot használ, hogy kezelje az L2-höz kapcsolódó státuszmegkérdőjelezés problémáját._

## További olvasnivaló a ZK összevont tranzakciókról {#further-reading-on-zk-rollups}

- [Mik azok a zero-knowledge összevont tranzakciók?](https://coinmarketcap.com/alexandria/glossary/zero-knowledge-rollups)
- [Mik azok a zero-knowledge összevont tranzakciók?](https://alchemy.com/blog/zero-knowledge-rollups)
- [A STARK-ok és a SNARK-ok összehasonlítása](https://consensys.net/blog/blockchain-explained/zero-knowledge-proofs-starks-vs-snarks/)
- [Mi az a zkEVM?](https://www.alchemy.com/overviews/zkevm)
- [ZK-EVM típusok: Ethereum-egyenértékű, EVM-egyenértékű, 1. típus, 4. típus és egyéb rejtélyes kifejezések](https://taiko.mirror.xyz/j6KgY8zbGTlTnHRFGW6ZLVPuT0IV0_KmgowgStpA0K4)
- [Bevezetés a zkEVM-be](https://hackmd.io/@yezhang/S1_KMMbGt)
- [Awesome-zkEVM dokumentációk](https://github.com/LuozhuZhang/awesome-zkevm)
- [A ZK-SNARK-ok működése](https://vitalik.eth.limo/general/2017/02/01/zk_snarks.html)
- [Hogyan lehetséges a SNARK?](https://vitalik.eth.limo/general/2021/01/26/snarks.html)
