---
title: Frammentazione
description: "Impara sulla frammentazione: spezzare e distribuire il carico di dati necessario a dare a Ethereum una maggiore capacità di transazione e semplificarne l'esecuzione."
lang: it
template: upgrade
image: ../../../../../assets/upgrades/newrings.png
summaryPoint1: Lo sharding è un aggiornamento multi-fase per migliorare la scalabilità e la capacità di Ethereum.
summaryPoint2: La frammentazione fornisce la distribuzione sicura dei requisiti d'archiviazione dei dati, consentendo ai rollup di esser persino più economici e di semplificare l'operazione dei nodi.
summaryPoint3: Consentono alle soluzioni del livello 2 di offrire commissioni di transazione contenute, sfruttando la sicurezza di Ethereum.
summaryPoint4: Questo aggiornamento è diventato più di un punto focale, da quando Ethereum è passato al proof-of-stake.
---

<UpgradeStatus dateKey="page-upgrades-shards-date">
    La frammentazione potrebbe esser lanciata verso il 2023. I frammenti daranno a Ethereum una maggiore capacità di archiviazione e accesso ai dati, ma non saranno usati per eseguire il codice.
</UpgradeStatus>

## Cos'è lo sharding? {#what-is-sharding}

Lo sharding è il processo con cui un database viene suddiviso orizzontalmente per ripartire il carico. È un concetto comune in informatica. In un contesto di Ethereum, la frammentazione opererà sinergicamente con i [rollup di livello 2](/layer-2/), dividendo l'onere di gestire la grande quantità di dati necessaria ai rollup sull'intera rete. Questo continuerà a ridurre la congestione di rete e aumenterà le transazioni al secondo.

Questo aspetto è importante per altri motivi oltre alla scalabilità.

## Caratteristiche dello sharding {#features-of-sharding}

### Chiunque può eseguire un nodo {#everyone-can-run-a-node}

Lo sharding è un buon modo per permettere l'espansione mantenendo la decentralizzazione, dato che l'alternativa sarebbe quella di aumentare la dimensione del database esistente. Questo renderebbe Ethereum meno accessibile da parte dei validatori della rete perché avrebbero bisogno di computer più potenti e costosi. Con la frammentazione, i validatori non dovranno più memorizzare tutti questi dati da soli, ma potranno invece usare tecniche di dati per confermare che essi siano stati resi disponibili dall'intera rete. Ciò riduce drasticamente il costo d'archiviazione dei dati sul livello 1, riducendo i requisiti hardware.

### Più partecipazione nella rete {#more-network-participation}

Lo sharding alla fine permetterà di eseguire Ethereum su un computer portatile o un cellulare. Più persone quindi dovrebbero essere in grado di partecipare o eseguire [client](/developers/docs/nodes-and-clients/). Questo migliorerà la sicurezza, perché in una rete più decentralizzata la superficie di attacco è inferiore.

Con requisiti hardware minori, lo sharding faciliterà l'esecuzione dei [client](/developers/docs/nodes-and-clients/) e non sarà necessario affidarsi a intermediari. Se puoi, prendi in considerazione la possibilità di eseguire più client. Questo può aiutare la salute della rete, riducendo ulteriormente i punti di errore.

<br />

<InfoBanner isWarning>
  Dovrai operare un client d'esecuzione, al contempo del tuo client del consenso. <a href="https://launchpad.ethereum.org" target="_blank">Il launchpad</a> ti mostrerà i requisiti hardware e il processo.
</InfoBanner>

## Shard chain versione 1: disponibilità dei dati {#data-availability}

<InfoBanner emoji=":construction:" isWarning>
  <strong>Nota:</strong> I piani per la frammentazione si stanno evolvendo allo sviluppo di percorsi più efficienti per scalare. Il "danksharding" è un nuovo approccio alla frammentazione, che non utilizza il concetto di "catene" di frammenti, ma usa invece dei "blob" di frammenti per dividere i dati, insieme alla "campionatura della disponibilità dei dati" per confermare che tutti i dati siano stati resi disponibili. Questo cambio di piani risolve lo stesso problema originale.<br/><br/>
  <strong>I dettagli seguenti potrebbero essere obsoleti rispetto ai piani di sviluppo più recenti.</strong>.
