---
title: 智慧型合約簡介
description: 智慧型合約概觀，重點介紹其特點及限制。
lang: zh-tw
---

## 智慧型合約是什麼？ {#what-is-a-smart-contract}

「智慧型合約」就是在以太坊區塊鏈上執行的程式。 這是一系列存在於以太坊區塊鏈特定地址的程式碼（函數）及資料（狀態）。

智慧型合約是一種[以太坊帳戶](/developers/docs/accounts/)。 這表示智慧型合約有餘額且能作為交易目標。 然而，智慧型合約不受使用者控制，而是部署至網路，並按程式編寫方式執行。 使用者帳戶能藉由傳送交易，執行智慧型合約定義的函數，來與智慧型合約互動。 智慧型合約能定義規則，就像一般合約一樣，且完全透過程式碼自動執行。 預設情況下，智慧型合約無法刪除，且與其互動的結果無法逆轉。

## 基本資訊 {#prerequisites}

如果你是初學者，或是想找不技術性不太強的說明，推薦你參閱[智慧型合約簡介](/smart-contracts/)。

務必先詳閱[帳戶](/developers/docs/accounts/)、[交易](/developers/docs/transactions/)及[以太坊虛擬機](/developers/docs/evm/)後再踏入智慧型合約的世界。

## 數位販賣機 {#a-digital-vending-machine}

或許最適合智慧型合約的比喻是 [Nick Szabo](https://unenumerated.blogspot.com/) 所說的「販賣機」。 只要輸入正確，就保證能得到特定的輸出結果。

要從販賣機取得一包點心：

```
錢 + 點心選擇 = 點心分發
```

這種邏輯會編寫進販賣機中。

而智慧型合約就像販賣機，其中編寫了邏輯。 以下是若使用 Solidity 編寫智慧型合約，這種販賣機運作方式的簡要範例：

```solidity
pragma solidity 0.8.7;

contract VendingMachine {

    // Declare state variables of the contract
    address public owner;
    mapping (address => uint) public cupcakeBalances;

    // When 'VendingMachine' contract is deployed:
    // 1. set the deploying address as the owner of the contract
    // 2. set the deployed smart contract's cupcake balance to 100
    constructor() {
        owner = msg.sender;
        cupcakeBalances[address(this)] = 100;
    }

    // Allow the owner to increase the smart contract's cupcake balance
    function refill(uint amount) public {
        require(msg.sender == owner, "Only the owner can refill.");
        cupcakeBalances[address(this)] += amount;
    }

    // Allow anyone to purchase cupcakes
    function purchase(uint amount) public payable {
        require(msg.value >= amount * 1 ether, "You must pay at least 1 ETH per cupcake");
        require(cupcakeBalances[address(this)] >= amount, "Not enough cupcakes in stock to complete this purchase");
        cupcakeBalances[address(this)] -= amount;
        cupcakeBalances[msg.sender] += amount;
    }
}
```

如同自動販賣機消除了我們對販賣員工的需求，智慧型合約也可取代許多產業的中間媒介。

## 無需許可 {#permissionless}

任何人都能編寫智慧型合約並部署於區塊鏈網路。 你只需要學習如何使用[智慧型合約語言](/developers/docs/smart-contracts/languages/)編碼，並取得足夠的以太幣，即可部署合約。 部署合約基本上是一種交易，因此你需要支付[燃料](/developers/docs/gas/)費用，如同進行簡單的以太幣轉帳一樣。 然而，部署合約的燃料成本卻遠高於此。

以太坊具備方便開發者編寫智慧型合約的程式語言：

- Solidity
- Vyper

[深入瞭解程式語言](/developers/docs/smart-contracts/languages/)

然而，在部署合約前需要先編譯，讓以太坊的虛擬機可以解譯並儲存合約。 [深入瞭解編譯](/developers/docs/smart-contracts/compiling/)

## 可組合性 {#composability}

智慧型合約公開於以太坊, 類似一API於網路. 這表示你可以在自己的智慧型合約中，調用其他智慧型合約，以大幅拓展可能性。 合約甚至能部署其他合約。

深入瞭解[智慧型合約的可組合性](/developers/docs/smart-contracts/composability/)。

## 限制 {#limitations}

智慧型合約本身無法取得「真實世界」事件的資訊，因為這些合約無法擷取鏈外來源中的資料。 這表示智慧型合約不會針對真實世界的事件做出反應。 這是刻意設計。 過度依賴外部資訊可能會破壞共識機制，而共識對安全性與去中心化至關重要。

然而，區塊鏈應用程式最好能使用鏈外資料。 解決方法是使用[預言機](/developers/docs/oracles/)，這種工具可以取得鏈外資料並提供給智慧型合約使用。

智慧型合約的另一個限制為合約大小的上限。 智慧型合約必須小於 24KB，不然燃料不足。 可以透過[鑽石模式](https://eips.ethereum.org/EIPS/eip-2535)迴避此問題。

## 多簽合約 {#multisig}

多簽（多重簽章）合約是需要多個有效簽章，才能執行交易的智慧型合約帳戶。 這能有效預防持有大量以太幣或代幣的合約發生單點失效。 多簽合約也能將執行合約與金鑰管理的責任分散給多方，避免遺失單一私密金鑰造成資金無法回復的損失。 基於上述理由，多簽合約可用於簡單的去中心化組織管理體系。 多簽需要在 M 個可接受的簽章中取得 N 個簽章才能執行（其中，N ≤ M 且 M > 1）。 通常是`N = 3, M = 5` 以及 `N = 4, M = 7`。 4/7 的多簽需要在七個可能的有效簽章中取得四個簽章。 這表示即便遺失三個簽章，仍可取回資金。 在這種情況下，這也表示大多數金鑰持有者必須同意並簽署，才能執行合約。

## 智慧型合約資源 {#smart-contract-resources}

**OpenZeppelin Contracts -** **_開發安全智慧型合約的資料庫。_**

- [openzeppelin.com/contracts/](https://openzeppelin.com/contracts/)
- [Github](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [社群論壇](https://forum.openzeppelin.com/c/general/16)

## 衍生閱讀 {#further-reading}

- [Coinbase：什麼是智慧型合約？](https://www.coinbase.com/learn/crypto-basics/what-is-a-smart-contract)
- [Chainlink：什麼是智慧型合約？](https://chain.link/education/smart-contracts)
- [影片：智慧型合約簡介](https://youtu.be/ZE2HxTmxfrI)
- [Cyfrin Updraft：Web3 學習與審計平台](https://updraft.cyfrin.io)
