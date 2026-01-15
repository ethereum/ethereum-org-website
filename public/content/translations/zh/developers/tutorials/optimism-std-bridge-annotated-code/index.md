---
title: "Optimism 标准链桥合约详解"
description: Optimism 的标准链桥如何运作？ 它为何以这种方式运作？
author: Ori Pomerantz
tags: [ "Solidity", "链桥", "二层网络" ]
skill: intermediate
published: 2022-03-30
lang: zh
---

[Optimism](https://www.optimism.io/) 是一种[乐观卷叠](/developers/docs/scaling/optimistic-rollups/)。
乐观卷叠能够以比以太坊主网（也称为第 1 层或 L1）低得多的价格处理交易，因为交易仅由少数节点处理，而不是网络上的每个节点。
同时，所有数据都会写入 L1，因此，所有内容都可以用主网的完整性和可用性保证来证明和重构。

要在 Optimism（或任何其他 L2）上使用 L1 资产，需要将这些资产[桥接](/bridges/#prerequisites)。
实现这一点的一种方法是，用户在 L1 上锁定资产（最常见的是 ETH 和 [ERC-20 代币](/developers/docs/standards/tokens/erc-20/)），并在 L2 上收到等值的资产以供使用。
最后，持有这些资产的任何人可能都想将它们桥接回 L1。
执行此操作时，资产在 L2 上被销毁，然后在 L1 上释放回给用户。

这就是 [Optimism 标准链桥](https://docs.optimism.io/app-developers/bridging/standard-bridge) 的运作方式。
在本文中，我们将深入研究该链桥的源代码，了解其运作方式，并将其作为编写良好的 Solidity 代码示例进行学习。

## 控制流 {#control-flows}

该链桥有两个主要流程：

- 存款（从 L1 到 L2）
- 取款（从 L2 到 L1）

### 存款流程 {#deposit-flow}

#### 第 1 层 {#deposit-flow-layer-1}

1. 如果存入 ERC-20，存款人会授予链桥一笔许可额度，用于花费待存入的金额
2. 存款人调用 L1 链桥（`depositERC20`、`depositERC20To`、`depositETH` 或 `depositETHTo`）
3. L1 链桥持有桥接的资产
   - ETH：资产由存款人在调用过程中转账
   - ERC-20：链桥使用存款人提供的许可额度将资产转账给自己
4. L1 链桥使用跨域消息机制在 L2 链桥上调用 `finalizeDeposit`

#### 第 2 层 {#deposit-flow-layer-2}

5. L2 链桥验证对 `finalizeDeposit` 的调用是合法的：
   - 来自跨域消息合约
   - 最初来自 L1 上的链桥
6. L2 链桥检查 L2 上的 ERC-20 代币合约是否正确：
   - L2 合约报告其 L1 对应合约与 L1 上代币来源的合约相同
   - L2 合约报告它支持正确的接口（[使用 ERC-165](https://eips.ethereum.org/EIPS/eip-165)）。
7. 如果 L2 合约正确，则调用它向相应地址铸造相应数量的代币。 如果不正确，则启动取款流程，允许用户在 L1 上认领代币。

### 取款流程 {#withdrawal-flow}

#### 第 2 层 {#withdrawal-flow-layer-2}

1. 取款人调用 L2 链桥（`withdraw` 或 `withdrawTo`）
2. L2 链桥销毁属于 `msg.sender` 的相应数量的代币
3. L2 链桥使用跨域消息机制在 L1 链桥上调用 `finalizeETHWithdrawal` 或 `finalizeERC20Withdrawal`

#### 第 1 层 {#withdrawal-flow-layer-1}

4. L1 链桥验证对 `finalizeETHWithdrawal` 或 `finalizeERC20Withdrawal` 的调用是合法的：
   - 来自跨域消息机制
   - 最初来自 L2 上的链桥
5. L1 链桥将相应资产（ETH 或 ERC-20）转账到相应地址

## 第 1 层代码 {#layer-1-code}

这是在 L1（以太坊主网）上运行的代码。

### IL1ERC20Bridge {#IL1ERC20Bridge}

[此接口在此处定义](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1ERC20Bridge.sol)。
它包含桥接 ERC-20 代币所需的函数和定义。

```solidity
// SPDX-License-Identifier: MIT
```

[Optimism 的大部分代码都是在 MIT 许可下发布的](https://help.optimism.io/hc/en-us/articles/4411908707995-What-software-license-does-Optimism-use-)。

```solidity
pragma solidity >0.5.0 <0.9.0;
```

在撰写本文时，Solidity 的最新版本是 0.8.12。
在 0.9.0 版本发布之前，我们不知道这段代码是否与其兼容。

```solidity
/**
 * @title IL1ERC20Bridge
 */
interface IL1ERC20Bridge {
    /**********
     * 事件 *
     **********/

    event ERC20DepositInitiated(
```

在 Optimism 链桥术语中，_deposit_ 是指从 L1 到 L2 的转账，而 _withdrawal_ 是指从 L2 到 L1 的转账。

```solidity
        address indexed _l1Token,
        address indexed _l2Token,
```

在大多数情况下，L1 上的 ERC-20 地址与 L2 上等效的 ERC-20 地址不同。
[你可以在此处查看代币地址列表](https://static.optimism.io/optimism.tokenlist.json)。
`chainId` 为 1 的地址在 L1（主网）上，`chainId` 为 10 的地址在 L2 (Optimism) 上。
另外两个 `chainId` 值分别用于 Kovan 测试网 (42) 和 Optimistic Kovan 测试网 (69)。

```solidity
        address indexed _from,
        address _to,
        uint256 _amount,
        bytes _data
    );
```

可以为转账添加备注，在这种情况下，它们将被添加到报告这些转账的事件中。

```solidity
    event ERC20WithdrawalFinalized(
        address indexed _l1Token,
        address indexed _l2Token,
        address indexed _from,
        address _to,
        uint256 _amount,
        bytes _data
    );
```

同一链桥合约处理双向转账。
就 L1 链桥而言，这意味着存款的初始化和取款的最终敲定。

```solidity

    /********************
     * 公共函数 *
     ********************/

    /**
     * @dev 获取相应 L2 链桥合约的地址。
     * @return 相应 L2 链桥合约的地址。
     */
    function l2TokenBridge() external returns (address);
```

这个函数并非真的需要，因为在 L2 上它是一个预部署的合约，所以它总是在地址 `0x4200000000000000000000000000000000000010`。
它在这里是为了与 L2 链桥对称，因为 L1 链桥的地址_并非_微不足道。

```solidity
    /**
     * @dev 将一定数量的 ERC20 存入调用者在 L2 上的余额。
     * @param _l1Token 我们要存入的 L1 ERC20 的地址
     * @param _l2Token L1 对应的 L2 ERC20 的地址
     * @param _amount 要存入的 ERC20 的数量
     * @param _l2Gas 在 L2 上完成存款所需的燃料限制。
     * @param _data 要转发到 L2 的可选数据。此数据
     *        仅为方便外部合约而提供。除了强制执行最大
     *        长度外，这些合约对其内容不提供任何保证。
     */
    function depositERC20(
        address _l1Token,
        address _l2Token,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

`_l2Gas` 参数是交易允许花费的 L2 燃料数量。
[在某个（高）限制内，这是免费的](https://community.optimism.io/docs/developers/bridge/messaging/#for-l1-%E2%87%92-l2-transactions-2)，所以除非 ERC-20 合约在铸造时做了什么非常奇怪的事情，否则这应该不成问题。
此函数处理常见场景，即用户将资产桥接到不同区块链上的相同地址。

```solidity
    /**
     * @dev 将一定数量的 ERC20 存入接收者在 L2 上的余额。
     * @param _l1Token 我们要存入的 L1 ERC20 的地址
     * @param _l2Token L1 对应的 L2 ERC20 的地址
     * @param _to 用于记入取款的 L2 地址。
     * @param _amount 要存入的 ERC20 的数量。
     * @param _l2Gas 在 L2 上完成存款所需的燃料限制。
     * @param _data 要转发到 L2 的可选数据。此数据
     *        仅为方便外部合约而提供。除了强制执行最大
     *        长度外，这些合约对其内容不提供任何保证。
     */
    function depositERC20To(
        address _l1Token,
        address _l2Token,
        address _to,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

此函数与 `depositERC20` 几乎相同，但它允许你将 ERC-20 发送到不同的地址。

```solidity
    /*************************
     * 跨链函数 *
     *************************/

    /**
     * @dev 完成从 L2 到 L1 的取款，并将资金记入接收者
     * L1 ERC20 代币的余额。
     * 如果从 L2 初始化的取款尚未最终确定，此调用将失败。
     *
     * @param _l1Token 用于 finalizeWithdrawal 的 L1 代币地址。
     * @param _l2Token 发起取款的 L2 代币地址。
     * @param _from 发起转账的 L2 地址。
     * @param _to 用于记入取款的 L1 地址。
     * @param _amount 要存入的 ERC20 的数量。
     * @param _data 发送人在 L2 上提供的数据。此数据
     *   仅为方便外部合约而提供。除了强制执行最大
     *   长度外，这些合约对其内容不提供任何保证。
     */
    function finalizeERC20Withdrawal(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
    ) external;
}
```

在 Optimism 中，取款（以及从 L2 到 L1 的其他消息）是一个两步过程：

1. 在 L2 上发起一笔交易。
2. 在 L1 上敲定或声明一笔交易。
   这笔交易需要在 L2 交易的[故障挑战期](https://community.optimism.io/docs/how-optimism-works/#fault-proofs)结束后才能进行。

### IL1StandardBridge {#il1standardbridge}

[此接口在此处定义](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1StandardBridge.sol)。
该文件包含 ETH 的事件和函数定义。
这些定义与上面 `IL1ERC20Bridge` 中为 ERC-20 定义的定义非常相似。

链桥接口分为两个文件，因为某些 ERC-20 代币需要自定义处理，标准链桥无法处理它们。
这样，处理此类代币的自定义链桥可以实现 IL1ERC20Bridge，而不必再桥接 ETH。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

import "./IL1ERC20Bridge.sol";

/**
 * @title IL1StandardBridge
 */
interface IL1StandardBridge is IL1ERC20Bridge {
    /**********
     * 事件 *
     **********/
    event ETHDepositInitiated(
        address indexed _from,
        address indexed _to,
        uint256 _amount,
        bytes _data
    );
```

此事件与 ERC-20 版本 (`ERC20DepositInitiated`) 几乎相同，只是没有 L1 和 L2 代币地址。
其他事件和函数也是如此。

```solidity
    event ETHWithdrawalFinalized(
        .
        .
        .
    );

    /********************
     * 公共函数 *
     ********************/

    /**
     * @dev 将一定数量的 ETH 存入调用者在 L2 上的余额。
            .
            .
            .
     */
    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable;

    /**
     * @dev 将一定数量的 ETH 存入接收者在 L2 上的余额。
            .
            .
            .
     */
    function depositETHTo(
        address _to,
        uint32 _l2Gas,
        bytes calldata _data
    ) external payable;

    /*************************
     * 跨链函数 *
     *************************/

    /**
     * @dev 完成从 L2 到 L1 的取款，并将资金记入接收者
     * L1 ETH 代币的余额。由于只有 xDomainMessenger 可以调用此函数，因此在
     * 取款最终确定之前永远不会调用它。
                .
                .
                .
     */
    function finalizeETHWithdrawal(
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
    ) external;
}
```

### CrossDomainEnabled {#crossdomainenabled}

[此合约](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/CrossDomainEnabled.sol)由两个链桥（[L1](#the-l1-bridge-contract) 和 [L2](#the-l2-bridge-contract)）继承，用于向另一层发送消息。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

/* 接口导入 */
import { ICrossDomainMessenger } from "./ICrossDomainMessenger.sol";
```

[此接口](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/ICrossDomainMessenger.sol) 告知合约如何使用跨域信使向另一层发送消息。
跨域信使完全是另一种系统，值得单独写一篇文章来介绍，我希望将来能写出来。

```solidity
/**
 * @title CrossDomainEnabled
 * @dev 执行跨域通信的合约的帮助合约
 *
 * 使用的编译器：由继承合约定义
 */
contract CrossDomainEnabled {
    /*************
     * 变量 *
     *************/

    // 用于从其他域发送和接收消息的信使合约。
    address public messenger;

    /***************
     * 构造函数 *
     ***************/

    /**
     * @param _messenger 当前层上的 CrossDomainMessenger 地址。
     */
    constructor(address _messenger) {
        messenger = _messenger;
    }
```

合约需要知道的一个参数，就是跨域信使在这一层的地址。
此参数在构造函数中设置一次，并且永远不会更改。

```solidity

    /**********************
     * 函数修饰符 *
     **********************/

    /**
     * 强制修饰的函数只能由特定的跨域帐户调用。
     * @param _sourceDomainAccount 源域上唯一经过
     *  身份验证可调用此函数的帐户。
     */
    modifier onlyFromCrossDomainAccount(address _sourceDomainAccount) {
```

跨域消息传递可以由运行在区块链（以太坊主网或 Optimism）上的任何合约使用。
但是每一层都需要链桥。如果消息来自于另一边的链桥，将只信任特定消息。

```solidity
        require(
            msg.sender == address(getCrossDomainMessenger()),
            "OVM_XCHAIN: messenger contract unauthenticated"
        );
```

只能信任来自适当跨域信使（messenger，如下所示）的消息。

```solidity

        require(
            getCrossDomainMessenger().xDomainMessageSender() == _sourceDomainAccount,
            "OVM_XCHAIN: wrong sender of cross-domain message"
        );
```

跨域信使提供另一层发送消息的地址的方式是[`.xDomainMessageSender()` 函数](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1CrossDomainMessenger.sol#L122-L128)。
只要在消息发起的交易中调用它，它就可以提供此信息。

我们需要确保我们收到的消息来自另一个链桥。

```solidity

        _;
    }

    /**********************
     * 内部函数 *
     **********************/

    /**
     * 获取信使，通常来自存储。如果子合约需要重写
     *，则公开此函数。
     * @return 应该使用的跨域信使合约的地址。
     */
    function getCrossDomainMessenger() internal virtual returns (ICrossDomainMessenger) {
        return ICrossDomainMessenger(messenger);
    }
```

该函数返回跨域信使。
我们使用函数而不是变量 messenger，以允许从该函数继承的合约使用一种算法来指定要使用的跨域信使。

```solidity

    /**
     * 向另一个域上的帐户发送消息
     * @param _crossDomainTarget 目的域上的预期接收者
     * @param _message 发送到目标的数据（通常是带有
     *  `onlyFromCrossDomainAccount()` 的函数的 calldata）
     * @param _gasLimit 在目标域上接收消息的燃料限制。
     */
    function sendCrossDomainMessage(
        address _crossDomainTarget,
        uint32 _gasLimit,
        bytes memory _message
```

最后是向另一层发送消息的函数。

```solidity
    ) internal {
        // slither-disable-next-line reentrancy-events, reentrancy-benign
```

[Slither](https://github.com/crytic/slither) 是一个静态分析器，Optimism 在每个合约上运行它以查找漏洞和其他潜在问题。
在本例中，下面一行会触发两个漏洞：

1. [可重入事件](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-3)
2. [良性可重入](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-2)

```solidity
        getCrossDomainMessenger().sendMessage(_crossDomainTarget, _message, _gasLimit);
    }
}
```

在这种情况下，我们不担心可重入性，我们知道 `getCrossDomainMessenger()` 返回一个可信地址，即使 Slither 无法知道这一点。

### L1 链桥合约 {#the-l1-bridge-contract}

[此合约的源代码在此处](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1StandardBridge.sol)。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
```

接口可以来自其他合约，因此它们必须支持各种 Solidity 版本。
但是链桥本身属于我们的合约，我们可以严格限制它使用的 Solidity 版本。

```solidity
/* 接口导入 */
import { IL1StandardBridge } from "./IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "./IL1ERC20Bridge.sol";
```

[IL1ERC20Bridge](#IL1ERC20Bridge) 和 [IL1StandardBridge](#IL1StandardBridge) 已在上面解释。

```solidity
import { IL2ERC20Bridge } from "../../L2/messaging/IL2ERC20Bridge.sol";
```

[此接口](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) 让我们能够创建消息来控制 L2 上的标准链桥。

```solidity
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[此接口](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) 让我们能够控制 ERC-20 合约。
[你可以在此处阅读更多相关信息](/developers/tutorials/erc20-annotated-code/#the-interface)。

```solidity
/* 库导入 */
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
```

[如上所述](#crossdomainenabled)，此合约用于层间消息传递。

```solidity
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";
```

[`Lib_PredeployAddresses`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/constants/Lib_PredeployAddresses.sol) 包含 L2 合约的地址，这些合约的地址始终相同。 其中包括 L2 上的标准链桥。

```solidity
import { Address } from "@openzeppelin/contracts/utils/Address.sol";
```

[OpenZeppelin 的 Address 工具](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Address.sol)。 它用于区分合约地址和属于外部帐户 (EOA) 的地址。

请注意，这不是一个理想的解决方案，因为无法区分直接调用和合约构造函数的调用，但至少这让我们能够识别和防止一些常见的用户错误。

```solidity
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
```

[ERC-20 标准](https://eips.ethereum.org/EIPS/eip-20)支持两种合约报告失败的方式：

1. 回滚
2. 返回 `false`

处理这两种情况会让我们的代码更复杂，因此我们改用 [OpenZeppelin 的 `SafeERC20`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol)，它能确保[所有失败都会导致回滚](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol#L96)。

```solidity
/**
 * @title L1StandardBridge
 * @dev L1 ETH 和 ERC20 链桥是一个合约，它存储已存入的 L1 资金和正在 L2 上使用的标准
 * 代币。它同步一个相应的 L2 链桥，通知其存款
 * 并监听其新最终确定的取款。
 *
 */
contract L1StandardBridge is IL1StandardBridge, CrossDomainEnabled {
    using SafeERC20 for IERC20;
```

此行表示我们如何指定在每次使用 IERC20 接口时使用 SafeERC20 包装器。

```solidity

    /********************************
     * 外部合约引用 *
     ********************************/

    address public l2TokenBridge;
```

[L2StandardBridge](#the-l2-bridge-contract) 的地址。

```solidity

    // 将 L1 代币映射到 L2 代币再映射到已存入 L1 代币的余额
    mapping(address => mapping(address => uint256)) public deposits;
```

像这样的双重 [mapping](https://www.tutorialspoint.com/solidity/solidity_mappings.htm) 是定义[二维稀疏数组](https://en.wikipedia.org/wiki/Sparse_matrix)的方式。
此数据结构中的值被标识为 deposit[L1 代币地址][L2 代币地址]。
默认值为零。
只有设置为不同值的单元才会写入存储。

```solidity

    /***************
     * 构造函数 *
     ***************/

    // 此合约位于代理之后，因此构造函数参数将不被使用。
    constructor() CrossDomainEnabled(address(0)) {}
```

希望能够升级此合约而无需复制存储中的所有变量。
为此，我们使用 [`Proxy`](https://docs.openzeppelin.com/contracts/3.x/api/proxy)，这是一个使用 [`delegatecall`](https://solidity-by-example.org/delegatecall/) 将调用转移到另一个独立合约的合约，该独立合约的地址由代理合约存储（当你升级时，你告知代理更改该地址）。
当你使用 `delegatecall` 时，存储仍然是_调用_合约的存储，因此合约所有状态变量的值不受影响。

这种模式的结果是不使用 `delegatecall` 调用的合约的存储，因此传递给它的构造函数值无关紧要。
这就是我们可以为 `CrossDomainEnabled` 构造函数提供一个无意义值的原因。
这也是下面的初始化与构造函数分开的原因。

```solidity
    /******************
     * 初始化 *
     ******************/

    /**
     * @param _l1messenger 用于跨链通信的 L1 Messenger 地址。
     * @param _l2TokenBridge L2 标准链桥地址。
     */
    // slither-disable-next-line external-function
```

此 [Slither 测试](https://github.com/crytic/slither/wiki/Detector-Documentation#public-function-that-could-be-declared-external)识别未从合约代码中调用的函数，因此可以声明为 `external` 而不是 `public`。
`external` 函数的燃料成本可以更低，因为可以在 calldata 中为它们提供参数。
声明为 `public` 的函数必须可以在合约内部访问。
合约不能修改自己的 calldata，所以参数必须位于内存中。
当外部调用这类函数时，需要将 calldata 复制到内存中，这就会消耗燃料。
在本例中，函数只被调用一次，因此效率低下对我们来说无关紧要。

```solidity
    function initialize(address _l1messenger, address _l2TokenBridge) public {
        require(messenger == address(0), "合约已被初始化。"
```

`initialize` 函数只应调用一次。
如果 L1 跨域信使或 L2 代币链桥的地址发生变化，我们将创建新代理和新链桥来调用它。
这种情况不太可能发生，除非升级整个系统，这非常罕见。

请注意，此函数没有任何机制限制谁可以调用它。
这意味着理论上，攻击者可以等到我们部署代理和第一版链桥后，通过[抢先交易](https://solidity-by-example.org/hacks/front-running/)抢在合法用户之前使用 `initialize` 函数。 但是有两种方法可以防止这种情况：

1. 如果合约不是由外部帐户直接部署，而是在[有另一个合约创建它们的交易中部署](https://medium.com/upstate-interactive/creating-a-contract-with-a-smart-contract-bdb67c5c8595)，那么整个过程可以成为最小操作单元，并且能够在执行任何其他交易之前完成。
2. 如果对 `initialize` 的合法调用失败，总是可以忽略新创建的代理和链桥并创建新的。

```solidity
        messenger = _l1messenger;
        l2TokenBridge = _l2TokenBridge;
    }
```

这些是链桥需要知道的两个参数。

```solidity

    /**************
     * 存款 *
     **************/

    /** @dev 修饰符要求发送方为 EOA。 恶意
     *  合约可以通过 initcode 绕过此检查，但它能避免我们想要防止的用户错误。
     */
    modifier onlyEOA() {
        // 用于阻止来自合约的存款（避免代币意外丢失）
        require(!Address.isContract(msg.sender), "帐户不是 EOA");
        _;
    }
```

这就是我们需要 OpenZeppelin 的 `Address` 工具的原因。

```solidity
    /**
     * @dev 可以在没有数据的情况下调用此函数
     * 以将一定数量的 ETH 存入调用者在 L2 上的余额。
     * 由于接收函数不接受数据，一个保守的
     * 默认数量被转发到 L2。
     */
    receive() external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, 200_000, bytes(""));
    }
```

此函数存在的目的是测试。
请注意，它没有出现在接口定义中 — 它不适合正常使用。

```solidity
    /**
     * @inheritdoc IL1StandardBridge
     */
    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, _l2Gas, _data);
    }

    /**
     * @inheritdoc IL1StandardBridge
     */
    function depositETHTo(
        address _to,
        uint32 _l2Gas,
        bytes calldata _data
    ) external payable {
        _initiateETHDeposit(msg.sender, _to, _l2Gas, _data);
    }
```

这两个函数是 `_initiateETHDeposit` 的包装器，`_initiateETHDeposit` 处理实际的 ETH 存款。

```solidity
    /**
     * @dev 通过存储 ETH 并通知 L2 ETH 网关
     * 存款来执行存款逻辑。
     * @param _from 在 L1 上提取存款的帐户。
     * @param _to 在 L2 上给予存款的帐户。
     * @param _l2Gas 在 L2 上完成存款所需的燃料限制。
     * @param _data 要转发到 L2 的可选数据。此数据
     *        仅为方便外部合约而提供。除了强制执行最大
     *        长度外，这些合约对其内容不提供任何保证。
     */
    function _initiateETHDeposit(
        address _from,
        address _to,
        uint32 _l2Gas,
        bytes memory _data
    ) internal {
        // 为 finalizeDeposit 调用构建 calldata
        bytes memory message = abi.encodeWithSelector(
```

跨域消息的工作方式是将消息作为其 calldata 来调用目的地合约。
Solidity 合约总是根据
[ABI 规范](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html)来解释它们的 calldata。
Solidity 函数 [`abi.encodeWithSelector`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#abi-encoding-and-decoding-functions) 创建该 calldata。

```solidity
            IL2ERC20Bridge.finalizeDeposit.selector,
            address(0),
            Lib_PredeployAddresses.OVM_ETH,
            _from,
            _to,
            msg.value,
            _data
        );
```

这里的消息是使用这些参数调用 [`finalizeDeposit` 函数](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol#L141-L148)：

| 参数                              | Value                                                                                    | 含义                                                                                               |
| ------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| \_l1Token | address(0)                                                            | 在 L1 上代表 ETH（不是 ERC-20 代币）的特殊值                                                                   |
| \_l2Token | Lib_PredeployAddresses.OVM_ETH | 在 Optimism 上管理 ETH 的 L2 合约，地址为 `0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000`（此合约仅供 Optimism 内部使用） |
| \_from    | \_from                                                             | 发送 ETH 的 L1 地址                                                                                   |
| \_to      | \_to                                                               | 接收 ETH 的 L2 地址                                                                                   |
| amount                          | msg.value                                                                | 发送的 wei 数量（已经发送到链桥）                                                                              |
| \_data    | \_data                                                             | 附加到存款的额外数据                                                                                       |

```solidity
        // 将 calldata 发送到 L2
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);
```

通过跨域信使发送消息。

```solidity
        // slither-disable-next-line reentrancy-events
        emit ETHDepositInitiated(_from, _to, msg.value, _data);
    }
```

触发一个事件来通知监听这笔转账的所有去中心化应用程序。

```solidity
    /**
     * @inheritdoc IL1ERC20Bridge
     */
    function depositERC20(
		.
		.
		.
    ) external virtual onlyEOA {
        _initiateERC20Deposit(_l1Token, _l2Token, msg.sender, msg.sender, _amount, _l2Gas, _data);
    }

    /**
     * @inheritdoc IL1ERC20Bridge
     */
    function depositERC20To(
		.
		.
		.
    ) external virtual {
        _initiateERC20Deposit(_l1Token, _l2Token, msg.sender, _to, _amount, _l2Gas, _data);
    }
```

这两个函数是 `_initiateERC20Deposit` 的包装器，该函数处理实际的 ERC-20 存款。

```solidity
    /**
     * @dev 通过通知 L2 存款代币
     * 合约存款并调用处理程序锁定 L1 资金来执行存款逻辑。（例如，transferFrom）
     *
     * @param _l1Token 我们要存入的 L1 ERC20 的地址
     * @param _l2Token L1 对应的 L2 ERC20 的地址
     * @param _from 在 L1 上提取存款的帐户
     * @param _to 在 L2 上给予存款的帐户
     * @param _amount 要存入的 ERC20 的数量。
     * @param _l2Gas 在 L2 上完成存款所需的燃料限制。
     * @param _data 要转发到 L2 的可选数据。此数据
     *        仅为方便外部合约而提供。除了强制执行最大
     *        长度外，这些合约对其内容不提供任何保证。
     */
    function _initiateERC20Deposit(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) internal {
```

此函数类似于上面的 `_initiateETHDeposit`，但有一些重要区别。
第一个区别是此函数接收代币地址和转账金额作为参数。
对于 ETH，对链桥的调用已经包括将资产转账到链桥帐户 (`msg.value`)。

```solidity
        // 当在 L1 上发起存款时，L1 链桥将资金转移给自己以备将来
        // 取款。safeTransferFrom 还会检查合约是否有代码，因此如果
        // _from 是 EOA 或 address(0)，此操作将失败。
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        IERC20(_l1Token).safeTransferFrom(_from, address(this), _amount);
```

ERC-20 代币的转账过程不同于 ETH：

1. 用户（`_from`）授予链桥许可额度以转移相应的代币。
2. 用户使用代币合约的地址、金额等调用链桥。
3. 在存款过程中，链桥转移代币（给自己）。

第一步可能和最后两步发生在不同的交易中。
但是，抢先交易不是问题，因为调用 `_initiateERC20Deposit` 的两个函数（`depositERC20` 和 `depositERC20To`）只将 `msg.sender` 作为 `_from` 参数调用该函数。

```solidity
        // 为 _l2Token.finalizeDeposit(_to, _amount) 构建 calldata
        bytes memory message = abi.encodeWithSelector(
            IL2ERC20Bridge.finalizeDeposit.selector,
            _l1Token,
            _l2Token,
            _from,
            _to,
            _amount,
            _data
        );

        // 将 calldata 发送到 L2
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);

        // slither-disable-next-line reentrancy-benign
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] + _amount;
```

将存入的代币数量添加到 `deposits` 数据结构中。
L2 上可能有多个地址对应于同一个 L1 ERC-20 代币，因此仅使用链桥的 L1 ERC-20 代币余额来跟踪存款是不够的。

```solidity

        // slither-disable-next-line reentrancy-events
        emit ERC20DepositInitiated(_l1Token, _l2Token, _from, _to, _amount, _data);
    }

    /*************************
     * 跨链函数 *
     *************************/

    /**
     * @inheritdoc IL1StandardBridge
     */
    function finalizeETHWithdrawal(
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
```

L2 链桥向 L2 跨域信使发送一条消息，这会使 L1 跨域信使调用此函数（当然，前提是[最终确定该消息的交易](https://community.optimism.io/docs/developers/bridge/messaging/#fees-for-l2-%E2%87%92-l1-transactions)已在 L1 上提交）。

```solidity
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

确保这是一条_合法_消息，来自跨域信使并源自 L2 代币链桥。
此函数用于从链桥中提取 ETH，因此我们必须确保它仅由授权调用者调用。

```solidity
        // slither-disable-next-line reentrancy-events
        (bool success, ) = _to.call{ value: _amount }(new bytes(0));
```

转移 ETH 的方式是用 `msg.value` 中的 wei 数量调用接收者。

```solidity
        require(success, "TransferHelper::safeTransferETH: ETH transfer failed");

        // slither-disable-next-line reentrancy-events
        emit ETHWithdrawalFinalized(_from, _to, _amount, _data);
```

触发一个关于取款的事件。

```solidity
    }

    /**
     * @inheritdoc IL1ERC20Bridge
     */
    function finalizeERC20Withdrawal(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

此函数类似于上面的 `finalizeETHWithdrawal`，但对 ERC-20 代币进行了必要的更改。

```solidity
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] - _amount;
```

更新 `deposits` 数据结构。

```solidity

        // 当在 L1 上最终确定取款时，L1 链桥将资金转移给取款人
        // slither-disable-next-line reentrancy-events
        IERC20(_l1Token).safeTransfer(_to, _amount);

        // slither-disable-next-line reentrancy-events
        emit ERC20WithdrawalFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
    }


    /*****************************
     * 临时 - 迁移 ETH *
     *****************************/

    /**
     * @dev 将 ETH 余额添加到帐户。这旨在允许将 ETH
     * 从旧网关迁移到新网关。
     * 注意：这只保留一次升级，以便我们能够从
     * 旧合约接收迁移的 ETH
     */
    function donateETH() external payable {}
}
```

链桥有更早的实现。
当我们从该实现转移到当前实现时，我们必须转移所有资产。
ERC-20 代币可以直接移动。
但是，要将 ETH 转账到合约，你需要得到该合约的批准，`donateETH` 就起到这一作用。

## L2 上的 ERC-20 代币 {#erc-20-tokens-on-l2}

为了使 ERC-20 代币适合标准链桥，它需要允许标准链桥并且只允许标准链桥铸造代币。
这是必要的，因为链桥需要确保在 Optimism 上流通的代币数量和锁定在 L1 链桥合约内的代币数量相同。
如果 L2 上的代币太多，一些用户将无法将他们的资产桥接到 L1。
我们本质上不是在创建一个可信的链桥，而是在重建[部分准备金银行制度](https://www.investopedia.com/terms/f/fractionalreservebanking.asp)。
如果 L1 上的代币太多，其中一些代币将永远锁定在链桥合约中，因为不销毁 L2 代币就无法释放它们。

### IL2StandardERC20 {#il2standarderc20}

在 L2 上使用标准链桥的每个 ERC-20 代币都需要提供[此接口](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/IL2StandardERC20.sol)，其中包含标准链桥所需的函数和事件。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[标准 ERC-20 接口](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol)不包括 `mint` 和 `burn` 函数。
[ERC-20 标准](https://eips.ethereum.org/EIPS/eip-20)不需要这些方法，它未指定创建和销毁代币的机制。

```solidity
import { IERC165 } from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
```

[ERC-165 接口](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/introspection/IERC165.sol)用于指定合约提供的函数。
[你可以在此处阅读该标准](https://eips.ethereum.org/EIPS/eip-165)。

```solidity
interface IL2StandardERC20 is IERC20, IERC165 {
    function l1Token() external returns (address);
```

此函数提供桥接到此合约的 L1 代币的地址。
请注意，我们在相反方向没有类似函数。
我们需要能够桥接任何 L1 代币，无论第二层支持是否在实施计划。

```solidity

    function mint(address _to, uint256 _amount) external;

    function burn(address _from, uint256 _amount) external;

    event Mint(address indexed _account, uint256 _amount);
    event Burn(address indexed _account, uint256 _amount);
}
```

铸造（创建）和销毁（销毁）代币的函数和事件。
链桥应该是唯一可以运行这些函数的实体，以确保代币数量正确（等于锁定在 L1 上的代币数量）。

### L2StandardERC20 {#L2StandardERC20}

[这是我们对 `IL2StandardERC20` 接口的实现](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/L2StandardERC20.sol)。
除非你需要某种自定义逻辑，否则你应该使用它。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

[OpenZeppelin ERC-20 合约](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)。
Optimism 不相信重新发明轮子，尤其是当轮子经过严格审计并且需要足够的信任来持有资产时。

```solidity
import "./IL2StandardERC20.sol";

contract L2StandardERC20 is IL2StandardERC20, ERC20 {
    address public l1Token;
    address public l2Bridge;
```

上面是两个额外的配置参数，我们需要它们但 ERC-20 通常不需要。

```solidity

    /**
     * @param _l2Bridge L2 标准链桥的地址。
     * @param _l1Token 相应 L1 代币的地址。
     * @param _name ERC20 名称。
     * @param _symbol ERC20 符号。
     */
    constructor(
        address _l2Bridge,
        address _l1Token,
        string memory _name,
        string memory _symbol
    ) ERC20(_name, _symbol) {
        l1Token = _l1Token;
        l2Bridge = _l2Bridge;
    }
```

首先调用从 (`ERC20(_name, _symbol)`) 继承的合约的构造函数，然后设置我们自己的变量。

```solidity

    modifier onlyL2Bridge() {
        require(msg.sender == l2Bridge, "只有 L2 链桥可以铸造和销毁");
        _;
    }


    // slither-disable-next-line external-function
    function supportsInterface(bytes4 _interfaceId) public pure returns (bool) {
        bytes4 firstSupportedInterface = bytes4(keccak256("supportsInterface(bytes4)")); // ERC165
        bytes4 secondSupportedInterface = IL2StandardERC20.l1Token.selector ^
            IL2StandardERC20.mint.selector ^
            IL2StandardERC20.burn.selector;
        return _interfaceId == firstSupportedInterface || _interfaceId == secondSupportedInterface;
    }
```

这就是 [ERC-165](https://eips.ethereum.org/EIPS/eip-165) 的工作方式。
每个接口都是由一系列支持的函数组成，并通过这些函数的 [ABI 函数选择器](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html#function-selector)的[异或](https://en.wikipedia.org/wiki/Exclusive_or)运算来识别。

L2 链桥使用 ERC-165 作为完整性检查，以确保它发送资产的 ERC-20 合约是 `IL2StandardERC20`。

**注意：** 没有任何东西可以阻止恶意合约为 `supportsInterface` 提供虚假应答，所以这是一种完整性检查机制而_不是_安全机制。

```solidity
    // slither-disable-next-line external-function
    function mint(address _to, uint256 _amount) public virtual onlyL2Bridge {
        _mint(_to, _amount);

        emit Mint(_to, _amount);
    }

    // slither-disable-next-line external-function
    function burn(address _from, uint256 _amount) public virtual onlyL2Bridge {
        _burn(_from, _amount);

        emit Burn(_from, _amount);
    }
}
```

只允许 L2 链桥铸造和销毁资产。

`_mint` 和 `_burn` 实际上是在 [OpenZeppelin ERC-20 合约](/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn)中定义的。
该合约只是没有将它们暴露在外部，因为铸造和销毁代币的条件与 ERC-20 使用方式的数量一样多变。

## L2 链桥代码 {#l2-bridge-code}

这是在 Optimism 上运行链桥的代码。
[此合约的源代码在此处](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol)。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/* 接口导入 */
import { IL1StandardBridge } from "../../L1/messaging/IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "../../L1/messaging/IL1ERC20Bridge.sol";
import { IL2ERC20Bridge } from "./IL2ERC20Bridge.sol";
```

[IL2ERC20Bridge](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) 接口与我们上面看到的 [L1 等效接口](#IL1ERC20Bridge)非常相似。
有两个明显区别：

1. 在 L1 上你发起存款并完成取款。
   在此处你发起取款并完成存款。
2. 在 L1 上，有必要区分 ETH 和 ERC-20 代币。
   在 L2 上，我们可以对两者使用相同的函数，因为在内部，Optimism 上的 ETH 余额被当作一个地址为 [0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000](https://explorer.optimism.io/address/0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000) 的 ERC-20 代币来处理。

```solidity
/* 库导入 */
import { ERC165Checker } from "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";

/* 合约导入 */
import { IL2StandardERC20 } from "../../standards/IL2StandardERC20.sol";

/**
 * @title L2StandardBridge
 * @dev L2 标准链桥是一个与 L1 标准链桥协同工作的合约，
 * 用于在 L1 和 L2 之间实现 ETH 和 ERC20 的转换。
 * 当该合约监听到 L1 标准
 * 链桥的存款时，它将充当新代币的铸造者。
 * 该合约还充当用于取款的代币的销毁者，通知 L1
 * 链桥释放 L1 资金。
 */
contract L2StandardBridge is IL2ERC20Bridge, CrossDomainEnabled {
    /********************************
     * 外部合约引用 *
     ********************************/

    address public l1TokenBridge;
```

跟踪 L1 链桥的地址。
请注意，与 L1 对应项相比，此处我们需要该变量。
L1 链桥的地址事先不为人知。

```solidity

    /***************
     * 构造函数 *
     ***************/

    /**
     * @param _l2CrossDomainMessenger 此合约使用的跨域信使。
     * @param _l1TokenBridge 部署到主链的 L1 链桥地址。
     */
    constructor(address _l2CrossDomainMessenger, address _l1TokenBridge)
        CrossDomainEnabled(_l2CrossDomainMessenger)
    {
        l1TokenBridge = _l1TokenBridge;
    }

    /***************
     * 取款 *
     ***************/

    /**
     * @inheritdoc IL2ERC20Bridge
     */
    function withdraw(
        address _l2Token,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) external virtual {
        _initiateWithdrawal(_l2Token, msg.sender, msg.sender, _amount, _l1Gas, _data);
    }

    /**
     * @inheritdoc IL2ERC20Bridge
     */
    function withdrawTo(
        address _l2Token,
        address _to,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) external virtual {
        _initiateWithdrawal(_l2Token, msg.sender, _to, _amount, _l1Gas, _data);
    }
```

这两个函数发起取款。
请注意，无需指定 L1 代币地址。
L2 代币需要告诉我们 L1 代币的地址。

```solidity

    /**
     * @dev 通过销毁代币并通知
     *      L1 代币网关取款来执行取款逻辑。
     * @param _l2Token 发起取款的 L2 代币地址。
     * @param _from 在 L2 上提取取款的帐户。
     * @param _to 在 L1 上给予取款的帐户。
     * @param _amount 要取款的代币数量。
     * @param _l1Gas 未使用，但为潜在的向前兼容性考虑而包含。
     * @param _data 要转发到 L1 的可选数据。此数据
     *        仅为方便外部合约而提供。除了强制执行最大
     *        长度外，这些合约对其内容不提供任何保证。
     */
    function _initiateWithdrawal(
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) internal {
        // 当发起取款时，我们销毁取款人的资金以防止后续的 L2
        // 使用
        // slither-disable-next-line reentrancy-events
        IL2StandardERC20(_l2Token).burn(msg.sender, _amount);
```

请注意，我们不依赖 `_from` 参数，而是依赖更难伪造的 `msg.sender`（据我所知它无法伪造）。

```solidity

        // 为 l1TokenBridge.finalizeERC20Withdrawal(_to, _amount) 构建 calldata
        // slither-disable-next-line reentrancy-events
        address l1Token = IL2StandardERC20(_l2Token).l1Token();
        bytes memory message;

        if (_l2Token == Lib_PredeployAddresses.OVM_ETH) {
```

在 L1 上，有必要区分 ETH 和 ERC-20。

```solidity
            message = abi.encodeWithSelector(
                IL1StandardBridge.finalizeETHWithdrawal.selector,
                _from,
                _to,
                _amount,
                _data
            );
        } else {
            message = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                l1Token,
                _l2Token,
                _from,
                _to,
                _amount,
                _data
            );
        }

        // 将消息发送到 L1 链桥
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l1TokenBridge, _l1Gas, message);

        // slither-disable-next-line reentrancy-events
        emit WithdrawalInitiated(l1Token, _l2Token, msg.sender, _to, _amount, _data);
    }

    /************************************
     * 跨链函数：存款 *
     ************************************/

    /**
     * @inheritdoc IL2ERC20Bridge
     */
    function finalizeDeposit(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
```

此函数由 `L1StandardBridge` 调用。

```solidity
    ) external virtual onlyFromCrossDomainAccount(l1TokenBridge) {
```

确保消息来源是合法的。
这很重要，因为此函数调用 `_mint` 并且可用于提供链桥在 L1 所拥有代币范围外的代币。

```solidity
        // 检查目标代币是否合规且
        // 验证 L1 上的存款代币与此处的 L2 存款代币表示匹配
        if (
            // slither-disable-next-line reentrancy-events
            ERC165Checker.supportsInterface(_l2Token, 0x1d1d8b63) &&
            _l1Token == IL2StandardERC20(_l2Token).l1Token()
```

完整性检查：

1. 支持正确的接口
2. L2 ERC-20 合约的 L1 地址与 L1 的代币来源相符

```solidity
        ) {
            // 当存款最终确定时，我们会在 L2 上为该帐户记入相同数量的
            // 代币。
            // slither-disable-next-line reentrancy-events
            IL2StandardERC20(_l2Token).mint(_to, _amount);
            // slither-disable-next-line reentrancy-events
            emit DepositFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
```

如果完整性检查通过，则完成存款：

1. 铸造代币
2. 触发恰当的事件

```solidity
        } else {
            // 存入的 L2 代币要么不同意其 L1 代币的正确地址
            //，要么不支持正确的接口。
            // 这只应在存在恶意的 L2 代币，或者用户以某种方式
            // 指定了错误的 L2 代币地址进行存款时发生。
            // 在任何一种情况下，我们都在此停止该过程并构建一条取款
            // 消息，以便用户在某些情况下可以取回他们的资金。
            // 完全防止恶意代币合约是不可能的，但这确实限制了
            // 用户错误并减轻了某些形式的恶意合约行为。
```

如果用户由于使用错误的 L2 代币地址犯了可检测到的错误，我们希望取消存款并在 L1 上返还代币。
在 L2 我们可以做到这一点的唯一方法是等到故障挑战期到来后发送一条消息，但对用户来说这要比永久失去代币好得多。

```solidity
            bytes memory message = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                _l1Token,
                _l2Token,
                _to, // 在这里切换了 _to 和 _from 以将存款退回给发送者
                _from,
                _amount,
                _data
            );

            // 将消息发送到 L1 链桥
            // slither-disable-next-line reentrancy-events
            sendCrossDomainMessage(l1TokenBridge, 0, message);
            // slither-disable-next-line reentrancy-events
            emit DepositFailed(_l1Token, _l2Token, _from, _to, _amount, _data);
        }
    }
}
```

## 结论 {#conclusion}

标准链桥是最灵活的资产转移机制。
然而，由于它非常通用，因而并非总是可供使用的最简便机制。
特别是对于取款，大多数用户喜欢使用[第三方链桥](https://optimism.io/apps#bridge)，这些链桥不用等待挑战期并且不需要进行默克尔证明就能完成取款。

通常，这些链桥的工作方式是在 L1 上拥有资产，而且它们会立即为这些资产提供一小笔费用（通常少于标准链桥取款的燃料费用）。
当链桥（或运行链桥的人）预计 L1 资产短缺时，它将从 L2 转移足够的资产。 由于这些取款的数额非常庞大，大笔的取款费用经分期摊销后，所占百分比要小得多。

希望本文能帮助你更多地了解第 2 层如何工作以及如何编写清晰安全的 Solidity 代码。

[点击此处查看我的更多作品](https://cryptodocguy.pro/)。
