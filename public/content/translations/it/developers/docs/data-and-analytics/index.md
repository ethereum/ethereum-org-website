---
title: Dati e analisi
description: Come ottenere dati e analisi on-chain da utilizzare nelle tue dApp
lang: it
---

## Introduzione {#Introduction}

Con la continua crescita dell'utilizzo della rete, una quantità crescente di informazioni preziose sarà presente nei dati on-chain. Al rapido aumentare del volume di dati, il calcolo e l'aggregazione di queste informazioni a scopo di segnalazione o per guidare una dapp possono richiedere notevoli sforzi in termini di tempo e processi.

Sfruttare i fornitori di dati esistenti può accelerare lo sviluppo, produrre risultati più precisi e ridurre gli sforzi di manutenzione in corso. Ciò permetterà al team di concentrarsi sulla funzionalità principale che il loro progetto si prefigge di fornire.

## Prerequisiti {#prerequisites}

Dovresti comprendere il concetto di base degli [esploratori di blocchi](/developers/docs/data-and-analytics/block-explorers/) per capire meglio come utilizzarli nel contesto dell'analisi dei dati. Inoltre, familiarizza con il concetto di [indice](/glossary/#index) per comprendere i vantaggi che aggiungono alla progettazione di un sistema.

In termini di fondamenti architettonici, è importante comprendere cosa sono un'[API](https://www.wikipedia.org/wiki/API) e [REST](https://www.wikipedia.org/wiki/Representational_state_transfer), anche solo in teoria.

## Esploratori di blocchi {#block-explorers}

