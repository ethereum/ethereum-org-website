---
title: Scalabilità
description: Introduzione alle diverse opzioni di scalabilità attualmente in fase di sviluppo da parte della community Ethereum.
lang: it
sidebar: true
---

## Panoramica della scalabilità {#scaling-overview}

Poiché il numero di persone che usano Ethereum è aumentato, la blockchain ha raggiunto determinati limiti di capacità. Ciò ha aumentato il costo di utilizzo della rete, creando la necessità di "soluzioni di scalabilità". Ci sono molteplici soluzioni in fase di ricerca, sperimentazione e implementazione, che adottano approcci diversi per raggiungere obiettivi simili.

L'obiettivo principale della scalabilità è aumentare la velocità della transazione (finalità più veloce) e il volume di transazioni (numero elevato di transazioni al secondo), senza sacrificare la decentralizzazione o la sicurezza (maggiori informazioni su [Ethereum vision](/upgrades/vision/)). Sul livello 1 della blockchain Ethereum, la domanda elevata si traduce in transazioni più lente e prezzi del carburante impossibili. L'aumento della capacità della rete in termini di velocità e produttività è fondamentale per l'adozione significativa e di massa di Ethereum.

Anche se velocità e produttività sono aspetti importanti, è essenziale che le soluzioni di scalabilità che rendono possibili questi obiettivi rimangano decentralizzate e sicure. Mantenere una barriera all'ingresso bassa per gli operatori dei nodi è fondamentale per scongiurare una progressione verso una potenza di calcolo centralizzata e insicura.

A livello concettuale, per prima cosa occorre distinguere tra scalabilità on-chain o off-chain.

## Prerequisiti {#prerequisites}

Dovresti avere una buona conoscenza di tutti gli argomenti fondamentali. L'implementazione di soluzioni di scalabilità è un argomento avanzato, in quanto la tecnologia è meno collaudata sul campo e continua ad essere oggetto di ricerca e sviluppo.

## Scalabilità on-chain {#on-chain-scaling}

