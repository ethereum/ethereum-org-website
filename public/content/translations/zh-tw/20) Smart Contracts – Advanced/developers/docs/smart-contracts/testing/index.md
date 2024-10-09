---
title: 測試智慧型合約
description: 測試以太坊智能合約之技術與考量概觀
lang: zh-tw
---

開放的區塊鏈如以太坊具不可篡改性，讓已經部署的智能合約難以更改。 確實存在一些可以“間接地升級”[智能合約的升級模式](/developers/docs/smart-contracts/upgrading/)，但這些的開發難度較高，也會涉及社群的共識。 並且，升級只能在一個錯誤被發現_後_進行修正。如果一個攻擊者先發現了一個漏洞，智能合約就有被遭到濫用或攻擊的可能。

基於這些原因，在智能合約被[部署](/developers/docs/smart-contracts/deploying/)到以太坊主網前進行測試，是保障[安全性](/developers/docs/smart-contracts/security/)的最基本要求。 有許多不同測試和評估程式碼安全性的技術與方法，你所選用的取決於你的需求。 而一個由不同工具和方法組成的測試框架，會是找出在合約程式碼中，從輕微到重大安全性漏洞的理想選擇。

## 先決條件 {#prerequisites}

本頁會解釋如何在部署到以太坊前進行智能合約的測試， 假定你已經大致了解[智能合約](/developers/docs/smart-contracts/)。

## 何謂智能合約測試？ {#what-is-smart-contract-testing}

智能合約測試是指確認智能合約程式碼會如預期般執行的測試過程。 撰寫測試能有助於檢查特定的智能合約是否可靠、可用及安全。

