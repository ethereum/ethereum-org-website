---
title: Interazione con altri contratti da Solidity
description: Come distribuire un contratto intelligente da un contratto esistente e interagire con esso
author: "jdourlens"
tags:
  [
    "smart contract",
    "Solidity",
    "remix",
    "distribuzione",
    "componibilità"
  ]
skill: advanced
lang: it
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/interact-with-other-contracts-from-solidity/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Nelle guide precedenti abbiamo imparato molto, ad esempio [come distribuire il tuo primo contratto intelligente](/developers/tutorials/deploying-your-first-smart-contract/) e ad aggiungervi alcune funzionalità come [il controllo degli accessi con i modificatori](https://ethereumdev.io/organize-your-code-and-control-access-to-your-smart-contract-with-modifiers/) o [la gestione degli errori in Solidity](https://ethereumdev.io/handle-errors-in-solidity-with-require-and-revert/). In questa guida impareremo come distribuire un contratto intelligente da un contratto esistente e interagire con esso.

Creeremo un contratto che consenta a chiunque di avere il proprio contratto intelligente `Counter`, creando una factory per esso, il cui nome sarà `CounterFactory`. Prima di tutto, ecco il codice del nostro contratto intelligente `Counter` iniziale:

```solidity
pragma solidity 0.5.17;

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

     constructor(address owner) public {
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

Nota: abbiamo leggermente modificato il codice del contratto per tenere traccia dell'indirizzo della factory e dell'indirizzo del proprietario del contratto. Quando si chiama il codice di un contratto da un altro contratto, `msg.sender` si riferisce all'indirizzo della nostra factory del contratto. È molto importante comprendere questo concetto, perché usare un contratto per interagire con altri contratti è una prassi comune. Dovresti quindi prestare attenzione a chi è il mittente nei casi complessi.

Per questo motivo abbiamo aggiunto anche un modificatore `onlyFactory` che fa in modo che la funzione di cambiamento dello stato possa essere chiamata solo dalla factory, che passerà il chiamante originale come parametro.

All'interno della nostra nuova `CounterFactory` che gestirà tutti gli altri `Counter`, aggiungeremo un `mapping` che assocerà un proprietario all'indirizzo del suo contratto `Counter`:

```solidity
mapping(address => Counter) _counters;
```

In Ethereum, i `mapping` sono l'equivalente degli oggetti in JavaScript: permettono di mappare una chiave di tipo A a un valore di tipo B. In questo caso, mappiamo l'indirizzo di un proprietario con l'istanza del suo `Counter`.

Istanziare un nuovo `Counter` per qualcuno sarà così:

```solidity
  function createCounter() public {
      require (_counters[msg.sender] == Counter(0));
      _counters[msg.sender] = new Counter(msg.sender);
  }
```

Per prima cosa, verifichiamo se la persona possiede già un `Counter`. Se non ne possiede uno, istanziamo un nuovo `Counter` passando il suo indirizzo al costruttore di `Counter` e assegniamo l'istanza appena creata al `mapping`.

Per ottenere il conteggio di un `Counter` specifico, il codice sarà simile a questo:

```solidity
function getCount(address account) public view returns (uint256) {
    require (_counters[account] != Counter(0));
    return (_counters[account].getCount());
}

function getMyCount() public view returns (uint256) {
    return (getCount(msg.sender));
}
```

La prima funzione controlla se il contratto `Counter` esiste per un dato indirizzo e poi chiama il metodo `getCount` dall'istanza. La seconda funzione, `getMyCount`, è solo una scorciatoia per passare `msg.sender` direttamente alla funzione `getCount`.

La funzione `increment` è abbastanza simile, ma passa il mittente della transazione originale al contratto `Counter`:

```solidity
function increment() public {
      require (_counters[msg.sender] != Counter(0));
      Counter(_counters[msg.sender]).increment(msg.sender);
  }
```

Nota che, se chiamato troppe volte, il nostro `Counter` potrebbe essere vittima di un sovraflusso. Dovresti usare il più possibile la [libreria SafeMath](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/) per proteggerti da questo possibile caso.

Per distribuire il nostro contratto, dovrai fornire sia il codice di `CounterFactory` sia quello di `Counter`. Quando si esegue la distribuzione, ad esempio in Remix, è necessario selezionare `CounterFactory`.

Ecco il codice completo:

```solidity
pragma solidity 0.5.17;

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

     constructor(address owner) public {
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
        require (_counters[msg.sender] == Counter(0));
        _counters[msg.sender] = new Counter(msg.sender);
    }

    function increment() public {
        require (_counters[msg.sender] != Counter(0));
        Counter(_counters[msg.sender]).increment(msg.sender);
    }

    function getCount(address account) public view returns (uint256) {
        require (_counters[account] != Counter(0));
        return (_counters[account].getCount());
    }

    function getMyCount() public view returns (uint256) {
        return (getCount(msg.sender));
    }

}
```

Dopo la compilazione, nella sezione di distribuzione di Remix, selezionerai la factory da distribuire:

![Selezione della factory da distribuire in Remix](./counterfactory-deploy.png)

A questo punto puoi fare esperimenti con la factory del tuo contratto e controllare il cambiamento del valore. Se desideri chiamare il contratto intelligente da un indirizzo diverso, dovrai modificare l'indirizzo nella selezione 'Conto' di Remix.
