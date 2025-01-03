---
title: Hidak
description: Fejlesztőknek szóló áttekintés a hidakról
lang: hu
---

Az L1 blokkláncok és az L2 [skálázási](/developers/docs/scaling/) megoldások elterjedésével, valamint az egyre növekvő számú, láncokon átívelő, decentralizált alkalmazással a hálózati infrastruktúra alapvető részévé vált a láncok közötti kommunikáció és eszközmozgás. Különböző típusú hidak léteznek, hogy ezt lehetővé tegyék.

## A hidak szükségessége {#need-for-bridges}

Léteznek hidak a blokklánc-hálózatok összekapcsolására. Lehetővé teszik a blokkláncok közötti összekapcsolhatóságot és átjárhatóságot.

A blokkláncok elkülönült környezetben léteznek, ami azt jelenti, hogy a blokkláncok nem tudnak természetes módon kereskedni és kommunikálni más blokkláncokkal. Emiatt, bár egy ökoszisztémán belül jelentős tevékenység és innováció valósulhat meg, ezt mégis korlátozza a más ökoszisztémákkal való összekapcsolhatóság és interoperabilitás hiánya.

A hidak lehetőséget nyújtanak arra, hogy az elszigetelt blokklánc-környezetek összekapcsolódjanak egymással. Olyan útvonalat hoznak létre a blokkláncok között, ahol tokenek, üzenetek, tetszőleges adatok és akár [okosszerződés](/developers/docs/smart-contracts/) meghívások is átvihetők egyik láncból a másikba.

## A hidak előnyei {#benefits-of-bridges}

A hidak számos felhasználási módot tesznek lehetővé azáltal, hogy a blokklánchálózatok számára az adatcserét és az eszközmozgatást biztosítanak.

A blokkláncok egyedi erősségekkel, gyengeségekkel és megközelítésekkel rendelkeznek az alkalmazások építésében (például sebesség, tranzakcióátvitel, költségek stb.). A hidak azáltal is segítik a teljes kriptoökoszisztéma fejlődését, hogy a blokkláncok felhasználhatják egymás innovációit.

A fejlesztők számára a hidak a következőket biztosítják:

- bármely adat, információ és eszköz átadása a láncok között.
- új funkciók és felhasználási esetek bevezetése a protokollok számára, mivel a hidak kibővítik azok tervezési lehetőségeit. Például egy eredetileg az Ethereum fő hálózatra telepített hozamgyűtjő protokoll likviditási alapokat kínálhat az összes EVM-kompatibilis láncban.
- kihasználhatóvá válnak a különböző blokkláncok erősségei. A fejlesztők például kihasználhatják a különböző L2-megoldások által kínált alacsonyabb díjakat azáltal, hogy dappjaikat az összevont tranzakciókra építik, a mellékláncok és a felhasználók pedig a hidakkal használhatják ezeket.
- együttműködés a különböző blokklánc-ökoszisztémák fejlesztői között új termékek létrehozására.
- különböző ökoszisztémák felhasználóit és közösségeit vonzzák a dappjaikhoz.

## Hogyan működnek a hidak? {#how-do-bridges-work}

