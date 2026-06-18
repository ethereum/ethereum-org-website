---
title: 驗證智能合約
description: 以太坊智能合約原始碼驗證概覽
lang: zh-tw
---

[智能合約](/developers/docs/smart-contracts/)被設計為「無須信任」，這意味著使用者在與合約互動之前，不應該需要信任第三方（例如開發人員和公司）。作為無須信任性的先決條件，使用者和其他開發人員必須能夠驗證智能合約的原始碼。原始碼驗證向使用者和開發人員保證，發布的合約程式碼與在以太坊區塊鏈上合約地址運行的程式碼完全相同。

區分「原始碼驗證」和「[形式化驗證](/developers/docs/smart-contracts/formal-verification/)」非常重要。將在下文詳細解釋的原始碼驗證，是指驗證給定的高階語言（例如 Solidity）智能合約原始碼，編譯後是否與在合約地址執行的位元組碼相同。然而，形式化驗證描述的是驗證智能合約的正確性，這意味著合約的行為符合預期。雖然取決於上下文，但合約驗證通常是指原始碼驗證。

## 什麼是原始碼驗證？ {#what-is-source-code-verification}

在[以太坊虛擬機 (EVM)](/developers/docs/evm/) 中部署智能合約之前，開發人員會將合約的原始碼（[以 Solidity](/developers/docs/smart-contracts/languages/) 或其他高階程式語言編寫的指令）[編譯](/developers/docs/smart-contracts/compiling/)為位元組碼。由於 EVM 無法直譯高階指令，因此將原始碼編譯為位元組碼（即低階機器指令）是在 EVM 中執行合約邏輯的必要步驟。

原始碼驗證是比較智能合約的原始碼與合約建立期間使用的已編譯位元組碼，以偵測任何差異。驗證智能合約很重要，因為宣稱的合約程式碼可能與在區塊鏈上運行的程式碼不同。

智能合約驗證能夠透過編寫合約的高階語言來調查合約的功能，而無須閱讀機器碼。函式、數值，通常還有變數名稱和註解，都與編譯和部署的原始碼保持一致。這使得閱讀程式碼變得容易許多。原始碼驗證也為程式碼文件提供了基礎，讓終端使用者了解智能合約的設計目的。

### 什麼是完全驗證？ {#full-verification}

原始碼中有些部分不會影響編譯後的位元組碼，例如註解或變數名稱。這意味著具有不同變數名稱和不同註解的兩個原始碼，都能夠驗證同一個合約。因此，惡意行為者可以在原始碼中加入欺騙性的註解或給予誤導性的變數名稱，並使用與原始碼不同的原始碼來通過合約驗證。

