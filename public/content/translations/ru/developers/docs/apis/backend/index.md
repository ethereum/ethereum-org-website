---
title: "Бэкенд API библиотек"
description: "Введение в API клиента Ethereum, с помощью которых можно взаимодействовать с блокчейном из своего приложения."
lang: ru
---

Чтобы приложение могло взаимодействовать с блокчейном Ethereum (т. е. считывать данные блокчейна и/или проводить транзакции в сети), оно должно подключиться к узлу Ethereum.

Для этой цели каждый клиент Ethereum реализует спецификацию [JSON-RPC](/developers/docs/apis/json-rpc/), поэтому существует единый набор [методов](/developers/docs/apis/json-rpc/#json-rpc-methods), на которые могут полагаться приложения.

Если вы хотите использовать определенный язык программирования для подключения к узлу Ethereum, в экосистеме существует множество удобных библиотек, которые значительно это упрощают. С помощью этих библиотек разработчики могут писать интуитивные, однострочные методы для инициализации запросов JSON-RPC (под капотом), которые взаимодействуют с Ethereum.

## Предварительные условия {#prerequisites}

Может быть полезно разобраться в [стеке Ethereum](/developers/docs/ethereum-stack/) и [клиентах Ethereum](/developers/docs/nodes-and-clients/).

## Зачем использовать библиотеки? {#why-use-a-library}

Использование библиотеки помогает абстрагироваться от сложности при общении с узлом Ethereum напрямую. Они также предоставляют полезные функции (например, конвертирование ETH в Gwei), позволяя вам, как разработчику, тратить меньше времени на тонкости работы с клиентами Ethereum, и сосредоточиться на уникальных функциях своего приложения.

## Доступные библиотеки {#available-libraries}

### Инфраструктура и сервисы узлов {#infrastructure-and-node-services}

**Alchemy —** **_платформа для разработки на Ethereum._**

- [alchemy.com](https://www.alchemy.com/)
- [Документация](https://www.alchemy.com/docs/)
- [GitHub](https://github.com/alchemyplatform)
- [Discord](https://discord.com/invite/alchemyplatform)

**All That Node -** **_Узел как услуга._**

- [All That Node.com](https://www.allthatnode.com/)
- [Документация](https://docs.allthatnode.com)
- [Discord](https://discord.gg/GmcdVEUbJM)

**Blast от Bware Labs -** **_Децентрализованные API для основной сети и тестовых сетей Ethereum._**

- [blastapi.io](https://blastapi.io/)
- [Документация](https://docs.blastapi.io)
- [Discord](https://discord.gg/SaRqmRUjjQ)

**BlockPi -** **_Предоставление более эффективных и быстрых RPC-сервисов_**

- [blockpi.io](https://blockpi.io/)
- [Документация](https://docs.blockpi.io/)
- [GitHub](https://github.com/BlockPILabs)
- [Discord](https://discord.com/invite/xTvGVrGVZv)

**Cloudflare Ethereum Gateway.**

- [cloudflare-eth.com](https://www.cloudflare.com/application-services/products/web3/)

**Etherscan - Обозреватель блоков и API для транзакций**

- [Документация](https://docs.etherscan.io/)

**Blockscout - Обозреватель блоков с открытым исходным кодом**

- [Документация](https://docs.blockscout.com/)

**GetBlock-** **_Блокчейн как услуга для разработки Web3_**

- [GetBlock.io](https://getblock.io/)
- [Документация](https://docs.getblock.io/)

**Infura -** **_API Ethereum как услуга._**

- [infura.io](https://infura.io)
- [Документация](https://docs.infura.io/api)
- [GitHub](https://github.com/INFURA)

**Node RPC - _Экономичный провайдер EVM JSON-RPC_**

- [noderpc.xyz](https://www.noderpc.xyz/)
- [Документация](https://docs.noderpc.xyz/node-rpc)

**NOWNodes - _Полные узлы и обозреватели блоков._**

- [NOWNodes.io](https://nownodes.io/)
- [Документация](https://nownodes.gitbook.io/documentation)

**QuickNode -** **_Инфраструктура блокчейна как услуга._**

- [quicknode.com](https://quicknode.com)
- [Документация](https://www.quicknode.com/docs/welcome)
- [Discord](https://discord.gg/quicknode)

**Rivet -** **_API Ethereum и Ethereum Classic как сервис, основанный на программном обеспечении с открытым исходным кодом._**

- [rivet.cloud](https://rivet.cloud)
- [Документация](https://rivet.cloud/docs/)
- [GitHub](https://github.com/openrelayxyz/ethercattle-deployment)

**Zmok -** **_Ориентированные на скорость узлы Ethereum в виде API JSON-RPC/WebSockets._**

- [zmok.io](https://zmok.io/)
- [GitHub](https://github.com/zmok-io)
- [Документация](https://docs.zmok.io/)
- [Discord](https://discord.gg/fAHeh3ka6s)

### Инструменты для разработчиков {#development-tools}

**ethers-kt —** **_асинхронная, высокопроизводительная библиотека на Kotlin/Java/Android для блокчейнов на основе EVM._**

- [GitHub](https://github.com/Kr1ptal/ethers-kt)
- [Примеры](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [Discord](https://discord.gg/rx35NzQGSb)

**Nethereum -** **_Библиотека интеграции .NET с открытым исходным кодом для блокчейна._**

- [GitHub](https://github.com/Nethereum/Nethereum)
- [Документация](http://docs.nethereum.com/en/latest/)
- [Discord](https://discord.com/invite/jQPrR58FxX)

**Python Tooling -** **_Разнообразные библиотеки для взаимодействия с Ethereum через Python._**

- [py.ethereum.org](https://snakecharmers.ethereum.org/)
- [web3.py на GitHub](https://github.com/ethereum/web3.py)
- [Чат web3.py](https://gitter.im/ethereum/web3.py)

**Tatum -** **_Лучшая платформа для разработки на блокчейне._**

- [Tatum](https://tatum.io/)
- [GitHub](https://github.com/tatumio/)
- [Документация](https://docs.tatum.io/)
- [Discord](https://discord.gg/EDmW3kjTC9)

**web3j -** **_Библиотека интеграции Java/Android/Kotlin/Scala для Ethereum._**

- [GitHub](https://github.com/web3j/web3j)
- [Документация](https://docs.web3j.io/)
- [Gitter](https://gitter.im/web3j/web3j)

### Блокчейн-сервисы {#blockchain-services}

**BlockCypher -** **_Веб-API для Ethereum._**

- [blockcypher.com](https://www.blockcypher.com/)
- [Документация](https://www.blockcypher.com/dev/ethereum/)

**Chainbase -** **_Универсальная инфраструктура данных Web3 для Ethereum._**

- [chainbase.com](https://chainbase.com/)
- [Документация](https://docs.chainbase.com/)
- [Discord](https://discord.gg/Wx6qpqz4AF)

**Chainstack -** **_Гибкие и выделенные узлы Ethereum как услуга._**

- [chainstack.com](https://chainstack.com)
- [Документация](https://docs.chainstack.com/)
- [Справочник по API Ethereum](https://docs.chainstack.com/reference/ethereum-getting-started)

**Coinbase Cloud Node -** **_API инфраструктуры блокчейна._**

- [Coinbase Cloud Node](https://www.coinbase.com/developer-platform)
- [Документация](https://docs.cdp.coinbase.com/)

**DataHub от Figment -** **_Сервисы API Web3 для основной и тестовых сетей Ethereum._**

- [DataHub](https://www.figment.io/)
- [Документация](https://docs.figment.io/)

**Moralis -** **_Поставщик EVM API корпоративного уровня._**

- [moralis.io](https://moralis.io)
- [Документация](https://docs.moralis.io/)
- [GitHub](https://github.com/MoralisWeb3)
- [Discord](https://moralis.io/joindiscord/)
- [Форум](https://forum.moralis.io/)

**NFTPort -** **_API для данных и минтинга Ethereum._**

- [nftport.xyz](https://www.nftport.xyz/)
- [Документация](https://docs.nftport.xyz/)
- [GitHub](https://github.com/nftport/)
- [Discord](https://discord.com/invite/K8nNrEgqhE)

**Tokenview -** **_Универсальная API-платформа для различных блокчейнов._**

- [services.tokenview.io](https://services.tokenview.io/)
- [Документация](https://services.tokenview.io/docs?type=api)
- [GitHub](https://github.com/Tokenview)

**Watchdata -** **_Предоставляет простой и надежный API-доступ к блокчейну Ethereum._**

- [Watchdata](https://watchdata.io/)
- [Документация](https://docs.watchdata.io/)
- [Discord](https://discord.com/invite/TZRJbZ6bdn)

**Covalent -** **_Расширенные API для более чем 200 блокчейнов._**

- [covalenthq.com](https://www.covalenthq.com/)
- [Документация](https://www.covalenthq.com/docs/api/)
- [GitHub](https://github.com/covalenthq)
- [Discord](https://www.covalenthq.com/discord/)

## Дополнительные материалы {#further-reading}

_Знаете ресурс сообщества, который вам пригодился? Измените эту страницу и добавьте его!_

## Смежные темы {#related-topics}

- [Узлы и клиенты](/developers/docs/nodes-and-clients/)
- [Фреймворки для разработки](/developers/docs/frameworks/)

## Связанные руководства {#related-tutorials}

- [Настройка Web3js для использования блокчейна Ethereum в JavaScript](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _— инструкции по настройке Web3js в вашем проекте._
- [Вызов умного контракта из JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/) _— на примере токена DAI вы увидите, как вызывать функции контрактов с помощью JavaScript._
