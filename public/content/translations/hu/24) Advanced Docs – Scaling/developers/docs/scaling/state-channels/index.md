---
title: Státuszcsatornák
description: Bevezetés a státusz- és fizetési csatornákba, az Ethereum közössége által használt skálázási megoldásba.
lang: hu
sidebarDepth: 3
---

A státuszcsatornák lehetővé teszik a résztvevők számára, hogy biztonságosan tranzakciókat bonyolítsanak le a láncon kívül, miközben minimálisra csökkentik az Ethereum főhálózattal való interakciót. A csatornát alkotó résztvevők tetszőleges számú, a láncon kívüli tranzakciót hajthatnak végre, melyhez csak két láncon belüli tranzakciót kell beküldeniük csatorna megnyitásához és lezárásához. Ez rendkívül nagy tranzakcióátvitelt tesz lehetővé, és alacsonyabb költségeket eredményez a felhasználók számára.

## Előfeltételek {#prerequisites}

Érdemes áttekinteni az [Ethereum skálázásról](/developers/docs/scaling/) és [L2 megoldásokról](/layer-2/) szóló oldalakat.

## Mik azok a csatornák? {#what-are-channels}

A nyilvános blokkláncok, mint például az Ethereum, az elosztott architektúrájuk miatt skálázhatósági kihívásokkal küzdenek: a láncban végrehajtott tranzakciókat az összes csomópontnak végre kell hajtania. A csomópontoknak képesnek kell lenniük arra, hogy egy blokkban lévő tranzakciók mennyiségét szerény hardverrel kezeljék, hogy a hálózat decentralizált maradjon, de ez korlátozza a tranzakcióátviteli sebességet. A blokklánc-csatornák úgy oldják meg ezt a problémát, hogy lehetővé teszik a felhasználók számára a láncon kívüli interakciót, miközben a végső elszámolásban továbbra is a fő lánc biztonságára támaszkodnak.

