---
title: La Rete Portal
description: Una panoramica della Rete Portal, una rete in fase di sviluppo progettata per supportare i client con risorse limitate.
lang: it
---

Ethereum è una rete composta da computer che eseguono il software client di Ethereum. Ciascuno di questi computer è chiamato "nodo". Il software client consente a un nodo di inviare e ricevere dati sulla rete Ethereum e verifica i dati in base alle regole del protocollo Ethereum. I nodi conservano molti dati storici nella loro memoria di archiviazione su disco e li aggiungono quando ricevono nuovi pacchetti di informazioni, noti come blocchi, da altri nodi della rete. Questo è necessario per verificare sempre che un nodo abbia informazioni coerenti con il resto della rete. Ciò significa che l'esecuzione di un nodo può richiedere molto spazio su disco. Alcune operazioni dei nodi possono richiedere anche molta RAM.

Per ovviare al problema dell'archiviazione su disco, sono stati sviluppati nodi "leggeri" che richiedono informazioni ai nodi completi invece di memorizzare tutto da soli. Tuttavia, ciò significa che il nodo leggero non sta verificando in modo indipendente le informazioni e si sta invece fidando di un altro nodo. Ciò significa anche che i nodi completi devono svolgere del lavoro aggiuntivo per servire i nodi leggeri.

La Rete Portal è un nuovo progetto di rete per Ethereum che mira a risolvere il problema della disponibilità dei dati per i nodi "leggeri" senza dover fare affidamento o sottoporre a ulteriori sforzi i nodi completi, condividendo i dati necessari in piccole porzioni attraverso la rete.

Maggiori informazioni su [nodi e client](/developers/docs/nodes-and-clients/)

## Perché abbiamo bisogno della Rete Portal {#why-do-we-need-portal-network}

I nodi di Ethereum memorizzano la propria copia completa o parziale della blockchain di Ethereum. Questa copia locale viene utilizzata per convalidare le transazioni e garantire che il nodo stia seguendo la catena corretta. Questi dati memorizzati localmente consentono ai nodi di verificare in modo indipendente che i dati in arrivo siano validi e corretti, senza doversi fidare di altre entità.

Questa copia locale della blockchain e dei dati di stato e di ricezione associati occupa molto spazio sul disco rigido del nodo. Ad esempio, si consiglia un disco rigido da 2 TB per l'esecuzione di un nodo che utilizza [Geth](https://geth.ethereum.org) accoppiato a un client di consenso. Utilizzando la sincronizzazione snap, che memorizza solo i dati della catena da un insieme relativamente recente di blocchi, Geth occupa tipicamente circa 650 GB di spazio su disco, ma cresce di circa 14 GB a settimana (è possibile ridurre nuovamente il nodo a 650 GB periodicamente).