為了避免這種情況，可以將額外資料附加到位元組碼中，作為原始碼準確性的_密碼學保證_，以及編譯資訊的_指紋_。必要的資訊可以在 [Solidity 的合約中繼資料](https://docs.soliditylang.org/en/v0.8.15/metadata.html)中找到，而這個檔案的雜湊會附加到合約的位元組碼中。你可以在[中繼資料遊樂場](https://playground.sourcify.dev)中看到它的實際運作。

中繼資料檔案包含有關合約編譯的資訊，包括原始檔案及其雜湊。這意味著，如果任何編譯設定，甚至原始檔案中的一個位元組發生變化，中繼資料檔案就會改變。因此，附加到位元組碼的中繼資料檔案雜湊也會改變。這表示如果合約的位元組碼加上附加的中繼資料雜湊與給定的原始碼和編譯設定相符，我們就可以確定這與原始編譯中使用的原始碼完全相同，連一個位元組都不差。

這種利用中繼資料雜湊的驗證類型被稱為**「[完全驗證](https://docs.sourcify.dev/docs/full-vs-partial-match/)」**（也稱為「完美驗證」）。如果中繼資料雜湊不符或在驗證中未被考慮，則為「部分相符」，這是目前驗證合約較常見的方式。如果沒有完全驗證，就有可能[插入惡意程式碼](https://samczsun.com/hiding-in-plain-sight/)，而這些程式碼不會反映在已驗證的原始碼中。大多數開發人員並未意識到完全驗證，也沒有保留其編譯的中繼資料檔案，因此部分驗證一直是迄今為止驗證合約的實際標準方法。

## 為什麼原始碼驗證很重要？ {#importance-of-source-code-verification}

### 無須信任性 {#trustlessness}

無須信任性可以說是智能合約和[去中心化應用程式 (dapp)](/developers/docs/dapps/) 最大的前提。智能合約是「不可變的」且無法更改；合約只會執行部署時在程式碼中定義的商業邏輯。這意味著開發人員和企業在以太坊上部署後，無法竄改合約的程式碼。

為了讓智能合約具備無須信任性，合約程式碼應該可供獨立驗證。雖然每個智能合約的已編譯位元組碼在區塊鏈上都是公開可用的，但低階語言對於開發人員和使用者來說都很難理解。

專案透過發布其合約的原始碼來減少信任假設。但這導致了另一個問題：很難驗證發布的原始碼是否與合約位元組碼相符。在這種情況下，無須信任性的價值就喪失了，因為使用者必須信任開發人員在將合約部署到區塊鏈之前，不會更改合約的商業邏輯（即透過更改位元組碼）。

原始碼驗證工具提供了智能合約原始碼檔案與組合語言程式碼相符的保證。結果是一個無須信任的生態系統，使用者不會盲目信任第三方，而是在將資金存入合約之前驗證程式碼。

### 使用者安全 {#user-safety}

使用智能合約通常會牽涉到大量資金。這需要在利用智能合約之前，對其邏輯進行更高的安全保證和驗證。問題在於，不擇手段的開發人員可以透過在智能合約中插入惡意程式碼來欺騙使用者。如果沒有驗證，惡意智能合約可能會隱藏[後門](https://www.trustnodes.com/2018/11/10/concerns-rise-over-backdoored-smart-contracts)、具爭議的存取控制機制、可利用的漏洞，以及其他危害使用者安全卻未被發現的問題。

發布智能合約的原始碼檔案，可以讓有興趣的人（例如稽核員）更容易評估合約潛在的攻擊向量。透過多方獨立驗證智能合約，使用者對其安全性有更強的保證。

## 如何驗證以太坊智能合約的原始碼 {#source-code-verification-for-ethereum-smart-contracts}

[在以太坊上部署智能合約](/developers/docs/smart-contracts/deploying/)需要發送一筆帶有資料負載（已編譯位元組碼）的交易到一個特殊地址。資料負載是透過編譯原始碼產生的，加上合約實例的[建構函式參數](https://docs.soliditylang.org/en/v0.8.14/contracts.html#constructor)附加到交易的資料負載中。編譯是確定性的，這意味著如果使用相同的原始檔案和編譯設定（例如編譯器版本、最佳化器），它總是會產生相同的輸出（即合約位元組碼）。

![A diagram showing showing smart contract source code verification](./source-code-verification.png)

驗證智能合約基本上包含以下步驟：

1. 將原始檔案和編譯設定輸入到編譯器中。

2. 編譯器輸出合約的位元組碼。

3. 取得給定地址上已部署合約的位元組碼。

4. 比較已部署的位元組碼與重新編譯的位元組碼。如果程式碼相符，合約就會使用給定的原始碼和編譯設定進行驗證。

5. 此外，如果位元組碼末端的中繼資料雜湊相符，則為完全相符。

請注意，這是對驗證的簡化描述，有許多例外情況不適用於此，例如具有[不可變的變數](https://docs.sourcify.dev/docs/immutables/)。

## 原始碼驗證工具 {#source-code-verification-tools}

傳統的合約驗證過程可能很複雜。這就是為什麼我們有工具來驗證部署在以太坊上的智能合約原始碼。這些工具自動化了大部分的原始碼驗證工作，並為使用者的利益策展已驗證的合約。

### Etherscan {#etherscan}

雖然 Etherscan 主要以[以太坊區塊鏈瀏覽器](/developers/docs/data-and-analytics/block-explorers/)聞名，但它也為智能合約開發人員和使用者提供[原始碼驗證服務](https://etherscan.io/verifyContract)。

Etherscan 允許你從原始資料負載（原始碼、函式庫地址、編譯器設定、合約地址等）重新編譯合約位元組碼。如果重新編譯的位元組碼與鏈上合約的位元組碼（以及建構函式參數）相關聯，那麼[合約就已驗證](https://info.etherscan.com/types-of-contract-verification/)。

一旦驗證通過，你的合約原始碼就會獲得「已驗證 (Verified)」標籤，並發布在 Etherscan 上供他人稽核。它也會被新增到[已驗證合約](https://etherscan.io/contractsVerified/)區塊中——這是一個包含已驗證原始碼的智能合約儲存庫。

Etherscan 是最常被用來驗證合約的工具。然而，Etherscan 的合約驗證有一個缺點：它無法比較鏈上位元組碼和重新編譯位元組碼的**中繼資料雜湊**。因此，Etherscan 中的相符結果是部分相符。

[更多關於在 Etherscan 上驗證合約的資訊](https://medium.com/etherscan-blog/verifying-contracts-on-etherscan-f995ab772327)。

### Blockscout {#blockscout}

[Blockscout](https://blockscout.com/) 是一個開源的區塊鏈瀏覽器，也為智能合約開發人員和使用者提供[合約驗證服務](https://eth.blockscout.com/contract-verification)。作為一個開源的替代方案，Blockscout 提供了驗證執行方式的透明度，並允許社群貢獻以改善驗證過程。

與其他驗證服務類似，Blockscout 允許你透過重新編譯位元組碼並將其與已部署的合約進行比較，來驗證合約的原始碼。一旦驗證通過，你的合約就會獲得驗證狀態，且原始碼將公開可用以進行稽核和互動。已驗證的合約也會列在 Blockscout 的[已驗證合約儲存庫](https://eth.blockscout.com/verified-contracts)中，以便於瀏覽和探索。

### Sourcify {#sourcify}

[Sourcify](https://sourcify.dev/#/verifier) 是另一個用於驗證合約的工具，它是開源且去中心化的。它不是區塊鏈瀏覽器，僅驗證[不同基於 EVM 的網路](https://docs.sourcify.dev/docs/chains)上的合約。它作為公共基礎設施，供其他工具在其之上建構，並旨在利用中繼資料檔案中的 [ABI](/developers/docs/smart-contracts/compiling/#web-applications) 和 [NatSpec](https://docs.soliditylang.org/en/v0.8.15/natspec-format.html) 註解，實現更人性化的合約互動。

與 Etherscan 不同，Sourcify 支援與中繼資料雜湊的完全相符。已驗證的合約透過 HTTP 和 [IPFS](https://docs.ipfs.io/concepts/what-is-ipfs/#what-is-ipfs) 提供在其[公共儲存庫](https://docs.sourcify.dev/docs/repository/)中，IPFS 是一種去中心化的[內容定址](https://docs.storacha.network/concepts/content-addressing/)儲存。這允許透過 IPFS 擷取合約的中繼資料檔案，因為附加的中繼資料雜湊就是一個 IPFS 雜湊。

此外，人們也可以透過 IPFS 擷取原始碼檔案，因為這些檔案的 IPFS 雜湊也能在中繼資料中找到。可以透過其 API 或 [UI](https://sourcify.dev/#/verifier) 提供中繼資料檔案和原始檔案，或者使用外掛程式來驗證合約。Sourcify 監控工具也會監聽新區塊上的合約建立，如果它們的中繼資料和原始檔案發布在 IPFS 上，就會嘗試驗證這些合約。

[更多關於在 Sourcify 上驗證合約的資訊](https://soliditylang.org/blog/2020/06/25/sourcify-faq/)。

### Tenderly {#tenderly}

[Tenderly 平台](https://tenderly.co/)使 Web3 開發人員能夠建構、測試、監控和操作智能合約。結合除錯工具與可觀測性和基礎設施建構區塊，Tenderly 幫助開發人員加速智能合約開發。為了完全啟用 Tenderly 的功能，開發人員需要使用幾種方法[執行原始碼驗證](https://docs.tenderly.co/monitoring/contract-verification)。

可以私下或公開驗證合約。如果私下驗證，智能合約只對你（以及專案中的其他成員）可見。公開驗證合約則會讓所有使用 Tenderly 平台的人都能看到它。

你可以使用[儀表板](https://docs.tenderly.co/contract-verification)、[Tenderly Hardhat 外掛程式](https://docs.tenderly.co/contract-verification/hardhat)或 [CLI](https://docs.tenderly.co/monitoring/smart-contract-verification/verifying-contracts-using-cli) 來驗證你的合約。

透過儀表板驗證合約時，你需要匯入原始檔案或由 Solidity 編譯器產生的中繼資料檔案、地址／網路，以及編譯器設定。

使用 Tenderly Hardhat 外掛程式能以較少的精力對驗證過程進行更多控制，讓你可以在自動（無程式碼）和手動（基於程式碼）驗證之間進行選擇。

## 延伸閱讀 {#further-reading}

- [驗證合約原始碼](https://programtheblockchain.com/posts/2018/01/16/verifying-contract-source-code/)