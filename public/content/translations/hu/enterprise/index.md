---
title: Vállalatok az Ethereum főhálózaton
description: Útmutatók, cikkek és eszközök a nyilvános Ethereum blokkláncon lévő vállalati alkalmazásokról
lang: hu
---

# Az Ethereum vállalatok számára {#ethereum-for-enterprise}

Az Ethereum sokféle vállalkozásnak segíthet, beleértve a nagyvállalatokat is:

- Növelni a bizalmat és csökkenteni az üzleti partnerek közötti koordináció költségét
- Javítani a felelősségre vonhatóságot és a működtetési hatékonyságot az üzleti hálózatokban
- Új üzleti modelleket és értékteremtő lehetőségeket kifejleszteni
- Versenyképesen jövőbiztossá tenni a szervezeteiket

A vállalati blokkláncalkalmazások fejleszthetőek a nyilvános, engedély nélküli Ethereum [főhálózatra](/glossary/#mainnet) vagy privát blokkláncokra, melyek az Ethereum technológiáján alapulnak. Tudjon meg többet a [privát vállalati Ethereum láncokról](/enterprise/private-ethereum/).

## Nyilvános versus privát Ethereum {#private-vs-public}

Csak egy nyilvános Ethereum főhálózat létezik. A főhálózatra épült alkalmazások integrálódhatnak egymással, hasonlóan ahogy az internetre épített alkalmazások egymáshoz kapcsolódhatnak, kihasználva ezzel a decentralizált blokklánc teljes potenciálját.

Számos vállalkozás és konzorcium telepített az Ethereum technológián alapuló privát, engedélyköteles blokkláncokat meghatározott alkalmazásokhoz.

### Legfontosabb különbségek {#key-differences}

- Blokklánc biztonság/megváltoztathatóság - A blokklánc ellenállását az adatmódosítás ellen a konszenzus algoritmusa határozza meg. Az Ethereum főhálózatot több ezer független csomópont együttműködése biztosítja, amelyeket egyének és bányászok vezetnek szerte a világon. A privát láncoknak általában kevés csomópontja van, amelyeket egy vagy több szervezet irányít; ezeket a csomópontokat szigorúan lehet ellenőrizni, de elég néhány felett átvenni az irányítást a lánc átírása vagy hamis tranzakciók végrehajtása érdekében.
- Teljesítmény - Mivel a vállalatok privát Ethereum láncai nagy teljesítményű csomópontokat használhatnak, speciális hardverkövetelményekkel és különböző konszenzusalgoritmusokkal, például a jogosítványigazolással (proof-of-authority), így magasabb tranzakciós átvitelt érhetnek el az első blokkláncrétegen (L1). Az Ethereum főhálózatán nagy tranzakcióátviteli teljesítmény érhető el a [második blokkláncréteg (L2) skálázási megoldásaival](/layer-2).
- Költség - A privát lánc működtetésének költségei elsősorban a lánc felállításához és kezeléséhez szükséges munkában, valamint a szerverek futtatásában mutatkoznak meg. Bár annak nincs költsége, hogy az Ethereum főhálózathoz csatlakozzon, minden tranzakció gázköltséget von maga után, amelyet etherben kell kifizetni. A metatranzakció-közvetítők kiküszöbölhetik, hogy a végfelhasználóknak vagy akár a vállalatoknak közvetlenül kelljen ethert tartaniuk és használniuk a tranzakcióikban. Egyes [elemzések](https://theblockchaintest.com/uploads/resources/EY%20-%20Total%20cost%20of%20ownership%20for%20blockchain%20solutions%20-%202019%20-%20Apr.pdf) kimutatták, hogy egy alkalmazás üzemeltetésének összköltsége alacsonyabb lehet a főhálózaton, mint egy privát lánc működtetése.
- Csomóponti engedélyezés - Csak felhatalmazott csomópontok csatlakozhatnak a privát láncokhoz. Bárki felállíthat egy csomópontot az Ethereum főhálózatán.
- Adatvédelem - A privát láncok adataihoz való hozzáférést elsősorban a hálózati hozzáférés korlátozásával lehet szabályozni, kifinomultabb szinten a hozzáférés-szabályozással és privát tranzakciókkal. A főhálózat L1 rétegére írt minden adat bárki számára hozzáférhető, így az érzékeny információkat láncon kívül kell tárolni és továbbítani, vagy titkosítani kell azokat. Az ilyen dizájnminták elterjedőben vannak (például Baseline, Nightfall), csakúgy mint az L2-es megoldások, melyek szétválasztják és az L1-en kívül kezelik az adatot.

### Miért építsünk az Ethereum főhálózaton {#why-build-on-ethereum-mainnet}

A nyilvános blokkláncok egyik legfontosabb előnye a vállalkozások számára a monopóliummal szembeni ellenállás. Ha az Ethereum főhálózatot semleges játékvezetőként használja az üzleti tranzakciók koordinálására, nem kell megbíznia a másik vállalatban, amely felett a versenytársai irányítást vagy befolyást szerezhetnek, és így hátrányos helyzetbe hozhatják Önt. Egy nyílt, engedély nélküli és decentralizált platformon, amelyhez bárki csatlakozhat, használhat és hozzájárulhat, nincs olyan központi hatóság, amely a hatalmát arra használná, hogy előnyre tegyen szert Önnel szemben.

A vállalkozások 2016 óta kísérleteztek a blokklánctechnológiával, amikor elindították a Hyperledger, a Quorum és a Corda projekteket. Kezdetben a hangsúly főleg a privát, engedélyköteles, vállalati blokkláncokon volt, de 2019-től kezdődően elmozdult a gondolkodás a privát irányából a nyilvános blokkláncok felé az üzleti alkalmazások esetében. Paul Brody az Ernst & Youngtól [beszélt](https://www.youtube.com/watch?v=-ycu5vGDdZw&feature=youtu.be&t=3668) a nyilvános blokkláncokra történő fejlesztés előnyeiről, mely (az alkalmazástól függően) magasabb szintű biztonságot/megváltoztathatatlanságot, átláthatóságot, alacsonyabb birtoklási költséget, és a főhálózaton lévő többi alkalmazással történő interoperabilitási képességét nyújthatja (hálózati hatások). A közös referenciakeret megosztása a vállalkozások között elkerülhetővé teszi a szegregált rendszerek felesleges létrehozását, amelyek nem képesek kommunikálni, megosztani vagy szinkronizálni az információkat egymással.

Egy másik fejlesztés, mely a nyilvános blokkláncokra tereli a figyelmet a [második blokkláncréteg (L2)](/layer-2) elérhetősége. Az L2 elsősorban egy skálázási technológia, mely magas átvitelű alkalmazásokat tesz lehetővé a nyilvános blokkláncokon. De az L2 megoldások egy [másik kihívásokra is megoldást nyújthatnak, melyek a vállalati fejlesztőket korábban a privát láncok választására kényszerítették](https://entethalliance.org/how-ethereum-layer-2-scaling-solutions-address-barriers-to-enterprises-building-on-mainnet/).

## Források {#enterprise-resources}

### További olvasnivaló {#further-reading}

Nem technikai információs anyagok annak megértéséhez, hogy a vállalkozások hogyan profitálhatnak az Ethereumból

- [Enterprise Ethereum Alliance 2023 Business Readiness Report](https://entethalliance.org/eea-ethereum-business-readiness-report-2023/) - _felméri a nyilvános Ethereumban és a szélesebb Ethereum ökoszisztémában rejlő lehetőségeket és képességeket a vállalkozások számára_
- [_Ethereum for Business_, írta Paul Brody](https://www.uapress.com/product/ethereum-for-business/) - _Egy közérthető útmutató azokról a felhasználási esetekről, amelyek a vagyonkezeléstől a fizetésen át az ellátási láncokig megtérülést hoznak_

### Szervezetek {#organizations}

Különféle szervezetek számtalan együttműködésen alapuló erőfeszítést tettek azért, hogy az Ethereumot vállalkozásbarátabbá tegyék

- [Enterprise Ethereum Alliance](https://entethalliance.org/) - Az EEA segíti a szervezeteket, hogy bevezessék és használják az Ethereum technológiáit mindennapi üzleti tevékenységükben. Célja az üzleti Ethereum felgyorsítása azáltal, hogy a szakmai és kereskedelmi támogatást, érdekérvényesítést és kutatást, szabványfejlesztést és ökoszisztéma-alapú bizalmi szolgáltatást nyújt.
- [Global Blockchain Business Council](https://www.gbbc.io/) - A GBBC a blokklánc-technológiai ökoszisztéma iparági szövetsége. A GBBC a politikai döntéshozók és a szabályozók bevonásával, rendezvények és mélyreható viták szervezésével, valamint a kutatás ösztönzésével elkötelezett a blokklánc további elfogadása mellett, hogy biztonságosabb, igazságosabb és működőképesebb társadalmakat hozzon létre.


## Vállati fejlesztői anyagok {#enterprise-developer-resources}

### Termékek és szolgáltatások {#products-and-services}

- [4EVERLAND](https://www.4everland.org/) - _ API-okat, RPC szolgáltatásokat és eszközöket kínál decentralizált alkalmazások működtetésére és az Ethereumon való decentralizált tároláshoz_
- [Alchemy](https://www.alchemy.com/) - _API-szolgáltatásokat és -eszközöket szolgáltat az Ethereum alkalmazások fejlesztéséhez és monitorozásához_
- [Blast](https://blastapi.io/) - _egy API-platform, amely RPC/WSS API-okat biztosít az Ethereum archív főhálózathoz és a teszthálózatokhoz._
- [Blockapps](https://blockapps.net/) - _a vállalati Ethereum-protokoll, az eszközkészlet és az API-ok implementációja, melyek a STRATO platformot alkotják_
- [Chainstack](https://chainstack.com/) - _az Ethereum főhálózatára és teszthálózataira biztosít infrastruktúrát, amelyet nyilvános és elkülönített vevői felhőkben hosztol_
- [ConsenSys](https://consensys.io/) - _számos terméket és eszközt kínál az Ethereum fejlesztésére, valamint tanácsadási és egyedi fejlesztési szolgáltatásokat nyújt_
- [Envision Blockchain](https://envisionblockchain.com/) - _az Ethereum főhálózatra szakosodott, vállalati fókuszú, tanácsadási és fejlesztési szolgáltatásokat nyújt_
- [EY OpsChain](https://blockchain.ey.com/products/contract-manager) - _beszerzési munkafolyamatot biztosít, melynek során ajánlatbekéréseket (RFQ), szerződéseket, rendeléseket és számlákat bocsát ki az Ön megbízható üzleti partnereiből álló hálózatán keresztül_
- [Hyperledger Besu](https://www.hyperledger.org/use/besu) - _egy vállalati fókuszú, nyílt forráskódú Ethereum-kliens Apache 2.0 licensszel fejlesztve és Java nyelven írva_
- [Infura](https://infura.io/) - _skálázható API-hozzáférés az Ethereumhoz és az IPFS hálózatokhoz_
- [Kaleido](https://kaleido.io/) - _egy vállalati fókuszú fejlesztési platform, amely egyszerűsített blokklánc- és digitáliseszköz-alkalmazásokat kínál_
- [NodeReal](https://nodereal.io/) - _skálázható blokklánc-infrastruktúrát és API-szolgáltatókat biztosít a web3 ökoszisztémának_
- [Provide](https://provide.services/) - _vállalati zero-knowledge middleware_
- [QuickNode](https://www.quicknode.com/) - _megbízható és gyors csomópontokat biztosít magas szintű API-okkal, mint amilyen az NFT API, Token API stb., miközben egy egységes termékcsomagot és vállalati szintű megoldásokat szállít_
- [Tenderly](https://tenderly.co) - _egy web3-fejlesztői platform, amely okosszerződés-fejlesztéshez, -teszteléshez, -monitorozáshoz és -működtetéshez biztosít hibakeresési, megfigyelhetőségi és infrastruktúrához kapcsolódó építőelemeket_
- [Unibright](https://unibright.io/) - _egy blokklánc-specialistákból, tervezőkből, fejlesztőkőből és szaktanácsadókból álló csapat, több mint 20 év tapasztalattal az üzleti folyamatok és az integráció területén_
- [Zeeve](https://www.zeeve.io/) - _az Ethereumra való építéshez nyújt termékeket és eszközöket, valamint infrastruktúrát és API-okat biztosít vállalati web3 alkalmazásoknak._

### Eszközök és könyvtárak {#tooling-and-libraries}

- [Baseline Project](https://www.baseline-protocol.org/) - _A Baseline Protocol egy olyan eszköz- és könyvtárkészlet, amely segít a vállalatoknak az összetett, többszereplős üzleti folyamatok és munkafolyamatok adatvédelmi szempontból történő koordinálásában, miközben az adatok a megfelelő nyilvántartási rendszerekben maradnak. A szabvány lehetővé teszi, hogy két vagy több állapotgép elérje és fenntartsa az adatok konzisztenciáját és a munkafolyamatok folytonosságát a hálózat közös referenciakeretként való használatával._
- [Chainlens](https://www.chainlens.com/) - _SaaS és on-prem blokklánc adat- és elemzési platform a Web3 Labs-től_
- [Ernst & Young 'Nightfall'](https://github.com/EYBlockchain/nightfall_3) - _egy alkalmazás az ERC-20, ERC-721 és ERC-1155 alkalmazások átvitelére zero-knowledge módon, optimista összesítés használatával_
- [Truffle Suite](https://trufflesuite.com) - _blokkláncfejlesztési csomag (Truffle, Ganache, Drizzle)_

### Skálázási megoldások {#scalability-solutions}

A [második blokkláncréteget (L2)](/layer-2) olyan technológiák vagy rendszerek alkotják, melyek az Ethereumon (L1) futnak, öröklik a biztonsági tulajdonságait az L1-től és nagyobb tranzakciófeldolgozási kapacitást (átvitelt) biztosítanak, alacsonyabb tranzakciós illetékkel (működési költség) és gyorsabb tranzakciómegerősítéssel, mint az L1 esetében. A 2. rétegű skálázási megoldások biztonságát az 1. réteg szolgáltatja, de a blokklánc alkalmazások számára elérhetővé teszik, hogy több felhasználót, tevékenységet vagy adatot kezeljenek, mint amire az 1. réteg képes lenne. A legtöbbjük a kriptográfiában és a zéró-tudású (ZK) bizonyíték kapcsán elért fejlődési eredményeket használja, hogy növelje a teljesítményt és a biztonságot.

Amennyiben Ön az alkalmazását egy L2 skálázási megoldásra építi, az [megoldhat több olyan problémát, mely korábban a cégeket arra késztette, hogy egy privát blokkláncon fejlesszenek](https://entethalliance.org/how-ethereum-layer-2-scaling-solutions-address-barriers-to-enterprises-building-on-mainnet/), mégis megtartja a főhálózat előnyeit.

## Vállalati alkalmazások a főhálózaton {#enterprise-live-on-mainnet}

Az alábbiakban néhány olyan vállalati alkalmazást talál, amelyeket a nyilvános Ethereum főhálózatra telepítettek

### Fizetések {#payments}

- A [Brave Browser](https://basicattentiontoken.org/) _a felhasználóknak fizet, hogy hirdetéseket nézzenek, a felhasználók pedig fizetéssel támogathatják a kiadókat a Basic Attention Token segítségével._
- [hCaptcha](https://www.hcaptcha.com/) _Botkizáró CAPTCHA rendszer, amely fizet a weboldal működtetőinek a felhasználók által végzett munkáért, akik a gépi tanulás számára jelölik az adatokat. Már telepítve van a Cloudflare-en is._
- Az [EthereumAds](https://ethereumads.com/) _lehetővé teszi a weboldal működtetőinek, hogy reklámhelyeket értékesítsenek és az Ethereum keresztül kapjanak érte pénzt_

### Pénzügy {#finance}

- [Santander Bank](https://www.coindesk.com/santander-settles-both-sides-of-a-20-million-bond-trade-on-ethereum) _kötvénykibocsátás és elszámolás_
- [Societe Generale](https://www.generali-investments.com/it/en/institutional/article/generali-investments-and-generali-iard-carry-out-first-market-transaction-based-on-blockchain-infrastructure) _kötványkibocsátás_
- [Cadence](https://www.forbes.com/sites/benjaminpirus/2019/10/09/fatburger-and-others-feed-30-million-into-ethereum-for-new-bond-offering/#513870be115b) _kötvényajánlat és FAT Brand-ek tokenizálása_
- [Sila](https://silamoney.com/) _bankolásra és ACH-fizetésre szolgáló infrastruktúra mint szolgáltatás egy stabil érmét használva_
- [Taurus](https://www.taurushq.com/) _tokenizált részvények kibocsátása_

### Eszköztokenizálás {#tokenization}

- A [Tinlake](https://tinlake.centrifuge.io/) _követelések finanszírozását végzi tokenizált valós eszközökön keresztül, mint például a számlák, jelzálogok vagy műsorszolgáltatási jogdíjak_
- A [RealT](https://realt.co/) _révén a befektetők a világ minden részéről vásárolhatnak az amerikai ingatlanpiacon a szabályozásnak megfelelő, tokenizált résztulajdont._
- Az [AgroToken](https://agrotoken.io/en/home) _mezőgazdasági anyagokat tokenizál és kereskedik velük_
- A [Fasset](https://www.fasset.com/) _egy platform a fenntartható infrastruktúráért_

### Adatok notarizációja {#notarization-of-data}

- [BBVA](https://www.ledgerinsights.com/bbva-blockchain-loan-banking-tech-award/) _a véglegesített hitelek adatait hash-elik és a főhálózaton rögzítik_
- [ANSA](https://cointelegraph.com/news/italys-top-news-agency-uses-blockchain-to-fight-fake-coronavirus-news) _Olaszország legnagyobb hírügynöksége az álhírek ellen küzd, és lehetővé teszi az olvasók számára, hogy a hírek eredetét a főhálózaton történő rögzítéssel ellenőrizzék_
- [Verizon](https://decrypt.co/46745/verizon-news-press-releases-ethereum-full-transparency) _Naplózza a sajtóközleményeket az Ethereumon a vállalati elszámoltathatóság és bizalom biztosítása érdekében_
- [Breitling](https://www.coindesk.com/breitling-arianee-all-new-watches-ethereum) _az órák származását és javítási történetét rögzíti az Ethereumon_
- [EthSign](https://ethsign.xyz/) _feljegyezi az Ethereum-blokkláncra az aláírt elektronikus dokumentumokat_

### Ellátási lánc {#supply-chain}

- A [Morpheus.network](https://morpheus.network/) _egy ellátásilánc-automatizálási platform, amely egy privát láncokból és a notarizált adatokat tartalmazó Ethereum főhálózatból álló hibridet vezetett be, és olyan cégek használják, mint a kanadai élelmiszer-, olaj- és gázelosztó Federated Co-op Ltd. vagy az argentin kisállateledel-gyártó Vitalcan_
- [Minespider](https://www.minespider.com/) _ellátási lánc nyomon követése_
- [EY OpsChain Network Procurement](https://blockchain.ey.com/products/contract-manager) _egy beszerzési munkafolyamatot biztosít a cégek számára, melynek során ajánlatbekéréseket (RFQ), szerződéseket, rendeléseket és számlákat bocsát ki az Ön megbízható üzleti partnereiből álló hálózatán keresztül_
- [Treum](https://treum.io/) _átláthatóságot, nyomonkövethetőséget és kereskedési lehetőséget biztosít ellátási láncoknak blokklánc-technológia használatával_
- [TradeTrust](https://www.tradetrust.io/) _az elektronikus fuvarleveleket (eBLs) ellenőrzi a nemzetközi szállításban_

### Biztosítás {#insurance}

- [Arbol](https://www.arbolmarket.com/) _egy parametrikus biztosítás az időjárásból eredő kockázatok fedezésére_
- [Etherisc](https://etherisc.com/) _decentralizált biztosítás különféle kockázatokra_

### Hitelesítő adatok és tanúsítványok {#credentials}

- [Két olasz középiskola](https://cointelegraph.com/news/two-italian-high-schools-to-issue-digital-diplomas-with-blockchain) _az Ethereum főhálozaton kiállított digitális diplomákat használ_
- [Szt. Galleni Egyetem](https://cointelegraph.com/news/swiss-university-fights-fake-diplomas-with-blockchain-technology) _Kísérleti projekt a svájci egyetemek diplomáinak ellenőrzésére_
- [Hyland Credentials](https://www.hylandcredentials.com) _digitális diplomákat és más oktatási igazolványokat, engedélyeket és bizonyítványokat bocsát ki_
- [OpenCerts](https://opencerts.io/faq) _blokkláncoktatási bizonyítványokat ad ki Szingapúrban_
- [BlockCerts](https://www.blockcerts.org/) _egy nyílt szabványt fejlesztett a blokklánc-hitelesítőknek _

### Eszközök {#utilities}

- [GridPlus](https://blog.gridplus.io/gridplus-is-live-in-texas-efc83c814601) _Áramdíjfizetés_

Ha szeretne valamit hozzáadni a listához, akkor tekintse át a [közreműködésre vonatkozó instrukciókat](/contributing/).
