---
title: "블록 제안"
description: "지분 증명 이더리움에서 블록이 제안되는 방식에 대한 설명입니다."
lang: ko
---

블록은 블록체인의 기본 단위입니다. 블록은 노드 간에 전달되고, 합의되며, 각 노드의 데이터베이스에 추가되는 개별적인 정보 단위입니다. 이 페이지에서는 블록이 어떻게 생성되는지 설명합니다.

## 전제 조건 {#prerequisites}

블록 제안은 지분 증명(PoS) 프로토콜의 일부입니다. 이 페이지를 이해하는 데 도움을 얻으려면 [지분 증명](/developers/docs/consensus-mechanisms/pos/) 및 [블록 아키텍처](/developers/docs/blocks/)에 대해 읽어보시기를 권장합니다.

## 누가 블록을 생성하나요? {#who-produces-blocks}

검증자 계정이 블록을 제안합니다. 검증자 계정은 실행 클라이언트 및 합의 클라이언트의 일부로 검증자 소프트웨어를 실행하고 예치 컨트랙트에 최소 32 ETH를 예치한 노드 운영자가 관리합니다. 그러나 각 검증자는 가끔씩만 블록을 제안할 책임을 집니다. [이더리움](/)은 슬롯과 에포크 단위로 시간을 측정합니다. 각 슬롯은 12초이며, 32개의 슬롯(6.4분)이 모여 하나의 에포크를 구성합니다. 모든 슬롯은 이더리움에 새로운 블록을 추가할 수 있는 기회입니다.

### 무작위 선택 {#random-selection}

각 슬롯에서 블록을 제안할 단일 검증자가 의사 무작위(pseudo-randomly)로 선택됩니다. 블록체인에는 진정한 무작위성이라는 것이 존재하지 않습니다. 각 노드가 진정으로 무작위인 숫자를 생성한다면 합의에 도달할 수 없기 때문입니다. 대신, 검증자 선택 과정을 예측할 수 없게 만드는 것이 목표입니다. 이더리움에서 무작위성은 블록 제안자의 해시와 매 블록마다 업데이트되는 시드(seed)를 혼합하는 RANDAO라는 알고리즘을 사용하여 달성됩니다. 이 값은 전체 검증자 세트에서 특정 검증자를 선택하는 데 사용됩니다. 특정 종류의 시드 조작을 방지하기 위한 방법으로 검증자 선택은 2 에포크 전에 미리 확정됩니다.

검증자들이 각 슬롯에서 RANDAO에 기여하지만, 전역 RANDAO 값은 에포크당 한 번만 업데이트됩니다. 다음 블록 제안자의 인덱스를 계산하기 위해 RANDAO 값은 슬롯 번호와 혼합되어 각 슬롯에서 고유한 값을 제공합니다. 개별 검증자가 선택될 확률은 단순히 `1/N`(`N` = 전체 활성 검증자 수)가 아닙니다. 대신, 각 검증자의 유효 ETH 잔고에 따라 가중치가 부여됩니다. 최대 유효 잔고는 32 ETH입니다(이는 `balance < 32 ETH`가 `balance == 32 ETH`보다 낮은 가중치를 갖지만, `balance > 32 ETH`가 `balance == 32 ETH`보다 더 높은 가중치를 갖지는 않음을 의미합니다).

각 슬롯에는 단 한 명의 블록 제안자만 선택됩니다. 정상적인 조건에서 단일 블록 생성자는 자신에게 할당된 슬롯에서 단일 블록을 생성하고 배포합니다. 동일한 슬롯에 대해 두 개의 블록을 생성하는 것은 슬래싱 대상이 되는 위반 행위이며, 종종 "이중 서명(equivocation)"으로 알려져 있습니다.

## 블록은 어떻게 생성되나요? {#how-is-a-block-created}

블록 제안자는 로컬에서 실행되는 자체 포크 선택 알고리즘의 관점에 따라 체인의 가장 최근 헤드(head) 위에 구축된 서명된 비콘 블록을 브로드캐스트해야 합니다. 포크 선택 알고리즘은 이전 슬롯에서 남은 대기 중인 증명을 적용한 다음, 기록상 누적된 증명 가중치가 가장 큰 블록을 찾습니다. 해당 블록이 제안자가 생성한 새 블록의 부모가 됩니다.

블록 제안자는 자체 로컬 데이터베이스와 체인에 대한 관점에서 데이터를 수집하여 블록을 생성합니다. 블록의 내용은 아래 스니펫에 나와 있습니다.

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

