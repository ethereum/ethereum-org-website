---
title: "從 Solidity 與其他合約互動"
description: "如何從現有合約部署智能合約並與其互動"
author: "jdourlens"
tags: [ "智能合約", "穩固", "remix", "部署", "可組合性" ]
skill: advanced
lang: zh-tw
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/interact-with-other-contracts-from-solidity/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

在先前的教學中，我們學習了許多知識，像是[如何部署您的第一個智能合約](/developers/tutorials/deploying-your-first-smart-contract/)，以及為它新增一些功能，例如[使用修飾詞控制存取](https://ethereumdev.io/organize-your-code-and-control-access-to-your-smart-contract-with-modifiers/)或[在 Solidity 中處理錯誤](https://ethereumdev.io/handle-errors-in-solidity-with-require-and-revert/)。 在本教學中，我們將學習如何從現有合約部署智能合約並與其互動。

我們將建立一個名為 `CounterFactory` 的合約工廠，讓任何人都能夠透過它來建立自己的 `Counter` 智能合約。 首先，這是我們初始 `Counter` 智能合約的程式碼：

```solidity
pragma solidity 0.5.17;

contract Counter {

    uint256 private _count;
    address private _owner;
    address private _factory;


     modifier onlyOwner(address caller) {
        require(caller == _owner, "您不是此合約的擁有者");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == _factory, "您需要使用工廠");
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

請注意，我們稍微修改了合約程式碼，以便追蹤工廠的地址和合約擁有者的地址。 當您從另一個合約呼叫某合約的程式碼時，`msg.sender` 將會是我們合約工廠的地址。 這是**一個非常重要的理解要點**，因為使用合約與其他合約互動是常見的做法。 因此，在複雜情況下，您應該要留意誰是發送者。

為此，我們也新增了 `onlyFactory` 修飾詞，它能確保改變狀態的函式只能由工廠呼叫，工廠會將原始呼叫者當作參數傳遞。

在我們新的 `CounterFactory`（它會管理所有其他的 Counter）內部，我們會新增一個 mapping，將擁有者與其計數器合約的地址關聯起來：

```solidity
mapping(address => Counter) _counters;
```

在以太坊中，映射 (mapping) 相當於 javascript 中的物件，可以將 A 型別的鍵對應到 B 型別的值。在此案例中，我們將擁有者的地址與其 Counter 的實例對應起來。

為某人實例化一個新的 Counter，看起來會像這樣：

```solidity
  function createCounter() public {
      require (_counters[msg.sender] == Counter(0));
      _counters[msg.sender] = new Counter(msg.sender);
  }
```

我們首先檢查該使用者是否已擁有一個計數器。 如果該使用者沒有計數器，我們會將其地址傳遞給 `Counter` 建構函式以實例化一個新的計數器，並將新建立的實例指派給 mapping。

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

第一個函式會檢查指定地址是否存在 Counter 合約，然後從實例中呼叫 `getCount` 方法。 第二個函式 `getMyCount` 只是個簡潔的作法，直接將 `msg.sender` 傳遞給 `getCount` 函式。

`increment` 函式非常相似，但是它將原始交易的發送者傳遞給 `Counter` 合約：

```solidity
function increment() public {
      require (_counters[msg.sender] != Counter(0));
      Counter(_counters[msg.sender]).increment(msg.sender);
  }
```

請注意，如果呼叫太多次，我們的計數器可能會發生溢出。 您應該盡可能使用 [SafeMath 函式庫](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/)，以防止這種可能的情況發生。

要部署我們的合約，您將需要提供 `CounterFactory` 和 `Counter` 兩者的程式碼。 例如在 Remix 中部署時，您需要選擇 CounterFactory。

這是完整的程式碼：

```solidity
pragma solidity 0.5.17;

contract Counter {

    uint256 private _count;
    address private _owner;
    address private _factory;


     modifier onlyOwner(address caller) {
        require(caller == _owner, "您不是此合約的擁有者");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == _factory, "您需要使用工廠");
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

編譯後，在 Remix 的部署區塊中，您將會選擇要部署的工廠：

![在 Remix 中選擇要部署的工廠](./counterfactory-deploy.png)

然後您可以操作您的合約工廠，並檢查值的變化。 如果您想從不同的地址呼叫智能合約，您需要在 Remix 的帳戶 (Account) 選項中變更地址。
