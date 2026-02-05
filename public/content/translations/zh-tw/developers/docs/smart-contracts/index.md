---
title: 智慧型合約簡介
description: 智慧型合約概觀，重點介紹其特點及限制。
lang: zh-tw
---

## 智慧型合約是什麼？ 什麼是智能合約？{#what-is-a-smart-contract}

「智慧型合約」就是在以太坊區塊鏈上執行的程式。 這是一系列存在於以太坊區塊鏈特定地址的程式碼（函數）及資料（狀態）。

智能合約是[以太坊帳戶](/developers/docs/accounts/)的一種類型。 這表示智慧型合約有餘額且能作為交易目標。 然而，智慧型合約不受使用者控制，而是部署至網路，並按程式編寫方式執行。 使用者帳戶能藉由傳送交易，執行智慧型合約定義的函數，來與智慧型合約互動。 智慧型合約能定義規則，就像一般合約一樣，且完全透過程式碼自動執行。 預設情況下，智慧型合約無法刪除，且與其互動的結果無法逆轉。

## 先決條件 {#prerequisites}

如果你剛入門，或是在尋找技術性較低的介紹，我們推薦你閱讀我們的[智能合約簡介](/smart-contracts/)。

在進入智能合約的世界前，請確保你已閱讀過[帳戶](/developers/docs/accounts/)、[交易](/developers/docs/transactions/)和[以太坊虛擬機](/developers/docs/evm/)的相關說明。

## 數位自動販賣機 {#a-digital-vending-machine}

智能合約最好的比喻或許是自動販賣機，這個概念由 [Nick Szabo](https://unenumerated.blogspot.com/) 提出。 只要輸入正確，就保證能得到特定的輸出結果。

要從販賣機取得一包點心：

```
錢 + 點心選擇 = 點心分發
```

這種邏輯會編寫進販賣機中。

而智慧型合約就像販賣機，其中編寫了邏輯。 以下是若使用 Solidity 編寫智慧型合約，這種販賣機運作方式的簡要範例：

```solidity
pragma solidity 0.8.7;

contract VendingMachine {

    // 宣告合約的狀態變數
    address public owner;
    mapping (address => uint) public cupcakeBalances;

    // 部署「VendingMachine」合約時：
    // 1. 將部署地址設為合約擁有者
    // 2. 將部署的智能合約的杯子蛋糕餘額設為 100
    constructor() {
        owner = msg.sender;
        cupcakeBalances[address(this)] = 100;
    }

    // 允許擁有者增加智能合約的杯子蛋糕餘額
    function refill(uint amount) public {
        require(msg.sender == owner, "只有擁有者能補充。");
        cupcakeBalances[address(this)] += amount;
    }

    // 允許任何人購買杯子蛋糕
    function purchase(uint amount) public payable {
        require(msg.value >= amount * 1 ether, "每個杯子蛋糕至少需支付 1 ETH");
        require(cupcakeBalances[address(this)] >= amount, "庫存杯子蛋糕不足，無法完成此次購買");
        cupcakeBalances[address(this)] -= amount;
        cupcakeBalances[msg.sender] += amount;
    }
}
```

如同自動販賣機消除了我們對販賣員工的需求，智慧型合約也可取代許多產業的中間媒介。

## 無需許可 {#permissionless}

任何人都能編寫智慧型合約並部署於區塊鏈網路。 你只需要學習如何使用[智能合約語言](/developers/docs/smart-contracts/languages/)撰寫程式碼，並擁有足夠的 ETH 來部署你的合約。 部署智能合約基本上是一種交易，所以你需要支付 [Gas](/developers/docs/gas/)，就像支付簡單的 ETH 轉帳一樣。 然而，部署合約的燃料成本卻遠高於此。

以太坊具備方便開發者編寫智慧型合約的程式語言：

- Solidity
- Vyper

[更多關於語言的資訊](/developers/docs/smart-contracts/languages/)

然而，在部署合約前需要先編譯，讓以太坊的虛擬機可以解譯並儲存合約。 [更多關於編譯的資訊](/developers/docs/smart-contracts/compiling/)

## 可組合性 {#composability}

智慧型合約在以太坊上公開，類似於傳統網路世界中的 Open API。 這表示你可以在自己的智慧型合約中，調用其他智慧型合約，以大幅拓展可能性。 合約甚至能部署其他合約。

進一步了解[智能合約可組合性](/developers/docs/smart-contracts/composability/)。

## 限制 {#limitations}

智能合約本身無法取得「真實世界」事件的資訊，因為這些合約無法擷取鏈下來源中的資料。 這表示智慧型合約不會針對真實世界的事件做出反應。 這是刻意設計。 過度依賴外部資訊可能會破壞共識機制，而共識對安全性與去中心化至關重要。

然而，區塊鏈應用程式最好能使用鏈下資料。 解決方案是使用[預言機](/developers/docs/oracles/)，這是一種可以擷取鏈外資料並提供給智能合約使用的工具。

智慧型合約的另一個限制為合約大小的上限。 智慧型合約必須小於 24KB，不然燃料不足。 這個問題可以透過使用[鑽石模式 (The Diamond Pattern)](https://eips.ethereum.org/EIPS/eip-2535) 來解決。

## 多簽合約 {#multisig}

多簽（多重簽章）合約是需要多個有效簽章，才能執行交易的智慧型合約帳戶。 這能有效預防持有大量以太幣或代幣的合約發生單點失效。 多簽合約也能將執行合約與金鑰管理的責任分散給多方，避免遺失單一私密金鑰造成資金無法回復的損失。 基於上述理由，多簽合約可用於簡單的去中心化組織管理體系。 多簽需要從 M 個可接受的簽章中取得 N 個簽章（其中 N ≤ M，且 M > 1）才能執行。 常用的組合是 `N = 3, M = 5` 和 `N = 4, M = 7`。 4/7 的多簽需要在七個可能的有效簽章中取得四個簽章。 這表示即便遺失三個簽章，仍可取回資金。 在這種情況下，這也表示大多數金鑰持有者必須同意並簽署，才能執行合約。

## 智能合約資源 {#smart-contract-resources}

**OpenZeppelin Contracts -** **_用於安全智能合約開發的函式庫。_**

- [openzeppelin.com/contracts/](https://openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [社群論壇](https://forum.openzeppelin.com/c/general/16)

## 延伸閱讀 {#further-reading}

- [Coinbase：什麼是智能合約？](https://www.coinbase.com/learn/crypto-basics/what-is-a-smart-contract)
- [Chainlink：什麼是智能合約？](https://chain.link/education/smart-contracts)
- [影片：簡單解釋 - 智能合約](https://youtu.be/ZE2HxTmxfrI)
- [Cyfrin Updraft：Web3 學習與稽核平台](https://updraft.cyfrin.io)
