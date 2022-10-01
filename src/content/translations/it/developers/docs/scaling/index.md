---
title: Scalabilità
description: Introduzione alle diverse opzioni di scalabilità attualmente in fase di sviluppo da parte della community Ethereum.
lang: it
sidebarDepth: 3
---

## Panoramica della scalabilità {#scaling-overview}

Poiché il numero di persone che usano Ethereum è aumentato, la blockchain ha raggiunto determinati limiti di capacità. Ciò ha aumentato il costo di utilizzo della rete, creando la necessità di "soluzioni di scalabilità". Ci sono molteplici soluzioni in fase di ricerca, sperimentazione e implementazione, che adottano approcci diversi per raggiungere obiettivi simili.

L'obiettivo principale della scalabilità è aumentare la velocità della transazione (finalità più veloce) e il volume di transazioni (numero elevato di transazioni al secondo), senza sacrificare la decentralizzazione o la sicurezza (maggiori informazioni su [Ethereum vision](/upgrades/vision/)). Sulla blockchain di Ethereum di livello 1, l'elevata domanda conduce a transazioni più lente e [prezzi del gas](/developers/docs/gas/) impraticabili. L'aumento della capacità della rete in termini di velocità e produttività è fondamentale per una significativa adozione di massa di Ethereum.

Anche se velocità e produttività sono aspetti importanti, è essenziale che le soluzioni di scalabilità che rendono possibili questi obiettivi rimangano decentralizzate e sicure. Mantenere una barriera all'ingresso bassa per gli operatori dei nodi è fondamentale per scongiurare una progressione verso una potenza di calcolo centralizzata e insicura.

A livello concettuale, per prima cosa occorre distinguere tra scalabilità on-chain o off-chain.

## Prerequisiti {#prerequisites}

Dovresti avere una buona conoscenza di tutti gli argomenti fondamentali. L'implementazione di soluzioni di scalabilità è un argomento avanzato, in quanto la tecnologia è meno testata sul campo e continua ad essere oggetto di ricerca e sviluppo.

## Scalabilità on-chain {#on-chain-scaling}

