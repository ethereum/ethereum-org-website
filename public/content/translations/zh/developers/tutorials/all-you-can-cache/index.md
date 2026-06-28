---
title: "尽情缓存"
description: "了解如何创建和使用缓存合约，以降低 Rollup 交易成本"
author: "奥里·波梅兰茨"
tags: ["二层网络", "缓存", "存储", "扩容"]
skill: intermediate
breadcrumb: "汇总缓存"
published: 2022-09-15
lang: zh
---

使用汇总时，交易中一个字节的成本比存储时隙的成本要高得多。因此，尽可能多地在链上缓存信息是有意义的。

在本文中，你将学习如何创建和使用缓存合约，使得任何可能被多次使用的参数值都能被缓存，并在（首次使用后）以更少的字节数供后续使用，以及如何编写使用此缓存的链下代码。

如果你想跳过本文直接查看源代码，[请点击这里](https://github.com/qbzzt/20220915-all-you-can-cache)。开发技术栈为 [Foundry](https://getfoundry.sh/introduction/installation/)。

## 整体设计 {#overall-design}

为了简单起见，我们假设所有交易参数都是 `uint256`，即 32 字节长。当我们收到一笔交易时，我们将按如下方式解析每个参数：

1. 如果第一个字节是 `0xFF`，则将接下来的 32 个字节作为参数值并将其写入缓存。

2. 如果第一个字节是 `0xFE`，则将接下来的 32 个字节作为参数值，但_不要_将其写入缓存。

3. 对于任何其他值，将高四位作为附加字节的数量，将低四位作为缓存密钥的最高有效位。以下是一些示例：

   | 调用数据中的字节 | 缓存密钥 |
   | :---------------- | --------: |
   | 0x0F              |      0x0F |
   | 0x10,0x10         |      0x10 |
   | 0x12,0xAC         |    0x02AC |
   | 0x2D,0xEA, 0xD6   |  0x0DEAD6 |

## 缓存操作 {#cache-manipulation}

缓存在 [`缓存.sol`](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol) 中实现。让我们逐行查看。

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;


contract Cache {

    bytes1 public constant INTO_CACHE = 0xFF;
    bytes1 public constant DONT_CACHE = 0xFE;
```

这些常量用于解释特殊情况，即我们提供了所有信息，并决定是否将其写入缓存。写入缓存需要对以前未使用的存储时隙执行两次 [`SSTORE`](https://www.evm.codes/#55) 操作，每次消耗 22100 Gas，因此我们将其设为可选。

```solidity

    mapping(uint => uint) public val2key;
```

值与其密钥之间的[映射](https://www.geeksforgeeks.org/solidity/solidity-mappings/)。在发送交易之前，此信息对于编码值是必需的。

```solidity
    // 位置 n 具有密钥 n+1 的值，因为我们需要保留
    // 零表示“不在缓存中”。
    uint[] public key2val;
```

我们可以使用数组来映射从密钥到值的关系，因为密钥是由我们分配的，为了简单起见，我们按顺序进行分配。

```solidity
    function cacheRead(uint _key) public view returns (uint) {
        require(_key <= key2val.length, "Reading uninitialize cache entry");
        return key2val[_key-1];
    }  // cacheRead
```

从缓存中读取一个值。

```solidity
    // 如果缓存中尚不存在该值，则将其写入缓存
    // 仅设为 public 以使测试能够运行
    function cacheWrite(uint _value) public returns (uint) {
        // 如果该值已在缓存中，则返回当前密钥
        if (val2key[_value] != 0) {
            return val2key[_value];
        }
```

将相同的值多次放入缓存中毫无意义。如果该值已经存在，只需返回现有的密钥即可。

```solidity
        // 由于 0xFE 是一个特例，缓存能容纳的最大密钥
        // 是 0x0D 后跟 15 个 0xFF。如果缓存长度已经达到该
        // 大小，则失败。
        //                              1 2 3 4 5 6 7 8 9 A B C D E F
        require(key2val.length+1 < 0x0DFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF,
            "cache overflow");
```

我认为我们永远不会拥有那么大的缓存（大约 1.8\*10<sup>37</sup> 个条目，这需要大约 10<sup>27</sup> TB 的存储空间）。然而，我的年纪足以让我记住[“640kB 永远足够了”](https://quoteinvestigator.com/2011/09/08/640k-enough/)这句名言。这个测试的成本非常低。

```solidity
        // 使用下一个密钥写入该值
        val2key[_value] = key2val.length+1;
```

添加反向查找（从值到密钥）。

```solidity
        key2val.push(_value);
```

添加正向查找（从密钥到值）。因为我们按顺序分配值，所以只需将其添加到最后一个数组值之后即可。

```solidity
        return key2val.length;
    }  // cacheWrite
```

返回 `key2val` 的新长度，即存储新值的单元格。

```solidity
    function _calldataVal(uint startByte, uint length)
        private pure returns (uint)
```

此函数从任意长度（最多 32 字节，即字长）的调用数据中读取一个值。

```solidity
    {
        uint _retVal;

        require(length < 0x21,
            "_calldataVal length limit is 32 bytes");
        require(length + startByte <= msg.data.length,
            "_calldataVal trying to read beyond calldatasize");
```

此函数是内部函数，因此如果其余代码编写正确，则不需要这些测试。然而，它们的成本不高，所以我们不妨保留它们。

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

此代码是用 [Yul](https://docs.soliditylang.org/en/v0.8.16/yul.html) 编写的。它从调用数据中读取一个 32 字节的值。即使调用数据在 `startByte+32` 之前结束，这也有效，因为 EVM 中未初始化的空间被视为零。

```solidity
        _retVal = _retVal >> (256-length*8);
```

我们不一定需要 32 字节的值。这会去除多余的字节。

```solidity
        return _retVal;
    } // _calldataVal


    // 从调用数据中读取单个参数，从 _fromByte 开始
    function _readParam(uint _fromByte) internal
        returns (uint _nextByte, uint _parameterValue)
    {
```

从调用数据中读取单个参数。请注意，我们不仅需要返回读取的值，还需要返回下一个字节的位置，因为参数的长度可以从 1 字节到 33 字节不等。

```solidity
        // 第一个字节告诉我们如何解释其余部分
        uint8 _firstByte;

        _firstByte = uint8(_calldataVal(_fromByte, 1));
```

Solidity 试图通过禁止潜在危险的[隐式类型转换](https://docs.soliditylang.org/en/v0.8.16/types.html#implicit-conversions)来减少错误数量。降级（例如从 256 位降至 8 位）需要显式进行。

```solidity

        // 读取该值，但不将其写入缓存
        if (_firstByte == uint8(DONT_CACHE))
            return(_fromByte+33, _calldataVal(_fromByte+1, 32));

        // 读取该值，并将其写入缓存
        if (_firstByte == uint8(INTO_CACHE)) {
            uint _param = _calldataVal(_fromByte+1, 32);
            cacheWrite(_param);
            return(_fromByte+33, _param);
        }

        // 如果我们到达这里，意味着我们需要从缓存中读取

        // 要读取的额外字节数
        uint8 _extraBytes = _firstByte / 16;
```

取低[半字节](https://en.wikipedia.org/wiki/Nibble)并将其与其他字节组合，以从缓存中读取值。

```solidity
        uint _key = (uint256(_firstByte & 0x0F) << (8*_extraBytes)) +
            _calldataVal(_fromByte+1, _extraBytes);

        return (_fromByte+_extraBytes+1, cacheRead(_key));

    }  // _readParam


    // 读取 n 个参数（函数知道它们期望多少个参数）
    function _readParams(uint _paramNum) internal returns (uint[] memory) {
```

我们可以从调用数据本身获取参数的数量，但调用我们的函数知道它们期望多少个参数。让它们告诉我们会更容易。

```solidity
        // 我们读取的参数
        uint[] memory params = new uint[](_paramNum);

        // 参数从第 4 个字节开始，在此之前是函数签名
        uint _atByte = 4;

        for(uint i=0; i<_paramNum; i++) {
            (_atByte, params[i]) = _readParam(_atByte);
        }
```

读取参数，直到达到所需的数量。如果我们超出了调用数据的末尾，`_readParams` 将回退调用。

```solidity

        return(params);
    }   // readParams

    // 为了测试 _readParams，测试读取四个参数
    function fourParam() public
        returns (uint256,uint256,uint256,uint256)
    {
        uint[] memory params;
        params = _readParams(4);
        return (params[0], params[1], params[2], params[3]);
    }    // fourParam
```

Foundry 的一大优势是它允许用 Solidity 编写测试（[请参阅下面的“测试缓存”](#testing-the-cache)）。这使得单元测试变得容易得多。这是一个读取四个参数并返回它们的函数，以便测试可以验证它们是否正确。

```solidity
    // 获取一个值，返回将对其进行编码的字节（如果可能，使用缓存）
    function encodeVal(uint _val) public view returns(bytes memory) {
```

`encodeVal` 是链下代码调用的一个函数，用于帮助创建使用缓存的调用数据。它接收单个值并返回对其进行编码的字节。此函数是一个 `view` 函数，因此它不需要交易，并且在外部调用时不消耗任何 Gas。

```solidity
        uint _key = val2key[_val];

        // 该值尚不在缓存中，添加它
        if (_key == 0)
            return bytes.concat(INTO_CACHE, bytes32(_val));
```

在 [EVM](/developers/docs/evm/) 中，所有未初始化的存储都被假定为零。因此，如果我们查找不存在的值的密钥，我们将得到零。在这种情况下，对其进行编码的字节是 `INTO_CACHE`（以便下次将其缓存），后跟实际值。

```solidity
        // 如果密钥 <0x10，则将其作为单字节返回
        if (_key < 0x10)
            return bytes.concat(bytes1(uint8(_key)));
```

单字节是最简单的。我们只需使用 [`bytes.concat`](https://docs.soliditylang.org/en/v0.8.16/types.html#the-functions-bytes-concat-and-string-concat) 将 `bytes<n>` 类型转换为任意长度的字节数组。尽管名字如此，但当只提供一个参数时，它也能正常工作。

```solidity
        // 双字节值，编码为 0x1vvv
        if (_key < 0x1000)
            return bytes.concat(bytes2(uint16(_key) | 0x1000));
```

当我们有一个小于 16<sup>3</sup> 的密钥时，我们可以用两个字节来表示它。我们首先将 256 位的值 `_key` 转换为 16 位的值，并使用逻辑或将额外字节的数量添加到第一个字节中。然后我们只需将其转换为 `bytes2` 值，该值可以转换为 `bytes`。

```solidity
        // 可能有一种巧妙的方法将以下几行作为循环执行，
        // 但这是一个 view 函数，因此我正在针对程序员的时间和
        // 简单性进行优化。

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

其他值（3 字节、4 字节等）的处理方式相同，只是字段大小不同。

```solidity
        // 如果我们到达这里，说明出了问题。
        revert("Error in encodeVal, should not happen");
```

如果我们到达这里，这意味着我们得到了一个不小于 16\*256<sup>15</sup> 的密钥。但是 `cacheWrite` 限制了密钥，所以我们甚至无法达到 14\*256<sup>16</sup>（它的第一个字节将是 0xFE，所以它看起来像 `DONT_CACHE`）。但是添加一个测试以防未来的程序员引入错误，并不会花费我们太多成本。

```solidity
    } // encodeVal

}  // Cache
```

### 测试缓存 {#testing-the-cache}

Foundry 的优势之一是[它允许你用 Solidity 编写测试](https://getfoundry.sh/forge/tests/overview/)，这使得编写单元测试变得更加容易。`Cache` 类的测试在[这里](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/Cache.t.sol)。由于测试代码通常是重复的，本文仅解释有趣的部分。

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";


// 需要运行 `forge test -vv` 以查看控制台输出。
import "forge-std/console.sol";
```

这只是使用测试包和 `console.log` 所必需的样板代码。

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

`setUp` 函数在每次测试之前被调用。在这种情况下，我们只需创建一个新缓存，这样我们的测试就不会相互影响。

```solidity
    function testCaching() public {
```

测试是名称以 `test` 开头的函数。此函数检查基本的缓存功能，即写入值并再次读取它们。

```solidity
        for(uint i=1; i<5000; i++) {
            cache.cacheWrite(i*i);
        }

        for(uint i=1; i<5000; i++) {
            assertEq(cache.cacheRead(i), i*i);
```

这就是你使用 [`assert...` 函数](https://getfoundry.sh/reference/forge-std/std-assertions/)进行实际测试的方式。在这种情况下，我们检查写入的值是否是我们读取的值。我们可以丢弃 `cache.cacheWrite` 的结果，因为我们知道缓存密钥是线性分配的。

```solidity
        }
    }    // testCaching


    // 多次缓存相同的值，确保密钥保持
    // 不变
    function testRepeatCaching() public {
        for(uint i=1; i<100; i++) {
            uint _key1 = cache.cacheWrite(i);
            uint _key2 = cache.cacheWrite(i);
            assertEq(_key1, _key2);
        }
```

首先，我们将每个值两次写入缓存，并确保密钥相同（这意味着第二次写入并没有真正发生）。

```solidity
        for(uint i=1; i<100; i+=3) {
            uint _key = cache.cacheWrite(i);
            assertEq(_key, i);
        }
    }    // testRepeatCaching
```

理论上，可能存在一个不影响连续缓存写入的错误。因此，在这里我们进行一些不连续的写入，并查看这些值是否仍然没有被重写。

```solidity
    // 从内存缓冲区读取一个 uint（以确保我们取回了
    // 发送出去的参数）
    function toUint256(bytes memory _bytes, uint256 _start) internal pure
        returns (uint256)
```

从 `bytes memory` 缓冲区读取一个 256 位的字。这个实用函数让我们能够验证在运行使用缓存的函数调用时是否收到了正确的结果。

```solidity
    {
        require(_bytes.length >= _start + 32, "toUint256_outOfBounds");
        uint256 tempUint;

        assembly {
            tempUint := mload(add(add(_bytes, 0x20), _start))
        }
```

Yul 不支持 `uint256` 之外的数据结构，因此当你引用更复杂的数据结构（例如内存缓冲区 `_bytes`）时，你将获得该结构的地址。Solidity 将 `bytes memory` 值存储为一个包含长度的 32 字节字，后跟实际字节，因此要获取第 `_start` 个字节，我们需要计算 `_bytes+32+_start`。

```solidity

        return tempUint;
    }     // toUint256

    // fourParams() 的函数签名，由以下网址提供：
    // https://www.4byte.directory/signatures/?bytes4_signature=0x3edc1e6d
    bytes4 constant FOUR_PARAMS = 0x3edc1e6d;

    // 只是一些常量值，以查看我们是否取回了正确的值
    uint256 constant VAL_A = 0xDEAD60A7;
    uint256 constant VAL_B =     0xBEEF;
    uint256 constant VAL_C =     0x600D;
    uint256 constant VAL_D = 0x600D60A7;
```

我们测试所需的一些常量。

```solidity
    function testReadParam() public {
```

调用 `fourParams()`（一个使用 `readParams` 的函数），以测试我们是否可以正确读取参数。

```solidity
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;
```

我们不能使用正常的 ABI 机制来调用使用缓存的函数，因此我们需要使用低级 [`<address>.call()`](https://docs.soliditylang.org/en/v0.8.16/types.html#members-of-addresses) 机制。该机制将 `bytes memory` 作为输入，并将其（以及一个布尔值）作为输出返回。

```solidity
        // 第一次调用，缓存为空
        _callInput = bytes.concat(
            FOUR_PARAMS,
```

同一个合约同时支持缓存函数（用于直接来自交易的调用）和非缓存函数（用于来自其他智能合约的调用）是很有用的。为此，我们需要继续依赖 Solidity 机制来调用正确的函数，而不是将所有内容都放在[一个 `fallback` 函数](https://docs.soliditylang.org/en/v0.8.16/contracts.html#fallback-function)中。这样做使可组合性变得容易得多。在大多数情况下，一个字节就足以识别该函数，因此我们浪费了三个字节（16\*3=48 Gas）。然而，在我写这篇文章时，这 48 Gas 的成本为 0.07 美分，对于更简单、更不容易出错的代码来说，这是一个合理的成本。

```solidity
            // 第一个值，将其添加到缓存中
            cache.INTO_CACHE(),
            bytes32(VAL_A),
```

第一个值：一个标志，表示它是一个需要写入缓存的完整值，后跟该值的 32 个字节。其他三个值类似，除了 `VAL_B` 不写入缓存，并且 `VAL_C` 既是第三个参数也是第四个参数。

```solidity
             .
             .
             .
        );
        (_success, _callOutput) = _cacheAddr.call(_callInput);
```

这就是我们实际调用 `Cache` 合约的地方。

```solidity
        assertEq(_success, true);
```

我们期望调用成功。

```solidity
        assertEq(cache.cacheRead(1), VAL_A);
        assertEq(cache.cacheRead(2), VAL_C);
```

我们从一个空缓存开始，然后添加 `VAL_A`，接着是 `VAL_C`。我们期望第一个的密钥为 1，第二个的密钥为 2。

```
assertEq(toUint256(_callOutput,0), VAL_A);
        assertEq(toUint256(_callOutput,32), VAL_B);
        assertEq(toUint256(_callOutput,64), VAL_C);
        assertEq(toUint256(_callOutput,96), VAL_C);
```

输出是四个参数。在这里我们验证它是正确的。

```solidity
        // 第二次调用，我们可以使用缓存
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // 缓存中的第一个值
            bytes1(0x01),
```

低于 16 的缓存密钥只有一个字节。

```solidity
            // 第二个值，不要将其添加到缓存中
            cache.DONT_CACHE(),
            bytes32(VAL_B),

            // 第三个和第四个值，相同的值
            bytes1(0x02),
            bytes1(0x02)
        );
        .
        .
        .
    }   // testReadParam
```

调用后的测试与第一次调用后的测试相同。

```solidity
    function testEncodeVal() public {
```

此函数类似于 `testReadParam`，不同之处在于我们使用 `encodeVal()` 而不是显式写入参数。

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

`testEncodeVal()` 中唯一的附加测试是验证 `_callInput` 的长度是否正确。对于第一次调用，它是 4+33\*4。对于第二次调用（每个值都已在缓存中），它是 4+1\*4。

```solidity
    // 测试当密钥超过单个字节时的 encodeVal
    // 最多三个字节，因为将缓存填满到四个字节需要
    // 太长时间。
    function testEncodeValBig() public {
        // 将一些值放入缓存中。
        // 为了保持简单，对值 n 使用密钥 n。
        for(uint i=1; i<0x1FFF; i++) {
            cache.cacheWrite(i);
        }
```

上面的 `testEncodeVal` 函数仅将四个值写入缓存，因此[处理多字节值的函数部分](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol#L144-L171)未被检查。但该代码很复杂且容易出错。

此函数的第一部分是一个循环，它将从 1 到 0x1FFF 的所有值按顺序写入缓存，因此我们将能够对这些值进行编码并知道它们的去向。

```solidity
        .
        .
        .

        _callInput = bytes.concat(
            FOUR_PARAMS,
            cache.encodeVal(0x000F),   // 单字节        0x0F
            cache.encodeVal(0x0010),   // 双字节     0x1010
            cache.encodeVal(0x0100),   // 双字节     0x1100
            cache.encodeVal(0x1000)    // 三字节 0x201000
        );
```

测试单字节、双字节和三字节的值。我们不测试超出此范围的值，因为写入足够的堆栈条目（至少 0x10000000，大约 2.5 亿个）需要太长时间。

```solidity
        .
        .
        .
        .
    }    // testEncodeValBig


    // 测试使用过小的缓冲区时我们会得到回退
    function testShortCalldata() public {
```

测试在没有足够参数的异常情况下会发生什么。

```solidity
        .
        .
        .
        (_success, _callOutput) = _cacheAddr.call(_callInput);
        assertEq(_success, false);
    }   // testShortCalldata
```

由于它会回退，我们应该得到的结果是 `false`。

```
// 使用不存在的缓存密钥进行调用
    function testNoCacheKey() public {
        .
        .
        .
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // 第一个值，将其添加到缓存中
            cache.INTO_CACHE(),
            bytes32(VAL_A),

            // 第二个值
            bytes1(0x0F),
            bytes2(0x1234),
            bytes11(0xA10102030405060708090A)
        );
```

此函数获得了四个完全合法的参数，只是缓存为空，因此没有可读取的值。

```solidity
        .
        .
        .
    // 测试使用过长的缓冲区时一切正常工作
    function testLongCalldata() public {
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;

        // 第一次调用，缓存为空
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // 第一个值，将其添加到缓存中
            cache.INTO_CACHE(), bytes32(VAL_A),

            // 第二个值，将其添加到缓存中
            cache.INTO_CACHE(), bytes32(VAL_B),

            // 第三个值，将其添加到缓存中
            cache.INTO_CACHE(), bytes32(VAL_C),

            // 第四个值，将其添加到缓存中
            cache.INTO_CACHE(), bytes32(VAL_D),

            // 再加一个值以求“好运”
            bytes4(0x31112233)
        );
```

此函数发送五个值。我们知道第五个值被忽略了，因为它不是有效的缓存条目，如果未包含它，将会导致回退。

```solidity
        (_success, _callOutput) = _cacheAddr.call(_callInput);
        assertEq(_success, true);
        .
        .
        .
    }   // testLongCalldata

}        // CacheTest

```

## 示例应用 {#a-sample-app}

用 Solidity 编写测试固然很好，但归根结底，去中心化应用 (dapp) 需要能够处理来自链外的请求才能发挥作用。本文演示了如何在带有 `WORM`（代表“一次写入，多次读取”）的去中心化应用 (dapp) 中使用缓存。如果密钥尚未写入，你可以向其写入一个值。如果密钥已经写入，你将得到一个回退。

### 合约 {#the-contract}

[这是合约](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/WORM.sol)。它主要重复了我们已经对 `Cache` 和 `CacheTest` 所做的工作，因此我们只介绍有趣的部分。

```solidity
import "./Cache.sol";

contract WORM is Cache {
```

使用 `Cache` 最简单的方法是在我们自己的合约中继承它。

```solidity
    function writeEntryCached() external {
        uint[] memory params = _readParams(2);
        writeEntry(params[0], params[1]);
    }    // writeEntryCached
```

此函数类似于上面 `CacheTest` 中的 `fourParam`。因为我们不遵循 ABI 规范，所以最好不要在函数中声明任何参数。

```solidity
    // 使调用我们更容易
    // writeEntryCached() 的函数签名，由以下网址提供：
    // https://www.4byte.directory/signatures/?bytes4_signature=0xe4e4f2d3
    bytes4 constant public WRITE_ENTRY_CACHED = 0xe4e4f2d3;
```

调用 `writeEntryCached` 的外部代码将需要手动构建调用数据，而不是使用 `worm.writeEntryCached`，因为我们不遵循 ABI 规范。拥有这个常量值只是为了更容易编写它。

请注意，即使我们将 `WRITE_ENTRY_CACHED` 定义为状态变量，要在外部读取它，也必须使用它的 getter 函数 `worm.WRITE_ENTRY_CACHED()`。

```solidity
    function readEntry(uint key) public view
        returns (uint _value, address _writtenBy, uint _writtenAtBlock)
```

读取函数是一个 `view` 函数，因此它不需要交易，也不消耗 Gas。因此，对参数使用缓存没有任何好处。对于视图函数，最好使用更简单的标准机制。

### 测试代码 {#the-testing-code}

[这是合约的测试代码](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/WORM.t.sol)。同样，我们只看有趣的部分。

```solidity
    function testWReadWrite() public {
        worm.writeEntry(0xDEAD, 0x60A7);

        vm.expectRevert(bytes("entry already written"));
        worm.writeEntry(0xDEAD, 0xBEEF);
```

[这（`vm.expectRevert`）](https://book.getfoundry.sh/cheatcodes/expect-revert#expectrevert)是我们如何在 Foundry 测试中指定下一次调用应该失败，以及报告的失败原因。这适用于我们使用语法 `<contract>.<function name>()` 而不是构建调用数据并使用低级接口（`<contract>.call()` 等）调用合约的情况。

```solidity
    function testReadWriteCached() public {
        uint cacheGoat = worm.cacheWrite(0x60A7);
```

在这里，我们利用了 `cacheWrite` 返回缓存密钥这一事实。这不是我们期望在生产环境中使用的东西，因为 `cacheWrite` 会改变状态，因此只能在交易期间调用。交易没有返回值，如果它们有结果，这些结果应该作为事件发出。因此，`cacheWrite` 的返回值只能从链上代码访问，而链上代码不需要参数缓存。

```solidity
        (_success,) = address(worm).call(_callInput);
```

这就是我们告诉 Solidity 的方式：虽然 `<contract address>.call()` 有两个返回值，但我们只关心第一个。

```solidity
        (_success,) = address(worm).call(_callInput);
        assertEq(_success, false);
```

由于我们使用低级 `<address>.call()` 函数，我们不能使用 `vm.expectRevert()`，而必须查看从调用中获得的布尔成功值。

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

这就是我们在 Foundry 中验证代码是否[正确发出事件](https://getfoundry.sh/reference/cheatcodes/expect-emit/)的方式。

### 客户端 {#the-client}

Solidity 测试无法提供的一点是，你可以剪切并粘贴到自己应用程序中的 JavaScript 代码。为了编写该代码，我将 WORM 部署到了 [Optimism Goerli](https://community.optimism.io/docs/useful-tools/networks/#optimism-goerli)（[Optimism](https://www.optimism.io/) 的新测试网）。它的地址是 [`0xd34335b1d818cee54e3323d3246bd31d94e6a78a`](https://goerli-optimism.etherscan.io/address/0xd34335b1d818cee54e3323d3246bd31d94e6a78a)。

[你可以在这里查看客户端的 JavaScript 代码](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/javascript/index.js)。要使用它：

1. 克隆 git 仓库：

   ```sh
   git clone https://github.com/qbzzt/20220915-all-you-can-cache.git
   ```

2. 安装必要的包：

   ```sh
   cd javascript
   yarn
   ```

3. 复制配置文件：

   ```sh
   cp .env.example .env
   ```

4. 根据你的配置编辑 `.env`：

   | 参数 | 值 |
   | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | MNEMONIC | 拥有足够 ETH 支付交易费用的账户助记词。[你可以在这里获取 Optimism Goerli 网络的免费 ETH](https://optimismfaucet.xyz/)。 |
   | OPTIMISM_GOERLI_URL | Optimism Goerli 的 URL。公共端点 `https://goerli.optimism.io` 有速率限制，但足以满足我们在此处的需求。 |

5. 运行 `index.js`。

   ```sh
   node index.js
   ```

   此示例应用程序首先向 WORM 写入一个条目，显示调用数据以及 Etherscan 上的交易链接。然后它读回该条目，并显示它使用的密钥以及条目中的值（值、区块号和作者）。

客户端的大部分代码是普通的去中心化应用 (dapp) JavaScript。因此，我们再次只讨论有趣的部分。

```javascript
.
.
.
const main = async () => {
    const func = await worm.WRITE_ENTRY_CACHED()

    // 每次都需要一个新的密钥
    const key = await worm.encodeVal(Number(new Date()))
```

给定的时隙只能写入一次，因此我们使用时间戳来确保不会重复使用时隙。

```javascript
const val = await worm.encodeVal("0x600D")

// 写入一个条目
const calldata = func + key.slice(2) + val.slice(2)
```

Ethers 期望调用数据是一个十六进制字符串，即 `0x` 后跟偶数个十六进制数字。由于 `key` 和 `val` 都以 `0x` 开头，我们需要删除这些标头。

```javascript
const tx = await worm.populateTransaction.writeEntryCached()
tx.data = calldata

sentTx = await wallet.sendTransaction(tx)
```

与 Solidity 测试代码一样，我们无法正常调用缓存函数。相反，我们需要使用更低级的机制。

```javascript
    .
    .
    .
    // 读取刚刚写入的条目
    const realKey = '0x' + key.slice(4)  // 移除 FF 标志
    const entryRead = await worm.readEntry(realKey)
    .
    .
    .
```

对于读取条目，我们可以使用正常机制。不需要对 `view` 函数使用参数缓存。

## 结论 {#conclusion}

本文中的代码是一个概念验证，目的是让这个想法易于理解。对于生产就绪的系统，你可能需要实现一些附加功能：

- 处理非 `uint256` 的值。例如，字符串。
- 也许可以在用户和缓存之间建立映射，而不是使用全局缓存。不同的用户使用不同的值。
- 用于地址的值与用于其他目的的值不同。为地址单独设置一个缓存可能是有意义的。
- 目前，缓存密钥采用“先到先得，密钥最小”的算法。前 16 个值可以作为单字节发送。接下来的 4080 个值可以作为双字节发送。接下来的大约一百万个值是三字节，依此类推。生产系统应该在缓存条目上保留使用计数器并重新组织它们，以便 16 个_最常见_的值是一个字节，接下来的 4080 个最常见的值是两个字节，依此类推。

  然而，这是一个潜在的危险操作。想象一下以下事件序列：

  1. Noam Naive 调用 `encodeVal` 来编码他想要发送代币的地址。该地址是应用程序上最早使用的地址之一，因此编码值为 0x06。这是一个 `view` 函数，而不是一笔交易，因此它只发生在 Noam 和他使用的节点之间，没有其他人知道

  2. Owen Owner 运行缓存重排序操作。实际上很少有人使用该地址，因此它现在被编码为 0x201122。另一个不同的值 10<sup>18</sup> 被分配为 0x06。

  3. Noam Naive 将他的代币发送到 0x06。它们进入了地址 `0x0000000000000000000000000de0b6b3a7640000`，由于没有人知道该地址的私钥，它们就被困在那里了。Noam _很不高兴_。

  有多种方法可以解决这个问题，以及在缓存重排序期间内存池中交易的相关问题，但你必须意识到这一点。

我在这里用 Optimism 演示了缓存，因为我是 Optimism 的员工，这是我最了解的 Rollup。但它应该适用于任何对内部处理收取极低成本的 Rollup，相比之下，将交易数据写入一层网络 (l1) 才是主要开销。

[点击此处查看我的更多作品](https://cryptodocguy.pro/)。