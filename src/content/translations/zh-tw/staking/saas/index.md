---
title: 質押即服務
description: 關於如何開始聯合以太幣質押的概覽
lang: zh-tw
template: staking
emoji: ":money_with_wings:"
image: ../../../../../assets/staking/leslie-saas.png
alt: 漂浮在雲端的犀牛萊斯利。
sidebarDepth: 2
summaryPoints:
  - 第三方節點營運商負責處理你的驗證程式用戶端的運作
  - 對於擁有 32 個以太幣且不喜歡處理運行節點的複雜技術的人來說，這是一個不錯的選擇
  - 降低信任依賴，並保持你對提款金鑰的控制權
---

## 什麼是質押即服務？ {#what-is-staking-as-a-service}

質押即服務（「SaaS」）代表一種質押服務，你將自己的 32 個以太幣存入驗證程式，但將節點運作委託給第三方營運商。 此流程通常需要你按指引完成初始化設定，包括產生金鑰和存入資金，然後將你的簽名金鑰上傳給營運商。 這將允許該服務代表你運作你的驗證程式，通常是按月收費。

## 為什麼需要質押服務？ {#why-stake-with-a-service}

以太坊協定本身並不支援質押委託，因此為了滿足此項需求，這類服務應運而生。 如果你有 32 個以太幣要質押，但懶得處理硬體設備，質押即服務可以讓你在賺取原生區塊酬勞的同時將困難的部分外包。

<CardGrid>
  <Card title="你自己的驗證程式" emoji=":desktop_computer:">
    存入 32 個以太幣後，你的一組簽名金鑰便會啟動，並參與以太坊共識。 你可以透過儀表板監控以太幣酬勞的累積狀況，
  </Card>
  <Card title="輕鬆起步" emoji="🏁">
    完全不必操心硬體規格、設定、節點維護和升級。
    質押即服務供應商會承包複雜的作業，你只需要上傳自己的簽名憑證，花一點費用讓他們代表你執行驗證程式。
  </Card>
  <Card title="管理你的風險" emoji=":shield:">
    在大多情況下，使用者不必放棄金鑰的存取權限，仍然可以用金鑰來提取或移轉質押資金。 這些金鑰與簽名金鑰不同，可以分開儲存以降低（但無法消除）你作為質押者的風險。
  </Card>
</CardGrid>

<StakingComparison page="saas" />

## 需要考慮的事項 {#what-to-consider}

有越來越多的質押即服務供應商可以幫助你質押以太幣，其風險和收益各有不同。

以下屬性指標可以用來衡量質押即服務供應商可能具備的顯著優勢或劣勢。 在選擇服務，展開質押之旅之際，請將本節作為參考，了解我們如何定義這些屬性。

<StakingConsiderations page="saas" />

## 探索質押服務供應商 {#saas-providers}

以下是幾個市面上的質押即服務供應商。 請運用上述指標來了解這些服務。

<InfoBanner emoji="⚠️" isWarning>
切記，支援<a href="/developers/docs/nodes-and-clients/client-diversity/">用戶端多元化</a>極為重要，因為這可以提高網路的安全性，降低你的風險。 如果有證據顯示服務會限制主流用戶端使用，則可標記為<em style="text-transform: uppercase;">「多元化用戶端」</em>。
</InfoBanner>

#### 質押即服務供應商

<StakingProductsCardGrid category="saas" />

#### 金鑰產生器

<StakingProductsCardGrid category="keyGen" />

想推薦我們遺漏的質押即服務供應商嗎？ 請參閱我們的[產品刊登政策](/contributing/adding-staking-products/)，看看是否合適；如果合適，請提交以供審核。

## 常見問題 {#faq}

<ExpandableCard title="誰持有我的金鑰？" eventCategory="SaasStaking" eventName="clicked who holds my keys">
  不同供應商的做法有所不同，但一般而言，他們都會引導你設定所需的簽名金鑰（每 32 個以太幣一個金鑰），並將這些金鑰上傳給你的供應商，以便他們代表你進行驗證。 單憑簽名金鑰無法提取、移轉或使用你的資金， 不過簽名金鑰可以用來投票形成共識，如果操作不當，可能會受到離線處罰或罰沒。
</ExpandableCard>

<ExpandableCard title="所以有兩組金鑰嗎？" eventCategory="SaasStaking" eventName="clicked so there are two sets of keys">
是的， 每個帳戶都由<em>簽名</em>金鑰和<em>提款</em>金鑰組成。 為了讓驗證程式證明鏈的狀態、參與同步委員會並提出區塊建議，簽名密鑰必須易於驗證程式用戶端訪問。 這些金鑰必須以某種形式連線至網際網路，因此本質上可視為「熱」金鑰。 這是驗證程式證明區塊鏈的必要條件，因此基於安全因素，簽名金鑰與用以移轉或提取資金的金鑰是分開的。

所有這些密鑰都可以使用您的 24 字種子助記詞以可重現的方式重新生成。 <em>請務必安全地備份此種子助記詞，否則你將無法在需要時產生提款金鑰</em>。
</ExpandableCard>

<ExpandableCard title="我什麼時候可以提款？" eventCategory="SaasStaking" eventName="clicked when can I withdraw">
  將 32 個以太幣質押給質押即服務供應商時，該以太幣仍然存放在官方質押存款合約中。 因此，使用質押即服務的質押者目前受到與單獨質押者相同的提款限制。 這意味著質押以太幣目前是一種單向存款。 這種情況將一直持續到上海升級為止。
</ExpandableCard>

<ExpandableCard title="如果我遭到罰沒，會發生什麼事？" eventCategory="SaasStaking" eventName="clicked what happens if I get slashed">
使用質押即服務供應商，你會將節點的運作委託給其他人。 這伴隨著節點效能不佳的風險，這是你無法控制的。 如果你的驗證程式遭到罰沒，驗證程式的餘額會受到罰款，驗證程式也會強制從驗證程式池下架。 這些資金會遭到鎖定，直到在協定層級啟用提款為止。

關於擔保或保險方案的更多詳細資料，請洽詢個別質押即服務供應商。 如果你希望完全掌控你的驗證程式設定，請<a href="/staking/solo/">詳細了解如何單獨質押以太幣</a>。
</ExpandableCard>

## 延伸閱讀 {#further-reading}

- [評估質押服務](https://www.attestant.io/posts/evaluating-staking-services/) - _Jim McDonald 2020_
