---
title: "实现 Calldata 优化的精简 ABI"
description: 面向乐观卷叠优化智能合约
author: Ori Pomerantz
lang: zh
tags:
  - "二层网络"
skill: intermediate
published: 2022-04-01
---

## 引言 {#introduction}

在本文中，你将了解[乐观卷叠](/developers/docs/scaling/optimistic-rollups)、乐观卷叠上的交易成本，以及不同的成本结构如何要求我们针对不同于以太坊主网上的因素进行优化。 您还将学习如何实现这种优化。

### 充分披露 {#full-disclosure}

我是 [Optimism](https://www.optimism.io/) 组织的一名全职员工，因此本文中的示例将在乐观卷叠上运行。 但是，本文解释的技术应该同样适用于其他卷叠。

### 术语 {#terminology}

讨论卷叠时，术语“一层网络” (L1) 是指主网，即以太坊生产网络。 术语“二层网络” (L2) 是指卷叠及任何其他系统，它们依赖一层网络获得安全性且大部分处理都在链下进行。

## 如何能够进一步降低二层网络交易的费用？ {#how-can-we-further-reduce-the-cost-of-L2-transactions}

[乐观卷叠](/developers/docs/scaling/optimistic-rollups)必须保留每笔历史交易的记录，以便任何人都能够检查这些交易并验证当前状态是否正确。 将数据输入以太坊主网的最便宜方法是将其写为 calldata。 该解决方案获得 [Optimism](https://help.optimism.io/hc/en-us/articles/4413163242779-What-is-a-rollup-) 和 [Arbitrum](https://developer.offchainlabs.com/docs/rollup_basics#intro-to-rollups) 的采纳。

### 二层网络的交易费用 {#cost-of-l2-transactions}

二层网络的交易费用包括两部分：

1. 二层网络处理费用，通常非常便宜
2. 一层网络存储费用，与主网燃料费用相关

撰写本文时，在乐观卷叠上，二层网络燃料费用是 0.001 [Gwei](https://ethereum.org/en/developers/docs/gas/#pre-london)。 另一方面，一层网络的燃料费用约为 40 gwei。 [点击此处可以查看当前价格](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m)。

calldata 一个字节的费用为 4 个燃料单位（如果值为零）或 16 个燃料单位（如果值是任何其他值）。 以太坊虚拟机上最昂贵的操作之一是写入存储。 将 32 字节的字写入二层网络存储的最高费用为 22100 个燃料单位。 目前，该费用是 22.1 gwei。 因此，如果我们可以仅保存 calldata 零字节，就能够将大约 200 个字节写入存储，并且仍然可以获利。

### 应用程序二进制接口 {#the-abi}

绝大多数交易都是从外部所有的帐户访问合约。 大多数合约都是用 Solidity 编写的，并根据[应用程序二进制接口](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding)解释其数据字段。

但是，应用程序二进制接口是为一层网络设计的，在一层网络上，calldata 一个字节的费用大约与四次算术运算相同，而在二层网络上，calldata 一个字节的费用超过一千次算术运算的费用。 例如，[此处提供一个 ERC-20 转账交易](https://kovan-optimistic.etherscan.io/tx/0x7ce4c144ebfce157b4de99d8ad53a352ae91b57b3fa06d8a1c79439df6bfa998)。 calldata 包括以下部分：

| 部分       | 长度 |  字节 | 浪费的字节 | 浪费的燃料 | 所需字节 | 所需燃料 |
| ---------- | ---: | ----: | ---------: | ---------: | -------: | -------: |
| 函数选择器 |    4 |   0-3 |          3 |         48 |        1 |       16 |
| 零值       |   12 |  4-15 |         12 |         48 |        0 |        0 |
| 目标地址   |   20 | 16-35 |          0 |          0 |       20 |      320 |
| 金额       |   32 | 36-67 |         17 |         64 |       15 |      240 |
| 总计       |   68 |       |            |        160 |          |      576 |

注释：

- **函数选择器**：合约有不到 256 个函数，所以可以用一个字节区分它们。 这些字节通常为非零字节，因此[花费 16 个 燃料单位](https://eips.ethereum.org/EIPS/eip-2028)。
- **零值**：这些字节始终为零，因为 20 字节的地址不需要 32 字节的字来保存它。 保存零值的字节费用为 4 个燃料单位（[见黄皮书](https://ethereum.github.io/yellowpaper/paper.pdf)，附录 G 第 27 页的 `G`<sub>`txdatazero`</sub> 的值）。
- **金额**：如果我们假设在这个合约中 `decimals` 为 18（正常值）且我们转账的最大代币数量为 10<sup>18</sup>，我们得到的最大金额是 10<sup>36</sup>。 256<sup>15</sup> &gt; 10<sup>36</sup>，所以 15 个字节就足够了。

一层网络上，160 个燃料单位的浪费通常可以忽略不计。 一笔交易至少要花费 [21,000 个燃料单位](https://yakkomajuri.medium.com/blockchain-definition-of-the-week-ethereum-gas-2f976af774ed)，所以多出 0.8% 关系不大。 然而在二层网络上，情况有所不同。 几乎全部交易费用都用于写入一层网络。 除了交易 calldata 外，还有 109 字节的交易头（目的地址、签名等）。 因此，总费用为 `109*16+576+160=2480`，我们大约浪费了其中 6.5%。

## 在你无法控制目标地址时降低费用 {#reducing-costs-when-you-dont-control-the-destination}

假设你无法控制目标地址合约，你仍然可以使用与[此解决方案](https://github.com/qbzzt/ethereum.org-20220330-shortABI)类似的解决方案。 我们来学习一下相关文件。

### Token.sol {#token-sol}

[这是目标地址合约](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/Token.sol)。 它是一个标准 ERC-20 合约，包括一个附加功能。 此 `faucet` 函数可以让任何用户获得一些代币来使用。 该函数会使 ERC-20 生产合约变得无用，但当 ERC-20 合约只是为了方便测试时，它会让工作变得更轻松。

```solidity
    /**
     * @dev Gives the caller 1000 tokens to play with
     */
    function faucet() external {
        _mint(msg.sender, 1000);
    }   // function faucet
```

[可以点击此处查看部署此合约的示例](https://kovan-optimistic.etherscan.io/address/0x950c753c0edbde44a74d3793db738a318e9c8ce8)。

### CalldataInterpreter.sol {#calldatainterpreter-sol}

[这是指示应使用较短的 calldata 调用交易的合约](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/CalldataInterpreter.sol)。 我们逐行学习它。

```solidity
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


import { OrisUselessToken } from "./Token.sol";
```

我们需要代币函数以便知道如何调用它。

```solidity
contract CalldataInterpreter {

    OrisUselessToken public immutable token;
```

我们作为代理的代币的地址。

```solidity

    /**
     * @dev Specify the token address
     * @param tokenAddr_ ERC-20 contract address
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
        private please return (uint)
```

从 calldata 中读取一个值。

```solidity
        uint _retVal;

        require(length < 0x21,
            "calldataVal length limit is 32 bytes");

        require(length + startByte <= msg.data.length,
            "calldataVal trying to read beyond calldatasize");
```

我们将一个 32 字节（256 位）的字加载到内存中，并删除不属于我们所需字段的字节。 该算法不适用于长度超过 32 个字节的值，当然我们不能读取 calldata 末尾以后。 在一层网络上，可能有必要忽略这些测试以节省燃料，但在二层网络上，燃料非常便宜，可以进行我们能想到的任何完整性检查。

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

我们本可以将调用中的数据复制到 `fallback()`（见下文），但使用以太坊虚拟机汇编语言 [Yul](https://docs.soliditylang.org/en/v0.8.12/yul.html) 更加简便。

此处，我们使用 [CALLDATALOAD 操作码](https://www.evm.codes/#35)将字节 `startByte` 到 `startByte+31` 读取入栈。 一般来说，Yul 语言中操作码的语法是 `<opcode name>(<first stack value, if any>,<second stack value, if any>...)`。

```solidity

        _retVal = _retVal >> (256-length*8);
```

只有最重要的 `length` 字节是该字段的一部分，所以我们进行[右移](https://en.wikipedia.org/wiki/Logical_shift)操作，去除其他值。 带来的额外好处是将值移动到字段右边，因此它是值本身而不是值乘以 256<sup>x</sup>。

```solidity

        return _retVal;
    }


    fallback() external {
```

当对 Solidity 合约的调用不匹配任何函数签名时，它会调用 [`fallback()` 函数](https://docs.soliditylang.org/en/v0.8.12/contracts.html#fallback-function)（假设有此函数）。 在 `CalldataInterpreter` 的情况下，*任何*调用都会调用该函数，因为没有其他 `external` 或 `public` 函数。

```solidity
        uint _func;

        _func = calldataVal(0, 1);
```

读取 calldata 的第一个字节，它显示函数。 此处可能没有函数，原因有两个：

1. `pure` 或 `view` 函数不会改变状态，也不会消耗燃料（在链下调用时）。 尝试降低它们的燃料费用没有意义。
2. 依赖 [`msg.sender`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#block-and-transaction-properties) 的函数。 `msg.sender` 的值将成为 `CalldataInterpreter` 而不是调用者的地址。

遗憾的是，[考虑到 ERC-20 规范](https://eips.ethereum.org/EIPS/eip-20)，这样就只剩下一个函数 `transfer`。 我们只能使用两个函数：`transfer`（因为我们可以调用 `transferFrom`）和 `faucet`（因为我们可以将代币转账回任何调用者）。

```solidity

        // Call the state changing methods of token using
        // information from the calldata

        // faucet
        if (_func == 1) {
```

对 `faucet()` 的调用，它没有参数。

```solidity
            token.faucet();
            token.transfer(msg.sender,
                token.balanceOf(address(this)));
        }
```

在调用 `token.faucet()` 后，我们得到了代币。 但是，作为代理合约，我们并不**需要**代币。 调用我们的外部所有的帐户 (EOA) 或合约需要代币。 因此，我们将全部代币转账给任何调用者。

```solidity
        // transfer (assume we have an allowance for it)
        if (_func == 2) {
```

转账代币需要两个参数：目的地址和金额。

```solidity
            token.transferFrom(
                msg.sender,
```

我们只允许调用者转账他们拥有的代币

```solidity
                address(uint160(calldataVal(1, 20))),
```

目标地址从字节 #1 开始（字节 #0 是函数）。 作为地址，其长为 20 个字节。

```solidity
                calldataVal(21, 2)
```

对于此特定合约，假设任何人想要转账的最大代币数量可存入两个字节（小于 65536）。

```solidity
            );
        }
```

总的来说，一次转账需要使用 calldata 的 35 个字节：

| 部分       | 长度 |  字节 |
| ---------- | ---: | ----: |
| 函数选择器 |    1 |     0 |
| 目标地址   |   32 |  1-32 |
| 金额       |    2 | 33-34 |

```solidity
    }   // fallback

}       // contract CalldataInterpreter
```

### test.js {#test-js}

[此 JavaScript 单元测试](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/test/test.js)展示了如何使用此机制（以及如何验证它是否正常运作）。 本文假设你了解 [chai](https://www.chaijs.com/) 和 [ethers](https://docs.ethers.io/v5/) 并且只解释专门适用于此合约的部分。

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

我们首先部署两个合约。

```javascript
    // Get tokens to play with
    const faucetTx = {
```

我们不能使用经常使用的高级函数（例如 `token.faucet()`）来创建交易，因为我们没有遵循应用程序二进制接口。 相反，我们必须自己构建交易然后发送它。

```javascript
      to: cdi.address,
      data: "0x01"
```

我们需要为交易提供两个参数：

1. `to`，目标地址。 这是 calldata 解释器合约。
2. `data`，要发送的 calldata。 在水龙头调用的情况下，数据是单字节 `0x01`。

```javascript

    }
    await (await signer.sendTransaction(faucetTx)).wait()
```

我们调用[签名者的 `sendTransaction` 方法](https://docs.ethers.io/v5/api/signer/#Signer-sendTransaction)，因为我们已经指定了目标地址 (`faucetTx.to`)，我们需要对交易进行签名。

```javascript
// Check the faucet provides the tokens correctly
expect(await token.balanceOf(signer.address)).to.equal(1000)
```

在此处，我们验证余额。 `view` 函数不需要节省燃料，我们只需正常运行它们即可。

```javascript
// Give the CDI an allowance (approvals cannot be proxied)
const approveTX = await token.approve(cdi.address, 10000)
await approveTX.wait()
expect(await token.allowance(signer.address, cdi.address)).to.equal(10000)
```

给 calldata 解释器提供一个能够转账的限额。

```javascript
// Transfer tokens
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
```

创建一个转账交易。 第一个字节是“0x02”，后面是目标地址，最后是金额（0x0100，十进制表示为 256）。

```javascript
    await (await signer.sendTransaction(transferTx)).wait()

    // Check that we have 256 tokens less
    expect (await token.balanceOf(signer.address)).to.equal(1000-256)

    // And that our destination got them
    expect (await token.balanceOf(destAddr)).to.equal(256)
  })    // it
})      // describe
```

### 示例 {#example}

如果不想自己运行，要查看这些文件的运行情况，请点击以下链接：

1. [将 `OrisUselessToken`](https://kovan-optimistic.etherscan.io/tx/1410744) 部署到[地址 `0x950c753c0edbde44a74d3793db738a318e9c8ce8`](https://kovan-optimistic.etherscan.io/address/0x950c753c0edbde44a74d3793db738a318e9c8ce8)。
2. [将 `CalldataInterpreter`](https://kovan-optimistic.etherscan.io/tx/1410745) 部署到[地址 `0x16617fea670aefe3b9051096c0eb4aeb4b3a5f55`](https://kovan-optimistic.etherscan.io/address/0x16617fea670aefe3b9051096c0eb4aeb4b3a5f55)。
3. [调用 `faucet()`](https://kovan-optimistic.etherscan.io/tx/1410746)。
4. [调用 `OrisUselessToken.approve()`](https://kovan-optimistic.etherscan.io/tx/1410747)。 此调用必须直接转到代币合约，因为处理依赖于 `msg.sender`。
5. [调用 `transfer()`](https://kovan-optimistic.etherscan.io/tx/1410748)。

## 在你控制目标合约时降低费用 {#reducing-the-cost-when-you-do-control-the-destination-contract}

如果你确实在控制目标合约，则可以创建绕过 `msg.sender` 检查的函数，因为它们信任 calldata 解释器。 [可以点击此处在 `control-contract` 分支中查看运作原理的示例](https://github.com/qbzzt/ethereum.org-20220330-shortABI/tree/control-contract)。

如果合约只响应外部交易，我们可以通过只拥有一份合约来解决。 但是，这会破坏[可组合性](/developers/docs/smart-contracts/composability/)。 一个合约响应正常 ERC-20 调用，另一个合约使用短调用数据响应交易，这样要好得多。

### Token.sol {#token-sol-2}

在本示例中，我们可以修改 `Token.sol`。 这让我们拥有许多只有代理才可能调用的函数。 以下是新的部分：

```solidity
    // The only address allowed to specify the CalldataInterpreter address
    address owner;

    // The CalldataInterpreter address
    address proxy = address(0);
```

ERC-20 合约需要知道授权代理的身份。 但是，我们不能在构造函数中设置该变量，因为我们还不知道它的值。 该合约首先被实例化，因为代理期望在其构造函数中得到代币的地址。

```solidity
    /**
     * @dev Calls the ERC20 constructor.
     */
    constructor(
    ) ERC20("Oris useless token-2", "OUT-2") {
        owner = msg.sender;
    }
```

创建者的地址（称为 `owner`）存储在此处，因为它是唯一允许设置代理的地址。

```solidity
    /**
     * @dev set the address for the proxy (the CalldataInterpreter).
     * Can only be called once by the owner
     */
    function setProxy(address _proxy) external {
        require(msg.sender == owner, "Can only be called by owner");
        require(proxy == address(0), "Proxy is already set");

        proxy = _proxy;
    }    // function setProxy
```

代理具有特权访问权限，因为它可以绕过安全检查。 为了确保我们可以信任代理，我们只让 `owner` 调用此函数，而且只调用一次。 一旦 `proxy` 有一个真实的值（非零值），这个值就不能改变，所以即使所有者决定耍无赖，或者它的助记符被泄露，我们仍然是安全的。

```solidity
    /**
     * @dev Some functions may only be called by the proxy.
     */
    modifier onlyProxy {
```

这是一个 [`modifier` 函数](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm)，它修改其他函数的工作方式。

```solidity
      require(msg.sender == proxy);
```

首先，核实我们被代理而非任何其他调用者调用。 如果不是，`revert`。

```solidity
      _;
    }
```

如果是这样，运行我们修改的函数。

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

这三项操作通常要求信息直接来自转移代币或批准限额的实体。 此处，我们有一个代理版本执行这些操作，此代理：

1. 由 `onlyProxy()` 修改，因此没有任何其他方可以控制它们。
2. 获取通常为 `msg.sender` 的地址作为额外参数。

### CalldataInterpreter.sol {#calldatainterpreter-sol-2}

此 calldata 解释器几乎与上面的解释器相同，只是被代理的函数接收 `msg.sender` 参数并且 `transfer` 不需要限额。

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

前面的测试代码和这段代码之间有一些变化。

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

要检查 `approve()` 和 `transferFrom()`，我们需要第二个签名者。 我们称它为 `poorSigner`，因为它没有获得我们的任何代币（当然它确实需要以太币）。

```js
// Transfer tokens
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
await (await signer.sendTransaction(transferTx)).wait()
```

因为此 ERC-20 合约信任代理 (`cdi`)，所以我们不需要设置传送转账的限额。

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

测试两个新函数。 请注意，`transferFromTx` 需要两个地址参数：限额的提供者和接收者。

### 示例 {#example-2}

如果你不想自己运行，要查看这些文件的运行情况，请点击以下链接：

1. [将 `OrisUselessToken-2`](https://kovan-optimistic.etherscan.io/tx/1475397) 部署到地址 [`0xb47c1f550d8af70b339970c673bbdb2594011696`](https://kovan-optimistic.etherscan.io/address/0xb47c1f550d8af70b339970c673bbdb2594011696)。
2. [将 `CalldataInterpreter`](https://kovan-optimistic.etherscan.io/tx/1475400) 部署到地址 [`0x0dccfd03e3aaba2f8c4ea4008487fd0380815892`](https://kovan-optimistic.etherscan.io/address/0x0dccfd03e3aaba2f8c4ea4008487fd0380815892)。
3. [调用 `setProxy()`](https://kovan-optimistic.etherscan.io/tx/1475402)。
4. [调用 `faucet()`](https://kovan-optimistic.etherscan.io/tx/1475409)。
5. [调用 `transferProxy()`](https://kovan-optimistic.etherscan.io/tx/1475416)。
6. [调用 `approveProxy()`](https://kovan-optimistic.etherscan.io/tx/1475419)。
7. [调用 `transferFromProxy()`](https://kovan-optimistic.etherscan.io/tx/1475421)。 请注意，此调用的地址不同于其他调用，即由 `poorSigner` 而不是 `signer` 调用。

## 总结 {#conclusion}

[Optimism](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92) 和 [Arbitrum](https://developer.offchainlabs.com/docs/special_features) 组织都在不断寻找方法，以期减小写入一层网络的 calldata 的长度并且因而降低交易费用。 然而，作为寻求通用解决方案的基础设施提供商，我们的能力有限。 你是去中心化应用程序开发者，具备特定的应用程序知识，因此你可以在通用解决方案中比我们更好地优化 calldata。 希望本文能帮助你找到满足你需求的理想解决方案。
