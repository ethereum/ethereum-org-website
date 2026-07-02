---
title: Dati e analisi
description: Come ottenere analisi e dati onchain da utilizzare nelle tue dapp
lang: it
---

## Introduzione {#introduction}

Poiché l'utilizzo della rete continua a crescere, una quantità sempre maggiore di informazioni preziose sarà presente nei dati onchain. Poiché il volume dei dati aumenta rapidamente, calcolare e aggregare queste informazioni per creare report o gestire un'applicazione decentralizzata (dapp) può diventare un'impresa gravosa in termini di tempo e processi.

Sfruttare i fornitori di dati esistenti può accelerare lo sviluppo, produrre risultati più accurati e ridurre gli sforzi di manutenzione continui. Ciò consentirà a un team di concentrarsi sulle funzionalità principali che il proprio progetto sta cercando di fornire.

## Prerequisiti {#prerequisites}

Dovresti comprendere il concetto di base dei [block explorer](/developers/docs/data-and-analytics/block-explorers/) per capire meglio come utilizzarli nel contesto dell'analisi dei dati. Inoltre, familiarizza con il concetto di [indice](/glossary/#index) per comprendere i vantaggi che aggiungono alla progettazione di un sistema.

In termini di fondamenti architetturali, è utile capire cosa siano un'[API](https://www.wikipedia.org/wiki/API) e [REST](https://www.wikipedia.org/wiki/Representational_state_transfer), anche solo in teoria.

## Block explorer {#block-explorers}

