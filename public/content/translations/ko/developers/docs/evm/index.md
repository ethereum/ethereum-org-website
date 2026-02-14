---
title: "이더리움 가상 머신(EVM)"
description: "이더리움 가상머신 소개 및 상태, 트랜잭션, 그리고 스마트 계약과의 관련성"
lang: ko
---

이더리움 가상머신(EVM)은 모든 이더리움 노드에서 코드를 일관되고 안전하게 실행하는 탈중앙화된 가상 환경입니다. 노드는 EVM을 실행하여 스마트 계약을 실행하고, "[가스](/developers/docs/gas/)"를 사용하여 [연산](/developers/docs/evm/opcodes/)에 필요한 연산량을 측정하며 효율적인 리소스 할당과 네트워크 보안을 보장합니다.

## 필수 구성 요소 {#prerequisites}

EVM을 이해하려면 [바이트](https://wikipedia.org/wiki/Byte), [메모리](https://wikipedia.org/wiki/Computer_memory), [스택](https://wikipedia.org/wiki/Stack_\(abstract_data_type\))과 같은 컴퓨터 과학의 일반적인 용어에 대한 기본적인 지식이 필요합니다. 또한 [해시 함수](https://wikipedia.org/wiki/Cryptographic_hash_function) 및 [머클 트리](https://wikipedia.org/wiki/Merkle_tree)와 같은 암호학/블록체인 개념에 익숙하면 도움이 됩니다.

## 원장에서 상태 머신으로 {#from-ledger-to-state-machine}

'분산 원장'의 유사함은 암호학의 기본 도구들을 사용해서 분산 화폐를 가능하게 하는 비트코인과 같은 블록체인을 설명하는데 자주 사용된다. 원장은 누군가가 원장을 수정하기 위해 할 수 있는 것과 할 수 없는 것을 지배하는 일련의 규칙을 준수해야 하는 활동 기록을 유지한다. 예를 들어 하나의 비트코인 주소는 그 주소가 이전에 받은 것보다 더 많은 비트코인을 쓸 수 없다. 이런 규칙은 비트코인과 다른 많은 블록체인 상의 모든 트랜잭션의 근간이다.

이더리움은 거의 동일하고 직관적인 규칙을 따르는 자체 네이티브 암호화폐(이더)를 가지고 있지만, [스마트 계약](/developers/docs/smart-contracts/)이라는 훨씬 더 강력한 기능도 지원합니다. 이 더 복잡한 기능을 위해서, 더 정교한 설명이 필요하다. 이더리움은 분산 원장이 아니라 분산 [상태 머신](https://wikipedia.org/wiki/Finite-state_machine)입니다. 이더리움의 상태는 모든 계정과 잔고뿐만 아니라 사전 정의된 규칙에 따라 블록마다 변경될 수 있고, 임의의 머신 코드를 실행할 수 있는 _머신 상태_까지 포함하는 거대한 자료 구조입니다. 블록에서 블록으로의 상태 변화에 대한 자세한 규칙은 EVM에 의해 정의된다.

![EVM의 구성을 보여주는 다이어그램](./evm.png)
_[Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)에서 발췌한 다이어그램_

## 이더리움 상태 전환 함수 {#the-ethereum-state-transition-function}

EVM은 하나의 입력으로 하나의 결정된 출력을 생성하는 수학 함수처럼 동작한다. 따라서 이더리움을 **상태 전환 함수**를 갖는 것으로 보다 공식적으로 설명하는 것이 매우 유용합니다.

```
Y(S, T)= S'
```

이전 유효 상태 `(S)`와 새로운 유효 거래 집합 `(T)`이 주어지면 이더리움 상태 전환 함수 `Y(S, T)`는 새로운 유효 출력 상태 `S'`를 생성합니다.

### 상태 {#state}

이더리움의 맥락에서 상태는 [수정된 머클 패트리샤 트리](/developers/docs/data-structures-and-encoding/patricia-merkle-trie/)라고 불리는 거대한 자료 구조로, 이는 해시로 연결된 모든 [계정](/developers/docs/accounts/)을 유지하며 블록체인에 저장된 단일 루트 해시로 축소될 수 있습니다.

### 트랜잭션 {#transactions}

트랜잭션은 계정으로부터 암호학적으로 서명된 명령들이다. 트랜잭션은 두가지 종류가 있다. 메시지 콜을 만드는 것들, 그리고 컨트랙트를 생성하는 것들.

계약 생성 시 컴파일된 [스마트 계약](/developers/docs/smart-contracts/anatomy/) 바이트코드가 포함된 새로운 계약 계정이 생성됩니다. 다른 게정이 그 컨트랙트로 메세지 콜을 보낼 때 마다, 그 바이트코드를 실행한다.

## EVM 명령 {#evm-instructions}

EVM은 1024개 항목의 깊이를 가진 [스택 머신](https://wikipedia.org/wiki/Stack_machine)으로 실행됩니다. 각 항목은 256비트 단어로 256비트 암호학(예: Keccak-256 해시 또는 secp256k1 서명)에서 사용하기 쉽도록 선택되었다.

실행 중에 EVM은 트랜잭션 간에 유지되지 않는 일시적인 _메모리_(워드 주소 지정 바이트 배열)를 유지합니다.

### 임시 저장 공간

임시 저장 공간은 `TSTORE` 및 `TLOAD` 연산 부호를 통해 액세스되는 트랜잭션별 키-값 저장소입니다. 동일한 트랜잭션 동안 모든 내부 호출에서 유지되지만, 트랜잭션이 끝나면 삭제됩니다. 메모리와 달리, 임시 저장 공간은 실행 프레임이 아닌 EVM 상태의 일부로 모델링되지만, 전역 상태에는 커밋되지 않습니다. 임시 저장 공간은 트랜잭션 중 내부 호출 간에 가스 효율적인 임시 상태 공유를 가능하게 합니다.

### 스토리지

계약에는 해당 계정과 연결되어 있고 전역 상태의 일부인 머클 패트리샤 _저장 공간_ 트리(워드 주소 지정 워드 배열)가 포함됩니다. 이 영구 저장 공간은 단일 트랜잭션 기간 동안에만 사용할 수 있고 계정의 영구 저장 공간 트리의 일부를 구성하지 않는 임시 저장 공간과 다릅니다.

### 연산 부호

컴파일된 스마트 계약 바이트코드는 `XOR`, `AND`, `ADD`, `SUB` 등과 같은 표준 스택 연산을 수행하는 다수의 EVM [연산 부호](/developers/docs/evm/opcodes)로 실행됩니다. EVM은 또한 `ADDRESS`, `BALANCE`, `BLOCKHASH` 등과 같은 여러 블록체인별 스택 연산도 구현합니다. 연산 부호 집합에는 임시 저장 공간에 대한 액세스를 제공하는 `TSTORE` 및 `TLOAD`도 포함됩니다.

![EVM 연산에 가스가 필요한 위치를 보여주는 다이어그램](../gas/gas.png)
_[Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)에서 발췌한 다이어그램_

## EVM 구현 {#evm-implementations}

EVM의 모든 구현은 이더리움 옐로우 페이퍼에 설명된 스펙을 준수해야한다.

이더리움의 10년 역사 동안 EVM은 여러 차례 개정되었으며, 다양한 프로그래밍 언어로 된 여러 EVM 구현이 있습니다.

[이더리움 실행 클라이언트](/developers/docs/nodes-and-clients/#execution-clients)에는 EVM 구현이 포함됩니다. 게다가 다음을 포함하는 여러 자체 구동 구현물이 있다.

- [Py-EVM](https://github.com/ethereum/py-evm) - _Python_
- [evmone](https://github.com/ethereum/evmone) - _C++_
- [ethereumjs-vm](https://github.com/ethereumjs/ethereumjs-vm) - _JavaScript_
- [revm](https://github.com/bluealloy/revm) - _Rust_

## 추가 정보 {#further-reading}

- [이더리움 황서(Yellowpaper)](https://ethereum.github.io/yellowpaper/paper.pdf)
- [Jellopaper, 일명 KEVM: K의 EVM 시맨틱](https://jellopaper.org/)
- [Beigepaper](https://github.com/chronaeon/beigepaper)
- [이더리움 가상 머신 연산 부호](https://www.ethervm.io/)
- [이더리움 가상 머신 연산 부호 대화형 레퍼런스](https://www.evm.codes/)
- [Solidity 개발문서의 간단한 소개](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#index-6)
- [마스터링 이더리움 - 이더리움 가상 머신](https://github.com/ethereumbook/ethereumbook/blob/openedition/13evm.asciidoc)

## 관련 주제 {#related-topics}

- [가스](/developers/docs/gas/)
