---
title: Méretezés
description: Bevezetés a különböző skálázási lehetőségekbe, melyet jelenleg az Ethereum közösség fejleszt.
lang: hu
sidebarDepth: 3
---

## Skálázás áttekintése {#scaling-overview}

Ahogy az Ethereumot használók száma nőtt, a blokklánc elért bizonyos kapacitáskorlátokat. Ez megemelte a hálózat használatának költségeit, és egyúttal igényt teremtett a „skálázási megoldásokra”. Többféle megoldást kutatnak, tesztelnek és vezetnek be, amelyek különböző megközelítésekkel érnek el hasonló célokat.

A skálázhatóság fő célja a tranzakció sebességének növelése (gyorsabb véglegesség) és a nagyobb tranzakcióátvitel (több tranzakció másodpercenként) a decentralizáció vagy a biztonság feláldozása nélkül (bővebben az [Ethereum jövőképében](/roadmap/vision/)). Az Ethereum blokkláncon (L1) a nagy kereslet lassabb tranzakciókhoz és irracionális [gázárakhoz](/developers/docs/gas/) vezet. A hálózati kapacitás növelése a sebesség és a tranzakcióátvitel tekintetében alapvető fontosságú az Ethereum értelmes és tömeges használatához.

Bár a sebesség és a tranzakcióátvitel fontos, mégis lényeges, hogy az ezeket lehetővé tevő skálázási megoldások decentralizáltak és biztonságosak maradjanak. A csomópontok üzemeltetői számára a belépési korlátok alacsonyan tartása kritikus, hogy ne mozduljon el a hálózat a centralizált és bizonytalan számítási teljesítmény felé.

Koncepcionálisan a skálázást először a láncon belüli vagy kívüli kategóriájába sorolhatjuk.

## Előfeltételek {#prerequisites}

Jó alapokkal kell rendelkeznie az összes alapvető témakörről. A skálázási megoldások megvalósítása komoly feladat, a technológia még kevésbé kiforrott, folyamatosan kutatják és fejlesztik.

## Láncon belüli skálázás {#on-chain-scaling}

