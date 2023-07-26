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

Vállalati blokklánc alkalmazások fejleszthetőek a nyilvános, engedély nélküli Ethereum [főhálózatra](/glossary/#mainnet) vagy privát blokkláncokra, melyek az Ethereum technológiáján alapulnak. Tudj meg többet a [privát vállalati Ethereum láncokról](/enterprise/private-ethereum/).

## Nyilvános vs privát Ethereum {#private-vs-public}

Csak egy nyilvános Ethereum főhálózat létezik. A főhálózatra épült alkalmazások integrálódhatnak egymással, hasonlóan ahogy az internetre épített alkalmazások egymáshoz kapcsolódhatnak, kihasználva ezzel a decentralizált blokklánc teljes potenciálját.

Számos vállalat és konzorcium indított privát, engedélyköteles blokkláncot specifikus alkalmazásokhoz, melyek az Ethereum technológiáján alapulnak.

### Legfontosabb különbségek {#key-differences}

- Blokklánc biztonság/megváltoztathatóság - A blokklánc ellenállását az adatmódosítás ellen a konszenzus algoritmusa határozza meg. Az Ethereum főhálózatot több ezer független csomópont együttműködése biztosítja, amelyeket egyének és bányászok vezetnek szerte a világon. A privát láncoknak általában kevés csomópontja van, amelyeket egy vagy több szervezet irányít; ezeket a csomópontokat szigorúan lehet ellenőrizni, de elég néhány felett átvenni az irányítást a lánc átírása vagy hamis tranzakciók végrehajtása érdekében.
- Teljesítmény - Mivel a vállalatok privát Ethereum láncai nagy teljesítményű csomópontokat használhatnak, speciális hardverkövetelményekkel és különböző konszenzus algoritmusokkal, például a proof-of-authority-vel, így magasabb tranzakciós átvitelt érhetnek el az alaprétegen (1. réteg). Az Ethereum főhálózaton nagy átvitel érhető el a [2. rétegű skálázási megoldások használatával](/developers/docs/layer-2-scaling/).
- Költség - A privát lánc működtetésének költségei elsősorban a lánc felállításához és kezeléséhez szükséges munkában, valamint a szerverek futtatásában mutatkoznak meg. Bár nincs költsége csatlakozni az Ethereum főhálózathoz, minden tranzakció gáz költséget von maga után, amelyet Ether-ben kell kifizetni. Tranzakció váltókat (más néven benzinkutakat) fejlesztettek, hogy a felhasználóknak és még a vállalatoknak se kelljen közvetlenül Ether-t használni a tranzakcióik során. Néhány [elemzés](https://github.com/EYBlockchain/fundamental-cost-of-ownership/blob/master/EY%20Total%20Cost%20of%20Ownership%20for%20Blockchain%20Solutions.pdf) kimutatta, hogy egy alkalmazás működtetésének teljes költsége alacsonyabb lehet a főhálózaton, mint egy privát lánc futtatásával.
- Csomóponti engedélyezés - Csak felhatalmazott csomópontok csatlakozhatnak a privát láncokhoz. Bárki felállíthat egy csomópontot az Ethereum főhálózatán.
- Adatvédelem - A privát láncokra írt adatokhoz való hozzáférést a hálózatra való hozzáférés korlátozásával lehet szabályozni, és alaposabban hozzáférés-szabályozással és privát tranzakciókkal. A főhálózat 1. rétegére írt minden adat bárki számára hozzáférhető, így az érzékeny információkat off-chain kell tárolni és továbbítani, vagy titkosítani kell őket. Az ilyen design minták felemelkedőben vannak (pl.: Baseline, Aztec), csakúgy mint a 2. rétegű megoldások, melyek szétválasztják és az 1.rétegen kívül kezelik az adatot.

### Miért építsünk az Ethereum főhálózaton {#why-build-on-ethereum-mainnet}

A vállalkozások 2016 óta kísérleteztek a blokklánc technológiával, amikor elindították a Hyperledger, a Quorum és a Corda projekteket. A hangsúly főleg a privát engedélyköteles vállalati blokkláncokra helyezkedett, de 2019-től kezdődően váltás történt a gondolkodásban az nyilvános vagy privát blokkláncok használatára az üzleti alkalmazások esetében. Egy [felmérés](https://assets.ey.com/content/dam/ey-sites/ey-com/en_gl/topics/blockchain/ey-public-blockchain-opportunity-snapshot.pdf), melyet a Forrester vezettet, kimutatta, hogy "A felmérésben résztvevők 75%-a ... látja a lehetőséget, hogy egy valószínűséggel kihasználják majd a nyilvános blokkláncokat a jövőben, és közel kétharmaduk állította azt, hogy nagy valószínűséggel. Paul Brody az EY-tól [beszélt](https://www.youtube.com/watch?v=-ycu5vGDdZw&feature=youtu.be&t=3668) a nyilvános blokkláncokra történő fejlesztés előnyeiről, mely (az alkalmazástól függően) magasabb szintű biztonságot/megváltoztathatatlanságot, transzparenciát, a tulajdonjog alacsonyabb teljes költségét, és a többi alkalmazással történő interoperabilitási képességét nyújthatja, melyek szintén a főhálózaton vannak (hálózati hatások). A közös referenciakeret megosztása a vállalkozások között elkerülhetővé teszi a különféle szegregált silók felesleges létrehozását, amelyek nem képesek kommunikálni, megosztani vagy szinkronizálni az információkat egymással.

Egy másik fejlesztés, mely a nyilvános blokkláncokra tereli a figyelmet a [2. réteg technológia](/developers/docs/layer-2-scaling/). A 2. réteg elsősorban egy skálázási technológia kategória, mely magas átvitelű alkalmazásokat tesz lehetővé a nyilvános blokkláncokon. De a 2. réteg megoldások egy [másik kihívásra is megoldást nyújthatnak, melyek a vállalati fejlesztőket régen a privát láncok választására kényszerítette](https://entethalliance.org/how-ethereum-layer-2-scaling-solutions-address-barriers-to-enterprises-building-on-mainnet/).

Az Baseline protokoll az egyik kulcsfontosságú projekt, amely olyan protokollt határoz meg, amely bizalmas és összetett együttműködést tesz lehetővé a vállalkozások között anélkül, hogy érzékeny adatokat hagynának a láncon. Nagy [lendületet](https://www.oasis-open.org/news/pr/baseline-protocol-achieves-key-milestone-with-release-of-v0-1-implementation-for-enterprise-) szereztek 2020 folyamán.

## Vállati fejlesztői anyagok {#enterprise-developer-resources}

### Szervezetek {#organizations}

Az Ethereum vállalkozásbarátabbá tételére irányuló egyes együttműködési törekvések különböző szervezetek munkájának eredménye:

- [Enterprise Ethereum Alliance (EEA)](https://entethalliance.org/) Az EEA lehetővé teszi a szervezetek számára, hogy bevezessék és használják az Ethereum technológiát napi üzleti tevékenységükben. Arra sarkalja az Ethereum ökoszisztémát, hogy új üzleti lehetőségeket teremtsen, felfuttassa az iparági adoptációt, valamint tanuljanak és kollaboráljanak egymással a résztvevők. Az EEA főhálózati munkacsoportja fókuszpontot jelent az üzleti vállalkozások képviselői számára, akik érdekeltek a nyilvános Ethereum főhálózaton történő építésében, valamint az Ethereum közösség tagjai számára, akik támogatni szeretnék őket.
- [Ethereum OASIS Open Project](https://github.com/ethereum-oasis/oasis-open-project) Az Ethereum OASIS Open Projekt egy OASIS Open Project, amely azért létezik, hogy semleges fórumot biztosítson a különböző érdekelt felek számára, hogy magas színvonalú specifikációkat hozzanak létre, amelyek megkönnyítik az Ethereum hosszú élettartamát, interoperabilitását és könnyű integrációját. A projekt célja világos, nyílt szabványok, magas színvonalú dokumentációk és megosztott tesztcsomagok kifejlesztése, amelyek megkönnyítik az Ethereum protokoll új funkcióit és továbbfejlesztéseit.
- [Baseline Project](https://www.baseline-protocol.org/) A Baseline Protocol egy nyílt forráskódú kezdeményezés, amely egyesíti a kriptográfia, az üzenetküldés és a blokklánc fejlesztéseit, hogy biztonságos és privát üzleti folyamatokat nyújtson alacsony költségen, az Ethereum nyilvános főhálózatán keresztül. A protokoll bizalmas és összetett együttműködést tesz lehetővé a vállalkozások között anélkül, hogy érzékeny adatokat hagyna a láncon. A Baseline Project az Ethereum OASIS Open Project egy alprojektje és a Baseline Technical Steering Committe irányítja.

### Termékek és szolgáltatások {#products-and-services}

- [Alchemy](https://alchemyapi.io/) _API szolgáltatásokat és eszközöket szolgáltat az Ethereum alkalmazások fejlesztéséhez és monitorozásához_
- [Blockapps](https://blockapps.net/) _az Enterprise Ethereum implementációja, eszközök, API-ok, melyek a STRATO platformot alkotják_
- [ConsenSys](https://consensys.net/) _számos terméket és eszközt kínál az Ethereum fejlesztésére, valamint tanácsadási és egyedi fejlesztési szolgáltatásokat_
- [Envision Blockchain](https://envisionblockchain.com/) _az Ethereum főhálózatra szakosodott, vállalati fókuszú tanácsadási és fejlesztési szolgáltatásokat nyújt_
- [EY OpsChain](https://blockchain.ey.com/products/contract-manager) _egy beszerzési workflow-t biztosít RFQ-k, szerződések, rendelések és számlák kiadásával az Ön megbízható üzleti partnereiből álló hálózaton keresztül_
- [Hyperledger Besu](https://www.hyperledger.org/use/besu) _egy vállalati fókuszú nyílt forráskódú Ethereum kliens Apache 2.0 licenccel fejlesztve és Java-ban írva_
- [Infura](https://infura.io/) _skálázható Ethereum és IPFS hálozat API hozzáférés_
- [Provide](https://provide.services/) _infrastruktúra és API-ok vállalati web3 alkalmazásoknak_
- [Unibright](https://unibright.io/) _egy blokklánc specialistákból, tervezőkből, fejlesztőkőből és szaktanácsadókból álló csapat több mint 20 év tapasztalattal az üzleti folyamatok és az integráció területén_

### Eszközök és könyvtárak {#tooling-and-libraries}

- [Alethio](https://aleth.io/) _Ethereum Data Analytics Platform_
- [Epirus](https://www.web3labs.com/epirus) _Egy platform blokklánc alkalmazások fejlesztésére, telepítésére és monitorozására a Web3 Labs által_
- [Ernst & Young's ‘Nightfall'](https://github.com/EYBlockchain/nightfall) _ eszköztár privát tranzakciókhoz_
- [EthSigner](https://github.com/ConsenSys/ethsigner) _Tranzakció aláírási alkalmazás, amelyet egy web3 szolgáltatóval kell használni_
- [Tenderly](https://tenderly.co/) _egy adat platform, mely valós idejű elemzéseket, figyelmeztetéseket és monitorozást kínál privát láncok támogatásával._
- [Truffle Suite](https://trufflesuite.com) _blockchain development suite (Truffle, Ganache, Drizzle)_

### Skálázási megoldások {#scalability-solutions}

A [2. réteget](/developers/docs/layer-2-scaling/) olyan technológiák vagy rendszerek alkotják, melyek az Ethereumon (1. réteg) futnak, öröklik a biztonsági tulajdonságait az 1. rétegről és nagyobb tranzakció feldolgozási kapacitást (átvitelt) biztosítanak, alacsonyabb tranzakciós díjjal (működési költség) és gyorsabb tranzakció megerősítést, mint az 1. réteg esetében. A 2. rétegű skálázási megoldások biztonságát az 1. réteg szolgáltatja, de a blokklánc alkalmazások számára elérhetővé teszik, hogy több felhasználót, tevékenységet vagy adatot kezeljenek, mint amire az 1. réteg képes lenne. A legtöbbjük kihasználja a legutóbbi fejlődési eredményeket a kriptográfiában és zero-knowledge (ZK) bizonyítékokat használnak, hogy növeljék a teljesítményt és a biztonságot.

Az alkalmazásod egy 2. rétegű skálázási megoldásra történő építése segíthet [megoldani sok olyan problémát, mely korábban a cégeket arra késztette, hogy egy privát blokkláncon fejlesszenek](https://entethalliance.org/how-ethereum-layer-2-scaling-solutions-address-barriers-to-enterprises-building-on-mainnet/), mégis megtartani a főhálózat előnyeit.

Példák L2 megoldásokra, melyek produkcióra készek, vagy hamarosan készen lesznek:

- Optimista összegzők (adat a láncon, csalási bizonyítékok)
  - [Optimism](https://optimism.io/)
  - [Offchain Labs Arbitrum Rollup](https://offchainlabs.com/)
  - [Fuel Network](https://fuel.sh)
- ZK összegzők (adat a láncon, ZK érvényességi bizonyítékok)
  - [Loopring](https://loopring.org)
  - [Starkware](https://starkware.co)
  - [Matter Labs zkSync](https://matter-labs.io/)
  - [Aztec 2.0](https://aztec.network/)
- Validium (adat a láncon kívül, ZK érvényességi bizonyítékok)
  - [Starkware](https://starkware.co)
  - [Matter Labs zkPorter](https://matter-labs.io/)
- Plasma (adat láncon kívül, csalási bizonyítékok)
  - [OMG Network](https://omg.network/)
  - [Gazelle](https://gzle.io)
  - [Matic Network](https://matic.network/)
  - [LeapDAO](https://ipfs.leapdao.org/)
- Állapot csatornák
  - [Connext](https://connext.network/)
  - [Raiden](https://raiden.network/)
  - [Perun](https://perun.network)
- Mellékláncok
  - [Skale](https://skale.network)
  - [POA Network](https://www.poa.network/)
- Hibrid megoldások, amelyek több kategória tulajdonságait ötvözik
  - [Celer](https://celer.network)

## Vállalati alkalmazások a főhálózaton {#enterprise-live-on-mainnet}

Itt egy pár vállalati alkalmazás, melyek telepítve lettek a nyilvános Ethereum főhálózatra

### Fizetések {#payments}

- [Brave Böngésző](https://basicattentiontoken.org/) _a felhasználókat fizetik, hogy hirdetéseket nézzenek és a felhasználók fizetéssel támogathatják a kiadókat a Basic Attention Token segítségével._
- [hCaptcha](https://www.hcaptcha.com/) _Bot megelőző CAPTCHA rendszer, mely fizet a weboldal működtetőnek a felhasználók által végzett munkáért, akik a gépi tanulás számára jelölik az adatokat. Már telepítve van a Cloudflare-en is._
- [Audius](https://audius.co/) _egy streaming szolgáltatás, mely összeköti a zene rajongókat közvetlenül a művészekkel, akiket teljes egészében a rajongóik fizethetnek ki, azonnal minden egyes stream után_

### Pénzügy {#finance}

- [Santander Bank](https://www.coindesk.com/santander-settles-both-sides-of-a-20-million-bond-trade-on-ethereum) _kötvény kiadás és elszámolás_
- [Societe Generale](https://www.societegenerale.com/en/newsroom-first-financial-transaction-settled-with-a-digital-currency) _kötvény kiadás_
- [Cadence](https://www.forbes.com/sites/benjaminpirus/2019/10/09/fatburger-and-others-feed-30-million-into-ethereum-for-new-bond-offering/#513870be115b) _kötvény kibocsájtás és a FAT brandek tokenizálása_
- [Sila](https://silamoney.com/) _banking és ACH fizetési infrastruktúra, mint szolgáltatás_
- [Tinlake](https://tinlake.centrifuge.io/) _Követelések finanszírozása tokenizált valós eszközökön keresztül, mint például a számlák, jelzálogok vagy streaming jogdíjak_
- [Kratos](https://triterras.com/kratos) _árupiaci kereskedés és pénzügyi platform, mely összeköti és lehetővé teszi az árukereskedőknek, hogy kereskedjenek és tőkét szerezzenek kölcsönzőktől közvetlenül online_
- [Fasset](https://www.fasset.com/) _egy platform a fenntartható infrastruktúráért_

### Adatok notarizációja {#notarization-of-data}

- [BBVA](https://www.ledgerinsights.com/bbva-blockchain-loan-banking-tech-award/) _a véglegesített kölcsönök részletei hashelődnek és feljegyzésre kerülnek a főhálózatra_
- [Splunk](https://www.splunk.com/en_us/blog/security/the-newest-data-attack.html) _az adatok integritása biztosítható az indexelt adatok hashének rendszeres feljegyzésével a főhálózatra_
- [ANSA](https://cointelegraph.com/news/italys-top-news-agency-uses-blockchain-to-fight-fake-coronavirus-news) _Olaszország legnagyobb hírügynöksége, mely küzd a fake news ellen és lehetővé teszi az olvasók számára, hogy ellenőrizzék az új hírek eredetiségét a főhálózatra történő feljegyzéssel_
- [Verizon](https://decrypt.co/46745/verizon-news-press-releases-ethereum-full-transparency) _logolja a sajtókiadványokat az Ethereumra biztosítva ezzel a vállalati elszámoltathatóságot és bizalmat_
- [Breitling](https://www.coindesk.com/breitling-arianee-all-new-watches-ethereum) _rögzíti az órák származását és javítását Ethereumra_

### Ellátási lánc {#supply-chain}

- [CargoX](https://cargox.io/press-releases/full/cargox-becomes-first-public-blockchain-ethereum-bill-lading-provider-approved-international-group-pi-clubs) _Fuvarlevél és dokumentumátvitel szolgáltató_
- [Morpheus.network](https://morpheus.network/) _ellátási lánc automatizálási platform, mely egy privát láncokból és a notarizált adatokat tartalmazó Ethereum főhálózatból álló hibridet vezetett be és olyan cégek használják, mint a kanadai élelmiszer, olaj & gáz elosztó Federated Co-op Ltd. és az argentín kisállat eledel Vitalcan_
- [Minespider](https://www.minespider.com/) _ellátási lánc nyomonkövetés_
- [ShipChain](https://shipchain.io) _Ethereum nyilvános oldallánc és vállalati rendszer az ellátási lánc láthatóságáért és megbízhatóságáért különösen a kombinált logisztika esetében_
- [Follow Our Fibre](https://www.followourfibre.com) _viszkózus ellátási lánc nyomon követhetőség_
- [EY OpsChain Network Procurement](https://blockchain.ey.com/products/contract-manager) _egy beszerzési workflow-ba történő belépést tesz lehetővé cégek számára RFQ-k, szerződések, rendelések és számlák kiadásával az Ön megbízható üzleti partnereiből álló hálózaton keresztül_
- [Treum](https://treum.io/) _átláthatóságot, nyomonkövethetőséget és kereskedési lehetőséget biztosít ellátási láncoknak blokklánc technológia használatával_

### Hitelesítő adatok és tanúsítványok {#credentials}

- [Utah Counties](http://www.utahcounty.gov/Dept/ClerkAud/DigitalCertCopy.html) _digitális házassági tanúsítványok kiadása Ethereumon_
- [Két olasz középiskola](https://cointelegraph.com/news/two-italian-high-schools-to-issue-digital-diplomas-with-blockchain) _digitális érettségik az Ethereum főhálózaton kibocsájtva_
- [St. Gallen Egyetem](https://cointelegraph.com/news/swiss-university-fights-fake-diplomas-with-blockchain-technology) _pilot project diplomák hitelesítésére egy svájci egyetem által_
- [Malta](https://cointelegraph.com/news/malta-to-store-education-certificates-on-a-blockchain) _az összes oktatási tanúsítvány rögzítve van a főhálózaton a [Hyland](https://www.learningmachine.com/)_ által
- [Pohang University of Science and Technology](https://www.theblockcrypto.com/linked/55176/south-korean-university-issues-blockchain-stored-diplomas-amid-the-spread-of-the-coronavirus) _dél-koreai egyetem, mely a frissen végzetteknek blokkláncon tárolt diplomákat ad_
- [OpenCerts](https://opencerts.io/) _blokklánc oktatási hitelesítéseket ad ki Szingapúrban_
- [BlockCerts](https://www.blockcerts.org/) _egy nyílt szabványt fejlesztett a blokklánc hitelesítőknek _
- [SkillTree](http://skilltree.org/) _Online készség képzés és tanúsítványok, amelyek a lejárati triggerekkel vagy más készségekkel kapcsolatos függőségekkel konfigurálhatók_

### Eszközök {#utilities}

- [GridPlus](https://blog.gridplus.io/gridplus-is-live-in-texas-efc83c814601) _elektromos fizetések_

Ha szeretnél valamit hozzáadni a listához, akkor nézd meg [ a közreműködési instrukciókat](/contributing/).
