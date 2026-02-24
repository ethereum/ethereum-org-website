---
title: "Взаємодія з іншими контрактами за допомогою Solidity"
description: "Як розгорнути смарт-контракт з існуючого контракту та взаємодіяти з ним"
author: "jdourlens"
tags:
  [
    "Смарт-контракти",
    "мова програмування",
    "remix",
    "розгортання",
    "композиційність"
  ]
skill: advanced
lang: uk
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/interact-with-other-contracts-from-solidity/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

У попередніх посібниках ми багато чого дізналися, [як розгорнути свій перший смарт-контракт](/developers/tutorials/deploying-your-first-smart-contract/), а також додати до нього деякі функції, як-от [керування доступом за допомогою модифікаторів](https://ethereumdev.io/organize-your-code-and-control-access-to-your-smart-contract-with-modifiers/) або [обробка помилок у Solidity](https://ethereumdev.io/handle-errors-in-solidity-with-require-and-revert/). У цьому посібнику ми дізнаємося, як розгорнути смарт-контракт з існуючого контракту та взаємодіяти з ним.

Ми створимо контракт, який дозволить будь-кому мати власний смарт-контракт `Counter`, створивши для нього фабрику під назвою `CounterFactory`. Спочатку ось код нашого початкового смарт-контракту `Counter`:

```solidity
pragma solidity 0.5.17;

contract Counter {

    uint256 private _count;
    address private _owner;
    address private _factory;


     modifier onlyOwner(address caller) {
        require(caller == _owner, "Ви не є власником контракту");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == _factory, "Потрібно використовувати фабрику");
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

Зауважте, що ми трохи змінили код контракту, щоб відстежувати адресу фабрики та адресу власника контракту. Коли ви викликаєте код контракту з іншого контракту, `msg.sender` посилатиметься на адресу нашої фабрики контрактів. Це **дуже важливий момент для розуміння**, оскільки використання одного контракту для взаємодії з іншими є поширеною практикою. Тому у складних випадках слід звертати увагу на те, хто є відправником (`sender`).

Для цього ми також додали модифікатор `onlyFactory`, який гарантує, що функція, яка змінює стан, може бути викликана лише фабрикою, яка передасть початкового викликача (`caller`) як параметр.

Усередині нашої нової фабрики `CounterFactory`, яка керуватиме всіма іншими лічильниками (`Counter`), ми додамо відображення (`mapping`), яке пов'язуватиме власника з адресою його контракту-лічильника:

```solidity
mapping(address => Counter) _counters;
```

В Ethereum відображення (`mapping`) є еквівалентом об'єктів у JavaScript; вони дають змогу зіставити ключ типу A зі значенням типу B. У цьому випадку ми зіставляємо адресу власника з екземпляром його лічильника (`Counter`).

Створення екземпляра нового лічильника (`Counter`) для когось виглядатиме так:

```solidity
  function createCounter() public {
      require (_counters[msg.sender] == Counter(0));
      _counters[msg.sender] = new Counter(msg.sender);
  }
```

Спочатку ми перевіряємо, чи вже має особа лічильник. Якщо в особи немає лічильника, ми створюємо екземпляр нового лічильника, передаючи її адресу в конструктор `Counter`, і присвоюємо новостворений екземпляр відображенню (`mapping`).

Щоб отримати значення конкретного лічильника (`Counter`), код виглядатиме так:

```solidity
function getCount(address account) public view returns (uint256) {
    require (_counters[account] != Counter(0));
    return (_counters[account].getCount());
}

function getMyCount() public view returns (uint256) {
    return (getCount(msg.sender));
}
```

Перша функція перевіряє, чи існує контракт `Counter` для заданої адреси, а потім викликає метод `getCount` з екземпляра. Друга функція, `getMyCount`, — це просто скорочення для прямої передачі `msg.sender` у функцію `getCount`.

Функція `increment` дуже схожа, але передає початкового відправника транзакції до контракту `Counter`:

```solidity
function increment() public {
      require (_counters[msg.sender] != Counter(0));
      Counter(_counters[msg.sender]).increment(msg.sender);
  }
```

Зауважте, що якщо викликати її забагато разів, наш лічильник може стати жертвою переповнення. Вам слід якомога частіше використовувати [бібліотеку SafeMath](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/), щоб захиститися від цього можливого випадку.

Щоб розгорнути наш контракт, вам потрібно буде надати код як `CounterFactory`, так і `Counter`. Наприклад, під час розгортання в Remix вам потрібно буде вибрати `CounterFactory`.

Ось повний код:

```solidity
pragma solidity 0.5.17;

contract Counter {

    uint256 private _count;
    address private _owner;
    address private _factory;


     modifier onlyOwner(address caller) {
        require(caller == _owner, "Ви не є власником контракту");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == _factory, "Потрібно використовувати фабрику");
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

Після компіляції в розділі розгортання Remix виберіть фабрику для розгортання:

![Вибір фабрики для розгортання в Remix](./counterfactory-deploy.png)

Потім ви можете поекспериментувати з вашою фабрикою контрактів і перевірити, як змінюється значення. Якщо ви хочете викликати смарт-контракт з іншої адреси, вам потрібно буде змінити адресу у випадаючому списку `Account` в Remix.
