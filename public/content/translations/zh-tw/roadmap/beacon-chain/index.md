---
title: 信標鏈
description: 了解信標鏈——為以太坊引入權益證明 (PoS) 的升級。
lang: zh-tw
template: upgrade
image: /images/upgrades/core.png
alt: 
summaryPoints:
  - "信標鏈為以太坊生態系引入了權益證明 (PoS)。"
  - "它在 2022 年 9 月與原本的以太坊工作量證明 (PoW) 鏈合併。"
  - "信標鏈引入了共識邏輯與區塊傳播協定，現在負責保護以太坊的安全。"
---

<UpgradeStatus isShipped dateKey="page-upgrades:page-upgrades-beacon-date">
  信標鏈於 2020 年 12 月 1 日發布，並在 2022 年 9 月 15 日的合併升級中，正式將權益證明 (PoS) 確立為以太坊的共識機制。
</UpgradeStatus>

## 什麼是信標鏈？ {#what-is-the-beacon-chain}

信標鏈是 2020 年推出的原始權益證明 (PoS) 區塊鏈的名稱。它的建立是為了在[以太坊](/)主網啟用權益證明共識邏輯之前，確保其健全且可永續發展。因此，它與原本的工作量證明 (PoW) 以太坊並行運作。信標鏈原本是一條由「空」區塊組成的鏈，但在以太坊上關閉工作量證明並開啟權益證明，需要指示信標鏈接收來自執行用戶端的交易資料，將它們打包成區塊，然後使用基於權益證明的共識機制將它們組織成區塊鏈。同時，原本的以太坊用戶端關閉了它們的挖礦、區塊傳播和共識邏輯，將這一切交給信標鏈。這個事件被稱為[合併](/roadmap/merge/)。一旦合併發生，就不再有兩條區塊鏈。取而代之的是，只有一個權益證明以太坊，現在每個節點需要兩個不同的用戶端。信標鏈現在是共識層，這是一個由共識用戶端組成的點對點網路，負責處理區塊傳播和共識邏輯；而原本的用戶端則構成執行層，負責傳播和執行交易，並管理以太坊的狀態。這兩層可以使用 Engine API 相互通訊。

## 信標鏈的作用是什麼？ {#what-does-the-beacon-chain-do}

信標鏈是一個帳戶分類帳的名稱，在以太坊[質押者](/staking/)開始驗證真實的以太坊區塊之前，它負責引導和協調這些質押者的網路。不過，它不處理交易或處理智能合約互動，因為這些工作是在執行層完成的。
信標鏈負責處理區塊和證明、執行分叉選擇演算法，以及管理獎勵和懲罰等事務。
在我們的[節點架構頁面](/developers/docs/nodes-and-clients/node-architecture/#node-comparison)閱讀更多資訊。

## 信標鏈的影響 {#beacon-chain-features}

### 引入質押 {#introducing-staking}

信標鏈為以太坊引入了[權益證明](/developers/docs/consensus-mechanisms/pos/)。這保持了以太坊的安全，並在此過程中為驗證者賺取更多 ETH。實際上，質押涉及質押 ETH 以啟動驗證者軟體。作為質押者，你執行在鏈中建立和驗證新區塊的軟體。

質押的目的與過去的[挖礦](/developers/docs/consensus-mechanisms/pow/mining/)相似，但在許多方面有所不同。挖礦需要以強大硬體和能源消耗的形式進行大量的前期支出，導致規模經濟並促進了中心化。挖礦也沒有任何鎖定資產作為抵押品的要求，限制了協定在攻擊後懲罰惡意行為者的能力。

與工作量證明相比，過渡到權益證明使以太坊變得更加安全和去中心化。參與網路的人越多，它就越去中心化，也越能免受攻擊。


<Alert variant="update">
<AlertEmoji text=":money_bag:"/>
<AlertContent>
<AlertDescription>
  如果你有興趣成為驗證者並協助保護以太坊的安全，請[了解更多關於質押的資訊](/staking/)。
</AlertDescription>
</AlertContent>
</Alert>

### 為分片做準備 {#setting-up-for-sharding}

自從信標鏈與原本的以太坊主網合併後，以太坊社群開始著眼於擴展網路。

權益證明的優勢在於，在任何給定時間都有一個所有已核准區塊生產者的登錄檔，每個生產者都質押了 ETH。這個登錄檔為分而治之的能力奠定了基礎，能夠可靠地分配特定的網路責任。

這種責任與工作量證明形成對比，在工作量證明中，礦工對網路沒有義務，可以隨時停止挖礦並永久關閉他們的節點軟體，而不會產生任何後果。此外，也沒有已知區塊提議者的登錄檔，也沒有可靠的方法來安全地分配網路責任。

[更多關於分片的資訊](/roadmap/danksharding/)

## 升級之間的關係 {#relationship-between-upgrades}

以太坊的各項升級都在某種程度上相互關聯。因此，讓我們回顧一下信標鏈如何影響其他升級。

### 信標鏈與合併 {#merge-and-beacon-chain}

起初，信標鏈獨立於以太坊主網存在，但它們在 2022 年合併了。

<ButtonLink href="/roadmap/merge/">
  合併
</ButtonLink>

### 分片與信標鏈 {#shards-and-beacon-chain}

只有在具備權益證明共識機制的情況下，分片才能安全地進入以太坊生態系。信標鏈引入了質押，並與主網「合併」，為分片協助進一步擴展以太坊鋪平了道路。

<ButtonLink href="/roadmap/danksharding/">
  分片鏈
</ButtonLink>

## 延伸閱讀 {#further-reading}

- [更多關於節點架構的資訊](/developers/docs/nodes-and-clients/node-architecture)
- [更多關於權益證明的資訊](/developers/docs/consensus-mechanisms/pos)