---
title: "從 Solidity 與其他合約互動"
description: "如何從現有合約部署智能合約並與之互動"
author: "jdourlens"
tags: ["智能合約", "Solidity", "Remix", "部署", "可組合性"]
skill: advanced
breadcrumb: "合約互動"
lang: zh-tw
published: 2020-04-05
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

在先前的教學中，我們學到了許多關於[如何部署你的第一個智能合約](/developers/tutorials/deploying-your-first-smart-contract/)的知識，並為其添加了一些功能，例如[使用修飾符控制存取權限](https://docs.soliditylang.org/en/latest/contracts.html#function-modifiers)或 [Solidity 中的錯誤處理](https://docs.soliditylang.org/en/latest/control-structures.html#error-handling-assert-require-revert-and-exceptions)。在本教學中，我們將學習如何從現有合約部署智能合約並與之互動。

我們將建立一個合約，透過為其建立一個工廠，讓任何人都能擁有自己的 `Counter` 智能合約，其名稱將為 `CounterFactory`。首先，這是我們最初的 `Counter` 智能合約程式碼：

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

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

     constructor(address owner) {
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

請注意，我們稍微修改了合約程式碼，以追蹤工廠的地址和合約擁有者的地址。當你從另一個合約呼叫合約程式碼時，msg.sender 將指向我們合約工廠的地址。這是**一個非常需要理解的重點**，因為使用合約與其他合約互動是一種常見的做法。因此，在複雜的情況下，你應該注意發送者是誰。

為此，我們還添加了一個 `onlyFactory` 修飾符，以確保改變狀態的函式只能由工廠呼叫，而工廠會將原始呼叫者作為參數傳遞。

在我們將管理所有其他 Counter 的新 `CounterFactory` 中，我們將添加一個映射 (mapping)，將擁有者與其計數器合約的地址關聯起來：

```solidity
mapping(address => Counter) _counters;
```

在 Solidity 中，[映射](https://docs.soliditylang.org/en/latest/types.html#mapping-types)類似於 JavaScript 中的物件：它們將類型 A 的金鑰映射到類型 B 的值。在這種情況下，我們將擁有者的地址與其 Counter 的實例進行映射。

為某人實例化一個新的 Counter 將如下所示：

```solidity
  function createCounter() public {
      require(address(_counters[msg.sender]) == address(0), "You already have a counter");
      _counters[msg.sender] = new Counter(msg.sender);
  }
```

我們首先檢查該人是否已經擁有一個計數器。映射會為從未設定過的金鑰回傳預設值，對於合約類型來說，預設值是零地址，因此我們將儲存的合約地址與 `address(0)` 進行比較。如果他不擁有計數器，我們將透過將他的地址傳遞給 `Counter` 建構函式來實例化一個新的計數器，並將新建立的實例指派給映射。

要取得特定 Counter 的計數，將如下所示：

```solidity
function getCount(address account) public view returns (uint256) {
    require(address(_counters[account]) != address(0), "This account has no counter");
    return (_counters[account].getCount());
}

function getMyCount() public view returns (uint256) {
    return (getCount(msg.sender));
}
```

第一個函式檢查給定地址的 Counter 合約是否存在，然後從實例中呼叫 `getCount` 方法。第二個函式：`getMyCount` 只是將 msg.sender 直接傳遞給 `getCount` 函式的簡寫。

`increment` 函式非常相似，但會將原始交易發送者傳遞給 `Counter` 合約：

```solidity
function increment() public {
      require(address(_counters[msg.sender]) != address(0), "You need to create a counter first");
      _counters[msg.sender].increment(msg.sender);
  }
```

自 Solidity 0.8 起，算術運算[預設會進行檢查](https://docs.soliditylang.org/en/latest/control-structures.html#checked-or-unchecked-arithmetic)：如果 `_count` 發生溢位，`_count++` 將回滾交易，而不是默默地環繞 (wrapping around)，因此不需要像 SafeMath 這樣的額外函式庫。

要部署我們的合約，你需要同時提供 `CounterFactory` 和 `Counter` 的程式碼。例如在 Remix 中部署時，你需要選擇 CounterFactory。

以下是完整程式碼：

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

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

     constructor(address owner) {
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
        require(address(_counters[msg.sender]) == address(0), "You already have a counter");
        _counters[msg.sender] = new Counter(msg.sender);
    }

    function increment() public {
        require(address(_counters[msg.sender]) != address(0), "You need to create a counter first");
        _counters[msg.sender].increment(msg.sender);
    }

    function getCount(address account) public view returns (uint256) {
        require(address(_counters[account]) != address(0), "This account has no counter");
        return (_counters[account].getCount());
    }

    function getMyCount() public view returns (uint256) {
        return (getCount(msg.sender));
    }

}
```

編譯後，在 Remix 的部署區塊中，你將選擇要部署的工廠：

![在 Remix 中選擇要部署的工廠](./counterfactory-deploy.png)

然後你可以試用你的合約工廠並檢查數值的變化。如果你想從不同的地址呼叫智能合約，你需要在 Remix 的帳戶選單中更改地址。
