---
title: Interakce s jinými kontrakty ze Solidity
description: Jak nasadit chytrý kontrakt z existujícího kontraktu a interagovat s ním
author: "jdourlens"
tags: ["chytré kontrakty", "Solidity", "Remix", "nasazování", "skládatelnost"]
skill: advanced
breadcrumb: Interakce kontraktů
lang: cs
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/interact-with-other-contracts-from-solidity/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

V předchozích tutoriálech jsme se naučili mnoho o tom, [jak nasadit svůj první chytrý kontrakt](/developers/tutorials/deploying-your-first-smart-contract/) a přidat do něj některé funkce, jako je [řízení přístupu pomocí modifikátorů](https://ethereumdev.io/organize-your-code-and-control-access-to-your-smart-contract-with-modifiers/) nebo [zpracování chyb v Solidity](https://ethereumdev.io/handle-errors-in-solidity-with-require-and-revert/). V tomto tutoriálu se naučíme, jak nasadit chytrý kontrakt z existujícího kontraktu a interagovat s ním.

Vytvoříme kontrakt, který komukoli umožní mít svůj vlastní chytrý kontrakt `Counter` tím, že pro něj vytvoříme továrnu (factory), jejíž název bude `CounterFactory`. Nejprve je zde kód našeho výchozího chytrého kontraktu `Counter`:

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

Všimněte si, že jsme kód kontraktu mírně upravili, abychom uchovávali adresu továrny a adresu vlastníka kontraktu. Když voláte kód kontraktu z jiného kontraktu, msg.sender bude odkazovat na adresu naší továrny na kontrakty. To je **velmi důležitý bod k pochopení**, protože používání kontraktu k interakci s jinými kontrakty je běžná praxe. Ve složitějších případech byste proto měli dávat pozor na to, kdo je odesílatelem.

Z tohoto důvodu jsme také přidali modifikátor `onlyFactory`, který zajišťuje, že funkci měnící stav může volat pouze továrna, která předá původního volajícího jako parametr.

Uvnitř naší nové `CounterFactory`, která bude spravovat všechny ostatní Countery, přidáme mapování, které přiřadí vlastníka k adrese jeho kontraktu počítadla:

```solidity
mapping(address => Counter) _counters;
```

V Ethereu jsou mapování ekvivalentem objektů v JavaScriptu, umožňují mapovat klíč typu A na hodnotu typu B. V tomto případě mapujeme adresu vlastníka na instanci jeho Counteru.

Vytvoření instance nového Counteru pro někoho bude vypadat takto:

```solidity
  function createCounter() public {
      require (_counters[msg.sender] == Counter(0));
      _counters[msg.sender] = new Counter(msg.sender);
  }
```

Nejprve zkontrolujeme, zda daná osoba již vlastní počítadlo. Pokud počítadlo nevlastní, vytvoříme instanci nového počítadla předáním její adresy do konstruktoru `Counter` a nově vytvořenou instanci přiřadíme do mapování.

Získání počtu z konkrétního Counteru bude vypadat takto:

```solidity
function getCount(address account) public view returns (uint256) {
    require (_counters[account] != Counter(0));
    return (_counters[account].getCount());
}

function getMyCount() public view returns (uint256) {
    return (getCount(msg.sender));
}
```

První funkce zkontroluje, zda pro danou adresu existuje kontrakt Counter, a poté zavolá metodu `getCount` z této instance. Druhá funkce: `getMyCount` je jen zkratka pro předání msg.sender přímo do funkce `getCount`.

Funkce `increment` je velmi podobná, ale předává původního odesílatele transakce do kontraktu `Counter`:

```solidity
function increment() public {
      require (_counters[msg.sender] != Counter(0));
      Counter(_counters[msg.sender]).increment(msg.sender);
  }
```

Všimněte si, že pokud by bylo naše počítadlo voláno příliš mnohokrát, mohlo by se stát obětí přetečení. Abyste se před tímto možným případem chránili, měli byste co nejvíce používat [knihovnu SafeMath](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/).

K nasazení našeho kontraktu budete muset poskytnout kód `CounterFactory` i `Counter`. Při nasazování například v Remixu budete muset vybrat CounterFactory.

Zde je kompletní kód:

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

Po kompilaci vyberete v sekci pro nasazení v Remixu továrnu, která má být nasazena:

![Selecting the factory to be deployed in Remix](./counterfactory-deploy.png)

Poté si můžete hrát se svou továrnou na kontrakty a sledovat, jak se hodnota mění. Pokud byste chtěli zavolat chytrý kontrakt z jiné adresy, budete muset změnit adresu ve výběru účtu v Remixu.