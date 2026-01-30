---
title: Ridimensionamento
description: Introduzione alle diverse opzioni di scalabilità attualmente in fase di sviluppo da parte della community Ethereum.
lang: it
sidebarDepth: 3
---

## Panoramica sul ridimensionamento {#scaling-overview}

Poiché il numero di persone che usano Ethereum è aumentato, la blockchain ha raggiunto determinati limiti di capacità. Ciò ha aumentato il costo di utilizzo della rete, creando la necessità di "soluzioni di scalabilità". Ci sono molteplici soluzioni in fase di ricerca, sperimentazione e implementazione, che adottano approcci diversi per raggiungere obiettivi simili.

L'obiettivo principale della scalabilità è aumentare la velocità delle transazioni (finalità più rapida) e il volume delle transazioni (maggior numero di transazioni al secondo), senza sacrificare la decentralizzazione o la sicurezza. Sulla blockchain di livello 1 di Ethereum, un'elevata domanda porta a transazioni più lente e [prezzi del gas](/developers/docs/gas/) impraticabili. L'aumento della capacità della rete in termini di velocità e produttività è fondamentale per una significativa adozione di massa di Ethereum.

Anche se velocità e produttività sono aspetti importanti, è essenziale che le soluzioni di scalabilità che rendono possibili questi obiettivi rimangano decentralizzate e sicure. Mantenere una barriera all'ingresso bassa per gli operatori dei nodi è fondamentale per scongiurare una progressione verso una potenza di calcolo centralizzata e insicura.

A livello concettuale, classifichiamo innanzitutto lo scaling come scaling on-chain o scaling off-chain.

## Prerequisiti {#prerequisites}

Dovresti avere una buona conoscenza di tutti gli argomenti fondamentali. L'implementazione di soluzioni di scalabilità è un argomento avanzato, in quanto la tecnologia è meno testata sul campo e continua ad essere oggetto di ricerca e sviluppo.

## Ridimensionamento on-chain {#onchain-scaling}

