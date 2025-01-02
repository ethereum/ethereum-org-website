---
title: A proof-of-stake és a proof-of-work összehasonlítása
description: Az Ethereum proof-of-stake és proof-of-work alapú konszenzusmechanizmusának összehasonlítása
lang: hu
---

Amikor az Ethereumot bevezették, a proof-of-stake (letéti igazolás) még sok kutatást és fejlesztést igényelt, mielőtt erre alapozhatták volna az Ethereum biztosítását. A proof-of-work (munkaigazolás) egy egyszerűbb mechanizmus volt, ami már működött a Bitcoinnál, így a központi fejlesztők egyszerűen implementálni tudták, hogy elindulhasson az Ethereum. Ezután a proof-of-stake mechanizmusát még nyolc évig fejlesztették, mielőtt áttérek volna rá.

Ez az oldal az Ethereum proof-of-work mechanizumusról proof-of-stake mechanizmusra való áttérésének okait és a szükséges kompromisszumokat magyarázza el.

## Biztonság {#security}

Az Ethereum kutatói biztonságosabbnak tartják a proof-of-stake-et, mint a proof-of-worköt. Ez nemrég került bevezetésre a valódi Ethereum főhálózatra, és kevésbé bizonyított, mint a proof-of-work. A következő részben a proof-of-stake biztonsági modelljének előnyeit és hátrányait tárgyaljuk a proof-of-workhöz képest.

### A támadás költsége {#cost-to-attack}

A proof-of-stake-ben a validátoroknak letétbe kell helyezniük 32 ETH-t egy okosszerződésben. Az Ethereum a rosszhiszemű validátorokat büntetheti azzal, hogy megsemmisíti a letétbe helyezett ethert. A konszenzushoz a teljes letétbe helyezett ether legalább 66%-a kell szavazzon a blokkok egy bizonyos halmazára. A letét >=66%-a által megszavazott blokkok „véglegesítetté” válnak, ami azt jelenti, hogy nem lehet őket eltávolítani vagy átszervezni.

A hálózat elleni támadás jelentheti azt, hogy megakadályozzák a lánc véglegesítését, vagy a blokkokat a támadó számára előnyös sorrendbe rendezik a kanonikus láncban. Ehhez a támadónak el kell térítenie a helyes konszenzus útját azzal, hogy nagy mennyiségű ethert halmoz fel, és közvetlenül azzal szavaz, vagy úgy, hogy becsapja a becsületes validátorokat, hogy egy bizonyos módon szavazzanak. A kifinomult, kis valószínűséggel bíró támadások során a jóhiszemű validátorokat eltérítik, ekkor az Ethereum megtámadásának költsége azonos a letéttel, amelyet a támadónak fel kell halmoznia ahhoz, hogy a konszenzust a maga javára befolyásolja.

A legalacsonyabb támadási költség a teljes letét >33%-a. A teljes letét >33%-át birtokló támadó egyszerűen offline állapotba kerülve késleltetheti a véglegesítést. Ez viszonylag kisebb probléma a hálózat számára, mivel létezik egy „inaktivitási elszivárgási” mechanizmus, amely addig redukálja a letéteket az offline validátoroktól, amíg az online többség a letét 66%-át nem képviseli, és újra véglegesíteni tudja a láncot. Elméletileg az is lehetséges, hogy egy támadó a teljes letét valamivel több mint 33%-ával kettős véglegesítést idézzen elő azáltal, hogy egy helyett két blokkot hoz létre, amikor felkérik, hogy legyen blokkelőterjesztő, majd az összes validátorral együtt kétszeresen szavazzon. Mindkét elágazáshoz csak a megmaradt becsületes validátorok 50%-ának kell először látni az egyes blokkokat, így ha sikerül pontosan időzíteniük az üzeneteiket, akkor képesek lehetnek mindkét elágazást véglegesíteni. Ennek kicsi a valószínűsége, de ha egy támadó képes lenne kettős véglegesítést előidézni, akkor az Ethereum közösségének úgy kellene döntenie, hogy az egyik elágazást követi, és ebben az esetben a támadó validátorait a másik elágazáson súlyosan megbüntetnék és kizárnák.

