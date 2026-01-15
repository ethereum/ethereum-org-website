---
title: 部署你的第一个智能合约
description: 介绍如何在以太坊测试网上部署您的第一个智能合约
author: "jdourlens"
tags: [ "智能合同", "remix", "Solidity", "部署" ]
skill: beginner
lang: zh
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/deploying-your-first-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

我们想必您和我们一样兴奋，即将在以太坊区块链上[部署](/developers/docs/smart-contracts/deploying/)并与您的第一个[智能合约](/developers/docs/smart-contracts/)交互。

别担心，由于这是我们的第一个智能合约，我们会将其部署在[本地测试网](/developers/docs/networks/)上，因此您不需要任何开销就可以随意部署和运行它。

## 编写合约 {#writing-our-contract}

第一步是[访问 Remix](https://remix.ethereum.org/) 并创建一个新文件。 在 Remix 界面的左上角，添加一个新文件并输入您想要的文件名。

![在 Remix 界面中添加新文件](./remix.png)

在新文件中，我们将粘贴以下代码。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17;

contract Counter {

    // 用于记录计数的无符号整数类型的公共变量
    uint256 public count = 0;

    // 递增计数器的函数
    function increment() public {
        count += 1;
    }

    // 用于获取计数值的非必要 getter 函数
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

如果您有编程经验，应该可以轻松猜出这个程序是做什么的。 下面是逐行解释：

- 第 4 行：我们定义了一个名为 `Counter` 的合约。
- 第 7 行：我们的合约存储了一个名为 `count` 的无符号整数，初始值为 0。
- 第 10 行：第一个函数会修改合约的状态，并调用 `increment()` 来递增我们的变量 `count`。
- 第 15 行：第二个函数只是一个取值器，用于在智能合约外部读取 `count` 变量的值。 请注意，由于我们将 `count` 变量定义为 public，这个函数不是必需的，但这里用作示例。

我们第一个简单的智能合约就是这样。 您可能知道，它看起来像 Java 或 C++ 等 OOP（面向对象编程）语言中的类。 现在是时候体验我们的合约了。

## 部署合约 {#deploying-our-contract}

我们已经编写了第一个智能合约，现在要将它部署到区块链上进行体验。

在区块链上[部署智能合约](/developers/docs/smart-contracts/deploying/)实际上只是发送一笔包含已编译智能合约代码且未指定任何接收者的交易。

我们首先通过点击左侧的编译图标来[编译合约](/developers/docs/smart-contracts/compiling/)：

![Remix 工具栏中的编译图标](./remix-compile-button.png)

然后点击编译按钮：

![Remix Solidity 编译器中的编译按钮](./remix-compile.png)

您可以选择“Auto compile”选项，这样当您在文本编辑器中保存内容时，合约将始终被编译。

然后导航至“deploy and run transactions”屏幕：

![Remix 工具栏中的部署图标](./remix-deploy.png)

进入“deploy and run transactions”屏幕后，请再次确认您的合约名称已显示，然后点击 Deploy。 如您在页面顶部所见，当前环境是“JavaScript 虚拟机”，这意味着我们将在本地测试区块链上部署我们的智能合约并与之交互，以便能够更快地进行测试，且无须支付任何费用。

![Remix Solidity 编译器中的部署按钮](./remix-deploy-button.png)

点击“Deploy”按钮后，您会看到您的合约出现在底部。 点击左边的箭头展开，这样就能看到我们合约的内容。 这里有我们的变量 `counter`、`increment()` 函数和 getter `getCounter()`。

如果您点击 `count` 或 `getCount` 按钮，它将实际检索并显示合约的 `count` 变量的内容。 由于我们还没有调用 `increment` 函数，它应该显示 0。

![Remix Solidity 编译器中的函数按钮](./remix-function-button.png)

现在我们来点击按钮，调用 `increment` 函数。 您会在窗口底部看到已执行交易的日志。 您会发现，当您按下检索数据的按钮时，日志与按下 `increment` 按钮时的日志是不同的。 这是因为在区块链上读取数据不需要任何交易（写入）或费用。 因为只有修改区块链的状态才需要进行交易：

![交易日志](./transaction-log.png)

按下 increment 按钮后，会生成一个调用我们 `increment()` 函数的交易。之后，如果我们再点击 count 或 getCount 按钮，就会读取到智能合约的最新状态，其中的 count 变量值将大于 0。

![智能合约的最新更新状态](./updated-state.png)

在下一篇教程中，我们将介绍[如何向您的智能合约添加事件](/developers/tutorials/logging-events-smart-contracts/)。 记录事件是调试您的智能合约和了解调用函数时发生的情况的便捷方式。
