---
title: 聯合質押
description: 關於如何開始聯合以太幣質押的概覽
lang: zh-tw
template: staking
emoji: ":money_with_wings:"
image: ../../../../../assets/staking/leslie-pool.png
alt: 萊斯利犀牛在池中游泳
sidebarDepth: 2
summaryPoints:
  - 與其他人一起質押任意數量的以太幣並獲得酬勞
  - 跳過困難的部分，將驗證程式運作委託給第三方
  - 在你自己的錢包中持有流動性代幣
---

## 什麼是質押礦池 {#what-are-staking-pools}

質押礦池是一種協作方式，允許擁有少量以太幣的人能夠滿足 32 個以太幣這一條件，以激活一組驗證程式金鑰。 由於協定本身並不支援聯合質押這項功能，因此需要單獨建立解決方案來滿足此需求。

一些礦池使用智慧型合約運作，可以將資金存入合約，由合約以去信任的方式管理和追蹤你的質押品，並向你發放相應價值的代幣。 其他礦池可能不涉及智慧型合約，而是在鏈外調解。

## 為什麼要使用礦池進行質押 {#why-stake-with-a-pool}

除了我們在[質押簡介](/staking/)中描述的好處之外，聯合質押還具有許多獨特的好處。

<CardGrid>
  <Card title="參與門檻低" emoji="🐟">
    沒有大筆資產？ 沒關係。 大多數質押礦池允許你透過與其他質押者聯手來質押任意數量的以太幣，這與需要 32 個以太幣的單獨質押不同。
  </Card>
  <Card title="立即質押" emoji=":stopwatch:">
    使用礦池進行質押就像交換代幣一樣簡單。 你不需擔心硬體設定與節點維護。 礦池允許你存入以太幣，這使得節點營運商能夠執行驗證程式。 在減去節點操作的費用之後，剩餘的酬勞將分配給所有貢獻者。
  </Card>
  <Card title="流動性代幣" emoji=":droplet:">
    許多質押礦池會提供代幣，代表你在礦池中質押的以太幣及其產生的酬勞。 這使得你可以將質押中的以太幣妥善利用，例如，作為去中心化金融應用程式的抵押品。
  </Card>
</CardGrid>

<StakingComparison page="pools" />

## 需要考慮的事項 {#what-to-consider}

以太坊協定本身並不支援聯合質押或委託質押，但考量到想要質押的以太幣不足 32 個的使用者的需求，越來越多的解決方案已經開始建立。

它們所用的每個質押礦池和工具或智慧型合約，都是由不同團隊所建立的，有各自的優缺點。

以下使用屬性指標表示列出的質押礦池可能具有的顯著優勢或劣勢。 在你選擇要加入的礦池時，請將此章節的内容當作參考，瞭解這些屬性的具體定義。

<StakingConsiderations page="pools" />

## 探索質押礦池 {#explore-staking-pools}

有多種方案可以幫你完成設定。 請運用上述指標來幫助你了解以下工具。

<InfoBanner emoji="⚠️" isWarning>
請注意仔細選擇具有<a href="/developers/docs/nodes-and-clients/client-diversity/">用戶端多樣性</a>的服務，這相當重要，因為它可以提高網路的安全性和降低你的風險。 如果有證據顯示服務會限制主流用戶端使用，則可標記為<em style="text-transform: uppercase;">「多元化用戶端」</em>。
</InfoBanner>

<StakingProductsCardGrid category="pools" />

想推薦我們遺漏的質押工具嗎？ 請參閱我們的[產品刊登政策](/contributing/adding-staking-products/)，看看是否合適；如果合適，請提交以供審核。

## 常見問題 {#faq}

<ExpandableCard title="如何賺取獎勵">
一般來說，ERC-20 流動性代幣會發行給質押者，代表他們質押的以太幣的價值以及酬勞。 請記住，不同的礦池將通過略有不同的方法向其使用者分配質押酬勞，但主旨是共通的。
</ExpandableCard>

<ExpandableCard title="什麼時候可以提取我的質押">

目前，無法從以太坊驗證程式提取資金，這導致無法將你的流動性代幣實際兌換為在共識層鎖定的以太幣酬勞。

或者，使用 ERC-20 流動性代幣的礦池運行使用者在公開市場上交易該代幣，讓你可以出售質押位置，這相當於允許你「提現」，而無需實際從質押合約中移除以太幣。
</ExpandableCard>

<ExpandableCard title="這與我在交易所進行質押有什麼不同？">
這些聯合質押選項和中心化交易所之間有許多相似之處，例如能夠質押少量以太幣並將它們捆綁在一起以激活驗證程式。

與中心化交易所不同的是，許多其他集中式質押方案使用智慧型合約和/或流動性代幣，這些代幣通常是 ERC-20 代幣，可以保存在你自己的錢包中，并且像任何其他代幣一樣買賣。 透過讓你控制自己的代幣，這為你提供了一層主權和安全性，但這並不代表你能夠直接控制在后台代表你執行證明的驗證程式用戶端。

當涉及到支持它們的節點時。一些聯合質押方案比其他方案更去中心化。 為了加強網路的健康和去中心化程度，我們始終鼓勵質押者選擇這樣的聯合質押服務：無需許可且實現節點運營商去中心化。
</ExpandableCard>

## 延伸閱讀 {#further-reading}

- [使用 Rocket Pool 進行質押 - 質押概覽](https://docs.rocketpool.net/guides/staking/overview.html) - _RocketPool 文件_
- [使用 Lido 質押以太坊](https://help.lido.fi/en/collections/2947324-staking-ethereum-with-lido) - _Lido 幫助文件_
