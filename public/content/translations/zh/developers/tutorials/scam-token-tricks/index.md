---
title: "诈骗代币使用的一些伎俩以及如何检测它们"
description: "在本教程中，我们将剖析一个诈骗代币，看看诈骗者玩弄的一些伎俩、他们是如何实现这些伎俩的，以及我们如何检测它们。"
author: "奥里·波梅兰茨"
tags: ["诈骗", "Solidity", "ERC-20", "JavaScript", "TypeScript"]
skill: intermediate
breadcrumb: "诈骗代币伎俩"
published: 2023-09-15
lang: zh
---

在本教程中，我们将剖析[一个诈骗代币](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code)，看看诈骗者玩弄的一些伎俩以及他们是如何实现这些伎俩的。在本教程结束时，你将对 ERC-20 代币合约、它们的功能以及为什么必须保持怀疑态度有更全面的了解。然后，我们将查看该诈骗代币触发的事件，并了解如何自动识别它是不合法的。

## 诈骗代币——它们是什么，为什么人们会制造它们，以及如何避免它们 {#scam-tokens}

以太坊最常见的用途之一是让一个群体创建一个可交易的代币，在某种意义上就是他们自己的货币。然而，只要有带来价值的合法用例，就会有试图为自己窃取该价值的犯罪分子。

你可以从用户角度在 [ethereum.org 的其他地方](/guides/how-to-id-scam-tokens/)阅读有关此主题的更多信息。本教程侧重于剖析诈骗代币，看看它是如何运作的以及如何检测它。

### 我怎么知道 wARB 是一个骗局？ {#warb-scam}

