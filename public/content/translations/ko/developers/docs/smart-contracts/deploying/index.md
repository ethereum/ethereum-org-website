---
title: 스마트 컨트랙트 배포
description: 필수 구성 요소, 도구, 배포 단계를 포함하여 이더리움 네트워크에 스마트 계약을 배포하는 방법을 알아보세요.
lang: ko
---

이더리움 네트워크 유저들이 스마트 계약을 이용할 수 있으려면 스마트계약 배포를 마쳐야 합니다.

스마트 계약 배포는 컴파일된 코드를 포함하는 이더리움 거래를 받는 이를 지정하지 않고 보내는 식으로 이루어 집니다.

## 필수 구성 요소 {#prerequisites}

스마트 계약을 배포하기 전에 [이더리움 네트워크](/developers/docs/networks/), [거래](/developers/docs/transactions/) 및 [스마트 계약의 구조](/developers/docs/smart-contracts/anatomy/)를 이해해야 합니다.

계약은 블록체인에 저장되므로 배포 시 이더(ETH)가 필요합니다. 따라서 이더리움의 [가스 및 수수료](/developers/docs/gas/)에 대해 잘 알고 있어야 합니다.

마지막으로, 계약을 배포하기 전에 컴파일해야 하므로 [스마트 계약 컴파일](/developers/docs/smart-contracts/compiling/)에 대해 읽어보시기 바랍니다.

## 스마트 계약 배포 방법 {#how-to-deploy-a-smart-contract}

### 필요한 것 {#what-youll-need}

- 계약의 바이트코드 – [컴파일](/developers/docs/smart-contracts/compiling/)을 통해 생성됩니다.
- 가스비(이더) - 일반 거래처럼 가스 한도를 설정이 필요합니다. 그러나 일반 거래보다는 계약 배포가 더 많은 가스 한도를 설정하십시오.
- 배포 스크립트 또는 플러그인
- 자체 노드 실행, 공용 노드 연결, 또는 [노드 서비스](/developers/docs/nodes-and-clients/nodes-as-a-service/)의 API 키를 통한 [이더리움 노드](/developers/docs/nodes-and-clients/) 액세스

### 스마트 계약 배포 단계 {#steps-to-deploy}

구체적인 단계는 개발 프레임워크에 따라 다릅니다. 예를 들어, [계약 배포에 관한 Hardhat 문서](https://hardhat.org/docs/tutorial/deploying) 또는 [스마트 계약 배포 및 검증에 관한 Foundry 문서](https://book.getfoundry.sh/forge/deploying)를 확인할 수 있습니다. 배포되면 계약은 다른 [계정](/developers/docs/accounts/)과 마찬가지로 이더리움 주소를 갖게 되며, [소스 코드 검증 도구](/developers/docs/smart-contracts/verifying/#source-code-verification-tools)를 사용하여 확인할 수 있습니다.

## 관련 도구 {#related-tools}

**Remix - _Remix IDE는 이더리움과 같은 블록체인을 위한 스마트 계약을 개발, 배포 및 관리할 수 있도록 지원합니다_**

- [Remix](https://remix.ethereum.org)

**Tenderly - _스마트 계약을 개발, 테스트, 모니터링, 운영하기 위한 디버깅, 관찰 가능성 및 인프라 구성 요소를 제공하는 Web3 개발 플랫폼_**

- [tenderly.co](https://tenderly.co/)
- [문서](https://docs.tenderly.co/)
- [GitHub](https://github.com/Tenderly)
- [Discord](https://discord.gg/eCWjuvt)

**Hardhat - _이더리움 소프트웨어를 컴파일, 배포, 테스트 및 디버그할 수 있는 개발 환경_**

- [hardhat.org](https://hardhat.org/getting-started/)
- [계약 배포에 관한 문서](https://hardhat.org/docs/tutorial/deploying)
- [GitHub](https://github.com/nomiclabs/hardhat)
- [Discord](https://discord.com/invite/TETZs2KK4k)

**thirdweb - _단일 명령어로 모든 EVM 호환 체인에 계약을 쉽게 배포하세요_**

- [문서](https://portal.thirdweb.com/deploy/)

**Crossmint - _엔터프라이즈급 웹3 개발 플랫폼으로 스마트 계약을 배포하고, 신용카드 및 크로스체인 결제를 활성화하며, API를 사용하여 NFT를 생성, 배포, 판매, 저장 및 편집할 수 있습니다._**

- [crossmint.com](https://www.crossmint.com)
- [개발문서](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)
- [블로그](https://blog.crossmint.com)

## 관련 튜토리얼 {#related-tutorials}

- [첫 번째 스마트 계약 배포하기](/developers/tutorials/deploying-your-first-smart-contract/) _– 이더리움 테스트넷에 첫 번째 스마트 계약을 배포하는 방법을 소개합니다._
- [Hello World | 스마트 계약 튜토리얼](/developers/tutorials/hello-world-smart-contract/) _– 이더리움에 기본적인 스마트 계약을 생성 및 배포하는, 따라하기 쉬운 튜토리얼입니다._
- [Solidity에서 다른 계약과 상호작용하기](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– 기존 계약에서 스마트 계약을 배포하고 상호작용하는 방법입니다._
- [계약 크기 줄이는 방법](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _- 계약 크기를 제한 아래로 줄여 가스를 절약하는 방법_

## 더 읽어보기 {#further-reading}

- [https://docs.openzeppelin.com/learn/deploying-and-interacting](https://docs.openzeppelin.com/learn/deploying-and-interacting) - _OpenZeppelin_
- [Hardhat으로 계약 배포하기](https://hardhat.org/docs/tutorial/deploying) - _Nomic Labs_

_도움이 되었던 커뮤니티 참고 자료를 알고 계신가요? 이 페이지를 편집해서 추가하세요!_

## 관련 주제 {#related-topics}

- [개발 프레임워크](/developers/docs/frameworks/)
- [이더리움 노드 실행하기](/developers/docs/nodes-and-clients/run-a-node/)
- [서비스형 노드](/developers/docs/nodes-and-clients/nodes-as-a-service)
