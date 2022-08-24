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

## Overall design {#overall-design}

For the sake of simplicity we'll assume all transaction parameters are `uint256`, 32 bytes long. When we receive a transaction, we'll parse each parameter like this:

1. If the first byte is `0xFF`, take the next 32 bytes as a parameter value and write it to the cache.

2. If the first byte is `0xFE`, take the next 32 bytes as a parameter value but do *not* write it to the cache. 

3. For any other value, take the top four bits as the number of additional bytes, and the bottom four bits as the most significant bits of the cache key. Here are some examples for clarity:

   | Bytes in calldata | Cache key |
   | :---------------- | --------: |
   | 0x04              | 0x04      |
   | 0x1010            | 0x10      |
   | 0x12,0xAC         | 0x02AC    |
   | 0x2D,0xEA, 0xD6   | 0x0DEAD6  |



## Conclusion {#conclusion}

The code in this article is a proof of concept. For a fully 