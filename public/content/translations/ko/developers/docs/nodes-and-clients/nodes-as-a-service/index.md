---
title: 노드 제공 서비스
description: 노드 서비스에 대한 입문 단계 및 장단점 그리고 대표적인 서비스 제공
lang: ko
sidebarDepth: 2
---

## 소개 {#Introduction}

자체 [이더리움 노드](/developers/docs/nodes-and-clients/#what-are-nodes-and-clients)를 실행하는 것은 특히 처음 시작하거나 빠르게 확장할 때 어려울 수 있습니다. 사용자를 위해 최적화된 노드 인프라를 실행하는 [여러 서비스](#popular-node-services)가 있으므로, 대신 애플리케이션이나 제품 개발에 집중할 수 있습니다. 본 장에서는 노드 서비스가 작동하는 방식과 장단점 그리고 서비스 제공업체 (provider)를 나열한다.

## 필수 구성 요소 {#prerequisites}

노드와 클라이언트가 무엇인지 아직 이해하지 못했다면 [노드 및 클라이언트](/developers/docs/nodes-and-clients/)를 확인하세요.

## 스테이커 {#stakoooooooooooooors}

개인 지분 소유자 (solo staker) 는 제3자를 통하지 않고 개인적으로 인프라를 구축하여야 한다. 즉 실행 클라이언트를 운영하는 것은 컨센서스 클라이언트와 매칭된다. [병합](/roadmap/merge) 이전에는 합의 클라이언트만 실행하고 중앙화된 제공자로부터 실행 데이터를 가져올 수 있었지만, 이제는 불가능하며 단독 스테이커는 두 클라이언트를 모두 실행해야 합니다. 그러나 몇몇 서비스가 이를 간단하게 해준다.

[노드 실행에 대해 자세히 알아보기](/developers/docs/nodes-and-clients/run-a-node/).

이 페이지에 설명된 서비스는 스테이킹이 아닌 노드용입니다.

## 노드 서비스는 어떻게 작동하나요? {#how-do-node-services-work}

노드 서비스 제공업체는 백그라운드에서 분산된 노드 클라이언트를 실행하므로 직접 할 필요가 없습니다.

이 서비스들은 일반적으로 API 키를 제공하여 블록체인에 쓰거나 읽을 수 있습니다. 이러한 서비스는 보통 메인넷 외에도 [이더리움 테스트넷](/developers/docs/networks/#ethereum-testnets)에 대한 액세스를 포함합니다.

일부 서비스는 자체적으로 관리하는 전용 노드를 제공하는 반면, 다른 서비스는 로드 밸런서를 사용하여 노드 간 활동을 분배합니다.

대부분의 노드 서비스는 통합이 매우 쉬우며, 셀프 호스팅 노드를 교체하거나 서비스 간 전환하는 경우 코드에서 한 줄만 변경하면 됩니다.

노드 서비스는 종종 다양한 [노드 클라이언트](/developers/docs/nodes-and-clients/#execution-clients) 및 [유형](/developers/docs/nodes-and-clients/#node-types)을 실행하여, 하나의 API에서 클라이언트 특정 메서드 외에 전체 및 아카이브 노드에 액세스할 수 있도록 합니다.

노드 서비스가 개인 키나 정보를 저장하지 않으며 저장해서도 안 된다는 점을 유념해야 합니다.

## 노드 서비스 사용의 장점은 무엇인가요? {#benefits-of-using-a-node-service}

노드 서비스를 사용할 때의 주요 이점은 노드를 유지 관리하는 데 소요되는 엔지니어링 시간을 절약할 수 있다는 것입니다. 이는 인프라 유지 관리를 걱정하는 대신 제품 개발에 집중할 수 있도록 합니다.

자체 노드를 실행하는 것은 스토리지에서 대역폭, 소중한 엔지니어링 시간에 이르기까지 매우 비용이 많이 들 수 있습니다. 확장 시 더 많은 노드를 시작하고, 최신 버전으로 노드를 업그레이드하고, 상태 일관성을 보장하는 것과 같은 작업은 웹3 제품 개발에 집중하는 데 방해가 될 수 있습니다.

## 노드 서비스 사용의 단점은 무엇인가요? {#cons-of-using-a-node-service}

노드 서비스를 사용하면 제품의 인프라 측면을 중앙 집중화하는 것입니다. 이러한 이유로 탈중앙화를 가장 중요하게 여기는 프로젝트는 3자에게 아웃소싱하는 대신 자체 노드를 호스팅하는 것을 선호할 수 있습니다.

[자체 노드 실행의 이점](/developers/docs/nodes-and-clients/#benefits-to-you)에 대해 자세히 알아보세요.

## 인기 있는 노드 서비스 {#popular-node-services}

다음은 가장 인기 있는 이더리움 노드 제공업체 목록입니다. 누락된 항목이 있으면 자유롭게 추가하세요! 각 노드 서비스는 무료 또는 유료 계층 외에도 다양한 이점과 기능을 제공합니다. 결정을 내리기 전에 어떤 것이 가장 적합한지 조사해야 합니다.

- [**Alchemy**](https://alchemy.com/)
  - [문서](https://www.alchemy.com/docs/)
  - 기능
    - 월 3억 컴퓨팅 유닛(약 3천만 getLatestBlock 요청)을 제공하는 가장 큰 무료 계층
    - Polygon, Starknet, Optimism, Arbitrum에 대한 멀티체인 지원
    - 최대 이더리움 dapp 및 DeFi 거래량의 약 70% 지원
    - 실시간 웹훅 알림 기능을 제공하는 Alchemy Notify
    - 최고 수준의 지원 및 신뢰성/안정성
    - Alchemy의 NFT API
    - Request Explorer, Mempool Watcher 및 Composer를 포함한 대시보드
    - 통합된 테스트넷 수도꼭지 접근
    - 18,000명의 사용자를 보유한 활성 Discord 빌더 커뮤니티

- [**Allnodes**](https://www.allnodes.com/)
  - [문서](https://docs.allnodes.com/)
  - 기능
    - Allnodes 포트폴리오 페이지에서 생성된 PublicNode 토큰 사용 시 속도 제한 없음.
    - [PublicNode](https://www.publicnode.com)에서 개인 정보 보호에 중점을 둔 무료 RPC 엔드포인트(100개 이상의 블록체인) 제공
    - 90개 이상의 블록체인을 위한 속도 제한 없는 전용 노드
    - 30개 이상의 블록체인을 위한 전용 아카이브 노드
    - 3개 지역(미국, EU, 아시아)에서 사용 가능
    - [PublicNode](https://www.publicnode.com/snapshots)에서 100개 이상의 블록체인에 대한 스냅샷 제공
    - 연중무휴 기술 지원 및 99.90%-99.98% 가동 시간 SLA(플랜에 따라 다름).
    - 시간당 결제 요금제
    - 신용카드, PayPal 또는 암호화폐로 결제

- [**All That Node**](https://allthatnode.com/)
  - [문서](https://docs.allthatnode.com/)
  - 기능
    - 무료 계층으로 하루에 50,000개의 요청 지원
    - 40개 이상의 프로토콜 지원
    - JSON-RPC(EVM, Tendermint), REST 및 Websocket API 지원
    - 아카이브 데이터 무제한 액세스
    - 24시간 기술 지원 및 99.9% 이상의 가동 시간
    - 멀티 체인에서 수도꼭지 이용 가능
    - 무제한 API 키로 무제한 엔드포인트 액세스
    - Trace/Debug API 지원
    - 자동 업데이트

- [**Amazon Managed Blockchain**](https://aws.amazon.com/managed-blockchain/)
  - [문서](https://aws.amazon.com/managed-blockchain/resources/)
  - 기능
    - 완전히 관리되는 이더리움 노드
    - 6개 지역에서 이용 가능
    - HTTP 및 안전한 WebSocket을 통한 JSON-RPC 지원
    - 3개의 체인 지원
    - SLA, AWS 24/7 지원
    - Go-ethereum 및 Lighthouse

- [**Ankr**](https://www.ankr.com/)
  - [문서](https://docs.ankr.com/)
  - 기능
    - Ankr 프로토콜 - 8개 이상의 체인을 위한 공용 RPC API 엔드포인트에 대한 오픈 액세스
    - 가장 가까운 사용 가능한 노드로 빠르고 신뢰할 수 있는 게이트웨이를 제공하기 위한 로드 밸런싱 및 노드 상태 모니터링
    - 프리미엄 계층은 WSS 엔드포인트 및 무제한 속도 제한 활성화
    - 40개 이상의 체인을 위한 원클릭 풀 노드 및 검증자 노드 배포
    - 필요에 따라 확장 가능
    - 분석 도구
    - 대시보드
    - RPC, HTTPS 및 WSS 엔드포인트
    - 직접 지원

- [**Blast**](https://blastapi.io/)
  - [문서](https://docs.blastapi.io/)
  - 기능
    - RPC 및 WSS 지원
    - 멀티 리전 노드 호스팅
    - 탈중앙화 인프라
    - 공용 API
    - 전용 무료 플랜
    - 다중 체인 지원 (17개 이상의 블록체인)
    - 아카이브 노드
    - 24/7 디스코드 지원
    - 24/7 모니터링 및 알림
    - 99.9%의 전반적인 SLA
    - 암호화폐로 결제

- [**BlockDaemon**](https://blockdaemon.com/)
  - [문서](https://ubiquity.docs.blockdaemon.com/)
  - 노드당 기준
    - 대시보드
    - 노드당 기준
    - 분석

- [**BlockPI**](https://blockpi.io/)
  - [문서](https://docs.blockpi.io/)
  - 기능
    - 견고하고 분산된 노드 구조
    - 최대 40개의 HTTPS 및 WSS 엔드포인트
    - 무료 가입 패키지 및 월간 패키지
    - 트레이스 메서드 + 아카이브 데이터 지원
    - 최대 90일 유효 기간 패키지
    - 맞춤형 플랜 및 사용량 기반 결제
    - 암호화폐로 결제
    - 직접 지원 및 기술 지원

- [**Chainbase**](https://www.chainbase.com/)
  - [문서](https://docs.chainbase.com)
  - 기능
    - 높은 가용성, 빠르고 확장 가능한 RPC 서비스
    - 다중 체인 지원
    - 무료 요금제
    - 사용자 친화적인 대시보드
    - RPC를 넘어서 블록체인 데이터 서비스를 제공

- [**Chainstack**](https://chainstack.com/)
  - [문서](https://docs.chainstack.com/)
  - 기능
    - 무료 공유 노드
    - 공유 아카이브 노드
    - GraphQL 지원
    - RPC 및 WSS 엔드포인트
    - 전용 풀 및 아카이브 노드
    - 전용 배포에 대한 빠른 동기화 시간
    - 사용자 클라우드 사용
    - 시간당 결제 요금제
    - 직접 24/7 지원

- [**dRPC**](https://drpc.org/)
  - [문서](https://drpc.org/docs)
  - NodeCloud: 10달러(USD)부터 시작하는 플러그 앤 플레이 RPC 인프라—최고 속도, 무제한
  - NodeCloud 기능:
    - 185개 네트워크에 대한 API 지원
    - 40개 이상의 공급자로 구성된 분산 풀
    - 9개의 지리적 클러스터로 전 세계 서비스 제공
    - AI 기반 로드 밸런싱 시스템
    - 사용한 만큼 지불하는 정액 요금제—가격 인상, 만료, 약정 없음
    - 무제한 키, 세분화된 키 조정, 팀 역할, 프런트엔드 보호
    - 메서드당 20 컴퓨팅 유닛(CU)의 정액 요금
    - [퍼블릭 엔드포인트 체인리스트](https://drpc.org/chainlist)
    - [가격 계산기](https://drpc.org/pricing#calculator)
  - NodeCore: 완전한 제어를 원하는 조직을 위한 오픈소스 스택

- [**GetBlock**](https://getblock.io/)
  - [문서](https://getblock.io/docs/get-started/authentication-with-api-key/)
  - 기능
    - 40개 이상의 블록체인 노드 액세스
    - 하루 4만 건의 무료 요청
    - 무제한 API 키 수
    - 1GB/초의 높은 연결 속도
    - 추적+아카이브
    - 고급 분석
    - 자동 업데이트
    - 기술 지원

- [**InfStones**](https://infstones.com/)
  - 기능
    - 무료 계층 옵션
    - 필요에 따라 확장 가능
    - 분석
    - 대시보드
    - 고유한 API 엔드포인트
    - 전용 풀 노드
    - 전용 배포에 대한 빠른 동기화 시간
    - 직접 24/7 지원
    - 50개 이상의 블록체인 노드 액세스

- [**Infura**](https://infura.io/)
  - [문서](https://infura.io/docs)
  - 기능
    - 무료 계층 옵션
    - 필요에 따라 확장 가능
    - 유료 아카이브 데이터
    - 직접 지원
    - 대시보드

- [**Kaleido**](https://kaleido.io/)
  - [문서](https://docs.kaleido.io/)
  - 기능
    - 무료 시작 계층
    - 원클릭 이더리움 노드 배포
    - 사용자 지정 가능한 클라이언트 및 알고리즘(Geth, Quorum & Besu || PoA, IBFT & Raft)
    - 500개 이상의 관리 및 서비스 API
    - 이더리움 트랜잭션 제출을 위한 RESTful 인터페이스 (Apache Kafka 지원)
    - 이벤트 전송을 위한 아웃바운드 스트림 (Apache Kafka 지원)
    - 방대한 "오프체인" 및 보조 서비스 컬렉션(예: 양방향 암호화 메시징 전송)
    - 거버넌스 및 역할 기반 접근 제어를 통한 간단한 네트워크 온보딩
    - 관리자 및 최종 사용자를 위한 고급 사용자 관리
    - 매우 확장 가능하고 회복력이 강한 엔터프라이즈급 인프라
    - 클라우드 HSM 개인 키 관리
    - 이더리움 메인넷 연결
    - ISO 27k 및 SOC 2, 유형 2 인증
    - 동적 런타임 구성(예: 클라우드 통합 추가, 노드 인그레스 변경 등)
    - 멀티 클라우드, 멀티 리전 및 하이브리드 배포 오케스트레이션 지원
    - 간단한 시간별 SaaS 기반 가격 책정
    - SLA 및 24x7 지원

- [**Lava Network**](https://www.lavanet.xyz/)
  - [문서](https://docs.lavanet.xyz/)
  - 기능
    - 무료 테스트넷 사용
    - 높은 가동률을 위한 탈중앙화 이중화
    - 오픈 소스
    - 완전히 탈중앙화된 SDK
    - Ethers.js 통합
    - 직관적인 프로젝트 관리 인터페이스
    - 합의 기반 데이터 무결성
    - 멀티 체인 지원

- [**Moralis**](https://moralis.io/)
  - [문서](https://docs.moralis.io/)
  - 기능
    - 무료 공유 노드
    - 무료 공유 아카이브 노드
    - 개인정보 보호 중심 (로그 기록 정책 없음)
    - 크로스 체인 지원
    - 필요에 따라 확장 가능
    - 대시보드
    - 고유한 이더리움 SDK
    - 고유한 API 엔드포인트
    - 직접적인 기술 지원

- [**NodeReal MegaNode**](https://nodereal.io/)
  - [문서](https://docs.nodereal.io/docs/introduction)
  - 기능
    - 신뢰할 수 있고 빠르며 확장 가능한 RPC API 서비스
    - 웹3 개발자를 위한 향상된 API
    - 다중 체인 지원
    - 무료로 시작하기

- [**NOWNodes**](https://nownodes.io/)
  - [문서](https://documenter.getpostman.com/view/13630829/TVmFkLwy)
  - 기능
    - 50개 이상의 블록체인 노드 액세스
    - 무료 API 키
    - 블록 탐색기
    - API 응답 시간 ⩽ 1초
    - 24/7 지원 팀
    - 개인 계정 관리자
    - 공유, 아카이브, 백업 및 전용 노드

- [**Pocket Network**](https://www.pokt.network/)
  - [문서](https://docs.pokt.network/home/)
  - 기능
    - 탈중앙화된 RPC 프로토콜 및 마켓플레이스
    - 일일 1백만 요청 무료 티어 (엔드포인트당, 최대 2개)
    - [퍼블릭 엔드포인트](https://docs.pokt.network/developers/public-endpoints)
    - Pre-Stake+ 프로그램 (일일 1백만 요청 이상 필요 시)
    - 15개 이상의 블록체인 지원
    - 애플리케이션을 제공하며 POKT를 획득하는 6400개 이상의 노드
    - 아카이브 노드, 트레이싱 기능이 있는 아카이브 노드 및 테스트넷 노드 지원
    - 이더리움 메인넷 노드 클라이언트 다양성
    - 단일 장애점 없음
    - 제로 다운타임
    - 비용 효율적인 거의 제로 토크노믹스 (네트워크 대역폭을 위한 POKT 한 번 스테이킹)
    - 월간 고정 비용 없음, 인프라를 자산으로 전환
    - 프로토콜에 내장된 로드 밸런싱
    - 요청 및 시간당 노드 수를 무한대로 확장 가능
    - 가장 개인적이고 검열 저항성이 높은 옵션
    - 실질적인 개발자 지원
    - [Pocket Portal](https://bit.ly/ETHorg_POKTportal) 대시보드 및 분석

- [**QuickNode**](https://www.quicknode.com)
  - [문서](https://www.quicknode.com/docs/)
  - 기능
    - 연중무휴 기술 지원 및 개발자 Discord 커뮤니티
    - 지리적 균형, 다중 클라우드/메탈, 저지연 네트워크
    - 다중 체인 지원 (Optimism, Arbitrum, Polygon + 11개 추가)
    - 속도 및 안정성을 위한 중간 계층(호출 라우팅, 캐시, 인덱싱)
    - 웹훅을 통한 스마트 계약 모니터링
    - 직관적인 대시보드, 분석 도구, RPC 컴포저
    - 고급 보안 기능 (JWT, 마스킹, 화이트리스트)
    - NFT 데이터 및 분석 API
    - [SOC2 인증](https://www.quicknode.com/security)
    - 개발자부터 기업까지 적합

- [**Rivet**](https://rivet.cloud/)
  - [문서](https://rivet.readthedocs.io/en/latest/)
  - 기능
    - 무료 계층 옵션
    - 필요에 따라 확장 가능

- [**SenseiNode**](https://senseinode.com)
  - [문서](https://docs.senseinode.com/)
  - 기능
    - 전용 및 공유 노드
    - 대시보드
    - AWS 외 다양한 라틴 아메리카 지역에서 여러 호스팅 제공자 이용
    - Prysm 및 Lighthouse 클라이언트

- [**SettleMint**](https://console.settlemint.com/)
  - [문서](https://docs.settlemint.com/)
  - 기능
    - 무료 체험
    - 필요에 따라 확장 가능
    - GraphQL 지원
    - RPC 및 WSS 엔드포인트
    - 전용 풀 노드
    - 사용자 클라우드 사용
    - 분석 도구
    - 대시보드
    - 시간당 결제 요금제
    - 직접 지원

- [**Tenderly**](https://tenderly.co/web3-gateway)
  - [문서](https://docs.tenderly.co/web3-gateway/web3-gateway)
  - 기능
    - 월 2,500만 Tenderly 유닛을 포함한 무료 티어
    - 역사적 데이터 무료 접근
    - 최대 8배 빠른 읽기 집중 워크로드
    - 100% 일관된 읽기 액세스
    - JSON-RPC 엔드포인트
    - UI 기반의 RPC 요청 빌더 및 요청 미리보기
    - Tenderly의 개발, 디버깅 및 테스트 도구와 밀접하게 통합됨
    - 트랜잭션 시뮬레이션
    - 사용 분석 및 필터링
    - 간편한 액세스 키 관리
    - 채팅, 이메일, 디스코드를 통한 전용 엔지니어링 지원

- [**Tokenview**](https://services.tokenview.io/)
  - [문서](https://services.tokenview.io/docs?type=nodeService)
  - 기능
    - 연중무휴 기술 지원 및 개발자 텔레그램 커뮤니티
    - 멀티체인 지원 (비트코인, 이더리움, 트론, BNB 스마트 체인, 이더리움 클래식)
    - RPC 및 WSS 엔드포인트 모두 사용 가능
    - 무제한 아카이브 데이터 API 액세스
    - 요청 탐색기 및 메인풀 감시기를 포함한 대시보드
    - NFT 데이터 API 및 Webhook 알림
    - 암호화폐로 결제
    - 추가 행동 요구 사항을 위한 외부 지원

- [**Watchdata**](https://watchdata.io/)
  - [문서](https://docs.watchdata.io/)
  - 기능
    - 데이터 신뢰성
    - 중단 없는 연결로 다운타임 없음
    - 프로세스 자동화
    - 무료 요금제
    - 모든 사용자에게 적합한 높은 제한
    - 다양한 노드 지원
    - 리소스 확장
    - 높은 처리 속도

- [**ZMOK**](https://zmok.io/)
  - [문서](https://docs.zmok.io/)
  - 기능
    - 서비스로서의 프론트러닝
    - 검색/필터링 방법을 갖춘 글로벌 트랜잭션 메인풀
    - 무제한 TX 수수료 및 무한 가스로 트랜잭션 전송
    - 새로운 블록을 가장 빠르게 가져오고 블록체인을 읽음
    - API 호출당 최고의 가격 보장

- [**Zeeve**](https://www.zeeve.io/)
  - [문서](https://www.zeeve.io/docs/)
  - 기능
    - 엔터프라이즈급 코드 없는 자동화 플랫폼으로 블록체인 노드 및 네트워크 배포, 모니터링 및 관리 제공
    - 30개 이상의 프로토콜 및 통합 지원, 계속 추가 중
    - 탈중앙화 스토리지, 탈중앙화 아이덴티티, 블록체인 원장 데이터 API와 같은 부가 웹3 인프라 서비스로 실제 사례에 사용
    - 24/7 지원 및 사전 모니터링으로 노드의 건강 상태를 항상 보장
    - RPC 엔드포인트는 인증된 API 액세스, 직관적인 대시보드 및 분석을 통한 손쉬운 관리 제공
    - 관리형 클라우드 및 사용자가 소유한 클라우드 옵션을 모두 제공하며 AWS, Azure, Google Cloud, Digital Ocean 및 온프레미스와 같은 모든 주요 클라우드 제공업체 지원
    - 지능형 라우팅을 사용하여 항상 사용자의 위치와 가장 가까운 노드를 타격함

## 더 읽어보기 {#further-reading}

- [이더리움 노드 서비스 목록](https://ethereumnodes.com/)

## 관련 주제 {#related-topics}

- [노드 및 클라이언트](/developers/docs/nodes-and-clients/)

## 관련 튜토리얼 {#related-tutorials}

- [Alchemy를 사용한 이더리움 개발 시작하기](/developers/tutorials/getting-started-with-ethereum-development-using-alchemy/)
- [Web3 및 Alchemy를 사용하여 트랜잭션 보내기 가이드](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)