雖然測試方法各異，但通常都是採樣一智能合約可能處理到的所有資料的一小部分，來執行該智能合約的功能。 如果合約對採樣資料產出如預期的結果，那我們就認定它的運作正常。 多數的測試工具都提供資源來幫助撰寫與執行[測試範例](https://en.m.wikipedia.org/wiki/Test_case)，以檢查合約的執行是不是預期的結果。

### 測試智能合約的重要性 {#importance-of-testing-smart-contracts}

由於智能合約通常掌控高財物價值的金融資產，即使是微小的錯誤仍可以造成[使用者的巨大損失](https://rekt.news/leaderboard/)。 嚴密的測試則可以幫助我們即早發現合約程式碼裡的漏洞與問題，並在他們被部署到主網前進行修復。

雖然在發現漏洞後進行合約的升級是可行的，但合約的升級實作複雜，如果實作不正確也可能[造成更多問題](https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/)。 而合約的升級看似打破了區塊鏈資料的不可篡改性，也讓使用者需要接受額外的信任假設。 因此，我們反而應制定完整的測試計畫，來降低智能合約的安全性風險、避免需要在智能合約部署後進行複雜的合約升級。

## 智能合約測試方法論 {#methods-for-testing-smart-contracts}

測試以太坊智能合約的方法分為兩大類：**自動化測試**及**手動測試**。 自動化測試與手動測試各有優缺，而兩者可以併用成一個完整測試合約的方案。

### 自動化測試 {#automated-testing}

自動化測試使用工具來自動偵測智能合約程式碼在執行時的錯誤， 而其好處在於使用[腳本](https://www.techtarget.com/whatis/definition/script?amp=1)來評估合約的功能。 寫成腳本的測試可以被安排重複地執行來減少人為參與，讓自動化測試比手動測試更為有效率。

自動化測試在以下情境特別有用：測試範例重複性高且費時、難以以手動測試、容易有人為的錯誤，或牽涉到關鍵的合約功能。 而其限制則是可能會遺漏一些漏洞，並可能產生[偽陽性、虛報答案的結果](https://www.contrastsecurity.com/glossary/false-positive)。 因此，將自動化測試與手動測試並用較為理想。

### 手動測試 {#manual-testing}

手動測試需要真人的輔助，一一執行每一個測試範例來分析智能合約的正確性。 這和自動化測試不同，沒辦法同時在一份合約上去執行多個獨立的測試，並得到一個顯示所有成功與失敗測試的報告。

手動測試可以由一個人，依照預寫好的測試計畫，來執行不同的測試情境。 也可以由許多人、或是幾組人，在一段時間內，來與一份合約互動、進行測試。 測試者會把測試出來的實際結果，和預期行為相比較，並把兩者的不同回報為漏洞。

有效的手動測試需要大量的資源（技術、時間、金錢與人力），而且有可能因為人為的疏失，而漏掉了測試時的一些錯誤。 但手動測試仍然是有幫助的，舉例來說，一個真人測試員（如審計員）或許可以用直覺來找出一些極端情境，但自動化測試工具則不一定有辦法。

## 智能合約的自動化測試 {#automated-testing-for-smart-contracts}

### 單元測試 {#unit-testing-for-smart-contracts}

單元測試分別測試每個函式並確認每一個子件正常的運作 好的單元測試應該要簡單並且快速的運作，並在有錯誤的時候讓人清楚的知道問題發生在哪。

單元測試在韓式執行完後確認回傳值正確且合約的存儲正確更新時很有用 此外，在更改合約的程式碼之後運行單元測試可以很好的確認新的邏輯並沒有造成新的錯誤 以下是一些如何運行有效單元測試的指南

#### 智能合約單元測試指南 {#unit-testing-guidelines}

##### 1.  了解你的智能合約的商務邏輯以及工作流程

在撰寫單元測試之前，知道智能合約提供什麼樣的功能以及使用者要如何存取並使用這些函式很有幫助。 這對於進行 [happy path tests](https://en.m.wikipedia.org/wiki/Happy_path) 時特別有用，這個測試是為了確定合約中的函式是否對有效的用戶輸入回傳正確的值。 我們會用這個 (簡略的) [拍賣合約](https://docs.soliditylang.org/en/v0.8.17/solidity-by-example.html?highlight=Auction%20contract#simple-open-auction)作為例子來解釋這個概念。

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

這是一個設計來在可出價期間接收出價的簡單拍賣合約 當`highestBid` 增加時，上一個最高出價者收回他們的錢；一旦拍賣期間結束，`beneficiary` 呼叫合約以取得他的錢。

對於這樣的合約，單元測試會涵蓋各種使用者在與合約互動時會呼叫的函式。 舉個例子，單元測試可能測試使勇者是否能在出價期間進行出價 (也就是成功呼叫 `bid()`)，或者是測試使用者是否可以出一個比現在的 `highestBid` 更高的價格。

了解合約的工作流程也能對撰寫測試執行結果符合要求的單元測試有所幫助。 舉例來說，這個拍賣合約指明使用者不能在拍賣結束後出價(也就是當 `auctionEndTime` 小於`block.timestamp`的時候) 因此，開發者可能會執行一個確認在拍賣結束後 (`auctionEndTime` > `block.timestamp`時) 呼叫`bid()`是否能成功的單元測試

##### 2. 評估所有關於合約執行的假設

記錄任何關於合約執行的假設並編寫單元測試來測試其安全性是有可能的。 除了提供針對執行的保護，測試斷言還迫使你考慮可能破壞智能合約安全糢型的操作。 一個有用的技巧是不僅要進行“正向測試”，還要編寫負面測試，檢查函數對錯誤的輸入是否會失敗。

許多單元測試框架允許你創建斷言 - 陳述能做和不能做的事情的聲明 - 並運行測試來查看這些斷言在執行中是否成立。 開發前面描述的拍賣合約的開發者可以在運行異常測試之前對其行爲做出以下斷言:

- 用戶無法在拍賣未開始或結束時出價。

- 如果出價低於可接受的門檻，拍賣合約就會還原。

- 未能贏得競標的用戶將獲得其資金的退款

**注**: 測試假設的另一種方式是編寫在合約中觸發[函數修飾符](https://docs.soliditylang.org/en/v0.8.16/contracts.html#function-modifiers)的測試，特別是 `require`、`assert` 和 `if…else` 聲明。

##### 3 計算程式覆蓋率

[程式碼覆蓋率](https://en.m.wikipedia.org/wiki/Code_coverage)是一種測試指標，用於追蹤在測試過程中執行的程式碼分支、行數和語句數量。 測試應該涵蓋足夠多的程式碼，否則你可能會遭遇 “漏報”，即合約通過了所有測試，但漏洞依然存在于代碼中。 但是，透過涵蓋足夠多的代碼，就可以確保智能合約中的所有聲明/函數都經過充分的正確性測試。

##### 4 使用精心開發的測試框架

在合約運行單元測試時使用的工具品質至關重要。 理想的測試框架應該是定期維護的；提供實用功能的 (如記錄和報告功能)；並且必須經過其他開發者的廣泛使用與審查。

Solidity 智能合約的單元測試框架有不同的語言 (大多數為 JavaScript、Python 和 Rust)。 請在下方指南查看如何使用不同的測試框架運行單元測試:

- **[使用 Brownie 運行單元測試](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)**
- **[使用 Foundry 運行單元測試](https://book.getfoundry.sh/forge/writing-tests)**
- **[使用 Waffle 運行單元測試](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#writing-tests)**
- **[使用 Remix 運行單元測試](https://remix-ide.readthedocs.io/en/latest/unittesting.html#write-tests)**
- **[使用 Ape 運行單元測試](https://docs.apeworx.io/ape/stable/userguides/testing.html)**
- **[使用 Hardhat 運行單元測試](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)**
- **[使用 Wake 運行單元測試](https://ackeeblockchain.com/wake/docs/latest/testing-framework/overview/)**

### 整合測試 {#integration-testing-for-smart-contracts}

單元測試對合約函數進行單獨除錯，而整合測試將智能合約的部件作爲一個整體進行評估。 整合測試可以檢測源自跨合約調用或同一個智能合約中不同函數閒互動的問題。 例如，整合測試能夠幫助檢查如[繼承](https://docs.soliditylang.org/en/v0.8.12/contracts.html#inheritance)和依賴性注入之類的功能是否正常運作。

如果你的合約採用模組化結構或在執行期間與其他鏈上合約互動，整合測試就很實用。 運行整合測試的一個方法是在一個特定高度[分叉區塊鏈](/glossary/#fork) (使用類似 [Forge](https://book.getfoundry.sh/forge/fork-testing) 或 [Hardhat](https://hardhat.org/hardhat-network/docs/guides/forking-other-networks) 的工具)，並模擬在你的合約與部署的合約之間的互動。

分叉的區塊鏈將與主網的行為類似，其帳戶具有關聯的狀態和餘額。 但它只作爲一個沙盒本地開發環境運行，這意味著你不需要用真實的以太幣來交易，你的更改也不會影響真實的以太坊協議。

### 基於特性的測試 {#property-based-testing-for-smart-contracts}

基於屬性的測試是一種檢查智能合約是否滿足一些定義的屬性的過程。 屬性是關於合約行為的斷言，預期其行為在不同的場景中始終保持為真。智能合約屬性的一個例子可以是「合約中的算術運算永不溢出或下溢」。

**靜態分析**和**動態分析**是執行基於屬性的測試的常見技術，並且兩者都可以驗證程式 (在這裏為智能合約) 的程式碼是否滿足某些預定義屬性。 一些基於屬性的測試工具自帶一些關於預期合約屬性的預定義規則，並根據這些規則檢查程式碼，而其他工具則允許你為智能合約創建自訂屬性。

#### 靜態分析 {#static-analysis}

靜態分析器將智能合約的源程式碼作爲輸入，並輸出聲明合約是否滿足屬性的結果。 與動態分析不同，靜態分析不涉及執行合約來分析其正確性。 相反，靜態分析器會推理智能合約在執行期間可能選擇的所有路徑 (例如，透過檢視源程式碼的結構來確定合約操作在運行時的意義)。

[Linting](https://www.perforce.com/blog/qac/what-lint-code-and-why-linting-important) 和[靜態測試](https://www.techtarget.com/whatis/definition/static-analysis-static-code-analysis)是合約執行靜態分析的常見方法。 兩者都需要對合約執行的低階表示進行分析，例如由編譯器輸出的[抽象語法樹](https://en.m.wikipedia.org/wiki/Abstract_syntax_tree)和[控制流程圖](https://www.geeksforgeeks.org/software-engineering-control-flow-graph-cfg/amp/)。

在多數情況下，靜態分析器對安全問題很有用，例如不安全構造，語法錯誤或違反合約程式碼中的編程標準。 然而，靜態分析器被認爲在檢測深層漏洞方面通常不健全，並可能會產生過多的誤報。

#### 動態分析 {#dynamic-analysis}

動態分析為智能合約函數生成符號輸入 (例如，在[符號執行](https://en.m.wikipedia.org/wiki/Symbolic_execution)中) 或具體輸入 (例如，在[初略](https://owasp.org/www-community/Fuzzing)中) 來查看是否有任何執行軌跡違反特定屬性。 此類基於屬性的測試與單元測試不同，其測試用例涵蓋了多種場景，並且有一個程式處理測試用例的生成。

[模糊測試](https://halborn.com/what-is-fuzz-testing-fuzzing/)是一種用於驗證智能合約中任意屬性的動態分析技術的範例。 模糊測試工具使用隨機或畸形的變化來呼叫目標合約中的函數，以對預先定義的輸入值進行測試。 如果智能合約輸入錯誤狀態 (即當斷言失敗時)，問題就會被標記，並在報告中產生將執行推動到脆弱路徑的輸入。

初略對於評估智能合約輸入驗證機制很有用，因爲對意外輸入的不正確處理可能會導致意外執行並產生危險的影響。 這種基於屬性的測試形式可能非常理想，原因有多種：

1. **編寫涵蓋許多場景的測試用例是很難的。**屬性測試只需要你定義一個行爲以及用於測試該行爲的一系列數據 - 程式會根據定義的屬性自動生成測試用例。

2. **你的測試套件或許無法充分涵蓋程式中所有可能的路徑。**即便有 100% 的涵蓋率，也可能會錯過邊緣案例。

3. **單元測試證明合約正確執行採樣數據，但採樣以外的輸入是否正確執行仍然未知。**屬性測試使用給定輸入值的多個變體來執行目標合約，以此找出導致斷言失敗的執行軌跡。 因此，屬性測試為合約在廣泛的輸入資料類別下正確執行提供了更多的保證。

### 對智能合約運行基於屬性的測試的準則 {#running-property-based-tests}

運行基於屬性的測試通常從定義一個屬性 (例如，[整數溢位](https://github.com/ConsenSys/mythril/wiki/Integer-Overflow)的缺乏) 或者你希望在智能合約中驗證的屬性集合開始。 你可能還需要定義一個數值範圍，使程式能夠在編寫屬性測試時在該範圍内為交易輸入生成數據。

配置正確後，屬性測試工具將使用隨機產生的輸入來執行你的智能合約函數。 如果有任何斷言違規情況，你應該獲得一份報告，其中包含違反正在評估的屬性的具體輸入資料。 請參閱下面的指南，了解如何使用不同的工具開始執行基於屬性的測試：

- **[使用 Slither 的智能合約靜態分析](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/slither#slither)**
- **[使用 Wake 的智能合約靜態分析](https://ackeeblockchain.com/wake/docs/latest/static-analysis/using-detectors/)**
- **[使用 Brownie 進行基於屬性的測試](https://eth-brownie.readthedocs.io/en/stable/tests-hypothesis-property.html)**
- **[使用 Foundry 的初略合約](https://book.getfoundry.sh/forge/fuzz-testing)**
- **[使用 Echidna 的初略合約](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna#echidna-tutorial)**
- **[使用 Wake 的初略合約](https://ackeeblockchain.com/wake/docs/latest/testing-framework/fuzzing/)**
- **[使用 Manticore 的智能合約符號執行](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore#manticore-tutorial)**
- **[使用 Mythril 的智能合約符號執行](https://mythril-classic.readthedocs.io/en/master/tutorial.html)**

## 手動測試智慧合約 {#manual-testing-for-smart-contracts}

在開發後期經常會進行智慧型合約手動測試，而這類測試通常在執行自動化測試之後進行。 此類測試將智能合約作爲完全整合的產品進行評估，以此檢查其是否符合技術要求中的規範。

### 在本地區塊鏈測試合約 {#testing-on-local-blockchain}

儘管在本地開發環境中執行的自動化測試能夠提供有用的除錯信息，你仍然會想知道你的合約在生產環境中的運行情況。 然而，部署到以太坊主鏈需要燃料費 - 更不用説如果你的智能合約仍有漏洞，你或你的用戶可能會損失真正的金錢。

在本地區塊鏈 (也被稱爲[開發者網路](/developers/docs/development-networks/)) 上測試你的合約，是在主網上進行測試的建議替代方案。 本地區塊鏈是在你的電腦上本地運行的以太坊區塊鏈的副本，它模擬了以太坊執行層的行爲。 因此，你可以編程交易與合約進行交互，而不會產生大量開銷。

在本地的區塊鏈上跑合約可以有助於完成手動的整合測試， [智能合約具有高度可組合性](/developers/docs/smart-contracts/composability/)，允許你整合現有的協議 - 但你仍然需要確保這種複雜的鏈上整合產生正確的結果。

[有關開發網路的更多資訊。](/developers/docs/development-networks/)

### 在測試網上測試合約 {#testing-contracts-on-testnets}

測試網路或測試網的運作方式與以太坊主網完全相同，唯一的區別在於它使用沒有現實價值的以太幣 (ETH)。 在[測試網](/developers/docs/networks/#ethereum-testnets)上部署你的合約意味著任何人都可以與之互動（例如，透過去中心化應用程式的前端），而無需承擔資金風險。

這種手動測試形式對於從使用者角度評估應用程式的端到端流程非常有用。 在這裡，測試人員還可以進行試運行，並報告與合約的業務邏輯和整體功能有關的任何問題。

在本地區塊鏈上進行測試後，部署到測試網是理想的選擇，因為測試網更接近以太坊虛擬機的行為。 因此，許多智能合約通常會將去中心化應用程式部署到測試網上來在現實條件下評估智能合約的運作。

[更多以太坊測試網相關資訊。](/developers/docs/development-networks/#public-beacon-testchains)

## 測試與形式化驗證 {#testing-vs-formal-verification}

儘管測試幫助確認合約對特定數據輸入返回預期結果，但對於測試期間未使用的輸入，它無法完全證明相同的結果。 因此，測試智能合約無法保證 “函數正確性” (即無法確保程式對於_所有_輸入值都按照要求運作)。

形式化驗證是一種透過檢查程式的形式化模型是否符合形式化規範來評估軟體正確性的方法。 形式化模型是程式的抽象數學表示，而形式化規範定義程式的屬性 (即程式執行的邏輯斷言)。

因爲屬性由數學術語編寫，它能夠使用邏輯推理規則來驗證系統的形式化 (數學) 模型是否滿足規範。 因此，形式化驗證工具被稱為能夠提供系統正確性的「數學證明」。

與測試不同，形式化驗證可用於驗證智能合約執行是否滿足_所有_執行的形式化規範 (即沒有漏洞) 而無需使用採樣數據。 這不僅減少了運行數十個單元測試所花費的時間，而且在發現隱藏漏洞方面也更有效。 話雖如此，形式化驗證技術在實施難度和實用性上存在一定的變化程度。

[更多關於智能合約的形式化驗證的資訊。](/developers/docs/smart-contracts/formal-verification)

## 測試與審核以及漏洞懸賞計劃 {#testing-vs-audits-bug-bounties}

如上所述，嚴格的測試很難保證合約中沒有錯誤；形式化驗證方法可以提供更有力的正確性保證，但目前仍難以使用並且需要大量成本。

儘管如此，你仍可透過獨立的程式碼審查來進一步增加捕捉合約漏洞的可能性。 [智慧型合約審核](https://www.immunebytes.com/blog/what-is-a-smart-contract-audit/)和[漏洞懸賞](https://medium.com/immunefi/a-defi-security-standard-the-scaling-bug-bounty-9b83dfdc1ba7)是讓他人分析你的合約的兩種方式。

審查由具有在智能合約中發現安全漏洞和開發不良實踐案例經驗的審查人員進行。 審核通常包括對整個程式碼庫進行測試（可能包括形式化驗證）以及手動審查。

相反，漏洞懸賞計劃通常包括向在智能合約中發現漏洞並向開發者報告的個人 (通常被描述爲[白帽駭客](https://en.wikipedia.org/wiki/White_hat_(computer_security))) 提供經濟獎勵。 漏洞獎勵類似於審查，因為它涉及要求其他人幫助發現智能合約中的缺陷。

主要的區別是漏洞懸賞計劃對更廣泛的開發者/駭客開放，並吸引了廣泛的擁有獨特技能與經驗的道德駭客和獨立安全專家。 與主要依賴可能擁有有限或狹窄專業知識的團隊的智能合約審查相比，這可能是一個優勢。

## 測試道具與資料圖書庫 {#testing-tools-and-libraries}

### 單元測試工具 {#unit-testing-tools}

- **[solidity-coverage](https://github.com/sc-forks/solidity-coverage)** - _Solidity 合約程式覆蓋工具_

- **[Waffle](https://ethereum-waffle.readthedocs.io/en/latest/)** - _用於高級智能合約開發和測試的框架（基於ethers.js）_。

- **[Remix 測試](https://github.com/ethereum/remix-project/tree/master/libs/remix-tests)** - _用來測試Solidity 智能合約的工具。 在 Remix IDE 的“Solidity Unit Testing”插件下工作，該插件用於編寫和運行合約的測試案例。 _

- **[OpenZeppelin Test Helpers](https://github.com/OpenZeppelin/openzeppelin-test-helpers)** - _用於以太坊智能合約測試的斷言庫。 讓你的合約運作自如正常!_

- **[Brownie 單元測試框架](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)** - _Brownie 利用 Pytest，即一個功能豐富的測試框架，使你能夠用最少的程式碼編寫小型測試，並且對於大型項目擴展良好，具有高度可擴展性。_

- **[Foundry 測試](https://github.com/foundry-rs/foundry/tree/master/forge)** - _Foundry 提供了 Forge，即一個快速且靈活的以太坊測試框架，能夠執行簡單的單元測試、燃料優化檢查，以及合約初略。_

- **[Hardhat 測試](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)** - _基於ethers.js、Mocha 和Chai 的智慧合約測試框架。 _

- **[ApeWorx](https://docs.apeworx.io/ape/stable/userguides/testing.html)** - _基於Python 的智慧合約開發與測試框架，針對太坊虛擬機。 _

- **[Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/overview/)** - _基於 Python 的框架，為單元測試和初略提供了强大的除錯功能和跨鏈測試支持，利用 pytest 和 Anvil 實現最佳的用戶體驗和性能。_

### 基於屬性測試的工具 {#property-based-testing-tools}

#### 靜態分析工具 {#static-analysis-tools}

- **[Slither](https://github.com/crytic/slither)** - _基於 Python 的 Solidity 靜態分析框架，能夠為智能合約尋找漏洞、增强程式碼理解，以及編寫自訂分析。_

- **[Ethlint](https://ethlint.readthedocs.io/en/latest/)** - _用於執行Solidity 智能合約程式語言的風格和安全最佳實踐的Linter。 _

- **[Cyfrin Aderyn](https://cyfrin.io/tools/aderyn)** - _基於Rust 的靜態分析器，專為Web3 智慧合約安全和開發而設計。 _

- **[Wake](https://ackeeblockchain.com/wake/docs/latest/static-analysis/using-detectors/)** - _基於 Python 的靜態分析框架，具有漏洞和代碼品質偵察器、提取有用信息的印刷機，以及對編寫自訂子模組的支持。_

#### 動態分析工具 {#dynamic-analysis-tools}

- **[Echidna](https://github.com/crytic/echidna/)** - _透過基於屬性的測試來檢測智能合約漏洞的快速合約模糊測試工具。 _

- **[Diligence Fuzzing](https://consensys.net/diligence/fuzzing/)** - _自動化模糊測試工具，用於偵測智慧合約程式碼中的屬性違規行為。 _

- **[Manticore](https://manticore.readthedocs.io/en/latest/index.html)** - _用於分析以太坊虛擬機器(EVM) 字節碼的動態符號執行框架。 _

- **[Mythril](https://github.com/ConsenSys/mythril-classic)** - _以太坊虛擬機位元組碼分析工具，能夠使用污染分析、一致性分析和控制流檢查來檢測合約漏洞。_

- **[Diligence Scribble](https://consensys.net/diligence/scribble/)** - _Scribble 是一種規範語言和運行時檢查工具，允許你使用屬性注解智能合約，從而使你能夠使用如 Diligence 初略和 MythX 的工具來自動測試合約。_

## 相關教學 {#related-tutorials}

- [不同測試產品的概述和比較](/developers/tutorials/guide-to-smart-contract-security-tools/) \_
- [如何使用 Echidna測試智慧型合約.](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/)
- [如何使用 Manticore 搜索智慧型合約bug.](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)
- [如何使用 Slither 來搜尋智慧型合約漏洞](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)
- [如何測試及模仿複製 Solidity 合約.](/developers/tutorials/how-to-mock-solidity-contracts-for-testing/)
- [如何使用 Foundry 在 Solidity 中執行單元測試](https://www.rareskills.io/post/foundry-testing-solidity)

## 了解更多 {#further-reading}

- [測試以太坊智慧型合約的深入指南](https://iamdefinitelyahuman.medium.com/an-in-depth-guide-to-testing-ethereum-smart-contracts-2e41b2770297)
- [如何測試以太坊智慧型合約](https://betterprogramming.pub/how-to-test-ethereum-smart-contracts-35abc8fa199d)
- [MolochDAO 的開發者單元測試指南](https://github.com/MolochVentures/moloch/tree/4e786db8a4aa3158287e0935dcbc7b1e43416e38/test#moloch-testing-guide)
- [如何像專家一樣測試智能合約](https://forum.openzeppelin.com/t/test-smart-contracts-like-a-rockstar/1001)
