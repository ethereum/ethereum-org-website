---
title: 沃克爾樹
description: 沃克爾樹的高階描述，以及它們將如何用於升級以太坊
lang: zh-tw
summaryPoints:
  - 了解什麼是沃克爾樹
  - 了解為什麼沃克爾樹對以太坊來說是一項有用的升級
---

沃克爾樹（Verkle trees，由「向量承諾 (Vector commitment)」和「默克爾樹 (Merkle Trees)」組合而成的混成詞）是一種資料結構，可用於升級[以太坊](/)節點，使其能夠停止儲存大量狀態資料，同時又不會失去驗證區塊的能力。

## 無狀態性 {#statelessness}

沃克爾樹是邁向無狀態以太坊用戶端的重要一步。無狀態用戶端是指不需要儲存整個狀態資料庫即可驗證傳入區塊的用戶端。無狀態用戶端不使用其本地的以太坊狀態副本來驗證區塊，而是使用隨區塊到達的狀態資料「見證」。見證是執行特定一組交易所需之各個狀態資料片段的集合，以及證明該見證確實是完整資料一部分的密碼學證明。見證被用來_取代_狀態資料庫。為了讓這個機制運作，見證必須非常小，以便它們能夠及時在網路上安全地廣播，讓驗證者在 12 秒的時槽內處理它們。目前的狀態資料結構並不適合，因為見證太大了。沃克爾樹透過實現小型見證解決了這個問題，消除了無狀態用戶端的主要障礙之一。

<ExpandableCard title="為什麼我們需要無狀態客戶端？" eventCategory="/roadmap/verkle-trees" eventName="clicked why do we want stateless clients?">

以太坊用戶端目前使用一種稱為帕特里夏默克爾樹 (Patricia Merkle Trie) 的資料結構來儲存其狀態資料。有關個別帳戶的資訊儲存為樹上的葉節點，並且成對的葉節點會被重複進行雜湊處理，直到只剩下一個雜湊值。這最後的雜湊值被稱為「根 (root)」。為了驗證區塊，以太坊用戶端會執行區塊中的所有交易並更新其本地狀態樹。如果本地樹的根與區塊提案者提供的根相同，則該區塊被視為有效，因為區塊提案者和驗證節點所做的計算如有任何差異，都會導致根雜湊值完全不同。這個問題在於，驗證區塊鏈需要每個用戶端儲存頂端區塊和幾個歷史區塊的整個狀態樹（Geth 的預設值是保留頂端區塊之後 128 個區塊的狀態資料）。這需要用戶端擁有大量的磁碟空間，這是在廉價、低功耗硬體上執行全節點的障礙。解決這個問題的方法是將狀態樹更新為更有效率的結構（沃克爾樹），該結構可以使用資料的小型「見證」進行總結，並可共用該見證以取代完整的狀態資料。將狀態資料重新格式化為沃克爾樹是邁向無狀態用戶端的墊腳石。

</ExpandableCard>

## 什麼是見證，為什麼我們需要它們？ {#what-is-a-witness}

驗證區塊意味著重新執行區塊中包含的交易，將變更套用到以太坊的狀態樹，並計算新的根雜湊值。經過驗證的區塊是指其計算出的狀態根雜湊值與區塊提供的雜湊值相同的區塊（因為這意味著區塊提案者確實執行了他們聲稱的計算）。在現今的以太坊用戶端中，更新狀態需要存取整個狀態樹，這是一個必須儲存在本地的大型資料結構。見證僅包含執行區塊中交易所需的狀態資料片段。然後，驗證者只能使用這些片段來驗證區塊提案者是否已執行區塊交易並正確更新了狀態。然而，這意味著見證需要在以太坊網路上的對等節點之間快速傳輸，以便每個節點在 12 秒的時槽內安全地接收和處理。如果見證太大，某些節點可能需要太長時間才能下載它並跟上鏈的進度。這是一種中心化的力量，因為這意味著只有擁有快速網際網路連線的節點才能參與驗證區塊。有了沃克爾樹，就不需要將狀態儲存在硬碟上；驗證區塊所需的_一切_都包含在區塊本身中。不幸的是，從默克爾樹產生的見證太大，無法支援無狀態用戶端。

## 為什麼沃克爾樹能實現更小的見證？ {#why-do-verkle-trees-enable-smaller-witnesses}

