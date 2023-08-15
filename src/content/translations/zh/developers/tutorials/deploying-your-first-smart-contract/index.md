---
title: 部署第一个智能合约
description: 介绍如何在以太坊测试网络上部署您第一个智能合约
author: "jdourlens"
tags:
  - "智能合约"
  - "remix"
  - "solidity"
  - "部署"
skill: beginner
lang: zh
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/deploying-your-first-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

我猜您和我们一样会很兴奋在以太坊区块链上[部署](/developers/docs/smart-contracts/deploying/)[智能合约](/developers/docs/smart-contracts/)并与之交互。

别担心，作为我们的第一个智能合约，我们会将其部署在[本地测试网络](/developers/docs/networks/)上，因此您不需要任何开销就可以随意部署和运行它。

## 编写合约 {#writing-our-contract}

第一步[访问 Remix](https://remix.ethereum.org/)并创建一个新文件。 在 Remix 界面的左上角添加一个新文件，并输入所需的文件名。

![在Remix界面中添加一个新文件](./remix.png)

在这个新文件中，我们将粘贴如下代码：

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17;

contract Counter {

    // Public variable of type unsigned int to keep the number of counts
    uint256 public count = 0;

    // Function that increments our counter
    function increment() public {
        count += 1;
    }

    // Not necessary getter to get the count value
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

如果您曾经写过程序，应该可以轻松猜到这个程序是做什么的。 下面按行解释：

- 第 4 行：我们定义了一个名为 `Counter` 的合约。
- 第 7 行：我们的合约存储了一个无符号整型 `count`，从 0 开始。
- 第 10 行：第一个函数将修改合约的状态，并使用 `increment()` 递增我们的变量 `count`。
- 第 15 行，第二个函数就是一个取值器，能够从智能合约外部读取 `count` 变量的值。 请注意，因为我们将 `count` 变量定义为公共变量，所以这个函数是不必要的，但它可以作为一个例子展示。

第一个简单的智能合约到此结束。 正如您所知，它看上去像是 Java 或 C++ 这样的面向对象编程 (OOP) 语言中的一个类。 现在可以运行我们的合约了。

## 部署合约 {#deploying-our-contract}

当我们写了第一个智能合约后，我们现在可以将它部署在区块链中并运行它。

[在区块链上部署智能合约](/developers/docs/smart-contracts/deploying/)实际上只是发送了一个包含已编译智能合约代码的交易，并且没有指定任何收件人。

我们首先点击左侧的编译图标来[编译合约](/developers/docs/smart-contracts/compiling/)：

![Remix工具栏中的编译图标](./remix-compile-button.png)

然后点击编译按钮：

![Remix solidity编译器的编译按钮](./remix-compile.png)

您可以选择“Auto compile”选项，这样在将合约内容保存到文本编辑器时合约也随之编译。

然后切换到部署和运行交易屏幕：

![Remix工具栏的部署图标](./remix-deploy.png)

在“部署和运行交易”屏幕上，仔细检查显示的合约名称并点击“部署”。 正如您在页面顶部所见，当前环境是“JavaScript 虚拟机”，这意味着我们将在本地测试区块链上部署我们的智能合约并与之交互，以便能够更快地进行测试且无须支付任何费用。

![Remix solidity编译器的部署按钮](./remix-deploy-button.png)

点击“部署”按钮后，您可以看到合约在底部显示出来。 点击左侧的箭头展开，可以看到合约的内容。 这里有我们的变量`counter`、函数`increment()`和 getter `getCounter()`。

如果您点击`count`或`getCount`按钮，它将实际检索合约的`count`变量的内容，并显示出来。 因为我们尚未调用`increment`函数，它应该显示 0。

![Remix solidity编译器的函数按钮](./remix-function-button.png)

现在点击按钮来调用`increment`函数。 您可以在窗口底部看到交易产生的日志。 当按下检索数据按钮而非`increment`按钮时，您看到的日志有所不同。 这是因为读取区块链的数据不需要任何交易（写入）或费用。 因为只有修改区块链的状态需要进行交易。

![交易日志](./transaction-log.png)

在按下 increment 按钮后，将产生一个交易来调用我们的`increment()`函数，如果我们点击 count 或 getCount 按钮，将读取我们的智能合约的最新状态，count 变量大于 0。

![智能合约状态的最新更新](./updated-state.png)

在下一个教程中，我们将论述[如何在智能合约中添加事件](/developers/tutorials/logging-events-smart-contracts/)。 记录事件是调试智能合约了解调用函数时所发生情况的方便方式。
