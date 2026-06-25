---
title: "Ethereum для разработчиков на Go"
description: "Узнайте, как разрабатывать для Ethereum с помощью Go проектов и инструментов"
lang: ru
incomplete: true
---

<FeaturedText>Узнайте, как разрабатывать для Ethereum, используя проекты и инструменты на основе Go</FeaturedText>

Используйте Ethereum для создания децентрализованных приложений ("dapps"). Эти децентрализованные приложения надежны, а это значит, что после развертывания в Ethereum они всегда будут работать в соответствии с программой. Они децентрализованы, что означает, что они работают в одноранговой сети и не имеют единой точки отказа. Их не контролирует ни одно юридическое или физическое лицо, и их практически невозможно подвергнуть цензуре. Они могут управлять цифровыми активами, чтобы создавать новые виды приложений.

## Начало работы с умными контрактами и языком Solidity {#getting-started-with-smart-contracts-and-solidity}

**Сделайте свои первые шаги интеграции Go с Ethereum**

Нужен простой пример для начала? Посетите [ethereum.org/learn](/learn/) или [ethereum.org/developers](/developers/).

- [Объяснение блокчейна](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [Понимание умных контрактов](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [Напишите свой первый умный контракт](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Узнайте, как компилировать и развертывать код на Solidity](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)
- [Руководство по контрактам](https://github.com/ethereum/go-ethereum/wiki/Contract-Tutorial)

## Статьи и книги для начинающих {#beginner-articles-and-books}

- [Начало работы с Geth](https://medium.com/@tzhenghao/getting-started-with-geth-c1a30b8d6458)
- [Использование Golang для подключения к Ethereum](https://www.youtube.com/watch?v=-7uChuO_VzM)
- [Развертывание смарт-контрактов Ethereum с помощью Golang](https://www.youtube.com/watch?v=pytGqQmDslE)
- [Пошаговое руководство по тестированию и развертыванию смарт-контрактов Ethereum на Go](https://hackernoon.com/a-step-by-step-guide-to-testing-and-deploying-ethereum-smart-contracts-in-go-9fc34b178d78)
- [Электронная книга: Разработка для Ethereum на Go](https://goethereumbook.org/) - _Разработка приложений Ethereum с помощью Go_

## Статьи и документация для среднего уровня {#intermediate-articles-and-docs}

- [Документация Go Ethereum](https://geth.ethereum.org/docs/) - _Документация по официальной реализации Ethereum на Golang_
- [Руководство программиста по Erigon](https://github.com/ledgerwatch/erigon/blob/devel/docs/programmers_guide/guide.md) - _Иллюстрированное руководство, включающее дерево состояний, множественные доказательства и обработку транзакций_
- [Erigon и Stateless Ethereum](https://youtu.be/3-Mn7OckSus?t=394) - _Конференция сообщества Ethereum 2020 г. (EthCC 3)_
- [Erigon: оптимизация клиентов Ethereum](https://www.youtube.com/watch?v=CSpc1vZQW2Q) - _Devcon 4, 2018 г._
- [Документация Go Ethereum GoDoc](https://godoc.org/github.com/ethereum/go-ethereum)
- [Создание децентрализованного приложения на Go с помощью Geth](https://kauri.io/#collections/A%20Hackathon%20Survival%20Guide/creating-a-dapp-in-go-with-geth/)
- [Работа с частной сетью Ethereum на Golang и Geth](https://myhsts.org/tutorial-learn-how-to-work-with-ethereum-private-network-with-golang-with-geth.php)
- [Модульное тестирование контрактов Solidity в Ethereum с помощью Go](https://medium.com/coinmonks/unit-testing-solidity-contracts-on-ethereum-with-go-3cc924091281)
- [Краткий справочник по использованию Geth в качестве библиотеки](https://medium.com/coinmonks/web3-go-part-1-31c68c68e20e)

## Продвинутые модели использования {#advanced-use-patterns}

- [Симулированный бэкенд GETH](https://kauri.io/#collections/An%20ethereum%20test%20toolkit%20in%20Go/the-geth-simulated-backend/#_top)
- [Приложения «блокчейн как услуга» с использованием Ethereum и Quorum](https://blockchain.dcwebmakers.com/blockchain-as-a-service-apps-using-ethereum-and-quorum.html)
- [Распределенное хранилище IPFS и Swarm в блокчейн-приложениях Ethereum](https://blockchain.dcwebmakers.com/work-with-distributed-storage-ipfs-and-swarm-in-ethereum.html)
- [Мобильные клиенты: библиотеки и внутрипроцессные узлы Ethereum (Inproc)](https://github.com/ethereum/go-ethereum/wiki/Mobile-Clients:-Libraries-and-Inproc-Ethereum-Nodes)
- [Нативные децентрализованные приложения: привязки Go к контрактам Ethereum](https://github.com/ethereum/go-ethereum/wiki/Native-DApps:-Go-bindings-to-Ethereum-contracts)

## Проекты и инструменты Go {#go-projects-and-tools}

- [Geth / Go Ethereum](https://github.com/ethereum/go-ethereum) - _Официальная реализация протокола Ethereum на Go_
- [Анализ кода Go Ethereum](https://github.com/ZtesoftCS/go-ethereum-code-analysis) - _Обзор и анализ исходного кода Go Ethereum_
- [Erigon](https://github.com/ledgerwatch/erigon) - _Более быстрая производная от Go Ethereum с упором на архивные узлы_
- [Golem](https://github.com/golemfactory/golem) - _Golem создает глобальный рынок вычислительных мощностей_
- [Quorum](https://github.com/jpmorganchase/quorum) - _Реализация Ethereum с контролем доступа, обеспечивающая конфиденциальность данных_
- [Prysm](https://github.com/prysmaticlabs/prysm) - _Реализация Ethereum 'Serenity' 2.0 на Go_
- [Eth Tweet](https://github.com/yep/eth-tweet) - _Децентрализованный Twitter: сервис микроблогов, работающий на блокчейне Ethereum_
- [Plasma MVP Golang](https://github.com/kyokan/plasma) — _Реализация на Golang и расширение спецификации минимально жизнеспособной Plasma (Minimum Viable Plasma)_
- [Open Ethereum Mining Pool](https://github.com/sammy007/open-ethereum-pool) - _Пул для майнинга Ethereum с открытым исходным кодом_
- [Ethereum HD-кошелек](https://github.com/miguelmota/go-ethereum-hdwallet) - _Производные HD-кошелька Ethereum на Go_
- [Multi Geth](https://github.com/multi-geth/multi-geth) - _Поддержка многих разновидностей сетей Ethereum_
- [Легкий клиент Geth](https://github.com/zsfelfoldi/go-ethereum/wiki/Geth-Light-Client) - _Реализация Geth для «легкого» подпротокола Ethereum_
- [Ethereum Golang SDK](https://github.com/everFinance/goether) - _Простая реализация кошелька Ethereum и утилит на Golang_
- [Covalent Golang SDK](https://github.com/covalenthq/covalent-api-sdk-go) - _Эффективный доступ к данным блокчейна через Go SDK для более чем 200 блокчейнов_

Ищешь больше статей? Посетите [ethereum.org/developers](/developers/)

## Участники сообщества Go {#go-community-contributors}

- [Geth в Discord](https://discordapp.com/invite/nthXNEv)
- [Geth в Gitter](https://gitter.im/ethereum/go-ethereum)
- [Gophers в Slack](https://invite.slack.golangbridge.org/) - [канал #ethereum](https://gophers.slack.com/messages/C9HP1S9V2)
- [StackExchange — Ethereum](https://ethereum.stackexchange.com/)
- [Multi Geth в Gitter](https://gitter.im/ethoxy/multi-geth)
- [Ethereum в Gitter](https://gitter.im/ethereum/home)
- [Легкий клиент Geth в Gitter](https://gitter.im/ethereum/light-client)

## Другие сводные списки {#other-aggregated-lists}

- [Отличные ресурсы по Ethereum](https://github.com/btomashvili/awesome-ethereum)
- [Consensys: полный список инструментов для разработчиков Ethereum](https://media.consensys.net/an-definitive-list-of-ethereum-developer-tools-2159ce865974) | [Источник на GitHub](https://github.com/ConsenSys/ethereum-developer-tools-list)
