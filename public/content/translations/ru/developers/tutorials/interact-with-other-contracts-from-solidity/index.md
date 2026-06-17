---
title: Взаимодействие с другими контрактами из Solidity
description: Как развернуть смарт-контракт из существующего контракта и взаимодействовать с ним
author: "jdourlens"
tags:
  - смарт-контракты
  - solidity
  - remix
  - развертывание
  - компонуемость
skill: advanced
breadcrumb: Взаимодействие контрактов
lang: ru
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/interact-with-other-contracts-from-solidity/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

В предыдущих руководствах мы многое узнали о том, [как развернуть свой первый смарт-контракт](/developers/tutorials/deploying-your-first-smart-contract/) и добавить в него некоторые функции, такие как [управление доступом с помощью модификаторов](https://ethereumdev.io/organize-your-code-and-control-access-to-your-smart-contract-with-modifiers/) или [обработка ошибок в Solidity](https://ethereumdev.io/handle-errors-in-solidity-with-require-and-revert/). В этом руководстве мы узнаем, как развернуть смарт-контракт из существующего контракта и взаимодействовать с ним.

Мы создадим контракт, который позволит любому желающему иметь свой собственный смарт-контракт `Counter`, создав для него фабрику, которая будет называться `CounterFactory`. Сначала приведем код нашего исходного смарт-контракта `Counter`:

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

Обратите внимание, что мы немного изменили код контракта, чтобы отслеживать адрес фабрики и адрес владельца контракта. Когда вы вызываете код контракта из другого контракта, msg.sender будет ссылаться на адрес нашей фабрики контрактов. Это **очень важный момент для понимания**, поскольку использование контракта для взаимодействия с другими контрактами является обычной практикой. Поэтому в сложных случаях следует обращать внимание на то, кто является отправителем.

Для этого мы также добавили модификатор `onlyFactory`, который гарантирует, что функция, изменяющая состояние, может быть вызвана только фабрикой, которая передаст первоначального вызывающего в качестве параметра.

Внутри нашей новой `CounterFactory`, которая будет управлять всеми остальными счетчиками, мы добавим сопоставление, которое свяжет владельца с адресом его контракта счетчика:

```solidity
mapping(address => Counter) _counters;
```

В Эфириуме сопоставления (mapping) эквивалентны объектам в JavaScript, они позволяют сопоставить ключ типа A со значением типа B. В данном случае мы сопоставляем адрес владельца с экземпляром его счетчика.

Создание экземпляра нового счетчика для кого-либо будет выглядеть следующим образом:

```solidity
  function createCounter() public {
      require (_counters[msg.sender] == Counter(0));
      _counters[msg.sender] = new Counter(msg.sender);
  }
```

Сначала мы проверяем, владеет ли уже этот человек счетчиком. Если у него нет счетчика, мы создаем новый счетчик, передавая его адрес в конструктор `Counter`, и присваиваем вновь созданный экземпляр сопоставлению.

Получение значения конкретного счетчика будет выглядеть так:

```solidity
function getCount(address account) public view returns (uint256) {
    require (_counters[account] != Counter(0));
    return (_counters[account].getCount());
}

function getMyCount() public view returns (uint256) {
    return (getCount(msg.sender));
}
```

Первая функция проверяет, существует ли контракт счетчика для заданного адреса, а затем вызывает метод `getCount` из экземпляра. Вторая функция, `getMyCount`, — это просто сокращение для передачи msg.sender напрямую в функцию `getCount`.

Функция `increment` очень похожа, но передает первоначального отправителя транзакции в контракт `Counter`:

```solidity
function increment() public {
      require (_counters[msg.sender] != Counter(0));
      Counter(_counters[msg.sender]).increment(msg.sender);
  }
```

Обратите внимание, что если вызывать его слишком много раз, наш счетчик может стать жертвой переполнения. Вам следует как можно чаще использовать библиотеку [SafeMath](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/), чтобы защититься от этого возможного случая.

Чтобы развернуть наш контракт, вам нужно будет предоставить код как `CounterFactory`, так и `Counter`. При развертывании, например, в Remix, вам нужно будет выбрать CounterFactory.

Вот полный код:

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

После компиляции в разделе развертывания Remix вы выберете фабрику для развертывания:

![Selecting the factory to be deployed in Remix](./counterfactory-deploy.png)

Затем вы можете поэкспериментировать с вашей фабрикой контрактов и проверить изменение значения. Если вы хотите вызвать смарт-контракт с другого адреса, вам нужно будет изменить адрес в выборе аккаунта в Remix.