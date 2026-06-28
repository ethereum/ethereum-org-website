---
title: "Optimism 标准跨链桥合约演练"
description: "Optimism 的标准跨链桥是如何工作的？为什么它要这样工作？"
author: "奥里·波梅兰茨"
tags: ["Solidity", "跨链桥", "二层网络 (l2)"]
skill: intermediate
breadcrumb: "Optimism 跨链桥"
published: 2022-03-30
lang: zh
---

[Optimism](https://www.optimism.io/) 是一种[乐观 Rollup](/developers/docs/scaling/optimistic-rollups/)。
乐观 Rollup 处理交易的价格比以太坊主网（也称为一层网络 (l1)）低得多，因为交易仅由少数节点处理，而不是网络上的每个节点。
同时，数据全部写入一层网络 (l1)，因此可以利用主网的所有完整性和可用性保证来证明和重建一切。

要在 Optimism（或任何其他二层网络 (l2)）上使用一层网络 (l1) 资产，需要将资产[跨链](/bridges/#prerequisites)。
实现此目的的一种方法是用户在一层网络 (l1) 上锁定资产（ETH 和 [ERC-20 代币](/developers/docs/standards/tokens/erc-20/)是最常见的），并接收等值的资产以在二层网络 (l2) 上使用。
最终，无论谁获得了这些资产，都可能希望将它们跨链回一层网络 (l1)。
执行此操作时，资产在二层网络 (l2) 上被销毁，然后在一层网络 (l1) 上释放回给用户。

这就是 [Optimism 标准跨链桥](https://docs.optimism.io/app-developers/bridging/standard-bridge)的工作方式。
在本文中，我们将浏览该跨链桥的源代码以了解其工作原理，并将其作为编写良好的 Solidity 代码示例进行研究。

## 控制流 {#control-flows}

跨链桥有两个主要流程：

- 存款（从一层网络 (l1) 到二层网络 (l2)）
- 提款（从二层网络 (l2) 到一层网络 (l1)）

### 存款流程 {#deposit-flow}

#### 一层网络 (l1) {#deposit-flow-layer-1}

1. 如果存入 ERC-20，存款人会给跨链桥一个授权额度，以花费正在存入的金额
2. 存款人调用一层网络 (l1) 跨链桥（`depositERC20`、`depositERC20To`、`depositETH` 或 `depositETHTo`）
3. 一层网络 (l1) 跨链桥取得跨链资产的所有权
   - ETH：资产由存款人作为调用的一部分进行转账
   - ERC-20：跨链桥使用存款人提供的授权额度将资产转账给自己
4. 一层网络 (l1) 跨链桥使用跨域消息机制调用二层网络 (l2) 跨链桥上的 `finalizeDeposit`

#### 二层网络 (l2) {#deposit-flow-layer-2}

5. 二层网络 (l2) 跨链桥验证对 `finalizeDeposit` 的调用是否合法：
   - 来自跨域消息合约
   - 最初来自一层网络 (l1) 上的跨链桥
6. 二层网络 (l2) 跨链桥检查二层网络 (l2) 上的 ERC-20 代币合约是否正确：
   - 二层网络 (l2) 合约报告其一层网络 (l1) 对应合约与一层网络 (l1) 上代币来源的合约相同
   - 二层网络 (l2) 合约报告它支持正确的接口（[使用 ERC-165](https://eips.ethereum.org/EIPS/eip-165)）。
7. 如果二层网络 (l2) 合约正确，则调用它以向适当的地址铸造适当数量的代币。如果不正确，则启动提款流程，以允许用户在一层网络 (l1) 上申领代币。

### 提款流程 {#withdrawal-flow}

#### 二层网络 (l2) {#withdrawal-flow-layer-2}

1. 提款人调用二层网络 (l2) 跨链桥（`withdraw` 或 `withdrawTo`）
2. 二层网络 (l2) 跨链桥销毁属于 `msg.sender` 的适当数量的代币
3. 二层网络 (l2) 跨链桥使用跨域消息机制调用一层网络 (l1) 跨链桥上的 `finalizeETHWithdrawal` 或 `finalizeERC20Withdrawal`

#### 一层网络 (l1) {#withdrawal-flow-layer-1}

4. 一层网络 (l1) 跨链桥验证对 `finalizeETHWithdrawal` 或 `finalizeERC20Withdrawal` 的调用是否合法：
   - 来自跨域消息机制
   - 最初来自二层网络 (l2) 上的跨链桥
5. 一层网络 (l1) 跨链桥将适当的资产（ETH 或 ERC-20）转账到适当的地址

## 一层网络 (l1) 代码 {#layer-1-code}

这是在一层网络 (l1)（以太坊主网）上运行的代码。

### IL1ERC20Bridge {#il1erc20bridge}

[此接口在此处定义](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1ERC20Bridge.sol)。
它包含跨链 ERC-20 代币所需的函数和定义。

```solidity
// SPDX-License-Identifier: MIT
```

[Optimism 的大部分代码都是在 MIT 许可下发布的](https://help.optimism.io/hc/en-us/articles/4411908707995-What-software-license-does-Optimism-use-)。

```solidity
pragma solidity >0.5.0 <0.9.0;
```

在撰写本文时，Solidity 的最新版本是 0.8.12。
在 0.9.0 版本发布之前，我们不知道此代码是否与其兼容。

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

在 Optimism 跨链桥术语中，_存款 (deposit)_ 意味着从一层网络 (l1) 转账到二层网络 (l2)，而 _提款 (withdrawal)_ 意味着从二层网络 (l2) 转账到一层网络 (l1)。

```solidity
        address indexed _l1Token,
        address indexed _l2Token,
```

在大多数情况下，一层网络 (l1) 上 ERC-20 的地址与二层网络 (l2) 上等效 ERC-20 的地址不同。
[您可以在此处查看代币地址列表](https://static.optimism.io/optimism.tokenlist.json)。
具有 `chainId` 1 的地址在一层网络 (l1)（主网）上，具有 `chainId` 10 的地址在二层网络 (l2)（Optimism）上。
另外两个 `chainId` 值用于 Kovan 测试网络 (42) 和 Optimistic Kovan 测试网络 (69)。

```solidity
        address indexed _from,
        address _to,
        uint256 _amount,
        bytes _data
    );
```

可以向转账添加注释，在这种情况下，它们会被添加到报告它们的事件中。

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

同一个跨链桥合约处理双向转账。
对于一层网络 (l1) 跨链桥，这意味着初始化存款和完成提款。

```solidity

    /********************
     * 公共函数 *
     ********************/

    /**
     * @dev 获取相应的二层网络 (l2)跨链桥合约的地址。
     * @return 相应的二层网络 (l2)跨链桥合约的地址。
     */
    function l2TokenBridge() external returns (address);
```

这个函数并不是真正需要的，因为在二层网络 (l2) 上它是一个预部署的合约，所以它总是在地址 `0x4200000000000000000000000000000000000010`。
它在这里是为了与二层网络 (l2) 跨链桥对称，因为一层网络 (l1) 跨链桥的地址_并不_容易知道。

```solidity
    /**
     * @dev 将一定数量的ERC-20代币存入调用者在二层网络 (l2)上的余额中。
     * @param _l1Token 我们正在存入的一层网络 (l1) ERC-20代币的地址
     * @param _l2Token 一层网络 (l1)对应的二层网络 (l2) ERC-20代币的地址
     * @param _amount 要存入的ERC-20代币数量
     * @param _l2Gas 在二层网络 (l2)上完成存款所需的Gas限制。
     * @param _data 要转发到二层网络 (l2)的可选数据。提供此数据
     *        仅仅是为了方便外部合约。除了强制执行最大
     *        长度外，这些合约不对其内容提供任何保证。
     */
    function depositERC20(
        address _l1Token,
        address _l2Token,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

`_l2Gas` 参数是交易允许花费的二层网络 (l2) Gas 数量。
[在达到某个（较高的）限制之前，这是免费的](https://community.optimism.io/docs/developers/bridge/messaging/#for-l1-%E2%87%92-l2-transactions-2)，因此除非 ERC-20 合约在铸造时执行了非常奇怪的操作，否则这不应该成为问题。
此函数处理常见场景，即用户将资产跨链到不同区块链上的相同地址。

```solidity
    /**
     * @dev 将一定数量的ERC-20代币存入接收者在二层网络 (l2)上的余额中。
     * @param _l1Token 我们正在存入的一层网络 (l1) ERC-20代币的地址
     * @param _l2Token 一层网络 (l1)对应的二层网络 (l2) ERC-20代币的地址
     * @param _to 要将提款记入的二层网络 (l2)地址。
     * @param _amount 要存入的ERC-20代币数量。
     * @param _l2Gas 在二层网络 (l2)上完成存款所需的Gas限制。
     * @param _data 要转发到二层网络 (l2)的可选数据。提供此数据
     *        仅仅是为了方便外部合约。除了强制执行最大
     *        长度外，这些合约不对其内容提供任何保证。
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

此函数几乎与 `depositERC20` 相同，但它允许您将 ERC-20 发送到不同的地址。

```solidity
    /*************************
     * 跨链函数 *
     *************************/

    /**
     * @dev 完成从二层网络 (l2)到一层网络 (l1)的提款，并将资金记入接收者的一层网络 (l1) ERC-20代币余额中。
     * 如果从二层网络 (l2)初始化的提款尚未最终确定，此调用将失败。
     *
     * @param _l1Token 要为其finalizeWithdrawal的一层网络 (l1)代币的地址。
     * @param _l2Token 发起提款的二层网络 (l2)代币的地址。
     * @param _from 发起转账的二层网络 (l2)地址。
     * @param _to 要将提款记入的一层网络 (l1)地址。
     * @param _amount 要存入的ERC-20代币数量。
     * @param _data 发送者在二层网络 (l2)上提供的数据。提供此数据
     *   仅仅是为了方便外部合约。除了强制执行最大
     *   长度外，这些合约不对其内容提供任何保证。
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

Optimism 中的提款（以及从二层网络 (l2) 到一层网络 (l1) 的其他消息）是一个两步过程：

1. 二层网络 (l2) 上的初始交易。
2. 一层网络 (l1) 上的完成或申领交易。
   此交易需要在二层网络 (l2) 交易的[错误挑战期](https://community.optimism.io/docs/how-optimism-works/#fault-proofs)结束后发生。

### IL1StandardBridge {#il1standardbridge}

[此接口在此处定义](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1StandardBridge.sol)。
此文件包含 ETH 的事件和函数定义。
这些定义与上面在 `IL1ERC20Bridge` 中为 ERC-20 定义的非常相似。

跨链桥接口分为两个文件，因为某些 ERC-20 代币需要自定义处理，无法由标准跨链桥处理。
这样，处理此类代币的自定义跨链桥可以实现 `IL1ERC20Bridge`，而不必同时跨链 ETH。

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

此事件几乎与 ERC-20 版本（`ERC20DepositInitiated`）相同，只是没有一层网络 (l1) 和二层网络 (l2) 代币地址。
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
     * @dev 将一定数量的ETH存入调用者在二层网络 (l2)上的余额中。
            .
            .
            .
     */
    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable;

    /**
     * @dev 将一定数量的ETH存入接收者在二层网络 (l2)上的余额中。
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
     * @dev 完成从二层网络 (l2)到一层网络 (l1)的提款，并将资金记入接收者的一层网络 (l1) ETH代币余额中。由于只有xDomainMessenger可以调用此函数，因此在提款最终确定之前永远不会调用它。
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

[此合约](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/CrossDomainEnabled.sol)由两个跨链桥（[一层网络 (l1)](#the-l1-bridge-contract) 和 [二层网络 (l2)](#l2-bridge-code)）继承，以向另一层发送消息。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

/* 接口导入 */
import { ICrossDomainMessenger } from "./ICrossDomainMessenger.sol";
```

[此接口](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/ICrossDomainMessenger.sol)告诉合约如何使用跨域信使向另一层发送消息。
这个跨域信使是另一个完整的系统，值得单独写一篇文章，我希望将来能写。

```solidity
/**
 * @title CrossDomainEnabled
 * @dev 用于执行跨域通信的合约的辅助合约
 *
 * 使用的编译器：由继承的合约定义
 */
contract CrossDomainEnabled {
    /*************
     * 变量 *
     *************/

    // 用于发送和接收来自其他域的消息的信使合约。
    address public messenger;

    /***************
     * 构造函数 *
     ***************/

    /**
     * @param _messenger 当前层上的CrossDomainMessenger的地址。
     */
    constructor(address _messenger) {
        messenger = _messenger;
    }
```

合约需要知道的一个参数，即该层上跨域信使的地址。
此参数在构造函数中设置一次，并且永远不会改变。

```solidity

    /**********************
     * 函数修饰符 *
     **********************/

    /**
     * 强制修改后的函数只能由特定的跨域账户调用。
     * @param _sourceDomainAccount 源域上唯一被认证
     *  调用此函数的账户。
     */
    modifier onlyFromCrossDomainAccount(address _sourceDomainAccount) {
```

跨域消息传递可由其运行的区块链（以太坊主网或 Optimism）上的任何合约访问。
但是我们需要每一侧的跨链桥_仅_信任来自另一侧跨链桥的特定消息。

```solidity
        require(
            msg.sender == address(getCrossDomainMessenger()),
            "OVM_XCHAIN: messenger contract unauthenticated"
        );
```

只有来自适当跨域信使（`messenger`，如下所示）的消息才能被信任。

```solidity

        require(
            getCrossDomainMessenger().xDomainMessageSender() == _sourceDomainAccount,
            "OVM_XCHAIN: wrong sender of cross-domain message"
        );
```

跨域信使提供向另一层发送消息的地址的方式是 [`.xDomainMessageSender()` 函数](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1CrossDomainMessenger.sol#L122-L128)。
只要在由消息发起的交易中调用它，它就可以提供此信息。

我们需要确保收到的消息来自另一个跨链桥。

```solidity

        _;
    }

    /**********************
     * 内部函数 *
     **********************/

    /**
     * 获取信使，通常从存储中获取。暴露此函数是为了防止子合约
     * 需要重写。
     * @return 应该使用的跨域信使合约的地址。
     */
    function getCrossDomainMessenger() internal virtual returns (ICrossDomainMessenger) {
        return ICrossDomainMessenger(messenger);
    }
```

此函数返回跨域信使。
我们使用函数而不是变量 `messenger`，以允许继承自此合约的合约使用算法来指定要使用的跨域信使。

```solidity

    /**
     * 向另一个域上的账户发送消息
     * @param _crossDomainTarget 目标域上的预期接收者
     * @param _message 要发送给目标的数据（通常是带有
     *  `onlyFromCrossDomainAccount()`的函数的调用数据）
     * @param _gasLimit 在目标域上接收消息的Gas限制。
     */
    function sendCrossDomainMessage(
        address _crossDomainTarget,
        uint32 _gasLimit,
        bytes memory _message
```

最后，向另一层发送消息的函数。

```solidity
    ) internal {
        // 斯莱瑟-disable-next-line 重入-事件, 重入-benign
```

[斯莱瑟](https://github.com/crytic/slither) 是 Optimism 在每个合约上运行的静态分析器，用于查找漏洞和其他潜在问题。
在这种情况下，以下行触发了两个漏洞：

1. [重入事件](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-3)
2. [良性重入](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-2)

```solidity
        getCrossDomainMessenger().sendMessage(_crossDomainTarget, _message, _gasLimit);
    }
}
```

在这种情况下，我们不担心重入，我们知道 `getCrossDomainMessenger()` 返回一个值得信赖的地址，即使斯莱瑟无法知道这一点。

### 一层网络 (l1) 跨链桥合约 {#the-l1-bridge-contract}

[此合约的源代码在此处](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1StandardBridge.sol)。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
```

接口可以是其他合约的一部分，因此它们必须支持广泛的 Solidity 版本。
但是跨链桥本身是我们的合约，我们可以严格限制它使用的 Solidity 版本。

```solidity
/* 接口导入 */
import { IL1StandardBridge } from "./IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "./IL1ERC20Bridge.sol";
```

[IL1ERC20Bridge](#il1erc20bridge) 和 [IL1StandardBridge](#il1standardbridge) 在上面已解释。

```solidity
import { IL2ERC20Bridge } from "../../L2/messaging/IL2ERC20Bridge.sol";
```

[此接口](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol)允许我们创建消息来控制二层网络 (l2) 上的标准跨链桥。

```solidity
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[此接口](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol)允许我们控制 ERC-20 合约。
[您可以在此处阅读有关它的更多信息](/developers/tutorials/erc20-annotated-code/#the-interface)。

```solidity
/* 库导入 */
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
```

[如上所述](#crossdomainenabled)，此合约用于层间消息传递。

```solidity
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";
```

[`Lib_PredeployAddresses`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/constants/Lib_PredeployAddresses.sol) 包含始终具有相同地址的二层网络 (l2) 合约的地址。这包括二层网络 (l2) 上的标准跨链桥。

```solidity
import { Address } from "@openzeppelin/contracts/utils/Address.sol";
```

[欧本齐柏林的 Address 实用程序](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Address.sol)。它用于区分合约地址和属于外部拥有账户 (EOA) 的地址。

请注意，这不是一个完美的解决方案，因为无法区分直接调用和从合约的构造函数发出的调用，但至少这让我们能够识别并防止一些常见的用户错误。

```solidity
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
```

[ERC-20 标准](https://eips.ethereum.org/EIPS/eip-20) 支持合约报告失败的两种方式：

1. 回退
2. 返回 `false`

处理这两种情况会使我们的代码更加复杂，因此我们使用 [欧本齐柏林的 `SafeERC20`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol)，它确保[所有失败都会导致回退](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol#L96)。

```solidity
/**
 * @title L1StandardBridge
 * @dev 一层网络 (l1) ETH和ERC-20跨链桥是一个合约，用于存储已存入的一层网络 (l1)资金和在二层网络 (l2)上使用的标准
 * 代币。它同步相应的二层网络 (l2)跨链桥，通知其存款
 * 并监听其新最终确定的提款。
 *
 */
contract L1StandardBridge is IL1StandardBridge, CrossDomainEnabled {
    using SafeERC20 for IERC20;
```

这行代码指定了每次使用 `IERC20` 接口时都要使用 `SafeERC20` 包装器。

```solidity

    /********************************
     * 外部合约引用 *
     ********************************/

    address public l2TokenBridge;
```

[L2StandardBridge](#l2-bridge-code) 的地址。

```solidity

    // 将一层网络 (l1)代币映射到二层网络 (l2)代币，再映射到已存入的一层网络 (l1)代币余额
    mapping(address => mapping(address => uint256)) public deposits;
```

像这样的双重[映射](https://www.tutorialspoint.com/solidity/solidity_mappings.htm)是定义[二维稀疏数组](https://en.wikipedia.org/wiki/Sparse_matrix)的方式。
此数据结构中的值标识为 `deposit[L1 token addr][L2 token addr]`。
默认值为零。
只有设置为不同值的单元格才会写入存储。

```solidity

    /***************
     * 构造函数 *
     ***************/

    // 此合约位于代理之后，因此构造函数参数将不会被使用。
    constructor() CrossDomainEnabled(address(0)) {}
```

希望能够升级此合约，而无需复制存储中的所有变量。
为此，我们使用 [`Proxy`](https://docs.openzeppelin.com/contracts/3.x/api/proxy)，这是一个使用 [`delegatecall`](https://solidity-by-example.org/delegatecall/) 将调用转移到单独合约的合约，该单独合约的地址由代理合约存储（升级时，您告诉代理更改该地址）。
当您使用 `delegatecall` 时，存储仍然是_调用_合约的存储，因此所有合约状态变量的值都不受影响。

这种模式的一个影响是，作为 `delegatecall` <em>被调用者</em>的合约的存储未被使用，因此传递给它的构造函数值并不重要。
这就是我们可以为 `CrossDomainEnabled` 构造函数提供无意义值的原因。
这也是下面的初始化与构造函数分开的原因。

```solidity
    /******************
     * 初始化 *
     ******************/

    /**
     * @param _l1messenger 用于跨链通信的一层网络 (l1)信使地址。
     * @param _l2TokenBridge 二层网络 (l2)标准跨链桥地址。
     */
    // 斯莱瑟-disable-next-line external-function
```

此[斯莱瑟测试](https://github.com/crytic/slither/wiki/Detector-Documentation#public-function-that-could-be-declared-external)识别未从合约代码调用的函数，因此可以声明为 `external` 而不是 `public`。
`external` 函数的 Gas 成本可能更低，因为可以在调用数据中为它们提供参数。
声明为 `public` 的函数必须可以从合约内部访问。
合约无法修改自己的调用数据，因此参数必须在内存中。
当从外部调用此类函数时，必须将调用数据复制到内存中，这会消耗 Gas。
在这种情况下，该函数只被调用一次，因此效率低下对我们来说并不重要。

```solidity
    function initialize(address _l1messenger, address _l2TokenBridge) public {
        require(messenger == address(0), "Contract has already been initialized.");
```

`initialize` 函数应该只被调用一次。
如果一层网络 (l1) 跨域信使或二层网络 (l2) 代币跨链桥的地址发生变化，我们将创建一个新的代理和一个调用它的新跨链桥。
除非整个系统升级，否则这不太可能发生，这是一种非常罕见的情况。

请注意，此函数没有任何限制_谁_可以调用它的机制。
这意味着理论上攻击者可以等到我们部署代理和跨链桥的第一个版本，然后[抢跑](https://solidity-by-example.org/hacks/front-running/)，在合法用户之前到达 `initialize` 函数。但是有两种方法可以防止这种情况：

1. 如果合约不是由 EOA 直接部署，而是[在由另一个合约创建它们的交易中](https://medium.com/upstate-interactive/creating-a-contract-with-a-smart-contract-bdb67c5c8595)部署，则整个过程可以是原子的，并在执行任何其他交易之前完成。
2. 如果对 `initialize` 的合法调用失败，始终可以忽略新创建的代理和跨链桥并创建新的。

```solidity
        messenger = _l1messenger;
        l2TokenBridge = _l2TokenBridge;
    }
```

这是跨链桥需要知道的两个参数。

```solidity

    /**************
     * 存款 *
     **************/

    /** @dev 要求发送者为EOA的修饰符。恶意
     *  合约可以通过initcode绕过此检查，但它处理了我们想要避免的用户错误。
     */
    modifier onlyEOA() {
        // 用于停止来自合约的存款（避免意外丢失代币）
        require(!Address.isContract(msg.sender), "Account not EOA");
        _;
    }
```

这就是我们需要欧本齐柏林的 `Address` 实用程序的原因。

```solidity
    /**
     * @dev 可以不带数据调用此函数
     * 以将一定数量的ETH存入调用者在二层网络 (l2)上的余额中。
     * 由于receive函数不接收数据，因此将保守的
     * 默认数量转发到二层网络 (l2)。
     */
    receive() external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, 200_000, bytes(""));
    }
```

此函数用于测试目的。
请注意，它没有出现在接口定义中——它不是用于正常使用的。

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

这两个函数是 `_initiateETHDeposit` 的包装器，`_initiateETHDeposit` 是处理实际 ETH 存款的函数。

```solidity
    /**
     * @dev 通过存储ETH并通知二层网络 (l2) ETH网关存款来执行存款逻辑。
     * @param _from 在一层网络 (l1)上提取存款的账户。
     * @param _to 在二层网络 (l2)上接收存款的账户。
     * @param _l2Gas 在二层网络 (l2)上完成存款所需的Gas限制。
     * @param _data 要转发到二层网络 (l2)的可选数据。提供此数据
     *        仅仅是为了方便外部合约。除了强制执行最大
     *        长度外，这些合约不对其内容提供任何保证。
     */
    function _initiateETHDeposit(
        address _from,
        address _to,
        uint32 _l2Gas,
        bytes memory _data
    ) internal {
        // 为finalizeDeposit调用构造调用数据
        bytes memory message = abi.encodeWithSelector(
```

跨域消息的工作方式是使用消息作为其调用数据来调用目标合约。
Solidity 合约始终根据
[ABI 规范](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html)解释其调用数据。
Solidity 函数 [`abi.encodeWithSelector`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#abi-encoding-and-decoding-functions) 创建该调用数据。

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

这里的消息是使用以下参数调用 [`finalizeDeposit` 函数](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol#L141-L148)：

| 参数 | 值 | 含义 |
| --------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| \_l1Token | address(0) | 代表一层网络 (l1) 上 ETH（不是 ERC-20 代币）的特殊值 |
| \_l2Token | Lib_PredeployAddresses.OVM_ETH | 在 Optimism 上管理 ETH 的二层网络 (l2) 合约，`0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000`（此合约仅供 Optimism 内部使用） |
| \_from | \_from | 一层网络 (l1) 上发送 ETH 的地址 |
| \_to | \_to | 二层网络 (l2) 上接收 ETH 的地址 |
| amount | msg.value | 发送的 Wei 数量（已发送到跨链桥） |
| \_data | \_data | 附加到存款的额外数据 |

```solidity
        // 将调用数据发送到二层网络 (l2)
        // 斯莱瑟-disable-next-line 重入-事件
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);
```

通过跨域信使发送消息。

```solidity
        // 斯莱瑟-disable-next-line 重入-事件
        emit ETHDepositInitiated(_from, _to, msg.value, _data);
    }
```

触发一个事件，以通知任何监听此转账的去中心化应用 (dapp)。

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

这两个函数是 `_initiateERC20Deposit` 的包装器，`_initiateERC20Deposit` 是处理实际 ERC-20 存款的函数。

```solidity
    /**
     * @dev 通过通知二层网络 (l2) Deposited Token
     * 合约存款并调用处理程序锁定一层网络 (l1)资金（例如，transferFrom）来执行存款逻辑。
     *
     * @param _l1Token 我们正在存入的一层网络 (l1) ERC-20代币的地址
     * @param _l2Token 一层网络 (l1)对应的二层网络 (l2) ERC-20代币的地址
     * @param _from 在一层网络 (l1)上提取存款的账户
     * @param _to 在二层网络 (l2)上接收存款的账户
     * @param _amount 要存入的ERC-20代币数量。
     * @param _l2Gas 在二层网络 (l2)上完成存款所需的Gas限制。
     * @param _data 要转发到二层网络 (l2)的可选数据。提供此数据
     *        仅仅是为了方便外部合约。除了强制执行最大
     *        长度外，这些合约不对其内容提供任何保证。
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

此函数与上面的 `_initiateETHDeposit` 类似，但有一些重要的区别。
第一个区别是此函数接收代币地址和要转账的金额作为参数。
在 ETH 的情况下，对跨链桥的调用已经包括将资产转账到跨链桥账户（`msg.value`）。

```solidity
        // 当在一层网络 (l1)上发起存款时，一层网络 (l1)跨链桥将资金转账给自己，以便将来
        // 提款。safeTransferFrom还会检查合约是否有代码，因此如果
        // _from是EOA或address(0)。
        // 斯莱瑟-disable-next-line 重入-事件, 重入-benign
        IERC20(_l1Token).safeTransferFrom(_from, address(this), _amount);
```

ERC-20 代币转账遵循与 ETH 不同的流程：

1. 用户（`_from`）给跨链桥一个授权额度以转账适当的代币。
2. 用户使用代币合约的地址、金额等调用跨链桥。
3. 跨链桥在存款过程中将代币转账（给自己）。

第一步可能发生在与后两步不同的交易中。
然而，抢跑不是问题，因为调用 `_initiateERC20Deposit` 的两个函数（`depositERC20` 和 `depositERC20To`）仅使用 `msg.sender` 作为 `_from` 参数来调用此函数。

```solidity
        // 为_l2Token.finalizeDeposit(_to, _amount)构造调用数据
        bytes memory message = abi.encodeWithSelector(
            IL2ERC20Bridge.finalizeDeposit.selector,
            _l1Token,
            _l2Token,
            _from,
            _to,
            _amount,
            _data
        );

        // 将调用数据发送到二层网络 (l2)
        // 斯莱瑟-disable-next-line 重入-事件, 重入-benign
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);

        // 斯莱瑟-disable-next-line 重入-benign
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] + _amount;
```

将存入的代币数量添加到 `deposits` 数据结构中。
二层网络 (l2) 上可能有多个地址对应于同一个一层网络 (l1) ERC-20 代币，因此仅使用跨链桥的一层网络 (l1) ERC-20 代币余额来跟踪存款是不够的。

```solidity

        // 斯莱瑟-disable-next-line 重入-事件
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

二层网络 (l2) 跨链桥向二层网络 (l2) 跨域信使发送一条消息，这会导致一层网络 (l1) 跨域信使调用此函数（当然，一旦[完成消息的交易](https://community.optimism.io/docs/developers/bridge/messaging/#fees-for-l2-%E2%87%92-l1-transactions)在一层网络 (l1) 上提交）。

```solidity
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

确保这是一条_合法_的消息，来自跨域信使并源自二层网络 (l2) 代币跨链桥。
此函数用于从跨链桥提取 ETH，因此我们必须确保它仅由授权的调用者调用。

```solidity
        // 斯莱瑟-disable-next-line 重入-事件
        (bool success, ) = _to.call{ value: _amount }(new bytes(0));
```

转账 ETH 的方法是使用 `msg.value` 中的 Wei 数量调用接收者。

```solidity
        require(success, "TransferHelper::safeTransferETH: ETH transfer failed");

        // 斯莱瑟-disable-next-line 重入-事件
        emit ETHWithdrawalFinalized(_from, _to, _amount, _data);
```

触发一个关于提款的事件。

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

此函数与上面的 `finalizeETHWithdrawal` 类似，并针对 ERC-20 代币进行了必要的更改。

```solidity
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] - _amount;
```

更新 `deposits` 数据结构。

```solidity

        // 当提款在一层网络 (l1)上最终确定时，一层网络 (l1)跨链桥将资金转账给提款人
        // 斯莱瑟-disable-next-line 重入-事件
        IERC20(_l1Token).safeTransfer(_to, _amount);

        // 斯莱瑟-disable-next-line 重入-事件
        emit ERC20WithdrawalFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
    }


    /*****************************
     * 临时 - 迁移ETH *
     *****************************/

    /**
     * @dev 向账户添加ETH余额。这是为了允许将ETH
     * 从旧网关迁移到新网关。
     * 注意：这仅保留用于一次升级，以便我们能够从
     * 旧合约接收迁移的ETH
     */
    function donateETH() external payable {}
}
```

跨链桥有一个早期的实现。
当我们从那个实现转移到这个实现时，我们必须转移所有资产。
ERC-20 代币可以直接转移。
然而，要将 ETH 转账到合约，您需要该合约的批准，这就是 `donateETH` 为我们提供的。

## 二层网络 (l2) 上的 ERC-20 代币 {#erc-20-tokens-on-l2}

为了让 ERC-20 代币适应标准跨链桥，它需要允许标准跨链桥，并且_仅_允许标准跨链桥铸造代币。
这是必要的，因为跨链桥需要确保在 Optimism 上流通的代币数量等于锁定在一层网络 (l1) 跨链桥合约内的代币数量。
如果二层网络 (l2) 上的代币太多，一些用户将无法将其资产跨链回一层网络 (l1)。
我们将不再是一个受信任的跨链桥，而是在本质上重建[部分准备金银行制度](https://www.investopedia.com/terms/f/fractionalreservebanking.asp)。
如果一层网络 (l1) 上的代币太多，其中一些代币将永远锁定在跨链桥合约内，因为如果不销毁二层网络 (l2) 代币就无法释放它们。

### IL2StandardERC20 {#il2standarderc20}

二层网络 (l2) 上使用标准跨链桥的每个 ERC-20 代币都需要提供[此接口](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/IL2StandardERC20.sol)，其中包含标准跨链桥所需的函数和事件。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[标准 ERC-20 接口](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol)不包括 `mint` 和 `burn` 函数。
[ERC-20 标准](https://eips.ethereum.org/EIPS/eip-20)不需要这些方法，该标准未指定创建和销毁代币的机制。

```solidity
import { IERC165 } from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
```

[ERC-165 接口](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/introspection/IERC165.sol)用于指定合约提供哪些函数。
[您可以在此处阅读该标准](https://eips.ethereum.org/EIPS/eip-165)。

```solidity
interface IL2StandardERC20 is IERC20, IERC165 {
    function l1Token() external returns (address);
```

此函数提供跨链到此合约的一层网络 (l1) 代币的地址。
请注意，我们在相反方向没有类似的函数。
我们需要能够跨链任何一层网络 (l1) 代币，无论在实现它时是否计划了二层网络 (l2) 支持。

```solidity

    function mint(address _to, uint256 _amount) external;

    function burn(address _from, uint256 _amount) external;

    event Mint(address indexed _account, uint256 _amount);
    event Burn(address indexed _account, uint256 _amount);
}
```

用于铸造（创建）和销毁（破坏）代币的函数和事件。
跨链桥应该是唯一可以运行这些函数的实体，以确保代币数量正确（等于锁定在一层网络 (l1) 上的代币数量）。

### L2StandardERC20 {#l2standarderc20}

[这是我们对 `IL2StandardERC20` 接口的实现](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/L2StandardERC20.sol)。
除非您需要某种自定义逻辑，否则您应该使用这个。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

[欧本齐柏林 ERC-20 合约](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)。
Optimism 不相信重复造轮子，特别是当这个轮子经过了良好的审计并且需要足够值得信赖以持有资产时。

```solidity
import "./IL2StandardERC20.sol";

contract L2StandardERC20 is IL2StandardERC20, ERC20 {
    address public l1Token;
    address public l2Bridge;
```

这是我们需要的两个额外的配置参数，而 ERC-20 通常不需要。

```solidity

    /**
     * @param _l2Bridge 二层网络 (l2)标准跨链桥的地址。
     * @param _l1Token 相应的一层网络 (l1)代币的地址。
     * @param _name ERC-20名称。
     * @param _symbol ERC-20符号。
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

首先调用我们继承的合约（`ERC20(_name, _symbol)`）的构造函数，然后设置我们自己的变量。

```solidity

    modifier onlyL2Bridge() {
        require(msg.sender == l2Bridge, "Only L2 Bridge can mint and burn");
        _;
    }


    // 斯莱瑟-disable-next-line external-function
    function supportsInterface(bytes4 _interfaceId) public pure returns (bool) {
        bytes4 firstSupportedInterface = bytes4(keccak256("supportsInterface(bytes4)")); // ERC165
        bytes4 secondSupportedInterface = IL2StandardERC20.l1Token.selector ^
            IL2StandardERC20.mint.selector ^
            IL2StandardERC20.burn.selector;
        return _interfaceId == firstSupportedInterface || _interfaceId == secondSupportedInterface;
    }
```

这就是 [ERC-165](https://eips.ethereum.org/EIPS/eip-165) 的工作方式。
每个接口都是许多受支持的函数，并被标识为这些函数的 [ABI 函数选择器](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html#function-selector)的[异或](https://en.wikipedia.org/wiki/Exclusive_or)。

二层网络 (l2) 跨链桥使用 ERC-165 作为健全性检查，以确保它向其发送资产的 ERC-20 合约是 `IL2StandardERC20`。

**注意：** 没有任何东西可以阻止恶意合约对 `supportsInterface` 提供错误的答案，因此这是一种健全性检查机制，_不是_安全机制。

```solidity
    // 斯莱瑟-disable-next-line external-function
    function mint(address _to, uint256 _amount) public virtual onlyL2Bridge {
        _mint(_to, _amount);

        emit Mint(_to, _amount);
    }

    // 斯莱瑟-disable-next-line external-function
    function burn(address _from, uint256 _amount) public virtual onlyL2Bridge {
        _burn(_from, _amount);

        emit Burn(_from, _amount);
    }
}
```

只有二层网络 (l2) 跨链桥被允许铸造和销毁资产。

`_mint` 和 `_burn` 实际上是在[欧本齐柏林 ERC-20 合约](/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn)中定义的。
该合约只是没有在外部公开它们，因为铸造和销毁代币的条件与使用 ERC-20 的方式一样多。

## 二层网络 (l2) 跨链桥代码 {#l2-bridge-code}

这是在 Optimism 上运行跨链桥的代码。
[此合约的源代码在此处](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol)。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/* 接口导入 */
import { IL1StandardBridge } from "../../L1/messaging/IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "../../L1/messaging/IL1ERC20Bridge.sol";
import { IL2ERC20Bridge } from "./IL2ERC20Bridge.sol";
```

[IL2ERC20Bridge](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) 接口与我们在上面看到的[一层网络 (l1) 等效接口](#il1erc20bridge)非常相似。
有两个显著的区别：

1. 在一层网络 (l1) 上，您初始化存款并完成提款。
   在这里，您初始化提款并完成存款。
2. 在一层网络 (l1) 上，有必要区分 ETH 和 ERC-20 代币。
   在二层网络 (l2) 上，我们可以对两者使用相同的函数，因为在内部，Optimism 上的 ETH 余额作为地址为 [0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000](https://explorer.optimism.io/address/0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000) 的 ERC-20 代币处理。

```solidity
/* 库导入 */
import { ERC165Checker } from "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";

/* 合约导入 */
import { IL2StandardERC20 } from "../../standards/IL2StandardERC20.sol";

/**
 * @title L2StandardBridge
 * @dev 二层网络 (l2)标准跨链桥是一个与一层网络 (l1)标准跨链桥协同工作的合约，以
 * 实现ETH和ERC-20在一层网络 (l1)和二层网络 (l2)之间的转换。
 * 当听到存入一层网络 (l1)标准跨链桥的存款时，此合约充当新代币的铸造者。
 * 此合约还充当用于提款的代币的销毁者，通知一层网络 (l1)
 * 跨链桥释放一层网络 (l1)资金。
 */
contract L2StandardBridge is IL2ERC20Bridge, CrossDomainEnabled {
    /********************************
     * 外部合约引用 *
     ********************************/

    address public l1TokenBridge;
```

跟踪一层网络 (l1) 跨链桥的地址。
请注意，与一层网络 (l1) 等效项相反，在这里我们_需要_这个变量。
一层网络 (l1) 跨链桥的地址无法提前知道。

```solidity

    /***************
     * 构造函数 *
     ***************/

    /**
     * @param _l2CrossDomainMessenger 此合约使用的跨域信使。
     * @param _l1TokenBridge 部署到主链的一层网络 (l1)跨链桥的地址。
     */
    constructor(address _l2CrossDomainMessenger, address _l1TokenBridge)
        CrossDomainEnabled(_l2CrossDomainMessenger)
    {
        l1TokenBridge = _l1TokenBridge;
    }

    /***************
     * 提款 *
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

这两个函数初始化提款。
请注意，不需要指定一层网络 (l1) 代币地址。
二层网络 (l2) 代币应该告诉我们一层网络 (l1) 等效项的地址。

```solidity

    /**
     * @dev 通过销毁代币并通知
     *      一层网络 (l1)代币网关提款来执行提款逻辑。
     * @param _l2Token 发起提款的二层网络 (l2)代币的地址。
     * @param _from 在二层网络 (l2)上提取提款的账户。
     * @param _to 在一层网络 (l1)上接收提款的账户。
     * @param _amount 要提款的代币数量。
     * @param _l1Gas 未使用，但包含在内以供潜在的向前兼容性考虑。
     * @param _data 要转发到一层网络 (l1)的可选数据。提供此数据
     *        仅仅是为了方便外部合约。除了强制执行最大
     *        长度外，这些合约不对其内容提供任何保证。
     */
    function _initiateWithdrawal(
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) internal {
        // 当发起提款时，我们销毁提款人的资金以防止随后的二层网络 (l2)
        // 使用
        // 斯莱瑟-disable-next-line 重入-事件
        IL2StandardERC20(_l2Token).burn(msg.sender, _amount);
```

请注意，我们_不_依赖于 `_from` 参数，而是依赖于 `msg.sender`，后者更难伪造（据我所知，这是不可能的）。

```solidity

        // 为l1TokenBridge.finalizeERC20Withdrawal(_to, _amount)构造调用数据
        // 斯莱瑟-disable-next-line 重入-事件
        address l1Token = IL2StandardERC20(_l2Token).l1Token();
        bytes memory message;

        if (_l2Token == Lib_PredeployAddresses.OVM_ETH) {
```

在一层网络 (l1) 上，有必要区分 ETH 和 ERC-20。

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

        // 向上发送消息到一层网络 (l1)跨链桥
        // 斯莱瑟-disable-next-line 重入-事件
        sendCrossDomainMessage(l1TokenBridge, _l1Gas, message);

        // 斯莱瑟-disable-next-line 重入-事件
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

确保消息的来源是合法的。
这很重要，因为此函数调用 `_mint`，并且可能被用来提供跨链桥在一层网络 (l1) 上拥有的代币未涵盖的代币。

```solidity
        // 检查目标代币是否合规并且
        // 验证在一层网络 (l1)上存入的代币与此处的二层网络 (l2)存入代币表示相匹配
        if (
            // 斯莱瑟-disable-next-line 重入-事件
            ERC165Checker.supportsInterface(_l2Token, 0x1d1d8b63) &&
            _l1Token == IL2StandardERC20(_l2Token).l1Token()
```

健全性检查：

1. 支持正确的接口
2. 二层网络 (l2) ERC-20 合约的一层网络 (l1) 地址与代币的一层网络 (l1) 来源匹配

```solidity
        ) {
            // 当存款最终确定时，我们在二层网络 (l2)上为账户记入相同数量的
            // 代币。
            // 斯莱瑟-disable-next-line 重入-事件
            IL2StandardERC20(_l2Token).mint(_to, _amount);
            // 斯莱瑟-disable-next-line 重入-事件
            emit DepositFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
```

如果健全性检查通过，则完成存款：

1. 铸造代币
2. 触发适当的事件

```solidity
        } else {
            // 要么被存入的二层网络 (l2)代币对其正确地址存在分歧
            // （即其一层网络 (l1)代币的地址），要么不支持正确的接口。
            // 这只应在存在恶意的二层网络 (l2)代币，或者用户以某种方式
            // 指定了错误的二层网络 (l2)代币地址进行存款时发生。
            // 在任何一种情况下，我们都在此处停止该过程并构造一个提款
            // 消息，以便用户在某些情况下可以取出他们的资金。
            // 没有办法完全防止恶意代币合约，但这确实限制了
            // 用户错误并减轻了某些形式的恶意合约行为。
```

如果用户因使用错误的二层网络 (l2) 代币地址而犯了可检测到的错误，我们希望取消存款并在一层网络 (l1) 上退还代币。
我们从二层网络 (l2) 执行此操作的唯一方法是发送一条必须等待错误挑战期的消息，但这比用户永久丢失代币要好得多。

```solidity
            bytes memory message = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                _l1Token,
                _l2Token,
                _to, // 在此处切换了_to和_from以将存款退回给发送者
                _from,
                _amount,
                _data
            );

            // 向上发送消息到一层网络 (l1)跨链桥
            // 斯莱瑟-disable-next-line 重入-事件
            sendCrossDomainMessage(l1TokenBridge, 0, message);
            // 斯莱瑟-disable-next-line 重入-事件
            emit DepositFailed(_l1Token, _l2Token, _from, _to, _amount, _data);
        }
    }
}
```

## 结论 {#conclusion}

标准跨链桥是资产转账最灵活的机制。
然而，由于它非常通用，它并不总是最容易使用的机制。
特别是对于提款，大多数用户更喜欢使用[第三方跨链桥](https://optimism.io/apps#bridge)，这些跨链桥不需要等待挑战期，也不需要默克尔证明来完成提款。

这些跨链桥通常通过在一层网络 (l1) 上拥有资产来工作，它们会立即提供这些资产并收取少量费用（通常低于标准跨链桥提款的 Gas 成本）。
当跨链桥（或运行它的人）预计一层网络 (l1) 资产短缺时，它会从二层网络 (l2) 转账足够的资产。由于这些是非常大的提款，提款成本被摊销到大量资产上，所占比例要小得多。

希望本文能帮助您更多地了解二层网络 (l2) 的工作原理，以及如何编写清晰安全的 Solidity 代码。

[在此处查看我的更多作品](https://cryptodocguy.pro/)。