---
title: 質押即服務
description: 關於如何開始聯合以太幣質押的概覽
lang: zh-tw
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-saas.png
alt: 漂浮在雲端的犀牛萊斯利。
sidebarDepth: 2
summaryPoints:
  - 第三方節點營運商負責處理你的驗證者用戶端的運作
  - 對於擁有 32 個以太幣且不喜歡處理運行節點的複雜技術的人來說，這是一個不錯的選擇
  - 降低信任依賴，並保持你對提款金鑰的控制權
---

## 什麼是質押即服務？ {#what-is-staking-as-a-service}

質押即服務（「SaaS」）代表一種質押服務，你將自己的 32 個以太幣存入驗證者，但將節點運作委託給第三方營運商。 此流程通常需要你按指引完成初始化設定，包括產生金鑰和存入資金，然後將你的簽名金鑰上傳給營運商。 這將允許該服務代表你運作你的驗證者，通常是按月收費。

## 為什麼需要質押服務？ {#why-stake-with-a-service}

以太坊協定本身並不支援質押委託，因此為了滿足此項需求，這類服務應運而生。 如果你有 32 個以太幣要質押，但懶得處理硬體設備，質押即服務可以讓你在賺取原生區塊酬勞的同時將困難的部分外包。

<CardGrid>
  <Card title="你自己的驗證者" emoji=":desktop_computer:" description="Deposit your own 32 ETH to activate your own set of signing keys that will participate in Ethereum consensus. Monitor your progress with dashboards to watch those ETH rewards accumulate." />
  <Card title="輕鬆起步" emoji="🏁" description="Forget about hardware specs, setup, node maintenance and upgrades. SaaS providers let you outsource the hard part by uploading your own signing credentials, allowing them to run a validator on your behalf, for a small cost." />
  <Card title="管理你的風險" emoji=":shield:" description="In many cases users do not have to give up access to the keys that enable withdrawing or transferring staked funds. These are different from the signing keys, and can be stored separately to limit (but not eliminate) your risk as a staker." />
</CardGrid>

<StakingComparison page="saas" />

## 需要考慮的事項 {#what-to-consider}

有越來越多的質押即服務供應商提供以太幣質押服務，但有各自的好處及風險。 相較於居家質押，所有質押即服務方案都需要額外的信任假設。 質押即服務可能有整合以太坊用戶端的額外程式碼，這些程式碼並不開放或無法審核。 質押即服務對於網路的去中心化也有不利影響。 根據設定，你可能無法控制你的驗證者 - 營運商可以使用你的以太幣做出不正當行為。

以下屬性指標可以用來衡量質押即服務供應商可能具備的顯著優勢或劣勢。 在選擇服務，展開質押之旅之際，請將本節作為參考，了解我們如何定義這些屬性。

<StakingConsiderations page="saas" />

## 探索質押服務供應商 {#saas-providers}

以下是幾個市面上的質押即服務供應商。 請運用上述指標來了解這些服務。

<ProductDisclaimer />

### 質押即服務供應商

<StakingProductsCardGrid category="saas" />

切記，支援[用戶端多元化](/developers/docs/nodes-and-clients/client-diversity/)極為重要，因為這可以提高網路的安全性，降低你的風險。 如果某服務可以證明它會限制主流使用者端的使用，則稱它具有<em style={{ textTransform: "uppercase" }}>「執行層使用者端多樣性」</em>和<em style={{ textTransform: "uppercase" }}>「共識層使用者端多樣性」</em>。

### 金鑰產生器

<StakingProductsCardGrid category="keyGen" />

關於我們遺漏的質押即服務供應商，你有要推薦的嗎？ 請參閱我們的[產品刊登政策](/contributing/adding-staking-products/)，如果合適，請提交以供審核。

## 常見問題 {#faq}

