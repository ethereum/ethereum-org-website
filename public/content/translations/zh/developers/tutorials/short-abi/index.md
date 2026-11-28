---
title: "用于优化调用数据的简短 ABI"
description: "为 Optimistic 汇总优化智能合约"
author: "奥里·波梅兰茨"
lang: zh
tags: ["二层网络 (L2)"]
skill: intermediate
breadcrumb: "简短 ABI"
published: 2022-04-01
---

## 简介 {#introduction}

在本文中，你将了解[Optimistic 汇总](/developers/docs/scaling/optimistic-rollups)、其上的交易成本，以及这种不同的成本结构为何要求我们进行与以太坊主网不同的优化。
你还将学习如何实现这种优化。

### 利益披露 {#full-disclosure}

我是 [Optimism](https://www.optimism.io/) 的全职员工，因此本文中的示例将在 Optimism 上运行。
不过，这里解释的技术同样适用于其他汇总。

### 术语 {#terminology}

在讨论汇总时，术语“一层网络 (L1)”用于指代主网，即生产环境的以太坊网络。
术语“二层网络 (L2)”用于指代 Rollup 或任何其他依赖一层网络 (L1) 提供安全性但大部分处理都在链下完成的系统。

## 我们如何进一步降低 L2 交易的成本？ {#how-can-we-further-reduce-the-cost-of-l2-transactions}

[Optimistic 汇总](/developers/docs/scaling/optimistic-rollups)必须保存每笔历史交易的记录，以便任何人都可以查看它们并验证当前状态是否正确。
在撰写本文时，将数据输入以太坊主网最便宜的方法是将其作为调用数据写入。
[Optimism](https://docs.optimism.io/op-stack/protocol/overview) 和 [Arbitrum](https://docs.arbitrum.io/welcome/arbitrum-gentle-introduction) 都选择了这种解决方案。
自 Dencun 升级（2024 年 3 月）以来，汇总可以将这些数据发布在[斑点](/roadmap/danksharding/)中，这要便宜得多。

### L2 交易成本 {#cost-of-l2-transactions}

L2 交易成本由两部分组成：

1. L2 处理，通常非常便宜
2. L1 存储，与主网 Gas 成本挂钩

当我在 2022 年撰写本文时，在 Optimism 上 L2 Gas 的成本为 0.001 [Gwei](/developers/docs/gas/#what-is-gas)。
另一方面，L1 Gas 的成本约为 40 Gwei。

一个字节的调用数据花费 4 Gas（如果为零）或 16 Gas（如果为任何其他值）。
EVM 上最昂贵的操作之一是写入存储。
在 L2 上将一个 32 字节的字写入存储的最大成本为 22100 Gas。当时，这相当于 22.1 Gwei。
因此，如果我们能节省一个零字节的调用数据，我们就能向存储写入大约 200 个字节，并且仍然划算。

#### 2024 年 L2 成本如何变化 {#how-l2-costs-changed-in-2024}

自本文撰写以来，OP Stack 的 [L1 数据费用](https://docs.optimism.io/op-stack/transactions/fees#l1-data-fee)公式已更改了两次：

- 随着 [Ecotone 升级](https://docs.optimism.io/op-stack/transactions/fees#ecotone)（2024 年 3 月），OP Stack 链开始将交易数据发布到斑点，这些斑点由单独的（通常低得多）斑点基础费用定价。
- 随着 [Fjord 升级](https://docs.optimism.io/op-stack/transactions/fees#fjord)（2024 年 7 月），L1 数据费用基于对 [FastLZ](https://github.com/ariya/FastLZ) 压缩后交易大小的估计，每笔交易至少 100 字节（[参见规范](https://specs.optimism.io/protocol/fjord/exec-engine.html)）。

这在三个方面改变了本文其余部分的分析：

1. 零字节压缩率高，因此它们几乎是免费的。
   下面每字节 4 和 16 Gas 的数字是 L1 调用数据的成本，而不是你今天在 OP Stack 链上为交易数据支付的费用。
2. 在 100 字节的最小值以下，更短的调用数据不会节省任何费用。
   例如，在 2026 年 10 月的 OP 主网上，标准的 ERC-20 `transfer`（68 字节的调用数据）和本文中 23 字节的简短版本将支付完全相同的 L1 数据费用，即最低费用，约为 1 Gwei（10<sup>-9</sup> ETH）。
3. 因为斑点空间很便宜，L2 执行费用现在通常大于 L1 数据费用。
   在 L2 Gas 价格为 0.001 Gwei 时，1000 Gas 的成本为 1 Gwei，与整个 L1 数据费用相同，因此通过代理合约产生的额外执行 Gas 成本可能超过它所节省的字节成本。

原理仍然成立：压缩字节越少意味着 L1 数据费用越低。
简短 ABI 对于包含大量难以压缩数据的交易，以及在 L1 数据昂贵的链上或时期，最有意义。
要查看特定交易将支付多少费用，请使用未签名的交易在 [`GasPriceOracle` 预部署合约](https://specs.optimism.io/protocol/predeploys.html#gaspriceoracle)上调用 `getL1Fee`。
例如，使用 [Foundry](https://getfoundry.sh/introduction/installation/) 的 `cast`：

```sh
TX=$(cast mktx --raw-unsigned --from <your address> --chain 10 --nonce 0 --gas-limit 100000 \
  --priority-gas-price 1000000 --gas-price 1000000 <destination address> <calldata>)
cast call 0x420000000000000000000000000000000000000F "getL1Fee(bytes)(uint256)" $TX --rpc-url https://mainnet.optimism.io
```

结果以 Wei 为单位。

### ABI {#the-abi}

绝大多数交易都是从外部拥有账户访问合约。
大多数合约都是用 Solidity 编写的，并根据[应用程序二进制接口 (ABI)](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding) 解释其数据字段。

然而，ABI 是为 L1 设计的，在 L1 中，一个字节的调用数据成本大约等于四次算术运算，而不是 L2，在 L2 中（按 2022 年的价格），一个字节的调用数据成本超过一千次算术运算。
调用数据划分如下：

| 部分 | 长度 | 字节 | 浪费的字节 | 浪费的 Gas | 必要的字节 | 必要的 Gas |
| ------------------- | -----: | ----: | -----------: | ---------: | --------------: | ------------: |
| 函数选择器 |      4 |   0-3 |            3 |         48 |               1 |            16 |
| 零 |     12 |  4-15 |           12 |         48 |               0 |             0 |
| 目标地址 |     20 | 16-35 |            0 |          0 |              20 |           320 |
| 数量 |     32 | 36-67 |           17 |         68 |              15 |           240 |
| 总计 |     68 |       |              |        164 |                 |           576 |

解释：

- **函数选择器**：合约的函数少于 256 个，因此我们可以用一个字节来区分它们。
  这些字节通常非零，因此[花费 16 Gas](https://eips.ethereum.org/EIPS/eip-2028)。
- **零**：这些字节始终为零，因为 20 字节的地址不需要 32 字节的字来保存。
  保存零的字节花费 4 Gas（[参见黄皮书](https://ethereum.github.io/yellowpaper/paper.pdf)附录 G，第 27 页，`G`<sub>`txdatazero`</sub> 的值）。
- **数量**：如果我们假设在这个合约中 `decimals` 是 18（正常值），并且我们转账的代币最大数量将是 10<sup>18</sup>，我们得到的最大数量是 10<sup>36</sup>。
  256<sup>15</sup> &gt; 10<sup>36</sup>，所以 15 个字节就足够了。

在 L1 上浪费 164 Gas 通常可以忽略不计。一笔交易至少花费 [21,000 Gas](https://yakkomajuri.medium.com/blockchain-definition-of-the-week-ethereum-gas-2f976af774ed)，因此额外的 0.8% 无关紧要。
然而，在 2022 年的 L2 上，情况有所不同。交易的几乎全部成本都在于将其写入 L1。
除了交易调用数据之外，还有 109 字节的交易标头（目标地址、签名等）。
因此总成本为 `109*16+576+164=2484`，而我们浪费了大约 6.6%。

## 当你无法控制目标合约时降低成本 {#reducing-costs-when-you-dont-control-the-destination}

假设你无法控制目标合约，你仍然可以使用类似于[这个](https://github.com/qbzzt/ethereum.org-20220330-shortABI)的解决方案。

要运行它，你需要 [Node.js](https://nodejs.org/) 和 git：

```sh
git clone https://github.com/qbzzt/ethereum.org-20220330-shortABI.git
cd ethereum.org-20220330-shortABI
npm install
npx hardhat test
```

该测试将合约部署到 Hardhat 的内置本地网络，因此你不需要任何 ETH。
该代码库使用 Hardhat 2.9，因此在当前版本的 Node.js 上，它会警告不支持你的 Node.js 版本，但测试仍然可以通过。

让我们来看看相关的文件。

### Token.sol {#token-sol}

[这是目标合约](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/Token.sol)。
它是一个标准的 ERC-20 合约，带有一个附加功能。
这个 `faucet` 函数允许任何用户获取一些代币来使用。
这会使生产环境的 ERC-20 合约变得毫无用处，但当 ERC-20 仅用于辅助测试时，它会让事情变得更简单。

```solidity
    /**
     * @dev 给调用者 1000 个代币来试玩
     */
    function faucet() external {
        _mint(msg.sender, 1000);
    }   // function faucet
```

### CalldataInterpreter.sol {#calldatainterpreter-sol}

[这是交易应该使用较短调用数据调用的合约](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/CalldataInterpreter.sol)。
让我们逐行查看。

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

我们作为代理的代币地址。

```solidity

    /**
     * @dev 指定代币地址
     * @param tokenAddr_ ERC-20合约地址
     */
    constructor(
        address tokenAddr_
    )  {
        token = OrisUselessToken(tokenAddr_);
    }   // 构造函数
```

代币地址是我们需要指定的唯一参数。

```solidity
    function calldataVal(uint startByte, uint length)
        private pure returns (uint) {
```

从调用数据中读取一个值。

```solidity
        uint _retVal;

        require(length < 0x21,
            "calldataVal length limit is 32 bytes");

        require(length + startByte <= msg.data.length,
            "calldataVal trying to read beyond calldatasize");
```

我们将把一个 32 字节（256 位）的字加载到内存中，并删除不属于我们所需字段的字节。
此算法不适用于长度超过 32 字节的值，当然我们也不能读取超过调用数据末尾的内容。
在 L1 上，可能需要跳过这些测试以节省 Gas，但在 L2 上 Gas 非常便宜，这使得我们可以进行任何能想到的合理性检查。

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

我们本可以从对 `fallback()` 的调用中复制数据（见下文），但使用 EVM 的汇编语言 [Yul](https://docs.soliditylang.org/en/v0.8.12/yul.html) 会更容易。

在这里，我们使用 [CALLDATALOAD 操作码](https://www.evm.codes/#35)将字节 `startByte` 到 `startByte+31` 读取到堆栈中。
通常，Yul 中操作码的语法是 `<opcode name>(<first stack value, if any>,<second stack value, if any>...)`。

```solidity

        _retVal = _retVal >> (256-length*8);
```

只有最高位的 `length` 个字节是该字段的一部分，因此我们进行[右移](https://en.wikipedia.org/wiki/Logical_shift)以去除其他值。
这还有一个额外的好处，即将值移动到字段的右侧，因此它是值本身，而不是值乘以 256<sup>某数</sup>。

```solidity

        return _retVal;
    }


    fallback() external {
```

当对 Solidity 合约的调用与任何函数签名都不匹配时，它会调用 [`fallback()` 函数](https://docs.soliditylang.org/en/v0.8.12/contracts.html#fallback-function)（假设存在该函数）。
在 `CalldataInterpreter` 的情况下，_任何_调用都会到达这里，因为没有其他 `external` 或 `public` 函数。

```solidity
        uint _func;

        _func = calldataVal(0, 1);
```

读取调用数据的第一个字节，它告诉我们是哪个函数。
函数在这里不可用有两个原因：

1. `pure` 或 `view` 的函数不会改变状态，并且（在链下调用时）不消耗 Gas。
   试图降低它们的 Gas 成本是没有意义的。
2. 依赖于 [`msg.sender`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#block-and-transaction-properties) 的函数。
   `msg.sender` 的值将是 `CalldataInterpreter` 的地址，而不是调用者。

不幸的是，[查看 ERC-20 规范](https://eips.ethereum.org/EIPS/eip-20)，这只留下了一个标准函数 `transfer`（因为我们可以调用 `transferFrom`）。
我们的测试代币也有 `faucet`，我们可以支持它，因为我们可以将代币转账回给调用我们的人。

```solidity

        // 调用代币的状态改变方法，使用
        // 来自调用数据的信息

        // 水龙头
        if (_func == 1) {
```

对 `faucet()` 的调用，它没有参数。

```solidity
            token.faucet();
            token.transfer(msg.sender,
                token.balanceOf(address(this)));
        }
```

在我们调用 `token.faucet()` 之后，我们获得了代币。然而，作为代理合约，我们不**需要**代币。
调用我们的外部拥有账户 (EOA) 或合约才需要。
因此，我们将所有代币转账给调用我们的人。

```solidity
        // 转账（假设我们有它的授权额度）
        if (_func == 2) {
```

转账代币需要两个参数：目标地址和数量。

```solidity
            token.transferFrom(
                msg.sender,
```

我们只允许调用者转账他们拥有的代币

```solidity
                address(uint160(calldataVal(1, 20))),
```

目标地址从字节 #1 开始（字节 #0 是函数）。
作为一个地址，它的长度为 20 字节。

```solidity
                calldataVal(21, 2)
```

对于这个特定的合约，我们假设任何人想要转账的最大代币数量适合两个字节（小于 65536）。

```solidity
            );
        }
```

总的来说，一次转账需要 23 字节的调用数据：

| 部分 | 长度 | 字节 |
| ------------------- | -----: | ----: |
| 函数选择器 |      1 |     0 |
| 目标地址 |     20 |  1-20 |
| 数量 |      2 | 21-22 |

```solidity
    }   // 回退函数

}       // 合约 CalldataInterpreter
```

### test.js {#test-js}

[这个 JavaScript 单元测试](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/test/test.js)向我们展示了如何使用这种机制（以及如何验证它是否正常工作）。
我假设你了解 [chai](https://www.chaijs.com/) 和 [ethers](https://docs.ethers.org/v5/)，并且只解释专门适用于该合约的部分。

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
    // 获取代币来试玩
    const faucetTx = {
```

我们不能使用通常使用的高级函数（例如 `token.faucet()`）来创建交易，因为我们不遵循 ABI。
相反，我们必须自己构建交易，然后发送它。

```javascript
      to: cdi.address,
      data: "0x01"
```

我们需要为交易提供两个参数：

1. `to`，目标地址。
   这是调用数据解释器合约。
2. `data`，要发送的调用数据。
   在调用水龙头的情况下，数据是一个单字节，即 `0x01`。

```javascript

    }
    await (await signer.sendTransaction(faucetTx)).wait()
```

我们调用[签名者的 `sendTransaction` 方法](https://docs.ethers.org/v5/api/signer/#Signer-sendTransaction)，因为我们已经指定了目标（`faucetTx.to`），并且我们需要对交易进行签名。

```javascript
// 检查水龙头是否正确提供了代币
expect(await token.balanceOf(signer.address)).to.equal(1000)
```

在这里我们验证余额。
没有必要在 `view` 函数上节省 Gas，所以我们只需正常运行它们。

```javascript
// 给 CDI 一个授权额度（授权不能被代理）
const approveTX = await token.approve(cdi.address, 10000)
await approveTX.wait()
expect(await token.allowance(signer.address, cdi.address)).to.equal(10000)
```

给调用数据解释器一个授权额度，使其能够进行转账。

```javascript
// 转账代币
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
```

创建一个转账交易。第一个字节是“0x02”，后跟目标地址，最后是数量（0x0100，十进制为 256）。

```javascript
    await (await signer.sendTransaction(transferTx)).wait()

    // 检查我们是否少了 256 个代币
    expect (await token.balanceOf(signer.address)).to.equal(1000-256)

    // 并且我们的目标收到了它们
    expect (await token.balanceOf(destAddr)).to.equal(256)
  })    // it
})      // describe
```

## 当你可以控制目标合约时降低成本 {#reducing-the-cost-when-you-do-control-the-destination-contract}

如果你确实可以控制目标合约，你可以创建绕过 `msg.sender` 检查的函数，因为它们信任调用数据解释器。
[你可以在 `control-contract` 分支中看到它是如何工作的一个示例](https://github.com/qbzzt/ethereum.org-20220330-shortABI/tree/control-contract)。
要运行它，请切换到你之前克隆的代码库中的该分支，然后再次运行测试：

```sh
git checkout control-contract
npx hardhat test
```

如果合约只响应外部交易，我们只需一个合约就可以应付。
然而，这会破坏[可组合性](/developers/docs/smart-contracts/composability/)。
更好的做法是，一个合约响应正常的 ERC-20 调用，另一个合约响应带有简短调用数据的交易。

### Token.sol {#token-sol-2}

在这个例子中，我们可以修改 `Token.sol`。
这使我们能够拥有一些只有代理才能调用的函数。
以下是新添加的部分：

```solidity
    // 唯一允许指定 CalldataInterpreter 地址的地址
    address owner;

    // CalldataInterpreter 地址
    address proxy = address(0);
```

ERC-20 合约需要知道授权代理的身份。
然而，我们不能在构造函数中设置这个变量，因为我们还不知道它的值。
这个合约首先被实例化，因为代理在其构造函数中需要代币的地址。

```solidity
    /**
     * @dev 调用 ERC20 构造函数。
     */
    constructor(
    ) ERC20("Oris useless token-2", "OUT-2") {
        owner = msg.sender;
    }
```

创建者的地址（称为 `owner`）存储在这里，因为这是唯一允许设置代理的地址。

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

代理具有特权访问权限，因为它可以绕过安全检查。
为了确保我们可以信任代理，我们只允许 `owner` 调用此函数，并且只能调用一次。
一旦 `proxy` 有了真实的值（非零），该值就不能更改，因此即使所有者决定作恶，或者其助记词被泄露，我们仍然是安全的。

```solidity
    /**
     * @dev 某些函数只能由代理调用。
     */
    modifier onlyProxy {
```

这是一个 [`modifier` 函数](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm)，它修改了其他函数的工作方式。

```solidity
      require(msg.sender == proxy);
```

首先，验证我们是由代理调用的，而不是其他人。
如果不是，则 `revert`。

```solidity
      _;
    }
```

如果是，则运行我们修改的函数。

```solidity
   /* 允许代理实际为账户进行代理的函数 */

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

这三个操作通常要求消息直接来自转账代币或批准授权额度的实体。
在这里，我们有这些操作的代理版本，它：

1. 由 `onlyProxy()` 修改，因此不允许其他人控制它们。
2. 获取通常作为 `msg.sender` 的地址作为额外参数。

### CalldataInterpreter.sol {#calldatainterpreter-sol-2}

调用数据解释器与上面的几乎相同，除了被代理的函数接收一个 `msg.sender` 参数，并且不需要为 `transfer` 提供授权额度。

```solidity
        // 转账（不需要授权额度）
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

之前的测试代码和这个测试代码之间有一些变化。

```js
const Cdi = await ethers.getContractFactory("CalldataInterpreter")
const cdi = await Cdi.deploy(token.address)
await cdi.deployed()
await token.setProxy(cdi.address)
```

我们需要告诉 ERC-20 合约信任哪个代理

```js
console.log("CalldataInterpreter addr:", cdi.address)

// 需要两个签名者来验证授权额度
const signers = await ethers.getSigners()
const signer = signers[0]
const poorSigner = signers[1]
```

为了检查 `approve()` 和 `transferFrom()`，我们需要第二个签名者。
我们称之为 `poorSigner`，因为它没有获得我们的任何代币（当然，它确实需要有 ETH）。

```js
// 转账代币
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
await (await signer.sendTransaction(transferTx)).wait()
```

因为 ERC-20 合约信任代理（`cdi`），所以我们不需要授权额度来中继转账。

```js
// approve 和 transferFrom
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

// 检查 approve / transferFrom 组合是否正确执行
expect(await token.balanceOf(destAddr2)).to.equal(255)
```

测试这两个新函数。
请注意，`transferFromTx` 需要两个地址参数：授权额度的提供者和接收者。

## 结论 {#conclusion}

[Optimism](https://docs.optimism.io/op-stack/transactions/fees#fjord) 和 [Arbitrum](https://docs.arbitrum.io/how-arbitrum-works/deep-dives/gas-and-fees) 现在都压缩它们写入 L1 的数据，并根据压缩后的大小对每笔交易收费，以降低交易成本。
然而，作为寻找通用解决方案的基础设施提供商，我们的能力是有限的。
作为 dapp 开发者，你拥有特定于应用程序的知识，这使你能够比我们在通用解决方案中更好地优化你的调用数据。
希望本文能帮助你找到满足你需求的理想解决方案。

[点击此处查看我的更多作品](https://cryptodocguy.pro/)。

