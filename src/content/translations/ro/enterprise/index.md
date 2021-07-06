---
title: Întreprindere pe rețeaua principală Ethereum
description: Ghiduri, articole și instrumente despre aplicațiile de întreprindere pe blockchain-ul Ethereum public
lang: ro
sidebar: true
---

# Rețeaua principală Ethereum pentru întreprinderi {#ethereum-for-enterprise}

Aplicațiile Blockchain ajută întreprinderile:

- să crească încrederea și să reducă, de asemenea, costurile de coordonare între părțile comerciale
- să îmbunătățească responsabilitatea rețelei de afaceri și eficiența operațională
- să construiască noi modele de afaceri și oportunități de creare de valoare
- să garanteze competitivitatea organizației lor în viitor

Aplicațiile blockchain pentru întreprinderi pot fi construite pe [rețeaua principală](/glossary/#mainnet) Ethereum care este un sistem public fără permisiuni sau pe blockchain-uri private bazate pe tehnologia Ethereum. Află mai multe informații despre [lanțurile private Ethereum întreprindere](/enterprise/private-ethereum/).

## Ethereum public vs privat {#private-vs-public}

Există o singură rețea publică principală Ethereum. Aplicațiile construite pe rețeaua principală pot fi interoperabile, similar cu modul în care aplicațiile construite pe internet se pot conecta între ele, valorificând întregul potențial al blockchain-ului descentralizat.

Multe companii și consorții au implementat blockchain-uri private permise pentru aplicații specifice bazate pe tehnologia Ethereum.

### Diferențe cheie {#key-differences}

- Securitate/imuabilitate blockchain - rezistența unui blockchain la manipulare este determinată de algoritmul său de consens. Rețeaua principală Ethereum este asigurată de interacțiunea a mii de noduri independente conduse de persoane fizice și mineri din întreaga lume. Lanțurile private au de obicei un număr mic de noduri care sunt controlate de una sau câteva organizații; aceste noduri pot fi strict controlate, dar numai câteva trebuie compromise pentru a rescrie lanțul sau a comite tranzacții frauduloase.
- Performanță - deoarece lanțurile private Ethereum întreprindere pot utiliza noduri de înaltă performanță cu cerințe hardware deosebite și diferiți algoritmi de consens, cum ar fi Dovada Autorității (PoA), pot obține un randament de tranzacție mai mare pe stratul de bază (Layer 1). Pe rețeaua principală Ethereum, un debit ridicat poate fi realizat prin utilizarea [soluțiilor de scalare Nivel 2](/developers/docs/scaling/#layer-2-scaling).
- Cost - costul de operare a unui lanț privat se reflectă în primul rând în forța de muncă pentru a configura și gestiona lanțul și serverele necesare pentru a-l rula. Deși nu există niciun cost pentru conectarea la rețeaua principală Ethereum, există un cost pentru fiecare tranzacție care trebuie plătită în Eter. Releele de tranzacții (cunoscute ca Stații de benzină) sunt dezvoltate pentru a elimina necesitatea ca utilizatorii finali și chiar întreprinderile să utilizeze direct Eter în tranzacțiile lor. Unele [analize](https://github.com/EYBlockchain/fundamental-cost-of-ownership/blob/master/EY%20Total%20Cost%20of%20Ownership%20for%20Blockchain%20Solutions.pdf) au indicat un cost total pentru operarea unei aplicații ca putând fi mai mic pe rețeaua principală decât rularea unui lanț privat.
- Permisiunea nodurilor - numai nodurile autorizate se pot alătura lanțurilor private. Oricine poate configura un nod pe rețeaua principală Ethereum.
- Confidențialitate - accesul la datele scrise în lanțurile private poate fi controlat prin restricționarea accesului la rețea și pe o bază mai fină, cu controale de acces și tranzacții private. Toate datele scrise pe Nivelul 1 al rețelei principale, pot fi vizualizate de oricine, astfel încât informațiile sensibile ar trebui stocate și transmise în afara lanțului sau dacă nu, criptate. Modele de design care facilitează acest lucru sunt în curs de dezvoltare (ex. Baseline, Aztec), precum și soluțiile Nivel 2 care pot menține datele compartimentate și în afara Nivelului 1.

### De ce să construim pe rețeaua principală Ethereum {#why-build-on-ethereum-mainnet}

Întreprinderile experimentează tehnologia blockchain încă din 2016, când au fost lansate proiectele Hyperledger, Quorum și Corda. Accentul s-a pus în mare parte pe blockchain-urile întreprinderilor private permisive, dar începând din 2019 a avut loc o schimbare de gândire în ceea ce privește blockchain-urile publice vs private pentru aplicațiile de afaceri. Un [sondaj](https://assets.ey.com/content/dam/ey-sites/ey-com/en_gl/topics/blockchain/ey-public-blockchain-opportunity-snapshot.pdf) realizat de Forrester a dezvăluit că „Respondenții la sondaj ... văd acest potențial, 75% afirmând că sunt susceptibili să valorifice blockchain-urile publice în viitor și aproape o treime spunând că este foarte probabil”. Paul Brody de la EY a [vorbit](https://www.youtube.com/watch?v=-ycu5vGDdZw&feature=youtu.be&t=3668) despre avantajele construirii pe blockchain-ul public, care (în funcție de aplicație) poate include o securitate/imuabilitate mai puternică, transparență, costul total de proprietate mai mic și capacitatea de a interopera cu toate celelalte aplicații care sunt, de asemenea, pe rețeaua principală (efecte de rețea). Partajarea unui cadru comun de referință între companii evită crearea inutilă a numeroaselor silozuri izolate care nu pot comunica și partaja sau sincroniza informații între ele.

O altă dezvoltare care se concentrează asupra blockchain-ului public este [Nivelul 2](/developers/docs/scaling/#layer-2-scaling). Nivelul 2 este în primul rând o categorie de tehnologie de scalabilitate care face posibile aplicații cu randament ridicat pe lanțurile publice. Dar soluțiile Nivel 2 pot, de asemenea, [aborda unele dintre celelalte provocări care au determinat programatorii de întreprinderi să aleagă lanțuri private în trecut](https://entethalliance.org/how-ethereum-layer-2-scaling-solutions-address-barriers-to-enterprises-building-on-mainnet/).

Protocolul Baseline este un proiect-cheie care definește un protocol care permite colaborarea confidențială și complexă între întreprinderi, fără a lăsa date sensibile în lanț. A câștigat un [avânt semnificativ](https://www.oasis-open.org/news/pr/baseline-protocol-achieves-key-milestone-with-release-of-v0-1-implementation-for-enterprise-) pe parcursul anului 2020.

## Resurse pentru programatori întreprindere {#enterprise-developer-resources}

### Organizații {#organizations}

Diverse organizații au depus eforturi comune pentru a face Ethereum Enterprise mai prietenos:

- [Enterprise Ethereum Alliance (EEA)](https://entethalliance.org/) EEA permite organizațiilor să adopte și să utilizeze tehnologia Ethereum în operațiunile lor zilnice de afaceri. Împuternicește ecosistemul Ethereum să dezvolte noi oportunități de afaceri, să impulsioneze adoptarea industriei și să învețe și să colaboreze unul cu celălalt. Grupul de lucru pentru rețeaua principală EEA este un punct focal pentru reprezentanții companiilor care sunt interesați să construiască pe rețeaua publică principală Ethereum, precum și pentru membrii comunității Ethereum care ar dori să îi sprijine.
- [Proiect deschis Ethereum OASIS](https://github.com/ethereum-oasis/oasis-open-project) Proiectul deschis Ethereum OASIS este un proiect deschis OASIS care există pentru a oferi un forum neutru diverselor părți interesate pentru a crea specificații de înaltă calitate care să faciliteze longevitatea, interoperabilitatea și ușurința integrării Ethereum. Proiectul intenționează să dezvolte standarde clare, deschise, documentație de înaltă calitate și suite de testare partajate care să faciliteze noi caracteristici și îmbunătățiri ale protocolului Ethereum.
- [Proiectul Baseline](https://www.baseline-protocol.org/) Protocolul Baseline este o inițiativă open source care combină progresele în criptografie, mesagerie și blockchain pentru a furniza procese de afaceri private și sigure, la un cost redus prin intermediul rețelei publice Ethereum. Protocolul permite o colaborare confidențială și complexă între întreprinderi, fără a lăsa date sensibile în lanț. Proiectul Baseline este un sub-proiect al proiectului deschis Ethereum OASIS și este coordonat de Comitetul Tehnic de Conducere Baseline.

### Produse și servicii {#products-and-services}

- [Alchemy](https://alchemyapi.io/) _oferă servicii și instrumente API pentru creșterea și monitorizarea aplicațiilor pe Ethereum_
- [Blockapps](https://blockapps.net/) _implementare a protocolului Ethereum Enterprise, instrumente și APIs care formează platforma STRATO_
- [ConsenSys](https://consensys.net/) _oferă o gamă de produse și instrumente pentru construirea pe Ethereum, precum și servicii de consultanță și dezvoltare personalizată_
- [Envision Blockchain](https://envisionblockchain.com/) _furnizează servicii de consultanță și dezvoltare axate pe întreprindere specializate în rețeaua principală Ethereum_
- [EY OpsChain](https://blockchain.ey.com/products/procurement) _oferă un flux de lucru pentru achiziții prin emiterea de cereri de ofertă, contracte, ordine de cumpărare și facturi în rețeaua ta de parteneri de afaceri de încredere_
- [Hyperledger Besu](https://www.hyperledger.org/use/besu) _un client Ethereum open-source dedicat unei întreprinderi dezvoltat sub licența Apache 2.0 și scris în Java_
- [Infura](https://infura.io/) _acces API scalabil la Ethereum și rețele IPFS_
- [Provide](https://provide.services/) _infrastructură și API-uri pentru aplicații Enterprise Web3_
- [Unibright](https://unibright.io/) _o echipă de specialiști în blockchain, arhitecți, programatori și consultanți cu peste 20 de ani de experiență în procesele de afaceri și integrare_

### Instrumente și biblioteci {#tooling-and-libraries}

- [Alethio](https://aleth.io/) _Platformă pentru analiza datelor Ethereum_
- [Epirus](https://www.web3labs.com/epirus) _o platformă pentru dezvoltarea, implementarea și monitorizarea aplicațiilor blockchain de către Web3 Labs_
- [Ernst și Young's „Nightfall”](https://github.com/EYBlockchain/nightfall) _un set de instrumente pentru tranzacții private_
- [EthSigner](https://github.com/ConsenSys/ethsigner) _o aplicație de semnare a tranzacțiilor pentru a fi utilizată cu un furnizor web3_
- [Tenderly](https://tenderly.co/) _o platformă de date care oferă analize, alerte și monitorizare în timp real, cu suport pentru rețele private._
- [Truffle Suite](https://trufflesuite.com) _Suită de dezvoltare blockchain (Truffle, Ganache, Drizzle)_

### Soluții de scalabilitate {#scalability-solutions}

[Nivelul 2](/developers/docs/scaling/#layer-2-scaling) este un set de tehnologii sau sisteme care rulează peste Ethereum (Nivelul 1), moștenesc proprietăți de securitate din Nivelul 1 și oferă o capacitate mai mare de procesare a tranzacțiilor (transfer), taxe de tranzacție mai mici (cost de operare) și confirmări mai rapide ale tranzacțiilor decât Nivelul 1. Soluțiile de scalare Nivel 2 sunt securizate de Nivelul 1, dar permit aplicațiilor blockchain să gestioneze mai mulți utilizatori sau acțiuni sau date decât ar putea găzdui Nivelul 1. Multe dintre ele valorifică progresele recente în criptografie și dovezile de cunoaștere-zero (ZK) pentru a maximiza performanța și securitatea.

Construirea aplicației tale pe o soluție de scalabilitate Nivel 2, poate ajuta la [soluționarea multor preocupări, care anterior au determinat companiile să construiască pe blockchain-uri private](https://entethalliance.org/how-ethereum-layer-2-scaling-solutions-address-barriers-to-enterprises-building-on-mainnet/), dar păstrând beneficiile construirii pe rețeaua principală.

Exemple de soluții L2 care sunt pregătite pentru producție sau care vor fi în curând, includ:

- Rollup-uri Optimistic (date despre lanț, dovezi de fraudă)
  - [Optimism](https://optimism.io/)
  - [Laboratoare off-chain Rollup Arbitrium](https://offchainlabs.com/)
  - [Fuel Network](https://fuel.sh)
- Rollup-uri ZK (date despre lanț, dovezi de validitate ZK)
  - [Loopring](https://loopring.org)
  - [Starkware](https://starkware.co)
  - [Matter Labs zkSync](https://matter-labs.io/)
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
  - [Raiden](https://raiden.network/)
  - [Perun](https://perun.network)
- Sidechains
  - [Skale](https://skale.network)
  - [POA Network](https://www.poa.network/)
- Soluții hibride care combină proprietăți din categorii multiple
  - [Offchain Labs Arbitrum SCSC (SideChains/StateChannels)](https://https://offchainlabs.com/arbitrum.pdf)
  - [Celer](https://celer.network)

## Aplicațiile de întreprindere „active” pe rețeaua principală {#enterprise-live-on-mainnet}

Iată câteva dintre aplicațiile de întreprindere care au fost implementate pe rețeaua publică principală Ethereum

### Plăți {#payments}

- [Browserul Brave](https://basicattentiontoken.org/) _plătește utilizatorilor pentru atenția acordată reclamelor, iar utilizatorii pot plăti editorilor pentru a-i sprijini, prin „Tokenul de Atenție de Bază”._
- [hCaptcha](https://www.hcaptcha.com/) _Sistemul CAPTCHA de prevenire a bot-ului care plătește operatorii site-ului web pentru activitatea desfășurată de către utilizatori pentru a eticheta datele pentru învățarea automată. Acum implementat de Cloudflare._
- [Audius](https://audius.co/) _un serviciu de streaming care conectează fanii muzicii direct cu artiști și permite artiștilor să fie plătiți integral de fanii lor, direct și instantaneu pentru fiecare flux_

### Finanțe {#finance}

- [Santander Bank](https://www.coindesk.com/santander-settles-both-sides-of-a-20-million-bond-trade-on-ethereum) _emiterea și decontarea obligațiunilor_
- [Societe Generale](https://www.societegenerale.com/en/newsroom-first-financial-transaction-settled-with-a-digital-currency) _emisiune de obligațiuni_
- [Cadence](https://www.forbes.com/sites/benjaminpirus/2019/10/09/fatburger-and-others-feed-30-million-into-ethereum-for-new-bond-offering/#513870be115b) _oferirea de obligațiuni și tokenizarea pentru mărcile FAT_
- [Sila](https://silamoney.com/) _infrastructura de plăți bancare și ACH ca serviciu_
- [Tinlake](https://tinlake.centrifuge.io/) _finanțarea creanțelor prin active tokenizate din lumea reală, cum ar fi facturi, credite ipotecare sau redevențe în flux_
- [Kratos](https://triterras.com/kratos) _platformă de tranzacționare a mărfurilor și de finanțare a comerțului care conectează și permite comercianților de mărfuri să tranzacționeze și să obțină capital de la creditori direct online_
- [Fasset](https://www.fasset.com/) _o platformă pentru sprijinirea infrastructurii durabile_

### Certificarea datelor {#notarization-of-data}

- [BBVA](https://www.ledgerinsights.com/bbva-blockchain-loan-banking-tech-award/) _detaliile împrumuturilor finalizate sunt codificate prin funcții hash și înregistrate pe rețeaua principală_
- [Splunk](https://www.splunk.com/en_us/blog/security/the-newest-data-attack.html) _integritatea datelor poate fi asigurată prin scrierea periodică a hash-urilor de date indexate pe rețeaua principală_
- [ANSA](https://cointelegraph.com/news/italys-top-news-agency-uses-blockchain-to-fight-fake-coronavirus-news) _Cea mai mare agenție de știri din Italia combate știrile false și le permite cititorilor să verifice originea știrilor înregistrându-le pe rețeaua principală_
- [Verizon](https://decrypt.co/46745/verizon-news-press-releases-ethereum-full-transparency) _înregistrează comunicate de presă pe Ethereum pentru a asigura responsabilitatea corporativă și încrederea_
- [Breitling](https://www.coindesk.com/breitling-arianee-all-new-watches-ethereum) _înregistrează proveniența și istoricul reparațiilor ceasurilor pe Ethereum_

### Lanțul de aprovizionare {#supply-chain}

- [CargoX](https://cargox.io/press-releases/full/cargox-becomes-first-public-blockchain-ethereum-bill-lading-provider-approved-international-group-pi-clubs) _furnizează conosamente și documente de transfer_
- [Morpheus.network](https://morpheus.network/) _platformă de automatizare a lanțului de aprovizionare, care implementează un hibrid de lanțuri private cu date notariale pe rețeaua principală Ethereum și este utilizată de companii precum distribuitorul canadian de produse alimentare, petrol și gaze Federated Co-op Ltd. și furnizorul argentinian de hrană pentru animale de companie Vitalcan_
- [Minespider](https://www.minespider.com/) _urmărirea lanțului de aprovizionare_
- [ShipChain](https://shipchain.io) _lanț public al Ethereum și sistemului pentru întreprinderi pentru vizibilitatea și încrederea lanțului de aprovizionare, în special pentru logistica multi-modală_
- [Follow Our Fibre](https://www.followourfibre.com) _trasabilitatea lanțului de aprovizionare cu viscoză_
- [EY OpsChain Network Procurement](https://blockchain.ey.com/products/procurement) _permite companiilor să se angajeze într-un flux de lucru de achiziții publice prin emiterea de cereri de ofertă, contracte, ordine de cumpărare și facturi în rețeaua ta de parteneri de afaceri de încredere_
- [Treum](https://treum.io/) _aduce transparență, trasabilitate și comercializare lanțurilor de aprovizionare, utilizând tehnologia blockchain_

### Acreditări și certificări {#credentials}

- [Utah Counties](http://www.utahcounty.gov/Dept/ClerkAud/DigitalCertCopy.html) _eliberează certificate de căsătorie digitale pe Ethereum_
- [Colegiile „Two Italian”](https://cointelegraph.com/news/two-italian-high-schools-to-issue-digital-diplomas-with-blockchain) _diplome digitale emise pe rețeaua principală Ethereum_
- [Universitatea din St. Gallen](https://cointelegraph.com/news/swiss-university-fights-fake-diplomas-with-blockchain-technology) _proiect pilot pentru verificarea diplomelor de către o universitate elvețiană_
- [Malta](https://cointelegraph.com/news/malta-to-store-education-certificates-on-a-blockchain) _toate certificatele educaționale înregistrate pe rețeaua principală de [Hyland](https://www.learningmachine.com/)_
- [Universitatea de Știință și Tehnologie Pohang](https://www.theblockcrypto.com/linked/55176/south-korean-university-issues-blockchain-stored-diplomas-amid-the-spread-of-the-coronavirus) _Universitate sud-coreeană care eliberează diplome stocate în blockchain noilor absolvenți_
- [OpenCerts](https://opencerts.io/) _emite acreditări de educație blockchain în Singapore_
- [BlockCerts](https://www.blockcerts.org/) _a dezvoltat un standard deschis pentru acreditările blockchain_
- [SkillTree](http://skilltree.org/) _instruire și certificări online pentru abilități, care pot fi configurate cu factori declanșatori de expirare sau dependențe de alte competențe_

### Utilități {#utilities}

- [GridPlus](https://blog.gridplus.io/gridplus-is-live-in-texas-efc83c814601) _plățile de energie electrică_

Dacă dorești să adaugi la această listă, consultă [instrucțiunile pentru contribuție](https://ethereum.org/en/contributing/).
