---
title: "데이터 및 분석"
description: "dapp에서 사용할 온체인 분석 및 데이터를 얻는 방법"
lang: ko
---

## 소개 {#introduction}

네트워크 활용도가 계속 증가함에 따라, 온체인 데이터에는 점점 더 많은 가치 있는 정보가 존재하게 될 것입니다. 데이터의 양이 급격히 증가함에 따라, 이 정보를 계산하고 집계하여 보고하거나 탈중앙화 애플리케이션 (dapp)을 구동하는 것은 시간과 프로세스가 많이 소요되는 작업이 될 수 있습니다.

기존 데이터 제공업체를 활용하면 개발을 가속화하고, 더 정확한 결과를 생성하며, 지속적인 유지보수 노력을 줄일 수 있습니다. 이를 통해 팀은 프로젝트가 제공하고자 하는 핵심 기능에 집중할 수 있습니다.

## 전제 조건 {#prerequisites}

데이터 분석 컨텍스트에서 이를 사용하는 것을 더 잘 이해하려면 [블록 탐색기](/developers/docs/data-and-analytics/block-explorers/)의 기본 개념을 이해해야 합니다. 또한 시스템 설계에 추가되는 이점을 이해하기 위해 [인덱스](/glossary/#index)의 개념에 익숙해져야 합니다.

아키텍처의 기본 측면에서 [API](https://www.wikipedia.org/wiki/API)와 [REST](https://www.wikipedia.org/wiki/Representational_state_transfer)가 무엇인지 이론적으로라도 이해하는 것이 좋습니다.

## 블록 탐색기 {#block-explorers}

많은 [블록 탐색기](/developers/docs/data-and-analytics/block-explorers/)는 개발자에게 블록, 트랜잭션, 검증자, 계정 및 기타 온체인 활동에 대한 실시간 데이터의 가시성을 제공하는 [RESTful](https://www.wikipedia.org/wiki/Representational_state_transfer) [API](https://www.wikipedia.org/wiki/API) 게이트웨이를 제공합니다.

그런 다음 개발자는 이 데이터를 처리하고 변환하여 사용자에게 [블록체인](/glossary/#blockchain)과의 고유한 통찰력과 상호 작용을 제공할 수 있습니다. 예를 들어, [Etherscan](https://etherscan.io)과 [Blockscout](https://eth.blockscout.com)은 매 12초 슬롯마다 실행 및 합의 데이터를 제공합니다.

## The Graph {#the-graph}

[The Graph](https://thegraph.com/)는 서브그래프라고 알려진 개방형 API를 통해 블록체인 데이터를 쉽게 쿼리할 수 있는 방법을 제공하는 인덱싱 프로토콜입니다.

The Graph를 사용하면 개발자는 다음과 같은 이점을 얻을 수 있습니다.

- 탈중앙화된 인덱싱: 여러 인덱서를 통해 블록체인 데이터를 인덱싱할 수 있으므로 단일 장애점을 제거합니다.
- GraphQL 쿼리: 인덱싱된 데이터를 쿼리하기 위한 강력한 GraphQL 인터페이스를 제공하여 데이터 검색을 매우 간단하게 만듭니다.
- 사용자 정의: 블록체인 데이터를 변환하고 저장하기 위한 자체 로직을 정의하고, The Graph 네트워크에서 다른 개발자가 게시한 서브그래프를 재사용할 수 있습니다.

이 [빠른 시작](https://thegraph.com/docs/en/quick-start/) 가이드를 따라 5분 안에 서브그래프를 생성, 배포 및 쿼리해 보세요.

## 클라이언트 다양성 {#client-diversity}

[클라이언트 다양성](/developers/docs/nodes-and-clients/client-diversity/)은 버그와 익스플로잇에 대한 복원력을 제공하기 때문에 이더리움 네트워크의 전반적인 건전성에 중요합니다. 현재 [clientdiversity.org](https://clientdiversity.org/), [rated.network](https://www.rated.network), [supermajority.info](https://supermajority.info//) 및 [Ethernodes](https://ethernodes.org/)를 포함한 여러 클라이언트 다양성 대시보드가 있습니다.

## Dune Analytics {#dune-analytics}

[Dune Analytics](https://dune.com/)는 블록체인 데이터를 관계형 데이터베이스(DuneSQL) 테이블로 전처리하여, 사용자가 SQL을 사용하여 블록체인 데이터를 쿼리하고 쿼리 결과를 기반으로 대시보드를 구축할 수 있도록 합니다. 온체인 데이터는 `blocks`, `transactions`, (이벤트) `logs` 및 (호출) `traces`의 4가지 원시 테이블로 구성됩니다. 인기 있는 컨트랙트와 프로토콜은 디코딩되었으며, 각각 고유한 이벤트 및 호출 테이블 세트를 가지고 있습니다. 이러한 이벤트 및 호출 테이블은 추가로 처리되어 dex, 대출, 스테이블코인 등과 같은 프로토콜 유형별로 추상화 테이블로 구성됩니다.

## SQD {#sqd}

[SQD](https://sqd.dev/)는 대량의 데이터에 대한 효율적이고 무허가성 접근을 제공하는 데 최적화된 탈중앙화된 초확장성 데이터 플랫폼입니다. 현재 이벤트 로그, 트랜잭션 영수증, 트레이스 및 트랜잭션별 상태 차이를 포함한 과거 온체인 데이터를 제공합니다. SQD는 사용자 정의 데이터 추출 및 처리 파이프라인을 생성하기 위한 강력한 툴킷을 제공하여 초당 최대 15만 개의 블록 인덱싱 속도를 달성합니다.

시작하려면 [문서](https://docs.sqd.dev/)를 방문하거나 SQD로 구축할 수 있는 [EVM 예제](https://github.com/subsquid-labs/squid-evm-examples)를 확인하세요.

## SubQuery 네트워크 {#subquery-network}

[SubQuery](https://subquery.network/)는 개발자에게 Web3 프로젝트를 위한 빠르고 안정적이며 탈중앙화된 맞춤형 API를 제공하는 선도적인 데이터 인덱서입니다. SubQuery는 이더리움을 포함한 165개 이상의 생태계의 개발자에게 풍부한 인덱싱된 데이터를 제공하여 사용자를 위한 직관적이고 몰입감 있는 경험을 구축할 수 있도록 지원합니다. SubQuery 네트워크는 탄력적이고 탈중앙화된 인프라 네트워크를 통해 중단 없는 앱을 구동합니다. 데이터 처리 활동을 위한 맞춤형 백엔드를 구축하는 데 시간을 낭비하지 않고 SubQuery의 블록체인 개발자 툴킷을 사용하여 미래의 Web3 애플리케이션을 구축하세요.

시작하려면 [이더리움 빠른 시작 가이드](https://academy.subquery.network/quickstart/quickstart_chains/ethereum-gravatar.html)를 방문하여 [SubQuery의 관리형 서비스](https://managedservice.subquery.network/) 또는 [SubQuery의 탈중앙화된 네트워크](https://app.subquery.network/dashboard)에서 라이브로 전환하기 전에 테스트를 위해 로컬 Docker 환경에서 몇 분 만에 이더리움 블록체인 데이터 인덱싱을 시작해 보세요.

## Codex {#codex}

[Codex](https://www.codex.io/)는 80개 이상의 네트워크에 걸쳐 7천만 개 이상의 토큰에 대한 풍부한 데이터를 제공하는 실시간 블록체인 데이터 API입니다. 개발자는 맞춤형 인덱싱 인프라를 유지 관리하지 않고도 구조화된 토큰 가격 책정, 지갑 잔액, 트랜잭션 내역 및 집계된 분석(거래량, 유동성, 고유 지갑)에 접근할 수 있습니다. Codex는 WebSocket 및 웹훅 통합을 통해 1초 미만의 데이터 전송을 지원합니다.

시작하려면 [문서](https://docs.codex.io)를 방문하거나 [탐색기](https://docs.codex.io/explore)를 사용해 보거나 [대시보드](https://dashboard.codex.io/signup)에서 가입하세요.

## EVM 쿼리 언어 {#evm-query-language}

EVM 쿼리 언어(EQL)는 EVM(이더리움 가상 머신) 체인을 쿼리하도록 설계된 SQL 유사 언어입니다. EQL의 궁극적인 목표는 EVM 체인의 일급 객체(블록, 계정 및 트랜잭션)에 대한 복잡한 관계형 쿼리를 지원하는 동시에 개발자와 연구원에게 일상적인 사용을 위한 인체공학적 구문을 제공하는 것입니다. EQL을 사용하면 개발자는 친숙한 SQL 유사 구문을 사용하여 블록체인 데이터를 가져올 수 있으며 복잡한 보일러플레이트 코드가 필요하지 않습니다. EQL은 표준 블록체인 데이터 요청(예: 이더리움에서 계정의 논스 및 잔액 검색 또는 현재 블록 크기 및 타임스탬프 가져오기)을 지원하며 더 복잡한 요청 및 기능 세트에 대한 지원을 지속적으로 추가하고 있습니다.

## 더 읽을거리 {#further-reading}

- [암호화폐 데이터 탐색 I: 데이터 흐름 아키텍처](https://web.archive.org/web/20250125012042/https://research.2077.xyz/exploring-crypto-data-1-data-flow-architectures)
- [Graph 네트워크 개요](https://thegraph.com/docs/en/about/)
- [Graph 쿼리 플레이그라운드](https://thegraph.com/explorer/subgraph/graphprotocol/graph-network-mainnet?version=current)
- [Etherscan의 API 코드 예제](https://etherscan.io/apis#contracts)
- [Blockscout의 API 문서](https://docs.blockscout.com/devs/apis)
- [Beaconcha.in 비콘 체인 탐색기](https://beaconcha.in)
- [Dune 기초](https://docs.dune.com/#dune-basics)
- [SubQuery 이더리움 빠른 시작 가이드](https://academy.subquery.network/indexer/quickstart/quickstart_chains/ethereum-gravatar.html)
- [SQD 네트워크 개요](https://docs.sqd.dev/)
- [EVM 쿼리 언어](https://eql.sh/blog/alpha-release-notes)

## 튜토리얼: 데이터 및 분석 / 이더리움의 SQL {#tutorials}

- [SQL로 이더리움 기초 주제 배우기](/developers/tutorials/learn-foundational-ethereum-topics-with-sql/) _– SQL로 온체인 이더리움 데이터를 쿼리하여 트랜잭션, 블록 및 가스 기초를 이해합니다._