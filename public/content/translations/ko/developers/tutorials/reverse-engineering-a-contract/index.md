---
title: "계약 리버스 엔지니어링"
description: 소스 코드가 없을 때 계약을 이해하는 방법
author: Ori Pomerantz
lang: ko
tags: [ "evm", "연산 부호" ]
skill: advanced
published: 2021-12-30
---

## 소개 {#introduction}

_블록체인에는 비밀이 없으며_, 발생하는 모든 일은 일관되고 검증 가능하며 공개적으로 이용 가능합니다. 이상적으로 [계약은 소스 코드를 Etherscan에 게시하고 확인해야 합니다](https://etherscan.io/address/0xb8901acb165ed027e32754e0ffe830802919727f#code). 그러나 [항상 그런 것은 아닙니다](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f#code). 이 글에서는 소스 코드 없이 [`0x2510c039cc3b061d79e564b38836da87e31b342f`](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f) 계약을 살펴봄으로써 계약을 리버스 엔지니어링하는 방법을 배웁니다.

리버스 컴파일러가 있지만 항상 [사용 가능한 결과](https://etherscan.io/bytecode-decompiler?a=0x2510c039cc3b061d79e564b38836da87e31b342f)를 생성하는 것은 아닙니다. 이 글에서는 [연산 부호](https://github.com/wolflo/evm-opcodes)에서 계약을 수동으로 리버스 엔지니어링하고 이해하는 방법과 디컴파일러의 결과를 해석하는 방법을 배웁니다.

이 글을 이해하려면 EVM의 기본 사항을 이미 알고 있어야 하며 EVM 어셈블러에 어느 정도 익숙해야 합니다. [여기에서 이러한 주제에 대해 읽을 수 있습니다](https://medium.com/mycrypto/the-ethereum-virtual-machine-how-does-it-work-9abac2b7c9e).

## 실행 코드 준비 {#prepare-the-executable-code}

Etherscan에서 계약으로 이동하여 **계약** 탭을 클릭한 다음 **연산 부호 보기로 전환**을 클릭하여 연산 부호를 얻을 수 있습니다. 한 줄에 하나의 연산 부호가 표시되는 보기를 얻습니다.

![Etherscan의 연산 부호 보기](opcode-view.png)

그러나 점프를 이해하려면 각 연산 부호가 코드의 어디에 있는지 알아야 합니다. 그러기 위한 한 가지 방법은 구글 스프레드시트를 열고 C열에 연산 부호를 붙여넣는 것입니다. [이미 준비된 스프레드시트의 사본을 만들어 다음 단계를 건너뛸 수 있습니다](https://docs.google.com/spreadsheets/d/1tKmTJiNjUwHbW64wCKOSJxHjmh0bAUapt6btUYE7kDA/edit?usp=sharing).

다음 단계는 점프를 이해할 수 있도록 올바른 코드 위치를 얻는 것입니다. B열에 연산 부호 크기를, A열에 위치(16진수)를 넣습니다. `B1` 셀에 이 함수를 입력한 다음 코드 끝까지 나머지 B열에 복사하여 붙여넣습니다. 이 작업을 마친 후 B열을 숨길 수 있습니다.

```
=1+IF(REGEXMATCH(C1,"PUSH"),REGEXEXTRACT(C1,"PUSH(\d+)"),0)
```

먼저 이 함수는 연산 부호 자체에 1바이트를 추가한 다음 `PUSH`를 찾습니다. 푸시 연산 부호는 푸시되는 값에 대한 추가 바이트가 필요하기 때문에 특별합니다. 연산 부호가 `PUSH`인 경우 바이트 수를 추출하여 추가합니다.

`A1`에 첫 번째 오프셋인 0을 넣습니다. 그런 다음 `A2`에 이 함수를 넣고 나머지 A열에 다시 복사하여 붙여넣습니다.

```
=dec2hex(hex2dec(A1)+B1)
```

점프(`JUMP` 및 `JUMPI`) 전에 푸시되는 값이 16진수로 주어지기 때문에 16진수 값을 얻으려면 이 함수가 필요합니다.

## 진입점(0x00) {#the-entry-point-0x00}

계약은 항상 첫 번째 바이트부터 실행됩니다. 이는 코드의 초기 부분입니다:

| 오프셋 | 연산 부호        | 스택(연산 부호 후)                 |
| --: | ------------ | ---------------------------------------------- |
|   0 | PUSH1 0x80   | 0x80                                           |
|   2 | PUSH1 0x40   | 0x40, 0x80                                     |
|   4 | MSTORE       | 비어 있음                                          |
|   5 | PUSH1 0x04   | 0x04                                           |
|   7 | CALLDATASIZE | CALLDATASIZE 0x04                              |
|   8 | LT           | CALLDATASIZE\<4      |
|   9 | PUSH2 0x005e | 0x5E CALLDATASIZE\<4 |
|   C | JUMPI        | 비어 있음                                          |

이 코드는 두 가지 작업을 수행합니다.

1. 0x80을 32바이트 값으로 메모리 위치 0x40-0x5F에 씁니다(0x80은 0x5F에 저장되고 0x40-0x5E는 모두 0입니다).
2. 호출 데이터 크기를 읽습니다. 일반적으로 이더리움 계약의 호출 데이터는 [ABI(애플리케이션 바이너리 인터페이스)](https://docs.soliditylang.org/en/v0.8.10/abi-spec.html)를 따르며, 함수 선택기에 최소 4바이트가 필요합니다. 호출 데이터 크기가 4보다 작으면 0x5E로 점프합니다.

![이 부분에 대한 순서도](flowchart-entry.png)

### 0x5E의 핸들러(비 ABI 호출 데이터용) {#the-handler-at-0x5e-for-non-abi-call-data}

| 오프셋 | 연산 부호        |
| --: | ------------ |
|  5E | JUMPDEST     |
|  5F | CALLDATASIZE |
|  60 | PUSH2 0x007c |
|  63 | JUMPI        |

이 스니펫은 `JUMPDEST`로 시작합니다. EVM(이더리움 가상 머신) 프로그램은 `JUMPDEST`가 아닌 연산 부호로 점프하면 예외를 발생시킵니다. 그런 다음 CALLDATASIZE를 보고 "true"(즉, 0이 아님)이면 0x7C로 점프합니다. 아래에서 살펴보겠습니다.

| 오프셋 | 연산 부호      | 스택(연산 부호 후)                                                         |
| --: | ---------- | -------------------------------------------------------------------------------------- |
|  64 | CALLVALUE  | 호출에서 제공하는 [Wei](/glossary/#wei). Solidity에서는 `msg.value`라고 합니다         |
|  65 | PUSH1 0x06 | 6 CALLVALUE                                                                            |
|  67 | PUSH1 0x00 | 0 6 CALLVALUE                                                                          |
|  69 | DUP3       | CALLVALUE 0 6 CALLVALUE                                                                |
|  6A | DUP3       | 6 CALLVALUE 0 6 CALLVALUE                                                              |
|  6B | SLOAD      | Storage[6] CALLVALUE 0 6 CALLVALUE |

따라서 호출 데이터가 없으면 Storage[6]의 값을 읽습니다. 이 값이 무엇인지는 아직 모르지만, 계약이 호출 데이터 없이 수신한 트랜잭션을 찾아볼 수 있습니다. 호출 데이터 없이(따라서 메서드 없이) ETH만 전송하는 트랜잭션은 Etherscan에 `Transfer` 메서드가 있습니다. 실제로 [계약이 받은 첫 번째 트랜잭션](https://etherscan.io/tx/0xeec75287a583c36bcc7ca87685ab41603494516a0f5986d18de96c8e630762e7)은 전송입니다.

해당 트랜잭션을 살펴보고 **더 보려면 클릭**을 클릭하면 입력 데이터라고 하는 호출 데이터가 실제로 비어 있음(`0x`)을 알 수 있습니다. 값이 1.559ETH라는 점도 주목하십시오. 이는 나중에 관련이 있습니다.

![호출 데이터가 비어 있습니다](calldata-empty.png)

다음으로 **상태** 탭을 클릭하고 리버스 엔지니어링 중인 계약(0x2510...)을 확장합니다. `Storage[6]`이 트랜잭션 중에 변경되었음을 볼 수 있으며, 16진수를 **숫자**로 변경하면 1,559,000,000,000,000,000, 즉 wei로 전송된 값(명확성을 위해 쉼표를 추가함)이 되어 다음 계약 값에 해당함을 볼 수 있습니다.

![Storage[6]의 변경 사항](storage6.png)

[동일한 기간의 다른 `전송` 트랜잭션으로 인한 상태 변경](https://etherscan.io/tx/0xf708d306de39c422472f43cb975d97b66fd5d6a6863db627067167cbf93d84d1#statechange)을 살펴보면 `Storage[6]`이 한동안 계약의 가치를 추적했음을 알 수 있습니다. 지금은 `Value*`라고 부르겠습니다. 별표(`*`)는 이 변수가 아직 무엇을 하는지 _모른다_는 것을 상기시켜 주지만, `ADDRESS BALANCE`를 사용하여 계정 잔액을 얻을 수 있을 때 매우 비싼 저장 공간을 사용할 필요가 없기 때문에 계약 값을 추적하는 것만으로는 충분하지 않습니다. 첫 번째 연산 부호는 계약 자체의 주소를 푸시합니다. 두 번째는 스택 맨 위에 있는 주소를 읽고 해당 주소의 잔액으로 바꿉니다.

| 오프셋 | 연산 부호        | 스택                                          |
| --: | ------------ | ------------------------------------------- |
|  6C | PUSH2 0x0075 | 0x75 Value\* CALLVALUE 0 6 CALLVALUE        |
|  6F | SWAP2        | CALLVALUE Value\* 0x75 0 6 CALLVALUE        |
|  70 | SWAP1        | Value\* CALLVALUE 0x75 0 6 CALLVALUE        |
|  71 | PUSH2 0x01a7 | 0x01A7 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|  74 | JUMP         |                                             |

점프 대상에서 이 코드를 계속 추적할 것입니다.

| 오프셋 | 연산 부호      | 스택                                                          |
| --: | ---------- | ----------------------------------------------------------- |
| 1A7 | JUMPDEST   | Value\* CALLVALUE 0x75 0 6 CALLVALUE                        |
| 1A8 | PUSH1 0x00 | 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE                   |
| 1AA | DUP3       | CALLVALUE 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE         |
| 1AB | NOT        | 2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |

`NOT`은 비트 단위이므로 호출 값의 모든 비트 값을 반전시킵니다.

| 오프셋 | 연산 부호        | 스택                                                                                                     |
| --: | ------------ | ------------------------------------------------------------------------------------------------------ |
| 1AC | DUP3         | Value\* 2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE                                    |
| 1AD | GT           | Value\*>2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE                                    |
| 1AE | ISZERO       | Value\*\<=2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE        |
| 1AF | PUSH2 0x01df | 0x01DF Value\*\<=2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
| 1B2 | JUMPI        |                                                                                                        |

`Value*`가 2^256-CALLVALUE-1보다 작거나 같으면 점프합니다. 이는 오버플로우를 방지하기 위한 로직으로 보입니다. 실제로 몇 가지 무의미한 작업(예: 메모리에 쓰기 직전에 삭제됨) 후 오프셋 0x01DE에서 오버플로우가 감지되면 계약이 되돌려지며, 이는 정상적인 동작입니다.

이러한 오버플로우는 호출 값에 `Value*`를 더한 값이 2^256 wei(약 10^59 ETH)에 필적해야 하므로 발생할 가능성이 매우 낮습니다. [작성 시점의 총 ETH 공급량은 2억 미만입니다](https://etherscan.io/stat/supply).

| 오프셋 | 연산 부호    | 스택                                        |
| --: | -------- | ----------------------------------------- |
| 1DF | JUMPDEST | 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
| 1E0 | POP      | Value\* CALLVALUE 0x75 0 6 CALLVALUE      |
| 1E1 | ADD      | Value\*+CALLVALUE 0x75 0 6 CALLVALUE      |
| 1E2 | SWAP1    | 0x75 Value\*+CALLVALUE 0 6 CALLVALUE      |
| 1E3 | JUMP     |                                           |

여기에 도착하면 `Value* + CALLVALUE`를 가져와 오프셋 0x75로 점프합니다.

| 오프셋 | 연산 부호    | 스택                              |
| --: | -------- | ------------------------------- |
|  75 | JUMPDEST | Value\*+CALLVALUE 0 6 CALLVALUE |
|  76 | SWAP1    | 0 Value\*+CALLVALUE 6 CALLVALUE |
|  77 | SWAP2    | 6 Value\*+CALLVALUE 0 CALLVALUE |
|  78 | SSTORE   | 0 CALLVALUE                     |

여기에 도착하면(호출 데이터가 비어 있어야 함) `Value*`에 호출 값을 추가합니다. 이는 `전송` 트랜잭션이 수행하는 작업과 일치합니다.

| 오프셋 | 연산 부호 |
| --: | ----- |
|  79 | POP   |
|  7A | POP   |
|  7B | STOP  |

마지막으로 스택을 지우고(필수는 아님) 트랜잭션이 성공적으로 끝났음을 알립니다.

요약하자면, 다음은 초기 코드에 대한 순서도입니다.

![진입점 순서도](flowchart-entry.png)

## 0x7C의 핸들러 {#the-handler-at-0x7c}

이 핸들러가 무엇을 하는지 제목에 일부러 넣지 않았습니다. 요점은 이 특정 계약이 어떻게 작동하는지 가르치는 것이 아니라 계약을 리버스 엔지니어링하는 방법을 가르치는 것입니다. 코드를 따라 제가 했던 것과 같은 방식으로 코드가 무엇을 하는지 배울 것입니다.

우리는 여러 곳에서 여기에 도착합니다:

- 1, 2 또는 3바이트의 호출 데이터가 있는 경우(오프셋 0x63에서)
- 메서드 서명을 알 수 없는 경우(오프셋 0x42 및 0x5D에서)

| 오프셋 | 연산 부호        | 스택                                                                       |
| --: | ------------ | ------------------------------------------------------------------------ |
|  7C | JUMPDEST     |                                                                          |
|  7D | PUSH1 0x00   | 0x00                                                                     |
|  7F | PUSH2 0x009d | 0x9D 0x00                                                                |
|  82 | PUSH1 0x03   | 0x03 0x9D 0x00                                                           |
|  84 | SLOAD        | Storage[3] 0x9D 0x00 |

이것은 또 다른 저장 공간 셀이며, 어떤 트랜잭션에서도 찾을 수 없었기 때문에 무엇을 의미하는지 알기가 더 어렵습니다. 아래 코드를 보면 더 명확해질 것입니다.

| 오프셋 | 연산 부호                                             | 스택                                                                                                                                                  |
| --: | ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
|  85 | PUSH20 0xffffffffffffffffffffffffffffffffffffffff | 0xff....ff Storage[3] 0x9D 0x00 |
|  9A | AND                                               | Storage[3]-as-address 0x9D 0x00                                                                 |

이 연산 부호는 Storage[3]에서 읽은 값을 이더리움 주소의 길이인 160비트로 자릅니다.

| 오프셋 | 연산 부호 | 스택                                                                                  |
| --: | ----- | ----------------------------------------------------------------------------------- |
|  9B | SWAP1 | 0x9D Storage[3]-as-address 0x00 |
|  9C | JUMP  | Storage[3]-as-address 0x00      |

다음 연산 부호로 이동하므로 이 점프는 불필요합니다. 이 코드는 가능한 만큼 가스 효율적이지 않습니다.

| 오프셋 | 연산 부호      | 스택                                                                                                                                      |
| --: | ---------- | --------------------------------------------------------------------------------------------------------------------------------------- |
|  9D | JUMPDEST   | Storage[3]-as-address 0x00                                                          |
|  9E | SWAP1      | 0x00 Storage[3]-as-address                                                          |
|  9F | POP        | Storage[3]-as-address                                                               |
|  A0 | PUSH1 0x40 | 0x40 Storage[3]-as-address                                                          |
|  A2 | MLOAD      | Mem[0x40] Storage[3]-as-address |

코드 맨 처음에 Mem[0x40]을 0x80으로 설정했습니다. 나중에 0x40을 찾아보면 변경하지 않은 것을 알 수 있으므로 0x80이라고 가정할 수 있습니다.

| 오프셋 | 연산 부호        | 스택                                                                                                    |
| --: | ------------ | ----------------------------------------------------------------------------------------------------- |
|  A3 | CALLDATASIZE | CALLDATASIZE 0x80 Storage[3]-as-address           |
|  A4 | PUSH1 0x00   | 0x00 CALLDATASIZE 0x80 Storage[3]-as-address      |
|  A6 | DUP3         | 0x80 0x00 CALLDATASIZE 0x80 Storage[3]-as-address |
|  A7 | CALLDATACOPY | 0x80 Storage[3]-as-address                        |

모든 호출 데이터를 0x80부터 시작하여 메모리에 복사합니다.

| 오프셋 | 연산 부호                              | 스택                                                                                                                                                                                       |
| --: | ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|  A8 | PUSH1 0x00                         | 0x00 0x80 Storage[3]-as-address                                                                                                      |
|  AA | DUP1                               | 0x00 0x00 0x80 Storage[3]-as-address                                                                                                 |
|  AB | CALLDATASIZE                       | CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address                                                                                    |
|  AC | DUP4                               | 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address                                                                               |
|  AD | DUP6                               | Storage[3]-as-address 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address     |
|  AE | GAS                                | GAS Storage[3]-as-address 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address |
|  AF | DELEGATE_CALL |                                                                                                                                                                                          |

이제 훨씬 명확해졌습니다. 이 계약은 [프록시](https://blog.openzeppelin.com/proxy-patterns/) 역할을 하여 Storage[3]의 주소를 호출하여 실제 작업을 수행할 수 있습니다. `DELEGATE_CALL`은 별도의 계약을 호출하지만 동일한 저장 공간에 머물러 있습니다. 이는 우리가 프록시인 위임된 계약이 동일한 저장 공간 공간에 액세스한다는 것을 의미합니다. 호출 매개 변수는 다음과 같습니다.

- _가스_: 남은 모든 가스
- _호출된 주소_: Storage[3]-as-address
- _호출 데이터_: 0x80에서 시작하는 CALLDATASIZE 바이트. 여기에 원래 호출 데이터를 넣습니다.
- _반환 데이터_: 없음(0x00 - 0x00) 다른 방법으로 반환 데이터를 얻을 것입니다(아래 참조).

| 오프셋 | 연산 부호          | 스택                                                                                                                                                                                             |
| --: | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|  B0 | RETURNDATASIZE | RETURNDATASIZE (((호출 성공/실패))) 0x80 Storage[3]-as-address                          |
|  B1 | DUP1           | RETURNDATASIZE RETURNDATASIZE (((호출 성공/실패))) 0x80 Storage[3]-as-address           |
|  B2 | PUSH1 0x00     | 0x00 RETURNDATASIZE RETURNDATASIZE (((호출 성공/실패))) 0x80 Storage[3]-as-address      |
|  B4 | DUP5           | 0x80 0x00 RETURNDATASIZE RETURNDATASIZE (((호출 성공/실패))) 0x80 Storage[3]-as-address |
|  B5 | RETURNDATACOPY | RETURNDATASIZE (((호출 성공/실패))) 0x80 Storage[3]-as-address                          |

여기에서 모든 반환 데이터를 0x80에서 시작하는 메모리 버퍼에 복사합니다.

| 오프셋 | 연산 부호        | 스택                                                                                                                                                                                                                                                                                                                           |
| --: | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|  B6 | DUP2         | (((호출 성공/실패))) RETURNDATASIZE (((호출 성공/실패))) 0x80 Storage[3]-as-address                                                                                |
|  B7 | DUP1         | (((호출 성공/실패))) (((호출 성공/실패))) RETURNDATASIZE (((호출 성공/실패))) 0x80 Storage[3]-as-address        |
|  B8 | ISZERO       | (((호출에 실패했습니까))) (((호출 성공/실패))) RETURNDATASIZE (((호출 성공/실패))) 0x80 Storage[3]-as-address      |
|  B9 | PUSH2 0x00c0 | 0xC0 (((호출에 실패했습니까))) (((호출 성공/실패))) RETURNDATASIZE (((호출 성공/실패))) 0x80 Storage[3]-as-address |
|  BC | JUMPI        | (((호출 성공/실패))) RETURNDATASIZE (((호출 성공/실패))) 0x80 Storage[3]-as-address                                                                                |
|  BD | DUP2         | RETURNDATASIZE (((호출 성공/실패))) RETURNDATASIZE (((호출 성공/실패))) 0x80 Storage[3]-as-address                                                                 |
|  BE | DUP5         | 0x80 RETURNDATASIZE (((호출 성공/실패))) RETURNDATASIZE (((호출 성공/실패))) 0x80 Storage[3]-as-address                                                            |
|  BF | RETURN       |                                                                                                                                                                                                                                                                                                                              |

따라서 호출 후 반환 데이터를 버퍼 0x80 - 0x80+RETURNDATASIZE에 복사하고 호출이 성공하면 해당 버퍼로 `RETURN`합니다.

### DELEGATECALL 실패 {#delegatecall-failed}

여기 0xC0에 도착하면 우리가 호출한 계약이 되돌려졌다는 의미입니다. 우리는 해당 계약의 프록시일 뿐이므로 동일한 데이터를 반환하고 되돌리고 싶습니다.

| 오프셋 | 연산 부호    | 스택                                                                                                                                                                                                                                                                |
| --: | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|  C0 | JUMPDEST | (((호출 성공/실패))) RETURNDATASIZE (((호출 성공/실패))) 0x80 Storage[3]-as-address                     |
|  C1 | DUP2     | RETURNDATASIZE (((호출 성공/실패))) RETURNDATASIZE (((호출 성공/실패))) 0x80 Storage[3]-as-address      |
|  C2 | DUP5     | 0x80 RETURNDATASIZE (((호출 성공/실패))) RETURNDATASIZE (((호출 성공/실패))) 0x80 Storage[3]-as-address |
|  C3 | REVERT   |                                                                                                                                                                                                                                                                   |

따라서 이전에 `RETURN`에 사용했던 것과 동일한 버퍼로 `REVERT`합니다: 0x80 - 0x80+RETURNDATASIZE

![프록시 호출 순서도](flowchart-proxy.png)

## ABI 호출 {#abi-calls}

호출 데이터 크기가 4바이트 이상이면 유효한 ABI 호출일 수 있습니다.

| 오프셋 | 연산 부호        | 스택                                                                                                        |
| --: | ------------ | --------------------------------------------------------------------------------------------------------- |
|   D | PUSH1 0x00   | 0x00                                                                                                      |
|   F | CALLDATALOAD | (((호출 데이터의 첫 단어(256비트)))      |
|  10 | PUSH1 0xe0   | 0xE0 (((호출 데이터의 첫 단어(256비트))) |
|  12 | SHR          | (((호출 데이터의 처음 32비트(4바이트)))    |

Etherscan은 `1C`가 알려지지 않은 연산 부호라고 알려주는데, [Etherscan이 이 기능을 작성한 후에 추가되었고](https://eips.ethereum.org/EIPS/eip-145) 업데이트되지 않았기 때문입니다. [최신 연산 부호 표](https://github.com/wolflo/evm-opcodes)를 보면 이것이 오른쪽 시프트임을 알 수 있습니다.

| 오프셋 | 연산 부호            | 스택                                                                                                                                                                                                                       |
| --: | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|  13 | DUP1             | (((호출 데이터의 처음 32비트(4바이트))) (((호출 데이터의 처음 32비트(4바이트)))            |
|  14 | PUSH4 0x3cd8045e | 0x3CD8045E (((호출 데이터의 처음 32비트(4바이트))) (((호출 데이터의 처음 32비트(4바이트))) |
|  19 | GT               | 0x3CD8045E>호출 데이터의 처음 32비트 (((호출 데이터의 처음 32비트(4바이트)))                                                                                        |
|  1A | PUSH2 0x0043     | 0x43 0x3CD8045E>호출 데이터의 처음 32비트 (((호출 데이터의 처음 32비트(4바이트)))                                                                                   |
|  1D | JUMPI            | (((호출 데이터의 처음 32비트(4바이트)))                                                                                                                   |

이처럼 메서드 서명 일치 테스트를 둘로 나누면 평균적으로 테스트의 절반을 절약할 수 있습니다. 이를 바로 뒤따르는 코드와 0x43의 코드는 동일한 패턴을 따릅니다: 호출 데이터의 처음 32비트를 `DUP1`하고, `PUSH4 (((메서드 서명))`을 실행하고, `EQ`를 실행하여 동등성을 확인한 다음, 메서드 서명이 일치하면 `JUMPI`합니다. 다음은 메서드 서명, 해당 주소, 그리고 알려진 경우 [해당 메서드 정의](https://www.4byte.directory/)입니다.

| 메서드                                                                                                       | 메서드 서명     | 점프할 오프셋 |
| --------------------------------------------------------------------------------------------------------- | ---------- | ------- |
| [splitter()](https://www.4byte.directory/signatures/?bytes4_signature=0x3cd8045e)      | 0x3cd8045e | 0x0103  |
| ???                                                                                                       | 0x81e580d3 | 0x0138  |
| [currentWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0xba0bafb4) | 0xba0bafb4 | 0x0158  |
| ???                                                                                                       | 0x1f135823 | 0x00C4  |
| [merkleRoot()](https://www.4byte.directory/signatures/?bytes4_signature=0x2eb4a7ab)    | 0x2eb4a7ab | 0x00ED  |

일치하는 항목이 없으면 코드는 프록시인 계약에 일치하는 항목이 있기를 바라며 [0x7C의 프록시 핸들러](#the-handler-at-0x7c)로 점프합니다.

![ABI 호출 순서도](flowchart-abi.png)

## splitter() {#splitter}

| 오프셋 | 연산 부호        | 스택                            |
| --: | ------------ | ----------------------------- |
| 103 | JUMPDEST     |                               |
| 104 | CALLVALUE    | CALLVALUE                     |
| 105 | DUP1         | CALLVALUE CALLVALUE           |
| 106 | ISZERO       | CALLVALUE==0 CALLVALUE        |
| 107 | PUSH2 0x010f | 0x010F CALLVALUE==0 CALLVALUE |
| 10A | JUMPI        | CALLVALUE                     |
| 10B | PUSH1 0x00   | 0x00 CALLVALUE                |
| 10D | DUP1         | 0x00 0x00 CALLVALUE           |
| 10E | REVERT       |                               |

이 함수가 가장 먼저 하는 일은 호출이 ETH를 보내지 않았는지 확인하는 것입니다. 이 함수는 [`payable`이 아닙니다](https://solidity-by-example.org/payable/). 누군가 우리에게 ETH를 보냈다면 그것은 실수임에 틀림없으며, 그들이 다시 돌려받을 수 없는 곳에 ETH가 있는 것을 피하기 위해 `REVERT`하고 싶습니다.

| 오프셋 | 연산 부호                                             | 스택                                                                                                                                                                                                          |
| --: | ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 10F | JUMPDEST                                          |                                                                                                                                                                                                             |
| 110 | POP                                               |                                                                                                                                                                                                             |
| 111 | PUSH1 0x03                                        | 0x03                                                                                                                                                                                                        |
| 113 | SLOAD                                             | (((Storage[3], 즉 우리가 프록시인 계약)))                                                                |
| 114 | PUSH1 0x40                                        | 0x40 (((Storage[3], 즉 우리가 프록시인 계약)))                                                           |
| 116 | MLOAD                                             | 0x80 (((Storage[3], 즉 우리가 프록시인 계약)))                                                           |
| 117 | PUSH20 0xffffffffffffffffffffffffffffffffffffffff | 0xFF...FF 0x80 (((Storage[3], 즉 우리가 프록시인 계약))) |
| 12C | SWAP1                                             | 0x80 0xFF...FF (((Storage[3], 즉 우리가 프록시인 계약))) |
| 12D | SWAP2                                             | (((Storage[3], 즉 우리가 프록시인 계약))) 0xFF...FF 0x80 |
| 12E | AND                                               | ProxyAddr 0x80                                                                                                                                                                                              |
| 12F | DUP2                                              | 0x80 ProxyAddr 0x80                                                                                                                                                                                         |
| 130 | MSTORE                                            | 0x80                                                                                                                                                                                                        |

그리고 0x80은 이제 프록시 주소를 포함합니다.

| 오프셋 | 연산 부호        | 스택        |
| --: | ------------ | --------- |
| 131 | PUSH1 0x20   | 0x20 0x80 |
| 133 | ADD          | 0xA0      |
| 134 | PUSH2 0x00e4 | 0xE4 0xA0 |
| 137 | JUMP         | 0xA0      |

### E4 코드 {#the-e4-code}

이 줄은 처음 보지만 다른 메서드와 공유됩니다(아래 참조). 따라서 스택의 값을 X라고 부르고, `splitter()`에서 이 X의 값이 0xA0이라는 것을 기억하십시오.

| 오프셋 | 연산 부호      | 스택          |
| --: | ---------- | ----------- |
|  E4 | JUMPDEST   | X           |
|  E5 | PUSH1 0x40 | 0x40 X      |
|  E7 | MLOAD      | 0x80 X      |
|  E8 | DUP1       | 0x80 0x80 X |
|  E9 | SWAP2      | X 0x80 0x80 |
|  EA | SUB        | X-0x80 0x80 |
|  EB | SWAP1      | 0x80 X-0x80 |
|  EC | RETURN     |             |

따라서 이 코드는 스택(X)에서 메모리 포인터를 수신하고 계약이 0x80 - X인 버퍼로 `RETURN`하도록 합니다.

`splitter()`의 경우, 이는 우리가 프록시인 주소를 반환합니다. `RETURN`은 0x80-0x9F의 버퍼를 반환하며, 여기에 이 데이터를 썼습니다(위 오프셋 0x130).

## currentWindow() {#currentwindow}

오프셋 0x158-0x163의 코드는 `splitter()`의 0x103-0x10E에서 본 것과 동일하므로(`JUMPI` 대상 제외), `currentWindow()`도 `payable`이 아님을 알 수 있습니다.

| 오프셋 | 연산 부호        | 스택                                                                       |
| --: | ------------ | ------------------------------------------------------------------------ |
| 164 | JUMPDEST     |                                                                          |
| 165 | POP          |                                                                          |
| 166 | PUSH2 0x00da | 0xDA                                                                     |
| 169 | PUSH1 0x01   | 0x01 0xDA                                                                |
| 16B | SLOAD        | Storage[1] 0xDA      |
| 16C | DUP2         | 0xDA Storage[1] 0xDA |
| 16D | JUMP         | Storage[1] 0xDA      |

### DA 코드 {#the-da-code}

이 코드는 다른 메서드와도 공유됩니다. 따라서 스택의 값을 Y라고 부르고, `currentWindow()`에서 이 Y의 값이 Storage[1]이라는 것을 기억하십시오.

| 오프셋 | 연산 부호      | 스택               |
| --: | ---------- | ---------------- |
|  DA | JUMPDEST   | Y 0xDA           |
|  DB | PUSH1 0x40 | 0x40 Y 0xDA      |
|  DD | MLOAD      | 0x80 Y 0xDA      |
|  DE | SWAP1      | Y 0x80 0xDA      |
|  DF | DUP2       | 0x80 Y 0x80 0xDA |
|  E0 | MSTORE     | 0x80 0xDA        |

Y를 0x80-0x9F에 씁니다.

| 오프셋 | 연산 부호      | 스택             |
| --: | ---------- | -------------- |
|  E1 | PUSH1 0x20 | 0x20 0x80 0xDA |
|  E3 | ADD        | 0xA0 0xDA      |

그리고 나머지는 이미 [위에서](#the-e4-code) 설명했습니다. 따라서 0xDA로 점프하면 스택 맨 위(Y)를 0x80-0x9F에 쓰고 해당 값을 반환합니다. `currentWindow()`의 경우 Storage[1]을 반환합니다.

## merkleRoot() {#merkleroot}

오프셋 0xED-0xF8의 코드는 `splitter()`의 0x103-0x10E에서 본 것과 동일하므로(`JUMPI` 대상 제외), `merkleRoot()`도 `payable`이 아님을 알 수 있습니다.

| 오프셋 | 연산 부호        | 스택                                                                       |
| --: | ------------ | ------------------------------------------------------------------------ |
|  F9 | JUMPDEST     |                                                                          |
|  FA | POP          |                                                                          |
|  FB | PUSH2 0x00da | 0xDA                                                                     |
|  FE | PUSH1 0x00   | 0x00 0xDA                                                                |
| 100 | SLOAD        | Storage[0] 0xDA      |
| 101 | DUP2         | 0xDA Storage[0] 0xDA |
| 102 | JUMP         | Storage[0] 0xDA      |

점프 후에 일어나는 일은 [이미 알아냈습니다](#the-da-code). 따라서 `merkleRoot()`는 Storage[0]을 반환합니다.

## 0x81e580d3 {#0x81e580d3}

오프셋 0x138-0x143의 코드는 `splitter()`의 0x103-0x10E에서 본 것과 동일하므로(`JUMPI` 대상 제외), 이 함수도 `payable`이 아님을 알 수 있습니다.

| 오프셋 | 연산 부호        | 스택                                                                              |
| --: | ------------ | ------------------------------------------------------------------------------- |
| 144 | JUMPDEST     |                                                                                 |
| 145 | POP          |                                                                                 |
| 146 | PUSH2 0x00da | 0xDA                                                                            |
| 149 | PUSH2 0x0153 | 0x0153 0xDA                                                                     |
| 14C | CALLDATASIZE | CALLDATASIZE 0x0153 0xDA                                                        |
| 14D | PUSH1 0x04   | 0x04 CALLDATASIZE 0x0153 0xDA                                                   |
| 14F | PUSH2 0x018f | 0x018F 0x04 CALLDATASIZE 0x0153 0xDA                                            |
| 152 | JUMP         | 0x04 CALLDATASIZE 0x0153 0xDA                                                   |
| 18F | JUMPDEST     | 0x04 CALLDATASIZE 0x0153 0xDA                                                   |
| 190 | PUSH1 0x00   | 0x00 0x04 CALLDATASIZE 0x0153 0xDA                                              |
| 192 | PUSH1 0x20   | 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                                         |
| 194 | DUP3         | 0x04 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                                    |
| 195 | DUP5         | CALLDATASIZE 0x04 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                       |
| 196 | SUB          | CALLDATASIZE-4 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                          |
| 197 | SLT          | CALLDATASIZE-4\<32 0x00 0x04 CALLDATASIZE 0x0153 0xDA |
| 198 | ISZERO       | CALLDATASIZE-4>=32 0x00 0x04 CALLDATASIZE 0x0153 0xDA                           |
| 199 | PUSH2 0x01a0 | 0x01A0 CALLDATASIZE-4>=32 0x00 0x04 CALLDATASIZE 0x0153 0xDA                    |
| 19C | JUMPI        | 0x00 0x04 CALLDATASIZE 0x0153 0xDA                                              |

이 함수는 최소 32바이트(한 단어)의 호출 데이터를 사용하는 것 같습니다.

| 오프셋 | 연산 부호  | 스택                                           |
| --: | ------ | -------------------------------------------- |
| 19D | DUP1   | 0x00 0x00 0x04 CALLDATASIZE 0x0153 0xDA      |
| 19E | DUP2   | 0x00 0x00 0x00 0x04 CALLDATASIZE 0x0153 0xDA |
| 19F | REVERT |                                              |

호출 데이터를 얻지 못하면 트랜잭션은 반환 데이터 없이 되돌려집니다.

함수가 필요한 호출 데이터를 _얻을_ 경우 어떻게 되는지 봅시다.

| 오프셋 | 연산 부호        | 스택                                                          |
| --: | ------------ | ----------------------------------------------------------- |
| 1A0 | JUMPDEST     | 0x00 0x04 CALLDATASIZE 0x0153 0xDA                          |
| 1A1 | POP          | 0x04 CALLDATASIZE 0x0153 0xDA                               |
| 1A2 | CALLDATALOAD | calldataload(4) CALLDATASIZE 0x0153 0xDA |

`calldataload(4)`는 메서드 서명 _후_의 호출 데이터의 첫 단어입니다.

| 오프셋 | 연산 부호        | 스택                                                                                                                                                                                                                   |
| --: | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1A3 | SWAP2        | 0x0153 CALLDATASIZE calldataload(4) 0xDA                                                                                                                                                          |
| 1A4 | SWAP1        | CALLDATASIZE 0x0153 calldataload(4) 0xDA                                                                                                                                                          |
| 1A5 | POP          | 0x0153 calldataload(4) 0xDA                                                                                                                                                                       |
| 1A6 | JUMP         | calldataload(4) 0xDA                                                                                                                                                                              |
| 153 | JUMPDEST     | calldataload(4) 0xDA                                                                                                                                                                              |
| 154 | PUSH2 0x016e | 0x016E calldataload(4) 0xDA                                                                                                                                                                       |
| 157 | JUMP         | calldataload(4) 0xDA                                                                                                                                                                              |
| 16E | JUMPDEST     | calldataload(4) 0xDA                                                                                                                                                                              |
| 16F | PUSH1 0x04   | 0x04 calldataload(4) 0xDA                                                                                                                                                                         |
| 171 | DUP2         | calldataload(4) 0x04 calldataload(4) 0xDA                                                                                                                                      |
| 172 | DUP2         | 0x04 calldataload(4) 0x04 calldataload(4) 0xDA                                                                                                                                 |
| 173 | SLOAD        | Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA                                                                       |
| 174 | DUP2         | calldataload(4) Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA                                    |
| 175 | LT           | calldataload(4)\<Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA         |
| 176 | PUSH2 0x017e | 0x017EC calldataload(4)\<Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA |
| 179 | JUMPI        | calldataload(4) 0x04 calldataload(4) 0xDA                                                                                                                                      |

첫 번째 단어가 Storage[4]보다 작지 않으면 함수가 실패합니다. 반환된 값 없이 되돌립니다:

| 오프셋 | 연산 부호      | 스택                                                            |
| --: | ---------- | ------------------------------------------------------------- |
| 17A | PUSH1 0x00 | 0x00 ...      |
| 17C | DUP1       | 0x00 0x00 ... |
| 17D | REVERT     |                                                               |

calldataload(4)가 Storage[4]보다 작으면 이 코드를 얻습니다.

| 오프셋 | 연산 부호      | 스택                                                                                        |
| --: | ---------- | ----------------------------------------------------------------------------------------- |
| 17E | JUMPDEST   | calldataload(4) 0x04 calldataload(4) 0xDA           |
| 17F | PUSH1 0x00 | 0x00 calldataload(4) 0x04 calldataload(4) 0xDA      |
| 181 | SWAP2      | 0x04 calldataload(4) 0x00 calldataload(4) 0xDA      |
| 182 | DUP3       | 0x00 0x04 calldataload(4) 0x00 calldataload(4) 0xDA |
| 183 | MSTORE     | calldataload(4) 0x00 calldataload(4) 0xDA           |

그리고 메모리 위치 0x00-0x1F는 이제 데이터 0x04를 포함합니다(0x00-0x1E는 모두 0이고 0x1F는 4입니다).

| 오프셋 | 연산 부호      | 스택                                                                                                                                                                                                                       |
| --: | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 184 | PUSH1 0x20 | 0x20 calldataload(4) 0x00 calldataload(4) 0xDA                                                                                                                                     |
| 186 | SWAP1      | calldataload(4) 0x20 0x00 calldataload(4) 0xDA                                                                                                                                     |
| 187 | SWAP2      | 0x00 0x20 calldataload(4) calldataload(4) 0xDA                                                                                                                                     |
| 188 | SHA3       | (((0x00-0x1F의 SHA3))) calldataload(4) calldataload(4) 0xDA                                                                |
| 189 | ADD        | (((0x00-0x1F의 SHA3)))+calldataload(4) calldataload(4) 0xDA                                                                |
| 18A | SLOAD      | Storage[(((0x00-0x1F의 SHA3))) + calldataload(4)] calldataload(4) 0xDA |

따라서 저장 공간에는 0x000...0004의 SHA3에서 시작하여 모든 합법적인 호출 데이터 값(Storage[4] 아래 값)에 대한 항목이 있는 조회 테이블이 있습니다.

| 오프셋 | 연산 부호 | 스택                                                                                                                                                                                                                       |
| --: | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 18B | SWAP1 | calldataload(4) Storage[(((0x00-0x1F의 SHA3))) + calldataload(4)] 0xDA |
| 18C | POP   | Storage[(((0x00-0x1F의 SHA3))) + calldataload(4)] 0xDA                                    |
| 18D | DUP2  | 0xDA Storage[(((0x00-0x1F의 SHA3))) + calldataload(4)] 0xDA                               |
| 18E | JUMP  | Storage[(((0x00-0x1F의 SHA3))) + calldataload(4)] 0xDA                                    |

우리는 이미 [오프셋 0xDA의 코드](#the-da-code)가 무엇을 하는지 알고 있으며, 스택 맨 위 값을 호출자에게 반환합니다. 따라서 이 함수는 조회 테이블의 값을 호출자에게 반환합니다.

## 0x1f135823 {#0x1f135823}

오프셋 0xC4-0xCF의 코드는 `splitter()`의 0x103-0x10E에서 본 것과 동일하므로(`JUMPI` 대상 제외), 이 함수도 `payable`이 아님을 알 수 있습니다.

| 오프셋 | 연산 부호        | 스택                |
| --: | ------------ | ----------------- |
|  D0 | JUMPDEST     |                   |
|  D1 | POP          |                   |
|  D2 | PUSH2 0x00da | 0xDA              |
|  D5 | PUSH1 0x06   | 0x06 0xDA         |
|  D7 | SLOAD        | Value\* 0xDA      |
|  D8 | DUP2         | 0xDA Value\* 0xDA |
|  D9 | JUMP         | Value\* 0xDA      |

우리는 이미 [오프셋 0xDA의 코드](#the-da-code)가 무엇을 하는지 알고 있으며, 스택 맨 위 값을 호출자에게 반환합니다. 따라서 이 함수는 `Value*`를 반환합니다.

### 메서드 요약 {#method-summary}

이 시점에서 계약을 이해하고 있다고 느끼십니까? 그렇지 않습니다. 지금까지 다음과 같은 메서드를 살펴보았습니다.

| 메서드                                                  | 의미                                                                                                               |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| 전송                                                   | 호출에서 제공된 값을 수락하고 `Value*`를 해당 금액만큼 증가시킵니다.                                                       |
| [splitter()](#splitter)           | 프록시 주소인 Storage[3]을 반환합니다.                   |
| [currentWindow()](#currentwindow) | Storage[1] 반환                                                |
| [merkleRoot()](#merkeroot)        | Storage[0] 반환                                                |
| [0x81e580d3](#0x81e580d3)                            | 매개 변수가 Storage[4]보다 작은 경우 조회 테이블에서 값을 반환합니다. |
| [0x1f135823](#0x1f135823)                            | Storage[6] 반환(일명 값\*                      |

그러나 다른 기능은 Storage[3]의 계약에서 제공된다는 것을 알고 있습니다. 아마도 그 계약이 무엇인지 알면 단서를 얻을 수 있을 것입니다. 고맙게도 이것은 블록체인이며 적어도 이론적으로는 모든 것이 알려져 있습니다. Storage[3]을 설정하는 메서드를 보지 못했으므로 생성자가 설정했을 것입니다.

## 생성자 {#the-constructor}

[계약을 살펴보면](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f) 해당 계약을 생성한 트랜잭션도 볼 수 있습니다.

![생성 트랜잭션 클릭](create-tx.png)

해당 트랜잭션을 클릭한 다음 **상태** 탭을 클릭하면 매개 변수의 초기 값을 볼 수 있습니다. 특히 Storage[3]에 [0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761](https://etherscan.io/address/0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761)이 포함되어 있음을 알 수 있습니다. 해당 계약에는 누락된 기능이 포함되어 있어야 합니다. 조사 중인 계약에 사용한 것과 동일한 도구를 사용하여 이해할 수 있습니다.

## 프록시 계약 {#the-proxy-contract}

위의 원래 계약에 사용한 것과 동일한 기술을 사용하여 계약이 다음과 같은 경우 되돌려지는 것을 볼 수 있습니다.

- 호출에 연결된 ETH가 있습니다(0x05-0x0F).
- 호출 데이터 크기가 4보다 작습니다(0x10-0x19 및 0xBE-0xC2).

그리고 지원하는 방법은 다음과 같습니다.

| 메서드                                                                                                                                                                                    | 메서드 서명                       | 점프할 오프셋 |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ------- |
| [scaleAmountByPercentage(uint256,uint256)](https://www.4byte.directory/signatures/?bytes4_signature=0x8ffb5c97)                                                     | 0x8ffb5c97                   | 0x0135  |
| [isClaimed(uint256,address)](https://www.4byte.directory/signatures/?bytes4_signature=0xd2ef0795)                                                                   | 0xd2ef0795                   | 0x0151  |
| [claim(uint256,address,uint256,bytes32[])](https://www.4byte.directory/signatures/?bytes4_signature=0x2e7ba6ef) | 0x2e7ba6ef                   | 0x00F4  |
| [incrementWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0x338b1d31)                                                                            | 0x338b1d31                   | 0x0110  |
| ???                                                                                                                                                                                    | 0x3f26479e                   | 0x0118  |
| ???                                                                                                                                                                                    | 0x1e7df9d3                   | 0x00C3  |
| [currentWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0xba0bafb4)                                                                              | [0xba0bafb4](#currentwindow) | 0x0148  |
| [merkleRoot()](https://www.4byte.directory/signatures/?bytes4_signature=0x2eb4a7ab)                                                                                 | [0x2eb4a7ab](#merkleroot)    | 0x0107  |
| ???                                                                                                                                                                                    | [0x81e580d3](#0x81e580d3)    | 0x0122  |
| ???                                                                                                                                                                                    | [0x1f135823](#0x1f135823)    | 0x00D8  |

아래 네 가지 방법은 결코 도달할 수 없으므로 무시할 수 있습니다. 해당 서명은 원래 계약이 자체적으로 처리하도록 되어 있으므로(위의 서명을 클릭하면 자세한 내용을 볼 수 있음), [재정의된 메서드](https://medium.com/upstate-interactive/solidity-override-vs-virtual-functions-c0a5dfb83aaf)임에 틀림없습니다.

남은 메서드 중 하나는 `claim(<params>)`이고 다른 하나는 `isClaimed(<params>)`이므로 에어드랍 계약으로 보입니다. 나머지 연산 부호를 하나씩 살펴보는 대신, 이 계약의 세 함수에 대해 사용 가능한 결과를 생성하는 [디컴파일러를 사용해 볼 수 있습니다](https://etherscan.io/bytecode-decompiler?a=0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761). 다른 것들을 리버스 엔지니어링하는 것은 독자의 연습 과제로 남겨둡니다.

### scaleAmountByPercentage {#scaleamountbypercentage}

이것이 이 함수에 대해 디컴파일러가 제공하는 것입니다.

```python
def unknown8ffb5c97(uint256 _param1, uint256 _param2) payable:
  require calldata.size - 4 >=′ 64
  if _param1 and _param2 > -1 / _param1:
      revert with 0, 17
  return (_param1 * _param2 / 100 * 10^6)
```

첫 번째 `require`는 호출 데이터가 함수 서명의 4바이트 외에 두 매개 변수에 충분한 최소 64바이트를 가지고 있는지 테스트합니다. 그렇지 않다면 분명히 뭔가 잘못된 것입니다.

`if` 문은 `_param1`이 0이 아니고 `_param1 * _param2`가 음수가 아님을 확인하는 것으로 보입니다. 아마도 랩 어라운드(wrap around) 사례를 방지하기 위함일 것입니다.

마지막으로 함수는 확장된 값을 반환합니다.

### claim {#claim}

디컴파일러가 생성하는 코드는 복잡하며, 모든 것이 우리와 관련이 있는 것은 아닙니다. 유용한 정보를 제공한다고 생각되는 줄에 집중하기 위해 일부를 건너뛸 것입니다.

```python
def unknown2e7ba6ef(uint256 _param1, uint256 _param2, uint256 _param3, array _param4) payable:
  ...
  require _param2 == addr(_param2)
  ...
  if currentWindow <= _param1:
      revert with 0, '미래 창에 대한 클레임 불가'
```

여기서 두 가지 중요한 것을 알 수 있습니다.

- `_param2`는 `uint256`으로 선언되었지만 실제로는 주소입니다.
- `_param1`은 클레임되는 창이며, `currentWindow` 또는 그 이전이어야 합니다.

```python
  ...
  if stor5[_claimWindow][addr(_claimFor)]:
      revert with 0, '계정이 이미 해당 창을 클레임했습니다'
```

이제 Storage[5]가 창과 주소의 배열이며, 해당 주소가 해당 창에 대한 보상을 클레임했는지 여부를 알 수 있습니다.

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
      revert with 0, '잘못된 증명'
```

우리는 `unknown2eb4a7ab`가 실제로는 `merkleRoot()` 함수라는 것을 알고 있으므로, 이 코드는 [머클 증명](https://medium.com/crypto-0-nite/merkle-proofs-explained-6dd429623dc5)을 검증하는 것으로 보입니다. 이는 `_param4`가 머클 증명임을 의미합니다.

```python
  call addr(_param2) with:
     value unknown81e580d3[_param1] * _param3 / 100 * 10^6 wei
       gas 30000 wei
```

이것이 계약이 자체 ETH를 다른 주소(계약 또는 외부 소유)로 전송하는 방법입니다. 전송할 금액인 값으로 호출합니다. 따라서 이것은 ETH의 에어드랍으로 보입니다.

```python
  if not return_data.size:
      if not ext_call.success:
          require ext_code.size(stor2)
          call stor2.deposit() with:
             value unknown81e580d3[_param1] * _param3 / 100 * 10^6 wei
```

아래 두 줄은 Storage[2]도 우리가 호출하는 계약임을 알려줍니다. [생성자 트랜잭션을 살펴보면](https://etherscan.io/tx/0xa1ea0549fb349eb7d3aff90e1d6ce7469fdfdcd59a2fd9b8d1f5e420c0d05b58#statechange) 이 계약이 [0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)인 래핑된 이더 계약이며 [소스 코드가 Etherscan에 업로드된](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2#code) 것을 알 수 있습니다.

따라서 계약이 ETH를 `_param2`로 보내려고 시도하는 것으로 보입니다. 할 수 있다면 좋습니다. 그렇지 않으면 [WETH](https://weth.tkn.eth.limo/)를 보내려고 시도합니다. `_param2`가 외부 소유 계정(EOA)인 경우 항상 ETH를 수신할 수 있지만 계약은 ETH 수신을 거부할 수 있습니다. 그러나 WETH는 ERC-20이며 계약은 이를 수락하는 것을 거부할 수 없습니다.

```python
  ...
  log 0xdbd5389f: addr(_param2), unknown81e580d3[_param1] * _param3 / 100 * 10^6, bool(ext_call.success)
```

함수 끝에서 로그 항목이 생성되는 것을 볼 수 있습니다. [생성된 로그 항목을 보고](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f#events) `0xdbd5...`로 시작하는 주제를 필터링합니다. [이러한 항목을 생성한 트랜잭션 중 하나를 클릭하면](https://etherscan.io/tx/0xe7d3b7e00f645af17dfbbd010478ef4af235896c65b6548def1fe95b3b7d2274) 실제로 클레임처럼 보이는 것을 알 수 있습니다. 계정은 리버스 엔지니어링 중인 계약에 메시지를 보냈고, 그 대가로 ETH를 받았습니다.

![클레임 트랜잭션](claim-tx.png)

### 1e7df9d3 {#1e7df9d3}

이 함수는 위의 [`claim`](#claim)과 매우 유사합니다. 또한 머클 증명을 확인하고, ETH를 첫 번째로 전송하려고 시도하며, 동일한 유형의 로그 항목을 생성합니다.

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
      revert with 0, '잘못된 증명'
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

주요 차이점은 첫 번째 매개 변수인 인출할 창이 없다는 것입니다. 대신 클레임할 수 있는 모든 창을 순회하는 루프가 있습니다.

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

따라서 모든 창을 클레임하는 `claim` 변형으로 보입니다.

## 결론 {#conclusion}

이제 연산 부호 또는 (작동하는 경우) 디컴파일러를 사용하여 소스 코드를 사용할 수 없는 계약을 이해하는 방법을 알아야 합니다. 이 글의 길이에서 알 수 있듯이, 계약을 리버스 엔지니어링하는 것은 사소한 일이 아니지만, 보안이 필수적인 시스템에서는 계약이 약속대로 작동하는지 확인할 수 있는 중요한 기술입니다.

[여기서 제 작업에 대한 자세한 내용을 확인하세요](https://cryptodocguy.pro/).
