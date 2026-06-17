---
title: Етеріум для розробників на Go
description: Дізнайтеся, як розробляти для Етеріуму, використовуючи проєкти та інструменти на базі Go
lang: uk
incomplete: true
---

<FeaturedText>Дізнайтеся, як розробляти для Етеріуму, використовуючи проєкти та інструменти на базі Go</FeaturedText>

Використовуйте Етеріум для створення децентралізованих застосунків (dapps). Ці dapps можуть бути надійними, що означає, що після того, як їх розгорнуто в Етеріумі, вони завжди працюватимуть так, як запрограмовано. Вони децентралізовані, тобто працюють в одноранговій мережі і не мають єдиної точки відмови. Жодна організація чи особа не контролює їх, і їх майже неможливо цензурувати. Вони можуть керувати цифровими активами для створення нових видів застосунків.

## Початок роботи зі смарт-контрактами та мовою Solidity {#getting-started-with-smart-contracts-and-solidity}

**Зробіть перші кроки до інтеграції Go з Етеріумом**

Спочатку потрібен базовий вступ? Перегляньте [ethereum.org/learn](/learn/) або [ethereum.org/developers](/developers/).

- [Пояснення блокчейну](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [Розуміння смарт-контрактів](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [Напишіть свій перший смарт-контракт](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Дізнайтеся, як компілювати та розгортати Solidity](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)
- [Посібник із контрактів](https://github.com/ethereum/go-ethereum/wiki/Contract-Tutorial)

## Статті та книги для початківців {#beginner-articles-and-books}

- [Початок роботи з Geth](https://medium.com/@tzhenghao/getting-started-with-geth-c1a30b8d6458)
- [Використання Golang для підключення до Етеріуму](https://www.youtube.com/watch?v=-7uChuO_VzM)
- [Розгортання смарт-контрактів Етеріуму за допомогою Golang](https://www.youtube.com/watch?v=pytGqQmDslE)
- [Покроковий посібник із тестування та розгортання смарт-контрактів Етеріуму на Go](https://hackernoon.com/a-step-by-step-guide-to-testing-and-deploying-ethereum-smart-contracts-in-go-9fc34b178d78)
- [Електронна книга: Розробка для Етеріуму на Go](https://goethereumbook.org/) — _Розробка застосунків Етеріуму за допомогою Go_

## Статті та документація середнього рівня {#intermediate-articles-and-docs}

- [Документація Go Ethereum](https://geth.ethereum.org/docs) — _Документація для офіційного клієнта Етеріуму на Golang_
- [Посібник програміста Ерігон](https://github.com/ledgerwatch/erigon/blob/devel/docs/programmers_guide/guide.md) — _Ілюстрований посібник, що включає дерево стану, мультидокази та обробку транзакцій_
- [Ерігон та Етеріум без стану](https://youtu.be/3-Mn7OckSus?t=394) — _Конференція спільноти Етеріуму 2020 (EthCC 3)_
- [Ерігон: оптимізація клієнтів Етеріуму](https://www.youtube.com/watch?v=CSpc1vZQW2Q) — _Devcon 4 (2018)_
- [GoDoc для Go Ethereum](https://godoc.org/github.com/ethereum/go-ethereum)
- [Створення dapp на Go за допомогою Geth](https://kauri.io/#collections/A%20Hackathon%20Survival%20Guide/creating-a-dapp-in-go-with-geth/)
- [Робота з приватною мережею Етеріуму за допомогою Golang та Geth](https://myhsts.org/tutorial-learn-how-to-work-with-ethereum-private-network-with-golang-with-geth.php)
- [Модульне тестування контрактів Solidity в Етеріумі за допомогою Go](https://medium.com/coinmonks/unit-testing-solidity-contracts-on-ethereum-with-go-3cc924091281)
- [Короткий довідник із використання Geth як бібліотеки](https://medium.com/coinmonks/web3-go-part-1-31c68c68e20e)

## Розширені шаблони використання {#advanced-use-patterns}

- [Симульований бекенд Geth](https://kauri.io/#collections/An%20ethereum%20test%20toolkit%20in%20Go/the-geth-simulated-backend/#_top)
- [Застосунки «Блокчейн як послуга» з використанням Етеріуму та Quorum](https://blockchain.dcwebmakers.com/blockchain-as-a-service-apps-using-ethereum-and-quorum.html)
- [Розподілене сховище IPFS та Рій у блокчейн-застосунках Етеріуму](https://blockchain.dcwebmakers.com/work-with-distributed-storage-ipfs-and-swarm-in-ethereum.html)
- [Мобільні клієнти: бібліотеки та внутрішньопроцесні вузли Етеріуму](https://github.com/ethereum/go-ethereum/wiki/Mobile-Clients:-Libraries-and-Inproc-Ethereum-Nodes)
- [Нативні dapps: прив'язки Go до контрактів Етеріуму](https://github.com/ethereum/go-ethereum/wiki/Native-DApps:-Go-bindings-to-Ethereum-contracts)

## Проєкти та інструменти на Go {#go-projects-and-tools}

- [Geth / Go Ethereum](https://github.com/ethereum/go-ethereum) — _Офіційна реалізація протоколу Етеріуму на Go_
- [Аналіз коду Go Ethereum](https://github.com/ZtesoftCS/go-ethereum-code-analysis) — _Огляд та аналіз вихідного коду Go Ethereum_
- [Ерігон](https://github.com/ledgerwatch/erigon) — _Швидша похідна від Go Ethereum з акцентом на архівні вузли_
- [Golem](https://github.com/golemfactory/golem) — _Golem створює глобальний ринок обчислювальних потужностей_
- [Quorum](https://github.com/jpmorganchase/quorum) — _Реалізація Етеріуму з обмеженим доступом, що підтримує конфіденційність даних_
- [Призм](https://github.com/prysmaticlabs/prysm) — _Реалізація Ethereum 'Serenity' 2.0 на Go_
- [Eth Tweet](https://github.com/yep/eth-tweet) — _Децентралізований Twitter: сервіс мікроблогів, що працює на блокчейні Етеріуму_
- [Plasma MVP Golang](https://github.com/kyokan/plasma) — _Реалізація на Golang та розширення специфікації мінімально життєздатної Плазми_
- [Open Ethereum Mining Pool](https://github.com/sammy007/open-ethereum-pool) — _Пул для майнінгу Етеріуму з відкритим вихідним кодом_
- [Ethereum HD Wallet](https://github.com/miguelmota/go-ethereum-hdwallet) — _Деривації HD-гаманця Етеріуму на Go_
- [Multi Geth](https://github.com/multi-geth/multi-geth) — _Підтримка багатьох видів мереж Етеріуму_
- [Легкий клієнт Geth](https://github.com/zsfelfoldi/go-ethereum/wiki/Geth-Light-Client) — _Реалізація легкого підпротоколу Етеріуму в Geth_
- [Ethereum Golang SDK](https://github.com/everFinance/goether) — _Проста реалізація гаманця Етеріуму та утиліти на Golang_
- [Covalent Golang SDK](https://github.com/covalenthq/covalent-api-sdk-go) — _Ефективний доступ до даних блокчейну через Go SDK для понад 200 блокчейнів_

Шукаєте більше ресурсів? Перегляньте [ethereum.org/developers](/developers/)

## Учасники спільноти Go {#go-community-contributors}

- [Discord Geth](https://discordapp.com/invite/nthXNEv)
- [Gist Geth](https://gitter.im/ethereum/go-ethereum)
- [Slack Gophers](https://invite.slack.golangbridge.org/) — [канал #ethereum](https://gophers.slack.com/messages/C9HP1S9V2)
- [StackExchange — Етеріум](https://ethereum.stackexchange.com/)
- [Gitter Multi Geth](https://gitter.im/ethoxy/multi-geth)
- [Gitter Етеріуму](https://gitter.im/ethereum/home)
- [Gitter легкого клієнта Geth](https://gitter.im/ethereum/light-client)

## Інші зведені списки {#other-aggregated-lists}

- [Awesome Ethereum](https://github.com/btomashvili/awesome-ethereum)
- [ConsenSys: Вичерпний список інструментів для розробників Етеріуму](https://web.archive.org/web/2023/https://media.consensys.net/an-definitive-list-of-ethereum-developer-tools-2159ce865974) | [Джерело на GitHub](https://github.com/ConsenSys/ethereum-developer-tools-list)