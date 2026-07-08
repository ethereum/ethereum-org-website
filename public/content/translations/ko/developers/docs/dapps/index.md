---
title: "dapp에 대한 기술적 소개"
description:
lang: ko
---

탈중앙화 애플리케이션 (dapp)은 탈중앙화된 네트워크 위에 구축되어 [스마트 컨트랙트](/developers/docs/smart-contracts/)와 프론트엔드 사용자 인터페이스를 결합한 애플리케이션입니다. [이더리움](/)에서 스마트 컨트랙트는 오픈 API처럼 접근 가능하고 투명하므로, 여러분의 dapp에 다른 사람이 작성한 스마트 컨트랙트를 포함할 수도 있습니다.

## 전제 조건 {#prerequisites}

dapp에 대해 배우기 전에 [블록체인 기초](/developers/docs/intro-to-ethereum/)를 다루고 이더리움 네트워크와 이것이 어떻게 탈중앙화되어 있는지 읽어보아야 합니다.

## dapp의 정의 {#definition-of-a-dapp}

dapp은 탈중앙화된 피어 투 피어 네트워크에서 백엔드 코드를 실행합니다. 백엔드 코드가 중앙화된 서버에서 실행되는 일반적인 앱과 대조됩니다.

dapp은 백엔드를 호출하기 위해 (일반 앱처럼) 어떤 언어로든 작성된 프론트엔드 코드와 사용자 인터페이스를 가질 수 있습니다. 또한 프론트엔드는 [IPFS](https://ipfs.io/)와 같은 탈중앙화된 스토리지에 호스팅될 수 있습니다.

- **탈중앙화된** - dapp은 어떤 개인이나 그룹도 통제권을 갖지 않는 개방형 퍼블릭 탈중앙화 플랫폼인 이더리움에서 작동합니다.
- **결정론적** - dapp은 실행되는 환경에 관계없이 동일한 기능을 수행합니다.
- **튜링 완전** - dapp은 필요한 리소스가 주어지면 어떤 작업이든 수행할 수 있습니다.
- **격리됨** - dapp은 이더리움 가상 머신(EVM)이라는 가상 환경에서 실행되므로, 스마트 컨트랙트에 버그가 있더라도 블록체인 네트워크의 정상적인 작동을 방해하지 않습니다.

### 스마트 컨트랙트에 대하여 {#on-smart-contracts}

dapp을 소개하려면, 더 나은 용어가 없으므로 dapp의 백엔드라고 할 수 있는 스마트 컨트랙트를 소개해야 합니다. 자세한 개요는 [스마트 컨트랙트](/developers/docs/smart-contracts/) 섹션을 참조하세요.

스마트 컨트랙트는 이더리움 블록체인에 존재하며 프로그래밍된 대로 정확히 실행되는 코드입니다. 스마트 컨트랙트가 네트워크에 배포되면 변경할 수 없습니다. dapp은 개인이나 회사가 아닌 컨트랙트에 작성된 로직에 의해 제어되기 때문에 탈중앙화될 수 있습니다. 이는 또한 컨트랙트를 매우 신중하게 설계하고 철저하게 테스트해야 함을 의미합니다.

## dapp 개발의 이점 {#benefits-of-dapp-development}

- **다운타임 제로** – 스마트 컨트랙트가 블록체인에 배포되면, 네트워크 전체가 컨트랙트와 상호 작용하려는 클라이언트에게 항상 서비스를 제공할 수 있습니다. 따라서 악의적인 행위자는 개별 dapp을 표적으로 삼아 서비스 거부(DoS) 공격을 시작할 수 없습니다.
- **프라이버시** – dapp을 배포하거나 상호 작용하기 위해 실제 신원을 제공할 필요가 없습니다.
- **검열 저항성** – 네트워크의 어떤 단일 주체도 사용자가 트랜잭션을 제출하거나, dapp을 배포하거나, 블록체인에서 데이터를 읽는 것을 차단할 수 없습니다.
- **완벽한 데이터 무결성** – 암호화 기본 요소 덕분에 블록체인에 저장된 데이터는 불변이며 반박할 수 없습니다. 악의적인 행위자는 이미 공개된 트랜잭션이나 기타 데이터를 위조할 수 없습니다.
- **무신뢰 연산/검증 가능한 동작** – 스마트 컨트랙트는 분석이 가능하며 중앙 권한을 신뢰할 필요 없이 예측 가능한 방식으로 실행됨이 보장됩니다. 이는 전통적인 모델에서는 불가능합니다. 예를 들어, 온라인 뱅킹 시스템을 사용할 때 우리는 금융 기관이 우리의 금융 데이터를 오용하거나, 기록을 조작하거나, 해킹당하지 않을 것이라고 신뢰해야 합니다.

## dapp 개발의 단점 {#drawbacks-of-dapp-development}

- **유지보수** – 블록체인에 게시된 코드와 데이터는 수정하기 어렵기 때문에 dapp은 유지보수하기가 더 어려울 수 있습니다. 이전 버전에서 버그나 보안 위험이 발견되더라도, 개발자가 배포된 dapp(또는 dapp에 저장된 기본 데이터)을 업데이트하는 것은 어렵습니다.
- **성능 오버헤드** – 엄청난 성능 오버헤드가 발생하며 확장이 매우 어렵습니다. 이더리움이 목표로 하는 수준의 보안, 무결성, 투명성 및 신뢰성을 달성하기 위해 모든 노드가 모든 트랜잭션을 실행하고 저장합니다. 게다가 지분 증명 (PoS) 합의에도 시간이 걸립니다.
- **네트워크 혼잡** – 하나의 dapp이 너무 많은 컴퓨팅 리소스를 사용하면 전체 네트워크가 지연됩니다. 현재 네트워크는 초당 약 10\~15개의 트랜잭션만 처리할 수 있습니다. 이보다 빠르게 트랜잭션이 전송되면 미확인 트랜잭션 풀이 순식간에 부풀어 오를 수 있습니다.
- **사용자 경험** – 일반적인 최종 사용자는 진정으로 안전한 방식으로 블록체인과 상호 작용하는 데 필요한 도구 스택을 설정하는 것을 너무 어렵게 느낄 수 있으므로, 사용자 친화적인 경험을 설계하기가 더 어려울 수 있습니다.
- **중앙화** – 이더리움의 기본 레이어 위에 구축된 사용자 친화적이고 개발자 친화적인 솔루션은 결국 중앙화된 서비스처럼 보일 수 있습니다. 예를 들어, 이러한 서비스는 키나 기타 민감한 정보를 서버 측에 저장하거나, 중앙화된 서버를 사용하여 프론트엔드를 제공하거나, 블록체인에 기록하기 전에 중앙화된 서버에서 중요한 비즈니스 로직을 실행할 수 있습니다. 중앙화는 전통적인 모델에 비해 블록체인이 가지는 장점의 대부분(전부는 아니더라도)을 없앱니다.

## 시각적인 학습을 선호하시나요? {#visual-learner}

<VideoWatch slug="what-is-a-dapp" />

## dapp 생성 도구 {#dapp-tools}

**Scaffold-ETH _- 스마트 컨트랙트에 맞춰 조정되는 프론트엔드를 사용하여 Solidity를 빠르게 실험해 보세요._**

- [GitHub](https://github.com/scaffold-eth/scaffold-eth-2)
- [예제 dapp](https://punkwallet.io/)

**Create Eth App _- 단일 명령어로 이더리움 기반 앱을 생성하세요._**

- [GitHub](https://github.com/paulrberg/create-eth-app)

**One Click Dapp _- [ABI](/glossary/#abi)에서 dapp 프론트엔드를 생성하기 위한 FOSS 도구입니다._**

- [oneclickdapp.com](https://oneclickdapp.com)
- [GitHub](https://github.com/oneclickdapp/oneclickdapp-v1)

**Etherflow _- 이더리움 개발자가 노드를 테스트하고 브라우저에서 RPC 호출을 구성 및 디버깅할 수 있는 FOSS 도구입니다._**

- [etherflow.quiknode.io](https://etherflow.quiknode.io/)
- [GitHub](https://github.com/abunsen/etherflow)

**thirdweb _- Web3 개발을 위한 모든 언어의 SDK, 스마트 컨트랙트, 도구 및 인프라입니다._**

- [홈페이지](https://thirdweb.com/)
- [문서](https://portal.thirdweb.com/)
- [GitHub](https://github.com/thirdweb-dev/)

**Crossmint _- 스마트 컨트랙트를 배포하고, 신용카드 및 크로스 체인 결제를 활성화하며, API를 사용하여 NFT를 생성, 배포, 판매, 저장 및 편집할 수 있는 엔터프라이즈급 Web3 개발 플랫폼입니다._**

- [crossmint.com](https://www.crossmint.com)
- [문서](https://docs.crossmint.com)
- [디스코드](https://discord.com/invite/crossmint)

## 더 읽을거리 {#further-reading}

- [dapp 탐색하기](/apps)
- [웹 3.0 애플리케이션의 아키텍처](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application) - _Preethi Kasireddy_
- [2021년 탈중앙화 애플리케이션 가이드](https://limechain.tech/blog/what-are-dapps-the-2021-guide/) - _LimeChain_
- [탈중앙화 앱이란 무엇인가요?](https://www.gemini.com/cryptopedia/decentralized-applications-defi-dapps) - _Gemini_
- [인기 있는 dapp](https://www.alchemy.com/dapps) - _Alchemy_

_도움이 된 커뮤니티 리소스를 알고 계신가요? 이 페이지를 편집하여 추가해 주세요!_

## 관련 주제 {#related-topics}

- [이더리움 스택 소개](/developers/docs/ethereum-stack/)
- [개발 프레임워크](/developers/docs/frameworks/)

## 튜토리얼: 이더리움에서 앱 및 프론트엔드 구축하기 {#tutorials}

- [유니스왑 v2 컨트랙트 연습](/developers/tutorials/uniswap-v2-annotated-code/) _– 자동화된 마켓 메이커 (AMM)의 작동 방식을 설명하는 유니스왑 v2 핵심 컨트랙트에 대한 주석이 달린 연습입니다._
- [컨트랙트를 위한 사용자 인터페이스 구축하기](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/) _– 스마트 컨트랙트에 연결되는 최신 React + Wagmi 프론트엔드를 구축하는 방법입니다._
- [초보자를 위한 Hello World 스마트 컨트랙트 – 풀스택](/developers/tutorials/hello-world-smart-contract-fullstack/) _– 엔드투엔드 튜토리얼: 간단한 스마트 컨트랙트를 작성, 배포하고 프론트엔드를 구축합니다._
- [Web3 앱을 위한 서버 컴포넌트 및 에이전트](/developers/tutorials/server-components/) _– 블록체인 이벤트를 수신하고 트랜잭션으로 응답하는 TypeScript 서버 컴포넌트를 작성하는 방법입니다._
- [탈중앙화된 사용자 인터페이스를 위한 IPFS](/developers/tutorials/ipfs-decentralized-ui/) _– 검열 저항성을 위해 IPFS에 dapp의 프론트엔드를 호스팅하는 방법입니다._