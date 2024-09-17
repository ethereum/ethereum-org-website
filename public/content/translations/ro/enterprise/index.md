---
title: Mainnet-ul Ethereum pentru întreprinderi
description: Ghiduri, articole și instrumente despre aplicațiile pentru întreprinderi pe blockchain-ul Ethereum public
lang: ro
---

# Mainnet-ul Ethereum pentru întreprinderi {#ethereum-for-enterprise}

Aplicațiile Blockchain ajută întreprinderile:

- să crească încrederea și să reducă de asemenea costurile de coordonare între partenerii de afaceri
- să crească responsabilizarea rețelei de afaceri și eficiența operațională a acesteia
- să construiască noi modele de afaceri și oportunități de creare a valorii
- să garanteze competitivitatea organizației în viitor

Aplicațiile blockchain pentru întreprinderi pot fi construite pe [Mainnet-ul](/glossary/#mainnet) Ethereum, care este un sistem public fără autorizare sau pe blockchain-uri private bazate pe tehnologia Ethereum. Aflaţi mai multe informații despre [lanțurile private Ethereum pentru întreprinderi](/enterprise/private-ethereum/).

## Ethereum-ul public în comparaţie cu cel privat {#private-vs-public}

Există un singuru Mainnet Ethereum public. Aplicațiile construite pe Mainnet pot interopera în mod similar cu cel în care aplicațiile construite pe internet se pot conecta între ele, valorificând întregul potențial al blockchain-ului descentralizat.

Multe companii și consorții au implementat blockchain-uri private autorizate pentru aplicații specifice bazate pe tehnologia Ethereum.

### Diferențe cheie {#key-differences}

- Securitatea/imuabilitatea blockchain-ului - rezistența unui blockchain la manipulare este determinată de algoritmul său de consens. Mainnet-ul Ethereum este asigurat prin interacțiunea a mii de noduri independente rulate de persoane și miner-i din întreaga lume. Lanțurile private au de obicei un număr mic de noduri, care sunt controlate de una sau câteva organizații; aceste noduri pot fi controlate din scurt, dar este nevoie ca numai câteva să fie compromise pentru a rescrie lanțul sau a comite tranzacții frauduloase.
- Performanțele - deoarece lanțurile private Ethereum întreprindere pot utiliza noduri de înaltă performanță cu cerințe hardware deosebite și diferiți algoritmi de consens, cum ar fi dovada-autorității (PoA), acestea pot obține un flux mai mare al tranzacţiilor pe nivelul de bază (Layer 1). Pe Mainnet-ul Ethereum se poate obține un flux ridicat prin utilizarea [soluţiilor de scalare de nivelul 2](/developers/docs/scaling/#layer-2-scaling).
- Costul - costul de operare a unui lanț privat reflectă în primul rând munca de configurare și gestionare a lanțului, precum și serverele necesare pentru a-l rula. Deși nu există niciun cost pentru conectarea la Mainnet-ul Ethereum, există un cost al gazului pentru fiecare tranzacție, care trebuie plătit în ether. Se dezvoltă relee de tranzacții (denumite și stații de gaz) pentru a elimina necesitatea ca utilizatorii finali și chiar întreprinderile să utilizeze direct ether în tranzacțiile lor. Unele [analize](https://github.com/EYBlockchain/fundamental-cost-of-ownership/blob/master/EY%20Total%20Cost%20of%20Ownership%20for%20Blockchain%20Solutions.pdf) au arătat că un cost total pentru operarea unei aplicații poate fi mai mic pe Mainnet decât la rularea unui lanț privat.
- Autorizarea nodurilor - numai nodurile autorizate se pot adăuga lanțurilor private. Oricine poate configura un nod pe Mainnet-ul Ethereum.
- Confidențialitatea - accesul la datele scrise în lanțurile private poate fi controlat prin restricționarea accesului la rețea și, de mai mare fineţe, prin controlul accesului și tranzacții private. Toate datele scrise pe Nivelul 1 al Mainnet-ului, pot fi vizualizate de oricine, deci informațiile delicate trebuie stocate și transmise în afara lanțului sau dacă nu, criptate. Modelele de design care facilitează acest lucru sunt în curs de dezvoltare (ex. Baseline, Aztec), precum și soluțiile de Nivelul 2 care pot menține datele compartimentate și în afara Nivelului 1.

### De ce să construim pe Mainnet-ul Ethereum {#why-build-on-ethereum-mainnet}

Întreprinderile experimentează tehnologia blockchain încă din 2016, când au fost lansate proiectele Hyperledger, Quorum și Corda. S-au axat în mare parte pe blockchain-urile întreprinderilor private autorizate, dar începând din 2019 a avut loc o schimbare de concept în privinţa blockchain-urilor publice faţă de cele private pentru aplicațiile de afaceri. Un [sondaj](https://assets.ey.com/content/dam/ey-sites/ey-com/en_gl/topics/blockchain/ey-public-blockchain-opportunity-snapshot.pdf) realizat de Forrester a dezvăluit că „Respondenții la sondaj ... îşi dau seama de acest potențial, 75% afirmând că probabil vor valorifica blockchain-urile publice în viitor, iar aproape o treime declarând că acest lucru este foarte probabil”. Paul Brody de la EY a [vorbit](https://www.youtube.com/watch?v=-ycu5vGDdZw&feature=youtu.be&t=3668) despre avantajele construirii pe blockchain-ul public, care (în funcție de aplicație) pot include o mai mare securitate/imuabilitate şi transparență, costuri totale de proprietate mai mici și capacitatea de a interopera cu toate celelalte aplicații ce se află tot pe Mainnet (efecte de rețea). Partajarea unui cadru comun de referință între companii evită crearea inutilă a numeroase silozuri izolate care nu pot comunica și partaja sau sincroniza informații între ele.

O altă evoluţie prin care atenţia se mută asupra blockchain-ului public este [Nivelul 2](/layer-2/). Nivelul 2 este în primul rând o categorie de tehnologie de scalabilitate care face posibile aplicații cu randament ridicat pe lanțurile publice. Dar soluțiile de Nivelul 2 pot de asemenea [aborda unele dintre celelalte provocări care au determinat dezvoltatorii pentru înteprinderi să aleagă lanțuri private în trecut](https://entethalliance.org/how-ethereum-layer-2-scaling-solutions-address-barriers-to-enterprises-building-on-mainnet/).

Protocolul Baseline este un proiect-cheie care definește un protocol ce permite colaborarea confidențială și complexă între întreprinderi fără a lăsa date sensibile pe lanț. A câștigat un [avânt](https://www.oasis-open.org/2020/08/26/baseline-protocol-achieves-key-milestone-with-release-of-v0-1-implementation-for-enterprise/) semnificativ pe cursul anului 2020.

## Resurse destinate dezvoltatorilor pentru întreprinderi {#enterprise-developer-resources}

### Organizații {#organizations}

Diverse organizații au depus eforturi comune pentru a creşte uşurinţa de utilizare a lui Ethereum în întreprinderi:

- [Enterprise Ethereum Alliance (EEA)](https://entethalliance.org/) permite organizațiilor să adopte și să utilizeze tehnologia Ethereum în activităţile lor economice zilnice. Abilitează ecosistemul Ethereum să dezvolte noi oportunități de afaceri, să stimuleze adoptarea de către industrie, să înveţe şi să colaboreze unul cu celălalt. Grupul de lucru pentru Mainnet-ul EEA este un punct de contact pentru reprezentanții întreprinderilor care sunt interesate să se bazeze pe Mainnet-ul public Ethereum, precum și pentru membrii comunității Ethereum care doresc să le ofere sprijin.
- [Proiectul Ethereum OASIS Open](https://github.com/ethereum-oasis/oasis-open-project) Proiectul Ethereum OASIS Open este un proiect OASIS Open care există pentru a oferi un forum neutru pe care diversele părți interesate să creeze specificații de înaltă calitate care să faciliteze longevitatea, interoperabilitatea și ușurința de integrare a lui Ethereum. Proiectul intenționează să dezvolte standarde clare, deschise, documentație de înaltă calitate și suite de testare partajate care să faciliteze noi caracteristici și îmbunătățiri ale protocolului Ethereum.
- [Proiect Baseline](https://www.baseline-protocol.org/) Protocolul Baseline este o inițiativă open source care combină progresele în domeniul criptografiei, al mesageriei și al blockchain-ului pentru a oferi servicii de afaceri sigure și private la costuri reduse, prin intermediul Mainnet-ului public Ethereum. Protocolul permite colaborarea confidențială și complexă între întreprinderi, fără a lăsa date sensibile în lanț. Proiectul Baseline este un sub-proiect al proiectului Ethereum OASIS Open și este coordonat de Comitetul tehnic director Baseline.

### Produse și servicii {#products-and-services}

- [Alchemy](https://www.alchemy.com/) _furnizează servicii API și instrumente pentru construirea și monitorizarea aplicațiilor pe Ethereum_
- [Blockapps](https://blockapps.net/) _implementarea protocolului Ethereum pentru întreprinderi, a instrumentelor și a altor API-uri care formează platforma STRATO_
- [Chainstack](https://chainstack.com/) _infrastructura de mainnet şi testnet Ethereum găzduită în & cloud-uri publice izolate ale clienților_
- [ConsenSys](https://consensys.io/) _oferă o gamă de produse și instrumente pentru construirea pe Ethereum, precum și servicii de consultanță și dezvoltare personalizate_
- [Bloackchain-ul Envision](https://envisionblockchain.com/) _oferă servicii de consultanță și dezvoltare axate pe întreprinderi, specializate pe Mainnet-ul Ethereum_
- [EY OpsChain](https://blockchain.ey.com/products/contract-manager) _oferă un flux de lucru pentru achiziții prin emiterea de cereri de ofertă, contracte, ordine de cumpărare și facturi în rețeaua partenerilor dvs. de afaceri de încredere_
- [Hyperledger Besu](https://www.hyperledger.org/use/besu) _un client Ethereum open-source axat pe întreprinderi, dezvoltat sub licența Apache 2.0 și scris în Java_
- [Infura](https://infura.io/) _acces la API-uri scalabile în rețelele Ethereum și IPFS_
- [Provide](https://provide.services/) _infrastructură și API-uri pentru aplicații de întreprinderi pe Web3_
- [Unibright](https://unibright.io/) _o echipă de specialiști în blockchain, arhitecți, dezvoltatori și consultanți cu peste 20 de ani de experiență în procesele de afaceri și integrare_

### Instrumente și biblioteci {#tooling-and-libraries}

- [Alethio](https://explorer.aleth.io/) _Platformă pentru analiza datelor din Ethereum_
- [Epirus](https://www.web3labs.com/epirus) _o platformă pentru dezvoltarea, implementarea și monitorizarea aplicațiilor blockchain de către Web3 Labs_
- [Ernst & Young's „Nightfall”](https://github.com/EYBlockchain/nightfall) _un set de instrumente pentru tranzacții private_
- [EthSigner](https://github.com/ConsenSys/ethsigner) _o aplicație de semnare a tranzacțiilor de utilizat cu un furnizor web3_
- [Tenderly](https://tenderly.co/) _o platformă de date care oferă analize, alerte și monitorizare în timp real, ce acceptă rețelele private._

### Soluții de scalabilitate {#scalability-solutions}

[Nivelul 2](/layer-2/) este un set de tehnologii sau sisteme care rulează peste Ethereum (Nivelul 1), moștenesc proprietăți de securitate din Nivelul 1 și oferă o capacitate mai mare de procesare a tranzacțiilor (transfer), taxe de tranzacție mai mici (cost de operare) și confirmări mai rapide ale tranzacțiilor decât Nivelul 1. Soluțiile de scalare de Nivelul 2 sunt securizate de Nivelul 1, dar permit aplicațiilor blockchain să gestioneze mai mulți utilizatori sau acțiuni sau date decât ar putea găzdui Nivelul 1. Multe dintre acestea valorifică progresele recente în criptografie și dovezile de zero-knowledge (ZK) pentru a maximiza performanța și securitatea.

Construirea aplicației dvs. pe o soluție de scalabilitate de Nivelul 2 poate ajuta la [soluționarea multor preocupări care anterior au determinat companiile să construiască pe blockchain-uri private](https://entethalliance.org/how-ethereum-layer-2-scaling-solutions-address-barriers-to-enterprises-building-on-mainnet/), dar păstrează avantajele construirii pe Mainnet.

Câteva exemple de soluții de Nivelul 2 care sunt pregătite pentru producție sau care vor fi în curând sunt următoarele:

- Rollup-uri Optimistic (date pe lanț, dovezi de fraudă)
  - [Optimism](https://optimism.io/)
  - [Rollup Offchain Labs Arbitrum](https://offchainlabs.com/)
  - [Fuel Network](https://fuel.sh)
- ZK-rollup-uri (date pe lanț, dovezi de validitate ZK)
  - [Loopring](https://loopring.org)
  - [Starkware](https://starkware.co)
  - [Matter Labs ZKsync](https://matter-labs.io/)
  - [Aztec 2.0](https://aztec.network/)
- Validium (date în afara lanțului, dovezi de validitate ZK)
  - [Starkware](https://starkware.co)
  - [Matter Labs zkPorter](https://matter-labs.io/)
- Plasma (date în afara lanțului, dovezi de fraudă)
  - [OMG Network](https://omg.network/)
  - [Gazelle](https://gzle.io)
  - [Matic Network](https://matic.network/)
  - [LeapDAO](https://ipfs.leapdao.org/)
- Canale de stare
  - [Connext](https://connext.network/)
  - [Kchannels](https://www.kchannels.io/)
  - [Perun](https://perun.network)
  - [Raiden](https://raiden.network/)
- Lanţuri paralele
  - [Skale](https://skale.network)
  - [POA Network](https://www.poa.network/)
- Soluții hibride care combină proprietăți din categorii multiple
  - [Celer](https://celer.network)

## Aplicațiile pentru întreprinderi locuiesc pe Mainnet {#enterprise-live-on-mainnet}

Iată câteva dintre aplicațiile pentru întreprinderi care au fost implementate pe Mainnet-ul public Ethereum

### Plăți {#payments}

- [Browserul Brave](https://basicattentiontoken.org/) _plătește utilizatorilor pentru atenția acordată reclamelor, iar utilizatorii pot plăti editorilor pentru a-i sprijini, prin „Tokenul de Atenție de Bază”._
- [hCaptcha](https://www.hcaptcha.com/) _Sistemul CAPTCHA de prevenire a bot-ului care plătește operatorii site-ului web pentru activitatea desfășurată de către utilizatori pentru a eticheta datele pentru învățarea automată. Acum implementat de Cloudflare._
- [Audius](https://audius.co/) _un serviciu de streaming care conectează fanii muzicii direct cu artiștii și permite acestora să fie plătiți integral de fanii lor, direct și instantaneu, pentru fiecare redare în flux_
- [EthereumAds](https://ethereumads.com/) _lets web site operators sell advertising space and get paid via Ethereum_

### Finanțe {#finance}

- [Santander Bank](https://www.coindesk.com/santander-settles-both-sides-of-a-20-million-bond-trade-on-ethereum) _emiterea și decontarea obligațiunilor_
- [Societe Generale](https://www.societegenerale.com/en/news/newsroom/societe-generale-performs-first-financial-transaction-settled-central-bank-digital) _emisiune de obligațiuni_
- [Cadence](https://www.forbes.com/sites/benjaminpirus/2019/10/09/fatburger-and-others-feed-30-million-into-ethereum-for-new-bond-offering/#513870be115b) _oferirea de obligațiuni și tokenizarea pentru mărcile FAT_
- [Sila](https://silamoney.com/) _infrastructura de plăți bancare și ACH ca serviciu_
- [Tinlake](https://tinlake.centrifuge.io/) _finanțarea creanțelor prin active tokenizate din lumea reală, cum ar fi facturi, credite ipotecare sau redevențe în flux_
- [Kratos](https://triterras.com/kratos) _platformă de tranzacționare a mărfurilor și de finanțare a comerțului care conectează comercianţii de mărfuri şi le permite să tranzacționeze și să obțină capital de la creditori direct online_
- [Fasset](https://www.fasset.com/) _o platformă pentru sprijinirea infrastructurii sustenabile_
- [Taurus](https://www.taurushq.com/) _issues tokenized securities_

### Legalizarea datelor {#notarization-of-data}

- [BBVA](https://www.ledgerinsights.com/bbva-blockchain-loan-banking-tech-award/) _detaliile împrumuturilor finalizate sunt codificate prin funcții hash și înregistrate pe Mainnet_
- [ANSA](https://cointelegraph.com/news/italys-top-news-agency-uses-blockchain-to-fight-fake-coronavirus-news) _cea mai mare agenție de știri din Italia combate știrile false și le permite cititorilor să verifice originea știrilor înregistrându-le pe Mainnet_
- [Verizon](https://decrypt.co/46745/verizon-news-press-releases-ethereum-full-transparency) _înregistrează comunicate de presă pe Ethereum pentru a asigura responsabilizarea corporativă și încrederea_
- [Breitling](https://www.coindesk.com/breitling-arianee-all-new-watches-ethereum) _înregistrează proveniența și istoricul reparațiilor ceasurilor pe Ethereum_
- [EthSign](https://ethsign.xyz/) _records signed electronic documents on the Ethereum blockchain_

### Lanțul de aprovizionare {#supply-chain}

- [Morpheus.network](https://morpheus.network/) _platformă de automatizare a lanțului de aprovizionare, care implementează un hibrid de lanțuri private cu date legalizate pe Mainnet-ul Ethereum și este utilizată de companii precum distribuitorul canadian de produse alimentare, petrol & și gaze Federated Co-op Ltd. și furnizorul argentinian de hrană pentru animale de companie Vitalcan_
- [Minespider](https://www.minespider.com/) _urmărirea lanțului de aprovizionare_
- [ShipChain](https://shipchain.io) _lanț paralel public al lui Ethereum și sistem de întreprinderi pentru vizibilitatea și încrederea lanțului de aprovizionare, în special pentru logistica multi-modală_
- [Follow Our Fibre](https://www.followourfibre.com) _trasabilitatea lanțului de aprovizionare cu viscoză_
- [EY OpsChain Network Procurement](https://blockchain.ey.com/products/contract-manager) _permite companiilor să se angajeze într-un flux de lucru de achiziții publice prin emiterea de cereri de ofertă, contracte, ordine de cumpărare și facturi în rețeaua partenerilor dvs. de afaceri de încredere_
- [Treum](https://treum.io/) _aduce transparență, trasabilitate și capacitate de comercializare în lanțurile de aprovizionare utilizând tehnologia blockchain_
- [TradeTrust](https://www.tradetrust.io/) _verifies electronic Bills of Lading (eBLs) for international shipping_

### Acreditări și certificări {#credentials}

- [Utah Counties](http://www.utahcounty.gov/Dept/ClerkAud/DigitalCertCopy.html) _eliberează certificate de căsătorie digitale pe Ethereum_
- [Colegiile „Two Italian”](https://cointelegraph.com/news/two-italian-high-schools-to-issue-digital-diplomas-with-blockchain) _diplome digitale emise pe Mainnet-ul Ethereum_
- [Universitatea din St. Gallen](https://cointelegraph.com/news/swiss-university-fights-fake-diplomas-with-blockchain-technology) _proiect pilot pentru verificarea diplomelor de către o universitate elvețiană_
- [Malta](https://cointelegraph.com/news/malta-to-store-education-certificates-on-a-blockchain) _toate certificatele din învăţământ înregistrate pe Mainnet de [Hyland](https://www.learningmachine.com/)_
- [Universitatea de Știință și Tehnologie Pohang](https://www.theblockcrypto.com/linked/55176/south-korean-university-issues-blockchain-stored-diplomas-amid-the-spread-of-the-coronavirus) _Universitate sud-coreeană care eliberează diplome stocate pe blockchain noilor absolvenți_
- [OpenCerts](https://opencerts.io/) _emite certificate de calificare blockchain în Singapore_
- [BlockCerts](https://www.blockcerts.org/) _a dezvoltat un standard deschis pentru acreditările blockchain_
- [SkillTree](http://skilltree.org/) _instruire și certificări online de aptitudini, care pot fi configurate cu factori declanșatori de expirare sau dependențe de alte competențe_

### Utilități {#utilities}

- [GridPlus](https://blog.gridplus.io/gridplus-is-live-in-texas-efc83c814601) _plățile de energie electrică_

Dacă doriți să adăugați la această listă, vă rugăm să consultați [instrucțiunile pentru a contribui](/contributing/).
