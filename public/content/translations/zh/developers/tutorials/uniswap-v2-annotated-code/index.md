---
title: "尤尼斯瓦普 v2 合约详解"
description: "尤尼斯瓦普 v2 合约是如何工作的？为什么这样编写？"
author: "奥里·波梅兰茨"
tags:
  - solidity
  - 去中心化应用 (dapp)
skill: intermediate
breadcrumb: "尤尼斯瓦普 v2 详解"
published: 2021-05-01
lang: zh
---
## 简介 {#introduction}

[尤尼斯瓦普 v2](https://app.uniswap.org/whitepaper.pdf) 可以在任意两种 ERC-20 代币之间创建兑换市场。在本文中，我们将仔细研究实现该协议的合约源代码，并了解它们为何如此编写。

### 尤尼斯瓦普的作用是什么？ {#what-does-uniswap-do}

基本上，有两种类型的用户：流动性提供者和交易者。

<em>流动性提供者</em>向流动性池提供可以兑换的两种代币（我们称之为 **Token0** 和 **Token1**）。作为回报，他们会收到第三种代币，代表对该池的部分所有权，称为_流动性代币_。

<em>交易者</em>向池中发送一种代币，并从流动性提供者提供的池中接收另一种代币（例如，发送 **Token0** 并接收 **Token1**）。兑换率由池中 **Token0** 和 **Token1** 的相对数量决定。此外，该池会提取一小部分作为流动性池的奖励。

当流动性提供者想要取回其资产时，他们可以销毁池代币并收回他们的代币，包括他们应得的奖励份额。

[点击此处获取更完整的描述](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/swaps/)。

### 为什么选择 v2？为什么不是 v3？ {#why-v2}

[尤尼斯瓦普 v3](https://app.uniswap.org/whitepaper-v3.pdf) 是一个比 v2 复杂得多的升级版本。先学习 v2 然后再学习 v3 会更容易。

### 核心合约与外围合约 {#contract-types}

尤尼斯瓦普 v2 分为两个组件：核心和外围。这种划分使得持有资产并因此_必须_保证安全的核心合约变得更简单、更容易审计。交易者所需的所有额外功能随后可由外围合约提供。

## 数据与控制流 {#flows}

这是在执行尤尼斯瓦普 (Uniswap) 的三个主要操作时发生的数据与控制流：

1. 在不同代币之间进行兑换
2. 向市场添加流动性，并获得交易对的 ERC-20 流动性代币作为奖励
3. 销毁 ERC-20 流动性代币，并取回交易对允许交易者兑换的 ERC-20 代币

### 兑换 {#swap-flow}

这是交易者最常用的流程：

#### 调用者 {#caller}

1. 为外围 (periphery) 账户提供要兑换金额的授权额度。
2. 调用外围合约的众多兑换函数之一（具体调用哪个取决于是否涉及 ETH、交易者是指定存入的代币数量还是希望取回的代币数量等）。
   每个兑换函数都接受一个 `path`，即一个需要经过的交易所数组。

#### 在外围合约中 (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02-sol}

3. 确定路径上每个交易所需要交易的金额。
4. 遍历路径。对于沿途的每个交易所，它会发送输入代币，然后调用该交易所的 `swap` 函数。
   在大多数情况下，代币的目标地址是路径中的下一个交易对。在最后一个交易所中，目标地址是交易者提供的地址。

#### 在核心合约中 (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-2}

5. 验证核心合约没有被欺骗，并且在兑换后能够维持足够的流动性。
6. 查看除了已知储备之外，我们还有多少额外的代币。该数量就是我们收到用于兑换的输入代币数量。
7. 将输出代币发送到目标地址。
8. 调用 `_update` 以更新储备量

#### 回到外围合约 (UniswapV2Router02.sol) {#back-in-the-periphery-contract-uniswapv2router02-sol}

9. 执行任何必要的清理工作（例如，销毁 WETH 代币以取回 ETH 并发送给交易者）

### 添加流动性 {#add-liquidity-flow}

#### 调用者 {#caller-2}

1. 为外围账户提供要添加到流动性池的金额的授权额度。
2. 调用外围合约的 `addLiquidity` 函数之一。

#### 在外围合约中 (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02sol-2}

3. 如有必要，创建一个新的交易对
4. 如果存在现有的交易对，则计算要添加的代币数量。这两种代币的价值应该相等，因此新代币与现有代币的比例相同。
5. 检查金额是否可接受（调用者可以指定一个最小金额，低于该金额他们宁愿不添加流动性）
6. 调用核心合约。

#### 在核心合约中 (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-2-2}

7. 铸造流动性代币并将其发送给调用者
8. 调用 `_update` 以更新储备量

### 移除流动性 {#remove-liquidity-flow}

#### 调用者 {#caller-3}

1. 为外围账户提供要销毁的流动性代币的授权额度，以换取标的代币。
2. 调用外围合约的 `removeLiquidity` 函数之一。

#### 在外围合约中 (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02sol-3}

3. 将流动性代币发送到交易对

#### 在核心合约中 (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-3}

4. 按销毁代币的比例将标的代币发送到目标地址。例如，如果池中有 1000 个 A 代币、500 个 B 代币和 90 个流动性代币，而我们收到 9 个要销毁的代币，那么我们销毁了 10% 的流动性代币，因此我们向用户退回 100 个 A 代币和 50 个 B 代币。
5. 销毁流动性代币
6. 调用 `_update` 以更新储备量

## 核心合约 {#core-contracts}

这些是持有流动性的安全合约。

### UniswapV2Pair.sol {#uniswapv2pair}

[此合约](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol)实现了兑换代币的实际流动性池。它是尤尼斯瓦普 (Uniswap) 的核心功能。

```solidity
pragma solidity =0.5.16;

import './interfaces/IUniswapV2Pair.sol';
import './UniswapV2ERC20.sol';
import './libraries/Math.sol';
import './libraries/UQ112x112.sol';
import './interfaces/IERC20.sol';
import './interfaces/IUniswapV2Factory.sol';
import './interfaces/IUniswapV2Callee.sol';
```

这些是合约需要了解的所有接口，要么是因为合约实现了它们（`IUniswapV2Pair` 和 `UniswapV2ERC20`），要么是因为它调用了实现它们的合约。

```solidity
contract UniswapV2Pair is IUniswapV2Pair, UniswapV2ERC20 {
```

此合约继承自 `UniswapV2ERC20`，后者为流动性代币提供了 ERC-20 功能。

```solidity
    using SafeMath  for uint;
```

[SafeMath 库](https://docs.openzeppelin.com/contracts/2.x/api/math)用于避免溢出和下溢。这很重要，因为否则我们可能会遇到一个值本应是 `-1`，但实际上却是 `2^256-1` 的情况。

```solidity
    using UQ112x112 for uint224;
```

流动性池合约中的许多计算都需要分数。然而，EVM 不支持分数。
尤尼斯瓦普找到的解决方案是使用 224 位的值，其中 112 位用于整数部分，112 位用于分数部分。因此 `1.0` 表示为 `2^112`，`1.5` 表示为 `2^112 + 2^111`，依此类推。

有关此库的更多详细信息，请参阅[本文档后面的内容](#fixedpoint)。

#### 变量 {#pair-vars}

```solidity
    uint public constant MINIMUM_LIQUIDITY = 10**3;
```

为了避免除以零的情况，始终存在最小数量的流动性代币（但由零账户拥有）。该数字是 **MINIMUM_LIQUIDITY**，即一千。

```solidity
    bytes4 private constant SELECTOR = bytes4(keccak256(bytes('transfer(address,uint256)')));
```

这是 ERC-20 转账函数的 ABI 选择器。它用于在两个代币账户中转账 ERC-20 代币。

```solidity
    address public factory;
```

这是创建此流动性池的工厂合约。每个流动性池都是两个 ERC-20 代币之间的兑换，工厂是连接所有这些流动性池的中心点。

```solidity
    address public token0;
    address public token1;
```

这里是此流动性池可以兑换的两种 ERC-20 代币的合约地址。

```solidity
    uint112 private reserve0;           // 使用单个存储槽，可通过 getReserves 访问
    uint112 private reserve1;           // 使用单个存储槽，可通过 getReserves 访问
```

流动性池中每种代币类型的储备量。我们假设两者代表相同的价值量，因此每个 token0 的价值等于 reserve1/reserve0 个 token1。

```solidity
    uint32  private blockTimestampLast; // 使用单个存储槽，可通过 getReserves 访问
```

发生兑换的最后一个区块的时间戳，用于跟踪随时间变化的汇率。

以太坊合约最大的 Gas 费用之一是存储，它从合约的一次调用持续到下一次调用。每个存储单元长 256 位。因此，三个变量 `reserve0`、`reserve1` 和 `blockTimestampLast` 的分配方式使得单个存储值可以包含所有这三个变量 (112+112+32=256)。

```solidity
    uint public price0CumulativeLast;
    uint public price1CumulativeLast;
```

这些变量保存每种代币的累积成本（每种代币以另一种代币计价）。它们可用于计算一段时间内的平均汇率。

```solidity
    uint public kLast; // reserve0 * reserve1，截至最近一次流动性事件之后
```

交易对兑换决定 token0 和 token1 之间汇率的方式是在交易期间保持两个储备量的乘积不变。`kLast` 就是这个值。当流动性提供者存入或提取代币时，它会发生变化，并且由于 0.3% 的市场费用，它会略微增加。

这是一个简单的例子。请注意，为了简单起见，表格在小数点后只有三位数字，并且我们忽略了 0.3% 的交易费，因此数字并不准确。

| 事件                                        |  reserve0 |  reserve1 | reserve0 \* reserve1 | 平均汇率 (token1 / token0)              |
| ------------------------------------------- | --------: | --------: | -------------------: | --------------------------------------- |
| 初始设置                                    | 1,000.000 | 1,000.000 |            1,000,000 |                                         |
| 交易者 A 用 50 个 token0 兑换 47.619 个 token1  | 1,050.000 |   952.381 |            1,000,000 | 0.952                                   |
| 交易者 B 用 10 个 token0 兑换 8.984 个 token1   | 1,060.000 |   943.396 |            1,000,000 | 0.898                                   |
| 交易者 C 用 40 个 token0 兑换 34.305 个 token1  | 1,100.000 |   909.090 |            1,000,000 | 0.858                                   |
| 交易者 D 用 100 个 token1 兑换 109.01 个 token0 |   990.990 | 1,009.090 |            1,000,000 | 0.917                                   |
| 交易者 E 用 10 个 token0 兑换 10.079 个 token1  | 1,000.990 |   999.010 |            1,000,000 | 1.008                                   |

随着交易者提供更多的 token0，token1 的相对价值会增加，反之亦然，这是基于供求关系的。

#### 锁 {#pair-lock}

```solidity
    uint private unlocked = 1;
```

有一类安全漏洞是基于[重入滥用](https://medium.com/coinmonks/ethernaut-lvl-10-re-entrancy-walkthrough-how-to-abuse-execution-ordering-and-reproduce-the-dao-7ec88b912c14)的。尤尼斯瓦普需要转账任意 ERC-20 代币，这意味着调用可能试图滥用调用它们的尤尼斯瓦普市场的 ERC-20 合约。
通过将 `unlocked` 变量作为合约的一部分，我们可以防止函数在运行期间（在同一笔交易中）被调用。

```solidity
    modifier lock() {
```

此函数是一个[修饰符](https://docs.soliditylang.org/en/v0.8.3/contracts.html#function-modifiers)，它是一个包装在普通函数周围以某种方式改变其行为的函数。

```solidity
        require(unlocked == 1, 'UniswapV2: LOCKED');
        unlocked = 0;
```

如果 `unlocked` 等于 1，则将其设置为 0。如果它已经是 0，则回退调用，使其失败。

```solidity
        _;
```

在修饰符中，`_;` 是原始函数调用（带有所有参数）。在这里，这意味着仅当调用时 `unlocked` 为 1 时才会发生函数调用，并且在它运行期间 `unlocked` 的值为 0。

```solidity
        unlocked = 1;
    }
```

主函数返回后，释放锁。

#### 杂项函数 {#pair-misc}

```solidity
    function getReserves() public view returns (uint112 _reserve0, uint112 _reserve1, uint32 _blockTimestampLast) {
        _reserve0 = reserve0;
        _reserve1 = reserve1;
        _blockTimestampLast = blockTimestampLast;
    }
```

此函数为调用者提供兑换的当前状态。请注意，Solidity 函数[可以返回多个值](https://docs.soliditylang.org/en/v0.8.3/contracts.html#returning-multiple-values)。

```solidity
    function _safeTransfer(address token, address to, uint value) private {
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(SELECTOR, to, value));
```

此内部函数将一定数量的 ERC-20 代币从兑换处转账给其他人。`SELECTOR` 指定我们调用的函数是 `transfer(address,uint)`（见上面的定义）。

为了避免必须为代币函数导入接口，我们使用其中一个 [ABI 函数](https://docs.soliditylang.org/en/v0.8.3/units-and-global-variables.html#abi-encoding-and-decoding-functions)“手动”创建调用。

```solidity
        require(success && (data.length == 0 || abi.decode(data, (bool))), 'UniswapV2: TRANSFER_FAILED');
    }
```

ERC-20 转账调用报告失败的方式有两种：

1. 回退。如果对外部合约的调用回退，则布尔返回值为 `false`
2. 正常结束但报告失败。在这种情况下，返回值缓冲区的长度非零，并且当解码为布尔值时，它为 `false`

如果发生这两种情况中的任何一种，则回退。

#### 事件 {#pair-events}

```solidity
    event Mint(address indexed sender, uint amount0, uint amount1);
    event Burn(address indexed sender, uint amount0, uint amount1, address indexed to);
```

当流动性提供者存入流动性 (`Mint`) 或提取流动性 (`Burn`) 时，会触发这两个事件。在任何一种情况下，存入或提取的 token0 和 token1 的数量都是事件的一部分，调用我们的账户身份 (`sender`) 也是如此。在提取的情况下，事件还包括接收代币的目标 (`to`)，该目标可能与发送者不同。

```solidity
    event Swap(
        address indexed sender,
        uint amount0In,
        uint amount1In,
        uint amount0Out,
        uint amount1Out,
        address indexed to
    );
```

当交易者将一种代币兑换为另一种代币时，会触发此事件。同样，发送者和目的地可能不同。
每种代币既可以发送到兑换处，也可以从兑换处接收。

```solidity
    event Sync(uint112 reserve0, uint112 reserve1);
```

最后，无论出于何种原因，每次添加或提取代币时都会触发 `Sync`，以提供最新的储备信息（从而提供汇率）。

#### 设置函数 {#pair-setup}

这些函数应该在设置新的交易对兑换时调用一次。

```solidity
    constructor() public {
        factory = msg.sender;
    }
```

构造函数确保我们将跟踪创建该交易对的工厂地址。此信息对于 `initialize` 和工厂费用（如果存在）是必需的

```solidity
    // 在部署时由工厂调用一次
    function initialize(address _token0, address _token1) external {
        require(msg.sender == factory, 'UniswapV2: FORBIDDEN'); // 足够的检查
        token0 = _token0;
        token1 = _token1;
    }
```

此函数允许工厂（且仅允许工厂）指定此交易对将兑换的两种 ERC-20 代币。

#### 内部更新函数 {#pair-update-internal}

##### \_update {#}

```solidity
    // 更新储备量，并在每个区块的首次调用时更新价格累加器
    function _update(uint balance0, uint balance1, uint112 _reserve0, uint112 _reserve1) private {
```

每次存入或提取代币时都会调用此函数。

```solidity
        require(balance0 <= uint112(-1) && balance1 <= uint112(-1), 'UniswapV2: OVERFLOW');
```

如果 balance0 或 balance1 (uint256) 高于 uint112(-1) (=2^112-1)（因此在转换为 uint112 时会溢出并回绕到 0），则拒绝继续执行 \_update 以防止溢出。对于可以细分为 10^18 个单位的普通代币，这意味着每次兑换限制为每种代币约 5.1\*10^15 个。到目前为止，这还不是问题。

```solidity
        uint32 blockTimestamp = uint32(block.timestamp % 2**32);
        uint32 timeElapsed = blockTimestamp - blockTimestampLast; // 期望发生溢出
        if (timeElapsed > 0 && _reserve0 != 0 && _reserve1 != 0) {
```

如果经过的时间不为零，则意味着我们是该区块上的第一笔兑换交易。在这种情况下，我们需要更新成本累加器。

```solidity
            // * 永远不会溢出，且期望 + 发生溢出
            price0CumulativeLast += uint(UQ112x112.encode(_reserve1).uqdiv(_reserve0)) * timeElapsed;
            price1CumulativeLast += uint(UQ112x112.encode(_reserve0).uqdiv(_reserve1)) * timeElapsed;
        }
```

每个成本累加器都会使用最新成本（另一种代币的储备量/此代币的储备量）乘以经过的时间（以秒为单位）进行更新。要获得平均价格，您可以读取两个时间点的累积价格，然后除以它们之间的时间差。例如，假设发生以下事件序列：

| 事件                                                     |  reserve0 |  reserve1 | 时间戳 | 边际汇率 (reserve1 / reserve0) |       price0CumulativeLast |
| -------------------------------------------------------- | --------: | --------: | --------- | -------------------------------------------: | -------------------------: |
| 初始设置                                                 | 1,000.000 | 1,000.000 | 5,000     |                                        1.000 |                          0 |
| 交易者 A 存入 50 个 token0 并取回 47.619 个 token1       | 1,050.000 |   952.381 | 5,020     |                                        0.907 |                         20 |
| 交易者 B 存入 10 个 token0 并取回 8.984 个 token1        | 1,060.000 |   943.396 | 5,030     |                                        0.890 |       20+10\*0.907 = 29.07 |
| 交易者 C 存入 40 个 token0 并取回 34.305 个 token1       | 1,100.000 |   909.090 | 5,100     |                                        0.826 |    29.07+70\*0.890 = 91.37 |
| 交易者 D 存入 100 个 token1 并取回 109.01 个 token0      |   990.990 | 1,009.090 | 5,110     |                                        1.018 |    91.37+10\*0.826 = 99.63 |
| 交易者 E 存入 10 个 token0 并取回 10.079 个 token1       | 1,000.990 |   999.010 | 5,150     |                                        0.998 | 99.63+40\*1.1018 = 143.702 |

假设我们要计算时间戳 5,030 和 5,150 之间 **Token0** 的平均价格。`price0Cumulative` 的值之差为 143.702-29.07=114.632。这是两分钟（120 秒）内的平均值。因此平均价格为 114.632/120 = 0.955。

这种价格计算就是我们需要知道旧储备量大小的原因。

```solidity
        reserve0 = uint112(balance0);
        reserve1 = uint112(balance1);
        blockTimestampLast = blockTimestamp;
        emit Sync(reserve0, reserve1);
    }
```

最后，更新全局变量并触发 `Sync` 事件。

##### \_mintFee {#}

```solidity
    // 如果开启了手续费，则铸造相当于 sqrt(k) 增长量 1/6 的流动性
    function _mintFee(uint112 _reserve0, uint112 _reserve1) private returns (bool feeOn) {
```

在尤尼斯瓦普 2.0 中，交易者支付 0.30% 的费用来使用市场。该费用的大部分（交易的 0.25%）始终归流动性提供者所有。剩余的 0.05% 可以归流动性提供者所有，也可以作为协议费用归工厂指定的地址所有，用于支付尤尼斯瓦普的开发工作。

为了减少计算量（从而降低 Gas 成本），此费用仅在向流动性池中添加或移除流动性时计算，而不是在每笔交易时计算。

```solidity
        address feeTo = IUniswapV2Factory(factory).feeTo();
        feeOn = feeTo != address(0);
```

读取工厂的费用目的地。如果为零，则没有协议费用，也无需计算该费用。

```solidity
        uint _kLast = kLast; // 节省 Gas
```

`kLast` 状态变量位于存储中，因此在对合约的不同调用之间它将具有一个值。
访问存储比访问在合约函数调用结束时释放的易失性内存要昂贵得多，因此我们使用内部变量来节省 Gas。

```solidity
        if (feeOn) {
            if (_kLast != 0) {
```

流动性提供者只需通过其流动性代币的升值即可获得分成。但协议费用需要铸造新的流动性代币并将其提供给 `feeTo` 地址。

```solidity
                uint rootK = Math.sqrt(uint(_reserve0).mul(_reserve1));
                uint rootKLast = Math.sqrt(_kLast);
                if (rootK > rootKLast) {
```

如果有新的流动性可以收取协议费用。您可以在[本文后面](#math)看到平方根函数

```solidity
                    uint numerator = totalSupply.mul(rootK.sub(rootKLast));
                    uint denominator = rootK.mul(5).add(rootKLast);
                    uint liquidity = numerator / denominator;
```

这种复杂的费用计算在[白皮书](https://app.uniswap.org/whitepaper.pdf)第 5 页中进行了解释。我们知道，在计算 `kLast` 和现在之间，没有添加或移除任何流动性（因为我们每次添加或移除流动性时，在它实际改变之前都会运行此计算），因此 `reserve0 * reserve1` 的任何变化都必须来自交易费（如果没有交易费，我们将保持 `reserve0 * reserve1` 不变）。

```solidity
                    if (liquidity > 0) _mint(feeTo, liquidity);
                }
            }
```

使用 `UniswapV2ERC20._mint` 函数实际创建额外的流动性代币并将其分配给 `feeTo`。

```solidity
        } else if (_kLast != 0) {
            kLast = 0;
        }
    }
```

如果没有设置费用，则将 `kLast` 设置为零（如果它还不是零的话）。在编写此合约时，有一个 [Gas 退款功能](https://eips.ethereum.org/EIPS/eip-3298)，鼓励合约通过将不需要的存储清零来减小以太坊状态的整体大小。
此代码在可能的情况下获取该退款。

#### 外部可访问函数 {#pair-external}

请注意，虽然任何交易或合约_可以_调用这些函数，但它们被设计为从外围合约调用。如果您直接调用它们，您将无法欺骗交易对兑换，但您可能会因错误而损失价值。

##### mint {#}

```solidity
    // 这个底层函数应该由执行重要安全检查的合约来调用
    function mint(address to) external lock returns (uint liquidity) {
```

当流动性提供者向流动性池中添加流动性时，将调用此函数。它铸造额外的流动性代币作为奖励。它应该从[外围合约](#uniswapv2router02)调用，该外围合约在同一笔交易中添加流动性后调用它（因此没有其他人能够在合法所有者之前提交认领新流动性的交易）。

```solidity
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // 节省 Gas
```

这是读取返回多个值的 Solidity 函数结果的方法。我们丢弃最后返回的值，即区块时间戳，因为我们不需要它。

```solidity
        uint balance0 = IERC20(token0).balanceOf(address(this));
        uint balance1 = IERC20(token1).balanceOf(address(this));
        uint amount0 = balance0.sub(_reserve0);
        uint amount1 = balance1.sub(_reserve1);
```

获取当前余额并查看每种代币类型添加了多少。

```solidity
        bool feeOn = _mintFee(_reserve0, _reserve1);
```

计算要收取的协议费用（如果有），并相应地铸造流动性代币。因为 `_mintFee` 的参数是旧的储备量值，所以费用仅根据由于费用引起的流动性池变化来准确计算。

```solidity
        uint _totalSupply = totalSupply; // 节省 Gas，必须在这里定义，因为 totalSupply 可能会在 _mintFee 中更新
        if (_totalSupply == 0) {
            liquidity = Math.sqrt(amount0.mul(amount1)).sub(MINIMUM_LIQUIDITY);
           _mint(address(0), MINIMUM_LIQUIDITY); // 永久锁定最初的 MINIMUM_LIQUIDITY 代币
```

如果这是第一次存款，则创建 `MINIMUM_LIQUIDITY` 个代币并将它们发送到零地址以锁定它们。它们永远无法被赎回，这意味着流动性池永远不会被完全清空（这使我们在某些地方免于除以零）。`MINIMUM_LIQUIDITY` 的值为一千，考虑到大多数 ERC-20 被细分为代币的 10^-18 单位（就像 ETH 被划分为 Wei 一样），这相当于单个代币价值的 10^-15。成本并不高。

在第一次存款时，我们不知道两种代币的相对价值，因此我们只需将金额相乘并取平方根，假设存款为我们提供了两种代币的同等价值。

我们可以相信这一点，因为提供同等价值符合存款人的利益，以避免因套利而损失价值。
假设两种代币的价值相同，但我们的存款人存入的 **Token1** 数量是 **Token0** 的四倍。交易者可以利用交易对兑换认为 **Token0** 更有价值这一事实从中提取价值。

| 事件                                                         | reserve0 | reserve1 | reserve0 \* reserve1 | 流动性池的价值 (reserve0 + reserve1) |
| ------------------------------------------------------------ | -------: | -------: | -------------------: | --------------------------------------: |
| 初始设置                                                     |        8 |       32 |                  256 |                                      40 |
| 交易者存入 8 个 **Token0** 代币，取回 16 个 **Token1**       |       16 |       16 |                  256 |                                      32 |

如您所见，交易者额外赚取了 8 个代币，这来自于流动性池价值的减少，从而损害了拥有它的存款人的利益。

```solidity
        } else {
            liquidity = Math.min(amount0.mul(_totalSupply) / _reserve0, amount1.mul(_totalSupply) / _reserve1);
```

在随后的每次存款中，我们已经知道两种资产之间的汇率，并且我们期望流动性提供者在两者中提供同等的价值。如果他们不这样做，我们将根据他们提供的较小价值向他们发放流动性代币作为惩罚。

无论是初始存款还是后续存款，我们提供的流动性代币数量都等于 `reserve0*reserve1` 变化的平方根，并且流动性代币的价值不会改变（除非我们收到的存款中两种类型的价值不相等，在这种情况下，“罚款”将被分配）。这是另一个具有相同价值的两种代币的示例，其中包含三笔良好的存款和一笔不良存款（仅存入一种代币类型，因此不会产生任何流动性代币）。

| 事件                      | reserve0 | reserve1 | reserve0 \* reserve1 | 流动性池价值 (reserve0 + reserve1) | 为此存款铸造的流动性代币                 | 总流动性代币           | 每个流动性代币的价值          |
| ------------------------- | -------: | -------: | -------------------: | -------------------------------: | ---------------------------------------: | ---------------------: | ----------------------------: |
| 初始设置                  |    8.000 |    8.000 |                   64 |                           16.000 |                                        8 |                      8 |                         2.000 |
| 每种类型存入四个          |   12.000 |   12.000 |                  144 |                           24.000 |                                        4 |                     12 |                         2.000 |
| 每种类型存入两个          |   14.000 |   14.000 |                  196 |                           28.000 |                                        2 |                     14 |                         2.000 |
| 不等值存款                |   18.000 |   14.000 |                  252 |                           32.000 |                                        0 |                     14 |                        ~2.286 |
| 套利后                    |  ~15.874 |  ~15.874 |                  252 |                          ~31.748 |                                        0 |                     14 |                        ~2.267 |

```solidity
        }
        require(liquidity > 0, 'UniswapV2: INSUFFICIENT_LIQUIDITY_MINTED');
        _mint(to, liquidity);
```

使用 `UniswapV2ERC20._mint` 函数实际创建额外的流动性代币并将其提供给正确的账户。

```solidity

        _update(balance0, balance1, _reserve0, _reserve1);
        if (feeOn) kLast = uint(reserve0).mul(reserve1); // reserve0 和 reserve1 是最新的
        emit Mint(msg.sender, amount0, amount1);
    }
```

更新状态变量（`reserve0`、`reserve1`，如果需要还有 `kLast`）并触发相应的事件。

##### burn {#}

```solidity
    // 这个底层函数应该由执行重要安全检查的合约来调用
    function burn(address to) external lock returns (uint amount0, uint amount1) {
```

当提取流动性并且需要销毁相应的流动性代币时，将调用此函数。
它也应该[从外围账户](#uniswapv2router02)调用。

```solidity
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // 节省 Gas
        address _token0 = token0;                                // 节省 Gas
        address _token1 = token1;                                // 节省 Gas
        uint balance0 = IERC20(_token0).balanceOf(address(this));
        uint balance1 = IERC20(_token1).balanceOf(address(this));
        uint liquidity = balanceOf[address(this)];
```

外围合约在调用之前将要销毁的流动性转账到此合约。这样我们就知道要销毁多少流动性，并且我们可以确保它被销毁。

```solidity
        bool feeOn = _mintFee(_reserve0, _reserve1);
        uint _totalSupply = totalSupply; // 节省 Gas，必须在这里定义，因为 totalSupply 可能会在 _mintFee 中更新
        amount0 = liquidity.mul(balance0) / _totalSupply; // 使用余额确保按比例分配
        amount1 = liquidity.mul(balance1) / _totalSupply; // 使用余额确保按比例分配
        require(amount0 > 0 && amount1 > 0, 'UniswapV2: INSUFFICIENT_LIQUIDITY_BURNED');
```

流动性提供者收到两种代币的同等价值。这样我们就不会改变汇率。

```solidity
        _burn(address(this), liquidity);
        _safeTransfer(_token0, to, amount0);
        _safeTransfer(_token1, to, amount1);
        balance0 = IERC20(_token0).balanceOf(address(this));
        balance1 = IERC20(_token1).balanceOf(address(this));

        _update(balance0, balance1, _reserve0, _reserve1);
        if (feeOn) kLast = uint(reserve0).mul(reserve1); // reserve0 和 reserve1 是最新的
        emit Burn(msg.sender, amount0, amount1, to);
    }

```

`burn` 函数的其余部分是上面 `mint` 函数的镜像。

##### swap {#}

```solidity
    // 这个底层函数应该由执行重要安全检查的合约来调用
    function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external lock {
```

此函数也应该从[外围合约](#uniswapv2router02)调用。

```solidity
        require(amount0Out > 0 || amount1Out > 0, 'UniswapV2: INSUFFICIENT_OUTPUT_AMOUNT');
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // 节省 Gas
        require(amount0Out < _reserve0 && amount1Out < _reserve1, 'UniswapV2: INSUFFICIENT_LIQUIDITY');

        uint balance0;
        uint balance1;
        { // _token{0,1} 的作用域，避免堆栈过深错误
```

局部变量可以存储在内存中，或者如果数量不多，可以直接存储在堆栈上。
如果我们能限制数量以便使用堆栈，我们就会使用更少的 Gas。有关更多详细信息，请参阅[黄皮书，即正式的以太坊规范](https://ethereum.github.io/yellowpaper/paper.pdf)，第 26 页，等式 298。

```solidity
            address _token0 = token0;
            address _token1 = token1;
            require(to != _token0 && to != _token1, 'UniswapV2: INVALID_TO');
            if (amount0Out > 0) _safeTransfer(_token0, to, amount0Out); // 乐观地转账代币
            if (amount1Out > 0) _safeTransfer(_token1, to, amount1Out); // 乐观地转账代币
```

这种转账是乐观的，因为我们在确定满足所有条件之前就进行了转账。这在以太坊中是可以的，因为如果在调用后期未满足条件，我们将回退它及其创建的任何更改。

```solidity
            if (data.length > 0) IUniswapV2Callee(to).uniswapV2Call(msg.sender, amount0Out, amount1Out, data);
```

如果请求，则通知接收者有关兑换的信息。

```solidity
            balance0 = IERC20(_token0).balanceOf(address(this));
            balance1 = IERC20(_token1).balanceOf(address(this));
        }
```

获取当前余额。外围合约在调用我们进行兑换之前向我们发送代币。这使得合约很容易检查它是否被欺骗，这种检查_必须_在核心合约中进行（因为我们可能被外围合约以外的其他实体调用）。

```solidity
        uint amount0In = balance0 > _reserve0 - amount0Out ? balance0 - (_reserve0 - amount0Out) : 0;
        uint amount1In = balance1 > _reserve1 - amount1Out ? balance1 - (_reserve1 - amount1Out) : 0;
        require(amount0In > 0 || amount1In > 0, 'UniswapV2: INSUFFICIENT_INPUT_AMOUNT');
        { // reserve{0,1}Adjusted 的作用域，避免堆栈过深错误
            uint balance0Adjusted = balance0.mul(1000).sub(amount0In.mul(3));
            uint balance1Adjusted = balance1.mul(1000).sub(amount1In.mul(3));
            require(balance0Adjusted.mul(balance1Adjusted) >= uint(_reserve0).mul(_reserve1).mul(1000**2), 'UniswapV2: K');
```

这是一项健全性检查，以确保我们不会在兑换中遭受损失。在任何情况下，兑换都不应减少 `reserve0*reserve1`。这也是我们确保在兑换时发送 0.3% 费用的地方；在对 K 值进行健全性检查之前，我们将两个余额乘以 1000 减去金额乘以 3，这意味着在将其 K 值与当前储备量 K 值进行比较之前，从余额中扣除了 0.3% (3/1000 = 0.003 = 0.3%)。

```solidity
        }

        _update(balance0, balance1, _reserve0, _reserve1);
        emit Swap(msg.sender, amount0In, amount1In, amount0Out, amount1Out, to);
    }
```

更新 `reserve0` 和 `reserve1`，并在必要时更新价格累加器和时间戳，并触发事件。

##### 同步 (Sync) 或 Skim {#}

实际余额可能会与交易对兑换认为其拥有的储备量不同步。
没有合约的同意，无法提取代币，但存款则是另一回事。账户可以在不调用 `mint` 或 `swap` 的情况下将代币转账到兑换处。

在这种情况下，有两种解决方案：

- `sync`，将储备量更新为当前余额
- `skim`，提取额外金额。请注意，允许任何账户调用 `skim`，因为我们不知道是谁存入了代币。此信息在事件中触发，但无法从区块链访问事件。

```solidity
    // 强制余额与储备量匹配
    function skim(address to) external lock {
        address _token0 = token0; // 节省 Gas
        address _token1 = token1; // 节省 Gas
        _safeTransfer(_token0, to, IERC20(_token0).balanceOf(address(this)).sub(reserve0));
        _safeTransfer(_token1, to, IERC20(_token1).balanceOf(address(this)).sub(reserve1));
    }



    // 强制储备量与余额匹配
    function sync() external lock {
        _update(IERC20(token0).balanceOf(address(this)), IERC20(token1).balanceOf(address(this)), reserve0, reserve1);
    }
}
```

### UniswapV2Factory.sol {#uniswapv2factory}

[此合约](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Factory.sol)创建交易对兑换。

```solidity
pragma solidity =0.5.16;

import './interfaces/IUniswapV2Factory.sol';
import './UniswapV2Pair.sol';

contract UniswapV2Factory is IUniswapV2Factory {
    address public feeTo;
    address public feeToSetter;
```

这些状态变量对于实现协议费用是必需的（参见[白皮书](https://app.uniswap.org/whitepaper.pdf)，第 5 页）。
`feeTo` 地址累积协议费用的流动性代币，而 `feeToSetter` 是允许将 `feeTo` 更改为不同地址的地址。

```solidity
    mapping(address => mapping(address => address)) public getPair;
    address[] public allPairs;
```

这些变量跟踪交易对，即两种代币类型之间的兑换。

第一个变量 `getPair` 是一个映射，它根据其兑换的两种 ERC-20 代币来标识交易对兑换合约。ERC-20 代币由实现它们的合约地址标识，因此键和值都是地址。要获取允许您从 `tokenA` 转换为 `tokenB` 的交易对兑换地址，您可以使用 `getPair[<tokenA address>][<tokenB address>]`（反之亦然）。

第二个变量 `allPairs` 是一个数组，其中包含此工厂创建的所有交易对兑换的地址。在以太坊中，您无法迭代映射的内容，也无法获取所有键的列表，因此此变量是了解此工厂管理哪些兑换的唯一方法。

注意：您无法迭代映射的所有键的原因是合约数据存储_很昂贵_，因此我们使用的越少越好，更改的频率越低越好。您可以创建[支持迭代的映射](https://github.com/ethereum/dapp-bin/blob/master/library/iterable_mapping.sol)，但它们需要额外的存储空间来存储键列表。在大多数应用程序中，您不需要这样做。

```solidity
    event PairCreated(address indexed token0, address indexed token1, address pair, uint);
```

当创建新的交易对兑换时，会触发此事件。它包括代币的地址、交易对兑换的地址以及工厂管理的兑换总数。

```solidity
    constructor(address _feeToSetter) public {
        feeToSetter = _feeToSetter;
    }
```

构造函数唯一做的就是指定 `feeToSetter`。工厂在启动时没有费用，只有 `feeSetter` 可以更改这一点。

```solidity
    function allPairsLength() external view returns (uint) {
        return allPairs.length;
    }
```

此函数返回兑换对的数量。

```solidity
    function createPair(address tokenA, address tokenB) external returns (address pair) {
```

这是工厂的主要函数，用于在两种 ERC-20 代币之间创建交易对兑换。请注意，任何人都可以调用此函数。您无需获得尤尼斯瓦普的许可即可创建新的交易对兑换。

```solidity
        require(tokenA != tokenB, 'UniswapV2: IDENTICAL_ADDRESSES');
        (address token0, address token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
```

我们希望新兑换的地址是确定性的，以便可以提前在链下计算（这对于[二层网络 (l2) 交易](/developers/docs/scaling/)很有用）。
为此，我们需要代币地址具有一致的顺序，无论我们接收它们的顺序如何，因此我们在这里对它们进行排序。

```solidity
        require(token0 != address(0), 'UniswapV2: ZERO_ADDRESS');
        require(getPair[token0][token1] == address(0), 'UniswapV2: PAIR_EXISTS'); // 单次检查就足够了
```

大型流动性池比小型流动性池更好，因为它们的价格更稳定。我们不希望每对代币有多个流动性池。如果已经存在兑换，则无需为同一交易对创建另一个兑换。

```solidity
        bytes memory bytecode = type(UniswapV2Pair).creationCode;
```

要创建新合约，我们需要创建它的代码（包括构造函数和将实际合约的 EVM 字节码写入内存的代码）。通常在 Solidity 中，我们只使用 `addr = new <name of contract>(<constructor parameters>)`，编译器会为我们处理一切，但要获得确定性的合约地址，我们需要使用 [CREATE2 操作码](https://eips.ethereum.org/EIPS/eip-1014)。
在编写此代码时，Solidity 尚不支持该操作码，因此必须手动获取代码。这不再是问题，因为 [Solidity 现在支持 CREATE2](https://docs.soliditylang.org/en/v0.8.3/control-structures.html#salted-contract-creations-create2)。

```solidity
        bytes32 salt = keccak256(abi.encodePacked(token0, token1));
        assembly {
            pair := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
```

当 Solidity 尚不支持某个操作码时，我们可以使用[内联汇编](https://docs.soliditylang.org/en/v0.8.3/assembly.html)来调用它。

```solidity
        IUniswapV2Pair(pair).initialize(token0, token1);
```

调用 `initialize` 函数以告诉新兑换它兑换哪两种代币。

```solidity
        getPair[token0][token1] = pair;
        getPair[token1][token0] = pair; // 反向填充映射
        allPairs.push(pair);
        emit PairCreated(token0, token1, pair, allPairs.length);
    }
```

将新的交易对信息保存在状态变量中，并触发事件以通知全世界新的交易对兑换。

```solidity
    function setFeeTo(address _feeTo) external {
        require(msg.sender == feeToSetter, 'UniswapV2: FORBIDDEN');
        feeTo = _feeTo;
    }

    function setFeeToSetter(address _feeToSetter) external {
        require(msg.sender == feeToSetter, 'UniswapV2: FORBIDDEN');
        feeToSetter = _feeToSetter;
    }
}
```

这两个函数允许 `feeSetter` 控制费用接收者（如果有），并将 `feeSetter` 更改为新地址。

### UniswapV2ERC20.sol {#uniswapv2erc20}

[此合约](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2ERC20.sol)实现了 ERC-20 流动性代币。它类似于 [欧本齐柏林 (OpenZeppelin) ERC-20 合约](/developers/tutorials/erc20-annotated-code)，因此我将仅解释不同的部分，即 `permit` 功能。

以太坊上的交易需要花费以太币 (ETH)，这相当于真金白银。如果您有 ERC-20 代币但没有 ETH，您将无法发送交易，因此您无法对它们执行任何操作。避免此问题的一种解决方案是[元交易](https://docs.uniswap.org/contracts/v2/guides/smart-contract-integration/supporting-meta-transactions)。
代币所有者签署一笔交易，允许其他人在链下提取代币，并使用互联网将其发送给接收者。拥有 ETH 的接收者随后代表所有者提交许可。

```solidity
    bytes32 public DOMAIN_SEPARATOR;
    // keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)");
    bytes32 public constant PERMIT_TYPEHASH = 0x6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9;
```

此哈希是[交易类型的标识符](https://eips.ethereum.org/EIPS/eip-712#rationale-for-typehash)。我们在这里唯一支持的是带有这些参数的 `Permit`。

```solidity
    mapping(address => uint) public nonces;
```

接收者伪造数字签名是不可行的。然而，发送同一笔交易两次是轻而易举的（这是[重放攻击](https://wikipedia.org/wiki/Replay_attack)的一种形式）。为了防止这种情况，我们使用[随机数](https://wikipedia.org/wiki/Cryptographic_nonce)。如果新的 `Permit` 的随机数不比上一个使用的随机数大一，我们假设它是无效的。

```solidity
    constructor() public {
        uint chainId;
        assembly {
            chainId := chainid
        }
```

这是检索[链标识符](https://chainid.network/)的代码。它使用一种称为 [Yul](https://docs.soliditylang.org/en/v0.8.4/yul.html) 的 EVM 汇编方言。请注意，在当前版本的 Yul 中，您必须使用 `chainid()`，而不是 `chainid`。

```solidity
        DOMAIN_SEPARATOR = keccak256(
            abi.encode(
                keccak256('EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)'),
                keccak256(bytes(name)),
                keccak256(bytes('1')),
                chainId,
                address(this)
            )
        );
    }
```

计算 EIP-712 的[域分隔符](https://eips.ethereum.org/EIPS/eip-712#rationale-for-domainseparator)。

```solidity
    function permit(address owner, address spender, uint value, uint deadline, uint8 v, bytes32 r, bytes32 s) external {
```

这是实现权限的函数。它接收相关字段以及[签名](https://yos.io/2018/11/16/ethereum-signatures/)的三个标量值（v、r 和 s）作为参数。

```solidity
        require(deadline >= block.timestamp, 'UniswapV2: EXPIRED');
```

不接受截止日期之后的交易。

```solidity
        bytes32 digest = keccak256(
            abi.encodePacked(
                '\x19\x01',
                DOMAIN_SEPARATOR,
                keccak256(abi.encode(PERMIT_TYPEHASH, owner, spender, value, nonces[owner]++, deadline))
            )
        );
```

`abi.encodePacked(...)` 是我们期望得到的消息。我们知道随机数应该是什么，因此我们不需要将其作为参数获取。

以太坊签名算法期望获得 256 位进行签名，因此我们使用 `keccak256` 哈希函数。

```solidity
        address recoveredAddress = ecrecover(digest, v, r, s);
```

从摘要和签名中，我们可以使用 [ecrecover](https://coders-errand.com/ecrecover-signature-verification-ethereum/) 获取签署它的地址。

```solidity
        require(recoveredAddress != address(0) && recoveredAddress == owner, 'UniswapV2: INVALID_SIGNATURE');
        _approve(owner, spender, value);
    }

```

如果一切正常，请将其视为 [ERC-20 授权](https://eips.ethereum.org/EIPS/eip-20#approve)。

## 外围合约 {#periphery-contracts}

外围合约是尤尼斯瓦普 (Uniswap) 的 API（应用程序接口）。它们可供外部调用，无论是来自其他合约还是去中心化应用程序 (dapp)。你可以直接调用核心合约，但这更加复杂，如果犯错可能会损失价值。核心合约仅包含确保自身不被欺骗的测试，而不包含针对其他任何人的合理性检查。这些检查都在外围合约中，因此可以根据需要进行更新。

### UniswapV2Router01.sol {#uniswapv2router01}

[这个合约](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Router01.sol)存在问题，[不应再被使用](https://docs.uniswap.org/contracts/v2/reference/smart-contracts/router-01)。幸运的是，外围合约是无状态的，并且不持有任何资产，因此很容易将其弃用并建议人们使用替代方案 `UniswapV2Router02`。

### UniswapV2Router02.sol {#uniswapv2router02}

在大多数情况下，你会通过[这个合约](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Router02.sol)使用尤尼斯瓦普。
你可以[在此处](https://docs.uniswap.org/contracts/v2/reference/smart-contracts/router-02)查看如何使用它。

```solidity
pragma solidity =0.6.6;

import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol';
import '@uniswap/lib/contracts/libraries/TransferHelper.sol';

import './interfaces/IUniswapV2Router02.sol';
import './libraries/UniswapV2Library.sol';
import './libraries/SafeMath.sol';
import './interfaces/IERC20.sol';
import './interfaces/IWETH.sol';
```

其中大部分我们要么以前遇到过，要么非常显而易见。唯一的例外是 `IWETH.sol`。尤尼斯瓦普 v2 允许对任何 ERC-20 代币对进行兑换，但以太币 (ETH) 本身并不是 ERC-20 代币。它早于该标准出现，并通过独特的机制进行转账。为了在适用于 ERC-20 代币的合约中使用 ETH，人们提出了[封装以太币 (WETH)](https://weth.tkn.eth.limo/) 合约。你向该合约发送 ETH，它会为你铸造等量的 WETH。或者你可以销毁 WETH，并换回 ETH。

```solidity
contract UniswapV2Router02 is IUniswapV2Router02 {
    using SafeMath for uint;

    address public immutable override factory;
    address public immutable override WETH;
```

路由器需要知道使用哪个工厂合约，以及对于需要 WETH 的交易，使用哪个 WETH 合约。这些值是[不可变的](https://docs.soliditylang.org/en/v0.8.3/contracts.html#constant-and-immutable-state-variables)，这意味着它们只能在构造函数中设置。这让用户确信，没有人能够更改它们以指向不够诚实的合约。

```solidity
    modifier ensure(uint deadline) {
        require(deadline >= block.timestamp, 'UniswapV2Router: EXPIRED');
        _;
    }
```

此修饰符确保有时间限制的交易（“如果可以，请在时间 Y 之前执行 X”）不会在其时间限制之后发生。

```solidity
    constructor(address _factory, address _WETH) public {
        factory = _factory;
        WETH = _WETH;
    }
```

构造函数只是设置不可变的状态变量。

```solidity
    receive() external payable {
        assert(msg.sender == WETH); // 仅通过 WETH 合约的回退函数接收 ETH
    }
```

当我们从 WETH 合约中将代币赎回为 ETH 时，会调用此函数。只有我们使用的 WETH 合约被授权执行此操作。

#### 添加流动性 {#add-liquidity}

这些函数将代币添加到交易对中，从而增加流动性池。

```solidity

    // **** 添加流动性 ****
    function _addLiquidity(
```

此函数用于计算应存入交易对的 A 和 B 代币的数量。

```solidity
        address tokenA,
        address tokenB,
```

这些是 ERC-20 代币合约的地址。

```solidity
        uint amountADesired,
        uint amountBDesired,
```

这些是流动性提供者想要存入的金额。它们也是要存入的 A 和 B 的最大数量。

```solidity
        uint amountAMin,
        uint amountBMin
```

这些是可接受的最低存入金额。如果交易无法以这些金额或更多金额进行，则回退交易。如果你不需要此功能，只需指定为零即可。

流动性提供者通常会指定一个最小值，因为他们希望将交易限制在接近当前汇率的兑换率。如果兑换率波动太大，可能意味着有改变标的价值的新闻，他们希望手动决定该怎么做。

例如，假设兑换率为一比一，流动性提供者指定了以下值：

| 参数      | 值 |
| -------------- | ----: |
| amountADesired |  1000 |
| amountBDesired |  1000 |
| amountAMin     |   900 |
| amountBMin     |   800 |

只要兑换率保持在 0.9 到 1.25 之间，交易就会发生。如果兑换率超出该范围，交易将被取消。

采取这种预防措施的原因是交易不是即时的，你提交它们，最终验证者会将它们包含在一个区块中（除非你的 Gas 价格非常低，在这种情况下，你需要提交另一个具有相同随机数和更高 Gas 价格的交易来覆盖它）。你无法控制在提交和包含之间的间隔内发生的事情。

```solidity
    ) internal virtual returns (uint amountA, uint amountB) {
```

该函数返回流动性提供者应存入的金额，以使比率等于当前储备金之间的比率。

```solidity
        // 如果交易对还不存在则创建交易对
        if (IUniswapV2Factory(factory).getPair(tokenA, tokenB) == address(0)) {
            IUniswapV2Factory(factory).createPair(tokenA, tokenB);
        }
```

如果该代币对还没有交易对，则创建它。

```solidity
        (uint reserveA, uint reserveB) = UniswapV2Library.getReserves(factory, tokenA, tokenB);
```

获取交易对中的当前储备金。

```solidity
        if (reserveA == 0 && reserveB == 0) {
            (amountA, amountB) = (amountADesired, amountBDesired);
```

如果当前储备金为空，则这是一个新的交易对。要存入的金额应与流动性提供者想要提供的金额完全相同。

```solidity
        } else {
            uint amountBOptimal = UniswapV2Library.quote(amountADesired, reserveA, reserveB);
```

如果我们需要查看金额将是多少，我们使用[此函数](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/libraries/UniswapV2Library.sol#L35)获取最佳金额。我们希望比率与当前储备金相同。

```solidity
            if (amountBOptimal <= amountBDesired) {
                require(amountBOptimal >= amountBMin, 'UniswapV2Router: INSUFFICIENT_B_AMOUNT');
                (amountA, amountB) = (amountADesired, amountBOptimal);
```

如果 `amountBOptimal` 小于流动性提供者想要存入的金额，这意味着代币 B 目前比流动性存款人认为的更有价值，因此需要较小的金额。

```solidity
            } else {
                uint amountAOptimal = UniswapV2Library.quote(amountBDesired, reserveB, reserveA);
                assert(amountAOptimal <= amountADesired);
                require(amountAOptimal >= amountAMin, 'UniswapV2Router: INSUFFICIENT_A_AMOUNT');
                (amountA, amountB) = (amountAOptimal, amountBDesired);
```

如果最佳 B 金额大于期望的 B 金额，这意味着 B 代币目前比流动性存款人认为的价值更低，因此需要更高的金额。然而，期望的金额是一个最大值，所以我们不能这样做。相反，我们计算期望的 B 代币数量对应的最佳 A 代币数量。

综合起来，我们得到这张图。假设你试图存入一千个 A 代币（蓝线）和一千个 B 代币（红线）。x 轴是兑换率，A/B。如果 x=1，它们的价值相等，你各存入一千个。如果 x=2，A 的价值是 B 的两倍（每个 A 代币可以换两个 B 代币），所以你存入一千个 B 代币，但只存入 500 个 A 代币。如果 x=0.5，情况正好相反，一千个 A 代币和五百个 B 代币。

![Graph](liquidityProviderDeposit.png)

你可以直接将流动性存入核心合约（使用 [UniswapV2Pair::mint](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol#L110)），但核心合约仅检查自身是否被欺骗，因此如果在你提交交易和执行交易之间兑换率发生变化，你将面临损失价值的风险。如果你使用外围合约，它会计算出你应该存入的金额并立即存入，因此兑换率不会改变，你也不会损失任何东西。

```solidity
    function addLiquidity(
        address tokenA,
        address tokenB,
        uint amountADesired,
        uint amountBDesired,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
```

交易可以调用此函数来存入流动性。大多数参数与上面的 `_addLiquidity` 相同，但有两个例外：

. `to` 是获得新铸造的流动性代币的地址，以显示流动性提供者在池中的份额
. `deadline` 是交易的时间限制

```solidity
    ) external virtual override ensure(deadline) returns (uint amountA, uint amountB, uint liquidity) {
        (amountA, amountB) = _addLiquidity(tokenA, tokenB, amountADesired, amountBDesired, amountAMin, amountBMin);
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
```

我们计算实际要存入的金额，然后找到流动性池的地址。为了节省 Gas，我们不通过询问工厂合约来执行此操作，而是使用库函数 `pairFor`（参见下面的库部分）

```solidity
        TransferHelper.safeTransferFrom(tokenA, msg.sender, pair, amountA);
        TransferHelper.safeTransferFrom(tokenB, msg.sender, pair, amountB);
```

将正确数量的代币从用户转账到交易对中。

```solidity
        liquidity = IUniswapV2Pair(pair).mint(to);
    }
```

作为回报，向 `to` 地址提供流动性代币，以获得池的部分所有权。核心合约的 `mint` 函数会查看它有多少额外的代币（与上次流动性变化时相比），并相应地铸造流动性。

```solidity
    function addLiquidityETH(
        address token,
        uint amountTokenDesired,
```

当流动性提供者想要为代币/ETH 交易对提供流动性时，会有一些不同之处。合约负责为流动性提供者封装 ETH。无需指定用户想要存入多少 ETH，因为用户只需在交易中发送它们（金额可在 `msg.value` 中获取）。

```solidity
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) external virtual override payable ensure(deadline) returns (uint amountToken, uint amountETH, uint liquidity) {
        (amountToken, amountETH) = _addLiquidity(
            token,
            WETH,
            amountTokenDesired,
            msg.value,
            amountTokenMin,
            amountETHMin
        );
        address pair = UniswapV2Library.pairFor(factory, token, WETH);
        TransferHelper.safeTransferFrom(token, msg.sender, pair, amountToken);
        IWETH(WETH).deposit{value: amountETH}();
        assert(IWETH(WETH).transfer(pair, amountETH));
```

为了存入 ETH，合约首先将其封装为 WETH，然后将 WETH 转账到交易对中。请注意，转账被封装在 `assert` 中。这意味着如果转账失败，此合约调用也会失败，因此封装实际上并未发生。

```solidity
        liquidity = IUniswapV2Pair(pair).mint(to);
        // 退还粉尘 ETH（如果有）
        if (msg.value > amountETH) TransferHelper.safeTransferETH(msg.sender, msg.value - amountETH);
    }
```

用户已经向我们发送了 ETH，因此如果还有任何剩余（因为另一种代币的价值低于用户的预期），我们需要发放退款。

#### 移除流动性 {#remove-liquidity}

这些函数将移除流动性并向流动性提供者付款。

```solidity
    // **** 移除流动性 ****
    function removeLiquidity(
        address tokenA,
        address tokenB,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
    ) public virtual override ensure(deadline) returns (uint amountA, uint amountB) {
```

移除流动性的最简单情况。流动性提供者同意接受的每种代币都有一个最低金额，并且必须在截止日期之前发生。

```solidity
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
        IUniswapV2Pair(pair).transferFrom(msg.sender, pair, liquidity); // 发送流动性到交易对
        (uint amount0, uint amount1) = IUniswapV2Pair(pair).burn(to);
```

核心合约的 `burn` 函数负责向用户退还代币。

```solidity
        (address token0,) = UniswapV2Library.sortTokens(tokenA, tokenB);
```

当一个函数返回多个值，但我们只对其中一些感兴趣时，这就是我们只获取这些值的方式。在 Gas 方面，这比读取一个值却从不使用它要便宜一些。

```solidity
        (amountA, amountB) = tokenA == token0 ? (amount0, amount1) : (amount1, amount0);
```

将金额从核心合约返回的方式（地址较小的代币在前）转换为用户期望的方式（对应于 `tokenA` 和 `tokenB`）。

```solidity
        require(amountA >= amountAMin, 'UniswapV2Router: INSUFFICIENT_A_AMOUNT');
        require(amountB >= amountBMin, 'UniswapV2Router: INSUFFICIENT_B_AMOUNT');
    }
```

先进行转账然后再验证其合法性是可以的，因为如果不合法，我们将回退所有状态更改。

```solidity
    function removeLiquidityETH(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) public virtual override ensure(deadline) returns (uint amountToken, uint amountETH) {
        (amountToken, amountETH) = removeLiquidity(
            token,
            WETH,
            liquidity,
            amountTokenMin,
            amountETHMin,
            address(this),
            deadline
        );
        TransferHelper.safeTransfer(token, to, amountToken);
        IWETH(WETH).withdraw(amountETH);
        TransferHelper.safeTransferETH(to, amountETH);
    }
```

移除 ETH 的流动性几乎相同，不同之处在于我们收到 WETH 代币，然后将它们赎回为 ETH 以退还给流动性提供者。

```solidity
    function removeLiquidityWithPermit(
        address tokenA,
        address tokenB,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external virtual override returns (uint amountA, uint amountB) {
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
        uint value = approveMax ? uint(-1) : liquidity;
        IUniswapV2Pair(pair).permit(msg.sender, address(this), value, deadline, v, r, s);
        (amountA, amountB) = removeLiquidity(tokenA, tokenB, liquidity, amountAMin, amountBMin, to, deadline);
    }


    function removeLiquidityETHWithPermit(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external virtual override returns (uint amountToken, uint amountETH) {
        address pair = UniswapV2Library.pairFor(factory, token, WETH);
        uint value = approveMax ? uint(-1) : liquidity;
        IUniswapV2Pair(pair).permit(msg.sender, address(this), value, deadline, v, r, s);
        (amountToken, amountETH) = removeLiquidityETH(token, liquidity, amountTokenMin, amountETHMin, to, deadline);
    }
```

这些函数中继元交易，以允许没有以太币的用户使用[许可机制](#uniswapv2erc20)从池中提款。

```solidity

    // **** 移除流动性（支持收取转账费用的代币）****
    function removeLiquidityETHSupportingFeeOnTransferTokens(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) public virtual override ensure(deadline) returns (uint amountETH) {
        (, amountETH) = removeLiquidity(
            token,
            WETH,
            liquidity,
            amountTokenMin,
            amountETHMin,
            address(this),
            deadline
        );
        TransferHelper.safeTransfer(token, to, IERC20(token).balanceOf(address(this)));
        IWETH(WETH).withdraw(amountETH);
        TransferHelper.safeTransferETH(to, amountETH);
    }

```

此函数可用于具有转账或存储费用的代币。当代币有此类费用时，我们不能依赖 `removeLiquidity` 函数来告诉我们能拿回多少代币，因此我们需要先提款，然后再获取余额。

```solidity


    function removeLiquidityETHWithPermitSupportingFeeOnTransferTokens(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external virtual override returns (uint amountETH) {
        address pair = UniswapV2Library.pairFor(factory, token, WETH);
        uint value = approveMax ? uint(-1) : liquidity;
        IUniswapV2Pair(pair).permit(msg.sender, address(this), value, deadline, v, r, s);
        amountETH = removeLiquidityETHSupportingFeeOnTransferTokens(
            token, liquidity, amountTokenMin, amountETHMin, to, deadline
        );
    }
```

最后一个函数将存储费用与元交易结合在一起。

#### 交易 {#trade}

```solidity
    // **** 兑换 ****
    // 要求初始金额已经发送到第一个交易对
    function _swap(uint[] memory amounts, address[] memory path, address _to) internal virtual {
```

此函数执行向交易者公开的函数所需的内部处理。

```solidity
        for (uint i; i < path.length - 1; i++) {
```

在我写这篇文章时，有 [388,160 种 ERC-20 代币](https://eth.blockscout.com/tokens)。如果每个代币对都有一个交易对，那将超过 1500 亿个交易对。目前，整条链[只有该数量 0.1% 的账户](https://eth.blockscout.com/stats/accountsGrowth)。相反，兑换函数支持路径的概念。交易者可以将 A 兑换为 B，将 B 兑换为 C，将 C 兑换为 D，因此不需要直接的 A-D 交易对。

这些市场上的价格往往是同步的，因为当它们不同步时，就会创造套利机会。例如，想象有三种代币 A、B 和 C。有三个交易对，每对一个。

1. 初始情况
2. 交易者出售 24.695 个 A 代币并获得 25.305 个 B 代币。
3. 交易者出售 24.695 个 B 代币换取 25.305 个 C 代币，保留约 0.61 个 B 代币作为利润。
4. 然后交易者出售 24.695 个 C 代币换取 25.305 个 A 代币，保留约 0.61 个 C 代币作为利润。交易者还有 0.61 个额外的 A 代币（交易者最终获得的 25.305 减去最初投资的 24.695）。

| 步骤 | A-B 交易对                | B-C 交易对                | A-C 交易对                |
| ---- | --------------------------- | --------------------------- | --------------------------- |
| 1    | A:1000 B:1050 A/B=1.05      | B:1000 C:1050 B/C=1.05      | A:1050 C:1000 C/A=1.05      |
| 2    | A:1024.695 B:1024.695 A/B=1 | B:1000 C:1050 B/C=1.05      | A:1050 C:1000 C/A=1.05      |
| 3    | A:1024.695 B:1024.695 A/B=1 | B:1024.695 C:1024.695 B/C=1 | A:1050 C:1000 C/A=1.05      |
| 4    | A:1024.695 B:1024.695 A/B=1 | B:1024.695 C:1024.695 B/C=1 | A:1024.695 C:1024.695 C/A=1 |

```solidity
            (address input, address output) = (path[i], path[i + 1]);
            (address token0,) = UniswapV2Library.sortTokens(input, output);
            uint amountOut = amounts[i + 1];
```

获取我们当前正在处理的交易对，对其进行排序（以便与交易对一起使用）并获取预期的输出金额。

```solidity
            (uint amount0Out, uint amount1Out) = input == token0 ? (uint(0), amountOut) : (amountOut, uint(0));
```

获取预期的输出金额，按照交易对期望的方式进行排序。

```solidity
            address to = i < path.length - 2 ? UniswapV2Library.pairFor(factory, output, path[i + 2]) : _to;
```

这是最后一次兑换吗？如果是，将交易收到的代币发送到目的地。如果不是，将其发送到下一个交易对。

```solidity

            IUniswapV2Pair(UniswapV2Library.pairFor(factory, input, output)).swap(
                amount0Out, amount1Out, to, new bytes(0)
            );
        }
    }
```

实际调用交易对来兑换代币。我们不需要回调来获知兑换情况，因此我们不在该字段中发送任何字节。

```solidity
    function swapExactTokensForTokens(
```

此函数由交易者直接使用，以将一种代币兑换为另一种代币。

```solidity
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
```

此参数包含 ERC-20 合约的地址。如上所述，这是一个数组，因为你可能需要经过几个交易对才能从你拥有的资产兑换到你想要的资产。

Solidity 中的函数参数可以存储在 `memory` 或 `calldata` 中。如果该函数是合约的入口点，由用户（使用交易）或从不同合约直接调用，则可以直接从调用数据中获取参数的值。如果该函数在内部被调用，如上面的 `_swap`，则参数必须存储在 `memory` 中。从被调用合约的角度来看，`calldata` 是只读的。

对于诸如 `uint` 或 `address` 之类的标量类型，编译器会为我们处理存储的选择，但对于更长且更昂贵的数组，我们需要指定要使用的存储类型。

```solidity
        address to,
        uint deadline
    ) external virtual override ensure(deadline) returns (uint[] memory amounts) {
```

返回值始终在内存中返回。

```solidity
        amounts = UniswapV2Library.getAmountsOut(factory, amountIn, path);
        require(amounts[amounts.length - 1] >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
```

计算每次兑换中要购买的金额。如果结果小于交易者愿意接受的最小值，则回退交易。

```solidity
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, to);
    }
```

最后，将初始 ERC-20 代币转账到第一个交易对的账户，并调用 `_swap`。这一切都发生在同一笔交易中，因此交易对知道任何意外的代币都是此转账的一部分。

```solidity
    function swapTokensForExactTokens(
        uint amountOut,
        uint amountInMax,
        address[] calldata path,
        address to,
        uint deadline
    ) external virtual override ensure(deadline) returns (uint[] memory amounts) {
        amounts = UniswapV2Library.getAmountsIn(factory, amountOut, path);
        require(amounts[0] <= amountInMax, 'UniswapV2Router: EXCESSIVE_INPUT_AMOUNT');
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, to);
    }
```

前一个函数 `swapTokensForTokens` 允许交易者指定他愿意提供的确切输入代币数量，以及他愿意作为回报接收的最小输出代币数量。此函数执行反向兑换，它允许交易者指定他想要的输出代币数量，以及他愿意为此支付的最大输入代币数量。

在这两种情况下，交易者必须首先给这个外围合约一个授权额度，以允许它转账这些代币。

```solidity
    function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline)
        external
        virtual
        override
        payable
        ensure(deadline)
        returns (uint[] memory amounts)
    {
        require(path[0] == WETH, 'UniswapV2Router: INVALID_PATH');
        amounts = UniswapV2Library.getAmountsOut(factory, msg.value, path);
        require(amounts[amounts.length - 1] >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
        IWETH(WETH).deposit{value: amounts[0]}();
        assert(IWETH(WETH).transfer(UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]));
        _swap(amounts, path, to);
    }


    function swapTokensForExactETH(uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline)
        external
        virtual
        override
        ensure(deadline)
        returns (uint[] memory amounts)
    {
        require(path[path.length - 1] == WETH, 'UniswapV2Router: INVALID_PATH');
        amounts = UniswapV2Library.getAmountsIn(factory, amountOut, path);
        require(amounts[0] <= amountInMax, 'UniswapV2Router: EXCESSIVE_INPUT_AMOUNT');
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, address(this));
        IWETH(WETH).withdraw(amounts[amounts.length - 1]);
        TransferHelper.safeTransferETH(to, amounts[amounts.length - 1]);
    }



    function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline)
        external
        virtual
        override
        ensure(deadline)
        returns (uint[] memory amounts)
    {
        require(path[path.length - 1] == WETH, 'UniswapV2Router: INVALID_PATH');
        amounts = UniswapV2Library.getAmountsOut(factory, amountIn, path);
        require(amounts[amounts.length - 1] >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, address(this));
        IWETH(WETH).withdraw(amounts[amounts.length - 1]);
        TransferHelper.safeTransferETH(to, amounts[amounts.length - 1]);
    }


    function swapETHForExactTokens(uint amountOut, address[] calldata path, address to, uint deadline)
        external
        virtual
        override
        payable
        ensure(deadline)
        returns (uint[] memory amounts)
    {
        require(path[0] == WETH, 'UniswapV2Router: INVALID_PATH');
        amounts = UniswapV2Library.getAmountsIn(factory, amountOut, path);
        require(amounts[0] <= msg.value, 'UniswapV2Router: EXCESSIVE_INPUT_AMOUNT');
        IWETH(WETH).deposit{value: amounts[0]}();
        assert(IWETH(WETH).transfer(UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]));
        _swap(amounts, path, to);
        // 退还粉尘 ETH（如果有）
        if (msg.value > amounts[0]) TransferHelper.safeTransferETH(msg.sender, msg.value - amounts[0]);
    }
```

这四种变体都涉及 ETH 和代币之间的交易。唯一的区别是，我们要么从交易者那里收到 ETH 并用它来铸造 WETH，要么从路径中的最后一次兑换收到 WETH 并将其销毁，将产生的 ETH 发送回给交易者。

```solidity
    // **** 兑换（支持收取转账费用的代币）****
    // 要求初始金额已经发送到第一个交易对
    function _swapSupportingFeeOnTransferTokens(address[] memory path, address _to) internal virtual {
```

这是用于兑换具有转账或存储费用的代币的内部函数，以解决（[此问题](https://github.com/Uniswap/uniswap-interface/issues/835)）。

```solidity
        for (uint i; i < path.length - 1; i++) {
            (address input, address output) = (path[i], path[i + 1]);
            (address token0,) = UniswapV2Library.sortTokens(input, output);
            IUniswapV2Pair pair = IUniswapV2Pair(UniswapV2Library.pairFor(factory, input, output));
            uint amountInput;
            uint amountOutput;
            { // 作用域，避免堆栈过深错误
            (uint reserve0, uint reserve1,) = pair.getReserves();
            (uint reserveInput, uint reserveOutput) = input == token0 ? (reserve0, reserve1) : (reserve1, reserve0);
            amountInput = IERC20(input).balanceOf(address(pair)).sub(reserveInput);
            amountOutput = UniswapV2Library.getAmountOut(amountInput, reserveInput, reserveOutput);
```

由于转账费用，我们不能依赖 `getAmountsOut` 函数来告诉我们每次转账能获得多少（就像我们在调用原始 `_swap` 之前所做的那样）。相反，我们必须先转账，然后再看我们拿回了多少代币。

注意：理论上我们可以只使用此函数而不是 `_swap`，但在某些情况下（例如，如果转账最终被回退，因为最后没有足够的代币来满足所需的最小值），这最终会消耗更多的 Gas。收取转账费用的代币非常罕见，因此虽然我们需要适应它们，但没有必要让所有兑换都假设它们至少会经过其中一个。

```solidity
            }
            (uint amount0Out, uint amount1Out) = input == token0 ? (uint(0), amountOutput) : (amountOutput, uint(0));
            address to = i < path.length - 2 ? UniswapV2Library.pairFor(factory, output, path[i + 2]) : _to;
            pair.swap(amount0Out, amount1Out, to, new bytes(0));
        }
    }


    function swapExactTokensForTokensSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external virtual override ensure(deadline) {
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amountIn
        );
        uint balanceBefore = IERC20(path[path.length - 1]).balanceOf(to);
        _swapSupportingFeeOnTransferTokens(path, to);
        require(
            IERC20(path[path.length - 1]).balanceOf(to).sub(balanceBefore) >= amountOutMin,
            'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT'
        );
    }


    function swapExactETHForTokensSupportingFeeOnTransferTokens(
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    )
        external
        virtual
        override
        payable
        ensure(deadline)
    {
        require(path[0] == WETH, 'UniswapV2Router: INVALID_PATH');
        uint amountIn = msg.value;
        IWETH(WETH).deposit{value: amountIn}();
        assert(IWETH(WETH).transfer(UniswapV2Library.pairFor(factory, path[0], path[1]), amountIn));
        uint balanceBefore = IERC20(path[path.length - 1]).balanceOf(to);
        _swapSupportingFeeOnTransferTokens(path, to);
        require(
            IERC20(path[path.length - 1]).balanceOf(to).sub(balanceBefore) >= amountOutMin,
            'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT'
        );
    }


    function swapExactTokensForETHSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    )
        external
        virtual
        override
        ensure(deadline)
    {
        require(path[path.length - 1] == WETH, 'UniswapV2Router: INVALID_PATH');
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amountIn
        );
        _swapSupportingFeeOnTransferTokens(path, address(this));
        uint amountOut = IERC20(WETH).balanceOf(address(this));
        require(amountOut >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
        IWETH(WETH).withdraw(amountOut);
        TransferHelper.safeTransferETH(to, amountOut);
    }
```

这些是用于普通代币的相同变体，但它们改为调用 `_swapSupportingFeeOnTransferTokens`。

```solidity
    // **** 库函数 ****
    function quote(uint amountA, uint reserveA, uint reserveB) public pure virtual override returns (uint amountB) {
        return UniswapV2Library.quote(amountA, reserveA, reserveB);
    }

    function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut)
        public
        pure
        virtual
        override
        returns (uint amountOut)
    {
        return UniswapV2Library.getAmountOut(amountIn, reserveIn, reserveOut);
    }

    function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut)
        public
        pure
        virtual
        override
        returns (uint amountIn)
    {
        return UniswapV2Library.getAmountIn(amountOut, reserveIn, reserveOut);
    }

    function getAmountsOut(uint amountIn, address[] memory path)
        public
        view
        virtual
        override
        returns (uint[] memory amounts)
    {
        return UniswapV2Library.getAmountsOut(factory, amountIn, path);
    }

    function getAmountsIn(uint amountOut, address[] memory path)
        public
        view
        virtual
        override
        returns (uint[] memory amounts)
    {
        return UniswapV2Library.getAmountsIn(factory, amountOut, path);
    }
}
```

这些函数只是调用 [UniswapV2Library 函数](#uniswapv2library)的代理。

### UniswapV2Migrator.sol {#uniswapv2migrator}

此合约用于将交易对从旧的 v1 迁移到 v2。既然它们已经被迁移，它就不再相关了。

## 库 {#libraries}

[SafeMath 库](https://docs.openzeppelin.com/contracts/2.x/api/math)有详细的文档，因此无需在此处记录。

### Math {#math}

这个库包含一些在 Solidity 代码中通常不需要的数学函数，因此它们不是该语言的一部分。

```solidity
pragma solidity =0.5.16;

// 用于执行各种数学运算的库

library Math {
    function min(uint x, uint y) internal pure returns (uint z) {
        z = x < y ? x : y;
    }

    // 巴比伦方法 (https://wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method)
    function sqrt(uint y) internal pure returns (uint z) {
        if (y > 3) {
            z = y;
            uint x = y / 2 + 1;
```

从 x 开始，作为一个高于平方根的估计值（这就是我们需要将 1-3 作为特殊情况处理的原因）。

```solidity
            while (x < z) {
                z = x;
                x = (y / x + x) / 2;
```

获得一个更接近的估计值，即前一个估计值与我们要找平方根的数字除以前一个估计值的平均值。重复此过程，直到新估计值不低于现有估计值。有关更多详细信息，[请参见此处](https://wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method)。

```solidity
            }
        } else if (y != 0) {
            z = 1;
```

我们永远不需要零的平方根。一、二和三的平方根大约是一（我们使用整数，因此忽略小数部分）。

```solidity
        }
    }
}
```

### 定点分数 (UQ112x112) {#fixedpoint}

这个库处理分数，这通常不是以太坊算术的一部分。它通过将数字 _x_ 编码为 _x\*2^112_ 来实现这一点。这使我们能够直接使用原始的加法和减法操作码而无需更改。

```solidity
pragma solidity =0.5.16;

// 用于处理二进制定点数的库 (https://wikipedia.org/wiki/Q_(number_format))

// 范围：[0, 2**112 - 1]
// 精度：1 / 2**112

library UQ112x112 {
    uint224 constant Q112 = 2**112;
```

`Q112` 是一的编码。

```solidity
    // 将 uint112 编码为 UQ112x112
    function encode(uint112 y) internal pure returns (uint224 z) {
        z = uint224(y) * Q112; // 永远不会溢出
    }
```

因为 y 是 `uint112`，它最大只能是 2^112-1。该数字仍然可以编码为 `UQ112x112`。

```solidity
    // 将 UQ112x112 除以 uint112，返回 UQ112x112
    function uqdiv(uint224 x, uint112 y) internal pure returns (uint224 z) {
        z = x / uint224(y);
    }
}
```

如果我们除以两个 `UQ112x112` 值，结果将不再乘以 2^112。因此，我们取一个整数作为分母。我们本来需要使用类似的技巧来进行乘法，但我们不需要对 `UQ112x112` 值进行乘法。

### UniswapV2Library {#uniswapv2library}

这个库仅由外围合约使用

```solidity
pragma solidity >=0.5.0;

import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol';

import "./SafeMath.sol";

library UniswapV2Library {
    using SafeMath for uint;

    // 返回排序后的代币地址，用于处理按此顺序排序的交易对的返回值
    function sortTokens(address tokenA, address tokenB) internal pure returns (address token0, address token1) {
        require(tokenA != tokenB, 'UniswapV2Library: IDENTICAL_ADDRESSES');
        (token0, token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
        require(token0 != address(0), 'UniswapV2Library: ZERO_ADDRESS');
    }
```

按地址对两个代币进行排序，这样我们就能获得它们的交易对兑换地址。这是必要的，因为否则我们会有两种可能性，一种是参数 A,B，另一种是参数 B,A，从而导致两个兑换而不是一个。

```solidity
    // 计算交易对的 CREATE2 地址，不进行任何外部调用
    function pairFor(address factory, address tokenA, address tokenB) internal pure returns (address pair) {
        (address token0, address token1) = sortTokens(tokenA, tokenB);
        pair = address(uint(keccak256(abi.encodePacked(
                hex'ff',
                factory,
                keccak256(abi.encodePacked(token0, token1)),
                hex'96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f' // 初始化代码哈希
            ))));
    }
```

此函数计算两个代币的交易对兑换地址。该合约是使用 [CREATE2 操作码](https://eips.ethereum.org/EIPS/eip-1014)创建的，因此如果我们知道它使用的参数，就可以使用相同的算法计算地址。这比询问工厂合约要便宜得多，并且

```solidity
    // 获取并排序交易对的储备量
    function getReserves(address factory, address tokenA, address tokenB) internal view returns (uint reserveA, uint reserveB) {
        (address token0,) = sortTokens(tokenA, tokenB);
        (uint reserve0, uint reserve1,) = IUniswapV2Pair(pairFor(factory, tokenA, tokenB)).getReserves();
        (reserveA, reserveB) = tokenA == token0 ? (reserve0, reserve1) : (reserve1, reserve0);
    }
```

此函数返回交易对兑换所拥有的两个代币的储备量。请注意，它可以按任意顺序接收代币，并对它们进行排序以供内部使用。

```solidity
    // 给定某种资产的数量和交易对储备量，返回等量的另一种资产
    function quote(uint amountA, uint reserveA, uint reserveB) internal pure returns (uint amountB) {
        require(amountA > 0, 'UniswapV2Library: INSUFFICIENT_AMOUNT');
        require(reserveA > 0 && reserveB > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        amountB = amountA.mul(reserveB) / reserveA;
    }
```

如果没有涉及费用，此函数将给出你用代币 A 换取到的代币 B 的数量。此计算考虑了转账会改变汇率。

```solidity
    // 给定某种资产的输入数量和交易对储备量，返回另一种资产的最大输出数量
    function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut) internal pure returns (uint amountOut) {
```

如果使用交易对兑换没有费用，上面的 `quote` 函数非常有效。但是，如果有 0.3% 的兑换费用，你实际获得的数量会更少。此函数计算扣除兑换费用后的数量。

```solidity

        require(amountIn > 0, 'UniswapV2Library: INSUFFICIENT_INPUT_AMOUNT');
        require(reserveIn > 0 && reserveOut > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        uint amountInWithFee = amountIn.mul(997);
        uint numerator = amountInWithFee.mul(reserveOut);
        uint denominator = reserveIn.mul(1000).add(amountInWithFee);
        amountOut = numerator / denominator;
    }
```

Solidity 原生不处理分数，因此我们不能直接将数量乘以 0.997。相反，我们将分子乘以 997，分母乘以 1000，从而达到相同的效果。

```solidity
    // 给定某种资产的输出数量和交易对储备量，返回另一种资产所需的输入数量
    function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut) internal pure returns (uint amountIn) {
        require(amountOut > 0, 'UniswapV2Library: INSUFFICIENT_OUTPUT_AMOUNT');
        require(reserveIn > 0 && reserveOut > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        uint numerator = reserveIn.mul(amountOut).mul(1000);
        uint denominator = reserveOut.sub(amountOut).mul(997);
        amountIn = (numerator / denominator).add(1);
    }
```

此函数执行大致相同的操作，但它获取输出数量并提供输入。

```solidity

    // 对任意数量的交易对执行链式 getAmountOut 计算
    function getAmountsOut(address factory, uint amountIn, address[] memory path) internal view returns (uint[] memory amounts) {
        require(path.length >= 2, 'UniswapV2Library: INVALID_PATH');
        amounts = new uint[](path.length);
        amounts[0] = amountIn;
        for (uint i; i < path.length - 1; i++) {
            (uint reserveIn, uint reserveOut) = getReserves(factory, path[i], path[i + 1]);
            amounts[i + 1] = getAmountOut(amounts[i], reserveIn, reserveOut);
        }
    }

    // 对任意数量的交易对执行链式 getAmountIn 计算
    function getAmountsIn(address factory, uint amountOut, address[] memory path) internal view returns (uint[] memory amounts) {
        require(path.length >= 2, 'UniswapV2Library: INVALID_PATH');
        amounts = new uint[](path.length);
        amounts[amounts.length - 1] = amountOut;
        for (uint i = path.length - 1; i > 0; i--) {
            (uint reserveIn, uint reserveOut) = getReserves(factory, path[i - 1], path[i]);
            amounts[i - 1] = getAmountIn(amounts[i], reserveIn, reserveOut);
        }
    }
}
```

这两个函数处理在需要经过多个交易对兑换时识别值的问题。

### 转账助手 {#transfer-helper}

[这个库](https://github.com/Uniswap/uniswap-lib/blob/master/contracts/libraries/TransferHelper.sol)在 ERC-20 和以太坊转账周围添加了成功检查，以相同的方式处理回退和 `false` 值返回。

```solidity
// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity >=0.6.0;

// 用于与 ERC-20 代币交互和发送 ETH 的辅助方法，这些方法不一致地返回 true/false
library TransferHelper {
    function safeApprove(
        address token,
        address to,
        uint256 value
    ) internal {
        // bytes4(keccak256(bytes('approve(address,uint256)')));
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0x095ea7b3, to, value));

```

我们可以通过以下两种方式之一调用不同的合约：

- 使用接口定义创建函数调用
- “手动”使用[应用程序二进制接口 (ABI)](https://docs.soliditylang.org/en/v0.8.3/abi-spec.html) 创建调用。这就是代码作者决定采用的方式。

```solidity
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            'TransferHelper::safeApprove: approve failed'
        );
    }
```

为了向后兼容在 ERC-20 标准之前创建的代币，ERC-20 调用可能会因回退而失败（在这种情况下 `success` 为 `false`），或者成功并返回 `false` 值（在这种情况下有输出数据，如果你将其解码为布尔值，你会得到 `false`）。

```solidity


    function safeTransfer(
        address token,
        address to,
        uint256 value
    ) internal {
        // bytes4(keccak256(bytes('transfer(address,uint256)')));
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0xa9059cbb, to, value));
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            'TransferHelper::safeTransfer: transfer failed'
        );
    }
```

此函数实现了 [ERC-20 的转账功能](https://eips.ethereum.org/EIPS/eip-20#transfer)，允许一个账户支出由另一个账户提供的授权额度。

```solidity

    function safeTransferFrom(
        address token,
        address from,
        address to,
        uint256 value
    ) internal {
        // bytes4(keccak256(bytes('transferFrom(address,address,uint256)')));
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0x23b872dd, from, to, value));
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            'TransferHelper::transferFrom: transferFrom failed'
        );
    }
```

此函数实现了 [ERC-20 的 transferFrom 功能](https://eips.ethereum.org/EIPS/eip-20#transferfrom)，允许一个账户支出由另一个账户提供的授权额度。

```solidity

    function safeTransferETH(address to, uint256 value) internal {
        (bool success, ) = to.call{value: value}(new bytes(0));
        require(success, 'TransferHelper::safeTransferETH: ETH transfer failed');
    }
}
```

此函数将以太币转账到一个账户。任何对不同合约的调用都可以尝试发送以太币。因为我们不需要实际调用任何函数，所以我们在调用时不发送任何数据。

## 结论 {#conclusion}

这是一篇长达约 50 页的长文。如果你能读到这里，恭喜你！希望现在你已经理解了编写实际应用程序（而不是简短的示例程序）时的注意事项，并且能够更好地为自己的用例编写合约。

现在，去编写一些有用的东西，让我们大开眼界吧。

[点击此处查看我的更多作品](https://cryptodocguy.pro/)。