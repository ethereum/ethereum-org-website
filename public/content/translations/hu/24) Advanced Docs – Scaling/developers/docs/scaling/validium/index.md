---
title: Validium
description: Bevezetés a validiumba, az Ethereum közössége által használt skálázási megoldásba.
lang: hu
sidebarDepth: 3
---

A validium egy [skálázási megoldás](/developers/docs/scaling/), amely érvényességi bizonylatok, például [ZK összevont tranzakciók](/developers/docs/scaling/zk-rollups/) segítségével érvényesíti a tranzakciók integritását, de nem tárolja a tranzakciós adatokat az Ethereum főhálózaton. Bár a láncon kívüli adatok elérhetősége kompromisszumokat eredményez, a skálázhatóság terén hatalmas javulást jelent (a validiumok másodpercenként [kb. 9000 tranzakciót vagy annál többet is képesek feldolgozni](https://blog.matter-labs.io/zkrollup-vs-validium-starkex-5614e38bc263)).

## Előfeltételek {#prerequisites}

Érdemes áttekinteni az [Ethereum skálázásról](/developers/docs/scaling/) és [L2 megoldásokról](/layer-2) szóló oldalakat.

## Mi az a validium? {#what-is-validium}

A validiumok olyan skálázási megoldások, amelyek az Ethereum főhálózaton kívüli adatelérhetőséget és számítást használnak, és láncon kívül dolgozzák fel a tranzakciókat, így javítva a tranzakcióátvitelt. A zero-knowledge összevont tranzakciókhoz hasonlóan a validiumok is [zero-knowledge bizonyítékokat](/glossary/#zk-proof) tesznek közzé az Ethereumon kívüli tranzakciók ellenőrzésére. Ez megakadályozza az érvénytelen státuszváltozásokat, és növeli a validiumlánc biztonsági garanciáit.

Ezek az érvényességi bizonyítékok ZK-SNARK (Zero-Knowledge Succinct Non-Interactive Argument of Knowledge, vagyis zero-knowledge tömörített nem interaktív érv ismeretre) vagy ZK-STARK (Zero-Knowledge Scalable Transparent Argument of Knowledge, vagyis zero-knowledge skálázható transzparens érv ismeretre) formájában érkezhetnek. Bővebben a [zero-knowledge bizonyítékokról](https://consensys.net/blog/blockchain-explained/zero-knowledge-proofs-starks-vs-snarks/).

A validium-felhasználók pénzeszközeit egy Ethereum-alapú okosszerződés ellenőrzi. A validiumok a ZK összevont tranzakciókhoz hasonlóan szinte azonnali kifizetéseket kínálnak; miután a főhálózat ellenőrizte a kifizetési kérelem érvényességi bizonyítékát, a felhasználók [Merkle-bizonyítékok](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) benyújtásával tudnak pénzt felvenni. A Merkle-bizonyíték igazolja, hogy a felhasználó kifizetési tranzakciója bekerült egy ellenőrzött tranzakciókötegbe, így a láncon belüli szerződés feldolgozhatja a kifizetést.

A validium felhasználók azonban befagyaszthatják pénzeszközeiket és korlátozhatják a pénzfelvételt. Ez akkor fordulhat elő, ha a validiumlánc adatelérhetőség-kezelői visszatartják a felhasználók elől a láncon kívüli állapotadatokat. A tranzakciós adatokhoz való hozzáférés nélkül a felhasználók nem tudják előállítani a pénzeszközök tulajdonjogának bizonyításához, illetve a kifizetések végrehajtásához szükséges Merkle-bizonyítékot.

Ez a fő különbség a validiumok és a ZK összevont tranzakciók között, vagyis az adatelérhetőség spektrumán máshol helyezkednek el. Mindkét megoldás másképp közelíti meg az adattárolást, ami kihat a biztonságra, illetve a bizalomigény-mentességre.

## Miként működnek együtt a validiumok az Ethereummal? {#how-do-validiums-interact-with-ethereum}

A validiumok a meglévő Ethereum-láncra épülő skálázási protokollok. Bár a tranzakciókat a láncon kívül hajtja végre, a validium láncot a főhálózatra telepített okosszerződések gyűjteménye kezeli, beleértve a következőket is:

1. **Hitelesítői szerződés**: A hitelesítői szerződés ellenőrzi a validium-üzemeltető által az státuszfrissítésekre benyújtott bizonylatok érvényességét. Ez két dolgot fed le a láncon kívül történő végrehajtással kapcsolatban: a tranzakciók helyességét igazoló érvényességi bizonyítékot és a tranzakciós adatok meglététről szóló adatelérhetőségi bizonyítékot.

2. **Főszerződés**: A főszerződés tárolja a blokképítő által benyújtott státusz elköteleződést (Merkle-gyökerek), és frissíti a validium státuszát, amint egy érvényességi bizonyítékot a láncban ellenőriznek. Ez a szerződés kezeli a validiumláncba történő befizetéseket és az onnan történő kivonásokat is.

A validiumok a fő Ethereum-láncra támaszkodnak a következő területeken is:

### Elszámolás {#settlement}

A validiumon végrehajtott tranzakciókat nem lehet teljes mértékben megerősíteni, amíg a szülőlánc nem ellenőrzi érvényességüket. Minden validiumon lebonyolított ügyletet végül a főhálózaton kell elszámolni. Az Ethereum-blokklánc „elszámolási garanciákat” is nyújt a validium-felhasználók számára, ami azt jelenti, hogy a láncot elhagyó tranzakciókat nem lehet visszafordítani vagy megváltoztatni, miután a láncba bevitték őket.

### Biztonság {#security}

Az Ethereum, mint elszámolási réteg, szintén garantálja az státuszváltozások érvényességét a validiumon. A validiumláncon végrehajtott, láncon kívüli tranzakciókat az Ethereum alaprétegén lévő okosszerződésen keresztül ellenőrzik.

Ha a láncon belüli hitelesítő szerződés érvénytelennek ítéli a bizonyítékot, a tranzakciókat elutasítja. Ez azt jelenti, hogy az operátoroknak meg kell felelniük az Ethereum-protokoll által kikényszerített érvényességi feltételeknek, mielőtt frissítenék a validium státuszát.

## Hogyan működik a validium? {#how-does-validium-work}

### Tranzakciók {#transactions}

A felhasználók tranzakciókat nyújtanak be az operátornak, amely egy csomópont, és ez felel a validiumlánc tranzakcióinak végrehajtásáért. Egyes validiumok egyetlen operátort használnak a lánc végrehajtására, vagy támaszkodhatnak egy [proof-of-stake (PoS)](/developers/docs/consensus-mechanisms/pos/) mechanizmusra is az operátorok rotációja érdekében.

Az operátor a tranzakciókat egy kötegbe tömöríti, és a bizonyításhoz elküldi egy bizonyító programnak (circuit). A bizonyító program elfogadja a tranzakciós köteget (és más releváns adatokat) bemenetként, és kiad egy érvényességi bizonyítékot, amely igazolja a műveleteket helyes végrehajtását.

### Státuszrögzítések {#state-commitments}

A validium státuszát egy Merkle-fa formájában hash-elik, amelynek gyökere az Ethereum fő szerződésben van tárolva. A Merkle- vagy státuszgyökér a validiumon lévő számlák és egyenlegek aktuális státuszára vonatkozó kriptográfiai kötelezettségvállalás.

A státuszfrissítéshez az operátornak ki kell számítania a tranzakciók végrehajtása utáni új státuszgyökeret, és el kell küldenie azt a láncon belüli szerződésnek. Ha az érvényesség igazolása rendben van, a javasolt státusz elfogadásra kerül, és a validium átvált az új gyökérstátuszra.

### Letét elhelyezése és kivétele {#deposits-and-withdrawals}

A felhasználók ETH-t (vagy bármely ERC-kompatibilis tokent) helyeznek letétbe a láncon belüli szerződésben, így tudnak pénzeszközt mozgatni az Ethereumról egy validiumba. A szerződés közvetíti a letéti eseményt a validiumnak a láncon kívülre, ahol a felhasználó címére jóváírják a letétnek megfelelő összeget. Az operátor ezt a befizetési tranzakciót is egy új kötegbe foglalja.

A pénzeszközök főhálózatra történő visszautalásához a validium felhasználó kezdeményez egy kifizetési tranzakciót, és elküldi azt az operátornak, aki érvényesíti a kifizetési kérelmet, és felveszi azt egy kötegbe. A felhasználó validiumláncban lévő eszközei megsemmisülnek, mielőtt kiléphetnének a rendszerből. Miután a köteghez kapcsolódó érvényességi bizonyítékot ellenőrizték, a felhasználó meghívhatja a fő szerződést, hogy kivegye a befizetésének a fennmaradó részét.

A validiumprotokoll cenzúraellenes mechanizmusként lehetővé teszi a felhasználók számára, hogy közvetlenül a validiumszerződésből lépjenek ki, anélkül hogy az operátoron keresztül mennének. Ebben az esetben a felhasználóknak Merkle-bizonyítékot kell szolgáltatniuk a hitelesítő szerződésnek, amely igazolja, hogy a fiók szerepel a státuszgyökérben. Ha a bizonyítékot elfogadják, a felhasználó meghívhatja a fő szerződés visszavonási funkcióját, hogy kivegye a pénzét a validiumból.

### Kötegbenyújtás {#batch-submission}

A tranzakcióköteg végrehajtása után az operátor benyújtja a kapcsolódó érvényességi bizonyítékot a hitelesítői szerződésnek, és új státuszgyökeret javasol a főszerződésnek. Ha a bizonylat érvényes, a főszerződés frissíti a validium státuszát, és véglegesíti a kötegben lévő tranzakciók eredményeit.

A ZK összevont tranzakciókkal ellentétben a validium blokkgyártóinak nem kell közzétenniük a kötegek tranzakciós adatait (csak a blokkfejléceket). Ez teszi a validiumot egy tisztán láncon kívüli skálázási protokollá, szemben a „hibrid” megoldásokkal ([L2](/layer-2/)), amelyek a státuszadatokat `calldata` formájában közzéteszik a fő Ethereum-láncon.

### Adatelérhetőség {#data-availability}

A validiumok láncon kívüli adatelérhetőségi modellt használnak, ahol az operátorok az összes tranzakciós adatot az Ethereum főhálózaton kívül tárolják. A validium alacsony láncon belüli adatlábnyoma javítja a skálázhatóságot (a tranzakcióátvitelt nem korlátozza az Ethereum adatfeldolgozási kapacitása) és csökkenti a felhasználói díjakat (a `calldata` közzétételének költsége alacsonyabb).

A láncon kívüli adatelérhetőség azonban problémát jelent: a Merkle-bizonyítékok létrehozásához vagy ellenőrzéséhez szükséges adatok nem állnak rendelkezésre. Ez azt jelenti, hogy a felhasználók nem tudnak pénzeszközt kivenni a láncon belüli szerződésből, ha az operátorok rosszhiszeműen cselekszenek.

Számos validiummegoldás a státuszadatok tárolásának decentralizálásával próbálja megoldani ezt a problémát. Ez azt jelenti, hogy a blokkgyártókat arra kényszerítik, hogy a mögöttes adatokat elküldjék az „adatelérhetőség-kezelőknek”, akik felelősek a láncon kívüli adatok tárolásáért, és kérésre a felhasználók rendelkezésére bocsátják azokat.

A validiumban az adatelérhetőség kezelői minden validiumköteg aláírásával tanúsítják az adatelérhetőséget a láncon kívüli tranzakciókhoz. Ezek az aláírások egyfajta „rendelkezésre állási bizonyítékot” jelentenek, amelyet a láncon lévő hitelesítői szerződés a státuszfrissítések jóváhagyása előtt ellenőriz.

A validiumok eltérnek egymástól az adatelérhetőség kezelési módjában. Egyesek megbízható felekre támaszkodnak a státuszadatok tárolásában, míg mások véletlenszerűen kijelölt validátorokat használnak erre.

#### Adatelérhetőségi bizottság (DAC) {#data-availability-committee}

A láncon kívüli adatok elérhetőségének garantálása érdekében egyes validium-megoldások megbízható résztvevők egy csoportját, az úgynevezett adatelérhetőségi bizottságot (DAC) jelölik ki a státuszmásolat tárolására és az adatelérhetőség igazolására. A DAC-k könnyebben megvalósíthatók és kevesebb koordinációt igényelnek, mivel a taglétszám alacsony.

A felhasználóknak azonban meg kell bízniuk a DAC-ben, hogy szükség esetén rendelkezésre bocsátja az adatokat (például a Merkle-bizonyítékok generálásához). Fennáll annak a lehetősége, hogy az adatelérhetőségi bizottságok [tagjait egy rosszindulatú szereplő megtámadja](https://notes.ethereum.org/DD7GyItYQ02d0ax_X-UbWg?view), aki aztán visszatartja a láncon kívüli adatokat.

[Bővebben az adatelérhetőségi bizottságokról a validiumokban](https://medium.com/starkware/data-availability-e5564c416424).

#### Kötelezvényalapú adatelérhetőség {#bonded-data-availability}

Más validiumok megkövetelik azoktól a résztvevőktől, akik az offline adatok tárolásáért felelnek, hogy feladatuk megkezdése előtt letétbe tegyenek (zároljanak) bizonyos értékű tokent egy okosszerződésben. Ez a letét „kötelezvényként” szolgál, amely garantálja az adatelérhetőség kezelőinek tisztességes viselkedését, és csökkenti a bizalmi feltételezéseket. Ha ezek a résztvevők nem bizonyítják az adatelérhetőséget, a kötelezvényt lecsökkentik.

A kötelezvényalapú adatelérhetőség esetén bárki kijelölhető a láncon kívüli adatok tárolására, amint biztosítja a szükséges letétet. Ezáltal bővül a jogosult adatelérhetőségi kezelők köre, és csökken az adatelérhetőségi bizottságokat (DAC) érintő centralizáció. Ennél is fontosabb, hogy ez a megközelítés kriptogazdasági ösztönzőkre támaszkodik a rosszindulatú tevékenységek megakadályozására, ami lényegesen biztonságosabb, mintha megbízható feleket jelölnénk ki az offline adatok biztosítására a validiumban.

[Bővebben a kötelezvényalapú adatelérhetőségről a validiumokban](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf).

## Volitionok és a validium {#volitions-and-validium}

A validiumok számos előnyt kínálnak, de kompromisszumokkal is járnak (leginkább az adatelérhetőségben). De mint sok más skálázási megoldás, a validiumok is speciális felhasználási esetekre alkalmasak – ezért hozták létre a volitionokat.

A volitionok kombinálják a ZK összevont tranzakciókat és a validiumláncot, és teszik lehetővé a felhasználók számára a két skálázási megoldás közötti váltást. A volitionokkal a felhasználók bizonyos tranzakciók esetében választhatják a validium láncon kívüli adatelérhetőségét, ugyanakkor válthatnak láncon belüli adatelérhetőségi megoldásra (ZK összevont tranzakciók) is, amikor arra van szükségük. Ez lényegében megadja a felhasználóknak a szabadságot, hogy olyan kompromisszumot válasszanak, amely megfelel egyedi igényüknek.

Egy decentralizált tőzsde (DEX) előnyben részesítheti a validium skálázható és privát infrastruktúrájának használatát a nagy értékű kereskedésekhez. ZK összevont tranzakciót is használhat azon felhasználók számára, akik magasabb biztonsági garanciákat és bizalomigény-mentességet szeretnék.

## A validiumok és az EVM kompatibilitás {#validiums-and-evm-compatibility}

A ZK összevont tranzakciók hasonlóan a validiumok egyszerű alkalmazásokhoz, például tokencserékhez és fizetésekhez alkalmasak. Az általános számítás és az okosszerződések végrehajtásának támogatása a validiumok között nehezen megvalósítható, tekintettel az [EVM](/developers/docs/evm/) utasítások bizonyításának jelentős többletköltségére egy zero-knowledge bizonyítékot készítő folyamatban.

Egyes validium projektek ezt a problémát úgy próbálják megkerülni, hogy EVM-kompatibilis nyelveket (például Solidity, Vyper) fordítanak le, hogy egyedi, hatékony bizonyításra optimalizált bájtkódot hozzanak létre. Ennek a megközelítésnek az a hátránya, hogy az új, new zero-knowledge bizonyítéknak kedvező virtuális gépek (VM) nem feltétlenül támogatják a fontos EVM-műveleti kódokat, és a fejlesztőknek közvetlenül a magas szintű nyelven kell írniuk az optimális élmény érdekében. Ez még több problémát okoz: arra kényszeríti a fejlesztőket, hogy a dappokat egy teljesen új fejlesztői stackkel építsék meg, és megszakítja a kompatibilitást a jelenlegi Ethereum infrastruktúrával.

Néhány csapat azonban megpróbálja optimalizálni a meglévő EVM opkódokat a ZK-bizonyítási folyamatok számára. Ennek eredménye egy zero-knowledge Ethereum virtuális gép (zkEVM) kifejlesztése lesz, egy EVM-kompatibilis VM, amely bizonyítékokat állít elő a programfuttatás helyességének ellenőrzésére. A zkEVM segítségével a validiumláncok okosszerződéseket hajthatnak végre a láncon kívül, és érvényességi bizonyítékokat nyújthatnak be egy láncon kívüli számítás ellenőrzésére (anélkül, hogy azt újra végre kellene hajtaniuk) az Ethereumon.

[Bővebben a zkEVM-ekről](https://www.alchemy.com/overviews/zkevm).

## Hogyan skálázzák a validiumok az Ethereumot? {#scaling-ethereum-with-validiums}

### 1. Láncon kívüli adattárolás {#off-chain-data-storage}

Az L2 skálázási projektek, mint például az optimista és ZK összevont tranzakciók, a tisztán láncon kívüli skálázási protokollok (például [plazma](/developers/docs/scaling/plasma/)) a végtelen skálázhatóságát a biztonságra cserélik azáltal, hogy bizonyos tranzakciós adatokat közzétesznek az L1-en. Ez azonban azt jelenti, hogy a összevont tranzakciók skálázhatósági tulajdonságait korlátozza az Ethereum főhálózat adatsávszélessége (emaitt az [adatsharding](/roadmap/danksharding/) az Ethereum adattárolási kapacitásának javítását célozza).

A validiumok úgy érik el a skálázhatóságot, hogy minden tranzakciós adatot a láncon kívül tartanak, és csak akkor tesznek közzé státuszelköteleződéseket (és érvényességi bizonyítékokat), amikor az státuszfrissítéseket továbbítják a fő Ethereum-láncnak. Az érvényességi bizonyítékok megléte azonban nagyobb biztonsági garanciákat biztosít a validiumoknak, mint más, tisztán láncon kívüli skálázási megoldások, például a plazma és a [mellékláncok](/developers/docs/scaling/sidechains/). Azáltal, hogy csökkenti az adatmennyiséget, amelyet az Ethereumnak fel kell dolgoznia a láncon kívüli tranzakciók validálása előtt, a validiumdizájnok jelentősen növelik a tranzakcióátviteli sebességet a főhálózaton.

### 2. Rekurzív bizonyítékok {#recursive-proofs}

A rekurzív bizonyíték olyan érvényességi bizonyíték, amely más bizonyítékok érvényességét ellenőrzi. Ez a „bizonyítékok bizonyítéka” több bizonyíték rekurzív összevonásával jön létre, amíg kialakul egy végső bizonyíték, amely az összes korábbit ellenőrzi. A rekurzív bizonyítékok úgy skálázzák a blokklánc feldolgozási sebességét, hogy egy adott érvényességi bizonyíték által lefedett tranzakciók számát növelik.

Jellemzően minden érvényességi bizonyíték, amelyet a validium üzemeltetője benyújt az Ethereumnak ellenőrzésre, egyetlen blokk integritását validálja. Egyetlen rekurzív bizonyíték azonban egyszerre több validiumblokk érvényességét is tudja igazolni – ez azért lehetséges, mert a bizonyító folyamat több blokkbizonyítékot rekurzív módon egyetlen végső bizonyítékká képes összevonni. Ha a láncon belüli hitelesítői szerződés elfogadja a rekurzív bizonyítékot, az összes mögöttes blokk azonnal véglegesítésre kerül.

## A validium előnyei és hátrányai {#pros-and-cons-of-validium}

| Előnyök                                                                                                                                                                         | Hátrányok                                                                                                                                                                                          |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Az érvényességi bizonyítékok biztosítják a láncon kívüli tranzakciók integritását, és megakadályozzák, hogy az üzemeltetők érvénytelen státuszfrissítéseket véglegesítsenek.    | Az érvényességi bizonyítékok előállításához speciális hardverre van szükség, ami centralizációs kockázatot jelent.                                                                                 |
| Növeli a tőkehatékonyságot a felhasználók számára (nincs késedelem a pénzeszközök Ethereumba való visszavételében).                                                             | Korlátozottan támogatja az általános számítást/okosszerződéseket; speciális nyelveket igényel a fejlesztése.                                                                                       |
| Nem sérülékeny bizonyos gazdasági támadásokkal szemben, melyekkel a csalási bizonyíték alapú rendszerek szembesülnek a nagy értékű alkalmazásoknál.                             | Nagy számítási kapacitást igényel a ZK bizonyítékok generálása; nem költséghatékony az alacsony tranzakcióátvitelű alkalmazásoknál.                                                                |
| Csökkenti a felhasználók gázdíját azáltal, hogy a hívásadatokat (calldata) nem küldi el az Ethereum főhálózatára.                                                               | Lassabb szubjektív véglegességi idő (10–30 perc egy ZK bizonyíték generálása) de gyorsabb a teljes véglegesség, mivel nincs felelősségre vonási idő.                                               |
| Alkalmas olyan speciális felhasználási esetekre, mint a kereskedés vagy a blokkláncjátékok, amelyeknél a legfontosabb a tranzakciókra vonatkozó adatvédelem és a skálázhatóság. | Előfordulhat, hogy a felhasználók nem tudnak hozzájutni a pénzeszközeikhez, mert a tulajdonlásuk Merkle-bizonyítékaihoz a láncon kívüli adatoknak rendelkezésre kell állniuk.                      |
| A láncon kívüli adatelérhetőség nagyobb tranzakcióátvitelt biztosít és növeli a skálázhatóságot.                                                                                | A biztonsági modell bizalmi feltételezésekre és kriptogazdasági ösztönzőkre támaszkodik, ellentétben a ZK összevont tranzakciókkal, amelyek kriptográfiai biztonsági mechanizmusokra támaszkodnak. |

### Validiumok/volitionok használata {#use-validium-and-volitions}

Több projekt is kínál olyan validium- és volitionimplementációkat, amelyeket Ön is beépíthet a dappjaiba:

**StarkWare StarkEx** – _A StarkEx egy Ethereum L2 skálázási megoldás, amely érvényességi bizonyítékokon alapul. ZK összevont tranzakció vagy validium adatelérhetőségi módban is működhet._

- [Dokumentáció](https://docs.starkware.co/starkex-v4/starkex-deep-dive/data-availability-modes#validium)
- [Honlap](https://starkware.co/starkex/)

**Matter Labs zkPorter** – _A zkPorter egy L2 skálázási protokoll, amely a zkRollup és a sharding ötleteit ötvöző hibrid megközelítéssel kezeli az adatelérhetőséget. Tetszőlegesen sok shardot támogathat, mindegyik saját adatelérhetőségi szabályzattal._

- [Blog](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf)
- [Dokumentáció](https://docs.zksync.io/zk-stack/concepts/data-availability)
- [Honlap](https://zksync.io/)

## További információ {#further-reading}

- [A validium és az L2 összevetése – 99. szám](https://www.buildblockchain.tech/newsletter/issues/no-99-validium-and-the-layer-2-two-by-two)
- [A ZK összevont tranzakciók és a validium összehasonlítása](https://blog.matter-labs.io/zkrollup-vs-validium-starkex-5614e38bc263)
- [A volition és a kialakulóban lévő adatelérhetőségi spektrum](https://medium.com/starkware/volition-and-the-emerging-data-availability-spectrum-87e8bfa09bb)
- [Összevont tranzakciók, validiumok és volitionok: ismerje meg az Ethereum legfrissebb skálázási megoldásait](https://www.defipulse.com/blog/rollups-validiums-and-volitions-learn-about-the-hottest-ethereum-scaling-solutions)
