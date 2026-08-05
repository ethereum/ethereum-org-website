---
title: "測試智能合約"
description: "測試以太坊智能合約的技術與注意事項總覽。"
lang: zh-tw
---

像以太坊這樣的公有區塊鏈是不可變的，這使得在部署後很難更改智能合約的程式碼。雖然存在用於執行「虛擬升級」的[合約升級模式](/developers/docs/smart-contracts/upgrading/)，但這些模式難以實作且需要社會共識。此外，升級只能在發現錯誤_之後_進行修復——如果攻擊者先發現了漏洞，你的智能合約就有被利用的風險。

基於這些原因，在[部署](/developers/docs/smart-contracts/deploying/)到主網 (Mainnet) 之前測試智能合約是[安全性](/developers/docs/smart-contracts/security/)的最低要求。有許多技術可用於測試合約和評估程式碼的正確性；你的選擇取決於你的需求。儘管如此，由不同工具和方法組成的測試套件是捕捉合約程式碼中輕微和重大安全漏洞的理想選擇。

## 先決條件 {#prerequisites}

本頁面說明如何在部署到以太坊網路之前測試智能合約。假設你已經熟悉[智能合約](/developers/docs/smart-contracts/)。

## 什麼是智能合約測試？ {#what-is-smart-contract-testing}

智能合約測試是驗證智能合約程式碼是否按預期運作的過程。測試有助於檢查特定的智能合約是否滿足可靠性、可用性和安全性的要求。

