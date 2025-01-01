---
title: 質押提款
description: 此頁總結了什麼是質押推送提款，該功能如何運作，以及質押者需要做什麼才能獲得酬勞
lang: zh-tw
template: staking
image: /images/staking/leslie-withdrawal.png
alt: 犀牛萊斯利和她的質押酬勞
sidebarDepth: 2
summaryPoints:
  - 上海/卡佩拉升級支援在以太坊提款
  - 驗證者營運商必須提供提款地址才能啟用
  - 每隔幾天自動分發酬勞
  - 完全退出質押的驗證者將收到剩餘餘額
---

<UpgradeStatus dateKey="page-staking-withdrawals-when">
2023 年 4 月 12 日上海/卡佩拉升級後便啟用了質押提款。&nbsp;<a href="#when" customEventOptions={{ eventCategory: "Anchor link", eventAction: "When's it shipping?", eventName: "click" }}>關於上海/卡佩拉升級的更多資訊</a>
</UpgradeStatus>

**質押提款**是指將以太幣從以太坊共識層（信標鏈）上的驗證者帳戶轉移到可以進行交易的執行層。

只要使用者提供了提款地址，超過 32 個以太幣的**超額酬勞**將自動定期發送到每個驗證者關聯的提款地址。 使用者也能**完全退出質押**，解鎖他們的全部驗證者餘額。

## 質押酬勞 {#staking-rewards}

對於最高有效餘額為 32 以太幣的活躍驗證者帳戶，系統會自動處理酬勞付款。

通過酬勞賺取的任何超過 32 以太幣的餘額實際上不會影響本金，也不會增加該驗證者在網路上的權重，因此每隔幾天就會自動提取酬勞。 除了提供一次提款地址之外，這些酬勞不需要驗證者營運商採取任何行動。 這些均在共識層上發起，因此所有步驟都不需要燃料（礦工費）。

### 我們是如何走到這一步的？ {#how-did-we-get-here}

在過去幾年，以太坊經歷了多次網路升級，過渡到由以太幣自身提供保護的網路，而不是像以前那樣進行能源密集型挖礦。 參與以太坊共識現在被稱為「質押」，因為參與者自願鎖定以太幣，將其「質押」，以獲得參與網路的能力。 遵守規則的使用者將獲得酬勞，而試圖欺詐的用戶將受到懲罰。

自 2020 年 11 月推出質押存款合約以來，一些勇敢的以太坊先驅者自願鎖定資金以啟動「驗證者」，即有權按照網路規則正式證明和提交區塊的特殊帳戶。

在上海/卡佩拉升級前，你無法使用或存取已經質押的以太幣。 但現在，你可以選擇自動將酬勞存入所選帳戶，並且可以隨時提取質押的以太幣。

### 我該如何準備？ {#how-do-i-prepare}

<WithdrawalsTabComparison />

### 重要通知 {#important-notices}

對於任何驗證者帳戶來說，提供提款地址是必要的步驟，然後才有資格從其餘額中提取以太幣。

<InfoBanner emoji="⚠️" isWarning>
  <strong>每個驗證者帳戶一次只能分配一個提款地址。</strong>一旦選好地址並提交到共識層，就無法撤消或再次更改。 提交前請再次檢查所提供地址的所有權和正確性。
</InfoBanner>

假設你的助記詞/種子助記詞在離線狀態下保持安全，沒有受到任何損害，那麼即使沒有提供提款地址，<strong>也不會對你的資金造成威脅</strong>。 如果未能添加提款憑證，以太幣只會被鎖定在驗證者帳戶中，直到提供提款地址為止。

## 完全退出質押 {#exiting-staking-entirely}

在從驗證者帳戶餘額中轉出_任何_資金之前，需要提供提款地址。

希望完全退出質押並提取全部餘額的使用者，還必須使用驗證者金鑰簽署並廣播「自願退出」訊息，這將啟動退出質押流程。 此操作通過你的驗證者用戶端完成，並提交到你的共識節點，無需燃料。

驗證者退出質押的過程所需時間不同，具體取決於有多少驗證者同時退出。 完成此流程後，該帳戶將不再負責執行​​驗證者網路職責，不再有資格獲得酬勞，且他們的以太幣不再處於「質押狀態」。 此時該帳戶將被標記為完全「可提款」。

一旦帳戶被標記為「可提款」，並且已提供提款憑證，使用者無需執行任何操作，靜靜等待即可。 區塊提交者將自動連續掃描帳戶，尋找符合資格的退出資金，你的帳戶餘額將在下一次<a href="#validator-sweeping" customEventOptions={{ eventCategory: "Anchor link", eventAction: "Exiting staking entirely (sweep)", eventName: "click" }}>掃描</a>期間全額轉移（也稱為「全額提款」）。

