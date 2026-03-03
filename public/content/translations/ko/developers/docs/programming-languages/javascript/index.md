---
title: "JavaScript 개발자를 위한 이더리움"
description: "JavaScript 기반 프로젝트 및 툴링을 사용한 이더리움 개발 방법 알아보기."
lang: ko
---

자바스크립트는 이더리움 생태계에서 가장 유명한 언어입니다. 실제로 가능한 많은 이더리움을 JavaScript로 가져오는 전담 [팀](https://github.com/ethereumjs)이 있습니다.

JavaScript(또는 그와 유사한 언어)를 사용하여 [스택의 모든 레벨](/developers/docs/ethereum-stack/)에서 코드를 작성할 수 있습니다.

## 이더리움과 상호작용하기 {#interact-with-ethereum}

### JavaScript API 라이브러리 {#javascript-api-libraries}

블록체인에 쿼리를 요청하고 트랜잭션을 전송하는 등 다양한 작업을 JavaScript로 작성하고 싶다면 [JavaScript API 라이브러리](/developers/docs/apis/javascript/)를 사용하는 것이 가장 편리한 방법입니다. 이러한 API를 통해 개발자는 [이더리움 네트워크의 노드](/developers/docs/nodes-and-clients/)와 쉽게 상호작용할 수 있습니다.

라이브러리를 사용해 이더리움의 스마트 컨트랙트와 상호작용 할 수 있으므로 자바스크립트를 사용하여 기존의 계약과 상호작용 할 수 있는 디앱을 구죽할 수 있습니다.

**자세히 알아보기**

- [Web3.js](https://web3js.readthedocs.io)
- [Ethers.js](https://ethers.org) – _JavaScript 및 TypeScript의 이더리움 지갑 구현 및 유틸리티가 포함되어 있습니다._
- [viem](https://viem.sh) – _이더리움과 상호작용하기 위한 저수준 무상태 프리미티브를 제공하는 TypeScript 인터페이스입니다._
- [Drift](https://ryangoree.github.io/drift/) – _내장된 캐싱, 후크, 테스트 목(mock)을 사용하여 여러 웹3 라이브러리에서 이더리움 개발을 쉽게 할 수 있도록 지원하는 TypeScript 메타 라이브러리입니다._

### 스마트 계약 {#smart-contracts}

JavaScript 개발자이고 직접 스마트 계약을 작성하고 싶다면, [Solidity](https://solidity.readthedocs.io)에 익숙해지는 것이 좋습니다. 이것은 가장 인기 있는 스마트 계약 언어이며, 구문이 JavaScript와 유사하여 배우기 쉬울 수 있습니다.

[스마트 계약](/developers/docs/smart-contracts/)에 대해 더 알아보기.

## 프로토콜 이해하기 {#understand-the-protocol}

### 이더리움 가상 머신 {#the-ethereum-virtual-machine}

[이더리움 가상 머신](/developers/docs/evm/)의 JavaScript 구현이 있습니다. 최신 포크 규칙을 지원합니다. 포크 규칙은 계획된 업그레이드의 결과로 EVM에 가해진 변경 사항을 의미합니다.

다양한 JavaScript 패키지로 나뉘어 있으며, 이를 확인하여 더 잘 이해할 수 있습니다:

- 계정
- 블록
- 블록체인 자체
- 트랜잭션
- 기타 등등...

이것은 "계정의 데이터 구조가 무엇인가?"와 같은 것들을 이해하는 데 도움이 됩니다.

코드를 읽는 것을 선호한다면, 이 JavaScript는 문서를 읽는 것에 대한 훌륭한 대안이 될 수 있습니다.

**EVM 자세히 알아보기**  
[`@ethereumjs/evm`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/evm)

### 노드 및 클라이언트 {#nodes-and-clients}

이해할 수 있는 언어인 JavaScript로 이더리움 클라이언트가 어떻게 작동하는지 파악할 수 있는 Ethereumjs 클라이언트가 활발히 개발 중입니다.

**클라이언트 자세히 알아보기**  
[`@ethereumjs/client`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/client)

## 기타 프로젝트 {#other-projects}

이더리움 JavaScript 분야에서는 다음과 같은 많은 일들이 일어나고 있습니다:

- 지갑 유틸리티 라이브러리.
- 이더리움 키를 생성, 가져오기, 내보내기 위한 도구들.
- `merkle-patricia-tree`의 구현 – 이더리움 옐로우 페이퍼에 기술된 데이터 구조입니다.

[EthereumJS 리포지토리](https://github.com/ethereumjs)에서 가장 관심 있는 것을 깊이 파고들어 보세요.

## 더 읽어보기 {#further-reading}

_도움이 되었던 커뮤니티 참고 자료를 알고 계신가요? 이 페이지를 편집해서 추가하세요!_
