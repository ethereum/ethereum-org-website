---
title: 이더리움 가상 머신(EVM)
description: 이더리움 가상 머신에 대한 소개 및 상태, 트랜잭션, 스마트 컨트랙트와의 관계.
lang: ko
---

이더리움 가상 머신(EVM)은 모든 [이더리움](/) 노드에서 일관되고 안전하게 코드를 실행하는 탈중앙화된 가상 환경입니다. 노드는 EVM을 실행하여 스마트 컨트랙트를 실행하며, [작업](/developers/docs/evm/opcodes/)에 필요한 컴퓨팅 노력을 측정하기 위해 "[가스](/developers/docs/gas/)"를 사용하여 효율적인 리소스 할당과 네트워크 보안을 보장합니다.

## 전제 조건 {#prerequisites}

EVM을 이해하려면 [바이트](https://wikipedia.org/wiki/Byte), [메모리](https://wikipedia.org/wiki/Computer_memory), [스택](<https://wikipedia.org/wiki/Stack_(abstract_data_type)>)과 같은 컴퓨터 과학의 일반적인 용어에 대한 기본적인 지식이 필요합니다. 또한 [해시 함수](https://wikipedia.org/wiki/Cryptographic_hash_function) 및 [머클 트리](https://wikipedia.org/wiki/Merkle_tree)와 같은 암호학/블록체인 개념에 익숙하면 도움이 됩니다.

## 원장에서 상태 머신으로 {#from-ledger-to-state-machine}

'분산 원장'이라는 비유는 암호학의 기본 도구를 사용하여 탈중앙화된 통화를 가능하게 하는 비트코인과 같은 블록체인을 설명하는 데 자주 사용됩니다. 원장은 누군가가 원장을 수정하기 위해 할 수 있는 일과 할 수 없는 일을 규정하는 일련의 규칙을 준수해야 하는 활동 기록을 유지합니다. 예를 들어, 비트코인 주소는 이전에 받은 것보다 더 많은 비트코인을 사용할 수 없습니다. 이러한 규칙은 비트코인 및 기타 여러 블록체인의 모든 트랜잭션을 뒷받침합니다.

이더리움에는 거의 동일한 직관적인 규칙을 따르는 자체 기본 암호화폐(이더)가 있지만, 훨씬 더 강력한 기능인 [스마트 컨트랙트](/developers/docs/smart-contracts/)도 가능하게 합니다. 이 더 복잡한 기능을 설명하려면 더 정교한 비유가 필요합니다. 분산 원장 대신, 이더리움은 분산 [상태 머신](https://wikipedia.org/wiki/Finite-state_machine)입니다. 이더리움의 상태는 모든 계정과 잔액뿐만 아니라, 미리 정의된 규칙 세트에 따라 블록마다 변경될 수 있고 임의의 기계 코드를 실행할 수 있는 _머신 상태(machine state)_를 보유하는 대규모 데이터 구조입니다. 블록마다 상태를 변경하는 구체적인 규칙은 EVM에 의해 정의됩니다.

![A diagram showing the make up of the EVM](./evm.png)
_다이어그램 출처: [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## 이더리움 상태 전환 함수 {#the-ethereum-state-transition-function}

EVM은 수학 함수처럼 작동합니다. 입력이 주어지면 결정론적 출력을 생성합니다. 따라서 이더리움이 **상태 전환 함수**를 가지고 있다고 더 공식적으로 설명하는 것이 매우 도움이 됩니다.

```
Y(S, T)= S'
```

유효한 이전 상태 `(S)`와 유효한 트랜잭션의 새로운 세트 `(T)`가 주어지면, 이더리움 상태 전환 함수 `Y(S, T)`는 새로운 유효한 출력 상태 `S'`를 생성합니다.

### 상태 {#state}

이더리움의 맥락에서 상태는 [수정된 머클 패트리샤 트라이](/developers/docs/data-structures-and-encoding/patricia-merkle-trie/)라는 거대한 데이터 구조로, 모든 [계정](/developers/docs/accounts/)을 해시로 연결하고 블록체인에 저장된 단일 루트 해시로 축소할 수 있도록 유지합니다.

### 트랜잭션 {#transactions}

트랜잭션은 계정에서 암호학적으로 서명된 명령입니다. 트랜잭션에는 메시지 호출을 초래하는 트랜잭션과 컨트랙트 생성을 초래하는 트랜잭션의 두 가지 유형이 있습니다.

컨트랙트 생성은 컴파일된 [스마트 컨트랙트](/developers/docs/smart-contracts/anatomy/) 바이트코드를 포함하는 새로운 컨트랙트 계정의 생성으로 이어집니다. 다른 계정이 해당 컨트랙트에 메시지 호출을 할 때마다, 그 바이트코드가 실행됩니다.

## EVM 명령어 {#evm-instructions}

EVM은 1024개 항목의 깊이를 가진 [스택 머신](https://wikipedia.org/wiki/Stack_machine)으로 실행됩니다. 각 항목은 256비트 단어(word)이며, 이는 256비트 암호학(예: 케착-256 해시 또는 secp256k1 서명)과 쉽게 사용할 수 있도록 선택되었습니다.

실행 중에 EVM은 트랜잭션 간에 유지되지 않는 일시적인 _메모리_(단어 주소 지정 바이트 배열 형태)를 유지합니다.

### 임시 스토리지 {#transient-storage}

임시 스토리지는 `TSTORE` 및 `TLOAD` 연산 코드를 통해 접근하는 트랜잭션별 키-값 저장소입니다. 동일한 트랜잭션 동안 모든 내부 호출에 걸쳐 유지되지만 트랜잭션이 끝나면 지워집니다. 메모리와 달리 임시 스토리지는 실행 프레임이 아닌 EVM 상태의 일부로 모델링되지만, 전역 상태에 커밋되지는 않습니다. 임시 스토리지는 트랜잭션 중 내부 호출 간에 가스 효율적인 임시 상태 공유를 가능하게 합니다.

### 스토리지 {#storage}

컨트랙트에는 해당 계정과 연결되고 전역 상태의 일부인 머클 패트리샤 _스토리지_ 트라이(단어 주소 지정 단어 배열 형태)가 포함되어 있습니다. 이 영구 스토리지는 단일 트랜잭션 기간 동안만 사용할 수 있고 계정의 영구 스토리지 트라이의 일부를 구성하지 않는 임시 스토리지와 다릅니다.

### 연산 코드 {#opcodes}

컴파일된 스마트 컨트랙트 바이트코드는 `XOR`, `AND`, `ADD`, `SUB` 등과 같은 표준 스택 작업을 수행하는 여러 EVM [연산 코드](/developers/docs/evm/opcodes)로 실행됩니다. EVM은 또한 `ADDRESS`, `BALANCE`, `BLOCKHASH` 등과 같은 여러 블록체인 전용 스택 작업도 구현합니다. 연산 코드 세트에는 임시 스토리지에 대한 접근을 제공하는 `TSTORE` 및 `TLOAD`도 포함되어 있습니다.

![A diagram showing where gas is needed for EVM operations](../gas/gas.png)
_다이어그램 출처: [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## EVM 구현 {#evm-implementations}

EVM의 모든 구현은 이더리움 황서에 설명된 사양을 준수해야 합니다.

이더리움의 10년 역사 동안 EVM은 여러 차례 개정되었으며, 다양한 프로그래밍 언어로 된 여러 EVM 구현이 존재합니다.

[이더리움 실행 클라이언트](/developers/docs/nodes-and-clients/#execution-clients)에는 EVM 구현이 포함되어 있습니다. 또한 다음과 같은 여러 독립형 구현도 있습니다.

- [Py-EVM](https://github.com/ethereum/py-evm) - _Python_
- [evmone](https://github.com/ethereum/evmone) - _C++_
- [ethereumjs-vm](https://github.com/ethereumjs/ethereumjs-vm) - _JavaScript_
- [revm](https://github.com/bluealloy/revm) - _Rust_

## 더 읽을거리 {#further-reading}

- [이더리움 황서](https://ethereum.github.io/yellowpaper/paper.pdf)
- [젤로페이퍼(Jellopaper) 일명 KEVM: K에서의 EVM 의미론](https://jellopaper.org/)
- [베이지페이퍼(The Beigepaper)](https://github.com/chronaeon/beigepaper)
- [이더리움 가상 머신 연산 코드](https://www.ethervm.io/)
- [이더리움 가상 머신 연산 코드 대화형 레퍼런스](https://www.evm.codes/)
- [Solidity 문서의 짧은 소개](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#index-6)
- [마스터링 이더리움 - 이더리움 가상 머신](https://github.com/ethereumbook/ethereumbook/blob/openedition/13evm.asciidoc)

## 관련 주제 {#related-topics}

- [가스](/developers/docs/gas/)

## 튜토리얼: 이더리움 가상 머신(EVM) / 이더리움 연산 코드 {#tutorials}

- [황서의 EVM 사양 이해하기](/developers/tutorials/yellow-paper-evm/) _– 이더리움 황서의 공식 EVM 사양에 대한 가이드._
- [컨트랙트 리버스 엔지니어링](/developers/tutorials/reverse-engineering-a-contract/) _– EVM 연산 코드를 사용하여 컴파일된 스마트 컨트랙트를 리버스 엔지니어링하는 방법._