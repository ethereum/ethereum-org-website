---
title: 測試智慧型合約
description: 測試以太坊智慧型合約之技術與考量概觀。
lang: zh-tw
---

公共區塊鏈如以太坊具不可篡改性，讓已經部署的智慧型合約程式碼難以更改。 確實存在一些可以進行「虛擬升級」的[合約升級模式](/developers/docs/smart-contracts/upgrading/)，但這些模式的實作難度較高，並會涉及社交共識。 而且，升級只能在一個錯誤被發現_後_進行修正。如果攻擊者先發現了該漏洞，智慧型合約就有遭到利用的可能。

基於這些原因，在智慧型合約被[部署](/developers/docs/smart-contracts/deploying/)到主網前進行測試，是保障[安全性](/developers/docs/smart-contracts/security/)的最基本要求。 有許多不同的測試合約和評估程式碼正確性的技術，你的選擇決於你的需求。 不過，一個由不同工具和方法組成的測試套件，會是找出合約程式碼中從輕微到重大安全性漏洞的理想選擇。

## 先決條件 {#prerequisites}

本頁會解釋如何在部署到以太坊網路前進行智慧型合約的測試， 前提是你已經熟悉[智慧型合約](/developers/docs/smart-contracts/)。

## 何謂智慧型合約測試？ {#what-is-smart-contract-testing}

智慧型合約測試測試是指確認智慧型合約的程式碼會如預期般執行的測試過程。 測試有助於檢查特定的智慧型合約是否滿足可靠性、可用性及安全性要求。

