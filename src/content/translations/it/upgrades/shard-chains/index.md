---
title: Shard chain
description: "Scopri le shard chain: partizioni della rete che assicurano a Ethereum più capacità di transazione e maggior facilità di esecuzione."
lang: it
template: upgrade
sidebar: true
image: ../../../../../assets/upgrades/newrings.png
summaryPoint1: Lo sharding è un aggiornamento multi-fase per migliorare la scalabilità e la capacità di Ethereum.
summaryPoint2: Le shard chain distribuiscono il carico della rete su 64 nuove chain.
summaryPoint3: Rendono più facile l'esecuzione di un nodo mantenendo bassi i requisiti hardware.
summaryPoint4: Questo aggiornamento è previsto per seguire la fusione della Mainnet con la Beacon Chain.
---

<UpgradeStatus dateKey="page-upgrades-shards-date">
    Le shard chain dovrebbero essere disponibili a un certo punto nel 2023, a seconda della velocità di avanzamento dei lavori dopo <a href="/upgrades/merge/">la fusione</a>. Queste shard garantiranno a Ethereum più capacità di archiviazione e acceso ai dati, ma non verranno usate per eseguire codice. I dettagli sono ancora da chiarire.
</UpgradeStatus>

## Cos'è lo sharding? {#what-is-sharding}

Lo sharding è il processo con cui un database viene suddiviso orizzontalmente per ripartire il carico. È un concetto comune in informatica. Nel contesto di Ethereum, ridurrà la congestione della rete e aumenterà il numero di transazioni al secondo creando nuove catene, dette "shard".

Questo aspetto è importante per altri motivi oltre alla scalabilità.

## Caratteristiche dello sharding {#features-of-sharding}

### Chiunque può eseguire un nodo {#everyone-can-run-a-node}

Lo sharding è un buon modo per permettere l'espansione mantenendo la decentralizzazione, dato che l'alternativa sarebbe quella di aumentare la dimensione del database esistente. Questo renderebbe Ethereum meno accessibile da parte dei validatori della rete perché avrebbero bisogno di computer più potenti e costosi. Con le shard chain, i validatori dovranno solo salvare/eseguire i dati dello shard che stanno convalidando e non dell'intera rete (come succede ora). Tutto questo aumenta la rapidità e riduce drasticamente i requisiti hardware.

### Più partecipazione nella rete {#more-network-participation}

Lo sharding alla fine permetterà di eseguire Ethereum su un computer portatile o un cellulare. Più persone quindi dovrebbero essere in grado di partecipare o eseguire [client](/developers/docs/nodes-and-clients/). Questo migliorerà la sicurezza, perché in una rete più decentralizzata la superficie di attacco è inferiore.

Con requisiti hardware minori, lo sharding faciliterà l'esecuzione dei [client](/developers/docs/nodes-and-clients/) e non sarà necessario affidarsi a intermediari. Se puoi, prendi in considerazione la possibilità di eseguire più client. Questo può aiutare la salute della rete, riducendo ulteriormente i punti di errore. [Esegui un client della Beacon Chain](/upgrades/get-involved/)

<br />

<InfoBanner isWarning={true}>
  Dapprima, dovrai eseguire un client della Mainnet al contempo del tuo client della Beacon Chain. <a href="https://launchpad.ethereum.org" target="_blank">Il launchpad</a> ti mostrerà i requisiti hardware e il processo. In alternativa, puoi usare un'<a href="/developers/docs/apis/backend/#available-libraries">API backend</a>.
</InfoBanner>

## Shard chain versione 1: disponibilità dei dati {#data-availability}

Le prime shard chain disponibili forniranno solo dati aggiuntivi in rete. Non gestiranno le transazioni o gli Smart Contract. Garantiranno comunque incredibili miglioramenti al numero di transazioni al secondo quando combinate ai rollup.

I rollup sono una tecnologia di secondo livello che esiste già oggi. Permettono alle dapp di raggruppare o "eseguire il roll up" delle transazioni in una sola transazione off-chain, generare una prova crittografica e inviarla alla catena. In questo modo, i dati necessari per una transazione vengono ridotti. Combinando questo aspetto con le informazioni extra rese disponibili dalle shard, s ottengono 100.000 transazioni al secondo.

