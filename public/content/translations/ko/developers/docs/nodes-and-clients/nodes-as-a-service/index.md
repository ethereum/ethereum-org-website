---
title: 서비스형 노드
description: 노드 서비스, 장단점 및 인기 있는 제공업체에 대한 입문자용 개요입니다.
lang: ko
sidebarDepth: 2
---

## 소개 {#introduction}

자체 [이더리움 노드](/developers/docs/nodes-and-clients/#what-are-nodes-and-clients)를 실행하는 것은 특히 처음 시작하거나 빠르게 확장할 때 어려울 수 있습니다. 여러분을 대신해 최적화된 노드 인프라를 실행해 주는 [다양한 서비스](#popular-node-services)가 있으므로, 여러분은 애플리케이션이나 제품 개발에 집중할 수 있습니다. 노드 서비스의 작동 방식, 사용 시 장단점을 설명하고, 시작하는 데 관심이 있는 분들을 위해 제공업체 목록을 나열하겠습니다.

## 전제 조건 {#prerequisites}

노드와 클라이언트가 무엇인지 아직 이해하지 못했다면 [노드와 클라이언트](/developers/docs/nodes-and-clients/)를 확인해 보세요.

## 스테이커 {#stakoooooooooooooors}

솔로 스테이커는 타사 제공업체에 의존하지 않고 자체 인프라를 실행해야 합니다. 이는 합의 클라이언트와 결합된 실행 클라이언트를 실행하는 것을 의미합니다. [머지](/roadmap/merge) 이전에는 합의 클라이언트만 실행하고 실행 데이터에 중앙화된 제공업체를 사용하는 것이 가능했지만, 이제는 불가능합니다. 솔로 스테이커는 두 클라이언트를 모두 실행해야 합니다. 하지만 이 과정을 쉽게 해주는 서비스가 있습니다.

[노드 실행에 대해 자세히 알아보기](/developers/docs/nodes-and-clients/run-a-node/).

이 페이지에 설명된 서비스는 스테이킹을 하지 않는 노드를 위한 것입니다.

## 노드 서비스는 어떻게 작동하나요? {#how-do-node-services-work}

노드 서비스 제공업체는 여러분을 대신해 백그라운드에서 분산된 노드 클라이언트를 실행하므로, 여러분이 직접 할 필요가 없습니다.

이러한 서비스는 일반적으로 블록체인에 데이터를 쓰고 읽는 데 사용할 수 있는 API 키를 제공합니다. 종종 메인넷 외에도 [이더리움 테스트넷](/developers/docs/networks/#ethereum-testnets)에 대한 접근 권한을 포함합니다.

일부 서비스는 여러분을 위해 관리해 주는 전용 노드를 제공하는 반면, 다른 서비스는 로드 밸런서를 사용하여 여러 노드에 활동을 분산시킵니다.

거의 모든 노드 서비스는 통합하기가 매우 쉬우며, 코드 한 줄만 변경하면 자체 호스팅 노드를 교체하거나 서비스 간에 전환할 수도 있습니다.

종종 노드 서비스는 다양한 [노드 클라이언트](/developers/docs/nodes-and-clients/#execution-clients) 및 [유형](/developers/docs/nodes-and-clients/#node-types)을 실행하여, 하나의 API에서 클라이언트별 메서드 외에도 풀 노드 및 아카이브 노드에 접근할 수 있게 해줍니다.

노드 서비스는 여러분의 개인 키나 정보를 저장하지 않으며, 저장해서도 안 된다는 점을 유의하는 것이 중요합니다.

## 노드 서비스를 사용하면 어떤 이점이 있나요? {#benefits-of-using-a-node-service}

노드 서비스를 사용하는 주요 이점은 노드를 직접 유지 관리하고 관리하는 데 엔지니어링 시간을 할애할 필요가 없다는 것입니다. 이를 통해 인프라 유지 관리에 대해 걱정할 필요 없이 제품 구축에 집중할 수 있습니다.

자체 노드를 실행하는 것은 스토리지부터 대역폭, 귀중한 엔지니어링 시간에 이르기까지 비용이 많이 들 수 있습니다. 확장 시 더 많은 노드를 가동하고, 노드를 최신 버전으로 업그레이드하며, 상태 일관성을 보장하는 등의 작업은 원하는 Web3 제품을 구축하고 리소스를 투자하는 데 방해가 될 수 있습니다.

## 노드 서비스를 사용하면 어떤 단점이 있나요? {#cons-of-using-a-node-service}

노드 서비스를 사용하면 제품의 인프라 측면을 중앙화하게 됩니다. 이러한 이유로 탈중앙화를 가장 중요하게 생각하는 프로젝트는 제3자에게 아웃소싱하는 것보다 자체 호스팅 노드를 선호할 수 있습니다.

[자체 노드 실행의 이점](/developers/docs/nodes-and-clients/#benefits-to-you)에 대해 자세히 알아보세요.

## 인기 있는 노드 서비스 {#popular-node-services}

다음은 가장 인기 있는 이더리움 노드 제공업체 목록입니다. 누락된 곳이 있다면 자유롭게 추가해 주세요! 각 노드 서비스는 무료 또는 유료 티어 외에도 다양한 이점과 기능을 제공하므로, 결정을 내리기 전에 어떤 서비스가 여러분의 요구에 가장 적합한지 조사해야 합니다.

- [**Alchemy**](https://alchemy.com/)
  - [문서](https://www.alchemy.com/docs/)
  - 기능
    - 월 3억 컴퓨팅 유닛(약 3천만 건의 getLatestBlock 요청)을 제공하는 가장 큰 무료 티어
    - 폴리곤, 스타크넷, 옵티미즘, 아비트럼을 위한 멀티체인 지원
    - 가장 큰 이더리움 탈중앙화 애플리케이션(dapp) 및 탈중앙화 금융(DeFi) 트랜잭션 볼륨의 약 70%를 구동
    - Alchemy Notify를 통한 실시간 웹훅 알림
    - 업계 최고 수준의 지원 및 신뢰성/안정성
    - Alchemy의 NFT API
    - 요청 탐색기, 멤풀 감시자 및 컴포저가 포함된 대시보드
    - 통합된 테스트넷 포싯 접근
    - 18,000명의 사용자가 있는 활발한 디스코드 빌더 커뮤니티

- [**Allnodes**](https://www.allnodes.com/)
  - [문서](https://docs.allnodes.com/)
  - 기능
    - Allnodes 포트폴리오 페이지에서 생성된 PublicNode 토큰으로 속도 제한 없음.
    - [PublicNode](https://www.publicnode.com)에서 프라이버시에 중점을 둔 무료 RPC 엔드포인트(100개 이상의 블록체인)
    - 90개 이상의 블록체인에 대한 속도 제한 없는 전용 노드
    - 30개 이상의 블록체인에 대한 전용 아카이브 노드
    - 3개 지역(미국, 유럽, 아시아)에서 사용 가능
    - [PublicNode](https://www.publicnode.com/snapshots)에서 100개 이상의 블록체인에 대한 스냅샷
    - 99.90%~99.98% 가동 시간 SLA(요금제에 따라 다름)를 제공하는 연중무휴 기술 지원.
    - 시간당 결제 요금제
    - 신용카드, 페이팔 또는 암호화폐로 결제

- [**All That Node**](https://allthatnode.com/)
  - [문서](https://docs.allthatnode.com/)
  - 기능
    - 무료 티어로 일일 50,000건의 요청
    - 40개 이상의 프로토콜 지원
    - JSON-RPC(EVM, Tendermint), REST 및 Websocket API 지원
    - 아카이브 데이터에 대한 무제한 접근
    - 연중무휴 기술 지원 및 99.9% 이상의 가동 시간
    - 멀티 체인에서 퍼싯 사용 가능
    - 무제한 API 키를 통한 무제한 엔드포인트 접근
    - Trace/Debug API 지원
    - 자동 업데이트

- [**Amazon Managed Blockchain**](https://aws.amazon.com/managed-blockchain/)
  - [문서](https://aws.amazon.com/managed-blockchain/resources/)
  - 기능
    - 완전 관리형 이더리움 노드
    - 6개 지역에서 사용 가능
    - HTTP 및 보안 WebSocket을 통한 JSON-RPC
    - 3개 체인 지원
    - SLA, 연중무휴 AWS 지원
    - 고 이더리움(geth) 및 라이트하우스

- [**Ankr**](https://www.ankr.com/)
  - [문서](https://docs.ankr.com/)
  - 기능
    - Ankr 프로토콜 - 8개 이상의 체인에 대한 퍼블릭 RPC API 엔드포인트 개방형 접근
    - 가장 가까운 가용 노드로의 빠르고 안정적인 게이트웨이를 위한 로드 밸런싱 및 노드 상태 모니터링
    - WSS 엔드포인트 및 무제한 속도 제한을 지원하는 프리미엄 티어
    - 40개 이상의 체인에 대한 원클릭 풀 노드 및 검증자 노드 배포
    - 필요에 따른 확장
    - 분석 도구
    - 대시보드
    - RPC, HTTPS 및 WSS 엔드포인트
    - 직접 지원

- [**Blast**](https://blastapi.io/)
  - [문서](https://docs.blastapi.io/)
  - 기능
    - RPC 및 WSS 지원
    - 다중 지역 노드 호스팅
    - 탈중앙화 인프라
    - 퍼블릭 API
    - 전용 무료 요금제
    - 멀티체인 지원(17개 이상의 블록체인)
    - 아카이브 노드
    - 연중무휴 디스코드 지원
    - 연중무휴 모니터링 및 알림
    - 전반적인 99.9% SLA
    - 암호화폐로 결제

- [**BlockDaemon**](https://blockdaemon.com/)
  - [문서](https://ubiquity.docs.blockdaemon.com/)
  - 이점
    - 대시보드
    - 노드별 기준
    - 분석

- [**BlockPI**](https://blockpi.io/)
  - [문서](https://docs.blockpi.io/)
  - 기능
    - 견고하고 분산된 노드 구조
    - 최대 40개의 HTTPS 및 WSS 엔드포인트
    - 무료 가입 패키지 및 월간 패키지
    - Trace 메서드 + 아카이브 데이터 지원
    - 최대 90일 유효 패키지
    - 맞춤형 요금제 및 종량제 결제
    - 암호화폐로 결제
    - 직접 지원 및 기술 지원

- [**Chainbase**](https://www.chainbase.com/)
  - [문서](https://docs.chainbase.com)
  - 기능
    - 고가용성, 빠르고 확장 가능한 RPC 서비스
    - 멀티체인 지원
    - 무료 요금제
    - 사용자 친화적인 대시보드
    - RPC를 넘어선 블록체인 데이터 서비스 제공

- [**Chainstack**](https://chainstack.com/)
  - [문서](https://docs.chainstack.com/)
  - 기능
    - 무료 공유 노드
    - 공유 아카이브 노드
    - GraphQL 지원
    - RPC 및 WSS 엔드포인트
    - 전용 풀 노드 및 아카이브 노드
    - 전용 배포를 위한 빠른 동기화 시간
    - 자체 클라우드 사용
    - 시간당 결제 요금제
    - 연중무휴 직접 지원

- [**dRPC**](https://drpc.org/)
  - [문서](https://drpc.org/docs)
  - NodeCloud: 10달러(USD)부터 시작하는 플러그 앤 플레이 RPC 인프라 — 최고 속도, 제한 없음
  - NodeCloud 기능:
    - 185개 네트워크에 대한 API 지원
    - 40개 이상의 제공업체로 구성된 분산 풀
    - 9개의 지리적 클러스터를 통한 글로벌 커버리지
    - AI 기반 로드 밸런싱 시스템
    - 종량제 정액 요금제 — 인상, 만료, 락인(lock-in) 없음
    - 무제한 키, 세분화된 키 조정, 팀 역할, 프론트엔드 보호
    - 메서드당 20 컴퓨팅 유닛(CU)의 정액 요금
    - [퍼블릭 엔드포인트 체인 목록](https://drpc.org/chainlist)
    - [요금 계산기](https://drpc.org/pricing#calculator)
  - NodeCore: 완전한 제어를 원하는 조직을 위한 오픈 소스 스택

- [**GetBlock**](https://getblock.io/)
  - [문서](https://getblock.io/docs/get-started/authentication-with-api-key/)
  - 기능
    - 40개 이상의 블록체인 노드에 접근
    - 일일 4만 건의 무료 요청
    - 무제한 API 키
    - 1GB/sec의 높은 연결 속도
    - Trace+아카이브
    - 고급 분석
    - 자동 업데이트
    - 기술 지원

- [**InfStones**](https://infstones.com/)
  - 기능
    - 무료 티어 옵션
    - 필요에 따른 확장
    - 분석
    - 대시보드
    - 고유한 API 엔드포인트
    - 전용 풀 노드
    - 전용 배포를 위한 빠른 동기화 시간
    - 연중무휴 직접 지원
    - 50개 이상의 블록체인 노드에 접근

- [**Infura**](https://infura.io/)
  - [문서](https://infura.io/docs)
  - 기능
    - 무료 티어 옵션
    - 필요에 따른 확장
    - 유료 아카이브 데이터
    - 직접 지원
    - 대시보드

- [**Kaleido**](https://kaleido.io/)
  - [문서](https://docs.kaleido.io/)
  - 기능
    - 무료 스타터 티어
    - 원클릭 이더리움 노드 배포
    - 사용자 정의 가능한 클라이언트 및 알고리즘(고 이더리움(geth), Quorum 및 베수 || 권위 증명(PoA), IBFT 및 Raft)
    - 500개 이상의 관리 및 서비스 API
    - 이더리움 트랜잭션 제출을 위한 RESTful 인터페이스(Apache Kafka 기반)
    - 이벤트 전달을 위한 아웃바운드 스트림(Apache Kafka 기반)
    - "오프체인" 및 보조 서비스의 심층 컬렉션(예: 양방향 암호화 메시징 전송)
    - 거버넌스 및 역할 기반 접근 제어를 통한 간단한 네트워크 온보딩
    - 관리자와 최종 사용자 모두를 위한 정교한 사용자 관리
    - 확장성과 복원력이 뛰어난 엔터프라이즈급 인프라
    - 클라우드 HSM 개인 키 관리
    - 이더리움 메인넷 테더링
    - ISO 27k 및 SOC 2, Type 2 인증
    - 동적 런타임 구성(예: 클라우드 통합 추가, 노드 인그레스 변경 등)
    - 멀티 클라우드, 다중 지역 및 하이브리드 배포 오케스트레이션 지원
    - 간단한 시간당 SaaS 기반 요금제
    - SLA 및 연중무휴 지원

- [**Lava Network**](https://www.lavanet.xyz/)
  - [문서](https://docs.lavanet.xyz/)
  - 기능
    - 무료 테스트넷 사용
    - 높은 가동 시간을 위한 탈중앙화된 이중화
    - 오픈 소스
    - 완전히 탈중앙화된 SDK
    - Ethers.js 통합
    - 직관적인 프로젝트 관리 인터페이스
    - 합의 기반 데이터 무결성
    - 멀티체인 지원

- [**Moralis**](https://moralis.io/)
  - [문서](https://docs.moralis.io/)
  - 기능
    - 무료 공유 노드
    - 무료 공유 아카이브 노드
    - 프라이버시 중심(노로그 정책)
    - 크로스 체인 지원
    - 필요에 따른 확장
    - 대시보드
    - 고유한 이더리움 SDK
    - 고유한 API 엔드포인트
    - 직접적인 기술 지원

- [**NodeReal MegaNode**](https://nodereal.io/)
  - [문서](https://docs.nodereal.io/docs/introduction)
  - 기능
    - 안정적이고 빠르며 확장 가능한 RPC API 서비스
    - Web3 개발자를 위한 향상된 API
    - 멀티체인 지원
    - 무료로 시작하기

- [**NodeFlare**](https://nodeflare.app/)
  - [문서](https://nodeflare.app/docs/quick-start)
  - 기능
    - 이더리움, Base, 아비트럼 원(Arbitrum One), 옵티미즘을 포함한 8개의 EVM 체인
    - 가장 가까운 정상 노드로 자동 장애 조치되는 4개 지역(유럽, 아시아, 북미)
    - 무료 퍼블릭 엔드포인트(API 키 없음) + 월 300만 컴퓨팅 유닛의 무료 요금제
    - 컴퓨팅 유닛 청구 — 사용한 만큼만 지불하며, 무거운 호출일수록 비용이 더 듭니다.
    - 유료 요금제에서는 스로틀링(throttling) 없음

- [**NOWNodes**](https://nownodes.io/)
  - 기능
    - 50개 이상의 블록체인 노드에 접근
    - 무료 API 키
    - 블록 탐색기
    - API 응답 시간 ⩽ 1초 이하
    - 연중무휴 지원 팀
    - 개인 계정 관리자
    - 공유, 아카이브, 백업 및 전용 노드

- [**Pocket Network**](https://www.pokt.network/)
  - [문서](https://docs.pokt.network/)
  - 기능
    - 탈중앙화된 RPC 프로토콜 및 마켓플레이스
    - 일일 100만 건 요청 무료 티어(엔드포인트당, 최대 2개)
    - Pre-Stake+ 프로그램(일일 100만 건 이상의 요청이 필요한 경우)
    - 15개 이상의 블록체인 지원
    - 애플리케이션을 서비스하여 POKT를 얻는 6,400개 이상의 노드
    - 아카이브 노드, 트레이싱이 포함된 아카이브 노드 및 테스트넷 노드 지원
    - 이더리움 메인넷 노드 클라이언트 다양성
    - 단일 장애점 없음
    - 제로 다운타임
    - 비용 효율적인 제로에 가까운 토크노믹스(네트워크 대역폭을 위해 POKT를 한 번 스테이킹)
    - 월별 매몰 비용 없이 인프라를 자산으로 전환
    - 프로토콜에 내장된 로드 밸런싱
    - 필요에 따라 일일 요청 수와 시간당 노드 수를 무한대로 확장
    - 가장 프라이버시가 보장되고 검열에 저항하는 옵션
    - 실무 개발자 지원
    - [Pocket Portal](https://bit.ly/ETHorg_POKTportal) 대시보드 및 분석

- [**QuickNode**](https://www.quicknode.com)
  - [문서](https://www.quicknode.com/docs/)
  - 기능
    - 연중무휴 기술 지원 및 개발자 디스코드 커뮤니티
    - 지리적으로 균형 잡힌 다중 클라우드/메탈, 저지연 네트워크
    - 멀티체인 지원(옵티미즘, 아비트럼, 폴리곤 + 기타 11개)
    - 속도 및 안정성을 위한 미들 레이어(호출 라우팅, 캐시, 인덱싱)
    - 웹훅을 통한 스마트 컨트랙트 모니터링
    - 직관적인 대시보드, 분석 제품군, RPC 컴포저
    - 고급 보안 기능(JWT, 마스킹, 화이트리스팅)
    - NFT 데이터 및 분석 API
    - [SOC2 인증](https://www.quicknode.com/security)
    - 개발자부터 기업까지 적합

- [**Rivet**](https://rivet.cloud/)
  - [문서](https://rivet.readthedocs.io/en/latest/)
  - 기능
    - 무료 티어 옵션
    - 필요에 따른 확장

- [**SenseiNode**](https://senseinode.com)
  - [문서](https://docs.senseinode.com/)
  - 기능
    - 전용 및 공유 노드
    - 대시보드
    - 라틴 아메리카의 여러 위치에 있는 다양한 호스팅 제공업체에서 AWS 외부 호스팅
    - 프리즘 및 라이트하우스 클라이언트

- [**SettleMint**](https://console.settlemint.com/)
  - [문서](https://docs.settlemint.com/)
  - 기능
    - 무료 평가판
    - 필요에 따른 확장
    - GraphQL 지원
    - RPC 및 WSS 엔드포인트
    - 전용 풀 노드
    - 자체 클라우드 사용
    - 분석 도구
    - 대시보드
    - 시간당 결제 요금제
    - 직접 지원

- [**Tenderly**](https://tenderly.co/web3-gateway)
  - [문서](https://docs.tenderly.co/web3-gateway/web3-gateway)
  - 기능
    - 월 2,500만 Tenderly 유닛이 포함된 무료 티어
    - 과거 데이터에 대한 무료 접근
    - 읽기 작업이 많은 워크로드에서 최대 8배 빠른 속도
    - 100% 일관된 읽기 접근
    - JSON-RPC 엔드포인트
    - UI 기반 RPC 요청 빌더 및 요청 미리보기
    - Tenderly의 개발, 디버깅 및 테스트 도구와 긴밀하게 통합됨
    - 트랜잭션 시뮬레이션
    - 사용량 분석 및 필터링
    - 손쉬운 접근 키 관리
    - 채팅, 이메일 및 디스코드를 통한 전담 엔지니어링 지원

- [**Tokenview**](https://services.tokenview.io/)
  - [문서](https://services.tokenview.io/docs?type=nodeService)
  - 기능
    - 연중무휴 기술 지원 및 개발자 텔레그램 커뮤니티
    - 멀티체인 지원(비트코인, 이더리움, 트론, BNB 스마트 체인, 이더리움 클래식)
    - RPC 및 WSS 엔드포인트 모두 사용 가능
    - 아카이브 데이터 API에 대한 무제한 접근
    - 요청 탐색기 및 멤풀 감시자가 포함된 대시보드
    - NFT 데이터 API 및 웹훅 알림
    - 암호화폐로 결제
    - 추가 동작 요구 사항에 대한 외부 지원

- [**Watchdata**](https://watchdata.io/)
  - [문서](https://docs.watchdata.io/)
  - 기능
    - 데이터 신뢰성
    - 다운타임 없는 중단 없는 연결
    - 프로세스 자동화
    - 무료 요금제
    - 모든 사용자에게 적합한 높은 한도
    - 다양한 노드 지원
    - 리소스 확장
    - 빠른 처리 속도

- [**ZMOK**](https://zmok.io/)
  - [문서](https://docs.zmok.io/)
  - 기능
    - 서비스형 프론트러닝
    - 검색/필터링 메서드가 있는 글로벌 트랜잭션 멤풀
    - 트랜잭션 전송을 위한 무제한 TX 수수료 및 무한 가스
    - 가장 빠른 새 블록 획득 및 블록체인 읽기
    - API 호출당 최적의 가격 보장

- [**Zeeve**](https://www.zeeve.io/)
  - [문서](https://www.zeeve.io/docs/)
  - 기능
    - 블록체인 노드 및 네트워크의 배포, 모니터링 및 관리를 제공하는 엔터프라이즈급 노코드 자동화 플랫폼
    - 30개 이상의 지원되는 프로토콜 및 통합, 지속적인 추가
    - 실제 사용 사례를 위한 탈중앙화 스토리지, 탈중앙화 신원증명(DID) 및 블록체인 원장 데이터 API와 같은 부가가치 Web3 인프라 서비스
    - 연중무휴 지원 및 사전 모니터링을 통해 항상 노드의 상태를 보장합니다.
    - RPC 엔드포인트는 API에 대한 인증된 접근, 직관적인 대시보드 및 분석을 통한 번거로움 없는 관리를 제공합니다.
    - 관리형 클라우드 및 자체 클라우드 옵션을 모두 제공하며 AWS, Azure, Google Cloud, Digital Ocean 및 온프레미스와 같은 모든 주요 클라우드 제공업체를 지원합니다.
    - 지능형 라우팅을 사용하여 매번 사용자에게 가장 가까운 노드에 연결합니다.


## 더 읽을거리 {#further-reading}

- [이더리움 노드 서비스 목록](https://ethereumnodes.com/)

## 관련 주제 {#related-topics}

- [노드와 클라이언트](/developers/docs/nodes-and-clients/)

## 관련 튜토리얼 {#related-tutorials}

- [Alchemy를 사용한 이더리움 개발 시작하기](/developers/tutorials/getting-started-with-ethereum-development-using-alchemy/)
- [Web3 및 Alchemy를 사용하여 트랜잭션을 전송하는 가이드](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)