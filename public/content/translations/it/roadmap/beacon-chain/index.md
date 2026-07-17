---
title: La Beacon Chain
description: Scopri la Beacon Chain, l'aggiornamento che ha introdotto la Proof-of-Stake su Ethereum.
lang: it
template: upgrade
image: /images/upgrades/core.png
alt: 
summaryPoints:
  - "La Beacon Chain ha introdotto la Proof-of-Stake nell'ecosistema di Ethereum."
  - "È stata unita alla catena originale Proof-of-Work di Ethereum nel settembre 2022."
  - "La Beacon Chain ha introdotto la logica di consenso e il protocollo di gossip dei blocchi che ora proteggono Ethereum."
---

<UpgradeStatus isShipped dateKey="page-upgrades:page-upgrades-beacon-date">
  La Beacon Chain è stata rilasciata il 1° dicembre 2020 e ha formalizzato la Proof-of-Stake come meccanismo di consenso di Ethereum con l'aggiornamento The Merge il 15 settembre 2022.
</UpgradeStatus>

## Cos'è la Beacon Chain? {#what-is-the-beacon-chain}

La Beacon Chain è il nome della blockchain originale Proof-of-Stake lanciata nel 2020. È stata creata per garantire che la logica di consenso Proof-of-Stake fosse solida e sostenibile prima di abilitarla sulla Mainnet di [Ethereum](/). Pertanto, funzionava parallelamente all'Ethereum originale basato sulla Prova di lavoro (PoW). La Beacon Chain era una catena di blocchi "vuoti", ma disattivare la Prova di lavoro e attivare la Proof-of-Stake su Ethereum richiedeva di istruire la Beacon Chain ad accettare i dati delle transazioni dai client di esecuzione, raggrupparli in blocchi e quindi organizzarli in una blockchain utilizzando un meccanismo di consenso basato sulla Proof-of-Stake. Nello stesso momento, i client originali di Ethereum hanno disattivato il loro minaggio, la propagazione dei blocchi e la logica di consenso, affidando tutto alla Beacon Chain. Questo evento è diventato noto come [The Merge](/roadmap/merge/). Una volta avvenuto The Merge, non c'erano più due blockchain. Invece, c'era un solo Ethereum Proof-of-Stake, che ora richiede due client diversi per nodo. La Beacon Chain è ora il livello di consenso, una rete peer-to-peer di client di consenso che gestisce il gossip dei blocchi e la logica di consenso, mentre i client originali formano il livello di esecuzione, che è responsabile del gossip e dell'esecuzione delle transazioni, e della gestione dello stato di Ethereum. I due livelli possono comunicare tra loro utilizzando l'Engine API.

## Cosa fa la Beacon Chain? {#what-does-the-beacon-chain-do}

La Beacon Chain è il nome dato a un registro di conti che conduceva e coordinava la rete di [staker](/staking/) di Ethereum prima che questi iniziassero a convalidare blocchi reali di Ethereum. Tuttavia, non elabora transazioni né gestisce le interazioni degli smart contract, poiché ciò viene fatto nel livello di esecuzione.
La Beacon Chain è responsabile di operazioni come la gestione dei blocchi e delle attestazioni, l'esecuzione dell'algoritmo di scelta del fork e la gestione di ricompense e penalità.
Scopri di più sulla nostra [pagina sull'architettura dei nodi](/developers/docs/nodes-and-clients/node-architecture/#node-comparison).

## L'impatto della Beacon Chain {#beacon-chain-features}

### Introduzione dello staking {#introducing-staking}

La Beacon Chain ha introdotto la [Proof-of-Stake](/developers/docs/consensus-mechanisms/pos/) su Ethereum. Questo mantiene Ethereum sicuro e fa guadagnare ai validatori più ETH nel processo. In pratica, lo staking comporta il mettere in staking degli ETH per attivare il software del validatore. Come staker, esegui il software che crea e convalida nuovi blocchi nella catena.

Lo staking ha uno scopo simile a quello che aveva il [minaggio](/developers/docs/consensus-mechanisms/pow/mining/), ma è diverso sotto molti aspetti. Il minaggio richiedeva grandi spese iniziali sotto forma di hardware potente e consumo di energia, portando a economie di scala e promuovendo la centralizzazione. Il minaggio, inoltre, non prevedeva alcun requisito di vincolare asset come collaterale, limitando la capacità del protocollo di punire i malintenzionati dopo un attacco.

La transizione alla Proof-of-Stake ha reso Ethereum significativamente più sicuro e decentralizzato rispetto alla Prova di lavoro. Più persone partecipano alla rete, più questa diventa decentralizzata e sicura dagli attacchi.


<Alert variant="update">
<AlertEmoji text=":money_bag:"/>
<AlertContent>
<AlertDescription>
  Se ti interessa diventare un validatore e aiutare a proteggere Ethereum, [scopri di più sullo staking](/staking/).
</AlertDescription>
</AlertContent>
</Alert>

### Preparazione per lo sharding {#setting-up-for-sharding}

Da quando la Beacon Chain si è unita alla Mainnet di Ethereum originale, la comunità di Ethereum ha iniziato a cercare di scalare la rete.

La Proof-of-Stake ha il vantaggio di avere un registro di tutti i produttori di blocchi approvati in un dato momento, ciascuno con ETH in staking. Questo registro pone le basi per la capacità di dividere e conquistare, ma suddividendo in modo affidabile specifiche responsabilità della rete.

Questa responsabilità è in contrasto con la Prova di lavoro, in cui i minatori non hanno alcun obbligo verso la rete e potrebbero smettere di minare e spegnere permanentemente il software del loro nodo in un istante senza ripercussioni. Inoltre, non esiste un registro dei propositori di blocchi noti e nessun modo affidabile per suddividere in sicurezza le responsabilità della rete.

[Maggiori informazioni sullo sharding](/roadmap/danksharding/)

## Relazione tra gli aggiornamenti {#relationship-between-upgrades}

Gli aggiornamenti di Ethereum sono tutti in qualche modo correlati. Ricapitoliamo quindi come la Beacon Chain influisce sugli altri aggiornamenti.

### La Beacon Chain e The Merge {#merge-and-beacon-chain}

All'inizio, la Beacon Chain esisteva separatamente dalla Mainnet di Ethereum, ma sono state unite nel 2022.

<ButtonLink href="/roadmap/merge/">
  The Merge
</ButtonLink>

### Gli shard e la Beacon Chain {#shards-and-beacon-chain}

Lo sharding può entrare in sicurezza nell'ecosistema di Ethereum solo con un meccanismo di consenso Proof-of-Stake in atto. La Beacon Chain ha introdotto lo staking, che si è "unito" alla Mainnet, spianando la strada allo sharding per aiutare a scalare ulteriormente Ethereum.

<ButtonLink href="/roadmap/danksharding/">
  Catene di shard
</ButtonLink>

## Letture consigliate {#further-reading}

- [Maggiori informazioni sull'architettura dei nodi](/developers/docs/nodes-and-clients/node-architecture)
- [Maggiori informazioni sulla Proof-of-Stake](/developers/docs/consensus-mechanisms/pos)