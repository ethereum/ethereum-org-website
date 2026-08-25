---
title: Aree attive della ricerca su Ethereum
description: Esplora diverse aree di ricerca aperta e scopri come partecipare.
lang: it
---

Uno dei principali punti di forza di Ethereum è che una comunità attiva di ricerca e ingegneria lo migliora costantemente. Molte persone entusiaste e competenti in tutto il mondo vorrebbero dedicarsi alle questioni in sospeso di Ethereum, ma non è sempre facile scoprire quali siano. Questa pagina delinea le principali aree di ricerca attive come guida approssimativa all'avanguardia di Ethereum.

## Come funziona la ricerca su Ethereum {#how-ethereum-research-works}

La ricerca su Ethereum è aperta e trasparente. La cultura è quella di rendere gli strumenti e i risultati della ricerca il più aperti e interattivi possibile, ad esempio attraverso notebook eseguibili. La ricerca su Ethereum si muove rapidamente, con nuove scoperte pubblicate e discusse apertamente su forum come [ethresear.ch](https://ethresear.ch/) piuttosto che raggiungere la comunità attraverso pubblicazioni tradizionali dopo cicli di revisione paritaria (peer review). La Fondazione Ethereum pubblica anche le proprie priorità e i relativi motivi, in modo che chiunque possa vedere quali problemi sono attualmente considerati urgenti.

## Risorse generali di ricerca {#general-research-resources}

Indipendentemente dall'argomento specifico, c'è una ricchezza di informazioni sulla ricerca di Ethereum che si può trovare su [ethresear.ch](https://ethresear.ch) e nel [canale Discord Eth R&D](https://discord.gg/qGpsxSA). Questi sono i luoghi principali in cui i ricercatori di Ethereum discutono le ultime idee e opportunità di sviluppo.

Per una panoramica della direzione in cui sta andando il protocollo, inizia con la [roadmap di Ethereum](/roadmap/), poi leggi l'[Aggiornamento delle Priorità del Protocollo per il 2026](https://blog.ethereum.org/2026/02/18/protocol-priorities-update-2026) della Fondazione Ethereum e gli [aggiornamenti dei cluster del protocollo](https://blog.ethereum.org/2026/05/11/protocol-update-may-26) che ne riportano i progressi. Gli [Ethereum Protocol Studies](https://blog.ethereum.org/2026/02/17/ethereum-protocol-studies-26) sono un punto di ingresso strutturato per le persone che vogliono lavorare sul protocollo stesso.

## Fonti di finanziamento {#sources-of-funding}

Puoi partecipare alla ricerca su Ethereum ed essere pagato per farlo. [La Fondazione Ethereum](/foundation/) finanzia la ricerca e i beni pubblici attraverso il suo [Ecosystem Support Program](https://esp.ethereum.foundation/applicants), che pubblica elementi della lista dei desideri e richieste di proposte che descrivono i problemi che vorrebbe vedere risolti. Puoi trovare informazioni sulle opportunità di finanziamento attive e future sulla [pagina delle sovvenzioni di Ethereum](/community/grants/).

## Ricerca sul protocollo {#protocol-research}

La ricerca sul protocollo riguarda il livello di base di Ethereum: l'insieme di regole che definiscono come i nodi si connettono, comunicano, scambiano e archiviano i dati di Ethereum e raggiungono il consenso sullo stato della blockchain. Le sue due categorie di lunga data sono il consenso e l'esecuzione, e diversi argomenti di ricerca ora le attraversano entrambe.

### Consenso {#consensus}

La ricerca sul consenso riguarda il [meccanismo di Proof-of-Stake (PoS) di Ethereum](/developers/docs/consensus-mechanisms/pos/): la sicurezza della regola di scelta del fork e del gadget di definitività, la criptoeconomia dello staking, la rete peer-to-peer che trasporta blocchi, attestazioni e dati blob, e la crittografia con cui i validatori firmano. Alcuni esempi di argomenti di ricerca sul consenso sono:

- identificare e correggere le vulnerabilità;
- quantificare la sicurezza criptoeconomica;
- ridurre il tempo necessario affinché un blocco raggiunga la definitività;
- e migliorare l'efficienza, la sicurezza e il monitoraggio della rete peer-to-peer tra i client di consenso.

Gran parte di questo lavoro è passato dalla teoria alle specifiche. Il campionamento della disponibilità dei dati è stato rilasciato nell'aggiornamento [Fusaka](/roadmap/fusaka/), le modifiche al modo in cui i blocchi vengono costruiti e a come viene garantita l'inclusione delle transazioni sono specificate per i prossimi aggiornamenti, e una riprogettazione a più lungo orizzonte nota come "lean consensus" (consenso snello) sta esplorando una definitività più rapida insieme a firme post-quantistiche.

#### Letture di base {#background-reading}

- [Introduzione alla Proof-of-Stake](/developers/docs/consensus-mechanisms/pos/)
- [Finalità a singolo slot](/roadmap/single-slot-finality/)
- [Documento su Casper FFG](https://arxiv.org/abs/1710.09437)
- [Documento su Gasper](https://arxiv.org/abs/2003.03052)
- [Ethereum snello (lean Ethereum)](https://blog.ethereum.org/2025/07/31/lean-ethereum)

#### Ricerca recente {#recent-research}

- [Consenso su Ethresear.ch](https://ethresear.ch/c/consensus/29)
- [Dilemma Disponibilità/Definitività](https://arxiv.org/abs/2009.04987)
- [Definitività a 3 slot: la SSF non riguarda un "singolo" slot](https://ethresear.ch/t/3-slot-finality-ssf-is-not-about-single-slot/20927)

### Esecuzione {#execution}

Il livello di esecuzione si occupa di eseguire le transazioni, far funzionare la [Macchina Virtuale di Ethereum (EVM)](/developers/docs/evm/) e generare i payload di esecuzione da passare al livello di consenso. La ricerca qui si divide in due filoni: rendere lo stato economico da mantenere e dimostrare, e aumentare la capacità transazionale senza scaricare ulteriori costi sulle persone che gestiscono i nodi. Ci sono molte aree di ricerca attive, tra cui:

- rivalutare il costo in gas delle operazioni che creano stato;
- scadenza della cronologia che i nodi non hanno più bisogno di servire;
- liste di accesso a livello di blocco che consentono di validare le transazioni in parallelo;
- mercati delle commissioni multidimensionali che prezzano stato, dati e calcolo separatamente;
- e dimostrare l'esecuzione dei blocchi L1 con una zkEVM.

#### Letture di base {#background-reading-1}

- [Introduzione all'EVM](/developers/docs/evm/)
- [Livello di esecuzione su Ethresear.ch](https://ethresear.ch/c/execution-layer-research/37)
- [Specifiche del livello di esecuzione di Ethereum](https://github.com/ethereum/execution-specs)
- [Ottimizzazioni del database](https://github.com/erigontech/erigon/blob/main/docs/programmers_guide/db_faq.md)

#### Ricerca recente {#recent-research-1}

- [EIP-7928: Liste di accesso a livello di blocco](https://eips.ethereum.org/EIPS/eip-7928)
- [EIP-8037: Aumento del costo in gas per la creazione dello stato](https://eips.ethereum.org/EIPS/eip-8037)
- [EIP-7999: Mercato delle commissioni multidimensionale unificato](https://eips.ethereum.org/EIPS/eip-7999)
- [EIP-7642: eth/69, scadenza della cronologia e ricevute più semplici](https://eips.ethereum.org/EIPS/eip-7642)
- [Rilasciare una zkEVM L1: dimostrazione in tempo reale](https://blog.ethereum.org/2025/07/10/realtime-proving)

### Resistenza alla censura e costruzione dei blocchi {#censorship-resistance-and-block-building}

La maggior parte dei blocchi di Ethereum è attualmente assemblata da un piccolo numero di costruttori specializzati, il che concentra il potere di decidere quali transazioni includere. La ricerca in quest'area riguarda l'introduzione del mercato dei costruttori nel protocollo stesso, in modo che i ruoli di proposta e costruzione di un blocco siano separati dalle regole del consenso piuttosto che da software fuori dal protocollo, e fornire ai validatori un modo per forzare l'inclusione delle transazioni che i costruttori tralasciano.

#### Letture di base {#background-reading-21}

- [Separazione proponente-costruttore (PBS)](/roadmap/pbs/)
- [Elezione del leader segreto singolo (SSLE)](/roadmap/secret-leader-election/)

#### Ricerca recente {#recent-research-21}

- [EIP-7732: Separazione proponente-costruttore integrata](https://eips.ethereum.org/EIPS/eip-7732)
- [EIP-7805: Liste di inclusione applicate dalla scelta del fork](https://eips.ethereum.org/EIPS/eip-7805)
- [Aumentare la resistenza alla censura delle transazioni con la separazione proponente-costruttore](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)

### Crescita dello stato e assenza di stato {#state-growth-and-statelessness}

Ogni nodo completo archivia lo stato di Ethereum, quindi la velocità con cui tale stato cresce stabilisce un limite minimo al costo di gestione di un nodo. A breve termine, la ricerca si concentra sulla rivalutazione delle operazioni che creano stato e sulla scadenza della cronologia che i nodi non hanno più bisogno di conservare. A lungo termine, il piano è di sostituire il trie esadecimale Merkle-Patricia di Ethereum con un albero binario che produce prove molto più piccole, e di muoversi verso l'assenza di stato, in modo che un nodo possa verificare i blocchi senza mantenere l'intero stato. I lavori precedenti in quest'area presupponevano gli alberi di Verkle; la proposta attuale è un albero binario unificato, che riporta il programma del gas del testimone specificato per quella precedente linea di lavoro.

#### Letture di base {#background-reading-22}

- [Assenza di stato e scadenza dello stato](/roadmap/statelessness/)
- [Libro sull'assenza di stato di Ethereum](https://stateless.fyi/)

#### Ricerca recente {#recent-research-22}

- [EIP-7864: Stato di Ethereum utilizzando un albero binario unificato](https://eips.ethereum.org/EIPS/eip-7864)
- [EIP-4762: Modifiche al costo in gas per l'assenza di stato](https://eips.ethereum.org/EIPS/eip-4762)
- [Perché lo stato decentralizzato è importante per Ethereum](https://ethresear.ch/t/why-decentralized-state-is-important-for-ethereum/25622)

### Crittografia post-quantistica {#post-quantum-cryptography}

Le firme dei validatori di Ethereum e gran parte del suo livello applicativo si basano sulla crittografia a curva ellittica, che un computer quantistico sufficientemente capace potrebbe violare. Rendere Ethereum resistente ai computer quantistici significa sostituire quelle firme con alternative basate su hash o su reticoli, mantenendo l'aggregazione delle firme abbastanza efficiente per un ampio set di validatori e fornendo agli account esistenti un percorso di migrazione. La Fondazione Ethereum gestisce un team post-quantistico dedicato, e questo è uno dei programmi a più lungo orizzonte sulla roadmap.

#### Letture di base {#background-reading-23}

- [Resistenza quantistica](/roadmap/security/quantum-resistance/)
- [Ethereum post-quantistico](https://pq.ethereum.org/)

#### Ricerca recente {#recent-research-23}

- [Ethereum snello (lean Ethereum)](https://blog.ethereum.org/2025/07/31/lean-ethereum)
- [Crittografia su Ethresear.ch](https://ethresear.ch/c/cryptography/28)
- [Implementazioni di Ethereum snello](https://github.com/leanEthereum)

## Sviluppo dei client {#client-development}

I client di Ethereum sono implementazioni del protocollo Ethereum. Lo sviluppo dei client trasforma i risultati della ricerca sul protocollo in realtà integrandoli in questi client. Lo sviluppo dei client include l'aggiornamento delle specifiche del client e la creazione di implementazioni specifiche.

A un nodo Ethereum è richiesto di eseguire due software:

1. un client di consenso per tenere traccia della testa della blockchain, diffondere i blocchi e gestire la logica del consenso
2. un client di esecuzione per supportare la Macchina Virtuale di Ethereum ed eseguire transazioni e smart contract

Nuove classi di client vengono prototipate insieme a queste due, inclusi client che dimostrano l'esecuzione dei blocchi L1 e client di consenso snelli costruiti attorno a firme post-quantistiche.

Consulta la [pagina dei nodi e dei client](/developers/docs/nodes-and-clients/) per maggiori dettagli su nodi e client e per un elenco di tutte le attuali implementazioni dei client. Puoi anche trovare una cronologia di tutti gli aggiornamenti di Ethereum sulla [pagina della cronologia](/ethereum-forks/).

### Client di esecuzione {#execution-clients}

- [Specifiche del client di esecuzione](https://github.com/ethereum/execution-specs)
- [Specifiche dell'API di esecuzione](https://github.com/ethereum/execution-apis)

### Client di consenso {#consensus-clients}

- [Specifiche del client di consenso](https://github.com/ethereum/consensus-specs)
- [Specifiche dell'API della Beacon Chain](https://ethereum.github.io/beacon-APIs/)

### Client zkEVM {#zkevm-clients}

- [zkEVM](/roadmap/zkevm/)
- [Ethproofs](https://ethproofs.org/)
- [Rilasciare una zkEVM L1: le basi della sicurezza](https://blog.ethereum.org/2025/12/18/zkevm-security-foundations)

## Scalabilità e prestazioni {#scaling-and-performance}

Scalare Ethereum è un'ampia area di interesse per i ricercatori di Ethereum e procede su due binari contemporaneamente: aumentare la capacità transazionale del layer 1 stesso e spostare l'esecuzione sui rollup che pubblicano i loro dati su Ethereum. Il lavoro attuale include l'aumento del limite di gas del blocco, la rivalutazione della crescita dello stato, l'espansione della capacità dei blob per i dati dei rollup e la riduzione di ciò che un nodo deve archiviare e verificare. Informazioni introduttive sulla scalabilità di Ethereum sono disponibili sulla nostra [pagina sulla scalabilità](/developers/docs/scaling/) e sulla [roadmap della scalabilità](/roadmap/scaling/).

### Layer 2 {#layer-2}

Ora ci sono diversi protocolli layer 2 (l2) che scalano Ethereum utilizzando diverse tecniche per il batching delle transazioni e per metterle in sicurezza sul layer 1 di Ethereum. La ricerca aperta include la riduzione della latenza e del costo della dimostrazione, l'abbreviazione del tempo necessario affinché una transazione raggiunga la definitività trustless e l'offerta agli utenti di un'unica esperienza coerente attraverso molti rollup.

#### Letture di base {#background-reading-2}

- [Introduzione ai layer 2](/layer-2/)
- [L2BEAT: riepilogo della scalabilità](https://l2beat.com/scaling/summary)
- [Una roadmap di Ethereum incentrata sui rollup](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698)

#### Ricerca recente {#recent-research-2}

- [Layer 2 su Ethresear.ch](https://ethresear.ch/c/layer-2/32)
- [L2BEAT: costi onchain](https://l2beat.com/scaling/costs)
- [Costruire su Ethereum nel 2026: cosa è cambiato](/latest/building-on-ethereum-in-2026/)

### Interoperabilità {#interoperability}

Utenti e asset sono distribuiti sul layer 1 di Ethereum e su molti layer 2, e il problema di ricerca è consentire loro di muoversi e agire attraverso quelle catene senza fidarsi di un intermediario. Il lavoro qui copre i trasferimenti basati sull'intento, l'indirizzamento e la denominazione cross-chain standardizzati, il passaggio generale di messaggi e l'astrazione della catena a livello di portafoglio. Questo sostituisce un modello in cui i bridge di custodia detenevano gli asset, e i bridge sono stati storicamente una delle maggiori fonti di perdite nell'ecosistema, quindi la sicurezza di qualsiasi meccanismo cross-chain rimane una preoccupazione centrale.

#### Letture di base {#background-reading-3}

- [Introduzione ai bridge blockchain](/bridges/)
- [Far sembrare di nuovo Ethereum come un'unica catena](https://blog.ethereum.org/2025/11/18/eil)
- [Open Intents Framework](https://openintents.xyz/)
- [Validazione dei bridge](https://stonecoldpat.github.io/images/validatingbridges.pdf)

#### Ricerca recente {#recent-research-3}

- [ERC-7683: Intenti cross-chain](https://eips.ethereum.org/EIPS/eip-7683)
- [ERC-7930: Indirizzi interoperabili](https://eips.ethereum.org/EIPS/eip-7930)
- [ERC-7828: Nomi interoperabili](https://eips.ethereum.org/EIPS/eip-7828)

### Disponibilità dei dati e scalabilità dei blob {#data-availability-and-blob-scaling}

I rollup pubblicano i loro dati su Ethereum nei blob, e scalare quel livello di dati è un problema di ricerca a sé stante, separato dalla scalabilità dell'esecuzione. Ethereum ora utilizza il campionamento della disponibilità dei dati, in modo che i validatori possano verificare che i dati dei blob siano stati pubblicati campionandone delle parti invece di scaricarli tutti, e la capacità dei blob viene aumentata in modo incrementale attraverso fork dedicati solo ai parametri dei blob. Le questioni aperte includono fino a che punto può essere spinto il campionamento, come mantenere gestibili i requisiti di larghezza di banda per le persone che fanno staking da casa e come il prezzo dei blob dovrebbe rispondere alla domanda.

#### Letture di base {#background-reading-4}

- [PeerDAS](/roadmap/fusaka/peerdas/)
- [Aggiornamento Fusaka](/roadmap/fusaka/)
- [Danksharding](/roadmap/danksharding/)
- [Disponibilità dei dati](/developers/docs/data-availability/)
- [EIP-4844: Transazioni blob di shard](https://eips.ethereum.org/EIPS/eip-4844)
- [Note sul Proto-Danksharding](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq)

#### Ricerca recente {#recent-research-4}

- [EIP-7594: PeerDAS](https://eips.ethereum.org/EIPS/eip-7594)
- [EIP-7892: Hard fork solo per i parametri dei blob](https://eips.ethereum.org/EIPS/eip-7892)
- [Sharding su Ethresear.ch](https://ethresear.ch/c/sharding/6)

### Hardware {#hardware}

[Eseguire nodi](/developers/docs/nodes-and-clients/run-a-node/) su hardware modesto è fondamentale per mantenere Ethereum decentralizzato, quindi ogni aumento della capacità transazionale deve essere soppesato rispetto a quanto costa a un operatore del nodo. Con l'aumento del limite di gas del blocco e ulteriori aumenti pianificati, la ricerca attiva copre la crescita dello stato e come prezzarla, le prestazioni della sincronizzazione e del database su uno stato più ampio, i risparmi su disco disponibili dalla scadenza della cronologia e, infine, l'assenza di stato.

#### Letture di base {#background-reading-5}

- [Avvia il tuo nodo Ethereum](/developers/docs/nodes-and-clients/run-a-node/)
- [Assenza di stato e scadenza dello stato](/roadmap/statelessness/)
- [Ethereum su ARM](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)

#### Ricerca recente {#recent-research-5}

- [Scalare Ethereum: il percorso verso un limite di gas più elevato e oltre](https://ethpandaops.io/posts/gaslimit-scaling/)
- [EIP-8261: Programma del limite di gas](https://eips.ethereum.org/EIPS/eip-8261)
- [EIP-8037: Aumento del costo in gas per la creazione dello stato](https://eips.ethereum.org/EIPS/eip-8037)

## Sicurezza {#security}

La sicurezza è un argomento ampio che potrebbe includere la prevenzione di spam e truffe, la sicurezza del portafoglio, la sicurezza hardware, la sicurezza criptoeconomica, la resistenza alla censura, la preparazione post-quantistica, la caccia ai bug e il test e la verifica delle applicazioni e del software client. La [roadmap della sicurezza](/roadmap/security/) di Ethereum copre il lavoro a livello di protocollo.

### Crittografia e ZKP {#cryptography--zkp}

Le prove a conoscenza zero (ZKP) e la crittografia sono fondamentali per integrare privacy e sicurezza in Ethereum e nelle sue applicazioni. La dimostrazione a conoscenza zero è passata dalla ricerca all'infrastruttura di produzione: i prover che dimostrano blocchi Ethereum reali sono ora valutati pubblicamente su latenza, costo e solidità. I problemi aperti si sono spostati di conseguenza, verso la dimostrazione dei blocchi L1 abbastanza velocemente da farlo in tempo reale, tenendo rigorosamente conto della sicurezza dei sistemi di prova in uso e preparandosi per la crittografia post-quantistica.

#### Letture di base {#background-reading-6}

- [zkEVM](/roadmap/zkevm/)
- [Privacy](/roadmap/privacy/)
- [Podcast Zero Knowledge](https://zeroknowledge.fm/)

#### Ricerca recente {#recent-research-6}

- [ZK su Ethresear.ch](https://ethresear.ch/c/zk-s-nt-arks/13)
- [Crittografia su Ethresear.ch](https://ethresear.ch/c/cryptography/28)
- [Calcolatore di solidità per sistemi di prova zkEVM basati su hash](https://github.com/ethereum/soundcalc)
- [Rilasciare una zkEVM L1: le basi della sicurezza](https://blog.ethereum.org/2025/12/18/zkevm-security-foundations)

### Portafogli {#wallets}

I portafogli di Ethereum possono essere estensioni del browser, app desktop e mobili o smart contract su Ethereum. L'astrazione dell'account non è più sperimentale: l'ERC-4337 fornisce account intelligenti senza modifiche al protocollo, e l'EIP-7702 consente a un account ordinario di impostare il codice in modo che il batching delle transazioni, la sponsorizzazione del gas e il recupero sociale funzionino con l'indirizzo che un utente ha già. La ricerca aperta ora si concentra sull'astrazione dell'account nativa nel protocollo stesso, su architetture di account modulari e verificabili, e sulla gestione e il recupero delle chiavi che le persone comuni possono operare in sicurezza.

#### Letture di base {#background-reading-7}

- [Introduzione ai portafogli](/wallets/)
- [Introduzione alla sicurezza del portafoglio](/security/)
- [Astrazione dell'account](/roadmap/account-abstraction/)
- [EIP-7702](/roadmap/pectra/7702/)
- [Sicurezza su Ethresear.ch](https://ethresear.ch/c/security/25)

#### Ricerca recente {#recent-research-7}

- [EIP-8141: Transazione frame](https://eips.ethereum.org/EIPS/eip-8141)
- [ERC-5792: API di chiamata del portafoglio](https://eips.ethereum.org/EIPS/eip-5792)
- [ERC-6963: Scoperta di provider iniettati multipli](https://eips.ethereum.org/EIPS/eip-6963)
- [Portafogli smart contract focalizzati sulla validazione](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)

## Comunità, istruzione e divulgazione {#community-education-and-outreach}

L'inserimento di nuovi utenti su Ethereum richiede nuove risorse educative e approcci alla divulgazione. Questo potrebbe includere post di blog e articoli, libri, podcast, meme, risorse didattiche, eventi e qualsiasi altra cosa che costruisca comunità, accolga i nuovi arrivati ed educhi le persone su Ethereum.

### Design e UX {#design-and-ux}

Per l'inserimento di più persone su Ethereum, l'ecosistema deve migliorare il suo design e l'esperienza utente. Ciò richiede che designer ed esperti di prodotto riesaminino il funzionamento di portafogli e app, e significa sempre più progettare in base a standard già esistenti: chiamate di portafoglio in batching, sponsorizzazione del gas, account che possono essere recuperati e indirizzi leggibili dall'uomo che portano la catena a cui appartengono. Ci sono relativamente pochi luoghi canonici per la ricerca sull'UX del Web3, quindi gli studi pubblicati e le linee guida di progettazione tendono a essere sparsi.

#### Letture di base {#background-reading-8}

- [Design e UX nel Web3](/developers/docs/design-and-ux/)
- [Roadmap dell'esperienza utente di Ethereum](/roadmap/user-experience/)
- [Playbook del design Web3](https://learnweb3.design/)
- [Manuale di design UX del Web3](https://web3ux.design/)

#### Ricerca recente {#recent-research-8}

- [UX/UI su Ethresear.ch](https://ethresear.ch/c/ui-ux/24)
- [ERC-5792: API di chiamata del portafoglio](https://eips.ethereum.org/EIPS/eip-5792)
- [ERC-7828: Nomi interoperabili](https://eips.ethereum.org/EIPS/eip-7828)

### Economia {#economics}

La ricerca economica in Ethereum segue in generale due approcci: convalidare la sicurezza dei meccanismi che si basano su incentivi economici ("microeconomia") e analizzare i flussi di valore tra protocolli, applicazioni e utenti ("macroeconomia"). Ci sono complessi fattori criptoeconomici relativi all'asset nativo di Ethereum (ether) e ai token costruiti su di esso (ad esempio NFT e token ERC-20).

#### Letture di base {#background-reading-9}

- [Robust Incentives Group](https://rig.ethereum.org/)
- [Masterclass sull'economia di Ethereum e modello economico](https://github.com/CADLabs/ethereum-economic-model)

#### Ricerca recente {#recent-research-9}

- [Economia su Ethresear.ch](https://ethresear.ch/c/economics/16)
- [Equilibrio dell'offerta circolante](https://ethresear.ch/t/circulating-supply-equilibrium-for-ethereum-and-minimum-viable-issuance-during-the-proof-of-stake-era/10954)
- [Quantificare il MEV: quanto è oscura la foresta?](https://arxiv.org/abs/2101.05511)

### Spazio dei blocchi e mercati delle commissioni {#blockspace-fee-markets}

I mercati dello spazio dei blocchi governano l'inclusione delle transazioni degli utenti finali, direttamente su Ethereum (layer 1) o su reti collegate tramite bridge, ad es. i rollup (layer 2). Su Ethereum, le transazioni vengono inviate al mercato delle commissioni implementato nel protocollo come EIP-1559, proteggendo la catena dallo spam e prezzando la congestione. Su entrambi i layer, le transazioni possono produrre esternalità, note come Valore Massimo Estraibile (MEV), che inducono nuove strutture di mercato per catturare o gestire queste esternalità. Il lavoro attuale estende questo aspetto alla determinazione del prezzo di diverse risorse contemporaneamente, poiché stato, dati e calcolo si congestionano in modo indipendente, e alla modifica di chi assembla i blocchi e a quali condizioni.

#### Letture di base {#background-reading-10}

- [Progettazione del meccanismo delle commissioni di transazione per la blockchain di Ethereum: un'analisi economica dell'EIP-1559 (Tim Roughgarden, 2020)](https://timroughgarden.org/papers/eip1559.pdf)
- [Simulazioni dell'EIP-1559 (Robust Incentives Group)](https://ethereum.github.io/abm1559)
- [Economia dei rollup dai principi primi](https://barnabe.substack.com/p/understanding-rollup-economics-from?utm_source=url)
- [Flash Boys 2.0: Frontrunning, riordino delle transazioni e instabilità del consenso negli exchange decentralizzati](https://arxiv.org/abs/1904.05234)

#### Ricerca recente {#recent-research-10}

- [EIP-7999: Mercato delle commissioni multidimensionale unificato](https://eips.ethereum.org/EIPS/eip-7999)
- [EIP-7928: Liste di accesso a livello di blocco](https://eips.ethereum.org/EIPS/eip-7928)
- [MEV cross-domain](https://arxiv.org/abs/2112.01472)

### Incentivi della Proof-of-Stake {#proof-of-stake-incentives}

I validatori utilizzano l'asset nativo di Ethereum (ether) come collaterale contro comportamenti disonesti. La criptoeconomia di questo determina la sicurezza della rete. Validatori sofisticati potrebbero essere in grado di sfruttare le sfumature del livello degli incentivi per lanciare attacchi espliciti. Dall'aggiornamento Pectra, i validatori possono anche detenere e guadagnare su un saldo effettivo molto più ampio e consolidare diversi validatori in uno solo, il che cambia l'economia della loro gestione.

#### Letture di base {#background-reading-11}

- [Saldo effettivo massimo](/roadmap/pectra/maxeb/)
- [Masterclass sull'economia di Ethereum e modello economico](https://github.com/CADLabs/ethereum-economic-model)
- [Simulazioni degli incentivi PoS (Robust Incentives Group)](https://ethereum.github.io/beaconrunner/)

#### Ricerca recente {#recent-research-11}

- [Robust Incentives Group](https://rig.ethereum.org/)
- [Tre attacchi alla PoS di Ethereum](https://arxiv.org/abs/2110.10086)

### Staking liquido e derivati {#liquid-staking-and-derivatives}

Lo staking liquido consente agli utenti con meno di 32 ETH di ricevere rendimenti di staking scambiando ether con un token che rappresenta l'ether in staking che può essere utilizzato nella DeFi. Tuttavia, gli incentivi e le dinamiche di mercato associati allo staking liquido sono ancora in fase di scoperta, così come il suo effetto sulla sicurezza di Ethereum (ad es. i rischi di centralizzazione).

#### Letture di base {#background-reading-12}

- [Staking liquido su Ethresear.ch](https://ethresear.ch/search?q=liquid%20staking)
- [Lido: la strada verso lo staking trustless di Ethereum](https://blog.lido.fi/the-road-to-trustless-ethereum-staking/)

#### Ricerca recente {#recent-research-12}

- [I rischi dei derivati dello staking liquido](https://notes.ethereum.org/@djrtwo/risks-of-lsd)
- [Gestione dei prelievi da Lido](https://ethresear.ch/t/handling-withdrawals-in-lidos-eth-liquid-staking-protocol/8873)

## Test {#testing}

### Test dei client e della rete {#client-and-network-testing}

Le specifiche di Ethereum sono eseguibili e le fixture di test generate da esse sono ciò su cui i team dei client verificano le loro implementazioni. Accanto a queste, harness di test condivisi eseguono i client l'uno contro l'altro e contro condizioni di rete deliberatamente ostili, e le testnet pubbliche testano gli aggiornamenti prima che raggiungano la Mainnet. Migliorare questa infrastruttura è uno dei lavori a più alto impatto disponibili, perché è così che i bug vengono rilevati prima che raggiungano gli utenti.

#### Letture di base {#background-reading-24}

- [Specifiche del livello di esecuzione di Ethereum](https://github.com/ethereum/execution-specs)
- [Specifiche del client di consenso](https://github.com/ethereum/consensus-specs)

#### Ricerca recente {#recent-research-24}

- [hive, un harness di test end-to-end per i client](https://github.com/ethereum/hive)
- [Assertoor, uno strumento di test per le testnet](https://github.com/ethpandaops/assertoor)

### Verifica formale {#formal-verification}

La verifica formale utilizza prove matematiche controllate da macchine per stabilire che una specifica o un'implementazione si comporti come previsto. In Ethereum questo copre la dimostrazione che le implementazioni dell'EVM corrispondano a una semantica formale, la dimostrazione della solidità dei circuiti e dei sistemi di prova su cui si basano i prover a conoscenza zero, e la verifica delle primitive crittografiche sottostanti. Ulteriori ricerche possono rafforzare queste prove ed estenderle a una parte maggiore dello stack.

#### Letture di base {#background-reading-13}

- [zkEVM verificate](https://verified-zkevm.org/)
- [Verifica formale (Intel)](https://www.cl.cam.ac.uk/~jrh13/papers/mark10.pdf)

#### Ricerca recente {#recent-research-13}

- [Panoramica del progetto zkEVM verificata](https://github.com/Verified-zkEVM/Overview)
- [KEVM: semantica dell'EVM in K](https://github.com/runtimeverification/evm-semantics)
- [Verifica formale del contratto di deposito](https://github.com/runtimeverification/deposit-contract-verification)

## Scienza dei dati e analisi {#data-science-and-analytics}

C'è bisogno di più strumenti di analisi dei dati e dashboard che forniscano informazioni dettagliate sull'attività su Ethereum e sulla salute della rete. Gran parte dei dati sottostanti è pubblica e interrogabile, quindi la lacuna è solitamente nell'analisi e nella presentazione piuttosto che nell'accesso.

### Letture di base {#background-reading-14}

- [Dune Analytics](https://dune.com/browse/dashboards)
- [Dashboard della diversità dei client](https://clientdiversity.org/)
- [Specifiche dell'API di esecuzione JSON-RPC di Ethereum](https://ethereum.github.io/execution-apis/)

#### Ricerca recente {#recent-research-14}

- [Analisi dei dati del Robust Incentives Group](https://rig.ethereum.org/)
- [Dati aperti di ethPandaOps](https://ethpandaops.io/data/)
- [L2BEAT: riepilogo della scalabilità](https://l2beat.com/scaling/summary)

## App e strumenti {#apps-and-tooling}

Il livello applicativo supporta un ecosistema diversificato di programmi che regolano le transazioni sul livello di base di Ethereum. I team di sviluppo trovano costantemente nuovi modi per sfruttare Ethereum per creare versioni componibili, permissionless e resistenti alla censura di importanti app del Web2 o creare concetti nativi del Web3 completamente nuovi. Allo stesso tempo, vengono sviluppati nuovi strumenti che rendono meno complessa la creazione di dapp su Ethereum.

### DeFi {#defi}

La finanza decentralizzata (DeFi) è una delle principali classi di applicazioni costruite su Ethereum. La DeFi mira a creare "lego del denaro" componibili che consentano agli utenti di archiviare, trasferire, prestare, prendere in prestito e investire cripto-asset utilizzando gli smart contract. La DeFi è uno spazio in rapida evoluzione che si aggiorna costantemente. È continuamente necessaria la ricerca su protocolli sicuri, efficienti e accessibili.

#### Letture di base {#background-reading-15}

- [DeFi](/defi/)
- [Coinbase: Cos'è la DeFi?](https://www.coinbase.com/learn/crypto-basics/what-is-defi)

#### Ricerca recente {#recent-research-15}

- [Finanza decentralizzata, proprietà centralizzata?](https://arxiv.org/pdf/2012.09306.pdf)
- [Applicazioni su Ethresear.ch](https://ethresear.ch/c/applications/18)

### DAO {#daos}

Un caso d'uso di grande impatto per Ethereum è la capacità di organizzarsi in modo decentralizzato attraverso l'uso delle DAO. C'è molta ricerca attiva su come le DAO su Ethereum possano essere sviluppate e utilizzate per eseguire forme migliorate di governance, come strumento di coordinamento a fiducia minimizzata, espandendo notevolmente le opzioni delle persone oltre le corporazioni e le organizzazioni tradizionali.

#### Letture di base {#background-reading-16}

- [Introduzione alle DAO](/dao/)

#### Ricerca recente {#recent-research-16}

- [Mappatura dell'ecosistema delle DAO](https://www.researchgate.net/publication/358694594_Mapping_out_the_DAO_Ecosystem_and_Assessing_DAO_Autonomy)

### Strumenti per sviluppatori {#developer-tools}

Gli strumenti per gli sviluppatori di Ethereum stanno migliorando rapidamente. C'è molta ricerca e sviluppo attivi da fare in quest'area generale.

#### Letture di base {#background-reading-17}

- [Strumenti per linguaggio di programmazione](/developers/docs/programming-languages/)
- [Framework per sviluppatori](/developers/docs/frameworks/)
- [Introduzione alle dapp](/developers/docs/dapps/)
- [Standard dei token](/developers/docs/standards/tokens/)

#### Ricerca recente {#recent-research-17}

- [Discord Eth R&D](https://discord.gg/qGpsxSA)
- [Specifiche dell'API di esecuzione di Ethereum](https://github.com/ethereum/execution-apis)

### Oracoli {#oracles}

Gli oracoli importano dati offchain sulla blockchain in modo permissionless e decentralizzato. Portare questi dati onchain consente alle dapp di essere reattive ai fenomeni del mondo reale come le fluttuazioni dei prezzi negli asset del mondo reale, gli eventi nelle app offchain o persino i cambiamenti meteorologici.

#### Letture di base {#background-reading-18}

- [Introduzione agli oracoli](/developers/docs/oracles/)

#### Ricerca recente {#recent-research-18}

- [Sondaggio sugli oracoli blockchain](https://arxiv.org/pdf/2004.07140.pdf)

### Sicurezza delle app {#app-security}

Gli hack su Ethereum generalmente sfruttano le vulnerabilità nelle singole applicazioni piuttosto che nel protocollo stesso. Hacker e sviluppatori di app sono bloccati in una corsa agli armamenti per sviluppare nuovi attacchi e difese. Ciò significa che è sempre necessaria un'importante ricerca e sviluppo per mantenere le app al sicuro dagli hack.

#### Letture di base {#background-reading-19}

- [Sicurezza degli smart contract](/developers/docs/smart-contracts/security/)
- [Rapporto sull'exploit di Wormhole](https://www.chainalysis.com/blog/wormhole-hack-february-2022/)
- [Elenco dei post-mortem degli hack ai contratti di Ethereum](https://forum.openzeppelin.com/t/list-of-ethereum-smart-contracts-post-mortems/1191)
- [Rekt News](https://rekt.news/)

#### Ricerca recente {#recent-research-19}

- [Applicazioni su Ethresear.ch](https://ethresear.ch/c/applications/18)

### Stack tecnologico {#technology-stack}

Decentralizzare l'intero stack tecnologico di Ethereum è un'importante area di ricerca. Attualmente, le dapp su Ethereum hanno comunemente alcuni punti di centralizzazione perché si basano su strumenti o infrastrutture centralizzati. Ridurre tale dipendenza significa rendere pratico per le applicazioni leggere Ethereum senza fidarsi di un singolo fornitore, ed è qui che entrano in gioco i client leggeri e l'accesso trustless ai dati dei nodi.

#### Letture di base {#background-reading-20}

- [Stack di Ethereum](/developers/docs/ethereum-stack/)
- [Client leggeri](/developers/docs/nodes-and-clients/light-clients/)
- [Introduzione agli smart contract](/developers/docs/smart-contracts/)
- [Introduzione all'archiviazione decentralizzata](/developers/docs/storage/)

#### Ricerca recente {#recent-research-20}

- [Componibilità degli smart contract](/developers/docs/smart-contracts/composability/)
- [Coinbase: Introduzione allo stack Web3](https://www.coinbase.com/blog/a-simple-guide-to-the-web3-stack)