---
title: 스마트 컨트랙트에서 버그를 찾기 위해 맨티코어(Manticore)를 사용하는 방법
description: 맨티코어를 사용하여 스마트 컨트랙트에서 자동으로 버그를 찾는 방법
author: 트레일오브비츠
lang: ko
tags:
  ["솔리디티", "스마트 컨트랙트", "보안", "테스트", "정형 검증"]
skill: advanced
breadcrumb: 맨티코어
published: 2020-01-13
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore
---

이 튜토리얼의 목적은 맨티코어를 사용하여 스마트 컨트랙트에서 자동으로 버그를 찾는 방법을 보여주는 것입니다.

## 설치 {#installation}

맨티코어는 Python 3.6 이상이 필요합니다. pip를 통해 설치하거나 Docker를 사용하여 설치할 수 있습니다.

### Docker를 통한 맨티코어 설치 {#manticore-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_마지막 명령어는 현재 디렉터리에 접근할 수 있는 Docker 내에서 eth-security-toolbox를 실행합니다. 호스트에서 파일을 변경하고 Docker에서 해당 파일에 대해 도구를 실행할 수 있습니다._

Docker 내부에서 다음을 실행하세요.

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### pip를 통한 맨티코어 설치 {#manticore-through-pip}

```bash
pip3 install --user manticore
```

solc 0.5.11 버전을 권장합니다.

### 스크립트 실행 {#running-a-script}

Python 3으로 Python 스크립트를 실행하려면:

```bash
python3 script.py
```

## 동적 심볼릭 실행 소개 {#introduction-to-dynamic-symbolic-execution}

### 동적 심볼릭 실행 요약 {#dynamic-symbolic-execution-in-a-nutshell}

동적 심볼릭 실행(Dynamic symbolic execution, DSE)은 높은 수준의 의미론적 인식을 바탕으로 상태 공간을 탐색하는 프로그램 분석 기법입니다. 이 기법은 `path predicates`라고 불리는 수학적 공식으로 표현되는 "프로그램 경로"의 디스커버리를 기반으로 합니다. 개념적으로 이 기법은 두 단계로 경로 조건식(path predicates)에 대해 작동합니다.

1. 프로그램의 입력에 대한 제약 조건을 사용하여 구성됩니다.
2. 연관된 경로가 실행되도록 하는 프로그램 입력을 생성하는 데 사용됩니다.

이 접근 방식은 식별된 모든 프로그램 상태가 구체적인 실행 중에 트리거될 수 있다는 점에서 오탐(false positive)을 생성하지 않습니다. 예를 들어, 분석에서 정수 오버플로를 발견하면 이는 반드시 재현 가능함이 보장됩니다.

### 경로 조건식 예시 {#path-predicate-example}

DSE가 어떻게 작동하는지 이해하기 위해 다음 예시를 살펴보겠습니다.

```solidity
function f(uint a){

  if (a == 65) {
      // 버그가 존재합니다
  }

}
```

`f()`에는 두 개의 경로가 포함되어 있으므로, DSE는 두 개의 서로 다른 경로 조건식을 구성합니다.

- 경로 1: `a == 65`
- 경로 2: `Not (a == 65)`

