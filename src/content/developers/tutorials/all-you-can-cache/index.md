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
