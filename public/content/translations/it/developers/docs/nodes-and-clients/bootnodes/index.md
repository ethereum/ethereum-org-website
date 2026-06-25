---
title: Introduzione ai nodi di avvio di Ethereum
description: Le informazioni di base necessarie per comprendere i nodi di avvio
lang: it
---

Quando un nuovo nodo si unisce alla rete Ethereum, deve connettersi ai nodi che sono già sulla rete per poter poi scoprire nuovi peer. Questi punti di ingresso nella rete Ethereum sono chiamati nodi di avvio. I client di solito hanno un elenco di nodi di avvio hardcoded al loro interno. Questi nodi di avvio sono in genere gestiti dal team devops della Fondazione Ethereum o dai team dei client stessi. Nota che i nodi di avvio non sono la stessa cosa dei nodi statici. I nodi statici vengono richiamati ripetutamente, mentre i nodi di avvio vengono interpellati solo se non ci sono abbastanza peer a cui connettersi e un nodo ha bisogno di avviare (bootstrap) alcune nuove connessioni.

## Connettersi a un nodo di avvio {#connect-to-a-bootnode}

La maggior parte dei client ha un elenco di nodi di avvio integrato, ma potresti anche voler eseguire il tuo nodo di avvio, o usarne uno che non fa parte dell'elenco hardcoded del client. In questo caso, puoi specificarli all'avvio del tuo client, come segue (l'esempio è per Geth, controlla la documentazione del tuo client):

```
geth --bootnodes "enode://<ID del nodo>@<indirizzo IP>:<porta>"
```

## Eseguire un nodo di avvio {#run-a-bootnode}

I nodi di avvio sono nodi completi che non si trovano dietro a un NAT ([Network Address Translation](https://www.geeksforgeeks.org/network-address-translation-nat/)). Ogni nodo completo può fungere da nodo di avvio purché sia disponibile pubblicamente.

Quando avvii un nodo, dovrebbe registrare nei log il tuo [enode](/developers/docs/networking-layer/network-addresses/#enode), che è un identificatore pubblico che altri possono usare per connettersi al tuo nodo.

L'enode viene solitamente rigenerato a ogni riavvio, quindi assicurati di consultare la documentazione del tuo client su come generare un enode persistente per il tuo nodo di avvio.

Per essere un buon nodo di avvio, è una buona idea aumentare il numero massimo di peer che possono connettersi ad esso. L'esecuzione di un nodo di avvio con molti peer aumenterà significativamente i requisiti di larghezza di banda.

## Nodi di avvio disponibili {#available-bootnodes}

Un elenco di nodi di avvio integrati in go-ethereum può essere trovato [qui](https://github.com/ethereum/go-ethereum/blob/master/params/bootnodes.go#L23). Questi nodi di avvio sono mantenuti dalla Fondazione Ethereum e dal team di go-ethereum.

Sono disponibili altri elenchi di nodi di avvio mantenuti da volontari. Assicurati di includere sempre almeno un nodo di avvio ufficiale, altrimenti potresti subire un attacco eclipse.