雖然測試方法各異，但大多數都是使用智慧型合約預計處理的資料中的一小部分樣本，來執行該智慧型合約。 如果合約對採樣資料產出正確的結果，那我們就認定它運作正常。 多數的測試工具都會提供資源來幫助撰寫與執行[測試用例](https://en.m.wikipedia.org/wiki/Test_case)，以檢查合約的執行是否符合預期的結果。

### 測試智慧型合約的重要性 {#importance-of-testing-smart-contracts}

由於智慧型合約通常掌控高財物價值的金融資產，即使是微小的程式設計錯誤往往也可以造成[使用者的巨大損失](https://rekt.news/leaderboard/)。 嚴密的測試則可以幫助你及早發現智慧型合約程式碼裡的缺陷與問題，並在它們發佈到主網前進行修復。

雖然在發現漏洞後進行合約升級是可行的，但合約升級相當複雜，如果處理不當，還會[產生錯誤](https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/)。 不僅如此，合約升級打破了區塊鏈的不可篡改性原則，也讓使用者需要接受額外的信任假設。 相反地，我們應制定完整的合約測試計畫，來降低智慧型合約的安全性風險，避免在合約部署後需要進行複雜的邏輯升級。

## 智慧型合約的測試方法 {#methods-for-testing-smart-contracts}

測試以太坊智慧型合約的方法分為兩大類：**自動化測試**及**手動測試**。 自動化測試與手動測試各有優缺，兩者可以併用以建立穩健的合約分析計畫。

### 自動化測試 {#automated-testing}

自動化測試使用工具來自動偵測智慧型合約程式碼在執行時的錯誤， 其好處在於使用[指令碼](https://www.techtarget.com/whatis/definition/script?amp=1)來指導合約功能的評估。 寫成指令碼的測試可以被安排重複執行來減少人力介入，這讓自動化測試比手動測試方式更有效率。

自動化測試在以下情境特別有用：測試的重複性高且費時、難以採用手動方式進行、容易出現人為錯誤，或牽涉到評估關鍵的合約函式。 但自動化測試工具的缺點是，可能會遺漏一些漏洞，並可能產生許多[誤報結果](https://www.contrastsecurity.com/glossary/false-positive)。 因此，將自動化測試與手動測試並用於智慧型合約較為理想。

### 手動測試 {#manual-testing}

手動測試需要真人的輔助，需要逐一執行測試套件中的每一個測試用例，來分析智慧型合約的正確性。 這和自動化測試不同，沒辦法同時在一個合約上執行多個獨立的測試，並得到一份顯示所有成功與失敗測試的報告。

手動測試可以由一個人進行，依照預寫好的測試計畫，來執行不同的測試情境。 在手動測試過程中，也可以由許多人或是幾組人在一段時間內與智慧型合約互動。 測試者會把測試出來的實際合約行為和預期行為相比較，並把兩者的不同標記成漏洞。

有效的手動測試需要大量的資源（技術、時間、金錢與人力），而且有可能在執行測試時因為人為錯誤而遺漏一些錯誤。 但手動測試仍然是有益的，舉例來說，一個真人測試者（如審計員）或許可以用直覺來找出一些可能被自動化測試工具遺漏的邊緣案例。

## 智慧型合約的自動化測試 {#automated-testing-for-smart-contracts}

### 單元測試 {#unit-testing-for-smart-contracts}

單元測試分別評估各個合約函式並確認每個元件都能正常運作。 好的單元測試應該要簡單並且快速地運作，並在有測試失敗時讓人清楚地知道問題發生在哪。

單元測試在確認函式回傳預計的值以及函式執行後正確更新合約存儲方面很有用。 此外，在更改合約的程式碼庫之後運行單元測試，可以確保新增的新邏輯並沒有造成新錯誤。 以下是一些如何運行有效單元測試的指南：

#### 智慧型合約單元測試指南 {#unit-testing-guidelines}

##### 1.  了解你的合約的商務邏輯及工作流程

在撰寫單元測試之前，知道智慧型合約提供哪些函式以及使用者要如何存取並使用這些函式很有幫助。 這在進行[快樂路徑 (happy path) 測試](https://en.m.wikipedia.org/wiki/Happy_path)時特別有用，這個測試是為了確定合約中的函式是否對有效的使用者輸入回傳正確的輸出。 我們會用這個（簡略的）[拍賣合約](https://docs.soliditylang.org/en/v0.8.17/solidity-by-example.html?highlight=Auction%20contract#simple-open-auction)作為例子來解釋這個概念。

```
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

這是一個設計用於在可出價期間接收出價的簡單拍賣合約。 當 `highestBid` 增加時，上一個最高出價者收回他們的錢；一旦可出價期間結束，`beneficiary` 呼叫合約以取得他們的錢。

對於這樣的合約，單元測試會覆蓋使用者在與合約互動時會呼叫的各種函式。 舉個例子，單元測試可能測試使用者是否能在出價期間進行出價（也就是成功呼叫 `bid()`），或者是測試使用者是否可以出一個比現在的 `highestBid` 更高的價格。

了解合約的工作流程也能幫助撰寫單元測試，確認執行結果是否符合要求。 舉例來說，這個拍賣合約指明使用者不能在拍賣結束後（也就是當 `auctionEndTime` 小於 `block.timestamp` 的時候）出價。 因此，開發者可能會執行一個單元測試，確認在拍賣結束後（`auctionEndTime` > `block.timestamp` 時）呼叫 `bid()` 函式是否能成功。

##### 2. 評估所有關於合約執行的假設

記錄任何關於合約執行的假設並編寫單元測試來驗證這些假設的有效性是非常重要的。 除了防範意外執行，測試斷言還迫使你考慮可能破壞智慧型合約安全模型的操作。 一個有用的技巧是不僅要進行「正向 (Happy User) 測試」，還要編寫負面測試，檢查函式對錯誤的輸入是否會失敗。

許多單元測試框架允許你建立斷言 - 陳述合約能做什麼和不能做什麼的簡單陳述式 - 並運行測試來查看這些斷言在執行中是否成立。 開發者在開發前面描述的拍賣合約時，可以在執行負面測試之前對其行爲做出以下斷言：

- 使用者無法在拍賣未開始或結束時出價。

- 如果出價低於可接受的閾值，拍賣合約就會還原。

- 未能贏得競標的使用者將獲得其資金的退款

**注**：測試假設的另一種方式是編寫測試以觸發合約中的[修飾函式](https://docs.soliditylang.org/en/v0.8.16/contracts.html#function-modifiers)，特別是 `require`、`assert` 和 `if…else` 陳述式。

##### 3 計算程式碼覆蓋率

[程式碼覆蓋率](https://en.m.wikipedia.org/wiki/Code_coverage)是一種測試指標，用於追蹤在測試過程中執行的程式碼分支、行和陳述式的數量。 測試應該覆蓋足夠多的程式碼，否則你可能會遭遇「漏報」，即合約通過了所有測試，但漏洞依然存在于程式碼中。 但是，透過覆蓋足夠多的程式碼，就可以確保智慧型合約中的所有陳述式/函式都經過充分的正確性測試。

##### 4 使用精心開發的測試框架

為智慧型合約運行單元測試時使用的工具品質至關重要。 理想的測試框架應該是定期維護的；提供實用的功能（如記錄和報告功能）；並且必須經過其他開發者的廣泛使用與審查。

Solidity 智慧型合約的單元測試框架有不同的語言（大多數為 JavaScript、Python 和 Rust）。 請參閱下方指南，了解如何使用不同的測試框架開始運行單元測試：

- **[使用 Brownie 運行單元測試](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)**
- **[使用 Foundry 運行單元測試](https://book.getfoundry.sh/forge/writing-tests)**
- **[使用 Waffle 運行單元測試](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#writing-tests)**
- **[使用 Remix 運行單元測試](https://remix-ide.readthedocs.io/en/latest/unittesting.html#write-tests)**
- **[使用 Ape 運行單元測試](https://docs.apeworx.io/ape/stable/userguides/testing.html)**
- **[使用 Hardhat 運行單元測試](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)**
- **[使用 Wake 運行單元測試](https://ackeeblockchain.com/wake/docs/latest/testing-framework/overview/)**

### 整合測試 {#integration-testing-for-smart-contracts}

單元測試對合約函式進行單獨除錯，而整合測試將智慧型合約的組件作爲一個整體進行評估。 整合測試可以偵測源自跨合約呼叫或同一個智慧型合約中不同函式閒互動的問題。 例如，整合測試能夠幫助檢查諸如[繼承](https://docs.soliditylang.org/en/v0.8.12/contracts.html#inheritance)和相依性注入之類的功能是否正常運作。

如果你的合約採用模組化架構或在執行期間與其他鏈上合約互動，整合測試就很實用。 運行整合測試的一個方法是在一個特定高度[分叉區塊鏈](/glossary/#fork)（使用類似 [Forge](https://book.getfoundry.sh/forge/fork-testing) 或 [Hardhat](https://hardhat.org/hardhat-network/docs/guides/forking-other-networks) 的工具），並模擬在你的合約與已部署合約之間的互動。

分叉的區塊鏈將與主網的行為類似，其帳戶具有關聯的狀態和餘額。 但它只作爲一個沙盒在本機開發環境運行，例如，這意味著你不需要用真實的以太幣來交易，你的更改也不會影響真實的以太坊協議。

### 基於屬性的測試 {#property-based-testing-for-smart-contracts}

基於屬性的測試是一種檢查智慧型合約是否滿足一些已定義屬性的過程。 屬性是關於合約行為的事實斷言，預期其行為在不同的場景中始終保持為真。智慧型合約屬性的一個例子可以是「合約中的算術運算永不溢出或下溢」。

**靜態分析**和**動態分析**是執行基於屬性的測試的兩種常見技術，並且兩者都可以驗證程式（在這裏為智慧型合約）的程式碼是否滿足某些預定義屬性。 一些基於屬性的測試工具自帶一些關於預期合約屬性的預定義規則，並根據這些規則檢查程式碼，而其他工具則允許你為智慧型合約建立自訂屬性。

#### 靜態分析 {#static-analysis}

靜態分析器將智慧型合約的原始程式碼作爲輸入，並輸出聲明合約是否滿足屬性的結果。 與動態分析不同，靜態分析不涉及執行合約來分析其正確性。 相反，靜態分析會推理智慧型合約在執行期間可能選擇的所有路徑（例如，透過檢視原始程式碼的結構來確定合約運作在運行時間的意義）。

[Linting](https://www.perforce.com/blog/qac/what-lint-code-and-why-linting-important) 和[靜態測試](https://www.techtarget.com/whatis/definition/static-analysis-static-code-analysis)是對合約執行靜態分析的常見方法。 兩者都需要對合約執行的低階表示進行分析，例如由編譯器輸出的[抽象語法樹](https://en.m.wikipedia.org/wiki/Abstract_syntax_tree)和[控制流程圖](https://www.geeksforgeeks.org/software-engineering-control-flow-graph-cfg/amp/)。

在多數情況下，靜態分析對偵測安全問題很有用，例如使用不安全構造、語法錯誤或違反合約程式碼中的編碼標準。 然而，靜態分析器通常被認爲在偵測更深層漏洞方面不太健全，並可能會產生過多的誤報。

#### 動態分析 {#dynamic-analysis}

動態分析為智慧型合約函式產生符號輸入（例如，在[符號執行](https://en.m.wikipedia.org/wiki/Symbolic_execution)中）或具體輸入（例如，在[模糊測試](https://owasp.org/www-community/Fuzzing)中），來查看是否有任何執行軌跡違反特定屬性。 此類基於屬性的測試與單元測試不同，其測試用例覆蓋了多種場景，並且有一個程式處理測試用例的生成。

[模糊測試](https://halborn.com/what-is-fuzz-testing-fuzzing/)是一種用於驗證智慧型合約中任意屬性的動態分析技術範例。 模糊測試工具使用定義的輸入值的隨機或畸形變化來叫用目標合約中的函式。 如果智慧型合約進入錯誤狀態（例如，當斷言失敗時），該問題就會被標記，並在報告中產生將執行推向脆弱路徑的輸入。

模糊測試對於評估智慧型合約輸入驗證機制很有用，因爲對意外輸入的不正確處理可能會導致意外執行並產生危險的影響。 這種基於屬性的測試形式可能非常理想，原因有多種：

1. **編寫覆蓋許多場景的測試用例非常困難。**屬性測試只需要定義一個行爲以及用於測試該行爲的一系列資料 - 程式會根據定義的屬性自動生成測試用例。

2. **你的測試套件或許無法充分覆蓋程式中所有可能的路徑。**即便有 100% 的覆蓋率，也可能會錯過邊緣案例。

3. **單元測試證明合約正確執行採樣資料，但採樣以外的輸入是否正確執行仍然未知。**屬性測試使用給定輸入值的多個變體來執行目標合約，以此找出導致斷言失敗的執行軌跡。 因此，屬性測試為合約在廣泛的輸入資料類別下正確執行提供了更多的保證。

### 對智慧型合約運行基於屬性的測試的準則 {#running-property-based-tests}

運行基於屬性的測試通常從定義一個屬性（例如，[整數溢位](https://github.com/ConsenSys/mythril/wiki/Integer-Overflow)的缺乏）或者你希望在智慧型合約中驗證的屬性集合開始。 在編寫屬性測試時，你可能還需要定義一個數值範圍，使程式能夠在該範圍内為交易輸入生成資料。

設定正確後，屬性測試工具會使用隨機產生的輸入來執行你的智慧型合約函式。 如果有任何斷言違規情況，你應該會獲得一份報告，其中包含違反正在評估的屬性的具體輸入資料。 請參閱下面的指南，了解如何使用不同的工具開始執行基於屬性的測試：

- **[使用 Slither 的智慧型合約靜態分析](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/slither#slither)**
- **[使用 Wake 的智慧型合約靜態分析](https://ackeeblockchain.com/wake/docs/latest/static-analysis/using-detectors/)**
- **[使用 Brownie 進行基於屬性的測試](https://eth-brownie.readthedocs.io/en/stable/tests-hypothesis-property.html)**
- **[使用 Foundry 進行合約模糊測試](https://book.getfoundry.sh/forge/fuzz-testing)**
- **[使用 Echidna 進行合約模糊測試](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna#echidna-tutorial)**
- **[使用 Wake 進行合約模糊測試](https://ackeeblockchain.com/wake/docs/latest/testing-framework/fuzzing/)**
- **[使用 Manticore 的智能合約符號執行](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore#manticore-tutorial)**
- **[使用 Mythril 的智能合約符號執行](https://mythril-classic.readthedocs.io/en/master/tutorial.html)**

## 手動測試智慧型合約 {#manual-testing-for-smart-contracts}

手動測試通常是在智慧型合約開發後期運行自動化測試之後進行的。 這種測試形式將智慧型合約作爲完全整合的產品進行評估，以此檢查其是否符合技術要求中的規範。

### 在本機區塊鏈測試合約 {#testing-on-local-blockchain}

儘管在本機開發環境中執行的自動化測試能夠提供有用的偵錯資訊，你仍然會想知道你的合約在生产環境中的執行情況。 然而，部署到以太坊主鏈需要燃料費 - 更不用説如果你的智慧型合約仍有漏洞，你或你的使用者可能會損失真金白銀。

在本機區塊鏈（也被稱爲[開發者網路](/developers/docs/development-networks/)）上測試你的合約，是在主網上進行測試的建議替代方案。 本機區塊鏈是在你的電腦上本機運行的以太坊區塊鏈的副本，它能模擬以太坊執行層的行爲。 這樣，你就可以設定交易與合約進行交互，而不會產生大量開銷。

在本機區塊鏈上運行合約可以有助於完成手動整合測試。 [智慧型合約具有高度可組合性](/developers/docs/smart-contracts/composability/)，允許你整合現有的協定 - 但你仍然需要確保這種複雜的鏈上整合會產生正確的結果。

[有關開發網路的更多資訊。](/developers/docs/development-networks/)

### 在測試網上測試合約 {#testing-contracts-on-testnets}

測試網路或測試網的運作方式與以太坊主網完全相同，唯一的區別在於它使用沒有現實價值的以太幣 (ETH)。 在[測試網](/developers/docs/networks/#ethereum-testnets)上部署你的合約意味著任何人都可以與之互動（例如，透過去中心化應用程式 (dapp) 的前端），而無需承擔資金風險。

這種手動測試形式對於從使用者角度評估應用程式的端到端流程非常有用。 在這裡，測試人員還可以進行試運行，並報告與合約的業務邏輯和整體功能有關的任何問題。

在本機區塊鏈上進行測試後，部署到測試網是理想的選擇，因為測試網更接近以太坊虛擬機的行為。 因此，許多以太坊原生專案通常會將去中心化應用程式 (dapp) 部署到測試網上，以在現實條件下評估智慧型合約的運作。

[更多以太坊測試網相關資訊。](/developers/docs/development-networks/#public-beacon-testchains)

## 測試與形式化驗證 {#testing-vs-formal-verification}

儘管測試有助確認合約對特定資料輸入回傳預期結果，但對於測試期間未使用的輸入，它無法完全證明相同的結果。 因此，測試智慧型合約無法保證「函式正確性」（即無法確保程式對於_所有_輸入值集都按照要求運作）。

形式化驗證是一種透過檢查程式的形式化模型是否符合形式化規範來評估軟體正確性的方法。 形式化模型是程式的抽象數學表示，而形式化規範定義程式的屬性（即關於程式執行的邏輯斷言）。

因爲屬性由數學術語編寫，它能夠使用邏輯推理規則來驗證系統的形式化（數學）模型是否滿足規範。 所以形式化驗證工具被認為能夠提供系統正確性的「數學證明」。

與測試不同，形式化驗證可用於驗證智慧型合約執行是否滿足_所有_執行的形式化規範（即沒有漏洞），而無需使用採樣資料執行它。 這不僅減少了運行數十個單元測試所花費的時間，而且在發現隱藏漏洞方面也更有效。 話雖如此，形式化驗證技術在實作難度和實用性上存在一定的變化程度。

[更多關於智慧型合約形式化驗證的資訊。](/developers/docs/smart-contracts/formal-verification)

## 測試與審核以及漏洞懸賞 {#testing-vs-audits-bug-bounties}

如上所述，嚴格的測試很難保證合約中沒有錯誤；形式化驗證方法可以提供更有力的正確性保證，但目前仍難以使用並且需要大量成本。

儘管如此，你仍可透過獨立的程式碼檢閱來進一步增加捕捉合約漏洞的可能性。 [智慧型合約審核](https://www.immunebytes.com/blog/what-is-a-smart-contract-audit/)和[漏洞懸賞](https://medium.com/immunefi/a-defi-security-standard-the-scaling-bug-bounty-9b83dfdc1ba7)是讓他人分析你的合約的兩種方式。

審查由具有在智慧型合約中發現安全缺陷和不良開發實踐案例經驗的審查人員進行。 審核通常包括對整個程式碼基底進行測試（可能包括形式化驗證）以及手動檢閱。

相反，漏洞懸賞計劃通常包括向在智慧型合約中發現漏洞並向開發者報告的個人（通常被描述爲[白帽駭客](https://en.wikipedia.org/wiki/White_hat_(computer_security))）提供經濟獎勵。 漏洞懸賞類似於審查，因為它涉及要求其他人幫助發現智慧型合約中的缺陷。

主要的區別是漏洞懸賞計劃對更廣泛的開發者/駭客開放，並吸引了廣泛的擁有獨特技能與經驗的道德駭客和獨立安全專家。 與智慧型合約審查主要依賴可能擁有有限或狹窄專業知識的團隊相比，這可能是一個優勢。

## 測試工具與程式庫 {#testing-tools-and-libraries}

### 單元測試工具 {#unit-testing-tools}

- **[solidity-coverage](https://github.com/sc-forks/solidity-coverage)** - _以 Solidity 編寫的智慧型合約程式碼覆蓋率工具_

- **[Waffle](https://ethereum-waffle.readthedocs.io/en/latest/)** - _用於進階智慧型合約開發和測試的框架（以 ethers.js 為基礎）_。

- **[Remix 測試](https://github.com/ethereum/remix-project/tree/master/libs/remix-tests)** - _用來測試 Solidity 智慧型合約的工具。 在 Remix IDE 的「Solidity 單元測試」外掛程式下工作，該外掛程式用於編寫和運行合約的測試用例。 _

- **[OpenZeppelin Test Helpers](https://github.com/OpenZeppelin/openzeppelin-test-helpers)** - _用於以太坊智慧型合約測試的斷言程式庫。 確保你的合約運作自如！_

- **[Brownie 單元測試框架](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)** - _Brownie 利用 Pytest，一個功能豐富的測試框架，使你能夠用最少的程式碼編寫小型測試，並且對於大型項目擴展良好，具有高度可延伸性。_

- **[Foundry 測試](https://github.com/foundry-rs/foundry/tree/master/forge)** - _Foundry 提供了 Forge，一個快速且靈活的以太坊測試框架，能夠執行簡單的單元測試、燃料優化檢查，以及合約模糊測試。_

- **[Hardhat 測試](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)** - _基於 ethers.js、Mocha 和Chai 的智慧型合約測試框架。_

- **[ApeWorx](https://docs.apeworx.io/ape/stable/userguides/testing.html)** - _基於 Python 的開發與測試框架，適用於針對以太坊虛擬機的智慧型合約。_

- **[Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/overview/)** - _基於 Python 的框架，為單元測試和模糊測試提供了强大的偵錯功能和跨鏈測試支援，並利用 pytest 和 Anvil 實現最佳的使用者體驗和效能。_

### 基於屬性的測試工具 {#property-based-testing-tools}

#### 靜態分析工具 {#static-analysis-tools}

- **[Slither](https://github.com/crytic/slither)** - _基於 Python 的 Solidity 靜態分析框架，能夠為智慧型合約尋找漏洞、增强程式碼理解，以及編寫自訂分析。_

- **[Ethlint](https://ethlint.readthedocs.io/en/latest/)** - _用於執行 Solidity 智慧型合約程式設計語言風格和安全最佳實踐的 Linter。_

- **[Cyfrin Aderyn](https://cyfrin.io/tools/aderyn)** - _基於 Rust 的靜態分析器，專為 Web3 智慧型合約安全和開發而設計。_

- **[Wake](https://ackeeblockchain.com/wake/docs/latest/static-analysis/using-detectors/)** - _基於 Python 的靜態分析框架，具有漏洞和程式碼品質偵測器、從程式碼擷取有用資訊的印表機，並且支援編寫自訂子模組。_

#### 動態分析工具 {#dynamic-analysis-tools}

- **[Echidna](https://github.com/crytic/echidna/)** - _快速合約模糊測試工具，用於透過基於屬性的測試來偵測智慧型合約漏洞。_

- **[Diligence Fuzzing](https://consensys.net/diligence/fuzzing/)** - _自動化模糊測試工具，適用於偵測智慧型合約程式碼中的屬性違規行為。 _

- **[Manticore](https://manticore.readthedocs.io/en/latest/index.html)** - _用於分析以太坊虛擬機位元組碼的動態符號執行框架。 _

- **[Mythril](https://github.com/ConsenSys/mythril-classic)** - _以太坊虛擬機位元組碼評定工具，能夠使用污染源分析、一致性分析和控制流檢查來偵測合約漏洞。_

- **[Diligence Scribble](https://consensys.net/diligence/scribble/)** - _Scribble 是一種規範語言和運行時檢查工具，允許你為智慧型合約註解屬性，從而使你能夠使用 Diligence Fuzzing 或 MythX 這類工具來自動測試合約。_

## 相關教學 {#related-tutorials}

- [不同測試產品的概覽和比較](/developers/tutorials/guide-to-smart-contract-security-tools/)
- [如何使用 Echidna 測試智慧型合約](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/)
- [如何使用 Manticore 尋找智慧型合約錯誤](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)
- [如何使用 Slither 來搜尋智慧型合約漏洞](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)
- [如何模擬 Solidity 合約進行測試](/developers/tutorials/how-to-mock-solidity-contracts-for-testing/)
- [如何使用 Foundry 在 Solidity 中執行單元測試](https://www.rareskills.io/post/foundry-testing-solidity)

## 了解更多 {#further-reading}

- [測試以太坊智慧型合約的深入指南](https://iamdefinitelyahuman.medium.com/an-in-depth-guide-to-testing-ethereum-smart-contracts-2e41b2770297)
- [如何測試以太坊智慧型合約](https://betterprogramming.pub/how-to-test-ethereum-smart-contracts-35abc8fa199d)
- [MolochDAO 的開發者單元測試指南](https://github.com/MolochVentures/moloch/tree/4e786db8a4aa3158287e0935dcbc7b1e43416e38/test#moloch-testing-guide)
- [如何像明星專家一樣測試智慧型合約](https://forum.openzeppelin.com/t/test-smart-contracts-like-a-rockstar/1001)
