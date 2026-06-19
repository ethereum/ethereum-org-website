---
title: 带有安全护栏的 ERC-20
description: 如何帮助人们避免犯低级错误
author: 奥里·波梅兰茨
lang: zh
tags: ["erc-20"]
skill: beginner
breadcrumb: ERC-20 安全
published: 2022-08-15
---

## 简介 {#introduction}

以太坊的一大优势在于，没有中央机构可以修改或撤销你的交易。以太坊的一大问题也在于，没有中央机构有权撤销用户的错误或非法交易。在本文中，你将了解用户在使用 [ERC-20](/developers/docs/standards/tokens/erc-20/) 代币时常犯的一些错误，以及如何创建 ERC-20 合约来帮助用户避免这些错误，或者赋予中央机构一定的权力（例如冻结账户）。

请注意，虽然我们将使用 [欧本齐柏林 ERC-20 代币合约](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20)，但本文不会对其进行详细解释。你可以在[此处](/developers/tutorials/erc20-annotated-code)找到相关信息。

如果你想查看完整的源代码：

1. 打开 [Remix IDE](https://remix.ethereum.org/)。
2. 点击克隆 GitHub 图标 (![clone github icon](icon-clone.png))。
3. 克隆 GitHub 仓库 `https://github.com/qbzzt/20220815-erc20-safety-rails`。
4. 打开 **contracts > erc20-safety-rails.sol**。

## 创建 ERC-20 合约 {#creating-an-erc-20-contract}

在添加安全护栏功能之前，我们需要一个 ERC-20 合约。在本文中，我们将使用 [欧本齐柏林合约向导](https://docs.openzeppelin.com/contracts/5.x/wizard)。在另一个浏览器中打开它并按照以下说明操作：

1. 选择 **ERC20**。
2. 输入以下设置：

   | 参数 | 值 |
   | -------------- | ---------------- |
   | 名称 | SafetyRailsToken |
   | 符号 | SAFE |
   | 预铸造 | 1000 |
   | 功能 | None |
   | 访问控制 | Ownable |
   | 可升级性 | None |

3. 向上滚动并点击 **Open in Remix**（适用于 Remix）或 **Download** 以使用其他环境。我假设你使用的是 Remix，如果你使用其他环境，只需进行相应的更改即可。
4. 现在我们有了一个功能齐全的 ERC-20 合约。你可以展开 `.deps` > `npm` 来查看导入的代码。
5. 编译、部署并试用该合约，看看它是否能作为 ERC-20 合约正常运行。如果你需要学习如何使用 Remix，请[参考本教程](https://remix.ethereum.org/?#activate=udapp,solidity,LearnEth)。

## 常见错误 {#common-mistakes}

### 错误类型 {#the-mistakes}

用户有时会将代币发送到错误的地址。虽然我们无法读懂他们的心思来知道他们到底想做什么，但有两种错误类型经常发生且很容易检测到：

1. 将代币发送到合约自身的地址。例如，[Optimism 的 OP 代币](https://optimism.mirror.xyz/qvd0WfuLKnePm1Gxb9dpGchPf5uDz5NSMEFdgirDS4c)在不到两个月的时间里就积累了[超过 120,000 个](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000042) OP 代币。这代表了一笔巨大的财富，大概率是人们白白损失掉的。

2. 将代币发送到一个空地址，即不对应于[外部拥有账户 (EOA)](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs) 或[智能合约](/developers/docs/smart-contracts)的地址。虽然我没有关于这种情况发生频率的统计数据，但[一次事件就可能损失 20,000,000 个代币](https://gov.optimism.io/t/message-to-optimism-community-from-wintermute/2595)。

### 阻止转账 {#preventing-transfers}

欧本齐柏林 ERC-20 合约包含[一个钩子 `_beforeTokenTransfer`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol#L364-L368)，它会在代币转账之前被调用。默认情况下，这个钩子不执行任何操作，但我们可以将自己的功能挂载到它上面，例如在出现问题时进行回退的检查。

要使用该钩子，请在构造函数之后添加此函数：

```solidity
    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal virtual
        override(ERC20)
    {
        super._beforeTokenTransfer(from, to, amount);
    }
```

如果你对 Solidity 不是很熟悉，这个函数的一些部分可能对你来说是新的：

```solidity
        internal virtual
```

`virtual` 关键字意味着，正如我们从 `ERC20` 继承功能并重写了此函数一样，其他合约也可以从我们这里继承并重写此函数。

```solidity
        override(ERC20)
```

我们必须明确指定我们正在[重写](https://docs.soliditylang.org/en/v0.8.15/contracts.html#function-overriding) ERC20 代币定义的 `_beforeTokenTransfer`。一般来说，从安全角度来看，显式定义比隐式定义要好得多——如果它就在你面前，你就不会忘记你做过什么。这也是我们需要指定我们要重写哪个超类的 `_beforeTokenTransfer` 的原因。

```solidity
        super._beforeTokenTransfer(from, to, amount);
```

这一行调用了我们继承的、包含该函数的合约的 `_beforeTokenTransfer` 函数。在这种情况下，只有 `ERC20` 包含该函数，`Ownable` 没有这个钩子。即使目前 `ERC20._beforeTokenTransfer` 不执行任何操作，我们也会调用它，以防将来添加了功能（然后我们决定重新部署合约，因为合约在部署后无法更改）。

### 编写需求代码 {#coding-the-requirements}

我们希望向该函数添加以下需求：

- `to` 地址不能等于 `address(this)`，即 ERC-20 合约自身的地址。
- `to` 地址不能为空，它必须是以下之一：
  - 外部拥有账户 (EOA)。我们无法直接检查一个地址是否为 EOA，但我们可以检查该地址的 ETH 余额。EOA 几乎总是拥有余额，即使它们不再被使用——很难将它们清空到最后一 Wei。
  - 智能合约。测试一个地址是否为智能合约要困难一些。有一个操作码可以检查外部代码长度，称为 [`EXTCODESIZE`](https://www.evm.codes/#3b)，但它不能在 Solidity 中直接使用。我们必须为此使用 [Yul](https://docs.soliditylang.org/en/v0.8.15/yul.html)（即 EVM 汇编）。我们可以使用 Solidity 中的其他值（[`<address>.code` 和 `<address>.codehash`](https://docs.soliditylang.org/en/v0.8.15/units-and-global-variables.html#members-of-address-types)），但它们消耗的 Gas 更多。

让我们逐行查看新代码：

```solidity
        require(to != address(this), "Can't send tokens to the contract address");
```

这是第一个需求，检查 `to` 和 `this(address)` 是否不相同。

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

- [`Ownable`](https://docs.openzeppelin.com/contracts/5.x/access-control#ownership-and-ownable) 合约拥有单一所有者。带有 `onlyOwner` [修饰符](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm)的函数只能由该所有者调用。所有者可以将所有权转移给其他人或完全放弃所有权。所有其他账户的权利通常是相同的。
- [`AccessControl`](https://docs.openzeppelin.com/contracts/5.x/access-control#role-based-access-control) 合约具有[基于角色的访问控制 (RBAC)](https://en.wikipedia.org/wiki/Role-based_access_control)。

为了简单起见，在本文中我们使用 `Ownable`。

### 冻结和解冻合约 {#freezing-and-thawing-contracts}

冻结和解冻合约需要进行几项更改：

- 一个从地址到[布尔值](https://en.wikipedia.org/wiki/Boolean_data_type)的[映射](https://www.tutorialspoint.com/solidity/solidity_mappings.htm)，用于跟踪哪些地址被冻结。所有值最初都为零，对于布尔值来说，这被解释为 false。这正是我们想要的，因为默认情况下账户是不被冻结的。

  ```solidity
      mapping(address => bool) public frozenAccounts;
  ```

- [事件](https://www.tutorialspoint.com/solidity/solidity_events.htm)，用于在账户被冻结或解冻时通知任何感兴趣的人。从技术上讲，这些操作不需要事件，但它有助于链下代码能够监听这些事件并了解正在发生的事情。当可能与其他人相关的事情发生时，智能合约触发事件被认为是一种良好的规范。

  这些事件被索引，因此可以搜索一个账户被冻结或解冻的所有时间记录。

  ```solidity
    // 当账户被冻结或解冻时
    event AccountFrozen(address indexed _addr);
    event AccountThawed(address indexed _addr);
  ```

- 用于冻结和解冻账户的函数。这两个函数几乎完全相同，因此我们只讨论冻结函数。

  ```solidity
      function freezeAccount(address addr)
        public
        onlyOwner
  ```

  标记为 [`public`](https://www.tutorialspoint.com/solidity/solidity_contracts.htm) 的函数可以从其他智能合约调用，也可以直接通过交易调用。

  ```solidity
    {
        require(!frozenAccounts[addr], "Account already frozen");
        frozenAccounts[addr] = true;
        emit AccountFrozen(addr);
    }  // freezeAccount
  ```

  如果账户已被冻结，则回退。否则，冻结它并 `emit` 一个事件。

- 更改 `_beforeTokenTransfer` 以防止资金从冻结账户中转出。请注意，资金仍然可以转账到冻结账户中。

  ```solidity
       require(!frozenAccounts[from], "The account is frozen");
  ```

### 资产清理 {#asset-cleanup}

要释放该合约持有的 ERC-20 代币，我们需要调用它们所属的代币合约上的函数，即 [`transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer) 或 [`approve`](https://eips.ethereum.org/EIPS/eip-20#approve)。在这种情况下，将 Gas 浪费在授权上毫无意义，我们不妨直接转账。

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

这是我们在收到地址时为合约创建对象的语法。我们之所以能这样做，是因为我们将 ERC20 代币的定义作为源代码的一部分（见第 4 行），并且该文件包含 [IERC20 的定义](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol)，即欧本齐柏林 ERC-20 合约的接口。

```solidity
        uint balance = token.balanceOf(address(this));
        token.transfer(dest, balance);
    }
```

这是一个清理函数，因此我们大概率不想留下任何代币。与其手动从用户那里获取余额，我们不如将该过程自动化。

## 结论 {#conclusion}

这不是一个完美的解决方案——对于“用户犯错”的问题，没有完美的解决方案。然而，使用这类检查至少可以防止一些错误。冻结账户的能力虽然危险，但可以通过拒绝黑客获取被盗资金来限制某些黑客攻击的破坏。

[点击此处查看我的更多作品](https://cryptodocguy.pro/)。