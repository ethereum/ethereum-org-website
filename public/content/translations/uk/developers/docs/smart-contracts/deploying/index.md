---
title: Упровадження розумних контрактів
description: Дізнайтеся, як розгортати смарт-контракти у мережах Ethereum, включно з необхідними умовами, інструментами та етапами розгортання.
lang: uk
---

Вам потрібно розгорнути розумний контракт для того, щоб він був доступний користувачам мережі Ethereum.

Для розгортання розумного контракту, Ви просто відправляєте транзакцію Ethereum, що містить упорядкований код розумного контракту, не вказуючи жодного одержувача.

## Передумови {#prerequisites}

Перед розгортанням смарт-контрактів вам слід розібратися з [мережами Ethereum](/developers/docs/networks/), [транзакціями](/developers/docs/transactions/) й [анатомією смарт-контрактів](/developers/docs/smart-contracts/anatomy/).

Розгортання контракту також коштує ether (ETH), оскільки він зберігається в блокчейні, тому ви маєте бути знайомі з [газом і комісіями](/developers/docs/gas/) в Ethereum.

Нарешті, вам потрібно буде скомпілювати свій контракт перед його розгортанням, тому переконайтеся, що ви прочитали про [компіляцію смарт-контрактів](/developers/docs/smart-contracts/compiling/).

## Як розгорнути смарт-контракт {#how-to-deploy-a-smart-contract}

### Що вам знадобиться {#what-youll-need}

- Байт-код вашого контракту — він генерується шляхом [компіляції](/developers/docs/smart-contracts/compiling/)
- ETH для грошових одиниць - ви встановите обмеження на суми, як і інші операції, тому будете повідомлені, що для завантаження контракту потрібно набагато більше одиниць, ніж для простого ETH переказу
- сценарій завантаження чи підключення
- Доступ до [вузла Ethereum](/developers/docs/nodes-and-clients/), запустивши власний вузол, підключившись до загальнодоступного вузла або через ключ API за допомогою [сервісу вузлів](/developers/docs/nodes-and-clients/nodes-as-a-service/)

### Етапи розгортання смарт-контракту {#steps-to-deploy}

Конкретні кроки залежатимуть від відповідної інфраструктури розробки. Наприклад, ви можете переглянути [документацію Hardhat щодо розгортання ваших контрактів](https://hardhat.org/docs/tutorial/deploying) або [документацію Foundry щодо розгортання та верифікації смарт-контракту](https://book.getfoundry.sh/forge/deploying). Після розгортання ваш контракт матиме адресу Ethereum, як і інші [облікові записи](/developers/docs/accounts/), і може бути верифікований за допомогою [інструментів верифікації вихідного коду](/developers/docs/smart-contracts/verifying/#source-code-verification-tools).

## Пов’язані інструменти {#related-tools}

**Remix — _Remix IDE дозволяє розробляти, розгортати й адмініструвати смарт-контракти для блокчейнів, подібних до Ethereum_**

- [Remix](https://remix.ethereum.org)

**Tenderly — _платформа для розробки Web3, що надає засоби для налагодження, спостереження та інфраструктурні будівельні блоки для розробки, тестування, моніторингу та експлуатації смарт-контрактів_**

- [tenderly.co](https://tenderly.co/)
- [Документація](https://docs.tenderly.co/)
- [GitHub](https://github.com/Tenderly)
- [Discord](https://discord.gg/eCWjuvt)

**Hardhat — _середовище розробки для компіляції, розгортання, тестування та налагодження вашого програмного забезпечення Ethereum_**

- [hardhat.org](https://hardhat.org/getting-started/)
- [Документація з розгортання ваших контрактів](https://hardhat.org/docs/tutorial/deploying)
- [GitHub](https://github.com/nomiclabs/hardhat)
- [Discord](https://discord.com/invite/TETZs2KK4k)

**thirdweb — _легко розгортайте будь-який контракт у будь-якому ланцюжку, сумісному з EVM, за допомогою однієї команди_**

- [Документація](https://portal.thirdweb.com/deploy/)

**Crossmint — _платформа розробки Web3 корпоративного рівня для розгортання смарт-контрактів, забезпечення платежів кредитними картками та міжланцюжкових платежів, а також використання API для створення, розповсюдження, продажу, зберігання та редагування NFT._**

- [crossmint.com](https://www.crossmint.com)
- [Документація](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)
- [Блог](https://blog.crossmint.com)

## Пов'язані посібники {#related-tutorials}

- [Розгортання вашого першого смарт-контракту](/developers/tutorials/deploying-your-first-smart-contract/) _– вступ до розгортання вашого першого смарт-контракту в тестовій мережі Ethereum._
- [Привіт, світе | посібник зі смарт-контрактів](/developers/tutorials/hello-world-smart-contract/) _– простий посібник зі створення та розгортання базового смарт-контракту в Ethereum._
- [Взаємодія з іншими контрактами з Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– Як розгорнути смарт-контракт з існуючого контракту та взаємодіяти з ним._
- [Як зменшити розмір вашого контракту](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _— як зменшити розмір контракту, щоб не перевищувати ліміт і заощадити на газі_

## Для подальшого читання {#further-reading}

- [https://docs.openzeppelin.com/learn/deploying-and-interacting](https://docs.openzeppelin.com/learn/deploying-and-interacting) — _OpenZeppelin_
- [Розгортання ваших контрактів за допомогою Hardhat](https://hardhat.org/docs/tutorial/deploying) — _Nomic Labs_

_Знайшли ресурс, який допоміг з цією темою? Відредагуйте цю сторінку і додайте його!_

## Пов'язані теми {#related-topics}

- [Фреймворки для розробки](/developers/docs/frameworks/)
- [Запустити вузол Ethereum](/developers/docs/nodes-and-clients/run-a-node/)
- [Вузли як послуга](/developers/docs/nodes-and-clients/nodes-as-a-service)
