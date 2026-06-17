---
title: 挖礦
description: 解釋以太坊過去如何進行挖礦。
lang: zh-tw
---

<Alert variant="update">
<AlertEmoji text=":wave:"/>
<AlertContent>
<AlertDescription>
工作量證明不再是以太坊底層的共識機制，這意味著挖礦已經被關閉。取而代之的是，[以太坊](/)現在由質押 ETH 的驗證者來保護。您今天就可以開始質押您的 ETH。了解更多關於<a href='/roadmap/merge/'>合併</a>、<a href='/developers/docs/consensus-mechanisms/pos/'>權益證明 (PoS)</a>和<a href='/staking/'>質押</a>的資訊。本頁面僅供歷史參考。
</AlertDescription>
</AlertContent>
</Alert>

## 先決條件 {#prerequisites}

為了更易於理解本頁面，我們建議您先閱讀[交易](/developers/docs/transactions/)、[區塊](/developers/docs/blocks/)和[工作量證明 (PoW)](/developers/docs/consensus-mechanisms/pow/)。

## 什麼是以太坊挖礦？ {#what-is-ethereum-mining}

在以太坊現已棄用的工作量證明架構中，挖礦是建立交易區塊並將其新增至以太坊區塊鏈的過程。

挖礦一詞源於將加密貨幣比作黃金的說法。黃金或貴金屬是稀缺的，數位代幣也是如此，而在工作量證明系統中增加總量的唯一方法就是透過挖礦。在工作量證明的以太坊中，唯一的發行方式就是透過挖礦。然而，與黃金或貴金屬不同的是，以太坊挖礦也是透過在區塊鏈中建立、驗證、發布和傳播區塊來保護網路的一種方式。

挖出以太幣 = 保護網路

挖礦是任何工作量證明區塊鏈的命脈。在過渡到權益證明之前，以太坊礦工（執行軟體的電腦）利用他們的時間和運算能力來處理交易並產生區塊。

## 為什麼會有礦工？ {#why-do-miners-exist}

在以太坊等去中心化的系統中，我們需要確保每個人都對交易順序達成共識。礦工透過解決運算上困難的謎題來產生區塊，從而幫助實現這一點，並保護網路免受攻擊。

[更多關於工作量證明的資訊](/developers/docs/consensus-mechanisms/pow/)

以前，任何人都可以使用他們的電腦在以太坊網路上挖礦。然而，並非所有人都能透過挖出以太幣 (ETH) 獲利。在大多數情況下，礦工必須購買專用的電腦硬體，並能取得廉價的能源。一般電腦不太可能賺取足夠的區塊獎勵來支付相關的挖礦成本。

### 挖礦成本 {#cost-of-mining}

- 建立和維護礦機所需硬體的潛在成本
- 為礦機供電的電費
- 如果您在礦池中挖礦，這些礦池通常會對礦池產生的每個區塊收取固定百分比的費用
- 支援礦機的設備潛在成本（通風、能源監控、電線等）

要進一步探索挖礦的獲利能力，請使用挖礦計算機，例如 [Etherscan](https://etherscan.io/ether-mining-calculator) 提供的計算機。

## 以太坊交易過去是如何被挖出的 {#how-ethereum-transactions-were-mined}

以下概述了在以太坊工作量證明中交易是如何被挖出的。關於以太坊權益證明中此過程的類似描述，可以在[這裡](/developers/docs/consensus-mechanisms/pos/#transaction-execution-ethereum-pos)找到。

1. 使用者撰寫[交易](/developers/docs/transactions/)請求，並使用某個[帳戶](/developers/docs/accounts/)的私鑰對其進行簽章。
2. 使用者從某個[節點](/developers/docs/nodes-and-clients/)將交易請求廣播到整個以太坊網路。
3. 在得知新的交易請求後，以太坊網路中的每個節點都會將該請求新增至其本機記憶體池中，這是一個包含他們所知但尚未在區塊中提交至區塊鏈的所有交易請求的清單。
4. 在某個時刻，挖礦節點會將幾十或幾百個交易請求彙整成一個潛在的[區塊](/developers/docs/blocks/)，其方式是在保持低於區塊 Gas 限制的同時，最大化他們賺取的[交易手續費](/developers/docs/gas/)。然後挖礦節點會：
   1. 驗證每個交易請求的有效性（即沒有人試圖從他們尚未產生簽章的帳戶中轉帳以太幣，請求格式正確等），然後執行請求的程式碼，改變其本機 EVM 副本的狀態。礦工會將每個此類交易請求的交易手續費獎勵給自己的帳戶。
   2. 一旦區塊中的所有交易請求都在本機 EVM 副本上經過驗證和執行，就開始為潛在區塊產生工作量證明「合法性憑證」的過程。
5. 最終，礦工將完成為包含我們特定交易請求的區塊產生憑證。然後礦工廣播完成的區塊，其中包含憑證和聲稱的新 EVM 狀態的校驗和。
6. 其他節點得知新區塊。他們驗證憑證，自行執行區塊上的所有交易（包括我們使用者最初廣播的交易），並驗證在執行所有交易後其新 EVM 狀態的校驗和是否與礦工區塊聲稱的狀態校驗和相符。只有這樣，這些節點才會將此區塊附加到其區塊鏈的尾端，並接受新的 EVM 狀態為權威狀態。
7. 每個節點從其未完成交易請求的本機記憶體池中移除新區塊中的所有交易。
8. 加入網路的新節點會依序下載所有區塊，包括包含我們感興趣之交易的區塊。他們初始化一個本機 EVM 副本（從空白狀態的 EVM 開始），然後在其本機 EVM 副本上執行每個區塊中的每筆交易，並在此過程中驗證每個區塊的狀態校驗和。

每筆交易都會被挖出（包含在新區塊中並首次傳播）一次，但在推進權威 EVM 狀態的過程中，會由每個參與者執行和驗證。這突顯了區塊鏈的核心理念之一：**不要信任，要驗證**。

## 叔塊 {#ommer-blocks}

工作量證明上的區塊挖礦是機率性的，這意味著有時由於網路延遲，兩個有效的區塊會同時發布。在這種情況下，協定必須決定最長（因此也是最「有效」）的鏈，同時透過部分獎勵未被包含的有效提案區塊來確保對礦工的公平性。這鼓勵了網路進一步的去中心化，因為可能面臨較大延遲的較小礦工仍然可以透過[叔塊](/glossary/#ommer)獎勵產生回報。

「Ommer」一詞是父區塊之兄弟區塊的首選性別中立術語，但有時也被稱為「uncle」（叔塊）。**自從以太坊轉向權益證明以來，不再挖出叔塊**，因為在每個時槽中只會選出一個提案者。您可以透過檢視已挖出叔塊的[歷史圖表](https://ycharts.com/indicators/ethereum_uncle_rate)來看到這個變化。

## 視覺化示範 {#a-visual-demo}

觀看 Austin 為您講解挖礦和工作量證明區塊鏈。

<VideoWatch slug="blockchain-eth-build" />

## 挖礦演算法 {#mining-algorithm}

以太坊主網只使用過一種挖礦演算法：[「Ethash」](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash/)。Ethash 是最初稱為 [「Dagger-Hashimoto」](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto/) 的研發演算法的後繼者。

[更多關於挖礦演算法的資訊](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/)。

## 相關主題 {#related-topics}

- [燃料](/developers/docs/gas/)
- [EVM](/developers/docs/evm/)
- [工作量證明 (PoW)](/developers/docs/consensus-mechanisms/pow/)