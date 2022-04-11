---
title: Dati e analisi
description: Come ottenere analisi e dati sulla catena da utilizzare nelle dapp
lang: it
sidebar: true
---

## Introduzione {#Introduction}

Mentre l'utilizzo della rete continua a crescere, una quantità crescente di informazioni preziose esisterà nei dati on-chain. Con il rapido aumento del volume dei dati, calcolare e aggregare queste informazioni per segnalare o guidare una dApp può diventare un'impresa dispendiosa in termini di tempo e processi.

Sfruttare i fornitori di dati esistenti può accelerare lo sviluppo, produrre risultati più precisi e ridurre gli sforzi di manutenzione in corso. Ciò permetterà al team di concentrarsi sulla funzionalità principale che il loro progetto si prefigge di fornire.

## Prerequisiti {#prerequisites}

Occorre comprendere il concetto base di [Block Explorers](/developers/docs/data-and-analytics/block-explorers/) per capire meglio come usarli nell'ambito dell'analisi dei dati. Inoltre, è bene familiarizzare con il concetto di [indice](/glossary/#index) per comprendere i vantaggi che offrono per un design di sistema.

In termini di fondamenti architettonici, occorre comprendere che cosa sono le [API](https://www.wikipedia.org/wiki/API) e [REST](https://www.wikipedia.org/wiki/Representational_state_transfer), anche a livello teorico.

## Graph {#the-graph}

La [rete Graph](https://thegraph.com/) è un protocollo di indicizzazione decentralizzato per l'organizzazione dei dati della blockchain. Invece di costruire e gestire archivi di dati off-chain e centralizzati per aggregare dati on-chain, con The Graph gli sviluppatori possono creare applicazioni senza server che vengono eseguite interamente su infrastrutture pubbliche.

Utilizzando [GraphQL](https://graphql.org/), gli sviluppatori possono interrogare una qualsiasi delle API aperte curate, note come sotto-grafici, per acquisire le informazioni necessarie di cui hanno bisogno per guidare la loro dApp. Interrogando questi sotto-grafici indicizzati, Rapporti e dApp ottengono non solo benefici in termini di prestazioni e scalabilità, ma anche la precisione integrata fornita dal consenso di rete. Con l'aggiunta di nuovi miglioramenti e/o sotto-grafici alla rete, i vostri progetti possono iterare rapidamente per sfruttare questi miglioramenti.

## Esploratori di blocchi {#block-explorers}

Molti [Esploratori di blocchi](/developers/docs/data-and-analytics/block-explorers/) offrono [gateway RESTful](https://www.wikipedia.org/wiki/Representational_state_transfer) [API](https://www.wikipedia.org/wiki/API) che offrono agli sviluppatori visibilità sui dati in tempo reale su blocchi, transazioni, miner, account e altre attività sulla catena.

Gli sviluppatori possono quindi elaborare e trasformare questi dati per fornire agli utenti informazioni e interazioni uniche con la blockchain [](/glossary/#blockchain).

## Letture consigliate {#further-reading}

- [Panoramica della rete Graph](https://thegraph.com/docs/network#overview)
- [GraphQL Playground](https://thegraph.com/explorer/subgraph/graphprotocol/graph-network-mainnet?version=current)
- [Esempi di codice API su EtherScan](https://etherscan.io/apis#contracts)
