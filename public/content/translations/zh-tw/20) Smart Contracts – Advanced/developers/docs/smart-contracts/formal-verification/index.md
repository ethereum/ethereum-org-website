---
title: 智慧合約的形式化驗證
description: 以太坊智慧合約形式化驗證概述
lang: zh-tw
---

[智能合約](/developers/docs/smart-contracts/) 讓去中心化、去信任、引進新的應用案例與解放用戶的價值變得更可行。 因為智慧合約掌握了大量的價值，對開發者來說安全是最需要被考量的。

形式化驗證是增進[合約安全](/developers/docs/smart-contracts/security/)最推薦的方法， 形式化驗證，是一個使用多年的方法，目的是要確保特定的硬體與軟體系統正確性，用[形式化方法](https://www.brookings.edu/techstream/formal-methods-as-a-path-toward-better-cybersecurity/)來規範、設計、驗證程式。

當在智慧合約中實現形式化驗證，可以證明合約的商業邏輯符合預設的規範， 相較於其他評估合約程式碼的正確性的方法，形式化驗證更保證了合約功能性上的正確。

## 什麼是形式化驗證？ {#what-is-formal-verification}

形式化驗證指的是一個用形式規範評估系統正確性的流程， 簡而言之，形式化驗證讓我們可以檢查一個系統的行為是否滿足一些要求(即，它按我們的想法運作)。

對系統(此案例中為智能合約) 所要求的行為採用形式化模型描述，而規範語言支持形式化屬性的建立。 然後，形式化驗證技術可以驗證一個合約的實施符合其規範，並產生合約正確性的數學證明。 當一個合約滿足其規範，被稱為「功能正確」、「設計正確」，或「建構正確」。

### 形式化模型是什麼？ {#what-is-a-formal-model}

在電腦科學中， [形式化模型](https://en.wikipedia.org/wiki/Model_of_computation)是指對計算過程的數學描述。 程式抽象成數學函數(方程)，模型描述給定輸入時如何計算函數的輸出。

形式化模型提供一個抽象層次，可以在該抽象層次上對程式行為的分析進行評估。 有了形式化模型，_形式化規範_得以制定，用來描述所談論模型所需要的屬性。

採用不同的技術來建立智能合約模型，以便進行形式化驗證。 例如，有些模型用來推理智能合約的高階行為。 這些模型建立技術在智能合約應用黑盒視圖，把智能合約視為可以接受輸入並按照那些輸入執行計算的系統。

高階模型專注在智能合約和外部代理之間的關係，例如外部帳戶（EOAs）、合約帳戶，和區塊鏈環境。 這些模型有助於定義屬性，規定了合約該如何回應某些使用者互動的行為。

相反地，其他形式化模型專注在智能合約的低階行為。 雖然高階模型有助於推理一個合約的功能，它們可能無法獲得實施內部運作的細節。 低階模型對程序分析應用了白盒視圖，並仰賴智能合約應用程式較低階表示，例如程序追蹤和[控制流圖](https://en.wikipedia.org/wiki/Control-flow_graph)，來推理與該合約執行相關的屬性。

低階模型被認爲是理想的，因爲它們代表了以太坊的執行環境 (即[以太坊虛擬機](/developers/docs/evm/)) 中智能合約的實際執行。 低階模型技術對於在智能合約中建立關鍵的安全屬性和檢測潛在漏洞尤其有用。

### 什麽是形式化規範？ {#what-is-a-formal-specification}

規範只是特定系統必須滿足的技術要求。 在編程中，規範代表程式執行的總體思路 (即程式應該做什麽)。

在智能合約的背景下，形式化規範指的是_屬性_—合約必須滿足的要求的正式描述。 這樣的屬性被描述爲 "不變量"，並代表了智能合約執行的邏輯斷言，該斷言在任何情況下都必須為 true，沒有例外。

因此，我們可以將形式化規範想做是用正式語言編寫的聲明集合，描述了智能合約的預期執行。 規範涵蓋了合約的屬性，並定義了合約在各種情況下應該如何運作。 形式化驗證的目的是確定智能合約是否遵循這些屬性 (不變量) 以及在執行過程中是否違反這些屬性。

形式化規範對於開發智能合約的安全實現至關重要。 無法實現不變量或在執行期間違反其屬性的合約容易出現漏洞，可能會損害功能或導致惡意使用。

## 智能合約形式化規範的類型 {#formal-specifications-for-smart-contracts}

形式規範使程式執行的正確性可以用數學方法推導， 與形式化模型一樣，形式規範可以捕捉合約實現的高階屬性或低階行爲。

形式規範是由[程式邏輯](https://en.wikipedia.org/wiki/Logic_programming)的元素推導出，這些元素可以讓程式的屬性做推理， 程式邏輯是有規範的，表達(在數學語言中) 一個預期的行為。 形式化規範可以使用各種程式邏輯來創建，包括[可達性邏輯](https://en.wikipedia.org/wiki/Reachability_problem)、[時間邏輯](https://en.wikipedia.org/wiki/Temporal_logic)以及[霍爾邏輯](https://en.wikipedia.org/wiki/Hoare_logic)。

智慧合約的形式規範可大致上被分成**高階**或**低階**規範， 無論規範屬於什麽類別，都必須充分且明確地描述所分析系統的屬性。

### 高階規範 {#high-level-specifications}

顧名思義，告誡規範 (也被稱爲 “模型導向規範”) 描述了程式的高階行爲。 高階規範將智能合約建模為[有限狀態機器](https://en.wikipedia.org/wiki/Finite-state_machine) (FSM)，它能夠透過執行操作來轉換屬性，並使用時間邏輯來為 FSM 模型定義形式化屬性。

[時間屬性](https://en.wikipedia.org/wiki/Temporal_logic)是「時間限定命題的推理規則（例如，『我 _總是_ 很餓』，或『我_最終_會餓』）」。 當應用於形式化驗證時，時間邏輯用來聲明將系統正確行為建立模型為狀態機的斷言。 具體來說，時間邏輯形容智能合約可以進入的未來狀態，以及它如何在狀態之間轉換。

高階規範通常描述智能合約的兩個重要時間屬性：**安全性**以及**活性**。 安全性屬性代表「任何壞事都不會發生」的想法，且通常代表不變性。 安全屬性可以定義常規軟件要求，例如如不發生[死鎖](https://www.techtarget.com/whatis/definition/deadlock)或表達合約的領域特有屬性 (如函數訪問控制的不變量、狀態變量的容許值或代幣轉賬的條件)。

以下方安全要求為例，描述了在ERC-20代幣合約中使用`transfer()`或`transferFrom()`：_「一個發送者餘額不能少於要求發送的代幣金額」。_. 這種合約不變量的自然語言描述可以轉化為形式化（數學）規範，以進行嚴格的有效性檢查。

活性屬性斷言「好事終將發生」，並涉及合約逐步通過不同狀態的能力。 活性屬性的一個例子是「流動性」，代表一個合約在收到要求時將其餘額轉帳給使用者的能力。 如果該屬性被違反，用戶就無法提取存儲在合約中的資產，就像[ Parity 錢包事件](https://www.cnbc.com/2017/11/08/accidental-bug-may-have-frozen-280-worth-of-ether-on-parity-wallet.html)中發生的那樣。

### 低階規範 {#low-level-specifications}

高階規範以合約的有限狀態模型作為起點，並定義該模型的所需屬性。 相較之下，低階規範（也稱為「面向屬性的規範」）通常將程序（智能合約）建立模型成由數學函數集合組成的系統，並描述這類系統的正確行為。

簡單來説，低階規範分析_程式軌跡_並試圖透過這些軌跡定義智能合約的屬性。 軌跡是指改變智能合約狀態的函數執行序列；因此低階規範幫助指定合約内部執行的要求。

低階形式化規範可以出具為霍爾式屬性或執行路徑中的不變量。

### 霍爾式屬性 {#hoare-style-properties}

[霍爾邏輯](https://en.wikipedia.org/wiki/Hoare_logic)提供了一套形式化規定，用於推理包括智能合約等程序的正確性。 霍爾式屬性使用霍爾三元組 {_P_}_c_{_Q_}表示，其中_c_ 是一個程序，且 _P_和_Q_為_c_（即程序）的狀態預測，正式描述分別為_前置條件_和_後置條件_。

前置條件是描述函數正確執行所需條件的預測；用戶在合約中的調用必須滿足該要求。 後置條件為形容函數正確執行時所建立條件的謂語；使用者可以期待在調用函數後該條件為真。 在霍爾邏輯中，_不變量_是執行函數所保留的謂詞（即，它不改變）。

霍爾式規範可以保證_部分正確性_ 或_完全正確性_。 如果前置條件在函數執行之前為 true，則合約函數的實現為 “部分正確”，如果執行終止，則後置條件也爲 true。 如果前置條件在函數執行之前為 true，就會獲得完全正確性證明，執行被保證終止且實際終止時，後置條件為 true。

獲得完全正確性的證明很難，因為一些執行在終止前可能會延遲，或根本不會終止。 也就是説，由於以太坊的燃料機制防止無限程式循環 (執行只在會成功或者出現 'out-of-gas' 錯誤時終止)，執行是否終止可以説是一個有爭議的問題。

使用霍爾邏輯創建的智能合約規範將具有前置條件、後置條件以及定義合約中函數和循環執行的不變量。 前置條件通常包括函數錯誤輸入的可能性，而後置條件描述對此類輸入的預期響應 (例如，抛出一個特定異常)。 用這種方式，霍爾式屬性可以很有效地確保合約實施的正確性。

許多形式化驗證架構使用霍爾式規範來證明函數的語義正確性。 也可以透過使用 Solidity 中的 `require` 和 `assert` 聲明，直接向合約程式碼添加霍爾式屬性 (作爲斷言)。

`require` 聲明表達一個前置條件或者不變量，並通常用於驗證用戶輸入，而 `assert` 捕捉一個安全必要的後置條件。 例如，可以使用 `require` 作爲前置條件檢查調用賬戶的身份，來實現函數的正確存取控制 (安全屬性的一個示例)。 相似地，透過使用 `assert` 在函數執行后確認合約的狀態，可以防止違反合約中狀態變量允許值的不變量 (例如，流通中的代幣總數)。

### 追蹤層級屬性 {#trace-level-properties}

基於軌跡的規範描述了在不同狀態之間轉換合約的操作以及這些操作之間的關係。 如前所述，軌跡是以特定方式改變合約狀態的操作的序列。

該方法依賴於智能合約模型作爲狀態轉換系統，具有一些預定義屬性 (由狀態變量描述) 以及一系列預定義轉換 (由合約函數描述)。 此外，[控制流程圖](https://www.geeksforgeeks.org/software-engineering-control-flow-graph-cfg/) (CFG)，即程式執行流程的圖形化表示，常常被用於描述合約的操作語義。 在這裡，每個軌跡代表控制流圖上的一條路徑。

追蹤層級規範主要用來推理智能合約中內部執行的模式。 透過建立追蹤層級規範，我們斷言一個智能合約的容許執行路徑（即，狀態轉換）。 使用類似於符號執行的技術，我們可以正式驗證執行永遠不會追隨未在形式化模型中定義的路徑。

我們使用一個已具有一些公開可訪問函數的[去中心化自治組織](/dao/) 的合約作為範例，以介紹追蹤層級屬性。 在這裡，我們推測去中心化自治合約允許使用者執行以下操作：

- 存入資金

- 存入資金後對提案進行投票

- 如果沒有對提案進行投票，能夠要求退款

軌跡級屬性的示例可以是_“沒有存入資金的用戶無法對提案進行投票”_或_“沒有對提案進行投票的用戶應該始終能夠要求退款“_。 這兩個屬性斷言優先執行順序（存入資金_之前_不能進行投票，以及對提案進行投票_之後_不能進行退款）。

## 智能合約形式化驗證的技術 {#formal-verification-techniques}

### 模型檢查 {#model-checking}

模型檢查是演算法對照規格書檢查智能合約的形式模型的形式驗證技術。 在模型檢查中，智能合約通常表示爲狀態轉換系統，而允許合約狀態的屬性使用時間邏輯來定義。

模型檢查需要創建系統的抽象數學表示 (即合約) 並使用根植於[命題邏輯](https://www.baeldung.com/cs/propositional-logic)的公式來表示該系統的屬性。 這樣簡化了模型檢查演算法的工作，也就是說證明數學模型符合特定邏輯公式。

在形式驗證裡模型檢查主要用來評價記述隨時間經過合約的行為的暫時特性。 智能合約的暫時特性包括我們之前說明的 _安全性_ 和 _活躍性_。

例如，與存取控制相關的安全屬性 (例如，_只有合約的擁有者能夠調用 `selfdestruct` _) 可以使用形式化邏輯來編寫。 之後，模型檢查演算法可以驗證是否合約符合這個形式規格。

模型檢查使用狀態空間探索，其中涉及構造智能合約所有可能的狀態，並試圖找出導致違反屬性的可達狀態。 然而，這可能會導致無限的狀態數量 (被稱爲 ”狀態爆炸問題“)，因此，模型檢查器依賴抽象技術來使高效分析智能合約變得可能。

### 定理證明 {#theorem-proving}

定理證明是以數學方式推論程式，包括智能合約，的正確性的方法。 這需要將合約系統的模型和規格書轉換成數學公式 (邏輯陳述)。

定理證明的目的是驗證這些陳述之間在邏輯上是等價的 ”邏輯等價性“ (也被稱爲 ”邏輯雙向蘊含“) 是兩個聲明之間的一種關係，例如，第一個聲明_只有在_第二個聲明為 true 時才為 true。

這個關於合約模型和特性的陳述之間的必要關係 (邏輯等價性) 可公式化成可證明的陳述 (又稱理論)。 使用形式的推論系統，自動定理證明器可以驗證定理的有效性。 換言之 自動定理證明器可以決定性的證明合約模型確切地符合規格書。

模型檢查將合約建模為具有有限狀態的轉換系統，而定理證明可以處理無限狀態系統的分析。 然而，這意味著自動定理證明器無法永遠知道邏輯問題是否為 “可判定的”。

因此，在推導正確性證明時，定理證明器常常需要人類協助。 定理證明中對人力的使用使其比完全自動化的模型檢查更加昂貴。

### 符號執行 {#symbolic-execution}

符號執行是一種透過使用_符號值_ (如 `x > 5`) 而不是_具體值_ (如 `x == 5`) 執行函數來分析智能合約的方法。 作爲一種形式化驗證技術，符號執行用於形式化推理智能合約程式碼中的軌跡級屬性。

符號執行將執行軌跡表示爲針對符號輸入值的數學公式，也稱爲_路徑預測_。 [SMT 求解器](https://en.wikipedia.org/wiki/Satisfiability_modulo_theories)用於檢查路徑是否爲 “可滿足的” (即存在能夠滿足該公式的值)。 假如路徑是可滿足的，SMT 解答器將針對這路徑產生一個觸發執行的具體數值。

假設一個智能合約函數接受輸入值是`uint` 的數值 (`x`)，當 `x` 大於 `5` 而且小於 `10` 則回覆解答。 使用正常測試程序尋找觸發錯誤的 `x` 值需要運行數十個測試用例 (甚至更多)，並且不保證實際找到觸發錯誤的輸入。

相反，符號執行工具會使用符號值來執行函數: `X > 5 ∧ X < 10` (例如，`x` 比 5 大且 `x` 比 10 小)。 相關的路徑預測 `x = X > 5 ∧ X < 10` 將提供給 SMT 解答器來解答。 如果一個特定值滿足公式 `x = X > 5 ∧ X < 10`，SMT 求解器將計算它 - 例如，求解器可能會產生 `7` 作爲 `x` 的值。

因爲符號執行依賴於程式的輸入，而探索所有可達狀態的一系列輸入可能是無限的，所以這仍然是一種測試形式。 然而，如示例所示，符號執行在尋找觸發違反屬性的輸入方面比常規測試更高效。

此外，符號執行與其他隨機生成函數輸入的基於屬性的技術 (如初略) 相比，產生的誤報更少。 如果錯誤狀態在符號執行期間被觸發，則可以產生觸發該錯誤的具體值並重現該問題。

符號執行也可以提供某程度的數學證明的正確性。 仔細思考下面有溢出防護的合約函數範例：

```
function safe_add(uint x, uint y) returns(uint z){

  z = x + y;
  require(z>=x);
  require(z>=y);

  return z;
```

導致整數溢位的執行軌跡需要滿足以下公式: `z = x + y AND (z >= x) 和 (z=>y) AND (z < x OR z < y)`。這種公式不太可能有解，因此它提供了函數 `safe_add` 永不溢出的數學證明。

### 為什麼要對智能合約使用形式驗證？ {#benefits-of-formal-verification}

#### 可靠性的需求 {#need-for-reliability}

形式化驗證被用於評估安全關鍵系統的正確性，這些系統的失敗將產生災難性後果，例如死亡、受傷或金融崩潰。 智能合約是控制巨額價值的高價值應用程序，設計中的簡單錯誤可能會導致[用戶遭受無法挽回的損失](https://www.freecodecamp.org/news/a-hacker-stole-31m-of-ether-how-it-happened-and-what-it-means-for-ethereum-9e5dc29e33ce/amp/)。 然而，在合約部署之前進行形式化驗證，則可以增加其在區塊鏈上如期運行的保證。

可靠性是任何智能合約都渴求的一種品質，尤其是因爲在以太坊虛擬機 (EVM) 上部署的程式碼通常是不可更改的。 合約推出後的升級並不是容易達成的，形式驗證成為為確保合約的可靠性的需求下不可缺少的必需品。 形式化驗證能夠檢測棘手的問題，比如整數下溢和上溢、可重入性和糟糕的燃料優化，審核者和測試者可能會漏掉這些問題。

#### 功能正確性的証明 {#prove-functional-correctness}

程式測試是證明智能合約符合某些要求最常見的方法。 這包括用預期合約會碰到的樣本資料來執行合約，並且分析合約的行為。 假如對樣本資料合約傳回預期的結果，則開發者對合約的正確性做了客觀性的證明。

然而，這種方法無法證明測試資料之外的輸入值正確執行。 因此，測試合約可以幫助檢測漏洞 (例如，如果程式碼路徑在執行期間無法返回期望的結果)，但**這無法完全證明沒有漏洞**。

相反，形式化驗證可以正式證明合約能在無限執行範圍内滿足要求，而_無需_運行該合約。 這需要創建一個形式化規範來準確描述正確的合約行爲和開發合約系統的形式化(數學) 模型。 但我們卻可以透過形式化證明來檢查合約模型與其預期行為的一致性。

透過形式化驗證，驗證合約商業邏輯是否滿足要求的問題就成爲一個能夠被證明或解決的數學命題。 通過形式化證明一個命題，我們可以在有限步驟內驗證無限數量的測試案例， 以這種方式，形式化證明在證明合約相對於規範的功能正確性方面具有更好的前景。

#### 理想的驗證對象 {#ideal-verification-targets}

驗證對象是指要進行形式化驗證的系統， 這種驗證方式最適合用於 "嵌入式系統" (作為更大系統一部分的小型、簡單應用程式)， 而目前常用的測試則使用具體值（例如“如果用戶嘗試提取 5 以太幣會怎樣？”）。

智能合約在某種程度上滿足了這兩個要求， 例如，以太坊合約的規模較小，這使它們適合進行形式化驗證， 此外，EVM 遵循簡單的規則，這使得為 EVM 上執行驗證程序指定變得更加容易。

### 更短的開發周期 {#faster-development-cycle}

形式化驗證技術，例如模型檢查和符號執行，通常比常規的智能合約程式碼分析更高效 (在測試和審核期間的表現)。 這是因為形式化驗證依賴符號值來測試斷言 (如果使用者嘗試提取 _n_ 以太幣會怎樣？)， 而目前常用的測試則使用具體值 ("如果使用者嘗試提取 5 以太幣會怎樣？")。

符號輸入變量可以涵蓋多個類別的具體值，因此形式化驗證能夠確保在更短時間内涵蓋更多程式碼。 再有效率的使用下，形式化驗證可以加速開發流程

並且透過減少代價高昂的設計錯誤來改進去中心化應用程式(dapps) 的構建過程。 升級合約 (如果可能) 來修復漏洞需要大量重寫程式碼庫並花費更多努力在開發上。 形式化驗證可以檢測許多合約實現中可能會被測試者和審核者漏掉的錯誤，並提供充足的機會在合約部署之前修復這些問題。

## 形式化驗證的缺點 {#drawbacks-of-formal-verification}

### 人力成本 {#cost-of-manual-labor}

形式化驗證，尤其是需要人爲引導證明器來推導出正確性證明的半自動驗證，需要花費大量人力。 創建形式規範是一項複雜的過程，要求很高的技能水平，

這些因素 (人力與技能) 使形式化驗證相比評估合約正確性的常規方法 (例如測試和審核) 要求更高且更加昂貴。 然而，鑑於智能合約的錯誤成本，這樣的成本仍然是可以接受的。

### 形式化驗證錯誤的負面效應 {#false-negatives}

形式化驗證只能檢查智能合約的執行是否與形式規範相匹配， 因此，確保規範符合智能合約的預期行為非常重要。

如果規範編寫得很糟糕，違反屬性 (將導致執行漏洞) 就無法透過形式化驗證審核來檢測。 在這種情況下，開發者可能會錯誤的假設合約是沒有漏洞的。

### 效能問題 {#performance-issues}

形式化驗證會遇到一些效能問題。 例如，在模型檢查和符號檢查期間分別遇到狀態和路徑爆炸問題，就可能會影響驗證程序。 另外，形式化驗證經常在其底層使用 SMT 求解器和其他約束求解器，而這些求解器依賴於計算密集型流程。

此外，程式驗證器并不總是能夠確認屬性 (由邏輯公式描述) 是否可以被滿足 ("[可判定性問題](https://en.wikipedia.org/wiki/Decision_problem)")，因爲程序可能永遠不會終止。 因此，即使規範良好，有些屬性也可能無法被證明。

## 以太坊智能合約的形式化驗證工具 {#formal-verification-tools}

### 用於制定形式化規範的規範語言 {#specification-languages}

**Act**: _*Act allows specification of storage updates, pre/post conditions and contract invariants. Its tool suite also has proof backends able to prove many properties via Coq, SMT solvers, or hevm.**

- [GitHub](https://github.com/ethereum/act)
- [文檔](https://ethereum.github.io/act/)

**Scribble** - _*Scribble 將 Scribble 規範語言中的程式碼注解轉換爲檢查規範的具體斷言。**

- [文件](https://docs.scribble.codes/)

**Dafny** - _*Dafny is a verification-ready programming language that relies on high-level annotations to reason about and prove correctness of code.**

- [GitHub](https://github.com/dafny-lang/dafny)

### Program verifiers for checking correctness {#program-verifiers}

**Certora Prover** - _Certora Prover is an automatic formal verification tool for checking code correctness in smart contracts. 規範由 CVL (Certora 驗證語言) 編寫，使用靜態分析和約束求解的結合來檢測屬性違反。_

- [網站](https://www.certora.com/)
- [文檔](https://docs.certora.com/en/latest/index.html)

**Solidity SMTChecker** - _* Solidity 的 SMTChecker 是一個基於 SMT (可滿足模型理論) 和 Horn 求解的内置模型檢查器。 它在編譯期間確認合約的源程式碼是否符合規範，並靜態檢查安全屬性的違反。**

- [GitHub](https://github.com/ethereum/solidity)

**solc-verify** - _*solc-verify 是 Solidity 編譯器的一個擴展版本，可以使用注解和模組化程式驗證在 Solidity 程式碼上執行自動形式化驗證**

- [GitHub](https://github.com/SRI-CSL/solidity)

**KEVM** - _*KEVM is a formal semantics of the Ethereum Virtual Machine (EVM) written in the K framework. KEVM is executable and can prove certain property-related assertions using reachability logic.**

- [GitHub](https://github.com/runtimeverification/evm-semantics)
- [文檔](https://jellopaper.org/)

### 定理證明的邏輯框架 {#theorem-provers}

**Isabelle** - _Isabelle/HOL 是一個證明助手，允許使用形式化語言來表示數學公式，並提供驗證明這些公式的工具。 主要應用於數學證明的形式化，特別是形式化驗證，它涉及證明電腦硬體或軟體的正確性以及證明電腦語言和協議的屬性。_

- [GitHub](https://github.com/isabelle-prover)
- [文檔](https://isabelle.in.tum.de/documentation.html)

**Coq** - _Coq 是一個互動式定理證明器，允許你使用定理來定義程式並以互動方式生成經機器檢查的正確性證明。_

- [GitHub](https://github.com/coq/coq)
- [文檔](https://coq.github.io/doc/v8.13/refman/index.html)

### 用於偵測智能合約中易受攻擊模式的基於符號執行的工具 {#symbolic-execution-tools}

**Manticore** - _*A tool for analyzing EVM bytecode analysis tool based on symbolic execution*.*

- [GitHub](https://github.com/trailofbits/manticore)
- [文檔](https://github.com/trailofbits/manticore/wiki)

**hevm** - _*hevm is a symbolic execution engine and equivalence checker for EVM bytecode.**

- [GitHub](https://github.com/dapphub/dapptools/tree/master/src/hevm)

**Mythril** - _A symbolic execution tool for detecting vulnerabilities in Ethereum smart contracts_

- [GitHub](https://github.com/ConsenSys/mythril-classic)
- [文檔](https://mythril-classic.readthedocs.io/en/develop/)

## 延伸閱讀 {#further-reading}

- [How Formal Verification of Smart Contracts Works](https://runtimeverification.com/blog/how-formal-verification-of-smart-contracts-works/)
- [How Formal Verification Can Ensure Flawless Smart Contracts](https://media.consensys.net/how-formal-verification-can-ensure-flawless-smart-contracts-cbda8ad99bd1)
- [An Overview of Formal Verification Projects in the Ethereum Ecosystem](https://github.com/leonardoalt/ethereum_formal_verification_overview)
- [End-to-End Formal Verification of Ethereum 2.0 Deposit Smart Contract](https://runtimeverification.com/blog/end-to-end-formal-verification-of-ethereum-2-0-deposit-smart-contract/)
- [Formally Verifying The World's Most Popular Smart Contract](https://www.zellic.io/blog/formal-verification-weth)
- [SMTChecker and Formal Verification](https://docs.soliditylang.org/en/v0.8.15/smtchecker.html)
