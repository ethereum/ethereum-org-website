---
title: "質押提款"
description: "總結質押推送提款是什麼、如何運作，以及質押者需要做什麼才能獲得獎勵的頁面"
lang: zh-tw
template: staking
image: /images/staking/leslie-withdrawal.png
alt: "帶著質押獎勵的犀牛 Leslie"
sidebarDepth: 2
summaryPoints:
  - 驗證者營運商必須提供提款地址才能啟用提款
  - 傳統驗證者每隔幾天會自動提取超過 32 ETH 的多餘餘額
  - 複利驗證者可從其高達 2048 ETH 的全部餘額中賺取獎勵
  - 完全退出質押的驗證者將收到其剩餘餘額
---

<strong>質押提款</strong>是指將 ETH 從以太坊共識層（信標鏈）上的驗證者帳戶轉帳到執行層，以便在執行層進行交易。

> 如果你是[質押池](/staking/pools/)的一部分或持有質押代幣，你應該向你的提供商查詢有關如何處理質押提款的更多詳細資訊，因為每項服務的運作方式都不同。

提款的運作方式取決於你的驗證者的提款憑證類型：

- **傳統驗證者（類型 1）**：超過 32 ETH 的多餘餘額會自動且定期發送到與驗證者連結的提款地址。超過 32 ETH 的獎勵不會增加驗證者在網路上的權重。
- **複利驗證者（類型 2）**：獎勵會複利計入驗證者的有效餘額中，最高可達 2048 ETH，從而增加驗證者的權重並賺取更多獎勵。只有超過 2048 ETH 的餘額才會被自動清掃。

使用者也可以**完全退出質押**，提交提款交易，等待提款佇列時間（根據網路需求而定），並解鎖其全部驗證者餘額。

## 質押獎勵 {#staking-rewards}

獎勵的處理方式取決於驗證者的憑證類型：

<strong>傳統驗證者（類型 1）</strong>的有效餘額上限為 32 ETH。作為網路獎勵收到的任何超過 32 ETH 的餘額都不會計入有效餘額，也不會增加該驗證者在網路上的權重，這些獎勵每隔幾天就會自動提款到驗證者的專屬提款地址。除了提供一次提款地址外，領取這些獎勵不需要驗證者營運商採取任何行動。這一切都在共識層上發起，因此在任何步驟都不要求支付燃料（交易手續費）。

<strong>複利驗證者（類型 2）</strong>的有效餘額可以在 32 到 2048 ETH 之間。這些驗證者收到的網路獎勵會複利計入其有效餘額中，從而增加驗證者的權重和獲得未來獎勵的潛力。自動清掃僅在餘額超過 2048 ETH 時發生。要提取低於 2048 ETH 門檻的獎勵，複利驗證者必須從執行層手動觸發部分提款，這要求支付燃料。

### 我們是如何走到這一步的？ {#how-did-we-get-here}

在過去幾年中，[以太坊](/)經歷了幾次網路升級，過渡到由 ETH 本身保護的網路，而不是像以前那樣依賴能源密集型的挖礦。參與以太坊共識現在被稱為「質押」，因為參與者自願鎖定 ETH，將其「置於風險之中（at stake）」以獲得參與網路的能力。遵守規則的使用者將獲得獎勵，而試圖作弊的行為則會受到懲罰。

自 2020 年 11 月推出質押存款合約以來，一些勇敢的以太坊先驅自願鎖定資金以啟動「驗證者」，這些特殊帳戶有權按照網路規則正式證明和提出區塊。

在上海/Capella 升級之前，你無法使用或存取你質押的 ETH。但現在，你可以選擇自動將獎勵接收到選定的帳戶中，也可以隨時提取你質押的 ETH。

### 我該如何準備？ {#how-do-i-prepare}

<WithdrawalsTabComparison />

### 重要通知 {#important-notices}

驗證者帳戶必須提供提款地址，然後才能存取和提取累積的網路獎勵，或在退出質押時處理全額提款。