我们剖析的代币是 [wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code)，它假装等同于合法的 [ARB 代币](https://etherscan.io/token/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1)。

知道哪个是合法代币的最简单方法是查看其发起组织 [Arbitrum](https://arbitrum.foundation/)。合法地址在[他们的文档中](https://docs.arbitrum.foundation/deployment-addresses#token)有明确说明。

### 为什么源代码是公开的？ {#why-source}

通常我们会认为试图诈骗他人的人会遮遮掩掩，事实上许多诈骗代币并没有公开其代码（例如，[这个](https://optimistic.etherscan.io/token/0x15992f382d8c46d667b10dc8456dc36651af1452#code)和[这个](https://optimistic.etherscan.io/token/0x026b623eb4aada7de37ef25256854f9235207178#code)）。

然而，合法的代币通常会发布其源代码，因此为了显得合法，诈骗代币的作者有时也会这样做。[wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code) 就是那些公开了源代码的代币之一，这使得我们更容易理解它。

虽然合约部署者可以选择是否发布源代码，但他们_不能_发布错误的源代码。区块浏览器会独立编译提供的源代码，如果得不到完全相同的字节码，它就会拒绝该源代码。[你可以在 Etherscan 网站上阅读有关此内容的更多信息](https://etherscan.io/verifyContract)。

## 与合法 ERC-20 代币的比较 {#compare-legit-erc20}

我们将把这个代币与合法的 ERC-20 代币进行比较。如果你不熟悉合法的 ERC-20 代币通常是如何编写的，请[参阅本教程](/developers/tutorials/erc20-annotated-code/)。

### 特权地址的常量 {#constants-for-privileged-addresses}

合约有时需要特权地址。为长期使用而设计的合约允许某些特权地址更改这些地址，例如为了启用新的多重签名合约。有几种方法可以做到这一点。

[`HOP` 代币合约](https://etherscan.io/address/0xc5102fe9359fd9a28f877a67e36b0f050d81a3cc#code)使用了 [`Ownable`](https://docs.openzeppelin.com/contracts/2.x/access-control#ownership-and-ownable) 模式。特权地址保存在存储中，位于一个名为 `_owner` 的字段中（参见第三个文件 `Ownable.sol`）。

```solidity
abstract contract Ownable is Context {
    address private _owner;
    .
    .
    .
}
```

[`ARB` 代币合约](https://etherscan.io/address/0xad0c361ef902a7d9851ca7dcc85535da2d3c6fc7#code)没有直接的特权地址。然而，它并不需要。它位于 [地址 `0xb50721bcf8d664c30412cfbc6cf7a15145234ad1`](https://etherscan.io/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1#code) 的 [`proxy`](https://docs.openzeppelin.com/contracts/5.x/api/proxy) 后面。该合约有一个特权地址（参见第四个文件 `ERC1967Upgrade.sol`），可用于升级。

```solidity
    /**
     * @dev 在 EIP1967 管理员槽位中存储一个新地址。
     */
    function _setAdmin(address newAdmin) private {
        require(newAdmin != address(0), "ERC1967: new admin is the zero address");
        StorageSlot.getAddressSlot(_ADMIN_SLOT).value = newAdmin;
    }
```

相比之下，`wARB` 合约有一个硬编码的 `contract_owner`。

```solidity
contract WrappedArbitrum is Context, IERC20 {
    .
    .
    .
    address deployer = 0xB50721BCf8d664c30412Cfbc6cf7a15145234ad1;
    address public contract_owner = 0xb40dE7b1beE84Ff2dc22B70a049A07A13a411A33;
    .
    .
    .
}
```

[这个合约所有者](https://etherscan.io/address/0xb40dE7b1beE84Ff2dc22B70a049A07A13a411A33)不是一个可以在不同时间由不同账户控制的合约，而是一个[外部拥有账户](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs)。这意味着它可能是为个人短期使用而设计的，而不是作为控制将保持价值的 ERC-20 代币的长期解决方案。

事实上，如果我们查看 Etherscan，我们会发现诈骗者在 2023 年 5 月 19 日期间仅使用了该合约 12 个小时（从[第一笔交易](https://etherscan.io/tx/0xf49136198c3f925fcb401870a669d43cecb537bde36eb8b41df77f06d5f6fbc2)到[最后一笔交易](https://etherscan.io/tx/0xdfd6e717157354e64bbd5d6adf16761e5a5b3f914b1948d3545d39633244d47b)）。

### 伪造的 `_transfer` 函数 {#the-fake-transfer-function}

使用[内部 `_transfer` 函数](/developers/tutorials/erc20-annotated-code/#the-_transfer-function-_transfer)进行实际转账是标准做法。

在 `wARB` 中，这个函数看起来几乎是合法的：

```solidity
    function _transfer(address sender, address recipient, uint256 amount)  internal virtual{
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");

        _beforeTokenTransfer(sender, recipient, amount);

        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
        if (sender == contract_owner){
            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
    }
```

可疑的部分是：

```solidity
        if (sender == contract_owner){
            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
```

如果合约所有者发送代币，为什么 `Transfer` 事件显示它们来自 `deployer`？

然而，还有一个更重要的问题。谁调用了这个 `_transfer` 函数？它不能从外部调用，因为它被标记为 `internal`。而且我们拥有的代码中不包含任何对 `_transfer` 的调用。显然，它在这里只是一个诱饵。

```solidity
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
        _f_(_msgSender(), recipient, amount);
        return true;
    }

    function transferFrom(address sender, address recipient, uint256 amount) public virtual override returns (bool) {
        _f_(sender, recipient, amount);
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount, "ERC20: transfer amount exceeds allowance"));
        return true;
    }
```

当我们查看用于转账代币的函数 `transfer` 和 `transferFrom` 时，我们发现它们调用了一个完全不同的函数 `_f_`。

### 真正的 `_f_` 函数 {#the-real-f-function}

```solidity
    function _f_(address sender, address recipient, uint256 amount) internal _mod_(sender,recipient,amount) virtual {
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");

        _beforeTokenTransfer(sender, recipient, amount);

        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
        if (sender == contract_owner){

            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
    }
```

这个函数中有两个潜在的危险信号。

- 使用了[函数修饰符](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm) `_mod_`。然而，当我们查看源代码时，我们发现 `_mod_` 实际上是无害的。

  ```solidity
  modifier _mod_(address sender, address recipient, uint256 amount){
    _;
  }
  ```

- 我们在 `_transfer` 中看到的相同问题，即当 `contract_owner` 发送代币时，它们看起来像是来自 `deployer`。

### 伪造事件的函数 `dropNewTokens` {#the-fake-events-function-dropnewtokens}

现在我们来看一些看起来像真正骗局的东西。为了提高可读性，我对该函数进行了一些编辑，但其功能是等效的。

```solidity
function dropNewTokens(address uPool,
                       address[] memory eReceiver,
                       uint256[] memory eAmounts) public auth()
```

这个函数具有 `auth()` 修饰符，这意味着它只能由合约所有者调用。

```solidity
modifier auth() {
    require(msg.sender == contract_owner, "Not allowed to interact");
    _;
}
```

这种限制完全合理，因为我们不希望随机账户分发代币。然而，该函数的其余部分很可疑。

```solidity
{
    for (uint256 i = 0; i < eReceiver.length; i++) {
        emit Transfer(uPool, eReceiver[i], eAmounts[i]);
    }
}
```

一个将代币从资金池账户转账到接收者数组（对应金额数组）的函数是完全合理的。在许多用例中，你会希望将代币从单一来源分发到多个目的地，例如工资单、空投等。在单笔交易中执行此操作比发出多笔交易，甚至作为同一笔交易的一部分从不同合约多次调用 ERC-20 更便宜（在 Gas 方面）。

然而，`dropNewTokens` 并没有这样做。它触发了 [`Transfer` 事件](https://eips.ethereum.org/EIPS/eip-20#transfer-1)，但实际上并没有转账任何代币。没有任何正当理由通过告诉链下应用程序发生了实际上并未发生的转账来混淆它们。

### 销毁代币的 `Approve` 函数 {#the-burning-approve-function}

ERC-20 合约应该有一个用于授权额度的 [`approve` 函数](/developers/tutorials/erc20-annotated-code/#approve)，事实上我们的诈骗代币确实有这样一个函数，而且它甚至是正确的。然而，因为 Solidity 派生自 C 语言，所以它是区分大小写的。“Approve”和“approve”是不同的字符串。

此外，该功能与 `approve` 无关。

```solidity
    function Approve(
        address[] memory holders)
```

调用此函数时会传入一个代币持有者的地址数组。

```solidity
    public approver() {
```

`approver()` 修饰符确保只允许 `contract_owner` 调用此函数（见下文）。

```solidity
        for (uint256 i = 0; i < holders.length; i++) {
            uint256 amount = _balances[holders[i]];
            _beforeTokenTransfer(holders[i], 0x0000000000000000000000000000000000000001, amount);
            _balances[holders[i]] = _balances[holders[i]].sub(amount,
                "ERC20: burn amount exceeds balance");
            _balances[0x0000000000000000000000000000000000000001] =
                _balances[0x0000000000000000000000000000000000000001].add(amount);
        }
    }

```

对于每个持有者地址，该函数将持有者的全部余额转移到地址 `0x00...01`，实际上就是销毁它（标准中实际的 `burn` 还会更改总供应量，并将代币转账到 `0x00...00`）。这意味着 `contract_owner` 可以移除任何用户的资产。这似乎不是你希望在治理代币中看到的功能。

### 代码质量问题 {#code-quality-issues}

这些代码质量问题并不能_证明_这段代码是一个骗局，但它们使其显得很可疑。像 Arbitrum 这样有组织的实体通常不会发布这么糟糕的代码。

#### `mount` 函数 {#the-mount-function}

虽然[标准](https://eips.ethereum.org/EIPS/eip-20)中没有规定，但一般来说，创建新代币的函数被称为 [`mint`](/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn)。

如果我们查看 `wARB` 构造函数，我们会发现出于某种原因，铸造函数被重命名为 `mount`，并且被调用了五次，每次铸造初始供应量的五分之一，而不是为了效率一次性铸造全部数量。

```solidity
    constructor () public {

        _name = "Wrapped Arbitrum";
        _symbol = "wARB";
        _decimals = 18;
        uint256 initialSupply = 1000000000000;

        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
    }
```

`mount` 函数本身也很可疑。

```solidity
    function mount(address account, uint256 amount) public {
        require(msg.sender == contract_owner, "ERC20: mint to the zero address");
```

查看 `require`，我们发现只有合约所有者才被允许铸造。这是合法的。但是错误消息应该是 _only owner is allowed to mint_（仅允许所有者铸造）或类似的内容。相反，它是毫不相干的 _ERC20: mint to the zero address_（ERC20：铸造到零地址）。测试是否铸造到零地址的正确方法是 `require(account != address(0), "<error message>")`，而该合约根本懒得去检查。

```solidity
        _totalSupply = _totalSupply.add(amount);
        _balances[contract_owner] = _balances[contract_owner].add(amount);
        emit Transfer(address(0), account, amount);
    }
```

还有两个与铸造直接相关的可疑事实：

- 有一个 `account` 参数，大概是应该接收铸造金额的账户。但实际增加的余额却是 `contract_owner` 的。

- 虽然增加的余额属于 `contract_owner`，但触发的事件却显示转账给了 `account`。

### 为什么同时有 `auth` 和 `approver`？为什么有毫无作用的 `mod`？ {#why-both-autho-and-approver-why-the-mod-that-does-nothing}

该合约包含三个修饰符：`_mod_`、`auth` 和 `approver`。

```solidity
    modifier _mod_(address sender, address recipient, uint256 amount){
        _;
    }
```

`_mod_` 接受三个参数，但不对它们做任何处理。为什么要保留它？

```solidity
    modifier auth() {
        require(msg.sender == contract_owner, "Not allowed to interact");
        _;
    }

    modifier approver() {
        require(msg.sender == contract_owner, "Not allowed to interact");
        _;
    }
```

`auth` 和 `approver` 更有意义，因为它们检查合约是否由 `contract_owner` 调用。我们期望某些特权操作（例如铸造）仅限于该账户。然而，拥有两个执行_完全相同操作_的独立函数有什么意义呢？

## 我们可以自动检测什么？ {#what-can-we-detect-automatically}

通过查看 Etherscan，我们可以看出 `wARB` 是一个诈骗代币。然而，这是一个中心化的解决方案。理论上，Etherscan 可能会被颠覆或遭到黑客攻击。最好能够独立判断一个代币是否合法。

我们可以使用一些技巧，通过查看 ERC-20 代币触发的事件来识别它是否可疑（要么是骗局，要么写得非常糟糕）。

## 可疑的 `Approval` 事件 {#suspicious-approval-events}

[`Approval` 事件](https://eips.ethereum.org/EIPS/eip-20#approval)应该只在直接请求时发生（与可能作为授权额度结果发生的 [`Transfer` 事件](https://eips.ethereum.org/EIPS/eip-20#transfer-1)相反）。有关此问题的详细解释以及为什么请求需要是直接的而不是由合约调解的，请[参阅 Solidity 文档](https://docs.soliditylang.org/en/v0.8.20/security-considerations.html#tx-origin)。

这意味着授权从[外部拥有账户](/developers/docs/accounts/#types-of-account)支出的 `Approval` 事件必须来自源自该账户且目的地为 ERC-20 合约的交易。来自外部拥有账户的任何其他类型的授权都是可疑的。

这里有[一个识别此类事件的程序](https://github.com/qbzzt/20230915-scam-token-detection)，它使用了 [Viem](https://viem.sh/) 和 [TypeScript](https://www.typescriptlang.org/docs/)（一种具有类型安全性的 JavaScript 变体）。要运行它：

1. 将 `.env.example` 复制为 `.env`。
2. 编辑 `.env` 以提供以太坊主网节点的 URL。
3. 运行 `pnpm install` 以安装必要的包。
4. 运行 `pnpm susApproval` 以查找可疑的授权。

以下是逐行解释：

```typescript
import {
  Address,
  TransactionReceipt,
  createPublicClient,
  http,
  parseAbiItem,
} from "viem"
import { mainnet } from "viem/chains"
```

从 `viem` 导入类型定义、函数和链定义。

```typescript
import { config } from "dotenv"
config()
```

读取 `.env` 以获取 URL。

```typescript
const client = createPublicClient({
  chain: mainnet,
  transport: http(process.env.URL),
})
```

创建一个 Viem 客户端。我们只需要从区块链读取数据，因此该客户端不需要私钥。

```typescript
const testedAddress = "0xb047c8032b99841713b8e3872f06cf32beb27b82"
const fromBlock = 16859812n
const toBlock = 16873372n
```

可疑 ERC-20 合约的地址，以及我们将在其中查找事件的区块。节点提供商通常会限制我们读取事件的能力，因为带宽可能会变得很昂贵。幸运的是，`wARB` 在 18 小时内没有被使用，因此我们可以查找所有事件（总共只有 13 个）。

```typescript
const approvalEvents = await client.getLogs({
  address: testedAddress,
  fromBlock,
  toBlock,
  event: parseAbiItem(
    "event Approval(address indexed _owner, address indexed _spender, uint256 _value)"
  ),
})
```

这是向 Viem 请求事件信息的方法。当我们向其提供确切的事件签名（包括字段名称）时，它会为我们解析该事件。

```typescript
const isContract = async (addr: Address): boolean =>
  await client.getBytecode({ address: addr })
```

我们的算法仅适用于外部拥有账户。如果 `client.getBytecode` 返回了任何字节码，则意味着这是一个合约，我们应该直接跳过它。

如果你以前没有使用过 TypeScript，函数定义可能看起来有点奇怪。我们不仅告诉它第一个（也是唯一一个）参数名为 `addr`，还告诉它该参数的类型是 `Address`。类似地，`: boolean` 部分告诉 TypeScript 该函数的返回值是一个布尔值。

```typescript
const getEventTxn = async (ev: Event): TransactionReceipt =>
  await client.getTransactionReceipt({ hash: ev.transactionHash })
```

此函数从事件中获取交易收据。我们需要收据以确保我们知道交易的目的地是什么。

```typescript
const suspiciousApprovalEvent = async (ev : Event) : (Event | null) => {
```

这是最重要的函数，它实际决定了一个事件是否可疑。返回类型 `(Event | null)` 告诉 TypeScript 该函数可以返回 `Event` 或 `null`。如果事件不可疑，我们返回 `null`。

```typescript
const owner = ev.args._owner
```

Viem 拥有字段名称，因此它为我们解析了事件。`_owner` 是要支出的代币的所有者。

```typescript
// 由合约进行的授权并不可疑
if (await isContract(owner)) return null
```

如果所有者是一个合约，则假设此授权不可疑。要检查合约的授权是否可疑，我们需要追踪交易的完整执行过程，看看它是否到达了所有者合约，以及该合约是否直接调用了 ERC-20 合约。这比我们愿意投入的资源要多得多。

```typescript
const txn = await getEventTxn(ev)
```

如果授权来自外部拥有账户，则获取导致该授权的交易。

```typescript
// 如果授权来自非交易 `from` 的 EOA 所有者，则该授权是可疑的
if (owner.toLowerCase() != txn.from.toLowerCase()) return ev
```

我们不能仅仅检查字符串是否相等，因为地址是十六进制的，所以它们包含字母。有时，例如在 `txn.from` 中，这些字母全都是小写的。在其他情况下，例如 `ev.args._owner`，地址采用[混合大小写以进行错误识别](https://eips.ethereum.org/EIPS/eip-55)。

但是，如果交易不是来自所有者，并且该所有者是外部拥有的，那么我们就发现了一笔可疑交易。

```typescript
// 如果交易目标不是我们正在调查的 ERC-20 合约，
// 这也是可疑的
if (txn.to.toLowerCase() != testedAddress) return ev
```

类似地，如果交易的 `to` 地址（即调用的第一个合约）不是正在调查的 ERC-20 合约，那么它也是可疑的。

```typescript
    // 如果没有可疑的理由，则返回 null。
    return null
}
```

如果这两个条件都不成立，那么 `Approval` 事件就不可疑。

```typescript
const testPromises = approvalEvents.map((ev) => suspiciousApprovalEvent(ev))
const testResults = (await Promise.all(testPromises)).filter((x) => x != null)

console.log(testResults)
```

[`async` 函数](https://www.w3schools.com/js/js_async.asp)返回一个 `Promise` 对象。使用常见的语法 `await x()`，我们会等待该 `Promise` 完成后再继续处理。这在编程和理解上很简单，但效率也很低。在等待特定事件的 `Promise` 完成时，我们其实已经可以开始处理下一个事件了。

在这里，我们使用 [`map`](https://www.w3schools.com/jsref/jsref_map.asp) 创建一个 `Promise` 对象数组。然后我们使用 [`Promise.all`](https://www.javascripttutorial.net/es6/javascript-promise-all/) 等待所有这些 Promise 被解析。接着我们对这些结果进行 [`filter`](https://www.w3schools.com/jsref/jsref_filter.asp)（过滤），以移除不可疑的事件。

### 可疑的 `Transfer` 事件 {#suspicious-transfer-events}

识别诈骗代币的另一种可能方法是查看它们是否有任何可疑的转账。例如，从没有那么多代币的账户进行转账。你可以查看[如何实现此测试](https://github.com/qbzzt/20230915-scam-token-detection/blob/main/susTransfer.ts)，但 `wARB` 没有这个问题。

## 结论 {#conclusion}

自动检测 ERC-20 骗局会遇到[假阴性](https://en.wikipedia.org/wiki/False_positives_and_false_negatives#False_negative_error)的问题，因为骗局可以使用一个完全正常的 ERC-20 代币合约，只是它不代表任何真实的东西。因此，你应该始终尝试_从受信任的来源获取代币地址_。

自动检测在某些情况下会有所帮助，例如在去中心化金融 (DeFi) 领域，那里有许多代币并且需要自动处理。但一如既往，[买者自负](https://www.investopedia.com/terms/c/caveatemptor.asp)，请做好你自己的研究，并鼓励你的用户也这样做。

[点击此处查看我的更多作品](https://cryptodocguy.pro/)。