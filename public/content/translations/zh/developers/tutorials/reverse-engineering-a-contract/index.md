---
title: "逆向工程合约"
description: "如何在没有源代码的情况下理解合约"
author: "奥里·波梅兰茨"
lang: zh
tags: ["evm", "操作码"]
skill: advanced
breadcrumb: "逆向工程"
published: 2021-12-30
---
## 简介 {#introduction}

_区块链上没有秘密_，发生的一切都是一致的、可验证的且公开可用的。理想情况下，[合约应该在 Etherscan 上发布并验证其源代码](https://etherscan.io/address/0xb8901acb165ed027e32754e0ffe830802919727f#code)。然而，[情况并非总是如此](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f#code)。在本文中，你将通过查看一个没有源代码的合约 [`0x2510c039cc3b061d79e564b38836da87e31b342f`](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f)，学习如何对合约进行逆向工程。

虽然存在反编译器，但它们并不总是能产生[可用的结果](https://etherscan.io/bytecode-decompiler?a=0x2510c039cc3b061d79e564b38836da87e31b342f)。在本文中，你将学习如何从[操作码](https://github.com/wolflo/evm-opcodes)手动逆向工程并理解合约，以及如何解释反编译器的结果。

为了能够理解本文，你应该已经了解 EVM 的基础知识，并且至少对 EVM 汇编程序有一定的熟悉。[你可以在这里阅读有关这些主题的内容](https://medium.com/mycrypto/the-ethereum-virtual-machine-how-does-it-work-9abac2b7c9e)。

## 准备可执行代码 {#prepare-the-executable-code}

你可以通过在 Etherscan 上访问该合约，点击 **Contract** 选项卡，然后点击 **Switch to Opcodes View** 来获取操作码。你将看到每行一个操作码的视图。

![Opcode View from Etherscan](opcode-view.png)

然而，为了能够理解跳转（jump），你需要知道每个操作码在代码中的位置。为此，一种方法是打开一个 Google 电子表格，并将操作码粘贴到 C 列。[你可以通过复制这份已经准备好的电子表格来跳过以下步骤](https://docs.google.com/spreadsheets/d/1tKmTJiNjUwHbW64wCKOSJxHjmh0bAUapt6btUYE7kDA/edit?usp=sharing)。

下一步是获取正确的代码位置，以便我们能够理解跳转。我们将把操作码大小放在 B 列，将位置（十六进制）放在 A 列。在单元格 `B1` 中输入此函数，然后将其复制并粘贴到 B 列的其余部分，直到代码结束。完成此操作后，你可以隐藏 B 列。

```
=1+IF(REGEXMATCH(C1,"PUSH"),REGEXEXTRACT(C1,"PUSH(\d+)"),0)
```

首先，该函数为操作码本身添加一个字节，然后查找 `PUSH`。PUSH 操作码比较特殊，因为它们需要额外的字节来存储被压入的值。如果操作码是 `PUSH`，我们将提取字节数并将其相加。

在 `A1` 中输入第一个偏移量，即零。然后，在 `A2` 中输入此函数，并再次将其复制并粘贴到 A 列的其余部分：

```
=dec2hex(hex2dec(A1)+B1)
```

我们需要这个函数来提供十六进制值，因为在跳转（`JUMP` 和 `JUMPI`）之前压入的值是以十六进制形式给出的。

## 入口点 (0x00) {#the-entry-point-0x00}

合约总是从第一个字节开始执行。这是代码的初始部分：

| 偏移量 | 操作码       | 栈（操作码执行后） |
| -----: | ------------ | ------------------------ |
|      0 | PUSH1 0x80   | 0x80                     |
|      2 | PUSH1 0x40   | 0x40, 0x80               |
|      4 | MSTORE       | 空                    |
|      5 | PUSH1 0x04   | 0x04                     |
|      7 | CALLDATASIZE | CALLDATASIZE 0x04        |
|      8 | LT           | CALLDATASIZE\<4           |
|      9 | PUSH2 0x005e | 0x5E CALLDATASIZE\<4      |
|      C | JUMPI        | 空                    |

这段代码执行两项操作：

1. 将 0x80 作为一个 32 字节的值写入内存位置 0x40-0x5F（0x80 存储在 0x5F 中，而 0x40-0x5E 全为零）。
2. 读取调用数据大小。通常，以太坊合约的调用数据遵循[应用程序二进制接口 (ABI)](https://docs.soliditylang.org/en/v0.8.10/abi-spec.html)，这至少需要四个字节作为函数选择器。如果调用数据大小小于四，则跳转到 0x5E。

![Flowchart for this portion](flowchart-entry.png)

### 0x5E 处的处理程序（用于非 ABI 调用数据） {#the-handler-at-0x5e-for-non-abi-call-data}

| 偏移量 | 操作码       |
| -----: | ------------ |
|     5E | JUMPDEST     |
|     5F | CALLDATASIZE |
|     60 | PUSH2 0x007c |
|     63 | JUMPI        |

此代码片段以 `JUMPDEST` 开始。如果你跳转到一个不是 `JUMPDEST` 的操作码，EVM（以太坊虚拟机）程序将抛出异常。然后它会检查 CALLDATASIZE，如果为“真”（即不为零），则跳转到 0x7C。我们将在下面讨论这一点。

| 偏移量 | 操作码     | 栈（操作码执行后）                                                       |
| -----: | ---------- | -------------------------------------------------------------------------- |
|     64 | CALLVALUE  | 调用提供的 [Wei](/glossary/#wei)。在 Solidity 中称为 `msg.value` |
|     65 | PUSH1 0x06 | 6 CALLVALUE                                                                |
|     67 | PUSH1 0x00 | 0 6 CALLVALUE                                                              |
|     69 | DUP3       | CALLVALUE 0 6 CALLVALUE                                                    |
|     6A | DUP3       | 6 CALLVALUE 0 6 CALLVALUE                                                  |
|     6B | SLOAD      | Storage[6] CALLVALUE 0 6 CALLVALUE                                         |

因此，当没有调用数据时，我们读取 Storage[6] 的值。我们还不知道这个值是什么，但我们可以寻找合约在没有调用数据的情况下接收到的交易。仅转账 ETH 而没有任何调用数据（因此也没有方法）的交易在 Etherscan 中的方法为 `Transfer`。事实上，[合约收到的第一笔交易](https://etherscan.io/tx/0xeec75287a583c36bcc7ca87685ab41603494516a0f5986d18de96c8e630762e7)就是一笔转账。

如果我们查看该交易并点击 **Click to see More**（点击查看更多），我们会看到调用数据（称为输入数据）确实为空 (`0x`)。还要注意，该值为 1.559 ETH，这在后面会用到。

![The call data is empty](calldata-empty.png)

接下来，点击 **State**（状态）选项卡并展开我们正在逆向工程的合约 (0x2510...)。你可以看到 `Storage[6]` 在交易期间确实发生了变化，如果你将 Hex（十六进制）更改为 **Number**（数字），你会看到它变成了 1,559,000,000,000,000,000，即以 wei 为单位的转账金额（为了清晰起见，我添加了逗号），对应于下一个合约值。

![Storage[6] 的变化](storage6.png)

如果我们查看由[同一时期的其他 `Transfer` 交易](https://etherscan.io/tx/0xf708d306de39c422472f43cb975d97b66fd5d6a6863db627067167cbf93d84d1#statechange)引起的状态变化，我们会看到 `Storage[6]` 在一段时间内跟踪了合约的值。现在我们将其称为 `Value*`。星号 (`*`) 提醒我们，我们还_不知道_这个变量的作用，但它不可能仅仅是为了跟踪合约的值，因为当你能够使用 `ADDRESS BALANCE` 获取账户余额时，就没有必要使用非常昂贵的存储。第一个操作码将合约自身的地址推入栈中。第二个操作码读取栈顶的地址，并将其替换为该地址的余额。

| 偏移量 | 操作码       | 栈                                       |
| -----: | ------------ | ------------------------------------------- |
|     6C | PUSH2 0x0075 | 0x75 Value\* CALLVALUE 0 6 CALLVALUE        |
|     6F | SWAP2        | CALLVALUE Value\* 0x75 0 6 CALLVALUE        |
|     70 | SWAP1        | Value\* CALLVALUE 0x75 0 6 CALLVALUE        |
|     71 | PUSH2 0x01a7 | 0x01A7 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|     74 | JUMP         |

我们将继续在跳转目标处追踪此代码。

| 偏移量 | 操作码     | 栈                                                       |
| -----: | ---------- | ----------------------------------------------------------- |
|    1A7 | JUMPDEST   | Value\* CALLVALUE 0x75 0 6 CALLVALUE                        |
|    1A8 | PUSH1 0x00 | 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE                   |
|    1AA | DUP3       | CALLVALUE 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE         |
|    1AB | NOT        | 2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |

`NOT` 是按位操作，因此它会反转调用值中每个位的值。

| 偏移量 | 操作码       | 栈                                                                       |
| -----: | ------------ | --------------------------------------------------------------------------- |
|    1AC | DUP3         | Value\* 2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE         |
|    1AD | GT           | Value\*>2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE         |
|    1AE | ISZERO       | Value\*\<=2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE        |
|    1AF | PUSH2 0x01df | 0x01DF Value\*\<=2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|    1B2 | JUMPI        |

如果 `Value*` 小于或等于 2^256-CALLVALUE-1，我们就会跳转。这看起来像是防止溢出的逻辑。事实上，我们看到在执行了一些无意义的操作（例如，写入内存的操作即将被删除）之后，在偏移量 0x01DE 处，如果检测到溢出，合约就会回退，这是正常的行为。

请注意，这种溢出极不可能发生，因为这需要调用值加上 `Value*` 达到 2^256 wei 的量级，大约是 10^59 ETH。[在撰写本文时，ETH 的总供应量不到两亿](https://etherscan.io/stat/supply)。

| 偏移量 | 操作码   | 栈                                     |
| -----: | -------- | ----------------------------------------- |
|    1DF | JUMPDEST | 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|    1E0 | POP      | Value\* CALLVALUE 0x75 0 6 CALLVALUE      |
|    1E1 | ADD      | Value\*+CALLVALUE 0x75 0 6 CALLVALUE      |
|    1E2 | SWAP1    | 0x75 Value\*+CALLVALUE 0 6 CALLVALUE      |
|    1E3 | JUMP     |

如果我们到达这里，获取 `Value* + CALLVALUE` 并跳转到偏移量 0x75。

| 偏移量 | 操作码   | 栈                           |
| -----: | -------- | ------------------------------- |
|     75 | JUMPDEST | Value\*+CALLVALUE 0 6 CALLVALUE |
|     76 | SWAP1    | 0 Value\*+CALLVALUE 6 CALLVALUE |
|     77 | SWAP2    | 6 Value\*+CALLVALUE 0 CALLVALUE |
|     78 | SSTORE   | 0 CALLVALUE                     |

如果我们到达这里（这需要调用数据为空），我们将调用值加到 `Value*` 中。这与我们所说的 `Transfer` 交易的作用是一致的。

| 偏移量 | 操作码 |
| -----: | ------ |
|     79 | POP    |
|     7A | POP    |
|     7B | STOP   |

最后，清空栈（这并非必要），并发出交易成功结束的信号。

总而言之，这是初始代码的流程图。

![Entry point flowchart](flowchart-entry.png)

## 0x7C 处的处理程序 {#the-handler-at-0x7c}

我故意没有在标题中说明这个处理程序的作用。重点不是教你这个特定的合约是如何工作的，而是教你如何逆向工程合约。你将通过跟随代码，以和我相同的方式了解它的作用。

我们从几个地方来到这里：

- 如果有 1、2 或 3 个字节的调用数据（来自偏移量 0x63）
- 如果方法签名未知（来自偏移量 0x42 和 0x5D）

| 偏移量 | 操作码       | 栈                   |
| -----: | ------------ | -------------------- |
|     7C | JUMPDEST     |
|     7D | PUSH1 0x00   | 0x00                 |
|     7F | PUSH2 0x009d | 0x9D 0x00            |
|     82 | PUSH1 0x03   | 0x03 0x9D 0x00       |
|     84 | SLOAD        | Storage[3] 0x9D 0x00 |

这是另一个存储单元，我在任何交易中都找不到它，因此很难知道它的含义。下面的代码会使其更加清晰。

| 偏移量 | 操作码                                            | 栈                              |
| -----: | ------------------------------------------------- | ------------------------------- |
|     85 | PUSH20 0xffffffffffffffffffffffffffffffffffffffff | 0xff....ff Storage[3] 0x9D 0x00 |
|     9A | AND                                               | Storage[3]-as-address 0x9D 0x00 |

这些操作码将我们从 Storage[3] 读取的值截断为 160 位，即以太坊地址的长度。

| 偏移量 | 操作码 | 栈                              |
| -----: | ------ | ------------------------------- |
|     9B | SWAP1  | 0x9D Storage[3]-as-address 0x00 |
|     9C | JUMP   | Storage[3]-as-address 0x00      |

这个跳转是多余的，因为我们要进入下一个操作码。这段代码的 gas 效率远未达到最佳状态。

| 偏移量 | 操作码     | 栈                              |
| -----: | ---------- | ------------------------------- |
|     9D | JUMPDEST   | Storage[3]-as-address 0x00      |
|     9E | SWAP1      | 0x00 Storage[3]-as-address      |
|     9F | POP        | Storage[3]-as-address           |
|     A0 | PUSH1 0x40 | 0x40 Storage[3]-as-address      |
|     A2 | MLOAD      | Mem[0x40] Storage[3]-as-address |

在代码的最开始，我们将 Mem[0x40] 设置为 0x80。如果稍后查找 0x40，我们会发现没有更改它——因此我们可以假设它是 0x80。

| 偏移量 | 操作码       | 栈                                                |
| -----: | ------------ | ------------------------------------------------- |
|     A3 | CALLDATASIZE | CALLDATASIZE 0x80 Storage[3]-as-address           |
|     A4 | PUSH1 0x00   | 0x00 CALLDATASIZE 0x80 Storage[3]-as-address      |
|     A6 | DUP3         | 0x80 0x00 CALLDATASIZE 0x80 Storage[3]-as-address |
|     A7 | CALLDATACOPY | 0x80 Storage[3]-as-address                        |

将所有调用数据复制到内存中，从 0x80 开始。

| 偏移量 | 操作码        | 栈                                                                               |
| -----: | ------------- | -------------------------------------------------------------------------------- |
|     A8 | PUSH1 0x00    | 0x00 0x80 Storage[3]-as-address                                                  |
|     AA | DUP1          | 0x00 0x00 0x80 Storage[3]-as-address                                             |
|     AB | CALLDATASIZE  | CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address                                |
|     AC | DUP4          | 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address                           |
|     AD | DUP6          | Storage[3]-as-address 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address     |
|     AE | GAS           | GAS Storage[3]-as-address 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address |
|     AF | DELEGATE_CALL |

现在事情清楚多了。这个合约可以作为一个[代理](https://blog.openzeppelin.com/proxy-patterns/)，调用 Storage[3] 中的地址来完成实际工作。`DELEGATE_CALL` 调用一个独立的合约，但保留在相同的存储中。这意味着被委托的合约（即我们为其代理的合约）访问相同的存储空间。调用的参数是：

- _Gas_：所有剩余的 gas
- _被调用的地址_：Storage[3]-as-address
- _调用数据_：从 0x80 开始的 CALLDATASIZE 个字节，这是我们放置原始调用数据的地方
- _返回数据_：无 (0x00 - 0x00) 我们将通过其他方式获取返回数据（见下文）

| 偏移量 | 操作码         | 栈                                                                                            |
| -----: | -------------- | --------------------------------------------------------------------------------------------- |
|     B0 | RETURNDATASIZE | RETURNDATASIZE (((调用成功/失败))) 0x80 Storage[3]-as-address                                 |
|     B1 | DUP1           | RETURNDATASIZE RETURNDATASIZE (((调用成功/失败))) 0x80 Storage[3]-as-address                  |
|     B2 | PUSH1 0x00     | 0x00 RETURNDATASIZE RETURNDATASIZE (((调用成功/失败))) 0x80 Storage[3]-as-address             |
|     B4 | DUP5           | 0x80 0x00 RETURNDATASIZE RETURNDATASIZE (((调用成功/失败))) 0x80 Storage[3]-as-address        |
|     B5 | RETURNDATACOPY | RETURNDATASIZE (((调用成功/失败))) 0x80 Storage[3]-as-address                                 |

在这里，我们将所有返回数据复制到从 0x80 开始的内存缓冲区。

| 偏移量 | 操作码       | 栈                                                                                                                           |
| -----: | ------------ | ---------------------------------------------------------------------------------------------------------------------------- |
|     B6 | DUP2         | (((调用成功/失败))) RETURNDATASIZE (((调用成功/失败))) 0x80 Storage[3]-as-address                                            |
|     B7 | DUP1         | (((调用成功/失败))) (((调用成功/失败))) RETURNDATASIZE (((调用成功/失败))) 0x80 Storage[3]-as-address                          |
|     B8 | ISZERO       | (((调用是否失败))) (((调用成功/失败))) RETURNDATASIZE (((调用成功/失败))) 0x80 Storage[3]-as-address                           |
|     B9 | PUSH2 0x00c0 | 0xC0 (((调用是否失败))) (((调用成功/失败))) RETURNDATASIZE (((调用成功/失败))) 0x80 Storage[3]-as-address                      |
|     BC | JUMPI        | (((调用成功/失败))) RETURNDATASIZE (((调用成功/失败))) 0x80 Storage[3]-as-address                                            |
|     BD | DUP2         | RETURNDATASIZE (((调用成功/失败))) RETURNDATASIZE (((调用成功/失败))) 0x80 Storage[3]-as-address                               |
|     BE | DUP5         | 0x80 RETURNDATASIZE (((调用成功/失败))) RETURNDATASIZE (((调用成功/失败))) 0x80 Storage[3]-as-address                          |
|     BF | RETURN       |                                                                                                                              |

因此，在调用之后，我们将返回数据复制到缓冲区 0x80 - 0x80+RETURNDATASIZE，如果调用成功，我们随后使用完全相同的缓冲区执行 `RETURN`。

### DELEGATECALL 失败 {#delegatecall-failed}

如果我们到达这里，即 0xC0，这意味着我们调用的合约已回退。由于我们只是该合约的代理，我们希望返回相同的数据并同样回退。

| 偏移量 | 操作码   | 栈                                                                                                                  |
| -----: | -------- | ------------------------------------------------------------------------------------------------------------------- |
|     C0 | JUMPDEST | (((调用成功/失败))) RETURNDATASIZE (((调用成功/失败))) 0x80 Storage[3]-as-address                                   |
|     C1 | DUP2     | RETURNDATASIZE (((调用成功/失败))) RETURNDATASIZE (((调用成功/失败))) 0x80 Storage[3]-as-address                      |
|     C2 | DUP5     | 0x80 RETURNDATASIZE (((调用成功/失败))) RETURNDATASIZE (((调用成功/失败))) 0x80 Storage[3]-as-address                 |
|     C3 | REVERT   |

因此，我们使用之前用于 `RETURN` 的相同缓冲区执行 `REVERT`：0x80 - 0x80+RETURNDATASIZE

![Call to proxy flowchart](flowchart-proxy.png)

## ABI 调用 {#abi-calls}

如果调用数据的大小为 4 个字节或更多，这可能是一个有效的 ABI 调用。

| 偏移量 | 操作码       | 栈                                                |
| -----: | ------------ | ------------------------------------------------- |
|      D | PUSH1 0x00   | 0x00                                              |
|      F | CALLDATALOAD | (((调用数据的第一个字（256 位）)))                |
|     10 | PUSH1 0xe0   | 0xE0 (((调用数据的第一个字（256 位）)))           |
|     12 | SHR          | (((调用数据的前 32 位（4 字节）)))                |

Etherscan 告诉我们 `1C` 是一个未知的操作码，因为[它是在 Etherscan 编写此功能之后添加的](https://eips.ethereum.org/EIPS/eip-145)，并且他们还没有更新它。一张[最新的操作码表](https://github.com/wolflo/evm-opcodes)向我们显示这是右移操作。

| 偏移量 | 操作码           | 栈                                                                                                       |
| -----: | ---------------- | -------------------------------------------------------------------------------------------------------- |
|     13 | DUP1             | (((调用数据的前 32 位（4 字节）))) (((调用数据的前 32 位（4 字节）)))                                    |
|     14 | PUSH4 0x3cd8045e | 0x3CD8045E (((调用数据的前 32 位（4 字节）))) (((调用数据的前 32 位（4 字节）)))                         |
|     19 | GT               | 0x3CD8045E>调用数据的前32位 (((调用数据的前 32 位（4 字节）)))                                           |
|     1A | PUSH2 0x0043     | 0x43 0x3CD8045E>调用数据的前32位 (((调用数据的前 32 位（4 字节）)))                                      |
|     1D | JUMPI            | (((调用数据的前 32 位（4 字节）)))                                                                       |

像这样将方法签名匹配测试一分为二，平均可以节省一半的测试。紧随其后的代码和 0x43 处的代码遵循相同的模式：`DUP1` 调用数据的前 32 位，`PUSH4 (((method signature>`，运行 `EQ` 检查是否相等，如果方法签名匹配，则 `JUMPI`。以下是方法签名、它们的地址，以及（如果已知的话）[相应的方法定义](https://www.4byte.directory/)：

| 方法                                                                                   | 方法签名         | 跳转偏移量          |
| -------------------------------------------------------------------------------------- | ---------------- | ------------------- |
| [splitter()](https://www.4byte.directory/signatures/?bytes4_signature=0x3cd8045e)      | 0x3cd8045e       | 0x0103              |
| ???                                                                                    | 0x81e580d3       | 0x0138              |
| [currentWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0xba0bafb4) | 0xba0bafb4       | 0x0158              |
| ???                                                                                    | 0x1f135823       | 0x00C4              |
| [merkleRoot()](https://www.4byte.directory/signatures/?bytes4_signature=0x2eb4a7ab)    | 0x2eb4a7ab       | 0x00ED              |

如果未找到匹配项，代码将跳转到 [0x7C 处的代理处理程序](#the-handler-at-0x7c)，希望我们所代理的合约中存在匹配项。

![ABI calls flowchart](flowchart-abi.png)

## splitter() {#splitter}

| 偏移量 | 操作码       | 栈                            |
| -----: | ------------ | ----------------------------- |
|    103 | JUMPDEST     |
|    104 | CALLVALUE    | CALLVALUE                     |
|    105 | DUP1         | CALLVALUE CALLVALUE           |
|    106 | ISZERO       | CALLVALUE==0 CALLVALUE        |
|    107 | PUSH2 0x010f | 0x010F CALLVALUE==0 CALLVALUE |
|    10A | JUMPI        | CALLVALUE                     |
|    10B | PUSH1 0x00   | 0x00 CALLVALUE                |
|    10D | DUP1         | 0x00 0x00 CALLVALUE           |
|    10E | REVERT       |

此函数要做的第一件事是检查调用是否没有发送任何 ETH。此函数不是 [`payable`](https://solidity-by-example.org/payable/)。如果有人向我们发送了 ETH，那一定是个错误，我们希望 `REVERT` 以避免这些 ETH 留在他们无法取回的地方。

| 偏移量 | 操作码                                            | 栈                                                                          |
| -----: | ------------------------------------------------- | --------------------------------------------------------------------------- |
|    10F | JUMPDEST                                          |
|    110 | POP                                               |
|    111 | PUSH1 0x03                                        | 0x03                                                                        |
|    113 | SLOAD                                             | (((Storage[3] 即我们作为其代理的合约)))                                     |
|    114 | PUSH1 0x40                                        | 0x40 (((Storage[3] 即我们作为其代理的合约)))                                |
|    116 | MLOAD                                             | 0x80 (((Storage[3] 即我们作为其代理的合约)))                                |
|    117 | PUSH20 0xffffffffffffffffffffffffffffffffffffffff | 0xFF...FF 0x80 (((Storage[3] 即我们作为其代理的合约)))                      |
|    12C | SWAP1                                             | 0x80 0xFF...FF (((Storage[3] 即我们作为其代理的合约)))                      |
|    12D | SWAP2                                             | (((Storage[3] 即我们作为其代理的合约))) 0xFF...FF 0x80                      |
|    12E | AND                                               | ProxyAddr 0x80                                                              |
|    12F | DUP2                                              | 0x80 ProxyAddr 0x80                                                         |
|    130 | MSTORE                                            | 0x80                                                                        |

现在 0x80 包含了代理地址

| 偏移量 | 操作码       | 栈        |
| -----: | ------------ | --------- |
|    131 | PUSH1 0x20   | 0x20 0x80 |
|    133 | ADD          | 0xA0      |
|    134 | PUSH2 0x00e4 | 0xE4 0xA0 |
|    137 | JUMP         | 0xA0      |

### E4 代码 {#the-e4-code}

这是我们第一次看到这些代码行，但它们与其他方法共享（见下文）。因此，我们将栈中的值称为 X，只需记住在 `splitter()` 中，这个 X 的值为 0xA0。

| 偏移量 | 操作码     | 栈          |
| -----: | ---------- | ----------- |
|     E4 | JUMPDEST   | X           |
|     E5 | PUSH1 0x40 | 0x40 X      |
|     E7 | MLOAD      | 0x80 X      |
|     E8 | DUP1       | 0x80 0x80 X |
|     E9 | SWAP2      | X 0x80 0x80 |
|     EA | SUB        | X-0x80 0x80 |
|     EB | SWAP1      | 0x80 X-0x80 |
|     EC | RETURN     |

因此，这段代码在栈中接收一个内存指针 (X)，并使合约使用 0x80 - X 的缓冲区执行 `RETURN`。

在 `splitter()` 的情况下，这会返回我们作为其代理的地址。`RETURN` 返回 0x80-0x9F 中的缓冲区，这正是我们写入此数据的地方（上面的偏移量 0x130）。

## currentWindow() {#currentwindow}

偏移量 0x158-0x163 中的代码与我们在 `splitter()` 中的 0x103-0x10E 看到的完全相同（除了 `JUMPI` 目标之外），因此我们知道 `currentWindow()` 也不是 `payable`。

| 偏移量 | 操作码       | 栈                   |
| -----: | ------------ | -------------------- |
|    164 | JUMPDEST     |
|    165 | POP          |
|    166 | PUSH2 0x00da | 0xDA                 |
|    169 | PUSH1 0x01   | 0x01 0xDA            |
|    16B | SLOAD        | Storage[1] 0xDA      |
|    16C | DUP2         | 0xDA Storage[1] 0xDA |
|    16D | JUMP         | Storage[1] 0xDA      |

### DA 代码 {#the-da-code}

此代码也与其他方法共享。因此，我们将栈中的值称为 Y，只需记住在 `currentWindow()` 中，这个 Y 的值是 Storage[1]。

| 偏移量 | 操作码     | 栈               |
| -----: | ---------- | ---------------- |
|     DA | JUMPDEST   | Y 0xDA           |
|     DB | PUSH1 0x40 | 0x40 Y 0xDA      |
|     DD | MLOAD      | 0x80 Y 0xDA      |
|     DE | SWAP1      | Y 0x80 0xDA      |
|     DF | DUP2       | 0x80 Y 0x80 0xDA |
|     E0 | MSTORE     | 0x80 0xDA        |

将 Y 写入 0x80-0x9F。

| 偏移量 | 操作码     | 栈             |
| -----: | ---------- | -------------- |
|     E1 | PUSH1 0x20 | 0x20 0x80 0xDA |
|     E3 | ADD        | 0xA0 0xDA      |

其余部分在[上文](#the-e4-code)已经解释过了。因此，跳转到 0xDA 会将栈顶 (Y) 写入 0x80-0x9F，并返回该值。在 `currentWindow()` 的情况下，它返回 Storage[1]。

## merkleRoot() {#merkleroot}

偏移量 0xED-0xF8 中的代码与我们在 `splitter()` 的 0x103-0x10E 中看到的完全相同（除了 `JUMPI` 目标之外），因此我们知道 `merkleRoot()` 也不是 `payable`。

| 偏移量 | 操作码       | 栈                   |
| -----: | ------------ | -------------------- |
|     F9 | JUMPDEST     |
|     FA | POP          |
|     FB | PUSH2 0x00da | 0xDA                 |
|     FE | PUSH1 0x00   | 0x00 0xDA            |
|    100 | SLOAD        | Storage[0] 0xDA      |
|    101 | DUP2         | 0xDA Storage[0] 0xDA |
|    102 | JUMP         | Storage[0] 0xDA      |

跳转之后发生的事情[我们已经弄清楚了](#the-da-code)。因此 `merkleRoot()` 返回 Storage[0]。

## 0x81e580d3 {#0x81e580d3}

偏移量 0x138-0x143 处的代码与我们在 `splitter()` 中的 0x103-0x10E 处看到的完全相同（除了 `JUMPI` 目标不同），因此我们知道此函数也不是 `payable`。

| 偏移量 | 操作码       | 栈                                                        |
| -----: | ------------ | ------------------------------------------------------------ |
|    144 | JUMPDEST     |
|    145 | POP          |
|    146 | PUSH2 0x00da | 0xDA                                                         |
|    149 | PUSH2 0x0153 | 0x0153 0xDA                                                  |
|    14C | CALLDATASIZE | CALLDATASIZE 0x0153 0xDA                                     |
|    14D | PUSH1 0x04   | 0x04 CALLDATASIZE 0x0153 0xDA                                |
|    14F | PUSH2 0x018f | 0x018F 0x04 CALLDATASIZE 0x0153 0xDA                         |
|    152 | JUMP         | 0x04 CALLDATASIZE 0x0153 0xDA                                |
|    18F | JUMPDEST     | 0x04 CALLDATASIZE 0x0153 0xDA                                |
|    190 | PUSH1 0x00   | 0x00 0x04 CALLDATASIZE 0x0153 0xDA                           |
|    192 | PUSH1 0x20   | 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                      |
|    194 | DUP3         | 0x04 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                 |
|    195 | DUP5         | CALLDATASIZE 0x04 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA    |
|    196 | SUB          | CALLDATASIZE-4 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA       |
|    197 | SLT          | CALLDATASIZE-4\<32 0x00 0x04 CALLDATASIZE 0x0153 0xDA         |
|    198 | ISZERO       | CALLDATASIZE-4>=32 0x00 0x04 CALLDATASIZE 0x0153 0xDA        |
|    199 | PUSH2 0x01a0 | 0x01A0 CALLDATASIZE-4>=32 0x00 0x04 CALLDATASIZE 0x0153 0xDA |
|    19C | JUMPI        | 0x00 0x04 CALLDATASIZE 0x0153 0xDA                           |

看起来这个函数至少需要 32 字节（一个字）的调用数据。

| 偏移量 | 操作码 | 栈                                        |
| -----: | ------ | -------------------------------------------- |
|    19D | DUP1   | 0x00 0x00 0x04 CALLDATASIZE 0x0153 0xDA      |
|    19E | DUP2   | 0x00 0x00 0x00 0x04 CALLDATASIZE 0x0153 0xDA |
|    19F | REVERT |

如果它没有获取到调用数据，交易将被回退，且没有任何返回数据。

让我们看看如果函数_确实_获取了它需要的调用数据会发生什么。

| 偏移量 | 操作码       | 栈                                    |
| -----: | ------------ | ---------------------------------------- |
|    1A0 | JUMPDEST     | 0x00 0x04 CALLDATASIZE 0x0153 0xDA       |
|    1A1 | POP          | 0x04 CALLDATASIZE 0x0153 0xDA            |
|    1A2 | CALLDATALOAD | calldataload(4) CALLDATASIZE 0x0153 0xDA |

`calldataload(4)` 是方法签名_之后_调用数据的第一个字

| 偏移量 | 操作码       | 栈                                                                        |
| -----: | ------------ | ---------------------------------------------------------------------------- |
|    1A3 | SWAP2        | 0x0153 CALLDATASIZE calldataload(4) 0xDA                                     |
|    1A4 | SWAP1        | CALLDATASIZE 0x0153 calldataload(4) 0xDA                                     |
|    1A5 | POP          | 0x0153 calldataload(4) 0xDA                                                  |
|    1A6 | JUMP         | calldataload(4) 0xDA                                                         |
|    153 | JUMPDEST     | calldataload(4) 0xDA                                                         |
|    154 | PUSH2 0x016e | 0x016E calldataload(4) 0xDA                                                  |
|    157 | JUMP         | calldataload(4) 0xDA                                                         |
|    16E | JUMPDEST     | calldataload(4) 0xDA                                                         |
|    16F | PUSH1 0x04   | 0x04 calldataload(4) 0xDA                                                    |
|    171 | DUP2         | calldataload(4) 0x04 calldataload(4) 0xDA                                    |
|    172 | DUP2         | 0x04 calldataload(4) 0x04 calldataload(4) 0xDA                               |
|    173 | SLOAD        | Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA                         |
|    174 | DUP2         | calldataload(4) Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA         |
|    175 | LT           | calldataload(4)\<Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA         |
|    176 | PUSH2 0x017e | 0x017EC calldataload(4)\<Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA |
|    179 | JUMPI        | calldataload(4) 0x04 calldataload(4) 0xDA                                    |

如果第一个字不小于 Storage[4]，则函数失败。它将回退，且没有任何返回值：

| 偏移量 | 操作码     | 栈         |
| -----: | ---------- | ------------- |
|    17A | PUSH1 0x00 | 0x00 ...      |
|    17C | DUP1       | 0x00 0x00 ... |
|    17D | REVERT     |

如果 calldataload(4) 小于 Storage[4]，我们将得到以下代码：

| 偏移量 | 操作码     | 栈                                               |
| -----: | ---------- | --------------------------------------------------- |
|    17E | JUMPDEST   | calldataload(4) 0x04 calldataload(4) 0xDA           |
|    17F | PUSH1 0x00 | 0x00 calldataload(4) 0x04 calldataload(4) 0xDA      |
|    181 | SWAP2      | 0x04 calldataload(4) 0x00 calldataload(4) 0xDA      |
|    182 | DUP3       | 0x00 0x04 calldataload(4) 0x00 calldataload(4) 0xDA |
|    183 | MSTORE     | calldataload(4) 0x00 calldataload(4) 0xDA           |

并且内存位置 0x00-0x1F 现在包含数据 0x04（0x00-0x1E 全为零，0x1F 为 4）

| 偏移量 | 操作码     | 栈                                                                   |
| -----: | ---------- | ----------------------------------------------------------------------- |
|    184 | PUSH1 0x20 | 0x20 calldataload(4) 0x00 calldataload(4) 0xDA                          |
|    186 | SWAP1      | calldataload(4) 0x20 0x00 calldataload(4) 0xDA                          |
|    187 | SWAP2      | 0x00 0x20 calldataload(4) calldataload(4) 0xDA                          |
|    188 | SHA3       | (((SHA3 of 0x00-0x1F))) calldataload(4) calldataload(4) 0xDA            |
|    189 | ADD        | (((SHA3 of 0x00-0x1F)))+calldataload(4) calldataload(4) 0xDA            |
|    18A | SLOAD      | Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] calldataload(4) 0xDA |

因此，存储中有一个查找表，它从 0x000...0004 的 SHA3 开始，并为每个合法的调用数据值（低于 Storage[4] 的值）提供一个条目。

| 偏移量 | 操作码 | 栈                                                                   |
| -----: | ------ | ----------------------------------------------------------------------- |
|    18B | SWAP1  | calldataload(4) Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA |
|    18C | POP    | Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA                 |
|    18D | DUP2   | 0xDA Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA            |
|    18E | JUMP   | Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA                 |

我们已经知道 [偏移量 0xDA 处的代码](#the-da-code)的作用，它将栈顶值返回给调用者。因此，此函数将查找表中的值返回给调用者。

## 0x1f135823 {#0x1f135823}

偏移量 0xC4-0xCF 处的代码与我们在 `splitter()` 中的 0x103-0x10E 处看到的完全相同（除了 `JUMPI` 目标之外），因此我们知道此函数也不是 `payable`。

| 偏移量 | 操作码       | 栈             |
| -----: | ------------ | ----------------- |
|     D0 | JUMPDEST     |
|     D1 | POP          |
|     D2 | PUSH2 0x00da | 0xDA              |
|     D5 | PUSH1 0x06   | 0x06 0xDA         |
|     D7 | SLOAD        | Value\* 0xDA      |
|     D8 | DUP2         | 0xDA Value\* 0xDA |
|     D9 | JUMP         | Value\* 0xDA      |

我们已经知道 [偏移量 0xDA 处的代码](#the-da-code) 的作用，它将栈顶值返回给调用者。因此，此函数返回 `Value*`。

### 方法总结 {#method-summary}

此时你觉得你理解这个合约了吗？我不觉得。到目前为止，我们有以下方法：

| 方法                            | 含义                                                                              |
| --------------------------------- | ------------------------------------------------------------------------------------ |
| Transfer                          | 接受调用提供的值，并将 `Value*` 增加该金额           |
| [splitter()](#splitter)           | 返回 Storage[3]，即代理地址                                                 |
| [currentWindow()](#currentwindow) | 返回 Storage[1]                                                                    |
| [merkleRoot()](#merkleroot)        | 返回 Storage[0]                                                                    |
| [0x81e580d3](#0x81e580d3)         | 如果参数小于 Storage[4]，则从查找表中返回该值 |
| [0x1f135823](#0x1f135823)         | 返回 Storage[6]，即 Value\*                                                    |

但我们知道任何其他功能都是由 Storage[3] 中的合约提供的。也许如果我们知道那个合约是什么，它会给我们一些线索。值得庆幸的是，这是区块链，一切都是公开透明的，至少在理论上是这样。我们没有看到任何设置 Storage[3] 的方法，因此它一定是由构造函数设置的。

## 构造函数 {#the-constructor}

当我们[查看合约](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f)时，我们还可以看到创建它的交易。

![Click the create transaction](create-tx.png)

如果我们点击该交易，然后点击**状态**选项卡，我们就可以看到参数的初始值。具体来说，我们可以看到 Storage[3] 包含 [0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761](https://etherscan.io/address/0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761)。该合约必定包含缺失的功能。我们可以使用与调查当前合约相同的工具来理解它。

## 代理合约 {#the-proxy-contract}

使用与上述原始合约相同的技术，我们可以看到该合约在以下情况下会回退：

- 调用中附带了任何 ETH (0x05-0x0F)
- 调用数据大小小于 4 (0x10-0x19 和 0xBE-0xC2)

并且它支持的方法有：

| 方法                                                                                                          | 方法签名             | 跳转偏移量 |
| --------------------------------------------------------------------------------------------------------------- | ---------------------------- | ------------------- |
| [scaleAmountByPercentage(uint256,uint256)](https://www.4byte.directory/signatures/?bytes4_signature=0x8ffb5c97)          | 0x8ffb5c97                   | 0x0135              |
| [isClaimed(uint256,address)](https://www.4byte.directory/signatures/?bytes4_signature=0xd2ef0795)               | 0xd2ef0795                   | 0x0151              |
| [claim(uint256,address,uint256,bytes32[])](https://www.4byte.directory/signatures/?bytes4_signature=0x2e7ba6ef) | 0x2e7ba6ef                   | 0x00F4              |
| [incrementWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0x338b1d31)                        | 0x338b1d31                   | 0x0110              |
| ???                                                                                                             | 0x3f26479e                   | 0x0118              |
| ???                                                                                                             | 0x1e7df9d3                   | 0x00C3              |
| [currentWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0xba0bafb4)                          | [0xba0bafb4](#currentwindow) | 0x0148              |
| [merkleRoot()](https://www.4byte.directory/signatures/?bytes4_signature=0x2eb4a7ab)                             | [0x2eb4a7ab](#merkleroot)    | 0x0107              |
| ???                                                                                                             | [0x81e580d3](#0x81e580d3)    | 0x0122              |
| ???                                                                                                             | [0x1f135823](#0x1f135823)    | 0x00D8              |

我们可以忽略底部的四个方法，因为我们永远不会执行到它们。它们的签名表明我们的原始合约会自行处理它们（你可以点击签名查看上面的详细信息），因此它们必须是[被重写的方法](https://medium.com/upstate-interactive/solidity-override-vs-virtual-functions-c0a5dfb83aaf)。

剩下的方法中有一个是 `claim(<params>)`，另一个是 `isClaimed(<params>)`，所以它看起来像是一个空投合约。与其逐个操作码地检查其余部分，我们可以[尝试使用反编译器](https://etherscan.io/bytecode-decompiler?a=0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761)，它为该合约的三个函数生成了可用的结果。逆向工程其他函数就留给读者作为练习。

### scaleAmountByPercentage {#scaleamountbypercentage}

这是反编译器为该函数提供的结果：

```python
def unknown8ffb5c97(uint256 _param1, uint256 _param2) payable:
  require calldata.size - 4 >=′ 64
  if _param1 and _param2 > -1 / _param1:
      revert with 0, 17
  return (_param1 * _param2 / 100 * 10^6)
```

第一个 `require` 测试调用数据除了 4 个字节的函数签名外，是否至少有 64 个字节，足以容纳两个参数。如果没有，那么显然有问题。

`if` 语句似乎在检查 `_param1` 不为零，并且 `_param1 * _param2` 不为负数。这可能是为了防止发生回绕（wrap around）的情况。

最后，该函数返回一个按比例缩放的值。

### claim {#claim}

反编译器生成的代码很复杂，并非所有代码都与我们相关。我将跳过其中一些，重点关注我认为提供有用信息的代码行

```python
def unknown2e7ba6ef(uint256 _param1, uint256 _param2, uint256 _param3, array _param4) payable:
  ...
  require _param2 == addr(_param2)
  ...
  if currentWindow <= _param1:
      revert with 0, 'cannot claim for a future window'
```

我们在这里看到两件重要的事情：

- `_param2` 虽然被声明为 `uint256`，但实际上是一个地址
- `_param1` 是正在申领的窗口，它必须是 `currentWindow` 或更早的窗口。

```python
  ...
  if stor5[_claimWindow][addr(_claimFor)]:
      revert with 0, 'Account already claimed the given window'
```

所以现在我们知道 Storage[5] 是一个包含窗口和地址的数组，以及该地址是否申领了该窗口的奖励。

```python
  ...
  idx = 0
  s = 0
  while idx < _param4.length:
  ...
      if s + sha3(mem[(32 * _param4.length) + 328 len mem[(32 * _param4.length) + 296]]) > mem[(32 * idx) + 296]:
          mem[mem[64] + 32] = mem[(32 * idx) + 296]
          ...
          s = sha3(mem[_62 + 32 len mem[_62]])
          continue
      ...
      s = sha3(mem[_66 + 32 len mem[_66]])
      continue
  if unknown2eb4a7ab != s:
      revert with 0, 'Invalid proof'
```

我们知道 `unknown2eb4a7ab` 实际上是函数 `merkleRoot()`，所以这段代码看起来像是在验证一个[默克尔证明](https://medium.com/crypto-0-nite/merkle-proofs-explained-6dd429623dc5)。这意味着 `_param4` 是一个默克尔证明。

```python
  call addr(_param2) with:
     value unknown81e580d3[_param1] * _param3 / 100 * 10^6 wei
       gas 30000 wei
```

这就是合约将其自身的 ETH 转账到另一个地址（合约或外部拥有账户）的方式。它使用要转账的金额作为值来调用它。所以这看起来像是一次 ETH 空投。

```python
  if not return_data.size:
      if not ext_call.success:
          require ext_code.size(stor2)
          call stor2.deposit() with:
             value unknown81e580d3[_param1] * _param3 / 100 * 10^6 wei
```

底部的两行告诉我们 Storage[2] 也是我们调用的一个合约。如果我们[查看构造函数交易](https://etherscan.io/tx/0xa1ea0549fb349eb7d3aff90e1d6ce7469fdfdcd59a2fd9b8d1f5e420c0d05b58#statechange)，我们会看到这个合约是 [0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)，一个封装以太币合约，[其源代码已上传到 Etherscan](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2#code)。

所以看起来合约试图将 ETH 发送到 `_param2`。如果能成功，那很好。如果不成功，它会尝试发送 [WETH](https://weth.tkn.eth.limo/)。如果 `_param2` 是一个外部拥有账户 (EOA)，那么它总是可以接收 ETH，但合约可以拒绝接收 ETH。然而，WETH 是 ERC-20 代币，合约不能拒绝接受它。

```python
  ...
  log 0xdbd5389f: addr(_param2), unknown81e580d3[_param1] * _param3 / 100 * 10^6, bool(ext_call.success)
```

在函数的末尾，我们看到生成了一个日志条目。[查看生成的日志条目](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f#events)并过滤以 `0xdbd5...` 开头的主题。如果我们[点击生成此类条目的其中一笔交易](https://etherscan.io/tx/0xe7d3b7e00f645af17dfbbd010478ef4af235896c65b6548def1fe95b3b7d2274)，我们会发现它确实看起来像是一次申领——该账户向我们正在逆向工程的合约发送了一条消息，作为回报获得了 ETH。

![A claim transaction](claim-tx.png)

### 1e7df9d3 {#1e7df9d3}

这个函数与上面的 [`claim`](#claim) 非常相似。它也检查默克尔证明，尝试将 ETH 转账给第一个地址，并生成相同类型的日志条目。

```python
def unknown1e7df9d3(uint256 _param1, uint256 _param2, array _param3) payable:
  ...
  idx = 0
  s = 0
  while idx < _param3.length:
      if idx >= mem[96]:
          revert with 0, 50
      _55 = mem[(32 * idx) + 128]
      if s + sha3(mem[(32 * _param3.length) + 160 len mem[(32 * _param3.length) + 128]]) > mem[(32 * idx) + 128]:
          ...
          s = sha3(mem[_58 + 32 len mem[_58]])
          continue
      mem[mem[64] + 32] = s + sha3(mem[(32 * _param3.length) + 160 len mem[(32 * _param3.length) + 128]])
  ...
  if unknown2eb4a7ab != s:
      revert with 0, 'Invalid proof'
  ...
  call addr(_param1) with:
     value s wei
       gas 30000 wei
  if not return_data.size:
      if not ext_call.success:
          require ext_code.size(stor2)
          call stor2.deposit() with:
             value s wei
               gas gas_remaining wei
  ...
  log 0xdbd5389f: addr(_param1), s, bool(ext_call.success)
```

主要区别在于，第一个参数（要提取的窗口）不存在。取而代之的是一个遍历所有可申领窗口的循环。

```python
  idx = 0
  s = 0
  while idx < currentWindow:
      ...
      if stor5[mem[0]]:
          if idx == -1:
              revert with 0, 17
          idx = idx + 1
          s = s
          continue
      ...
      stor5[idx][addr(_param1)] = 1
      if idx >= unknown81e580d3.length:
          revert with 0, 50
      mem[0] = 4
      if unknown81e580d3[idx] and _param2 > -1 / unknown81e580d3[idx]:
          revert with 0, 17
      if s > !(unknown81e580d3[idx] * _param2 / 100 * 10^6):
          revert with 0, 17
      if idx == -1:
          revert with 0, 17
      idx = idx + 1
      s = s + (unknown81e580d3[idx] * _param2 / 100 * 10^6)
      continue
```

所以它看起来像是一个申领所有窗口的 `claim` 变体。

## 结论 {#conclusion}

到目前为止，你应该已经知道如何使用操作码或（在可行的情况下）反编译器来理解那些没有源代码的合约。从本文的篇幅可以明显看出，逆向工程一个合约绝非易事，但在一个安全性至关重要的系统中，能够验证合约是否按预期工作是一项重要的技能。

[点击此处查看我的更多作品](https://cryptodocguy.pro/)。