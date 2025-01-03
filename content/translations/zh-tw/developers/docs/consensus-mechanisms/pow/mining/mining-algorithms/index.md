---
title: 挖礦算法
description: 以太坊挖礦演算法的詳細介紹。
lang: zh-tw
---

<InfoBanner emoji=":wave:">
工作量證明不再是以太坊共識機制的基礎，這意味著挖礦已完結。 取而代之的是，以太坊由抵押以太幣的驗證者來保障安全。 你能從現在開始質押ETH. 閱讀更多關於<a href='/roadmap/merge/'>合併</a>、<a href='/developers/docs/consensus-mechanisms/pos/'>權益證明</a>和<a href='/staking/'>質押</a>的資訊。 此頁面僅為滿足對歷史的興趣。
</InfoBanner>

以太坊挖礦使用過一種稱為 Ethash 的演算法。 這個演算法的基本思路是，礦工嘗試使用蠻力計算找到一個隨機數輸入，使得產生的雜湊值小於一個取決於計算難度的閾值。 此難度等級可以動態調整，從而允許定期產生區塊。

## 前置要求 {#prerequisites}

為了更好地理解本頁內容，我們推薦你先閱讀[工作量證明共識](/developers/docs/consensus-mechanisms/pow)和[挖礦](/developers/docs/consensus-mechanisms/pow/mining)。

## Dagger Hashimoto {#dagger-hashimoto}

Dagger Hashimoto 是以太坊挖礦的先導研究演算法，現已被 Ethash 取代。 它是兩種不同演算法：Dagger 和 Hashimoto 的融合。 它只是一個曾經的研究實作，並在以太坊主網啟動時被 Ethash 取代。

[Dagger](http://www.hashcash.org/papers/dagger.html) 需要產生一個[有向無環圖](https://en.wikipedia.org/wiki/Directed_acyclic_graph)，並將其隨機片段雜湊在一起。 其核心原理是，每個隨機數只需要一個較大總資料樹中的一小部分。 挖礦禁止為每個隨機數重新計算子樹，因此需要儲存樹；但若僅為驗證單個隨機數，則可以重新計算。 Dagger 的設計目的是替代諸如 Scrypt 這類已有的演算法，這類演算法是記憶體密集型的，但很難驗證其記憶體密集程度何時增至可信的安全水平。 然而，Dagger 容易受到共享記憶體硬體加速的影响，因此被放棄，转而采用了其他研究途径。

[Hashimoto](http://diyhpl.us/%7Ebryan/papers2/bitcoin/meh/hashimoto.pdf) 演算法透過實現輸入/輸出捆綁的特性（即，記憶體讀取是挖礦過程中的限制因素）來增加對專用積體電路的抗性。 理論上來說，隨機存取記憶體比計算能力更容易獲取；已有價值數十億美元的經費投入用於研究針對不同使用案例的隨機存取記憶體最佳化，這些案例通常涉及近隨機存取模式（即「隨機存取記憶體」）。 因此，現有的隨機存取記憶體在評價演算法的能力上更接近最優。 Hashimoto 使用區塊鏈作為資料來源，同時滿足上述第 (1) 和第 (3) 條。

Dagger-Hashimoto 是在 Dagger 和 Hashimoto 的基礎上改進而來的演算法版本。 Dagger Hashimoto 和 Hashimoto 的差別在於，Dagger Hashimoto 的資料來源並非是區塊鏈，而是自訂產生的資料集，並且該資料集每 N 個區塊基於區塊資料更新一次。 該資料集採用 Dagger 演算法產生，可為輕量用戶端的驗證演算法高效計算特定於每個隨機數的子集。 Dagger Hashimoto 演算法和 Dagger 演算法的差別在於，與原來的 Dagger 不同，用於查詢區塊的資料集只是暫時的，只會偶爾更新（例如每週更新一次）。 這意味著產生資料集的工作量接近於零，所以 Sergio Lerner 關於共享記憶體加速的論據變得微不足道。

有關 [Dagger-Hashimoto](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto) 的更多資訊。

## Ethash算法 {#ethash}

Ethash 是在現已棄用的工作量證明架構下，實際用於真正的以太坊主網的挖礦演算法。 Ethash 實際上是為 Dagger Hashimoto 演算法進行重要更新後的一個特定版本命名的新名稱，但它仍然繼承了其前身的基本原理。 以太坊主網僅使用過 Ethash，而 Dagger Hashimoto 只是挖礦演算法的研發版本，且在以太坊主網開始挖礦前就已被取代。

[有關 Ethash 的更多資訊](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash)。

## 衍生閱讀 {#further-reading}

_認識社區或社團資源能幫助大家學習更多? 歡迎自由編輯或添加於本頁!!_
