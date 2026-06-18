---
title: "挖礦演算法"
description: "深入探討以太坊挖礦所使用的演算法。"
lang: zh-tw
---

<Alert variant="update">
<AlertEmoji text=":wave:"/>
<AlertContent>
<AlertDescription>
工作量證明 (PoW) 不再是以太坊的底層共識機制，這意味著挖礦已經關閉。取而代之的是，以太坊由質押 ETH 的驗證者來保護。你今天就可以開始質押你的 ETH。了解更多關於<a href='/roadmap/merge/'>合併</a>、<a href='/developers/docs/consensus-mechanisms/pos/'>權益證明 (PoS)</a> 和<a href='/staking/'>質押</a>的資訊。此頁面僅供歷史參考。
</AlertDescription>
</AlertContent>
</Alert>

以太坊挖礦曾使用一種名為 Ethash 的演算法。該演算法的基本概念是，礦工嘗試使用暴力運算來尋找一個隨機數輸入，使得產生的雜湊值小於由計算出的難度所決定的閾值。這個難度等級可以動態調整，讓區塊的產生能以固定的時間間隔進行。

## 先決條件 {#prerequisites}

為了更了解此頁面，我們建議你先閱讀[工作量證明 (PoW) 共識](/developers/docs/consensus-mechanisms/pow)和[挖礦](/developers/docs/consensus-mechanisms/pow/mining)。

## Dagger Hashimoto {#dagger-hashimoto}

Dagger Hashimoto 是以太坊挖礦的早期研究演算法，後來被 Ethash 取代。它是兩種不同演算法的結合：Dagger 和 Hashimoto。它僅作為研究實作，並在以太坊主網上線時被 Ethash 取代。

[Dagger](http://www.hashcash.org/papers/dagger.html) 涉及產生一個[有向無環圖 (DAG)](https://en.wikipedia.org/wiki/Directed_acyclic_graph)，並將其隨機切片一起進行雜湊運算。其核心原則是，每個隨機數只需要龐大資料樹的一小部分。為每個隨機數重新計算子樹對挖礦來說成本過高（因此需要儲存該樹），但對於單一隨機數的驗證來說是可以接受的。Dagger 被設計為現有演算法（如 Scrypt）的替代方案，這些演算法具有記憶體依賴性 (memory-hard)，但當其記憶體依賴性增加到真正安全的等級時，卻難以驗證。然而，Dagger 容易受到共享記憶體硬體加速的攻擊，因此被放棄並轉向其他研究方向。

[Hashimoto](http://diyhpl.us/%7Ebryan/papers2/bitcoin/meh/hashimoto.pdf) 是一種透過 I/O 限制（即記憶體讀取是挖礦過程中的限制因素）來增加 ASIC 抗性的演算法。其理論是 RAM 比運算資源更容易取得；數十億美元的研究已經探討了針對不同使用案例最佳化 RAM，這些案例通常涉及近乎隨機的存取模式（因此稱為「隨機存取記憶體」）。因此，現有的 RAM 可能相當接近評估該演算法的最佳狀態。Hashimoto 使用區塊鏈作為資料來源，同時滿足上述的 (1) 和 (3)。

Dagger-Hashimoto 使用了 Dagger 和 Hashimoto 演算法的修訂版本。Dagger Hashimoto 和 Hashimoto 之間的差異在於，Dagger Hashimoto 不使用區塊鏈作為資料來源，而是使用自訂產生的資料集，該資料集每 N 個區塊會根據區塊資料進行更新。該資料集是使用 Dagger 演算法產生的，允許為輕客戶端驗證演算法有效率地計算特定於每個隨機數的子集。Dagger Hashimoto 和 Dagger 之間的差異在於，與原始 Dagger 不同，用於查詢區塊的資料集是半永久性的，僅在偶爾的間隔（例如每週一次）更新。這意味著產生資料集所花費的精力接近於零，因此 Sergio Lerner 關於共享記憶體加速的論點變得微不足道。

更多關於 [Dagger-Hashimoto](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto) 的資訊。

## Ethash {#ethash}

Ethash 是在現已棄用的工作量證明 (PoW) 架構下，實際用於真實以太坊主網的挖礦演算法。Ethash 實際上是在演算法進行重大更新後，賦予特定版本 Dagger-Hashimoto 的新名稱，同時仍繼承了其前身的基本原則。以太坊主網只使用過 Ethash——Dagger Hashimoto 是挖礦演算法的研發版本，在以太坊主網開始挖礦之前就已被取代。

[更多關於 Ethash 的資訊](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash)。

## 延伸閱讀 {#further-reading}

_知道有什麼社群資源對你有幫助嗎？編輯此頁面並加入它！_