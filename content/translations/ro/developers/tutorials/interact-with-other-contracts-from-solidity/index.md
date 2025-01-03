---
title: Interacționează cu alte contracte din Solidity
description: Cum se implementezi un contract inteligent dintr-un contract existent și să interacționezi cu acesta
author: "jdourlens"
tags:
  - "contracte inteligente"
  - "solidity"
  - "remix"
  - "fabrici"
  - "implementare"
  - "combinabilitate"
skill: advanced
lang: ro
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/interact-with-other-contracts-from-solidity/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

În tutorialele anterioare ai învățat multe: [cum să implementezi primul tău contract inteligent](/developers/tutorials/deploying-your-first-smart-contract/) și să adaugi câteva caracteristici la acesta precum [controlul accesului cu modificatori](https://ethereumdev.io/organize-your-code-and-control-access-to-your-smart-contract-with-modifiers/) sau [gestionarea erorilor în Solidity](https://ethereumdev.io/handle-errors-in-solidity-with-require-and-revert/). În acest tutorial vei învăța cum să implementezi un contract inteligent dintr-un contract existent și să interacționezi cu acesta.

Vei crea un contract care permite oricui să aibă propriul contract inteligent `Counter`, creând o fabrică pentru acesta, numele ei va fi `CounterFactory`. În primul rând aici este codul contractului inteligent inițial `Counter`:

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

Reține că am modificat ușor codul contractului pentru a urmări adresa fabricii și adresa proprietarului contractului. Când apelezi un cod de contract dintr-un alt contract, msg.sender va face referire la adresa fabricii noastre de contracte. Acesta este **un punct foarte important de înțeles**, deoarece utilizarea unui contract pentru a interacționa cu alte contracte este o practică comună. Prin urmare, ar trebui să ai grijă de cine este expeditorul în cazuri complexe.

Pentru aceasta am adăugat și un modificator `onlyFactory` care se asigură că funcția de modificare a stării poate fi apelată doar de fabrică, care va transmite apelantul inițial ca parametru.

În interiorul noului nostru `CounterFactory`, care va gestiona toate celelalte contoare, vom adăuga o mapare care va asocia un proprietar la adresa contractului său:

```solidity
mapping(address => Counter) _counters;
```

În Ethereum, maparea este echivalentă cu obiectele din javascript, acestea permit maparea unei chei de tip A la o valoare de tip B. În acest caz, vom mapa adresa unui proprietar cu instanța Counter-ului său.

Crearea unei instanțe de contor nou pentru cineva, va arăta astfel:

```solidity
  function createCounter() public {
      require (_counters[msg.sender] == Counter(0));
      _counters[msg.sender] = new Counter(msg.sender);
  }
```

Verificăm mai întâi dacă persoana deține deja un contor. Dacă nu deține un contor, creăm o nouă instanță de contor nou prin trecerea adresei sale la constructorul `Counter` și atribuim noua instanță creată la mapare.

Pentru a obține numărul unui contor specific, scriem:

```solidity
function getCount(address account) public view returns (uint256) {
    require (_counters[account] != Counter(0));
    return (_counters[account].getCount());
}

function getMyCount() public view returns (uint256) {
    return (getCount(msg.sender));
}
```

Prima funcție verifică dacă contractul de contor există pentru o anumită adresă, apoi apelează metoda `getCount` din instanță. A doua funcție: `getMyCount` este doar un capăt scurt pentru a trece msg.sender direct la funcția `getCount`.

Funcția `increment` este destul de asemănătoare, dar transmite expeditorul inițial al tranzacției la contractul `Counter`:

```solidity
function increment() public {
      require (_counters[msg.sender] != Counter(0));
      Counter(_counters[msg.sender]).increment(msg.sender);
  }
```

Reține că, dacă este apelat de mai multe ori, contorul nostru ar putea fi victima unui flux excesiv. Trebuie să utilizezi [SafeMath Library](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/) cât mai mult pentru a te proteja de acest caz posibil.

Pentru a implementa contractul nostru, va trebui să furnizezi atât codul `CounterFactory`, cât și `Counter`. Când implementezi, de exemplu, în Remix, va trebui să selectezi CounterFactory.

Aici este codul complet:

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

După compilare, în secțiunea Remix Deploy vei selecta fabrica ce va fi implementată:

![Selectarea fabricii care va fi implementată în Remix](./counterfactory-deploy.png)

După aceea, poți să te joci cu fabrica de contract și să verifici cum se modifică valorile. Dacă dorești să apelezi contractul inteligent de la o adresă diferență va trebui să modifici adresa din „Selectare cont” din Remix.
