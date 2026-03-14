---
title: "디앱 개발 프레임워크"
description: "프레임워크 사용 시의 장점을 알아보고 가능한 옵션들을 비교해 봅니다."
lang: ko
---

## 프레임워크 소개 {#introduction-to-frameworks}

온전한 형태의 디앱을 구축하려면 서로 다른 여러 기술들이 필요합니다. 소프트웨어 프레임워크는 필요한 기능을 많이 포함하거나 사용자가 원하는 도구를 찾도록 도와주는 다루기 쉬운 플러그인 시스템을 제공합니다.

프레임워크에는 다음과 같이 추가 작업 없이 바로 사용할 수 있는 기능들이 있습니다.

- 로컬 블록체인 인스턴스를 스핀업하기 위한 기능.
- 스마트 계약을 컴파일하고 테스트하기 위한 유틸리티.
- 동일한 프로젝트/리포지토리 내에서 사용자 대상 애플리케이션을 빌드하기 위한 클라이언트 개발 애드온.
- 로컬에서 실행되는 인스턴스 또는 이더리움 공개 네트워크 중 하나에 이더리움 네트워크를 연결하고 컨트랙트를 배포하기 위한 구성입니다.
- 탈중앙화 앱 배포 - IPFS와 같은 스토리지 옵션과의 통합.

## 필수 구성 요소 {#prerequisites}

프레임워크를 시작하기 전에 [탈중앙화앱](/developers/docs/dapps/)과 [이더리움 스택](/developers/docs/ethereum-stack/)에 대한 소개를 먼저 읽어보시는 것을 권장합니다.

## 사용 가능한 프레임워크 {#available-frameworks}

**Foundry** - **_Foundry는 이더리움 애플리케이션 개발을 위한 매우 빠르고, 이식성이 뛰어나며 모듈화된 툴킷입니다_**

