---
title: Эфириум для Java-разработчиков
description: Узнайте, как разрабатывать для Эфириума, используя проекты и инструменты на базе Java
lang: ru
incomplete: true
---

<FeaturedText>Узнайте, как разрабатывать для Эфириума, используя проекты и инструменты на базе Java</FeaturedText>

Используйте Эфириум для создания децентрализованных приложений (dapp), которые используют преимущества криптовалюты и технологии блокчейн. Эти dapp могут быть надежными, что означает, что после того, как они будут развернуты в Эфириуме, они всегда будут работать так, как запрограммировано. Они могут контролировать цифровые активы для создания новых видов финансовых приложений. Они могут быть децентрализованными, что означает, что ни одна организация или человек не контролирует их, и их практически невозможно подвергнуть цензуре.

## Начало работы со смарт-контрактами и языком Solidity {#getting-started-with-smart-contracts-and-solidity}

**Сделайте первые шаги по интеграции Java с Эфириумом**

Сначала нужно более базовое введение? Посетите [ethereum.org/learn](/learn/) или [ethereum.org/developers.](/developers/)

- [Объяснение блокчейна](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [Понимание смарт-контрактов](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [Напишите свой первый смарт-контракт](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Узнайте, как компилировать и развертывать Solidity](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## Работа с клиентами Эфириума {#working-with-ethereum-clients}

Узнайте, как использовать [Web3j](https://github.com/web3j/web3j) и Hyperledger Бесу, два ведущих Java-клиента Эфириума

- [Подключение к клиенту Эфириума с помощью Java, Eclipse и Web3j](https://kauri.io/article/b9eb647c47a546bc95693acc0be72546/connecting-to-an-ethereum-client-with-java-eclipse-and-web3j)
- [Управление аккаунтом Эфириума с помощью Java и Web3j](https://kauri.io/article/925d923e12c543da9a0a3e617be963b4/manage-an-ethereum-account-with-java-and-web3j)
- [Генерация обертки Java из вашего смарт-контракта](https://kauri.io/article/84475132317d4d6a84a2c42eb9348e4b/generate-a-java-wrapper-from-your-smart-contract)
- [Взаимодействие со смарт-контрактом Эфириума](https://kauri.io/article/14dc434d11ef4ee18bf7d57f079e246e/interacting-with-an-ethereum-smart-contract-in-java)
- [Прослушивание событий смарт-контракта Эфириума](https://kauri.io/article/760f495423db42f988d17b8c145b0874/listening-for-ethereum-smart-contract-events-in-java)
- [Использование Бесу (Pantheon), Java-клиента Эфириума для Linux](https://kauri.io/article/276dd27f1458443295eea58403fd6965/using-pantheon-the-java-ethereum-client-with-linux)
- [Запуск узла Hyperledger Бесу (Pantheon) в интеграционных тестах Java](https://kauri.io/article/7dc3ecc391e54f7b8cbf4e5fa0caf780/running-a-pantheon-node-in-java-integration-tests)
- [Шпаргалка по Web3j](<https://kauri.io/web3j-cheat-sheet-(java-ethereum)/5dfa1ea941ac3d0001ce1d90/c>)

Узнайте, как использовать [ethers-kt](https://github.com/Kr1ptal/ethers-kt), асинхронную высокопроизводительную библиотеку Kotlin для взаимодействия с блокчейнами на базе EVM. Предназначена для платформ JVM и Android.
- [Перевод токенов ERC-20](https://github.com/Kr1ptal/ethers-kt/blob/master/examples/src/main/kotlin/io/ethers/examples/abi/TransferERC20.kt)
- [Своп на UniswapV2 с прослушиванием событий](https://github.com/Kr1ptal/ethers-kt/blob/master/examples/src/main/kotlin/io/ethers/examples/tokenswapwitheventlistening/TokenSwapWithEventListening.kt)
- [Трекер баланса ETH / ERC-20](https://github.com/Kr1ptal/ethers-kt/blob/master/examples/src/main/kotlin/io/ethers/examples/balancetracker/BalanceTracker.kt)

## Статьи среднего уровня {#intermediate-articles}

- [Управление хранилищем в Java-приложении с помощью IPFS](https://kauri.io/article/3e8494f4f56f48c4bb77f1f925c6d926/managing-storage-in-a-java-application-with-ipfs)
- [Управление токенами ERC-20 в Java с помощью Web3j](https://kauri.io/article/d13e911bbf624108b1d5718175a5e0a0/manage-erc20-tokens-in-java-with-web3j)
- [Менеджеры транзакций Web3j](https://kauri.io/article/4cb780bb4d0846438d11885a25b6d7e7/web3j-transaction-managers)

## Продвинутые шаблоны использования {#advanced-use-patterns}

- [Использование Eventeum для создания кэша данных смарт-контракта на Java](https://kauri.io/article/fe81ee9612eb4e5a9ab72790ef24283d/using-eventeum-to-build-a-java-smart-contract-data-cache)

## Проекты и инструменты Java {#java-projects-and-tools}

- [Web3j (библиотека для взаимодействия с клиентами Эфириума)](https://github.com/web3j/web3j)
- [ethers-kt (асинхронная высокопроизводительная библиотека Kotlin/Java/Android для блокчейнов на базе EVM.)](https://github.com/Kr1ptal/ethers-kt)
- [Eventeum (прослушиватель событий)](https://github.com/ConsenSys/eventeum)
- [Mahuta (инструменты разработчика IPFS)](https://github.com/ConsenSys/mahuta)

Ищете больше ресурсов? Посетите [ethereum.org/developers.](/developers/)

## Участники сообщества Java {#java-community-contributors}

- [IO Builders](https://io.builders)
- [Kauri](https://kauri.io)