<Alert variant="warning">
<AlertEmoji text="⚠️"/>
<AlertContent>
<AlertDescription>
<strong>每個驗證者帳戶只能被分配一個提款地址，且只有一次機會。</strong>一旦選擇了地址並提交給共識層，就無法撤銷或再次更改。在提交之前，請仔細檢查所提供地址的所有權和準確性。
</AlertDescription>
</AlertContent>
</Alert>

如果你尚未為你的驗證者帳戶提供提款地址，**在此期間你的資金不會受到威脅**，前提是你的助記詞一直安全地離線保存，並且沒有以任何方式被洩露。未添加提款憑證只會讓 ETH 鎖定在驗證者帳戶中，直到提供提款地址為止。

## 複利驗證者 {#compounding-validators}

驗證者可以透過將其提款憑證從類型 1 轉換為類型 2 來選擇加入**複利**。這將最大有效餘額從 32 ETH 提高到 **2048 ETH**，允許獎勵複利計入驗證者的有效餘額中，而不是被自動清掃。

啟用複利後：

- 獎勵以 1 ETH 的增量增加驗證者的有效餘額（受限於一個小的[遲滯緩衝區](https://www.attestant.io/posts/understanding-validator-effective-balance/)），隨著時間的推移賺取更多獎勵
- 自動清掃僅在餘額超過 2048 ETH 時發生
- 低於 2048 ETH 門檻的部分提款必須從執行層手動觸發（這會消耗燃料）
- 多個驗證者可以**合併**為一個單一的複利驗證者，從而減少營運開銷

<Alert variant="warning">
<AlertEmoji text="⚠️"/>
<AlertContent>
<AlertDescription>
<strong>從類型 1 轉換為類型 2 提款憑證是不可逆的。</strong>請使用 [Staking Launchpad](https://launchpad.ethereum.org/validator-actions) 作為此轉換的官方工具。有關轉換過程、風險和合併的更多詳細資訊，請參閱 [MaxEB 深入探討](/roadmap/pectra/maxeb/)。
</AlertDescription>
</AlertContent>
</Alert>

## 完全退出質押 {#exiting-staking-entirely}

在將_任何_資金從驗證者帳戶餘額中轉出之前，必須提供提款地址。

希望完全退出質押並提取其全部餘額的使用者必須發起「自願退出」。這可以透過兩種方式完成：

- **使用驗證者金鑰**：使用你的驗證者客戶端簽署並廣播自願退出訊息，提交給你的共識節點。這不要求支付燃料。
- **使用提款憑證**：使用你的提款地址從執行層觸發退出，而無需存取驗證者簽署金鑰。這要求發送交易並消耗燃料。

驗證者退出質押的過程需要不同的時間，具體取決於同時退出的其他驗證者數量。一旦完成，該帳戶將不再負責執行驗證者網路職責，不再有資格獲得獎勵，也不再將其 ETH「置於風險之中」。此時，該帳戶將被標記為完全「可提款」。

一旦帳戶被標記為「可提款」，並且已經提供了提款憑證，使用者除了等待之外不需要做任何事情。區塊提案者會自動且持續地清掃帳戶以尋找符合條件的退出資金，你的帳戶餘額將在下一次<a href="#validator-sweeping" customEventOptions={{ eventCategory: "Anchor link", eventAction: "Exiting staking entirely (sweep)", eventName: "click" }}>清掃</a>期間被全額轉帳（也稱為「全額提款」）。

## 自動獎勵如何運作（類型 1 驗證者）？ {#how-do-withdrawals-work}

給定驗證者是否有資格提款取決於驗證者帳戶本身的狀態。在任何時候都不需要使用者輸入來決定是否應該為帳戶發起提款——整個過程由共識層在連續循環中自動完成。

### 更喜歡視覺學習？ {#visual-learner}

查看 Finematics 對以太坊質押提款的解釋：

<VideoWatch slug="ethereum-staking-withdrawals" />

### 驗證者「清掃」 {#validator-sweeping}

當驗證者被安排提出下一個區塊時，它被要求建立一個提款佇列，最多包含 16 個符合條件的提款。這是透過最初從驗證者索引 0 開始，根據協定規則確定該帳戶是否有符合條件的提款，如果有則將其添加到佇列中來完成的。被設定為提出下一個區塊的驗證者將從上一個驗證者停止的地方繼續，無限期地按順序進行。

<Alert variant="update">
<AlertEmoji text="🕛"/>
<AlertContent>
<AlertDescription>
想像一個指針式時鐘。時鐘上的指針指向小時，朝一個方向前進，不會跳過任何小時，並在到達最後一個數字後最終再次回到起點。

現在，想像時鐘上不是 1 到 12，而是 0 到 N _（N 是曾在共識層上註冊過的驗證者帳戶總數，截至 2026 年 4 月已超過 120 萬）。_

時鐘上的指針指向下一個需要檢查是否符合提款條件的驗證者。它從 0 開始，一路前進，不會跳過任何帳戶。當到達最後一個驗證者時，循環會回到起點繼續。
</AlertDescription>
</AlertContent>
</Alert>

#### 檢查帳戶的提款情況 {#checking-an-account-for-withdrawals}

當提案者在驗證者中清掃可能的提款時，每個被檢查的驗證者都會根據一系列簡短的問題進行評估，以確定是否應觸發提款，如果應該，則應提取多少 ETH。

1. <strong>是否已提供提款地址？</strong>如果尚未提供提款地址，則跳過該帳戶且不發起提款。
2. <strong>驗證者是否已退出且可提款？</strong>如果驗證者已完全退出，並且我們已經達到了其帳戶被認為是「可提款」的紀元，那麼將處理全額提款。這會將全部剩餘餘額轉帳到提款地址。
3. <strong>餘額是否超過其最大有效餘額？</strong>對於傳統（類型 1）驗證者，此門檻為 32 ETH。對於複利（類型 2）驗證者，此門檻為 2048 ETH。如果帳戶具有提款憑證、未完全退出、有效餘額處於最大值，並且餘額高於此門檻，則將處理部分提款，僅將多餘部分轉帳到使用者的提款地址。

在驗證者的生命週期中，驗證者營運商只會採取兩個直接影響此流程的行動：

- 提供提款憑證以啟用任何形式的提款
- 從網路退出，這將觸發全額提款

### 免燃料 {#gas-free}

自動提款清掃不要求質押者手動提交交易。這意味著自動清掃**不要求支付燃料（交易手續費）**，並且它們不會競爭現有的執行層區塊空間。

請注意，希望觸發低於 2048 ETH 門檻的部分提款的[複利驗證者](#compounding-validators)必須從執行層手動執行此操作，這確實要求支付燃料。

### 我的質押獎勵多久會解鎖並在我的錢包中可用？ {#how-soon}

單個區塊最多可以處理 16 筆提款。按照這個速度，每天可以處理 115,200 筆驗證者提款（假設沒有錯過任何時隙）。如上所述，沒有符合條件提款的驗證者將被跳過，從而減少完成清掃的時間。

擴展此計算，我們可以估計處理給定數量的提款所需的時間：

<TableContainer>

| 提款數量 | 完成時間 |
| :-------------------: | :--------------: |
|        400,000        |     3.5 天     |
|        500,000        |     4.3 天     |
|        600,000        |     5.2 天     |
|        700,000        |     6.1 天     |
|        800,000        |     7.0 天     |

</TableContainer>

如你所見，隨著網路上驗證者數量的增加，這個速度會變慢。錯過時隙的增加可能會按比例減慢這個速度，但這通常代表了可能結果中較慢的一面。

## 常見問題 {#faq}

<ExpandableCard
title="提供提款地址後，我可以將其更改為替代的提款地址嗎？"
eventCategory="FAQ"
eventAction="Once I have provided a withdrawal address, can I change it to an alternative withdrawal address?"
eventName="read more">
不，提供提款憑證的過程是一次性的，一旦提交就無法更改。
</ExpandableCard>

<ExpandableCard
title="為什麼驗證者的提款地址只能設定一次？"
eventCategory="FAQ"
eventAction="Why can a validator's withdrawal address only be set once?"
eventName="read more">
設定驗證者的執行層提款地址是對共識層上驗證者憑證的永久更改。一旦註冊，就無法更新共識層憑證。

驗證者的提款地址憑證可以設定為指向智能合約（由其程式碼控制）或外部擁有帳戶（EOA，由其私鑰控制）。目前，這些帳戶無法將訊息傳回共識層以發出更改驗證者憑證的信號，而添加此功能會為協定增加不必要的複雜性。

尋求靈活提款管理的使用者可以將支援金鑰輪換的智能合約錢包（例如 [Safe](https://safe.global/)）設定為驗證者的提款地址，從而有效地允許更新最終接收者 EOA。如果使用者已經將 EOA 設定為提款憑證，他們必須發起完全退出以收回其質押的 ETH，然後使用這些資金啟動具有不同憑證的新驗證者。
</ExpandableCard>

<ExpandableCard
title="如果我透過提供商、質押池進行質押，或使用流動性質押代幣參與，我該如何從質押中提款？"
eventCategory="FAQ"
eventAction="How do I withdraw from staking if I stake through a provider, staking pool, or participate with liquid staking tokens?"
eventName="read more">
如果你使用質押池或持有質押代幣，請聯絡你的提供商以了解他們如何處理提款，因為各項服務的流程有所不同。 

一般來說，當透過提供商或質押池進行質押時，你應該可以自由收回你底層質押的 ETH，或者提款並更改你使用的質押提供商。如果某個特定的質押池變得太大，可以退出、贖回質押的 ETH，並在[較小的提供商](https://rated.network/)處再次質押。或者，如果你已經累積了足夠的 ETH，你可以[在家質押](/staking/solo/)。

</ExpandableCard>

<ExpandableCard
title="領取網路獎勵（部分提款）是否自動進行？"
eventCategory="FAQ"
eventAction="Does claiming network rewards (partial withdrawals) happen automatically?"
eventName="read more">
對於**傳統（類型 1）驗證者**，是的——只要你的驗證者提供了提款地址。必須提供一次以啟用任何提款，然後每隔幾天隨著每次驗證者清掃，就會自動觸發向提款地址的網路獎勵分配。

對於**複利（類型 2）驗證者**，獎勵會複利計入驗證者的有效餘額（最高 2048 ETH），而不是被清掃到提款地址。自動清掃僅在餘額超過 2048 ETH 時發生。要提取低於此門檻的獎勵，你必須從執行層手動觸發部分提款。
</ExpandableCard>

<ExpandableCard title="我可以提取自訂金額嗎？"
eventCategory="FAQ"
eventAction="Can I withdraw a custom amount?"
eventName="read more">
對於**傳統（類型 1）驗證者**，任何超過驗證者 32 ETH 有效餘額累積的 ETH 網路獎勵都會自動推送到提款地址。已提交全額提款交易並完成質押退出流程的類型 1 驗證者，其全部 ETH 餘額將被提取到其提款地址。類型 1 驗證者不可能手動要求提取特定數量的 ETH。

<strong>複利（類型 2）驗證者</strong>可以從執行層觸發特定金額的部分提款，只要驗證者的剩餘餘額保持在 32 ETH 或以上。這要求提交部分提款交易並消耗燃料。
</ExpandableCard>

<ExpandableCard
title="我營運一個驗證者。哪裡可以找到有關管理提款流程的更多資訊？"
eventCategory="FAQ"
eventAction="I operate a validator. Where can I find more information about managing the withdrawal process?"
eventName="read more">

建議驗證者營運商造訪 [Staking Launchpad 提款](https://launchpad.ethereum.org/withdrawals/)頁面，在那裡你會找到有關如何為驗證者準備提款、事件時間安排以及有關提款如何運作的更多詳細資訊。

要先在測試網上試用你的設定，請造訪 [Hoodi 測試網 Staking Launchpad](https://hoodi.launchpad.ethereum.org) 開始。

</ExpandableCard>

<ExpandableCard
title="退出後透過存入更多 ETH 可以重新啟動我的驗證者嗎？"
eventCategory="FAQ"
eventAction="Can I re-activate my validator after exiting by depositing more ETH?"
eventName="read more">
不會。一旦驗證者退出且其全部餘額已被提取，任何存入該驗證者的額外 ETH 都將在下一次驗證者清掃期間自動轉帳到提款地址。要使用該 ETH 再次開始質押，你必須啟動一個新的驗證者。
</ExpandableCard>

<ExpandableCard
title="傳統驗證者和複利驗證者有什麼區別？"
eventCategory="FAQ"
eventAction="What is the difference between legacy and compounding validators?"
eventName="read more">
傳統驗證者使用**類型 1** 提款憑證（提款憑證地址以 0x01 開頭），其有效餘額上限為 32 ETH。作為網路獎勵收到的任何多餘 ETH 每隔幾天就會自動清掃到提款地址。

複利驗證者使用**類型 2** 提款憑證（提款憑證地址以 0x02 開頭），其有效餘額最高可達 2048 ETH。獎勵會複利計入驗證者的有效餘額中，從而增加驗證者在網路上的權重和獲得未來獎勵的潛力。自動清掃僅在餘額超過 2048 ETH 時發生。要提取低於此門檻的 ETH，必須從執行層觸發手動部分提款。

有關更多詳細資訊，請參閱 [MaxEB 深入探討](/roadmap/pectra/maxeb/)。
</ExpandableCard>

<ExpandableCard
title="如何轉換為複利驗證者？"
eventCategory="FAQ"
eventAction="How do I convert to a compounding validator?"
eventName="read more">
你可以使用 [Staking Launchpad](https://launchpad.ethereum.org/validator-actions) 將類型 1 轉換為類型 2 提款憑證。此操作是**不可逆的**——一旦轉換，就無法改回類型 1 憑證。

轉換後，你還可以將多個驗證者**合併**為一個，將它們的餘額合併到一個單一的複利驗證者中。有關轉換過程、風險和合併工具的完整演練，請參閱 [MaxEB 深入探討](/roadmap/pectra/maxeb/)。
</ExpandableCard>

<ExpandableCard
title="質押提款是何時啟用的？"
eventCategory="FAQ"
eventAction="When were staking withdrawals enabled?"
eventName="read more">
提款功能最初是作為 <strong>2023 年 4 月 12 日</strong>上海/Capella 升級的一部分啟用的。隨後的 [佩克特拉升級](/roadmap/pectra/)（2025 年 5 月）引入了具有更高最大有效餘額（2048 ETH）的複利驗證者，以及執行層觸發的退出和部分提款。

上海/Capella 升級使得以前質押的 ETH 能夠被收回到常規的以太坊帳戶中。這完成了質押流動性的閉環，並使以太坊在建立可持續、可擴展、安全的去中心化生態系統的旅程中又邁進了一步。

- [更多關於以太坊歷史](/ethereum-forks/)
- [更多關於以太坊路線圖](/roadmap/)
</ExpandableCard>

## 延伸閱讀 {#further-reading}

- [Staking Launchpad 提款](https://launchpad.ethereum.org/withdrawals)
- [Staking Launchpad 驗證者操作](https://launchpad.ethereum.org/validator-actions)
- [MaxEB 深入探討：複利與合併](/roadmap/pectra/maxeb/)
- [EIP-4895：信標鏈推送提款作為操作](https://eips.ethereum.org/EIPS/eip-4895)
- [PEEPanEIP #94：質押 ETH 提款（測試）與 Potuz 和 Hsiao-Wei Wang](https://www.youtube.com/watch?v=G8UstwmGtyE)
- [PEEPanEIP#68：EIP-4895：信標鏈推送提款作為操作與 Alex Stokes](https://www.youtube.com/watch?v=CcL9RJBljUs)
- [了解驗證者有效餘額](https://www.attestant.io/posts/understanding-validator-effective-balance/)