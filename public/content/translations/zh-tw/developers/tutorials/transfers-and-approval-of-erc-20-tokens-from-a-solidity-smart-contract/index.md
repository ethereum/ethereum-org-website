---
title: 從 Solidity 智能合約轉帳與授權 ERC-20 代幣
description: 使用 Solidity 構建一個處理 ERC-20 代幣轉帳與授權的去中心化交易所 (DEX) 智能合約。
author: "jdourlens"
tags: ["智能合約", "代幣", "solidity", "erc-20"]
skill: intermediate
breadcrumb: ERC-20 轉帳
lang: zh-tw
published: 2020-04-07
source: EthereumDev
sourceUrl: https://ethereumdev.io/transfers-and-approval-or-erc20-tokens-from-a-solidity-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

在上一篇教學中，我們學習了以太坊區塊鏈上 [Solidity 中 ERC-20 代幣的剖析](/developers/tutorials/understand-the-erc-20-token-smart-contract/)。在本文中，我們將了解如何使用 Solidity 語言透過智能合約與代幣進行互動。

針對這個智能合約，我們將建立一個真正的模擬去中心化交易所 (DEX)，使用者可以在其中用以太幣兌換我們新部署的 [ERC-20 代幣](/developers/docs/standards/tokens/erc-20/)。

在本教學中，我們將以在上一篇教學中編寫的程式碼為基礎。我們的 DEX 將在其建構函式中實例化該合約的實例，並執行以下操作：

- 將代幣兌換為以太幣
- 將以太幣兌換為代幣

我們將透過加入簡單的 ERC20 程式碼庫來開始編寫去中心化交易所程式碼：

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

我們新的 DEX 智能合約將部署 ERC-20 並取得所有供應量：

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

現在我們有了 DEX，並且它擁有所有可用的代幣儲備。該合約有兩個函式：

- `buy`：使用者可以發送以太幣並換取等值的代幣
- `sell`：使用者可以決定發送代幣以換回以太幣

## 購買函式 {#the-buy-function}

讓我們來編寫購買函式。我們首先需要檢查訊息中包含的以太幣數量，並驗證合約擁有足夠的代幣，且訊息中確實包含一些以太幣。如果合約擁有足夠的代幣，它會將相應數量的代幣發送給使用者，並觸發 `Bought` 事件。

請注意，如果在發生錯誤的情況下呼叫 `require` 函式，發送的以太幣將直接被還原並退還給使用者。

為了保持簡單，我們只以 1 個代幣兌換 1 Wei。

```solidity
function buy() payable public {
    uint256 amountTobuy = msg.value;
    uint256 dexBalance = token.balanceOf(address(this));
    require(amountTobuy > 0, "You need to send some ether");
    require(amountTobuy <= dexBalance, "Not enough tokens in the reserve");
    token.transfer(msg.sender, amountTobuy);
    emit Bought(amountTobuy);
}
```

在購買成功的情況下，我們應該會在交易中看到兩個事件：代幣的 `Transfer` 事件和 `Bought` 事件。

![Two events in the transaction: Transfer and Bought](./transfer-and-bought-events.png)

## 出售函式 {#the-sell-function}

負責出售的函式首先會要求使用者事先呼叫 `approve` 函式來授權該數量。授權轉帳需要使用者呼叫由 DEX 實例化的 ERC20Basic 代幣。這可以透過首先呼叫 DEX 合約的 `token()` 函式來實現，以取得 DEX 部署名為 `token` 的 ERC20Basic 合約的地址。然後，我們在工作階段中建立該合約的實例並呼叫其 `approve` 函式。接著，我們就能夠呼叫 DEX 的 `sell` 函式，並將我們的代幣兌換回以太幣。例如，這在互動式 Brownie 工作階段中的樣子如下：

```python
#### 在互動式 Brownie 控制台中的 Python...

# 部署 DEX
dex = DEX.deploy({'from':account1})

# 呼叫 buy 函式以將以太幣兌換為代幣
# 1e18 是以 Wei 為單位的 1 以太幣
dex.buy({'from': account2, 1e18})

# 取得 ERC20 代幣的部署地址
# 這是在 DEX 合約建立期間部署的
# dex.token() 會回傳代幣的部署地址
token = ERC20Basic.at(dex.token())

# 呼叫代幣的授權函式
# 授權 dex 地址作為花費者
# 以及允許它花費多少你的代幣
token.approve(dex.address, 3e18, {'from':account2})

```

然後，當呼叫出售函式時，我們將檢查從呼叫者地址到合約地址的轉帳是否成功，然後將以太幣發送回呼叫者地址。

```solidity
function sell(uint256 amount) public {
    require(amount > 0, "You need to sell at least some tokens");
    uint256 allowance = token.allowance(msg.sender, address(this));
    require(allowance >= amount, "Check the token allowance");
    token.transferFrom(msg.sender, address(this), amount);
    payable(msg.sender).transfer(amount);
    emit Sold(amount);
}
```

如果一切正常，您應該會在交易中看到 2 個事件（一個 `Transfer` 和一個 `Sold`），並且您的代幣餘額和以太幣餘額已更新。

![Two events in the transaction: Transfer and Sold](./transfer-and-sold-events.png)

<Divider />

透過本教學，我們了解了如何檢查 ERC-20 代幣的餘額和授權額度，以及如何使用介面呼叫 ERC20 智能合約的 `Transfer` 和 `TransferFrom`。

一旦您進行了交易，我們有一個 JavaScript 教學可以[等待並取得對您合約進行的交易詳細資訊](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/)，以及一個[教學來解碼由代幣轉帳或任何其他事件產生的事件](https://ethereumdev.io/how-to-decode-event-logs-in-javascript-using-abi-decoder/)（只要您有 ABI）。

以下是本教學的完整程式碼：

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
        require(amountTobuy > 0, "You need to send some ether");
        require(amountTobuy <= dexBalance, "Not enough tokens in the reserve");
        token.transfer(msg.sender, amountTobuy);
        emit Bought(amountTobuy);
    }

    function sell(uint256 amount) public {
        require(amount > 0, "You need to sell at least some tokens");
        uint256 allowance = token.allowance(msg.sender, address(this));
        require(allowance >= amount, "Check the token allowance");
        token.transferFrom(msg.sender, address(this), amount);
        payable(msg.sender).transfer(amount);
        emit Sold(amount);
    }

}
```