---
title: Ethereum для розробників мовою Go
description: Дізнайтеся, як розробляти програми для Ethereum за допомогою проектів та інструментів на основі Go
lang: uk
incomplete: true
---

<FeaturedText>Дізнайтеся, як розробляти для Ethereum за допомогою проєктів та інструментів на основі Go</FeaturedText>

Використовуйте Ethereum для створення децентралізованих додатків. Ці децентралізовані програми можуть бути надійними, а це означає, що як тільки їх буде запущено в Ethereum, вони завжди працюватимуть так, як їх запрограмовано. Це програми, які можуть без перешкод запускатися в мережі P2P. Їх не контролюють організації або фізичні особи. Їх також майже неможливо піддати цензурі. Вони можуть контролювати цифрові об’єкти для створення нових типів програм.

## Початок роботи зі смарт-контрактами та мовою Solidity {#getting-started-with-smart-contracts-and-solidity}

**Зробіть свої перші кроки до інтеграції Go з Ethereum**

Потрібен простий приклад для початку? Перегляньте [ethereum.org/learn](/learn/) або [ethereum.org/developers](/developers/).

- [Пояснення блокчейну](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [Розуміння смарт-контрактів](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [Напишіть свій перший смарт-контракт](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Дізнайтеся, як компілювати та розгортати Solidity](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)
- [Посібник з контрактів](https://github.com/ethereum/go-ethereum/wiki/Contract-Tutorial)

## Статті та книги для початківців {#beginner-articles-and-books}

- [Початок роботи з Geth](https://medium.com/@tzhenghao/getting-started-with-geth-c1a30b8d6458)
- [Використання Golang для підключення до Ethereum](https://www.youtube.com/watch?v=-7uChuO_VzM)
- [Розгортання смарт-контрактів Ethereum за допомогою Golang](https://www.youtube.com/watch?v=pytGqQmDslE)
- [Покроковий посібник із тестування та розгортання смарт-контрактів Ethereum на Go](https://hackernoon.com/a-step-by-step-guide-to-testing-and-deploying-ethereum-smart-contracts-in-go-9fc34b178d78)
- [Електронна книга: Розробка для Ethereum на Go](https://goethereumbook.org/) - _Розробка застосунків Ethereum на Go_

## Статті та документи для середнього рівня {#intermediate-articles-and-docs}

- [Документація Go Ethereum](https://geth.ethereum.org/docs/) - _Офіційна документація Ethereum для Golang_
- [Посібник програміста Erigon](https://github.com/ledgerwatch/erigon/blob/devel/docs/programmers_guide/guide.md) - _Ілюстрований посібник, що включає дерево станів, мультидокази та обробку транзакцій_
- [Erigon та Ethereum без стану](https://youtu.be/3-Mn7OckSus?t=394) - _Конференція спільноти Ethereum 2020 (EthCC 3)_
- [Erigon: оптимізація клієнтів Ethereum](https://www.youtube.com/watch?v=CSpc1vZQW2Q) - _Devcon 4, 2018_
- [Go Ethereum GoDoc](https://godoc.org/github.com/ethereum/go-ethereum)
- [Створення dapp на Go за допомогою Geth](https://kauri.io/#collections/A%20Hackathon%20Survival%20Guide/creating-a-dapp-in-go-with-geth/)
- [Робота з приватною мережею Ethereum за допомогою Golang та Geth](https://myhsts.org/tutorial-learn-how-to-work-with-ethereum-private-network-with-golang-with-geth.php)
- [Модульне тестування контрактів Solidity на Ethereum за допомогою Go](https://medium.com/coinmonks/unit-testing-solidity-contracts-on-ethereum-with-go-3cc924091281)
- [Короткий довідник із використання Geth як бібліотеки](https://medium.com/coinmonks/web3-go-part-1-31c68c68e20e)

## Розширені шаблони використання {#advanced-use-patterns}

- [Симульований бекенд GETH](https://kauri.io/#collections/An%20ethereum%20test%20toolkit%20in%20Go/the-geth-simulated-backend/#_top)
- [Застосунки «Блокчейн як послуга» з використанням Ethereum та Quorum](https://blockchain.dcwebmakers.com/blockchain-as-a-service-apps-using-ethereum-and-quorum.html)
- [Розподілені сховища IPFS та Swarm у блокчейн-застосунках Ethereum](https://blockchain.dcwebmakers.com/work-with-distributed-storage-ipfs-and-swarm-in-ethereum.html)
- [Мобільні клієнти: бібліотеки та внутрішньопроцесні вузли Ethereum](https://github.com/ethereum/go-ethereum/wiki/Mobile-Clients:-Libraries-and-Inproc-Ethereum-Nodes)
- [Нативні dapps: прив’язки Go до контрактів Ethereum](https://github.com/ethereum/go-ethereum/wiki/Native-DApps:-Go-bindings-to-Ethereum-contracts)

## Проєкти та інструменти на Go {#go-projects-and-tools}

- [Geth / Go Ethereum](https://github.com/ethereum/go-ethereum) - _Офіційна реалізація протоколу Ethereum на Go_
- [Аналіз коду Go Ethereum](https://github.com/ZtesoftCS/go-ethereum-code-analysis) - _Огляд та аналіз вихідного коду Go Ethereum_
- [Erigon](https://github.com/ledgerwatch/erigon) - _Швидша похідна версія Go Ethereum, що орієнтована на архівні вузли_
- [Golem](https://github.com/golemfactory/golem) - _Golem створює глобальний ринок обчислювальних потужностей_
- [Quorum](https://github.com/jpmorganchase/quorum) - _Реалізація Ethereum із керованим доступом, що підтримує конфіденційність даних_
- [Prysm](https://github.com/prysmaticlabs/prysm) - _Реалізація Ethereum «Serenity» 2.0 на Go_
- [Eth Tweet](https://github.com/yep/eth-tweet) - _Децентралізований Twitter: сервіс мікроблогів, що працює на блокчейні Ethereum_
- [Plasma MVP Golang](https://github.com/kyokan/plasma) — _Реалізація на Golang і розширення специфікації Minimum Viable Plasma_
- [Відкритий майнінг-пул Ethereum](https://github.com/sammy007/open-ethereum-pool) - _Майнінг-пул Ethereum з відкритим кодом_
- [HD-гаманець Ethereum](https://github.com/miguelmota/go-ethereum-hdwallet) - _Похідні HD-гаманця Ethereum на Go_
- [Multi Geth](https://github.com/multi-geth/multi-geth) - _Підтримка багатьох різновидів мереж Ethereum_
- [Полегшений клієнт Geth](https://github.com/zsfelfoldi/go-ethereum/wiki/Geth-Light-Client) - _Реалізація Geth для полегшеного субпротоколу Ethereum_
- [Ethereum Golang SDK](https://github.com/everFinance/goether) - _Проста реалізація гаманця Ethereum та утиліти на Golang_
- [Covalent Golang SDK](https://github.com/covalenthq/covalent-api-sdk-go) - _Ефективний доступ до даних блокчейну через Go SDK для понад 200 блокчейнів_

Шукаєте більше ресурсів? Перегляньте [ethereum.org/developers](/developers/)

## Учасники спільноти Go {#go-community-contributors}

- [Discord-сервер Geth](https://discordapp.com/invite/nthXNEv)
- [Geth Gitter](https://gitter.im/ethereum/go-ethereum)
- [Gophers Slack](https://invite.slack.golangbridge.org/) - [канал #ethereum](https://gophers.slack.com/messages/C9HP1S9V2)
- [StackExchange - Ethereum](https://ethereum.stackexchange.com/)
- [Multi Geth Gitter](https://gitter.im/ethoxy/multi-geth)
- [Ethereum Gitter](https://gitter.im/ethereum/home)
- [Geth light Client Gitter](https://gitter.im/ethereum/light-client)

## Інші зведені списки {#other-aggregated-lists}

- [Чудовий Ethereum](https://github.com/btomashvili/awesome-ethereum)
- [Consensys: повний список інструментів для розробників Ethereum](https://media.consensys.net/an-definitive-list-of-ethereum-developer-tools-2159ce865974) | [Джерело на GitHub](https://github.com/ConsenSys/ethereum-developer-tools-list)