Mentre aggiorniamo le cose, dai un'occhiata a <a href="https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum">La Guida per Autostoppisti a Ethereum</a> per un'eccellente spiegazione della tabella di marcia di Ethereum.
</InfoBanner>

Le prime shard chain disponibili forniranno solo dati aggiuntivi in rete. Non gestiranno le transazioni o gli Smart Contract. Garantiranno comunque incredibili miglioramenti al numero di transazioni al secondo quando combinate ai rollup.

I rollup sono una tecnologia di secondo livello che esiste già oggi. Permettono alle dapp di raggruppare o "eseguire il roll up" delle transazioni in una sola transazione off-chain, generare una prova crittografica e inviarla alla catena. In questo modo, i dati necessari per una transazione vengono ridotti. Combinando questo aspetto con le informazioni extra rese disponibili dalle shard, s ottengono 100.000 transazioni al secondo.

## Shard chain versione 2: esecuzione di codice {#code-execution}

Il piano è sempre stato quello di aggiungere ulteriori funzionalità agli shard, per renderli più simili a quello che è oggi la [rete principale Ethereum](/glossary/#mainnet). Questo consentirebbe loro di memorizzare ed eseguire il codice e gestire le transazioni, poiché ogni frammento conterrebbe la propria serie univoca di smart contract e saldi di conti. La comunicazione incrociata tra frammenti consentirebbe l'esecuzione di transazioni tra i vari frammenti.

Tuttavia, considerando l'aumento di transazioni al secondo che i frammenti di versione 1 forniscono, ce n'è ancora bisogno? La questione è tuttora oggetto di dibattito all'interno della community e sembrano esserci alcune opzioni.

### Gli shard devono eseguire codice? {#do-shards-need-code-execution}

Vitalik Buterin, parlando al podcast Bankless, ha presentato 3 potenziali opzioni di cui vale la pena discutere.

<YouTube id="-R0j5AMUSzA" start="5841" />

#### 1. Esecuzione di stato non necessaria {#state-execution-not-needed}

Significa che non diamo agli shard la possibilità di gestire gli smart contract e li utilizziamo solo come depositi di dati.

#### 2. Inserire alcuni shard di esecuzione {#some-execution-shards}

Forse, esiste un compromesso per cui non tutti i frammenti debbano esser più intelligenti. Potremmo semplicemente aggiungere questa funzionalità ad alcuni shard e tralasciare gli altri, velocizzando potenzialmente la consegna.

#### 3. Attendere finché non possiamo implementare il Zero Knowledge (ZK) snark {#wait-for-zk-snarks}

Infine, forse dovremmo riprendere questo dibattito una volta consolidati gli ZK snark. Si tratta di una tecnologia che potrebbe contribuire a garantire transazioni veramente private sulla rete. È probabile che saranno necessari shard più intelligenti, ma sono ancora in fase di ricerca e sviluppo.

#### Altre risorse {#other-sources}

Ecco altre considerazioni sullo stesso argomento:

- [Phase One and Done: Eth2 as a data availability engine](https://ethresear.ch/t/phase-one-and-done-eth2-as-a-data-availability-engine/5269/8) – _cdetrio, ethresear.ch_

Questo è ancora argomento di discussione. Aggiorneremo le pagine quando ne sapremo di più.

## Relazioni tra aggiornamenti {#relationship-between-upgrades}

Gli aggiornamenti di Ethereum sono tutti in qualche modo interconnessi. Quindi riassumiamo in che modo le shard chain si collegano agli altri aggiornamenti.

### I frammenti e la blockchain di Ethereum {#shards-and-blockchain}

La logica per mantenere i frammenti protetti e sincronizzati è integrata tutta nei client di Ethereum che costruiscono la blockchain. Gli staker nella rete saranno assegnati ai frammenti su cui lavorare. I frammenti avranno accesso alle istantanee degli altri frammenti, così da poter creare una vista dello stato di Ethereum per mantenere tutto aggiornato.

### Ulteriori contenuti {#read-more}

<ShardChainsList />
