---
title: "Uniswap-v2 合约概览"
description: "Uniswap-v2 合约是如何工作的？ 为什么要如此编写？"
author: Ori Pomerantz
tags: [ "Solidity" ]
skill: intermediate
published: 2021-05-01
lang: zh
---

## 简介 {#introduction}

[Uniswap v2](https://app.uniswap.org/whitepaper.pdf) 可以在任何两个 ERC-20 代币之间创建一个兑换市场。 在本文中，我们将深入探讨实现此协议的合约的源代码，了解为何要如此编写协议。

### Uniswap 是做什么的？ {#what-does-uniswap-do}

一般来说有两类用户：流动性提供者和交易者。

“流动性提供者”为资金池提供两种可以兑换的代币（称为 **Token0** 和 **Token1**）。 作为回报，他们会收到第三种叫做“流动性代币”的代币，代表他们对资金池的部分所有权。

“交易者”将一种代币发送到资金池，并从流动性提供者提供的资金池中接收另一种代币（例如，发送 **Token0** 并获得 **Token1**）。 兑换汇率由资金池中 **Token0** 和 **Token1** 的相对数量决定。 此外，资金池将收取一小部分百分比作为流动性资金池的奖励。

当流动性提供者想要收回他们的代币资产时，他们可以销毁资金池代币并收回他们的代币，其中包括他们应得的奖励份额。

[点击此处查看更完整的说明](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/swaps/)。

### 为什么选择 v2？ 为什么不是 v3？ {#why-v2}

[Uniswap v3](https://app.uniswap.org/whitepaper-v3.pdf) 是一次升级，比 v2 复杂得多。 先学习 v2，然后再学习 v3 会更容易。

### 核心合约与外围合约 {#contract-types}

Uniswap v2 分为两个部分：核心和外围。 这种划分使得持有资产并因此_必须_安全的核心合约更简单、更易于审计。 交易者所需的所有额外功能都可以通过外围合约提供。

## 数据和控制流 {#flows}

当您执行 Uniswap 的三个主要操作时，会发生以下数据和控制流：

1. 在不同代币之间进行兑换
2. 向市场添加流动性，并获得交易对 ERC-20 流动性代币奖励
3. 销毁 ERC-20 流动性代币，并取回交易对允许交易者兑换的 ERC-20 代币

### 兑换 {#swap-flow}

这是交易者最常用的流程：

#### 调用者 {#caller}

1. 为外围帐户提供要兑换金额的授权额度。
2. 调用外围合约的其中一个兑换函数（调用哪个函数取决于是否涉及 ETH、交易者是指定要存入的代币数量还是指定要取回的代币数量等）。
   每个兑换函数都接受一个 `path`，即要经过的交易所数组。

#### 在外围合约 (UniswapV2Router02.sol) 中 {#in-the-periphery-contract-uniswapv2router02-sol}

3. 确定路径上每个交易所需要交易的金额。
4. 遍历路径。 对于路径上的每个交易所，它会发送输入代币，然后调用交易所的 `swap` 函数。
   在大多数情况下，代币的目标地址是路径中的下一个交易对。 在最终的交易所中，该地址是交易者提供的地址。

#### 在核心合约 (UniswapV2Pair.sol) 中 {#in-the-core-contract-uniswapv2pairsol-2}

5. 验证核心合约没有被欺骗，并且在兑换后可以保持足够的流动性。
6. 查看除了已知的储备金之外，我们还有多少额外的代币。 该金额是我们收到的用于兑换的输入代币数量。
7. 将输出代币发送到目标地址。
8. 调用 `_update` 来更新储备金金额

#### 回到外围合约 (UniswapV2Router02.sol) {#back-in-the-periphery-contract-uniswapv2router02-sol}

9. 执行任何必要的清理工作（例如，销毁 WETH 代币以取回 ETH 发送给交易者）

### 添加流动性 {#add-liquidity-flow}

#### 调用者 {#caller-2}

1. 为外围帐户提供要添加到流动性资金池的金额的授权额度。
2. 调用外围合约的其中一个 `addLiquidity` 函数。

#### 在外围合约 (UniswapV2Router02.sol) 中 {#in-the-periphery-contract-uniswapv2router02sol-2}

3. 如有必要，创建一个新的交易对
4. 如果存在现有的交易对，计算要添加的代币数量。 两种代币的价值应该相同，因此新代币与现有代币的比率也相同。
5. 检查金额是否可接受（调用者可以指定一个最低金额，低于此金额他们宁愿不添加流动性）
6. 调用核心合约。

#### 在核心合约 (UniswapV2Pair.sol) 中 {#in-the-core-contract-uniswapv2pairsol-2}

7. 铸造流动性代币并将其发送给调用者
8. 调用 `_update` 来更新储备金金额

### 移除流动性 {#remove-liquidity-flow}

#### 调用者 {#caller-3}

1. 为外围帐户提供流动性代币的授权额度，以便销毁这些代币来换取标的代币。
2. 调用外围合约的其中一个 `removeLiquidity` 函数。

#### 在外围合约 (UniswapV2Router02.sol) 中 {#in-the-periphery-contract-uniswapv2router02sol-3}

3. 将流动性代币发送到交易对

#### 在核心合约 (UniswapV2Pair.sol) 中 {#in-the-core-contract-uniswapv2pairsol-3}

4. 按与销毁代币成比例的标的代币数量发送到目标地址。 例如，如果资金池中有 1000 个 A 代币、500 个 B 代币和 90 个流动性代币，而我们收到 9 个代币进行销毁，我们销毁了 10% 的流动性代币，因此返还给用户 100 个 A 代币和 50 个 B 代币。
5. 销毁流动性代币
6. 调用 `_update` 来更新储备金金额

## 核心合约 {#core-contracts}

这些是持有流动性的安全合约。

### UniswapV2Pair.sol {#UniswapV2Pair}

[此合约](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol) 实现了用于兑换代币的实际资金池。 这是 Uniswap 的核心功能。

```solidity
pragma solidity =0.5.16;\n\nimport './interfaces/IUniswapV2Pair.sol';\nimport './UniswapV2ERC20.sol';\nimport './libraries/Math.sol';\nimport './libraries/UQ112x112.sol';\nimport './interfaces/IERC20.sol';\nimport './interfaces/IUniswapV2Factory.sol';\nimport './interfaces/IUniswapV2Callee.sol';
```

这些是该合约需要了解的所有接口，因为该合约实现了它们（`IUniswapV2Pair` 和 `UniswapV2ERC20`）或者调用了实现它们的合约。

```solidity
contract UniswapV2Pair is IUniswapV2Pair, UniswapV2ERC20 {
```

此合约继承自 `UniswapV2ERC20`，为流动性代币提供 ERC-20 功能。

```solidity
    using SafeMath  for uint;
```

[SafeMath 库](https://docs.openzeppelin.com/contracts/2.x/api/math) 用于避免溢出和下溢。 这很重要，否则我们最终可能会遇到这样的情况：一个值本应是 `-1`，但却变成了 `2^256-1`。

```solidity
    using UQ112x112 for uint224;
```

资金池合约中的许多计算都需要分数。 然而，EVM 不支持分数。
Uniswap 找到的解决方案是使用 224 位的值，其中 112 位用于整数部分，112 位用于小数部分。 所以 `1.0` 表示为 `2^112`，`1.5` 表示为 `2^112 + 2^111`，等等。

关于此库的更多详细信息，请参阅[本文档的后面部分](#FixedPoint)。

#### 变量 {#pair-vars}

```solidity
    uint public constant MINIMUM_LIQUIDITY = 10**3;
```

为避免除以零的情况，始终存在一个最小数量的流动性代币（但归属于零地址帐户）。 该数字是 **MINIMUM_LIQUIDITY**，即 1000。

```solidity
    bytes4 private constant SELECTOR = bytes4(keccak256(bytes('transfer(address,uint256)')));
```

这是 ERC-20 转账函数的 ABI 选择器。 它用于在两个代币帐户中转移 ERC-20 代币。

```solidity
    address public factory;
```

这是创建此资金池的工厂合约。 每个资金池都是两个 ERC-20 代币之间的交易所，工厂是连接所有这些资金池的中心点。

```solidity
    address public token0;\n    address public token1;
```

这些是该资金池可以兑换的两种 ERC-20 代币的合约地址。

```solidity
    uint112 private reserve0;           // 使用单个存储槽，可通过 getReserves 访问\n    uint112 private reserve1;           // 使用单个存储槽，可通过 getReserves 访问
```

资金池为每种代币类型持有的储备金。 我们假定两者代表相同数量的价值，因此每个 token0 的价值等同于 reserve1/reserve0 个 token1。

```solidity
    uint32  private blockTimestampLast; // 使用单个存储槽，可通过 getReserves 访问
```

发生兑换的最后一个区块的时间戳，用于追踪一段时间内的汇率。

以太坊合约中最大的燃料开销之一是存储，它会在合约的每次调用之间持续存在。 每个存储单元的长度为 256 位。 因此，`reserve0`、`reserve1` 和 `blockTimestampLast` 这三个变量的分配方式使得单个存储值可以包含所有这三个变量 (112+112+32=256)。

```solidity
    uint public price0CumulativeLast;\n    uint public price1CumulativeLast;
```

这些变量持有每种代币的累计价格（以另一种代币计价）。 它们可用于计算一段时间内的平均汇率。

```solidity
    uint public kLast; // reserve0 * reserve1，截至最近一次流动性事件发生后
```

交易对决定 token0 和 token1 之间汇率的方式是在交易期间保持两种储备金的乘积恒定。 `kLast` 就是这个值。 当流动性提供者存入或提取代币时，该值会发生变化，并且由于 0.3% 的市场费用，它会略有增加。

下面是一个简单的例子。 请注意，为简单起见，该表只保留小数点后三位，并且我们忽略了 0.3% 的交易费，因此数字并不准确。

| 事件                                                      |                  reserve0 |                  reserve1 | reserve0 \* reserve1 | 平均汇率 (token1 / token0) |
| ------------------------------------------------------- | ------------------------: | ------------------------: | -------------------: | ----------------------------------------- |
| 初始设置                                                    | 1,000.000 | 1,000.000 |            1,000,000 |                                           |
| 交易者 A 用 50 个 token0 兑换 47.619 个 token1  | 1,050.000 |   952.381 |            1,000,000 | 0.952                     |
| 交易者 B 用 10 个 token0 兑换 8.984 个 token1   | 1,060.000 |   943.396 |            1,000,000 | 0.898                     |
| 交易者 C 用 40 个 token0 兑换 34.305 个 token1  | 1,100.000 |   909.090 |            1,000,000 | 0.858                     |
| 交易者 D 用 100 个 token1 兑换 109.01 个 token0 |   990.990 | 1,009.090 |            1,000,000 | 0.917                     |
| 交易者 E 用 10 个 token0 兑换 10.079 个 token1  | 1,000.990 |   999.010 |            1,000,000 | 1.008                     |

随着交易者提供更多的 token0，token1 的相对价值会增加，反之亦然，这取决于供需关系。

#### 锁定 {#pair-lock}

```solidity
    uint private unlocked = 1;
```

有一类安全漏洞是基于[重入攻击滥用](https://medium.com/coinmonks/ethernaut-lvl-10-re-entrancy-walkthrough-how-to-abuse-execution-ordering-and-reproduce-the-dao-7ec88b912c14)的。 Uniswap 需要转移任意 ERC-20 代币，这意味着调用 ERC-20 合约可能会试图滥用调用它们的 Uniswap 市场。
通过在合约中包含 `unlocked` 变量，我们可以防止函数在运行时被再次调用（在同一笔交易中）。

```solidity
    modifier lock() {
```

此函数是一个[修改器](https://docs.soliditylang.org/en/v0.8.3/contracts.html#function-modifiers)，它是一个包装在普通函数周围以某种方式改变其行为的函数。

```solidity
        require(unlocked == 1, 'UniswapV2: LOCKED');\n        unlocked = 0;
```

如果 `unlocked` 等于 1，则将其设置为 0。 如果它已经是 0，则回滚调用，使其失败。

```solidity
        _;
```

在修改器中，`_;` 是原始函数调用（包含所有参数）。 此处，这意味着仅在 unlocked 变量值为 1 时调用函数，该函数调用才有效；而当函数运行时，unlocked 值为 0。

```solidity
        unlocked = 1;\n    }
```

当主函数返回后，释放锁定。

#### 其他 函数 {#pair-misc}

```solidity
    function getReserves() public view returns (uint112 _reserve0, uint112 _reserve1, uint32 _blockTimestampLast) {\n        _reserve0 = reserve0;\n        _reserve1 = reserve1;\n        _blockTimestampLast = blockTimestampLast;\n    }
```

此函数返回给调用者当前的兑换状态。 请注意，Solidity 函数[可以返回多个值](https://docs.soliditylang.org/en/v0.8.3/contracts.html#returning-multiple-values)。

```solidity
    function _safeTransfer(address token, address to, uint value) private {\n        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(SELECTOR, to, value));
```

此内部函数可以从交易所转账一定数额的 ERC20 代币给其他帐户。 SELECTOR 指定我们调用的函数是 `transfer(address,uint)`（参见上面的定义）。

为了避免必须为代币函数导入接口，我们使用[ABI 函数](https://docs.soliditylang.org/en/v0.8.3/units-and-global-variables.html#abi-encoding-and-decoding-functions)“手动”创建调用。

```solidity
        require(success && (data.length == 0 || abi.decode(data, (bool))), 'UniswapV2: TRANSFER_FAILED');\n    }
```

ERC-20 的转移调用有两种方式可能失败：

1. 回滚 如果对外部合约的调用回滚，则布尔返回值为 `false`
2. 正常结束但报告失败。 在这种情况下，返回值的缓冲为非零长度，将其解码为布尔值时，其值为 `false`

一旦出现这两种情况，转移调用就会回滚。

#### 事件 {#pair-events}

```solidity
    event Mint(address indexed sender, uint amount0, uint amount1);\n    event Burn(address indexed sender, uint amount0, uint amount1, address indexed to);
```

当流动资金提供者存入流动资金 (Mint) 或提取流动资金 (Burn) 时，会发出这两个事件。 在这两种情况下，存入或提取的 token0 和 token1 金额是事件的一部分，以及调用合约的帐户身份 (sender) 也是事件的一部分。 在提取资金时，事件中还包括获得代币的目的地址 (to)，这个地址可能与发送人不同。

```solidity
    event Swap(\n        address indexed sender,\n        uint amount0In,\n        uint amount1In,\n        uint amount0Out,\n        uint amount1Out,\n        address indexed to\n    );
```

当交易者用一种代币交换另一种代币时，会激发此事件。 同样，代币发送者和兑换后代币的存入目的帐户可能不一样。
每种代币都可以发送到交易所，或者从交易所接收。

```solidity
    event Sync(uint112 reserve0, uint112 reserve1);
```

最后，无论出于何种原因，每次存入或提取代币时都会触发 Sync 事件，以提供最新的储备金信息（从而提供汇率）。

#### 设置函数 {#pair-setup}

这些函数应在建立新的配对交易时调用。

```solidity
    constructor() public {\n        factory = msg.sender;\n    }
```

构造函数确保我们能够跟踪产生配对的工厂合约的地址。 initialize 函数和工厂交易费（如果有）需要此信息

```solidity
    // 在部署时由工厂调用一次\n    function initialize(address _token0, address _token1) external {\n        require(msg.sender == factory, 'UniswapV2: FORBIDDEN'); // 检查是否充分\n        token0 = _token0;\n        token1 = _token1;\n    }
```

这个函数允许工厂（而且只允许工厂）指定配对中进行兑换的两种 ERC-20 代币。

#### 内部更新函数 {#pair-update-internal}

##### \_update

```solidity
    // 更新储备金，并在每个区块的第一次调用时更新价格累加器\n    function _update(uint balance0, uint balance1, uint112 _reserve0, uint112 _reserve1) private {
```

每次存入或提取代币时，会调用此函数。

```solidity
        require(balance0 <= uint112(-1) && balance1 <= uint112(-1), 'UniswapV2: OVERFLOW');
```

如果 balance0 或 balance1 (uint256) 大于 uint112(-1) (=2^112-1)（因此当转换为 uint112 时会溢出并返回 0），拒绝继续执行 \_update 以防止溢出。 一般的代币可以细分成 10^18 个单元，这意味在每个交易所，每种代币的限额为 5.1\*10^15 个。 迄今为止，这并不是一个问题。

```solidity
        uint32 blockTimestamp = uint32(block.timestamp % 2**32);\n        uint32 timeElapsed = blockTimestamp - blockTimestampLast; // 期望溢出\n        if (timeElapsed > 0 && _reserve0 != 0 && _reserve1 != 0) {
```

如果流逝的时间值不是零，这意味着本交易是此区块上的第一笔兑换交易。 在这种情况下，我们需要更新累积成本值。

```solidity
            // * 从不溢出，+ 期望溢出\n            price0CumulativeLast += uint(UQ112x112.encode(_reserve1).uqdiv(_reserve0)) * timeElapsed;\n            price1CumulativeLast += uint(UQ112x112.encode(_reserve0).uqdiv(_reserve1)) * timeElapsed;\n        }
```

每个累积成本值都用最新成本值（另一个代币的储备金额/本代币的储备金额）与以秒为单位的流逝时间的乘积加以更新。 要获得平均价格，需要读取两个时间点的累计价格，并除以两个时间点之间的时间差。 例如，假设下面这些事件序列：

| 事件                                                 |                  reserve0 |                  reserve1 | 时间戳   | 边际汇率 (reserve1 / reserve0) |                                                       price0CumulativeLast |
| -------------------------------------------------- | ------------------------: | ------------------------: | ----- | --------------------------------------------: | -------------------------------------------------------------------------: |
| 初始设置                                               | 1,000.000 | 1,000.000 | 5,000 |                         1.000 |                                                                          0 |
| 交易者 A 存入 50 个代币 0 获得 47.619 个代币 1  | 1,050.000 |   952.381 | 5,020 |                         0.907 |                                                                         20 |
| 交易者 B 存入 10 个代币 0 获得 8.984 个代币 1   | 1,060.000 |   943.396 | 5,030 |                         0.890 |                       20+10\*0.907 = 29.07 |
| 交易者 C 存入 40 个代币 0 获得 34.305 个代币 1  | 1,100.000 |   909.090 | 5,100 |                         0.826 |    29.07+70\*0.890 = 91.37 |
| 交易者 D 存入 100 个代币 1 获得 109.01 个代币 0 |   990.990 | 1,009.090 | 5,110 |                         1.018 |    91.37+10\*0.826 = 99.63 |
| 交易者 E 存入 10 个代币 0 获得 10.079 个代币 1  | 1,000.990 |   999.010 | 5,150 |                         0.998 | 99.63+40\*1.1018 = 143.702 |

比如说我们想要计算时间戳 5,030 到 5,150 之间 **Token0** 的平均价格。 `price0Cumulative` 的差值为 143.702-29.07=114.632。 此为两分钟（120 秒）间的平均值。 因此，平均价格为 114.632/120 = 0.955。

此价格计算是我们需要知道原有资金储备规模的原因。

```solidity
        reserve0 = uint112(balance0);\n        reserve1 = uint112(balance1);\n        blockTimestampLast = blockTimestamp;\n        emit Sync(reserve0, reserve1);\n    }
```

最后，更新全局变量并发布一个 Sync 事件。

##### \_mintFee

```solidity
    // 如果开启了费用，则铸造相当于 sqrt(k) 增长的 1/6 的流动性\n    function _mintFee(uint112 _reserve0, uint112 _reserve1) private returns (bool feeOn) {
```

在 Uniswap 2.0 的合约中规定交易者为使用兑换市场支付 0.30% 的费用。 这笔费用的大部分（交易的 0.25%）支付给流动性提供者。 剩余的 0.05% 可以给流动性提供者，也可以给工厂指定的地址作为协议费，用于支付 Uniswap 的开发工作。

为了减少计算次数（因此减少燃料费用），仅在向资金池中增加或减少流动性时才计算该费用，而不是在每次兑换交易时都计算。

```solidity
        address feeTo = IUniswapV2Factory(factory).feeTo();\n        feeOn = feeTo != address(0);
```

读取工厂的费用支付地址。 如果返回值为零，则代表没有协议费，也不需要计算这笔费用。

```solidity
        uint _kLast = kLast; // 节省燃料
```

`kLast` 状态变量位于存储中，因此在对合约的不同调用之间它会有一个值。
访问存储比访问当对合约的函数调用结束时释放的易失性内存要昂贵得多，因此我们使用内部变量来节省燃料。

```solidity
        if (feeOn) {\n            if (_kLast != 0) {
```

流动性提供者通过其流动性代币的增值来获得他们的分成。 但是协议费用要求铸造新的流动性代币，并提供给 `feeTo` 地址。

```solidity
                uint rootK = Math.sqrt(uint(_reserve0).mul(_reserve1));\n                uint rootKLast = Math.sqrt(_kLast);\n                if (rootK > rootKLast) {
```

如果有新的流动性可以收取协议费。 您可以在[本文后面](#Math)看到平方根函数

```solidity
                    uint numerator = totalSupply.mul(rootK.sub(rootKLast));\n                    uint denominator = rootK.mul(5).add(rootKLast);\n                    uint liquidity = numerator / denominator;
```

这种复杂的费用计算方法在[白皮书](https://app.uniswap.org/whitepaper.pdf)第 5 页中作了解释。 我们知道，从计算 `kLast` 的时间到当前时间，没有添加或移除流动性（因为我们在每次添加或移除流动性之前都会运行此计算），因此 `reserve0 * reserve1` 的任何变化都必须来自交易费（没有交易费，我们会保持 `reserve0 * reserve1` 不变）。

```solidity
                    if (liquidity > 0) _mint(feeTo, liquidity);\n                }\n            }
```

使用 `UniswapV2ERC20._mint` 函数实际创建额外的流动性代币并将其分配给 `feeTo`。

```solidity
        } else if (_kLast != 0) {\n            kLast = 0;\n        }\n    }
```

如果没有费用，则将 `kLast` 设置为零（如果它还不是零）。 在编写此合约时，有一个[燃料返还功能](https://eips.ethereum.org/EIPS/eip-3298)，它鼓励合约通过清零不需要的存储来减小以太坊状态的总体大小。
此代码在可能的情况下获得该退款。

#### 外部可访问函数 {#pair-external}

请注意，虽然任何交易或合约都_可以_调用这些函数，但它们被设计为从外围合约调用。 如果您直接调用它们，您将无法欺骗交易对，但可能会因错误而遭受价值损失。

##### mint

```solidity
    // 这个底层函数应该从一个执行重要安全检查的合约中调用\n    function mint(address to) external lock returns (uint liquidity) {
```

当流动性提供者向资金池添加流动性时，会调用此函数。 它铸造额外的流动性代币作为奖励。 它应该从[一个外围合约](#UniswapV2Router02)中调用，该合约在同一笔交易中添加流动性后调用它（这样其他任何人都无法在合法所有者之前提交一笔交易来认领新的流动性）。

```solidity
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // 节省燃料
```

这是读取返回多个值的 Solidity 函数结果的方法。 我们丢弃了最后返回的值——区块时间戳，因为我们不需要它。

```solidity
        uint balance0 = IERC20(token0).balanceOf(address(this));\n        uint balance1 = IERC20(token1).balanceOf(address(this));\n        uint amount0 = balance0.sub(_reserve0);\n        uint amount1 = balance1.sub(_reserve1);
```

获取当前余额并查看每种代币类型添加的数量。

```solidity
        bool feeOn = _mintFee(_reserve0, _reserve1);
```

计算要收取的协议费（如果有），并相应地铸造流动性代币。 因为 `_mintFee` 的参数是旧的储备金值，所以费用仅基于由费用引起的资金池变化来精确计算。

```solidity
        uint _totalSupply = totalSupply; // 节省燃料，必须在此处定义，因为 totalSupply 可以在 _mintFee 中更新\n        if (_totalSupply == 0) {\n            liquidity = Math.sqrt(amount0.mul(amount1)).sub(MINIMUM_LIQUIDITY);\n           _mint(address(0), MINIMUM_LIQUIDITY); // 永久锁定第一个 MINIMUM_LIQUIDITY 代币
```

如果这是第一笔存款，会创建数量为 `MINIMUM_LIQUIDITY` 的代币并将它们发送到地址 0 进行锁定。 这些代币永远无法赎回，也就是说资金池永远不会完全变空（避免某些情况下出现分母为零错误）。 `MINIMUM_LIQUIDITY` 的值为一千，考虑到大多数 ERC-20 代币可细分为 10^-18 个单位（就像 ETH 被分为 wei 一样），这相当于单个代币价值的 10^-15。 成本不高。

在首次存入时，我们不知道两种代币的相对价值，所以我们假定两种代币都具有相同的价值，只需要将它们的数量相乘并取平方根。

我们可以相信这一点，因为提供同等价值、避免套利符合存款人的利益。
比方说，这两种代币的价值是相同的，但我们的存款人存入的 **Token1** 是 **Token0** 的四倍。 交易者可以利用交易对认为 **Token0** 更有价值这一事实来从中提取价值。

| 事件                                         | reserve0 | reserve1 | reserve0 \* reserve1 | 流动池价值 (reserve0 + reserve1) |
| ------------------------------------------ | -------: | -------: | -------------------: | ---------------------------------------------: |
| 初始设置                                       |        8 |       32 |                  256 |                                             40 |
| 交易者存入 8 个 **Token0** 代币，获得 16 个 **Token1** |       16 |       16 |                  256 |                                             32 |

如您所见，交易者额外赚取了 8 个代币，这些代币来自资金池价值的减少，损害了拥有该资金池的存款人。

```solidity
        } else {\n            liquidity = Math.min(amount0.mul(_totalSupply) / _reserve0, amount1.mul(_totalSupply) / _reserve1);
```

对于随后的每次存入，我们已经知道两种资产之间的汇率。我们期望流动性提供者提供等值的两种代币。 如果他们没有，我们根据他们提供的较低价值代币来支付他们的流动池代币以做惩罚。

无论是初始存款还是后续存款，我们提供的流动性代币数量等于 `reserve0*reserve1` 变化的平方根，并且流动性代币的价值不变（除非我们收到的存款两种代币的价值不相等，在这种情况下，“罚款”会被分配）。 下面是另一个示例，两种代币具有相同价值，进行了三次良性存入和一次不良存入（即只存入一种类型的代币，所以不会产生任何流动性代币）。

| 事件         |                                reserve0 |                                reserve1 | reserve0 \* reserve1 | 流动池价值 (reserve0 + reserve1) | 存入资金而产生的流动池代币 | 流动池代币总值 |                              每个流动池代币的值 |
| ---------- | --------------------------------------: | --------------------------------------: | -------------------: | ---------------------------------------------: | ------------: | ------: | -------------------------------------: |
| 初始设置       |                   8.000 |                   8.000 |                   64 |                         16.000 |             8 |       8 |                  2.000 |
| 每种代币存入 4 个 |                  12.000 |                  12.000 |                  144 |                         24.000 |             4 |      12 |                  2.000 |
| 每种代币存入 2 个 |                  14.000 |                  14.000 |                  196 |                         28.000 |             2 |      14 |                  2.000 |
| 不等值的存款     |                  18.000 |                  14.000 |                  252 |                         32.000 |             0 |      14 | ~2.286 |
| 套利后        | ~15.874 | ~15.874 |                  252 |        ~31.748 |             0 |      14 | ~2.267 |

```solidity
        }\n        require(liquidity > 0, 'UniswapV2: INSUFFICIENT_LIQUIDITY_MINTED');\n        _mint(to, liquidity);
```

使用 `UniswapV2ERC20._mint` 函数实际创建额外的流动性代币并将其分配给正确的帐户。

```solidity
\n        _update(balance0, balance1, _reserve0, _reserve1);\n        if (feeOn) kLast = uint(reserve0).mul(reserve1); // reserve0 和 reserve1 是最新的\n        emit Mint(msg.sender, amount0, amount1);\n    }
```

更新状态变量（`reserve0`、`reserve1`，以及如果需要的话 `kLast`）并发出相应的事件。

##### 销毁

```solidity
    // 这个底层函数应该从一个执行重要安全检查的合约中调用\n    function burn(address to) external lock returns (uint amount0, uint amount1) {
```

当流动资金被提取且相应的流动池代币需要被销毁时，将调用此函数。
它也应该从[一个外围帐户](#UniswapV2Router02)调用。

```solidity
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // 节省燃料\n        address _token0 = token0;                                // 节省燃料\n        address _token1 = token1;                                // 节省燃料\n        uint balance0 = IERC20(_token0).balanceOf(address(this));\n        uint balance1 = IERC20(_token1).balanceOf(address(this));\n        uint liquidity = balanceOf[address(this)];
```

外围合约在调用函数之前，首先将要销毁的流动资金转到本合约中。 这样，我们知道有多少流动资金需要销毁，并可以确保它被销毁。

```solidity
        bool feeOn = _mintFee(_reserve0, _reserve1);\n        uint _totalSupply = totalSupply; // 节省燃料，必须在此处定义，因为 totalSupply 可以在 _mintFee 中更新\n        amount0 = liquidity.mul(balance0) / _totalSupply; // 使用余额确保按比例分配\n        amount1 = liquidity.mul(balance1) / _totalSupply; // 使用余额确保按比例分配\n        require(amount0 > 0 && amount1 > 0, 'UniswapV2: INSUFFICIENT_LIQUIDITY_BURNED');
```

流动性提供者收到等值的两种代币。 这样不会改变兑换汇率。

```solidity
        _burn(address(this), liquidity);\n        _safeTransfer(_token0, to, amount0);\n        _safeTransfer(_token1, to, amount1);\n        balance0 = IERC20(_token0).balanceOf(address(this));\n        balance1 = IERC20(_token1).balanceOf(address(this));\n\n        _update(balance0, balance1, _reserve0, _reserve1);\n        if (feeOn) kLast = uint(reserve0).mul(reserve1); // reserve0 和 reserve1 是最新的\n        emit Burn(msg.sender, amount0, amount1, to);\n    }\n
```

`burn` 函数的其余部分是上述 `mint` 函数的镜像。

##### 兑换

```solidity
    // 这个底层函数应该从一个执行重要安全检查的合约中调用\n    function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external lock {
```

此函数也应该从[一个外围合约](#UniswapV2Router02)调用。

```solidity
        require(amount0Out > 0 || amount1Out > 0, 'UniswapV2: INSUFFICIENT_OUTPUT_AMOUNT');\n        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // 节省燃料\n        require(amount0Out < _reserve0 && amount1Out < _reserve1, 'UniswapV2: INSUFFICIENT_LIQUIDITY');\n\n        uint balance0;\n        uint balance1;\n        { // _token{0,1} 的作用域，避免堆栈过深错误
```

本地变量可以存储在内存中，或者如果变量数目不太多，直接存储进堆栈。
如果我们可以限制变量数量，那么建议使用堆栈以减少燃料消耗。 欲了解更多详情，请参阅[以太坊黄皮书（正式的以太坊规范）](https://ethereum.github.io/yellowpaper/paper.pdf)第 26 页的方程式 298。

```solidity
            address _token0 = token0;\n            address _token1 = token1;\n            require(to != _token0 && to != _token1, 'UniswapV2: INVALID_TO');\n            if (amount0Out > 0) _safeTransfer(_token0, to, amount0Out); // 乐观地转移代币\n            if (amount1Out > 0) _safeTransfer(_token1, to, amount1Out); // 乐观地转移代币
```

这种转移是乐观的，因为我们在确定所有条件都满足之前就进行了转移。 在以太坊中这样操作是可以的，原因在于如果在后面的调用中条件没有得到满足，我们可以回滚操作和造成的所有变化。

```solidity
            if (data.length > 0) IUniswapV2Callee(to).uniswapV2Call(msg.sender, amount0Out, amount1Out, data);
```

如果收到请求，则通知接收者要进行兑换。

```solidity
            balance0 = IERC20(_token0).balanceOf(address(this));\n            balance1 = IERC20(_token1).balanceOf(address(this));\n        }
```

获取当前余额。 外围合约在调用我们进行兑换之前向我们发送代币。 这让合约可以方便检查它有没有受到欺骗，这是在核心合约中_必须_进行的检查（因为除外围合约之外的其他实体也可以调用该函数）。

```solidity
        uint amount0In = balance0 > _reserve0 - amount0Out ? balance0 - (_reserve0 - amount0Out) : 0;\n        uint amount1In = balance1 > _reserve1 - amount1Out ? balance1 - (_reserve1 - amount1Out) : 0;\n        require(amount0In > 0 || amount1In > 0, 'UniswapV2: INSUFFICIENT_INPUT_AMOUNT');\n        { // reserve{0,1}Adjusted 的作用域，避免堆栈过深错误\n            uint balance0Adjusted = balance0.mul(1000).sub(amount0In.mul(3));\n            uint balance1Adjusted = balance1.mul(1000).sub(amount1In.mul(3));\n            require(balance0Adjusted.mul(balance1Adjusted) >= uint(_reserve0).mul(_reserve1).mul(1000**2), 'UniswapV2: K');
```

这是一项健全性检查，确保我们不会因兑换而损失代币。 在任何情况下兑换都不应减少 `reserve0*reserve1`。 这也是我们确保在兑换中收取 0.3% 费用的地方；在对 K 值进行健全性检查之前，我们将两个余额乘以 1000 再减去金额乘以 3，这意味着在将其 K 值与当前储备金的 K 值进行比较之前，从余额中扣除了 0.3% (3/1000 = 0.003 = 0.3%)。

```solidity
        }\n\n        _update(balance0, balance1, _reserve0, _reserve1);\n        emit Swap(msg.sender, amount0In, amount1In, amount0Out, amount1Out, to);\n    }
```

更新 `reserve0` 和 `reserve1`，并在必要时更新价格累加器和时间戳，然后发出一个事件。

##### 同步或提取

实际余额有可能与交易对认为的储备金余额没有同步。
没有合约的同意就无法提取代币，但存款是另一回事。 帐户可以将代币转移到交易所，而无需调用 `mint` 或 `swap`。

在这种情况下，有两种解决办法：

- `sync`，将储备金更新为当前余额
- `skim`，提取额外的金额。 请注意任何帐户都可以调用 `skim` 函数，因为无法知道是谁存入的代币。 此信息是在一个事件中发布的，但这些事件无法从区块链中访问。

```solidity
    // 强制余额与储备金匹配\n    function skim(address to) external lock {\n        address _token0 = token0; // 节省燃料\n        address _token1 = token1; // 节省燃料\n        _safeTransfer(_token0, to, IERC20(_token0).balanceOf(address(this)).sub(reserve0));\n        _safeTransfer(_token1, to, IERC20(_token1).balanceOf(address(this)).sub(reserve1));\n    }\n\n\n\n    // 强制储备金与余额匹配\n    function sync() external lock {\n        _update(IERC20(token0).balanceOf(address(this)), IERC20(token1).balanceOf(address(this)), reserve0, reserve1);\n    }\n}
```

### UniswapV2Factory.sol {#UniswapV2Factory}

[此合约](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Factory.sol) 创建交易对。

```solidity
pragma solidity =0.5.16;\n\nimport './interfaces/IUniswapV2Factory.sol';\nimport './UniswapV2Pair.sol';\n\ncontract UniswapV2Factory is IUniswapV2Factory {\n    address public feeTo;\n    address public feeToSetter;
```

这些状态变量是执行协议费用所必需的（请见[白皮书](https://app.uniswap.org/whitepaper.pdf)的第 5 页）。
`feeTo` 地址用于累积流动性代币以收取协议费，而 `feeToSetter` 地址可用于将 `feeTo` 更改为不同地址。

```solidity
    mapping(address => mapping(address => address)) public getPair;\n    address[] public allPairs;
```

这些变量用以跟踪交易对，即两种代币之间的兑换。

第一个变量 `getPair` 是一个映射，它根据兑换的两种 ERC-20 代币来识别交易对合约。 ERC-20 代币通过实现它们的合约的地址来识别，因此密钥和值都是地址。 为了获取能让您将 `tokenA` 兑换成 `tokenB` 的交易对地址，您可以使用 `getPair[<tokenA 地址>][<tokenB 地址>]`（或反过来）。

第二个变量 `allPairs` 是一个数组，其中包括该工厂创建的所有交易对的地址。 在以太坊中，无法迭代映射内容，或获取所有密钥的列表，所以，该变量是了解此工厂管理哪些交易所的唯一方式。

注意：不能迭代所有映射密钥的原因是合约数据存储费用昂贵，所以我们越少用存储越好，且越少改变\n越好。 您可以创建[支持迭代的映射](https://github.com/ethereum/dapp-bin/blob/master/library/iterable_mapping.sol)，但这需要额外的存储来存放密钥列表。 但在大多数应用程序中并不需要。

```solidity
    event PairCreated(address indexed token0, address indexed token1, address pair, uint);
```

当新的交易对创建时，将激发此事件。 它包括代币地址、交易对地址以及工厂管理的交易所总数。

```solidity
    constructor(address _feeToSetter) public {\n        feeToSetter = _feeToSetter;\n    }
```

构造函数做的唯一事情是指定 `feeToSetter`。 工厂开始时没有费用，只有 `feeSetter` 可以改变这种情况。

```solidity
    function allPairsLength() external view returns (uint) {\n        return allPairs.length;\n    }
```

此函数返回交易对的数量。

```solidity
    function createPair(address tokenA, address tokenB) external returns (address pair) {
```

这是工厂的主要函数，可以在两个 ERC-20 代币之间创建交易对。 注意，任何人都可以调用此函数。 不需要 Uniswap 许可就能创建新的交易对。

```solidity
        require(tokenA != tokenB, 'UniswapV2: IDENTICAL_ADDRESSES');\n        (address token0, address token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
```

我们希望新交易所的地址是可以确定的，这样就可以在链下提前计算（这对于[二层网络交易](/developers/docs/scaling/)来说比较有用）。
为此，无论收到代币地址的顺序如何，我们需要代币地址始终按顺序排列，因此我们在此处对它们排序。

```solidity
        require(token0 != address(0), 'UniswapV2: ZERO_ADDRESS');\n        require(getPair[token0][token1] == address(0), 'UniswapV2: PAIR_EXISTS'); // 单次检查就足够了
```

大流动资金池优于小流动资金池，因为其价格比较稳定。 我们不希望每一对代币有多个流动性池。 如果已经有一个交易所，则无需为相同代币对创建另一个交易所。

```solidity
        bytes memory bytecode = type(UniswapV2Pair).creationCode;
```

要创建新合约，我们需要使用创建它的代码（包括构造函数和写入用于存储实际合约 EVM 字节码的代码）。 通常在 Solidity 中，我们只使用 `addr = new <name of contract>(<constructor parameters>)`，编译器会为我们处理一切，但要获得确定性的合约地址，我们需要使用 [CREATE2 操作码](https://eips.ethereum.org/EIPS/eip-1014)。
在编写这个代码时，Solidity 还不支持该操作码，因此需要手动获取该代码。 这不再是问题，因为 [Solidity 现在支持 CREATE2](https://docs.soliditylang.org/en/v0.8.3/control-structures.html#salted-contract-creations-create2)。

```solidity
        bytes32 salt = keccak256(abi.encodePacked(token0, token1));\n        assembly {\n            pair := create2(0, add(bytecode, 32), mload(bytecode), salt)\n        }
```

当 Solidity 尚不支持某个操作码时，我们可以使用[内联汇编](https://docs.soliditylang.org/en/v0.8.3/assembly.html)来调用它。

```solidity
        IUniswapV2Pair(pair).initialize(token0, token1);
```

调用 `initialize` 函数来告诉新交易所可以兑换哪两种代币。

```solidity
        getPair[token0][token1] = pair;\n        getPair[token1][token0] = pair; // 反向填充映射\n        allPairs.push(pair);\n        emit PairCreated(token0, token1, pair, allPairs.length);
```

在状态变量中保存新的配对信息，并激发一个事件来告知外界新的配对交易合约已生成。

```solidity
    function setFeeTo(address _feeTo) external {\n        require(msg.sender == feeToSetter, 'UniswapV2: FORBIDDEN');\n        feeTo = _feeTo;\n    }\n\n    function setFeeToSetter(address _feeToSetter) external {\n        require(msg.sender == feeToSetter, 'UniswapV2: FORBIDDEN');\n        feeToSetter = _feeToSetter;\n    }\n}
```

这两个函数允许 `feeSetter` 管理费用接收人（如果有）并将 `feeSetter` 更改为新地址。

### UniswapV2ERC20.sol {#UniswapV2ERC20}

[此合约](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2ERC20.sol) 实现了 ERC-20 流动性代币。 它类似于 [OpenZeppelin ERC-20 合约](/developers/tutorials/erc20-annotated-code)，所以我只解释不同的部分，即 `permit` 功能。

以太坊上的交易需要花费以太币 (ETH)，它等同于真实货币。 如果你有 ERC-20 代币但没有 ETH，就无法发送交易，因而不能用代币做任何事情。 避免此问题的一个解决方案是[元交易](https://docs.uniswap.org/contracts/v2/guides/smart-contract-integration/supporting-meta-transactions)。
代币的所有者签署一个交易，允许其他人从链上提取代币，并通过网络发送给接收人。 拥有 ETH 的接收人可以代表所有者提交许可。

```solidity
    bytes32 public DOMAIN_SEPARATOR;\n    // keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)");\n    bytes32 public constant PERMIT_TYPEHASH = 0x6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9;
```

此哈希是[交易类型的标识符](https://eips.ethereum.org/EIPS/eip-712#rationale-for-typehash)。 在这里，我们仅支持带有这些参数的 `Permit`。

```solidity
    mapping(address => uint) public nonces;
```

接收人无法伪造数字签名。 但是，可以轻易地将同一笔交易发送两次（这是一种[重放攻击](https://wikipedia.org/wiki/Replay_attack)）。 为了防止这种情况，我们使用[随机数](https://wikipedia.org/wiki/Cryptographic_nonce)。 如果新 `Permit` 的随机数不是上次使用的随机数加一，我们认为它无效。

```solidity
    constructor() public {\n        uint chainId;\n        assembly {\n            chainId := chainid\n        }
```

这是获取[链标识符](https://chainid.network/)的代码。 它使用一种名为 [Yul](https://docs.soliditylang.org/en/v0.8.4/yul.html) 的 EVM 汇编方言。 请注意，在当前版本 Yul 中，必须使用 `chainid()`，而非 `chainid`。

```solidity
        DOMAIN_SEPARATOR = keccak256(\n            abi.encode(\n                keccak256('EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)'),\n                keccak256(bytes(name)),\n                keccak256(bytes('1')),\n                chainId,\n                address(this)\n            )\n        );\n    }
```

计算 EIP-712 的[域分隔符](https://eips.ethereum.org/EIPS/eip-712#rationale-for-domainseparator)。

```solidity
    function permit(address owner, address spender, uint value, uint deadline, uint8 v, bytes32 r, bytes32 s) external {
```

这是实现许可功能的函数。 它接收相关字段作为参数，以及[签名](https://yos.io/2018/11/16/ethereum-signatures/)的三个标量值（v、r 和 s）。

```solidity
        require(deadline >= block.timestamp, 'UniswapV2: EXPIRED');
```

截止日期后不接受交易。

```solidity
        bytes32 digest = keccak256(\n            abi.encodePacked(\n                '\\x19\\x01',\n                DOMAIN_SEPARATOR,\n                keccak256(abi.encode(PERMIT_TYPEHASH, owner, spender, value, nonces[owner]++, deadline))\n            )\n        );
```

`abi.encodePacked(...)` 是我们预计将收到的信息。 我们知道随机数应该是什么，所以不需要将它作为一个参数。

以太坊签名算法预计获得 256 位用于签名，所以我们使用 `keccak256` 哈希函数。

```solidity
        address recoveredAddress = ecrecover(digest, v, r, s);
```

从摘要和签名中，我们可以使用 [ecrecover](https://coders-errand.com/ecrecover-signature-verification-ethereum/) 获取签署它的地址。

```solidity
        require(recoveredAddress != address(0) && recoveredAddress == owner, 'UniswapV2: INVALID_SIGNATURE');\n        _approve(owner, spender, value);\n    }\n
```

如果一切正常，则将其视为[一个 ERC-20 批准](https://eips.ethereum.org/EIPS/eip-20#approve)。

## 外围合约 {#periphery-contracts}

外围合约是用于 Uniswap 的 API（应用程序接口）。 它们可用于外部调用，无论是来自其他合约还是去中心化应用程序。 您可以直接调用核心合约但更为复杂，如果您出错，则可能会损失价值。 核心合约只包含确保它们不会遭受欺骗的测试，不会对其他调用者进行健全性检查。 它们在外围，因此可以根据需要进行更新。

### UniswapV2Router01.sol {#UniswapV2Router01}

[此合约](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Router01.sol) 存在问题，[不应再使用](https://docs.uniswap.org/contracts/v2/reference/smart-contracts/router-01)。 幸运的是，外围合约无状态，也不拥有任何资产，弃用外围合约比较容易。建议使用 `UniswapV2Router02` 来替代。

### UniswapV2Router02.sol {#UniswapV2Router02}

在大多数情况下，您会通过[此合约](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Router02.sol)使用 Uniswap。
您可以在[此处](https://docs.uniswap.org/contracts/v2/reference/smart-contracts/router-02)查看如何使用它。

```solidity
pragma solidity =0.6.6;\n\nimport '@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol';\nimport '@uniswap/lib/contracts/libraries/TransferHelper.sol';\n\nimport './interfaces/IUniswapV2Router02.sol';\nimport './libraries/UniswapV2Library.sol';\nimport './libraries/SafeMath.sol';\nimport './interfaces/IERC20.sol';\nimport './interfaces/IWETH.sol';
```

其中大部分我们都曾遇到过，或相当明显。 一个例外是 `IWETH.sol`。 Uniswap v2 允许兑换任意一对 ERC-20 代币，但以太币 (ETH) 本身并不是 ERC-20 代币。 它早于该标准出现，并采用独特的机制转换。 为了在适用于 ERC-20 代币的合约中使用 ETH，人们制定出[包装以太币 (WETH)](https://weth.tkn.eth.limo/) 合约。 你发送 ETH 到该合约，它会为你铸造相同金额的 WETH。 或者你可以销毁 WETH，然后换回 ETH。

```solidity
contract UniswapV2Router02 is IUniswapV2Router02 {\n    using SafeMath for uint;\n\n    address public immutable override factory;\n    address public immutable override WETH;
```

路由需要知道使用哪个工厂，以及对于需要 WETH 的交易，要使用什么 WETH 合约。 这些值是[不可变的](https://docs.soliditylang.org/en/v0.8.3/contracts.html#constant-and-immutable-state-variables)，意味着它们只能在构造函数中设置。 这使得用户相信没有人能够改变这些值，让它们指向有风险的合约。

```solidity
    modifier ensure(uint deadline) {\n        require(deadline >= block.timestamp, 'UniswapV2Router: EXPIRED');\n        _;\n    }
```

此修改函数确保有时间限制的交易（“如果可以，请在 Y 之前执行 X”）不会在时限后发生。

```solidity
    constructor(address _factory, address _WETH) public {\n        factory = _factory;\n        WETH = _WETH;\n    }
```

构造函数仅用于设置不可变的状态变量。

```solidity
    receive() external payable {\n        assert(msg.sender == WETH); // 只接受来自 WETH 合约的回退函数的 ETH\n    }
```

当我们将代币从 WETH 合约换回 ETH 时，需要调用此函数。 只有我们使用的 WETH 合约才有权完成此操作。

#### 添加流动性 {#add-liquidity}

这些函数添加代币进行配对交易，从而增大了流动资金池。

```solidity
\n    // **** 添加流动性 ****\n    function _addLiquidity(
```

此函数用于计算应存入交易对的 A 代币和 B 代币的金额。

```solidity
        address tokenA,\n        address tokenB,
```

这些是 ERC-20 代币合约的地址。

```solidity
        uint amountADesired,\n        uint amountBDesired,
```

这些是流动性提供者想要存入的代币数额。 它们也是要存入的代币 A 和 B 的最大金额。

```solidity
        uint amountAMin,\n        uint amountBMin
```

这些是可接受的最低存款数额。 如果在达到最小金额或更高金额时交易无法完成，则会回滚交易。 如果不想要此功能，将它们设定为零即可。

流动性提供者指定最低金额，往往是因为他们想要限制交易汇率，使其在与当前汇率接近。 如果汇率波动太大，可能意味着基础价值可能发生改变，流动性提供者需要自己决定采取什么措施。

例如，想象汇率是一比一时，流动性提供者指定了以下值：

| 参数             | Value |
| -------------- | ----: |
| amountADesired |  1000 |
| amountBDesired |  1000 |
| amountAMin     |   900 |
| amountBMin     |   800 |

只要汇率保持在 0.9 至 1.25 之间，交易就会进行。 如果汇率超出这个范围，交易将被取消。

采取这种预防措施的原因是交易不是即时的，您提交它们后，最终会有一个验证者将其包含在一个区块中（除非您的燃料价格非常低，在这种情况下，您需要提交另一笔具有相同随机数和更高燃料价格的交易来覆盖它）。 在提交交易和交易包含到区块中之间发生的事情是无法控制的。

```solidity
    ) internal virtual returns (uint amountA, uint amountB) {
```

该函数返回流动性提供者应存入的金额，存入该金额是为了让比率等于当前储备金之间的比率。

```solidity
        // 如果该交易对尚不存在，则创建它\n        if (IUniswapV2Factory(factory).getPair(tokenA, tokenB) == address(0)) {\n            IUniswapV2Factory(factory).createPair(tokenA, tokenB);\n        }
```

如果还没有此代币对的兑换交易，则创建一个。

```solidity
        (uint reserveA, uint reserveB) = UniswapV2Library.getReserves(factory, tokenA, tokenB);
```

获取配对中的当前储备金。

```solidity
        if (reserveA == 0 && reserveB == 0) {\n            (amountA, amountB) = (amountADesired, amountBDesired);
```

如果当前储备金为空，那么这是一笔新的配对交易。 存入的金额应与流动性提供者想要提供的金额完全相同。

```solidity
        } else {\n            uint amountBOptimal = UniswapV2Library.quote(amountADesired, reserveA, reserveB);
```

如果我们需要查看金额将是多少，我们使用[此函数](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/libraries/UniswapV2Library.sol#L35)获取最佳金额。 我们想要与当前储备相同的比率。

```solidity
            if (amountBOptimal <= amountBDesired) {\n                require(amountBOptimal >= amountBMin, 'UniswapV2Router: INSUFFICIENT_B_AMOUNT');\n                (amountA, amountB) = (amountADesired, amountBOptimal);
```

如果 `amountBOptimal` 小于流动性提供者想要存入的金额，意味着代币 B 目前比流动性存款人所认为的价值更高，所以需要更少的金额。

```solidity
            } else {\n                uint amountAOptimal = UniswapV2Library.quote(amountBDesired, reserveB, reserveA);\n                assert(amountAOptimal <= amountADesired);\n                require(amountAOptimal >= amountAMin, 'UniswapV2Router: INSUFFICIENT_A_AMOUNT');\n                (amountA, amountB) = (amountAOptimal, amountBDesired);
```

如果 B 代币的最佳金额大于想要存入的 B 代币金额，意味着代币 B 目前比流动性存款人所认为的价值更低，所以需要更多的金额。 然而，所需金额是一个最大值，因此我们不能这样做。 相反，我们为所需数量的 B 代币计算最佳数量的 A 代币。

把数值汇总起来，我们就会得到这张图表。 假定你正在试图存入 1000 个 A 代币（蓝线）和 1000 个 B 代币（红线）。 x 轴是汇率，A/B。 如果 x=1，两种代币价值相等，每种代币各存入 1000 个。 如果 x=2，A 的价值是 B 的两倍（每个 A 代币可换两个 B 代币），因此你存入 1000 个 B 代币，但只能存入 500 个 A 代币。 如果是 x=0.5，情况就会逆转，即可存 1000 个 A 代币或 500 个 B 代币。

![图表](liquidityProviderDeposit.png)

您可以直接将流动性存入核心合约（使用 [UniswapV2Pair::mint](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol#L110)），但核心合约只检查自己是否被欺骗，因此如果在您提交交易和交易执行之间汇率发生变化，您将面临价值损失的风险。 如果使用外围合约，它会计算您应该存入的金额并会立即存入，所以汇率不会改变，您不会有任何损失。

```solidity
    function addLiquidity(\n        address tokenA,\n        address tokenB,\n        uint amountADesired,\n        uint amountBDesired,\n        uint amountAMin,\n        uint amountBMin,\n        address to,\n        uint deadline
```

此函数可以在交易中调用，用于存入流动资金。 大多数参数与上述 `_addLiquidity` 中相同，但有两个例外：

。 `to` 是接收新铸造的流动性代币的地址，用于显示流动性提供者在资金池中的份额\n。 `deadline` 是交易的时间限制

```solidity
    ) external virtual override ensure(deadline) returns (uint amountA, uint amountB, uint liquidity) {\n        (amountA, amountB) = _addLiquidity(tokenA, tokenB, amountADesired, amountBDesired, amountAMin, amountBMin);\n        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
```

我们计算实际存入的金额，然后找到流动资金池的帐户地址。 为了节省燃料，我们不是通过询问工厂执行此操作，而是使用库函数 `pairFor`（参见下面程序库部分）

```solidity
        TransferHelper.safeTransferFrom(tokenA, msg.sender, pair, amountA);\n        TransferHelper.safeTransferFrom(tokenB, msg.sender, pair, amountB);
```

将正确数额的代币从用户帐户转到配对交易。

```solidity
        liquidity = IUniswapV2Pair(pair).mint(to);\n    }
```

作为回报，向 `to` 地址提供流动性代币，以获得资金池的部分所有权。 核心合约的 `mint` 函数查看它有多少额外代币（与上次流动性发生变化时它持有的数量相比），并相应地铸造流动性。

```solidity
    function addLiquidityETH(\n        address token,\n        uint amountTokenDesired,
```

当流动资金提供者想要向代币/ETH 配对交易提供流动资金时，存在一些差别。 合约为流动性提供者处理 ETH 的包装。 用户不需要指定想要存入多少 ETH，因为用户直接通过交易发送 ETH（金额在 `msg.value` 中）。

```solidity
        uint amountTokenMin,\n        uint amountETHMin,\n        address to,\n        uint deadline\n    ) external virtual override payable ensure(deadline) returns (uint amountToken, uint amountETH, uint liquidity) {\n        (amountToken, amountETH) = _addLiquidity(\n            token,\n            WETH,\n            amountTokenDesired,\n            msg.value,\n            amountTokenMin,\n            amountETHMin\n        );\n        address pair = UniswapV2Library.pairFor(factory, token, WETH);\n        TransferHelper.safeTransferFrom(token, msg.sender, pair, amountToken);\n        IWETH(WETH).deposit{value: amountETH}();\n        assert(IWETH(WETH).transfer(pair, amountETH));
```

为了将 ETH 存入合约，首先将其包装成 WETH，然后将 WETH 转入配对。 请注意转账在 `assert` 中包装。 这意味着如果转账失败，此合约调用也会失败，因此包装不会真正发生。

```solidity
        liquidity = IUniswapV2Pair(pair).mint(to);\n        // 如果有的话，退还零散的 eth\n        if (msg.value > amountETH) TransferHelper.safeTransferETH(msg.sender, msg.value - amountETH);\n    }
```

用户已经向我们发送了 ETH，因此，如果还有任何额外 ETH 剩余（因为另一种代币比用户所认为的价值更低），我们需要发起退款。

#### 移除流动性 {#remove-liquidity}

这些函数将移除流动性并偿还流动性提供者。

```solidity
    // **** 移除流动性 ****\n    function removeLiquidity(\n        address tokenA,\n        address tokenB,\n        uint liquidity,\n        uint amountAMin,\n        uint amountBMin,\n        address to,\n        uint deadline\n    ) public virtual override ensure(deadline) returns (uint amountA, uint amountB) {
```

最简单的流动资金撤回案例。 对于每种代币，都有一个流动性提供者同意接受的最低金额，必须在截止时间之前完成。

```solidity
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);\n        IUniswapV2Pair(pair).transferFrom(msg.sender, pair, liquidity); // 将流动性发送到交易对\n        (uint amount0, uint amount1) = IUniswapV2Pair(pair).burn(to);
```

核心合约的 `burn` 函数处理返还给用户的代币。

```solidity
        (address token0,) = UniswapV2Library.sortTokens(tokenA, tokenB);
```

某个函数返回多个值时，如果我们只对其中部分值感兴趣，以下便是我们只获取那些值的方式。 从消耗燃料的角度来说，这样比读取那些从来不用的值更加经济。

```solidity
        (amountA, amountB) = tokenA == token0 ? (amount0, amount1) : (amount1, amount0);
```

将金额从核心合约返回它们的方式（较低地址的代币优先）转换为用户期望的方式（对应于 `tokenA` 和 `tokenB`）。

```solidity
        require(amountA >= amountAMin, 'UniswapV2Router: INSUFFICIENT_A_AMOUNT');\n        require(amountB >= amountBMin, 'UniswapV2Router: INSUFFICIENT_B_AMOUNT');\n    }
```

可以首先进行转账，然后再核实转账是否合法，因为如果不合法，我们可以回滚所有的状态更改。

```solidity
    function removeLiquidityETH(\n        address token,\n        uint liquidity,\n        uint amountTokenMin,\n        uint amountETHMin,\n        address to,\n        uint deadline\n    ) public virtual override ensure(deadline) returns (uint amountToken, uint amountETH) {\n        (amountToken, amountETH) = removeLiquidity(\n            token,\n            WETH,\n            liquidity,\n            amountTokenMin,\n            amountETHMin,\n            address(this),\n            deadline\n        );\n        TransferHelper.safeTransfer(token, to, amountToken);\n        IWETH(WETH).withdraw(amountETH);\n        TransferHelper.safeTransferETH(to, amountETH);\n    }
```

移除 ETH 的流动性几乎是一样的，区别在于我们首先会收到 WETH 代币，然后将它们兑换成 ETH 并退还给流动性提供者。

```solidity
    function removeLiquidityWithPermit(\n        address tokenA,\n        address tokenB,\n        uint liquidity,\n        uint amountAMin,\n        uint amountBMin,\n        address to,\n        uint deadline,\n        bool approveMax, uint8 v, bytes32 r, bytes32 s\n    ) external virtual override returns (uint amountA, uint amountB) {\n        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);\n        uint value = approveMax ? uint(-1) : liquidity;\n        IUniswapV2Pair(pair).permit(msg.sender, address(this), value, deadline, v, r, s);\n        (amountA, amountB) = removeLiquidity(tokenA, tokenB, liquidity, amountAMin, amountBMin, to, deadline);\n    }\n\n\n    function removeLiquidityETHWithPermit(\n        address token,\n        uint liquidity,\n        uint amountTokenMin,\n        uint amountETHMin,\n        address to,\n        uint deadline,\n        bool approveMax, uint8 v, bytes32 r, bytes32 s\n    ) external virtual override returns (uint amountToken, uint amountETH) {\n        address pair = UniswapV2Library.pairFor(factory, token, WETH);\n        uint value = approveMax ? uint(-1) : liquidity;\n        IUniswapV2Pair(pair).permit(msg.sender, address(this), value, deadline, v, r, s);\n        (amountToken, amountETH) = removeLiquidityETH(token, liquidity, amountTokenMin, amountETHMin, to, deadline);\n    }
```

这些函数转发元交易，通过[许可证机制](#UniswapV2ERC20)使没有以太币的用户能够从资金池中提取资金。

```solidity
\n    // **** 移除流动性（支持转账收费代币） ****\n    function removeLiquidityETHSupportingFeeOnTransferTokens(\n        address token,\n        uint liquidity,\n        uint amountTokenMin,\n        uint amountETHMin,\n        address to,\n        uint deadline\n    ) public virtual override ensure(deadline) returns (uint amountETH) {\n        (, amountETH) = removeLiquidity(\n            token,\n            WETH,\n            liquidity,\n            amountTokenMin,\n            amountETHMin,\n            address(this),\n            deadline\n        );\n        TransferHelper.safeTransfer(token, to, IERC20(token).balanceOf(address(this)));\n        IWETH(WETH).withdraw(amountETH);\n        TransferHelper.safeTransferETH(to, amountETH);\n    }\n
```

此函数可以用于在传输或存储时收取费用的代币。 当代币有这类费用时，我们无法依靠 `removeLiquidity` 函数来告诉我们可以撤回多少代币。因此，我们需要先提取然后查询余额。

```solidity
\n\n    function removeLiquidityETHWithPermitSupportingFeeOnTransferTokens(\n        address token,\n        uint liquidity,\n        uint amountTokenMin,\n        uint amountETHMin,\n        address to,\n        uint deadline,\n        bool approveMax, uint8 v, bytes32 r, bytes32 s\n    ) external virtual override returns (uint amountETH) {\n        address pair = UniswapV2Library.pairFor(factory, token, WETH);\n        uint value = approveMax ? uint(-1) : liquidity;\n        IUniswapV2Pair(pair).permit(msg.sender, address(this), value, deadline, v, r, s);\n        amountETH = removeLiquidityETHSupportingFeeOnTransferTokens(\n            token, liquidity, amountTokenMin, amountETHMin, to, deadline\n        );\n    }
```

最后一个函数将存储费用与元交易结合起来。

#### 交易 {#trade}

```solidity
    // **** 兑换 ****
    // 要求初始金额已发送到第一个币对
    function _swap(uint[] memory amounts, address[] memory path, address _to) internal virtual {
```

此函数执行向交易者公开的函数所需的内部处理。

```solidity
        for (uint i; i < path.length - 1; i++) {
```

在我撰写本文时，有 [388,160 个 ERC-20 代币](https://eth.blockscout.com/tokens)。 如果每个代币对都有一个交易对交易所，那将会有超过 1500 亿个交易对交易所。 目前，整个链[只有该数量 0.1% 的帐户](https://eth.blockscout.com/stats/accountsGrowth)。 实际上，兑换函数支持路径这一概念。 交易者可以将 A 兑换成 B、B 兑换成 C、C 兑换成 D，因此不需要直接的 A-D 币对交易所。

这些市场上的价格往往是同步的，因为当价格不同步时，就会为套利创造机会。 例如，假设有三种代币 A、B 和 C。有三个币对交易所，每对代币一个。

1. 初始情况
2. 交易者卖出 24.695 个 A 代币，获得 25.305 个 B 代币。
3. 交易者卖出 24.695 个 B 代币，换取 25.305 个 C 代币，留下约 0.61 个 B 代币作为利润。
4. 然后，该交易者卖出 24.695 个 C 代币，换取 25.305 个 A 代币，留下约 0.61 个 C 代币作为利润。 该交易者还额外拥有 0.61 个 A 代币（交易者最终拥有的 25.305 个代币，减去 24.695 个的原始投资）。

| 步骤 | A-B 交易所                                                                                     | B-C 交易所                                                                                     | A-C 交易所                                                                                     |
| -- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| 1  | A:1000 B:1050 A/B=1.05                      | B:1000 C:1050 B/C=1.05                      | A:1050 C:1000 C/A=1.05                      |
| 2  | A:1024.695 B:1024.695 A/B=1 | B:1000 C:1050 B/C=1.05                      | A:1050 C:1000 C/A=1.05                      |
| 3  | A:1024.695 B:1024.695 A/B=1 | B:1024.695 C:1024.695 B/C=1 | A:1050 C:1000 C/A=1.05                      |
| 4  | A:1024.695 B:1024.695 A/B=1 | B:1024.695 C:1024.695 B/C=1 | A:1024.695 C:1024.695 C/A=1 |

```solidity
            (address input, address output) = (path[i], path[i + 1]);
            (address token0,) = UniswapV2Library.sortTokens(input, output);
            uint amountOut = amounts[i + 1];
```

获取我们当前正在处理的交易对，将其排序（以便与该交易对一起使用）并获取预期的输出金额。

```solidity
            (uint amount0Out, uint amount1Out) = input == token0 ? (uint(0), amountOut) : (amountOut, uint(0));
```

获取预期的输出金额，按照交易对交易所预期的方式进行排序。

```solidity
            address to = i < path.length - 2 ? UniswapV2Library.pairFor(factory, output, path[i + 2]) : _to;
```

这是最后一笔兑换吗？ 如果是，将为该笔交易收到的代币发送到目的地。 如果不是，则将其发送到下一个币对交易所。

```solidity

            IUniswapV2Pair(UniswapV2Library.pairFor(factory, input, output)).swap(
                amount0Out, amount1Out, to, new bytes(0)
            );
        }
    }
```

实际调用交易对交易所来兑换代币。 我们不需要回调来获知有关兑换的信息，所以我们不在该字段中发送任何字节。

```solidity
    function swapExactTokensForTokens(
```

交易者直接使用此函数将一种代币兑换成另一种代币。

```solidity
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
```

此参数包含 ERC-20 合约的地址。 如上所述，这是一个数组，因为你可能需要经过几个交易对交易所，才能将你拥有的资产兑换成你想要的资产。

Solidity 中的函数参数可以存储在 `memory` 或 `calldata` 中。 如果函数是合约的入口点，由用户（使用交易）或从另一个合约直接调用，那么参数的值可以直接从调用数据中获取。 如果函数是内部调用的，如上面的 `_swap`，那么参数必须存储在 `memory` 中。 从被调用合约的角度来看，`calldata` 是只读的。

对于 `uint` 或 `address` 等标量类型，编译器会为我们处理存储选择，但对于更长且更昂贵的数组，我们需要指定要使用的存储类型。

```solidity
        address to,
        uint deadline
    ) external virtual override ensure(deadline) returns (uint[] memory amounts) {
```

返回值总是返回在内存中。

```solidity
        amounts = UniswapV2Library.getAmountsOut(factory, amountIn, path);
        require(amounts[amounts.length - 1] >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
```

计算每次兑换中要购买的金额。 如果结果低于交易者愿意接受的最低金额，则回滚交易。

```solidity
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, to);
    }
```

最后，将初始 ERC-20 代币转移到第一个交易对交易所的帐户，并调用 `_swap`。 这一切都发生在同一笔交易中，因此交易对交易所知道任何意外的代币都是这次转移的一部分。

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

上一个函数 `swapTokensForTokens` 允许交易者指定他愿意付出的确切输入代币数量，以及他愿意收到的最低输出代币数量。 这个函数执行反向兑换，它让交易者指定他想要的输出代币数量，以及他愿意为此支付的最大输入代币数量。

在这两种情况下，交易者都必须首先授予此外围合约一定额度，以允许它转移代币。

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
        // 如有，退还剩余的零散 ETH
        if (msg.value > amounts[0]) TransferHelper.safeTransferETH(msg.sender, msg.value - amounts[0]);
    }
```

这四个变体都涉及 ETH 和代币之间的交易。 唯一的区别是，我们要么从交易者那里收到 ETH 并用它来铸造 WETH，要么从路径中的最后一个交易所收到 WETH 并销毁它，然后将产生的 ETH 发回给交易者。

```solidity
    // **** 兑换（支持转账收费的代币）****
    // 要求初始金额已发送到第一个币对
    function _swapSupportingFeeOnTransferTokens(address[] memory path, address _to) internal virtual {
```

这是一个内部函数，用于兑换具有转账或存储费用的代币，以解决（[此问题](https://github.com/Uniswap/uniswap-interface/issues/835)）。

```solidity
        for (uint i; i < path.length - 1; i++) {
            (address input, address output) = (path[i], path[i + 1]);
            (address token0,) = UniswapV2Library.sortTokens(input, output);
            IUniswapV2Pair pair = IUniswapV2Pair(UniswapV2Library.pairFor(factory, input, output));
            uint amountInput;
            uint amountOutput;
            { // 作用域以避免堆栈过深错误
            (uint reserve0, uint reserve1,) = pair.getReserves();
            (uint reserveInput, uint reserveOutput) = input == token0 ? (reserve0, reserve1) : (reserve1, reserve0);
            amountInput = IERC20(input).balanceOf(address(pair)).sub(reserveInput);
            amountOutput = UniswapV2Library.getAmountOut(amountInput, reserveInput, reserveOutput);
```

由于存在转账费，我们不能依赖 `getAmountsOut` 函数来告诉我们每次转账能得到多少（就像我们调用原始 `_swap` 之前那样）。 相反，我们必须先转账，然后再看我们收到了多少代币。

注意：理论上，我们可以只使用这个函数而不是 `_swap`，但在某些情况下（例如，如果转账最终因为不满足最低要求而被回滚），这最终会花费更多的燃料。 带转账费的代币相当罕见，所以虽然我们需要兼容它们，但没有必要让所有兑换都假设它们会经过至少其中一个。

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

这些是用于普通代币的相同变体，但它们调用的是 `_swapSupportingFeeOnTransferTokens`。

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

这些函数只是调用 [UniswapV2Library 函数](#uniswapV2library) 的代理。

### UniswapV2Migrator.sol {#UniswapV2Migrator}

该合约曾用于将交易所从旧的 v1 迁移到 v2。 现在它们已经被迁移，所以不再相关。

## 库 {#libraries}

[SafeMath 库](https://docs.openzeppelin.com/contracts/2.x/api/math) 有详细的文档，因此这里无需再作说明。

### 数学 {#Math}

该库包含一些 Solidity 代码中通常不需要的数学函数，因此它们不属于该语言的一部分。

```solidity
pragma solidity =0.5.16;

// 用于执行各种数学运算的库

library Math {
    function min(uint x, uint y) internal pure returns (uint z) {
        z = x < y ? x : y;
    }

    // 巴比伦法 (https://wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method)
    function sqrt(uint y) internal pure returns (uint z) {
        if (y > 3) {
            z = y;
            uint x = y / 2 + 1;
```

从一个高于平方根的估算值 x 开始（这就是我们需要将 1-3 作为特殊情况处理的原因）。

```solidity
            while (x < z) {
                z = x;
                x = (y / x + x) / 2;
```

得到一个更接近的估算值，即上一个估算值与（我们试图求平方根的数除以上一个估算值）的平均值。 重复此过程，直到新的估算值不小于现有估算值。 更多详情，[请参阅此处](https://wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method)。

```solidity
            }
        } else if (y != 0) {
            z = 1;
```

我们永远不需要零的平方根。 一、二和三的平方根约等于一（我们使用整数，所以忽略小数部分）。

```solidity
        }
    }
}
```

### 定点小数 (UQ112x112) {#FixedPoint}

该库处理小数，这些小数通常不属于以太坊计算的一部分。 它通过将数字 _x_ 编码为 _x\*2^112_ 来实现这一点。 这使我们能够使用原始的加法和减法操作码而无需更改。

```solidity
pragma solidity =0.5.16;

// 用于处理二进制定点数的库 (https://wikipedia.org/wiki/Q_(number_format))

// 范围：[0, 2**112 - 1]
// 精度：1 / 2**112

library UQ112x112 {
    uint224 constant Q112 = 2**112;
```

`Q112` 是 1 的编码。

```solidity
    // 将 uint112 编码为 UQ112x112
    function encode(uint112 y) internal pure returns (uint224 z) {
        z = uint224(y) * Q112; // 永不溢出
    }
```

因为 y 是 `uint112`，所以其最大值为 2^112-1。 该数字仍然可以编码为 `UQ112x112`。

```solidity
    // 将一个 UQ112x112 除以一个 uint112，返回一个 UQ112x112
    function uqdiv(uint224 x, uint112 y) internal pure returns (uint224 z) {
        z = x / uint224(y);
    }
}
```

如果我们将两个 `UQ112x112` 值相除，结果将不再乘以 2^112。 因此我们用一个整数作为分母。 我们本需要使用类似的技巧来进行乘法运算，但我们不需要对 `UQ112x112` 值进行乘法运算。

### UniswapV2Library {#uniswapV2library}

该库仅由外围合约使用

```solidity
pragma solidity >=0.5.0;

import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol';

import "./SafeMath.sol";

library UniswapV2Library {
    using SafeMath for uint;

    // 返回排序后的代币地址，用于处理以此顺序排序的交易对的返回值
    function sortTokens(address tokenA, address tokenB) internal pure returns (address token0, address token1) {
        require(tokenA != tokenB, 'UniswapV2Library: IDENTICAL_ADDRESSES');
        (token0, token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
        require(token0 != address(0), 'UniswapV2Library: ZERO_ADDRESS');
    }
```

按地址对两个代币进行排序，这样我们就能获得它们的交易对交易所的地址。 这是必要的，因为否则我们会有两种可能性，一种是参数 A,B，另一种是参数 B,A，这会导致两个交易所而不是一个。

```solidity
    // 无需任何外部调用即可计算交易对的 CREATE2 地址
    function pairFor(address factory, address tokenA, address tokenB) internal pure returns (address pair) {
        (address token0, address token1) = sortTokens(tokenA, tokenB);
        pair = address(uint(keccak256(abi.encodePacked(
                hex'ff',
                factory,
                keccak256(abi.encodePacked(token0, token1)),
                hex'96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f' // 初始代码哈希
            ))));
    }
```

此函数计算两种代币的交易对交易所的地址。 该合约是使用 [CREATE2 操作码](https://eips.ethereum.org/EIPS/eip-1014) 创建的，所以如果我们知道它使用的参数，就可以使用相同的算法计算地址。 这比询问工厂要便宜得多，而且

```solidity
    // 获取并排序交易对的储备金
    function getReserves(address factory, address tokenA, address tokenB) internal view returns (uint reserveA, uint reserveB) {
        (address token0,) = sortTokens(tokenA, tokenB);
        (uint reserve0, uint reserve1,) = IUniswapV2Pair(pairFor(factory, tokenA, tokenB)).getReserves();
        (reserveA, reserveB) = tokenA == token0 ? (reserve0, reserve1) : (reserve1, reserve0);
    }
```

此函数返回交易对交易所拥有的两种代币的储备金。 请注意，它可以按任意顺序接收代币，并为内部使用对其进行排序。

```solidity
    // 给定一定数量的某种资产和交易对储备金，返回等值的另一种资产的数量
    function quote(uint amountA, uint reserveA, uint reserveB) internal pure returns (uint amountB) {
        require(amountA > 0, 'UniswapV2Library: INSUFFICIENT_AMOUNT');
        require(reserveA > 0 && reserveB > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        amountB = amountA.mul(reserveB) / reserveA;
    }
```

如果没有手续费，此函数会给出用代币 A 兑换代币 B 的数量。 此计算考虑到转账会改变汇率。

```solidity
    // 给定某种资产的输入数量和交易对储备金，返回另一种资产的最大输出数量
    function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut) internal pure returns (uint amountOut) {
```

如果使用交易对交易所没有手续费，上面的 `quote` 函数会很好用。 但是，如果有 0.3% 的兑换费，你实际得到的金额会更少。 此函数计算扣除兑换费后的金额。

```solidity

        require(amountIn > 0, 'UniswapV2Library: INSUFFICIENT_INPUT_AMOUNT');
        require(reserveIn > 0 && reserveOut > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        uint amountInWithFee = amountIn.mul(997);
        uint numerator = amountInWithFee.mul(reserveOut);
        uint denominator = reserveIn.mul(1000).add(amountInWithFee);
        amountOut = numerator / denominator;
    }
```

Solidity 本身不处理小数，所以我们不能直接将金额乘以 0.997。 作为替代，我们将分子乘以 997，分母乘以 1000，以达到相同的效果。

```solidity
    // 给定某种资产的输出数量和交易对储备金，返回另一种资产所需的输入数量
    function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut) internal pure returns (uint amountIn) {
        require(amountOut > 0, 'UniswapV2Library: INSUFFICIENT_OUTPUT_AMOUNT');
        require(reserveIn > 0 && reserveOut > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        uint numerator = reserveIn.mul(amountOut).mul(1000);
        uint denominator = reserveOut.sub(amountOut).mul(997);
        amountIn = (numerator / denominator).add(1);
    }
```

此函数的作用大致相同，但它获取输出金额并提供输入金额。

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

当需要经过多个交易对交易所时，这两个函数用于确定数值。

### 转账助手 {#transfer-helper}

[该库](https://github.com/Uniswap/uniswap-lib/blob/master/contracts/libraries/TransferHelper.sol) 在 ERC-20 和以太坊转账周围添加了成功检查，以相同的方式处理回滚和返回 `false` 值。

```solidity
// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity >=0.6.0;

// 与 ERC20 代币交互和发送 ETH 的辅助方法，这些方法不总是一致地返回 true/false
library TransferHelper {
    function safeApprove(
        address token,
        address to,
        uint256 value
    ) internal {
        // bytes4(keccak256(bytes('approve(address,uint256)')));
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0x095ea7b3, to, value));

```

我们可以通过以下两种方式之一调用另一个合约：

- 使用接口定义创建函数调用
- “手动”使用[应用程序二进制接口 (ABI)](https://docs.soliditylang.org/en/v0.8.3/abi-spec.html) 创建调用。 这是代码作者决定要做的事。

```solidity
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            'TransferHelper::safeApprove: approve failed'
        );
    }
```

为了向后兼容在 ERC-20 标准之前创建的代币，ERC-20 调用可能会因回滚（此时 `success` 为 `false`）而失败，也可能成功但返回 `false` 值（此时有输出数据，如果将其解码为布尔值，则得到 `false`）。

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

该函数实现了 [ERC-20 的 transfer 功能](https://eips.ethereum.org/EIPS/eip-20#transfer)，允许一个帐户支出另一个帐户提供的额度。

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

该函数实现了 [ERC-20 的 transferFrom 功能](https://eips.ethereum.org/EIPS/eip-20#transferfrom)，允许一个帐户支出另一个帐户提供的额度。

```solidity

    function safeTransferETH(address to, uint256 value) internal {
        (bool success, ) = to.call{value: value}(new bytes(0));
        require(success, 'TransferHelper::safeTransferETH: ETH transfer failed');
    }
}
```

此函数将以太币转入一个帐户。 对另一个合约的任何调用都可以尝试发送以太币。 因为我们实际上不需要调用任何函数，所以我们不随调用发送任何数据。

## 结论 {#conclusion}

这是一篇长文，大约 50 页。 如果你读到了这里，恭喜！ 希望到目前为止，你已经理解了编写实际应用程序（而不是简短的示例程序）时的注意事项，并能更好地为自己的用例编写合约。

现在去写一些有用的东西，让我们惊艳吧。

[点击此处查看我的更多作品](https://cryptodocguy.pro/)。
