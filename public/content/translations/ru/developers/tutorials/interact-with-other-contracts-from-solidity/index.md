---
title: "Взаимодействие с другими контрактами из Solidity"
description: "Как развернуть смарт-контракт из существующего контракта и взаимодействовать с ним"
author: "jdourlens"
tags:
  - смарт-контракты
  - solidity
  - remix
  - развертывание
  - компонуемость
skill: advanced
breadcrumb: "Взаимодействие контрактов"
lang: ru
published: 2020-04-05
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

В предыдущих руководствах мы многое узнали о том, [как развернуть свой первый смарт-контракт](/developers/tutorials/deploying-your-first-smart-contract/) и добавить в него некоторые функции, такие как [контроль доступа с помощью модификаторов](https://docs.soliditylang.org/en/latest/contracts.html#function-modifiers) или [обработка ошибок в Solidity](https://docs.soliditylang.org/en/latest/control-structures.html#error-handling-assert-require-revert-and-exceptions). В этом руководстве мы узнаем, как развернуть смарт-контракт из существующего контракта и взаимодействовать с ним.

Мы создадим контракт, который позволит любому желающему иметь свой собственный смарт-контракт `Counter`, создав для него фабрику, которая будет называться `CounterFactory`. Сначала приведем код нашего исходного смарт-контракта `Counter`:

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

Обратите внимание, что мы немного изменили код контракта, чтобы отслеживать адрес фабрики и адрес владельца контракта. Когда вы вызываете код контракта из другого контракта, msg.sender будет ссылаться на адрес нашей фабрики контрактов. Это **очень важный момент для понимания**, поскольку использование контракта для взаимодействия с другими контрактами является обычной практикой. Поэтому в сложных случаях следует обращать внимание на то, кто является отправителем.

Для этого мы также добавили модификатор `onlyFactory`, который гарантирует, что функция, изменяющая состояние, может быть вызвана только фабрикой, которая передаст исходного вызывающего в качестве параметра.

Внутри нашей новой `CounterFactory`, которая будет управлять всеми остальными контрактами Counter, мы добавим отображение (mapping), которое свяжет владельца с адресом его контракта счетчика:

```solidity
mapping(address => Counter) _counters;
```

В Solidity [отображения (mappings)](https://docs.soliditylang.org/en/latest/types.html#mapping-types) похожи на объекты в JavaScript: они сопоставляют ключ типа A со значением типа B. В данном случае мы сопоставляем адрес владельца с экземпляром его контракта Counter.

Создание нового экземпляра Counter для кого-либо будет выглядеть так:

```solidity
  function createCounter() public {
      require(address(_counters[msg.sender]) == address(0), "You already have a counter");
      _counters[msg.sender] = new Counter(msg.sender);
  }
```

Сначала мы проверяем, владеет ли уже этот человек счетчиком. Отображение возвращает значение по умолчанию для ключей, которые никогда не были заданы, что для типа контракта означает нулевой адрес, поэтому мы сравниваем сохраненный адрес контракта с `address(0)`. Если у него нет счетчика, мы создаем новый экземпляр счетчика, передавая его адрес в конструктор `Counter`, и присваиваем вновь созданный экземпляр отображению.

Получение значения конкретного счетчика Counter будет выглядеть так:

```solidity
function getCount(address account) public view returns (uint256) {
    require(address(_counters[account]) != address(0), "This account has no counter");
    return (_counters[account].getCount());
}

function getMyCount() public view returns (uint256) {
    return (getCount(msg.sender));
}
```

Первая функция проверяет, существует ли контракт Counter для заданного адреса, а затем вызывает метод `getCount` из экземпляра. Вторая функция: `getMyCount` — это просто сокращение для передачи msg.sender напрямую в функцию `getCount`.

Функция `increment` очень похожа, но передает исходного отправителя транзакции в контракт `Counter`:

```solidity
function increment() public {
      require(address(_counters[msg.sender]) != address(0), "You need to create a counter first");
      _counters[msg.sender].increment(msg.sender);
  }
```

Начиная с Solidity 0.8, арифметические операции [проверяются по умолчанию](https://docs.soliditylang.org/en/latest/control-structures.html#checked-or-unchecked-arithmetic): если `_count` когда-либо переполнится, `_count++` откатит транзакцию вместо незаметного циклического переполнения, поэтому дополнительная библиотека, такая как SafeMath, не требуется.

Чтобы развернуть наш контракт, вам нужно будет предоставить код как `CounterFactory`, так и `Counter`. При развертывании, например, в Remix, вам нужно будет выбрать CounterFactory.

Вот полный код:

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

После компиляции в разделе развертывания Remix выберите фабрику для развертывания:

![Выбор фабрики для развертывания в Remix](./counterfactory-deploy.png)

Затем вы можете поэкспериментировать с вашей фабрикой контрактов и проверить изменение значения. Если вы хотите вызвать смарт-контракт с другого адреса, вам нужно будет изменить адрес в поле выбора аккаунта в Remix.
