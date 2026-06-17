---
title: 모든 이더리움 포크 타임라인 (2014년~현재)
description: 주요 마일스톤, 릴리스 및 포크를 포함한 이더리움 블록체인의 역사입니다.
lang: ko
sidebarDepth: 1
authors: ["닉소"]
---

[이더리움](/) 블록체인의 모든 주요 마일스톤, 포크 및 업데이트 타임라인입니다.

<ExpandableCard title="포크란 무엇인가요?" contentPreview="이더리움 프로토콜의 규칙 변경으로, 종종 계획된 기술 업그레이드를 포함합니다.">

포크는 네트워크에 주요 기술적 업그레이드나 변경이 필요할 때 발생합니다. 이는 일반적으로 [이더리움 개선 제안(EIP)](/eips/)에서 비롯되며 프로토콜의 "규칙"을 변경합니다.

전통적인 중앙 통제형 소프트웨어에서 업그레이드가 필요할 때, 회사는 최종 사용자를 위해 새 버전을 배포하기만 하면 됩니다. 블록체인은 중앙 소유권이 없기 때문에 다르게 작동합니다. [이더리움 클라이언트](/developers/docs/nodes-and-clients/)는 새로운 포크 규칙을 구현하기 위해 소프트웨어를 업데이트해야 합니다. 또한 블록 생성자(작업증명(PoW) 환경의 채굴자, 지분 증명(PoS) 환경의 검증자)와 노드는 새로운 규칙에 따라 블록을 생성하고 검증해야 합니다. [합의 메커니즘에 대해 더 알아보기](/developers/docs/consensus-mechanisms/)

이러한 규칙 변경은 네트워크에 일시적인 분할을 일으킬 수 있습니다. 새로운 규칙이나 이전 규칙에 따라 새로운 블록이 생성될 수 있습니다. 포크는 일반적으로 클라이언트가 일제히 변경 사항을 채택하고 업그레이드된 포크가 메인 체인이 되도록 사전에 합의됩니다. 그러나 드문 경우지만 포크에 대한 의견 불일치로 인해 네트워크가 영구적으로 분할될 수 있습니다. 가장 대표적인 예가 <a href="#dao-fork">DAO 포크</a>로 인한 이더리움 클래식의 탄생입니다.

</ExpandableCard>

<ExpandableCard title="일부 업그레이드에 여러 이름이 있는 이유는 무엇인가요?" contentPreview="업그레이드 이름은 패턴을 따릅니다">

