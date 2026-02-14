---
title: "백엔드 API 라이브러리"
description: "사용자의 애플리케이션에서 블록체인과 상호작용 할 수 있는 이더리움 클라이언트 API에 대한 소개."
lang: ko
---

소프트웨어 애플리케이션이 이더리움 블록체인과 상호작용하려면(즉, 블록체인 데이터를 읽거나 네트워크에 트랜잭션을 보내려면) 이더리움 노드에 연결해야 합니다.

이러한 목적을 위해 모든 이더리움 클라이언트는 [JSON-RPC](/developers/docs/apis/json-rpc/) 사양을 구현하므로 애플리케이션이 의존할 수 있는 통일된 [메서드](/developers/docs/apis/json-rpc/#json-rpc-methods) 세트가 있습니다.

특수 프로그래밍 언어를 사용하여 이더리움 노드과 연결하려는 경우, 생태계 내부에 이러한 작업을 훨씬 용이하게 하는 편리한 라이브러리가 많이 있습니다. 개발자는 이러한 라이브러리를 사용하여 이더리움과 상호작용하는 JSON-RPC 요청(후드 아래)을 초기화하는 직관적인 단일 방법을 작성할 수 있습니다.

## 필수 구성 요소 {#prerequisites}

[이더리움 스택](/developers/docs/ethereum-stack/)과 [이더리움 클라이언트](/developers/docs/nodes-and-clients/)를 이해하면 도움이 될 수 있습니다.

## 라이브러리를 왜 사용할까요? {#why-use-a-library}

이러한 라이브러리는 이더리움 노드와 직접적으로 상호작용하는 많은 복잡성을 일반화합니다. 또한 유틸리티 함수(예: ETH를 Gwei로 변환)도 제공하므로 개발자는 이더리움 클라이언트의 복잡성을 처리하는 데 시간을 덜 들이고 애플리케이션의 고유 기능에 더 집중할 수 있습니다.

## 사용 가능한 라이브러리 {#available-libraries}

### 인프라 및 노드 서비스 {#infrastructure-and-node-services}

**Alchemy -** **_이더리움 개발 플랫폼입니다._**

- [alchemy.com](https://www.alchemy.com/)
- [개발문서](https://www.alchemy.com/docs/)
- [GitHub](https://github.com/alchemyplatform)
- [Discord](https://discord.com/invite/alchemyplatform)

**All That Node -** **_서비스형 노드._**

- [All That Node.com](https://www.allthatnode.com/)
- [개발문서](https://docs.allthatnode.com)
- [Discord](https://discord.gg/GmcdVEUbJM)

**Blast by Bware Labs -** **_이더리움 메인넷 및 테스트넷을 위한 탈중앙화 API._**

- [blastapi.io](https://blastapi.io/)
- [개발문서](https://docs.blastapi.io)
- [Discord](https://discord.gg/SaRqmRUjjQ)

**BlockPi -** **_보다 효율적이고 빠른 RPC 서비스 제공_**

- [blockpi.io](https://blockpi.io/)
- [개발문서](https://docs.blockpi.io/)
- [GitHub](https://github.com/BlockPILabs)
- [Discord](https://discord.com/invite/xTvGVrGVZv)

\*\* Cloudflare Ethereum 게이트웨이. \*\*

- [cloudflare-eth.com](https://www.cloudflare.com/application-services/products/web3/)

**Etherscan - 블록 탐색기 및 거래 API**

- [개발문서](https://docs.etherscan.io/)

**Blockscout - 오픈소스 블록 탐색기**

- [개발문서](https://docs.blockscout.com/)

**GetBlock-** **_Web3 개발을 위한 서비스형 블록체인_**

- [GetBlock.io](https://getblock.io/)
- [개발문서](https://docs.getblock.io/)

**Infura -** **_서비스형 이더리움 API._**

- [infura.io](https://infura.io)
- [개발문서](https://docs.infura.io/api)
- [GitHub](https://github.com/INFURA)

**Node RPC - _저비용의 EVM JSON-RPC 제공업체_**

- [noderpc.xyz](https://www.noderpc.xyz/)
- [개발문서](https://docs.noderpc.xyz/node-rpc)

**NOWNodes - _풀노드 및 블록 탐색기._**

- [NOWNodes.io](https://nownodes.io/)
- [개발문서](https://nownodes.gitbook.io/documentation)

**QuickNode -** **_서비스형 블록체인 인프라._**

- [quicknode.com](https://quicknode.com)
- [개발문서](https://www.quicknode.com/docs/welcome)
- [Discord](https://discord.gg/quicknode)

**Rivet -** **_오픈소스 소프트웨어로 구동되는 서비스형 이더리움 및 이더리움 클래식 API._**

- [rivet.cloud](https://rivet.cloud)
- [개발문서](https://rivet.cloud/docs/)
- [GitHub](https://github.com/openrelayxyz/ethercattle-deployment)

**Zmok -** **_속도 중심의 이더리움 노드인 JSON-RPC/WebSockets API._**

- [zmok.io](https://zmok.io/)
- [GitHub](https://github.com/zmok-io)
- [개발문서](https://docs.zmok.io/)
- [Discord](https://discord.gg/fAHeh3ka6s)

### 개발 도구 {#development-tools}

**ethers-kt -** **_EVM 기반 블록체인을 위한 비동기, 고성능 Kotlin/Java/Android 라이브러리입니다._**

- [GitHub](https://github.com/Kr1ptal/ethers-kt)
- [예제](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [Discord](https://discord.gg/rx35NzQGSb)

**Nethereum -** **_블록체인을 위한 오픈소스 .NET 통합 라이브러리._**

- [GitHub](https://github.com/Nethereum/Nethereum)
- [개발문서](http://docs.nethereum.com/en/latest/)
- [Discord](https://discord.com/invite/jQPrR58FxX)

**Python Tooling -** **_Python을 통해 이더리움과 상호작용하기 위한 다양한 라이브러리._**

- [py.ethereum.org](https://snakecharmers.ethereum.org/)
- [web3.py GitHub](https://github.com/ethereum/web3.py)
- [web3.py Chat](https://gitter.im/ethereum/web3.py)

**Tatum -** **_최고의 블록체인 개발 플랫폼._**

- [Tatum](https://tatum.io/)
- [GitHub](https://github.com/tatumio/)
- [개발문서](https://docs.tatum.io/)
- [Discord](https://discord.gg/EDmW3kjTC9)

**web3j -** **_이더리움을 위한 Java/Android/Kotlin/Scala 통합 라이브러리._**

- [GitHub](https://github.com/web3j/web3j)
- [개발문서](https://docs.web3j.io/)
- [Gitter](https://gitter.im/web3j/web3j)

### 블록체인 서비스 {#blockchain-services}

**BlockCypher -** **_이더리움 웹 API._**

- [blockcypher.com](https://www.blockcypher.com/)
- [개발문서](https://www.blockcypher.com/dev/ethereum/)

**Chainbase -** **_이더리움을 위한 올인원 web3 데이터 인프라._**

- [chainbase.com](https://chainbase.com/)
- [개발문서](https://docs.chainbase.com/)
- [Discord](https://discord.gg/Wx6qpqz4AF)

**Chainstack -** **_서비스형 탄력적 및 전용 이더리움 노드._**

- [chainstack.com](https://chainstack.com)
- [개발문서](https://docs.chainstack.com/)
- [이더리움 API 레퍼런스](https://docs.chainstack.com/reference/ethereum-getting-started)

**Coinbase Cloud Node -** **_블록체인 인프라 API._**

- [Coinbase Cloud Node](https://www.coinbase.com/developer-platform)
- [개발문서](https://docs.cdp.coinbase.com/)

**DataHub by Figment -** **_이더리움 메인넷 및 테스트넷을 갖춘 Web3 API 서비스._**

- [DataHub](https://www.figment.io/)
- [개발문서](https://docs.figment.io/)

**Moralis -** **_엔터프라이즈급 EVM API 제공업체._**

- [moralis.io](https://moralis.io)
- [개발문서](https://docs.moralis.io/)
- [GitHub](https://github.com/MoralisWeb3)
- [Discord](https://moralis.io/joindiscord/)
- [포럼](https://forum.moralis.io/)

**NFTPort -** **_이더리움 데이터 및 민팅 API._**

- [nftport.xyz](https://www.nftport.xyz/)
- [개발문서](https://docs.nftport.xyz/)
- [GitHub](https://github.com/nftport/)
- [Discord](https://discord.com/invite/K8nNrEgqhE)

**Tokenview -** **_범용 멀티 암호화폐 블록체인 API 플랫폼._**

- [services.tokenview.io](https://services.tokenview.io/)
- [개발문서](https://services.tokenview.io/docs?type=api)
- [GitHub](https://github.com/Tokenview)

**Watchdata -** **_이더리움 블록체인에 간단하고 신뢰할 수 있는 API 액세스를 제공합니다._**

- [Watchdata](https://watchdata.io/)
- [개발문서](https://docs.watchdata.io/)
- [Discord](https://discord.com/invite/TZRJbZ6bdn)

**Covalent -** **_200개 이상의 체인을 위한 풍부한 기능의 블록체인 API._**

- [covalenthq.com](https://www.covalenthq.com/)
- [개발문서](https://www.covalenthq.com/docs/api/)
- [GitHub](https://github.com/covalenthq)
- [Discord](https://www.covalenthq.com/discord/)

## 더 읽어보기 {#further-reading}

_도움이 되었던 커뮤니티 참고 자료를 알고 계신가요? 이 페이지를 편집해서 추가하세요!_

## 관련 주제 {#related-topics}

- [노드 및 클라이언트](/developers/docs/nodes-and-clients/)
- [개발 프레임워크](/developers/docs/frameworks/)

## 관련 튜토리얼 {#related-tutorials}

- [JavaScript에서 이더리움 블록체인을 사용하도록 Web3js 설정하기](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– 프로젝트에 web3.js를 설정하는 방법에 대한 안내입니다._
- [JavaScript에서 스마트 계약 호출하기](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– DAI 토큰을 사용하여 JavaScript로 계약 함수를 호출하는 방법을 알아보세요._