Bár számos [híddizájn](https://li.fi/knowledge-hub/blockchain-bridges-and-classification/) létezik, az eszközök láncok közötti mozgatásának három módja kiemelkedik:

- **Zárolás és mintelés – ** Eszközök zárolása a forrásláncon és kibocsátása (mintelése) a célláncon.
- **Elégetés és mintelés –** A forrásláncban lévő eszközök égetése és azok kibocsátása (mintelés) a célláncon.
- **Atomikus átváltás –** A forrásláncon lévő eszközök átváltása a célláncon lévő eszközökre egy másik féllel.

## Hídtípusok {#bridge-types}

A hidak általában a következő kategóriák egyikébe esnek:

- **Natív hidak –** Ezeket jellemzően azért építik, hogy egy adott blokkláncon a likviditást beindítsák, megkönnyítve a felhasználók számára a pénzeszközök mozgatását az ökoszisztémába. Az [Arbitrum-híd](https://bridge.arbitrum.io/) például azért jött létre, hogy a felhasználók kényelmesen át tudjanak hidalni az Ethereum fő hálózatról az Arbitrumra. Hasonló még a Polygon PoS híd, az [Optimism Gateway](https://app.optimism.io/bridge) stb.
- **Validátor- vagy orákulumalapú hidak –** Ezek külső validátorkészletre vagy orákulumokra támaszkodnak a láncközi átvitelekhez. Például a Multichain és az Across.
- **Általános üzenettovábbító hidak –** Ezek képesek eszközök, üzenetek és tetszőleges adatok láncok közötti átvitelére. Például: Axelar, LayerZero és Nomad.
- **Likviditási hálózatok –** Ezek elsősorban az eszközök egyik láncból a másikba történő átvitelére összpontosítanak atomikus átváltások révén. Általában nem támogatják a láncok közötti üzenettovábbítást. Például a Connext és a Hop.

## A kompromisszumok, melyeket figyelembe kell venni {#trade-offs}

A hidakra vonatkozóan nincsenek tökéletes megoldások. Ehelyett olyan kompromisszumok léteznek, melyek adott célra irányulnak. A fejlesztők és a felhasználók a következő tényezők alapján értékelhetik a hidakat:

- **Biztonság –** Kik biztosítják a rendszert? A külső validátorok által biztosított hidak általában kevésbé biztonságosak, mint a blokklánc validátorai által helyileg vagy natívan biztosítottak.
- **Kényelem –** Mennyi ideig tart végrehajtani egy tranzakciót, és mennyit kell aláírnia a felhasználónak? A fejlesztőnek az számít továbbá, hogy mennyi ideig tart integrálni a hidat, és mennyire bonyolult ez a folyamat?
- **Csatlakozási lehetőségek –** Az adott híd milyen láncokhoz tud kapcsolódni (például összevont tranzakciókhoz, mellékláncokhoz, más L1 blokkláncokhoz stb.), és mennyire bonyolult egy új blokkláncot integrálni rá?
- **Összetettebb adatok továbbítási lehetősége –** Tud esetleg a híd üzeneteket és összetettebb, tetszőleges adatokat továbbítani a láncokra, vagy csak láncok közötti eszköztranszfert támogat?
- **Költséghatékonyság –** Mennyibe kerül az eszközök láncok közötti átadása egy hídon keresztül? A hidak jellemzően fix vagy változó díjat számítanak fel a gázköltségektől és az egyes útvonalak likviditásától függően. Az is fontos, hogy értékeljük a híd költséghatékonyságát azon tőke alapján, amelyet a biztonságának biztosításához használnak.

A hidakat kategorizálhatjuk aszerint, hogy igényelnek bizalmat vagy sem.

- **Bizalomigényű –** Az ilyen hidakat külsődlegesen biztosítják. A láncok közötti adatátvitelhez külső biztosítókat használnak (többaláírásos, többszereplős számítási rendszerek, orákulumhálózat). Emiatt képesek jó kapcsolódási lehetőséget és általánosított üzenettovábbítást biztosítani láncok között. Emellett a sebesség és a költséghatékonyság szempontjából is jók. Ez a biztonság rovására megy, mivel a felhasználóknak a híd biztonságára kell hagyatkozniuk.
- **Bizalomigény nélküli –** Ezek a hidak az általuk összekötött blokkláncokra és azok validátoraira támaszkodnak az üzenetek és a tokenek átvitelében. Ezek bizalomigény nélküliek, mert nem adnak hozzá új bizalmi feltételezéseket (a blokkláncokon túl). Ennek eredményeképpen a bizalomigénymentes hidak biztonságosabbnak tekinthetők, mint a bizalomigénnyel működők.

Ahhoz, hogy a bizalomigény nélküli hidakat más tényezők alapján értékelni tudjuk, általános üzenettovábbító hidakra és likviditási hálózatokra kell bontanunk azokat.

- **Általános üzenettovábbító hidak –** Ezek jellemzője, hogy biztonságot és összetettebb adatok láncokon keresztüli továbbítását kínálják. Jellemzően költséghatékonyak is. Ezek az erősségek azonban hátrányt okoznak más fronton: a könnyű ügyfélhidaknál (mint az IBC) az összekapcsolhatóságban, a csalási bizonyítást használó optimista hidaknál (mint a Nomad) a sebességben.
- **Likviditási hálózatok –** Ezek atomikus átváltásokat használnak az eszközök átruházására, és helyileg ellenőrzött rendszerek (a tranzakciók ellenőrzésére a mögöttes blokkláncok validálóit használják). Ennek eredményeképpen a biztonság és a gyorsaság terén is kiemelkednek. Ráadásul viszonylag költséghatékonyak és jó csatlakozási lehetőségeket kínálnak. A legnagyobb kompromisszum azonban az, hogy nem képesek összetettebb adatok továbbítására, mivel nem támogatják a láncok közötti üzenetátvitelt.

## A hidak használatának kockázata {#risk-with-bridges}

A hidak felelősek a [decentralizált pénzügyek (DeFi) három legnagyobb meghackelését](https://rekt.news/leaderboard/), és még a fejlesztés korai szakaszában vannak. A hidak használata a következő kockázatokkal jár:

- **Okosszerződés-kockázat –** Bár sok híd sikeresen átment az ellenőrzéseken, elég egyetlen hiba egy okosszerződésben, hogy az eszközök sebezhetővé váljanak a hackerekkel szemben (például a [Solana féreglyukhídja](https://rekt.news/wormhole-rekt/) esetében).
- **Szisztematikus pénzügyi kockázatok** – Számos híd használja a csomagolt eszközöket arra, hogy az eredeti eszköz kanonikus változatait egy új láncon bocsássa ki (minting). Ez rendszerszintű kockázatnak teszi ki az ökoszisztémát, mivel a tokenek csomagolt változatait kihasználhatják.
- **Partnerkockázat –** Egyes hidak olyan konstrukciót használnak, amelyben a felhasználóknak bízniuk kell abban, hogy a validátorok nem játszanak össze a pénzeszközök ellopásáért. Mivel a felhasználóknak meg kell bízniuk harmadik fél szereplőkben, olyan kockázatoknak teszi ki őket, mint a rug pull (az eszköz mögül eltűnik a csapat és a pénz), a cenzúra és más rosszindulatú tevékenységek.
- **Nyitott problémák –** Mivel a hidak a fejlesztés kezdeti szakaszában vannak, számos megválaszolatlan kérdés van azzal kapcsolatban, hogyan fognak teljesíteni különböző piaci körülmények között, például hálózati torlódások idején és előre nem látható események, mint a hálózati szintű támadásoknál vagy státuszok visszaállításakor. Ez a bizonytalanság bizonyos kockázatokat rejt magában, amelyek mértéke még nem ismert.

## Hogyan tudják a dappok a hidakat használni? {#how-can-dapps-use-bridges}

Íme néhány gyakorlati alkalmazás, amelyet a fejlesztők megfontolhatnak a hidakkal és a dappok láncok közötti használatával kapcsolatban:

### Hidak integrálása {#integrating-bridges}

A fejlesztők számos módon adhatnak hozzá hidakat:

1. **Saját híd építése –** Biztonságos és megbízható hidat építeni nem könnyű, különösen, ha a bizalomigény minimalizálása fontos. Ezenkívül többéves tapasztalatot és műszaki szakértelmet igényel a skálázhatósági és interoperabilitási tanulmányok miatt. Továbbá egy gyakorlatias csapatra lenne szükség a híd fenntartásához, és elegendő likviditás bevonása is szükséges, hogy ez megvalósítható legyen.

2. **Több hídválasztási lehetőség megjelenítése a felhasználóknak–** Számos [dapp](/developers/docs/dapps/) megköveteli, hogy a felhasználók rendelkezzenek natív tokennel, hogy kapcsolatba léphessenek velük. Annak érdekében, hogy a felhasználók hozzáférhessenek a tokenjeikhez, különböző áthidalási lehetőségeket kínálnak a weboldalukon. Ez a módszer átmeneti megoldás a probléma megoldására, mivel a felhasználót eltávolítja a dappfelülettől, de továbbra is kölcsönhatásban kell maradnia más dappokkal és hidakkal. Emiatt nehéz a belépés, és ezzel együtt a hibák lehetősége is megnő.

3. **Híd integrálása –** Ekkor a dappnak nem kell egy külső hídra és DEX-interfészekre küldenie a felhasználókat. Így a dappok képesek javítani a felhasználói élményt. Ennek azonban megvannak a maga korlátai:

   - A hidak kiértékelése és karbantartása nehéz és időigényes.
   - Egy adott híd kiválasztása egyetlen meghibásodási pontot és függőséget hoz létre.
   - A dappot bekorlátozzák a híd képességei.
   - A hidak magukban nem feltétlen elegek. Előfordulhat, hogy a dappoknak DEX-ekre is szükségük van, hogy olyan funkciókat is biztosíthassanak, mint a láncok közötti átváltások.

4. **Több híd integrálása –** Ez a megoldás számos problémát megold, amelyek akkor merülnek fel, amikor egyetlen hidat integrálunk. Ugyanakkor ennek is vannak korlátai, mivel több híd integrálása erőforrásigényes, és technikai és kommunikációs többletköltséget is jelent a fejlesztők számára – ami a kriptográfia legszűkösebb erőforrása.

5. **Hídaggregátor integrálása –** Egy másik lehetőség a dappok számára egy hídaggregációs megoldás integrálása, amely hozzáférést biztosít több hídhoz. A hídaggregátorok a hidak erősségeit öröklik, és nem korlátozzák őket egyetlen híd képességei sem. A hídaggregátorok jellemzően fenntartják a hídintegrációkat, így a dappnak nem kell a hídintegráció technikai és üzemeltetési szempontjaival is foglalkoznia.

Ennek ellenére a hídaggregátoroknak is megvannak a maguk korlátai. Bár több áthidalási lehetőséget kínálnak, jellemzően sokkal több híd található a piacon az aggregátor platformján kínáltakon kívül. Ráadásul a hidakhoz hasonlóan a hídaggregátorok is ki vannak téve az okosszerződésekkel és a technológiával kapcsolatos kockázatoknak (több okosszerződés = több kockázat).

Ha egy dapp egy híd vagy egy aggregátor integrációját választja, az integráció mélységétől függően különböző lehetőségek állnak rendelkezésre. Ha például csak egy front-end integrációról van szó, amely javítja a felhasználó belépési élményét, akkor a dapp a widgetet (eszközt) integrálja. Ha azonban az integráció célja a mélyebb, láncközi stratégiák, például a letétbe helyezés, a hozamgyűjtés stb. felfedezése, akkor a dapp az SDK-t vagy az API-t integrálja.

### Egy dapp telepítése több láncra {#deploying-a-dapp-on-multiple-chains}

Egy dapp több láncra történő telepítéséhez a fejlesztők olyan fejlesztési platformokat használhatnak, mint az [Alchemy](https://www.alchemy.com/), [Hardhat](https://hardhat.org/), [Moralis](https://moralis.io/) stb. Ezek a platformok olyan összeállítható bővítményekkel rendelkeznek, amelyek lehetővé teszik a dappoknak a láncok közötti átjárhatóságot. A fejlesztők például használhatják a [hardhat-deploy plugin](https://github.com/wighawag/hardhat-deploy) által kínált determinisztikus telepítési proxyt.

#### Példák:

- [Hogyan építsünk láncok közötti dappokat](https://moralis.io/how-to-build-cross-chain-dapps/)
- [Láncközi NFT piactér létrehozása](https://youtu.be/WZWCzsB1xUE)
- [Moralis: Láncközi NFT dappok építése](https://www.youtube.com/watch?v=ehv70kE1QYo)

### A szerződéses tevékenység nyomon követése a láncok között {#monitoring-contract-activity-across-chains}

A láncok szerződéses tevékenységének nyomon követéséhez a fejlesztők algráfokat és fejlesztői platformokat, például a Tenderly-t használhatják az okosszerződések valós idejű megfigyelésére. Az ilyen platformok olyan eszközökkel is rendelkeznek, amelyek nagyobb adatfigyelési funkciókat kínálnak a láncközi tevékenységekhez, mint például a szerződések által kibocsátott [események ellenőrzése](https://docs.soliditylang.org/en/v0.8.14/contracts.html?highlight=events#events) stb.

#### Eszközök

- [The Graph](https://thegraph.com/en/)
- [Tenderly](https://tenderly.co/)

## További olvasnivaló {#further-reading}

- [Blokklánc-hidak](/bridges/) – ethereum.org
- [Blokklánc-hidak: Kriptohálózatok hálózatának kiépítése](https://medium.com/1kxnetwork/blockchain-bridges-5db6afac44f8) 2021. szeptember 8. – Dmitriy Berenzon
- [Az interoperabilitási trilemma](https://blog.connext.network/the-interoperability-trilemma-657c2cf69f17) 2021. október 1. – Arjun Bhuptani
- [Clusters: Hogyan alakítják a bizalomigénytől mentes és a minimális bizalomigényű hidak a többláncos képet?](https://blog.celestia.org/clusters/) 2021. október 4. – Mustafa Al-Bassam
- [LI.FI: A hidaknál a bizalomigény széles tartománya van jelen](https://blog.li.fi/li-fi-with-bridges-trust-is-a-spectrum-354cd5a1a6d8) 2022. április 28. – Arjun Chand

Ezen kívül [James Prestwich](https://twitter.com/_prestwich) tanulságos előadásai segíthetnek a hidak mélyebb megértésében:

- [Hidakat építsünk, ne fallal körülvett kerteket](https://youtu.be/ZQJWMiX4hT0)
- [A hidak részletes bemutatása](https://youtu.be/b0mC-ZqN8Oo)
- [Miért fontosak a hidak](https://youtu.be/c7cm2kd20j8)
