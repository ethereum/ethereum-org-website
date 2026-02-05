---
title: 布拉格埃萊特拉（Pectra）
description: 了解 Pectra 協議升級
lang: zh-tw
---

# Pectra{#pectra}

Pectra 網絡升級在 [Dencun](/roadmap/dencun/) 之後進行，為以太坊的執行層和共識層都帶來了變更。 縮寫名稱Pectra是“布拉格和“Electra”這兩個詞的結合，它們分別代表執行層和共識層規範的變化。 總之，這些變化為以太坊用戶、開發人員和驗證程式帶來了許多改進。

此次升級已於以太坊主網時期(epoch) `364032` 成功激活，具體時間為 **2025年5月7日 10:05（UTC）**。

<Alert variant="update">
<AlertContent>
<AlertDescription>
Pectra 升級只是以太坊長期發展目標中的其中一環。 深入了解[協議路線圖](/roadmap/)與[過往升級紀錄](/ethereum-forks/)。
</AlertDescription>
</AlertContent>
</Alert>

## Pectra 的改進 {#new-improvements}

Pectra 帶來了迄今為止所有升級中數量最多的 [EIP](https://eips.ethereum.org/)！ 有細微的變化，也有一些重要的新功能。 完整的更改清單及技術細節可在各自包含的EIP中查閱。

### EOA帳戶程式碼{#7702}

[EIP-7702](https://eips.ethereum.org/EIPS/eip-7702) 標誌着向廣泛實現 [賬戶抽象](/roadmap/account-abstraction/) 邁出的重要一步。 通過此功能，使用者可以將自己的([EOA](/glossary/#eoa)) 地址擴展為智能合約。 EIP 引入了一種具有特定功能的新型交易——允許地址擁有者授權，將其地址設置為模擬選定的智能合約。

通過此EIP，使用者可以選擇可編程錢包，該錢包支持交易打包、無gas交易以及為多種錢包恢複方案提供的自定義資產訪問等新功能。 這種混合方法結合了 EOA 的簡單性和基於合約帳戶的可編程性。

閱讀關於7702的深度解析點擊[這裡](/roadmap/pectra/7702/)

### 提高最大有效餘額 {#7251}

目前的驗證者最大有效餘額為 32 ETH。 這是參與共識所需的最低數量，同時也是單個驗證者能夠質押的最大數量。

[EIP-7251](https://eips.ethereum.org/EIPS/eip-7251) 將最大有效餘額提高到 2048 ETH，這意味著單個驗證者現在可以質押 32 至 2048 ETH 之間的任意數量。 質押者現在不必再質押 32 的倍數，而是可以選擇質押任意數量的 ETH，并且餘額每增加 1 ETH 都能獲得獎勵。 例如，如果驗證者的質押餘額隨著獎勵增加至 33 ETH，額外的 1 ETH 也被視爲有效餘額的一部分並獲得獎勵。

為驗證程式帶來更優化的酬勞機制僅僅是這一改進的一部分。 運行多個驗證者的[質押者](/staking/)現在可以將它們聚合為一個驗證者，從而簡化操作並降低網路開銷。 這是因爲信標鏈中每個驗證者在每個時期都需要提交一個簽名，因此隨著驗證者的增加和需要傳播的簽名數量增加，貸款需求也會隨之增加。 聚合驗證者將減輕網路負擔，並在保持經濟安全性不變的情況下帶來新的擴張選項。

閱讀關於maxEB的深度解析，請點擊[此處](/roadmap/pectra/maxeb/)

### Blob 吞吐量提升 {#7691}

Blob 為二層網路提供[資料可用性](/developers/docs/data-availability/#data-availability-and-layer-2-rollups)。 它們是在[上一次網路升級](/roadmap/dencun/)中引入的。

目前，網路的目標是平均每區塊處理 3 個 blob，最多可處理 6 blob。 隨着 [EIP-7691](https://eips.ethereum.org/EIPS/eip-7691)的引入，平均每個區塊的Blob數量將增加到6個，最多可達到9個區塊，從而提升以太坊匯總值的容量。 該EIP有助於填補這一空白，直到[PeerDAS](https://eips.ethereum.org/EIPS/eip-7594)的引入，實現更高的Blob數量。

### 增加 calldata 成本 {#7623}

在[Dencun升級中的blobs](/roadmap/danksharding)引入之前，L2網絡一直使用[calldata](/developers/docs/data-availability/blockchain-data-storage-strategies/#calldata)來存儲其在以太坊上的數據。 Blob 和 calldata 都會影響以太坊的帶寬使用情況。 雖然大多數區塊只使用最少量的 calldata，但同時包含許多 blob 的資料密集型區塊可能會對以太坊的 p2p 網路造成危害。

為了解決這個問題，[EIP-7623](https://eips.ethereum.org/EIPS/eip-7623) 提高了calldata價格，但僅影響數據密集型交易。 這限制了區塊變得過於龐大，激勵 L2 僅使用 blobs，從而保證99% 以上的交易不受影響。

### 執行層的可觸發退出機制{#7002}

目前，一個驗證程式退出並[提取質押的ETH](/staking/withdrawals/) 是一個共識層操作，要求擁有一個活躍的驗證程式密鑰，這個密鑰是驗證程式用來執行如證明等活躍任務的相同的BLS 密鑰。 提取憑證是一個獨立的冷存儲密鑰，用於接收已退出的質押資金，但無法觸發退出操作。 質押者退出的唯一方式是向信標鏈網路（Beacon Chain）發送來自活躍驗證程式密鑰簽名的特殊訊息。 在下面兩種情況里這種機制存在局限性：當提幣憑證和驗證密鑰由不同的實體持有，或驗證密鑰丟失時。

[EIP-7002](https://eips.ethereum.org/EIPS/eip-7002) 引入了一種新合約，可以用來通過執行層的提取憑證觸發退出。 質押者無需使用驗證程式簽名密鑰或訪問信標鏈，即可通過調用該特殊合約中的函數退出其驗證程式角色。 重要的是，啟用鏈上驗證程式提幣功能，使得質押協議能夠對節點運營商降低信任假設。

### 鏈上驗證程式質押{#6110}

驗證程式質押目前通過[eth1data poll](https://eth2book.info/capella/part2/deposits-withdrawals/deposit-processing/)進行處理，該功能位於信標鏈上（ Beacon Chain），用於從執行層獲取數據。 這有點像是合併（The Merge）之前遺留下來的技術邏輯。那時信標鏈（Beacon Chain）還是一個獨立的網絡，不得不考慮工作量證明（PoW）鏈上的重組問題。

[EIP-6110](https://eips.ethereum.org/EIPS/eip-6110) 是一種將質押從執行層傳遞到共識層的新方法，它能夠實現即時處理並降低實施的複雜性。 這是一種更安全的處理以太坊合併後原生質押的方式。 Eip-6110 的機制幫助節點不必依賴歷史存款記錄來啟動，這對於實現歷史數據過期是必要的，為以太坊協議提供未來適應性。

### BLS12-381 的預編譯{#2537}

預編譯是直接內置於以太坊虛擬機([EVM](/developers/docs/evm/)）的一組特殊的智能合約。 與一般合約不同，預編譯並非由使用者部署，而是用戶端實作本身的一部分，以其原生語言（例如 Go、Java 等，而非 Solidity）編寫。 預編譯合約用於執行使用廣泛且標準化的功能，例如加密運算。 智能合約開發者可以像調用普通合約一樣調用預編譯合約，優勢在於：效率更高，安全性更高。

[EIP-2537](https://eips.ethereum.org/EIPS/eip-2537) 為 [BLS12-381](https://hackmd.io/@benjaminion/bls12-381) 上的曲線運算新增了預編譯合約。 由於其實用特性，橢圓曲線方案（Bls12-381）在加密生態系統中已經得到了廣泛的應用。 更具體地說，它已被以太坊的共識層採用，並由驗證程式使用。

新的預編譯功能讓每位開發者都能輕鬆、有效且安全地使用此曲線執行密碼學運算，例如驗證簽名。 依賴此曲線的鏈上應用程式可以藉由預編譯而非自訂合約，來提升 Gas 效率和安全性。 這主要適用於想在 EVM 內對驗證程式進行推理的應用程式，例如質押池、[再質押](/restaking/)、輕用戶端、跨鏈橋以及零知識。

### 從狀態中提供歷史區塊雜湊值 {#2935}

EVM 目前提供 `BLOCKHASH` 操作碼，讓合約開發者能夠直接在執行層中擷取區塊的雜湊值。 然而，這僅限於最近的 256 個區塊，未來可能會對無狀態用戶端造成問題。

[EIP-2935](https://eips.ethereum.org/EIPS/eip-2935) 建立了一個新的系統合約，可以將最近的 8192 個區塊雜湊值作為儲存時隙提供。 這有助於確保協定未來能夠適用於無狀態執行，並且在採用 Verkle 樹後會變得更有效率。 然而，除此之外，Rollup 馬上就能從中受益，因為它們可以直接查詢合約，並使用更長的歷史時間範圍。

### 將委員會索引移至證明之外 {#7549}

信標鏈共識的基礎是驗證程式為最新的區塊和最終確定的時期投票。 此證明包含 3 個元素，其中 2 個是投票，第 3 個是委員會索引值。

[EIP-7549](https://eips.ethereum.org/EIPS/eip-7549) 將此索引移出已簽署的證明訊息之外，讓驗證和匯集共識投票變得更加容易。 這將提高每個共識用戶端的效率，並可為用於證明以太坊共識的零知識電路帶來顯著的效能提升。

### 將 blob 排程新增至執行層設定檔 {#7840}

[EIP-7840](https://eips.ethereum.org/EIPS/eip-7840) 是一項簡單的變更，它在執行層用戶端設定中新增了一個新欄位。 它設定了區塊數量，允許動態設定每個區塊的目標和最大 blob 數量，以及 blob 費用調整。 透過直接定義的設定，用戶端可以避免透過引擎 API 交換此資訊的複雜性。

<Alert variant="update">
<AlertContent>
<AlertDescription>
若想深入了解 Pectra 對您（無論是以太坊使用者、開發者或驗證程式）的具體影響，請參閱 <a href="https://epf.wiki/#/wiki/pectra-faq">Pectra 常見問題</a>。
</AlertDescription>
</AlertContent>
</Alert>

## 這次的升級是否會影響到所有以太坊節點和驗證者？ {#client-impact}

是的，Pectra 升級需要同時更新[執行節點與共識節點](/developers/docs/nodes-and-clients/)。 所有主要的以太坊用戶端都將發布支援此強分叉的版本，並標示為高優先級。 爲了在升級之後與以太坊網路保持同步，節點營運者需要確保其運行的是受支援的用戶端版本。 請注意，關於用戶端版本的資訊具有時效性，使用者應該參考最新資訊以取得最新詳細資料。

## 硬分叉之後以太幣該如何兌換？ {#scam-alert}

- **您的 ETH 無需任何操作**：隨著以太坊 Pectra 升級完成，您無需轉換或升級您的 ETH。 你的帳戶餘額將維持不變，同時你目前持有的以太幣在硬分叉之後，仍將保持以現有的形式存取。
- **謹防詐騙！** <Emoji text="⚠️" /> **任何要求你「升級」你的以太幣的人都是在嘗試欺騙你。** 本次升級你無須進行任何操作。 你的資產將完全不受影響。 請記住，隨時瞭解情況是防範詐騙的最佳方法。

[關於辨識和避免詐騙的更多資訊](/security/)

## 想透過視覺方式學習？ {#visual-learner}

<YouTube id="ufIDBCgdGwY" />

_Pectra 升級包含哪些內容？_ - Christine Kim_

<YouTube id="_UpAFpC7X6Y" />

_以太坊 Pectra 升級：質押者需要知道什麼 — Blockdaemon_

## 延伸閱讀 {#further-reading}

- [以太坊路線圖](/roadmap/)
- [Pectra 常見問題](https://epf.wiki/#/wiki/pectra-faq)
- [Pectra.wtf 資訊頁面](https://pectra.wtf)
- [Pectra 如何提升質押者體驗](https://www.kiln.fi/post/next-ethereum-upgrade-how-pectra-will-enhance-the-staking-experience)
- [EIP-7702 資訊頁面](https://eip7702.io/)
- [Pectra devnets](https://github.com/ethereum/pm/blob/master/Pectra/pectra-pm.md)
