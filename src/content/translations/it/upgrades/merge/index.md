---
title: La Fusione
description: Scopri informazioni sulla Fusione; quando la Rete principale di Ethereum si unisce al sistema di proof-of-stake coordinato della Beacon Chain.
lang: it
template: upgrade
sidebar: true
image: ../../../../../assets/upgrades/merge.png
summaryPoint1: Alla fine l'attuale Mainnet di Ethereum si "fonderà" con il sistema proof-of-stake della Beacon Chain.
summaryPoint2: Questo segnerà la fine del proof-of-work per Ethereum, e la completa transizione al proof-of-stake.
summaryPoint3: Questo è previsto per precedere il lancio delle shard chains.
summaryPoint4: In precedenza ci riferivamo a questo come "l'aggancio".
---

<UpgradeStatus dateKey="page-upgrades-merge-date">
  Questo aggiornamento rappresenta il passaggio ufficiale al consenso proof of stake. Esso elimina la necessità di grandi quantità di energia richieste dal processo di mining e protegge invece la rete utilizzando l'ether in staking. Un passo davvero emozionante nel realizzare la <a href="/upgrades/vision/">visione di Ethereum</a>: maggiori scalabilità, sicurezza e sostenibilità.
</UpgradeStatus>

## In cosa consiste la Fusione? {#what-is-the-docking}

È importante ricordare che inizialmente, la [beacon chain](/upgrades/beacon-chain/) veniva inviata separatamente dalla [rete principale](/glossary/#mainnet), ovvero la catena che usiamo oggi. Il funzionamento della rete principale Ethereum continuerà ad essere assicurato dal [proof of work](/developers/docs/consensus-mechanisms/pow/), anche mentre la beacon chain funziona in parallelo utilizzando un [proof of stake](/developers/docs/consensus-mechanisms/pos/). La Fusione avviene quando questi due sistemi, finalmente, si uniscono.

Immagina Ethereum come una nave spaziale che non è ancora pronta per un viaggio interstellare. Con la beacon chain la community ha costruito un nuovo motore e uno scafo più resistente. Al momento opportuno, l'attuale nave spaziale si innesterà in questo nuovo sistema, fondendosi in un'unica nave, pronta ad affrontare l'universo solcando in sicurezza molti anni luce.

## La fusione con la rete principale {#docking-mainnet}

Una volta pronta la rete principale di Ethereum si "fonderà" con la beacon chain, diventando un suo "frammento" che usa il proof of stake al posto del [proof of work](/developers/docs/consensus-mechanisms/pow/).

La rete principale aggiungerà la capacità di eseguire Smart Contract nel sistema proof of stake, oltre alla cronologia completa e allo stato corrente di Ethereum, consentendo una transizione senza intoppi per gli utenti e i possessori di ETH.

## Dopo La Fusione {#after-the-merge}

Questa fase segnerà la fine del proof-of-work per Ethereum e l'inizio di una rete Ethereum più sostenibile ed ecologica. A questo punto Ethereum sarà di un passo più vicino a raggiungere la sicurezza e sostenibilità su larga scala delineate in questa [visione di Ethereum](/upgrades/vision/).

È importante notare che un obiettivo d'implementazione della Fusione è la semplicità, così da poter accelerare la transizione dal proof-of-work al proof-of-stake. Gli sviluppatori stanno concentrando i loro sforzi su questa transizione, riducendo al minimo le caratteristiche aggiuntive che potrebbero ritardare questo obiettivo.

**Questo significa che alcune funzionalità, come l'abilità di prelevare gli ETH messi in staking, dovranno attendere un po' più a lungo il completamento della Fusione.** Tra le altre cose, è previsto un aggiornamento di "pulizia" subito dopo il completamento della Fusione per affrontare tali funzionalità.

## Relazione tra gli aggiornamenti {#relationship-between-upgrades}

Gli aggiornamenti di Ethereum sono tutti in qualche modo interconnessi. Quindi, facciamo un riepilogo di come la Fusione è correlata agli altri aggiornamenti.

### La Fusione e la Beacon Chain {#docking-and-beacon-chain}

Una volta verificatasi la Fusione, verranno assegnati gli staker per convalidare la Rete principale di Ethereum. [Il mining](/developers/docs/consensus-mechanisms/pow/mining/) non sarà più necessario e i miner potranno investire i loro guadagni nello staking nel nuovo sistema proof of stake.

<ButtonLink to="/upgrades/beacon-chain/">
  La beacon chain
</ButtonLink>

### La Fusione e la pulizia post-fusione {#merge-and-post-merge-cleanup}

Immediatamente dopo la Fusione, alcune funzionalità, come il prelievo di ETH messi in staking, non saranno ancora supportate. Queste sono inserite in un aggiornamento separato che dovrebbe avere luogo poco dopo la Fusione.

Rimani aggiornato con il [Blog di Ricerca e Sviluppo dell'EF](https://blog.ethereum.org/category/research-and-development/). Per i curiosi, scoprite di più su [Cosa succede dopo la Fusione](https://youtu.be/7ggwLccuN5s?t=101), presentato da Vitalik all'evento ETHGlobal di aprile 2021.

### La Fusione e le shard chain {#docking-and-shard-chains}

In origine, il piano era quello di operare sulle shard chain prima della Fusione, così da risolvere la questione della scalabilità. Tuttavia, con il boom delle [soluzioni di ridimensionamento del livello 2](/developers/docs/scaling/#layer-2-scaling), la priorità è passata alla transizione dal proof-of-work al proof-of-stake tramite la Fusione.

Si tratterà di una valutazione continua da parte della community circa la necessità di cicli potenzialmente multipli di shard chain per consentire una scalabilità senza fine.

<ButtonLink to="/upgrades/sharding/">
  Shard chain
</ButtonLink>

## Leggi altro {#read-more}

<MergeArticleList />
