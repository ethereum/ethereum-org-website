---
title: "在家質押你的 ETH"
description: "如何開始在家質押 ETH 的概覽"
lang: zh-tw
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-solo.png
alt: "犀牛 Leslie 站在她自己的電腦晶片上。"
sidebarDepth: 2
summaryPoints:
  - 保持你的驗證者正常運作並保持連線，直接從協定中獲得最大獎勵
  - 在家中運行硬體，親自為以太坊網路的安全性和去中心化做出貢獻
  - 消除信任需求，且絕不放棄對你資金金鑰的控制權
---

## 什麼是在家質押？ {#what-is-solo-staking}

在家質押是指[運行一個連接到網際網路的以太坊節點](/run-a-node/)並存入 32 ETH 以啟動[驗證者](#faq)的行為，這使你能夠直接參與網路共識。

**在家質押增加了以太坊網路的去中心化**，使[以太坊](/)更具抗審查性且更能抵禦攻擊。其他質押方法可能無法以相同的方式幫助網路。在家質押是保護以太坊的最佳質押選項。

以太坊節點由執行層 (EL) 客戶端和共識層 (CL) 客戶端組成。這些客戶端是協同運作的軟體，連同一組有效的簽署金鑰，用於驗證交易和區塊、證明正確的鏈頭、聚合證明並提出區塊。

在家質押者負責操作運行這些客戶端所需的硬體。強烈建議為此使用一台你在家中操作的專用機器——這對網路的健康非常有益。

在家質押者會因為保持其驗證者正常運作並保持連線，而直接從協定中獲得獎勵。

## 為什麼要在家質押？ {#why-stake-solo}

在家質押伴隨著更多責任，但為你提供了對資金和質押設定的最大控制權。

<Grid>
  <Card title="賺取全新的 ETH" emoji="💸" description="當您的驗證者上線時，直接從協定賺取以 ETH 計價的獎勵，無需被中間人抽成。" />
  <Card title="完全控制權" emoji="🎛️" description="保管您自己的金鑰。選擇能讓您將風險降至最低，並對網路的健康與安全做出最大貢獻的客戶端與硬體組合。第三方質押服務會為您做這些決定，但他們並不總是做出最安全的選擇。" />
  <Card title="網路安全" emoji="🔐" description="居家質押是最具影響力的質押方式。透過在家中自己的硬體上運行驗證者，您能強化以太坊協定的穩健性、去中心化與安全性。" />
</Grid>

## 在家質押前的注意事項 {#considerations-before-staking-solo}

儘管我們希望每個人都能輕鬆且無風險地進行在家質押，但這並非現實。在選擇在家質押你的 ETH 之前，需要牢記一些實際且嚴肅的注意事項。

<ExpandableCard title="必讀內容" eventCategory="SoloStaking" eventName="clicked required reading">
在操作你自己的節點時，你應該花一些時間學習如何使用你選擇的軟體。這包括閱讀相關文件並關注這些開發團隊的通訊管道。

你對正在運行的軟體以及權益證明 (PoS) 的運作方式了解得越多，作為質押者的風險就越小，作為節點營運者解決過程中可能出現的任何問題也就越容易。
</ExpandableCard>

<ExpandableCard title="熟悉電腦操作" eventCategory="SoloStaking" eventName="clicked comfortable with computers">
節點設定需要對電腦操作有一定程度的熟悉，儘管隨著時間推移，新工具正讓這變得更容易。了解命令列介面會有所幫助，但不再是嚴格要求的。

它還需要非常基本的硬體設定，以及對最低建議規格的一些了解。
</ExpandableCard>

<ExpandableCard title="安全的金鑰管理" eventCategory="SoloStaking" eventName="clicked secure key management">
就像私鑰保護你的以太坊地址一樣，你需要專門為你的驗證者產生金鑰。你必須了解如何確保任何助記詞或私鑰的安全。{' '}

[以太坊安全與防騙](/security/)
</ExpandableCard>

<ExpandableCard title="維護" eventCategory="SoloStaking" eventName="clicked maintenance">
硬體偶爾會發生故障，網路連線會出錯，客戶端軟體偶爾也需要升級。節點維護是不可避免的，偶爾需要你的關注。你需要確保自己隨時了解任何預期的網路升級或其他關鍵的客戶端升級。
</ExpandableCard>

<ExpandableCard title="穩定的上線時間" eventCategory="SoloStaking" eventName="clicked reliable uptime">
你的獎勵與你的驗證者在線並正確證明的時間成正比。停機時間會產生與同時離線的其他驗證者數量成正比的懲罰，但<a href="#faq">不會導致罰沒</a>。頻寬也很重要，因為未及時收到的證明會減少獎勵。需求會有所不同，但建議至少有 10 Mb/s 的上下傳速度。
</ExpandableCard>

<ExpandableCard title="罰沒風險" eventCategory="SoloStaking" eventName="clicked slashing risk">
與離線的不活躍懲罰不同，<em>罰沒</em>是一種嚴重得多的懲罰，專門針對惡意違規行為。透過運行少數派客戶端並將你的金鑰一次僅載入到一台機器上，你被罰沒的風險將降至最低。話雖如此，所有質押者都必須意識到罰沒的風險。

<a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50/">更多關於罰沒與驗證者生命週期的資訊</a>
</ExpandableCard>

<StakingComparison page="solo" />

## 運作方式 {#how-it-works}

<StakingHowSoloWorks />

在活躍期間，你將獲得 ETH 獎勵，這些獎勵將定期存入你的提款地址。

如果需要，你可以退出驗證者身分，這將消除保持連線的要求，並停止任何進一步的獎勵。你剩餘的餘額隨後將被提取到你在設定期間指定的提款地址。

[更多關於質押提款的資訊](/staking/withdrawals/)

## 在質押啟動板 (Staking Launchpad) 上開始 {#get-started-on-the-staking-launchpad}

質押啟動板 (Staking Launchpad) 是一個開源應用程式，將幫助你成為一名質押者。它將引導你選擇客戶端、產生金鑰並將你的 ETH 存入質押存款合約。提供了一份檢查清單，以確保你已涵蓋所有內容，從而安全地設定你的驗證者。

<StakingLaunchpadWidget />

## 節點與客戶端設定工具的注意事項 {#node-tool-considerations}

有越來越多的工具和服務可以幫助你在家質押 ETH，但每一種都伴隨著不同的風險和好處。

下面使用屬性指標來標示列出的質押工具可能具有的顯著優勢或劣勢。在選擇幫助你進行質押之旅的工具時，請將本節作為我們如何定義這些屬性的參考。

<StakingConsiderations page="solo" />

## 探索節點與客戶端設定工具 {#node-and-client-tools}

有多種選項可幫助你進行設定。使用上述指標來幫助你了解以下工具。

<ProductDisclaimer />

### 節點工具 {#node-tools}

<StakingProductsCardGrid category="nodeTools" />

請注意選擇[少數派客戶端](/developers/docs/nodes-and-clients/client-diversity/)的重要性，因為它能提高網路的安全性並限制你的風險。允許你設定少數派客戶端的工具被標示為<em style={{ textTransform: "uppercase" }}>「多客戶端 (multi-client)」</em>。

### 金鑰產生器 {#key-generators}

這些工具可以作為[質押存款命令列介面 (Staking Deposit CLI)](https://github.com/ethereum/staking-deposit-cli/) 的替代方案，以幫助產生金鑰。

<StakingProductsCardGrid category="keyGen" />

對我們遺漏的質押工具有建議嗎？請查看我們的[產品上架政策](/contributing/adding-staking-products/)，看看它是否合適，並提交給我們審查。

## 探索在家質押指南 {#staking-guides}

<StakingGuides />

## 常見問題 {#faq}

以下是一些關於質押最常見且值得了解的問題。

<ExpandableCard title="什麼是驗證者？">

<em>驗證者</em>是存在於以太坊上並參與以太坊協定共識的虛擬實體。驗證者由餘額、公鑰和其他屬性來表示。<em>驗證者客戶端</em>是代表驗證者行事的軟體，它持有並使用其私鑰。單一驗證者客戶端可以持有多個金鑰對，從而控制多個驗證者。

</ExpandableCard>

<ExpandableCard title="我可以存入超過 32 ETH 嗎？">
是的，現代驗證者帳戶最多可持有 2048 ETH。超過 32 的額外 ETH 將以階梯式複利計算，隨著你的真實餘額增加而以整數遞增。這被稱為你的<a href="https://www.attestant.io/posts/understanding-validator-effective-balance/">有效餘額</a>。

為了增加帳戶的有效餘額，從而增加獎勵，必須跨越任何完整 ETH 閾值之上 0.25 ETH 的緩衝區。例如，一個真實餘額為 32.9 且有效餘額為 32 的帳戶，需要再賺取 0.35 ETH，使其真實餘額超過 33.25，才能觸發有效餘額的增加。

這個緩衝區也能防止有效餘額下降，直到它低於當前有效餘額 0.25 ETH。

與驗證者關聯的每個金鑰對都需要至少 32 ETH 才能啟動。任何高於此數值的餘額都可以隨時透過由該地址簽署的交易提取到關聯的提款地址。任何超過最大有效餘額的資金將定期自動提取。

如果在家質押對你來說要求太高，請考慮使用[質押即服務 (staking-as-a-service)](/staking/saas/) 供應商，或者如果你持有的 ETH 少於 32 個，請查看[質押池](/staking/pools/)。
</ExpandableCard>

<ExpandableCard title="如果我離線會被罰沒嗎？（簡而言之：不會。）">
當網路正常定案時離線不會導致罰沒。如果你的驗證者在給定的紀元（每個長度為 6.4 分鐘）內無法進行證明，將會產生少量的<em>不活躍懲罰</em>，但這與<em>罰沒</em>截然不同。這些懲罰略低於驗證者在可進行證明時本應獲得的獎勵，並且可以透過大約相等時間的重新上線來賺回損失。

請注意，不活躍的懲罰與同時離線的驗證者數量成正比。在網路中很大一部分同時離線的情況下，這些驗證者中每一個受到的懲罰將大於單一驗證者無法使用時的懲罰。

在極端情況下，如果由於超過三分之一的驗證者離線而導致網路停止定案，這些使用者將遭受所謂的<em>二次方不活躍漏損</em>，這是從離線驗證者帳戶中呈指數級流失 ETH 的過程。這使得網路最終能夠透過銷毀不活躍驗證者的 ETH 來自我修復，直到他們的餘額達到 16 ETH，此時他們將自動從驗證者池中被剔除。剩餘的在線驗證者最終將再次佔據網路的 2/3 以上，滿足再次定案該鏈所需的絕對多數。
</ExpandableCard>

<ExpandableCard title="我該如何確保自己不會被罰沒？">
簡而言之，這永遠無法得到完全保證，但如果你出於善意行事，運行少數派客戶端，並且一次只將你的簽署金鑰保存在一台機器上，那麼被罰沒的風險幾乎為零。

只有少數幾種特定方式會導致驗證者被罰沒並從網路中剔除。在撰寫本文時，已經發生的罰沒事件完全是由於冗餘硬體設定造成的，即簽署金鑰同時儲存在兩台獨立的機器上。這可能會無意中導致你的金鑰進行<em>雙重投票</em>，這是一種可被罰沒的違規行為。

運行絕對多數客戶端（任何被超過 2/3 網路使用的客戶端）也存在潛在的罰沒風險，前提是該客戶端存在導致鏈分叉的錯誤。這可能會導致一個錯誤的分叉被定案。為了糾正回預期的鏈，需要透過嘗試撤銷已定案的區塊來提交<em>環繞投票 (surround vote)</em>。這也是一種可被罰沒的違規行為，只需改為運行少數派客戶端即可避免。

<em>少數派客戶端中的同等錯誤永遠不會定案</em>，因此永遠不會導致環繞投票，而只會導致不活躍懲罰，<em>不會被罰沒</em>。

<ul>
  <li><a href="https://hackernoon.com/ethereums-client-diversity-problem">了解更多關於運行少數派客戶端的重要性的資訊。</a></li>
  <li><a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50">了解更多關於預防罰沒的資訊</a></li>
</ul>
</ExpandableCard>

<ExpandableCard title="哪個客戶端最好？">
各個客戶端在效能和使用者介面方面可能略有不同，因為它們是由不同的團隊使用各種程式語言開發的。話雖如此，它們之中沒有哪一個是「最好的」。所有正式環境的客戶端都是優秀的軟體，它們都執行相同的核心功能來同步並與區塊鏈互動。

由於所有正式環境的客戶端都提供相同的基本功能，因此選擇<strong>少數派客戶端</strong>實際上非常重要，這意味著任何目前未被網路上多數驗證者使用的客戶端。這聽起來可能有違直覺，但運行多數或絕對多數客戶端會使你在該客戶端出現錯誤時面臨更高的罰沒風險。運行少數派客戶端可以大幅限制這些風險。

<a href="https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA">了解更多關於為何客戶端多樣性至關重要的資訊</a>
</ExpandableCard>

<ExpandableCard title="我可以直接使用 VPS（虛擬專屬主機）嗎？">
雖然虛擬專屬主機 (VPS) 可以用作家庭硬體的替代品，但你的驗證者客戶端的實體存取和位置<em>確實很重要</em>。像 Amazon Web Services 或 Digital Ocean 這樣的中心化雲端解決方案提供了不必取得和操作硬體的便利性，但代價是使網路中心化。

在單一中心化雲端儲存解決方案上運行的驗證者客戶端越多，對這些使用者來說就越危險。任何導致這些供應商離線的事件，無論是由於攻擊、監管要求，還是僅僅是停電/網路中斷，都會導致依賴該伺服器的每個驗證者客戶端同時離線。

離線懲罰與同時離線的其他驗證者數量成正比。使用 VPS 會大大增加離線懲罰變得更嚴重的風險，並在停機範圍夠大時增加你遭受二次方漏損或罰沒的風險。為了將你自己的風險以及對網路的風險降至最低，強烈鼓勵使用者取得並操作自己的硬體。
</ExpandableCard>

<ExpandableCard title="我該如何解鎖我的獎勵或取回我的 ETH？">

從信標鏈進行任何形式的提款都需要設定提款憑證。

新的質押者在產生金鑰和存款時設定此項。尚未設定此項的現有質押者可以升級他們的金鑰以支援此功能。

一旦設定了提款憑證，獎勵支付（超過初始 32 個的累積 ETH）將定期自動分配到提款地址。

要解鎖並收回你的全部餘額，你還必須完成退出驗證者的程序。

<ButtonLink href="/staking/withdrawals/">更多關於質押提款的資訊</ButtonLink>
</ExpandableCard>

## 進一步閱讀 {#further-reading}

- [以太坊質押目錄 (The Ethereum Staking Directory)](https://www.staking.directory/) - _Eridian 與 Spacesider_
- [以太坊的客戶端多樣性問題 (Ethereum's Client Diversity Problem)](https://hackernoon.com/ethereums-client-diversity-problem) - _@emmanuelawosika 2022_
- [幫助客戶端多樣性 (Helping Client Diversity)](https://www.attestant.io/posts/helping-client-diversity/) - _Jim McDonald 2022_
- [以太坊共識層上的客戶端多樣性 (Client diversity on Ethereum's consensus layer)](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA) - _jmcook.eth 2022_
- [操作指南：選購以太坊驗證者硬體 (How To: Shop For Ethereum Validator Hardware)](https://www.youtube.com/watch?v=C2wwu1IlhDc) - _EthStaker 2022_
- [Eth2 預防罰沒技巧 (Eth2 Slashing Prevention Tips)](https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50) - _Raul Jordan 2020_

<QuizWidget quizKey="staking-solo" />