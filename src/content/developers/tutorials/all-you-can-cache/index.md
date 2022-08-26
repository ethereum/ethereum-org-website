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

Read a single parameter from the calldata. Note that we need to return not just the value we read, but also the location of the next byte because parameters can range from 1 byte long to 33 bytes (when we have a code followed by a value that isn't in the cache).

```solidity
        // The first byte tells us how to interpret the rest
        uint8 _firstByte;

        _firstByte = uint8(_calldataVal(_fromByte, 1));

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

        uint _key = (uint256(_firstByte & 0x0F) << (8*_extraBytes)) + 
            _calldataVal(_fromByte+1, _extraBytes);

        return (_fromByte+_extraBytes+1, cacheRead(_key));

    }  // _readParam


    // Read n parameters (functions know how many parameters they expect)
    function _readParams(uint _paramNum) internal returns (uint[256] memory) {
        // The parameters we read
        uint[256] memory params;

        // Parameters start at byte 4, before that it's the function signature
        uint _atByte = 4;

        require(_paramNum < 256, "Can only handle up to 256 function parameters");

        for(uint i=0; i<_paramNum; i++) {
            (_atByte, params[i]) = _readParam(_atByte);
        }

        return(params);
    }   // readParams



    // For testing _readParams, test reading four parameters
    function fourParam() public 
        returns (uint256,uint256,uint256,uint256) 
    {
        uint[256] memory params;
        params = _readParams(4);
        return (params[0], params[1], params[2], params[3]);
    }    // fourParam

    // Get a value, return bytes that will encode it (using the cache if possible)
    function encodeVal(uint _val) public view returns(bytes memory) {
        uint _key = val2key[_val];

        // The value isn't in the cache yet, add it
        if (_key == 0)
            return bytes.concat(INTO_CACHE, bytes32(_val));

        // If the key is <0x10, return it as a single byte
        if (_key < 0x10)
            return bytes.concat(bytes1(uint8(_key)));

        // Two byte value, encoded as 0x1vvv
        if (_key < 0x1000)
            return bytes.concat(bytes2(uint16(_key) | 0x1000));

        // There is probably a clever way to do the following lines as a loop,
        // but it's a view function so I'm optimizing for programmer time and
        // simplicity.

        if (_key < 16*256**2)
            return bytes.concat(bytes3(uint24(_key) | (0x2 * 16 * 256**2)));
        if (_key < 16*256**3)
            return bytes.concat(bytes4(uint32(_key) | (0x3 * 16 * 256**3)));
        if (_key < 16*256**4)
            return bytes.concat(bytes5(uint40(_key) | (0x4 * 16 * 256**4)));
        if (_key < 16*256**5)
            return bytes.concat(bytes6(uint48(_key) | (0x5 * 16 * 256**5)));
        if (_key < 16*256**6)  
            return bytes.concat(bytes7(uint56(_key) | (0x6 * 16 * 256**6))); 
        if (_key < 16*256**7)
            return bytes.concat(bytes8(uint64(_key) | (0x7 * 16 * 256**7)));                                                   
        if (_key < 16*256**8)
            return bytes.concat(bytes9(uint72(_key) | (0x8 * 16 * 256**8)));
        if (_key < 16*256**9)
            return bytes.concat(bytes10(uint80(_key) | (0x9 * 16 * 256**9)));
        if (_key < 16*256**10)
            return bytes.concat(bytes11(uint88(_key) | (0xA * 16 * 256**10)));
        if (_key < 16*256**11)
            return bytes.concat(bytes12(uint96(_key) | (0xB * 16 * 256**11)));
        if (_key < 16*256**12)  
            return bytes.concat(bytes13(uint104(_key) | (0xC * 16 * 256**12))); 
        if (_key < 16*256**13)
            return bytes.concat(bytes14(uint112(_key) | (0xD * 16 * 256**13)));
        if (_key < 16*256**14)
            return bytes.concat(bytes15(uint120(_key) | (0xE * 16 * 256**14)));
        if (_key < 16*256**15)
            return bytes.concat(bytes16(uint128(_key) | (0xF * 16 * 256**15)));

        // If we get here, something is wrong.
        revert("Error in encodeVal, should not happen");
    } // encodeVal

}  // Cache
```


## Conclusion {#conclusion}

For the sake of simplicity, the code in this article is a proof of concept. For a production-ready system you might want to implement some additional functionality:

* Handle values that aren't `uint256`. For example, strings.
* Instead of a global cache, maybe have a mapping between users and caches. Different users use different values.
* Values used for addresses are distinct from those used for other purposes. It might make sense to have a separate cache just for addresses.
* Currently the cache keys are on a "first come, smallest key" algorithm. The first sixteen values can be sent as a single byte. The next 4080 values can be sent as two bytes. The next approximately million values are three bytes, etc. A production system should keep usage counters on cache entries and reorganize them so that the sixteen *most common* values are one byte, the next 4080 most common values two bytes, etc.