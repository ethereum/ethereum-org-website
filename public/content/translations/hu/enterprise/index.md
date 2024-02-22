---
title: Vállalatok az Ethereum főhálózaton
description: Útmutatók, cikkek és eszközök a nyilvános Ethereum blokkláncon lévő vállalati alkalmazásokról
lang: hu
---

# Ethereum főhálózat vállalatoknak {#ethereum-for-enterprise}

A blokklánc alkalmazások segítenek a vállalatoknak:

- Növelni a bizalmat és csökkenteni az üzleti partnerek közötti koordináció költségét
- Javítani a felelősségre vonhatóságot és a működtetési hatékonyságot az üzleti hálózatokban
- Új üzleti modelleket és értékteremtő lehetőségeket kifejleszteni
- Versenyképesen jövőbiztossá tenni a szervezeteiket

A vállalati blokkláncalkalmazások fejleszthetőek a nyilvános, engedély nélküli Ethereum [főhálózatra](/glossary/#mainnet) vagy privát blokkláncokra, melyek az Ethereum technológiáján alapulnak. Tudjon meg többet a [privát vállalati Ethereum láncokról](/enterprise/private-ethereum/).

## Nyilvános versus privát Ethereum {#private-vs-public}

Csak egy nyilvános Ethereum főhálózat létezik. A főhálózatra épült alkalmazások integrálódhatnak egymással, hasonlóan ahogy az internetre épített alkalmazások egymáshoz kapcsolódhatnak, kihasználva ezzel a decentralizált blokklánc teljes potenciálját.

Számos vállalat és konzorcium indított privát, engedélyköteles blokkláncot specifikus alkalmazásokhoz, melyek az Ethereum technológiáján alapulnak.

### Legfontosabb különbségek {#key-differences}

- Blokklánc biztonság/megváltoztathatóság - A blokklánc ellenállását az adatmódosítás ellen a konszenzus algoritmusa határozza meg. Az Ethereum főhálózatot több ezer független csomópont együttműködése biztosítja, amelyeket egyének és bányászok vezetnek szerte a világon. A privát láncoknak általában kevés csomópontja van, amelyeket egy vagy több szervezet irányít; ezeket a csomópontokat szigorúan lehet ellenőrizni, de elég néhány felett átvenni az irányítást a lánc átírása vagy hamis tranzakciók végrehajtása érdekében.
- Teljesítmény - Mivel a vállalatok privát Ethereum láncai nagy teljesítményű csomópontokat használhatnak, speciális hardverkövetelményekkel és különböző konszenzusalgoritmusokkal, például a jogosítványigazolással (proof-of-authority), így magasabb tranzakciós átvitelt érhetnek el az első blokkláncrétegen (L1). Az Ethereum főhálózaton nagy átvitel érhető el a [második blokkláncréteg (L2) skálázási megoldásaival](/developers/docs/scaling/#layer-2-scaling).
- Költség - A privát lánc működtetésének költségei elsősorban a lánc felállításához és kezeléséhez szükséges munkában, valamint a szerverek futtatásában mutatkoznak meg. Bár annak nincs költsége, hogy az Ethereum főhálózathoz csatlakozzon, minden tranzakció gázköltséget von maga után, amelyet etherben kell kifizetni. Tranzakcióközvetítőket (amolyan gáztöltőállomásokat) fejlesztettek, hogy a felhasználóknak és még a vállalatoknak se kelljen közvetlenül ethert használni a tranzakcióik során. Néhány [elemzés](https://github.com/EYBlockchain/fundamental-cost-of-ownership/blob/master/EY%20Total%20Cost%20of%20Ownership%20for%20Blockchain%20Solutions.pdf) kimutatta, hogy egy alkalmazás működtetésének teljes költsége alacsonyabb lehet a főhálózaton, mint egy privát lánc futtatásával.
- Csomóponti engedélyezés - Csak felhatalmazott csomópontok csatlakozhatnak a privát láncokhoz. Bárki felállíthat egy csomópontot az Ethereum főhálózatán.
- Adatvédelem - A privát láncok adataihoz való hozzáférést elsősorban a hálózati hozzáférés korlátozásával lehet szabályozni, kifinomultabb szinten a hozzáférés-szabályozással és privát tranzakciókkal. A főhálózat L1 rétegére írt minden adat bárki számára hozzáférhető, így az érzékeny információkat láncon kívül kell tárolni és továbbítani, vagy titkosítani kell azokat. Az ilyen dizájnminták elterjedőben vannak (például Baseline, Aztec), csakúgy mint az L2-es megoldások, melyek szétválasztják és az L1-en kívül kezelik az adatot.

### Miért építsünk az Ethereum főhálózaton {#why-build-on-ethereum-mainnet}

A vállalkozások 2016 óta kísérleteztek a blokklánctechnológiával, amikor elindították a Hyperledger, a Quorum és a Corda projekteket. A hangsúly főleg a privát, engedélyköteles, vállalati blokkláncokon volt, de 2019-től kezdődően elmozdult a gondolkodás a privát irányából a nyilvános blokkláncok felé az üzleti alkalmazások esetében. Egy [felmérés](https://assets.ey.com/content/dam/ey-sites/ey-com/en_gl/topics/blockchain/ey-public-blockchain-opportunity-snapshot.pdf), melyet a Forrester vezettet, kimutatta, hogy „A felmérésben résztvevők... látják ezt a lehetőséget, s 75%-uk valószínűleg kihasználná a nyilvános blokkláncokat a jövőben, és közel egyharmaduk állította azt, hogy ennek nagy a valószínűsége.” Paul Brody az Ernst & Youngtól [beszélt](https://www.youtube.com/watch?v=-ycu5vGDdZw&feature=youtu.be&t=3668) a nyilvános blokkláncokra történő fejlesztés előnyeiről, mely (az alkalmazástól függően) magasabb szintű biztonságot/megváltoztathatatlanságot, transzparenciát, alacsonyabb birtoklási költséget, és a főhálózaton lévő többi alkalmazással történő interoperabilitási képességét nyújthatja (hálózati hatások). A közös referenciakeret megosztása a vállalkozások között elkerülhetővé teszi a szegregált rendszerek felesleges létrehozását, amelyek nem képesek kommunikálni, megosztani vagy szinkronizálni az információkat egymással.

Egy másik fejlesztés, mely a nyilvános blokkláncokra tereli a figyelmet a [második blokkláncréteg (L2)](/developers/docs/scaling/#layer-2-scaling) elérhetősége. Az L2 elsősorban egy skálázási technológia, mely magas átvitelű alkalmazásokat tesz lehetővé a nyilvános blokkláncokon. De az L2 megoldások egy [másik kihívásokra is megoldást nyújthatnak, melyek a vállalati fejlesztőket korábban a privát láncok választására kényszerítették](https://entethalliance.org/how-ethereum-layer-2-scaling-solutions-address-barriers-to-enterprises-building-on-mainnet/).

## Vállati fejlesztői anyagok {#enterprise-developer-resources}

### Szervezetek {#organizations}

Különféle szervezetek számtalan együttműködésen alapuló erőfeszítést tettek azért, hogy az Ethereumot vállalkozásbarátabbá tegyék:

- [Enterprise Ethereum Alliance (EEA)](https://entethalliance.org/) Az EEA lehetővé teszi a szervezetek számára, hogy bevezessék és használják az Ethereum technológiát napi üzleti tevékenységükben. Arra sarkallja az Ethereum ökoszisztémát, hogy új üzleti lehetőségeket jelenjenek meg, növekedjen az iparági adoptáció, valamint tanuljanak és kollaboráljanak egymással a résztvevők. Az EEA főhálózati munkacsoportja fókuszpontot jelent az üzleti vállalkozások képviselői számára, akik érdekeltek a nyilvános Ethereum főhálózaton történő építésében, valamint az Ethereum közösség tagjai számára, akik támogatni szeretnék őket.
- [Ethereum OASIS Open Project](https://github.com/ethereum-oasis/oasis-open-project) Ez egy OASIS Open Project, amely azért létezik, hogy semleges fórumot biztosítson a különböző érdekelt felek számára, hogy magas színvonalú specifikációkat hozzanak létre, amelyek megkönnyítik az Ethereum hosszú élettartamát, interoperabilitását és könnyű integrációját. A projekt célja világos, nyílt szabványok, magas színvonalú dokumentációk és megosztott tesztcsomagok kifejlesztése, amelyek megkönnyítik az Ethereum protokoll új funkcióit és továbbfejlesztéseit.
- [Baseline Project](https://www.baseline-protocol.org/) A Baseline Protocol egy nyílt forráskódú kezdeményezés, amely egyesíti a kriptográfia, az üzenetküldés és a blokklánc fejlesztéseit, hogy biztonságos és privát üzleti folyamatokat nyújtson alacsony költségen, az Ethereum nyilvános főhálózatán keresztül. A protokoll bizalmas és összetett együttműködést tesz lehetővé a vállalkozások között anélkül, hogy érzékeny adatokat hagyna a láncon. A Baseline Project az Ethereum OASIS Open Project egy alprojektje és a Baseline Technical Steering Committee irányítja.

### Termékek és szolgáltatások {#products-and-services}

- Az [Alchemy](https://www.alchemy.com/) _API szolgáltatásokat és eszközöket szolgáltat az Ethereum alkalmazások fejlesztéséhez és monitorozásához_
- A [Blast](https://blastapi.io/) _egy API platform, ami RPC/WSS API-okat biztosít az Ethereum archív főhálózathoz és a teszthálózatokhoz._
- A [Blockapps](https://blockapps.net/) _a vállalati Ethereum protokoll, az eszközök és az API-ok implementációja, melyek a STRATO platformot alkotják_
- A [Chainstack](https://chainstack.com/) _az Ethereum főhálózatára és teszthálózataira biztosít infrastruktúrást, melyet publikus & elkülönített vevői felhőkben hosztol_
- A [ConsenSys](https://consensys.net/) _számos terméket és eszközt kínál az Ethereum fejlesztésére, valamint tanácsadási és egyedi fejlesztési szolgáltatásokat nyújt_
- Az [Envision Blockchain](https://envisionblockchain.com/) _az Ethereum főhálózatra szakosodott, vállalati fókuszú, tanácsadási és fejlesztési szolgáltatásokat nyújt_
- Az [EY OpsChain](https://blockchain.ey.com/products/contract-manager) _egy beszerzési munkafolyamatot biztosít, melynek során ajánlat bekéréseket (RFQ), szerződéseket, rendeléseket és számlákat bocsát ki az Ön megbízható üzleti partnereiből álló hálózatán keresztül_
- A [Hyperledger Besu](https://www.hyperledger.org/use/besu) _egy vállalati fókuszú, nyílt forráskódú Ethereum kliens Apache 2.0 licensszel fejlesztve és Java-ban írva_
- Az [Infura](https://infura.io/) _egy skálázható API hozzáférés az Ethereumhoz és az IPFS hálozatokhoz_
- A [Kaleido](https://kaleido.io/) _egy vállalati fókuszú fejlesztési platform, ami egyszerűsített blokklánc- és digitális eszköz alkalmazásokat ajánl_
- A [NodeReal](https://nodereal.io/) _skálázható blokkláncinfrastruktúrát és API szolgáltatásnyújtókat biztosít a web3 ökoszisztémának_
- A [Provide](https://provide.services/) _infrastruktúrát és API-okat biztosít vállalati web3 alkalmazásoknak_
- A [QuickNode](https://www.quicknode.com/) _megbízható és gyors csomópontokat biztosít magas szintű API-okkal, mint amilyen az NFT API, Token API stb., miközben egy egységes termékcsomagot és vállalati szintű megoldásokat szállít_
- A [Tenderly](https://tenderly.co) _egy web3 fejlesztői platform, ami okosszerződés fejlesztéshez, teszteléshez, monitorozáshoz és működtetéshez biztosít hibakeresési, megfigyelhetőségi és infrastruktúrához kapcsolódó építőelemeket_
- A [Unibright](https://unibright.io/) _egy blokklánc specialistákból, tervezőkből, fejlesztőkőből és szaktanácsadókból álló csapat, több mint 20 év tapasztalattal az üzleti folyamatok és az integráció területén_
- A [Zero Services GmbH](https://www.zeroservices.eu/) _ menedzselt szolgáltatásokat biztosít európai és ázsiai közös helyeken keresztül. Működteti & monitorozza az Ön csomópontjait biztonságos és megbízható módon_
- A [Zeeve](https://www.zeeve.io/) _az Ethereumra való építéshez nyújt termékeket és eszközöket, valamint infrastruktúrát és API-okat biztosít vállalati web3 alkalmazásoknak_

### Eszközök és könyvtárak {#tooling-and-libraries}

- Az [Alethio](https://explorer.aleth.io/) _egy Ethereum adatelemzési platform_
- A [Sirato](https://www.web3labs.com/sirato) _egy adat és elemzési platform publikus és privát, Ethereum kompatibilis hálózatokhoz, melyet a Web3 Labs fejlesztett_
- Az [Ernst & Young Nightfall](https://github.com/EYBlockchain/nightfall) _ egy eszköztár privát tranzakciókhoz_
- Az [EthSigner](https://github.com/ConsenSys/ethsigner) _egy tranzakció aláírási alkalmazás, amelyet egy web3 szolgáltatóval kell használni_
- A [Tenderly](https://tenderly.co/) _egy adatplatform, mely valós idejű elemzéseket, figyelmeztetéseket és monitorozást kínál támogatással együtt privát láncoknak._
- A [Truffle Suite](https://trufflesuite.com) _egy blokkláncfejlesztési csomag (Truffle, Ganache, Drizzle)_

### Skálázási megoldások {#scalability-solutions}

A [második blokkláncréteget (L2)](/layer-2) olyan technológiák vagy rendszerek alkotják, melyek az Ethereumon (L1) futnak, öröklik a biztonsági tulajdonságait az L1-től és nagyobb tranzakciófeldolgozási kapacitást (átvitelt) biztosítanak, alacsonyabb tranzakciós díjjal (működési költség) és gyorsabb tranzakció megerősítést, mint az L1 esetében. Az L2 skálázási megoldások biztonságát az L1 szolgáltatja, de a blokkláncalkalmazások számára elérhetővé teszik, hogy több felhasználót, tevékenységet vagy adatot kezeljenek, mint amire az L1 képes lenne. A legtöbbjük a kriptográfiában és a zero-knowledge (ZK) bizonyítékok kapcsán elért fejlődési eredményeket használja, hogy növelje a teljesítményt és a biztonságot.

Amennyiben Ön az alkalmazását egy L2 skálázási megoldásra építi, az [megoldhat több olyan problémát, mely korábban a cégeket arra késztette, hogy egy privát blokkláncon fejlesszenek](https://entethalliance.org/how-ethereum-layer-2-scaling-solutions-address-barriers-to-enterprises-building-on-mainnet/), mégis megtartja a főhálózat előnyeit.

## Vállalati alkalmazások a főhálózaton {#enterprise-live-on-mainnet}

Az alábbiakban néhány vállalati alkalmazást talál, melyek telepítve lettek a nyilvános Ethereum főhálózatra

### Fizetések {#payments}

- A [Brave Browser](https://basicattentiontoken.org/) _a felhasználóknak fizet, hogy hirdetéseket nézzenek, a felhasználók pedig fizetéssel támogathatják a kiadókat a Basic Attention Token segítségével._
- Az [hCaptcha](https://www.hcaptcha.com/) _egy Bot-megelőző CAPTCHA rendszer, mely fizet a weboldal működtetőnek a felhasználók által végzett munkáért, akik a gépi tanuláshoz megjelölik az adatokat. Már telepítve van a Cloudflare-en is._
- Az [EthereumAds](https://ethereumads.com/) _lehetővé teszi a weboldal működtetőknek, hogy reklámhelyeket értékesítsenek és az Ethereum keresztül kapjanak érte pénzt_

### Pénzügy {#finance}

- A [Santander Bank](https://www.coindesk.com/santander-settles-both-sides-of-a-20-million-bond-trade-on-ethereum) _kötvénykiadást és elszámolást épített_
- A [Societe Generale](https://www.generali-investments.com/it/en/institutional/article/generali-investments-and-generali-iard-carry-out-first-market-transaction-based-on-blockchain-infrastructure) _kötvénykiadásra használja_
- A [Cadence](https://www.forbes.com/sites/benjaminpirus/2019/10/09/fatburger-and-others-feed-30-million-into-ethereum-for-new-bond-offering/#513870be115b) _kötvénykibocsájtást és a FAT brandek tokenizálást végzi_
- A [Sila](https://silamoney.com/) _bankolásra és ACH fizetésre ad infrastruktúra mint szolgáltatást egy stabilérmét használva_
- A [Taurus](https://www.taurushq.com/) _tokenizált részvényeket bocsát ki_

### Eszköztokenizálás {#tokenization}

- A [Tinlake](https://tinlake.centrifuge.io/) _követelések finanszírozását végzi tokenizált valós eszközökön keresztül, mint például a számlák, jelzálogok vagy műsorszolgáltatási jogdíjak_
- A [RealT](https://realt.co/) _révén a befektetők a világ minden részéről vásárolhatnak az amerikai ingatlanpiacon a szabályozásnak megfelelő, tokenizált résztulajdont._
- Az [AgroToken](https://agrotoken.io/en/) _ mezőgazdasági anyagokat tokenizál és kereskedik velük_
- A [Fasset](https://www.fasset.com/) _egy platform a fenntartható infrastruktúráért_

### Adatok notarizációja {#notarization-of-data}

- A [BBVA](https://www.ledgerinsights.com/bbva-blockchain-loan-banking-tech-award/) _a véglegesített kölcsönök részleteit hasheli és feljegyzi a főhálózatra_
- A [Splunk](https://www.splunk.com/en_us/blog/security/the-newest-data-attack.html) _az adatok integritását biztosítja azzal, hogy az indexelt adatok hashét rendszeresen feljegyzi a főhálózatra_
- Az [ANSA](https://cointelegraph.com/news/italys-top-news-agency-uses-blockchain-to-fight-fake-coronavirus-news) _Olaszország legnagyobb hírügynöksége, mely küzd a hamis hírek ellen, és a főhálózatra történő feljegyzéssel lehetővé teszi az olvasók számára, hogy ellenőrizzék az új hírek eredetiségét_
- A [Verizon](https://decrypt.co/46745/verizon-news-press-releases-ethereum-full-transparency) _az Ethereumra naplózza a sajtókiadványokat, biztosítva ezzel a vállalati elszámoltathatóságot és bizalmat_
- A [Breitling](https://www.coindesk.com/breitling-arianee-all-new-watches-ethereum) _rögzíti az órák származását és javítási részleteit az Ethereumra_
- Az [EthSign](https://ethsign.xyz/) _feljegyezi az Ethereum blokkláncra az aláírt elektronikus dokumentumokat_

### Ellátási lánc {#supply-chain}

- A [CargoX](https://cargox.io/press-releases/full/cargox-becomes-first-public-blockchain-ethereum-bill-lading-provider-approved-international-group-pi-clubs) _egy fuvarlevél és dokumentumátviteli szolgáltató_
- A [Morpheus.network](https://morpheus.network/) _egy ellátási lánc automatizálási platform, mely egy privát láncokból és a notarizált adatokat tartalmazó Ethereum főhálózatból álló hibridet vezetett be, és olyan cégek használják, mint a kanadai élelmiszer, olaj & gáz elosztó Federated Co-op Ltd. és az argentín kisállateledel gyártó Vitalcan_
- A [Minespider](https://www.minespider.com/) _ellátási lánc nyomonkövetést biztosít_
- Az [EY OpsChain Network Procurement](https://blockchain.ey.com/products/contract-manager) _egy beszerzési munkafolyamatot biztosít a cégek számára, melynek során ajánlat bekéréseket (RFQ), szerződéseket, rendeléseket és számlákat bocsát ki az Ön megbízható üzleti partnereiből álló hálózatán keresztül_
- A [Treum](https://treum.io/) _átláthatóságot, nyomonkövethetőséget és kereskedési lehetőséget biztosít ellátási láncoknak blokklánctechnológia használatával_
- A [TradeTrust](https://www.tradetrust.io/) _az elektronikus fuvarleveleket (eBLs) ellenőriz a nemzetközi szállításban_
- A [Birra Peroni](https://www.ey.com/en_gl/news/2021/05/birra-peroni-is-the-first-industrial-organization-to-mint-unique-non-fungible-tokens-using-ey-opschain-traceability) _ minden egyes új söradaghoz NFT-t hoz létre, hogy ezzel nagyobb rálátása legyen a teljes ellátási láncra, s így nagyobb hatékonyságot érjen el_

### Biztosítás {#insurance}

- Az [Arbol](https://www.arbolmarket.com/) _egy parametrikus biztosítás az időjárásból eredő kockázatok fedezésére_
- Az [Etherisc](https://etherisc.com/) _egy decentralizált biztosítás különféle kockázatokra_

### Hitelesítő adatok és tanúsítványok {#credentials}

- [Két olasz középiskola](https://cointelegraph.com/news/two-italian-high-schools-to-issue-digital-diplomas-with-blockchain) _digitális érettségiket bocsát ki az Ethereum főhálózaton_
- A [St. Gallen Egyetem](https://cointelegraph.com/news/swiss-university-fights-fake-diplomas-with-blockchain-technology) _ Svájcban diplomák hitelesítésére készített egy pilot projektet_
- A [Hyland Credentials](https://www.hylandcredentials.com) _digitális diplomákat és más oktatási igazolványokat, engedélyeket és bizonyítványokat bocsát ki_
- Az [OpenCerts](https://opencerts.io/faq) _blokkláncoktatási bizonyítványokat ad ki Szingapúrban_
- A [BlockCerts](https://www.blockcerts.org/) _egy nyílt szabványt fejlesztett a blokklánc hitelesítőknek _

### Eszközök {#utilities}

- A [GridPlus](https://blog.gridplus.io/gridplus-is-live-in-texas-efc83c814601) _elektromos fizetéseket biztosít_

Ha szeretne valamit hozzáadni a listához, akkor tekintse át a [közreműködésre vonatkozó instrukciókat](/contributing/).