A teljes letét >33%-ával egy támadónak esélye van arra, hogy kisebb (véglegesítés késleltetése) vagy komolyabb (dupla véglegesítés) hatást gyakoroljon az Ethereum-hálózatra. Több mint 14 000 000 ETH letétje van a hálózaton és egy reprezentatív 1000 dollár/ETH árral, az ilyen támadások minimális költsége `1000 × 14 000 000 × 0,33 = 4 620 000 000 dollár`. A támadó ezt a pénzt elveszítené a súlyos büntetés következtében, és kiesne a hálózatból. Az újbóli támadáshoz a letét >33%-át kellene (újra) felhalmozniuk és (újra) elégetniük. Minden egyes támadási kísérlet a hálózat megtámadására >4,6 milliárd dollárba kerülne (1000 dollár/ETH és 14 millió ETH letét mellett). A támadót kidobják a hálózatból a súlyos büntetés következtében, és egy aktiválási sorba kell beállnia, hogy újra csatlakozhasson. Ez azt jelenti, hogy az ismételt támadás mértéke nemcsak arra az arányra korlátozódik, amivel a támadó a teljes letét >33%-át fel tudja halmozni, hanem arra az időre is, amíg az összes validátorát fel tudja venni a hálózatra. Minden egyes támadással a támadó sokkal szegényebbé válik, a közösség többi tagja pedig gazdagabb lesz az ebből eredő drasztikus kínálati változásnak köszönhetően.

Más támadások, mint például az 51%-os támadás vagy a teljes letét 66%-ával történő véglegesség visszafordítása, lényegesen több ETH-t igényelnek, és sokkal költségesebbek a támadó számára.

