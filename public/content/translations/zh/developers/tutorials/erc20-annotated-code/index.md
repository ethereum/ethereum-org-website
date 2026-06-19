---
title: "ERC-20 合约详解"
description: "欧本齐柏林 ERC-20 合约中包含什么内容，为什么会包含这些内容？"
author: "奥里·波梅兰茨"
lang: zh
tags: ["Solidity", "erc-20"]
skill: beginner
breadcrumb: "ERC-20 详解"
published: 2021-03-09
---

## 简介 {#introduction}

以太坊最常见的用途之一是让一个群体创建可交易的代币，在某种意义上就是他们自己的货币。这些代币通常遵循一个标准，即 [ERC-20](/developers/docs/standards/tokens/erc-20/)。该标准使得编写能够与所有 ERC-20 代币配合使用的工具（如流动性池和钱包）成为可能。在本文中，我们将分析 [欧本齐柏林 Solidity ERC20 实现](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)，以及[接口定义](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol)。

这是带有注释的源代码。如果你想实现 ERC-20，请[阅读本教程](https://docs.openzeppelin.com/contracts/2.x/erc20-supply)。

## 接口 {#the-interface}

像 ERC-20 这样的标准的目的是允许多种代币实现在不同应用（如钱包和去中心化交易所）之间可互操作。为了实现这一点，我们创建了一个[接口](https://www.geeksforgeeks.org/solidity/solidity-basics-of-interface/)。任何需要使用代币合约的代码都可以使用接口中相同的定义，并与所有使用该接口的代币合约兼容，无论是像梅塔马斯克这样的钱包、像 etherscan.io 这样的去中心化应用 (dapp)，还是像流动性池这样的其他合约。

![Illustration of the ERC-20 interface](erc20_interface.png)

如果你是一位经验丰富的程序员，你可能记得在 [Java](https://www.w3schools.com/java/java_interface.asp) 甚至 [C 语言头文件](https://gcc.gnu.org/onlinedocs/cpp/Header-Files.html)中看到过类似的结构。

这是欧本齐柏林提供的 [ERC-20 接口](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol)定义。它是将[人类可读的标准](https://eips.ethereum.org/EIPS/eip-20)翻译成 Solidity 代码的结果。当然，接口本身并不定义*如何*执行任何操作。这将在下面的合约源代码中解释。

&nbsp;

```solidity
// SPDX-License-Identifier: MIT
```

Solidity 文件应该包含一个许可证标识符。[你可以在这里查看许可证列表](https://spdx.org/licenses/)。如果你需要不同的许可证，只需在注释中说明即可。

&nbsp;

```solidity
pragma solidity >=0.6.0 <0.8.0;
```

Solidity 语言仍在快速发展，新版本可能与旧代码不兼容（[见此处](https://docs.soliditylang.org/en/v0.7.0/070-breaking-changes.html)）。因此，最好不仅指定语言的最低版本，还要指定最高版本，即你测试代码时使用的最新版本。

&nbsp;

```solidity
/**
 * @dev EIP中定义的ERC-20标准接口。
 */
```

注释中的 `@dev` 是 [NatSpec 格式](https://docs.soliditylang.org/en/develop/natspec-format.html)的一部分，用于从源代码生成文档。

&nbsp;

```solidity
interface IERC20 {
```

按照惯例，接口名称以 `I` 开头。

&nbsp;

```solidity
    /**
     * @dev 返回已存在的代币数量。
     */
    function totalSupply() external view returns (uint256);
```

此函数是 `external`，意味着[它只能从合约外部调用](https://docs.soliditylang.org/en/v0.7.0/cheatsheet.html#index-2)。
它返回合约中代币的总供应量。此值使用以太坊中最常见的类型（无符号 256 位）返回（256 位是 EVM 的原生字长）。此函数也是一个 `view`，这意味着它不会改变状态，因此它可以在单个节点上执行，而无需区块链中的每个节点都运行它。这种函数不会生成交易，也不消耗 [Gas](/developers/docs/gas/)。

**注意：** 理论上，合约的创建者似乎可以通过返回比实际值更小的总供应量来作弊，使每个代币看起来比实际更有价值。然而，这种担忧忽略了区块链的真实本质。区块链上发生的一切都可以被每个节点验证。为了实现这一点，每个合约的机器语言代码和存储在每个节点上都是可用的。虽然你不必发布合约的 Solidity 代码，但除非你发布源代码以及编译它所用的 Solidity 版本，以便可以根据你提供的机器语言代码进行验证，否则没有人会认真对待你。
例如，请参阅[此合约](https://eth.blockscout.com/address/0xa530F85085C6FE2f866E7FdB716849714a89f4CD?tab=contract)。

&nbsp;

```solidity
    /**
     * @dev 返回`account`拥有的代币数量。
     */
    function balanceOf(address account) external view returns (uint256);
```

顾名思义，`balanceOf` 返回账户的余额。在 Solidity 中，以太坊账户使用 `address` 类型进行标识，该类型占用 160 位。
它也是 `external` 和 `view`。

&nbsp;

```solidity
    /**
     * @dev 将`amount`数量的代币从调用者的账户转账到`recipient`。
     *
     * 返回一个布尔值，指示操作是否成功。
     *
     * 触发{Transfer}事件。
     */
    function transfer(address recipient, uint256 amount) external returns (bool);
```

`transfer` 函数将代币从调用者转账到不同的地址。这涉及状态的改变，因此它不是 `view`。
当用户调用此函数时，它会创建一笔交易并消耗 Gas。它还会触发一个事件 `Transfer`，以通知区块链上的所有人该事件的发生。

该函数为两种不同类型的调用者提供两种类型的输出：

- 直接从用户界面调用该函数的用户。通常，用户提交交易后不会等待响应，因为这可能需要无限长的时间。用户可以通过查找交易收据（由交易哈希标识）或查找 `Transfer` 事件来查看发生了什么。
- 其他合约，它们作为整体交易的一部分调用该函数。这些合约会立即获得结果，因为它们在同一笔交易中运行，因此它们可以使用函数的返回值。

其他改变合约状态的函数也会产生相同类型的输出。

&nbsp;

授权额度允许一个账户花费属于不同所有者的一些代币。
例如，这对于充当卖方的合约非常有用。合约无法监控事件，因此如果买方直接将代币转账给卖方合约，该合约将不知道自己已收到付款。相反，买方允许卖方合约花费一定金额，然后卖方转账该金额。
这是通过卖方合约调用的函数完成的，因此卖方合约可以知道它是否成功。

```solidity
    /**
     * @dev 返回`spender`将被允许通过{transferFrom}代表`owner`花费的剩余代币数量。默认值为零。
     *
     * 当调用{approve}或{transferFrom}时，此值会发生变化。
     */
    function allowance(address owner, address spender) external view returns (uint256);
```

`allowance` 函数允许任何人查询一个地址（`owner`）允许另一个地址（`spender`）花费的授权额度是多少。

&nbsp;

```solidity
    /**
     * @dev 将`amount`设置为`spender`对调用者代币的授权额度。
     *
     * 返回一个布尔值，指示操作是否成功。
     *
     * 重要提示：请注意，使用此方法更改授权额度会带来风险，即由于不幸的交易顺序，某人可能会同时使用旧的和新的授权额度。缓解这种竞争条件的一种可能解决方案是首先将花费者的授权额度降至0，然后再设置所需的值：
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * 触发{Approval}事件。
     */
    function approve(address spender, uint256 amount) external returns (bool);
```

`approve` 函数创建一个授权额度。请务必阅读有关它如何被滥用的消息。在以太坊中，你可以控制自己交易的顺序，但你无法控制其他人交易的执行顺序，除非你等到看到对方的交易发生后才提交自己的交易。

&nbsp;

```solidity
    /**
     * @dev 使用授权额度机制将`amount`数量的代币从`sender`转账到`recipient`。然后从调用者的授权额度中扣除`amount`。
     *
     * 返回一个布尔值，指示操作是否成功。
     *
     * 触发{Transfer}事件。
     */
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

最后，`transferFrom` 被花费者用来实际花费授权额度。

&nbsp;

```solidity

    /**
     * @dev 当`value`数量的代币从一个账户（`from`）转账到另一个账户（`to`）时触发。
     *
     * 请注意，`value`可能为零。
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev 当通过调用{approve}设置`spender`对`owner`的授权额度时触发。`value`是新的授权额度。
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);
}
```

当 ERC-20 合约的状态发生变化时，会触发这些事件。

## 实际合约 {#the-actual-contract}

这是实现 ERC-20 标准的实际合约，[取自此处](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)。
它并不打算按原样使用，但你可以从中[继承](https://www.tutorialspoint.com/solidity/solidity_inheritance.htm)以将其扩展为可用的内容。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
```

&nbsp;

### 导入语句 {#import-statements}

除了上面的接口定义之外，合约定义还导入了另外两个文件：

```solidity

import "../../GSN/Context.sol";
import "./IERC20.sol";
import "../../math/SafeMath.sol";
```

- `GSN/Context.sol` 是使用 [OpenGSN](https://www.opengsn.org/) 所需的定义，该系统允许没有以太币的用户使用区块链。请注意，这是一个旧版本，如果你想与 OpenGSN 集成，请[使用本教程](https://docs.opengsn.org/javascript-client/tutorial.html)。
- [SafeMath 库](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/)，它可防止 Solidity 版本 **&lt;0.8.0** 发生算术溢出/下溢。在 Solidity ≥0.8.0 中，算术运算在溢出/下溢时会自动回退，因此不再需要 SafeMath。此合约使用 SafeMath 是为了向后兼容旧的编译器版本。

&nbsp;

此注释解释了合约的目的。

```solidity
/**
 * @dev {IERC20}接口的实现。
 *
 * 此实现与代币的创建方式无关。这意味着必须在派生合约中使用{_mint}添加供应机制。
 * 有关通用机制，请参见{ERC20PresetMinterPauser}。
 *
 * 提示：有关详细说明，请参见我们的指南
 * https://forum.zeppelin.solutions/t/how-to-implement-erc20-supply-mechanisms/226[如何实现供应机制]。
 *
 * 我们遵循了通用的欧本齐柏林指南：函数在失败时回退（revert）而不是返回`false`。尽管如此，这种行为是常规的，并且不与ERC-20应用程序的期望冲突。
 *
 * 此外，在调用{transferFrom}时会触发{Approval}事件。
 * 这允许应用程序仅通过监听所述事件来重建所有账户的授权额度。EIP的其他实现可能不会触发这些事件，因为规范并未要求。
 *
 * 最后，添加了非标准的{decreaseAllowance}和{increaseAllowance}函数，以缓解围绕设置授权额度的众所周知的问题。请参见{IERC20-approve}。
 */

```

### 合约定义 {#contract-definition}

```solidity
contract ERC20 is Context, IERC20 {
```

此行指定了继承，在本例中继承自上面的 `IERC20` 和用于 OpenGSN 的 `Context`。

&nbsp;

```solidity

    using SafeMath for uint256;

```

此行将 `SafeMath` 库附加到 `uint256` 类型。你可以在[此处](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol)找到此库。

### 变量定义 {#variable-definitions}

这些定义指定了合约的状态变量。这些变量被声明为 `private`，但这仅仅意味着区块链上的其他合约无法读取它们。*区块链上没有秘密*，每个节点上的软件都拥有每个区块中每个合约的状态。按照惯例，状态变量被命名为 `_<something>`。

前两个变量是[映射](https://www.tutorialspoint.com/solidity/solidity_mappings.htm)，这意味着它们的行为与[关联数组](https://wikipedia.org/wiki/Associative_array)大致相同，只是键是数值。仅为值不同于默认值（零）的条目分配存储空间。

```solidity
    mapping (address => uint256) private _balances;
```

第一个映射 `_balances` 是地址及其各自的该代币余额。要访问余额，请使用此语法：`_balances[<address>]`。

&nbsp;

```solidity
    mapping (address => mapping (address => uint256)) private _allowances;
```

此变量 `_allowances` 存储前面解释的授权额度。第一个索引是代币的所有者，第二个是拥有授权额度的合约。要访问地址 A 可以从地址 B 的账户中花费的金额，请使用 `_allowances[B][A]`。

&nbsp;

```solidity
    uint256 private _totalSupply;
```

顾名思义，此变量跟踪代币的总供应量。

&nbsp;

```solidity
    string private _name;
    string private _symbol;
    uint8 private _decimals;
```

这三个变量用于提高可读性。前两个不言自明，但 `_decimals` 不是。

一方面，以太坊没有浮点数或小数变量。另一方面，人类喜欢能够分割代币。人们选择黄金作为货币的原因之一是，当有人想买一只鸭子价值的牛时，很难找零。

解决方案是跟踪整数，但计算的不是真实的代币，而是几乎毫无价值的代币分数单位。以以太币为例，分数单位称为 Wei，10^18 Wei 等于 1 ETH。在撰写本文时，10,000,000,000,000 Wei 约等于一美分或一欧分。

应用程序需要知道如何显示代币余额。如果用户有 3,141,000,000,000,000,000 Wei，那是 3.14 ETH 吗？31.41 ETH？3,141 ETH？在以太币的情况下，定义为 10^18 Wei 等于 1 ETH，但对于你的代币，你可以选择不同的值。如果分割代币没有意义，你可以使用 `_decimals` 值为零。如果你想使用与 ETH 相同的标准，请使用值 **18**。

### 构造函数 {#the-constructor}

```solidity
    /**
     * @dev 设置{name}和{symbol}的值，使用默认值18初始化{decimals}。
     *
     * 要为{decimals}选择不同的值，请使用{_setupDecimals}。
     *
     * 这三个值都是不可变的：它们只能在构造期间设置一次。
     */
    constructor (string memory name_, string memory symbol_) public {
        // 在Solidity ≥0.7.0中，'public'是隐式的，可以省略。

        _name = name_;
        _symbol = symbol_;
        _decimals = 18;
    }
```

构造函数在首次创建合约时被调用。按照惯例，函数参数被命名为 `<something>_`。

### 用户界面函数 {#user-interface-functions}

```solidity
    /**
     * @dev 返回代币的名称。
     */
    function name() public view returns (string memory) {
        return _name;
    }

    /**
     * @dev 返回代币的符号，通常是名称的简写版本。
     */
    function symbol() public view returns (string memory) {
        return _symbol;
    }

    /**
     * @dev 返回用于获取其用户表示形式的小数位数。
     * 例如，如果`decimals`等于`2`，则`505`个代币的余额应向用户显示为`5,05`（`505 / 10 ** 2`）。
     *
     * 代币通常选择值为18，模仿以太币和Wei之间的关系。这是{ERC20}使用的值，除非调用了{_setupDecimals}。
     *
     * 注意：此信息仅用于_显示_目的：它绝不会影响合约的任何算术运算，包括{IERC20-balanceOf}和{IERC20-transfer}。
     */
    function decimals() public view returns (uint8) {
        return _decimals;
    }
```

这些函数 `name`、`symbol` 和 `decimals` 帮助用户界面了解你的合约，以便它们能够正确显示它。

返回类型是 `string memory`，意味着返回一个存储在内存中的字符串。变量（如字符串）可以存储在三个位置：

|          | 生命周期      | 合约访问权限 | Gas 成本                                                       |
| -------- | ------------- | --------------- | -------------------------------------------------------------- |
| 内存   | 函数调用 | 读/写      | 几十或几百（位置越高成本越高）                 |
| 调用数据 | 函数调用 | 只读       | 不能用作返回类型，只能用作函数参数类型 |
| 存储  | 直到被更改 | 读/写      | 高（读取 800，写入 20k）                             |

在这种情况下，`memory` 是最佳选择。

### 读取代币信息 {#read-token-information}

这些是提供有关代币信息的函数，无论是总供应量还是账户余额。

```solidity
    /**
     * @dev 参见{IERC20-totalSupply}。
     */
    function totalSupply() public view override returns (uint256) {
        return _totalSupply;
    }
```

`totalSupply` 函数返回代币的总供应量。

&nbsp;

```solidity
    /**
     * @dev 参见{IERC20-balanceOf}。
     */
    function balanceOf(address account) public view override returns (uint256) {
        return _balances[account];
    }
```

读取账户的余额。请注意，允许任何人获取任何其他人的账户余额。试图隐藏此信息毫无意义，因为它无论如何都在每个节点上可用。*区块链上没有秘密。*

### 转账代币 {#transfer-tokens}

```solidity
    /**
     * @dev 参见{IERC20-transfer}。
     *
     * 要求：
     *
     * - `recipient`不能是零地址。
     * - 调用者必须具有至少`amount`的余额。
     */
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
```

调用 `transfer` 函数将代币从发送者的账户转账到另一个账户。请注意，即使它返回一个布尔值，该值也始终为 **true**。如果转账失败，合约将回退调用。

&nbsp;

```solidity
        _transfer(_msgSender(), recipient, amount);
        return true;
    }
```

`_transfer` 函数执行实际工作。它是一个私有函数，只能由其他合约函数调用。按照惯例，私有函数被命名为 `_<something>`，与状态变量相同。

通常在 Solidity 中，我们使用 `msg.sender` 表示消息发送者。然而，这会破坏 [OpenGSN](https://opengsn.org/)。如果我们想允许使用我们的代币进行无以太币交易，我们需要使用 `_msgSender()`。对于普通交易，它返回 `msg.sender`，但对于无以太币交易，它返回原始签名者，而不是中继消息的合约。

### 授权额度函数 {#allowance-functions}

这些是实现授权额度功能的函数：`allowance`、`approve`、`transferFrom` 和 `_approve`。此外，欧本齐柏林实现超越了基本标准，包含了一些提高安全性的功能：`increaseAllowance` 和 `decreaseAllowance`。

#### allowance 函数 {#allowance}

```solidity
    /**
     * @dev 参见{IERC20-allowance}。
     */
    function allowance(address owner, address spender) public view virtual override returns (uint256) {
        return _allowances[owner][spender];
    }
```

`allowance` 函数允许所有人检查任何授权额度。

#### approve 函数 {#approve}

```solidity
    /**
     * @dev 参见{IERC20-approve}。
     *
     * 要求：
     *
     * - `spender`不能是零地址。
     */
    function approve(address spender, uint256 amount) public virtual override returns (bool) {
```

调用此函数以创建授权额度。它类似于上面的 `transfer` 函数：

- 该函数只是调用一个执行实际工作的内部函数（在本例中为 `_approve`）。
- 该函数要么返回 `true`（如果成功），要么回退（如果不成功）。

&nbsp;

```solidity
        _approve(_msgSender(), spender, amount);
        return true;
    }
```

我们使用内部函数来尽量减少状态发生变化的地方的数量。*任何*改变状态的函数都是潜在的安全风险，需要进行安全审计。这样我们出错的机会就更少了。

#### transferFrom 函数 {#transferfrom}

这是花费者调用以花费授权额度的函数。这需要两个操作：转账被花费的金额，并将授权额度减少该金额。

```solidity
    /**
     * @dev 参见{IERC20-transferFrom}。
     *
     * 触发一个{Approval}事件以指示更新后的授权额度。这不是EIP所要求的。请参见{ERC20}开头的注释。
     *
     * 要求：
     *
     * - `sender`和`recipient`不能是零地址。
     * - `sender`必须具有至少`amount`的余额。
     * - 调用者必须对``sender``的代币具有至少`amount`的授权额度。
     */
    function transferFrom(address sender, address recipient, uint256 amount) public virtual
                                                override returns (bool) {
        _transfer(sender, recipient, amount);
```

&nbsp;

`a.sub(b, "message")` 函数调用执行两项操作。首先，它计算 `a-b`，即新的授权额度。其次，它检查此结果是否为负数。如果为负数，则调用将使用提供的消息回退。请注意，当调用回退时，之前在该调用期间执行的任何处理都将被忽略，因此我们不需要撤消 `_transfer`。

```solidity
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount,
             "ERC20: transfer amount exceeds allowance"));
        return true;
    }
```

#### 欧本齐柏林安全附加功能 {#openzeppelin-safety-additions}

将非零授权额度设置为另一个非零值是危险的，因为你只能控制自己交易的顺序，而不能控制其他任何人的交易顺序。想象一下你有两个用户，天真的 Alice 和不诚实的 Bill。Alice 想要 Bill 提供一些服务，她认为这需要五个代币——所以她给了 Bill 五个代币的授权额度。

然后情况发生了变化，Bill 的价格上涨到了十个代币。仍然想要该服务的 Alice 发送了一笔交易，将 Bill 的授权额度设置为十。当 Bill 在交易池中看到这笔新交易时，他发送了一笔花费 Alice 五个代币的交易，并设置了更高的 Gas 价格，以便它能更快地被打包。这样，Bill 可以先花费五个代币，然后一旦 Alice 的新授权额度被打包，再花费十个代币，总共十五个代币，超过了 Alice 打算授权的数量。这种技术被称为[抢跑](https://consensysdiligence.github.io/smart-contract-best-practices/attacks/#front-running)。

| Alice 交易 | Alice 随机数 | Bill 交易              | Bill 随机数 | Bill 的授权额度 | Bill 从 Alice 获得的总收入 |
| ----------------- | ----------- | ----------------------------- | ---------- | ---------------- | ---------------------------- |
| approve(Bill, 5)  | 10          |                               |            | 5                | 0                            |
|                   |             | transferFrom(Alice, Bill, 5)  | 10,123     | 0                | 5                            |
| approve(Bill, 10) | 11          |                               |            | 10               | 5                            |
|                   |             | transferFrom(Alice, Bill, 10) | 10,124     | 0                | 15                           |

为了避免这个问题，这两个函数（`increaseAllowance` 和 `decreaseAllowance`）允许你按特定金额修改授权额度。因此，如果 Bill 已经花费了五个代币，他将只能再花费五个。根据时间的不同，这可以通过两种方式起作用，这两种方式最终都只会让 Bill 获得十个代币：

A：

| Alice 交易          | Alice 随机数 | Bill 交易             | Bill 随机数 | Bill 的授权额度 | Bill 从 Alice 获得的总收入 |
| -------------------------- | ----------: | ---------------------------- | ---------: | ---------------: | ---------------------------- |
| approve(Bill, 5)           |          10 |                              |            |                5 | 0                            |
|                            |             | transferFrom(Alice, Bill, 5) |     10,123 |                0 | 5                            |
| increaseAllowance(Bill, 5) |          11 |                              |            |          0+5 = 5 | 5                            |
|                            |             | transferFrom(Alice, Bill, 5) |     10,124 |                0 | 10                           |

B：

| Alice 交易          | Alice 随机数 | Bill 交易              | Bill 随机数 | Bill 的授权额度 | Bill 从 Alice 获得的总收入 |
| -------------------------- | ----------: | ----------------------------- | ---------: | ---------------: | ---------------------------: |
| approve(Bill, 5)           |          10 |                               |            |                5 |                            0 |
| increaseAllowance(Bill, 5) |          11 |                               |            |         5+5 = 10 |                            0 |
|                            |             | transferFrom(Alice, Bill, 10) |     10,124 |                0 |                           10 |

```solidity
    /**
     * @dev 原子性地增加调用者授予`spender`的授权额度。
     *
     * 这是{approve}的替代方案，可用作缓解{IERC20-approve}中描述的问题。
     *
     * 触发一个{Approval}事件以指示更新后的授权额度。
     *
     * 要求：
     *
     * - `spender`不能是零地址。
     */
    function increaseAllowance(address spender, uint256 addedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].add(addedValue));
        return true;
    }
```

`a.add(b)` 函数是一个安全的加法。在极少数情况下，如果 `a`+`b`>=`2^256`，它不会像普通加法那样发生回绕（溢出）。

```solidity

    /**
     * @dev 原子性地减少调用者授予`spender`的授权额度。
     *
     * 这是{approve}的替代方案，可用作缓解{IERC20-approve}中描述的问题。
     *
     * 触发一个{Approval}事件以指示更新后的授权额度。
     *
     * 要求：
     *
     * - `spender`不能是零地址。
     * - `spender`必须对调用者具有至少`subtractedValue`的授权额度。
     */
    function decreaseAllowance(address spender, uint256 subtractedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].sub(subtractedValue,
                "ERC20: decreased allowance below zero"));
        return true;
    }
```

### 修改代币信息的函数 {#functions-that-modify-token-information}

这是执行实际工作的四个函数：`_transfer`、`_mint`、`_burn` 和 `_approve`。

#### _transfer 函数 {#transfer}

```solidity
    /**
     * @dev 将`amount`数量的代币从`sender`转账到`recipient`。
     *
     * 这个内部函数等同于{transfer}，可用于例如实现自动代币费用、削减机制等。
     *
     * 触发{Transfer}事件。
     *
     * 要求：
     *
     * - `sender`不能是零地址。
     * - `recipient`不能是零地址。
     * - `sender`必须具有至少`amount`的余额。
     */
    function _transfer(address sender, address recipient, uint256 amount) internal virtual {
```

此函数 `_transfer` 将代币从一个账户转账到另一个账户。它由 `transfer`（用于从发送者自己的账户转账）和 `transferFrom`（用于使用授权额度从其他人的账户转账）调用。

&nbsp;

```solidity
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");
```

在以太坊中，实际上没有人拥有零地址（也就是说，没有人知道其匹配的公钥转换为零地址的私钥）。当人们使用该地址时，通常是软件错误——因此，如果将零地址用作发送者或接收者，我们将使操作失败。

&nbsp;

```solidity
        _beforeTokenTransfer(sender, recipient, amount);

```

有两种方法可以使用此合约：

1. 将其用作你自己代码的模板
1. [从中继承](https://www.bitdegree.org/learn/solidity-inheritance)，并仅覆盖你需要修改的那些函数

第二种方法要好得多，因为欧本齐柏林 ERC-20 代码已经过审计并被证明是安全的。当你使用继承时，你修改了哪些函数一目了然，为了信任你的合约，人们只需要审计那些特定的函数。

每次代币易手时执行一个函数通常很有用。然而，`_transfer` 是一个非常重要的函数，并且有可能写得不安全（见下文），因此最好不要覆盖它。解决方案是 `_beforeTokenTransfer`，一个[钩子函数](https://wikipedia.org/wiki/Hooking)。你可以覆盖此函数，它将在每次转账时被调用。

&nbsp;

```solidity
        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
```

这些是实际执行转账的代码行。请注意，它们之间**没有任何内容**，并且我们在将其添加到接收者之前从发送者中减去转账金额。这很重要，因为如果中间调用了不同的合约，它可能会被用来欺骗这个合约。这样转账是原子性的，中间不会发生任何事情。

&nbsp;

```solidity
        emit Transfer(sender, recipient, amount);
    }
```

最后，触发一个 `Transfer` 事件。智能合约无法访问事件，但在区块链外部运行的代码可以监听事件并对其做出反应。例如，钱包可以跟踪所有者何时获得更多代币。

#### _mint 和 _burn 函数 {#mint-and-burn}

这两个函数（`_mint` 和 `_burn`）修改代币的总供应量。它们是内部函数，并且此合约中没有调用它们的函数，因此只有当你从合约继承并添加自己的逻辑来决定在什么条件下铸造新代币或销毁现有代币时，它们才有用。

**注意：** 每个 ERC-20 代币都有自己的业务逻辑来决定代币管理。例如，固定供应合约可能只在构造函数中调用 `_mint`，而从不调用 `_burn`。出售代币的合约将在收到付款时调用 `_mint`，并可能在某个时候调用 `_burn` 以避免失控的通货膨胀。

```solidity
    /** @dev 创建`amount`数量的代币并将其分配给`account`，增加总供应量。
     *
     * 触发{Transfer}事件，其中`from`设置为零地址。
     *
     * 要求：
     *
     * - `to`不能是零地址。
     */
    function _mint(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: mint to the zero address");
        _beforeTokenTransfer(address(0), account, amount);
        _totalSupply = _totalSupply.add(amount);
        _balances[account] = _balances[account].add(amount);
        emit Transfer(address(0), account, amount);
    }
```

确保在代币总数发生变化时更新 `_totalSupply`。

&nbsp;

```solidity
    /**
     * @dev 从`account`销毁`amount`数量的代币，减少总供应量。
     *
     * 触发{Transfer}事件，其中`to`设置为零地址。
     *
     * 要求：
     *
     * - `account`不能是零地址。
     * - `account`必须具有至少`amount`个代币。
     */
    function _burn(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: burn from the zero address");

        _beforeTokenTransfer(account, address(0), amount);

        _balances[account] = _balances[account].sub(amount, "ERC20: burn amount exceeds balance");
        _totalSupply = _totalSupply.sub(amount);
        emit Transfer(account, address(0), amount);
    }
```

`_burn` 函数与 `_mint` 几乎相同，只是方向相反。

#### _approve 函数 {#approve-2}

这是实际指定授权额度的函数。请注意，它允许所有者指定高于所有者当前余额的授权额度。这是可以的，因为余额是在转账时检查的，此时的余额可能与创建授权额度时的余额不同。

```solidity
    /**
     * @dev 将`amount`设置为`spender`对`owner`代币的授权额度。
     *
     * 这个内部函数等同于`approve`，可用于例如为某些子系统设置自动授权额度等。
     *
     * 触发{Approval}事件。
     *
     * 要求：
     *
     * - `owner`不能是零地址。
     * - `spender`不能是零地址。
     */
    function _approve(address owner, address spender, uint256 amount) internal virtual {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
```

&nbsp;

触发一个 `Approval` 事件。根据应用程序的编写方式，可以通过所有者或监听这些事件的服务器将授权告知花费者合约。

```solidity
        emit Approval(owner, spender, amount);
    }

```

### 修改 Decimals 变量 {#modify-the-decimals-variable}

```solidity


    /**
     * @dev 将{decimals}设置为非默认值18的其他值。
     *
     * 警告：此函数只能从构造函数中调用。大多数与代币合约交互的应用程序不会期望{decimals}发生变化，如果发生变化可能会导致工作不正确。
     */
    function _setupDecimals(uint8 decimals_) internal {
        _decimals = decimals_;
    }
```

此函数修改 `_decimals` 变量，该变量用于告诉用户界面如何解释金额。你应该从构造函数中调用它。在随后的任何时候调用它都是不诚实的，并且应用程序并非设计为处理这种情况。

### 钩子 {#hooks}

```solidity

    /**
     * @dev 在任何代币转账之前调用的钩子（Hook）。这包括铸造和销毁。
     *
     * 调用条件：
     *
     * - 当`from`和`to`都不为零时，``from``的`amount`数量的代币将被转账到`to`。
     * - 当`from`为零时，将为`to`铸造`amount`数量的代币。
     * - 当`to`为零时，``from``的`amount`数量的代币将被销毁。
     * - `from`和`to`永远不会同时为零。
     *
     * 要了解有关钩子的更多信息，请前往xref:ROOT:extending-contracts.adoc#using-hooks[使用钩子]。
     */
    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual { }
}
```

这是在转账期间调用的钩子函数。它在这里是空的，但如果你需要它做一些事情，你只需覆盖它即可。

## 结论 {#conclusion}

作为回顾，以下是本合约中一些最重要的想法（在我看来，你的想法可能会有所不同）：

- *区块链上没有秘密*。智能合约可以访问的任何信息对全世界都是可用的。
- 你可以控制自己交易的顺序，但不能控制其他人的交易何时发生。这就是为什么更改授权额度可能很危险的原因，因为它允许花费者花费两个授权额度的总和。
- `uint256` 类型的值会发生回绕。换句话说，*0-1=2^256-1*。如果这不是期望的行为，你必须检查它（或使用为你执行此操作的 SafeMath 库）。请注意，这在 [Solidity 0.8.0](https://docs.soliditylang.org/en/breaking/080-breaking-changes.html) 中发生了变化。
- 在特定位置执行特定类型的所有状态更改，因为这使审计更容易。这就是为什么我们有例如 `_approve` 的原因，它由 `approve`、`transferFrom`、`increaseAllowance` 和 `decreaseAllowance` 调用。
- 状态更改应该是原子性的，中间没有任何其他操作（正如你在 `_transfer` 中看到的那样）。这是因为在状态更改期间，你处于不一致的状态。例如，在从发送者的余额中扣除和添加到接收者的余额之间，存在的代币少于应有的数量。如果它们之间有操作，特别是调用不同的合约，这可能会被滥用。

既然你已经了解了欧本齐柏林 ERC-20 合约是如何编写的，特别是它是如何变得更安全的，那就去编写你自己的安全合约和应用程序吧。

[点击此处查看我的更多作品](https://cryptodocguy.pro/)。