Questo metodo di scalabilità richiede modifiche al protocollo Ethereum ([rete principale](/glossary/#mainnet) di livello 1). Al momento lo sharding costituisce il focus principale di questo metodo di scalabilità.

### Sharding {#sharding}

Sharding è il processo di suddivisione orizzontale di un database per distribuire il carico. In un contesto Ethereum, lo sharding ridurrà la congestione della rete e aumenterà le transazioni al secondo creando nuove catene, note come "shard". Questo alleggerirà anche il carico per ogni validatore, che non dovrà più elaborare la totalità di tutte le transazioni sulla rete.

Ulteriori informazioni sullo [sharding](/upgrades/shard-chains/).

## Scalabilità off-chain {#off-chain-scaling}

Le soluzioni off-chain sono implementate separatamente dalla rete principale di livello 1 - non richiedono alcuna modifica al protocollo Ethereum esistente. Alcune soluzioni, note come soluzioni di "livello 2", derivano la loro sicurezza direttamente dal consenso di Ethereum livello 1, ad esempio [i rollup](/developers/docs/scaling/layer-2-rollups/) o [i canali di stato](/developers/docs/scaling/state-channels/). Altre soluzioni comportano la creazione di nuove catene in varie forme, che derivano la loro sicurezza separatamente dalla rete principale, come le [sidechain](#sidechains) o le catene [plasma](#plasma). Queste soluzioni comunicano con la rete principale, ma derivano la loro sicurezza in modo diverso per raggiungere una serie di obiettivi.

### Scalabilità di livello 2 {#layer-2-scaling}

Questa categoria di soluzioni off-chain trae la sua sicurezza dalla rete principale di Ethereum.

La maggior parte delle soluzioni di livello 2 è incentrata su un server o su un cluster di server, ognuno dei quali può essere denominato nodo, validatore, operatore, sequenziatore, block producer o simile. A seconda dell'implementazione, questi nodi di livello 2 possono essere gestiti da individui, aziende o entità che li usano, da operatori terzi o da un grande gruppo di individui (in modo simile alla rete principale). In linea generale, le transazioni vengono inviate a questi nodi di livello 2 anziché essere inviate direttamente al livello 1 (rete principale). Per alcune soluzioni, l'istanza di livello 2 le riunisce in gruppi prima di ancorarle al livello 1, a quel punto sono protette dal livello 1 e non possono essere alterate. I dettagli di questo processo variano notevolmente tra le diverse tecnologie di livello 2 e le varie implementazioni.

Un'istanza specifica di livello 2 può essere aperta e condivisa da molte applicazioni, oppure può essere implementata da un progetto e dedicata a sostenere solo quell'applicazione specifica.

#### Rollup {#rollups}

I rollup provvedono all'esecuzione delle transazioni al di fuori del livello 1, dopodiché i dati vengono inviati al livello 1, dove viene raggiunto il consenso. Mentre i dati delle transazioni vengono inclusi nei blocchi di livello 1, questo permette ai rollup di essere protetti dalla sicurezza nativa di Ethereum.

- [Rollup a conoscenza zero](/developers/docs/scaling/layer-2-rollups/#zk-rollups)
- [Rollup ottimistici](/developers/docs/scaling/layer-2-rollups/#optimistic-rollups)

Scopri di più sui [rollup](/developers/docs/scaling/layer-2-rollups/).

#### Canali di stato {#channels}

I canali di stato utilizzano contratti multisig per consentire ai partecipanti di effettuare transazioni rapidamente e liberamente fuori dalla catena, regolando la finalità con la rete principale. In questo modo si riduce al minimo la congestione della rete, le tariffe e i ritardi. Al momento esistono due tipi di canali: canali di stato e canali di pagamento.

Maggiori informazioni sui [canali di stato](/developers/docs/scaling/state-channels/).

### Sidechain {#sidechains}

Una sidechain è una blockchain indipendente compatibile con EVM che viene eseguita in parallelo alla rete principale. È compatibile con Ethereum tramite ponti bidirezionali e funziona secondo regole di consenso e parametri di blocco propri.

Maggiori informazioni sulle [sidechain](/developers/docs/scaling/sidechains/).

### Plasma {#plasma}

Una catena plasma è una blockchain separata e collegata alla catena principale Ethereum che utilizza le prove di frode (come i [rollup ottimistici](/developers/docs/scaling/layer-2-rollups/#optimistic-rollups)) per arbitrare le dispute.

Scopri di più sui [rollup](/developers/docs/scaling/plasma/).

## Perché sono necessarie così tante soluzioni di scalabilità? {#why-do-we-need-these}

- Soluzioni multiple possono contribuire a ridurre la congestione generale su qualsiasi parte della rete, nonché a evitare singoli punti di errore.
- Il tutto è superiore alla somma delle sue parti. Diverse soluzioni possono coesistere e lavorare in armonia, producendo un effetto esponenziale sulla velocità e la produttività delle transazioni future.
- Non tutte le soluzioni richiedono l'utilizzo dell'algoritmo di consenso di Ethereum direttamente, e le alternative possono offrire benefici che altrimenti sarebbero difficili da ottenere.
- Nessuna soluzione di scalabilità è sufficiente a soddisfare la [Ethereum vision](/upgrades/vision/).

## Preferisci un approccio visivo all'apprendimento? {#visual-learner}

<YouTube id="BgCgauWVTs0" />

_Nota che la spiegazione nel video usa il termine "Layer 2" per fare riferimento a tutte le soluzioni di scalabilità off-chain, mentre noi distinguiamo tra "Layer 2" come soluzione off-chain che deriva la sua sicurezza attraverso il consenso della rete principale di livello 1._

## Letture consigliate {#further-reading}

- [A rollup-centric Ethereum roadmap](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698) _Vitalik Buterin_
- [Analisi aggiornata sulle soluzioni di scala Layer 2 per Ethereum](https://www.l2beat.com/)
- [Valutazione delle soluzioni di scalabilità del livello 2 di Ethereum: un quadro di confronto](https://medium.com/matter-labs/evaluating-ethereum-l2-scaling-solutions-a-comparison-framework-b6b2f410f955)
- [Una guida incompleta ai rollup](https://vitalik.ca/general/2021/01/05/rollup.html)
- [Rollup ZK basati su Ethereum: fuoriclasse a livello mondiale](https://hackmd.io/@canti/rkUT0BD8K)

_Conosci una risorsa pubblica che ti è stata utile? Modifica questa pagina e aggiungila!_
