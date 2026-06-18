---
title: Библиотеки API бэкенда
description: Введение в API клиентов Эфириума, которые позволяют взаимодействовать с блокчейном из вашего приложения.
lang: ru
---

Чтобы программное приложение могло взаимодействовать с блокчейном [Эфириума](/) (т. е. читать данные блокчейна и/или отправлять транзакции в сеть), оно должно подключиться к узлу Эфириума.

Для этой цели каждый клиент Эфириума реализует спецификацию [JSON-RPC](/developers/docs/apis/json-rpc/), поэтому существует единый набор [методов](/developers/docs/apis/json-rpc/#json-rpc-methods), на которые могут полагаться приложения.

Если вы хотите использовать определенный язык программирования для подключения к узлу Эфириума, в экосистеме есть множество удобных библиотек, которые значительно упрощают эту задачу. С помощью этих библиотек разработчики могут писать интуитивно понятные однострочные методы для инициализации запросов JSON-RPC (внутренне), которые взаимодействуют с Эфириумом.

## Предварительные требования {#prerequisites}

Возможно, будет полезно изучить [стек Эфириума](/developers/docs/ethereum-stack/) и [клиенты Эфириума](/developers/docs/nodes-and-clients/).

## Зачем использовать библиотеку? {#why-use-a-library}

Эти библиотеки абстрагируют большую часть сложности прямого взаимодействия с узлом Эфириума. Они также предоставляют служебные функции (например, конвертацию ETH в Gwei), поэтому как разработчик вы можете тратить меньше времени на изучение тонкостей клиентов Эфириума и больше времени уделять уникальной функциональности вашего приложения.

## Доступные библиотеки {#available-libraries}

### Инфраструктура и сервисы узлов {#infrastructure-and-node-services}

**Alchemy —** **_Платформа для разработки на Эфириуме._**

- [alchemy.com](https://www.alchemy.com/)
- [Документация](https://www.alchemy.com/docs/)
- [GitHub](https://github.com/alchemyplatform)
- [Дискорд](https://discord.com/invite/alchemyplatform)
  
**All That Node —** **_Узел как услуга (Node-as-a-Service)._**

- [All That Node.com](https://www.allthatnode.com/)
- [Документация](https://docs.allthatnode.com)
- [Дискорд](https://discord.gg/GmcdVEUbJM)

**Blast от Bware Labs —** **_Децентрализованные API для основной сети Ethereum и тестовых сетей._**

- [blastapi.io](https://blastapi.io/)
- [Документация](https://docs.blastapi.io)
- [Дискорд](https://discord.gg/SaRqmRUjjQ)

**BlockPi —** **_Предоставляет более эффективные и быстрые сервисы RPC_**

- [blockpi.io](https://blockpi.io/)
- [Документация](https://docs.blockpi.io/)
- [GitHub](https://github.com/BlockPILabs)
- [Дискорд](https://discord.com/invite/xTvGVrGVZv)

**Шлюз Эфириума Cloudflare.**

- [cloudflare-eth.com](https://www.cloudflare.com/application-services/products/web3/)

**Etherscan — Обозреватель блоков и API транзакций**
- [Документация](https://docs.etherscan.io/)

**Blockscout — Обозреватель блоков с открытым исходным кодом**
- [Документация](https://docs.blockscout.com/)

**GetBlock —** **_Блокчейн как услуга для разработки Web3_**

- [GetBlock.io](https://getblock.io/)
- [Документация](https://docs.getblock.io/)

**Infura —** **_API Эфириума как услуга._**

- [infura.io](https://infura.io)
- [Документация](https://docs.infura.io/api)
- [GitHub](https://github.com/INFURA)

**Node RPC — _Экономичный провайдер EVM JSON-RPC_**

- [noderpc.xyz](https://www.noderpc.xyz/)
- [Документация](https://docs.noderpc.xyz/node-rpc)

**NOWNodes — _Полные узлы и обозреватели блоков._**

- [NOWNodes.io](https://nownodes.io/)
- [Документация](https://nownodes.gitbook.io/documentation)

**QuickNode —** **_Блокчейн-инфраструктура как услуга._**

- [quicknode.com](https://quicknode.com)
- [Документация](https://www.quicknode.com/docs/welcome)
- [Дискорд](https://discord.gg/quicknode)

**Rivet —** **_API Эфириума и Эфириум Классик как услуга на базе программного обеспечения с открытым исходным кодом._**

- [rivet.cloud](https://rivet.cloud)
- [Документация](https://rivet.cloud/docs/)
- [GitHub](https://github.com/openrelayxyz/ethercattle-deployment)

**Zmok —** **_Ориентированные на скорость узлы Эфириума в виде API JSON-RPC/WebSockets._**

- [zmok.io](https://zmok.io/)
- [GitHub](https://github.com/zmok-io)
- [Документация](https://docs.zmok.io/)
- [Дискорд](https://discord.gg/fAHeh3ka6s)

### Инструменты разработки {#development-tools}

**ethers-kt —** **_Асинхронная высокопроизводительная библиотека Kotlin/Java/Android для блокчейнов на базе EVM._**

- [GitHub](https://github.com/Kr1ptal/ethers-kt)
- [Примеры](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [Дискорд](https://discord.gg/rx35NzQGSb)

**Nethereum —** **_Библиотека интеграции .NET с открытым исходным кодом для блокчейна._**

- [GitHub](https://github.com/Nethereum/Nethereum)
- [Документация](https://docs.nethereum.com/docs/getting-started/welcome/)
- [Дискорд](https://discord.com/invite/jQPrR58FxX)

**Инструменты Python —** **_Разнообразные библиотеки для взаимодействия с Эфириумом через Python._**

- [py.ethereum.org](https://snakecharmers.ethereum.org/)
- [GitHub Web3.py](https://github.com/ethereum/web3.py)
- [Чат Web3.py](https://gitter.im/ethereum/web3.py)

**Tatum —** **_Универсальная платформа для разработки на блокчейне._**

- [Tatum](https://tatum.io/)
- [GitHub](https://github.com/tatumio/)
- [Документация](https://docs.tatum.io/)
- [Дискорд](https://discord.gg/EDmW3kjTC9)

**Web3j —** **_Библиотека интеграции Java/Android/Kotlin/Scala для Эфириума._**

- [GitHub](https://github.com/web3j/web3j)
- [Документация](https://docs.web3j.io/)
- [Gitter](https://gitter.im/web3j/web3j)

### Блокчейн-сервисы {#blockchain-services}

**BlockCypher —** **_Веб-API Эфириума._**

- [blockcypher.com](https://www.blockcypher.com/)
- [Документация](https://www.blockcypher.com/dev/ethereum/)

**Chainbase —** **_Универсальная инфраструктура данных Web3 для Эфириума._**

- [chainbase.com](https://chainbase.com/)
- [Документация](https://docs.chainbase.com/)
- [Дискорд](https://discord.gg/Wx6qpqz4AF)

**Chainstack —** **_Эластичные и выделенные узлы Эфириума как услуга._**

- [chainstack.com](https://chainstack.com)
- [Документация](https://docs.chainstack.com/)
- [Справочник по API Эфириума](https://docs.chainstack.com/reference/ethereum-getting-started)

**Coinbase Cloud Node —** **_API блокчейн-инфраструктуры._**

- [Coinbase Cloud Node](https://www.coinbase.com/developer-platform)
- [Документация](https://docs.cdp.coinbase.com/)

**DataHub от Figment —** **_Сервисы API Web3 с основной сетью Ethereum и тестовыми сетями._**

- [DataHub](https://www.figment.io/)
- [Документация](https://docs.figment.io/)

**Moralis —** **_Провайдер EVM API корпоративного уровня._**

- [moralis.io](https://moralis.io)
- [Документация](https://docs.moralis.io/)
- [GitHub](https://github.com/MoralisWeb3)
- [Дискорд](https://moralis.io/joindiscord/)
- [Форум](https://forum.moralis.io/)

**NFTPort —** **_API данных Эфириума и чеканки._**

- [nftport.xyz](https://www.nftport.xyz/)
- [Документация](https://docs.nftport.xyz/)
- [GitHub](https://github.com/nftport/)
- [Дискорд](https://discord.com/invite/K8nNrEgqhE)

**Tokenview —** **_Универсальная платформа API для мультивалютных блокчейнов._**

- [services.tokenview.io](https://services.tokenview.io/)
- [Документация](https://services.tokenview.io/docs?type=api)
- [GitHub](https://github.com/Tokenview)

**Watchdata —** **_Предоставляет простой и надежный доступ к API блокчейна Эфириума._**

- [Watchdata](https://watchdata.io/)
- [Документация](https://docs.watchdata.io/)
- [Дискорд](https://discord.com/invite/TZRJbZ6bdn)

**Codex —** **_API обогащенных данных блокчейна в реальном времени для десятков сетей._**

- [codex.io](https://www.codex.io/)
- [Документация](https://docs.codex.io)
- [Обозреватель](https://docs.codex.io/explore)
- [GitHub](https://github.com/Codex-Data)
- [Дискорд](https://discord.com/invite/mFpUhT3vAq)

**Covalent —** **_Обогащенные API блокчейна для более чем 200 сетей._**

- [covalenthq.com](https://www.covalenthq.com/)
- [Документация](https://www.covalenthq.com/docs/api/)
- [GitHub](https://github.com/covalenthq)
- [Дискорд](https://www.covalenthq.com/discord/)


## Дополнительная литература {#further-reading}

_Знаете ресурс сообщества, который вам помог? Отредактируйте эту страницу и добавьте его!_

## Связанные темы {#related-topics}

- [Узлы и клиенты](/developers/docs/nodes-and-clients/)
- [Фреймворки для разработки](/developers/docs/frameworks/)

## Связанные руководства {#related-tutorials}

- [Настройка Web3.js для использования блокчейна Эфириума в JavaScript](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _— Инструкции по настройке Web3.js в вашем проекте._
- [Вызов смарт-контракта из JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/) _— На примере токена DAI узнайте, как вызывать функции контрактов с помощью JavaScript._