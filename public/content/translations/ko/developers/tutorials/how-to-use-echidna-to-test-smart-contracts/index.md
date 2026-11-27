---
title: "에키드나를 사용하여 스마트 컨트랙트를 테스트하는 방법"
description: "에키드나를 사용하여 스마트 컨트랙트를 자동으로 테스트하는 방법"
author: "트레일오브비츠"
lang: ko
tags: ["Solidity", "스마트 컨트랙트", "보안", "테스트", "퍼징"]
skill: advanced
breadcrumb: "에키드나"
published: 2020-04-10
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna
---

## 설치 {#installation}

에키드나는 Docker, Homebrew를 통해 설치하거나 사전 컴파일된 바이너리를 사용하여 설치할 수 있습니다. 이 튜토리얼의 예제는 에키드나 2.3.3 및 solc 0.8.37에서 테스트되었습니다.

### Docker를 통한 에키드나 설치 {#echidna-through-docker}

```sh
docker pull ghcr.io/crytic/echidna/echidna:latest
docker run --rm -it -v "$PWD":/src ghcr.io/crytic/echidna/echidna:latest
```

_마지막 명령어는 현재 디렉터리에 접근할 수 있는 Docker에서 에키드나 이미지를 실행합니다. 호스트에서 파일을 변경하고 Docker에서 해당 파일에 대해 도구를 실행할 수 있습니다. 이 이미지에는 [슬리더](https://github.com/crytic/slither), [crytic-compile](https://github.com/crytic/crytic-compile) 및 [solc-select](https://github.com/crytic/solc-select)도 함께 제공됩니다._

Docker 내부에서 다음을 실행하세요:

```sh
solc-select install 0.8.37
solc-select use 0.8.37
cd /src
```

### 바이너리 {#binary}

[https://github.com/crytic/echidna/releases/latest](https://github.com/crytic/echidna/releases/latest)에서 사용 중인 플랫폼에 맞는 최신 릴리스를 다운로드하세요. macOS나 Linux에서는 `brew install echidna`를 실행할 수도 있으며, 이 경우 슬리더와 crytic-compile이 함께 설치됩니다.

릴리스 바이너리를 사용할 때는 [슬리더](https://github.com/crytic/slither)와 [solc-select](https://github.com/crytic/solc-select)를 직접 설치하고(예: Python 가상 환경에서 `pip3 install slither-analyzer solc-select` 실행) 컴파일러 버전을 선택해야 합니다:

```sh
solc-select install 0.8.37
solc-select use 0.8.37
```

에키드나는 슬리더 없이도 실행되지만, 슬리더는 `require` 문에 사용된 매직 넘버와 같은 상수를 추출하며, 아래의 여러 예제는 버그를 빠르게 찾기 위해 슬리더에 의존합니다.

## 속성 기반 퍼징 소개 {#introduction-to-property-based-fuzzing}

에키드나는 이전 블로그 게시물([1](https://blog.trailofbits.com/2018/03/09/echidna-a-smart-fuzzer-for-ethereum/), [2](https://blog.trailofbits.com/2018/05/03/state-machine-testing-with-echidna/), [3](https://blog.trailofbits.com/2020/03/30/an-echidna-for-all-seasons/))에서 설명한 속성 기반 퍼저(fuzzer)입니다.

### 퍼징 {#fuzzing}

[퍼징](https://wikipedia.org/wiki/Fuzzing)은 보안 커뮤니티에서 잘 알려진 기법입니다. 프로그램에서 버그를 찾기 위해 무작위에 가까운 입력을 생성하는 방식으로 구성됩니다. 기존 소프트웨어용 퍼저([AFL](http://lcamtuf.coredump.cx/afl/) 또는 [LibFuzzer](https://llvm.org/docs/LibFuzzer.html) 등)는 버그를 찾는 데 효율적인 도구로 알려져 있습니다.

순수하게 무작위로 입력을 생성하는 것을 넘어, 좋은 입력을 생성하기 위한 다양한 기법과 전략이 있습니다:

- 각 실행에서 피드백을 얻고 이를 사용하여 생성을 유도합니다. 예를 들어, 새로 생성된 입력이 새로운 경로의 디스커버리로 이어진다면, 그와 가까운 새로운 입력을 생성하는 것이 합리적일 수 있습니다.
- 구조적 제약 조건을 준수하여 입력을 생성합니다. 예를 들어, 입력에 체크섬이 포함된 헤더가 있는 경우, 퍼저가 체크섬을 검증하는 입력을 생성하도록 하는 것이 합리적입니다.
- 알려진 입력을 사용하여 새로운 입력을 생성합니다. 유효한 입력의 대규모 데이터 세트에 접근할 수 있는 경우, 퍼저는 처음부터 생성을 시작하는 대신 이를 기반으로 새로운 입력을 생성할 수 있습니다. 이를 보통 <em>시드(seeds)</em>라고 부릅니다.

### 속성 기반 퍼징 {#property-based-fuzzing}

에키드나는 특정 퍼저 제품군에 속합니다. 바로 [QuickCheck](https://wikipedia.org/wiki/QuickCheck)에서 큰 영감을 받은 속성 기반 퍼징입니다. 크래시를 찾으려는 기존 퍼저와 달리, 에키드나는 사용자가 정의한 불변성(invariants)을 깨뜨리려고 시도합니다.

스마트 컨트랙트에서 불변성은 Solidity 함수이며, 컨트랙트가 도달할 수 있는 부정확하거나 유효하지 않은 상태를 나타낼 수 있습니다. 여기에는 다음이 포함됩니다:

- 잘못된 접근 제어: 공격자가 컨트랙트의 소유자가 됨.
- 잘못된 상태 머신: 컨트랙트가 일시 중지된 상태에서 토큰이 전송될 수 있음.
- 잘못된 산술 연산: 사용자가 잔액을 언더플로시켜 무제한의 무료 토큰을 얻을 수 있음.

### 에키드나로 속성 테스트하기 {#testing-a-property-with-echidna}

에키드나로 스마트 컨트랙트를 테스트하는 방법을 살펴보겠습니다. 대상은 다음 스마트 컨트랙트 [`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol)입니다:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract Token {
    mapping(address => uint256) public balances;

    function airdrop() public {
        balances[msg.sender] = 1000;
    }

    function consume() public {
        require(balances[msg.sender] > 0);
        balances[msg.sender] -= 1;
    }

    function backdoor() public {
        balances[msg.sender] += 1;
    }
}
```

이 토큰이 다음과 같은 속성을 가져야 한다고 가정해 보겠습니다:

- 누구나 최대 1000개의 토큰을 가질 수 있습니다.
- 토큰은 전송할 수 없습니다(ERC-20 토큰이 아님).

### 속성 작성하기 {#write-a-property}

에키드나 속성은 Solidity 함수입니다. 속성은 다음 조건을 충족해야 합니다:

- 인수가 없어야 합니다.
- 성공할 경우 `true`를 반환해야 합니다.
- 이름이 `echidna`로 시작해야 합니다.

에키드나는 다음을 수행합니다:

- 속성을 테스트하기 위해 임의의 트랜잭션을 자동으로 생성합니다.
- 속성이 `false`를 반환하거나 오류를 발생시키게 만드는 모든 트랜잭션을 보고합니다.
- 속성을 호출할 때 발생하는 부작용을 폐기합니다(즉, 속성이 상태 변수를 변경하더라도 테스트 후에는 폐기됨).

다음 속성은 호출자가 1000개 이하의 토큰을 가지고 있는지 확인합니다:

```solidity
function echidna_balance_under_1000() public view returns (bool) {
    return balances[msg.sender] <= 1000;
}
```

상속을 사용하여 컨트랙트와 속성을 분리하세요:

```solidity
contract TestToken is Token {
    function echidna_balance_under_1000() public view returns (bool) {
        return balances[msg.sender] <= 1000;
    }
}
```

[`testtoken.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/testtoken.sol)는 속성을 구현하고 토큰에서 상속받습니다.

### 컨트랙트 초기화하기 {#initiate-a-contract}

에키드나에는 인수가 없는 [생성자](/developers/docs/smart-contracts/anatomy/#constructor-functions)가 필요합니다. 컨트랙트에 특정 초기화가 필요한 경우 생성자에서 수행해야 합니다.

에키드나에는 몇 가지 특정 주소가 있습니다:

- 생성자를 호출하는 `0x30000`.
- 다른 함수들을 무작위로 호출하는 `0x10000`, `0x20000`, `0x30000`.
- 테스트 중인 컨트랙트가 배포되는 `0x00a329c0648769A73afAc7F9381E08FB43dBEA72`.

현재 예제에서는 특별한 초기화가 필요하지 않으므로 생성자가 비어 있습니다.

### 에키드나 실행하기 {#run-echidna}

에키드나는 다음 명령어로 실행됩니다:

```sh
echidna contract.sol
```

contract.sol에 여러 컨트랙트가 포함된 경우 대상을 지정할 수 있습니다:

```sh
echidna contract.sol --contract MyContract
```

터미널에서 실행하면 에키드나는 대화형 UI를 표시합니다. 아래 예제와 같은 일반 텍스트 출력을 얻으려면 `--format text`를 추가하세요.

### 요약: 속성 테스트하기 {#summary-testing-a-property}

다음은 예제에서 에키드나를 실행한 결과를 요약한 것입니다:

```solidity
contract TestToken is Token {
    constructor() {}

    function echidna_balance_under_1000() public view returns (bool) {
        return balances[msg.sender] <= 1000;
    }
}
```

```sh
echidna testtoken.sol --contract TestToken
...

echidna_balance_under_1000: failed!💥
  Call sequence:
    TestToken.airdrop()
    TestToken.backdoor()

...
```

에키드나는 `backdoor`가 호출되면 속성이 위반된다는 것을 발견했습니다.

## 퍼징 캠페인 중 호출할 함수 필터링하기 {#filtering-functions-to-call-during-a-fuzzing-campaign}

퍼징할 함수를 필터링하는 방법을 살펴보겠습니다.
대상은 다음 스마트 컨트랙트입니다:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    bool state1 = false;
    bool state2 = false;
    bool state3 = false;
    bool state4 = false;

    function f(uint256 x) public {
        require(x == 12);
        state1 = true;
    }

    function g(uint256 x) public {
        require(state1);
        require(x == 8);
        state2 = true;
    }

    function h(uint256 x) public {
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

    function echidna_state4() public view returns (bool) {
        return (!state4);
    }
}
```

이 작은 예제는 에키드나가 상태 변수를 변경하기 위해 특정 트랜잭션 시퀀스를 찾도록 강제합니다.
이는 퍼저에게 어려운 작업입니다.
에키드나를 실행하여 이를 확인할 수 있습니다:

```sh
echidna multi.sol
...
echidna_state4: passing
...
```

### 함수 필터링하기 {#filtering-functions}

두 개의 초기화 함수(`reset1` 및 `reset2`)가 모든 상태 변수를 `false`로 설정하기 때문에 에키드나는 이 컨트랙트를 테스트하기 위한 올바른 시퀀스를 찾는 데 어려움을 겪습니다.
하지만 에키드나의 특수 기능을 사용하여 초기화 함수를 블랙리스트에 추가하거나 `f`, `g`,
`h`, `i` 함수만 화이트리스트에 추가할 수 있습니다.

함수를 블랙리스트에 추가하려면 다음 구성 파일을 사용할 수 있습니다:

```yaml
filterBlacklist: true
filterFunctions: ["C.reset1()", "C.reset2()"]
```

함수를 필터링하는 또 다른 접근 방식은 화이트리스트에 추가된 함수를 나열하는 것입니다. 이를 위해 다음 구성 파일을 사용할 수 있습니다:

```yaml
filterBlacklist: false
filterFunctions: ["C.f(uint256)", "C.g(uint256)", "C.h(uint256)", "C.i()"]
```

- `filterBlacklist`는 기본적으로 `true`입니다.
- 필터링은 전체 함수 이름(컨트랙트 이름, `.`, 애플리케이션 바이너리 인터페이스 (ABI) 서명(예: `C.f(uint256)`))을 기준으로 수행됩니다. `f()`와 `f(uint256)`가 있는 경우 필터링할 대상을 정확히 선택할 수 있습니다. `"reset1"`와 같은 단순한 이름은 아무것과도 일치하지 않습니다.

### 에키드나 실행하기 {#run-echidna-1}

구성 파일 `blacklist.yaml`와 함께 에키드나를 실행하려면:

```sh
echidna multi.sol --config blacklist.yaml
...
echidna_state4: failed!💥
  Call sequence:
    C.f(12)
    C.g(8)
    C.h(42)
    C.i()
```

에키드나는 속성을 거짓으로 만드는 트랜잭션 시퀀스를 거의 즉시 찾을 것입니다.

### 요약: 함수 필터링하기 {#summary-filtering-functions}

에키드나는 다음을 사용하여 퍼징 캠페인 중 호출할 함수를 블랙리스트 또는 화이트리스트에 추가할 수 있습니다:

```yaml
filterBlacklist: true
filterFunctions: ["C.f1()", "C.f2()", "C.f3()"]
```

```sh
echidna contract.sol --config config.yaml
...
```

에키드나는 `filterBlacklist` 부울 값에 따라 `C.f1()`, `C.f2()`, `C.f3()`를 블랙리스트에 추가하거나 이들만 호출하여 퍼징 캠페인을 시작합니다.

## 에키드나로 Solidity의 단언(assert)을 테스트하는 방법 {#how-to-test-soliditys-assert-with-echidna}

이 짧은 튜토리얼에서는 에키드나를 사용하여 컨트랙트의 단언 검사를 테스트하는 방법을 보여드리겠습니다. 다음과 같은 컨트랙트가 있다고 가정해 보겠습니다:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract Incrementor {
    uint256 private counter = 2 ** 200;

    function inc(uint256 val) public returns (uint256) {
        uint256 tmp = counter;
        unchecked {
            counter += val;
        }
        // tmp <= counter
        return (counter - tmp);
    }
}
```

Solidity 0.8부터 산술 오버플로는 기본적으로 되돌리기(revert)됩니다. `unchecked` 블록은 래핑 동작을 복원하여 `counter`가 오버플로될 수 있도록 하며, 이것이 바로 에키드나가 찾기를 원하는 버그입니다.

### 단언 작성하기 {#write-an-assertion}

차이를 반환한 후 `tmp`가 `counter`보다 작거나 같은지 확인하고자 합니다. 에키드나 속성을 작성할 수도 있지만, `tmp` 값을 어딘가에 저장해야 합니다. 대신 다음과 같은 단언을 사용할 수 있습니다:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract Incrementor {
    uint256 private counter = 2 ** 200;

    function inc(uint256 val) public returns (uint256) {
        uint256 tmp = counter;
        unchecked {
            counter += val;
        }
        assert(tmp <= counter);
        return (counter - tmp);
    }
}
```

### 에키드나 실행하기 {#run-echidna-2}

단언 실패 테스트를 활성화하려면 명령줄에서 `--test-mode assertion`를 전달하거나 [에키드나 구성 파일](https://secure-contracts.com/program-analysis/echidna/configuration.html) `config.yaml`를 생성하세요:

```yaml
testMode: assertion
```

에키드나에서 이 컨트랙트를 실행하면 예상된 결과를 얻을 수 있습니다:

```sh
echidna assert.sol --config config.yaml
...
inc(uint256): failed!💥
  Call sequence:
    Incrementor.inc(49775183111401053618147883626307284970293609617350871827880350793793149469639)
    Incrementor.inc(5144534562104187441558356530962235826491531939599480973208359850367425338350)
    Incrementor.inc(60872766323599926080006863949466160074900015204811509590967924145028961380449)
...
```

보시다시피 에키드나는 `inc` 함수에서 단언 실패를 보고합니다. 함수당 두 개 이상의 단언을 추가할 수 있지만, 에키드나는 어떤 단언이 실패했는지 구별할 수 없습니다.

### 단언을 사용하는 시기와 방법 {#when-and-how-use-assertions}

단언은 명시적 속성의 대안으로 사용될 수 있으며, 특히 확인해야 할 조건이 특정 연산 `f`의 올바른 사용과 직접적으로 관련이 있는 경우에 유용합니다. 일부 코드 뒤에 단언을 추가하면 해당 코드가 실행된 직후에 검사가 수행되도록 강제할 수 있습니다:

```solidity
function f(..) public {
    // 일부 복잡한 코드
    ...
    assert (condition);
    ...
}

```

반대로 명시적인 에키드나 속성을 사용하면 트랜잭션이 무작위로 실행되며, 정확히 언제 검사될지 강제할 쉬운 방법이 없습니다. 다음과 같은 우회 방법을 사용할 수는 있습니다:

```solidity
function echidna_assert_after_f() public returns (bool) {
    f(..);
    return(condition);
}
```

하지만 몇 가지 문제가 있습니다:

- `f`가 `internal` 또는 `external`로 선언된 경우 실패합니다.
- `f`를 호출할 때 어떤 인수를 사용해야 하는지 불분명합니다.
- `f`가 되돌리기(revert)되면 속성이 실패합니다.

일반적으로 단언 사용 방법에 대해서는 [John Regehr의 권장 사항](https://blog.regehr.org/archives/1091)을 따르는 것을 권장합니다:

- 단언 검사 중에 부작용을 강제하지 마세요. 예: `assert(ChangeStateAndReturn() == 1)`
- 명백한 문장을 단언하지 마세요. 예: `var`가 `uint`로 선언된 경우 `assert(var >= 0)`.

마지막으로, `assert` 대신 `require`를 **사용하지 마세요**. 에키드나가 이를 감지할 수 없기 때문입니다(하지만 컨트랙트는 어쨌든 되돌리기됩니다).

### 요약: 단언 검사 {#summary-assertion-checking}

다음은 예제에서 에키드나를 실행한 결과를 요약한 것입니다:

```solidity
contract Incrementor {
    uint256 private counter = 2 ** 200;

    function inc(uint256 val) public returns (uint256) {
        uint256 tmp = counter;
        unchecked {
            counter += val;
        }
        assert(tmp <= counter);
        return (counter - tmp);
    }
}
```

```sh
echidna assert.sol --test-mode assertion
...
inc(uint256): failed!💥
  Call sequence:
    Incrementor.inc(49775183111401053618147883626307284970293609617350871827880350793793149469639)
    Incrementor.inc(5144534562104187441558356530962235826491531939599480973208359850367425338350)
    Incrementor.inc(60872766323599926080006863949466160074900015204811509590967924145028961380449)
...
```

에키드나는 큰 인수를 사용하여 이 함수를 여러 번 호출할 경우 `inc`의 단언이 실패할 수 있음을 발견했습니다.

## 에키드나 코퍼스 수집 및 수정하기 {#collecting-and-modifying-an-echidna-corpus}

에키드나를 사용하여 트랜잭션 코퍼스(corpus)를 수집하고 사용하는 방법을 살펴보겠습니다. 대상은 다음 스마트 컨트랙트 [`magic.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/magic.sol)입니다:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    bool value_found = false;

    function magic(uint256 magic_1, uint256 magic_2, uint256 magic_3, uint256 magic_4) public {
        require(magic_1 == 42);
        require(magic_2 == 129);
        require(magic_3 == magic_4 + 333);
        value_found = true;
        return;
    }

    function echidna_magic_values() public view returns (bool) {
        return !value_found;
    }
}
```

이 작은 예제는 에키드나가 상태 변수를 변경하기 위해 특정 값을 찾도록 강제합니다. 이는 퍼저에게 어려운 작업입니다.
에키드나를 실행하여 이를 확인할 수 있습니다:

```sh
echidna magic.sol
...

echidna_magic_values: passing
...
```

하지만 이 퍼징 캠페인을 실행할 때 여전히 에키드나를 사용하여 코퍼스를 수집할 수 있습니다.

### 코퍼스 수집하기 {#collecting-a-corpus}

코퍼스 수집을 활성화하려면 코퍼스 디렉터리를 생성하세요:

```sh
mkdir corpus-magic
```

그리고 [에키드나 구성 파일](https://secure-contracts.com/program-analysis/echidna/configuration.html) `config.yaml`를 생성하세요:

```yaml
corpusDir: "corpus-magic"
```

이제 도구를 실행하고 수집된 코퍼스를 확인할 수 있습니다:

```sh
echidna magic.sol --config config.yaml
```

에키드나는 여전히 올바른 매직 값을 찾지 못합니다. 어디서 막혔는지 확인하려면 `corpus-magic/covered.*.txt` 커버리지 보고서를 살펴보세요:

```text
7 | *   |     function magic(uint256 magic_1, uint256 magic_2, uint256 magic_3, uint256 magic_4) public {
  8 | *r  |         require(magic_1 == 42);
  9 | *r  |         require(magic_2 == 129);
 10 | *r  |         require(magic_3 == magic_4 + 333);
 11 |     |         value_found = true;
 12 |     |         return;
```

`r` 레이블은 에키드나가 해당 줄에 도달했지만 실행이 거기서 되돌리기되었으며, 마지막 `require` 이후의 줄은 전혀 실행되지 않았음을 의미합니다.

에키드나가 수집한 트랜잭션 시퀀스는 `corpus-magic/coverage/`에 JSON 파일로 저장됩니다. 예를 들어, 이 파일 중 하나의 첫 번째 트랜잭션은 다음과 같았습니다:

```json
[
  {
    "call": {
      "contents": [
        "magic",
        [
          {
            "contents": [
              256,
              "115792089237316195423570985008687907853269984665640564039457584007913129639806"
            ],
            "tag": "AbiUInt"
          },
          {
            "contents": [256, "761"],
            "tag": "AbiUInt"
          },
          {
            "contents": [
              256,
              "91238239174727894896282446013839801776340298206661877345279631871841712965531"
            ],
            "tag": "AbiUInt"
          },
          {
            "contents": [
              256,
              "115792089237316195423570985008687907853269984665640564039457584007913129639804"
            ],
            "tag": "AbiUInt"
          }
        ]
      ],
      "tag": "SolCall"
    },
    "delay": [
      "0x00000000000000000000000000000000000000000000000000000000000103ef",
      "0x000000000000000000000000000000000000000000000000000000000000d38b"
    ],
    "dst": "0x00a329c0648769A73afAc7F9381E08FB43dBEA72",
    "gas": 12500000,
    "gasprice": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "src": "0x0000000000000000000000000000000000020000",
    "value": "0x0000000000000000000000000000000000000000000000000000000000000000"
  }
]
```

분명히 이 입력은 속성의 실패를 유발하지 않습니다. 하지만 다음 단계에서 이를 위해 입력을 수정하는 방법을 살펴보겠습니다.

### 코퍼스 시딩하기 {#seeding-a-corpus}

에키드나가 `magic` 함수를 처리하려면 약간의 도움이 필요합니다. 적절한 매개변수를 사용하도록 입력을 복사하고 수정할 것입니다(파일 이름은 무작위이므로 자신의 `corpus-magic/coverage/` 디렉터리에 있는 파일을 사용하세요):

```sh
cp corpus-magic/coverage/249425678654647553.txt corpus-magic/coverage/new.txt
```

`magic(42,129,333,0)`를 호출하는 단일 트랜잭션이 포함되도록 `new.txt`를 수정할 것입니다. 이제 에키드나를 다시 실행할 수 있습니다:

```sh
echidna magic.sol --config config.yaml
...
echidna_magic_values: failed!💥
  Call sequence:
    C.magic(42,129,333,0)

...
```

이번에는 속성이 즉시 위반된다는 것을 발견했습니다.

## 가스 소비량이 높은 트랜잭션 찾기 {#finding-transactions-with-high-gas-consumption}

에키드나를 사용하여 가스 소비량이 높은 트랜잭션을 찾는 방법을 살펴보겠습니다. 이전 버전의 에키드나에는 이를 위한 `estimateGas` 옵션이 있었지만, 에키드나 2.3.0에서 제거되었습니다. 대신 `gasleft()`로 가스를 측정하고 에키드나의 [최적화 모드](https://secure-contracts.com/program-analysis/echidna/advanced/optimization_mode.html)가 이를 최대화하도록 합니다. 대상은 다음 스마트 컨트랙트입니다:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    uint256 state;

    function expensive(uint8 times) internal {
        for (uint8 i = 0; i < times; i++) {
            state = state + i;
        }
    }

    function f(uint256 x, uint256 y, uint8 times) public {
        if (x == 42 && y == 123) {
            expensive(times);
        } else {
            state = 0;
        }
    }
}
```

여기서 `expensive`는 가스 소비량이 클 수 있습니다.

### 가스 소비량 측정하기 {#measuring-gas-consumption}

최적화 모드에서 에키드나는 인수가 없고 `int256`를 반환하며 `echidna_`로 시작하는 함수를 찾고, 반환된 값을 최대화하는 트랜잭션 시퀀스를 찾으려고 시도합니다. `f`를 호출하고 사용된 가스를 기록하며 최댓값을 노출하는 테스트 컨트랙트를 추가합니다(두 컨트랙트를 모두 `gas.sol`에 저장하세요):

```solidity
contract TestGas is C {
    int256 maxGasUsed;

    function measureF(uint256 x, uint256 y, uint8 times) public {
        uint256 start = gasleft();
        f(x, y, times);
        int256 used = int256(start - gasleft());
        if (used > maxGasUsed) {
            maxGasUsed = used;
        }
    }

    function echidna_opt_gas_f() public view returns (int256) {
        return maxGasUsed;
    }
}
```

최적화 모드를 활성화하려면 구성 파일 `config.yaml`를 생성하세요. 이 예제에서는 결과를 더 쉽게 이해할 수 있도록 트랜잭션 시퀀스의 크기도 줄일 것입니다:

```yaml
testMode: optimization
seqLen: 2
```

### 에키드나 실행하기 {#run-echidna-3}

구성 파일이 생성되면 다음과 같이 에키드나를 실행할 수 있습니다:

```sh
echidna gas.sol --contract TestGas --config config.yaml
...
echidna_opt_gas_f: max value: 127128

  Call sequence:
    TestGas.measureF(42,123,223)

...
```

- 표시된 가스는 에키드나가 실행되는 이더리움 가상 머신 (EVM) 구현체인 [hevm](https://github.com/argotorg/hevm)에 의해 측정되며, `measureF`의 내부 호출 오버헤드가 포함됩니다.
- 최댓값은 고유하지 않습니다. 각 캠페인은 무작위이며, 더 긴 캠페인(예: `--test-limit 200000`)일수록 더 큰 값을 찾는 경향이 있습니다.

### 가스를 줄이는 호출 필터링하기 {#filtering-out-gas-reducing-calls}

위의 **퍼징 캠페인 중 호출할 함수 필터링하기** 튜토리얼은 테스트에서 일부 함수를 제거하는 방법을 보여줍니다.  
이는 정확한 가스 추정치를 얻는 데 매우 중요할 수 있습니다.
다음 예제를 고려해 보세요:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    address[] addrs;

    function push(address a) public {
        addrs.push(a);
    }

    function pop() public {
        addrs.pop();
    }

    function clear() public {
        delete addrs;
    }

    function check() public {
        for (uint256 i = 0; i < addrs.length; i++)
            for (uint256 j = i + 1; j < addrs.length; j++)
                if (addrs[i] == addrs[j]) addrs[j] = address(0x0);
    }

    function echidna_opt_gas_check() public returns (int256) {
        uint256 start = gasleft();
        check();
        return int256(start - gasleft());
    }
}
```

`echidna_opt_gas_check`는 `check`를 호출하고 가스 비용을 반환합니다. 모든 에키드나 테스트 함수와 마찬가지로, 상태 변경 사항은 나중에 폐기됩니다.

에키드나가 모든 함수를 호출할 수 있다면 가스 비용이 높은 트랜잭션을 쉽게 찾지 못할 것입니다:

```sh
echidna pushpop.sol --test-mode optimization
...
echidna_opt_gas_check: max value: 265706
...
```

비용은 `addrs`의 크기에 따라 달라지며, 무작위 호출은 배열을 거의 비워두는 경향이 있기 때문입니다.
하지만 `pop`와 `clear`를 블랙리스트에 추가하면 훨씬 더 나은 결과를 얻을 수 있습니다:

```yaml
testMode: optimization
filterBlacklist: true
filterFunctions: ["C.pop()", "C.clear()"]
```

```sh
echidna pushpop.sol --config config.yaml
...
echidna_opt_gas_check: max value: 2446228
...
```

이 결과를 위해 호출 시퀀스를 축소하는 데는 몇 분이 걸립니다. 모든 재생(replay)이 비용이 많이 드는 `check` 함수를 호출하기 때문입니다.

### 요약: 가스 소비량이 높은 트랜잭션 찾기 {#summary-finding-transactions-with-high-gas-consumption}

에키드나는 `int256`를 반환하는 `echidna_` 함수에서 `gasleft()`로 가스를 측정하고 최적화 모드에서 실행하여 가스 소비량이 높은 트랜잭션을 찾을 수 있습니다:

```yaml
testMode: optimization
```

```sh
echidna contract.sol --config config.yaml
...
```

에키드나는 퍼징 캠페인이 끝나면 발견된 최댓값과 이를 생성한 트랜잭션 시퀀스를 보고합니다.
