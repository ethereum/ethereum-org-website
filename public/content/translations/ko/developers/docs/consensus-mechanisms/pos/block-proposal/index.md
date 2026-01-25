---
title: 블록 제안
description: 지분 증명 이더리움에서 블록이 제안되는 방법에 대한 설명입니다.
lang: ko
---

블록은 블록체인의 기본 단위입니다. 블록은 노드 간에 전달되고 합의를 거쳐 각 노드의 데이터베이스에 추가되는 개별 정보 단위입니다. 이 페이지에서는 블록이 어떻게 생성되는지 설명합니다.

## 필수 구성 요소 {#prerequisites}

블록 제안은 지분 증명 프로토콜의 일부입니다. 이 페이지를 이해하는 데 도움이 되도록 [지분 증명](/developers/docs/consensus-mechanisms/pos/) 및 [블록 아키텍처](/developers/docs/blocks/)에 대해 읽어보시는 것을 권장합니다.

## 누가 블록을 생성하나요? {#who-produces-blocks}

검증자 계정이 블록을 제안합니다. 검증자 계정은 실행 클라이언트와 합의 클라이언트의 일부로 검증자 소프트웨어를 실행하고 예치 계약에 최소 32 ETH를 예치한 노드 운영자가 관리합니다. 그러나 각 검증자는 가끔씩만 블록 제안을 담당합니다. 이더리움은 시간을 슬롯과 에폭 단위로 측정합니다. 각 슬롯은 12초이며, 32개의 슬롯(6.4분)이 하나의 에폭을 구성합니다. 모든 슬롯은 이더리움에 새로운 블록을 추가할 수 있는 기회입니다.

### 무작위 선택 {#random-selection}

각 슬롯에서 단일 검증자가 의사 난수 방식으로 선택되어 블록을 제안합니다. 각 노드가 진정한 난수를 생성할 경우 합의에 도달할 수 없기 때문에 블록체인에는 진정한 의미의 무작위성이란 존재하지 않습니다. 대신, 검증자 선택 과정을 예측할 수 없도록 만드는 것이 목표입니다. 이더리움에서는 블록 제안자의 해시와 매 블록마다 업데이트되는 시드를 혼합하는 RANDAO라는 알고리즘을 사용하여 무작위성을 구현합니다. 이 값은 전체 검증자 집합에서 특정 검증자를 선택하는 데 사용됩니다. 검증자 선택은 특정 종류의 시드 조작을 방지하기 위해 두 에폭 전에 미리 고정됩니다.

검증자는 각 슬롯에서 RANDAO에 추가하지만, 전역 RANDAO 값은 에폭당 한 번만 업데이트됩니다. 다음 블록 제안자의 인덱스를 계산하기 위해 RANDAO 값과 슬롯 번호를 혼합하여 각 슬롯에서 고유한 값을 생성합니다. 개별 검증자가 선택될 확률은 단순히 `1/N`(여기서 `N` = 총 활성 검증자 수)이 아닙니다. 대신, 각 검증자의 유효 ETH 잔액에 따라 가중치가 부여됩니다. 최대 유효 잔액은 32 ETH입니다(즉, `잔액 < 32 ETH`는 `잔액 == 32 ETH`보다 가중치가 낮지만, `잔액 > 32 ETH`는 `잔액 == 32 ETH`보다 가중치가 높지 않다는 것을 의미합니다).

각 슬롯에서 단 하나의 블록 제안자만 선택됩니다. 정상적인 조건에서는 단일 블록 생성자가 할당된 슬롯에서 단일 블록을 생성하고 배포합니다. 동일한 슬롯에 두 개의 블록을 생성하는 것은 슬래싱 대상이 되는 위반 행위이며, 종종 "이중 서명(equivocation)"으로 알려져 있습니다.

## 블록은 어떻게 생성되나요? {#how-is-a-block-created}

블록 제안자는 자체적으로 로컬에서 실행되는 포크 선택 알고리즘의 관점에 따라 체인의 가장 최근 헤드 위에 구축되는 서명된 비콘 블록을 브로드캐스트해야 합니다. 포크 선택 알고리즘은 이전 슬롯에 남아 있는 대기 중인 증명을 적용한 다음, 기록에서 증명의 누적 가중치가 가장 큰 블록을 찾습니다. 해당 블록은 제안자가 생성한 새 블록의 부모가 됩니다.

블록 제안자는 자체 로컬 데이터베이스와 체인 뷰에서 데이터를 수집하여 블록을 생성합니다. 블록의 내용은 아래 코드 조각에 나와 있습니다.

