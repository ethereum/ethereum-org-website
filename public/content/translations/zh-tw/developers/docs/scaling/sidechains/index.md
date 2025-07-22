---
title: 側鏈
description: 介紹目前作為擴張解決方案供以太坊社群使用的側鏈。
lang: zh-tw
sidebarDepth: 3
---

側鏈是獨立於以太坊運行的獨立區塊鏈，並透過雙向跨鏈橋連線到以太坊主網。 側鏈可以有單獨的區塊參數和[共識演算法](/developers/docs/consensus-mechanisms/)，通常是為了高效處理交易而設計。 然而，使用側鏈需要權衡，因為它們不會繼承以太坊的安全屬性。 與[二層網路擴張解決方案](/layer-2/)不同，側鏈不會將狀態變更和交易數據發佈回以太坊主網。

側鏈也犧牲了一些去中心化或安全性措施來實現高吞吐量（[可擴展性三難困境](https://vitalik.eth.limo/general/2021/05/23/scaling.html)）。 然而，正如其升級[願景聲明](/roadmap/vision/)中所述，以太坊致力於在不影響去中心化和安全性的情況下擴張。

## 側鏈的工作原理 {#how-do-sidechains-work}

側鏈是獨立的區塊鏈，具有不同的歷史記錄、開發藍圖和設計考量。 雖然側鏈可能與以太坊有一些表面上的相似，但它有幾個獨特功能。

### 共識演算法 {#consensus-algorithms}

讓側鏈獨一無二（即不同於以太坊）的特質之一是所使用的共識演算法。 側鏈不依賴以太坊達成共識，並可以選擇適合其需求的替代共識協議。 側鏈上使用的共識演算法的一些範例包括：

- [權威證明](/developers/docs/consensus-mechanisms/poa/)
- [委託權益證明](https://en.bitcoin.it/wiki/Delegated_proof_of_stake)
- [拜占庭容錯](https://decrypt.co/resources/byzantine-fault-tolerance-what-is-it-explained)。

跟以太坊一樣，側鏈也有驗證節點去驗證和處理交易、產生區塊並儲存區塊鏈狀態。 驗證者也負責維護整個網路的共識，並確保它不受惡意攻擊。

#### 區塊參數 {#block-parameters}

以太坊對[出塊時間](/developers/docs/blocks/#block-time)（即產生新區塊所需時間）和[區塊大小](/developers/docs/blocks/#block-size)（即以燃料為計量單位，每個區塊包含的資料量）設定了限制。 相反地，側鏈通常會採用不同的參數，例如更快的出塊時間和更高的燃料限制，以達到高吞吐量、快速交易和低費用。

雖然這樣做有一些好處，但對網路去中心化和安全性卻有重大影響。 高速的出塊時間和大的區塊大小這些區塊參數，增加了運行全節點的難度，讓一些「超級節點」負責保護區塊鏈的安全。 在這種情況下，驗證者串通或惡意接管鏈的可能性就會增加。

若要在不損害去中心化的情況下擴大區塊鏈的規模，就必須讓人人都能運行節點，而不一定是擁有專門硬體的人。 這就是我們一直在努力確保每個人都能在以太坊網路上[運行全節點](/developers/docs/nodes-and-clients/#why-should-i-run-an-ethereum-node)的原因。

### 以太坊虛擬機 (EVM) 相容性 {#evm-compatibility}

一些側鏈與以太坊虛擬機相容，並且能夠執行為[以太坊虛擬機 (EVM)](/developers/docs/evm/) 開發的合約。 相容於以太坊虛擬機的側鏈支援以 [Solidity 編寫](/developers/docs/smart-contracts/languages/)的智慧型合約，也支援其他以太坊虛擬機智慧型合約語言，這意味著為以太坊主網編寫的智慧型合約也將在相容於以太坊虛擬機的側鏈上有效。

這意味著若你想在側鏈上使用你的[去中心化應用程式](/developers/docs/dapps/)，只需將你的[智慧型合約](/developers/docs/smart-contracts/)部署到該側鏈即可。 側鏈的外觀、給人的感覺和行為與主鏈相似 — 你可以用 Solidity 編寫合約，並透過側鏈遠端程序呼叫與側鏈互動。

由於側鏈和以太坊虛擬機相容，因而被視為對以太坊原生去中心化應用程式有效的[擴張解決方案](/developers/docs/scaling/)。 去中心化應用程式部署到側鏈後，使用者可以盡享更低的燃料費用和更快的交易速度，尤其是在主網擁塞的情況下。

不過，如前所述，使用側鏈涉及重大取捨。 每條側鏈負責其安全性，不會繼承以太坊的安全屬性。 這會增加惡意行為的可能性，影響你的使用者或讓他們的資金面臨風險。

### 資產轉移 {#asset-movement}

爲了使一條獨立區塊鏈成爲以太坊主網的側鏈，區塊鏈需要支持在它與以太坊主網之間傳送資產。 這種與以太坊的互操作性是使用區塊鏈跨鏈橋實現的。 [跨鏈橋](/bridges/)使用部署在以太坊主網和側鏈上的智慧型合約控制兩者之間的資金橋接。

儘管跨鏈橋可以幫助使用者在以太坊和側鏈之間傳送資金，但實體資產不會在兩條鏈之間移動。 相反，通常采用與鑄造和銷毀相關的機制跨鏈傳送價值。 更多關於[跨鏈橋如何運作](/developers/docs/bridges/#how-do-bridges-work)的資訊。

## 側鏈的優勢和劣勢 {#pros-and-cons-of-sidechains}

| 優勢                                         | 劣勢                                   |
| ------------------------------------------ | ------------------------------------ |
| 支撐側鏈的技術是成熟的，並得益於廣泛的研究和設計的改進。               | 側鏈犧牲了一定程度的去中心化和去信任以換取可擴展性。           |
| 側臉支援通用計算並提供以太坊虛擬機相容性（它們能夠運行以太坊原生去中心化應用程式）。 | 側鏈使用單獨的共識機制，並且不從以太坊的安全保證中獲益。         |
| 側鏈使用不同的共識模型，為使用者高效處理交易並降低交易費。              | 側鏈需要更高的信任假設（例如，惡意側鏈驗證者達到一定人數可以進行欺詐）。 |
| 與以太坊虛擬機相容的側鏈讓去中心化應用程式可以擴展其生態系統。            |                                      |

### 使用側鏈 {#use-sidechains}

有多項專案提供側鏈實作，歡迎整合到你的去中心化應用程式：

- [Polygon PoS](https://polygon.technology/solutions/polygon-pos)
- [Skale](https://skale.network/)
- [Gnosis Chain（前身為 xDai）](https://www.gnosischain.com/)
- [Loom Network](https://loomx.io/)
- [Metis Andromeda](https://www.metis.io/)

## 衍生閱讀 {#further-reading}

- [透過側鏈擴張以太坊去中心化應用程式](https://medium.com/loom-network/dappchains-scaling-ethereum-dapps-through-sidechains-f99e51fff447) _2018 年 2 月 8 日 - Georgios Konstantopoulos_

_認識社區或社團資源能幫助大家學習更多? 歡迎自由編輯或添加於本頁!!_
