---
title: 挖礦
description: 解釋以太坊挖礦的運作方式。
lang: zh-tw
---

<InfoBanner emoji=":wave:">
工作量證明不再是以太坊共識機制的基礎，這意味著挖礦已完結。 取而代之的是，以太坊由抵押以太幣的驗證者來保障安全。 你能從現在開始質押以太幣。 閱讀更多關於<a href='/roadmap/merge/'>合併</a>、<a href='/developers/docs/consensus-mechanisms/pos/'>權益證明</a>和<a href='/staking/'>質押</a>的資訊。 此頁面僅為滿足對歷史的興趣。
</InfoBanner>

## 基本資訊 {#prerequisites}

為了更好地理解本頁面，建議你先閱讀[交易](/developers/docs/transactions/)、[區塊](/developers/docs/blocks/)及[工作量證明](/developers/docs/consensus-mechanisms/pow/)。

## 什麼是以太坊挖礦？ {#what-is-ethereum-mining}

挖礦是在以太坊現已棄用的工作量證明架構中，建立要新增至以太坊區塊鏈的交易區塊的過程。

挖礦一詞起源於將加密貨幣與黃金作類比。 黃金或貴金屬很稀有，數位代幣也一樣，而在工作量證明系統中，增加代幣總量的唯一方法是透過挖礦。 在工作量證明以太坊中，挖礦是僅有的代幣發行方式。 然而，與黃金或貴金屬不同，以太坊挖礦透過於區塊鏈中建立、驗證、發布和傳播區塊，也是保護網路安全的方式。

以太幣挖礦 = 保護網路安全

挖礦是任何工作量證明區塊鏈的命脈。 在過渡到權益證明之前，以太坊礦工 - 即運行軟體的電腦，利用它們的時間和算力來處理交易並產出區塊。

## 為何需要礦工？ {#why-do-miners-exist}

在以太坊這樣的去中心化機制中，我們須確保所有參與者同意統一的交易順序。 礦工透過解決計算難題來產出區塊，保護網路免受攻擊，幫助實現這個目標。

[有關工作量證明的更多資訊](/developers/docs/consensus-mechanisms/pow/)

以前任何人都能使用自己的電腦在以太坊網路上挖礦。 然而，並非每個人都能透過挖以太幣 (ETH) 而獲利。 在大多數情況下，礦工必須購買專用電腦硬體，並要使用廉價能源。 普通電腦不太可能獲得足夠的區塊獎勵來支付相關挖礦成本。

### 挖礦成本 {#cost-of-mining}

- 建置及維護挖礦設備所需硬體的潛在成本
- 為挖礦設備供電的電力成本
- 如果你在礦池中挖礦，這些礦池通常會對礦池產生的每個區塊收取固定百分比的費用
- 支援挖礦設備的潛在設備成本（通風、能源監控和電力拉線等等）

為深入了解挖礦收益，推薦使用挖礦計算機，例如 [Etherscan](https://etherscan.io/ether-mining-calculator) 提供的挖礦計算機。

## 以太坊交易是如何挖掘的 {#how-ethereum-transactions-were-mined}

以下概述如何在以太坊工作量證明中挖掘交易。 可以在[此處](/developers/docs/consensus-mechanisms/pos/#transaction-execution-ethereum-pos)找到以太坊權益證明下該過程的類比描述。

1. 使用者編寫[交易](/developers/docs/transactions/)請求，並用某個[帳戶](/developers/docs/accounts/)之私密金錀簽署此交易請求。
2. 使用者從某個[節點](/developers/docs/nodes-and-clients/)廣播交易請求至全體以太坊網路。
3. 當接收到新交易請求時，以太坊網路中的每個節點新增該請求至其本機記憶體池，這是他們已在區塊中收到但尚未提交至區塊鏈的所有交易請求的清單。
4. 一定時間後，挖礦節點匯總數十或數百筆交易請求到一個潛在的[區塊](/developers/docs/blocks/)，其通常藉由某一方法，在區塊燃料限制範圍內賺取最大化[交易費](/developers/docs/gas/)。 挖礦節點接著:
   1. 驗證每個交易請求的有效性（即，沒人試圖從還沒有為其產生簽名的帳戶轉出以太幣，請求沒有格式錯誤，等等），然後執行請求程式碼，更改其本機以太坊虛擬機副本的狀態。 對於每個傳送到其帳戶的此類交易請求，礦工將取得交易費作為獎勵。
   2. 一旦區塊中的所有交易請求都已在本機以太坊虛擬機副本上驗證並執行，為潛在區塊產生工作量證明「合法性證書」的過程便會開始。
5. 最終，礦工將完成區塊證書的產生，該區塊中包括我們的特定交易請求。 接著礦工廣播此完成的區塊，其中包括上述證書和宣稱的新以太坊虛擬機狀態的校驗和。
6. 其他節點接收到此新區塊。 它們會驗證證書，自行執行區塊中的所有交易（包括最初由你的使用者廣播的交易），並驗證在執行所有交易後，其新的以太坊虛擬機狀態之校驗和是否與曠工區塊所宣稱的狀態之校驗和相符。 僅當此時，這些節點才會附加此區塊於其區塊鏈的尾部，並接受新的以太坊虛擬機狀態作為規範化狀態。
7. 各節點從其本機未履行之交易請求記憶體池中移除新區塊中的所有交易。
8. 加入網路的新節點依序下載所有區塊，包括包含我們感興趣的交易的區塊。 他們會初始化一個本機以太坊虛擬機副本（始於空白狀態的以太坊虛擬機），接著開始執行其本機以太坊虛擬機副本之上每個區塊中的每筆交易，驗證期間每個區塊的狀態校驗和。

每筆交易只被挖掘一次（包含在新區塊中並首次傳播），但在推進規範化以太坊虛擬機狀態的過程中會被每個參與者執行並驗證。 這強調了區塊鏈的中心信念之一：**不信任，而是驗證**。

## Ommer（叔）區塊 {#ommer-blocks}

基於工作量證明的區塊挖掘具有概率性，這意味著有時由於網路延遲，會同時發布兩個有效區塊。 在這種情況下，協定必須確定最長（因此也是最「有效」）的鏈，同時透過針對已提交但未被包含的有效區塊給予部分獎勵，來確保對曠工的公平性。 這促使網路進一步去中心化，因為小規模礦工可能面臨更大的延遲，但仍然可以透過 [Ommer](/glossary/#ommer) 區塊獎勵獲得回報。

對於父區塊的兄弟姐妹區塊來說，「ommer/兄弟姐妹」一詞是首選的不分性別的詞，但有時也被稱為「uncle/叔」塊。 **自以太坊過渡至權益證明以來，就沒有繼續挖掘 Ommer 區塊了**，因為現在每個時隙只會選出一名提交者。 你能透過查看已挖掘 Ommer 區塊的[歷史圖表](https://ycharts.com/indicators/ethereum_uncle_rate)來了解這項變更。

## 視覺範例 {#a-visual-demo}

觀看影片，Austin 會帶你了解挖礦與工作量證明區塊鏈。

<YouTube id="zcX7OJ-L8XQ" />

## 挖礦演算法 {#mining-algorithm}

以太坊主網只使用過一種挖礦演算法 -[「Ethash」](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash/)。 Ethash 是原始研發演算法（稱為[「Dagger-Hashimoto」](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto/)）的後繼者。

[更多關於挖礦演算法的資訊](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/)。

## 相關主題 {#related-topics}

- [燃料](/developers/docs/gas/)
- [以太坊虛擬機器 (EVM)](/developers/docs/evm/)
- [工作量證明](/developers/docs/consensus-mechanisms/pow/)
