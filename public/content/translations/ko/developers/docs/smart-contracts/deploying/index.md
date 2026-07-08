---
title: "스마트 컨트랙트 배포"
description: "사전 요건, 도구, 배포 단계를 포함하여 이더리움 네트워크에 스마트 컨트랙트를 배포하는 방법을 알아봅니다."
lang: ko
---

이더리움 네트워크의 사용자가 스마트 컨트랙트를 사용할 수 있게 하려면 스마트 컨트랙트를 배포해야 합니다.

스마트 컨트랙트를 배포하려면 수신자를 지정하지 않고 스마트 컨트랙트의 컴파일된 코드가 포함된 이더리움 트랜잭션을 전송하기만 하면 됩니다.

## 사전 요건 {#prerequisites}

스마트 컨트랙트를 배포하기 전에 [이더리움 네트워크](/developers/docs/networks/), [트랜잭션](/developers/docs/transactions/) 및 [스마트 컨트랙트의 구조](/developers/docs/smart-contracts/anatomy/)를 이해해야 합니다.

컨트랙트는 블록체인에 저장되므로 배포 시 이더(ETH) 비용이 발생합니다. 따라서 이더리움의 [가스와 수수료](/developers/docs/gas/)에 대해 잘 알고 있어야 합니다.

마지막으로, 컨트랙트를 배포하기 전에 컴파일해야 하므로 [스마트 컨트랙트 컴파일링](/developers/docs/smart-contracts/compiling/)에 대해 읽어보시기 바랍니다.

## 스마트 컨트랙트 배포 방법 {#how-to-deploy-a-smart-contract}

### 필요한 사항 {#what-youll-need}

- 컨트랙트의 바이트코드 – 이는 [컴파일링](/developers/docs/smart-contracts/compiling/)을 통해 생성됩니다.
- 가스용 ETH – 다른 트랜잭션과 마찬가지로 가스 한도를 설정하게 되며, 컨트랙트 배포에는 단순한 ETH 전송보다 훨씬 더 많은 가스가 필요하다는 점에 유의하세요.
- 배포 스크립트 또는 플러그인
- 자체 노드를 실행하거나, 퍼블릭 노드에 연결하거나, [노드 서비스](/developers/docs/nodes-and-clients/nodes-as-a-service/)를 사용하여 API 키를 통해 [이더리움 노드](/developers/docs/nodes-and-clients/)에 접근할 수 있는 권한

### 스마트 컨트랙트 배포 단계 {#steps-to-deploy}

관련된 구체적인 단계는 사용 중인 개발 프레임워크에 따라 다릅니다. 예를 들어, [컨트랙트 배포에 대한 Hardhat의 문서](https://hardhat.org/docs/tutorial/deploying) 또는 [스마트 컨트랙트 배포 및 검증에 대한 Foundry의 문서](https://book.getfoundry.sh/forge/deploying)를 확인할 수 있습니다. 배포가 완료되면 컨트랙트는 다른 [계정](/developers/docs/accounts/)과 마찬가지로 이더리움 주소를 갖게 되며, [소스 코드 검증 도구](/developers/docs/smart-contracts/verifying/#source-code-verification-tools)를 사용하여 검증할 수 있습니다.

## 관련 도구 {#related-tools}

**Remix - _Remix IDE는 이더리움과 같은 블록체인을 위한 스마트 컨트랙트의 개발, 배포 및 관리를 지원합니다._**

- [Remix](https://remix.ethereum.org)

**Tenderly - _스마트 컨트랙트의 개발, 테스트, 모니터링 및 운영을 위한 디버깅, 관측성 및 인프라 구성 요소를 제공하는 Web3 개발 플랫폼입니다._**

- [tenderly.co](https://tenderly.co/)
- [문서](https://docs.tenderly.co/)
- [GitHub](https://github.com/Tenderly)
- [디스코드](https://discord.gg/eCWjuvt)

**Hardhat - _이더리움 소프트웨어를 컴파일, 배포, 테스트 및 디버깅하기 위한 개발 환경입니다._**

- [hardhat.org](https://hardhat.org/getting-started/)
- [컨트랙트 배포에 대한 문서](https://hardhat.org/docs/tutorial/deploying)
- [GitHub](https://github.com/nomiclabs/hardhat)
- [디스코드](https://discord.com/invite/TETZs2KK4k)

**thirdweb - _단일 명령어를 사용하여 모든 EVM 호환 체인에 모든 컨트랙트를 쉽게 배포할 수 있습니다._**

- [문서](https://portal.thirdweb.com/deploy/)

**Crossmint - _스마트 컨트랙트를 배포하고, 신용카드 및 크로스 체인 결제를 활성화하며, API를 사용하여 NFT를 생성, 배포, 판매, 저장 및 편집할 수 있는 엔터프라이즈급 Web3 개발 플랫폼입니다._**

- [crossmint.com](https://www.crossmint.com)
- [문서](https://docs.crossmint.com)
- [디스코드](https://discord.com/invite/crossmint)
- [블로그](https://blog.crossmint.com)

## 관련 튜토리얼 {#related-tutorials}

- [첫 번째 스마트 컨트랙트 배포하기](/developers/tutorials/deploying-your-first-smart-contract/) _– 이더리움 테스트 네트워크에 첫 번째 스마트 컨트랙트를 배포하는 방법에 대한 소개입니다._
- [Hello World | 스마트 컨트랙트 튜토리얼](/developers/tutorials/hello-world-smart-contract/) _– 이더리움에서 기본 스마트 컨트랙트를 생성하고 배포하는 따라 하기 쉬운 튜토리얼입니다._
- [Solidity에서 다른 컨트랙트와 상호작용하기](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– 기존 컨트랙트에서 스마트 컨트랙트를 배포하고 상호작용하는 방법입니다._
- [컨트랙트 크기를 줄이는 방법](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _- 컨트랙트 크기를 줄여 한도 내로 유지하고 가스를 절약하는 방법입니다._

## 더 읽어보기 {#further-reading}

- [https://docs.openzeppelin.com/learn/deploying-and-interacting](https://docs.openzeppelin.com/learn/deploying-and-interacting) - _오픈제플린_
- [Hardhat으로 컨트랙트 배포하기](https://hardhat.org/docs/tutorial/deploying) - _Nomic Labs_

_도움이 된 커뮤니티 리소스를 알고 계신가요? 이 페이지를 편집하여 추가해 주세요!_

## 관련 주제 {#related-topics}

- [개발 프레임워크](/developers/docs/frameworks/)
- [이더리움 노 실행하기](/developers/docs/nodes-and-clients/run-a-node/)
- [서비스형 노드(Nodes-as-a-service)](/developers/docs/nodes-and-clients/nodes-as-a-service)