---
title: Optimista összevont tranzakciók
description: Bevezetés az optimista összevont tranzakciókba – az Ethereum közösség által használt skálázási megoldásba.
lang: hu
---

Az optimista összevont tranzakciók olyan L2 protokollok, amelyeket az Ethereum alapréteg tranzakcióátvitelének növelésére terveztek. A tranzakciók láncon kívüli feldolgozásával csökkentik a számításokat a fő Ethereum-láncon, ami jelentősen javítja a feldolgozási sebességet. A [mellékláncokhoz](/developers/docs/scaling/sidechains/) képest az optimistaz összevont tranzakciók a főhálózat biztonságát a tranzakciós eredmények láncon belüli közzétételével nyerik, a [plazmaláncokkal összevetve](/developers/docs/scaling/plasma/) ugyanúgy az Ethereumon ellenőrzik a tranzakciókat csalási bizonyítékokkal, de azok a tranzakciós adatokat máshol tárolják.

Mivel a számítás az Ethereum használatának lassú és drága része, az optimista összevont tranzakciók akár 10-100-szoros javulást is kínálnak a méretezhetőségben. Az optimista összevont tranzakciók a tranzakciókat is `calldata` mezőként vagy a [blobokba](/roadmap/danksharding/) írják az Ethereumba, csökkentve a felhasználók gázköltségeit.

## Előfeltételek {#prerequisites}

Érdemes áttekinteni az [Ethereum skálázásról](/developers/docs/scaling/) és [L2 megoldásokról](/layer-2/) szóló oldalakat.

## Mi az az optimista összevont tranzakció? {#what-is-an-optimistic-rollup}

Az optimista összevont tranzakció az Ethereum skálázásának olyan megközelítése, amely a számítást és a státusztárolást láncon kívül végzi. Az optimista összevont tranzakciók a tranzakciókat az Ethereumon kívül hajtják végre, de a tranzakciós adatokat `calldata` mezőként vagy [blobokban](/roadmap/danksharding/) a főhálózatra küldik.

Az optimista összevont tranzakciók operátorai több láncon kívüli tranzakciót kötegelnek össze nagy tételekben, mielőtt elküldik az Ethereumnak. Ez a megközelítés lehetővé teszi a fix költségek elosztását a kötegek tranzakcióira, csökkentve ezzel a végfelhasználók díjait. Az optimista összevont tranzakciók tömörítési technikákat is alkalmaznak, hogy csökkentsék az Ethereumban közzétett adatok mennyiségét.

