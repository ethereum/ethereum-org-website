---
title: 預言機 (Oracles)
description: 預言機使以太坊智慧型合約得以取得現實世界的資料，替使用者增加更多使用情境以及價值。
lang: zh-tw
---

預言機是產生數據來源的應用程式，使鏈下數據來源可供區塊鏈用於智慧型合約。 因為預設情況下，基於以太坊的智慧型合約無法存取儲存在區塊鏈網路外部的資訊，所以這是必要的。

賦予智慧型合約使用鏈下數據執行的能力，擴展了去中心化應用程式的效用和價值。 例如，鏈上預測市場依靠預言機提供有關結果的信息，用於驗證用戶的預測。 假設 Alice 押注 20 以太幣打賭誰會成為下任美國 總統。 在這種情況下，預測市場去中心化應用程式需要一個預言機來確認選舉結果並確定 Alice 是否有資格獲得付款。

## 先備知識 {#prerequisites}

這頁面假定讀者已經熟悉以太坊基礎，例如[節點](/developers/docs/nodes-and-clients/)，[共識機制](/developers/docs/consensus-mechanisms/)，以及[以太坊虛擬機](/developers/docs/evm/)。 你應該也對[智慧型合約](/developers/docs/smart-contracts/)和其[解析](/developers/docs/smart-contracts/anatomy/)，尤其是[事件](/glossary/#events)有所掌握。

## 什麼是區塊鏈預言機？ {#what-is-a-blockchain-oracle}

預言機用來提供、驗證以及傳送外部資料 (如：鏈外資料) 至區塊鏈上的智慧型合約使用。 除了「拉取」鏈下數據並在以太坊上廣播之外，預言機還可以將訊息從區塊鏈「推送」到外部系統，例如，一旦用戶透過以太坊交易發送費用就會解鎖智慧鎖。

如果沒有預言機，智慧型合約將完全局限於鏈上資料。

預言機依數據來源（一個或多個）、信任模型（中心化或去中心化）和系統架構（立即讀取、發布-訂閱模式和請求-回應模式）而有所不同。 我們還可以根據預言機是否檢索外部數據以供鏈上合約使用（輸入預言機）、將資訊從區塊鏈發送到鏈下應用程式（輸出預言機）或執行鏈下計算任務（計算預言機）來區分預言機。

## 為什麼智慧型合約需要預言機？ {#why-do-smart-contracts-need-oracles}

許多開發者將智慧型合約視為在區塊鏈上特定地址運行的程式碼。 然而，對[智慧型合約](/smart-contracts/)的更普遍的看法是，它們是自動執行的軟體程序，一旦滿足特定條件，就能夠在各方之間執行協議 - 因此稱為「智慧型合約」。

但考慮到以太坊的確定性，使用智慧型合約來執行人與人之間的協議並不簡單。 [確定性系統](https://en.wikipedia.org/wiki/Deterministic_algorithm)是一種在給定初始狀態和特定輸入的情況下始終產生相同結果的系統，這意味著從輸入計算輸出的過程中不存在隨機性或變化。

為了實現確定性執行，區塊鏈限制節點_僅_使用儲存在區塊鏈本身上的數據就簡單的二元 (true/false) 問題達成共識。 此類問題的範例包括：

- 「帳戶所有者（由公鑰識別）是否使用配對的私鑰簽署了這筆交易？」
- 「這個帳戶有足夠的資金來支付交易嗎？」
- 「這筆交易在該智慧型合約的背景下有效嗎？」等等。

如果區塊鏈從外部來源（即來自現實世界）接收訊息，則無法實現確定性，從而阻止節點就區塊鏈狀態變更的有效性達成一致。 以一個智慧型合約為例，它根據從傳統價格應用程式介面取得的當前以太幣-美元匯率執行交易。 這個數字可能會經常變化（更不用說應用程式介面可能會被棄用或被駭客攻擊），這意味著執行相同合約程式碼的節點會得到不同結果。

對於像以太坊這樣在全球有數千個節點處理交易的公共區塊鏈來說，確定性至關重要。 由於沒有中央機構作為事實來源，節點需要在應用相同交易後達到相同狀態的機制。 如果節點 A 執行智慧型合約程式碼並得到 「3」，而節點 B 在運行同一交易後得到 「7」，則會導致共識崩潰，從而抹掉以太坊作為去中心化計算平台的價值。

這種情況也凸顯了設計區塊鏈從外部來源取得資訊的問題。 然而，預言機透過從鏈下來源獲取資訊，並將其儲存在區塊鏈上給智慧型合約使用來解決這個問題。 由於儲存在鏈上的信息是不可更改且公開的，以太坊節點可以安全地使用預言機導入的鏈下數據來計算狀態變化，而不會破壞共識。

為此，預言機通常由鏈上運行的智慧型合約和一些鏈下組件組成。 鏈上合約接收來自其他智慧型合約的數據請求，並將其傳遞給鏈下元件（稱為預言機節點）。 此預言機節點可以查詢數據來源，例如使用應用程式介面 (API)，並發送交易以將請求的數據儲存在智慧型合約的儲存中。

本質上，區塊鏈預言機彌合了區塊鏈與外部環境之間的資訊鴻溝，創建了「混合智慧型合約」。 混合智慧型合約是一種基於鏈上合約程式碼和鏈下基礎設施組合的功能。 去中心化預測市場是混合智慧型合約的一個很好的例子。 其他例子可能包括農作物保險智慧型合約，當一組預言機確定某些天氣現象已發生，該合約就會作出賠付。

## 什麼是預言機問題？ {#the-oracle-problem}

預言機解決了一個重要問題，但也帶來了一些複雜性，例如：

- 我們如何驗證注入的資訊是從正確的來源提取的或沒有被篡改？

- 我們如何確保這些數據始終可用並定期更新？

所謂的「預言機問題」展示了使用區塊鏈預言機向智慧型合約發送輸入所帶來的問題。 來自預言機的數據必須正確，智慧型合約才能正確執行。 此外，必須「信任」預言機運營商提供準確的資訊，會破壞智慧型合約的「去信任」方面。

不同的預言機為預言機問題提供了不同的解決方案，我們會稍後探討。 預言機通常會根據它們應對以下挑戰的能力被評估：

1. **正確性**：預言機不應導致智慧型合約基於無效的鏈下資料觸發狀態變更。 預言機必須保證數據的_真實性_和_完整性_。 真實性意味著數據是從正確的來源獲得的，而完整性意味著數據在發送到鏈上之前保持完整（即沒有被更改）。

2. **可用性**：預言機不應延遲或阻止智慧型合約執行操作並觸發狀態變更。 這意味著來自預言機的數據必須_請求時可用_，且沒有間斷。

3. **激勵相容性**：預言機應該激勵鏈下數據提供者向智慧型合約提交正確的資訊， 激勵相容性包括了_可歸因性_和_問責性_。 可歸因性讓一段外部資訊與其提供者連結，而問責性則將數據提供者與他們提供的資訊綁定起來，讓他們能根據提供的資訊品質得到獎勵或懲罰。

## 區塊鏈預言機服務如何運作？ {#how-does-a-blockchain-oracle-service-work}

### 使用者 {#users}

使用者是指需要區塊鏈外部資訊來完成特定操作的實體（即智慧型合約）。 預言機服務的基本工作流程從用戶向預言機合約發起數據請求開始。 數據請求通常會回應以下問題的一部分或全部：

1. 鏈下節點可以在哪些來源查詢需要的資訊？

2. 報告者如何處理來自數據來源的資訊，並提取有用的數據點？

3. 有多少預言機節點可以參與數據擷取？

4. 如何處理預言機報告中的差異？

5. 應使用甚麼方法來過濾提交的資訊並將報告聚合為單一數值？

### 預言機合約 {#oracle-contract}

預言機合約是預言機服務的鏈上組件。 它負責監聽來自其他合約的數據請求，將數據查詢傳遞給預言機節點，並將返回的數據廣播給用戶端合約。 這份合約也可以對返回的數據點進行計算，以產生一個聚合值並將其發送給請求合約。

預言機合約公開了一些函數，讓用戶端合約在發出資料請求時使用。 當收到新的查詢時，智慧型合約會釋出一個包含資料請求細節的[日誌事件](/developers/docs/smart-contracts/anatomy/#events-and-logs)。 這會通知已經訂閱了日誌的鏈下節點（通常是使用類似 JSON-RPC 的 `eth_subscribe` 指令），繼續檢索在日誌事件中定義的數據。

以下是一個由 Pedro Costa 提供的[預言機合約的範例](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e)。 這是一個簡單的預言機服務，能依照其他智慧型合約的請求，查詢鏈下應用程式介面（API）並將請求的資訊儲存在區塊鏈上。

```solidity
pragma solidity >=0.4.21 <0.6.0;

contract Oracle {
  Request[] requests; //list of requests made to the contract
  uint currentId = 0; //increasing request id
  uint minQuorum = 2; //minimum number of responses to receive before declaring final result
  uint totalOracleCount = 3; // Hardcoded oracle count

  // defines a general api request
  struct Request {
    uint id;                            //request id
    string urlToQuery;                  //API url
    string attributeToFetch;            //json attribute (key) to retrieve in the response
    string agreedValue;                 //value from key
    mapping(uint => string) answers;     //answers provided by the oracles
    mapping(address => uint) quorum;    //oracles which will query the answer (1=oracle hasn't voted, 2=oracle has voted)
  }

  //event that triggers oracle outside of the blockchain
  event NewRequest (
    uint id,
    string urlToQuery,
    string attributeToFetch
  );

  //triggered when there's a consensus on the final result
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

    // Hardcoded oracles address
    r.quorum[address(0x6c2339b46F41a06f09CA0051ddAD54D1e582bA77)] = 1;
    r.quorum[address(0xb5346CF224c02186606e5f89EACC21eC25398077)] = 1;
    r.quorum[address(0xa2997F1CA363D11a0a35bB1Ac0Ff7849bc13e914)] = 1;

    // launch an event to be detected by oracle outside of blockchain
    emit NewRequest (
      currentId,
      _urlToQuery,
      _attributeToFetch
    );

    // increase request id
    currentId++;
  }

  //called by the oracle to record its answer
  function updateRequest (
    uint _id,
    string memory _valueRetrieved
  ) public {

    Request storage currRequest = requests[_id];

    //check if oracle is in the list of trusted oracles
    //and if the oracle hasn't voted yet
    if(currRequest.quorum[address(msg.sender)] == 1){

      //marking that this address has voted
      currRequest.quorum[msg.sender] = 2;

      //iterate through "array" of answers until a position if free and save the retrieved value
      uint tmpI = 0;
      bool found = false;
      while(!found) {
        //find first empty slot
        if(bytes(currRequest.answers[tmpI]).length == 0){
          found = true;
          currRequest.answers[tmpI] = _valueRetrieved;
        }
        tmpI++;
      }

      uint currentQuorum = 0;

      //iterate through oracle list and check if enough oracles(minimum quorum)
      //have voted the same answer as the current one
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

預言機節點是預言機服務的鏈下組件。 它從外部資料來源提取信息，例如由第三方伺服器託管的應用程式介面（API），並把資料放在鏈上供智慧型合約使用。 預言機節點監聽鏈上預言機合約的事件，並完成在日誌中描述的任務。

對預言機節點來說，一個常見的任務是發送一個 [HTTP GET](https://www.w3schools.com/tags/ref_httpmethods.asp) 請求到一個應用程式介面（API），分析回應以提取相關資料，把資料格式化成區塊鏈可讀的輸出，然後通過向預言機合約發送一個包含資料的交易，將其發送到鏈上。 預言機節點有時也會被要求用「真實性證明」去證明提交資料的有效性和完整性，我們稍後會再深入探討。

計算型預言機也依賴於鏈下節點，來執行那些在鏈上由於 gas 費用和區塊大小限制而無法執行的計算任務。 例如，預言機節點可能會被要求生成可驗證隨機數字（例如：用在基於區塊鏈的遊戲）。

## 預言機設計樣式 {#oracle-design-patterns}

預言機有不同的種類，包括_即時讀取型_，_發佈-訂閱型_以及_請求-回應型_，後兩者在以太坊智慧型合約中最受歡迎。 這裏我們簡單介紹發佈-訂閱型和請求-回應型。

### 發佈-訂閱型預言機 {#publish-subscribe-oracles}

這類預言機提供「數據餵送」，其他合約可以定期讀取以取得資訊。 在這種情況下，資料預計會頻繁變動，所以用戶端合約需要監聽在預言機中儲存的數據更新。 例如提供最新 ETH-USD 價格信息給使用者的預言機。

### 請求-回應型預言機 {#request-response-oracles}

請求-回應的設置允許用戶端合約請求發佈-訂閱型預言機未提供的任意數據。 當數據集太大，無法儲存在智慧型合約時，或者使用者在任何時刻只需要數據的一小部分時，請求-回應型預言機是理想的選擇。

雖然比發佈-訂閱型預言機複雜，但請求-回應型預言機基本上和我們在上一節所描述的一樣。 預言機會有一個鏈上組件來接收資料請求，並傳遞給鏈下節點進行處理。

發起資料查詢的使用者需要負擔從鏈下來源檢索資訊的費用。 此外，使用者合約還必須提供資金，用來支付預言機合約通過請求中指定的回呼函數返回回應時所產生的 Gas 費用。

## 中心化與去中心化預言機 {#types-of-oracles}

### 中心化預言機 {#centralized-oracles}

中心化預言機由單一實體控制，此實體負責把鏈下資訊聚合並根據請求更新預言機合約中的數據。 由於中心化預言機依賴單一真實性來源，所以效率比較高。 當專有數據集由擁有者直接發佈，且帶有被廣泛接受的簽名時，中心化預言機的表現可能會更好。 但是，它們也帶來了一些缺點：

#### 較低的準確性保證 {#low-correctness-guarantees}

使用中心化預言機時，不能確認提供的資訊準確與否。 即使是「聲譽良好」的提供者也可能會變得不可靠或被駭客攻擊。 如果預言機被破壞，智慧型合約將會基於錯誤資料來運行。

#### 可用性差 {#poor-availability}

中心化預言機無法保證能持續向其他智慧型合約提供鏈下資料。 如果提供者決定把服務關閉，或者一個駭客劫持了預言機的鏈下組件，你的智慧型合約會面臨拒絕服務（DoS）攻擊的風險。

#### 激勵相容性差 {#poor-incentive-compatibility}

中心化預言機通常缺乏良好設計，或根本不存在激勵機制來促使數據提供者提供準確或未經更改的資訊。 向預言機付錢以保證正確性並不等同於保證誠實。 隨著智慧型合約控制的價值數量增加，這一問題變得更加嚴重。

### 去中心化預言機 {#decentralized-oracles}

去中心化預言機旨在克服中心化預言機的限制，通過消除單點故障來提高可靠性。 去中心化預言機服務由點對點網路中的多個參與者組成，這些參與者在將鏈下數據發送到智慧型合約之前，會先對數據達成共識。

理想狀態下，去中心化預言機應該是無許可，去信任而且不受中心化組織管理；而在現實中，預言機有著不同程度的去中心化。 有一些半去中心化的預言機網路允許任何人參與，但由一個「所有者」根據節點的過往表現來批准和移除節點。 完全去中心化的預言機網路也存在，他們通常以獨立區塊鏈運行，並設有明確的共識機制來協調節點並懲罰不當行為。

使用去中化預言機有著以下的優點：

### 較高的準確性保證 {#high-correctness-guarantees}

去中心化預言機嘗試用不同的方法來達到數據的準確性。 這包括了使用證明來證實返回資訊的真實性和完整性，以及要求多個實體共同同意鏈下數據的有效性。

#### 真實性證明 {#authenticity-proofs}

真實性證明是一個密碼學機制，能夠讓人們獨立驗證從外部來源檢索到的資訊。 這些證明可以驗證資訊的來源，並在檢索後檢測可能的變動。

真實性證明的範例包括：

**傳輸層安全性(TLS) 證明**：言機節點通常使用基於傳輸層安全性（TLS）協議的安全 HTTP 連接從外部來源提取數據。 部分去中心化預言機使用真實性證明來驗證 TLS 會話（即確認節點和特定伺服器之間的資訊交換）並確證會話內容未被修改。

**可信任執行環境（TEE）證明**：[可信任執行環境](https://en.wikipedia.org/wiki/Trusted_execution_environment)（TEE）是一個和主機系統的操作進程隔離的沙盒計算環境。 TEEs 保證了在計算環境中儲存和使用的任何應用程式程式碼或數據都會保持完整性、機密性和不可竄改性。 使用者還可以生成一個證明來證明一個應用程式實例是在可信任執行環境中運行。

某些種類的去中心化預言機要求預言機節點的營運者提供 TEE 證明。 這能向使用者確保節點營運者是在可信任的執行環境中運行預言機用戶端的實例。 TEEs 防止外部進程修改或讀取應用程式的程式碼和數據，因此這些證明可以證實預言機節點有保持資訊的完整性和機密性。

#### 基於共識的資訊驗證 {#consensus-based-validation-of-information}

向智慧型合約提供資料時，中心化預言機依賴於單一真實性來源，因此有可能發佈不準確的資訊。 去中心化預言機借由依靠多個預言機節點來查詢鏈下資訊，來解決這個問題。 通過比對不同來源的資料，去中心化預言機降低了向鏈上合約提供無效資訊的風險。

但是去中化預言機必需處理不同鏈下來源的資訊差異。 為了盡可能減少資訊差異並確保提供給預言機合約的數據反映了預言機節點的集體意見，去中心化預言機使用了以下的機制：

##### 對資料的準確性投票或質押

有部分的去中心化預言機網路要求參與者使用網路的原生代幣對資料查詢答案的準確性進行投票或質押 （例如「誰贏了 2020 年的美國大選？」）。 一個匯總協議會匯總這些投票和質押，並把受到大多數支持的答案作為有效答案。

若節點提供的答案與大多數答案不一致將會受到懲罰，即把他們的代幣分發給其他提供了更正確數值的節點。 要求節點在提供數據前提供擔保可以激勵節點做出誠實的回應，因為這些節點都被認為是想得到最大回報的理性經濟參與者。

質押/投票還保護去中心化預言機免受[女巫攻擊](/glossary/#sybil-attack)，在這種攻擊中，惡意參與者創建多個身份來利用共識系統。 但是，質押無法防範「佔便宜」的行為（預言機節點直接複製其他節點的資訊）和「懶惰驗證」（預言機節點遵循大多數而不親自驗證資訊）。

##### 謝林點機制

[謝林點](https://en.wikipedia.org/wiki/Focal_point_(game_theory))是一個賽局理論的概念，它假設了在缺乏任何溝通的前提下，大多數實體會總是默認為某個問題找到一個共同的解決方案。 謝林點機制常常被用在去中心化預言機網路，讓節點能就數據請求的答案達成共識。

早期的一個想法是 [SchellingCoin](https://blog.ethereum.org/2014/03/28/schellingcoin-a-minimal-trust-universal-data-feed/)，這是一種提議的數據餵送機制，參與者提交對「標量」問題的回答（即答案可以用數量描述的問題，例如「ETH 的價格是多少？」）以及一筆押金。 提供值在第 25 和 第 75 [百分位](https://en.wikipedia.org/wiki/Percentile)之間的使用者會得到獎勵，而提供的值大幅偏離中間值的使用者會得到懲罰。

雖然 SchellingCoin 今天已經不存在，但許多去中心化預言機 - 特別是[ Maker 協議預言機](https://docs.makerdao.com/smart-contract-modules/oracle-module) - 仍使用謝林點機制來提高預言機資料的準確性。 每個 Maker 預言機都由一個鏈下的 P2P 網路的節點（「中繼者」和「餵送者」）組成，這些節點提交抵押資產的市場價格，然後由鏈上的「Medianizer」合約計算所有提供值的中位數。 當指定的延遲期結束，這個中位數值就成為相關資產的新參考價格。

其他使用謝林點機制的預言機範例包括[ Chainlink 鏈下部告](https://docs.chain.link/docs/off-chain-reporting/)和[ Witnet ](https://witnet.io/)。 在這兩個系統中，P2P 網路中的預言機節點回應會聚合成一個單一的聚合值，例如平均值或中間值。 節點將根據其回應與聚合值的一致程度或偏差程度來獲得獎勵或受到懲罰。

謝林點機制會具有吸引力，是因為他們降低了鏈上足跡（只有一筆交易需要被發送）的同時又保證了去中心化。 後者之所以可行，是因為節點需要在提交的回應清單上簽署，才可以將其輸入到生成平均值或中位數的演算法中。

### 可用性 {#availability}

去中心化預言機服務為智慧型合約確保了鏈下數據的高可用性。 這是通過把鏈下資訊來源以及負責將信息傳輸至鏈上的節點同時去中心化來實現。

這確保了容錯能力，因為預言機合約可以依賴多個節點（這些節點也依賴於多個數據來源）來執行其他合約的查詢。 在源頭_和_節點營運者層級的去中心化至關重要—如果一個預言機節點網路提供的資訊來自同一個來源，將會遇到與中心化預言機相同的問題。

基於質押的預言機也可以對未能快速回應資料請求的節點運營者進行懲罰。 這大大激勵了預言機節點投資於容錯基礎設施，並及時提供數據。

### 激勵相容性好 {#good-incentive-compatibility}

去中心化預言機採用了不同的激勵設計來避免預言機節點出現[拜占庭](https://en.wikipedia.org/wiki/Byzantine_fault)行為。 具體來說，它們實現了_可歸因性_和_問責性_：

1. 去中心化預言機節點通常需要為他們對數據請求的回應簽署。 這個資訊有助於評估預言機節點的過往表現，讓使用者可以在提出數據請求時過濾掉不可靠的預言機節點。 例如 Witnet 的[演算法聲譽系統](https://docs.witnet.io/intro/about/architecture#algorithmic-reputation-system)。

2. 正如同前面所說，去中心化預言機可能要求節點對他們提交數據的真實性進行質押。 如果該聲明經過驗證無誤，這筆質押可以連同誠實服務的獎勵一併返還。 但如果資訊不準確，節點也可以被懲罰，這為問責提供了一定的保障。

## 預言機在智慧型合約中的應用 {#applications-of-oracles-in-smart-contracts}

以下是以太坊中預言機的常見用例：

### 檢索金融數據 {#retrieving-financial-data}

[去中心化金融](/defi/)（DeFi）應用程式允許點到點借貸、借款和資產交易。 通常這會需要不同的金融資訊，包括匯率數據（用來計算加密貨幣的法幣價值或比較代幣價格）和資本市場數據（用來計算代幣化資產的價值，例如黃金或美元）。

例如，一個去中心化借貸協議需要查詢作為抵押品存入的資產（例如 ETH）的當前市場價格。 這令合約能確定扺押品的價值，以及確定它能從系統中借出多少。

在 DeFi 中，常見的「價格預言機」包括 Chainlink Price Feeds、Compound 協議的[ Open Price Feed ](https://compound.finance/docs/prices)、Uniswap 的[時間加權平均價格（TWAPs）](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/oracles)以及[ Maker 預言機](https://docs.makerdao.com/smart-contract-modules/oracle-module)。

開發者在將這些價格預言機整合到他們的項目中之前，應該了解相關的注意事項。 這篇[文章](https://blog.openzeppelin.com/secure-smart-contract-guidelines-the-dangers-of-price-oracles/)將詳細分析在計劃使用上述任何價格預言機時需要考慮的因素。

以下是一個在你的智慧型合約中使用 Chainlink price feed 查詢最新 ETH 價格的範例：

```solidity
pragma solidity ^0.6.7;

import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";

contract PriceConsumerV3 {

    AggregatorV3Interface internal priceFeed;

    /**
     * Network: Kovan
     * Aggregator: ETH/USD
     * Address: 0x9326BFA02ADD2366b30bacB125260Af641031331
     */
    constructor() public {
        priceFeed = AggregatorV3Interface(0x9326BFA02ADD2366b30bacB125260Af641031331);
    }

    /**
     * Returns the latest price
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

### 生成可以驗證的隨機性 {#generating-verifiable-randomness}

某些區塊鏈應用程式，例如基於區塊鏈的遊戲或彩劵方案，需要高度不可預測性和隨機性才能有效運作。 但是，區塊鏈的確定性執行方式消除了任何隨機性。

最初的方法是使用偽隨機加密函數，如 `blockhash`，但這些函數可能會被工作量證明算法的[礦工操縱](https://ethereum.stackexchange.com/questions/3140/risk-of-using-blockhash-other-miners-preventing-attack#:~:text=So%20while%20the%20miners%20can,to%20one%20of%20the%20players.)。 同時，以太坊[切換到權益證明](/roadmap/merge/)意味著開發者無法再依賴` blockhash `來獲得鏈上隨機性。 信標鏈的[ RANDAO 機制](https://eth2book.info/altair/part2/building_blocks/randomness)提供了一種替代的隨機性來源。

從鏈下生成隨機值並發往鏈上是可行的，但這會需要對使用者有很高的信任要求。 他們必須相信這個值確實是通過無法預測的機制來生成，而且沒有在傳輸的過程中被修改。

專為鏈下計算而設計的預言機解決了這個問題，它們通過在鏈下安全地生成隨機結果，並將結果與證明過程的不可預測性密碼學證明一起廣播到鏈上。 [Chainlink VRF ](https://docs.chain.link/docs/chainlink-vrf/)（Verifiable Random Function）便是其中一個範例，它是一個可證明公平性且防竄改的隨機數生成器 （RNG），用於為依靠不可預測結果的應用程式構建可靠的智慧型合約。 另一個範例是 API3 QRNG，它提供基於量子現象的量子隨機數生成（QRNG），這是由澳大利亞國立大學（ANU）提供的一種公共 Web3 隨機數生成方法。

### 取得事件結果 {#getting-outcomes-for-events}

有了預言機後，創建能對現實世界事件做出反應的智慧型合約變得簡單。 預言機服務通過允許合約通過鏈下組件連結到外部 APIs 並從這些數據來源中獲取資訊，來讓這變得可能。 例如，前面提到的預測 dApp 可能會請求預言機從可信的鏈下來源（例如美聯社）返回選舉結果。

使用預言機來檢索基於現實世界結果的數據，使其他創新的應用場景變為可能；例如一個去中心化的保險產品需要準確的天氣、災害等資訊才能有效運作。

### 自動化智慧型合約 {#automating-smart-contracts}

智慧型合約不會自動運行；而是必須由一個外部帳戶 （EOA）或其他合約帳戶觸發相應的函數來執行合約程式碼。 在大多數情況下，合約的大部分函數都是公開且能被 EOA 和其他合約調用。

但合約中也有一些_私有函數_，這些函數對其他人不可訪問，但對 dApp 的整體功能至關重要。 例如一個定期鑄造新 NFT 給使用者的` mintERC721Token() `函數、預期市場中支付獎金的函數或在 DEX 中解鎖質押代幣的函數。

開發者會需要定期觸發這些函數來讓應用程式順暢運行。 但是，這可能會讓開發者浪費更多時間在這些日常任務，這便是為甚麼自動化執行智慧型合約如此具吸引力。

部分去中心化預言機網路提供自動化服務，允許鏈下預言機節點按照使用者定義的參數來觸發智慧型合約的函數。 通常來說，這會需要把目標合約「登記」在預言機服務上，提供資金以支付預言機營運者的費用，以及定義好合約的觸發條件或時間。

Chainlink 的[ Keeper Network ](https://chain.link/keepers) 向智慧型合約提供了以最小信任和去中心化的方式外包定期維護任務的選項。 請參閱這份官方的[ Keeper 文檔](https://docs.chain.link/docs/chainlink-keepers/introduction/)，了解如何使您的合約兼容 Keeper 以及如何使用 Upkeep 服務。

## 如何使用區塊鏈預言機 {#use-blockchain-oracles}

你可以將多個預言機應用程式整合到你的以太坊去中心化應用程式中：

**[Chainlink](https://chain.link/)** - _Chainlink 去中心化預言機網路提供防篡改的輸入、輸出和運算，以支援任何區塊鏈上的高級智慧型合約。_

**[Chronicle](https://chroniclelabs.org/)** - _ Chronicle 通過開發真正可擴展、成本高效、去中心化且可驗證的預言機，克服了當前將數據傳輸到鏈上的限制。_

**[Witnet](https://witnet.io/)** - _Witnet 是一個無許可、去中心化且抗審查的預言機，協助智慧型合約以強大的加密經濟保證來對現實世界事件做出反應。_

**[UMA 預言機](https://uma.xyz)** - _UMA 的樂觀預言機允許智慧型合約快速接收各種應用程式所需要的任何類型數據，包括保險、金融衍生品和預期市場。_

**[Tellor](https://tellor.io/)** - _Tellor 是一個透明且無許可的預言機協議，使你的智慧型合約能夠隨時輕鬆獲取任何數據。_

**[Band Protocol](https://bandprotocol.com/)** - _Band Protocol 是一個跨鏈數據預言機平台，將現實世界的數據和 API 聚合並連結到智慧型合約中。</p>

**[Paralink](https://paralink.network/)** - _Paralink 向在以太坊和其他流行區塊鏈上運行的智慧型合約提供了一個開源且去中心化的預言機平台。</p>

**[Pyth Network](https://pyth.network/)** - _Pyth network 是一個第一方金融預言機網路，旨在於一個防竄改、去中心化、且能自給自足的環境中，持續發佈真實世界的資料到鏈上。_

**[API3 DAO](https://www.api3.org/)** - _API3 DAO 提供第一方預言機解決方案，為智慧型合約提供更高的來源透明度、安全性和可擴展性的去中心化解決方案。_

**[Supra](https://supra.com/)** - 一個垂直整合的跨鏈解決方案工具包，將所有區塊鏈（無論是公共的 L1 和 L2 還是私有的企業區塊鏈）相互連結，提供可用於鏈上和鏈下應用場景的去中心化預言機價格餵送。

## 延伸閱讀 {#further-reading}

**文章**

- [什麼是區塊鏈預言機？](https://chain.link/education/blockchain-oracles) — _Chainlink_
- [什麼是區塊鏈預言機？](https://betterprogramming.pub/what-is-a-blockchain-oracle-f5ccab8dbd72) - _Patrick Collins_
- [去中心化預言機：綜合概述 ](https://medium.com/fabric-ventures/decentralised-oracles-a-comprehensive-overview-d3168b9a8841) – _Julien Thevenard_
- [在以太坊實踐區塊鏈預言機](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) – _Pedro Costa_
- [為何智慧型合約無法調用APIs?](https://ethereum.stackexchange.com/questions/301/why-cant-contracts-make-api-calls) - _StackExchange_
- [為何我們需要去中心化預言機](https://newsletter.banklesshq.com/p/why-we-need-decentralized-oracles) - _Bankless_
- [所以你想使用價格預言機](https://samczsun.com/so-you-want-to-use-a-price-oracle/) -_samczsun_

**影片**

- [預言機擴張區塊鏈用途](https://youtu.be/BVUZpWa8vpw) - _Real Vision Finance_
- [第一方與第三方預言機的差別](https://blockchainoraclesummit.io/first-party-vs-third-party-oracles/) - _Blockchain Oracle Summit_

**教學**

- [如何用Solidity於以太坊調用目前報價](https://blog.chain.link/fetch-current-crypto-price-data-solidity/) - _Chainlink_
- [如何使用預言機數據](https://docs.chroniclelabs.org/Developers/tutorials/Remix) - _Chronicle_

**專案範例**

- [使用 solidity 的以太坊完整 Chainlink 入門項目](https://github.com/hackbg/chainlink-fullstack) - _HackBG_
