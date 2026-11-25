---
title: Il Portal Network
description: Una panoramica del Portal Network, una rete peer-to-peer che mantiene disponibile la cronologia di Ethereum man mano che i client smettono di archiviarla tutta.
lang: it
---

[Ethereum](/) è una rete composta da computer che eseguono il software client di Ethereum. Ognuno di questi computer è chiamato "nodo". Il software client consente a un nodo di inviare e ricevere dati sulla rete Ethereum e verifica i dati in base alle regole del protocollo Ethereum. I nodi conservano molti dati storici nella loro memoria su disco e li aggiungono quando ricevono nuovi pacchetti di informazioni, noti come blocchi, da altri nodi sulla rete. Ciò è necessario per verificare sempre che un nodo abbia informazioni coerenti con il resto della rete. Ciò significa che l'esecuzione di un nodo può richiedere molto spazio su disco. Anche alcune operazioni del nodo possono richiedere molta RAM.

I client di esecuzione non devono più conservare tutti quei dati. Da luglio 2025 possono scartare i corpi e le ricevute dei blocchi precedenti a [The Merge](/roadmap/merge/), e la roadmap di Ethereum prevede di scartare ulteriore cronologia della catena nel tempo. Quella cronologia deve comunque rimanere disponibile per chiunque ne abbia bisogno, come block explorer, indicizzatori o un portafoglio che cerca una vecchia transazione.

Il Portal Network mantiene disponibile questa cronologia condividendola in piccoli pezzi tra molti nodi. Nessun nodo deve archiviarla tutta, e un nodo può recuperare qualsiasi pezzo e verificarlo rispetto ai dati che già possiede, senza doversi fidare del nodo che lo ha inviato.

Maggiori informazioni su [nodi e client](/developers/docs/nodes-and-clients/)

## Perché abbiamo bisogno del Portal Network {#why-do-we-need-portal-network}

I nodi di Ethereum archiviano la propria copia completa o parziale della blockchain di Ethereum. Questa copia locale viene utilizzata per convalidare le transazioni e garantire che il nodo stia seguendo la catena corretta. Questi dati archiviati localmente consentono ai nodi di verificare in modo indipendente che i dati in arrivo siano validi e corretti senza dover fare affidamento su nessun'altra entità.

