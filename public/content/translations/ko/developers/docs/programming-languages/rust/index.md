---
title: Rust 개발자를 위한 이더리움
description: Rust 기반 프로젝트 및 툴링을 사용한 이더리움 개발 방법 알아보기
lang: ko
incomplete: true
---

<FeaturedText>Rust 기반 프로젝트 및 툴링을 사용하여 이더리움을 개발하는 방법을 알아보세요</FeaturedText>

이더리움 기반으로 개발된 탈중앙화 애플리케이션(또는 “디앱”)은 암호화폐와 블록체인 기술의 장점을 가지게 됩니다. 탈중앙화 애플리케이션은 일단 이더리움에 배포되면 항상 프로그래밍된 대로 동작하므로 완전히 신뢰할 수 있습니다. 그러므로 새로운 형태의 금융 애플리케이션을 제작하기 위해 디지털 자산을 제어하는 데 사용될 수 있습니다. 그뿐만 아니라 해당 금융 애플리케이션을 어떤 특정 단체나 개인이 제어할 수 없고 검열이 거의 불가능하도록 탈중앙화할 수 있습니다.

## 스마트 계약 및 솔리디티 언어 시작하기 {#getting-started-with-smart-contracts-and-solidity}

**러스트와 이더리움을 통합하기 위한 첫 단계**

먼저 기본 지식이 더 필요하시나요? [ethereum.org/learn](/learn/) 또는 [ethereum.org/developers](/developers/)를 확인해 보세요.

- [블록체인 설명](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [스마트 계약 이해하기](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [첫 스마트 계약 작성하기](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [솔리디티 컴파일 및 배포 방법 알아보기](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## 초급자용 아티클 {#beginner-articles}

- [Rust 이더리움 클라이언트](https://openethereum.github.io/) \* **참고: OpenEthereum은 [더 이상 사용되지 않으며](https://medium.com/openethereum/gnosis-joins-erigon-formerly-turbo-geth-to-release-next-gen-ethereum-client-c6708dd06dd) 더 이상 유지 관리되지 않습니다.** 주의하여 사용하고 가급적 다른 클라이언트 구현으로 전환하십시오.
- [Rust를 사용하여 이더리움으로 트랜잭션 보내기](https://kauri.io/#collections/A%20Hackathon%20Survival%20Guide/sending-ethereum-transactions-with-rust/)
- [Kovan용 rust Wasm으로 컨트랙트를 작성하는 방법에 대한 단계별 튜토리얼](https://github.com/paritytech/pwasm-tutorial)

## 중급자용 아티클 {#intermediate-articles}

## 고급 사용 패턴 {#advanced-use-patterns}

- [이더리움과 유사한 네트워크와 상호작용하기 위한 pwasm_ethereum 외부 라이브러리](https://github.com/openethereum/pwasm-ethereum)

- [JavaScript와 Rust를 사용하여 탈중앙화 채팅 구축하기](https://medium.com/perlin-network/build-a-decentralized-chat-using-javascript-rust-webassembly-c775f8484b52)

- [Vue.js와 Rust를 사용하여 탈중앙화 Todo 앱 구축하기](https://medium.com/@jjmace01/build-a-decentralized-todo-app-using-vue-js-rust-webassembly-5381a1895beb)

- [Rust로 블록체인 구축하기](https://blog.logrocket.com/how-to-build-a-blockchain-in-rust/)

## Rust 프로젝트 및 도구 {#rust-projects-and-tools}

- [pwasm-ethereum](https://github.com/paritytech/pwasm-ethereum) - _이더리움과 유사한 네트워크와 상호작용하기 위한 외부 모음_
- [Lighthouse](https://github.com/sigp/lighthouse) - _빠른 이더리움 합의 레이어 클라이언트_
- [Ethereum WebAssembly](https://ewasm.readthedocs.io/en/mkdocs/) - _결정론적 WebAssembly 하위 집합을 사용한 이더리움 스마트 계약 실행 레이어의 제안된 재설계_
- [oasis_std](https://docs.rs/oasis-std/latest/oasis_std/index.html) - _OASIS API 레퍼런스_
- [Solaris](https://github.com/paritytech/sol-rs) - _네이티브 Parity 클라이언트 EVM을 사용하는 Solidity 스마트 계약 단위 테스트 하네스._
- [SputnikVM](https://github.com/rust-blockchain/evm) - _Rust 이더리움 가상 머신 구현_
- [Wavelet](https://wavelet.perlin.net/docs/smart-contracts) - _Rust의 Wavelet 스마트 계약_
- [Foundry](https://github.com/foundry-rs/foundry) - _이더리움 애플리케이션 개발을 위한 툴킷_
- [Alloy](https://alloy.rs) - _이더리움 및 기타 EVM 기반 체인과 상호작용하기 위한 고성능의 잘 테스트되고 문서화된 라이브러리._
- [Ethers_rs](https://github.com/gakonst/ethers-rs) - _이더리움 라이브러리 및 지갑 구현_
- [SewUp](https://github.com/second-state/SewUp) - _일반적인 백엔드에서 개발하는 것처럼 Rust로 이더리움 웹어셈블리 계약을 구축하는 데 도움이 되는 라이브러리_
- [Substreams](https://github.com/streamingfast/substreams) - _병렬화된 블록체인 데이터 인덱싱 기술_
- [Reth](https://github.com/paradigmxyz/reth) Reth(Rust Ethereum의 줄임말)는 새로운 이더리움 전체 노드 구현입니다
- [Awesome Ethereum Rust](https://github.com/Vid201/awesome-ethereum-rust) - _Rust로 작성된 이더리움 생태계의 프로젝트 큐레이션 모음_

더 많은 참고 자료를 확인하고 싶으신가요? [ethereum.org/developers.](/developers/)를 확인해 보세요.

## Rust 커뮤니티 기여자 {#rust-community-contributors}

- [Ethereum WebAssembly](https://gitter.im/ewasm/Lobby)
- [Oasis Gitter](https://gitter.im/Oasis-official/Lobby)
- [Parity Gitter](https://gitter.im/paritytech/parity)
- [Enigma](https://discord.gg/SJK32GY)