默克爾樹的結構使得見證的大小非常大——大到無法在 12 秒的時槽內安全地在對等節點之間廣播。這是因為見證是一條將保存在葉節點中的資料連接到根雜湊值的路徑。為了驗證資料，不僅需要擁有連接每個葉節點到根的所有中間雜湊值，還需要所有「兄弟」節點。證明中的每個節點都有一個兄弟節點，它與該兄弟節點一起進行雜湊處理，以在樹上建立下一個雜湊值。這是大量的資料。沃克爾樹透過縮短樹的葉節點與其根之間的距離，並消除了提供兄弟節點以驗證根雜湊值的需求，從而減少了見證的大小。透過使用強大的多項式承諾方案取代雜湊式向量承諾，將獲得更高的空間效率。多項式承諾允許見證具有固定大小，無論它證明了多少個葉節點。

在多項式承諾方案下，見證具有可管理的大小，可以輕鬆地在點對點網路上傳輸。這允許用戶端以最少的資料量驗證每個區塊中的狀態變更。

<ExpandableCard title="沃克爾樹究竟能將見證大小減少多少？" eventCategory="/roadmap/verkle-trees" eventName="clicked exactly how much can Verkle trees reduce witness size?">

見證的大小會根據其包含的葉節點數量而有所不同。假設見證涵蓋 1000 個葉節點，默克爾樹的見證大約為 3.5MB（假設樹有 7 層）。沃克爾樹中相同資料的見證（假設樹有 4 層）大約為 150 kB——**縮小了約 23 倍**。見證大小的縮減將使無狀態用戶端見證小到可以接受的程度。多項式見證的大小為 0.128 - 1 kB，具體取決於所使用的特定多項式承諾。

</ExpandableCard>

## 沃克爾樹的結構是什麼？ {#what-is-the-structure-of-a-verkle-tree}

沃克爾樹是 `(key,value)` 鍵值對，其中鍵是由 31 位元組的_主幹 (stem)_ 和單一位元組的_後綴 (suffix)_ 組成的 32 位元組元素。這些鍵被組織成_擴展 (extension)_ 節點和_內部 (inner)_ 節點。擴展節點代表具有不同後綴的 256 個子節點的單一主幹。內部節點也有 256 個子節點，但它們可以是其他擴展節點。沃克爾樹和默克爾樹結構之間的主要區別在於沃克爾樹要平坦得多，這意味著連接葉節點到根的中間節點更少，因此產生證明所需的資料也更少。

![Diagram of a Verkle tree data structure](./verkle.png)

[閱讀更多關於沃克爾樹結構的資訊](https://blog.ethereum.org/2021/12/02/verkle-tree-structure)

## 目前進度 {#current-progress}

沃克爾樹測試網已經啟動並運行，但用戶端仍有大量未完成的更新需要進行以支援沃克爾樹。您可以透過將合約部署到測試網或執行測試網用戶端來幫助加快進度。

[觀看 Guillaume Ballet 解釋 Condrieu 沃克爾測試網](https://www.youtube.com/watch?v=cPLHFBeC0Vg)（請注意，Condrieu 測試網是工作量證明 (PoW)，現在已被 Verkle Gen Devnet 6 測試網取代）。

## 進一步閱讀 {#further-reading}

- [用於無狀態性的沃克爾樹](https://verkle.info/)
- [Dankrad Feist 在 PEEPanEIP 上解釋沃克爾樹](https://www.youtube.com/watch?v=RGJOQHzg3UQ)
- [給我們其他人的沃克爾樹](https://web.archive.org/web/20250124132255/https://research.2077.xyz/verkle-trees)
- [沃克爾證明剖析](https://ihagopian.com/posts/anatomy-of-a-verkle-proof)
- [Guillaume Ballet 在 ETHGlobal 解釋沃克爾樹](https://www.youtube.com/watch?v=f7bEtX3Z57o)
- [Guillaume Ballet 在 Devcon 6 上的演講：「沃克爾樹如何讓以太坊變得精簡強悍」](https://www.youtube.com/watch?v=Q7rStTKwuYs)
- [Piper Merriam 在 ETHDenver 2020 談論無狀態用戶端](https://www.youtube.com/watch?v=0yiZJNciIJ4)
- [Dankrad Feist 在 Zero Knowledge podcast 上解釋沃克爾樹與無狀態性](https://zeroknowledge.fm/podcast/202/)
- [維塔利克·布特林談論沃克爾樹](https://vitalik.eth.limo/general/2021/06/18/verkle.html)
- [Dankrad Feist 談論沃克爾樹](https://dankradfeist.de/ethereum/2021/06/18/verkle-trie-for-eth1.html)
- [沃克爾樹 EIP 文件](https://notes.ethereum.org/@vbuterin/verkle_tree_eip#Illustration)