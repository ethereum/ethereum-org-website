---
title: "诈骗代币使用的一些伎俩以及如何检测它们"
description: 在本教程中，我们将剖析一个诈骗代币，了解诈骗者使用的一些伎俩、他们如何实施这些伎俩，以及我们如何检测它们。
author: Ori Pomerantz
tags:
  [
    "诈骗",
    "Solidity",
    "erc-20",
    "javascript",
    "typescript"
  ]
skill: intermediate
published: 2023-09-15
lang: zh
---

在本教程中，我们将剖析[一个诈骗代币](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code)，了解诈骗者使用的一些伎俩以及他们如何实施这些伎俩。 在本教程结束时，你将对 ERC-20 代币合约、其功能以及为何有必要保持怀疑态度有更全面的了解。 然后，我们查看该诈骗代币发出的事件，并了解如何自动识别它不是合法代币。

## 诈骗代币——它们是什么、人们为什么发行诈骗代币，以及如何避免它们 {#scam-tokens}

以太坊最常见的用途之一是由一个团队来打造一种可以交易的代币，在某种意义上是他们自己的货币。 然而，任何存在可以带来价值的合法使用场景的地方，就会有试图窃取那些价值的犯罪分子。

你可以从用户角度在 [ethereum.org 的其他地方](/guides/how-to-id-scam-tokens/)阅读更多关于此主题的内容。 本教程重点剖析一个诈骗代币，了解它是如何制作的以及如何被检测出来。

### 我如何知道 wARB 是个骗局？ {#warb-scam}

