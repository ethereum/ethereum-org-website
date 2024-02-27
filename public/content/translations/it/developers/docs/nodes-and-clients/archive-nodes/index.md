---
title: Nodo archivio di Ethereum
description: Una panoramica dei nodi archivio
lang: it
sidebarDepth: 2
---

Un nodo archivio è un'istanza di un client di Ethereum configurata per creare un archivio di tutti gli stati storici. È uno strumento utile per certi casi d'uso ma potrebbe essere più complicato da eseguire di un nodo completo.

## Prerequisiti {#prerequisites}

Dovresti comprendere il concetto di [nodo di Ethereum](/developers/docs/nodes-and-clients/), [la sua architettura](/developers/docs/nodes-and-clients/node-architecture/), le [strategie di sincronizzazione](/developers/docs/nodes-and-clients/#sync-modes) e le pratiche della sua [esecuzione](/developers/docs/nodes-and-clients/run-a-node/) e [utilizzo](/developers/docs/apis/json-rpc/).

## Cos'è un nodo archivio

Per cogliere l'importanza di un nodo archivio, chiariamo il concetto di "stato". Ethereum è definibile come una _macchina di stato basata sulle transazioni_. Consiste in conti e applicazioni che eseguono transazioni, i cui stati cambiano. I dati globali con informazioni su ogni conto e contratto sono memorizzati in un database ad albero, detto stato. Questo è gestito dal client del livello di esecuzione (EL) e include:

- Saldi e nonce dei conti
- Codice del contratto e archiviazione
- Dati correlati al consenso, es. il Contratto di deposito di staking

Per interagire con la rete, verificare e produrre nuovi blocchi, i client di Ethereum devono tenere il passo con i cambiamenti più recenti (la punta della catena) e, dunque, con lo stato corrente. Un client del livello di esecuzione configurato come un nodo completo verifica e segue l'ultimo stato della rete, memorizzando nella cache solo gli ultimi stati, ad esempio quello associato agli ultimi 128 blocchi, così che possa gestire le riorganizzazioni della catena e fornire accesso rapido ai dati recenti. Lo stato recente è ciò che tutti i client necessitano per verificare le transazioni in entrata e per utilizzare la rete.

Puoi immaginare lo stato come un'istantanea momentanea della rete a un dato blocco e l'archivio come una riproduzione dello storico.

Gli stati storici possono essere rimossi in sicurezza, poiché non sono necessari per l'operatività della rete e sarebbe inutilmente ridondante per il client mantenere tutti i dati obsoleti. Gli stati esistenti prima di qualche blocco recente (es. i 128 blocchi prima della testa) sono di fatto gettati via. I nodi completi mantengono soltanto i dati storici della blockchain (blocchi e transazioni) e istantanee storiche occasionali utilizzabili per rigenerare i vecchi stati su richiesta. Lo fanno eseguendo nuovamente le vecchie transazioni nell'EVM, il che può essere impegnativo a livello computazionale quando lo stato desiderato è distante dall'istantanea più vicina.

Tuttavia, ciò significa che accedere a uno stato storico su un nodo completo produce numerosi calcoli. Il client potrebbe dover eseguire tutte le transazioni precedenti e calcolare uno stato storico dalla genesi. I nodi archivio risolvono tale problema, memorizzando non solo gli stati più recenti ma ogni stato storico creato dopo ogni blocco. Fondamentalmente raggiungono un compromesso con maggiori requisiti di spazio su disco.

È importante notare che la rete non dipende dal fatto che i nodi archivio mantengano e forniscano tutti i dati storici. Come detto sopra, tutti gli stati intermedi storici sono derivabili su un nodo completo. Le transazioni sono memorizzate da qualsiasi nodo completo (attualmente meno di 400G) e riproducibili per costruire l'intero archivio.

### Casi d'uso

L'utilizzo regolare di Ethereum, come inviare transazioni, distribuire contratti, verificare il consenso, ecc., non richiede l'accesso agli stati storici. Gli utenti non necessitano mai di un nodo archivio per un'interazione standard con la rete.

Il principale vantaggio dell'archivio di stato è un accesso rapido alle richieste sugli stati storici. Ad esempio, il nodo archivio restituirà prontamente risultati come:

- _Qual era il saldo di ETH del conto 0x1337... al blocco 15537393?_
- _Qual era il saldo del token 0x nel contratto 0x al blocco 1920000?_

Come spiegato sopra, un nodo completo dovrebbe generare questi dati dall'esecuzione dell'EVM, utilizzando CPU e richiedendo tempo. I nodi archivio vi accedono sul disco e servono immediatamente le risposte. Questa è un'utile funzionalità per certe parti dell'infrastruttura, ad esempio:

- Fornitori di servizi come i block explorer
- Ricercatori
- Analisti della sicurezza
- Sviluppatori di Dapp
- Controllo e conformità

Esistono anche vari [servizi](/developers/docs/nodes-and-clients/nodes-as-a-service/) gratuiti che consentono l'accesso a dati storici. Essendo più impegnativo eseguire un nodo archivio, questo accesso è per lo più limitato e funziona soltanto per l'accesso occasionale. Se il tuo progetto richiede l'accesso costante ai dati storici, dovresti considerare di eseguirne uno tu stesso.

## Implementazioni e utilizzi

Il nodo archivio, in questo contesto, indica i dati serviti dai client del livello di esecuzione rivolti agli utenti mentre gestiscono il database di stato e forniscono gli endpoint JSON-RPC. Opzioni di configurazione, tempi di sincronizzazione e dimensioni del database potrebbero variare a seconda del client. Per i dettagli, sei pregato di fare riferimento alla documentazione fornita dal tuo client.

Prima di avviare il tuo nodo archivio, scopri le differenze tra i client e, in particolare, i vari [requisiti hardware](/developers/docs/nodes-and-clients/run-a-node/#requirements). Gran parte dei client non è ottimizzata per questa funzionalità e i loro archivi richiedono oltre 12TB di spazio. Per contro, le implementazioni come Erigon possono memorizzare gli stessi dati in meno di 3TB, il che li rende il metodo più efficace per eseguire un nodo archivio.

## Pratiche consigliate

Oltre ai [consigli generali per eseguire un nodo](/developers/docs/nodes-and-clients/run-a-node/), un nodo archivio potrebbe avere requisiti maggiori in termini di hardware e manutenzione. Considerando le [funzionalità chiave](https://github.com/ledgerwatch/erigon#key-features) di Erigon, l'approccio più pratico è utilizzare l'implementazione del client di [Erigon](/developers/docs/nodes-and-clients/#erigon).

### Hardware

Assicurati sempre di verificare i requisiti hardware per una data modalità nella documentazione di un client. Il principale requisito per i nodi archivio è lo spazio su disco. A seconda del client, varia da 3TB a 12TB. Anche se gli HDD potrebbero essere considerati la migliore soluzione per grandi quantità di dati, sincronizzare e aggiornare costantemente la testa della catena richiederà dischi SSD. I dischi [SATA](https://www.cleverfiles.com/help/sata-hard-drive.html) sono abbastanza buoni ma dovrebbero essere di una qualità affidabile, almeno [TLC](https://blog.synology.com/tlc-vs-qlc-ssds-what-are-the-differences). I dischi possono esser montati in un computer fisso o un server dotato di un numero sufficiente di slot. Tali dispositivi dedicati sono ideali per eseguire nodi con tempi di disponibilità elevati. È assolutamente possibile eseguirli su un laptop, ma la portabilità comporterà un costo aggiuntivo.

Tutti i dati devono entrare in un volume, dunque i dischi devono essere uniti, ad esempio con [RAID0](https://en.wikipedia.org/wiki/Standard_RAID_levels#RAID_0) o [LVM](https://web.mit.edu/rhel-doc/5/RHEL-5-manual/Deployment_Guide-en-US/ch-lvm.html). Inoltre, potrebbe valere la pena di considerare l'utilizzo di [ZFS](https://en.wikipedia.org/wiki/ZFS) poiché supporta la "Copy-on-write", che assicura che i dati siano scritti correttamente senza alcun errore di basso livello.

Per una maggiore stabilità e sicurezza nel prevenire la corruzione accidentale del database, specialmente in una configurazione professionale, prendi in considerazione di utilizzare la [memoria ECC](https://en.wikipedia.org/wiki/ECC_memory), se il tuo sistema la supporta. Generalmente si consiglia che le dimensioni della RAM siano le stesse richieste per un nodo completo, ma maggiori quantità di RAM possono aiutare a velocizzare la sincronizzazione.

Durante la sincronizzazione iniziale, i client in modalità archivio eseguiranno ogni transazione dalla genesi. La velocità di esecuzione è per lo più limitata dalla CPU, quindi una CPU più veloce può aiutare con i tempi della sincronizzazione iniziale. Sul computer del consumatore medio, la sincronizzazione iniziale può richiedere fino a un mese.

## Letture consigliate {#further-reading}

- [Nodo completo vs nodo archivio di Ethereum](https://www.quicknode.com/guides/infrastructure/ethereum-full-node-vs-archive-node) - _QuickNode, settembre 2022_
- [Costruire il proprio nodo archivio di Ethereum](https://tjayrush.medium.com/building-your-own-ethereum-archive-node-72c014affc09) - _Thomas Jay Rush, agosto 2021_
- [Come configurare Erigon, RPC di Erigon e TrueBlocks (scrape e API) come servizi](https://magnushansson.xyz/blog_posts/crypto_defi/2022-01-10-Erigon-Trueblocks) _– Magnus Hansson, aggiornato a settembre 2022_

## Argomenti correlati {#related-topics}

- [ Nodi e client](/developers/docs/nodes-and-clients/)
- [Eseguire un nodo](/developers/docs/nodes-and-clients/run-a-node/)