Ciò significa che la gestione dei nodi può essere costosa, perché una grande quantità di spazio su disco deve essere dedicata a Ethereum. Ci sono diverse soluzioni a questo problema nella tabella di marcia di Ethereum, tra cui la [scadenza dello storico](/roadmap/statelessness/#history-expiry), la [scadenza dello stato](/roadmap/statelessness/#state-expiry) e l'[assenza di stato](/roadmap/statelessness/). Tuttavia, è probabile che passino diversi anni prima che queste misure vengano implementate. Esistono anche [nodi leggeri](/developers/docs/nodes-and-clients/light-clients/) che non salvano la propria copia dei dati della catena, ma richiedono i dati di cui hanno bisogno ai nodi completi. Tuttavia, ciò significa che i nodi leggeri devono fidarsi del fatto che i nodi completi forniscano dati onesti e inoltre aumenta il carico di lavoro per i nodi completi, che devono fornire ai nodi leggeri i dati di cui hanno bisogno.

La Rete Portal mira a fornire un modo alternativo per i nodi leggeri di ottenere i loro dati che non richieda il fare affidamento sui nodi completi o l'aumento significativo del carico di lavoro di questi ultimi. Il modo in cui ciò avverrà consiste nell'introdurre un nuovo modo per i nodi di Ethereum di condividere i dati attraverso la rete.

## Come funziona la Rete Portal? {#how-does-portal-network-work}

I nodi di Ethereum hanno protocolli rigorosi che definiscono come devono comunicare tra loro. I client di esecuzione comunicano utilizzando un insieme di sottoprotocolli noti come [DevP2P](/developers/docs/networking-layer/#devp2p), mentre i nodi di consenso utilizzano uno stack di sottoprotocolli differente chiamato [libP2P](/developers/docs/networking-layer/#libp2p). Questi definiscono i tipi di dati che possono essere trasferiti tra i nodi.

![devP2P and libP2P](portal-network-devp2p-libp2p.png)

I nodi possono anche offrire dati specifici attraverso l'[API JSON-RPC](/developers/docs/apis/json-rpc/), che è la modalità utilizzata dalle applicazioni e dai portafogli per scambiare le informazioni con i nodi di Ethereum. Tuttavia, nessuno di questi protocolli è ideale per offrire dati ai client leggeri.

Attualmente i client leggeri non possono richiedere specifici pezzi di dati della catena tramite DevP2P o libP2p perché questi protocolli sono progettati solo per abilitare la sincronizzazione della catena, il gossip dei blocchi e le transazioni. I client leggeri non vogliono scaricare questa informazione perché questo impedirebbe loro di essere "leggeri".

Nemmeno l'API JSON-RPC è la scelta ideale per le richieste dei dati da parte del client leggero, perché si basa su una connessione ad uno specifico nodo completo o ad un fornitore RPC centralizzato in grado di offrire i dati. Questo significa che il nodo leggero deve fidarsi dell'onestà dello specifico nodo/fornitore, e che il nodo completo potrebbe dover gestire molte richieste da molti client leggeri, aumentando i suoi requisiti di larghezza di banda.

L'obiettivo della Rete Portal è di ripensare l'intera progettazione, costruendola specificatamente per la leggerezza, fuori dai vincoli di progettazione dei client di Ethereum esistenti.

L'idea di base della Rete Portal è quella di prendere il meglio dell'attuale stack di rete consentendo di fornire le informazioni necessarie ai client leggeri, come i dati storici e l'identità dell'attuale testa della catena, attraverso una rete decentralizzata peer-to-peer leggera in stile DevP2P che utilizza un [DHT](https://en.wikipedia.org/wiki/Distributed_hash_table) (simile a Bittorrent).

L'idea è di aggiungere a ogni nodo piccole parti dei dati storici totali di Ethereum e alcune responsabilità specifiche per ciascun nodo. Quindi, le richieste vengono soddisfatte cercando i nodi che memorizzano i dati specifici richiesti e recuperandoli da essi.

In questo modo si inverte il modello normale in cui i nodi leggeri trovano un singolo nodo e gli chiedono di filtrare e servire grandi volumi di dati; invece, essi filtrano rapidamente una grande rete di nodi che gestiscono ciascuno piccole quantità di dati.

L'obiettivo è quello di consentire a una rete decentralizzata di client Portal leggeri di:

- tracciare della testa della catena
- sincronizzare i dati recenti e storici della catena
- recuperare i dati dello stato
- trasmettere le transazioni
- eseguire le transazioni utilizzando l'[EVM](/developers/docs/evm/)

I vantaggi di questa progettazione della rete sono:

- Ridurre la dipendenza da fornitori centralizzati
- Ridurre l'utilizzo della larghezza di banda di Internet
- Sincronizzazione ridotta o nulla
- Accessibile a dispositivi con risorse limitate (<1 GB di RAM, <100 MB di spazio su disco, 1 CPU)

Il diagramma seguente mostra le funzioni dei client esistenti che possono essere fornite dalla Rete Portal, consentendo agli utenti di accedere a tali funzioni su dispositivi con risorse molto limitate.

### Le Reti Portal

| Client leggero della Beacon | Rete dello stato                    | Gossip della transazione | Rete dello storico |
| --------------------------- | ----------------------------------- | ------------------------ | ------------------ |
| Beacon chain leggera        | Conto e archiviazione del contratto | Mempool leggero          | Intestazioni       |
| Dati del protocollo         |                                     |                          | Corpi del blocco   |
|                             |                                     |                          | Ricevute           |

## Diversità dei client per impostazione predefinita {#client-diversity-as-default}

Nella loro progettazione, gli sviluppatori della Rete Portal hanno deciso di creare anche tre diversi client della Rete Portal fin dal primo giorno.

I client della Rete Portal sono:

- [Trin](https://github.com/ethereum/trin): scritto in Rust
- [Fluffy](https://nimbus.team/docs/fluffy.html): scritto in Nim
- [Ultralight](https://github.com/ethereumjs/ultralight): scritto in Typescript
- [Shisui](https://github.com/optimism-java/shisui): scritto in Go

La presenza di più implementazioni client indipendenti aumenta la resilienza e la decentralizzazione della rete Ethereum.

Se un client presenta problemi o vulnerabilità, gli altri client possono continuare a funzionare senza problemi, evitando un punto di errore singolo. Inoltre, le diverse implementazioni dei clienti favoriscono l'innovazione e la concorrenza, promuovendo miglioramenti e riducendo il rischio di monopolio all'interno dell'ecosistema.

## Letture consigliate {#futher-reading}

- [La Rete Portal (Piper Merriam al Devcon di Bogotà)](https://www.youtube.com/watch?v=0stc9jnQLXA).
- [Discord della Rete Portal](https://discord.gg/CFFnmE7Hbs)
- [Sito web della Rete Portal](https://www.ethportal.net/)
