---
title: 智能合約簡介
description: 智能合約的概述，重點介紹其獨特的特徵與限制。
lang: zh-tw
---

## 什麼是智能合約？ {#what-is-a-smart-contract}

「智能合約」簡單來說就是一個在[以太坊](/)區塊鏈上運行的程式。它是程式碼（其函式）和資料（其狀態）的集合，存在於以太坊區塊鏈上的特定地址。

智能合約是[以太坊帳戶](/developers/docs/accounts/)的一種。這意味著它們擁有餘額，並且可以成為交易的目標。然而，它們不受使用者控制，而是部署到網路並按照程式設計運行。使用者帳戶可以透過提交交易來執行智能合約上定義的函式，進而與智能合約進行互動。智能合約可以像一般合約一樣定義規則，並透過程式碼自動強制執行。預設情況下，智能合約無法被刪除，且與它們的互動是不可逆的。

## 先決條件 {#prerequisites}

如果您剛開始接觸，或正在尋找較少技術性的介紹，我們推薦我們的[智能合約簡介](/smart-contracts/)。

在進入智能合約的世界之前，請確保您已經閱讀過關於[帳戶](/developers/docs/accounts/)、[交易](/developers/docs/transactions/)以及[以太坊虛擬機](/developers/docs/evm/)的內容。

## 數位自動販賣機 {#a-digital-vending-machine}

正如[尼克·薩博](https://unenumerated.blogspot.com/)所描述的，智能合約最好的比喻或許就是自動販賣機。只要有正確的輸入，就能保證特定的輸出。

要從自動販賣機買零食：

```
金錢 + 選擇零食 = 掉出零食
```

這個邏輯被寫入自動販賣機的程式中。

智能合約就像自動販賣機一樣，內部編寫了邏輯程式。如果這台自動販賣機是用 Solidity 編寫的智能合約，以下是它看起來的簡單範例：

```solidity
pragma solidity 0.8.7;

contract VendingMachine {

    // 宣告合約的狀態變數
    address public owner;
    mapping (address => uint) public cupcakeBalances;

    // 當 'VendingMachine' 合約被部署時：
    // 1. 將部署地址設為合約的擁有者
    // 2. 將已部署的智能合約的杯子蛋糕餘額設為 100
    constructor() {
        owner = msg.sender;
        cupcakeBalances[address(this)] = 100;
    }

    // 允許擁有者增加智能合約的杯子蛋糕餘額
    function refill(uint amount) public {
        require(msg.sender == owner, "Only the owner can refill.");
        cupcakeBalances[address(this)] += amount;
    }

    // 允許任何人購買杯子蛋糕
    function purchase(uint amount) public payable {
        require(msg.value >= amount * 1 ether, "You must pay at least 1 ETH per cupcake");
        require(cupcakeBalances[address(this)] >= amount, "Not enough cupcakes in stock to complete this purchase");
        cupcakeBalances[address(this)] -= amount;
        cupcakeBalances[msg.sender] += amount;
    }
}
```

就像自動販賣機消除了對販賣人員的需求一樣，智能合約可以取代許多產業中的仲介機構。

## 無需許可 {#permissionless}

任何人都可以編寫智能合約並將其部署到網路。您只需要學習如何使用[智能合約語言](/developers/docs/smart-contracts/languages/)編寫程式碼，並擁有足夠的 ETH 來部署您的合約。在技術上，部署智能合約是一筆交易，因此您需要支付[燃料](/developers/docs/gas/)，就像您為簡單的 ETH 轉帳支付燃料一樣。然而，合約部署的燃料成本要高得多。

以太坊擁有對開發者友善的語言來編寫智能合約：

- Solidity
- Vyper

[更多關於語言的資訊](/developers/docs/smart-contracts/languages/)

然而，它們必須在部署之前進行編譯，以便以太坊虛擬機能夠解釋並儲存合約。[更多關於編譯的資訊](/developers/docs/smart-contracts/compiling/)

## 可組合性 {#composability}

智能合約在以太坊上是公開的，可以被視為開放的 API。這意味著您可以在自己的智能合約中呼叫其他智能合約，以大幅擴展其可能性。合約甚至可以部署其他合約。

了解更多關於[智能合約可組合性](/developers/docs/smart-contracts/composability/)的資訊。

## 限制 {#limitations}

單靠智能合約無法獲取有關「現實世界」事件的資訊，因為它們無法從鏈下來源擷取資料。這意味著它們無法對現實世界中的事件做出反應。這是刻意設計的。依賴外部資訊可能會危及共識，而共識對於安全性和去中心化至關重要。

然而，區塊鏈應用程式能夠使用鏈下資料是很重要的。解決方案是[預言機 (oracles)](/developers/docs/oracles/)，這是一種擷取鏈下資料並將其提供給智能合約使用的工具。

智能合約的另一個限制是最大合約大小。智能合約最大只能是 24KB，否則會耗盡燃料。這可以透過使用[鑽石模式 (The Diamond Pattern)](https://eips.ethereum.org/EIPS/eip-2535) 來規避。

## 多方簽名合約 {#multisig}

多方簽名 (Multisig) 合約是一種智能合約帳戶，需要多個有效的簽章才能執行交易。這對於避免持有大量以太幣或其他代幣的合約出現單點故障非常有用。多方簽名還將合約執行和金鑰管理的責任分配給多方，並防止單一私鑰遺失導致不可逆的資金損失。基於這些原因，多方簽名合約可用於簡單的 DAO 治理。多方簽名需要 M 個可能接受的簽章中的 N 個簽章（其中 N ≤ M，且 M > 1）才能執行。通常使用 `N = 3, M = 5` 和 `N = 4, M = 7`。一個 4/7 的多方簽名需要七個可能有效簽章中的四個。這意味著即使遺失了三個簽章，資金仍然可以取回。在這種情況下，這也意味著大多數金鑰持有者必須同意並簽署，合約才能執行。

## 智能合約資源 {#smart-contract-resources}

**歐本齊柏林 Contracts -** **_用於安全智能合約開發的函式庫。_**

- [openzeppelin.com/contracts/](https://openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [社群論壇](https://forum.openzeppelin.com/c/general/16)

## 延伸閱讀 {#further-reading}

- [Coinbase：什麼是智能合約？](https://www.coinbase.com/learn/crypto-basics/what-is-a-smart-contract)
- [切林克：什麼是智能合約？](https://chain.link/education/smart-contracts)
- [影片：簡單解釋 - 智能合約](https://youtu.be/ZE2HxTmxfrI)
- [Cyfrin Updraft：Web3 學習與稽核平台](https://updraft.cyfrin.io)

## 教學：以太坊上的智能合約簽章 (EIP-1271) {#tutorials}

- [EIP-1271：簽署與驗證智能合約簽章](/developers/tutorials/eip-1271-smart-contract-signatures/) _– EIP-1271 如何讓智能合約驗證簽章，並包含 Safe 實作的逐步解說。_