Molti [block explorer](/developers/docs/data-and-analytics/block-explorers/) offrono gateway [API](https://www.wikipedia.org/wiki/API) [RESTful](https://www.wikipedia.org/wiki/Representational_state_transfer) che forniranno agli sviluppatori visibilità sui dati in tempo reale relativi a blocchi, transazioni, validatori, account e altre attività onchain.

Gli sviluppatori possono quindi elaborare e trasformare questi dati per offrire ai propri utenti approfondimenti e interazioni uniche con la [blockchain](/glossary/#blockchain). Ad esempio, [Etherscan](https://etherscan.io) e [Blockscout](https://eth.blockscout.com) forniscono dati di esecuzione e consenso per ogni slot di 12 secondi.

## The Graph {#the-graph}

[The Graph](https://thegraph.com/) è un protocollo di indicizzazione che fornisce un modo semplice per interrogare i dati della blockchain tramite API aperte note come sottografi.

Con The Graph, gli sviluppatori possono beneficiare di:

- Indicizzazione decentralizzata: consente di indicizzare i dati della blockchain tramite più indicizzatori, eliminando così qualsiasi singolo punto di guasto
- Query GraphQL: fornisce una potente interfaccia GraphQL per interrogare i dati indicizzati, rendendo il recupero dei dati estremamente semplice
- Personalizzazione: definisci la tua logica per trasformare e archiviare i dati della blockchain e riutilizza i sottografi pubblicati da altri sviluppatori su The Graph Network

Segui questa [guida rapida](https://thegraph.com/docs/en/quick-start/) per creare, distribuire e interrogare un sottografo in 5 minuti.

## Diversità dei client {#client-diversity}

La [diversità dei client](/developers/docs/nodes-and-clients/client-diversity/) è importante per la salute generale della rete Ethereum perché fornisce resilienza a bug ed exploit. Esistono ora diverse dashboard per la diversità dei client, tra cui [clientdiversity.org](https://clientdiversity.org/), [rated.network](https://www.rated.network), [supermajority.info](https://supermajority.info//) ed [Ethernodes](https://ethernodes.org/).

## Dune Analytics {#dune-analytics}

[Dune Analytics](https://dune.com/) pre-elabora i dati della blockchain in tabelle di database relazionali (DuneSQL), consente agli utenti di interrogare i dati della blockchain utilizzando SQL e di creare dashboard basate sui risultati delle query. I dati onchain sono organizzati in 4 tabelle grezze: `blocks`, `transactions`, (eventi) `logs` e (chiamate) `traces`. I contratti e i protocolli più popolari sono stati decodificati e ognuno ha il proprio set di tabelle di eventi e chiamate. Queste tabelle di eventi e chiamate vengono ulteriormente elaborate e organizzate in tabelle di astrazione in base al tipo di protocolli, ad esempio dex, prestito, stablecoin, ecc.

## SQD {#sqd}

[SQD](https://sqd.dev/) è una piattaforma dati decentralizzata iper-scalabile ottimizzata per fornire un accesso efficiente e permissionless a grandi volumi di dati. Attualmente fornisce dati onchain storici, inclusi registri degli eventi, ricevute delle transazioni, tracce e differenze di stato per transazione. SQD offre un potente toolkit per creare pipeline personalizzate di estrazione ed elaborazione dei dati, raggiungendo una velocità di indicizzazione fino a 150.000 blocchi al secondo.

Per iniziare, visita la [documentazione](https://docs.sqd.dev/) o guarda gli [esempi EVM](https://github.com/subsquid-labs/squid-evm-examples) di ciò che puoi costruire con SQD.

## SubQuery Network {#subquery-network}

[SubQuery](https://subquery.network/) è un indicizzatore di dati leader che offre agli sviluppatori API veloci, affidabili, decentralizzate e personalizzate per i loro progetti Web3. SubQuery fornisce agli sviluppatori di oltre 165 ecosistemi (incluso Ethereum) ricchi dati indicizzati per creare esperienze intuitive e coinvolgenti per i loro utenti. La SubQuery Network alimenta le tue app inarrestabili con una rete infrastrutturale resiliente e decentralizzata. Usa il toolkit per sviluppatori blockchain di SubQuery per creare le applicazioni Web3 del futuro, senza perdere tempo a costruire un backend personalizzato per le attività di elaborazione dei dati.

Per iniziare, visita la [guida rapida di Ethereum](https://academy.subquery.network/quickstart/quickstart_chains/ethereum-gravatar.html) per iniziare a indicizzare i dati della blockchain di Ethereum in pochi minuti in un ambiente Docker locale per i test prima di passare alla produzione su un [servizio gestito di SubQuery](https://managedservice.subquery.network/) o sulla [rete decentralizzata di SubQuery](https://app.subquery.network/dashboard).

## Codex {#codex}

[Codex](https://www.codex.io/) è un'API di dati blockchain in tempo reale che fornisce dati arricchiti per oltre 70 milioni di token su più di 80 reti. Gli sviluppatori possono accedere a prezzi strutturati dei token, saldi dei portafogli, cronologia delle transazioni e analisi aggregate (volume, liquidità, portafogli unici) senza mantenere un'infrastruttura di indicizzazione personalizzata. Codex supporta la consegna dei dati in frazioni di secondo tramite integrazioni WebSocket e webhook.

Per iniziare, visita la [documentazione](https://docs.codex.io), prova l'[Explorer](https://docs.codex.io/explore) o registrati sulla [dashboard](https://dashboard.codex.io/signup).

## EVM Query Language {#evm-query-language}

L'EVM Query Language (EQL) è un linguaggio simile a SQL progettato per interrogare le catene EVM (Ethereum Virtual Machine). L'obiettivo finale di EQL è supportare query relazionali complesse sui cittadini di prima classe della catena EVM (blocchi, account e transazioni) fornendo al contempo a sviluppatori e ricercatori una sintassi ergonomica per l'uso quotidiano. Con EQL, gli sviluppatori possono recuperare i dati della blockchain utilizzando una sintassi familiare simile a SQL ed eliminare la necessità di codice boilerplate complesso. EQL supporta le richieste standard di dati della blockchain (ad es. il recupero del nonce e del saldo di un account su Ethereum o il recupero della dimensione e del timestamp del blocco corrente) e aggiunge continuamente supporto per richieste e set di funzionalità più complessi.

## Letture consigliate {#further-reading}

- [Esplorare i dati cripto I: architetture del flusso di dati](https://web.archive.org/web/20250125012042/https://research.2077.xyz/exploring-crypto-data-1-data-flow-architectures)
- [Panoramica di Graph Network](https://thegraph.com/docs/en/about/)
- [Playground per le query di Graph](https://thegraph.com/explorer/subgraph/graphprotocol/graph-network-mainnet?version=current)
- [Esempi di codice API su Etherscan](https://etherscan.io/apis#contracts)
- [Documentazione API su Blockscout](https://docs.blockscout.com/devs/apis)
- [Explorer della Beacon Chain Beaconcha.in](https://beaconcha.in)
- [Basi di Dune](https://docs.dune.com/#dune-basics)
- [Guida rapida di SubQuery per Ethereum](https://academy.subquery.network/indexer/quickstart/quickstart_chains/ethereum-gravatar.html)
- [Panoramica della rete SQD](https://docs.sqd.dev/)
- [EVM Query Language](https://web.archive.org/web/20250719151453/https://www.eql.sh/blog/alpha-release-notes)

## Tutorial: Dati e analisi / SQL su Ethereum {#tutorials}

- [Impara gli argomenti fondamentali di Ethereum con SQL](/developers/tutorials/learn-foundational-ethereum-topics-with-sql/) _– Interroga i dati onchain di Ethereum con SQL per comprendere i fondamenti di transazioni, blocchi e gas._
