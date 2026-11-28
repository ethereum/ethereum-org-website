---
title: "带有安全护栏的 ERC-20"
description: "如何帮助人们避免犯低级错误"
author: "奥里·波梅兰茨"
lang: zh
tags: ["erc-20"]
skill: beginner
breadcrumb: "ERC-20 安全"
published: 2022-08-15
---

## 简介 {#introduction}

以太坊的一大优点是没有中央机构可以修改或撤销你的交易。而以太坊的一大问题也是没有中央机构有权撤销用户的错误或非法交易。在本文中，你将了解用户在使用 [ERC-20](/developers/docs/standards/tokens/erc-20/) 代币时常犯的一些错误，以及如何创建 ERC-20 合约来帮助用户避免这些错误，或者赋予中央机构一些权力（例如冻结账户）。

请注意，虽然我们将使用 [OpenZeppelin ERC-20 代币合约](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20)，但本文不会对其进行详细解释。你可以在[此处](/developers/tutorials/erc20-annotated-code)找到相关信息。

如果你想查看完整的源代码：

1. 打开 [Remix IDE](https://remix.ethereum.org/)。
2. 点击克隆 GitHub 图标 (![clone github icon](icon-clone.png))。
3. 克隆 GitHub 仓库 `https://github.com/qbzzt/20220815-erc20-safety-rails`。
4. 打开 **contracts > erc20-safety-rails.sol**。

请注意，该仓库是为 OpenZeppelin Contracts 4.7.2 编写的，在那个版本中，本文重写的函数名为 `_beforeTokenTransfer`。本文使用的是当前的 OpenZeppelin Contracts 5.x，你需要重写的是 `_update`，因此本文中的代码与仓库中的代码略有不同。

## 创建 ERC-20 合约 {#creating-an-erc-20-contract}

在添加安全护栏功能之前，我们需要一个 ERC-20 合约。在本文中，我们将使用 [OpenZeppelin Contracts Wizard](https://docs.openzeppelin.com/contracts/5.x/wizard)。在另一个浏览器中打开它并按照以下说明操作：

1. 选择 **ERC20**。
2. 输入以下设置：

   | 参数 | 值 |
   | -------------- | ------------------------- |
   | Name | SafetyRailsToken |
   | Symbol | SAFE |
   | Premint | 1000 |
   | Features | None（取消勾选 **Permit**） |
   | Access Control | Ownable |
   | Upgradability | None |

3. 向上滚动并点击 **Open in Remix**（如果使用 Remix）或 **Download** 以使用其他环境。我假设你使用的是 Remix，如果你使用其他环境，只需进行相应的更改即可。
4. 我们现在有了一个功能齐全的 ERC-20 合约。你可以展开 `.deps` > `npm` 来查看导入的代码。
5. 编译、部署并试用该合约，看看它是否能作为 ERC-20 合约正常运行。如果你需要学习如何使用 Remix，请[参考本教程](https://remix.ethereum.org/?#activate=udapp,solidity,LearnEth)。

## 常见错误 {#common-mistakes}

### 错误类型 {#the-mistakes}

用户有时会将代币发送到错误的地址。虽然我们无法读懂他们的心思来知道他们到底想做什么，但有两种错误类型经常发生且很容易检测到：

1. 将代币发送到合约自身的地址。例如，[Optimism 的 OP 代币](https://optimism.mirror.xyz/qvd0WfuLKnePm1Gxb9dpGchPf5uDz5NSMEFdgirDS4c)在不到两个月的时间里就积累了[超过 120,000 个](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000042) OP 代币。这代表了一笔巨大的财富，大概率是人们白白损失掉的。

2. 将代币发送到一个空地址，即不对应于[外部拥有账户 (EOA)](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs) 或[智能合约](/developers/docs/smart-contracts)的地址。虽然我没有关于这种情况发生频率的统计数据，但[一次事件就可能损失 20,000,000 个代币](https://gov.optimism.io/t/message-to-optimism-community-from-wintermute/2595)。

### 阻止转账 {#preventing-transfers}

在 OpenZeppelin ERC-20 合约中，余额的每一次变化，无论是转账、铸造还是销毁，都会经过[一个内部函数 `_update`](https://docs.openzeppelin.com/contracts/5.x/api/token/erc20#ERC20-_update-address-address-uint256-)。我们可以重写它，将我们自己的功能挂载到它上面，例如在出现问题时回退的检查。

为此，请在构造函数之后添加此函数：

```solidity
    function _update(address from, address to, uint256 value)
        internal virtual
        override(ERC20)
    {
        super._update(from, to, value);
    }
```

如果你对 Solidity 不是很熟悉，这个函数的某些部分可能是新的：

```solidity
        internal virtual
```

`virtual` 关键字意味着，就像我们从 `ERC20` 继承功能并重写此函数一样，其他合约也可以从我们这里继承并重写此函数。

```solidity
        override(ERC20)
```

我们必须明确指定我们正在[重写](https://docs.soliditylang.org/en/latest/contracts.html#function-overriding) ERC20 代币对 `_update` 的定义。一般来说，从安全角度来看，显式定义比隐式定义要好得多——如果它就在你面前，你就不会忘记你做过什么。这也是我们需要指定我们要重写哪个超类的 `_update` 的原因。

```solidity
        super._update(from, to, value);
```

此行调用我们继承的、具有该函数的合约的 `_update` 函数。在这种情况下，只有 `ERC20`，`Ownable` 没有此函数。与空钩子不同，`ERC20._update` 是实际移动代币的函数，因此调用它是必不可少的。我们的检查在此调用之前进行，因此它们可以在任何余额更改之前回退。

### 编写需求代码 {#coding-the-requirements}

我们希望将这些要求添加到函数中。因为在销毁代币时也会调用 `_update`，此时 `to` 设置为 `address(0)`，所以我们仅在 `to` 不为 `address(0)` 时才检查它：

- `to` 地址不能等于 `address(this)`，即 ERC-20 合约本身的地址。
- `to` 地址不能为空，它必须是以下之一：
  - 外部拥有账户 (EOA)。我们无法直接检查地址是否为外部拥有账户 (EOA)，但我们可以检查地址的 ETH 余额。外部拥有账户 (EOA) 几乎总是有余额，即使它们不再被使用——很难将它们清空到最后一 Wei。
  - 智能合约。测试地址是否为智能合约要困难一些。有一个操作码可以检查外部代码长度，称为 [`EXTCODESIZE`](https://www.evm.codes/#3b)。在 Solidity 中，你可以使用 [`<address>.code.length`](https://docs.soliditylang.org/en/latest/units-and-global-variables.html#members-of-address-types) 获取它，编译器会将其转换为 `EXTCODESIZE`。在这里，我们使用 [Yul](https://docs.soliditylang.org/en/latest/yul.html)（即 EVM 汇编）来展示如何直接调用该操作码。请注意，自 [EIP-7702](https://eips.ethereum.org/EIPS/eip-7702) 以来，外部拥有账户 (EOA) 也可以拥有代码（对合约的委托），因此此检查识别的是带有代码的账户，而不仅仅是合约。对于我们拒绝空地址的目的来说，这已经足够了。

这是完整的函数：

```solidity
    function _update(address from, address to, uint256 value)
        internal virtual
        override(ERC20)
    {
        // 销毁会将代币发送到地址(0)，不要阻止它
        if (to != address(0)) {
            require(to != address(this), "Can't send tokens to the contract address");

            bool isToContract;
            assembly {
               isToContract := gt(extcodesize(to), 0)
            }

            require(to.balance != 0 || isToContract, "Can't send tokens to an empty address");
        }

        super._update(from, to, value);
    }
```

让我们逐行查看新代码：

```solidity
        require(to != address(this), "Can't send tokens to the contract address");
```

这是第一个要求，检查 `to` 和 `this(address)` 是否不相同。

```solidity
        bool isToContract;
        assembly {
           isToContract := gt(extcodesize(to), 0)
        }
```

这就是我们检查地址是否为合约的方法。我们无法直接从 Yul 接收输出，因此我们定义了一个变量来保存结果（在本例中为 `isToContract`）。Yul 的工作方式是将每个操作码视为一个函数。因此，我们首先调用 [`EXTCODESIZE`](https://www.evm.codes/#3b) 来获取合约大小，然后使用 [`GT`](https://www.evm.codes/#11) 检查它是否不为零（我们处理的是无符号整数，所以它当然不能为负数）。然后我们将结果写入 `isToContract`。

```solidity
        require(to.balance != 0 || isToContract, "Can't send tokens to an empty address");
```

最后，我们对空地址进行实际检查。

## 管理员访问权限 {#admin-access}

有时，拥有一个可以撤销错误的管理员是很有用的。为了减少滥用的可能性，该管理员可以是一个[多重签名](https://blog.logrocket.com/security-choices-multi-signature-wallets/)，这样就需要多个人同意才能执行某项操作。在本文中，我们将实现两个管理功能：

1. 冻结和解冻账户。例如，当账户可能被盗用时，这会很有用。
2. 资产清理。

   有时，欺诈者会将欺诈性代币发送到真实代币的合约中以获取合法性。例如，请[看这里](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe?tab=holders)。合法的 ERC-20 合约是 [0x4200....0042](https://optimism.blockscout.com/token/0x4200000000000000000000000000000000000042)。伪装成它的骗局合约是 [0x234....bbe](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe)。

   人们也有可能错误地将合法的 ERC-20 代币发送到我们的合约中，这也是我们希望有办法将它们取出的另一个原因。

欧本齐柏林提供了两种机制来启用管理员访问权限：

- [`Ownable`](https://docs.openzeppelin.com/contracts/5.x/access-control#ownership-and-ownable) 合约拥有单一所有者。带有 `onlyOwner` [修饰符](https://docs.soliditylang.org/en/latest/contracts.html#function-modifiers)的函数只能由该所有者调用。所有者可以将所有权转移给其他人或完全放弃所有权。所有其他账户的权利通常是相同的。
- [`AccessControl`](https://docs.openzeppelin.com/contracts/5.x/access-control#role-based-access-control) 合约具有[基于角色的访问控制 (RBAC)](https://en.wikipedia.org/wiki/Role-based_access_control)。

为了简单起见，在本文中我们使用 `Ownable`。

### 冻结和解冻合约 {#freezing-and-thawing-contracts}

冻结和解冻合约需要进行几项更改：

- 一个从地址到[布尔值](https://en.wikipedia.org/wiki/Boolean_data_type)的[映射](https://docs.soliditylang.org/en/latest/types.html#mapping-types)，用于跟踪哪些地址被冻结。所有值最初都为零，对于布尔值来说，这被解释为 false。这正是我们想要的，因为默认情况下账户是不被冻结的。

  ```solidity
      mapping(address => bool) public frozenAccounts;
  ```

- [事件](https://docs.soliditylang.org/en/latest/contracts.html#events)，用于在账户被冻结或解冻时通知任何感兴趣的人。从技术上讲，这些操作不需要事件，但它有助于链下代码能够监听这些事件并了解正在发生的事情。当发生可能与其他人相关的事情时，智能合约触发事件被认为是一种良好的做法。

  这些事件被索引，因此可以搜索账户被冻结或解冻的所有时间。

  ```solidity
    // 当账户被冻结或解冻时
    event AccountFrozen(address indexed _addr);
    event AccountThawed(address indexed _addr);
  ```

- 用于冻结和解冻账户的函数。这两个函数几乎相同，因此我们只讨论冻结函数。

  ```solidity
      function freezeAccount(address addr)
        public
        onlyOwner
  ```

  标记为 [`public`](https://docs.soliditylang.org/en/latest/contracts.html#function-visibility) 的函数可以从其他智能合约调用，也可以由交易直接调用。

  ```solidity
    {
        require(!frozenAccounts[addr], "Account already frozen");
        frozenAccounts[addr] = true;
        emit AccountFrozen(addr);
    }  // freezeAccount
  ```

  如果账户已被冻结，则回退。否则，冻结它并 `emit` 一个事件。

- 更改 `_update` 以防止资金从冻结账户中移出。请注意，资金仍然可以转账到冻结账户中。将此行放在函数的开头，在 `if` 块之外，这样它也可以防止从冻结账户中销毁代币。

  ```solidity
       require(!frozenAccounts[from], "The account is frozen");
  ```

### 资产清理 {#asset-cleanup}

要释放此合约持有的 ERC-20 代币，我们需要调用它们所属的代币合约上的函数，即 [`transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer) 或 [`approve`](https://eips.ethereum.org/EIPS/eip-20#approve)。在这种情况下，没有必要在配额上浪费 Gas，我们不如直接转账。

```solidity
    function cleanupERC20(
        address erc20,
        address dest
    )
        public
        onlyOwner
    {
        IERC20 token = IERC20(erc20);
```

这是在收到地址时为合约创建对象的语法。要使用它，我们需要 [IERC20 的定义](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol)，即 OpenZeppelin ERC-20 合约的接口。向导的 `import {ERC20} from ...` 行仅引入了 `ERC20`，因此请将此行添加到文件顶部其他导入的旁边：

```solidity
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

```solidity
        uint balance = token.balanceOf(address(this));
        token.transfer(dest, balance);
    }
```

这是一个清理函数，因此我们大概不想留下任何代币。与其手动从用户那里获取余额，不如将该过程自动化。

## 结论 {#conclusion}

这不是一个完美的解决方案——对于“用户犯错”的问题，没有完美的解决方案。然而，使用这类检查至少可以防止一些错误。冻结账户的能力虽然危险，但可以通过拒绝黑客获取被盗资金来限制某些黑客攻击的破坏。

[点击此处查看我的更多作品](https://cryptodocguy.pro/)。
