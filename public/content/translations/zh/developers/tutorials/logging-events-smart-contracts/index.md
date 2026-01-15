---
title: 使用事件记录智能合约中的数据
description: 智能合约事件的简介，以及如何利用事件来记录数据
author: "jdourlens"
tags: [ "智能合同", "remix", "Solidity", "事件" ]
skill: intermediate
lang: zh
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/logging-data-with-events/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

在 Solidity 中，[事件](/developers/docs/smart-contracts/anatomy/#events-and-logs)是智能合约可以发出的信号。 去中心化应用程序或任何连接到以太坊 JSON-RPC API 的应用都可以监听这些事件并采取相应行动。 还可以为事件编制索引，便于以后可以搜索事件历史。

## 事件 {#events}

在撰写本文时，以太坊区块链上最常见的事件是当有人转移代币时由 ERC20 代币触发的转账事件。

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

事件签名在合约代码中声明，可以使用 `emit` 关键字触发。 例如，转账事件记录了谁发送了转账 (`_from`)、转账给谁 (`_to`)，以及转账的代币数量 (`_value`)。

如果我们回到我们的 Counter 智能合约并决定在每次值变化时记录。 由于这个合约不是为了部署，而是作为基础，通过扩展来构建另一个合约：因此它被称为抽象合约。 在我们的计数器示例中，此合约如下所示：

```solidity
pragma solidity 0.5.17;

contract Counter {

    event ValueChanged(uint oldValue, uint256 newValue);

    // 用于保存计数的私有无符号整数变量
    uint256 private count = 0;

    // 递增计数器的函数
    function increment() public {
        count += 1;
        emit ValueChanged(count - 1, count);
    }

    // 用于获取计数值的 getter 函数
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

注意：

- **第 5 行**：我们声明了事件及其包含的内容、旧值以及新值。

- **第 13 行**：当我们增加 `count` 变量的值时，我们会触发事件。

如果我们现在部署合约并调用 `increment` 函数，如果你在名为 `logs` 的数组内单击新交易，我们将看到 Remix 会自动显示它。

![Remix 屏幕截图](./remix-screenshot.png)

日志在调试智能合约时非常有用，但如果你构建供不同人使用的应用程序，日志也很重要，因为它们可以让你更轻松地进行分析，以跟踪和了解你的智能合约是如何被使用的。 交易生成的日志显示在常见区块浏览器中，例如，你还可以使用日志创建链下脚本，以便监听特定事件并在事件发生时采取行动。
