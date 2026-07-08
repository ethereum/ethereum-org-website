---
title: MaxEB
metaTitle: 佩克特拉 MaxEB
description: 了解更多關於佩克特拉 (Pectra) 升級中的 MaxEB
lang: zh-tw
authors: ["Nixo"]
---

*懶人包：* 佩克特拉 (Pectra) 硬分叉允許以太坊驗證者透過將**第 1 型 (Type 1)** 提款憑證轉換為**第 2 型 (Type 2)**，來選擇加入更高的最大有效餘額並進行複利。執行此操作的官方工具是 Launchpad。此操作無法還原。

## 總覽 {#overview}

### 誰會受到影響？ {#who-is-affected}

任何運行驗證者的人——這通常是知道其控制的驗證者索引（例如 [驗證者 #12345](https://beaconcha.in/validator/12345)）的人。如果您使用某個協定來運行驗證者（例如 Lido CSM 或 Rocket Pool），您必須向他們確認是否以及何時支援 maxEB。

如果您使用流動性質押代幣（例如 rETH 或 stETH）進行質押，則不需要也不建議採取任何行動。

### 什麼是「maxEB」？ {#what-is-maxeb}

maxEB = 驗證者的最大有效餘額 (MAXimum Effective Balance)。在佩克特拉硬分叉之前，每個驗證者最多只能以 32 ETH 賺取收益。在佩克特拉之後，驗證者可以選擇加入此變更，以 1 ETH 為增量，在 32 到 2048 ETH 之間的任何餘額上賺取收益。

### 驗證者如何選擇加入？ {#how-does-a-validator-opt-in}

驗證者透過將**第 1 型**提款憑證轉換為**第 2 型**來選擇加入 maxEB 變更。在佩克特拉硬分叉上線後，可以在 [Launchpad（驗證者操作）](https://launchpad.ethereum.org/validator-actions) 上完成此操作。與**第 0 型** → **第 1 型**一樣，從**第 1 型** → **第 2 型**的轉換是不可逆的過程。

### 什麼是提款憑證？ {#whats-a-withdrawal-credential}

當您運行驗證者時，您會有一組提款憑證。這些可以在您的存款資料 JSON 中找到，或者您可以在驗證者的 beaconcha.in [存款分頁](https://beaconcha.in/validator/12345#deposits)上查看它們。

1. **第 0 型**提款憑證：如果您的驗證者提款憑證以 `0x00...` 開頭，表示您在沙佩拉 (Shapella) 硬分叉之前進行了存款，且尚未設定提款地址。

![Type 0 withdrawal credential](./0x00-wd.png)

2. **第 1 型**提款憑證：如果您的驗證者提款憑證以 `0x01...` 開頭，表示您在沙佩拉硬分叉之後進行了存款，或者已經將您的**第 0 型**憑證轉換為**第 1 型**憑證。

 ![Type 1 withdrawal credential](./0x01-wd.png)

3. **第 2 型**提款憑證：這種新的提款憑證類型將以 `0x02...` 開頭，並將在佩克特拉之後啟用。擁有**第 2 型**提款憑證的驗證者有時被稱為「**複利驗證者 (compounding validators)**」

| **允許** | **不允許** |
| --- | --- |
| ✅ 第 0 型 → 第 1 型 | ❌ 第 0 型 → 第 2 型 |
| ✅ 第 1 型 → 第 2 型 | ❌ 第 1 型 → 第 0 型 |
|  | ❌ 第 2 型 → 第 1 型 |
|  | ❌ 第 2 型 → 第 0 型 |

### 風險 {#risks}

MaxEB 允許驗證者將其全部餘額發送給另一個驗證者。提交合併請求的使用者應驗證他們正在簽署的交易來源和內容。利用 maxEB 功能的官方工具是 Launchpad。如果您決定使用第三方工具，您應該驗證：

- 來源驗證者的公鑰和提款地址與他們控制的驗證者相符
- 目標驗證者的公鑰正確且屬於他們
- 如果他們不打算將資金發送給另一個驗證者，則該請求是轉換，而不是合併
- 交易正由正確的提款地址簽署

我們**強烈建議**與 [EthStaker 社群](https://ethstaker.org/about)討論您計畫使用的任何第三方工具。這是一個有助於檢查您的做法並避免錯誤的好地方。如果您使用惡意或設定錯誤的工具，**您的全部驗證者餘額可能會被發送到您無法控制的驗證者**——而且無法取回。

## 技術細節 {#technical-details}

### 流程 {#the-flow}

`ConsolidationRequest` 操作將有兩種用途：

1. 將現有驗證者從**第 1 型**轉換為**第 2 型**驗證者
2. 將其他驗證者合併到現有的**第 2 型**驗證者中

在將**第 1 型**轉換為**第 2 型**驗證者的過程中，*來源*和*目標*都將是您正在轉換的驗證者。該操作將消耗燃料 (gas)，並將排在其他合併請求之後。此佇列與存款佇列是**分開的**，不受新驗證者存款的影響，可以在 [pectrified.com](https://pectrified.com/) 上查看。

要合併驗證者，您必須有一個具有**第 2 型**提款憑證的*目標驗證者*。這是任何被合併的驗證者餘額的目的地，並且其索引將被保留。

### 轉換為第 2 型的要求 {#requirements-for-converting-to-type-2}

這是您轉換為**第 2 型**的第一個驗證者所必需的。此驗證者的索引將被保留並保持活躍。對於轉換，*來源驗證者* == *目標驗證者*。

驗證者必須...

- 處於活躍狀態
- 具有**第 1 型**提款憑證
- 不處於退出狀態（或被罰沒）
- 沒有待處理的手動觸發提款（不適用於自動清掃）

![conversion illustration](./conversion.png)

### 合併的要求 {#requirements-for-consolidating}

這與轉換是*相同的操作*，但發生在*來源驗證者*與*目標驗證者*不同時。目標驗證者的索引被保留，並接收來自來源驗證者的餘額。來源驗證者的索引將進入 `EXITED` 狀態。

在這種情況下，來源驗證者除了具備上述所有相同要求外，還必須：

- 已活躍至少約 27.3 小時（一個 `SHARD_COMMITTEE_PERIOD`）

目標驗證者必須

- 具有**第 2 型**提款憑證
- 不處於退出狀態。

![consolidation illustration](./consolidation.png)

### 合併請求 {#the-consolidation-request}

合併請求將由與來源驗證者關聯的提款地址進行簽署，並包含：

1. 來源驗證者的地址（例如 `0x15F4B914A0cCd14333D850ff311d6DafbFbAa32b`）
2. 來源驗證者的公鑰（例如 `0xa1d1ad0714035353258038e964ae9675dc0252ee22cea896825c01458e1807bfad2f9969338798548d9858a571f7425c`）
3. 該目標驗證者的公鑰

在轉換中，2 和 3 將是相同的。此操作可以在 [Launchpad](https://launchpad.ethereum.org/) 上完成。

### 簽署要求 {#signing-requirements}

要提交 `ConsolidationRequest`，**來源驗證者的提款地址**必須簽署該請求。這證明了對驗證者資金的控制權。

### 簽署了什麼？ {#what-is-signed}

使用的是 `ConsolidationRequest` 物件的網域分離 [簽署根 (signing root)](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/beacon-chain.md#compute_signing_root)。

- **網域：** `DOMAIN_CONSOLIDATION_REQUEST`
- **簽署根欄位：**
  - `source_pubkey`: `BLSPubkey`
  - `target_pubkey`: `BLSPubkey`
  - `source_address`: `ExecutionAddress`

產生的 **BLS 簽章**將與請求一起提交。

注意：簽署是由提款地址完成的，而不是驗證者金鑰。

### 部分提款 {#partial-withdrawals}

擁有**第 1 型**憑證的驗證者會自動且免燃料費地將其超額餘額（超過 32 ETH 的任何部分）清掃到其提款地址。因為**第 2 型**允許驗證者以 1 ETH 為增量進行餘額複利，所以在達到 2048 ETH 之前，它不會自動清掃餘額。**第 2 型**驗證者的部分提款必須手動觸發，並且會消耗燃料。

## 合併工具 {#consolidation-tooling}

有幾種工具可用於管理合併。由以太坊基金會建立的官方工具是 [Launchpad](https://launchpad.ethereum.org/en/validator-actions)。還有由質押社群實體建立的第三方工具，可能提供 Launchpad 未提供的功能。雖然這裡的工具未經以太坊基金會審計或認可，但以下是社群知名成員提供的開源工具。

| 工具 | 網站 | 開源 | 建立者 | 已審計 | 介面 | 顯著功能 |
| --- | --- | --- | --- | --- | --- | --- |
| Pectra Staking Manager | pectrastaking.com | 是，Apache 2.0 | [Pier Two](https://piertwo.com/) | 否 | 網頁介面 | WalletConnect，支援 SAFE |
| Pectra Validator Ops CLI Tool | [GitHub](https://github.com/Luganodes/Pectra-Batch-Contract) | 是，MIT | [Luganodes](https://www.luganodes.com/) | 是，Quantstamp [2025 年 5 月](https://certificate.quantstamp.com/full/luganodes-pectra-batch-contract/23f0765f-969a-4798-9edd-188d276c4a2b/index.html) | 命令列 | 批次處理，可同時處理多個驗證者 |
| Ethereal | [GitHub](https://github.com/wealdtech/ethereal) | 是，Apache 2.0 | [Jim McDonald](https://www.attestant.io/team/) | 否 | 命令列 | 驗證者與節點管理的完整功能集 |
| Siren | [GitHub](https://github.com/sigp/siren) | 是，Apache 2.0 | [Sigma Prime](https://sigmaprime.io/) | 否 | 部分命令列，但主要為網頁介面 | 僅在您使用萊特豪斯 (Lighthouse) 共識客戶端時有效 |
| Consolideth.app | https://consolideth.app/ [GitHub](https://github.com/Stakely/consolideth) | 是，MIT 授權 | [Stakely](https://stakely.io/) | 否 | 網頁介面，由 stakely 託管並可免費自行託管 | 支援主要錢包連線，包含透過 WalletConnect 連接 SAFE |

## 常見問題 {#faq}

### 選擇加入會改變我的提案運氣或獎勵嗎？ {#change-luck-or-rewards}

不會。選擇加入不會降低您提案的機會——您的職責和提案選擇保持不變。例如，如果您有兩個 32 ETH 的驗證者，相較於一個 64 ETH 的驗證者，您被選中提案區塊並賺取獎勵的總機率是相同的。

### 選擇加入會改變我的罰沒風險嗎？ {#change-slashing-risk}

對於較小或非專業的營運者來說，簡短的答案是不會。詳細的答案是，對於每個節點運行許多驗證者並具有快速警報的專業營運者來說，合併為較少的驗證者可能會降低他們對罰沒做出反應並防止連鎖事件的能力。為了抵消這種風險，所有驗證者的初始罰沒*懲罰*已從 1 ETH（每 32 ETH）大幅降低至 0.0078125 ETH（每 32 ETH）。

### 我必須退出我的驗證者才能轉換嗎？ {#exit-validator}

不用。您可以在不退出的情況下就地轉換。

### 轉換／合併需要多長時間？ {#how-long}

至少 27.3 小時，但合併也需要排隊。此佇列獨立於存款和提款佇列，並且不受它們的影響。

### 我可以保留我的驗證者索引嗎？ {#keep-validator-index}

可以。就地轉換會保留相同的驗證者索引。如果您合併多個驗證者，您將只能保留*目標驗證者*的索引。

### 我會錯過證明 (attestations) 嗎？ {#miss-attestations}

在合併到另一個驗證者的過程中，來源驗證者會退出，並且在餘額於目標驗證者上生效之前，大約有 27 小時的等待期。這段期間**不會影響效能指標**。

### 我會受到懲罰嗎？ {#incur-penalties}

不會。只要您的驗證者在線，您就不會受到懲罰。

### 被合併的驗證者的提款地址必須相符嗎？ {#withdrawal-addresses-match}

不用。但*來源*必須從其自己的地址授權該請求。

### 轉換後我的獎勵會複利嗎？ {#rewards-compound}

會的。使用**第 2 型**憑證，超過 32 ETH 的獎勵會自動重新質押——但不是立即進行。由於存在一個小緩衝區（稱為 [*遲滯 (hysteresis)*](https://eth2book.info/capella/part2/incentives/balances/#hysteresis)），您的餘額需要達到**大約多出 1.25 ETH**，多餘的部分才會被重新質押。因此，它不會在 33.0 ETH 時複利，而是在 33.25（有效餘額 = 33 ETH），然後是 34.25（有效餘額 = 34 ETH）時發生，依此類推。

### 轉換後我還能獲得自動清掃嗎？ {#automatic-sweep}

自動清掃只會在超額餘額超過 2048 時發生。對於所有其他部分提款，您需要手動觸發它們。

### 我可以改變主意並從第 2 型改回第 1 型嗎？ {#go-back-to-type1}

不行。轉換為**第 2 型**是不可逆的。

### 如果我想合併多個驗證者，我必須先將每個驗證者轉換為第 2 型嗎？ {#consolidate-multiple-validators}

不用！將一個驗證者轉換為第 2 型，然後將其用作目標。合併到該第 2 型目標的所有其他驗證者可以是第 1 型或第 2 型。

### 我的驗證者離線或低於 32 ETH - 我還能轉換它嗎？ {#offline-or-below-32eth}

可以。只要它處於活躍狀態（未退出），並且您可以使用其提款地址進行簽署，您就可以轉換它。

## 資源 {#resources}

- [Electra 共識規範](https://github.com/ethereum/consensus-specs/blob/master/specs/electra/beacon-chain.md)：這是您應該依賴的「最真實」版本。如有疑問，請閱讀規範。
- 並非每個人都習慣於鑽研程式碼，因此 [這個 maxEB-GPT](https://chatgpt.com/g/g-67f1650fb48081918f555e0c8d1c2ae9-maxeb-gpt) 可以幫助解釋規範。*免責聲明：應將規範而非 AI 視為真相，因為 AI 可能會誤解資訊或產生幻覺答案。*
- [pectrified.com](https://pectrified.com/)：查看合併、存款的狀態以及佇列等待時間。
- [Ethereal](https://github.com/wealdtech/ethereal)：社群建立的 CLI 工具，用於管理常見的驗證者任務。
- [batch-validator-depositor](https://github.com/attestantio/batch-validator-depositor)：社群建立的合約，允許在單筆交易中為多個以太坊驗證者進行存款。