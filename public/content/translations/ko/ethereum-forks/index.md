---
title: "모든 이더리움 포크 연대표(2014년~현재)"
description: "주요 마일스톤, 출시 및 포크를 포함한 이더리움 블록체인의 역사"
lang: ko
sidebarDepth: 1
---

# 모든 이더리움 포크 연대표(2014년~현재) {#the-history-of-ethereum}

이더리움 블록체인에 대한 모든 주요 마일스톤, 포크 및 업데이트 타임라인

<ExpandableCard title="포크란 무엇인가요?" contentPreview="주로 계획된 기술 업그레이드를 포함하는 이더리움 프로토콜 규칙 변경">

포크는 네트워크에 주요 기술 업그레이드나 변경이 필요할 때 일어납니다. 일반적으로 [이더리움 개선 제안 (EIPs)](/eips/) 에서 유래하며 프로토콜의 규칙을 변경합니다.

중앙에서 제어되는 기존 소프트웨어에서 업그레이드가 필요할 때, 회사는 최종 사용자를 위한 새 버전을 게시만 하면
됩니다. 블록체인은 중앙 소유권이 없기때문에 다르게 작동합니다. [이더리움 클라이언트](/developers/docs/nodes-and-clients/) 는 새로운 포크 규칙을 구현하기 위해 그들의 소프트웨어를 업데이트해야합니다. 그리고 블록 생성자(작업 증명의 채굴자나 지분 증명의 검증자) 와 노드는 블록을 생성하고 새로운 규칙을 검증해야합니다. [합의 메커니즘에 대해 더 알아보기](/developers/docs/consensus-mechanisms/)

이러한 규칙 변경은 네트워크에 일시적인 분할을 만들 수 있습니다. 새로운 블록은 새로운 규칙이나 이전의 규칙에 따라 생산될 수 있습니다. 포크는 클라이언트가 일괄적으로 변경을 채택하도록 사전에 합의 되며 업그레이드된 포크가 메인체인이 됩니다. 그러나, 드문 경우지만, 포크에 대한 의견 불일치로 인해 네트워크가 영구적으로 분할될 수 있습니다. 특히 <a href="#dao-fork">DAO 포크</a>로 이더리움 클래식을 만들 수 있습니다.
</ExpandableCard>

<ExpandableCard title="일부 업그레이드에 여러 이름이 있는 이유는 무엇인가요?" contentPreview="업그레이드 이름에는 패턴이 있습니다">

이더리움을 뒷받침하는 소프트웨어는 실행 레이어와 합의 레이어로 알려진 두 부분으로 구성되어 있습니다.

**실행 업그레이드 명명법**