## 何時啟用質押提款？ {#when}

質押提款現已上線！ 提款功能在 2023 年 4 月 12 日進行的上海/卡佩拉升級中啟用。

上海/卡佩拉升級讓之前質押的以太幣得以回收到常規以太坊帳戶中。 這結束了質押流動性的循環，使以太坊在構建永續、可擴展、安全的去中心化生態系統的道路上又更近一步。

- [關於以太坊歷史的更多資訊](/history/)
- [關於以太坊開發藍圖的更多資訊](/roadmap/)

## 提款付款流程如何運作？ {#how-do-withdrawals-work}

給定驗證者是否有資格提款，由驗證者帳戶本身的狀態決定。 在任何給定時間都不需要使用者輸入來確定帳戶是否應該發起提款—整個過程由共識層在連續循環上自動完成。

### 想透過視覺方式學習？ {#visual-learner}

查看 Finematics 對以太坊質押提款的解釋：

<YouTube id="RwwU3P9n3uo" />

### 驗證者「掃描」 {#validator-sweeping}

當驗證者準備提交下一個區塊時，需要建立一個提款隊列，其中最多包含 16 項符合資格的提款。 最初從驗證者索引 0 開始，根據協議規則，確定此帳戶是否有符合條件的提款，如果有，則將其添加到隊列中。 提交下一個區塊的驗證者們將從上一個區塊停止的地方開始，按順序依次進行。

<InfoBanner emoji="🕛">
想像一下指針式時鐘。 時鐘上的指針指向小時，朝一個方向前進，不會跳過任何小時，並最終在到達最後一個數字後再次回到起點。<br/><br/>
現在，假設時鐘不是 1 到 12，而是 0 到 N <em>（共識層上註冊的驗證者帳戶總數，截至 2023 年 1 月超過 500,000 個）。</em><br/><br/>
時鐘上的指針指向下一個驗證者，需要檢查其是否具備提款資格。 它從 0 開始，一路前進，不跳過任何帳戶。 到達最後一個驗證者後，從頭開始繼續循環。
</InfoBanner>

#### 檢查帳戶提款情況 {#checking-an-account-for-withdrawals}

當提交者在驗證者中掃描可能的提款時，每個被檢查的驗證者都會通過一系列簡短的問題接受評估，以確定是否應該觸發提款，如果是，應該提取多少以太幣。

1. **是否已提供提款地址？**如果未提供提款地址，則跳過該帳戶，不發起提款。
2. **驗證者是否已退出並可提款？**如果驗證者已完全退出，且已達到其帳戶被視為「可提款」的時期，則會處理全額提款。 這會將全部餘額轉移至提款地址。
3. **有效餘額是否已滿 32？**如果帳戶有提款憑證，未完全退出，且有 32 以上的酬勞待提取，將進行部分提款，僅轉出超過 32 的酬勞至使用者提款地址。

在驗證者的生命週期中，驗證者營運商只執行兩項直接影響此流程的操作：

- 提供提款憑證以實現任何形式的提款
- 退出網路，觸發全額提款

### 燃料費 {#gas-free}

這種質押提款方法避免了質押者手動提交請求提取特定數量以太幣的交易。 這意味著**不需要燃料（礦工費）**，並且提款也無需爭取現有的執行層區塊空間。

### 我多久可以獲得一次質押酬勞？ {#how-soon}

一個區塊最多可以處理 16 筆提款。 按照這個速度，每天可以處理 115,200 次驗證者提款（假設沒有遺漏時隙）。 如上所述，不符合提款條件的驗證者將被跳過，從而縮短完成掃描的時間。

擴展此計算，我們可以估計處理給定數量的提款所需的時間：

<TableContainer>

|提款數量 |完成時間 |
| :-------------------: | :--------------: |
|        400,000        |     3.5 日     |
|        500,000        |     4.3 日     |
|        600,000        |     5.2 日     |
|        700,000        |     6.1 日     |
|        800,000        |     7.0 日     |

</TableContainer>

如你所見，隨著網路上驗證者的增加，速度會變慢。 遺漏時隙增加可能會相應地降低速度，但這通常代表可能結果中較慢的一面。

## 常見問題 {#faq}

<ExpandableCard
title="提供提款地址後，可以更改為其他提款地址嗎？"
eventCategory="FAQ"
eventAction="Once I have provided a withdrawal address, can I change it to an alternative withdrawal address?"
eventName="read more">
不可以，提供提款憑證的過程是一次性的，一旦提交就無法更改。
</ExpandableCard>

<ExpandableCard
title="為什麼提款地址只能設定一次？"
eventCategory="FAQ"
eventAction="Why can a withdrawal address only be set once?"
eventName="read more">
通過設定執行層提款地址，該驗證者的提款憑證已永久更改。 這意味著舊憑證將失效，新憑證將直接指向執行層帳戶。

