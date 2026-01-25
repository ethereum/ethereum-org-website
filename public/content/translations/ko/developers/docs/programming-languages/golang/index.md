---
title: Go 개발자를 위한 이더리움
description: Go 기반 프로젝트 및 툴링을 사용한 이더리움 개발 방법 알아보기
lang: ko
incomplete: true
---

<FeaturedText>Go 기반 프로젝트와 툴링을 사용하여 이더리움용으로 개발하는 방법을 알아보세요.</FeaturedText>

이더리움을 통한 탈중앙화 애플리케이션 (또는 디앱) 개발하기. 탈중앙화 애플리케이션은 일단 이더리움에 배포되면 항상 프로그래밍된 대로 동작하므로 완전히 신뢰할 수 있습니다. 탈중앙화되었다라는 것은 서비스가 중단되지 않는 다수의 노드가 연결된 네크워크 망에서의 동작을 의미합니다. 상태를 검열할 수 있는 어떤 단체나 개인도 없습니다. 새로운 유형의 애플리케이션을 제작하기 위해 디지털 자산을 사용할 수 있습니다.

## 스마트 계약 및 솔리디티 언어 시작하기 {#getting-started-with-smart-contracts-and-solidity}

**Go와 이더리움을 통합하기 위한 첫 단계**

먼저 기본 지식이 더 필요하시나요? [ethereum.org/learn](/learn/) 또는 [ethereum.org/developers](/developers/)를 확인해 보세요.

