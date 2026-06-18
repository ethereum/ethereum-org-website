---
title: "Як створювати моки смарт-контрактів Solidity для тестування"
description: "Чому варто створювати моки ваших контрактів під час тестування"
author: "Маркус Ваас"
lang: uk
tags: ["Solidity", "смарт-контракти", "тестування", "моки"]
skill: intermediate
breadcrumb: "Створення моків контрактів"
published: 2020-05-02
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/mocking-contracts
---

[Мок-об'єкти (Mock objects)](https://wikipedia.org/wiki/Mock_object) — це поширений шаблон проєктування в об'єктно-орієнтованому програмуванні. Походячи від старофранцузького слова «mocquer», що означає «насміхатися», воно еволюціонувало до «імітації чогось справжнього», що ми, власне, і робимо в програмуванні. Будь ласка, насміхайтеся зі своїх смарт-контрактів лише за власним бажанням, але створюйте їхні моки (імітації) за будь-якої нагоди. Це полегшить вам життя.

## Модульне тестування контрактів за допомогою моків {#unit-testing-contracts-with-mocks}

Створення моку контракту по суті означає створення другої версії цього контракту, яка поводиться дуже схоже на оригінал, але в спосіб, який розробник може легко контролювати. Часто виникають ситуації зі складними контрактами, коли потрібно [провести модульне тестування лише невеликих частин контракту](/developers/docs/smart-contracts/testing/). Проблема полягає в тому, що робити, якщо тестування цієї невеликої частини вимагає дуже специфічного стану контракту, якого важко досягти?

Ви можете щоразу писати складну логіку налаштування тесту, яка приводить контракт у потрібний стан, або ж написати мок. Створити мок контракту легко за допомогою успадкування. Просто створіть другий мок-контракт, який успадковується від оригінального. Тепер ви можете перевизначити функції у вашому моку. Розгляньмо це на прикладі.

## Приклад: Приватний ERC-20 {#example-private-erc20}

Ми використовуємо приклад контракту ERC-20, який має початковий приватний період. Власник може керувати приватними користувачами, і лише вони зможуть отримувати токени на початку. Коли мине певний час, використовувати токени зможуть усі. Якщо вам цікаво, ми використовуємо хук [`_beforeTokenTransfer`](https://docs.openzeppelin.com/contracts/5.x/extending-contracts#using-hooks) з нових контрактів ОупенЗеппелін версії 3.

```solidity
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PrivateERC20 is ERC20, Ownable {
    mapping (address => bool) public isPrivateUser;
    uint256 private publicAfterTime;

    constructor(uint256 privateERC20timeInSec) ERC20("PrivateERC20", "PRIV") public {
        publicAfterTime = now + privateERC20timeInSec;
    }

    function addUser(address user) external onlyOwner {
        isPrivateUser[user] = true;
    }

    function isPublic() public view returns (bool) {
        return now >= publicAfterTime;
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual override {
        super._beforeTokenTransfer(from, to, amount);

        require(_validRecipient(to), "PrivateERC20: invalid recipient");
    }

    function _validRecipient(address to) private view returns (bool) {
        if (isPublic()) {
            return true;
        }

        return isPrivateUser[to];
    }
}
```

А тепер створімо його мок.

```solidity
pragma solidity ^0.6.0;
import "../PrivateERC20.sol";

contract PrivateERC20Mock is PrivateERC20 {
    bool isPublicConfig;

    constructor() public PrivateERC20(0) {}

    function setIsPublic(bool isPublic) external {
        isPublicConfig = isPublic;
    }

    function isPublic() public view returns (bool) {
        return isPublicConfig;
    }
}
```

Ви отримаєте одне з таких повідомлень про помилку:

- `PrivateERC20Mock.sol: TypeError: Overriding function is missing "override" specifier.`
- `PrivateERC20.sol: TypeError: Trying to override non-virtual function. Did you forget to add "virtual"?.`

Оскільки ми використовуємо нову версію Solidity 0.6, нам потрібно додати ключове слово `virtual` для функцій, які можна перевизначити, і override для функції, яка перевизначає. Тож додамо їх до обох функцій `isPublic`.

Тепер у ваших модульних тестах ви можете використовувати `PrivateERC20Mock`. Коли ви хочете протестувати поведінку під час приватного періоду використання, використовуйте `setIsPublic(false)`, і так само `setIsPublic(true)` для тестування публічного періоду використання. Звісно, у нашому прикладі ми могли б просто використати [допоміжні функції часу (time helpers)](https://docs.openzeppelin.com/test-helpers/0.5/api#increase), щоб відповідно змінити час. Але ідея створення моків тепер має бути зрозумілою, і ви можете уявити сценарії, де все не так просто, як звичайне перемотування часу вперед.

## Створення моків для багатьох контрактів {#mocking-many-contracts}

Процес може стати заплутаним, якщо вам доведеться створювати окремий контракт для кожного моку. Якщо це вас турбує, ви можете звернути увагу на бібліотеку [MockContract](https://github.com/gnosis/mock-contract). Вона дозволяє перевизначати та змінювати поведінку контрактів на льоту. Однак вона працює лише для створення моків викликів до іншого контракту, тому для нашого прикладу вона б не підійшла.

## Моки можуть бути ще потужнішими {#mocking-can-be-even-more-powerful}

Можливості моків на цьому не закінчуються.

- Додавання функцій: корисним є не лише перевизначення певної функції, але й просте додавання додаткових функцій. Хорошим прикладом для токенів є наявність додаткової функції `mint`, яка дозволяє будь-якому користувачеві безкоштовно отримувати нові токени.
- Використання в тестових мережах: коли ви розгортаєте та тестуєте свої контракти в тестових мережах разом із вашим децентралізованим застосунком (dapp), розгляньте можливість використання версії з моками. Уникайте перевизначення функцій, якщо в цьому немає крайньої потреби. Зрештою, ви хочете протестувати реальну логіку. Але додавання, наприклад, функції скидання може бути корисним, оскільки вона просто скидає стан контракту до початкового, і нове розгортання не потрібне. Очевидно, ви б не хотіли мати таку функцію в контракті в Головній мережі.