---
title: "Echidna를 사용하여 스마트 계약을 테스트하는 방법"
description: "Echidna를 사용하여 스마트 계약을 자동으로 테스트하는 방법"
author: "Trailofbits"
lang: ko
tags: [ "솔리디티", "스마트 계약", "보안", "테스트", "퍼징" ]
skill: advanced
published: 2020-04-10
source: "안전한 계약 구축하기"
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna
---

## 설치 {#installation}

Echidna는 도커를 통해 설치하거나 사전 컴파일된 바이너리를 사용하여 설치할 수 있습니다.

### 도커를 통한 Echidna 설치 {#echidna-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_마지막 명령어는 현재 디렉터리에 액세스할 수 있는 docker에서 eth-security-toolbox를 실행합니다. 호스트에서 파일을 변경하고 docker의 파일에서 도구를 실행할 수 있습니다_

도커 내부에서 다음을 실행하세요:

```bash
solc-select 0.5.11
cd /home/training
```

### 바이너리 {#binary}

[https://github.com/crytic/echidna/releases/tag/v1.4.0.0](https://github.com/crytic/echidna/releases/tag/v1.4.0.0)

## 속성 기반 퍼징 소개 {#introduction-to-property-based-fuzzing}

Echidna는 속성 기반 퍼저이며, 이전 블로그 게시물([1](https://blog.trailofbits.com/2018/03/09/echidna-a-smart-fuzzer-for-ethereum/), [2](https://blog.trailofbits.com/2018/05/03/state-machine-testing-with-echidna/), [3](https://blog.trailofbits.com/2020/03/30/an-echidna-for-all-seasons/))에서 설명했습니다.

### 퍼징 {#fuzzing}

[퍼징](https://wikipedia.org/wiki/Fuzzing)은 보안 커뮤니티에서 잘 알려진 기술입니다. 이는 프로그램의 버그를 찾기 위해 다소 무작위적인 입력을 생성하는 것으로 구성됩니다. [AFL](http://lcamtuf.coredump.cx/afl/) 또는 [LibFuzzer](https://llvm.org/docs/LibFuzzer.html)와 같은 기존 소프트웨어용 퍼저는 버그를 찾는 데 효율적인 도구로 알려져 있습니다.

순전히 무작위적인 입력 생성 외에도 다음과 같이 좋은 입력을 생성하기 위한 많은 기술과 전략이 있습니다.

- 각 실행에서 피드백을 얻고 이를 사용하여 생성을 유도합니다. 예를 들어, 새로 생성된 입력이 새로운 경로의 발견으로 이어지는 경우, 그와 가까운 새 입력을 생성하는 것이 합리적일 수 있습니다.
- 구조적 제약 조건을 준수하는 입력 생성. 예를 들어, 입력에 체크섬이 있는 헤더가 포함된 경우 퍼저가 체크섬을 검증하는 입력을 생성하도록 하는 것이 합리적입니다.
- 알려진 입력을 사용하여 새 입력 생성: 유효한 입력의 대규모 데이터 세트에 액세스할 수 있는 경우, 퍼저는 처음부터 생성을 시작하는 대신 이를 통해 새 입력을 생성할 수 있습니다. 이를 보통 _시드_라고 합니다.

### 속성 기반 퍼징 {#property-based-fuzzing}

Echidna는 [QuickCheck](https://wikipedia.org/wiki/QuickCheck)에서 크게 영감을 받은 속성 기반 퍼징이라는 특정 퍼저 제품군에 속합니다. 충돌을 찾으려는 기존 퍼저와 달리, Echidna는 사용자 정의 불변 속성을 깨려고 시도합니다.

스마트 계약에서 불변 속성은 솔리디티 함수로, 계약이 도달할 수 있는 부정확하거나 유효하지 않은 상태를 나타낼 수 있으며 다음을 포함합니다.

- 부정확한 접근 제어: 공격자가 계약의 소유자가 됩니다.
- 부정확한 상태 머신: 계약이 일시 중지된 동안 토큰이 전송될 수 있습니다.
- 부정확한 산술: 사용자가 잔액 언더플로를 일으켜 무제한 무료 토큰을 얻을 수 있습니다.

### Echidna로 속성 테스트하기 {#testing-a-property-with-echidna}

Echidna로 스마트 계약을 테스트하는 방법을 알아보겠습니다. 대상은 다음 스마트 계약인 [`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol)입니다.

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

이 토큰이 다음과 같은 속성을 가져야 한다고 가정하겠습니다.

- 누구나 최대 1,000개의 토큰을 가질 수 있습니다.
- 토큰은 전송할 수 없습니다(ERC20 토큰이 아닙니다).

### 속성 작성하기 {#write-a-property}

Echidna 속성은 솔리디티 함수입니다. 속성은 다음을 충족해야 합니다.

- 인수가 없어야 합니다.
- 성공하면 `true`를 반환해야 합니다.
- 이름이 `echidna`로 시작해야 합니다.

Echidna는 다음을 수행합니다.

- 속성을 테스트하기 위해 임의의 트랜잭션을 자동으로 생성합니다.
- 속성이 `false`를 반환하거나 오류를 발생시키는 모든 트랜잭션을 보고합니다.
- 속성을 호출할 때 부작용을 무시합니다(즉, 속성이 상태 변수를 변경하면 테스트 후 폐기됩니다).

다음 속성은 호출자가 1,000개 이하의 토큰을 가지고 있는지 확인합니다.

```solidity
function echidna_balance_under_1000() public view returns(bool){
      return balances[msg.sender] <= 1000;
}
```

상속을 사용하여 계약과 속성을 분리하세요.

```solidity
contract TestToken is Token{
      function echidna_balance_under_1000() public view returns(bool){
            return balances[msg.sender] <= 1000;
      }
  }
```

[`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol)은 속성을 구현하고 토큰에서 상속받습니다.

### 계약 초기화하기 {#initiate-a-contract}

Echidna는 인수가 없는 [생성자](/developers/docs/smart-contracts/anatomy/#constructor-functions)가 필요합니다. 계약에 특정 초기화가 필요한 경우 생성자에서 수행해야 합니다.

Echidna에는 몇 가지 특정 주소가 있습니다.

- 생성자를 호출하는 `0x00a329c0648769A73afAc7F9381E08FB43dBEA72`
- 다른 함수를 무작위로 호출하는 `0x10000`, `0x20000`, `0x00a329C0648769a73afAC7F9381e08fb43DBEA70`

현재 예시에서는 특별한 초기화가 필요 없으므로 생성자가 비어 있습니다.

### Echidna 실행하기 {#run-echidna}

Echidna는 다음으로 실행됩니다.

```bash
echidna-test contract.sol
```

contract.sol에 여러 계약이 포함된 경우 대상을 지정할 수 있습니다.

```bash
echidna-test contract.sol --contract MyContract
```

### 요약: 속성 테스트하기 {#summary-testing-a-property}

다음은 예시에 대한 Echidna 실행 요약입니다.

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

Echidna는 `backdoor`가 호출되면 속성이 위반된다는 것을 발견했습니다.

## 퍼징 캠페인 중 호출할 함수 필터링하기 {#filtering-functions-to-call-during-a-fuzzing-campaign}

퍼징될 함수를 필터링하는 방법을 알아보겠습니다.
대상은 다음 스마트 계약입니다.

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

이 간단한 예시는 Echidna가 상태 변수를 변경하기 위해 특정 트랜잭션 시퀀스를 찾도록 강제합니다.
이는 퍼저에게는 어려운 일입니다( [Manticore](https://github.com/trailofbits/manticore)와 같은 심볼릭 실행 도구를 사용하는 것이 좋습니다).
Echidna를 실행하여 이를 확인할 수 있습니다.

```bash
echidna-test multi.sol
...
echidna_state4: passed! 🎉
Seed: -3684648582249875403
```

### 함수 필터링하기 {#filtering-functions}

Echidna는 두 개의 리셋 함수(`reset1` 및 `reset2`)가 모든 상태 변수를 `false`로 설정하기 때문에 이 계약을 테스트할 올바른 시퀀스를 찾는 데 어려움을 겪습니다.
하지만 특별한 Echidna 기능을 사용하여 리셋 함수를 블랙리스트에 추가하거나 `f`, `g`, `h`, `i` 함수만 화이트리스트에 추가할 수 있습니다.

함수를 블랙리스트에 추가하려면 이 구성 파일을 사용할 수 있습니다.

```yaml
filterBlacklist: true
filterFunctions: ["reset1", "reset2"]
```

함수를 필터링하는 또 다른 접근 방식은 화이트리스트에 추가된 함수를 나열하는 것입니다. 이를 위해 이 구성 파일을 사용할 수 있습니다.

```yaml
filterBlacklist: false
filterFunctions: ["f", "g", "h", "i"]
```

- `filterBlacklist`는 기본적으로 `true`입니다.
- 필터링은 이름으로만 수행됩니다(매개변수 없음). `f()`와 `f(uint256)`이 있는 경우 `"f"` 필터는 두 함수 모두와 일치합니다.

### Echidna 실행하기 {#run-echidna-1}

`blacklist.yaml` 구성 파일로 Echidna를 실행하려면:

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

Echidna는 속성이 거짓임을 증명하는 트랜잭션 시퀀스를 거의 즉시 찾을 것입니다.

### 요약: 함수 필터링하기 {#summary-filtering-functions}

Echidna는 퍼징 캠페인 중에 다음을 사용하여 호출할 함수를 블랙리스트 또는 화이트리스트에 추가할 수 있습니다.

```yaml
filterBlacklist: true
filterFunctions: ["f1", "f2", "f3"]
```

```bash
echidna-test contract.sol --config config.yaml
...
```

Echidna는 `filterBlacklist` 불리언 값에 따라 `f1`, `f2`, `f3`을 블랙리스트에 추가하거나 이들만 호출하는 퍼징 캠페인을 시작합니다.

## Echidna로 솔리디티의 assert 테스트하는 방법 {#how-to-test-soliditys-assert-with-echidna}

이 짧은 튜토리얼에서는 Echidna를 사용하여 계약의 어설션 확인을 테스트하는 방법을 보여줍니다. 다음과 같은 계약이 있다고 가정해 보겠습니다.

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

### 어설션 작성하기 {#write-an-assertion}

차이를 반환한 후 `tmp`가 `counter`보다 작거나 같은지 확인하고 싶습니다. Echidna 속성을 작성할 수 있지만, `tmp` 값을 어딘가에 저장해야 합니다. 대신 다음과 같은 어설션을 사용할 수 있습니다.

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

### Echidna 실행하기 {#run-echidna-2}

어설션 실패 테스트를 활성화하려면 [Echidna 구성 파일](https://github.com/crytic/echidna/wiki/Config) `config.yaml`을 만드세요.

```yaml
checkAsserts: true
```

Echidna에서 이 계약을 실행하면 예상된 결과를 얻을 수 있습니다.

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

보시다시피, Echidna는 `inc` 함수에서 일부 어설션 실패를 보고합니다. 함수당 하나 이상의 어설션을 추가할 수 있지만, Echidna는 어떤 어설션이 실패했는지 알 수 없습니다.

### 어설션을 사용하는 시기와 방법 {#when-and-how-use-assertions}

어설션은 명시적 속성의 대안으로 사용될 수 있으며, 특히 확인할 조건이 일부 작업 `f`의 올바른 사용과 직접적으로 관련된 경우에 유용합니다. 일부 코드 뒤에 어설션을 추가하면 코드가 실행된 직후에 확인이 수행되도록 강제합니다.

```solidity
function f(..) public {
    // some complex code
    ...
    assert (condition);
    ...
}

```

반대로, 명시적 Echidna 속성을 사용하면 트랜잭션이 무작위로 실행되며 언제 확인될지 정확히 강제할 쉬운 방법이 없습니다. 다음과 같은 해결 방법을 사용할 수는 있습니다.

```solidity
function echidna_assert_after_f() public returns (bool) {
    f(..);
    return(condition);
}
```

하지만 몇 가지 문제가 있습니다.

- `f`가 `internal` 또는 `external`로 선언된 경우 실패합니다.
- `f`를 호출하는 데 어떤 인수를 사용해야 하는지 불분명합니다.
- `f`가 revert되면 속성이 실패합니다.

일반적으로 어설션 사용 방법에 대한 [John Regehr의 권장 사항](https://blog.regehr.org/archives/1091)을 따르는 것이 좋습니다.

- 어설션 확인 중에 부작용을 강제하지 마세요. 예: `assert(ChangeStateAndReturn() == 1)`
- 명백한 문장을 어설션하지 마세요. 예: `var`가 `uint`로 선언된 경우 `assert(var >= 0)`

마지막으로, Echidna가 이를 감지할 수 없으므로(하지만 계약은 어쨌든 revert됩니다) `assert` 대신 `require`를 **사용하지 마세요**.

### 요약: 어설션 확인 {#summary-assertion-checking}

다음은 예시에 대한 Echidna 실행 요약입니다.

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

Echidna는 이 함수가 큰 인수로 여러 번 호출될 경우 `inc`의 어설션이 실패할 수 있음을 발견했습니다.

## Echidna 코퍼스 수집 및 수정하기 {#collecting-and-modifying-an-echidna-corpus}

Echidna로 트랜잭션 코퍼스를 수집하고 사용하는 방법을 알아보겠습니다. 대상은 다음 스마트 계약인 [`magic.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/magic.sol)입니다.

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

이 작은 예제는 Echidna가 상태 변수를 변경하기 위해 특정 값을 찾도록 강제합니다. 이는 퍼저에게는 어려운 일입니다( [Manticore](https://github.com/trailofbits/manticore)와 같은 심볼릭 실행 도구를 사용하는 것이 좋습니다).
Echidna를 실행하여 이를 확인할 수 있습니다.

```bash
echidna-test magic.sol
...

echidna_magic_values: passed! 🎉

Seed: 2221503356319272685
```

하지만, 이 퍼징 캠페인을 실행할 때 Echidna를 사용하여 코퍼스를 수집할 수 있습니다.

### 코퍼스 수집하기 {#collecting-a-corpus}

코퍼스 수집을 활성화하려면 코퍼스 디렉터리를 만드세요.

```bash
mkdir corpus-magic
```

그리고 [Echidna 구성 파일](https://github.com/crytic/echidna/wiki/Config) `config.yaml`:

```yaml
coverage: true
corpusDir: "corpus-magic"
```

이제 도구를 실행하고 수집된 코퍼스를 확인할 수 있습니다.

```bash
echidna-test magic.sol --config config.yaml
```

Echidna는 여전히 올바른 매직 값을 찾을 수 없지만 수집된 코퍼스를 살펴볼 수 있습니다.
예를 들어, 이러한 파일 중 하나는 다음과 같습니다.

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

분명히, 이 입력은 우리 속성의 실패를 유발하지 않을 것입니다. 하지만, 다음 단계에서 이를 위해 수정하는 방법을 알아보겠습니다.

### 코퍼스 시딩하기 {#seeding-a-corpus}

Echidna는 `magic` 함수를 처리하기 위해 약간의 도움이 필요합니다. 적절한 매개변수를 사용하도록 입력을 복사하고 수정할 것입니다.

```bash
cp corpus/2712688662897926208.txt corpus/new.txt
```

`new.txt`를 수정하여 `magic(42,129,333,0)`을 호출할 것입니다. 이제 Echidna를 다시 실행할 수 있습니다.

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

## 높은 가스 소비량을 가진 트랜잭션 찾기 {#finding-transactions-with-high-gas-consumption}

Echidna를 사용하여 높은 가스 소비량을 가진 트랜잭션을 찾는 방법을 알아보겠습니다. 대상은 다음 스마트 계약입니다.

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

여기서 `expensive`는 많은 가스를 소비할 수 있습니다.

현재 Echidna는 항상 테스트할 속성이 필요합니다. 여기서 `echidna_test`는 항상 `true`를 반환합니다.
Echidna를 실행하여 이를 확인할 수 있습니다.

```
echidna-test gas.sol
...
echidna_test: passed! 🎉

Seed: 2320549945714142710
```

### 가스 소비량 측정하기 {#measuring-gas-consumption}

Echidna로 가스 소비량 측정을 활성화하려면 구성 파일 `config.yaml`을 만드세요.

```yaml
estimateGas: true
```

이 예제에서는 결과를 더 쉽게 이해할 수 있도록 트랜잭션 시퀀스의 크기도 줄일 것입니다.

```yaml
seqLen: 2
estimateGas: true
```

### Echidna 실행하기 {#run-echidna-3}

구성 파일이 생성되면 다음과 같이 Echidna를 실행할 수 있습니다.

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

### 가스 감소 호출 필터링하기 {#filtering-out-gas-reducing-calls}

위의 **퍼징 캠페인 중 호출할 함수 필터링하기** 튜토리얼은 테스트에서 일부 함수를 제거하는 방법을 보여줍니다.  
이는 정확한 가스 추정치를 얻는 데 중요할 수 있습니다.
다음 예시를 살펴보겠습니다.

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

Echidna가 모든 함수를 호출할 수 있다면 높은 가스 비용의 트랜잭션을 쉽게 찾을 수 없습니다.

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

비용이 `addrs`의 크기에 따라 달라지고 무작위 호출은 배열을 거의 비어 있게 만드는 경향이 있기 때문입니다.
그러나 `pop`과 `clear`를 블랙리스트에 추가하면 훨씬 더 좋은 결과를 얻을 수 있습니다.

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

### 요약: 높은 가스 소비량을 가진 트랜잭션 찾기 {#summary-finding-transactions-with-high-gas-consumption}

`estimateGas` 구성 옵션을 사용하여 Echidna는 높은 가스 소비량을 가진 트랜잭션을 찾을 수 있습니다.

```yaml
estimateGas: true
```

```bash
echidna-test contract.sol --config config.yaml
...
```

Echidna는 퍼징 캠페인이 끝나면 모든 기능에 대한 최대 가스 소비량과 함께 시퀀스를 보고합니다.
