---
title: Nodi e client
description: Panoramica dei nodi Ethereum e del software client, come configurare un nodo e perché farlo.
lang: it
sidebarDepth: 2
---

Ethereum è una rete distribuita di computer (noti come nodi) che eseguono software che possono verificare i blocchi e i dati delle transazioni. Per fare del tuo computer un nodo di Ethereum deve essere eseguita l'applicazione software, detta client.

**Nota: non è più possibile eseguire un client di esecuzione da solo. Dopo [La Fusione](/roadmap/merge), sia il client di esecuzione sia quello di consenso devono essere eseguiti insieme perché un utente possa ottenere accesso alla rete di Ethereum.**

## Prerequisiti {#prerequisites}

Prima di approfondire ed eseguire la tua istanza di un client Ethereum dovresti comprendere il concetto di rete peer-to-peer e le [basi dell'EVM](/developers/docs/evm/). Consulta la nostra [introduzione a Ethereum](/developers/docs/intro-to-ethereum/).

Se sei nuovo al tema dei nodi, consigliamo di leggere prima la nostra introduzione user-friendly su come [eseguire un nodo di Ethereum](/run-a-node).

## Che cosa sono i nodi e i client? {#what-are-nodes-and-clients}

Un "nodo" è qualsiasi istanza del software del client di Ethereum connessa ad altri computer che stanno anch'essi eseguendo il software di Ethereum, così da formare una rete. Un client è un'implementazione di Ethereum che verifica i dati rispetto alle regole del protocollo e mantiene sicura la rete.

L'Ethereum post-Fusione consiste in due parti: il livello di esecuzione e il livello di consenso. I due livelli sono eseguiti da software del client differenti. In questa pagina, faremo loro riferimento come client di esecuzione e client di consenso.

- Il client di esecuzione (noto anche come il Motore di Esecuzione, client EL o, precedentemente, client di Eth1) attende le nuove transazioni trasmesse nella rete, le esegue nell'EVM e detiene l'ultimo stato e database di tutti i dati correnti di Ethereum.
- Il client di consenso (noto anche come il Nodo Beacon, client CL o, precedentemente, client di Eth2) implementa l'algoritmo di consenso di Proof of Stake, che consente alla rete di raggiungere l'accordo secondo i dati validati dal client di esecuzione.

Prima de [La Fusione](/roadmap/merge/), i livelli di consenso e di esecuzione erano reti separate, con tutte le transazioni e le attività degli utenti su Ethereum che si verificavano dove ora si trova il livello di esecuzione. Un software del client forniva sia l'ambiente di esecuzione che la verifica del consenso dei blocchi prodotti dai miner. Il livello di consenso, [la Beacon Chain](/roadmap/beacon-chain/), è stato eseguito separatamente da dicembre 2020. Ha introdotto il Proof of Stake e coordinato la rete di validatori sulla base dei dati dalla rete Ethereum.

Con la Fusione, Ethereum è passata al Proof of Stake connettendo queste reti. I client di esecuzione e di consenso collaborano per verificare lo stato di Ethereum.

Il design modulare con vari pezzi di software che lavorano insieme è detto [complessità incapsulata](https://vitalik.ca/general/2022/02/28/complexity.html). Questo approccio semplifica l'esecuzione perfetta della Fusione e consente il riutilizzo di singoli client, ad esempio, nell'[ecosistema del livello 2](/layer-2/).

![Client di esecuzione e consenso accoppiati](./eth1eth2client.png) Diagramma semplificato di un client di esecuzione e uno di consenso accoppiati.

### Diversità dei client {#client-diversity}

Sia i [client di esecuzione](/developers/docs/nodes-and-clients/#execution-clients) che i [client di consenso](/developers/docs/nodes-and-clients/#consensus-clients) esistono in numerosi linguaggi di programmazione sviluppati da diversi team.

Diverse implementazioni del client possono rafforzare la rete, riducendone la dipendenza da un'unica base di codice. L'obiettivo ideale è raggiungere la diversità senza che nessun client domini la rete, eliminando così eventuali un potenziale punto di errore singolo. La varietà di linguaggi invita inoltre una community di sviluppatori più ampia e consente loro di creare integrazioni nel loro linguaggio preferito.

Scopri di più sulla [diversità del client](/developers/docs/nodes-and-clients/client-diversity/).

Queste implementazioni hanno in comune il fatto di seguire una specifica unica che determina come funziona la rete Ethereum e la blockchain. Ogni dettaglio tecnico è definito e le specifiche si possono trovare come:

- In origine, lo [Yellow Paper di Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf)
- [Specifiche di esecuzione](https://github.com/ethereum/execution-specs/)
- [Specifiche di consenso](https://github.com/ethereum/consensus-specs)
- [EIP](https://eips.ethereum.org/) implementati in vari [aggiornamenti di rete](/history/)

### Monitorare i nodi nella rete {#network-overview}

Diversi tracker offrono una panoramica in tempo reale dei nodi nella rete Ethereum. Si noti che a causa della natura delle reti decentralizzate, questi crawler possono fornire solo una vista limitata della rete e potrebbero riportare risultati differenti.

- [Mappa dei nodi](https://etherscan.io/nodetracker) di Etherscan
- [Ethernodes](https://ethernodes.org/) di Bitfly
- [Crawler dei Nodi di Ethereum](https://crawler.ethereum.org/)
- [Nodewatch](https://www.nodewatch.io/) di Chainsafe, crawling dei nodi di consenso

## Tipologie di nodo {#node-types}

Se desideri [eseguire il tuo nodo](/developers/docs/nodes-and-clients/run-a-node/), dovresti capire che ne esistono di diversi tipi che consumano i dati in maniera diversa. I client possono eseguire tre diversi tipi di nodi: leggero, completo e archivio. Esistono anche diverse strategie di sincronizzazione per velocizzare i tempi. La sincronizzazione è la velocità con cui si ottengono le informazioni più aggiornate sullo stato di Ethereum.

### Nodo completo {#full-node}

- Memorizza i dati completi della blockchain (sebbene siano periodicamente ridotti così che un nodo completo non memorizzi tutti i dati dalla genesi)
- Partecipa alla convalida dei blocchi, verifica tutti i blocchi e gli stati.
- Tutti gli stati possono essere derivati da un nodo completo (sebbene gli stati molto vecchi siano ricostruiti a partire dalle richieste effettuate ai nodi di archivio).
- È al servizio della rete e fornisce dati su richiesta.

### Nodo leggero {#light-node}

Invece di scaricare ogni blocco, i nodi leggeri scaricano le intestazioni dei blocchi. Queste contengono solo le informazioni sommarie sui contenuti dei blocchi. Ogni altra informazione richiesta dal nodo leggero viene richiesta dal nodo completo. Il nodo leggero può quindi verificare in modo indipendente i dati che riceve rispetto alle radici di stato nelle intestazioni dei blocchi. I nodi leggeri consentono agli utenti di partecipare alla rete Ethereum senza l'hardware potente o l'elevata larghezza di banda necessari per eseguire i nodi completi. Infine, i nodi leggeri potrebbero funzionare su telefoni cellulari o dispositivi embedded. I nodi leggeri non partecipano al consenso (es. non possono essere validatori/miner), ma possono accedere alla blockchain di Ethereum con la stessa sicurezza e avendo le stesse funzioni garantite ai nodi completi.

I client leggeri sono un'area di sviluppo attivo per Ethereum, e ci aspettiamo presto di vedere nuovi client leggeri per i livelli di consenso e i livelli di esecuzione. Esistono anche dei percorsi potenziali per fornire i dati dei client leggeri sulla [rete di gossip](https://www.ethportal.net/). Questi sono vantaggiosi perché la rete di gossip potrebbe supportare una rete di nodi leggeri senza richiedere ai nodi completi di rispondere alle richieste.

Ethereum non supporta ancora una grande popolazione di nodi leggeri, ma il supporto dei nodi leggeri è un'area in cui si prevede uno sviluppo rapido nel futuro più prossimo. In particolare, client come [Nimbus](https://nimbus.team/), [Helios](https://github.com/a16z/helios), and [LodeStar](https://lodestar.chainsafe.io/) sono attualmente fortemente focalizzati sui nodi leggeri.

### Nodo archivio {#archive-node}

- Memorizza tutto ciò che è presente nel nodo completo e crea un archivio degli stati storici. È necessario se desideri consultare qualcosa come il saldo di un conto al blocco #4.000.000 o testare in modo semplice e affidabile le tue serie di transazioni, senza minarle usando il tracciamento.
- Si tratta di terabyte e terabyte di dati, che rendono i nodi archivio meno attraenti per gli utenti medi, ma possono essere utili per servizi come block explorer, fornitori di portafogli e analisi della catena.

La sincronizzazione dei client in qualsiasi modalità diversa dall'archivio comporterà l'eliminazione dei dati della blockchain. Ciò significa che non rimarrà un archivio di tutti gli stati storici, ma il nodo completo è in grado di ricostruirli su richiesta.

Scopri di più sui [Nodi archivio](/developers/docs/nodes-and-clients/archive-nodes).

## Perché si dovrebbe eseguire un nodo Ethereum? {#why-should-i-run-an-ethereum-node}

L'esecuzione di un nodo consente di utilizzare Ethereum in modo diretto, senza fiducia e privato, supportando la rete tenendola più solida e decentralizzata.

### Vantaggi per lo sviluppatore {#benefits-to-you}

Eseguire un nodo permette di utilizzare Ethereum in modo privato, autosufficiente e senza fiducia. Non è necessario affidarsi alla rete perché è possibile verificare i dati da soli con il proprio client. "Non fidarti, verifica" è un popolare mantra della blockchain.

- Il nodo verifica in autonomia tutte le transazioni e i blocchi in base alle regole del consenso. Significa che non si deve fare affidamento su altri nodi della rete né fidarti completamente di loro.
- Puoi usare un portafoglio Ethereum col tuo nodo. Puoi usare le dapp con maggiore sicurezza e privacy, perché non dovrai comunicare i tuoi indirizzi e saldi a nodi casuali. Tutto può essere controllato con il tuo client. [MetaMask](https://metamask.io), [Frame](https://frame.sh/)e [molti altri portafogli](/wallets/find-wallet/) offrono l'importazione RPC, consentendo loro di usare il tuo nodo.
- Puoi eseguire e hostare tu stesso altri servizi che dipendono dai dati provenienti da Ethereum. Ad esempio, questi potrebbero essere un validatore della Beacon Chain, software come il livello 2, infrastruttura, block explorer, società di servizi di pagamento, ecc.
- Puoi fornire i tuoi [endpoint RPC](/developers/docs/apis/json-rpc/) personalizzati. L'endpoint di Ethereum ospitato pubblicamente per la community o persino privatamente, consente alle persone di usare il tuo nodo ed evitare i grandi fornitori centralizzati.
- Puoi connetterti al tuo nodo usando le **Comunicazioni interprecessuali (IPC)** o riscrivere il nodo per caricare il tuo programma come plugin. Ciò conferisce una bassa latenza, il che aiuta molto ad esempio quando si elaborano molti dati usando le librerie web3 o quando ti serve sostituire le tue transazioni il più velocemente possibile (frontrunning).
- Puoi mettere ETH direttamente in staking per proteggere la rete e guadagnare ricompense. Per iniziare, vedi lo [staking in autonomia](/staking/solo/).

![Come accedere a Ethereum tramite un'applicazione e i nodi](./nodes.png)

### Vantaggi per la rete {#network-benefits}

Avere una serie diversificata di nodi è importante per l'integrità, la sicurezza e la resilienza operativa di Ethereum.

- I nodi completi applicano le regole di consenso e quindi non possono essere ingannati ad accettare blocchi che non li seguono. Questo fornisce ulteriore sicurezza nella rete, perché se tutti i nodi fossero leggeri, cioè non effettuassero una verifica completa, i validatori potrebbero attaccare la rete.
- Nel caso di un attacco che superi le difese cripto-economiche del [Proof of Stake](/developers/docs/consensus-mechanisms/pos/#what-is-pos), può essere eseguito un recupero sociale dai nodi completi che scelgono di seguire la catena onesta.
- Più nodi sulla rete risultano in una rete più diversificata e robusta, l'obiettivo ultimo della decentralizzazione, che consente un sistema resistente alla censura e affidabile.
- I nodi forniscono accesso ai dati della blockchain per i client leggeri che dipendono da essa. In caso di picchi di utilizzo, per agevolare la sincronizzazione dei nodi leggeri, è necessario che i nodi completi siano in quantità sufficiente. I nodi leggeri non memorizzano l'intera blockchain, bensì verificano i dati attraverso le [radici di stato nelle intestazioni dei blocchi](/developers/docs/blocks/#block-anatomy). Se ne hanno bisogno, possono richiedere ulteriori informazioni ai blocchi.

Se si esegue un nodo completo, l'intera rete di Ethereum ne beneficia.

## Esecuzione di un nodo proprio {#running-your-own-node}

Vorresti eseguire il tuo client di Ethereum?

Per un'introduzione per i principianti, visita la nostra pagina [Eseguire un nodo](/run-a-node) per saperne di più.

Se sei un utente più tecnico, approfondisci i dettagli e le opzioni su come [Avviare il tuo nodo](/developers/docs/nodes-and-clients/run-a-node/).

## Alternative {#alternatives}

Configurare un nodo può richiedere tempo e risorse e non sempre è necessario eseguire un'istanza propria. In questo caso, puoi usare un provider di API terzo. Per una panoramica sull'uso di questi servizi, dai un'occhiata a [nodi come servizi](/developers/docs/nodes-and-clients/nodes-as-a-service/).

Se qualcuno esegue un nodo Ethereum con un'API pubblica nella tua community, puoi puntare i tuoi portafogli a un nodo della community tramite RPC personalizzato e ottenere più privacy rispetto a terze parti fidate casuali.

D'altro canto, se esegui un client, puoi condividerlo con gli amici che potrebbero averne bisogno.

## Client d'esecuzione (ex "client di Eth1") {#execution-clients}

La community di Ethereum mantiene numerosi client di esecuzione open source (precedentemente noti come 'client di Eth1' o semplicemente 'client di Ethereum'), sviluppati da diversi team usando diversi linguaggi di programmazione. Questo rafforza la rete e la rende più [diversificata](/developers/docs/nodes-and-clients/client-diversity/). L'obiettivo ideale è raggiungere la diversità senza che nessun client prevalga, per ridurre eventuali punti di errore unici.

Questa tabella riepiloga i diversi client. Tutti superano i [test dei client](https://github.com/ethereum/tests) e sono mantenuti attivamente per rimanere al passo con gli aggiornamenti di rete.

| Client                                          | Linguaggio | Sistemi operativi     | Reti                                     | Strategie di sincronizzazione          | Cancellazione dello stato |
| ----------------------------------------------- | ---------- | --------------------- | ---------------------------------------- | -------------------------------------- | ------------------------- |
| [Geth](https://geth.ethereum.org/)              | Vai        | Linux, Windows, macOS | Rete Principale, Sepolia, Goerli         | Snap, Completa                         | Archiviata, Tagliata      |
| [Nethermind](http://nethermind.io/)             | C#, .NET   | Linux, Windows, macOS | Rete Principale, Sepolia, Goerli e altre | Snap (senza servire), Rapida, Completa | Archiviata, Tagliata      |
| [Besu](https://besu.hyperledger.org/en/stable/) | Java       | Linux, Windows, macOS | Rete Principale, Sepolia, Goerli e altre | Snap, Veloce, Completo                 | Archiviata, Tagliata      |
| [Erigon](https://github.com/ledgerwatch/erigon) | Go         | Linux, Windows, macOS | Rete Principale, Sepolia, Goerli e altre | Completa                               | Archiviata, Tagliata      |

**Sottolineiamo che OpenEthereum [è ormai obsoleto](https://medium.com/openethereum/gnosis-joins-erigon-formerly-turbo-geth-to-release-next-gen-ethereum-client-c6708dd06dd) e non viene più mantenuto.** Usa un'altra implementazione client!

Per ulteriori informazioni sulle reti supportate, consulta [reti Ethereum](/developers/docs/networks/).

Ogni client ha vantaggi e casi d'uso differenti, quindi è necessario sceglierne uno in base alle proprie preferenze. La diversità consente implementazioni in base alle diverse caratteristiche e al pubblico di utenti. Potresti voler scegliere un client a seconda delle funzionalità, del supporto, del linguaggio di programmazione o delle licenze.

### Besu {#besu}

Hyperledger Besu è un client Ethereum di livello enterprise per le reti pubbliche e autorizzate. Esegue tutte le funzionalità della Rete principale di Ethereum, dal monitoraggio a GraphQL, ha un monitoraggio avanzato ed è supportato da ConsensSys, entrambi in canali aperti della community e tramite SLA commerciali per le imprese. È scritto in Java con licenza Apache 2.0.

L'ampia [documentazione](https://besu.hyperledger.org/en/stable/) di Besu ti guiderà per tutti i dettagli sulle sue funzionalità e configurazioni.

### Erigon {#erigon}

Erigon, precedentemente noto come Turbo-Geth, è nato come una diramazione di Go Ethereum orientata alla velocità e all'efficienza dello spazio su disco. Erigon è un'implementazione completamente riprogettata di Ethereum, correntemente scritta in Go, ma con implementazioni in altri linguaggi in via di sviluppo. L'obiettivo di Erigon è fornire un'implementazione più veloce, modulare e ottimizzata di Ethereum. Può eseguire una sincronizzazione completa del nodo archivio usando circa 2TB di spazio su disco, in meno di 3 giorni.

### Go Ethereum {#geth}

Go Ethereum (abbreviato Geth) è una delle implementazioni originali del protocollo Ethereum. Attualmente, è il client più diffuso con la più grande base di utenti e varietà di strumenti per utenti e sviluppatori. È scritto in Go, completamente open source e concesso in licenza con GNU LGPL v3.

Scopri di più su Geth nella sua [documentazione](https://geth.ethereum.org/docs/).

### Nethermind {#nethermind}

Nethermind è un'implementazione di Ethereum creata con lo stack tecnologico C#.NET, concessa in licenza con LGPL-3.0, in esecuzione su tutte le principali piattaforme inclusa ARM. Offre prestazioni eccellenti con:

- una macchina virtuale ottimizzata
- accesso allo stato
- networking e funzionalità avanzate come dashboard Prometheus/Graphana, supporto per la registrazione aziendale seq, tracciamento RPC JSON e plug-in di analisi.

Inoltre, Nethermind vanta una [documentazione dettagliata](https://docs.nethermind.io), un efficace supporto per gli sviluppatori, una community online e un supporto disponibile 24 ore al giorno, 7 giorni su 7 per gli utenti premium.

## Client di consenso (ex client di "Eth2") {#consensus-clients}

Esistono diversi client di consenso (precedentemente noti come client di "Eth2") per supportare gli [aggiornamenti del consenso](/roadmap/beacon-chain/). Eseguono la Beacon Chain e forniranno il meccanismo di consenso proof-of-stake ai client di esecuzione, dopo [La Fusione](/roadmap/merge/).

| Client                                                        | Lingua     | Sistemi operativi     | Reti                                                            |
| ------------------------------------------------------------- | ---------- | --------------------- | --------------------------------------------------------------- |
| [Lighthouse](https://lighthouse.sigmaprime.io/)               | Rust       | Linux, Windows, macOS | Beacon Chain, Goerli, Pyrmont, Sepolia, Ropsten e altre         |
| [Lodestar](https://lodestar.chainsafe.io/)                    | TypeScript | Linux, Windows, macOS | Beacon Chain, Goerli, Sepolia, Ropsten e altre                  |
| [Nimbus](https://nimbus.team/)                                | Nim        | Linux, Windows, macOS | Beacon Chain, Goerli, Sepolia, Ropsten e altre                  |
| [Prysm](https://docs.prylabs.network/docs/getting-started/)   | Go         | Linux, Windows, macOS | Beacon Chain, Gnosis, Goerli, Pyrmont, Sepolia, Ropsten e altre |
| [Teku](https://consensys.net/knowledge-base/ethereum-2/teku/) | Java       | Linux, Windows, macOS | Beacon Chain, Gnosis, Goerli, Sepolia, Ropsten e altre          |

### Lighthouse {#lighthouse}

Lighthouse è un'implementazione del client di consenso scritta in Rust sotto la licenza Apache-2.0. È mantenuta da Sigma Prime ed è stabile e pronta alla produzione sin dalla genesi della Beacon Chain. È affidata a varie imprese, pool di staking e singoli individui. Mira a esser sicura, performante e interoperabile in una vasta gamma di ambienti, da PC desktop a distribuzioni automatizzate sofisticate.

La documentazione è consultabile nel [Libro su Lighthouse](https://lighthouse-book.sigmaprime.io/)

### Lodestar {#lodestar}

Lodestar è un'implementazione del client di consenso pronta alla produzione, scritta in Typescript sotto la licenza LGPL-3.0. È mantenuta da ChainSafe Systems ed è il più nuovo dei client di consenso per gli staker in autonomia, gli sviluppatori e i ricercatori. Lodestar consiste in un nodo beacon e un client del validatore, alimentato dalle implementazioni in JavaScript dei protocolli di Ethereum. Lodestar mira a migliorare l'utilizzabilità di Ethereum con client leggeri, espandere l'accessibilità a un gruppo più ampio di sviluppatori e contribuire ulteriormente alla diversità dell'ecosistema.

Maggiori informazioni si possono trovare sul nostro [sito web di Lodestar](https://lodestar.chainsafe.io/)

### Nimbus {#nimbus}

Nimbus è un'implementazione del client di consenso scritta in Nim sotto la licenza Apache-2.0. È un client pronto alla produzione in uso dagli staker in autonomia e dai pool di staking. Nimbus è progettato per l'efficienza delle risorse, rendendo facile l'esecuzione sui dispositivi con risorse limitate e le infrastrutture aziendali con uguale facilità, senza compromettere la stabilità o ricompensare le prestazioni. Un'impronta di risorse più leggera fa sì che il client abbia un maggiore margine di sicurezza quando la rete è sotto stress.

Implementato da Trinity. Funziona come una sincronizzazione rapida ma scarica anche i dati necessari per eseguire gli ultimi blocchi, consentendo di interrogare la catena già nei primi minuti dall'inizio.

- Sincronizza innanzitutto lo stato e consente di interrogare RPC in pochi minuti.
- Ancora in sviluppo e non totalmente affidabile, la sincronizzazione in background è rallentata e le risposte RPC potrebbero fallire.

Scopri di più nella [documentazione di Nimbus](https://nimbus.guide/)

### Prysm {#prysm}

Prysm è un client di consenso completo e open source scritto in Go sotto la licenza GPL-3.0. Dispone di un'UI webapp facoltativa e da' priorità all'esperienza dell'utente, alla documentazione e alla configurabilità sia per gli utenti di staking domestico che per quelli istituzionali.

Visita la [documentazione di Prysm](https://docs.prylabs.network/docs/getting-started/) per maggiori informazioni.

### Teku {#teku}

Teku è uno dei client di genesi originali della Beacon Chain. Insieme ai soliti obiettivi (sicurezza, robustezza, stabilità, utilizzabilità, prestazioni), Teku mira specificamente a conformarsi completamente a tutti i vari standard dei client di consenso.

Teku offre opzioni di distribuzione molto flessibili. Il nodo beacon e il client del validatore possono operare insieme come un singolo processo, il che è estremamente conveniente per gli staker in autonomia, o i nodi possono operare separatamente per le operazioni di staking sofisticate. Inoltre, Teku è completamente interoperabile con [Web3Signer](https://github.com/ConsenSys/web3signer/) per firmare la sicurezza della chiave e la protezione dallo slashing.

Teku è scritto in Java con licenza Apache 2.0. È sviluppato dal team Protocols di ConsenSys, responsabile anche di Besu e Web3Signer. Scopri di più nella [documentazione di Teku](https://docs.teku.consensys.net/en/latest/).

## Modalità di sincronizzazione {#sync-modes}

Per seguire e verificare i dati correnti nella rete, il client di Ethereum deve essere sincronizzato con l'ultimo stato della rete. Ciò avviene scaricando i dati dai pari, verificandone crittograficamente l'integrità e creando un database locale della blockchain.

Le modalità di sincronizzazione rappresentano diversi approcci a questo processo, con vari compromessi. I client variano anche nella loro implementazione degli algoritmi di sincronizzazione. Fai sempre riferimento alla documentazione ufficiale del client scelto per le specifiche sull'implementazione.

### Modalità di sincronizzazione del livello di esecuzione {#execution-layer-sync-modes}

#### Sincronizzazione completa {#full-sync}

La sincronizzazione completa scarica tutti i blocchi (incluse intestazioni, transazioni e ricevute) e genera lo stato della blockchain in modo incrementale eseguendo ogni blocco a partire dalla genesi.

- Riduce al minimo la fiducia e offre la massima sicurezza verificando ogni transazione.
- Al crescere del numero di transazioni, possono volerci giorni o persino settimane per elaborare tutte le transazioni.

#### Sincronizzazione rapida {#fast-sync}

La sincronizzazione rapida scarica tutti i blocchi (incluse intestazioni, transazioni e ricevute), verifica tutte le intestazioni, scarica lo stato e lo verifica rispetto alle intestazioni.

- Si basa sulla sicurezza del meccanismo di consenso.
- La sincronizzazione impiega solo qualche ora.

#### Sincronizzazione leggera {#light-sync}

La modalità leggera del client scarica tutte le intestazioni e i dati del blocco e ne verifica alcuni casualmente. Sincronizza solo la punta della catena dal punto di controllo attendibile.

- Ottiene solo l'ultimo stato basandosi sulla fiducia negli sviluppatori e nel meccanismo di consenso.
- Client pronto all'uso con lo stato corrente della rete in pochi minuti.

**NB** La sincronizzazione leggera non funziona ancora con Ethereum proof-of-stake - una nuova versione verrà rilasciata presto!

[Maggiori informazioni sui client leggeri](/developers/docs/nodes-and-clients/light-clients/)

#### Sincronizzazione snap {#snap-sync}

La sincronizzazione snap è l'ultimo approccio per sincronizzare un client, sperimentato dal team di Geth. Usando le istantanee dinamiche fornite dai pari, recupera tutti i dati di conti e archivi senza scaricare nodi trie intermedi e ricostruisce localmente il Merkle trie.

- È la strategia di sincronizzazione più veloce, attualmente quella predefinita nella rete principale di Ethereum
- Risparmia molto spazio su disco e larghezza di banda di rete senza sacrificare la sicurezza

[Maggiori informazioni sulla sincronizzazione snap](https://github.com/ethereum/devp2p/blob/master/caps/snap.md)

### Modalità di sincronizzazione del livello di consenso {#consensus-layer-sync-modes}

#### Sincronizzazione ottimistica {#optimistic-sync}

La sincronizzazione ottimistica è una strategia di sincronizzazione successiva alla Fusione, progettata per essere ad accettazione e retrocompatibile, consentendo ai nodi di esecuzione di sincronizzarsi tramite metodi stabiliti. Il motore di esecuzione può importare _ottimisticamente_ i blocchi beacon senza verificarli completamente, trovare l'ultima testa e, poi, avviare la sincronizzazione della catena coi suddetti metodi. Poi, dopo essersi rimesso in pari, il client di esecuzione informerà il client di consenso della validità delle transazioni nella Beacon Chain.

[Maggiori informazioni sulla sincronizzazione ottimistica](https://github.com/ethereum/consensus-specs/blob/dev/sync/optimistic.md)

#### Sincronizzazione del punto di controllo {#checkpoint-sync}

La sincronizzazione del punto di controllo, anche nota come sincronizzazione a soggettività debole, crea un'esperienza utente superiore per la sincronizzazione del Nodo Beacon. Si basa sulle ipotesi di [soggettività debole](/developers/docs/consensus-mechanisms/pos/weak-subjectivity/) che consentono di sincronizzare la Beacon Chain da un punto di controllo a soggettività debole recente invece che dalla genesi. La sincronizzazione del punto di controllo rende significativamente più breve il tempo di sincronizzazione iniziale, con ipotesi di fiducia simili a quelli della sincronizzazione dalla [genesi](/glossary/#genesis-block).

In pratica, ciò significa che il tuo nodo si connette a un servizio remoto per scaricare gli stati finalizzati di recente e continua a verificare i dati da quel punto. Le terze parti che forniscono i dati sono affidabili e dovrebbero essere selezionate attentamente.

Maggiori informazioni sulla [sincronizzazione del punto di controllo](https://notes.ethereum.org/@djrtwo/ws-sync-in-practice)

## Letture consigliate {#further-reading}

Su internet si trovano molte informazioni sui client Ethereum. Ecco alcune risorse che potrebbero essere utili.

- [Ethereum 101 - Parte 2 - Comprendere i nodi](https://kauri.io/ethereum-101-part-2-understanding-nodes/48d5098292fd4f11b251d1b1814f0bba/a) _– Wil Barnes, 13 febbraio 2019_
- [Eseguire i nodi completi di Ethereum: una guida per i poco motivati](https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _– Justin Leroux, 7 novembre 2019_

## Argomenti correlati {#related-topics}

- [Blocchi](/developers/docs/blocks/)
- [Reti](/developers/docs/networks/)

## Tutorial correlati {#related-tutorials}

- [Trasforma il tuo Raspberry Pi 4 in un nodo validatore semplicemente eseguendo il flash della scheda MicroSD - Guida d'installazione](/developers/tutorials/run-node-raspberry-pi/) _ - Esegui il flash del tuo Raspberry Pi 4, collega un cavo Ethernet, connetti il disco SSD e alimenta il dispositivo per trasformare il Raspberry Pi 4 in un nodo completo di Ethereum eseguendo il livello di esecuzione (Rete principale) e/o il livello di consenso (Beacon Chain / validatore)._
