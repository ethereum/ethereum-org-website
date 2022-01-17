---
title: Rust 개발자를 위한 이더리움
description: Rust 기반 프로젝트 및 툴링을 사용한 이더리움 개발 방법 알아보기
lang: ko
sidebar: true
sidebarDepth: 1
---

# 러스트(Rust) 개발자를 위한 이더리움 {#ethereum-for-rust-devs}

<div class="featured">러스트 기반 프로젝트 및 툴링을 사용한 이더리움 개발 방법 알아보기</div>

이더리움 기반으로 개발된 탈중앙화 애플리케이션(또는 “디앱”)은 암호화폐와 블록체인 기술의 장점을 가지게 됩니다. 탈중앙화 애플리케이션은 일단 이더리움에 배포되면 항상 프로그래밍된 대로 동작하므로 완전히 신뢰할 수 있습니다. 그러므로 새로운 형태의 금융 애플리케이션을 제작하기 위해 디지털 자산을 제어하는 데 사용될 수 있습니다. 그뿐만 아니라 해당 금융 애플리케이션을 어떤 특정 단체나 개인이 제어할 수 없고 검열이 거의 불가능하도록 탈중앙화할 수 있습니다.

## 스마트 컨트랙트 시작하기 및 솔리디티 언어 {#getting-started-with-smart-contracts-and-solidity}

**러스트와 이더리움을 통합하기 위한 첫 단계**

먼저 기본 지식이 더 필요하시나요? [ethereum.org/learn](/ko/learn/) 또는 [ethereum.org/developers](/ko/developers/)를 확인해 보세요.

- [블록체인에 관한 설명](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [스마트 컨트랙트 이해하기](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [처음으로 스마트 컨트랙트 작성하기](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [솔리디티 컴파일 및 배포 방법 알아보기](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## 입문자용 문서 {#beginner-articles}

- [이더리움 클라이언트 선택하기](https://www.trufflesuite.com/docs/truffle/reference/choosing-an-ethereum-client)
- [러스트 이더리움 클라이언트](https://wiki.parity.io/Setup)
- [러스트를 사용하여 이더리움에 트랜잭션 보내기](https://kauri.io/#collections/A%20Hackathon%20Survival%20Guide/sending-ethereum-transactions-with-rust/)
- [패리티이더리움 클라이언트를 사용한 스마트 컨트랙트 소개](https://wiki.parity.io/Smart-Contracts)
- [오아시스 SDK (Oasis SDK) 개발 환경 설정하기](https://docs.oasis.dev/oasis-sdk/guide/getting-started)
- [Kovan용 Wasm의 컨트랙트를 러스트로 작성하는 방법에 대한 단계별 가이드](https://github.com/paritytech/pwasm-tutorial)

## 중급 사용자용 참고 자료 {#intermediate-articles}

- [Rust-Web3 개발 문서](https://tomusdrw.github.io/rust-web3/web3/index.html)
- [Rust-Web3 작업 예시](https://github.com/tomusdrw/rust-web3/blob/master/examples)

## 고급 사용 패턴 {#advanced-use-patterns}

- [이더리움 네트워크와의 상호 작용을 위한 pwasm_ethereum extern 라이브러리](https://github.com/openethereum/pwasm-ethereum)
- [JavaScript와 Rust를 사용하여 탈중앙화 채팅 구축하기](https://medium.com/perlin-network/build-a-decentralized-chat-using-javascript-rust-webassembly-c775f8484b52)
- [Vue.js 및 Rust를 사용하여 탈중앙화 할 일 목록 앱 제작하기 ](https://medium.com/@jjmace01/build-a-decentralized-todo-app-using-vue-js-rust-webassembly-5381a1895beb)
- [Enigma 시작하기 - Rust 프로그래밍 언어](https://blog.enigma.co/getting-started-with-discovery-the-rust-programming-language-4d1e0b06de15)
- [시크릿 컨트랙트 소개](https://blog.enigma.co/getting-started-with-enigma-an-intro-to-secret-contracts-cdba4fe501c2)
- [Oasis에서 솔리디티 컨트랙트 배포하기(복합)](https://docs.oasis.dev/tutorials/deploy-solidity.html#deploy-using-truffle)

## Rust 프로젝트 및 도구 {#rust-projects-and-tools}

- [pwasm-ethereum](https://github.com/paritytech/pwasm-ethereum) - _이더리움 네트워크와의 상호 작용을 위한 extern 모음_
- [이더리움 웹 어셈블리](https://ewasm.readthedocs.io/en/mkdocs/)
- [oasis_std](https://docs.rs/oasis-std/0.2.7/oasis_std/) - _OASIS API 참조_
- [eth-utils](https://github.com/ethereum/eth-utils/) - _이더리움 관련 코드베이스와 호환되는 유틸리티 함수_
- [Solaris](https://github.com/paritytech/sol-rs)
- [SputnikVM](https://github.com/sorpaas/rust-evm) - _Rust EVM(Ethereum Virtual Machine) 구현체_
- [패리티(Parity)](https://github.com/paritytech/parity-ethereum) - _이더리움 Rust 클라이언트_
- [rust-web3](https://github.com/tomusdrw/rust-web3) - _Web3.js 라이브러리의 Rust 구현체_
- [Wavelet](https://wavelet.perlin.net/docs/smart-contracts) - _Rust로 작성된 Wavelet 스마트 컨트랙트_

더 많은 참고 자료를 확인하고 싶으신가요? [ethereum.org/developers](/ko/developers/)를 확인해 보세요.

## Rust 커뮤니티 기여자 {#rust-community-contributors}

- [이더리움 웹 어셈블리](https://gitter.im/ewasm/Lobby)
- [Oasis Gitter](https://gitter.im/Oasis-official/Lobby)
- [Parity Gitter](https://gitter.im/paritytech/parity)
- [Enigma](https://discord.gg/SJK32GY)
