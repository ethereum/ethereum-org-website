---
title: Nodi e client
description: Panoramica dei nodi Ethereum e del software client, come configurare un nodo e perché farlo.
lang: it
sidebar: true
sidebarDepth: 2
preMergeBanner: true
---

Ethereum è una rete distribuita di computer (noti come nodi) che eseguono software che possono verificare i blocchi e i dati delle transazioni. Per fare del tuo computer un nodo di Ethereum deve essere eseguita l'applicazione software, detta client.

**Nota: è ancora possibile eseguire un client d'esecuzione da solo. Ma non sarà più possibile farlo dopo [La Fusione](/upgrades/merge). Dopo La Fusione, sia il client d'esecuzione sia quello di consenso devono essere eseguiti insieme perché un utente possa ottenere accesso alla rete di Ethereum. Alcune reti di prova (es. Kiln, Ropsten) hanno già le proprie versioni per La Fusione, quindi, i soli client d'esecuzione non sono più sufficienti per accedere a queste reti a meno che non siano affiancate da un client di consenso che possa tener traccia della testa della catena.**

## Prerequisiti {#prerequisites}

Prima di approfondire ed eseguire la tua istanza di un client Ethereum dovresti comprendere il concetto di rete peer-to-peer e le [basi dell'EVM](/developers/docs/evm/). Consulta la nostra [introduzione a Ethereum](/developers/docs/intro-to-ethereum/).

Se sei nuovo al tema dei nodi, consigliamo di leggere prima la nostra introduzione user-friendly su come [eseguire un nodo di Ethereum](/run-a-node).

## Che cosa sono i nodi e i client? {#what-are-nodes-and-clients}

Un "nodo" è un computer che esegue il software del client di Ethereum. Un client è una implementazione di Ethereum che verifica tutte le transazioni presenti in un blocco, facendo in modo che la rete rimanga sicura e i dati siano accurati. Fino alla Fusione, è necessario un solo software per eseguire un nodo completo (o due per eseguire un nodo di mining). Dopo La Fusione, sono necessari due software client per eseguire un nodo completo (tre per eseguire un nodo validatore), uno per gestire e definire le transazioni (client d'esecuzione), uno per gestire il gossip del blocco e la scelta della biforcazione (client di consenso) e un client del validatore facoltativo che gestisce la produzione dei blocchi e il "voto" sui blocchi ricevuti dai suoi peer.

Puoi avere una panoramica in tempo reale della rete Ethereum dando un'occhiata a questa [mappa dei nodi](https://etherscan.io/nodetracker).

Esistono molti [client d'esecuzione di Ethereum](/developers/docs/nodes-and-clients/#execution-clients) e [client di consenso](/developers/docs/nodes-and-clients/#consensus-clients), in diversi linguaggi di programmazione come Go, Rust, JavaScript, Typescript, Python, C# .NET, Nim e Java. Qello che queste implementazioni hanno in comune è che seguono tutte una specifica formale. Queste specifiche definiscono come funzionano la rete e la blockchain di Ethereum.

![Client d'esecuzione e consenso accoppiati](./eth1eth2client.png) Diagramma semplificato di un client d'esecuzione e uno di consenso accoppiati.

## Tipologie di nodo {#node-types}

Se desideri [eseguire il tuo nodo](/developers/docs/nodes-and-clients/run-a-node/), devi sapere che ne esistono di diversi tipi che consumano i dati in maniera diversa. I client possono eseguire 3 diversi tipi di nodi: leggero, completo e archivio. Esistono anche diverse strategie di sincronizzazione per velocizzare i tempi. La sincronizzazione è la velocità con cui si ottiene lo stato più aggiornato di Ethereum.

### Nodo completo {#full-node}

- Memorizza i dati completi della blockchain (sebbene siano periodicamente ridotti così che un nodo completo non memorizzi tutti i dati dalla genesi)
- Partecipa alla convalida dei blocchi, verifica tutti i blocchi e gli stati.
- Tutti gli stati possono essere derivati da un nodo completo (sebbene gli stati molto vecchi siano ricostruiti a partire dalle richieste effettuate ai nodi di archivio).
- È al servizio della rete e fornisce dati su richiesta.

### Nodo leggero {#light-node}

Invece di scaricare ogni blocco, i nodi leggeri scaricano le intestazioni dei blocchi. Queste contengono solo le informazioni sommarie sui contenuti dei blocchi. Ogni altra informazione di chi ha bisogno il nodo leggero viene richiesta a un nodo completo. Il nodo leggero può quindi verificare indipendentemente i dati che riceve rispetto alle radici di stato nelle intestazioni dei blocchi. I nodi leggeri consentono agli utenti di partecipare alla rete di Ethereum senza il potente hardware o l'elevata larghezza di banda necessari a eseguire i nodi completi. Infine, i nodi leggeri potrebbero funzionare su cellulari o dispositivi embedded. I nodi leggeri non partecipano al consenso (es., non possono essere miner/validatori), ma possono accedere alla blockchain di Ethereum con la stessa funzionalità di un nodo completo.

Il client d'esecuzione Geth prevede un'opzione di [sincronizzazione leggera](https://github.com/ethereum/devp2p/blob/master/caps/les.md). Un nodo leggero di Geth si affida comunque ai nodi completi che servono i dati al nodo leggero. Pochi nodi completi scelgono di servire i dati ai nodi leggeri, quindi spesso questi ultimi non riescono a trovare dei peer. Al momento non esiste alcun client leggero pronto per la produzione sul livello di consenso; ce ne sono però diversi in fase di sviluppo.

Esistono anche dei percorsi potenziali per fornire i dati dei client leggeri sulla [rete di gossip](https://www.ethportal.net/). Questi sono vantaggiosi perché la rete di gossip potrebbe supportare una rete di nodi leggeri senza richiedere ai nodi completi di rispondere alle richieste.

Ethereum non supporta ancora una grande popolazione di nodi leggeri, ma il supporto dei nodi leggeri è un'area in cui si prevede uno sviluppo rapido nel futuro più prossimo.

### Nodo archivio {#archive-node}

- Memorizza tutto ciò che è presente nel nodo completo e crea un archivio degli stati storici. È necessario se desideri consultare qualcosa come un saldo dell'account sul blocco n. 4.000.000 o se vuoi [testare la tua serie di transazioni senza minarle, usando OpenEthereum](https://openethereum.github.io/JSONRPC-trace-module#trace_callmany), in modo semplice e affidabile.
- Si tratta di terabyte e terabyte di dati, che rendono i nodi archivio meno interessanti per l'utente medio, ma possono essere utili per servizi come block explorer, fornitori di portafogli e analisi della catena.

La sincronizzazione dei client in qualsiasi modalità diversa dall'archivio comporterà l'eliminazione dei dati della blockchain. Significa che non rimarrà un archivio di tutti gli stati storici, ma il nodo completo è in grado di ricostruirli su richiesta.

## Perché si dovrebbe eseguire un nodo Ethereum? {#why-should-i-run-an-ethereum-node}

L'esecuzione di un nodo consente di utilizzare Ethereum in modo affidabile e privato, supportando l'ecosistema.

### Vantaggi per lo sviluppatore {#benefits-to-you}

Eseguire un nodo permette di utilizzare Ethereum in modo veramente privato, autosufficiente e affidabile. Non è necessario affidarsi alla rete perché è possibile verificare i dati da soli con il proprio client. "Non fidarti, verifica" è un principio cardine della blockchain.

- Il nodo verifica in autonomia tutte le transazioni e i blocchi in base alle regole del consenso. Significa che non devi fare affidamento su altri nodi della rete né fidarti completamente di loro.
- Non dovrai comunicare i tuoi indirizzi e saldi a nodi casuali. Tutto può essere controllato con il proprio client.
- La dApp può essere più sicura e privata se si utilizza un nodo personale. [MetaMask](https://metamask.io), [MyEtherWallet](https://myetherwallet.com) e altri portafogli possono essere facilmente impostati per puntare al nodo locale.
- Puoi programmare i tuoi endpoint RPC personalizzati.
- Puoi connetterti al tuo nodo usando le **Comunicazioni Tra Processi (IPC)** o riscrivere il nodo per caricare il tuo programma come plugin. Questo conferisce una bassa latenza, necessaria per sostituire le tue transazioni il più velocemente possibile (ad es. frontrunning).

![Come accedere a Ethereum tramite un'applicazione e i nodi](./nodes.png)

### Vantaggi per la rete {#network-benefits}

Avere una serie diversificata di nodi è importante per l'integrità, la sicurezza e la resilienza operativa di Ethereum.

- I nodi forniscono accesso ai dati della blockchain per i client leggeri che dipendono da essa. In caso di picchi di utilizzo, per agevolare la sincronizzazione dei nodi leggeri, è necessario che i nodi completi siano in quantità sufficiente. I nodi leggeri non memorizzano l'intera blockchain, bensì verificano i dati attraverso le [radici di stato nelle intestazioni dei blocchi](/developers/docs/blocks/#block-anatomy). Se ne hanno bisogno, possono richiedere ulteriori informazioni ai blocchi.
- I nodi completi applicano le regole di consenso proof-of-work e quindi non possono essere ingannati ad accettare blocchi che non li seguono. Questo fornisce ulteriore sicurezza nella rete, perché se tutti i nodi fossero leggeri, cioè non effettuassero una verifica completa, i produttori di blocchi potrebbero attaccare la rete e, ad esempio, creare blocchi con ricompense più elevate.

Se si esegue un nodo completo, l'intera rete di Ethereum ne beneficia.

## Esecuzione di un nodo proprio {#running-your-own-node}

Vorresti eseguire il tuo client di Ethereum?

Per un'introduzione per principianti, visita la nostra pagina [Eseguire un nodo](/run-a-node), per saperne di più.

Se sei un utente più tecnico, scopri come [avviare il tuo nodo](/developers/docs/nodes-and-clients/run-a-node/) da riga di comando!

### Progetti {#projects}

**Seleziona un client e segui le istruzioni**

**ethnode -** **_Eseguire un nodo di Ethereum (Geth o OpenEthereum) per lo sviluppo locale._**

- [GitHub](https://github.com/vrde/ethnode)

**DAppNode -** **_Una GUI del sistema operativo per eseguire i nodi Web3, incluso Ethereum e la beacon chain, su una macchina dedicata._**

- [dappnode.io](https://dappnode.io)

### Risorse {#resources}

- [Eseguire nodi completi di Ethereum: una guida completa](https://www.coindesk.com/learn/ethereum-nodes-and-clients-a-complete-guide/)
- [Eseguire il proprio nodo di Ethereum](/developers/docs/nodes-and-clients/run-a-node)
- [Documentazione di Geth](https://geth.ethereum.org/)
- [Come installare ed eseguire un nodo di Lighthouse](https://hackernoon.com/how-to-run-an-eth-20-beacon-node-using-the-lighthouse-macos-client-7t2u3wtv)
- [Guida rapida ai nodi di Nimbus](https://nimbus.guide/quick-start.html)

## Alternative {#alternatives}

Eseguire un nodo può essere difficile e non sempre è necessario eseguire un'istanza propria. In questo caso, è possibile utilizzare un provider di API terzo, come [Infura](https://infura.io), [Alchemy](https://alchemyapi.io) o [QuikNode](https://www.quiknode.io). In alternativa, [ArchiveNode](https://archivenode.io/) è un nodo Archive finanziato dalla community che spera di portare i dati di archivio sulla blockchain Ethereum a sviluppatori indipendenti che altrimenti non potrebbero permetterselo. Per una panoramica sull'uso di questi servizi, dai un'occhiata ai [nodi come servizi](/developers/docs/nodes-and-clients/nodes-as-a-service/).

Se qualcuno esegue un nodo di Ethereum con un'API pubblica nella tua community, puoi puntare i tuoi portafogli leggeri (come MetaMask) su un nodo della community [tramite RPC Personalizzato](https://metamask.zendesk.com/hc/en-us/articles/360015290012-Using-a-Local-Node) e ottenere maggiore privacy rispetto a quella offerta da terzi fidati casuali.

D'altro canto, se esegui un client, puoi condividerlo con gli amici che potrebbero averne bisogno.

## Client d'esecuzione (ex "client di Eth1") {#execution-clients}

La community di Ethereum mantiene numerosi client d'esecuzione open source (precedentemente noti come "client di Eth1" o semplicemente "client di Ethereum"), sviluppati da diversi team usando diversi linguaggi di programmazione. Questo rende la rete più forte e diversificata. L'obiettivo ideale è ottenere una certa diversità senza che nessun client prevalga, per ridurre eventuali punti di errore singoli.

Questa tabella riepiloga i diversi client. Tutti superano i [test dei client](https://github.com/ethereum/tests) e vengono mantenuti attivamente per rimanere al passo con gli aggiornamenti di rete.

| Client                                          | Linguaggio | Sistemi operativi     | Reti                                             | Strategie di sincronizzazione | Cancellazione dello stato |
| ----------------------------------------------- | ---------- | --------------------- | ------------------------------------------------ | ----------------------------- | ------------------------- |
| [Geth](https://geth.ethereum.org/)              | Go         | Linux, Windows, macOS | Mainnet, Görli, Rinkeby, Ropsten                 | Snap, Full                    | Archive, Pruned           |
| [Nethermind](http://nethermind.io/)             | C#, .NET   | Linux, Windows, macOS | Mainnet, Görli, Ropsten, Rinkeby e altre         | Fast, Beam, Archive           | Archive, Pruned           |
| [Besu](https://besu.hyperledger.org/en/stable/) | Java       | Linux, Windows, macOS | Mainnet, Rinkeby, Ropsten, Görli, e altre        | Fast, Full                    | Archive, Pruned           |
| [Erigon](https://github.com/ledgerwatch/erigon) | Go         | Linux, Windows, macOS | Mainnet, Görli, Rinkeby, Ropsten                 | Full                          | Archive, Pruned           |
| [Akula](https://akula.app)                      | Rust       | Linux                 | Rete principale, Görli, Rinkeby, Ropsten e altre | Completo                      | Archive, Pruned           |

**Sottolineiamo che OpenEthereum [è ormai superato](https://medium.com/openethereum/gnosis-joins-erigon-formerly-turbo-geth-to-release-next-gen-ethereum-client-c6708dd06dd) e non viene più mantenuto.** Usalo con cautela e preferibilmente passa ad un'altra implementazione del client.

Per ulteriori informazioni sulle reti supportate, consulta [reti Ethereum](/developers/docs/networks/).

### Vantaggi delle diverse implementazioni {#advantages-of-different-implementations}

Ogni client ha vantaggi e casi d'uso differenti, quindi, è necessario sceglierne uno in base alle proprie preferenze. La diversità consente implementazioni in base alle diverse caratteristiche e al pubblico di utenti. È consigliabile scegliere un client in base a funzionalità, supporto, linguaggio di programmazione o licenze.

#### Go Ethereum {#geth}

Go Ethereum (abbreviato Geth) è una delle implementazioni originali del protocollo Ethereum. Attualmente, è il client più diffuso con la più grande base di utenti e varietà di strumenti per utenti e sviluppatori. È scritto in Go, completamente open source e concesso in licenza con GNU LGPL v3.

#### OpenEthereum {#openethereum}

OpenEthereum è un client Ethereum veloce, ricco di funzionalità e avanzato basato su CLI. È creato per fornire l'infrastruttura essenziale per servizi veloci e affidabili che richiedono una sincronizzazione rapida e tempi di attività massimi. L'obiettivo di OpenEthereum è quello di essere il client Ethereum più veloce, leggero e sicuro. Offre una base di codice pulita e modulare per:

- personalizzazione facile.
- integrazione leggera in servizi o prodotti.
- necessità minime di memoria e archiviazione.

OpenEthereum è sviluppato utilizzando l'innovativo linguaggio di programmazione Rust e concesso in licenza con GPLv3.

**Sottolineiamo che OpenEthereum [è ormai superato](https://medium.com/openethereum/gnosis-joins-erigon-formerly-turbo-geth-to-release-next-gen-ethereum-client-c6708dd06dd) e non viene più mantenuto.** Usalo con cautela e preferibilmente passa ad un'altra implementazione del client.

#### Nethermind {#nethermind}

Nethermind è un'implementazione di Ethereum creata con lo stack di tecnologie C # .NET, funziona su tutte le principali piattaforme, inclusa ARM. Offre prestazioni eccellenti con:

- una macchina virtuale ottimizzata
- accesso allo stato
- networking e funzionalità avanzate come dashboard Prometheus/Graphana, supporto per la registrazione aziendale seq, tracciamento RPC JSON e plug-in di analisi.

Inoltre, Nethermind vanta una [documentazione dettagliata](https://docs.nethermind.io), un efficace supporto per gli sviluppatori, una community online e un supporto disponibile 7 giorni su 7, 24 ore al giorno per gli utenti premium.

#### Besu {#besu}

Hyperledger Besu è un client Ethereum di livello enterprise per reti pubbliche e autorizzate. Esegue tutte le funzionalità della rete principale di Ethereum, dal monitoraggio a GraphQL, ha un monitoraggio avanzato ed è supportato da ConsensSys, entrambi in canali aperti della community e tramite SLA commerciali per le imprese. È scritto in Java con licenza Apache 2.0.

#### Erigon {#erigon}

Erigon, precedentemente noto come Turbo-Geth, è una biforcazione di Go Ethereum orientata alla velocità e all'efficienza dello spazio su disco. Erigon è un'implementazione completamente rivista di Ethereum, attualmente scritta in Go ma con la previsione di lanciare implementazioni in altri linguaggi. L'obiettivo di Erigon è fornire un'implementazione più veloce, popolare e ottimizzata di Ethereum. Può eseguire una sincronizzazione completa del nodo d'archivio usando meno di 2TB di spazio su disco, in meno di 3 giorni

### Modalità di sincronizzazione {#sync-modes}

Per seguire e verificare i dati correnti nella rete, il client di Ethereum deve essere sincronizzato con l'ultimo stato della rete. Questo è fatto scaricando i dati dai peer, verificando crittograficamente la loro integrità e costruendo un database locale della blockchain.

Le modalità di sincronizzazione rappresentano diversi approcci a questo processo con vari compromessi. I client variano anche nella loro implementazione degli algoritmi di sincronizzazione. Occorre fare sempre riferimento alla documentazione ufficiale del client scelto per le specifiche sull'implementazione.

#### Panoramica delle strategie {#overview-of-strategies}

Panoramica generale degli approcci di sincronizzazione usati nei client pronti della rete principale:

##### Sincronizzazione completa

La sincronizzazione completa scarica tutti i blocchi (incluse intestazioni, transazioni e ricevute) e genera lo stato della blockchain in modo incrementale eseguendo ogni blocco a partire dalla genesi.

- Riduce al minimo la fiducia e offre la massima sicurezza verificando ogni transazione.
- Al crescere del numero di transazioni, possono volerci giorni o persino settimane per elaborare tutte le transazioni.

##### Sincronizzazione rapida

La sincronizzazione rapida scarica tutti blocchi (incluse intestazioni, transazioni e ricevute), verifica tutte le intestazioni, scarica lo stato e lo verifica rispetto alle intestazioni.

- Si basa sulla sicurezza del meccanismo del consenso.
- La sincronizzazione impiega solo qualche ora.

##### Sincronizzazione leggera

La modalità client leggero scarica tutte le intestazioni e i dati del blocco e ne verifica casualmente alcuni. Sincronizza solo la punta della catena dal checkpoint attendibile.

- Ottiene solo l'ultimo stato basandosi sulla fiducia negli sviluppatori e nel meccanismo del consenso.
- Client pronto all'uso con lo stato di rete corrente in pochi minuti.

[Maggiori informazioni sui client leggeri](https://www.parity.io/blog/what-is-a-light-client/)

##### Sincronizzazione Snap

Implementata da Geth. Usando le istantanee dinamiche servite dai peer recupera tutti i dati di conti e archiviazione senza scaricare nodi trie intermedi e ricostruisce localmente il Merkle trie.

- Strategia di sincronizzazione più veloce sviluppata da Geth, attualmente è quella sua predefinita
- Risparmia molto spazio su disco e larghezza di banda di rete senza sacrificare la sicurezza.

[Maggiori informazioni su Snap](https://github.com/ethereum/devp2p/blob/master/caps/snap.md)

##### Sincronizzazione Warp

Implementata da OpenEthereum. I nodi generano regolarmente un'istantanea di stato critica del consenso e ogni peer può recuperare queste istantanee sulla rete, consentendo una veloce sincronizzazione da questo punto.

- Modalità di sincronizzazione più veloce e predefinita di OpenEthereum, basata sulle istantanee statiche fornite dai peer.
- Strategia simile alla sincronizzazione snap ma senza certi vantaggi sotto il profilo della sicurezza.

[Maggiori informazioni su Warp](https://openethereum.github.io/Beginner-Introduction#warping---no-warp)

##### Sincronizzazione Beam

Implementata da Nethermind e Trinity. Funziona come una sincronizzazione rapida ma scarica anche i dati necessari per eseguire gli ultimi blocchi, consentendo di interrogare la catena già nei primi minuti dall'inizio.

- Sincronizza innanzitutto lo stato e consente di effettuare interrogazioni RPC in pochi minuti.
- Ancora in sviluppo e non totalmente affidabile, la sincronizzazione in background è rallentata e le risposte RPC potrebbero non andare a buon fine.

[Maggiori informazioni su Beam](https://medium.com/@jason.carver/intro-to-beam-sync-a0fd168be14a)

#### Configurazione nel client {#client-setup}

I client offrono ricche opzioni di configurazione per soddisfare i tuoi bisogni. Seleziona la più adatta in base al livello di sicurezza, ai dati disponibili e ai costi. Oltre all'algoritmo di sincronizzazione, puoi anche impostare la potatura (pruning) di vari tipi di dati ormai datati. La potatura consente l'eliminazione di dati obsoleti, ad es. la rimozione i nodi di trie di stato irraggiungibili dai blocchi recenti.

Presta attenzione alla documentazione del client o alla pagina di supporto per scoprire quale modalità di sincronizzazione è quella predefinita. Puoi definire il tipo di sincronizzazione preferita durante la configurazione, come segue:

**Configurare la sincronizzazione leggera (light) su [GETH](https://geth.ethereum.org/) o [ERIGON](https://github.com/ledgerwatch/erigon)**

`geth --syncmode "light"`

Per ulteriori dettagli, dai un'occhiata al tutorial sull'[esecuzione del nodo leggero (light) di Geth](/developers/tutorials/run-light-node-geth/).

**Configurare la sincronizzazione completa con archivio su [Besu](https://besu.hyperledger.org/)**

`besu --sync-mode=FULL`

Come ogni altra configurazione, è definibile con il flag d'avvio o nel file di configurazione. Un altro esempio è [Nethermind](https://docs.nethermind.io/nethermind/), che richiede di scegliere una configurazione durante la prima inizializzazione e crea un file di configurazione.

## Client di consenso (ex client di "Eth2") {#consensus-clients}

Esistono diversi client di consenso (precedentemente noti come client di "Eth2") per supportare gli [aggiornamenti di consenso](/upgrades/beacon-chain/). Eseguono la Beacon Chain e forniranno il meccanismo di consenso di proof-of-stake ai client d'esecuzione dopo [La Fusione](/upgrades/merge/).

[Visualizza i client di consenso](/upgrades/get-involved/#clients).

| Client                                                      | Lingua     | Sistemi operativi     | Reti                                  |
| ----------------------------------------------------------- | ---------- | --------------------- | ------------------------------------- |
| [Teku](https://pegasys.tech/teku)                           | Java       | Linux, Windows, macOS | Beacon Chain, Prater                  |
| [Nimbus](https://nimbus.team/)                              | Nim        | Linux, Windows, macOS | Beacon Chain, Prater                  |
| [Lighthouse](https://lighthouse-book.sigmaprime.io/)        | Rust       | Linux, Windows, macOS | Beacon Chain, Prater, Pyrmont         |
| [Lodestar](https://lodestar.chainsafe.io/)                  | TypeScript | Linux, Windows, macOS | Beacon Chain, Prater                  |
| [Prysm](https://docs.prylabs.network/docs/getting-started/) | Go         | Linux, Windows, macOS | Beacon Chain, Gnosis, Prater, Pyrmont |

## Hardware {#hardware}

I requisiti hardware differiscono in base al client, ma in genere non sono così elevati dal momento che il nodo deve solo rimanere sincronizzato. Non bisogna confondersi con il mining, che invece richiede molta più potenza di calcolo. Il tempo di sincronizzazione e le prestazioni naturalmente migliorano con hardware più potente. A seconda delle esigenze e dei desideri, Ethereum può essere eseguita sul proprio computer, su un server domestico, un computer a scheda singola o su server privati virtuali nel cloud.

Un modo semplice per eseguire un nodo è utilizzare soluzioni 'plug and play' come [DAppNode](https://dappnode.io/), che fornisce hardware per l'esecuzione di client e applicazioni, con un'interfaccia utente semplice.

### Requisiti {#requirements}

Prima di installare qualsiasi client, assicurati che il tuo computer abbia abbastanza risorse per eseguirlo. I requisiti minimi e raccomandati sono indicati di seguito, ma la parte più importante è lo spazio su disco. Sincronizzare la blockchain Ethereum richiede molte risorse in ingresso/uscita. La cosa migliore è avere un disco a stato solido (SSD). Per eseguire un client Ethereum su HDD, servono almeno 8 GB di RAM da usare come cache.

#### Requisiti minimi {#recommended-specifications}

- CPU con 2+ core
- Minimo 4 GB di RAM con un SSD, 8 GB+ se si dispone di un HDD
- Larghezza banda 8 MBit/s

#### Specifiche raccomandate {#recommended-specifications}

- CPU veloce con 4+ core
- 16 GB+ RAM
- SSD veloce con almeno 500 GB di spazio libero
- Larghezza di banda 25+ MBit/s

La modalità di sincronizzazione che scegli influenzerà i requisiti di spazio, ma sotto trovi una nostra stima dello spazio su disco che ti servirà per ogni client.

| Client       | Dimensione disco (sincronizzazione veloce) | Dimensione disco (archivio completo) |
| ------------ | ------------------------------------------ | ------------------------------------ |
| Geth         | 400GB+                                     | 6TB+                                 |
| OpenEthereum | 280GB+                                     | 6TB+                                 |
| Nethermind   | 200GB+                                     | 5TB+                                 |
| Besu         | 750GB+                                     | 5TB+                                 |
| Erigon       | N/A                                        | 1TB+                                 |

- Nota: Erigon non esegue la sincronizzazione veloce, ma è possibile la potatura completa (circa 500GB)

![Grafico che mostra come aumentano i GB necessari per una sincronizzazione completa](./full-sync.png)

![Grafico che mostra come aumentano i GB necessari per una sincronizzazione di archivio](./archive-sync.png)

Da questi grafici si capisce che i requisiti di memoria cambiano in continuazione. Per i dati più aggiornati per Geth e OpenEthereum, vedi i [dati della sincronizzazione completa](https://etherscan.io/chartsync/chaindefault) e i [dati della sincronizzazione di archivio](https://etherscan.io/chartsync/chainarchive).

### Ethereum su un computer a scheda singola {#ethereum-on-a-single-board-computer}

Il modo più conveniente ed economico di eseguire un nodo Ethereum è quello di utilizzare un computer a scheda singola con architettura ARM come Raspberry Pi. [Ethereum su ARM](https://twitter.com/EthereumOnARM) mette a disposizione immagini dei client di Geth, OpenEthereum, Nethermind, e Besu. Ecco un semplice tutorial che spiega [come realizzare e configurare un client ARM](/developers/tutorials/run-node-raspberry-pi/).

Dispositivi di piccole dimensioni, convenienti ed efficienti come questi sono ideali per eseguire un nodo a casa.

## Letture consigliate {#further-reading}

Su internet si trovano molte informazioni sui client Ethereum. Ecco alcune risorse che potrebbero essere utili.

- [Ethereum 101 - Parte 2 - Comprendere i nodi](https://kauri.io/ethereum-101-part-2-understanding-nodes/48d5098292fd4f11b251d1b1814f0bba/a) _– Wil Barnes, 13 febbraio 2019_
- [Eseguire nodi completi di Ethereum: una guida per i poco motivati](https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _– Justin Leroux, 7 Novembre 2019_
- [Eseguire un nodo di Ethereum](https://docs.ethhub.io/using-ethereum/running-an-ethereum-node/) _– ETHHub, aggiornato spesso_
- [Analizzare i requisiti hardware per poter essere un nodo convalidato e completo di Ethereum](https://medium.com/coinmonks/analyzing-the-hardware-requirements-to-be-an-ethereum-full-validated-node-dc064f167902) _– Albert Palau, 24 settembre 2018_
- [Eseguire un nodo di Hyperledger Besu sulla rete principale di Ethereum: benefici, requisiti e configurazione](https://pegasys.tech/running-a-hyperledger-besu-node-on-the-ethereum-mainnet-benefits-requirements-and-setup/) _– Felipe Faraggi, 7 Maggio 2020_

## Argomenti correlati {#related-topics}

- [Blocchi](/developers/docs/blocks/)
- [Reti](/developers/docs/networks/)

## Tutorial correlati {#related-tutorials}

- [Eseguire un nodo con Geth](/developers/tutorials/run-light-node-geth/) _– Come scaricare, installare ed eseguire Geth. Si parla di modalità di sincronizzazione, console JavaScript e altro._
- [Trasforma il tuo Raspberry Pi 4 in un nodo validatore semplicemente eseguendo il flash della scheda MicroSD - Guida d'installazione](/developers/tutorials/run-node-raspberry-pi/) _ - Esegui il flash del tuo Raspberry Pi 4, collega un cavo Ethernet, connetti il disco SSD e alimenta il dispositivo per trasformare il Raspberry Pi 4 in un nodo completo di Ethereum eseguendo il livello d'esecuzione (rete principale) e/o il livello di consenso (Beacon Chain / validatore)._