- [블록체인 설명](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [스마트 계약 이해하기](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [첫 스마트 계약 작성하기](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [솔리디티 컴파일 및 배포 방법 알아보기](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)
- [계약 튜토리얼](https://github.com/ethereum/go-ethereum/wiki/Contract-Tutorial)

## 초보자용 아티클 및 서적 {#beginner-articles-and-books}

- [Geth 시작하기](https://medium.com/@tzhenghao/getting-started-with-geth-c1a30b8d6458)
- [Golang을 사용하여 이더리움에 연결하기](https://www.youtube.com/watch?v=-7uChuO_VzM)
- [Golang을 사용하여 이더리움 스마트 계약 배포하기](https://www.youtube.com/watch?v=pytGqQmDslE)
- [Go로 이더리움 스마트 계약을 테스트하고 배포하는 단계별 가이드](https://hackernoon.com/a-step-by-step-guide-to-testing-and-deploying-ethereum-smart-contracts-in-go-9fc34b178d78)
- [eBook: Go를 사용한 이더리움 개발](https://goethereumbook.org/) - _Go를 사용하여 이더리움 애플리케이션을 개발합니다_

## 중급자용 아티클 및 문서 {#intermediate-articles-and-docs}

- [Go 이더리움 개발 문서](https://geth.ethereum.org/docs/) - _Go 언어를 사용한 공식 이더리움 개발 문서_
- [Erigon 프로그래머 가이드](https://github.com/ledgerwatch/erigon/blob/devel/docs/programmers_guide/guide.md) - _상태 트리, 다중 증명 및 트랜잭션 처리를 포함한 그림 설명 가이드_
- [Erigon과 무상태 이더리움](https://youtu.be/3-Mn7OckSus?t=394) - _2020 이더리움 커뮤니티 콘퍼런스(EthCC 3)_
- [Erigon: 이더리움 클라이언트 최적화](https://www.youtube.com/watch?v=CSpc1vZQW2Q) - _2018 Devcon 4_
- [Go 이더리움 GoDoc](https://godoc.org/github.com/ethereum/go-ethereum)
- [Geth와 Go로 디앱 만들기](https://kauri.io/#collections/A%20Hackathon%20Survival%20Guide/creating-a-dapp-in-go-with-geth/)
- [Golang 및 Geth를 사용하여 이더리움 프라이빗 네트워크와 작업하기](https://myhsts.org/tutorial-learn-how-to-work-with-ethereum-private-network-with-golang-with-geth.php)
- [Go를 사용하여 이더리움에서 솔리디티 계약 단위 테스트하기](https://medium.com/coinmonks/unit-testing-solidity-contracts-on-ethereum-with-go-3cc924091281)
- [Geth를 라이브러리로 사용하기 위한 빠른 참조](https://medium.com/coinmonks/web3-go-part-1-31c68c68e20e)

## 고급 사용 패턴 {#advanced-use-patterns}

- [GETH 시뮬레이션된 백엔드](https://kauri.io/#collections/An%20ethereum%20test%20toolkit%20in%20Go/the-geth-simulated-backend/#_top)
- [이더리움 및 Quorum을 사용한 서비스형 블록체인 앱](https://blockchain.dcwebmakers.com/blockchain-as-a-service-apps-using-ethereum-and-quorum.html)
- [이더리움 블록체인 애플리케이션의 분산 스토리지 IPFS 및 Swarm](https://blockchain.dcwebmakers.com/work-with-distributed-storage-ipfs-and-swarm-in-ethereum.html)
- [모바일 클라이언트: 라이브러리 및 Inproc 이더리움 노드](https://github.com/ethereum/go-ethereum/wiki/Mobile-Clients:-Libraries-and-Inproc-Ethereum-Nodes)
- [네이티브 디앱스: 이더리움 계약에 대한 Go 바인딩](https://github.com/ethereum/go-ethereum/wiki/Native-DApps:-Go-bindings-to-Ethereum-contracts)

## Go 프로젝트 및 도구 {#go-projects-and-tools}

- [Geth / Go 이더리움](https://github.com/ethereum/go-ethereum) - _이더리움 프로토콜의 공식 Go 구현체_
- [Go 이더리움 코드 분석](https://github.com/ZtesoftCS/go-ethereum-code-analysis) - _Go 이더리움 소스 코드 검토 및 분석_
- [Erigon](https://github.com/ledgerwatch/erigon) - _아카이브 노드에 중점을 둔 더 빠른 Go 이더리움 파생 클라이언트_
- [Golem](https://github.com/golemfactory/golem) - _Golem은 컴퓨팅 파워를 위한 글로벌 시장을 만들고 있습니다_
- [Quorum](https://github.com/jpmorganchase/quorum) - _데이터 개인 정보 보호를 지원하는 허가형 이더리움 구현체_
- [Prysm](https://github.com/prysmaticlabs/prysm) - _이더리움 '세레니티' 2.0 Go 구현체_
- [Eth Tweet](https://github.com/yep/eth-tweet) - _탈중앙화된 트위터: 이더리움 블록체인에서 실행되는 마이크로블로깅 서비스_
- [Plasma MVP Golang](https://github.com/kyokan/plasma) — _최소 실행 가능 플라즈마(Minimum Viable Plasma) 사양의 Golang 구현 및 확장_
- [오픈 이더리움 채굴 풀](https://github.com/sammy007/open-ethereum-pool) - _오픈 소스 이더리움 채굴 풀_
- [이더리움 HD 지갑](https://github.com/miguelmota/go-ethereum-hdwallet) - _Go의 이더리움 HD 지갑 파생_
- [Multi Geth](https://github.com/multi-geth/multi-geth) - _다양한 종류의 이더리움 네트워크 지원_
- [Geth 라이트 클라이언트](https://github.com/zsfelfoldi/go-ethereum/wiki/Geth-Light-Client) - _라이트 이더리움 하위 프로토콜의 Geth 구현체_
- [Ethereum Golang SDK](https://github.com/everFinance/goether) - _Golang의 간단한 이더리움 지갑 구현 및 유틸리티_
- [Covalent Golang SDK](https://github.com/covalenthq/covalent-api-sdk-go) - _200개 이상의 블록체인을 위한 Go SDK를 통한 효율적인 블록체인 데이터 접근_

더 많은 참고 자료를 확인하고 싶으신가요? [ethereum.org/developers](/developers/)를 확인해 보세요

## Go 커뮤니티 기여자 {#go-community-contributors}

- [Geth 디스코드](https://discordapp.com/invite/nthXNEv)
- [Geth Gist](https://gitter.im/ethereum/go-ethereum)
- [Gophers 슬랙](https://invite.slack.golangbridge.org/) - [#ethereum 채널](https://gophers.slack.com/messages/C9HP1S9V2)
- [StackExchange - 이더리움](https://ethereum.stackexchange.com/)
- [Multi Geth Gitter](https://gitter.im/ethoxy/multi-geth)
- [이더리움 Gitter](https://gitter.im/ethereum/home)
- [Geth 라이트 클라이언트 Gitter](https://gitter.im/ethereum/light-client)

## 기타 수집된 목록 {#other-aggregated-lists}

- [Awesome Ethereum](https://github.com/btomashvili/awesome-ethereum)
- [Consensys: 이더리움 개발자 도구 최종 목록](https://media.consensys.net/an-definitive-list-of-ethereum-developer-tools-2159ce865974) | [GitHub 소스](https://github.com/ConsenSys/ethereum-developer-tools-list)