Questo metodo di scalabilità richiede modifiche al protocollo Ethereum ([rete principale](/glossary/#mainnet) di livello 1). Al momento lo sharding costituisce il focus principale di questo metodo di scalabilità.

### Sharding {#sharding}

Sharding è il processo di suddivisione orizzontale di un database per distribuire il carico. In un contesto Ethereum, lo sharding ridurrà la congestione della rete e aumenterà le transazioni al secondo creando nuove catene, note come "shard". Questo alleggerirà anche il carico per ogni validatore, che non dovrà più elaborare la totalità di tutte le transazioni sulla rete.

Ulteriori informazioni sullo [sharding](/upgrades/sharding/).

## Scalabilità off-chain {#off-chain-scaling}

Le soluzioni off-chain sono implementate separatamente dalla rete principale di livello 1 - non richiedono alcuna modifica al protocollo Ethereum esistente. Alcune soluzioni, note come soluzioni di "livello 2", derivano la loro sicurezza direttamente dal consenso del livello 1 di Ethereum, come i [rollup ottimistici](/developers/docs/scaling/optimistic-rollups/), i [rollup a conoscenza zero](/developers/docs/scaling/zk-rollups/) o i [canali di stato](/developers/docs/scaling/state-channels/). Altre soluzioni comportano la creazione di nuove catene in varie forme, che derivano la loro sicurezza separatamente dalla rete principale, come le [sidechain](#sidechains) o le catene [plasma](#plasma). Queste soluzioni comunicano con la rete principale, ma derivano la loro sicurezza in modo diverso per raggiungere una serie di obiettivi.

### Scalabilità di livello 2 {#layer-2-scaling}

Questa categoria di soluzioni off-chain trae la sua sicurezza dalla rete principale di Ethereum.

Livello 2 è un termine collettivo per le soluzioni progettate per aiutare a ridimensionare la tua applicazione gestendo le transazioni al di fuori della rete principale di Ethereum (livello 1), sfruttando il robusto modello di sicurezza decentralizzato della Rete principale. La velocità delle transazioni ne risente quando la rete è molto carica, e l'esperienza utente può risultare poco piacevole per alcuni tipi di dApp. E, man mano che la rete si congestiona, i prezzi del gas aumentano mentre i mittenti delle transazioni mirano a superarsi a vicenda. Ciò può rendere l'utilizzo di Ethereum alquanto dispendioso.

Gran parte delle soluzioni del Livello 2 sono incentrate su un server o un gruppo di server, ognuno dei quali potrebbe essere definito nodo, validatore, operatore, sequenziatore, produttore di blocchi o termini simili. In base all'implementazione, questi nodi di Livello 2 potrebbero essere eseguiti da singoli individui, aziende o entità che li usano, da un operatore di terze parti o da un grande gruppo di individui (in modo simile alla Rete principale). In generale, le transazioni sono inviate a questi nodi del Livello 2, anziché essere inviate direttamente al Livello 1 (Rete principale). Per alcune soluzioni, l'istanza del Livello 2 le riunisce poi in gruppi, prima di ancorarle al Livello 1, dopodiché sono protette dal Livello 1 e non sono alterabili. I dettagli di tale processo variano significativamente tra le diverse tecnologie e implementazioni del Livello 2.

Un'istanza specifica del Livello 2 potrebbe essere aperta e condivisa da molte applicazioni o essere distribuita da un progetto e dedicata a supportare solo la propria applicazione.

#### Perché il Livello 2 è necessario? {#why-is-layer-2-needed}

- L'aumento delle transazioni al secondo migliora notevolmente l'esperienza utente e riduce la congestione della rete sulla Mainnet di Ethereum.
- Le transazioni sono raggruppate in una singola transazione sulla Rete principale di Ethereum, riducendo il prezzo del gas per gli utenti e rendendo Ethereum più inclusivo e accessibile per le persone da tutto il mondo.
- Qualunque aggiornamento alla scalabilità non dovrebbe sacrificare decentralizzazione e sicurezza - il livello 2 è basato su Ethereum.
- Esistono reti di livello 2 specifiche per le applicazioni che sfruttano le proprie efficienze lavorando con risorse su scala.

#### Rollup {#rollups}

I rollup eseguono le transazioni al di fuori del Livello 1, dopodiché i dati vengono pubblicati al Livello 1, dove viene raggiunto il consenso. Poiché i dati della transazione sono inclusi nei blocchi del Livello 1, ciò consente ai rollup di essere protetti dalla sicurezza nativa di Ethereum.

Esistono due tipi di rollup con diversi modelli di sicurezza:

- **Rollup ottimistici**: presumono che le transazioni siano valide di default ed eseguono solo il calcolo, tramite una [**prova di frode**](/glossary/#fraud-proof), nel caso di una contestazione. [Maggiori informazioni sui rollup ottimistici](/developers/docs/scaling/optimistic-rollups/).
- **Rollup a conoscenza zero**: esegue il calcolo al di fuori della catena e invia una [**prova di validità**](/glossary/#validity-proof) alla catena. [Maggiori informazioni sui rollup a conoscenza zero](/developers/docs/scaling/zk-rollups/).

#### Canali di stato {#channels}

I canali di stato utilizzano contratti multi-firma per consentire ai partecipanti di effettuare transazioni rapidamente e liberamente al di fuori della catena, regolando poi la finalizzazione con la Rete principale. In questo modo si riduce la congestione, le commissioni e i ritardi sulla rete. Al momento esistono due tipi di canali: canali di stato e canali di pagamento.

Maggiori informazioni sui [canali di stato](/developers/docs/scaling/state-channels/).

### Sidechain {#sidechains}

Una sidechain è una blockchain indipendente compatibile con EVM che viene eseguita in parallelo alla rete principale. È compatibile con Ethereum tramite ponti bidirezionali e funziona secondo regole di consenso e parametri di blocco propri.

Maggiori informazioni sulle [sidechain](/developers/docs/scaling/sidechains/).

### Plasma {#plasma}

Una catena plasma è una blockchain separata ancorata alla catena principale di Ethereum, che utilizza le prove di frode (come i [rollup ottimistici](/developers/docs/scaling/optimistic-rollups/)) per arbitrare le dispute.

Scopri di più sui [rollup](/developers/docs/scaling/plasma/).

### Validium {#validium}

Una catena di Validum usa le prove di validità come i rollup a conoscenza zero, ma i dati non sono memorizzati sulla catena di livello 1 principale di Ethereum. Questo può tradursi in 10.000 transazioni al secondo per la catena di Validium, con più catene eseguibili in parallelo.

Scopri di più su [Validium](/developers/docs/scaling/validium/).

## Perché sono necessarie così tante soluzioni di scalabilità? {#why-do-we-need-these}

- Soluzioni multiple possono contribuire a ridurre la congestione generale su qualsiasi parte della rete, nonché a evitare singoli punti di errore.
- Il tutto è superiore alla somma delle sue parti. Diverse soluzioni possono coesistere e lavorare in armonia, producendo un effetto esponenziale sulla velocità e la produttività delle transazioni future.
- Non tutte le soluzioni richiedono l'utilizzo dell'algoritmo di consenso di Ethereum direttamente, e le alternative possono offrire benefici che altrimenti sarebbero difficili da ottenere.
- Nessuna soluzione di scalabilità è sufficiente a soddisfare la [visione di Ethereum](/upgrades/vision/).

## Preferisci un approccio visivo all'apprendimento? {#visual-learner}

<YouTube id="BgCgauWVTs0" />

_Nota che la spiegazione nel video usa il termine "Livello 2" per riferirsi a tutte le soluzioni di ridimensionamento esterne alla catena, mentre noi distinguiamo il "Livello 2" come soluzione esterna alla catena, la cui sicurezza deriva dal consenso del Livello 1 (Rete principale)._

<YouTube id="7pWxCklcNsU" />

## Letture consigliate {#further-reading}

- [A rollup-centric Ethereum roadmap](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698) _Vitalik Buterin_
- [Statistiche aggiornate sulle soluzioni di ridimensionamento del Livello 2 per Ethereum](https://www.l2beat.com/)
- [Valutare le soluzioni di scalabilità del Livello 2 di Ethereum: un quadro di confronto](https://medium.com/matter-labs/evaluating-ethereum-l2-scaling-solutions-a-comparison-framework-b6b2f410f955)
- [Una guida incompleta ai rollup](https://vitalik.ca/general/2021/01/05/rollup.html)
- [Rollup ZK basati su Ethereum: fuoriclasse a livello mondiale](https://hackmd.io/@canti/rkUT0BD8K)
- [Rollup ottimistici vs Rollup ZK](https://limechain.tech/blog/optimistic-rollups-vs-zk-rollups/)
- [Scalabilità della blockchain a conoscenza zero](https://ethworks.io/assets/download/zero-knowledge-blockchain-scaling-ethworks.pdf)
- [Perché i rollup e i frammenti di dati sono la sola soluzione sostenibile per un'elevata scalabilità](https://polynya.medium.com/why-rollups-data-shards-are-the-only-sustainable-solution-for-high-scalability-c9aabd6fbb48)

_Conosci una risorsa della community che ti è stata utile? Modifica questa pagina e aggiungila!_
