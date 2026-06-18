---
title: 개발 네트워크
description: 개발 네트워크 및 이더리움 애플리케이션 구축을 돕는 도구에 대한 개요입니다.
lang: ko
---

스마트 컨트랙트를 사용하여 [이더리움](/) 애플리케이션을 구축할 때, 이를 배포하기 전에 로컬 네트워크에서 실행하여 어떻게 작동하는지 확인하고 싶을 것입니다.

웹 개발을 위해 컴퓨터에서 로컬 서버를 실행하는 것과 유사하게, 개발 네트워크를 사용하여 로컬 블록체인 인스턴스를 생성하고 탈중앙화 애플리케이션 (dapp)을 테스트할 수 있습니다. 이러한 이더리움 개발 네트워크는 퍼블릭 테스트넷보다 훨씬 빠른 반복 작업을 가능하게 하는 기능을 제공합니다(예를 들어 테스트넷 포싯에서 ETH를 얻는 번거로운 과정을 거칠 필요가 없습니다).

## 전제 조건 {#prerequisites}

개발 네트워크에 대해 자세히 알아보기 전에 [이더리움 스택의 기초](/developers/docs/ethereum-stack/)와 [이더리움 네트워크](/developers/docs/networks/)를 이해해야 합니다.

## 개발 네트워크란 무엇인가요? {#what-is-a-development-network}

개발 네트워크는 본질적으로 로컬 개발을 위해 특별히 설계된 이더리움 클라이언트(이더리움 구현체)입니다.

**왜 로컬에서 표준 이더리움 노드를 실행하지 않나요?**

[노드를 실행](/developers/docs/nodes-and-clients/#running-your-own-node)할 _수도_ 있지만, 개발 네트워크는 개발을 목적으로 구축되었기 때문에 다음과 같은 편리한 기능이 포함되어 있는 경우가 많습니다.

- 로컬 블록체인에 데이터를 결정론적으로 시딩(예: ETH 잔액이 있는 계정)
- 트랜잭션을 수신할 때마다 지연 없이 순서대로 즉시 블록 생성
- 향상된 디버깅 및 로깅 기능

## 사용 가능한 도구 {#available-projects}

**참고**: 대부분의 [개발 프레임워크](/developers/docs/frameworks/)에는 개발 네트워크가 내장되어 있습니다. 프레임워크로 시작하여 [로컬 개발 환경을 설정](/developers/local-environment/)하는 것을 권장합니다.

### Hardhat 네트워크 {#hardhat-network}

개발을 위해 설계된 로컬 이더리움 네트워크입니다. 컨트랙트를 배포하고, 테스트를 실행하며, 코드를 디버깅할 수 있습니다.

Hardhat 네트워크는 전문가를 위한 이더리움 개발 환경인 Hardhat에 내장되어 있습니다.

- [웹사이트](https://hardhat.org/)
- [GitHub](https://github.com/NomicFoundation/hardhat)

### 로컬 비콘 체인 {#local-beacon-chains}

일부 합의 클라이언트에는 테스트 목적으로 로컬 비콘 체인을 가동하기 위한 도구가 내장되어 있습니다. 라이트하우스, 님버스 및 로드스타에 대한 지침이 제공됩니다.

- [로드스타를 사용한 로컬 테스트넷](https://chainsafe.github.io/lodestar/contribution/advanced-topics/setting-up-a-testnet#post-merge-local-testnet/)
- [라이트하우스를 사용한 로컬 테스트넷](https://lighthouse-book.sigmaprime.io/setup.html#local-testnets)

### 퍼블릭 이더리움 테스트 체인 {#public-beacon-testchains}

유지 관리되는 퍼블릭 이더리움 테스트 구현체로는 Sepolia와 Hoodi 두 가지가 있습니다. 장기 지원이 제공되는 권장 테스트넷은 누구나 자유롭게 검증할 수 있는 Hoodi입니다. Sepolia는 허가형 검증자 세트를 사용하므로, 이 테스트넷에서는 새로운 검증자의 일반적인 접근이 불가능합니다.

- [Hoodi 스테이킹 런치패드](https://hoodi.launchpad.ethereum.org/)

### Kurtosis 이더리움 패키지 {#kurtosis}

Kurtosis는 개발자가 로컬에서 블록체인 네트워크의 재현 가능한 인스턴스를 가동할 수 있게 해주는 다중 컨테이너 테스트 환경용 빌드 시스템입니다.

이더리움 Kurtosis 패키지를 사용하면 Docker 또는 Kubernetes에서 매개변수화가 가능하고 확장성이 뛰어난 프라이빗 이더리움 테스트넷을 빠르게 인스턴스화할 수 있습니다. 이 패키지는 모든 주요 실행 계층(EL) 및 합의 레이어(CL) 클라이언트를 지원합니다. Kurtosis는 이더리움 핵심 인프라와 관련된 검증 및 테스트 워크플로에 사용될 대표 네트워크의 모든 로컬 포트 매핑과 서비스 연결을 원활하게 처리합니다.

- [이더리움 네트워크 패키지](https://github.com/kurtosis-tech/ethereum-package)
- [웹사이트](https://www.kurtosis.com/)
- [GitHub](https://github.com/kurtosis-tech/kurtosis)
- [문서](https://docs.kurtosis.com/)

## 더 읽어보기 {#further-reading}

_도움이 된 커뮤니티 리소스를 알고 계신가요? 이 페이지를 편집하여 추가해 주세요!_

## 관련 주제 {#related-topics}

- [개발 프레임워크](/developers/docs/frameworks/)
- [로컬 개발 환경 설정](/developers/local-environment/)

## 튜토리얼: 이더리움의 개발 네트워크 및 테스트 환경 {#tutorials}

- [다중 클라이언트 로컬 이더리움 테스트넷으로 탈중앙화 애플리케이션 (dapp) 개발 및 테스트하기](/developers/tutorials/develop-and-test-dapps-with-a-multi-client-local-eth-testnet/) _– 탈중앙화 애플리케이션 (dapp) 개발 및 테스트를 위해 Kurtosis로 로컬 다중 클라이언트 이더리움 테스트넷을 가동하는 방법._