---
title: 以太坊擴容
description: 卷軸可在鏈下批次處理交易，從而降低使用者的成本。 但現今卷軸使用資料的方式還是過於昂貴，限制了交易費用的下限。 Proto-Danksharding 可以解決這個問題。
lang: zh-tw
image: /images/roadmap/roadmap-transactions.png
alt: "以太坊開發藍圖"
template: roadmap
---

以太坊利用[二層網路](/layer-2/#rollups)（也稱「卷軸」）實現擴容，可批次處理交易並將輸出傳送至以太坊。 儘管成本已比以太坊主網低八倍，卷軸還有進一步最佳化的空間，進而幫助降低終端使用者的成本。 此外，卷軸還仰賴於一些中心化組件，隨著其不斷發展成熟，開發者可以移除這些組件。

<InfoBanner mb={8} title="交易成本">
  <ul style={{ marginBottom: 0 }}>
    <li>現今卷軸的成本比以太坊一層網路便宜<strong>大約 5 - 20 倍</strong></li>
    <li>零知識卷軸很快會讓費用降低<strong>大約 40-100 倍</strong></li>
    <li>以太坊即將變更，會帶來<strong>大約 100-1000 倍</strong>的擴容</li>
    <li style={{ marginBottom: 0 }}>使用者應該能夠從<strong>成本低於 $0.001</strong> 的交易中受益</li>
  </ul>
</InfoBanner>

## 降低資料使用費用 {#making-data-cheaper}

卷軸會集合大量交易，執行它們並將結果提交到以太坊。 這會產生大量需要公開的資料，以便所有人都可以自己執行交易並驗證卷軸營運者是否誠實。 若有人發現矛盾之處，可以提起質詢。

### Proto-Danksharding {#proto-danksharding}

以往卷軸資料會永久儲存在以太坊上，成本非常高昂。 使用者為卷軸支付的交易費用中，超過 90% 都是花在資料儲存上。 為了降低交易費用，我們可以將資料移至新的「二進位大型物件」臨時儲存區。 二進位大型物件更便宜，因為它們不是永久性的，一旦不再需要，就會從以太坊中刪除。 需要長期卷軸資料的人，例如卷軸營運商、交易所、索引服務等，得要自己負責儲存這些資料。 將二進位大型物件交易新增至以太坊是「Proto-Danksharding」升級的一部分。

透過 Proto-Danksharding，將多個二進位大型物件新增至以太坊區塊成為可能。 這將是以太坊吞吐量的又一次大幅（>100 倍）擴容和交易成本的縮減。

### Danksharding {#danksharding}

擴展二進位大型物件資料的第二階段很複雜，因為需要新的方法來檢查網路上可用的卷軸資料，並仰賴[驗證者](/glossary/#validator)將其[區塊](/glossary/#block)建置和區塊提交職責分開。 它還需要一種方法來以加密方式證明驗證者已驗證一小部分二進位大型物件資料。

這個第二步也稱作[「Danksharding」](/roadmap/danksharding/)， 全面實作**可能還需要數年時間**。 Danksharding 還需要仰賴其他的技術開發，例如[將區塊建置和區塊提出分開](/roadmap/pbs)，以及新的網路設計，使得網路能夠透過一次隨機採樣幾千字節來有效地確認資料可用（也稱作[資料可用性採樣 (DAS)](/developers/docs/data-availability)）。

<ButtonLink variant="outline-color" href="/roadmap/danksharding/">更多分片相關資訊</ButtonLink>

## 卷軸去中心化 {#decentralizing-rollups}

[卷軸](/layer-2)已在推動以太坊擴容。 憑藉[豐富的卷軸專案生態系統](https://l2beat.com/scaling/tvl)，使用者可以在有安全保證的狀況下快速實惠地完成交易。 然而，一直以來卷軸都是使用中心化排序者（先完成所有交易處理和匯總，再將結果提交至以太坊的電腦）啟動的。 這樣便容易受到審查，因為排序者營運商可能被制裁、賄賂或者做出其他讓步。 同時，[卷軸也會採取不同方式](https://l2beat.com)驗證傳入的資料。 最好的方法是讓「證明者」提交[詐欺證明](/glossary/#fraud-proof)或有效性證明，但並非所有卷軸都能做到這一點。 即使是確實使用有效性/欺詐證明的卷軸也只使用一小部分已知的證明者。 因此，以太坊擴容的下一個關鍵步驟就是將運行排序者和證明者的責任分配給更多人。

<ButtonLink variant="outline-color" href="/developers/docs/scaling/">更多卷軸相關資訊</ButtonLink>

## 目前進度 {#current-progress}

Proto-Danksharding 是這些開發藍圖上的第一個項目，將於 2024 年 3 月的 Cancun-Deneb（「坎昆」）網路升級中實作。 **完整的 Danksharding 可能還需要幾年的時間實作**，因為它要仰賴其他幾個需要先行完成的開發藍圖項目。 卷軸基礎設施的去中心化可能是一個漸進的過程，有許多不同的卷軸正在構建略有不同的系統，並將以不同的速率完全去中心化。

[更多坎昆網路升級相關資訊](/roadmap/dencun/)

<QuizWidget quizKey="scaling" />
