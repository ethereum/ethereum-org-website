---
title: "使用事件记录智能合约数据"
description: "智能合约事件简介以及如何使用它们记录数据"
author: "jdourlens"
tags:
  - 智能合约
  - remix
  - solidity
  - 事件
skill: intermediate
breadcrumb: "事件记录"
lang: zh
published: 2020-04-03
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

在 Solidity 中，[事件](/developers/docs/smart-contracts/anatomy/#events-and-logs)是智能合约可以触发的调度信号。去中心化应用 (dapp) 或任何连接到以太坊 JSON-RPC API 的程序都可以监听这些事件并采取相应的行动。事件也可以被索引，以便以后可以搜索事件历史记录。

## 事件 {#events}

以太坊区块链上最常见的事件之一是 ``Transfer`` 事件，当有人转账代币时，ERC-20 代币会触发该事件。

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

事件签名在合约代码内部声明，并且可以使用 emit 关键字触发。例如，转账事件会记录谁发起了转账（_from_）、转给谁（_to_）以及转账了多少代币（_value_）。

让我们回到[部署你的第一个智能合约](/developers/tutorials/deploying-your-first-smart-contract/)中的 ``Counter`` 智能合约，并在每次值改变时记录日志。它看起来像这样：

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Counter {

    event ValueChanged(uint256 oldValue, uint256 newValue);

    // 无符号整型公有变量，用于记录计数值
    uint256 public count = 0;

    // 递增计数器的函数
    function increment() public {
        count += 1;
        emit ValueChanged(count - 1, count);
    }

    // 非必需的 getter，用于获取计数值
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

请注意：

- **第 6 行**：我们声明了我们的事件及其包含的内容，即旧值和新值。

- **第 14 行**：当我们递增 count 变量时，我们触发该事件。

如果我们现在部署合约并调用 increment 函数，你会看到，如果你点击新交易，Remix 会在一个名为 logs 的数组中自动显示它。

![Remix 屏幕截图](./remix-screenshot.png)

日志对于调试智能合约非常有用，但如果你构建供不同人使用的应用程序，它们也很重要，并且可以让你更轻松地进行分析，以跟踪和了解你的智能合约是如何被使用的。交易生成的日志会显示在流行的区块浏览器中，例如，你还可以使用它们创建链下脚本，以监听特定事件并在事件发生时采取行动。
