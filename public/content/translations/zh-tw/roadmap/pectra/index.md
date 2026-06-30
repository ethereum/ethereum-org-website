---
title: 佩克特拉
metaTitle: Prague-Electra (佩克特拉)
description: 了解佩克特拉 (Pectra) 協定升級
lang: zh-tw
authors:
  - Nixo
  - 馬里奧·哈維爾
---

佩克特拉 (Pectra) 網路升級接續在 [Dencun](/roadmap/dencun/) 之後，為以太坊的執行層與共識層帶來了變更。縮寫名稱 Pectra 是 Prague（布拉格）和 Electra（厄勒克特拉）的組合，這兩個名稱分別代表執行層與共識層的規格變更。這些變更共同為[以太坊](/)使用者、開發者與驗證者帶來了許多改善。

此次升級已於 **2025 年 5 月 7 日 10:05 (UTC)** 在以太坊主網的紀元 `364032` 成功啟動。

<Alert variant="update">
<AlertContent>
<AlertDescription>
佩克特拉升級只是以太坊長期發展目標中的一步。了解更多關於[協定路線圖](/roadmap/)與[過往升級](/ethereum-forks/)的資訊。
</AlertDescription>
</AlertContent>
</Alert>

## 佩克特拉的改善 {#new-improvements}

