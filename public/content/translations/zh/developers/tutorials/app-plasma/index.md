---
title: 编写一个保护隐私的特定应用等离子体
description: 在本教程中，我们将构建一个用于存款的半秘密银行。该银行是一个中心化组件；它知道每个用户的余额。然而，这些信息并不存储在链上。相反，银行会发布状态的哈希。每次发生交易时，银行都会发布新的哈希，以及一个零知识证明，证明它有一个已签名的交易将哈希状态更改为新状态。阅读本教程后，你不仅会了解如何使用零知识证明，还会了解为什么要使用它们以及如何安全地使用它们。
author: 奥里·波梅兰茨
tags:
  - 零知识
  - 服务器
  - 链下
  - 隐私
skill: advanced
breadcrumb: 特定应用等离子体
lang: zh
published: 2025-10-15
---
## 简介 {#introduction}

与[汇总](/developers/docs/scaling/zk-rollups/)相反，[等离子体](/developers/docs/scaling/plasma)使用以太坊主网来保证完整性，但不保证可用性。在本文中，我们将编写一个行为类似于等离子体的应用程序，由以太坊保证完整性（没有未经授权的更改），但不保证可用性（中心化组件可能会宕机并使整个系统瘫痪）。

我们在这里编写的应用程序是一个保护隐私的银行。不同的地址拥有带有余额的账户，它们可以向其他账户发送资金（ETH）。银行发布状态（账户及其余额）和交易的哈希，但将实际余额保留在链下，以保持其隐私。

## 设计 {#design}

这不是一个生产就绪的系统，而是一个教学工具。因此，在编写时做了一些简化的假设。

- 固定的账户池。账户数量是特定的，每个账户属于一个预定的地址。这使得系统简单得多，因为在零知识证明中很难处理可变大小的数据结构。对于生产就绪的系统，我们可以使用 [默克尔根](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) 作为状态哈希，并为所需的余额提供默克尔证明。

- 内存存储。在生产系统上，我们需要将所有账户余额写入磁盘，以便在重启时保留它们。在这里，如果信息丢失也没关系。

- 仅限转账。生产系统需要一种将资产存入银行并提取的方法。但这里的目的只是为了说明概念，因此该银行仅限于转账。

### 零知识证明 {#zero-knowledge-proofs}

在基础层面上，零知识证明表明证明者知道某些数据 _Data<sub>private</sub>_，使得某些公开数据 _Data<sub>public</sub>_ 和 _Data<sub>private</sub>_ 之间存在关系 _Relationship_。验证者知道 _Relationship_ 和 _Data<sub>public</sub>_。

