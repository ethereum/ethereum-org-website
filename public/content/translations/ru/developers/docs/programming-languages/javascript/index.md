---
title: "Ethereum для разработчиков на JavaScript"
description: "Узнайте как зарабатывать c помощью Ethereum используя проекты и инструменты на JavaScript."
lang: ru
---

JavaScript - самый популярный язык в системе Ethereum. Фактически существует [команда](https://github.com/ethereumjs), которая занимается переносом как можно большего количества возможностей Ethereum в JavaScript.

Есть возможность писать на JavaScript (или чем-то похожем) на [всех уровнях стека](/developers/docs/ethereum-stack/).

## Взаимодействие с Ethereum {#interact-with-ethereum}

### Библиотеки API для JavaScript {#javascript-api-libraries}

Если вы хотите писать на JavaScript, чтобы запрашивать данные из блокчейна, отправлять транзакции и выполнять другие действия, то наиболее удобным способом для этого будет использование [библиотеки API для JavaScript](/developers/docs/apis/javascript/). Эти API позволяют разработчикам легко взаимодействовать с [узлами в сети Ethereum](/developers/docs/nodes-and-clients/).

Вы можете использовать эти библиотеки для взаимодействия со смарт-контрактами на Ethereum, чтобы можно было создать децентрализованное приложение, где вы сможете использовать JavaScript для взаимодействия с уже существующими контрактами.

**Ознакомьтесь**

- [Web3.js](https://web3js.readthedocs.io)
- [Ethers.js](https://ethers.org) — _включает реализацию кошелька Ethereum и утилиты на JavaScript и TypeScript._
- [viem](https://viem.sh) — _интерфейс TypeScript для Ethereum, предоставляющий низкоуровневые примитивы без сохранения состояния для взаимодействия с Ethereum._
- [Drift](https://ryangoree.github.io/drift/) — _метабиблиотека TypeScript со встроенным кэшированием, хуками и тестовыми моками для упрощения разработки на Ethereum с использованием различных библиотек Web3._

### Умные контракты {#smart-contracts}

Если вы JavaScript-разработчик и хотите написать собственный смарт-контракт, вам стоит ознакомиться с [Solidity](https://solidity.readthedocs.io). Это очень популярный язык смарт-контрактов, и он синтаксически похож на JavaScript, что может упростить его изучение.

Подробнее о [смарт-контрактах](/developers/docs/smart-contracts/).

## Понимание протокола {#understand-the-protocol}

### Виртуальная машина Ethereum {#the-ethereum-virtual-machine}

Существует реализация [виртуальной машины Ethereum](/developers/docs/evm/) на JavaScript. Она поддерживает последние форк-правила. Правила Fork означают изменения, появившиеся в EVM в результате запланированных улучшений.

Он разделен на различные пакеты JavaScript, которые вы можете прочесть, чтобы лучше понять:

- Аккаунты
- Блоки
- Сам блокчейн
- Транзакции
- И другое...

Это поможет вам понять такие вещи как: "Какова структура данных в аккаунте?".

Если вы пожелаете прочитать код, JavaScript сможет стать отличным вариантом для чтения наших документов.

**Ознакомьтесь с EVM**
[`@ethereumjs/evm`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/evm)

### Узлы и клиенты {#nodes-and-clients}

Клиент Ethereumjs находится в активной разработке и позволяет вам погрузиться в понимание того, как работают Ethereum клиенты на языке, который вам понятен; JavaScript!

**Ознакомьтесь с клиентом**
[`@ethereumjs/client`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/client)

## Другие проекты {#other-projects}

В мире Ethereum JavaScript происходит множество других вещей, в том числе:

- библиотеки утилит кошелька.
- инструменты для генерации, импорта и экспорта ключей Ethereum.
- реализация `merkle-patricia-tree` — структуры данных, описанной в Желтой книге Ethereum.

Изучите то, что вас больше всего интересует, в [репозитории EthereumJS](https://github.com/ethereumjs).

## Дополнительные материалы {#further-reading}

_Знаете ресурс сообщества, который вам пригодился? Измените эту страницу и добавьте его!_
