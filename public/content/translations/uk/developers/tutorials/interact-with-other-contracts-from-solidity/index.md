---
title: "Взаємодія з іншими контрактами за допомогою Solidity"
description: "Як розгорнути смарт-контракт з існуючого контракту та взаємодіяти з ним"
author: "jdourlens"
tags: ["смарт-контракти", "Solidity", "Remix", "розгортання", "компонованість"]
skill: advanced
breadcrumb: "Взаємодія з контрактами"
lang: uk
published: 2020-04-05
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

У попередніх посібниках ми багато дізналися про те, [як розгорнути свій перший смарт-контракт](/developers/tutorials/deploying-your-first-smart-contract/) та додати до нього деякі функції, як-от [контроль доступу за допомогою модифікаторів](https://docs.soliditylang.org/en/latest/contracts.html#function-modifiers) або [обробка помилок у Solidity](https://docs.soliditylang.org/en/latest/control-structures.html#error-handling-assert-require-revert-and-exceptions). У цьому посібнику ми дізнаємося, як розгорнути смарт-контракт з існуючого контракту та взаємодіяти з ним.

Ми створимо контракт, який дозволить будь-кому мати власний смарт-контракт `Counter`, створивши для нього фабрику, її назва буде `CounterFactory`. Спочатку ось код нашого початкового смарт-контракту `Counter`:

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

Зверніть увагу, що ми трохи змінили код контракту, щоб відстежувати адресу фабрики та адресу власника контракту. Коли ви викликаєте код контракту з іншого контракту, msg.sender посилатиметься на адресу нашої фабрики контрактів. Це **дуже важливий момент для розуміння**, оскільки використання контракту для взаємодії з іншими контрактами є поширеною практикою. Тому у складних випадках слід звертати увагу на те, хто є відправником.

Для цього ми також додали модифікатор `onlyFactory`, який гарантує, що функція, яка змінює стан, може бути викликана лише фабрикою, що передасть початкового ініціатора виклику як параметр.

Усередині нашого нового `CounterFactory`, який керуватиме всіма іншими Counters, ми додамо відображення, що пов’язуватиме власника з адресою його контракту лічильника:

```solidity
mapping(address => Counter) _counters;
```

У Solidity [відображення](https://docs.soliditylang.org/en/latest/types.html#mapping-types) схожі на об’єкти в JavaScript: вони зіставляють ключ типу A зі значенням типу B. У цьому випадку ми зіставляємо адресу власника з екземпляром його Counter.

Створення екземпляра нового Counter для когось виглядатиме так:

```solidity
  function createCounter() public {
      require(address(_counters[msg.sender]) == address(0), "You already have a counter");
      _counters[msg.sender] = new Counter(msg.sender);
  }
```

Спочатку ми перевіряємо, чи особа вже має лічильник. Відображення повертає значення за замовчуванням для ключів, які ніколи не були встановлені, що для типу контракту є нульовою адресою, тому ми порівнюємо збережену адресу контракту з `address(0)`. Якщо особа не має лічильника, ми створюємо новий лічильник, передаючи її адресу в конструктор `Counter`, і призначаємо новостворений екземпляр у відображення.

Отримання значення конкретного Counter виглядатиме так:

```solidity
function getCount(address account) public view returns (uint256) {
    require(address(_counters[account]) != address(0), "This account has no counter");
    return (_counters[account].getCount());
}

function getMyCount() public view returns (uint256) {
    return (getCount(msg.sender));
}
```

Перша функція перевіряє, чи існує контракт Counter для заданої адреси, а потім викликає метод `getCount` з екземпляра. Друга функція: `getMyCount` — це просто скорочення для передачі msg.sender безпосередньо у функцію `getCount`.

Функція `increment` досить схожа, але передає початкового відправника транзакції до контракту `Counter`:

```solidity
function increment() public {
      require(address(_counters[msg.sender]) != address(0), "You need to create a counter first");
      _counters[msg.sender].increment(msg.sender);
  }
```

Починаючи з Solidity 0.8, арифметика [перевіряється за замовчуванням](https://docs.soliditylang.org/en/latest/control-structures.html#checked-or-unchecked-arithmetic): якщо `_count` коли-небудь переповниться, `_count++` скасує транзакцію замість непомітного циклічного переходу, тому додаткова бібліотека, така як SafeMath, не потрібна.

Щоб розгорнути наш контракт, вам потрібно буде надати код як `CounterFactory`, так і `Counter`. Під час розгортання, наприклад, у Remix, вам потрібно буде вибрати CounterFactory.

Ось повний код:

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

Після компіляції в розділі розгортання Remix виберіть фабрику для розгортання:

![Вибір фабрики для розгортання в Remix](./counterfactory-deploy.png)

Потім ви можете поекспериментувати зі своєю фабрикою контрактів і перевірити зміну значення. Якщо ви хочете викликати смарт-контракт з іншої адреси, вам потрібно буде змінити адресу в полі вибору акаунта в Remix.