Összehasonlítjuk a proof-of-work mechanizmussal. A proof-of-work Ethereum elleni támadás indításának költsége az volt, hogy a teljes hálózati hashráta >50%-át folyamatosan birtokolni kellett. Ez az elegendő számítási teljesítmény hardver- és üzemeltetési költségét jelentette ahhoz, hogy a proof-of-work megoldások kiszámításában lehagyja a többi bányászt. Az Ethereumon többnyire GPU-t használtak a bányászathoz, nem ASIC-et, ami alacsonyan tartotta a költségeket (ha a proof-of-work rendszer fennmaradt volna, az ASIC-alapú bányászat népszerűbb lehetett volna). Egy támadónak rengeteg hardverre lett volna szüksége, illetve fizethette volna a működtetés költségeit, hogy megtámadhasson egy proof-of-work Ethereum-hálózatot, de ez kevesebb, mint a támadáshoz szükséges ETH felhalmozása. Egy 51%-os támadás a proof-of-work esetében [kb. 20x olcsóbb](https://youtu.be/1m12zgJ42dI?t=1562), mint a proof-of-stake esetében. Ha a támadást észlelték, és a lánc elágazott (hard fork), hogy eltávolítsák a támadó hatását, a támadó ismételten ugyanazt a hardvert használhatná az új elágazás megtámadásához.

### Bonyolultság {#complexity}

A proof-of-stake kivitelezése a proof-of-workhöz képest sokkal bonyolultabb. Ez a proof-of-work mellett szólhat, mivel az egyszerűbb protokollokba sokkal nehezebb véletlen hibákat vagy nem kívánt hatásokat bevinni. Habár a komplexitást sikerült megszelídíteni több éves kutatás és fejlesztés, szimulációk és teszthálózati megvalósítások révén. A proof-of-stake protokollt öt független csapat (a végrehajtási és konszenzusrétegen is), öt programozási nyelven valósította meg, ami ellenállást biztosít a klienshibákkal szemben.

A proof-of-stake konszenzus logikájának biztonságos fejlesztése és tesztelése érdekében a Beacon lánc két évvel azelőtt indult el, hogy a proof-of-stake-et az Ethereum főhálózatra bevezették volna. A Beacon lánc a proof-of-stake tesztelési helyeként működött, mivel élő blokklánc volt proof-of-stake konszenzuslogikával, de nem kezelt valódi Ethereum-tranzakciókat, gyakorlatilag csak önmagában jutott konszenzusra. Amint ez kellő ideig stabil és hibamentes volt, a Beacon láncot „beolvasztották” az Ethereum főhálózatba. Mindez hozzájárult ahhoz, hogy a proof-of-stake összetettsége kezelhetővé váljon, és a nem kívánt következmények vagy a klienshibák kockázata alacsony legyen.

### Támadási felület {#attack-surface}

A proof-of-stake összetettebb, mint a proof-of-work, ami azt jelenti, hogy több potenciális támadási vektorral kell megbirkózni. A klienseket összekötő peer-to-peer hálózatból kettő van, külön protokollal. Mivel előre kiválasztanak egy validátort, hogy egy adott slotban blokkot javasoljon, így lehetőség nyílik a szolgáltatásmegtagadásra, amikor az adott validátort annyi feladattal árasztják el, hogy nem tudja végrehajtani a fő funkcióját.

Vannak olyan módszerek is, amelyekkel a támadók gondosan időzíthetik blokkjaik vagy tanúsításaik közzétételét, hogy azokat a becsületes hálózat egy bizonyos hányada megkapja, és így bizonyos módon szavaznak. Végül egy támadó egyszerűen elegendő ETH letétet képezhet ahhoz, hogy uralja a konszenzusmechanizmust. E [támadási vektorok mindegyikének vannak kapcsolódó védekezési lehetőségei](/developers/docs/consensus-mechanisms/pos/attack-and-defense), ugyanakkor ezek nem léteznek a proof-of-work mechanizmusban.

## Decentralizáció {#decentralization}

A proof-of-stake decentralizáltabb, mint a proof-of-work, mivel a bányászhardverek versenyében a magánszemélyek és a kis szervezetek kiszorulnak a versenyből. Bár technikailag bárki elkezdheti a bányászatot szerény hardverrel, annak a valószínűsége, hogy jutalmat kap, elenyészően kicsi az intézményes bányászathoz képest. A proof-of-stake esetében a letét költsége és százalékos megtérülése mindenki számára azonos. Jelenleg 32 ETH-be kerül egy validátor működtetése.

Másrészt a likvid letéti derivatívák centralizációs aggályokhoz vezettek, mivel néhány nagy szolgáltató nagy mennyiségű letétbe helyezett ETH-t kezel. Ez problémás, és minél előbb korrigálni kell, de árnyaltabb is, mint amilyennek látszik. A központosított letéti alapok nem feltétlenül központosítják a validátorok irányítását – gyakran ez egy módja annak, hogy egy központi ETH-állományt sok független csomópont-üzemeltető adjon össze anélkül, hogy minden résztvevőnek 32 saját ETH-re lenne szüksége.

Az Ethereum számára a legjobb megoldás az, ha a validátorokat helyben, otthoni számítógépeken futtatják, maximalizálva a decentralizációt. Ezért ellenzi az Ethereum azokat a változtatásokat, amelyek növelik a csomópont és a validátor futtatásának hardverigényét.

## Fenntarthatóság {#sustainability}

A proof-of-stake energiafogyasztása miatt ez gazdaságos módja a blokklánc biztosításának. A proof-of-work rendszerben a bányászok versenyeznek a blokkbányászat jogáért. A bányászok sikeresebbek, ha gyorsabban tudják elvégezni a számításokat, ami miatt többet fektetnek hardverbe és nagyobb az energiafogyasztás. Ez jellemezte az Ethereumot, mielőtt átállt volna a proof-of-stake-re. Nem sokkal a proof-of-stake-re való áttérés előtt az Ethereum körülbelül 78 TWh/év mennyiséget fogyasztott, akár egy kisebb ország. A proof-of-stake-re való áttérés azonban kb. 99,98%-kal csökkentette ezt az energiafelhasználást. Ez tehát az Ethereumot egy energiahatékony, alacsony szén-dioxid-kibocsátású platformmá tette.

[Bővebben az Ethereum energiafogyasztásáról](/energy-consumption)

## Kibocsátás {#issuance}

A proof-of-stake Ethereum kevesebb érmekibocsátással tudja fenntartani a biztonságát, mint a proof-of-work rendszerben, mivel a validátoroknak nem kell magas áramköltséget fizetniük. Ennek eredményeképpen az ETH inflációja csökkenhet, vagy akár deflálódhat is, ha nagy mennyiségű ETH-t égetnek el. Az alacsonyabb inflációs szintek azt jelentik, hogy az Ethereum biztonságát olcsóbb fenntartani, mint amikor proof-of-work mechanizmust használt.

## Ön inkább vizuális típus? {#visual-learner}

Tekintse meg Justin Drake magyarázatát a proof-of-stake előnyeiről a proof-of-workhöz képest:

<YouTube id="1m12zgJ42dI" />

## További olvasnivaló {#further-reading}

- [Vitalik proof-of-stake tervezési filozófiája](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51)
- [Vitalik proof-of-stake GYIK](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-is-proof-of-stake)
- [„Simply Explained” (egyszerű magyarázat) videó a proof-of-stake és a proof-of-woork mechanizmusokról](https://www.youtube.com/watch?v=M3EFi_POhps)
