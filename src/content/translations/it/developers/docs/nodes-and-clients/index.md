---
title: Nodi e client
description: Panoramica dei nodi Ethereum e del software client, come configurare un nodo e perché farlo.
lang: it
sidebar: true
sidebarDepth: 2
---

Ethereum è una rete distribuita di computer che eseguono software (noti come nodi) che possono verificare i blocchi e i dati delle transazioni. Serve un'applicazione, detta client, sul dispositivo che "esegua" un nodo.

## Prerequisiti {#prerequisites}

Dovresti comprendere il concetto di rete peer-to-peer e le [basi dell'EVM](/developers/docs/evm/) prima di immergerti più in profondità ed eseguire la tua istanza di un client di Ethereum. Consulta la nostra [introduzione a Ethereum](/developers/docs/intro-to-ethereum/).

## Che cosa sono i nodi e i client? {#what-are-nodes-and-clients}

Il termine "nodo" si riferisce a un software noto come client. Un client è una implementazione di Ethereum che verifica tutte le transazioni presenti in un blocco, facendo in modo che la rete rimanga sicura e i dati siano accurati.

Puoi avere una panoramica in tempo reale della rete Ethereum dando un'occhiata a questa [mappa dei nodi](https://etherscan.io/nodetracker).

Esistono molti [client di Ethereum](/developers/docs/nodes-and-clients/#execution-clients), in diversi linguaggi di programmazione quali Go, Rust, JavaScript, Typescript, Python, C# .NET, Nim e Java. Ciò che queste implementazioni hanno in comune è che seguono tutte una specifica formale (in origine l'[Ethereum Yellow Paper](https://ethereum.github.io/yellowpaper/paper.pdf)). che determina come funziona la rete Ethereum e la blockchain.

![Client d'esecuzione](./client-diagram.png) Diagramma semplificato delle caratteristiche di un client Ethereum.

## Tipologie di nodo {#node-types}

Se desideri [eseguire il tuo nodo](/developers/docs/nodes-and-clients/run-a-node/), dovresti capire che ne esistono di diversi tipi che consumano i dati in maniera diversa. I client possono eseguire 3 diversi tipi di nodi: leggero, completo e archivio. Esistono anche diverse strategie di sincronizzazione per velocizzare i tempi. La sincronizzazione è la velocità con cui si ottiene lo stato più aggiornato di Ethereum.

### Nodo completo {#full-node}

- Memorizza tutti i dati della blockchain.
- Partecipa alla convalida dei blocchi, verifica tutti i blocchi e gli stati.
- Tutti gli stati possono essere derivati da un nodo completo.
- È al servizio della rete e fornisce dati su richiesta.

### Nodo leggero {#light-node}

- Memorizza la catena di intestazione e richiede tutto il resto.
- Può verificare la validità dei dati in base alle radici dello stato nelle intestazioni dei blocchi.
- Utile per dispositivi a bassa capacità, come dispositivi embedded o telefoni cellulari, che non possono permettersi di memorizzare gigabyte di dati della blockchain.

### Nodo archivio {#archive-node}

- Memorizza tutto ciò che è presente nel nodo completo e crea un archivio degli stati storici. È necessario se desideri consultare qualcosa come un saldo dell'account sul blocco n. 4.000.000 o se vuoi [testare la tua serie di transazioni senza minarle, usando OpenEthereum](https://openethereum.github.io/JSONRPC-trace-module#trace_callmany), in modo semplice e affidabile.
- Si tratta di terabyte e terabyte di dati, che rendono i nodi archivio meno attraenti per gli utenti medi, ma possono essere utili per servizi come block explorer, fornitori di portafogli e analisi della catena.

La sincronizzazione dei client in qualsiasi modalità diversa dall'archivio comporterà l'eliminazione dei dati della blockchain. Significa che non rimarrà un archivio di tutti gli stati storici, ma il nodo completo è in grado di ricostruirli su richiesta.

## Perché si dovrebbe eseguire un nodo Ethereum? {#why-should-i-run-an-ethereum-node}

L'esecuzione di un nodo consente di utilizzare Ethereum in modo affidabile e privato, supportando l'ecosistema.

### Vantaggi per lo sviluppatore {#benefits-to-you}

Eseguire un nodo permette di utilizzare Ethereum in modo veramente privato, autosufficiente e affidabile. Non è necessario affidarsi alla rete perché è possibile verificare i dati da soli con il proprio client. "Non fidarti, verifica" è un mantra noto per la blockchain.

- Il nodo verifica in autonomia tutte le transazioni e i blocchi in base alle regole del consenso. Significa che non devi fare affidamento su altri nodi della rete o fidarti completamente di loro.
- Non dovrai comunicare i tuoi indirizzi e saldi a nodi casuali. Tutto può essere controllato con il proprio client.
- La dapp che si sviluppa può essere più sicura e privata se si utilizza un nodo personale. [MetaMask](https://metamask.io), [MyEtherWallet](https://myetherwallet.com) e altri portafogli possono essere facilmente impostati per puntare al nodo locale.
- Puoi programmare i tuoi endpoint RPC personalizzati.
- Puoi connetterti al tuo nodo usando le **Comunicazioni Tra Processi (IPC)** o riscrivere il nodo per caricare il tuo programma come plugin. Ciò conferisce una bassa latenza, necessaria per sostituire le tue transazioni il più velocemente possibile (ad es. frontrunning).

![Come accedere a Ethereum tramite un'applicazione e i nodi](./nodes.png)

### Vantaggi per la rete {#network-benefits}

Avere una serie diversificata di nodi è importante per la salute, la sicurezza e la resilienza operativa di Ethereum.

- I nodi forniscono accesso ai dati della blockchain per i client leggeri che dipendono da essa. In caso di picchi di utilizzo, per agevolare la sincronizzazione dei nodi leggeri, è necessario che i nodi completi siano in quantità sufficiente. I nodi leggeri non memorizzano l'intera blockchain, bensì verificano i dati attraverso le [radici di stato nelle intestazioni dei blocchi](/developers/docs/blocks/#block-anatomy). Se ne hanno bisogno, possono richiedere ulteriori informazioni ai blocchi.
- I nodi completi applicano le regole di consenso Proof of Work e quindi non possono essere ingannati ad accettare blocchi che non li seguono. Questo fornisce ulteriore sicurezza nella rete, perché se tutti i nodi fossero leggeri, cioè non effettuassero una verifica completa, i miner potrebbero attaccare la rete e, ad esempio, creare blocchi con ricompense più elevate.

Se si esegue un nodo completo, l'intera rete di Ethereum ne beneficia.

## Esecuzione di un nodo proprio {#running-your-own-node}

Vorresti eseguire il tuo client di Ethereum? Scopri come [lanciare il tuo nodo](/developers/docs/nodes-and-clients/run-a-node/)!

### Progetti {#projects}

[**Seleziona un client e segui le istruzioni**](#clients)

**ethnode -** **_Esegui un nodo di Ethereum (Geth o OpenEthereum) per lo sviluppo locale._**

- [GitHub](https://github.com/vrde/ethnode)

**DAppNode -** **_Una GUI del sistema operativo per eseguire i nodi Web3, incluso Ethereum e la beacon chain, su una macchina dedicata._**

- [dappnode.io](https://dappnode.io)

### Risorse {#resources}

- [Running Ethereum Full Nodes: A Complete Guide](https://medium.com/coinmonks/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _Nov 7, 2019 - Justin Leroux_
- [Node Configuration Cheat Sheet](https://dev.to/5chdn/ethereum-node-configuration-modes-cheat-sheet-25l8) _Jan 5, 2019 - Afri Schoeden_
- [How To Install & Run a Geth Node](https://www.quiknode.io/guides/infrastructure/how-to-install-and-run-a-geth-node) _Oct 4, 2020 - Sahil Sen_
- [How To Install & Run a OpenEthereum (fka. Parity) Node](https://www.quiknode.io/guides/infrastructure/how-to-run-a-openethereum-ex-parity-client-node) _Sept 22, 2020 - Sahil Sen_

## Alternative {#alternatives}

Eseguire un nodo può essere difficile e non sempre è necessario eseguire un'istanza propria. In questo caso, è possibile utilizzare un provider di API terzo, come [Infura](https://infura.io), [Alchemy](https://alchemyapi.io) o [QuikNode](https://www.quiknode.io). In alternativa, [ArchiveNode](https://archivenode.io/) è un nodo di archiviazione finanziato dalla community che mira a mettere a disposizione i dati di archivio sulla blockchain Ethereum per sviluppatori indipendenti che altrimenti non potrebbero permetterselo. Per una panoramica sull'uso di questi servizi, dai un'occhiata a [nodi come servizi](/developers/docs/nodes-and-clients/nodes-as-a-service/).

Se qualcuno esegue un nodo di Ethereum con un'API pubblica nella tua community, puoi puntare i tuoi portafogli leggeri (come MetaMask) su un nodo della community [tramite RPC Personalizzato](https://metamask.zendesk.com/hc/en-us/articles/360015290012-Using-a-Local-Node) e ottenere maggiore privacy rispetto a quella offerta da terze parti casuali di fiducia.

D'altro canto, se esegui un client, puoi condividerlo con gli amici che potrebbero averne bisogno.

## Client d'esecuzione (ex "client di Eth1") {#execution-clients}

La community di Ethereum mantiene numerosi client d'esecuzione open source (precedentemente noti come "client di Eth1" o semplicemente "client di Ethereum"), sviluppati da diversi team usando diversi linguaggi di programmazione. Ciò rende la rete più forte e diversificata. L'obiettivo ideale è raggiungere la diversità senza che nessun client prevalga, così da ridurre eventuali punti di errore singoli.

Questa tabella riepiloga i diversi client. Tutti superano i [test dei client](https://github.com/ethereum/tests) e vengono mantenuti attivamente per rimanere al passo con gli aggiornamenti di rete.

| Client                                                       | Linguaggio | Sistemi operativi     | Reti                                     | Strategie di sincronizzazione | Cancellazione dello stato |
| ------------------------------------------------------------ | ---------- | --------------------- | ---------------------------------------- | ----------------------------- | ------------------------- |
| [Geth](https://geth.ethereum.org/)                           | Go         | Linux, Windows, macOS | Mainnet, Görli, Rinkeby, Ropsten         | Fast, Full                    | Archive, Pruned           |
| [OpenEthereum](https://github.com/openethereum/openethereum) | Rust       | Linux, Windows, macOS | Mainnet, Kovan, Ropsten e altre          | Warp, Full                    | Archive, Pruned           |
| [Nethermind](http://nethermind.io/)                          | C#, .NET   | Linux, Windows, macOS | Mainnet, Görli, Ropsten, Rinkeby e altre | Fast, Full                    | Archive, Pruned           |
| [Besu](https://pegasys.tech/solutions/hyperledger-besu/)     | Java       | Linux, Windows, macOS | Mainnet, Rinkeby, Ropsten e Görli        | Fast, Full                    | Archive, Pruned           |
| [Erigon](https://github.com/ledgerwatch/erigon)              | Go         | Linux, Windows, macOS | Mainnet, Görli, Rinkeby, Ropsten         | Fast, Full                    | Archive, Pruned           |

Per ulteriori informazioni sulle reti supportate, consulta [reti Ethereum](/developers/docs/networks/).

### Vantaggi delle diverse implementazioni {#advantages-of-different-implementations}

Ogni client ha vantaggi e casi d'uso unici, quindi è necessario sceglierne uno in base alle proprie preferenze. La diversità consente implementazioni focalizzate su diverse caratteristiche e bacini di utenti. È consigliabile scegliere un client in base a funzionalità, supporto, linguaggio di programmazione o licenze.

#### Go Ethereum {#geth}

Go Ethereum (abbreviato Geth) è una delle implementazioni originali del protocollo Ethereum. Attualmente, è il client più diffuso con la più grande base di utenti e varietà di strumenti per utenti e sviluppatori. È scritto in Go, completamente open source e concesso in licenza con GNU LGPL v3.

#### OpenEthereum {#openethereum}

OpenEthereum è un client Ethereum veloce, ricco di funzionalità e avanzato basato su CLI. È creato per fornire l'infrastruttura essenziale per servizi veloci e affidabili che richiedono una sincronizzazione rapida e tempi di attività massimi. L'obiettivo di OpenEthereum è quello di essere il client Ethereum più veloce, leggero e sicuro. Fornisce una base di codice pulita e modulare per:

- personalizzazione facile.
- integrazione leggera in servizi o prodotti.
- memoria e impronta di archiviazione minime.

OpenEthereum è sviluppato utilizzando l'innovativo linguaggio di programmazione Rust e concesso in licenza con GPLv3.

**Sottolineiamo che OpenEthereum [è ormai superato](https://medium.com/openethereum/gnosis-joins-erigon-formerly-turbo-geth-to-release-next-gen-ethereum-client-c6708dd06dd) e non viene più mantenuto.** Usalo con cautela e preferibilmente passa ad un'altra implementazione client.

#### Nethermind {#nethermind}

Nethermind è un'implementazione di Ethereum creata con lo stack tecnologico C # .NET, in esecuzione su tutte le principali piattaforme, incluso ARM. Offre prestazioni eccellenti con:

- una macchina virtuale ottimizzata
- accesso allo stato
- networking e funzionalità avanzate come dashboard Prometheus/Graphana, supporto per la registrazione aziendale seq, tracciamento RPC JSON e plug-in di analisi.

Inoltre, Nethermind vanta una [documentazione dettagliata](https://docs.nethermind.io), un efficace supporto per gli sviluppatori, una community online e un supporto disponibile 7 giorni su 7, 24 ore al giorno per gli utenti premium.

#### Besu {#besu}

Hyperledger Besu è un client Ethereum di livello enterprise per reti pubbliche e autorizzate. Esegue tutte le funzionalità della Mainnet di Ethereum, dal monitoraggio a GraphQL, ha un monitoraggio avanzato ed è supportato da ConsensSys, entrambi in canali aperti della community e tramite SLA commerciali per imprese. È scritto in Java con licenza Apache 2.0.

#### Erigon {#erigon}

Erigon, precedentemente noto come Erigon, è una diramazione di Go Ethereum orientata alla velocità e all'efficienza dello spazio su disco. Erigon è un'implementazione completamente riprogettata di Ethereum, correntemente scritta in Go ma con implementazioni pianificate in altri linguaggi. L'obiettivo di Erigon è fornire un'implementazione più veloce, modulare e ottimizzata di Ethereum. Può eseguire una sincronizzazione completa del nodo d'archivio usando meno di 2TB di spazio su disco, in meno di 3 giorni.

### Modalità di sincronizzazione {#sync-modes}

Per seguire e verificare i dati correnti nella rete, il client di Ethereum deve essere sincronizzato con l'ultimo stato della rete. Ciò ha luogo scaricando i dati dai pari, verificando crittograficamente la loro integrità e costruendo un database locale della blockchain.

Le modalità di sincronizzazione rappresentano diversi approcci a questo processo con vari compromessi. I client variano anche nella loro implementazione degli algoritmi di sincronizzazione. Fai sempre riferimento alla documentazione ufficiale del tuo client scelto per le specifiche sull'implementazione.

#### Panoramica delle strategie {#overview-of-strategies}

Panoramica generale degli approcci di sincronizzazione usati nei client pronti della rete principale:

##### Sincronizzazione completa {#full-sync}

La sincronizzazione completa scarica tutti i blocchi (incluse intestazioni, transazioni e ricevute) e genera lo stato della blockchain in modo incrementale eseguendo ogni blocco dalla genesi.

- Minimizza la fiducia e offre la massima sicurezza verificando ogni transazione.
- Con un numero crescente di transazioni, possono volerci giorni o persino settimane per elaborare tutte le transazioni.

##### Sincronizzazione rapida

La sincronizzazione rapida scarica tutti blocchi (incluse intestazioni, transazioni e ricevute), verifica tutte le intestazioni, scarica lo stato e lo verifica rispetto alle intestazioni.

- Si basa sulla sicurezza del meccanismo del consenso.
- La sincronizzazione impiega solo qualche ora.

##### Sincronizzazione leggera

La modalità leggera del client scarica tutte le intestazioni e i dati del blocco e ne verifica casualmente alcuni. Sincronizza solo la punta della catena dal checkpoint attendibile.

- Ottiene solo l'ultimo stato basandosi sulla fiducia negli sviluppatori e nel meccanismo del consenso.
- Client pronto all'uso con lo stato di rete corrente in pochi minuti.

[Maggiori informazioni sui client leggeri](https://www.parity.io/blog/what-is-a-light-client/)

##### Sincronizzazione Snap

Implementata da Geth. Usando le istantanee dinamiche fornite dai pari, recupera tutti i dati di account e archivi senza scaricare nodi trie intermedi e ricostruisce localmente il Merkle trie.

- Strategia di sincronizzazione più veloce sviluppata da Geth, attualmente è la sua predefinita
- Risparmia molto spazio su disco e larghezza di banda di rete senza sacrificare la sicurezza.

[Maggiori informazioni su Snap](https://github.com/ethereum/devp2p/blob/master/caps/snap.md)

##### Sincronizzazione Warp

Implementata da OpenEthereum. I nodi generano regolarmente un'istantanea di stato critica del consenso e tutti i pari possono recuperare tali istantanee sulla rete, consentendo una sincronizzazione veloce da questo punto.

- Modalità di sincronizzazione più veloce e predefinita di OpenEthereum, basata sulle istantanee statiche fornite dai pari.
- Strategia simile alla sincronizzazione snap ma senza certi vantaggi sotto il profilo della sicurezza.

[Maggiori informazioni su Warp](https://openethereum.github.io/Beginner-Introduction#warping---no-warp)

##### Sincronizzazione Beam

Implementata da Nethermind e Trinity. Funziona come una sincronizzazione rapida ma scarica anche i dati necessari per eseguire gli ultimi blocchi, consentendoti di interrogare la catena entro i primi minuti dall'inizio.

- Sincronizza innanzi tutto lo stato e consente di interrogare RPC in pochi minuti.
- Ancora in sviluppo e non totalmente affidabile, la sincronizzazione in background è rallentata e le risposte RPC potrebbero fallire.

[Maggiori informazioni su Beam](https://medium.com/@jason.carver/intro-to-beam-sync-a0fd168be14a)

#### Configurazione nel client {#client-setup}

I client offrono opzioni di configurazione avanzate per soddisfare le tue esigenze. Seleziona la più adatta in base al livello di sicurezza, ai dati disponibili e ai costi. Oltre all'algoritmo di sincronizzazione, puoi anche impostare la potatura di vari tipi di dati ormai datati. La potatura consente l'eliminazione di dati obsoleti, ad es. la rimozione i nodi di trie di stato irraggiungibili dai blocchi recenti.

Presta attenzione alla documentazione del client o alla pagina di supporto per scoprire quale modalità di sincronizzazione è quella predefinita. Puoi definire il tipo di sincronizzazione preferita durante la configurazione, come segue:

**Configurare la sincronizzazione leggera (light) su [GETH](https://geth.ethereum.org/) o [ERIGON](https://github.com/ledgerwatch/erigon)**

`geth --syncmode "light"`

Per ulteriori dettagli, dai un'occhiata al tutorial sull'[esecuzione del nodo leggero (light) di Geth](/developers/tutorials/run-light-node-geth/).

**Configurare la sincronizzazione completa con archivio su [Besu](https://besu.hyperledger.org/)**

`besu --sync-mode=FULL`

Come ogni altra configurazione, è definibile con il flag d'avvio o nel file di configurazione. Un altro esempio è [Nethermind](https://docs.nethermind.io/nethermind/), che richiede di scegliere una configurazione durante la prima inizializzazione e crea un file di configurazione.

## Client di consenso (ex client di "Eth2") {#consensus-clients}

Esistono diversi client di consenso (precedentemente noti come client di "Eth2") per supportare gli [aggiornamenti di consenso](/upgrades/beacon-chain/). Eseguono la Beacon Chain e forniranno il meccanismo di consenso di proof-of-stake ai client d'esecuzione dopo [la fusione](/upgrades/merge/).

[Visualizza i client di consenso](/upgrades/get-involved/#clients).

| Client                                                      | Lingua     | Sistemi operativi     | Reti                                  |
| ----------------------------------------------------------- | ---------- | --------------------- | ------------------------------------- |
| [Teku](https://pegasys.tech/teku)                           | Java       | Linux, Windows, macOS | Beacon Chain, Prater                  |
| [Nimbus](https://nimbus.team/)                              | Nim        | Linux, Windows, macOS | Beacon Chain, Prater                  |
| [Lighthouse](https://lighthouse-book.sigmaprime.io/)        | Rust       | Linux, Windows, macOS | Beacon Chain, Prater, Pyrmont         |
| [Lodestar](https://lodestar.chainsafe.io/)                  | TypeScript | Linux, Windows, macOS | Beacon Chain, Prater                  |
| [Prysm](https://docs.prylabs.network/docs/getting-started/) | Go         | Linux, Windows, macOS | Beacon Chain, Gnosis, Prater, Pyrmont |

## Hardware {#hardware}

I requisiti hardware differiscono in base al client, ma in genere non sono così elevati dal momento che il nodo deve solo rimanere sincronizzato. Non bisogna confondersi con il mining, che invece richiede molta più potenza di calcolo. Il tempo di sincronizzazione e le prestazioni naturalmente migliorano con hardware più potente. A seconda delle esigenze e dei desideri, Ethereum può essere eseguita sul computer, su un server domestico, un computer a scheda singola o su server privati virtuali nel cloud.

Un modo semplice per eseguire un nodo è utilizzare soluzioni 'plug and play' come [DAppNode](https://dappnode.io/), che fornisce hardware per l'esecuzione di client e applicazioni, con un'interfaccia utente semplice.

### Requisiti {#requirements}

Prima di installare qualsiasi client, assicurati che il tuo computer abbia abbastanza risorse per eseguirlo. I requisiti minimi e raccomandati sono indicati di seguito, ma la parte più importante è lo spazio su disco. Sincronizzare la blockchain Ethereum richiede molte risorse in ingresso/uscita. La cosa migliore è avere un disco a stato solido (SSD). Per eseguire un client Ethereum su HDD, servono almeno 8 GB di RAM da usare come cache.

#### Requisiti minimi {#recommended-specifications}

- CPU con 2+ core
- Minimo 4 GB di RAM con SSD, 8 GB+ se si dispone di HDD
- Larghezza banda 8 MBit/s

#### Specifiche raccomandate {#recommended-specifications}

- CPU veloce con 4+ core
- 16 GB+ RAM
- SSD veloce con almeno 500 GB di spazio libero
- Larghezza di banda 25+ MBit/s

La modalità di sincronizzazione che scegli influenzerà i requisiti di spazio ma abbiamo stimato lo spazio su disco che ti servirà per ogni client di seguito.

| Client       | Dimensione disco (sincronizzazione veloce) | Dimensione disco (archivio completo) |
| ------------ | ------------------------------------------ | ------------------------------------ |
| Geth         | 400GB+                                     | 6TB+                                 |
| OpenEthereum | 280GB+                                     | 6TB+                                 |
| Nethermind   | 200GB+                                     | 5TB+                                 |
| Besu         | 750GB+                                     | 5TB+                                 |
| Erigon       | N/A                                        | 1TB+                                 |

- Nota: Erigon non esegue la sincronizzazione veloce, ma è possibile la potatura completa (~500GB)

![Grafico che mostra come aumentano i GB necessari per una sincronizzazione completa](./full-sync.png)

![Grafico che mostra come aumentano i GB necessari per una sincronizzazione di archivio](./archive-sync.png)

Da questi grafici si capisce che i requisiti di memoria cambiano in continuazione. Per i dati più aggiornati per Geth e OpenEthereum, vedi i [dati della sincronizzazione completa](https://etherscan.io/chartsync/chaindefault) e i [dati della sincronizzazione di archivio](https://etherscan.io/chartsync/chainarchive).

### Ethereum su un computer a scheda singola {#ethereum-on-a-single-board-computer}

Il modo più conveniente ed economico di eseguire un nodo Ethereum è quello di utilizzare un computer a scheda singola con architettura ARM come Raspberry Pi. [Ethereum on ARM](https://twitter.com/EthereumOnARM) mette a disposizione immagini dei client di Geth, OpenEthereum, Nethermind, e Besu. Ecco un semplice tutorial che spiega [come realizzare e configurare un client ARM](/developers/tutorials/run-node-raspberry-pi/).

Dispositivi di piccole dimensioni, convenienti ed efficienti come questi sono ideali per eseguire un nodo a casa.

## Letture consigliate {#further-reading}

Su internet si trovano molte informazioni sui client Ethereum. Ecco alcune risorse che potrebbero essere utili.

- [Ethereum 101 - Part 2 - Understanding Nodes](https://kauri.io/ethereum-101-part-2-understanding-nodes/48d5098292fd4f11b251d1b1814f0bba/a) _– Wil Barnes, 13 febbraio 2019_
- [Running Ethereum Full Nodes: A Guide for the Barely Motivated](https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _– Justin Leroux, 7 novembre 2019_
- [Running an Ethereum Node](https://docs.ethhub.io/using-ethereum/running-an-ethereum-node/) _– ETHHub, aggiornato frequentemente_
- [Analyzing the hardware requirements to be an Ethereum full validated node](https://medium.com/coinmonks/analyzing-the-hardware-requirements-to-be-an-ethereum-full-validated-node-dc064f167902) _– Albert Palau, 24 settembre 2018_
- [Running a Hyperledger Besu Node on the Ethereum Mainnet: Benefits, Requirements, and Setup](https://pegasys.tech/running-a-hyperledger-besu-node-on-the-ethereum-mainnet-benefits-requirements-and-setup/) _– Felipe Faraggi, 7 maggio 2020_

## Argomenti correlati {#related-topics}

- [Blocchi](/developers/docs/blocks/)
- [Reti](/developers/docs/networks/)

## Tutorial correlati {#related-tutorials}

- [Running a Node with Geth](/developers/tutorials/run-light-node-geth/) _– Come scaricare, installare ed eseguire Geth. Si parla di modalità di sincronizzazione, console JavaScript e altro._
- [Trasforma il tuo Raspberry Pi 4 in un nodo validatore semplicemente eseguendo il flash della scheda MicroSD - Guida d'installazione](/developers/tutorials/run-node-raspberry-pi/) _ - Esegui il flash del tuo Raspberry Pi 4, collega un cavo Ethernet, connetti il disco SSD e alimenta il dispositivo per trasformare il Raspberry Pi 4 in un nodo completo di Ethereum eseguendo il livello d'esecuzione (rete principale) e/o il livello di consenso (Beacon Chain / validatore)._
