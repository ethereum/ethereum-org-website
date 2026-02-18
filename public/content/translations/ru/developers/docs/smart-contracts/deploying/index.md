---
title: "Развертывание смарт-контрактов"
description: "Узнайте, как развертывать умные контракты в сетях Ethereum, включая предварительные требования, инструменты и этапы развертывания."
lang: ru
---

Вам необходимо развернуть свой смарт-контракт, чтобы он был доступен пользователям сети Ethereum.

Чтобы развернуть смарт-контракт, вы просто отправляете транзакцию Ethereum, содержащую скомпилированный код смарт-контракта, не указывая получателя.

## Предварительные условия {#prerequisites}

Прежде чем развертывать смарт-контракты, вам следует ознакомиться с [сетями Ethereum](/developers/docs/networks/), [транзакциями](/developers/docs/transactions/) и [анатомией смарт-контрактов](/developers/docs/smart-contracts/anatomy/).

Развертывание контракта также стоит эфира (ETH), поскольку он хранится в блокчейне, поэтому вам следует ознакомиться с [газом и комиссиями](/developers/docs/gas/) в Ethereum.

Наконец, перед развертыванием вам нужно будет скомпилировать ваш контракт, поэтому убедитесь, что вы прочли о [компиляции смарт-контрактов](/developers/docs/smart-contracts/compiling/).

## Как развернуть смарт-контракт {#how-to-deploy-a-smart-contract}

### Что вам понадобится {#what-youll-need}

- Байт-код вашего контракта — он генерируется путем [компиляции](/developers/docs/smart-contracts/compiling/)
- ETH для газа — вы устанавливаете свой лимит газа, как и для обычных транзакций, поэтому имейте в виду, что для развертывания контракта требуется гораздо больше газа, чем для простого перевода ETH
- сценарий развертывания или плагин
- доступ к [узлу Ethereum](/developers/docs/nodes-and-clients/) через запуск собственного узла, подключение к общедоступному или использование ключа API [сервиса узлов](/developers/docs/nodes-and-clients/nodes-as-a-service/)

### Этапы развертывания смарт-контракта {#steps-to-deploy}

Конкретные этапы будут зависеть от используемой среды разработки. Например, вы можете ознакомиться с [документацией Hardhat по развертыванию контрактов](https://hardhat.org/docs/tutorial/deploying) или [документацией Foundry по развертыванию и верификации смарт-контракта](https://book.getfoundry.sh/forge/deploying). После развертывания ваш контракт будет иметь адрес Ethereum, как и другие [аккаунты](/developers/docs/accounts/), и его можно будет верифицировать с помощью [инструментов верификации исходного кода](/developers/docs/smart-contracts/verifying/#source-code-verification-tools).

## Связанные инструменты {#related-tools}

**Remix — _Remix IDE позволяет разрабатывать, развертывать и администрировать смарт-контракты для блокчейнов, подобных Ethereum_**

- [Remix](https://remix.ethereum.org)

**Tenderly — _платформа для разработки Web3, предоставляющая средства отладки, наблюдаемости и инфраструктурные компоненты для разработки, тестирования, мониторинга и эксплуатации смарт-контрактов_**

- [tenderly.co](https://tenderly.co/)
- [Документация](https://docs.tenderly.co/)
- [GitHub](https://github.com/Tenderly)
- [Discord](https://discord.gg/eCWjuvt)

**Hardhat — _среда разработки для компиляции, развертывания, тестирования и отладки вашего программного обеспечения Ethereum_**

- [hardhat.org](https://hardhat.org/getting-started/)
- [Документация по развертыванию ваших контрактов](https://hardhat.org/docs/tutorial/deploying)
- [GitHub](https://github.com/nomiclabs/hardhat)
- [Discord](https://discord.com/invite/TETZs2KK4k)

**thirdweb — _простое развертывание любого контракта в любой EVM-совместимой сети с помощью одной команды_**

- [Документация](https://portal.thirdweb.com/deploy/)

**Crossmint — _платформа для разработки Web3 корпоративного уровня для развертывания смарт-контрактов, приема платежей по кредитным картам и кроссчейн-платежей, а также использования API для создания, распространения, продажи, хранения и редактирования NFT._**

- [crossmint.com](https://www.crossmint.com)
- [Документация](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)
- [Блог](https://blog.crossmint.com)

## Связанные руководства {#related-tutorials}

- [Развертывание вашего первого смарт-контракта](/developers/tutorials/deploying-your-first-smart-contract/) _– введение в развертывание вашего первого смарт-контракта в тестовой сети Ethereum._
- [Hello World | руководство по смарт-контрактам](/developers/tutorials/hello-world-smart-contract/) _– простое руководство по созданию и развертыванию базового смарт-контракта на Ethereum._
- [Взаимодействие с другими контрактами из Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– как развернуть смарт-контракт из существующего контракта и взаимодействовать с ним._
- [Как уменьшить размер контракта](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _– как уменьшить размер контракта, чтобы он не превышал лимит, и сэкономить на газе_

## Дополнительные материалы {#further-reading}

- [https://docs.openzeppelin.com/learn/deploying-and-interacting](https://docs.openzeppelin.com/learn/deploying-and-interacting) — _OpenZeppelin_
- [Развертывание ваших контрактов с помощью Hardhat](https://hardhat.org/docs/tutorial/deploying) — _Nomic Labs_

_Знаете ресурс сообщества, который вам пригодился? Измените эту страницу и добавьте его!_

## Смежные темы {#related-topics}

- [Фреймворки для разработки](/developers/docs/frameworks/)
- [Запуск узла Ethereum](/developers/docs/nodes-and-clients/run-a-node/)
- [Узлы как услуга](/developers/docs/nodes-and-clients/nodes-as-a-service)
