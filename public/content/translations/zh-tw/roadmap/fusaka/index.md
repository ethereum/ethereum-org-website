---
title: Fulu-Osaka (Fusaka)
description: "瞭解Fusaka協議升級"
lang: zh-tw
---

# Fusaka <Emoji text="🦓" /> {#fusaka}

**備受期待的以太坊 Fusaka 升級已於 2025 年 12 月 3 日上線**

Fusaka 網路升級緊接在 [Pectra](/roadmap/pectra/) 之後推出，為每位以太坊用戶與開發者帶來更多新功能並提升使用體驗。 該名稱由執行層升級版「大阪」與以福祿星命名的共識層版本組成。 以太坊的兩大組件皆獲得升級，將以太坊的擴展性、安全性與使用者體驗推向未來。

<Alert variant="update">
<AlertContent>
<AlertDescription>
Fusaka 升級僅是以太坊長期發展目標中的單一步驟。 深入了解[協議路線圖](/roadmap/)與[過往升級紀錄](/ethereum-forks/)。
</AlertDescription>
</AlertContent>
</Alert>

## Fusaka的改進 {#improvements-in-fusaka}

### 擴展 blob {#scale-blobs}

#### 點對點資料可用性取樣（Peer Data Availability Sampling, PeerDAS）{#peerdas}

這是 Fusaka 分叉的_主打功能_，也是此次升級新增的主要特性。 第二層解決方案目前將其資料以 blob 形式發佈至以太坊，這種短暫性資料類型是專為第二層解決方案所創建。 在Fusaka之前，每個完整節點都必須儲存每個數據塊，以確保資料確實存在。 隨著資料塊吞吐量增加，必須下載所有這些資料的操作將變得資源消耗過於龐大而難以承受。

