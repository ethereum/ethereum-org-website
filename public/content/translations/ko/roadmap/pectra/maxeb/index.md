---
title: MaxEB
metaTitle: 펙트라 MaxEB
description: 펙트라 릴리스의 MaxEB에 대해 자세히 알아보세요.
lang: ko
authors: ["Nixo"]
---

*요약:* 펙트라 하드 포크를 통해 이더리움 검증자는 **유형 1(Type 1)**에서 **유형 2(Type 2)** 인출 자격 증명으로 변환하여 더 높은 최대 유효 잔고와 복리 수익을 선택할 수 있습니다. 이를 위한 공식 도구는 런치패드(Launchpad)입니다. 이 작업은 되돌릴 수 없습니다.

## 개요 {#overview}

### 누가 영향을 받나요? {#who-is-affected}

검증자를 운영하는 모든 사람입니다. 자신이 제어하는 검증자의 인덱스(예: [검증자 #12345](https://beaconcha.in/validator/12345))를 알고 있는 사람일 가능성이 높습니다. 프로토콜을 사용하여 검증자를 운영하는 경우(예: 리도(Lido) CSM 또는 Rocket Pool), 해당 프로토콜이 MaxEB를 지원하는지, 언제 지원하는지 확인해야 합니다.

유동성 스테이킹 토큰 (LST)(예: rETH 또는 stETH)을 사용하여 스테이킹하는 경우, 별도의 조치가 필요하거나 권장되지 않습니다.

### "MaxEB"란 무엇인가요? {#what-is-maxeb}

MaxEB = 검증자의 최대 유효 잔고(MAXimum Effective Balance)입니다. 펙트라 하드 포크 이전까지 모든 검증자는 최대 32 ETH에 대해서만 수익을 얻습니다. 펙트라 이후, 검증자는 이 변경 사항을 선택하여 32 ETH에서 2048 ETH 사이의 잔고에 대해 1 ETH 단위로 수익을 얻을 수 있는 옵션을 갖게 됩니다.

### 검증자는 어떻게 참여하나요? {#how-does-a-validator-opt-in}

검증자는 **유형 1**에서 **유형 2** 인출 자격 증명으로 변환하여 MaxEB 변경 사항에 참여합니다. 이 작업은 펙트라 하드 포크가 활성화된 후 [런치패드(검증자 작업)](https://launchpad.ethereum.org/validator-actions)에서 수행할 수 있습니다. **유형 0** → **유형 1**과 마찬가지로, **유형 1** → **유형 2**로의 변환은 되돌릴 수 없는 과정입니다.

### 인출 자격 증명이란 무엇인가요? {#whats-a-withdrawal-credential}

검증자를 운영할 때, 인출 자격 증명 세트를 갖게 됩니다. 이는 예치 데이터 JSON에서 찾을 수 있으며, 검증자의 beaconcha.in [예치 탭](https://beaconcha.in/validator/12345#deposits)에서도 확인할 수 있습니다.

1. **유형 0** 인출 자격 증명: 검증자의 인출 자격 증명이 `0x00...`으로 시작한다면, 샤펠라 하드 포크 이전에 예치한 것이며 아직 인출 주소가 설정되지 않은 상태입니다.

![Type 0 withdrawal credential](./0x00-wd.png)

2. **유형 1** 인출 자격 증명: 검증자의 인출 자격 증명이 `0x01...`으로 시작한다면, 샤펠라 하드 포크 이후에 예치했거나 이미 **유형 0** 자격 증명을 **유형 1** 자격 증명으로 변환한 상태입니다.

 ![Type 1 withdrawal credential](./0x01-wd.png)

3. **유형 2** 인출 자격 증명: 이 새로운 인출 자격 증명 유형은 `0x02...`으로 시작하며 펙트라 이후에 활성화됩니다. **유형 2** 인출 자격 증명을 가진 검증자는 때때로 "**복리 검증자(compounding validators)**"라고 불립니다.

| **허용됨** | **허용되지 않음** |
| --- | --- |
| ✅ 유형 0 → 유형 1 | ❌ 유형 0 → 유형 2 |
| ✅ 유형 1 → 유형 2 | ❌ 유형 1 → 유형 0 |
|  | ❌ 유형 2 → 유형 1 |
|  | ❌ 유형 2 → 유형 0 |

### 위험성 {#risks}

MaxEB를 사용하면 검증자가 전체 잔고를 다른 검증자에게 보낼 수 있습니다. 통합(consolidation) 요청을 제출하는 사용자는 서명하는 트랜잭션의 출처와 내용을 확인해야 합니다. MaxEB 기능을 활용하기 위한 공식 도구는 런치패드입니다. 서드파티 도구를 사용하기로 결정했다면 다음 사항을 확인해야 합니다.

- 소스 검증자의 공개키와 인출 주소가 자신이 제어하는 검증자와 일치하는지 확인
- 대상 검증자의 공개키가 정확하고 자신의 소유인지 확인
- 다른 검증자에게 자금을 보낼 의도가 없다면, 요청이 통합이 아닌 변환(conversion)인지 확인
- 올바른 인출 주소로 트랜잭션에 서명하고 있는지 확인

사용하려는 서드파티 도구에 대해 [EthStaker 커뮤니티](https://ethstaker.org/about)와 논의할 것을 **강력히 권장**합니다. 접근 방식을 점검하고 실수를 피하는 데 도움이 되는 유용한 공간입니다. 악의적이거나 잘못 구성된 도구를 사용할 경우, **검증자의 전체 잔고가 자신이 제어하지 않는 검증자에게 전송될 수 있으며**, 이를 되찾을 방법은 없습니다.

## 기술적 세부 사항 {#technical-details}

### 흐름 {#the-flow}

`ConsolidationRequest` 작업에는 두 가지 용도가 있습니다.

1. 기존 검증자를 **유형 1**에서 **유형 2** 검증자로 변환
2. 다른 검증자들을 기존 **유형 2** 검증자로 통합

**유형 1**에서 **유형 2** 검증자로 변환할 때, *소스(source)*와 *대상(target)*은 모두 변환하려는 검증자가 됩니다. 이 작업에는 가스가 소모되며 다른 통합 요청 뒤에 대기열로 들어갑니다. 이 대기열은 예치 대기열과 **분리**되어 있으며 새로운 검증자 예치의 영향을 받지 않고 [pectrified.com](https://pectrified.com/)에서 확인할 수 있습니다.

검증자를 통합하려면 **유형 2** 인출 자격 증명을 가진 *대상 검증자*가 있어야 합니다. 이는 통합되는 모든 검증자 잔고의 목적지이며, 인덱스가 보존됩니다.

### 유형 2로 변환하기 위한 요구 사항 {#requirements-for-converting-to-type-2}

이는 **유형 2**로 변환하는 첫 번째 검증자에게 필요합니다. 이 검증자의 인덱스는 보존되고 활성 상태를 유지합니다. 변환의 경우, *소스 검증자* == *대상 검증자*입니다.

검증자는 다음 조건을 충족해야 합니다.

- 활성 상태일 것
- **유형 1** 인출 자격 증명을 가질 것
- 종료 상태(또는 슬래싱된 상태)가 아닐 것
- 대기 중인 수동 트리거 인출이 없을 것(스윕(sweeps)에는 적용되지 않음)

![conversion illustration](./conversion.png)

### 통합을 위한 요구 사항 {#requirements-for-consolidating}

이는 변환과 *동일한 작업*이지만 *소스 검증자*가 *대상 검증자*와 다를 때 발생합니다. 대상 검증자의 인덱스는 보존되며 소스 검증자로부터 잔고를 받습니다. 소스 검증자의 인덱스는 `EXITED` 상태가 됩니다.

이 경우, 소스 검증자는 위의 모든 요구 사항과 함께 다음 조건을 충족해야 합니다.

- 최소 약 27.3시간(1 `SHARD_COMMITTEE_PERIOD`) 동안 활성 상태였을 것

대상 검증자는 다음 조건을 충족해야 합니다.

- **유형 2** 인출 자격 증명을 가질 것
- 종료 상태가 아닐 것

![consolidation illustration](./consolidation.png)

### 통합 요청 {#the-consolidation-request}

통합 요청은 소스 검증자와 연결된 인출 주소에 의해 서명되며 다음을 포함합니다.

1. 소스 검증자의 주소(예: `0x15F4B914A0cCd14333D850ff311d6DafbFbAa32b`)
2. 소스 검증자의 공개키(예: `0xa1d1ad0714035353258038e964ae9675dc0252ee22cea896825c01458e1807bfad2f9969338798548d9858a571f7425c`)
3. 대상 검증자의 공개키

변환의 경우 2번과 3번이 동일합니다. 이 작업은 [런치패드](https://launchpad.ethereum.org/)에서 수행할 수 있습니다.

### 서명 요구 사항 {#signing-requirements}

`ConsolidationRequest`을 제출하려면 **소스 검증자의 인출 주소**가 요청에 서명해야 합니다. 이는 검증자 자금에 대한 제어권을 증명합니다.

### 무엇에 서명하나요? {#what-is-signed}

`ConsolidationRequest` 객체의 도메인 분리된 [서명 루트(signing root)](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/beacon-chain.md#compute_signing_root)가 사용됩니다.

- **도메인:** `DOMAIN_CONSOLIDATION_REQUEST`
- **서명 루트 필드:**
  - `source_pubkey`: `BLSPubkey`
  - `target_pubkey`: `BLSPubkey`
  - `source_address`: `ExecutionAddress`

결과로 생성된 **BLS 서명**이 요청과 함께 제출됩니다.

참고: 서명은 검증자 키가 아닌 인출 주소에 의해 수행됩니다.

### 부분 인출 {#partial-withdrawals}

**유형 1** 자격 증명을 가진 검증자는 초과 잔고(32 ETH를 초과하는 금액)를 인출 주소로 가스비 없이 자동으로 스윕(sweep)받습니다. **유형 2**는 검증자가 1 ETH 단위로 잔고를 복리로 늘릴 수 있도록 허용하기 때문에, 2048 ETH에 도달할 때까지 잔고를 자동으로 스윕하지 않습니다. **유형 2** 검증자의 부분 인출은 수동으로 트리거해야 하며 가스가 소모됩니다.

## 통합 도구 {#consolidation-tooling}

통합을 관리하는 데 사용할 수 있는 여러 도구가 있습니다. 이더리움 재단에서 만든 공식 도구는 [런치패드](https://launchpad.ethereum.org/en/validator-actions)입니다. 스테이킹 커뮤니티의 주체들이 만든 서드파티 도구도 있으며, 런치패드에서 제공하지 않는 기능을 제공할 수 있습니다. 여기에 있는 도구들은 이더리움 재단의 감사를 받거나 보증되지 않았지만, 다음은 커뮤니티의 알려진 구성원들이 만든 오픈 소스 도구입니다.

| 도구 | 웹사이트 | 오픈 소스 | 제작자 | 감사 여부 | 인터페이스 | 주요 기능 |
| --- | --- | --- | --- | --- | --- | --- |
| Pectra Staking Manager | pectrastaking.com | 예, Apache-2.0 | [Pier Two](https://piertwo.com/) | 아니요 | 웹 UI | WalletConnect, SAFE와 연동됨 |
| Pectra Validator Ops CLI Tool | [GitHub](https://github.com/Luganodes/Pectra-Batch-Contract) | 예, MIT | [Luganodes](https://www.luganodes.com/) | 예, Quantstamp [2025년 5월](https://certificate.quantstamp.com/full/luganodes-pectra-batch-contract/23f0765f-969a-4798-9edd-188d276c4a2b/index.html) | 명령줄 | 일괄 처리, 한 번에 여러 검증자 지원 |
| Ethereal | [GitHub](https://github.com/wealdtech/ethereal) | 예, Apache-2.0 | [Jim McDonald](https://www.attestant.io/team/) | 아니요 | 명령줄 | 검증자 및 노드 관리를 위한 전체 기능 세트 |
| Siren | [GitHub](https://github.com/sigp/siren) | 예, Apache-2.0 | [Sigma Prime](https://sigmaprime.io/) | 아니요 | 일부 명령줄, 주로 웹 UI | 라이트하우스 합의 클라이언트를 사용하는 경우에만 작동 |
| Consolideth.app | https://consolideth.app/ [GitHub](https://github.com/Stakely/consolideth) | 예, MIT 라이선스 | [Stakely](https://stakely.io/) | 아니요 | 웹 UI, Stakely에서 호스팅하며 자유롭게 자체 호스팅 가능 | WalletConnect를 통한 SAFE를 포함하여 주요 지갑 연결 지원 |

## 자주 묻는 질문(FAQ) {#faq}

### 참여하면 제안 확률이나 보상이 변경되나요? {#change-luck-or-rewards}

아니요. 참여한다고 해서 제안 확률이 줄어들지는 않습니다. 임무와 제안 선택은 동일하게 유지됩니다. 예를 들어, 32 ETH 검증자 2개를 보유한 경우와 64 ETH 검증자 1개를 보유한 경우, 블록을 제안하도록 선택되어 보상을 받을 전체 확률은 동일합니다.

### 참여하면 슬래싱 위험이 변경되나요? {#change-slashing-risk}

소규모 또는 비전문 운영자의 경우, 짧게 대답하자면 '아니요'입니다. 더 자세히 설명하자면, 노드당 많은 검증자를 운영하고 빠른 알림 시스템을 갖춘 전문 운영자의 경우, 더 적은 수의 검증자로 통합하면 슬래싱에 대응하고 연쇄적인 이벤트를 방지하는 능력이 저하될 수 있습니다. 이러한 위험을 상쇄하기 위해 모든 검증자에 대한 초기 슬래싱 *페널티*가 1 ETH(32 ETH당)에서 0.0078125 ETH(32 ETH당)로 대폭 감소했습니다.

### 변환하려면 검증자를 종료해야 하나요? {#exit-validator}

아니요. 종료하지 않고 제자리에서 변환할 수 있습니다.

### 변환/통합하는 데 얼마나 걸리나요? {#how-long}

최소 27.3시간이 소요되지만 통합 역시 대기열의 영향을 받습니다. 이 대기열은 예치 및 인출 대기열과 독립적이며 그 영향을 받지 않습니다.

### 검증자 인덱스를 유지할 수 있나요? {#keep-validator-index}

예. 제자리 변환은 동일한 검증자 인덱스를 유지합니다. 여러 검증자를 통합하는 경우 *대상 검증자*의 인덱스만 유지할 수 있습니다.

### 증명(attestations)을 놓치게 되나요? {#miss-attestations}

다른 검증자로 통합하는 동안 소스 검증자는 종료되며, 대상 검증자에서 잔고가 활성화되기 전까지 약 27시간의 대기 기간이 있습니다. 이 기간은 **성능 지표에 영향을 미치지 않습니다**.

### 페널티가 발생하나요? {#incur-penalties}

아니요. 검증자가 온라인 상태인 한 페널티는 발생하지 않습니다.

### 통합되는 검증자들의 인출 주소가 일치해야 하나요? {#withdrawal-addresses-match}

아니요. 하지만 *소스*는 자체 주소에서 요청을 승인해야 합니다.

### 변환 후 보상이 복리로 적용되나요? {#rewards-compound}

예. **유형 2** 자격 증명을 사용하면 32 ETH를 초과하는 보상은 자동으로 재스테이킹되지만, 즉시 이루어지지는 않습니다. 작은 버퍼([*히스테리시스(hysteresis)*](https://eth2book.info/capella/part2/incentives/balances/#hysteresis)라고 함) 때문에 추가 금액이 재스테이킹되려면 잔고가 **약 1.25 ETH 더** 도달해야 합니다. 따라서 33.0 ETH에서 복리가 적용되는 대신 33.25(유효 잔고 = 33 ETH), 그다음 34.25(유효 잔고 = 34 ETH) 등에서 복리가 적용됩니다.

### 변환 후에도 자동 스윕을 받을 수 있나요? {#automatic-sweep}

자동 스윕은 2048을 초과하는 초과 잔고에 대해서만 발생합니다. 다른 모든 부분 인출의 경우 수동으로 트리거해야 합니다.

### 마음이 바뀌면 유형 2에서 유형 1로 돌아갈 수 있나요? {#go-back-to-type1}

아니요. **유형 2**로의 변환은 되돌릴 수 없습니다.

### 여러 검증자를 통합하려면 먼저 각각을 유형 2로 변환해야 하나요? {#consolidate-multiple-validators}

아닙니다! 하나의 검증자를 유형 2로 변환한 다음 이를 대상으로 사용하세요. 해당 유형 2 대상으로 통합되는 다른 모든 검증자는 유형 1이거나 유형 2일 수 있습니다.

### 내 검증자가 오프라인이거나 32 ETH 미만인데도 변환할 수 있나요? {#offline-or-below-32eth}

예. 활성 상태(종료되지 않음)이고 인출 주소로 서명할 수 있는 한 변환할 수 있습니다.

## 리소스 {#resources}

- [일렉트라(Electra) 합의 사양](https://github.com/ethereum/consensus-specs/blob/master/specs/electra/beacon-chain.md): 의존해야 할 가장 '정확한' 버전입니다. 의문이 생기면 사양을 읽어보세요.
- 모든 사람이 코드를 살펴보는 것을 편안해하는 것은 아니므로, [이 maxEB-GPT](https://chatgpt.com/g/g-67f1650fb48081918f555e0c8d1c2ae9-maxeb-gpt)가 사양을 해석하는 데 도움을 줄 수 있습니다. *면책 조항: AI는 정보를 잘못 해석하거나 환각(hallucinate) 답변을 생성할 수 있으므로, AI가 아닌 사양을 사실로 신뢰해야 합니다.*
- [pectrified.com](https://pectrified.com/): 통합, 예치 및 대기열 대기 시간의 상태를 확인하세요.
- [Ethereal](https://github.com/wealdtech/ethereal): 일반적인 검증자 작업을 관리하기 위해 커뮤니티에서 만든 CLI 도구입니다.
- [batch-validator-depositor](https://github.com/attestantio/batch-validator-depositor): 단일 트랜잭션으로 여러 이더리움 검증자를 예치할 수 있도록 커뮤니티에서 만든 컨트랙트입니다.