각 경로 조건식은 이른바 [SMT 솔버](https://wikipedia.org/wiki/Satisfiability_modulo_theories)에 전달될 수 있는 수학적 공식이며, 솔버는 이 방정식을 풀려고 시도합니다. `Path 1`의 경우, 솔버는 `a = 65`를 사용하여 경로를 탐색할 수 있다고 알려줍니다. `Path 2`의 경우, 솔버는 `a`에 65가 아닌 임의의 값(예: `a = 0`)을 부여할 수 있습니다.

### 속성 검증 {#verifying-properties}

맨티코어는 각 경로의 모든 실행에 대한 완전한 제어를 허용합니다. 결과적으로 거의 모든 것에 임의의 제약 조건을 추가할 수 있습니다. 이러한 제어를 통해 컨트랙트에 대한 속성을 생성할 수 있습니다.

다음 예시를 살펴보겠습니다.

```solidity
function unsafe_add(uint a, uint b) returns(uint c){
  c = a + b; // 오버플로 보호 없음
  return c;
}
```

여기 함수에서 탐색할 경로는 단 하나뿐입니다.

- 경로 1: `c = a + b`

맨티코어를 사용하면 오버플로를 확인하고 경로 조건식에 제약 조건을 추가할 수 있습니다.

- `c = a + b AND (c < a OR c < b)`

위의 경로 조건식이 실현 가능한 `a` 및 `b`의 값을 찾을 수 있다면, 이는 오버플로를 발견했음을 의미합니다. 예를 들어 솔버는 `a = 10 , b = MAXUINT256`라는 입력을 생성할 수 있습니다.

수정된 버전을 고려해 보겠습니다.

```solidity
function safe_add(uint a, uint b) returns(uint c){
  c = a + b;
  require(c>=a);
  require(c>=b);
  return c;
}
```

오버플로 검사가 포함된 연관 공식은 다음과 같습니다.

- `c = a + b AND (c >= a) AND (c=>b) AND (c < a OR c < b)`

이 공식은 풀 수 없습니다. 다시 말해 이는 `safe_add`에서 `c`가 항상 증가한다는 **증명**입니다.

따라서 DSE는 코드에 대한 임의의 제약 조건을 검증할 수 있는 강력한 도구입니다.

## 맨티코어에서 실행하기 {#running-under-manticore}

맨티코어 API를 사용하여 스마트 컨트랙트를 탐색하는 방법을 알아보겠습니다. 대상은 다음 스마트 컨트랙트인 [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol)입니다.

```solidity
pragma solidity >=0.4.24 <0.6.0;

contract Simple {
    function f(uint a) payable public{
        if (a == 65) {
            revert();
        }
    }
}
```

### 독립 실행형 탐색 실행 {#run-a-standalone-exploration}

다음 명령어를 사용하여 스마트 컨트랙트에서 직접 맨티코어를 실행할 수 있습니다(`project`는 Solidity 파일이거나 프로젝트 디렉터리일 수 있습니다).

```bash
$ manticore project
```

다음과 같은 테스트 케이스 출력을 얻게 됩니다(순서는 변경될 수 있음).

```
...
... m.c.manticore:INFO: Generated testcase No. 0 - STOP
... m.c.manticore:INFO: Generated testcase No. 1 - REVERT
... m.c.manticore:INFO: Generated testcase No. 2 - RETURN
... m.c.manticore:INFO: Generated testcase No. 3 - REVERT
... m.c.manticore:INFO: Generated testcase No. 4 - STOP
... m.c.manticore:INFO: Generated testcase No. 5 - REVERT
... m.c.manticore:INFO: Generated testcase No. 6 - REVERT
... m.c.manticore:INFO: Results in /home/ethsec/workshops/Automated Smart Contracts Audit - TruffleCon 2018/manticore/examples/mcore_t6vi6ij3
...
```

추가 정보가 없으면 맨티코어는 컨트랙트에서 새로운 경로를 탐색하지 않을 때까지 새로운 심볼릭 트랜잭션으로 컨트랙트를 탐색합니다. 맨티코어는 실패한 트랜잭션(예: 되돌리기 이후) 이후에는 새로운 트랜잭션을 실행하지 않습니다.

맨티코어는 `mcore_*` 디렉터리에 정보를 출력합니다. 이 디렉터리에서 다음을 찾을 수 있습니다.

- `global.summary`: 커버리지 및 컴파일러 경고
- `test_XXXXX.summary`: 테스트 케이스별 커버리지, 마지막 명령어, 계정 잔액
- `test_XXXXX.tx`: 테스트 케이스별 상세 트랜잭션 목록

여기서 맨티코어는 7개의 테스트 케이스를 찾았으며, 이는 다음과 같습니다(파일 이름 순서는 변경될 수 있음).

|                      |   트랜잭션 0   |   트랜잭션 1   | 트랜잭션 2     | 결과 |
| :------------------: | :---------------: | :---------------: | ----------------- | :----: |
| **test_00000000.tx** | 컨트랙트 생성 |      f(!=65)      | f(!=65)           |  STOP  |
| **test_00000001.tx** | 컨트랙트 생성 | 폴백 함수 |                   | REVERT |
| **test_00000002.tx** | 컨트랙트 생성 |                   |                   | RETURN |
| **test_00000003.tx** | 컨트랙트 생성 |       f(65)       |                   | REVERT |
| **test_00000004.tx** | 컨트랙트 생성 |      f(!=65)      |                   |  STOP  |
| **test_00000005.tx** | 컨트랙트 생성 |      f(!=65)      | f(65)             | REVERT |
| **test_00000006.tx** | 컨트랙트 생성 |      f(!=65)      | 폴백 함수 | REVERT |

_탐색 요약에서 f(!=65)는 65가 아닌 임의의 값으로 호출된 f를 나타냅니다._

보시다시피 맨티코어는 성공하거나 되돌리기된 모든 트랜잭션에 대해 고유한 테스트 케이스를 생성합니다.

빠른 코드 탐색을 원한다면 `--quick-mode` 플래그를 사용하세요(버그 탐지기, 가스 계산 등을 비활성화합니다).

### API를 통해 스마트 컨트랙트 조작하기 {#manipulate-a-smart-contract-through-the-api}

이 섹션에서는 맨티코어 Python API를 통해 스마트 컨트랙트를 조작하는 방법에 대해 자세히 설명합니다. Python 확장자인 `*.py`로 새 파일을 생성하고 이 파일에 API 명령어(기본 사항은 아래에 설명됨)를 추가하여 필요한 코드를 작성한 다음, `$ python3 *.py` 명령어로 실행할 수 있습니다. 또한 아래 명령어들을 Python 콘솔에서 직접 실행할 수도 있으며, 콘솔을 실행하려면 `$ python3` 명령어를 사용합니다.

### 계정 생성 {#creating-accounts}

가장 먼저 해야 할 일은 다음 명령어를 사용하여 새로운 블록체인을 초기화하는 것입니다.

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()
```

컨트랙트 계정이 아닌 일반 계정은 [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account)를 사용하여 생성됩니다.

```python
user_account = m.create_account(balance=1000)
```

Solidity 컨트랙트는 [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract)를 사용하여 배포할 수 있습니다.

```solidity
source_code = '''
pragma solidity >=0.4.24 <0.6.0;
contract Simple {
    function f(uint a) payable public{
        if (a == 65) {
            revert();
        }
    }
}
'''
# Initiate the contract
contract_account = m.solidity_create_contract(source_code, owner=user_account)
```

#### 요약 {#summary}

- [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account) 및 [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract)를 사용하여 사용자 및 컨트랙트 계정을 생성할 수 있습니다.

### 트랜잭션 실행 {#executing-transactions}

맨티코어는 두 가지 유형의 트랜잭션을 지원합니다.

- 원시(Raw) 트랜잭션: 모든 함수가 탐색됩니다.
- 명명된(Named) 트랜잭션: 하나의 함수만 탐색됩니다.

#### 원시 트랜잭션 {#raw-transaction}

원시 트랜잭션은 [m.transaction](https://manticore.readthedocs.io/en/latest/evm.html?highlight=transaction#manticore.ethereum.ManticoreEVM.transaction)을 사용하여 실행됩니다.

```python
m.transaction(caller=user_account,
              address=contract_account,
              data=data,
              value=value)
```

트랜잭션의 호출자, 주소, 데이터 또는 값은 구체적이거나 심볼릭일 수 있습니다.

- [m.make_symbolic_value](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_value#manticore.ethereum.ManticoreEVM.make_symbolic_value)는 심볼릭 값을 생성합니다.
- [m.make_symbolic_buffer(size)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_buffer#manticore.ethereum.ManticoreEVM.make_symbolic_buffer)는 심볼릭 바이트 배열을 생성합니다.

예를 들어:

```python
symbolic_value = m.make_symbolic_value()
symbolic_data = m.make_symbolic_buffer(320)
m.transaction(caller=user_account,
              address=contract_address,
              data=symbolic_data,
              value=symbolic_value)
```

데이터가 심볼릭인 경우, 맨티코어는 트랜잭션 실행 중에 컨트랙트의 모든 함수를 탐색합니다. 함수 선택이 어떻게 작동하는지 이해하려면 [Ethernaut CTF 실습](https://blog.trailofbits.com/2017/11/06/hands-on-the-ethernaut-ctf/) 문서의 폴백 함수 설명을 참조하는 것이 도움이 될 것입니다.

#### 명명된 트랜잭션 {#named-transaction}

함수는 이름을 통해 실행될 수 있습니다.
user_account에서 0 이더(ether)와 심볼릭 값으로 `f(uint var)`를 실행하려면 다음을 사용하세요.

```python
symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var, caller=user_account, value=0)
```

트랜잭션의 `value`가 지정되지 않은 경우 기본값은 0입니다.

#### 요약 {#summary-1}

- 트랜잭션의 인수는 구체적이거나 심볼릭일 수 있습니다.
- 원시 트랜잭션은 모든 함수를 탐색합니다.
- 함수는 이름으로 호출될 수 있습니다.

### 작업 공간(Workspace) {#workspace}

`m.workspace`는 생성된 모든 파일의 출력 디렉터리로 사용되는 디렉터리입니다.

```python
print("Results are in {}".format(m.workspace))
```

### 탐색 종료 {#terminate-the-exploration}

탐색을 중지하려면 [m.finalize()](https://manticore.readthedocs.io/en/latest/evm.html?highlight=finalize#manticore.ethereum.ManticoreEVM.finalize)를 사용하세요. 이 메서드가 호출되면 더 이상 트랜잭션이 전송되지 않으며, 맨티코어는 탐색된 각 경로에 대한 테스트 케이스를 생성합니다.

### 요약: 맨티코어에서 실행하기 {#summary-running-under-manticore}

이전의 모든 단계를 종합하면 다음과 같습니다.

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()

with open('example.sol') as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

print("Results are in {}".format(m.workspace))
m.finalize() # 탐색 중지
```

