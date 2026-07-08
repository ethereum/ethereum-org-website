---
title: Il Portal Network
description: "Una panoramica del Portal Network: una rete in fase di sviluppo progettata per supportare i client con poche risorse."
lang: it
---

[Ethereum](/) è una rete composta da computer che eseguono il software client di Ethereum. Ognuno di questi computer è chiamato "nodo". Il software client consente a un nodo di inviare e ricevere dati sulla rete Ethereum e verifica i dati in base alle regole del protocollo Ethereum. I nodi conservano molti dati storici nella memoria del proprio disco e li integrano quando ricevono nuovi pacchetti di informazioni, noti come blocchi, da altri nodi sulla rete. Ciò è necessario per verificare sempre che un nodo disponga di informazioni coerenti con il resto della rete. Questo significa che l'esecuzione di un nodo può richiedere molto spazio su disco. Anche alcune operazioni del nodo possono richiedere molta RAM.

Per aggirare questo problema di archiviazione su disco, sono stati sviluppati dei nodi "leggeri" (light node) che richiedono informazioni ai nodi completi invece di archiviarle tutte da soli. Tuttavia, questo significa che il nodo leggero non verifica le informazioni in modo indipendente e si fida invece di un altro nodo. Significa anche che ai nodi completi è richiesto di farsi carico di lavoro extra per servire quei nodi leggeri.

Il Portal Network è un nuovo design di rete per Ethereum che mira a risolvere il problema della disponibilità dei dati per i nodi "leggeri" senza dover fare affidamento o mettere a dura prova i nodi completi, condividendo i dati necessari in piccoli frammenti attraverso la rete.

Maggiori informazioni su [nodi e client](/developers/docs/nodes-and-clients/)

## Perché abbiamo bisogno del Portal Network {#why-do-we-need-portal-network}

I nodi di Ethereum archiviano la propria copia completa o parziale della blockchain di Ethereum. Questa copia locale viene utilizzata per convalidare le transazioni e garantire che il nodo stia seguendo la catena corretta. Questi dati archiviati localmente consentono ai nodi di verificare in modo indipendente che i dati in entrata siano validi e corretti senza dover fare affidamento su nessun'altra entità.

