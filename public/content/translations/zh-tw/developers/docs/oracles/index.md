---
title: "預言機"
description: "預言機為以太坊智能合約提供存取現實世界資料的途徑，從而解鎖更多使用案例並為使用者創造更大價值。"
lang: zh-tw
authors: ["派翠克·柯林斯"]
---

預言機是產生資料饋送的應用程式，使鏈下資料來源可供區塊鏈上的智能合約使用。這是必要的，因為預設情況下，基於以太坊的智能合約無法存取儲存在區塊鏈網路之外的資訊。

賦予智能合約使用鏈下資料執行的能力，擴展了去中心化應用程式 (dapp) 的效用與價值。例如，鏈上預測市場依賴預言機提供有關結果的資訊，並使用這些資訊來驗證使用者的預測。假設愛麗絲 (Alice) 針對誰將成為下一任美國總統下注了 20 ETH。在這種情況下，預測市場去中心化應用程式 (dapp) 需要一個預言機來確認選舉結果，並決定愛麗絲是否有資格獲得派彩。

## 先決條件 {#prerequisites}

本頁面假設讀者熟悉[以太坊](/)基礎知識，包括[節點](/developers/docs/nodes-and-clients/)、[共識機制](/developers/docs/consensus-mechanisms/)以及 [EVM](/developers/docs/evm/)。您也應該對[智能合約](/developers/docs/smart-contracts/)和[智能合約剖析](/developers/docs/smart-contracts/anatomy/)有良好的掌握，特別是[事件](/glossary/#events)。

## 什麼是區塊鏈預言機？ {#what-is-a-blockchain-oracle}

預言機是獲取、驗證並將外部資訊（即儲存在鏈下的資訊）傳輸給在區塊鏈上運作的智能合約的應用程式。除了「提取」鏈下資料並在以太坊上廣播之外，預言機還可以將資訊從區塊鏈「推送」到外部系統，例如，一旦使用者透過以太坊交易發送費用，就解鎖智慧鎖。

如果沒有預言機，智能合約將完全受限於鏈上資料。

預言機根據資料來源（單一或多個來源）、信任模型（中心化或去中心化的）以及系統架構（立即讀取、發布-訂閱和請求-回應）而有所不同。我們也可以根據預言機是擷取外部資料供鏈上合約使用（輸入預言機）、將資訊從區塊鏈發送到鏈下應用程式（輸出預言機），還是在鏈下執行運算任務（運算預言機）來區分它們。

## 為什麼智能合約需要預言機？ {#why-do-smart-contracts-need-oracles}

許多開發人員將智能合約視為在區塊鏈上特定位址執行的程式碼。然而，對智能合約更[普遍的看法](/smart-contracts/)是，它們是能夠在滿足特定條件後強制執行各方之間協議的自動執行軟體程式——因此被稱為「智能合約」。

但考慮到以太坊是確定性的，使用智能合約來強制執行人與人之間的協議並不簡單。[確定性系統](https://en.wikipedia.org/wiki/Deterministic_algorithm)是指在給定初始狀態和特定輸入的情況下，總是產生相同結果的系統，這意味著在從輸入計算輸出的過程中沒有隨機性或變化。

為了實現確定性執行，區塊鏈限制節點*僅*使用儲存在區塊鏈本身的資料來對簡單的二元（真/假）問題達成共識。這類問題的範例包括：

- 「帳戶擁有者（由公鑰識別）是否使用配對的私鑰簽署了此交易？」
- 「此帳戶是否有足夠的資金來支付交易？」
- 「在該智能合約的上下文中，此交易是否有效？」等等。

如果區塊鏈從外部來源（即現實世界）接收資訊，將無法實現確定性，從而阻止節點對區塊鏈狀態變更的有效性達成共識。舉例來說，一個智能合約根據從傳統價格 API 獲取的當前 ETH-USD 匯率來執行交易。這個數字可能會頻繁變動（更不用說 API 可能會被棄用或遭駭客攻擊），這意味著執行相同合約程式碼的節點將得出不同的結果。

對於像以太坊這樣的公共區塊鏈，全球有數千個節點在處理交易，確定性至關重要。由於沒有中央機構作為事實來源，節點需要一種機制，以便在應用相同的交易後達到相同的狀態。如果節點 A 執行智能合約的程式碼並得到結果「3」，而節點 B 在執行相同交易後得到「7」，這種情況將導致共識崩潰，並消除以太坊作為去中心化運算平台的價值。

這種情況也凸顯了設計區塊鏈從外部來源提取資訊的問題。然而，預言機透過從鏈下來源獲取資訊並將其儲存在區塊鏈上供智能合約使用，解決了這個問題。由於儲存在鏈上的資訊具有不可竄改性且公開可用，以太坊節點可以安全地使用預言機匯入的鏈下資料來計算狀態變更，而不會破壞共識。

為此，預言機通常由在鏈上運作的智能合約和一些鏈下元件組成。鏈上合約接收來自其他智能合約的資料請求，並將其傳遞給鏈下元件（稱為預言機節點）。這個預言機節點可以查詢資料來源（例如使用應用程式介面 (API)），並發送交易將請求的資料儲存在智能合約的儲存空間中。

本質上，區塊鏈預言機彌合了區塊鏈與外部環境之間的資訊差距，創造了「混合智能合約」。混合智能合約是基於鏈上合約程式碼和鏈下基礎設施組合運作的合約。去中心化預測市場是混合智能合約的絕佳範例。其他範例可能包括農作物保險智能合約，當一組預言機確定發生了某些天氣現象時，該合約就會進行理賠。

## 什麼是預言機問題？ {#the-oracle-problem}

預言機解決了一個重要問題，但也引入了一些複雜性，例如：

- 我們如何驗證注入的資訊是從正確的來源提取的，或者沒有被竄改？

- 我們如何確保這些資料始終可用並定期更新？

所謂的「預言機問題」展示了使用區塊鏈預言機向智能合約發送輸入時所帶來的問題。預言機的資料必須正確，智能合約才能正確執行。此外，必須「信任」預言機營運商提供準確資訊，破壞了智能合約「無須信任」的特性。

不同的預言機為預言機問題提供了不同的解決方案，我們稍後將進行探討。預言機通常根據它們處理以下挑戰的能力來進行評估：

1. **正確性**：預言機不應導致智能合約基於無效的鏈下資料觸發狀態變更。預言機必須保證資料的*真實性*和*完整性*。真實性意味著資料是從正確的來源獲取的，而完整性意味著資料在發送到鏈上之前保持完好（即未被竄改）。

2. **可用性**：預言機不應延遲或阻止智能合約執行動作和觸發狀態變更。這意味著來自預言機的資料必須*隨需可用*且不中斷。

3. **誘因相容性**：預言機應激勵鏈下資料提供者向智能合約提交正確的資訊。誘因相容性涉及*可歸因性*和*問責制*。可歸因性允許將一條外部資訊連結到其提供者，而問責制則將資料提供者與他們提供的資訊綁定，以便根據所提供資訊的品質對他們進行獎勵或懲罰。

## 區塊鏈預言機服務如何運作？ {#how-does-a-blockchain-oracle-service-work}

### 使用者 {#users}

使用者是需要區塊鏈外部資訊來完成特定動作的實體（即智能合約）。預言機服務的基本工作流程始於使用者向預言機合約發送資料請求。資料請求通常會回答以下部分或全部問題：

1. 鏈下節點可以查閱哪些來源以獲取請求的資訊？

2. 報告者如何處理來自資料來源的資訊並提取有用的資料點？

3. 有多少預言機節點可以參與擷取資料？

4. 應如何管理預言機報告中的差異？

5. 應實施什麼方法來過濾提交內容並將報告聚合為單一數值？

### 預言機合約 {#oracle-contract}

預言機合約是預言機服務的鏈上元件。它監聽來自其他合約的資料請求，將資料查詢中繼給預言機節點，並將傳回的資料廣播給客戶端合約。該合約也可能對傳回的資料點執行一些運算，以產生一個聚合值發送給請求合約。

預言機合約公開了一些函數，客戶端合約在發出資料請求時會呼叫這些函數。收到新查詢後，智能合約將發出一個包含資料請求詳細資訊的[日誌事件](/developers/docs/smart-contracts/anatomy/#events-and-logs)。這會通知訂閱該日誌的鏈下節點（通常使用類似 JSON-RPC `eth_subscribe` 的命令），這些節點隨後會繼續擷取日誌事件中定義的資料。

以下是 Pedro Costa 提供的[預言機合約範例](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e)。這是一個簡單的預言機服務，可以根據其他智能合約的請求查詢鏈下 API，並將請求的資訊儲存在區塊鏈上：

```solidity
pragma solidity >=0.4.21 <0.6.0;

contract Oracle {
  Request[] requests; //發送至合約的請求列表
  uint currentId = 0; //遞增的請求 ID
  uint minQuorum = 2; //宣告最終結果前需接收的最小回應數量
  uint totalOracleCount = 3; // 硬編碼的預言機數量

  // 定義一般的 API 請求
  struct Request {
    uint id;                            //請求 ID
    string urlToQuery;                  //API URL
    string attributeToFetch;            //要在回應中擷取的 JSON 屬性（鍵）
    string agreedValue;                 //來自鍵的值
    mapping(uint => string) answers;     //預言機提供的答案
    mapping(address => uint) quorum;    //將查詢答案的預言機（1=預言機尚未投票，2=預言機已投票）
  }

  //觸發區塊鏈外部預言機的事件
  event NewRequest (
    uint id,
    string urlToQuery,
    string attributeToFetch
  );

  //當對最終結果達成共識時觸發
  event UpdatedRequest (
    uint id,
    string urlToQuery,
    string attributeToFetch,
    string agreedValue
  );

  function createRequest (
    string memory _urlToQuery,
    string memory _attributeToFetch
  )
  public
  {
    uint length = requests.push(Request(currentId, _urlToQuery, _attributeToFetch, ""));
    Request storage r = requests[length-1];

    // 硬編碼的預言機位址
    r.quorum[address(0x6c2339b46F41a06f09CA0051ddAD54D1e582bA77)] = 1;
    r.quorum[address(0xb5346CF224c02186606e5f89EACC21eC25398077)] = 1;
    r.quorum[address(0xa2997F1CA363D11a0a35bB1Ac0Ff7849bc13e914)] = 1;

    // 發布一個事件以供區塊鏈外部的預言機偵測
    emit NewRequest (
      currentId,
      _urlToQuery,
      _attributeToFetch
    );

    // 增加請求 ID
    currentId++;
  }

  //由預言機呼叫以記錄其答案
  function updateRequest (
    uint _id,
    string memory _valueRetrieved
  ) public {

    Request storage currRequest = requests[_id];

    //檢查預言機是否在受信任的預言機列表中
    //以及預言機是否尚未投票
    if(currRequest.quorum[address(msg.sender)] == 1){

      //標記此位址已投票
      currRequest.quorum[msg.sender] = 2;

      //遍歷答案的「陣列」直到有空位，並儲存擷取到的值
      uint tmpI = 0;
      bool found = false;
      while(!found) {
        //尋找第一個空位
        if(bytes(currRequest.answers[tmpI]).length == 0){
          found = true;
          currRequest.answers[tmpI] = _valueRetrieved;
        }
        tmpI++;
      }

      uint currentQuorum = 0;

      //遍歷預言機列表並檢查是否有足夠的預言機（最小法定人數）
      //投了與當前答案相同的票
      for(uint i = 0; i < totalOracleCount; i++){
        bytes memory a = bytes(currRequest.answers[i]);
        bytes memory b = bytes(_valueRetrieved);

        if(keccak256(a) == keccak256(b)){
          currentQuorum++;
          if(currentQuorum >= minQuorum){
            currRequest.agreedValue = _valueRetrieved;
            emit UpdatedRequest (
              currRequest.id,
              currRequest.urlToQuery,
              currRequest.attributeToFetch,
              currRequest.agreedValue
            );
          }
        }
      }
    }
  }
}
```

### 預言機節點 {#oracle-nodes}

預言機節點是預言機服務的鏈下元件。它從外部來源（例如託管在第三方伺服器上的 API）提取資訊，並將其放到鏈上供智能合約使用。預言機節點監聽來自鏈上預言機合約的事件，並繼續完成日誌中描述的任務。

預言機節點的一項常見任務是向 API 服務發送 [HTTP GET](https://www.w3schools.com/tags/ref_httpmethods.asp) 請求，解析回應以提取相關資料，將其格式化為區塊鏈可讀的輸出，並透過將其包含在發送給預言機合約的交易中來將其發送到鏈上。預言機節點也可能被要求使用「真實性證明」來證明提交資訊的有效性和完整性，我們稍後將對此進行探討。

考慮到燃料 (Gas) 成本和區塊大小限制，運算預言機也依賴鏈下節點來執行在鏈上執行不切實際的運算任務。例如，預言機節點的任務可能是產生一個可驗證的隨機數字（例如，用於基於區塊鏈的遊戲）。

## 預言機設計模式 {#oracle-design-patterns}

預言機有不同的類型，包括*立即讀取*、*發布-訂閱*和*請求-回應*，其中後兩者在以太坊智能合約中最受歡迎。在此我們簡要描述發布-訂閱和請求-回應模型。

### 發布-訂閱預言機 {#publish-subscribe-oracles}

這種類型的預言機公開了一個「資料饋送」，其他合約可以定期讀取以獲取資訊。在這種情況下，資料預計會頻繁變更，因此客戶端合約必須監聽預言機儲存空間中資料的更新。一個例子是向使用者提供最新 ETH-USD 價格資訊的預言機。

### 請求-回應預言機 {#request-response-oracles}

請求-回應設定允許客戶端合約請求發布-訂閱預言機所提供資料以外的任意資料。當資料集太大而無法儲存在智能合約的儲存空間中，和/或使用者在任何時間點只需要一小部分資料時，請求-回應預言機是理想的選擇。

雖然比發布-訂閱模型更複雜，但請求-回應預言機基本上就是我們在上一節中所描述的內容。預言機將有一個鏈上元件，它接收資料請求並將其傳遞給鏈下節點進行處理。

發起資料查詢的使用者必須支付從鏈下來源擷取資訊的成本。客戶端合約還必須提供資金，以支付預言機合約透過請求中指定的回呼函數傳回回應時所產生的燃料 (Gas) 成本。

## 中心化與去中心化預言機 {#types-of-oracles}

### 中心化預言機 {#centralized-oracles}

中心化預言機由單一實體控制，該實體負責聚合鏈下資訊並根據請求更新預言機合約的資料。中心化預言機效率很高，因為它們依賴單一事實來源。在專有資料集由擁有者直接發布並帶有廣泛接受的簽章的情況下，它們可能會發揮更好的作用。然而，它們也帶來了缺點：

#### 正確性保證低 {#low-correctness-guarantees}

對於中心化預言機，無法確認提供的資訊是否正確。即使是「信譽良好」的提供者也可能作惡或遭駭客攻擊。如果預言機損壞，智能合約將基於錯誤資料執行。

#### 可用性差 {#poor-availability}

中心化預言機無法保證始終將鏈下資料提供給其他智能合約。如果提供者決定關閉服務，或者駭客劫持了預言機的鏈下元件，您的智能合約將面臨阻斷服務 (DoS) 攻擊的風險。

#### 誘因相容性差 {#poor-incentive-compatibility}

中心化預言機通常對資料提供者發送準確/未經竄改資訊的誘因設計不佳或根本不存在。為正確性向預言機付費並不能保證其誠實。隨著智能合約控制的價值數量增加，這個問題會變得更大。

### 去中心化預言機 {#decentralized-oracles}

去中心化預言機旨在透過消除單點故障來克服中心化預言機的限制。去中心化預言機服務由點對點網路中的多個參與者組成，他們在將鏈下資料發送到智能合約之前對其達成共識。

去中心化預言機（理想情況下）應該是無需許可、無須信任且不受中央機構管理的；實際上，預言機之間的去中心化程度處於一個光譜上。存在半去中心化的預言機網路，任何人都可以參與，但有一個「擁有者」根據歷史表現批准和移除節點。完全去中心化的預言機網路也存在：這些網路通常作為獨立的區塊鏈運作，並具有定義的共識機制來協調節點和懲罰不當行為。

使用去中心化預言機具有以下好處：

### 高正確性保證 {#high-correctness-guarantees}

去中心化預言機試圖使用不同的方法來實現資料的正確性。這包括使用證明來證明傳回資訊的真實性和完整性，並要求多個實體共同同意鏈下資料的有效性。

#### 真實性證明 {#authenticity-proofs}

真實性證明是密碼學機制，能夠獨立驗證從外部來源擷取的資訊。這些證明可以驗證資訊的來源，並偵測擷取後資料可能發生的竄改。

真實性證明的範例包括：

**傳輸層安全性 (TLS) 證明**：預言機節點通常使用基於傳輸層安全性 (TLS) 協定的安全 HTTP 連線從外部來源擷取資料。一些去中心化預言機使用真實性證明來驗證 TLS 工作階段（即確認節點與特定伺服器之間的資訊交換），並確認工作階段的內容未被竄改。

**TEE 證明**：[TEE](https://en.wikipedia.org/wiki/Trusted_execution_environment) 是一個沙盒運算環境，與其主機系統的運作程序隔離。TEE 確保儲存/使用在運算環境中的任何應用程式碼或資料都保持完整性、機密性和不可竄改性。使用者也可以產生證明，以證明應用程式執行個體正在 TEE 內執行。

某些類別的去中心化預言機要求預言機節點營運商提供 TEE 證明。這向使用者確認節點營運商正在 TEE 中執行預言機客戶端的執行個體。TEE 防止外部程序竄改或讀取應用程式的程式碼和資料，因此，這些證明證明了預言機節點保持了資訊的完整性和機密性。

#### 基於共識的資訊驗證 {#consensus-based-validation-of-information}

中心化預言機在向智能合約提供資料時依賴單一事實來源，這引入了發布不準確資訊的可能性。去中心化預言機透過依賴多個預言機節點查詢鏈下資訊來解決這個問題。透過比較來自多個來源的資料，去中心化預言機降低了將無效資訊傳遞給鏈上合約的風險。

然而，去中心化預言機必須處理從多個鏈下來源擷取的資訊中的差異。為了盡量減少資訊差異並確保傳遞給預言機合約的資料反映預言機節點的集體意見，去中心化預言機使用以下機制：

##### 對資料準確性進行投票/質押 {#}

一些去中心化預言機網路要求參與者使用網路的原生代幣對資料查詢答案的準確性（例如，「誰贏得了 2020 年美國大選？」）進行投票或質押。然後，聚合協定會聚合投票和質押，並將多數人支持的答案視為有效答案。

答案偏離多數答案的節點將受到懲罰，其代幣將分配給提供更正確數值的其他節點。強制節點在提供資料之前提供保證金，可以激勵誠實的回應，因為他們被假定為意圖最大化回報的理性經濟參與者。

質押/投票也保護去中心化預言機免受[女巫攻擊](/glossary/#sybil-attack)，在這種攻擊中，惡意行為者會建立多個身分來操縱共識系統。然而，質押無法防止「搭便車」（預言機節點複製他人的資訊）和「懶惰驗證」（預言機節點跟隨多數而不自行驗證資訊）。

##### 謝林點機制 {#}

[謝林點](<https://en.wikipedia.org/wiki/Focal_point_(game_theory)>) 是一個賽局理論概念，假設多個實體在沒有任何溝通的情況下，總是會預設採用一個共同的解決方案。謝林點機制通常用於去中心化預言機網路，使節點能夠對資料請求的答案達成共識。

早期的一個想法是 [SchellingCoin](https://blog.ethereum.org/2014/03/28/schellingcoin-a-minimal-trust-universal-data-feed)，這是一個提議的資料饋送，參與者提交對「純量」問題（答案由大小描述的問題，例如「ETH 的價格是多少？」）的回應，並附帶一筆存款。提供介於第 25 和第 75 [百分位數](https://en.wikipedia.org/wiki/Percentile)之間數值的使用者將獲得獎勵，而那些數值大幅偏離中位數的使用者將受到懲罰。

雖然 SchellingCoin 今天已不存在，但許多去中心化預言機——特別是 [Maker 協定的預言機](https://docs.makerdao.com/smart-contract-modules/oracle-module)——使用謝林點機制來提高預言機資料的準確性。每個 Maker 預言機由一個鏈下點對點節點網路（「中繼者」和「饋送者」）和一個鏈上「Medianizer」合約組成，前者提交抵押品資產的市場價格，後者計算所有提供數值的中位數。一旦指定的延遲期結束，該中位數將成為相關資產的新參考價格。

其他使用謝林點機制的預言機範例包括 [切林克 (Chainlink) 鏈下報告](https://docs.chain.link/architecture-overview/off-chain-reporting)和 [Witnet](https://witnet.io/)。在這兩個系統中，來自點對點網路中預言機節點的回應被聚合為單一聚合值，例如平均值或中位數。節點會根據其回應與聚合值一致或偏離的程度受到獎勵或懲罰。

謝林點機制之所以具有吸引力，是因為它們最大限度地減少了鏈上足跡（只需發送一筆交易），同時保證了去中心化。後者是可能的，因為節點必須在提交的回應清單被輸入到產生平均值/中位數的演算法之前對其進行簽署。

### 可用性 {#availability}

去中心化預言機服務確保鏈下資料對智能合約的高可用性。這是透過將鏈下資訊來源和負責將資訊傳輸到鏈上的節點都去中心化來實現的。

這確保了容錯性，因為預言機合約可以依賴多個節點（這些節點也依賴多個資料來源）來執行來自其他合約的查詢。來源*和*節點營運商層級的去中心化至關重要——一個提供從相同來源擷取資訊的預言機節點網路，將會遇到與中心化預言機相同的問題。

基於質押的預言機也可能罰沒未能快速回應資料請求的節點營運商。這極大地激勵了預言機節點投資於容錯基礎設施並及時提供資料。

### 良好的誘因相容性 {#good-incentive-compatibility}

去中心化預言機實施各種誘因設計，以防止預言機節點之間出現[拜占庭](https://en.wikipedia.org/wiki/Byzantine_fault)行為。具體來說，它們實現了*可歸因性*和*問責制*：

1. 去中心化預言機節點通常被要求簽署他們為回應資料請求而提供的資料。這些資訊有助於評估預言機節點的歷史表現，以便使用者在發出資料請求時可以過濾掉不可靠的預言機節點。一個例子是 Witnet 的[演算法聲譽系統](https://docs.witnet.io/intro/about/architecture#algorithmic-reputation-system)。

2. 如前所述，去中心化預言機可能要求節點對其提交資料真實性的信心進行質押。如果申領屬實，這筆質押可以連同誠實服務的獎勵一起退還。但如果資訊不正確，它也可能被罰沒，這提供了一定程度的問責制。

## 預言機在智能合約中的應用 {#applications-of-oracles-in-smart-contracts}

以下是預言機在以太坊中的常見使用案例：

### 擷取金融資料 {#retrieving-financial-data}

[去中心化金融 (DeFi)](/defi/) 應用程式允許點對點的借貸、借款和資產交易。這通常需要獲取不同的金融資訊，包括匯率資料（用於計算加密貨幣的法定價值或比較代幣價格）和資本市場資料（用於計算代幣化資產的價值，例如黃金或美元）。

例如，DeFi 借貸協定需要查詢作為抵押品存入的資產（例如 ETH）的當前市場價格。這讓合約能夠確定抵押品資產的價值，並確定它可以從系統中借款多少。

DeFi 中受歡迎的「價格預言機」（通常這樣稱呼）包括切林克 (Chainlink) 價格饋送、Compound 協定的[開放價格饋送](https://compound.finance/docs/prices)、尤尼斯瓦普 (Uniswap) 的[時間加權平均價格 (TWAP)](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/oracles) 以及 [Maker 預言機](https://docs.makerdao.com/smart-contract-modules/oracle-module)。

建構者在將這些價格預言機整合到他們的專案之前，應該了解它們帶來的注意事項。這篇[文章](https://blog.openzeppelin.com/secure-smart-contract-guidelines-the-dangers-of-price-oracles/)詳細分析了在計畫使用上述任何價格預言機時應考慮的事項。

以下是如何在智能合約中使用切林克 (Chainlink) 價格饋送擷取最新 ETH 價格的範例：

```solidity
pragma solidity ^0.6.7;

import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";

contract PriceConsumerV3 {

    AggregatorV3Interface internal priceFeed;

    /**
     * 網路: Kovan
     * 聚合器: ETH/USD
     * 位址: 0x9326BFA02ADD2366b30bacB125260Af641031331
     */
    constructor() public {
        priceFeed = AggregatorV3Interface(0x9326BFA02ADD2366b30bacB125260Af641031331);
    }

    /**
     * 回傳最新價格
     */
    function getLatestPrice() public view returns (int) {
        (
            uint80 roundID,
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = priceFeed.latestRoundData();
        return price;
    }
}
```

### 產生可驗證的隨機性 {#generating-verifiable-randomness}

某些區塊鏈應用程式，例如基於區塊鏈的遊戲或彩票計畫，需要高度的不可預測性和隨機性才能有效運作。然而，區塊鏈的確定性執行消除了隨機性。

最初的方法是使用偽隨機密碼學函數，例如 `blockhash`，但這些可能會被解決工作量證明 (PoW) 演算法的[礦工操縱](https://ethereum.stackexchange.com/questions/3140/risk-of-using-blockhash-other-miners-preventing-attack#:~:text=So%20while%20the%20miners%20can,to%20one%20of%20the%20players.)。此外，以太坊[轉換為權益證明 (PoS)](/roadmap/merge/) 意味著開發人員不能再依賴 `blockhash` 來獲取鏈上隨機性。信標鏈的 [RANDAO 機制](https://eth2book.info/altair/part2/building_blocks/randomness)提供了一個替代的隨機性來源。

可以在鏈下產生隨機值並將其發送到鏈上，但這樣做會對使用者施加很高的信任要求。他們必須相信該數值確實是透過不可預測的機制產生的，並且在傳輸過程中沒有被竄改。

專為鏈下運算設計的預言機透過在鏈下安全地產生隨機結果來解決這個問題，它們將這些結果連同證明該過程不可預測性的密碼學證明一起廣播到鏈上。一個例子是 [切林克 (Chainlink) VRF](https://docs.chain.link/docs/chainlink-vrf/)（可驗證隨機函數），這是一個可證明公平且防竄改的隨機數產生器 (RNG)，可用於為依賴不可預測結果的應用程式建構可靠的智能合約。

### 獲取事件結果 {#getting-outcomes-for-events}

藉助預言機，建立回應現實世界事件的智能合約變得很容易。預言機服務透過允許合約透過鏈下元件連接到外部 API 並從這些資料來源使用資訊，使這成為可能。例如，前面提到的預測去中心化應用程式 (dapp) 可能會請求預言機從受信任的鏈下來源（例如美聯社）傳回選舉結果。

使用預言機根據現實世界的結果擷取資料，實現了其他新穎的使用案例；例如，去中心化保險產品需要有關天氣、災害等的準確資訊才能有效運作。

### 自動化智能合約 {#automating-smart-contracts}

智能合約不會自動執行；相反，外部擁有帳戶 (EOA) 或另一個合約帳戶必須觸發正確的函數來執行合約的程式碼。在大多數情況下，合約的大部分函數都是公開的，可以由 EOA 和其他合約呼叫。

但合約內也有其他人無法存取的*私有函數*；但這些函數對去中心化應用程式 (dapp) 的整體功能至關重要。範例包括定期為使用者鑄造新 NFT 的 `mintERC721Token()` 函數、在預測市場中發放派彩的函數，或在 DEX 中解鎖質押代幣的函數。

開發人員需要定期觸發此類函數，以保持應用程式順利運作。然而，這可能會導致開發人員在繁瑣的任務上浪費更多時間，這就是為什麼自動化執行智能合約具有吸引力的原因。

一些去中心化預言機網路提供自動化服務，允許鏈下預言機節點根據使用者定義的參數觸發智能合約函數。通常，這需要向預言機服務「註冊」目標合約，提供資金以支付預言機營運商，並指定觸發合約的條件或時間。

切林克 (Chainlink) 的 [Keeper 網路](https://chain.link/keepers)為智能合約提供了以信任最小化和去中心化方式外包定期維護任務的選項。閱讀官方的 [Keeper 文件](https://docs.chain.link/docs/chainlink-keepers/introduction/)，以獲取有關使您的合約與 Keeper 相容以及使用 Upkeep 服務的資訊。

## 如何使用區塊鏈預言機 {#use-blockchain-oracles}

您可以將多個預言機應用程式整合到您的以太坊去中心化應用程式 (dapp) 中：

**[切林克 (Chainlink)](https://chain.link/)** - *切林克 (Chainlink) 去中心化預言機網路提供防竄改的輸入、輸出和運算，以支援任何區塊鏈上的進階智能合約。*

**[RedStone 預言機](https://redstone.finance/)** - *RedStone 是一個去中心化的模組化預言機，提供燃料 (Gas) 最佳化的資料饋送。它專門為新興資產提供價格饋送，例如流動性質押代幣 (LST)、流動性再質押代幣 (LRT) 和比特幣質押衍生品。*

**[Chronicle](https://chroniclelabs.org/)** - *Chronicle 透過開發真正可擴展、具成本效益、去中心化且可驗證的預言機，克服了目前在鏈上傳輸資料的限制。*

**[Witnet](https://witnet.io/)** - *Witnet 是一個無需許可、去中心化且抗審查的預言機，幫助智能合約以強大的加密經濟保證來回應現實世界事件。*

**[UMA 預言機](https://uma.xyz)** - *UMA 的樂觀預言機允許智能合約快速接收任何類型的資料，用於不同的應用程式，包括保險、金融衍生品和預測市場。*

**[泰勒 (Tellor)](https://tellor.io/)** - *泰勒 (Tellor) 是一個透明且無需許可的預言機協定，讓您的智能合約在需要時輕鬆獲取任何資料。*

**[Band 協定](https://bandprotocol.com/)** - *Band 協定是一個跨鏈資料預言機平台，它將現實世界資料和 API 聚合並連接到智能合約。*

**[Pyth 網路](https://pyth.network/)** - *Pyth 網路是一個第一方金融預言機網路，旨在於防竄改、去中心化且自我維持的環境中，在鏈上發布連續的現實世界資料。*

**[API3 DAO](https://www.api3.org/)** - *API3 DAO 正在提供第一方預言機解決方案，在智能合約的去中心化解決方案中提供更高的來源透明度、安全性和可擴展性。*

**[Supra](https://supra.com/)** - 一個垂直整合的跨鏈解決方案工具包，互連所有區塊鏈，無論是公共（L1 和 L2）還是私有（企業），提供可用於鏈上和鏈下使用案例的去中心化預言機價格饋送。 

**[Gas Network](https://gas.network/)** - 一個分散式預言機平台，提供跨區塊鏈的即時 Gas 價格資料。透過將領先的 Gas 價格資料提供者的資料帶到鏈上，Gas Network 正在幫助推動互操作性。Gas Network 支援超過 35 條鏈的資料，包括以太坊主網和許多領先的 L2。

**[DIA](https://www.diadata.org/)** - 一個跨鏈預言機網路，為所有主要資產類別的 20,000 多種資產提供可驗證的資料饋送。DIA 直接從 100 多個主要市場獲取原始交易資料並在鏈上進行運算，確保完全的資料透明度和可驗證性，並可針對任何使用案例進行自訂設定。

**[Stork](https://stork.network)** - Stork 以超低延遲提供價格資料，支援廣泛的使用案例，包括永續合約市場、借貸協定和 DeFi 生態系統，並在上市時快速支援新資產。

## 延伸閱讀 {#further-reading}

**文章**

- [什麼是區塊鏈預言機？](https://chain.link/education/blockchain-oracles) — *切林克 (Chainlink)*
- [什麼是區塊鏈預言機？](https://medium.com/better-programming/what-is-a-blockchain-oracle-f5ccab8dbd72) — *派翠克·柯林斯 (Patrick Collins)*
- [去中心化預言機：全面概述](https://medium.com/fabric-ventures/decentralised-oracles-a-comprehensive-overview-d3168b9a8841) — *Julien Thevenard*
- [在以太坊上實作區塊鏈預言機](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) – *Pedro Costa*
- [為什麼智能合約不能進行 API 呼叫？](https://ethereum.stackexchange.com/questions/301/why-cant-contracts-make-api-calls) — *StackExchange*
- [所以你想使用價格預言機](https://samczsun.com/so-you-want-to-use-a-price-oracle/) — *samczsun*

**影片**

- [預言機與區塊鏈效用的擴展](https://youtu.be/BVUZpWa8vpw) — *Real Vision Finance*

**教學**

- [如何在 Solidity 中獲取以太坊的當前價格](https://blog.chain.link/fetch-current-crypto-price-data-solidity/) — *切林克 (Chainlink)*
- [使用預言機資料](https://docs.chroniclelabs.org/Developers/tutorials/Remix) — *Chronicle*
- [預言機挑戰](https://speedrunethereum.com/challenge/oracles) - *Speedrun Ethereum*

**範例專案**

- [Solidity 中以太坊的完整切林克 (Chainlink) 入門專案](https://github.com/hackbg/chainlink-fullstack) — *HackBG*