---
title: "聯合質押"
description: "了解質押池"
lang: zh-tw
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-pool.png
alt: "犀牛 Leslie 在池中游泳。"
sidebarDepth: 2
summaryPoints:
  - 與他人合作，質押任意數量的 ETH 並賺取獎勵
  - 省去繁瑣步驟，將驗證者營運委託給第三方
  - 在自己的錢包中持有質押代幣
---

## 什麼是質押池？ {#what-are-staking-pools}

質押池是一種協作方式，讓許多持有少量 ETH 的人能夠湊齊啟用一組驗證者金鑰所需的 32 ETH。協定本身並不原生支援聯合質押功能，因此人們另外建立了各種解決方案來滿足這項需求。

有些質押池使用智能合約運作，資金可以存入合約中，合約會無需信任地管理和追蹤你的質押，並發行代表該價值的代幣給你。其他質押池可能不涉及智能合約，而是透過鏈下進行中介。

## 為什麼要透過質押池進行質押？ {#why-stake-with-a-pool}

除了我們在[質押簡介](/staking/)中概述的好處之外，透過質押池進行質押還有許多獨特的好處。

<Grid>
  <Card title="進入門檻低" emoji="🐟" description="不是巨鯨？沒問題。大多數質押池讓您可以透過與其他質押者合作來質押幾乎任何數量的 ETH，這與需要 32 ETH 的單獨質押不同。" />
  <Card title="立即質押" emoji=":stopwatch:" description="透過質押池質押就像代幣兌換一樣簡單。無需擔心硬體設定和節點維護。質押池允許您存入 ETH，讓節點營運商能夠執行驗證者。獎勵會在扣除節點營運費用後分發給貢獻者。" />
  <Card title="質押代幣" emoji=":droplet:" description="許多質押池會提供一種代幣，代表您對所質押 ETH 及其產生獎勵的權益。這讓您可以利用質押的 ETH，例如在 DeFi 應用程式中作為抵押品。" />
</Grid>

<StakingComparison page="pools" />

## 注意事項 {#what-to-consider}

[以太坊](/)協定並不原生支援聯合質押或委託質押，但考慮到使用者質押少於 32 ETH 的需求，越來越多的解決方案被開發出來以滿足這項需求。

每個質押池及其使用的工具或智能合約都是由不同的團隊開發的，並且各自帶有不同的好處與風險。質押池允許使用者將他們的 ETH 兌換為代表已質押 ETH 的代幣。這種代幣非常有用，因為它允許使用者在去中心化交易所將任意數量的 ETH 兌換為等量的生息代幣，該代幣會從底層已質押 ETH 的質押獎勵中產生回報（反之亦然），即使實際的 ETH 仍然質押在共識層上。這意味著在生息的質押 ETH 產品和「原始 ETH」之間來回兌換既快速又簡單，而且不再受限於 32 ETH 的倍數。

然而，這些質押 ETH 代幣往往會產生類似卡特爾的行為，導致大量的質押 ETH 最終被少數中心化組織控制，而不是分散在許多獨立的個人手中。這創造了審查或價值提取的條件。質押的黃金標準應該始終是個人盡可能在自己的硬體上運行驗證者。

[更多關於質押代幣風險的資訊](https://notes.ethereum.org/@djrtwo/risks-of-lsd)。

以下使用屬性指標來標示所列質押池可能具有的顯著優勢或劣勢。在選擇要加入的質押池時，請將本節作為我們如何定義這些屬性的參考。

<StakingConsiderations page="pools" />

## 探索質押池 {#explore-staking-pools}

有各種選項可以幫助你完成設定。使用上述指標來幫助你了解以下工具。

<ProductDisclaimer />

<StakingProductsCardGrid category="pools" />

請注意，選擇一個重視[客戶端多樣性](/developers/docs/nodes-and-clients/client-diversity/)的服務非常重要，因為這能提高網路的安全性並限制你的風險。有證據顯示限制多數客戶端使用的服務會標示為<em style={{ textTransform: "uppercase" }}>「執行客戶端多樣性」</em>和<em style={{ textTransform: "uppercase" }}>「共識客戶端多樣性」。</em>

對我們遺漏的質押工具有任何建議嗎？請查看我們的[產品上架政策](/contributing/adding-staking-products/)，看看它是否合適，並提交給我們進行審查。

## 常見問題 {#faq}

<ExpandableCard title="我該如何賺取獎勵？">
通常，ERC-20 質押代幣會發行給質押者，代表他們質押的 ETH 加上獎勵的價值。請記住，不同的質押池會透過略微不同的方法將質押獎勵分配給使用者，但這是共同的主題。
</ExpandableCard>

<ExpandableCard title="我何時可以提取我的質押金？">
現在就可以！上海/Capella 網路升級已於 2023 年 4 月進行，並引入了質押提款功能。支援質押池的驗證者帳戶現在能夠退出並將 ETH 提取到其指定的提款地址。這使得你能夠將你所佔的質押份額贖回為底層的 ETH。請向你的提供商查詢他們如何支援此功能。

或者，使用 ERC-20 質押代幣的質押池允許使用者在公開市場上交易該代幣，讓你可以出售你的質押部位，實際上等同於「提款」，而無需真正從質押合約中移除 ETH。

<ButtonLink href="/staking/withdrawals/">更多關於質押提款的資訊</ButtonLink>
</ExpandableCard>

<ExpandableCard title="這與在交易所質押有何不同？">
這些聯合質押選項與中心化交易所之間有許多相似之處，例如能夠質押少量的 ETH 並將它們捆綁在一起以啟用驗證者。

與中心化交易所不同的是，許多其他聯合質押選項利用智能合約和/或質押代幣，這些通常是 ERC-20 代幣，可以保存在你自己的錢包中，並且可以像任何其他代幣一樣買賣。這透過讓你控制自己的代幣提供了一層主權和安全性，但仍然沒有賦予你對在背景中代表你進行證明的驗證者客戶端的直接控制權。

在支援它們的節點方面，某些聯合質押選項比其他選項更加去中心化。為了促進網路的健康和去中心化，我們始終鼓勵質押者選擇能夠實現無需許可且去中心化節點營運者集合的聯合質押服務。
</ExpandableCard>

## 進一步閱讀 {#further-reading}

- [以太坊質押目錄 (The Ethereum Staking Directory)](https://www.staking.directory/) - _Eridian 與 Spacesider_
- [透過 Rocket Pool 質押 - 質押概覽](https://docs.rocketpool.net/guides/staking/overview.html) - _Rocket Pool 文件_
- [透過 Lido 質押以太坊](https://help.lido.fi/en/collections/2947324-staking-ethereum-with-lido) - _Lido 幫助文件_