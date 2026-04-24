---
title: "이더리움의 포스트 양자 암호학"
description: "이더리움이 포스트 양자 시대를 어떻게 준비하고 있는지, 취약한 부분은 무엇이며, 이를 보호하기 위해 무엇을 구축하고 있는지 알아봅니다."
lang: ko
image: /images/roadmap/roadmap-future.png
alt: "이더리움 로드맵"
template: roadmap
summaryPoints:
  - 양자 컴퓨터는 결국 현재 이더리움이 사용하는 암호학을 위협하게 될 것입니다.
  - 이더리움 재단은 전담 포스트 양자 연구 팀을 운영하고 있으며, 2029년까지 완전한 포스트 양자 보호를 목표로 하는 체계적인 "린 이더리움(Lean Ethereum)" 로드맵을 가지고 있습니다.
  - 현재 여러분의 자산은 안전하며, 향후 마이그레이션 시 지갑 소프트웨어가 안내를 제공할 것입니다.
---

양자 컴퓨터는 결국 오늘날 이더리움과 대부분의 다른 디지털 시스템을 보호하는 암호화 방식을 해독할 수 있게 될 것입니다. 이 페이지에서는 이것이 무엇을 의미하는지, 네트워크가 이 위험을 완화하기 위해 어떻게 선제적으로 개선 사항을 개발하고 있는지, 그리고 여러분이 알아야 할 사항을 설명합니다.

## 포스트 양자 암호학이 중요한 이유 {#why-post-quantum-matters}

