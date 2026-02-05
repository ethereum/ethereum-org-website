---
title: 驗證智慧型合約
description: 以太坊智慧型合約原始程式碼驗證概覽
lang: zh-tw
---

[智能合約](/developers/docs/smart-contracts/) 的設計是「去信任」，這表示使用者在與合約互動前不需要信任第三方（例如，開發者和公司）。 作為實現去信任化的必要條件，使用者和其他開發者必須能夠驗證智慧型合約的原始程式碼。 原始程式碼驗證可確保使用者和開發者所發佈的合約程式碼，與在以太坊區塊鏈上的合約地址執行的程式碼相同。

區分「原始程式碼驗證」和「[形式化驗證](/developers/docs/smart-contracts/formal-verification/)」是很重要的。 原始程式碼驗證（將在下面詳細解釋）指的是驗證以高階語言（例如 Solidity）編寫的智能合約之給定原始程式碼，是否被編譯為在合約地址執行的相同位元組碼。 而形式驗證描述的是驗證智慧型合約的正確性，亦即合約是否按預期執行。 雖然需要依情境而定，但合約驗證通常指原始程式碼驗證。

## 甚麼是原始程式碼驗證？ {#what-is-source-code-verification}

在 [以太坊虛擬機 (EVM)](/developers/docs/evm/) 中部署智能合約之前，開發者會將合約的原始程式碼（以 [Solidity](/developers/docs/smart-contracts/languages/) 或其他高階程式語言撰寫的指令）[編譯](/developers/docs/smart-contracts/compiling/)為位元組碼。 由於以太坊虛擬機無法解釋高階指令，把原始程式碼編譯為位元組碼（即低階機器指令）是在以太坊虛擬機中執行合約邏輯的必需步驟。

原始程式碼驗證會將智慧型合約的原始程式碼與合約建立時使用的編譯位元組碼進行比較，以偵測任何差異。 驗證智慧型合約很重要，因為宣傳的合約程式碼可能與在區塊鏈上執行的程式碼有所不同。

經過驗證的智慧型合約讓人可以透過編寫它的高階語言來研究合約的功能，而不必閱讀機器程式碼。 函式、值，通常還有變數名稱和註解，都會與編譯和部署時的原始程式碼相同。 這使閱讀程式碼更為容易。 原始碼驗證還會提供程式碼文件，讓終端使用者能夠了解智慧型合約的設計用途。

### 什麼是完整驗證？ {#full-verification}

原始程式碼中有部分內容不會影響到編譯後的位元組碼，例如註解和變數名稱。 這意味著，即使兩份原始程式碼使用不同的變數名稱和註解，也能驗證相同的合約。 這樣一來，惡意行為者可以在原始程式碼中新增欺騙性的註解或給予誤導性的變數名稱，並使用與最初的原始程式碼不同的原始程式碼來驗證合約。

