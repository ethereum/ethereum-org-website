---
title: Nodo di archivio di Ethereum
description: Una panoramica sui nodi di archivio
lang: it
sidebarDepth: 2
---

Un nodo di archivio è un'istanza di un client [Ethereum](/) configurato per creare un archivio di tutti gli stati storici. È uno strumento utile per determinati casi d'uso, ma potrebbe essere più complesso da eseguire rispetto a un nodo completo.

## Prerequisiti {#prerequisites}

Dovresti comprendere il concetto di [nodo Ethereum](/developers/docs/nodes-and-clients/), [la sua architettura](/developers/docs/nodes-and-clients/node-architecture/), [le strategie di sincronizzazione](/developers/docs/nodes-and-clients/#sync-modes), le pratiche per [eseguirli](/developers/docs/nodes-and-clients/run-a-node/) e [utilizzarli](/developers/docs/apis/json-rpc/).

## Cos'è un nodo di archivio

Per cogliere l'importanza di un nodo di archivio, chiariamo il concetto di "stato". Ethereum può essere definito come una _macchina a stati basata sulle transazioni_. È composto da account e applicazioni che eseguono transazioni che ne modificano lo stato. I dati globali con le informazioni su ogni account e contratto sono archiviati in un database trie chiamato stato. Questo è gestito dal client del livello di esecuzione (EL) e include:

- Saldi degli account e nonce
- Codice e archiviazione dei contratti
- Dati relativi al consenso, ad es. il contratto di deposito per lo staking

Per interagire con la rete, verificare e produrre nuovi blocchi, i client di Ethereum devono tenersi al passo con le modifiche più recenti (la punta della catena) e quindi con lo stato attuale. Un client del livello di esecuzione configurato come nodo completo verifica e segue l'ultimo stato della rete, ma memorizza nella cache solo gli ultimi stati, ad es. lo stato associato agli ultimi 128 blocchi, in modo da poter gestire le riorganizzazioni della catena e fornire un rapido accesso ai dati recenti. Lo stato recente è ciò di cui tutti i client hanno bisogno per verificare le transazioni in entrata e utilizzare la rete.

Puoi immaginare lo stato come un'istantanea momentanea della rete in un dato blocco e l'archivio come una riproduzione della cronologia.

Gli stati storici possono essere tranquillamente eliminati (pruned) perché non sono necessari per il funzionamento della rete e sarebbe inutilmente ridondante per il client conservare tutti i dati obsoleti. Gli stati esistenti prima di un blocco recente (ad es. 128 blocchi prima della testa) vengono di fatto scartati. I nodi completi conservano solo i dati storici della blockchain (blocchi e transazioni) e occasionali istantanee storiche che possono utilizzare per rigenerare stati più vecchi su richiesta. Lo fanno rieseguendo le transazioni passate nell'EVM, il che può essere computazionalmente impegnativo quando lo stato desiderato è lontano dall'istantanea più vicina.

Tuttavia, ciò significa che l'accesso a uno stato storico su un nodo completo consuma molta potenza di calcolo. Il client potrebbe dover eseguire tutte le transazioni passate e calcolare uno stato storico dalla genesi. I nodi di archivio risolvono questo problema archiviando non solo gli stati più recenti, ma ogni stato storico creato dopo ogni blocco. Fondamentalmente, si tratta di un compromesso con un maggiore requisito di spazio su disco.

È importante notare che la rete non dipende dai nodi di archivio per conservare e fornire tutti i dati storici. Come accennato in precedenza, tutti gli stati intermedi storici possono essere derivati su un nodo completo. Le transazioni sono archiviate da qualsiasi nodo completo (attualmente meno di 400 GB) e possono essere riprodotte per costruire l'intero archivio.

### Casi d'uso

L'uso regolare di Ethereum, come l'invio di transazioni, la distribuzione di contratti, la verifica del consenso, ecc., non richiede l'accesso agli stati storici. Gli utenti non hanno mai bisogno di un nodo di archivio per un'interazione standard con la rete.

Il vantaggio principale dell'archivio di stato è un rapido accesso alle query sugli stati storici. Ad esempio, un nodo di archivio restituirebbe prontamente risultati come:

- _Qual era il saldo in ETH dell'account 0x1337... al blocco 15537393?_
- _Qual è il saldo del token 0x nel contratto 0x al blocco 1920000?_

Come spiegato sopra, un nodo completo dovrebbe generare questi dati tramite l'esecuzione dell'EVM, che utilizza la CPU e richiede tempo. I nodi di archivio vi accedono sul disco e forniscono le risposte immediatamente. Questa è una funzionalità utile per alcune parti dell'infrastruttura, ad esempio:

- Fornitori di servizi come gli esploratori di blocchi
- Ricercatori
- Analisti di sicurezza
- Sviluppatori di dApp
- Revisione e conformità

Esistono vari [servizi](/developers/docs/nodes-and-clients/nodes-as-a-service/) gratuiti che consentono anche l'accesso ai dati storici. Poiché è più impegnativo eseguire un nodo di archivio, questo accesso è per lo più limitato e funziona solo per accessi occasionali. Se il tuo progetto richiede un accesso costante ai dati storici, dovresti prendere in considerazione l'idea di eseguirne uno tu stesso.

## Implementazioni e utilizzo

Nodo di archivio in questo contesto significa dati forniti dai client del livello di esecuzione rivolti all'utente, poiché gestiscono il database di stato e forniscono endpoint JSON-RPC. Le opzioni di configurazione, il tempo di sincronizzazione e le dimensioni del database possono variare a seconda del client. Per i dettagli, fai riferimento alla documentazione fornita dal tuo client.

Prima di avviare il tuo nodo di archivio, informati sulle differenze tra i client e in particolare sui vari [requisiti hardware](/developers/docs/nodes-and-clients/run-a-node/#requirements). La maggior parte dei client non è ottimizzata per questa funzionalità e i loro archivi richiedono più di 12 TB di spazio. Al contrario, implementazioni come Erigon possono archiviare gli stessi dati in meno di 3 TB, il che le rende il modo più efficace per eseguire un nodo di archivio.

## Pratiche consigliate

Oltre alle [raccomandazioni generali per l'esecuzione di un nodo](/developers/docs/nodes-and-clients/run-a-node/), un nodo di archivio può essere più esigente in termini di hardware e manutenzione. Considerando le [funzionalità chiave](https://github.com/ledgerwatch/erigon#key-features) di Erigon, l'approccio più pratico è utilizzare l'implementazione del client [Erigon](/developers/docs/nodes-and-clients/#erigon).

### Hardware

Assicurati sempre di verificare i requisiti hardware per una determinata modalità nella documentazione di un client.
Il requisito principale per i nodi di archivio è lo spazio su disco. A seconda del client, varia da 3 TB a 12 TB. Anche se gli HDD potrebbero essere considerati una soluzione migliore per grandi quantità di dati, la loro sincronizzazione e il costante aggiornamento della testa della catena richiederanno unità SSD. Le unità [SATA](https://www.cleverfiles.com/help/sata-hard-drive.html) sono sufficienti, ma dovrebbero essere di qualità affidabile, almeno [TLC](https://blog.synology.com/tlc-vs-qlc-ssds-what-are-the-differences). I dischi possono essere inseriti in un computer desktop o in un server con slot sufficienti. Tali dispositivi dedicati sono ideali per eseguire un nodo con un tempo di attività elevato. È assolutamente possibile eseguirlo su un laptop, ma la portabilità comporterà un costo aggiuntivo.

Tutti i dati devono risiedere in un unico volume, pertanto i dischi devono essere uniti, ad es. con [RAID0](https://en.wikipedia.org/wiki/Standard_RAID_levels#RAID_0) o LVM. Potrebbe valere la pena prendere in considerazione anche l'utilizzo di [ZFS](https://en.wikipedia.org/wiki/ZFS) in quanto supporta il "Copy-on-write", che garantisce che i dati vengano scritti correttamente sul disco senza errori di basso livello.

Per maggiore stabilità e sicurezza nella prevenzione della corruzione accidentale del database, specialmente in una configurazione professionale, considera l'utilizzo della [memoria ECC](https://en.wikipedia.org/wiki/ECC_memory) se il tuo sistema la supporta. In genere si consiglia che la dimensione della RAM sia la stessa di un nodo completo, ma una maggiore quantità di RAM può aiutare a velocizzare la sincronizzazione.

Durante la sincronizzazione iniziale, i client in modalità archivio eseguiranno ogni transazione dalla genesi. La velocità di esecuzione è per lo più limitata dalla CPU, quindi una CPU più veloce può aiutare con il tempo di sincronizzazione iniziale. Su un computer consumer medio, la sincronizzazione iniziale può richiedere fino a un mese.

## Letture di approfondimento {#further-reading}

- [Ethereum Full Node vs Archive Node](https://www.quicknode.com/guides/infrastructure/ethereum-full-node-vs-archive-node) - _QuickNode, settembre 2022_
- [Building Your Own Ethereum Archive Node](https://tjayrush.medium.com/building-your-own-ethereum-archive-node-72c014affc09) - _Thomas Jay Rush, agosto 2021_
- [How to set up Erigon, Erigon’s RPC and TrueBlocks (scrape and API) as services](https://magnushansson.xyz/blog_posts/crypto_defi/2022-01-10-Erigon-Trueblocks) _– Magnus Hansson, aggiornato a settembre 2022_

## Argomenti correlati {#related-topics}

- [Nodi e client](/developers/docs/nodes-and-clients/)
- [Eseguire un nodo](/developers/docs/nodes-and-clients/run-a-node/)