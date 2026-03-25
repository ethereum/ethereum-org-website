---
title: Registrare i dati dai contratti intelligenti con gli eventi
description: Un'introduzione agli eventi dei contratti intelligenti e a come puoi usarli per registrare i dati
author: "jdourlens"
tags: ["contratti intelligenti", "Remix", "Solidity", "eventi"]
skill: intermediate
breadcrumb: Registrazione degli eventi
lang: it
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/logging-data-with-events/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

In Solidity, gli [eventi](/developers/docs/smart-contracts/anatomy/#events-and-logs) sono segnali inviati che i contratti intelligenti possono attivare. Le dApp, o qualsiasi cosa connessa all'API JSON-RPC di Ethereum, possono ascoltare questi eventi e agire di conseguenza. Un evento può anche essere indicizzato in modo che la cronologia degli eventi sia ricercabile in seguito.

## Eventi {#events}

L'evento più comune sulla blockchain di Ethereum al momento della stesura di questo articolo è l'evento Transfer che viene emesso dai token ERC20 quando qualcuno trasferisce dei token.

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

La firma dell'evento è dichiarata all'interno del codice del contratto e può essere emessa con la parola chiave emit. Ad esempio, l'evento transfer registra chi ha inviato il trasferimento (_from_), a chi (_to_) e quanti token sono stati trasferiti (_value_).

Se torniamo al nostro contratto intelligente Counter e decidiamo di registrare ogni volta che il valore viene modificato. Poiché questo contratto non è destinato a essere distribuito ma a fungere da base per costruire un altro contratto estendendolo: è chiamato contratto astratto. Nel caso del nostro esempio del contatore, apparirebbe così:

```solidity
pragma solidity 0.5.17;

contract Counter {

    event ValueChanged(uint oldValue, uint256 newValue);

    // Variabile privata di tipo unsigned int per mantenere il numero di conteggi
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

Se ora distribuiamo il contratto e chiamiamo la funzione increment, vedremo che Remix lo visualizzerà automaticamente se fai clic sulla nuova transazione all'interno di un array chiamato logs.

![Screenshot di Remix](./remix-screenshot.png)

I log sono davvero utili per il debug dei tuoi contratti intelligenti, ma sono anche importanti se crei applicazioni utilizzate da persone diverse e semplificano l'esecuzione di analisi per tracciare e comprendere come viene utilizzato il tuo contratto intelligente. I log generati dalle transazioni vengono visualizzati nei popolari esploratori di blocchi e puoi anche, ad esempio, usarli per creare script fuori catena per ascoltare eventi specifici e intraprendere azioni quando si verificano.