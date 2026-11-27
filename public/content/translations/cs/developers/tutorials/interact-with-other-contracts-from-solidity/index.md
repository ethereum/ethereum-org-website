---
title: "Interakce s jinými kontrakty ze Solidity"
description: "Jak nasadit chytrý kontrakt z existujícího kontraktu a interagovat s ním"
author: "jdourlens"
tags: ["chytré kontrakty", "Solidity", "Remix", "nasazování", "skládatelnost"]
skill: advanced
breadcrumb: "Interakce kontraktů"
lang: cs
published: 2020-04-05
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

V předchozích tutoriálech jsme se naučili hodně o tom, [jak nasadit svůj první chytrý kontrakt](/developers/tutorials/deploying-your-first-smart-contract/) a přidat do něj některé funkce, jako je [řízení přístupu pomocí modifikátorů](https://docs.soliditylang.org/en/latest/contracts.html#function-modifiers) nebo [zpracování chyb v Solidity](https://docs.soliditylang.org/en/latest/control-structures.html#error-handling-assert-require-revert-and-exceptions). V tomto tutoriálu se naučíme, jak nasadit chytrý kontrakt z existujícího kontraktu a interagovat s ním.

Vytvoříme kontrakt, který komukoli umožní mít svůj vlastní chytrý kontrakt `Counter` vytvořením továrny (factory) pro něj, její název bude `CounterFactory`. Nejprve je zde kód našeho počátečního chytrého kontraktu `Counter`:

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

Všimněte si, že jsme kód kontraktu mírně upravili, abychom sledovali adresu továrny a adresu vlastníka kontraktu. Když voláte kód kontraktu z jiného kontraktu, msg.sender bude odkazovat na adresu naší továrny na kontrakty. To je **velmi důležitý bod k pochopení**, protože používání kontraktu k interakci s jinými kontrakty je běžnou praxí. Ve složitých případech byste proto měli dávat pozor na to, kdo je odesílatelem.

Z tohoto důvodu jsme také přidali modifikátor `onlyFactory`, který zajišťuje, že funkci měnící stav může volat pouze továrna, která předá původního volajícího jako parametr.

Uvnitř našeho nového `CounterFactory`, který bude spravovat všechny ostatní kontrakty Counter, přidáme mapování, které přiřadí vlastníka k adrese jeho kontraktu counter:

```solidity
mapping(address => Counter) _counters;
```

V Solidity jsou [mapování](https://docs.soliditylang.org/en/latest/types.html#mapping-types) podobná objektům v JavaScriptu: mapují klíč typu A na hodnotu typu B. V tomto případě mapujeme adresu vlastníka na instanci jeho kontraktu Counter.

Vytvoření instance nového kontraktu Counter pro někoho bude vypadat takto:

```solidity
  function createCounter() public {
      require(address(_counters[msg.sender]) == address(0), "You already have a counter");
      _counters[msg.sender] = new Counter(msg.sender);
  }
```

Nejprve zkontrolujeme, zda daná osoba již vlastní counter. Mapování vrací výchozí hodnotu pro klíče, které nebyly nikdy nastaveny, což je pro typ kontraktu nulová adresa, takže porovnáme uloženou adresu kontraktu s `address(0)`. Pokud counter nevlastní, vytvoříme instanci nového counteru předáním jeho adresy do konstruktoru `Counter` a nově vytvořenou instanci přiřadíme do mapování.

Získání počtu konkrétního kontraktu Counter bude vypadat takto:

```solidity
function getCount(address account) public view returns (uint256) {
    require(address(_counters[account]) != address(0), "This account has no counter");
    return (_counters[account].getCount());
}

function getMyCount() public view returns (uint256) {
    return (getCount(msg.sender));
}
```

První funkce zkontroluje, zda kontrakt Counter pro danou adresu existuje, a poté zavolá metodu `getCount` z instance. Druhá funkce: `getMyCount` je jen zkratka pro předání msg.sender přímo do funkce `getCount`.

Funkce `increment` je docela podobná, ale předává původního odesílatele transakce kontraktu `Counter`:

```solidity
function increment() public {
      require(address(_counters[msg.sender]) != address(0), "You need to create a counter first");
      _counters[msg.sender].increment(msg.sender);
  }
```

Od verze Solidity 0.8 je aritmetika [ve výchozím nastavení kontrolována](https://docs.soliditylang.org/en/latest/control-structures.html#checked-or-unchecked-arithmetic): pokud by `_count` někdy přeteklo, `_count++` by zvrátilo transakci místo tichého přetečení (wrapping around), takže není potřeba žádná další knihovna, jako je SafeMath.

K nasazení našeho kontraktu budete muset poskytnout kód `CounterFactory` i `Counter`. Při nasazování například v Remixu budete muset vybrat CounterFactory.

Zde je celý kód:

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

Po kompilaci vyberete v sekci nasazení v Remixu továrnu, která má být nasazena:

![Výběr továrny k nasazení v Remixu](./counterfactory-deploy.png)

Poté si můžete hrát se svou továrnou na kontrakty a sledovat, jak se hodnota mění. Pokud byste chtěli zavolat chytrý kontrakt z jiné adresy, budete muset změnit adresu ve výběru účtu (Account) v Remixu.