雖然方法各異，但大多數測試方法都需要使用預期處理的一小部分資料樣本來執行智能合約。如果合約對樣本資料產生正確的結果，則假定其運作正常。大多數測試工具都提供編寫和執行[測試案例](https://en.m.wikipedia.org/wiki/Test_case)的資源，以檢查合約的執行是否與預期結果相符。

### 為什麼測試智能合約很重要？ {#importance-of-testing-smart-contracts}

由於智能合約通常管理高價值的金融資產，輕微的程式設計錯誤可能會且經常會導致[使用者遭受巨大損失](https://rekt.news/leaderboard/)。然而，嚴格的測試可以幫助你及早發現智能合約程式碼中的缺陷和問題，並在發佈到主網之前修復它們。

雖然在發現錯誤時可以升級合約，但升級過程很複雜，如果處理不當可能會[導致錯誤](https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/)。升級合約進一步否定了不可竄改性原則，並給使用者帶來了額外的信任假設負擔。相反地，全面的合約測試計畫可以減輕智能合約的安全風險，並減少在部署後執行複雜邏輯升級的需求。

## 測試智能合約的方法 {#methods-for-testing-smart-contracts}

測試以太坊智能合約的方法分為兩大類：**自動化測試**和**手動測試**。自動化測試和手動測試提供了獨特的優勢和權衡，但你可以結合兩者來建立一個強大的合約分析計畫。

### 自動化測試 {#automated-testing}

自動化測試使用工具自動檢查智能合約程式碼在執行中的錯誤。自動化測試的好處在於使用[腳本](https://www.techtarget.com/whatis/definition/script?amp=1)來引導合約功能的評估。腳本化測試可以安排在最少的人為干預下重複執行，這使得自動化測試比手動測試方法更有效率。

當測試具有重複性且耗時、難以手動執行、容易出現人為錯誤或涉及評估關鍵合約功能時，自動化測試特別有用。但自動化測試工具也有缺點——它們可能會遺漏某些錯誤並產生許多[偽陽性](https://www.contrastsecurity.com/glossary/false-positive)。因此，將自動化測試與手動測試結合用於智能合約是理想的選擇。

### 手動測試 {#manual-testing}

手動測試是人工輔助的，在分析智能合約的正確性時，需要逐一執行測試套件中的每個測試案例。這與自動化測試不同，在自動化測試中，你可以同時對合約執行多個獨立的測試，並獲得顯示所有失敗和通過測試的報告。

手動測試可以由單個人員按照涵蓋不同測試場景的書面測試計畫來執行。你也可以讓多個人員或團隊在指定期間內與智能合約互動，作為手動測試的一部分。測試人員會將合約的實際行為與預期行為進行比較，並將任何差異標記為錯誤。

有效的手動測試需要大量的資源（技能、時間、金錢和精力），而且在執行測試時，由於人為錯誤，可能會遺漏某些錯誤。但手動測試也是有益的——例如，人工測試人員（例如稽核員）可能會憑直覺發現自動化測試工具會遺漏的邊緣案例。

## 智能合約的自動化測試 {#automated-testing-for-smart-contracts}

### 單元測試 {#unit-testing-for-smart-contracts}

單元測試分別評估合約功能，並檢查每個元件是否正確運作。良好的單元測試應該簡單、執行速度快，並且在測試失敗時能清楚指出哪裡出了問題。

單元測試有助於檢查函式是否回傳預期值，以及合約儲存是否在函式執行後正確更新。此外，在更改合約程式碼庫後執行單元測試，可確保新增的邏輯不會引入錯誤。以下是執行有效單元測試的一些準則：

#### 智能合約單元測試準則 {#unit-testing-guidelines}

##### 1. 了解合約的商業邏輯和工作流程

在編寫單元測試之前，了解智能合約提供哪些功能以及使用者將如何存取和使用這些功能會很有幫助。這對於執行[快樂路徑測試 (happy path tests)](https://en.m.wikipedia.org/wiki/Happy_path) 特別有用，該測試可確定合約中的函式是否針對有效的使用者輸入回傳正確的輸出。我們將使用這個（簡化的）[拍賣合約](https://docs.soliditylang.org/en/v0.8.17/solidity-by-example.html?highlight=Auction%20contract#simple-open-auction)範例來解釋這個概念：

```solidity
constructor(
        uint biddingTime,
        address payable beneficiaryAddress
    ) {
        beneficiary = beneficiaryAddress;
        auctionEndTime = block.timestamp + biddingTime;
    }

function bid() external payable {

      if (block.timestamp > auctionEndTime)
            revert AuctionAlreadyEnded();

      if (msg.value <= highestBid)
            revert BidNotHighEnough(highestBid);

 if (highestBid != 0) {
    pendingReturns[highestBidder] += highestBid;
        }
        highestBidder = msg.sender;
        highestBid = msg.value;
        emit HighestBidIncreased(msg.sender, msg.value);
    }

 function withdraw() external returns (bool) {
        uint amount = pendingReturns[msg.sender];
        if (amount > 0) {
           pendingReturns[msg.sender] = 0;

        if (!payable(msg.sender).send(amount)) {
                pendingReturns[msg.sender] = amount;
                return false;
            }
        }
        return true;
    }

function auctionEnd() external {
       if (block.timestamp < auctionEndTime)
            revert AuctionNotYetEnded();
        if (ended)
            revert AuctionEndAlreadyCalled();

        ended = true;
        emit AuctionEnded(highestBidder, highestBid);

        beneficiary.transfer(highestBid);
    }
}
```

這是一個簡單的拍賣合約，設計用於在競標期間接收出價。如果 `highestBid` 增加，前一個最高出價者將收回他們的資金；一旦競標期結束，`beneficiary` 會呼叫合約以獲取他們的資金。

像這樣的合約的單元測試將涵蓋使用者在與合約互動時可能呼叫的不同函式。例如，一個單元測試檢查使用者是否可以在拍賣進行時出價（即呼叫 `bid()` 成功），或者檢查使用者是否可以提出高於當前 `highestBid` 的出價。

了解合約的運作流程也有助於編寫單元測試，以檢查執行是否符合要求。例如，拍賣合約規定使用者在拍賣結束時（即當 `auctionEndTime` 低於 `block.timestamp` 時）不能出價。因此，開發人員可能會執行一個單元測試，檢查在拍賣結束時（即當 `auctionEndTime` > `block.timestamp` 時），對 `bid()` 函式的呼叫是成功還是失敗。

##### 2. 評估與合約執行相關的所有假設

記錄有關合約執行的任何假設並編寫單元測試以驗證這些假設的有效性非常重要。除了提供防止意外執行的保護之外，測試斷言還會迫使你思考可能破壞智能合約安全模型的操作。一個有用的提示是超越「快樂使用者測試」，並編寫負面測試來檢查函式是否因錯誤的輸入而失敗。

許多單元測試框架允許你建立斷言——說明合約能做什麼和不能做什麼的簡單陳述——並執行測試以查看這些斷言在執行時是否成立。開發前面描述的拍賣合約的開發人員可以在執行負面測試之前對其行為做出以下斷言：

- 當拍賣結束或尚未開始時，使用者無法出價。

- 如果出價低於可接受的閾值，拍賣合約將會回復 (revert)。

- 未能贏得競標的使用者將獲退還其資金。

**注意**：測試假設的另一種方法是編寫觸發合約中[函式修飾符](https://docs.soliditylang.org/en/v0.8.16/contracts.html#function-modifiers)的測試，特別是 `require`、`assert` 和 `if…else` 陳述式。

##### 3. 測量程式碼覆蓋率

[程式碼覆蓋率](https://en.m.wikipedia.org/wiki/Code_coverage)是一種測試指標，用於追蹤在測試期間執行的程式碼中的分支、行和陳述式的數量。測試應具有良好的程式碼覆蓋率，以盡量減少未測試漏洞的風險。如果沒有足夠的覆蓋率，你可能會錯誤地認為你的合約是安全的，因為所有測試都通過了，而漏洞仍然存在於未測試的程式碼路徑中。然而，記錄高程式碼覆蓋率可以確保智能合約中的所有陳述式/函式都經過了充分的正確性測試。

##### 4. 使用發展完善的測試框架

用於執行智能合約單元測試的工具品質至關重要。理想的測試框架是定期維護的；提供有用的功能（例如，日誌記錄和報告功能）；並且必須被其他開發人員廣泛使用和審查。

Solidity 智能合約的單元測試框架有不同的語言版本（主要是 JavaScript、Python 和 Rust）。請參閱以下一些指南，了解如何開始使用不同的測試框架執行單元測試：

- **[使用 Brownie 執行單元測試](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)**
- **[使用 Foundry 執行單元測試](https://book.getfoundry.sh/forge/writing-tests)**
- **[使用 Waffle 執行單元測試](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#writing-tests)**
- **[使用 Remix 執行單元測試](https://remix-ide.readthedocs.io/en/latest/unittesting.html#write-tests)**
- **[使用 Ape 執行單元測試](https://docs.apeworx.io/ape/stable/userguides/testing.html)**
- **[使用 Hardhat 執行單元測試](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)**
- **[使用 Wake 執行單元測試](https://ackeeblockchain.com/wake/docs/latest/testing-framework/overview/)**

### 整合測試 {#integration-testing-for-smart-contracts}

雖然單元測試會獨立對合約函式進行除錯，但整合測試會將智能合約的元件作為一個整體進行評估。整合測試可以檢測由跨合約呼叫或同一智能合約中不同函式之間的互動所引起的問題。例如，整合測試可以幫助檢查[繼承](https://docs.soliditylang.org/en/v0.8.12/contracts.html#inheritance)和依賴注入等功能是否正常運作。

如果你的合約採用模組化架構，或在執行期間與其他鏈上合約介接，整合測試將非常有用。執行整合測試的一種方法是在特定高度[分叉區塊鏈](/glossary/#fork)（使用像 [Forge](https://book.getfoundry.sh/forge/fork-testing) 或 [Hardhat](https://hardhat.org/hardhat-network/docs/guides/forking-other-networks) 這樣的工具），並模擬你的合約與已部署合約之間的互動。

分叉的區塊鏈行為將類似於主網，並具有帶有關聯狀態和餘額的帳戶。但它僅作為沙盒式的本機開發環境，這意味著你不需要真實的 ETH 來進行交易，你的更改也不會影響真實的以太坊協定。

### 基於屬性的測試 {#property-based-testing-for-smart-contracts}

基於屬性的測試是檢查智能合約是否滿足某些定義屬性的過程。屬性斷言了關於合約行為的事實，這些事實預期在不同場景中保持為真——智能合約屬性的一個例子可能是「合約中的算術運算永遠不會溢位或下溢」。

<strong>靜態分析</strong>和**動態分析**是執行基於屬性測試的兩種常見技術，兩者都可以驗證程式（在此情況下為智能合約）的程式碼是否滿足某些預定義的屬性。一些基於屬性的測試工具帶有關於預期合約屬性的預定義規則，並根據這些規則檢查程式碼，而其他工具則允許你為智能合約建立自訂屬性。

#### 靜態分析 {#static-analysis}

靜態分析器將智能合約的原始碼作為輸入，並輸出宣告合約是否滿足屬性的結果。與動態分析不同，靜態分析不涉及執行合約來分析其正確性。相反，靜態分析會推論智能合約在執行期間可能採取的所有路徑（即透過檢查原始碼的結構來確定它在執行階段對合約運作的意義）。

[Linting](https://www.perforce.com/blog/qac/what-is-linting) 和[靜態測試](https://www.techtarget.com/whatis/definition/static-analysis-static-code-analysis)是對合約執行靜態分析的常見方法。兩者都需要分析合約執行的低階表示，例如編譯器輸出的[抽象語法樹](https://en.m.wikipedia.org/wiki/Abstract_syntax_tree)和[控制流程圖](https://www.geeksforgeeks.org/software-engineering-control-flow-graph-cfg/amp/)。

在大多數情況下，靜態分析有助於檢測安全問題，例如在合約程式碼中使用不安全的結構、語法錯誤或違反編碼標準。然而，眾所周知，靜態分析器在檢測更深層次的漏洞時通常不夠完善，並且可能會產生過多的偽陽性。

#### 動態分析 {#dynamic-analysis}

動態分析會產生符號輸入（例如，在[符號執行](https://en.m.wikipedia.org/wiki/Symbolic_execution)中）或具體輸入（例如，在[模糊測試](https://owasp.org/www-community/Fuzzing)中）給智能合約函式，以查看是否有任何執行軌跡違反了特定屬性。這種形式的基於屬性測試與單元測試的不同之處在於，測試案例涵蓋多個場景，並且由程式處理測試案例的產生。

[模糊測試 (Fuzzing)](https://www.halborn.com/blog/post/what-is-fuzz-testing-fuzzing) 是驗證智能合約中任意屬性的動態分析技術的一個例子。模糊測試器使用定義輸入值的隨機或畸形變體來呼叫目標合約中的函式。如果智能合約進入錯誤狀態（例如，斷言失敗的狀態），則會標記該問題，並在報告中產生驅動執行走向易受攻擊路徑的輸入。

模糊測試有助於評估智能合約的輸入驗證機制，因為對意外輸入處理不當可能會導致意外執行並產生危險影響。這種形式的基於屬性測試在許多方面都是理想的：

1. **編寫涵蓋許多場景的測試案例很困難。** 屬性測試只需要你定義一個行為和一個用於測試該行為的資料範圍——程式會根據定義的屬性自動產生測試案例。

2. **你的測試套件可能無法充分涵蓋程式內的所有可能路徑。** 即使有 100% 的覆蓋率，也有可能遺漏邊緣案例。

3. **單元測試證明合約對樣本資料執行正確，但合約對樣本外輸入是否執行正確仍然未知。** 屬性測試使用給定輸入值的多種變體來執行目標合約，以尋找導致斷言失敗的執行軌跡。因此，屬性測試提供了更多保證，確保合約對廣泛類別的輸入資料執行正確。

### 執行智能合約基於屬性測試的準則 {#running-property-based-tests}

執行基於屬性的測試通常從定義一個屬性（例如，沒有[整數溢位](https://github.com/ConsenSysDiligence/mythril/wiki/Integer-Overflow)）或你想在智能合約中驗證的屬性集合開始。在編寫屬性測試時，你可能還需要定義一個值範圍，程式可以在該範圍內產生交易輸入的資料。

一旦設定正確，屬性測試工具將使用隨機產生的輸入來執行你的智能合約函式。如果有任何斷言違規，你應該會得到一份報告，其中包含違反正在評估屬性的具體輸入資料。請參閱以下一些指南，開始使用不同的工具執行基於屬性的測試：

- **[使用斯立瑟 (Slither) 對智能合約進行靜態分析](https://github.com/crytic/slither)**
- **[使用 Wake 對智能合約進行靜態分析](https://ackeeblockchain.com/wake/docs/latest/static-analysis/using-detectors/)**
- **[使用 Brownie 進行基於屬性的測試](https://eth-brownie.readthedocs.io/en/stable/tests-hypothesis-property.html)**
- **[使用 Foundry 對合約進行模糊測試](https://book.getfoundry.sh/forge/fuzz-testing)**
- **[使用埃奇德納 (Echidna) 對合約進行模糊測試](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna#echidna-tutorial)**
- **[使用 Wake 對合約進行模糊測試](https://ackeeblockchain.com/wake/docs/latest/testing-framework/fuzzing/)**
- **[使用曼蒂科爾 (Manticore) 對智能合約進行符號執行](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore#manticore-tutorial)**
- **[使用 Mythril 對智能合約進行符號執行](https://github.com/ConsenSysDiligence/mythril/blob/develop/docs/source/tutorial.rst)**

## 智能合約的手動測試 {#manual-testing-for-smart-contracts}

智能合約的手動測試通常在執行自動化測試之後的開發週期後期進行。這種形式的測試將智能合約作為一個完全整合的產品進行評估，以查看其效能是否符合技術要求中的規定。

### 在本機區塊鏈上測試合約 {#testing-on-local-blockchain}

雖然在本機開發環境中執行的自動化測試可以提供有用的除錯資訊，但你會想知道你的智能合約在生產環境中的行為。然而，部署到以太坊主鏈會產生燃料 (Gas) 費用——更不用說如果你的智能合約仍然有錯誤，你或你的使用者可能會損失真金白銀。

建議在本地區塊鏈（也稱為[開發網路](/developers/docs/development-networks/)）上測試你的合約，作為在主網上測試的替代方案。本地區塊鏈是在你的電腦上本地執行的以太坊區塊鏈副本，它模擬了以太坊執行層的行為。因此，你可以編寫交易程式來與合約互動，而不會產生大量的經常性開銷。

在本地區塊鏈上執行合約可以作為一種手動整合測試的形式。[智能合約是高度可組合的](/developers/docs/smart-contracts/composability/)，允許你與現有協定整合——但你仍然需要確保這種複雜的鏈上互動產生正確的結果。

[更多關於開發網路的資訊。](/developers/docs/development-networks/)

### 在測試網上測試合約 {#testing-contracts-on-testnets}

測試網路或測試網的運作方式與以太坊主網完全相同，只是它使用的以太幣 (ETH) 沒有現實世界的價值。將你的合約部署在[測試網](/developers/docs/networks/#ethereum-testnets)上意味著任何人都可以與之互動（例如，透過去中心化應用程式 (dapp) 的前端），而不會使資金面臨風險。

這種形式的手動測試有助於從使用者的角度評估應用程式的端到端流程。在這裡，Beta 測試人員也可以執行試執行，並報告合約商業邏輯和整體功能的任何問題。

在本地區塊鏈上測試後部署在測試網上是理想的選擇，因為前者更接近以太坊虛擬機的行為。因此，許多以太坊原生專案通常會在測試網上部署 dapp，以評估智能合約在現實世界條件下的運作。

[更多關於以太坊測試網的資訊。](/developers/docs/development-networks/#public-beacon-testchains)

## 測試與形式化驗證 {#testing-vs-formal-verification}

雖然測試有助於確認合約對某些資料輸入回傳預期結果，但它無法最終證明在測試期間未使用的輸入也是如此。因此，測試智能合約不能保證「功能正確性」（即它不能證明程式對_所有_輸入值集合的行為都符合要求）。

形式化驗證是一種透過檢查程式的形式化模型是否與形式化規範相符來評估軟體正確性的方法。形式化模型是程式的抽象數學表示，而形式化規範定義了程式的屬性（即關於程式執行的邏輯斷言）。

因為屬性是用數學術語編寫的，所以可以使用邏輯推論規則來驗證系統的形式化（數學）模型是否滿足規範。因此，形式化驗證工具被認為可以產生系統正確性的「數學證明」。

與測試不同，形式化驗證可用於驗證智能合約的執行是否滿足_所有_執行的形式化規範（即它沒有錯誤），而無需使用樣本資料執行它。這不僅減少了執行數十個單元測試所花費的時間，而且在捕捉隱藏漏洞方面也更有效。話雖如此，形式化驗證技術根據其實作難度和實用性而處於一個光譜上。

[更多關於智能合約形式化驗證的資訊。](/developers/docs/smart-contracts/formal-verification)

## 測試與稽核和漏洞賞金 {#testing-vs-audits-bug-bounties}

如前所述，嚴格的測試很少能保證合約中沒有錯誤；形式化驗證方法可以提供更強的正確性保證，但目前難以使用且會產生可觀的成本。

儘管如此，你可以透過獲得獨立的程式碼審查來進一步增加捕捉合約漏洞的可能性。[智能合約稽核](https://www.immunebytes.com/blog/what-is-a-smart-contract-audit/)和[漏洞賞金](https://medium.com/immunefi/a-defi-security-standard-the-scaling-bug-bounty-9b83dfdc1ba7)是讓其他人分析你的合約的兩種方法。

稽核由在尋找智能合約中的安全漏洞和不良開發實踐案例方面經驗豐富的稽核員執行。稽核通常包括測試（可能還有形式化驗證）以及對整個程式碼庫的手動審查。

相反地，漏洞賞金計畫通常涉及向發現智能合約漏洞並將其披露給開發人員的個人（通常被稱為[白帽駭客](<https://en.wikipedia.org/wiki/White_hat_(computer_security)>))提供財務獎勵。漏洞賞金類似於稽核，因為它涉及要求其他人幫助尋找智能合約中的缺陷。

主要區別在於，漏洞賞金計畫向更廣泛的開發人員/駭客社群開放，並吸引了具有獨特技能和經驗的廣泛道德駭客和獨立安全專業人員。與主要依賴可能擁有有限或狹窄專業知識的團隊的智能合約稽核相比，這可能是一個優勢。

## 測試工具和函式庫 {#testing-tools-and-libraries}

### 單元測試工具 {#unit-testing-tools}

- **[solidity-coverage](https://github.com/sc-forks/solidity-coverage)** - _用於以 Solidity 編寫的智能合約的程式碼覆蓋率工具。_

- **[Waffle](https://ethereum-waffle.readthedocs.io/en/latest/)** - _用於進階智能合約開發和測試的框架（基於 Ethers.js）。_

- **[Remix Tests](https://github.com/ethereum/remix-project/tree/master/libs/remix-tests)** - _用於測試 Solidity 智能合約的工具。在 Remix IDE 的「Solidity 單元測試」外掛程式下運作，該外掛程式用於編寫和執行合約的測試案例。_

- **[OpenZeppelin Test Helpers](https://github.com/OpenZeppelin/openzeppelin-test-helpers)** - _用於以太坊智能合約測試的斷言函式庫。確保你的合約按預期運作！_

- **[Brownie 單元測試框架](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)** - _Brownie 利用 Pytest，這是一個功能豐富的測試框架，可讓你以最少的程式碼編寫小型測試，能很好地擴展到大型專案，並且具有高度可擴展性。_

- **[Foundry Tests](https://github.com/foundry-rs/foundry/tree/master/crates/forge)** - _Foundry 提供 Forge，這是一個快速靈活的以太坊測試框架，能夠執行簡單的單元測試、Gas 最佳化檢查和合約模糊測試。_

- **[Hardhat Tests](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)** - _基於 Ethers.js、Mocha 和 Chai 的智能合約測試框架。_

- **[ApeWorx](https://docs.apeworx.io/ape/stable/userguides/testing.html)** - _基於 Python 的智能合約開發和測試框架，針對以太坊虛擬機。_

- **[Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/overview/)** - _基於 Python 的單元測試和模糊測試框架，具有強大的除錯功能和跨鏈測試支援，利用 pytest 和 Anvil 提供最佳的使用者體驗和效能。_

### 基於屬性的測試工具 {#property-based-testing-tools}

#### 靜態分析工具 {#static-analysis-tools}

- **[斯立瑟 (Slither)](https://github.com/crytic/slither)** - _基於 Python 的 Solidity 靜態分析框架，用於尋找漏洞、增強程式碼理解以及為智能合約編寫自訂分析。_

- **[Ethlint](https://ethlint.readthedocs.io/en/latest/)** - _用於強制執行 Solidity 智能合約程式語言的樣式和安全性最佳實踐的 Linter。_

- **[Cyfrin Aderyn](https://cyfrin.io/tools/aderyn)** - _基於 Rust 的靜態分析器，專為 Web3 智能合約安全和開發而設計。_

- **[Wake](https://ackeeblockchain.com/wake/docs/latest/static-analysis/using-detectors/)** - _基於 Python 的靜態分析框架，具有漏洞和程式碼品質檢測器、用於從程式碼中提取有用資訊的印表機，並支援編寫自訂子模組。_

- **[Slippy](https://github.com/fvictorio/slippy)** - _一個簡單而強大的 Solidity Linter。_

#### 動態分析工具 {#dynamic-analysis-tools}

- **[埃奇德納 (Echidna)](https://github.com/crytic/echidna/)** - _快速的合約模糊測試器，透過基於屬性的測試來檢測智能合約中的漏洞。_

- **[Diligence Fuzzing](https://consensys.net/diligence/fuzzing/)** - _自動化模糊測試工具，有助於檢測智能合約程式碼中的屬性違規。_

- **[曼蒂科爾 (Manticore)](https://manticore.readthedocs.io/en/latest/index.html)** - _用於分析 EVM 位元組碼的動態符號執行框架。_

- **[Mythril](https://github.com/ConsenSysDiligence/mythril)** - _EVM 位元組碼評估工具，使用污點分析、混合執行分析和控制流程檢查來檢測合約漏洞。_

- **[Diligence Scribble](https://consensys.net/diligence/scribble/)** - _Scribble 是一種規範語言和執行階段驗證工具，允許你使用屬性註解智能合約，從而允許你使用 Diligence Fuzzing 或 MythX 等工具自動測試合約。_

## 相關教學 {#related-tutorials}

- [不同測試產品的總覽與比較](/developers/tutorials/guide-to-smart-contract-security-tools/) \_
- [如何使用埃奇德納 (Echidna) 測試智能合約](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/)
- [如何使用曼蒂科爾 (Manticore) 尋找智能合約錯誤](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)
- [如何使用斯立瑟 (Slither) 尋找智能合約錯誤](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)
- [如何模擬 Solidity 合約進行測試](/developers/tutorials/how-to-mock-solidity-contracts-for-testing/)
- [如何使用 Foundry 在 Solidity 中執行單元測試](https://www.rareskills.io/post/foundry-testing-solidity)

## 延伸閱讀 {#further-reading}

- [測試以太坊智能合約的深入指南](https://iamdefinitelyahuman.medium.com/an-in-depth-guide-to-testing-ethereum-smart-contracts-2e41b2770297)
- [如何測試以太坊智能合約](https://betterprogramming.pub/how-to-test-ethereum-smart-contracts-35abc8fa199d)
- [MolochDAO 的開發人員單元測試指南](https://github.com/MolochVentures/moloch/tree/4e786db8a4aa3158287e0935dcbc7b1e43416e38/test#moloch-testing-guide)
- [如何像搖滾明星一樣測試智能合約](https://forum.openzeppelin.com/t/test-smart-contracts-like-a-rockstar/1001)

## 教學：以太坊上的智能合約測試 {#tutorials}

- [如何在本地多客戶端測試網上開發和測試 dApp](/developers/tutorials/develop-and-test-dapps-with-a-multi-client-local-eth-testnet/) _– 將智能合約部署到本地測試網並執行測試的演練。_
- [如何模擬 Solidity 智能合約進行測試](/developers/tutorials/how-to-mock-solidity-contracts-for-testing/) _– 關於如何使用模擬資料和實作單元測試的中階教學。_
- [如何使用埃奇德納 (Echidna) 測試智能合約](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/) _– 模糊測試和智能合約測試的進階方法。_
