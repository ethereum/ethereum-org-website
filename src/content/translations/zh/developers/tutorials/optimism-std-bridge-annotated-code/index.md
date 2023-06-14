---
title: "乐观解决方案标准链桥合约演示"
description: 乐观解决方案标准链桥如何运作？ 为什么它会这样工作？
author: Ori Pomerantz
tags:
  - "solidity"
  - "链桥"
  - "二层网络"
skill: intermediate
published: 2022-03-30
lang: zh
---

[乐观解决方案](https://www.optimism.io/)采用[乐观卷叠](/developers/docs/scaling/optimistic-rollups/)技术。 乐观卷叠能够以比以太坊主网（也称“第一层”）低得多的价格处理交易，因为交易只是由几个节点而非网络上的所有节点处理。 同时所有数据都已写入第一层，因此一切都能够得到证明并重建，并且具有主网的所有完整性和可用性保证。

要在乐观解决方案（或任何其他第二层）上使用第一层资产，需要[桥接](/bridges/#prerequisites)该资产。 实现这一点的一种方法是，用户在第一层上锁定资产（以太币和 [ERC-20 代币](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/)是最常见的资产）并收到相应资产，供在第二层上使用。 最后，拥有这些资产的任何人可能想把它们桥接回第一层。 在桥接过程中，资产会在第二层销毁，然后在第一层上发放给用户。

这就是[乐观解决方案标准链桥](https://community.optimism.io/docs/developers/bridge/standard-bridge)的工作方式。 在本文中，我们将学习链桥的源代码，看看它如何工作，并将它作为精心编写的 Solidity 代码示例加以研究。

## 控制流通 {#control-flows}

链桥有两种主要流通方式：

- 存款（从第一层到第二层）
- 提款（从第二层到第一层）

### 存款流通 {#deposit-flow}

#### 第一层 {#deposit-flow-layer-1}

1. 如果存入 ERC-20，存款人会给链桥一笔费用，这笔费用从所存入的金额中抽取
2. 存款人调用第一层链桥（`depositERC20`、`depositERC20To`、`depositETH` 或 `depositETHTo`）
3. 第一层链桥拥有桥接的资产
   - 以太币：资产由存款人在调用过程中转移
   - ERC-20：资产被链桥转移给链桥自身，使用的是存款人提供的费用
4. 第一层链桥使用跨域信息机制调用第二层链桥上的 `finalizeDeposit`

#### 二层网络 {#deposit-flow-layer-2}

5. 第二层链桥验证调用 `finalizeDeposit` 是否合法：
   - 来自交叉域信息合约
   - 最初来自第一层链桥
6. 第二层链桥检查第二层上的 ERC-20 代币合约是否正确：
   - 第二层合约报告，对应的第一层合约与第一层上提供代币的合约相同
   - 第二层合约报告它支持正确的接口（[使用 ERC-165](https://eips.ethereum.org/EIPS/eip-165)）。
7. 如果第二层合约正确，请调用它以便在适当地址铸造相应数量的代币。 如果不正确，请启动提款过程让用户可以在第一层上认领代币。

### 提款流程 {#withdrawal-flow}

#### 二层网络 {#withdrawl-flow-layer-2}

1. 提款人调用第二层链桥（`withdraw` 或 `withdrawTo`）
2. 第二层链桥销毁属于 `msg.sender` 的适当数量代币
3. 第二层链桥使用跨域信息机制调用第一层链桥上的 `finalizeETHWithdrawal` 或 `finalizeERC20Withdrawal`

#### 第一层 {#withdrawl-flow-layer-1}

4. 第一层链桥验证调用 `finalizeETHWithdrawal` 或 `finalizeERC20Withdrawal` 是否合法：
   - 来自交叉域信息机制
   - 最初来自第二层上的链桥
5. 第一层链桥将适当资产（以太币或 ERC-20）转账到适当地址

## 一层网络代码 {#layer-1-code}

以下代码在第一层即以太坊主网上运行。

### IL1ERC20Bridge {#IL1ERC20Bridge}

[此接口在此处定义](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1ERC20Bridge.sol)。 其中包括桥接 ERC-20 代币所需的函数和定义。

```solidity
/ SPDX-许可标识符： MIT
```

[大多数乐观解决方案代码都是依据 MIT 许可证发布的](https://help.optimism.io/hc/en-us/articles/4411908707995-What-software-license-does-Optimism-use-)。

```solidity
实用性 >0.5.0 <0.9.0;
```

编写代码时，Solidity 最新版本为 0.8.12。 在 0.9.0 版发布之前，我们不知道这段代码是否与它兼容。

```solidity
/**
 * @title IL1ERC20Bridge
 */
接口 IL1ERC20Bridge 然后
    /**************
     * 事件 *
     **********/

    事件 ERC20DepositInitiated(
```

在乐观解决方案链桥术语中，*存款*是指从第一层转账到第二层，*提款*是指从第二层转账到第一层。

```solidity
        地址索引_l1Token,
        地址索引_l2Token,
```

大多数情况下，第一层上的 ERC-20 地址与第二层上对应的 ERC-20 地址不同。 [可以在此处参阅代币地址列表](https://static.optimism.io/optimism.tokenlist.json)。 带有 `chainId` 1 的地址在第一层（主网），带有 `chainId` 10 的地址在第二层（乐观解决方案）上。 另两个 `chainId` 值用于 Kovan 测试网络 (42) 和乐观 Kovan 测试网络 (69)。

```solidity
        地址索引_from
        地址到
        uint256 _amounty,
        bytes _data
;
```

可以为转账添加注解，在这种情况下，注解将被添加到报告它们的事件中。

```solidity
    事件ERC20提款已完成(
        地址索引_l1Token,
        地址索引_l2Token,
        地址索引_from
        地址_to
        uint256 _amount,
        bytes _data
);
```

同一链桥合约处理双向转账。 就第一层链桥而言，这意味着存款的初始化和提款的终局化。

```solidity

    ****************************
     * 公共函数 *
     **********************/

    /**
     * @dev 获得相应的L2 桥合同的地址。
     * 对应的L2桥合同的@return 地址。
     */
    函数 l2TokenBridge() 外部返回 (地址)；
```

并不是真需要此函数，因为在第二层上它是一个预部署的合约，所以它总是位于地址 `0x4200000000000000000000000000000000000010` 处。 使用此函数是为了与第二层链桥对称，因为知道第一层桥的地址*并非*不重要。

```solidity
    /**
     * @dev 将ERC20的金额存入L2上来电者的余额。
     * @param _l1Token Address of the L1 ERC20 we being sording
     * @param _l2Token Address of the L1 respective L2 ERC20
     * @param _amount Amount of the ERC20 to entorize
     * @param _l2Gas Gas limit required to complete on L2
     * @param _data 可选数据转发到 L2。 This data is provided
     *        solely as a convenience for external contracts. Aside from enforcing a maximum
     *        length, these contracts provide no guarantees about its content.
     */
    function depositERC20(
        address _l1Token,
        address _l2Token,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

`_l2Gas` 参数是指允许交易花费的第二层燃料的数量。 [达到某个（上限）额度前，交易是免费的](https://community.optimism.io/docs/developers/bridge/messaging/#for-l1-%E2%87%92-l2-transactions-2)，所以除非 ERC-20 合约在铸币时行为确实怪异，否则这应该不是问题。 此函数处理常见场景，即用户将资产桥接到不同区块链上的相同地址。

```solidity
    /**
     * @dev deposit an amount of ERC20 to a recipient's balance on L2.
     * @param _l1Token Address of the L1 ERC20 we are depositing
     * @param _l2Token Address of the L1 respective L2 ERC20
     * @param _to L2 address to credit the withdrawal to.
     * @param _amount Amount of the ERC20 to deposit.
     * @param _l2Gas Gas limit required to complete the deposit on L2.
     * @param _data 可选数据转发到 L2。 This data is provided
     *        solely as a convenience for external contracts. Aside from enforcing a maximum
     *        length, these contracts provide no guarantees about its content.
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

此函数基本上与 `depositERC20` 相同，但它允许您将 ERC-20 发送到不同的地址。

```solidity
    /*************************
     * Cross-chain Functions *
     *************************/

    /**
     * @dev Complete a withdrawal from L2 to L1, and credit funds to the recipient's balance of the
     * L1 ERC20 token.
     * This call will fail if the initialized withdrawal from L2 has not been finalized.
     *
     * @param _l1Token Address of L1 token to finalizeWithdrawal for.
     * @param _l2Token Address of L2 token where withdrawal was initiated.
     * @param _from L2 address initiating the transfer.
     * @param _to L1 address to credit the withdrawal to.
     * @param _amount Amount of the ERC20 to deposit.
     * @param _data Data provided by the sender on L2. This data is provided
     *   solely as a convenience for external contracts. Aside from enforcing a maximum
     *   length, these contracts provide no guarantees about its content.
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

乐观解决方案中的提款（以及从第二层到第一层的其他信息）是一个包含两个步骤的过程：

1. 在第二层上的启动交易。
2. 在第一层上完成或声明交易。 在第二层交易的[缺陷质询期](https://community.optimism.io/docs/how-optimism-works/#fault-proofs)结束后此交易才可以进行。

### IL1StandardBridge {#il1standardbridge}

[此接口在此处定义](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1StandardBridge.sol)。 该文件包含以太币的事件和函数定义。 这些定义与上述 `IL1ERC20Bridge` 中为 ERC-20 定义的定义非常相似。

链桥接口分为两个文件，因为某些 ERC-20 代币需要自定义处理，标准链桥接无法处理它们。 这样，处理此类代币的自定义链桥可以实现 `IL1ERC20Bridge`，而不必再桥接以太币。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

import "./IL1ERC20Bridge.sol";

/**
 * @title IL1StandardBridge
 */
interface IL1StandardBridge is IL1ERC20Bridge {
    /**********
     * Events *
     **********/
    event ETHDepositInitiated(
        address indexed _from,
        address indexed _to,
        uint256 _amount,
        bytes _data
    );
```

此事件与 ERC-20 版本 (`ERC20DepositInitiated`) 几乎相同，只是没有第一层和第二层代币的地址。 其他事件和函数也是如此。

```solidity
    event ETHWithdrawalFinalized(
        .
        .
        .
    );

    /********************
     * Public Functions *
     ********************/

    /**
     * @dev Deposit an amount of the ETH to the caller's balance on L2.
            .
            .
            .
     */
    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable;

    /**
     * @dev Deposit an amount of ETH to a recipient's balance on L2.
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
     * Cross-chain Functions *
     *************************/

    /**
     * @dev Complete a withdrawal from L2 to L1, and credit funds to the recipient's balance of the
     * L1 ETH token. Since only the xDomainMessenger can call this function, it will never be called
     * before the withdrawal is finalized.
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

[此合约](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/CrossDomainEnabled.sol)由两个链桥（[一层网络](#the-l1-bridge-contract)和[二层网络](#the-l2-bridge-contract)）继承，以便向其他层发送信息。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

/* Interface Imports */
import { ICrossDomainMessenger } from "./ICrossDomainMessenger.sol";
```

[这个接口](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/ICrossDomainMessenger.sol)告诉合约如何发送使用跨域信使向另一层发送信息。 跨域信使完全是另一种系统，值得单独写一篇文章来介绍，我希望将来能写出来。

```solidity
/**
 * @title CrossDomainEnabled
 * @dev Helper contract for contracts performing cross-domain communications
 *
 * Compiler used: defined by inheriting contract
 */
contract CrossDomainEnabled {
    /*************
     * Variables *
     *************/

    // Messenger contract used to send and receive messages from the other domain.
    address public messenger;

    /***************
     * Constructor *
     ***************/

    /**
     * @param _messenger Address of the CrossDomainMessenger on the current layer.
     */
    constructor(address _messenger) {
        messenger = _messenger;
    }
```

合约需要知道的一个参数就是跨域信使在这一层的地址。 此参数在构造函数中设置一次，并且永远不会更改。

```solidity

    /**********************
     * Function Modifiers *
     **********************/

    /**
     * Enforces that the modified function is only callable by a specific cross-domain account.
     * @param _sourceDomainAccount The only account on the originating domain which is
     *  authenticated to call this function.
     */
    modifier onlyFromCrossDomainAccount(address _sourceDomainAccount) {
```

跨域消息传递可以由运行在区块链（以太坊主网或乐观解决方案）上的任何合约使用。 但是每一层都需要链桥。如果信息来自于另一边的链桥，将*只*信任特定信息。

```solidity
        require(
            msg.sender == address(getCrossDomainMessenger()),
            "OVM_XCHAIN: messenger contract unauthenticated"
        );
```

只能信任来自适当跨域信使（`messenger`，如下所示）的信息。

```solidity

        require(
            getCrossDomainMessenger().xDomainMessageSender() == _sourceDomainAccount,
            "OVM_XCHAIN: wrong sender of cross-domain message"
        );
```

跨域信使要提供另一层发送信息的地址，就需要用到 [`.xDomainMessageSender()` 函数](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1CrossDomainMessenger.sol#L122-L128)。 只要在信息发起的交易中调用它，它就可以提供此信息。

我们需要确保我们收到的信息来自另一个链桥。

```solidity

        _;
    }

    /**********************
     * Internal Functions *
     **********************/

    /**
     * Gets the messenger, usually from storage. This function is exposed in case a child contract
     * needs to override.
     * @return The address of the cross-domain messenger contract which should be used.
     */
    function getCrossDomainMessenger() internal virtual returns (ICrossDomainMessenger) {
        return ICrossDomainMessenger(messenger);
    }
```

该函数返回跨域信使。 我们使用函数而不是变量 `messenger`，以允许从该函数继承的合约使用一种算法来指定要使用的跨域信使。

```solidity

    /**
     * Sends a message to an account on another domain
     * @param _crossDomainTarget The intended recipient on the destination domain
     * @param _message The data to send to the target (usually calldata to a function with
     *  `onlyFromCrossDomainAccount()`)
     * @param _gasLimit The gasLimit for the receipt of the message on the target domain.
     */
    function sendCrossDomainMessage(
        address _crossDomainTarget,
        uint32 _gasLimit,
        bytes memory _message
```

最后是向另一层发送信息的函数。

```solidity
    ) internal {
        // slither-disable-next-line reentrancy-events, reentrancy-benign
```

[Slither](https://github.com/crytic/slither) 是一个静态分析器，乐观解决方案在每个合约上运行它以查找漏洞和其他潜在问题。 在本例中，下面一行会触发两个漏洞：

1. [重入事件](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-3)
2. [良性重入](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-2)

```solidity
        getCrossDomainMessenger().sendMessage(_crossDomainTarget, _message, _gasLimit);
    }
}
```

在这种情况下，我们不担心重入漏洞，我们知道 `getCrossDomainMessenger()` 返回一个可信地址，即使 Slither 无法知道这一点。

### 第一层链桥合约 {#the-l1-bridge-contract}

[此合约的源代码在此处](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1StandardBridge.sol)。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
```

接口可以来自其他合约，因此它们必须支持各种 Solidity 版本。 但是链桥本身属于我们的合约，我们可以严格限制它使用的 Solidity 版本。

```solidity
/* Interface Imports */
import { IL1StandardBridge } from "./IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "./IL1ERC20Bridge.sol";
```

[IL1ERC20Bridge](#IL1ERC20Bridge) 和 [IL1StandardBridge](#IL1StandardBridge) 已在上面进行了说明。

```solidity
import { IL2ERC20Bridge } from "../../L2/messaging/IL2ERC20Bridge.sol";
```

[此接口](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol)让我们创建信息来控制第二层上的标准链桥。

```solidity
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[此接口](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol)让我们控制 ERC-20 合约。 [您可以在此处阅读更多信息](/developers/tutorials/erc20-annotated-code/#the-interface)。

```solidity
/* Library Imports */
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
```

[如上所述](#crossdomainenabled)，此合约用于层间信息传递。

```solidity
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";
```

[`Lib_PredeployAddresses`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/constants/Lib_PredeployAddresses.sol) 为第二层合约提供地址，这些合约始终使用相同的地址。 其中包括第二层上的标准链桥。

```solidity
import { Address } from "@openzeppelin/contracts/utils/Address.sol";
```

[OpenZeppelin 的地址工具](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Address.sol)。 它用于区分合约地址和属于外部账户 (EOA) 的地址。

请注意，这不是一个理想的解决方案，因为无法区分直接调用和合约构造函数的调用，但至少这让我们能够识别和防止一些常见的用户错误。

```solidity
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
```

[ERC-20 标准](https://eips.ethereum.org/EIPS/eip-20)支持两种合约报告失败的方式：

1. 回滚
2. 返回 `false`

处理这两种情况会使我们的代码更加复杂，因此我们使用 [OpenZeppelin 的 `SafeERC20`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol)，确保[所有失败都导致回滚](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol#L96)。

```solidity
/**
 * @title L1StandardBridge
 * @dev The L1 ETH and ERC20 Bridge is a contract which stores deposited L1 funds and standard
 * tokens that are in use on L2. It synchronizes a corresponding L2 Bridge, informing it of deposits
 * and listening to it for newly finalized withdrawals.
 *
 */
contract L1StandardBridge is IL1StandardBridge, CrossDomainEnabled {
    using SafeERC20 for IERC20;
```

此行表示我们如何指定在每次使用 `IERC20` 接口时使用 `SafeERC20` 包装器。

```solidity

    /********************************
     * External Contract References *
     ********************************/

    address public l2TokenBridge;
```

[L2StandardBridge](#the-l2-bridge-contract) 的地址。

```solidity

    // Maps L1 token to L2 token to balance of the L1 token deposited
    mapping(address => mapping(address => uint256)) public deposits;
```

像这样的双重[映射](https://www.tutorialspoint.com/solidity/solidity_mappings.htm)是定义[二维稀疏数组](https://en.wikipedia.org/wiki/Sparse_matrix)的方式。 此数据结构中的值被标识为 `deposit[L1 token addr][L2 token addr]`。 默认值为零。 只有设置为不同值的单元才会写入存储。

```solidity

    /***************
     * Constructor *
     ***************/

    // This contract lives behind a proxy, so the constructor parameters will go unused.
    constructor() CrossDomainEnabled(address(0)) {}
```

希望能够升级此合约而无需复制存储中的所有变量。 为此，我们使用 [`Proxy`](https://docs.openzeppelin.com/contracts/3.x/api/proxy)，此合约使用 [`delegatecall`](https://solidity-by-example.org/delegatecall/) 将呼叫转移到地址由代理合约存储的单独联系人（当您升级时，您告诉代理更改该地址）。 当您使用 `delegatecall` 时，存储仍然是*调用*合约的存储，因此合约所有状态变量的值不受影响。

这种模式的结果是不使用 `delegatecall` *调用*的合约的存储，因此传递给它的构造函数值无关紧要。 这就是我们可以为 `CrossDomainEnabled` 构造函数提供一个无意义值的原因。 这也是下面的初始化与构造函数分开的原因。

```solidity
    /******************
     * Initialization *
     ******************/

    /**
     * @param _l1messenger L1 Messenger address being used for cross-chain communications.
     * @param _l2TokenBridge L2 standard bridge address.
     */
    // slither-disable-next-line external-function
```

此 [Slither 测试](https://github.com/crytic/slither/wiki/Detector-Documentation#public-function-that-could-be-declared-external)可识别不是从合约代码调用且因此可以声明为 `external` 而不是 `public` 的函数。 `external` 函数的燃料成本可以更低，因为可以在 calldata 中为它们提供参数。 声明为 `public` 的函数必须可以在合约内部访问。 合约不能修改自己的 calldata，所以参数必须位于内存中。 当外部调用这类函数时，需要将 calldata 复制到内存中，这就会消耗燃料。 在本例中，函数只被调用一次，因此效率低下对我们来说无关紧要。

```solidity
    function initialize(address _l1messenger, address _l2TokenBridge) public {
        require(messenger == address(0), "Contract has already been initialized.");
```

`initialize` 函数只应调用一次。 如果第一层跨域信使或第二层代币链桥的地址发生变化，我们将创建新代理和新链桥来调用它。 这种情况不太可能发生，除非升级整个系统，这非常罕见。

请注意，此函数没有任何机制限制*谁*可以调用它。 这意味着理论上，攻击者可以等到我们部署代理和第一版链桥后，抢在合法用户之前在[前台运行](https://solidity-by-example.org/hacks/front-running/)以使用 `initialize` 函数。 但是有两种方法可以防止这种情况：

1. 如果合约不是由外部账户直接部署，而是[在有另一个合约创建它们的交易中](https://medium.com/upstate-interactive/creating-a-contract-with-a-smart-contract-bdb67c5c8595)部署，那么整个过程可以成为最小操作单元，并且能够在执行任何其他交易之前完成。
2. 如果对 `initialize` 的合法调用失败，总是可以忽略新创建的代理和链桥并创建新的。

```solidity
        messenger = _l1messenger;
        l2TokenBridge = _l2TokenBridge;
    }
```

这些是链桥需要知道的两个参数。

```solidity

    /**************
     * Depositing *
     **************/

    /** @dev Modifier requiring sender to be EOA.  This check could be bypassed by a malicious
     *  contract via initcode, but it takes care of the user error we want to avoid.
     */
    modifier onlyEOA() {
        // Used to stop deposits from contracts (avoid accidentally lost tokens)
        require(!Address.isContract(msg.sender), "Account not EOA");
        _;
    }
```

这就是我们需要 OpenZeppelin 的 `Address` 工具的原因。

```solidity
    /**
     * @dev This function can be called with no data
     * to deposit an amount of ETH to the caller's balance on L2.
     * Since the receive function doesn't take data, a conservative
     * default amount is forwarded to L2.
     */
    receive() external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, 200_000, bytes(""));
    }
```

此函数存在的目的是测试。 请注意，它没有出现在接口定义中 — 它不适合正常使用。

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

这两个函数是 `_initiateETHDeposit` 的包装器，\_initiateETHDeposit 处理实际的以太币存款。

```solidity
    /**
     * @dev Performs the logic for deposits by storing the ETH and informing the L2 ETH Gateway of
     * the deposit.
     * @param _from Account to pull the deposit from on L1.
     * @param _to Account to give the deposit to on L2.
     * @param _l2Gas Gas limit required to complete the deposit on L2.
     * @param _data 可选数据转发到 L2。 This data is provided
     *        solely as a convenience for external contracts. Aside from enforcing a maximum
     *        length, these contracts provide no guarantees about its content.
     */
    function _initiateETHDeposit(
        address _from,
        address _to,
        uint32 _l2Gas,
        bytes memory _data
    ) internal {
        // Construct calldata for finalizeDeposit call
        bytes memory message = abi.encodeWithSelector(
```

跨域信息的工作方式是将信息作为其 calldata 来调用目的地合约。 Solidity 合约总是解释它们的 calldata 符合 [应用程序二进制接口规范](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html)。 Solidity 函数 [`abi. encodeWithSelector`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#abi-encoding-and-decoding-functions) 可创建该 calldata。

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

此处的信息用来使用下面的参数调用 [`finalizeDeposit` 函数](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol#L141-L148)：

| 参数      | 值                             | 意义                                                                                                                |
| --------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| \_l1Token | address(0)                     | 在第一层上代表以太币（不是 ERC-20 代币）的特殊值                                                                    |
| \_l2Token | Lib_PredeployAddresses.OVM_ETH | 乐观解决方案上管理以太币的第二层合约 `0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000`（此合约仅供乐观解决方案内部使用） |
| \_from    | \_from                         | 第一层上发送以太币的地址                                                                                            |
| \_to      | \_to                           | 第二层上接收以太币的地址                                                                                            |
| amount    | 值                             | 已发送的 wei 数量（已经发送到链桥的 wei）                                                                           |
| \_data    | \_data                         | 附加到存款的额外日期                                                                                                |

```solidity
        // Send calldata into L2
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);
```

通过跨域信使发送信息。

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
     * @dev Performs the logic for deposits by informing the L2 Deposited Token
     * contract of the deposit and calling a handler to lock the L1 funds. (e.g. transferFrom)
     *
     * @param _l1Token Address of the L1 ERC20 we are depositing
     * @param _l2Token Address of the L1 respective L2 ERC20
     * @param _from Account to pull the deposit from on L1
     * @param _to Account to give the deposit to on L2
     * @param _amount Amount of the ERC20 to deposit.
     * @param _l2Gas Gas limit required to complete the deposit on L2.
     * @param _data 可选数据转发到 L2。 This data is provided
     *        solely as a convenience for external contracts. Aside from enforcing a maximum
     *        length, these contracts provide no guarantees about its content.
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

此函数类似于上面的 `_initiateETHDeposit`，但有一些重要区别。 第一个区别是此函数接收代币地址和转账金额作为参数。 对于以太币，对链桥的调用已经包括将资产转账到链桥帐户 (`msg.value`)。

```solidity
        // When a deposit is initiated on L1, the L1 Bridge transfers the funds to itself for future
        // withdrawals. safeTransferFrom also checks if the contract has code, so this will fail if
        // _from is an EOA or address(0).
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        IERC20(_l1Token).safeTransferFrom(_from, address(this), _amount);
```

ERC-20 代币的转账过程不同以太币：

1. 用户 (`_from`) 提供费用让链桥转移适当的代币。
2. 用户使用代币合约的地址、金额等调用链桥。
3. 在存款过程中，链桥转移代币（给自己）。

第一步可能和最后两步发生在不同的交易中。 但是，前台运行不是问题，因为调用 `_initiateERC20Deposit` 的两个函数（`depositERC20` 和 `depositERC20To`）只将 `msg.sender` 作为 `_from` 参数调用该函数。

```solidity
        // Construct calldata for _l2Token.finalizeDeposit(_to, _amount)
        bytes memory message = abi.encodeWithSelector(
            IL2ERC20Bridge.finalizeDeposit.selector,
            _l1Token,
            _l2Token,
            _from,
            _to,
            _amount,
            _data
        );

        // Send calldata into L2
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);

        // slither-disable-next-line reentrancy-benign
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] + _amount;
```

将存入的代币数量添加到 `deposits` 数据结构中。 第二层上可能有多个地址对应于同一个第一层 ERC-20 代币，因此仅使用链桥的第一层 ERC-20 代币余额来跟踪存款是不够的。

```solidity

        // slither-disable-next-line reentrancy-events
        emit ERC20DepositInitiated(_l1Token, _l2Token, _from, _to, _amount, _data);
    }

    /*************************
     * Cross-chain Functions *
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

第二层链桥向第二层跨域信使发送信息，使得第一层跨域信使调用此函数（当然是在[完成信息的交易](https://community.optimism.io/docs/developers/bridge/messaging/#fees-for-l2-%E2%87%92-l1-transactions)在第一层上提交以后）。

```solidity
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

确保这是一个*合法*信息，来自跨域信使并源自第二层代币链桥。 此函数用于从链桥中提取以太币，因此我们必须确保它仅由授权调用者调用。

```solidity
        // slither-disable-next-line reentrancy-events
        (bool success, ) = _to.call{ value: _amount }(new bytes(0));
```

转移以太币的方式是用 `msg.value` 中 wei 的数量调用接收者。

```solidity
        require(success, "TransferHelper::safeTransferETH: ETH transfer failed");

        // slither-disable-next-line reentrancy-events
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

此函数类似于上面的 `finalizeETHWithdrawal`，但对 ERC-20 代币进行了必要的更改。

```solidity
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] - _amount;
```

更新 `deposits` 数据结构。

```solidity

        // When a withdrawal is finalized on L1, the L1 Bridge transfers the funds to the withdrawer
        // slither-disable-next-line reentrancy-events
        IERC20(_l1Token).safeTransfer(_to, _amount);

        // slither-disable-next-line reentrancy-events
        emit ERC20WithdrawalFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
    }


    /*****************************
     * Temporary - Migrating ETH *
     *****************************/

    /**
     * @dev Adds ETH balance to the account. This is meant to allow for ETH
     * to be migrated from an old gateway to a new gateway.
     * NOTE: This is left for one upgrade only so we are able to receive the migrated ETH from the
     * old contract
     */
    function donateETH() external payable {}
}
```

对于早期实现的链桥， 当我们从该实现转移到当前实现时，我们必须转移所有资产。 ERC-20 代币可以转移。 但是，要将以太币转账到合约，您需要得到该合约的批准，`donateETH` 就起到这一作用。

## 第二层上的 ERC-20 代币 {#erc-20-tokens-on-l2}

为了使 ERC-20 代币适合标准链桥，它需要允许标准链桥并且*只*允许标准链桥铸造代币。 这是必要的，因为链桥需要确保在乐观解决方案上流通的代币数量和锁定在第一层链桥合约内的代币数量相同。 如果第二层上的代币太多，一些用户将无法将他们的资产桥接到第一层。 我们实际上将重新建立[部分准备金银行制度](https://www.investopedia.com/terms/f/fractionalreservebanking.asp)，而不是一个受信任的链桥。 如果第一层上的代币太多，其中一些代币将永远锁定在链桥合约中，因为不销毁第二层代币就无法释放它们。

### IL2StandardERC20 {#il2standarderc20}

第二层上使用标准链桥的每个 ERC-20 代币都需要提供[此接口](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/IL2StandardERC20.sol)，它具有标准链桥需要的函数和事件。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[标准 ERC-20 接口](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol)不包含 `mint` 和 `burn` 函数。 [ERC-20 标准](https://eips.ethereum.org/EIPS/eip-20)不需要这些方法，它未指定创建和销毁代币的机制。

```solidity
import { IERC165 } from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
```

[ERC-165 接口](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/introspection/IERC165.sol)用于指定一个合约提供哪些函数。 [您可以在此处参阅该标准](https://eips.ethereum.org/EIPS/eip-165)。

```solidity
interface IL2StandardERC20 is IERC20, IERC165 {
    function l1Token() external returns (address);
```

此函数提供桥接到此合约的第一层代币的地址。 请注意，我们在相反方向没有类似函数。 我们需要能够桥接任何第一层代币，无论第二层支持是否在实施计划。

```solidity

    function mint(address _to, uint256 _amount) external;

    function burn(address _from, uint256 _amount) external;

    event Mint(address indexed _account, uint256 _amount);
    event Burn(address indexed _account, uint256 _amount);
}
```

铸造（创建）和燃烧（销毁）代币的函数和事件。 链桥应该是唯一可以运行这些函数的实体，以确保代币数量正确（等于锁定在第一层上的代币数量）。

### L2StandardERC20 {#L2StandardERC20}

[这是我们对 `IL2StandardERC20` 接口的实现](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/L2StandardERC20.sol)。 除非您需要某种自定义逻辑，否则您应该使用它。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

[OpenZeppelin ERC-20 合约](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)。 乐观解决方案不相信重新编写合约，尤其是合约经过严格审计并且需要足够的信任来持有资产时。

```solidity
import "./IL2StandardERC20.sol";

contract L2StandardERC20 is IL2StandardERC20, ERC20 {
    address public l1Token;
    address public l2Bridge;
```

上面是两个额外的配置参数，我们需要它们但 ERC-20 通常不需要。

```solidity

    /**
     * @param _l2Bridge Address of the L2 standard bridge.
     * @param _l1Token Address of the corresponding L1 token.
     * @param _name ERC20 name.
     * @param _symbol ERC20 symbol.
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
        require(msg.sender == l2Bridge, "Only L2 Bridge can mint and burn");
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

这是 [ERC-165](https://eips.ethereum.org/EIPS/eip-165) 的工作方式。 每个接口都是许多受支持的函数，并被标识为这些函数的[应用程序二进制接口函数选择器](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html#function-selector)的[异或](https://en.wikipedia.org/wiki/Exclusive_or)。

第二层链桥使用 ERC-165 作为完整性检查机制，确保它发送资产的 ERC-20 合约是 `IL2StandardERC20`。

**注：**没有任何东西可以阻止流氓合约为 `supportsInterface` 提供虚假应答，所以这是一种完整性检查机制*而不是*安全机制。

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

只允许第二层链桥铸造和销毁资产。

`_mint` 和 `_burn` 实际上是在 [OpenZeppelin ERC-20 合约](https://ethereum.org/en/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn)中定义的。 该合约只是没有将它们暴露在外部，因为铸造和销毁代币的条件与 ERC-20 使用方式的数量一样多变。

## 第二层链桥代码 {#l2-bridge-code}

这是在乐观解决方案上运行链桥的代码。 [此合约源自此处](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol)。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/* Interface Imports */
import { IL1StandardBridge } from "../../L1/messaging/IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "../../L1/messaging/IL1ERC20Bridge.sol";
import { IL2ERC20Bridge } from "./IL2ERC20Bridge.sol";
```

[IL2ERC20Bridge](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) 接口与我们上面看到的[第一层等效](#IL1ERC20Bridge)接口非常相似。 有两个明显区别：

1. 在第一层上您发起存款并完成提款。 在此处您发起提款并完成存款。
2. 在第一层上，有必要区分以太币和 ERC-20 代币。 在第二层上，我们可以对两者使用相同的函数，因为在乐观解决方案上的以太币余额会作为地址为 [0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000](https://optimistic.etherscan.io/address/0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000) 的 ERC-20 代币在内部处理。

```solidity
/* Library Imports */
import { ERC165Checker } from "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";

/* Contract Imports */
import { IL2StandardERC20 } from "../../standards/IL2StandardERC20.sol";

/**
 * @title L2StandardBridge
 * @dev The L2 Standard bridge is a contract which works together with the L1 Standard bridge to
 * enable ETH and ERC20 transitions between L1 and L2.
 * This contract acts as a minter for new tokens when it hears about deposits into the L1 Standard
 * bridge.
 * This contract also acts as a burner of the tokens intended for withdrawal, informing the L1
 * bridge to release L1 funds.
 */
contract L2StandardBridge is IL2ERC20Bridge, CrossDomainEnabled {
    /********************************
     * External Contract References *
     ********************************/

    address public l1TokenBridge;
```

跟踪第一层链桥的地址。 请注意，与第一层对应项相比，此处我们*需要*该变量。 第一层链桥的地址事先不为人知。

```solidity

    /***************
     * Constructor *
     ***************/

    /**
     * @param _l2CrossDomainMessenger Cross-domain messenger used by this contract.
     * @param _l1TokenBridge Address of the L1 bridge deployed to the main chain.
     */
    constructor(address _l2CrossDomainMessenger, address _l1TokenBridge)
        CrossDomainEnabled(_l2CrossDomainMessenger)
    {
        l1TokenBridge = _l1TokenBridge;
    }

    /***************
     * Withdrawing *
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

这两个函数发起提款。 请注意，无需指定第一层代币地址。 第二层代币需要告诉我们第一层代币的地址。

```solidity

    /**
     * @dev Performs the logic for withdrawals by burning the token and informing
     *      the L1 token Gateway of the withdrawal.
     * @param _l2Token Address of L2 token where withdrawal is initiated.
     * @param _from Account to pull the withdrawal from on L2.
     * @param _to Account to give the withdrawal to on L1.
     * @param _amount Amount of the token to withdraw.
     * @param _l1Gas Unused, but included for potential forward compatibility considerations.
     * @param _data Optional data to forward to L1. This data is provided
     *        solely as a convenience for external contracts. Aside from enforcing a maximum
     *        length, these contracts provide no guarantees about its content.
     */
    function _initiateWithdrawal(
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) internal {
        // When a withdrawal is initiated, we burn the withdrawer's funds to prevent subsequent L2
        // usage
        // slither-disable-next-line reentrancy-events
        IL2StandardERC20(_l2Token).burn(msg.sender, _amount);
```

请注意，我们*不*依赖 `_from` 参数，而是依赖更难伪造的 `msg.sender`（据我所知它无法伪造）。

```solidity

        // Construct calldata for l1TokenBridge.finalizeERC20Withdrawal(_to, _amount)
        // slither-disable-next-line reentrancy-events
        address l1Token = IL2StandardERC20(_l2Token).l1Token();
        bytes memory message;

        if (_l2Token == Lib_PredeployAddresses.OVM_ETH) {
```

在第一层上，有必要区分以太币和 ERC-20。

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

        // Send message up to L1 bridge
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l1TokenBridge, _l1Gas, message);

        // slither-disable-next-line reentrancy-events
        emit WithdrawalInitiated(l1Token, _l2Token, msg.sender, _to, _amount, _data);
    }

    /************************************
     * Cross-chain Function: Depositing *
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

确保信息来源是合法的。 这很重要，因为此函数调用 `_mint` 并且可用于提供链桥在第一层所拥有代币范围外的代币。

```solidity
        // Check the target token is compliant and
        // verify the deposited token on L1 matches the L2 deposited token representation here
        if (
            // slither-disable-next-line reentrancy-events
            ERC165Checker.supportsInterface(_l2Token, 0x1d1d8b63) &&
            _l1Token == IL2StandardERC20(_l2Token).l1Token()
```

完整性检查：

1. 支持正确的接口
2. 第二层 ERC-20 合约的第一层地址与第一层的代币来源相符

```solidity
        ) {
            // When a deposit is finalized, we credit the account on L2 with the same amount of
            // tokens.
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
            // Either the L2 token which is being deposited-into disagrees about the correct address
            // of its L1 token, or does not support the correct interface.
            // This should only happen if there is a  malicious L2 token, or if a user somehow
            // specified the wrong L2 token address to deposit into.
            // In either case, we stop the process here and construct a withdrawal
            // message so that users can get their funds out in some cases.
            // There is no way to prevent malicious token contracts altogether, but this does limit
            // user error and mitigate some forms of malicious contract behavior.
```

如果用户由于使用错误的第二层代币地址犯了可检测到的错误，我们希望取消存款并在第一层上返还代币。 在第二层我们可以做到这一点的唯一方法是等到缺陷质询期到来后发送一条信息，但对用户来说这要比永久失去代币好得多。

```solidity
            bytes memory message = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                _l1Token,
                _l2Token,
                _to, // switched the _to and _from here to bounce back the deposit to the sender
                _from,
                _amount,
                _data
            );

            // Send message up to L1 bridge
            // slither-disable-next-line reentrancy-events
            sendCrossDomainMessage(l1TokenBridge, 0, message);
            // slither-disable-next-line reentrancy-events
            emit DepositFailed(_l1Token, _l2Token, _from, _to, _amount, _data);
        }
    }
}
```

## 总结 {#conclusion}

标准链桥是最灵活的资产转移机制。 然而，由于它非常笼统，因而并非总是可供使用的最简便机制。 特别是对于提款，大多数用户喜欢使用[第三方链桥](https://www.optimism.io/apps/bridges)，这些链桥不用等待质询期并且不需要进行默克尔证明就能完成提款。

通常，这些链桥的工作方式是在第一层上拥有资产，而且它们会立即为这些资产提供一小笔费用（通常少于标准链桥提款的燃料费用）。 当链桥（或运行链桥的人）预计第一层资产短缺时，它将从第二层转移足够的资产。 由于这些提款的数额非常庞大，大笔的提款费用经分期摊销后，所占百分比要小得多。

希望本文能帮助您更多地了解二层网络如何工作以及如何编写清晰安全的 Solidity 代码。
