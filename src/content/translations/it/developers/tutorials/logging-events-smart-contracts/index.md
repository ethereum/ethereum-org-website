---
title: Registrare dati dagli Smart Contract con gli eventi
description: Introduzione agli eventi degli Smart Contract e come usarli per registrare dati
author: "jdourlens"
tags:
  - "Smart Contract"
  - "remix"
  - "Solidity"
  - "eventi"
skill: intermediate
lang: it
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/logging-data-with-events/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

In Solidity, gli [eventi](/developers/docs/smart-contracts/anatomy/#events-and-logs) sono segnali inviati che possono essere attivati dagli Smart Contract. Le dapp, o altri elementi connessi all'API JSON-RPC di Ethereum, possono attendere questi eventi e agire di conseguenza. Gli eventi sono anche indicizzabili così che la cronologia dell'evento sia ricercabile in seguito.

## Eventi {#events}

L'evento più comune sulla blockchain Ethereum al momento della scrittura di questo articolo è l'evento Transfer, emesso dai token ERC20 quando qualcuno trasferisce token.

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

Le firme dell'evento sono dichiarate nel codice del contratto e possono essere emesse con la parola chiave emit. Per esempio l'evento transfer registra chi ha inviato il trasferimento (_from_), a chi (_to_) e quanti token sono stati trasferiti (_value_).

Torniamo al nostro Smart Contract Counter e decidiamo di registrare ogni volta che il valore cambia. Poiché questo contratto non è inteso per la distribuzione ma serve come base per la costruzione di un altro contratto tramite estensione, è detto contratto astratto. Nel caso del nostro esempio Counter somiglierà a:

```solidity
pragma solidity 0.5.17;

contract Counter {

    event ValueChanged(uint oldValue, uint256 newValue);

    // Variabile privata di tipo int senza segno per tenere il numero di conteggi
    uint256 private count = 0;

    // Funzione che incrementa il Counter
    function increment() public {
        count += 1;
        emit ValueChanged(count - 1, count);
    }

    // Getter per ottenere il valore di conteggio
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

Da notare:

- **Riga 5**: dichiariamo l'evento e cosa contiene, il vecchio e il nuovo valore.

- **Riga 13**: quando aumentiamo la variabile di conteggio, emettiamo l'evento.

Se ora distribuiamo il contratto e chiamiamo la funzione di incremento, vedremo che Remix lo mostrerà automaticamente se clicchiamo sulla nuova transazione all'interno di un array di registri con nome.

![Screenshot di Remix](./remix-screenshot.png)

I registri sono davvero utili per il debug degli Smart Contract ma sono anche importanti se si creano applicazioni usate da persone diverse e facilitano l'analisi per monitorare e comprendere come viene usato lo Smart Contract. I registri generati da transazioni sono mostrati in block explorer popolari e ad esempio si possono usare per creare script esterni alla catena, con lo scopo di attendere eventi specifici ed eseguire determinate azioni quando si verificano.
