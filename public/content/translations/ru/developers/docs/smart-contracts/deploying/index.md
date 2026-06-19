---
title: Развертывание смарт-контрактов
description: Узнайте, как развертывать смарт-контракты в сетях Эфириума, включая предварительные требования, инструменты и шаги развертывания.
lang: ru
---

Вам нужно развернуть свой смарт-контракт, чтобы он стал доступен пользователям сети Эфириум.

Чтобы развернуть смарт-контракт, вам просто нужно отправить транзакцию Эфириума, содержащую скомпилированный код смарт-контракта, не указывая получателя.

## Предварительные требования {#prerequisites}

Вы должны понимать [сети Эфириума](/developers/docs/networks/), [транзакции](/developers/docs/transactions/) и [анатомию смарт-контрактов](/developers/docs/smart-contracts/anatomy/) перед развертыванием смарт-контрактов.

Развертывание контракта также стоит эфир (ETH), поскольку они хранятся в блокчейне, поэтому вы должны быть знакомы с [газом и комиссиями](/developers/docs/gas/) в Эфириуме.

Наконец, вам нужно будет скомпилировать свой контракт перед его развертыванием, поэтому убедитесь, что вы прочитали о [компиляции смарт-контрактов](/developers/docs/smart-contracts/compiling/).

## Как развернуть смарт-контракт {#how-to-deploy-a-smart-contract}

### Что вам понадобится {#what-youll-need}

- Байт-код вашего контракта — он генерируется путем [компиляции](/developers/docs/smart-contracts/compiling/)
- ETH для газа — вы установите лимит газа, как и в других транзакциях, поэтому имейте в виду, что для развертывания контракта требуется гораздо больше газа, чем для простого перевода ETH
- скрипт или плагин для развертывания
- доступ к [узлу Эфириума](/developers/docs/nodes-and-clients/), либо запустив свой собственный, либо подключившись к публичному узлу, либо через ключ API с использованием [сервиса узлов](/developers/docs/nodes-and-clients/nodes-as-a-service/)

### Шаги по развертыванию смарт-контракта {#steps-to-deploy}

Конкретные шаги будут зависеть от используемого фреймворка для разработки. Например, вы можете ознакомиться с [документацией Hardhat по развертыванию контрактов](https://hardhat.org/docs/tutorial/deploying) или [документацией Foundry по развертыванию и верификации смарт-контракта](https://book.getfoundry.sh/forge/deploying). После развертывания ваш контракт получит адрес Эфириума, как и другие [аккаунты](/developers/docs/accounts/), и может быть верифицирован с помощью [инструментов верификации исходного кода](/developers/docs/smart-contracts/verifying/#source-code-verification-tools).

## Связанные инструменты {#related-tools}

**Remix — _Remix IDE позволяет разрабатывать, развертывать и администрировать смарт-контракты для Эфириума и подобных блокчейнов_**

- [Remix](https://remix.ethereum.org)

**Tenderly — _Платформа для разработки Web3, которая предоставляет отладку, наблюдаемость и инфраструктурные строительные блоки для разработки, тестирования, мониторинга и эксплуатации смарт-контрактов_**

- [tenderly.co](https://tenderly.co/)
- [Документация](https://docs.tenderly.co/)
- [GitHub](https://github.com/Tenderly)
- [Дискорд](https://discord.gg/eCWjuvt)

**Hardhat — _Среда разработки для компиляции, развертывания, тестирования и отладки вашего программного обеспечения для Эфириума_**

- [hardhat.org](https://hardhat.org/getting-started/)
- [Документация по развертыванию контрактов](https://hardhat.org/docs/tutorial/deploying)
- [GitHub](https://github.com/nomiclabs/hardhat)
- [Дискорд](https://discord.com/invite/TETZs2KK4k)

**thirdweb — _Легко развертывайте любой контракт в любой EVM-совместимой цепи с помощью одной команды_**

- [Документация](https://portal.thirdweb.com/deploy/)

**Crossmint — _Платформа разработки Web3 корпоративного уровня для развертывания смарт-контрактов, включения платежей по кредитным картам и кроссчейн-платежей, а также использования API для создания, распространения, продажи, хранения и редактирования NFT._**

- [crossmint.com](https://www.crossmint.com)
- [Документация](https://docs.crossmint.com)
- [Дискорд](https://discord.com/invite/crossmint)
- [Блог](https://blog.crossmint.com)

## Связанные руководства {#related-tutorials}

- [Развертывание вашего первого смарт-контракта](/developers/tutorials/deploying-your-first-smart-contract/) _— Введение в развертывание вашего первого смарт-контракта в тестовой сети Эфириума._
- [Hello World | руководство по смарт-контрактам](/developers/tutorials/hello-world-smart-contract/) _— Простое руководство по созданию и развертыванию базового смарт-контракта в Эфириуме._
- [Взаимодействие с другими контрактами из Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/) _— Как развернуть смарт-контракт из существующего контракта и взаимодействовать с ним._
- [Как уменьшить размер вашего контракта](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _— Как уменьшить размер вашего контракта, чтобы не превышать лимит и сэкономить на газе._

## Дополнительная литература {#further-reading}

- [https://docs.openzeppelin.com/learn/deploying-and-interacting](https://docs.openzeppelin.com/learn/deploying-and-interacting) — _ОпенЗеппелин_
- [Развертывание ваших контрактов с помощью Hardhat](https://hardhat.org/docs/tutorial/deploying) — _Nomic Labs_

_Знаете ресурс сообщества, который вам помог? Отредактируйте эту страницу и добавьте его!_

## Связанные темы {#related-topics}

- [Фреймворки для разработки](/developers/docs/frameworks/)
- [Запуск узла Эфириума](/developers/docs/nodes-and-clients/run-a-node/)
- [Узлы как услуга](/developers/docs/nodes-and-clients/nodes-as-a-service)