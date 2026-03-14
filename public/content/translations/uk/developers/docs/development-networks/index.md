---
title: Development Networks
description: An overview of development networks and the tools available to help build Ethereum applications.
lang: uk
---

When building an Ethereum application with smart contracts, you'll want to run it on a local network to see how it works before deploying it.

Similar to how you might run a local server on your computer for web development, you can use a development network to create a local blockchain instance to test your dapp. Ці мережі розробки Ethereum надають функції, що дозволяють набагато швидшу ітерацію, ніж публічна тестова мережа (наприклад, вам не потрібно займатися отриманням ETH із крана тестової мережі).

## Передумови {#prerequisites}

Ви повинні розуміти [основи стеку Ethereum](/developers/docs/ethereum-stack/) та [мережі Ethereum](/developers/docs/networks/) перед тим, як занурюватися в мережі розробки.

## What is a development network? Що таке мережа для розробки? {#what-is-a-development-network}

Development networks are essentially Ethereum clients (implementations of Ethereum) designed specifically for local development.

**Why not just run a standard Ethereum node locally?**

Ви _могли б_ [запустити вузол](/developers/docs/nodes-and-clients/#running-your-own-node), але оскільки мережі для розробки створені спеціально для цього, вони часто мають такі зручні функції, як-от:

- Детерміноване заповнення вашого локального блокчейну даними (напр., облікові записи з балансами в ETH).
- Миттєве створення блоків для кожної отриманої транзакції, у правильному порядку та без затримок.
- Enhanced debugging and logging functionality

## Доступні інструменти {#available-projects}

**Примітка**: більшість [фреймворків для розробки](/developers/docs/frameworks/) містять вбудовану мережу для розробки. Ми рекомендуємо почати з фреймворку, щоб [налаштувати своє локальне середовище для розробки](/developers/local-environment/).

### Hardhat Network {#hardhat-network}

A local Ethereum network designed for development. It allows you to deploy your contracts, run your tests and debug your code.

Hardhat Network comes built-in with Hardhat, an Ethereum development environment for professionals.

- [Вебсайт](https://hardhat.org/)
- [GitHub](https://github.com/NomicFoundation/hardhat)

### Локальні Beacon Chains {#local-beacon-chains}

Деякі клієнти консенсусу мають вбудовані інструменти для розгортання локальних Beacon Chains з метою тестування. Доступні інструкції для Lighthouse, Nimbus і Lodestar:

- [Локальна тестова мережа з використанням Lodestar](https://chainsafe.github.io/lodestar/contribution/advanced-topics/setting-up-a-testnet#post-merge-local-testnet/)
- [Локальна тестова мережа з використанням Lighthouse](https://lighthouse-book.sigmaprime.io/setup.html#local-testnets)

### Публічні тестові блокчейни Ethereum {#public-beacon-testchains}

Також існують дві підтримувані публічні тестові реалізації Ethereum: Sepolia та Hoodi. Рекомендованою тестовою мережею з довгостроковою підтримкою є Hoodi, у якій будь-хто може вільно стати валідатором. Sepolia використовує набір валідаторів із дозвільним доступом, тобто нові валідатори не мають загального доступу до цієї тестової мережі.

- [Стартова платформа для стейкінгу в Hoodi](https://hoodi.launchpad.ethereum.org/)

### Kurtosis Ethereum Package {#kurtosis}

Kurtosis — це система збірки для багатоконтейнерних тестових середовищ, яка дозволяє розробникам локально розгортати відтворювані екземпляри блокчейн-мереж.

Пакет Kurtosis для Ethereum можна використовувати для швидкого створення параметризованої, високомасштабованої та приватної тестової мережі Ethereum на базі Docker або Kubernetes. Пакет підтримує всі основні клієнти рівня виконання (EL) і рівня консенсусу (CL). Kurtosis коректно обробляє всі зіставлення локальних портів і службові з’єднання для репрезентативної мережі, яка використовується в робочих процесах валідації та тестування, пов'язаних з основною інфраструктурою Ethereum.

- [Пакет мережі Ethereum](https://github.com/kurtosis-tech/ethereum-package)
- [Вебсайт](https://www.kurtosis.com/)
- [GitHub](https://github.com/kurtosis-tech/kurtosis)
- [Документація](https://docs.kurtosis.com/)

## Для подальшого читання {#further-reading}

_Знайшли ресурс, який допоміг з цією темою? Відредагуйте цю сторінку і додайте його!_

## Пов'язані теми {#related-topics}

- [Фреймворки для розробки](/developers/docs/frameworks/)
- [Налаштувати локальне середовище для розробки](/developers/local-environment/)
