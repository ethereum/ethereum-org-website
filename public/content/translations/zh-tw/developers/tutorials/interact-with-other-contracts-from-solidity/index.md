---
title: "從 Solidity 與其他合約互動"
description: "如何從現有合約部署智能合約並與之互動"
author: "jdourlens"
tags: ["智能合約", "Solidity", "Remix", "部署", "可組合性"]
skill: advanced
breadcrumb: "合約互動"
lang: zh-tw
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/interact-with-other-contracts-from-solidity/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

在之前的教學中，我們學到了許多關於[如何部署你的第一個智能合約](/developers/tutorials/deploying-your-first-smart-contract/)，並為其加入一些功能，例如[使用修飾子控制存取權限](https://ethereumdev.io/organize-your-code-and-control-access-to-your-smart-contract-with-modifiers/)或[在 Solidity 中處理錯誤](https://ethereumdev.io/handle-errors-in-solidity-with-require-and-revert/)。在本教學中，我們將學習如何從現有合約部署智能合約並與之互動。

我們將建立一個合約，透過為其建立一個工廠，讓任何人都能擁有自己的 `Counter` 智能合約，其名稱將為 `CounterFactory`。首先，這是我們初始 `Counter` 智能合約的程式碼：

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

請注意，我們稍微修改了合約程式碼，以追蹤工廠的地址和合約擁有者的地址。當你從另一個合約呼叫合約程式碼時，msg.sender 將指向我們合約工廠的地址。這是**一個非常需要理解的重點**，因為使用一個合約與其他合約互動是常見的做法。因此，在複雜的情況下，你應該注意發送者是誰。

為此，我們還加入了一個 `onlyFactory` 修飾子，確保改變狀態的函式只能由工廠呼叫，而工廠會將原始呼叫者作為參數傳遞。

在我們將管理所有其他 Counters 的新 `CounterFactory` 中，我們將加入一個對映 (mapping)，將擁有者與其計數器合約的地址關聯起來：

```solidity
mapping(address => Counter) _counters;
```

在以太坊中，對映 (mapping) 相當於 JavaScript 中的物件，它們能夠將類型 A 的金鑰對映到類型 B 的值。在這個例子中，我們將擁有者的地址與其 Counter 的實例對映起來。

為某人實例化一個新的 Counter 會像這樣：

```solidity
  function createCounter() public {
      require (_counters[msg.sender] == Counter(0));
      _counters[msg.sender] = new Counter(msg.sender);
  }
```

我們首先檢查該人是否已經擁有一個計數器。如果他沒有計數器，我們透過將他的地址傳遞給 `Counter` 建構函式來實例化一個新的計數器，並將新建立的實例指派給對映。

要取得特定 Counter 的計數，會像這樣：

```solidity
function getCount(address account) public view returns (uint256) {
    require (_counters[account] != Counter(0));
    return (_counters[account].getCount());
}

function getMyCount() public view returns (uint256) {
    return (getCount(msg.sender));
}
```

第一個函式檢查給定地址的 Counter 合約是否存在，然後從實例中呼叫 `getCount` 方法。第二個函式：`getMyCount` 只是一個捷徑，將 msg.sender 直接傳遞給 `getCount` 函式。

`increment` 函式非常相似，但會將原始交易發送者傳遞給 `Counter` 合約：

```solidity
function increment() public {
      require (_counters[msg.sender] != Counter(0));
      Counter(_counters[msg.sender]).increment(msg.sender);
  }
```

請注意，如果呼叫太多次，我們的計數器可能會發生溢位。你應該盡可能使用 [SafeMath 函式庫](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/) 來防止這種可能的情況。

要部署我們的合約，你需要同時提供 `CounterFactory` 和 `Counter` 的程式碼。例如在 Remix 中部署時，你需要選擇 CounterFactory。

這是完整的程式碼：

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

編譯後，在 Remix 的部署區塊中，你將選擇要部署的工廠：

![Selecting the factory to be deployed in Remix](./counterfactory-deploy.png)

然後你可以試用你的合約工廠並檢查值的變化。如果你想從不同的地址呼叫智能合約，你需要更改 Remix 的帳戶 (Account) 選單中的地址。