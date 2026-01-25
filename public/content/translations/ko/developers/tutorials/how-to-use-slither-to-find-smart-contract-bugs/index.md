---
title: "Slither를 사용하여 스마트 계약 버그를 찾는 방법"
description: "Slither를 사용하여 스마트 계약에서 자동으로 버그를 찾는 방법"
author: Trailofbits
lang: ko
tags: [ "솔리디티", "스마트 계약", "보안", "테스트" ]
skill: advanced
published: 2020-06-09
source: "안전한 계약 구축하기"
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/slither
---

## Slither 사용 방법 {#how-to-use-slither}

이 튜토리얼의 목표는 Slither를 사용하여 스마트 계약에서 자동으로 버그를 찾는 방법을 보여주는 것입니다.

- [설치](#installation)
- [커맨드 라인 사용법](#command-line)
- [정적 분석 소개](#static-analysis): 정적 분석에 대한 간략한 소개
- [API](#api-basics): Python API 설명

## 설치 {#installation}

Slither에는 Python 3.6 이상이 필요합니다. pip를 통해 설치하거나 docker를 사용하여 설치할 수 있습니다.

pip를 통한 Slither:

```bash
pip3 install --user slither-analyzer
```

docker를 통한 Slither:

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/trufflecon trailofbits/eth-security-toolbox
```

_마지막 명령어는 현재 디렉터리에 액세스할 수 있는 docker에서 eth-security-toolbox를 실행합니다. 호스트에서 파일을 변경하고 docker의 파일에서 도구를 실행할 수 있습니다_

docker 내부에서 다음을 실행합니다.

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### 스크립트 실행 {#running-a-script}

python 3로 python 스크립트를 실행하려면:

```bash
python3 script.py
```

### 커맨드 라인 {#command-line}

**커맨드 라인 대 사용자 정의 스크립트.** Slither는 많은 일반적인 버그를 찾는 사전 정의된 감지기 세트와 함께 제공됩니다. 커맨드 라인에서 Slither를 호출하면 모든 감지기가 실행되며 정적 분석에 대한 자세한 지식이 필요하지 않습니다.

```bash
slither project_paths
```

감지기 외에도 Slither는 [프린터](https://github.com/crytic/slither#printers) 및 [도구](https://github.com/crytic/slither#tools)를 통해 코드 검토 기능을 제공합니다.

[crytic.io](https://github.com/crytic)를 사용하여 비공개 감지기 및 GitHub 통합에 액세스하세요.

## 정적 분석 {#static-analysis}

Slither 정적 분석 프레임워크의 기능과 디자인은 블로그 게시물([1](https://blog.trailofbits.com/2018/10/19/slither-a-solidity-static-analysis-framework/), [2](https://blog.trailofbits.com/2019/05/27/slither-the-leading-static-analyzer-for-smart-contracts/)) 및 [학술 논문](https://github.com/trailofbits/publications/blob/master/papers/wetseb19.pdf)에 설명되어 있습니다.

정적 분석은 다양한 형태로 존재합니다. 아마도 [clang](https://clang-analyzer.llvm.org/) 및 [gcc](https://lwn.net/Articles/806099/)와 같은 컴파일러가 이러한 연구 기술에 의존한다는 것을 알고 계실 것입니다. 그러나 이는 ([Infer](https://fbinfer.com/), [CodeClimate](https://codeclimate.com/), [FindBugs](http://findbugs.sourceforge.net/) 및 [Frama-C](https://frama-c.com/) 및 [Polyspace](https://www.mathworks.com/products/polyspace.html)와 같은 형식적 방법에 기반한 도구)의 기반이 되기도 합니다.

여기서 정적 분석 기법과 연구자를 철저하게 검토하지는 않을 것입니다. 대신 Slither가 작동하는 방식을 이해하는 데 필요한 것에 초점을 맞춰 버그를 찾고 코드를 이해하는 데 더 효과적으로 사용할 수 있도록 할 것입니다.

- [코드 표현](#code-representation)
- [코드 분석](#analysis)
- [중간 표현](#intermediate-representation)

### 코드 표현 {#code-representation}

단일 실행 경로에 대해 추론하는 동적 분석과 달리 정적 분석은 모든 경로에 대해 한 번에 추론합니다. 이를 위해 다른 코드 표현에 의존합니다. 가장 일반적인 두 가지는 추상 구문 트리(AST)와 제어 흐름 그래프(CFG)입니다.

### 추상 구문 트리(AST) {#abstract-syntax-trees-ast}

AST는 컴파일러가 코드를 구문 분석할 때마다 사용됩니다. 이는 아마도 정적 분석을 수행할 수 있는 가장 기본적인 구조일 것입니다.

간단히 말해, AST는 일반적으로 각 리프가 변수 또는 상수를 포함하고 내부 노드가 피연산자 또는 제어 흐름 작업인 구조화된 트리입니다. 다음 코드를 고려하십시오.

```solidity
function safeAdd(uint a, uint b) pure internal returns(uint){
    if(a + b <= a){
        revert();
    }
    return a + b;
}
```

해당 AST는 다음에 표시됩니다.

![AST](./ast.png)

Slither는 solc에서 내보낸 AST를 사용합니다.

빌드하기는 간단하지만 AST는 중첩된 구조입니다. 때로는 이것이 분석하기에 가장 간단하지 않습니다. `a + b <= a` 표현식에서 사용되는 연산을 식별하려면 먼저 `<=`를 분석한 다음 `+`를 분석해야 합니다. 일반적인 접근 방식은 소위 방문자 패턴을 사용하는 것인데, 이는 트리를 재귀적으로 탐색합니다. Slither는 [`ExpressionVisitor`](https://github.com/crytic/slither/blob/master/slither/visitors/expression/expression.py)에 일반 방문자를 포함합니다.

다음 코드는 `ExpressionVisitor`를 사용하여 표현식에 덧셈이 포함되어 있는지 감지합니다.

```python
from slither.visitors.expression.expression import ExpressionVisitor
from slither.core.expressions.binary_operation import BinaryOperationType

class HasAddition(ExpressionVisitor):

    def result(self):
        return self._result

    def _post_binary_operation(self, expression):
        if expression.type == BinaryOperationType.ADDITION:
            self._result = True

visitor = HasAddition(expression) # expression은 테스트할 표현식입니다
print(f'표현식 {expression}에 덧셈이 있습니다: {visitor.result()}')
```

### 제어 흐름 그래프(CFG) {#control-flow-graph-cfg}

두 번째로 흔한 코드 표현은 제어 흐름 그래프(CFG)입니다. 이름에서 알 수 있듯이 모든 실행 경로를 노출하는 그래프 기반 표현입니다. 각 노드에는 하나 또는 여러 개의 명령이 포함됩니다. 그래프의 에지는 제어 흐름 연산(if/then/else, loop 등)을 나타냅니다. 이전 예제의 CFG는 다음과 같습니다.

![CFG](./cfg.png)

CFG는 대부분의 분석이 구축되는 기반 표현입니다.

다른 많은 코드 표현이 존재합니다. 각 표현은 수행하려는 분석에 따라 장단점이 있습니다.

### 분석 {#analysis}

Slither로 수행할 수 있는 가장 간단한 분석 유형은 구문 분석입니다.

### 구문 분석 {#syntax-analysis}

Slither는 패턴 매칭과 유사한 접근 방식을 사용하여 코드의 다양한 구성 요소와 그 표현을 탐색하여 불일치와 결함을 찾을 수 있습니다.

예를 들어 다음 감지기는 구문 관련 문제를 찾습니다.

- [상태 변수 섀도잉](https://github.com/crytic/slither/wiki/Detector-Documentation#state-variable-shadowing): 모든 상태 변수를 반복하고 상속된 계약의 변수를 섀도잉하는지 확인합니다([state.py#L51-L62](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/shadowing/state.py#L51-L62))

- [잘못된 ERC20 인터페이스](https://github.com/crytic/slither/wiki/Detector-Documentation#incorrect-erc20-interface): 잘못된 ERC20 함수 시그니처를 찾습니다([incorrect_erc20_interface.py#L34-L55](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/erc/incorrect_erc20_interface.py#L34-L55))

### 시맨틱 분석 {#semantic-analysis}

구문 분석과 대조적으로, 시맨틱 분석은 더 깊이 들어가 코드의 '의미'를 분석합니다. 이 계열에는 몇 가지 광범위한 유형의 분석이 포함됩니다. 이는 더 강력하고 유용한 결과로 이어지지만 작성하기는 더 복잡합니다.

시맨틱 분석은 가장 진보된 취약점 탐지에 사용됩니다.

#### 데이터 종속성 분석 {#fixed-point-computation}

`variable_a`의 값이 `variable_b`의 영향을 받는 경로가 있는 경우 `variable_a` 변수는 `variable_b`에 데이터 종속적이라고 합니다.

다음 코드에서 `variable_a`는 `variable_b`에 종속됩니다.

```solidity
// ...
variable_a = variable_b + 1;
```

Slither는 중간 표현(이후 섹션에서 논의) 덕분에 내장된 [데이터 종속성](https://github.com/crytic/slither/wiki/data-dependency) 기능을 제공합니다.

데이터 종속성 사용의 예는 [위험한 엄격한 동등성 감지기](https://github.com/crytic/slither/wiki/Detector-Documentation#dangerous-strict-equalities)에서 찾을 수 있습니다. 여기서 Slither는 위험한 값에 대한 엄격한 동등성 비교를 찾고([incorrect_strict_equality.py#L86-L87](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L86-L87)), 공격자가 계약을 함정에 빠뜨리는 것을 방지하기 위해 `==` 대신 `>=` 또는 `<=`를 사용해야 한다고 사용자에게 알립니다. 무엇보다도 감지기는 `balanceOf(address)` 호출의 반환 값을 위험한 것으로 간주하고([incorrect_strict_equality.py#L63-L64](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L63-L64)), 데이터 종속성 엔진을 사용하여 그 사용을 추적합니다.

#### 고정 소수점 계산 {#fixed-point-computation}

분석이 CFG를 탐색하고 에지를 따라가면 이미 방문한 노드를 볼 가능성이 높습니다. 예를 들어, 아래와 같이 루프가 표시되는 경우:

```solidity
for(uint i; i < range; ++){
    variable_a += 1
}
```

분석은 언제 중지해야 하는지 알아야 합니다. 여기에는 두 가지 주요 전략이 있습니다: (1) 각 노드에서 유한한 횟수만큼 반복, (2) 소위 _고정점_ 계산. 고정점은 기본적으로 이 노드를 분석해도 의미 있는 정보가 제공되지 않음을 의미합니다.

사용된 고정점의 예는 재진입 감지기에서 찾을 수 있습니다. Slither는 노드를 탐색하고 외부 호출, 저장 공간에 대한 쓰기 및 읽기를 찾습니다. 고정점에 도달하면([reentrancy.py#L125-L131](https://github.com/crytic/slither/blob/master/slither/detectors/reentrancy/reentrancy.py#L125-L131)), 탐색을 중지하고 결과를 분석하여 다양한 재진입 패턴([reentrancy_benign.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_benign.py), [reentrancy_read_before_write.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_read_before_write.py), [reentrancy_eth.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_eth.py))을 통해 재진입이 있는지 확인합니다.

효율적인 고정 소수점 계산을 사용하여 분석을 작성하려면 분석이 정보를 전파하는 방식에 대한 충분한 이해가 필요합니다.

### 중간 표현 {#intermediate-representation}

중간 표현(IR)은 원래 언어보다 정적 분석에 더 적합하도록 만들어진 언어입니다. Slither는 솔리디티를 자체 IR인 [SlithIR](https://github.com/crytic/slither/wiki/SlithIR)로 변환합니다.

기본적인 검사만 작성하려는 경우 SlithIR을 이해할 필요는 없습니다. 그러나 고급 시맨틱 분석을 작성하려는 경우 유용할 것입니다. [SlithIR](https://github.com/crytic/slither/wiki/Printer-documentation#slithir) 및 [SSA](https://github.com/crytic/slither/wiki/Printer-documentation#slithir-ssa) 프린터는 코드가 어떻게 변환되는지 이해하는 데 도움이 됩니다.

## API 기본 {#api-basics}

Slither에는 계약 및 해당 기능의 기본 속성을 탐색할 수 있는 API가 있습니다.

코드베이스를 로드하려면:

```python
from slither import Slither
slither = Slither('/path/to/project')

```

### 계약 및 함수 탐색 {#exploring-contracts-and-functions}

`Slither` 객체에는 다음이 있습니다.

- `contracts (list(Contract)`: 계약 목록
- `contracts_derived (list(Contract)`: 다른 계약에 의해 상속되지 않은 계약 목록(계약의 하위 집합)
- `get_contract_from_name (str)`: 이름으로 계약 반환

`Contract` 객체에는 다음이 있습니다.

- `name (str)`: 계약의 이름
- `functions (list(Function))`: 함수 목록
- `modifiers (list(Modifier))`: 수정자 목록
- `all_functions_called (list(Function/Modifier))`: 계약에서 도달할 수 있는 모든 내부 함수 목록
- `inheritance (list(Contract))`: 상속된 계약 목록
- `get_function_from_signature (str)`: 시그니처에서 함수 반환
- `get_modifier_from_signature (str)`: 시그니처에서 수정자 반환
- `get_state_variable_from_name (str)`: 이름으로 상태 변수 반환

`Function` 또는 `Modifier` 객체에는 다음이 있습니다.

- `name (str)`: 함수의 이름
- `contract (contract)`: 함수가 선언된 계약
- `nodes (list(Node))`: 함수/수정자의 CFG를 구성하는 노드 목록
- `entry_point (Node)`: CFG의 진입점
- `variables_read (list(Variable))`: 읽은 변수 목록
- `variables_written (list(Variable))`: 쓴 변수 목록
- `state_variables_read (list(StateVariable))`: 읽은 상태 변수 목록(variables`read의 하위 집합)
- `state_variables_written (list(StateVariable))`: 쓴 상태 변수 목록(variables`written의 하위 집합)
