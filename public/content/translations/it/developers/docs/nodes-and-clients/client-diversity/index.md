---
title: "Diversità dei client"
description: "Una spiegazione ad alto livello dell'importanza della diversità dei client di Ethereum."
lang: it
sidebarDepth: 2
---

Il comportamento di un nodo di [Ethereum](/) è controllato dal software del client che esegue. Esistono diversi client di Ethereum a livello di produzione, ognuno sviluppato e mantenuto in linguaggi diversi da team separati. I client sono costruiti secondo una specifica comune che garantisce che comunichino tra loro senza problemi, abbiano le stesse funzionalità e forniscano un'esperienza utente equivalente. Tuttavia, al momento la distribuzione dei client tra i nodi non è abbastanza equa da realizzare questa fortificazione della rete al suo pieno potenziale. Idealmente, gli utenti si dividono in modo approssimativamente uguale tra i vari client per portare quanta più diversità dei client possibile alla rete.

## Prerequisiti {#prerequisites}

Se non capisci ancora cosa siano i nodi e i client, dai un'occhiata a [nodi e client](/developers/docs/nodes-and-clients/). I livelli di [esecuzione](/glossary/#execution-layer) e [consenso](/glossary/#consensus-layer) sono definiti nel glossario.

## Perché ci sono più client? {#why-multiple-clients}

Esistono più client sviluppati e mantenuti in modo indipendente perché la diversità dei client rende la rete più resiliente ad attacchi e bug. Avere più client è un punto di forza unico di Ethereum: altre blockchain si affidano all'infallibilità di un singolo client. Tuttavia, non è sufficiente avere semplicemente più client disponibili, devono essere adottati dalla community e i nodi attivi totali devono essere distribuiti in modo relativamente uniforme tra di essi.

## Perché la diversità dei client è importante? {#client-diversity-importance}

Avere molti client sviluppati e mantenuti in modo indipendente è vitale per la salute di una rete decentralizzata. Esploriamone i motivi.

### Bug {#bugs}

Un bug in un singolo client rappresenta un rischio minore per la rete quando rappresenta una minoranza dei nodi di Ethereum. Con una distribuzione approssimativamente uniforme dei nodi tra molti client, la probabilità che la maggior parte dei client soffra di un problema condiviso è piccola e, di conseguenza, la rete è più robusta.

### Resilienza agli attacchi {#resilience}

