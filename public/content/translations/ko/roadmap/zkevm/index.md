---
title: L1 블록 검증을 위한 zkEVM
description: 영지식 증명이 어떻게 이더리움 블록 실행을 검증하여 더 높은 처리량과 더 낮은 검증자 요구 사항을 가능하게 하는지 알아보세요.
lang: ko
---

# L1 블록 검증을 위한 zkEVM {#zkevm-l1}

zkEVM은 [영지식 증명](/zero-knowledge-proofs/)을 사용하여 이더리움 블록 실행을 검증하는 기술입니다. 모든 [검증자](/glossary/#validator)가 블록 내의 모든 트랜잭션을 재실행하도록 요구하는 대신, 단일 특수 주체("증명자(prover)"라고 함)가 블록을 실행하고 실행이 올바르다는 암호화 증명을 생성합니다. 그러면 모든 노드가 이 증명을 검증할 수 있습니다. 이 과정은 모든 트랜잭션을 재실행하는 것보다 훨씬 저렴합니다.

<Alert variant="info">
<AlertEmoji text="💡" />
<AlertContent>
<AlertTitle>zkEVM 롤업과 혼동하지 마세요</AlertTitle>
<AlertDescription>
이 페이지에서는 이더리움 L1 블록 실행을 검증하기 위해 zkEVM을 사용하는 방법에 대해 설명합니다. ZK 증명을 사용하여 이더리움을 레이어2 솔루션으로 확장하는 zkEVM 롤업에 대해서는 [영지식 롤업](/developers/docs/scaling/zk-rollups/)을 참조하세요.
</AlertDescription>
</AlertContent>
</Alert>

## 재실행 문제 {#reexecution-problem}

오늘날 이더리움은 "N-of-N" 검증 모델을 사용합니다. 제안된 상태 변경이 올바른지 검증하기 위해 모든 검증자가 모든 블록의 모든 트랜잭션을 독립적으로 재실행해야 합니다. 이 접근 방식은 신뢰를 최소화(trustless)하는 데는 최적이지만, 근본적인 병목 현상을 일으킵니다.

문제는 이더리움의 처리량이 평균적인 검증자가 처리할 수 있는 수준으로 제한된다는 것입니다. [가스 한도](/glossary/#gas-limit)를 높이면 블록당 더 많은 트랜잭션을 허용할 수 있지만, 검증자의 하드웨어 요구 사항도 높아집니다. 이는 탈중앙화를 위협합니다. 검증자를 실행하는 데 값비싼 하드웨어가 필요하다면 네트워크 보안에 참여할 수 있는 사람이 줄어들기 때문입니다.

zkEVM은 이러한 트레이드오프에서 벗어날 수 있는 방법을 제공합니다. "모두가 재실행"하는 방식에서 "한 명이 증명하고 모두가 검증"하는 방식으로 전환함으로써, 이더리움은 검증자 하드웨어 요구 사항을 높이지 않고도 가스 한도를 안전하게 늘릴 수 있습니다.

## zkEVM L1 검증 작동 방식 {#how-it-works}

zkEVM 검증은 블록 유효성 검사를 "1-of-N" 모델로 변환합니다.

1. **실행**: 증명자가 블록 내의 모든 트랜잭션을 실행하여 모든 상태 변경을 추적합니다.
2. **증명**: 증명자가 실행의 정확성을 증명하는 암호화 증명([SNARK 또는 STARK](/zero-knowledge-proofs/#types-of-zero-knowledge-proofs))을 생성합니다.
3. **검증**: 검증자는 트랜잭션을 재실행하는 대신 증명을 검증합니다. 이는 전체 재실행보다 훨씬 저렴합니다.

보안 보장은 동일하게 유지됩니다. 실행이 올바르지 않으면 유효한 증명을 생성할 수 없습니다. 하지만 이제 모든 노드가 값비싼 연산을 수행하는 대신 증명자만 연산을 수행하며, 검증 비용이 충분히 저렴해져 가스 한도를 제한하지 않습니다.

### 타입 1 zkEVM {#type-1-zkevm}

zkEVM은 이더리움과의 호환성에 따라 여러 타입으로 분류됩니다.

- **타입 1**: 이더리움과 완전히 동일합니다. EVM을 수정하지 않으므로 모든 이더리움 블록을 있는 그대로 정확하게 증명할 수 있습니다.
- **타입 2-4**: 증명을 더 쉽게 만들기 위해 EVM 동작을 수정하는 등 다양한 트레이드오프를 취합니다.

L1 검증에는 타입 1이 필수적입니다. zkEVM은 엣지 케이스와 과거 블록을 포함하여 유효한 모든 이더리움 블록을 증명할 수 있어야 합니다. 이더리움의 정확한 동작에서 벗어나면 합의 문제가 발생할 수 있습니다.

이더리움 재단의 zkEVM 연구는 기존 이더리움 실행과 완벽하게 호환되는 타입 1 구현에 중점을 둡니다.

## 이더리움을 위한 이점 {#benefits}

### 더 높은 처리량 {#higher-throughput}

검증 비용이 저렴해지면 가스 한도를 안전하게 늘릴 수 있습니다. 이는 네트워크 용량을 확장하고 수요가 많은 기간 동안 수수료를 안정화하는 데 도움이 됩니다. 현재 가스 한도는 부분적으로 검증자 하드웨어에 의해 제한되지만, zkEVM은 이러한 제약을 제거합니다.

### 더 강력한 탈중앙화 {#stronger-decentralization}

zkEVM 검증을 통해 검증자는 트랜잭션을 실행할 필요 없이 증명만 검증하면 됩니다. 이는 검증자를 실행하기 위한 하드웨어 요구 사항을 크게 낮추어 더 많은 사람이 네트워크 보안에 참여할 수 있게 합니다. 검증자 다양성이 높아지면 이더리움의 검열 저항성과 회복력이 강화됩니다.

증명 자체에는 현재 검증자 하드웨어보다 더 많은 상당한 컴퓨팅 리소스가 필요하다는 점에 유의하세요. 그러나 유효성 검사와 달리 증명은 동일한 방식으로 탈중앙화될 필요가 없습니다. 블록당 하나의 올바른 증명만 필요하며 누구나 빠르게 검증할 수 있습니다. 증명자 시장, 증명 집계 및 하드웨어 가속에 대한 연구는 증명이 소수의 대규모 운영자에게 집중되지 않고 경쟁력 있고 접근 가능한 상태를 유지하도록 하는 것을 목표로 합니다.

### 예측 가능한 최종성 {#predictable-finality}

증명 검증은 블록 복잡성에 관계없이 일정한 시간 내에 작동합니다. 이를 통해 인증(attestation) 타이밍을 더 예측 가능하게 만들고, 검증자가 복잡한 블록을 제때 처리하지 못할 때 발생할 수 있는 누락된 인증을 줄입니다.

## 실시간 증명의 과제 {#realtime-proving}

zkEVM L1 검증의 주요 과제는 속도입니다. 이더리움 블록은 12초마다 생성되므로, 합의에 유용하게 사용되려면 비슷한 시간 내에 증명이 생성되어야 합니다.

현재 zkEVM 구현은 단일 블록을 증명하는 데 몇 분에서 몇 시간까지 걸릴 수 있습니다. 연구는 다음을 통해 이 격차를 줄이는 데 중점을 둡니다.

- **병렬화**: 여러 머신에 증명 작업을 분산
- **특수 하드웨어**: ZK 증명에 최적화된 회로 및 하드웨어 설계
- **알고리듬 개선**: 더 효율적인 증명 시스템 및 회로 설계
- **점진적 증명**: 트랜잭션 실행 후가 아니라 실행되는 동안 증명 생성

## 현재 연구 및 구현 {#current-research}

이더리움 재단은 [PSE(Privacy Stewards of Ethereum)](https://pse.dev/) 팀을 통해 zkEVM 연구에 자금을 지원합니다. 주요 연구 트랙은 다음과 같습니다.

- **실시간 증명**: 12초 슬롯 내에 전체 블록 증명 생성
- **클라이언트 통합**: 실행 클라이언트와 증명자 간의 인터페이스 표준화
- **경제적 인센티브**: 지속 가능한 증명자 시장 및 수수료 구조 설계

### 구현 상태 {#implementations}

이더리움 블록 증명을 위해 여러 zkVM 구현이 개발 및 테스트되고 있습니다.

| 구현 | 아키텍처 |
|----------------|--------------|
| [OpenVM](https://github.com/openvm-org/openvm) | rv32im |
| [RISC Zero](https://github.com/risc0/risc0) | rv32im |
| [Airbender](https://github.com/matter-labs/zksync-airbender) | rv32im |
| [Jolt](https://github.com/a16z/jolt) | rv32im |
| [Zisk](https://github.com/0xPolygonHermez/zisk) | rv64ima |

이들은 RISC-V 기반 가상 머신을 사용하여 EVM 바이트코드를 실행한 다음, 올바른 실행에 대한 ZK 증명을 생성합니다. 최신 테스트 결과 및 진행 상황은 [이더리움 재단의 zkVM 트래커](https://zkevm.ethereum.foundation/zkvm-tracker)에서 추적할 수 있습니다.

## zkEVM이 다른 업그레이드와 어떻게 연결되는가 {#related-upgrades}

zkEVM L1 검증은 다른 여러 이더리움 로드맵 항목과 연결됩니다.

- **[버클 트리](/roadmap/verkle-trees/)**: 무상태(stateless) 검증을 위해 더 작은 증인(witness)을 가능하게 하여 증명자가 작업해야 하는 데이터를 줄입니다.
- **[무상태성](/roadmap/statelessness/)**: zkEVM은 핵심 조력자입니다. 실행에 대한 ZK 증명이 있으면 노드는 블록을 검증하기 위해 전체 상태가 필요하지 않습니다.
- **[PBS](/roadmap/pbs/)**: 블록 빌더가 증명 생성을 통합하거나 별도의 증명자 시장이 나타날 수 있습니다.
- **[단일 슬롯 최종성](/roadmap/single-slot-finality/)**: 더 빠른 증명 생성은 암호화 보장을 통해 단일 슬롯 최종성을 가능하게 할 수 있습니다.

<Alert variant="warning">
<AlertEmoji text="🧪" />
<AlertContent>
<AlertDescription>
zkEVM L1 검증은 활발히 연구 중이며 아직 프로덕션 이더리움 클라이언트에 통합되지 않았습니다.
</AlertDescription>
</AlertContent>
</Alert>

## 더 읽어보기 {#further-reading}

- [zkEVM Foundation](https://zkevm.ethereum.foundation) - 공식 이더리움 재단 zkEVM 연구 허브
- [Ethproofs](https://ethproofs.org/) - 실시간으로 이더리움을 증명하기 위한 경쟁 추적
- [zkevm.fyi](https://zkevm.fyi) - L1용 zkEVM에 대한 기술 서적
- [PSE zkEVM Specs](https://github.com/privacy-scaling-explorations/zkevm-specs) - 기술 사양
- [The Verge](https://vitalik.eth.limo/general/2024/10/23/futures4.html) - 비탈릭의 검증 개선 사항 개요
- [EF zkEVM Blog](https://zkevm.ethereum.foundation/blog) - EF 팀의 성능 분석