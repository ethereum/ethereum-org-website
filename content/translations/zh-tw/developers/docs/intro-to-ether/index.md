---
title: 以太幣簡介
description: 開發者為你介紹以太幣加密貨幣
lang: zh-tw
---

## 前置要求 {#prerequisites}

為了讓你更容易理解本頁，建議你先通讀我們的[以太坊介紹](/developers/docs/intro-to-ethereum/)。

## 什麼是加密貨幣？ {#what-is-a-cryptocurrency}

加密貨幣為交易媒介，其安全由以區塊鏈為基礎的帳本保障。

交易媒介被廣泛視作商品與服務的付款方式，帳本為用來追蹤交易的資料儲存。 區塊鏈技術讓使用者能夠在帳本上進行交易，且無需依賴任何信任之第三方來維持此帳本。

第一種加密貨幣為比特幣，由中本聰創建。 自從比特幣 2009 問世以來，人們已經在多個不同區塊鏈上開發了數千種加密貨幣。

## 甚麼是以太(ETH)？ {#what-is-ether}

**以太幣 (ETH)** 為一種加密貨幣，在以太坊網路上有諸多用途。 基本上，它是唯一可被接受的交易費支付形式，且在[合併](/roadmap/merge)之後，在主網上驗證和提出區塊會需要以太幣。 以太幣還可以作為[去中心化金融](/defi)借貸市場中的主要抵押物，非同質化代幣市場上的計帳單位，或作為提供服務或銷售真正的商品而獲得的付款，還有更多用途。

透過以太坊，開發者可以建立[**去中心化應用程式 (dapp)**](/developers/docs/dapps)，而所有去中心化應用程式都共用同一算力池。 此共享算力池是有限的，因此以太坊需要一種機制來決定由誰使用它。 不然，某個去中心化應用程式可能會意外或惡意佔用全部網路資源，令其他人無法使用。

以太幣加密貨幣支援以太坊算力的定價機制。 當使用者想進行交易時，他們必須支付以太幣，使其交易在區塊鏈上獲得認可。 此等使用成本亦稱為[燃料費](/developers/docs/gas/)，而燃料費取決於執行交易所需的算力及當時整個網路對於算力的需求。

因此，即使惡意去中心化應用程式提交一個無窮迴圈，交易將最終會用盡以太幣並終止，讓網路能回復正常。

人們[經常將以太坊與以太幣](https://www.reuters.com/article/us-crypto-currencies-lending-insight-idUSKBN25M0GP#:~:text=price%20of%20ethereum)[](https://abcnews.go.com/Business/bitcoin-slumps-week-low-amid-renewed-worries-chinese/story?id=78399845#:~:text=cryptocurrencies%20including%20ethereum)[混為一談](https://www.cnn.com/2021/03/14/tech/nft-art-buying/index.html#:~:text=price%20of%20ethereum) — 當提到「以太坊價格」時，他們指的是以太幣的市價。

## 鑄造以太幣 {#minting-ether}

鑄造是指在以太坊帳本創建新以太幣的流程。 底層以太坊協議創建新以太幣，並且使用者無法創建以太幣。

鑄造以太幣，是用於獎勵提出的每個區塊，並在每個時期的檢查點上獎勵與達成共識相關的其他驗證者活動。 發行的以太幣總量取決於驗證者的數量以及他們質押的以太幣數量。 理想情況下，即所有驗證者都是誠實的且一直上線，總發行量會在驗證者之間平均分佈。但事實上它會因驗證者表現而有差異。 大約總發行量的 1/8 分配給區塊提交者，剩下的則分給其他驗證者。 區塊提交者也會收到交易費中的小費和最大可提取價值相關的收入，但這些來自循環中的以太幣，並不是新發行的。

## 銷毀以太幣 {#burning-ether}

如同區塊獎勵過程中會創建新的以太幣一樣，以太幣也可以透過稱為「燃燒」的流程銷毀。 以太幣銷毀後，將從流通中永久移除。

以太坊上的每筆交易中都有以太幣銷毀。 當使用者為交易支付費用時，透過網路設定的基本燃料費用會根據交易需求銷毀。 它與不同的區塊大小以及最大燃料費用結合起來，簡化了以太坊上的交易費的估算。 當網路需求較高時，[區塊](https://etherscan.io/block/12965263)可以銷毀的以太幣數量比鑄造數量更大，有效抵銷以太幣的發行。

銷毀基本費用會束縛區塊產生者操縱交易的能力。 舉例來說，若區塊產生者收到基本費用，他們可以免費添加自己的交易，並提高其他人的基本費用。 或者，他們可以在鏈外將基本費用退還給某些使用者，造成交易費市場更加不透明且複雜。

## 以太幣面額 {#denominations}

由於以太坊上許多交易的價值很小，以太幣也就有了各種不同的面額，可做為較小的記帳單位。 其中，Wei 和 gwei 尤為重要。

Wei 為以太幣的最小面額，因而，許多技術實作，例如[以太坊黃皮書](https://ethereum.github.io/yellowpaper/paper.pdf)等將在所有計算中以 Wei 為單位。

Gwei 是 giga-wei 的簡稱，常用來描述以太坊上的燃料費用。

| 面額   | 用以太幣表示的價值        | 常見用途    |
| ---- | ---------------- | ------- |
| Wei  | 10<sup>-18</sup> | 技術實作    |
| Gwei | 10<sup>-9</sup>  | 人類可讀燃料費 |

## 傳送以太幣 {#transferring-ether}

以太坊上的每筆交易都有一個 `value` 欄位，指定要從發送者地址傳送到接收者地址的以太幣數量，面額為 wei。

當接收者地址為[智慧型合約](/developers/docs/smart-contracts/)時，在智慧型合約執行其程式碼後，傳送之以太幣可用於支付燃料費用。

[更多交易相關資訊](/developers/docs/transactions/)

## 查詢以太幣 {#querying-ether}

使用者能透過檢視帳戶的 `balance` 欄位來查詢任何[帳戶](/developers/docs/accounts/)的以太幣餘額，該欄位顯示面額為 wei 的以太幣持有量。

[Etherscan](https://etherscan.io) 為一種人氣工具，可透過網路應用程式檢視地址餘額。 例如，[此 Etherscan 頁面](https://etherscan.io/address/0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae)顯示以太坊基金會的餘額。 也可使用錢包或者透過直接向節點發送請求查詢帳戶餘額。

## 衍生閱讀 {#further-reading}

- [定義以太幣與以太坊](https://www.cmegroup.com/education/courses/introduction-to-ether/defining-ether-and-ethereum.html) – _CME Group_
- [以太坊白皮書](/whitepaper/)：以太坊初始提案。 該文件包含對以太幣的描述及創建以太幣的動機。
- [Gwei 計算機](https://www.alchemy.com/gwei-calculator)：使用此 Gwei 計算機輕鬆轉換 wei、gwei 和以太幣。 只需輸入任意數量的 wei、gwei 或以太幣即可自動計算轉換後的數值。

_認識社區或社團資源能幫助大家學習更多? 歡迎自由編輯或添加於本頁!!_