Questa copia locale della blockchain e i dati associati allo stato e alle ricevute occupano molto spazio sul disco rigido del nodo. Ad esempio, si consiglia un disco rigido da 2 TB per eseguire un nodo utilizzando [Geth](https://geth.ethereum.org) associato a un client di consenso. Utilizzando la sincronizzazione snap (snap sync), che archivia solo i dati della catena da un insieme di blocchi relativamente recente, Geth occupa in genere circa 650 GB di spazio su disco, ma cresce di circa 14 GB a settimana (è possibile sfoltire periodicamente il nodo per riportarlo a 650 GB).

Questo significa che l'esecuzione dei nodi può essere costosa, perché una grande quantità di spazio su disco deve essere dedicata a Ethereum. Ci sono diverse soluzioni a questo problema nella roadmap di Ethereum, tra cui la [scadenza della cronologia](/roadmap/statelessness/#history-expiry), la [scadenza dello stato](/roadmap/statelessness/#state-expiry) e l'[assenza di stato](/roadmap/statelessness/). Tuttavia, è probabile che manchino ancora diversi anni alla loro implementazione. Ci sono anche i [nodi leggeri](/developers/docs/nodes-and-clients/light-clients/) che non salvano la propria copia dei dati della catena, ma richiedono i dati di cui hanno bisogno ai nodi completi. Tuttavia, questo significa che i nodi leggeri devono fidarsi dei nodi completi affinché forniscano dati onesti e, inoltre, mette sotto stress i nodi completi che devono servire i dati di cui i nodi leggeri hanno bisogno.

Il Portal Network mira a fornire un modo alternativo ai nodi leggeri per ottenere i propri dati che non richieda di fidarsi o di aumentare in modo significativo il lavoro che deve essere svolto dai nodi completi. Il modo in cui ciò verrà fatto è introdurre un nuovo modo per i nodi di Ethereum di condividere i dati attraverso la rete.

## Come funziona il Portal Network? {#how-does-portal-network-work}

I nodi di Ethereum hanno protocolli rigorosi che definiscono come comunicano tra loro. I client di esecuzione comunicano utilizzando un insieme di sottoprotocolli noti come [DevP2P](/developers/docs/networking-layer/#devp2p), mentre i client di consenso utilizzano uno stack diverso di sottoprotocolli chiamato [libP2P](/developers/docs/networking-layer/#libp2p). Questi definiscono i tipi di dati che possono essere passati tra i nodi.

![devP2P and libP2P](portal-network-devp2p-libp2p.png)

I nodi possono anche servire dati specifici tramite l'[API JSON-RPC](/developers/docs/apis/json-rpc/), che è il modo in cui le app e i portafogli scambiano informazioni con i nodi di Ethereum. Tuttavia, nessuno di questi è un protocollo ideale per servire dati ai client leggeri.

Attualmente i client leggeri non possono richiedere parti specifiche di dati della catena tramite DevP2P o libP2p perché quei protocolli sono progettati solo per consentire la sincronizzazione della catena e il gossip di blocchi e transazioni. I client leggeri non vogliono scaricare queste informazioni perché ciò impedirebbe loro di essere "leggeri".

Nemmeno l'API JSON-RPC è una scelta ideale per le richieste di dati dei client leggeri, perché si basa su una connessione a un nodo completo specifico o a un provider RPC centralizzato che può servire i dati. Questo significa che il client leggero deve fidarsi che quel nodo/provider specifico sia onesto e, inoltre, il nodo completo potrebbe dover gestire molte richieste da molti client leggeri, aumentando i propri requisiti di larghezza di banda.

Lo scopo del Portal Network è ripensare l'intero design, costruendo specificamente per la leggerezza, al di fuori dei vincoli di progettazione dei client di Ethereum esistenti.

L'idea centrale del Portal Network è prendere le parti migliori dell'attuale stack di rete consentendo alle informazioni necessarie ai client leggeri, come i dati storici e l'identità dell'attuale testa della catena, di essere servite attraverso una rete decentralizzata peer-to-peer leggera in stile DevP2P utilizzando una [DHT](https://en.wikipedia.org/wiki/Distributed_hash_table) (simile a BitTorrent).

L'idea è di aggiungere a ciascun nodo piccole parti dei dati storici totali di Ethereum e alcune responsabilità specifiche del nodo. Quindi, le richieste vengono servite cercando i nodi che archiviano i dati specifici richiesti e recuperandoli da essi.

Questo inverte il normale modello dei nodi leggeri che trovano un singolo nodo e gli richiedono di filtrare e servire grandi volumi di dati; invece, filtrano rapidamente una grande rete di nodi che gestiscono ciascuno piccole quantità di dati.

L'obiettivo è consentire a una rete decentralizzata di client Portal leggeri di:

- tracciare la testa della catena
- sincronizzare i dati recenti e storici della catena
- recuperare i dati di stato
- trasmettere le transazioni
- eseguire transazioni utilizzando l'[EVM](/developers/docs/evm/)

I vantaggi di questo design di rete sono:

- ridurre la dipendenza da provider centralizzati
- Ridurre l'utilizzo della larghezza di banda Internet
- Sincronizzazione ridotta al minimo o nulla
- Accessibile a dispositivi con risorse limitate (\<1 GB di RAM, \<100 MB di spazio su disco, 1 CPU)

La tabella seguente mostra le funzioni dei client esistenti che possono essere fornite dal Portal Network, consentendo agli utenti di accedere a queste funzioni su dispositivi con risorse molto limitate.

### Le reti Portal {#the-portal-networks}

| Client leggero Beacon | Rete di stato                | Gossip delle transazioni | Rete della cronologia | Indice canonico delle transazioni |
| --------------------- | ---------------------------- | ------------------------ | --------------------- | --------------------------------- |
| Client leggero Beacon Chain | Archiviazione di account e contratti | Mempool leggera          | Intestazioni          | TxHash > Hash, Indice             |
| Dati del protocollo   |                              |                          | Corpi dei blocchi     |                                   |
|                       |                              |                          | Ricevute              |                                   |

## Diversità dei client per impostazione predefinita {#client-diversity-as-default}

Gli sviluppatori del Portal Network hanno anche fatto la scelta progettuale di creare quattro client del Portal Network separati fin dal primo giorno.

I client del Portal Network sono:

- [Trin](https://github.com/ethereum/trin): scritto in Rust
- [Fluffy](https://fluffy.guide): scritto in Nim
- [Ultralight](https://github.com/ethereumjs/ultralight): scritto in TypeScript
- [Shisui](https://github.com/zen-eth/shisui): scritto in Go

Avere più implementazioni di client indipendenti migliora la resilienza e la decentralizzazione della rete Ethereum.

Se un client riscontra problemi o vulnerabilità, gli altri client possono continuare a funzionare senza problemi, prevenendo un singolo punto di errore. Inoltre, le diverse implementazioni dei client promuovono l'innovazione e la concorrenza, guidando i miglioramenti e riducendo il rischio di monocoltura all'interno dell'ecosistema.

## Letture consigliate {#further-reading}

- [Il Portal Network (Piper Merriam alla Devcon Bogotà)](https://www.youtube.com/watch?v=0stc9jnQLXA).
- [Il Discord del Portal Network](https://discord.gg/CFFnmE7Hbs)
- [Il sito web del Portal Network](https://www.ethportal.net/)