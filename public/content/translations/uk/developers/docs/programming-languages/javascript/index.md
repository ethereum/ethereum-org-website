---
title: Ethereum для розробників JavaScript
description: Дізнайтесь, як покращувати Ethereum за допомогою проектів та інструментів на основі JavaScript.
lang: uk
---

JavaScript – найпопулярніша мова в екосистемі Ethereum. Фактично, існує [команда](https://github.com/ethereumjs), яка займається перенесенням якомога більшої частини Ethereum на JavaScript.

Є можливість писати на JavaScript (або чомусь схожому) на [всіх рівнях стека](/developers/docs/ethereum-stack/).

## Взаємодія з Ethereum {#interact-with-ethereum}

### Бібліотеки JavaScript API {#javascript-api-libraries}

Якщо ви хочете писати на JavaScript для надсилання запитів до блокчейну, відправлення транзакцій тощо, найзручніший спосіб зробити це — використовувати [бібліотеку JavaScript API](/developers/docs/apis/javascript/). Ці API дозволяють розробникам легко взаємодіяти з [вузлами в мережі Ethereum](/developers/docs/nodes-and-clients/).

Оскільки ці бібліотеки можна використовувати для взаємодії з розумними контрактами на Ethereum, ви можете створити децентралізовану програму всього лише за допомогою мови JavaScript. Так ви зможете працювати зі створеними раніше контрактами.

**Перегляньте**

- [Web3.js](https://web3js.readthedocs.io)
- [Ethers.js](https://ethers.org) – _містить реалізацію гаманця Ethereum та утиліти на JavaScript і TypeScript._
- [viem](https://viem.sh) – _інтерфейс TypeScript для Ethereum, що надає низькорівневі примітиви без збереження стану для взаємодії з Ethereum._
- [Drift](https://ryangoree.github.io/drift/) – _метабібліотека TypeScript із вбудованим кешуванням, хуками та тестовими моками для легкої розробки Ethereum у різних бібліотеках web3._

### Смарт-контракти {#smart-contracts}

Якщо ви розробник JavaScript і хочете написати власний смарт-контракт, вам варто ознайомитися з [Solidity](https://solidity.readthedocs.io). Це найпопулярніша мова смарт-контрактів, синтаксично схожа на JavaScript, що може полегшити її вивчення.

Докладніше про [смарт-контракти](/developers/docs/smart-contracts/).

## Розуміння протоколу {#understand-the-protocol}

### Віртуальна машина Ethereum {#the-ethereum-virtual-machine}

Існує реалізація [віртуальної машини Ethereum](/developers/docs/evm/) на JavaScript. Підтримує правила останнього оновлення. Правила оновлення – це зміни, внесені в налаштування Віртуальної машини Ethereum у результаті запланованих оновлень.

Їх розділено на різні пакети JavaScript, які ви можете перевірити, щоб ефективніше обробляти наведені нижче елементи:

- Акаунти
- Блоки
- Алгоритми блокчейну
- Транзакції
- Та багато іншого…

Це допоможе вам зрозуміти структуру даних облікового запису.

Якщо ви хочете прочитати код, але не хочете переглядати наші документи, цей код JavaScript може стати чудовою альтернативою.

**Ознайомтеся з EVM**  
[`@ethereumjs/evm`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/evm)

### Вузли та клієнти {#nodes-and-clients}

Клієнт Ethereumjs знаходиться в активній розробці, що дозволяє вам досліджувати, як клієнти Ethereum працюють мовою, яку ви розумієте; JavaScript!

**Ознайомтеся з клієнтом**  
[`@ethereumjs/client`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/client)

## Інші проєкти {#other-projects}

Ethereum JavaScript також містить багато інших цікавих речей, зокрема:

- бібліотеки й утиліти гаманця;
- інструменти для створення, імпортування й експортування ключів Ethereum;
- реалізація `merkle-patricia-tree` – структура даних, описана в Жовтій книзі Ethereum.

Дізнайтеся більше про те, що вас найбільше цікавить, у [репозиторії EthereumJS](https://github.com/ethereumjs)

## Для подальшого читання {#further-reading}

_Знайшли ресурс, який допоміг з цією темою? Відредагуйте цю сторінку і додайте його!_
