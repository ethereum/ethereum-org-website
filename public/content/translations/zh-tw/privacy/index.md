---
title: "以太坊上的隱私"
description: "在以太坊上保護隱私的工具與技術"
lang: zh-tw
---

隱私不僅對個人安全至關重要，更是自由的基石，也是[去中心化的關鍵保障](https://vitalik.eth.limo/general/2025/04/14/privacy.html)。隱私賦予人們自由表達、與他人交易以及組織社群的能力。但就像所有區塊鏈一樣，以太坊的公開帳本讓隱私保護充滿挑戰。

以太坊在設計上是透明的。每一個鏈上操作對任何人都是可見的。雖然以太坊透過將你的活動連結到[公鑰](/decentralized-identity/#public-key-cryptography)而非現實世界的身分來提供假名性，但活動模式仍可能被分析，進而洩露敏感資訊並識別出使用者。

在以太坊中建立保護隱私的工具，可以幫助個人、組織和機構安全地互動，同時限制不必要的曝光。這使得生態系統更安全，也更適用於廣泛的使用案例。

<VideoWatch slug="privacy-is-existential" />

## 寫入隱私 {#privacy-of-writes}

預設情況下，寫入以太坊的每一筆交易都是公開且永久的。這不僅包括發送 ETH，還包括註冊 ENS 名稱、收集 POAP 或交易 NFT。像支付、投票或身分驗證等日常操作，都可能將你的資訊洩露給非預期的對象。有幾種工具和技術可以幫助讓這些操作更具隱私性：

### 混幣協定（或稱「混幣器」） {#mixing-protocols}

混幣器透過將許多使用者的交易放入一個共享的「池子」中，然後讓人們稍後提款到一個全新的地址，藉此打破發送者和接收者之間的連結。由於存款和提款混雜在一起，觀察者要將它們關聯起來就困難得多。

_範例：[PrivacyPools](https://docs.privacypools.com/)、[Tornado Cash](https://tornado.cash/)_

### 屏蔽池 {#shielded-pools}

屏蔽池類似於混幣器，但它們允許使用者在池子內部私密地持有和轉帳資金。屏蔽池不僅僅是掩蓋存款和提款之間的連結，還維持著一個持續的私密狀態，通常由零知識證明來保障安全。這使得建立私密轉帳、私密餘額等功能成為可能。

_範例：[Railgun](https://www.railgun.org/)、[Aztec](https://aztec.network/)、Nightfall_

### 隱形地址 {#stealth-addresses}

[隱形地址](https://vitalik.eth.limo/general/2023/01/20/stealth.html)就像是給每個發送者一個只有你能打開的獨特、一次性郵政信箱。每次有人發送加密貨幣給你時，它都會進入一個全新的地址，因此沒有其他人能看出所有這些付款都屬於你。這能保持你的付款歷史私密且更難以追蹤。

_範例：[UmbraCash](https://app.umbra.cash/faq)、[FluidKey](https://www.fluidkey.com/)_

### 其他使用案例 {#other-use-cases}

其他探索私密寫入的專案包括 [PlasmaFold](https://pse.dev/projects/plasma-fold)（私密支付）以及像 [MACI](https://pse.dev/projects/maci) 和 [Semaphore](https://pse.dev/projects/semaphore) 這樣的系統（私密投票）。

這些工具擴展了在以太坊上私密寫入的選項，但每種工具都有其權衡。有些方法仍處於實驗階段，有些會增加成本或複雜性，而像混幣器這樣的工具，根據其使用方式，可能會面臨法律或監管審查。

## 讀取隱私 {#privacy-of-reads}

在以太坊上讀取或檢查任何資訊（例如你的錢包餘額）通常會透過某個服務進行，例如你的錢包提供商、節點提供商或區塊鏈瀏覽器。因為你依賴它們為你讀取區塊鏈，它們也能看到你的請求以及像 IP 地址或位置這樣的中繼資料。如果你不斷檢查同一個帳戶，這些資訊就可以被拼湊起來，將你的身分與你的活動連結在一起。

執行你自己的以太坊節點可以防止這種情況，但儲存和同步完整的區塊鏈對大多數使用者來說仍然昂貴且不切實際，尤其是在行動裝置上。

一些探索私密讀取的專案包括 [私密資訊檢索](https://hackmd.io/@brech1/ethereum-privacy-pir?utm_source=preview-mode&utm_medium=rec)（Private Information Retrieval, PIR，在不洩露查詢內容的情況下獲取資料）、[zkID](https://hackmd.io/@brech1/ethereum-privacy-pir?utm_source=preview-mode&utm_medium=rec)（使用零知識證明進行私密身分檢查）、[vOPRF](https://pse.dev/projects/voprf)（在 Web3 中以假名使用 Web2 帳戶）、[vFHE](https://pse.dev/blog/zero-to-start-applied-fully-homomorphic-encryption-fhe-part-1)（在加密資料上進行運算），以及 [MachinaIO](https://pse.dev/projects/machina-io)（在保持功能的同時隱藏程式細節）。

## 證明隱私 {#privacy-of-proving}

保護隱私的證明是你可以用在以太坊上的工具，用來證明某件事是真實的，而無需洩露不必要的細節。例如，你可以：

- 證明你已年滿 18 歲，而無需分享完整的出生日期
- 證明擁有某個 NFT 或代幣，而無需洩露你整個錢包的資訊
- 證明具備會員資格、獎勵申領資格或投票資格，而無需暴露其他個人資料

大多數這類工具依賴於像零知識證明這樣的密碼學技術，但挑戰在於如何讓它們足夠高效以在日常裝置上執行、可移植到任何平台，並且安全可靠。

一些探索證明隱私的專案包括 [客戶端證明](https://pse.dev/projects/client-side-proving)（ZK 證明系統）、[TLSNotary](https://tlsnotary.org/)（網路上任何資料的真實性證明）、[Mopro](https://pse.dev/projects/mopro)（行動裝置客戶端證明）、[私密證明委託](https://pse.dev/projects/private-proof-delegation)（避免信任假設的委託框架），以及 [Noir](https://noir-lang.org/)（用於私密且可驗證運算的語言）。

## 隱私詞彙表 {#privacy-glossary}

**匿名**：在互動時將所有識別碼從你的資料中永久移除，使得資訊無法追溯到個人

**加密**：一種將資料打亂的過程，使得只有擁有正確金鑰的人才能讀取它

**[全同態加密](https://pse.dev/blog/zero-to-start-applied-fully-homomorphic-encryption-fhe-part-1) (FHE)**：一種直接在加密資料上執行運算而無需解密的方法

**[不可區分混淆](https://pse.dev/projects/machina-io) (iO)**：使程式或資料變得難以理解但仍可使用的隱私技術

**[多方運算](https://pse.dev/blog/secure-multi-party-computation) (MPC)**：允許多方共同計算出結果，而不會暴露其私密輸入的方法

**可程式化密碼學**：靈活、由規則驅動的密碼學，可在軟體中自訂，以控制資料分享、驗證或揭露的方式與時機

**假名**：使用獨特的代碼或數字（如以太坊地址）來代替個人識別碼

**選擇性揭露**：僅分享所需資訊的能力（例如，證明你擁有某個 NFT，而無需洩露你整個錢包的歷史紀錄）

**不可連結性**：確保區塊鏈上獨立的操作無法被追溯到同一個地址

**可驗證性**：確保其他人可以確認某個聲明是真實的，例如在以太坊上驗證一筆交易或證明

**可驗證委託**：將任務（如產生證明）指派給另一方（例如，行動錢包使用伺服器進行繁重的密碼學運算），同時仍能驗證該任務是否正確完成

**[零知識證明](/zero-knowledge-proofs/#why-zero-knowledge-proofs-are-important) (ZKPs)**：一種密碼學協定，讓某人能證明資訊是真實的，而無需洩露底層資料

**ZK 匯總**：一種擴容系統，在鏈下批次處理交易並在鏈上提交有效性證明——預設情況下不具備隱私性，但它們透過降低成本，實現了高效的隱私系統（如屏蔽池）

## 資源 {#resources}

- [以太坊隱私守護者](https://pse.dev/) (Privacy Stewards of Ethereum, PSE)，一個專注於生態系統隱私的以太坊基金會研發實驗室
- [Web3PrivacyNow](https://web3privacy.info/)，一個由保護並推動線上人權的個人、專案及理念一致的組織所組成的網路
- [WalletBeat](https://beta.walletbeat.eth.limo/wallet/summary/)，一個以太坊錢包評分網站，旨在提供錢包的全面清單、其功能、實務做法以及對特定標準的支援情況。
- [Zk-kit](https://zkkit.org/)：一組可在不同專案和零知識協定中重複使用的函式庫（演算法、公用程式函式和資料結構）。
- [隱私應用程式](/apps/categories/privacy/) - 探索在以太坊上執行的精選隱私應用程式清單。
