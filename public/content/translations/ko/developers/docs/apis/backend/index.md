---
title: 백엔드 API 라이브러리
description: 애플리케이션에서 블록체인과 상호 작용할 수 있게 해주는 이더리움 클라이언트 API에 대한 소개입니다.
lang: ko
---

소프트웨어 애플리케이션이 [이더리움](/) 블록체인과 상호 작용(예: 블록체인 데이터 읽기 및/또는 네트워크에 트랜잭션 전송)하려면 이더리움 노드에 연결해야 합니다.

이를 위해 모든 이더리움 클라이언트는 [JSON-RPC](/developers/docs/apis/json-rpc/) 사양을 구현하므로 애플리케이션이 의존할 수 있는 일관된 [메서드](/developers/docs/apis/json-rpc/#json-rpc-methods) 세트가 존재합니다.

특정 프로그래밍 언어를 사용하여 이더리움 노드에 연결하려는 경우, 생태계 내에 이를 훨씬 쉽게 만들어주는 다양한 편의 라이브러리가 있습니다. 개발자는 이러한 라이브러리를 사용하여 이더리움과 상호 작용하는 JSON-RPC 요청을 (내부적으로) 초기화하는 직관적인 한 줄짜리 메서드를 작성할 수 있습니다.

## 전제 조건 {#prerequisites}

[이더리움 스택](/developers/docs/ethereum-stack/) 및 [이더리움 클라이언트](/developers/docs/nodes-and-clients/)를 이해하면 도움이 될 수 있습니다.

## 라이브러리를 사용하는 이유 {#why-use-a-library}

이러한 라이브러리는 이더리움 노드와 직접 상호 작용하는 복잡성을 대부분 추상화합니다. 또한 유틸리티 함수(예: ETH를 Gwei로 변환)를 제공하므로 개발자는 이더리움 클라이언트의 복잡성을 다루는 데 드는 시간을 줄이고 애플리케이션의 고유한 기능에 더 많은 시간을 집중할 수 있습니다.

## 사용 가능한 라이브러리 {#available-libraries}

### 인프라 및 노드 서비스 {#infrastructure-and-node-services}

**Alchemy -** **_이더리움 개발 플랫폼._**

- [alchemy.com](https://www.alchemy.com/)
- [문서](https://www.alchemy.com/docs/)
- [GitHub](https://github.com/alchemyplatform)
- [디스코드](https://discord.com/invite/alchemyplatform)
  
**All That Node -** **_서비스형 노드(Node-as-a-Service)._**

- [All That Node.com](https://www.allthatnode.com/)
- [문서](https://docs.allthatnode.com)
- [디스코드](https://discord.gg/GmcdVEUbJM)

**Bware Labs의 Blast -** **_이더리움 메인넷 및 테스트넷을 위한 탈중앙화 API._**

- [blastapi.io](https://blastapi.io/)
- [문서](https://docs.blastapi.io)
- [디스코드](https://discord.gg/SaRqmRUjjQ)

**BlockPi -** **_더욱 효율적이고 빠른 RPC 서비스 제공_**

- [blockpi.io](https://blockpi.io/)
- [문서](https://docs.blockpi.io/)
- [GitHub](https://github.com/BlockPILabs)
- [디스코드](https://discord.com/invite/xTvGVrGVZv)

**Cloudflare 이더리움 게이트웨이.**

- [cloudflare-eth.com](https://www.cloudflare.com/application-services/products/web3/)

**Etherscan - 블록 탐색기 및 트랜잭션 API**
- [문서](https://docs.etherscan.io/)

**Blockscout - 오픈 소스 블록 탐색기**
- [문서](https://docs.blockscout.com/)

**GetBlock -** **_Web3 개발을 위한 서비스형 블록체인(Blockchain-as-a-service)_**

- [GetBlock.io](https://getblock.io/)
- [문서](https://docs.getblock.io/)

**Infura -** **_서비스형 이더리움 API._**

- [infura.io](https://infura.io)
- [문서](https://docs.infura.io/api)
- [GitHub](https://github.com/INFURA)

**Node RPC - _비용 효율적인 EVM JSON-RPC 제공자_**

- [noderpc.xyz](https://www.noderpc.xyz/)
- [문서](https://docs.noderpc.xyz/node-rpc)

**NOWNodes - _풀 노드 및 블록 탐색기._**

- [NOWNodes.io](https://nownodes.io/)
- [문서](https://nownodes.gitbook.io/documentation)

**QuickNode -** **_서비스형 블록체인 인프라._**

- [quicknode.com](https://quicknode.com)
- [문서](https://www.quicknode.com/docs/welcome)
- [디스코드](https://discord.gg/quicknode)

**Rivet -** **_오픈 소스 소프트웨어 기반의 서비스형 이더리움 및 이더리움 클래식 API._**

- [rivet.cloud](https://rivet.cloud)
- [문서](https://rivet.cloud/docs/)
- [GitHub](https://github.com/openrelayxyz/ethercattle-deployment)

**Zmok -** **_JSON-RPC/WebSockets API 형태의 속도 지향 이더리움 노드._**

- [zmok.io](https://zmok.io/)
- [GitHub](https://github.com/zmok-io)
- [문서](https://docs.zmok.io/)
- [디스코드](https://discord.gg/fAHeh3ka6s)

### 개발 도구 {#development-tools}

**ethers-kt -** **_EVM 기반 블록체인을 위한 비동기식 고성능 Kotlin/Java/Android 라이브러리._**

- [GitHub](https://github.com/Kr1ptal/ethers-kt)
- [예제](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [디스코드](https://discord.gg/rx35NzQGSb)

**Nethereum -** **_블록체인을 위한 오픈 소스 .NET 통합 라이브러리._**

- [GitHub](https://github.com/Nethereum/Nethereum)
- [문서](https://docs.nethereum.com/docs/getting-started/welcome/)
- [디스코드](https://discord.com/invite/jQPrR58FxX)

**Python 도구 -** **_Python을 통한 이더리움 상호 작용을 위한 다양한 라이브러리._**

- [py.ethereum.org](https://snakecharmers.ethereum.org/)
- [Web3.py GitHub](https://github.com/ethereum/web3.py)
- [Web3.py 채팅](https://gitter.im/ethereum/web3.py)

**Tatum -** **_최고의 블록체인 개발 플랫폼._**

- [Tatum](https://tatum.io/)
- [GitHub](https://github.com/tatumio/)
- [문서](https://docs.tatum.io/)
- [디스코드](https://discord.gg/EDmW3kjTC9)

**Web3j -** **_이더리움을 위한 Java/Android/Kotlin/Scala 통합 라이브러리._**

- [GitHub](https://github.com/web3j/web3j)
- [문서](https://docs.web3j.io/)
- [Gitter](https://gitter.im/web3j/web3j)

### 블록체인 서비스 {#blockchain-services}

**BlockCypher -** **_이더리움 웹 API._**

- [blockcypher.com](https://www.blockcypher.com/)
- [문서](https://www.blockcypher.com/dev/ethereum/)

**Chainbase -** **_이더리움을 위한 올인원 Web3 데이터 인프라._**

- [chainbase.com](https://chainbase.com/)
- [문서](https://docs.chainbase.com/)
- [디스코드](https://discord.gg/Wx6qpqz4AF)

**Chainstack -** **_서비스형 탄력적 및 전용 이더리움 노드._**

- [chainstack.com](https://chainstack.com)
- [문서](https://docs.chainstack.com/)
- [이더리움 API 참조](https://docs.chainstack.com/reference/ethereum-getting-started)

**코인베이스 클라우드 노드(Coinbase Cloud Node) -** **_블록체인 인프라 API._**

- [코인베이스 클라우드 노드](https://www.coinbase.com/developer-platform)
- [문서](https://docs.cdp.coinbase.com/)

**Figment의 DataHub -** **_이더리움 메인넷 및 테스트넷을 지원하는 Web3 API 서비스._**

- [DataHub](https://www.figment.io/)
- [문서](https://docs.figment.io/)

**Moralis -** **_엔터프라이즈급 EVM API 제공자._**

- [moralis.io](https://moralis.io)
- [문서](https://docs.moralis.io/)
- [GitHub](https://github.com/MoralisWeb3)
- [디스코드](https://moralis.io/joindiscord/)
- [포럼](https://forum.moralis.io/)

**NFTPort -** **_이더리움 데이터 및 발행 API._**

- [nftport.xyz](https://www.nftport.xyz/)
- [문서](https://docs.nftport.xyz/)
- [GitHub](https://github.com/nftport/)
- [디스코드](https://discord.com/invite/K8nNrEgqhE)

**Tokenview -** **_범용 다중 암호화폐 블록체인 API 플랫폼._**

- [services.tokenview.io](https://services.tokenview.io/)
- [문서](https://services.tokenview.io/docs?type=api)
- [GitHub](https://github.com/Tokenview)

**Watchdata -** **_이더리움 블록체인에 대한 간단하고 안정적인 API 액세스 제공._**

- [Watchdata](https://watchdata.io/)
- [문서](https://docs.watchdata.io/)
- [디스코드](https://discord.com/invite/TZRJbZ6bdn)

**Codex -** **_수십 개의 체인에 걸친 실시간의 풍부한 블록체인 데이터 API._**

- [codex.io](https://www.codex.io/)
- [문서](https://docs.codex.io)
- [탐색기](https://docs.codex.io/explore)
- [GitHub](https://github.com/Codex-Data)
- [디스코드](https://discord.com/invite/mFpUhT3vAq)

**Covalent -** **_200개 이상의 체인을 위한 풍부한 블록체인 API._**

- [covalenthq.com](https://www.covalenthq.com/)
- [문서](https://www.covalenthq.com/docs/api/)
- [GitHub](https://github.com/covalenthq)
- [디스코드](https://www.covalenthq.com/discord/)


## 더 읽어보기 {#further-reading}

_도움이 된 커뮤니티 리소스를 알고 계신가요? 이 페이지를 편집하여 추가해 주세요!_

## 관련 주제 {#related-topics}

- [노드 및 클라이언트](/developers/docs/nodes-and-clients/)
- [개발 프레임워크](/developers/docs/frameworks/)

## 관련 튜토리얼 {#related-tutorials}

- [JavaScript에서 이더리움 블록체인을 사용하기 위한 Web3.js 설정](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– 프로젝트에 Web3.js를 설정하는 방법에 대한 지침입니다._
- [JavaScript에서 스마트 컨트랙 호출하기](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– DAI 토큰을 사용하여 JavaScript로 컨트랙트 함수를 호출하는 방법을 알아봅니다._