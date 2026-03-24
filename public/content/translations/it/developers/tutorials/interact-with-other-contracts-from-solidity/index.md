---
title: Interagire con altri contratti da Solidity
description: Come distribuire un contratto intelligente da un contratto esistente e interagirvi
author: "jdourlens"
tags: ["contratti intelligenti", "Solidity", "Remix", "distribuzione", "componibilità"]
skill: advanced
breadcrumb: Interazioni tra contratti
lang: it
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/interact-with-other-contracts-from-solidity/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Nei tutorial precedenti abbiamo imparato molto su [come distribuire il tuo primo contratto intelligente](/developers/tutorials/deploying-your-first-smart-contract/) e aggiungervi alcune funzionalità come [controllare l'accesso con i modificatori](https://ethereumdev.io/organize-your-code-and-control-access-to-your-smart-contract-with-modifiers/) o [gestire gli errori in Solidity](https://ethereumdev.io/handle-errors-in-solidity-with-require-and-revert/). In questo tutorial impareremo come distribuire un contratto intelligente da un contratto esistente e interagirvi.

Creeremo un contratto che consenta a chiunque di avere il proprio contratto intelligente `Counter` creandone una fabbrica (factory), il cui nome sarà `CounterFactory`. Innanzitutto, ecco il codice del nostro contratto intelligente `Counter` iniziale:

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

Nota che abbiamo leggermente modificato il codice del contratto per tenere traccia dell'indirizzo della factory e dell'indirizzo del proprietario del contratto. Quando chiami il codice di un contratto da un altro contratto, il msg.sender si riferirà all'indirizzo della nostra factory del contratto. Questo è **un punto davvero importante da comprendere** poiché usare un contratto per interagire con altri contratti è una pratica comune. Dovresti quindi prestare attenzione a chi è il mittente nei casi complessi.

Per questo abbiamo anche aggiunto un modificatore `onlyFactory` che si assicura che la funzione che modifica lo stato possa essere chiamata solo dalla factory, la quale passerà il chiamante originale come parametro.

All'interno della nostra nuova `CounterFactory` che gestirà tutti gli altri Counter, aggiungeremo una mappatura (mapping) che assocerà un proprietario all'indirizzo del suo contratto counter:

```solidity
mapping(address => Counter) _counters;
```

In Ethereum, le mappature sono l'equivalente degli oggetti in javascript, consentono di mappare una chiave di tipo A a un valore di tipo B. In questo caso mappiamo l'indirizzo di un proprietario con l'istanza del suo Counter.

L'istanziazione di un nuovo Counter per qualcuno avrà questo aspetto:

```solidity
  function createCounter() public {
      require (_counters[msg.sender] == Counter(0));
      _counters[msg.sender] = new Counter(msg.sender);
  }
```

Per prima cosa controlliamo se la persona possiede già un counter. Se non possiede un counter, istanziamo un nuovo counter passando il suo indirizzo al costruttore di `Counter` e assegniamo l'istanza appena creata alla mappatura.

Per ottenere il conteggio di un Counter specifico, l'aspetto sarà questo:

```solidity
function getCount(address account) public view returns (uint256) {
    require (_counters[account] != Counter(0));
    return (_counters[account].getCount());
}

function getMyCount() public view returns (uint256) {
    return (getCount(msg.sender));
}
```

La prima funzione controlla se il contratto Counter esiste per un dato indirizzo e poi chiama il metodo `getCount` dall'istanza. La seconda funzione: `getMyCount` è solo una scorciatoia per passare il msg.sender direttamente alla funzione `getCount`.

La funzione `increment` è abbastanza simile ma passa il mittente originale della transazione al contratto `Counter`:

```solidity
function increment() public {
      require (_counters[msg.sender] != Counter(0));
      Counter(_counters[msg.sender]).increment(msg.sender);
  }
```

Nota che se chiamato troppe volte, il nostro counter potrebbe essere vittima di un overflow. Dovresti usare la [libreria SafeMath](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/) il più possibile per proteggerti da questo possibile caso.

Per distribuire il nostro contratto, dovrai fornire sia il codice della `CounterFactory` che del `Counter`. Quando distribuisci, ad esempio in Remix, dovrai selezionare CounterFactory.

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

Dopo la compilazione, nella sezione di distribuzione di Remix selezionerai la factory da distribuire:

![Selezione della factory da distribuire in Remix](./counterfactory-deploy.png)

Quindi puoi giocare con la tua factory del contratto e controllare il cambiamento del valore. Se desideri chiamare il contratto intelligente da un indirizzo diverso, dovrai cambiare l'indirizzo nella selezione Account di Remix.