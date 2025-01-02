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

Molti [Esploratori di Blocchi](/developers/docs/data-and-analytics/block-explorers/) offrono gateway dell'[API](https://www.wikipedia.org/wiki/API) di [RESTful](https://www.wikipedia.org/wiki/Representational_state_transfer), che forniranno visibilità agli sviluppatori in dati in tempo reale sui blocchi, le transazioni, i validatori, i conti e altre attività on-chain.

Gli sviluppatori possono quindi elaborare e trasformare questi dati per fornire agli utenti informazioni e interazioni uniche con la [blockchain](/glossary/#blockchain). Ad esempio, [Etherscan](https://etherscan.io) fornisce i dati d'esecuzione e consenso per ogni slot di 12 secondi.

## The Graph {#the-graph}

La [rete Graph](https://thegraph.com/) è un protocollo di indicizzazione decentralizzato per l'organizzazione dei dati della blockchain. Invece di costruire e gestire archivi di dati off-chain e centralizzati per aggregare dati on-chain, con The Graph gli sviluppatori possono creare applicazioni senza server che vengono eseguite interamente su infrastrutture pubbliche.

Usando [GraphQL](https://graphql.org/), gli sviluppatori possono interrogare una qualsiasi delle API aperte curate, note come grafici secondari, per acquisire le informazioni necessarie a guidare la propria dapp. Interrogando questi grafici secondari indicizzati, i Rapporti e le dapp non solo ricevono benefici di prestazioni e scalabilità, ma anche l'accuratezza integrata, fornita dal consenso della rete. Con l'aggiunta di nuovi miglioramenti e/o sotto-grafici alla rete, i vostri progetti possono iterare rapidamente per sfruttare questi miglioramenti.

## Diversità dei client

La [diversità dei client](/developers/docs/nodes-and-clients/client-diversity/) è importante per la salute complessiva della rete di Ethereum, poiché fornisce resilienza a bug ed exploit. Attualmente esistono vari pannelli di controllo della diversità del client, tra cui [clientdiversity.org](https://clientdiversity.org/), [rated.network](https://www.rated.network), [supermajority.info](https://supermajority.info//) ed [Ethernodes](https://ethernodes.org/).

## Dune Analytics {#dune-analytics}

[Dune Analytics](https://dune.com/) pre-elabora i dati della blockchain nelle tabelle del database relazionale (DuneSQL), consente agli utenti di richiedere i dati della blockchain utilizzando SQL e crea pannelli di controllo basati sui risultati della richiesta. I dati sulla catena sono organizzati in 4 tabelle grezze: `blocks`, `transactions`, `logs` (di eventi) e `traces` (di chiamate). I contratti e protocolli popolari sono stati decodificati e ognuno ha la propria serie di tabelle di eventi e chiamate. Queste tabelle di eventi e chiamate sono ulteriormente elaborate e organizzate in tabelle di astrazione secondo il tipo di protocolli, ad esempio dex, lending, stablecoins, ecc.

## Rete di SubQuery {#subquery-network}

[SubQuery](https://subquery.network/) è un indicizzatore di dati leader del settore, che fornisce agli sviluppatori API veloci, affidabili, decentralizzate e personalizzate per i loro progetti in Web3. SubQuery emancipa gli sviluppatori da oltre 165 ecosistemi (incluso Ethereum) con dati indicizzati ricchi, per creare esperienze intuitive e immersive per i propri utenti. La Rete di SubQuery alimenta le tue inarrestabili app con una rete resiliente e un'infrastruttura decentralizzata. Utilizza gli strumenti per sviluppatori di blockchain di SubQuery per creare le applicazioni Web3 del futuro, senza dover dedicare tempo a sviluppare un backend personalizzato per le attività di elaborazione dei dati.

Per iniziare, visita la [guida rapida per principianti di Ethereum](https://academy.subquery.network/quickstart/quickstart_chains/ethereum-gravatar.html) per iniziare a indicizzare i dati della blockchain di Ethereum in pochi minuti in un ambiente locale di Docker per i test prima di distribuire il tuo progetto su un [servizio gestito da SubQuery](https://managedservice.subquery.network/) o su una [rete decentralizzata di SubQuery](https://app.subquery.network/dashboard).

## Ethernow - Programma dei dati del Mempool {#ethernow}
[Blocknative](https://www.blocknative.com/) fornisce l'accesso aperto al suo [archivio dei dati del mempool](https://www.ethernow.xyz/mempool-data-archive) storico di Ethereum. Questo consente ai ricercatori e ai progetti della community di esplorare il livello pre-catena della Rete Principale di Ethereum. La serie di dati è mantenuta attivamente e rappresenta il registro storico più completo degli eventi di transazione del mempool nell'ecosistema di Ethereum. Maggiori informazioni su [Ethernow](https://www.ethernow.xyz/).

## Letture consigliate {#further-reading}

- [Panoramica della rete Graph](https://thegraph.com/docs/en/about/network/)
- [GraphQL Playground](https://thegraph.com/explorer/subgraph/graphprotocol/graph-network-mainnet?version=current)
- [Esempi di codice API su EtherScan](https://etherscan.io/apis#contracts)
- [Esploratore della Beacon Chain di Beaconcha.in](https://beaconcha.in)
- [Fondamenti di Dune](https://docs.dune.com/#dune-basics)
- [Guida iniziale rapida di Ethereum su SubQuery](https://academy.subquery.network/indexer/quickstart/quickstart_chains/ethereum-gravatar.html)