<InfoBanner isWarning={false}>
  Dati i recenti progressi nella ricerca e nello sviluppo di soluzioni di scalabilità di livello 2, si è reso necessario dare la precedenza all'aggiornamento della fusione rispetto alle shard chain. Questi saranno i punti focali dopo la transizione della rete principale al proof of stake.

[Maggiori informazioni sui rollup](/developers/docs/scaling/layer-2-rollups/)
</InfoBanner>

## Shard chain versione 2: esecuzione di codice {#code-execution}

Il piano è sempre stato quello di aggiungere ulteriori funzionalità agli shard, per renderli più simili a quello che è oggi la [rete principale Ethereum](/glossary/#mainnet). Ciò consentirebbe loro di memorizzare ed eseguire smart contract e gestire gli account. Ma considerando il maggior numero di transazioni al secondo reso possibile dalle shard chain versione 1, ce n'è ancora bisogno? La questione è tuttora in fase di dibattito all'interno della community e sembra ci siano poche alternative.

### Gli shard devono eseguire codice? {#do-shards-need-code-execution}

Durante il suo intervento nel podcast Bankless, Vitalik Buterin ha presentato 3 potenziali opzioni di cui vale la pena discutere.

<YouTube id="-R0j5AMUSzA" start="5841" />

#### 1. Esecuzione di stato non necessaria {#state-execution-not-needed}

Significa che non diamo la possibilità agli shard di gestire gli Smart Contract e li utilizziamo solo come depositi di dati.

#### 2. Inserire alcuni shard di esecuzione {#some-execution-shards}

Forse c'è un compromesso che permette di non implementare tutti gli shard (al momento ne sono previsti 64) per avere una soluzione più smart. Potremmo semplicemente aggiungere questa funzionalità ad alcuni shard e tralasciare gli altri. Potrebbe velocizzare la consegna.

#### 3. Attendere finché non possiamo implementare il Zero Knowledge (ZK) snark {#wait-for-zk-snarks}

Infine, forse dovremmo riformulare questo dibattito quando gli ZK snark sono consolidati. Questa è una tecnologia che potrebbe contribuire a garantire transazioni veramente private sulla rete. È probabile che saranno necessari shard più intelligenti, ma sono ancora in fase di ricerca e sviluppo.

#### Altre risorse {#other-sources}

Ecco altre considerazioni sullo stesso argomento:

- [Phase One and Done: Eth2 as a data availability engine](https://ethresear.ch/t/phase-one-and-done-eth2-as-a-data-availability-engine/5269/8) – _cdetrio, ethresear.ch_

Questo è ancora argomento di discussione. Aggiorneremo le pagine quando ne sapremo di più.

## Relazioni tra aggiornamenti {#relationship-between-upgrades}

Gli aggiornamenti di Ethereum sono tutti in qualche modo interconnessi. Quindi riassumiamo come le shard chain sono in relazione con gli altri aggiornamenti.

### Shard e beacon chain {#shards-and-beacon-chain}

Le beacon chain contengono tutti i processi logici per garantire la protezione e la sincronizzazione degli shard. Esse coordinano gli staker nella rete, assegnandoli agli shard su cui dovranno operare. Faciliterà inoltre la comunicazione tra gli shard, ricevendo e salvando i dati delle transazioni degli shard che saranno accessibili da parte degli altri shard. Gli shard avranno così un'istantanea dello stato di Ethereum per mantenere tutto aggiornato.

<ButtonLink to="/upgrades/beacon-chain/">
  La beacon chain
</ButtonLink>

### Gli shard e la fusione {#shards-and-docking}

Per quando verranno aggiunti degli shard aggiuntivi, la Mainnet di Ethereum sarà già protetta dalla Beacon Chain utilizzando il proof-of-stake. In questo modo una rete principale fertile potrà costruire shard chain alimentate da soluzioni di livello 2 che potenziano la scalabilità.

Rimane da valutare se la rete principale sarà l'unico shard "smart" in grado di gestire l'esecuzione di codice. In ogni caso la decisione sull'espansione degli shard potrà essere rivista in base alle esigenze.

<ButtonLink to="/upgrades/merge/">
  La fusione
</ButtonLink>

<Divider />

### Leggi altro {#read-more}

<ShardChainsList />
