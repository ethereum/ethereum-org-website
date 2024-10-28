---
title: 面向 Rust 开发者的以太坊
description: 学习如何使用并通过基于 rust 的项目及工具参与以太坊的开发
lang: zh
incomplete: true
---

<FeaturedText>学习如何通过基于 Rust 的项目和工具参与以太坊的开发</FeaturedText>

使用以太坊来创建去中心化应用程序（或称“dapp”），发挥加密货币和区块链技术的优势。 这些 dapp 可以是值得信赖的，也即一旦被部署到以太坊上，它们将总是按程序运行。 这些应用程序可以控制数字资产，以便创造新的金融应用； 它们可以是去中心化的，也即没有任何单一实体或个人能够控制它们，而且它们几乎是不可能被审查的。

## 智能合约和 Solidity 语言入门 {#getting-started-with-smart-contracts-and-solidity}

**迈出第一步，将 Rust 与以太坊进行集成**

需要更基础的入门知识？ 请查看 [ethereum.org/learn](/learn/) 或者 [ethereum.org/developers](/developers/)。

- [区块链详解](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [理解智能合约](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [编写你的第一个智能合约](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [学习如何编写和部署 Solidity](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## 初学者文章 {#beginner-articles}

- [Rust 以太坊客户端](https://openethereum.github.io/) \* **注意 OpenEthereum [已被废弃](https://medium.com/openethereum/gnosis-joins-erigon-formerly-turbo-geth-to-release-next-gen-ethereum-client-c6708dd06dd)并已停止维护。** 请谨慎使用，最好切换至其他客户端实现。
- [使用 Rust 向以太坊发送交易](https://kauri.io/#collections/A%20Hackathon%20Survival%20Guide/sending-ethereum-transactions-with-rust/)
- [如何用 Rust Wasm 为 Kovan 编写合约的分步教程](https://github.com/paritytech/pwasm-tutorial)

## 面向中等程度用户的文章 {#intermediate-articles}

## 面向高等程度用户的使用模式 {#advanced-use-patterns}

- [pwasm_ethereum 外部库与类以太坊网络交互](https://github.com/openethereum/pwasm-ethereum)
- [使用 JavaScript 和 Rust 搭建去中心化聊天室](https://medium.com/perlin-network/build-a-decentralized-chat-using-javascript-rust-webassembly-c775f8484b52)
- [使用 Vue.js 和 Rust 构建一个去中心化待办事项应用程序](https://medium.com/@jjmace01/build-a-decentralized-todo-app-using-vue-js-rust-webassembly-5381a1895beb)

- [使用 Rust 构建区块链](https://blog.logrocket.com/how-to-build-a-blockchain-in-rust/)

## Rust 项目和工具 {#rust-projects-and-tools}

- [pwasm-ethereum](https://github.com/paritytech/pwasm-ethereum) - _与类似以太坊的网络交互的外部帐户集合_
- [Lighthouse](https://github.com/sigp/lighthouse) - _以太坊快速共识层客户端_
- [ Ethereum WebAssembly](https://ewasm.readthedocs.io/en/mkdocs/) - _使用 WebAssembly 的确定性子集对以太坊智能合约执行层建议的重新设计_
- [oasis_std](https://docs.rs/oasis-std/latest/oasis_std/index.html) - _OASIS 应用程序接口参考_
- [Solaris](https://github.com/paritytech/sol-rs) - _使用本机 Parity 客户端以太坊虚拟机的 Solidity 智能合约单元测试工具。_
- [SputnikVM](https://github.com/rust-blockchain/evm) - _以太坊虚拟机的 Rust 实现_
- [Wavelet](https://wavelet.perlin.net/docs/smart-contracts) - _Rust 语言的 Wavelet 智能合约_
- [Foundry](https://github.com/foundry-rs/foundry) - _以太坊应用程序开发工具包_
- [Alloy](https://alloy.rs) - _高性能、严格测试且文档完备的程序库，用于与以太坊和其他基于以太坊虚拟机的链交互。_
- [Ethers_rs](https://github.com/gakonst/ethers-rs) - _以太坊库和钱包的实现_
- [SewUp](https://github.com/second-state/SewUp) - _一个帮助用户用 Rust 语言构建以太坊 Webassembly 合约的库，正如在公共后端中开发一样_
- [Substreams](https://github.com/streamingfast/substreams) - _并行化区块链数据索引技术_
- [Reth](https://github.com/paradigmxyz/reth) - Reth 即 Rust 以太坊的简称，是新的以太坊全节点实现
- [Awesome Ethereum Rust](https://github.com/Vid201/awesome-ethereum-rust) - _ 以太坊生态系统中用 Rust 编写的项目精选集合_

想要获取更多的资源？ 请查看 [ethereum.org/developers](/developers/)。

## Rust 社区贡献者 {#rust-community-contributors}

- [Ethereum WebAssembly](https://gitter.im/ewasm/Lobby)
- [Oasis Gitter](https://gitter.im/Oasis-official/Lobby)
- [Parity Gitter](https://gitter.im/paritytech/parity)
- [Enigma](https://discord.gg/SJK32GY)
