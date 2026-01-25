---
title: "컨트랙트 크기 제한에 맞서 컨트랙트 축소하기"
description: "스마트 계약이 너무 커지는 것을 방지하기 위해 무엇을 할 수 있을까요?"
author: Markus Waas
lang: ko
tags: [ "솔리디티", "스마트 계약", "저장 공간" ]
skill: intermediate
published: 2020-06-26
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/max-contract-size
---

## 왜 크기 제한이 있나요? {#why-is-there-a-limit}

[2016년 11월 22일](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon/)에 스퓨리어스 드래곤(Spurious Dragon) 하드포크는 24.576kb의 스마트 계약 크기 제한을 추가한 [EIP-170](https://eips.ethereum.org/EIPS/eip-170)을 도입했습니다. 솔리디티 개발자로서 컨트랙트에 기능을 점점 더 많이 추가하면 어느 시점에 한계에 도달하게 되며, 배포 시 다음과 같은 오류가 표시됩니다:

`경고: 컨트랙트 코드 크기가 24576바이트를 초과합니다(스퓨리어스 드래곤(Spurious Dragon)에서 도입된 제한). 이 컨트랙트는 메인넷에 배포되지 않을 수 있습니다. 옵티마이저를 활성화하거나('runs' 값을 낮게 설정!), revert 문자열을 끄거나, 라이브러리를 사용하는 것을 고려해 보세요.`

이 제한은 서비스 거부(DOS) 공격을 방지하기 위해 도입되었습니다. 컨트랙트에 대한 모든 호출은 가스 측면에서 비교적 저렴합니다. 하지만 이더리움 노드에 대한 컨트랙트 호출의 영향은 호출된 컨트랙트 코드의 크기(디스크에서 코드 읽기, 코드 사전 처리, 머클 증명에 데이터 추가)에 따라 불균형적으로 증가합니다. 공격자가 적은 리소스를 사용하여 다른 사람에게 많은 작업을 유발할 수 있는 상황이 발생하면 DOS 공격의 가능성이 생깁니다.

원래 블록 가스 한도가 자연스러운 컨트랙트 크기 제한 역할을 했기 때문에 이는 큰 문제가 되지 않았습니다. 당연히, 컨트랙트는 해당 컨트랙트의 모든 바이트코드를 포함하는 트랜잭션 내에서 배포되어야 합니다. 하나의 블록에 해당 트랜잭션 하나만 포함시키면 모든 가스를 사용할 수 있지만, 이는 무한하지 않습니다. [런던 업그레이드](/ethereum-forks/#london) 이후, 블록 가스 한도는 네트워크 수요에 따라 1,500만에서 3,000만 단위 사이에서 변동할 수 있게 되었습니다.

다음에서는 잠재적 영향력 순으로 몇 가지 방법을 살펴보겠습니다. 체중 감량의 관점에서 생각해 보세요. 목표 체중(이 경우 24kb)에 도달하기 위한 최선의 전략은 영향이 큰 방법에 먼저 집중하는 것입니다. 대부분의 경우 식단을 조절하는 것만으로도 목표에 도달할 수 있지만, 때로는 그 이상이 필요합니다. 그 다음에는 운동(중간 영향)이나 보충제(작은 영향)를 추가할 수도 있습니다.

## 큰 영향 {#big-impact}

### 컨트랙트 분리하기 {#separate-your-contracts}

이 방법이 항상 첫 번째 접근 방식이 되어야 합니다. 컨트랙트를 여러 개의 작은 컨트랙트로 어떻게 분리할 수 있을까요? 일반적으로 이 과정을 통해 컨트랙트에 대한 좋은 아키텍처를 구상하게 됩니다. 코드 가독성 측면에서는 항상 더 작은 컨트랙트가 선호됩니다. 컨트랙트를 분리하려면 다음을 자문해 보세요:

- 어떤 함수들이 함께 속해 있나요? 각 함수 집합은 자체 컨트랙트에 두는 것이 가장 좋을 수 있습니다.
- 어떤 함수가 컨트랙트 상태를 읽을 필요가 없거나 상태의 특정 하위 집합만 필요로 하나요?
- 저장 공간과 기능을 분리할 수 있나요?

### 라이브러리 {#libraries}

저장 공간에서 기능 코드를 분리하는 간단한 방법 중 하나는 [라이브러리](https://solidity.readthedocs.io/en/v0.6.10/contracts.html#libraries)를 사용하는 것입니다. `internal`로 선언하지 마세요. 컴파일 중에 [컨트랙트에 직접 추가](https://ethereum.stackexchange.com/questions/12975/are-internal-functions-in-libraries-not-covered-by-linking)되기 때문입니다. 하지만 `public` 함수를 사용하면 실제로는 별도의 라이브러리 컨트랙트에 있게 됩니다. 라이브러리를 더 편리하게 사용하려면 [`using for`](https://solidity.readthedocs.io/en/v0.6.10/contracts.html#using-for) 사용을 고려해 보세요.

### 프록시 {#proxies}

더 발전된 전략은 프록시 시스템을 사용하는 것입니다. 라이브러리는 내부적으로 `DELEGATECALL`을 사용하는데, 이는 호출하는 컨트랙트의 상태로 다른 컨트랙트의 함수를 단순히 실행합니다. 프록시 시스템에 대해 자세히 알아보려면 [이 블로그 게시물](https://hackernoon.com/how-to-make-smart-contracts-upgradable-2612e771d5a2)을 확인하세요. 프록시는 업그레이드 가능성과 같은 더 많은 기능을 제공하지만, 복잡성도 크게 증가시킵니다. 어떤 이유로든 유일한 옵션이 아닌 이상, 단지 컨트랙트 크기를 줄이기 위해 프록시를 추가하는 것은 권장하지 않습니다.

## 중간 영향 {#medium-impact}

### 함수 제거하기 {#remove-functions}

이 방법은 당연하게 들릴 수 있습니다. 함수는 컨트랙트 크기를 상당히 증가시킵니다.

- **External**: 편의를 위해 `view` 함수를 많이 추가하는 경우가 많습니다. 크기 제한에 도달하기 전까지는 괜찮습니다. 그때는 정말 필수적인 함수를 제외하고 모두 제거하는 것을 고려해야 합니다.
- **Internal**: 함수가 한 번만 호출되는 경우 `internal`/`private` 함수를 제거하고 코드를 인라인으로 처리할 수도 있습니다.

### 추가 변수 사용 피하기 {#avoid-additional-variables}

```solidity
function get(uint id) returns (address,address) {
    MyStruct memory myStruct = myStructs[id];
    return (myStruct.addr1, myStruct.addr2);
}
```

```solidity
function get(uint id) returns (address,address) {
    return (myStructs[id].addr1, myStructs[id].addr2);
}
```

이처럼 간단한 변경만으로도 **0.28kb**의 차이를 만들 수 있습니다. 컨트랙트에서 이와 유사한 상황을 많이 찾을 수 있으며, 이것들이 모이면 상당한 크기를 줄일 수 있습니다.

### 오류 메시지 줄이기 {#shorten-error-message}

긴 revert 메시지, 특히 다양한 revert 메시지는 컨트랙트 크기를 부풀릴 수 있습니다. 대신 짧은 오류 코드를 사용하고 컨트랙트에서 디코딩하세요. 긴 메시지를 다음과 같이 훨씬 짧게 만들 수 있습니다.

```solidity
require(msg.sender == owner, "이 컨트랙트의 소유자만 이 함수를 호출할 수 있습니다");
```

```solidity
require(msg.sender == owner, "OW1");
```

### 오류 메시지 대신 사용자 정의 오류 사용하기

사용자 정의 오류는 [솔리디티 0.8.4](https://blog.soliditylang.org/2021/04/21/custom-errors/)에서 도입되었습니다. 사용자 정의 오류는 함수처럼 선택자로 ABI 인코딩되므로 컨트랙트의 크기를 줄이는 좋은 방법입니다.

```solidity
error Unauthorized();

if (msg.sender != owner) {
    revert Unauthorized();
}
```

### 옵티마이저에서 낮은 실행(run) 값 고려하기 {#consider-a-low-run-value-in-the-optimizer}

옵티마이저 설정을 변경할 수도 있습니다. 기본값인 200은 함수가 200번 호출되는 것처럼 바이트코드를 최적화한다는 의미입니다. 이 값을 1로 변경하면 기본적으로 옵티마이저에게 각 함수를 한 번만 실행하는 경우에 최적화하도록 지시하는 것입니다. 한 번만 실행하도록 최적화된 함수는 배포 자체에 최적화되었음을 의미합니다. **함수를 실행하는 데 드는 [가스 비용](/developers/docs/gas/)이 증가**하므로 이 방법을 사용하지 않는 것이 좋을 수 있습니다.

## 작은 영향 {#small-impact}

### 함수에 구조체 전달 피하기 {#avoid-passing-structs-to-functions}

[ABIEncoderV2](https://solidity.readthedocs.io/en/v0.6.10/layout-of-source-files.html#abiencoderv2)를 사용하고 있다면, 함수에 구조체를 전달하지 않는 것이 도움이 될 수 있습니다. 매개변수를 구조체로 전달하는 대신, 필요한 매개변수를 직접 전달하세요. 이 예시에서는 **0.1kb**를 추가로 절약했습니다.

```solidity
function get(uint id) returns (address,address) {
    return _get(myStruct);
}

function _get(MyStruct memory myStruct) private view returns(address,address) {
    return (myStruct.addr1, myStruct.addr2);
}
```

```solidity
function get(uint id) returns(address,address) {
    return _get(myStructs[id].addr1, myStructs[id].addr2);
}

function _get(address addr1, address addr2) private view returns(address,address) {
    return (addr1, addr2);
}
```

### 함수와 변수에 올바른 가시성 선언하기 {#declare-correct-visibility-for-functions-and-variables}

- 외부에서만 호출되는 함수나 변수인가요? `public` 대신 `external`로 선언하세요.
- 컨트랙트 내에서만 호출되는 함수나 변수인가요? `public` 대신 `private` 또는 `internal`로 선언하세요.

### 수식어(modifier) 제거하기 {#remove-modifiers}

수식어(Modifier)는 특히 많이 사용될 경우 컨트랙트 크기에 상당한 영향을 미칠 수 있습니다. 수식어를 제거하고 대신 함수를 사용하는 것을 고려해 보세요.

```solidity
modifier checkStuff() {}

function doSomething() checkStuff {}
```

```solidity
function checkStuff() private {}

function doSomething() { checkStuff(); }
```

이 팁들은 컨트랙트 크기를 크게 줄이는 데 도움이 될 것입니다. 다시 한번 강조하지만, 가장 큰 영향을 위해 가능하다면 항상 컨트랙트를 분리하는 데 집중하세요.
