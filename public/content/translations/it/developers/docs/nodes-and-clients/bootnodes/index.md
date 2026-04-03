---
title: Introduzione ai bootnode di Ethereum
description: Le informazioni di base necessarie per comprendere i bootnode
lang: it
---

Quando un nuovo nodo si unisce alla rete di Ethereum, deve connettersi ai nodi che sono già sulla rete per poter poi scoprire nuovi peer. Questi punti di ingresso nella rete di Ethereum sono chiamati bootnode. I client di solito hanno un elenco di bootnode codificato al loro interno. Questi bootnode sono in genere gestiti dal team devops della Ethereum Foundation o dai team dei client stessi. Nota che i bootnode non sono la stessa cosa dei nodi statici. I nodi statici vengono richiamati ripetutamente, mentre i bootnode vengono interpellati solo se non ci sono abbastanza peer a cui connettersi e un nodo ha bisogno di inizializzare alcune nuove connessioni.

## Connettersi a un bootnode {#connect-to-a-bootnode}

La maggior parte dei client ha un elenco di bootnode integrato, ma potresti anche voler eseguire il tuo bootnode o usarne uno che non fa parte dell'elenco codificato del client. In questo caso, puoi specificarli all'avvio del tuo client, come segue (l'esempio è per Geth, controlla la documentazione del tuo client):

```
geth --bootnodes "enode://<node ID>@<IP address>:<port>"
```

## Eseguire un bootnode {#run-a-bootnode}

I bootnode sono nodi completi che non si trovano dietro a un NAT ([Network Address Translation](https://www.geeksforgeeks.org/network-address-translation-nat/)). Ogni nodo completo può fungere da bootnode purché sia disponibile pubblicamente.

Quando avvii un nodo, dovrebbe registrare il tuo [enode](/developers/docs/networking-layer/network-addresses/#enode), che è un identificatore pubblico che altri possono usare per connettersi al tuo nodo.

L'enode viene solitamente rigenerato a ogni riavvio, quindi assicurati di consultare la documentazione del tuo client su come generare un enode persistente per il tuo bootnode.

Per essere un buon bootnode, è una buona idea aumentare il numero massimo di peer che possono connettersi ad esso. Eseguire un bootnode con molti peer aumenterà significativamente il requisito di larghezza di banda.

## Bootnode disponibili {#available-bootnodes}

Un elenco di bootnode integrati in go-ethereum può essere trovato [qui](https://github.com/ethereum/go-ethereum/blob/master/params/bootnodes.go#L23). Questi bootnode sono mantenuti dalla Ethereum Foundation e dal team di go-ethereum.

Sono disponibili altri elenchi di bootnode mantenuti da volontari. Assicurati di includere sempre almeno un bootnode ufficiale, altrimenti potresti subire un attacco eclipse.