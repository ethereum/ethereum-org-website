---
title: "質押即服務"
description: "了解質押即服務"
lang: zh-tw
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-saas.png
alt: "犀牛 Leslie 漂浮在雲端。"
sidebarDepth: 2
summaryPoints:
  - 第三方節點營運商負責營運你的驗證者客戶端
  - 對於擁有 32 ETH 但不熟悉運行節點的技術複雜性的人來說，這是一個很好的選擇
  - 減少信任假設，並保留提款金鑰的保管權
---

## 什麼是質押即服務？ {#what-is-staking-as-a-service}

質押即服務 (SaaS) 代表一類質押服務，你為驗證者存入自己的 32 ETH，但將節點營運委託給第三方營運商。這個過程通常包括在引導下完成初始設定（包含金鑰生成和存款），然後將你的簽署金鑰上傳給營運商。這使得該服務能夠代表你營運驗證者，通常會收取月費。

## 為什麼使用服務進行質押？ {#why-stake-with-a-service}

[以太坊](/)協定原生並不支援質押委託，因此這些服務應運而生以滿足此需求。如果你有 32 ETH 可以質押，但不想處理硬體問題，SaaS 服務允許你將困難的部分委託出去，同時賺取原生的區塊獎勵。

<Grid>
  <Card title="Your own validator" emoji=":desktop_computer:" description="Deposit your own 32 ETH to activate your own set of signing keys that will participate in Ethereum consensus. Monitor your progress with dashboards to watch those ETH rewards accumulate." />
  <Card title="Easy to start" emoji="🏁" description="Forget about hardware specs, setup, node maintenance and upgrades. SaaS providers let you outsource the hard part by uploading your own signing credentials, allowing them to run a validator on your behalf, for a small cost." />
  <Card title="Limit your risk" emoji=":shield:" description="In many cases users do not have to give up access to the keys that enable withdrawing or transferring staked funds. These are different from the signing keys, and can be stored separately to limit (but not eliminate) your risk as a staker." />
</Grid>

<StakingComparison page="saas" />

## 注意事項 {#what-to-consider}

越來越多的 SaaS 供應商可以幫助你質押 ETH，但它們都有各自的優點和風險。與在家質押相比，所有 SaaS 選項都需要額外的信任假設。SaaS 選項可能會有包裝以太坊客戶端的額外程式碼，而這些程式碼並非開源或可稽核的。SaaS 對網路去中心化也有不利影響。根據設定的不同，你可能無法控制你的驗證者——營運商可能會使用你的 ETH 進行不誠實的行為。

下方使用屬性指標來標示列出的 SaaS 供應商可能具有的顯著優缺點。在選擇服務來協助你的質押之旅時，請將本節作為我們如何定義這些屬性的參考。

<StakingConsiderations page="saas" />

## 探索質押服務供應商 {#saas-providers}

以下是一些可用的 SaaS 供應商。使用上述指標來幫助你了解這些服務。

<ProductDisclaimer />

### SaaS 供應商 {#saas-providers-2}

<StakingProductsCardGrid category="saas" />

請注意支持[客戶端多樣性](/developers/docs/nodes-and-clients/client-diversity/)的重要性，因為它能提高網路的安全性並限制你的風險。有證據顯示限制多數客戶端使用的服務會標示為<em style={{ textTransform: "uppercase" }}>「執行客戶端多樣性」</em>和<em style={{ textTransform: "uppercase" }}>「共識客戶端多樣性」。</em>

### 金鑰生成器 {#key-generators}

<StakingProductsCardGrid category="keyGen" />

對我們遺漏的質押即服務供應商有任何建議嗎？請查看我們的[產品上架政策](/contributing/adding-staking-products/)，看看它是否合適，並提交給我們審查。

## 常見問題 {#faq}

<ExpandableCard title="誰持有我的金鑰？" eventCategory="SaasStaking" eventName="clicked who holds my keys">
安排會因供應商而異，但通常你會在引導下設定所需的任何簽署金鑰（每 32 ETH 一個），並將這些金鑰上傳給你的供應商，以允許他們代表你進行驗證。僅憑簽署金鑰無法提款、轉帳或花費你的資金。然而，它們確實提供了對共識進行投票的能力，如果處理不當，可能會導致離線懲罰或罰沒。
</ExpandableCard>

<ExpandableCard title="所以有兩組金鑰嗎？" eventCategory="SaasStaking" eventName="clicked so there are two sets of keys">
是的。每個帳戶都由 BLS <em>簽署</em>金鑰和 BLS <em>提款</em>金鑰組成。為了讓驗證者能夠證明鏈的狀態、參與同步委員會並提出區塊，驗證者客戶端必須能夠隨時存取簽署金鑰。這些金鑰必須以某種形式連接到網際網路，因此本質上被視為「熱」金鑰。這是你的驗證者能夠進行證明的要求，因此基於安全考量，用於轉帳或提款資金的金鑰是分開的。

BLS 提款金鑰用於簽署一次性訊息，該訊息宣告質押獎勵和退出資金應發送至哪個執行層帳戶。一旦廣播此訊息，就不再需要 <em>BLS 提款</em>金鑰。相反地，對提取資金的控制權將永久委託給你提供的地址。這允許你設定一個透過你自己的冷儲存保護的提款地址，即使其他人控制了你的驗證者簽署金鑰，也能將驗證者資金的風險降至最低。

更新提款憑證是啟用提款的必要步驟\*。此過程涉及使用你的助記詞生成提款金鑰。

<strong>請務必安全地備份此助記詞，否則屆時你將無法生成提款金鑰。</strong>

\*在初始存款時已提供提款地址的質押者不需要設定此項。請向你的 SaaS 供應商查詢有關如何準備驗證者的支援。
</ExpandableCard>

<ExpandableCard title="我何時可以提款？" eventCategory="SaasStaking" eventName="clicked when can I withdraw">
質押者需要提供提款地址（如果在初始存款時未提供），獎勵支付將每隔幾天定期自動開始分配。

驗證者也可以完全退出驗證者身分，這將解鎖其剩餘的 ETH 餘額以供提款。已提供執行層提款地址並完成退出過程的帳戶，將在下一次驗證者掃描期間將其全部餘額接收到所提供的提款地址。

<ButtonLink href="/staking/withdrawals/">更多關於質押提款的資訊</ButtonLink>
</ExpandableCard>

<ExpandableCard title="如果我被罰沒會發生什麼事？" eventCategory="SaasStaking" eventName="clicked what happens if I get slashed">
透過使用 SaaS 供應商，你將節點的營運委託給其他人。這伴隨著節點效能不佳的風險，而這不在你的控制範圍內。如果你的驗證者被罰沒，你的驗證者餘額將受到懲罰，並被強制從驗證者池中移除。

在完成罰沒/退出過程後，這些資金將轉帳到分配給該驗證者的提款地址。這需要提供提款地址才能啟用。這可能已在初始存款時提供。如果沒有，將需要使用驗證者提款金鑰來簽署宣告提款地址的訊息。如果未提供提款地址，資金將保持鎖定狀態，直到提供為止。

請聯絡個別的 SaaS 供應商，以獲取有關任何保證或保險選項的更多詳細資訊，以及有關如何提供提款地址的指示。如果你更希望完全控制你的驗證者設定，請[了解更多關於如何單獨質押你的 ETH 的資訊](/staking/solo/)。
</ExpandableCard>

## 進一步閱讀 {#further-reading}

- [以太坊質押目錄](https://www.staking.directory/) - _Eridian 與 Spacesider_
- [評估質押服務](https://www.attestant.io/posts/evaluating-staking-services/) - _Jim McDonald 2020_