2021년부터 **실행 레이어** 업그레이드는 [이전 Devcon 개최지](https://devcon.org/en/past-events/)의 도시 이름을 시간순으로 따서 명명됩니다.

| 업그레이드 이름 | Devcon 연도              | Devcon 회차 | 업그레이드 날짜     |
| -------- | ---------------------- | --------- | ------------ |
| 베를린      | 2014                   | 0         | 2021년 4월 15일 |
| 런던       | 2015                   | I         | 2021년 8월 5일  |
| 상하이      | 2016                   | II        | 2023년 4월 12일 |
| 칸쿤       | 2017                   | III       | 2024년 3월 13일 |
| **프라하**  | 2018                   | IV        | 미정 - 다음      |
| _오사카_    | 209                    | V         | 미정           |
| _보고타_    | 2022                   | VI        | 미정           |
| _방콕_     | 2024년. | VII       | 미정           |

**합의 업그레이드 명명법**

[비콘 체인](/glossary/#beacon-chain) 출시 이후, **합의 레이어** 업그레이드는 알파벳순으로 진행되는 문자로 시작하는 천체의 별 이름을 따서 명명됩니다.

| 업그레이드 이름                                                   | 업그레이드 날짜      |
| ---------------------------------------------------------- | ------------- |
| 비콘 체인 제네시스                                                 | 2020년 12월 1일  |
| [알타이르](https://en.wikipedia.org/wiki/Altair)               | 2021년 10월 27일 |
| [벨라트릭스](https://en.wikipedia.org/wiki/Bellatrix)           | 2022년 9월 6일   |
| [카펠라](https://en.wikipedia.org/wiki/Capella)               | 2023년 4월 12일  |
| [데네브](https://en.wikipedia.org/wiki/Deneb)                 | 2024년 3월 13일  |
| [**일렉트라**](https://en.wikipedia.org/wiki/Electra_\(star\)) | 미정 - 다음       |
| [_푸루_](https://en.wikipedia.org/wiki/Fulu_\(star\))        | 미정            |

**통합 명명법**

실행 및 합의 업그레이드는 처음에는 서로 다른 시기에 출시되었지만, 2022년 [병합](/roadmap/merge/) 이후에는 동시에 배포되었습니다. 이러한 이유로, 이러한 업그레이드를 단일 결합된 용어로 참조하기 위해 구어적 용어가 등장했습니다. 이는 일반적으로 "**샤펠라**"라고 불리는 _상하이-카펠라_ 업그레이드로 시작하여, _칸쿤-데네브_ (**덴쿤**) 및 _프라하-일렉트라_ (**펙트라**) 업그레이드로 이어집니다.

| 실행 업그레이드 | 합의 업그레이드 | 약칭    |
| -------- | -------- | ----- |
| 상하이      | 카펠라      | "샤펠라" |
| 칸쿤       | 데네브      | "덴쿤"  |
| 프라하      | 일렉트라     | "펙트라" |
| 오사카      | 푸루       | "푸사카" |
</ExpandableCard>

특히 중요한 과거 업그레이드에 대한 정보로 바로 가기: [비콘 체인](/roadmap/beacon-chain/), [병합](/roadmap/merge/), [EIP-1559](#london)

향후 프로토콜 업그레이드에 대해 찾고 계십니까? [이더리움 로드맵의 예정된 업그레이드에 대해 알아보기](/roadmap/).

<Divider />

## 2025 {#2025}

### 푸루-오사카("푸사카") {#fusaka}

<NetworkUpgradeSummary name="fusaka" />

[푸사카에 대해 더 알아보기](/roadmap/fusaka/)

### 프라하-일렉트라("펙트라") {#pectra}

<NetworkUpgradeSummary name="pectra" />

프라하-일렉트라("펙트라") 업그레이드는 모든 사용자, 레이어 2 네트워크, 스테이커 및 노드 운영자의 경험을 향상시키기 위한 이더리움 프로토콜의 몇 가지 개선 사항을 포함합니다.

스테이킹은 검증인 계정 복리 기능으로 업그레이드되었으며, 실행 인출 주소를 사용하여 스테이킹된 자금에 대한 통제가 개선되었습니다. EIP-7251은 단일 검증인의 최대 유효 잔액을 2048로 늘려 스테이커의 자본 효율성을 개선했습니다. EIP-7002는 실행 계정이 종료 또는 자금 일부 인출을 포함한 검증인 작업을 안전하게 트리거할 수 있도록 하여 ETH 스테이커의 경험을 개선하는 동시에 노드 운영자의 책임성을 강화하는 데 도움을 주었습니다.

업그레이드의 다른 부분은 일반 사용자의 경험을 개선하는 데 중점을 두었습니다. EIP-7702는 일반적인 비스마트 계약 계정([EOA](/glossary/#eoa))이 스마트 계약과 유사한 코드를 실행할 수 있는 기능을 도입했습니다. 이는 트랜잭션 일괄 처리, 가스 후원, 대체 인증, 프로그래밍 가능한 지출 제어, 계정 복구 메커니즘 등 기존 이더리움 계정을 위한 무한한 새로운 기능을 열었습니다.

<ExpandableCard title="Pectra EIP" contentPreview="이번 업그레이드에 포함된 공식 개선 사항">

더 나은 사용자 경험:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7702">EIP-7702</a> - _EOA 계정 코드 설정_</li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7691">EIP-7691</a> - _블롭 처리량 증가_</li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7623">EIP-7623</a> - _calldata 비용 증가_</li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7840">EIP-7840</a> - _EL 구성 파일에 블롭 스케줄 추가_</li>
</ul>

더 나은 스테이킹 경험:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7251">EIP-7251</a> - _`MAX_EFFECTIVE_BALANCE` 증가_</li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7002">EIP-7002</a> - _실행 레이어에서 트리거 가능한 종료_</li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7685">EIP-7685</a> - _범용 실행 레이어 요청_</li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6110">EIP-6110</a> - _온체인에서 검증인 예치금 제공_</li>
</ul>

프로토콜 효율성 및 보안 개선:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2537">EIP-2537</a> - _BLS12-381 곡선 연산을 위한 사전 컴파일_</li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2935">EIP-2935</a> - _상태에 과거 블록 해시 저장_</li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7549">EIP-7549</a> - _위원회 인덱스를 증명 외부로 이동_</li>
</ul>
</ExpandableCard>

- [Pectra.wtf](https://pectra.wtf)
- [Pectra가 스테이킹 경험을 향상시키는 방법](https://www.kiln.fi/post/next-ethereum-upgrade-how-pectra-will-enhance-the-staking-experience)
- [일렉트라 업그레이드 사양 읽기](https://github.com/ethereum/consensus-specs/blob/dev/specs/electra/)
- [프라하-일렉트라("펙트라") FAQ](/roadmap/pectra/)

<Divider />

## 2024 {#2024}

### 칸쿤-데네브("덴쿤") {#dencun}

<NetworkUpgradeSummary name="dencun" />

#### 칸쿤 요약 {#cancun-summary}

칸쿤 업그레이드는 데네브 합의 업그레이드와 함께 확장성 향상을 목표로 하는 이더리움의 _실행_에 대한 일련의 개선 사항을 포함합니다.

특히, 이는 **프로토-댕크샤딩**으로 알려진 EIP-4844를 포함하며, 레이어 2 롤업의 데이터 저장 비용을 크게 감소시킵니다. 이는 데이터 '블롭(blob)'의 도입을 통해 달성되며, 이를 통해 롤업이 Mainnet에 데이터를 짧은 시간 동안 게시할 수 있습니다. 이로 인해 레이어 2 롤업 사용자의 거래 수수료가 크게 낮아집니다.

<ExpandableCard title="칸쿤 EIP" contentPreview="이번 업그레이드에 포함된 공식 개선 사항">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1153">EIP-1153</a> - <em>일시적 저장 작업 코드</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>이더리움 가상 머신(EVM)에서의 비콘 블록 루트</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> - <em>샤드 블롭 거래 (프로토-댕크샤딩)</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5656">EIP-5656</a> - <em><code>MCOPY</code> - 메모리 복사 명령어</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6780">EIP-6780</a> - <em><code>SELFDESTRUCT</code>는 동일한 트랜잭션에서만 가능</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7516">EIP-7516</a> - <em><code>BLOBBASEFEE</code> 연산자 코드</em></li>
</ul>
</ExpandableCard>

- [레이어 2 롤업](/layer-2/)
- [프로토-댕크샤딩](/roadmap/scaling/#proto-danksharding)
- [댕크샤딩](/roadmap/danksharding/)
- [칸쿤 업그레이드 사양 읽기](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/cancun.md)

#### 데네브 요약 {#deneb-summary}

데네브 업그레이드는 확장성 향상을 목표로 하는 이더리움의 _합의_에 대한 일련의 개선 사항을 포함합니다. 이 업그레이드는 Proto-Danksharding(EIP-4844)를 가능하게 하고 Beacon Chain의 기타 개선 사항과 함께 Cancun 실행 업그레이드와 함께 진행됩니다.

미리 생성된 서명된 "자발적 퇴출 메시지"는 더 이상 만료되지 않으므로, 제3자 노드 운영자에게 자금을 스테이킹하는 사용자에게 더 많은 제어권을 부여합니다. 이 서명된 종료 메시지를 통해 스테이커는 누구에게도 허락을 구할 필요 없이 언제든지 안전하게 종료하고 자금을 인출할 수 있는 능력을 유지하면서 노드 운영을 위임할 수 있습니다.

EIP-7514는 검증자가 네트워크에 가입할 수 있는 "변화(churn)" 비율을 에포크당 여덟(8)으로 제한함으로써 ETH 발행을 제한합니다. ETH 발행은 총 스테이킹된 ETH에 비례하므로, 참여하는 검증인의 수를 제한하면 새로 발행되는 ETH의 _성장률_이 제한되는 동시에 노드 운영자의 하드웨어 요구 사항이 줄어들어 탈중앙화에 도움이 됩니다.

<ExpandableCard title="데네브 EIP" contentPreview="이번 업그레이드에 포함된 공식 개선 사항">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>이더리움 가상 머신(EVM)에서의 비콘 블록 루트</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> - <em>샤드 블롭 거래</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7044">EIP-7044</a> - <em>영구적으로 유효한 서명된 자발적 탈퇴</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7045">EIP-7045</a> - <em>최대 증명 포함 슬롯 증가</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7514">EIP-7514</a> - <em>최대 에포크 혼합 한도 추가</em></li>
</ul>
</ExpandableCard>

- [데네브 업그레이드 사양 읽기](https://github.com/ethereum/consensus-specs/blob/dev/specs/deneb/)
- [칸쿤-데네브("덴쿤") FAQ](/roadmap/dencun/)

<Divider />

## 2023 {#2023}

### 상하이-카펠라("샤펠라") {#shapella}

<NetworkUpgradeSummary name="shapella" />

#### 상하이 요약 {#shanghai-summary}

Shanghai 업그레이드는 실행 레이어에 스테이킹 인출 기능을 추가했습니다. Capella 업그레이드와 함께 이를 통해 블록이 인출 작업을 수용할 수 있게 되어, 스테이커가 비콘 체인에서 실행 레이어로 ETH를 인출할 수 있게 되었습니다.

<ExpandableCard title="상하이 EIP" contentPreview="이번 업그레이드에 포함된 공식 개선 사항">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3651">EIP-3651</a> – <em><code>COINBASE</code> 주소 따뜻한 시작</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3855">EIP-3855</a> – <em>New <code>PUSH0</code> instruction</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3860">EIP-3860</a> – <em>제한 및 미터 initcode</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4895">EIP-4895</a> – <em>비콘 체인 푸시 인출 운영</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6049">EIP-6049</a> - <em>Deprecate <code>SELFDESTRUCT</code></em></li>
</ul>
</ExpandableCard>

- [상하이 업그레이드 사양 읽기](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/shanghai.md)

#### 카펠라 요약 {#capella-summary}

캡렐라 업그레이드는 합의 계층(비콘 체인)에 대한 세 번째 주요 업그레이드였으며 스테이킹 인출을 가능하게 했습니다. 캡렐라는 실행 계층 업그레이드인 상하이와 동시에 발생하였으며 스테이킹 인출 기능을 가능하게 했습니다.

이 합의 계층 업그레이드는 초기 입금 시 인출 자격 증명을 제공하지 않은 스테이커들이 인출할 수 있는 기능을 가져왔습니다.

이번 업그레이드는 자동 계정 스위핑 기능도 제공하여, 유효성 검사기 계정에서 가능한 보상 지급 또는 전체 인출을 지속적으로 처리합니다.

- [스테이킹 인출에 대해 더 알아보기](/staking/withdrawals/).
- [카펠라 업그레이드 사양 읽기](https://github.com/ethereum/consensus-specs/blob/dev/specs/capella/)

<Divider />

## 2022 {#2022}

### 파리(병합) {#paris}

<NetworkUpgradeSummary name="paris" />

#### 요약 {#paris-summary}

파리 업그레이드는 작업 증명 블록체인이 58750000000000000000000의 [최종 총 난이도](/glossary/#terminal-total-difficulty)를 통과하면서 트리거되었습니다. 이것은 2022년 9월 15일 블록 15537393에서 발생하였고, 다음 블록에서 파리 업그레이드를 촉발했습니다. 파리는 [병합](/roadmap/merge/) 전환이었으며, 주요 특징은 [작업 증명](/developers/docs/consensus-mechanisms/pow) 채굴 알고리즘과 관련 합의 로직을 끄고 대신 [지분 증명](/developers/docs/consensus-mechanisms/pos)으로 전환하는 것이었습니다. 파리 자체는 연결된 [합의 클라이언트](/developers/docs/nodes-and-clients/#consensus-clients)로부터 지시를 받을 수 있도록 하는 [실행 클라이언트](/developers/docs/nodes-and-clients/#execution-clients)에 대한 업그레이드였습니다(합의 레이어의 벨라트릭스에 해당). 이를 위해서는 통칭 [엔진 API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md)로 알려진 새로운 내부 API 메서드 세트가 활성화되어야 했습니다. 이는 [홈스테드](#homestead) 이후 이더리움 역사상 가장 중요한 업그레이드라고 할 수 있습니다!

- [파리 업그레이드 사양 읽기](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/paris.md)

<ExpandableCard title="파리 EIP" contentPreview="이번 업그레이드에 포함된 공식 개선 사항">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3675">EIP-3675</a> – <em>지분 증명으로 합의를 업그레이드</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4399">EIP-4399</a> – <em>PREVRANDAO로 어려움 opcode를 설치하세요</em></li>
</ul>
</ExpandableCard>

---

### 벨라트릭스 {#bellatrix}

<NetworkUpgradeSummary name="bellatrix" />

#### 요약 {#bellatrix-summary}

벨라트릭스 업그레이드는 체인을 [병합](/roadmap/merge/)에 대비시키는 [비콘 체인](/roadmap/beacon-chain)의 두 번째 예정된 업그레이드였습니다. 이것은 비활동 및 처벌 가능한 위반에 대해 유효성 검사기 처벌을 전체 값으로 가져옵니다. 벨라트릭스는 또한 마지막 작업 증명 블록에서 첫 번째 지분 증명 블록으로의 전환과 더 머지에 대비하기 위해 포크 선택 규칙을 업데이트합니다. 여기에는 합의 클라이언트가 58750000000000000000000의 [최종 총 난이도](/glossary/#terminal-total-difficulty)를 인지하도록 하는 것이 포함됩니다.

- [벨라트릭스 업그레이드 사양 읽기](https://github.com/ethereum/consensus-specs/tree/dev/specs/bellatrix)

---

### 그레이 글레이셔 {#gray-glacier}

<NetworkUpgradeSummary name="grayGlacier" />

#### 요약 {#gray-glacier-summary}

그레이 글레이셔 네트워크 업그레이드는 [난이도 폭탄](/glossary/#difficulty-bomb)을 3개월 연기했습니다. 이는 이 업그레이드에서 도입된 유일한 변경 사항이며, [애로우 글레이셔](#arrow-glacier) 및 [뮤어 글레이셔](#muir-glacier) 업그레이드와 성격이 유사합니다. 유사한 변경 사항이 [비잔티움](#byzantium), [콘스탄티노플](#constantinople) 및 [런던](#london) 네트워크 업그레이드에서도 수행되었습니다.

- [EF 블로그 - 그레이 글레이셔 업그레이드 발표](https://blog.ethereum.org/2022/06/16/gray-glacier-announcement/)

<ExpandableCard title="그레이 글레이셔 EIP" contentPreview="이번 업그레이드에 포함된 공식 개선 사항">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5133">EIP-5133</a> – <em>난이도 폭탄을 2022년 9월까지 지연시킨다</em></li>
</ul>
</ExpandableCard>

<Divider />

## 2021 {#2021}

### 애로우 글레이셔 {#arrow-glacier}

<NetworkUpgradeSummary name="arrowGlacier" />

#### 요약 {#arrow-glacier-summary}

애로우 글레이셔 네트워크 업그레이드는 [난이도 폭탄](/glossary/#difficulty-bomb)을 몇 개월 연기했습니다. 이는 이 업그레이드에서 도입된 유일한 변경 사항이며, [뮤어 글레이셔](#muir-glacier) 업그레이드와 성격이 유사합니다. 유사한 변경 사항이 [비잔티움](#byzantium), [콘스탄티노플](#constantinople) 및 [런던](#london) 네트워크 업그레이드에서도 수행되었습니다.

- [EF 블로그 - 애로우 글레이셔 업그레이드 발표](https://blog.ethereum.org/2021/11/10/arrow-glacier-announcement/)
- [Ethereum Cat Herders - 이더리움 애로우 글레이셔 업그레이드](https://medium.com/ethereum-cat-herders/ethereum-arrow-glacier-upgrade-e8d20fa4c002)

<ExpandableCard title="애로우 글레이셔 EIP" contentPreview="이번 업그레이드에 포함된 공식 개선 사항">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4345">EIP-4345</a> – <em>2022년 6월까지 난이도 폭탄을 지연시킨다</em></li>
</ul>
</ExpandableCard>

---

### 알타이르 {#altair}

<NetworkUpgradeSummary name="altair" />

#### 요약 {#altair-summary}

알타이르 업그레이드는 [비콘 체인](/roadmap/beacon-chain)의 첫 번째 예정된 업그레이드였습니다. 이 업그레이드는 "동기화 위원회"에 대한 지원을 추가하여 경량 클라이언트를 가능하게 하였으며, 더 머지로의 개발이 진행됨에 따라 유효성 검사기의 비활동 및 처벌 페널티를 증가시켰습니다.

- [알타이르 업그레이드 사양 읽기](https://github.com/ethereum/consensus-specs/tree/dev/specs/altair)

#### <Emoji text=":tada:" size={1} className="me-2" />재밌는 사실! {#altair-fun-fact}

알타이르는 정확한 출시 시간이 있었던 첫 번째 주요 네트워크 업그레이드였습니다. 이전의 모든 업그레이드는 블록 시간이 변동하는 작업 증명 체인의 선언된 블록 번호에 기반해 있었습니다. 비콘 체인은 작업 증명을 해결할 필요가 없으며, 대신 유효성 검사자가 블록을 제안할 수 있는 32개의 12초 "슬롯"으로 구성된 시간 기반의 에포크 시스템에서 작동합니다. 그래서 우리는 정확히 74,240 에포크에 도달할 때를 알았고, 알타이르가 활성화되었습니다!

- [블록 시간](/developers/docs/blocks/#block-time)

---

### 런던 {#london}

<NetworkUpgradeSummary name="london" />

#### 요약 {#london-summary}

런던 업그레이드는 [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559)를 도입하여 가스 환급 처리 방식 및 [아이스 에이지](/glossary/#ice-age) 일정 변경과 함께 거래 수수료 시장을 개혁했습니다.

#### 런던 업그레이드 / EIP-1559란 무엇인가요? {#eip-1559}

런던 업그레이드 이전 이더리움은 고정 사이즈 블록을 채택 했었습니다. 높은 네트워크 수요가 있을 때, 이러한 블록은 최대 용량으로 작동했습니다. 결과적으로, 사용자는 블록에 포함되기 위해 수요가 줄어들기를 기다려야 했으며, 이는 좋지 않은 사용자 경험으로 이어졌습니다. 런던 업그레이드는 이더리움에 가변 크기 블록을 도입했습니다.

이더리움 네트워크의 거래 수수료 계산 방식은 2021년 8월 [런던 업그레이드](/ethereum-forks/#london)로 변경되었습니다. 런던 업그레이드 이전에는 다음과 같이 `기본` 수수료와 `우선` 수수료를 분리하지 않고 수수료가 계산되었습니다.

Alice가 Bob에게 1 ETH를 줘야한다고 가정해봅시다. 트랜잭션에서, 가스 한도는 21,000 유닛이고 가스 가격은 200 gwei이 됩니다.

총수수료: `가스 단위(한도) * 단위당 가스 가격`, 즉 `21,000 * 200 = 4,200,000 gwei` 또는 0.0042 ETH입니다.

런던 업그레이드에서 [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559)가 구현되면서 거래 수수료 메커니즘이 더 복잡해졌지만 가스 수수료 예측 가능성이 높아져 거래 수수료 시장이 더 효율적으로 변했습니다. 사용자는 거래 실행에 지불할 의사가 있는 금액에 해당하는 `maxFeePerGas`로 거래를 제출할 수 있으며, 가스에 대한 시장 가격(`baseFeePerGas`)보다 더 많은 금액을 지불하지 않고 팁을 제외한 초과 금액을 환불받을 수 있다는 것을 알고 있습니다.

이 동영상은 EIP-1559와 그 이점을 설명합니다. [EIP-1559 설명](https://www.youtube.com/watch?v=MGemhK9t44Q)

- [당신은 DApp 개발자입니까? 라이브러리 및 툴링을 업그레이드해야 합니다.](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/london-ecosystem-readiness.md)
- [이더리움 재단 발표 읽기](https://blog.ethereum.org/2021/07/15/london-mainnet-announcement/)
- [Ethereum Cat Herder의 설명 읽기](https://medium.com/ethereum-cat-herders/london-upgrade-overview-8eccb0041b41)

<ExpandableCard title="런던 EIP" contentPreview="이번 업그레이드에 포함된 공식 개선 사항">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1559">EIP-1559</a> – <em>거래 수수료 시장 개선</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3198">EIP-3198</a> – <em>returns the <code>BASEFEE</code> from a block</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3529">EIP-3529</a> - <em>EVM 운영에 대한 가스 환불 감소</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3541">EIP-3541</a> - <em><code>0xEF</code></em>로 시작하는 계약 배포 방지</li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3554">EIP-3554</a> – <em>2021년 12월까지 빙하기를 지연시킨다</em></li>
</ul>
</ExpandableCard>

---

### 베를린 {#berlin}

<NetworkUpgradeSummary name="berlin" />

#### 요약 {#berlin-summary}

베를린 업그레이드는 특정 EVM 작업에 대한 가스 비용을 최적화하고 여러 거래 유형에 대한 지원을 증가시켰습니다.

- [이더리움 재단 발표 읽기](https://blog.ethereum.org/2021/03/08/ethereum-berlin-upgrade-announcement/)
- [Ethereum Cat Herder의 설명 읽기](https://medium.com/ethereum-cat-herders/the-berlin-upgrade-overview-2f7ad710eb80)

<ExpandableCard title="베를린 EIP" contentPreview="이번 업그레이드에 포함된 공식 개선 사항">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2565">EIP-2565</a> – <em>ModExp 가스 비용 낮추기</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2718">EIP-2718</a> – <em>여러 거래 유형에 대한 더 쉬운 지원</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2929">EIP-2929</a> – <em>국가 액세스 opcodes의 가스 비용 증가</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2930">EIP-2930</a> – <em>선택적 액세스 목록 추가</em></li>
</ul>
</ExpandableCard>

<Divider />

## 2020 {#2020}

### 비콘 체인 제네시스 {#beacon-chain-genesis}

<NetworkUpgradeSummary name="beaconChainGenesis" />

#### 요약 {#beacon-chain-genesis-summary}

[비콘 체인](/roadmap/beacon-chain/)이 안전하게 출시되기 위해서는 32개의 스테이킹된 ETH로 구성된 16,384개의 예치금이 필요했습니다. 이는 11월 27일에 발생했으며, 비콘 체인은 2020년 12월 1일에 블록을 생성하기 시작했습니다.

[이더리움 재단 발표 읽기](https://blog.ethereum.org/2020/11/27/eth2-quick-update-no-21/)

<DocLink href="/roadmap/beacon-chain/">
  비콘 체인
</DocLink>

---

### 스테이킹 예치 계약 배포 {#staking-deposit-contract}

<NetworkUpgradeSummary name="stakingDepositContractDeployed" />

#### 요약 {#deposit-contract-summary}

스테이킹 예치 계약은 이더리움 생태계에 [스테이킹](/glossary/#staking)을 도입했습니다. 비록 [메인넷](/glossary/#mainnet) 계약이었지만 중요한 [이더리움 업그레이드](/roadmap/)인 [비콘 체인](/roadmap/beacon-chain/) 출시 일정에 직접적인 영향을 미쳤습니다.

[이더리움 재단 발표 읽기](https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19/)

<DocLink href="/staking/">
  스테이킹
</DocLink>

---

### 뮤어 글레이셔 {#muir-glacier}

<NetworkUpgradeSummary name="muirGlacier" />

#### 요약 {#muir-glacier-summary}

뮤어 글레이셔 포크는 [난이도 폭탄](/glossary/#difficulty-bomb)을 지연시켰습니다. [작업 증명](/developers/docs/consensus-mechanisms/pow/) 합의 메커니즘의 블록 난이도 증가는 트랜잭션 전송 및 탈중앙화앱 사용 대기 시간을 늘려 이더리움의 사용성을 저하시킬 위험이 있었습니다.

- [이더리움 재단 발표 읽기](https://blog.ethereum.org/2019/12/23/ethereum-muir-glacier-upgrade-announcement/)
- [Ethereum Cat Herder의 설명 읽기](https://medium.com/ethereum-cat-herders/ethereum-muir-glacier-upgrade-89b8cea5a210)

<ExpandableCard title="뮤어 글레이셔 EIP" contentPreview="이번 포크에 포함된 공식 개선 사항">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2384">EIP-2384</a> – <em>다른 4,000,000 블록 또는 ~611일 동안 난이도 폭탄을 지연시킨다.</em></li>
</ul>
</ExpandableCard>

<Divider />

## 2019 {#2019}

### 이스탄불 {#istanbul}

<NetworkUpgradeSummary name="istanbul" />

#### 요약 {#istanbul-summary}

이스탄불 포크:

- [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine)에서 특정 작업의 [가스](/glossary/#gas) 비용을 최적화했습니다.
- 서비스 거부 공격에 대한 복원력을 개선했습니다.
- SNARK 및 STARK 기반의 [레이어 2 확장](/developers/docs/scaling/#layer-2-scaling) 솔루션의 성능을 향상했습니다.
- 이더리움과 제캐시(Zcash)가 상호 운용할 수 있도록 했습니다.
- 계약이 더 창의적인 기능을 도입할 수 있도록 허용했습니다.

[이더리움 재단 발표 읽기](https://blog.ethereum.org/2019/11/20/ethereum-istanbul-upgrade-announcement/)

<ExpandableCard title="이스탄불 EIP" contentPreview="이번 포크에 포함된 공식 개선 사항">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-152">EIP-152</a> – <em>이더리움이 Zcash와 같은 개인 정보 보호 통화로 작동하도록 허용하세요.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1108">EIP-1108</a> – <em>[가스](/glossary/#gas) 비용을 개선하기 위한 저렴한 암호화 기술.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1344">EIP-1344</a> – <em>`CHAINID` [옵코드](/developers/docs/ethereum-stack/#ethereum-virtual-machine)를 추가하여 재생 공격으로부터 이더리움을 보호합니다.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1884">EIP-1884</a> – <em>소비에 기반한 opcode 가스 가격 최적화.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2028">EIP-2028</a> – <em>CallData의 비용을 줄여 블록에 더 많은 데이터를 허용합니다([레이어 2 확장](/developers/docs/scaling/#layer-2-scaling)에 유용합니다).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2200">EIP-2200</a> – <em>기타 옵코드 가스 가격 변경.</em></li>
</ul>
</ExpandableCard>

---

### 콘스탄티노플 {#constantinople}

<NetworkUpgradeSummary name="constantinople" />

#### 요약 {#constantinople-summary}

콘스탄티노플 하드포크:

- 블록 [채굴](/developers/docs/consensus-mechanisms/pow/mining/) 보상을 3ETH에서 2ETH로 줄였습니다.
- [지분 증명이 구현되기](#beacon-chain-genesis) 전에 블록체인이 정지되지 않도록 보장했습니다.
- [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine)에서 특정 작업의 [가스](/glossary/#gas) 비용을 최적화했습니다.
- 아직 생성되지 않은 주소와 상호작용할 수 있는 기능을 추가했습니다.

[이더리움 재단 발표 읽기](https://blog.ethereum.org/2019/02/22/ethereum-constantinople-st-petersburg-upgrade-announcement/)

<ExpandableCard title="콘스탄티노플 EIP" contentPreview="이번 포크에 포함된 공식 개선 사항">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-145">EIP-145</a> – <em>특정 온체인 작업의 비용을 최적화합니다.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1014">EIP-1014</a> – <em>아직 생성되지 않은 주소와 상호 작용할 수 있습니다.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1052">EIP-1052</a> – <em>다른 계약 코드의 해시를 검색하기 위한 <code>EXTCODEHASH</code> 명령을 도입합니다.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1234">EIP-1234</a> – <em>증명 기반 지분 증명이 구현되기 전에 블록체인이 동결되지 않도록 하고 블록 보상을 3 ETH에서 2 ETH로 줄입니다.</em></li>
</ul>
</ExpandableCard>

<Divider />

## 2017 {#2017}

### 비잔티움 {#byzantium}

<NetworkUpgradeSummary name="byzantium" />

#### 요약 {#byzantium-summary}

비잔티움 포크:

- 블록 [채굴](/developers/docs/consensus-mechanisms/pow/mining/) 보상을 5ETH에서 3ETH로 줄였습니다.
- [난이도 폭탄](/glossary/#difficulty-bomb)을 1년 연기했습니다.
- 다른 계약에 대한 상태 변경 없는 호출을 할 수 있는 기능을 추가했습니다.
- [레이어 2 확장](/developers/docs/scaling/#layer-2-scaling)을 허용하는 특정 암호화 기술을 추가했습니다.

[이더리움 재단 발표 읽기](https://blog.ethereum.org/2017/10/12/byzantium-hf-announcement/)

<ExpandableCard title="비잔티움 EIP" contentPreview="이번 포크에 포함된 공식 개선 사항">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-140">EIP-140</a> – <em>adds <code>REVERT</code> opcode.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-658">EIP-658</a> – <em>상태 필드가 거래 영수증에 추가되어 성공 또는 실패를 나타냅니다.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-196">EIP-196</a> – <em>[ZK-Snarks](/developers/docs/scaling/zk-rollups/)를 허용하기 위해 타원 곡선 및 스칼라 곱셈을 추가합니다.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-197">EIP-197</a> – <em>[ZK-Snarks](/developers/docs/scaling/zk-rollups/)를 허용하기 위해 타원 곡선 및 스칼라 곱셈을 추가합니다.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-198">EIP-198</a> – <em>RSA 서명 검증을 활성화합니다.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-211">EIP-211</a> – <em>가변 길이 반환 값에 대한 지원을 추가합니다.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-214">EIP-214</a> – <em>는 <code>STATICCALL</code> opcode를 추가하여 다른 계약에 대한 상태를 변경하지 않는 통화를 허용합니다.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-100">EIP-100</a> – <em>난이도 조정 공식을 변경합니다.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-649">EIP-649</a> – <em>[난이도 폭탄](/glossary/#difficulty-bomb)을 1년 지연시키고 블록 보상을 5ETH에서 3ETH로 줄입니다.</em></li>
</ul>
</ExpandableCard>

<Divider />

## 2016 {#2016}

### 스퓨리어스 드래곤 {#spurious-dragon}

<NetworkUpgradeSummary name="spuriousDragon" />

#### 요약 {#spurious-dragon-summary}

스퓨리어스 드래곤 포크는 네트워크에 대한 서비스 거부(DoS) 공격에 대한 두 번째 대응이었습니다(2016년 9월/10월). 여기에는:

- 네트워크에 대한 향후 공격을 방지하기 위해 연산 코드(opcode) 가격 조정.
- 블록체인 상태의 "디블로트(debloat)"를 활성화.
- 리플레이 공격 방어 기능 추가.

[이더리움 재단 발표 읽기](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon/)

<ExpandableCard title="스퓨리어스 드래곤 EIP" contentPreview="이번 포크에 포함된 공식 개선 사항">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-155">EIP-155</a> – <em>하나의 이더리움 체인의 거래가 대체 체인에서 재방송되는 것을 방지합니다. 예를 들어, 테스트넷 거래는 메인 이더리움 체인에서 재생됩니다.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-160">EIP-160</a> - <em> <code>EXP</code> opcode의 가격을 조정합니다 - 계산적으로 비싼 계약 작업을 통해 네트워크 속도를 늦추는 것을 더 어렵게 만듭니다.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-161">EIP-161</a> – <em>DOS 공격을 통해 추가된 빈 계정을 제거할 수 있습니다.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-170">EIP-170</a> – <em>블록체인에서 계약이 가질 수 있는 최대 코드 크기를 24576바이트로 변경합니다.</em></li>
</ul>
</ExpandableCard>

---

### 탠저린 위슬 {#tangerine-whistle}

<NetworkUpgradeSummary name="tangerineWhistle" />

#### 요약 {#tangerine-whistle-summary}

탠저린 휘슬 포크는 네트워크에 대한 서비스 거부(DoS) 공격에 대한 첫 번째 대응이었으며(2016년 9월/10월) 다음과 같은 내용이 포함됩니다:

- 저가의 운영 코드와 관련된 긴급 네트워크 건강 문제를 해결합니다.

[이더리움 재단 발표 읽기](https://blog.ethereum.org/2016/10/18/faq-upcoming-ethereum-hard-fork/)

<ExpandableCard title="탠저린 위슬 EIP" contentPreview="이번 포크에 포함된 공식 개선 사항">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-150">EIP-150</a> – <em>스팸 공격에 사용할 수 있는 옵코드의 가스 비용을 증가시킨다.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-158">EIP-158</a> – <em>이전 버전의 이더리움 프로토콜의 결함으로 인해 매우 저렴한 비용으로 주에 배치된 많은 수의 빈 계정을 제거하여 주 크기를 줄입니다.</em></li>
</ul>
</ExpandableCard>

---

### DAO 포크 {#dao-fork}

<NetworkUpgradeSummary name="daoFork" />

#### 요약 {#dao-fork-summary}

DAO 포크는 [2016년 DAO 공격](https://www.coindesk.com/learn/understanding-the-dao-attack/)에 대한 대응으로, 해킹으로 인해 불안정한 [DAO](/glossary/#dao) 계약에서 360만 ETH 이상이 유출되었습니다. 포크는 잘못된 계약에서 인출이라는 단일 기능을 가진 [새로운 계약](https://eth.blockscout.com/address/0xbf4ed7b27f1d666546e30d74d50d173d20bca754)으로 자금을 이동했습니다. 자산을 잃은 누구나 지갑에 있는 100 DAO 토큰당 1 ETH를 인출할 수 있었습니다.

이러한 조치는 이더리움 커뮤니티가 투표한 결과입니다. 모든 ETH 보유자는 [투표 플랫폼](https://web.archive.org/web/20170620030820/http://v1.carbonvote.com/)에서 트랜잭션을 통해 투표할 수 있었습니다. 포크하기 위한 결정은 85% 이상의 표를 얻었습니다.

일부 채굴자는 DAO 사건이 프로토콜의 결함이 아니기 때문에 포크를 거부했습니다. 그들은 이어서 [이더리움 클래식](https://ethereumclassic.org/)을 형성했습니다.

[이더리움 재단 발표 읽기](https://blog.ethereum.org/2016/07/20/hard-fork-completed/)

---

### 홈스테드 {#homestead}

<NetworkUpgradeSummary name="homestead" />

#### 요약 {#homestead-summary}

미래를 바라보는 홈스테드 포크. 여기에는 여러 프로토콜 변경과 네트워킹 변경이 포함되어 있어 이더리움이 추가 네트워크 업그레이드를 수행할 수 있는 능력을 부여했습니다.

[이더리움 재단 발표 읽기](https://blog.ethereum.org/2016/02/29/homestead-release/)

<ExpandableCard title="홈스테드 EIP" contentPreview="이번 포크에 포함된 공식 개선 사항">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2">EIP-2</a> – <em>계약 생성 프로세스를 편집합니다.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7">EIP-7</a> – <em>새로운 opcode 추가: <code>DELEGATECALL</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-8">EIP-8</a> – <em>devp2p 순방향 호환성 요구 사항 도입</em></li>
</ul>
</ExpandableCard>

<Divider />

## 2015 {#2015}

### 프론티어 해빙 {#frontier-thawing}

<NetworkUpgradeSummary name="frontierThawing" />

#### 요약 {#frontier-thawing-summary}

프론티어 해빙 포크는 [블록](/glossary/#block)당 5,000[가스](/glossary/#gas) 한도를 해제하고 기본 가스 가격을 51[gwei](/glossary/#gwei)로 설정했습니다. 이것은 거래를 허용했습니다 – 거래는 21,000 가스를 필요로 합니다. [난이도 폭탄](/glossary/#difficulty-bomb)은 향후 [지분 증명](/glossary/#pos)으로의 하드포크를 보장하기 위해 도입되었습니다.

- [이더리움 재단 발표 읽기](https://blog.ethereum.org/2015/08/04/the-thawing-frontier/)
- [이더리움 프로토콜 업데이트 1 읽기](https://blog.ethereum.org/2015/08/04/ethereum-protocol-update-1/)

---

### 프론티어 {#frontier}

<NetworkUpgradeSummary name="frontier" />

#### 요약 {#frontier-summary}

프론티어는 이더리움 프로젝트의 초기 실행 버전이었지만, 기본적인 구현만을 갖춘 상태였습니다. 그것은 성공적인 올림픽 테스트 단계 이후에 진행되었습니다. 이는 기술 사용자, 특히 개발자를 대상으로 의도되었습니다. [블록](/glossary/#block)에는 5,000의 [가스](/glossary/#gas) 한도가 있었습니다. 이 '해동' 기간은 채굴자들이 운영을 시작할 수 있게 하고, 초기 사용자가 급하게 서두르지 않고 클라이언트를 설치할 수 있도록 했습니다.

[이더리움 재단 발표 읽기](https://blog.ethereum.org/2015/07/22/frontier-is-coming-what-to-expect-and-how-to-prepare/)

<Divider />

## 2014 {#2014}

### 이더 판매 {#ether-sale}

<NetworkUpgradeSummary name="etherSale" />

이더가 공식적으로 42일 동안 판매되었습니다. 비트코인(BTC)으로 구매할 수 있었습니다.

[이더리움 재단 발표 읽기](https://blog.ethereum.org/2014/07/22/launching-the-ether-sale/)

---

### 황서 출시 {#yellowpaper}

<NetworkUpgradeSummary name="yellowpaperRelease" />

가빈 우드 박사가 저술한 옐로우 페이퍼는 이더리움 프로토콜에 대한 기술적 정의입니다.

[황서 보기](https://github.com/ethereum/yellowpaper)

<Divider />

## 2013 {#2013}

### 백서 출시 {#whitepaper}

<NetworkUpgradeSummary name="whitepaperRelease" />

이 소개 논문은 2015년 프로젝트 출범 이전에 이더리움 창립자인 비탈릭 부테린에 의해 2013년에 발표되었습니다.

<DocLink href="/whitepaper/">
  백서
</DocLink>
