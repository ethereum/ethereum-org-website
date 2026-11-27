---
title: Interagire con altri contratti da Solidity
description: Come distribuire uno smart contract da un contratto esistente e interagirvi
author: "jdourlens"
tags: ["smart contract", "Solidity", "Remix", "distribuzione", "componibilità"]
skill: advanced
breadcrumb: Interazioni tra contratti
lang: it
published: 2020-04-05
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Nei tutorial precedenti abbiamo imparato molto su [come distribuire il tuo primo smart contract](/developers/tutorials/deploying-your-first-smart-contract/) e aggiungervi alcune funzionalità come [controllare l'accesso con i modificatori](https://docs.soliditylang.org/en/latest/contracts.html#function-modifiers) o [la gestione degli errori in Solidity](https://docs.soliditylang.org/en/latest/control-structures.html#error-handling-assert-require-revert-and-exceptions). In questo tutorial impareremo come distribuire uno smart contract da un contratto esistente e interagirvi.

Creeremo un contratto che consenta a chiunque di avere il proprio smart contract `Counter` creando una factory per esso, il cui nome sarà `CounterFactory`. Innanzitutto, ecco il codice del nostro smart contract `Counter` iniziale:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Counter {

    uint256 private _count;
    address private _owner;
    address private _factory;


     modifier onlyOwner(address caller) {
        require(caller == _owner, "You're not the owner of the contract");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == _factory, "You need to use the factory");
        _;
    }

     constructor(address owner) {
        _owner = owner;
        _factory = msg.sender;
    }

     function getCount() public view returns (uint256) {
        return _count;
    }

    function increment(address caller) public onlyFactory onlyOwner(caller) {
        _count++;
    }

}
```

Nota che abbiamo leggermente modificato il codice del contratto per tenere traccia dell'indirizzo della factory e dell'indirizzo del proprietario del contratto. Quando chiami il codice di un contratto da un altro contratto, msg.sender farà riferimento all'indirizzo della nostra factory di contratti. Questo è **un punto davvero importante da comprendere** poiché usare un contratto per interagire con altri contratti è una pratica comune. Dovresti quindi prestare attenzione a chi è il mittente nei casi complessi.

Per questo abbiamo anche aggiunto un modificatore `onlyFactory` che si assicura che la funzione che modifica lo stato possa essere chiamata solo dalla factory che passerà il chiamante originale come parametro.

All'interno del nostro nuovo `CounterFactory` che gestirà tutti gli altri Counter, aggiungeremo una mappatura che assocerà un proprietario all'indirizzo del suo contratto counter:

```solidity
mapping(address => Counter) _counters;
```

In Solidity, le [mappature](https://docs.soliditylang.org/en/latest/types.html#mapping-types) sono simili agli oggetti in JavaScript: mappano una chiave di tipo A a un valore di tipo B. In questo caso mappiamo l'indirizzo di un proprietario con l'istanza del suo Counter.

L'istanziazione di un nuovo Counter per qualcuno avrà questo aspetto:

```solidity
  function createCounter() public {
      require(address(_counters[msg.sender]) == address(0), "You already have a counter");
      _counters[msg.sender] = new Counter(msg.sender);
  }
```

Per prima cosa controlliamo se la persona possiede già un counter. Una mappatura restituisce il valore predefinito per le chiavi che non sono mai state impostate, che per un tipo di contratto è l'indirizzo zero, quindi confrontiamo l'indirizzo del contratto memorizzato con `address(0)`. Se non possiede un counter, istanziamo un nuovo counter passando il suo indirizzo al costruttore `Counter` e assegniamo l'istanza appena creata alla mappatura.

Per ottenere il conteggio di un Counter specifico, l'aspetto sarà questo:

```solidity
function getCount(address account) public view returns (uint256) {
    require(address(_counters[account]) != address(0), "This account has no counter");
    return (_counters[account].getCount());
}

function getMyCount() public view returns (uint256) {
    return (getCount(msg.sender));
}
```

La prima funzione controlla se il contratto Counter esiste per un dato indirizzo e poi chiama il metodo `getCount` dall'istanza. La seconda funzione: `getMyCount` è solo una scorciatoia per passare msg.sender direttamente alla funzione `getCount`.

La funzione `increment` è abbastanza simile ma passa il mittente originale della transazione al contratto `Counter`:

```solidity
function increment() public {
      require(address(_counters[msg.sender]) != address(0), "You need to create a counter first");
      _counters[msg.sender].increment(msg.sender);
  }
```

A partire da Solidity 0.8, l'aritmetica è [controllata per impostazione predefinita](https://docs.soliditylang.org/en/latest/control-structures.html#checked-or-unchecked-arithmetic): se `_count` andasse mai in overflow, `_count++` farebbe il revert della transazione invece di ricominciare silenziosamente da capo, quindi non è necessaria alcuna libreria aggiuntiva come SafeMath.

Per distribuire il nostro contratto, dovrai fornire sia il codice del `CounterFactory` che del `Counter`. Quando distribuisci ad esempio in Remix, dovrai selezionare CounterFactory.

Ecco il codice completo:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Counter {

    uint256 private _count;
    address private _owner;
    address private _factory;


     modifier onlyOwner(address caller) {
        require(caller == _owner, "You're not the owner of the contract");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == _factory, "You need to use the factory");
        _;
    }

     constructor(address owner) {
        _owner = owner;
        _factory = msg.sender;
    }

     function getCount() public view returns (uint256) {
        return _count;
    }

    function increment(address caller) public onlyFactory onlyOwner(caller) {
        _count++;
    }

}

contract CounterFactory {

    mapping(address => Counter) _counters;

    function createCounter() public {
        require(address(_counters[msg.sender]) == address(0), "You already have a counter");
        _counters[msg.sender] = new Counter(msg.sender);
    }

    function increment() public {
        require(address(_counters[msg.sender]) != address(0), "You need to create a counter first");
        _counters[msg.sender].increment(msg.sender);
    }

    function getCount(address account) public view returns (uint256) {
        require(address(_counters[account]) != address(0), "This account has no counter");
        return (_counters[account].getCount());
    }

    function getMyCount() public view returns (uint256) {
        return (getCount(msg.sender));
    }

}
```

Dopo la compilazione, nella sezione di distribuzione di Remix selezionerai la factory da distribuire:

![Selezione della factory da distribuire in Remix](./counterfactory-deploy.png)

Quindi puoi giocare con la tua factory di contratti e controllare il cambiamento del valore. Se desideri chiamare lo smart contract da un indirizzo diverso, dovrai cambiare l'indirizzo nella selezione Account di Remix.
