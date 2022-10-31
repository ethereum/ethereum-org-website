---
title: "ERC-20 合约概览"
description: OpenZepelin 的 ERC-20 合约内容和解读
author: Ori Pomerantz
lang: zh
tags:
  - "solidity"
  - "erc-20"
skill: beginner
published: 2021-03-09
---

## 简介 {#introduction}

以太坊最常见的用途之一是由一个团队来打造一种可以交易的代币，在某种意义上是他们自己的货币。 这些代币通常遵循一个标准， [ERC-20](/developers/docs/standards/tokens/erc-20/)。 此标准使得人们能够以此来开发可以用于所有 ERC-20 代币的工具，如流动资金池和钱包。 在这篇文章中，我们将带领大家分析 [OpenZepelin Solidity ERC20 实现](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)以及 [ ERC20 接口定义](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol)。

这里使用的是附加说明的源代码。 如果想要实现 ERC-20， [请阅读此教程](https://docs.openzeppelin.com/contracts/2.x/erc20-supply)。

## 接口 {#the-interface}

像 ERC-20 这样的标准，其目的是允许符合标准的多种代币，都可以在应用程序之间进行互操作，例如钱包和分布式交易所。 为实现这个目的，我们要创建一个 [接口](https://www.geeksforgeeks.org/solidity-basics-of-interface/)。 任何需要使用代币合约的代码 可以在接口中使用相同的定义，并且与使用它的所有代币合约兼容。无论是像 MetaMask 这样的钱包、 诸如 etherscan.io 之类的去中心化应用程序，或一种不同的合约，例如流动资金池。

![ERC-20 接口说明](erc20_interface.png)

如果您是一位经验丰富的程序员，您可能记得在 [Java](https://www.w3schools.com/java/java_interface.asp) 中，甚至在 [C 头文件](https://gcc.gnu.org/onlinedocs/cpp/Header-Files.html) 中看到过类似的构造。

这是来自 OpenZepelin 的 [ERC-20 接口](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) 的定义。 这是将[人类可读标准](https://eips.ethereum.org/EIPS/eip-20)转换为 Solidity 代码。 当然， 接口本身并不定义*如何*做事。 这一点在下文合约的源代码中作了解释。

&nbsp;

```solidity
/ SPDX-许可标识符： MIT
```

Solidity 文件中一般需要标识软件许可证。 [您可以在这里看到许可证列表](https://spdx.org/licenses/)。 如果需要不同的 许可证，只需在注释中加以说明。

&nbsp;

```solidity
pragma solidity >=0.6.0 <0.8.0;
```

Solidity 语言仍在迅速地发展，新版本可能不适配旧的代码 ([请点击此处查看](https://docs.soliditylang.org/en/v0.7.0/070-breaking-changes.html))。 因此，最好不仅指定一个最低的 语言版本，也指定一个最高的版本，即测试过代码的最新版本。

&nbsp;

```solidity
/**
 * @dev Interface of the ERC20 standard as defined in EIP.
 */
```

注释中的 `@dev` 是 [NatSpec 格式](https://docs.soliditylang.org/en/develop/natspec-format.html)的一部分，用于 从源代码生成文档。

&nbsp;

```solidity
interface IERC20 {
```

根据惯例，接口名称以 `I` 开头。

&nbsp;

```solidity
    /**
     * @dev Returns the amount of tokens in existence.
     */
    function totalSupply() external view returns (uint256);
```

此函数标记为 `external`，表示[它只能从合约之外调用](https://docs.soliditylang.org/en/v0.7.0/cheatsheet.html#index-2)。 它返回的是合约中代币的总供应量 这个值按以太坊中最常见的类型返回，即无符号的 256 位（256 位是 以太坊虚拟机的原生字长宽度）。 此函数也是视图 `view` 类型，这意味着它不会改变合约状态，这样它可以在单个节点上执行，而不需要在区块链的每个节点上执行。 这类函数不会生成交易，也不会消耗[燃料](/developers/docs/gas/)。

**注意：**理论上讲，合约创建者可能会通过返回比实际数量少的总供应量来做骗局，让每个代币 比实际看起来更有价值。 然而，这种担忧忽视了区块链的真正内涵。 所有在区块链上发生的事情都要通过每个节点 进行验证。 为了实现这一点，每个合约的机器语言代码和存储都可以在每个节点上找到。 虽然无需发布您的合约代码，但这样其它人都不会认真对待您，除非您发布源代码和用于编译的 Solidity 版本，这样人们可以用它来验证您提供的机器语言代码。 例如，请查看[此合约](https://etherscan.io/address/0xa530F85085C6FE2f866E7FdB716849714a89f4CD#code)。

&nbsp;

```solidity
    /**
     * @dev Returns the amount of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);
```

顾名思义，`balanceOf` 返回一个账户的余额。 以太坊帐户在 Solidity 中通过 `address` 类型识别，该类型有 160 位。 它也是 `external` 和 `view` 类型。

&nbsp;

```solidity
    /**
     * @dev Moves `amount` tokens from the caller's account to `recipient`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address recipient, uint256 amount) external returns (bool);
```

`transfer` 函数将代币从调用者地址转移到另一个地址。 这涉及到状态的更改，所以它不是 `view` 类型。 当用户调用此函数时，它会创建交易并消耗燃料。 还会触发一个 `Transfer` 事件，以通知区块链上的所有人。

该函数有两种输出，对应两种不同的调用：

- 直接从用户接口调用函数的用户。 此类用户通常会提交一个交易 并且不会等待响应，因为响应可能需要无限期的时间。 用户可以查看交易收据 （通常通过交易哈希值识别）或者查看 `Transfer` 事件，以确定发生了什么。
- 将函数作为整个交易一部分调用的其他合约 这些合约可立即获得结果， 由于它们在相同的交易里运行，因此可以使用函数返回值。

更改合约状态的其他函数创建的同类型输出。

&nbsp;

限额允许帐户使用属于另一位所有者的代币。 比如，当合约作为卖方时，这个函数就很实用。 合约无法 监听事件，如果买方要将代币直接转给卖方合约， 该合约无法知道已经获得付款。 因此，买方允许 卖方合约支付一定的额度，而让卖方转账相应金额。 这通过卖方合约调用的函数完成，这样卖方合约 可以知道是否成功。

```solidity
    /**
     * @dev Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through {transferFrom}. This is
     * zero by default.
     *
     * This value changes when {approve} or {transferFrom} are called.
     */
    function allowance(address owner, address spender) external view returns (uint256);
```

`allowance` 函数允许任何人查询一个 地址 (`owner`) 给另一个地址 (`spender`) 的许可额度。

&nbsp;

```solidity
    /**
     * @dev Sets `amount` as the allowance of `spender` over the caller's tokens.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * IMPORTANT: Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution to mitigate this race
     * condition is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emits an {Approval} event.
     */
    function approve(address spender, uint256 amount) external returns (bool);
```

`approve` 函数创建了一个许可额度。 请务必阅读关于 如何避免函数被滥用的信息。 在以太坊中，您可以控制自己交易的顺序， 但无法控制其他方交易的执行顺序， 除非在看到其他方的交易发生之前 不提交您自己的交易。

&nbsp;

```solidity
    /**
     * @dev Moves `amount` tokens from `sender` to `recipient` using the
     * allowance mechanism. `amount` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

最后，消费者使用 `transferFrom` 函数用来使用许可额度。

&nbsp;

```solidity

    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `value` is the new allowance.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);
}
```

在 ERC-20 合约状态发生变化时就会激发这些事件。

## 实际合约 {#the-actual-contract}

这是实现 ERC-20 标准的实际合约， [摘自此处](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)。 不能照原样使用，但可以 通过[继承](https://www.tutorialspoint.com/solidity/solidity_inheritance.htm)将其扩展，使之可用。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
```

&nbsp;

### 导入声明 {#import-statements}

除了上述接口定义外，合约定义还要导入两个其他文件：

```solidity

import "../../GSN/Context.sol";
import "./IERC20.sol";
import "../../math/SafeMath.sol";
```

- `GSN/Context.sol` 是使用 [OpenGSN](https://www.opengsn.org/) 所需的文件，该系统允许用户在没有以太币的情况下 使用区块链。 请注意，这里的文件是旧版本，如果需要集成 OpenGSN， [请使用此教程](https://docs.opengsn.org/javascript-client/tutorial.html)。
- [SafeMath 库](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/)，用于 完成没有溢出问题的加法和减法。 这非常必要，否则会出现，用户仅有一个代币，花掉 两个代币后，反而有了 2^256-1 个代币。

&nbsp;

这里的注释说明了合约的目的。

```solidity
/**
 * @dev Implementation of the {IERC20} interface.
 *
 * This implementation is agnostic to the way tokens are created. This means
 * that a supply mechanism has to be added in a derived contract using {_mint}.
 * For a generic mechanism see {ERC20PresetMinterPauser}.
 *
 * TIP: For a detailed writeup see our guide
 * https://forum.zeppelin.solutions/t/how-to-implement-erc20-supply-mechanisms/226[How
 * to implement supply mechanisms].
 *
 * We have followed general OpenZeppelin guidelines: functions revert instead
 * of returning `false` on failure. This behavior is nonetheless conventional
 * and does not conflict with the expectations of ERC20 applications.
 *
 * Additionally, an {Approval} event is emitted on calls to {transferFrom}.
 * This allows applications to reconstruct the allowance for all accounts just
 * by listening to said events. Other implementations of the EIP may not emit
 * these events, as it isn't required by the specification.
 *
 * Finally, the non-standard {decreaseAllowance} and {increaseAllowance}
 * functions have been added to mitigate the well-known issues around setting
 * allowances. See {IERC20-approve}.
 */

```

### 合约定义 {#contract-definition}

```solidity
contract ERC20 is Context, IERC20 {
```

此行为 OpenGSN 指定继承，在本例中来自上面的 `IERC20` 和 `Context`。

&nbsp;

```solidity

    using SafeMath for uint256;

```

此行将 `SafeMath` 库附加到 `uint256` 类型。 您可以在 [此处](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol)找到此程序库。

### 变量的定义 {#variable-definitions}

这些定义具体指定了合约的状态变量。 虽然声明这些变量为 `private`，但 这只意味着区块链上的其他合约无法读取它们。 _区块链上 没有秘密_，所有节点上的软件在每个区块上 都有每个合约的状态。 根据惯例，状态变量名称为 `_<something>`。

前两个变量是[映射](https://www.tutorialspoint.com/solidity/solidity_mappings.htm)， 表示它们的结果与[关联数组](https://wikipedia.org/wiki/Associative_array)相同， 不同之处在于关键词为数值。 存储空间仅分配给数值不同于 默认值（零）的条目。

```solidity
    mapping (address => uint256) private _balances;
```

第一个映射，`_balances`，是代币地址和对应的余额。 要查看 余额，请使用此语法：`_balances[<address>]`。

&nbsp;

```solidity
    映射 (address => mapping (address => uint256)) private _allowances;
```

此变量，`_allowances` 存储之前提到过的许可限额。 第一个索引是 代币的所有者，第二个索引是获得许可限额的合约。 要查询地址 A 可以 从地址 B 账户中支出的额度，请使用 `_allowances[B][A]`。

&nbsp;

```solidity
    uint256 private _totalSupply;
```

顾名思义，此变量记录代币供应总量。

&nbsp;

```solidity
    string private _name;
    string private _symbol;
    uint8 private _decimals;
```

这三个变量用于提高可读性。 前两项的含义不言自明，但 `_decimals` 并非如此。

一方面，以太坊不具有浮点数或分数变量。 另一方面， 人们希望能够拆分代币。 人们选择将黄金做为货币的一个原因是 当有人想要购买一只牛的一小部分时，就很难找零。

解决方案是保持整数值，但是计数时使用一个价值非常小的分数代币， 而不是真正的代币。 就以太币而言，分数代币称为 wei，10^18 个 wei 等于一个 以太币。 在撰写本文时，10,000,000,000,000 wei 约等于一美分或欧分。

应用程序需要知道如何显示代币余额。 如果某位用户有 3,141,000,000,000,000,000 wei，那是否是 3.14 个以太币？ 31.41 个以太币？ 还是 3,141 个以太币？ 对于以太币，10^18 个 wei 等于 1 个以太币，但对于您的 代币，您可以选择一个不同的值。 如果无法合理拆分代币，您可以将 `_decimals` 值设为零。 如果想要使用与以太币相同的标准，请使用 **18**。

### 构造函数 {#the-constructor}

```solidity
    /**
     * @dev Sets the values for {name} and {symbol}, initializes {decimals} with
     * a default value of 18.
     *
     * To select a different value for {decimals}, use {_setupDecimals}.
     *
     * All three of these values are immutable: they can only be set once during
     * construction.
     */
    constructor (string memory name_, string memory symbol_) public {
        _name = name_;
        _symbol = symbol_;
        _decimals = 18;
    }
```

构造函数在首次创建合约时调用。 根据惯例，函数参数名为 `<something>_`。

### 用户接口函数 {#user-interface-functions}

```solidity
    /**
     * @dev Returns the name of the token.
     */
    function name() public view returns (string memory) {
        return _name;
    }

    /**
     * @dev Returns the symbol of the token, usually a shorter version of the
     * name.
     */
    function symbol() public view returns (string memory) {
        return _symbol;
    }

    /**
     * @dev Returns the number of decimals used to get its user representation.
     * For example, if `decimals` equals `2`, a balance of `505` tokens should
     * be displayed to a user as `5,05` (`505 / 10 ** 2`).
     *
     * Tokens usually opt for a value of 18, imitating the relationship between
     * ether and wei. This is the value {ERC20} uses, unless {_setupDecimals} is
     * called.
     *
     * NOTE: This information is only used for _display_ purposes: it in
     * no way affects any of the arithmetic of the contract, including
     * {IERC20-balanceOf} and {IERC20-transfer}.
     */
    function decimals() public view returns (uint8) {
        return _decimals;
    }
```

这些函数，`name`、`symbol` 和 `decimals` 帮助用户界面了解合约，从而正常演示合约。

返回类型为 `string memory`，意味着返回在内存中存储的字符串。 变量，如 字符串，可以存储在三个位置：

|          | 有效时间   | 合约访问 | 燃料成本                           |
| -------- | ---------- | -------- | ---------------------------------- |
| 内存     | 函数调用   | 读/写    | 几十到几百不等（距离越远费用越高） |
| 调用数据 | 函数调用   | 只读     | 不可用作返回类型，只可用作函数参数 |
| 存储     | 直到被修改 | 读/写    | 高（读取需要 800，写入需要 2 万）  |

在这种情况下，`memory` 是最好的选择。

### 读取代币信息 {#read-token-information}

这些是提供代币信息的函数，不管是总量还是 账户余额。

```solidity
    /**
     * @dev See {IERC20-totalSupply}.
     */
    function totalSupply() public view override returns (uint256) {
        return _totalSupply;
    }
```

`totalSupply` 函数返回代币的总量。

&nbsp;

```solidity
    /**
     * @dev See {IERC20-balanceOf}.
     */
    function balanceOf(address account) public view override returns (uint256) {
        return _balances[account];
    }
```

读取一个帐户的余额。 请注意，任何人都可以查看他人账户的余额。 试图隐藏此信息没有意义，因为它在每个节点上 都是可见的。 _区块链上没有秘密_

### 代币转账 {#transfer-tokens}

```solidity
    /**
     * @dev See {IERC20-transfer}.
     *
     * Requirements:
     *
     * - `recipient` cannot be the zero address.
     * - the caller must have a balance of at least `amount`.
     */
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
```

调用 `transfer` 函数以从发送人的帐户转移代币到另一个帐户。 注意 虽然函数返回的是布尔值，但那个值始终为**真实值**。 如果转账失败， 合约会撤销调用。

&nbsp;

```solidity
        _transfer(_msgSender(), recipient, amount);
        return true;
    }
```

`_transfer` 函数完成了实际工作。 这是一个私有函数，只能由 其他合约函数调用。 根据常规，私人函数名为 `_<something>`，与状态 变量相同。

在 Solidity 中，我们通常使用 `msg.sender` 代表信息发送人。 然而，这会破坏 [OpenGSN](http://opengsn.org/) 的规则。 如果我们想使用代币进行交易而不用以太币，我们 需要使用 `_msgSender()`。 对于正常交易，它返回 `msg.sender`，但是对于没有以太币的交易， 则返回原始签名而不是传递信息的合约。

### 许可额度函数 {#allowance-functions}

这些是实现许可额度功能的函数：`allowance`、`approve`、`transferFrom` 和 `_approve`。 此外，除基本标准外，OpenZepelin 实现还包含了一些能够提高 安全性的功能：`increaseallance` 和 `decreaseAllowance`。

#### 许可额度函数 {#allowance}

```solidity
    /**
     * @dev See {IERC20-allowance}.
     */
    function allowance(address owner, address spender) public view virtual override returns (uint256) {
        return _allowances[owner][spender];
    }
```

`allowance` 函数使每个人都能检查任何许可额度。

#### 审批函数 {#approve}

```solidity
    /**
     * @dev See {IERC20-approve}.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     */
    function approve(address spender, uint256 amount) public virtual override returns (bool) {
```

调用此函数以创建许可额度。 它与上述 `transfer` 函数相似：

- 该函数仅调用一个完成真正工作的内部函数（本例中为 `_approval`）。
- 函数要么返回 `true`（如果成功），要么撤销（如果失败）。

&nbsp;

```solidity
        _approve(_msgSender(), spender, amount);
        return true;
    }
```

我们使用内部函数尽量减少发生状态变化之处。 *任何*可以改变状态的 函数都是一种潜在的安全风险，需要对其安全性进行审核。 这样我们就能减少出错的机会。

#### TransferFrom 函数 {#transferFrom}

这个函数被消费者用于使用许可额度。 这里需要两步操作：将消费的金额转账， 并在许可额度中减去这笔金额。

```solidity
    /**
     * @dev See {IERC20-transferFrom}.
     *
     * Emits an {Approval} event indicating the updated allowance. This is not
     * required by the EIP. See the note at the beginning of {ERC20}.
     *
     * Requirements:
     *
     * - `sender` and `recipient` cannot be the zero address.
     * - `sender` must have a balance of at least `amount`.
     * - the caller must have allowance for ``sender``'s tokens of at least
     * `amount`.
     */
    function transferFrom(address sender, address recipient, uint256 amount) public virtual
                                                override returns (bool) {
        _transfer(sender, recipient, amount);
```

&nbsp;

`a.sub(b, "message")` 函数调用做了两件事。 首先，它计算了 `a-b`，这是新的许可额度。 之后，它检查这一结果是否为负数。 如果结果为负，将撤销调用，并发出相应的信息。 请注意，撤销调用后，之前在调用中完成的任何处理都会被忽略，所以我们不需要 撤消 `_transfer`。

```solidity
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount,
             "ERC20: transfer amount exceeds allowance"));
        return true;
    }
```

#### OpenZepelin 安全加法 {#openzeppelin-safety-additions}

将许可额度从一个非零值设定为另一个非零值是有危险的， 因为您只能控制自己的交易顺序，而无法控制其他人的交易顺序。 假设现在有两个用户，天真的 Alice 和不诚实的 Bill。 Alice 想要从 Bill 处获取一些服务， 她认为值五个代币，所以她给了 Bill 五个代币的许可额度。

之后有了一些变化，Bill 的价格提高到了十个代币。 Alice 仍然想要购买服务，就发送了一笔交易，将 Bill 的许可额度设置为 10。 当 Bill 在交易池中看到这个新的交易时， 他就会发送一笔交易，以花费 Alice 的五个代币，并且设定高得多的 燃料价格，这样就会更快挖矿。 这样的话，Bill 可以先花五个代币，然后 当 Alice 的新许可额度放款后，他就可以再花费十个代币，这样总共花费了 15 个代币， 超过了 Alice 本欲授权的金额。 这种技术叫做 [抢先交易](https://consensys.github.io/smart-contract-best-practices/attacks/#front-running)

| Alice 的交易      | Alice 的随机数 | Bill 的交易                   | Bill 的随机数 | Bill 的许可额度 | Bill 从 Alice 处获得的总收入 |
| ----------------- | -------------- | ----------------------------- | ------------- | --------------- | ---------------------------- |
| approve(Bill, 5)  | 10             |                               |               | 5               | 0                            |
|                   |                | transferFrom(Alice, Bill, 5)  | 10,123        | 0               | 5                            |
| approve(Bill, 10) | 11             |                               |               | 10              | 5                            |
|                   |                | transferFrom(Alice, Bill, 10) | 10,124        | 0               | 15                           |

为了避免这个问题，有两个函数（`increaseAllowance` 和 `decreaseAllowance`）使您 能够修改指定数额的许可额度。 所以，如果 Bill 已经花费了五个代币， 他就只能再花五个代币。 根据时间的不同，有两种方法可以生效， 这两种方法都会使 Bill 最终只得到十个代币：

A：

| Alice 的交易               | Alice 的随机数 | Bill 的交易                  | Bill 的随机数 | Bill 的许可额度 | Bill 从 Alice 处获得的总收入 |
| -------------------------- | -------------: | ---------------------------- | ------------: | --------------: | ---------------------------- |
| approve(Bill, 5)           |             10 |                              |               |               5 | 0                            |
|                            |                | transferFrom(Alice, Bill, 5) |        10,123 |               0 | 5                            |
| increaseAllowance(Bill, 5) |             11 |                              |               |         0+5 = 5 | 5                            |
|                            |                | transferFrom(Alice, Bill, 5) |        10,124 |               0 | 10                           |

B：

| Alice 的交易               | Alice 的随机数 | Bill 的交易                   | Bill 的随机数 | Bill 的许可额度 | Bill 从 Alice 处获得的总收入 |
| -------------------------- | -------------: | ----------------------------- | ------------: | --------------: | ---------------------------: |
| approve(Bill, 5)           |             10 |                               |               |               5 |                            0 |
| increaseAllowance(Bill, 5) |             11 |                               |               |        5+5 = 10 |                            0 |
|                            |                | transferFrom(Alice, Bill, 10) |        10,124 |               0 |                           10 |

```solidity
    /**
     * @dev Atomically increases the allowance granted to `spender` by the caller.
     *
     * This is an alternative to {approve} that can be used as a mitigation for
     * problems described in {IERC20-approve}.
     *
     * Emits an {Approval} event indicating the updated allowance.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     */
    function increaseAllowance(address spender, uint256 addedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].add(addedValue));
        return true;
    }
```

`a.add(b)` 函数是一个安全加法。 在罕见的情况下，`a`+`b`>=`2^256`，不会发生 普通加法会出现的溢出错误。

```solidity

    /**
     * @dev Atomically decreases the allowance granted to `spender` by the caller.
     *
     * This is an alternative to {approve} that can be used as a mitigation for
     * problems described in {IERC20-approve}.
     *
     * Emits an {Approval} event indicating the updated allowance.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     * - `spender` must have allowance for the caller of at least
     * `subtractedValue`.
     */
    function decreaseAllowance(address spender, uint256 subtractedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].sub(subtractedValue,
                "ERC20: decreased allowance below zero"));
        return true;
    }
```

### 修改代币信息的函数 {#functions-that-modify-token-information}

这些是完成实际工作的四个函数：`_transfer`、`_mint`、`_burn` 和 `_approval`。

#### \_transfer 函数 {#\_transfer}

```solidity
    /**
     * @dev Moves tokens `amount` from `sender` to `recipient`.
     *
     * This is internal function is equivalent to {transfer}, and can be used to
     * e.g. implement automatic token fees, slashing mechanisms, etc.
     *
     * Emits a {Transfer} event.
     *
     * Requirements:
     *
     * - `sender` cannot be the zero address.
     * - `recipient` cannot be the zero address.
     * - `sender` must have a balance of at least `amount`.
     */
    function _transfer(address sender, address recipient, uint256 amount) internal virtual {
```

`_transfer` 这个函数将代币从一个账户转到另一个账户。 有两个函数调用它，分别是 `transfer`（从发送人本人账户发送）和 `transferFrom`（使用许可额度，从其他人的账户发送）。

&nbsp;

```solidity
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");
```

实际上以太坊中没有人拥有零地址（即不存在对应公钥可以转换为零地址的私钥）。 有人使用该地址时，通常是一个软件漏洞，所以 如果将零地址用作发送人或接收人，交易将失败。

&nbsp;

```solidity
        _beforeTokenTransfer(sender, recipient, amount);

```

使用该合约有两种方法：

1. 将其作为模板，编写自己的代码
1. [从它继承](https://www.bitdegree.org/learn/solidity-inheritance)一个合约，并且重写您需要修改的函数

第二种方法要好得多，因为 OpenZepelin ERC-20 代码已经过审核，其安全性也已得到证实。 当您的合约继承它时， 可以清楚地表明修改了哪些函数，只需要审核这些特定的函数，人们就会信任您的合约。

代币每次易手时，通常都需要调用一个函数。 然而，`_transfer` 是一个非常重要的函数， 重新编写可能会不安全（见下文），所以最好不要重写。 解决方案是重写 `_beforeTokenTransfer` 函数，这是一个[挂钩函数](https://wikipedia.org/wiki/Hooking)。 您可以重写此函数，之后每次转账都会调用它。

&nbsp;

```solidity
        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
```

这些是实际实现转账的代码。 请注意，将转账金额从发送人帐户上扣除，然后加到接收人帐户之间， 不得有任何**动作**。 这很重要，因为如果 中间调用不同的合约，可能会被用来骗过这个合约。 目前转账为最小操作单元，即中间什么都不会发生。

&nbsp;

```solidity
        emit Transfer(sender, recipient, amount);
    }
```

最后，激发一个 `Transfer` 事件。 智能合约无法访问事件，但区块链外运行的代码 可以监听事件并对其作出反应。 例如，钱包可以跟踪所有者获得更多代币事件。

#### \_mint 和 \_burn 函数 {#\_mint-and-\_burn}

这两个函数（`_mint` 和 `_burn`）修改代币的总供应量。 它们都是内部函数，在原有合约中没有任何调用它们的函数。 因此，仅通过继承合约并添加您自己的逻辑， 来决定在什么条件下可以铸造新代币或消耗现有代币时， 它们才是有用的。

**注意：**每一个 ERC-20 代币都通过自己的业务逻辑来决定代币管理。 例如，一个固定供应总量的合约可能只在构造函数中调用 `_mint`，而从不调用 `_burn`。 一个销售代币的合约 将在支付时调用 `_mint`，并大概在某个时间点调用 `_burn`， 以避免过快的通货膨胀。

```solidity
    /** @dev Creates `amount` tokens and assigns them to `account`, increasing
     * the total supply.
     *
     * Emits a {Transfer} event with `from` set to the zero address.
     *
     * Requirements:
     *
     * - `to` cannot be the zero address.
     */
    function _mint(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: mint to the zero address");
        _beforeTokenTransfer(address(0), account, amount);
        _totalSupply = _totalSupply.add(amount);
        _balances[account] = _balances[account].add(amount);
        emit Transfer(address(0), account, amount);
    }
```

当代币总数发生变化时，请务必更新 `_totalSupply`。

&nbsp;

```
    /**
     * @dev Destroys `amount` tokens from `account`, reducing the
     * total supply.
     *
     * Emits a {Transfer} event with `to` set to the zero address.
     *
     * Requirements:
     *
     * - `account` cannot be the zero address.
     * - `account` must have at least `amount` tokens.
     */
    function _burn(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: burn from the zero address");

        _beforeTokenTransfer(account, address(0), amount);

        _balances[account] = _balances[account].sub(amount, "ERC20: burn amount exceeds balance");
        _totalSupply = _totalSupply.sub(amount);
        emit Transfer(account, address(0), amount);
    }
```

`_burn` 函数与 `_mint` 函数几乎完全相同，但它们的方向相反。

#### \_approve 函数 {#\_approve}

这是实际设定许可额度的函数。 请注意，它允许所有者指定 一个高于所有者当前余额的许可额度。 这是允许的，因为在转账时 会核查余额，届时可能不同于 创建许可额度时的金额。

```solidity
    /**
     * @dev Sets `amount` as the allowance of `spender` over the `owner` s tokens.
     *
     * This internal function is equivalent to `approve`, and can be used to
     * e.g. set automatic allowances for certain subsystems, etc.
     *
     * Emits an {Approval} event.
     *
     * Requirements:
     *
     * - `owner` cannot be the zero address.
     * - `spender` cannot be the zero address.
     */
    function _approve(address owner, address spender, uint256 amount) internal virtual {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
```

&nbsp;

激发一个 `Approval` 事件。 根据应用程序的编写， 消费者合约可以从代币所有者或监听事件的服务器获知审批结果。

```solidity
        emit Approval(owner, spender, amount);
    }

```

### 修改小数点设置变量 {#modify-the-decimals-variable}

```solidity


    /**
     * @dev Sets {decimals} to a value other than the default one of 18.
     *
     * WARNING: This function should only be called from the constructor. Most
     * applications that interact with token contracts will not expect
     * {decimals} to ever change, and may work incorrectly if it does.
     */
    function _setupDecimals(uint8 decimals_) internal {
        _decimals = decimals_;
    }
```

此函数修改了 `>_decimals` 变量，此变量用于设置用户接口如何计算金额。 您应该从构造函数里面调用。 在之后的任何时候调用都是不正当的， 应用程序一般不会处理。

### 钩子 {#hooks}

```solidity

    /**
     * @dev Hook that is called before any transfer of tokens. This includes
     * minting and burning.
     *
     * Calling conditions:
     *
     * - when `from` and `to` are both non-zero, `amount` of ``from``'s tokens
     * will be to transferred to `to`.
     * - when `from` is zero, `amount` tokens will be minted for `to`.
     * - when `to` is zero, `amount` of ``from``'s tokens will be burned.
     * - `from` and `to` are never both zero.
     *
     * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
     */
    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual { }
}
```

这是转账过程中要调用的挂钩函数。 该函数是空的，但如果你需要 它做一些事情，只需覆盖它即可。

# 结论 {#conclusion}

复习一下，这些是我认为此合约中最重要的概念（你们的看法可能与我不同）

- _区块链上没有秘密_ 智能合约可以访问的任何信息 都可以提供给全世界。
- 您可以控制自己交易的订单，但在其他人的交易发生时， 则不能控制。 这就是为什么更改许可额度时会有风险，因为它 允许消费者花掉这两个许可额度的总和。
- `uint256` 类型值的溢出。 换言之，_0-1=2^256-1_。 如果这不是预期的 行为，您必须自行检查（或使用 SafeMath 库执行该服务）。 请注意， [Solidity 0.8.0](https://docs.soliditylang.org/en/breaking/080-breaking-changes.html) 中对此进行了更改。
- 将特定类型变量的状态改变放在一个特定的地方，这样可以使审核更容易。 这就是我们使用以下等函数的原因，例如 `_approval` 函数，它可以被`approve`、`transferFrom`、 `increaseAllowance` 和 `decreaseAllowance` 调用。
- 状态更改应为最小操作单元，其中没有任何其他动作 （如在 `_transfer` 中所见）。 这是因为在状态更改期间，会出现不一致的情况。 例如， 在减少发送人的余额，和增加接收人的余额之间， 代币总量会小于应有总量。 如果在这两个时刻之间有任何操作， 特别是调用不同的合约，则可能出现滥用。

现在您已经了解了 OpenZeppelin ERC-20 合约是怎么编写的， 尤其是如何使之更加安全，您即可编写自己的安全合约和应用程序。
