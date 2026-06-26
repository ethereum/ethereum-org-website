---
title: "Как создавать моки смарт-контрактов Solidity для тестирования"
description: "Почему стоит «насмехаться» над своими контрактами при тестировании"
author: "Маркус Ваас"
lang: ru
tags: ["Solidity", "смарт-контракты", "тестирование", "мокирование"]
skill: intermediate
breadcrumb: "Мокирование контрактов"
published: 2020-05-02
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/mocking-contracts
---

[Мок-объекты](https://wikipedia.org/wiki/Mock_object) — это распространенный шаблон проектирования в объектно-ориентированном программировании. Происходя от старофранцузского слова «mocquer», означающего «насмехаться», этот термин эволюционировал до «имитации чего-то реального», что мы, собственно, и делаем в программировании. Пожалуйста, насмехайтесь над своими смарт-контрактами только если вам этого хочется, но создавайте их моки при любой возможности. Это упростит вам жизнь.

## Модульное тестирование контрактов с помощью моков {#unit-testing-contracts-with-mocks}

Мокирование контракта по сути означает создание второй версии этого контракта, которая ведет себя очень похоже на оригинал, но таким образом, чтобы разработчик мог легко ею управлять. Часто вы сталкиваетесь со сложными контрактами, в которых вам нужно лишь [провести модульное тестирование небольших частей контракта](/developers/docs/smart-contracts/testing/). Проблема в том, что делать, если для тестирования этой небольшой части требуется очень специфическое состояние контракта, которого трудно достичь?

Вы можете каждый раз писать сложную логику настройки тестов, которая приводит контракт в нужное состояние, или же написать мок. Мокировать контракт легко с помощью наследования. Просто создайте второй мок-контракт, который наследуется от оригинального. Теперь вы можете переопределить функции в вашем моке. Давайте рассмотрим это на примере.

## Пример: Приватный ERC-20 {#example-private-erc20}

Мы используем пример контракта ERC-20, у которого есть начальный приватный период. Владелец может управлять приватными пользователями, и только им будет разрешено получать токены в начале. По прошествии определенного времени использовать токены смогут все. Если вам интересно, мы используем хук [`_beforeTokenTransfer`](https://docs.openzeppelin.com/contracts/5.x/extending-contracts#using-hooks) из новых контрактов ОпенЗеппелин v3.

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

А теперь давайте создадим для него мок.

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

Вы получите одно из следующих сообщений об ошибке:

- `PrivateERC20Mock.sol: TypeError: Overriding function is missing "override" specifier.`
- `PrivateERC20.sol: TypeError: Trying to override non-virtual function. Did you forget to add "virtual"?.`

Поскольку мы используем новую версию Solidity 0.6, нам нужно добавить ключевое слово `virtual` для функций, которые могут быть переопределены, и override для переопределяющей функции. Поэтому давайте добавим их к обеим функциям `isPublic`.

Теперь в ваших модульных тестах вы можете использовать `PrivateERC20Mock` вместо оригинала. Когда вы хотите протестировать поведение во время приватного использования, используйте `setIsPublic(false)`, и аналогично `setIsPublic(true)` для тестирования времени публичного использования. Конечно, в нашем примере мы могли бы просто использовать [вспомогательные функции для работы со временем](https://docs.openzeppelin.com/test-helpers/0.5/api#increase), чтобы соответствующим образом изменить время. Но идея мокирования теперь должна быть ясна, и вы можете представить себе сценарии, где все не так просто, как обычная перемотка времени.

## Мокирование множества контрактов {#mocking-many-contracts}

Процесс может стать запутанным, если вам придется создавать отдельный контракт для каждого мока. Если вас это беспокоит, вы можете взглянуть на библиотеку [MockContract](https://github.com/gnosis/mock-contract). Она позволяет переопределять и изменять поведение контрактов на лету. Однако она работает только для мокирования вызовов к другому контракту, поэтому для нашего примера она бы не подошла.

## Мокирование может быть еще более мощным инструментом {#mocking-can-be-even-more-powerful}

Возможности мокирования на этом не заканчиваются.

- Добавление функций: полезно не только переопределение конкретной функции, но и просто добавление дополнительных функций. Хорошим примером для токенов является наличие дополнительной функции `mint`, позволяющей любому пользователю бесплатно получать новые токены.
- Использование в тестовых сетях: когда вы развертываете и тестируете свои контракты в тестовых сетях вместе с вашим децентрализованным приложением (dapp), рассмотрите возможность использования мок-версии. Избегайте переопределения функций, если в этом нет крайней необходимости. В конце концов, вы хотите протестировать реальную логику. Но добавление, например, функции сброса может быть полезным, так как она просто сбрасывает состояние контракта к начальному, и новое развертывание не требуется. Очевидно, вы бы не хотели иметь такую функцию в контракте в Мейннет.