佩克特拉帶來了歷次升級中數量最多的 [EIP](https://eips.ethereum.org/)！其中包含許多微小的變更，但也有一些重要的新功能。完整的變更清單與技術細節可以在各個包含的 EIP 中找到。

### 外部擁有帳戶 (EOA) 程式碼 {#7702}

[EIP-7702](https://eips.ethereum.org/EIPS/eip-7702) 代表了邁向廣泛[帳戶抽象化](/roadmap/account-abstraction/)的重要一步。透過這項功能，使用者可以設定將其地址（[EOA](/glossary/#eoa)）擴展為智能合約。該 EIP 引入了一種具有特定功能的新型交易——允許地址擁有者簽署授權，將其地址設定為模擬所選的智能合約。 

藉由這個 EIP，使用者可以選擇使用可程式化錢包，這些錢包允許交易綑綁、免燃料 (gasless) 交易，以及為替代恢復方案自訂資產存取等新功能。這種混合方法結合了 EOA 的簡單性與基於合約之帳戶的可程式化特性。 

在[這裡](/roadmap/pectra/7702/)深入了解 7702

### 提高最大有效餘額 {#7251}

驗證者目前的有效餘額正好是 32 ETH。這是參與共識所需的最低金額，但同時也是單一驗證者可以質押的最大金額。

[EIP-7251](https://eips.ethereum.org/EIPS/eip-7251) 將最大可能的有效餘額提高到 2048 ETH，這意味著單一驗證者現在可以質押 32 到 2048 ETH 之間的金額。質押者現在可以選擇任意數量的 ETH 進行質押，而不是 32 的倍數，並且在超過最低限額的每 1 ETH 上都能獲得獎勵。例如，如果驗證者的餘額隨著獎勵增加到 33 ETH，額外的 1 ETH 也會被視為有效餘額的一部分並獲得獎勵。

但為驗證者提供更好的獎勵系統只是這項改善的一部分好處。運行多個驗證者的[質押者](/staking/)現在可以將它們合併為單一驗證者，這使得操作更加容易並減少了網路負載。因為信標鏈中的每個驗證者在每個紀元都會提交一個簽章，頻寬需求會隨著驗證者數量的增加以及大量需要傳播的簽章而增長。合併驗證者將減輕網路的負載，並在保持相同經濟安全性的同時開啟新的擴展選項。

在[這裡](/roadmap/pectra/maxeb/)深入了解 MaxEB

### 資料塊吞吐量增加 {#7691}

資料塊為 L2 提供了[資料可用性](/developers/docs/data-availability/#data-availability-and-layer-2-rollups)。它們是在[上一次網路升級](/roadmap/dencun/)中引入的。 

目前，網路的目標是每個區塊平均 3 個資料塊，最多 6 個資料塊。透過 [EIP-7691](https://eips.ethereum.org/EIPS/eip-7691)，平均資料塊數量將增加到 6 個，每個區塊最多 9 個，從而增加了以太坊匯總的容量。這個 EIP 有助於在 [PeerDAS](https://eips.ethereum.org/EIPS/eip-7594) 實現更高的資料塊數量之前作為過渡。

### 增加呼叫資料成本 {#7623}

在 [Dencun 升級引入資料塊](/roadmap/danksharding)之前，L2 使用[呼叫資料](/developers/docs/data-availability/blockchain-data-storage-strategies/#calldata)將其資料儲存在以太坊中。資料塊和呼叫資料都會影響以太坊的頻寬使用。雖然大多數區塊只使用極少量的呼叫資料，但同時包含許多資料塊的資料密集型區塊可能會對以太坊的 P2P 網路造成損害。 

為了解決這個問題，[EIP-7623](https://eips.ethereum.org/EIPS/eip-7623) 提高了呼叫資料的定價，但僅針對資料密集型交易。這限制了最壞情況下的區塊大小，為 L2 提供了僅使用資料塊的誘因，並使超過 99% 的交易不受影響。

### 執行層可觸發的退出 {#7002}

目前，退出驗證者並[提取已質押的 ETH](/staking/withdrawals/) 是一項共識層操作，需要活躍的驗證者金鑰，也就是驗證者用來執行證明等活躍職責的同一個 BLS 金鑰。提款憑證是一個獨立的冷金鑰，用於接收退出的質押，但無法觸發退出。質押者退出的唯一方法是使用活躍的驗證者金鑰簽署，向信標鏈網路發送一則特殊訊息。在提款憑證和驗證者金鑰由不同實體持有，或驗證者金鑰遺失的情況下，這會造成限制。

[EIP-7002](https://eips.ethereum.org/EIPS/eip-7002) 引入了一個新合約，可用於透過執行層提款憑證來觸發退出。質押者將能夠透過呼叫這個特殊合約中的函式來退出其驗證者，完全不需要他們的驗證者簽署金鑰或存取信標鏈。重要的是，啟用鏈上驗證者提款，使得質押協定能夠減少對節點營運者的信任假設。

### 鏈上驗證者存款 {#6110}

驗證者存款目前由 [eth1data poll](https://eth2book.info/capella/part2/deposits-withdrawals/deposit-processing/) 處理，這是信標鏈上從執行層獲取資料的函式。這算是合併前留下的技術債，當時信標鏈是一個獨立的網路，必須處理工作量證明 (PoW) 的區塊重組問題。 

[EIP-6110](https://eips.ethereum.org/EIPS/eip-6110) 是一種將存款從執行層傳遞到共識層的新方法，它允許即時處理並降低了實作的複雜性。這是合併後以太坊原生處理存款的一種更安全的方式。它也有助於協定適應未來的發展，因為它不需要歷史存款來啟動節點，這對於歷史記錄過期是必要的。

### BLS12-381 的預編譯合約 {#2537}

預編譯合約是一組直接內建於以太坊虛擬機（[EVM](/developers/docs/evm/)）中的特殊智能合約。與一般合約不同，預編譯合約不是由使用者部署的，而是客戶端實作本身的一部分，以其原生語言（例如 Go、Java 等，而不是 Solidity）編寫。預編譯合約用於廣泛使用且標準化的功能，例如密碼學操作。智能合約開發者可以像呼叫一般合約一樣呼叫預編譯合約，但具有更高的安全性和效率。

[EIP-2537](https://eips.ethereum.org/EIPS/eip-2537) 為 [BLS12-381](https://hackmd.io/@benjaminion/bls12-381) 上的曲線操作新增了預編譯合約。由於其具備實用的特性，這種橢圓曲線在加密貨幣生態系統中被廣泛使用。更具體地說，它已被以太坊的共識層採用，供驗證者使用。

新的預編譯合約讓每位開發者都能輕鬆、高效且安全地使用這條曲線執行密碼學操作，例如驗證簽章。依賴這條曲線的鏈上應用程式可以透過依賴預編譯合約而不是某些自訂合約，變得更具燃料效率且更安全。這主要適用於想要在 EVM 內部推論驗證者的應用程式，例如質押池、[再質押](/restaking/)、輕客戶端、跨鏈橋，以及零知識應用。

### 從狀態提供歷史區塊雜湊 {#2935}

EVM 目前提供 `BLOCKHASH` 操作碼，使合約開發者能夠直接在執行層中擷取區塊的雜湊。然而，這僅限於最近的 256 個區塊，未來可能會對無狀態客戶端造成問題。

[EIP-2935](https://eips.ethereum.org/EIPS/eip-2935) 建立了一個新的系統合約，可以將最近的 8192 個區塊雜湊作為儲存槽提供。這有助於協定適應未來的無狀態執行，並在採用 Verkle 樹時變得更有效率。然而，除此之外，匯總可以立即從中受益，因為它們可以直接以更長的歷史視窗查詢該合約。

### 將委員會索引移出證明 {#7549}

信標鏈共識是基於驗證者對最新區塊和已定案紀元進行投票。證明包含 3 個元素，其中 2 個是投票，第 3 個是委員會索引值。

[EIP-7549](https://eips.ethereum.org/EIPS/eip-7549) 將此索引移出已簽署的證明訊息之外，這使得驗證和聚合共識投票變得更加容易。這將提高每個共識客戶端的效率，並能為證明以太坊共識的零知識電路帶來顯著的效能改善。

### 將資料塊排程新增至執行層設定檔 {#7840}

[EIP-7840](https://eips.ethereum.org/EIPS/eip-7840) 是一個簡單的變更，它在執行層客戶端設定中新增了一個新欄位。它設定了區塊數量，允許動態設定每個區塊的目標和最大資料塊數量，以及 blob 費用調整。透過直接定義的設定，客戶端可以避免透過引擎 API (Engine API) 交換此資訊的複雜性。

<Alert variant="update">
<AlertContent>
<AlertDescription>
若要深入了解佩克特拉 (Pectra) 對您作為以太坊使用者、開發者或驗證者的具體影響，請查看 <a href="https://epf.wiki/#/wiki/pectra-faq">Pectra 常見問題</a>。
</AlertDescription>
</AlertContent>
</Alert>

## 這次升級會影響所有以太坊節點和驗證者嗎？ {#client-impact}

是的，佩克特拉升級需要同時更新[執行客戶端與共識客戶端](/developers/docs/nodes-and-clients/)。所有主要的以太坊客戶端都將發布支援此硬分叉的版本，並標記為高優先級。為了在升級後保持與以太坊網路的同步，節點營運者必須確保他們運行的是受支援的客戶端版本。請注意，關於客戶端發布的資訊具有時效性，使用者應參考最新更新以獲取最新詳細資訊。

## 硬分叉後如何轉換 ETH？ {#scam-alert}

- **您的 ETH 無需採取任何行動**：在以太坊佩克特拉升級之後，您不需要轉換或升級您的 ETH。您的帳戶餘額將保持不變，且您目前持有的 ETH 在硬分叉後仍可以現有形式存取。
- **當心詐騙！** <Emoji text="⚠️" /> **任何指示您「升級」ETH 的人都是企圖詐騙您。** 關於這次升級，您不需要做任何事情。您的資產將完全不受影響。請記住，保持資訊更新是防範詐騙的最佳防線。

[更多關於識別與避免詐騙的資訊](/security/)

## 比較喜歡視覺化學習？ {#visual-learner}

<VideoWatch slug="pectra-upgrade-overview" />

_佩克特拉升級包含了什麼？ - Christine Kim_

<VideoWatch slug="pectra-what-stakers-need-to-know" />

_以太坊佩克特拉升級：質押者需要知道的事 — Blockdaemon_

## 延伸閱讀
- [以太坊路線圖](/roadmap/)
- [佩克特拉常見問題](https://epf.wiki/#/wiki/pectra-faq)
- [佩克特拉如何提升質押者體驗](https://www.kiln.fi/post/next-ethereum-upgrade-how-pectra-will-enhance-the-staking-experience)
- [EIP-7702 資訊頁面](https://eip7702.io/)
- [佩克特拉開發者網路](https://github.com/ethereum/pm/blob/master/Network-Upgrade-Archive/Pectra/pectra-pm.md)
