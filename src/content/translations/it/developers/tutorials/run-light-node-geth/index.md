---
title: Come eseguire un nodo leggero con Geth
description: Come scaricare, installare ed eseguire un client leggero con Geth.
authors: "Brian Gu"
tags:
  - "client"
  - "geth"
  - "nodi"
skill: beginner
lang: it
published: 2022-03-04
---

Se ti interessa eseguire un [nodo Ethereum](/developers/docs/nodes-and-clients/), uno dei modi più facili è scaricare, installare ed eseguire Geth. Con Geth, possiamo ottenere un nodo leggero attivo in pochi minuti.

Un client leggero richiede meno di 400MB d'archiviazione, pur consentendo la piena interattività con lo stato di Ethereum. I client leggeri recuperano i dati dai peer remoti, quindi alcune interrogazioni potrebbero richiedere un più di tempo per la risposta rispetto ad altre modalità di sincronizzazione.

Per una spiegazione delle differenze tra le diverse modalità di sincronizzazione, leggi la nostra [documentazione per sviluppatori di nodi e client](/developers/docs/nodes-and-clients/#node-types).

## Installa ed esegui {#install-and-run}

Innanzitutto occorre [installare Geth](https://geth.ethereum.org/docs/install-and-build/installing-geth).

Dopo aver installato Geth, puoi eseguire un nodo di Ethereum in modalità "light" eseguendo il seguente comando in una finestra del Terminale:

```bash
geth --syncmode light
```

Una volta avviato, Geth inizia a connettersi ad altri nodi su Ethereum, noti come "peer". Il processo di connessione ai peer potrebbe richiedere un po' di tempo.

Quando il tuo nodo di Geth ha abbastanza peer, importerà le intestazioni dai nuovi blocchi sulla catena.

Quando le intestazioni del nuovo blocco non avranno più una "età", Geth sarà sincronizzato all'inizio della catena.

## Arrestare e riavviare il nodo {#stopping-and-restarting-your-node}

Puoi interrompere il tuo nodo quando vuoi premendo <kbd>CTRL</kbd>+<kbd>C</kbd>.

Riavviando il nodo, Geth impiegherà qualche minuto per scaricare le intestazioni del blocco create dall'ultima esecuzione del nodo.

## Abilita il server HTTP-RPC {#enable-the-http-rpc-server}

Abilitare il server HTTP-RPC ti consente di connettere il tuo nodo di Ethereum ad altri software come portafogli, estensioni del browser o librerie software personalizzate.

Puoi abilitare il server HTTP-RPC eseguendo il seguente comando al lancio di Geth:

```bash
geth --syncmode light --http
```

Una volta abilitato, esegui `curl http://127.0.0.1:8545`. Non dovresti ricevere alcun errore.

### Consenti le connessioni remote {#allow-remote-connections}

Per consentire a host remoti di connettersi al tuo nodo, avvia Geth con il seguente comando:

```
geth --syncmode light --http --http.addr 0.0.0.0
```

Nota: questo presuppone che non ci sia alcun processo che blocca le richieste al tuo host locale, come ad esempio un firewall.

## Console JavaScript di Geth {#geth-javascript-console}

Geth ha una console JavaScript integrata e un'APi JavaScript chiamata [web3js](https://github.com/ethereum/web3.js/), che puoi usare per interagire col tuo nodo.

Per usare la console JavaScript, esegui:

```bash
geth attach
```

Questa console consente di interagire direttamente con Ethereum. Ad esempio, eseguendo il comando `eth.blockNumber` si otterrà il numero dell'ultimo blocco noto.

[Documentazione completa di web3js](http://web3js.readthedocs.io/)

## Rete principale e reti di prova {#mainnet-and-testnets}

Geth esegue di default il tuo nodo sulla [Rete principale di Ethereum](/glossary/#mainnet/).

Puoi anche usare Geth per eseguire un nodo su una delle [reti di prova pubbliche](/networks/#testnets/), eseguendo uno dei seguenti comandi nel Terminale:

```bash
geth --syncmode light --ropsten
geth --syncmode light --rinkeby
geth --syncmode light --goerli
```

## Dove sono memorizzati i dati della blockchain e dell'EVM? {#where-is-the-blockchain-and-evm-data-stored}

La directory che Geth usa per memorizzare i dati grezzi della blockchain dipende dal sistema operativo. Dopo aver eseguito Geth, cerca un messaggio simile a questo:

```bash
INFO [11-18|14:04:47] Allocated cache and file handles         database=/Users/bgu/Library/Ethereum/testnet/geth/lightchaindata cache=768 handles=128
```

Il percorso dopo `"database="` dovrebbe indicare dove sono memorizzati i dati della blockchain sul computer locale. Se esegui un nodo completo, questa directory conterrà tutti i dati su ogni blocco salvato nella blockchain. Poiché noi eseguiamo un nodo leggero, questa directory contiene solo le intestazioni dei blocchi.

Vale la pena ribadire che, al livello più basso, questo percorso è la posizione in cui si trova la blockchain. I contenuti completi della blockchain e dello stato dell'EVM sono memorizzati in ogni nodo completo nella rete di Ethereum, in directory che somigliano molto a quella presente sul tuo computer.

## Letture consigliate {#further-reading}

- [Scopri di più sulle diverse reti](/developers/docs/networks/).
- [Eseguire un nodo di Ethereum](/run-a-node/)
