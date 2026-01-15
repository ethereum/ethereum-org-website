---
title: "实现 Calldata 优化的精简 ABI"
description: 为 Optimistic Rollup 优化智能合约
author: Ori Pomerantz
lang: zh
tags: [ "二层网络" ]
skill: intermediate
published: 2022-04-01
---

## 简介 {#introduction}

在本文中，你将了解[乐观卷叠](/developers/docs/scaling/optimistic-rollups)、其上的交易成本，以及不同的成本结构如何要求我们针对不同于以太坊主网的因素进行优化。
你还将学习如何实现这种优化。

### 完全披露 {#full-disclosure}

我是 [Optimism](https://www.optimism.io/) 的全职员工，因此本文中的示例将在 Optimism 上运行。
但是，本文解释的技术应该同样适用于其他卷叠。

### 术语 {#terminology}

讨论卷叠时，术语“一层网络”(L1) 用于指代主网，即生产环境的以太坊网络。
术语“二层网络”(L2) 用于指代卷叠或任何其他依赖 L1 保证安全性但大部分处理在链下进行的系统。

## 如何进一步降低 L2 交易的成本？ {#how-can-we-further-reduce-the-cost-of-L2-transactions}

乐观卷叠必须保留每笔历史交易的记录，以便任何人都能检查这些交易并验证当前状态是否正确。
将数据输入以太坊主网的最便宜方法是将其写为 calldata。
[Optimism](https://help.optimism.io/hc/en-us/articles/4413163242779-What-is-a-rollup-) 和 [Arbitrum](https://developer.offchainlabs.com/docs/rollup_basics#intro-to-rollups) 都选择了这个解决方案。

### L2 交易成本 {#cost-of-l2-transactions}

L2 交易的成本由两部分组成：

1. L2 处理，通常极其便宜
2. L1 存储，与主网 gas 成本挂钩

在我撰写本文时，Optimism 上的 L2 gas 成本为 0.001 [Gwei](/developers/docs/gas/#pre-london)。
另一方面，L1 gas 成本约为 40 gwei。
[你可在此处查看当前价格](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m)。

一个字节的 calldata 如果是零，成本是 4 gas，如果为其他任何值，成本是 16 gas。
以太坊虚拟机上最昂贵的操作之一是写入存储。
将一个 32 字节的字写入 L2 存储的最大成本是 22100 gas。 目前，这是 22.1 gwei。
因此，如果我们能节省 calldata 的一个零字节，就能向存储写入约 200 个字节，而且仍然划算。

### ABI {#the-abi}

绝大多数交易都是从外部所有的帐户访问合约。
大多数合约都用 Solidity 编写，并根据[应用程序二进制接口 (ABI)](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding) 来解释它们的数据字段。

然而，ABI 是为 L1 设计的，在 L1 上一个字节的 calldata 成本约等于四次算术运算，而不是 L2，在 L2 上一个字节的 calldata 成本超过一千次算术运算。
calldata 的划分如下：

| 部分    | 长度 |    字节 | 浪费的字节 | 浪费的 gas | 必要字节 | 必要 gas |
| ----- | -: | ----: | ----: | ------: | ---: | -----: |
| 函数选择器 |  4 |   0-3 |     3 |      48 |    1 |     16 |
| 零     | 12 |  4-15 |    12 |      48 |    0 |      0 |
| 目标地址  | 20 | 16-35 |     0 |       0 |   20 |    320 |
| 数量    | 32 | 36-67 |    17 |      64 |   15 |    240 |
| 总计    | 68 |       |       |     160 |      |    576 |

解释：

- **函数选择器**：合约的函数少于 256 个，因此我们可以用单个字节来区分它们。
  这些字节通常是非零的，因此[花费 16 gas](https://eips.ethereum.org/EIPS/eip-2028)。
- **零**：这些字节总是零，因为一个 20 字节的地址不需要一个 32 字节的字来容纳它。
  值为零的字节花费 4 gas（[参见黄皮书](https://ethereum.github.io/yellowpaper/paper.pdf)，附录 G，
  第 27 页，`G`<sub>`txdatazero`</sub> 的值）。
- **数量**：如果我们假设在这个合约中，`decimals` 是 18（正常值），并且我们转移的代币最大数量是 10<sup>18</sup>，那么我们得到的最大数量是 10<sup>36</sup>。
  256<sup>15</sup> &gt; 10<sup>36</sup>，所以十五个字节足够了。

在 L1 上浪费 160 gas 通常可以忽略不计。 一笔交易至少要花费 [21,000 gas](https://yakkomajuri.medium.com/blockchain-definition-of-the-week-ethereum-gas-2f976af774ed)，所以额外的 0.8% 并不重要。
然而，在 L2 上，情况就不同了。 交易的几乎全部成本都是将其写入 L1 的成本。
除了交易 calldata，还有 109 字节的交易头（目标地址、签名等）。
因此，总成本为 `109*16+576+160=2480`，我们浪费了其中的约 6.5%。

## 当你无法控制目标时降低成本 {#reducing-costs-when-you-dont-control-the-destination}

假设您无法控制目标合约，您仍然可以使用类似于[这个](https://github.com/qbzzt/ethereum.org-20220330-shortABI)的解决方案。
让我们来看看相关文件。

### Token.sol {#token-sol}

[这是目标合约](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/Token.sol)。
它是一个标准的 ERC-20 合约，带有一个额外的功能。
这个 `faucet` 函数让任何用户都能获得一些代币来使用。
它会使生产 ERC-20 合约无用，但当 ERC-20 仅用于方便测试时，它会让生活变得更轻松。

```solidity
    /**
     * @dev 给调用者 1000 个代币用于测试
     */
    function faucet() external {
        _mint(msg.sender, 1000);
    }   // function faucet
```

### CalldataInterpreter.sol {#calldatainterpreter-sol}

[这是交易应该用较短 calldata 调用的合约](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/CalldataInterpreter.sol)。
我们逐行来过一遍。

```solidity
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


import { OrisUselessToken } from "./Token.sol";
```

我们需要代币函数来知道如何调用它。

```solidity
contract CalldataInterpreter {

    OrisUselessToken public immutable token;
```

我们作为其代理的代币地址。

```solidity

    /**
     * @dev 指定代币地址
     * @param tokenAddr_ ERC-20 合约地址
     */
    constructor(
        address tokenAddr_
    )  {
        token = OrisUselessToken(tokenAddr_);
    }   // constructor
```

代币地址是我们需要指定的唯一参数。

```solidity
    function calldataVal(uint startByte, uint length)
        private pure returns (uint) {
```

从 calldata 读取一个值。

```solidity
        uint _retVal;

        require(length < 0x21,
            "calldataVal length limit is 32 bytes");

        require(length + startByte <= msg.data.length,
            "calldataVal trying to read beyond calldatasize");
```

我们将把一个 32 字节（256 位）的字加载到内存中，并移除不属于我们想要字段的字节。
这个算法不适用于长于 32 字节的值，当然我们也不能读取超过 calldata 末尾的数据。
在 L1 上，为了节省 gas，可能需要跳过这些测试，但在 L2 上 gas 非常便宜，这使得我们可以进行任何能想到的健全性检查。

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

我们本可以从对 `fallback()` 的调用中复制数据（见下文），但使用 [Yul](https://docs.soliditylang.org/en/v0.8.12/yul.html)（EVM 的汇编语言）会更容易。

这里我们使用 [CALLDATALOAD 操作码](https://www.evm.codes/#35) 将从 `startByte` 到 `startByte+31` 的字节读入堆栈。
一般来说，Yul 中操作码的语法是 `<opcode name>(<first stack value, if any>,<second stack value, if any>...)`。

```solidity

        _retVal = _retVal >> (256-length*8);
```

只有最高有效位的 `length` 字节是该字段的一部分，所以我们[右移](https://en.wikipedia.org/wiki/Logical_shift)以去除其他值。
这样做还有一个额外的好处，就是将值移动到字段的右侧，这样它就是值本身，而不是值乘以 256<sup>某个数</sup>。

```solidity

        return _retVal;
    }


    fallback() external {
```

当对 Solidity 合约的调用与任何函数签名都不匹配时，它会调用 [`fallback()` 函数](https://docs.soliditylang.org/en/v0.8.12/contracts.html#fallback-function)（如果存在的话）。
对于 `CalldataInterpreter` 来说，_任何_ 调用都会到这里，因为没有其他 `external` 或 `public` 函数。

```solidity
        uint _func;

        _func = calldataVal(0, 1);
```

读取 calldata 的第一个字节，它告诉我们是哪个函数。
一个函数在这里不可用的原因有两个：

1. `pure` 或 `view` 函数不改变状态，也不花费 gas（当在链下调用时）。
   试图降低它们的 gas 成本是没有意义的。
2. 依赖于 [`msg.sender`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#block-and-transaction-properties) 的函数。
   `msg.sender` 的值将是 `CalldataInterpreter` 的地址，而不是调用者的地址。

不幸的是，[查看 ERC-20 规范](https://eips.ethereum.org/EIPS/eip-20)，这只剩下一个函数 `transfer`。
这让我们只剩下两个函数：`transfer`（因为我们可以调用 `transferFrom`）和 `faucet`（因为我们可以把代币转回给我们调用的任何人）。

```solidity

        // Call the state changing methods of token using
        // information from the calldata

        // faucet
        if (_func == 1) {
```

调用 `faucet()`，它没有参数。

```solidity
            token.faucet();
            token.transfer(msg.sender,
                token.balanceOf(address(this)));
        }
```

调用 `token.faucet()` 后，我们得到了代币。 然而，作为代理合约，我们**不**需要代币。
调用我们的 EOA（外部拥有账户）或合约才需要。
所以我们把所有的代币都转移给调用我们的人。

```solidity
        // transfer (assume we have an allowance for it)
        if (_func == 2) {
```

转移代币需要两个参数：目标地址和数量。

```solidity
            token.transferFrom(
                msg.sender,
```

我们只允许调用者转移他们拥有的代币

```solidity
                address(uint160(calldataVal(1, 20))),
```

目标地址从字节 #1 开始（字节 #0 是函数）。
作为一个地址，它的长度是 20 字节。

```solidity
                calldataVal(21, 2)
```

对于这个特定的合约，我们假设任何人想要转移的最大代币数量可以容纳在两个字节内（小于 65536）。

```solidity
            );
        }
```

总的来说，一次转账需要 35 字节的 calldata：

| 部分    | 长度 |    字节 |
| ----- | -: | ----: |
| 函数选择器 |  1 |     0 |
| 目标地址  | 32 |  1-32 |
| 数量    |  2 | 33-34 |

```solidity
    }   // fallback

}       // contract CalldataInterpreter
```

### test.js {#test-js}

[这个 JavaScript 单元测试](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/test/test.js)向我们展示了如何使用这个机制（以及如何验证它是否正确工作）。
我假设你了解 [chai](https://www.chaijs.com/) 和 [ethers](https://docs.ethers.io/v5/)，只解释专门适用于该合约的部分。

```js
const { expect } = require("chai");

describe("CalldataInterpreter", function () {
  it("Should let us use tokens", async function () {
    const Token = await ethers.getContractFactory("OrisUselessToken")
    const token = await Token.deploy()
    await token.deployed()
    console.log("Token addr:", token.address)

    const Cdi = await ethers.getContractFactory("CalldataInterpreter")
    const cdi = await Cdi.deploy(token.address)
    await cdi.deployed()
    console.log("CalldataInterpreter addr:", cdi.address)

    const signer = await ethers.getSigner()
```

我们首先部署这两个合约。

```javascript
    // Get tokens to play with
    const faucetTx = {
```

我们不能使用我们通常会使用的高级函数（例如 `token.faucet()`）来创建交易，因为我们没有遵循 ABI。
相反，我们必须自己构建交易，然后发送它。

```javascript
      to: cdi.address,
      data: "0x01"
```

我们需要为交易提供两个参数：

1. `to`，目标地址。
   这是 calldata 解释器合约。
2. `data`，要发送的 calldata。
   在 faucet 调用的情况下，数据是单个字节，`0x01`。

```javascript

    }
    await (await signer.sendTransaction(faucetTx)).wait()
```

我们调用[签名者的 `sendTransaction` 方法](https://docs.ethers.io/v5/api/signer/#Signer-sendTransaction)，因为我们已经指定了目标（`faucetTx.to`），并且我们需要对交易进行签名。

```javascript
// Check the faucet provides the tokens correctly
expect(await token.balanceOf(signer.address)).to.equal(1000)
```

这里我们验证余额。
在 `view` 函数上没有节省 gas 的必要，所以我们正常运行它们。

```javascript
// Give the CDI an allowance (approvals cannot be proxied)
const approveTX = await token.approve(cdi.address, 10000)
await approveTX.wait()
expect(await token.allowance(signer.address, cdi.address)).to.equal(10000)
```

给 calldata 解释器一个额度，以便能够进行转账。

```javascript
// Transfer tokens
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
```

创建一个转账交易。 第一个字节是 “0x02”，后面是目标地址，最后是数量（0x0100，即十进制的 256）。

```javascript
    await (await signer.sendTransaction(transferTx)).wait()

    // Check that we have 256 tokens less
    expect (await token.balanceOf(signer.address)).to.equal(1000-256)

    // And that our destination got them
    expect (await token.balanceOf(destAddr)).to.equal(256)
  })    // it
})      // describe
```

## 当您确实控制目标合约时降低成本 {#reducing-the-cost-when-you-do-control-the-destination-contract}

如果您确实控制目标合约，您可以创建绕过 `msg.sender` 检查的函数，因为它们信任 calldata 解释器。
[您可以在 `control-contract` 分支中看到这个工作原理的示例](https://github.com/qbzzt/ethereum.org-20220330-shortABI/tree/control-contract)。

如果合约只响应外部交易，我们可以只用一个合约。
然而，这会破坏[可组合性](/developers/docs/smart-contracts/composability/)。
最好有一个响应正常 ERC-20 调用的合约，和另一个响应具有短调用数据的交易的合约。

### Token.sol {#token-sol-2}

在这个例子中，我们可以修改 `Token.sol`。
这让我们有一些只有代理可以调用的函数。
以下是新的部分：

```solidity
    // The only address allowed to specify the CalldataInterpreter address
    address owner;

    // The CalldataInterpreter address
    address proxy = address(0);
```

ERC-20 合约需要知道授权代理的身份。
但是，我们不能在构造函数中设置这个变量，因为我们还不知道它的值。
这个合约首先被实例化，因为代理在其构造函数中期望得到代币的地址。

```solidity
    /**
     * @dev Calls the ERC20 constructor.
     */
    constructor(
    ) ERC20("Oris useless token-2", "OUT-2") {
        owner = msg.sender;
    }
```

创建者（称为 `owner`）的地址存储在这里，因为那是唯一允许设置代理的地址。

```solidity
    /**
     * @dev 设置代理（CalldataInterpreter）的地址。
     * 只能由所有者调用一次
     */
    function setProxy(address _proxy) external {
        require(msg.sender == owner, "Can only be called by owner");
        require(proxy == address(0), "Proxy is already set");

        proxy = _proxy;
    }    // function setProxy
```

代理拥有特权访问权限，因为它可以绕过安全检查。
为了确保我们能信任代理，我们只让 `owner` 调用这个函数，而且只能调用一次。
一旦 `proxy` 有一个真实的值（非零），那个值就不能改变，所以即使所有者决定变得恶意，或者其助记词被泄露，我们仍然是安全的。

```solidity
    /**
     * @dev Some functions may only be called by the proxy.
     */
    modifier onlyProxy {
```

这是一个[`修饰符`函数](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm)，它修改其他函数的运作方式。

```solidity
      require(msg.sender == proxy);
```

首先，验证我们是被代理调用的，而不是其他人。
如果不是，则 `revert`。

```solidity
      _;
    }
```

如果是，则运行我们修改的函数。

```solidity
   /* Functions that allow the proxy to actually proxy for accounts */

    function transferProxy(address from, address to, uint256 amount)
        public virtual onlyProxy() returns (bool)
    {
        _transfer(from, to, amount);
        return true;
    }

    function approveProxy(address from, address spender, uint256 amount)
        public virtual onlyProxy() returns (bool)
    {
        _approve(from, spender, amount);
        return true;
    }

    function transferFromProxy(
        address spender,
        address from,
        address to,
        uint256 amount
    ) public virtual onlyProxy() returns (bool)
    {
        _spendAllowance(from, spender, amount);
        _transfer(from, to, amount);
        return true;
    }
```

这三个操作通常要求消息直接来自转移代币或批准额度的实体。
这里我们有一个这些操作的代理版本，它：

1. 被 `onlyProxy()` 修改，所以其他人不允许控制它们。
2. 将通常是 `msg.sender` 的地址作为额外参数获取。

### CalldataInterpreter.sol {#calldatainterpreter-sol-2}

calldata 解释器与上面的几乎相同，只是代理的函数接收一个 `msg.sender` 参数，并且 `transfer` 不需要额度。

```solidity
        // transfer (no need for allowance)
        if (_func == 2) {
            token.transferProxy(
                msg.sender,
                address(uint160(calldataVal(1, 20))),
                calldataVal(21, 2)
            );
        }

        // approve
        if (_func == 3) {
            token.approveProxy(
                msg.sender,
                address(uint160(calldataVal(1, 20))),
                calldataVal(21, 2)
            );
        }

        // transferFrom
        if (_func == 4) {
            token.transferFromProxy(
                msg.sender,
                address(uint160(calldataVal( 1, 20))),
                address(uint160(calldataVal(21, 20))),
                calldataVal(41, 2)
            );
        }
```

### Test.js {#test-js-2}

之前的测试代码和这个测试代码之间有几处变化。

```js
const Cdi = await ethers.getContractFactory("CalldataInterpreter")
const cdi = await Cdi.deploy(token.address)
await cdi.deployed()
await token.setProxy(cdi.address)
```

我们需要告诉 ERC-20 合约信任哪个代理

```js
console.log("CalldataInterpreter addr:", cdi.address)

// Need two signers to verify allowances
const signers = await ethers.getSigners()
const signer = signers[0]
const poorSigner = signers[1]
```

为了检查 `approve()` 和 `transferFrom()`，我们需要第二个签名者。
我们称它为 `poorSigner`，因为它没有得到我们的任何代币（当然，它确实需要有 ETH）。

```js
// Transfer tokens
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
await (await signer.sendTransaction(transferTx)).wait()
```

因为 ERC-20 合约信任代理（`cdi`），所以我们不需要额度来中继转账。

```js
// approval and transferFrom
const approveTx = {
  to: cdi.address,
  data: "0x03" + poorSigner.address.slice(2, 42) + "00FF",
}
await (await signer.sendTransaction(approveTx)).wait()

const destAddr2 = "0xE1165C689C0c3e9642cA7606F5287e708d846206"

const transferFromTx = {
  to: cdi.address,
  data: "0x04" + signer.address.slice(2, 42) + destAddr2.slice(2, 42) + "00FF",
}
await (await poorSigner.sendTransaction(transferFromTx)).wait()

// Check the approve / transferFrom combo was done correctly
expect(await token.balanceOf(destAddr2)).to.equal(255)
```

测试这两个新函数。
请注意，`transferFromTx` 需要两个地址参数：额度的提供者和接收者。

## 结论 {#conclusion}

[Optimism](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92) 和 [Arbitrum](https://developer.offchainlabs.com/docs/special_features) 都在寻找方法来减少写入 L1 的 calldata 大小，从而降低交易成本。
然而，作为寻找通用解决方案的基础设施提供商，我们的能力是有限的。
作为 dapp 开发者，您拥有特定于应用的知识，这使您能够比我们在通用解决方案中更好地优化您的 calldata。
希望这篇文章能帮助您找到满足您需求的理想解决方案。

[点击此处查看我的更多作品](https://cryptodocguy.pro/)。

