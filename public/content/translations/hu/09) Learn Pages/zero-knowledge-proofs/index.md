---
title: Felfedés nélküli bizonyítás
description: A zero-knowledge bizonyítékok nem technikai bemutatása kezdők számára.
lang: hu
---

# Mik azok a zero-knowledge (nullaismeret-alapú) bizonyítékok? {#what-are-zk-proofs}

A zero-knowledge bizonyíték annak módja, hogy egy állítás érvényességét úgy igazoljuk, hogy magát az állítást nem fedjük fel. A bizonyító próbálja az állítást elfogadtatni, miközben az ellenőrző felelős annak validálásáért.

A zero-knowledge bizonyíték először egy 1985-ös, „[Az interaktív bizonyítási rendszerek ismereti komplexitása](http://people.csail.mit.edu/silvio/Selected%20Scientific%20Papers/Proof%20Systems/The_Knowledge_Complexity_Of_Interactive_Proof_Systems.pdf)” című tanulmányban jelent meg, mely a zero-knowledge bizonyítékok ma is használt definícióját adja:

> A nulla tudás protokoll egy olyan módszer, amellyel az egyik fél (a bizonyító) **bizonyíthatja** egy másik félnek (az ellenőrző), **hogy valami igaz, anélkül, hogy bármilyen információt felfedne** az a tény, hogy ez a konkrét állítás igaz.

A zero-knowledge bizonyítékok az elmúlt években tovább fejlődtek, és ma már számos valódi alkalmazásban használjuk ezeket.

<YouTube id="fOGdb1CTu5c" />

## Miért kellenek a zero-knowledge bizonyítékok? {#why-zero-knowledge-proofs-are-important}

A zero-knowledge bizonyítékok az alkalmazott kriptográfia egyik áttörése, mivel az egyének számára jobb információbiztonságot ígérnek. Gondoljon bele, hogyan bizonyít egy állítást (pl. „X ország állampolgára vagyok”) egy másik félnek (pl. egy szolgáltatásnyújtónak). Bizonyítékot kell adnia ahhoz, hogy az állítását alátámassza, mint az útlevelét vagy a vezetői engedélyét.

Ennél azonban jelentős adatvédelmi kockázat áll fenn. A személyazonosításra alkalmas információk (PII), melyeket egy harmadik félnek ad át, központi adatbázisokban vannak tárolva, melyek sebezhetők a támadókkal szemben. Mivel a személyazonosság ellopása kritikus problémává válik, komolyabb adatvédelmi intézkedésekre van szükség a bizalmas információk megosztásánál.

A nulla tudásalapú bizonyítások megoldják ezt a problémát azáltal, hogy **kiküszöböli az állítások érvényességének bizonyításához szükséges információk felfedését**. A zero-knowledge protokoll az állítást (amit tanúnak nevez) használja bemenetként, hogy egy tömör bizonyítványt állítson ki az érvényességéről. Ez a bizonyíték egy erős garanciát ad, hogy az állítás igaz, de nem tár fel semmit abból, amit ehhez felhasznált.

A korábbi példánál maradva a nemzetiséget egyedül a zero-knowledge bizonyítékkal kell igazolnia. Az ellenőrző csak azt nézi meg, hogy a bizonyíték bizonyos jellemzői igazak, hogy meggyőződjön az állítás igaz voltáról.

## A zero-knowledge bizonyítékok alkalmazási területei {#use-cases-for-zero-knowledge-proofs}

### Anonim fizetések {#anonymous-payments}

A bankkártyafizetések sokszor láthatók több fél számára is, beleértve a fizetési szolgáltatót, a bankokat és más érdekelteket (pl. kormányzati hatóságok). Míg a pénzügyi felügyeletnek vannak előnyei az illegális tevékenységek feltárásában, közben aláássa a hétköznapi emberek magánéletét.

A kriptovalutákat arra szánták, hogy a felhasználók privát, egymás közötti (peer-to-peer) tranzakciókat hajthassanak végre. Ugyanakkor a legtöbb kriptovalutás tranzakció nyíltan látható a nyilvános blokkláncokon. A felhasználók személyazonosságai gyakran közvetettek és vagy direkt kapcsolódnak valós azonosságukhoz (pl. a Twitter vagy GitHub profil tartalmazza az ETH címüket), vagy összekapcsolhatók alapvető láncon belüli és kívüli adatok elemzésével.

Vannak bizonyos privát tokenek, hogy teljesen anonim tranzakciókat lehessen végrehajtani. A privát jelleget védő blokkláncok, mint a Zcash és Monero, elfedik a tranzakciók adatait, mint a küldő/fogadó címe, az eszköz típusa, a mennyiség, az időpont.

A nulla tudástechnológiát a protokollba beépítve az adatvédelemre fókuszáló [blokklánc](/glossary/#blockchain) hálózatok lehetővé teszik a [csomópontok](/glossary/#node) számára a tranzakciók érvényesítését anélkül, hogy hozzá kellene férniük a tranzakciós adatokhoz.

**A nulla tudásalapú igazolásokat a nyilvános blokkláncokon folyó tranzakciók anonimizálására is alkalmazzák**. Erre a Tornado Cash a példa, ami egy decentralizált, nem felügyelt szolgáltatás, ami privát tranzakciókat tesz lehetővé az Ethereumon. Ez a megoldás zero-knowledge bizonyítékokat használ, hogy elfedje a tranzakció adatait és pénzügyi titoktartást garantál. Sajnos, mivel ezek tetszőlegesen választható adatvédő eszközök, ezért rögtön illegális tevékenységet sejtetnek. Ennek megoldására a privát jellegű adatok védelme végül alapvetővé kell váljon a nyilvános blokkláncokon.

### A személyazonosság védelme {#identity-protection}

A jelenlegi személyazonosságot kezelő rendszerek veszélyeztetik a személyes információkat. A zero-knowledge bizonyítékok segíthetnek az egyéneknek azonosítani magukat, miközben megvédik az adataikat.

Ezek kiemelten fontosak a [decentralizált személyazonosság](/decentralized-identity/) kontextusában. A decentralizált személyazonosság (vagy független személyazonosság) lehetővé teszi, hogy az egyén kontrollálja a személyes azonosítóihoz való hozzáférést. Az állampolgárság igazolása adóazonosító vagy útlevéladatok felfedése nélkül egy jó példa arra, hogy a zero-knowledge technológia hogyan teszi lehetővé a decentralizált személyazonosság-ellenőrzést.

### Hitelesítés {#authentication}

Az online szolgáltatások használatához igazolni kell a személyazonosságot és a hozzáférési jogot az adott platformhoz. Ez gyakran az olyan személyes adatok megadásával történik, mint név, e-mail-cím, születési dátum stb. Emellett hosszú jelszavakat kell megjegyezni, de a hozzáférés akár el is veszhet.

A zero-knowledge bizonyítékok ugyanakkor leegyszerűsíthetik az azonosítást a platformok és a felhasználók számára is. Amint a ZK-bizonyíték elkészült a nyilvános inputok (pl. a platformtagságot tanúsító adat) és privát inputok (pl. a személy adatai) használatával, akkor a felhasználó egyszerűen azzal igazolja magát, amikor a szolgáltatást használni akarja. Ez javítja a felhasználói tapasztalatot, illetve mentesíti a szervezeteket, hogy nagy adag személyes információt tároljanak.

### Igazolható kalkuláció {#verifiable-computation}

Az igazolható kalkuláció egy másik alkalmazása a ZK technológiának, hogy fejlessze a blokklánc kialakítását. Az igazolható kalkuláció által a kalkulációt másik entitás is végezheti, miközben az igazolható eredményeket fenntartjuk. A másik fél átadja az eredményeket a bizonyítékkal együtt, ami igazolja, hogy a program megfelelően futott.

Az ellenőrizhető számítások **kritikusak a blokkláncok feldolgozási sebességének javításához** a biztonság csökkentése nélkül. Ennek megértéséhez ismerni kell az Ethereum skálázási megoldásai közötti eltéréseket.

[A láncon belüli skálázási megoldások](/developers/docs/scaling/#on-chain-scaling), mint amilyen a párhuzamos futtatás (sharding), nagy mértékű módosítást igényelnek a blokklánc alaprétegén. Ez a megközelítés ugyanakkor nagyon komplex, az bevezetés hibái pedig alááshatják az Ethereum biztonsági modelljét.

[A láncon kívüli skálázási megoldásokhoz](/developers/docs/scaling/#off-chain-scaling) nem kell az Ethereum protokollt újratervezni. Ehelyett egy kiszervezett kalkulációs modellre támaszkodnak, hogy fejlesszék a tranzakcióátvitelt az Ethereum alaprétegen.

Ez a gyakorlatban a következőképpen működik:

- Az Ethereum nem dolgozza fel a tranzakciókat egyesével, hanem kirakja a végrehajtást egy másik láncra.

- A tranzakciók feldolgozása után a másik lánc visszaküldi az eredményt, ami az Ethereum-státusz része lesz.

Az Ethereumnak tehát nem kell feldolgozni semmit, csak az eredményeket kell beilleszteni. Ez csökkenti a hálózat leterheltségét és fejleszti a tranzakciós sebességet (a láncon kívüli protokoll gyorsabb végrehajtásra van optimalizálva).

A láncnak szüksége van arra, hogy validálni tudja a láncon kívüli tranzakciókat anélkül, hogy újra feldolgozná azokat, különben a külső feldolgozás értéke elveszik.

Itt jön a képbe az igazolható kalkuláció. Amikor egy csomópont feldolgoz egy tranzakciót az Ethereumon kívül, akkor egy zero-knowledge bizonyítékot ad, hogy bizonyítsa a láncon kívüli végrehajtás helyességét. Ez a bizonyíték ([érvényességi bizonyíték](/glossary/#validity-proof)) garantálja, hogy a tranzakció érvényes, így az Ethereum hozzáadhatja a lánc státuszához – anélkül, hogy bárki kifogásolhatná azt.

[A zero-knowledge rollupok](/developers/docs/scaling/zk-rollups) és [a validiumok](/developers/docs/scaling/validium/) két olyan láncon kívüli, skálázási megoldás, amely érvényességi bizonyítékot ad, hogy a skálázás biztonságos legyen. Ezek a protokollok ezernyi tranzakciót dolgoznak fel láncon kívül és bizonyítékot adnak az Ethereumnak ellenőrzési célból. Amint a bizonyíték ellenőrzésre kerül, az eredményeket azonnal be lehet tenni a láncba, így az Ethereum több tranzakciót tud kezelni anélkül, hogy az alapréteg számítási kapacitását növelni kellene.

### A vesztegetés és összejátszás lehetőségének csökkentése a láncon belüli szavazásnál {#secure-blockchain-voting}

A blokklánc szavazási sémái számos kedvező vonással bírnak: teljesen auditálható, nem támadható, ellenáll a cenzúrának és nem kötik földrajzi megszorítások. De még ezek sem immunisak az **összejátszás** problémájára.

Az összejátszás definíciója a nyílt verseny redukálása megtévesztéssel, csalással és félrevezetéssel, ami felöltheti a vesztegetés formáját, mellyel egy rosszhiszemű szereplő befolyásolni akar egy szavazást. Például Alice kaphat egy összeget Bobtól azért, hogy szavazzon a `B opcióra` egy titkos szavazáson, miközben ő maga az `A opciót` preferálja.

A vesztegetés és összejátszás behatárolja a hatékonyságát azoknak a folyamatoknak, melyek a szavazást használják jelzőmechanizmusra (főleg amikor a felhasználók bizonyítani tudják, hogyan szavaztak). Ennek komoly következményei vannak, főleg ahol véges erőforrást allokálnak a szavazás révén.

Például a [kvadratikus finanszírozási mechanizmus](https://www.radicalxchange.org/concepts/plural-funding/) adományokon alapszik, hogy mérje bizonyos opciók támogatottságát a különféle közjóra törekvő projektek között. Minden adomány szavazatként működik egy adott projektre, ahol a több szavazattal bíró projektek nagyobb részt kapnak a finanszírozási alapból.

A láncon belüli szavazás kiteszi a kvadratikus finanszírozást az összejátszás kockázatának: a blokklánctranzakciók nyilvánosak, így a vesztegetők meg tudják nézni, hogy a megvesztegetett hogyan szavazott. Így a kvadratikus finanszírozás nem lesz hatékony módja a forráselosztásnak a közösség aggregált preferenciái alapján.

Szerencsére újabb megoldások, mint amilyen a MACI (Minimum összejátszás-ellenes infrastruktúra/Minimum Anti-Collusion Infrastructure), zero-knowledge bizonyítékokat használ, hogy a láncon belüli szavazás ellenálló legyen a vesztegetéssel és összejátszással szemben. A MACI okosszerződésekből és szkriptekből áll, és lehetővé teszi egy központi adminisztrátor (a koordinátor) számára, hogy aggregálja a szavazatokat és kiszámolja az eredményeket, _anélkül_, hogy felfedné az egyéni szavazatok tartalmát. Még így is bizonyítani lehet, hogy a szavazatokat megfelelően számolták össze, illetve egy adott illető részt vette-e a szavazáson.

#### Hogyan működik a MACI a zero-knowledge bizonyítékokkal? {#how-maci-works-with-zk-proofs}

Először a koordinátor aktiválja a MACI szerződést az Ethereumon, majd a felhasználók jelentkezhetnek a szavazásra (regisztrálják a nyilvános kulcsukat az okosszerződésben). A felhasználók úgy szavaznak, hogy a nyilvános kulcsukkal titkosított üzenetet küldenek az okosszerződésnek (az érvényes szavazatot a legfrissebb nyilvános kulccsal kell aláírni, egyéb kritériumok mellett). Majd a koordinátor feldolgozza az összes üzenetet a szavazás lezárultával, megszámlálja azokat, és igazolja az eredményt a láncon.

A MACI-ban a zero-knowledge bizonyítékok biztosítják a kalkuláció helyességét, így a koordinátor nem tudja azokat helytelenül feldolgozni és összesíteni. Ehhez a koordinátornak ZK-SNARK bizonyítékokat kell generálnia, hogy igazolja a) minden üzenetet megfelelően feldolgozott; b) a végső eredmény egyezik a _valid_ szavazatok számával.

Így a MACI még a szavazatok felhasználónkénti megosztása nélkül is garantálja a számlálási folyamat során kiszámított eredmények integritását. Ez csökkenti az alapvető összejátszási sémák hatékonyságát. Megvizsgálhatjuk ezt a lehetőséget, ha felhasználjuk az előző példát, amikor Bob megvesztegette Alice-t, hogy egy opció mellett szavazzon:

- Alice szavazásra jelentkezik, elküldve a nyilvános kulcsát az okosszerződésnek.
- Alice beleegyezik, hogy a `B opcióra` szavaz, és ezért Bob fizetni fog neki.
- Alice a `B opcióra` szavaz.
- Alice titokban küld egy titkosított tranzakciót, hogy megváltoztassa a személyazonosságához tartozó nyilvános kulcsot.
- Alice küld egy másik titkosított üzenetet az okosszerződésnek, hogy az `A opcióra` szavaz, az új nyilvános kulcsot használva.
- Alice megmutatja Bobnak a tranzakciót, melyben a `B opcióra` szavazott (ami érvénytelen, mert az a nyilvános kulcs már nem kapcsolódik Alice személyazonosságához a rendszerben)
- Miközben az üzeneteket dolgozza fel a koordinátor, kihagyja Alice szavazatát a `B opcióra` és beleszámolja azt, amit az `A opcióra` adott le. Így Bob próbálkozása, hogy összejátsszon Alice-szel és manipulálja a láncon belüli szavazást, kudarcot vallott.

A MACI használatához ugyanakkor _muszáj_ megbízni a koordinátorban, hogy nem játszik össze másokkal vagy vesztegeti meg a szavazókat. A koordinátor képes feloldani az üzenetek titkosítását (ez kell a bizonyíték előállításához), így be tudja azonosítani, hogy ki hogyan szavazott.

Ha a koordinátor jóhiszeműen jár el, akkor a MACI egy kiváló eszköz arra, hogy garantálja a láncon belüli szavazás szentesítését. Ez megmagyarázza a népszerűségét a kvadratikus finanszírozási alkalmazásokban (mint amilyen a [clr.fund](https://clr.fund/#/about/maci)), ami nagy mértékben függ az egyének szavazásának integritásától.

[Bővebben a MACI-ról](https://privacy-scaling-explorations.github.io/maci/).

## Hogyan működik a zero-knowledge bizonyíték? {#how-do-zero-knowledge-proofs-work}

A zero-knowledge bizonyíték által úgy igazolódik egy állítás igazsága, hogy abból bármi kiderülne vagy abból a módból, ahogy az igazolva lett. Ehhez a zero-knowledge protokollok olyan algoritmusokat használnak, melyek adatokat dolgoznak fel és válaszként igaz vagy hamis eredményt adnak.

A zero-knowledge protokollnak a következő kritériumoknak kell megfelelniük:

1. **Teljesség**: ha az input érvényes, akkor a zero-knowledge protokoll válasza mindig az, hogy „igaz”. Tehát ha az állítás igaz, a bizonyító és az ellenőrző jóhiszeműen viselkedik, akkor a bizonyítékot el lehet fogadni.

2. **Megbízhatóság**: ha az input érvénytelen, akkor elméletileg lehetetlen átverni a zero-knowledge protokollt, hogy azt „igaznak” vegye. Így a rosszhiszemű bizonyító nem tudja átverni a jóhiszemű ellenőrzőt, hogy elhiggye az érvénytelen állításról, hogy az érvényes (csak egy nagyon kicsi valószínűséggel).

3. **Zero-knowledge**: Az ellenőrző semmit sem tud meg az állításról, csak azt, hogy érvényes vagy érvénytelen-e (nulla ismerete lesz az állításról). Ez megakadályozza, hogy az ellenőrző kinyerje az eredeti inputot (az állítás tartalmát) a bizonyítékból.

Alapformájában a zero-knowledge bizonyíték három elemből áll: **tanú**, **kihívás** és **válasz**.

- **Tanú**: A zero-knowledge bizonyítékkal a bizonyító valamilyen titkos információ ismeretét akarja bizonyítani. A titkos információ a bizonyíték „tanúja”, és az a tény, hogy a bizonyítónak feltételezett módon ismerete van erről a tanúról, egy sor kérdést generál, melyet csak az tud megválaszolni, aki ismeri az információt. A bizonyító a bizonyítási eljárást azzal kezdi, hogy véletlenszerűen választ egy kérdést, kikalkulálja a választ és elküldi az ellenőrzőnek.

- **Kihívás**: Az ellenőrző véletlenszerűen választ egy kérdést a sorozatból, és megkéri a bizonyítót, hogy feleljen rá.

- **Válasz**: A bizonyító elfogadja a kérdést, kikalkulálja a választ, és elküldi az ellenőrzőnek. A bizonyító válasza lehetővé teszi, hogy az ellenőrző meggyőződjön arról, az előbbi tényleg hozzáfér a tanúhoz. Ahhoz, hogy meggyőződjön arról, a bizonyító nem csak vakon tippel és véletlenül adta meg a jó választ, még több kérdést tesz fel. Ezt a folyamatot ismételve annak a valószínűsége, hogy a bizonyítónak nincs is ismerete a tanúról, szignifikánsan lecsökken, míg az ellenőrző elégedetté válik.

A fenti egy interaktív zero-knowledge bizonyítékstruktúrát ír le. A korai zero-knowledge protokollok interaktív igazolást használtak, ami oda-vissza kommunikációt igényelt a bizonyító és az ellenőrző között.

Ennek illusztrálására egy jó példa Jean-Jacques Quisquater híres [Ali Baba barlangtörténete](https://en.wikipedia.org/wiki/Zero-knowledge_proof#The_Ali_Baba_cave). A történetben Peggy (a bizonyító) bizonyítani akarja Victornak (az ellenőrzőnek), hogy tudja a titkos jelszót, ami kinyitja a varázsajtót, de nem akarja elárulni, mi az.

### Nem interaktív zero-knowledge bizonyítékok {#non-interactive-zero-knowledge-proofs}

Miközben forradalmi, az interaktív bizonyítás hasznossága behatárolt, mert a két félnek elérhetőnek kell lennie és többször kell kapcsolatba lépniük. Még akkor is, ha az ellenőrző meggyőződött a bizonyító őszinteségéről, a bizonyíték ekkor még nem lesz elérhető a független ellenőrzésre (egy új bizonyítékot kell küldeni, ami egy újabb üzenetváltás).

Ennek megoldására Manuel Blum, Paul Feldman és Silvio Micali az első [nem interaktív zero-knowledge bizonyítékot](https://dl.acm.org/doi/10.1145/62212.62222) javasolta, ahol a bizonyító és az ellenőrző egy megosztott kulccsal rendelkezik. Ez lehetővé teszi a bizonyítónak, hogy az információ (a tanú) ismeretét úgy bizonyítsa, hogy nem adja ki azt.

Az interaktívhoz képest itt csak egy kommunikáció történik a felek (bizonyító és ellenőrző) között. A bizonyító a titkos információt átadja egy speciális algoritmusnak, hogy az kikalkulálja a zero-knowledge bizonyítékot. Ezt elküldi az ellenőrzőnek, aki egy másik algoritmussal ellenőrzi azt, hogy a bizonyító tényleg ismeri a titkot.

A nem interaktív bizonyítás lecsökkenti a szükséges kommunikációt, így a ZK-bizonyíték sokkal hatékonyabb. Sőt, a bizonyíték létrehozásával az mindenkinek elérhetővé válik (akinek van megosztott kulcsa és ellenőrző algoritmusa) ellenőrzésre.

A nem interaktív bizonyítékok áttörést hoztak a ZK technológiának és a ma létező bizonyítórendszerek fejlesztését hozták el. Az alábbiakban áttekintjük ezeket a bizonyítéktípusokat:

### A zero-knowledge bizonyítékok típusai {#types-of-zero-knowledge-proofs}

#### ZK-SNARK-ok {#zk-snarks}

ZK-SNARK a rövidítés a **zero-knowledge tömörített nem interaktív érv ismeretre (Zero-Knowledge Succinct Non-Interactive Argument of Knowledge)**. A ZK-SNARK protokoll a következő jellemzőkkel bír:

- **Zero-knowledge**: Az ellenőrző az állítás integritását úgy tudja ellenőrizni, hogy nem tud róla semmit. Csak arról van tudomása, hogy az állítás igaz vagy hamis.

- **Tömörített**: A zero-knowledge bizonyíték kisebb a tanúnál és gyorsan ellenőrizhető.

- **Nem interaktív**: A bizonyító és az ellenőrző csak egyszer kommunikál, miközben az interaktív bizonyítéknál több körben is egyeztetnek.

- **Érv**: A bizonyíték kielégíti a megbízhatósági követelményt, így a csalás rendkívül valószínűtlen.

- **Ismeret**: A bizonyíték nem rakható össze a titkos információ (tanú) ismerete nélkül. Nehéz vagy egyenesen lehetetlen egy bizonyító számára kikalkulálni egy érvényes ZK-bizonyítékot, ha nem ismeri a tanút.

A korábban említett megosztott kulcs nyilvános paraméterekre hivatkozik, amelyekben a bizonyító és az ellenőrző megegyezik, hogy ezeket használja a bizonyíték létrehozásában és ellenőrzésében. A nyilvános paraméterek létrehozása (Common Reference String/CRS) egy kényes művelet, mivel a protokoll biztonsága múlik rajta. Ha a CRS-t létrehozó entrópia/véletlenszerűség egy rosszhiszemű bizonyító kezébe kerül, akkor hamis bizonyítékokat tud kalkulálni vele.

[A többrésztvevős kalkuláció (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation) ezt a kockázatot csökkenti a nyilvános paraméterek létrehozása kapcsán. Több résztvevő van jelen egy [bizalmat igénylő összetételi ceremónián](https://zkproof.org/2021/06/30/setup-ceremonies/amp/), ahol mindenki hozzátesz véletlenszerű értékeket a CRS létrehozásához. Amíg egy jóhiszemű fél megsemmisíti az entrópia saját részét (így nem lehet teljesen összeállítani a sorozatot), addig a ZK-SNARK protokoll megőrzi a kalkulációs megbízhatóságát.

A bizalmat igénylő összetétel esetén a felhasználónak bíznia kell a résztvevőkben, amikor azok létrehozzák a paramétereket. Ugyanakkor a ZK-STARK-ok kifejlesztése lehetővé tette a bizonyító protokolloknak, hogy bizalomigénytől mentes felállásban is működjenek.

#### ZK-STARK-ok {#zk-starks}

ZK-STARK a rövidítés a **zero-knowledge skálázható transzparens érv ismeretre (Zero-Knowledge Scalable Transparent Argument of Knowledge)**. A ZK-STARK-ok hasonlítanak a ZK-SNARK-okra, kivéve, hogy:

- **Skálázható**: ZK-STARK gyorsabb, mint a ZK-SNARK a bizonyíték létrehozásában és ellenőrzésében, amikor a tanú nagyobb méretű. A STARK bizonyítékoknál a bizonyítás és az ellenőrzés ideje csak enyhén növekszik, ahogy a tanú mérete nő (míg a SNARK esetén a növekedés lineáris).

- **Transzparens**: ZK-STARK nyilvánosan ellenőrizhető véletlenszerűségre támaszkodik, hogy létrehozza a nyilvános paramétereket a bizonyításhoz és az ellenőrzéshez, nem egy bizalmat igénylő összetételre. Ezért sokkal átláthatóbbak a ZK-SNARK-okhoz képest.

ZK-STARK-ok nagyobb bizonyítékokat készítenek, mint a ZK-SNARK-ok, ezért magasabb az ellenőrzési költség. Ugyanakkor bizonyos esetekben (mint nagy adathalmazok bizonyítása) a ZK-STARK-ok mégis költséghatékonyabbak a ZK-SNARK-okhoz képest.

## A zero-knowledge bizonyítékok hátulütői {#drawbacks-of-using-zero-knowledge-proofs}

### Hardverköltségek {#hardware-costs}

A zero-knowledge bizonyítékok generálása nagyon összetett kalkulációt igényel, amit specializált gépeken lehet a legjobban elvégezni. Mivel ezek drágák, ezért nem elérhetők a hétköznapi emberek számára. Emellett a technológiát használó alkalmazásoknak ezt a költséget bele kell kalkulálniuk az áraikba, így megnövelik a felhasználók költségeit is.

### A bizonyíték ellenőrzésének költsége {#proof-verification-costs}

A bizonyítékok ellenőrzése is összetett kalkulációt igényel és megnöveli a technológia bevezetésének költségét az alkalmazásokban. Ez a költség még inkább releváns a bizonyítási kalkuláció kontextusában. Például a ZK-rollupok kb. 500 000 gázt fizetnek, hogy egyetlen ZK-SNARK bizonyítékot ellenőrizzenek az Ethereumon, a ZK-STARK-ok pedig még ennél is többe kerülnek.

### Bizalmi feltételezések {#trust-assumptions}

A ZK-SNARK-ban a CRS (nyilvános paraméterek) egyszer kerül létrehozásra és azt újrahasználhatják a felek, akik részt akarnak venni a zero-knowledge protokollban. A nyilvános paramétereket egy bizalmat igénylő összetételi ceremónia révén hozzák létre, ahol a résztvevőkről feltételezzük, hogy jóhiszeműek.

A felhasználók azonban nem tudják ellenőrizni a résztvevők jóhiszeműségét, meg kell bízniuk a fejlesztőkben. A ZK-STARK-ok mentesek az ilyen bizalomigénytől, mivel a véletlenszerűség nyilvánosan igazolható. Eközben a kutatók dolgoznak a ZK-SNARK-ok bizalomigénynélküli verzióján, hogy növeljék a bizonyítási mechanizmus biztonságát.

### A kvantumszámítógép fenyegetései {#quantum-computing-threats}

A ZK-SNARK elliptikus görbe kriptográfiát használ a titkosításhoz. Míg az elliptikus görbe diszkrét logaritmus problémája egyelőre megfejthetetlennek tekinthető, a kvantumszámítógépek fejlődése a jövőben megtörheti ezt a biztonsági modellt.

A ZK-STARK immunis a kvantumszámítógépek fenyegetésére, mert csak ütközésálló hash-függvényeket használ a biztonsága érdekében. Ezt az algoritmust nehezebb feltörni a kvantumszámítógépnek, nem úgy, mint a nyilvános-privát kulcs párosát, melyet az elliptikusgörbe-alapú kriptográfia használ.

## További olvasnivaló {#further-reading}

- [A zero-knowledge bizonyítékok alkalmazási területeinek áttekintése](https://pse.dev/projects) — _Privacy and Scaling Explorations Team_
- [A SNARK-ok, a STARK-ok és a rekurzív SNARK-ok összehasonlítása](https://www.alchemy.com/overviews/snarks-vs-starks) — _Alchemy Overviews_
- [Zero-Knowledge bizonyíték: az adatbiztonság javítása a blokkláncon](https://www.altoros.com/blog/zero-knowledge-proof-improving-privacy-for-a-blockchain/) — _Dmitry Lavrenov_
- [zk-SNARK-ok — Egy valós zero-knowledge példa és mélyebb elemzése](https://medium.com/coinmonks/zk-snarks-a-realistic-zero-knowledge-example-and-deep-dive-c5e6eaa7131c) — _Adam Luciano_
- [ZK-STARK-ok — Igazolható bizalom létrehozása, még a kvantumszámítógépekkel szemben is](https://medium.com/coinmonks/zk-starks-create-verifiable-trust-even-against-quantum-computers-dd9c6a2bb13d) — _Adam Luciano_
- [Egy hozzávetőleges áttekintés, hogyan lehetségesek a zk-SNARK-ok](https://vitalik.eth.limo/general/2021/01/26/snarks.html) — _Vitalik Buterin_
- [A Zero-knowledge bizonyítékok (ZKP) megváltoztatják a szuverén identitás területét](https://frankiefab.hashnode.dev/why-zero-knowledge-proofs-zkps-is-a-game-changer-for-self-sovereign-identity) — _Franklin Ohaegbulam_

