---
title: 通过solidity与其他合约进行交互
description: 如何对已经存在的合约进行智能合约的部署，并与其进行交互
author: "jdourlens"
tags:
  - "智能合约"
  - "solidity"
  - "remix"
  - "工厂"
  - "部署"
  - "可组合性"
skill: advanced
lang: zh
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/interact-with-other-contracts-from-solidity/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

在之前的教程中，我们学习到了关于 [如何部署您的第一个智能合约](/developers/tutorials/deploying-your-first-smart-contract/)的内容。在此基础上，还进一步学习了一些特性，比如[使用修饰符控制访问权限](https://ethereumdev.io/organize-your-code-and-control-access-to-your-smart-contract-with-modifiers/)、[Solidity 中的错误处理等](https://ethereumdev.io/handle-errors-in-solidity-with-require-and-revert/)。 在本教程中，我们将学习如何基于一个已有的合约进行智能合约的部署，并与其交互。

我们将会通过创建工厂的方式编写一个允许任何人拥有自己的`Counter`智能合约的合约，这个合约的名称将为`CounterFactory`。 首先，我们给大家展示一下初始`Counter`智能合约的代码。

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

注意，我们稍微修改了合约代码，来记录工厂的地址和合约所有者的地址。 当您从另一个合约来调用这个合约的代码的时，msg.sender 将引用合约工厂的地址。 这是**要理解的一个要点**，因为使用合约来与其他合约进行交互是一种常见做法。 因此，在复杂的情况下，您需要特别注意谁是发送者。

为此，我们也添加了修饰符`onlyFactory`，以确保改变状态的函数只能由将传递原始调用者作为参数的工厂调用。

在我们将管理所有其他 Counters 的新`CounterFactory`中，我们会添加一个映射，该映射会将所有者关联到其 counter 合约地址：

```solidity
mapping(address => Counter) _counters;
```

在以太坊中，映射等同于 javascript 中的对象，它们允许将类型 A 的值映射到类型 B 的值。在本例中，我们将所有者的地址与 Counter 的实例进行映射。

为某人实例化一个新的 Counter 的代码将类似于如下：

```solidity
  function createCounter() public {
      require (_counters[msg.sender] == Counter(0));
      _counters[msg.sender] = new Counter(msg.sender);
  }
```

首先，我们会检查一下此人是否已经拥有了一个 counter。 如果他未拥有 counter，我们会将他的地址传给`Counter`构造函数来实例化一个新的 counter，并将新创建的实例分配至映射。

获取一个特定 Counter 的计数的代码将类似于如下：

```solidity
function getCount(address account) public view returns (uint256) {
    require (_counters[account] != Counter(0));
    return (_counters[account].getCount());
}

function getMyCount() public view returns (uint256) {
    return (getCount(msg.sender));
}
```

第一个函数会检查对于某个给定的地址 Counter 合约是否存在，然后从实例中调用`getCount`方法。 第二个函数`getMyCount`只是将 msg.sender 直接传递到`getCount`函数的方法。

`increment`函数非常相似，但是会将原始交易发送者传递到`Counter`合约。

```solidity
function increment() public {
      require (_counters[msg.sender] != Counter(0));
      Counter(_counters[msg.sender]).increment(msg.sender);
  }
```

注意，如果被调用次数过多，counter 可能会遇到溢出的问题。 您应尽可能多地使用[SafeMath 库](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/)来防止出现这种可能的情况。

要部署合约，您需要同时提供`CounterFactory`和`Counter`的代码。 针对 Remix 中的示例进行部署时，您需要选择 CounterFactory。

下面是完整的代码：

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

编译完成后，您将在 Remix 的部署部分选择要部署的工厂。

![选择要在Remix中部署的工厂。](./counterfactory-deploy.png)

然后，您可以运行工厂合约并且观察值的变化情况。 如果希望通过其他地址来调用智能合约，您需要在 Remix 的帐户选择中更改地址。
