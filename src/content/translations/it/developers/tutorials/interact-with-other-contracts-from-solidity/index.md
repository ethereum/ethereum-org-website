---
title: Interazione con altri contratti da Solidity
description: Come distribuire uno Smart Contract da uno esistente e interagirvi
author: "jdourlens"
tags:
  - "Smart Contract"
  - "Solidity"
  - "remix"
  - "factory"
  - "distribuzione"
  - "componibilità"
skill: advanced
lang: it
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/interact-with-other-contracts-from-solidity/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Nei tutorial precedenti abbiamo imparato molto su [come distribuire il primo Smart Contract](/developers/tutorials/deploying-your-first-smart-contract/) e aggiungervi alcune funzionalità come il [controllo degli accessi con modificatori](https://ethereumdev.io/organize-your-code-and-control-access-to-your-smart-contract-with-modifiers/) o la [gestione degli errori in Solidity](https://ethereumdev.io/handle-errors-in-solidity-with-require-and-revert/). In questo tutorial impareremo come distribuire uno Smart Contract da uno esistente e interagirvi.

Creeremo un contratto che permetta a chiunque ad avere uno Smart Contract `Counter` creando una factory associata, il cui nome sarà `CounterFactory`. Prima di tutto, ecco il codice del nostro Smart Contract iniziale `Counter`:

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

Nota: abbiamo leggermente modificato il codice del contratto per tenere traccia dell'indirizzo della factory e dell'indirizzo del proprietario del contratto. Quando si chiama il codice di un contratto da un altro contratto, msg.sender fa riferimento all'indirizzo della factory del contratto. È **molto importante comprendere questo concetto**, perché usare un contratto per interagire con altri contratti è una prassi comune. Dovresti quindi saper gestire il mittente nei casi complessi.

Per questo motivo abbiamo aggiunto anche un modificatore `onlyFactory` che fa in modo che la funzione di cambiamento dello stato sia chiamabile solo dalla factory che passerà il chiamante originale come parametro.

Nella nostra nuova `CounterFactory` che gestirà tutti gli altri Counter aggiungeremo un mapping che assocerà un proprietario all'indirizzo del relativo contratto Counter:

```solidity
mapping(address => Counter) _counters;
```

In Ethereum, i mapping equivalgono agli oggetti di Javascript, che permettono di mappare una chiave di tipo A a un valore di tipo B. In questo caso mappiamo l'indirizzo di un proprietario all'istanza del suo Counter.

Istanziare un nuovo Counter per un utente sarà più o meno:

```solidity
  function createCounter() public {
      require (_counters[msg.sender] == Counter(0));
      _counters[msg.sender] = new Counter(msg.sender);
  }
```

Prima controlliamo se la persona possiede già un Counter. Se non lo possiede, istanziamo un nuovo Counter passandone l'indirizzo al costruttore del `Counter` e assegniamo l'istanza appena creata al mapping.

Ottenere il conteggio di un Counter specifico significa:

```solidity
function getCount(address account) public view returns (uint256) {
    require (_counters[account] != Counter(0));
    return (_counters[account].getCount());
}

function getMyCount() public view returns (uint256) {
    return (getCount(msg.sender));
}
```

La prima funzione controlla se il contratto Counter esiste per un determinato indirizzo e poi chiama il metodo `getCount` dall'istanza. La seconda funzione: `getMyCount` è passa direttamente msg.sender alla funzione `getCount`.

La funzione `increment` è abbastanza simile ma passa il mittente della transazione originale al contratto `Counter`:

```solidity
function increment() public {
      require (_counters[msg.sender] != Counter(0));
      Counter(_counters[msg.sender]).increment(msg.sender);
  }
```

Nota: se chiamato troppe volte, il Counter potrebbe rimanere vittima di overflow. È consigliabile usare la [libreria di SafeMath](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/) il più possibile per evitare questa eventualità.

Per distribuire il contratto, dovrai fornire sia il codice della `CounterFactory` che il `Counter`. Quando si esegue la distribuzione ad esempio in Remix, è necessario selezionare CounterFactory.

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

Dopo la compilazione, nella sezione di distribuzione di Remix si selezionerà la factory da distribuire:

![Selezione della factory da distribuire in Remix](./counterfactory-deploy.png)

A questo punto puoi fare esperimenti la factory del contratto e controllare il valore che cambia. Per lo Smart Contract da un indirizzo diverso, è necessario cambiare l'indirizzo nella selezione Account di Remix.
