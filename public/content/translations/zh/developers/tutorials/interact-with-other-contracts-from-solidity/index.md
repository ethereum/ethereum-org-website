---
title: 从 Solidity 与其他合约交互
description: 如何从现有合约部署智能合约并与之交互
author: "jdourlens"
tags: ["智能合约", "solidity", "remix", "部署", "可组合性"]
skill: advanced
breadcrumb: 合约交互
lang: zh
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/interact-with-other-contracts-from-solidity/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

在之前的教程中，我们学习了很多关于[如何部署你的第一个智能合约](/developers/tutorials/deploying-your-first-smart-contract/)的知识，并为其添加了一些功能，例如[使用修饰符控制访问](https://ethereumdev.io/organize-your-code-and-control-access-to-your-smart-contract-with-modifiers/)或[Solidity 中的错误处理](https://ethereumdev.io/handle-errors-in-solidity-with-require-and-revert/)。在本教程中，我们将学习如何从现有合约部署智能合约并与之交互。

我们将编写一个合约，通过为其创建一个工厂，使任何人都能拥有自己的 `Counter` 智能合约，其名称将是 `CounterFactory`。首先，这是我们最初的 `Counter` 智能合约的代码：

```solidity
pragma solidity 0.5.17;

contract Counter {

    uint256 private _count;
    address private _owner;
    address private _factory;


     modifier onlyOwner(address caller) {
        require(caller == _owner, "You're not the owner of the contract");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == _factory, "You need to use the factory");
        _;
    }

     constructor(address owner) public {
        _owner = owner;
        _factory = msg.sender;
    }

     function getCount() public view returns (uint256) {
        return _count;
    }

    function increment(address caller) public onlyFactory onlyOwner(caller) {
        _count++;
    }

}
```

请注意，我们稍微修改了合约代码，以跟踪工厂的地址和合约所有者的地址。当你从另一个合约调用合约代码时，msg.sender 将指向我们合约工厂的地址。这是**一个非常需要理解的重点**，因为使用一个合约与其他合约交互是一种常见做法。因此，在复杂情况下，你应该注意发送者是谁。

为此，我们还添加了一个 `onlyFactory` 修饰符，以确保改变状态的函数只能由工厂调用，工厂会将原始调用者作为参数传递。

在我们将用来管理所有其他 Counter 的新 `CounterFactory` 中，我们将添加一个映射，将所有者与其 counter 合约的地址关联起来：

```solidity
mapping(address => Counter) _counters;
```

在以太坊中，映射（mapping）相当于 JavaScript 中的对象，它们能够将类型 A 的密钥映射到类型 B 的值。在这种情况下，我们将所有者的地址与其 Counter 的实例映射起来。

为某人实例化一个新的 Counter 将如下所示：

```solidity
  function createCounter() public {
      require (_counters[msg.sender] == Counter(0));
      _counters[msg.sender] = new Counter(msg.sender);
  }
```

我们首先检查该人是否已经拥有一个 counter。如果他没有 counter，我们通过将他的地址传递给 `Counter` 构造函数来实例化一个新的 counter，并将新创建的实例分配给映射。

要获取特定 Counter 的计数，它将如下所示：

```solidity
function getCount(address account) public view returns (uint256) {
    require (_counters[account] != Counter(0));
    return (_counters[account].getCount());
}

function getMyCount() public view returns (uint256) {
    return (getCount(msg.sender));
}
```

第一个函数检查给定地址的 Counter 合约是否存在，然后从实例中调用 `getCount` 方法。第二个函数：`getMyCount` 只是一个简写，用于将 msg.sender 直接传递给 `getCount` 函数。

`increment` 函数非常相似，但将原始交易发送者传递给 `Counter` 合约：

```solidity
function increment() public {
      require (_counters[msg.sender] != Counter(0));
      Counter(_counters[msg.sender]).increment(msg.sender);
  }
```

请注意，如果调用次数过多，我们的 counter 可能会成为溢出的受害者。你应该尽可能多地使用 [SafeMath 库](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/) 来防止这种可能的情况。

要部署我们的合约，你需要同时提供 `CounterFactory` 和 `Counter` 的代码。例如，在 Remix 中部署时，你需要选择 CounterFactory。

这是完整代码：

```solidity
pragma solidity 0.5.17;

contract Counter {

    uint256 private _count;
    address private _owner;
    address private _factory;


     modifier onlyOwner(address caller) {
        require(caller == _owner, "You're not the owner of the contract");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == _factory, "You need to use the factory");
        _;
    }

     constructor(address owner) public {
        _owner = owner;
        _factory = msg.sender;
    }

     function getCount() public view returns (uint256) {
        return _count;
    }

    function increment(address caller) public onlyFactory onlyOwner(caller) {
        _count++;
    }

}

contract CounterFactory {

    mapping(address => Counter) _counters;

    function createCounter() public {
        require (_counters[msg.sender] == Counter(0));
        _counters[msg.sender] = new Counter(msg.sender);
    }

    function increment() public {
        require (_counters[msg.sender] != Counter(0));
        Counter(_counters[msg.sender]).increment(msg.sender);
    }

    function getCount(address account) public view returns (uint256) {
        require (_counters[account] != Counter(0));
        return (_counters[account].getCount());
    }

    function getMyCount() public view returns (uint256) {
        return (getCount(msg.sender));
    }

}
```

编译后，在 Remix 部署部分，你将选择要部署的工厂：

![Selecting the factory to be deployed in Remix](./counterfactory-deploy.png)

然后你可以试用你的合约工厂并检查值的变化。如果你想从不同的地址调用智能合约，你需要在 Remix 的账户（Account）选择中更改地址。