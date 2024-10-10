---
title: 聯合質押
description: 關於如何開始聯合以太幣質押的概覽
lang: zh-tw
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-pool.png
alt: 萊斯利犀牛在池中游泳
sidebarDepth: 2
summaryPoints:
  - 與其他人一起質押任意數量的以太幣並獲得酬勞
  - 跳過困難的部分，將驗證者運作委託給第三方
  - 在你自己的錢包中持有質押代幣
---

## 什麼是質押礦池 {#what-are-staking-pools}

質押礦池是一種協作方式，允許擁有少量以太幣的人能夠滿足 32 個以太幣此一條件，以啟動一組驗證者金鑰。 由於協定本身並不支援聯合質押這項功能，因此需要單獨建立解決方案來滿足此需求。

一些礦池使用智慧型合約運作，可以將資金存入合約，由合約以去信任的方式管理和追蹤你的質押品，並向你發放相應價值的代幣。 其他礦池可能不涉及智慧型合約，而是在鏈外調解。

## 為什麼要使用礦池進行質押 {#why-stake-with-a-pool}

除了我們在[質押簡介](/staking/)中描述的好處之外，聯合質押還具有許多獨特的好處。

<CardGrid>
  <Card title="參與門檻低" emoji="🐟" description="Not a whale? No problem. Most staking pools let you stake virtually any amount of ETH by joining forces with other stakers, unlike staking solo which requires 32 ETH." />
  <Card title="立即質押" emoji=":stopwatch:" description="Staking with a pool is as easy as a token swap. No need to worry about hardware setup and node maintenance. Pools allow you to deposit your ETH which enables node operators to run validators. Rewards are then distributed to contributors minus a fee for node operations." />
  <Card title="質押代幣" emoji=":droplet:" description="Many staking pools provide a token that represents a claim on your staked ETH and the rewards it generates. This allows you to make use of your staked ETH, e.g. as collateral in DeFi applications." />
</CardGrid>

<StakingComparison page="pools" />

## 需要考慮的事項 {#what-to-consider}

以太坊協定本身並不支援聯合質押或委託質押，但考量到想要質押的以太幣不足 32 個的使用者的需求，越來越多的解決方案已經開始建立。

每個質押池和工具，或者它們所用的智慧型合約，均由不同的團隊建立，因此有著各自的好處和風險。 質押池能夠將使用者的以太幣換成一種相應的以太幣質押代幣。 此代幣非常有用，因為它允許使用者將任意數量的以太幣兌換成等值的有收益代幣（反之亦然），流動性質押衍生品由質押在去中心化交易所的以太幣產生收益，即使實際的以太幣質押在共識層上。 這意味著可以在有收益的質押以太幣產品和「原始以太幣」之間快速、簡單地切換，且適用的以太幣數不僅限於 32 的倍數。

然而，這些質押以太幣代幣往往會產生類卡特爾的行為，大量質押的以太幣最終會受到少數中心化組織的控制，而不是分散到大量獨立個體中。 這為審查或價值提取創造了條件。 質押的黃金標準應始終是個人盡可能在自己的硬體上運行驗證者。

[更多關於質押代幣風險的資訊](https://notes.ethereum.org/@djrtwo/risks-of-lsd)。

以下使用屬性指標表示列出的質押礦池可能具有的顯著優勢或劣勢。 在你選擇要加入的礦池時，請將此章節的内容當作參考，瞭解這些屬性的具體定義。

<StakingConsiderations page="pools" />

## 探索質押礦池 {#explore-staking-pools}

有多種方案可以幫你完成設定。 請運用上述指標來幫助你了解以下工具。

<ProductDisclaimer />

<StakingProductsCardGrid category="pools" />

請注意，仔細選擇具有[用戶端多樣性](/developers/docs/nodes-and-clients/client-diversity/)的服務相當重要，因為它可以提高網路的安全性並降低你的風險。 如果某服務可以證明它會限制主流使用者端的使用，則稱它具有<em style={{ textTransform: "uppercase" }}>「執行層使用者端多樣性」</em>和<em style={{ textTransform: "uppercase" }}>「共識層使用者端多樣性」</em>。

關於我們遺漏的質押工具，你有要推薦的嗎？ 請參閱我們的[產品刊登政策](/contributing/adding-staking-products/)，如果合適，請提交以供審核。

## 常見問題 {#faq}

<ExpandableCard title="如何賺取獎勵">
一般來說，ERC-20 質押代幣會發放給質押者，代表他們質押的以太幣以及質押獎勵的價值。 請記住，不同的礦池將通過略有不同的方法向其使用者分配質押酬勞，但主旨是共通的。
</ExpandableCard>

<ExpandableCard title="什麼時候可以提取我的質押">
就是現在！ 上海/卡佩拉升級發生於 2023 年 4 月，可實現質押提款。 支持質押池的驗證者帳戶現在可以退出並將以太幣提取到他們指定的提款地址。 這樣你可以將質押的份額兌換為基礎以太幣。 有關此功能的具體操作方式，請與你的提供商確認。

或者，使用 ERC-20 質押代幣的質押池允許使用者在公開市場上交易該代幣，讓你可以出售質押位置，這相當於允許你「提款」，但無需實際從質押合約中移除以太幣。

<ButtonLink href="/staking/withdrawals/">更多質押提款相關資訊</ButtonLink>
</ExpandableCard>

<ExpandableCard title="這與我在交易所進行質押有什麼不同？">
這些聯合質押選項和中心化交易所之間有許多相似之處，例如能夠質押少量以太幣並將它們捆綁在一起以啟動驗證者。

與中心化交易所不同的是，許多其他聯合質押方案採用的是智慧型合約和/或質押代幣，通常是 ERC-20 代幣。這些代幣可以保存在你自己的錢包中，並能像任何其他代幣一樣正常買賣。 透過讓你控制自己的代幣，這為你提供了一層主權和安全性，但這並不代表你能夠直接控制在後台代表你執行證明的驗證者用戶端。

當涉及到支持它們的節點時。一些聯合質押方案比其他方案更去中心化。 為了加強網路的健康和去中心化程度，我們始終鼓勵質押者選擇這樣的聯合質押服務：無需許可且實現節點營運商去中心化。
</ExpandableCard>

## 延伸閱讀 {#further-reading}

- [以太坊質押目錄](https://www.staking.directory/) - _Eridian 和 Spacesider_
- [使用 Rocket Pool 進行質押 - 質押概覽](https://docs.rocketpool.net/guides/staking/overview.html) - _RocketPool 文件_
- [使用 Lido 質押以太坊](https://help.lido.fi/en/collections/2947324-staking-ethereum-with-lido) - _Lido 幫助文件_