提款地址可以是智慧型合約（由其程式碼控制），也可以是外部所有帳戶（EOA，由私密金鑰控制）。 目前，這些帳戶無法將訊息傳回共識層，以表明驗證者憑證的更改，增加此功能會給協議增加不必要的複雜性。

如果無法更改特定驗證者的提款地址，使用者可以選擇將智慧型合約設置為可以處理金鑰輪換的提款地址，例如保險箱。 將資金設置為自己的外部帳戶的使用者可以執行完全退出以提取所有質押資金，然後使用新憑證重新質押。
</ExpandableCard>

<ExpandableCard
title="如果我持有質押代幣或參與聯合質押怎麼辦？"
eventCategory="FAQ"
eventAction="What if I participate in staking tokens or pooled staking"
eventName="read more">

如果你參與<a href="/staking/pools/">質押池</a>或持有質押代幣，則應向你的提供商諮詢，了解有關如何處理質押提款的詳細資訊，因為每種服務的運作方式不同。

一般來說，使用者應該可以自由地收回其質押的以太幣，或者更改他們使用的質押提供商。 如果特定質押池變得過大，則可以退出、贖回資金，並透過<a href="https://rated.network/">較小的提供商</a>重新質押。 或者，如果積累了足夠的以太幣，你可以<a href="/staking/solo/">在家進行質押</a>。

</ExpandableCard>

<ExpandableCard
title="酬勞支付（部分提款）會自動發生嗎？"
eventCategory="FAQ"
eventAction="Do reward payments (partial withdrawals) happen automatically?"
eventName="read more">
是的，只要你的驗證者提供了提款地址。 必須提供一次才能啟用任何提款，然後酬勞支付將在每次驗證器掃描時，每隔幾天自動觸發一次。
</ExpandableCard>

<ExpandableCard
title="全額提款會自動發生嗎？"
eventCategory="FAQ"
eventAction="Do full withdrawals happen automatically?"
eventName="read more">

不會，如果你的驗證者在網路上仍然處於活躍狀態，則不會自動發生全額提款。 需要手動啟動自願退出。

一旦驗證者完成退出過程，並且假設該帳戶具有提款憑證，<em>則</em>餘額將在下一次<a href="#validator-sweeping">驗證者掃描</a>期間提出。

</ExpandableCard>

<ExpandableCard title="我可以提取自訂金額嗎？"
eventCategory="FAQ"
eventAction="Can I withdraw a custom amount?"
eventName="read more">
提款設計為自動推送，轉移任何未主動質押的以太幣。 包括已完成退出流程帳戶的全部餘額。

無法手動請求提取特定數量的以太幣。
</ExpandableCard>

<ExpandableCard
title="我操作一個驗證者。 從何處了解有關啟用提款的更多資訊？"
eventCategory="FAQ"
eventAction="I operate a validator. Where can I find more information on enabling withdrawals?"
eventName="read more">

建議驗證操作者訪問<a href="https://launchpad.ethereum.org/withdrawals/">質押啟動面板提款</a>頁面以便找到更多關於驗證者需要為提款作出的準備、活動時間，以及提款相關的詳細資訊。

若想先在測試網上測試你的設定，請造訪 <a href="https://holesky.launchpad.ethereum.org">Holesky 測試網質押啟動面板</a>開始測試。

</ExpandableCard>

<ExpandableCard
title="退出後我是否可以藉由存入更多以太幣來重新啟用我的驗證者？"
eventCategory="FAQ"
eventAction="Can I re-activate my validator after exiting by depositing more ETH?"
eventName="read more">
否。 驗證者退出並成功提取其全部餘額後，任何後續存入該驗證者的資金都會在下一次驗證者掃描期間自動轉移到提款地址。 要重新質押以太幣，必須啟用新的驗證者。
</ExpandableCard>

## 了解更多 {#further-reading}

- [質押啟動面板提款](https://launchpad.ethereum.org/withdrawals)
- [EIP-4895：將提款作為操作推送至信標鏈。](https://eips.ethereum.org/EIPS/eip-4895)
- [以太坊牧貓人組織 - 上海](https://www.ethereumcatherders.com/shanghai_upgrade/index.html)
- [PEEPanEIP #94：與 Potuz 和 Hsiao-Wei Wang 討論質押以太幣提款（測試中）](https://www.youtube.com/watch?v=G8UstwmGtyE)
- [PEEPanEIP#68：EIP-4895：信標鏈推動提款操作，由 Alex Stokes 主講](https://www.youtube.com/watch?v=CcL9RJBljUs)
- [了解驗證者有效餘額](https://www.attestant.io/posts/understanding-validator-effective-balance/)
