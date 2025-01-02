---
title: 沃克爾樹
description: 關於沃克爾樹及其將如何用於升級以太坊的簡要說明
lang: zh-tw
summaryPoints:
  - 瞭解沃克爾樹是什麼
  - 瞭解為什麼 Verkle 樹是以太坊的有用升級
---

# 沃克爾樹 {#verkle-trees}

沃克爾樹（「向量承諾」和「梅克爾樹」混合而成的詞）是一種資料結構，可用於升級以太坊節點，以便它們可以停止儲存大量狀態資料，同時保留驗證區塊的能力。

## 無狀態 {#statelessness}

沃克爾樹是實現無狀態以太坊用戶端的關鍵一步。 驗證下一批區塊時，無狀態用戶端無需儲存全部的狀態資料。 無狀態用戶端不使用自己的本地以太坊狀態備份來驗證區塊，而是使用「證據」來證明區塊狀態資料的真實性。 證據是執行一組特定交易所需的各種狀態資料的集合，以及證明證據確實是完整資料一部分的加密證明。 請使用證據_而非_狀態資料庫。 要做到這一點，證據必須非常短，這樣才能安全地廣播到網路上，以便驗證者能在 12 秒的時隙內及時處理。 目前的狀態資料結構還不是很合用，因為證據太大。 沃克爾樹透過啟用小證據，消除無狀態用戶端的主要障礙之一，從而解決這個問題。

<ExpandableCard title="為什麼需要無狀態用戶端？" eventCategory="/roadmap/verkle-trees" eventName="clicked why do we want stateless clients?">

以太坊用戶端目前使用帕特里夏梅克爾樹樹狀資料結構，儲存其自身的狀態資料。 有關個人帳戶的資訊作為葉子儲存在樹上，向一對對葉子重複進行雜湊運算，直到只剩下一個雜湊值。 串接在最末尾的雜湊值被稱為「根」。 為了驗證區塊，以太坊用戶端會執行區塊中的所有交易並更新其本地狀態樹。 若本地樹的「根」與區塊提交者提出的「根」完全相同，區塊即被視為有效。因為如果區塊提交者和驗證節點執行的計算中出現任何差異，都會導致根雜湊值完全不同。 這樣做的問題是，驗證區塊鏈需要每個用戶端儲存頭塊和多個歷史區塊的整個狀態樹（Geth 中預設保留頭塊後面 128 個區塊的狀態資料）。 因此用戶端需要存取大量磁碟空間，這是在廉價、低功耗硬體上運行完整節點的障礙。 解決這個問題的辦法是將狀態樹更新為更有效的結構（沃克爾樹），這種結構可以使用短小的「證據」對資料進行彙總再分享，而無需保存完整的狀態資料。 將狀態資料重新格式化為梅克爾樹，是邁向無狀態用戶端的第一步。

</ExpandableCard>

## 什麼是證據以及我們為什麼需要證據？ {#what-is-a-witness}

驗證區塊表示重新執行區塊中的交易，將變更套用到以太坊狀態樹，並計算新的根雜湊值。 區塊通過驗證是指其計算出的狀態根雜湊值與區塊中提供的值相同（因為這表示區塊提交者確實執行了他們所說的計算）。 在現今的以太坊用戶端中，更新狀態需要存取整個狀態樹，狀態樹是必須儲存在本地的大型資料結構。 證據中僅包含執行區塊中交易所需的狀態資料片段。 然後，驗證者只能使用這些片段來驗證區塊提交者是否已執行區塊交易並正確更新狀態。 然而，這意味著證據需要在以太坊網路上的對等點之間足夠快地傳輸，以便每個節點能夠在 12 秒的時隙內安全地接收和處理。 如果證據太大，有些節點可能會在下載以及與鏈同步上花費大量時間。 這是一種中心化的力量，因為這表示只有擁有高速網路連接的節點可以參與驗證區塊。 使用沃克爾樹時，無需將狀態儲存在硬碟上；驗證區塊所需的_全部_資訊都包含在區塊自身中。 遺憾的是，梅克爾樹產生的證據太大，無法支援無狀態用戶端。

## 為什麼沃克爾樹可以支援更小的證據？ {#why-do-verkle-trees-enable-smaller-witnesses}

