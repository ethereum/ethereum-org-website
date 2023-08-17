---
title: 如何在测试中模拟 Solidity 智能合约
description: 为什么应该在测试时模拟合约
author: Markus Waas
lang: zh
tags:
  - "solidity"
  - "智能合同"
  - "测试"
  - "模拟"
skill: intermediate
published: 2020-05-02
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/mocking-contracts
---

[模拟对象](https://wikipedia.org/wiki/Mock_object)是面向对象编程中的一种常见设计模式。 Mock 一词来源于古法语词“mocquer”，意为“嘲笑，取笑”，但它渐渐拥有了“模拟真实事物”的含义，这实际上也是我们在编程时所做的事情。 不要随意拿你的智能合约开玩笑，但一定要尽可能多地模拟它们。 这将使你的工作更轻松。

## 使用模拟合约对合约进行单元测试 {#unit-testing-contracts-with-mocks}

对合约进行模拟，本质上是创建一个与该合约行为类似的副本，但开发者可以轻易控制这个副本。 通常你会拥有复杂的合约，而[你只想对合约其中一小部分进行单元测试](/developers/docs/smart-contracts/testing/)。 问题在于，如果测试这一小部分需要合约进入一个非常特别但又难以进入的状态，会怎样？

可以每次都编写将合约带入所需状态的复杂测试设置逻辑，也可以写一个模拟合约。 利用继承，对合约进行模拟比较容易。 只需创建继承原始合约的另一个模拟合约即可。 这时，你就可以重写模拟合约中的函数。 让我们通过一个例子来理解它。

## 示例：私密 ERC20 合约 {#example-private-erc20}

本文使用一个在开始时提供私密时间的示例 ERC-20 合约。 合约所有者可以管理私密用户，而且只有这些用户才能在开始时接收代币。 经过特定一段时间后，所有人就都可以使用代币了。 如果你感到好奇，我们使用新 OpenZeppelin 合约（第三版）中的 [`_beforeTokenTransfer`](https://docs.openzeppelin.com/contracts/3.x/extending-contracts#using-hooks) 钩子进一步阐释。

```solidity
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PrivateERC20 is ERC20, Ownable {
    mapping (address => bool) public isPrivateUser;
    uint256 private publicAfterTime;

    constructor(uint256 privateERC20timeInSec) ERC20("PrivateERC20", "PRIV") public {
        publicAfterTime = now + privateERC20timeInSec;
    }

    function addUser(address user) external onlyOwner {
        isPrivateUser[user] = true;
    }

    function isPublic() public view returns (bool) {
        return now >= publicAfterTime;
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual override {
        super._beforeTokenTransfer(from, to, amount);

        require(_validRecipient(to), "PrivateERC20: invalid recipient");
    }

    function _validRecipient(address to) private view returns (bool) {
        if (isPublic()) {
            return true;
        }

        return isPrivateUser[to];
    }
}
```

现在我们对此合约进行模拟。

```solidity
pragma solidity ^0.6.0;
import "../PrivateERC20.sol";

contract PrivateERC20Mock is PrivateERC20 {
    bool isPublicConfig;

    constructor() public PrivateERC20(0) {}

    function setIsPublic(bool isPublic) external {
        isPublicConfig = isPublic;
    }

    function isPublic() public view returns (bool) {
        return isPublicConfig;
    }
}
```

你将得到以下错误消息之一：

- `PrivateERC20Mock.sol: 类型错误：重写函数缺少"override"修饰符。(TypeError: Overriding function is missing "override" specifier.)`
- `PrivateERC20.sol：类型错误：尝试重写非virtual函数。 您是否忘记了添加“virtual”关键字？(TypeError: Trying to override non-virtual function. Did you forget to add "virtual"?.)`

由于使用的是新的 Solidity 0.6 版本，所以必须为可被重写的函数添加 `virtual` 关键字，为执行重写的函数添加 override。 因此，我们为两个 `isPublic` 函数添加这些关键字。

现在，在单元测试中，你就可以使用 `PrivateERC20Mock` 了。 想要在私密使用期间测试合约的行为时，请使用 `setIsPublic(false)`；同样，可以使用 `setIsPublic(true)` 在公共使用期间测试。 当然，在本例中，我们也可以只使用[时间帮助器](https://docs.openzeppelin.com/test-helpers/0.5/api#increase)相应地修改时间。 但至此，模拟合约的概念应该已经清楚了，并且你也可以想象一下不仅仅需要修改时间的复杂场景。

## 对多个合约进行模拟 {#mocking-many-contracts}

如果每进行一次模拟都要创建另一个合约，那将是一件很麻烦的事。 如果你被这种情况困扰，可以考虑 [MockContract](https://github.com/gnosis/mock-contract) 库。 它允许用户实时重写和更改合约的行为。 但是，该库只能用来模拟对另一个合约的调用，因此对于上面的示例并不适用。

## 模拟技术还可以更强大 {#mocking-can-be-even-more-powerful}

模拟技术的强大之处远不仅于此。

- 增加函数：不只是重写某个特定函数的功能很有用，额外增加函数的功能也有其用武之地。 对于代币来说，一个很好的示例是增加 `mint` 函数，让任何用户都可以免费获得新代币。
- 在测试网上使用：当你在测试网上部署和测试你的合约以及去中心化应用程序时，请考虑使用模拟合约。 如非必须，请尽量避免重写函数。 毕竟你想要测试真实的逻辑。 然而，举例来说，添加重置函数是有用的，它只是将合约状态重置为初始状态，而无需再部署一个新合约。 显然，你不想在主网合约中添加这样的函数。
