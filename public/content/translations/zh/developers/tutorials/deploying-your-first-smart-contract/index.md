---
title: 部署你的第一个智能合约
description: 在以太坊测试网络上部署你的第一个智能合约的简介
author: "jdourlens"
tags: ["智能合约", "remix", "solidity", "部署"]
skill: beginner
breadcrumb: 部署第一个合约
lang: zh
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/deploying-your-first-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

我想你和我们一样，对在以太坊区块链上[部署](/developers/docs/smart-contracts/deploying/)并与你的第一个[智能合约](/developers/docs/smart-contracts/)进行交互感到兴奋。

别担心，因为这是我们的第一个智能合约，我们将把它部署在[本地测试网络](/developers/docs/networks/)上，这样你就可以免费部署并尽情测试它。

## 编写我们的合约 {#writing-our-contract}

第一步是[访问 Remix](https://remix.ethereum.org/) 并创建一个新文件。在 Remix 界面的左上角添加一个新文件，并输入你想要的文件名。

![Adding a new file in the Remix interface](./remix.png)

在新文件中，我们将粘贴以下代码。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17;

contract Counter {

    // 用于保存计数的无符号整型公开变量
    uint256 public count = 0;

    // 递增我们计数器的函数
    function increment() public {
        count += 1;
    }

    // 用于获取计数值的不必要的 getter
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

如果你有编程经验，你可以很容易猜出这个程序的作用。以下是逐行解释：

- 第 4 行：我们定义了一个名为 `Counter` 的合约。
- 第 7 行：我们的合约存储了一个名为 `count` 的无符号整数，初始值为 0。
- 第 10 行：第一个函数将修改合约的状态，并对我们的变量 `count` 执行 `increment()`（递增）操作。
- 第 15 行：第二个函数只是一个 getter（获取器），以便能够在智能合约外部读取 `count` 变量的值。请注意，由于我们将 `count` 变量定义为 public（公开），这其实不是必需的，但在此作为示例展示。

这就是我们第一个简单的智能合约的全部内容。如你所知，它看起来就像 Java 或 C++ 等面向对象编程 (OOP) 语言中的类。现在是时候来测试我们的合约了。

## 部署我们的合约 {#deploying-our-contract}

既然我们已经编写了第一个智能合约，现在我们将把它部署到区块链上，以便能够对其进行测试。

[在区块链上部署智能合约](/developers/docs/smart-contracts/deploying/)实际上只是发送一笔包含已编译智能合约代码的交易，而不指定任何接收方。

我们首先通过点击左侧的编译图标来[编译合约](/developers/docs/smart-contracts/compiling/)：

![The compile icon in the Remix toolbar](./remix-compile-button.png)

然后点击编译按钮：

![The compile button in the Remix solidity compiler](./remix-compile.png)

你可以选择勾选“Auto compile”（自动编译）选项，这样当你在文本编辑器中保存内容时，合约就会自动编译。

然后导航到“deploy and run transactions”（部署并运行交易）界面：

![The deploy icon in the Remix toolbar](./remix-deploy.png)

进入“deploy and run transactions”界面后，仔细检查你的合约名称是否出现，然后点击“Deploy”（部署）。正如你在页面顶部所见，当前环境是“JavaScript VM”，这意味着我们将在本地测试区块链上部署并与我们的智能合约进行交互，以便能够更快地进行测试且无需支付任何费用。

![The deploy button in the Remix solidity compiler](./remix-deploy-button.png)

点击“Deploy”按钮后，你会看到你的合约出现在底部。点击左侧的箭头将其展开，这样我们就能看到合约的内容。这里有我们的变量 `counter`、我们的 `increment()` 函数以及 getter `getCounter()`。

如果你点击 `count` 或 `getCount` 按钮，它实际上会检索合约中 `count` 变量的内容并将其显示出来。由于我们还没有调用 `increment` 函数，它应该显示为 0。

![The function button in the Remix solidity compiler](./remix-function-button.png)

现在让我们通过点击按钮来调用 `increment` 函数。你会看到已执行交易的日志出现在窗口底部。你会发现，当你按下检索数据的按钮时，日志与按下 `increment` 按钮时的日志是不同的。这是因为在区块链上读取数据不需要任何交易（写入）或费用。因为只有修改区块链的状态才需要发起交易：

![A log of transactions](./transaction-log.png)

按下 increment 按钮将生成一笔交易来调用我们的 `increment()` 函数，之后如果我们再次点击 count 或 getCount 按钮，我们将读取到智能合约最新更新的状态，此时 count 变量的值将大于 0。

![Newly updated state of the smart contract](./updated-state.png)

在下一个教程中，我们将介绍[如何向你的智能合约添加事件](/developers/tutorials/logging-events-smart-contracts/)。记录事件日志是调试智能合约并了解调用函数时发生情况的一种便捷方式。