A láncon belüli skálázáshoz módosíttani kell az Ethereum protokollját (L1 [főhálózatot](/glossary/#mainnet)). Sokáig a blokklánc felosztásától (sharding) várták az Ethereum skálázását. Ehhez a blokkláncot különálló darabokra kellett volna osztani, amelyeket a validátorok részhalmazai ellenőriznek. A második blokkláncréteg (L2) összevont tranzakciókkal történő skálázása vált preferálttá. Ezt támogatja az Ethereum-blokkokhoz csatolt adatok egy új, olcsóbb formája, amelyet kifejezetten arra terveztek, hogy a felhasználók számára olcsóbbá tegye az összevont tranzakciókat.

### Sharding {#sharding}

A sharding egy adatbázis felosztásának folyamata. A validátorok részhalmazai az egyes shardokért lennének felelősek, ahelyett hogy az egész Ethereumot nyomon követnék. A sharding sokáig szerepelt az Ethereum [ütemtervében](/roadmap/), és egykor úgy tervezték, hogy még a proof-of-stake bevezetése (a Beolvadás) előtt leszállításra kerül. Az [L2 összevont tranzakciók](#layer-2-scaling) gyors fejlődése és a [Danksharding](/roadmap/danksharding) feltalálása (a validátorok által hatékonyan ellenőrizhető összevont tranzakciós adatblobok hozzáadása az Ethereum blokkokhoz) azonban arra késztette az Ethereum közösséget, hogy az összevonttranzakció-központú skálázást részesítse előnyben a sharding helyett. Ez segít abban is, hogy az Ethereum konszenzuslogikája egyszerűbb legyen.

## Láncon kívüli skálázás {#off-chain-scaling}

A láncon kívüli megoldásokat az L1 főhálózattól függetlenül valósítják meg, tehát nem igényelnek változtatásokat a meglévő Ethereum protokollban. Az L2 megoldások közvetlenül az Ethereum L1 konszenzusából származtatják biztonságukat, mint például a [optimista összevont tranzakciók](/developers/docs/scaling/optimistic-rollups/), [a zero-knowledge összevont tranzakciók](/developers/docs/scaling/zk-rollups/) vagy [státuszcsatornák](/developers/docs/scaling/state-channels/). Más megoldások különböző formájú új láncok létrehozását foglalják magukban, amelyek a biztonságukat a főhálózattól elkülönítve kezelik, mint például [mellékláncok](#sidechains), [validiumok](#validium) vagy [plazmaláncok](#plasma). Ezek a megoldások kommunikálnak a főhálózattal, de más-más célok elérése érdekében másképp biztosítják a szükséges biztonságot.

### L2 skálázás {#layer-2-scaling}

A láncon kívüli megoldások ezen kategóriája az Ethereum főhálózatból meríti biztonságát.

Az L2 azon megoldások gyűjtőfogalma, amelyek az alkalmazások skálázhatóságát úgy oldják meg, hogy a tranzakciókat a főhálózaton (L1) kívül végzik el, ugyanakkor felhasználják a főhálózat robusztus, decentralizált biztonsági modelljét. A hálózat leterheltségekor lassul a tranzakciók feldolgozása, ami rontja a felhasználói élményt bizonyos típusú dappoknál. Ahogy nő a hálózat forgalma, úgy nőnek a gázárak, mivel a tranzakció küldők próbálják egymást túllicitálni. Ez nagyon drágává teszi az Ethereum használatát.

A legtöbb L2 megoldás egy szerver vagy egy szerverklaszter körül helyezkedik el, amelyek mindegyikét csomópontnak, validátornak, operátornak, szekvenszernek, blokkgyártónak vagy hasonlónak nevezhetjük. A megvalósítástól függően ezeket az L2 csomópontokat futtathatják egyének, felhasználóként működő vállalkozások vagy vállalatok, harmadik fél vagy egyének nagy csoportja (hasonlóan a főhálózathoz). Általánosságban elmondható, hogy a tranzakciókat ezekhez az L2 csomópontokhoz nyújtják be ahelyett, hogy közvetlenül az L1-be (főhálózat) adnák. Bizonyos megoldásoknál az L2 ezután csoportokba rendezi őket, mielőtt az L1 felé közvetítené azokat, majd az L1 rögzíti azokat, és nem módosíthatók. A részletek jelentősen eltérnek a különböző L2 technológiák és megvalósítások függvényében.

Egy adott L2 lehet nyitott és több alkalmazás használja, vagy egy adott projekt üzemelteti a saját alkalmazásukhoz.

#### Miért szükséges az L2? {#why-is-layer-2-needed}

- A másodpercenkénti tranzakciók számának növekedése jelentősen javítja a felhasználói élményt, és csökkenti a hálózati torlódásokat az Ethereum főhálózaton.
- Sok tranzakciót vonnak össze, melyek egyetlen tranzakcióként jelennek meg az Ethereum főhálózaton, ezzel is csökkentve a felhasználók gázdíjait, így az Ethereum mindenhol befogadóbbá és elérhetőbbé válik.
- A skálázhatóság fejlesztése nem mehet a decentralizáció rovására – az L2 réteg az Ethereumra épül.
- Vannak alkalmazásspecifikus L2 hálózatok, amelyek hatékonysági előnyökkel járnak az eszközökkel való méretarányos munka során.

[Bővebben az L2-ről](/layer-2/).

#### Összevont tranzakciók {#rollups}

Az összevont tranzakciók az L1-en kívül hajtják végre a tranzakciókat, majd az adatok az L1-be kerülnek, ahol konszenzusra jutnak. Mivel a tranzakciós adatok az L1 blokkokban szerepelnek, ez lehetővé teszi az összevont tranzakciók natív Ethereum-biztonsággal történő védelmét.

Kétfajta összevont tranzakció létezik különböző biztonsági modellekkel:

- **Optimista összevont tranzakció**: alapértelmezésben érvényes tranzakciókat feltételez, és csak kétely esetén végez számításokat egy [**csalási bizonyíték**](/glossary/#fraud-proof) révén. [Bővebben az optimista összevont tranzakciókról](/developers/docs/scaling/optimistic-rollups/).
- **Zero-knowledge összevont tranzakció**: számítást végez a láncon kívül, és [**érvényességi bizonyítékot**](/glossary/#validity-proof) ad a láncnak. [Bővebben a zero-knowledge összevont tranzakciókról](/developers/docs/scaling/zk-rollups/).

#### Állapot csatornák {#channels}

A státuszcsatornák többaláírásos szerződéseket használnak, hogy a résztvevők gyorsan és szabadon tudjanak tranzakciókat lebonyolítani a láncon kívül, majd a végleges elszámolást a főhálózattal végezzék. Ez minimalizálja a hálózati torlódásokat, díjakat és késedelmeket. Két típusa jelenleg a státuszcsatorna és a fizetési csatorna.

Tudjon meg többet az [státuszcsatornákról](/developers/docs/scaling/state-channels/).

### Mellékláncok {#sidechains}

A melléklánc egy független, EVM-kompatibilis blokklánc, amely a főhálózattal párhuzamosan fut. Ezek kétirányú hidakon keresztül kompatibilisek az Ethereummal, és saját konszenzusszabályok és blokkparaméterek szerint működnek.

Tudjon meg többet a [mellékláncokról](/developers/docs/scaling/sidechains/).

### Plazma {#plasma}

A plazmalánc egy külön blokklánc, amely a fő Ethereum-lánchoz van rögzítve, és csalásbizonylatokat (például [optimista rollup](/developers/docs/scaling/optimistic-rollups/)) használ a viták eldöntésére.

Bővebben a [plazmáról](/developers/docs/scaling/plasma/).

### Validium {#validium}

A validiumlánc olyan érvényességi bizonyítékokat használ, mint a zero-knowledge összevont tranzakciók, de az adatokat nem az Ethereum L1-en tárolja. Ez másodpercenként 10 000 tranzakciót eredményezhet validiumlánconként, és több láncot lehet párhuzamosan futtatni.

Bővebben a [validiumokról](/developers/docs/scaling/validium/).

## Miért van szükség ennyi skálázási megoldásra? {#why-do-we-need-these}

- A többféle megoldás segíthet csökkenteni a hálózat részeinek általános zsúfoltságát, és megakadályozza az egyetlen meghibásodási pont kialakulását is.
- Az egész több, mint a részek összege. Különböző megoldások létezhetnek és működhetnek együtt, ami exponenciális hatást gyakorolhat a jövőbeli tranzakciók sebességére és tranzakcióátvitelre.
- Nem minden megoldás igényli az Ethereum konszenzusalgoritmusának közvetlen használatát, és az alternatívák olyan előnyöket kínálhatnak, amelyeket egyébként nehéz lenne elérni.
- Egyetlen skálázási megoldás sem elegendő az [Ethereum víziójának](/roadmap/vision/) megvalósításához.

## Ön inkább vizuális típus? {#visual-learner}

<YouTube id="BgCgauWVTs0" />

_Vegye figyelembe, hogy a videóban szereplő magyarázat az L2 kifejezést használja az összes láncon kívüli skálázási megoldásra, míg mi olyan láncon kívüli megoldásként különböztetjük meg, amely biztonságát az L1 főhálózat konszenzusán keresztül nyeri._

<YouTube id="7pWxCklcNsU" />

## További olvasnivaló {#further-reading}

- [Egy összevonttranzakció-központú Ethereum útiterv](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698) _Vitalik Buterin_
- [Naprakész elemzések az L2 skálázási megoldásokról az Ethereum számára](https://www.l2beat.com/)
- [Ethereum L2 skálázási megoldások értékelése: összehasonlítási keretrendszer](https://medium.com/matter-labs/evaluating-ethereum-l2-scaling-solutions-a-comparison-framework-b6b2f410f955)
- [Egy nem teljeskörű útmutató az összevont tranzakciókhoz](https://vitalik.eth.limo/general/2021/01/05/rollup.html)
- [Ethereum-alapú ZK összevont tranzakciók: világverők](https://hackmd.io/@canti/rkUT0BD8K)
- [Az optimista összevont tranzakciók és a ZK összevont tranzakciók összehasonlítása](https://limechain.tech/blog/optimistic-rollups-vs-zk-rollups/)
- [Zero-knowledge blokklánc skálázhatósága](https://ethworks.io/assets/download/zero-knowledge-blockchain-scaling-ethworks.pdf)
- [Miért az összevont tranzakciók és az adatmegosztások (sharding) adják az egyetlen fenntartható megoldást a nagyfokú skálázhatósághoz](https://polynya.medium.com/why-rollups-data-shards-are-the-only-sustainable-solution-for-high-scalability-c9aabd6fbb48)
- [Milyen L3 megoldásoknak van értelme?](https://vitalik.eth.limo/general/2022/09/17/layer_3.html)
- [Adatelérhetőség vagy hogyan tanulták meg az összevont tranzakciók, hogy ne aggódjanak és szeressék az Ethereumot](https://ethereum2077.substack.com/p/data-availability-in-ethereum-rollups)

_Van olyan közösségi erőforrása, amely segített Önnek? Szerkessze ezt az oldalt, és adja hozzá!_
