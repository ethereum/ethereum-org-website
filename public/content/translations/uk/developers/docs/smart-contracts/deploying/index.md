---
title: "Розгортання смарт-контрактів"
description: "Дізнайтеся, як розгортати смарт-контракти в мережах Етеріуму, включно з передумовами, інструментами та кроками розгортання."
lang: uk
---

Вам потрібно розгорнути свій смарт-контракт, щоб він став доступним для користувачів мережі Етеріум.

Щоб розгорнути смарт-контракт, вам достатньо надіслати транзакцію Етеріуму, яка містить скомпільований код смарт-контракту, не вказуючи жодного одержувача.

## Передумови {#prerequisites}

Ви повинні розуміти [мережі Етеріум](/developers/docs/networks/), [транзакції](/developers/docs/transactions/) та [анатомію смарт-контрактів](/developers/docs/smart-contracts/anatomy/) перед розгортанням смарт-контрактів.

Розгортання контракту також коштує етер (ETH), оскільки вони зберігаються в блокчейні, тому вам слід ознайомитися з [газом та комісіями](/developers/docs/gas/) в Етеріумі.

Нарешті, вам потрібно буде скомпілювати свій контракт перед його розгортанням, тому переконайтеся, що ви прочитали про [компіляцію смарт-контрактів](/developers/docs/smart-contracts/compiling/).

## Як розгорнути смарт-контракт {#how-to-deploy-a-smart-contract}

### Що вам знадобиться {#what-youll-need}

- Байт-код вашого контракту — він генерується через [компіляцію](/developers/docs/smart-contracts/compiling/)
- ETH для газу — ви встановлюватимете ліміт газу, як і для інших транзакцій, тому майте на увазі, що розгортання контракту потребує набагато більше газу, ніж звичайний переказ ETH
- скрипт або плагін для розгортання
- доступ до [вузла Етеріуму](/developers/docs/nodes-and-clients/), запустивши власний, підключившись до публічного вузла або за допомогою ключа API через [сервіс вузлів](/developers/docs/nodes-and-clients/nodes-as-a-service/)

### Кроки для розгортання смарт-контракту {#steps-to-deploy}

Конкретні кроки залежатимуть від обраного фреймворку для розробки. Наприклад, ви можете переглянути [документацію Hardhat щодо розгортання ваших контрактів](https://hardhat.org/docs/tutorial/deploying) або [документацію Foundry щодо розгортання та верифікації смарт-контракту](https://book.getfoundry.sh/forge/deploying). Після розгортання ваш контракт матиме адресу Етеріуму, як і інші [акаунти](/developers/docs/accounts/), і його можна буде верифікувати за допомогою [інструментів верифікації вихідного коду](/developers/docs/smart-contracts/verifying/#source-code-verification-tools).

## Пов'язані інструменти {#related-tools}

**Remix — _Remix IDE дозволяє розробляти, розгортати та адмініструвати смарт-контракти для блокчейнів, подібних до Етеріуму_**

- [Remix](https://remix.ethereum.org)

**Tenderly — _Платформа для розробки Web3, яка забезпечує налагодження, спостережливість та інфраструктурні будівельні блоки для розробки, тестування, моніторингу та експлуатації смарт-контрактів_**

- [tenderly.co](https://tenderly.co/)
- [Документація](https://docs.tenderly.co/)
- [GitHub](https://github.com/Tenderly)
- [Discord](https://discord.gg/eCWjuvt)

**Hardhat — _Середовище розробки для компіляції, розгортання, тестування та налагодження вашого програмного забезпечення для Етеріуму_**

- [hardhat.org](https://hardhat.org/getting-started/)
- [Документація щодо розгортання ваших контрактів](https://hardhat.org/docs/tutorial/deploying)
- [GitHub](https://github.com/nomiclabs/hardhat)
- [Discord](https://discord.com/invite/TETZs2KK4k)

**thirdweb — _Легко розгортайте будь-який контракт у будь-який EVM-сумісний ланцюг за допомогою однієї команди_**

- [Документація](https://portal.thirdweb.com/deploy/)

**Crossmint — _Платформа для розробки Web3 корпоративного рівня для розгортання смарт-контрактів, увімкнення платежів кредитними картками та кросчейн-платежів, а також використання API для створення, розповсюдження, продажу, зберігання та редагування NFT._**

- [crossmint.com](https://www.crossmint.com)
- [Документація](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)
- [Блог](https://blog.crossmint.com)

## Пов'язані посібники {#related-tutorials}

- [Розгортання вашого першого смарт-контракту](/developers/tutorials/deploying-your-first-smart-contract/) _— Вступ до розгортання вашого першого смарт-контракту в тестовій мережі Етеріуму._
- [Hello World | посібник зі смарт-контрактів](/developers/tutorials/hello-world-smart-contract/) _— Простий посібник зі створення та розгортання базового смарт-контракту в Етеріумі._
- [Взаємодія з іншими контрактами з Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/) _— Як розгорнути смарт-контракт з існуючого контракту та взаємодіяти з ним._
- [Як зменшити розмір вашого контракту](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _— Як зменшити розмір вашого контракту, щоб не перевищувати ліміт і заощадити на газі_

## Додаткові матеріали {#further-reading}

- [https://docs.openzeppelin.com/learn/deploying-and-interacting](https://docs.openzeppelin.com/learn/deploying-and-interacting) — _ОупенЗеппелін_
- [Розгортання ваших контрактів за допомогою Hardhat](https://hardhat.org/docs/tutorial/deploying) — _Nomic Labs_

_Знаєте ресурс спільноти, який вам допоміг? Відредагуйте цю сторінку та додайте його!_

## Пов'язані теми {#related-topics}

- [Фреймворки для розробки](/developers/docs/frameworks/)
- [Запуск вузла Етеріуму](/developers/docs/nodes-and-clients/run-a-node/)
- [Вузли як послуга](/developers/docs/nodes-and-clients/nodes-as-a-service)