La diversità dei client offre anche resilienza agli attacchi. Ad esempio, un attacco che [inganna un particolare client](https://twitter.com/vdWijden/status/1437712249926393858) su un particolare ramo della catena è improbabile che abbia successo perché è improbabile che altri client siano sfruttabili allo stesso modo e la catena canonica rimane incorrotta. Una bassa diversità dei client aumenta il rischio associato a un hack sul client dominante. La diversità dei client si è già dimostrata un'importante difesa contro gli attacchi dannosi alla rete, ad esempio l'attacco denial-of-service di Shanghai nel 2016 è stato possibile perché gli aggressori sono stati in grado di ingannare il client dominante (Geth) facendogli eseguire una lenta operazione di I/O su disco decine di migliaia di volte per blocco. Poiché erano online anche client alternativi che non condividevano la vulnerabilità, Ethereum è stato in grado di resistere all'attacco e continuare a operare mentre la vulnerabilità in Geth veniva risolta.

### Finalità della prova di stake {#finality}

Un bug in un client di consenso con oltre il 33% dei nodi di Ethereum potrebbe impedire al livello di consenso di raggiungere la finalità, il che significa che gli utenti non potrebbero fidarsi del fatto che le transazioni non vengano annullate o modificate a un certo punto. Questo sarebbe molto problematico per molte delle app costruite su Ethereum, in particolare per la DeFi.

<Emoji text="🚨" className="me-4" /> Peggio ancora, un bug critico in un client con una maggioranza di due terzi potrebbe causare alla catena di <a href="https://www.symphonious.net/2021/09/23/what-happens-if-beacon-chain-consensus-fails/" target="_blank">dividersi e finalizzarsi in modo errato</a>, portando un ampio gruppo di validatori a rimanere bloccati su una catena non valida. Se vogliono ricongiungersi alla catena corretta, questi validatori rischiano di essere puniti o di dover affrontare un ritiro volontario e una riattivazione lenti e costosi. L'entità della punizione scala con il numero di nodi colpevoli, con una maggioranza di due terzi punita al massimo (32 ETH).

Sebbene questi siano scenari improbabili, l'ecosistema di Ethereum può mitigarne il rischio uniformando la distribuzione dei client tra i nodi attivi. Idealmente, nessun client di consenso dovrebbe mai raggiungere una quota del 33% dei nodi totali.

### Responsabilità condivisa {#responsibility}

C'è anche un costo umano nell'avere client di maggioranza. Pone uno sforzo e una responsabilità eccessivi su un piccolo team di sviluppo. Minore è la diversità dei client, maggiore è il peso della responsabilità per gli sviluppatori che mantengono il client di maggioranza. Distribuire questa responsabilità su più team è positivo sia per la salute della rete di nodi di Ethereum sia per la sua rete di persone.

## Attuale diversità dei client {#current-client-diversity}

### Client di esecuzione {#execution-clients-breakdown}

<PieChart
data={[
{ name: "Geth", value: 41 },
{ name: "Nethermind", value: 38 },
{ name: "Besu", value: 16 },
{ name: "Erigon", value: 3 },
{ name: "Reth", value: 2 }
]}
/>

### Client di consenso {#consensus-clients-breakdown}

<PieChart
data={[
{ name: "Lighthouse", value: 42.71 },
{ name: "Prysm", value: 30.91},
{ name: "Teku", value: 13.86},
{ name: "Nimbus", value: 8.74},
{ name: "Lodestar", value: 2.67 },
{ name: "Grandine", value: 1.04 },
{ name: "Other", value: 0.07 }
]}
/>

Questo diagramma potrebbe essere obsoleto: vai su [ethernodes.org](https://ethernodes.org) e [clientdiversity.org](https://clientdiversity.org) per informazioni aggiornate.

I due grafici a torta qui sopra mostrano istantanee dell'attuale diversità dei client per i livelli di esecuzione e di consenso (al momento della stesura, a ottobre 2025). La diversità dei client è migliorata nel corso degli anni e il livello di esecuzione ha visto una riduzione del dominio da parte di [Geth](https://geth.ethereum.org/), con [Nethermind](https://www.nethermind.io/nethermind-client) al secondo posto a breve distanza, [Besu](https://besu.hyperledger.org/) al terzo ed [Erigon](https://github.com/ledgerwatch/erigon) al quarto, con altri client che costituiscono meno del 3% della rete. Il client più comunemente utilizzato sul livello di consenso, [Lighthouse](https://lighthouse.sigmaprime.io/), è molto vicino al secondo più utilizzato. [Prysm](https://prysmaticlabs.com/#projects) e [Teku](https://consensys.net/knowledge-base/ethereum-2/teku/) costituiscono rispettivamente circa il 31% e il 14%, e gli altri client sono usati raramente.

I dati del livello di esecuzione sono stati ottenuti da [supermajority.info](https://supermajority.info/) il 26 ottobre 2025. I dati per i client di consenso sono stati ottenuti da [Michael Sproul](https://github.com/sigp/blockprint). I dati dei client di consenso sono più difficili da ottenere perché i client del livello di consenso non hanno sempre tracce inequivocabili che possono essere utilizzate per identificarli. I dati sono stati generati utilizzando un algoritmo di classificazione che a volte confonde alcuni dei client di minoranza (vedi [qui](https://twitter.com/sproulM_/status/1440512518242197516) per maggiori dettagli). Nel diagramma sopra, queste classificazioni ambigue sono trattate con un'etichetta o/o (es. Nimbus/Teku). Tuttavia, è chiaro che la maggior parte della rete esegue Prysm. Nonostante siano solo istantanee, i valori nel diagramma forniscono un buon senso generale dello stato attuale della diversità dei client.

I dati aggiornati sulla diversità dei client per il livello di consenso sono ora disponibili su [clientdiversity.org](https://clientdiversity.org/).

## Livello di esecuzione {#execution-layer}

Fino ad ora, la conversazione sulla diversità dei client si è concentrata principalmente sul livello di consenso. Tuttavia, il client di esecuzione [Geth](https://geth.ethereum.org) rappresenta attualmente circa l'85% di tutti i nodi. Questa percentuale è problematica per gli stessi motivi dei client di consenso. Ad esempio, un bug in Geth che influisce sulla gestione delle transazioni o sulla costruzione dei payload di esecuzione potrebbe portare i client di consenso a finalizzare transazioni problematiche o con bug. Pertanto, Ethereum sarebbe più sano con una distribuzione più uniforme dei client di esecuzione, idealmente senza alcun client che rappresenti più del 33% della rete.

## Usa un client di minoranza {#use-minority-client}

Affrontare la diversità dei client richiede più che i singoli utenti scelgano client di minoranza: richiede che anche le pool di validatori e le istituzioni come le principali dApp e gli exchange cambino client. Tuttavia, tutti gli utenti possono fare la loro parte per correggere l'attuale squilibrio e normalizzare l'uso di tutto il software di Ethereum disponibile. Dopo Il Merge, a tutti gli operatori di nodi sarà richiesto di eseguire un client di esecuzione e un client di consenso. Scegliere combinazioni dei client suggeriti di seguito aiuterà ad aumentare la diversità dei client.

### Client di esecuzione {#execution-clients}

- [Besu](https://www.hyperledger.org/use/besu)
- [Nethermind](https://downloads.nethermind.io/)
- [Erigon](https://github.com/ledgerwatch/erigon)
- [Go-Ethereum](https://geth.ethereum.org/)
- [Reth](https://reth.rs/)

### Client di consenso {#consensus-clients}

- [Nimbus](https://nimbus.team/)
- [Lighthouse](https://github.com/sigp/lighthouse)
- [Teku](https://consensys.io/teku)
- [Lodestar](https://github.com/ChainSafe/lodestar)
- [Prysm](https://prysm.offchainlabs.com/docs/)
- [Grandine](https://docs.grandine.io/)

Gli utenti tecnici possono aiutare ad accelerare questo processo scrivendo più tutorial e documentazione per i client di minoranza e incoraggiando i loro colleghi operatori di nodi a migrare dai client dominanti. Le guide per passare a un client di consenso di minoranza sono disponibili su [clientdiversity.org](https://clientdiversity.org/).

## Dashboard sulla diversità dei client {#client-diversity-dashboards}

Diverse dashboard forniscono statistiche in tempo reale sulla diversità dei client per il livello di esecuzione e di consenso.

**Livello di consenso:**

- [Rated.network](https://www.rated.network/)
- [clientdiversity.org](https://clientdiversity.org/)

**Livello di esecuzione:**

- [supermajority.info](https://supermajority.info//)
- [Ethernodes](https://ethernodes.org/)

## Letture consigliate {#further-reading}

- [Diversità dei client sul livello di consenso di Ethereum](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA)
- [Il Merge di Ethereum: Esegui il client di maggioranza a tuo rischio e pericolo!](https://dankradfeist.de/ethereum/2022/03/24/run-the-majority-client-at-your-own-peril.html) – _Dankrad Fiest, 24 marzo 2022_
- [L'importanza della diversità dei client](https://our.status.im/the-importance-of-client-diversity/)
- [Elenco dei servizi di nodi di Ethereum](https://ethereumnodes.com/)
- [I "Cinque Perché" del problema della diversità dei client](https://notes.ethereum.org/@afhGjrKfTKmksTOtqhB9RQ/BJGj7uh08)
- [La diversità di Ethereum e come risolverla (YouTube)](https://www.youtube.com/watch?v=1hZgCaiqwfU)
- [clientdiversity.org](https://clientdiversity.org/)

## Argomenti correlati {#related-topics}

- [Esegui un nodo di Ethereum](/run-a-node/)
- [Nodi e client](/developers/docs/nodes-and-clients/)