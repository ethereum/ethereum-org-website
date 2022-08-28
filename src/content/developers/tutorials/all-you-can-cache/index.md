---
title: "All you can cache"
description: Learn how to create and use a caching contract for cheaper rollup transactions
author: Ori Pomerantz
sidebar: true
tags: ["layer-2", "caching", "storage"]
skill: intermediate
published: 2022-09-15
lang: en
---

When using rollups the cost of a byte in the transaction is a lot more expensive than the cost of a storage slot. Therefore, it makes sense to cache as much information as possible on chain.

In this article the developer learns how to create and use a caching contract in such a way that any parameter value that is likely to be used multiple times will be cached and available for use (after the first time) with a much smaller number of bytes, and how to write off chain code that uses this cache.

If you want to skip the article and just see the source code, [it is here](https://github.com/qbzzt/20220915-all-you-can-cache). The development stack is [Foundry](https://book.getfoundry.sh/getting-started/installation).

## Overall design {#overall-design}

For the sake of simplicity we'll assume all transaction parameters are `uint256`, 32 bytes long. When we receive a transaction, we'll parse each parameter like this:

1. If the first byte is `0xFF`, take the next 32 bytes as a parameter value and write it to the cache.

2. If the first byte is `0xFE`, take the next 32 bytes as a parameter value but do *not* write it to the cache. 

3. For any other value, take the top four bits as the number of additional bytes, and the bottom four bits as the most significant bits of the cache key. Here are some examples:

   | Bytes in calldata | Cache key |
   | :---------------- | --------: |
   | 0x0F              | 0x0F      |
   | 0x10,0x10         | 0x10      |
   | 0x12,0xAC         | 0x02AC    |
   | 0x2D,0xEA, 0xD6   | 0x0DEAD6  |


## Cache manipulation {#cache-manipulation}

The cache is implemented in [`Cache.sol`](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol). Let's go over it line by line.

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;


contract Cache {

    bytes1 public constant INTO_CACHE = 0xFF;
    bytes1 public constant DONT_CACHE = 0xFE;
```

These constants are used to interpret the special cases where we provide all the information and either want it written into the cache or not. Writing into the cache requires two [`SSTORE`](https://www.evm.codes/#55) operations into previously unused storage slots at a cost of 22100 gas each, so we make it optional.

```solidity

    mapping(uint => uint) public val2key;
```    

A [mapping](https://www.geeksforgeeks.org/solidity-mappings/) between the values and their keys. This information is necessary to encode values before you send out the transaction.

```solidity
    // Location n has the value for key n+1, because we need to preserve
    // zero as "not in the cache".
    uint[] public key2val;
```

We can use an array for the mapping from keys to values because we assign the keys, and for simplicity we do it sequentially.

```solidity
    function cacheRead(uint _key) public view returns (uint) {
        require(_key <= key2val.length, "Reading uninitialize cache entry");
        return key2val[_key-1];
    }  // cacheRead
```

Read a value from the cache.

```solidity
    // Write a value to the cache if it's not there already
    // Only public to enable the test to work
    function cacheWrite(uint _value) public returns (uint) {
        // If the value is already in the cache, return the current key
        if (val2key[_value] != 0) {
            return val2key[_value];
        }
```        

There is no point in putting the same value in the cache more than once. If the value is already there, just return the existing key.

```solidity
        // Since 0xFE is a special case, the largest key the cache can
        // hold is 0x0D followed by 15 0xFF's. If the cache length is already that
        // large, fail.
        //                              1 2 3 4 5 6 7 8 9 A B C D E F
        require(key2val.length+1 < 0x0DFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF,
            "cache overflow");
```

I don't think we'll ever get a cache that big (approximately 1.8*10<sup>37</sup> entries, which would require about 10<sup>27</sup> TB to store). However, I'm old enough to remember ["640kB would always be enough"](https://quoteinvestigator.com/2011/09/08/640k-enough/). This test is very cheap.

```solidity
        // Write the value using the next key
        val2key[_value] = key2val.length+1;
```

Add the reverse lookup (from the value to the key).

```solidity
        key2val.push(_value);
```

Add the forward lookup (from the key to the value). Because we assign values sequentially we can just add it after the last array value.

```solidity
        return key2val.length;
    }  // cacheWrite
```

Return the new length of `key2val`, which is the cell where the new value is stored. 

```solidity
    function _calldataVal(uint startByte, uint length)
        private pure returns (uint) 
```

This function reads a value from the calldata of arbitrary length (up to 32 bytes, the word size).

```solidity
    {
        uint _retVal;

        require(length < 0x21,
            "_calldataVal length limit is 32 bytes");
        require(length + startByte <= msg.data.length,
            "_calldataVal trying to read beyond calldatasize");
```

This function is internal, so if the rest of the code is written correctly these tests are not required. However, they don't cost much so we might as well have them.

```solidity
        assembly {         
            _retVal := calldataload(startByte)
        }
```

This code is in [Yul](https://docs.soliditylang.org/en/v0.8.16/yul.html). It reads a 32 byte value from the calldata. This works even if the calldata stops before `startByte+32` because uninitialized space in EVM is considered to be zero.

```solidity
        _retVal = _retVal >> (256-length*8);
```

We don't necessarily want a 32 byte value. This gets rid of the excess bytes. 

```solidity
        return _retVal;
    } // _calldataVal


    // Read a single parameter from the calldata, starting at _fromByte
    function _readParam(uint _fromByte) internal 
        returns (uint _nextByte, uint _parameterValue) 
    {
```

Read a single parameter from the calldata. Note that we need to return not just the value we read, but also the location of the next byte because parameters can range from 1 byte long to 33 bytes.

```solidity
        // The first byte tells us how to interpret the rest
        uint8 _firstByte;

        _firstByte = uint8(_calldataVal(_fromByte, 1));
```

Solidity tries to reduce the number of bugs by forbidding potentially dangerous [implicit type conversions](https://docs.soliditylang.org/en/v0.8.16/types.html#implicit-conversions). A downgrade, for example from 256 bits to 8 bits, needs to be explicit.

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

Take the lower [nibble](https://en.wikipedia.org/wiki/Nibble) and combine it with the other bytes to read the value from the cache.

```solidity
        uint _key = (uint256(_firstByte & 0x0F) << (8*_extraBytes)) + 
            _calldataVal(_fromByte+1, _extraBytes);

        return (_fromByte+_extraBytes+1, cacheRead(_key));

    }  // _readParam


    // Read n parameters (functions know how many parameters they expect)
    function _readParams(uint _paramNum) internal returns (uint[] memory) {
```

We could get the number of parameters we have from the calldata itself, but the functions that call us know how many parameters they expect. It's easier to let them tell us.

```solidity
        // The parameters we read
        uint[] memory params = new uint[](_paramNum);

        // Parameters start at byte 4, before that it's the function signature
        uint _atByte = 4;
s
        for(uint i=0; i<_paramNum; i++) {
            (_atByte, params[i]) = _readParam(_atByte);
        }
```

Read the parameters until you have the number you need. If we go past the end of the calldata, `_readParams` will revert the call.

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

One big advantage of Foundry is that it allows tests to be written in Solidity ([see Testing the cache below](#testing-the-cache)). This makes unit tests a lot easier. This is a function that reads four parameters and returns them so the test can verify they were correct.

```solidity
    // Get a value, return bytes that will encode it (using the cache if possible)
    function encodeVal(uint _val) public view returns(bytes memory) {
```

`encodeVal` is a function that off-chain code calls to help create calldata that uses the cache. It receives a single value and returns the bytes that encode it. This function is a `view`, so it does not require a transaction and when called externally does not cost any gas.

```solidity        
        uint _key = val2key[_val];

        // The value isn't in the cache yet, add it
        if (_key == 0)
            return bytes.concat(INTO_CACHE, bytes32(_val));
```

In the [EVM](https://ethereum.org/en/developers/docs/evm/) all uninitialized storage is assumed to be zeros. So if we look for the key for a value that isn't there, we get a zero. In that case the bytes that encode it are `INTO_CACHE` (so it will be cached next time), followed by the actual value.

```solidity
        // If the key is <0x10, return it as a single byte
        if (_key < 0x10)
            return bytes.concat(bytes1(uint8(_key)));
```        

Single bytes are the easiest. We just use [`bytes.concat`](https://docs.soliditylang.org/en/v0.8.16/types.html#the-functions-bytes-concat-and-string-concat) to turn a `bytes<n>` type into a byte array which can be any length. Despite the name, it works fine when provided with just one argument.

```solidity
        // Two byte value, encoded as 0x1vvv
        if (_key < 0x1000)
            return bytes.concat(bytes2(uint16(_key) | 0x1000));
```

When we have a key that is less than 16<sup>3</sup>, we can express it in two bytes. We first convert `_key`, which is a 256 bit value, to a 16 bit value and use logical or to add the number of extra bytes to the first byte. Then we just it into a `bytes2` value, which can be converted to `bytes`.

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

The other values (3 bytes, 4 bytes, etc.) are handled the same way, just with different field sizes.

```solidity
        // If we get here, something is wrong.
        revert("Error in encodeVal, should not happen");
```

If we get here it means we got a key that's not less than than 16\*256<sup>15</sup>. But `cacheWrite` limits the keys so we can't even get up to 14\*256<sup>16</sup> (which would have a first byte of 0xFE, so it would look like `DONT_CACHE`). But it doesn't cost us much to add a test in case a future programmer introduces a bug.

```solidity
    } // encodeVal

}  // Cache
```

### Testing the cache {#testing-the-cache}

One of the advantages of Foundry is that [it lets you write tests in Solidity](https://book.getfoundry.sh/forge/tests), which makes it easier to write unit tests. The tests for the `Cache` class are [here](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/Cache.t.sol). Because the testing code is repetitive, as tests tend to be, this article only explains the interesting parts.


```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";


// Need to run `forge test -vv` for the console.
import "forge-std/console.sol";
```

This is just boilerplate that is necessary to use the test package and `console.log`.

```solidity
import "src/Cache.sol";
```

We need to know the contract we are testing.

```solidity
contract CacheTest is Test {
    Cache cache;

    function setUp() public {
        cache = new Cache();        
    }
```

The `setUp` function is called before each test. In this case we just create a new cache, so that our tests won't affect each other.

```solidity
    function testCaching() public {
```

Tests are functions whose names start with `test`. This function checks the basic cache functionality, writing values and reading them again.

```solidity
        for(uint i=1; i<5000; i++) {
            cache.cacheWrite(i*i);
        }        

        for(uint i=1; i<5000; i++) {
            assertEq(cache.cacheRead(i), i*i);
```

This is how you do the actual testing, using [`assert...` functions](https://book.getfoundry.sh/reference/forge-std/std-assertions). In this case, we check that the value we wrote is the one we read. We can discard the result of `cache.cacheWrite` because we know that cache keys are assigned linearly.

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

First we write each value twice to the cache and make sure the keys are the same (meaning the second write didn't really happen).

```solidity
        for(uint i=1; i<100; i+=3) {
            uint _key = cache.cacheWrite(i);
            assertEq(_key, i);
        }
    }    // testRepeatCaching    
```

In theory there could be a bug that doesn't affect consecutive cache writes. So here we do some writes that aren't consecutive and see the values are still not rewritten.

```solidity
    // Read a uint from a memory buffer (to make sure we get back the parameters
    // we sent out) 
    function toUint256(bytes memory _bytes, uint256 _start) internal pure 
        returns (uint256) 
```

Read a 256 bit word from a `bytes memory` buffer. This utility function lets us verify that we receive the correct results when we run a function call that uses the cache.        

```solidity
    {
        require(_bytes.length >= _start + 32, "toUint256_outOfBounds");
        uint256 tempUint;

        assembly {
            tempUint := mload(add(add(_bytes, 0x20), _start))
        }
```

Yul does not support data structures beyond `uint256`, so when you refer to a more sophisticated data structure, such as the memory buffer `_bytes`, you get the address of that structure. Solidity stores `bytes memory` values as a 32 byte word that contains the length, followed by the actual bytes, so to get byte number `_start` we need to calculate `_bytes+32+_start`.



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

    function testReadParam() public {
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;

        // First call, the cache is empty
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // First value, add it to the cache 
            cache.INTO_CACHE(),   
            bytes32(VAL_A),

            // Second value, don't add it to the cache
            cache.DONT_CACHE(),
            bytes32(VAL_B),

            // Third and fourth values, same value
            cache.INTO_CACHE(),
            bytes32(VAL_C),
            cache.INTO_CACHE(),
            bytes32(VAL_C)
        );
        (_success, _callOutput) = _cacheAddr.call(_callInput);
        assertEq(_success, true);
        assertEq(cache.cacheRead(1), VAL_A);
        assertEq(cache.cacheRead(2), VAL_C); 
        assertEq(toUint256(_callOutput,0), VAL_A);
        assertEq(toUint256(_callOutput,32), VAL_B);
        assertEq(toUint256(_callOutput,64), VAL_C);
        assertEq(toUint256(_callOutput,96), VAL_C);

        // Second call, we can use the cache
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // First value in the Cache
            bytes1(0x01),   

            // Second value, don't add it to the cache
            cache.DONT_CACHE(),
            bytes32(VAL_B),

            // Third and fourth values, same value
            bytes1(0x02),
            bytes1(0x02)
        );
        (_success, _callOutput) = _cacheAddr.call(_callInput);
        assertEq(_success, true);
        assertEq(toUint256(_callOutput,0), VAL_A);
        assertEq(toUint256(_callOutput,32), VAL_B);
        assertEq(toUint256(_callOutput,64), VAL_C);
        assertEq(toUint256(_callOutput,96), VAL_C);

    }   // testReadParam


    function testEncodeVal() public {
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;

        // First call, the cache is empty
        // Second call, we can use the cache
        _callInput = bytes.concat(
            FOUR_PARAMS,
            cache.encodeVal(VAL_A),
            cache.encodeVal(VAL_B),
            cache.encodeVal(VAL_C),
            cache.encodeVal(VAL_D)
        );                        
        (_success, _callOutput) = _cacheAddr.call(_callInput);
        assertEq(_success, true);
        assertEq(toUint256(_callOutput,0), VAL_A);
        assertEq(toUint256(_callOutput,32), VAL_B);
        assertEq(toUint256(_callOutput,64), VAL_C);
        assertEq(toUint256(_callOutput,96), VAL_D);
        assertEq(_callInput.length, 4+33*4);

        // Second call, we can use the cache
        _callInput = bytes.concat(
            FOUR_PARAMS,
            cache.encodeVal(VAL_A),
            cache.encodeVal(VAL_B),
            cache.encodeVal(VAL_C),
            cache.encodeVal(VAL_D)
        );                        
        (_success, _callOutput) = _cacheAddr.call(_callInput);
        assertEq(_success, true);
        assertEq(toUint256(_callOutput,0), VAL_A);
        assertEq(toUint256(_callOutput,32), VAL_B);
        assertEq(toUint256(_callOutput,64), VAL_C);
        assertEq(toUint256(_callOutput,96), VAL_D);
        assertEq(_callInput.length, 4+1*4);
    }   // testEncodeVal


    // Test encodeVal when the key is more than a single byte
    // Maximum three bytes because filling the cache to four bytes takes
    // too long.
    function testEncodeValBig() public {
        // Put a number of values in the cache.
        // To keep things simnple, use key n for value n.
        for(uint i=1; i<0x1FFF; i++) {
            cache.cacheWrite(i);
        }        

        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;

        _callInput = bytes.concat(
            FOUR_PARAMS,
            cache.encodeVal(0x000F),   // One byte        0x0F
            cache.encodeVal(0x0010),   // Two bytes     0x1010
            cache.encodeVal(0x0100),   // Two bytes     0x1100
            cache.encodeVal(0x1000)    // Three bytes 0x201000 
        );    
        (_success, _callOutput) = _cacheAddr.call(_callInput);
        assertEq(_success, true);
        assertEq(toUint256(_callOutput,0),  0x000F);
        assertEq(toUint256(_callOutput,32), 0x0010);
        assertEq(toUint256(_callOutput,64), 0x0100);
        assertEq(toUint256(_callOutput,96), 0x1000);
        assertEq(_callInput.length, 4+1+2+2+3);

    }    // testEncodeValBig


    // Test what with an excessively small buffer we get a revert
    function testShortCalldata() public {
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;

        // First call, the cache is empty
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // First value, add it to the cache 
            cache.INTO_CACHE(),   
            bytes32(VAL_A),

            // Second value, don't add it to the cache
            cache.DONT_CACHE(),
            bytes32(VAL_B)

            // We should send four parameters, but we only sent two
        );
        (_success, _callOutput) = _cacheAddr.call(_callInput);
        assertEq(_success, false);
    }   // testShortCalldata


    // Call with cache keys that aren't there
    function testNoCacheKey() public {
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;

        // First call, the cache is empty
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // First value, add it to the cache 
            cache.INTO_CACHE(),   
            bytes32(VAL_A),

            // Second value
            bytes1(0x0F),
            bytes2(0x1234),
            bytes11(0xA00102030405060708090A)
        );
        (_success, _callOutput) = _cacheAddr.call(_callInput);
        assertEq(_success, false);
    }   // testNoCacheKey


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
        (_success, _callOutput) = _cacheAddr.call(_callInput);
        assertEq(_success, true);
        assertEq(toUint256(_callOutput,0),  VAL_A);
        assertEq(toUint256(_callOutput,32), VAL_B);
        assertEq(toUint256(_callOutput,64), VAL_C);
        assertEq(toUint256(_callOutput,96), VAL_D);        
    }   // testLongCalldata

}        // CacheTest

```

## A sample application {#a-sample-app}

### The contract {#the-contract}

### The client {#the-client}

## Conclusion {#conclusion}

The code in this article is a proof of concept, the purpose is to make the concepts easy to understand. For a production-ready system you might want to implement some additional functionality:

* Handle values that aren't `uint256`. For example, strings.
* Instead of a global cache, maybe have a mapping between users and caches. Different users use different values.
* Values used for addresses are distinct from those used for other purposes. It might make sense to have a separate cache just for addresses.
* Currently the cache keys are on a "first come, smallest key" algorithm. The first sixteen values can be sent as a single byte. The next 4080 values can be sent as two bytes. The next approximately million values are three bytes, etc. A production system should keep usage counters on cache entries and reorganize them so that the sixteen *most common* values are one byte, the next 4080 most common values two bytes, etc.

  However, that is a potentially dangerous operation. Imagine the following sequence of events:

  1. Noam Naive calls `encodeVal` to encode the address to which he wants to send tokens. That address is one of the first used on the application, so the encoded value is 0x06. This is a `view` function, not a transaction, so it's between Noam and the node he uses, and nobody else knows about it.

  2. Owen Owner runs the cache reoredring operation. Very few people actually use that address, so it is now encoded as 0x201122. A different value, 10<sup>18</sup>, is assigned 0x06.

  3. Noam Naive sends his tokens to 0x06. They go to the address `0x0000000000000000000000000de0b6b3a7640000`, and since nobody knows the private key for that address, they are just stuck there. Noam is *not happy*.

  There are ways to solve this problem, and the related problem of transactions that are in the mempool during the cache reorder, but you must be aware of it.