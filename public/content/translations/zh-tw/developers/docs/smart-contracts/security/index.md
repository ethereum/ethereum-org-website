---
title: "智能合約安全"
description: "建立安全以太坊智能合約的指南總覽"
lang: zh-tw
---

智能合約極具彈性，能夠控制大量的價值與資料，同時根據部署在區塊鏈上的程式碼執行不可變的邏輯。這創造了一個充滿活力的無須信任且去中心化的應用程式生態系，提供了許多傳統系統所沒有的優勢。它們也為企圖透過利用智能合約漏洞來獲利的攻擊者提供了機會。

像[以太坊](/)這樣的公有區塊鏈，進一步使保護智能合約的問題變得更加複雜。已部署的合約程式碼_通常_無法更改以修補安全漏洞，而從智能合約中遭竊的資產極難追蹤，且由於不可竄改性，大多無法追回。

雖然數據不一，但據估計，因智能合約安全缺陷而遭竊或遺失的總價值輕易超過 10 億美元。這包含了備受矚目的事件，例如 [DAO 駭客攻擊](https://hackingdistributed.com/2016/06/18/analysis-of-the-dao-exploit/)（遭竊 360 萬枚 ETH，以今日價格計算價值超過 10 億美元）、[Parity 多重簽名錢包駭客攻擊](https://www.coindesk.com/markets/2017/07/19/30-million-ether-reported-stolen-due-to-parity-wallet-breach)（駭客盜走 3,000 萬美元），以及 [Parity 凍結錢包問題](https://www.theguardian.com/technology/2017/nov/08/cryptocurrency-300m-dollars-stolen-bug-ether)（超過 3 億美元的 ETH 永遠被鎖定）。

上述問題使得開發人員必須投入心力建立安全、穩健且具備韌性的智能合約。智能合約安全是一件嚴肅的事情，也是每位開發人員都應該好好學習的課題。本指南將涵蓋以太坊開發人員的安全考量，並探索用於提升智能合約安全的資源。

## 先決條件 {#prerequisites}

在著手處理安全性問題之前，請確保您熟悉[智能合約開發的基礎知識](/developers/docs/smart-contracts/)。

## 構建安全以太坊智能合約的指南 {#smart-contract-security-guidelines}

### 1. 設計適當的存取控制 {#design-proper-access-controls}

在智能合約中，標記為 `public` 或 `external` 的函式可以被任何外部擁有帳戶 (EOA) 或合約帳戶呼叫。如果您希望其他人與您的合約互動，則必須為函式指定公開可見性。然而，標記為 `private` 的函式只能由智能合約內部的函式呼叫，而不能由外部帳戶呼叫。讓每個網路參與者都能存取合約函式可能會導致問題，特別是如果這意味著任何人都可以執行敏感操作（例如，鑄造新代幣）。

為了防止未經授權使用智能合約函式，必須實作安全的存取控制。存取控制機制將智能合約中某些函式的使用權限限制在經過批准的實體，例如負責管理合約的帳戶。**Ownable 模式**和**基於角色的控制**是兩種在智能合約中實作存取控制的實用模式：

#### Ownable 模式 {#ownable-pattern}

在 Ownable 模式中，在合約建立過程中會將一個地址設定為合約的「擁有者」。受保護的函式會被分配一個 `OnlyOwner` 修飾符，這確保合約在執行函式之前會驗證呼叫地址的身份。除了合約擁有者之外，來自其他地址對受保護函式的呼叫總是會回滾，從而防止不必要的存取。

#### 基於角色的存取控制 {#role-based-access-control}

在智能合約中將單一地址註冊為 `Owner` 會引入中心化風險，並代表著單點故障。如果擁有者的帳戶金鑰遭到洩露，攻擊者就可以攻擊其擁有的合約。這就是為什麼使用具有多個管理帳戶的基於角色的存取控制模式可能是更好的選擇。

在基於角色的存取控制中，對敏感函式的存取權限分佈在一組受信任的參與者之間。例如，一個帳戶可能負責鑄造代幣，而另一個帳戶則執行升級或暫停合約。以這種方式去中心化存取控制消除了單點故障，並減少了使用者的信任假設。

##### 使用多重簽名錢包
另一種實作安全存取控制的方法是使用[多重簽名帳戶](/developers/docs/smart-contracts/#multisig)來管理合約。與常規 EOA 不同，多重簽名帳戶由多個實體擁有，並且需要最少數量的帳戶（例如 5 個中的 3 個）簽名才能執行交易。

使用多方簽名進行存取控制引入了額外的安全層，因為對目標合約的操作需要多方的同意。如果必須使用 Ownable 模式，這將特別有用，因為它使攻擊者或惡意內部人員更難出於惡意目的操縱敏感的合約函式。

### 2. 使用 require()、assert() 和 revert() 語句來保護合約操作 {#use-require-assert-revert}

如前所述，一旦您的智能合約部署在區塊鏈上，任何人都可以呼叫其中的公開函式。由於您無法預先知道外部帳戶將如何與合約互動，因此在部署之前實作內部保護措施以防止有問題的操作是理想的做法。您可以透過使用 `require()`、`assert()` 和 `revert()` 語句來強制執行智能合約中的正確行為，如果執行未能滿足某些要求，這些語句將觸發例外並回滾狀態變更。

**`require()`**：`require` 定義在函式的開頭，並確保在執行被呼叫的函式之前滿足預先定義的條件。`require` 語句可用於驗證使用者輸入、檢查狀態變數，或在繼續執行函式之前驗證呼叫帳戶的身份。

**`assert()`**：`assert()` 用於檢測內部錯誤並檢查程式碼中是否違反了「不變量」。不變量是關於合約狀態的邏輯斷言，對於所有函式執行都應該保持為真。不變量的一個例子是代幣合約的最大總供應量或餘額。使用 `assert()` 可確保您的合約永遠不會達到易受攻擊的狀態，如果確實如此，所有對狀態變數的變更都會被回滾。

**`revert()`**：`revert()` 可用於 if-else 語句中，如果不滿足所需條件，則觸發例外。下面的範例合約使用 `revert()` 來保護函式的執行：

```
pragma solidity ^0.8.4;

contract VendingMachine {
    address owner;
    error Unauthorized();
    function buy(uint amount) public payable {
        if (amount > msg.value / 2 ether)
            revert("Not enough Ether provided.");
        // 執行購買。
    }
    function withdraw() public {
        if (msg.sender != owner)
            revert Unauthorized();

        payable(msg.sender).transfer(address(this).balance);
    }
}
```

### 3. 測試智能合約並驗證程式碼正確性 {#test-smart-contracts-and-verify-code-correctness}

在[以太坊虛擬機](/developers/docs/evm/)中執行的程式碼具有不可竄改性，這意味著智能合約在開發階段需要更高水準的品質評估。廣泛測試您的合約並觀察是否有任何意外結果，將大大提高安全性並在長遠來看保護您的使用者。

通常的方法是使用預期合約將從使用者那裡接收的模擬資料來編寫小型單元測試。[單元測試](/developers/docs/smart-contracts/testing/#unit-testing)非常適合測試某些函式的功能並確保智能合約按預期運作。

不幸的是，單獨使用單元測試對於提高智能合約安全性的效果微乎其微。單元測試可能證明函式對於模擬資料執行正確，但單元測試的有效性僅取決於所編寫的測試。這使得很難檢測到可能破壞智能合約安全性的遺漏邊緣情況和漏洞。

更好的方法是將單元測試與使用[靜態和動態分析](/developers/docs/smart-contracts/testing/#static-dynamic-analysis)執行的基於屬性的測試結合起來。靜態分析依賴於低階表示，例如[控制流程圖](https://en.wikipedia.org/wiki/Control-flow_graph)和[抽象語法樹](https://deepsource.io/glossary/ast/)，來分析可達的程式狀態和執行路徑。同時，動態分析技術（例如[智能合約模糊測試](https://www.cyfrin.io/blog/smart-contract-fuzzing-and-invariants-testing-foundry)）使用隨機輸入值執行合約程式碼，以檢測違反安全屬性的操作。

[形式化驗證](/developers/docs/smart-contracts/formal-verification)是另一種驗證智能合約中安全屬性的技術。與常規測試不同，形式化驗證可以確鑿地證明智能合約中沒有錯誤。這是透過建立一個捕捉所需安全屬性的形式化規範，並證明合約的形式化模型遵守該規範來實現的。

### 4. 尋求對您程式碼的獨立審查 {#get-independent-code-reviews}

測試合約後，最好請其他人檢查原始碼是否存在任何安全問題。測試不會發現智能合約中的每一個缺陷，但獲得獨立審查會增加發現漏洞的可能性。

#### 稽核 {#audits}

委託進行智能合約稽核是進行獨立程式碼審查的一種方式。稽核員在確保智能合約安全且沒有品質缺陷和設計錯誤方面發揮著重要作用。

話雖如此，您應該避免將稽核視為萬靈丹。智能合約稽核不會捕捉到每一個錯誤，其主要目的是提供額外一輪的審查，這有助於檢測開發人員在初始開發和測試期間遺漏的問題。您還應該遵循與稽核員合作的最佳實踐，例如正確記錄程式碼和添加內聯註解，以最大化智能合約稽核的效益。

- [智能合約稽核提示與技巧](https://twitter.com/tinchoabbate/status/1400170232904400897) - _@tinchoabbate_
- [充分利用您的稽核](https://inference.ag/blog/2023-08-14-tips/) - _Inference_

#### 漏洞賞金 {#bug-bounties}

建立漏洞賞金計畫是實作外部程式碼審查的另一種方法。漏洞賞金是給予發現應用程式漏洞的個人（通常是白帽駭客）的財務獎勵。

如果使用得當，漏洞賞金會激勵駭客社群的成員檢查您的程式碼是否存在嚴重缺陷。一個真實的例子是「無限金錢漏洞」，該漏洞本可以讓攻擊者在以太坊上執行的[第二層 (L2)](/layer-2/) 協定 [Optimism](https://www.optimism.io/) 上創造無限數量的以太幣。幸運的是，一位白帽駭客[發現了這個缺陷](https://www.saurik.com/optimism.html)並通知了團隊，[在此過程中獲得了巨額獎金](https://cryptoslate.com/critical-bug-in-ethereum-l2-optimism-2m-bounty-paid/)。

一個有用的策略是將漏洞賞金計畫的獎金設定為與面臨風險的資金數量成比例。這種被稱為「[可擴展漏洞賞金](https://medium.com/immunefi/a-defi-security-standard-the-scaling-bug-bounty-9b83dfdc1ba7)」的方法為個人提供了財務激勵，鼓勵他們負責任地披露漏洞，而不是利用它們。

### 5. 在智能合約開發期間遵循最佳實踐 {#follow-smart-contract-development-best-practices}

稽核和漏洞賞金的存在並不能免除您編寫高品質程式碼的責任。良好的智能合約安全性始於遵循適當的設計和開發流程：

- 將所有程式碼儲存在版本控制系統中，例如 git

- 透過拉取請求 (pull request) 進行所有程式碼修改

- 確保拉取請求至少有一位獨立的審查者——如果您獨自進行專案，請考慮尋找其他開發人員並交換程式碼審查

- 使用[開發環境](/developers/docs/frameworks/)來測試、編譯、部署智能合約

- 透過基本的程式碼分析工具（例如 [Cyfrin Aderyn](https://github.com/Cyfrin/aderyn)、Mythril 和斯立瑟 (Slither)）執行您的程式碼。理想情況下，您應該在合併每個拉取請求之前執行此操作，並比較輸出的差異

- 確保您的程式碼編譯沒有錯誤，並且 Solidity 編譯器沒有發出警告

- 正確記錄您的程式碼（使用 [NatSpec](https://solidity.readthedocs.io/en/develop/natspec-format.html)）並以易於理解的語言描述有關合約架構的詳細資訊。這將使其他人更容易稽核和審查您的程式碼。

### 6. 實作穩健的災難復原計畫 {#implement-disaster-recovery-plans}

設計安全的存取控制、實作函式修飾符以及其他建議可以提高智能合約的安全性，但它們不能排除惡意利用的可能性。構建安全的智能合約需要「為失敗做好準備」，並制定後備計畫以有效應對攻擊。適當的災難復原計畫將包含以下部分或全部元件：

#### 合約升級 {#contract-upgrades}

雖然以太坊智能合約預設是不可變的，但可以透過使用升級模式來實現某種程度的可變性。在嚴重缺陷導致舊合約無法使用且部署新邏輯是最可行選項的情況下，升級合約是必要的。

合約升級機制的運作方式各不相同，但「代理模式」是升級智能合約較受歡迎的方法之一。[代理模式](https://www.cyfrin.io/blog/upgradeable-proxy-smart-contract-pattern)將應用程式的狀態和邏輯拆分到_兩個_合約中。第一個合約（稱為「代理合約」）儲存狀態變數（例如，使用者餘額），而第二個合約（稱為「邏輯合約」）保存用於執行合約函式的程式碼。

帳戶與代理合約互動，代理合約使用 [`delegatecall()`](https://docs.soliditylang.org/en/v0.8.16/introduction-to-smart-contracts.html?highlight=delegatecall#delegatecall-callcode-and-libraries) 低階呼叫將所有函式呼叫分派給邏輯合約。與常規的訊息呼叫不同，`delegatecall()` 確保在邏輯合約地址執行的程式碼是在呼叫合約的上下文中執行的。這意味著邏輯合約將始終寫入代理的儲存空間（而不是其自己的儲存空間），並且保留了 `msg.sender` 和 `msg.value` 的原始值。

將呼叫委託給邏輯合約需要將其地址儲存在代理合約的儲存空間中。因此，升級合約的邏輯只需部署另一個邏輯合約並將新地址儲存在代理合約中即可。由於隨後對代理合約的呼叫會自動路由到新的邏輯合約，因此您無需實際修改程式碼即可「升級」合約。

[更多關於升級合約的資訊](/developers/docs/smart-contracts/upgrading/)。

#### 緊急停止 {#emergency-stops}

如前所述，廣泛的稽核和測試不可能發現智能合約中的所有錯誤。如果部署後您的程式碼中出現漏洞，則無法對其進行修補，因為您無法更改在合約地址執行的程式碼。此外，升級機制（例如代理模式）可能需要時間來實作（它們通常需要不同方的批准），這只會給攻擊者更多時間造成更多損害。

終極手段是實作一個「緊急停止」函式，阻止對合約中易受攻擊函式的呼叫。緊急停止通常包含以下元件：

1. 一個全域布林變數，指示智能合約是否處於停止狀態。在設定合約時，此變數設定為 `false`，但一旦合約停止，將變為 `true`。

2. 在執行中引用該布林變數的函式。當智能合約未停止時，可以存取此類函式，而當觸發緊急停止功能時，這些函式將變得無法存取。

3. 有權存取緊急停止函式的實體，該函式將布林變數設定為 `true`。為了防止惡意操作，可以將對此函式的呼叫限制為受信任的地址（例如，合約擁有者）。

一旦合約啟動緊急停止，某些函式將無法被呼叫。這是透過將選定的函式包裝在引用全域變數的修飾符中來實現的。以下是描述在合約中實作此模式的[一個範例](https://github.com/fravoll/solidity-patterns/blob/master/EmergencyStop/EmergencyStop.sol)：

```solidity
// 此程式碼未經專業審計，不保證安全性或正確性。使用風險自負。

contract EmergencyStop {

    bool isStopped = false;

    modifier stoppedInEmergency {
        require(!isStopped);
        _;
    }

    modifier onlyWhenStopped {
        require(isStopped);
        _;
    }

    modifier onlyAuthorized {
        // 在此檢查 msg.sender 的授權
        _;
    }

    function stopContract() public onlyAuthorized {
        isStopped = true;
    }

    function resumeContract() public onlyAuthorized {
        isStopped = false;
    }

    function deposit() public payable stoppedInEmergency {
        // 存款邏輯在此發生
    }

    function emergencyWithdraw() public onlyWhenStopped {
        // 緊急提款在此發生
    }
}
```

此範例顯示了緊急停止的基本特徵：

- `isStopped` 是一個布林值，一開始評估為 `false`，當合約進入緊急模式時評估為 `true`。

- 函式修飾符 `onlyWhenStopped` 和 `stoppedInEmergency` 檢查 `isStopped` 變數。`stoppedInEmergency` 用於控制當合約易受攻擊時應無法存取的函式（例如 `deposit()`）。對這些函式的呼叫將直接回滾。

`onlyWhenStopped` 用於在緊急情況下應該可以呼叫的函式（例如 `emergencyWithdraw()`）。此類函式可以幫助解決情況，因此將它們從「受限函式」清單中排除。

使用緊急停止功能為處理智能合約中的嚴重漏洞提供了有效的權宜之計。然而，這增加了使用者信任開發人員不會出於自私原因啟動它的需求。為此，透過將其置於鏈上投票機制、時間鎖或多方簽名錢包的批准之下，來去中心化對緊急停止的控制是可能的解決方案。

#### 事件監控 {#event-monitoring}

[事件](https://docs.soliditylang.org/en/v0.8.15/contracts.html#events)允許您追蹤對智能合約函式的呼叫並監控狀態變數的變更。理想的做法是編寫您的智能合約，以便在某一方採取對安全至關重要的操作（例如，提取資金）時發出事件。

記錄事件並在鏈下監控它們可以提供對合約操作的洞察，並有助於更快地發現惡意行為。這意味著您的團隊可以更快地應對駭客攻擊，並採取行動減輕對使用者的影響，例如暫停函式或執行升級。

您也可以選擇現成的監控工具，每當有人與您的合約互動時，該工具會自動轉發警報。這些工具將允許您根據不同的觸發條件（例如交易量、函式呼叫頻率或涉及的特定函式）建立自訂警報。例如，您可以編寫一個警報，當單筆交易中提取的金額超過特定閾值時發出。

### 7. 設計安全的治理系統 {#design-secure-governance-systems}

您可能希望透過將核心智能合約的控制權移交給社群成員來去中心化您的應用程式。在這種情況下，智能合約系統將包含一個治理模組——一種允許社群成員透過鏈上治理系統批准管理操作的機制。例如，將代理合約升級到新實作的提案可以由代幣持有者進行投票。

去中心化治理可能是有益的，特別是因為它使開發人員和終端使用者的利益保持一致。儘管如此，如果實作不當，智能合約治理機制可能會引入新的風險。一個可能的情況是，如果攻擊者透過借出[閃電貸](/defi/#flash-loans)獲得巨大的投票權（以持有的代幣數量衡量），並強行通過惡意提案。

防止與鏈上治理相關問題的一種方法是[使用時間鎖](https://blog.openzeppelin.com/protect-your-users-with-smart-contract-timelocks/)。時間鎖可防止智能合約在特定時間過去之前執行某些操作。其他策略包括根據代幣被鎖定的時間長短為每個代幣分配「投票權重」，或者測量地址在歷史時期（例如，過去的 2-3 個區塊）而不是當前區塊的投票權。這兩種方法都降低了快速積累投票權以左右鏈上投票的可能性。

在分享的連結中了解更多關於[設計安全治理系統](https://blog.openzeppelin.com/smart-contract-security-guidelines-4-strategies-for-safer-governance-systems/)、[DAO 中不同的投票機制](https://hackernoon.com/governance-is-the-holy-grail-for-daos)以及[利用 DeFi 的常見 DAO 攻擊向量](https://dacian.me/dao-governance-defi-attacks)的資訊。

### 8. 將程式碼複雜性降至最低 {#reduce-code-complexity}

傳統軟體開發人員熟悉 KISS（「保持簡單，傻瓜」）原則，該原則建議不要在軟體設計中引入不必要的複雜性。這遵循了長期以來的想法，即「複雜的系統以複雜的方式失敗」，並且更容易出現代價高昂的錯誤。

鑑於智能合約可能控制著大量的價值，在編寫智能合約時保持簡單尤為重要。在編寫智能合約時實現簡單性的一個技巧是盡可能重複使用現有的函式庫，例如 [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/5.x/)。因為這些函式庫已經過開發人員的廣泛稽核和測試，使用它們可以減少從頭開始編寫新功能而引入錯誤的機會。

另一個常見的建議是編寫小型函式，並透過將業務邏輯拆分到多個合約中來保持合約的模組化。編寫更簡單的程式碼不僅可以減少智能合約中的攻擊面，還可以更容易地推斷整個系統的正確性並及早發現可能的設計錯誤。

### 9. 防禦常見的智能合約漏洞 {#mitigate-common-smart-contract-vulnerabilities}

#### 重入 {#reentrancy}

EVM 不允許並行，這意味著參與訊息呼叫的兩個合約不能同時執行。外部呼叫會暫停呼叫合約的執行和記憶體，直到呼叫返回，此時執行將正常進行。這個過程可以正式描述為將[控制流程](https://www.computerhope.com/jargon/c/contflow.htm)轉移到另一個合約。

雖然大多無害，但將控制流程轉移到不受信任的合約可能會導致問題，例如重入。當惡意合約在原始函式呼叫完成之前回呼易受攻擊的合約時，就會發生重入攻擊。這種攻擊最好用一個例子來解釋。

考慮一個簡單的智能合約（「Victim」），它允許任何人存入和提取以太幣：

```solidity
// 此合約存在漏洞。請勿在生產環境中使用

contract Victim {
    mapping (address => uint256) public balances;

    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw() external {
        uint256 amount = balances[msg.sender];
        (bool success, ) = msg.sender.call.value(amount)("");
        require(success);
        balances[msg.sender] = 0;
    }
}
```

該合約公開了一個 `withdraw()` 函式，允許使用者提取先前存入合約的 ETH。在處理提款時，合約執行以下操作：

1. 檢查使用者的 ETH 餘額
2. 將資金發送到呼叫地址
3. 將其餘額重設為 0，防止使用者進行額外提款

`Victim` 合約中的 `withdraw()` 函式遵循「檢查-互動-效果」模式。它_檢查_執行所需的條件是否滿足（即使用者有正的 ETH 餘額），並透過將 ETH 發送到呼叫者的地址來執行_互動_，然後再應用交易的_效果_（即減少使用者的餘額）。

如果從外部擁有帳戶 (EOA) 呼叫 `withdraw()`，該函式將按預期執行：`msg.sender.call.value()` 將 ETH 發送給呼叫者。然而，如果 `msg.sender` 是一個智能合約帳戶呼叫 `withdraw()`，使用 `msg.sender.call.value()` 發送資金也將觸發儲存在該地址的程式碼執行。

想像這是部署在合約地址的程式碼：

```solidity
 contract Attacker {
    function beginAttack() external payable {
        Victim(victim_address).deposit.value(1 ether)();
        Victim(victim_address).withdraw();
    }

    function() external payable {
        if (gasleft() > 40000) {
            Victim(victim_address).withdraw();
        }
    }
}
```

該合約旨在做三件事：

1. 接受來自另一個帳戶（可能是攻擊者的 EOA）的存款
2. 將 1 ETH 存入 Victim 合約
3. 提取儲存在智能合約中的 1 ETH

這裡沒有什麼問題，除了 `Attacker` 有另一個函式，如果傳入的 `msg.sender.call.value` 剩餘的燃料 (gas) 超過 40,000，它會再次呼叫 `Victim` 中的 `withdraw()`。這使得 `Attacker` 能夠在第一次呼叫 `withdraw` 完成_之前_重新進入 `Victim` 並提取更多資金。循環如下所示：

```solidity
- Attacker's EOA calls `Attacker.beginAttack()` with 1 ETH
- `Attacker.beginAttack()` deposits 1 ETH into `Victim`
- `Attacker` calls `withdraw() in `Victim`
- `Victim` checks `Attacker`’s balance (1 ETH)
- `Victim` sends 1 ETH to `Attacker` (which triggers the default function)
- `Attacker` calls `Victim.withdraw()` again (note that `Victim` hasn’t reduced `Attacker`’s balance from the first withdrawal)
- `Victim` checks `Attacker`’s balance (which is still 1 ETH because it hasn’t applied the effects of the first call)
- `Victim` sends 1 ETH to `Attacker` (which triggers the default function and allows `Attacker` to reenter the `withdraw` function)
- The process repeats until `Attacker` runs out of gas, at which point `msg.sender.call.value` returns without triggering additional withdrawals
- `Victim` finally applies the results of the first transaction (and subsequent ones) to its state, so `Attacker`’s balance is set to 0
```

總結來說，因為呼叫者的餘額直到函式執行完成才被設定為 0，所以後續的呼叫將會成功，並允許呼叫者多次提取其餘額。這種攻擊可用於耗盡智能合約的資金，就像在 [2016 年 DAO 駭客攻擊](https://www.coindesk.com/learn/understanding-the-dao-attack)中發生的那樣。正如[重入漏洞利用的公開清單](https://github.com/pcaversaccio/reentrancy-attacks)所示，重入攻擊在今天仍然是智能合約的一個關鍵問題。

##### 如何防止重入攻擊
處理重入的一種方法是遵循[檢查-效果-互動模式](https://docs.soliditylang.org/en/develop/security-considerations.html#use-the-checks-effects-interactions-pattern)。這種模式對函式的執行進行排序，使得在繼續執行之前執行必要檢查的程式碼排在第一位，其次是操作合約狀態的程式碼，最後是與其他合約或 EOA 互動的程式碼。

檢查-效果-互動模式用於下面顯示的 `Victim` 合約的修訂版中：

```solidity
contract NoLongerAVictim {
    function withdraw() external {
        uint256 amount = balances[msg.sender];
        balances[msg.sender] = 0;
        (bool success, ) = msg.sender.call.value(amount)("");
        require(success);
    }
}
```

該合約對使用者的餘額執行_檢查_，應用 `withdraw()` 函式的_效果_（透過將使用者的餘額重設為 0），然後繼續執行_互動_（將 ETH 發送到使用者的地址）。這確保了合約在外部呼叫之前更新其儲存空間，消除了促成第一次攻擊的重入條件。`Attacker` 合約仍然可以回呼 `NoLongerAVictim`，但由於 `balances[msg.sender]` 已被設定為 0，額外的提款將拋出錯誤。

另一個選項是使用互斥鎖（通常描述為「mutex」），它會鎖定合約狀態的一部分，直到函式呼叫完成。這是使用一個布林變數來實作的，該變數在函式執行前設定為 `true`，並在呼叫完成後恢復為 `false`。如下面的範例所示，使用互斥鎖可以保護函式在原始呼叫仍在處理時免受遞迴呼叫的影響，從而有效地阻止重入。

```solidity
pragma solidity ^0.7.0;

contract MutexPattern {
    bool locked = false;
    mapping(address => uint256) public balances;

    modifier noReentrancy() {
        require(!locked, "Blocked from reentrancy.");
        locked = true;
        _;
        locked = false;
    }
    // 此函式受互斥鎖保護，因此從 `msg.sender.call` 內部的重入呼叫無法再次呼叫 `withdraw`。
    //  `return` 語句的評估結果為 `true`，但仍會評估修飾符中的 `locked = false` 語句
    function withdraw(uint _amount) public payable noReentrancy returns(bool) {
        require(balances[msg.sender] >= _amount, "No balance to withdraw.");

        balances[msg.sender] -= _amount;
        (bool success, ) = msg.sender.call{value: _amount}("");
        require(success);

        return true;
    }
}
```

您也可以使用[拉取支付](https://docs.openzeppelin.com/contracts/5.x/api/utils#security#PullPayment)系統，該系統要求使用者從智能合約中提取資金，而不是將資金發送到帳戶的「推送支付」系統。這消除了在未知地址無意中觸發程式碼的可能性（並且還可以防止某些阻斷服務攻擊）。

#### 整數下溢和溢位 {#integer-underflows-and-overflows}

當算術運算的結果超出可接受的值範圍，導致其「翻轉」到最低可表示值時，就會發生整數溢位。例如，`uint8` 只能儲存高達 2^8-1=255 的值。導致值高於 `255` 的算術運算將溢位並將 `uint` 重設為 `0`，類似於汽車上的里程表一旦達到最大里程 (999999) 就會重設為 0。

整數下溢發生的原因類似：算術運算的結果低於可接受的範圍。假設您嘗試在 `uint8` 中遞減 `0`，結果將簡單地翻轉到最大可表示值 (`255`)。

整數溢位和下溢都可能導致合約狀態變數發生意外變更，並導致計畫外的執行。下面是一個範例，顯示攻擊者如何利用智能合約中的算術溢位來執行無效操作：

```
pragma solidity ^0.7.6;

// 此合約旨在作為時間金庫。
// 使用者可以存入此合約，但至少一週內無法提取。
// 使用者還可以將等待時間延長至超過 1 週的等待期。

/*
1. 部署 TimeLock
2. 使用 TimeLock 的地址部署 Attack
3. 呼叫 Attack.attack 發送 1 ether。您將立即能夠
   提取您的 ether。

發生了什麼事？
Attack 導致 TimeLock.lockTime 溢位，並能夠在
1 週等待期之前提取。
*/

contract TimeLock {
    mapping(address => uint) public balances;
    mapping(address => uint) public lockTime;

    function deposit() external payable {
        balances[msg.sender] += msg.value;
        lockTime[msg.sender] = block.timestamp + 1 weeks;
    }

    function increaseLockTime(uint _secondsToIncrease) public {
        lockTime[msg.sender] += _secondsToIncrease;
    }

    function withdraw() public {
        require(balances[msg.sender] > 0, "Insufficient funds");
        require(block.timestamp > lockTime[msg.sender], "Lock time not expired");

        uint amount = balances[msg.sender];
        balances[msg.sender] = 0;

        (bool sent, ) = msg.sender.call{value: amount}("");
        require(sent, "Failed to send Ether");
    }
}

contract Attack {
    TimeLock timeLock;

    constructor(TimeLock _timeLock) {
        timeLock = TimeLock(_timeLock);
    }

    fallback() external payable {}

    function attack() public payable {
        timeLock.deposit{value: msg.value}();
        /*
        如果 t = 當前鎖定時間，那麼我們需要找到 x 使得
        x + t = 2**256 = 0
        所以 x = -t
        2**256 = type(uint).max + 1
        所以 x = type(uint).max + 1 - t
        */
        timeLock.increaseLockTime(
            type(uint).max + 1 - timeLock.lockTime(address(this))
        );
        timeLock.withdraw();
    }
}
```

##### 如何防止整數下溢和溢位
從 0.8.0 版本開始，Solidity 編譯器會拒絕導致整數下溢和溢位的程式碼。然而，使用較低編譯器版本編譯的合約應該對涉及算術運算的函式執行檢查，或者使用檢查下溢/溢位的函式庫（例如 [SafeMath](https://docs.openzeppelin.com/contracts/2.x/api/math)）。

#### 預言機操縱 {#oracle-manipulation}

[預言機](/developers/docs/oracles/)獲取鏈下資訊並將其發送到鏈上供智能合約使用。借助預言機，您可以設計與鏈下系統（例如資本市場）互通的智能合約，從而大大擴展其應用。

但是，如果預言機被破壞並將不正確的資訊發送到鏈上，智能合約將根據錯誤的輸入執行，這可能會導致問題。這是「預言機問題」的基礎，該問題涉及確保來自區塊鏈預言機的資訊準確、最新且及時的任務。

一個相關的安全問題是使用鏈上預言機（例如去中心化交易所）來獲取資產的現貨價格。[去中心化金融 (DeFi)](/defi/) 產業中的借貸平台經常這樣做，以確定使用者抵押品的價值，從而確定他們可以借入多少資金。

DEX 價格通常是準確的，這在很大程度上歸功於套利者恢復市場平價。然而，它們容易受到操縱，特別是如果鏈上預言機根據歷史交易模式計算資產價格（通常情況下如此）。

例如，攻擊者可以在與您的借貸合約互動之前借出閃電貸，從而人為地抬高資產的現貨價格。向 DEX 查詢資產價格將返回高於正常水平的值（由於攻擊者的大量「買單」扭曲了對資產的需求），從而允許他們借入超過其應得的資金。這種「閃電貸攻擊」已被用來利用 DeFi 應用程式對價格預言機的依賴，導致協定損失數百萬資金。

##### 如何防止預言機操縱
[避免預言機操縱](https://www.cyfrin.io/blog/price-oracle-manipultion-attacks-with-examples)的最低要求是使用去中心化預言機網路，該網路從多個來源查詢資訊以避免單點故障。在大多數情況下，去中心化預言機具有內建的加密經濟激勵措施，以鼓勵預言機節點報告正確的資訊，使其比中心化預言機更安全。

如果您計畫查詢鏈上預言機以獲取資產價格，請考慮使用實作時間加權平均價格 (TWAP) 機制的預言機。[TWAP 預言機](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/oracles)在兩個不同的時間點（您可以修改）查詢資產的價格，並根據獲得的平均值計算現貨價格。選擇較長的時間段可以保護您的協定免受價格操縱，因為最近執行的大額訂單無法影響資產價格。

## 開發者智能合約安全資源 {#smart-contract-security-resources-for-developers}

### 分析智能合約與驗證程式碼正確性的工具 {#code-analysis-tools}

- **[測試工具與函式庫](/developers/docs/smart-contracts/testing/#testing-tools-and-libraries)** - _收集了用於對智能合約執行單元測試、靜態分析和動態分析的業界標準工具與函式庫。_

- **[形式化驗證工具](/developers/docs/smart-contracts/formal-verification/#formal-verification-tools)** - _用於驗證智能合約功能正確性並檢查不變量 (invariants) 的工具。_

- **[智能合約審計服務](/developers/docs/smart-contracts/testing/#smart-contract-auditing-services)** - _為以太坊開發專案提供智能合約審計服務的組織列表。_

- **[漏洞賞金平台](/developers/docs/smart-contracts/testing/#bug-bounty-platforms)** - _用於協調漏洞賞金並獎勵負責任地揭露智能合約中嚴重漏洞的平台。_

- **[Fork Checker](https://forkchecker.hashex.org/)** - _一個免費的線上工具，用於檢查有關分叉合約的所有可用資訊。_

- **[ABI Encoder](https://abi.hashex.org/)** - _一個免費的線上服務，用於編碼你的 Solidity 合約函式與建構函式參數。_

- **[Aderyn](https://github.com/Cyfrin/aderyn)** - _Solidity 靜態分析器，透過遍歷抽象語法樹 (AST) 來精確定位可疑的漏洞，並以易於閱讀的 Markdown 格式印出問題。_

### 監控智能合約的工具 {#smart-contract-monitoring-tools}

- **[Tenderly 即時警報](https://tenderly.co/monitoring)** - _當你的智能合約或錢包發生異常或非預期事件時，用於獲取即時通知的工具。_

### 安全管理智能合約的工具 {#smart-contract-administration-tools}

- **[Safe](https://safe.global/)** - _運行在以太坊上的智能合約錢包，要求在交易發生前必須有最低人數的授權 (M-of-N)。_

- **[歐本齊柏林合約](https://docs.openzeppelin.com/contracts/5.x/)** - _用於實作管理功能的合約函式庫，包含合約所有權、升級、存取控制、治理、可暫停性等。_

### 智能合約審計服務 {#smart-contract-auditing-services}

- **[ConsenSys Diligence](https://diligence.consensys.io/)** - _智能合約審計服務，協助整個區塊鏈生態系中的專案確保其協定已準備好發布，並旨在保護使用者。_

- **[CertiK](https://www.certik.com/)** - _區塊鏈安全公司，率先在智能合約與區塊鏈網路上使用尖端的形式化驗證技術。_

- **[Trail of Bits](https://www.trailofbits.com/)** - _將安全研究與攻擊者思維相結合的網路安全公司，旨在降低風險並強化程式碼。_

- **[PeckShield](https://peckshield.com/)** - _區塊鏈安全公司，為整個區塊鏈生態系的安全、隱私與可用性提供產品與服務。_

- **[QuantStamp](https://quantstamp.com/)** - _透過安全與風險評估服務，促進區塊鏈技術成為主流的審計服務。_

- **[歐本齊柏林](https://www.openzeppelin.com/security-audits)** - _為分散式系統提供安全審計的智能合約安全公司。_

- **[Runtime Verification](https://runtimeverification.com/)** - _專門從事智能合約形式化建模與驗證的安全公司。_

- **[Hacken](https://hacken.io)** - _Web3 網路安全審計機構，為區塊鏈安全帶來 360 度全方位的解決方案。_

- **[奈瑟邁](https://www.nethermind.io/smart-contract-audits)** - _Solidity 與 Cairo 審計服務，確保以太坊與 Starknet 上智能合約的完整性及使用者安全。_

- **[HashEx](https://hashex.org/)** - _HashEx 專注於區塊鏈與智能合約審計以確保加密貨幣的安全，提供智能合約開發、滲透測試、區塊鏈諮詢等服務。_

- **[Code4rena](https://code4rena.com/)** - _競爭性審計平台，激勵智能合約安全專家尋找漏洞，協助讓 Web3 變得更安全。_

- **[CodeHawks](https://codehawks.com/)** - _競爭性審計平台，為安全研究人員舉辦智能合約審計競賽。_

- **[Cyfrin](https://cyfrin.io)** - _Web3 安全重鎮，透過產品與智能合約審計服務來孵化加密貨幣安全。_

- **[ImmuneBytes](https://immunebytes.com/smart-contract-audit/)** - _Web3 安全公司，透過經驗豐富的審計團隊與一流的工具為區塊鏈系統提供安全審計。_

- **[Oxorio](https://oxor.io/)** - _智能合約審計與區塊鏈安全服務，為加密貨幣公司與去中心化金融 (DeFi) 專案提供 EVM、Solidity、零知識 (ZK) 及跨鏈技術的專業知識。_

- **[Inference](https://inference.ag/)** - _安全審計公司，專門從事基於 EVM 區塊鏈的智能合約審計。憑藉其專家審計員，他們能在部署前識別潛在問題並提出可行的解決方案來修復它們。_

### 漏洞賞金平台 {#bug-bounty-platforms}

- **[Immunefi](https://immunefi.com/)** - _針對智能合約與 DeFi 專案的漏洞賞金平台，安全研究人員在此審查程式碼、揭露漏洞、獲得報酬，並讓加密貨幣變得更安全。_

- **[HackerOne](https://www.hackerone.com/)** - _漏洞協調與漏洞賞金平台，將企業與滲透測試人員及網路安全研究人員連結起來。_

- **[HackenProof](https://hackenproof.com/)** - _專為加密貨幣專案（DeFi、智能合約、錢包、中心化交易所等）打造的專業漏洞賞金平台，安全專家在此提供分類服務，研究人員則可因提交相關且經過驗證的漏洞報告而獲得報酬。_

-  **[Sherlock](https://www.sherlock.xyz/)** - _Web3 智能合約安全的承保人，審計員的報酬透過智能合約管理，以確保相關漏洞能獲得公平的報酬。_

-  **[CodeHawks](https://www.codehawks.com/)** - _競爭性漏洞賞金平台，審計員在此參與安全競賽與挑戰，並（即將）參與他們專屬的私人審計。_

### 已知智能合約漏洞與漏洞利用的出版物 {#common-smart-contract-vulnerabilities-and-exploits}

- **[ConsenSys：智能合約已知攻擊](https://consensysdiligence.github.io/smart-contract-best-practices/attacks/)** - _對最重大合約漏洞提供適合初學者的解釋，並在多數情況下附有範例程式碼。_

- **[SWC Registry](https://swcregistry.io/)** - _適用於以太坊智能合約的常見弱點列舉 (CWE) 項目精選列表。_

- **[Rekt](https://rekt.news/)** - _定期更新的出版物，報導備受矚目的加密貨幣駭客攻擊與漏洞利用事件，並附有詳細的事後檢討報告。_

### 學習智能合約安全的挑戰 {#challenges-for-learning-smart-contract-security}

- **[Awesome BlockSec CTF](https://github.com/blockthreat/blocksec-ctfs)** - _區塊鏈安全兵棋推演、挑戰、[搶旗 (Capture The Flag)](https://www.webopedia.com/definitions/ctf-event/amp/) 競賽及解決方案解析的精選列表。_

- **[Damn Vulnerable DeFi](https://www.damnvulnerabledefi.xyz/)** - _學習 DeFi 智能合約攻擊性安全，並培養漏洞尋找與安全審計技能的兵棋推演。_

- **[Ethernaut](https://ethernaut.openzeppelin.com/)** - _基於 Web3/Solidity 的兵棋推演，每個關卡都是一個需要被「駭入」的智能合約。_

- **[HackenProof x HackTheBox](https://app.hackthebox.com/tracks/HackenProof-Track)** - _設定在奇幻冒險中的智能合約駭客挑戰。成功完成挑戰還能獲得參與私人漏洞賞金計畫的資格。_

### 保護智能合約的最佳實務 {#smart-contract-security-best-practices}

- **[ConsenSys：以太坊智能合約安全最佳實務](https://consensys.github.io/smart-contract-best-practices/)** - _保護以太坊智能合約的全面指南列表。_

- **[Nascent：簡易安全工具包](https://github.com/nascentxyz/simple-security-toolkit)** - _針對智能合約開發，收集了實用的安全導向指南與檢查清單。_

- **[Solidity 模式](https://fravoll.github.io/solidity-patterns/)** - _針對智能合約程式語言 Solidity 的安全模式與最佳實務的實用彙整。_

- **[Solidity 文件：安全考量](https://docs.soliditylang.org/en/v0.8.16/security-considerations.html)** - _使用 Solidity 撰寫安全智能合約的指南。_

- **[智能合約安全驗證標準](https://github.com/securing/SCSVS)** - _包含十四個部分的檢查清單，旨在為開發者、架構師、安全審查員與供應商標準化智能合約的安全性。_

- **[學習智能合約安全與審計](https://updraft.cyfrin.io/courses/security)** - _終極智能合約安全與審計課程，專為希望提升安全最佳實務並成為安全研究人員的智能合約開發者所設計。_

### 智能合約安全教學 {#tutorials-on-smart-contract-security}

- [如何撰寫安全的智能合約](/developers/tutorials/secure-development-workflow/)

- [如何使用斯立瑟尋找智能合約漏洞](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

- [如何使用曼蒂科爾尋找智能合約漏洞](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)

- [智能合約安全指南](/developers/tutorials/smart-contract-security-guidelines/)

- [如何安全地將你的代幣合約與任意代幣整合](/developers/tutorials/token-integration-checklist/)

- [Cyfrin Updraft - 智能合約安全與審計完整課程](https://updraft.cyfrin.io/courses/security)