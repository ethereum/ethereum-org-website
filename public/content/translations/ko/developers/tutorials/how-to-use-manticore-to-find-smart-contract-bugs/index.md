---
title: "Manticore를 사용하여 스마트 계약 버그를 찾는 방법"
description: "Manticore를 사용하여 스마트 계약에서 버그를 자동으로 찾는 방법"
author: Trailofbits
lang: ko
tags: [ "솔리디티", "스마트 계약", "보안", "테스트", "형식 검증" ]
skill: advanced
published: 2020-01-13
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore
---

이 튜토리얼의 목표는 Manticore를 사용하여 스마트 계약의 버그를 자동으로 찾는 방법을 보여주는 것입니다.

## 설치 {#installation}

Manticore를 사용하려면 Python 3.6 이상이 필요합니다. pip를 통해 설치하거나 docker를 사용하여 설치할 수 있습니다.

### docker를 통한 Manticore {#manticore-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_마지막 명령어는 현재 디렉터리에 액세스할 수 있는 docker에서 eth-security-toolbox를 실행합니다. 호스트에서 파일을 변경하고 docker의 파일에서 도구를 실행할 수 있습니다_

docker 내부에서 다음을 실행합니다.

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### pip를 통한 Manticore {#manticore-through-pip}

```bash
pip3 install --user manticore
```

solc 0.5.11을 권장합니다.

### 스크립트 실행 {#running-a-script}

python 3로 python 스크립트를 실행하려면:

```bash
python3 script.py
```

## 동적 심볼릭 실행 소개 {#introduction-to-dynamic-symbolic-execution}

### 동적 심볼릭 실행 요약 {#dynamic-symbolic-execution-in-a-nutshell}

동적 심볼릭 실행(DSE)은 높은 수준의 시맨틱 인식을 통해 상태 공간을 탐색하는 프로그램 분석 기법입니다. 이 기법은 '경로 술어'라고 불리는 수학적 공식으로 표현되는 "프로그램 경로"의 발견을 기반으로 합니다. 개념적으로 이 기법은 두 단계로 경로 술어를 처리합니다.

1. 프로그램 입력에 대한 제약 조건을 사용하여 구성됩니다.
2. 연관된 경로를 실행시키는 프로그램 입력을 생성하는 데 사용됩니다.

이 접근 방식은 식별된 모든 프로그램 상태가 구체적인 실행 중에 트리거될 수 있다는 점에서 거짓 양성을 생성하지 않습니다. 예를 들어, 분석에서 정수 오버플로우를 발견하면 재현이 보장됩니다.

### 경로 술어 예시 {#path-predicate-example}

DSE가 어떻게 작동하는지 이해하기 위해 다음 예시를 살펴보겠습니다.

```solidity
function f(uint a){

  if (a == 65) {
      // 버그가 존재함
  }

}
```

`f()`는 두 개의 경로를 포함하므로 DSE는 두 개의 다른 경로 술어를 구성합니다.

- 경로 1: `a == 65`
- 경로 2: `Not (a == 65)`

