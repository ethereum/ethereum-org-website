---
title: Dati e analisi
description: Come ottenere analisi e dati sulla catena da utilizzare nelle dapp
lang: it
---

## Introduzione {#Introduction}

Mentre l'utilizzo della rete continua a crescere, una quantità crescente di informazioni preziose esisterà nei dati on-chain. Al rapido aumentare del volume di dati, il calcolo e l'aggregazione di queste informazioni a scopo di segnalazione o per guidare una dapp possono richiedere notevoli sforzi in termini di tempo e processi.

Sfruttare i fornitori di dati esistenti può accelerare lo sviluppo, produrre risultati più precisi e ridurre gli sforzi di manutenzione in corso. Ciò permetterà al team di concentrarsi sulla funzionalità principale che il loro progetto si prefigge di fornire.

## Prerequisiti {#prerequisites}

Occorre comprendere il concetto base di [Block Explorers](/developers/docs/data-and-analytics/block-explorers/) per capire meglio come usarli nell'ambito dell'analisi dei dati. Inoltre, è bene familiarizzare con il concetto di [indice](/glossary/#index) per comprendere i vantaggi che offrono per un design di sistema.

In termini di fondamenti architettonici, occorre comprendere che cosa sono le [API](https://www.wikipedia.org/wiki/API) e [REST](https://www.wikipedia.org/wiki/Representational_state_transfer), anche a livello teorico.

## Esploratori dei blocchi {#block-explorers}

Molti [Esploratori di blocchi](/developers/docs/data-and-analytics/block-explorers/) mettono a disposizione [gateway RESTful](https://www.wikipedia.org/wiki/Representational_state_transfer) [API](https://www.wikipedia.org/wiki/API) che offrono agli sviluppatori visibilità sui dati in tempo reale su blocchi, transazioni, miner, account e altre attività sulla catena.

Gli sviluppatori possono quindi elaborare e trasformare questi dati per fornire agli utenti informazioni e interazioni uniche con la blockchain [](/glossary/#blockchain). Ad esempio, [Etherscan](etherscan.io) fornisce i dati d'esecuzione e consenso per ogni slot di 12s.

## The Graph {#the-graph}

La [rete Graph](https://thegraph.com/) è un protocollo di indicizzazione decentralizzato per l'organizzazione dei dati della blockchain. Invece di costruire e gestire archivi di dati off-chain e centralizzati per aggregare dati on-chain, con The Graph gli sviluppatori possono creare applicazioni senza server che vengono eseguite interamente su infrastrutture pubbliche.

Usando [GraphQL](https://graphql.org/), gli sviluppatori possono interrogare una qualsiasi delle API aperte curate, note come grafici secondari, per acquisire le informazioni necessarie a guidare la propria dapp. Interrogando questi grafici secondari indicizzati, i Rapporti e le dapp non solo ricevono benefici di prestazioni e scalabilità, ma anche l'accuratezza integrata, fornita dal consenso della rete. Con l'aggiunta di nuovi miglioramenti e/o sotto-grafici alla rete, i vostri progetti possono iterare rapidamente per sfruttare questi miglioramenti.

## Diversità dei client

La [diversità dei client](/developers/docs/nodes-and-clients/client-diversity/) è importante per la salute complessiva della rete di Ethereum, poiché fornisce resilienza a bug ed exploit. Al momento esistono numerosi pannelli di controllo della diversità dei client, tra cui [clientdiversity.org](https://clientdiversity.org/), [rated.network](rated.network), [pool.invis.cloud](pool.invis.cloud), [slashed.info](slahed.info) e [Ethernodes](https://ethernodes.org/).

## Dune Analytics {#dune-analytics}

[Dune Analytics](https://dune.com/) pre-elabora i dati della blockchain in tabelle relazionali del database (PostgreSQL e DatabricksSQL), consente agli utenti di interrogare i dati della blockchain usando SQL e crea pannelli di controllo basati sui risultati della richiesta. I dati sulla catena sono organizzati in 4 tabelle grezze: `blocks`, `transactions`, `logs` (di eventi) e `traces` (di chiamate). I contratti e protocolli popolari sono stati decodificati e ognuno ha la propria serie di tabelle di eventi e chiamate. Queste tabelle di eventi e chiamate sono ulteriormente elaborate e organizzate in tabelle di astrazione secondo il tipo di protocolli, ad esempio dex, lending, stablecoins, ecc.

## Letture consigliate {#further-reading}

- [Panoramica della rete Graph](https://thegraph.com/docs/en/about/network/)
- [GraphQL Playground](https://thegraph.com/explorer/subgraph/graphprotocol/graph-network-mainnet?version=current)
- [Esempi di codice API su EtherScan](https://etherscan.io/apis#contracts)
- [Esploratore della Beacon Chain di Beaconcha.in](https://beaconcha.in)
- [Fondamenti di Dune](https://docs.dune.com/#dune-basics)
