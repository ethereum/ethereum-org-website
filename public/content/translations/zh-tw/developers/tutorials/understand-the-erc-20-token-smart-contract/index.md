---
title: 了解 ERC-20 代幣智能合約
description: 透過完整的 Solidity 智能合約範例和說明，學習如何實作 ERC-20 代幣標準。
author: "jdourlens"
tags: [ "智能合約", "代幣", "穩固", "erc-20" ]
skill: beginner
lang: zh-tw
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/understand-the-erc20-token-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

以太坊上最重要的 [智能合約標準](/developers/docs/standards/) 之一是 [ERC-20](/developers/docs/standards/tokens/erc-20/)，它已成為以太坊區塊鏈上用於實作可替代代幣的所有智能合約的技術標準。

ERC-20 為所有可替代的以太坊代幣定義了一份應共同遵守的規則清單。 因此，此代幣標準讓所有類型的開發者都能準確預測新代幣在更龐大的以太坊系統中將如何運作。 這簡化並減輕了開發者的工作，因為只要代幣遵循規則，他們就可以繼續工作，知道每個新專案都不必在每次發行新代幣時重做。

以下以介面的形式呈現 ERC-20 必須實作的函式。 如果您不確定什麼是介面，請查看我們關於[在 Solidity 中進行物件導向程式設計](https://ethereumdev.io/inheritance-in-solidity-contracts-are-classes/)的文章。

```solidity
pragma solidity ^0.6.0;

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
```

以下是每個函式用途的逐行說明。 在此之後，我們將展示 ERC-20 代幣的簡單實作。

## 取值器 {#getters}

```solidity
function totalSupply() external view returns (uint256);
```

傳回現有的代幣數量。 此函式是取值器，不會修改合約的狀態。 請記住，Solidity 中沒有浮點數。 因此，大多數代幣採用 18 位小數，並將總供應量和其他結果傳回為 1000000000000000000 (代表 1 個代幣)。 並非每個代幣都有 18 位小數，這是您在處理代幣時真正需要注意的事情。

```solidity
function balanceOf(address account) external view returns (uint256);
```

傳回某個地址 (`account`) 擁有的代幣數量。 此函式是取值器，不會修改合約的狀態。

```solidity
function allowance(address owner, address spender) external view returns (uint256);
```

ERC-20 標準允許一個地址授權另一個地址，讓後者能夠從前者提取代幣。 此取值器傳回 `spender` 被允許代表 `owner` 花費的剩餘代幣數量。 此函式是取值器，不會修改合約的狀態，且預設應傳回 0。

## 函數 {#functions}

```solidity
function transfer(address recipient, uint256 amount) external returns (bool);
```

將 `amount` 數量的代幣從函式呼叫者地址 (`msg.sender`) 轉移到接收者地址。 此函式會發出稍後定義的 `Transfer` 事件。 如果轉帳成功，則傳回 true。

```solidity
function approve(address spender, uint256 amount) external returns (bool);
```

設定 `spender` 被允許從函式呼叫者 (`msg.sender`) 餘額中轉出的 `allowance` (授權額度)。 此函式會發出 Approval 事件。 此函式傳回授權額度是否已成功設定。

```solidity
function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

使用授權額度機制，將 `amount` 數量的代幣從 `sender` 轉移到 `recipient`。 然後從呼叫者的授權額度中扣除該數量。 此函式會發出 `Transfer` 事件。

## Events {#events}

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

當代幣數量 (value) 從 `from` 地址發送到 `to` 地址時，會發出此事件。

在鑄造新代幣的情況下，轉帳通常是從 0x00..0000 地址發出；而在銷毀代幣的情況下，轉帳則是轉入 0x00..0000 地址。

```solidity
event Approval(address indexed owner, address indexed spender, uint256 value);
```

當 `owner` 批准代幣數量 (`value`) 可由 `spender` 使用時，會發出此事件。

## ERC-20 代幣的基本實作 {#a-basic-implementation-of-erc-20-tokens}

以下是可用來作為您的 ERC-20 代幣基礎的最簡單程式碼：

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

另一個優秀的 ERC-20 代幣標準實作是 [OpenZeppelin ERC-20 實作](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20)。
