---
title: "컨트랙트 크기 제한에 맞서 컨트랙트 축소하기"
description: "스마트 컨트랙트가 너무 커지는 것을 방지하려면 어떻게 해야 할까요?"
author: "마르쿠스 바스"
lang: ko
tags: ["Solidity", "스마트 컨트랙트", "저장소"]
skill: intermediate
breadcrumb: "컨트랙트 축소하기"
published: 2020-06-26
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/max-contract-size
---

## 왜 제한이 있을까요? {#why-is-there-a-limit}

[2016년 11월 22일](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon) Spurious Dragon 하드 포크에서 스마트 컨트랙트 크기 제한을 24,576바이트(24 KiB)로 추가한 [EIP-170](https://eips.ethereum.org/EIPS/eip-170)이 도입되었습니다. Solidity 개발자에게 이는 컨트랙트에 점점 더 많은 기능을 추가하다 보면 어느 시점에 제한에 도달하게 되고 컴파일러가 다음과 같은 경고를 표시한다는 것을 의미합니다.

`Warning: Contract code size is 25000 bytes and exceeds 24576 bytes (a limit introduced in Spurious Dragon). This contract may not be deployable on Mainnet. Consider enabling the optimizer (with a low "runs" value!), turning off revert strings, or using libraries.`

배포 코드(initcode)에 대해서도 비슷한 경고가 있는데, 상하이 업그레이드에서 [EIP-3860](https://eips.ethereum.org/EIPS/eip-3860)이 이를 49,152바이트로 제한했습니다.

이 제한은 영구적인 것이 아닙니다. [EIP-7954](https://eips.ethereum.org/EIPS/eip-7954)는 이를 65,536바이트(64 KiB)로, initcode 제한을 131,072바이트로 상향하며, 이는 [글램스테르담 업그레이드](/roadmap/glamsterdam/)에 예정되어 있습니다. 배포하려는 네트워크에서 해당 업그레이드가 활성화될 때까지는 24,576바이트가 제한이며, 그 이후에도 더 작은 컨트랙트가 배포 비용이 저렴하고 감사하기 쉽습니다.

이 제한은 서비스 거부(DOS) 공격을 방지하기 위해 도입되었습니다. 컨트랙트 호출은 가스 측면에서 비교적 저렴합니다. 그러나 이더리움 노드에 대한 컨트랙트 호출의 영향은 호출된 컨트랙트 코드의 크기(디스크에서 코드 읽기, 코드 전처리, 머클 증명에 데이터 추가)에 따라 불균형적으로 증가합니다. 공격자가 적은 리소스로 다른 사람들에게 많은 작업을 유발할 수 있는 상황이 발생할 때마다 DOS 공격의 가능성이 생깁니다.

원래 이것은 덜 문제였는데, 자연스러운 컨트랙트 크기 제한 중 하나가 블록 가스 한도이기 때문입니다. 분명히 컨트랙트는 컨트랙트의 모든 바이트코드를 포함하는 트랜잭션 내에 배포되어야 합니다. 블록에 해당 트랜잭션 하나만 포함하면 그 가스를 모두 사용할 수 있지만 무한하지는 않습니다. 오늘날 블록 가스 한도는 수천만 가스이며 검증자에 의해 여러 번 상향되었으므로, 그 자체만으로는 매우 큰 컨트랙트를 허용할 것입니다. [푸사카 업그레이드](/roadmap/fusaka/) 이후 단일 트랜잭션도 16,777,216 가스로 제한되지만([EIP-7825](https://eips.ethereum.org/EIPS/eip-7825)), 이는 여전히 24 KiB 컨트랙트를 배포하는 데 드는 비용보다 훨씬 높기 때문에 명시적인 크기 제한이 필요합니다.

다음에서는 잠재적인 영향력 순으로 몇 가지 방법을 살펴보겠습니다. 체중 감량의 관점에서 생각해 보세요. 목표 체중(우리의 경우 24kb)에 도달하기 위한 가장 좋은 전략은 먼저 영향력이 큰 방법에 집중하는 것입니다. 대부분의 경우 식단만 고쳐도 목표에 도달할 수 있지만, 때로는 조금 더 필요할 수 있습니다. 그런 다음 운동(중간 영향)이나 보충제(작은 영향)를 추가할 수 있습니다.

## 큰 영향 {#big-impact}

### 컨트랙트 분리하기 {#separate-your-contracts}

이것이 항상 첫 번째 접근 방식이 되어야 합니다. 컨트랙트를 어떻게 여러 개의 작은 컨트랙트로 분리할 수 있을까요? 이는 일반적으로 컨트랙트를 위한 좋은 아키텍처를 고안하도록 만듭니다. 코드 가독성 측면에서도 항상 작은 컨트랙트가 선호됩니다. 컨트랙트를 분할할 때 스스로에게 다음과 같이 질문해 보세요.

- 어떤 함수들이 함께 속해야 할까요? 각 함수 세트는 자체 컨트랙트에 있는 것이 가장 좋을 수 있습니다.
- 컨트랙트 상태를 읽을 필요가 없거나 상태의 특정 하위 집합만 필요한 함수는 무엇인가요?
- 저장소와 기능을 분리할 수 있나요?

### 라이브러리 {#libraries}

기능 코드를 저장소에서 분리하는 간단한 방법 중 하나는 [라이브러리](https://docs.soliditylang.org/en/latest/contracts.html#libraries)를 사용하는 것입니다. 라이브러리 함수를 internal로 선언하지 마세요. 컴파일 중에 [컨트랙트에 직접 추가](https://ethereum.stackexchange.com/questions/12975/are-internal-functions-in-libraries-not-covered-by-linking)되기 때문입니다. 하지만 public 함수를 사용하면 실제로는 별도의 라이브러리 컨트랙트에 존재하게 됩니다. 라이브러리를 더 편리하게 사용하려면 [using for](https://docs.soliditylang.org/en/latest/contracts.html#using-for) 사용을 고려해 보세요.

### 프록시 {#proxies}

더 고급 전략은 프록시 시스템이 될 것입니다. 라이브러리는 내부적으로 `DELEGATECALL`를 사용하여 호출하는 컨트랙트의 상태로 다른 컨트랙트의 함수를 단순히 실행합니다. 프록시 시스템에 대해 자세히 알아보려면 [스마트 컨트랙트 업그레이드](/developers/docs/smart-contracts/upgrading/)를 확인하세요. 프록시 시스템은 업그레이드 가능성을 활성화하는 등 더 많은 기능을 제공하지만, 복잡성도 크게 증가시킵니다. 어떤 이유로든 유일한 옵션이 아니라면 컨트랙트 크기를 줄이기 위한 목적으로만 프록시를 추가하지는 않을 것입니다.

## 중간 영향 {#medium-impact}

### 함수 제거하기 {#remove-functions}

이것은 명백합니다. 함수는 컨트랙트 크기를 꽤 많이 증가시킵니다.

- **External**: 편의를 위해 많은 view 함수를 추가하는 경우가 많습니다. 크기 제한에 도달하기 전까지는 전혀 문제가 되지 않습니다. 하지만 제한에 도달하면 절대적으로 필수적인 함수를 제외하고 모두 제거하는 것을 진지하게 고려해야 할 수 있습니다.
- **Internal**: 함수가 한 번만 호출되는 경우 internal/private 함수를 제거하고 코드를 단순히 인라인 처리할 수도 있습니다.

### 추가 변수 피하기 {#avoid-additional-variables}

```solidity
struct MyStruct {
    address addr1;
    address addr2;
}

mapping(uint => MyStruct) myStructs;

function get(uint id) public view returns (address, address) {
    MyStruct memory myStruct = myStructs[id];
    return (myStruct.addr1, myStruct.addr2);
}
```

```solidity
function get(uint id) public view returns (address, address) {
    return (myStructs[id].addr1, myStructs[id].addr2);
}
```

이 글을 작성할 당시 이와 같은 간단한 변경으로 <strong>0.28kb</strong>의 차이가 발생했습니다. 정확한 절약량은 컴파일러 버전과 설정에 따라 다르므로(Solidity 0.8.37의 경우 최적화 도구 없이 약 0.1kb이고 최적화 도구를 사용하면 훨씬 적음) 항상 측정해 보세요. 컨트랙트에서 이와 유사한 상황을 많이 발견할 수 있으며, 이러한 것들이 모여 상당한 양이 될 수 있습니다.

### 오류 메시지 줄이기 {#shorten-error-message}

긴 되돌리기 메시지, 특히 다양하고 많은 되돌리기 메시지는 컨트랙트 크기를 부풀릴 수 있습니다. 대신 짧은 오류 코드를 사용하고 컨트랙트에서 이를 디코딩하세요. 긴 메시지를 훨씬 짧게 만들 수 있습니다.

```solidity
require(msg.sender == owner, "Only the owner of this contract can call this function");
```

```solidity
require(msg.sender == owner, "OW1");
```

### 오류 메시지 대신 사용자 정의 오류 사용하기 {#use-custom-errors-instead-of-error-messages}

사용자 정의 오류는 [Solidity 0.8.4](https://blog.soliditylang.org/2021/04/21/custom-errors/)에 도입되었습니다. 사용자 정의 오류는 (함수와 마찬가지로) 선택자로 ABI 인코딩되므로 컨트랙트 크기를 줄이는 좋은 방법입니다.

```solidity
error Unauthorized();

function doSomething() public view {
    if (msg.sender != owner) {
        revert Unauthorized();
    }
}
```

### 최적화 도구에서 낮은 실행 값 고려하기 {#consider-a-low-run-value-in-the-optimizer}

최적화 도구 설정을 변경할 수도 있습니다. 기본값인 200은 함수가 200번 호출되는 것처럼 바이트코드를 최적화하려고 시도한다는 의미입니다. 이 값을 1로 변경하면 기본적으로 각 함수를 한 번만 실행하는 경우에 대해 최적화하도록 최적화 도구에 지시하는 것입니다. 한 번만 실행하도록 최적화된 함수는 배포 자체에 최적화되어 있음을 의미합니다. <strong>이로 인해 함수 실행에 대한 [가스 비용](/developers/docs/gas/)이 증가</strong>하므로 원하지 않을 수도 있다는 점에 유의하세요. `viaIR`를 활성화하여 컴파일하는 경우, IR 기반 코드 생성기가 눈에 띄게 다른 바이트코드 크기를 생성할 수 있으므로 활성화했을 때와 하지 않았을 때의 크기를 확인하세요. 자세한 내용은 [최적화 도구 옵션](https://docs.soliditylang.org/en/latest/using-the-compiler.html#optimizer-options)을 참조하세요.

## 작은 영향 {#small-impact}

### 함수에 구조체 전달 피하기 {#avoid-passing-structs-to-functions}

[ABI coder v2](https://docs.soliditylang.org/en/latest/layout-of-source-files.html#abi-coder-pragma)(Solidity 0.8.0부터 기본값)를 사용하는 경우 함수에 구조체를 전달하지 않는 것이 도움이 될 수 있습니다. 매개변수를 구조체로 전달하는 대신 필요한 매개변수를 직접 전달하세요. 이 예제에서는 추가로 <strong>0.1kb</strong>를 절약했습니다.

```solidity
function get(uint id) public view returns (address, address) {
    return _get(myStructs[id]);
}

function _get(MyStruct memory myStruct) private pure returns (address, address) {
    return (myStruct.addr1, myStruct.addr2);
}
```

```solidity
function get(uint id) public view returns (address, address) {
    return _get(myStructs[id].addr1, myStructs[id].addr2);
}

function _get(address addr1, address addr2) private pure returns (address, address) {
    return (addr1, addr2);
}
```

### 함수 및 변수에 대한 올바른 가시성 선언하기 {#declare-correct-visibility-for-functions-and-variables}

- 외부에서만 호출되는 함수나 변수인가요? `public` 대신 `external`로 선언하세요.
- 컨트랙트 내부에서만 호출되는 함수나 변수인가요? `public` 대신 `private` 또는 `internal`로 선언하세요.

### 제어자 제거하기 {#remove-modifiers}

제어자(modifier)는 특히 집중적으로 사용할 경우 컨트랙트 크기에 상당한 영향을 미칠 수 있습니다. 제어자를 제거하고 대신 함수를 사용하는 것을 고려해 보세요.

```solidity
modifier checkStuff() {
    require(msg.sender == owner, "OW1");
    _;
}

function doSomething() public checkStuff {}
```

```solidity
function checkStuff() private view {
    require(msg.sender == owner, "OW1");
}

function doSomething() public view {
    checkStuff();
}
```

이러한 팁은 컨트랙트 크기를 크게 줄이는 데 도움이 될 것입니다. 다시 한 번 강조하지만, 가장 큰 효과를 얻으려면 가능하면 항상 컨트랙트를 분할하는 데 집중하세요.
