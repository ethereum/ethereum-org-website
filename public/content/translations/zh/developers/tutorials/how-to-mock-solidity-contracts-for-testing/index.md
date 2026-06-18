---
title: 如何在测试中模拟 Solidity 智能合约
description: 为什么在测试时应该模拟（mock）你的合约
author: 马库斯·瓦斯
lang: zh
tags: ["solidity", "智能合约", "测试", "模拟"]
skill: intermediate
breadcrumb: 模拟合约
published: 2020-05-02
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/mocking-contracts
---

[模拟对象（Mock objects）](https://wikipedia.org/wiki/Mock_object)是面向对象编程中常见的设计模式。它源于古法语单词“mocquer”，意为“取笑”，后来演变为“模仿真实事物”，这实际上就是我们在编程中所做的事情。请只在你想取笑你的智能合约时才去取笑它们，但只要可能，就尽量模拟（mock）它们。这会让你的生活更轻松。

## 使用模拟进行合约单元测试 {#unit-testing-contracts-with-mocks}

模拟合约本质上意味着创建该合约的第二个版本，其行为与原始版本非常相似，但开发者可以轻松控制它。你经常会遇到复杂的合约，而你只想[对合约的一小部分进行单元测试](/developers/docs/smart-contracts/testing/)。问题是，如果测试这一小部分需要一个很难达到的特定合约状态，该怎么办？

你可以每次都编写复杂的测试设置逻辑，使合约进入所需的状态，或者你可以编写一个模拟（mock）。通过继承来模拟合约非常简单。只需创建一个继承自原始合约的第二个模拟合约即可。现在你可以在模拟合约中重写（override）函数。让我们通过一个例子来看看。

## 示例：私有 ERC-20 {#example-private-erc20}

我们使用一个带有初始私有时间的 ERC-20 合约示例。所有者可以管理私有用户，一开始只有这些用户才被允许接收代币。一旦经过特定时间，所有人都将被允许使用代币。如果你好奇的话，我们使用的是新版欧本齐柏林（OpenZeppelin）合约 v3 中的 [`_beforeTokenTransfer`](https://docs.openzeppelin.com/contracts/5.x/extending-contracts#using-hooks) 钩子。

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

现在让我们来模拟它。

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

你将收到以下错误消息之一：

- `PrivateERC20Mock.sol: TypeError: Overriding function is missing "override" specifier.`
- `PrivateERC20.sol: TypeError: Trying to override non-virtual function. Did you forget to add "virtual"?.`

由于我们使用的是新的 0.6 Solidity 版本，我们必须为可以被重写的函数添加 `virtual` 关键字，并为重写函数添加 override 关键字。因此，让我们将它们添加到这两个 `isPublic` 函数中。

现在在你的单元测试中，你可以改用 `PrivateERC20Mock`。当你想测试私有使用时间内的行为时，使用 `setIsPublic(false)`，同样地，使用 `setIsPublic(true)` 来测试公共使用时间。当然，在我们的示例中，我们也可以直接使用[时间辅助工具](https://docs.openzeppelin.com/test-helpers/0.5/api#increase)来相应地更改时间。但是现在模拟的概念应该很清楚了，你可以想象在某些场景下，事情并不像简单地推进时间那么容易。

## 模拟多个合约 {#mocking-many-contracts}

如果你必须为每一个模拟创建一个单独的合约，事情可能会变得一团糟。如果这让你感到困扰，你可以看看 [MockContract](https://github.com/gnosis/mock-contract) 库。它允许你动态地重写和更改合约的行为。然而，它仅适用于模拟对另一个合约的调用，因此它不适用于我们的示例。

## 模拟可以更加强大 {#mocking-can-be-even-more-powerful}

模拟的强大之处不止于此。

- 添加函数：不仅重写特定函数很有用，仅仅添加额外的函数也很有用。对于代币来说，一个很好的例子就是添加一个额外的 `mint` 函数，允许任何用户免费获取新代币。
- 在测试网中的使用：当你在测试网上将合约与你的去中心化应用 (dapp) 一起部署和测试时，考虑使用模拟版本。除非万不得已，否则避免重写函数。毕竟你想测试的是真实的逻辑。但是，例如添加一个重置函数可能会很有用，它只需将合约状态重置为初始状态，而无需重新部署。显然，你不会希望在主网（Mainnet）合约中包含该功能。