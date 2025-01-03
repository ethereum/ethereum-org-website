---
title: 信標鏈（Beacon Chain）
description: 瞭解信標鍊 - 將權益證明引入以太坊的升級。
lang: zh-tw
template: upgrade
image: /images/upgrades/core.png
alt:
summaryPoint1: 信標鏈將權益證明引入以太坊生態系統。
summaryPoint2: 信標鏈於 2022 年 9 月與原先的以太坊工作量證明鏈合併。
summaryPoint3: 信標鏈引入共識邏輯和區塊廣播協定，現在可保護以太坊安全。
---

<UpgradeStatus isShipped dateKey="page-upgrades:page-upgrades-beacon-date">
  信標鏈於 2020 年 12 月 1 日發佈，並於 2022 年 9 月 15 日透過合併正式將權益證明確定為以太坊的共識機制。
</UpgradeStatus>

## 什麼是信標鏈？ {#what-is-the-beacon-chain}

信標鍊是 2020 年推出的原始權益證明區塊鏈的名稱。 信標鏈的作用是在以太坊主網上啟用權益證明共識邏輯之前，確保它健全且可永續存在。 因此，它與原先的工作量證明以太坊一起運行。 信標鏈是「空」區塊鏈，但在以太坊上，要從工作量證明過渡到權益證明，需要指示信標鏈接受來自執行用戶端的交易資料，將它們打包進區塊，並使用基於權益證明的共識機制，將它們整合成一條區塊鏈。 與此同時，原始的以太坊用戶端關閉挖礦、區塊廣播和共識邏輯，將它們全部交給信標鏈。 這個事件稱為[合併](/roadmap/merge/)。 合併後，即不再有兩條區塊鏈。 相反，只有一個權益證明以太坊，每個節點現在需要兩個不同的用戶端。 信標鏈目前是共識層，是處理區塊廣播和共識邏輯的共識用戶端對等網路，而原始用戶端則形成執行層，負責廣播和執行交易，以及管理以太坊狀態。 這兩個層可以用引擎應用程式介面相互通訊。

## 信標鏈可以做什麼？ {#what-does-the-beacon-chain-do}

信標鏈是帳戶帳本的名稱，在以太坊[質押者](/staking/)開始驗證真正的以太坊區塊前，信標鏈會指揮並協調這些質押者。 但它並不處理交易或智慧型合約互動，因為這些事是在執行層完成的。 信標鏈負責區塊和證明處理、執行分叉選擇演算法、管理獎勵和懲罰等事務。 請參閱[節點架構頁面](/developers/docs/nodes-and-clients/node-architecture/#node-comparison)瞭解更多內容。

## 信標鏈的影響 {#beacon-chain-features}

### 質押簡介 {#introducing-staking}

信標鏈將[權益證明](/developers/docs/consensus-mechanisms/pos/)引入以太坊。 這可以保證以太坊的安全，驗證者可以在此過程中賺取更多以太幣。 實際上，你需要使用質押以太幣來啟用驗證者軟體。 身為質押者，你將執行在鏈中建立及驗證新區塊的軟體。

質押的目的與[挖礦](/developers/docs/consensus-mechanisms/pow/mining/)相似，但在很多方面有所差異。 挖礦需要大量的前期支出，包括強大的硬體和高能耗，從而產生規模經濟並促進中心化。 挖礦也不要求將任何資產鎖定以作為抵押品，這限制了協定在攻擊發生後懲罰作惡者的能力。

相較於工作量證明，過渡到權益證明後，以太坊的安全性和去中心化程度大幅提升。 參與網路的人越多，去中心化程度和安全性越高，抵禦攻擊的能力也越強。

使用權益證明作為共識機制是[我們現在擁有的安全、環保、可擴容的以太坊](/roadmap/vision/)的基石。

<InfoBanner emoji=":money_bag:">
  若有興趣成為驗證者或幫助保障以太坊安全，請<a href="/staking/">瞭解有關質押的更多資訊</a>。
</InfoBanner>

### 針對分片進行設定 {#setting-up-for-sharding}

自信標鏈與原先的以太坊主網合併以來，以太坊社群便開始尋找網路擴容方案。

權益證明的優點是，在任何時間都擁有所有經核准區塊產生者的註冊表，每個人都各自質押以太幣。 此註冊表奠定了分而治之的基礎，同時也可靠地劃分了具體的網路責任。

這種責任與採用工作量證明時的責任有很大的不同。採用工作量證明時，礦工對網路沒有義務，可以隨時停止挖礦並永久關閉其節點軟體，而不需承擔後果。 此外，也沒有已知區塊提交者的註冊表，並且沒有可靠的方法來安全地劃分網路責任。

[更多分片相關更多資訊](/roadmap/danksharding/)

## 不同升級之間的關聯 {#relationship-between-upgrades}

所有以太坊升級都存在某種程度的關聯。 所以，我們來回顧一下信標鏈會如何影響其他升級。

### 信標鏈和合併 {#merge-and-beacon-chain}

起初，信標鏈獨立於以太坊主網存在，但兩者已於 2022 年合併。

<ButtonLink href="/roadmap/merge/">
  合併
</ButtonLink>

### 分片與信標鏈 {#shards-and-beacon-chain}

僅當採用權益證明共識機制時，分片才能安全地進入以太坊生態系統。 已與主網「合併」的信標鏈引入了質押，為未來進一步擴展以太坊所需的分片機制鋪平道路。

<ButtonLink href="/roadmap/danksharding/">
  分片鏈
</ButtonLink>

## 衍生閱讀

- [更多以太坊未來升級相關資訊](/roadmap/vision)
- [更多節點架構相關資訊](/developers/docs/nodes-and-clients/node-architecture)
- [關於權益證明的更多資訊](/developers/docs/consensus-mechanisms/pos)