각 경로 술어는 소위 [SMT 솔버](https://wikipedia.org/wiki/Satisfiability_modulo_theories)에 제공될 수 있는 수학적 공식이며, 이 솔버는 방정식을 풀려고 시도합니다. `경로 1`의 경우, 솔버는 `a = 65`로 경로를 탐색할 수 있다고 말할 것입니다. `경로 2`의 경우, 솔버는 `a`에 65가 아닌 다른 값을 할당할 수 있습니다(예: `a = 0`).

### 속성 검증 {#verifying-properties}

Manticore를 사용하면 각 경로의 모든 실행을 완벽하게 제어할 수 있습니다. 결과적으로 거의 모든 것에 임의의 제약 조건을 추가할 수 있습니다. 이 제어를 통해 계약에 대한 속성을 생성할 수 있습니다.

다음 예시를 살펴보겠습니다.

```solidity
function unsafe_add(uint a, uint b) returns(uint c){
  c = a + b; // 오버플로우 보호 없음
  return c;
}
```

여기 함수에서 탐색할 경로는 하나뿐입니다.

- 경로 1: `c = a + b`

Manticore를 사용하여 오버플로우를 확인하고 경로 술어에 제약 조건을 추가할 수 있습니다.

- `c = a + b AND (c < a OR c < b)`

위의 경로 술어를 실현 가능하게 하는 `a`와 `b`의 값을 찾을 수 있다면, 오버플로우를 찾았다는 의미입니다. 예를 들어, 솔버는 `a = 10 , b = MAXUINT256` 입력을 생성할 수 있습니다.

수정된 버전을 고려해 보겠습니다.

```solidity
function safe_add(uint a, uint b) returns(uint c){
  c = a + b;
  require(c>=a);
  require(c>=b);
  return c;
}
```

오버플로우 검사와 관련된 공식은 다음과 같습니다.

- `c = a + b AND (c >= a) AND (c=>b) AND (c < a OR c < b)`

이 공식은 풀 수 없습니다. 다시 말해, 이것은 `safe_add`에서 `c`가 항상 증가한다는 **증명**입니다.

따라서 DSE는 코드에 대한 임의의 제약 조건을 확인할 수 있는 강력한 도구입니다.

## Manticore에서 실행하기 {#running-under-manticore}

Manticore API를 사용하여 스마트 계약을 탐색하는 방법을 살펴보겠습니다. 대상은 다음 스마트 계약 [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol)입니다.

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

다음 명령을 사용하여 스마트 계약에서 직접 Manticore를 실행할 수 있습니다(`project`는 솔리디티 파일 또는 프로젝트 디렉터리가 될 수 있음):

```bash
$ manticore project
```

다음과 같은 테스트 케이스의 출력을 얻게 됩니다(순서는 변경될 수 있음):

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

추가 정보가 없으면 Manticore는 계약에서 새로운 경로를 탐색하지 않을 때까지 새로운 심볼릭
트랜잭션으로 계약을 탐색합니다. Manticore는 실패한 트랜잭션(예: revert 후) 다음에는 새로운 트랜잭션을 실행하지 않습니다.

Manticore는 `mcore_*` 디렉터리에 정보를 출력합니다. 무엇보다도 이 디렉터리에서 다음을 찾을 수 있습니다.

- `global.summary`: 커버리지 및 컴파일러 경고
- `test_XXXXX.summary`: 커버리지, 마지막 지침, 테스트 케이스당 계정 잔액
- `test_XXXXX.tx`: 테스트 케이스당 트랜잭션의 상세 목록

여기서 Manticore는 7개의 테스트 케이스를 찾았으며, 이는 다음에 해당합니다(파일 이름 순서는 변경될 수 있음):

|                                                           | 트랜잭션 0 |           트랜잭션 1           | 트랜잭션 2                     |   결과   |
| :-------------------------------------------------------: | :----: | :------------------------: | -------------------------- | :----: |
| **test_00000000.tx** |  계약 생성 | f(!=65) | f(!=65) |  STOP  |
| **test_00000001.tx** |  계약 생성 |            폴백 함수           |                            | REVERT |
| **test_00000002.tx** |  계약 생성 |                            |                            | RETURN |
| **test_00000003.tx** |  계약 생성 |  f(65)  |                            | REVERT |
| **test_00000004.tx** |  계약 생성 | f(!=65) |                            |  STOP  |
| **test_00000005.tx** |  계약 생성 | f(!=65) | f(65)   | REVERT |
| **test_00000006.tx** |  계약 생성 | f(!=65) | 폴백 함수                      | REVERT |

_탐색 요약에서 f(!=65)는 65와 다른 임의의 값으로 f가 호출되었음을 나타냅니다._

보시다시피 Manticore는 성공하거나 되돌려진 모든 트랜잭션에 대해 고유한 테스트 케이스를 생성합니다.

빠른 코드 탐색을 원한다면 `--quick-mode` 플래그를 사용하세요(버그 탐지기, 가스 계산 등을 비활성화합니다).

### API를 통해 스마트 계약 조작하기 {#manipulate-a-smart-contract-through-the-api}

이 섹션에서는 Manticore Python API를 통해 스마트 계약을 조작하는 방법을 자세히 설명합니다. python 확장자 `*.py`로 새 파일을 만들고 이 파일에 API 명령(기본 사항은 아래에서 설명)을 추가하여 필요한 코드를 작성한 다음 `$ python3 *.py` 명령으로 실행할 수 있습니다. 또한 아래 명령을 python 콘솔에서 직접 실행할 수 있습니다. 콘솔을 실행하려면 `$ python3` 명령을 사용하세요.

### 계정 생성 {#creating-accounts}

가장 먼저 해야 할 일은 다음 명령으로 새 블록체인을 시작하는 것입니다.

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()
```

[m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account)를 사용하여 비계약 계정을 생성합니다.

```python
user_account = m.create_account(balance=1000)
```

[m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract)를 사용하여 솔리디티 계약을 배포할 수 있습니다.

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
# 계약 초기화
contract_account = m.solidity_create_contract(source_code, owner=user_account)
```

#### 요약 {#summary}

- [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account) 및 [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract)를 사용하여 사용자 계정과 계약 계정을 생성할 수 있습니다.

### 트랜잭션 실행 {#executing-transactions}

Manticore는 두 가지 유형의 트랜잭션을 지원합니다.

- 원시 트랜잭션: 모든 함수를 탐색합니다.
- 명명된 트랜잭션: 하나의 함수만 탐색합니다.

#### 원시 트랜잭션 {#raw-transaction}

원시 트랜잭션은 [m.transaction](https://manticore.readthedocs.io/en/latest/evm.html?highlight=transaction#manticore.ethereum.ManticoreEVM.transaction)을 사용하여 실행됩니다.

```python
m.transaction(caller=user_account,
              address=contract_account,
              data=data,
              value=value)
```

트랜잭션의 발신자, 주소, 데이터 또는 값은 구체적이거나 심볼릭일 수 있습니다.

- [m.make_symbolic_value](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_value#manticore.ethereum.ManticoreEVM.make_symbolic_value)는 심볼릭 값을 생성합니다.
- [m.make_symbolic_buffer(size)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_buffer#manticore.ethereum.ManticoreEVM.make_symbolic_buffer)는 심볼릭 바이트 배열을 생성합니다.

예를 들어,

```python
symbolic_value = m.make_symbolic_value()
symbolic_data = m.make_symbolic_buffer(320)
m.transaction(caller=user_account,
              address=contract_address,
              data=symbolic_data,
              value=symbolic_value)
```

데이터가 심볼릭인 경우, Manticore는 트랜잭션 실행 중에 계약의 모든 함수를 탐색합니다. 함수 선택이 어떻게 작동하는지 이해하려면 [Hands on the Ethernaut CTF](https://blog.trailofbits.com/2017/11/06/hands-on-the-ethernaut-ctf/) 기사의 폴백 함수 설명을 참조하면 도움이 됩니다.

#### 명명된 트랜잭션 {#named-transaction}

함수는 이름을 통해 실행할 수 있습니다.
`f(uint var)`를 심볼릭 값, user_account에서 0 이더로 실행하려면 다음을 사용합니다.

```python
symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var, caller=user_account, value=0)
```

트랜잭션의 `value`가 지정되지 않은 경우 기본값은 0입니다.

#### 요약 {#summary-1}

- 트랜잭션의 인수는 구체적이거나 심볼릭일 수 있습니다.
- 원시 트랜잭션은 모든 함수를 탐색합니다.
- 함수는 이름으로 호출할 수 있습니다.

### 작업 공간 {#workspace}

`m.workspace`는 생성된 모든 파일의 출력 디렉터리로 사용되는 디렉터리입니다.

```python
print("결과는 {}에 있습니다".format(m.workspace))
```

### 탐색 종료 {#terminate-the-exploration}

탐색을 중지하려면 [m.finalize()](https://manticore.readthedocs.io/en/latest/evm.html?highlight=finalize#manticore.ethereum.ManticoreEVM.finalize)를 사용합니다. 이 메서드가 호출되면 더 이상 트랜잭션을 보내서는 안 되며, Manticore는 탐색된 각 경로에 대한 테스트 케이스를 생성합니다.

### 요약: Manticore에서 실행하기 {#summary-running-under-manticore}

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

print("결과는 {}에 있습니다".format(m.workspace))
m.finalize() # 탐색 중지
```

위의 모든 코드는 [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)에서 찾을 수 있습니다.

## 오류 발생 경로 가져오기 {#getting-throwing-paths}

이제 `f()`에서 예외를 발생시키는 경로에 대한 특정 입력을 생성합니다. 대상은 여전히 다음 스마트 계약 [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol)입니다.

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

실행된 각 경로에는 블록체인의 상태가 있습니다. 상태는 준비되었거나 종료되었으며, 이는 THROW 또는 REVERT 명령에 도달했음을 의미합니다.

- [m.ready_states](https://manticore.readthedocs.io/en/latest/states.html#accessing): 준비된 상태(REVERT/INVALID를 실행하지 않음)의 목록
- [m.killed_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): 종료된 상태의 목록
- [m.all_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): 모든 상태

```python
for state in m.all_states:
    # 상태로 무언가를 수행
```

상태 정보에 액세스할 수 있습니다. 예를 들어,

- `state.platform.get_balance(account.address)`: 계정의 잔액
- `state.platform.transactions`: 트랜잭션 목록
- `state.platform.transactions[-1].return_data`: 마지막 트랜잭션에서 반환된 데이터

마지막 트랜잭션에서 반환된 데이터는 배열이며, 예를 들어 ABI.deserialize를 사용하여 값으로 변환할 수 있습니다.

```python
data = state.platform.transactions[0].return_data
data = ABI.deserialize("uint", data)
```

### 테스트 케이스 생성 방법 {#how-to-generate-testcase}

[m.generate_testcase(state, name)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=generate_testcase#manticore.ethereum.ManticoreEVM.generate_testcase)를 사용하여 테스트 케이스를 생성합니다.

```python
m.generate_testcase(state, 'BugFound')
```

### 요약 {#summary-2}

- m.all_states로 상태를 반복할 수 있습니다.
- `state.platform.get_balance(account.address)`는 계정의 잔액을 반환합니다.
- `state.platform.transactions`는 트랜잭션 목록을 반환합니다.
- `transaction.return_data`는 반환된 데이터입니다.
- `m.generate_testcase(state, name)`은 상태에 대한 입력을 생성합니다.

### 요약: 오류 발생 경로 가져오기 {#summary-getting-throwing-path}

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()

with open('example.sol') as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

## 실행이 REVERT 또는 INVALID로 끝나는지 확인

for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        print('오류 발견 {}'.format(m.workspace))
        m.generate_testcase(state, 'ThrowFound')
```

위의 모든 코드는 [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)에서 찾을 수 있습니다.

_참고: terminated_state에서 반환된 모든 상태의 결과에 REVERT 또는 INVALID가 있으므로 훨씬 더 간단한 스크립트를 생성할 수 있었습니다. 이 예시는 API 조작 방법을 보여주기 위한 것입니다._

## 제약 조건 추가 {#adding-constraints}

탐색을 제한하는 방법을 살펴보겠습니다. `f()`의 개발문서에 `a == 65`로 함수가 호출되지 않는다고 명시되어 있다고 가정합니다.
따라서 `a == 65`인 버그는 실제 버그가 아닙니다. 대상은 여전히 다음 스마트 계약 [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol)입니다.

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

### 연산자 {#operators}

[Operators](https://github.com/trailofbits/manticore/blob/master/manticore/core/smtlib/operators.py) 모듈은 제약 조건 조작을 용이하게 하며, 무엇보다도 다음을 제공합니다.

- Operators.AND,
- Operators.OR,
- Operators.UGT (부호 없는 초과),
- Operators.UGE (부호 없는 이상),
- Operators.ULT (부호 없는 미만),
- Operators.ULE (부호 없는 이하).

모듈을 가져오려면 다음을 사용합니다.

```python
from manticore.core.smtlib import Operators
```

`Operators.CONCAT`는 배열을 값에 연결하는 데 사용됩니다. 예를 들어, 트랜잭션의 return_data를 다른 값과 비교하려면 값으로 변경해야 합니다.

```python
last_return = Operators.CONCAT(256, *last_return)
```

### 제약 조건 {#state-constraint}

제약 조건을 전역적으로 또는 특정 상태에 사용할 수 있습니다.

#### 전역 제약 조건 {#state-constraint}

`m.constrain(constraint)`를 사용하여 전역 제약 조건을 추가합니다.
예를 들어, 심볼릭 주소에서 계약을 호출하고 이 주소를 특정 값으로 제한할 수 있습니다.

```python
symbolic_address = m.make_symbolic_value()
m.constraint(Operators.OR(symbolic == 0x41, symbolic_address == 0x42))
m.transaction(caller=user_account,
              address=contract_account,
              data=m.make_symbolic_buffer(320),
              value=0)
```

#### 상태 제약 조건 {#state-constraint}

[state.constrain(constraint)](https://manticore.readthedocs.io/en/latest/states.html?highlight=StateBase#manticore.core.state.StateBase.constrain)를 사용하여 특정 상태에 제약 조건을 추가합니다.
탐색 후 상태를 제한하여 속성을 확인하는 데 사용할 수 있습니다.

### 제약 조건 확인 {#checking-constraint}

`solver.check(state.constraints)`를 사용하여 제약 조건이 여전히 실현 가능한지 확인합니다.
예를 들어, 다음은 symbolic_value를 65와 다르게 제약하고 상태가 여전히 실현 가능한지 확인합니다.

```python
state.constrain(symbolic_var != 65)
if solver.check(state.constraints):
    # 상태가 실현 가능함
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

## 실행이 REVERT 또는 INVALID로 끝나는지 확인

for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        # a == 65인 경로는 고려하지 않음
        condition = symbolic_var != 65
        if m.generate_testcase(state, name="BugFound", only_if=condition):
            print(f'버그를 찾았으며, 결과는 {m.workspace}에 있습니다')
            no_bug_found = False

if no_bug_found:
    print(f'버그를 찾지 못했습니다')
```

위의 모든 코드는 [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)에서 찾을 수 있습니다.