Az optimista összevont tranzakciók azért számítanak optimistának, mert feltételezik, hogy a láncon kívüli tranzakciók érvényesek, és nem tesznek közzé érvényességi bizonyítékokat a láncon közzétett tranzakciókötegekről. Ez a különbség az optimista és a [zero-knowledge összevont tranzakciók](/developers/docs/scaling/zk-rollups) között, mivel utóbbiak kriptográfiai [érvényességi bizonyítékokat](/glossary/#validity-proof) tesznek közzé a láncokon kívüli tranzakciókról.

Az optimista összevont tranzakciók ehelyett egy csalásbizonyító rendszerre támaszkodnak, hogy felderítsék azokat az eseteket, amikor a tranzakciókat nem megfelelően számítják ki. Miután egy összevonttranzakció-köteget benyújtottak az Ethereumra, egy adott „megkérdőjelezési” időszakon belül bárki megtámadhatja az összevont tranzakció eredményét egy [csalási bizonyíték](/glossary/#fraud-proof) kiszámításával.

Ha a csalási bizonyíték sikeres, az összevonttranzakció-protokoll újra végrehajtja a tranzakció(ka)t, és ennek megfelelően frissíti az összevont tranzakció státuszát. A sikeres csalási bizonyíték másik hatása az, hogy a hibásan végrehajtott tranzakció blokkba való felvételéért felelős szekvencer büntetést kap.

Ha az összevonttranzakció-köteg a megkérdőjelezési időszak letelte után is kifogástalan marad (minden tranzakciót helyesen hajtottak végre), akkor azt érvényesnek és elfogadottnak tekintik az Ethereumon. Lehetséges egy meg nem erősített összevonttranzakció-blokkra építeni, de fontos tudni: a tranzakció eredményei megfordulnak, ha egy korábban közzétett, hibásan végrehajtott tranzakción alapulnak.

## Hogyan működnek együtt az optimista összevont tranzakciók az Ethereummal? {#optimistic-rollups-and-Ethereum}

Az optimista összevont tranzakciók [láncon kívüli skálázási megoldások](/developers/docs/scaling/#off-chain-scaling), amelyek az Ethereumra épülve működnek. Minden egyes optimista összevont tranzakció-ot az Ethereum-hálózaton telepített okosszerződések egy csoportja kezel. Az optimista összevont tranzakciók a tranzakciókat a fő Ethereum-láncon kívül dolgozzák fel, majd ezeket kötegekben egy láncon belüli összevont tranzakciós szerződésbe írják. Az Ethereum blokkláncához hasonlóan ez a tranzakciós rekord is megváltoztathatatlan, és az „optimista összevont tranzakció láncát” alkotja.

Az optimista összevont tranzakció architektúrája a következő részekből áll:

**Láncon lévő szerződések**: Az optimista összevont tranzakciók működését az Ethereumon futó okosszerződések irányítják. Ide olyan szerződések tartoznak, melyek tárolják az összevonttranzakció-blokkokat, követik a státuszfrissítéseket és a felhasználói befizetéseket. Így az Ethereum az optimista összevont tranzakció alaprétegeként vagy L1-ként szolgál.

**Láncon kívüli virtuális gép (VM)**: Bár az optimista összevont tranzakciós protokollt kezelő szerződések az Ethereumon futnak, az összevont tranzakciós protokoll a számításokat és a státusztárolást egy másik virtuális gépen végzi, amely elkülönül az [Ethereum virtuális géptől](/developers/docs/evm/). A láncon kívüli VM az, ahol az alkalmazások élnek és a státuszváltozások végrehajtásra kerülnek; ez az optimista összevont tranzakció felső vagy második rétege (L2).

Mivel az optimista összevont tranzakcióokat az EVM számára írt vagy lefordított programok futtatására tervezték, a láncon kívüli VM számos EVM tervezési specifikációt tartalmaz. Ezenkívül a láncban kiszámított csalási bizonyítékok lehetővé teszik az Ethereum-hálózat számára, hogy érvényre juttassa a láncon kívüli VM-ben kiszámított státuszváltozások érvényességét.

Az optimista összevont tranzakciókat hibrid skálázási megoldásoknak nevezik, mert bár különálló protokollként léteznek, biztonsági tulajdonságaik az Ethereumból származnak. Az Ethereum többek között garantálja az összevont tranzakció láncon kívüli számítás helyességét és a számítás mögötti adatok elérhetőségét. Ezáltal az optimista összevont tranzakciók biztonságosabbak, mint a tisztán láncon kívüli skálázási protokollok (pl. [mellékláncok](/developers/docs/scaling/sidechains/)), amelyek nem támaszkodnak az Ethereum biztonságára.

Az optimista összevont tranzakciók az Ethereum fő protokolljára támaszkodnak a következőkben:

### Adatelérhetőség {#data-availability}

Az optimista összevont tranzakciók a tranzakciós adatokat `calldata` mezőként vagy [blobokban](/roadmap/danksharding/) küldik az Ethereumba. Mivel az összevont tranzakció-lánc végrehajtása a benyújtott tranzakciókon alapul, bárki felhasználhatja ezt az Ethereum alaprétegén tárolt információt az összevont tranzakció státuszának végrehajtásához és a státuszváltozások helyességének ellenőrzéséhez.

[Az adatelérhetőség](/developers/docs/data-availability/) kritikus fontosságú, mivel a státuszadatokhoz való hozzáférés nélkül azok, akik megkérdőjelezik az eredményt, nem tudnak csalási bizonyítékokat konstruálni az érvénytelen összevont tranzakciós műveletek vitatására. Mivel az Ethereum biztosítja az adatelérhetőséget, csökken annak kockázata, hogy az összevont tranzakció operátorai rosszindulatú cselekményeket követnek el (pl. érvénytelen blokkok beküldése).

### Cenzúraálló kialakítás {#censorship-resistance}

Az optimista összevont tranzakciók szintén az Ethereumra támaszkodnak a cenzúrának való ellenállás tekintetében. Egy optimista összevont tranzakció esetében egy centralizált entitás (az operátor) felelős a tranzakciók feldolgozásáért és az összevonttranzakció-blokkok Ethereumba való beküldéséért. Ennek van néhány következménye:

- az összevont tranzakció operátorai cenzúrázhatják a felhasználókat azáltal, hogy teljesen offline állapotba kerülnek, vagy megtagadják az olyan blokkok előállítását, amelyek bizonyos tranzakciókat tartalmaznak.

- az összevont tranzakció-operátorai megakadályozhatják, hogy a felhasználók az összevont tranzakciós szerződésben elhelyezett pénzeszközöket kivegyék, azáltal, hogy visszatartják a tulajdonlás Merkle-bizonyítékához szükséges státuszadatokat. A státuszadatok visszatartása az összevont tranzakció státuszát is elrejtheti a felhasználók elől, és megakadályozhatja őket abban, hogy interakcióba lépjenek vele.

Az optimista összevont tranzakciók úgy oldják meg ezt a problémát, hogy az operátorokat arra kényszerítik, hogy az státuszfrissítésekhez kapcsolódó adatokat közzétegyék az Ethereumon. az összevont tranzakciós adatok láncon történő közzététele a következő előnyökkel jár:

- Ha egy optimista összevont tranzakció operátora nem elérhető vagy leállítja a tranzakciós kötegek előállítását, egy másik csomópont a rendelkezésre álló adatok segítségével reprodukálhatja az összevont tranzakció utolsó státuszát, és folytathatja a blokkok előállítását.

- A felhasználók a tranzakciós adatok segítségével Merkle-bizonyítékokat hozhatnak létre, amelyek igazolják a pénzeszközök tulajdonjogát, és kivehetik eszközeiket az összevont tranzakcióból.

- A felhasználók a szekvenszer helyett az L1-en is benyújthatják tranzakcióikat, ebben az esetben a szekvenszernek egy bizonyos időn belül be kell vonnia a tranzakciót, hogy továbbra is érvényes blokkokat tudjon előállítani.

### Elszámolás {#settlement}

Egy másik szerep, amelyet az Ethereum az optimista összevont tranzakciókkal összefüggésben játszik, az elszámolási réteg szerepe. Az elszámolási réteg lehorgonyozza az egész blokklánc-ökoszisztémát, biztonságot teremt, és objektív véglegességet biztosít, ha egy másik láncon (ebben az esetben optimista összevont tranzakción) olyan vita merül fel, amely egyeztetést igényel.

Az Ethereum főhálózat egy középpontot biztosít az optimista összevont tranzakciók számára a csalási bizonyítékok ellenőrzéséhez és a viták rendezéséhez. Ráadásul az összevont tranzakción végrehajtott tranzakciók csak _azután_ lesznek véglegesek, hogy az összevonttranzakció-blokkot az Ethereum elfogadta. Ha egy összevont tranzakciót egyszer már elkötelezettnek vettek az Ethereum alaprétegén, azt nem lehet visszavonni (kivéve a lánc átszervezésének igen valószínűtlen esetét).

## Hogyan működnek az optimista összevont tranzakciók? {#how-optimistic-rollups-work}

### Tranzakcióvégrehajtás és aggregáció {#transaction-execution-and-aggregation}

A felhasználók tranzakciókat nyújtanak be az operátoroknak, amelyek az optimista összevont tranzakció tranzakcióinak végrehajtását végző csomópontok (node). Az operátor, akit validátornak vagy aggregátornak is nevezhetünk, összesíti a tranzakciókat, tömöríti a mögöttes adatokat, és közzéteszi a blokkot az Ethereumon.

Habár bárki lehet validátor, az optimista összevont tranzakció validátoroknak kötelezvényt kell adniuk, mielőtt blokkokat állítanak elő, hasonlóan a [letétbe helyezési (proof-of-stake) rendszerhez](/developers/docs/consensus-mechanisms/pos/). Ez a kötelezvény csökkenthető vagy elvehető, ha a validátor érvénytelen blokkot tesz közzé, vagy egy régi, de érvénytelen blokkra épít (még ha a blokkja érvényes is). Az optimista összevont tranzakciók kriptogazdasági ösztönzőket alkalmaznak annak biztosítására, hogy a validátorok becsületesen járjanak el.

Az optimista összevonttranzakció-lánc többi validátorának a benyújtott tranzakciókat az összevont tranzakció státusza másolatának felhasználásával kell végrehajtaniuk. Ha a validátor végső státusza eltér az operátor által javasolt állapottól, akkor megkérdőjelezheti azt, és kikalkulálhatja a csalási bizonyítékot.

Bizonyos optimista összevont tranzakciók egy szekvenszert használnak a lánc végrehajtásához, és nem egy engedélymentes validáló rendszert. A szekvenszer a validátorhoz hasonlóan feldolgozza a tranzakciókat, összevonttranzakció-blokkokat hoz létre, és az összevont tranzakciókat az L1 láncba (Ethereum) küldi.

A szekvencer különbözik a hagyományos rollup-operátortól, mert nagyobb befolyása van a tranzakciók sorrendjére. Emellett a szekvenszer elsőbbségi hozzáféréssel rendelkezik az összevonttranzakció-lánchoz, és ő az egyetlen olyan entitás, amely jogosult tranzakciókat benyújtani a láncon belüli szerződéshez. A nem szekvenszer csomópontoktól vagy a felhasználóktól származó tranzakciók egy külön tárolóban várakoznak, amíg a szekvenszer be nem illeszti azokat egy új kötegbe.

#### Összevonttranzakció-blokkok beküldése az Ethereumra {#submitting-blocks-to-ethereum}

Az optimista összevont tranzakció operátora a láncon kívüli tranzakciókat egy kötegbe gyűjti, és elküldi az Ethereumnak hitelesítésre. Ez a folyamat magában foglalja a tranzakciókkal kapcsolatos adatok tömörítését és közzétételét az Ethereumban `calldata` mezőként vagy blobokban.

A `calldata` az okosszerződésben egy nem módosítható, nem állandó terület, amely a [memóriához](/developers/docs/smart-contracts/anatomy/#memory) hasonlóan viselkedik. A `calldata` a blokklánc [historikus naplóinak](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html?highlight=memory#logs) részeként fennmarad a láncban, de az Ethereum státusz részeként nem tárolódik. Mivel a `calldata` nem érinti az Ethereum státuszát, ezért olcsóbb, mintha az adatokat a láncban kellene tárolni.

A `calldata` kulcsszót a Solidityben arra is használják, hogy végrehajtáskor argumentumokat adjanak át egy okosszerződés-függvénynek. A `calldata` azonosítja a tranzakció során meghívott függvényt, és a függvény bemeneteit egy tetszőleges bájtsorozat formájában tartalmazza.

Az optimista összevont tranzakciók a `calldata`-t arra használják, hogy a tömörített tranzakciós adatokat a láncon belüli szerződéshez küldik. az összevont tranzakció operátora úgy ad be új köteget, hogy az összevont tranzakciós szerződésben szereplő függvényt meghívja és a tömörített adatokat függvényargumentumként átadja. A `calldata` használata csökkenti a felhasználói díjakat, mivel az összevont tranzakciók legtöbb költsége az adatok láncban történő tárolásából származik.

Itt megtekinthet egy [példát](https://etherscan.io/tx/0x9102bfce17c58b5fc1c974c24b6bb7a924fb5fbd7c4cd2f675911c27422a5591) egy összevonttranzakció-köteg benyújtására, mely bemutatja a koncepció működését. A szekvenszer meghívta a `appendSequencerBatch()` metódust, és a tömörített tranzakciós adatokat a `calldata` segítségével adta át bemenetként.

Néhány összevont tranzakció blobot használ, hogy a tranzakciókötegeket az Ethereumon letárolja.

A blobok nem módosíthatók és nem állandóak (ahogy a `calldata` is), de kb. 18 nap múlva levágják azokat az előzményadatokról. A blobokkal kapcsolatos további információkért tekintse meg [Danksharding](/roadmap/danksharding) oldalt.

### Státuszrögzítések {#state-commitments}

Az optimista összevont tranzakció státusza (számlák, egyenlegek, szerződéskódok stb.) egy [Merkle-fa](/whitepaper/#merkle-trees) vagy státuszfa formájába szerveződik. Ennek a Merkle-fának a gyökerét (státuszgyökér), amely az összevont tranzakció legutóbbi státuszát mutatja, az összevont tranzakciós szerződés hash-eli és tárolja. A láncon minden státuszváltozás egy új összevonttranzakció-státuszt hoz létre, amelyet az operátor egy új státuszgyökér kiszámításával rögzít.

Az operátornak a kötegek beküldésekor be kell nyújtania a régi és az új státuszgyökereket. Ha a régi státuszgyökér megegyezik a láncon lévő szerződésben lévő státuszgyökérrel, az utóbbit elvetik, és az új státuszgyökérrel helyettesítik.

az összevont tranzakció operátorának a tranzakcióköteg Merkle-gyökerét is rögzítenie kell. Ez lehetővé teszi, hogy bárki bizonyítsa egy tranzakciónak a kötegbe való felvételét (L1-en) egy [Merkle-bizonyíték](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) bemutatásával.

Egy optimista összevont tranzakcióban a státuszelköteleződések, különösen a státuszgyökerek szükségesek a státuszváltozások helyességének bizonyításához. az összevont tranzakciós szerződés azonnal elfogadja az új státuszgyökereket az operátoroktól, de később törölheti az érvényteleneket, hogy visszaállítsa az összevont tranzakció helyes állapotát.

### Csalásbizonyítás {#fraud-proving}

Az optimista összevont tranzakciók lehetővé teszik bárki számára, hogy blokkokat tegyen közzé az érvényesség igazolása nélkül. Annak érdekében azonban, hogy a lánc biztonságos maradjon, az optimista összevont tranzakciók meghatároznak egy időablakot, amely alatt bárki vitathatja a státuszváltozást. Ezért az összevonttranzakció-blokkokat „állításoknak” nevezik, mivel bárki vitathatja érvényességüket.

Ha valaki vitatja az állítást, akkor az összevonttranzakció-protokoll elindítja a csalási bizonyíték kiszámítását. A csalási bizonyíték interaktív, valaki közzétesz egy állítást, majd egy másik személy megkérdőjelezi azt. A bizonyítéktípusok eltérhetnek abban, hogy hány körös interakcióra van szükség a csalási bizonyíték kiszámításához.

Az egykörös interaktív bizonyítási rendszerek újra lejátsszák a vitatott tranzakciókat az L1-en az érvénytelen állítások felderítésére. az összevonttranzakció-protokoll a vitatott tranzakció újbóli végrehajtását versenyezteti az L1-en (Ethereum) egy hitelesítőszerződés segítségével, és a kiszámított státuszgyökér határozza meg, hogy ki nyeri a kihívást. Ha a kihívónak az összevont tranzakció helyes státuszára vonatkozó állítása helytálló, az operátort megbüntetik a kötelezvényének csökkentésével.

A csalás felderítése érdekében a tranzakciók újbóli végrehajtása az L1-en megköveteli az egyes tranzakciók státuszelköteleződéseinek közzétételét, és növeli a láncban közzéteendő adatok számát. A tranzakciók újrajátszása jelentős gázköltségekkel is jár. Ezen okok miatt az optimista összevont tranzakciók áttérnek a többkörös interaktív bizonyításra, amely az érvénytelen összevonttranzakció-műveletek felderítését hatékonyabban éri el.

#### Többkörös interaktív bizonyítás {#multi-round-interactive-proving}

A többfordulós interaktív bizonyítás magában foglal egy oda-vissza kommunikáló protokollt az állító és a kihívó között, amelyet egy L1 hitelesítőszerződés felügyel, és amely végül eldönti, hogy kinek az állítása helytelen. Miután egy L2 csomópont megtámad egy állítást, az állítónak két egyenlő részre kell osztania a vitatott állítást. Ekkor minden állítás ugyanannyi számítási lépést tartalmaz, mint a többi.

A kihívó ezután kiválasztja, hogy melyik állítást kívánja megtámadni. A felosztási folyamat, vagyis a kettéosztó protokoll addig folytatódik, amíg mindkét fél nem vitatja a végrehajtás _adott_ lépéséről szóló állítást. Ezen a ponton az L1 szerződés megoldja a vitát azzal, hogy kiértékeli az utasítást (és annak eredményét), hogy elkapja a vétkes felet.

Az állítónak „egylépéses bizonyítékot” kell benyújtania, amely igazolja a vitatott lépés számításának érvényességét. Ha az állító nem tudja megadni az egylépéses bizonyítékot, vagy az L1-ellenőrző érvénytelennek ítéli azt, akkor elveszíti a kihívást.

Néhány megjegyzés az ilyen típusú csalási bizonyítékról:

1. A többfordulós interaktív csalási bizonyíték azért hatékony, mert minimálisra csökkenti az L1-lánc által a viták eldöntése során elvégzendő munkát. A teljes tranzakció újrajátszása helyett az L1-nek csak egy lépést kell elvégeznie az összevont tranzakció végrehajtásában.

2. A kettéosztó protokollok csökkentik a láncban közzétett adatok mennyiségét (nem kell minden tranzakcióhoz státuszváltozást közzétenni). Az optimista összevont tranzakciókat nem korlátozza az Ethereum gázlimitje. Ehhez képest a tranzakciókat újra végrehajtó optimista összevont tranzakcióoknak meg kell győződniük arról, hogy egy L2 tranzakció alacsonyabb gázlimittel rendelkezik, hogy versenyeztetni tudják annak végrehajtását egy Ethereum tranzakción belül.

3. A rosszhiszemű állító kötelezvényének egy részét a kihívó kapja, míg a másik részét elégetik. Az égetés megakadályozza a validátorok közötti összejátszást; ha két validátor összejátszik, hogy hamis kihívásokat kezdeményezzen, akkor is elveszítik a letét jelentős részét.

4. A többfordulós interaktív bizonyítás megköveteli, hogy az állító és a kihívó a megadott időkereten belül lépéseket tegyen. Aki a határidő lejárta előtt nem cselekszik, az elveszíti a kihívást.

#### Miért fontosak a csalási bizonyítékok az optimista összevont tranzakcióknál {#fraud-proof-benefits}

A csalási bizonyítékok azért fontosak, mert megkönnyítik a _bizalomigény-mentes véglegességet_ az optimista összevont tranzakcióknál. A bizalomigény-mentes véglegesség az optimista összevont tranzakciók olyan tulajdonsága, amely garantálja, hogy egy tranzakció – amennyiben érvényes – végül visszaigazolásra kerül.

A rosszhiszemű csomópontok hamis megkérdőjelezésekkel megpróbálhatják késleltetni egy érvényes rollup-blokk megerősítését. A csalási bizonyítékok azonban végül igazolni fogják az összevonttranzakció-blokk érvényességét, és megerősítik azt.

Ez kapcsolódik az optimista összevont tranzakciók egy másik biztonsági tulajdonságához is: a lánc érvényessége azon múlik, hogy legyen (legalább) _egy_ jóhiszemű csomópont. A jóhiszemű csomópont a láncot megfelelően tovább tudja vinni azáltal, hogy érvényes állításokat tesz közzé, vagy vitatja az érvénytelen állításokat. Bárhogy is legyen, a jóhiszemű csomópontokkal vitába szálló rosszhiszemű csomópontok a csalási bizonyíték előállítása során elveszítik letétjeiket.

### L1/L2 interoperabilitás {#l1-l2-interoperability}

Az optimista összevont tranzakciókat az Ethereum főhálózattal való interoperabilitásra tervezték, és ezáltal a felhasználók üzeneteket és tetszőleges adatokat továbbíthatnak L1 és L2 között. Az EVM-mel is kompatibilisek, így a meglévő [alkalmazásokat](/developers/docs/dapps/) át lehet vinni az optimista összevont tranzakciókra, vagy új dappokat lehet létrehozni az Ethereum fejlesztői eszközeivel.

#### 1. Eszközmozgás {#asset-movement}

##### Belépés az összevont tranzakció-ba

Egy optimista összevont tranzakció használatához a felhasználók ETH-t, ERC-20 tokeneket és más elfogadott eszközöket helyeznek el az összevont tranzakció [hídjának](/developers/docs/bridges/) szerződésében az L1-en. A hídszerződés továbbítja a tranzakciót az L2-hez, ahol a tranzakcióval megegyező mennyiségű eszközt bocsátanak ki és küldenek a felhasználó által az optimista összevont tranzakción kiválasztott címre.

A felhasználó által generált tranzakciók (mint például egy L1 > L2 befizetés) bekerülnek a sorba, majd a szekvenszer elküldi azokat az összevont tranzakciós szerződésnek. A cenzúrával szembeni ellenállás megőrzése érdekében azonban az optimista összevont tranzakciók lehetővé teszik a felhasználók számára, hogy közvetlenül a láncon belüli összevont tranzakciós szerződéshez nyújtsanak be egy tranzakciót, ha az egy bizonyos ideig nem kerül feldolgozásra.

Egyes optimista összevont tranzakciók egyszerűbb megközelítést alkalmaznak annak megakadályozására, hogy a szekvenszerek cenzúrázzák a felhasználókat. Ekkor egy blokkot az L1 szerződéshez az előző blokk óta benyújtott összes tranzakció (pl. befizetések) határoz meg, az összevonttranzakció-láncban feldolgozott tranzakciókon kívül. Ha egy szekvenszer figyelmen kívül hagy egy L1 tranzakciót, akkor (bizonyíthatóan) rossz státuszgyökeret fog közzétenni; ezért a szekvenszerek nem késleltethetik a felhasználó által generált üzeneteket, miután azokat az L1-en közzétették.

##### Kilépés az összevont tranzakcióból

Az optimista összevont tranzakcióból az Ethereumra való visszavétel a csalást bizonyító rendszer miatt nehezebb. Ha egy felhasználó L2 > L1 tranzakciót kezdeményez az L1-en letétbe helyezett pénzeszközök kivonására, akkor meg kell várnia, amíg a megkérdőjelezési időszak – amely nagyjából hét napig tart – letelik. Mindazonáltal maga a visszavonási folyamat egyszerű.

Miután a kifizetési kérelmet az L2 összevont tranzakción kezdeményezték, a tranzakció bekerül a következő kötegbe, miközben a felhasználó összevont tranzakción lévő eszközei elégetésre kerülnek. Miután a köteget közzétették az Ethereumon, a felhasználó kiszámíthatja a Merkle-bizonyítékot, amely igazolja, hogy a kilépési tranzakciója bekerült a blokkba. Ezután csak ki kell várni a késleltetési időszakot, hogy véglegesedjen a tranzakció az L1-en, és kivehesse a pénzt a főhálózatra.

Annak érdekében, hogy ne kelljen egy hetet várni az Ethereumba történő pénzkivonás előtt, az optimista összevont tranzakció felhasználói alkalmazhatnak egy **likviditási szolgáltatót** (LP). A likviditásszolgáltató átveszi a függőben lévő L2 kivonás tulajdonjogát, és fizet a felhasználónak az L1-en (díj ellenében).

A likviditásszolgáltatók a pénzeszközök felszabadítása előtt ellenőrizhetik a felhasználó kifizetési kérelmének érvényességét (végrehajtják a láncot). Így biztosítékot kapnak arra, hogy a tranzakciót végül meg fogják erősíteni (a bizalomigény-mentes véglegesség miatt).

#### 2. EVM-kompatibilitás {#evm-compatibility}

A fejlesztők számára az optimista összevont tranzakciók előnye az, hogy kompatibilisek – vagy még jobb, hogyha egyenértékűek – a [Ethereum virtuális géppel (EVM)](/developers/docs/evm/). Az EVM-kompatibilis összevont tranzakciók megfelelnek az [Ethereum sárgakönyv](https://ethereum.github.io/yellowpaper/paper.pdf) specifikációinak, és bytecode szinten támogatják az EVM-et.

Az EVM-kompatibilitás az optimista összevont tranzakcióknál a következő előnyökkel jár:

i. A fejlesztők az Ethereumon meglévő okosszerződéseket optimista összevont tranzakció-láncokra migrálhatják anélkül, hogy a kódbázisokat nagy mértékben módosítaniuk kellene. Ez időt takaríthat meg a fejlesztőcsapatoknak az Ethereum okosszerződések L2-re történő telepítésekor.

ii. Az optimista összevont tranzakciókat használó fejlesztők és projektcsapatok kihasználhatják az Ethereum infrastruktúrájának előnyeit. Ide tartoznak a programozási nyelvek, kódkönyvtárak, tesztelési eszközök, kliensszoftverek, telepítési infrastruktúra stb.

A meglévő eszközök használata azért fontos, mert ezeket az évek során alaposan ellenőrizték és kijavították a hibáikat. Emellett az Ethereum fejlesztőknek nem kell megtanulniuk, hogyan kell egy teljesen új fejlesztői stackkel programot fejleszteni.

#### 3. Láncok közötti szerződésmeghívások {#cross-chain-contract-calls}

A felhasználók (külső tulajdonú számlák) úgy lépnek kapcsolatba az L2 szerződésekkel, hogy tranzakciót küldenek az összevont tranzakció-szerződésnek, vagy ugyanezt egy szekvenszerrel vagy validátorral végeztetik el. Az optimista összevont tranzakciók azt is lehetővé teszik, hogy az Ethereumon lévő szerződéses számlák interakcióba lépjenek az L2 szerződésekkel az L1 és L2 közötti üzenetek és adatok továbbítására szolgáló hídszerződések révén. Ez azt jelenti, hogy az Ethereum főhálózaton lévő (L1) szerződést úgy lehet programozni, hogy az L2 optimista összevont tranzakción lévő szerződésekhez tartozó funkciókat hívjon meg.

A láncközi szerződéses hívások aszinkron módon történnek, vagyis a hívást először kezdeményezik, majd egy későbbi időpontban hajtják végre. Ez eltér az Ethereumon történő, két szerződés közötti hívásoktól, mivel annak azonnali eredménye van.

A láncközi szerződéskötésre példa a korábban ismertetett token-letétbehelyezés. Az L1-en lévő szerződés letétbe helyezi a felhasználó tokenjeit, és üzenetet küld az L2 szerződésnek, hogy bocsásson ki ugyanannyi tokent az összevont tranzakción.

Mivel a láncközi üzenethívások szerződésvégrehajtást eredményeznek, a feladónak fedeznie kell a számítás [gázköltségeit](/developers/docs/gas/). Ehhez célszerű magas gázhatárt beállítani, hogy elkerülje a tranzakció meghiúsulását a célláncon. A tokenek híddal való mozgatása jó példa erre, mert ha a tranzakció L1 oldala (a tokenek letétbe helyezése) működik, de az L2 oldal (új tokenek kibocsátása) az alacsony gázmennyiség miatt meghiúsul, a letét behajthatatlanná válik.

Végül fontos tudni, hogy a szerződések közötti L2 > L1 üzenethívások néhány perc elteltével kerülnek végrehajtásra. Ennek az az oka, hogy az optimista összevont tranzakcióból a főhálózatra küldött üzeneteket nem lehet végrehajtani, amíg a megkérdőjelezési időszak le nem jár.

## Hogyan működnek az optimista összevont tranzakciós díjak? {#how-do-optimistic-rollup-fees-work}

Az optimista összevont tranzakciók az Ethereumhoz hasonlóan gázdíjrendszert használnak annak jelölésére, hogy a felhasználók mennyit fizetnek tranzakciónként. Az optimista összevont tranzakciók után felszámított díjak a következő összetevőktől függenek:

1. **Státuszrögzítés**: Az optimista összevont tranzakciók a tranzakciós adatokat és a blokkfejléceket (amelyek az előző blokkfejléc hash-éből, a státuszgyökérből és a köteggyökérből állnak) `blobként` vagy egy „binárisan nagy objektumként” teszik közzé az Ethereumon. [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844) bevezetett egy költséghatékony megoldást az adat láncon belüli tárolására. A `blob` egy új tranzakciós mező, mellyel az összevont tranzakciók képesek tömörített státuszváltozást rögzíteni az Ethereumon (L1). A `calldata` mezőhöz képest, mely állandóan elérhető a láncon, a blobok rövid életűek és levághatók a kliensekről [4096 korszak után](https://github.com/ethereum/consensus-specs/blob/81f3ea8322aff6b9fb15132d050f8f98b16bdba4/configs/mainnet.yaml#L147) (kb.18 nappal később). A blobok használatával, melyekbe a tömörített tranzakciós adatok kötegeit teszik, az optimista összevont tranzakciók jelentősen csökkentették annak költségét, hogy a tranzakciók bekerüljenek az L1-re.

2. A **Blob gázhasználata**: a blobot igénylő tranzakciók egy dinamikus díjmechanizmust használnak, amely hasonlít az [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) által bevezetetthez. A 3-as típusú tranzakciók gázdíja egy alap blobdíjjal számol, melyet a hálózat határoz meg a blobhelyre való kereslet és a küldött tranzakció blobhely használata alapján.

3. **L2 operátordíjak**: Ezt az összevonttranzakció-csomópontnak fizetik a tranzakciók feldolgozása során felmerülő számítási költségek ellentételezéseként, hasonlóan az Ethereum gázdíjaihoz. az összevonttranzakció-csomópontok alacsonyabb tranzakciós díjakat számítanak fel, mivel az L2-k nagyobb feldolgozási kapacitással rendelkeznek, és nincsenek olyan hálózati torlódásaik, amelyek miatt az Ethereum validálói magasabb díjú tranzakciókat részesítenek előnyben.

Az optimista összevont tranzakciók számos mechanizmust alkalmaznak a felhasználói díjak csökkentésére, beleértve a tranzakciók kötegelését és a `calldata` tömörítését az adatpublikálási költségek csökkentése érdekében. Az [L2 díjkövető](https://l2fees.info/) oldalon valós idejű áttekintést kaphat arról, hogy mennyibe kerül az Ethereum-alapú optimista összevont tranzakciók használata.

## Hogyan skálázzák az optimista összevont tranzakciók az Ethereumot? {#scaling-ethereum-with-optimistic-rollups}

Az optimista összevont tranzakciók az adatelérhetőség biztosítása érdekében tömörített tranzakciós adatokat tesznek közzé az Ethereumban. A láncban közzétett adatok tömörítésének képessége alapvető fontosságú ahhoz, hogy az Ethereumon skálázni lehessen a tranzakcióátvitelt az optimista összevont tranzakciókkal.

Az Ethereum korlátozza, hogy mennyi adatot tartalmazhatnak a blokkok, gázegységekben kifejezve (az [átlagos blokkméret](/developers/docs/blocks/#block-size) 15 millió gáz). Bár ez korlátozza, hogy az egyes tranzakciók mennyi gázt használhatnak fel, azt is jelenti, hogy a tranzakciókhoz kapcsolódó adatok csökkentésével növelhetjük a blokkonként feldolgozott tranzakciók számát, ami közvetlenül javítja a skálázhatóságot.

Az optimista összevont tranzakciók többféle technikát használnak a tranzakciós adatok tömörítésének elérésére és a másodpercenkénti tranzakciószám (TPS) javítására. Ez a [cikk](https://vitalik.eth.limo/general/2021/01/05/rollup.html) például összehasonlítja, hogy egy egyszerű felhasználói tranzakció (ether küldése) mennyi adatot generál a főhálózaton és az összevont tranzakció-on:

| Paraméter    | Ethereum (L1)             | Összevont tranzakció (L2) |
| ------------ | ------------------------- | ------------------------- |
| Nonce        | ~3                        | 0                         |
| Gázár        | ~8                        | 0–0,5                     |
| Gáz          | 3                         | 0–0,5                     |
| Címzett      | 21                        | 4                         |
| Érték        | 9                         | ~3                        |
| Aláírás      | ~68 (2 + 33 + 33)         | ~0,5                      |
| Küldő        | 0 (az aláírásból kinyeri) | 4                         |
| **Összesen** | **~112 bájt**             | **~12 bájt**              |

Néhány hozzávetőleges számítás ezekkel a számokkal segíthet megmutatni az optimista összevont tranzakció által biztosított skálázhatósági javulást:

1. Az egyes blokkok célmérete 15 millió gáz, és egy bájt adat ellenőrzése 16 gázba kerül. Ha az átlagos blokkméretet elosztjuk 16 gázzal (15 000 000/16), akkor az átlagos blokkba **937 500 bájtnyi adat fér**.
2. Ha egy alap összevont tranzakció 12 bájtot használ, akkor egy átlagos Ethereum-blokk **78 125 összevont tranzakciót** (937 5000/12) vagy **39 összevonttranzakció-köteget** tud feldolgozni (ha minden egyes köteg átlagosan 2000 tranzakciót tartalmaz).
3. Ha az Ethereumon 15 másodpercenként keletkezik egy új blokk, akkor az összevont tranzakció feldolgozási sebessége nagyjából **5208 tranzakciót jelent másodpercenként**. Ez úgy történik, hogy az egy Ethereum-blokkban tárolható alap összevont tranzakciók számát (**78 125**) elosztjuk az átlagos blokkidővel (**15 másodperc**).

Ez egy meglehetősen optimista becslés, tekintve, hogy az optimista összevont tranzakciók nem tudnak egy teljes blokkot alkotni az Ethereumon. Ugyanakkor nagyjából képet adhat arról, hogy az optimista összevont tranzakciók mekkora skálázhatósági nyereséget biztosíthatnak az Ethereum-felhasználóknak (a jelenlegi implementációk akár 2000 TPS-t is kínálnak).

Az [adat sharding](/roadmap/danksharding/) bevezetése az Ethereumban várhatóan javítja a skálázhatóságot az optimista összevont tranzakciók esetén. Mivel az összevont tranzakcióknak más, nem összevont tranzakciókkal kell megosztaniuk a blokkteret, feldolgozási kapacitásukat az Ethereum adatátviteli kapacitása korlátozza. A Danksharding növeli az L2 láncok számára rendelkezésre álló helyet az adatok blokkonkénti közzétételéhez, a drága, állandó `CALLDATA` helyett olcsóbb, nem állandó „blob” tárhelyet használva.

### Az optimista összevont tranzakciók előnyei és hátrányai {#optimistic-rollups-pros-and-cons}

| Előnyök                                                                                                                                                                                                                           | Hátrányok                                                                                                                                                                                      |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hatalmas javulást kínál a skálázhatóság terén a biztonság és a megbízhatóság csökkenése nélkül.                                                                                                                                   | A tranzakció véglegesítésének késedelme a lehetséges csalási kihívások miatt.                                                                                                                  |
| A tranzakciós adatokat az L1-en tárolják, ami javítja az átláthatóságot, a biztonságot, a cenzúrával szembeni ellenállást és a decentralizációt.                                                                                  | A centralizált összevonttranzakció-operátorok (szekvenszerek) befolyásolhatják a tranzakciók sorrendjét.                                                                                       |
| A csalási bizonyíték garantálja a bizalomigény-mentes véglegességet, és lehetővé teszi, hogy kevés jóhiszemű résztvevő is biztosítani tudja a láncot.                                                                             | Ha nincsenek jóhiszemű csomópontok, egy rosszhiszemű operátor ellophat pénzeszközöket érvénytelen blokkok és státuszelköteleződések közzétételével.                                            |
| A csalási bizonyítékok kiszámítása a hagyományos L2 csomópontok számára is elérhető, ellentétben az érvényességi bizonyításokkal (amelyeket a ZK összevont tranzakciókat használnak), amelyekhez speciális hardverre van szükség. | A biztonsági modellhez szükséges legalább egy jóhiszemű csomópont, amely összevont tranzakciókat hajt végre és csalási bizonyítékokat nyújt be az érvénytelen státuszváltozások megtámadására. |
| az összevont tranzakciók a „bizalomigény-mentes elérhetőség” előnyeit élvezik (bárki működésre kényszerítheti a láncot a tranzakciók végrehajtásával és az állítások elküldésével).                                               | A felhasználóknak meg kell várniuk az egyhetes kihívási időszak lejártát, mielőtt visszavennék a pénzüket az Ethereumba.                                                                       |
| Az optimista összevont tranzakciók jól megtervezett kriptogazdasági ösztönzőkre támaszkodnak a lánc biztonságának növelése érdekében.                                                                                             | A összevont tranzakcióknak minden tranzakciós adatot a láncban kell közzétenniük, ami növelheti a költségeket.                                                                                 |
| Az EVM-mel és a Solidityvel való kompatibilitás lehetővé teszi a fejlesztők számára, hogy Ethereum-natív okosszerződéseket telepítsenek a összevont tranzakciókba, vagy a meglévő eszközöket használják új dappok létrehozásához. |                                                                                                                                                                                                |

### Az optimista összevont tranzakciók vizuális bemutatása {#optimistic-video}

Ön inkább vizuális típus? Nézze meg a videót, melyben a Finematics elmagyarázza az optimista összevont tranzakciók lényegét:

<YouTube id="7pWxCklcNsU" start="263" />

## További információk az optimista összevont tranzakciókról

- [Hogyan működnek az optimista összevont tranzakciók (teljes útmutató)](https://www.alchemy.com/overviews/optimistic-rollups)
- [Mi az a blokklánc összevont tranzakció? Technikai bevezetés](https://www.ethereum-ecosystem.com/blog/what-is-a-blockchain-rollup-a-technical-introduction)
- [Az alapvető útmutató az Arbitrumhoz](https://newsletter.banklesshq.com/p/the-essential-guide-to-arbitrum)
- [Hogyan működik valójában az optimista összevont tranzakció?](https://www.paradigm.xyz/2021/01/how-does-optimisms-rollup-really-work)
- [Az OVM részletes bemutatása](https://medium.com/ethereum-optimism/ovm-deep-dive-a300d1085f52)
- [Mi az az optimista virtuális gép?](https://www.alchemy.com/overviews/optimistic-virtual-machine)