```rust
class BeaconBlockBody(Container):
    randao_reveal: BLSSignature
    eth1_data: Eth1Data
    graffiti: Bytes32
    proposer_slashings: List[ProposerSlashing, MAX_PROPOSER_SLASHINGS]
    attester_slashings: List[AttesterSlashing, MAX_ATTESTER_SLASHINGS]
    attestations: List[Attestation, MAX_ATTESTATIONS]
    deposits: List[Deposit, MAX_DEPOSITS]
    voluntary_exits: List[SignedVoluntaryExit, MAX_VOLUNTARY_EXITS]
    sync_aggregate: SyncAggregate
    execution_payload: ExecutionPayload
```

`randao_reveal` 필드는 블록 제안자가 현재 에폭 번호에 서명하여 생성하는 검증 가능한 무작위 값을 포함합니다. `eth1_data`는 예치 계약에 대한 블록 제안자의 관점에 대한 투표이며, 여기에는 예치 머클 트리의 루트와 새로운 예치의 검증을 가능하게 하는 총 예치 수가 포함됩니다. `graffiti`는 블록에 메시지를 추가하는 데 사용할 수 있는 선택적 필드입니다. `proposer_slashings`와 `attester_slashings`는 제안자의 체인 관점에 따라 특정 검증자가 슬래싱 가능한 위반 행위를 저질렀다는 증거를 포함하는 필드입니다. `deposits`는 블록 제안자가 인지하고 있는 새로운 검증자 예치 목록이고, `voluntary_exits`는 블록 제안자가 합의 레이어 가십 네트워크를 통해 알게 된, 탈퇴를 희망하는 검증자 목록입니다. `sync_aggregate`는 이전에 동기화 위원회(라이트 클라이언트 데이터를 제공하는 검증자 하위 집합)에 할당되어 데이터 서명에 참여했던 검증자를 보여주는 벡터입니다.

`execution_payload`는 실행 클라이언트와 합의 클라이언트 간에 트랜잭션 관련 정보가 전달되도록 합니다. `execution_payload`는 비콘 블록 내부에 중첩되는 실행 데이터 블록입니다. `execution_payload` 내부의 필드는 이더리움 황서에 요약된 블록 구조를 반영하지만, 오머(ommer)가 없고 `difficulty` 대신 `prev_randao`가 있다는 점이 다릅니다. 실행 클라이언트는 자체 가십 네트워크를 통해 수신한 로컬 트랜잭션 풀에 접근할 수 있습니다. 이러한 트랜잭션은 로컬에서 실행되어 사후 상태(post-state)라고 하는 업데이트된 상태 트라이를 생성합니다. 트랜잭션은 `transactions`라는 목록으로 `execution_payload`에 포함되며, 사후 상태(post-state)는 `state-root` 필드에 제공됩니다.

이 모든 데이터는 비콘 블록으로 수집 및 서명되어 블록 제안자의 피어에게 브로드캐스트되고, 피어는 이를 다시 자신의 피어에게 전파하는 식으로 계속됩니다.

[블록의 구조](/developers/docs/blocks)에 대해 자세히 알아보세요.

## 블록은 어떻게 되나요? {#what-happens-to-blocks}

블록은 블록 제안자의 로컬 데이터베이스에 추가되고 합의 레이어 가십 네트워크를 통해 피어에게 브로드캐스트됩니다. 검증자는 블록을 수신하면 해당 블록이 올바른 부모를 가졌는지, 올바른 슬롯에 해당하는지, 제안자 인덱스가 예상과 일치하는지, RANDAO 공개 값이 유효한지, 제안자가 슬래싱되지 않았는지 등을 포함하여 내부 데이터를 검증합니다. `execution_payload`가 분리되고, 검증자의 실행 클라이언트는 목록에 있는 트랜잭션을 재실행하여 제안된 상태 변경을 확인합니다. 블록이 이 모든 검사를 통과하면 각 검증자는 블록을 자신의 정식 체인에 추가합니다. 그러면 다음 슬롯에서 프로세스가 다시 시작됩니다.

## 블록 보상 {#block-rewards}

블록 제안자는 자신의 작업에 대한 보상을 받습니다. 활성 검증자 수와 그들의 유효 잔액의 함수로 계산되는 `base_reward`가 있습니다. 그러면 블록 제안자는 블록에 포함된 모든 유효한 증명에 대해 `base_reward`의 일부를 받습니다. 블록을 증명하는 검증자가 많을수록 블록 제안자의 보상도 커집니다. 또한 슬래싱되어야 할 검증자를 보고하면 슬래싱된 각 검증자에 대해 `유효 잔액 * 1/512`에 해당하는 보상을 받습니다.

[보상 및 페널티에 대한 추가 정보](/developers/docs/consensus-mechanisms/pos/rewards-and-penalties)

## 더 읽어보기 {#further-reading}

- [블록 소개](/developers/docs/blocks/)
- [지분 증명 소개](/developers/docs/consensus-mechanisms/pos/)
- [이더리움 합의 사양](https://github.com/ethereum/consensus-specs)
- [Gasper 소개](/developers/docs/consensus-mechanisms/pos/gasper/)
- [이더리움 업그레이드](https://eth2book.info/)
