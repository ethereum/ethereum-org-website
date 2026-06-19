---
title: Етеріум для розробників на Rust
description: Дізнайтеся, як розробляти для Етеріуму, використовуючи проєкти та інструменти на базі Rust
lang: uk
incomplete: true
---

<FeaturedText>Дізнайтеся, як розробляти для Етеріуму, використовуючи проєкти та інструменти на базі Rust</FeaturedText>

Використовуйте Етеріум для створення децентралізованих застосунків (dapp), які використовують переваги криптовалюти та технології блокчейн. Ці децентралізовані застосунки можуть бути надійними, тобто після того, як їх розгорнуто в Етеріумі, вони завжди працюватимуть так, як запрограмовано. Вони можуть контролювати цифрові активи для створення нових видів фінансових застосунків. Вони можуть бути децентралізованими, тобто жодна організація чи особа не контролює їх, і їх майже неможливо піддати цензурі.

## Початок роботи зі смарт-контрактами та мовою Solidity {#getting-started-with-smart-contracts-and-solidity}

**Зробіть перші кроки до інтеграції Rust з Етеріумом**

Спочатку потрібен базовий посібник? Перегляньте [ethereum.org/learn](/learn/) або [ethereum.org/developers](/developers/).

- [Пояснення блокчейну](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [Розуміння смарт-контрактів](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [Напишіть свій перший смарт-контракт](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Дізнайтеся, як компілювати та розгортати Solidity](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## Статті для початківців {#beginner-articles}

- [Клієнт Етеріуму на Rust](https://openethereum.github.io/) \* **Зверніть увагу, що OpenEthereum [застарів](https://medium.com/openethereum/gnosis-joins-erigon-formerly-turbo-geth-to-release-next-gen-ethereum-client-c6708dd06dd) і більше не підтримується.** Використовуйте його з обережністю та бажано перейдіть на іншу реалізацію клієнта.
- [Надсилання транзакції в Етеріум за допомогою Rust](https://kauri.io/#collections/A%20Hackathon%20Survival%20Guide/sending-ethereum-transactions-with-rust/)
- [Покроковий посібник із написання контрактів на Rust Wasm для Kovan](https://github.com/paritytech/pwasm-tutorial)

## Статті середнього рівня {#intermediate-articles}

## Розширені шаблони використання {#advanced-use-patterns}

- [Бібліотека pwasm_ethereum externs для взаємодії з мережею, подібною до Етеріуму](https://github.com/openethereum/pwasm-ethereum)
- [Створення децентралізованого чату за допомогою JavaScript та Rust](https://medium.com/perlin-network/build-a-decentralized-chat-using-javascript-rust-webassembly-c775f8484b52)
- [Створення децентралізованого застосунку Todo за допомогою Vue.js та Rust](https://medium.com/@jjmace01/build-a-decentralized-todo-app-using-vue-js-rust-webassembly-5381a1895beb)

- [Створення блокчейну на Rust](https://blog.logrocket.com/how-to-build-a-blockchain-in-rust/)

## Проєкти та інструменти на Rust {#rust-projects-and-tools}

- [pwasm-ethereum](https://github.com/paritytech/pwasm-ethereum) — _Колекція externs для взаємодії з мережею, подібною до Етеріуму_
- [Лайтхаус](https://github.com/sigp/lighthouse) — _Швидкий клієнт рівня консенсусу Етеріуму_
- [Ethereum WebAssembly](https://ewasm.readthedocs.io/en/mkdocs/) — _Запропонований редизайн рівня виконання смарт-контрактів Етеріуму з використанням детермінованої підмножини WebAssembly_
- [oasis_std](https://docs.rs/oasis-std/latest/oasis_std/index.html) — _Довідник з API OASIS_
- [Solaris](https://github.com/paritytech/sol-rs) — _Середовище модульного тестування смарт-контрактів Solidity з використанням нативної EVM клієнта Parity._
- [SputnikVM](https://github.com/rust-blockchain/evm) — _Реалізація віртуальної машини Етеріуму на Rust_
- [Wavelet](https://wavelet.perlin.net/docs/smart-contracts) — _Смарт-контракт Wavelet на Rust_
- [Foundry](https://github.com/foundry-rs/foundry) — _Набір інструментів для розробки застосунків для Етеріуму_
- [Alloy](https://alloy.rs) — _Високопродуктивні, добре протестовані та задокументовані бібліотеки для взаємодії з Етеріумом та іншими мережами на базі EVM._
- [Ethers_rs](https://github.com/gakonst/ethers-rs) — _Бібліотека Етеріуму та реалізація гаманця_
- [SewUp](https://github.com/second-state/SewUp) — _Бібліотека, яка допоможе вам створити контракт WebAssembly для Етеріуму за допомогою Rust, подібно до розробки звичайного бекенду_
- [Substreams](https://github.com/streamingfast/substreams) — _Технологія паралельного індексування даних блокчейну_
- [Рет](https://github.com/paradigmxyz/reth) Рет (скорочення від Rust Ethereum) — це нова реалізація повного вузла Етеріуму
- [Awesome Ethereum Rust](https://github.com/Vid201/awesome-ethereum-rust) — _Кураторська колекція проєктів в екосистемі Етеріуму, написаних на Rust_
- [Stylus](https://github.com/OffchainLabs/stylus) — _SDK на Rust для створення смарт-контрактів на Arbitrum_

Шукаєте більше ресурсів? Перегляньте [ethereum.org/developers.](/developers/)

## Учасники спільноти Rust {#rust-community-contributors}

- [Ethereum WebAssembly](https://gitter.im/ewasm/Lobby)
- [Oasis Gitter](https://gitter.im/Oasis-official/Lobby)
- [Parity Gitter](https://gitter.im/paritytech/parity)
- [Enigma](https://discord.gg/SJK32GY)