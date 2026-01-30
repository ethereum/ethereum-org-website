---
title: Registrazione di dati da contratti intelligenti con eventi
description: Un'introduzione agli eventi dei contratti intelligenti e a come utilizzarli per registrare dati
author: "jdourlens"
tags: [ "smart contract", "remix", "Solidity", "eventi" ]
skill: intermediate
lang: it
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/logging-data-with-events/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

In Solidity, gli [eventi](/developers/docs/smart-contracts/anatomy/#events-and-logs) sono segnali inviati che i contratti intelligenti possono attivare. Le dApp, o qualsiasi cosa connessa all'API JSON-RPC di Ethereum, possono ascoltare questi eventi e agire di conseguenza. Un evento può anche essere indicizzato in modo che la cronologia dell'evento sia ricercabile in seguito.

## Eventi {#events}

L'evento più comune sulla blockchain di Ethereum al momento della stesura di questo articolo è l'evento Transfer, emesso dai token ERC20 quando qualcuno trasferisce dei token.

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

La firma dell'evento è dichiarata all'interno del codice del contratto e può essere emessa con la parola chiave emit. Ad esempio, l'evento transfer registra chi ha inviato il trasferimento (_from_), a chi (_to_) e quanti token sono stati trasferiti (_value_).

Se torniamo al nostro contratto intelligente Counter e decidiamo di registrare ogni volta che il valore viene modificato. Poiché questo contratto non è destinato a essere distribuito ma a fungere da base per la creazione di un altro contratto tramite estensione, è detto contratto astratto. Nel caso del nostro esempio Counter, il risultato sarà il seguente:

```solidity
pragma solidity 0.5.17;

contract Counter {

    event ValueChanged(uint oldValue, uint256 newValue);

    // Variabile privata di tipo intero senza segno per conservare il numero di conteggi
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

Da notare:

- **Riga 5**: dichiariamo l'evento e cosa contiene, il vecchio e il nuovo valore.

- **Riga 13**: quando incrementiamo la nostra variabile di conteggio, emettiamo l'evento.

Se ora distribuiamo il contratto e chiamiamo la funzione di incremento, vedremo che Remix lo mostrerà automaticamente se facciamo clic sulla nuova transazione all'interno di un array chiamato logs.

![Screenshot di Remix](./remix-screenshot.png)

I log sono molto utili per il debug dei contratti intelligenti, ma sono anche importanti se si creano applicazioni usate da persone diverse e facilitano l'analisi per monitorare e comprendere come viene usato il contratto intelligente. I log generati dalle transazioni sono visualizzati nei più diffusi esploratori di blocchi e si possono anche usare, ad esempio, per creare script fuori dalla catena che restino in ascolto di eventi specifici e intraprendano azioni quando questi si verificano.
