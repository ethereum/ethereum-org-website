---
title: "Go 개발자를 위한 이더리움"
description: "Go 기반 프로젝트 및 도구를 사용하여 이더리움용으로 개발하는 방법을 배워보세요."
lang: ko
incomplete: true
---

<FeaturedText>Go 기반 프로젝트 및 도구를 사용하여 이더리움용으로 개발하는 방법을 배워보세요.</FeaturedText>

이더리움을 사용하여 탈중앙화 애플리케이션 (dapp)을 만들어보세요. 이러한 dapp은 신뢰할 수 있으며, 이는 이더리움에 배포된 후에는 항상 프로그래밍된 대로 실행됨을 의미합니다. 또한 탈중앙화되어 있어 피어 투 피어 네트워크에서 실행되며 단일 장애점(single point of failure)이 없습니다. 단일 주체나 개인이 이를 제어할 수 없으며 검열이 거의 불가능합니다. 디지털 자산을 제어하여 새로운 종류의 애플리케이션을 만들 수 있습니다.

## 스마트 컨트랙트 및 Solidity 언어 시작하기 {#getting-started-with-smart-contracts-and-solidity}

**Go와 이더리움을 통합하기 위한 첫걸음을 내디뎌 보세요**

더 기본적인 입문서가 먼저 필요하신가요? [ethereum.org/learn](/learn/) 또는 [ethereum.org/developers](/developers/)를 확인해 보세요.

