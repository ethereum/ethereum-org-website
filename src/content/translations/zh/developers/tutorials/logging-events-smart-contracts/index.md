---
title: 使用事件记录智能合约中的数据
description: 智能合约事件的简介，以及如何利用事件来记录数据
author: "jdourlens"
tags:
  - "智能合约"
  - "remix"
  - "solidity"
  - "事件"
skill: intermediate
lang: zh
published: 2020-04-03
source: 以太坊开发团队
sourceUrl: https://ethereumdev.io/logging-data-with-events/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

在 solidity 中，[事件](/developers/docs/smart-contracts/anatomy/#events-and-logs)是智能合约可触发的调度信号。 去中心化应用或其他任何连接到以太坊 JSON-PRC API 的程序，都可以监听这些事件，并执行相应操作。 可以建立事件的索引，以便稍后可以搜索到事件历史记录。

在撰写这篇文章之时，以太坊区块链上最常见的事件是由 ERC20 代币转账时触发的 Transfer 事件。

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

事件签名在合约代码内声明，并且可以使用 emit 关键字来触发。 例如，transfer 事件记录了谁发起了转账(_from_)，转账给谁(_to_)，以及转账的代币数转账(_value_)。

我们再次回到 Counter 智能合约，决定在每次值发生变化时进行记录。 由于这个合约不是为了部署，而是作为基础，通过扩展来构建另一个合约：因此它被称为抽象合约。 在我们 counter 示例中，它将类似于如下：

```solidity
pragma solidity 0.5.17;

contract Counter {

    event ValueChanged(uint oldValue, uint256 newValue);

    // Private variable of type unsigned int to keep the number of counts
    uint256 private count = 0;

    // Function that increments our counter
    function increment() public {
        count += 1;
        emit ValueChanged(count - 1, count);
    }

    // Getter to get the count value
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

注意：

- **第 5 行**：我们声明了事件及其包含的内容、旧值以及新值。

- **第 13 行**：当我们增加 count 变量的值时，我们会触发事件。

如果我们现在部署合约并调用 increment 函数，如果您在名为 logs 的数组内单击新交易，我们将看到 Remix 会自动显示它。

![Remix截屏](../../../../../developers/tutorials/logging-events-smart-contracts/remix-screenshot.png)

日志在调试智能合约时非常有用，另一方面，如果您构建一个不同人使用的应用，并且使分析更容易跟踪和了解您的智能合约的使用情况，那么日志也是非常重要的手段。 交易生成的日志会显示常见的区块浏览器中，并且，举例来说，您也可以使用它们来创建链外脚本，用于侦听特定的事件，并且这些事件发生时采取相应操作。
