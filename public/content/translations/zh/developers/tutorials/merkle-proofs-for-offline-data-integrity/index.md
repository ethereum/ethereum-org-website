---
title: "离线数据完整性的默克尔证明"
description: "确保主要存储在链下的数据的链上数据完整性"
author: "奥里·波梅兰茨"
tags:
  - 存储
skill: advanced
breadcrumb: "默克尔证明"
lang: zh
published: 2021-12-30
---

## 简介 {#introduction}

理想情况下，我们希望将所有内容都存储在以太坊存储中，这些数据分布在数千台计算机上，具有极高的可用性（数据无法被审查）和完整性（数据无法被未经授权地修改），但存储一个 32 字节的字通常需要花费 20,000 Gas。在我撰写本文时，该成本相当于 6.60 美元。每字节 21 美分的价格对于许多用途来说太昂贵了。

为了解决这个问题，以太坊生态系统开发了[许多以去中心化方式存储数据的替代方法](/developers/docs/storage/)。通常，它们涉及在可用性和价格之间进行权衡。然而，完整性通常是有保证的。

在本文中，你将学习**如何**使用[默克尔证明](https://computersciencewiki.org/index.php/Merkle_proof)在不将数据存储在区块链上的情况下确保数据完整性。

## 它是如何工作的？ {#how-does-it-work}

理论上，我们可以只在链上存储数据的哈希，并在需要它的交易中发送所有数据。然而，这仍然太昂贵了。交易中的一个字节数据大约需要 16 Gas，目前大约是半美分，或者每千字节约 5 美元。以每兆字节 5000 美元的价格计算，即使不增加对数据进行哈希处理的成本，这对于许多用途来说仍然太昂贵了。

解决方案是重复对数据的不同子集进行哈希处理，因此对于不需要发送的数据，你只需发送一个哈希即可。你可以使用默克尔树来实现这一点，这是一种树形数据结构，其中每个节点都是其下方节点的哈希：

![Merkle Tree](tree.png)

根哈希是唯一需要存储在链上的部分。为了证明某个特定值，你需要提供所有需要与其结合以获得根的哈希。例如，为了证明 `C`，你需要提供 `D`、`H(A-B)` 和 `H(E-H)`。

![Proof of the value of C](proof-c.png)

## 实现 {#implementation}

[此处提供了示例代码](https://github.com/qbzzt/merkle-proofs-for-offline-data-integrity)。

### 链下代码 {#offchain-code}

在本文中，我们使用 JavaScript 进行链下计算。大多数去中心化应用程序的链下组件都是用 JavaScript 编写的。

#### 创建默克尔根 {#creating-the-merkle-root}

首先，我们需要向链提供默克尔根。

```javascript
const ethers = require("ethers")
```

[我们使用 ethers 包中的哈希函数](https://docs.ethers.io/v5/api/utils/hashing/#utils-keccak256)。

```javascript
// 我们必须验证其完整性的原始数据。前两个字节
// 是用户标识符，最后两个字节是
// 用户目前拥有的代币数量。
const dataArray = [
  0x0bad0010, 0x60a70020, 0xbeef0030, 0xdead0040, 0xca110050, 0x0e660060,
  0xface0070, 0xbad00080, 0x060d0091,
]
```

例如，将每个条目编码为单个 256 位整数会导致代码的可读性低于使用 JSON。然而，这意味着在合约中检索数据的处理量显著减少，从而大大降低了 Gas 成本。[你可以在链上读取 JSON](https://github.com/chrisdotn/jsmnSol)，但如果可以避免的话，这只是一个糟糕的主意。

```javascript
// 哈希值数组，格式为 BigInt
const hashArray = dataArray
```

在这种情况下，我们的数据一开始就是 256 位的值，因此不需要进行任何处理。如果我们使用更复杂的数据结构（例如字符串），我们需要确保首先对数据进行哈希处理以获得哈希数组。请注意，这也是因为我们不介意用户是否知道其他用户的信息。否则，我们将不得不进行哈希处理，以便用户 1 不会知道用户 0 的值，用户 2 不会知道用户 3 的值，依此类推。

```javascript
// 在哈希函数期望的字符串和
// 我们在其他地方使用的 BigInt 之间进行转换。
const hash = (x) =>
  BigInt(ethers.utils.keccak256("0x" + x.toString(16).padStart(64, 0)))
```

ethers 哈希函数期望获得一个带有十六进制数字的 JavaScript 字符串，例如 `0x60A7`，并响应另一个具有相同结构的字符串。然而，对于其余的代码，使用 `BigInt` 会更容易，因此我们将其转换为十六进制字符串，然后再转换回来。

```javascript
// 一对值的对称哈希，因此我们不在乎顺序是否颠倒。
const pairHash = (a, b) => hash(hash(a) ^ hash(b))
```

这个函数是对称的（a [异或](https://en.wikipedia.org/wiki/Exclusive_or) b 的哈希）。这意味着当我们检查默克尔证明时，我们不需要担心是将证明中的值放在计算值之前还是之后。默克尔证明检查是在链上完成的，因此我们在那里需要做的事情越少越好。

警告：
密码学比看起来要难。
本文的初始版本使用了哈希函数 `hash(a^b)`。
这是一个**糟糕**的主意，因为这意味着如果你知道 `a` 和 `b` 的合法值，你就可以使用 `b' = a^b^a'` 来证明任何想要的 `a'` 值。
使用这个函数，你必须计算 `b'` 使得 `hash(a') ^ hash(b')` 等于一个已知值（通向根的下一个分支），这要困难得多。

```javascript
// 用来表示某个分支为空、没有
// 值的数值
const empty = 0n
```

当值的数量不是 2 的整数次幂时，我们需要处理空分支。该程序处理它的方式是将零作为占位符。

![Merkle tree with branches missing](merkle-empty-hash.png)

```javascript
// 通过对以下各项进行哈希处理，计算哈希数组在树中的上一层：
// 按顺序的每一对
const oneLevelUp = (inputArray) => {
  var result = []
  var inp = [...inputArray] // 为了避免覆盖输入 // 如有必要，添加一个空值（我们需要所有的叶子节点都是 // 成对的）

  if (inp.length % 2 === 1) inp.push(empty)

  for (var i = 0; i < inp.length; i += 2)
    result.push(pairHash(inp[i], inp[i + 1]))

  return result
} // oneLevelUp
```

此函数通过对当前层的成对值进行哈希处理，在默克尔树中“向上爬”一层。请注意，这不是最有效的实现，我们本可以避免复制输入，只需在循环中适当时添加 `hashEmpty`，但此代码是为了可读性而优化的。

```javascript
const getMerkleRoot = (inputArray) => {
  var result

  result = [...inputArray] // 向上爬升树，直到只有一个值，即 // 根。 // // 如果某一层有奇数个条目，// oneLevelUp 中的代码会添加一个空值，因此，例如，如果我们有 // 10 个叶子节点，我们在第二层将有 5 个分支，在第三层有 3 个 // 分支，在第四层有 2 个，而根是第五层

  while (result.length > 1) result = oneLevelUp(result)

  return result[0]
}
```

要获得根，请一直向上爬，直到只剩下一个值。

#### 创建默克尔证明 {#creating-a-merkle-proof}

默克尔证明是将要与被证明的值一起进行哈希处理以重新获得默克尔根的那些值。要证明的值通常可以从其他数据中获得，因此我更喜欢单独提供它，而不是作为代码的一部分。

```javascript
// 默克尔证明由要进行
// 哈希处理的条目列表的值组成。因为我们使用对称的哈希函数，所以我们不
// 需要项目的位置来验证证明，仅在创建证明时需要
const getMerkleProof = (inputArray, n) => {
    var result = [], currentLayer = [...inputArray], currentN = n

    // 直到我们到达顶部
    while (currentLayer.length > 1) {
        // 没有奇数长度的层
        if (currentLayer.length % 2)
            currentLayer.push(empty)

        result.push(currentN % 2
               // 如果 currentN 是奇数，则将其前面的值添加到证明中
            ? currentLayer[currentN-1]
               // 如果它是偶数，则添加它后面的值
            : currentLayer[currentN+1])

```

我们对 `(v[0],v[1])`、`(v[2],v[3])` 等进行哈希处理。因此，对于偶数值，我们需要下一个值，对于奇数值，我们需要上一个值。

```javascript
        // 移动到上一层
        currentN = Math.floor(currentN/2)
        currentLayer = oneLevelUp(currentLayer)
    }   // while currentLayer.length > 1

    return result
}   // getMerkleProof
```

### 链上代码 {#onchain-code}

最后，我们有检查证明的代码。链上代码是用 [Solidity](https://docs.soliditylang.org/en/v0.8.11/) 编写的。在这里，优化要重要得多，因为 Gas 相对昂贵。

```solidity
//SPDX-License-Identifier: Public Domain
pragma solidity ^0.8.0;

import "hardhat/console.sol";
```

我使用 [Hardhat 开发环境](https://hardhat.org/)编写了此代码，这使我们能够在开发时[从 Solidity 获得控制台输出](https://hardhat.org/docs/cookbook/debug-logs)。

```solidity

contract MerkleProof {
    uint merkleRoot;

    function getRoot() public view returns (uint) {
      return merkleRoot;
    }

    // 极其不安全，在生产代码中对
    // 此函数的访问必须受到严格限制，可能仅限于
    // 所有者
    function setRoot(uint _merkleRoot) external {
      merkleRoot = _merkleRoot;
    }   // setRoot
```

默克尔根的设置和获取函数。在生产系统中，让每个人都能更新默克尔根是一个_极其糟糕的主意_。我在这里这样做是为了简化示例代码。**不要在数据完整性真正重要的系统上这样做**。

```solidity
    function hash(uint _a) internal pure returns(uint) {
      return uint(keccak256(abi.encode(_a)));
    }

    function pairHash(uint _a, uint _b) internal pure returns(uint) {
      return hash(hash(_a) ^ hash(_b));
    }
```

此函数生成一对哈希。它只是 `hash` 和 `pairHash` 的 JavaScript 代码的 Solidity 翻译。

**注意：** 这是另一个为了可读性而优化的例子。根据[函数定义](https://www.tutorialspoint.com/solidity/solidity_cryptographic_functions.htm)，可能可以将数据存储为 [`bytes32`](https://docs.soliditylang.org/en/v0.5.3/types.html#fixed-size-byte-arrays) 值并避免转换。

```solidity
    // 验证默克尔证明
    function verifyProof(uint _value, uint[] calldata _proof)
        public view returns (bool) {
      uint temp = _value;
      uint i;

      for(i=0; i<_proof.length; i++) {
        temp = pairHash(temp, _proof[i]);
      }

      return temp == merkleRoot;
    }

}  // MarkleProof
```

在数学符号中，默克尔证明验证如下所示：`H(proof_n, H(proof_n-1, H(proof_n-2, ... H(proof_1, H(proof_0, value))...)))`。此代码实现了它。

## 默克尔证明和汇总不能混用 {#merkle-proofs-and-rollups}

默克尔证明与[汇总](/developers/docs/scaling/#rollups)配合得不好。原因是汇总将所有交易数据写入一层网络 (l1)，但在二层网络 (l2) 上进行处理。在交易中发送默克尔证明的成本平均为每层 638 Gas（目前，调用数据中的一个字节如果不为零则花费 16 Gas，如果为零则花费 4 Gas）。如果我们有 1024 个字的数据，默克尔证明需要十层，或者总共 6380 Gas。

以 [Optimism](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m) 为例，写入一层网络 (l1) 的 Gas 成本约为 100 Gwei，而二层网络 (l2) 的 Gas 成本为 0.001 Gwei（这是正常价格，可能会随着网络拥堵而上涨）。因此，以一个一层网络 (l1) Gas 的成本，我们可以在二层网络 (l2) 处理上花费十万 Gas。假设我们不覆盖存储，这意味着我们可以以一个一层网络 (l1) Gas 的价格在二层网络 (l2) 上将大约五个字写入存储。对于单个默克尔证明，我们可以将整个 1024 个字写入存储（假设它们一开始就可以在链上计算，而不是在交易中提供），并且仍然剩下大部分 Gas。

## 结论 {#conclusion}

在现实生活中，你可能永远不会自己实现默克尔树。有众所周知且经过审计的库可供你使用，一般来说，最好不要自己实现密码学原语。但我希望现在你能更好地理解默克尔证明，并能决定何时值得使用它们。

请注意，虽然默克尔证明保留了_完整性_，但它们并不保留_可用性_。如果数据存储决定不允许访问，并且你也无法构建默克尔树来访问它们，那么知道没有其他人可以拿走你的资产也只是微小的安慰。因此，默克尔树最好与某种去中心化存储（例如 IPFS）结合使用。

[点击此处查看我的更多作品](https://cryptodocguy.pro/)。