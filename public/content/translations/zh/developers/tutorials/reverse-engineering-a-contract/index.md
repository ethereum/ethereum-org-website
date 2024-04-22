---
title: "对合约进行逆向工程"
description: 没有源代码时如何理解合约
author: Ori Pomerantz
lang: zh
tags:
  - "以太坊虚拟机"
  - "操作码"
  - "逆向工程"
  - "反编译器"
skill: advanced
published: 2021-12-30
---

## 简介 {#introduction}

_区块链上没有秘密_，发生的一切都是持续的、可验证的、公开的。 理想情况下，[应将智能合约的源代码发布到 Etherscan 上进行验证](https://etherscan.io/address/0xb8901acb165ed027e32754e0ffe830802919727f#code)。 然而，[情况并非总是如此](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f#code)。 在本文中，你将研究一份没有源代码的合约 [`0x2510c039cc3b061d79e564b38836da87e31b342f`](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f)，从而学习如何对合约进行逆向工程。

有一些反编译器，但它们不一定能提供[有用的结果](https://etherscan.io/bytecode-decompiler?a=0x2510c039cc3b061d79e564b38836da87e31b342f)。 在本文中，你将从[操作码](https://github.com/wolflo/evm-opcodes)入手，学习如何对合约手动进行逆向工程并理解合约，以及如何解读反编译器生成的结果。

为了能够理解本文，你应当已经了解以太坊虚拟机基础知识，并至少对以太坊虚拟机汇编器有几分熟悉。 [点击此处了解这些主题](https://medium.com/mycrypto/the-ethereum-virtual-machine-how-does-it-work-9abac2b7c9e)。

## 准备可执行代码 {#prepare-the-executable-code}

你可以在 Etherscan 上获得合约的操作码，操作如下：点击 **Contract** 选项卡，然后**切换至 Opcodes 视图**。 你将看到每行有一条操作码。

![Etherscan 上的 Opcode 视图](opcode-view.png)

但是，为了能够理解跳转，你需要知道每条操作码在代码中的位置。 为此，一种方式是打开 Google Spreadsheet 并把操作码粘贴到 C 列。[你可以创建这个已制作好的电子表格的副本，从而跳过以下步骤](https://docs.google.com/spreadsheets/d/1tKmTJiNjUwHbW64wCKOSJxHjmh0bAUapt6btUYE7kDA/edit?usp=sharing)。

下一步是获得正确的操作码位置，以便我们能够理解跳转。 我们将操作码大小放入 B 列，操作码位置（十六进制形式）放入 A 列。在单元格 `B1` 中输入下面的函数，然后复制并粘贴到 B 列其余单元格中，直到代码结束。 完成后，你就可以隐藏 B 列。

```
=1+IF(REGEXMATCH(C1,"PUSH"),REGEXEXTRACT(C1,"PUSH(\d+)"),0)
```

首先该函数给操作码增加一个字节，然后查找 `PUSH` 操作码。 Push 操作码比较特殊，因为它们需要额外的字节表示压入的值。 如果操作码是 `PUSH`，我们提取该字节的数值并在函数中增加相应的值。

在 `A1` 单元格中输入第一个偏移量 0。 然后在 `A2` 单元格中，输入下面的函数，并再次将它复制粘贴到 A 列其余他单元格中：

```
=dec2hex(hex2dec(A1)+B1)
```

我们需要此函数提供十六进制值，因为跳转（`JUMP` 和 `JUMPI`）之前压入的值也是十六进制的。

## 入口点 (0x00) {#the-entry-point-0x00}

智能合约总会从第一个字节开始执行。 下面是代码的开始部分：

| 偏移量 | 操作码       | 堆栈（在操作码之后） |
| -----: | ------------ | -------------------- |
|      0 | PUSH1 0x80   | 0x80                 |
|      2 | PUSH1 0x40   | 0x40, 0x80           |
|      4 | MSTORE       | 空                   |
|      5 | PUSH1 0x04   | 0x04                 |
|      7 | CALLDATASIZE | CALLDATASIZE 0x04    |
|      8 | LT           | CALLDATASIZE<4       |
|      9 | PUSH2 0x005e | 0x5E CALLDATASIZE<4  |
|      C | JUMPI        | 空                   |

这段代码执行了两项操作：

1. 将 0x80 作为一个 32 字节的值写入内存地址 0x40-0x5F（0x80 存储在 0x5F，而 0x40-0x5E 全部都是零）。
2. 读取 calldata 长度。 通常，以太坊合约的调用数据遵循[应用程序二进制接口](https://docs.soliditylang.org/en/v0.8.10/abi-spec.html)，该接口至少需要四个字节用于函数选择器。 如果调用数据长度小于四个字节，将跳转至 0x5E。

![这部分代码的流程图](flowchart-entry.png)

### 0x5E 处的处理程序（用于非应用程序二进制接口数据调用） {#the-handler-at-0x5e-for-non-abi-call-data}

| 偏移量 | 操作码       |
| -----: | ------------ |
|     5E | JUMPDEST     |
|     5F | CALLDATASIZE |
|     60 | PUSH2 0x007c |
|     63 | JUMPI        |

此代码片段以 `JUMPDEST` 开头。 如果跳转到的操作码不是 `JUMPDEST`，以太坊虚拟机程序会抛出异常。 然后它查看 CALLDATASIZE，如果为“true”（即非零），则跳转到 0x7C。 我们将在下面讨论。

| 偏移量 | 操作码     | 堆栈（在操作码之后）                                              |
| -----: | ---------- | ----------------------------------------------------------------- |
|     64 | CALLVALUE  | 调用提供的 [Wei](/glossary/#wei)。 在 Solidity 中称为 `msg.value` |
|     65 | PUSH1 0x06 | 6 CALLVALUE                                                       |
|     67 | PUSH1 0x00 | 0 6 CALLVALUE                                                     |
|     69 | DUP3       | CALLVALUE 0 6 CALLVALUE                                           |
|     6A | DUP3       | 6 CALLVALUE 0 6 CALLVALUE                                         |
|     6B | SLOAD      | Storage[6] CALLVALUE 0 6 CALLVALUE                                |

因此，当没有调用数据时，我们读取 Storage [6] 中的值。 我们还不知道这个值是什么，但我们可以查找合约收到的没有调用数据的交易。 仅转账以太币而没有任何调用数据（因此没有方法）的交易在 Etherscan 中具有方法 `Transfer`。 事实上，[合约收到的第一笔交易](https://etherscan.io/tx/0xeec75287a583c36bcc7ca87685ab41603494516a0f5986d18de96c8e630762e7)就是转账。

如果我们查看该交易并点击 **Click to see More**，我们会看到调用数据（称为输入数据）实际上是空的 (`0x`)。 另请注意，值为 1.559 ETH，稍后将介绍。

![调用数据是空的](calldata-empty.png)

接下来，点击 **State** 选项卡并展开我们正在进行逆向工程的合约 (0x2510...)。 可以看到在交易过程中 `Storage[6]` 确实发生了变化，如果你将十六进制更改为**数值**，就会看到该值变成了 1,559,000,000,000,000,000（为了清楚起见，这里添加了逗号），即转账数额（以 wei 为单位），对应于下一个合约价值。

![Storage[6] 中的变化](storage6.png)

如果我们查看同一段时间内[其他 `Transfer` 交易](https://etherscan.io/tx/0xf708d306de39c422472f43cb975d97b66fd5d6a6863db627067167cbf93d84d1#statechange)引起的状态变化，就会发现 `Storage[6]` 跟踪一段时间内的合约价值。 现在，我们将其称为 `Value*`。 星号 (`*`) 提醒我们，我们还不*知道*这个变量的作用，但它不会只是跟踪合约价值，因为当你可以使用 `ADDRESS BALANCE` 获取帐户余额时，无需使用非常昂贵的存储。 第一个操作码压入合约地址。 第二个操作码读取堆栈顶部的地址并将其替换为该地址的余额。

| 偏移量 | 操作码       | 堆栈                                        |
| -----: | ------------ | ------------------------------------------- |
|     6C | PUSH2 0x0075 | 0x75 Value\* CALLVALUE 0 6 CALLVALUE        |
|     6F | SWAP2        | CALLVALUE Value\* 0x75 0 6 CALLVALUE        |
|     70 | SWAP1        | Value\* CALLVALUE 0x75 0 6 CALLVALUE        |
|     71 | PUSH2 0x01a7 | 0x01A7 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|     74 | JUMP         |                                             |

我们将继续在跳转目标处跟踪此代码。

| 偏移量 | 操作码     | 堆栈                                                        |
| -----: | ---------- | ----------------------------------------------------------- |
|    1A7 | JUMPDEST   | Value\* CALLVALUE 0x75 0 6 CALLVALUE                        |
|    1A8 | PUSH1 0x00 | 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE                   |
|    1AA | DUP3       | CALLVALUE 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE         |
|    1AB | NOT        | 2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |

`NOT` 是按位运算符，因此它反转调用值中每一位的值。

| 偏移量 | 操作码       | 堆栈                                                                        |
| -----: | ------------ | --------------------------------------------------------------------------- |
|    1AC | DUP3         | Value\* 2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE         |
|    1AD | GT           | Value\*>2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE         |
|    1AE | ISZERO       | Value\*<=2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE        |
|    1AF | PUSH2 0x01df | 0x01DF Value\*<=2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|    1B2 | JUMPI        |                                                                             |

如果 `Value*` 小于 2^256-CALLVALUE-1 或等于它，则跳转。 这看起来像是防止溢出的逻辑。 事实上，我们看到在偏移量 0x01DE 处进行了一些无意义的操作（例如，写入内存后马上删除）后，如果检测到溢出，合约将回滚，这是正常行为。

请注意，这种溢出极不可能发生，因为它需要调用值加上 `Value*`，与 2^256 wei 相当，大约 10^59 个以太币。 [在撰写本文时，以太币的总供应量不到两亿个](https://etherscan.io/stat/supply)。

| 偏移量 | 操作码   | 堆栈                                      |
| -----: | -------- | ----------------------------------------- |
|    1DF | JUMPDEST | 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|    1E0 | POP      | Value\* CALLVALUE 0x75 0 6 CALLVALUE      |
|    1E1 | ADD      | Value\*+CALLVALUE 0x75 0 6 CALLVALUE      |
|    1E2 | SWAP1    | 0x75 Value\*+CALLVALUE 0 6 CALLVALUE      |
|    1E3 | JUMP     |                                           |

如果执行到此处，获取 `Value* + CALLVALUE` 并跳转到偏移量 0x75 处。

| 偏移量 | 操作码   | 堆栈                            |
| -----: | -------- | ------------------------------- |
|     75 | JUMPDEST | Value\*+CALLVALUE 0 6 CALLVALUE |
|     76 | SWAP1    | 0 Value\*+CALLVALUE 6 CALLVALUE |
|     77 | SWAP2    | 6 Value\*+CALLVALUE 0 CALLVALUE |
|     78 | SSTORE   | 0 CALLVALUE                     |

如果执行到此处（要求调用数据为空），我们将调用值添加到 `Value*`。 这与我们所说的 `Transfer` 交易的操作是一致的。

| 偏移量 | 操作码 |
| -----: | ------ |
|     79 | POP    |
|     7A | POP    |
|     7B | STOP   |

最后，清除堆栈（并非必需）并表明交易成功结束。

综上所述，初始代码的流程图如下所示。

![入口点流程图](flowchart-entry.png)

## 0x7C 的处理程序 {#the-handler-at-0x7c}

我特意没有将此处理程序的作用写入标题中。 重点不是教你这个特定的合约如何运作，而是如何对合约进行逆向工程。 你和我一样，都通过观察代码了解该合约的作用。

我们从多个位置执行到此处：

- 如果调用数据包含 1、2 或 3 个字节（从偏移量 0x63 处开始）
- 如果方法签名未知（从偏移量 0x42 和 0x5D 处开始）

| 偏移量 | 操作码       | 堆栈                 |
| -----: | ------------ | -------------------- |
|     7C | JUMPDEST     |                      |
|     7D | PUSH1 0x00   | 0x00                 |
|     7F | PUSH2 0x009d | 0x9D 0x00            |
|     82 | PUSH1 0x03   | 0x03 0x9D 0x00       |
|     84 | SLOAD        | Storage[3] 0x9D 0x00 |

这是另一个存储单元，我在任何交易中都找不到它，所以很难知道它的含义。 下面的代码将使其更明确。

| 偏移量 | 操作码                                            | 堆栈                            |
| -----: | ------------------------------------------------- | ------------------------------- |
|     85 | PUSH20 0xffffffffffffffffffffffffffffffffffffffff | 0xff....ff Storage[3] 0x9D 0x00 |
|     9A | AND                                               | Storage[3]-as-address 0x9D 0x00 |

上面的操作码将我们从 Storage[3] 读取的值截断为 160 位，即以太坊地址的长度。

| 偏移量 | 操作码 | 堆栈                            |
| -----: | ------ | ------------------------------- |
|     9B | SWAP1  | 0x9D Storage[3]-as-address 0x00 |
|     9C | JUMP   | Storage[3]-as-address 0x00      |

上面的跳转是多余的，因为我们要执行下一个操作码。 这个代码远不如它本应该的那样具有燃料效率。

| 偏移量 | 操作码     | 堆栈                            |
| -----: | ---------- | ------------------------------- |
|     9D | JUMPDEST   | Storage[3]-as-address 0x00      |
|     9E | SWAP1      | 0x00 Storage[3]-as-address      |
|     9F | POP        | Storage[3]-as-address           |
|     A0 | PUSH1 0x40 | 0x40 Storage[3]-as-address      |
|     A2 | MLOAD      | Mem[0x40] Storage[3]-as-address |

在代码的最开始，我们将 Mem[0x40] 设置为 0x80。 如果我们在后面部分查找 0x40，会发现我们没有更改它 - 所以我们可以假设它是 0x80。

| 偏移量 | 操作码       | 堆栈                                              |
| -----: | ------------ | ------------------------------------------------- |
|     A3 | CALLDATASIZE | CALLDATASIZE 0x80 Storage[3]-as-address           |
|     A4 | PUSH1 0x00   | 0x00 CALLDATASIZE 0x80 Storage[3]-as-address      |
|     A6 | DUP3         | 0x80 0x00 CALLDATASIZE 0x80 Storage[3]-as-address |
|     A7 | CALLDATACOPY | 0x80 Storage[3]-as-address                        |

将所有调用数据复制到内存，从 0x80 处开始。

| 偏移量 | 操作码        | 堆栈                                                                             |
| -----: | ------------- | -------------------------------------------------------------------------------- |
|     A8 | PUSH1 0x00    | 0x00 0x80 Storage[3]-as-address                                                  |
|     AA | DUP1          | 0x00 0x00 0x80 Storage[3]-as-address                                             |
|     AB | CALLDATASIZE  | CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address                                |
|     AC | DUP4          | 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address                           |
|     AD | DUP6          | Storage[3]-as-address 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address     |
|     AE | GAS           | GAS Storage[3]-as-address 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address |
|     AF | DELEGATE_CALL |                                                                                  |

现在事情清楚了很多。 此合约可以作为[代理](https://blog.openzeppelin.com/proxy-patterns/)，调用 Storage[3] 中的地址来完成真实的工作。 `DELEGATE_CALL` 调用另一个合约，但它保存在同一个存储中。 这意味着我们代理的受委托合约访问相同的存储空间。 调用的参数如下：

- _燃料_：所有剩余的燃料
- _调用地址_：Storage[3] 做为地址
- _调用数据_：从 0x80 开始的 CALLDATASIZE 字节数，0x80 是我们存入初始调用数据的位置
- _返回数据_：None (0x00 - 0x00) 我们将通过其他方式获取返回数据（见下文）

| 偏移量 | 操作码         | 堆栈                                                                                          |
| -----: | -------------- | --------------------------------------------------------------------------------------------- |
|     B0 | RETURNDATASIZE | RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address                          |
|     B1 | DUP1           | RETURNDATASIZE RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address           |
|     B2 | PUSH1 0x00     | 0x00 RETURNDATASIZE RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address      |
|     B4 | DUP5           | 0x80 0x00 RETURNDATASIZE RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address |
|     B5 | RETURNDATACOPY | RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address                          |

此处，我们将所有返回数据复制到从 0x80 开始的内存缓冲区。

| 偏移量 | 操作码       | 堆栈                                                                                                                         |
| -----: | ------------ | ---------------------------------------------------------------------------------------------------------------------------- |
|     B6 | DUP2         | (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address                              |
|     B7 | DUP1         | (((call success/failure))) (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address   |
|     B8 | ISZERO       | (((did the call fail))) (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address      |
|     B9 | PUSH2 0x00c0 | 0xC0 (((did the call fail))) (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address |
|     BC | JUMPI        | (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address                              |
|     BD | DUP2         | RETURNDATASIZE (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address               |
|     BE | DUP5         | 0x80 RETURNDATASIZE (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address          |
|     BF | RETURN       |                                                                                                                              |

因此在调用之后，我们将返回数据复制到缓冲区 0x80 - 0x80+RETURNDATASIZE，如果调用成功，我们将准确地 `RETURN` 该缓冲区。

### DELEGATECALL 失败 {#delegatecall-failed}

如果执行到此处，即到达 0xC0，意味着我们调用的合约已回滚。 由于我们只是该合约的代理，我们希望返回相同的数据并且也回滚。

| 偏移量 | 操作码   | 堆栈                                                                                                                |
| -----: | -------- | ------------------------------------------------------------------------------------------------------------------- |
|     C0 | JUMPDEST | (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address                     |
|     C1 | DUP2     | RETURNDATASIZE (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address      |
|     C2 | DUP5     | 0x80 RETURNDATASIZE (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address |
|     C3 | REVERT   |                                                                                                                     |

所以我们 `REVERT` 至我们之前用于 `RETURN` 的相同缓冲区：0x80 - 0x80+RETURNDATASIZE

![调用代理流程图](flowchart-proxy.png)

## 应用程序二进制接口调用 {#abi-calls}

如果调用数据长度为四个字节或更多，这可能是一个有效的应用程序二进制接口调用。

| 偏移量 | 操作码       | 堆栈                                              |
| -----: | ------------ | ------------------------------------------------- |
|      D | PUSH1 0x00   | 0x00                                              |
|      F | CALLDATALOAD | (((First word (256 bits) of the call data)))      |
|     10 | PUSH1 0xe0   | 0xE0 (((First word (256 bits) of the call data))) |
|     12 | SHR          | (((first 32 bits (4 bytes) of the call data)))    |

Etherscan 指出 `1C` 是一个未知操作码，因为[它是在 Etherscan 编写此功能后添加的](https://eips.ethereum.org/EIPS/eip-145)并且还没有更新。 [最新操作码表](https://github.com/wolflo/evm-opcodes)告诉我们这是右移操作。

| 偏移量 | 操作码           | 堆栈                                                                                                     |
| -----: | ---------------- | -------------------------------------------------------------------------------------------------------- |
|     13 | DUP1             | (((呼叫数据的前 32 位(4 字节))))(((呼叫数据的前 32 位(4 字节))))                                         |
|     14 | PUSH4 0x3cd8045e | 0x3CD8045E (((first 32 bits (4 bytes) of the call data))) (((first 32 bits (4 bytes) of the call data))) |
|     19 | GT               | 0x3CD8045E>first-32-bits-of-the-call-data (((first 32 bits (4 bytes) of the call data)))                 |
|     1A | PUSH2 0x0043     | 0x43 0x3CD8045E>first-32-bits-of-the-call-data (((first 32 bits (4 bytes) of the call data)))            |
|     1D | JUMPI            | (((first 32 bits (4 bytes) of the call data)))                                                           |

通过像这样将方法签名匹配测试一分为二，平均可以省去一半的测试。 紧随其后的代码和 0x43 处的代码遵循相同的模式：`DUP1` 调用数据的前 32 位，`PUSH4 (((method signature> `，运行 `EQ` 检查是否相等，然后如果方法签名匹配，`JUMPI`。 以下是方法签名、它们的地址以及[相应的方法定义](https://www.4byte.directory/)（如果已知）：

| 方法                                                                                   | 方法签名   | 跳转到的偏移量 |
| -------------------------------------------------------------------------------------- | ---------- | -------------- |
| [splitter()](https://www.4byte.directory/signatures/?bytes4_signature=0x3cd8045e)      | 0x3cd8045e | 0x0103         |
| ???                                                                                    | 0x81e580d3 | 0x0138         |
| [currentWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0xba0bafb4) | 0xba0bafb4 | 0x0158         |
| ???                                                                                    | 0x1f135823 | 0x00C4         |
| [merkleRoot()](https://www.4byte.directory/signatures/?bytes4_signature=0x2eb4a7ab)    | 0x2eb4a7ab | 0x00ED         |

如果没有找到匹配项，代码跳转到 [0x7C 处的代理处理程序](#the-handler-at-0x7c)，指望我们作为代理的合约有匹配项。

![应用程序二进制接口调用流程图](flowchart-abi.png)

## splitter() {#splitter}

| 偏移量 | 操作码       | 堆栈                          |
| -----: | ------------ | ----------------------------- |
|    103 | JUMPDEST     |                               |
|    104 | CALLVALUE    | CALLVALUE                     |
|    105 | DUP1         | CALLVALUE CALLVALUE           |
|    106 | ISZERO       | CALLVALUE 0 CALLVALUE         |
|    107 | PUSH2 0x01df | 0x010F CALLVALUE==0 CALLVALUE |
|    10A | JUMPI        | CALLVALUE                     |
|    10B | PUSH1 0x00   | 0x00 CALLVALUE                |
|    10D | DUP1         | 0x00 0x00 CALLValUE           |
|    10E | REVERT       |                               |

此函数首先检查调用没有发送任何以太币。 此函数不是 [`payable`](https://solidity-by-example.org/payable/)。 如果有人向我们发送了以太币，而那肯定是误发，我们希望 `REVERT` 以避免将此以太币放入他们无法取回的位置。

| 偏移量 | 操作码                                            | 堆栈                                                                        |
| -----: | ------------------------------------------------- | --------------------------------------------------------------------------- |
|    10F | JUMPDEST                                          |                                                                             |
|    110 | POP                                               |                                                                             |
|    111 | PUSH1 0x03                                        | 0x03                                                                        |
|    113 | SLOAD                                             | (((Storage[3] a.k.a the contract for which we are a proxy)))                |
|    114 | PUSH1 0x40                                        | 0x40 (((Storage[3] a.k.a the contract for which we are a proxy)))           |
|    116 | MLOAD                                             | 0x80 (((Storage[3] a.k.a the contract for which we are a proxy)))           |
|    117 | PUSH20 0xffffffffffffffffffffffffffffffffffffffff | 0xFF...FF 0x80 (((Storage[3] a.k.a the contract for which we are a proxy))) |
|    12C | SWAP1                                             | 0x80 0xFF...FF (((Storage[3] a.k.a the contract for which we are a proxy))) |
|    12D | SWAP2                                             | (((Storage[3] a.k.a the contract for which we are a proxy))) 0xFF...FF 0x80 |
|    12E | AND                                               | ProxyAddr 0x80                                                              |
|    12F | DUP2                                              | 0x80 ProxyAddr 0x80                                                         |
|    130 | MSTORE                                            | 0x80                                                                        |

0x80 现在包含代理地址

| 偏移量 | 操作码       | 堆栈      |
| -----: | ------------ | --------- |
|    131 | PUSH1 0x20   | 0x20 0x80 |
|    133 | ADD          | 0xA0      |
|    134 | PUSH2 0x00e4 | 0xE4 0xA0 |
|    137 | JUMP         | 0xA0      |

### E4 代码 {#the-e4-code}

这是我们第一次看到这些行，但它们与其他方法是共享的（见下文）。 所以我们将调用堆栈 X 中的值，记住在 `splitter()` 中此 X 的值是 0xA0。

| 偏移量 | 操作码     | 堆栈        |
| -----: | ---------- | ----------- |
|     E4 | JUMPDEST   | X           |
|     E5 | PUSH1 0x40 | 0x40 X      |
|     E7 | MLOAD      | 0x80 X      |
|     E8 | DUP1       | 0x80 0x80 X |
|     E9 | SWAP2      | X 0x80 0x80 |
|     EA | SUB        | X-0x80 0x80 |
|     EB | SWAP1      | 0x80 X-0x80 |
|     EC | RETURN     |             |

因此，此代码接收堆栈 (X) 中一个内存指针，并导致合约 `RETURN` 缓冲区 0x80 - X。

对于 `splitter()` 方法，将返回我们作为代理的地址。 `RETURN` 返回 0x80-0x9F 之间的缓冲区，这是我们写入此数据的位置（上面的偏移量 0x130）。

## currentWindow() {#currentwindow}

偏移量 0x158-0x163 中的代码与我们在 `splitter()` 中看到的 0x103-0x10E 中的代码相同（除 `JUMPI` 目标地址外），因此我们知道 `currentWindow ()` 也不是 `payable`。

| 偏移量 | 操作码       | 堆栈                 |
| -----: | ------------ | -------------------- |
|    164 | JUMPDEST     |                      |
|    165 | POP          |                      |
|    166 | PUSH2 0x00da | 0xDA                 |
|    169 | PUSH1 0x01   | 0x01 0xDA            |
|    16B | SLOAD        | Storage[1] 0xDA      |
|    16C | DUP2         | 0xDA Storage[1] 0xDA |
|    16D | JUMP         | Storage[1] 0xDA      |

### DA 代码 {#the-da-code}

此代码也与其他方法共享。 所以我们将调用堆栈 Y 中的值，并且记住在 `currentWindow()` 中这个 Y 的值是 Storage[1]。

| 偏移量 | 操作码     | 堆栈             |
| -----: | ---------- | ---------------- |
|     DA | JUMPDEST   | Y 0xDA           |
|     DB | PUSH1 0x40 | 0x40 Y 0xDA      |
|     DD | MLOAD      | 0x80 Y 0xDA      |
|     DE | SWAP1      | Y 0x80 0xDA      |
|     DF | DUP2       | 0x80 Y 0x80 0xDA |
|     E0 | MSTORE     | 0x80 Y 0xDA      |

将 Y 写入 0x80-0x9F。

| 偏移量 | 操作码     | 堆栈           |
| -----: | ---------- | -------------- |
|     E1 | PUSH1 0x20 | 0x20 0x80 0xDA |
|     E3 | ADD        | 0xA0 0xDA      |

其余部分已在[上面](#the-e4-code)解释过。 所以跳转到 0xDA，将栈顶 (Y) 的值写入 0x80-0x9F，并返回该值。 对于 `currentWindow()` 方法，返回 Storage[1]。

## merkleRoot() {#merkleroot}

偏移量 0xED-0xF8 中的代码与我们在 `splitter()` 中看到的 0x103-0x10E 中的代码相同（除 `JUMPI` 目标地址外），因此我们知道 `merkleRoot ()` 也不是 `payable`。

| 偏移量 | 操作码       | 堆栈                 |
| -----: | ------------ | -------------------- |
|     F9 | JUMPDEST     |                      |
|     FA | POP          |                      |
|     FB | PUSH2 0x00da | 0xDA                 |
|     FE | PUSH1 0x00   | 0x00 0xDA            |
|    100 | SLOAD        | Storage[0] 0xDA      |
|    101 | DUP2         | 0xDA Storage[0] 0xDA |
|    102 | JUMP         | Storage[0] 0xDA      |

[我们已经弄清楚了](#the-da-code)跳转后会发生什么。 嗯，`merkleRoot()` 返回 Storage[0]。

## 0x81e580d3 {#0x81e580d3}

偏移量 0x138-0x143 中的代码与我们在 `splitter()` 中看到的 0x103-0x10E 中的代码相同（除 `JUMPI` 目标地址外），因此我们知道此函数也不是 `payable`。

| 偏移量 | 操作码       | 堆栈                                                         |
| -----: | ------------ | ------------------------------------------------------------ |
|    144 | JUMPDEST     |                                                              |
|    145 | POP          |                                                              |
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
|    197 | SLT          | CALLDATASIZE-4<32 0x00 0x04 CALLDATASIZE 0x0153 0xDA         |
|    198 | ISZERO       | CALLDATASIZE-4>=32 0x00 0x04 CALLDATASIZE 0x0153 0xDA        |
|    199 | PUSH2 0x01a0 | 0x01A0 CALLDATASIZE-4>=32 0x00 0x04 CALLDATASIZE 0x0153 0xDA |
|    19C | JUMPI        | 0x00 0x04 CALLDATASIZE 0x0153 0xDA                           |

看起来此函数至少使用调用数据的 32 个字节（一个字）。

| 偏移量 | 操作码 | 堆栈                                         |
| -----: | ------ | -------------------------------------------- |
|    19D | DUP1   | 0x00 0x00 0x04 CALLDATASIZE 0x0153 0xDA      |
|    19E | DUP2   | 0x00 0x00 0x00 0x04 CALLDATASIZE 0x0153 0xDA |
|    19F | REVERT |                                              |

如果此函数没有获得调用数据，则交易将回滚且不会任何返回数据。

我们来看看，如果此函数*确实*获得了它需要的调用数据，会出现什么情况。

| 偏移量 | 操作码       | 堆栈                                     |
| -----: | ------------ | ---------------------------------------- |
|    1A0 | JUMPDEST     | 0x00 0x04 CALLDATASIZE 0x0153 0xD        |
|    1A1 | POP          | 0x04 CALLDATASIZE 0x0153 0xDA            |
|    1A2 | CALLDATALOAD | calldataload(4) CALLDATASIZE 0x0153 0xDA |

`calldataload(4)` 是在方法签名*之后*调用数据的第一个字

| 偏移量 | 操作码       | 堆栈                                                                         |
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
|    175 | LT           | calldataload(4)<Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA         |
|    176 | PUSH2 0x017e | 0x017EC calldataload(4)<Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA |
|    179 | JUMPI        | calldataload(4) 0x04 calldataload(4) 0xDA                                    |

如果第一个字不小于 Storage[4]，则函数失败。 此函数回滚且没有任何返回值：

| 偏移量 | 操作码     | 堆栈          |
| -----: | ---------- | ------------- |
|    17A | PUSH1 0x00 | 0x00 ...      |
|    17C | DUP1       | 0x00 0x00 ... |
|    17D | REVERT     |               |

如果 calldataload(4) 小于 Storage[4]，我们得到以下代码：

| 偏移量 | 操作码     | 堆栈                                                |
| -----: | ---------- | --------------------------------------------------- |
|    17E | JUMPDEST   | calldataload(4) 0x04 calldataload(4) 0xDA           |
|    17F | PUSH1 0x00 | 0x00 calldataload(4) 0x04 calldataload(4) 0xDA      |
|    181 | SWAP2      | 0x04 calldataload(4) 0x00 calldataload(4) 0xDA      |
|    182 | DUP3       | 0x00 0x04 calldataload(4) 0x00 calldataload(4) 0xDA |
|    183 | MSTORE     | calldataload(4) 0x00 calldataload(4) 0xDA           |

并且内存位置 0x00-0x1F 现在包含数据 0x04（0x00-0x1E 中都是零，0x1F 中是 4）

| 偏移量 | 操作码     | 堆栈                                                                    |
| -----: | ---------- | ----------------------------------------------------------------------- |
|    184 | PUSH1 0x20 | 0x20 calldataload(4) 0x00 calldataload(4) 0xDA                          |
|    186 | SWAP1      | calldataload(4) 0x20 0x00 calldataload(4) 0xDA                          |
|    187 | SWAP2      | 0x00 0x20 calldataload(4) calldataload(4) 0xDA                          |
|    188 | SHA3       | (((SHA3 of 0x00-0x1F))) calldataload(4) calldataload(4) 0xDA            |
|    189 | ADD        | (((SHA3 of 0x00-0x1F)))+calldataload(4) calldataload(4) 0xDA            |
|    18A | SLOAD      | Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] calldataload(4) 0xDA |

所以存储中有一个查找表，它从 0x000...0004 的 SHA3 开始，并且为每个合法调用数据值（低于 Storage[4] 位置的值）提供一个数据项。

| 偏移量 | 操作码 | 堆栈                                                                    |
| -----: | ------ | ----------------------------------------------------------------------- |
|    18B | SWAP1  | calldataload(4) Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA |
|    18C | POP    | Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA                 |
|    18D | DUP2   | 0xDA Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA            |
|    18E | JUMP   | Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA                 |

我们已经知道[偏移量 0xDA 处的代码](#the-da-code)执行的操作，它将栈顶值返回给调用者。 所以此函数将查找表中的值返回给调用者。

## 0x1f135823 {#0x1f135823}

偏移量 0xC4-0xCF 中的代码与我们在 `splitter()` 中看到的 0x103-0x10E 中的代码相同（除 `JUMPI` 目标地址外），因此我们知道此函数也不是 `payable`。

| 偏移量 | 操作码       | 堆栈              |
| -----: | ------------ | ----------------- |
|     D0 | JUMPDEST     |                   |
|     D1 | POP          |                   |
|     D2 | PUSH2 0x00da | 0xDA              |
|     D5 | PUSH1 0x06   | 0x06 0xDA         |
|     D7 | SLOAD        | Value\* 0xDA      |
|     D8 | DUP2         | 0xDA Value\* 0xDA |
|     D9 | JUMP         | Value\* 0xDA      |

我们已经知道[偏移量 0xDA 处的代码](#the-da-code)执行的操作，它将栈顶值返回给调用者。 所以此函数返回 `Value*`。

### 方法摘要 {#method-summary}

你觉得自己现在理解合约了？ 我认为没有。 目前为止，我们使用了以下方法：

| 方法                              | 意义                                        |
| --------------------------------- | ------------------------------------------- |
| Transfer                          | 接受调用提供的值并将 `Value*` 增加该数量    |
| [splitter()](#splitter)           | 返回 Storage[3]，代理地址                   |
| [currentWindow()](#currentwindow) | 返回 Storage[1]                             |
| [merkleRoot()](#merkeroot)        | 返回 Storage[0]                             |
| [0x81e580d3](#0x81e580d3)         | 返回查找表中的值，前提是参数小于 Storage[4] |
| [0x1f135823](#0x1f135823)         | 返回 Storage[6], a.k.a. 值\*                |

但是我们知道 Storage[3] 中的合约还提供了其他功能。 也许如果我们知道该合约是什么，它就会给我们一条线索。 值得庆幸的是，这是区块链，一切都是已知的，至少理论上是这样。 我们没有看到任何设置 Storage[3] 的方法，所以它一定是由构造函数设置的。

## 构造函数 {#the-constructor}

当我们[查看合约](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f)时，我们还可以看到创建它的交易。

![点击创建的交易](create-tx.png)

如果我们点击该交易，然后点击 **State** 选项卡，我们可以看到参数的初始值。 具体来讲，我们可以看到 Storage[3] 包含 [0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761](https://etherscan.io/address/0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761)。 该合约必须包含缺少的功能。 我们可以借助我们正在研究的合约中使用的相同工具来理解它。

## 代理合约 {#the-proxy-contract}

借助我们用于上述初始合约的相同技术，我们可以看到该合约在以下情况回滚：

- 调用 (0x05-0x0F) 附加了任何以太币
- 调用数据长度小于 4（0x10-0x19 和 0xBE-0xC2）

它支持以下方法：

| 方法                                                                                                            | 方法签名                     | 跳转到的偏移量 |
| --------------------------------------------------------------------------------------------------------------- | ---------------------------- | -------------- |
| [scaleAmountByPercentage(uint256,uint256)](https://www.4byte.directory/x/?bytes4_signature=0x8ffb5c97)          | 0x8ffb5c97                   | 0x0135         |
| [isClaimed(uint256,address)](https://www.4byte.directory/signatures/?bytes4_signature=0xd2ef0795)               | 0xd2ef0795                   | 0x0151         |
| [claim(uint256,address,uint256,bytes32[])](https://www.4byte.directory/signatures/?bytes4_signature=0x2e7ba6ef) | 0x2e7ba6ef                   | 0x00F4         |
| [incrementWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0x338b1d31)                        | 0x338b1d31                   | 0x0110         |
| ???                                                                                                             | 0x3f26479e                   | 0x0118         |
| ???                                                                                                             | 0x1e7df9d3                   | 0x00C3         |
| [currentWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0xba0bafb4)                          | [0xba0bafb4](#currentwindow) | 0x0148         |
| [merkleRoot()](https://www.4byte.directory/signatures/?bytes4_signature=0x2eb4a7ab)                             | [0x2eb4a7ab](#merkleroot)    | 0x0107         |
| ???                                                                                                             | [0x81e580d3](#0x81e580d3)    | 0x0122         |
| ???                                                                                                             | [0x1f135823](#0x1f135823)    | 0x00D8         |

我们可以忽略最下面的四种方法，因为我们永远都不会遇到它们。 由于这些方法的签名，我们的初始合约将自行处理它们（可以点击上面的签名查看详细信息），因此它们必须是[被重写的方法](https://medium.com/upstate-interactive/solidity-override-vs-virtual-functions-c0a5dfb83aaf)。

在剩下方法中，其中一个是 `claim(<params>)`，另一个是`isClaimed(<params>)`，所以此合约看起来像一个空投合约。 我们可以[尝试使用反编译器](https://etherscan.io/bytecode-decompiler?a=0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761)，而不是逐个操作码查看其余代码，反编译器会为此合约中的以下三个函数生成有用的结果。 其他合约的逆向工程留给读者作为练习。

### scaleAmountByPercentage {#scaleamountbypercentage}

这是反编译器为此函数提供的结果：

```python
def unknown8ffb5c97(uint256 _param1, uint256 _param2) payable:
  require calldata.size - 4 >=′ 64
  if _param1 and _param2 > -1 / _param1:
      revert with 0, 17
  return (_param1 * _param2 / 100 * 10^6)
```

第一个 `require` 测试调用数据除了有函数签名的 4 个字节外，至少还要有 64 个字节，方可容纳两个参数。 如果不是，那么显然有问题。

`if` 语句似乎检查 `_param1` 不为零，并且 `_param1 * _param2` 不是负数。 这可能是为了防止发生回绕的情况。

最后，此函数返回一个调整后的值。

### claim {#claim}

反编译器创建的代码很复杂，并不是所有代码都与我们相关。 这里将跳过其中一些内容，专注于我认为提供有用信息的行

```python
def unknown2e7ba6ef(uint256 _param1, uint256 _param2, uint256 _param3, array _param4) payable:
  ...
  require _param2 == addr(_param2)
  ...
  if currentWindow <= _param1:
      revert with 0, 'cannot claim for a future window'
```

我们在这里看到两件重要的事情：

- `_param2`，虽然被声明为 `uint256`，但实际上是一个地址
- `_param1` 是被声明的窗口，它必须是 `currentWindow` 或更早。

```python
  ...
  if stor5[_claimWindow][addr(_claimFor)]:
      revert with 0, 'Account already claimed the given window'
```

所以现在我们知道 Storage[5] 是一个窗口和地址数组，并知道该地址是否申领了此窗口内奖励。

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

我们知道 `unknown2eb4a7ab` 实际上是函数 `merkleRoot()`，所以此代码看起来像是在验证一个[默克尔证明](https://medium.com/crypto-0-nite/merkle-proofs-explained-6dd429623dc5)。 这意味着 `_param4` 是默克尔证明。

```python
  call addr(_param2) with:
     value unknown81e580d3[_param1] * _param3 / 100 * 10^6 wei
       gas 30000 wei
```

这就是合约将自己的以太币转账到另一个地址（合约地址或外部地址）的方式。 它使用一个值来调用该函数，该值是要转账的金额。 因此，该合约看起来像是一次以太币空投。

```python
  if not return_data.size:
      if not ext_call.success:
          require ext_code.size(stor2)
          call stor2.deposit() with:
             value unknown81e580d3[_param1] * _param3 / 100 * 10^6 wei
```

下面两行表明 Storage[2] 也是我们调用的合约。 如果我们[查阅构造函数交易](https://etherscan.io/tx/0xa1ea0549fb349eb7d3aff90e1d6ce7469fdfdcd59a2fd9b8d1f5e420c0d05b58#statechange)，就会看到此合约是 [0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)，即一个封装的以太币合约，[其源代码已经上传到 Etherscan](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2#code)。

是的，看起来这些合约试图将以太币发送到 `_param2`。 如果它可以做到，那就太好了。 如果做不到，它会尝试发送 [WETH](https://weth.tkn.eth.limo/)。 如果 `_param2` 是外部帐户(EOA)，那么它总是可以收到以太币，但合约帐户可以拒绝接收以太币。 但是，WETH 是 ERC-20，合约不能拒绝接受。

```python
  ...
  log 0xdbd5389f: addr(_param2), unknown81e580d3[_param1] * _param3 / 100 * 10^6, bool(ext_call.success)
```

在此函数结束时，我们看到正在生成一个日志项。 [查看生成的日志项](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f#events)并筛选以 `0xdbd5...` 开头的主题。 如果[点击生成此类项的其中一个交易](https://etherscan.io/tx/0xe7d3b7e00f645af17dfbbd010478ef4af235896c65b6548def1fe95b3b7d2274)，我们会看到它确实看起来像一个声明 - 该帐户向我们进行逆向工程的合约发送一条消息并获得了以太币。

![声明交易](claim-tx.png)

### 1e7df9d3 {#1e7df9d3}

此函数和上面的 [`claim`](#claim) 非常相似。 它也检查默克尔证明，尝试将以太币转账到第一个参数，并生成相同类型的日志项。

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

主要区别在于第一个参数，即要提款的窗口，不存在。 相反，所有可以声明的窗口都有一个循环。

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

所以它看起来像一个声明所有窗口的 `claim` 变体。

## 总结 {#conclusion}

现在，你应该知道如何通过操作码或反编译器（当它有效时）理解没有源代码的智能合约。 从本文的篇幅明显可以看出，对合约进行逆向工程并非易事，但在安全性至关重要的系统中，能够验证合约是否按承诺运作是一项重要技能。
