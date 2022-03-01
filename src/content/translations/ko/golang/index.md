---
title: Go 개발자를 위한 이더리움
description: Go 기반 프로젝트 및 툴링을 사용한 이더리움 개발 방법 알아보기
lang: ko
sidebar: true
sidebarDepth: 1
---

# Go 개발자를 위한 이더리움 {#ethereum-for-go-devs}

<div class="featured">Go 기반 프로젝트 및 툴링을 사용한 이더리움 개발 방법 알아보기</div>

이더리움 기반으로 개발된 탈중앙화 애플리케이션(또는 “디앱”)은 암호화폐와 블록체인 기술의 장점을 가지게 됩니다. 탈중앙화 애플리케이션은 일단 이더리움에 배포되면 항상 프로그래밍된 대로 동작하므로 완전히 신뢰할 수 있습니다. 그러므로 새로운 형태의 금융 애플리케이션을 제작하기 위해 디지털 자산을 제어하는 데 사용될 수 있습니다. 그뿐만 아니라 해당 금융 애플리케이션을 어떤 특정 단체나 개인이 제어할 수 없고 검열이 거의 불가능하도록 탈중앙화할 수 있습니다.

<img src="https://i.imgur.com/MFg8Nop.png" width="100%" />

## 스마트 컨트랙트 시작하기 및 솔리디티 언어 {#getting-started-with-smart-contracts-and-solidity}

**Go와 이더리움을 통합하기 위한 첫 단계**

먼저 기본 지식이 더 필요하시나요? [ethereum.org/learn](/ko/learn/) 또는 [ethereum.org/developers](/ko/developers/)를 확인해 보세요.

