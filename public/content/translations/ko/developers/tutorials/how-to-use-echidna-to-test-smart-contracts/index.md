---
title: "에키드나를 사용하여 스마트 컨트랙트를 테스트하는 방법"
description: "에키드나를 사용하여 스마트 컨트랙트를 자동으로 테스트하는 방법"
author: "Trailofbits"
lang: ko
tags: ["Solidity", "스마트 컨트랙트", "보안", "테스트", "퍼징"]
skill: advanced
breadcrumb: "에키드나"
published: 2020-04-10
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna
---

## 설치 {#installation}

에키드나는 Docker를 통해 설치하거나 미리 컴파일된 바이너리를 사용하여 설치할 수 있습니다.

### Docker를 통한 에키드나 설치 {#echidna-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_마지막 명령어는 현재 디렉터리에 접근할 수 있는 Docker 내에서 eth-security-toolbox를 실행합니다. 호스트에서 파일을 변경하고 Docker에서 해당 파일에 대해 도구를 실행할 수 있습니다._

Docker 내부에서 다음을 실행하세요:

```bash
solc-select 0.5.11
cd /home/training
```

### 바이너리 {#binary}

[https://github.com/crytic/echidna/releases/tag/v1.4.0.0](https://github.com/crytic/echidna/releases/tag/v1.4.0.0)

## 속성 기반 퍼징 소개 {#introduction-to-property-based-fuzzing}

에키드나는 이전 블로그 게시물([1](https://blog.trailofbits.com/2018/03/09/echidna-a-smart-fuzzer-for-ethereum/), [2](https://blog.trailofbits.com/2018/05/03/state-machine-testing-with-echidna/), [3](https://blog.trailofbits.com/2020/03/30/an-echidna-for-all-seasons/))에서 설명한 속성 기반 퍼저(fuzzer)입니다.

### 퍼징 {#fuzzing}

[퍼징(Fuzzing)](https://wikipedia.org/wiki/Fuzzing)은 보안 커뮤니티에서 잘 알려진 기법입니다. 프로그램에서 버그를 찾기 위해 무작위에 가까운 입력을 생성하는 방식으로 이루어집니다. 기존 소프트웨어용 퍼저([AFL](http://lcamtuf.coredump.cx/afl/) 또는 [LibFuzzer](https://llvm.org/docs/LibFuzzer.html) 등)는 버그를 찾는 데 효율적인 도구로 알려져 있습니다.

순수하게 무작위로 입력을 생성하는 것을 넘어, 좋은 입력을 생성하기 위한 다양한 기법과 전략이 있습니다. 여기에는 다음이 포함됩니다:

- 각 실행에서 피드백을 얻고 이를 사용하여 생성을 유도합니다. 예를 들어, 새로 생성된 입력이 새로운 경로의 디스커버리로 이어진다면, 그와 가까운 새로운 입력을 생성하는 것이 합리적일 수 있습니다.
- 구조적 제약 조건을 준수하여 입력을 생성합니다. 예를 들어, 입력에 체크섬이 포함된 헤더가 있는 경우, 퍼저가 체크섬을 검증하는 입력을 생성하도록 하는 것이 합리적입니다.
- 알려진 입력을 사용하여 새로운 입력을 생성합니다. 유효한 입력의 대규모 데이터 세트에 접근할 수 있는 경우, 퍼저는 처음부터 생성을 시작하는 대신 이를 기반으로 새로운 입력을 생성할 수 있습니다. 이를 보통 <em>시드(seed)</em>라고 부릅니다.

### 속성 기반 퍼징 {#property-based-fuzzing}

에키드나는 특정 퍼저 제품군에 속합니다. 바로 [QuickCheck](https://wikipedia.org/wiki/QuickCheck)에서 큰 영감을 받은 속성 기반 퍼징입니다. 크래시를 찾으려는 기존 퍼저와 달리, 에키드나는 사용자가 정의한 불변성(invariant)을 깨뜨리려고 시도합니다.

스마트 컨트랙트에서 불변성은 Solidity 함수이며, 컨트랙트가 도달할 수 있는 부정확하거나 유효하지 않은 상태를 나타낼 수 있습니다. 여기에는 다음이 포함됩니다:

- 잘못된 접근 제어: 공격자가 컨트랙트의 소유자가 됨.
- 잘못된 상태 머신: 컨트랙트가 일시 중지된 상태에서 토큰이 전송될 수 있음.
- 잘못된 산술 연산: 사용자가 잔액을 언더플로우시켜 무제한으로 무료 토큰을 얻을 수 있음.

### 에키드나로 속성 테스트하기 {#testing-a-property-with-echidna}

에키드나로 스마트 컨트랙트를 테스트하는 방법을 살펴보겠습니다. 대상은 다음 스마트 컨트랙트인 [`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol)입니다:

```solidity
contract Token{
  mapping(address => uint) public balances;
  function airdrop() public{
      balances[msg.sender] = 1000;
  }
  function consume() public{
      require(balances[msg.sender]>0);
      balances[msg.sender] -= 1;
  }
  function backdoor() public{
      balances[msg.sender] += 1;
  }
}
```

이 토큰이 다음 속성을 가져야 한다고 가정해 보겠습니다:

- 누구나 최대 1000개의 토큰을 가질 수 있습니다.
- 토큰은 전송할 수 없습니다(ERC-20 토큰이 아님).

### 속성 작성하기 {#write-a-property}

에키드나 속성은 Solidity 함수입니다. 속성은 다음 조건을 충족해야 합니다:

- 인수가 없어야 합니다.
- 성공할 경우 `true`를 반환해야 합니다.
- 이름이 `echidna`로 시작해야 합니다.

에키드나는 다음을 수행합니다:

- 속성을 테스트하기 위해 임의의 트랜잭션을 자동으로 생성합니다.
- 속성이 `false`를 반환하거나 오류를 발생시키도록 하는 모든 트랜잭션을 보고합니다.
- 속성을 호출할 때 발생하는 부작용을 폐기합니다(즉, 속성이 상태 변수를 변경하더라도 테스트 후에는 폐기됨).

다음 속성은 호출자가 1000개 이하의 토큰을 가지고 있는지 확인합니다:

```solidity
function echidna_balance_under_1000() public view returns(bool){
      return balances[msg.sender] <= 1000;
}
```

상속을 사용하여 컨트랙트와 속성을 분리하세요:

```solidity
contract TestToken is Token{
      function echidna_balance_under_1000() public view returns(bool){
            return balances[msg.sender] <= 1000;
      }
  }
```

[`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol)는 속성을 구현하고 토큰에서 상속받습니다.

### 컨트랙트 초기화하기 {#initiate-a-contract}

에키드나에는 인수가 없는 [생성자](/developers/docs/smart-contracts/anatomy/#constructor-functions)가 필요합니다. 컨트랙트에 특정 초기화가 필요한 경우 생성자에서 수행해야 합니다.

에키드나에는 몇 가지 특정 주소가 있습니다:

- 생성자를 호출하는 `0x00a329c0648769A73afAc7F9381E08FB43dBEA72`.
- 다른 함수를 무작위로 호출하는 `0x10000`, `0x20000`, `0x00a329C0648769a73afAC7F9381e08fb43DBEA70`.

현재 예제에서는 특별한 초기화가 필요하지 않으므로 생성자가 비어 있습니다.

### 에키드나 실행하기 {#run-echidna}

에키드나는 다음 명령어로 실행됩니다:

```bash
echidna-test contract.sol
```

contract.sol에 여러 컨트랙트가 포함된 경우 대상을 지정할 수 있습니다:

```bash
echidna-test contract.sol --contract MyContract
```

### 요약: 속성 테스트하기 {#summary-testing-a-property}

다음은 예제에서 에키드나를 실행한 결과를 요약한 것입니다:

```solidity
contract TestToken is Token{
    constructor() public {}
        function echidna_balance_under_1000() public view returns(bool){
          return balances[msg.sender] <= 1000;
        }
  }
```

```bash
echidna-test testtoken.sol --contract TestToken
...

echidna_balance_under_1000: failed!💥
  Call sequence, shrinking (1205/5000):
    airdrop()
    backdoor()

...
```

에키드나는 `backdoor`가 호출되면 속성이 위반된다는 것을 발견했습니다.

## 퍼징 캠페인 중 호출할 함수 필터링하기 {#filtering-functions-to-call-during-a-fuzzing-campaign}

퍼징할 함수를 필터링하는 방법을 살펴보겠습니다.
대상은 다음 스마트 컨트랙트입니다:

```solidity
contract C {
  bool state1 = false;
  bool state2 = false;
  bool state3 = false;
  bool state4 = false;

  function f(uint x) public {
    require(x == 12);
    state1 = true;
  }

  function g(uint x) public {
    require(state1);
    require(x == 8);
    state2 = true;
  }

  function h(uint x) public {
    require(state2);
    require(x == 42);
    state3 = true;
  }

 function i() public {
    require(state3);
    state4 = true;
  }

  function reset1() public {
    state1 = false;
    state2 = false;
    state3 = false;
    return;
  }

  function reset2() public {
    state1 = false;
    state2 = false;
    state3 = false;
    return;
  }

  function echidna_state4() public returns (bool) {
    return (!state4);
  }
}
```

이 작은 예제는 에키드나가 상태 변수를 변경하기 위해 특정 트랜잭션 시퀀스를 찾도록 강제합니다.
이는 퍼저에게 어려운 작업입니다([맨티코어](https://github.com/trailofbits/manticore)와 같은 기호 실행 도구를 사용하는 것이 권장됩니다).
에키드나를 실행하여 이를 확인할 수 있습니다:

```bash
echidna-test multi.sol
...
echidna_state4: passed! 🎉
Seed: -3684648582249875403
```

### 함수 필터링하기 {#filtering-functions}

두 개의 초기화 함수(`reset1` 및 `reset2`)가 모든 상태 변수를 `false`로 설정하기 때문에 에키드나는 이 컨트랙트를 테스트하기 위한 올바른 시퀀스를 찾는 데 어려움을 겪습니다.
하지만 에키드나의 특수 기능을 사용하여 초기화 함수를 블랙리스트에 추가하거나 `f`, `g`,
`h`, `i` 함수만 화이트리스트에 추가할 수 있습니다.

함수를 블랙리스트에 추가하려면 다음 구성 파일을 사용할 수 있습니다:

```yaml
filterBlacklist: true
filterFunctions: ["reset1", "reset2"]
```

함수를 필터링하는 또 다른 접근 방식은 화이트리스트에 있는 함수를 나열하는 것입니다. 이를 위해 다음 구성 파일을 사용할 수 있습니다:

```yaml
filterBlacklist: false
filterFunctions: ["f", "g", "h", "i"]
```

- `filterBlacklist`는 기본적으로 `true`입니다.
- 필터링은 이름으로만 수행됩니다(매개변수 제외). `f()`와 `f(uint256)`가 있는 경우, `"f"` 필터는 두 함수 모두와 일치합니다.

### 에키드나 실행하기 {#run-echidna-1}

구성 파일 `blacklist.yaml`와 함께 에키드나를 실행하려면:

```bash
echidna-test multi.sol --config blacklist.yaml
...
echidna_state4: failed!💥
  Call sequence:
    f(12)
    g(8)
    h(42)
    i()
```

에키드나는 속성을 거짓으로 만드는 트랜잭션 시퀀스를 거의 즉시 찾을 것입니다.

### 요약: 함수 필터링하기 {#summary-filtering-functions}

에키드나는 다음을 사용하여 퍼징 캠페인 중에 호출할 함수를 블랙리스트 또는 화이트리스트에 추가할 수 있습니다:

```yaml
filterBlacklist: true
filterFunctions: ["f1", "f2", "f3"]
```

```bash
echidna-test contract.sol --config config.yaml
...
```

에키드나는 `filterBlacklist` 부울 값에 따라 `f1`, `f2`, `f3`를 블랙리스트에 추가하거나 이들만 호출하여 퍼징 캠페인을 시작합니다.

## 에키드나로 Solidity의 단언(assert)을 테스트하는 방법 {#how-to-test-soliditys-assert-with-echidna}

이 짧은 튜토리얼에서는 에키드나를 사용하여 컨트랙트의 단언 검사를 테스트하는 방법을 보여드리겠습니다. 다음과 같은 컨트랙트가 있다고 가정해 보겠습니다:

```solidity
contract Incrementor {
  uint private counter = 2**200;

  function inc(uint val) public returns (uint){
    uint tmp = counter;
    counter += val;
    // tmp <= counter
    return (counter - tmp);
  }
}
```

### 단언 작성하기 {#write-an-assertion}

차이를 반환한 후 `tmp`가 `counter`보다 작거나 같은지 확인하려고 합니다. 에키드나 속성을 작성할 수도 있지만, 어딘가에 `tmp` 값을 저장해야 합니다. 대신 다음과 같은 단언을 사용할 수 있습니다:

```solidity
contract Incrementor {
  uint private counter = 2**200;

  function inc(uint val) public returns (uint){
    uint tmp = counter;
    counter += val;
    assert (tmp <= counter);
    return (counter - tmp);
  }
}
```

### 에키드나 실행하기 {#run-echidna-2}

단언 실패 테스트를 활성화하려면 [에키드나 구성 파일](https://github.com/crytic/echidna/wiki/Config) `config.yaml`를 생성하세요:

```yaml
checkAsserts: true
```

에키드나에서 이 컨트랙트를 실행하면 예상된 결과를 얻을 수 있습니다:

```bash
echidna-test assert.sol --config config.yaml
Analyzing contract: assert.sol:Incrementor
assertion in inc: failed!💥
  Call sequence, shrinking (2596/5000):
    inc(21711016731996786641919559689128982722488122124807605757398297001483711807488)
    inc(7237005577332262213973186563042994240829374041602535252466099000494570602496)
    inc(86844066927987146567678238756515930889952488499230423029593188005934847229952)

Seed: 1806480648350826486
```

보시다시피, 에키드나는 `inc` 함수에서 단언 실패를 보고합니다. 함수당 두 개 이상의 단언을 추가할 수 있지만, 에키드나는 어떤 단언이 실패했는지 알려주지 못합니다.

### 단언을 사용하는 시기와 방법 {#when-and-how-use-assertions}

단언은 명시적 속성의 대안으로 사용될 수 있으며, 특히 확인해야 할 조건이 특정 연산 `f`의 올바른 사용과 직접적으로 관련된 경우에 유용합니다. 일부 코드 뒤에 단언을 추가하면 해당 코드가 실행된 직후에 검사가 수행되도록 강제할 수 있습니다:

```solidity
function f(..) public {
    // 일부 복잡한 코드
    ...
    assert (condition);
    ...
}

```

반대로, 명시적인 에키드나 속성을 사용하면 트랜잭션이 무작위로 실행되며 정확히 언제 검사될지 강제할 쉬운 방법이 없습니다. 다음과 같은 우회 방법을 사용할 수는 있습니다:

```solidity
function echidna_assert_after_f() public returns (bool) {
    f(..);
    return(condition);
}
```

하지만 몇 가지 문제가 있습니다:

- `f`가 `internal` 또는 `external`로 선언된 경우 실패합니다.
- `f`를 호출할 때 어떤 인수를 사용해야 하는지 불분명합니다.
- `f`가 되돌리기(revert)를 수행하면 속성이 실패합니다.

일반적으로 단언 사용 방법에 대해서는 [John Regehr의 권장 사항](https://blog.regehr.org/archives/1091)을 따르는 것이 좋습니다:

- 단언 검사 중에 부작용을 강제하지 마세요. 예: `assert(ChangeStateAndReturn() == 1)`
- 명백한 문장을 단언하지 마세요. 예를 들어 `var`가 `uint`로 선언된 경우 `assert(var >= 0)`와 같이 사용하지 마세요.

마지막으로, `assert` 대신 `require`를 **사용하지 마세요**. 에키드나가 이를 감지할 수 없기 때문입니다(하지만 컨트랙트는 어쨌든 되돌리기를 수행합니다).

### 요약: 단언 검사 {#summary-assertion-checking}

다음은 예제에서 에키드나를 실행한 결과를 요약한 것입니다:

```solidity
contract Incrementor {
  uint private counter = 2**200;

  function inc(uint val) public returns (uint){
    uint tmp = counter;
    counter += val;
    assert (tmp <= counter);
    return (counter - tmp);
  }
}
```

```bash
echidna-test assert.sol --config config.yaml
Analyzing contract: assert.sol:Incrementor
assertion in inc: failed!💥
  Call sequence, shrinking (2596/5000):
    inc(21711016731996786641919559689128982722488122124807605757398297001483711807488)
    inc(7237005577332262213973186563042994240829374041602535252466099000494570602496)
    inc(86844066927987146567678238756515930889952488499230423029593188005934847229952)

Seed: 1806480648350826486
```

에키드나는 큰 인수를 사용하여 이 함수를 여러 번 호출할 경우 `inc`의 단언이 실패할 수 있음을 발견했습니다.

## 에키드나 코퍼스 수집 및 수정하기 {#collecting-and-modifying-an-echidna-corpus}

에키드나를 사용하여 트랜잭션 코퍼스(corpus)를 수집하고 사용하는 방법을 살펴보겠습니다. 대상은 다음 스마트 컨트랙트인 [`magic.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/magic.sol)입니다:

```solidity
contract C {
  bool value_found = false;
  function magic(uint magic_1, uint magic_2, uint magic_3, uint magic_4) public {
    require(magic_1 == 42);
    require(magic_2 == 129);
    require(magic_3 == magic_4+333);
    value_found = true;
    return;
  }

  function echidna_magic_values() public returns (bool) {
    return !value_found;
  }

}
```

이 작은 예제는 에키드나가 상태 변수를 변경하기 위해 특정 값을 찾도록 강제합니다. 이는 퍼저에게 어려운 작업입니다
([맨티코어](https://github.com/trailofbits/manticore)와 같은 기호 실행 도구를 사용하는 것이 권장됩니다).
에키드나를 실행하여 이를 확인할 수 있습니다:

```bash
echidna-test magic.sol
...

echidna_magic_values: passed! 🎉

Seed: 2221503356319272685
```

하지만 이 퍼징 캠페인을 실행할 때 여전히 에키드나를 사용하여 코퍼스를 수집할 수 있습니다.

### 코퍼스 수집하기 {#collecting-a-corpus}

코퍼스 수집을 활성화하려면 코퍼스 디렉터리를 생성하세요:

```bash
mkdir corpus-magic
```

그리고 [에키드나 구성 파일](https://github.com/crytic/echidna/wiki/Config) `config.yaml`를 생성합니다:

```yaml
coverage: true
corpusDir: "corpus-magic"
```

이제 도구를 실행하고 수집된 코퍼스를 확인할 수 있습니다:

```bash
echidna-test magic.sol --config config.yaml
```

에키드나는 여전히 올바른 매직 값을 찾을 수 없지만, 수집된 코퍼스를 살펴볼 수는 있습니다.
예를 들어, 이 파일 중 하나는 다음과 같았습니다:

```json
[
  {
    "_gas'": "0xffffffff",
    "_delay": ["0x13647", "0xccf6"],
    "_src": "00a329c0648769a73afac7f9381e08fb43dbea70",
    "_dst": "00a329c0648769a73afac7f9381e08fb43dbea72",
    "_value": "0x0",
    "_call": {
      "tag": "SolCall",
      "contents": [
        "magic",
        [
          {
            "contents": [
              256,
              "93723985220345906694500679277863898678726808528711107336895287282192244575836"
            ],
            "tag": "AbiUInt"
          },
          {
            "contents": [256, "334"],
            "tag": "AbiUInt"
          },
          {
            "contents": [
              256,
              "68093943901352437066264791224433559271778087297543421781073458233697135179558"
            ],
            "tag": "AbiUInt"
          },
          {
            "tag": "AbiUInt",
            "contents": [256, "332"]
          }
        ]
      ]
    },
    "_gasprice'": "0xa904461f1"
  }
]
```

분명히 이 입력은 속성에서 실패를 유발하지 않습니다. 하지만 다음 단계에서 이를 위해 입력을 수정하는 방법을 살펴보겠습니다.

### 코퍼스 시딩하기 {#seeding-a-corpus}

에키드나가 `magic` 함수를 처리하려면 약간의 도움이 필요합니다. 적절한 매개변수를 사용하도록 입력을 복사하고 수정해 보겠습니다:

```bash
cp corpus/2712688662897926208.txt corpus/new.txt
```

`magic(42,129,333,0)`를 호출하도록 `new.txt`를 수정할 것입니다. 이제 에키드나를 다시 실행할 수 있습니다:

```bash
echidna-test magic.sol --config config.yaml
...
echidna_magic_values: failed!💥
  Call sequence:
    magic(42,129,333,0)


Unique instructions: 142
Unique codehashes: 1
Seed: -7293830866560616537

```

이번에는 속성이 즉시 위반된다는 것을 발견했습니다.

## 가스 소비량이 높은 트랜잭션 찾기 {#finding-transactions-with-high-gas-consumption}

에키드나를 사용하여 가스 소비량이 높은 트랜잭션을 찾는 방법을 살펴보겠습니다. 대상은 다음 스마트 컨트랙트입니다:

```solidity
contract C {
  uint state;

  function expensive(uint8 times) internal {
    for(uint8 i=0; i < times; i++)
      state = state + i;
  }

  function f(uint x, uint y, uint8 times) public {
    if (x == 42 && y == 123)
      expensive(times);
    else
      state = 0;
  }

  function echidna_test() public returns (bool) {
    return true;
  }

}
```

여기서 `expensive`는 가스 소비량이 클 수 있습니다.

현재 에키드나는 항상 테스트할 속성이 필요합니다. 여기서 `echidna_test`는 항상 `true`를 반환합니다.
에키드나를 실행하여 이를 확인할 수 있습니다:

```
echidna-test gas.sol
...
echidna_test: passed! 🎉

Seed: 2320549945714142710
```

### 가스 소비량 측정하기 {#measuring-gas-consumption}

에키드나에서 가스 소비량 측정을 활성화하려면 구성 파일 `config.yaml`를 생성하세요:

```yaml
estimateGas: true
```

이 예제에서는 결과를 더 쉽게 이해할 수 있도록 트랜잭션 시퀀스의 크기도 줄일 것입니다:

```yaml
seqLen: 2
estimateGas: true
```

### 에키드나 실행하기 {#run-echidna-3}

구성 파일이 생성되면 다음과 같이 에키드나를 실행할 수 있습니다:

```bash
echidna-test gas.sol --config config.yaml
...
echidna_test: passed! 🎉

f used a maximum of 1333608 gas
  Call sequence:
    f(42,123,249) Gas price: 0x10d5733f0a Time delay: 0x495e5 Block delay: 0x88b2

Unique instructions: 157
Unique codehashes: 1
Seed: -325611019680165325

```

- 표시된 가스는 [HEVM](https://github.com/dapphub/dapptools/tree/master/src/hevm#hevm-)에서 제공하는 추정치입니다.

### 가스를 줄이는 호출 필터링하기 {#filtering-out-gas-reducing-calls}

위의 **퍼징 캠페인 중 호출할 함수 필터링하기** 튜토리얼에서는 테스트에서 일부 함수를 제거하는 방법을 보여줍니다.  
이는 정확한 가스 추정치를 얻는 데 매우 중요할 수 있습니다.
다음 예제를 고려해 보세요:

```solidity
contract C {
  address [] addrs;
  function push(address a) public {
    addrs.push(a);
  }
  function pop() public {
    addrs.pop();
  }
  function clear() public{
    addrs.length = 0;
  }
  function check() public{
    for(uint256 i = 0; i < addrs.length; i++)
      for(uint256 j = i+1; j < addrs.length; j++)
        if (addrs[i] == addrs[j])
          addrs[j] = address(0x0);
  }
  function echidna_test() public returns (bool) {
      return true;
  }
}
```

에키드나가 모든 함수를 호출할 수 있다면 가스 비용이 높은 트랜잭션을 쉽게 찾지 못할 것입니다:

```
echidna-test pushpop.sol --config config.yaml
...
pop used a maximum of 10746 gas
...
check used a maximum of 23730 gas
...
clear used a maximum of 35916 gas
...
push used a maximum of 40839 gas
```

비용은 `addrs`의 크기에 따라 달라지며, 무작위 호출은 배열을 거의 비워두는 경향이 있기 때문입니다.
하지만 `pop`와 `clear`를 블랙리스트에 추가하면 훨씬 더 나은 결과를 얻을 수 있습니다:

```yaml
filterBlacklist: true
filterFunctions: ["pop", "clear"]
```

```
echidna-test pushpop.sol --config config.yaml
...
push used a maximum of 40839 gas
...
check used a maximum of 1484472 gas
```

### 요약: 가스 소비량이 높은 트랜잭션 찾기 {#summary-finding-transactions-with-high-gas-consumption}

에키드나는 `estimateGas` 구성 옵션을 사용하여 가스 소비량이 높은 트랜잭션을 찾을 수 있습니다:

```yaml
estimateGas: true
```

```bash
echidna-test contract.sol --config config.yaml
...
```

에키드나는 퍼징 캠페인이 끝나면 모든 함수에 대해 최대 가스 소비량을 가진 시퀀스를 보고합니다.