Molti [esploratori di blocchi](/developers/docs/data-and-analytics/block-explorers/) offrono gateway [API](https://www.wikipedia.org/wiki/API) [RESTful](https://www.wikipedia.org/wiki/Representational_state_transfer) che forniscono agli sviluppatori visibilità sui dati in tempo reale su blocchi, transazioni, validatori, account e altre attività on-chain.

Gli sviluppatori possono quindi elaborare e trasformare questi dati per offrire ai propri utenti approfondimenti e interazioni uniche con la [blockchain](/glossary/#blockchain). Ad esempio, [Etherscan](https://etherscan.io) e [Blockscout](https://eth.blockscout.com) forniscono dati di esecuzione e consenso per ogni slot di 12 secondi.

## The Graph {#the-graph}

[The Graph](https://thegraph.com/) è un protocollo di indicizzazione che fornisce un modo semplice per interrogare i dati della blockchain tramite API aperte note come sottografi.

Con The Graph, gli sviluppatori possono beneficiare di:

- Indicizzazione decentralizzata: consente l'indicizzazione dei dati della blockchain tramite più indicizzatori, eliminando così ogni singolo punto di errore
- Query GraphQL: fornisce una potente interfaccia GraphQL per l'interrogazione di dati indicizzati, rendendo il recupero dei dati estremamente semplice
- Personalizzazione: definisci la tua logica per la trasformazione e l'archiviazione dei dati della blockchain e riutilizza i sottografi pubblicati da altri sviluppatori su The Graph Network

Segui questa guida [rapida](https://thegraph.com/docs/en/quick-start/) per creare, distribuire e interrogare un sottografo in 5 minuti.

## Diversità dei client {#client-diversity}

La [diversità dei client](/developers/docs/nodes-and-clients/client-diversity/) è importante per la salute generale della rete di Ethereum perché fornisce resilienza a bug ed exploit. Ora esistono diverse dashboard sulla diversità dei client, tra cui [clientdiversity.org](https://clientdiversity.org/), [rated.network](https://www.rated.network), [supermajority.info](https://supermajority.info//) ed [Ethernodes](https://ethernodes.org/).

## Dune Analytics {#dune-analytics}

[Dune Analytics](https://dune.com/) pre-elabora i dati della blockchain in tabelle di database relazionali (DuneSQL), consente agli utenti di interrogare i dati della blockchain utilizzando SQL e di creare dashboard basate sui risultati delle query. I dati on-chain sono organizzati in 4 tabelle grezze: `blocks`, `transactions`, (event) `logs` e (call) `traces`. I contratti e protocolli popolari sono stati decodificati e ognuno ha la propria serie di tabelle di eventi e chiamate. Queste tabelle di eventi e chiamate sono ulteriormente elaborate e organizzate in tabelle di astrazione secondo il tipo di protocolli, ad esempio dex, lending, stablecoins, ecc.

## SQD {#sqd}

[SQD](https://sqd.dev/) è una piattaforma dati decentralizzata e iperscalabile, ottimizzata per fornire un accesso efficiente e senza autorizzazione a grandi volumi di dati. Attualmente serve dati storici on-chain, inclusi i log degli eventi, le ricevute delle transazioni, le tracce e le differenze di stato per transazione. SQD offre un potente toolkit per la creazione di pipeline personalizzate di estrazione ed elaborazione dei dati, raggiungendo una velocità di indicizzazione fino a 150.000 blocchi al secondo.

Per iniziare, visita la [documentazione](https://docs.sqd.dev/) o consulta gli [esempi EVM](https://github.com/subsquid-labs/squid-evm-examples) di ciò che puoi creare con SQD.

## SubQuery Network {#subquery-network}

[SubQuery](https://subquery.network/) è un indicizzatore di dati leader che offre agli sviluppatori API veloci, affidabili, decentralizzate e personalizzate per i loro progetti web3. SubQuery emancipa gli sviluppatori da oltre 165 ecosistemi (incluso Ethereum) con dati indicizzati ricchi, per creare esperienze intuitive e immersive per i propri utenti. La Rete di SubQuery alimenta le tue inarrestabili app con una rete resiliente e un'infrastruttura decentralizzata. Utilizza gli strumenti per sviluppatori di blockchain di SubQuery per creare le applicazioni Web3 del futuro, senza dover dedicare tempo a sviluppare un backend personalizzato per le attività di elaborazione dei dati.

Per iniziare, visita la [guida rapida di Ethereum](https://academy.subquery.network/quickstart/quickstart_chains/ethereum-gravatar.html) per iniziare a indicizzare i dati della blockchain di Ethereum in pochi minuti in un ambiente Docker locale per i test, prima di andare in produzione su un [servizio gestito di SubQuery](https://managedservice.subquery.network/) o sulla [rete decentralizzata di SubQuery](https://app.subquery.network/dashboard).

## EVM Query Language {#evm-query-language}

EVM Query Language (EQL) è un linguaggio simile a SQL progettato per interrogare le catene EVM (Macchina Virtuale di Ethereum). L'obiettivo finale di EQL è supportare query relazionali complesse sugli elementi di prima classe della catena EVM (blocchi, account e transazioni), fornendo al contempo a sviluppatori e ricercatori una sintassi ergonomica per l'uso quotidiano. Con EQL, gli sviluppatori possono recuperare i dati della blockchain utilizzando una sintassi familiare simile a SQL ed eliminare la necessità di un complesso codice boilerplate. EQL supporta richieste di dati blockchain standard (ad es. recuperare il nonce e il saldo di un account su Ethereum o recuperare la dimensione e il timestamp del blocco corrente) e aggiunge continuamente supporto per richieste e set di funzionalità più complessi.

## Ulteriori letture {#further-reading}

- [Esplorazione dei dati cripto I: architetture del flusso di dati](https://web.archive.org/web/20250125012042/https://research.2077.xyz/exploring-crypto-data-1-data-flow-architectures)
- [Panoramica di Graph Network](https://thegraph.com/docs/en/about/)
- [Graph Query Playground](https://thegraph.com/explorer/subgraph/graphprotocol/graph-network-mainnet?version=current)
- [Esempi di codice API su EtherScan](https://etherscan.io/apis#contracts)
- [Documentazione API su Blockscout](https://docs.blockscout.com/devs/apis)
- [Esploratore della Beacon Chain Beaconcha.in](https://beaconcha.in)
- [Nozioni di base su Dune](https://docs.dune.com/#dune-basics)
- [Guida rapida di SubQuery Ethereum](https://academy.subquery.network/indexer/quickstart/quickstart_chains/ethereum-gravatar.html)
- [Panoramica di SQD Network](https://docs.sqd.dev/)
- [EVM Query Language](https://eql.sh/blog/alpha-release-notes)
