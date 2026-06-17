---
title: 使用事件记录智能合约数据
description: 智能合约事件简介以及如何使用它们记录数据
author: "jdourlens"
tags:
  - 智能合约
  - remix
  - solidity
  - 事件
skill: intermediate
breadcrumb: 事件记录
lang: zh
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/logging-data-with-events/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

在 Solidity 中，[事件](/developers/docs/smart-contracts/anatomy/#events-and-logs)是智能合约可以触发的调度信号。去中心化应用 (dapp) 或任何连接到以太坊 JSON-RPC API 的程序都可以监听这些事件并采取相应的行动。事件也可以被索引，以便以后可以搜索事件历史记录。

## 事件 {#events}

在撰写本文时，以太坊区块链上最常见的事件是 ERC-20 代币在有人转账代币时触发的 Transfer 事件。

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

事件签名在合约代码内部声明，并可以使用 emit 关键字触发。例如，transfer 事件记录了谁发起了转账（_from_）、转账给谁（_to_）以及转账了多少代币（_value_）。

如果我们回到我们的 Counter 智能合约，并决定在每次值更改时进行记录。由于该合约不打算被部署，而是作为通过继承来构建另一个合约的基础：它被称为抽象合约。在我们的计数器示例中，它看起来像这样：

```solidity
pragma solidity 0.5.17;

contract Counter {

    event ValueChanged(uint oldValue, uint256 newValue);

    // 类型为无符号整型的私有变量，用于保存计数数量
    uint256 private count = 0;

    // 用于递增计数器的函数
    function increment() public {
        count += 1;
        emit ValueChanged(count - 1, count);
    }

    // 用于获取计数值的 Getter
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

请注意：

- **第 5 行**：我们声明了我们的事件及其包含的内容，即旧值和新值。

- **第 13 行**：当我们递增 count 变量时，我们触发该事件。

如果我们现在部署该合约并调用 increment 函数，我们会看到，如果你点击名为 logs 的数组中的新交易，Remix 将自动显示它。

![Remix screenshot](./remix-screenshot.png)

日志对于调试智能合约非常有用，但如果你构建供不同人使用的应用程序，它们也很重要，并且可以更轻松地进行分析以跟踪和了解智能合约的使用情况。交易生成的日志会显示在流行的区块浏览器中，例如，你还可以使用它们创建链下脚本，以监听特定事件并在事件发生时采取行动。