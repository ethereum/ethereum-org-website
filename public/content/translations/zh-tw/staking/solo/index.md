---
title: 在家質押你的 ETH
description: 關於如何開始在家質押 ETH 的概述
lang: zh-tw
template: staking
image: /images/staking/leslie-solo.png
sidebarDepth: 2
summaryPoints:
  - 保持你的驗證者正常運作並在線，直接從協定中獲得最大獎勵
  - 運行家用硬體，親自為以太坊網路的安全性和去中心化做出貢獻
  - 消除信任假設，絕不放棄對你資金金鑰的控制權
---

## 什麼是在家質押？ {#what-is-solo-staking}

在家質押是指[運行一個連接到網際網路的以太坊節點](/run-a-node/)，並存入至少 32 個 ETH 來啟用一個[驗證者](#faq)，使你能夠直接參與網路共識。

在家質押是最直接的質押方式。在你和協定之間沒有智能合約、營運商或託管人。你持有自己的金鑰，積極參與驗證[以太坊](/)網路，並直接獲得網路獎勵。其他所有質押方法都在這項核心網路活動之上增加了技術、中介軟體或服務層。

**在家質押增加了以太坊網路的去中心化**，使以太坊更具抗審查性，並能更穩健地抵禦攻擊。其他質押方法可能無法以相同的方式幫助網路。在家質押是保護以太坊安全的最佳質押選項。

一個以太坊節點由執行層 (EL) 客戶端和共識層 (CL) 客戶端組成。這些客戶端是協同運作的軟體，連同一組有效的簽署金鑰，用於驗證交易和區塊、證明正確的鏈頭、聚合證明並提出區塊。

在家質押者負責營運運行這些客戶端所需的硬體。強烈建議使用一台你在家操作的專用機器來執行此操作——這對網路的健康非常有益。

在家質押者透過保持其驗證者正常運作並在線，直接從協定中獲得獎勵。

## 為什麼要在家質押？ {#why-stake-solo}

在家質押伴隨著更多責任，但為你提供了對資金和質押設定的最大控制權。

<Grid>
  <Card title="保留全部獎勵" icon={<HandCoins />} description="在家質押者獲得 100% 的協定獎勵，當你的驗證者在線時，由協定直接支付。" />
  <Card title="自我主權" icon={<KeyRound />} description="始終保留你自己的金鑰和對資金的完全託管權。選擇能讓你將風險降至最低的客戶端和硬體組合。沒有第三方可以為你做出這些決定或限制你的提款。" />
  <Card title="客戶端與地理多樣性" icon={<GlobeLock />} description="在家質押者在分佈於多個地點的硬體上運行少數客戶端，增強了網路的去中心化和安全性。" />
</Grid>

## 在家質押前的注意事項 {#considerations-before-staking-solo}

儘管我們希望每個人都能輕鬆且無風險地進行在家質押，但這並非現實。在選擇在家質押你的 ETH 之前，需要牢記一些實際且嚴肅的注意事項。

<ExpandableCard title="必讀" eventCategory="SoloStaking" eventName="clicked required reading">
當營運你自己的節點時，你應該花一些時間學習如何使用你選擇的軟體。這包括閱讀相關文件並關注這些開發團隊的溝通管道。

你對正在運行的軟體以及權益證明 (PoS) 的運作方式了解得越多，作為質押者的風險就越小，作為節點營運商解決過程中可能出現的任何問題也就越容易。
</ExpandableCard>

<ExpandableCard title="熟悉電腦操作" eventCategory="SoloStaking" eventName="clicked comfortable with computers">
節點設定要求對電腦操作有一定的熟悉度，儘管隨著時間的推移，新工具正使這變得更容易。了解命令列介面會有所幫助，但不再是嚴格要求的。

它還需要非常基本的硬體設定，以及對最低建議規格的一些了解。
</ExpandableCard>

<ExpandableCard title="硬體需求" eventCategory="SoloStaking" eventName="clicked hardware requirements">
目前社群對驗證者硬體和頻寬的指南維護在[硬體和頻寬建議 (EIP-7870)](https://eips.ethereum.org/EIPS/eip-7870)中。作為粗略的指南，請準備 4 TB NVMe SSD、64 GB RAM（較小容量也可以，但這是建議的預留空間）、可靠的現代多核心 CPU，以及大約 50 Mbps 下載 / 25 Mbps 上傳的網際網路連線。

自從富薩卡升級引入 PeerDAS 以來，質押節點只需要儲存和下載網路資料塊資料的一小部分，這顯著降低了在家質押者的磁碟和頻寬要求。
</ExpandableCard>

<ExpandableCard title="安全的金鑰管理" eventCategory="SoloStaking" eventName="clicked secure key management">
就像私鑰保護你的以太坊地址一樣，你需要專門為你的驗證者產生金鑰。你必須了解如何確保任何助記詞或私鑰的安全。{' '}

[以太坊安全與防騙](/security/)
</ExpandableCard>

<ExpandableCard title="維護" eventCategory="SoloStaking" eventName="clicked maintenance">
硬體偶爾會發生故障，網路連線會出錯，客戶端軟體偶爾也需要升級。節點維護是不可避免的，偶爾需要你的關注。你要確保自己隨時了解任何預期的網路升級或其他關鍵的客戶端升級。
</ExpandableCard>

<ExpandableCard title="可靠的正常運行時間" eventCategory="SoloStaking" eventName="clicked reliable uptime">
你的獎勵與你的驗證者在線並正確進行證明的時間成正比。停機時間會產生與同時離線的其他驗證者數量成正比的懲罰，但[不會導致罰沒](#faq)。頻寬也很重要，因為未及時收到的證明會減少獎勵。要求會有所不同，但目前的[硬體和頻寬建議 (EIP-7870)](https://eips.ethereum.org/EIPS/eip-7870)建議大約 50 Mbps 下載和 25 Mbps 上傳。
</ExpandableCard>

<ExpandableCard title="罰沒風險" eventCategory="SoloStaking" eventName="clicked slashing risk">
與離線的不活躍懲罰不同，<em>罰沒</em>是一種嚴重得多的懲罰，專門針對惡意違規行為。透過運行少數客戶端並將你的金鑰一次僅載入到一台機器上，你被罰沒的風險將降至最低。話雖如此，所有質押者都必須意識到罰沒的風險。

<a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50/"> 更多關於罰沒和驗證者生命週期的資訊</a>
</ExpandableCard>

## 質押選項比較 {#comparison-of-staking-options}

<StakingComparison page="solo" />

## 運作方式 {#how-it-works}

<StakingHowSoloWorks />

一旦你的節點同步並且產生了金鑰，你就可以存入質押存款來啟用你的驗證者。單個驗證者至少需要 32 個 ETH，最多可持有 2048 個 ETH。網路大約在 13 分鐘內識別存款，但新的驗證者在開始證明之前會經過一個啟用佇列；其長度隨需求而變化。

在活躍期間，你將獲得 ETH 獎勵。使用複利 (0x02) 提款憑證，獎勵會自動添加到你的質押中；使用一般提款 (0x01) 憑證，超過初始 32 個 ETH 的獎勵會定期轉移到你的提款地址。

如果需要，你可以作為驗證者退出，這消除了在線的要求並停止任何進一步的獎勵。你剩餘的餘額隨後將被提取到你在設定期間指定的提款地址。退出可以使用你的驗證者簽署金鑰發起，或者透過執行層交易直接從你的提款地址觸發，因此對你資金的最終控制權始終掌握在你的提款地址手中。

### 複利與 2048 ETH 上限 {#compounding}

驗證者擁有兩種提款憑證之一：

- **一般提款 (0x01)**：驗證者的有效餘額上限為 32 個 ETH，任何超過該數值的餘額每隔幾天就會自動轉移到你的提款地址。
- **複利 (0x02)**：驗證者的有效餘額最高可增長至 2048 個 ETH。獎勵會自動複利，並且你可以在超過 32 個 ETH 最低限額的每個完整 ETH 上賺取獎勵，因此你可以質押靈活的金額（例如 40 個 ETH），而不僅僅是 32 的倍數。只有超過 2048 個 ETH 的餘額才會自動轉移；提取任何其他金額意味著從你的提款地址手動觸發部分提款，這需要消耗燃料。

如果你運行多個驗證者，你可以將它們合併為一個單一的複利驗證者，而無需退出並重新進入網路，從而減少你的維護開銷。合併是從你的提款地址請求的，並受處理佇列的限制。將驗證者從 0x01 憑證切換到 0x02 憑證使用相同的機制，並且在沒有完全退出並再次存款的情況下**無法撤銷**。

[更多關於質押提款的資訊](/staking/withdrawals/)

## 在質押啟動板上開始 {#get-started-on-the-staking-launchpad}

質押啟動板 (Staking Launchpad) 是一個開源應用程式，將幫助你成為一名質押者。它將引導你選擇客戶端、產生金鑰並將你的 ETH 存入質押存款合約。提供了一份檢查清單，以確保你已涵蓋所有內容，從而安全地設定你的驗證者。

<StakingLaunchpadWidget />

## 節點和客戶端設定工具的注意事項 {#node-tool-considerations}

有越來越多的工具和服務可以幫助你在家質押 ETH，但每種工具和服務都伴隨著不同的風險和好處。

下面使用屬性指標來標示列出的質押工具可能具有的顯著優勢或劣勢。當你選擇哪些工具來幫助你的質押之旅時，請將本節作為我們如何定義這些屬性的參考。

<StakingConsiderations page="solo" />

## 探索節點和客戶端設定工具 {#node-and-client-tools}

有多種選項可幫助你進行設定。使用上述指標來幫助引導你了解以下工具。

<ProductDisclaimer />

### 節點工具 {#node-tools}

<StakingProductsCardGrid category="nodeTools" />

請注意選擇[少數客戶端](/developers/docs/nodes-and-clients/client-diversity/)的重要性，因為它提高了網路的安全性，並限制了你的風險。允許你設定少數客戶端的工具被標示為<em style={{ textTransform: "uppercase" }}>「多客戶端 (multi-client)」。</em>

### 金鑰產生器 {#key-generators}

這些工具可以作為[質押存款 CLI (Staking Deposit CLI)](https://github.com/ethereum/staking-deposit-cli/)的替代方案，以幫助產生金鑰。

<StakingProductsCardGrid category="keyGen" />

對我們遺漏的質押工具有建議嗎？請查看我們的[產品上架政策](/contributing/adding-staking-products/)，看看它是否合適，並提交給我們審查。

## 探索在家質押指南 {#staking-guides}

<StakingGuides />

## 團隊質押：具備容錯能力的在家質押 {#squad-staking}

**分散式驗證者技術 (DVT)** 允許單個驗證者在機器叢集上運行，而不僅僅是一台機器。驗證者金鑰使用分散式金鑰產生技術分成多個份額，並且叢集的閾值（例如，4 個節點中的任意 3 個）必須一起簽署；完整的金鑰永遠不會存在於任何單一機器上。如果一台機器發生故障、離線或設定錯誤，叢集的其餘部分將保持驗證者繼續進行證明。

對於在家質押者來說，這實現了「團隊質押 (squad staking)」：與朋友或其他社群成員合作一起運行驗證者，消除了單獨設定的單點故障，並降低了單一機器行為不當導致罰沒的風險。Obol 和 SSV Network 都提供了生產級別的 DVT 實作，目前廣泛應用於在家質押、質押即服務和質押池中。

[更多關於分散式驗證者技術的資訊](/staking/dvt/)

## 為質押協定運行驗證者 {#run-validators-for-a-staking-protocol}

如果你擁有運行節點的硬體和技能，但少於 32 個 ETH，一些質押協定會將你的驗證者與其聯合質押者的 ETH 進行配對。你存入較小的保證金作為抵押品，並在自己的機器上運行驗證者；協定提供剩餘的質押，而你則賺取一部分獎勵。

這是一種混合方法：你保留了營運自己硬體的責任（和滿足感），但你的驗證者在協定的智能合約、治理和效能規則下運作，這與直接質押你自己的 ETH 具有不同的信任假設。

在[聯合質押頁面](/staking/pools/)上了解更多關於這些協定如何運作的資訊，包括它們的信任假設和代幣機制。

## 使用節點的更多方式 {#more-ways-to-use-your-node}

你完全不需要質押就可以發揮節點營運技能。任何人都可以[運行一個以太坊節點](/run-a-node/)而無需存入任何 ETH。你將獲得一個自我驗證的鏈視圖、用於發送交易和與應用程式互動的專屬私有端點，並且你為網路的健康和韌性做出了貢獻。在沒有 ETH 風險的情況下，運行節點也是在啟用驗證者之前累積經驗的好方法。

<StakingCommunityCallout className="my-16" />

## 常見問題 {#faq}

以下是一些關於質押最常見且值得了解的問題。

<ExpandableCard title="什麼是驗證者？">

<em>驗證者</em>是存在於以太坊上並參與以太坊協定共識的虛擬實體。驗證者由餘額、公鑰和其他屬性表示。<em>驗證者客戶端</em>是代表驗證者行事的軟體，透過持有和使用其私鑰來運作。單個驗證者客戶端可以持有多個金鑰對，從而控制多個驗證者。

</ExpandableCard>

<ExpandableCard title="我可以存入超過 32 ETH 嗎？">
是的。具有_複利_ (0x02) 提款憑證的驗證者可以持有高達 2048 個 ETH 的有效餘額，而啟用的最低要求仍為 32 個 ETH。複利驗證者上的獎勵會自動添加到其質押中，並且它會在超過 32 個 ETH 最低限額的每個完整 ETH 上賺取獎勵，因此你可以質押非 32 倍數的金額。請參閱[複利與 2048 ETH 上限](#compounding)。

具有_一般提款_ (0x01) 憑證的驗證者其有效餘額上限仍為 32 個 ETH，任何超過該數值的餘額每隔幾天就會自動轉移到提款地址。

對於複利驗證者，只有超過 2048 個 ETH 上限的餘額才會自動轉移。要提取低於該數值的任何金額，你需要從你的提款地址觸發部分提款（這是一筆需要消耗燃料的交易），這可以提取超過 32 個 ETH 最低限額的任何餘額。如果你運行多個驗證者，你也可以將它們合併為一個單一的複利驗證者，而無需退出網路。

[更多關於質押提款的資訊](/staking/withdrawals/)
</ExpandableCard>

<ExpandableCard title="如果我離線會被罰沒嗎？（簡言之：不會。）">
當網路正常定案時離線**不會**導致罰沒。如果你的驗證者在給定的紀元（每個長度為 6.4 分鐘）內無法進行證明，則會產生少量的<em>不活躍懲罰</em>，但這與<em>罰沒</em>非常不同。這些懲罰略低於驗證者可用於證明時你本應獲得的獎勵，並且損失可以透過大約相等時間的重新在線來賺回。

請注意，不活躍的懲罰與同時離線的驗證者數量成正比。在網路的很大一部分同時離線的情況下，這些驗證者中每一個的懲罰將大於單個驗證者不可用時的懲罰。

在極端情況下，如果由於超過三分之一的驗證者離線而導致網路停止定案，這些使用者將遭受所謂的<em>二次方不活躍漏損</em>，這是從離線驗證者帳戶中呈指數級流失 ETH 的過程。這使得網路最終能夠透過銷毀不活躍驗證者的 ETH 來自我修復，直到他們的餘額達到 16 ETH，此時他們將自動從驗證者池中被剔除。剩餘的在線驗證者最終將再次佔據網路的 2/3 以上，滿足再次定案該鏈所需的絕對多數。
</ExpandableCard>

<ExpandableCard title="我該如何確保自己不會被罰沒？">
簡而言之，這永遠無法得到完全保證，但如果你真誠行事，運行少數客戶端，並且一次只將你的簽署金鑰保留在一台機器上，那麼被罰沒的風險幾乎為零。

只有少數幾種特定方式會導致驗證者被罰沒並從網路中剔除。在撰寫本文時，已發生的罰沒完全是冗餘硬體設定的產物，其中簽署金鑰同時儲存在兩台獨立的機器上。這可能會無意中導致你的金鑰進行<em>雙重投票</em>，這是一種可被罰沒的違規行為。

運行絕對多數客戶端（任何被超過 2/3 網路使用的客戶端）也存在潛在罰沒的風險，以防該客戶端出現導致鏈分叉的錯誤。這可能會導致一個錯誤的分叉被定案。要糾正回預期的鏈，需要透過嘗試撤銷已定案的區塊來提交<em>環繞投票</em>。這也是一種可被罰沒的違規行為，只需改為運行少數客戶端即可避免。

<em>少數客戶端</em>中出現的同等錯誤<em>永遠不會定案</em>，因此永遠不會導致環繞投票，並且只會導致不活躍懲罰，而<em>不會被罰沒</em>。

<ul>
  <li><a href="https://clientdiversity.org/">了解更多關於運行少數客戶端重要性的資訊。</a></li>
  <li><a href="/developers/docs/consensus-mechanisms/pos/rewards-and-penalties/">了解更多關於獎勵、懲罰和罰沒的資訊</a></li>
</ul>
</ExpandableCard>

<ExpandableCard title="哪個客戶端最好？">
各個客戶端在效能和使用者介面方面可能略有不同，因為它們是由不同的團隊使用各種程式語言開發的。話雖如此，它們中沒有哪一個是「最好的」。所有生產級別的客戶端都是優秀的軟體，它們都執行相同的核心功能來同步並與區塊鏈互動。

由於所有生產級別的客戶端都提供相同的基本功能，因此選擇一個**少數客戶端**實際上非常重要，這意味著任何目前未被網路上多數驗證者使用的客戶端。這聽起來可能有違直覺，但運行多數或絕對多數客戶端會使你在該客戶端出現錯誤時面臨更高的罰沒風險。運行少數客戶端可以大幅限制這些風險。

<a href="https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA">了解更多關於為什麼客戶端多樣性至關重要的資訊</a>
</ExpandableCard>

<ExpandableCard title="我可以只使用 VPS（虛擬專用伺服器）嗎？">
雖然虛擬專用伺服器 (VPS) 可以用作家庭硬體的替代品，但你的驗證者客戶端的實體存取和位置<em>確實很重要</em>。諸如 Amazon Web Services 或 Digital Ocean 等中心化雲端解決方案提供了無需獲取和操作硬體的便利性，但代價是使網路中心化。

在單一中心化雲端儲存解決方案上運行的驗證者客戶端越多，對這些使用者來說就越危險。任何導致這些供應商離線的事件，無論是由於攻擊、監管要求，還是僅僅是停電/網路中斷，都將導致依賴該伺服器的每個驗證者客戶端同時離線。

離線懲罰與同時離線的其他驗證者數量成正比。使用 VPS 會大大增加離線懲罰更為嚴重的風險，並在停機範圍足夠大時增加你遭受二次方漏損或罰沒的風險。為了將你自己的風險以及對網路的風險降至最低，強烈鼓勵使用者獲取並操作自己的硬體。
</ExpandableCard>

<ExpandableCard title="我該如何解鎖獎勵或取回我的 ETH？">

每次提款都需要你的驗證者設定一個提款地址。新的質押者在產生金鑰和存款時設定此地址。尚未設定提款地址的網路早期質押者需要在提款前更新其提款憑證。

對於具有一般提款 (0x01) 憑證的驗證者，獎勵支付（超過初始 32 個的累積 ETH）會定期自動分配到提款地址。對於複利 (0x02) 驗證者，獎勵保持質押狀態並自動複利。你可以透過從你的提款地址觸發部分提款來提取超過 32 個 ETH 的任何餘額。

要解鎖並收回你的全部餘額，你必須退出你的驗證者。你可以使用你的驗證者簽署金鑰來執行此操作，或者透過執行層交易直接從你的提款地址觸發它，這意味著即使你的簽署金鑰遺失，你的資金仍然可以恢復。

<ButtonLink href="/staking/withdrawals/">更多關於質押提款的資訊</ButtonLink>
</ExpandableCard>

## 進一步閱讀 {#further-reading}

- [客戶端多樣性統計資料與遷移指南](https://clientdiversity.org/)
- [幫助客戶端多樣性 (Helping Client Diversity)](https://www.attestant.io/posts/helping-client-diversity/) - _Jim McDonald 2022_
- [以太坊共識層上的客戶端多樣性 (Client diversity on Ethereum's consensus layer)](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA) - _jmcook.eth 2022_
- [操作指南：選購以太坊驗證者硬體 (How To: Shop For Ethereum Validator Hardware)](https://www.youtube.com/watch?v=C2wwu1IlhDc) - _EthStaker 2022_
- [EIP-7870：硬體和頻寬建議](https://eips.ethereum.org/EIPS/eip-7870)
- [佩克特拉升級：最大有效餘額及更多資訊](/roadmap/pectra/maxeb/)

<QuizWidget quizKey="staking-solo" />