---
title: "ERC-20 合约详解"
description: OpenZeppelin ERC-20 合约中有什么，为什么？
author: Ori Pomerantz
lang: zh
tags: [ "Solidity", "erc-20" ]
skill: beginner
published: 2021-03-09
---

## 简介 {#introduction}

以太坊最常见的用途之一是由一个团队来打造一种可以交易的代币，在某种意义上是他们自己的货币。 这些代币通常遵循一个标准：
[ERC-20](/developers/docs/standards/tokens/erc-20/)。 此标准使得编写适用于所有 ERC-20
代币的工具（例如流动性资金池和钱包）成为可能。 在本文中，我们将分析
[OpenZeppelin Solidity ERC20 实现](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)以及
[接口定义](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol)。

这是带注释的源代码。 如果你想实现 ERC-20，
[请阅读本教程](https://docs.openzeppelin.com/contracts/2.x/erc20-supply)。

## 接口 {#the-interface}

ERC-20 等标准的目的是让多种代币实现能够在应用程序（如钱包和去中心化交易所）之间互操作。 为实现此目的，我们创建一个
[接口](https://www.geeksforgeeks.org/solidity/solidity-basics-of-interface/)。 任何需要使用代币合约的代码
都可以在接口中使用相同的定义，并与所有使用它的代币合约兼容，无论它是像
MetaMask 这样的钱包，像 etherscan.io 这样的去中心化应用程序，还是像流动性资金池这样不同的合约。

![ERC-20 接口图示](erc20_interface.png)

如果你是一位经验丰富的程序员，你可能还记得在 [Java](https://www.w3schools.com/java/java_interface.asp)
甚至 [C 头文件](https://gcc.gnu.org/onlinedocs/cpp/Header-Files.html)中见过类似的构造。

这是 OpenZeppelin 的
[ERC-20 接口](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) 定义。 它是将[人类可读标准](https://eips.ethereum.org/EIPS/eip-20)翻译成 Solidity 代码。 当然，
接口本身并不定义_如何_做任何事情。 这一点在下文合约的源代码中作了解释。

&nbsp;

```solidity
// SPDX-License-Identifier: MIT
```

Solidity 文件应该包含许可证标识符。 [你可以在此处查看许可证列表](https://spdx.org/licenses/)。 如果你需要其他
许可证，只需在注释中说明即可。

&nbsp;

```solidity
pragma solidity >=0.6.0 <0.8.0;
```

Solidity 语言仍在快速发展，新版本可能与旧代码不兼容
（[在此处查看](https://docs.soliditylang.org/en/v0.7.0/070-breaking-changes.html)）。 因此，最好不仅指定语言的最低
版本，还指定最高版本，即你测试过代码的最新版本。

&nbsp;

```solidity
/**
 * @dev EIP 中定义的 ERC20 标准接口。
 */
```

注释中的 `@dev` 是 [NatSpec 格式](https://docs.soliditylang.org/en/develop/natspec-format.html) 的一部分，用于从源代码生成
文档。

&nbsp;

```solidity
interface IERC20 {
```

按照惯例，接口名称以 `I` 开头。

&nbsp;

```solidity
    /**
     * @dev 返回存在的代币数量。
     */
    function totalSupply() external view returns (uint256);
```

此函数是 `external`，表示[它只能从合约外部调用](https://docs.soliditylang.org/en/v0.7.0/cheatsheet.html#index-2)。
它返回合约中代币的总供应量。 这个值按以太坊中最常见的类型返回，即无符号的 256 位（256 位是
以太坊虚拟机的原生字长）。 此函数也是 `view` 函数，意味着它不会改变状态，所以它可以在单个节点上执行，而不必让
区块链中的每个节点都运行它。 这类函数不会产生交易，也不消耗[燃料](/developers/docs/gas/)。

\*\*注意：\*\*理论上，合约创建者似乎可以通过返回比实际值小的总供应量来作弊，使每个代币看起来
比实际更有价值。 然而，这种担忧忽视了区块链的真正本质。 区块链上发生的一切都可以由
每个节点验证。 为实现这一点，每个合约的机器语言代码和存储都位于每个节点上。 虽然你不需要发布合约的 Solidity
代码，但除非你发布源代码以及用于编译它的 Solidity 版本，否则没有人会把你当回事，这样才能根据你提供的机器语言代码进行
验证。
例如，请参阅[此合约](https://eth.blockscout.com/address/0xa530F85085C6FE2f866E7FdB716849714a89f4CD?tab=contract)。

&nbsp;

```solidity
    /**
     * @dev 返回 `account` 拥有的代币数量。
     */
    function balanceOf(address account) external view returns (uint256);
```

顾名思义，`balanceOf` 返回账户余额。 以太坊账户在 Solidity 中使用 `address` 类型进行标识，该类型占 160 位。
它也是 `external` 和 `view`。

&nbsp;

```solidity
    /**
     * @dev 将 `amount` 数量的代币从调用者的账户转移到 `recipient`。
     *
     * 返回一个布尔值，表示操作是否成功。
     *
     * 触发一个 {Transfer} 事件。
     */
    function transfer(address recipient, uint256 amount) external returns (bool);
```

`transfer` 函数将代币从调用者转移到另一个地址。 这涉及状态变更，所以它不是 `view` 函数。
当用户调用此函数时，它会创建交易并消耗燃料。 它还会触发一个 `Transfer` 事件，将该事件通知
区块链上的所有人。

该函数有两种输出，对应两种不同的调用者：

- 直接从用户界面调用函数的用户。 通常，用户提交交易后
  不会等待响应，因为响应可能需要不确定的时间。 用户可以
  通过查找交易收据（通过交易哈希值识别）或查找
  `Transfer` 事件来查看发生了什么。
- 将函数作为整个交易一部分调用的其他合约。 这些合约会立即获得结果，
  因为它们在同一笔交易中运行，所以它们可以使用函数返回值。

更改合约状态的其他函数会创建相同类型的输出。

&nbsp;

授权额度允许一个账户花费属于其他所有者的代币。
例如，对于充当卖方的合约，这很有用。 合约无法
监控事件，因此如果买方将代币直接转移给卖方合约
，该合约不会知道它已收到付款。 因此，买方授权
卖方合约花费一定金额，然后卖方转走该金额。
这是通过卖方合约调用的函数完成的，因此卖方合约
可以知道它是否成功。

```solidity
    /**
     * @dev 返回 `spender` 通过 {transferFrom} 可代表 `owner` 花费的
     * 剩余代币数量。默认
     * 为零。
     *
     * 调用 {approve} 或 {transferFrom} 时，此值会发生变化。
     */
    function allowance(address owner, address spender) external view returns (uint256);
```

`allowance` 函数允许任何人查询一个
地址（`owner`）授权另一个地址（`spender`）花费的额度。

&nbsp;

```solidity
    /**
     * @dev 将 `spender` 对调用者代币的授权额度设置为 `amount`。
     *
     * 返回一个布尔值，表示操作是否成功。
     *
     * 重要提示：请注意，使用此方法更改授权额度会带来风险，
     * 有人可能因不利的交易排序而同时使用新旧两种授权额度。
     * 缓解此竞态条件的一个可行方案是，先将花费者的授权额度降至 0，
     * 然后再设置所需的值：
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * 触发一个 {Approval} 事件。
     */
    function approve(address spender, uint256 amount) external returns (bool);
```

`approve` 函数创建一个授权额度。 请务必阅读有关
如何滥用它的消息。 在以太坊中，你可以控制自己交易的顺序，
但无法控制其他人交易的执行顺序，
除非在看到对方的交易发生之前
不提交自己的交易。

&nbsp;

```solidity
    /**
     * @dev 使用
     * 授权机制将 `amount` 数量的代币从 `sender` 转移到 `recipient`。然后从调用者的授权额度中扣除 `amount`。
     *
     * 返回一个布尔值，表示操作是否成功。
     *
     * 触发一个 {Transfer} 事件。
     */
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

最后，`transferFrom` 由花费者用来实际花费授权额度。

&nbsp;

```solidity

    /**
     * @dev 当 `value` 数量的代币从一个帐户 (`from`) 转移到
     * 另一个 (`to`) 时触发。
     *
     * 请注意，`value` 可能为零。
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev 当通过
     * 调用 {approve} 为 `owner` 设置 `spender` 的授权额度时触发。`value` 是新的授权额度。
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);
}
```

当 ERC-20 合约的状态发生变化时，会触发这些事件。

## 实际合约 {#the-actual-contract}

这是实现 ERC-20 标准的实际合约，
[摘自此处](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)。
它不应按原样使用，但你可以
[继承](https://www.tutorialspoint.com/solidity/solidity_inheritance.htm)它以将其扩展为可用的东西。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
```

&nbsp;

### Import 语句 {#import-statements}

除了上面的接口定义，合约定义还导入了另外两个文件：

```solidity

import "../../GSN/Context.sol";
import "./IERC20.sol";
import "../../math/SafeMath.sol";
```

- `GSN/Context.sol` 是使用 [OpenGSN](https://www.opengsn.org/) 所需的定义，该系统允许没有以太币的用户
  使用区块链。 请注意，这是一个旧版本，如果你想与 OpenGSN 集成
  [请使用本教程](https://docs.opengsn.org/javascript-client/tutorial.html)。
- [SafeMath 库](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/)，用于防止 Solidity **&lt;0.8.0** 版本中的
  算术上溢/下溢。 在 Solidity ≥0.8.0 中，算术运算在
  上溢/下溢时会自动还原，因此不再需要 SafeMath。 此合约使用 SafeMath 是为了与
  旧版编译器向后兼容。

&nbsp;

此注释说明了合约的目的。

```solidity
/**
 * @dev {IERC20} 接口的实现。
 *
 * 此实现与代币的创建方式无关。这意味着
 * 必须使用 {_mint} 在派生合约中添加供应机制。
 * 有关通用机制，请参阅 {ERC20PresetMinterPauser}。
 *
 * 提示：有关详细的说明，请参阅我们的指南
 * https://forum.zeppelin.solutions/t/how-to-implement-erc20-supply-mechanisms/226[如何
 * 实现供应机制]。
 *
 * 我们遵循了通用的 OpenZeppelin 指南：函数在失败时会还原，而
 * 不会返回 `false`。但是，此行为是常规行为，
 * 并且与 ERC20 应用程序的预期不冲突。
 *
 * 此外，在调用 {transferFrom} 时会触发 {Approval} 事件。
 * 这允许应用程序仅通过监听所述事件
 * 即可重建所有账户的授权额度。EIP 的其他实现
 * 可能不会触发这些事件，因为规范没有要求。
 *
 * 最后，添加了非标准的 {decreaseAllowance} 和 {increaseAllowance}
 * 函数，以缓解围绕设置
 * 授权额度的众所周知的问题。请参阅 {IERC20-approve}。
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

此行将 `SafeMath` 库附加到 `uint256` 类型。 你可以在
[此处](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol)找到此库。

### 变量定义 {#variable-definitions}

这些定义指定了合约的状态变量。 这些变量被声明为 `private`，但这只意味着区块链上的其他合约无法读取它们。 区块链上
_没有秘密_，每个节点上的软件都有每个区块中
每个合约的状态。 按照惯例，状态变量命名为 `_<something>`。

前两个变量是[映射](https://www.tutorialspoint.com/solidity/solidity_mappings.htm)，
这意味着它们的行为大致与[关联数组](https://wikipedia.org/wiki/Associative_array)相同，
只是键是数值。 存储空间仅分配给值不同于
默认值（零）的条目。

```solidity
    mapping (address => uint256) private _balances;
```

第一个映射 `_balances` 是地址及其各自的此代币余额。 要访问
余额，请使用此语法：`_balances[<address>]`。

&nbsp;

```solidity
    mapping (address => mapping (address => uint256)) private _allowances;
```

此变量 `_allowances` 存储前面解释的授权额度。 第一个索引是
代币的所有者，第二个索引是具有授权额度的合约。 要访问地址 A 可以
从地址 B 的账户中花费的金额，请使用 `_allowances[B][A]`。

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

这三个变量用于提高可读性。 前两项的含义不言自明，但 `_decimals`
并非如此。

一方面，以太坊没有浮点或分数变量。 另一方面，
人们希望能够拆分代币。 人们选择将黄金作为货币的一个原因是，
当有人想用牛换鸭子时，很难找零。

解决方案是跟踪整数，但计数时使用一个价值非常小的分数代币，
而不是真正的代币。 就以太币而言，分数代币称为 wei，10^18 个 wei 等于一个
ETH。 在撰写本文时，10,000,000,000,000 wei 约等于一美分或欧分。

应用程序需要知道如何显示代币余额。 如果某位用户有 3,141,000,000,000,000,000 wei，那是否是
3.14 个 ETH？ 31.41 个 ETH？ 3,141 个 ETH？ 对于以太币，10^18 wei 等于 1 个 ETH，但对于你的
代币，你可以选择一个不同的值。 如果拆分代币没有意义，你可以将
`_decimals` 值设为零。 如果想要使用与 ETH 相同的标准，请使用值 **18**。

### 构造函数 {#the-constructor}

```solidity
    /**
     * @dev 设置 {name} 和 {symbol} 的值，用
     * 默认值 18 初始化 {decimals}。
     *
     * 要为 {decimals} 选择不同的值，请使用 {_setupDecimals}。
     *
     * 所有这三个值都是不可变的：它们只能在
     * 构造期间设置一次。
     */
    constructor (string memory name_, string memory symbol_) public {
        // In Solidity ≥0.7.0, 'public' is implicit and can be omitted.

        _name = name_;
        _symbol = symbol_;
        _decimals = 18;
    }
```

构造函数在首次创建合约时调用。 按照惯例，函数参数名为 `<something>_`。

### 用户界面函数 {#user-interface-functions}

```solidity
    /**
     * @dev 返回代币的名称。
     */
    function name() public view returns (string memory) {
        return _name;
    }

    /**
     * @dev 返回代币的符号，通常是
     * 名称的缩写。
     */
    function symbol() public view returns (string memory) {
        return _symbol;
    }

    /**
     * @dev 返回用于获取其用户表示的小数位数。
     * 例如，如果 `decimals` 等于 `2`，`505` 个代币的余额应
     * 向用户显示为 `5,05` (`505 / 10 ** 2`)。
     *
     * 代币通常选择值 18，模仿
     * 以太币和 wei 之间的关系。这是 {ERC20} 使用的值，除非
     * 调用 {_setupDecimals}。
     *
     * 注意：此信息仅用于_显示_目的：它
     * 绝不影响合约的任何算术，包括
     * {IERC20-balanceOf} 和 {IERC20-transfer}。
     */
    function decimals() public view returns (uint8) {
        return _decimals;
    }
```

这些函数，`name`、`symbol` 和 `decimals` 帮助用户界面了解你的合约，以便它们能够正确显示。

返回类型是 `string memory`，表示返回存储在内存中的字符串。 变量，例如
字符串，可以存储在三个位置：

|      | 生命周期  | 合约访问 | 燃料成本                |
| ---- | ----- | ---- | ------------------- |
| 内存   | 函数调用  | 读/写  | 几十到几百不等（位置越高成本越高）   |
| 调用数据 | 函数调用  | 只读   | 不能用作返回类型，只能用作函数参数类型 |
| 存储   | 直到被修改 | 读/写  | 高（读取为 800，写入为 2 万）  |

在这种情况下，`memory` 是最好的选择。

### 读取代币信息 {#read-token-information}

这些是提供代币信息的函数，无论是总供应量还是
账户余额。

```solidity
    /**
     * @dev 请参阅 {IERC20-totalSupply}。
     */
    function totalSupply() public view override returns (uint256) {
        return _totalSupply;
    }
```

`totalSupply` 函数返回代币的总供应量。

&nbsp;

```solidity
    /**
     * @dev 请参阅 {IERC20-balanceOf}。
     */
    function balanceOf(address account) public view override returns (uint256) {
        return _balances[account];
    }
```

读取账户余额。 请注意，任何人都可以获取其他任何人的账户
余额。 试图隐藏此信息没有意义，因为它在每个节点上
都是可见的。 _区块链上没有秘密。_

### 转移代币 {#transfer-tokens}

```solidity
    /**
     * @dev 请参阅 {IERC20-transfer}。
     *
     * 要求：
     *
     * - `recipient` 不能是零地址。
     * - 调用者必须拥有至少 `amount` 的余额。
     */
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
```

`transfer` 函数用于将代币从发送者的账户转移到另一个账户。 请注意
，即使它返回一个布尔值，该值也始终为 **true**。 如果转移
失败，合约将还原调用。

&nbsp;

```solidity
        _transfer(_msgSender(), recipient, amount);
        return true;
    }
```

`_transfer` 函数执行实际工作。 它是一个私有函数，只能由
其他合约函数调用。 按照惯例，私有函数命名为 `_<something>`，与状态
变量相同。

通常在 Solidity 中，我们使用 `msg.sender` 表示消息发送者。 然而，这会破坏
[OpenGSN](http://opengsn.org/)。 如果我们想允许使用我们的代币进行无以太币交易，我们
需要使用 `_msgSender()`。 对于正常交易，它返回 `msg.sender`，但对于无以太币的交易，
它返回原始签名者而不是中继消息的合约。

### 授权额度函数 {#allowance-functions}

这些是实现授权额度功能的函数：`allowance`、`approve`、`transferFrom`
和 `_approve`。 此外，OpenZeppelin 实现超出了基本标准，包含了一些提高
安全性的功能：`increaseAllowance` 和 `decreaseAllowance`。

#### allowance 函数 {#allowance}

```solidity
    /**
     * @dev 请参阅 {IERC20-allowance}。
     */
    function allowance(address owner, address spender) public view virtual override returns (uint256) {
        return _allowances[owner][spender];
    }
```

`allowance` 函数允许任何人检查任何授权额度。

#### approve 函数 {#approve}

```solidity
    /**
     * @dev 请参阅 {IERC20-approve}。
     *
     * 要求：
     *
     * - `spender` 不能是零地址。
     */
    function approve(address spender, uint256 amount) public virtual override returns (bool) {
```

此函数用于创建授权额度。 它与上面的 `transfer` 函数相似：

- 该函数仅调用一个执行实际工作的内部函数（本例中为 `_approve`）。
- 函数要么返回 `true`（如果成功），要么还原（如果失败）。

&nbsp;

```solidity
        _approve(_msgSender(), spender, amount);
        return true;
    }
```

我们使用内部函数来尽量减少发生状态变化的地方。 _任何_改变
状态的函数都是潜在的安全风险，需要进行安全审计。 这样我们出错的机会就更少了。

#### transferFrom 函数 {#transferFrom}

这个函数由花费者调用以花费授权额度。 这需要两个操作：转移花费的金额
并从授权额度中减去该金额。

```solidity
    /**
     * @dev 请参阅 {IERC20-transferFrom}。
     *
     * 触发一个 {Approval} 事件，指示更新后的授权额度。EIP
     * 并未要求此项。请参阅 {ERC20} 开头的注释。
     *
     * 要求：
     *
     * - `sender` 和 `recipient` 不能是零地址。
     * - `sender` 必须拥有至少 `amount` 的余额。
     * - 调用者必须拥有至少 `amount` 的 ``sender`` 代币授权额度
     * 。
     */
    function transferFrom(address sender, address recipient, uint256 amount) public virtual
                                                override returns (bool) {
        _transfer(sender, recipient, amount);
```

&nbsp;

`a.sub(b, "message")` 函数调用做了两件事。 首先，它计算 `a-b`，这是新的授权额度。
其次，它检查此结果是否为负数。 如果结果为负，将还原调用，并发出提供的消息。 请注意，当调用还原时，该调用期间先前完成的任何处理都将被忽略，因此我们不需要
撤销 `_transfer`。

```solidity
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount,
             "ERC20: transfer amount exceeds allowance"));
        return true;
    }
```

#### OpenZeppelin 安全补充 {#openzeppelin-safety-additions}

将非零授权额度设置为另一个非零值是危险的，
因为你只能控制自己交易的顺序，而不能控制其他人的交易顺序。 假设现在有两个用户，天真的 Alice 和不诚实的 Bill。 Alice 想要从 Bill 处获取一些服务，
她认为值五个代币，所以她给了 Bill 五个代币的授权额度。

之后有了一些变化，Bill 的价格提高到了十个代币。 Alice 仍然想要购买服务，就发送了一笔交易，将 Bill 的授权额度设置为 10。 当 Bill 在交易池中看到这个新的交易时，
他就会发送一笔交易，以花费 Alice 的五个代币，并且设定高得多的
燃料价格，这样就会更快挖出。 这样，Bill 可以先花五个代币，然后
当 Alice 的新授权额度被挖出后，他就可以再花费十个代币，这样总共花费了 15 个代币，
超过了 Alice 本欲授权的金额。 这种技术称为
[抢先交易](https://consensysdiligence.github.io/smart-contract-best-practices/attacks/#front-running)

| Alice 的交易                            | Alice 的随机数 | Bill 的交易                                         | Bill 的随机数 | Bill 的授权额度 | Bill 从 Alice 处获得的总收入 |
| ------------------------------------ | ---------- | ------------------------------------------------ | --------- | ---------- | -------------------- |
| approve(Bill, 5)  | 10         |                                                  |           | 5          | 0                    |
|                                      |            | transferFrom(Alice, Bill, 5)  | 10,123    | 0          | 5                    |
| approve(Bill, 10) | 11         |                                                  |           | 10         | 5                    |
|                                      |            | transferFrom(Alice, Bill, 10) | 10,124    | 0          | 15                   |

为避免此问题，这两个函数（`increaseAllowance` 和 `decreaseAllowance`）允许你
修改指定数额的授权额度。 所以，如果 Bill 已经花费了五个代币，
他就只能再花五个代币。 根据时间的不同，有两种方法可以生效，
这两种方法都会使 Bill 最终只得到十个代币：

A：

| Alice 的交易                                     | Alice 的随机数 | Bill 的交易                                        | Bill 的随机数 | Bill 的授权额度 | Bill 从 Alice 处获得的总收入 |
| --------------------------------------------- | ---------: | ----------------------------------------------- | --------: | ---------: | -------------------- |
| approve(Bill, 5)           |         10 |                                                 |           |          5 | 0                    |
|                                               |            | transferFrom(Alice, Bill, 5) |    10,123 |          0 | 5                    |
| increaseAllowance(Bill, 5) |         11 |                                                 |           |    0+5 = 5 | 5                    |
|                                               |            | transferFrom(Alice, Bill, 5) |    10,124 |          0 | 10                   |

B：

| Alice 的交易                                     | Alice 的随机数 | Bill 的交易                                         | Bill 的随机数 | Bill 的授权额度 | Bill 从 Alice 处获得的总收入 |
| --------------------------------------------- | ---------: | ------------------------------------------------ | --------: | ---------: | -------------------: |
| approve(Bill, 5)           |         10 |                                                  |           |          5 |                    0 |
| increaseAllowance(Bill, 5) |         11 |                                                  |           |   5+5 = 10 |                    0 |
|                                               |            | transferFrom(Alice, Bill, 10) |    10,124 |          0 |                   10 |

```solidity
    /**
     * @dev 以原子方式增加调用者授予 `spender` 的授权额度。
     *
     * 这是 {approve} 的替代方案，可用于缓解
     * {IERC20-approve} 中描述的问题。
     *
     * 触发一个 {Approval} 事件，指示更新后的授权额度。
     *
     * 要求：
     *
     * - `spender` 不能是零地址。
     */
    function increaseAllowance(address spender, uint256 addedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].add(addedValue));
        return true;
    }
```

`a.add(b)` 函数是一个安全加法。 在 `a`+`b`>=`2^256` 的罕见情况下，它不会像
普通加法那样发生环绕。

```solidity

    /**
     * @dev 以原子方式减少调用者授予 `spender` 的授权额度。
     *
     * 这是 {approve} 的替代方案，可用于缓解
     * {IERC20-approve} 中描述的问题。
     *
     * 触发一个 {Approval} 事件，指示更新后的授权额度。
     *
     * 要求：
     *
     * - `spender` 不能是零地址。
     * - `spender` 必须拥有至少
     * `subtractedValue` 的调用者授权额度。
     */
    function decreaseAllowance(address spender, uint256 subtractedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].sub(subtractedValue,
                "ERC20: decreased allowance below zero"));
        return true;
    }
```

### 修改代币信息的函数 {#functions-that-modify-token-information}

这些是执行实际工作的四个函数：`_transfer`、`_mint`、`_burn` 和 `_approve`。

#### _transfer 函数 {#_transfer}

```solidity
    /**
     * @dev 将 `amount` 数量的代币从 `sender` 转移到 `recipient`。
     *
     * 这个内部函数等同于 {transfer}，可用于
     * 例如，实现自动代币费用、惩罚机制等。
     *
     * 触发一个 {Transfer} 事件。
     *
     * 要求：
     *
     * - `sender` 不能是零地址。
     * - `recipient` 不能是零地址。
     * - `sender` 必须拥有至少 `amount` 的余额。
     */
    function _transfer(address sender, address recipient, uint256 amount) internal virtual {
```

这个函数 `_transfer` 将代币从一个账户转移到另一个账户。 它由
`transfer`（用于从发送者自己的账户转移）和 `transferFrom`（用于使用授权额度
从其他人的账户转移）调用。

&nbsp;

```solidity
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");
```

实际上以太坊中没有人拥有零地址（即不存在对应公钥可以转换为零地址的私钥）。 当人们使用该地址时，通常是一个软件漏洞，所以
如果将零地址用作发送人或接收人，交易将失败。

&nbsp;

```solidity
        _beforeTokenTransfer(sender, recipient, amount);

```

使用该合约有两种方法：

1. 将其用作你自己的代码的模板
2. [继承它](https://www.bitdegree.org/learn/solidity-inheritance)，并仅覆盖你需要修改的那些函数

第二种方法要好得多，因为 OpenZeppelin ERC-20 代码已经过审核，其安全性也已得到证实。 当你使用继承时，
你可以清楚地表明你修改了哪些函数，而信任你的合约的人只需要审核那些特定的函数。

代币每次易手时，执行一个函数通常很有用。 然而，`_transfer` 是一个非常重要的函数，
编写它可能会不安全（见下文），所以最好不要覆盖它。 解决方案是 `_beforeTokenTransfer`，一个
[钩子函数](https://wikipedia.org/wiki/Hooking)。 你可以覆盖此函数，每次转移都会调用它。

&nbsp;

```solidity
        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
```

这些是实际执行转移的代码。 请注意，它们之间**没有任何东西**，并且我们在将转账金额加到接收人账户之前，先从发送人账户中扣除
。 这很重要，因为如果
中间调用了另一个合约，可能会被用来骗过这个合约。 这样，转移
是原子性的，中间不会发生任何事情。

&nbsp;

```solidity
        emit Transfer(sender, recipient, amount);
    }
```

最后，触发一个 `Transfer` 事件。 智能合约无法访问事件，但区块链外运行的代码
可以监听事件并对其作出反应。 例如，钱包可以跟踪所有者何时获得更多代币。

#### _mint 和 _burn 函数 {#_mint-and-_burn}

这两个函数（`_mint` 和 `_burn`）修改代币的总供应量。
它们是内部函数，在此合约中没有调用它们的函数，
因此，仅当你继承该合约并添加自己的
逻辑来决定在何种条件下铸造新代币或销毁现有
代币时，它们才有用。

\*\*注意：\*\*每个 ERC-20 代币都有自己的业务逻辑来决定代币管理。
例如，一个固定供应量的合约可能只在构造函数中调用 `_mint`
，而从不调用 `_burn`。 一个销售代币的合约
将在收到付款时调用 `_mint`，并大概在某个时间点调用 `_burn`，
以避免失控的通货膨胀。

```solidity
    /** @dev 创建 `amount` 数量的代币并将其分配给 `account`，增加
     * 总供应量。
     *
     * 触发一个 {Transfer} 事件，其中 `from` 设置为零地址。
     *
     * 要求：
     *
     * - `to` 不能是零地址。
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

```solidity
    /**
     * @dev 从 `account` 销毁 `amount` 数量的代币，减少
     * 总供应量。
     *
     * 触发一个 {Transfer} 事件，其中 `to` 设置为零地址。
     *
     * 要求：
     *
     * - `account` 不能是零地址。
     * - `account` 必须拥有至少 `amount` 的代币。
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

#### _approve 函数 {#_approve}

这是实际指定授权额度的函数。 请注意，它允许所有者指定
一个高于所有者当前余额的授权额度。 这是可以的，因为余额在
转移时会进行检查，届时余额可能不同于创建授权额度时的
余额。

```solidity
    /**
     * @dev 将 `spender` 对 `owner` 代币的授权额度设置为 `amount`。
     *
     * 此内部函数等同于 `approve`，可用于
     * 例如，为某些子系统设置自动授权额度等。
     *
     * 触发一个 {Approval} 事件。
     *
     * 要求：
     *
     * - `owner` 不能是零地址。
     * - `spender` 不能是零地址。
     */
    function _approve(address owner, address spender, uint256 amount) internal virtual {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
```

&nbsp;

触发一个 `Approval` 事件。 根据应用程序的编写方式，
花费者合约可以从所有者或监听这些事件的服务器获知批准结果。

```solidity
        emit Approval(owner, spender, amount);
    }

```

### 修改 Decimals 变量 {#modify-the-decimals-variable}

```solidity


    /**
     * @dev 将 {decimals} 设置为不同于默认值 18 的值。
     *
     * 警告：此函数应仅从构造函数中调用。大多数
     * 与代币合约交互的应用程序不希望
     * {decimals} 发生变化，如果发生变化可能会导致工作不正常。
     */
    function _setupDecimals(uint8 decimals_) internal {
        _decimals = decimals_;
    }
```

此函数修改 `_decimals` 变量，该变量用于告知用户界面如何解释金额。
你应该从构造函数中调用它。 在之后的任何时候调用都是不诚实的，
应用程序也并非设计用于处理这种情况。

### 钩子 {#hooks}

```solidity

    /**
     * @dev 在任何代币转移之前调用的钩子函数。这包括
     * 铸造和销毁。
     *
     * 调用条件：
     *
     * - 当 `from` 和 `to` 都非零时，`amount` 数量的 ``from`` 代币
     * 将被转移到 `to`。
     * - 当 `from` 为零时，将为 `to` 铸造 `amount` 数量的代币。
     * - 当 `to` 为零时，将销毁 `amount` 数量的 ``from`` 代币。
     * - `from` 和 `to` 永远不会都为零。
     *
     * 要了解有关钩子函数的更多信息，请转到 xref:ROOT:extending-contracts.adoc#using-hooks[使用钩子函数]。
     */
    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual { }
}
```

这是在转移过程中要调用的钩子函数。 这里是空的，但如果你需要
它做一些事情，只需覆盖它即可。

## 结论 {#conclusion}

为了复习，以下是此合约中一些最重要的思想（在我看来，你的可能有所不同）：

- _区块链上没有秘密_。 智能合约可以访问的任何信息
  都对全世界可见。
- 你可以控制自己交易的顺序，但不能控制其他人交易发生的时间。 这就是为什么更改授权额度可能很危险，因为它让
  花费者可以花费两个授权额度的总和。
- `uint256` 类型的值会环绕。 换言之，_0-1=2^256-1_。 如果这不是期望的
  行为，你必须检查它（或使用为你执行此操作的 SafeMath 库）。 请注意，这在
  [Solidity 0.8.0](https://docs.soliditylang.org/en/breaking/080-breaking-changes.html) 中已更改。
- 在特定位置执行特定类型的所有状态更改，因为这使审计更容易。
  这就是为什么我们有 `_approve`，它由 `approve`、`transferFrom`、
  `increaseAllowance` 和 `decreaseAllowance` 调用
- 状态更改应是原子性的，中间没有任何其他操作（如你在 `_transfer` 中看到的
  ）。 这是因为在状态更改期间，你处于不一致的状态。 例如，
  在你从发送者的余额中扣除和添加到接收者的余额之间的
  时间里，存在的代币比应有的要少。 如果它们之间
  有操作，特别是调用另一个合约，这可能会被滥用。

现在你已经了解了 OpenZeppelin ERC-20 合约是如何编写的，
尤其是如何使其更加安全，你可以去编写自己的安全合约和应用程序了。

[点击此处查看我的更多作品](https://cryptodocguy.pro/)。