이더리움은 네트워크를 안전하게 유지하고 사용자의 자산을 보호하기 위해 여러 형태의 [암호학](/glossary/#cryptography)에 의존합니다. 가장 중요한 것은 다음과 같습니다.

- **타원 곡선 디지털 서명 알고리즘(ECDSA)**: 트랜잭션에 서명하는 데 사용되는 암호학입니다. 이더리움 계정의 보안은 이에 달려 있습니다.
- **BLS 서명**: [검증자](/glossary/#validator)가 네트워크의 상태에 대한 [합의](/glossary/#consensus)에 도달하는 데 사용됩니다.
- **KZG 다항식 커밋먼트**: 이더리움의 확장성 로드맵에서 [데이터 가용성](/glossary/#data-availability)을 위해 사용됩니다.
- **영지식 증명(ZK-proof) 시스템**: 롤업 및 기타 애플리케이션에서 오프체인 연산을 검증하는 데 사용됩니다.

이 모든 것은 아벨 군(Abelian groups)과 같은 수학적 구조에 의존합니다. 이는 고전적인 컴퓨터로는 풀기 어렵지만, 양자 컴퓨터는 [쇼어의 알고리즘(Shor's algorithm)](https://en.wikipedia.org/wiki/Shor%27s_algorithm)을 사용하여 효율적으로 풀 수 있습니다.

### 양자 컴퓨터는 언제 이더리움을 위협하게 될까요? {#when-will-quantum-computers-threaten-ethereum}

2026년 3월, 구글 퀀텀 AI(Google Quantum AI)는 256비트 타원 곡선 암호학(이더리움이 계정 서명에 사용하는 유형)을 해독하는 데 약 1,200개의 논리적 큐비트가 필요할 수 있다고 추정하는 연구를 발표했습니다. 이전 추정치에서는 이 수치가 훨씬 더 높았습니다. 구글은 자체 시스템을 포스트 양자 암호학으로 마이그레이션하기 위한 내부 기한을 2029년으로 설정했습니다.

현재의 양자 하드웨어는 수천 개의 노이즈가 있는 물리적 큐비트로 작동하며 이 규모에는 크게 미치지 못합니다. (오류를 수정하고 신뢰할 수 있는 연산을 수행하는) 논리적 큐비트는 각각 많은 물리적 큐비트를 필요로 합니다. **현재 하드웨어와 이더리움의 암호학을 해독하는 데 필요한 수준 사이의 격차는 여전히 크지만, 많은 사람들이 예상했던 것보다 빠르게 좁혀지고 있습니다.** 특히, 미국 국립표준기술연구소(NIST)는 2030년까지 ECDSA를 더 이상 사용하지 않도록 권고(deprecate)하고 2035년까지 사용을 금지할 것으로 예상하고 있습니다.

이것은 임박한 위협은 아닙니다. 하지만 암호학적 전환에는 수년이 걸리며, 이더리움의 보안 모델은 수백 년 동안 지속되도록 설계되었습니다. 이더리움의 대응은 **린 이더리움(Lean Ethereum)** 로드맵으로, 어떠한 암호학적 위협에도 살아남을 수 있는 기본 요소(primitives)를 중심으로 이더리움을 재구축하려는 신중하고 다년간에 걸친 미션입니다.

## 양자 공격에 취약한 4가지 영역 {#four-vulnerable-areas}

2026년 2월, 비탈릭 부테린(Vitalik Buterin)은 포스트 양자 업그레이드가 필요한 이더리움 암호학의 4가지 고유한 영역을 식별하는 [로드맵을 발표했습니다](https://x.com/VitalikButerin/status/2027075026378543132). 각 영역은 서로 다른 과제와 해결 방법을 가지고 있습니다.

### 1. 합의 레이어 BLS 서명 {#consensus-bls}

**역할**: 이더리움의 [지분 증명 (PoS)](/glossary/#pos) 프로토콜은 수십만 명의 검증자로부터 투표를 집계하기 위해 BLS 서명을 사용합니다. BLS는 많은 서명을 하나로 결합할 수 있게 하여 네트워크를 효율적으로 유지합니다.

**취약한 이유**: BLS 서명은 타원 곡선 페어링에 의존하며, 양자 컴퓨터는 이를 해독할 수 있습니다.

**접근 방식**: 린 컨센서스(Lean Consensus) 로드맵에는 두 가지 상호 보완적인 도구 개발이 포함됩니다.
- **leanXMSS**: 이더리움은 BLS 서명을 검증자를 위한 해시 기반 서명 체계인 leanXMSS로 대체할 것입니다. 해시 기반 서명은 해시 함수의 보안에만 의존하기 때문에 양자 내성이 있는 것으로 간주됩니다. 양자 컴퓨터는 해시 함수를 약화시킬 수는 있지만 해독하지는 못합니다.
- **leanVM**: SNARK 기반 서명 집계를 위한 최소한의 zkVM(영지식 가상 머신)입니다. 해시 기반 서명은 크기가 훨씬 크기 때문에(BLS의 96바이트에 비해 약 3,000바이트), leanXMSS로 전환하면 슬롯당 훨씬 더 많은 데이터가 생성됩니다. 이를 해결하기 위해 leanVM은 집계 엔진 역할을 하여 데이터를 250배 압축합니다. 이를 통해 양자 내성 체계로 전환한 후에도 많은 서명을 하나로 결합하는 효율성 이점을 유지할 수 있습니다.

<ExpandableCard title="Why can't Ethereum just replace BLS with a quantum-safe scheme?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked why cant ethereum just replace BLS?">

BLS를 효율적으로 만드는 집계 속성(수십만 개의 서명을 하나로 결합)은 명확한 양자 내성 대안이 없습니다. 또한 포스트 양자 서명은 BLS 서명보다 훨씬 큽니다. 단순히 하나를 다른 것으로 교체하면 이더리움의 합의 레이어가 훨씬 느려지고 비용이 많이 들게 됩니다. 이것이 바로 팀이 영지식 증명을 사용하여 양자 내성 서명을 효율적으로 집계하는 도구인 leanVM을 구축하는 이유입니다.

</ExpandableCard>

### 2. 데이터 가용성: KZG 커밋먼트 {#data-availability-kzg}

**역할**: KZG 다항식 커밋먼트는 모든 노드가 전체 데이터를 다운로드하지 않고도 네트워크에서 데이터(특히 롤업의 [블롭](/glossary/#blob) 데이터)를 사용할 수 있도록 보장합니다.

**취약한 이유**: KZG 커밋먼트는 양자 컴퓨터가 공격할 수 있는 동일한 수학적 구조인 타원 곡선 페어링에 의존합니다.

**현재의 완화 방법**: KZG 커밋먼트는 많은 참가자가 무작위성을 기여한 "신뢰할 수 있는 설정"을 사용합니다. 최소 한 명의 참가자가 정직하게 자신의 비밀을 폐기했다면, 사후에 이를 리버스 엔지니어링하려는 양자 컴퓨터에 대해서도 설정은 안전합니다.

**장기적인 해결책**: KZG를 양자 내성 커밋먼트 체계로 교체합니다. 두 가지 주요 후보는 다음과 같습니다.
- **STARK 기반 커밋먼트**: 타원 곡선 대신 해시 함수에 의존합니다. 이미 일부 ZK 롤업에서 사용되고 있습니다.
- **격자(Lattice) 기반 커밋먼트**: 양자 내성이 있다고 여겨지는 격자 문제의 난해함에 의존합니다.

두 접근 방식 모두 이더리움 규모에서의 효율성과 실용성을 위해 아직 연구 중입니다.

### 3. 계정 서명: ECDSA {#eoa-signatures}

**역할**: 모든 표준 이더리움 계정(외부 소유 계정 또는 [EOA](/glossary/#eoa))은 트랜잭션에 서명하기 위해 secp256k1 곡선에서 ECDSA를 사용합니다. 이것이 여러분의 자산을 보호합니다.

**취약한 이유**: 트랜잭션을 보낸 적이 있는 모든 계정의 경우 공개키가 온체인에 노출됩니다. 양자 컴퓨터는 이 노출된 공개키 데이터에서 개인 키를 도출할 수 있습니다.

**중요한 뉘앙스**: 이더를 받기만 하고 트랜잭션을 보낸 적이 없는 계정은 공개키가 노출되지 않았습니다. 주소(공개키의 해시)만 표시되므로 약간의 추가적인 보호를 제공합니다.

**접근 방식**: 이더리움은 단일 프로토콜 차원의 마이그레이션 대신 [계정 추상화](/roadmap/account-abstraction/)(특히 2026년 하반기 Hegotá 업그레이드에서 고려 중인 EIP-8141)를 사용하여 사용자에게 <strong>서명 민첩성(signature agility)</strong>을 제공할 계획입니다. 개별 계정은 전체 프로토콜이 변경될 때까지 기다리지 않고 포스트 양자 서명 체계로 전환할 수 있습니다.

이는 실용적인 접근 방식입니다. 포스트 양자 보호를 조기에 원하는 사용자와 지갑은 자발적으로 이를 채택할 수 있으며, 더 광범위한 마이그레이션은 시간이 지남에 따라 이루어집니다.

### 4. 애플리케이션 레이어 영지식 증명 {#zk-proofs}

**역할**: 영지식 증명 시스템은 레이어 2 (l2) 롤업 및 기타 애플리케이션에서 기본 데이터를 공개하지 않고 연산을 검증하는 데 사용됩니다.

**취약한 이유**: 널리 사용되는 많은 영지식 증명 시스템(타원 곡선 페어링을 사용하는 SNARK)은 양자 공격에 취약한 가정에 의존합니다.

**접근 방식**: 타원 곡선 대신 해시 함수에 의존하는 STARK는 이미 양자 내성을 갖추고 있으며 여러 롤업에서 사용되고 있습니다. STARK 기반 시스템의 자연스러운 생태계 채택은 이미 애플리케이션 레이어에서 포스트 양자 보안을 제공하고 있습니다.

## NIST 표준 {#nist-standards}

2024년 8월, 미국 국립표준기술연구소(NIST)는 [세 가지 포스트 양자 암호학 표준을 확정했습니다](https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards). 이는 이더리움을 포함한 전체 기술 산업에 각 프로젝트가 자체적으로 발명하는 대신 기반으로 삼을 수 있는 검증된 알고리즘의 공유 세트를 제공하기 때문에 중요합니다.

| 표준 | 이름 | 유형 | 사용 사례 |
|----------|------|------|----------|
| FIPS 203 | ML-KEM | 격자 기반 | 키 캡슐화(키 교환) |
| FIPS 204 | ML-DSA (Dilithium) | 격자 기반 | 디지털 서명 |
| FIPS 205 | SLH-DSA (SPHINCS+) | 해시 기반 | 디지털 서명 |

이러한 표준은 광범위한 산업의 포스트 양자 전환을 위한 기반을 제공합니다. 이더리움의 작업은 이를 기반으로 확장되며, 특히 효율성과 집계가 중요한 탈중앙화된 네트워크의 고유한 과제에 중점을 둡니다.

## 이더리움 재단의 접근 방식 {#ef-approach}

이더리움 재단은 2026년 1월 토마스 코라트거(Thomas Coratger)가 이끄는 전담 포스트 양자 보안 팀을 구성했습니다. 이 팀의 작업은 [pq.ethereum.org](https://pq.ethereum.org)에서 공개적으로 추적할 수 있습니다.

### 현재 활동 (2026년 4월 기준) {#current-activity}

- **주간 상호운용성 데브넷**: 라이트하우스(Lighthouse), Grandine, Zeam, Ream Labs, PierTwo를 포함한 10개 이상의 클라이언트 팀이 정기적인 포스트 양자 상호운용성 테스트에 참여합니다.
- **포세이돈 프라이즈(Poseidon Prize)**: 해시 기반 암호학 기본 요소의 개선을 목표로 하는 100만 달러 규모의 연구 상금입니다.
- **오픈 소스 구현**: leanXMSS, leanVM, leanSpec(Python), leanSig(Rust), leanMultisig는 모두 [leanEthereum GitHub 조직](https://github.com/leanEthereum)에서 사용할 수 있습니다.
- **제2회 연례 PQ 연구 리트릿**: 2026년 10월 9일부터 10월 12일까지 영국 케임브리지에서 열릴 예정입니다.
- **NIST 연계**: 이더리움의 작업은 2024년 8월 NIST가 확정한 포스트 양자 암호학 표준(ML-KEM, ML-DSA, SLH-DSA 등)을 기반으로 합니다.

### 마이그레이션 마일스톤 {#migration-milestones}

팀은 이더리움에 포스트 양자 암호학을 점진적으로 도입하기 위한 일련의 프로토콜 업그레이드 개요를 설명했습니다. 이는 계획된 마일스톤이며 보장된 약속은 아닙니다. 이름과 순서는 변경될 수 있습니다.

| 마일스톤 | 도입 내용 |
|-----------|--------------------|
| I* | PQ 키 레지스트리. 검증자는 기존 BLS 키와 함께 포스트 양자 공개키를 등록할 수 있습니다. |
| J* | PQ 서명 검증 프리컴파일. 스마트 컨트랙트와 지갑은 PQ 서명을 기본적으로 검증할 수 있습니다. |
| L* | leanVM을 통한 PQ 증명(attestations) 및 실시간 합의 레이어 증명. 검증자는 합의를 위해 PQ 서명을 사용하기 시작합니다. |
| M* | 완전한 PQ 서명 집계 및 PQ 안전 블롭 커밋먼트. |

**목표**: 체계적인 포크 마일스톤은 약 2029년까지 핵심 포스트 양자 인프라를 완료하는 것을 목표로 합니다. 완전한 실행 레이어 및 생태계 마이그레이션은 그 이후까지 이어집니다.

## 사용자는 무엇을 해야 하나요? {#what-users-need-to-do}

**지금 당장은 아무것도 할 필요가 없습니다.** 여러분의 자산은 안전합니다. 오늘날 어떤 양자 컴퓨터도 이더리움의 암호학을 위협할 수 없습니다.

**미래에는**: 이더리움에서 포스트 양자 서명 체계가 널리 지원되면(Hegotá 하드 포크 및 EIP-8141 구현 이후로 예상됨), 계정을 양자 내성 서명으로 마이그레이션해야 할 것입니다. 지갑 소프트웨어가 이 전환 과정을 안내할 것입니다.

계정에서 트랜잭션을 보낸 적이 없다면(즉, 공개키가 온체인에 노출되지 않았다면) 추가적인 보호 계층이 있는 것입니다. 하지만 결국 모든 계정은 마이그레이션해야 합니다.

휴면 지갑(소유자가 마이그레이션의 필요성을 모를 수 있는 계정)을 처리하는 방법은 열려 있는 거버넌스 주제입니다. 이더리움 커뮤니티는 아직 이에 대한 합의에 도달하지 못했습니다.

## 자주 묻는 질문 {#faq}

<ExpandableCard title="Can quantum computers steal my ETH today?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked can quantum computers steal my ETH today?">

**아니요.** 오늘날 어떤 양자 컴퓨터도 이더리움의 암호학을 해독할 수 없습니다. 현재의 양자 하드웨어는 필요한 규모에 크게 미치지 못합니다. 이 페이지에 설명된 작업은 미래를 위한 준비이며, 현재 진행 중인 위협에 대한 대응이 아닙니다.

</ExpandableCard>

<ExpandableCard title="When could quantum computers become a threat?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked when could quantum computers become a threat?">

추정치는 다양합니다. 2026년 3월 구글의 연구에 따르면 256비트 타원 곡선 암호학을 해독하는 데 필요한 하드웨어는 빠르면 이번 10년 말쯤에 등장할 수 있지만, 여전히 중대한 엔지니어링 과제가 남아 있습니다. 대부분의 연구자들은 현실적인 위협이 최소 몇 년은 더 걸릴 것으로 보고 있습니다. 솔직한 답변은 아무도 정확한 일정을 모른다는 것이며, 이것이 바로 지금 준비하는 것이 중요한 이유입니다.

</ExpandableCard>

<ExpandableCard title="Will I need to do anything to protect my wallet?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked will I need to do anything?">

결국에는 그렇습니다. 이더리움에서 포스트 양자 서명 체계를 사용할 수 있게 되면 사용자는 계정을 마이그레이션해야 할 것입니다. 지갑 소프트웨어가 이 전환을 대신 처리해 줄 가능성이 높습니다. 지금 당장은 아무것도 할 필요가 없습니다. 조치가 필요할 때 이더리움 커뮤니티와 지갑 개발자가 명확한 지침과 도구를 제공할 것입니다.

</ExpandableCard>

<ExpandableCard title="What about my tokens, NFTs, and DeFi positions?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked what about tokens NFTs DeFi?">

이더리움의 자산은 계정 서명에 의해 제어됩니다. 계정이 양자 내성 서명 체계로 마이그레이션되면 해당 계정의 모든 것이 보호됩니다. 각 자산을 개별적으로 마이그레이션할 필요는 없습니다. 자금을 보유한 스마트 컨트랙트(예: 탈중앙화 금융 (DeFi) 프로토콜)는 내부적으로 사용하는 암호학 기본 요소에 따라 자체 업그레이드가 필요할 수 있습니다.

</ExpandableCard>

<ExpandableCard title="Is Ethereum behind other blockchains on this?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked is Ethereum behind?">

아니요. 이더리움은 전담 팀, 자금 지원을 받는 연구, 주간 데브넷, 공개된 마이그레이션 로드맵 등 모든 블록체인 중 가장 체계적인 포스트 양자 프로그램을 갖추고 있으며, 양자 컴퓨팅을 일급 설계 제약 조건으로 취급합니다. 아직 완전한 포스트 양자 전환을 완료한 블록체인은 없습니다. 이더리움 재단의 추정에 따르면, 이더리움의 양자 취약 휴면 자금 노출은 약 0.1%로 다른 주요 블록체인 네트워크보다 현저히 낮습니다.

</ExpandableCard>

<ExpandableCard title="What is 'harvest now, decrypt later'?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked what is harvest now decrypt later?">

"지금 수집하고 나중에 해독(Harvest now, decrypt later)"은 누군가 오늘 암호화된 데이터나 노출된 공개키를 기록해 두었다가 나중에 충분히 강력한 양자 컴퓨터가 존재할 때 암호화를 해독하는 공격입니다. 이더리움의 경우, 이는 공개키가 이미 온체인에 노출된 계정(트랜잭션을 보낸 적이 있는 모든 계정)과 가장 관련이 있습니다. 이것이 양자 위협이 아직 임박하지 않았음에도 불구하고 커뮤니티가 포스트 양자 마이그레이션을 시간에 민감한 문제로 취급하는 한 가지 이유입니다.

</ExpandableCard>

## 더 읽어보기 {#further-reading}

- [pq.ethereum.org](https://pq.ethereum.org) - _이더리움 재단(Ethereum Foundation)_
- [포스트 양자 암호학 프로젝트(Post-Quantum Cryptography Project)](https://pse.dev/projects/post-quantum-cryptography) - _이더리움 프라이버시 스튜어드(PSE)_
- [NIST 포스트 양자 암호학 표준(NIST Post-Quantum Cryptography standards)](https://csrc.nist.gov/projects/post-quantum-cryptography) - _NIST_
- [양자 취약성을 책임감 있게 공개하여 암호화폐 보호하기(Safeguarding cryptocurrency by disclosing quantum vulnerabilities responsibly)](https://research.google/blog/safeguarding-cryptocurrency-by-disclosing-quantum-vulnerabilities-responsibly/) - _구글 퀀텀 AI(Google Quantum AI)_
- [양자 프론티어는 생각보다 가까울 수 있습니다(Quantum frontiers may be closer than they appear)](https://blog.google/innovation-and-ai/technology/safety-security/cryptography-migration-timeline/) - _구글(Google)_
- [KZG 및 신뢰할 수 있는 설정(KZG and trusted setups)](/roadmap/danksharding/#what-is-kzg)
- [린 위크 케임브리지(2025) leanVM + PQ 워크숍 리소스(Lean Week Cambridge (2025) leanVM + PQ workshop resources)](https://github.com/leanEthereum/pm/blob/main/workshops-and-interops/2025/lean-week-cambridge/index.md) - _린 이더리움(Lean Ethereum)_
- [PQ 트랜잭션 서명 ACD 브레이크아웃 콜(PQ Transaction Signatures ACD Breakout Calls)](https://youtube.com/playlist?list=PLJqWcTqh_zKEOum3uR0odkH59fmGUYuZB) - _이더리움 재단(Ethereum Foundation)_
- [PQ 상호운용성 ACD 브레이크아웃 콜(PQ Interop ACD Breakout Calls)](https://youtube.com/playlist?list=PLJqWcTqh_zKF_Q9HNXBLW_AtktsjToTIu) - _이더리움 재단(Ethereum Foundation)_
- [린 이더리움 및 포스트 양자 보안 유튜브 재생목록(Lean Ethereum & Post-Quantum Security YouTube Playlist)](https://youtube.com/playlist?list=PLJqWcTqh_zKGGuO_q1dgYLsfUoX1sNhWM) - _이더리움 재단(Ethereum Foundation)_
- [포스트 양자 내성 패널 인터뷰(Panel interview post-quantum resistance)](https://youtu.be/5DRDjeMmOPw) - _뱅크리스 팟캐스트(Bankless Podcast)_
- [이더리움의 계정 추상화(Account abstraction on Ethereum)](/roadmap/account-abstraction/)
- [strawmap.org](https://strawmap.org/) - _EF 아키텍처(EF Architecture)_
- [중첩: 양자 컴퓨팅 산업 분석(Superpositioned: Analysis of the Quantum Computing Industry)](https://www.superpositioned.co/) - _사닐 스리니(Saneel Sreeni)_