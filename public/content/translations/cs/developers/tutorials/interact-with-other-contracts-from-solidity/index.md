---
title: "Interakce s dalšími kontrakty ze Solidity"
description: "Jak nasadit chytrý kontrakt z existujícího kontraktu a interagovat s ním"
author: "jdourlens"
tags:
  [
    "smart kontrakt účty",
    "solidity",
    "remix",
    "nasazování",
    "složitelnost"
  ]
skill: advanced
lang: cs
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/interact-with-other-contracts-from-solidity/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

V předchozích návodech jsme se toho hodně naučili [jak nasadit svůj první chytrý kontrakt](/developers/tutorials/deploying-your-first-smart-contract/) a přidat do něj některé funkce, jako je [řízení přístupu pomocí modifikátorů](https://ethereumdev.io/organize-your-code-and-control-access-to-your-smart-contract-with-modifiers/) nebo [zpracování chyb v Solidity](https://ethereumdev.io/handle-errors-in-solidity-with-require-and-revert/). V tomto návodu se naučíme, jak nasadit chytrý kontrakt z existujícího kontraktu a jak s ním interagovat.

Vytvoříme kontrakt, který komukoli umožní mít svůj vlastní `Counter` chytrý kontrakt tím, že pro něj vytvoříme továrnu (factory). Její název bude `CounterFactory`. Nejdříve si ukážeme kód našeho původního `Counter` chytrého kontraktu:

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

Všimni si, že jsme mírně upravili kód kontraktu, abychom mohli sledovat adresu továrny a adresu vlastníka kontraktu. Když voláš kód kontraktu z jiného kontraktu, msg.sender bude odkazovat na adresu naší továrny na kontrakty. Toto je **opravdu důležitý bod k pochopení**, protože použití kontraktu k interakci s jinými kontrakty je běžnou praxí. Proto by sis měl v komplexních případech dávat pozor, kdo je odesílatel.

Z tohoto důvodu jsme také přidali modifikátor `onlyFactory`, který zajišťuje, že funkci měnící stav může volat pouze továrna, která předá původního volajícího jako parametr.

Do naší nové `CounterFactory`, která bude spravovat všechny ostatní čítače (Counters), přidáme mapování, které přiřadí vlastníka k adrese jeho kontraktu čítače:

```solidity
mapping(address => Counter) _counters;
```

V Ethereu je mapování ekvivalentem objektů v javascriptu, umožňují mapovat klíč typu A na hodnotu typu B. V tomto případě mapujeme adresu vlastníka s instancí jeho Čítače (Counter).

Vytvoření instance nového čítače (Counter) pro někoho bude vypadat takto:

```solidity
  function createCounter() public {
      require (_counters[msg.sender] == Counter(0));
      _counters[msg.sender] = new Counter(msg.sender);
  }
```

Nejdříve zkontrolujeme, zda daná osoba již nějaký čítač (counter) vlastní. Pokud čítač nevlastní, vytvoříme instanci nového čítače předáním jeho adresy do konstruktoru `Counter` a přiřadíme nově vytvořenou instanci do mapování.

Získání počtu pro konkrétní čítač (Counter) bude vypadat takto:

```solidity
function getCount(address account) public view returns (uint256) {
    require (_counters[account] != Counter(0));
    return (_counters[account].getCount());
}

function getMyCount() public view returns (uint256) {
    return (getCount(msg.sender));
}
```

První funkce zkontroluje, zda kontrakt Čítače (Counter) existuje pro danou adresu, a poté zavolá metodu `getCount` z instance. Druhá funkce: `getMyCount` je jen zkratka pro přímé předání msg.sender do funkce `getCount`.

Funkce `increment` je poměrně podobná, ale předává původního odesílatele transakce do kontraktu `Counter`:

```solidity
function increment() public {
      require (_counters[msg.sender] != Counter(0));
      Counter(_counters[msg.sender]).increment(msg.sender);
  }
```

Všimni si, že pokud se bude volat příliš často, může se náš čítač stát obětí přetečení (overflow). Pro ochranu před tímto možným případem bys měl co nejvíce používat [knihovnu SafeMath](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/).

Pro nasazení našeho kontraktu budeš muset poskytnout kód jak pro `CounterFactory`, tak pro `Counter`. Při nasazování například v Remixu budeš muset vybrat CounterFactory.

Zde je celý kód:

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

Po zkompilování v sekci pro nasazení v Remixu vybereš továrnu (factory), která se má nasadit:

![Výběr továrny (factory) k nasazení v Remixu](./counterfactory-deploy.png)

Poté si můžeš hrát s továrnou na kontrakty a sledovat, jak se mění hodnota. Pokud bys chtěl volat chytrý kontrakt z jiné adresy, budeš muset změnit adresu ve výběru účtu (Account) v Remixu.