为了保护隐私，我们需要状态和交易是私密的。但为了确保完整性，我们需要状态的 [密码学哈希](https://en.wikipedia.org/wiki/Cryptographic_hash_function) 是公开的。为了向提交交易的人证明这些交易确实发生了，我们还需要发布交易哈希。

在大多数情况下，_Data<sub>private</sub>_ 是零知识证明程序的输入，而 _Data<sub>public</sub>_ 是输出。

_Data<sub>private</sub>_ 中的这些字段：

- _State<sub>n</sub>_，旧状态
- _State<sub>n+1</sub>_，新状态
- _Transaction_，将旧状态更改为新状态的交易。此交易需要包含以下字段：
  - 接收转账的 _Destination address_（目标地址）
  - 正在转账的 _Amount_（金额）
  - _Nonce_（随机数），以确保每笔交易只能处理一次。
    源地址不需要在交易中，因为它可以从签名中恢复。
- _Signature_，授权执行交易的签名。在我们的例子中，唯一被授权执行交易的地址是源地址。由于我们的零知识系统的工作方式，除了以太坊签名之外，我们还需要账户的公钥。

以下是 _Data<sub>public</sub>_ 中的字段：

- _Hash(State<sub>n</sub>)_，旧状态的哈希
- _Hash(State<sub>n+1</sub>)_，新状态的哈希
- _Hash(Transaction)_，将状态从 _State<sub>n</sub>_ 更改为 _State<sub>n+1</sub>_ 的交易哈希。

该关系检查几个条件：

- 公开哈希确实是私有字段的正确哈希。
- 将交易应用于旧状态时，会产生新状态。
- 签名来自交易的源地址。

由于密码学哈希函数的特性，证明这些条件足以确保完整性。

### 数据结构 {#data-structures}

主要的数据结构是服务器持有的状态。对于每个账户，服务器会跟踪账户余额和一个 [随机数](https://en.wikipedia.org/wiki/Cryptographic_nonce)，用于防止 [重放攻击](https://en.wikipedia.org/wiki/Replay_attack)。

### 组件 {#components}

该系统需要两个组件：

- _服务器_，接收交易，处理它们，并将哈希连同零知识证明一起发布到链上。
- _智能合约_，存储哈希并验证零知识证明，以确保状态转换是合法的。

### 数据和控制流 {#flows}

以下是各个组件进行通信以实现从一个账户转账到另一个账户的方式。

1. Web 浏览器提交一笔已签名的交易，请求从签名者的账户转账到另一个账户。

2. 服务器验证交易是否有效：

   - 签名者在银行中有一个余额充足的账户。
   - 接收者在银行中有一个账户。

3. 服务器通过从签名者的余额中减去转账金额并将其添加到接收者的余额中来计算新状态。

4. 服务器计算一个零知识证明，证明状态更改是有效的。

5. 服务器向以太坊提交一笔交易，其中包括：

   - 新状态哈希
   - 交易哈希（以便交易发送者可以知道它已被处理）
   - 证明向新状态转换有效的零知识证明

6. 智能合约验证零知识证明。

7. 如果零知识证明验证通过，智能合约将执行以下操作：
   - 将当前状态哈希更新为新状态哈希
   - 触发一个包含新状态哈希和交易哈希的日志条目

### 工具 {#tools}

对于客户端代码，我们将使用 [Vite](https://vite.dev/)、[React](https://react.dev/)、[Viem](https://viem.sh/) 和 [Wagmi](https://wagmi.sh/)。这些都是行业标准工具；如果你对它们不熟悉，可以使用 [本教程](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/)。

服务器的大部分代码是使用 [Node](https://nodejs.org/en) 用 JavaScript 编写的。零知识部分是用 [Noir](https://noir-lang.org/) 编写的。我们需要 `1.0.0-beta.10` 版本，因此在 [按照说明安装 Noir](https://noir-lang.org/docs/getting_started/quick_start) 后，运行：

```
noirup -v 1.0.0-beta.10
```

我们使用的区块链是 `anvil`，这是一个本地测试区块链，属于 [Foundry](https://getfoundry.sh/introduction/installation) 的一部分。

## 实现 {#implementation}

由于这是一个复杂的系统，我们将分阶段进行实现。

### 第 1 阶段 - 手动零知识 {#stage-1}

在第一阶段，我们将在浏览器中对交易进行签名，然后手动将信息提供给零知识证明。零知识代码期望在 `server/noir/Prover.toml` 中获取该信息（在[此处](https://noir-lang.org/docs/getting_started/project_breakdown#provertoml-1)有记录）。

要查看实际效果：

1. 确保你已安装 [Node](https://nodejs.org/en/download) 和 [Noir](https://noir-lang.org/install)。最好将它们安装在 UNIX 系统上，例如 macOS、Linux 或 [WSL](https://learn.microsoft.com/en-us/windows/wsl/install)。

2. 下载第 1 阶段代码并启动 Web 服务器以提供客户端代码。

   ```sh
   git clone https://github.com/qbzzt/250911-zk-bank.git -b 01-manual-zk
   cd 250911-zk-bank
   cd client
   npm install
   npm run dev
   ```

   这里需要 Web 服务器的原因是，为了防止某些类型的欺诈，许多钱包（例如梅塔马斯克）不接受直接从磁盘提供的文件。

3. 打开带有钱包的浏览器。

4. 在钱包中，输入新的助记词。请注意，这将删除你现有的助记词，因此_请确保你已备份_。

   助记词是 `test test test test test test test test test test test junk`，这是 anvil 的默认测试助记词。

5. 浏览至[客户端代码](http://localhost:5173/)。

6. 连接到钱包并选择你的目标账户和金额。

7. 点击 **Sign**（签名）并对交易进行签名。

8. 在 **Prover.toml** 标题下，你会找到一些文本。将 `server/noir/Prover.toml` 替换为该文本。

9. 执行零知识证明。

   ```sh
   cd ../server/noir
   nargo execute
   ```

   输出应类似于

      ```
ori@CryptoDocGuy:~/noir/250911-zk-bank/server/noir$ nargo execute

   [zkBank] Circuit witness successfully solved
   [zkBank] Witness saved to target/zkBank.gz
   [zkBank] Circuit output: (0x199aa62af8c1d562a6ec96e66347bf3240ab2afb5d022c895e6bf6a5e617167b, 0x0cfc0a67cb7308e4e9b254026b54204e34f6c8b041be207e64c5db77d95dd82d, 0x450cf9da6e180d6159290554ae3d8787, 0x6d8bc5a15b9037e52fb59b6b98722a85)
   ```

10. 将最后两个值与你在 Web 浏览器上看到的哈希进行比较，以查看消息是否被正确哈希。

#### `server/noir/Prover.toml` {#server-noir-prover-toml}

[此文件](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml)显示了 Noir 期望的信息格式。

```toml
message="send 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 500 finney (milliEth) 0                             "
```

消息采用文本格式，这使得用户易于理解（在签名时这是必要的），也便于 Noir 代码进行解析。金额以芬尼为单位报价，一方面可以实现小数转账，另一方面也易于阅读。最后一个数字是[随机数](https://en.wikipedia.org/wiki/Cryptographic_nonce)。

该字符串长 100 个字符。零知识证明不能很好地处理可变大小的数据，因此通常需要填充数据。

```toml
pubKeyX=["0x83",...,"0x75"]
pubKeyY=["0x35",...,"0xa5"]
signature=["0xb1",...,"0x0d"]
```

这三个参数是固定大小的字节数组。

```toml
[[accounts]]
address="0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
balance=100_000
nonce=0

[[accounts]]
address="0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
balance=100_000
nonce=0
```

这是指定结构体数组的方法。对于每个条目，我们指定地址、余额（以 milliETH 即[芬尼](https://cryptovalleyjournal.com/glossary/finney/)为单位）以及下一个随机数值。

#### `client/src/Transfer.tsx` {#client-src-transfer-tsx}

[此文件](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/client/src/Transfer.tsx)实现了客户端处理并生成了 `server/noir/Prover.toml` 文件（包含零知识参数的文件）。

以下是更有趣部分的解释。

```tsx
export default attrs =>  {
```

此函数创建了 `Transfer` React 组件，其他文件可以导入该组件。

```tsx
  const accounts = [
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
  ]
```

这些是账户地址，即由 `test ... test junk` 助记词创建的地址。如果你想使用自己的地址，只需修改此定义即可。

```tsx
  const account = useAccount()
  const wallet = createWalletClient({
    transport: custom(window.ethereum!)
  })
```

这些 [Wagmi 钩子](https://wagmi.sh/react/api/hooks)让我们能够访问 [Viem](https://viem.sh/) 库和钱包。

```tsx
  const message = `send ${toAccount} ${ethAmount*1000} finney (milliEth) ${nonce}`.padEnd(100, " ")
```

这是用空格填充的消息。每次 [`useState`](https://react.dev/reference/react/useState) 变量之一发生变化时，组件都会重新绘制并更新 `message`。

```tsx
  const sign = async () => {
```

当用户点击 **Sign**（签名）按钮时，将调用此函数。消息会自动更新，但签名需要用户在钱包中批准，除非需要，否则我们不想请求批准。

```tsx
    const signature = await wallet.signMessage({
        account: fromAccount,
        message,
    })
```

请求钱包[对消息进行签名](https://viem.sh/docs/accounts/local/signMessage)。 

```tsx
    const hash = hashMessage(message)
```

获取消息哈希。将其提供给用户以进行调试（针对 Noir 代码）是很有帮助的。 

```tsx
    const pubKey = await recoverPublicKey({
        hash,
        signature
    })
```

[获取公钥](https://viem.sh/docs/utilities/recoverPublicKey)。这是 [Noir `ecrecover`](https://github.com/colinnielsen/ecrecover-noir) 函数所必需的。

```tsx
    setSignature(signature)
    setHash(hash)
    setPubKey(pubKey)
```

设置状态变量。这样做会重新绘制组件（在 `sign` 函数退出后），并向用户显示更新后的值。

```tsx
    let proverToml = `
```

`Prover.toml` 的文本。

```tsx
message="${message}"

pubKeyX=${hexToArray(pubKey.slice(4,4+2*32))}
pubKeyY=${hexToArray(pubKey.slice(4+2*32))}
```

Viem 以 65 字节的十六进制字符串形式向我们提供公钥。第一个字节是 `0x04`，即版本标记。其后是公钥 `x` 的 32 个字节，然后是公钥 `y` 的 32 个字节。

然而，Noir 期望以两个字节数组的形式获取此信息，一个用于 `x`，另一个用于 `y`。在客户端此处解析它比作为零知识证明的一部分更容易。

请注意，这通常是零知识中的良好实践。零知识证明内部的代码成本很高，因此任何可以在零知识证明外部完成的处理_都应该_在零知识证明外部完成。

```tsx
signature=${hexToArray(signature.slice(2,-2))}
```

签名也以 65 字节的十六进制字符串形式提供。然而，最后一个字节仅用于恢复公钥。由于公钥已经提供给 Noir 代码，我们不需要它来验证签名，并且 Noir 代码也不要求它。

```tsx
${accounts.map(accountInProverToml).reduce((a,b) => a+b, "")}
`
```

提供账户。

```tsx
    setProverToml(proverToml)
  }

  return (
    <>
        <h2>Transfer</h2>
```

这是组件的 HTML（更准确地说是 [JSX](https://react.dev/learn/writing-markup-with-jsx)）格式。

#### `server/noir/src/main.nr` {#server-noir-src-main-nr}

[此文件](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/src/main.nr)是实际的零知识代码。

```
use std::hash::pedersen_hash;
```

[Noir 标准库](https://noir-lang.org/docs/noir/standard_library/cryptographic_primitives/hashes#pedersen_hash)提供了 [Pedersen 哈希](https://rya-sge.github.io/access-denied/2024/05/07/pedersen-hash-function/)。零知识证明通常使用此哈希函数。与标准哈希函数相比，在[算术电路](https://rareskills.io/post/arithmetic-circuit)内部计算它要容易得多。

```
use keccak256::keccak256;
use dep::ecrecover;
```

这两个函数是外部库，在 [`Nargo.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Nargo.toml) 中定义。它们正如其名，一个是计算 [keccak256 哈希](https://emn178.github.io/online-tools/keccak_256.html)的函数，另一个是验证以太坊签名并恢复签名者以太坊地址的函数。

```
global ACCOUNT_NUMBER : u32 = 5;
```

Noir 受 [Rust](https://www.rust-lang.org/) 启发。默认情况下，变量是常量。这就是我们定义全局配置常量的方式。具体来说，`ACCOUNT_NUMBER` 是我们存储的账户数量。

名为 `u<number>` 的数据类型是该位数的无符号整数。唯一支持的类型是 `u8`、`u16`、`u32`、`u64` 和 `u128`。

```
global FLAT_ACCOUNT_FIELDS : u32 = 2;
```

此变量用于账户的 Pedersen 哈希，如下所述。

```
global MESSAGE_LENGTH : u32 = 100;
```

如上所述，消息长度是固定的。它在此处指定。

```
global ASCII_MESSAGE_LENGTH : [u8; 3] = [0x31, 0x30, 0x30];
global HASH_BUFFER_SIZE : u32 = 26+3+MESSAGE_LENGTH;
```

[EIP-191 签名](https://eips.ethereum.org/EIPS/eip-191)需要一个带有 26 字节前缀的缓冲区，后跟 ASCII 格式的消息长度，最后是消息本身。

```
struct Account {
    balance: u128,
    address: Field,
    nonce: u32,
}
```

我们存储的关于账户的信息。[`Field`](https://noir-lang.org/docs/noir/concepts/data_types/fields) 是一个数字，通常最多 253 位，可以直接在实现零知识证明的[算术电路](https://rareskills.io/post/arithmetic-circuit)中使用。在这里，我们使用 `Field` 来存储 160 位的以太坊地址。

```
struct TransferTxn {
    from: Field,
    to: Field,
    amount: u128,
    nonce: u32
}
```

我们为转账交易存储的信息。

```
fn flatten_account(account: Account) -> [Field; FLAT_ACCOUNT_FIELDS] {
```

函数定义。参数是 `Account` 信息。结果是一个 `Field` 变量数组，其长度为 `FLAT_ACCOUNT_FIELDS`

```
let flat = [
        account.address,
        ((account.balance << 32) + account.nonce.into()).into(),
    ];
```

数组中的第一个值是账户地址。第二个值包括余额和随机数。`.into()` 调用将数字更改为其所需的数据类型。`account.nonce` 是一个 `u32` 值，但要将其添加到 `account.balance << 32`（一个 `u128` 值）中，它需要是一个 `u128`。这就是第一个 `.into()` 的作用。第二个调用将 `u128` 结果转换为 `Field`，以便它适合放入数组中。

```
flat
}
```

在 Noir 中，函数只能在末尾返回值（没有提前返回）。要指定返回值，你需要在函数的右括号之前对其进行求值。

```
fn flatten_accounts(accounts: [Account; ACCOUNT_NUMBER]) -> [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] {
```

此函数将账户数组转换为 `Field` 数组，该数组可用作 Petersen 哈希的输入。

```
let mut flat: [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] = [0; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER];
```

这就是指定可变变量（即_不是_常量）的方法。Noir 中的变量必须始终具有值，因此我们将此变量初始化为全零。

```
for i in 0..ACCOUNT_NUMBER {
```

这是一个 `for` 循环。请注意，边界是常量。Noir 循环必须在编译时知道其边界。原因是算术电路不支持流控制。在处理 `for` 循环时，编译器只需将内部代码放置多次，每次迭代一次。

```
let fields = flatten_account(accounts[i]);
        for j in 0..FLAT_ACCOUNT_FIELDS {
            flat[i*FLAT_ACCOUNT_FIELDS + j] = fields[j];
        }
    }

    flat
}

fn hash_accounts(accounts: [Account; ACCOUNT_NUMBER]) -> Field {
    pedersen_hash(flatten_accounts(accounts))
}
```

最后，我们来到了对账户数组进行哈希处理的函数。

```
fn find_account(accounts: [Account; ACCOUNT_NUMBER], address: Field) -> u32 {
    let mut account : u32 = ACCOUNT_NUMBER;

    for i in 0..ACCOUNT_NUMBER {
        if accounts[i].address == address {
            account = i;
        }
    }
```

此函数查找具有特定地址的账户。在标准代码中，此函数将非常低效，因为它会遍历所有账户，即使在找到地址之后也是如此。

然而，在零知识证明中，没有流控制。如果我们曾经需要检查一个条件，我们必须每次都检查它。

类似的情况也发生在 `if` 语句中。上面循环中的 `if` 语句被转换为这些数学语句。

_condition<sub>result</sub> = accounts[i].address == address_ // 如果它们相等则为 1，否则为 0

_account<sub>new</sub> = condition<sub>result</sub>\*i + (1-condition<sub>result</sub>)\*account<sub>old</sub>_

```rust
    assert (account < ACCOUNT_NUMBER, f"{address} does not have an account");

    account
}
```

如果断言为假，[`assert`](https://noir-lang.org/docs/dev/noir/concepts/assert) 函数会导致零知识证明崩溃。在这种情况下，如果我们找不到具有相关地址的账户。为了报告地址，我们使用[格式化字符串](https://noir-lang.org/docs/noir/concepts/data_types/strings#format-strings)。

```rust
fn apply_transfer_txn(accounts: [Account; ACCOUNT_NUMBER], txn: TransferTxn) -> [Account; ACCOUNT_NUMBER] {
```

此函数应用转账交易并返回新的账户数组。

```rust
    let from = find_account(accounts, txn.from);
    let to = find_account(accounts, txn.to);

    let (txnFrom, txnAmount, txnNonce, accountNonce) =
        (txn.from, txn.amount, txn.nonce, accounts[from].nonce);
```

我们无法在 Noir 的格式化字符串中访问结构体元素，因此我们创建了一个可用的副本。

```rust
    assert (accounts[from].balance >= txn.amount,
        f"{txnFrom} does not have {txnAmount} finney");

    assert (accounts[from].nonce == txn.nonce,
        f"Transaction has nonce {txnNonce}, but the account is expected to use {accountNonce}");
```

这是可能导致交易无效的两个条件。

```rust
    let mut newAccounts = accounts;

    newAccounts[from].balance -= txn.amount;
    newAccounts[from].nonce += 1;
    newAccounts[to].balance += txn.amount;

    newAccounts
}
```

创建新的账户数组，然后将其返回。

```rust
fn readAddress(messageBytes: [u8; MESSAGE_LENGTH]) -> Field
```

此函数从消息中读取地址。 

```rust
{
    let mut result : Field = 0;

    for i in 7..47 {
```

地址始终为 20 字节（即 40 个十六进制数字）长，并从第 7 个字符开始。

```rust
        result *= 0x10;
        if messageBytes[i] >= 48 & messageBytes[i] <= 57 {    // 0-9
            result += (messageBytes[i]-48).into();
        }
        if messageBytes[i] >= 65 & messageBytes[i] <= 70 {    // A-F
            result += (messageBytes[i]-65+10).into()
        }
        if messageBytes[i] >= 97 & messageBytes[i] <= 102 {   // a-f
            result += (messageBytes[i]-97+10).into()
        }        
    }    

    result
}

fn readAmountAndNonce(messageBytes: [u8; MESSAGE_LENGTH]) -> (u128, u32)
```

从消息中读取金额和随机数。 

```rust
{
    let mut amount : u128 = 0;
    let mut nonce: u32 = 0;
    let mut stillReadingAmount: bool = true;
    let mut lookingForNonce: bool = false;
    let mut stillReadingNonce: bool = false;
```

在消息中，地址之后的第一个数字是要转账的芬尼（即千分之一 ETH）金额。第二个数字是随机数。它们之间的任何文本都将被忽略。

```rust
    for i in 48..MESSAGE_LENGTH {
        if messageBytes[i] >= 48 & messageBytes[i] <= 57 {    // 0-9
            let digit = (messageBytes[i]-48);

            if stillReadingAmount {
                amount = amount*10 + digit.into();
            }

            if lookingForNonce {    // 我们刚刚找到了它
                stillReadingNonce = true;
                lookingForNonce = false;
            }

            if stillReadingNonce {
                nonce = nonce*10 + digit.into();
            }
        } else {
            if stillReadingAmount {
                stillReadingAmount = false;
                lookingForNonce = true;
            }
            if stillReadingNonce {
                stillReadingNonce = false;
            }
        }
    }

    (amount, nonce)
}
```

返回[元组](https://noir-lang.org/docs/noir/concepts/data_types/tuples)是 Noir 从函数返回多个值的方式。

```rust
fn readTransferTxn(message: str<MESSAGE_LENGTH>) -> TransferTxn 
{
    let mut txn: TransferTxn = TransferTxn { from: 0, to: 0, amount:0, nonce:0 };
    let messageBytes = message.as_bytes();

    txn.to = readAddress(messageBytes);
    let (amount, nonce) = readAmountAndNonce(messageBytes);
    txn.amount = amount;
    txn.nonce = nonce;

    txn
}
```

此函数将消息转换为字节，然后将金额转换为 `TransferTxn`。

```rust
// 等同于 Viem 的 hashMessage
// https://viem.sh/docs/utilities/hashMessage#hashmessage
fn hashMessage(message: str<MESSAGE_LENGTH>) -> [u8;32] {
```

我们能够对账户使用 Pedersen 哈希，因为它们仅在零知识证明内部进行哈希处理。然而，在此代码中，我们需要检查由浏览器生成的消息签名。为此，我们需要遵循 [EIP-191](https://eips.ethereum.org/EIPS/eip-191) 中的以太坊签名格式。这意味着我们需要创建一个组合缓冲区，其中包含标准前缀、ASCII 格式的消息长度以及消息本身，并使用以太坊标准的 keccak256 对其进行哈希处理。

```rust
    // ASCII 前缀
    let prefix_bytes = [
        0x19, // \x19
        0x45, // 'E'
        0x74, // 't'
        0x68, // 'h'
        0x65, // 'e'
        0x72, // 'r'
        0x65, // 'e'
        0x75, // 'u'
        0x6D, // 'm'
        0x20, // ' '
        0x53, // 'S'
        0x69, // 'i'
        0x67, // 'g'
        0x6E, // 'n'
        0x65, // 'e'
        0x64, // 'd'
        0x20, // ' '
        0x4D, // 'M'
        0x65, // 'e'
        0x73, // 's'
        0x73, // 's'
        0x61, // 'a'
        0x67, // 'g'
        0x65, // 'e'
        0x3A, // ':'
        0x0A  // '\n'
    ];
```

为了避免应用程序要求用户签名的消息被用作交易或用于其他目的的情况，EIP-191 规定所有签名消息都以字符 0x19（不是有效的 ASCII 字符）开头，后跟 `Ethereum Signed Message:` 和换行符。

```rust
    let mut buffer: [u8; HASH_BUFFER_SIZE] = [0u8; HASH_BUFFER_SIZE];
    for i in 0..26 {
        buffer[i] = prefix_bytes[i];
    }

    let messageBytes : [u8; MESSAGE_LENGTH] = message.as_bytes();

    if MESSAGE_LENGTH <= 9 {
        for i in 0..1 {
            buffer[i+26] = ASCII_MESSAGE_LENGTH[i];
        }

        for i in 0..MESSAGE_LENGTH {
            buffer[i+26+1] = messageBytes[i];
        }
    }

    if MESSAGE_LENGTH >= 10 & MESSAGE_LENGTH <= 99 {
        for i in 0..2 {
            buffer[i+26] = ASCII_MESSAGE_LENGTH[i];
        }

        for i in 0..MESSAGE_LENGTH {
            buffer[i+26+2] = messageBytes[i];
        }
    }

    if MESSAGE_LENGTH >= 100 {
        for i in 0..3 {
            buffer[i+26] = ASCII_MESSAGE_LENGTH[i];
        }

        for i in 0..MESSAGE_LENGTH {
            buffer[i+26+3] = messageBytes[i];
        }
    }

    assert(MESSAGE_LENGTH < 1000, "Messages whose length is over three digits are not supported");
```

处理最大为 999 的消息长度，如果更大则失败。我添加了这段代码，即使消息长度是一个常量，因为这使得更改它变得更容易。在生产系统上，为了获得更好的性能，你可能只需假设 `MESSAGE_LENGTH` 不会改变。

```rust
    keccak256::keccak256(buffer, HASH_BUFFER_SIZE)
}
```

使用以太坊标准的 `keccak256` 函数。

```rust
fn signatureToAddressAndHash(
        message: str<MESSAGE_LENGTH>, 
        pubKeyX: [u8; 32],
        pubKeyY: [u8; 32],
        signature: [u8; 64]
    ) -> (Field, Field, Field)   // 地址，哈希的前 16 字节，哈希的后 16 字节        
{
```

此函数验证签名，这需要消息哈希。然后它向我们提供签名地址和消息哈希。消息哈希以两个 `Field` 值的形式提供，因为在程序的其余部分中，它们比字节数组更容易使用。

我们需要使用两个 `Field` 值，因为字段计算是对一个大数进行[取模](https://en.wikipedia.org/wiki/Modulo)运算，但该数字通常小于 256 位（否则很难在 EVM 中执行这些计算）。

```rust
    let hash = hashMessage(message);

    let mut (hash1, hash2) = (0,0);

    for i in 0..16 {
        hash1 = hash1*256 + hash[31-i].into();
        hash2 = hash2*256 + hash[15-i].into();
    }
```

将 `hash1` 和 `hash2` 指定为可变变量，并将哈希逐字节写入其中。

```rust
    (
        ecrecover::ecrecover(pubKeyX, pubKeyY, signature, hash), 
```
    
这类似于 [Solidity 的 `ecrecover`](https://docs.soliditylang.org/en/v0.8.30/cheatsheet.html#mathematical-and-cryptographic-functions)，但有两个重要的区别：

- 如果签名无效，调用将无法通过 `assert`，并且程序将中止。
- 虽然可以从签名和哈希中恢复公钥，但这是可以在外部完成的处理，因此不值得在零知识证明内部进行。如果有人试图在这里欺骗我们，签名验证将会失败。

```rust
        hash1,
        hash2
    )
}

fn main(
        accounts: [Account; ACCOUNT_NUMBER],
        message: str<MESSAGE_LENGTH>,
        pubKeyX: [u8; 32],
        pubKeyY: [u8; 32],
        signature: [u8; 64],
    ) -> pub (
        Field,  // 旧账户数组的哈希
        Field,  // 新账户数组的哈希
        Field,  // 消息哈希的前 16 字节
        Field,  // 消息哈希的后 16 字节
    )
```

最后，我们到达 `main` 函数。我们需要证明我们有一笔交易，它有效地将账户的哈希从旧值更改为新值。我们还需要证明它具有这个特定的交易哈希，以便发送它的人知道他们的交易已被处理。

```rust
{
    let mut txn = readTransferTxn(message);
```

我们需要 `txn` 是可变的，因为我们不是从消息中读取发送方地址，而是从签名中读取它。 

```rust
    let (fromAddress, txnHash1, txnHash2) = signatureToAddressAndHash(
        message,
        pubKeyX,
        pubKeyY,
        signature);

    txn.from = fromAddress;

    let newAccounts = apply_transfer_txn(accounts, txn);

    (
        hash_accounts(accounts),
        hash_accounts(newAccounts),
        txnHash1,
        txnHash2
    )
}
```

### 第 2 阶段 - 添加服务器 {#stage-2}

在第二阶段，我们添加一个服务器，该服务器接收并实现来自浏览器的转账交易。

要查看实际效果：

1. 如果 Vite 正在运行，请停止它。

2. 下载包含服务器的分支，并确保你拥有所有必需的模块。

   ```sh
   git checkout 02-add-server
   cd client
   npm install
   cd ../server
   npm install
   ```

   无需编译 Noir 代码，它与你在第 1 阶段使用的代码相同。

3. 启动服务器。

   ```sh
   npm run start
   ```

4. 在单独的命令行窗口中，运行 Vite 以提供浏览器代码。

   ```sh
   cd client
   npm run dev
   ```

5. 浏览至客户端代码：[http://localhost:5173](http://localhost:5173)

6. 在发出交易之前，你需要知道随机数以及你可以发送的金额。要获取此信息，请点击 **Update account data**（更新账户数据）并对消息进行签名。

   我们在这里面临一个两难境地。一方面，我们不想对可以重复使用的消息进行签名（[重放攻击](https://en.wikipedia.org/wiki/Replay_attack)），这就是我们首先需要随机数的原因。然而，我们还没有随机数。解决方案是选择一个只能使用一次且双方都已经拥有的随机数，例如当前时间。

   此解决方案的问题在于时间可能无法完美同步。因此，我们改为对每分钟更改一次的值进行签名。这意味着我们容易受到重放攻击的窗口期最多为一分钟。考虑到在生产环境中，签名请求将受到 TLS 的保护，并且隧道的另一端（服务器）已经可以披露余额和随机数（它必须知道它们才能工作），这是一个可接受的风险。

7. 一旦浏览器获取回余额和随机数，它就会显示转账表单。选择目标地址和金额，然后点击 **Transfer**（转账）。对此请求进行签名。

8. 要查看转账，请点击 **Update account data**（更新账户数据）或在运行服务器的窗口中查看。服务器在每次状态更改时都会记录状态。

        ```
ori@CryptoDocGuy:~/x/250911-zk-bank/server$ npm run start

    > server@1.0.0 start
    > node --experimental-json-modules index.mjs

    Listening on port 3000
    Txn send 0x90F79bf6EB2c4f870365E785982E1f101E93b906 36000 finney (milliEth) 0 processed
    New state:
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 has 64000 (1)
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 has 100000 (0)
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC has 100000 (0)
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 has 136000 (0)
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 has 100000 (0)
    Txn send 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 7200 finney (milliEth) 1 processed
    New state:
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 has 56800 (2)
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 has 107200 (0)
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC has 100000 (0)
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 has 136000 (0)
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 has 100000 (0)
    Txn send 0x90F79bf6EB2c4f870365E785982E1f101E93b906 3000 finney (milliEth) 2 processed
    New state:
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 has 53800 (3)
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 has 107200 (0)
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC has 100000 (0)
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 has 139000 (0)
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 has 100000 (0)
    ```

#### `server/index.mjs` {#server-index-mjs-1}

[此文件](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/index.mjs)包含服务器进程，并与 [`main.nr`](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/noir/src/main.nr) 处的 Noir 代码进行交互。以下是有趣部分的解释。

```js
import { Noir } from '@noir-lang/noir_js'
```

[noir.js](https://www.npmjs.com/package/@noir-lang/noir_js) 库在 JavaScript 代码和 Noir 代码之间进行接口连接。

```js
const circuit = JSON.parse(await fs.readFile("./noir/target/zkBank.json"))
const noir = new Noir(circuit)
```

加载算术电路——我们在上一阶段创建的已编译 Noir 程序——并准备执行它。

```js
// 我们仅在响应已签名的请求时提供账户信息
const accountInformation = async signature => {
    const fromAddress = await recoverAddress({
        hash: hashMessage("Get account data " + Math.floor((new Date().getTime())/60000)),
        signature
    })
```

为了提供账户信息，我们只需要签名。原因是我们已经知道消息将是什么，因此也知道消息哈希。

```js
const processMessage = async (message, signature) => {
```

处理消息并执行其编码的交易。

```js
    // 获取公钥
    const pubKey = await recoverPublicKey({
        hash,
        signature
    })
```

既然我们在服务器上运行 JavaScript，我们就可以在那里检索公钥，而不是在客户端上。

```js
    let noirResult
    try {
        noirResult = await noir.execute({
            message,
            signature: signature.slice(2,-2).match(/.{2}/g).map(x => `0x${x}`),
            pubKeyX,
            pubKeyY,
            accounts: Accounts
        })
```

`noir.execute` 运行 Noir 程序。参数等同于 [`Prover.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml) 中提供的参数。请注意，长值作为十六进制字符串数组（`["0x60", "0xA7"]`）提供，而不是像 Viem 那样作为单个十六进制值（`0x60A7`）提供。

```js
    } catch (err) {
        console.log(`Noir error: ${err}`)
        throw Error("Invalid transaction, not processed")
    }
```

如果出现错误，捕获它，然后将简化版本中继给客户端。

```js
    Accounts[fromAccountNumber].nonce++
    Accounts[fromAccountNumber].balance -= amount
    Accounts[toAccountNumber].balance += amount
```

应用交易。我们已经在 Noir 代码中做过了，但在这里再做一次比从那里提取结果更容易。

```js
let Accounts = [
    {
        address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        balance: 5000,
        nonce: 0,
    },
```

初始的 `Accounts` 结构。

### 第 3 阶段 - 以太坊智能合约 {#stage-3}

1. 停止服务器和客户端进程。

2. 下载包含智能合约的分支，并确保你拥有所有必需的模块。

   ```sh
   git checkout 03-smart-contracts
   cd client
   npm install
   cd ../server
   npm install
   ```

3. 在单独的命令行窗口中运行 `anvil`。

4. 生成验证密钥和 Solidity 验证者，然后将验证者代码复制到 Solidity 项目中。

   ```sh
   cd noir
   bb write_vk -b ./target/zkBank.json -o ./target --oracle_hash keccak
   bb write_solidity_verifier -k ./target/vk -o ./target/Verifier.sol
   cp target/Verifier.sol ../../smart-contracts/src
   ```

5. 转到智能合约并设置环境变量以使用 `anvil` 区块链。

   ```sh
   cd ../../smart-contracts
   export ETH_RPC_URL=http://localhost:8545
   ETH_PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ```

6. 部署 `Verifier.sol` 并将地址存储在环境变量中。

   ```sh
   VERIFIER_ADDRESS=`forge create src/Verifier.sol:HonkVerifier --private-key $ETH_PRIVATE_KEY --optimize --broadcast | awk '/Deployed to:/ {print $3}'`
   echo $VERIFIER_ADDRESS
   ```

7. 部署 `ZkBank` 合约。

   ```sh
   ZKBANK_ADDRESS=`forge create ZkBank --private-key $ETH_PRIVATE_KEY --broadcast --constructor-args $VERIFIER_ADDRESS 0x199aa62af8c1d562a6ec96e66347bf3240ab2afb5d022c895e6bf6a5e617167b | awk '/Deployed to:/ {print $3}'`
   echo $ZKBANK_ADDRESS
   ```

   `0x199..67b` 值是 `Accounts` 初始状态的 Pederson 哈希。如果你在 `server/index.mjs` 中修改此初始状态，你可以运行一笔交易以查看零知识证明报告的初始哈希。

8. 运行服务器。

   ```sh
   cd ../server
   npm run start
   ```

9. 在不同的命令行窗口中运行客户端。

   ```sh
   cd client
   npm run dev
   ```

10. 运行一些交易。

11. 要验证状态是否在链上发生更改，请重新启动服务器进程。你会看到 `ZkBank` 不再接受交易，因为交易中的原始哈希值与存储在链上的哈希值不同。

    这是预期的错误类型。

        ```
ori@CryptoDocGuy:~/x/250911-zk-bank/server$ npm run start

    > server@1.0.0 start
    > node --experimental-json-modules index.mjs

    Listening on port 3000
    Verification error: ContractFunctionExecutionError: The contract function "processTransaction" reverted with the following reason:
    Wrong old state hash

    Contract Call:
        address:   0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
        function:  processTransaction(bytes _proof, bytes32[] _publicInputs)
        args:                        (0x0000000000000000000000000000000000000000000000042ab5d6d1986846cf00000000000000000000000000000000000000000000000b75c020998797da7800000000000000000000000000000000000000000000000
    ```

#### `server/index.mjs` {#server-index-mjs-2}

此文件中的更改主要与创建实际证明并将其提交到链上有关。

```js
import { exec } from 'child_process'
import util from 'util'

const execPromise = util.promisify(exec)
```

我们需要使用 [Barretenberg 包](https://github.com/AztecProtocol/aztec-packages/tree/next/barretenberg)来创建要发送到链上的实际证明。我们可以通过运行命令行界面（`bb`）或使用 [JavaScript 库 `bb.js`](https://www.npmjs.com/package/@aztec/bb.js) 来使用此包。JavaScript 库比原生运行代码慢得多，因此我们在这里使用 [`exec`](https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback) 来使用命令行。

请注意，如果你确实决定使用 `bb.js`，你需要使用与你正在使用的 Noir 版本兼容的版本。在撰写本文时，当前的 Noir 版本（1.0.0-beta.11）使用 `bb.js` 版本 0.87。

```js
const zkBankAddress = process.env.ZKBANK_ADDRESS || "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
```

这里的地址是当你从一个干净的 `anvil` 开始并遵循上述说明时获得的地址。

```js
const walletClient = createWalletClient({ 
    chain: anvil, 
    transport: http(), 
    account: privateKeyToAccount("0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6")
})
```

此私钥是 `anvil` 中默认的预注资账户之一。 

```js
const generateProof = async (witness, fileID) => {
```

使用 `bb` 可执行文件生成证明。

```js 
    const fname = `witness-${fileID}.gz`    
    await fs.writeFile(fname, witness)
```

将见证数据写入文件。

```js
    await execPromise(`bb prove -b ./noir/target/zkBank.json -w ${fname} -o ${fileID} --oracle_hash keccak --output_format fields`)
```

实际创建证明。此步骤还会创建一个包含公共变量的文件，但我们不需要它。我们已经从 `noir.execute` 获取了这些变量。

```js
    const proof = "0x" + JSON.parse(await fs.readFile(`./${fileID}/proof_fields.json`)).reduce((a,b) => a+b, "").replace(/0x/g, "")
```

证明是一个 `Field` 值的 JSON 数组，每个值都表示为十六进制值。然而，我们需要在交易中将其作为单个 `bytes` 值发送，Viem 用一个大的十六进制字符串来表示它。在这里，我们通过连接所有值、删除所有 `0x`，然后在末尾添加一个来更改格式。

```js
    await execPromise(`rm -r ${fname} ${fileID}`)

    return proof
}
```

清理并返回证明。

```js
const processMessage = async (message, signature) => {
    .
    .
    .

    const publicFields = noirResult.returnValue.map(x=>'0x' + x.slice(2).padStart(64, "0"))
```

公共字段需要是一个 32 字节值的数组。然而，由于我们需要将交易哈希划分在两个 `Field` 值之间，因此它显示为 16 字节的值。在这里我们添加零，以便 Viem 能够理解它实际上是 32 字节。

```js
    const proof = await generateProof(noirResult.witness, `${fromAddress}-${nonce}`)
```

每个地址仅使用每个随机数一次，因此我们可以使用 `fromAddress` 和 `nonce` 的组合作为见证数据文件和输出目录的唯一标识符。

```js
    try {
        await zkBank.write.processTransaction([
            proof, publicFields])
    } catch (err) {
        console.log(`Verification error: ${err}`)
        throw Error("Can't verify the transaction onchain")
    }
    .
    .
    .
}
```

将交易发送到链上。

#### `smart-contracts/src/ZkBank.sol` {#smart-contracts-src-zkbank-sol}

这是接收交易的链上代码。

```solidity
// SPDX-License-Identifier: MIT

pragma solidity >=0.8.21;

import {HonkVerifier} from "./Verifier.sol";

contract ZkBank {
    HonkVerifier immutable myVerifier;
    bytes32 currentStateHash;

    constructor(address _verifierAddress, bytes32 _initialStateHash) {
        currentStateHash = _initialStateHash;
        myVerifier = HonkVerifier(_verifierAddress);
    }
```

链上代码需要跟踪两个变量：验证者（由 `nargo` 创建的独立合约）和当前状态哈希。

```solidity
    event TransactionProcessed(
        bytes32 indexed transactionHash,
        bytes32 oldStateHash,
        bytes32 newStateHash
    );
```

每次状态更改时，我们都会发出一个 `TransactionProcessed` 事件。

```solidity
    function processTransaction(
        bytes calldata _proof,
        bytes32[] calldata _publicFields
    ) public {
```

此函数处理交易。它以验证者要求的格式获取证明（作为 `bytes`）和公共输入（作为 `bytes32` 数组）（以最小化链上处理，从而降低 Gas 成本）。

```solidity
        require(_publicInputs[0] == currentStateHash,
            "Wrong old state hash");
```

零知识证明需要证明交易从我们当前的哈希更改为新的哈希。

```solidity
        myVerifier.verify(_proof, _publicFields);
```

调用验证者合约以验证零知识证明。如果零知识证明错误，此步骤将回退交易。

```solidity
        currentStateHash = _publicFields[1];

        emit TransactionProcessed(
            _publicFields[2]<<128 | _publicFields[3],
            _publicFields[0],
            _publicFields[1]
        );
    }
}
```

如果一切检查无误，则将状态哈希更新为新值并发出 `TransactionProcessed` 事件。

## 中心化组件的滥用 {#abuses}

信息安全包含三个属性：

- _机密性_，用户无法读取未经授权的信息。
- _完整性_，除非由授权用户以授权方式进行，否则信息无法被更改。
- _可用性_，授权用户可以使用该系统。

在这个系统中，完整性是通过零知识证明来提供的。可用性则更难保证，而机密性是不可能的，因为银行必须知道每个账户的余额和所有交易。没有办法阻止拥有信息的实体共享该信息。

也许可以使用[隐身地址](https://vitalik.eth.limo/general/2023/01/20/stealth.html)创建一个真正机密的银行，但这超出了本文的讨论范围。

### 虚假信息 {#false-info}

服务器破坏完整性的一种方式是在[请求数据](https://github.com/qbzzt/250911-zk-bank/blob/03-smart-contracts/server/index.mjs#L278-L291)时提供虚假信息。

为了解决这个问题，我们可以编写第二个 Noir 程序，该程序接收账户作为私有输入，并将请求信息的地址作为公共输入。输出是该地址的余额和随机数，以及账户的哈希。

当然，这个证明无法在链上验证，因为我们不想将随机数和余额发布到链上。但是，它可以通过在浏览器中运行的客户端代码进行验证。

### 强制交易 {#forced-txns}

确保 L2 可用性并防止审查的常用机制是[强制交易](https://docs.optimism.io/stack/transactions/forced-transaction)。但是强制交易无法与零知识证明结合使用。服务器是唯一可以验证交易的实体。

我们可以修改 `smart-contracts/src/ZkBank.sol` 以接受强制交易，并防止服务器在处理它们之前更改状态。然而，这会使我们容易受到简单的拒绝服务攻击。如果强制交易无效并因此无法处理怎么办？

解决方案是提供一个零知识证明来证明强制交易无效。这为服务器提供了三个选项：

- 处理强制交易，提供已处理该交易的零知识证明以及新状态哈希。
- 拒绝强制交易，并向合约提供该交易无效（未知地址、错误的随机数或余额不足）的零知识证明。
- 忽略强制交易。没有办法强迫服务器实际处理该交易，但这意味整个系统不可用。

#### 可用性保证金 {#avail-bonds}

在现实生活中的实现中，保持服务器运行可能存在某种利润动机。我们可以通过让服务器缴纳可用性保证金来加强这种激励，如果强制交易在一定期限内未被处理，任何人都可以销毁该保证金。

### 糟糕的 Noir 代码 {#bad-noir-code}

通常，为了让人们信任智能合约，我们会将源代码上传到[区块浏览器](https://eth.blockscout.com/address/0x7D16d2c4e96BCFC8f815E15b771aC847EcbDB48b?tab=contract)。然而，在零知识证明的情况下，这是不够的。

`Verifier.sol` 包含验证密钥，它是 Noir 程序的一个函数。然而，该密钥并没有告诉我们 Noir 程序是什么。要真正拥有一个受信任的解决方案，你需要上传 Noir 程序（以及创建它的版本）。否则，零知识证明可能反映的是一个不同的程序，一个带有后门的程序。

在区块浏览器开始允许我们上传和验证 Noir 程序之前，你应该自己动手（最好上传到 [IPFS](/developers/tutorials/ipfs-decentralized-ui/)）。然后，高级用户将能够下载源代码，自己编译它，创建 `Verifier.sol`，并验证它与链上的程序完全相同。

## 结论 {#conclusion}

等离子体类型的应用程序需要一个中心化组件作为信息存储。这带来了潜在的漏洞，但作为回报，它允许我们以区块链本身无法提供的方式保护隐私。借助零知识证明，我们可以确保完整性，并可能在经济上促使运行中心化组件的任何人去维护其可用性。

[点击此处查看我的更多作品](https://cryptodocguy.pro/)。

## 致谢 {#acknowledgements}

- Josh Crites 阅读了本文的草稿，并帮助我解决了一个棘手的 Noir 问题。

任何遗留的错误均由我本人负责。