이더리움의 기반이 되는 소프트웨어는 [실행 계층](/glossary/#execution-layer)과 [합의 레이어](/glossary/#consensus-layer)라는 두 부분으로 구성됩니다.

**실행 업그레이드 명명 규칙**

2021년부터 **실행 계층**의 업그레이드는 연대순으로 [이전 데브콘(Devcon) 및 데브커넥트(Devconnect) 개최지](https://devcon.org/en/past-events/)의 도시 이름을 따서 명명됩니다.

| 업그레이드 이름 | 데브콘(넥트) 연도 | 데브콘 횟수 | 업그레이드 날짜 |
| -------------- | ----------------- | ------------- | ------------ |
| 베를린         | 2014              | 0             | 2021년 4월 15일 |
| 런던         | 2015              | I             | 2021년 8월 5일  |
| 상하이       | 2016              | II            | 2023년 4월 12일 |
| 칸쿤         | 2017              | III           | 2024년 3월 13일 |
| 프라하         | 2018              | IV            | 2025년 5월 7일  |
| 오사카          | 2019              | V             | 2025년 12월 3일  |
| **암스테르담**  | 2022              | Devconnect    | 미정 - 다음   |
| _보고타_       | 2022              | VI            | 미정          |
| _이스탄불_     | 2023              | Devconnect    | 미정          |
| _방콕_      | 2024              | VII           | 미정          |
| _부에노스아이레스_ | 2025              | Devconnect    | 미정          |
| _뭄바이_       | 2026              | VIII          | 미정          |

**합의 업그레이드 명명 규칙**

[비콘 체인](/glossary/#beacon-chain) 출시 이후, **합의 레이어**의 업그레이드는 알파벳 순서로 시작하는 천체 별의 이름을 따서 명명됩니다.

| 업그레이드 이름                                              | 업그레이드 날짜 |
| --------------------------------------------------------- | ------------ |
| 비콘 체인 제네시스                                      | 2020년 12월 1일  |
| [알타이르](https://en.wikipedia.org/wiki/Altair)            | 2021년 10월 27일 |
| [벨라트릭스](https://en.wikipedia.org/wiki/Bellatrix)      | 2022년 9월 6일  |
| [카펠라](https://en.wikipedia.org/wiki/Capella)          | 2023년 4월 12일 |
| [데네브](https://en.wikipedia.org/wiki/Deneb)              | 2024년 3월 13일 |
| [엘렉트라](<https://en.wikipedia.org/wiki/Electra_(star)>) | 2025년 5월 7일  |
| [풀루](<https://en.wikipedia.org/wiki/Fulu_(star)>)       | 2025년 12월 3일  |
| [**글로아스**](https://en.wikipedia.org/wiki/WASP-13)        | 미정 - 다음   |
| [_헤제_](https://en.wikipedia.org/wiki/Zeta_Virginis)     | 미정          |

**통합 명명 규칙**

실행 및 합의 업그레이드는 초기에 다른 시기에 출시되었지만, 2022년 [머지](/roadmap/merge/) 이후에는 동시에 배포되고 있습니다. 이에 따라 이러한 업그레이드를 하나의 결합된 용어로 간단히 지칭하기 위한 구어적 표현이 등장했습니다. 이는 일반적으로 "**샤펠라**"라고 불리는 _상하이-카펠라_ 업그레이드부터 시작되었으며, 이후 업그레이드에서도 계속 사용되고 있습니다.

| 실행 업그레이드 | 합의 업그레이드 | 약칭    |
| ----------------- | ----------------- | ------------- |
| 상하이          | 카펠라           | "샤펠라"    |
| 칸쿤            | 데네브             | "덴쿤"      |
| 프라하            | 엘렉트라           | "펙트라"      |
| 오사카             | 풀루              | "푸사카"      |
| 암스테르담         | 글로아스             | "글램스테르담" |
| 보고타            | 헤제              | "헤고타"      |

</ExpandableCard>

특히 중요한 과거 업그레이드에 대한 정보로 바로 건너뛰기: [비콘 체인](/roadmap/beacon-chain/), [머지](/roadmap/merge/), [EIP-1559](#london)

향후 프로토콜 업그레이드를 찾고 계신가요? [이더리움 로드맵에서 예정된 업그레이드에 대해 알아보세요](/roadmap/).

<Divider />

## 2025 {#2025}

### 풀루-오사카 ("푸사카") {#fusaka}

<NetworkUpgradeSummary name="fusaka" />

[푸사카에 대해 더 알아보기](/roadmap/fusaka/)

### 프라하-엘렉트라 ("펙트라") {#pectra}

<NetworkUpgradeSummary name="pectra" />

프라하-엘렉트라("펙트라") 업그레이드에는 모든 사용자, 레이어 2 네트워크, 스테이커 및 노드 운영자의 경험을 향상시키는 것을 목표로 하는 이더리움 프로토콜에 대한 몇 가지 개선 사항이 포함되었습니다.

스테이킹은 복리 검증자 계정과 실행 인출 주소를 사용하여 스테이킹된 자금에 대한 제어력을 향상시키는 업그레이드를 받았습니다. EIP-7251은 단일 검증자의 최대 유효 잔고를 2048로 늘려 스테이커의 자본 효율성을 개선했습니다. EIP-7002는 실행 계정이 자금의 일부를 인출하거나 종료하는 것을 포함하여 검증자 작업을 안전하게 트리거할 수 있도록 하여 ETH 스테이커의 경험을 개선하는 동시에 노드 운영자의 책임성을 강화하는 데 도움을 주었습니다.

업그레이드의 다른 부분은 일반 사용자의 경험을 개선하는 데 중점을 두었습니다. EIP-7702는 일반적인 비 스마트 컨트랙트 계정([EOA](/glossary/#eoa))이 스마트 컨트랙트와 유사한 코드를 실행할 수 있는 기능을 도입했습니다. 이를 통해 트랜잭션 일괄 처리, 가스 스폰서십, 대체 인증, 프로그래밍 가능한 지출 제어, 계정 복구 메커니즘 등 기존 이더리움 계정에 대한 무한한 새로운 기능이 열렸습니다.

<ExpandableCard title="펙트라 EIPs" contentPreview="이 업그레이드에 포함된 공식 개선 사항입니다.">

더 나은 사용자 경험:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7702">EIP-7702</a> - <em>EOA 계정 코드 설정</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7691">EIP-7691</a> - <em>블롭 처리량 증가</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7623">EIP-7623</a> - <em>콜 데이터 비용 증가</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7840">EIP-7840</a> - <em>실행 계층(EL) 구성 파일에 블롭 일정 추가</em></li>
</ul>

더 나은 스테이킹 경험:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7251">EIP-7251</a> - <em><code>MAX_EFFECTIVE_BALANCE</code> 증가</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7002">EIP-7002</a> - <em>실행 계층에서 트리거 가능한 종료</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7685">EIP-7685</a> - <em>범용 실행 계층 요청</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6110">EIP-6110</a> - <em>온체인에서 검증자 예치금 공급</em></li>
</ul>

프로토콜 효율성 및 보안 개선:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2537">EIP-2537</a> - <em>BLS12-381 곡선 연산을 위한 프리컴파일</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2935">EIP-2935</a> - <em>상태에 과거 블록 해시 저장</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7549">EIP-7549</a> - <em>증명 외부로 위원회 인덱스 이동</em></li>
</ul>

</ExpandableCard>

- [Pectra.wtf](https://pectra.wtf)
- [펙트라가 스테이킹 경험을 향상시키는 방법](https://www.kiln.fi/post/next-ethereum-upgrade-how-pectra-will-enhance-the-staking-experience)
- [엘렉트라 업그레이드 사양 읽기](https://github.com/ethereum/consensus-specs/tree/master/specs/electra/)
- [프라하-엘렉트라("펙트라") FAQ](/roadmap/pectra/)

<Divider />

## 2024 {#2024}

### 칸쿤-데넵 ("덴쿤") {#dencun}

<NetworkUpgradeSummary name="dencun" />

#### 칸쿤 요약 {#cancun-summary}

칸쿤 업그레이드에는 데넵 합의 업그레이드와 함께 확장성 향상을 목표로 하는 이더리움의 _실행_에 대한 일련의 개선 사항이 포함되어 있습니다.

특히 여기에는 레이어 2 롤업의 데이터 저장 비용을 크게 줄여주는 **프로토 댕크샤딩**으로 알려진 EIP-4844가 포함됩니다. 이는 롤업이 짧은 기간 동안 메인넷에 데이터를 게시할 수 있게 해주는 데이터 "블롭"의 도입을 통해 달성됩니다. 결과적으로 레이어 2 롤업 사용자의 트랜잭션 수수료가 크게 낮아집니다.

<ExpandableCard title="칸쿤 EIPs" contentPreview="이 업그레이드에 포함된 공식 개선 사항입니다.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1153">EIP-1153</a> - <em>임시 저장소 연산 코드</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>EVM의 비콘 블록 루트</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> - <em>샤드 블롭 트랜잭션 (프로토 댕크샤딩)</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5656">EIP-5656</a> - <em><code>MCOPY</code> - 메모리 복사 명령어</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6780">EIP-6780</a> - <em>동일한 트랜잭션에서만 <code>SELFDESTRUCT</code> 허용</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7516">EIP-7516</a> - <em><code>BLOBBASEFEE</code> 연산 코드</em></li>
</ul>

</ExpandableCard>

- [레이어 2 롤업](/layer-2/)
- [프로토 댕크샤딩](/roadmap/scaling/#proto-danksharding)
- [댕크샤딩](/roadmap/danksharding/)
- [칸쿤 업그레이드 사양 읽어보기](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/cancun.md)

#### 데넵 요약 {#deneb-summary}

데넵 업그레이드에는 확장성 향상을 목표로 하는 이더리움의 _합의_에 대한 일련의 개선 사항이 포함되어 있습니다. 이 업그레이드는 비콘 체인에 대한 다른 개선 사항과 함께 프로토 댕크샤딩(EIP-4844)을 활성화하기 위해 칸쿤 실행 업그레이드와 함께 제공됩니다.

사전 생성된 서명된 "자발적 종료 메시지"가 더 이상 만료되지 않으므로, 제3자 노드 운영자에게 자금을 스테이킹하는 사용자에게 더 많은 제어권을 제공합니다. 이 서명된 종료 메시지를 통해 스테이커는 노드 운영을 위임하는 동시에 누구의 허락을 받을 필요 없이 언제든지 안전하게 종료하고 자금을 인출할 수 있는 기능을 유지할 수 있습니다.

EIP-7514는 검증자가 네트워크에 참여할 수 있는 "변동(churn)" 비율을 에포크당 8개로 제한하여 ETH 발행을 강화합니다. ETH 발행량은 스테이킹된 총 ETH에 비례하므로, 참여하는 검증자 수를 제한하면 새로 발행되는 ETH의 _증가율_이 제한되는 동시에 노드 운영자의 하드웨어 요구 사항이 줄어들어 탈중앙화에 도움이 됩니다.

<ExpandableCard title="데넵 EIPs" contentPreview="이 업그레이드에 포함된 공식 개선 사항">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>EVM의 비콘 블록 루트</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> - <em>샤드 블롭 트랜잭션</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7044">EIP-7044</a> - <em>영구적으로 유효한 서명된 자발적 종료</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7045">EIP-7045</a> - <em>최대 증명 포함 슬롯 증가</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7514">EIP-7514</a> - <em>최대 에포크 변동 한도 추가</em></li>
</ul>

</ExpandableCard>

- [데넵 업그레이드 사양 읽어보기](https://github.com/ethereum/consensus-specs/tree/master/specs/deneb/)
- [칸쿤-데넵("덴쿤") FAQ](/roadmap/dencun/)

<Divider />

## 2023 {#2023}

### 상하이-카펠라("샤펠라") {#shapella}

<NetworkUpgradeSummary name="shapella" />

#### 상하이 요약 {#shanghai-summary}

상하이 업그레이드는 실행 계층에 스테이킹 인출 기능을 도입했습니다. 카펠라 업그레이드와 함께 이를 통해 블록이 인출 작업을 수락할 수 있게 되었으며, 스테이커는 비콘 체인에서 실행 계층으로 ETH를 인출할 수 있습니다.

<ExpandableCard title="상하이 EIPs" contentPreview="이 업그레이드에 포함된 공식 개선 사항입니다.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3651">EIP-3651</a> – <em><code>COINBASE</code> 주소를 웜(warm) 상태로 시작</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3855">EIP-3855</a> – <em>새로운 <code>PUSH0</code> 명령어</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3860">EIP-3860</a> – <em>초기화 코드(initcode) 제한 및 측정</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4895">EIP-4895</a> – <em>비콘 체인 푸시 인출을 작업으로 처리</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6049">EIP-6049</a> - <em><code>SELFDESTRUCT</code> 사용 중단</em></li>
</ul>

</ExpandableCard>

- [상하이 업그레이드 사양 읽어보기](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/shanghai.md)

#### 카펠라 요약 {#capella-summary}

카펠라 업그레이드는 합의 레이어(비콘 체인)의 세 번째 주요 업그레이드였으며 스테이킹 인출을 가능하게 했습니다. 카펠라는 실행 계층 업그레이드인 상하이와 동시에 발생했으며 스테이킹 인출 기능을 활성화했습니다.

이 합의 레이어 업그레이드는 초기 예치 시 인출 자격 증명을 제공하지 않은 스테이커가 이를 제공할 수 있는 기능을 도입하여 인출을 가능하게 했습니다.

또한 이 업그레이드는 사용 가능한 보상 지급이나 전체 인출을 위해 검증자 계정을 지속적으로 처리하는 자동 계정 스위핑(sweeping) 기능을 제공했습니다.

- [스테이킹 인출에 대해 더 알아보기](/staking/withdrawals/).
- [카펠라 업그레이드 사양 읽어보기](https://github.com/ethereum/consensus-specs/tree/master/specs/capella/)

<Divider />

## 2022 {#2022}

### 파리 (머지) {#paris}

<NetworkUpgradeSummary name="paris" />

#### 요약 {#paris-summary}

파리 업그레이드는 작업증명 블록체인이 58750000000000000000000의 [종단 총 난이도](/glossary/#terminal-total-difficulty)를 넘어서면서 촉발되었습니다. 이 현상은 2022년 9월 15일 15537393번째 블록에서 발생했으며, 다음 블록에서 파리 업그레이드가 촉발되었습니다. 파리는 [머지](/roadmap/merge/) 전환이었습니다. 주요 특징은 [작업증명](/developers/docs/consensus-mechanisms/pow) 채굴 알고리즘과 관련 합의 로직을 끄고 대신 [지분 증명](/developers/docs/consensus-mechanisms/pos)을 켜는 것이었습니다. 파리 자체는 연결된 [합의 클라이언트](/developers/docs/nodes-and-clients/#consensus-clients)로부터 지시를 받을 수 있도록 하는 [실행 클라이언트](/developers/docs/nodes-and-clients/#execution-clients)의 업그레이드(합의 레이어의 벨라트릭스에 해당)였습니다. 이를 위해서는 [엔진 API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md)로 통칭되는 새로운 내부 API 메서드 세트를 활성화해야 했습니다. 이는 틀림없이 [홈스테드](#homestead) 이후 이더리움 역사상 가장 중요한 업그레이드였습니다!

- [파리 업그레이드 사양 읽어보기](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/paris.md)

<ExpandableCard title="파리 EIPs" contentPreview="이 업그레이드에 포함된 공식 개선 사항입니다.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3675">EIP-3675</a> – <em>합의를 지분 증명으로 업그레이드</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4399">EIP-4399</a> – <em>DIFFICULTY 연산 코드를 PREVRANDAO로 대체</em></li>
</ul>

</ExpandableCard>

---

### 벨라트릭스 {#bellatrix}

<NetworkUpgradeSummary name="bellatrix" />

#### 요약 {#bellatrix-summary}

벨라트릭스 업그레이드는 [비콘 체인](/roadmap/beacon-chain)의 두 번째 예정된 업그레이드로, [머지](/roadmap/merge/)를 위해 체인을 준비하는 과정이었습니다. 이 업그레이드는 비활동 및 슬래싱 가능한 위반에 대한 검증자 페널티를 최대치로 적용합니다. 또한 벨라트릭스에는 머지와 마지막 작업증명 블록에서 첫 번째 지분 증명 블록으로의 전환을 위해 체인을 준비하는 포크 선택 규칙에 대한 업데이트가 포함되어 있습니다. 여기에는 합의 클라이언트가 58750000000000000000000의 [종단 총 난이도](/glossary/#terminal-total-difficulty)를 인식하도록 하는 것이 포함됩니다.

- [벨라트릭스 업그레이드 사양 읽어보기](https://github.com/ethereum/consensus-specs/tree/master/specs/bellatrix)

---

### 그레이 글래시어 {#gray-glacier}

<NetworkUpgradeSummary name="grayGlacier" />

#### 요약 {#gray-glacier-summary}

그레이 글래시어 네트워크 업그레이드는 [난이도 폭탄](/glossary/#difficulty-bomb)을 3개월 연기했습니다. 이것이 이 업그레이드에 도입된 유일한 변경 사항이며, [애로우 글래시어](#arrow-glacier) 및 [뮤어 글래시어](#muir-glacier) 업그레이드와 성격이 비슷합니다. [비잔티움](#byzantium), [콘스탄티노플](#constantinople) 및 [런던](#london) 네트워크 업그레이드에서도 유사한 변경이 수행되었습니다.

- [이더리움 재단 블로그 - 그레이 글래시어 업그레이드 발표](https://blog.ethereum.org/2022/06/16/gray-glacier-announcement)

<ExpandableCard title="그레이 글래시어 EIPs" contentPreview="이 업그레이드에 포함된 공식 개선 사항입니다.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5133">EIP-5133</a> – <em>난이도 폭탄을 2022년 9월까지 연기</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2021 {#2021}

### 애로우 글래시어 {#arrow-glacier}

<NetworkUpgradeSummary name="arrowGlacier" />

#### 요약 {#arrow-glacier-summary}

애로우 글래시어 네트워크 업그레이드는 [난이도 폭탄](/glossary/#difficulty-bomb)을 몇 달 뒤로 연기했습니다. 이것이 이번 업그레이드에 도입된 유일한 변경 사항이며, 그 성격은 [뮤어 글래시어](#muir-glacier) 업그레이드와 유사합니다. [비잔티움](#byzantium), [콘스탄티노플](#constantinople) 및 [런던](#london) 네트워크 업그레이드에서도 유사한 변경이 수행된 바 있습니다.

- [이더리움 재단 블로그 - 애로우 글래시어 업그레이드 발표](https://blog.ethereum.org/2021/11/10/arrow-glacier-announcement)
- [Ethereum Cat Herders - 이더리움 애로우 글래시어 업그레이드](https://medium.com/ethereum-cat-herders/ethereum-arrow-glacier-upgrade-e8d20fa4c002)

<ExpandableCard title="애로우 글래시어 EIPs" contentPreview="이 업그레이드에 포함된 공식 개선 사항입니다.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4345">EIP-4345</a> – <em>난이도 폭탄을 2022년 6월까지 연기</em></li>
</ul>

</ExpandableCard>

---

### 알타이르 {#altair}

<NetworkUpgradeSummary name="altair" />

#### 요약 {#altair-summary}

알타이르 업그레이드는 [비콘 체인](/roadmap/beacon-chain)의 첫 번째 예정된 업그레이드였습니다. 이 업그레이드는 경량 클라이언트를 활성화하는 "동기화 위원회"에 대한 지원을 추가했으며, 머지를 향한 개발이 진행됨에 따라 검증자의 비활동 및 슬래싱 페널티를 강화했습니다.

- [알타이르 업그레이드 사양 읽어보기](https://github.com/ethereum/consensus-specs/tree/master/specs/altair)

#### <Emoji text=":tada:" size={1} className="me-2" /> 재미있는 사실! {#altair-fun-fact}

알타이르는 정확한 출시 시간이 정해진 최초의 주요 네트워크 업그레이드였습니다. 이전의 모든 업그레이드는 블록 타임이 가변적인 작업증명 (PoW) 체인에서 선언된 블록 번호를 기반으로 했습니다. 비콘 체인은 작업증명 (PoW)을 해결할 필요가 없으며, 대신 검증자가 블록을 제안할 수 있는 12초 길이의 "슬롯" 32개로 구성된 시간 기반 에포크 시스템으로 작동합니다. 이것이 바로 우리가 언제 에포크 74,240에 도달하여 알타이르가 활성화될지 정확히 알 수 있었던 이유입니다!

- [블록 타임](/developers/docs/blocks/#block-time)

---

### 런던 {#london}

<NetworkUpgradeSummary name="london" />

#### 요약 {#london-summary}

런던 업그레이드는 트랜잭션 수수료 시장을 개편한 [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559)를 도입했으며, 가스 환불 처리 방식 및 [빙하기](/glossary/#ice-age) 일정에 대한 변경 사항을 포함했습니다.

#### 런던 업그레이드 / EIP-1559란 무엇인가요? {#eip-1559}

런던 업그레이드 이전의 이더리움은 고정된 크기의 블록을 가지고 있었습니다. 네트워크 수요가 높을 때, 이 블록들은 최대 용량으로 작동했습니다. 그 결과, 사용자들은 블록에 포함되기 위해 수요가 줄어들 때까지 기다려야 하는 경우가 많았고, 이는 열악한 사용자 경험으로 이어졌습니다. 런던 업그레이드는 이더리움에 가변적인 크기의 블록을 도입했습니다.

이더리움 네트워크의 트랜잭션 수수료 계산 방식은 2021년 8월의 [런던 업그레이드](/ethereum-forks/#london)와 함께 변경되었습니다. 런던 업그레이드 이전에는 수수료가 `base`와 `priority` 수수료로 분리되지 않고 다음과 같이 계산되었습니다.

앨리스가 밥에게 1 ETH를 지불해야 한다고 가정해 보겠습니다. 이 트랜잭션에서 가스 한도는 21,000 단위이고, 가스 가격은 200 Gwei입니다.

총 수수료는 다음과 같았을 것입니다: `Gas units (limit) * Gas price per unit` 즉 `21,000 * 200 = 4,200,000 gwei` 또는 0.0042 ETH

런던 업그레이드에서 [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559)가 구현되면서 트랜잭션 수수료 메커니즘은 더 복잡해졌지만, 가스 수수료를 더 예측 가능하게 만들어 결과적으로 더 효율적인 트랜잭션 수수료 시장을 형성했습니다. 사용자는 트랜잭션 실행을 위해 지불할 의사가 있는 금액에 해당하는 `maxFeePerGas`와 함께 트랜잭션을 제출할 수 있으며, 가스의 시장 가격(`baseFeePerGas`)보다 더 많이 지불하지 않는다는 것을 알고, 팁을 제외한 초과분은 환불받게 됩니다.

다음 영상은 EIP-1559와 그 이점에 대해 설명합니다: [EIP-1559 설명](https://www.youtube.com/watch?v=MGemhK9t44Q)

- [탈중앙화 애플리케이션 (dapp) 개발자이신가요? 라이브러리와 도구를 반드시 업그레이드하세요.](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/london-ecosystem-readiness.md)
- [이더리움 재단 발표 읽어보기](https://blog.ethereum.org/2021/07/15/london-mainnet-announcement)
- [Ethereum Cat Herders의 설명 읽어보기](https://medium.com/ethereum-cat-herders/london-upgrade-overview-8eccb0041b41)

<ExpandableCard title="런던 EIPs" contentPreview="이 업그레이드에 포함된 공식 개선 사항입니다.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1559">EIP-1559</a> – <em>트랜잭션 수수료 시장 개선</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3198">EIP-3198</a> – <em>블록에서 <code>BASEFEE</code> 반환</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3529">EIP-3529</a> - <em>EVM 작업에 대한 가스 환불 감소</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3541">EIP-3541</a> - <em><code>0xEF</code>로 시작하는 컨트랙트 배포 방지</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3554">EIP-3554</a> – <em>빙하기를 2021년 12월까지 연기</em></li>
</ul>

</ExpandableCard>

---

### 베를린 {#berlin}

<NetworkUpgradeSummary name="berlin" />

#### 요약 {#berlin-summary}

베를린 업그레이드는 특정 EVM 작업에 대한 가스 비용을 최적화하고, 다중 트랜잭션 유형에 대한 지원을 강화했습니다.

- [이더리움 재단 발표 읽어보기](https://blog.ethereum.org/2021/03/08/ethereum-berlin-upgrade-announcement)
- [Ethereum Cat Herders의 설명 읽어보기](https://medium.com/ethereum-cat-herders/the-berlin-upgrade-overview-2f7ad710eb80)

<ExpandableCard title="베를린 EIPs" contentPreview="이 업그레이드에 포함된 공식 개선 사항입니다.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2565">EIP-2565</a> – <em>ModExp 가스 비용 인하</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2718">EIP-2718</a> – <em>다중 트랜잭션 유형에 대한 더 쉬운 지원 활성화</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2929">EIP-2929</a> – <em>상태 접근 연산 코드에 대한 가스 비용 증가</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2930">EIP-2930</a> – <em>선택적 접근 목록 추가</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2020 {#2020}

### 비콘 체인 제네시스 {#beacon-chain-genesis}

<NetworkUpgradeSummary name="beaconChainGenesis" />

#### 요약 {#beacon-chain-genesis-summary}

[비콘 체인](/roadmap/beacon-chain/)을 안전하게 출시하기 위해서는 32개의 스테이킹된 ETH 예치가 16,384건 필요했습니다. 이 조건은 11월 27일에 충족되었으며, 비콘 체인은 2020년 12월 1일부터 블록을 생성하기 시작했습니다.

[이더리움 재단 공지 읽어보기](https://blog.ethereum.org/2020/11/27/eth2-quick-update-no-21)

<DocLink href="/roadmap/beacon-chain/">
  비콘 체인
</DocLink>

---

### 스테이킹 예치 컨트랙트 배포 {#staking-deposit-contract}

<NetworkUpgradeSummary name="stakingDepositContractDeployed" />

#### 요약 {#deposit-contract-summary}

스테이킹 예치 컨트랙트는 이더리움 생태계에 [스테이킹](/glossary/#staking)을 도입했습니다. 이는 [메인넷](/glossary/#mainnet) 컨트랙트였지만, 중요한 [이더리움 업그레이드](/roadmap/)인 [비콘 체인](/roadmap/beacon-chain/)의 출시 일정에 직접적인 영향을 미쳤습니다.

[이더리움 재단 공지 읽어보기](https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19)

<DocLink href="/staking/">
  스테이킹
</DocLink>

---

### 뮤어 글레이셔 {#muir-glacier}

<NetworkUpgradeSummary name="muirGlacier" />

#### 요약 {#muir-glacier-summary}

뮤어 글레이셔 포크는 [난이도 폭탄](/glossary/#difficulty-bomb)을 연기했습니다. [작업증명 (PoW)](/developers/docs/consensus-mechanisms/pow/) 합의 메커니즘의 블록 난이도 증가는 트랜잭션 전송 및 탈중앙화 애플리케이션 (dapp) 사용의 대기 시간을 늘려 이더리움의 사용성을 저하시킬 위험이 있었습니다.

- [이더리움 재단 공지 읽어보기](https://blog.ethereum.org/2019/12/23/ethereum-muir-glacier-upgrade-announcement)
- [Ethereum Cat Herders의 설명 읽어보기](https://medium.com/ethereum-cat-herders/ethereum-muir-glacier-upgrade-89b8cea5a210)

<ExpandableCard title="뮤어 글래시어 EIPs" contentPreview="이 포크에 포함된 공식 개선 사항입니다.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2384">EIP-2384</a> – <em>난이도 폭탄을 4,000,000 블록(약 611일) 더 연기합니다.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2019 {#2019}

### 이스탄불 {#istanbul}

<NetworkUpgradeSummary name="istanbul" />

#### 요약 {#istanbul-summary}

이스탄불 포크:

- [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine) 내 특정 작업의 [가스](/glossary/#gas) 비용을 최적화했습니다.
- 서비스 거부(DoS) 공격에 대한 복원력을 향상시켰습니다.
- SNARK 및 STARK 기반의 [레이어 2 (l2) 확장](/developers/docs/scaling/#layer-2-scaling) 솔루션 성능을 개선했습니다.
- 이더리움과 Zcash가 상호 운용될 수 있도록 했습니다.
- 컨트랙트가 더 창의적인 기능을 도입할 수 있도록 허용했습니다.

[이더리움 재단 공지 읽어보기](https://blog.ethereum.org/2019/11/20/ethereum-istanbul-upgrade-announcement)

<ExpandableCard title="이스탄불 EIPs" contentPreview="이 포크에 포함된 공식 개선 사항입니다.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-152">EIP-152</a> – <em>이더리움이 Zcash와 같은 프라이버시 보호 통화와 연동될 수 있도록 허용합니다.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1108">EIP-1108</a> – <em>[가스](/glossary/#gas) 비용을 개선하기 위해 더 저렴한 암호학을 도입합니다.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1344">EIP-1344</a> – <em><code>CHAINID</code> [연산 코드](/developers/docs/ethereum-stack/#ethereum-virtual-machine)를 추가하여 리플레이 공격으로부터 이더리움을 보호합니다.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1884">EIP-1884</a> – <em>소비량에 따라 연산 코드 가스 가격을 최적화합니다.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2028">EIP-2028</a> – <em>블록에 더 많은 데이터를 포함할 수 있도록 콜 데이터 비용을 줄입니다. 이는 [레이어 2 (l2) 확장](/developers/docs/scaling/#layer-2-scaling)에 유용합니다.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2200">EIP-2200</a> – <em>기타 연산 코드 가스 가격을 변경합니다.</em></li>
</ul>

</ExpandableCard>

---

### 콘스탄티노플 {#constantinople}

<NetworkUpgradeSummary name="constantinople" />

#### 요약 {#constantinople-summary}

콘스탄티노플 포크:

- 블록 [채굴](/developers/docs/consensus-mechanisms/pow/mining/) 보상을 3 ETH에서 2 ETH로 줄였습니다.
- [지분 증명 (PoS)이 구현](#beacon-chain-genesis)되기 전에 블록체인이 멈추지 않도록 보장했습니다.
- [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine) 내 특정 작업의 [가스](/glossary/#gas) 비용을 최적화했습니다.
- 아직 생성되지 않은 주소와 상호 작용할 수 있는 기능을 추가했습니다.

[이더리움 재단 공지 읽어보기](https://blog.ethereum.org/2019/02/22/ethereum-constantinople-st-petersburg-upgrade-announcement)

<ExpandableCard title="콘스탄티노플 EIPs" contentPreview="이 포크에 포함된 공식 개선 사항입니다.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-145">EIP-145</a> – <em>특정 온체인 작업의 비용을 최적화합니다.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1014">EIP-1014</a> – <em>아직 생성되지 않은 주소와 상호 작용할 수 있도록 허용합니다.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1052">EIP-1052</a> – <em>다른 컨트랙트 코드의 해시를 검색하기 위해 <code>EXTCODEHASH</code> 명령어를 도입합니다.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1234">EIP-1234</a> – <em>지분 증명 (PoS) 이전에 블록체인이 멈추지 않도록 보장하고 블록 보상을 3 ETH에서 2 ETH로 줄입니다.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2017 {#2017}

### 비잔티움 {#byzantium}

<NetworkUpgradeSummary name="byzantium" />

#### 요약 {#byzantium-summary}

비잔티움 포크:

- 블록 [채굴](/developers/docs/consensus-mechanisms/pow/mining/) 보상을 5 ETH에서 3 ETH로 감소시켰습니다.
- [난이도 폭탄](/glossary/#difficulty-bomb)을 1년 연기했습니다.
- 다른 컨트랙트로 상태를 변경하지 않는 호출을 할 수 있는 기능을 추가했습니다.
- [레이어 2 확장](/developers/docs/scaling/#layer-2-scaling)을 허용하기 위해 특정 암호학 메서드를 추가했습니다.

[이더리움 재단 공지 읽기](https://blog.ethereum.org/2017/10/12/byzantium-hf-announcement)

<ExpandableCard title="비잔티움 EIPs" contentPreview="이 포크에 포함된 공식 개선 사항입니다.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-140">EIP-140</a> – <em><code>REVERT</code> 연산 코드를 추가합니다.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-658">EIP-658</a> – <em>성공 또는 실패를 나타내기 위해 트랜잭션 영수증에 상태 필드를 추가합니다.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-196">EIP-196</a> – <em>[ZK-Snarks](/developers/docs/scaling/zk-rollups/)를 허용하기 위해 타원 곡선 및 스칼라 곱셈을 추가합니다.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-197">EIP-197</a> – <em>[ZK-Snarks](/developers/docs/scaling/zk-rollups/)를 허용하기 위해 타원 곡선 및 스칼라 곱셈을 추가합니다.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-198">EIP-198</a> – <em>RSA 서명 검증을 활성화합니다.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-211">EIP-211</a> – <em>가변 길이 반환 값에 대한 지원을 추가합니다.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-214">EIP-214</a> – <em><code>STATICCALL</code> 연산 코드를 추가하여, 다른 컨트랙트로 상태를 변경하지 않는 호출을 허용합니다.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-100">EIP-100</a> – <em>난이도 조정 공식을 변경합니다.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-649">EIP-649</a> – <em>[난이도 폭탄](/glossary/#difficulty-bomb)을 1년 연기하고 블록 보상을 5 ETH에서 3 ETH로 감소시킵니다.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2016 {#2016}

### 스퓨리어스 드래곤 {#spurious-dragon}

<NetworkUpgradeSummary name="spuriousDragon" />

#### 요약 {#spurious-dragon-summary}

스퓨리어스 드래곤 포크는 네트워크에 대한 서비스 거부(DoS) 공격(2016년 9월/10월)에 대한 두 번째 대응으로, 다음을 포함합니다.

- 향후 네트워크 공격을 방지하기 위한 연산 코드 가격 조정.
- 블록체인 상태의 "디블로트(debloat, 비대화 해소)" 활성화.
- 재전송 공격 보호 기능 추가.

[이더리움 재단 공지 읽기](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon)

<ExpandableCard title="스퓨리어스 드래곤 EIPs" contentPreview="이 포크에 포함된 공식 개선 사항입니다.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-155">EIP-155</a> – <em>한 이더리움 체인의 트랜잭션이 다른 체인에서 재전송되는 것을 방지합니다. 예를 들어 테스트넷 트랜잭션이 메인 이더리움 체인에서 재전송되는 것을 막습니다.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-160">EIP-160</a> – <em><code>EXP</code> 연산 코드의 가격을 조정하여, 계산 비용이 많이 드는 컨트랙트 작업을 통해 네트워크를 느려지게 만드는 것을 더 어렵게 합니다.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-161">EIP-161</a> – <em>DOS 공격을 통해 추가된 빈 계정을 제거할 수 있도록 합니다.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-170">EIP-170</a> – <em>블록체인 상의 컨트랙트가 가질 수 있는 최대 코드 크기를 24576 바이트로 변경합니다.</em></li>
</ul>

</ExpandableCard>

---

### 탠저린 휘슬 {#tangerine-whistle}

<NetworkUpgradeSummary name="tangerineWhistle" />

#### 요약 {#tangerine-whistle-summary}

탠저린 휘슬 포크는 네트워크에 대한 서비스 거부(DoS) 공격(2016년 9월/10월)에 대한 첫 번째 대응으로, 다음을 포함합니다.

- 가격이 너무 낮게 책정된 연산 코드와 관련된 긴급한 네트워크 상태 문제 해결.

[이더리움 재단 공지 읽기](https://blog.ethereum.org/2016/10/18/faq-upcoming-ethereum-hard-fork)

<ExpandableCard title="탠저린 휘슬 EIPs" contentPreview="이 포크에 포함된 공식 개선 사항입니다.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-150">EIP-150</a> – <em>스팸 공격에 사용될 수 있는 연산 코드의 가스 비용을 인상합니다.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-158">EIP-158</a> – <em>초기 이더리움 프로토콜 버전의 결함으로 인해 매우 낮은 비용으로 상태에 추가된 대량의 빈 계정을 제거하여 상태 크기를 줄입니다.</em></li>
</ul>

</ExpandableCard>

---

### DAO 포크 {#dao-fork}

<NetworkUpgradeSummary name="daoFork" />

#### 요약 {#dao-fork-summary}

DAO 포크는 보안이 취약한 [DAO](/glossary/#dao) 컨트랙트가 해킹당해 360만 개 이상의 ETH가 유출된 [2016년 DAO 공격](https://www.coindesk.com/learn/understanding-the-dao-attack/)에 대한 대응이었습니다. 이 포크는 결함이 있는 컨트랙트의 자금을 인출(withdraw)이라는 단일 기능만 있는 [새로운 컨트랙트](https://eth.blockscout.com/address/0xbf4ed7b27f1d666546e30d74d50d173d20bca754)로 이동시켰습니다. 자금을 잃은 사람은 누구나 지갑에 있는 100 DAO 토큰당 1 ETH를 인출할 수 있었습니다.

이러한 조치는 이더리움 커뮤니티의 투표를 통해 결정되었습니다. ETH 보유자는 누구나 [투표 플랫폼](https://web.archive.org/web/20170620030820/http://v1.carbonvote.com/)에서 트랜잭션을 통해 투표할 수 있었습니다. 포크 결정은 85% 이상의 찬성표를 얻었습니다.

일부 채굴자들은 DAO 사건이 프로토콜의 결함이 아니라는 이유로 포크를 거부했습니다. 이들은 이후 [이더리움 클래식](https://ethereumclassic.org/)을 형성하게 되었습니다.

[이더리움 재단 공지 읽기](https://blog.ethereum.org/2016/07/20/hard-fork-completed)

---

### 홈스테드 {#homestead}

<NetworkUpgradeSummary name="homestead" />

#### 요약 {#homestead-summary}

미래를 내다본 홈스테드 포크입니다. 이 포크에는 이더리움이 향후 네트워크 업그레이드를 수행할 수 있는 기능을 제공하는 몇 가지 프로토콜 변경 사항과 네트워킹 변경 사항이 포함되었습니다.

[이더리움 재단 공지 읽기](https://blog.ethereum.org/2016/02/29/homestead-release)

<ExpandableCard title="홈스테드 EIPs" contentPreview="이 포크에 포함된 공식 개선 사항입니다.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2">EIP-2</a> – <em>컨트랙트 생성 프로세스를 수정합니다.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7">EIP-7</a> – <em>새로운 연산 코드인 <code>DELEGATECALL</code>을 추가합니다.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-8">EIP-8</a> – <em>devp2p 상위 호환성 요구 사항을 도입합니다.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2015 {#2015}

### 프론티어 해동 {#frontier-thawing}

<NetworkUpgradeSummary name="frontierThawing" />

#### 요약 {#frontier-thawing-summary}

프론티어 해동 포크는 [블록](/glossary/#block)당 5,000의 [가스](/glossary/#gas) 한도를 해제하고 기본 가스 가격을 51 [Gwei](/glossary/#gwei)로 설정했습니다. 이를 통해 트랜잭션이 가능해졌습니다. 트랜잭션에는 21,000의 가스가 필요합니다. 향후 [지분 증명 (PoS)](/glossary/#pos)으로의 하드 포크를 보장하기 위해 [난이도 폭탄](/glossary/#difficulty-bomb)이 도입되었습니다.

- [이더리움 재단 공지 읽기](https://blog.ethereum.org/2015/08/04/the-thawing-frontier)
- [이더리움 프로토콜 업데이트 1 읽기](https://blog.ethereum.org/2015/08/04/ethereum-protocol-update-1)

---

### 프론티어 {#frontier}

<NetworkUpgradeSummary name="frontier" />

#### 요약 {#frontier-summary}

프론티어는 이더리움 프로젝트의 라이브 버전이었지만, 가장 기본적인 기능만 갖춘 구현체였습니다. 성공적인 올림픽(Olympic) 테스트 단계를 거친 후 출시되었습니다. 기술적인 지식을 갖춘 사용자, 특히 개발자를 대상으로 했습니다. [블록](/glossary/#block)은 5,000의 [가스](/glossary/#gas) 한도를 가졌습니다. 이 '해동(thawing)' 기간을 통해 채굴자들은 작업을 시작할 수 있었고, 얼리 어답터들은 '서두르지' 않고도 클라이언트를 설치할 수 있었습니다.

[이더리움 재단 공지 읽기](https://blog.ethereum.org/2015/07/22/frontier-is-coming-what-to-expect-and-how-to-prepare)

<Divider />

## 2014 {#2014}

### 이더 판매 {#ether-sale}

<NetworkUpgradeSummary name="etherSale" />

이더가 42일 동안 공식적으로 판매되었습니다. BTC로 구매할 수 있었습니다.

[이더리움 재단 공지 읽어보기](https://blog.ethereum.org/2014/07/22/launching-the-ether-sale)

---

### 황서 발표 {#yellowpaper}

<NetworkUpgradeSummary name="yellowpaperRelease" />

개빈 우드 박사가 작성한 황서는 이더리움 프로토콜에 대한 기술적 정의입니다.

[황서 보기](https://github.com/ethereum/yellowpaper)

<Divider />

## 2013 {#2013}

### 백서 공개 {#whitepaper}

<NetworkUpgradeSummary name="whitepaperRelease" />

2015년 프로젝트가 출시되기 전인 2013년, 이더리움의 창립자인 비탈릭 부테린이 발표한 소개서입니다.

<DocLink href="/whitepaper/">
  백서
</DocLink>