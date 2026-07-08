---
title: "컨트랙트 리버스 엔지니어링"
description: "소스 코드가 없을 때 컨트랙트를 이해하는 방법"
author: "오리 포메란츠"
lang: ko
tags: ["evm", "연산 코드"]
skill: advanced
breadcrumb: "리버스 엔지니어링"
published: 2021-12-30
---
## 소개 {#introduction}

_블록체인에는 비밀이 없습니다._ 일어나는 모든 일은 일관되고 검증 가능하며 공개적으로 접근할 수 있습니다. 이상적으로는 [컨트랙트의 소스 코드가 Etherscan에 게시되고 검증되어야 합니다](https://etherscan.io/address/0xb8901acb165ed027e32754e0ffe830802919727f#code). 하지만 [항상 그런 것은 아닙니다](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f#code). 이 글에서는 소스 코드가 없는 컨트랙트인 [`0x2510c039cc3b061d79e564b38836da87e31b342f`](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f)를 살펴보며 컨트랙트를 리버스 엔지니어링하는 방법을 배웁니다.

리버스 컴파일러가 존재하지만, 항상 [사용 가능한 결과](https://etherscan.io/bytecode-decompiler?a=0x2510c039cc3b061d79e564b38836da87e31b342f)를 생성하는 것은 아닙니다. 이 글에서는 [연산 코드](https://github.com/wolflo/evm-opcodes)를 통해 수동으로 컨트랙트를 리버스 엔지니어링하고 이해하는 방법과 디컴파일러의 결과를 해석하는 방법을 배웁니다.

이 글을 이해하려면 EVM의 기본 사항을 이미 알고 있어야 하며, EVM 어셈블러에 어느 정도 익숙해야 합니다. [이러한 주제에 대해서는 여기에서 읽어볼 수 있습니다](https://medium.com/mycrypto/the-ethereum-virtual-machine-how-does-it-work-9abac2b7c9e).

## 실행 가능한 코드 준비하기 {#prepare-the-executable-code}

해당 컨트랙트의 Etherscan으로 이동하여 **Contract** 탭을 클릭한 다음 <strong>Switch to Opcodes View</strong>를 클릭하면 연산 코드를 얻을 수 있습니다. 한 줄에 하나의 연산 코드가 표시되는 화면을 볼 수 있습니다.

![Opcode View from Etherscan](opcode-view.png)

하지만 점프(jump)를 이해하려면 각 연산 코드가 코드의 어느 위치에 있는지 알아야 합니다. 이를 위한 한 가지 방법은 Google 스프레드시트를 열고 C열에 연산 코드를 붙여넣는 것입니다. [이미 준비된 이 스프레드시트의 사본을 만들어 다음 단계를 건너뛸 수 있습니다](https://docs.google.com/spreadsheets/d/1tKmTJiNjUwHbW64wCKOSJxHjmh0bAUapt6btUYE7kDA/edit?usp=sharing).

다음 단계는 점프를 이해할 수 있도록 정확한 코드 위치를 파악하는 것입니다. B열에는 연산 코드의 크기를, A열에는 위치(16진수)를 입력합니다. `B1` 셀에 이 함수를 입력한 다음, 코드 끝까지 B열의 나머지 부분에 복사하여 붙여넣습니다. 이 작업을 완료한 후 B열을 숨길 수 있습니다.

```
=1+IF(REGEXMATCH(C1,"PUSH"),REGEXEXTRACT(C1,"PUSH(\d+)"),0)
```

먼저 이 함수는 연산 코드 자체에 대해 1바이트를 더한 다음, `PUSH`를 찾습니다. Push 연산 코드는 푸시되는 값에 대한 추가 바이트가 필요하기 때문에 특별합니다. 연산 코드가 `PUSH`인 경우, 바이트 수를 추출하여 더합니다.

`A1`에 첫 번째 오프셋인 0을 입력합니다. 그런 다음 `A2`에 이 함수를 입력하고 A열의 나머지 부분에 다시 복사하여 붙여넣습니다.

```
=dec2hex(hex2dec(A1)+B1)
```

점프 이전에 푸시되는 값(`JUMP` 및 `JUMPI`)이 16진수로 제공되므로, 16진수 값을 반환하는 이 함수가 필요합니다.

## 진입점 (0x00) {#the-entry-point-0x00}

컨트랙트는 항상 첫 번째 바이트부터 실행됩니다. 다음은 코드의 초기 부분입니다.

| 오프셋 | 연산 코드    | 스택 (연산 코드 이후) |
| -----: | ------------ | ------------------------ |
|      0 | PUSH1 0x80   | 0x80                     |
|      2 | PUSH1 0x40   | 0x40, 0x80               |
|      4 | MSTORE       | 비어 있음                |
|      5 | PUSH1 0x04   | 0x04                     |
|      7 | CALLDATASIZE | CALLDATASIZE 0x04        |
|      8 | LT           | CALLDATASIZE\<4           |
|      9 | PUSH2 0x005e | 0x5E CALLDATASIZE\<4      |
|      C | JUMPI        | 비어 있음                |

이 코드는 두 가지 작업을 수행합니다.

1. 메모리 위치 0x40-0x5F에 0x80을 32바이트 값으로 씁니다(0x80은 0x5F에 저장되고, 0x40-0x5E는 모두 0입니다).
2. 콜 데이터 크기를 읽습니다. 일반적으로 이더리움 컨트랙트의 콜 데이터는 함수 선택자를 위해 최소 4바이트가 필요한 [ABI(애플리케이션 바이너리 인터페이스)](https://docs.soliditylang.org/en/v0.8.10/abi-spec.html)를 따릅니다. 콜 데이터 크기가 4보다 작으면 0x5E로 점프합니다.

![Flowchart for this portion](flowchart-entry.png)

### 0x5E의 핸들러 (비 ABI 콜 데이터용) {#the-handler-at-0x5e-for-non-abi-call-data}

| 오프셋 | 연산 코드    |
| -----: | ------------ |
|     5E | JUMPDEST     |
|     5F | CALLDATASIZE |
|     60 | PUSH2 0x007c |
|     63 | JUMPI        |

이 스니펫은 `JUMPDEST`로 시작합니다. EVM(이더리움 가상 머신) 프로그램은 `JUMPDEST`가 아닌 연산 코드로 점프하면 예외를 발생시킵니다. 그런 다음 CALLDATASIZE를 확인하고, "참"이면(즉, 0이 아니면) 0x7C로 점프합니다. 이에 대해서는 아래에서 다루겠습니다.

| 오프셋 | 연산 코드  | 스택 (연산 코드 이후)                                                      |
| -----: | ---------- | -------------------------------------------------------------------------- |
|     64 | CALLVALUE  | 호출에서 제공된 [Wei](/glossary/#wei). Solidity에서는 `msg.value`라고 부릅니다. |
|     65 | PUSH1 0x06 | 6 CALLVALUE                                                                |
|     67 | PUSH1 0x00 | 0 6 CALLVALUE                                                              |
|     69 | DUP3       | CALLVALUE 0 6 CALLVALUE                                                    |
|     6A | DUP3       | 6 CALLVALUE 0 6 CALLVALUE                                                  |
|     6B | SLOAD      | Storage[6] CALLVALUE 0 6 CALLVALUE                                         |

따라서 콜 데이터가 없을 때 Storage[6]의 값을 읽습니다. 이 값이 무엇인지 아직 모르지만, 콜 데이터 없이 컨트랙트가 수신한 트랜잭션을 찾아볼 수 있습니다. 콜 데이터 없이(따라서 메서드 없이) ETH만 전송하는 트랜잭션은 Etherscan에서 `Transfer` 메서드를 가집니다. 실제로 [컨트랙트가 수신한 첫 번째 트랜잭션](https://etherscan.io/tx/0xeec75287a583c36bcc7ca87685ab41603494516a0f5986d18de96c8e630762e7)은 전송입니다.

해당 트랜잭션을 살펴보고 <strong>Click to see More</strong>를 클릭하면, 입력 데이터라고 불리는 콜 데이터가 실제로 비어 있는 것(`0x`)을 볼 수 있습니다. 또한 값이 1.559 ETH라는 점에 주목하세요. 이는 나중에 관련이 있을 것입니다.

![The call data is empty](calldata-empty.png)

다음으로 **State** 탭을 클릭하고 우리가 리버스 엔지니어링 중인 컨트랙트(0x2510...)를 확장합니다. 트랜잭션 중에 `Storage[6]`가 변경된 것을 볼 수 있으며, Hex를 <strong>Number</strong>로 변경하면 다음 컨트랙트 값에 해당하는 전송된 wei 값인 1,559,000,000,000,000,000(명확성을 위해 쉼표를 추가했습니다)이 된 것을 볼 수 있습니다.

![Storage[6]의 변경 사항](storage6.png)

[같은 기간의 다른 `Transfer` 트랜잭션](https://etherscan.io/tx/0xf708d306de39c422472f43cb975d97b66fd5d6a6863db627067167cbf93d84d1#statechange)으로 인한 상태 변경 사항을 살펴보면, `Storage[6]`가 한동안 컨트랙트의 값을 추적했음을 알 수 있습니다. 지금은 이를 `Value*`라고 부르겠습니다. 별표(`*`)는 이 변수가 무엇을 하는지 아직 <em>모른다</em>는 것을 상기시켜 주지만, `ADDRESS BALANCE`를 사용하여 계정 잔액을 얻을 수 있는데 매우 비싼 스토리지를 사용할 필요가 없으므로 단순히 컨트랙트 값을 추적하기 위한 것일 수는 없습니다. 첫 번째 연산 코드는 컨트랙트 자신의 주소를 푸시합니다. 두 번째 연산 코드는 스택 맨 위에 있는 주소를 읽고 해당 주소의 잔액으로 바꿉니다.

| 오프셋 | 연산 코드    | 스택                                        |
| -----: | ------------ | ------------------------------------------- |
|     6C | PUSH2 0x0075 | 0x75 Value\* CALLVALUE 0 6 CALLVALUE        |
|     6F | SWAP2        | CALLVALUE Value\* 0x75 0 6 CALLVALUE        |
|     70 | SWAP1        | Value\* CALLVALUE 0x75 0 6 CALLVALUE        |
|     71 | PUSH2 0x01a7 | 0x01A7 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|     74 | JUMP         |

점프 목적지에서 이 코드를 계속 추적하겠습니다.

| 오프셋 | 연산 코드  | 스택                                                        |
| -----: | ---------- | ----------------------------------------------------------- |
|    1A7 | JUMPDEST   | Value\* CALLVALUE 0x75 0 6 CALLVALUE                        |
|    1A8 | PUSH1 0x00 | 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE                   |
|    1AA | DUP3       | CALLVALUE 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE         |
|    1AB | NOT        | 2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |

`NOT`는 비트 단위 연산이므로 콜 값의 모든 비트 값을 반전시킵니다.

| 오프셋 | 연산 코드    | 스택                                                                        |
| -----: | ------------ | --------------------------------------------------------------------------- |
|    1AC | DUP3         | Value\* 2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE         |
|    1AD | GT           | Value\*>2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE         |
|    1AE | ISZERO       | Value\*\<=2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE        |
|    1AF | PUSH2 0x01df | 0x01DF Value\*\<=2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|    1B2 | JUMPI        |

`Value*`가 2^256-CALLVALUE-1보다 작거나 같으면 점프합니다. 이는 오버플로를 방지하기 위한 로직으로 보입니다. 실제로 오프셋 0x01DE에서 몇 가지 무의미한 작업(예: 삭제될 예정인 메모리에 쓰기)을 수행한 후 오버플로가 감지되면 컨트랙트가 되돌리기를 수행하는 것을 볼 수 있으며, 이는 정상적인 동작입니다.

이러한 오버플로가 발생할 가능성은 극히 낮습니다. 콜 값과 `Value*`를 더한 값이 2^256 wei, 즉 약 10^59 ETH에 필적해야 하기 때문입니다. [작성 당시 총 ETH 공급량은 2억 개 미만입니다](https://etherscan.io/stat/supply).

| 오프셋 | 연산 코드 | 스택                                      |
| -----: | -------- | ----------------------------------------- |
|    1DF | JUMPDEST | 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|    1E0 | POP      | Value\* CALLVALUE 0x75 0 6 CALLVALUE      |
|    1E1 | ADD      | Value\*+CALLVALUE 0x75 0 6 CALLVALUE      |
|    1E2 | SWAP1    | 0x75 Value\*+CALLVALUE 0 6 CALLVALUE      |
|    1E3 | JUMP     |

여기에 도달하면 `Value* + CALLVALUE`를 얻고 오프셋 0x75로 점프합니다.

| 오프셋 | 연산 코드 | 스택                            |
| -----: | -------- | ------------------------------- |
|     75 | JUMPDEST | Value\*+CALLVALUE 0 6 CALLVALUE |
|     76 | SWAP1    | 0 Value\*+CALLVALUE 6 CALLVALUE |
|     77 | SWAP2    | 6 Value\*+CALLVALUE 0 CALLVALUE |
|     78 | SSTORE   | 0 CALLVALUE                     |

여기에 도달하면(콜 데이터가 비어 있어야 함) `Value*`에 콜 값을 더합니다. 이는 우리가 `Transfer` 트랜잭션이 수행한다고 말한 것과 일치합니다.

| 오프셋 | 연산 코드 |
| -----: | ------ |
|     79 | POP    |
|     7A | POP    |
|     7B | STOP   |

마지막으로 스택을 지우고(필요하지는 않음) 트랜잭션이 성공적으로 종료되었음을 알립니다.

요약하자면, 다음은 초기 코드에 대한 순서도입니다.

![Entry point flowchart](flowchart-entry.png)

## 0x7C의 핸들러 {#the-handler-at-0x7c}

이 핸들러가 무슨 역할을 하는지 의도적으로 제목에 적지 않았습니다. 이 글의 목적은 이 특정 컨트랙트가 어떻게 작동하는지 가르치는 것이 아니라, 컨트랙트를 리버스 엔지니어링하는 방법을 알려드리는 것입니다. 제가 했던 방식과 동일하게 코드를 따라가며 그 역할을 배우게 될 것입니다.

우리는 여러 곳에서 이곳으로 도달합니다:

- 1, 2, 또는 3바이트의 콜 데이터가 있는 경우(오프셋 0x63에서)
- 메서드 서명을 알 수 없는 경우(오프셋 0x42 및 0x5D에서)

| Offset | Opcode       | Stack                |
| -----: | ------------ | -------------------- |
|     7C | JUMPDEST     |
|     7D | PUSH1 0x00   | 0x00                 |
|     7F | PUSH2 0x009d | 0x9D 0x00            |
|     82 | PUSH1 0x03   | 0x03 0x9D 0x00       |
|     84 | SLOAD        | Storage[3] 0x9D 0x00 |

이것은 또 다른 스토리지 셀로, 어떤 트랜잭션에서도 찾을 수 없었기 때문에 그 의미를 파악하기가 더 어렵습니다. 아래 코드를 보면 더 명확해질 것입니다.

| Offset | Opcode                                            | Stack                           |
| -----: | ------------------------------------------------- | ------------------------------- |
|     85 | PUSH20 0xffffffffffffffffffffffffffffffffffffffff | 0xff....ff Storage[3] 0x9D 0x00 |
|     9A | AND                                               | Storage[3]-as-address 0x9D 0x00 |

이 연산 코드들은 Storage[3]에서 읽은 값을 이더리움 주소의 길이인 160비트로 자릅니다.

| Offset | Opcode | Stack                           |
| -----: | ------ | ------------------------------- |
|     9B | SWAP1  | 0x9D Storage[3]-as-address 0x00 |
|     9C | JUMP   | Storage[3]-as-address 0x00      |

다음 연산 코드로 이동하기 때문에 이 점프는 불필요합니다. 이 코드는 가능한 만큼 가스 효율적이지 않습니다.

| Offset | Opcode     | Stack                           |
| -----: | ---------- | ------------------------------- |
|     9D | JUMPDEST   | Storage[3]-as-address 0x00      |
|     9E | SWAP1      | 0x00 Storage[3]-as-address      |
|     9F | POP        | Storage[3]-as-address           |
|     A0 | PUSH1 0x40 | 0x40 Storage[3]-as-address      |
|     A2 | MLOAD      | Mem[0x40] Storage[3]-as-address |

코드의 맨 처음 부분에서 Mem[0x40]을 0x80으로 설정했습니다. 나중에 0x40을 찾아보면 변경되지 않았음을 알 수 있으므로, 0x80이라고 가정할 수 있습니다.

| Offset | Opcode       | Stack                                             |
| -----: | ------------ | ------------------------------------------------- |
|     A3 | CALLDATASIZE | CALLDATASIZE 0x80 Storage[3]-as-address           |
|     A4 | PUSH1 0x00   | 0x00 CALLDATASIZE 0x80 Storage[3]-as-address      |
|     A6 | DUP3         | 0x80 0x00 CALLDATASIZE 0x80 Storage[3]-as-address |
|     A7 | CALLDATACOPY | 0x80 Storage[3]-as-address                        |

0x80부터 시작하여 모든 콜 데이터를 메모리에 복사합니다.

| Offset | Opcode        | Stack                                                                            |
| -----: | ------------- | -------------------------------------------------------------------------------- |
|     A8 | PUSH1 0x00    | 0x00 0x80 Storage[3]-as-address                                                  |
|     AA | DUP1          | 0x00 0x00 0x80 Storage[3]-as-address                                             |
|     AB | CALLDATASIZE  | CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address                                |
|     AC | DUP4          | 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address                           |
|     AD | DUP6          | Storage[3]-as-address 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address     |
|     AE | GAS           | GAS Storage[3]-as-address 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address |
|     AF | DELEGATE_CALL |

이제 상황이 훨씬 명확해졌습니다. 이 컨트랙트는 [프록시](https://blog.openzeppelin.com/proxy-patterns/) 역할을 하여, 실제 작업을 수행하기 위해 Storage[3]에 있는 주소를 호출할 수 있습니다. `DELEGATE_CALL`는 별도의 컨트랙트를 호출하지만 동일한 스토리지에 머뭅니다. 이는 위임된 컨트랙트, 즉 우리가 프록시 역할을 하는 컨트랙트가 동일한 스토리지 공간에 접근한다는 것을 의미합니다. 호출을 위한 매개변수는 다음과 같습니다:

- _가스(Gas)_: 남은 모든 가스
- _호출된 주소(Called address)_: Storage[3]-as-address
- _콜 데이터(Call data)_: 0x80에서 시작하는 CALLDATASIZE 바이트로, 원래의 콜 데이터를 넣은 위치입니다.
- _반환 데이터(Return data)_: 없음 (0x00 - 0x00) 반환 데이터는 다른 방법으로 얻을 것입니다(아래 참조).

| Offset | Opcode         | Stack                                                                                         |
| -----: | -------------- | --------------------------------------------------------------------------------------------- |
|     B0 | RETURNDATASIZE | RETURNDATASIZE (((호출 성공/실패))) 0x80 Storage[3]-as-address                          |
|     B1 | DUP1           | RETURNDATASIZE RETURNDATASIZE (((호출 성공/실패))) 0x80 Storage[3]-as-address           |
|     B2 | PUSH1 0x00     | 0x00 RETURNDATASIZE RETURNDATASIZE (((호출 성공/실패))) 0x80 Storage[3]-as-address      |
|     B4 | DUP5           | 0x80 0x00 RETURNDATASIZE RETURNDATASIZE (((호출 성공/실패))) 0x80 Storage[3]-as-address |
|     B5 | RETURNDATACOPY | RETURNDATASIZE (((호출 성공/실패))) 0x80 Storage[3]-as-address                          |

여기서 모든 반환 데이터를 0x80에서 시작하는 메모리 버퍼에 복사합니다.

| Offset | Opcode       | Stack                                                                                                                        |
| -----: | ------------ | ---------------------------------------------------------------------------------------------------------------------------- |
|     B6 | DUP2         | (((호출 성공/실패))) RETURNDATASIZE (((호출 성공/실패))) 0x80 Storage[3]-as-address                              |
|     B7 | DUP1         | (((호출 성공/실패))) (((호출 성공/실패))) RETURNDATASIZE (((호출 성공/실패))) 0x80 Storage[3]-as-address   |
|     B8 | ISZERO       | (((호출이 실패했는가))) (((호출 성공/실패))) RETURNDATASIZE (((호출 성공/실패))) 0x80 Storage[3]-as-address      |
|     B9 | PUSH2 0x00c0 | 0xC0 (((호출이 실패했는가))) (((호출 성공/실패))) RETURNDATASIZE (((호출 성공/실패))) 0x80 Storage[3]-as-address |
|     BC | JUMPI        | (((호출 성공/실패))) RETURNDATASIZE (((호출 성공/실패))) 0x80 Storage[3]-as-address                              |
|     BD | DUP2         | RETURNDATASIZE (((호출 성공/실패))) RETURNDATASIZE (((호출 성공/실패))) 0x80 Storage[3]-as-address               |
|     BE | DUP5         | 0x80 RETURNDATASIZE (((호출 성공/실패))) RETURNDATASIZE (((호출 성공/실패))) 0x80 Storage[3]-as-address          |
|     BF | RETURN       |                                                                                                                              |

따라서 호출 후 반환 데이터를 0x80 - 0x80+RETURNDATASIZE 버퍼에 복사하고, 호출이 성공하면 정확히 해당 버퍼와 함께 `RETURN`를 실행합니다.

### DELEGATECALL 실패 {#delegatecall-failed}

만약 0xC0인 이곳에 도달했다면, 우리가 호출한 컨트랙트가 되돌리기(revert)되었음을 의미합니다. 우리는 해당 컨트랙트의 프록시일 뿐이므로, 동일한 데이터를 반환하고 마찬가지로 되돌리기를 원합니다.

| Offset | Opcode   | Stack                                                                                                               |
| -----: | -------- | ------------------------------------------------------------------------------------------------------------------- |
|     C0 | JUMPDEST | (((호출 성공/실패))) RETURNDATASIZE (((호출 성공/실패))) 0x80 Storage[3]-as-address                     |
|     C1 | DUP2     | RETURNDATASIZE (((호출 성공/실패))) RETURNDATASIZE (((호출 성공/실패))) 0x80 Storage[3]-as-address      |
|     C2 | DUP5     | 0x80 RETURNDATASIZE (((호출 성공/실패))) RETURNDATASIZE (((호출 성공/실패))) 0x80 Storage[3]-as-address |
|     C3 | REVERT   |

따라서 이전에 `RETURN`에 사용했던 것과 동일한 버퍼인 0x80 - 0x80+RETURNDATASIZE를 사용하여 `REVERT`를 실행합니다.

![Call to proxy flowchart](flowchart-proxy.png)

## ABI 호출 {#abi-calls}

콜 데이터 크기가 4바이트 이상인 경우 유효한 ABI 호출일 수 있습니다.

| 오프셋 | 연산 코드       | 스택                                             |
| -----: | ------------ | ------------------------------------------------- |
|      D | PUSH1 0x00   | 0x00                                              |
|      F | CALLDATALOAD | (((콜 데이터의 첫 번째 단어(256비트))))      |
|     10 | PUSH1 0xe0   | 0xE0 (((콜 데이터의 첫 번째 단어(256비트)))) |
|     12 | SHR          | (((콜 데이터의 처음 32비트(4바이트))))    |

Etherscan은 `1C`가 알 수 없는 연산 코드라고 알려주는데, 이는 [Etherscan이 이 기능을 작성한 후에 추가되었고](https://eips.ethereum.org/EIPS/eip-145) 아직 업데이트하지 않았기 때문입니다. [최신 연산 코드 표](https://github.com/wolflo/evm-opcodes)를 보면 이것이 오른쪽 시프트(shift right)임을 알 수 있습니다.

| 오프셋 | 연산 코드           | 스택                                                                                                    |
| -----: | ---------------- | -------------------------------------------------------------------------------------------------------- |
|     13 | DUP1             | (((콜 데이터의 처음 32비트(4바이트)))) (((콜 데이터의 처음 32비트(4바이트))))            |
|     14 | PUSH4 0x3cd8045e | 0x3CD8045E (((콜 데이터의 처음 32비트(4바이트)))) (((콜 데이터의 처음 32비트(4바이트)))) |
|     19 | GT               | 0x3CD8045E>콜-데이터의-처음-32비트 (((콜 데이터의 처음 32비트(4바이트))))                 |
|     1A | PUSH2 0x0043     | 0x43 0x3CD8045E>콜-데이터의-처음-32비트 (((콜 데이터의 처음 32비트(4바이트))))            |
|     1D | JUMPI            | (((콜 데이터의 처음 32비트(4바이트))))                                                           |

이처럼 메서드 서명 일치 테스트를 둘로 나누면 평균적으로 테스트 횟수를 절반으로 줄일 수 있습니다. 이 바로 뒤에 오는 코드와 0x43의 코드는 동일한 패턴을 따릅니다. 콜 데이터의 처음 32비트를 `DUP1`하고, `PUSH4 (((method signature>`한 다음, `EQ`를 실행하여 동일한지 확인하고, 메서드 서명이 일치하면 `JUMPI`합니다. 다음은 메서드 서명, 해당 주소 및 알려진 경우 [해당 메서드 정의](https://www.4byte.directory/)입니다.

| 메서드                                                                                 | 메서드 서명 | 점프할 오프셋 |
| -------------------------------------------------------------------------------------- | ---------------- | ------------------- |
| [splitter()](https://www.4byte.directory/signatures/?bytes4_signature=0x3cd8045e)      | 0x3cd8045e       | 0x0103              |
| ???                                                                                    | 0x81e580d3       | 0x0138              |
| [currentWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0xba0bafb4) | 0xba0bafb4       | 0x0158              |
| ???                                                                                    | 0x1f135823       | 0x00C4              |
| [merkleRoot()](https://www.4byte.directory/signatures/?bytes4_signature=0x2eb4a7ab)    | 0x2eb4a7ab       | 0x00ED              |

일치하는 항목이 없으면, 프록시로 연결된 컨트랙트에 일치하는 항목이 있기를 바라며 코드는 [0x7C에 있는 프록시 핸들러](#the-handler-at-0x7c)로 점프합니다.

![ABI calls flowchart](flowchart-abi.png)

## splitter() {#splitter}

| 오프셋 | 연산 코드       | 스택                         |
| -----: | ------------ | ----------------------------- |
|    103 | JUMPDEST     |
|    104 | CALLVALUE    | CALLVALUE                     |
|    105 | DUP1         | CALLVALUE CALLVALUE           |
|    106 | ISZERO       | CALLVALUE==0 CALLVALUE        |
|    107 | PUSH2 0x010f | 0x010F CALLVALUE==0 CALLVALUE |
|    10A | JUMPI        | CALLVALUE                     |
|    10B | PUSH1 0x00   | 0x00 CALLVALUE                |
|    10D | DUP1         | 0x00 0x00 CALLVALUE           |
|    10E | REVERT       |

이 함수가 가장 먼저 수행하는 작업은 호출 시 ETH가 전송되지 않았는지 확인하는 것입니다. 이 함수는 [`payable`](https://solidity-by-example.org/payable/)가 아닙니다. 누군가 우리에게 ETH를 보냈다면 그것은 실수일 것이므로, 그들이 돌려받을 수 없는 곳에 해당 ETH가 묶이는 것을 방지하기 위해 `REVERT`하고자 합니다.

| 오프셋 | 연산 코드                                            | 스택                                                                       |
| -----: | ------------------------------------------------- | --------------------------------------------------------------------------- |
|    10F | JUMPDEST                                          |
|    110 | POP                                               |
|    111 | PUSH1 0x03                                        | 0x03                                                                        |
|    113 | SLOAD                                             | (((Storage[3] 즉, 우리가 프록시 역할을 하는 컨트랙트)))                |
|    114 | PUSH1 0x40                                        | 0x40 (((Storage[3] 즉, 우리가 프록시 역할을 하는 컨트랙트)))           |
|    116 | MLOAD                                             | 0x80 (((Storage[3] 즉, 우리가 프록시 역할을 하는 컨트랙트)))           |
|    117 | PUSH20 0xffffffffffffffffffffffffffffffffffffffff | 0xFF...FF 0x80 (((Storage[3] 즉, 우리가 프록시 역할을 하는 컨트랙트))) |
|    12C | SWAP1                                             | 0x80 0xFF...FF (((Storage[3] 즉, 우리가 프록시 역할을 하는 컨트랙트))) |
|    12D | SWAP2                                             | (((Storage[3] 즉, 우리가 프록시 역할을 하는 컨트랙트))) 0xFF...FF 0x80 |
|    12E | AND                                               | ProxyAddr 0x80                                                              |
|    12F | DUP2                                              | 0x80 ProxyAddr 0x80                                                         |
|    130 | MSTORE                                            | 0x80                                                                        |

그리고 이제 0x80에는 프록시 주소가 포함됩니다.

| 오프셋 | 연산 코드       | 스택     |
| -----: | ------------ | --------- |
|    131 | PUSH1 0x20   | 0x20 0x80 |
|    133 | ADD          | 0xA0      |
|    134 | PUSH2 0x00e4 | 0xE4 0xA0 |
|    137 | JUMP         | 0xA0      |

### E4 코드 {#the-e4-code}

이 줄들은 처음 보는 것이지만, 다른 메서드들과 공유됩니다(아래 참조). 따라서 스택에 있는 값을 X라고 부르고, `splitter()`에서 이 X의 값이 0xA0이라는 점만 기억하겠습니다.

| 오프셋 | 연산 코드     | 스택       |
| -----: | ---------- | ----------- |
|     E4 | JUMPDEST   | X           |
|     E5 | PUSH1 0x40 | 0x40 X      |
|     E7 | MLOAD      | 0x80 X      |
|     E8 | DUP1       | 0x80 0x80 X |
|     E9 | SWAP2      | X 0x80 0x80 |
|     EA | SUB        | X-0x80 0x80 |
|     EB | SWAP1      | 0x80 X-0x80 |
|     EC | RETURN     |

따라서 이 코드는 스택에서 메모리 포인터(X)를 받아, 컨트랙트가 0x80 - X인 버퍼와 함께 `RETURN`하도록 합니다.

`splitter()`의 경우, 이는 우리가 프록시 역할을 하는 주소를 반환합니다. `RETURN`는 0x80-0x9F에 있는 버퍼를 반환하며, 이곳은 우리가 이 데이터를 기록한 위치입니다(위의 오프셋 0x130).

## currentWindow() {#currentwindow}

오프셋 0x158-0x163의 코드는 (`JUMPI` 목적지를 제외하고) `splitter()`의 0x103-0x10E에서 본 것과 동일하므로, `currentWindow()` 역시 `payable`가 아님을 알 수 있습니다.

| 오프셋 | 연산 코드    | 스택                 |
| -----: | ------------ | -------------------- |
|    164 | JUMPDEST     |
|    165 | POP          |
|    166 | PUSH2 0x00da | 0xDA                 |
|    169 | PUSH1 0x01   | 0x01 0xDA            |
|    16B | SLOAD        | Storage[1] 0xDA      |
|    16C | DUP2         | 0xDA Storage[1] 0xDA |
|    16D | JUMP         | Storage[1] 0xDA      |

### DA 코드 {#the-da-code}

이 코드는 다른 메서드와도 공유됩니다. 따라서 스택에 있는 값을 Y라고 부르고, `currentWindow()`에서 이 Y의 값이 Storage[1]이라는 점만 기억하겠습니다.

| 오프셋 | 연산 코드  | 스택             |
| -----: | ---------- | ---------------- |
|     DA | JUMPDEST   | Y 0xDA           |
|     DB | PUSH1 0x40 | 0x40 Y 0xDA      |
|     DD | MLOAD      | 0x80 Y 0xDA      |
|     DE | SWAP1      | Y 0x80 0xDA      |
|     DF | DUP2       | 0x80 Y 0x80 0xDA |
|     E0 | MSTORE     | 0x80 0xDA        |

Y를 0x80-0x9F에 씁니다.

| 오프셋 | 연산 코드  | 스택           |
| -----: | ---------- | -------------- |
|     E1 | PUSH1 0x20 | 0x20 0x80 0xDA |
|     E3 | ADD        | 0xA0 0xDA      |

나머지 부분은 [위에서](#the-e4-code) 이미 설명했습니다. 따라서 0xDA로 점프하면 스택의 맨 위 값(Y)을 0x80-0x9F에 쓰고, 그 값을 반환합니다. `currentWindow()`의 경우 Storage[1]을 반환합니다.

## merkleRoot() {#merkleroot}

오프셋 0xED-0xF8의 코드는 (`JUMPI` 목적지를 제외하면) `splitter()`의 0x103-0x10E에서 본 것과 동일하므로, `merkleRoot()` 역시 `payable`가 아님을 알 수 있습니다.

| 오프셋 | 연산 코드    | 스택                 |
| -----: | ------------ | -------------------- |
|     F9 | JUMPDEST     |
|     FA | POP          |
|     FB | PUSH2 0x00da | 0xDA                 |
|     FE | PUSH1 0x00   | 0x00 0xDA            |
|    100 | SLOAD        | Storage[0] 0xDA      |
|    101 | DUP2         | 0xDA Storage[0] 0xDA |
|    102 | JUMP         | Storage[0] 0xDA      |

점프 후에 일어나는 일은 [우리가 이미 알아냈습니다](#the-da-code). 따라서 `merkleRoot()`는 Storage[0]을 반환합니다.

## 0x81e580d3 {#0x81e580d3}

오프셋 0x138-0x143의 코드는 (`JUMPI` 목적지를 제외하고) `splitter()`의 0x103-0x10E에서 본 것과 동일하므로, 이 함수 역시 `payable`가 아님을 알 수 있습니다.

| 오프셋 | 연산 코드    | 스택                                                         |
| -----: | ------------ | ------------------------------------------------------------ |
|    144 | JUMPDEST     |
|    145 | POP          |
|    146 | PUSH2 0x00da | 0xDA                                                         |
|    149 | PUSH2 0x0153 | 0x0153 0xDA                                                  |
|    14C | CALLDATASIZE | CALLDATASIZE 0x0153 0xDA                                     |
|    14D | PUSH1 0x04   | 0x04 CALLDATASIZE 0x0153 0xDA                                |
|    14F | PUSH2 0x018f | 0x018F 0x04 CALLDATASIZE 0x0153 0xDA                         |
|    152 | JUMP         | 0x04 CALLDATASIZE 0x0153 0xDA                                |
|    18F | JUMPDEST     | 0x04 CALLDATASIZE 0x0153 0xDA                                |
|    190 | PUSH1 0x00   | 0x00 0x04 CALLDATASIZE 0x0153 0xDA                           |
|    192 | PUSH1 0x20   | 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                      |
|    194 | DUP3         | 0x04 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                 |
|    195 | DUP5         | CALLDATASIZE 0x04 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA    |
|    196 | SUB          | CALLDATASIZE-4 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA       |
|    197 | SLT          | CALLDATASIZE-4\<32 0x00 0x04 CALLDATASIZE 0x0153 0xDA         |
|    198 | ISZERO       | CALLDATASIZE-4>=32 0x00 0x04 CALLDATASIZE 0x0153 0xDA        |
|    199 | PUSH2 0x01a0 | 0x01A0 CALLDATASIZE-4>=32 0x00 0x04 CALLDATASIZE 0x0153 0xDA |
|    19C | JUMPI        | 0x00 0x04 CALLDATASIZE 0x0153 0xDA                           |

이 함수는 최소 32바이트(1워드)의 콜 데이터를 사용하는 것으로 보입니다.

| 오프셋 | 연산 코드 | 스택                                         |
| -----: | --------- | -------------------------------------------- |
|    19D | DUP1      | 0x00 0x00 0x04 CALLDATASIZE 0x0153 0xDA      |
|    19E | DUP2      | 0x00 0x00 0x00 0x04 CALLDATASIZE 0x0153 0xDA |
|    19F | REVERT    |

콜 데이터를 받지 못하면 트랜잭션은 반환 데이터 없이 되돌려집니다.

함수가 필요한 콜 데이터를 _받는다면_ 어떻게 되는지 살펴보겠습니다.

| 오프셋 | 연산 코드    | 스택                                     |
| -----: | ------------ | ---------------------------------------- |
|    1A0 | JUMPDEST     | 0x00 0x04 CALLDATASIZE 0x0153 0xDA       |
|    1A1 | POP          | 0x04 CALLDATASIZE 0x0153 0xDA            |
|    1A2 | CALLDATALOAD | calldataload(4) CALLDATASIZE 0x0153 0xDA |

`calldataload(4)`는 메서드 서명 _이후_ 콜 데이터의 첫 번째 워드입니다.

| 오프셋 | 연산 코드    | 스택                                                                         |
| -----: | ------------ | ---------------------------------------------------------------------------- |
|    1A3 | SWAP2        | 0x0153 CALLDATASIZE calldataload(4) 0xDA                                     |
|    1A4 | SWAP1        | CALLDATASIZE 0x0153 calldataload(4) 0xDA                                     |
|    1A5 | POP          | 0x0153 calldataload(4) 0xDA                                                  |
|    1A6 | JUMP         | calldataload(4) 0xDA                                                         |
|    153 | JUMPDEST     | calldataload(4) 0xDA                                                         |
|    154 | PUSH2 0x016e | 0x016E calldataload(4) 0xDA                                                  |
|    157 | JUMP         | calldataload(4) 0xDA                                                         |
|    16E | JUMPDEST     | calldataload(4) 0xDA                                                         |
|    16F | PUSH1 0x04   | 0x04 calldataload(4) 0xDA                                                    |
|    171 | DUP2         | calldataload(4) 0x04 calldataload(4) 0xDA                                    |
|    172 | DUP2         | 0x04 calldataload(4) 0x04 calldataload(4) 0xDA                               |
|    173 | SLOAD        | Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA                         |
|    174 | DUP2         | calldataload(4) Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA         |
|    175 | LT           | calldataload(4)\<Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA         |
|    176 | PUSH2 0x017e | 0x017EC calldataload(4)\<Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA |
|    179 | JUMPI        | calldataload(4) 0x04 calldataload(4) 0xDA                                    |

첫 번째 워드가 Storage[4]보다 작지 않으면 함수는 실패합니다. 반환 값 없이 되돌려집니다:

| 오프셋 | 연산 코드  | 스택          |
| -----: | ---------- | ------------- |
|    17A | PUSH1 0x00 | 0x00 ...      |
|    17C | DUP1       | 0x00 0x00 ... |
|    17D | REVERT     |

calldataload(4)가 Storage[4]보다 작으면 다음 코드를 얻게 됩니다:

| 오프셋 | 연산 코드  | 스택                                                |
| -----: | ---------- | --------------------------------------------------- |
|    17E | JUMPDEST   | calldataload(4) 0x04 calldataload(4) 0xDA           |
|    17F | PUSH1 0x00 | 0x00 calldataload(4) 0x04 calldataload(4) 0xDA      |
|    181 | SWAP2      | 0x04 calldataload(4) 0x00 calldataload(4) 0xDA      |
|    182 | DUP3       | 0x00 0x04 calldataload(4) 0x00 calldataload(4) 0xDA |
|    183 | MSTORE     | calldataload(4) 0x00 calldataload(4) 0xDA           |

그리고 메모리 위치 0x00-0x1F에는 이제 0x04 데이터가 포함됩니다(0x00-0x1E는 모두 0이고, 0x1F는 4입니다).

| 오프셋 | 연산 코드  | 스택                                                                    |
| -----: | ---------- | ----------------------------------------------------------------------- |
|    184 | PUSH1 0x20 | 0x20 calldataload(4) 0x00 calldataload(4) 0xDA                          |
|    186 | SWAP1      | calldataload(4) 0x20 0x00 calldataload(4) 0xDA                          |
|    187 | SWAP2      | 0x00 0x20 calldataload(4) calldataload(4) 0xDA                          |
|    188 | SHA3       | (((SHA3 of 0x00-0x1F))) calldataload(4) calldataload(4) 0xDA            |
|    189 | ADD        | (((SHA3 of 0x00-0x1F)))+calldataload(4) calldataload(4) 0xDA            |
|    18A | SLOAD      | Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] calldataload(4) 0xDA |

따라서 스토리지에는 0x000...0004의 SHA3에서 시작하여 모든 유효한 콜 데이터 값(Storage[4] 미만의 값)에 대한 항목을 갖는 조회 테이블이 있습니다.

| 오프셋 | 연산 코드 | 스택                                                                    |
| -----: | --------- | ----------------------------------------------------------------------- |
|    18B | SWAP1     | calldataload(4) Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA |
|    18C | POP       | Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA                 |
|    18D | DUP2      | 0xDA Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA            |
|    18E | JUMP      | Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA                 |

우리는 이미 [오프셋 0xDA의 코드](#the-da-code)가 무엇을 하는지 알고 있습니다. 이 코드는 스택 최상단 값을 호출자에게 반환합니다. 따라서 이 함수는 조회 테이블의 값을 호출자에게 반환합니다.

## 0x1f135823 {#0x1f135823}

오프셋 0xC4-0xCF의 코드는 (`JUMPI` 목적지를 제외하고) `splitter()`의 0x103-0x10E에서 본 것과 동일하므로, 이 함수 역시 `payable`가 아님을 알 수 있습니다.

| 오프셋 | 연산 코드    | 스택              |
| -----: | ------------ | ----------------- |
|     D0 | JUMPDEST     |
|     D1 | POP          |
|     D2 | PUSH2 0x00da | 0xDA              |
|     D5 | PUSH1 0x06   | 0x06 0xDA         |
|     D7 | SLOAD        | Value\* 0xDA      |
|     D8 | DUP2         | 0xDA Value\* 0xDA |
|     D9 | JUMP         | Value\* 0xDA      |

우리는 이미 [오프셋 0xDA의 코드](#the-da-code)가 무엇을 하는지 알고 있습니다. 이 코드는 스택의 최상단 값을 호출자에게 반환합니다. 따라서 이 함수는 `Value*`를 반환합니다.

### 메서드 요약 {#method-summary}

이 시점에서 컨트랙트를 이해했다고 느끼시나요? 저는 그렇지 않습니다. 지금까지 우리가 파악한 메서드는 다음과 같습니다.

| 메서드                            | 의미                                                                                 |
| --------------------------------- | ------------------------------------------------------------------------------------ |
| Transfer                          | 호출에서 제공된 값을 수락하고 그 양만큼 `Value*`를 증가시킵니다. |
| [splitter()](#splitter)           | 프록시 주소인 Storage[3]을 반환합니다.                                               |
| [currentWindow()](#currentwindow) | Storage[1]을 반환합니다.                                                             |
| [merkleRoot()](#merkleroot)        | Storage[0]을 반환합니다.                                                             |
| [0x81e580d3](#0x81e580d3)         | 매개변수가 Storage[4]보다 작은 경우, 조회 테이블에서 값을 반환합니다.                |
| [0x1f135823](#0x1f135823)         | Value\*로 알려진 Storage[6]을 반환합니다.                                            |

하지만 우리는 다른 모든 기능이 Storage[3]에 있는 컨트랙트에 의해 제공된다는 것을 알고 있습니다. 어쩌면 그 컨트랙트가 무엇인지 안다면 단서를 얻을 수 있을지도 모릅니다. 다행히도 이것은 블록체인이며, 적어도 이론상으로는 모든 것이 알려져 있습니다. Storage[3]을 설정하는 메서드를 보지 못했으므로, 이는 생성자에 의해 설정되었음이 틀림없습니다.

## 생성자 {#the-constructor}

[컨트랙트를 살펴볼](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f) 때, 우리는 그것을 생성한 트랜잭션도 볼 수 있습니다.

![Click the create transaction](create-tx.png)

해당 트랜잭션을 클릭하고 **상태** 탭을 누르면 매개변수의 초기값을 확인할 수 있습니다. 구체적으로, Storage[3]에 [0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761](https://etherscan.io/address/0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761)이 포함되어 있는 것을 볼 수 있습니다. 해당 컨트랙트에는 누락된 기능이 포함되어 있을 것입니다. 우리가 조사 중인 컨트랙트에 사용했던 것과 동일한 도구를 사용하여 이를 이해할 수 있습니다.

## 프록시 컨트랙트 {#the-proxy-contract}

위에서 원본 컨트랙트에 사용했던 것과 동일한 기술을 사용하면, 다음과 같은 경우 컨트랙트가 되돌리기를 수행한다는 것을 알 수 있습니다:

- 호출에 ETH가 첨부된 경우 (0x05-0x0F)
- 콜 데이터 크기가 4 미만인 경우 (0x10-0x19 및 0xBE-0xC2)

그리고 지원하는 메서드는 다음과 같습니다:

| 메서드                                                                                                          | 메서드 서명             | 점프할 오프셋 |
| --------------------------------------------------------------------------------------------------------------- | ---------------------------- | ------------------- |
| [scaleAmountByPercentage(uint256,uint256)](https://www.4byte.directory/signatures/?bytes4_signature=0x8ffb5c97)          | 0x8ffb5c97                   | 0x0135              |
| [isClaimed(uint256,address)](https://www.4byte.directory/signatures/?bytes4_signature=0xd2ef0795)               | 0xd2ef0795                   | 0x0151              |
| [claim(uint256,address,uint256,bytes32[])](https://www.4byte.directory/signatures/?bytes4_signature=0x2e7ba6ef) | 0x2e7ba6ef                   | 0x00F4              |
| [incrementWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0x338b1d31)                        | 0x338b1d31                   | 0x0110              |
| ???                                                                                                             | 0x3f26479e                   | 0x0118              |
| ???                                                                                                             | 0x1e7df9d3                   | 0x00C3              |
| [currentWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0xba0bafb4)                          | [0xba0bafb4](#currentwindow) | 0x0148              |
| [merkleRoot()](https://www.4byte.directory/signatures/?bytes4_signature=0x2eb4a7ab)                             | [0x2eb4a7ab](#merkleroot)    | 0x0107              |
| ???                                                                                                             | [0x81e580d3](#0x81e580d3)    | 0x0122              |
| ???                                                                                                             | [0x1f135823](#0x1f135823)    | 0x00D8              |

하단의 네 가지 메서드는 도달할 일이 없으므로 무시해도 됩니다. 이들의 서명은 원본 컨트랙트가 자체적으로 처리하도록 되어 있으므로(위에서 서명을 클릭하여 세부 정보를 확인할 수 있습니다), [재정의된 메서드](https://medium.com/upstate-interactive/solidity-override-vs-virtual-functions-c0a5dfb83aaf)임이 틀림없습니다.

남은 메서드 중 하나는 `claim(<params>)`이고 다른 하나는 `isClaimed(<params>)`이므로, 에어드롭 컨트랙트인 것으로 보입니다. 나머지 연산 코드를 하나씩 살펴보는 대신, 이 컨트랙트의 세 가지 함수에 대해 유용한 결과를 생성하는 [디컴파일러를 사용해 볼 수 있습니다](https://etherscan.io/bytecode-decompiler?a=0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761). 다른 함수들을 리버스 엔지니어링하는 것은 독자를 위한 연습 문제로 남겨두겠습니다.

### scaleAmountByPercentage {#scaleamountbypercentage}

이 함수에 대해 디컴파일러가 제공하는 결과는 다음과 같습니다:

```python
def unknown8ffb5c97(uint256 _param1, uint256 _param2) payable:
  require calldata.size - 4 >=′ 64
  if _param1 and _param2 > -1 / _param1:
      revert with 0, 17
  return (_param1 * _param2 / 100 * 10^6)
```

첫 번째 `require`는 콜 데이터가 4바이트의 함수 서명 외에도 두 개의 매개변수를 처리하기에 충분한 최소 64바이트를 가지고 있는지 테스트합니다. 그렇지 않다면 분명히 문제가 있는 것입니다.

`if` 문은 `_param1`가 0이 아니고 `_param1 * _param2`가 음수가 아닌지 확인하는 것으로 보입니다. 이는 아마도 랩어라운드(wrap around) 현상을 방지하기 위한 것일 것입니다.

마지막으로, 함수는 스케일링된 값을 반환합니다.

### claim {#claim}

디컴파일러가 생성하는 코드는 복잡하며, 모든 코드가 우리에게 관련이 있는 것은 아닙니다. 유용한 정보를 제공한다고 생각되는 줄에 집중하기 위해 일부는 건너뛰겠습니다.

```python
def unknown2e7ba6ef(uint256 _param1, uint256 _param2, uint256 _param3, array _param4) payable:
  ...
  require _param2 == addr(_param2)
  ...
  if currentWindow <= _param1:
      revert with 0, 'cannot claim for a future window'
```

여기서 두 가지 중요한 점을 알 수 있습니다:

- `_param2`는 `uint256`로 선언되어 있지만, 실제로는 주소입니다.
- `_param1`는 청구되는 윈도우이며, `currentWindow` 이하의 값이어야 합니다.

```python
  ...
  if stor5[_claimWindow][addr(_claimFor)]:
      revert with 0, 'Account already claimed the given window'
```

이제 Storage[5]가 윈도우와 주소의 배열이며, 해당 주소가 그 윈도우에 대한 보상을 청구했는지 여부를 나타낸다는 것을 알 수 있습니다.

```python
  ...
  idx = 0
  s = 0
  while idx < _param4.length:
  ...
      if s + sha3(mem[(32 * _param4.length) + 328 len mem[(32 * _param4.length) + 296]]) > mem[(32 * idx) + 296]:
          mem[mem[64] + 32] = mem[(32 * idx) + 296]
          ...
          s = sha3(mem[_62 + 32 len mem[_62]])
          continue
      ...
      s = sha3(mem[_66 + 32 len mem[_66]])
      continue
  if unknown2eb4a7ab != s:
      revert with 0, 'Invalid proof'
```

`unknown2eb4a7ab`가 실제로는 `merkleRoot()` 함수라는 것을 알고 있으므로, 이 코드는 [머클 증명](https://medium.com/crypto-0-nite/merkle-proofs-explained-6dd429623dc5)을 검증하는 것으로 보입니다. 이는 `_param4`가 머클 증명임을 의미합니다.

```python
  call addr(_param2) with:
     value unknown81e580d3[_param1] * _param3 / 100 * 10^6 wei
       gas 30000 wei
```

이것이 컨트랙트가 자신의 ETH를 다른 주소(컨트랙트 또는 외부 소유 계정)로 전송하는 방법입니다. 전송할 금액을 값으로 하여 호출합니다. 따라서 이것은 ETH 에어드롭으로 보입니다.

```python
  if not return_data.size:
      if not ext_call.success:
          require ext_code.size(stor2)
          call stor2.deposit() with:
             value unknown81e580d3[_param1] * _param3 / 100 * 10^6 wei
```

아래 두 줄은 Storage[2] 역시 우리가 호출하는 컨트랙트임을 알려줍니다. [생성자 트랜잭션을 살펴보면](https://etherscan.io/tx/0xa1ea0549fb349eb7d3aff90e1d6ce7469fdfdcd59a2fd9b8d1f5e420c0d05b58#statechange) 이 컨트랙트가 [0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)이며, [소스 코드가 Etherscan에 업로드된](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2#code) 래핑된 이더 (weth) 컨트랙트임을 알 수 있습니다.

따라서 컨트랙트는 `_param2`로 ETH를 전송하려고 시도하는 것으로 보입니다. 성공하면 좋지만, 그렇지 않다면 [WETH](https://weth.tkn.eth.limo/)를 전송하려고 시도합니다. `_param2`가 외부 소유 계정(EOA)인 경우 항상 ETH를 받을 수 있지만, 컨트랙트는 ETH 수신을 거부할 수 있습니다. 하지만 WETH는 ERC-20이므로 컨트랙트가 수신을 거부할 수 없습니다.

```python
  ...
  log 0xdbd5389f: addr(_param2), unknown81e580d3[_param1] * _param3 / 100 * 10^6, bool(ext_call.success)
```

함수 끝에서 로그 항목이 생성되는 것을 볼 수 있습니다. [생성된 로그 항목을 살펴보고](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f#events) `0xdbd5...`로 시작하는 주제로 필터링해 보세요. [이러한 항목을 생성한 트랜잭션 중 하나를 클릭하면](https://etherscan.io/tx/0xe7d3b7e00f645af17dfbbd010478ef4af235896c65b6548def1fe95b3b7d2274) 실제로 청구처럼 보인다는 것을 알 수 있습니다. 계정이 우리가 리버스 엔지니어링 중인 컨트랙트로 메시지를 보냈고, 그 대가로 ETH를 받았습니다.

![A claim transaction](claim-tx.png)

### 1e7df9d3 {#1e7df9d3}

이 함수는 위의 [`claim`](#claim)와 매우 유사합니다. 또한 머클 증명을 확인하고, 우선 ETH 전송을 시도하며, 동일한 유형의 로그 항목을 생성합니다.

```python
def unknown1e7df9d3(uint256 _param1, uint256 _param2, array _param3) payable:
  ...
  idx = 0
  s = 0
  while idx < _param3.length:
      if idx >= mem[96]:
          revert with 0, 50
      _55 = mem[(32 * idx) + 128]
      if s + sha3(mem[(32 * _param3.length) + 160 len mem[(32 * _param3.length) + 128]]) > mem[(32 * idx) + 128]:
          ...
          s = sha3(mem[_58 + 32 len mem[_58]])
          continue
      mem[mem[64] + 32] = s + sha3(mem[(32 * _param3.length) + 160 len mem[(32 * _param3.length) + 128]])
  ...
  if unknown2eb4a7ab != s:
      revert with 0, 'Invalid proof'
  ...
  call addr(_param1) with:
     value s wei
       gas 30000 wei
  if not return_data.size:
      if not ext_call.success:
          require ext_code.size(stor2)
          call stor2.deposit() with:
             value s wei
               gas gas_remaining wei
  ...
  log 0xdbd5389f: addr(_param1), s, bool(ext_call.success)
```

주요 차이점은 출금할 윈도우인 첫 번째 매개변수가 없다는 것입니다. 대신, 청구할 수 있는 모든 윈도우에 대한 루프가 있습니다.

```python
  idx = 0
  s = 0
  while idx < currentWindow:
      ...
      if stor5[mem[0]]:
          if idx == -1:
              revert with 0, 17
          idx = idx + 1
          s = s
          continue
      ...
      stor5[idx][addr(_param1)] = 1
      if idx >= unknown81e580d3.length:
          revert with 0, 50
      mem[0] = 4
      if unknown81e580d3[idx] and _param2 > -1 / unknown81e580d3[idx]:
          revert with 0, 17
      if s > !(unknown81e580d3[idx] * _param2 / 100 * 10^6):
          revert with 0, 17
      if idx == -1:
          revert with 0, 17
      idx = idx + 1
      s = s + (unknown81e580d3[idx] * _param2 / 100 * 10^6)
      continue
```

따라서 모든 윈도우를 청구하는 `claim`의 변형인 것으로 보입니다.

## 결론 {#conclusion}

이제 여러분은 연산 코드나 (작동하는 경우) 디컴파일러를 사용하여 소스 코드가 제공되지 않는 컨트랙트를 이해하는 방법을 알게 되었을 것입니다. 이 글의 길이에서 알 수 있듯이, 컨트랙트를 리버스 엔지니어링하는 것은 결코 쉬운 일이 아니지만, 보안이 필수적인 시스템에서는 컨트랙트가 약속한 대로 작동하는지 검증할 수 있는 능력이 중요한 기술입니다.

[제 더 많은 작업물은 여기에서 확인하세요](https://cryptodocguy.pro/).