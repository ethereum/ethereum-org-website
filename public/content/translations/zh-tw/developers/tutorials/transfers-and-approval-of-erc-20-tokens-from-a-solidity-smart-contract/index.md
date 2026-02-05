---
title: 透過 Solidity 智能合約轉帳和核准 ERC-20 代幣
description: 使用 Solidity 建立一個 DEX 智能合約，用於處理 ERC-20 代幣轉帳和核准。
author: "jdourlens"
tags: [ "智能合約", "代幣", "穩固", "erc-20" ]
skill: intermediate
lang: zh-tw
published: 2020-04-07
source: EthereumDev
sourceUrl: https://ethereumdev.io/transfers-and-approval-or-erc20-tokens-from-a-solidity-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

在先前的教學中，我們研究了以太坊區塊鏈上[以 Solidity 撰寫的 ERC-20 代幣架構](/developers/tutorials/understand-the-erc-20-token-smart-contract/)。 在本文中，我們將探討如何使用智能合約，透過 Solidity 語言與代幣互動。

針對此智能合約，我們將建立一個實際的範例去中心化交易所，使用者可用以太幣兌換我們新部署的 [ERC-20 代幣](/developers/docs/standards/tokens/erc-20/)。

在本教學中，我們將使用先前教學中撰寫的程式碼作為基礎。 我們的 DEX 會在其建構函式中實例化合約，並執行以下操作：

- 將代幣兌換為以太幣
- 將以太幣兌換為代幣

我們會先加入簡易的 ERC20 程式碼庫，以開始撰寫我們的去中心化交易所程式碼：

```solidity
pragma solidity ^0.8.0;

interface IERC20 {

    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);

    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);


    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}


contract ERC20Basic is IERC20 {

    string public constant name = "ERC20Basic";
    string public constant symbol = "ERC";
    uint8 public constant decimals = 18;


    mapping(address => uint256) balances;

    mapping(address => mapping (address => uint256)) allowed;

    uint256 totalSupply_ = 10 ether;


   constructor() {
	balances[msg.sender] = totalSupply_;
    }

    function totalSupply() public override view returns (uint256) {
	return totalSupply_;
    }

    function balanceOf(address tokenOwner) public override view returns (uint256) {
        return balances[tokenOwner];
    }

    function transfer(address receiver, uint256 numTokens) public override returns (bool) {
        require(numTokens <= balances[msg.sender]);
        balances[msg.sender] = balances[msg.sender]-numTokens;
        balances[receiver] = balances[receiver]+numTokens;
        emit Transfer(msg.sender, receiver, numTokens);
        return true;
    }

    function approve(address delegate, uint256 numTokens) public override returns (bool) {
        allowed[msg.sender][delegate] = numTokens;
        emit Approval(msg.sender, delegate, numTokens);
        return true;
    }

    function allowance(address owner, address delegate) public override view returns (uint) {
        return allowed[owner][delegate];
    }

    function transferFrom(address owner, address buyer, uint256 numTokens) public override returns (bool) {
        require(numTokens <= balances[owner]);
        require(numTokens <= allowed[owner][msg.sender]);

        balances[owner] = balances[owner]-numTokens;
        allowed[owner][msg.sender] = allowed[owner][msg.sender]-numTokens;
        balances[buyer] = balances[buyer]+numTokens;
        emit Transfer(owner, buyer, numTokens);
        return true;
    }
}


```

我們新的 DEX 智能合約會部署 ERC-20 並取得所有供應的代幣：

```solidity
contract DEX {

    IERC20 public token;

    event Bought(uint256 amount);
    event Sold(uint256 amount);

    constructor() {
        token = new ERC20Basic();
    }

    function buy() payable public {
        // TODO
    }

    function sell(uint256 amount) public {
        // TODO
    }

}
```

如此一來，我們就有了自己的 DEX，而且裡面有所有可用的代幣儲備。 此合約有兩個函式：

- `buy`：使用者可傳送以太幣以換取等值代幣
- `sell`：使用者可傳送代幣以換回以太幣

## buy 函式 {#the-buy-function}

我們來撰寫 buy 函式。 我們首先需要檢查訊息中包含的以太幣數量，並驗證合約擁有足夠的代幣，以及訊息中確實帶有以太幣。 如果合約擁有足夠的代幣，它會將相應數量的代幣傳送給使用者，並觸發 `Bought` 事件。

請注意，如果在發生錯誤時呼叫 require 函式，傳送的以太幣將被直接還原並退還給使用者。

為求簡單，我們直接以 1 個代幣兌換 1 Wei。

```solidity
function buy() payable public {
    uint256 amountTobuy = msg.value;
    uint256 dexBalance = token.balanceOf(address(this));
    require(amountTobuy > 0, "您需要傳送一些以太幣");
    require(amountTobuy <= dexBalance, "儲備的代幣不足");
    token.transfer(msg.sender, amountTobuy);
    emit Bought(amountTobuy);
}
```

如果購買成功，我們應該會在交易中看到兩個事件：代幣 `Transfer` 和 `Bought` 事件。

![交易中的兩個事件：轉帳和購買](./transfer-and-bought-events.png)

## sell 函式 {#the-sell-function}

