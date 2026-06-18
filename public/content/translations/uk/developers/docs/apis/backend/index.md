---
title: Бібліотеки бекенд-API
description: Вступ до API клієнтів Етеріуму, які дозволяють взаємодіяти з блокчейном із вашого застосунку.
lang: uk
---

Щоб програмний застосунок міг взаємодіяти з блокчейном [Етеріуму](/) (тобто читати дані блокчейну та/або надсилати транзакції в мережу), він має підключитися до вузла Етеріуму.

Для цього кожен клієнт Етеріуму реалізує специфікацію [JSON-RPC](/developers/docs/apis/json-rpc/), тому існує єдиний набір [методів](/developers/docs/apis/json-rpc/#json-rpc-methods), на які можуть покладатися застосунки.

Якщо ви хочете використовувати певну мову програмування для підключення до вузла Етеріуму, в екосистемі є багато зручних бібліотек, які значно спрощують цей процес. За допомогою цих бібліотек розробники можуть писати інтуїтивно зрозумілі однорядкові методи для ініціалізації запитів JSON-RPC (внутрішньо), які взаємодіють з Етеріумом.

## Передумови {#prerequisites}

Може бути корисно зрозуміти [стек Етеріуму](/developers/docs/ethereum-stack/) та [клієнти Етеріуму](/developers/docs/nodes-and-clients/).

## Навіщо використовувати бібліотеку? {#why-use-a-library}

Ці бібліотеки абстрагують значну частину складності прямої взаємодії з вузлом Етеріуму. Вони також надають допоміжні функції (наприклад, конвертацію ETH у Gwei), щоб ви як розробник могли витрачати менше часу на тонкощі клієнтів Етеріуму і більше часу зосереджуватися на унікальній функціональності вашого застосунку.

## Доступні бібліотеки {#available-libraries}

### Інфраструктура та сервіси вузлів {#infrastructure-and-node-services}

**Alchemy —** **_Платформа для розробки на Етеріумі._**

- [alchemy.com](https://www.alchemy.com/)
- [Документація](https://www.alchemy.com/docs/)
- [GitHub](https://github.com/alchemyplatform)
- [Discord](https://discord.com/invite/alchemyplatform)
  
**All That Node —** **_Вузол як послуга (Node-as-a-Service)._**

- [All That Node.com](https://www.allthatnode.com/)
- [Документація](https://docs.allthatnode.com)
- [Discord](https://discord.gg/GmcdVEUbJM)

**Blast від Bware Labs —** **_Децентралізовані API для головної мережі Ethereum та тестових мереж._**

- [blastapi.io](https://blastapi.io/)
- [Документація](https://docs.blastapi.io)
- [Discord](https://discord.gg/SaRqmRUjjQ)

**BlockPi —** **_Надає більш ефективні та швидкі сервіси RPC_**

- [blockpi.io](https://blockpi.io/)
- [Документація](https://docs.blockpi.io/)
- [GitHub](https://github.com/BlockPILabs)
- [Discord](https://discord.com/invite/xTvGVrGVZv)

**Cloudflare Ethereum Gateway.**

- [cloudflare-eth.com](https://www.cloudflare.com/application-services/products/web3/)

**Etherscan — Оглядач блоків та API транзакцій**
- [Документація](https://docs.etherscan.io/)

**Blockscout — Оглядач блоків з відкритим вихідним кодом**
- [Документація](https://docs.blockscout.com/)

**GetBlock —** **_Блокчейн як послуга (Blockchain-as-a-service) для розробки Web3_**

- [GetBlock.io](https://getblock.io/)
- [Документація](https://docs.getblock.io/)

**Infura —** **_API Етеріуму як послуга._**

- [infura.io](https://infura.io)
- [Документація](https://docs.infura.io/api)
- [GitHub](https://github.com/INFURA)

**Node RPC — _Економічно вигідний провайдер EVM JSON-RPC_**

- [noderpc.xyz](https://www.noderpc.xyz/)
- [Документація](https://docs.noderpc.xyz/node-rpc)

**NOWNodes — _Повні вузли та оглядачі блоків._**

- [NOWNodes.io](https://nownodes.io/)
- [Документація](https://nownodes.gitbook.io/documentation)

**QuickNode —** **_Блокчейн-інфраструктура як послуга._**

- [quicknode.com](https://quicknode.com)
- [Документація](https://www.quicknode.com/docs/welcome)
- [Discord](https://discord.gg/quicknode)

**Rivet —** **_API Етеріуму та Етеріум Класик як послуга на базі програмного забезпечення з відкритим вихідним кодом._**

- [rivet.cloud](https://rivet.cloud)
- [Документація](https://rivet.cloud/docs/)
- [GitHub](https://github.com/openrelayxyz/ethercattle-deployment)

**Zmok —** **_Орієнтовані на швидкість вузли Етеріуму як API JSON-RPC/WebSockets._**

- [zmok.io](https://zmok.io/)
- [GitHub](https://github.com/zmok-io)
- [Документація](https://docs.zmok.io/)
- [Discord](https://discord.gg/fAHeh3ka6s)

### Інструменти розробки {#development-tools}

**ethers-kt —** **_Асинхронна, високопродуктивна бібліотека Kotlin/Java/Android для блокчейнів на базі EVM._**

- [GitHub](https://github.com/Kr1ptal/ethers-kt)
- [Приклади](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [Discord](https://discord.gg/rx35NzQGSb)

**Nethereum —** **_Бібліотека інтеграції .NET з відкритим вихідним кодом для блокчейну._**

- [GitHub](https://github.com/Nethereum/Nethereum)
- [Документація](https://docs.nethereum.com/docs/getting-started/welcome/)
- [Discord](https://discord.com/invite/jQPrR58FxX)

**Інструменти Python —** **_Різноманітні бібліотеки для взаємодії з Етеріумом через Python._**

- [py.ethereum.org](https://snakecharmers.ethereum.org/)
- [GitHub Web3.py](https://github.com/ethereum/web3.py)
- [Чат Web3.py](https://gitter.im/ethereum/web3.py)

**Tatum —** **_Універсальна платформа для розробки на блокчейні._**

- [Tatum](https://tatum.io/)
- [GitHub](https://github.com/tatumio/)
- [Документація](https://docs.tatum.io/)
- [Discord](https://discord.gg/EDmW3kjTC9)

**Web3j —** **_Бібліотека інтеграції Java/Android/Kotlin/Scala для Етеріуму._**

- [GitHub](https://github.com/web3j/web3j)
- [Документація](https://docs.web3j.io/)
- [Gitter](https://gitter.im/web3j/web3j)

### Блокчейн-сервіси {#blockchain-services}

**BlockCypher —** **_Веб-API Етеріуму._**

- [blockcypher.com](https://www.blockcypher.com/)
- [Документація](https://www.blockcypher.com/dev/ethereum/)

**Chainbase —** **_Універсальна інфраструктура даних Web3 для Етеріуму._**

- [chainbase.com](https://chainbase.com/)
- [Документація](https://docs.chainbase.com/)
- [Discord](https://discord.gg/Wx6qpqz4AF)

**Chainstack —** **_Еластичні та виділені вузли Етеріуму як послуга._**

- [chainstack.com](https://chainstack.com)
- [Документація](https://docs.chainstack.com/)
- [Довідник з API Етеріуму](https://docs.chainstack.com/reference/ethereum-getting-started)

**Coinbase Cloud Node —** **_API блокчейн-інфраструктури._**

- [Coinbase Cloud Node](https://www.coinbase.com/developer-platform)
- [Документація](https://docs.cdp.coinbase.com/)

**DataHub від Figment —** **_Сервіси API Web3 з головною мережею Ethereum та тестовими мережами._**

- [DataHub](https://www.figment.io/)
- [Документація](https://docs.figment.io/)

**Moralis —** **_Провайдер EVM API корпоративного рівня._**

- [moralis.io](https://moralis.io)
- [Документація](https://docs.moralis.io/)
- [GitHub](https://github.com/MoralisWeb3)
- [Discord](https://moralis.io/joindiscord/)
- [Форум](https://forum.moralis.io/)

**NFTPort —** **_API даних Етеріуму та карбування._**

- [nftport.xyz](https://www.nftport.xyz/)
- [Документація](https://docs.nftport.xyz/)
- [GitHub](https://github.com/nftport/)
- [Discord](https://discord.com/invite/K8nNrEgqhE)

**Tokenview —** **_Загальна платформа блокчейн-API для багатьох крипто._**

- [services.tokenview.io](https://services.tokenview.io/)
- [Документація](https://services.tokenview.io/docs?type=api)
- [GitHub](https://github.com/Tokenview)

**Watchdata —** **_Надає простий та надійний доступ до API блокчейну Етеріуму._**

- [Watchdata](https://watchdata.io/)
- [Документація](https://docs.watchdata.io/)
- [Discord](https://discord.com/invite/TZRJbZ6bdn)

**Codex —** **_API збагачених даних блокчейну в реальному часі для десятків мереж._**

- [codex.io](https://www.codex.io/)
- [Документація](https://docs.codex.io)
- [Оглядач](https://docs.codex.io/explore)
- [GitHub](https://github.com/Codex-Data)
- [Discord](https://discord.com/invite/mFpUhT3vAq)

**Covalent —** **_Збагачені блокчейн-API для понад 200 мереж._**

- [covalenthq.com](https://www.covalenthq.com/)
- [Документація](https://www.covalenthq.com/docs/api/)
- [GitHub](https://github.com/covalenthq)
- [Discord](https://www.covalenthq.com/discord/)


## Додаткова література {#further-reading}

_Знаєте ресурс спільноти, який вам допоміг? Відредагуйте цю сторінку та додайте його!_

## Пов'язані теми {#related-topics}

- [Вузли та клієнти](/developers/docs/nodes-and-clients/)
- [Фреймворки для розробки](/developers/docs/frameworks/)

## Пов'язані посібники {#related-tutorials}

- [Налаштування Web3.js для використання блокчейну Етеріуму в JavaScript](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _— Інструкції з налаштування Web3.js у вашому проєкті._
- [Виклик смарт-контракту з JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/) _— На прикладі токена DAI дізнайтеся, як викликати функцію контракту за допомогою JavaScript._