Il ridimensionamento on-chain richiede modifiche al protocollo Ethereum (livello 1 [Rete Principale](/glossary/#mainnet)). Per molto tempo si è pensato che lo sharding della blockchain avrebbe ridimensionato Ethereum. Questo avrebbe coinvolto la divisione della blockchain in pezzi discreti (shard), che sarebbero stati verificati da sottoinsiemi dei validatori. Tuttavia, il ridimensionamento dai rollup di livello 2 ha preso il controllo come la tecnica di ridimensionamento principale. Questa è supportata dall'aggiunta di una nuova e più economica forma di dati connessi ai blocchi di Ethereum, progettati specificamente per rendere i rollup economici per gli utenti.

### Frammentazione {#sharding}

Lo sharding è il processo di frammentazione di un database. Sottoinsiemi di validatori sarebbero responsabili dei singoli shard invece di tenere traccia di tutta la rete Ethereum. La frammentazione è stata a lungo sulla [tabella di marcia](/roadmap/) di Ethereum, e una volta era destinata a essere distribuita prima della Fusione al proof-of-stake. Tuttavia, il rapido sviluppo dei [rollup di livello 2](#layer-2-scaling) e l'invenzione del [Danksharding](/roadmap/danksharding) (l'aggiunta di blob di dati rollup ai blocchi di Ethereum, verificabili in modo molto efficiente dai validatori) ha portato la comunità di Ethereum a preferire un ridimensionamento incentrato sui rollup anziché tramite sharding. Ciò aiuterà anche a mantenere più semplice la logica del consenso di Ethereum.

## Ridimensionamento off-chain {#offchain-scaling}

Le soluzioni esterne alla blockchain sono implementate separatamente dagli aggiornamenti della Rete Principale - infatti non richiedono alcun cambiamento al protocollo Ethereum esistente. Alcune soluzioni, note come soluzioni di "livello 2", derivano la propria sicurezza direttamente dal consenso del livello 1 di Ethereum, come i [rollup ottimistici](/developers/docs/scaling/optimistic-rollups/), i [rollup a conoscenza-zero](/developers/docs/scaling/zk-rollups/) o i [canali di stato](/developers/docs/scaling/state-channels/). Altre soluzioni prevedono la creazione di nuove catene in varie forme che derivano la loro sicurezza separatamente dalla Rete Principale, come le [catene laterali](#sidechains), i [validium](#validium) o le [catene plasma](#plasma). Queste soluzioni comunicano con la Rete Principale, ma derivano la loro sicurezza in modo diverso per raggiungere una varietà di obiettivi.

### Ridimensionamento di livello 2 {#layer-2-scaling}

Questa categoria di soluzioni offchain prende la sua sicurezza dalla Mainnet Ethereum.

Livello 2 è un termine collettivo per le soluzioni progettate per aiutare a ridimensionare la tua applicazione gestendo le transazioni al di fuori della rete principale di Ethereum (livello 1), sfruttando il robusto modello di sicurezza decentralizzato della Rete principale. La velocità delle transazioni ne risente quando la rete è molto carica, e l'esperienza utente può risultare poco piacevole per alcuni tipi di dApp. E, man mano che la rete si congestiona, i prezzi del carburante aumentano mentre i mittenti delle transazioni mirano a superarsi a vicenda. Ciò può rendere l'utilizzo di Ethereum alquanto dispendioso.

La maggior parte delle soluzioni di livello 2 è incentrata su un server o su un cluster di server, ognuno dei quali può essere denominato nodo, validatore, operatore, sequenziatore, produttore di blocchi o termini simili. A seconda dell'implementazione, questi nodi di livello 2 possono essere gestiti da persone, aziende o entità che li usano, da operatori terzi o da un grande gruppo di individui (in modo simile alla Rete principale). In linea generale, le transazioni vengono inviate a questi nodi di livello 2 anziché essere inviate direttamente al livello 1 (Rete principale). Per alcune soluzioni, l'istanza di livello 2 le raggruppa in batch prima di ancorarle al livello 1, dopodiché vengono protette dal livello 1 e non possono essere modificate. I dettagli dell'esecuzione vera e propria variano notevolmente tra le varie tecnologie e implementazioni di livello 2.

Un'istanza specifica del Livello 2 potrebbe essere aperta e condivisa da molte applicazioni o essere distribuita da un progetto e dedicata a supportare solo la propria applicazione.

#### Perché il Livello 2 è necessario? {#why-is-layer-2-needed}

- L'aumento delle transazioni al secondo migliora notevolmente l'esperienza utente e riduce la congestione della rete sulla Mainnet di Ethereum.
- Le transazioni vengono raggruppate in un'unica transazione sulla Rete Principale di Ethereum, riducendo le commissioni sul gas per gli utenti, rendendo Ethereum più inclusivo e accessibile alle persone di tutto il mondo.
- Qualunque aggiornamento alla scalabilità non dovrebbe sacrificare decentralizzazione e sicurezza - il livello 2 è basato su Ethereum.
- Esistono reti di livello 2 specifiche per le applicazioni che apportano una propria serie di efficienze quando si lavora con asset su larga scala.

[Maggiori informazioni sul livello 2](/layer-2/).

#### Rollup {#rollups}

I rollup eseguono le transazioni al di fuori del livello 1, dopodiché i dati vengono pubblicati al livello 1, dove viene raggiunto il consenso. Poiché i dati della transazione sono inclusi nei blocchi del livello 1, ciò consente ai rollup di essere protetti dalla sicurezza nativa di Ethereum.

Ci sono due tipi di rollup con diversi modelli di sicurezza:

- **Rollup ottimistici**: presuppongono che le transazioni siano valide per impostazione predefinita ed eseguono il calcolo, tramite una [**prova di frode**](/glossary/#fraud-proof), solo in caso di contestazione. [Maggiori informazioni sui rollup ottimistici](/developers/docs/scaling/optimistic-rollups/).
- **Rollup a conoscenza-zero**: eseguono i calcoli off-chain e inviano una [**prova di validità**](/glossary/#validity-proof) alla catena. [Maggiori informazioni sui rollup a conoscenza-zero](/developers/docs/scaling/zk-rollups/).

#### Canali di stato {#channels}

I canali statali utilizzano contratti multisig per consentire ai partecipanti di effettuare transazioni in modo rapido e libero fuori dalla catena, per poi regolare la finalità con Mainnet. In questo modo si riducono al minimo la congestione, le commissioni e i ritardi sulla rete. Al momento esistono due tipi di canali: canali di stato e canali di pagamento.

Scopri di più sui [canali di stato](/developers/docs/scaling/state-channels/).

### Catene laterali {#sidechains}

Una catena laterale è una blockchain indipendente compatibile con l'EVM che funziona in parallelo alla Rete Principale. Sono compatibili con Ethereum tramite ponti bidirezionali e funzionano secondo le proprie regole di consenso e i propri parametri dei blocchi.

Scopri di più sulle [catene laterali](/developers/docs/scaling/sidechains/).

### Plasma {#plasma}

Una catena plasma è una blockchain separata, ancorata alla catena principale di Ethereum, che utilizza prove di frode (come i [rollup ottimistici](/developers/docs/scaling/optimistic-rollups/)) per arbitrare le dispute.

Scopri di più su [Plasma](/developers/docs/scaling/plasma/).

### Validium {#validium}

Una catena Validum usa le prove di validità come i rollup a conoscenza zero, ma i dati non sono memorizzati sulla catena di livello 1 principale di Ethereum. Questo può tradursi in 10.000 transazioni al secondo per catena Validium, con la possibilità di eseguire più catene in parallelo.

Scopri di più su [Validium](/developers/docs/scaling/validium/).

## Perché sono necessarie così tante soluzioni di scalabilità? {#why-do-we-need-these}

- Molteplici soluzioni possono contribuire a ridurre la congestione generale su qualsiasi parte della rete, nonché a evitare singoli punti di errore.
- Il tutto è superiore alla somma delle sue parti. Diverse soluzioni possono coesistere e lavorare in armonia, producendo un effetto esponenziale sulla velocità e la produttività delle transazioni future.
- Non tutte le soluzioni richiedono l'utilizzo dell'algoritmo di consenso di Ethereum direttamente, e le alternative possono offrire benefici che altrimenti sarebbero difficili da ottenere.

## Preferisci un approccio visivo all'apprendimento? {#visual-learner}

<YouTube id="BgCgauWVTs0" />

_Si noti che la spiegazione nel video utilizza il termine “Layer 2” per riferirsi a tutte le soluzioni di scalabilità off-chain, mentre noi distinguiamo il “Layer 2” come una soluzione off-chain che deriva la sua sicurezza attraverso il consenso Mainnet del layer 1._

<YouTube id="7pWxCklcNsU" />

## Letture consigliate {#further-reading}

- [Una tabella di marcia di Ethereum incentrata sui rollup](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698) _Vitalik Buterin_
- [Analisi aggiornate sulle soluzioni di ridimensionamento di livello 2 per Ethereum](https://www.l2beat.com/)
- [Evaluating Ethereum layer 2 Scaling Solutions: A Comparison Framework](https://medium.com/matter-labs/evaluating-ethereum-l2-scaling-solutions-a-comparison-framework-b6b2f410f955)
- [Una guida incompleta ai rollup](https://vitalik.eth.limo/general/2021/01/05/rollup.html)
- [Ethereum-powered ZK-Rollups: World Beaters](https://hackmd.io/@canti/rkUT0BD8K)
- [Rollup ottimistici e rollup ZK a confronto](https://limechain.tech/blog/optimistic-rollups-vs-zk-rollups/)
- [Perché i rollup e i data shard sono l'unica soluzione sostenibile per un'elevata scalabilità](https://polynya.medium.com/why-rollups-data-shards-are-the-only-sustainable-solution-for-high-scalability-c9aabd6fbb48)
- [Che tipo di livello 3 ha senso?](https://vitalik.eth.limo/general/2022/09/17/layer_3.html)
- [Data Availability Or: How Rollups Learned To Stop Worrying And Love Ethereum](https://web.archive.org/web/20250515194659/https://web.archive.org/web/20241108192208/https://research.2077.xyz/data-availability-or-how-rollups-learned-to-stop-worrying-and-love-ethereum)
- [La guida pratica ai rollup di Ethereum](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)

_Conosci una risorsa della comunità che ti è stata utile? Modifica questa pagina e aggiungila!_
