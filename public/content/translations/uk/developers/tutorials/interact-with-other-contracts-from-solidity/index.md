---
title: Взаємодія з іншими контрактами за допомогою Solidity
description: Як розгорнути смарт-контракт з існуючого контракту та взаємодіяти з ним
author: "jdourlens"
tags: ["смарт-контракти", "Solidity", "Remix", "розгортання", "компонованість"]
skill: advanced
breadcrumb: Взаємодія з контрактами
lang: uk
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/interact-with-other-contracts-from-solidity/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

У попередніх посібниках ми багато дізналися про те, [як розгорнути свій перший смарт-контракт](/developers/tutorials/deploying-your-first-smart-contract/) та додати до нього деякі функції, як-от [контроль доступу за допомогою модифікаторів](https://ethereumdev.io/organize-your-code-and-control-access-to-your-smart-contract-with-modifiers/) або [обробка помилок у Solidity](https://ethereumdev.io/handle-errors-in-solidity-with-require-and-revert/). У цьому посібнику ми дізнаємося, як розгорнути смарт-контракт з існуючого контракту та взаємодіяти з ним.

Ми створимо контракт, який дозволить будь-кому мати власний смарт-контракт `Counter`, створивши для нього фабрику, її назва буде `CounterFactory`. Спочатку ось код нашого початкового смарт-контракту `Counter`:

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

Зверніть увагу, що ми трохи змінили код контракту, щоб відстежувати адресу фабрики та адресу власника контракту. Коли ви викликаєте код контракту з іншого контракту, msg.sender посилатиметься на адресу нашої фабрики контрактів. Це **дуже важливий момент для розуміння**, оскільки використання контракту для взаємодії з іншими контрактами є поширеною практикою. Тому в складних випадках слід звертати увагу на те, хто є відправником.

Для цього ми також додали модифікатор `onlyFactory`, який гарантує, що функція зміни стану може бути викликана лише фабрикою, яка передасть початкового ініціатора виклику як параметр.

Усередині нашої нової `CounterFactory`, яка керуватиме всіма іншими лічильниками, ми додамо відображення (mapping), яке пов'язуватиме власника з адресою його контракту лічильника:

```solidity
mapping(address => Counter) _counters;
```

В Етеріумі відображення (mapping) є еквівалентом об'єктів у JavaScript, вони дозволяють зіставити ключ типу A зі значенням типу B. У цьому випадку ми зіставляємо адресу власника з екземпляром його лічильника (Counter).

Створення екземпляра нового лічильника для когось виглядатиме так:

```solidity
  function createCounter() public {
      require (_counters[msg.sender] == Counter(0));
      _counters[msg.sender] = new Counter(msg.sender);
  }
```

Спочатку ми перевіряємо, чи особа вже має лічильник. Якщо вона не має лічильника, ми створюємо новий лічильник, передаючи її адресу в конструктор `Counter`, і призначаємо новостворений екземпляр у відображення.

Отримання значення конкретного лічильника виглядатиме так:

```solidity
function getCount(address account) public view returns (uint256) {
    require (_counters[account] != Counter(0));
    return (_counters[account].getCount());
}

function getMyCount() public view returns (uint256) {
    return (getCount(msg.sender));
}
```

Перша функція перевіряє, чи існує контракт лічильника для заданої адреси, а потім викликає метод `getCount` з екземпляра. Друга функція: `getMyCount` — це просто скорочення для передачі msg.sender безпосередньо у функцію `getCount`.

Функція `increment` досить схожа, але передає початкового відправника транзакції до контракту `Counter`:

```solidity
function increment() public {
      require (_counters[msg.sender] != Counter(0));
      Counter(_counters[msg.sender]).increment(msg.sender);
  }
```

Зверніть увагу, що якщо викликати його занадто багато разів, наш лічильник може стати жертвою переповнення. Вам слід якомога частіше використовувати [бібліотеку SafeMath](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/), щоб захиститися від цього можливого випадку.

Щоб розгорнути наш контракт, вам потрібно буде надати код як `CounterFactory`, так і `Counter`. Під час розгортання, наприклад, у Remix, вам потрібно буде вибрати CounterFactory.

Ось повний код:

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

Після компіляції в розділі розгортання Remix ви виберете фабрику для розгортання:

![Selecting the factory to be deployed in Remix](./counterfactory-deploy.png)

Потім ви можете поекспериментувати з вашою фабрикою контрактів і перевірити зміну значення. Якщо ви хочете викликати смарт-контракт з іншої адреси, вам потрібно буде змінити адресу в полі вибору акаунта (Account) у Remix.