- [Foundry 설치](https://book.getfoundry.sh/)
- [Foundry 북](https://book.getfoundry.sh/)
- [텔레그램의 Foundry 커뮤니티 채팅](https://t.me/foundry_support)
- [Awesome Foundry](https://github.com/crisgarner/awesome-foundry)

**Hardhat -** **_전문가를 위한 이더리움 개발 환경입니다._**

- [hardhat.org](https://hardhat.org)
- [GitHub](https://github.com/nomiclabs/hardhat)

**Ape -** **_Python 개발자, 데이터 과학자, 보안 전문가를 위한 스마트 컨트랙트 개발 도구입니다._**

- [문서](https://docs.apeworx.io/ape/stable/)
- [GitHub](https://github.com/ApeWorX/ape)

**Web3j -** **_JVM에서 블록체인 애플리케이션을 개발하기 위한 플랫폼입니다._**

- [홈페이지](https://www.web3labs.com/web3j-sdk)
- [문서](https://docs.web3j.io)
- [GitHub](https://github.com/web3j/web3j)

**ethers-kt -** **_EVM 기반 블록체인을 위한 비동기, 고성능 Kotlin/Java/Android 라이브러리입니다._**

- [GitHub](https://github.com/Kr1ptal/ethers-kt)
- [예제](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [Discord](https://discord.gg/rx35NzQGSb)

**Create Eth App -** **_명령어 하나로 이더리움 기반 앱을 만드세요. UI 프레임워크와 DeFi 템플릿의 다양한 선택지를 제공합니다._**

- [GitHub](https://github.com/paulrberg/create-eth-app)
- [템플릿](https://github.com/PaulRBerg/create-eth-app/tree/develop/templates)

**Scaffold-Eth -** **_Ethers.js + Hardhat + web3용 React 컴포넌트 및 후크: 스마트 컨트랙트로 구동되는 탈중앙화 애플리케이션 구축을 시작하는 데 필요한 모든 것을 제공합니다._**

- [GitHub](https://github.com/scaffold-eth/scaffold-eth-2)

**Tenderly -** **_블록체인 개발자가 스마트 컨트랙트를 빌드, 테스트, 디버그, 모니터링 및 운영하고 dapp UX를 개선할 수 있도록 지원하는 Web3 개발 플랫폼입니다._**

- [웹사이트](https://tenderly.co/)
- [문서](https://docs.tenderly.co/)

**The Graph -** **_블록체인 데이터를 효율적으로 쿼리하기 위한 The Graph입니다._**

- [웹사이트](https://thegraph.com/)
- [튜토리얼](/developers/tutorials/the-graph-fixing-web3-data-querying/)

**Alchemy -** **_이더리움 개발 플랫폼입니다._**

- [alchemy.com](https://www.alchemy.com/)
- [GitHub](https://github.com/alchemyplatform)
- [Discord](https://discord.com/invite/alchemyplatform)

**NodeReal -** **_이더리움 개발 플랫폼입니다._**

- [Nodereal.io](https://nodereal.io/)
- [GitHub](https://github.com/node-real)
- [Discord](https://discord.gg/V5k5gsuE)

**thirdweb SDK -** **_강력한 SDK와 CLI를 사용하여 스마트 컨트랙트와 상호 작용할 수 있는 web3 애플리케이션을 빌드하세요._**

- [문서](https://portal.thirdweb.com/sdk/)
- [GitHub](https://github.com/thirdweb-dev/)

**Chainstack -** **_Web3(이더리움 및 기타) 개발 플랫폼입니다._**

- [chainstack.com](https://www.chainstack.com/)
- [GitHub](https://github.com/chainstack)
- [Discord](https://discord.gg/BSb5zfp9AT)

**Crossmint -** **_모든 주요 EVM 체인(및 기타)에서 NFT 애플리케이션을 빌드할 수 있는 엔터프라이즈급 web3 개발 플랫폼입니다._**

- [웹사이트](https://www.crossmint.com)
- [개발문서](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)

**Brownie -** **_Python 기반 개발 환경 및 테스트 프레임워크입니다._**

- [문서](https://eth-brownie.readthedocs.io/en/latest/)
- [GitHub](https://github.com/eth-brownie/brownie)
- **Brownie는 현재 유지보수되지 않습니다**

**OpenZeppelin SDK -** **_궁극의 스마트 컨트랙트 툴킷: 스마트 컨트랙트를 개발, 컴파일, 업그레이드, 배포하고 상호작용하는 데 도움이 되는 도구 모음입니다._**

- [OpenZeppelin Defender SDK](https://docs.openzeppelin.com/defender/sdk)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-sdk)
- [커뮤니티 포럼](https://forum.openzeppelin.com/c/support/17)
- **OpenZeppelin SDK 개발이 종료되었습니다**

**Catapulta -** **_다중 체인 스마트 컨트랙트 배포 도구로, 블록 탐색기에서 검증을 자동화하고 배포된 스마트 컨트랙트를 추적하며 배포 보고서를 공유합니다. Foundry 및 Hardhat 프로젝트를 위한 플러그 앤 플레이 방식입니다._**

- [웹사이트](https://catapulta.sh/)
- [문서](https://catapulta.sh/docs)
- [GitHub](https://github.com/catapulta-sh)

**GoldRush(Covalent 제공) -** **_GoldRush는 개발자, 분석가, 기업을 위한 가장 포괄적인 블록체인 데이터 API 제품군을 제공합니다. 디파이 대시보드, 지갑, 트레이딩 봇, AI 에이전트 또는 규정 준수 플랫폼을 구축하는 경우, 데이터 API는 필요한 필수 온체인 데이터에 빠르고 정확하며 개발자 친화적인 액세스를 제공합니다_**

- [웹사이트](https://goldrush.dev/)
- [문서](https://goldrush.dev/docs/chains/ethereum)
- [GitHub](https://github.com/covalenthq)
- [Discord](https://www.covalenthq.com/discord/)

**Wake -** **_컨트랙트 테스트, 퍼징, 배포, 취약점 스캐닝, 코드 탐색을 위한 올인원 Python 프레임워크입니다._**

- [홈페이지](https://getwake.io/)
- [문서](https://ackeeblockchain.com/wake/docs/latest/)
- [GitHub](https://github.com/Ackee-Blockchain/wake)
- [VS Code 확장 프로그램](https://marketplace.visualstudio.com/items?itemName=AckeeBlockchain.tools-for-solidity)

**Veramo -** **_탈중앙화 애플리케이션 개발자가 자신의 애플리케이션에 탈중앙화 신원 및 검증 가능한 자격 증명을 쉽게 구축할 수 있도록 지원하는 오픈 소스, 모듈식, 독립 프레임워크입니다._**

- [홈페이지](https://veramo.io/)
- [문서](https://veramo.io/docs/basics/introduction)
- [GitHub](https://github.com/uport-project/veramo)
- [Discord](https://discord.com/invite/FRRBdjemHV)
- [NPM 패키지](https://www.npmjs.com/package/@veramo/core)

## 더 읽어보기 {#further-reading}

_도움이 되었던 커뮤니티 참고 자료를 알고 계신가요? 이 페이지를 편집해서 추가하세요!_

## 관련 주제 {#related-topics}

- [로컬 개발 환경 설정](/developers/local-environment/)