可以透過在位元組碼中附加額外資料來避免這種情況，這些資料會用作原始程式碼準確性的_加密保證_，以及編譯資訊的_指紋_。 必要的資訊可以在 [Solidity 的合約中繼資料](https://docs.soliditylang.org/en/v0.8.15/metadata.html) 中找到，該檔案的哈希會附加到合約的位元組碼中。 您可以在 [中繼資料遊樂場](https://playground.sourcify.dev) 看到實際運作

中繼資料檔案包含了合約編譯的相關資訊，包括原始碼檔案及其雜湊值。 也就是說，如果任何一個編譯設定，甚至其中一個原始碼檔案中的一個位元組發生變化，中繼資料檔案就會改變。 因此，附加到位元組碼的中繼資料檔案之雜湊值也就隨之改變了。 這表示，如果某合約的位元組碼 + 附加的中繼資料雜湊值與給定的原始程式碼及編譯設定相符，則我們可以確定這與原始編譯中所用的原始程式碼完全相同，連一個位元組都不差。

這種利用中繼資料哈希的驗證類型被稱為 **「[完整驗證](https://docs.sourcify.dev/docs/full-vs-partial-match/)」**（也稱為「完美驗證」）。 如果中繼資料雜湊值不符，或者在驗證過程中未考慮該部分，則這種驗證會是「部分相符」，這是目前較常見的合約驗證方式。 若沒有完整驗證，就有可能[插入惡意程式碼](https://samczsun.com/hiding-in-plain-sight/)，而這些惡意程式碼不會反映在已驗證的原始程式碼中。 大多數開發者不了解完整驗證，在編譯時沒有保留中繼資料檔案，因此部分驗證也就成為了大家迄今習以為常的智慧型合約驗證方式。

## 為何原始程式碼驗證很重要？ {#importance-of-source-code-verification}

### 去信任 {#trustlessness}

去信任可以說是智能合約和[去中心化應用程式 (dapp)](/developers/docs/dapps/) 的最大前提。 智慧型合約是「不可變」的，且無法修改；合約只會執行部署時在程式碼中定義好的商業邏輯。 這表示開發者和企業在以太坊上部署合約後，無法篡改其程式碼。

要成為去信任化的智慧型合約，合約的程式碼應可供獨立驗證。 雖然每個智慧型合約編譯過的位元組碼都公開在區塊鏈上，但低階語言很難理解，對開發者和使用者來說皆是如此。

專案透過發佈其合約的原始程式碼來降低信任假設。 不過這導致了另一個問題：要驗證發佈的原始程式碼與合約的位元組碼是否相符會很困難。 在此情況下會失去去信任化的價值，因為使用者必須信任開發者在將合約部署至區塊鏈前，不會變更合約的商業邏輯（即透過變更位元組碼）。

原始程式碼驗證工具保證了智慧型合約的原始程式碼檔案與組譯程式碼相符。 這會得到一個去信任的生態系統，使用者不用盲目信任第三方，而是在將資金存入合約前對程式碼進行驗證。

### 使用者安全 {#user-safety}

智能合約中通常會質押大量資金。 這就需要更高的安全保證，並在使用智慧型合約之前驗證其邏輯。 問題在於，不擇手段的開發者可以透過在智慧型合約中植入惡意程式碼來欺騙使用者。 若未經驗證，惡意智能合約可能會藏有[後門](https://www.trustnodes.com/2018/11/10/concerns-rise-over-backdoored-smart-contracts)、具爭議性的存取控制機制、可被利用的漏洞，以及其他會危及使用者安全卻未被偵測到的事物。

公開發佈智慧型合約原始程式碼可以讓有興趣的人（比如智慧型合約的審核者）更容易評估該合約的潛在攻擊媒介。 透過多方獨立驗證，智慧型合約的安全性對使用者來說更有保障。

## 如何驗證以太坊智能合約的原始程式碼 {#source-code-verification-for-ethereum-smart-contracts}

[在以太坊上部署智能合約](/developers/docs/smart-contracts/deploying/) 需要傳送一筆帶有資料酬載（已編譯的位元組碼）的交易到一個特殊地址。 資料酬載是透過編譯原始程式碼產生，再加上合約實例的 [建構函式參數](https://docs.soliditylang.org/en/v0.8.14/contracts.html#constructor) 附加到交易的資料酬載中。 編譯是確定性的，也就是說，只要使用相同的原始碼檔案及編譯設定（如編譯器版本、最佳化工具），每次都能產生相同的輸出（即合約位元組碼）。

![顯示智能合約原始程式碼驗證的圖表](./source-code-verification.png)

驗證智慧型合約主要包含以下步驟：

1. 將原始碼檔案和編譯設定輸入編譯器。

2. 編譯器輸出合約的位元組碼

3. 取得部署到給定地址的合約的位元組碼

4. 比較部署的位元組碼和重新編譯的位元組碼。 如果相符，則表示合約通過了採用給定原始程式碼和編譯設定的驗證。

5. 此外，如果位元組碼尾端的中繼資料雜湊值相符，則屬於完全相符。

請注意，這只是對驗證的簡化描述，有很多例外情況不適用，例如有[不可變的變數](https://docs.sourcify.dev/docs/immutables/)。

## 原始程式碼驗證工具 {#source-code-verification-tools}

傳統的合約驗證過程可能非常複雜。 這也是我們使用工具來驗證部署到以太坊上的智慧型合約之原始程式碼的原因。 這些工具自動化了大部分原始程式碼驗證過程，還會整理出經過驗證的合約，讓使用者更加便利。

### Etherscan {#etherscan}

雖然 Etherscan 主要為人所知的是 [以太坊區塊鏈瀏覽器](/developers/docs/data-and-analytics/block-explorers/)，但它也為智能合約開發者和使用者提供[原始程式碼驗證服務](https://etherscan.io/verifyContract)。

Etherscan 讓你可以從原始資料承載（原始程式碼、程式庫地址、編譯器設定、合約地址等）重新編譯合約位元組碼。 如果重新編譯的位元組碼與鏈上合約的位元組碼（及建構函式參數）相關，那麼 [該合約就已驗證](https://info.etherscan.com/types-of-contract-verification/)。

一經驗證，合約的原始程式碼會收到一個「已驗證」標籤，並會發佈到 Etherscan 供其他人審核。 它也會被新增到 [Verified Contracts](https://etherscan.io/contractsVerified/) 區塊——一個存放具有已驗證原始程式碼的智能合約的儲存庫。

Etherscan 是最常用的合約驗證工具。 然而，Etherscan 的合約驗證有一個缺點：它無法比較鏈上位元組碼和重新編譯的位元組碼的 **中繼資料哈希**。 因此，Etherscan 中的符合屬於部分符合。

[更多關於在 Etherscan 上驗證合約的資訊](https://medium.com/etherscan-blog/verifying-contracts-on-etherscan-f995ab772327)。

### Blockscout {#blockscout}

[Blockscout](https://blockscout.com/) 是一個開源的區塊鏈瀏覽器，也為智能合約開發者和使用者提供[合約驗證服務](https://eth.blockscout.com/contract-verification)。 作為一個開源的替代方案，Blockscout 提供了驗證執行方式的透明度，並讓社群能夠貢獻以改善驗證過程。

與其他驗證服務類似，Blockscout 允許您透過重新編譯位元組碼，並將其與已部署的合約進行比較，來驗證您合約的原始程式碼。 一旦驗證完成，您的合約就會收到驗證狀態，其原始程式碼也會公開，以供審計和互動。 已驗證的合約也會列在 Blockscout 的[已驗證合約儲存庫](https://eth.blockscout.com/verified-contracts)中，以便輕鬆瀏覽和發現。

### Sourcify {#sourcify}

[Sourcify](https://sourcify.dev/#/verifier) 是另一個用於驗證合約的工具，它本身是開源且去中心化的。 它不是區塊鏈瀏覽器，只驗證[不同基於 EVM 的網路](https://docs.sourcify.dev/docs/chains)上的合約。 它作為一個公共基礎設施，供其他工具在此之上建構，並旨在利用中繼資料檔案中的 [ABI](/developers/docs/smart-contracts/compiling/#web-applications) 和 [NatSpec](https://docs.soliditylang.org/en/v0.8.15/natspec-format.html) 註解，來實現更人性化的合約互動。

跟 Etherscan 不同，Sourcify 支援與中繼資料雜​​湊值的完全符合。 已驗證的合約透過 HTTP 和 [IPFS](https://docs.ipfs.io/concepts/what-is-ipfs/#what-is-ipfs) 在其[公共儲存庫](https://docs.sourcify.dev/docs/repository/)中提供，IPFS 是一種去中心化的[內容定址](https://docs.storacha.network/concepts/content-addressing/)儲存方式。 這樣可以透過星際檔案系統取得合約的中繼資料檔案，因為附加的中繼資料雜湊值就是星際檔案系統雜湊值。

此外，也可以透過星際檔案系統取得原始程式碼檔案，因為這些檔案的星際檔案系統雜湊值也可以在中繼資料中找到。 合約可以透過其 API 或 [UI](https://sourcify.dev/#/verifier) 提供中繼資料檔案和原始碼檔案，或使用外掛程式進行驗證。 Sourcify 的監控工具也會監聽新區塊中的合約建立，並在該合約的中繼資料及原始碼檔案發佈到星際檔案系統的情況下嘗試驗證該合約。

[更多關於在 Sourcify 上驗證合約的資訊](https://soliditylang.org/blog/2020/06/25/sourcify-faq/)。

### Tenderly {#tenderly}

[Tenderly 平台](https://tenderly.co/) 讓 Web3 開發者能夠建立、測試、監控和操作智能合約。 透過將偵錯工具與可觀測性及基礎設施建置區塊相結合，Tenderly 協助開發者加速開發智慧型合約。 要完全啟用 Tenderly 的功能，開發者需要使用多種方法來[執行原始程式碼驗證](https://docs.tenderly.co/monitoring/contract-verification)。

私下或公開地驗證合約皆可行。 如果私下驗證，則智慧型合約僅對你（以及專案中的其他成員）可見。 公開驗證合約會讓合約對使用 Tenderly 平台的每個人都可見。

您可以使用 [儀表板](https://docs.tenderly.co/contract-verification)、[Tenderly Hardhat 外掛](https://docs.tenderly.co/contract-verification/hardhat) 或 [CLI](https://docs.tenderly.co/monitoring/smart-contract-verification/verifying-contracts-using-cli) 來驗證您的合約。

透過儀表板驗證合約時，需要匯入原始碼檔案或 Solidity 編譯器產生的中繼資料檔案、地址/網路及編譯器設定。

使用 Tenderly Hardhat 外掛程式可以更輕鬆、更全面地控制驗證流程，在自動化（無程式碼）和手動（基於程式碼）這兩種驗證方式之間選擇。

## 延伸閱讀 {#further-reading}

- [驗證合約原始程式碼](https://programtheblockchain.com/posts/2018/01/16/verifying-contract-source-code/)
