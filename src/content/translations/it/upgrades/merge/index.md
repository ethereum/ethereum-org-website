---
title: La fusione
description: Scopri di più sulla fusione, ovvero l'integrazione della rete principale di Ethereum nel sistema poof of stake coordinato della beacon chain.
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

## In cosa consiste la fusione? {#what-is-the-docking}

È importante ricordare che inizialmente, la [beacon chain](/upgrades/beacon-chain/) veniva inviata separatamente dalla [rete principale](/glossary/#mainnet), ovvero la catena che usiamo oggi. Il funzionamento della rete principale Ethereum continuerà ad essere assicurato dal [proof of work](/developers/docs/consensus-mechanisms/pow/), anche mentre la beacon chain funziona in parallelo utilizzando un [proof of stake](/developers/docs/consensus-mechanisms/pos/). La fusione avviene quando questi due sistemi finalmente si uniscono.

Immagina Ethereum come una nave spaziale che non è ancora pronta per un viaggio interstellare. Con la beacon chain la community ha costruito un nuovo motore e uno scafo più resistente. Al momento opportuno, l'attuale nave spaziale si innesterà in questo nuovo sistema, fondendosi in un'unica nave, pronta ad affrontare l'universo solcando in sicurezza molti anni luce.

## La fusione con la rete principale {#docking-mainnet}

Una volta pronta la rete principale di Ethereum si "fonderà" con la beacon chain, diventando un suo "frammento" che usa il proof of stake al posto del [proof of work](/developers/docs/consensus-mechanisms/pow/).

La rete principale aggiungerà la capacità di eseguire Smart Contract nel sistema proof of stake, oltre alla cronologia completa e allo stato corrente di Ethereum, consentendo una transizione senza intoppi per gli utenti e i possessori di ETH.

## Dopo la fusione {#after-the-merge}

Questa fase segnerà la fine del proof-of-work per Ethereum e l'inizio di una rete Ethereum più sostenibile ed ecologica. A questo punto Ethereum sarà di un passo più vicino a raggiungere la sicurezza e sostenibilità su larga scala delineate in questa [visione di Ethereum](/upgrades/vision/).

È importante notare che un obiettivo di implementazione del processo di fusione è costituito dalla semplicità, al fine di accelerare il passaggio dal proof-of-work al poof-of-stake. Gli sviluppatori stanno concentrando i loro sforzi su questa transizione, riducendo al minimo le caratteristiche aggiuntive che potrebbero ritardare questo obiettivo.

**Ciò significa che alcune funzionalità, come la possibilità di ritirare ETH messi in staking, dovranno aspettare ancora un po' dopo il completamento della fusione.** Per tenere conto di queste funzionalità, è previsto un aggiornamento di "pulizia" post fusione, che dovrebbe avvenire molto presto dopo il completamento della fusione.

## Relazione tra gli aggiornamenti {#relationship-between-upgrades}

Gli aggiornamenti di Ethereum sono tutti in qualche modo interconnessi. Quindi ricapitoliamo come la fusione si collega con gli altri aggiornamenti.

### La fusione e la beacon chain {#docking-and-beacon-chain}

Una volta effettuata la fusione, verranno assegnati degli staker per convalidare la rete principale di Ethereum. [Il mining](/developers/docs/consensus-mechanisms/pow/mining/) non sarà più necessario e i miner potranno investire i loro guadagni nello staking nel nuovo sistema proof of stake.

<ButtonLink to="/upgrades/beacon-chain/">
  La beacon chain
</ButtonLink>

### La fusione e la pulizia successiva {#merge-and-post-merge-cleanup}

Subito dopo la fusione, alcune caratteristiche, come il ritiro degli ETH messi in staking, non saranno ancora supportate. Esse saranno prese in considerazione nell'ambito di un aggiornamento separato che verrà effettuato a breve distanza dalla fusione.

Rimani aggiornato con il [Blog di Ricerca e Sviluppo dell'EF](https://blog.ethereum.org/category/research-and-development/). I più curiosi possono scoprire maggiori informazioni nel video [Cosa succede dopo la fusione](https://youtu.be/7ggwLccuN5s?t=101), presentato da Vitalik in occasione dell'evento ETHGlobal ad aprile 2021.

### La fusione e le shard chain {#docking-and-shard-chains}

In origine, per affrontare il discorso della scalabilità, l'idea era quella di lavorare su shard chain prima della fusione. Tuttavia, con il boom di [soluzioni di scala di livello 2](/developers/docs/scaling/#layer-2-scaling), la priorità si è spostata sul passaggio dal proof of work al proof of stake attraverso la fusione.

Si tratterà di una valutazione continua da parte della community circa la necessità di cicli potenzialmente multipli di shard chain per consentire una scalabilità senza fine.

<ButtonLink to="/upgrades/shard-chains/">
  Shard chain
</ButtonLink>

## Leggi altro {#read-more}

<MergeArticleList />
