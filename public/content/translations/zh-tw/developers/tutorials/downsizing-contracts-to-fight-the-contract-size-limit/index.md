---
title: "縮小合約大小來對抗合約大小限制"
description: 你可以怎麼做來防止智能合約規模過大？
author: Markus Waas
lang: zh-tw
tags: [ "穩固", "智能合約", "儲存" ]
skill: intermediate
published: 2020-06-26
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/max-contract-size
---

## 為什麼要有個限制？ {#why-is-there-a-limit}

在 [2016 年 11 月 22 日](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon/)，Spurious Dragon 硬分叉引入了 [EIP-170](https://eips.ethereum.org/EIPS/eip-170)，新增了 24.576 kb 的智能合約大小限制。 身為 Solidity 開發者，這代表當你在合約中加入越來越多功能時，在某個時間點你會達到上限，並在部署時看到以下錯誤：

`Warning: Contract code size exceeds 24576 bytes (a limit introduced in Spurious Dragon). 此合約可能無法在主網上部署。 Consider enabling the optimizer (with a low "runs" value!), turning off revert strings, or using libraries.`

這個限制是為了防止阻斷服務 (DOS) 攻擊。 對合約的任何呼叫，在 gas 方面都相對便宜。 然而，合約呼叫對以太坊節點的影響，會根據被呼叫的合約程式碼大小（從磁碟讀取程式碼、預處理程式碼、將資料加入默克爾證明）而不成比例地增加。 每當發生攻擊者能以少量資源，造成他人大量工作負擔的情形，便可能產生 DOS 攻擊。

起初這問題不大，因為一個天然的合約大小限制就是區塊 gas 上限。 顯然，合約必須部署在一個包含其所有位元組碼的交易中。 如果你只在一個區塊中包含那筆交易，你可以用完所有的 gas，但它不是無限的。 自 [倫敦升級](/ethereum-forks/#london) 以來，區塊 gas 上限可以根據網路需求在 1500 萬到 3000 萬單位之間變動。

接下來，我們將按照潛在影響力的大小，來看看一些方法。 可以把它想像成減重。 一個人要達到目標體重（在我們的情況下是 24kb）的最佳策略是先專注於影響力大的方法。 在大多數情況下，單靠調整飲食就能達標，但有時候你需要做的更多一點。 然後你可能會增加一些運動（中等影響），或甚至營養補充品（小影響）。

## 重大影響 {#big-impact}

### 拆分你的合約 {#separate-your-contracts}

這應該永遠是你的首選方法。 你如何將合約拆分成多個較小的合約？ 這通常會迫使你為合約設計一個好的架構。 從程式碼可讀性的角度來看，小合約總是比較好。 要拆分合約，可以問自己：

- 哪些函式屬於同一組？ 每一組函式可能最適合放在各自的合約中。
- 哪些函式不需要讀取合約狀態，或只需要讀取狀態的特定子集？
- 你能將儲存空間和功能性拆分開來嗎？

### 函式庫 {#libraries}

一個將功能性程式碼從儲存空間移開的簡單方法是使用[函式庫](https://solidity.readthedocs.io/en/v0.6.10/contracts.html#libraries)。 不要將函式庫的函式宣告為 internal，因為它們會在編譯期間直接被[加到合約中](https://ethereum.stackexchange.com/questions/12975/are-internal-functions-in-libraries-not-covered-by-linking)。 但如果你使用 public 函式，那麼它們實際上會存在一個獨立的函式庫合約中。 可以考慮 [using for](https://solidity.readthedocs.io/en/v0.6.10/contracts.html#using-for) 讓函式庫的使用更方便。

### 代理 {#proxies}

一個更進階的策略是代理系統。 函式庫在後端使用 `DELEGATECALL`，它只是用呼叫合約的狀態來執行另一個合約的函式。 查看[這篇部落格文章](https://hackernoon.com/how-to-make-smart-contracts-upgradable-2612e771d5a2)，以了解更多關於代理系統的資訊。 它們提供你更多功能，例如，它們能讓合約可以升級，但也增加了許多複雜性。 除非出於某些原因這是你唯一的選擇，否則我不會只為了縮小合約大小而加入這些。

## 中等影響 {#medium-impact}

### 移除函式 {#remove-functions}

這點應該很明顯。 函式會增加不少合約大小。

- **External**：我們時常為了方便而加入許多 view 函式。 在你碰到大小限制之前，這完全沒問題。 那時你可能就得認真考慮，只保留絕對必要的函式，並移除其他的。
- **Internal**：你也可以移除 internal/private 函式，並只要該函式只被呼叫一次，就直接內聯 (inline) 其程式碼。

### 避免額外的變數 {#avoid-additional-variables}

```solidity
function get(uint id) returns (address,address) {
    MyStruct memory myStruct = myStructs[id];
    return (myStruct.addr1, myStruct.addr2);
}
```

```solidity
function get(uint id) returns (address,address) {
    return (myStructs[id].addr1, myStructs[id].addr2);
}
```

像這樣一個簡單的改變，就差了 **0.28kb**。 你的合約中很可能有很多類似的情況，這些情況累積起來的量可能相當可觀。

### 縮短錯誤訊息 {#shorten-error-message}

長的 revert 訊息，特別是許多不同的 revert 訊息，會讓合約膨脹。 改用簡短的錯誤碼，並在你的合約中解碼它們。 一則長訊息可以變得更短：

```solidity
require(msg.sender == owner, "Only the owner of this contract can call this function");
```

```solidity
require(msg.sender == owner, "OW1");
```

### 使用自訂錯誤而非錯誤訊息

[Solidity 0.8.4](https://blog.soliditylang.org/2021/04/21/custom-errors/) 引入了自訂錯誤。 它們是減少合約大小的好方法，因為它們會被 ABI 編碼為選擇器（就像函式一樣）。

```solidity
error Unauthorized();

if (msg.sender != owner) {
    revert Unauthorized();
}
```

### 在優化器中考慮使用較低的 run 值 {#consider-a-low-run-value-in-the-optimizer}

你也可以更改優化器的設定。 預設值 200 代表它會試著優化位元組碼，就像函式被呼叫 200 次一樣。 如果你將它改為 1，基本上就是告訴優化器，針對每個函式只執行一次的情況進行優化。 一個為執行一次而優化的函式，代表它是為部署本身而優化。 請注意，**這會增加執行函式的 [gas 成本](/developers/docs/gas/)**，所以你可能不想這麼做。

## 微小影響 {#small-impact}

### 避免將 struct 傳遞給函式 {#avoid-passing-structs-to-functions}

如果你正在使用 [ABIEncoderV2](https://solidity.readthedocs.io/en/v0.6.10/layout-of-source-files.html#abiencoderv2)，不將 struct 傳遞給函式會有所幫助。 不要將參數作為 struct 傳遞，而是直接傳遞所需的參數。 在這個範例中，我們又節省了 **0.1kb**。

```solidity
function get(uint id) returns (address,address) {
    return _get(myStruct);
}

function _get(MyStruct memory myStruct) private view returns(address,address) {
    return (myStruct.addr1, myStruct.addr2);
}
```

```solidity
function get(uint id) returns(address,address) {
    return _get(myStructs[id].addr1, myStructs[id].addr2);
}

function _get(address addr1, address addr2) private view returns(address,address) {
    return (addr1, addr2);
}
```

### 為函式和變數宣告正確的可見性 {#declare-correct-visibility-for-functions-and-variables}

- 只會從外部呼叫的函式或變數？ 將它們宣告為 `external` 而不是 `public`。
- 只在合約內部呼叫的函式或變數？ 將它們宣告為 `private` 或 `internal` 而不是 `public`。

### 移除修飾符 {#remove-modifiers}

修飾符，特別是當大量使用時，可能對合約大小產生重大影響。 考慮移除它們，改用函式。

```solidity
modifier checkStuff() {}

function doSomething() checkStuff {}
```

```solidity
function checkStuff() private {}

function doSomething() { checkStuff(); }
```

這些技巧應該能幫助你大幅縮小合約大小。 再次強調，如果可能的話，請務必專注於拆分合約，以達到最大的影響。
