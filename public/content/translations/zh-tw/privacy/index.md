---
title: 以太坊上的隱私
description: 在以太坊上保護您隱私的工具與技術
lang: zh-tw
---

# 以太坊上的隱私 {#introduction}

隱私不僅對個人安全至關重要，也是自由的基石，更是[去中心化的關鍵保障](https://vitalik.eth.limo/general/2025/04/14/privacy.html)。 隱私讓人們能夠自由地表達自我、與他人交易，以及組織社群。 但如同所有區塊鏈一樣，以太坊的公開帳本讓保護隱私變得充滿挑戰。

以太坊的設計本身就是透明的。 所有鏈上活動對任何查看者都是可見的。 雖然以太坊透過將您的活動連結至[公鑰](/decentralized-identity/#public-key-cryptography)而非現實世界的身分來提供匿名性，但活動模式可能會被分析，從而洩露敏感資訊並識別使用者。

將保護隱私的工具建構到以太坊中，可以幫助個人、組織和機構安全地互動，同時限制不必要的資訊暴露。 這使得生態系對於更廣泛的使用案例而言更安全、更實用。

## 寫入隱私 {#privacy-of-writes}

根據預設，在以太坊上寫入的每筆交易都是公開且永久的。 這不僅包括傳送 ETH，還包括註冊 ENS 名稱、收集 POAP，或交易 NFT。 付款、投票或身分驗證等日常行為，可能會將您的資訊洩露給非預期的對象。 有幾種工具和技術可以幫助提高這些行為的隱私性：

### 混幣協議 (或 "混幣器") {#mixing-protocols}

混幣器將許多使用者的交易放入一個共享的 "資金池"，然後讓使用者稍後提款至一個新地址，藉此打破發送者和接收者之間的連結。 由於存款和提款混雜在一起，觀察者很難將它們連結起來。

_範例：[PrivacyPools](https://docs.privacypools.com/)、[Tornado Cash](https://tornado.cash/)_

### 隱蔽池 {#shielded-pools}

隱蔽池與混幣器相似，但它們允許使用者在池內私下持有和轉移資金。 隱蔽池不僅僅是模糊存款和提款之間的連結，它還會維持一個持續的私密狀態，通常使用零知識證明來確保安全。 這使得建立私密轉帳、私密餘額等成為可能。

_範例：[Railgun](https://www.railgun.org/)、[Aztec](https://aztec.network/)、Nightfall_

### 隱形地址 {#stealth-addresses}

一個[隱形地址](https://vitalik.eth.limo/general/2023/01/20/stealth.html) 就像給每個發送者一個獨一無二、一次性的私人信 箱，只有您能打開。 每次有人向您發送加密貨幣時，都會發送到一個新地址，所以沒有人能看到所有這些款項都屬於您。 這能讓您的支付歷史保持私密，且更難追蹤。

_範例：[UmbraCash](https://app.umbra.cash/faq)、[FluidKey](https://www.fluidkey.com/)_

### 其他使用案例 {#other-use-cases}

其他探索私密寫入的專案包括 [PlasmaFold](https://pse.dev/projects/plasma-fold) (私密支付) 以及像 [MACI](https://pse.dev/projects/maci) 和 [Semaphore](https://pse.dev/projects/semaphore) (私密投票) 這類的系統。

這些工具擴展了在以太坊上進行私密寫入的選項，但每種工具都有其權衡之處。 有些方法仍處於實驗階段，有些會增加成本或複雜性，而像混幣器這類的工具，則可能根據其使用方式面臨法律或監管審查。

## 讀取隱私 {#privacy-of-reads}

在以太坊上讀取或檢查任何資訊 (例如您的錢包餘額) 通常會透過錢包供應商、節點供應商或區塊瀏覽器等服務。 因為您依賴他們為您讀取區塊鏈，他們也能看到您的請求以及 IP 位址或位置等元數據。 如果您持續檢查同一個帳戶，這些資訊可能會被拼湊起來，將您的身分與您的活動連結。

執行您自己的以太坊節點可以避免這種情況，但對於大多數使用者來說，儲存和同步整個區塊鏈仍然成本高昂且不切實際，尤其是在行動裝置上。

一些探索私密讀取的專案包括 [Private Information Retrieval](https://hackmd.io/@brech1/ethereum-privacy-pir?utm_source=preview-mode&utm_medium=rec) (PIR，在不透露您查詢內容的情況下擷取資料)、[zkID](https://hackmd.io/@brech1/ethereum-privacy-pir?utm_source=preview-mode&utm_medium=rec) (使用零知識證明進行私密身分檢查)、[vOPRF](https://pse.dev/projects/voprf) (在 Web3 中匿名使用 Web2 帳戶)、[vFHE](https://pse.dev/blog/zero-to-start-applied-fully-homomorphic-encryption-fhe-part-1) (對加密資料進行運算) 和 [MachinaIO](https://pse.dev/projects/machina-io) (在保持功能的同時隱藏程式細節)。

## 證明的隱私 {#privacy-of-proving}

保護隱私的證明是您可以在以太坊上使用的工具，用以證明某事為真，而無需透露不必要的細節。 例如，您可以：

- 證明您已年滿 18 歲，而無需分享您的完整出生日期
- 證明您擁有某個 NFT 或代幣，而無需透露您的整個錢包
- 證明您有資格獲得會員資格、獎勵或投票權，而無需暴露其他個人資料

大多數用於這些目的的工具都依賴於像零知識證明這樣的密碼學技術，但挑戰在於如何讓它們在日常裝置上高效運行、可移植到任何平台，並確保安全。

一些探索證明隱私的專案包括 [Client Side Proving](https://pse.dev/projects/client-side-proving) (ZK 證明系統)、[TLSNotary](https://tlsnotary.org/) (網路上任何資料的真實性證明)、[Mopro](https://pse.dev/projects/mopro) (行動用戶端證明)、[Private Proof Delegation](https://pse.dev/projects/private-proof-delegation) (避免信任假設的委託框架) 和 [Noir](https://noir-lang.org/) (用於私密和可驗證運算的語言)。

## 隱私詞彙表 {#privacy-glossary}

**匿名**：在互動時，您的資料中所有識別碼都被永久移除，使得資訊無法追溯回個人

**加密**：一個將資料打亂的過程，只有擁有正確金鑰的人才能讀取

**[完全同態加密](https://pse.dev/blog/zero-to-start-applied-fully-homomorphic-encryption-fhe-part-1) (FHE)**：一種直接對加密資料執行運算而無需解密的方法

**[無法區分混淆](https://pse.dev/projects/machina-io) (iO)**：一種讓程式或資料在保持可用性的同時變得難以理解的隱私技術

**[多方運算](https://pse.dev/blog/secure-multi-party-computation) (MPC)**：允許多方在不暴露各自私密輸入的情況下共同計算出結果的方法

**可程式化密碼學**：一種靈活、由規則驅動的密碼學，可在軟體中自訂，以控制資料分享、驗證或揭露的方式和時機

**假名**：使用獨特的代碼或數字 (如以太坊地址) 來代替個人識別碼

**選擇性揭露**：僅分享必要資訊的能力 (例如，證明您擁有一個 NFT，而不透露您完整的錢包歷史)

**不可連結性**：確保在區塊鏈上的不同行為無法被追溯回同一個地址

**可驗證性**：確保他人可以確認某個聲明為真，例如在以太坊上驗證一筆交易或一個證明

**可驗證委派**：將一項任務—例如產生一個證明—指派給另一方 (例如，行動錢包使用伺服器進行繁重的密碼學運算)，同時仍能驗證其是否正確完成

**[零知識證明](/zero-knowledge-proofs/#why-zero-knowledge-proofs-are-important) (ZKP)**：一種密碼學協議，讓人們可以在不揭露底層資料的情況下，證明資訊為真

**ZK Rollup**：一種擴容系統，它在鏈下批次處理交易，並在鏈上提交有效性證明—預設情況下並非私密，但它們透過降低成本來實現高效的隱私系統 (如隱蔽池)

## 資源{#resources}

- [Privacy Stewards of Ethereum](https://pse.dev/) (PSE)，一個由以太坊基金會支持的研究與開發實驗室，專注於生態系的隱私保護
- [Web3PrivacyNow](https://web3privacy.info/)，一個由個人、專案和志同道合的組織組成的網路，致力於保護和促進線上的人權
- [WalletBeat](https://beta.walletbeat.eth.limo/wallet/summary/)，一個以太坊錢包評分網站，旨在提供一份詳盡的錢包清單，包含其功能、實務做法以及對特定標準的支援。
- [Zk-kit](https://zkkit.pse.dev/)：一套函式庫 (演算法、實用工具函式和資料結構)，可在不同的專案和零知識協議中重複使用。
- [隱私應用程式](/apps/categories/privacy/) - 探索在以太坊上執行的精選隱私應用程式清單。
