---
title: "一切皆可缓存"
description: 学习如何创建和使用缓存合约，以便进行更实惠的卷叠交易
author: Ori Pomerantz
tags:
  - "二层网络"
  - "缓存"
  - "storage"
skill: intermediate
published: 2022-09-15
lang: zh
---

当使用卷叠时，交易中一个字节的成本比一个存储插槽的成本要高得多。 因此，在链上缓存尽可能多的信息是有意义的。

在本文中，你将学习如何创建和使用缓存合约，使得任何可能被多次使用的参数值都会被缓存，并且（在第一次使用之后）可通过更少的字节数来使用，并学习如何编写使用此缓存的链下代码。

如果你想跳过这篇文章，直接查看源代码，[参见此处](https://github.com/qbzzt/20220915-all-you-can-cache)。 开发堆栈是 [Foundry](https://book.getfoundry.sh/getting-started/installation)。

## 总体设计 {#overall-design}

为了简单起见，我们将假定所有交易参数是 `uint256`，长度为 32 个字节。 当我们收到交易时，将对每个参数进行解析，如下所示：

1. 如果第一个字节是 `0xFF`，则将接下来的 32 个字节作为参数值并将其写入缓存。

2. 如果第一个字节是 `0xFE`，则将接下来的 32 个字节作为参数值，但_不_将其写入缓存。

3. 对于任何其他值，将前四位作为额外字节的数量，将后四位作为缓存键的最高有效位。 以下是一些示例：

   | calldata 中的字节   |      缓存键 |
   |:--------------- | --------:|
   | 0x0F            |     0x0F |
   | 0x10,0x10       |     0x10 |
   | 0x12,0xAC       |   0x02AC |
   | 0x2D,0xEA, 0xD6 | 0x0DEAD6 |

## 缓存操作 {#cache-manipulation}

缓存是在 [`Cache.sol`](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol) 中实现的。 我们逐行学习它。

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;


contract Cache {

    bytes1 public constant INTO_CACHE = 0xFF;
    bytes1 public constant DONT_CACHE = 0xFE;
```

这些常量用于解释特殊情况，其中我们提供了所有信息，但是是否希望将其写入缓存是可选的。 写入缓存需要对之前未使用的存储插槽执行两次 [`SSTORE`](https://www.evm.codes/#55) 操作，每次操作花费 22100 燃料，这样我们将此操作变为可选操作。

```solidity

    mapping(uint => uint) public val2key;
```

一个在值和其键之间的[映射](https://www.geeksforgeeks.org/solidity-mappings/)。 在发送交易之前，对值进行编码时需要这些信息。

```solidity
    // Location n has the value for key n+1, because we need to preserve
    // zero as "not in the cache".
    uint[] public key2val;
```

我们可以使用数组来进行从键到值的映射，出于简单起见，我们按顺序分配键。

```solidity
    function cacheRead(uint _key) public view returns (uint) {
        require(_key <= key2val.length, "Reading uninitialize cache entry");
        return key2val[_key-1];
    }  // cacheRead
```

从缓存中读取一个值。

```solidity
    // Write a value to the cache if it's not there already
    // Only public to enable the test to work
    function cacheWrite(uint _value) public returns (uint) {
        // If the value is already in the cache, return the current key
        if (val2key[_value] != 0) {
            return val2key[_value];
        }
```

在缓存中多次存储相同的值是没有意义的。 如果值已经存在，只需返回现有的键。

```solidity
        // Since 0xFE is a special case, the largest key the cache can
        // hold is 0x0D followed by 15 0xFF's. If the cache length is already that
        // large, fail.
        //                              1 2 3 4 5 6 7 8 9 A B C D E F
        require(key2val.length+1 < 0x0DFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF,
            "cache overflow");
```

我认为我们永远无法获得如此庞大的缓存（大约 1.8\*10<sup>37</sup> 个条目，需要大约 10<sup>27</sup> TB 的存储空间）。 然而，我知道[“640kB 始终足够了”](https://quoteinvestigator.com/2011/09/08/640k-enough/)。 这一测试非常实惠。

```solidity
        // Write the value using the next key
        val2key[_value] = key2val.length+1;
```

添加反向查找（从值到键）。

```solidity
        key2val.push(_value);
```

添加正向查找（从键到值）。 因为我们按顺序分配值，所以我们可以将其添加在最后一个数组值之后。

```solidity
        return key2val.length;
    }  // cacheWrite
```

返回 `key2val` 的新长度，该长度表示存储新值的单元格位置。

```solidity
    function _calldataVal(uint startByte, uint length)
        private pure returns (uint)
```

这个函数从任意长度的 calldata（最多 32 个字节，即一个字的大小）中读取一个值。

```solidity
    {
        uint _retVal;

        require(length < 0x21,
            "_calldataVal length limit is 32 bytes");
        require(length + startByte <= msg.data.length,
            "_calldataVal trying to read beyond calldatasize");
```

这个函数是内部函数，因此如果其余的代码编写正确，则不需要这些测试。 然而，它们的成本不高，所以不妨拥有它们。

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

此代码采用 [Yul](https://docs.soliditylang.org/en/v0.8.16/yul.html) 语言。 它从 calldata 中读取一个 32 字节的值。 即使该 calldata 在 `startByte+32` 之前停止，这种方法仍然有效，因为在以太坊虚拟机中，未初始化的空间被视为零。

```solidity
        _retVal = _retVal >> (256-length*8);
```

我们并不一定需要一个 32 字节的值。 这将消除多余的字节。

```solidity
        return _retVal;
    } // _calldataVal


    // Read a single parameter from the calldata, starting at _fromByte
    function _readParam(uint _fromByte) internal
        returns (uint _nextByte, uint _parameterValue)
    {
```

从 calldata 中读取单个参数。 请注意，我们需要返回的不仅仅是我们读取的值，还包括下一个字节的位置，因为参数的长度可以从 1 个字节到 33 个字节不等。

```solidity
        // The first byte tells us how to interpret the rest
        uint8 _firstByte;

        _firstByte = uint8(_calldataVal(_fromByte, 1));
```

Solidity 试图通过禁止可能危险的[隐式类型转换](https://docs.soliditylang.org/en/v0.8.16/types.html#implicit-conversions)来减少错误的数量。 降级操作，例如从 256 位降级为 8 位，需要为显式。

```solidity

        // Read the value, but do not write it to the cache
        if (_firstByte == uint8(DONT_CACHE))
            return(_fromByte+33, _calldataVal(_fromByte+1, 32));

        // Read the value, and write it to the cache
        if (_firstByte == uint8(INTO_CACHE)) {
            uint _param = _calldataVal(_fromByte+1, 32);
            cacheWrite(_param);
            return(_fromByte+33, _param);
        }

        // If we got here it means that we need to read from the cache

        // Number of extra bytes to read
        uint8 _extraBytes = _firstByte / 16;
```

取出低位四位（[半字节](https://en.wikipedia.org/wiki/Nibble)），并将其与其他字节组合以从缓存中读取值。

```solidity
        uint _key = (uint256(_firstByte & 0x0F) << (8*_extraBytes)) +
            _calldataVal(_fromByte+1, _extraBytes);

        return (_fromByte+_extraBytes+1, cacheRead(_key));

    }  // _readParam


    // Read n parameters (functions know how many parameters they expect)
    function _readParams(uint _paramNum) internal returns (uint[] memory) {
```

我们可以从 calldata 中获取我们拥有的参数数量，但是调用我们的函数知道它们期望的参数数量。 让这些函数告诉我们会更容易一些。

```solidity
        // The parameters we read
        uint[] memory params = new uint[](_paramNum);

        // Parameters start at byte 4, before that it's the function signature
        uint _atByte = 4;

        for(uint i=0; i<_paramNum; i++) {
            (_atByte, params[i]) = _readParam(_atByte);
        }
```

读取参数，直到你获取所需的数量。 如果我们超出了 calldata 的末尾，`_readParams` 将会回滚调用。

```solidity

        return(params);
    }   // readParams

    // For testing _readParams, test reading four parameters
    function fourParam() public
        returns (uint256,uint256,uint256,uint256)
    {
        uint[] memory params;
        params = _readParams(4);
        return (params[0], params[1], params[2], params[3]);
    }    // fourParam
```

Foundry 的一个重大优势是允许用 Solidity 编写测试（[见下文的“测试缓存”](#testing-the-cache)）。 这使得单元测试变得更加容易。 这个函数读取四个参数并返回这些参数，以便测试可以验证它们是否正确。

```solidity
    // Get a value, return bytes that will encode it (using the cache if possible)
    function encodeVal(uint _val) public view returns(bytes memory) {
```

`encodeVal` 是一个由链下代码调用的函数，用于帮助创建使用缓存的 calldata。 它接收一个值，并返回对其进行编码的字节。 该函数是一个 `view` 函数，因此不需要进行交易，并且在被外部调用时不需要支付任何燃料费用。

```solidity
        uint _key = val2key[_val];

        // The value isn't in the cache yet, add it
        if (_key == 0)
            return bytes.concat(INTO_CACHE, bytes32(_val));
```

在[以太坊虚拟机](/developers/docs/evm/)中，所有未初始化的存储被假定为零。 因此，如果我们在查找一个不存在的值的键时，会得到一个零。 在这种情况下，对其进行编码的字节为 `INTO_CACHE`（这样下次将被缓存），接着是实际的值。

```solidity
        // If the key is <0x10, return it as a single byte
        if (_key < 0x10)
            return bytes.concat(bytes1(uint8(_key)));
```

单字节是最简单的。 我们使用 [`bytes.concat`](https://docs.soliditylang.org/en/v0.8.16/types.html#the-functions-bytes-concat-and-string-concat) 函数将 `bytes<n>` 类型转换为可以是任意长度的字节数组。 尽管名称如此，但当只提供一个参数时，它仍能正常工作。

```solidity
        // Two byte value, encoded as 0x1vvv
        if (_key < 0x1000)
            return bytes.concat(bytes2(uint16(_key) | 0x1000));
```

当我们有一个小于 16<sup>3</sup> 的键时，我们可以用两个字节来表示它。 我们首先将一个 256 位的值 ` _key` 转换为一个 16 位的值，并使用逻辑“或”将额外字节数添加到第一个字节。 然后我们将其转换为 `bytes2` 值，继而可以转换为 `bytes`。

```solidity
        // There is probably a clever way to do the following lines as a loop,
        // but it's a view function so I'm optimizing for programmer time and
        // simplicity.

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

其他的值（例如 3 字节、4 字节等）的处理方式相同，只是字段大小不同。

```solidity
        // If we get here, something is wrong.
        revert("Error in encodeVal, should not happen");
```

如果到了这一步，意味着我们得到了一个键，其值不小于 16*256<sup>15</sup>。 但是 `cacheWrite` 对键进行了限制，因此我们甚至无法达到 14\*256<sup>16</sup>（其首字节为 0xFE，因此看起来像 `DONT_CACHE`）。 添加一个测试来防止未来的开发者引入错误，并不需要太多成本。

```solidity
    } // encodeVal

}  // Cache
```

### 测试缓存 {#testing-the-cache}

Foundry 的一个优势是[允许你使用 Solidity 编写测试](https://book.getfoundry.sh/forge/tests)，这使得编写单元测试更加容易。 `Cache` 类的测试可以在[此处](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/Cache.t.sol)找到。 由于测试代码通常会有很多重复的部分，本文仅说明有趣的部分。

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";


// Need to run `forge test -vv` for the console.
import "forge-std/console.sol";
```

这只是一个样板文件，用于使用测试包和 `console.log`。

```solidity
import "src/Cache.sol";
```

我们需要知道我们正在测试的合约。

```solidity
contract CacheTest is Test {
    Cache cache;

    function setUp() public {
        cache = new Cache();
    }
```

在每个测试之前都会调用 `setUp` 函数。 在这种情况下，我们只需创建一个新的缓存，这样我们的测试就不会相互影响。

```solidity
    function testCaching() public {
```

测试是以 `test` 开头的函数。 该函数检查基本的缓存功能，写入值并再次读取这些值。

```solidity
        for(uint i=1; i<5000; i++) {
            cache.cacheWrite(i*i);
        }

        for(uint i=1; i<5000; i++) {
            assertEq(cache.cacheRead(i), i*i);
```

这是你进行实际测试时使用的方法，使用 [`assert...` 函数](https://book.getfoundry.sh/reference/forge-std/std-assertions)。 在这种情况下，我们检查我们写入的值是否是我们读取的值。 我们可以忽略 `cache.cacheWrite` 的结果，因为我们知道缓存键是按线性分配的。

```solidity
        }
    }    // testCaching


    // Cache the same value multiple times, ensure that the key stays
    // the same
    function testRepeatCaching() public {
        for(uint i=1; i<100; i++) {
            uint _key1 = cache.cacheWrite(i);
            uint _key2 = cache.cacheWrite(i);
            assertEq(_key1, _key2);
        }
```

首先，我们将每个值写入缓存两次，并确保键是相同的（这意味着第二次写入实际上并没有发生）。

```solidity
        for(uint i=1; i<100; i+=3) {
            uint _key = cache.cacheWrite(i);
            assertEq(_key, i);
        }
    }    // testRepeatCaching
```

理论上，这是一种不会影响连续缓存写入的错误。 所以在这里，我们进行一些非连续的写入操作，并看到值仍然没有被重新写入。

```solidity
    // Read a uint from a memory buffer (to make sure we get back the parameters
    // we sent out)
    function toUint256(bytes memory _bytes, uint256 _start) internal pure
        returns (uint256)
```

从 `bytes memory` 缓冲区中读取一个 256 位的字。 这个实用功能使我们能够验证，在运行使用缓存的函数调用时，我们是否收到了正确的结果。

```solidity
    {
        require(_bytes.length >= _start + 32, "toUint256_outOfBounds");
        uint256 tempUint;

        assembly {
            tempUint := mload(add(add(_bytes, 0x20), _start))
        }
```

Yul 不支持超出 `uint256` 的数据结构，因此当你引用更复杂的数据结构，例如内存缓冲区 `_bytes` 时，你会得到该结构的地址。 Solidity 将 `bytes memory` 类型的值存储为一个 32 字节的字，其中包含长度信息，后跟实际的字节。因此，要获取字节数量 `_start`，我们需要计算 `_bytes+32+_start`。

```solidity

        return tempUint;
    }     // toUint256

    // Function signature for fourParams(), courtesy of
    // https://www.4byte.directory/signatures/?bytes4_signature=0x3edc1e6d
    bytes4 constant FOUR_PARAMS = 0x3edc1e6d;

    // Just some constant values to see we're getting the correct values back
    uint256 constant VAL_A = 0xDEAD60A7;
    uint256 constant VAL_B =     0xBEEF;
    uint256 constant VAL_C =     0x600D;
    uint256 constant VAL_D = 0x600D60A7;
```

进行测试所需的一些常量。

```solidity
    function testReadParam() public {
```

调用 `fourParams()` 函数，该函数使用 `readParams` 来测试我们是否正确读取参数。

```solidity
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;
```

我们无法使用普通的应用程序二进制接口机制来调用使用缓存的函数，因此我们需要使用低级别的 [`<address>.call()`](https://docs.soliditylang.org/en/v0.8.16/types.html#members-of-addresses) 机制。 该机制接受一个 `bytes memory` 类型的输入，并将其作为输出返回（同时返回一个布尔值）。

```solidity
        // First call, the cache is empty
        _callInput = bytes.concat(
            FOUR_PARAMS,
```

对于同一个合约来说，支持缓存函数（用于从交易直接调用）和非缓存函数（用于从其他智能合约调用）是很有用的。 为了做到这一点，我们需要继续依赖 Solidity 机制来调用正确的函数，而不是将所有内容放在一个 [`feedback` 函数](https://docs.soliditylang.org/en/v0.8.16/contracts.html#fallback-function)中。 这样做可以大大简化可组合性的实现。 在大多数情况下，一个字节就足够标识函数了，所以我们浪费了三个字节（16\*3= 48 单位燃料）。 然而，就我撰写此文时而言，这 48 单位燃料的成本为 0.07 美分，对于更简单、错误更少的代码而言，这是合理的成本。

```solidity
            // First value, add it to the cache
            cache.INTO_CACHE(),
            bytes32(VAL_A),
```

第一个值：一个标志，表示它是一个完整的值，需要写入缓存，后面跟着 32 字节的值。 其他三个值类似，只是 `VAL_B` 不被写入缓存，而 `VAL_C` 同时作为第三个参数和第四个参数。

```solidity
             .
             .
             .
        );
        (_success, _callOutput) = _cacheAddr.call(_callInput);
```

这是我们实际调用 `Cache` 合约的地方。

```solidity
        assertEq(_success, true);
```

我们期望这次调用取得成功。

```solidity
        assertEq(cache.cacheRead(1), VAL_A);
        assertEq(cache.cacheRead(2), VAL_C);
```

我们从一个空缓存开始，然后添加 `VAL_A`，接着是 `VAL_C`。 我们期望第一个值的键为 1，第二个值的键为 2。

```
        assertEq(toUint256(_callOutput,0), VAL_A);
        assertEq(toUint256(_callOutput,32), VAL_B);
        assertEq(toUint256(_callOutput,64), VAL_C);
        assertEq(toUint256(_callOutput,96), VAL_C);
```

输出为四个参数。 在这里，我们验证其是否正确。

```solidity
        // Second call, we can use the cache
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // First value in the Cache
            bytes1(0x01),
```

小于 16 的缓存键只占用一个字节。

```solidity
            // Second value, don't add it to the cache
            cache.DONT_CACHE(),
            bytes32(VAL_B),

            // Third and fourth values, same value
            bytes1(0x02),
            bytes1(0x02)
        );
        .
        .
        .
    }   // testReadParam
```

该调用之后的测试与第一次调用后的测试相同。

```solidity
    function testEncodeVal() public {
```

这个函数类似于 `testReadParam`，不同之处在于我们使用 `encodeVal()` 来代替显式写入参数。

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

`testEncodeVal()` 中唯一的附加测试是验证 `_callInput` 的长度是否正确。 对于第一次调用，长度为 4+33\*4。 对于第二次调用，其中每个值已经存在于缓存中，长度为 4+1\*4。

```solidity
    // Test encodeVal when the key is more than a single byte
    // Maximum three bytes because filling the cache to four bytes takes
    // too long.
    function testEncodeValBig() public {
        // Put a number of values in the cache.
        // To keep things simple, use key n for value n.
        for(uint i=1; i<0x1FFF; i++) {
            cache.cacheWrite(i);
        }
```

上述 `testEncodeVal` 函数只将四个值写入缓存中，因此并未检查[处理多字节值的函数部分](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol#L144-L171)。 但是那段代码很复杂且容易出错。

该函数的第一部分是一个循环，这个循环将从 1 到 0x1FFF 的所有值按顺序写入缓存，因此我们将能够对这些值进行编码并知道这些值的去向。

```solidity
        .
        .
        .

        _callInput = bytes.concat(
            FOUR_PARAMS,
            cache.encodeVal(0x000F),   // One byte        0x0F
            cache.encodeVal(0x0010),   // Two bytes     0x1010
            cache.encodeVal(0x0100),   // Two bytes     0x1100
            cache.encodeVal(0x1000)    // Three bytes 0x201000
        );
```

测试一个字节、两个字节和三个字节的值。 我们没有测试更多字节的值，因为编写足够的堆栈条目将需要很长时间（至少 0x10000000 个，约为 2.5 亿个）。

```solidity
        .
        .
        .
        .
    }    // testEncodeValBig


    // Test what with an excessively small buffer we get a revert
    function testShortCalldata() public {
```

测试在参数不足的异常情况下会发生什么。

```solidity
        .
        .
        .
        (_success, _callOutput) = _cacheAddr.call(_callInput);
        assertEq(_success, false);
    }   // testShortCalldata
```

由于发生了回滚，我们应该得到的结果是 `false`。

```
    // Call with cache keys that aren't there
    function testNoCacheKey() public {
        .
        .
        .
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // First value, add it to the cache
            cache.INTO_CACHE(),
            bytes32(VAL_A),

            // Second value
            bytes1(0x0F),
            bytes2(0x1234),
            bytes11(0xA10102030405060708090A)
        );
```

该函数获取四个完全合法的参数，但是缓存是空的，因此没有值可供读取。

```solidity
        .
        .
        .
    // Test what with an excessively long buffer everything works file
    function testLongCalldata() public {
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;

        // First call, the cache is empty
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // First value, add it to the cache
            cache.INTO_CACHE(), bytes32(VAL_A),

            // Second value, add it to the cache
            cache.INTO_CACHE(), bytes32(VAL_B),

            // Third value, add it to the cache
            cache.INTO_CACHE(), bytes32(VAL_C),

            // Fourth value, add it to the cache
            cache.INTO_CACHE(), bytes32(VAL_D),

            // And another value for "good luck"
            bytes4(0x31112233)
        );
```

该函数发送五个值。 我们知道第五个值因为不是有效缓存条目而被忽略，但若未包含该值，将会导致回滚。

```solidity
        (_success, _callOutput) = _cacheAddr.call(_callInput);
        assertEq(_success, true);
        .
        .
        .
    }   // testLongCalldata

}        // CacheTest

```

## 一个应用示例 {#a-sample-app}

使用 Solidity 语言来编写测试非常重要，但最终，一个去中心化应用程序需要能够处理来自链外的请求才能发挥其实用性。 本文演示了如何在去中心化应用程序中使用缓存，其中使用了 `WORM`（Write Once, Read Many，写入一次，读取多次）的概念。 如果一个键尚未被写入，你可以向其写入一个值。 如果该键已被写入，你可以进行回滚。

### 合约 {#the-contract}

[这就是合约](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/WORM.sol)。 这主要重复了我们已经完成的 `Cache` 和 `CacheTest` 部分内容，因此我们只涵盖有趣的部分。

```solidity
import "./Cache.sol";

contract WORM is Cache {
```

使用 `Cache` 的最简单方法是在我们自己的合约中继承它。

```solidity
    function writeEntryCached() external {
        uint[] memory params = _readParams(2);
        writeEntry(params[0], params[1]);
    }    // writeEntryCached
```

此函数与上面的 `CacheTest` 中的 `fourParam` 函数类似。 由于我们并未遵循 ABI 规范，最好不要在函数中声明任何参数。

```solidity
    // Make it easier to call us
    // Function signature for writeEntryCached(), courtesy of
    // https://www.4byte.directory/signatures/?bytes4_signature=0xe4e4f2d3
    bytes4 constant public WRITE_ENTRY_CACHED = 0xe4e4f2d3;
```

由于我们并未遵循应用程序二进制接口规范，调用 `writeEntryCached` 的外部代码需要手动构建 calldata，而不是使用 `worm.writeEntryCached`。 使用此常量值只是为了更方便地进行编写。

请注意，尽管我们将 `WRITE_ENTRY_CACHED` 定义为一个状态变量，但要在外部读取它，必须使用它的 getter 函数，即 `worm.WRITE_ENTRY_CACHED()`。

```solidity
    function readEntry(uint key) public view
        returns (uint _value, address _writtenBy, uint _writtenAtBlock)
```

Read 函数是一个 `view` 函数，因此它不需要进行交易，并且不会消耗燃料。 因此，对于该参数来说，使用缓存没有任何好处。 对于 view 函数，最好使用更简单的标准机制。

### 测试代码 {#the-testing-code}

[这是合约的测试代码](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/WORM.t.sol)。 同样，让我们只关注有趣的部分。

```solidity
    function testWReadWrite() public {
        worm.writeEntry(0xDEAD, 0x60A7);

        vm.expectRevert(bytes("entry already written"));
        worm.writeEntry(0xDEAD, 0xBEEF);
```

[此 (`vm.expectRevert`)](https://book.getfoundry.sh/cheatcodes/expect-revert#expectrevert) 是我们如何在 Foundry 测试中指定下一次调用应该失败，以及报告的失败原因。 这适用于我们使用语法 `<contract>.<function name>()` 而不是构建 calldata 并使用低级别接口来调用合约（`<contract>.call()` 等）的情况。

```solidity
    function testReadWriteCached() public {
        uint cacheGoat = worm.cacheWrite(0x60A7);
```

这里我们利用了 `cacheWrite` 返回缓存键这一情况。 这并不是我们期望在生产环境中使用的内容，因为 `cacheWrite` 会改变状态，因此只能在交易中调用。 交易没有返回值，如果交易有结果，那么这些结果应该以事件的形式触发。 因此，`cacheWrite` 返回值只能从链上代码访问，而链上代码不需要参数缓存。

```solidity
        (_success,) = address(worm).call(_callInput);
```

这就是我们对 Solidity 作出指示的方式，即虽然 `<contract address>.call()` 有两个返回值，但我们只关注第一个返回值。

```solidity
        (_success,) = address(worm).call(_callInput);
        assertEq(_success, false);
```

由于我们使用低级别的 `<address>.call()` 函数，因此无法使用 `vm.expectRevert()`，而且必须查看从调用中获取的布尔型成功值。

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

这是我们在 Foundry 中验证代码[正确触发事件](https://book.getfoundry.sh/cheatcodes/expect-emit)的方式。

### 客户端 {#the-client}

在 Solidity 测试中，你无法得到可以复制粘贴到你自己应用程序中的 JavaScript 代码。 为了编写那段代码，我将 WORM 部署到 [Optimism Goerli](https://community.optimism.io/docs/useful-tools/networks/#optimism-goerli)，这是 [Optimism](https://www.optimism.io/) 的新测试网络。 地址为 [`0xd34335b1d818cee54e3323d3246bd31d94e6a78a`](https://goerli-optimism.etherscan.io/address/0xd34335b1d818cee54e3323d3246bd31d94e6a78a)。

[你可以在这里看到客户端的 JavaScript 代码](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/javascript/index.js)。 要使用该代码：

1. 克隆 git 存储库：

   ```sh
   git clone https://github.com/qbzzt/20220915-all-you-can-cache.git
   ```

2. 安装必要的软件包：

   ```sh
   cd javascript
   yarn
   ```

3. 复制配置文件：

   ```sh
   cp .env.example .env
   ```

4. 编辑 `.env` 文件以进行配置：

   | 参数                    | 值                                                                                        |
   | --------------------- | ---------------------------------------------------------------------------------------- |
   | MNEMONIC              | 持有足够以太币来支付交易费用的帐户的助记词。 [你可以在此处免费获取 Optimism Goerli 网络的以太币](https://optimismfaucet.xyz/)。 |
   | OPTIMISM_GOERLI_URL | Optimism Goerli 的 URL。 公共端点 `https://goerli.optimism.io` 存在速率限制，但能够满足我们此处的需求             |

5. 运行 `index.js`。

   ```sh
   node index.js
   ```

   这个示例应用程序首先将一个条目写入到 WORM，在 Etherscan 上显示 calldata 以及交易链接。 然后它会读回该条目，并显示它使用的键以及条目中的值（值、区块编号和作者）。

大多数客户端是普通的去中心化应用程序 JavaScript。 因此，我们只会介绍有趣的部分。

```javascript
.
.
.
const main = async () => {
    const func = await worm.WRITE_ENTRY_CACHED()

    // Need a new key every time
    const key = await worm.encodeVal(Number(new Date()))
```

每个时隙只能被写入一次，因此我们使用时间戳来确保不重复使用时隙。

```javascript
const val = await worm.encodeVal("0x600D")

// Write an entry
const calldata = func + key.slice(2) + val.slice(2)
```

Ethers 期望调用数据是一个十六进制字符串，即以 `0x` 开头，后跟偶数个十六进制数字。 由于 `key` 和 `val` 都以 `0x` 开头，我们需要去除这些头部信息。

```javascript
const tx = await worm.populateTransaction.writeEntryCached()
tx.data = calldata

sentTx = await wallet.sendTransaction(tx)
```

与 Solidity 的测试代码一样，我们无法正常调用缓存函数。 我们需要改用一个更低级别的机制。

```javascript
    .
    .
    .
    // Read the entry just written
    const realKey = '0x' + key.slice(4)  // remove the FF flag
    const entryRead = await worm.readEntry(realKey)
    .
    .
    .
```

对于读取条目，我们可以使用普通的机制。 在使用 `view` 函数时，不需要使用参数缓存。

## 结论 {#conclusion}

本文中的代码是概念验证，其目的是使想法易于理解。 对于一个生产就绪系统，你可能希望实现一些额外的功能：

- 处理不是 `uint256` 类型的值。 例如，字符串。
- 除了使用全局缓存，也可以建立用户与缓存之间的映射。 不同用户使用不同的值。
- 用于地址的数值与用于其他目的的数值是不同的。 为地址单独创建一个缓存可能是有意义的。
- 当前的缓存键采用的是“先来者，得最小键”算法。 前 16 个值可以作为单个字节发送。 接下来的 4080 个值以两个字节发送。 接下来的大约一百万个值是以三个字节发送。 生产系统应该在缓存条目上保留使用计数器，并重新组织它们，使得 16 个_最常见_的值使用一个字节，接下来的 4080 个最常见的值使用两个字节，依此类推。

  然而，这是一个潜在的危险操作。 设想以下事件序列：

  1. Noam Naive 调用 `encodeVal` 函数来对他想要向其中发送代币的地址进行编码。 该地址是应用程序中使用的最早一批地址之一，因此编码值为 0x06。 这是一个 `view` 函数，而不是一个交易，发生于 Noam 和他使用的节点之间，而其他人则对此毫不知情。

  2. Owen Owner 运行缓存重排序操作。 实际上，很少有人会使用那个地址，所以现在它被编码为 0x201122。 另一个数值，10<sup>18</sup>，被赋值为 0x06。

  3. Noam Naive 将他的代币发送到了 0x06 地址。 它们被发送到地址 `0x0000000000000000000000000de0b6b3a7640000`，由于没有人知道该地址的私钥，这些代币将永远留在那里。 Noam _不开心_。

  虽然有多种方法可以解决此问题，以及解决与缓存重新排序期间内存池中的交易相关的问题，但你必须对此有所了解。

由于我是 Optimism 的员工，这是我最熟悉的卷叠，所以这里我展示了使用 Optimism 进行缓存。 但是，对于任何内部处理费用较低的卷叠方案，这个方法应该是有效的，因为相比之下，将交易数据写入一层网络是主要费用。
