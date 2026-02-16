---
title: "Ethereum для розробників мовою Rust"
description: "Дізнайтеся, як розробляти для Ethereum за допомогою проектів та інструментів на основі Rust"
lang: uk
incomplete: true
---

<FeaturedText>Дізнайтеся, як розробляти для Ethereum за допомогою проєктів та інструментів на основі Rust</FeaturedText>

Використовуйте Ethereum для створення децентралізованих програм, що користуються перевагами криптовалюти й технології блокчейну. Ці децентралізовані програми можуть бути надійними, а це означає, що як тільки їх буде запущено в Ethereum, вони завжди працюватимуть так, як їх запрограмовано. Вони можуть контролювати цифрові активи, що допомагає створювати нові види фінансових програм. Ці програми децентралізовані, а це означає, що ними не керують організації або фізичні особи. Крім того, їх майже неможливо піддати цензурі.

## Початок роботи зі смарт-контрактами та мовою Solidity {#getting-started-with-smart-contracts-and-solidity}

**Зробіть свої перші кроки до інтеграції Rust із Ethereum**

Потрібен простий приклад для початку? Перегляньте [ethereum.org/learn](/learn/) або [ethereum.org/developers](/developers/).

- [Пояснення блокчейну](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [Розуміння смарт-контрактів](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [Напишіть свій перший смарт-контракт](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Дізнайтеся, як компілювати та розгортати Solidity](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## Статті для початківців {#beginner-articles}

- [Клієнт Rust для Ethereum](https://openethereum.github.io/) \* **Примітка: OpenEthereum [визнано застарілим](https://medium.com/openethereum/gnosis-joins-erigon-formerly-turbo-geth-to-release-next-gen-ethereum-client-c6708dd06dd) і він більше не підтримується.** Користуйтеся ним з обережністю та бажано перейдіть на іншу реалізацію клієнта.
- [Надсилання транзакцій в Ethereum за допомогою Rust](https://kauri.io/#collections/A%20Hackathon%20Survival%20Guide/sending-ethereum-transactions-with-rust/)
- [Покроковий посібник з написання контрактів на Rust Wasm для Kovan](https://github.com/paritytech/pwasm-tutorial)

## Статті для середнього рівня {#intermediate-articles}

## Розширені шаблони використання {#advanced-use-patterns}

- [Бібліотека pwasm_ethereum externs для взаємодії з мережею, подібною до Ethereum](https://github.com/openethereum/pwasm-ethereum)

- [Створення децентралізованого чату за допомогою JavaScript та Rust](https://medium.com/perlin-network/build-a-decentralized-chat-using-javascript-rust-webassembly-c775f8484b52)

- [Створення децентралізованого застосунку зі списком справ за допомогою Vue.js & Rust](https://medium.com/@jjmace01/build-a-decentralized-todo-app-using-vue-js-rust-webassembly-5381a1895beb)

- [Створення блокчейну на Rust](https://blog.logrocket.com/how-to-build-a-blockchain-in-rust/)

## Проєкти та інструменти на Rust {#rust-projects-and-tools}

- [pwasm-ethereum](https://github.com/paritytech/pwasm-ethereum) - _Колекція зовнішніх бібліотек для взаємодії з мережею, подібною до Ethereum_
- [Lighthouse](https://github.com/sigp/lighthouse) - _Швидкий клієнт рівня консенсусу Ethereum_
- [Ethereum WebAssembly](https://ewasm.readthedocs.io/en/mkdocs/) - _Запропонована перебудова рівня виконання смарт-контрактів Ethereum з використанням детермінованої підмножини WebAssembly_
- [oasis_std](https://docs.rs/oasis-std/latest/oasis_std/index.html) - _Довідник з API OASIS_
- [Solaris](https://github.com/paritytech/sol-rs) - _Середовище для модульного тестування смарт-контрактів Solidity з використанням нативного EVM-клієнта Parity._
- [SputnikVM](https://github.com/rust-blockchain/evm) - _Реалізація віртуальної машини Ethereum на Rust_
- [Wavelet](https://wavelet.perlin.net/docs/smart-contracts) - _Смарт-контракт Wavelet на Rust_
- [Foundry](https://github.com/foundry-rs/foundry) - _Набір інструментів для розробки застосунків Ethereum_
- [Alloy](https://alloy.rs) - _Високопродуктивні, добре протестовані та задокументовані бібліотеки для взаємодії з Ethereum та іншими ланцюжками на основі EVM._
- [Ethers_rs](https://github.com/gakonst/ethers-rs) - _Бібліотека Ethereum та реалізація гаманця_
- [SewUp](https://github.com/second-state/SewUp) - _Бібліотека, яка допоможе вам створювати контракти WebAssembly для Ethereum за допомогою Rust, так само як і розробляти звичайний бекенд_
- [Substreams](https://github.com/streamingfast/substreams) - _Технологія паралельного індексування даних блокчейну_
- [Reth](https://github.com/paradigmxyz/reth) Reth (скорочено від Rust Ethereum) — це нова реалізація повного вузла Ethereum
- [Awesome Ethereum Rust](https://github.com/Vid201/awesome-ethereum-rust) - _Підібрана колекція проєктів в екосистемі Ethereum, написаних на Rust_

Шукаєте більше ресурсів? Перегляньте [ethereum.org/developers.](/developers/)

## Учасники спільноти Rust {#rust-community-contributors}

- [Ethereum WebAssembly](https://gitter.im/ewasm/Lobby)
- [Oasis Gitter](https://gitter.im/Oasis-official/Lobby)
- [Parity Gitter](https://gitter.im/paritytech/parity)
- [Enigma](https://discord.gg/SJK32GY)