`randao_reveal` 필드는 블록 제안자가 현재 에포크 번호에 서명하여 생성하는 검증 가능한 무작위 값을 취합니다. `eth1_data`는 예치 머클 트라이의 루트와 새로운 예치를 검증할 수 있게 하는 총 예치 수를 포함하여, 예치 컨트랙트에 대한 블록 제안자의 관점을 나타내는 투표입니다. `graffiti`는 블록에 메시지를 추가하는 데 사용할 수 있는 선택적 필드입니다. `proposer_slashings` 및 `attester_slashings`는 제안자의 체인 관점에 따라 특정 검증자가 슬래싱 대상 위반을 저질렀다는 증명을 포함하는 필드입니다. `deposits`는 블록 제안자가 알고 있는 새로운 검증자 예치 목록이며, `voluntary_exits`는 블록 제안자가 합의 레이어 가십 네트워크에서 들은 종료를 원하는 검증자 목록입니다. `sync_aggregate`는 이전에 동기화 위원회(경량 클라이언트 데이터를 제공하는 검증자의 하위 집합)에 할당되어 데이터 서명에 참여한 검증자를 보여주는 벡터입니다.

`execution_payload`는 트랜잭션에 대한 정보가 실행 클라이언트와 합의 클라이언트 간에 전달될 수 있게 합니다. `execution_payload`는 비콘 블록 내부에 중첩되는 실행 데이터 블록입니다. `execution_payload` 내부의 필드는 엉클(ommer) 블록이 없고 `difficulty` 대신 `prev_randao`가 존재한다는 점을 제외하면 이더리움 황서에 요약된 블록 구조를 반영합니다. 실행 클라이언트는 자체 가십 네트워크에서 들은 트랜잭션의 로컬 풀에 접근할 수 있습니다. 이러한 트랜잭션은 로컬에서 실행되어 사후 상태(post-state)로 알려진 업데이트된 상태 트라이를 생성합니다. 트랜잭션은 `transactions`라는 목록으로 `execution_payload`에 포함되며, 사후 상태는 `state-root` 필드에 제공됩니다.

이 모든 데이터는 비콘 블록에 수집되고, 서명되며, 블록 제안자의 피어에게 브로드캐스트되고, 피어는 이를 다시 자신의 피어에게 전파하는 식으로 진행됩니다.

[블록의 구조](/developers/docs/blocks)에 대해 자세히 알아보세요.

## 블록은 어떻게 되나요? {#what-happens-to-blocks}

블록은 블록 제안자의 로컬 데이터베이스에 추가되고 합의 레이어 가십 네트워크를 통해 피어에게 브로드캐스트됩니다. 검증자가 블록을 수신하면 블록에 올바른 부모가 있는지, 올바른 슬롯에 해당하는지, 제안자 인덱스가 예상된 것인지, RANDAO 공개가 유효한지, 제안자가 슬래싱되지 않았는지 확인하는 등 내부 데이터를 검증합니다. `execution_payload`의 번들이 해제되고, 검증자의 실행 클라이언트는 목록에 있는 트랜잭션을 다시 실행하여 제안된 상태 변경을 확인합니다. 블록이 이 모든 검사를 통과한다고 가정하면, 각 검증자는 해당 블록을 자신의 정규 체인에 추가합니다. 그런 다음 다음 슬롯에서 프로세스가 다시 시작됩니다.

## 블록 보상 {#block-rewards}

블록 제안자는 자신의 작업에 대한 대가를 받습니다. 활성 검증자 수와 그들의 유효 잔고의 함수로 계산되는 `base_reward`가 있습니다. 그런 다음 블록 제안자는 블록에 포함된 모든 유효한 증명에 대해 `base_reward`의 일부를 받습니다. 블록을 증명하는 검증자가 많을수록 블록 제안자의 보상이 커집니다. 또한 슬래싱되어야 할 검증자를 신고하는 것에 대한 보상도 있으며, 이는 슬래싱된 각 검증자에 대해 `1/512 * effective balance`와 같습니다.

[보상 및 페널티에 대해 자세히 알아보기](/developers/docs/consensus-mechanisms/pos/rewards-and-penalties)

## 더 읽어보기 {#further-reading}

- [블록 소개](/developers/docs/blocks/)
- [지분 증명 소개](/developers/docs/consensus-mechanisms/pos/)
- [이더리움 합의 사양](https://github.com/ethereum/consensus-specs)
- [Gasper 소개](/developers/docs/consensus-mechanisms/pos/gasper/)
- [이더리움 업그레이드](https://eth2book.info/)