我们剖析的代币是 [wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code)，它伪装成与合法的 [ARB 代币](https://etherscan.io/token/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1)等价。

知道哪个是合法代币的最简单方法是查看其发行组织 [Arbitrum](https://arbitrum.foundation/)。 合法地址已在[他们的相关文档](https://docs.arbitrum.foundation/deployment-addresses#token)中指定。

### 为什么源代码是可用的？ {#why-source}

通常，我们期望试图诈骗他人的人会保密，事实上，许多诈骗代币的代码都不可用（例如，[这个](https://optimistic.etherscan.io/token/0x15992f382d8c46d667b10dc8456dc36651af1452#code)和[这个](https://optimistic.etherscan.io/token/0x026b623eb4aada7de37ef25256854f9235207178#code)）。

然而，合法代币通常会公布其源代码，因此为了显得合法，诈骗代币的作者有时也会这样做。 [wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code) 是那些源代码可用的代币之一，这使得理解它变得更容易。

虽然合约部署者可以选择是否公布源代码，但他们_不能_公布错误的源代码。 区块浏览器独立编译提供的源代码，如果得不到完全相同的字节码，它就会拒绝该源代码。 [你可以在 Etherscan 网站上阅读更多相关内容](https://etherscan.io/verifyContract)。

## 与合法 ERC-20 代币的比较 {#compare-legit-erc20}

我们将把这个代币与合法的 ERC-20 代币进行比较。 如果你不熟悉合法 ERC-20 代币通常是如何编写的，请[参阅本教程](/developers/tutorials/erc20-annotated-code/)。

### 特权地址的常量 {#constants-for-privileged-addresses}

合约有时需要特权地址。 为长期使用而设计的合约允许一些特权地址更改这些地址，例如，为了能够使用新的多签合约。 有几种方法可以做到这一点。

[`HOP` 代币合约](https://etherscan.io/address/0xc5102fe9359fd9a28f877a67e36b0f050d81a3cc#code) 使用 [`Ownable`](https://docs.openzeppelin.com/contracts/2.x/access-control#ownership-and-ownable) 模式。 特权地址保存在存储中，在一个名为 `_owner` 的字段中（参见第三个文件 `Ownable.sol`）。

```solidity
abstract contract Ownable is Context {
    address private _owner;
    .
    .
    .
}
```

[`ARB` 代币合约](https://etherscan.io/address/0xad0c361ef902a7d9851ca7dcc85535da2d3c6fc7#code)没有直接的特权地址。 然而，它不需要一个。 它位于[地址 `0xb50721bcf8d664c30412cfbc6cf7a15145234ad1`](https://etherscan.io/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1#code) 的一个 [`proxy`](https://docs.openzeppelin.com/contracts/5.x/api/proxy) 之后。 该合约有一个特权地址（参见第四个文件 `ERC1967Upgrade.sol`），可用于升级。

```solidity
    /**
     * @dev 在 EIP1967 管理员时隙中存储一个新地址。
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

[此合约所有者](https://etherscan.io/address/0xb40dE7b1beE84Ff2dc22B70a049A07A13a411A33)不是一个可以在不同时间由不同帐户控制的合约，而是一个[外部所有的帐户](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs)。 这意味着它可能是为个人短期使用而设计的，而不是作为控制一个将保持有价值的 ERC-20 的长期解决方案。

事实上，如果我们查看 Etherscan，我们会发现诈骗者在 2023 年 5 月 19 日期间仅使用了该合约 12 小时（从[第一笔交易](https://etherscan.io/tx/0xf49136198c3f925fcb401870a669d43cecb537bde36eb8b41df77f06d5f6fbc2)到[最后一笔交易](https://etherscan.io/tx/0xdfd6e717157354e64bbd5d6adf16761e5a5b3f914b1948d3545d39633244d47b)）。

### 虚假的 `_transfer` 函数 {#the-fake-transfer-function}

标准做法是使用[一个内部的 `_transfer` 函数](/developers/tutorials/erc20-annotated-code/#the-_transfer-function-_transfer)来进行实际的转账。

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

然而，还有一个更重要的问题。 谁调用这个 `_transfer` 函数？ 它不能从外部调用，它被标记为 `internal`。 而且我们拥有的代码不包含任何对 `_transfer` 的调用。 很明显，它在这里只是个诱饵。

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

当我们查看用于转账代币的函数 `transfer` 和 `transferFrom` 时，我们看到它们调用了一个完全不同的函数 `_f_`。

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

- 使用了[函数修饰符](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm) `_mod_`。 然而，当我们查看源代码时，我们发现 `_mod_` 实际上是无害的。

  ```solidity
  modifier _mod_(address sender, address recipient, uint256 amount){
    _;
  }
  ```

- 我们在 `_transfer` 中看到的同样问题，即当 `contract_owner` 发送代币时，它们似乎来自 `deployer`。

### 虚假事件函数 `dropNewTokens` {#the-fake-events-function-dropNewTokens}

现在我们来看一个看起来像真正骗局的东西。 为了便于阅读，我对函数做了一些编辑，但功能上是等效的。

```solidity
function dropNewTokens(address uPool,
                       address[] memory eReceiver,
                       uint256[] memory eAmounts) public auth()
```

这个函数有 `auth()` 修饰符，这意味着它只能由合约所有者调用。

```solidity
modifier auth() {
    require(msg.sender == contract_owner, "Not allowed to interact");
    _;
}
```

这个限制完全合理，因为我们不希望随机帐户分发代币。 然而，函数的其余部分是可疑的。

```solidity
{
    for (uint256 i = 0; i < eReceiver.length; i++) {
        emit Transfer(uPool, eReceiver[i], eAmounts[i]);
    }
}
```

一个将资金从池子帐户转账到一个接收者数组（包含金额数组）的函数是完全合理的。 在许多用例中，你会希望将代币从单一来源分发到多个目的地，例如工资发放、空投等。 在单笔交易中完成比发行多笔交易更便宜（在燃料方面），甚至比在同一笔交易中从不同的合约多次调用 ERC-20 更便宜。

然而，`dropNewTokens` 并没有这样做。 它会发出 [`Transfer` 事件](https://eips.ethereum.org/EIPS/eip-20#transfer-1)，但实际上并不转账任何代币。 没有正当理由通过告知脱链应用一笔并未真正发生的转账来迷惑它们。

### 销毁 `Approve` 函数 {#the-burning-approve-function}

ERC-20 合约应该有一个用于授权的 [`approve` 函数](/developers/tutorials/erc20-annotated-code/#approve)，我们的诈骗代币确实有这样一个函数，而且它甚至是正确的。 然而，由于 Solidity 源于 C，它是区分大小写的。 “Approve”和“approve”是不同的字符串。

此外，该功能与 `approve` 无关。

```solidity
    function Approve(
        address[] memory holders)
```

此函数被调用时，会传入一个代币持有者的地址数组。

```solidity
    public approver() {
```

`approver()` 修饰符确保只有 `contract_owner` 可以调用此函数（见下文）。

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

对于每个持有者地址，该函数将持有者的全部余额转移到地址 `0x00...01`，从而有效地销毁它（标准中的实际 `burn` 也会更改总供应量，并将代币转账到 `0x00...00`）。 这意味着 `contract_owner` 可以移除任何用户的资产。 这看起来不像是你希望在治理代币中拥有的功能。

### 代码质量问题 {#code-quality-issues}

这些代码质量问题并不能_证明_这个代码是骗局，但它们让它看起来很可疑。 像 Arbitrum 这样的有组织的公司通常不会发布这么糟糕的代码。

#### `mount` 函数 {#the-mount-function}

虽然[标准](https://eips.ethereum.org/EIPS/eip-20)中没有规定，但一般来说，创建新代币的函数被称为 [`mint`](https://ethereum.org/el/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn)。

如果我们查看 `wARB` 的构造函数，我们会发现 mint 函数由于某种原因被重命名为 `mount`，并且被调用五次，每次使用初始供应量的五分之一，而不是为了效率一次性处理全部数量。

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

查看 `require`，我们发现只有合约所有者被允许铸币。 这是合法的。 但是错误信息应该是_只有所有者才能铸币_或类似的东西。 相反，它使用了不相关的 _ERC20: mint to the zero address_。 检查是否铸币到零地址的正确测试是 `require(account != address(0), "<error message>")`，但该合约从未费心去检查。

```solidity
        _totalSupply = _totalSupply.add(amount);
        _balances[contract_owner] = _balances[contract_owner].add(amount);
        emit Transfer(address(0), account, amount);
    }
```

还有两个与铸币直接相关的可疑事实：

- 有一个 `account` 参数，大概是应该接收铸币数量的帐户。 但增加的余额实际上是 `contract_owner` 的。

- 虽然增加的余额属于 `contract_owner`，但发出的事件却显示了一笔向 `account` 的转账。

### 为什么同时有 `auth` 和 `approver`？ 为什么 `mod` 什么都不做？ {#why-both-autho-and-approver-why-the-mod-that-does-nothing}

这个合约包含三个修饰符：`_mod_`、`auth` 和 `approver`。

```solidity
    modifier _mod_(address sender, address recipient, uint256 amount){
        _;
    }
```

`_mod_` 接收三个参数，但不对它们做任何处理。 为什么要有它？

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

`auth` 和 `approver` 更合理，因为它们检查合约是否由 `contract_owner` 调用。 我们期望某些特权操作，例如铸币，仅限于该帐户。 然而，设置两个功能_完全相同的_独立函数有什么意义呢？

## 我们可以自动检测到什么？ {#what-can-we-detect-automatically}

通过查看 Etherscan，我们可以看到 `wARB` 是一个诈骗代币。 然而，这是一个中心化的解决方案。 理论上，Etherscan 可能会被颠覆或黑客攻击。 最好能够独立判断一个代币是否合法。

我们可以通过查看它们发出的事件来使用一些技巧来识别一个 ERC-20 代币是否可疑（无论是骗局还是写得非常糟糕）。

## 可疑的 `Approval` 事件 {#suspicious-approval-events}

[`Approval` 事件](https://eips.ethereum.org/EIPS/eip-20#approval)只应在直接请求下发生（与 [`Transfer` 事件](https://eips.ethereum.org/EIPS/eip-20#transfer-1) 不同，后者可能因授权而发生）。 关于此问题的详细解释以及为何请求需要是直接的，而不是由合约介导，请参阅 [Solidity 文档](https://docs.soliditylang.org/en/v0.8.20/security-considerations.html#tx-origin)。

这意味着批准从[外部所有的帐户](/developers/docs/accounts/#types-of-account)支出的 `Approval` 事件必须来自源于该帐户且目的地为 ERC-20 合约的交易。 来自外部所有的帐户的任何其他类型的批准都是可疑的。

这里有一个[识别这类事件的程序](https://github.com/qbzzt/20230915-scam-token-detection)，它使用了 [viem](https://viem.sh/) 和 [TypeScript](https://www.typescriptlang.org/docs/)，这是一种具有类型安全的 JavaScript 变体。 要运行它：

1. 将 `.env.example` 复制到 `.env`。
2. 编辑 `.env` 以提供以太坊主网节点的 URL。
3. 运行 `pnpm install` 以安装必要的包。
4. 运行 `pnpm susApproval` 以查找可疑的批准。

下面是逐行解释：

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

创建一个 Viem 客户端。 我们只需要从区块链读取数据，所以这个客户端不需要私钥。

```typescript
const testedAddress = "0xb047c8032b99841713b8e3872f06cf32beb27b82"
const fromBlock = 16859812n
const toBlock = 16873372n
```

可疑 ERC-20 合约的地址，以及我们将在其中查找事件的区块。 节点提供商通常会限制我们读取事件的能力，因为带宽可能会变得昂贵。 幸运的是，`wARB` 在 18 小时内没有被使用，所以我们可以查找所有事件（总共只有 13 个）。

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

这是向 Viem 请求事件信息的方式。 当我们向它提供确切的事件签名，包括字段名称时，它会为我们解析事件。

```typescript
const isContract = async (addr: Address): boolean =>
  await client.getBytecode({ address: addr })
```

我们的算法仅适用于外部所有的帐户。 如果 `client.getBytecode` 返回任何字节码，这意味着这是一个合约，我们应该直接跳过它。

如果你以前没有使用过 TypeScript，函数定义可能看起来有点奇怪。 我们不仅告诉它第一个（也是唯一的）参数叫做 `addr`，还告诉它类型是 `Address`。 同样，`: boolean` 部分告诉 TypeScript 该函数的返回值是布尔值。

```typescript
const getEventTxn = async (ev: Event): TransactionReceipt =>
  await client.getTransactionReceipt({ hash: ev.transactionHash })
```

这个函数从一个事件中获取交易收据。 我们需要收据来确保我们知道交易的目的地是什么。

```typescript
const suspiciousApprovalEvent = async (ev : Event) : (Event | null) => {
```

这是最重要的函数，它实际决定了一个事件是否可疑。 返回类型 `(Event | null)` 告诉 TypeScript 这个函数可以返回一个 `Event` 或 `null`。 如果事件不可疑，我们返回 `null`。

```typescript
const owner = ev.args._owner
```

Viem 有字段名称，所以它为我们解析了事件。 `_owner` 是要花费的代币的所有者。

```typescript
// 合约的批准不可疑
if (await isContract(owner)) return null
```

如果所有者是合约，则假定此批准不可疑。 要检查合约的批准是否可疑，我们需要追踪交易的完整执行过程，看它是否到达了所有者合约，以及该合约是否直接调用了 ERC-20 合约。 这比我们想做的要消耗更多资源。

```typescript
const txn = await getEventTxn(ev)
```

如果批准来自外部所有的帐户，获取导致它的交易。

```typescript
// 如果批准来自不是交易 `from` 的 EOA 所有者，则该批准是可疑的
if (owner.toLowerCase() != txn.from.toLowerCase()) return ev
```

我们不能只检查字符串是否相等，因为地址是十六进制的，所以它们包含字母。 有时，例如在 `txn.from` 中，这些字母都是小写的。 在其他情况下，例如 `ev.args._owner`，地址是[用于错误识别的混合大小写](https://eips.ethereum.org/EIPS/eip-55)。

但是如果交易不是来自所有者，并且该所有者是外部所有的，那么我们就有一个可疑的交易。

```typescript
// 如果交易目的地不是我们正在
// 调查的 ERC-20 合约，那也是可疑的
if (txn.to.toLowerCase() != testedAddress) return ev
```

同样，如果交易的 `to` 地址，即第一个被调用的合约，不是正在调查的 ERC-20 合约，那么它就是可疑的。

```typescript
    // 如果没有理由怀疑，则返回 null。
    return null
}
```

如果两个条件都不成立，那么 `Approval` 事件就不可疑。

```typescript
const testPromises = approvalEvents.map((ev) => suspiciousApprovalEvent(ev))
const testResults = (await Promise.all(testPromises)).filter((x) => x != null)

console.log(testResults)
```

[`async` 函数](https://www.w3schools.com/js/js_async.asp)返回一个 `Promise` 对象。 使用常见语法 `await x()`，我们在继续处理之前等待该 `Promise` 完成。 这在编程和理解上很简单，但效率也很低。 在等待特定事件的 `Promise` 完成时，我们已经可以开始处理下一个事件了。

这里我们使用 [`map`](https://www.w3schools.com/jsref/jsref_map.asp) 来创建一个 `Promise` 对象数组。 然后我们使用 [`Promise.all`](https://www.javascripttutorial.net/es6/javascript-promise-all/) 等待所有这些 promise 完成。 然后我们 [`filter`](https://www.w3schools.com/jsref/jsref_filter.asp) 这些结果以移除不可疑的事件。

### 可疑的 `Transfer` 事件 {#suspicious-transfer-events}

另一种识别诈骗代币的可能方法是查看它们是否有任何可疑的转账。 例如，从没有那么多代币的帐户进行的转账。 你可以看到[如何实现这个测试](https://github.com/qbzzt/20230915-scam-token-detection/blob/main/susTransfer.ts)，但 `wARB` 没有这个问题。

## 结论 {#conclusion}

ERC-20 诈骗的自动检测存在[假阴性](https://en.wikipedia.org/wiki/False_positives_and_false_negatives#False_negative_error)问题，因为骗局可以使用一个完全正常的 ERC-20 代币合约，而这个合约只是不代表任何真实的东西。 所以你应该总是尝试_从可信来源获取代币地址_。

自动检测在某些情况下可以提供帮助，例如在 DeFi 组件中，那里有许多代币，需要自动处理。 但一如既往，[买家自负](https://www.investopedia.com/terms/c/caveatemptor.asp)，自己做研究，并鼓励你的用户也这样做。

[点击此处查看我的更多作品](https://cryptodocguy.pro/)。
