---
title: Як знущатися над смарт-контрактами Solidity для тестування
description: Чому під час тестування варто висміювати свої контракти
author: Markus Waas
lang: uk
tags:
  [
    "мова програмування",
    "Смарт-контракти",
    "тестування",
    "глузливий"
  ]
skill: intermediate
published: 05-02-2020
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/mocking-contracts
---

[Макетні об’єкти](https://wikipedia.org/wiki/Mock_object) є поширеним шаблоном проєктування в об’єктноорієнтованому програмуванні. Походить від старого французького слова «mocquer» зі значенням «висміювати», воно еволюціонувало до «імітувати щось справжнє», що насправді є тим, що ми робимо в програмуванні. Будь ласка, висміюйте свої розумні контракти, лише якщо хочете, але знущайтеся над ними, коли можете. Це полегшує ваше життя.

## Модульне тестування контрактів за допомогою макетів {#unit-testing-contracts-with-mocks}

Знущання над контрактом по суті означає створення другої версії цього контракту, яка веде себе дуже подібно до оригінальної, але таким чином, що його легко контролювати розробник. Часто доводиться мати справу зі складними контрактами, де потрібно лише [модульно протестувати невеликі частини контракту](/developers/docs/smart-contracts/testing/). Проблема полягає в тому, що, якщо для тестування цієї маленької частини потрібен дуже специфічний контрактний стан, у якому важко опинитися?

Ви можете щоразу писати складну логіку налаштування тесту, яка приводить контракт у потрібний стан, або ж написати макет. Знущатися над договором легко зі спадщиною. Просто створіть другий макет контракту, який успадковує оригінальний. Тепер ви можете перевизначати функції свого макету. Розглянемо це на прикладі.

## Приклад: Private ERC20 {#example-private-erc20}

Ми використовуємо приклад контракту ERC-20, який має початковий приватний час. Власник може керувати приватними користувачами, і лише їм буде дозволено отримувати токени на початку. Після закінчення певного часу всім буде дозволено використовувати жетони. Якщо вам цікаво, ми використовуємо хук [`_beforeTokenTransfer`](https://docs.openzeppelin.com/contracts/5.x/extending-contracts#using-hooks) з нових контрактів OpenZeppelin v3.

```solidity
pragma solidity ^0.6.0;\n\nimport "@openzeppelin/contracts/token/ERC20/ERC20.sol";\nimport "@openzeppelin/contracts/access/Ownable.sol";\n\ncontract PrivateERC20 is ERC20, Ownable {\n    mapping (address => bool) public isPrivateUser;\n    uint256 private publicAfterTime;\n\n    constructor(uint256 privateERC20timeInSec) ERC20(\"PrivateERC20\", \"PRIV\") public {\n        publicAfterTime = now + privateERC20timeInSec;\n    }\n\n    function addUser(address user) external onlyOwner {\n        isPrivateUser[user] = true;\n    }\n\n    function isPublic() public view returns (bool) {\n        return now >= publicAfterTime;\n    }\n\n    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual override {\n        super._beforeTokenTransfer(from, to, amount);\n\n        require(_validRecipient(to), \"PrivateERC20: invalid recipient\");\n    }\n\n    function _validRecipient(address to) private view returns (bool) {\n        if (isPublic()) {\n            return true;\n        }\n\n        return isPrivateUser[to];\n    }\n}
```

А тепер познущаймося.

```solidity
pragma solidity ^0.6.0;\nimport "../PrivateERC20.sol";\n\ncontract PrivateERC20Mock is PrivateERC20 {\n    bool isPublicConfig;\n\n    constructor() public PrivateERC20(0) {}\n\n    function setIsPublic(bool isPublic) external {\n        isPublicConfig = isPublic;\n    }\n\n    function isPublic() public view returns (bool) {\n        return isPublicConfig;\n    }\n}
```

Ви отримаєте одне з таких повідомлень про помилку:

- `PrivateERC20Mock.sol: TypeError: Overriding function is missing \"override\" specifier.`
- `PrivateERC20.sol: TypeError: Trying to override non-virtual function. Did you forget to add \"virtual\"?.`

Оскільки ми використовуємо нову версію Solidity 0.6, нам потрібно додати ключове слово `virtual` для функцій, які можна перевизначати, і `override` для функції, що їх перевизначає. Тож додамо їх до обох функцій `isPublic`.

Тепер у своїх модульних тестах ви можете натомість використовувати `PrivateERC20Mock`. Коли ви хочете перевірити поведінку під час приватного використання, використовуйте `setIsPublic(false)`, і так само `setIsPublic(true)` для тестування під час публічного використання. Звісно, у нашому прикладі ми могли б також просто скористатися [помічниками часу](https://docs.openzeppelin.com/test-helpers/0.5/api#increase), щоб відповідно змінити час. Але ідея насмішки має бути зрозумілою зараз, і ви можете уявити сценарії, де це не так просто, як просто затягнути час.

## Створення макетів для багатьох контрактів {#mocking-many-contracts}

Це може стати безладним, якщо вам доведеться створювати інший контракт для кожного окремого макету. Якщо вас це турбує, можете переглянути бібліотеку [MockContract](https://github.com/gnosis/mock-contract). Вона дозволяє вам перевизначати та змінювати поведінку контрактів на льоту. Однак він працює лише для глузливих викликів іншого контракту, тому для нашого прикладу він не працюватиме.

## Макетування може бути ще потужнішим {#mocking-can-be-even-more-powerful}

На цьому сила глузування не закінчується.

- Додавання функцій: корисним є не лише перевизначення певної функції, але й просто додавання додаткових функцій. Хорошим прикладом для токенів є наявність додаткової функції `mint`, яка дозволяє будь-якому користувачеві безкоштовно отримувати нові токени.
- Використання в тестових мережах: коли ви розгортаєте та тестуєте свої контракти в тестових мережах разом із вашим dapp, подумайте про використання фіктивної версії. Уникайте перевизначення функцій, якщо це дійсно не потрібно. Зрештою, ви хочете перевірити справжню логіку. Але може бути корисним додавання, наприклад, функції скидання, яка просто скидає стан контракту на початок, не потребуючи нового розгортання. Очевидно, ви не хотіли б мати це в контракті Mainnet.
