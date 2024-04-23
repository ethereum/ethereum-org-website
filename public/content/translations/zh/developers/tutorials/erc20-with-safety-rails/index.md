---
title: ERC-20 安全保障
description: 如何帮助人们避免犯下低级错误
author: Ori Pomerantz
lang: zh
tags:
  - "erc-20"
skill: beginner
published: 2022-08-15
---

## 简介 {#introduction}

以太坊的厉害之处之一在于不存在可以修改或取消你的交易的中心化组织。 但同时，以太坊也面临许多困难，其中之一便是没有任何中心化组织有权力消除用户错误或非法交易。 在这篇文章中，你将了解以太坊用户在使用 [ERC-20](/developers/docs/standards/tokens/erc-20/) 代币时犯下的一些常见错误以及如何创建 ERC-20 合约来帮助用户避免犯这些错误，或者赋予中心化组织某些权力（例如冻结帐户的权力）。

请注意：虽然我们将使用 [OpenZeppelin ERC-20 代币合约](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20)，本文未对此进行详细阐述。 你可以在[这里](/developers/tutorials/erc20-annotated-code)找到此信息。

如果你想要查看完整的源代码：

1. 请打开 [Remix IDE](https://remix.ethereum.org/)。
2. 点击克隆 github 图标 (![clone github icon](icon-clone.png))。
3. 克隆 github 存储库 `https://github.com/qbzzt/20220815-erc20-safety-rails`。
4. 打开**合约 > erc20-safety-rails.sol**。

## 创建 ERC-20 合约 {#creating-an-erc-20-contract}

在添加安全保障功能之前，我们首先需要 ERC-20 合约。 在这篇文章中，我们将使用 [the OpenZeppelin 合约向导](https://docs.openzeppelin.com/contracts/4.x/wizard)。 在另一个浏览器中将其打开，然后遵循以下说明：

1. 选择 **ERC-20**。
2. 请输入以下设置：

   | 参数             | 值                |
   | -------------- | ---------------- |
   | 姓名             | SafetyRailsToken |
   | Symbol         | SAFE             |
   | Premint        | 1000             |
   | 特性             | 无                |
   | Access Control | Ownable          |
   | Upgradability  | 无                |

3. 向上滚动并点击 **Open in Remix**（适用于 Remix）或点击 **Download** 以使用另一个环境。 假设你正在使用 Remix，如果你想使用其他环境，只需要做些适当调整即可。
4. 我们现在已经拥有一份功能齐全的 ERC-20 合约。 你可以展开 `.deps`>`npm` 查看导入的代码。
5. 编译、部署并使用该合约，确认其作为 ERC-20 合约能否正常发挥作用。 如果你需要学习如何使用 Remix，请[使用本教程](https://remix.ethereum.org/?#activate=udapp,solidity,LearnEth)。

## 常见错误 {#common-mistakes}

### 错误 {#the-mistakes}

用户有时会向错误的地址发送代币。 尽管有时我们很难理解他们这么做的目的，但有两种错误类型经常发生且很容易检测到：

1. 给合约自己的地址发送代币。 例如，[Optimism 的 OP 代币](https://optimism.mirror.xyz/qvd0WfuLKnePm1Gxb9dpGchPf5uDz5NSMEFdgirDS4c)在不到 2 个月的时间内累计[超过 120,000个](https://optimistic.etherscan.io/address/0x4200000000000000000000000000000000000042#tokentxns)。 这代表着人们可能刚刚失去的大量财富。

2. 将代币发送到一个空地址，该地址并不对应一个[外部帐户](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs)或者一份[智能合约](/developers/docs/smart-contracts)。 尽管我没有关于这类情况发生频率的统计资料，但[这种事件发生一次，就能让用户损失 20,000,000 代币](https://gov.optimism.io/t/message-to-optimism-community-from-wintermute/2595)。

### 防止转账 {#preventing-transfers}

Open Zeppelin ERC-20 合约包含[一个钩子（`_beforeTokenTransfer`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol#L364-L368)），在转账代币之前会调用此钩子。 默认情况下，这个钩子不会发生任何作用，但是我们可以在钩子上挂起自己的功能，例如在出现问题时进行回滚的检查。

若要使用此钩子，请在构造函数后面添加此函数：

```solidity
    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal virtual
        override(ERC20)
    {
        super._beforeTokenTransfer(from, to, amount);
    }
```

如果你不熟悉 Solidity，你可能对此函数的某些部分感到陌生。

```solidity
        internal virtual
```

`virtual` 关键字表明，正如我们可以从 `ERC-20` 继承函数并重写此函数一样，其他合约也可以从我们这里继承函数并重写此函数。

```solidity
        override(ERC20)
```

我们必须明确指定我们正在[重写](https://docs.soliditylang.org/en/v0.8.15/contracts.html#function-overriding) `_beforeTokenTransfer` 的 ERC20 代币定义。 一般来说，从安全的角度来看，显式定义比隐式定义要好得多—如果你做过的事就在眼前，你就不会忘记你已经做了这件事。 这也是我们需要指定重写哪个超类的 `_beforeTokenTransfer` 的原因。

```solidity
        super._beforeTokenTransfer(from, to, amount);
```

这一行调用我们从其中继承函数的合约的 `_beforeTokenTransfer` 函数。 在这种情况下，只有 `ERC20` 和 `Ownable` 没有这个钩子。 尽管目前 `ERC20._beforeTokenTransfer` 没有执行任何操作，但我们还是会调用它，以防将来添加功能（然后我们决定重新部署合约，因为合约在部署后不会改变）。

### 对要求进行编码 {#coding-the-requirements}

我们希望在函数中添加以下要求：

- `to` 地址不能等于 `address(this)`，即 ERC-20 合约本身的地址。
- `to` 地址不能为空，必须为以下任一地址：
  - 外部帐户 (EOA)。 我们无法直接检查地址是否为外部帐户，但可以检查地址的以太币余额。 外部帐户几乎总是有余额的，即使不再使用也是如此—余额很难降至最后一 Wei。
  - 智能合约。 测试一个地址是否是智能合约要难一些。 有一个检查外部代码长度的操作码，被称为 [`EXTCODESIZE`](https://www.evm.codes/#3b)，但它不能直接在 Solidity 中使用。 为此，我们必须使用以太坊虚拟机汇编语言 [Yul](https://docs.soliditylang.org/en/v0.8.15/yul.html)。 我们还可以使用 Solidity 的其他值（[`<address>.code` 和 `<address>.codehash`](https://docs.soliditylang.org/en/v0.8.15/units-and-global-variables.html#members-of-address-types)），但开销更大。

让我们逐行查看新代码：

```solidity
        require(to != address(this), "Can't send tokens to the contract address");
```

这是第一个要求，即检查确保 `to` 和 `this(address)` 不同。

```solidity
        bool isToContract;
        assembly {
           isToContract := gt(extcodesize(to), 0)
        }
```

这就是我们检查地址是否为合约的方法。 我们无法直接从 Yul 接收输出，因此我们定义了一个变量来保留结果（本例中为 `isToContract`）。 Yul 的工作方式是将每个操作码都视为一个函数。 因此我们首先调用 [`EXTCODESIZE`](https://www.evm.codes/#3b) 来获取合约大小，然后使用 [`GT`](https://www.evm.codes/#11) 来检查它是否为零（我们处理的是无符号整数，所以它当然不能为负）。 然后，我们将结果写入 `isToContract` 中。

```solidity
        require(to.balance != 0 || isToContract, "Can't send tokens to an empty address");
```

最后，我们还要实际检查地址是否为空。

## 管理访问 {#admin-access}

有时，拥有可以撤消错误的管理员是很有用的。 为了减少滥用的可能性，该管理员可以是[多重签名](https://blog.logrocket.com/security-choices-multi-signature-wallets/)，因此必须有多人同意才能进行操作。 本文将介绍两种管理功能：

1. 冻结和解冻帐户。 例如，当帐户可能被泄露时，这就很有用。
2. 资产清理。

   有时，欺诈者会将欺诈性代币发送到真实代币的合约中以获得合法性。 例如，[参见此处](https://optimistic.etherscan.io/token/0x2348b1a1228ddcd2db668c3d30207c3e1852fbbe?a=0x4200000000000000000000000000000000000042)。 合法的 ERC-20 合约是 [0x4200....0042](https://optimistic.etherscan.io/address/0x4200000000000000000000000000000000000042)。 冒充它的合约是 [0x234....bbe](https://optimistic.etherscan.io/address/0x2348b1a1228ddcd2db668c3d30207c3e1852fbbe)。

   也有可能有人误将合法的 ERC-20 代币发送到我们的合约中，这也是我们希望有办法将这些代币取出的另一个原因。

OpenZeppelin 提供两种机制来实现管理访问：

- [`Ownable`](https://docs.openzeppelin.com/contracts/4.x/access-control#ownership-and-ownable) 合约只有一个所有者。 具有 `onlyOwner`[ 修改器](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm)的函数只能由该所有者调用。 所有者可以将所有权转让给其他人或完全放弃。 所有其他帐户的权利通常是相同的。
- [`AccessControl`](https://docs.openzeppelin.com/contracts/4.x/access-control#role-based-access-control) 合约具有[基于角色的访问控制 (RBAC)](https://en.wikipedia.org/wiki/Role-based_access_control)。

为简单起见，本文将使用 `Ownable`。

### 冻结和解冻合约 {#freezing-and-thawing-contracts}

冻结和解冻合约需要几处更改：

- 从地址到[布尔值](https://en.wikipedia.org/wiki/Boolean_data_type)的[映射](https://www.tutorialspoint.com/solidity/solidity_mappings.htm)来追踪哪些地址被冻结。 所有值的初始值都是 0，对于布尔值来说，它被解释为“false”。 这正是我们想要的，因为默认情况下帐户不会被冻结。

  ```solidity
      mapping(address => bool) public frozenAccounts;
  ```

- 当帐户被冻结或解冻时，用于通知相关人员的[事件](https://www.tutorialspoint.com/solidity/solidity_events.htm)。 从技术上讲，这些操作并不需要事件，但它有助于链下代码能够监听这些事件并了解正在发生的情况。 当发生与他人相关的事情时，智能合约能够发出这些信息，这被认为是一种很好的方式。

  这些事件都有索引，因此可以搜索帐户被冻结或解冻的所有时间。

  ```solidity
    // When accounts are frozen or unfrozen
    event AccountFrozen(address indexed _addr);
    event AccountThawed(address indexed _addr);
  ```

- 用于冻结和解冻帐户的函数。 这两个函数几乎完全相同，因此我们只介绍冻结函数。

  ```solidity
      function freezeAccount(address addr)
        public
        onlyOwner
  ```

  标记为 [`public`](https://www.tutorialspoint.com/solidity/solidity_contracts.htm) 的函数可由其他智能合约调用，也可由交易直接调用。

  ```solidity
    {
        require(!frozenAccounts[addr], "Account already frozen");
        frozenAccounts[addr] = true;
        emit AccountFrozen(addr);
    }  // freezeAccount
  ```

  如果帐户已被冻结，则会回滚。 否则，冻结帐户并 `emit` 一个事件。

- 更改 `_beforeTokenTransfer` 以防止资金从冻结帐户中转出。 请注意，资金仍可转入冻结帐户。

  ```solidity
       require(!frozenAccounts[from], "The account is frozen");
  ```

### 资产清理 {#asset-cleanup}

要释放此合约持有的 ERC-20 代币，我们需要调用它们所属代币合约上的函数，即 [ `transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer) 或 [`approve`](https://eips.ethereum.org/EIPS/eip-20#approve)。 在这种情况下，没有必要将燃料浪费在许可额度上，我们也可以直接转账。

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

这是我们收到地址时为合约创建对象的语法。 我们可以做到这一点，是因为我们将 ERC20 代币的定义作为源代码的一部分（见第 4 行），该文件包括 [IERC20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) 的定义，即 OpenZeppelin ERC-20 合约的接口。

```solidity
        uint balance = token.balanceOf(address(this));
        token.transfer(dest, balance);
    }
```

这是一个清理函数，所以我们可能不想留下任何代币。 与其手动从用户那里获取余额，我们不如将这一过程自动化。

## 结论 {#conclusion}

这并不是一个完美的解决方案—“用户犯错误”的问题没有完美的解决方案。 不过，使用这类检查至少可以避免一些错误。 冻结帐户的功能虽然危险，但可以通过阻止黑客窃取资金来限制某些黑客攻击的危害。