<ExpandableCard title="誰持有我的金鑰？" eventCategory="SaasStaking" eventName="clicked who holds my keys">
不同供應商的做法有所不同，但一般而言，他們都會引導你設定所需的簽名金鑰（每 32 個以太幣一個金鑰），並將這些金鑰上傳給你的供應商，以便他們代表你進行驗證。 單憑簽名金鑰無法提取、移轉或使用你的資金， 不過簽名金鑰可以用來投票形成共識，如果操作不當，可能會受到離線處罰或罰沒。
</ExpandableCard>

<ExpandableCard title="所以有兩組金鑰嗎？" eventCategory="SaasStaking" eventName="clicked so there are two sets of keys">
是的， 每個帳戶都包含 BLS <em>簽名</em>金鑰和 BLS <em>提款</em>金鑰。 為了讓驗證者證明鏈的狀態、參與同步委員會並提出區塊建議，簽名金鑰必須易於驗證者用戶端存取。 這些金鑰必須以某種形式連線至網際網路，因此本質上可視為「熱」金鑰。 這是驗證者證明區塊鏈的必要條件，因此基於安全因素，簽名金鑰與用以移轉或提取資金的金鑰是分開的。

BLS 提款金鑰用於簽署一次性訊息，說明應將質押酬勞和退出資金轉到哪個執行層帳戶。 廣播此訊息後，便不再需要 <em>BLS 提款</em>金鑰。 取而代之的是，資金提款的權力將被永久地委託至你所提供的地址。 這允許你透過自己的冷儲存設定一個安全的提款地址，最小化驗證者資金的風險，即使有他人控制你的驗證者的簽名金鑰。

更新提款者憑證是啟用提款的必要步驟\*。 這個過程涉及到使用你的種子助記詞生成提款金鑰。

<strong>請務必妥善保存這份種子助記詞，否則到時候你將無法生成提款金鑰。</strong>

\*首次存款時提供了提款地址的質押者不需要設定助記詞。 有關如何準備驗證者，請向你的質押即服務供應商請求支援。
</ExpandableCard>

<ExpandableCard title="我什麼時候可以提款？" eventCategory="SaasStaking" eventName="clicked when can I withdraw">
2023 年 4 月的上海/卡佩拉升級中實施了質押提款。 質押者需要提供提款地址（如果初次存款時未提供），酬勞付款將每隔幾天定期自動分配。

驗證者還可以作為驗證者完全退出，這將解鎖剩餘的以太幣餘額以供提款。 已提供執行提款地址並完成退出流程的帳戶，提供的提款地址將在下一次驗證者掃描期間收到全部餘額。

<ButtonLink href="/staking/withdrawals/">更多關於提取質押代幣的資訊</ButtonLink>
</ExpandableCard>

<ExpandableCard title="如果我遭到罰沒，會發生什麼事？" eventCategory="SaasStaking" eventName="clicked what happens if I get slashed">
使用質押即服務供應商，你會將節點的運作委託給其他人。 這伴隨著節點效能不佳的風險，這是你無法控制的。 如果你的驗證者遭到罰沒，驗證者的餘額會受到罰款，驗證者也會強制從驗證者池下架。

罰沒/退出流程完成後，這些資金將被轉移到分配給驗證者的提款地址。 需要提供提款地址才能啟用該功能。 提款地址可能在一開始存款時便已提供。 如果沒有，則需要使用驗證者提款金鑰來簽署說明提款地址的訊息。 如果未提供提款地址，資金將保持鎖定狀態，直到提供地址為止。

請聯繫各質押即服務提供商，了解關於任何擔保或保險方案的詳細訊息，以及如何提供提款地址的說明。 如果你希望完全掌控你的驗證者設定，請<a href="/staking/solo/">詳細了解如何單獨質押以太幣</a>。
</ExpandableCard>

## 延伸閱讀 {#further-reading}

- [以太坊質押目錄](https://www.staking.directory/) - _Eridian 和 Spacesider_
- [評估質押服務](https://www.attestant.io/posts/evaluating-staking-services/) - _Jim McDonald 2020_
