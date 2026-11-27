---
title: Registrare i dati dagli smart contract con gli eventi
description: Un'introduzione agli eventi degli smart contract e a come puoi usarli per registrare i dati
author: "jdourlens"
tags: ["smart contract", "Remix", "Solidity", "eventi"]
skill: intermediate
breadcrumb: Registrazione degli eventi
lang: it
published: 2020-04-03
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

In Solidity, gli [eventi](/developers/docs/smart-contracts/anatomy/#events-and-logs) sono segnali inviati che gli smart contract possono attivare. Le applicazioni decentralizzate (dapp), o qualsiasi cosa connessa all'API JSON-RPC di Ethereum, possono ascoltare questi eventi e agire di conseguenza. Un evento può anche essere indicizzato in modo che la cronologia degli eventi sia ricercabile in seguito.

## Eventi {#events}

Uno degli eventi più comuni sulla blockchain di Ethereum è l'evento `Transfer` che viene emesso dai token ERC-20 quando qualcuno trasferisce token.

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

La firma dell'evento è dichiarata all'interno del codice del contratto e può essere emessa con la parola chiave emit. Ad esempio, l'evento di trasferimento registra chi ha inviato il trasferimento (_from_), a chi (_to_) e quanti token sono stati trasferiti (_value_).

Torniamo allo smart contract `Counter` da [distribuire il tuo primo smart contract](/developers/tutorials/deploying-your-first-smart-contract/) e registriamo nei log ogni volta che il valore viene modificato. Apparirebbe così:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Counter {

    event ValueChanged(uint256 oldValue, uint256 newValue);

    // Variabile pubblica di tipo unsigned int per mantenere il numero di conteggi
    uint256 public count = 0;

    // Funzione che incrementa il nostro contatore
    function increment() public {
        count += 1;
        emit ValueChanged(count - 1, count);
    }

    // Getter non necessario per ottenere il valore del conteggio
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

Nota che:

- **Riga 6**: dichiariamo il nostro evento e cosa contiene, il vecchio valore e il nuovo valore.

- **Riga 14**: Quando incrementiamo la nostra variabile count, emettiamo l'evento.

Se ora distribuiamo il contratto e chiamiamo la funzione increment, vedremo che Remix lo mostrerà automaticamente se fai clic sulla nuova transazione all'interno di un array chiamato logs.

![Screenshot di Remix](./remix-screenshot.png)

I log sono davvero utili per il debug dei tuoi smart contract, ma sono anche importanti se crei applicazioni usate da diverse persone e semplificano la creazione di analisi per tracciare e comprendere come viene usato il tuo smart contract. I log generati dalle transazioni vengono mostrati nei block explorer più popolari e puoi anche, ad esempio, usarli per creare script offchain per ascoltare eventi specifici e intraprendere azioni quando si verificano.
