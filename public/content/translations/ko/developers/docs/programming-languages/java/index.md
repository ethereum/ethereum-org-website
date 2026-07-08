---
title: "Java 개발자를 위한 이더리움"
description: "Java 기반 프로젝트 및 도구를 사용하여 이더리움용으로 개발하는 방법을 알아보세요."
lang: ko
incomplete: true
---

<FeaturedText>Java 기반 프로젝트 및 도구를 사용하여 이더리움용으로 개발하는 방법을 알아보세요.</FeaturedText>

이더리움을 사용하여 암호화폐와 블록체인 기술의 이점을 활용하는 탈중앙화 애플리케이션 (dapp)을 만들어 보세요. 이러한 dapp은 신뢰할 수 있으며, 이는 이더리움에 배포된 후에는 항상 프로그래밍된 대로 실행됨을 의미합니다. 새로운 종류의 금융 애플리케이션을 만들기 위해 디지털 자산을 제어할 수 있습니다. 또한 탈중앙화되어 있어 단일 주체나 개인이 제어하지 않으며 검열이 거의 불가능합니다.

## 스마트 컨트랙트 및 Solidity 언어 시작하기 {#getting-started-with-smart-contracts-and-solidity}

**Java와 이더리움을 통합하기 위한 첫걸음을 내딛어 보세요**

더 기본적인 입문서가 먼저 필요하신가요? [ethereum.org/learn](/learn/) 또는 [ethereum.org/developers.](/developers/)를 확인해 보세요.

- [블록체인 설명](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [스마트 컨트랙트 이해하기](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [첫 번째 스마트 컨트랙트 작성하기](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Solidity 컴파일 및 배포 방법 알아보기](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## 이더리움 클라이언트 작업하기 {#working-with-ethereum-clients}

두 가지 주요 Java 이더리움 클라이언트인 [Web3j](https://github.com/web3j/web3j)와 Hyperledger 베수를 사용하는 방법을 알아보세요.

- [Java, Eclipse 및 Web3j를 사용하여 이더리움 클라이언트에 연결하기](https://kauri.io/article/b9eb647c47a546bc95693acc0be72546/connecting-to-an-ethereum-client-with-java-eclipse-and-web3j)
- [Java 및 Web3j로 이더리움 계정 관리하기](https://kauri.io/article/925d923e12c543da9a0a3e617be963b4/manage-an-ethereum-account-with-java-and-web3j)
- [스마트 컨트랙트에서 Java 래퍼 생성하기](https://kauri.io/article/84475132317d4d6a84a2c42eb9348e4b/generate-a-java-wrapper-from-your-smart-contract)
- [이더리움 스마트 컨트랙트와 상호작용하기](https://kauri.io/article/14dc434d11ef4ee18bf7d57f079e246e/interacting-with-an-ethereum-smart-contract-in-java)
- [이더리움 스마트 컨트랙트 이벤트 수신하기](https://kauri.io/article/760f495423db42f988d17b8c145b0874/listening-for-ethereum-smart-contract-events-in-java)
- [Linux에서 Java 이더리움 클라이언트인 베수(Pantheon) 사용하기](https://kauri.io/article/276dd27f1458443295eea58403fd6965/using-pantheon-the-java-ethereum-client-with-linux)
- [Java 통합 테스트에서 Hyperledger 베수(Pantheon) 노드 실행하기](https://kauri.io/article/7dc3ecc391e54f7b8cbf4e5fa0caf780/running-a-pantheon-node-in-java-integration-tests)
- [Web3j 치트 시트](<https://kauri.io/web3j-cheat-sheet-(java-ethereum)/5dfa1ea941ac3d0001ce1d90/c>)

EVM 기반 블록체인과 상호작용하기 위한 비동기식 고성능 Kotlin 라이브러리인 [ethers-kt](https://github.com/Kr1ptal/ethers-kt) 사용 방법을 알아보세요. JVM 및 Android 플랫폼을 대상으로 합니다.
- [ERC-20 토큰 전송](https://github.com/Kr1ptal/ethers-kt/blob/master/examples/src/main/kotlin/io/ethers/examples/abi/TransferERC20.kt)
- [이벤트 수신을 통한 UniswapV2 스왑](https://github.com/Kr1ptal/ethers-kt/blob/master/examples/src/main/kotlin/io/ethers/examples/tokenswapwitheventlistening/TokenSwapWithEventListening.kt)
- [ETH / ERC-20 잔액 추적기](https://github.com/Kr1ptal/ethers-kt/blob/master/examples/src/main/kotlin/io/ethers/examples/balancetracker/BalanceTracker.kt)

## 중급 문서 {#intermediate-articles}

- [IPFS를 사용하여 Java 애플리케이션에서 스토리지 관리하기](https://kauri.io/article/3e8494f4f56f48c4bb77f1f925c6d926/managing-storage-in-a-java-application-with-ipfs)
- [Web3j를 사용하여 Java에서 ERC-20 토큰 관리하기](https://kauri.io/article/d13e911bbf624108b1d5718175a5e0a0/manage-erc20-tokens-in-java-with-web3j)
- [Web3j 트랜잭션 관리자](https://kauri.io/article/4cb780bb4d0846438d11885a25b6d7e7/web3j-transaction-managers)

## 고급 사용 패턴 {#advanced-use-patterns}

- [Eventeum을 사용하여 Java 스마트 컨트랙트 데이터 캐시 구축하기](https://kauri.io/article/fe81ee9612eb4e5a9ab72790ef24283d/using-eventeum-to-build-a-java-smart-contract-data-cache)

## Java 프로젝트 및 도구 {#java-projects-and-tools}

- [Web3j (이더리움 클라이언트와 상호작용하기 위한 라이브러리)](https://github.com/web3j/web3j)
- [ethers-kt (EVM 기반 블록체인을 위한 비동기식 고성능 Kotlin/Java/Android 라이브러리)](https://github.com/Kr1ptal/ethers-kt)
- [Eventeum (이벤트 리스너)](https://github.com/ConsenSys/eventeum)
- [Mahuta (IPFS 개발 도구)](https://github.com/ConsenSys/mahuta)

더 많은 리소스를 찾고 계신가요? [ethereum.org/developers.](/developers/)를 확인해 보세요.

## Java 커뮤니티 기여자 {#java-community-contributors}

- [IO Builders](https://io.builders)
- [Kauri](https://kauri.io)