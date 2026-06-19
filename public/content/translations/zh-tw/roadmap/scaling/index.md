---
title: 擴容以太坊
description: 匯總將交易在鏈下打包在一起，從而降低使用者的成本。然而，目前匯總使用資料的方式過於昂貴，限制了交易成本的降低幅度。原始 Danksharding 解決了這個問題。
lang: zh-tw
image: /images/roadmap/roadmap-transactions.png
alt: "以太坊路線圖"
template: roadmap
---

以太坊使用[第二層 (L2)](/layer-2/#rollups)（也稱為匯總）進行擴容，它將交易打包在一起並將輸出發送到以太坊。儘管匯總的成本比以太坊主網低多達八倍，但仍有可能進一步優化匯總以降低終端使用者的成本。匯總還依賴一些中心化元件，開發人員可以在匯總成熟時將其移除。

<Alert variant="update">
<AlertContent>
<AlertTitle className="mb-4">
  交易成本
</AlertTitle>
  <ul style={{ marginBottom: 0 }}>
    <li>現今的匯總比以太坊第一層 (L1) 便宜約 <strong>5-20 倍</strong></li>
    <li>零知識匯總 (ZK-rollup) 很快將使費用降低約 <strong>40-100 倍</strong></li>
    <li>即將到來的以太坊變更將提供額外約 <strong>100-1000 倍</strong>的擴容</li>
    <li style={{ marginBottom: 0 }}>使用者將受惠於<strong>低於 0.001 美元</strong>的交易成本</strong>
  </strong>
</AlertContent>
</Alert>

## 降低資料成本 {#making-data-cheaper}

匯總收集大量交易，執行它們並將結果提交給以太坊。這會產生大量需要公開可用的資料，以便任何人都可以自行執行交易並驗證匯總營運商是否誠實。如果有人發現差異，他們可以提出挑戰。

### 原始 Danksharding {#proto-danksharding}

過去，匯總資料一直永久儲存在以太坊上，這非常昂貴。使用者在匯總上支付的交易成本中，超過 90% 是由於這種資料儲存造成的。為了降低交易成本，我們可以將資料移至新的暫時性「資料塊」儲存中。資料塊比較便宜，因為它們不是永久性的；一旦不再需要，它們就會從以太坊中刪除。長期儲存匯總資料成為需要它的人的責任，例如匯總營運商、交易所、索引服務等。將資料塊交易新增至以太坊是稱為「原始 Danksharding」升級的一部分。

透過原始 Danksharding，可以將許多資料塊新增至以太坊區塊中。這使得以太坊的吞吐量能夠再次大幅提升（超過 100 倍），並大幅降低交易成本。

### 丹克分片 {#danksharding}

擴展資料塊資料的第二階段很複雜，因為它需要新的方法來檢查匯總資料在網路上是否可用，並且依賴[驗證者](/glossary/#validator)分離其[區塊](/glossary/#block)建構和區塊提案的職責。它還需要一種方法來透過密碼學證明驗證者已經驗證了資料塊資料的一小部分。

這第二步被稱為[「丹克分片」](/roadmap/danksharding/)。實作工作仍在繼續，並在先決條件上取得了進展，例如[分離區塊建構與區塊提案](/roadmap/pbs)，以及新的網路設計，使網路能夠透過每次隨機抽樣幾千位元組來有效確認資料可用性，這被稱為[資料可用性抽樣 (DAS)](/developers/docs/data-availability)。

<ButtonLink variant="outline-color" href="/roadmap/danksharding/">更多關於丹克分片的資訊</ButtonLink>

## 去中心化匯總 {#decentralizing-rollups}

[匯總](/layer-2)已經在為以太坊擴容。一個[豐富的匯總專案生態系統](https://l2beat.com/scaling/tvs)正讓使用者能夠快速且廉價地進行交易，並提供一系列的安全保證。然而，匯總在初始階段使用了中心化的定序器（在將交易提交給以太坊之前，負責所有交易處理和聚合的電腦）。這容易受到審查，因為定序器營運商可能會受到制裁、賄賂或以其他方式被妥協。同時，[匯總在驗證傳入資料的方式上各有不同](https://l2beat.com/scaling/summary)。最好的方法是由「證明者」提交[詐欺證明](/glossary/#fraud-proof)或有效性證明，但並非所有匯總都已達到這個階段。即使是那些確實使用有效性/詐欺證明的匯總，也只使用一小群已知的證明者。因此，擴容以太坊的下一個關鍵步驟是將執行定序器和證明者的責任分配給更多人。

<ButtonLink variant="outline-color" href="/developers/docs/scaling/">更多關於匯總的資訊</ButtonLink>

## 目前進展 {#current-progress}

原始 Danksharding 已於 2024 年 3 月作為 Cancun-Deneb (「Dencun」) 網路升級的一部分成功實作。自實作以來，匯總已開始利用資料塊儲存，從而降低了使用者的交易成本，並在資料塊中處理了數百萬筆交易。

完整丹克分片的工作仍在繼續，並在其先決條件（如提案者與建構者分離 (PBS) 和資料可用性抽樣 (DAS)）上取得了進展。去中心化匯總基礎設施是一個漸進的過程——有許多不同的匯總正在建構略有不同的系統，並將以不同的速度完全去中心化。

[更多關於 Dencun 網路升級及其影響的資訊](/roadmap/dencun/)

<QuizWidget quizKey="scaling" />