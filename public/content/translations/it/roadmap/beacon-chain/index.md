---
title: La Beacon Chain
description: Scopri la Beacon Chain, l'aggiornamento che ha introdotto la prova di stake su Ethereum.
lang: it
template: upgrade
image: /images/upgrades/core.png
alt: 
summaryPoint1: La Beacon Chain ha introdotto la prova di stake nell'ecosistema di Ethereum.
summaryPoint2: "È stata unita alla catena originale basata sulla prova di lavoro di Ethereum nel settembre 2022."
summaryPoint3: La Beacon Chain ha introdotto la logica di consenso e il protocollo di gossip dei blocchi che ora protegge Ethereum.
---

<UpgradeStatus isShipped dateKey="page-upgrades:page-upgrades-beacon-date">
  La Beacon Chain è stata rilasciata il 1° dicembre 2020 e ha formalizzato la prova di stake come meccanismo di consenso di Ethereum con l'aggiornamento The Merge il 15 settembre 2022.
</UpgradeStatus>

## Cos'è la Beacon Chain? {#what-is-the-beacon-chain}

La Beacon Chain è il nome della blockchain originale basata sulla prova di stake lanciata nel 2020. È stata creata per garantire che la logica di consenso della prova di stake fosse solida e sostenibile prima di abilitarla sulla rete principale di [Ethereum](/). Pertanto, ha funzionato parallelamente all'Ethereum originale basato sulla prova di lavoro. La Beacon Chain era una catena di blocchi 'vuoti', ma disattivare la prova di lavoro e attivare la prova di stake su Ethereum richiedeva di istruire la Beacon Chain ad accettare i dati delle transazioni dai client di esecuzione, raggrupparli in blocchi e quindi organizzarli in una blockchain utilizzando un meccanismo di consenso basato sulla prova di stake. Nello stesso momento, i client originali di Ethereum hanno disattivato il loro mining, la propagazione dei blocchi e la logica di consenso, passando tutto alla Beacon Chain. Questo evento è stato noto come [The Merge](/roadmap/merge/). Una volta avvenuto The Merge, non c'erano più due blockchain. Invece, c'era solo un Ethereum basato sulla prova di stake, che ora richiede due client diversi per nodo. La Beacon Chain è ora il livello di consenso, una rete peer-to-peer di client di consenso che gestisce il gossip dei blocchi e la logica di consenso, mentre i client originali formano il livello di esecuzione, che è responsabile del gossip e dell'esecuzione delle transazioni, e della gestione dello stato di Ethereum. I due livelli possono comunicare tra loro utilizzando l'Engine API.

## Cosa fa la Beacon Chain? {#what-does-the-beacon-chain-do}

La Beacon Chain è il nome dato a un registro di account che ha condotto e coordinato la rete di [staker](/staking/) di Ethereum prima che quegli staker iniziassero a convalidare i veri blocchi di Ethereum. Tuttavia, non elabora le transazioni né gestisce le interazioni dei contratti intelligenti perché ciò viene fatto nel livello di esecuzione.
La Beacon Chain è responsabile di cose come la gestione dei blocchi e delle attestazioni, l'esecuzione dell'algoritmo di scelta della biforcazione e la gestione di ricompense e penalità.
Scopri di più sulla nostra [pagina dell'architettura dei nodi](/developers/docs/nodes-and-clients/node-architecture/#node-comparison).

## Impatto della Beacon Chain {#beacon-chain-features}

### Introduzione dello staking {#introducing-staking}

La Beacon Chain ha introdotto la [prova di stake](/developers/docs/consensus-mechanisms/pos/) su Ethereum. Questo mantiene Ethereum sicuro e fa guadagnare ai validatori più ETH nel processo. In pratica, lo staking comporta mettere in stake ETH per attivare il software del validatore. Come staker, esegui il software che crea e convalida nuovi blocchi nella catena.

Lo staking ha uno scopo simile a quello che aveva il [mining](/developers/docs/consensus-mechanisms/pow/mining/), ma è diverso in molti modi. Il mining richiedeva grandi spese iniziali sotto forma di hardware potente e consumo di energia, portando a economie di scala e promuovendo la centralizzazione. Il mining inoltre non prevedeva alcun requisito di bloccare asset come garanzia, limitando la capacità del protocollo di punire i cattivi attori dopo un attacco.

La transizione alla prova di stake ha reso Ethereum significativamente più sicuro e decentralizzato rispetto alla prova di lavoro. Più persone partecipano alla rete, più questa diventa decentralizzata e sicura dagli attacchi.


<Alert variant="update">
<AlertEmoji text=":money_bag:"/>
<AlertContent>
<AlertDescription>
  Se sei interessato a diventare un validatore e ad aiutare a proteggere Ethereum, [scopri di più sullo staking](/staking/).
</AlertDescription>
</AlertContent>
</Alert>

### Preparazione per la frammentazione {#setting-up-for-sharding}

Da quando la Beacon Chain si è fusa con la rete principale originale di Ethereum, la community di Ethereum ha iniziato a cercare di scalare la rete.

La prova di stake ha il vantaggio di avere un registro di tutti i produttori di blocchi approvati in qualsiasi momento, ciascuno con ETH in stake. Questo registro pone le basi per la capacità di dividere e conquistare, ma di suddividere in modo affidabile specifiche responsabilità della rete.

Questa responsabilità è in contrasto con la prova di lavoro, in cui i minatori non hanno alcun obbligo verso la rete e potrebbero smettere di fare mining e spegnere permanentemente il software del loro nodo in un istante senza ripercussioni. Inoltre, non esiste alcun registro di proponenti del blocco noti e nessun modo affidabile per suddividere in modo sicuro le responsabilità della rete.

[Maggiori informazioni sulla frammentazione](/roadmap/danksharding/)

## Relazione tra gli aggiornamenti {#relationship-between-upgrades}

Gli aggiornamenti di Ethereum sono tutti in qualche modo correlati. Quindi ricapitoliamo come la Beacon Chain influisce sugli altri aggiornamenti.

### La Beacon Chain e The Merge {#merge-and-beacon-chain}

All'inizio, la Beacon Chain esisteva separatamente dalla rete principale di Ethereum, ma sono state unite nel 2022.

<ButtonLink href="/roadmap/merge/">
  The Merge
</ButtonLink>

### I frammenti e la Beacon Chain {#shards-and-beacon-chain}

La frammentazione può entrare in modo sicuro nell'ecosistema di Ethereum solo con un meccanismo di consenso basato sulla prova di stake in atto. La Beacon Chain ha introdotto lo staking, che si è 'fuso' con la rete principale, spianando la strada alla frammentazione per aiutare a scalare ulteriormente Ethereum.

<ButtonLink href="/roadmap/danksharding/">
  Catene di frammenti
</ButtonLink>

## Letture consigliate {#further-reading}

- [Maggiori informazioni sull'architettura dei nodi](/developers/docs/nodes-and-clients/node-architecture)
- [Maggiori informazioni sulla prova di stake](/developers/docs/consensus-mechanisms/pos)