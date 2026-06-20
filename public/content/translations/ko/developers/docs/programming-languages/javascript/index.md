---
title: "JavaScript 개발자를 위한 이더리움"
description: "JavaScript 기반 프로젝트 및 도구를 사용하여 이더리움용으로 개발하는 방법을 알아보세요."
lang: ko
---

JavaScript는 이더리움 생태계에서 가장 인기 있는 언어 중 하나입니다. 실제로 가능한 한 많은 이더리움 기능을 JavaScript로 가져오기 위해 전념하는 [팀](https://github.com/ethereumjs)이 있습니다.

[스택의 모든 수준](/developers/docs/ethereum-stack/)에서 JavaScript(또는 이와 유사한 언어)를 작성할 기회가 있습니다.

## 이더리움과 상호 작용 {#interact-with-ethereum}

### JavaScript API 라이브러리 {#javascript-api-libraries}

블록체인을 쿼리하고, 트랜잭션을 전송하는 등의 작업을 위해 JavaScript를 작성하려는 경우, 가장 편리한 방법은 [JavaScript API 라이브러리](/developers/docs/apis/javascript/)를 사용하는 것입니다. 이러한 API를 통해 개발자는 [이더리움 네트워크의 노드](/developers/docs/nodes-and-clients/)와 쉽게 상호 작용할 수 있습니다.

이러한 라이브러리를 사용하여 이더리움의 스마트 컨트랙트와 상호 작용할 수 있으므로, JavaScript만 사용하여 기존 컨트랙트와 상호 작용하는 탈중앙화 애플리케이션 (dapp)을 구축할 수 있습니다.

**확인해 보기**

- [Web3.js](https://web3js.readthedocs.io)
- [Ethers.js](https://ethers.org) – _JavaScript 및 TypeScript로 작성된 이더리움 지갑 구현 및 유틸리티를 포함합니다._
- [viem](https://viem.sh) – _이더리움과 상호 작용하기 위한 저수준의 무상태(stateless) 기본 요소를 제공하는 이더리움용 TypeScript 인터페이스입니다._
- [Drift](https://ryangoree.github.io/drift/) – _Web3 라이브러 전반에서 손쉬운 이더리움 개발을 위해 내장 캐싱, 훅(hook) 및 테스트 모의(mock) 객체를 제공하는 TypeScript 메타 라이브러리입니다._

### 스마트 컨트랙트 {#smart-contracts}

JavaScript 개발자로서 자신만의 스마트 컨트랙트를 작성하고 싶다면 [Solidity](https://solidity.readthedocs.io)에 익숙해지는 것이 좋습니다. 이는 가장 인기 있는 스마트 컨트랙트 언어이며 구문이 JavaScript와 유사하여 더 쉽게 배울 수 있습니다.

[스마트 컨트랙트](/developers/docs/smart-contracts/)에 대해 자세히 알아보기.

## 프로토콜 이해하기 {#understand-the-protocol}

### 이더리움 가상 머신 {#the-ethereum-virtual-machine}

[이더리움 가상 머신](/developers/docs/evm/)의 JavaScript 구현체가 있습니다. 이는 최신 포크 규칙을 지원합니다. 포크 규칙은 계획된 업그레이드의 결과로 EVM에 적용된 변경 사항을 의미합니다.

이는 더 잘 이해할 수 있도록 여러 JavaScript 패키지로 나뉘어 있습니다.

- 계정
- 블록
- 블록체인 자체
- 트랜잭션
- 기타 등등...

이를 통해 "계정의 데이터 구조는 무엇인가?"와 같은 내용을 이해하는 데 도움이 될 것입니다.

코드를 읽는 것을 선호한다면, 이 JavaScript 코드는 문서를 읽는 것의 훌륭한 대안이 될 수 있습니다.

**EVM 확인해 보기**  
[`@ethereumjs/evm`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/evm)

### 노드 및 클라이언트 {#nodes-and-clients}

여러분이 이해할 수 있는 언어인 JavaScript로 이더리움 클라이언트가 어떻게 작동하는지 파헤쳐 볼 수 있는 EthereumJS 클라이언트가 활발히 개발 중입니다!

**클라이언트 확인해 보기**  
[`@ethereumjs/client`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/client)

## 기타 프로젝트 {#other-projects}

이더리움 JavaScript 영역에서는 다음과 같은 다양한 프로젝트도 진행되고 있습니다.

- 지갑 유틸리티 라이브러리.
- 이더리움 키를 생성, 가져오기 및 내보내는 도구.
- 이더리움 황서에 요약된 데이터 구조인 `merkle-patricia-tree`의 구현체.

[EthereumJS 저장소](https://github.com/ethereumjs)에서 가장 관심 있는 내용을 파헤쳐 보세요.

## 더 읽어보기 {#further-reading}

_도움이 된 커뮤니티 리소스를 알고 계신가요? 이 페이지를 편집하여 추가해 주세요!_