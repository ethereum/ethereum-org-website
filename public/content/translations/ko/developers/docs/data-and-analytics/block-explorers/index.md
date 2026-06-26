---
title: "블록 탐색기"
description: "트랜잭션, 계정, 컨트랙트 등에 대한 정보를 쿼리할 수 있는 블록체인 데이터의 세계로 안내하는 포털인 블록 탐색기에 대한 소개입니다."
lang: ko
sidebarDepth: 3
---

블록 탐색기는 이더리움 데이터로 향하는 포털입니다. 이를 사용하여 블록, 트랜잭션, 검증자, 계정 및 기타 온체인 활동에 대한 실시간 데이터를 확인할 수 있습니다.

## 전제 조건 {#prerequisites}

블록 탐색기가 제공하는 데이터를 이해하려면 이더리움의 기본 개념을 이해해야 합니다. [이더리움 소개](/developers/docs/intro-to-ethereum/)부터 시작해 보세요.

## 오픈 소스 도구 {#open-source-tools}

- [3xpl](https://3xpl.com/ethereum) - 데이터 세트를 다운로드할 수 있는 광고 없는 이더리움 탐색기(오픈 코어: 핵심 모듈은 오픈 소스)
- [Beaconcha.in](https://beaconcha.in/)
- [Blockscout](https://eth.blockscout.com/)
- [lazy-etherscan](https://github.com/woxjro/lazy-etherscan)
- [Otterscan](https://otterscan.io/)

## 서비스 {#services}

- [Blockchair](https://blockchair.com/ethereum) - 프라이빗 이더리움 탐색기. (멤풀) 데이터를 정렬하고 필터링하는 기능도 제공합니다. 스페인어, 프랑스어, 이탈리아어, 네덜란드어, 포르투갈어, 러시아어, 중국어, 페르시아어로 제공됩니다.
- [Chainlens](https://www.chainlens.com/)
- [DexGuru Block Explorer](https://ethereum.dex.guru/)
- [Etherchain](https://www.etherchain.org/)
- [Etherscan](https://etherscan.io/) - 중국어, 한국어, 러시아어, 일본어로도 제공됩니다.
- [Ethplorer](https://ethplorer.io/) - 토큰에 중점을 둔 블록 탐색기. 중국어, 스페인어, 프랑스어, 튀르키예어, 러시아어, 한국어, 베트남어로도 제공됩니다.
- [Ethseer](https://ethseer.io)
- [EthVM](https://www.ethvm.com/)
- [OKLink](https://www.oklink.com/eth)

## 데이터 {#data}

이더리움은 설계상 투명하므로 모든 것을 검증할 수 있습니다. 블록 탐색기는 이러한 정보를 얻을 수 있는 인터페이스를 제공합니다. 이 데이터가 필요한 경우 메인 이더리움 네트워크와 테스트넷 모두에서 사용할 수 있습니다. 데이터는 실행 데이터와 합의 데이터로 나뉩니다. 실행 데이터는 특정 블록에서 실행된 트랜잭션을 의미합니다. 합의 데이터는 블록 자체와 이를 제안한 검증자를 의미합니다.

다음은 블록 탐색기에서 얻을 수 있는 데이터 유형의 요약입니다.

### 실행 데이터 {#execution-data}

이더리움에는 12초마다 새로운 블록이 추가되므로(블록 제안자가 순서를 놓치지 않는 한), 거의 끊임없는 데이터 스트림이 블록 탐색기에 추가됩니다. 블록에는 유용하게 사용할 수 있는 중요한 데이터가 많이 포함되어 있습니다.

**표준 데이터**

- 블록 높이(Block height) - 현재 블록 생성 시점의 블록 번호 및 블록체인의 길이(블록 단위)
- 타임스탬프(Timestamp) - 블록이 제안된 시간
- 트랜잭션(Transactions) - 블록에 포함된 트랜잭션 수
- 수수료 수령자(Fee recipient) - 트랜잭션에서 가스비 팁을 받은 주소
- 블록 보상(Block Reward) - 블록을 제안한 검증자에게 수여되는 ETH의 양
- 크기(Size) - 블록 내 데이터의 크기(바이트 단위)
- 사용된 가스(Gas used) - 블록 내 트랜잭션에서 사용된 총 가스 단위
- 가스 한도(Gas limit) - 블록 내 트랜잭션에서 설정한 총 가스 한도
- 가스당 기본 수수료(Base fee per gas) - 트랜잭션이 블록에 포함되기 위해 필요한 최소 승수
- 소각된 수수료(Burnt fees) - 블록에서 소각된 ETH의 양
- 추가 데이터(Extra data) - 빌더가 블록에 포함시킨 추가 데이터

**고급 데이터**

- 해시(Hash) - 블록 헤더를 나타내는 암호화 해시(블록의 고유 식별자)
- 부모 해시(Parent hash) - 현재 블록 이전 블록의 해시
- 상태 루트(StateRoot) - 시스템의 전체 상태를 저장하는 머클 트라이(Merkle trie)의 루트 해시

### 가스 {#gas}

블록 탐색기는 트랜잭션 및 블록의 가스 사용량에 대한 데이터를 제공할 뿐만 아니라, 일부 탐색기는 네트워크의 현재 가스 가격에 대한 정보도 제공합니다. 이는 네트워크 사용량을 이해하고, 안전한 트랜잭션을 제출하며, 가스에 과도한 비용을 지출하지 않도록 도와줍니다. 제품 인터페이스로 이 정보를 가져오는 데 도움이 되는 API를 찾아보세요. 가스 관련 데이터는 다음을 포함합니다.

- 안전하지만 느린 트랜잭션에 필요한 예상 가스 단위(+ 예상 가격 및 소요 시간)
- 평균적인 트랜잭션에 필요한 예상 가스 단위(+ 예상 가격 및 소요 시간)
- 빠른 트랜잭션에 필요한 예상 가스 단위(+ 예상 가격 및 소요 시간)
- 가스 가격에 따른 평균 확인 시간
- 가스를 소비하는 컨트랙트 - 즉, 네트워크에서 많이 사용되는 인기 있는 제품
- 가스를 지출하는 계정 - 즉, 네트워크를 자주 사용하는 사용자

### 트랜잭션 {#transactions}

블록 탐색기는 사람들이 트랜잭션 진행 상황을 추적하는 일반적인 장소가 되었습니다. 얻을 수 있는 세부 정보 수준이 추가적인 확실성을 제공하기 때문입니다. 트랜잭션 데이터는 다음을 포함합니다.

**표준 데이터**

- 트랜잭션 해시(Transaction hash) - 트랜잭션이 제출될 때 생성되는 해시
- 상태(Status) - 트랜잭션이 대기 중인지, 실패했는지, 성공했는지를 나타내는 표시
- 블록(Block) - 트랜잭션이 포함된 블록
- 타임스탬프(Timestamp) - 검증자가 제안한 블록에 트랜잭션이 포함된 시간
- 보낸 사람(From) - 트랜잭션을 제출한 계정의 주소
- 받는 사람(To) - 트랜잭션이 상호 작용하는 수신자 또는 스마트 컨트랙트의 주소
- 전송된 토큰(Tokens transferred) - 트랜잭션의 일부로 전송된 토큰 목록
- 가치(Value) - 전송되는 총 ETH 가치
- 트랜잭션 수수료(Transaction fee) - 트랜잭션을 처리하기 위해 검증자에게 지불된 금액(가스 가격\*사용된 가스로 계산됨)

**고급 데이터**

- 가스 한도(Gas limit) - 이 트랜잭션이 소비할 수 있는 최대 가스 단위 수
- 사용된 가스(Gas used) - 트랜잭션이 실제로 소비한 가스 단위의 양
- 가스 가격(Gas price) - 가스 단위당 설정된 가격
- 논스(Nonce) - `from` 주소에 대한 트랜잭션 번호(이 번호는 0부터 시작하므로 논스가 `100`인 경우 실제로는 이 계정에서 제출한 101번째 트랜잭션이 됩니다)
- 입력 데이터(Input data) - 트랜잭션에 필요한 추가 정보

### 계정 {#accounts}

계정에 대해 액세스할 수 있는 데이터는 매우 많습니다. 그렇기 때문에 자산과 가치를 쉽게 추적할 수 없도록 여러 계정을 사용하는 것이 종종 권장됩니다. 트랜잭션 및 계정 활동을 더 비공개로 만들기 위해 개발 중인 몇 가지 솔루션도 있습니다. 계정에 대해 사용할 수 있는 데이터는 다음과 같습니다.

**사용자 계정**

- 계정 주소(Account address) - 자금을 보낼 때 사용할 수 있는 공개 주소
- ETH 잔고(ETH balance) - 해당 계정과 연결된 ETH의 양
- 총 ETH 가치(Total ETH value) - ETH의 가치
- 토큰(Tokens) - 계정과 연결된 토큰 및 그 가치
- 트랜잭션 내역(Transaction history) - 이 계정이 발신자이거나 수신자인 모든 트랜잭션 목록

**스마트 컨트랙트**

스마트 컨트랙트 계정은 사용자 계정이 가지는 모든 데이터를 가지고 있지만, 일부 블록 탐색기는 코드 정보도 함께 표시합니다. 예시는 다음과 같습니다.

- 컨트랙트 생성자(Contract creator) - 메인넷에 컨트랙트를 배포한 주소
- 생성 트랜잭션(Creation transaction) - 메인넷 배포가 포함된 트랜잭션
- 소스 코드(Source code) - 스마트 컨트랙트의 Solidity 또는 Vyper 코드
- 컨트랙트 ABI(Contract ABI) - 컨트랙트의 애플리케이션 바이너리 인터페이스(Application Binary Interface)로, 컨트랙트가 수행하는 호출 및 수신된 데이터
- 컨트랙트 생성 코드(Contract creation code) - 스마트 컨트랙트의 컴파일된 바이트코드(Solidity, Vyper 등으로 작성된 스마트 컨트랙트를 컴파일할 때 생성됨)
- 컨트랙트 이벤트(Contract events) - 스마트 컨트랙트에서 호출된 메서드의 내역(기본적으로 컨트랙트가 어떻게, 얼마나 자주 사용되는지 확인하는 방법)

### 토큰 {#tokens}

토큰은 컨트랙트의 한 종류이므로 스마트 컨트랙트와 유사한 데이터를 가집니다. 하지만 가치가 있고 거래될 수 있기 때문에 추가적인 데이터 포인트가 있습니다.

- 유형(Type) - ERC-20, ERC-721 또는 기타 토큰 표준인지 여부
- 가격(Price) - ERC-20인 경우 현재 시장 가치를 가짐
- 시가총액(Market cap) - ERC-20인 경우 시가총액을 가짐(가격\*총 공급량으로 계산됨)
- 총 공급량(Total supply) - 유통 중인 토큰 수
- 보유자(Holders) - 토큰을 보유한 주소 수
- 전송(Transfers) - 토큰이 계정 간에 전송된 횟수
- 트랜잭션 내역(Transaction history) - 토큰이 포함된 모든 트랜잭션 내역
- 컨트랙트 주소(Contract address) - 메인넷에 배포된 토큰의 주소
- 소수점(Decimals) - ERC-20 토큰은 분할 가능하며 소수점 자리를 가짐

### 네트워크 {#network}

일부 블록 데이터는 이더리움의 전반적인 상태와 관련이 있습니다.

- 총 트랜잭션(Total transactions) - 이더리움이 생성된 이후의 트랜잭션 수
- 초당 트랜잭션(Transactions per second) - 1초 내에 처리 가능한 트랜잭션 수
- ETH 가격(ETH price) - 1 ETH의 현재 가치
- 총 ETH 공급량(Total ETH supply) - 유통 중인 ETH 수(모든 블록이 생성될 때마다 블록 보상 형태로 새로운 ETH가 생성됨을 기억하세요)
- 시가총액(Market cap) - 가격\*공급량의 계산 결과

## 합의 레이어 데이터 {#consensus-layer-data}

### 에포크 {#epoch}

보안상의 이유로 모든 에포크(6.4분마다)가 끝날 때 무작위로 검증자 위원회가 생성됩니다. 에포크 데이터는 다음을 포함합니다.

- 에포크 번호
- 완결된 상태(Finalized status) - 에포크가 완결되었는지 여부(예/아니요)
- 시간(Time) - 에포크가 끝난 시간
- 증명(Attestations) - 에포크 내 증명 수(슬롯 내 블록에 대한 투표)
- 예치금(Deposits) - 에포크에 포함된 ETH 예치금 수(검증자가 되려면 ETH를 스테이킹해야 함)
- 슬래싱(Slashings) - 블록 제안자 또는 증명자에게 부여된 페널티 수
- 투표 참여(Voting participation) - 블록을 증명하는 데 사용된 스테이킹된 ETH의 양
- 검증자(Validators) - 해당 에포크에서 활성화된 검증자 수
- 평균 검증자 잔고(Average Validator balance) - 활성 검증자의 평균 잔고
- 슬롯(Slots) - 에포크에 포함된 슬롯 수(슬롯에는 하나의 유효한 블록이 포함됨)

### 슬롯 {#slot}

슬롯은 블록 생성의 기회이며, 각 슬롯에 대해 사용할 수 있는 데이터는 다음과 같습니다.

- 에포크(Epoch) - 슬롯이 유효한 에포크
- 슬롯 번호
- 상태(Status) - 슬롯의 상태(제안됨/놓침)
- 시간(Time) - 슬롯 타임스탬프
- 제안자(Proposer) - 슬롯에 대한 블록을 제안한 검증자
- 블록 루트(Block root) - 비콘 블록(BeaconBlock)의 해시 트리 루트
- 부모 루트(Parent root) - 이전 블록의 해시
- 상태 루트(State root) - 비콘 상태(BeaconState)의 해시 트리 루트
- 서명(Signature)
- RANDAO 공개(Randao reveal)
- 그래피티(Graffiti) - 블록 제안자는 블록 제안에 32바이트 길이의 메시지를 포함할 수 있습니다.
- 실행 데이터(Execution Data)
  - 블록 해시(Block hash)
  - 예치금 수(Deposit count)
  - 예치금 루트(Deposit root)
- 증명(Attestations) - 이 슬롯의 블록에 대한 증명 수
- 예치금(Deposits) - 이 슬롯 동안의 예치금 수
- 자발적 퇴장(Voluntary exits) - 슬롯 동안 떠난 검증자 수
- 슬래싱(Slashings) - 블록 제안자 또는 증명자에게 부여된 페널티 수
- 투표(Votes) - 이 슬롯의 블록에 투표한 검증자

### 블록 {#blocks-1}

지분 증명(PoS)은 시간을 슬롯과 에포크로 나눕니다. 이는 새로운 데이터를 의미합니다!

- 제안자(Proposer) - 새로운 블록을 제안하도록 알고리즘에 의해 선택된 검증자
- 에포크(Epoch) - 블록이 제안된 에포크
- 슬롯(Slot) - 블록이 제안된 슬롯
- 증명(Attestations) - 슬롯에 포함된 증명 수(증명은 블록이 비콘 체인으로 이동할 준비가 되었음을 나타내는 투표와 같습니다)

### 검증자 {#validators}

검증자는 슬롯 내에서 블록을 제안하고 이를 증명할 책임이 있습니다.

- 검증자 번호(Validator number) - 검증자를 나타내는 고유 번호
- 현재 잔고(Current balance) - 보상을 포함한 검증자의 잔고
- 유효 잔고(Effective balance) - 스테이킹에 사용되는 검증자의 잔고
- 수입(Income) - 검증자가 받은 보상 또는 페널티
- 상태(Status) - 검증자가 현재 온라인 상태이고 활성화되어 있는지 여부
- 증명 유효성(Attestation effectiveness) - 검증자의 증명이 체인에 포함되는 데 걸리는 평균 시간
- 활성화 자격(Eligibility for activation) - 검증자가 검증을 수행할 수 있게 된 날짜(및 에포크)
- 활성화 시작일(Active since) - 검증자가 활성화된 날짜(및 에포크)
- 제안된 블록(Proposed blocks) - 검증자가 제안한 블록
- 증명(Attestations) - 검증자가 제공한 증명
- 예치금(Deposits) - 검증자가 수행한 스테이킹 예치금의 발신자 주소, 트랜잭션 해시, 블록 번호, 타임스탬프, 금액 및 상태

### 증명 {#attestations}

증명은 블록을 체인에 포함시키기 위한 "찬성" 투표입니다. 이 데이터는 증명 기록 및 증명한 검증자와 관련이 있습니다.

- 슬롯(Slot) - 증명이 발생한 슬롯
- 위원회 인덱스(Committee index) - 주어진 슬롯의 위원회 인덱스
- 집계 비트(Aggregation bits) - 증명에 참여하는 모든 검증자의 집계된 증명을 나타냅니다.
- 검증자(Validators) - 증명을 제공한 검증자
- 비콘 블록 루트(Beacon block root) - 검증자가 증명하고 있는 블록을 가리킵니다.
- 소스(Source) - 가장 최근의 정당화된 에포크를 가리킵니다.
- 타겟(Target) - 가장 최근의 에포크 경계를 가리킵니다.
- 서명(Signature)

### 네트워크 {#network-1}

합의 레이어 최상위 데이터는 다음을 포함합니다.

- 현재 에포크
- 현재 슬롯
- 활성 검증자(Active validators) - 활성 검증자 수
- 대기 중인 검증자(Pending validators) - 활성화되기를 기다리는 검증자 수
- 스테이킹된 ETH(Staked ETH) - 네트워크에 스테이킹된 ETH의 양
- 평균 잔고(Average balance) - 검증자의 평균 ETH 잔고

## 더 읽을거리 {#further-reading}

_도움이 된 커뮤니티 리소스를 알고 계신가요? 이 페이지를 편집하여 추가해 주세요!_

## 관련 주제 {#related-topics}

- [트랜잭션](/developers/docs/transactions/)
- [계정](/developers/docs/accounts/)
- [네트워크](/developers/docs/networks/)