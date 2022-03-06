---
title: API di JSON-RPC
description: Un protocollo di chiamata della procedura remota (RPC) leggero e privo di stato per i client di Ethereum.
lang: it
sidebar: true
---

Affinché un'applicazione software interagisca con la blockchain di Ethereum (leggendo i dati della blockchain e/o inviando le transazioni alla rete), deve connettersi a un nodo di Ethereum.

A tale scopo, ogni [client di Ethereum](/developers/docs/nodes-and-clients/#execution-clients) implementa una [specifica di JSON-RPC](http://www.jsonrpc.org/specification), in modo tale che vi sia una serie uniforme di metodi su cui si basano le applicazioni.

JSON-RPC è un protocollo di chiamata della procedura remota (RPC) leggero e privo di stato. Principalmente, la specifica definisce diverse strutture di dati e le regole intorno alla loro elaborazione. È indipendente dal trasporto, poiché i concetti sono utilizzabili entro lo stesso processo, su prese, via HTTP o in svariati ambienti di passaggio dei messaggi. Usa JSON (RFC 4627) come formato dei dati.

## Risorse JSON-RPC {#json-rpc-resources}

- [Specifiche JSON-RPC di Ethereum](https://playground.open-rpc.org/?schemaUrl=https://raw.githubusercontent.com/ethereum/eth1.0-apis/assembled-spec/openrpc.json&uiSchema[appBar][ui:splitView]=true&uiSchema[appBar][ui:input]=false&uiSchema[appBar][ui:examplesDropdown]=false)
- [Repo di GitHub delle Specifiche JSON-RPC di Ethereum](https://github.com/ethereum/eth1.0-apis)

## Implementazioni del client {#client-implementations}

I client di Ethereum possono usare linguaggi di programmazione diversi per l'implementazione della specifica di JSON-RPC. Visualizza la [documentazione dei singoli client](/developers/docs/nodes-and-clients/#execution-clients) per ulteriori dettagli sui linguaggi di programmazione specifici. Consigliamo di consultare la documentazione di ogni client per le informazioni più aggiornate sul supporto dell'API.

## Librerie utili {#convenience-libraries}

Anche se è possibile scegliere di interagire direttamente con i client di Ethereum tramite l'API di JSON-RPC, spesso esistono opzioni più semplici per gli sviluppatori di dApp. Esistono molte librerie di [JavaScript](/developers/docs/apis/javascript/#available-libraries) e dell'[API del backend](/developers/docs/apis/backend/#available-libraries) che forniscono wrapper sull'API di JSON-RPC. Con queste librerie, gli sviluppatori possono scrivere metodi intuitivi di una riga nel linguaggio di programmazione di loro scelta per inizializzare le richieste di JSON-RPC (sottostanti) che interagiscono con Ethereum.

## Argomenti correlati {#related-topics}

- [Nodi e client](/developers/docs/nodes-and-clients/)
- [API di JavaScript](/developers/docs/apis/javascript/)
- [API per il backend](/developers/docs/apis/backend/)
