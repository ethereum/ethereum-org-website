---
title: Introduzione ai nodi d'avvio di Ethereum
description: Le informazioni di base necessarie per comprendere i nodi d'avvio
lang: it
---

Quando un nuovo nodo si unisce alla rete di Ethereum, deve connettersi ai nodi già sulla rete per poter poi scoprire nuovi pari. Questi punti d'accesso alla rete di Ethereum sono detti nodi d'avvio. I client ne contengono solitamente un elenco a codifica fissa. Questi nodi d'avvio sono tipicamente eseguiti dal team delle operazioni di sviluppo della Ethereum Foundation o dai team degli stessi client. Nota che i nodi d'avvio non equivalgono ai nodi statici. I nodi statici sono chiamati ripetutamente, mentre i nodi d'avvio sono chiamati soltanto se non esistono abbastanza pari a cui connettersi e se un nodo necessita di avviare qualche nuova connessione.

## Connettersi a un nodo d'avvio {#connect-to-a-bootnode}

Gran parte dei client contiene un elenco integrato di nodi d'avvio, ma potresti voler anche eseguire il tuo o utilizzarne uno che non appartenga all'elenco a codifica fissa del client. In questo caso, puoi specificarli all'avvio del tuo client come segue (l'esempio è per Geth, consulta la documentazione del tuo client):

```
geth --bootnodes "enode://<node ID>@<IP address>:<port>"
```

## Eseguire un nodo d'avvio {#run-a-bootnode}

I nodi d'avvio sono nodi completi non posti dietro una NAT ([Traduzione dell'indirizzo di rete](https://www.geeksforgeeks.org/network-address-translation-nat/)). Ogni nodo completo può agire da nodo d'avvio a condizione che sia pubblicamente disponibile.

Quando avvii un nodo, dovrebbe registrare il tuo [enode](/developers/docs/networking-layer/network-addresses/#enode), un identificativo pubblico utilizzabile dagli altri per connettersi al tuo nodo.

L'enode è solitamente rigenerato a ogni riavvio, quindi assicurati di consultare la documentazione del tuo client su come generare un enode persistente per il tuo nodo d'avvio.

Per poter essere un buon nodo d'avvio è una buona idea incrementare il numero massimo di pari che possono connettersi a esso. L'esecuzione di un nodo d'avvio con molti peer aumenterà in modo significativo i requisiti di larghezza di banda.

## Nodi d'avvio disponibili {#available-bootnodes}

Un elenco di nodi d'avvio integrati in go-ethereum si può trovare [qui](https://github.com/ethereum/go-ethereum/blob/master/params/bootnodes.go#L23). Questi nodi d'avvio sono mantenuti dalla Ethereum Foundation e dal team di go-ethereum.

Sono disponibili altri elenchi di nodi d'avvio tenuti da volontari. Assicurati di includere sempre almeno un nodo d'avvio ufficiale, altrimenti potresti subire un attacco eclipse.