위의 모든 코드는 [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)에서 찾을 수 있습니다.

## 예외 발생 경로 가져오기 {#getting-throwing-paths}

이제 `f()`에서 예외를 발생시키는 경로에 대한 특정 입력을 생성해 보겠습니다. 대상은 여전히 다음 스마트 컨트랙트인 [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol)입니다.

```solidity
pragma solidity >=0.4.24 <0.6.0;
contract Simple {
    function f(uint a) payable public{
        if (a == 65) {
            revert();
        }
    }
}
```

### 상태 정보 사용 {#using-state-information}

실행된 각 경로는 블록체인의 상태를 가집니다. 상태는 준비(ready) 상태이거나 종료(killed) 상태이며, 종료 상태는 THROW 또는 REVERT 명령어에 도달했음을 의미합니다.

- [m.ready_states](https://manticore.readthedocs.io/en/latest/states.html#accessing): 준비된 상태 목록(REVERT/INVALID를 실행하지 않음)
- [m.killed_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): 종료된 상태 목록
- [m.all_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): 모든 상태

```python
for state in m.all_states:
    # 상태로 무언가를 수행합니다
```

상태 정보에 접근할 수 있습니다. 예를 들어:

- `state.platform.get_balance(account.address)`: 계정의 잔액
- `state.platform.transactions`: 트랜잭션 목록
- `state.platform.transactions[-1].return_data`: 마지막 트랜잭션에서 반환된 데이터

마지막 트랜잭션에서 반환된 데이터는 배열이며, 예를 들어 ABI.deserialize를 사용하여 값으로 변환할 수 있습니다.

```python
data = state.platform.transactions[0].return_data
data = ABI.deserialize("uint", data)
```

### 테스트 케이스 생성 방법 {#how-to-generate-testcase}

테스트 케이스를 생성하려면 [m.generate_testcase(state, name)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=generate_testcase#manticore.ethereum.ManticoreEVM.generate_testcase)를 사용하세요.

```python
m.generate_testcase(state, 'BugFound')
```

### 요약 {#summary-2}

- m.all_states를 사용하여 상태를 반복할 수 있습니다.
- `state.platform.get_balance(account.address)`는 계정의 잔액을 반환합니다.
- `state.platform.transactions`는 트랜잭션 목록을 반환합니다.
- `transaction.return_data`는 반환된 데이터입니다.
- `m.generate_testcase(state, name)`는 상태에 대한 입력을 생성합니다.

### 요약: 예외 발생 경로 가져오기 {#summary-getting-throwing-path}

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()

with open('example.sol') as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

## 실행이 되돌리기 또는 INVALID로 종료되는지 확인합니다
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        print('Throw found {}'.format(m.workspace))
        m.generate_testcase(state, 'ThrowFound')
```

위의 모든 코드는 [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)에서 찾을 수 있습니다.

_참고로 terminated_state가 반환하는 모든 상태는 결과에 REVERT 또는 INVALID를 가지므로 훨씬 더 간단한 스크립트를 생성할 수도 있었습니다. 이 예시는 API를 조작하는 방법을 보여주기 위한 목적으로만 작성되었습니다._

## 제약 조건 추가 {#adding-constraints}

탐색을 제한하는 방법을 알아보겠습니다. `f()`의 문서에 이 함수가 `a == 65`로 호출되지 않는다고 명시되어 있다고 가정해 보겠습니다. 따라서 `a == 65`와 관련된 버그는 실제 버그가 아닙니다. 대상은 여전히 다음 스마트 컨트랙트인 [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol)입니다.

```solidity
pragma solidity >=0.4.24 <0.6.0;
contract Simple {
    function f(uint a) payable public{
        if (a == 65) {
            revert();
        }
    }
}
```

### 연산자(Operators) {#operators}

[Operators](https://github.com/trailofbits/manticore/blob/master/manticore/core/smtlib/operators.py) 모듈은 제약 조건의 조작을 용이하게 하며, 특히 다음을 제공합니다.

- Operators.AND,
- Operators.OR,
- Operators.UGT (부호 없는 큼),
- Operators.UGE (부호 없는 크거나 같음),
- Operators.ULT (부호 없는 작음),
- Operators.ULE (부호 없는 작거나 같음).

모듈을 가져오려면 다음을 사용하세요.

```python
from manticore.core.smtlib import Operators
```

`Operators.CONCAT`는 배열을 값에 연결하는 데 사용됩니다. 예를 들어, 트랜잭션의 return_data를 다른 값과 비교하여 확인하려면 값으로 변경해야 합니다.

```python
last_return = Operators.CONCAT(256, *last_return)
```

### 제약 조건 {#state-constraint}

제약 조건은 전역적으로 사용하거나 특정 상태에 대해 사용할 수 있습니다.

#### 전역 제약 조건 {#state-constraint-2}

전역 제약 조건을 추가하려면 `m.constrain(constraint)`를 사용하세요.
예를 들어, 심볼릭 주소에서 컨트랙트를 호출하고 이 주소가 특정 값이 되도록 제한할 수 있습니다.

```python
symbolic_address = m.make_symbolic_value()
m.constraint(Operators.OR(symbolic == 0x41, symbolic_address == 0x42))
m.transaction(caller=user_account,
              address=contract_account,
              data=m.make_symbolic_buffer(320),
              value=0)
```

#### 상태 제약 조건 {#state-constraint-3}

특정 상태에 제약 조건을 추가하려면 [state.constrain(constraint)](https://manticore.readthedocs.io/en/latest/states.html?highlight=StateBase#manticore.core.state.StateBase.constrain)를 사용하세요.
탐색 후 상태를 제한하여 해당 상태의 일부 속성을 확인하는 데 사용할 수 있습니다.

### 제약 조건 확인 {#checking-constraint}

제약 조건이 여전히 실현 가능한지 확인하려면 `solver.check(state.constraints)`를 사용하세요.
예를 들어, 다음은 symbolic_value가 65와 다르도록 제한하고 상태가 여전히 실현 가능한지 확인합니다.

```python
state.constrain(symbolic_var != 65)
if solver.check(state.constraints):
    # 상태가 실현 가능합니다
```

### 요약: 제약 조건 추가 {#summary-adding-constraints}

이전 코드에 제약 조건을 추가하면 다음과 같습니다.

```python
from manticore.ethereum import ManticoreEVM
from manticore.core.smtlib.solver import Z3Solver

solver = Z3Solver.instance()

m = ManticoreEVM()

with open("example.sol") as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

no_bug_found = True

## 실행이 되돌리기 또는 INVALID로 종료되는지 확인합니다
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        # a == 65인 경로는 고려하지 않습니다
        condition = symbolic_var != 65
        if m.generate_testcase(state, name="BugFound", only_if=condition):
            print(f'Bug found, results are in {m.workspace}')
            no_bug_found = False

if no_bug_found:
    print(f'No bug found')
```

위의 모든 코드는 [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)에서 찾을 수 있습니다.