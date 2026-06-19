---
title: "마음껏 캐시하기"
description: 더 저렴한 롤업 트랜잭션을 위해 캐싱 컨트랙트를 생성하고 사용하는 방법을 배워보세요.
author: 오리 포메란츠
tags: ["레이어 2", "캐싱", "스토리지", "확장성"]
skill: intermediate
breadcrumb: 롤업을 위한 캐싱
published: 2022-09-15
lang: ko
---

롤업을 사용할 때 트랜잭션의 바이트당 비용은 스토리지 슬롯 비용보다 훨씬 비쌉니다. 따라서 가능한 한 많은 정보를 온체인에 캐시하는 것이 합리적입니다.

이 글에서는 여러 번 사용될 가능성이 있는 매개변수 값을 캐시하여 (처음 사용한 이후에는) 훨씬 적은 바이트 수로 사용할 수 있도록 캐싱 컨트랙트를 생성하고 사용하는 방법과, 이 캐시를 사용하는 오프체인 코드를 작성하는 방법을 배웁니다.

글을 건너뛰고 소스 코드만 보려면 [여기](https://github.com/qbzzt/20220915-all-you-can-cache)를 확인하세요. 개발 스택은 [Foundry](https://getfoundry.sh/introduction/installation/)입니다.

## 전체 설계 {#overall-design}

단순화를 위해 모든 트랜잭션 매개변수가 32바이트 길이의 `uint256`라고 가정하겠습니다. 트랜잭션을 수신하면 각 매개변수를 다음과 같이 파싱합니다:

1. 첫 번째 바이트가 `0xFF`인 경우, 다음 32바이트를 매개변수 값으로 가져와 캐시에 씁니다.

2. 첫 번째 바이트가 `0xFE`인 경우, 다음 32바이트를 매개변수 값으로 가져오되 캐시에 쓰지는 _않습니다_.

3. 다른 값의 경우, 상위 4비트를 추가 바이트 수로, 하위 4비트를 캐시 키의 최상위 비트로 사용합니다. 몇 가지 예시는 다음과 같습니다:

   | 콜 데이터의 바이트 | 캐시 키 |
   | :---------------- | --------: |
   | 0x0F              |      0x0F |
   | 0x10,0x10         |      0x10 |
   | 0x12,0xAC         |    0x02AC |
   | 0x2D,0xEA, 0xD6   |  0x0DEAD6 |

## 캐시 조작 {#cache-manipulation}

캐시는 [`Cache.sol`](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol)에 구현되어 있습니다. 한 줄씩 살펴보겠습니다.

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;


contract Cache {

    bytes1 public constant INTO_CACHE = 0xFF;
    bytes1 public constant DONT_CACHE = 0xFE;
```

이 상수들은 모든 정보를 제공하고 이를 캐시에 쓸지 여부를 결정하는 특수한 경우를 해석하는 데 사용됩니다. 캐시에 쓰려면 이전에 사용되지 않은 스토리지 슬롯에 두 번의 [`SSTORE`](https://www.evm.codes/#55) 연산이 필요하며 각각 22100 가스의 비용이 들기 때문에 이를 선택 사항으로 만듭니다.

```solidity

    mapping(uint => uint) public val2key;
```

값과 해당 키 간의 [매핑](https://www.geeksforgeeks.org/solidity/solidity-mappings/)입니다. 이 정보는 트랜잭션을 전송하기 전에 값을 인코딩하는 데 필요합니다.

```solidity
    // 위치 n은 키 n+1의 값을 가집니다. 왜냐하면 다음을 보존해야 하기 때문입니다.
    // 0을 "캐시에 없음"으로.
    uint[] public key2val;
```

키를 직접 할당하고 단순화를 위해 순차적으로 할당하기 때문에 키에서 값으로의 매핑에 배열을 사용할 수 있습니다.

```solidity
    function cacheRead(uint _key) public view returns (uint) {
        require(_key <= key2val.length, "Reading uninitialize cache entry");
        return key2val[_key-1];
    }  // cacheRead
```

캐시에서 값을 읽습니다.

```solidity
    // 값이 캐시에 아직 없는 경우 캐시에 값을 씁니다.
    // 테스트가 작동하도록 public으로만 설정되었습니다.
    function cacheWrite(uint _value) public returns (uint) {
        // 값이 이미 캐시에 있는 경우 현재 키를 반환합니다.
        if (val2key[_value] != 0) {
            return val2key[_value];
        }
```

동일한 값을 캐시에 두 번 이상 넣을 필요는 없습니다. 값이 이미 존재한다면 기존 키를 반환하기만 하면 됩니다.

```solidity
        // 0xFE는 특수한 경우이므로 캐시가 보유할 수 있는 가장 큰 키는
        // 0x0D 뒤에 15개의 0xFF가 오는 값입니다. 캐시 길이가 이미 이만큼
        // 크다면 실패합니다.
        //                              1 2 3 4 5 6 7 8 9 A B C D E F
        require(key2val.length+1 < 0x0DFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF,
            "cache overflow");
```

그렇게 큰 캐시(약 1.8\*10<sup>37</sup>개의 항목, 저장하는 데 약 10<sup>27</sup> TB 필요)를 갖게 될 일은 없을 것이라 생각합니다. 하지만 저는 ["640kB면 항상 충분할 것이다"](https://quoteinvestigator.com/2011/09/08/640k-enough/)라는 말을 기억할 만큼 나이가 들었습니다. 이 테스트는 비용이 매우 저렴합니다.

```solidity
        // 다음 키를 사용하여 값을 씁니다.
        val2key[_value] = key2val.length+1;
```

역방향 조회(값에서 키로)를 추가합니다.

```solidity
        key2val.push(_value);
```

순방향 조회(키에서 값으로)를 추가합니다. 값을 순차적으로 할당하기 때문에 마지막 배열 값 뒤에 추가하기만 하면 됩니다.

```solidity
        return key2val.length;
    }  // cacheWrite
```

새 값이 저장된 셀인 `key2val`의 새 길이를 반환합니다.

```solidity
    function _calldataVal(uint startByte, uint length)
        private pure returns (uint)
```

이 함수는 임의의 길이(최대 32바이트, 워드 크기)의 콜 데이터에서 값을 읽습니다.

```solidity
    {
        uint _retVal;

        require(length < 0x21,
            "_calldataVal length limit is 32 bytes");
        require(length + startByte <= msg.data.length,
            "_calldataVal trying to read beyond calldatasize");
```

이 함수는 내부(internal) 함수이므로 나머지 코드가 올바르게 작성되었다면 이 테스트들은 필요하지 않습니다. 하지만 비용이 많이 들지 않으므로 포함하는 것이 좋습니다.

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

이 코드는 [Yul](https://docs.soliditylang.org/en/v0.8.16/yul.html)로 작성되었습니다. 콜 데이터에서 32바이트 값을 읽습니다. EVM에서 초기화되지 않은 공간은 0으로 간주되므로 콜 데이터가 `startByte+32` 이전에 끝나더라도 정상적으로 작동합니다.

```solidity
        _retVal = _retVal >> (256-length*8);
```

반드시 32바이트 값이 필요한 것은 아닙니다. 이 코드는 초과된 바이트를 제거합니다.

```solidity
        return _retVal;
    } // _calldataVal


    // _fromByte에서 시작하여 콜 데이터에서 단일 매개변수를 읽습니다.
    function _readParam(uint _fromByte) internal
        returns (uint _nextByte, uint _parameterValue)
    {
```

콜 데이터에서 단일 매개변수를 읽습니다. 매개변수의 길이는 1바이트에서 33바이트까지 다양할 수 있으므로 읽은 값뿐만 아니라 다음 바이트의 위치도 반환해야 합니다.

```solidity
        // 첫 번째 바이트는 나머지 부분을 해석하는 방법을 알려줍니다.
        uint8 _firstByte;

        _firstByte = uint8(_calldataVal(_fromByte, 1));
```

Solidity는 잠재적으로 위험한 [암시적 타입 변환](https://docs.soliditylang.org/en/v0.8.16/types.html#implicit-conversions)을 금지하여 버그 수를 줄이려고 합니다. 예를 들어 256비트에서 8비트로의 다운그레이드는 명시적이어야 합니다.

```solidity

        // 값을 읽지만 캐시에 쓰지는 않습니다.
        if (_firstByte == uint8(DONT_CACHE))
            return(_fromByte+33, _calldataVal(_fromByte+1, 32));

        // 값을 읽고 캐시에 씁니다.
        if (_firstByte == uint8(INTO_CACHE)) {
            uint _param = _calldataVal(_fromByte+1, 32);
            cacheWrite(_param);
            return(_fromByte+33, _param);
        }

        // 여기에 도달했다면 캐시에서 읽어야 함을 의미합니다.

        // 읽을 추가 바이트 수
        uint8 _extraBytes = _firstByte / 16;
```

하위 [니블(nibble)](https://en.wikipedia.org/wiki/Nibble)을 가져와 다른 바이트와 결합하여 캐시에서 값을 읽습니다.

```solidity
        uint _key = (uint256(_firstByte & 0x0F) << (8*_extraBytes)) +
            _calldataVal(_fromByte+1, _extraBytes);

        return (_fromByte+_extraBytes+1, cacheRead(_key));

    }  // _readParam


    // n개의 매개변수를 읽습니다(함수는 예상하는 매개변수 수를 알고 있습니다).
    function _readParams(uint _paramNum) internal returns (uint[] memory) {
```

콜 데이터 자체에서 우리가 가진 매개변수의 수를 얻을 수도 있지만, 우리를 호출하는 함수들은 예상하는 매개변수의 수를 알고 있습니다. 그들이 우리에게 알려주도록 하는 것이 더 쉽습니다.

```solidity
        // 우리가 읽은 매개변수
        uint[] memory params = new uint[](_paramNum);

        // 매개변수는 4바이트부터 시작하며, 그 앞은 함수 서명입니다.
        uint _atByte = 4;

        for(uint i=0; i<_paramNum; i++) {
            (_atByte, params[i]) = _readParam(_atByte);
        }
```

필요한 개수가 될 때까지 매개변수를 읽습니다. 콜 데이터의 끝을 지나치면 `_readParams`가 호출을 되돌리기(revert)합니다.

```solidity

        return(params);
    }   // readParams

    // _readParams를 테스트하기 위해 4개의 매개변수 읽기를 테스트합니다.
    function fourParam() public
        returns (uint256,uint256,uint256,uint256)
    {
        uint[] memory params;
        params = _readParams(4);
        return (params[0], params[1], params[2], params[3]);
    }    // fourParam
```

Foundry의 큰 장점 중 하나는 Solidity로 테스트를 작성할 수 있다는 것입니다([아래 캐시 테스트하기 참조](#testing-the-cache)). 이는 단위 테스트를 훨씬 쉽게 만듭니다. 이 함수는 4개의 매개변수를 읽고 반환하여 테스트에서 올바른지 확인할 수 있도록 합니다.

```solidity
    // 값을 가져오고, 이를 인코딩할 바이트를 반환합니다(가능한 경우 캐시 사용).
    function encodeVal(uint _val) public view returns(bytes memory) {
```

`encodeVal`는 오프체인 코드가 캐시를 사용하는 콜 데이터를 생성하는 데 도움을 주기 위해 호출하는 함수입니다. 단일 값을 받아 이를 인코딩한 바이트를 반환합니다. 이 함수는 `view`이므로 트랜잭션이 필요하지 않으며 외부에서 호출할 때 가스 비용이 들지 않습니다.

```solidity
        uint _key = val2key[_val];

        // 값이 아직 캐시에 없으므로 추가합니다.
        if (_key == 0)
            return bytes.concat(INTO_CACHE, bytes32(_val));
```

[EVM](/developers/docs/evm/)에서 초기화되지 않은 모든 스토리지는 0으로 간주됩니다. 따라서 존재하지 않는 값의 키를 찾으면 0을 얻게 됩니다. 이 경우 이를 인코딩하는 바이트는 `INTO_CACHE`(다음에 캐시되도록 함)이며, 그 뒤에 실제 값이 옵니다.

```solidity
        // 키가 <0x10인 경우 단일 바이트로 반환합니다.
        if (_key < 0x10)
            return bytes.concat(bytes1(uint8(_key)));
```

단일 바이트가 가장 쉽습니다. [`bytes.concat`](https://docs.soliditylang.org/en/v0.8.16/types.html#the-functions-bytes-concat-and-string-concat)를 사용하여 `bytes<n>` 타입을 임의의 길이를 가질 수 있는 바이트 배열로 변환하기만 하면 됩니다. 이름과 달리 단일 인수만 제공되어도 잘 작동합니다.

```solidity
        // 0x1vvv로 인코딩된 2바이트 값
        if (_key < 0x1000)
            return bytes.concat(bytes2(uint16(_key) | 0x1000));
```

16<sup>3</sup>보다 작은 키가 있는 경우 2바이트로 표현할 수 있습니다. 먼저 256비트 값인 `_key`를 16비트 값으로 변환하고 논리적 OR를 사용하여 첫 번째 바이트에 추가 바이트 수를 더합니다. 그런 다음 이를 `bytes2` 값으로 변환하면 `bytes`로 변환할 수 있습니다.

```solidity
        // 다음 줄을 루프로 처리하는 기발한 방법이 있을 수 있지만,
        // 이것은 view 함수이므로 프로그래머의 시간과 단순성을 위해
        // 최적화하고 있습니다.

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

다른 값들(3바이트, 4바이트 등)도 필드 크기만 다를 뿐 동일한 방식으로 처리됩니다.

```solidity
        // 여기에 도달했다면 무언가 잘못된 것입니다.
        revert("Error in encodeVal, should not happen");
```

여기에 도달했다면 16\*256<sup>15</sup>보다 작지 않은 키를 얻었다는 의미입니다. 하지만 `cacheWrite`가 키를 제한하므로 14\*256<sup>16</sup>(첫 번째 바이트가 0xFE이므로 `DONT_CACHE`처럼 보일 것임)까지 도달할 수도 없습니다. 하지만 미래의 프로그래머가 버그를 유발할 경우를 대비해 테스트를 추가하는 데 큰 비용이 들지 않습니다.

```solidity
    } // encodeVal

}  // Cache
```

### 캐시 테스트하기 {#testing-the-cache}

Foundry의 장점 중 하나는 [Solidity로 테스트를 작성할 수 있다는 것](https://getfoundry.sh/forge/tests/overview/)이며, 이는 단위 테스트 작성을 더 쉽게 만듭니다. `Cache` 클래스에 대한 테스트는 [여기](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/Cache.t.sol)에 있습니다. 테스트 코드는 보통 그렇듯 반복적이기 때문에 이 글에서는 흥미로운 부분만 설명합니다.

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";


// 콘솔을 보려면 `forge test -vv`를 실행해야 합니다.
import "forge-std/console.sol";
```

이것은 테스트 패키지와 `console.log`를 사용하기 위해 필요한 보일러플레이트일 뿐입니다.

```solidity
import "src/Cache.sol";
```

우리가 테스트하는 컨트랙트를 알아야 합니다.

```solidity
contract CacheTest is Test {
    Cache cache;

    function setUp() public {
        cache = new Cache();
    }
```

`setUp` 함수는 각 테스트 전에 호출됩니다. 이 경우 테스트가 서로 영향을 미치지 않도록 새 캐시를 생성하기만 합니다.

```solidity
    function testCaching() public {
```

테스트는 이름이 `test`로 시작하는 함수입니다. 이 함수는 값을 쓰고 다시 읽는 기본적인 캐시 기능을 확인합니다.

```solidity
        for(uint i=1; i<5000; i++) {
            cache.cacheWrite(i*i);
        }

        for(uint i=1; i<5000; i++) {
            assertEq(cache.cacheRead(i), i*i);
```

이것이 [`assert...` 함수](https://getfoundry.sh/reference/forge-std/std-assertions/)를 사용하여 실제 테스트를 수행하는 방법입니다. 이 경우 우리가 쓴 값이 읽은 값과 일치하는지 확인합니다. 캐시 키가 선형적으로 할당된다는 것을 알고 있으므로 `cache.cacheWrite`의 결과는 무시할 수 있습니다.

```solidity
        }
    }    // testCaching


    // 동일한 값을 여러 번 캐시하고, 키가 동일하게 유지되는지
    // 확인합니다.
    function testRepeatCaching() public {
        for(uint i=1; i<100; i++) {
            uint _key1 = cache.cacheWrite(i);
            uint _key2 = cache.cacheWrite(i);
            assertEq(_key1, _key2);
        }
```

먼저 각 값을 캐시에 두 번 쓰고 키가 동일한지 확인합니다(두 번째 쓰기가 실제로 발생하지 않았음을 의미함).

```solidity
        for(uint i=1; i<100; i+=3) {
            uint _key = cache.cacheWrite(i);
            assertEq(_key, i);
        }
    }    // testRepeatCaching
```

이론적으로 연속적인 캐시 쓰기에 영향을 미치지 않는 버그가 있을 수 있습니다. 따라서 여기서는 연속적이지 않은 쓰기를 수행하고 값이 여전히 다시 쓰이지 않는지 확인합니다.

```solidity
    // 메모리 버퍼에서 uint를 읽습니다(우리가 보낸 매개변수를
    // 다시 돌려받는지 확인하기 위해).
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

Yul은 `uint256` 이상의 데이터 구조를 지원하지 않으므로 메모리 버퍼 `_bytes`와 같은 더 정교한 데이터 구조를 참조할 때 해당 구조의 주소를 얻게 됩니다. Solidity는 `bytes memory` 값을 길이를 포함하는 32바이트 워드와 그 뒤에 오는 실제 바이트로 저장하므로, 바이트 번호 `_start`을 얻으려면 `_bytes+32+_start`을 계산해야 합니다.

```solidity

        return tempUint;
    }     // toUint256

    // fourParams()의 함수 서명, 출처:
    // https://www.4byte.directory/signatures/?bytes4_signature=0x3edc1e6d
    bytes4 constant FOUR_PARAMS = 0x3edc1e6d;

    // 올바른 값을 돌려받는지 확인하기 위한 몇 가지 상수 값
    uint256 constant VAL_A = 0xDEAD60A7;
    uint256 constant VAL_B =     0xBEEF;
    uint256 constant VAL_C =     0x600D;
    uint256 constant VAL_D = 0x600D60A7;
```

테스트에 필요한 몇 가지 상수입니다.

```solidity
    function testReadParam() public {
```

매개변수를 올바르게 읽을 수 있는지 테스트하기 위해 `readParams`을 사용하는 함수인 `fourParams()`를 호출합니다.

```solidity
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;
```

캐시를 사용하는 함수를 호출하기 위해 일반적인 ABI 메커니즘을 사용할 수 없으므로 저수준 [`<address>.call()`](https://docs.soliditylang.org/en/v0.8.16/types.html#members-of-addresses) 메커니즘을 사용해야 합니다. 이 메커니즘은 `bytes memory`를 입력으로 받아 출력으로 (불리언 값과 함께) 반환합니다.

```solidity
        // 첫 번째 호출, 캐시가 비어 있습니다.
        _callInput = bytes.concat(
            FOUR_PARAMS,
```

동일한 컨트랙트가 캐시된 함수(트랜잭션에서 직접 호출하는 경우)와 캐시되지 않은 함수(다른 스마트 컨트랙트에서 호출하는 경우)를 모두 지원하는 것이 유용합니다. 이를 위해서는 모든 것을 [`fallback` 함수](https://docs.soliditylang.org/en/v0.8.16/contracts.html#fallback-function)에 넣는 대신 올바른 함수를 호출하기 위해 Solidity 메커니즘에 계속 의존해야 합니다. 이렇게 하면 조합성이 훨씬 쉬워집니다. 대부분의 경우 함수를 식별하는 데 단일 바이트면 충분하므로 3바이트(16\*3=48 가스)를 낭비하는 셈입니다. 하지만 이 글을 쓰는 시점에서 48 가스의 비용은 0.07센트이며, 이는 더 단순하고 버그가 발생하기 쉬운 코드를 줄이는 데 합리적인 비용입니다.

```solidity
            // 첫 번째 값, 캐시에 추가합니다.
            cache.INTO_CACHE(),
            bytes32(VAL_A),
```

첫 번째 값: 캐시에 써야 하는 전체 값임을 나타내는 플래그와 그 뒤에 오는 32바이트의 값입니다. 나머지 세 값도 비슷하지만, `VAL_B`는 캐시에 쓰이지 않고 `VAL_C`는 세 번째 매개변수이자 네 번째 매개변수라는 점이 다릅니다.

```solidity
             .
             .
             .
        );
        (_success, _callOutput) = _cacheAddr.call(_callInput);
```

여기서 실제로 `Cache` 컨트랙트를 호출합니다.

```solidity
        assertEq(_success, true);
```

호출이 성공할 것으로 예상합니다.

```solidity
        assertEq(cache.cacheRead(1), VAL_A);
        assertEq(cache.cacheRead(2), VAL_C);
```

빈 캐시로 시작한 다음 `VAL_A`를 추가하고 이어서 `VAL_C`를 추가합니다. 첫 번째는 키 1을, 두 번째는 키 2를 가질 것으로 예상합니다.

```
assertEq(toUint256(_callOutput,0), VAL_A);
        assertEq(toUint256(_callOutput,32), VAL_B);
        assertEq(toUint256(_callOutput,64), VAL_C);
        assertEq(toUint256(_callOutput,96), VAL_C);
```

출력은 4개의 매개변수입니다. 여기서 올바른지 확인합니다.

```solidity
        // 두 번째 호출, 캐시를 사용할 수 있습니다.
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // 캐시의 첫 번째 값
            bytes1(0x01),
```

16 미만의 캐시 키는 단 1바이트입니다.

```solidity
            // 두 번째 값, 캐시에 추가하지 않습니다.
            cache.DONT_CACHE(),
            bytes32(VAL_B),

            // 세 번째와 네 번째 값, 동일한 값
            bytes1(0x02),
            bytes1(0x02)
        );
        .
        .
        .
    }   // testReadParam
```

호출 후의 테스트는 첫 번째 호출 후의 테스트와 동일합니다.

```solidity
    function testEncodeVal() public {
```

이 함수는 매개변수를 명시적으로 쓰는 대신 `encodeVal()`를 사용한다는 점을 제외하면 `testReadParam`와 유사합니다.

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
    // 키가 단일 바이트보다 클 때 encodeVal을 테스트합니다.
    // 캐시를 4바이트로 채우는 데 시간이 너무 오래 걸리므로
    // 최대 3바이트입니다.
    function testEncodeValBig() public {
        // 캐시에 여러 값을 넣습니다.
        // 간단하게 유지하기 위해 값 n에 키 n을 사용합니다.
        for(uint i=1; i<0x1FFF; i++) {
            cache.cacheWrite(i);
        }
```

위의 `testEncodeVal` 함수는 캐시에 4개의 값만 쓰기 때문에 [다중 바이트 값을 처리하는 함수 부분](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol#L144-L171)은 확인되지 않습니다. 하지만 그 코드는 복잡하고 오류가 발생하기 쉽습니다.

이 함수의 첫 번째 부분은 1부터 0x1FFF까지의 모든 값을 순서대로 캐시에 쓰는 루프이므로, 해당 값들을 인코딩하고 어디로 가는지 알 수 있습니다.

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

1바이트, 2바이트, 3바이트 값을 테스트합니다. 그 이상은 충분한 스택 항목(최소 0x10000000, 약 2억 5천만 개)을 쓰는 데 너무 오래 걸리기 때문에 테스트하지 않습니다.

```solidity
        .
        .
        .
        .
    }    // testEncodeValBig


    // 지나치게 작은 버퍼를 사용하면 되돌리기가 발생하는지 테스트합니다.
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

되돌리기(revert)가 발생하므로 우리가 얻어야 할 결과는 `false`입니다.

```
// 존재하지 않는 캐시 키로 호출
    function testNoCacheKey() public {
        .
        .
        .
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // 첫 번째 값, 캐시에 추가
            cache.INTO_CACHE(),
            bytes32(VAL_A),

            // 두 번째 값
            bytes1(0x0F),
            bytes2(0x1234),
            bytes11(0xA10102030405060708090A)
        );
```

이 함수는 캐시가 비어 있어 읽을 값이 없다는 점을 제외하면 완벽하게 합법적인 4개의 매개변수를 얻습니다.

```solidity
        .
        .
        .
    // 지나치게 긴 버퍼를 사용해도 모든 것이 잘 작동하는지 테스트합니다.
    function testLongCalldata() public {
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;

        // 첫 번째 호출, 캐시가 비어 있습니다.
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

            // 그리고 "행운"을 위한 또 다른 값
            bytes4(0x31112233)
        );
```

이 함수는 5개의 값을 보냅니다. 다섯 번째 값은 유효한 캐시 항목이 아니기 때문에 무시된다는 것을 알고 있으며, 포함되지 않았다면 되돌리기(revert)가 발생했을 것입니다.

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

Solidity로 테스트를 작성하는 것도 좋지만, 결국 탈중앙화 애플리케이션 (dapp)이 유용하려면 체인 외부의 요청을 처리할 수 있어야 합니다. 이 글에서는 "한 번 쓰고 여러 번 읽기(Write Once, Read Many)"를 의미하는 `WORM`를 사용하여 탈중앙화 애플리케이션 (dapp)에서 캐싱을 사용하는 방법을 보여줍니다. 키가 아직 쓰이지 않은 경우 값을 쓸 수 있습니다. 키가 이미 쓰인 경우 되돌리기(revert)가 발생합니다.

### 컨트랙트 {#the-contract}

[이것이 컨트랙트입니다](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/WORM.sol). 대부분 `Cache` 및 `CacheTest`에서 이미 수행한 작업을 반복하므로 흥미로운 부분만 다루겠습니다.

```solidity
import "./Cache.sol";

contract WORM is Cache {
```

`Cache`를 사용하는 가장 쉬운 방법은 자체 컨트랙트에서 이를 상속하는 것입니다.

```solidity
    function writeEntryCached() external {
        uint[] memory params = _readParams(2);
        writeEntry(params[0], params[1]);
    }    // writeEntryCached
```

이 함수는 위의 `CacheTest`에 있는 `fourParam`와 유사합니다. ABI 사양을 따르지 않기 때문에 함수에 매개변수를 선언하지 않는 것이 가장 좋습니다.

```solidity
    // 호출을 더 쉽게 만듭니다.
    // writeEntryCached()의 함수 서명, 출처:
    // https://www.4byte.directory/signatures/?bytes4_signature=0xe4e4f2d3
    bytes4 constant public WRITE_ENTRY_CACHED = 0xe4e4f2d3;
```

`writeEntryCached`를 호출하는 외부 코드는 ABI 사양을 따르지 않기 때문에 `worm.writeEntryCached`를 사용하는 대신 콜 데이터를 수동으로 빌드해야 합니다. 이 상수 값을 가지면 작성하기가 더 쉬워집니다.

`WRITE_ENTRY_CACHED`를 상태 변수로 정의하더라도 외부에서 읽으려면 해당 게터(getter) 함수인 `worm.WRITE_ENTRY_CACHED()`를 사용해야 합니다.

```solidity
    function readEntry(uint key) public view
        returns (uint _value, address _writtenBy, uint _writtenAtBlock)
```

읽기 함수는 `view`이므로 트랜잭션이 필요하지 않고 가스 비용이 들지 않습니다. 결과적으로 매개변수에 캐시를 사용하는 이점이 없습니다. view 함수의 경우 더 단순한 표준 메커니즘을 사용하는 것이 가장 좋습니다.

### 테스트 코드 {#the-testing-code}

[이것은 컨트랙트의 테스트 코드입니다](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/WORM.t.sol). 다시 한 번, 흥미로운 부분만 살펴보겠습니다.

```solidity
    function testWReadWrite() public {
        worm.writeEntry(0xDEAD, 0x60A7);

        vm.expectRevert(bytes("entry already written"));
        worm.writeEntry(0xDEAD, 0xBEEF);
```

[이것(`vm.expectRevert`)](https://book.getfoundry.sh/cheatcodes/expect-revert#expectrevert)은 Foundry 테스트에서 다음 호출이 실패해야 함을 지정하고 실패에 대해 보고된 이유를 지정하는 방법입니다. 이는 콜 데이터를 빌드하고 저수준 인터페이스(`<contract>.call()` 등)를 사용하여 컨트랙트를 호출하는 대신 `<contract>.<function name>()` 구문을 사용할 때 적용됩니다.

```solidity
    function testReadWriteCached() public {
        uint cacheGoat = worm.cacheWrite(0x60A7);
```

여기서는 `cacheWrite`가 캐시 키를 반환한다는 사실을 사용합니다. `cacheWrite`는 상태를 변경하므로 트랜잭션 중에만 호출할 수 있기 때문에 프로덕션 환경에서 사용할 것으로 예상되는 것은 아닙니다. 트랜잭션에는 반환 값이 없으며, 결과가 있는 경우 해당 결과는 이벤트로 내보내져야 합니다. 따라서 `cacheWrite` 반환 값은 온체인 코드에서만 접근할 수 있으며, 온체인 코드는 매개변수 캐싱이 필요하지 않습니다.

```solidity
        (_success,) = address(worm).call(_callInput);
```

이것은 `<contract address>.call()`에 두 개의 반환 값이 있지만 첫 번째 값에만 관심이 있다는 것을 Solidity에 알려주는 방법입니다.

```solidity
        (_success,) = address(worm).call(_callInput);
        assertEq(_success, false);
```

저수준 `<address>.call()` 함수를 사용하기 때문에 `vm.expectRevert()`를 사용할 수 없으며 호출에서 얻은 불리언 성공 값을 확인해야 합니다.

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
Solidity 테스트에서 얻을 수 없는 한 가지는 자체 애플리케이션에 잘라내어 붙여넣을 수 있는 JavaScript 코드입니다. 이 코드를 작성하기 위해 저는 [옵티미즘](https://www.optimism.io/)의 새로운 테스트넷인 [옵티미즘 괴를리](https://community.optimism.io/docs/useful-tools/networks/#optimism-goerli)에 WORM을 배포했습니다. 주소는 [`0xd34335b1d818cee54e3323d3246bd31d94e6a78a`](https://goerli-optimism.etherscan.io/address/0xd34335b1d818cee54e3323d3246bd31d94e6a78a)입니다.

[여기서 클라이언트용 JavaScript 코드를 볼 수 있습니다](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/javascript/index.js). 사용 방법은 다음과 같습니다:

1. git 리포지토리를 복제합니다:

   ```sh
   git clone https://github.com/qbzzt/20220915-all-you-can-cache.git
   ```

2. 필요한 패키지를 설치합니다:

   ```sh
   cd javascript
   yarn
   ```

3. 구성 파일을 복사합니다:

   ```sh
   cp .env.example .env
   ```

4. 구성에 맞게 `.env`를 편집합니다:

   | 매개변수 | 값 |
   | --- | --- |
   | MNEMONIC | 트랜잭션 비용을 지불할 충분한 ETH가 있는 계정의 니모닉입니다. [여기서 옵티미즘 괴를리 네트워크용 무료 ETH를 얻을 수 있습니다](https://optimismfaucet.xyz/). |
   | OPTIMISM_GOERLI_URL | 옵티미즘 괴를리의 URL입니다. 퍼블릭 엔드포인트인 `https://goerli.optimism.io`는 속도 제한이 있지만 여기서 필요한 작업에는 충분합니다. |

5. `index.js`를 실행합니다.

   ```sh
   node index.js
   ```

   이 샘플 애플리케이션은 먼저 WORM에 항목을 쓰고 콜 데이터와 Etherscan의 트랜잭션 링크를 표시합니다. 그런 다음 해당 항목을 다시 읽고 사용하는 키와 항목의 값(값, 블록 번호 및 작성자)을 표시합니다.

클라이언트의 대부분은 일반적인 탈중앙화 애플리케이션 (dapp) JavaScript입니다. 따라서 다시 한 번 흥미로운 부분만 살펴보겠습니다.

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

// 항목을 씁니다.
const calldata = func + key.slice(2) + val.slice(2)
```

Ethers는 콜 데이터가 16진수 문자열, 즉 `0x` 뒤에 짝수 개의 16진수 숫자가 오는 형태일 것으로 예상합니다. `key`와 `val` 모두 `0x`로 시작하므로 해당 헤더를 제거해야 합니다.

```javascript
const tx = await worm.populateTransaction.writeEntryCached()
tx.data = calldata

sentTx = await wallet.sendTransaction(tx)
```

Solidity 테스트 코드와 마찬가지로 캐시된 함수를 정상적으로 호출할 수 없습니다. 대신 더 낮은 수준의 메커니즘을 사용해야 합니다.

```javascript
    .
    .
    .
    // 방금 쓴 항목을 읽습니다.
    const realKey = '0x' + key.slice(4)  // FF 플래그를 제거합니다.
    const entryRead = await worm.readEntry(realKey)
    .
    .
    .
```

항목을 읽을 때는 일반적인 메커니즘을 사용할 수 있습니다. `view` 함수에는 매개변수 캐싱을 사용할 필요가 없습니다.

## 결론 {#conclusion}

이 글의 코드는 개념 증명(proof of concept)이며, 아이디어를 쉽게 이해하도록 하는 것이 목적입니다. 프로덕션 준비가 된 시스템의 경우 몇 가지 추가 기능을 구현하고 싶을 수 있습니다:

- `uint256`가 아닌 값을 처리합니다. 예를 들어 문자열입니다.
- 전역 캐시 대신 사용자와 캐시 간의 매핑을 가질 수 있습니다. 사용자마다 다른 값을 사용합니다.
- 주소에 사용되는 값은 다른 용도로 사용되는 값과 구별됩니다. 주소 전용 캐시를 별도로 두는 것이 합리적일 수 있습니다.
- 현재 캐시 키는 "선착순, 가장 작은 키" 알고리즘을 따릅니다. 처음 16개의 값은 단일 바이트로 보낼 수 있습니다. 다음 4080개의 값은 2바이트로 보낼 수 있습니다. 다음 약 100만 개의 값은 3바이트 등입니다. 프로덕션 시스템은 캐시 항목에 대한 사용 카운터를 유지하고 이를 재구성하여 _가장 일반적인_ 16개의 값이 1바이트, 다음으로 가장 일반적인 4080개의 값이 2바이트가 되도록 해야 합니다.

  하지만 이는 잠재적으로 위험한 작업입니다. 다음과 같은 일련의 사건을 상상해 보세요:

  1. 순진한 노암(Noam Naive)이 토큰을 보낼 주소를 인코딩하기 위해 `encodeVal`를 호출합니다. 해당 주소는 애플리케이션에서 처음 사용된 주소 중 하나이므로 인코딩된 값은 0x06입니다. 이것은 트랜잭션이 아닌 `view` 함수이므로 노암과 그가 사용하는 노드 사이에서만 이루어지며 다른 누구도 알지 못합니다.

  2. 소유자 오웬(Owen Owner)이 캐시 재정렬 작업을 실행합니다. 실제로 해당 주소를 사용하는 사람이 거의 없으므로 이제 0x201122로 인코딩됩니다. 다른 값인 10<sup>18</sup>에 0x06이 할당됩니다.

  3. 순진한 노암이 자신의 토큰을 0x06으로 보냅니다. 토큰은 `0x0000000000000000000000000de0b6b3a7640000` 주소로 이동하며, 아무도 해당 주소의 개인 키를 모르기 때문에 그곳에 갇히게 됩니다. 노암은 _기분이 좋지 않습니다_.

  이 문제와 캐시 재정렬 중에 멤풀에 있는 트랜잭션과 관련된 문제를 해결할 방법은 있지만, 이를 인지하고 있어야 합니다.

저는 옵티미즘의 직원이자 이 롤업을 가장 잘 알고 있기 때문에 여기서 옵티미즘을 사용하여 캐싱을 시연했습니다. 하지만 내부 처리 비용이 최소화되어 레이어 1 (l1)에 트랜잭션 데이터를 쓰는 것이 주요 비용이 되는 모든 롤업에서 작동할 것입니다.

[제 다른 작업물은 여기서 확인하세요](https://cryptodocguy.pro/).