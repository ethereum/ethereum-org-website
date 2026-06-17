---
title: Registrare i dati dagli smart contract con gli eventi
description: Un'introduzione agli eventi degli smart contract e a come puoi usarli per registrare i dati
author: "jdourlens"
tags: ["smart contract", "remix", "solidity", "eventi"]
skill: intermediate
breadcrumb: Registrazione degli eventi
lang: it
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/logging-data-with-events/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

In Solidity, gli [eventi](/developers/docs/smart-contracts/anatomy/#events-and-logs) sono segnali inviati che gli smart contract possono attivare. Le applicazioni decentralizzate (dapp), o qualsiasi cosa connessa all'API JSON-RPC di Ethereum, possono ascoltare questi eventi e agire di conseguenza. Un evento può anche essere indicizzato in modo che la cronologia degli eventi sia ricercabile in seguito.

## Eventi {#events}

L'evento più comune sulla blockchain di Ethereum al momento della stesura di questo articolo è l'evento Transfer che viene emesso dai token ERC-20 quando qualcuno trasferisce dei token.

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

La firma dell'evento è dichiarata all'interno del codice del contratto e può essere emessa con la parola chiave emit. Ad esempio, l'evento transfer registra chi ha inviato il trasferimento (_from_), a chi (_to_) e quanti token sono stati trasferiti (_value_).

Se torniamo al nostro smart contract Counter e decidiamo di registrare ogni volta che il valore viene modificato. Poiché questo contratto non è destinato a essere distribuito ma a fungere da base per costruire un altro contratto estendendolo: è chiamato contratto astratto. Nel caso del nostro esempio del contatore, apparirebbe così:

```solidity
pragma solidity 0.5.17;

contract Counter {

    event ValueChanged(uint oldValue, uint256 newValue);

    // Variabile privata di tipo unsigned int per tenere traccia del numero di conteggi
    uint256 private count = 0;

    // Funzione che incrementa il nostro contatore
    function increment() public {
        count += 1;
        emit ValueChanged(count - 1, count);
    }

    // Getter per ottenere il valore del conteggio
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

Nota che:

- **Riga 5**: dichiariamo il nostro evento e cosa contiene, il vecchio valore e il nuovo valore.

- **Riga 13**: Quando incrementiamo la nostra variabile count, emettiamo l'evento.

Se ora distribuiamo il contratto e chiamiamo la funzione increment, vedremo che Remix lo mostrerà automaticamente se fai clic sulla nuova transazione all'interno di un array chiamato logs.

![Remix screenshot](./remix-screenshot.png)

I log sono davvero utili per il debug dei tuoi smart contract, ma sono anche importanti se crei applicazioni usate da diverse persone e semplificano l'esecuzione di analisi per tracciare e capire come viene usato il tuo smart contract. I log generati dalle transazioni vengono visualizzati nei block explorer più popolari e puoi anche, ad esempio, usarli per creare script offchain per ascoltare eventi specifici e intraprendere azioni quando si verificano.