透過[資料可用性採樣](https://notes.ethereum.org/@fradamt/das-fork-choice)，各節點無需儲存所有大物件資料，而是各自負責其中一部分。 數據塊在網絡節點間均勻隨機分布，每個完整節點僅存儲八分之一數據，因此理論上可擴展至八倍規模。 為確保資料可用性，任何資料片段均可透過現有資料的 50% 進行重建，所採用的方法能將資料錯誤或缺失的機率降至密碼學意義上可忽略的水平（約 10<sup>20</sup> 至 10<sup>24</sup> 分之一）。

此設計使節點的硬體與頻寬需求維持在可控範圍，同時實現大塊資料擴展，從而為第二層解決方案帶來更大規模的擴展能力，並降低相關費用。

[了解更多關於 PeerDAS](/roadmap/fusaka/peerdas/)

**資源**：

- [EIP-7594 技術規範](https://eips.ethereum.org/EIPS/eip-7594)
- [DappLion 談 PeerDAS：今日擴展以太坊 | ETHSofia 2024](https://youtu.be/bONWd1x2TjQ?t=328)
- [學術：以太坊 PeerDAS 的文件 (PDF)](https://eprint.iacr.org/2024/1362.pdf)

#### 僅限 Blob 參數的分叉 {#blob-parameter-only-forks}

Layer 2s負責擴展以太坊：隨著這些網絡的成長，它們會需要提交更多的數據給以太坊。 這代表隨著時間推進，以太坊需要逐步增加可供這些網路使用的blobs數量。 儘管PeerDAS能夠讓blob數據具備更高的擴展性，但這個過程必須循序漸進且安全地完成。

由於以太坊是在數千個獨立節點上運行的程式碼，這些節點需要在相同的規則上達成共識，因此我們無法像部署網站更新一樣，簡單地引入增加 blob 數量等變更。 任何規則變更都必須是協調升級，要求所有節點、客戶端及驗證者軟體在預定區塊之前完成升級。

這些協調升級通常包含大量變更，需要大量測試，而這需要時間。 為了快速因應Layer2不斷變化的blob需求，blob參數限定分叉引入了一種機制，可以在不需要等待正式升級時程的情況下，直接新增可用的blob數量。

Blob參數限定分叉可以由用戶端自行設定，與gas限制的配置方式類似。 在以太坊重大升級之間，客戶端可協商將`目標的`與`最大的`區塊大小分別提升至例如9與12，隨後節點運營者將更新軟體以參與該微小分叉。 這些blob參數限定分叉可以在任何時間進行設定。

在 Dencun 升級中首次將 blob 新增至網路時，目標是 3 個。 在 Pectra 升級中增加到 6 個，而在 Fusaka 升級後，現在可以獨立於這些主要網路升級，以可持續的速率增加。

![圖表顯示每個區塊的平均 blob 數量以及隨升級而增加的目標](./average-blob-count-per-block.webp)

圖表來源：[Ethereum Blobs - @hildobby, Dune Analytics](https://dune.com/hildobby/blobs)

**資源**：[EIP-7892 技術規範](https://eips.ethereum.org/EIPS/eip-7892)

#### Blob 的基礎費用以執行成本為上限{#blob-base-fee-bounded-by-execution-costs}

第二層協議在發布資料時需支付兩項費用：資料塊費用以及驗證這些資料塊所需的執行氣體費用。 若執行Gas主導市場，區塊拍賣費可能螺旋式下跌至1威，進而喪失價格信號功能。

EIP-7918 為每個blob設定了一個按比例計算的保留價格。 當儲備高於名目 blob 基本費用時，費用調整演算法會將該區塊視為超出目標，停止壓低費用，並允許其正常增加。 因此：

- blob費用市場會隨著網路的擁塞情況作出反應
- layer 2s 必須為自己帶給節點的運算壓力，支付相應比例的費用
- 執行層的基礎費用即使出現劇烈上升，也不會再讓blob費用卡在1wei

**資源**：

- [EIP-7918 技術規範](https://eips.ethereum.org/EIPS/eip-7918)
- [Storybook 解說](https://notes.ethereum.org/@anderselowsson/AIG)

### 擴展 Layer 1 {#scale-l1}

#### 歷史紀錄到期與更簡易的收據 {#history-expiry}

在 2025 年 7 月，以太坊執行用戶端[開始支援部分歷史紀錄到期](https://blog.ethereum.org/2025/07/08/partial-history-exp)。 隨著以太坊不斷成長，此舉會捨棄比[合併](https://ethereum.org/roadmap/merge/)更早的歷史紀錄，以減少節點營運商所需的磁碟空間。

此 EIP 位於「核心 EIP」之外的章節，因為此分叉實際上未實作任何變更——它是一項通知，要求用戶端團隊必須在 Fusaka 升級前支援歷史紀錄到期。 實際上，用戶端可以隨時實作此功能，但將其新增至升級中，具體地將其納入其待辦清單，並讓他們能結合此功能測試 Fusaka 的變更。

**資源**：[EIP-7642 技術規範](https://eips.ethereum.org/EIPS/eip-7642)

#### 設定MODEXP上限值{#set-upper-bounds-for-modexp}

目前為止，MODEXP的預編譯合約可以接受幾乎任何大小的數字。 這讓它難以測試、容易被濫用並對客戶端的穩定性帶來風險。 EIP-7823界定了明確的上限：每個輸入數值的長度最多為8192位元（1024個字節位元組）。 超過上限的輸入會被拒絕，該筆交易的gas仍會被燃燒，但不會變更任何狀態。 此上限足以涵蓋實務需求，同時排除那些讓gas上限設定與安全性審查變得複雜的極端情況。 這項調整在不影響用戶及開發者體驗的前提下，強化了安全性與抗阻斷服務的能力（DoS；Denial of Service）。

**資源**：[EIP-7823 技術規範](https://eips.ethereum.org/EIPS/eip-7823)

#### GAS交易上限{#transaction-gas-limit-cap}

EIP-[7825](https://eips.ethereum.org/EIPS/eip-7825) 為每筆交易新增了 16,777,216 (2^24) 的 gas 上限。 當我們提高區塊燃料限制時，這是透過限制單一交易的最壞情況成本來進行的主動式 DoS 強化。 它讓驗證和傳播更容易模型化，使我們能夠透過提高燃料限制來處理擴張問題。

為什麼剛好是 2^24 gas？ 它比目前的燃料限制小很多，但足以應付實際的合約部署和大量的預編譯，而且 2 的次方使其易於在各種用戶端上實作。 這個新的最大交易大小與 Pectra 之前的平均區塊大小相似，使其成為以太坊上任何操作的合理限制。

**資源**：[EIP-7825 技術規範](https://eips.ethereum.org/EIPS/eip-7825)

#### 增加 `MODEXP` 的 gas 成本 {#modexp-gas-cost-increase}

MODEXP 是一個預編譯的內建函式，用於計算模組化指數，這是一種用於 RSA 簽章驗證和證明系統的大數運算。 它允許合約直接執行這些計算，而無需自行實作。

開發人員和用戶端團隊將 MODEXP 視為增加區塊燃料限制的主要障礙，因為目前的 gas 定價通常低估了某些輸入所需的計算能力。 這意味著一筆使用 MODEXP 的交易可能會佔用處理整個區塊所需的大部分時間，從而減慢網路速度。

此 EIP 透過以下方式變更定價以符合實際計算成本：

- 將最低費用從 200 gas 提高到 500 gas，並移除 EIP-2565 中對一般成本計算的三分之一折扣
- 當指數輸入非常長時，更大幅度地增加成本。 如果指數（您作為第二個參數傳遞的「次方」數字）長度超過 32 位元組／256 位元，則每增加一個位元組，gas 費用會更快地攀升
- 對較大的底數或模數也收取額外費用。 其他兩個數字（底數和模數）假設至少為 32 位元組——如果其中任何一個更大，成本將與其大小成比例增加

透過讓成本更符合實際處理時間，MODEXP 不再會導致區塊驗證時間過長。 這項變更是為了未來安全地增加以太坊的區塊燃料限制而進行的幾項變更之一。

**資源**：[EIP-7883 技術規範](https://eips.ethereum.org/EIPS/eip-7883)

#### RLP 執行區塊大小限制 {#rlp-execution-block-size-limit}

這為區塊允許的大小設定了上限——這是對透過網路_傳送_的內容的限制，與限制區塊內_工作量_的燃料限制是分開的。 區塊大小上限為 10 MiB，並為共識資料保留了少量空間（2 MiB），以確保所有內容都能完全容納並順利傳播。 如果出現的區塊大於該限制，用戶端會拒絕它。
這是必要的，因為非常大的區塊需要更長的時間在網路上傳播和驗證，並可能產生共識問題或被濫用為 DoS 攻擊媒介。 此外，共識層的 gossip 協議已經不會轉發超過約 10 MiB 的區塊，因此將執行層與該限制對齊，可以避免「某些節點看到，但其他節點丟棄」的奇怪情況。

具體細節：這是對 [RLP](/developers/docs/data-structures-and-encoding/rlp/) 編碼的執行區塊大小的上限。 總共 10 MiB，其中 2 MiB 的安全邊際保留給信標區塊框架。 實際上，用戶端定義

`MAX_BLOCK_SIZE = 10,485,760` 位元組，以及

`SAFETY_MARGIN = 2,097,152` 位元組，

並拒絕任何 RLP 負載超過以下限制的執行區塊

`MAX_RLP_BLOCK_SIZE = MAX_BLOCK_SIZE − SAFETY_MARGIN`

目標是限制最壞情況下的傳播/驗證時間，並與共識層的 gossip 行為保持一致，在不改變 gas 核算的情況下降低重組/DoS 風險。

**資源**：[EIP-7934 技術規範](https://eips.ethereum.org/EIPS/eip-7934)

#### 將預設燃料限制設定為 6000 萬 {#set-default-gas-limit-to-60-million}

在 2025 年 2 月將燃料限制從 3000 萬提高到 3600 萬（以及後續提高到 4500 萬）之前，這個值自合併（2022 年 9 月）以來就沒有改變過。 此 EIP 的目標是將一致性的擴容能力列為優先事項。

EIP-7935 協調執行層用戶端團隊，為 Fusaka 升級將預設燃料限制提高到目前的 4500 萬以上。 這是一份資訊性 EIP，但它明確要求用戶端在開發網路上測試更高的限制，就一個安全的值達成共識，並在他們的 Fusaka 版本中發布該數值。

開發網路規劃的目標是約 6000 萬的壓力（帶有合成負載的完整區塊）和迭代提升；研究表明，最壞情況下的區塊大小病態不應在約 1.5 億以下受到限制。 推出時應與交易燃料限制上限（EIP-7825）配對，這樣隨著限制的提高，就不會有單一交易佔主導地位。

**資源**：[EIP-7935 技術規範](https://eips.ethereum.org/EIPS/eip-7935)

### 改善使用者體驗 {#improve-ux}

#### 確定性 proposer lookahead {#deterministic-proposer-lookahead}

透過 EIP-7917，信標鏈將能夠知道下一個 epoch 的區塊提議者。 對於哪些驗證者將提議未來的區塊有確定性的視圖，可以實現[預先確認](https://ethresear.ch/t/based-preconfirmations/17353)——這是一種與即將到來的提議者所做的承諾，保證使用者交易將被包含在他們的區塊中，而無需等待實際的區塊。

此功能有益於用戶端實作和網路安全，因為它能防止驗證者可能操縱提議者排程的極端情況。 這種預先查看也降低了實作的複雜度。

**資源**：[EIP-7917 技術規範](https://eips.ethereum.org/EIPS/eip-7917)

#### 計算前導零 (CLZ) 操作碼 {#count-leading-zeros-opcode}

此功能新增了一個小型的 EVM 指令，**計算前導零 (CLZ)**。 EVM 中的絕大多數東西都表示為 256 位元的值——這個新的操作碼會回傳開頭有多少個零位元。 這是許多指令集架構的常見特性，因為它能實現更高效的算術運算。 在實務上，這將目前手動編寫的位元掃描壓縮成一個步驟，因此尋找第一個設定位元、掃描位元組或解析位元欄位變得更簡單、更便宜。 該操作碼成本低且固定，經基準測試與基本的加法運算相當，這可以精簡位元組碼並為相同的工作節省 gas。

**資源**：[EIP-7939 技術規範](https://eips.ethereum.org/EIPS/eip-7939)

#### 支援 secp256r1 曲線的預編譯 {#secp256r1-precompile}

在固定位址 `0x100` 引入一個內建的、通行金鑰風格的 secp256r1 (P-256) 簽章檢查器，使用許多 Layer 2 已經採用的相同呼叫格式並修復極端情況，因此為這些環境編寫的合約無需修改即可在 Layer 1 上運作。

使用者體驗升級！ 對使用者而言，這解鎖了裝置原生簽署和通行金鑰。 錢包可以直接利用 Apple Secure Enclave、Android Keystore、硬體安全模組 (HSM) 和 FIDO2/WebAuthn——無需助記詞、更流暢的入門流程，以及感覺像現代應用程式的多重要素流程。 這帶來了更好的使用者體驗、更容易的復原，以及與數十億台裝置已在執行的模式相符的帳戶抽象模式。

對開發人員而言，它接收一個 160 位元組的輸入並回傳一個 32 位元組的輸出，使得移植現有的函式庫和 Layer 2 合約變得容易。 在底層，它包含無窮遠點和模組化比較檢查，以消除棘手的極端情況，而不會破壞有效的呼叫者。

**資源**：

- [EIP-7951 技術規範](https://eips.ethereum.org/EIPS/eip-7951)
- [關於 RIP-7212 的更多資訊](https://www.alchemy.com/blog/what-is-rip-7212) _(請注意，EIP-7951 已取代 RIP-7212)_

### 元資訊 {#meta}

#### `eth_config` JSON-RPC 方法 {#eth-config}

這是一個 JSON-RPC 呼叫，可讓您詢問您的節點正在執行什麼分叉設定。 它會回傳三個快照：`current`、`next` 和 `last`，以便驗證者和監控工具可以驗證用戶端是否已為即將到來的分叉做好準備。

實際上，這是為了解決在 2025 年初 Pectra 分叉於 Holesky 測試網上線時，因輕微的設定錯誤導致非最終化狀態而發現的缺點。 這有助於測試團隊和開發人員確保，在從開發網路移至測試網，以及從測試網移至主網時，主要分叉的行為將如預期般運作。

快照包括：`chainId`、`forkId`、計畫的分叉啟動時間、哪些預編譯是作用中的、預編譯位址、系統合約相依性，以及分叉的 blob 排程。

此 EIP 位於「核心 EIP」之外的章節，因為此分叉實際上未實作任何變更——它是一項通知，要求用戶端團隊必須在 Fusaka 升級前實作此 JSON-RPC 方法。

**資源**：[EIP-7910 技術規範](https://eips.ethereum.org/EIPS/eip-7910)

## 常見問題 {#faq}

### 這次的升級是否會影響到所有以太坊節點和驗證者？ {#does-this-upgrade-affect-all-ethereum-nodes-and-validators}

是的，Fusaka升級需要同時更新[執行節點與共識節點](/developers/docs/nodes-and-clients/)。 所有主要的以太坊用戶端都會發行支援標示為高優先級的強分叉版本。 您可透過以下管道掌握這些版本的發布時程：客戶端 GitHub 儲存庫、其 [Discord 頻道](https://ethstaker.org/support)、[EthStaker Discord](https://dsc.gg/ethstaker)，或訂閱以太坊部落格以獲取協議更新資訊。 爲了在升級之後與以太坊網路保持同步，節點營運者需要確保其運行的是受支援的用戶端版本。 請注意，關於用戶端版本的資訊具有時效性，使用者應該參考最新資訊以取得最新詳細資料。

### 硬分叉之後以太幣該如何兌換？ {#how-can-eth-be-converted-after-the-hardfork}

- **您的 ETH 無需任何操作**：隨著以太坊Fusaka 升級完成，您無需轉換或升級您的 ETH。 你的帳戶餘額將維持不變，同時你目前持有的以太幣在硬分叉之後，仍將保持以現有的形式存取。
- **謹防詐騙！** <Emoji text="⚠️" /> **任何要求你「升級」你的以太幣的人都是在嘗試欺騙你。** 本次升級你無須進行任何操作。 你的資產將完全不受影響。 請記住，隨時瞭解情況是防範詐騙的最佳方法。

[關於辨識和避免詐騙的更多資訊](/security/)

### 斑馬是怎麼回事？ <Emoji text="🦓" /> {#whats-with-the-zebras}

斑馬是 Fusaka 開發人員選擇的「吉祥物」，因為其條紋反映了 PeerDAS 的基於欄位的資料可用性取樣，其中節點保管某些欄位子網路，並從每個同儕的時槽中取樣一些其他欄位，以檢查 blob 資料是否可用。

2022 年的合併[使用貓熊](https://x.com/hwwonx/status/1431970802040127498)作為吉祥物，以象徵執行層與共識層的結合。 從那時起，每個分叉都非正式地選擇了吉祥物，並在升級時以 ASCII 藝術的形式出現在用戶端日誌中。 這只是一種有趣的慶祝方式。

### 為 Layer 2 擴展納入了哪些改進？ {#what-improvements-are-included-for-l2-scaling}

[PeerDAS](/roadmap/fusaka/peerdas) 是此分叉的主要功能。 它實作了資料可用性取樣 (DAS)，為 rollup 解鎖了更多可擴展性，理論上可將 blob 空間擴展至目前大小的 8 倍。 Blob 費用市場也將得到改善，以有效應對壅塞，並保證 Layer 2 為 blob 對節點施加的計算和空間支付有意義的費用。

### BPO 分叉有何不同？ {#how-are-bpo-forks-different}

僅限 Blob 參數的分叉提供了一種機制，在 PeerDAS 啟動後，可以持續增加 blob 數量（目標和最大值），而無需等待完整的協調升級。 每次增加都在支援 Fusaka 的用戶端版本中以硬編碼方式預先設定。

作為使用者或驗證者，您無需為每個 BPO 更新您的用戶端，只需確保跟隨像 Fusaka 這樣的主要硬分叉。 這與之前的做法相同，無需特殊操作。仍然建議在升級和 BPO 期間監控您的用戶端，並在主要版本之間保持更新，因為修復或最佳化可能會在硬分叉之後推出。

### BPO 的排程是什麼？ {#what-is-the-bpo-schedule}

BPO 更新的確切排程將隨著 Fusaka 版本而確定。 請關注[協議公告](https://blog.ethereum.org/category/protocol)和您用戶端的版本說明。

可能的範例如下：

- Fusaka 之前：目標 6，最大 9
- Fusaka 啟動時：目標 6，最大 9
- BPO1，Fusaka 啟動後幾週：目標 10，最大 15，增加三分之二
- BPO2，BPO1 後幾週：目標 14，最大 21

### 這會降低以太坊 (Layer 1) 的費用嗎 {#will-this-lower-gas}

此次升級不會降低 Layer 1 的 gas 費用，至少不會直接降低。 主要重點是為 rollup 資料提供更多 blob 空間，從而降低 Layer 2 的費用。 這可能會對 Layer 1 費用市場產生一些副作用，但預計不會有重大變化。

### 作為質押者，我需要為這次升級做些什麼？ {#as-a-staker-what-do-i-need-to-do-for-the-upgrade}

與每次網路升級一樣，請確保將您的用戶端更新到標有 Fusaka 支援的最新版本。 關注郵件清單中的更新和 [EF 部落格上的協議公告](https://blog.ethereum.org/category/protocol)，以獲取有關版本的資訊。
在 Fusaka 於主網上啟動之前，您可以在測試網上執行一個驗證者來驗證您的設定。 Fusaka [在測試網上會更早啟動](https://blog.ethereum.org/2025/09/26/fusaka-testnet-announcement)，讓您有更多時間確保一切正常並回報錯誤。 測試網分叉也會在郵件清單和部落格中宣布。

### 「確定性提案者預先查看」(EIP-7917) 會影響驗證者嗎？ {#does-7917-affect-validators}

此變更不會改變您驗證者用戶端的功能，但是，它將提供更多關於您驗證者職責未來的資訊。 請務必更新您的監控工具，以跟上新功能。

### Fusaka 如何影響節點和驗證者的頻寬要求？ {#how-does-fusaka-affect-bandwidth-requirements-for-nodes-and-validators}

PeerDAS 在節點傳輸 blob 資料的方式上做出了重大改變。 所有資料都被劃分為稱為「欄」的片段，分布在 128 個子網路中，節點只訂閱其中一部分。 節點必須保管的子網路欄位數量取決於其設定和連接的驗證者數量。 實際頻寬要求將取決於網路中允許的 blob 數量和節點類型。 在 Fusaka 啟動時，blob 目標保持不變，但透過 PeerDAS，節點營運商可能會看到其 blob 的磁碟使用量和網路流量有所減少。 隨著 BPO 在網路中設定更高的 blob 數量，所需頻寬將隨著每個 BPO 而增加。

即使在 Fusaka BPO 之後，節點要求仍在[建議的範圍內](https://eips.ethereum.org/EIPS/eip-7870)。

#### 完整節點 {#full-nodes}

沒有任何驗證者的普通節點將只訂閱 4 個子網路，為原始資料的 1/8 提供保管。 這意味著在相同 blob 資料量的情況下，節點下載它們的頻寬將減少八 (8) 倍。 對於一個正常的完整節點，blob 的磁碟使用量和下載頻寬可能會減少約 80%，僅剩幾 MB。

#### 單獨質押者 {#solo-stakers}

如果該節點用於驗證者用戶端，它必須保管更多欄位，因此需要處理更多資料。 新增驗證者後，節點至少訂閱 8 個欄位子網路，因此處理的資料量是普通節點的兩倍，但仍比 Fusaka 之前少。 如果驗證者餘額超過 287 ETH，將會訂閱越來越多的子網路。

對於單獨質押者來說，這意味著他們的磁碟使用量和下載頻寬將減少約 50%。 然而，要在本機建立區塊並將所有 blob 上傳到網路，需要更高的上傳頻寬。 在 Fusaka 時期，本機建立者將需要比以前高 2-3 倍的上傳頻寬，而在 BPO2 的 15/21 blob 目標下，最終必要的上傳頻寬將必須高出約 5 倍，達到 100Mbps。

#### 大型驗證者 {#large-validators}

隨著更多餘額和驗證者新增到節點，訂閱的子網路數量也會增加。 例如，在約 800 ETH 餘額時，節點保管 25 個欄位，將需要比以前多約 30% 的下載頻寬。 必要的上傳量與普通節點相似，至少需要 100Mbps。

在 4096 ETH 時，即 2 個最大餘額的驗證者，節點變為「超級節點」，保管所有欄位，因此下載和儲存所有內容。 這些節點透過回饋遺失的資料來主動修復網路，但也需要更高的頻寬和儲存空間。 隨著最終 blob 目標比以前高 6 倍，超級節點將需要額外儲存約 600GB 的 blob 資料，並擁有更快的持續下載頻寬，約為 20Mbps。

[閱讀更多關於預期要求的詳細資訊。](https://ethpandaops.io/posts/fusaka-bandwidth-estimation/#theoretical-requirements)

### 實作了哪些 EVM 變更？ {#what-evm-changes-are-implemented}

Fusaka 透過新的微小變更和功能鞏固了 EVM。

- 為了在擴展時保障安全，單一交易的最大大小將[限制為 1670 萬](https://eips.ethereum.org/EIPS/eip-7825) gas 單位。
- [新的操作碼計算前導零 (CLZ)](https://eips.ethereum.org/EIPS/eip-7939) 已新增至 EVM，將使智慧合約語言能夠更有效率地執行某些操作。
- [`ModExp` 預編譯的成本將會增加](https://eips.ethereum.org/EIPS/eip-7883)——使用它的合約將收取更多的執行 gas。

### 新的 1600 萬 gas 限制對合約開發者有何影響？ {#how-does-new-16m-gas-limit-affects-contract-developers}

Fusaka 引入了一個限制，[將單一交易的最大大小限制為 1670 萬](https://eips.ethereum.org/EIPS/eip-7825) (2^24) gas 單位。 這大約是先前平均區塊的大小，使其足以容納會消耗整個區塊的複雜交易。 這個限制為用戶端提供了保護，防止未來在區塊燃料限制提高時潛在的 DoS 攻擊。 擴展的目標是讓更多交易進入區塊鏈，而不會有單一交易消耗整個區塊。

一般使用者交易遠未達到此限制。 某些極端情況，如大型複雜的 DeFi 操作、大型智慧合約部署或針對多個合約的批次交易，可能會受此變更影響。 這些交易將必須被分割成較小的交易或以其他方式進行最佳化。 在提交可能達到限制的交易之前，請使用模擬功能。

RPC 方法 `eth_call` 沒有限制，將允許模擬比實際區塊鏈限制更大的交易。 RPC 方法的實際限制可由用戶端營運商設定，以防止濫用。

### CLZ 對開發者意味著什麼？ {#what-clz-means-for-developers}

像 Solidity 這樣的 EVM 編譯器將在底層實作和利用這個新的計算零的功能。 如果新合約依賴此類操作，可能會從中節省 gas。 請關注智慧合約語言的版本和功能公告，以了解有關潛在節省的文件。

### 我現有的智慧合約會有任何變更嗎？ {#what-clz-means-for-developers}

Fusaka 沒有會破壞任何現有合約或改變其行為的直接影響。 對執行層的變更是為了向後相容而設計的，然而，請務必留意極端情況和潛在影響。

[隨著 `ModExp` 預編譯成本的增加](https://eips.ethereum.org/EIPS/eip-7883)，依賴它的合約將消耗更多的執行 gas。 如果您的合約嚴重依賴此功能並且對使用者來說變得更昂貴，請重新考慮其使用方式。

如果執行您的合約的交易可能達到類似的大小，請考慮[新的 1670 萬限制](https://eips.ethereum.org/EIPS/eip-7825)。

## 延伸閱讀 {#further-reading}

- [以太坊路線圖](/roadmap/)
- [Forkcast: Fusaka](https://forkcast.org/upgrade/fusaka)
- [Fusaka Meta EIP](https://eips.ethereum.org/EIPS/eip-7607)
- [Fusaka 測試網部落格公告](https://blog.ethereum.org/2025/09/26/fusaka-testnet-announcement)
- [Bankless: What Fusaka & Pectra will bring Ethereum](https://www.bankless.com/read/what-fusaka-pectra-will-bring-ethereum)
- [Bankless: Ethereum's Next Upgrades: Fusaka, Glamsterdam & Beyond with Preston Van Loon](https://x.com/BanklessHQ/status/1956017743289020633?t=502)
- [The Fusaka Files](https://www.youtube.com/playlist?list=PL4cwHXAawZxpz-erUbKKUnnGoQNdF8s7Z)
- [PEEPanEIPs 解說](https://www.youtube.com/playlist?list=PL4cwHXAawZxoIenfk7OJry4rxcqX-eqBt)