Questa copia locale della blockchain e i dati associati di stato e ricevuta occupano molto spazio sul disco rigido del nodo. Ad esempio, si consiglia un SSD da 4 TB per eseguire un nodo utilizzando [Geth](https://geth.ethereum.org) abbinato a un client di consenso. Con la cronologia completa della catena, Geth occupa più di 1,8 TB di spazio su disco (a partire da settembre 2026) e continua a crescere con la catena.

Ciò significa che l'esecuzione dei nodi può essere costosa, perché una grande quantità di spazio su disco deve essere dedicata a Ethereum. La [scadenza della cronologia](/roadmap/statelessness/#history-expiry) lo riduce consentendo ai client di eliminare i vecchi dati dei blocchi di cui non hanno bisogno per seguire la catena: dalla [scadenza parziale della cronologia](https://blog.ethereum.org/2025/07/08/partial-history-exp) a luglio 2025, i client di esecuzione possono scartare i corpi e le ricevute di ogni blocco precedente a The Merge. La [scadenza dello stato](/roadmap/statelessness/#state-expiry) e l'[assenza di stato](/roadmap/statelessness/) sono ulteriori soluzioni ancora in fase di ricerca.

Una volta che i nodi smettono di archiviare la vecchia cronologia, non possono più fornirla ad altri. Archivi, torrent e provider ne conservano delle copie; il Portal Network la distribuisce su molti nodi, in modo che rimanga disponibile senza dipendere da nessuno di essi.

## Come funziona il Portal Network? {#how-does-portal-network-work}

I nodi di Ethereum hanno protocolli rigorosi che definiscono come comunicano tra loro. I client di esecuzione comunicano utilizzando un insieme di sottoprotocolli noti come [devp2p](/developers/docs/networking-layer/#devp2p), mentre i client di consenso utilizzano uno stack diverso di sottoprotocolli chiamato [libp2p](/developers/docs/networking-layer/#libp2p). devp2p consente a un nodo di richiedere i corpi dei blocchi e le ricevute dai suoi peer, ma un peer che ha scartato la vecchia cronologia non può fornirli. Le app e i portafogli possono anche ottenere dati da un nodo tramite l'[interfaccia di programmazione delle applicazioni (API) JSON-RPC](/developers/docs/apis/json-rpc/), ma ciò si basa sul fatto che un nodo o un provider archivi i dati e sulla fiducia che sia onesto.

Il Portal Network è una rete peer-to-peer separata costruita per condividere la cronologia. Funziona su [discv5](https://github.com/ethereum/devp2p/blob/master/discv5/discv5.md), il protocollo di scoperta dei nodi che anche i client di consenso utilizzano per trovare i peer, e organizza i suoi nodi come una [tabella hash distribuita (DHT)](https://en.wikipedia.org/wiki/Distributed_hash_table), simile a quella di BitTorrent. Ogni nodo ha un ID del nodo e ogni pezzo di contenuto, come le ricevute di un blocco, ha un ID del contenuto nello stesso spazio degli ID, derivato dal numero del suo blocco. Ogni nodo archivia il contenuto i cui ID sono più vicini al proprio ID, fino a una distanza che sceglie, chiamata il suo raggio. Per recuperare un pezzo di contenuto, un nodo chiede ai peer che conosce che sono più vicini all'ID del contenuto. I peer che non ce l'hanno rispondono con nodi ancora più vicini, finché la richiesta non raggiunge un nodo che lo archivia.

<PortalHistoryDiagram />

Un nodo non deve mai fidarsi dei dati che riceve. Conserva ogni intestazione del blocco e ogni intestazione si impegna per le transazioni e le ricevute del suo blocco attraverso radici come `transactionsRoot` e `receiptsRoot`. Il nodo verifica il corpo di un blocco o le ricevute di un blocco rispetto a quelle radici prima di utilizzarli.

### Le reti del Portal Network {#the-portal-networks}

Il Portal Network è stato inizialmente progettato come diverse sottoreti che avrebbero consentito ai client leggeri di seguire la catena senza fidarsi di un nodo completo: una rete di client leggeri della Beacon Chain, una rete di stato, una rete di gossip delle transazioni e una rete di cronologia. Nel 2025, le specifiche di tutte tranne una sono state spostate in legacy e lo sviluppo ora si concentra sulla **rete di cronologia** (History network), che archivia i corpi e le ricevute dei blocchi passati per i client di esecuzione che conservano ogni intestazione del blocco ma hanno scartato il resto della cronologia.

## Client del Portal Network {#client-diversity-as-default}

Diversi team hanno creato client del Portal Network:

- [Client Nimbus Portal](https://fluffy.guide) (precedentemente Fluffy): scritto in Nim, ed è quello ancora in fase di sviluppo attivo
- [Trin](https://github.com/ethereum/trin): scritto in Rust, non più mantenuto
- [Ultralight](https://github.com/ethereumjs/ultralight): scritto in TypeScript, senza aggiornamenti dalla metà del 2025
- [Shisui](https://github.com/zen-eth/shisui): scritto in Go, senza aggiornamenti dalla metà del 2025

## Letture consigliate {#further-reading}

- [Specifiche del Portal Network](https://github.com/ethereum/portal-network-specs)
- [Utilizzo del protocollo Portal Network per la scadenza della cronologia](https://ethresear.ch/t/using-portal-network-protocol-for-history-expiry/22658)
- [Scadenza parziale della cronologia](https://blog.ethereum.org/2025/07/08/partial-history-exp)
- [Il Portal Network (Piper Merriam alla Devcon Bogotà)](https://www.youtube.com/watch?v=0stc9jnQLXA)
- [Discord del Portal Network](https://discord.gg/CFFnmE7Hbs)
- [Sito web del Portal Network](https://www.ethportal.net/)
