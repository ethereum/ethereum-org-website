---
title: 带安全保障的 ERC-20
description: 如何帮助人们避免犯下低级错误
author: Ori Pomerantz
lang: zh
tags: [ "erc-20" ]
skill: beginner
published: 2022年8月15日
---

## 简介 {#introduction}

以太坊的优点之一在于，没有任何中心化机构可以修改或撤销你的交易。 以太坊的一大问题也正在于此：没有任何中心化机构有权撤销用户错误或非法交易。 在本文中，你将了解用户在使用 [ERC-20](/developers/docs/standards/tokens/erc-20/) 代币时常犯的一些错误，以及如何创建 ERC-20 合约来帮助用户避免这些错误，或赋予中心化机构某些权力（例如冻结帐户）。

请注意，虽然我们将使用 [OpenZeppelin ERC-20 代币合约](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20)，但本文不会对其进行详细解释。 你可以在[此处](/developers/tutorials/erc20-annotated-code)找到此信息。

如果你想查看完整的源代码：

1. 打开 [Remix IDE](https://remix.ethereum.org/)。
2. 点击克隆 GitHub 图标（![克隆 github 图标](icon-clone.png)）。
3. 克隆 GitHub 仓库 `https://github.com/qbzzt/20220815-erc20-safety-rails`。
4. 打开 **contracts > erc20-safety-rails.sol**。

## 创建 ERC-20 合约 {#creating-an-erc-20-contract}

在添加安全保障功能之前，我们首先需要 ERC-20 合约。 在本文中，我们将使用 [OpenZeppelin 合约向导](https://docs.openzeppelin.com/contracts/5.x/wizard)。 在另一个浏览器中将其打开，然后遵循以下说明：

1. 选择 **ERC20**。

2. 请输入以下设置：

   | 参数   | Value            |
   | ---- | ---------------- |
   | 名称   | SafetyRailsToken |
   | 符号   | SAFE             |
   | 预铸   | 1000             |
   | 功能   | 无                |
   | 访问控制 | Ownable          |
   | 可升级性 | 无                |

3. 向上滚动并点击 **Open in Remix**（适用于 Remix）或 **Download** 以使用不同的环境。 我将假设你正在使用 Remix，如果你使用其他工具，请做相应更改。

4. 我们现在已经拥有一份功能齐全的 ERC-20 合约。 你可以展开 `.deps` > `npm` 查看导入的代码。

5. 编译、部署并试用该合约，看看它是否能作为 ERC-20 合约正常运行。 如果你需要学习如何使用 Remix，请[参阅此教程](https://remix.ethereum.org/?#activate=udapp,solidity,LearnEth)。

## 常见错误 {#common-mistakes}

### 这些错误 {#the-mistakes}

用户有时会向错误的地址发送代币。 虽然我们无法读懂他们的心思，不知道他们想做什么，但有两种经常发生且易于检测的错误类型：

1. 将代币发送到合约自己的地址。 例如，[Optimism 的 OP 代币](https://optimism.mirror.xyz/qvd0WfuLKnePm1Gxb9dpGchPf5uDz5NSMEFdgirDS4c)在不到两个月的时间里累积了[超过 120,000](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000042) 个 OP 代币。 这代表着一笔巨额财富，而人们很可能就这样白白损失了。

2. 将代币发送到空地址，即不对应[外部帐户](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs)或[智能合约](/developers/docs/smart-contracts)的地址。 虽然我没有关于这种情况发生频率的统计数据，但有[一次事件可能造成了 20,000,000 代币的损失](https://gov.optimism.io/t/message-to-optimism-community-from-wintermute/2595)。

### 阻止转账 {#preventing-transfers}

OpenZeppelin ERC-20 合约包含一个[钩子 `_beforeTokenTransfer`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol#L364-L368)，它在代币转账前被调用。 默认情况下，这个钩子不执行任何操作，但我们可以在其上挂载自己的功能，例如在出现问题时进行回滚检查。

要使用这个钩子，请在构造函数后添加以下函数：

```solidity
    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal virtual
        override(ERC20)
    {
        super._beforeTokenTransfer(from, to, amount);
    }
```

如果你不太熟悉 Solidity，此函数的某些部分对你来说可能比较陌生：

```solidity
        internal virtual
```

`virtual` 关键字表示，就像我们从 `ERC20` 继承功能并重写此函数一样，其他合约也可以从我们这里继承并重写此函数。

```solidity
        override(ERC20)
```

我们必须明确指定我们正在[重写](https://docs.soliditylang.org/en/v0.8.15/contracts.html#function-overriding) `_beforeTokenTransfer` 的 ERC20 代币定义。 通常，从安全角度来看，显式定义比隐式定义要好得多——如果做过的事情就在眼前，你就不会忘记。 这也是我们需要指定正在重写哪个超类的 `_beforeTokenTransfer` 的原因。

```solidity
        super._beforeTokenTransfer(from, to, amount);
```

这行代码调用我们所继承的、且包含此函数的合约的 `_beforeTokenTransfer` 函数。 在本例中，只有 `ERC20` 有这个钩子，`Ownable` 没有。 尽管目前 `ERC20._beforeTokenTransfer` 不执行任何操作，但我们仍然调用它，以防将来添加新功能（然后我们决定重新部署合约，因为合约在部署后无法更改）。

### 将要求编写为代码 {#coding-the-requirements}

我们想向函数中添加这些要求：

- `to` 地址不能等于 `address(this)`，即 ERC-20 合约本身的地址。
- `to` 地址不能为空，它必须是以下之一：
  - 一个外部帐户 (EOA)。 我们无法直接检查一个地址是否为 EOA，但可以检查该地址的 ETH 余额。 EOA 几乎总是有余额，即使不再使用也是如此——很难将余额清零到最后一个 wei。
  - 一个智能合约。 测试一个地址是否为智能合约要更难一些。 有一个检查外部代码长度的操作码，名为 [`EXTCODESIZE`](https://www.evm.codes/#3b)，但它不能直接在 Solidity 中使用。 我们必须为此使用 [Yul](https://docs.soliditylang.org/en/v0.8.15/yul.html)，它是一种 EVM 汇编语言。 我们也可以使用 Solidity 中的其他值（[`<address>.code` 和 `<address>.codehash`](https://docs.soliditylang.org/en/v0.8.15/units-and-global-variables.html#members-of-address-types)），但它们成本更高。

我们来逐行查看新代码：

```solidity
        require(to != address(this), "不能将代币发送到合约地址");
```

这是第一个要求，检查 `to` 和 `this(address)` 是否不相同。

```solidity
        bool isToContract;
        assembly {
           isToContract := gt(extcodesize(to), 0)
        }
```

我们通过这种方式检查一个地址是否为合约。 我们无法直接从 Yul 接收输出，因此我们定义了一个变量来保存结果（在本例中为 `isToContract`）。 Yul 的工作方式是，每个操作码都被视为一个函数。 所以我们首先调用 [`EXTCODESIZE`](https://www.evm.codes/#3b) 来获取合约大小，然后使用 [`GT`](https://www.evm.codes/#11) 来检查它是否不为零（我们处理的是无符号整数，所以它当然不可能是负数）。 然后我们将结果写入 `isToContract`。

```solidity
        require(to.balance != 0 || isToContract, "不能将代币发送到空地址");
```

最后，我们进行空地址的实际检查。

## 管理访问权限 {#admin-access}

有时候，有一个可以撤销错误的管理员是很有用的。 为了减少潜在的滥用，这个管理员可以是一个[多签](https://blog.logrocket.com/security-choices-multi-signature-wallets/)，这样就需要多个人同意才能执行一项操作。 本文将介绍两种管理功能：

1. 冻结和解冻帐户。 例如，当帐户可能被盗用时，这就很有用。
2. 资产清理。

   有时，诈骗者会向真实代币的合约发送诈骗代币，以使其看起来合法。 例如，[请看这里](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe?tab=holders)。 合法的 ERC-20 合约是 [0x4200....0042](https://optimism.blockscout.com/token/0x4200000000000000000000000000000000000042)。 冒充它的诈骗合约是 [0x234....bbe](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe)。

   也有可能有人误将合法的 ERC-20 代币发送到我们的合约中，这也是我们希望有办法将这些代币取出的另一个原因。

OpenZeppelin 提供了两种机制来实现管理访问：

- [`Ownable`](https://docs.openzeppelin.com/contracts/5.x/access-control#ownership-and-ownable) 合约只有一个所有者。 带有 `onlyOwner` [修饰符](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm)的函数只能由该所有者调用。 所有者可以将所有权转让给其他人或完全放弃所有权。 所有其他帐户的权利通常是相同的。
- [`AccessControl`](https://docs.openzeppelin.com/contracts/5.x/access-control#role-based-access-control) 合约具有[基于角色的访问控制 (RBAC)](https://en.wikipedia.org/wiki/Role-based_access_control)。

为简单起见，本文使用 `Ownable`。

### 冻结和解冻合约 {#freezing-and-thawing-contracts}

冻结和解冻合约需要进行几项更改：

- 一个从地址到[布尔值](https://en.wikipedia.org/wiki/Boolean_data_type)的[映射](https://www.tutorialspoint.com/solidity/solidity_mappings.htm)，用于跟踪哪些地址被冻结。 所有值的初始值都为零，对于布尔值，这被解释为 false。 这正是我们想要的，因为默认情况下帐户不会被冻结。

  ```solidity
      mapping(address => bool) public frozenAccounts;
  ```

- 使用[事件](https://www.tutorialspoint.com/solidity/solidity_events.htm)来通知所有相关方帐户被冻结或解冻。 从技术上讲，这些操作并不需要事件，但它有助于链下代码能够侦听这些事件并了解正在发生的情况。 当发生可能与其他人相关的事情时，智能合约发出事件被认为是一种良好实践。

  这些事件已编入索引，因此可以搜索某个帐户所有被冻结或解冻的时间。

  ```solidity
    // 当帐户被冻结或解冻时
    event AccountFrozen(address indexed _addr);
    event AccountThawed(address indexed _addr);
  ```

- 用于冻结和解冻帐户的函数。 这两个函数几乎完全相同，因此我们只介绍冻结函数。

  ```solidity
      function freezeAccount(address addr)
        public
        onlyOwner
  ```

  标记为 [`public`](https://www.tutorialspoint.com/solidity/solidity_contracts.htm) 的函数可以从其他智能合约调用，也可以通过交易直接调用。

  ```solidity
    {
        require(!frozenAccounts[addr], "帐户已被冻结");
        frozenAccounts[addr] = true;
        emit AccountFrozen(addr);
    }  // freezeAccount
  ```

  如果帐户已被冻结，则回滚。 否则，冻结它并 `emit` 一个事件。

- 更改 `_beforeTokenTransfer` 以防止资金从冻结帐户中转出。 请注意，资金仍可转入冻结帐户。

  ```solidity
       require(!frozenAccounts[from], "该帐户已被冻结");
  ```

### 资产清理 {#asset-cleanup}

要释放此合约持有的 ERC-20 代币，我们需要在该代币所属的代币合约上调用一个函数，即 [`transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer) 或 [`approve`](https://eips.ethereum.org/EIPS/eip-20#approve)。 在这种情况下，没有必要将燃料浪费在许可额度上，我们不如直接转账。

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

这是我们在收到地址时为合约创建对象的语法。 我们可以这样做，因为我们的源代码中包含了 ERC20 代币的定义（见第 4 行），并且该文件包含了 [IERC20 的定义](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol)，即 OpenZeppelin ERC-20 合约的接口。

```solidity
        uint balance = token.balanceOf(address(this));
        token.transfer(dest, balance);
    }
```

这是一个清理函数，所以我们大概不希望留下任何代币。 与其让用户手动获取余额，我们不如将这个过程自动化。

## 结论 {#conclusion}

这不是一个完美的解决方案——“用户犯错”问题没有完美的解决方案。 不过，使用这类检查至少可以避免一些错误。 冻结帐户的功能虽然危险，但可以通过拒绝黑客获得被盗资金来限制某些黑客攻击造成的损害。

[点击此处查看我的更多作品](https://cryptodocguy.pro/)。
