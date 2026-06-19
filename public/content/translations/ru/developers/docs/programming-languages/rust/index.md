---
title: Эфириум для разработчиков на Rust
description: Узнайте, как разрабатывать для Эфириума, используя проекты и инструменты на базе Rust
lang: ru
incomplete: true
---

<FeaturedText>Узнайте, как разрабатывать для Эфириума, используя проекты и инструменты на базе Rust</FeaturedText>

Используйте Эфириум для создания децентрализованных приложений (dapp), которые используют преимущества криптовалюты и технологии блокчейн. Эти dapp могут быть надежными, что означает, что после того, как они будут развернуты в Эфириуме, они всегда будут работать так, как запрограммировано. Они могут управлять цифровыми активами для создания новых видов финансовых приложений. Они могут быть децентрализованными, что означает, что ни одна организация или человек не контролирует их, и их практически невозможно подвергнуть цензуре.

## С чего начать работу со смарт-контрактами и языком Solidity {#getting-started-with-smart-contracts-and-solidity}

**Сделайте первые шаги по интеграции Rust с Эфириумом**

Сначала нужно ознакомиться с основами? Посетите [ethereum.org/learn](/learn/) или [ethereum.org/developers](/developers/).

- [Объяснение блокчейна](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [Понимание смарт-контрактов](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [Напишите свой первый смарт-контракт](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Узнайте, как компилировать и развертывать Solidity](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## Статьи для начинающих {#beginner-articles}

- [Клиент Эфириума на Rust](https://openethereum.github.io/) \* **Обратите внимание, что OpenEthereum [устарел](https://medium.com/openethereum/gnosis-joins-erigon-formerly-turbo-geth-to-release-next-gen-ethereum-client-c6708dd06dd) и больше не поддерживается.** Используйте его с осторожностью и по возможности перейдите на другую реализацию клиента.
- [Отправка транзакции в Эфириум с использованием Rust](https://kauri.io/#collections/A%20Hackathon%20Survival%20Guide/sending-ethereum-transactions-with-rust/)
- [Пошаговое руководство по написанию контрактов на Rust Wasm для Kovan](https://github.com/paritytech/pwasm-tutorial)

## Статьи среднего уровня {#intermediate-articles}

## Продвинутые шаблоны использования {#advanced-use-patterns}

- [Библиотека pwasm_ethereum externs для взаимодействия с Ethereum-подобной сетью](https://github.com/openethereum/pwasm-ethereum)
- [Создание децентрализованного чата с использованием JavaScript и Rust](https://medium.com/perlin-network/build-a-decentralized-chat-using-javascript-rust-webassembly-c775f8484b52)
- [Создание децентрализованного приложения Todo с использованием Vue.js и Rust](https://medium.com/@jjmace01/build-a-decentralized-todo-app-using-vue-js-rust-webassembly-5381a1895beb)

- [Создание блокчейна на Rust](https://blog.logrocket.com/how-to-build-a-blockchain-in-rust/)

## Проекты и инструменты на Rust {#rust-projects-and-tools}

- [pwasm-ethereum](https://github.com/paritytech/pwasm-ethereum) — _Коллекция externs для взаимодействия с Ethereum-подобной сетью_
- [Лайтхаус](https://github.com/sigp/lighthouse) — _Быстрый клиент уровня консенсуса Эфириума_
- [Ethereum WebAssembly](https://ewasm.readthedocs.io/en/mkdocs/) — _Предлагаемый редизайн уровня исполнения смарт-контрактов Эфириума с использованием детерминированного подмножества WebAssembly_
- [oasis_std](https://docs.rs/oasis-std/latest/oasis_std/index.html) — _Справочник по API OASIS_
- [Solaris](https://github.com/paritytech/sol-rs) — _Среда модульного тестирования смарт-контрактов Solidity с использованием нативной EVM клиента Parity._
- [SputnikVM](https://github.com/rust-blockchain/evm) — _Реализация виртуальной машины Эфириума на Rust_
- [Wavelet](https://wavelet.perlin.net/docs/smart-contracts) — _Смарт-контракт Wavelet на Rust_
- [Foundry](https://github.com/foundry-rs/foundry) — _Набор инструментов для разработки приложений для Эфириума_
- [Alloy](https://alloy.rs) — _Высокопроизводительные, хорошо протестированные и задокументированные библиотеки для взаимодействия с Эфириумом и другими сетями на базе EVM._
- [Ethers_rs](https://github.com/gakonst/ethers-rs) — _Библиотека Эфириума и реализация кошелька_
- [SewUp](https://github.com/second-state/SewUp) — _Библиотека, которая поможет вам создать контракт WebAssembly для Эфириума на Rust так же просто, как при разработке обычного бэкенда_
- [Substreams](https://github.com/streamingfast/substreams) — _Технология распараллеленного индексирования данных блокчейна_
- [Рет](https://github.com/paradigmxyz/reth) Рет (сокращение от Rust Ethereum) — это новая реализация полного узла Эфириума
- [Awesome Ethereum Rust](https://github.com/Vid201/awesome-ethereum-rust) — _Курируемая коллекция проектов в экосистеме Эфириума, написанных на Rust_
- [Stylus](https://github.com/OffchainLabs/stylus) — _Rust SDK для создания смарт-контрактов на Arbitrum_

Ищете больше ресурсов? Посетите [ethereum.org/developers.](/developers/)

## Участники сообщества Rust {#rust-community-contributors}

- [Ethereum WebAssembly](https://gitter.im/ewasm/Lobby)
- [Oasis Gitter](https://gitter.im/Oasis-official/Lobby)
- [Parity Gitter](https://gitter.im/paritytech/parity)
- [Enigma](https://discord.gg/SJK32GY)