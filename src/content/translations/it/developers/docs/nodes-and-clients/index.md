---
title: Nodi e client
description: Panoramica dei nodi Ethereum e del software client, come configurare un nodo e perché farlo.
lang: it
sidebar: true
sidebarDepth: 2
---

Affinché Ethereum funzioni in modo decentralizzato, serve una rete distribuita di nodi in grado di verificare i dati dei blocchi e delle transazioni. Serve un'applicazione, detta client, sul dispositivo che "esegua" un nodo.

## Prerequisiti {#prerequisites}

È necessario conoscere il concetto di rete decentralizzata prima di approfondire le informazioni ed eseguire un'istanza di un client Ethereum. Consulta la nostra [introduzione a Ethereum](/en/developers/docs/intro-to-ethereum/).

## Che cosa sono i nodi e i client? {#what-are-nodes-and-clients}

Il termine "nodo" si riferisce a un software noto come client. Un client è una implementazione di Ethereum che verifica tutte le transazioni presenti in un blocco, facendo in modo che la rete rimanga sicura e i dati siano accurati.

Puoi avere una panoramica in tempo reale della rete Ethereum dando un'occhiata a questa [mappa dei nodi](https://etherscan.io/nodetracker).

Molte [implementazioni dei client Ethereum](/developers/docs/nodes-and-clients/#clients) sono disponibili in una varietà di lingue. Hanno in comune il fatto di seguire una specifica ufficiale che determina come funziona la rete Ethereum e la blockchain.

![Client Eth1x](./client-diagram.png) Diagramma semplificato delle caratteristiche di un client Ethereum.

## Tipologie di nodo {#node-types}

Se vuoi eseguire un nodo, devi sapere che esistono diverse tipologie di nodi, che utilizzano i dati in modo diverso. I client possono eseguire 3 diversi tipi di nodi: leggero, completo e archivio. Esistono anche diverse strategie di sincronizzazione per velocizzare i tempi. La sincronizzazione è la velocità con cui si ottiene lo stato più aggiornato di Ethereum.

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

- Memorizza tutto ciò che è presente nel nodo completo e crea un archivio degli stati storici. Necessario se si desidera eseguire interrogazioni, ad esempio del saldo di un account al blocco numero 4.000.000.
- Si tratta di terabyte e terabyte di dati, che rendono i nodi archivio meno attraenti per gli utenti medi, ma possono essere utili per servizi come block explorer, fornitori di portafogli e analisi della catena.

La sincronizzazione dei client in qualsiasi modalità diversa dall'archivio comporterà l'eliminazione dei dati della blockchain. Significa che non rimarrà un archivio di tutti gli stati storici, ma il nodo completo è in grado di ricostruirli su richiesta.

## Perché si dovrebbe eseguire un nodo Ethereum? {#why-should-i-run-an-ethereum-node}

L'esecuzione di un nodo consente di utilizzare Ethereum in modo affidabile e privato, supportando l'ecosistema.

### Vantaggi per lo sviluppatore {#benefits-to-you}

Eseguire un nodo permette di utilizzare Ethereum in modo veramente privato, autosufficiente e affidabile. Non è necessario affidarsi alla rete perché è possibile verificare i dati da soli con il proprio client. "Non fidarti, verifica" è un mantra noto per la blockchain.

- Il nodo verifica in autonomia tutte le transazioni e i blocchi in base alle regole del consenso. Significa che non devi fare affidamento su altri nodi della rete o fidarti completamente di loro.
- Non dovrai comunicare i tuoi indirizzi e saldi a nodi casuali. Tutto può essere controllato con il proprio client.
- La dapp che si sviluppa può essere più sicura e privata se si utilizza un nodo personale. [Metamask](https://metamask.io), [MyEtherWallet](https://myetherwallet.com) e altri portafogli possono essere facilmente impostati per puntare al nodo locale.

![Come accedere a Ethereum tramite un'applicazione e i nodi](./nodes.png)

### Vantaggi per la rete {#network-benefits}

Avere una serie diversificata di nodi è importante per la salute, la sicurezza e la resilienza operativa di Ethereum.

- I nodi forniscono accesso ai dati della blockchain per i client leggeri che dipendono da essa. In caso di picchi di utilizzo, per agevolare la sincronizzazione dei nodi leggeri, è necessario che i nodi completi siano in quantità sufficiente. I nodi ridotti non memorizzano l'intera blockchain, ma verificano i dati attraverso le [radici di stato nelle intestazioni dei blocchi](/en/developers/docs/blocks/#block-anatomy). Se ne hanno bisogno, possono richiedere ulteriori informazioni ai blocchi.
- I nodi completi applicano le regole di consenso Proof of Work e quindi non possono essere ingannati ad accettare blocchi che non li seguono. Questo fornisce ulteriore sicurezza nella rete, perché se tutti i nodi fossero leggeri, cioè non effettuassero una verifica completa, i miner potrebbero attaccare la rete e, ad esempio, creare blocchi con ricompense più elevate.

Se si esegue un nodo completo, l'intera rete di Ethereum ne beneficia.

## Esecuzione di un nodo proprio {#running-your-own-node}

### Progetti {#projects}

[**Seleziona un client e segui le istruzioni**](#clients)

**ethnode -** **_Esecuzione di un nodo Ethereum (Geth o Parity) per lo sviluppo locale_**

- [GitHub](https://github.com/vrde/ethnode)

**DAppNode -** **_Sistema operativo per l'esecuzione di nodi Web3, inclusa Ethereum, su un computer dedicato._**

- [dappnode.io](https://dappnode.io)

### Risorse {#resources}

- [Running Ethereum Full Nodes: A Complete Guide](https://medium.com/coinmonks/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _Nov 7, 2019 - Justin Leroux_
- [Node Configuration Cheat Sheet](https://dev.to/5chdn/ethereum-node-configuration-modes-cheat-sheet-25l8) _Jan 5, 2019 - Afri Schoeden_
- [How To Install & Run a Geth Node](https://www.quiknode.io/guides/infrastructure/how-to-install-and-run-a-geth-node) _Oct 4, 2020 - Sahil Sen_
- [How To Install & Run a OpenEthereum (fka. Parity) Node](https://www.quiknode.io/guides/infrastructure/how-to-run-a-openethereum-ex-parity-client-node) _Sept 22, 2020 - Sahil Sen_

## Alternative {#alternatives}

Eseguire un nodo può essere difficile e non sempre è necessario eseguire un'istanza propria. In questo caso, è possibile utilizzare un provider di API terzo, come [Infura](https://infura.io), [Alchemy](https://alchemyapi.io) o [QuikNode](https://www.quiknode.io). In alternativa, [ArchiveNode](https://archivenode.io/) è un nodo archivio finanziato dalla community che spera di portare i dati di archivio sulla blockchain Ethereum a sviluppatori indipendenti che altrimenti non potrebbero permetterselo.

Se qualcuno esegue un nodo Ethereum con un'API pubblica nella tua community, puoi puntare i tuoi portafogli leggeri (come MetaMask) a un nodo della community [tramite RPC personalizzato](https://metamask.zendesk.com/hc/en-us/articles/360015290012-Using-a-Local-Node) e ottenere più privacy rispetto a terze parti casuali affidabili.

D'altro canto, se esegui un client, puoi condividerlo con i amici che potrebbero averne bisogno.

## Client {#clients}

Ethereum è progettato per offrire client diversi, sviluppati da team diversi, utilizzando linguaggi di programmazione diversi. Questo rende la rete più forte e diversificata. L'obiettivo ideale è raggiungere la diversità senza che nessun client prevalga, per ridurre eventuali punti di errore singoli.

Questa tabella riassume i diversi client. Tutti sono attivi, gestiti e hanno superato [test dei client](https://github.com/ethereum/tests).

| Client                                                       | Linguaggio | Sistemi operativi     | Reti                                     | Strategie di sincronizzazione | Cancellazione dello stato |
| ------------------------------------------------------------ | ---------- | --------------------- | ---------------------------------------- | ----------------------------- | ------------------------- |
| [Geth](https://geth.ethereum.org/)                           | Go         | Linux, Windows, macOS | Mainnet, Görli, Rinkeby, Ropsten         | Fast, Full                    | Archive, Pruned           |
| [OpenEthereum](https://github.com/openethereum/openethereum) | Rust       | Linux, Windows, macOS | Mainnet, Kovan, Ropsten e altre          | Warp, Full                    | Archive, Pruned           |
| [Nethermind](http://nethermind.io/)                          | C#, .NET   | Linux, Windows, macOS | Mainnet, Görli, Ropsten, Rinkeby e altre | Fast, Full                    | Archive, Pruned           |
| [Besu](https://pegasys.tech/solutions/hyperledger-besu/)     | Java       | Linux, Windows, macOS | Mainnet, Rinkeby, Ropsten e Görli        | Fast, Full                    | Archive, Pruned           |
| [Trinity](https://trinity.ethereum.org/)                     | Python     | Linux, macOS          | Mainnet, Görli, Ropsten e altre          | Full, Beam, Fast/Header       | Archive                   |

Per ulteriori informazioni sulle reti supportate, consulta [reti Ethereum](/en/developers/docs/networks/).

### Vantaggi delle diverse implementazioni {#advantages-of-different-implementations}

Ogni client ha vantaggi e casi d'uso unici, quindi è necessario sceglierne uno in base alle proprie preferenze. La diversità consente implementazioni in base alle diverse caratteristiche e al pubblico di utenti. È consigliabile scegliere un client in base a funzionalità, supporto, linguaggio di programmazione o licenze.

#### Go Ethereum {#geth}

Go Ethereum (abbreviato Geth) è una delle implementazioni originali del protocollo Ethereum. Attualmente, è il client più diffuso con la più grande base di utenti e varietà di strumenti per utenti e sviluppatori. È scritto in Go, completamente open source e concesso in licenza con GNU LGPL v3.

#### OpenEthereum {#openethereum}

OpenEthereum è un client Ethereum veloce, ricco di funzionalità e avanzato basato su CLI. È creato per assicurare fornire l'infrastruttura essenziale per servizi veloci e affidabili che richiedono una rapida sincronizzazione e massimi tempi di attività. L'obiettivo di OpenEthereum è quello di essere il client Ethereum più veloce, leggero e sicuro. Fornisce una base di codice pulita e modulare per:

- personalizzazione facile.
- integrazione leggera in servizi o prodotti.
- memoria e impronta di archiviazione minime.

OpenEthereum è sviluppato utilizzando l'innovativo linguaggio di programmazione Rust e concesso in licenza con GPLv3.

#### Nethermind {#nethermind}

Nethermind è un'implementazione di Ethereum creata con lo stack tecnologico C # .NET, in esecuzione su tutte le principali piattaforme, incluso ARM. Offre prestazioni eccellenti con:

- una macchina virtuale ottimizzata
- accesso allo stato
- networking e funzionalità avanzate come dashboard Prometheus/Graphana, supporto per la registrazione aziendale seq, tracciamento RPC JSON e plug-in di analisi.

Inoltre, Nethermind vanta una [documentazione dettagliata](https://docs.nethermind.io), un efficace supporto per gli sviluppatori, una community online e un supporto disponibile 7 giorni su 7, 24 ore al giorno per gli utenti premium.

#### Besu {#besu}

Hyperledger Besu è un client Ethereum di livello enterprise per reti pubbliche e autorizzate. Dispone di tutte le caratteristiche della rete Ethereum principale, dal tracciamento a GraphQL, assicura monitoraggio avanzato ed è supportato da ConsenSys, sia nei canali della community aperti che attraverso contratti di assistenza commerciali per le imprese. È scritto in Java con licenza Apache 2.0.

### Modalità di sincronizzazione {#sync-modes}

- Completa – scarica tutti i blocchi (comprese intestazioni, transazioni e ricevute) e genera lo stato della blockchain in modo incrementale eseguendo ogni blocco.
- Veloce (predefinita) – scarica tutti i blocchi (comprese intestazioni, transazioni e ricevute), verifica tutte le intestazioni, scarica lo stato e lo verifica in base alle intestazioni.
- Leggera – scarica tutte le intestazioni dei blocchi, i dati dei blocchi e ne verifica alcuni in modo casuale.
- Sincronizzazione Warp – ogni 5.000 blocchi, i nodi acquisiranno un'istantanea critica consensuale dello stato di quel blocco. Qualsiasi nodo può recuperare queste istantanee attraverso la rete, attivando una sincronizzazione veloce. [Ulteriori informazioni su Warp](https://openethereum.github.io/wiki/Warp-Sync-Snapshot-Format)
- Sincronizzazione Beam – modalità di sincronizzazione che consente maggiore velocità. Non richiede lunghe attese per la sincronizzazione, perché recupera i dati nel tempo. [Maggiori informazioni su Beam](https://medium.com/@jason.carver/intro-to-beam-sync-a0fd168be14a)
- Sincronizzazione delle intestazioni – è possibile utilizzare un checkpoint attendibile per iniziare la sincronizzazione da un'intestazione recente e quindi affidarsi a un processo in background per colmare le lacune nel tempo

Il tipo di sincronizzazione viene definito durante la configurazione, in questo modo:

**Impostazione della sincronizzazione leggera in [GETH](https://geth.ethereum.org/)**

`geth --syncmode "light"`

**Impostazione della sincronizzazione delle intestazioni in Trinity**

`trinity --sync-from-checkpoint eth://block/byhash/0xa65877df954e1ff2012473efee8287252eee956c0d395a5791f1103a950a1e21?score=15,835,269,727,022,672,760,774`

## Hardware {#hardware}

I requisiti hardware differiscono in base al client, ma in genere non sono così elevati dal momento che il nodo deve solo rimanere sincronizzato. Non va confuso con il mining, che invece richiede molta più potenza di calcolo. Il tempo di sincronizzazione e le prestazioni naturalmente migliorano con hardware più potente. A seconda delle esigenze e dei desideri, Ethereum può essere eseguita sul computer, su un server domestico, un computer a scheda singola o su server privati virtuali nel cloud.

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

A seconda di quale software e modalità di sincronizzazione si utilizzerà, sono necessarie centinaia di GB di spazio su disco. I numeri approssimativi e la crescita sono indicati di seguito.

| Client       | Dimensione disco (sincronizzazione veloce) | Dimensione disco (archivio completo) |
| ------------ | ------------------------------------------ | ------------------------------------ |
| Geth         | 400 GB+                                    | 4,7 TB+                              |
| OpenEthereum | 280 GB+                                    | 4,6 TB+                              |
| Nethermind   | 200 GB+                                    | 3 TB+                                |
| Besu         | 750 GB+                                    | 4 TB+                                |

![Grafico che mostra che i GB necessari per una sincronizzazione completa sono sempre di più](./full-sync.png)

![Grafico che mostra che i GB necessari per una sincronizzazione archivio sono sempre di più](./archive-sync.png)

Da questi grafici si capisce che i requisiti di archiviazione cambiano in continuazione. Per i dati più aggiornati per Geth e Parity, consulta i [dati per la sincronizzazione completa](https://etherscan.io/chartsync/chaindefault) e i [dati per la sincronizzazione archivio](https://etherscan.io/chartsync/chainarchive).

### Ethereum su un computer a scheda singola {#ethereum-on-a-single-board-computer}

Il modo più conveniente ed economico di eseguire un il nodo Ethereum è quello di utilizzare un computer a scheda singola con architettura ARM come Raspberry Pi. [Ethereum su ARM](https://twitter.com/EthereumOnARM) fornisce immagini di client Geth, Parity, Nethermind e Besu. Ecco un semplice tutorial che spiega come [come realizzare e configurare un client ARM](/en/developers/tutorials/run-node-raspberry-pi/).

Dispositivi piccoli, convenienti ed efficienti come questi sono ideali per eseguire un nodo a casa.

## Client Eth2 {#eth2-clients}

Ci sono nuovi client per supportare gli [upgrade a Eth2](/eth2/beacon-chain/). Eseguiranno la beacon chain e supporteranno il nuovo meccanismo di consenso [Proof of Stake](/developers/docs/consensus-mechanisms/pos/).

[Visualizza i clienti Eth2](/eth2/get-involved/#clients).

## Letture consigliate {#further-reading}

Ci sono moltissime istruzioni e informazioni sui client Ethereum in Internet, ne elenchiamo alcune che potrebbero essere utili.

- [Ethereum 101 - Part 2 - Understanding Nodes](https://kauri.io/ethereum-101-part-2-understanding-nodes/48d5098292fd4f11b251d1b1814f0bba/a) _– Wil Barnes, 13 February 2019_
- [Running Ethereum Full Nodes: A Guide for the Barely Motivated](https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _– Justin Leroux, 7 November 2019_
- [Running an Ethereum Node](https://docs.ethhub.io/using-ethereum/running-an-ethereum-node/) _– ETHHub, updated often_
- [Analyzing the hardware requirements to be an Ethereum full validated node](https://medium.com/coinmonks/analyzing-the-hardware-requirements-to-be-an-ethereum-full-validated-node-dc064f167902) _– Albert Palau, 24 September 2018_
- [Running a Hyperledger Besu Node on the Ethereum Mainnet: Benefits, Requirements, and Setup](https://pegasys.tech/running-a-hyperledger-besu-node-on-the-ethereum-mainnet-benefits-requirements-and-setup/) _– Felipe Faraggi, 7 May 2020_

## Argomenti correlati {#related-topics}

- [Blocchi](/en/developers/docs/blocks/)
- [Reti](/en/developers/docs/networks/)

## Tutorial correlati {#related-tutorials}

- [Running a Node with Geth](/developers/tutorials/run-light-node-geth/) _– Come scaricare, installare ed eseguire Geth. Si parla di modalità di sincronizzazione, console Javascript e altro._
- [Turn your Raspberry Pi 4 into an Eth 1.0 or Eth 2.0 node just by flashing the MicroSD card – Installation guide](/developers/tutorials/run-node-raspberry-pi/) _– Esegui il flashing del tuo Raspberry Pi 4, collega un cavo Ethernet, collega il disco SSD e accendi il dispositivo per trasformare il Raspberry Pi 4 in un nodo Ethereum 1.0 completo o in un nodo Ethereum 2.0 (beacon chain/validatore)._
