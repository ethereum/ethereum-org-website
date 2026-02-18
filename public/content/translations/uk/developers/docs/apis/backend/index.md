---
title: Backend API libraries
description: An introduction to the Ethereum client APIs that let you interact with the blockchain from your application.
lang: uk
---

Щоб програмний застосунок міг взаємодіяти з блокчейном Ethereum (тобто зчитувати дані з блокчейну та/або надсилати транзакції в мережу), він повинен підключатися до вузла Ethereum.

З цією метою кожен клієнт Ethereum реалізує специфікацію [JSON-RPC](/developers/docs/apis/json-rpc/), тому існує єдиний набір [методів](/developers/docs/apis/json-rpc/#json-rpc-methods), на які можуть покладатися застосунки.

Якщо ви хочете використовувати певну мову програмування для підключення до вузла Ethereum, в екосистемі існує багато зручних бібліотек, які значно це спрощують. За допомогою цих бібліотек розробники можуть писати інтуїтивно зрозумілі однорядкові методи для ініціалізації запитів JSON-RPC (під капотом), що взаємодіють з Ethereum.

## Передумови {#prerequisites}

Може бути корисно розібратися зі [стеком Ethereum](/developers/docs/ethereum-stack/) та [клієнтами Ethereum](/developers/docs/nodes-and-clients/).

## Why use a library? {#why-use-a-library}

These libraries abstract away much of the complexity of interacting directly with an Ethereum node. Вони також надають корисні функції (наприклад, перетворення ETH на Gwei), тому як розробник ви можете витрачати менше часу на тонкощі клієнтів Ethereum і більше часу зосереджуватися на унікальній функціональності вашого застосунку.

## Доступні бібліотеки {#available-libraries}

### Інфраструктура та сервіси вузлів {#infrastructure-and-node-services}

**Alchemy -** **_Платформа для розробки на Ethereum._**

- [alchemy.com](https://www.alchemy.com/)
- [Документація](https://www.alchemy.com/docs/)
- [GitHub](https://github.com/alchemyplatform)
- [Discord](https://discord.com/invite/alchemyplatform)

**All That Node —** **_«вузол як послуга»._**

- [All That Node.com](https://www.allthatnode.com/)
- [Документація](https://docs.allthatnode.com)
- [Discord](https://discord.gg/GmcdVEUbJM)

**Blast by Bware Labs —** **_децентралізовані API для основної мережі Ethereum та тестових мереж._**

- [blastapi.io](https://blastapi.io/)
- [Документація](https://docs.blastapi.io)
- [Discord](https://discord.gg/SaRqmRUjjQ)

**BlockPi —** **_надання ефективніших і швидших сервісів RPC_**

- [blockpi.io](https://blockpi.io/)
- [Документація](https://docs.blockpi.io/)
- [GitHub](https://github.com/BlockPILabs)
- [Discord](https://discord.com/invite/xTvGVrGVZv)

**Шлюз Cloudflare Ethereum.**

- [cloudflare-eth.com](https://www.cloudflare.com/application-services/products/web3/)

**Etherscan — оглядач блоків та API транзакцій**

- [Документація](https://docs.etherscan.io/)

**Blockscout — оглядач блоків із відкритим кодом**

- [Документація](https://docs.blockscout.com/)

**GetBlock —** **_«блокчейн як послуга» для розробки Web3_**

- [GetBlock.io](https://getblock.io/)
- [Документація](https://docs.getblock.io/)

**Infura —** **_API Ethereum як послуга._**

- [infura.io](https://infura.io)
- [Документація](https://docs.infura.io/api)
- [GitHub](https://github.com/INFURA)

**Node RPC — _економічно ефективний постачальник EVM JSON-RPC_**

- [noderpc.xyz](https://www.noderpc.xyz/)
- [Документація](https://docs.noderpc.xyz/node-rpc)

**NOWNodes — _повні вузли та оглядачі блоків._**

- [NOWNodes.io](https://nownodes.io/)
- [Документація](https://nownodes.gitbook.io/documentation)

**QuickNode —** **_інфраструктура блокчейну як послуга._**

- [quicknode.com](https://quicknode.com)
- [Документація](https://www.quicknode.com/docs/welcome)
- [Discord](https://discord.gg/quicknode)

**Rivet —** **_API Ethereum та Ethereum Classic як сервіс на основі програмного забезпечення з відкритим кодом._**

- [rivet.cloud](https://rivet.cloud)
- [Документація](https://rivet.cloud/docs/)
- [GitHub](https://github.com/openrelayxyz/ethercattle-deployment)

**Zmok —** **_орієнтовані на швидкість вузли Ethereum як API JSON-RPC/WebSockets._**

- [zmok.io](https://zmok.io/)
- [GitHub](https://github.com/zmok-io)
- [Документація](https://docs.zmok.io/)
- [Discord](https://discord.gg/fAHeh3ka6s)

### Інструменти для розробки {#development-tools}

**ethers-kt -** **_Асинхронна, високопродуктивна бібліотека Kotlin/Java/Android для блокчейнів на основі EVM._**

- [GitHub](https://github.com/Kr1ptal/ethers-kt)
- [Приклади](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [Discord](https://discord.gg/rx35NzQGSb)

**Nethereum —** **_інтеграційна .NET-бібліотека з відкритим кодом для блокчейну._**

- [GitHub](https://github.com/Nethereum/Nethereum)
- [Документація](http://docs.nethereum.com/en/latest/)
- [Discord](https://discord.com/invite/jQPrR58FxX)

**Інструменти для Python —** **_різноманітні бібліотеки для взаємодії з Ethereum за допомогою Python._**

- [py.ethereum.org](https://snakecharmers.ethereum.org/)
- [web3.py GitHub](https://github.com/ethereum/web3.py)
- [Чат web3.py](https://gitter.im/ethereum/web3.py)

**Tatum —** **_найкраща платформа для розробки на блокчейні._**

- [Tatum](https://tatum.io/)
- [GitHub](https://github.com/tatumio/)
- [Документація](https://docs.tatum.io/)
- [Discord](https://discord.gg/EDmW3kjTC9)

**web3j —** **_інтеграційна бібліотека Java/Android/Kotlin/Scala для Ethereum._**

- [GitHub](https://github.com/web3j/web3j)
- [Документація](https://docs.web3j.io/)
- [Gitter](https://gitter.im/web3j/web3j)

### Сервіси блокчейну {#blockchain-services}

**BlockCypher —** **_веб-API Ethereum._**

- [blockcypher.com](https://www.blockcypher.com/)
- [Документація](https://www.blockcypher.com/dev/ethereum/)

**Chainbase —** **_комплексна інфраструктура даних Web3 для Ethereum._**

- [chainbase.com](https://chainbase.com/)
- [Документація](https://docs.chainbase.com/)
- [Discord](https://discord.gg/Wx6qpqz4AF)

**Chainstack —** **_еластичні та виділені вузли Ethereum як послуга._**

- [chainstack.com](https://chainstack.com)
- [Документація](https://docs.chainstack.com/)
- [Довідник з API Ethereum](https://docs.chainstack.com/reference/ethereum-getting-started)

**Coinbase Cloud Node —** **_API інфраструктури блокчейну._**

- [Coinbase Cloud Node](https://www.coinbase.com/developer-platform)
- [Документація](https://docs.cdp.coinbase.com/)

**DataHub by Figment —** **_сервіси API Web3 з основною мережею Ethereum та тестовими мережами._**

- [DataHub](https://www.figment.io/)
- [Документація](https://docs.figment.io/)

**Moralis —** **_постачальник API EVM корпоративного рівня._**

- [moralis.io](https://moralis.io)
- [Документація](https://docs.moralis.io/)
- [GitHub](https://github.com/MoralisWeb3)
- [Discord](https://moralis.io/joindiscord/)
- [Форум](https://forum.moralis.io/)

**NFTPort —** **_API даних та карбування Ethereum._**

- [nftport.xyz](https://www.nftport.xyz/)
- [Документація](https://docs.nftport.xyz/)
- [GitHub](https://github.com/nftport/)
- [Discord](https://discord.com/invite/K8nNrEgqhE)

**Tokenview —** **_загальна мультикриптовалютна блокчейн-платформа API._**

- [services.tokenview.io](https://services.tokenview.io/)
- [Документація](https://services.tokenview.io/docs?type=api)
- [GitHub](https://github.com/Tokenview)

**Watchdata —** **_надання простого та надійного доступу через API до блокчейну Ethereum._**

- [Watchdata](https://watchdata.io/)
- [Документація](https://docs.watchdata.io/)
- [Discord](https://discord.com/invite/TZRJbZ6bdn)

**Covalent —** **_розширені API блокчейну для понад 200 ланцюжків._**

- [covalenthq.com](https://www.covalenthq.com/)
- [Документація](https://www.covalenthq.com/docs/api/)
- [GitHub](https://github.com/covalenthq)
- [Discord](https://www.covalenthq.com/discord/)

## Для подальшого читання {#further-reading}

_Знайшли ресурс, який допоміг з цією темою? Відредагуйте цю сторінку і додайте його!_

## Пов'язані теми {#related-topics}

- [Вузли та клієнти](/developers/docs/nodes-and-clients/)
- [Фреймворки для розробки](/developers/docs/frameworks/)

## Пов'язані посібники {#related-tutorials}

- [Налаштування Web3.js для використання блокчейну Ethereum у JavaScript](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– інструкції з налаштування Web3.js у вашому проєкті._
- [Виклик смарт-контракту з JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– використання токена DAI, щоб побачити, як викликати функцію контракту за допомогою JavaScript._