- [블록체인 설명](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [스마트 컨트랙트의 이해](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [첫 번째 스마트 컨트랙트 작성하기](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Solidity 컴파일 및 배포 방법 알아보기](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)
- [컨트랙트 튜토리얼](https://github.com/ethereum/go-ethereum/wiki/Contract-Tutorial)

## 초급자용 문서 및 도서 {#beginner-articles-and-books}

- [Geth 시작하기](https://medium.com/@tzhenghao/getting-started-with-geth-c1a30b8d6458)
- [Golang을 사용하여 이더리움에 연결하기](https://www.youtube.com/watch?v=-7uChuO_VzM)
- [Golang을 사용하여 이더리움 스마트 컨트랙트 배포하기](https://www.youtube.com/watch?v=pytGqQmDslE)
- [Go에서 이더리움 스마트 컨트랙트를 테스트하고 배포하기 위한 단계별 가이드](https://hackernoon.com/a-step-by-step-guide-to-testing-and-deploying-ethereum-smart-contracts-in-go-9fc34b178d78)
- [전자책: Go를 활용한 이더리움 개발](https://goethereumbook.org/) - _Go로 이더리움 애플리케이션 개발하기_

## 중급자용 문서 및 자료 {#intermediate-articles-and-docs}

- [고 이더리움 (geth) 공식 문서](https://geth.ethereum.org/docs) - _공식 이더리움 Golang 구현체에 대한 문서_
- [에리곤 프로그래머 가이드](https://github.com/ledgerwatch/erigon/blob/devel/docs/programmers_guide/guide.md) - _상태 트리, 다중 증명(multi-proofs) 및 트랜잭션 처리를 포함한 그림 가이드_
- [에리곤과 무상태(Stateless) 이더리움](https://youtu.be/3-Mn7OckSus?t=394) - _2020 이더리움 커뮤니티 컨퍼런스 (EthCC 3)_
- [에리곤: 이더리움 클라이언트 최적화](https://www.youtube.com/watch?v=CSpc1vZQW2Q) - _2018 데브콘 4 (Devcon 4)_
- [고 이더리움 (geth) GoDoc](https://godoc.org/github.com/ethereum/go-ethereum)
- [Geth를 사용하여 Go로 탈중앙화 애플리케이션 (dapp) 만들기](https://kauri.io/#collections/A%20Hackathon%20Survival%20Guide/creating-a-dapp-in-go-with-geth/)
- [Golang 및 Geth를 사용하여 이더리움 프라이빗 네트워크 작업하기](https://myhsts.org/tutorial-learn-how-to-work-with-ethereum-private-network-with-golang-with-geth.php)
- [Go를 사용하여 이더리움에서 Solidity 컨트랙트 단위 테스트하기](https://medium.com/coinmonks/unit-testing-solidity-contracts-on-ethereum-with-go-3cc924091281)
- [Geth를 라이브러리로 사용하기 위한 빠른 참조 가이드](https://medium.com/coinmonks/web3-go-part-1-31c68c68e20e)

## 고급 사용 패턴 {#advanced-use-patterns}

- [GETH 시뮬레이션 백엔드](https://kauri.io/#collections/An%20ethereum%20test%20toolkit%20in%20Go/the-geth-simulated-backend/#_top)
- [이더리움 및 Quorum을 사용한 서비스형 블록체인(BaaS) 앱](https://blockchain.dcwebmakers.com/blockchain-as-a-service-apps-using-ethereum-and-quorum.html)
- [이더리움 블록체인 애플리케이션의 분산 스토리지 IPFS 및 스웜](https://blockchain.dcwebmakers.com/work-with-distributed-storage-ipfs-and-swarm-in-ethereum.html)
- [모바일 클라이언트: 라이브러리 및 Inproc 이더리움 노드](https://github.com/ethereum/go-ethereum/wiki/Mobile-Clients:-Libraries-and-Inproc-Ethereum-Nodes)
- [네이티브 dapp: 이더리움 컨트랙트에 대한 Go 바인딩](https://github.com/ethereum/go-ethereum/wiki/Native-DApps:-Go-bindings-to-Ethereum-contracts)

## Go 프로젝트 및 도구 {#go-projects-and-tools}

- [Geth / 고 이더리움 (geth)](https://github.com/ethereum/go-ethereum) - _이더리움 프로토콜의 공식 Go 구현체_
- [고 이더리움 (geth) 코드 분석](https://github.com/ZtesoftCS/go-ethereum-code-analysis) - _고 이더리움 (geth) 소스 코드 리뷰 및 분석_
- [에리곤](https://github.com/ledgerwatch/erigon) - _아카이브 노드에 중점을 둔 고 이더리움 (geth)의 더 빠른 파생 버전_
- [골렘 (Golem)](https://github.com/golemfactory/golem) - _컴퓨팅 파워를 위한 글로벌 시장을 구축하는 골렘_
- [Quorum](https://github.com/jpmorganchase/quorum) - _데이터 프라이버시를 지원하는 이더리움의 허가형 구현체_
- [프리즘](https://github.com/prysmaticlabs/prysm) - _이더리움 '세레니티(Serenity)' 2.0 Go 구현체_
- [Eth Tweet](https://github.com/yep/eth-tweet) - _탈중앙화된 트위터: 이더리움 블록체인에서 실행되는 마이크로블로깅 서비스_
- [플라즈마 MVP Golang](https://github.com/kyokan/plasma) — _최소 기능 플라즈마(Minimum Viable Plasma) 사양의 Golang 구현 및 확장_
- [오픈 이더리움 채굴 풀](https://github.com/sammy007/open-ethereum-pool) - _오픈 소스 이더리움 채굴 풀_
- [이더리움 HD 지갑](https://github.com/miguelmota/go-ethereum-hdwallet) - _Go로 작성된 이더리움 HD 지갑 파생(derivations)_
- [멀티 Geth](https://github.com/multi-geth/multi-geth) - _다양한 종류의 이더리움 네트워크 지원_
- [Geth 경량 클라이언트](https://github.com/zsfelfoldi/go-ethereum/wiki/Geth-Light-Client) - _경량 이더리움 하위 프로토콜(Light Ethereum Subprotocol)의 Geth 구현체_
- [이더리움 Golang SDK](https://github.com/everFinance/goether) - _Golang으로 작성된 간단한 이더리움 지갑 구현 및 유틸리티_
- [Covalent Golang SDK](https://github.com/covalenthq/covalent-api-sdk-go) - _200개 이상의 블록체인을 위한 Go SDK를 통한 효율적인 블록체인 데이터 액세스_

더 많은 자료를 찾고 계신가요? [ethereum.org/developers](/developers/)를 확인해 보세요.

## Go 커뮤니티 기여자 {#go-community-contributors}

- [Geth 디스코드](https://discordapp.com/invite/nthXNEv)
- [Geth Gist](https://gitter.im/ethereum/go-ethereum)
- [Gophers 슬랙(Slack)](https://invite.slack.golangbridge.org/) - [#ethereum 채널](https://gophers.slack.com/messages/C9HP1S9V2)
- [스택익스체인지(StackExchange) - 이더리움](https://ethereum.stackexchange.com/)
- [멀티 Geth Gitter](https://gitter.im/ethoxy/multi-geth)
- [이더리움 Gitter](https://gitter.im/ethereum/home)
- [Geth 경량 클라이언트 Gitter](https://gitter.im/ethereum/light-client)

## 기타 종합 목록 {#other-aggregated-lists}

- [Awesome Ethereum](https://github.com/btomashvili/awesome-ethereum)
- [컨센시스: 이더리움 개발자 도구의 결정판 목록](https://web.archive.org/web/2023/https://media.consensys.net/an-definitive-list-of-ethereum-developer-tools-2159ce865974) | [GitHub 소스](https://github.com/ConsenSys/ethereum-developer-tools-list)