- [블록체인에 관한 설명](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [스마트 컨트랙트 이해하기](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [처음으로 스마트 컨트랙트 작성하기](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [솔리디티 컴파일 및 배포 방법 알아보기](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)
- [컨트랙트 튜토리얼](https://github.com/ethereum/go-ethereum/wiki/Contract-Tutorial)

## 입문자용 문서 및 도서 {#beginner-articles-and-books}

- [이더리움 클라이언트 선택하기](https://www.trufflesuite.com/docs/truffle/reference/choosing-an-ethereum-client)
- [게스(Geth) 시작하기](https://medium.com/@tzhenghao/getting-started-with-geth-c1a30b8d6458)
- [Go 언어를 사용하여 이더리움에 연결하기](https://www.youtube.com/watch?v=-7uChuO_VzM)
- [Go 언어를 사용하여 이더리움 스마트 컨트랙트 배포하기](https://www.youtube.com/watch?v=pytGqQmDslE)
- [Go로 작성된 이더리움 스마트 컨트랙트의 단계별 테스트 및 배포 가이드](https://hackernoon.com/a-step-by-step-guide-to-testing-and-deploying-ethereum-smart-contracts-in-go-9fc34b178d78)
- [eBook: Go를 사용한 이더리움 개발](https://goethereumbook.org/) - _Go를 사용하여 이더리움 애플리케이션 개발하기_

## 중급자용 문서 및 도서 {#intermediate-articles-and-docs}

- [Go 이더리움 개발 문서](https://geth.ethereum.org/docs/) - _Go 언어를 사용한 공식 이더리움 개발 문서_
- [Go 이더리움 GoDoc](https://godoc.org/github.com/ethereum/go-ethereum)
- [게스(Geth)를 사용하여 Go로 디앱 제작](https://kauri.io/#collections/A%20Hackathon%20Survival%20Guide/creating-a-dapp-in-go-with-geth/)
- [Go 언어 및 게스(Geth)를 사용하여 이더리움 비공개 네트워크 지원](https://myhsts.org/tutorial-learn-how-to-work-with-ethereum-private-network-with-golang-with-geth.php)
- [Go를 사용하여 이더리움 기반 솔리디티 컨트랙트 유닛 테스트](https://medium.com/coinmonks/unit-testing-solidity-contracts-on-ethereum-with-go-3cc924091281)

## 고급 사용 패턴 {#advanced-use-patterns}

- [게스(GETH)로 시뮬레이션된 백엔드](https://kauri.io/#collections/An%20ethereum%20test%20toolkit%20in%20Go/the-geth-simulated-backend/#_top)
- [이더리움 및 Quorum을 사용한 BaaS(Blockchain-as-a-Service) 앱](https://blockchain.dcwebmakers.com/blockchain-as-a-service-apps-using-ethereum-and-quorum.html)
- [이더리움 블록체인 애플리케이션의 분산 스토리지 IPFS 및 Swarm](https://blockchain.dcwebmakers.com/work-with-distributed-storage-ipfs-and-swarm-in-ethereum.html)
- [모바일 클라이언트: 라이브러리 및 Inproc 이더리움 노드](https://github.com/ethereum/go-ethereum/wiki/Mobile-Clients:-Libraries-and-Inproc-Ethereum-Nodes)
- [기본 디앱: 이더리움 컨트랙트와 Go 결합](https://github.com/ethereum/go-ethereum/wiki/Native-DApps:-Go-bindings-to-Ethereum-contracts)

## Go 프로젝트 및 도구 {#go-projects-and-tools}

- [게스(Geth)/Go 이더리움](https://github.com/ethereum/go-ethereum) - _이더리움 프로토콜의 공식 Go 구현체_
- [Go 이더리움 코드 분석 도구](https://github.com/ZtesoftCS/go-ethereum-code-analysis) - _Go 이더리움 코드의 리뷰 및 분석_
- [골렘(Golem)](https://github.com/golemfactory/golem) - _컴퓨팅 성능의 세계 시장 구축_
- [쿼럼(Quorum)](https://github.com/jpmorganchase/quorum) - _데이터 개인정보 보호를 지원하도록 권한이 부여된 이더리움의 구현체_
- [프리즘(Prysm)](https://github.com/prysmaticlabs/prysm) - _이더리움 '세레니티' 2.0 Go 구현체_
- [이더 Tweet](https://github.com/yep/eth-tweet) - _탈중앙화 Twitter: 이더리움 블록체인에서 실행되는 마이크로블로그 서비스_
- [플라즈마 MVP Go 언어](https://github.com/kyokan/plasma) — _최소 유효 플라즈마 사양에 대한 Go 언어 구현체 및 확장 프로그램_
- [개방형 이더리움 채굴 풀](https://github.com/sammy007/open-ethereum-pool) - _오픈 소스 이더리움 채굴 풀_
- [이더리움 HD 지갑](https://github.com/miguelmota/go-ethereum-hdwallet) - _Go로 작성된 이더리움 HD 지갑 파생 상품_
- [멀티 게스(Multi-Geth)](https://github.com/multi-geth/multi-geth) - _다양한 종류의 이더리움 네트워크 지원_
- [경량급 게스(Geth) 클라이언트](https://github.com/zsfelfoldi/go-ethereum/wiki/Geth-Light-Client) - _경량급 이더리움 하위 프로토콜의 게스(Geth) 구현체_

더 많은 참고 자료를 확인하고 싶으신가요? [ethereum.org/developers](/ko/developers/)를 확인해 보세요.

## Go 커뮤니티 기여자 {#go-community-contributors}

- [Geth Discord](https://discordapp.com/invite/nthXNEv)
- [Geth Gist](https://gitter.im/ethereum/go-ethereum)
- [Gophers Slack](https://invite.slack.golangbridge.org/) - [#이더리움 채널](https://https:/gophers.slack.com/messages/C9HP1S9V2)
- [StackExchange - 이더리움](https://ethereum.stackexchange.com/)
- [멀티 게스(Multi-Geth) Gitter](https://gitter.im/ethoxy/multi-geth)
- [이더리움 Gitter](https://gitter.im/ethereum/home)
- [경량급 게스(Geth) 클라이언트 Gitter](https://gitter.im/ethereum/light-client)

## 그 밖의 통합 목록 {#other-aggregated-lists}

- [유용한 이더리움](https://github.com/btomashvili/awesome-ethereum)
- [Consensys: 이더리움 개발자 도구의 최종 목록](https://media.consensys.net/an-definitive-list-of-ethereum-developer-tools-2159ce865974) | [GitHub 소스](https://github.com/ConsenSys/ethereum-developer-tools-list)