負責出售的函式會先要求使用者預先呼叫 approve 函式來核准數量。 核准轉帳需要使用者呼叫由 DEX 實例化的 ERC20Basic 代幣。 要做到這一點，可以先呼叫 DEX 合約的 `token()` 函式，以擷取 DEX 部署名為 `token` 的 ERC20Basic 合約的位址。 然後，我們在工作階段中建立該合約的實例，並呼叫其 `approve` 函式。 接著我們就可以呼叫 DEX 的 `sell` 函式，將我們的代幣換回以太幣。 例如，在互動式 brownie 工作階段中，它會是這個樣子：

```python
#### 在互動式 brownie 主控台中的 Python...

# 部署 DEX
dex = DEX.deploy({'from':account1})

# 呼叫 buy 函式，用以太幣兌換代幣
# 1e18 是 1 以太幣，以 wei 為單位
dex.buy({'from': account2, 1e18})

# 取得 ERC20 代幣的部署位址
# 該代幣在 DEX 合約創建期間部署
# dex.token() 會傳回代幣的部署位址
token = ERC20Basic.at(dex.token())

# 呼叫代幣的 approve 函式
# 核准 dex 位址作為 spender
# 以及它被允許花費多少您的代幣
token.approve(dex.address, 3e18, {'from':account2})

```

然後當 sell 函式被呼叫時，我們會檢查從呼叫者位址到合約位址的轉帳是否成功，然後將以太幣傳回給呼叫者位址。

```solidity
function sell(uint256 amount) public {
    require(amount > 0, "您至少需要出售一些代幣");
    uint256 allowance = token.allowance(msg.sender, address(this));
    require(allowance >= amount, "請檢查代幣授權額度");
    token.transferFrom(msg.sender, address(this), amount);
    payable(msg.sender).transfer(amount);
    emit Sold(amount);
}
```

如果一切運作正常，您應該會在交易中看到 2 個事件 (一個 `Transfer` 和一個 `Sold`)，且您的代幣餘額和以太幣餘額皆會更新。

![交易中的兩個事件：轉帳和售出](./transfer-and-sold-events.png)

<Divider />

在本教學中，我們了解了如何檢查 ERC-20 代幣的餘額和授權額度，以及如何透過介面呼叫 ERC20 智能合約的 `Transfer` 和 `TransferFrom`。

一旦您進行交易，我們有一個 JavaScript 教學，可 [等待並取得與您的合約相關的交易詳細資訊](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/)，還有另一個 [教學說明如何解碼代幣轉帳或任何其他事件所產生的事件](https://ethereumdev.io/how-to-decode-event-logs-in-javascript-using-abi-decoder/)，只要您有 ABI 即可。

以下為本教學的完整程式碼：

```solidity
pragma solidity ^0.8.0;

interface IERC20 {

    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);

    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);


    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}


contract ERC20Basic is IERC20 {

    string public constant name = "ERC20Basic";
    string public constant symbol = "ERC";
    uint8 public constant decimals = 18;


    mapping(address => uint256) balances;

    mapping(address => mapping (address => uint256)) allowed;

    uint256 totalSupply_ = 10 ether;


   constructor() {
	balances[msg.sender] = totalSupply_;
    }

    function totalSupply() public override view returns (uint256) {
	return totalSupply_;
    }

    function balanceOf(address tokenOwner) public override view returns (uint256) {
        return balances[tokenOwner];
    }

    function transfer(address receiver, uint256 numTokens) public override returns (bool) {
        require(numTokens <= balances[msg.sender]);
        balances[msg.sender] = balances[msg.sender]-numTokens;
        balances[receiver] = balances[receiver]+numTokens;
        emit Transfer(msg.sender, receiver, numTokens);
        return true;
    }

    function approve(address delegate, uint256 numTokens) public override returns (bool) {
        allowed[msg.sender][delegate] = numTokens;
        emit Approval(msg.sender, delegate, numTokens);
        return true;
    }

    function allowance(address owner, address delegate) public override view returns (uint) {
        return allowed[owner][delegate];
    }

    function transferFrom(address owner, address buyer, uint256 numTokens) public override returns (bool) {
        require(numTokens <= balances[owner]);
        require(numTokens <= allowed[owner][msg.sender]);

        balances[owner] = balances[owner]-numTokens;
        allowed[owner][msg.sender] = allowed[owner][msg.sender]-numTokens;
        balances[buyer] = balances[buyer]+numTokens;
        emit Transfer(owner, buyer, numTokens);
        return true;
    }
}


contract DEX {

    event Bought(uint256 amount);
    event Sold(uint256 amount);


    IERC20 public token;

    constructor() {
        token = new ERC20Basic();
    }

    function buy() payable public {
        uint256 amountTobuy = msg.value;
        uint256 dexBalance = token.balanceOf(address(this));
        require(amountTobuy > 0, "您需要傳送一些以太幣");
        require(amountTobuy <= dexBalance, "儲備的代幣不足");
        token.transfer(msg.sender, amountTobuy);
        emit Bought(amountTobuy);
    }

    function sell(uint256 amount) public {
        require(amount > 0, "您至少需要出售一些代幣");
        uint256 allowance = token.allowance(msg.sender, address(this));
        require(allowance >= amount, "請檢查代幣授權額度");
        token.transferFrom(msg.sender, address(this), amount);
        payable(msg.sender).transfer(amount);
        emit Sold(amount);
    }

}
```
