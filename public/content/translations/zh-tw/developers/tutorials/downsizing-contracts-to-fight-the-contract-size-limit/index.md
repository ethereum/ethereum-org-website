---
title: "縮減合約以應對合約大小限制"
description: "你可以做些什麼來防止智能合約變得過大？"
author: "馬庫斯·瓦斯"
lang: zh-tw
tags: ["Solidity", "智能合約", "儲存"]
skill: intermediate
breadcrumb: "縮減合約"
published: 2020-06-26
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/max-contract-size
---

## 為什麼會有限制？ {#why-is-there-a-limit}

在 [2016 年 11 月 22 日](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon)，Spurious Dragon 硬分叉引入了 [EIP-170](https://eips.ethereum.org/EIPS/eip-170)，增加了一個 24.576 kb 的智能合約大小限制。對於身為 Solidity 開發者的你來說，這意味著當你為合約添加越來越多的功能時，在某個時刻你會達到這個限制，並在部署時看到以下錯誤：

`Warning: Contract code size exceeds 24576 bytes (a limit introduced in Spurious Dragon). This contract may not be deployable on Mainnet. Consider enabling the optimizer (with a low "runs" value!), turning off revert strings, or using libraries.`

引入這個限制是為了防止阻斷服務（DOS）攻擊。就燃料（gas）而言，對合約的任何呼叫都相對便宜。然而，合約呼叫對以太坊節點的影響會根據被呼叫合約程式碼的大小而不成比例地增加（從磁碟讀取程式碼、預處理程式碼、將資料加入默克爾證明）。每當出現攻擊者只需少量資源就能導致其他人產生大量工作的情況時，就會產生 DOS 攻擊的潛在風險。

最初這不是什麼大問題，因為一個自然的合約大小限制是區塊 Gas 限制。顯然，合約必須在包含合約所有位元組碼的交易中進行部署。如果你在一個區塊中只包含那一筆交易，你可以用光所有的燃料，但它並不是無限的。自從 [倫敦升級](/ethereum-forks/#london) 以來，區塊 Gas 限制已經能夠根據網路需求在 1500 萬到 3000 萬單位之間變動。

在接下來的內容中，我們將探討一些按其潛在影響力排序的方法。可以用減肥的概念來思考。達到目標體重（在我們的例子中是 24kb）的最佳策略是首先專注於影響力大的方法。在大多數情況下，只要調整飲食就能達到目標，但有時你需要做更多。然後你可能會增加一些運動（中等影響），甚至服用補充劑（小影響）。

## 大影響 {#big-impact}

### 分離你的合約 {#separate-your-contracts}

這應該永遠是你的首要方法。你如何將合約分離成多個較小的合約？這通常會迫使你為合約設計出良好的架構。從程式碼可讀性的角度來看，較小的合約總是更受歡迎。為了拆分合約，請問自己：

- 哪些函式屬於同一類？每組函式可能最好放在各自的合約中。
- 哪些函式不需要讀取合約狀態，或者只需要讀取狀態的特定子集？
- 你能將儲存和功能分開嗎？

### 函式庫 {#libraries}

將功能程式碼從儲存中移出的一個簡單方法是使用 [函式庫](https://solidity.readthedocs.io/en/v0.6.10/contracts.html#libraries)。不要將函式庫的函式宣告為 internal，因為這些函式會在編譯期間直接 [加入到合約中](https://ethereum.stackexchange.com/questions/12975/are-internal-functions-in-libraries-not-covered-by-linking)。但如果你使用 public 函式，那麼這些函式實際上會存在於一個獨立的函式庫合約中。考慮 [using for](https://solidity.readthedocs.io/en/v0.6.10/contracts.html#using-for) 語法，讓函式庫的使用更加方便。

### 代理 {#proxies}

一個更進階的策略是代理系統。函式庫在底層使用 `DELEGATECALL`，它只是使用呼叫合約的狀態來執行另一個合約的函式。查看 [這篇部落格文章](https://hackernoon.com/how-to-make-smart-contracts-upgradable-2612e771d5a2) 以了解更多關於代理系統的資訊。它們為你提供更多功能，例如，它們啟用了可升級性，但它們也增加了許多複雜性。除非出於某種原因這是你唯一的選擇，否則我不會僅僅為了縮減合約大小而加入它們。

## 中等影響 {#medium-impact}

### 移除函式 {#remove-functions}

這點應該很明顯。函式會相當程度地增加合約大小。

- **外部（External）**：通常為了方便起見，我們會加入許多 view 函式。這完全沒問題，直到你達到大小限制。那時你可能需要認真考慮移除除了絕對必要之外的所有函式。
- **內部（Internal）**：只要函式只被呼叫一次，你也可以移除 internal/private 函式，並直接將程式碼內聯（inline）。

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

像這樣一個簡單的改變就能產生 **0.28kb** 的差異。你很有可能在你的合約中找到許多類似的情況，而這些情況累積起來真的會達到可觀的數量。

### 縮短錯誤訊息 {#shorten-error-message}

冗長的回滾訊息，特別是許多不同的回滾訊息，會使合約變得臃腫。取而代之的是使用簡短的錯誤代碼，並在你的合約中對其進行解碼。一個長訊息可以變得短得多：

```solidity
require(msg.sender == owner, "Only the owner of this contract can call this function");
```

```solidity
require(msg.sender == owner, "OW1");
```

### 使用自訂錯誤代替錯誤訊息 {#use-custom-errors-instead-of-error-messages}

自訂錯誤已在 [Solidity 0.8.4](https://blog.soliditylang.org/2021/04/21/custom-errors/) 中引入。它們是縮減合約大小的絕佳方式，因為它們被 ABI 編碼為選擇器（就像函式一樣）。

```solidity
error Unauthorized();

if (msg.sender != owner) {
    revert Unauthorized();
}
```

### 考慮在優化器中使用較低的 run 值 {#consider-a-low-run-value-in-the-optimizer}

你也可以更改優化器設定。預設值 200 意味著它試圖優化位元組碼，就好像一個函式被呼叫了 200 次一樣。如果你將其更改為 1，你基本上是告訴優化器針對每個函式只執行一次的情況進行優化。針對只執行一次而優化的函式，意味著它是為部署本身進行優化的。請注意，**這會增加執行函式的 [燃料成本](/developers/docs/gas/)**，所以你可能不想這麼做。

## 小影響 {#small-impact}

### 避免將結構體傳遞給函式 {#avoid-passing-structs-to-functions}

如果你正在使用 [ABIEncoderV2](https://solidity.readthedocs.io/en/v0.6.10/layout-of-source-files.html#abiencoderv2)，不將結構體傳遞給函式會有所幫助。與其將參數作為結構體傳遞，不如直接傳遞所需的參數。在這個例子中，我們又節省了 **0.1kb**。

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

- 僅從外部呼叫的函式或變數？將它們宣告為 `external` 而不是 `public`。
- 僅從合約內部呼叫的函式或變數？將它們宣告為 `private` 或 `internal` 而不是 `public`。

### 移除修飾符 {#remove-modifiers}

修飾符，特別是在頻繁使用時，可能會對合約大小產生重大影響。考慮移除它們並改用函式。

```solidity
modifier checkStuff() {}

function doSomething() checkStuff {}
```

```solidity
function checkStuff() private {}

function doSomething() { checkStuff(); }
```

這些技巧應該能幫助你顯著縮減合約大小。再次強調，我再怎麼強調都不為過，如果可能的話，始終專注於拆分合約以獲得最大的影響。