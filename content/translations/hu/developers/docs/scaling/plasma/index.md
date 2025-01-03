---
title: Plazmaláncok
description: Bevezetés a plazmaláncokba, az Ethereum közössége által használt skálázási megoldásba.
lang: hu
incomplete: true
sidebarDepth: 3
---

A plazmalánc egy külön blokklánc, amely az Ethereum főhálózathoz van rögzítve, de a tranzakciókat a láncon kívül hajtja végre, saját blokkvalidálási mechanizmussal. A plazmaláncokat néha „gyerekláncoknak” is nevezik, mivel lényegében az Ethereum főhálózat kisebb másolatai. A plazmaláncok [csalási bizonyítékokat](/glossary/#fraud-proof) használnak (ahogy az [optimista összevont tranzakciók](/developers/docs/scaling/optimistic-rollups/)), hogy így döntsék el a vitákat.

A Merkle-fák lehetővé teszik ezen láncok végtelen halmazának létrehozását, amelyek képesek a szülői láncok (beleértve az Ethereum főhálózatot is) sávszélességének tehermentesítésére. Bár ezek a láncok az Ethereumból merítenek némi biztonságot (csalási bizonyítékokon keresztül), biztonságukat és hatékonyságukat számos tervezési korlát befolyásolja.

## Előfeltételek {#prerequisites}

A jelen téma könnyebb megértéséhez érdemes ismernie az alapvető témaköröket és az [Ethereum skálázását](/developers/docs/scaling/).

## Mi az a plazma?

A plazma egy keretrendszer a nyilvános blokkláncok, például az Ethereum skálázhatóságának javítására. Az eredeti [plazma fehérkönyv](http://plasma.io/plasma.pdf) leírása szerint a plazmaláncok egy másik blokkláncra (az úgynevezett „gyökérláncra”) épülnek. Minden „gyereklánc” a gyökérláncból indul ki, és általában a szülői láncra telepített okosszerződés kezeli.

A plazmaszerződés többek között [hídként](/developers/docs/bridges/) működik, amely lehetővé teszi a felhasználók számára az eszközök mozgatását az Ethereum főhálózat és a plazmalánc között. Bár emiatt nagyon hasonlítanak a [mellékláncokhoz](/developers/docs/scaling/sidechains/), a plazmaláncok viszont – bizonyos mértékig – az Ethereum főhálózat biztonságából profitálnak. Ez ellentétben áll a mellékláncokkal, amelyek maguk felelnek a biztonságukért.

## Hogyan működik a plazma?

A plazmakeretrendszer alapvető összetevői a következők:

### Láncon kívüli számítás {#off-chain-computation}

Az Ethereum jelenlegi feldolgozási sebessége kb. 15–20 tranzakcióra korlátozódik másodpercenként, ami csökkenti annak lehetőségét, hogy rövid távon skálázásható legyen és több felhasználót tudjon kezelni. Ez a probléma elsősorban azért áll fenn, mert az Ethereum [konszenzusmechanizmusa](/developers/docs/consensus-mechanisms/) sok egyenrangú csomópontot igényel a blokklánc státuszváltozásainak ellenőrzéséhez.

Bár az Ethereum konszenzusmechanizmusa szükséges a biztonsághoz, nem biztos, hogy minden felhasználási esetre alkalmazható. Például ha Alice naponta fizetett Bobnak egy csésze kávét, akkor ezeket az összegeket nem feltétlen kell az egész Ethereum-hálózatnak ellenőriznie, mivel a felek között fennáll némi bizalom.

A plazma feltételezi, hogy az Ethereum főhálózatának nem kell minden tranzakciót ellenőriznie. Ehelyett a tranzakciókat a főhálózaton kívül is feldolgozhatjuk, így a csomópontoknak nem kell minden tranzakciót hitelesíteniük.

Láncon kívüli számításra van szükség, hogy a plazmaláncok optimalizálhassák a sebességet és a költségeket. Például a plazmalánc alkalmazhat egy operátort a tranzakciók sorrendjének és végrehajtásának kezelésére – és a legtöbbször így is tesz. Mivel csak egy entitás ellenőrzi a tranzakciókat, a plazmalánc feldolgozási ideje gyorsabb, mint az Ethereum főhálózaté.

### Státuszrögzítések {#state-commitments}

Bár a plazma a tranzakciókat a láncon kívül hajtja végre, azok elszámolása az Ethereum fő végrehajtási rétegén történik – ellenkező esetben a plazmaláncok nem élvezhetik az Ethereum biztonsági garanciáit. De a láncon kívüli tranzakciók véglegesítése a plazmalánc státuszának ismerete nélkül megtörné a biztonsági modellt, és lehetővé tenné az érvénytelen tranzakciók elterjedését. Ezért az operátornak, aki a plazmalánc blokkjainak előállításáért felel, rendszeresen közzé kell tennie az Ethereumban a státuszelköteleződéseket.

Az [elköteleződési séma](https://en.wikipedia.org/wiki/Commitment_scheme) egy olyan kriptográfiai technika, amellyel egy érték vagy állítás mellett elköteleződhetünk anélkül, hogy azt egy másik fél számára felfednénk. Az elköteleződések abban az értelemben köteleznek, hogy nem változtathatja meg az értéket vagy az állítást, ha már elkötelezte magát mellette. A státuszelköteleződések a plazmában Merkle-gyökerek formájában jelennek meg (egy [Merkle-fából](/whitepaper/#merkle-trees)), amelyeket az operátor időközönként elküld a plazmaszerződésnek az Ethereum-láncon.

A Merkle-gyökerek olyan kriptográfiai primitívek, amelyek lehetővé teszik nagy mennyiségű információ tömörítését. Egy Merkle-gyökér (ebben az esetben „blokkgyökér”) egy blokkban lévő összes tranzakciót képviselhet. A Merkle-gyökerek megkönnyítik annak ellenőrzését is, hogy egy kis adatdarab része-e a nagyobb adathalmaznak. A felhasználó például előállíthat egy [Merkle-bizonyítékot](/developers/tutorials/merkle-proofs-for-offline-data-integrity/#main-content), hogy igazolja, egy tranzakció része egy adott blokknak.

A Merkle-gyökerek fontosak, hogy az Ethereum számára információt adjanak a láncon kívüli státuszról. A Merkle-gyökerekre úgy is gondolhatunk, mint „mentési pontokra”: az operátor kijelenti, hogy „ez a plazmalánc státusza x időpontban, és ez a Merkle-gyökér a bizonyíték”. Az operátor a Merkle-gyökérrel elköteleződik a plazmalánc _aktuális státuszára_, ezért nevezik státuszelköteleződésnek.

### Belépés és kilépés {#entries-and-exits}

Ahhoz, hogy az Ethereum-felhasználók kihasználhassák a plazma előnyeit, szükség van egy olyan mechanizmusra, amely lehetővé teszi a pénzeszközök mozgatását a főhálózat és a plazmaláncok között. Nem küldhetünk tetszőlegesen ethert egy plazmaláncon lévő címre – ezek a láncok nem kompatibilisek, így a tranzakció vagy meghiúsulna, vagy elveszne a pénz.

A plazma egy Ethereumon futó főszerződést használ a felhasználói belépések és kilépések feldolgozására. Ez a főszerződés felelős a státuszkötelezvények követéséért és a tisztességtelen viselkedés büntetéséért csalási bizonyítékok révén (erről később lesz még szó).

#### Belépés a plazmaláncba {#entering-the-plasma-chain}

A plazmaláncba való belépéshez Alice-nek (a felhasználónak) ETH-t vagy bármely ERC-20 tokent kell befizetnie a plazmaszerződésbe. A plazmaoperátor, aki figyeli a szerződésbefizetéseket, létrehoz egy összeget, mely megegyezik Alice kezdeti befizetésével, és felszabadítja azt a plazmaláncban lévő címére. Alice-nak tanúsítania kell, hogy a gyerekláncban megkapta a pénzeszközöket, majd ezeket tranzakciókra használhatja.

#### Kilépés a plazmaláncból {#exiting-the-plasma-chain}

A plazmaláncból való kilépés több okból is bonyolultabb, mint a belépés. A legnagyobb nehézség az, hogy bár az Ethereum rendelkezik információkkal a plazmalánc státuszáról, nem tudja ellenőrizni, hogy az információ igaz-e vagy sem. Egy rosszhiszemű felhasználó téves állításokat tehet (például: „van 1000 ETH-em”), és megúszhatja azzal, hogy hamis bizonyítékokkal támasztja alá az állítását.

A hamis visszavonások megelőzése érdekében „megkérdőjelezési időszakot” vezetnek be. A megkérdőjelezési időszak alatt (általában egy hét) bárki megtámadhat egy kifizetési kérelmet csalási bizonyítékkal. Ha a megkérdőjelezés sikeres, akkor a visszavonási kérelmet elutasítják.

Általában azonban az a helyzet, hogy a felhasználók őszinték, és helyes állításokat tesznek a tulajdonukban lévő pénzeszközökről. Ebben az esetben Alice kezdeményez egy kivételi kérelmet a gyökérláncon (Ethereum) egy tranzakció benyújtásával a plazmaszerződéshez.

Emellett egy Merkle-bizonyítékot is be kell nyújtania, amely igazolja, hogy a plazmaláncban a pénzét létrehozó tranzakció bekerült egy blokkba. Erre a Plazma olyan iterációi esetében van szükség, mint például a [plazma MVP](https://www.learnplasma.org/en/learn/mvp.html), amelyek [el nem költött tranzakciós kimenet (UTXO/Unspent Transaction Output)](https://en.wikipedia.org/wiki/Unspent_transaction_output) modellt használnak.

Mások, mint például a [plazma Cash](https://www.learnplasma.org/en/learn/cash.html), UTXO-k helyett [nem helyettesíthető tokenek (NFT)](/developers/docs/standards/tokens/erc-721/) formájában jelenítik meg a pénzalapokat. A pénzeszköz kivételéhez ebben az esetben a tokenek tulajdonjogának igazolása szükséges a plazmaláncon. Ez úgy történik, hogy a tokent érintő két legutóbbi tranzakciót benyújtja, és Merkle-bizonyítékkal igazolja, hogy ezek a tranzakciók bekerültek egy blokkba.

A felhasználónak a tisztességes viselkedés garanciájaként a visszavonási kérelemhez biztosítékot is kell adnia. Ha a megkérdőjelező bebizonyítja, hogy Alice visszavonási kérelme érvénytelen, akkor a kötelezvényének értékét csökkentik, és annak egy része jutalomként a megkérdőjelezőhöz kerül.

Ha a megkérdőjelezési időszak anélkül telik el, hogy valaki csalási bizonyítékot adna, Alice kifizetési kérelme érvényesnek minősül, és lehetővé teszi számára, hogy visszaszerezze a letéteket a plazmaszerződésből az Ethereumon.

### Vitarendezés {#dispute-arbitration}

Mint minden blokkláncnak, a plazmaláncoknak is szükségük van egy mechanizmusra a tranzakciók integritásának érvényesítésére, amennyiben a résztvevők rosszindulatúan cselekednek (pl. duplán költik el a pénzt). Ebből a célból a plazmaláncok csalási bizonyítékokat használnak a státuszváltozások érvényességével kapcsolatos viták eldöntésére és a rosszhiszemű viselkedés szankcionálására. A csalási bizonyítékok olyan mechanizmusként szolgálnak, amelyen keresztül egy plazma-gyereklánc panaszt nyújt be a szülői lánchoz vagy a gyökérlánchoz.

A csalási bizonyíték egy olyan állítás, hogy egy adott státuszváltozás érvénytelen. Például ha egy felhasználó (Alice) kétszer próbálja elkölteni ugyanazt a pénzt. Talán elköltötte az UTXO-t egy tranzakcióban Bobbal, és ugyanazt az UTXO-t (ami most Bobé) egy másik tranzakcióban akarja elkölteni.

A pénzkivétel megakadályozása érdekében Bob csalási bizonyítékot állít össze, hogy Alice az említett UTXO-t egy korábbi tranzakcióban elköltötte, és Merkle-bizonyítékkal bizonyítja, hogy a tranzakció bekerült egy blokkba. Ugyanez a folyamat működik a plazma Cash-ben is – Bobnak bizonyítania kell, hogy Alice korábban átutalta a tokeneket, amelyeket ki akar venni.

Ha Bob megkérdőjelezése sikeres, akkor Alice visszavonási kérelmét elutasítják. Ez a megközelítés azonban Bob azon képességére támaszkodik, hogy figyelje a láncot a visszavonási kérelmek tekintetében. Ha Bob offline, akkor Alice feldolgozhatja a rosszhiszemű visszavonást, amint letelik a kihívási időszak.

## A tömeges kilépési probléma a plazmánál {#the-mass-exit-problem-in-plasma}

A tömeges kilépés problémája akkor jelentkezik, amikor nagyszámú felhasználó egyszerre próbál kilépni egy plazmaláncból. Hogy miért van ez a probléma, az a plazma egyik legnagyobb problémájával függ össze: az **adatok elérhetetlensége**.

Az adatelérhetőség azt jelenti, hogy ellenőrizni lehet, hogy egy javasolt blokk információit valóban közzétették-e a blokklánc-hálózaton. Egy blokk „nem elérhető”, ha annak készítője magát a blokkot közzéteszi, de a blokk létrehozásához használt adatokat visszatartja.

A blokkoknak elérhetőnek kell lenniük, hogy a csomópontok le tudják tölteni a blokkot, és ellenőrizni tudják a tranzakciók érvényességét. A blokkláncok biztosítják az adatok elérhetőségét azáltal, hogy a blokkkészítőket arra kényszerítik, hogy minden tranzakciós adatot a láncban tegyenek közzé.

Az adatelérhetőség abban is segít, hogy az Ethereum alaprétegére épülő, láncon kívüli skálázási protokollok biztosítva legyenek. Azáltal, hogy az ilyen láncok üzemeltetőit arra kényszerítik, hogy tranzakciós adatokat tegyenek közzé az Ethereumban, bárki megtámadhatja az érvénytelen blokkokat a lánc helyes állapotára hivatkozó csalási bizonyítékokkal.

A plazmaláncok elsősorban a tranzakciós adatokat tárolják az operátoroknál, és **nem tesznek közzé semmilyen adatot a főhálózaton** (csak időszakos státuszelköteleződéseket). Ez azt jelenti, hogy a felhasználóknak az operátorra kell hagyatkozniuk a blokkadatok biztosításában, ha csalási bizonyítékokat kell létrehozniuk, amelyek megkérdőjelezik az érvénytelen tranzakciókat. Ha ez a rendszer működik, akkor a felhasználók bármikor használhatják a csalási bizonyítékokat a pénzeszközök biztosítására.

A probléma akkor kezdődik, amikor az operátor, nem pedig felhasználó az, aki rosszhiszeműen cselekszik. Mivel az operátor egyedül irányítja a blokkláncot, nagyobb motivációja lehet arra, hogy érvénytelen státuszváltozást hajtson végre, például ellopják a plazmalánc felhasználóihoz tartozó pénzeszközöket.

Ebben az esetben a klasszikus csalási bizonyíték rendszere nem működik. Az operátor könnyen elvégezhet egy érvénytelen tranzakciót, amellyel Alice és Bob pénzét átutalja a saját tárcájába, és elrejtheti a csalási bizonyítékhoz szükséges adatokat. Ez azért lehetséges, mert az operátor nem köteles az adatokat a felhasználók vagy a főhálózat rendelkezésére bocsátani.

Ekkor a legoptimistább megoldás az, ha megkíséreljük a felhasználók „tömeges kilépését” a plazmaláncból. A tömeges kilépés lelassítja a rosszhiszemű üzemeltető pénzlopási tervét, és bizonyos fokú védelmet nyújt a felhasználók számára. A kivételi kérelmek az egyes UTXO-k (vagy tokenek) létrehozásának időpontja alapján kerülnek sorrendbe, ami megakadályozza, hogy a rosszhiszemű operátorok a tisztességes felhasználókat megelőzzék.

Ennek ellenére továbbra is szükségünk van egy olyan módszerre, amellyel a tömeges kilépés során ellenőrizhetjük a kilépési kérelmek érvényességét, hogy megakadályozzuk, hogy az opportunista egyének kihasználják az érvénytelen kilépéseket feldolgozó káoszt. A megoldás egyszerű: megköveteljük a felhasználóktól, hogy a pénzük kivételéhez **a lánc utolsó érvényes státuszát** tegyék közzé.

Ennek a megközelítésnek azonban még mindig vannak problémái. Ha például egy plazmalánc összes felhasználójának ki kell lépnie (ami egy rosszhiszemű üzemeltető esetében lehetséges), akkor a plazmalánc teljes érvényes státuszát egyszerre kell kipublikálni az Ethereum alaprétegén. A plazmaláncok tetszőleges mérete (nagy tranzakcióátviel = több adat) és az Ethereum feldolgozási sebességének korlátai miatt ez nem ideális megoldás.

Bár a kilépési játékok elméletben jól hangzanak, a valós életben a tömeges kilépések valószínűleg az egész hálózatra kiterjedő torlódást fognak okozni az Ethereumban. Amellett, hogy károsítja az Ethereum funkcionalitását, egy rosszul koordinált tömeges kilépés azt jelenti, hogy a felhasználók esetleg nem tudnak pénzt felvenni, mielőtt az operátor lemerít minden számlát a plazmaláncban.

## A plazma előnyei és hátrányai {#pros-and-cons-of-plasma}

| Előnyök                                                                                                                                                                                                                                                       | Hátrányok                                                                                                                                                                                      |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Nagy átvitelt és tranzakciónként alacsony költséget kínál.                                                                                                                                                                                                    | Nem támogatja a számítást (nem tud okosszerződéseket futtatni). Csak alapvető token-átutalások, váltások és egy pár más tranzakciótípus támogatott az elsőrendű logika által.                  |
| Jól használható tetszőleges felhasználók közötti tranzakciókra (felhasználópárok között nincs költség, ha mindkettő a plazmán van).                                                                                                                           | A felhasználónak rendszeresen figyelni kell a hálózatot (elérhetőségi követelmény), vagy át kell ruházni ezt a felelősséget másra a pénzeszközök biztonsága érdekében.                         |
| A plazmaláncok a főlánctól független, speciális felhasználási esetekhez igazíthatók. Bárki, beleértve a vállalkozásokat is, testre szabhatja a plazma-okosszerződéseket, hogy skálázható infrastruktúrát biztosítson, amely különböző kontextusokban működik. | Egy vagy több operátorra támaszkodik az adatok tárolásában és kérésre történő kiszolgálásában.                                                                                                 |
| Csökkenti az Ethereum főhálózat terhelését azáltal, hogy a számítást és a tárolást a láncon kívülre helyezi.                                                                                                                                                  | A kiutalások több napig is tarthatnak, hogy lehetővé tegyék a megkérdőjelezést vonást. A helyettesíthető eszközök esetében ezt a likviditásszolgáltatók enyhíthetik, de ez tőkeköltséggel jár. |
|                                                                                                                                                                                                                                                               | Ha túl sok felhasználó próbál egyszerre kilépni, az Ethereum főhálózat túlterheltté válhat.                                                                                                    |

## A plazma és az L2 skálázási protokollok összehasonlítása {#plasma-vs-layer-2}

Míg a plazma egykor hasznos skálázási megoldásnak számított az Ethereum számára, azóta a [második blokkláncréteg (L2) skálázási protokollok](/layer-2/) javára elvetették. Az L2 skálázási megoldások a plazma számos problémáját orvosolják:

### Hatékonyság {#efficiency}

A [zero-knowledge összevont tranzakciók](/developers/docs/scaling/zk-rollups) kriptográfiai bizonyítékokat generálnak a láncon kívül feldolgozott tranzakciók minden tételének érvényességéről. Ez megakadályozza, hogy a felhasználók (és az operátorok) érvénytelen státuszváltozásokat kezdeményezzenek, így nem relevánsak a megkérdőjelezési időszakok és a kilépési játékok. Ez azt is jelenti, hogy a felhasználóknak nem kell rendszeresen figyelniük a láncot, hogy biztosítsák pénzeszközeiket.

### Az okosszerződések támogatása {#support-for-smart-contracts}

A plazma keretrendszer másik problémája az volt, hogy [nem tudta támogatni az Ethereum okosszerződések végrehajtását](https://ethresear.ch/t/why-smart-contracts-are-not-feasible-on-plasma/2598/4). Ennek eredményeképpen a plazma legtöbb implementációja többnyire egyszerű fizetésekre vagy ERC-20 tokenek cseréjére készült.

Ezzel szemben az optimista összevont tranzakciók, kompatibilisek az [Ethereum virtuális géppel](/developers/docs/evm/) és képesek Ethereum-natív [okosszerződések](/developers/docs/smart-contracts/) futtatására, így hasznos és _biztonságos_ megoldást jelentenek a [decentralizált alkalmazások](/developers/docs/dapps/) skálázására. Hasonlóképpen, tervben van az [EVM zero-knowledge implementációjának (zkEVM)](https://ethresear.ch/t/a-zk-evm-specification/11549) létrehozása, amely lehetővé tenné a ZK összevont tranzakciók számára, hogy tetszőleges logikát dolgozzanak fel és okosszerződéseket hajtsanak végre.

### Az adatok elérhetetlensége {#data-unavailability}

Amint azt már korábban kifejtettük, a plazmánál az adatelérhetőség nem megoldott. Ha egy rosszhiszemű operátor egy érvénytelen státuszt továbbítana a plazmaláncban, a felhasználók nem tudnák azt megtámadni, mivel az operátor visszatarthatja a csalási bizonyítékhoz szükséges adatokat. Az összevont tranzakciók úgy oldják meg ezt a problémát, hogy az operátoroknak közzé kell tenni a tranzakciós adatokat az Ethereumon, így bárki ellenőrizheti a lánc státuszát, és szükség esetén csalási bizonyítékokat hozhat létre.

### A tömeges kilépés problémája {#mass-exit-problem}

A ZK és az optimista összevont tranzakciók a maguk módján oldják meg a plazma tömeges kilépési problémáját. A ZK összevont tranzakció például olyan kriptográfiai mechanizmusokra támaszkodik, amelyek biztosítják, hogy az operátorok semmilyen esetben sem tudják ellopni a felhasználók pénzeszközeit.

Hasonlóképpen, az optimista összevont tranzakciók késleltetési időszakot írnak elő a pénzkivételre, amely alatt bárki megkérdőjelezheti azt, és megakadályozhatja a rosszhiszemű kivételi kérelmeket. Bár ez hasonló a plazmához, a különbség az, hogy a hitelesítők hozzáférnek a csalási bizonyítékokhoz szükséges adatokhoz. Így a rollup-felhasználóknak nincs szükségük arra, hogy őrült, „elsőként kilépő” migrációba kezdjenek az Ethereum főhálózatra.

## Miben különbözik a plazma a melléklánctól és a sharding-tól? {#plasma-sidechains-sharding}

A plazma, a mellékláncok és a sharding hasonlóak, mivel mindannyian valamilyen módon kapcsolódnak az Ethereum főhálózathoz. E kapcsolatok szintje és erőssége azonban eltérő, ami befolyásolja az egyes skálázási megoldások biztonsági tulajdonságait.

### A plazma és a mellékláncok összehasonlítása {#plasma-vs-sidechains}

A [melléklánc](/developers/docs/scaling/sidechains/) egy önállóan működtetett blokklánc, amely egy kétirányú hídon keresztül kapcsolódik az Ethereum főhálózathoz. A [hidak](/bridges/) lehetővé teszik a felhasználók számára, hogy tokeneket cseréljenek a két blokklánc között, hogy a mellékláncon tranzakciókat bonyolíthassanak, csökkentve az Ethereum főhálózat zsúfoltságát és javítva a skálázhatóságot. A mellékláncok külön konszenzusmechanizmust használnak, és jellemzően sokkal kisebbek, mint az Ethereum főhálózat. Ennek eredményeképpen az eszközök áthidalása ezekbe a láncokba fokozott kockázatot jelent; az Ethereum főhálózatból örökölt biztonsági garanciák hiánya miatt az melléklánc-modellben a felhasználók a pénzeszközök elvesztését kockáztatják a mellékláncot érő támadás során.

Ezzel szemben a plazmaláncok a főhálózatból merítik biztonságukat. Ez mérhetően biztonságosabbá teszi őket, mint a mellékláncokat. Mind a mellékláncok, mind a plazmaláncok különböző konszenzusprotokollokkal rendelkezhetnek, de a különbség az, hogy a plazmaláncok minden egyes blokkhoz Merkle-gyökereket tesznek közzé az Ethereum főhálózaton. A blokkgyökerek olyan kis információdarabok, amelyek segítségével ellenőrizhetjük a plazmaláncban zajló tranzakciókkal kapcsolatos információkat. Ha egy plazmaláncot támadás ér, a felhasználók a megfelelő bizonyítékok segítségével biztonságosan kivehetik pénzüket a főhálózatra.

### A plazma és a sharding összehasonlítása {#plasma-vs-sharding}

Mind a plazmaláncok, mind a shard-láncok rendszeresen közzéteszik a kriptográfiai bizonyítékokat az Ethereum főhálózatra. Azonban eltérő biztonsági tulajdonságokkal rendelkeznek.

A shard-láncok „összevont fejléceket” küldenek a főhálózatnak, amelyek részletes információkat tartalmaznak az egyes adat-shardról. A főhálózat csomópontjai ellenőrzik és érvényesítik az adat-shardok érvényességét, csökkentve ezzel az érvénytelen shard-változások lehetőségét és védve a hálózatot a rosszindulatú tevékenységektől.

A plazma azért más, mert a főhálózat csak minimális információt kap a gyerekláncok státuszáról. Ez azt jelenti, hogy a főhálózat nem tudja hatékonyan ellenőrizni a gyerekláncokon végrehajtott tranzakciókat, így azok kevésbé biztonságosak.

**Fontos megjegyezni**, hogy az Ethereum blokklánc ütemtervében már nem szerepel a sharding. Ezt felváltotta a rollupok-on keresztül történő skálázás és a [Danksharding](/roadmap/danksharding).

### A plazma használata {#use-plasma}

Több projekt is kínál olyan plazmaimplementációkat, amelyeket Ön is beépíthet a dappjaiba:

- [Polygon](https://polygon.technology/) (korábban Matic Network)

## További olvasnivaló {#further-reading}

- [Ismerje meg a plazmát](https://www.learnplasma.org/en/)
- [Gyors emlékeztető arról, hogy mit jelent a „megosztott biztonság” és miért olyan fontos ez a fogalom](https://old.reddit.com/r/ethereum/comments/sgd3zt/a_quick_reminder_of_what_shared_security_means/)
- [A mellékláncok, a plazma és a sharding összehasonlítása](https://vitalik.eth.limo/general/2019/06/12/plasma_vs_sharding.html)
- [A plazma megértése, 1. rész: Az alapok](https://www.theblockcrypto.com/amp/post/10793/understanding-plasma-part-1-the-basics)
- [A plazma élete és halála](https://medium.com/dragonfly-research/the-life-and-death-of-plasma-b72c6a59c5ad#)

_Van olyan közösségi erőforrása, amely segített Önnek? Szerkessze ezt az oldalt, és adja hozzá!_
