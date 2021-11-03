---
title: Aziende sulla rete principale Ethereum
description: Guide, articoli e strumenti sulle applicazioni aziendali per la blockchain Ethereum pubblica
lang: it
sidebar: true
---

# Rete principale Ethereum per le aziende {#ethereum-for-enterprise}

La applicazioni della blockchain aiutano le imprese nei seguenti ambiti:

- Aumentare la fiducia e ridurre i costi di coordinamento tra le parti aziendali
- Migliorare la responsabilità e l'efficienza operativa della rete aziendale
- Instaurare nuovi modelli di business e offrire opportunità per la creazione di valore
- Creare organizzazioni a prova di futuro

Le applicazioni della blockchain aziendali possono essere basate sulla [rete principale](/glossary/#rete principale) pubblica Ethereum senza permessi o sulle blockchain private basate su tecnologia Ethereum. Consulta maggiori informazioni sulle [catene Ethereum aziendali private](/enterprise/private-ethereum/).

## Ethereum pubblica e privata {#private-vs-public}

Esiste una sola rete principale Ethereum pubblica. Le applicazioni create sulla rete principale sono in grado di interagire, esattamente come le applicazioni create sulla rete Internet possono connettersi tra di loro, sfruttando tutto il potenziale della blockchain decentralizzata.

Molte aziende e consorzi hanno distribuito blockchain private e con permessi per applicazioni specifiche basate sulla tecnologia Ethereum.

### Differenze fondamentali {#key-differences}

- Sicurezza/immutabilità della blockchain - La resistenza della blockchain a manomissioni è determinata dall'algoritmo di consenso. La rete principale Ethereum è resa sicura dall'interazione tra migliaia di nodi indipendenti eseguiti da individui e miner in tutto il mondo. Le catene private solitamente hanno un numero ridotto di nodi, controllati da una o da poche organizzazioni; questi nodi possono essere controllati in modo rigido, ma basta che pochi vengano compromessi perché la catena venga riscritta o vengano commesse transazioni fraudolente.
- Prestazioni - Siccome le catene aziendali Ethereum possono usare nodi ad alte prestazioni, con requisiti hardware speciali e algoritmi di consenso diversi come la Proof of Authority, possono raggiungere volumi maggiori per le transazioni sul livello base (livello 1). Sulla rete principale Ethereum, è possibile ottenere volumi elevati con l'utilizzo di [soluzioni di livello 2](/developers/docs/layer-2-scaling/).
- Costo - Il costo per eseguire una catena privata si riflette principalmente nel lavoro di configurazione e gestione della catena e dei server che la eseguono. Se da un lato non ci sono costi per collegarsi alla rete principale Ethereum, dall'altro per ogni transazione c'è un costo di carburante che deve essere pagato in Ether. Sono in via di sviluppo relayer delle transazioni (detti stazioni di servizio - Gas Station) per eliminare la necessità per gli utenti finali e per le aziende di usare direttamente Ether nelle transazioni. Alcune [analisi](https://github.com/EYBlockchain/fundamental-cost-of-ownership/blob/master/EY%20Total%20Cost%20of%20Ownership%20for%20Blockchain%20Solutions.pdf) hanno mostrato che il costo totale per gestire un'applicazione può essere più basso sulla rete principale che su una catena privata.
- Gestione dei permessi per i nodi - Solo i nodi autorizzati possono unirsi a catene private. Chiunque può configurare un nodo sulla rete principale Ethereum.
- Privacy - L'accesso ai dati scritti sulle catene private può essere controllato limitando l'accesso alla rete e, su base più granulare, tramite controllo degli accessi e transazioni private. Tutti i dati scritti sul livello 1 della rete principale sono visibili a chiunque, quindi le informazioni sensibili devono essere conservate e trasmesse esternamente alla catena oppure criptate. Stanno emergendo modelli di progettazione a questo scopo (ad esempio Baseline, Aztec) e soluzioni di livello 2 che possono mantenere i dati isolati e separati dal livello 1.

### Perché sviluppare sulla rete principale Ethereum {#why-build-on-ethereum-mainnet}

Le aziende sperimentano la tecnologia blockchain dal 2016 circa, quando furono lanciati i progetti Hyperledger, Quorum e Corda. Si puntava soprattutto a blockchain aziendali private con permessi, ma a partire dal 2019 c'è stato un cambio di marcia sul concetto di blockchain pubbliche o private per le applicazioni aziendali. Un [sondaggio](https://assets.ey.com/content/dam/ey-sites/ey-com/en_gl/topics/blockchain/ey-public-blockchain-opportunity-snapshot.pdf) condotto da Forrester ha rivelato che "gli intervistati... riconoscono il potenziale; il 75% pensa che faranno probabilmente uso di blockchain pubbliche in futuro, mentre circa un terzo risponde che l'uso è molto probabile". Paul Brody di EY [ha parlato](https://www.youtube.com/watch?v=-ycu5vGDdZw&feature=youtu.be&t=3668) dei benefici legati allo sviluppo su blockchain pubbliche, che (in base all'applicazione) possono includere maggior sicurezza/immutabilità, trasparenza, costi totali di gestione più bassi e la capacità di interagire con tutte le altre applicazioni presenti sulla rete principale (effetti rete). Condividere un quadro comune di riferimento tra le aziende evita di dover creare inutilmente numerosi silos isolati che non possono comunicare e condividere o sincronizzare informazioni tra di loro.

Un altro sviluppo che sta spostando l'attenzione verso le blockchain pubbliche è il [livello 2](/developers/docs/layer-2-scaling/). Con livello 2 si intende una categoria di tecnologie per la scalabilità che permettono volumi elevati sulle catene pubbliche. Ma le soluzioni di livello 2 possono anche [permettere di vincere alcune sfide che hanno portato gli sviluppatori aziendali a scegliere in passato le catene private](https://entethalliance.org/how-ethereum-layer-2-scaling-solutions-address-barriers-to-enterprises-building-on-mainnet/).

Il protocollo Baseline è un progetto chiave che sta definendo un protocollo per una collaborazione confidenziale e complessa tra aziende, senza lasciare dati sensibili sulla catena. Ha avuto uno [slancio significativo](https://www.oasis-open.org/news/pr/baseline-protocol-achieves-key-milestone-with-release-of-v0-1-implementation-for-enterprise-) nel corso del 2020.

## Risorse per sviluppatori aziendali {#enterprise-developer-resources}

### Organizzazioni {#organizations}

Alcuni sforzi collaborativi per rendere la rete Ethereum aziendale più intuitiva sono stati fatti da diverse organizzazioni:

- [Enterprise Ethereum Alliance (EEA)](https://entethalliance.org/) L'EEA consente alle organizzazioni di adottare e usare la tecnologia Ethereum nelle operazioni quotidiane. Permette all'ecosistema Ethereum di sviluppare nuove opportunità di business, favorire l'adozione nel settore e collaborare. Il gruppo di lavoro della rete principale di EEA è un punto focale per i rappresentanti delle imprese interessati a sviluppare sulla rete principale Ethereum pubblica e per i membri della community Ethereum che desiderano supportarli.
- [Ethereum OASIS Open Project](https://github.com/ethereum-oasis/oasis-open-project) Il progetto Ethereum OASIS Open Project esiste per fornire un forum neutrale per stakeholter eterogenei, per creare specifiche di alta qualità che possano promuovere longevità, interoperabilità e facilità di integrazione di Ethereum. Il progetto intende sviluppare documentazione chiara, standard, aperta e di alta qualità e suite di test condivise che permettano nuove funzionalità e miglioramenti al protocollo Ethereum.
- [Baseline Project](https://www.baseline-protocol.org/) Il protocollo Baseline è un'iniziativa open source che unisce i vantaggi associati a crittografia, messaggistica e blockchain per garantire processi aziendali sicuri e privati a basso costo sulla rete principale Ethereum pubblica. Il protocollo consente collaborazioni complesse e confidenziali tra aziende senza lasciare dati sensibili sulla catena. Il progetto Baseline è un progetto secondario dell'Ethereum OASIS Open Project ed è coordinato dalla Baseline Technical Steering Committee.

### Prodotti e servizi {#products-and-services}

- [Alchemy](https://alchemyapi.io/) _fornisce servizi API e strumenti per sviluppare e monitorare applicazioni su Ethereum_
- [Blockapps](https://blockapps.net/) _implementazione del protocollo Enterprise Ethereum, strumenti e API che formano la piattaforma STRATO_
- [ConsenSys](https://consensys.net/) _offre una gamma di prodotti e strumenti per sviluppare su Ethereum, oltre a servizi di consulenza e sviluppo personalizzato_
- [Envision Blockchain](https://envisionblockchain.com/) _offre consulenza dedicata alle imprese e servizi di sviluppo sulla rete principale Ethereum_
- [EY OpsChain](https://blockchain.ey.com/products/procurement) _offre un flusso di lavoro di approvvigionamento rilasciando RFQ, contratti, ordini di acquisto e fatture attraverso la rete di business partner certificati dell'azienda_
- [Hyperledger Besu](https://www.hyperledger.org/use/besu) _client Ethereum open source aziendale sviluppato con licenza Apache 2.0 e scritto in Java_
- [Infura](https://infura.io/) _Accesso API scalabile alle reti Ethereum e IPFS_
- [Provide](https://provide.services/) _infrastruttura e API per applicazioni aziendali Web3_
- [Unibright](https://unibright.io/) _team di specialisti della blockchain, architetti, sviluppatori e consulenti con più di 20 anni di esperienza in processi di business e integrazione_

### Strumenti e librerie {#tooling-and-libraries}

- [Alethio](https://aleth.io/) _Piattaforma di analisi dei dati di Ethereum_
- [Epirus](https://www.web3labs.com/epirus) _piattaforma per sviluppare, distribuire e monitorare le applicazioni della blockchain di Web3 Labs_
- [Ernst & Young's ‘Nightfall'](https://github.com/EYBlockchain/nightfall) _kit di strumenti per transazioni private_
- [EthSigner](https://github.com/ConsenSys/ethsigner) _applicazione per la firma delle transazioni da usare con un provider web3_
- [Tenderly](https://tenderly.co/) _piattaforma di dati che fornisce analisi in tempo reale, avvisando e monitorando con supporto per le reti private._
- [Truffle Suite](https://trufflesuite.com) _suite di sviluppo per la blockchain (Truffle, Ganache, Drizzle)_

### Soluzioni di scalabilità {#scalability-solutions}

[Livello 2](/developers/docs/layer-2-scaling/) è una serie di tecnologie o sistemi eseguiti su Ethereum (livello 1) che ereditano le proprietà di sicurezza dal livello 1 e forniscono capacità di elaborazione delle transazioni superiori (volumi), commissioni sulle transazioni inferiori (costi operativi) e conferme delle transazioni più veloci rispetto al livello 1. Le soluzioni di ridimensionamento di livello 2 sono protette dal livello 1, ma consentono alle applicazioni della blockchain di gestire molti più utenti o azioni o dati rispetto al livello 1. Molte sfruttano gli ultimi progetti in fatto di crittografia e prove zero-knowledge (ZK) per massimizzare prestazioni e sicurezza.

Creare un'applicazione su una soluzione di scalabilità livello 2 può aiutare a [gestire molte problematiche che precedentemente hanno portato le aziende a sviluppare sulle blockchain private](https://entethalliance.org/how-ethereum-layer-2-scaling-solutions-address-barriers-to-enterprises-building-on-mainnet/), mantenendo i vantaggi legati allo sviluppo sulla rete principale.

Esempi di soluzioni L2 già pronte per la produzione (o che lo saranno presto) includono:

- Optimistic Rollup (dati sulla catena, prove di frode)
  - [Optimism](https://optimism.io/)
  - [Offchain Labs Arbitrum Rollup](https://offchainlabs.com/)
  - [Fuel Network](https://fuel.sh)
- Rollup ZK (dati sulla catena, prove di validità ZK)
  - [Loopring](https://loopring.org)
  - [Starkware](https://starkware.co)
  - [Matter Labs zkSync](https://matter-labs.io/)
  - [Aztec 2.0](https://aztec.network/)
- Validium (dati esterni alla catena, prove di validità ZK)
  - [Starkware](https://starkware.co)
  - [Matter Labs zkPorter](https://matter-labs.io/)
- Plasma (dati esterni alla catena, prove di frode)
  - [OMG Network](https://omg.network/)
  - [Gazelle](https://gzle.io)
  - [Matic Network](https://matic.network/)
  - [LeapDAO](https://ipfs.leapdao.org/)
- Canali di stato
  - [Connext](https://connext.network/)
  - [Raiden](https://raiden.network/)
  - [Perun](https://perun.network)
- Sidechain
  - [Skale](https://skale.network)
  - [POA Network](https://www.poa.network/)
- Soluzioni ibride che combinano le proprietà di più categorie
  - [Offchain Labs Arbitrum SCSC](https://https://offchainlabs.com/arbitrum.pdf)
  - [Celer](https://celer.network)

## Applicazioni aziendali attive sulla rete principale {#enterprise-live-on-mainnet}

Ecco alcune applicazioni aziendali che sono state distribuite alla rete principale pubblica Ethereum

### Pagamenti {#payments}

- [Brave Browser](https://basicattentiontoken.org/) _paga gli utenti per l'attenzione dedicata agli annunci e gli utenti possono pagare gli editori per supportarli, tramite il Token Basic Attention._
- [hCaptcha](https://www.hcaptcha.com/) _Sistema CAPTCHA di prevenzione da bot che paga gli operatori dei siti web per l'operazione di etichettatura dei dati da parte degli utenti per il machine learning. Ora distribuito da Cloudflare._
- [Audius](https://audius.co/) _un servizio di streaming che collega i fan musicali direttamente agli artisti e consente a questi ultimi di essere pagati totalmente dai fan, direttamente e istantaneamente per ogni flusso_

### Finanza {#finance}

- [Santander Bank](https://www.coindesk.com/santander-settles-both-sides-of-a-20-million-bond-trade-on-ethereum) _emissione e liquidazione di obbligazioni_
- [Societe Generale](https://www.societegenerale.com/en/newsroom-first-financial-transaction-settled-with-a-digital-currency) _emissione di obbligazioni_
- [Cadence](https://www.forbes.com/sites/benjaminpirus/2019/10/09/fatburger-and-others-feed-30-million-into-ethereum-for-new-bond-offering/#513870be115b) _offerta e tokenizzazione di obbligazioni per FAT Brands_
- [Sila](https://silamoney.com/) _infrastruttura di servizi bancari e pagamenti ACH sotto forma di servizio_
- [Tinlake](https://tinlake.centrifuge.io/) _sconti commerciali tramite risorse tokenizzate del mondo reale quali fatture, mutui o royalty in streaming_
- [Kratos](https://triterras.com/kratos) _piattaforma finanziaria di commercio di beni che connette i negoziatori di merci per conto proprio e consente loro di scambiare e procurarsi capitale dagli istituti di credito direttamente online_
- [Fasset](https://www.fasset.com/) _piattaforma per supportare l'infrastruttura sostenibile_

### Autenticazione dei dati {#notarization-of-data}

- [BBVA](https://www.ledgerinsights.com/bbva-blockchain-loan-banking-tech-award/) _i dettagli dei prestiti finalizzati sono associati ad hash e registrati sulla rete principale_
- [Splunk](https://www.splunk.com/en_us/blog/security/the-newest-data-attack.html) _l'integrità dei dati può essere assicurata scrivendo periodicamente hash di dati indicizzati nella rete principale_
- [ANSA](https://cointelegraph.com/news/italys-top-news-agency-uses-blockchain-to-fight-fake-coronavirus-news) _la maggiore agenzia di stampa italiana combatte contro le fake news e consente ai lettori di verificare l'origine delle notizie registrandole sulla rete principale_
- [Verizon](https://decrypt.co/46745/verizon-news-press-releases-ethereum-full-transparency) _registra le conferenze stampa su Ethereum per assicurare responsabilità a livello societario e attendibilità_
- [Breitling](https://www.coindesk.com/breitling-arianee-all-new-watches-ethereum) _registra la provenienza e lo storico delle riparazioni degli orologi su Ethereum_

### Catena d'approvvigionamento {#supply-chain}

- [CargoX](https://cargox.io/press-releases/full/cargox-becomes-first-public-blockchain-ethereum-bill-lading-provider-approved-international-group-pi-clubs) _fornitore di polizze di carico e trasferimento di documenti_
- [Morpheus.network](https://morpheus.network/) _piattaforma di automatizzazione della catena d'approvvigionamento che implementa un ibrido di catene private con dati autenticati sulla rete principale Ethereum e viene utilizzata da aziende come il distributore di carburante e petrolio canadese Federated Co-op Ltd. e il fornitore di alimenti per animali domestici argentino Vitalcan_
- [Minespider](https://www.minespider.com/) _monitoraggio della catena di approvvigionamento_
- [ShipChain](https://shipchain.io) _sidechain pubblica di Ethereum e sistema aziendale per la visibilità e l'attendibilità della catena d'approvvigionamento, specialmente per la logistica multimodale_
- [Follow Our Fibre](https://www.followourfibre.com) _tracciabilità della filiera della viscosa_
- [EY OpsChain Network Procurement](https://blockchain.ey.com/products/procurement) _consente alle aziende di interagire in un flusso di lavoro d'approvvigionamento emettendo richieste di preventivo, contratti, ordini d'acquisto e fatture nella rete di partner aziendali affidabili_
- [Treum](https://treum.io/) _assicura trasparenza, tracciabilità e commerciabilità alle catene d'approvvigionamento usando la tecnologia della blockchain_

### Credenziali e certificazioni {#credentials}

- La [Contea dello Utah](http://www.utahcounty.gov/Dept/ClerkAud/DigitalCertCopy.html) _emette certificati di matrimonio digitali su Ethereum_
- [Due scuole superiori italiane](https://cointelegraph.com/news/two-italian-high-schools-to-issue-digital-diplomas-with-blockchain) _emettono diplomi sulla rete principale Ethereum_
- L'[Università di St. Gallen](https://cointelegraph.com/news/swiss-university-fights-fake-diplomas-with-blockchain-technology) _ha avviato un progetto pilota per verificare le lauree conferite da un'università svizzera_
- [Malta](https://cointelegraph.com/news/malta-to-store-education-certificates-on-a-blockchain) _tutti i certificati di istruzione registrati sulla rete principale da [Hyland](https://www.learningmachine.com/)_
- La [Pohang University of Science and Technology](https://www.theblockcrypto.com/linked/55176/south-korean-university-issues-blockchain-stored-diplomas-amid-the-spread-of-the-coronavirus), _università sudcoreana, emette diplomi memorizzati sulla blockchain ai nuovi laureati_
- [OpenCerts](https://opencerts.io/) _emette credenziali d'istruzione nella blockchain a Singapore_
- [BlockCerts](https://www.blockcerts.org/) _ha sviluppato uno standard aperto per le credenziali della blockchain_
- [SkillTree](http://skilltree.org/) _training per migliorare le competenze online e certificazioni configurabili con trigger di scadenza o dipendenze da altre competenze_

### Utilità {#utilities}

- [GridPlus](https://blog.gridplus.io/gridplus-is-live-in-texas-efc83c814601) _pagamenti elettronici_

Se desideri aggiungere qualcosa a questo elenco, consulta le [istruzioni per contribuire](https://ethereum.org/en/contributing/).
