---
title: Csomópontok, mint szolgáltatás
description: Belépőszintű áttekintés a csomópontszolgáltatásokról, az előnyökről és hátrányokról, valamint a népszerű szolgáltatókról.
lang: hu
sidebarDepth: 2
---

## Bevezetés {#Introduction}

A saját [Ethereum csomópont](/developers/docs/nodes-and-clients/#what-are-nodes-and-clients) futtatása kihívás lehet, különösen az induláskor, vagy amikor gyorsan növekszik. [Számos szolgáltatás van](#popular-node-services), mely optimizált csomópontinfrastruktúrát futtat a felhasználónak, így ő inkább az alkalmazás vagy termék fejlesztésére összpontosíthat. A továbbiakban feltárjuk, hogyan működnek a csomópontszolgáltatások, mik a használatuk előnyei és hátrányai, valamint bemutatjuk a szolgáltatókat, ha szeretne ilyet igénybe venni.

## Előfeltételek {#prerequisites}

Ha most ismerkedik a témával, akkor először nézze meg a [Csomópontok és kliensek](/developers/docs/nodes-and-clients/) című anyagot.

## Letétbe helyezők {#stakoooooooooooooors}

Az önálló letétbe helyezők inkább saját infrastruktúrát kell futtassanak, mint hogy egy harmadik fél által nyújtott szolgáltatásra támaszkodnának. Ez azt jelenti, hogy egy végrehajtási klienst kell futtatni egy konszenzusos klienssel együtt. Az [egyesítés (Merge)](/roadmap/merge) előtt lehetséges volt csak egy konszenzusos kliens futtatása és egy központi szolgáltató nyújtotta a végrehajtási adatot, de ez már nem működik, az önálló letétbe helyezőnek mind a két klienst működtetnie kell. Ugyanakkor vannak olyan szolgáltatások, melyek megkönnyítik ezt.

[Bővebben a csomópont futtatásáról](/developers/docs/nodes-and-clients/run-a-node/).

Ezen az oldalon olyan szolgáltatásokat mutatunk be, amelyek a nem letétbe helyező csomópontokra vonatkoznak.

## Hogyan működnek a csomópont-szolgáltatások? {#how-do-node-services-work}

A csomópont-szolgáltatók elosztott csomópontklienseket futtatnak a háttérben, így a felhasználónak nem kell.

Ezek a szolgáltatások általában egy API-kulcsot adnak, amivel a felhasználó írhat a blokkláncra és olvashat onnan. Gyakran biztosítanak hozzáférést az [Ethereum teszthálózatokhoz](/developers/docs/networks/#ethereum-testnets) a főhálózat mellett.

Egyes szolgáltatások olyan dedikált csomópontot kínálnak, amelyet egyedül az Ön számára tartanak fenn, míg mások terheléselosztókat használnak a tevékenység elosztására a csomópontok között.

Szinte az összes csomópont-szolgáltatás rendkívül könnyen integrálható, egy sornyi változtatással jár a kódban, hogy kicserélje az önállóan üzemeltetett csomópontot, vagy a szolgáltatások között váltson.

A csomópont-szolgáltatók gyakran különféle [csomópontklienseket](/developers/docs/nodes-and-clients/#execution-clients) és [-típusokat](/developers/docs/nodes-and-clients/#node-types) futtatnak, lehetővé téve ezzel a teljes vagy archív csomópontok elérését amellett, hogy kliensspecifikus metódusokat érnek el egy API-ban.

Fontos megjegyezni, hogy a csomópont-szolgáltatások nem tárolják és nem is tárolhatják a privát kulcsokat vagy az adatokat.

## Mik az előnyei a csomópont-szolgáltatások használatának? {#benefits-of-using-a-node-service}

A csomópontszolgáltatás használatának legfőbb előnye, hogy Önnek a programozás mellett nem kell időt töltenie a csomópontok fenntartásával és kezelésével. Ez lehetővé teszi, hogy a termék építésére összpontosítson, és ne aggódjon az infrastruktúra karbantartása miatt.

Saját csomópontok futtatása igen költséges lehet, figyelembe véve a tárhelyet, sávszélességet és a ráfordított, értékes programozási időt. Az olyan dolgok, mint a több csomópont felállítása a méretezéskor, a csomópontok frissítése a legújabb verziókra és a státusz konzisztenciájának biztosítása, elvonhatják a fejlesztőt a kívánt web3-termék építésétől és csökkentik a ráfordított erőforrásokat.

## Mik a hátrányai a csomópont-szolgáltatások használatának? {#cons-of-using-a-node-service}

A csomópontszolgáltatás használatával a felhasználó központosítja az általa fejlesztett termék infrastrukturális aspektusát. Ezért azok a projektek, amelyek a decentralizációt tartják kiemelt fontosságúnak, előnyben részesíthetik az saját fenntartású csomópontokat szemben egy harmadik fél szolgáltatásával.

Tudjon meg többet a [saját csomópont üzemeltetésének előnyeiről](/developers/docs/nodes-and-clients/#benefits-to-you).

## Népszerű csomópont-szolgáltatások {#popular-node-services}

Az alábbiak a legnépszerűbb Ethereum-csomópontszolgáltatók – ha ismer olyat, amit ajánlana, akkor adja hozzá! Minden csomópont-szolgáltatás különböző előnyöket és szolgáltatásokat kínál az ingyenes vagy fizetett szintek mellett. A döntés meghozatala előtt meg kell vizsgálnia, hogy melyik felel meg legjobban az igényeinek.

- [**Alchemy**](https://alchemy.com/)
  - [Dokumentáció](https://docs.alchemyapi.io/)
  - Jellemzők
    - A legnagyobb ingyenes opció 300 M számítási egység havonta (kb. 30 M getLatestBlock-lekérdezés)
    - Több blokklánc támogatása a Polygon, Starknet, Optimism, Arbitrum részére
    - A legnagyobb Ethereum dappok és DeFi tranzakciómennyiségek 70%-át lefedi
    - Valós idejű webhook-figyelmeztetés az Alchemy Notify révén
    - Kiváló támogatás, valamint megbízhatóság és stabilitás
    - Alchemy NFT API
    - Irányítópult, melynek része a Request Explorer, Mempool Watcher és a Composer
    - Integrált teszthálózati csaphozzáférés
    - Aktív Discord építőközösség 18 000 felhasználóval

- [**All That Node**](https://allthatnode.com/)
  - [Dokumentáció](https://docs.allthatnode.com/)
  - Jellemzők
    - Napi 50 000 kérés az ingyenes opcióban
    - Több mint 40 protokoll támogatása
    - JSON-RPC (EVM, Tendermint), REST és Websocket API-ok támogatása
    - Korlátlan hozzáférés az archív adatokhoz
    - A hét minden napján, napi 24 órában rendelkezésre álló technikai támogatás és 99,9%-nál nagyobb rendelkezésre állás
    - Elérhető csap több láncon is
    - Korlátlan végponthozzáférés korlátlan számú API-kulccsal
    - Trace/Debug API támogatás
    - Automatikus frissítések

- [**Amazon Managed Blockchain**](https://aws.amazon.com/managed-blockchain/)
  - [Dokumentáció](https://aws.amazon.com/managed-blockchain/resources/)
  - Jellemzők
    - Teljeskörűen kezelt Ethereum csomópontok
    - Hat régióban elérhető
    - JSON-RPC HTTP-n és biztonságos WebSockets-en
    - Három láncot támogat
    - SLA-k, AWS támogatás 24/7
    - Go-ethereum és Lighthouse

- [**Ankr**](https://www.ankr.com/)
  - [Dokumentáció](https://docs.ankr.com/)
  - Jellemzők
    - Az Ankr-protokollnak több mint 8 láncra van nyílt hozzáférése a publikus RPC API-végpontokhoz
    - Terheléselosztás és a csomópont állapotának felügyelete annak érdekében, hogy a felhasználó gyorsan és megbízható módon elérje a legközelebbi csomópontot
    - Prémium opció, amely WSS-végpontot és korlátlan rátát biztosít
    - Teljes és validátor-csomópont beállítása egyetlen kattintással több mint 40 láncra
    - Menet közbeni méretezés
    - Analitikai eszközök
    - Irányítópult (dashboard)
    - RPC, HTTPS és WSS végpontok
    - Közvetlen támogatás

- [**Blast**](https://blastapi.io/)
  - [Dokumentáció](https://docs.blastapi.io/)
  - Jellemzők
    - RPC- és WSS-támogatás
    - Többrégiós csomópont-szolgáltatás
    - Decentralizált infrastruktúra
    - Publikus API
    - Dedikált ingyenes csomag
    - Több láncra (>17) vonatkozó támogatás
    - Archív csomópontok
    - Napi 24 órás Discord támogatás a hét minden napján
    - Napi 24 órás felügyelet és riasztások a hét minden napján
    - Összességében 99,9% SLA
    - Fizetési lehetőség kriptóban

- [**BlockDaemon**](https://blockdaemon.com/)
  - [Dokumentáció](https://ubiquity.docs.blockdaemon.com/)
  - Előnyök
    - Vezérlőpult
    - Csomópontként
    - Elemzések

- [**BlockPI**](https://blockpi.io/)
  - [Dokumentáció](https://docs.blockpi.io/)
  - Jellemzők
    - Robosztus és elosztott csomópontstruktúra
    - Akár 40 HTTPS és WSS-végpont
    - Ingyenes kezdőcsomag és havi csomag
    - Nyomonkövetési módszer + archív adattámogatás
    - A csomagok 90 napig érvényesek
    - Személyre szabott csomag és menet közbeni fizetés
    - Fizetési lehetőség kriptóban
    - Közvetlen és technikai támogatás

- [**Chainbase**](https://www.chainbase.com/)
  - [Dokumentáció](https://docs.chainbase.com)
  - Jellemzők
    - Elérhető, gyors és skálázható RPC szolgáltatás
    - Több láncot lefedő támogatás
    - Ingyenes díjszabások
    - Felhasználó barát irányítópult
    - Blokklánc-adatszolgáltatás az RPC-n túl

- [**Chainstack**](https://chainstack.com/)
  - [Dokumentáció](https://docs.chainstack.com/)
  - Jellemzők
    - Ingyenes megosztott csomópontok
    - Megosztott archív csomópontok
    - GraphQL-támogatás
    - RPC- és WSS-végpontok
    - Dedikált teljes és archív csomópontok
    - Gyors szinkronizálási idő a dedikált bevezetésekre
    - Saját felhőt hozhat
    - Óránkénti árazás
    - Közvetlen, napi 24 órás támogatás a hét minden napján

- [**DataHub**](https://datahub.figment.io)
  - [Dokumentáció](https://docs.figment.io/)
  - Jellemzők
    - Ingyenes opció 3 000 000 havi lekéréssel
    - RPC- és WSS-végpontok
    - Dedikált teljes és archív csomópontok
    - Automatikus méretezhetőség (mennyiségi kedvezmények)
    - Ingyenes archív adatok
    - Szolgáltatáselemzések
    - Vezérlőpult
    - Közvetlen, napi 24 órás támogatás a hét minden napján
    - Fizetési lehetőség kriptóban (vállalat)

- [**DRPC**](https://drpc.org/)
  - [Dokumentáció](https://docs.drpc.org/)
  - Jellemzők
    - Decentralizált RPC-csomópontok
    - Több mint 15 csomópont-szolgáltató
    - Csomópont-kiegyensúlyozás
    - Korlátlan számítási egység havonta az ingyenes opcióban
    - Adatellenőrzés
    - Személyre szabott végpontok
    - Http és WSS-végpontok
    - Korlátlan mennyiségű kulcs (ingyenes és fizetett opcióban)
    - Rugalmas fallback opciók
    - [Publikus végpont](https://eth.drpc.org)
    - Ingyenes, megosztott archív csomópontok

- [**GetBlock**](https://getblock.io/)
  - [Dokumentáció](https://getblock.io/docs/get-started/authentication-with-api-key/)
  - Jellemzők
    - Hozzáférés több mint 40 blokklánc-csomóponthoz
    - 40 000 ingyenes napi lekérdezés
    - Korlátlan számú API-kulcs
    - Gyors kapcsolódási sebesség 1 GB/másodpercnél
    - Nyomon követés és archiválás
    - Korszerű elemzések
    - Automatikus frissítések
    - Technikai támogatás

- [**InfStones**](https://infstones.com/)
  - Jellemzők
    - Ingyenes opció
    - Menet közbeni méretezés
    - Elemzések
    - Irányítópult (dashboard)
    - Egyedi API-végpontok
    - Dedikált teljes csomópontok
    - Gyors szinkronizálási idő a dedikált bevezetésekre
    - Közvetlen, napi 24 órás támogatás a hét minden napján
    - Hozzáférés több mint 50 blokklánc-csomóponthoz

- [**Infura**](https://infura.io/)
  - [Dokumentáció](https://infura.io/docs)
  - Jellemzők
    - Ingyenes opció
    - Menet közbeni méretezés
    - Fizetős archív adatok
    - Közvetlen támogatás
    - Irányítópult (dashboard)

- [**Kaleido**](https://kaleido.io/)
  - [Dokumentáció](https://docs.kaleido.io/)
  - Jellemzők
    - Ingyenes kezdőopció
    - Ethereum-csomópont beállítása egyetlen kattintással
    - Személyre szabható kliensek és algoritmusok (Geth, Quorum és Besu || PoA, IBFT és Raft)
    - Több mint 500 adminisztratív és szolgáltatói API
    - RESTful-interfész az Ethereum-tranzakciók beküldésére (Apache Kafka támogatott)
    - Kimenő adatfolyamok esemény-végrehajtáshoz (Apache Kafka támogatott)
    - Kimerítő láncon kívüli adatok és kiegészítő szolgáltatások (pl. kétoldalú titkosított üzentátadás)
    - Egyértelmű becsatlakozás a hálózatba irányítással és szerepkör szerinti hozzáféréskontroll
    - Szofisztikált felhasználókezelés az adminisztrátorok és a végfelhasználók felé is
    - Nagy mértékben skálázható, rugalmas, vállalati szintű infrastruktúra
    - Felhőalapú HSM privátkulcs-kezelés
    - Ethereum főhálózathoz kötött
    - ISO 27k és SOC 2, Type 2 tanúsítványok
    - Dinamikus runtime-konfiguráció (pl. felhőintegráció hozzáadása, csomópontbemenet-változtatás stb.)
    - Támogatja a többfelhős, többrégiós és hibrid telepítési beállításokat
    - Egyszerű, óránkénti SaaS-alapú árazás
    - SLA-k és napi 24 órás támogatás a hét minden napján

- [**Lava-hálózat**](https://www.lavanet.xyz/)
  - [Dokumentáció](https://docs.lavanet.xyz/)
  - Jellemzők
    - Ingyenes teszthálózathasználat
    - Decentralizált redundancia a nagy arányú elérhetőség érdekében
    - Nyílt forráskódú
    - Teljesen decentralizált SDK
    - Ethers.js-integráció
    - Intuitív projektmenedzsment interfész
    - Konszenzusalapú adatintegritás
    - Több láncot lefedő támogatás

- [**Moralis**](https://moralis.io/)
  - [Dokumentáció](https://docs.moralis.io/)
  - Jellemzők
    - Ingyenes megosztott csomópontok
    - Ingyenes, megosztott archív csomópontok
    - Adatvédelmi fókuszú (naplózás nélküli szabályzat)
    - Láncokon átívelő támogatás
    - Menet közbeni méretezés
    - Irányítópult (dashboard)
    - Egyedi Ethereum SDK
    - Egyedi API-végpontok
    - Közvetlen, technikai támogatás

- [**NodeReal MegaNode**](https://nodereal.io/)
  - [Dokumentáció](https://docs.nodereal.io/nodereal/meganode/introduction)
  - Jellemzők
    - Megbízható, gyors és skálázható RPC API-szolgáltatások
    - Továbbfejlesztett API a web3-fejlesztőknek
    - Több láncot lefedő támogatás
    - Ingyenes kezdési lehetőség

- [**NOWNodes**](https://nownodes.io/)
  - [Dokumentáció](https://documenter.getpostman.com/view/13630829/TVmFkLwy)
  - Jellemzők
    - Hozzáférés több mint 50 blokklánc-csomóponthoz
    - Ingyenes API-kulcs
    - Blokkfelfedezők
    - Az API-válaszidő kevesebb mint 1 másodperc
    - A hét minden napján, napi 24 órában rendelkezésre álló támogató csapat
    - Személyes számlakezelő
    - Megosztott, archív, biztonsági és dedikált csomópontok

- [**Pocket Network**](https://www.pokt.network/)
  - [Dokumentáció](https://docs.pokt.network/home/)
  - Jellemzők
    - Decentralizált RPC-protokoll és piactér
    - Ingyenes opció 1M lekérdezéssel naponta (végpontonként, max. 2)
    - [Nyilvános végpontok](https://docs.pokt.network/developers/public-endpoints)
    - Letétbe helyezés előtti program (ha 1M napi lekérdezésnél többre van szükség)
    - Több mint 15 láncot támogat
    - 6400-nál több csomópont szerez POKT-ot az applikációk kiszolgálásából
    - Archív csomópont, archív csomópont nyomon követéssel, teszthálózat-csomóponttámogatás
    - Ethereum főhálózat csomóponti kliensdiverzitás
    - Nincs egyetlen meghibásodási pont
    - Nincs kimaradás a szolgáltatásban
    - Költséghatékony, nullához közeli tokengazdaságtan (POKT letétbe helyezése egyszer a hálózati szélessávért)
    - Nincs havi elsüllyedt költség, eszközzé változtatja az infrastruktúrát
    - A terheléseloszlás be van építve a protokollba
    - A napi lekérésmennyiséget és az óránkénti csomópontokat a végtelenségig skálázza úgy, ahogy Ön halad előre
    - A leginkább privát, cenzúrának ellenálló opció
    - Gyakorlati fejlesztőtámogatás
    - [Pocket Portal](https://bit.ly/ETHorg_POKTportal) irányítópult és elemzések

- [**QuickNode**](https://www.quicknode.com)
  - [Dokumentáció](https://www.quicknode.com/docs/)
  - Jellemzők
    - A hét minden napján, napi 24 órában rendelkezésre álló technikai támogatás és fejlesztői Discord-közösség
    - Földrajzilag kiegyensúlyozott, többfelhős/-gépes, rövid késleltetésű hálózat
    - Több láncra vonatkozó támogatás (Optimism, Arbitrum, Polygon + 11 más)
    - Köztes rétegek a gyorsaság és a stabilitás érdekében (call routing, cache, indexálás)
    - Okosszerződés-felügyelet a webhookokon keresztül
    - Intuitív irányítópult, elemzési készlet, RPC composer
    - Fejlett szintű biztonsági jellemzők (JWT, maszkolás, fehérlistázás)
    - NFT-adatok és elemzési API
    - [SOC2-tanúsítvánnyal](https://www.quicknode.com/security)
    - Bárki számára alkalmas, legyen szó fejlesztőkről vagy nagyvállalatokról

- [**Rivet**](https://rivet.cloud/)
  - [Dokumentáció](https://rivet.readthedocs.io/en/latest/)
  - Jellemzők
    - Ingyenes opció
    - Menet közbeni méretezés

- [**SenseiNode**](https://senseinode.com)
  - [Dokumentáció](https://docs.senseinode.com/)
  - Jellemzők
    - Dedikált és megosztott csomópontok
    - Irányítópult (dashboard)
    - Az AWS-en kívüli több szolgáltató biztosítja több helyen Latin-Amerikában
    - Prysm és Lighthouse kliensek

- [**SettleMint**](https://console.settlemint.com/)
  - [Dokumentáció](https://docs.settlemint.com/)
  - Jellemzők
    - Ingyenes próba
    - Menet közbeni méretezés
    - GraphQL-támogatás
    - RPC- és WSS-végpontok
    - Dedikált teljes csomópontok
    - Saját felhőt hozhat
    - Analitikai eszközök
    - Irányítópult (dashboard)
    - Óránkénti árazás
    - Közvetlen támogatás

- [**Tenderly**](https://tenderly.co/web3-gateway)
  - [Dokumentáció](https://docs.tenderly.co/web3-gateway/web3-gateway)
  - Jellemzők
    - Ingyenes opció, mely 25 millió Tenderly egységet tartalmaz havonta
    - Ingyenes hozzáférés az előzményadatokhoz
    - 8-szor gyorsabb olvasásintenzív terhelés
    - 100%-ban konzisztens olvasási hozzáférés
    - JSON-RPC-végpontok
    - UI-alapú RPC lekérdezésépítő és lekérdezés-előnézet
    - Szorosan integrált a Tenderly fejlesztéssel, hibajavítással és tesztelőeszközökkel
    - Tranzakciószimulációk
    - Használatelemzés és szűrés
    - Könnyű hozzáférésikulcs-kezelés
    - Dedikált programozói támogatás csevegés, e-mail és Discord által

- [**Tokenview**](https://services.tokenview.io/)
  - [Dokumentáció](https://services.tokenview.io/docs?type=nodeService)
  - Jellemzők
    - A hét minden napján, napi 24 órában rendelkezésre álló technikai támogatás és fejlesztői Telegram-közösség
    - Több láncot támogat (Bitcoin, Ethereum, Tron, BNB Smart Chain, Ethereum Classic)
    - RPC- és WSS-végpontok nyitott használata
    - Korlátlan hozzáférés az archív adatot szolgáltató API-hoz
    - Dashboard Request Explorer és Mempool Watcher funkcióval
    - NFT-adatszolgáltató API és Webhook figyelmeztetés
    - Fizetési lehetőség kriptóban
    - Külső támogatás az extra funkcionális igényekhez

- [**Watchdata**](https://watchdata.io/)
  - [Dokumentáció](https://docs.watchdata.io/)
  - Jellemzők
    - Adatmegbízhatóság
    - Megszakításmentes kapcsolat nulla leállással
    - Folyamatautomatizálás
    - Ingyenes díjszabások
    - Magasan meghúzott határok, melyek mindenféle felhasználóhoz illeszkednek
    - Támogatás a különféle csomópontok számára
    - Erőforrás-méretezhetőség
    - Gyors feldolgozási sebesség

- [**ZMOK**](https://zmok.io/)
  - [Dokumentáció](https://docs.zmok.io/)
  - Jellemzők
    - Front-running mint szolgáltatás
    - Globális tranzakciógyűjtőhely kereső/szűrőmódszerekkel
    - Korlátlan TX díj és végtelen gáz a tranzakcióküldéshez
    - A leggyorsabban szerzi meg az új blokkot és olvassa a blokkláncot
    - Az API hívásonkénti legjobb ár garantált

- [**Zeeve**](https://www.zeeve.io/)
  - [Dokumentáció](https://www.zeeve.io/docs/)
  - Jellemzők
    - Vállalatszintű, kódnélküli automatizációs platform, ami a blokklánc-csomópontok és hálózatok telepítését, felügyeletét és menedzselését biztosítja
    - Több mint 30 támogatott protokoll és integráció, és még több jön
    - Értékes web3-infrastruktúraszolgáltatások, mint a decentralizált tárhely, decentralizált identitás és a blokkláncfőkönyv-adatszolgáltató API-k valódi felhasználási módokra
    - A hét minden napján, napi 24 órában rendelkezésre álló támogatás és proaktív felügyelet, amely mindenkor biztosítja a csomópontok egészségét.
    - RPC-végpontok, melyek hitelesített hozzáférést kínálnak az API-okhoz, valamint problémamentes kezelést biztosítanak az intuitív irányítópultokkal és elemzésekkel.
    - Egyaránt biztosít a cég által adott felhő és a felhasználó saját felhőjével működő opciókat, és támogatja a legtöbb felhőszolgáltatót, mint AWS, Azure, Google Cloud, Digital Ocean és a helyszíni megoldásokat.
    - Intelligens routing, hogy a felhasználóhoz legközelebbi csomópontot tudja használni


## További olvasnivaló {#further-reading}

- [Az Ethereumcsomópont-szolgáltatások listája](https://ethereumnodes.com/)

## Kapcsolódó témák {#related-topics}

- [ Csomópontok és kliensek](/developers/docs/nodes-and-clients/)

## Kapcsolódó útmutatók {#related-tutorials}

- [Bevezetés az Ethereum fejlesztésbe Alchemy-vel](/developers/tutorials/getting-started-with-ethereum-development-using-alchemy/)
- [Útmutató tranzakció küldéshez a web3 és az Alchemy használatával](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)
