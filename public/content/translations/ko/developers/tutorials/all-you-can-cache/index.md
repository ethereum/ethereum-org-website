---
title: "캐시할 수 있는 모든 것"
description: "더 저렴한 롤업 트랜잭션을 위해 캐싱 계약을 생성하고 사용하는 방법을 알아보세요."
author: Ori Pomerantz
tags: [ "레이어 2", "캐싱", "저장 공간" ]
skill: intermediate
published: 2022-09-15
lang: ko
---

롤업을 사용할 때 트랜잭션에서 1바이트의 비용은 저장 공간 슬롯의 비용보다 훨씬 더 비쌉니다. 따라서 가능한 한 많은 정보를 온체인에 캐시하는 것이 합리적입니다.

이 글에서는 여러 번 사용될 가능성이 있는 모든 매개변수 값이 캐시되어 (처음 사용 이후) 훨씬 적은 수의 바이트로 사용할 수 있도록 캐싱 계약을 생성하고 사용하는 방법과 이 캐시를 사용하는 오프체인 코드를 작성하는 방법을 배웁니다.

기사를 건너뛰고 소스 코드만 보려면 [여기를](https://github.com/qbzzt/20220915-all-you-can-cache) 클릭하세요. 개발 스택은 [Foundry](https://getfoundry.sh/introduction/installation/)입니다.

## 전체적인 설계 {#overall-design}

단순화를 위해 모든 트랜잭션 매개변수가 32바이트 길이의 `uint256`이라고 가정하겠습니다. 트랜잭션을 수신하면 각 매개변수를 다음과 같이 파싱합니다.

1. 첫 번째 바이트가 `0xFF`이면 다음 32바이트를 매개변수 값으로 사용하여 캐시에 씁니다.

2. 첫 번째 바이트가 `0xFE`이면 다음 32바이트를 매개변수 값으로 사용하지만 캐시에 쓰지는 _마세요_.

3. 다른 값의 경우 상위 4비트는 추가 바이트 수로, 하위 4비트는 캐시 키의 최상위 비트로 사용합니다. 몇 가지 예는 다음과 같습니다.

   | calldata의 바이트   |     캐시 키 |
   | :-------------- | -------: |
   | 0x0F            |     0x0F |
   | 0x10,0x10       |     0x10 |
   | 0x12,0xAC       |   0x02AC |
   | 0x2D,0xEA, 0xD6 | 0x0DEAD6 |

## 캐시 조작 {#cache-manipulation}

캐시는 [`Cache.sol`](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol)에 구현되어 있습니다. 한 줄씩 살펴보겠습니다.

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;


contract Cache {

    bytes1 public constant INTO_CACHE = 0xFF;
    bytes1 public constant DONT_CACHE = 0xFE;
```

이러한 상수는 모든 정보를 제공하고 이를 캐시에 쓸지 여부를 결정하는 특수한 경우를 해석하는 데 사용됩니다. 캐시에 쓰는 작업은 이전에 사용되지 않은 저장 공간 슬롯에 각각 22100 가스 비용으로 두 개의 [`SSTORE`](https://www.evm.codes/#55) 작업이 필요하므로 선택 사항으로 만듭니다.

```solidity

    mapping(uint => uint) public val2key;
```

값과 해당 키 간의 [매핑](https://www.geeksforgeeks.org/solidity/solidity-mappings/)입니다. 이 정보는 트랜잭션을 보내기 전에 값을 인코딩하는 데 필요합니다.

```solidity
    // 위치 n에는 키 n+1의 값이 들어갑니다.
    // 0은 "캐시에 없음"을 나타내기 위해 남겨둬야 합니다.
    uint[] public key2val;
```

키를 할당하고 단순화를 위해 순차적으로 수행하기 때문에 키에서 값으로의 매핑에 배열을 사용할 수 있습니다.

```solidity
    function cacheRead(uint _key) public view returns (uint) {
        require(_key <= key2val.length, "초기화되지 않은 캐시 항목 읽기");
        return key2val[_key-1];
    }  // cacheRead
```

캐시에서 값을 읽습니다.

```solidity
    // 캐시에 값이 아직 없는 경우 값을 씁니다
    // 테스트가 작동하도록 공개(public)로 설정
    function cacheWrite(uint _value) public returns (uint) {
        // 값이 이미 캐시에 있는 경우 현재 키를 반환합니다
        if (val2key[_value] != 0) {
            return val2key[_value];
        }
```

동일한 값을 캐시에 두 번 이상 넣을 필요가 없습니다. 값이 이미 있는 경우 기존 키를 반환하면 됩니다.

```solidity
        // 0xFE는 특수한 경우이므로 캐시가 가질 수 있는
        // 가장 큰 키는 0x0D 뒤에 15개의 0xFF가 오는 것입니다. 캐시 길이가 이미
        // 그만큼 크면 실패합니다.
        //                              1 2 3 4 5 6 7 8 9 A B C D E F
        require(key2val.length+1 < 0x0DFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF,
            "캐시 오버플로우");
```

캐시가 그렇게 커질 것이라고는 생각하지 않습니다(약 1.8\*10<sup>37</sup>개의 항목, 저장하는 데 약 10<sup>27</sup>TB가 필요). 하지만 저는 ["640kB면 항상 충분할 것이다"](https://quoteinvestigator.com/2011/09/08/640k-enough/)를 기억할 만큼 나이가 많습니다. 이 테스트는 비용이 매우 저렴합니다.

```solidity
        // 다음 키를 사용하여 값을 씁니다
        val2key[_value] = key2val.length+1;
```

역방향 조회(값에서 키로)를 추가합니다.

```solidity
        key2val.push(_value);
```

정방향 조회(키에서 값으로)를 추가합니다. 값을 순차적으로 할당하기 때문에 마지막 배열 값 뒤에 추가하면 됩니다.

```solidity
        return key2val.length;
    }  // cacheWrite
```

새 값이 저장되는 셀인 `key2val`의 새 길이를 반환합니다.

```solidity
    function _calldataVal(uint startByte, uint length)
        private pure returns (uint)
```

이 함수는 임의의 길이(최대 32바이트, 워드 크기)의 calldata에서 값을 읽습니다.

```solidity
    {
        uint _retVal;

        require(length < 0x21,
            "_calldataVal 길이 제한은 32바이트입니다");
        require(length + startByte <= msg.data.length,
            "_calldataVal이 calldatasize를 초과하여 읽으려 합니다");
```

이 함수는 내부 함수이므로 나머지 코드가 올바르게 작성되었다면 이러한 테스트는 필요하지 않습니다. 하지만 비용이 많이 들지 않으므로 추가하는 것이 좋습니다.

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

이 코드는 [Yul](https://docs.soliditylang.org/en/v0.8.16/yul.html)로 작성되었습니다. calldata에서 32바이트 값을 읽습니다. EVM의 초기화되지 않은 공간은 0으로 간주되기 때문에 `startByte+32` 이전에 calldata가 중지되더라도 이 작업은 작동합니다.

```solidity
        _retVal = _retVal >> (256-length*8);
```

반드시 32바이트 값이 필요한 것은 아닙니다. 이렇게 하면 초과 바이트를 제거할 수 있습니다.

```solidity
        return _retVal;
    } // _calldataVal


    // _fromByte에서 시작하여 calldata에서 단일 매개변수를 읽습니다.
    function _readParam(uint _fromByte) internal
        returns (uint _nextByte, uint _parameterValue)
    {
```

calldata에서 단일 매개변수를 읽습니다. 매개변수의 길이는 1바이트에서 33바이트까지 다양할 수 있으므로 읽은 값뿐만 아니라 다음 바이트의 위치도 반환해야 합니다.

```solidity
        // 첫 번째 바이트는 나머지를 해석하는 방법을 알려줍니다.
        uint8 _firstByte;

        _firstByte = uint8(_calldataVal(_fromByte, 1));
```

Solidity는 잠재적으로 위험한 [암시적 유형 변환](https://docs.soliditylang.org/en/v0.8.16/types.html#implicit-conversions)을 금지하여 버그 수를 줄이려고 합니다. 예를 들어 256비트에서 8비트로의 다운그레이드는 명시적이어야 합니다.

```solidity

        // 값을 읽지만 캐시에 쓰지 않습니다.
        if (_firstByte == uint8(DONT_CACHE))
            return(_fromByte+33, _calldataVal(_fromByte+1, 32));

        // 값을 읽고 캐시에 씁니다.
        if (_firstByte == uint8(INTO_CACHE)) {
            uint _param = _calldataVal(_fromByte+1, 32);
            cacheWrite(_param);
            return(_fromByte+33, _param);
        }

        // 여기까지 오면 캐시에서 읽어야 한다는 의미입니다.

        // 읽을 추가 바이트 수
        uint8 _extraBytes = _firstByte / 16;
```

하위 [니블](https://en.wikipedia.org/wiki/Nibble)을 가져와 다른 바이트와 결합하여 캐시에서 값을 읽습니다.

```solidity
        uint _key = (uint256(_firstByte & 0x0F) << (8*_extraBytes)) +
            _calldataVal(_fromByte+1, _extraBytes);

        return (_fromByte+_extraBytes+1, cacheRead(_key));

    }  // _readParam


    // n개의 매개변수 읽기(함수는 예상하는 매개변수 수를 알고 있습니다)
    function _readParams(uint _paramNum) internal returns (uint[] memory) {
```

calldata 자체에서 매개변수 수를 가져올 수 있지만, 우리를 호출하는 함수는 예상하는 매개변수 수를 알고 있습니다. 그들이 알려주는 것이 더 쉽습니다.

```solidity
        // 읽은 매개변수들
        uint[] memory params = new uint[](_paramNum);

        // 매개변수는 4번째 바이트에서 시작하며, 그 이전은 함수 서명입니다.
        uint _atByte = 4;

        for(uint i=0; i<_paramNum; i++) {
            (_atByte, params[i]) = _readParam(_atByte);
        }
```

필요한 수의 매개변수를 가질 때까지 매개변수를 읽습니다. calldata의 끝을 지나면 `_readParams`가 호출을 되돌립니다.

```solidity

        return(params);
    }   // readParams

    // _readParams 테스트를 위해 4개의 매개변수 읽기 테스트
    function fourParam() public
        returns (uint256,uint256,uint256,uint256)
    {
        uint[] memory params;
        params = _readParams(4);
        return (params[0], params[1], params[2], params[3]);
    }    // fourParam
```

Foundry의 큰 장점 중 하나는 Solidity로 테스트를 작성할 수 있다는 것입니다([아래 캐시 테스트](#testing-the-cache) 참조). 이렇게 하면 단위 테스트가 훨씬 쉬워집니다. 이 함수는 네 개의 매개변수를 읽고 반환하여 테스트에서 올바른지 확인할 수 있도록 하는 함수입니다.

```solidity
    // 값을 가져와 인코딩할 바이트를 반환합니다(가능한 경우 캐시 사용).
    function encodeVal(uint _val) public view returns(bytes memory) {
```

`encodeVal`은 오프체인 코드가 캐시를 사용하는 calldata를 만드는 데 도움을 주기 위해 호출하는 함수입니다. 단일 값을 받아 인코딩된 바이트를 반환합니다. 이 함수는 `view`이므로 트랜잭션이 필요하지 않으며 외부에서 호출할 때 가스가 들지 않습니다.

```solidity
        uint _key = val2key[_val];

        // 값이 아직 캐시에 없으므로 추가합니다.
        if (_key == 0)
            return bytes.concat(INTO_CACHE, bytes32(_val));
```

[EVM](/developers/docs/evm/)에서 모든 초기화되지 않은 저장 공간은 0으로 간주됩니다. 따라서 존재하지 않는 값의 키를 찾으면 0을 얻게 됩니다. 이 경우 인코딩된 바이트는 `INTO_CACHE`(다음에 캐시됨)이고 그 뒤에 실제 값이 옵니다.

```solidity
        // 키가 0x10보다 작으면 단일 바이트로 반환합니다.
        if (_key < 0x10)
            return bytes.concat(bytes1(uint8(_key)));
```

단일 바이트가 가장 쉽습니다. `bytes.concat`([https://docs.soliditylang.org/en/v0.8.16/types.html#the-functions-bytes-concat-and-string-concat](https://docs.soliditylang.org/en/v0.8.16/types.html#the-functions-bytes-concat-and-string-concat))을 사용하여 `bytes<n>` 유형을 임의의 길이의 바이트 배열로 변환합니다. 이름에도 불구하고 단 하나의 인수를 제공해도 잘 작동합니다.

```solidity
        // 0x1vvv로 인코딩된 2바이트 값
        if (_key < 0x1000)
            return bytes.concat(bytes2(uint16(_key) | 0x1000));
```

16<sup>3</sup>보다 작은 키가 있을 때 두 바이트로 표현할 수 있습니다. 먼저 256비트 값인 `_key`를 16비트 값으로 변환하고 논리적 or를 사용하여 첫 번째 바이트에 추가 바이트 수를 더합니다. 그런 다음 `bytes`로 변환할 수 있는 `bytes2` 값으로 변환합니다.

```solidity
        // 다음 줄을 루프로 수행하는 영리한 방법이 있을 수 있지만,
        // view 함수이므로 프로그래머 시간과
        // 단순성을 위해 최적화하고 있습니다.

        if (_key < 16*256**2)
            return bytes.concat(bytes3(uint24(_key) | (0x2 * 16 * 256**2)));
        if (_key < 16*256**3)
            return bytes.concat(bytes4(uint32(_key) | (0x3 * 16 * 256**3)));
             .
             .
             .
        if (_key < 16*256**14)
            return bytes.concat(bytes15(uint120(_key) | (0xE * 16 * 256**14)));
        if (_key < 16*256**15)
            return bytes.concat(bytes16(uint128(_key) | (0xF * 16 * 256**15)));
```

다른 값(3바이트, 4바이트 등) 필드 크기만 다를 뿐 동일한 방식으로 처리됩니다.

```solidity
        // 여기에 도달하면 뭔가 잘못된 것입니다.
        revert("encodeVal 오류, 발생해서는 안 됨");
```

여기에 도달하면 16\*256<sup>15</sup>보다 작지 않은 키를 얻었다는 의미입니다. 그러나 `cacheWrite`는 키를 제한하므로 14\*256<sup>16</sup>(첫 번째 바이트가 0xFE이므로 `DONT_CACHE`처럼 보임)까지도 도달할 수 없습니다. 하지만 향후 프로그래머가 버그를 도입할 경우를 대비하여 테스트를 추가하는 데 비용이 많이 들지 않습니다.

```solidity
    } // encodeVal

}  // Cache
```

### 캐시 테스트 {#testing-the-cache}

Foundry의 장점 중 하나는 [Solidity로 테스트를 작성할 수 있다는 것](https://getfoundry.sh/forge/tests/overview/)이며, 이는 단위 테스트 작성을 더 쉽게 만듭니다. `Cache` 클래스에 대한 테스트는 [여기](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/Cache.t.sol)에 있습니다. 테스트 코드는 테스트 경향에 따라 반복적이므로 이 기사에서는 흥미로운 부분만 설명합니다.

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";


// console을 사용하려면 `forge test -vv`를 실행해야 합니다.
import "forge-std/console.sol";
```

이는 테스트 패키지와 `console.log`를 사용하는 데 필요한 상용구일 뿐입니다.

```solidity
import "src/Cache.sol";
```

테스트 중인 계약을 알아야 합니다.

```solidity
contract CacheTest is Test {
    Cache cache;

    function setUp() public {
        cache = new Cache();
    }
```

`setUp` 함수는 각 테스트 전에 호출됩니다. 이 경우 새 캐시를 만들어 테스트가 서로 영향을 미치지 않도록 합니다.

```solidity
    function testCaching() public {
```

테스트는 이름이 `test`로 시작하는 함수입니다. 이 함수는 값을 쓰고 다시 읽는 기본 캐시 기능을 확인합니다.

```solidity
        for(uint i=1; i<5000; i++) {
            cache.cacheWrite(i*i);
        }

        for(uint i=1; i<5000; i++) {
            assertEq(cache.cacheRead(i), i*i);
```

이것이 [`assert...` 함수](https://getfoundry.sh/reference/forge-std/std-assertions/)를 사용하여 실제 테스트를 수행하는 방법입니다. 이 경우 우리가 쓴 값이 우리가 읽은 값과 동일한지 확인합니다. 캐시 키가 선형적으로 할당된다는 것을 알기 때문에 `cache.cacheWrite`의 결과를 버릴 수 있습니다.

```solidity
        }
    }    // testCaching


    // 동일한 값을 여러 번 캐시하고 키가 동일하게
    // 유지되는지 확인합니다.
    function testRepeatCaching() public {
        for(uint i=1; i<100; i++) {
            uint _key1 = cache.cacheWrite(i);
            uint _key2 = cache.cacheWrite(i);
            assertEq(_key1, _key2);
        }
```

먼저 각 값을 캐시에 두 번 쓰고 키가 동일한지 확인합니다(두 번째 쓰기는 실제로 발생하지 않았음을 의미).

```solidity
        for(uint i=1; i<100; i+=3) {
            uint _key = cache.cacheWrite(i);
            assertEq(_key, i);
        }
    }    // testRepeatCaching
```

이론적으로 연속적인 캐시 쓰기에 영향을 미치지 않는 버그가 있을 수 있습니다. 따라서 여기서는 연속적이지 않은 일부 쓰기를 수행하고 값이 여전히 다시 쓰여지지 않는지 확인합니다.

```solidity
    // 메모리 버퍼에서 uint를 읽습니다(보낸 매개변수를
    // 다시 받는지 확인하기 위해).
    function toUint256(bytes memory _bytes, uint256 _start) internal pure
        returns (uint256)
```

`bytes memory` 버퍼에서 256비트 워드를 읽습니다. 이 유틸리티 함수를 사용하면 캐시를 사용하는 함수 호출을 실행할 때 올바른 결과를 받는지 확인할 수 있습니다.

```solidity
    {
        require(_bytes.length >= _start + 32, "toUint256_outOfBounds");
        uint256 tempUint;

        assembly {
            tempUint := mload(add(add(_bytes, 0x20), _start))
        }
```

Yul은 `uint256` 이상의 자료 구조를 지원하지 않으므로 메모리 버퍼 `_bytes`와 같은 더 복잡한 자료 구조를 참조할 때 해당 구조의 주소를 얻게 됩니다. Solidity는 `bytes memory` 값을 길이, 그 다음에 실제 바이트가 포함된 32바이트 워드로 저장하므로 `_start` 번 바이트를 얻으려면 `_bytes+32+_start`를 계산해야 합니다.

```solidity

        return tempUint;
    }     // toUint256

    // fourParams()의 함수 서명, 제공처:
    // https://www.4byte.directory/signatures/?bytes4_signature=0x3edc1e6d
    bytes4 constant FOUR_PARAMS = 0x3edc1e6d;

    // 올바른 값을 반환하는지 확인하기 위한 일부 상수 값
    uint256 constant VAL_A = 0xDEAD60A7;
    uint256 constant VAL_B =     0xBEEF;
    uint256 constant VAL_C =     0x600D;
    uint256 constant VAL_D = 0x600D60A7;
```

테스트에 필요한 일부 상수입니다.

```solidity
    function testReadParam() public {
```

`readParams`를 사용하는 함수인 `fourParams()`를 호출하여 매개변수를 올바르게 읽을 수 있는지 테스트합니다.

```solidity
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;
```

일반 ABI 메커니즘을 사용하여 캐시를 사용하는 함수를 호출할 수 없으므로 하위 수준 [`<address>.call()`](https://docs.soliditylang.org/en/v0.8.16/types.html#members-of-addresses) 메커니즘을 사용해야 합니다. 이 메커니즘은 `bytes memory`를 입력으로 받고 출력으로 반환합니다(부울 값과 함께).

```solidity
        // 첫 번째 호출, 캐시는 비어 있습니다.
        _callInput = bytes.concat(
            FOUR_PARAMS,
```

동일한 계약이 캐시된 함수(트랜잭션에서 직접 호출)와 캐시되지 않은 함수(다른 스마트 계약에서 호출)를 모두 지원하는 것이 유용합니다. 이를 위해서는 모든 것을 [a `fallback` 함수](https://docs.soliditylang.org/en/v0.8.16/contracts.html#fallback-function)에 넣는 대신 올바른 함수를 호출하기 위해 Solidity 메커니즘에 계속 의존해야 합니다. 이렇게 하면 구성 가능성이 훨씬 쉬워집니다. 대부분의 경우 단일 바이트로 함수를 식별하기에 충분하므로 3바이트(16\*3=48 가스)를 낭비하고 있습니다. 하지만 이 글을 쓰는 시점에서 48 가스 비용은 0.07센트로, 더 간단하고 버그가 적은 코드에 대한 합리적인 비용입니다.

```solidity
            // 첫 번째 값, 캐시에 추가합니다.
            cache.INTO_CACHE(),
            bytes32(VAL_A),
```

첫 번째 값: 캐시에 써야 하는 전체 값임을 나타내는 플래그와 그 뒤에 오는 값의 32바이트입니다. 다른 세 값은 비슷하지만 `VAL_B`는 캐시에 기록되지 않고 `VAL_C`는 세 번째 매개변수와 네 번째 매개변수라는 점이 다릅니다.

```solidity
             .
             .
             .
        );
        (_success, _callOutput) = _cacheAddr.call(_callInput);
```

여기서 실제로 `Cache` 계약을 호출합니다.

```solidity
        assertEq(_success, true);
```

호출이 성공할 것으로 예상합니다.

```solidity
        assertEq(cache.cacheRead(1), VAL_A);
        assertEq(cache.cacheRead(2), VAL_C);
```

빈 캐시로 시작한 다음 `VAL_A`와 `VAL_C`를 차례로 추가합니다. 첫 번째는 키 1을, 두 번째는 2를 가질 것으로 예상합니다.

```
        assertEq(toUint256(_callOutput,0), VAL_A);
        assertEq(toUint256(_callOutput,32), VAL_B);
        assertEq(toUint256(_callOutput,64), VAL_C);
        assertEq(toUint256(_callOutput,96), VAL_C);
```

출력은 네 개의 매개변수입니다. 여기서 올바른지 확인합니다.

```solidity
        // 두 번째 호출, 캐시를 사용할 수 있습니다.
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // 캐시의 첫 번째 값
            bytes1(0x01),
```

16 미만의 캐시 키는 1바이트입니다.

```solidity
            // 두 번째 값, 캐시에 추가하지 마십시오.
            cache.DONT_CACHE(),
            bytes32(VAL_B),

            // 세 번째 및 네 번째 값, 동일한 값
            bytes1(0x02),
            bytes1(0x02)
        );
        .
        .
        .
    }   // testReadParam
```

호출 후 테스트는 첫 번째 호출 후 테스트와 동일합니다.

```solidity
    function testEncodeVal() public {
```

이 함수는 매개변수를 명시적으로 작성하는 대신 `encodeVal()`을 사용한다는 점을 제외하면 `testReadParam`과 유사합니다.

```solidity
        .
        .
        .
        _callInput = bytes.concat(
            FOUR_PARAMS,
            cache.encodeVal(VAL_A),
            cache.encodeVal(VAL_B),
            cache.encodeVal(VAL_C),
            cache.encodeVal(VAL_D)
        );
        .
        .
        .
        assertEq(_callInput.length, 4+1*4);
    }   // testEncodeVal
```

`testEncodeVal()`의 유일한 추가 테스트는 `_callInput`의 길이가 올바른지 확인하는 것입니다. 첫 번째 호출의 경우 4+33\*4입니다. 모든 값이 이미 캐시에 있는 두 번째 호출의 경우 4+1\*4입니다.

```solidity
    // 키가 단일 바이트 이상일 때 encodeVal 테스트
    // 캐시를 4바이트로 채우는 데 시간이
    // 너무 오래 걸리므로 최대 3바이트.
    function testEncodeValBig() public {
        // 캐시에 여러 값을 넣습니다.
        // 간단하게 하기 위해 키 n을 값 n에 사용합니다.
        for(uint i=1; i<0x1FFF; i++) {
            cache.cacheWrite(i);
        }
```

위의 `testEncodeVal` 함수는 캐시에 네 개의 값만 쓰므로 [다중 바이트 값을 처리하는 함수 부분](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol#L144-L171)은 확인되지 않습니다. 하지만 그 코드는 복잡하고 오류가 발생하기 쉽습니다.

이 함수의 첫 번째 부분은 1에서 0x1FFF까지의 모든 값을 순서대로 캐시에 쓰는 루프이므로 해당 값을 인코딩하고 어디로 가는지 알 수 있습니다.

```solidity
        .
        .
        .

        _callInput = bytes.concat(
            FOUR_PARAMS,
            cache.encodeVal(0x000F),   // 1바이트        0x0F
            cache.encodeVal(0x0010),   // 2바이트     0x1010
            cache.encodeVal(0x0100),   // 2바이트     0x1100
            cache.encodeVal(0x1000)    // 3바이트 0x201000
        );
```

1바이트, 2바이트 및 3바이트 값을 테스트합니다. 충분한 스택 항목(최소 0x10000000, 약 2억 5천만)을 쓰는 데 너무 오래 걸리기 때문에 그 이상은 테스트하지 않습니다.

```solidity
        .
        .
        .
        .
    }    // testEncodeValBig


    // 너무 작은 버퍼로 되돌림을 얻는 것을 테스트합니다.
    function testShortCalldata() public {
```

매개변수가 충분하지 않은 비정상적인 경우에 어떤 일이 발생하는지 테스트합니다.

```solidity
        .
        .
        .
        (_success, _callOutput) = _cacheAddr.call(_callInput);
        assertEq(_success, false);
    }   // testShortCalldata
```

되돌리기 때문에 얻어야 할 결과는 `false`입니다.

```
    // 없는 캐시 키로 호출
    function testNoCacheKey() public {
        .
        .
        .
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // 첫 번째 값, 캐시에 추가합니다.
            cache.INTO_CACHE(),
            bytes32(VAL_A),

            // 두 번째 값
            bytes1(0x0F),
            bytes2(0x1234),
            bytes11(0xA10102030405060708090A)
        );
```

이 함수는 캐시가 비어 있어서 읽을 값이 없다는 점을 제외하면 완벽하게 합법적인 4개의 매개변수를 얻습니다.

```solidity
        .
        .
        .
    // 너무 긴 버퍼로 모든 것이 잘 작동하는지 테스트합니다.
    function testLongCalldata() public {
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;

        // 첫 번째 호출, 캐시는 비어 있습니다.
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // 첫 번째 값, 캐시에 추가합니다.
            cache.INTO_CACHE(), bytes32(VAL_A),

            // 두 번째 값, 캐시에 추가합니다.
            cache.INTO_CACHE(), bytes32(VAL_B),

            // 세 번째 값, 캐시에 추가합니다.
            cache.INTO_CACHE(), bytes32(VAL_C),

            // 네 번째 값, 캐시에 추가합니다.
            cache.INTO_CACHE(), bytes32(VAL_D),

            // 그리고 "행운을 빌며" 또 다른 값을 추가합니다.
            bytes4(0x31112233)
        );
```

이 함수는 다섯 개의 값을 보냅니다. 다섯 번째 값은 유효한 캐시 항목이 아니기 때문에 무시된다는 것을 알고 있습니다. 포함되지 않았다면 되돌림이 발생했을 것입니다.

```solidity
        (_success, _callOutput) = _cacheAddr.call(_callInput);
        assertEq(_success, true);
        .
        .
        .
    }   // testLongCalldata

}        // CacheTest

```

## 샘플 애플리케이션 {#a-sample-app}

Solidity로 테스트를 작성하는 것은 모두 매우 좋지만, 결국 탈중앙화앱은 유용하려면 체인 외부의 요청을 처리할 수 있어야 합니다. 이 기사에서는 "한 번 쓰고, 여러 번 읽기"를 의미하는 `WORM`을 사용하여 탈중앙화앱에서 캐싱을 사용하는 방법을 보여줍니다. 키가 아직 쓰여지지 않았다면 값을 쓸 수 있습니다. 키가 이미 쓰여졌다면 되돌림을 받게 됩니다.

### 계약 {#the-contract}

[이것이 계약입니다](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/WORM.sol). 주로 `Cache`와 `CacheTest`로 이미 수행한 작업을 반복하므로 흥미로운 부분만 다룹니다.

```solidity
import "./Cache.sol";

contract WORM is Cache {
```

`Cache`를 사용하는 가장 쉬운 방법은 우리 자신의 계약에서 상속하는 것입니다.

```solidity
    function writeEntryCached() external {
        uint[] memory params = _readParams(2);
        writeEntry(params[0], params[1]);
    }    // writeEntryCached
```

이 함수는 위의 `CacheTest`에 있는 `fourParam`과 유사합니다. ABI 사양을 따르지 않기 때문에 함수에 매개변수를 선언하지 않는 것이 가장 좋습니다.

```solidity
    // 더 쉽게 호출할 수 있도록 합니다.
    // writeEntryCached()의 함수 서명, 제공처:
    // https://www.4byte.directory/signatures/?bytes4_signature=0xe4e4f2d3
    bytes4 constant public WRITE_ENTRY_CACHED = 0xe4e4f2d3;
```

ABI 사양을 따르지 않기 때문에 `writeEntryCached`를 호출하는 외부 코드는 `worm.writeEntryCached`를 사용하는 대신 수동으로 calldata를 빌드해야 합니다. 이 상수 값을 사용하면 작성하기가 더 쉬워집니다.

`WRITE_ENTRY_CACHED`를 상태 변수로 정의하더라도 외부에서 읽으려면 `worm.WRITE_ENTRY_CACHED()` 게터 함수를 사용해야 합니다.

```solidity
    function readEntry(uint key) public view
        returns (uint _value, address _writtenBy, uint _writtenAtBlock)
```

읽기 함수는 `view`이므로 트랜잭션이 필요하지 않으며 가스가 들지 않습니다. 결과적으로 매개변수에 캐시를 사용하는 이점이 없습니다. view 함수를 사용하면 더 간단한 표준 메커니즘을 사용하는 것이 가장 좋습니다.

### 테스트 코드 {#the-testing-code}

[이것은 계약에 대한 테스트 코드입니다](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/WORM.t.sol). 다시 한 번, 흥미로운 것만 살펴봅시다.

```solidity
    function testWReadWrite() public {
        worm.writeEntry(0xDEAD, 0x60A7);

        vm.expectRevert(bytes("항목이 이미 작성됨"));
        worm.writeEntry(0xDEAD, 0xBEEF);
```

[이것(`vm.expectRevert`)](https://book.getfoundry.sh/cheatcodes/expect-revert#expectrevert)은 Foundry 테스트에서 다음 호출이 실패해야 한다는 것과 실패의 보고된 이유를 지정하는 방법입니다. 이는 `<contract>.<function name>` 구문을 사용할 때 적용됩니다.()` 구문을 사용하는 것보다 calldata를 빌드하고 하위 수준 인터페이스(`<contract>.call()` 등)를 사용하여 계약을 호출하는 것보다.

```solidity
    function testReadWriteCached() public {
        uint cacheGoat = worm.cacheWrite(0x60A7);
```

여기서는 `cacheWrite`가 캐시 키를 반환한다는 사실을 사용합니다. `cacheWrite`는 상태를 변경하므로 트랜잭션 중에만 호출할 수 있기 때문에 프로덕션 환경에서 사용할 것으로 예상되는 것은 아닙니다. 트랜잭션에는 반환 값이 없으며, 결과가 있는 경우 해당 결과는 이벤트로 내보내져야 합니다. 따라서 `cacheWrite` 반환 값은 온체인 코드에서만 액세스할 수 있으며 온체인 코드는 매개변수 캐싱이 필요하지 않습니다.

```solidity
        (_success,) = address(worm).call(_callInput);
```

이것이 `<contract address>.call()`에 두 개의 반환 값이 있지만 첫 번째 값에만 관심이 있다는 것을 Solidity에 알리는 방법입니다.

```solidity
        (_success,) = address(worm).call(_callInput);
        assertEq(_success, false);
```

하위 수준 `<address>.call()` 함수를 사용하기 때문에 `vm.expectRevert()`를 사용할 수 없으며 호출에서 얻는 부울 성공 값을 확인해야 합니다.

```solidity
    event EntryWritten(uint indexed key, uint indexed value);

        .
        .
        .

        _callInput = bytes.concat(
            worm.WRITE_ENTRY_CACHED(), worm.encodeVal(a), worm.encodeVal(b));
        vm.expectEmit(true, true, false, false);
        emit EntryWritten(a, b);
        (_success,) = address(worm).call(_callInput);
```

이것이 Foundry에서 코드가 [이벤트를 올바르게 내보내는지](https://getfoundry.sh/reference/cheatcodes/expect-emit/) 확인하는 방법입니다.

### 클라이언트 {#the-client}

Solidity 테스트에서 얻을 수 없는 한 가지는 자신의 애플리케이션에 잘라내어 붙여넣을 수 있는 JavaScript 코드입니다. 그 코드를 작성하기 위해 WORM을 [Optimism Goerli](https://community.optimism.io/docs/useful-tools/networks/#optimism-goerli), [Optimism의](https://www.optimism.io/) 새로운 테스트넷에 배포했습니다. 주소는 [`0xd34335b1d818cee54e3323d3246bd31d94e6a78a`](https://goerli-optimism.etherscan.io/address/0xd34335b1d818cee54e3323d3246bd31d94e6a78a)입니다.

[클라이언트에 대한 JavaScript 코드는 여기에서 볼 수 있습니다](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/javascript/index.js). 사용 방법:

1. git 리포지토리 복제:

   ```sh
   git clone https://github.com/qbzzt/20220915-all-you-can-cache.git
   ```

2. 필요한 패키지 설치:

   ```sh
   cd javascript
   yarn
   ```

3. 구성 파일 복사:

   ```sh
   cp .env.example .env
   ```

4. 구성을 위해 `.env` 편집:

   | 매개 변수                                                         | 값                                                                                                                                                      |
   | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
   | MNEMONIC                                                      | 트랜잭션 비용을 지불할 수 있는 충분한 ETH가 있는 계정의 니모닉입니다. [여기에서 Optimism Goerli 네트워크용 무료 ETH를 얻을 수 있습니다](https://optimismfaucet.xyz/). |
   | OPTIMISM_GOERLI_URL | Optimism Goerli URL. 공용 엔드포인트 `https://goerli.optimism.io`는 속도가 제한되지만 여기서 필요한 만큼 충분합니다.                                |

5. `index.js`를 실행합니다.

   ```sh
   node index.js
   ```

   이 샘플 애플리케이션은 먼저 WORM에 항목을 쓰고 calldata와 Etherscan의 트랜잭션 링크를 표시합니다. 그런 다음 해당 항목을 다시 읽고 사용하는 키와 항목의 값(값, 블록 번호 및 작성자)을 표시합니다.

대부분의 클라이언트는 일반적인 Dapp JavaScript입니다. 따라서 다시 흥미로운 부분만 살펴보겠습니다.

```javascript
.
.
.
const main = async () => {
    const func = await worm.WRITE_ENTRY_CACHED()

    // 매번 새로운 키가 필요합니다.
    const key = await worm.encodeVal(Number(new Date()))
```

주어진 슬롯은 한 번만 쓸 수 있으므로 타임스탬프를 사용하여 슬롯을 재사용하지 않도록 합니다.

```javascript
const val = await worm.encodeVal("0x600D")

// 항목 작성
const calldata = func + key.slice(2) + val.slice(2)
```

Ethers는 호출 데이터가 16진수 문자열, 즉 `0x` 다음에 짝수 개의 16진수 숫자가 오는 것으로 예상합니다. `key`와 `val` 모두 `0x`로 시작하므로 해당 헤더를 제거해야 합니다.

```javascript
const tx = await worm.populateTransaction.writeEntryCached()
tx.data = calldata

sentTx = await wallet.sendTransaction(tx)
```

Solidity 테스트 코드와 마찬가지로 캐시된 함수를 정상적으로 호출할 수 없습니다. 대신 하위 수준 메커니즘을 사용해야 합니다.

```javascript
    .
    .
    .
    // 방금 작성한 항목 읽기
    const realKey = '0x' + key.slice(4)  // FF 플래그 제거
    const entryRead = await worm.readEntry(realKey)
    .
    .
    .
```

항목을 읽을 때는 일반적인 메커니즘을 사용할 수 있습니다. `view` 함수와 함께 매개변수 캐싱을 사용할 필요가 없습니다.

## 결론 {#conclusion}

이 기사의 코드는 개념 증명이며, 아이디어를 쉽게 이해하도록 하는 것이 목적입니다. 프로덕션 준비 시스템의 경우 몇 가지 추가 기능을 구현할 수 있습니다.

- `uint256`이 아닌 값을 처리합니다. 예를 들어, 문자열입니다.
- 전역 캐시 대신 사용자-캐시 간 매핑을 사용할 수 있습니다. 사용자마다 다른 값을 사용합니다.
- 주소에 사용되는 값은 다른 용도로 사용되는 값과 구별됩니다. 주소 전용 캐시를 별도로 두는 것이 합리적일 수 있습니다.
- 현재 캐시 키는 "선착순, 가장 작은 키" 알고리즘을 따릅니다. 처음 16개 값은 단일 바이트로 보낼 수 있습니다. 다음 4080개 값은 2바이트로 보낼 수 있습니다. 다음 약 백만 개의 값은 3바이트 등입니다. 프로덕션 시스템은 캐시 항목에 대한 사용 카운터를 유지하고 이를 재구성하여 가장 흔한 16개 값은 1바이트, 다음 4080개 가장 흔한 값은 2바이트 등이 되도록 해야 합니다.

  하지만 이는 잠재적으로 위험한 작업입니다. 다음과 같은 일련의 이벤트를 상상해 보십시오.

  1. Noam Naive는 `encodeVal`을 호출하여 토큰을 보내려는 주소를 인코딩합니다. 해당 주소는 애플리케이션에서 처음 사용된 주소 중 하나이므로 인코딩된 값은 0x06입니다. 이것은 트랜잭션이 아닌 `view` 함수이므로 Noam과 그가 사용하는 노드 사이의 일이며 다른 누구도 알지 못합니다.

  2. Owen Owner는 캐시 재정렬 작업을 실행합니다. 실제로 해당 주소를 사용하는 사람은 거의 없으므로 이제 0x201122로 인코딩됩니다. 다른 값인 10<sup>18</sup>이 0x06에 할당됩니다.

  3. Noam Naive는 자신의 토큰을 0x06으로 보냅니다. 토큰은 `0x0000000000000000000000000de0b6b3a7640000` 주소로 이동하며, 해당 주소의 개인 키를 아는 사람이 없으므로 그냥 갇혀 있습니다. Noam은 _행복하지 않습니다_.

  이 문제와 캐시 재정렬 중 멤풀에 있는 트랜잭션 관련 문제를 해결할 방법이 있지만, 이를 인지하고 있어야 합니다.

저는 Optimism 직원이고 이것이 제가 가장 잘 아는 롤업이기 때문에 여기서 Optimism으로 캐싱을 시연했습니다. 하지만 내부 처리에 최소한의 비용을 부과하여 트랜잭션 데이터를 L1에 쓰는 것이 주요 비용이 되는 모든 롤업에서 작동해야 합니다.

[여기서 제 작업에 대한 자세한 내용을 확인하세요](https://cryptodocguy.pro/).

