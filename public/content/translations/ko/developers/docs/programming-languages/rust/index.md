---
title: "Rust 개발자를 위한 이더리움"
description: "Rust 기반 프로젝트 및 도구를 사용하여 이더리움용으로 개발하는 방법을 알아보세요."
lang: ko
incomplete: true
---

<FeaturedText>Rust 기반 프로젝트 및 도구를 사용하여 이더리움용으로 개발하는 방법을 알아보세요.</FeaturedText>

이더리움을 사용하여 암호화폐와 블록체인 기술의 이점을 활용하는 탈중앙화 애플리케이션 (dapp)을 만들어보세요. 이러한 dapp은 신뢰할 수 있으며, 이는 이더리움에 배포된 후에는 항상 프로그래밍된 대로 실행됨을 의미합니다. 디지털 자산을 제어하여 새로운 종류의 금융 애플리케이션을 만들 수 있습니다. 또한 탈중앙화되어 있어 단일 주체나 개인이 제어할 수 없으며 검열이 거의 불가능합니다.

## 스마트 컨트랙트 및 Solidity 언어 시작하기 {#getting-started-with-smart-contracts-and-solidity}

**Rust를 이더리움과 통합하기 위한 첫걸음을 내디뎌보세요**

더 기본적인 입문서가 먼저 필요하신가요? [ethereum.org/learn](/learn/) 또는 [ethereum.org/developers](/developers/)를 확인해 보세요.

- [블록체인 설명](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [스마트 컨트랙트 이해하기](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [첫 번째 스마트 컨트랙트 작성하기](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Solidity 컴파일 및 배포 방법 알아보기](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## 초급자용 문서 {#beginner-articles}

- [Rust 이더리움 클라이언트](https://openethereum.github.io/) \* **OpenEthereum은 [더 이상 사용되지 않으며](https://medium.com/openethereum/gnosis-joins-erigon-formerly-turbo-geth-to-release-next-gen-ethereum-client-c6708dd06dd) 유지 관리되지 않습니다.** 주의해서 사용하고 가급적 다른 클라이언트 구현으로 전환하세요.
- [Rust를 사용하여 이더리움으로 트랜잭션 전송하기](https://kauri.io/#collections/A%20Hackathon%20Survival%20Guide/sending-ethereum-transactions-with-rust/)
- [Kovan을 위해 Rust Wasm으로 컨트랙트를 작성하는 방법에 대한 단계별 튜토리얼](https://github.com/paritytech/pwasm-tutorial)

## 중급자용 문서 {#intermediate-articles}

## 고급 사용 패턴 {#advanced-use-patterns}

- [이더리움과 유사한 네트워크와 상호 작용하기 위한 pwasm_ethereum externs 라이브러리](https://github.com/openethereum/pwasm-ethereum)
- [JavaScript 및 Rust를 사용하여 탈중앙화 채팅 앱 구축하기](https://medium.com/perlin-network/build-a-decentralized-chat-using-javascript-rust-webassembly-c775f8484b52)
- [Vue.js 및 Rust를 사용하여 탈중앙화 할 일(Todo) 앱 구축하기](https://medium.com/@jjmace01/build-a-decentralized-todo-app-using-vue-js-rust-webassembly-5381a1895beb)

- [Rust로 블록체인 구축하기](https://blog.logrocket.com/how-to-build-a-blockchain-in-rust/)

## Rust 프로젝트 및 도구 {#rust-projects-and-tools}

- [pwasm-ethereum](https://github.com/paritytech/pwasm-ethereum) - _이더리움과 유사한 네트워크와 상호 작용하기 위한 externs 모음_
- [라이트하우스](https://github.com/sigp/lighthouse) - _빠른 이더리움 합의 레이어 클라이언트_
- [이더리움 WebAssembly](https://ewasm.readthedocs.io/en/mkdocs/) - _결정론적 WebAssembly 하위 집합을 사용한 이더리움 스마트 컨트랙트 실행 계층의 재설계 제안_
- [oasis_std](https://docs.rs/oasis-std/latest/oasis_std/index.html) - _OASIS API 참조_
- [Solaris](https://github.com/paritytech/sol-rs) - _네이티브 Parity 클라이언트 EVM을 사용하는 Solidity 스마트 컨트랙트 단위 테스트 하네스._
- [SputnikVM](https://github.com/rust-blockchain/evm) - _Rust 이더리움 가상 머신 구현_
- [Wavelet](https://github.com/perlin-network/smart-contract-rs) - _Rust로 작성된 Wavelet 스마트 컨트랙트_
- [Foundry](https://github.com/foundry-rs/foundry) - _이더리움 애플리케이션 개발을 위한 툴킷_
- [Alloy](https://alloy.rs) - _이더리움 및 기타 EVM 기반 체인과 상호 작용하기 위한 고성능의 잘 테스트되고 문서화된 라이브러리._
- [Ethers_rs](https://github.com/gakonst/ethers-rs) - _이더리움 라이브러리 및 지갑 구현_
- [SewUp](https://github.com/second-state/SewUp) - _일반적인 백엔드에서 개발하는 것처럼 Rust로 이더리움 WebAssembly 컨트랙트를 구축할 수 있도록 돕는 라이브러리_
- [Substreams](https://github.com/streamingfast/substreams) - _병렬화된 블록체인 데이터 인덱싱 기술_
- [레스](https://github.com/paradigmxyz/reth) 레스(Rust Ethereum의 약자)는 새로운 이더리움 풀 노드 구현입니다.
- [Awesome Ethereum Rust](https://github.com/Vid201/awesome-ethereum-rust) - _Rust로 작성된 이더리움 생태계 프로젝트의 엄선된 모음_
- [Stylus](https://github.com/OffchainLabs/stylus) - _Arbitrum에서 스마트 컨트랙트를 구축하기 위한 Rust SDK_

더 많은 리소스를 찾고 계신가요? [ethereum.org/developers.](/developers/)를 확인해 보세요.

## Rust 커뮤니티 기여자 {#rust-community-contributors}

- [이더리움 WebAssembly](https://gitter.im/ewasm/Lobby)
- [Oasis Gitter](https://gitter.im/Oasis-official/Lobby)
- [Parity Gitter](https://gitter.im/paritytech/parity)
- [Enigma](https://discord.gg/SJK32GY)
