---
title: "개발 네트워크"
description: "개발 네트워크에 대한 개요 및 이더리움 애플리케이션 구축에 도움이 되는 도구에 대한 설명입니다."
lang: ko
---

스마트 계약을 사용하여 이더리움 애플리케이션을 구축할 때 배포하기 전에 로컬 네트워크에서 실행하여 어떻게 작동하는지 확인하는 것이 좋습니다.

웹 개발을 위해 컴퓨터에서 로컬 서버를 실행하는 것과 유사하게, 개발 네트워크를 사용하여 로컬 블록체인 인스턴스를 생성하고 댑을 테스트할 수 있습니다. 이러한 이더리움 개발 네트워크는 공개 테스트넷보다 훨씬 빠른 반복 작업을 가능하게 하는 기능을 제공합니다(예: 테스트넷 수도꼭지에서 ETH를 얻을 필요가 없음).

## 필수 구성 요소 {#prerequisites}

[이더리움 스택의 기본 사항](/developers/docs/ethereum-stack/)과 [이더리움 네트워크](/developers/docs/networks/)를 이해한 후에 개발 네트워크에 대해 자세히 알아보는 것이 좋습니다.

## 개발 네트워크란 무엇인가요? {#what-is-a-development-network}네트워크-충격

개발 네트워크는 기본적으로 로컬 개발을 위해 특별히 설계된 이더리움 클라이언트(이더리움 구현)입니다.

**로컬에서 표준 이더리움 노드를 실행하면 안 되나요?**

[노드를 실행](/developers/docs/nodes-and-clients/#running-your-own-node)할 수도 _있지만_, 개발 네트워크는 개발 목적으로 구축되었기 때문에 다음과 같은 편리한 기능이 포함된 경우가 많습니다.

- 결정론적으로 로컬 블록체인에 데이터(예: ETH 잔액이 있는 계정)를 시딩합니다.
- 수신하는 각 트랜잭션에 대해 순서대로 지연 없이 즉시 블록을 생성합니다.
- 향상된 디버깅 및 로깅 기능

## 사용 가능한 도구 {#available-projects}

**참고**: 대부분의 [개발 프레임워크](/developers/docs/frameworks/)에는 내장된 개발 네트워크가 포함되어 있습니다. 프레임워크로 시작하여 [로컬 개발 환경을 설정](/developers/local-environment/)하는 것을 추천합니다.

### Hardhat 네트워크 {#hardhat-network}

개발용으로 설계된 로컬 이더리움 네트워크입니다. 계약을 배포하고, 테스트를 실행하고, 코드를 디버그할 수 있습니다.

Hardhat 네트워크는 전문가를 위한 이더리움 개발 환경인 Hardhat에 내장되어 있습니다.

- [웹사이트](https://hardhat.org/)
- [GitHub](https://github.com/NomicFoundation/hardhat)

### 로컬 비콘 체인 {#local-beacon-chains}

일부 합의 클라이언트에는 테스트 목적으로 로컬 비콘 체인을 가동하기 위한 내장 도구가 있습니다. Lighthouse, Nimbus, Lodestar에 대한 지침은 다음과 같습니다.

- [Lodestar를 사용한 로컬 테스트넷](https://chainsafe.github.io/lodestar/contribution/advanced-topics/setting-up-a-testnet#post-merge-local-testnet/)
- [Lighthouse를 사용한 로컬 테스트넷](https://lighthouse-book.sigmaprime.io/setup.html#local-testnets)

### 공개 이더리움 테스트 체인 {#public-beacon-testchains}

유지 관리되는 두 가지 공개 이더리움 테스트 구현인 Sepolia와 Hoodi도 있습니다. 장기적으로 지원되는 권장 테스트넷은 Hoodi이며 누구나 자유롭게 검증할 수 있습니다. Sepolia는 허가된 검증자 집합을 사용하므로, 이 테스트넷의 신규 검증자는 일반적으로 접근할 수 없습니다.

- [Hoodi 스테이킹 런치패드](https://hoodi.launchpad.ethereum.org/)

### Kurtosis 이더리움 패키지 {#kurtosis}

Kurtosis는 개발자가 블록체인 네트워크의 재현 가능한 인스턴스를 로컬에서 가동할 수 있도록 하는 다중 컨테이너 테스트 환경용 빌드 시스템입니다.

이더리움 Kurtosis 패키지를 사용하면 Docker 또는 Kubernetes를 통해 매개변수화 가능하고 확장성이 뛰어나며 비공개인 이더리움 테스트넷을 신속하게 인스턴스화할 수 있습니다. 이 패키지는 모든 주요 실행 레이어(EL) 및 합의 레이어(CL) 클라이언트를 지원합니다. Kurtosis는 이더리움 코어 인프라와 관련된 검증 및 테스트 워크플로에 사용될 대표 네트워크에 대한 모든 로컬 포트 매핑 및 서비스 연결을 원활하게 처리합니다.

- [이더리움 네트워크 패키지](https://github.com/kurtosis-tech/ethereum-package)
- [웹사이트](https://www.kurtosis.com/)
- [GitHub](https://github.com/kurtosis-tech/kurtosis)
- [개발문서](https://docs.kurtosis.com/)

## 더 읽어보기 {#further-reading}

_도움이 되었던 커뮤니티 참고 자료를 알고 계신가요? 이 페이지를 편집해서 추가하세요!_

## 관련 주제 {#related-topics}

- [개발 프레임워크](/developers/docs/frameworks/)
- [로컬 개발 환경 설정](/developers/local-environment/)