Merkle 樹的結構導致證據非常大，以至於無法在 12 秒的時隙內在節點之間安全地廣播。 這是因為證據是將儲存在葉子中​​的資料關聯到根雜湊值的路徑。 為了驗證資料，不僅需要擁有將每個葉子連接到根的所有中間雜湊值，還需要擁有所有「兄弟」節點。 證明中的每個節點都有一個兄弟節點，它與該兄弟節點一起做雜湊運算，以建立樹中的下一個雜湊值。 牽涉的資料量十分龐大。 沃克爾樹縮短了樹的葉子與根之間的距離，並無需提供兄弟節點來驗證根雜湊值，因此縮減了證據的大小。 透過使用強大的多項式承諾方案而不是雜湊式向量承諾，可以獲得更高的空間效率。 多項式承諾允許證據保持固定大小，無論其證明的葉子數量如何。

在多項式承諾方案下，證據大小可管理，可以輕鬆地在對等網路上傳輸。 這使得用戶端只需極少資料即可驗證每個區塊中的狀態變更。

<ExpandableCard title="具體一點，沃克爾樹可以將證據大小縮減多少？" eventCategory="/roadmap/verkle-trees" eventName="clicked exactly how much can Verkle trees reduce witness size?">

證據大小各有差異，取決於其所含的葉子數量。 假設證據有 1000 片葉子，梅克爾樹的證據大約是 3.5MB（假設樹有 7 層）。 相同資料的證據在沃克爾（假設樹有 4 層）中大概是 150 kB - **縮減了大約 23 倍**。 證據大小的縮減將使無狀態用戶端證據小到可以接受。 多項式證據的大小一般在 0.128 - 1 kB 之間，取決於使用哪個特定多項式承諾。

</ExpandableCard>

## 沃克爾樹的結構為何？ {#what-is-the-structure-of-a-verkle-tree}

Verkle 樹是 `(key,value)` 對，其中鍵是 32 字節位元組要素，由 31 字節位元組的_主幹_和單一字節位元組的_後綴_組成。 這些鍵被整理到_擴展_節點和_內部_節點中。 擴展節點是單一的主幹，包含 256 個具有不同後綴的子節點。 內部節點也有 256 個子節點，但可以是其他擴展節點。 沃克爾樹和梅克爾樹結構的主要區別是，沃克爾樹更加扁平，表示將葉子連接到根的中間節點較少，因此產生證明時所需的資料更少。

![](./verkle.png)

[閱讀沃克爾樹結構的更多相關資訊](https://blog.ethereum.org/2021/12/02/verkle-tree-structure)

## 目前進度 {#current-progress}

沃克爾樹測試網已經啟動並運行，但用戶端仍需要進行大量更新以支援沃克爾樹。 將合約部署至測試網或是運行測試網用戶端有助加快進度。

[探索 Verkle Gen Devnet 6 測試網](https://verkle-gen-devnet-6.ethpandaops.io/)

[觀看 Guillaume Ballet 解釋 Condrieu Verkle 測試網](https://www.youtube.com/watch?v=cPLHFBeC0Vg)（請注意，Condrieu 為工作量證明測試網，目前已被 Verkle Gen Devnet 6 測試網取代）。

## 了解更多 {#further-reading}

- [無狀態沃克爾樹](https://verkle.info/)
- [Dankrad Feist 在 PEEPanEIP 上對沃克爾樹的說明](https://www.youtube.com/watch?v=RGJOQHzg3UQ)
- [Guillaume Ballet 在 ETHGlobal 上解釋沃克爾樹](https://www.youtube.com/watch?v=f7bEtX3Z57o)
- [「沃克爾樹如何讓以太坊變得更加精幹而簡約」Guillaume Ballet 在 Devcon 6 發表的演講](https://www.youtube.com/watch?v=Q7rStTKwuYs)
- [Piper Merriam 談 ETHDenver 2020 的無狀態用戶端](https://www.youtube.com/watch?v=0yiZJNciIJ4)
- [Dankrad Feist 在「零知識」播客上談沃克爾樹和無狀態性](https://zeroknowledge.fm/episode-202-stateless-ethereum-verkle-tries-with-dankrad-feist/)
- [Vitalik Buterin 談沃克爾樹](https://vitalik.eth.limo/general/2021/06/18/verkle.html)
- [Dankrad Feist 談沃克爾樹](https://dankradfeist.de/ethereum/2021/06/18/verkle-trie-for-eth1.html)
- [以太坊改進提案文件：沃克爾樹](https://notes.ethereum.org/@vbuterin/verkle_tree_eip#Illustration)