A csatornák olyan egyszerű társközi (peer-to-peer) protokollok, amelyek lehetővé teszik, hogy két fél számos tranzakciót hajtson végre egymás között, és csak a végeredményt tegyék fel a blokkláncra. A csatorna kriptográfiát használ annak bizonyítására, hogy az általuk generált összesített adatok valóban érvényes köztes tranzakciók eredményei. Egy [több aláírásos](/developers/docs/smart-contracts/#multisig) okosszerződés biztosítja, hogy a tranzakciókat a megfelelő felek írják alá.

A csatornák segítségével a státuszváltozásokat az érdekelt felek hajtják végre és érvényesítik, minimalizálva az Ethereum végrehajtási rétegének számításait. Ez csökkenti a torlódásokat az Ethereumon, és növeli a tranzakciók feldolgozási sebességét a felhasználók számára.

Minden csatornát egy [több aláírásos okosszerződés](/developers/docs/smart-contracts/#multisig) kezel, amely az Ethereumon fut. Egy csatorna megnyitásához a résztvevők telepítik a csatornaszerződést a láncban, és pénzt helyeznek el benne. A felek közösen aláírnak egy státuszváltozást a csatorna inicializálásához, majd ezt követően gyorsan és szabadon tranzakciókat hajthatnak végre a láncon kívül.

A csatorna lezárásához a résztvevők elküldik a csatorna utolsó elfogadott státuszát a láncba. Ezt követően az okosszerződés a zárolt pénzeszközöket az egyes résztvevőknek a csatorna végső státuszában lévő egyenlege szerint osztja szét.

A peer-to-peer csatornák különösen hasznosak olyan helyzetekben, amikor néhány előre meghatározott résztvevő nagy gyakorisággal kíván tranzakciókat lebonyolítani anélkül, hogy az többletterhekkel járna. A blokklánc-csatornák két kategóriába sorolhatók: **fizetési** és **státuszcsatornák**.

## Fizetési csatornák {#payment-channels}

A fizetési csatornát leginkább úgy lehet leírni, mint két felhasználó által közösen vezetett „kétirányú főkönyvet”. A főkönyv kezdeti egyenlege a csatornanyitási fázisban a láncban lévő szerződésbe zárolt betétek összege. A fizetési csatornán történő átutalások azonnal és a tényleges blokklánc közreműködése nélkül végezhetők, kivéve a kezdeti láncon belüli létrehozást és a csatorna esetleges lezárását.

A főkönyv egyenlegének (azaz a fizetési csatorna státuszának) frissítéséhez a csatorna összes résztvevőjének jóváhagyása szükséges. A csatorna résztvevői által aláírt csatornaváltozás véglegesítettnek tekinthető, hasonlóan az Ethereumban végrehajtott tranzakciókhoz.

A fizetési csatornák a legkorábbi skálázási megoldások közé tartoztak, amelyek célja az egyszerű felhasználói interakciók (pl. ETH átutalások, atomikus átváltások, mikrofizetések) költséges láncon belüli tevékenységének minimalizálása volt. A csatorna résztvevői korlátlan mennyiségű azonnali, illeték nélküli tranzakciót hajthatnak végre egymás között mindaddig, amíg az átutalások nettó összege nem haladja meg a letétbe helyezett tokeneket.

## Állapot csatornák {#state-channels}

A láncon kívüli fizetések támogatásán kívül a fizetési csatornák nem bizonyultak hasznosnak az általános státuszváltozási logika kezelésére. A státuszcsatornákat azért hozták létre, hogy megoldják ezt a problémát, és azok támogassák az általános célú számítások skálázását.

A státuszcsatornáknak sok közös vonásuk van a fizetési csatornákkal. A felhasználók például kriptográfiailag aláírt üzenetek (tranzakciók) cseréjével lépnek kapcsolatba egymással, amelyeket a csatorna többi résztvevőjének is alá kell írnia. Ha egy javasolt státuszváltozást nem ír alá minden résztvevő, az érvénytelennek minősül.

A csatorna azonban a felhasználó egyenlegének tárolása mellett a szerződés tárhelyének aktuális státuszát (a szerződésváltozók értékeit) is nyomon követi.

Ez lehetővé teszi egy okosszerződés végrehajtását a láncon kívül két felhasználó között. Ebben az esetben az okosszerződés belső státuszának frissítéséhez csak a csatornát létrehozó társak jóváhagyására van szükség.

Ez ugyan megoldja a korábban ismertetett skálázhatósági problémát, de a biztonságra is hatással van. Az Ethereumon a státuszváltozások érvényességét a hálózat konszenzusprotokollja hitelesíti. Emiatt nem lehetséges az okosszerződés státuszának érvénytelen frissítése, a végrehajtásának megváltoztatása.

A státuszcsatornák nem rendelkeznek ugyanilyen biztonsági garanciákkal. Bizonyos mértékig a státuszcsatorna a főhálózat miniatűr változata. Mivel korlátozott számú résztvevő tartatja be a szabályokat, ezért megnő a rosszhiszemű viselkedés lehetősége (pl. érvénytelen státuszváltozások javaslata). A státuszcsatornák biztonságukat egy [csalási bizonyítékon](/glossary/#fraud-proof) alapuló vitarendezési rendszerből eredeztetik.

## Hogyan működnek a státuszcsatornák {#how-state-channels-work}

A státuszcsatornán belüli tevékenység alapvetően a felhasználók és a blokkláncrendszer közötti interakciók munkamenete. A felhasználók többnyire a láncon kívül kommunikálnak egymással, és csak a csatorna megnyitásához, lezárásához vagy az esetleges viták rendezéséhez lépnek kapcsolatba a mögöttes blokklánccal.

A következő szakasz egy státuszcsatorna alapvető folyamatát vázolja fel:

### A csatorna megnyitása {#opening-the-channel}

A csatorna megnyitása megköveteli, hogy a résztvevők pénzt dedikáljanak egy okosszerződésbe a főhálózaton. A letét virtuális lapként is funkcionál, így a résztvevő szereplők szabadon bonyolíthatnak tranzakciókat anélkül, hogy a kifizetéseket azonnal el kellene számolniuk. A felek akkor számolnak el egymással, amikor a csatornát véglegesítik a láncban, és ekkor visszavonják a számlájukból megmaradt összeget.

Ez a letét egyben kötvényként is szolgál, amely garantálja a résztvevők becsületes viselkedését. Ha a vitarendezési szakaszban a letéteseket rosszindulatú cselekményekben találják bűnösnek, a szerződés csökkenti a letétjüket.

A csatorna tagjainak alá kell írniuk egy kezdeti állapotot, amelyben mindannyian egyetértenek. Ez szolgál a státuszcsatorna geneziseként, amely után a felhasználók megkezdhetik a tranzakciókat.

### A csatorna használata {#using-the-channel}

A csatorna státuszának inicializálása után a partnerek tranzakciók aláírásával és egymásnak jóváhagyásra történő elküldésével lépnek kapcsolatba egymással. A résztvevők ezekkel a tranzakciókkal státuszváltozásokat kezdeményeznek, és aláírják mások státuszváltozásait. Az egyes tranzakciók a következőkből állnak:

- Egy **nonce**, amely a tranzakciók egyedi azonosítójaként szolgál, és megakadályozza az újrajátszási támadásokat. Azt is azonosítja, hogy a státuszváltozások milyen sorrendben történtek (ami a vitarendezés szempontjából fontos)

- A csatorna korábbi státusza

- A csatorna új státusza

- A státuszváltozást kiváltó tranzakció (pl. Alice 5 ETH-t küld Bobnak)

A csatorna státuszváltozásai nem kerülnek továbbításra a láncon, ahogy az általában a főhálózaton lévő interakciók során történik, ami összhangban van a státuszcsatornák céljával, hogy minimalizálják a láncon belüli lábnyomot. Amíg a résztvevők egyetértenek a státuszváltozásokban, addig azok ugyanolyan véglegesek, mint egy Ethereum-tranzakció. A résztvevőknek csak akkor kell a főhálózat konszenzusára hagyatkozniuk, ha vita merül fel.

### A csatorna lezárása {#closing-the-channel}

Egy státuszcsatorna lezárásához a csatorna végleges, egyeztetett státuszát el kell küldeni a láncban lévő okosszerződésnek. A státuszváltozás részletei között szerepel az egyes résztvevők mozgásának száma és a jóváhagyott tranzakciók listája.

Miután ellenőrizte, hogy a státuszváltozás érvényes-e (azaz minden fél aláírta), az okosszerződés véglegesíti a csatornát, és a zárolt pénzeszközöket a csatorna eredményének megfelelően szétosztja. A láncon kívül teljesített kifizetéseket alkalmazzák az Ethereum státuszára, és minden résztvevő megkapja a zárolt pénzösszeg fennmaradó részét.

A fent leírt eset azt mutatja be, hogy mi történik a szerencsés esetben. Előfordulhat, hogy a felhasználók nem tudnak megegyezni és véglegesíteni a csatornát (ez a szerencsétlen eset). Az alábbiak bármelyike igaz lehet a helyzetre:

- A résztvevők offline állapotba kerülnek, és nem tudnak státuszváltozásokat javasolni

- A résztvevők megtagadják az érvényes státuszváltozások aláírását

- A résztvevők úgy próbálják véglegesíteni a csatornát, hogy egy régi státuszváltozást javasolnak a láncban lévő szerződésnek

- A résztvevők érvénytelen státuszváltozásokat javasolnak másoknak aláírásra

Amikor a konszenzus megszakad egy csatorna résztvevői között, az utolsó lehetőség, hogy a főhálózat konszenzusára támaszkodva érvényesítik a csatorna végleges, érvényes státuszát. Ebben az esetben a státuszcsatorna lezárása megköveteli a viták láncon belüli rendezését.

### Vitarendezés {#settling-disputes}

A csatornában részt vevő felek általában előzetesen megállapodnak a csatorna lezárásáról, és közösen aláírják az utolsó státuszváltozást, amelyet az okosszerződésnek nyújtanak be. Amint a frissítést a láncban jóváhagyták, a láncon kívüli okosszerződés végrehajtása befejeződik, és a résztvevők a pénzükkel együtt elhagyják a csatornát.

Az egyik fél azonban a láncon belül kérést nyújthat be az okosszerződés végrehajtásának befejezésére és a csatorna véglegesítésére – anélkül, hogy megvárná a másik fél jóváhagyását. Ha a korábban leírt konszenzust megtörő helyzetek bármelyike bekövetkezik, bármelyik fél kezdeményezheti, hogy a láncon lévő szerződés lezárja a csatornát és elossza pénzeszközöket. Ez adja a **bizalomigény-mentességet**, biztosítva, hogy a becsületes felek bármikor kiléphetnek a betétjeikből, függetlenül a másik fél cselekedeteitől.

A csatornából való kilépés feldolgozásához a felhasználónak el kell küldenie az alkalmazás utolsó érvényes státuszváltozását a láncon belüli szerződésnek. Ha ez rendben van (azaz minden fél aláírásával ellátott), akkor a pénzeszközöket az ő javukra osztják újra.

Ha csak az egyik felhasználó ad be kilépési kérelmet, annak végrehajtása késedelmet szenved. Ha a csatorna lezárására irányuló kérelmet egyhangúlag jóváhagyták, akkor a láncból való kilépési tranzakciót azonnal végrehajtják.

Az egyfelhasználós kilépéseknél a késleltetés a csalás lehetősége miatt lép életbe. Például egy csatorna résztvevője megpróbálhatja véglegesíteni a csatornát az Ethereumon úgy, hogy egy régebbi státuszváltozást küld a láncra.

Ellenintézkedésként a státuszcsatornák lehetővé teszik a becsületes felhasználók számára, hogy megtámadják az érvénytelen státuszváltozásokat azzal, hogy beadják a csatorna legújabb, érvényes státuszát a láncra. A státuszcsatornák úgy vannak kialakítva, hogy az újabb, egyeztetett státuszváltozások felülmúlják a régebbieket.

Amint egy partner elindítja a láncon belüli vitarendezést, a másik félnek egy bizonyos időn belül (a megkérdőjelezési ablakon belül) válaszolnia kell. Ez lehetővé teszi a felhasználók számára, hogy megtámadják a kilépési tranzakciót, különösen akkor, ha a másik fél elavult státuszt alkalmaz.

Bármi is legyen a helyzet, a csatornahasználóknak mindig erős véglegességi garanciájuk van: ha a birtokukban lévő státuszváltozást az összes tag aláírta, és az a legutóbbi változat, akkor az ugyanolyan véglegességű, mint egy rendes láncon belüli tranzakció. Még mindig meg kell kérdőjelezniük a másik felet a láncban, de az egyetlen lehetséges eredmény az utolsó érvényes státusz véglegesítése, ami az övék.

### Hogyan működnek együtt a státuszcsatornák az Ethereummal? {#how-do-state-channels-interact-with-ethereum}

Bár láncon kívüli protokollként léteznek, a státuszcsatornáknak van egy láncon belüli komponensük: a csatorna megnyitásakor az Ethereumra telepített okosszerződés. Ez a szerződés ellenőrzi a csatornában elhelyezett eszközöket és a státuszváltozásokat, illetve kezeli a résztvevők közötti vitákat.

A státuszcsatornák nem teszik közzé a tranzakciós adatokat vagy a státuszelköteleződéseket a főhálózat felé, ellentétben az [L2](/layer-2/) skálázási megoldásokkal. Azonban jobban kapcsolódnak a főhálózathoz, mint mondjuk a [mellékláncok](/developers/docs/scaling/sidechains/), ami némileg biztonságosabbá teszi őket.

A státuszcsatornák az Ethereum fő protokolljára támaszkodnak a következőkben:

#### 1. Elérhetőség {#liveness}

A csatorna megnyitásakor telepített láncon belüli szerződés felelős a csatorna funkcionalitásáért. Ha a szerződés az Ethereumon fut, akkor a csatorna mindig használható. Ezzel szemben egy melléklánc mindig meghibásodhat, még akkor is, ha a főhálózat működik, veszélyeztetve a felhasználók pénzeszközeit.

#### 2. Biztonság {#security}

A státuszcsatornák bizonyos mértékig az Ethereumra támaszkodnak, hogy biztonságot nyújtsanak és megvédjék a felhasználókat a rosszhiszemű társaiktól. A csatornák csalásbiztos mechanizmust használnak, amely lehetővé teszi a felhasználók számára, hogy megtámadják a csatorna érvénytelen vagy elavult státusszal történő véglegesítésére irányuló kísérleteket.

Ebben az esetben a becsületes fél a csatorna legutóbbi érvényes státuszát adja át csalási bizonyítékként a láncon belüli szerződésnek ellenőrzésre. A csalási bizonyítékok lehetővé teszik a kölcsönösen bizalmatlan felek számára, hogy láncon kívüli tranzakciókat bonyolítsanak le anélkül, hogy ezzel kockáztatnák pénzeszközeiket.

#### 3. Véglegesség {#finality}

A csatorna felhasználói által közösen aláírt státuszváltozások ugyanolyan jónak minősülnek, mint a láncon belüli tranzakciók. Mégis, a csatornán belüli tevékenység csak akkor válik igazán véglegessé, amikor a csatorna lezárul az Ethereumon.

Optimista esetben mindkét fél együttműködhet, és aláírhatja a végső státuszváltozásokat és a láncban történő benyújtást a csatorna lezárása érdekében, majd a pénzeszközök elosztása a csatorna végső státuszának megfelelően történik. A pesszimista esetben, amikor valaki úgy próbál csalni, hogy helytelen státuszváltozást tesz közzé a láncban, a tranzakciót nem véglegesítik, amíg a megkérdőjelezési idő le nem telik.

## Virtuális státuszcsatornák {#virtual-state-channels}

A státuszcsatorna naiv megvalósítása az lenne, hogy új szerződést telepítünk, amikor két felhasználó egy alkalmazást kíván végrehajtani a láncon kívül. Ez nem csak kivitelezhetetlen, de a státuszcsatornák nem lennének költséghatékonyabbak (a láncban felmerülő tranzakciós költségek gyorsan összeadódhatnak).

E probléma megoldására „virtuális csatornákat” hoztak létre. A hagyományos csatornákkal ellentétben, amelyek megnyitásához és lezárásához a láncon belüli tranzakciókra van szükség, a virtuális csatornát a fő lánccal való interakció nélkül lehet megnyitni, végrehajtani és lezárni. Ezzel a módszerrel a vitákat akár a láncon kívül is el lehet rendezni.

Ez a rendszer az úgynevezett „főkönyvi csatornák” létezésére támaszkodik, amelyeket a láncban finanszíroznak. A két fél közötti virtuális csatornákat egy meglévő főkönyvi csatornára lehet építeni, a főkönyvi csatorna tulajdonosa(i) pedig közvetítőként szolgál(nak).

Az egyes virtuális csatornák felhasználói egy új szerződéspéldányon keresztül lépnek kapcsolatba egymással, a főkönyvi csatorna pedig több szerződéspéldányt is képes támogatni. A főkönyvi csatorna státusza egynél több szerződéstárhely státuszt is tartalmaz, lehetővé téve az alkalmazások párhuzamos végrehajtását a láncon kívül a különböző felhasználók között.

A hagyományos csatornákhoz hasonlóan a felhasználók státuszváltozásokat cserélnek a státuszgép működése érdekében. Hacsak nem merül fel vita, a közvetítővel csak a csatorna megnyitásakor vagy megszüntetésekor kell felvenni a kapcsolatot.

### Virtuális fizetési csatornák {#virtual-payment-channels}

A virtuális fizetési csatornák ugyanúgy működnek, mint a virtuális státuszcsatornák: az ugyanahhoz a hálózathoz csatlakozott résztvevők üzeneteket továbbíthatnak anélkül, hogy új csatornát kellene nyitniuk a láncban. A virtuális fizetési csatornákban az átutalásokat egy vagy több közvetítőn keresztül irányítják, és garantálják, hogy csak a címzett kaphatja meg az átutalt összeget.

## Státuszcsatornák felhasználása {#applications-of-state-channels}

### Fizetések {#payments}

A korai blokklánc-csatornák egyszerű protokollok voltak, amelyek lehetővé tették két résztvevő számára, hogy gyors, alacsony díjú átutalásokat hajtsanak végre a láncon kívül anélkül, hogy magas tranzakciós díjakat kellett volna fizetniük a főhálózaton. A fizetési csatornák ma is hasznosak az ether és a tokenek cseréjére és befizetésére tervezett alkalmazások számára.

A csatornán keresztüli kifizetéseknek a következő előnyei vannak:

1. **Tranzakcióátvitel**: A csatornán kívüli tranzakciók mennyisége csatornánként nincs összefüggésben az Ethereum tranzakcióátvitelével, amelyet különböző tényezők befolyásolnak, különösen a blokkméret és a blokkidő. A tranzakciók láncon kívüli végrehajtásával a blokklánccsatornák nagyobb tranzakcióátvitelt érhetnek el.

2. **Privát tranzakciók**: Mivel a csatornák a láncon kívül léteznek, a résztvevők közötti interakciók részletei nem kerülnek rögzítésre az Ethereum nyilvános blokkláncán. A csatornahasználóknak csak a csatornák finanszírozásakor és lezárásakor, illetve a viták rendezésekor kell kapcsolatba lépniük a láncban. Így a csatornák hasznosak azon egyének számára, akik magánjellegű tranzakciókra vágynak.

3. **Késleltetés**: A csatorna résztvevői között végrehajtott, láncon kívüli tranzakciókat azonnal el lehet számolni, ha mindkét fél együttműködik, ami csökkenti a késedelmeket. Ezzel szemben a főhálózaton egy tranzakció elküldéséhez meg kell várni, hogy a csomópontok feldolgozzák a tranzakciót, új blokkot hozzanak létre a tranzakcióval, és konszenzusra jussanak. A felhasználóknak több blokk megerősítésére is várniuk kell, mielőtt a tranzakciót véglegesítettnek tekintik.

4. **Költség**: A státuszcsatornák különösen hasznosak olyan helyzetekben, amikor a résztvevők egy csoportja hosszú időn keresztül sok státuszváltozást intéz egymással. Az egyetlen felmerülő költség a státuszcsatornát jelentő okosszerződés megnyitása és bezárása; e kettő pont közötti minden státuszváltozás olcsóbb lesz, mint az előző, mivel az elszámolási költség ennek megfelelően kerül elosztásra.

A státuszcsatornák használata a második blokkláncrétegen (L2), például [összevont tranzakción](/developers/docs/scaling/#rollups), még vonzóbbá teheti azokat a kifizetések számára. Míg a csatornák olcsó kifizetéseket kínálnak, a nyitási fázisban a főhálőzaton kötött szerződés felállításának költségei drágák lehetnek – különösen, ha a gázdíjak megugranak. Az Ethereum-alapú összevont tranzakciók [alacsonyabb tranzakciós illetékeket](https://l2fees.info/) kínálnak, és csökkenthetik a csatorna résztvevőinek rezsiköltségeit azáltal, hogy csökkentik a felállítás díjait.

### Mikrotranzakciók {#microtransactions}

A mikrotranzakciók olyan kis értékű (pl. a dollár töredékénél alacsonyabb) fizetések, amelyeket a vállalkozások nem tudnak veszteségek nélkül feldolgozni. A pénzforgalmi szolgáltatóknak ki kell fizetniük ezek díjait is, amit nem tudnak megtenni, ha az ügyfélfizetések árrése túl alacsony és nem hoz nyereséget.

A fizetési csatornák úgy oldják meg ezt a problémát, hogy csökkentik a mikrotranzakciókkal járó többletköltségeket. Egy internetszolgáltató (ISP) például fizetési csatornát nyithat egy ügyféllel, lehetővé téve számára, hogy minden egyes alkalommal, amikor igénybe veszi a szolgáltatást, kevesebb tranzakciós díjat kelljen fizetnie.

A csatorna megnyitásának és bezárásának költségén túl a résztvevőknek nem keletkeznek további költségei a mikrotranzakciókkal kapcsolatban (nincs gázdíj). Ez egy mindkét fél számára előnyös helyzet, mivel az ügyfelek rugalmasabban dönthetnek arról, hogy mennyit fizetnek a szolgáltatásokért, a vállalkozások pedig nem veszítik el a jövedelmező mikrotranzakciókat.

### Decentralizált alkalmazások {#decentralized-applications}

A fizetési csatornákhoz hasonlóan a státuszcsatornák is tudnak feltételes kifizetéseket teljesíteni az státuszgép végső státuszainak megfelelően. A státuszcsatornák tetszőleges státuszváltoztatási logikát is támogathatnak, így hasznosak lehetnek általános alkalmazások láncon kívüli végrehajtásához.

A státuszcsatornák gyakran egyszerű, fordulóalapú alkalmazásokra korlátozódnak, mivel ez megkönnyíti a láncon belüli szerződéshez kötött pénzeszközök kezelését. Továbbá, mivel korlátozott számú fél frissíti időközönként a láncon kívüli alkalmazás státuszát, a tisztességtelen viselkedés büntetése viszonylag egyszerű.

Egy státuszcsatorna-alkalmazás hatékonysága annak kialakításától is függ. Egy fejlesztő például egyszer telepítheti az alkalmazáscsatorna-szerződést a láncra, és lehetővé teheti más játékosok számára, hogy újra felhasználják az alkalmazást anélkül, hogy a láncra kellene lépniük. Ebben az esetben az alkalmazás kezdeti csatornája főkönyvi csatornaként szolgál, amely több virtuális csatornát támogat, amelyek mindegyike az alkalmazás okosszerződésének egy-egy új példányát futtatja a láncon kívül.

A státuszcsatorna-alkalmazások egyik lehetséges felhasználási területe azok a kétszereplős játékok, ahol a pénzeszközök elosztása a játék kimenetele alapján történik. Ennek előnye, hogy a játékosoknak nem kell megbízniuk egymásban (bizalomigény-mentesség), és a láncon belüli szerződés, nem pedig a játékosok irányítják a pénzeszközök elosztását és a viták rendezését (decentralizáció).

A státuszcsatorna-alkalmazások egyéb lehetséges felhasználási esetei közé tartozik az ENS névtulajdonlás, az NFT főkönyvek és még sok más.

### Atomikus átutalások {#atomic-transfers}

A korai fizetési csatornák két fél közötti átutalásokra korlátozódtak, ami korlátozta használhatóságukat. A virtuális csatornák bevezetése azonban lehetővé tette az egyének számára, hogy közvetítőkön (több peer-to-peer csatornán) keresztül irányítsák az átutalásokat anélkül, hogy új csatornát kellett volna nyitniuk a láncban.

A „többugrásos átutalásoknak” nevezett, útválasztásos fizetések atomikusak (azaz vagy a tranzakció minden része sikeres, vagy a tranzakció teljes egészében meghiúsul). Az atomikus átutalások [hash-elt időzáras szerződések (HTLC/Hashed Timelock Contracts)](https://en.bitcoin.it/wiki/Hash_Time_Locked_Contracts) használatával biztosítják, hogy a kifizetés csak bizonyos feltételek teljesülése esetén szabadul fel, csökkentve ezzel a partnerkockázatot.

## A státuszcsatornák használatának hátrányai {#drawbacks-of-state-channels}

### Elérhetőségi feltételezések {#liveness-assumptions}

A hatékonyság biztosítása érdekében a státuszcsatornák időkorlátokat szabnak a csatorna résztvevőinek a vitákra való reagálásra. Ez a szabály feltételezi, hogy a társak mindig online lesznek, hogy figyelemmel kísérhessék a csatorna tevékenységét, és szükség esetén megkérdőjelezzék azt.

A valóságban a felhasználók rajtuk kívül álló okokból (pl. rossz internetkapcsolat, mechanikai meghibásodás stb.) offline állapotba kerülhetnek. Ha egy becsületes felhasználó offline állapotba kerül, egy rosszindulatú partner kihasználhatja a helyzetet azáltal, hogy régi köztes státuszokat mutat be az elbíráló szerződésnek, és ellopja a lekötött pénzeszközöket.

Egyes csatornák „őrtornyokat” használnak, amelyek feladata, hogy mások nevében figyeljék a láncban zajló vitás eseményeket, és megtegyék a szükséges lépéseket, például figyelmeztessék az érintett feleket. Ez azonban növeli a státuszcsatorna használatának költségeit.

### Az adatok elérhetetlensége {#data-unavailability}

Amint azt korábban kifejtettük, egy érvénytelen vita megtámadásához a státuszcsatorna legutóbbi, érvényes státuszának bemutatása szükséges. Ez egy másik szabály, amely azon a feltételezésen alapul, hogy a felhasználók hozzáférnek a csatorna legutóbbi státuszáhoza.

Bár ésszerű elvárni a csatorna felhasználóitól, hogy tárolják a láncon kívüli alkalmazások státuszmásolatait, ezek az adatok hiba vagy mechanikai meghibásodás miatt elveszhetnek. Ha a felhasználónak nincs biztonsági mentése az adatokról, csak abban reménykedhet, hogy a másik fél nem véglegesít egy érvénytelen kilépési kérelmet a birtokában lévő régi státuszváltozásokkal.

Az Ethereum felhasználóinak nem kell ezzel a problémával szembenézniük, mivel a hálózat érvényre juttatja az adatelérhetőségre vonatkozó szabályokat. A tranzakciós adatokat minden csomópont tárolja és továbbítja, és szükség esetén a felhasználók számára letölthetők.

### Likviditási problémák {#liquidity-issues}

Egy blokklánccsatorna létrehozásához a résztvevőknek a csatorna életciklusa alatt le kell kötniük a pénzeszközöket egy láncon belüli okosszerződésben. Ez csökkenti a csatornák felhasználóinak likviditását, és a csatornákat azokra korlátozza, akik megengedhetik maguknak, hogy a főhálózaton tartsák a pénzüket.

A főkönyvi csatornák azonban – amelyeket egy láncon kívüli szolgáltató (OSP) üzemeltet – csökkenthetik a felhasználók likviditási problémáit. Egy főkönyvi csatornához csatlakozott két résztvevő létrehozhat egy virtuális csatornát, amelyet bármikor megnyithatnak és véglegesíthetnek teljesen a láncon kívül, amikor csak akarnak.

A láncon kívüli szolgáltatók is nyithatnak csatornákat több partnerrel, így fizetésre hasznosak lehetnek. Természetesen a felhasználóknak díjat kell fizetniük az OSP-knek a szolgáltatásaikért, ami egyesek számára nem kívánatos.

### Károkozó támadások (griefing) {#griefing-attacks}

A csalási bizonyítékra épülő rendszerek jellemzője lehet a károkozó támadás. A károkozó támadás nem hoz közvetlen hasznot a támadónak, inkább kárt okoz az áldozatnak.

A csalási bizonyítás érzékeny a károkozó támadásokra, mivel a becsületes félnek minden vitára válaszolnia kell, még az érvénytelenekre is, különben elveszítheti a pénzét. Egy rosszindulatú résztvevő dönthet úgy, hogy ismételten elavult státuszváltozásokat küld a láncba, így kényszerítve a becsületes felet, hogy az érvényes státusszal válaszoljon. A láncon belüli tranzakciók költségei gyorsan összeadódhatnak, ami a tisztességes felek számára veszteséget okozhat.

### Előre meghatározott résztvevőhalmaz {#predefined-participant-sets}

A státuszcsatornát alkotó résztvevők száma eleve állandó marad a csatorna teljes élettartama alatt. Ennek oka, hogy a résztvevőhalmaz frissítése megnehezítené a csatorna működését, különösen a csatorna finanszírozása vagy a viták rendezése során. A résztvevők hozzáadása vagy eltávolítása további láncon belüli tevékenységet is igényelne, ami növeli a felhasználók terheit.

Bár ez megkönnyíti a státuszcsatornák értelmezését, korlátozza a csatornatervek hasznosságát az alkalmazásfejlesztők számára. Ez részben megmagyarázza, hogy miért hagyták el a státuszcsatornákat más skálázási megoldások, például az összevont tranzakciók javára.

### Párhuzamos tranzakciófeldolgozás {#parallel-transaction-processing}

A státuszcsatorna résztvevői felváltva küldik a státuszváltozásokat, ezért a legjobban „fordulóalapú alkalmazásokban” (pl. egy kétjátékos sakkjátékban) működnek. Ez kiküszöböli az egyidejű státuszváltozások kezelésének szükségességét, és csökkenti azt a munkát, hogy az elavult státuszt adó résztvevőt meg kelljen büntetni. Ennek a kialakításnak azonban az a mellékhatása, hogy a tranzakciók egymástól függenek, ami növeli a késleltetést és rontja az általános felhasználói élményt.

Egyes státuszcsatornák úgy oldják meg ezt a problémát, hogy „teljes kétirányú” kialakítást alkalmaznak, amely a láncon kívüli státuszt két egyirányú státuszra osztja, lehetővé téve az egyidejű státuszváltozást. Az ilyen kialakítások javítják a láncon kívüli tranzakcióátvitelt és csökkentik a tranzakciók késedelmét.

## Státuszcsatornák használata {#use-state-channels}

Több projekt is kínál olyan státuszcsatorna-implementációkat, amelyeket Ön is beépíthet a dappjaiba:

- [Connext](https://connext.network/)
- [Kchannels](https://www.kchannels.io/)
- [Perun](https://perun.network/)
- [Raiden](https://raiden.network/)
- [Statechannels.org](https://statechannels.org/)

## További olvasnivaló {#further-reading}

**Állapot csatornák**

- [Az Ethereum L2-es skálázási megoldásainak értelmezése: státuszcsatornák, plazma és truebit](https://medium.com/l4-media/making-sense-of-ethereums-layer-2-scaling-solutions-state-channels-plasma-and-truebit-22cb40dcc2f4) _– Josh Stark, 2018. február 12._
- [Státuszcsatornák bemutatása](https://www.jeffcoleman.ca/state-channels/) _2015. november 6., Jeff Coleman_
- [Státuszcsatornák alapjai](https://education.district0x.io/general-topics/understanding-ethereum/basics-state-channels/) _District0x_
- [Blokklánc státuszcsatornák: a technika jelenlegi állása](https://ieeexplore.ieee.org/document/9627997)

_Ismer olyan közösségi információforrást, amely a hasznára vált? Módosítsa az oldalt, és adja hozzá!_
