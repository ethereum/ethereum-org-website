---
title: 以太坊詞彙表
description: 與以太坊相關的技術和非技術術語不完全清單
lang: zh-tw
sidebarDepth: 2
---

# 詞彙表 {#ethereum-glossary}

<Divider />

## \# {#section-numbers}

### 51% 攻擊 {#51-attack}

一種對去中心化[網路](#network)的攻擊方式，一個群體獲得了大多數[節點](#node)的控制權。 這將使他們能夠透過逆轉[交易](#transaction)和加倍花費 [ETH](#ether) 和其他 token 來欺詐區塊鏈。

## A {#section-a}

### 帳戶 {#account}

帳戶是一個對象，它包含[地址](#address)、餘額、[隨機數](#nonce)，並且儲存了狀態和代碼（皆可為空）。 一個帳戶可以是[合約帳戶](#contract-account)，也可以是[外部帳戶（EOA）](#eoa)。

<DocLink to="/developers/docs/accounts">
   以太坊帳戶
</DocLink>

### 位址 {#address}

廣義上講，地址代表可以在區塊鏈上接收（目標位址）或發送（來源位址）[交易](#transaction)的[外部帳戶](#eoa)或[合約帳戶](#contract-account) 。 更具體地說，它是 [ECDSA](#ecdsa) 的 [Keccak 雜湊值](#keccak-256)[公鑰](#public-key)的最右邊 160 位元。

### 應用程式二進位介面 (ABI) {#abi}

與以太坊生態系中[合約](#contract-account)互動的標準方法，皆來自區塊鏈外部，用於合約間互動。

<DocLink to="/developers/docs/smart-contracts/compiling/#web-applications">
   應用程式二進位接口
</DocLink>

### 應用程式介面 {#api}

應用程式介面 (API) 是關於如何使用軟體的一組定義。 應用程式介面位於應用程式和 Web 伺服器之間，有助於它們之間資料的傳輸。

### 專用積體電路 {#asic}

專用積體電路。 這通常指為加密貨幣挖礦定制的一種積體電路。

### 斷言 {#assert}

在 [Solidity 語言裡](#solidity)，`assert(false)` 被編譯為 `0xfe`，這是一個無效操作碼，會消耗完剩下的[燃料](#gas)並回滾所有變更。 當有 `assert()` 語句失效時，表示出現了非常嚴重且沒有預料到的問題，你將需要修復程式碼。 應該使用 `assert()` 以避免此類永遠不應發生的情況。

<DocLink to="/developers/docs/smart-contracts/security/">
   智能合約安全性
</DocLink>

### 認證 {#attestation}

實體所做的關於某事件屬實的聲明。 就以太坊而言，共識驗證者必須對他們認為的鏈狀態做出聲明。 在指定時間，每個驗證者負責發布不同的認證，正式聲明自己對於鏈的看法，包括最後一個最終確定的檢查點和最新的區塊頭。

<DocLink to="/developers/docs/consensus-mechanisms/pos/attestations/">
   認證
</DocLink>

<Divider />

## B {#section-b}

### 基礎費 {#base-fee}

每個[區塊](#block)都有一個稱為「基礎費」的底價。 用戶必須支付此最低[燃料](#gas)費用，交易才能打包進入下一個區塊。

<DocLink to="/developers/docs/gas/">
   燃料和費用
</DocLink>

### 信標鏈 {#beacon-chain}

信標鏈是為以太坊引入[權益證明](#pos)和[驗證者](#validator)的區塊鏈。 從 2020 年 12 月開始，它與採用工作量證明的以太坊主網一起運行，直到 2022 年 9 月這兩條鏈合併，形成了今天的以太坊。

<DocLink to="/roadmap/beacon-chain/">
   信標鏈
</DocLink>

### 大端序 {#big-endian}

一種按位元計數的表示方式，其中高位元組保存在記憶體的低位元位址中。 與之相反的是小端序，即低位元組保存在記憶體的低位元位址中。

### 區塊 {#block}

區塊是一個匯總的資訊單位，包括有序的交易清單及與共識相關的資訊。 區塊由權益證明驗證者提出，然後它們在整個對等網路中共享，所有其他節點可以在對等網路中方便地對區塊進行獨立驗證。 共識規則控制區塊的哪些內容是有效的，任何無效的區塊都會被網路忽略。 這些區塊的順序和其中的交易創建了一條確定性的事件鏈，鏈條的一端表示網路的當前狀態。

<DocLink to="/developers/docs/blocks/">
   區塊
</DocLink>

### 區塊瀏覽器 {#block-explorer}

一個介面，供用戶搜尋來自和有關區塊鏈的信息， 包括檢索個人交易、與特定地址相關的活動，以及有關網絡的信息。

### 區塊頭 {#block-header}

區塊頭是一個包含區塊本身以及區塊內包含的交易摘要的元資料集合。

### 區塊傳播 {#block-propagation}

將經確認的區塊傳遞到網路中所有其他節點的過程。

### 區塊提議者 {#block-proposer}

被選中在特定[時隙](#slot)內創建一個區塊的特定驗證者。

### 區塊獎勵 {#block-reward}

獎勵給提出新有效區塊的提議者一定數量的以太幣。

### 區塊狀態 {#block-status}

區塊可以處於的狀態。 可能的狀態包括：

- 被提議：區塊被一個驗證者提議
- 被提上日程：驗證者正在提交數據
- 被錯過/跳過：提議者沒有在有效的時間範圍內提議一個區塊
- 孤立：區塊被[分叉選擇演算法](#fork-choice-algorithm)移出。

### 區塊時間 {#block-time}

相鄰兩個區塊被加入區塊鏈的時間間隔。

### 區塊驗證 {#block-validation}

檢查新區塊是否包含有效的交易和簽名，是否處於最長合法鏈上並遵循所有其他共識規則的過程。 有效區塊添加到區塊鏈末端，並傳播到網路上的其他節點。 無效區塊被忽略。

### 區塊鏈 {#blockchain}

一個[區塊](#block)序列，每個都透過引用前一個區塊的哈希值連結到前一個區塊，一直到[創世區塊](#genesis-block)。 區塊鏈的完整性由基於權益證明共識機制透過經濟的加密方式提供保證。

<DocLink to="/developers/docs/intro-to-ethereum#what-is-a-blockchain">
   什麼是區塊鏈？
</DocLink>

### 引導節點 {#bootnode}

可以在運行節點時用來啟動發現過程的節點。 這些節點的端點記錄在以太坊原始碼中。

### 字節碼 {#bytecode}

由軟體解釋程式或虛擬機器為實現高效執行而設計的抽象指令集。 與人類可讀原始碼不同，字節碼以數字格式表示。

### 拜占庭分叉 {#byzantium-fork}

[大都會](#hard-fork)開發階段的頭兩次[硬分叉](#metropolis)。 拜占庭分叉包含了EIP-649 大都市[難度炸彈](#difficulty-bomb)延遲和區塊獎勵減額，其中，[冰河世紀](#ice-age)被延遲了1 年，區塊獎勵從 5 個以太幣減少為3 個。

<Divider />

## C {#section-c}

### Casper-FFG {#casper-ffg}

Casper-FFG 是一種權益證明共識協議，與[LMD-GHOST](#lmd-ghost) 分叉選擇演算法一起使用，使[共識客戶端](#consensus-client)能夠就信標鏈頭達成協議 。

### 檢查點 {#checkpoint}

[信標鏈](#beacon-chain)的節奏分為時隙（12 秒）和時段（32 個時隙）， 每個時段的第一個時隙即為檢查點。 當[絕大多數](#supermajority)驗證者對兩個檢查點之間的聯繫加以證明時，即可認為這兩個檢查點[合理](#justification)。 之後，當另一個檢查點也被認為合理後，就可以[最終確定](#finality)這些檢查點。

### 編譯 {#compiling}

將以高階程式語言（例如，[Solidity](#solidity)）編寫的程式碼轉換為低階語言（例如，以太坊虛擬機器[字節碼](#bytecode)）。

<DocLink to="/developers/docs/smart-contracts/compiling/">
   編譯智能合約
</DocLink>

### 委員會 {#committee}

在每個時隙中被分配用於驗證區塊的一組[驗證者](#validator)（至少 128 個）。 委員會中的驗證者之一是聚合者，負責聚合委員會中所有其他同意某項認證的驗證者的簽名。 不要與[同步委員會](#sync-committee)混淆。

### 計算不可行 {#computational-infeasibility}

如果一個流程對任何可能有興趣實施它的人來說需要不切實際的漫長時間（例如數十億年），那麼這個過程在計算上就是不可行的。

### 共識 {#consensus}

當網路中絕大多數節點經本地驗證的最長區塊鏈都具有相同的區塊時，稱為共識。 請勿與[共識機制](#consensus-rules)混淆。

### 共識客戶端 {#consensus-client}

共識客戶端（例如 Prysm、Teku、Nimbus、Lighthouse、Lodestar）運行以太坊的[權益證明](#pos)共識演算法，使網路能夠就信標鏈頭達成協議。 共識客戶端不參與驗證/廣播交易或執行狀態轉換。 這些操作由[執行客戶端](#execution-client)完成。

### 共識層 {#consensus-layer}

以太坊的共識層是[共識客戶端](#consensus-client)網路。

### 共識機制 {#consensus-rules}

全節點遵循的與其他節點保持共識的區塊驗證規則。 請勿與[共識](#consensus)混淆。

### 考慮納入名單 (CFI) {#cfi}

一個尚未在主網上啟動的核心[以太坊改進提案](#eip)，客戶端開發者普遍對這個想法持正面態度。 假設滿足納入主網的所有要求，該提案可能會納入網路升級（不一定是下一次升級）。

### 君士坦丁堡分叉 {#constantinople-fork}

這是[大都會](#metropolis)階段的第二部分，最初計劃在 2018 年年中進行。 除了其他變更以外，預計還包含過渡到[工作量證明](#pow)/[權益證明](#pos)混合共識演算法。

### 合約帳戶 {#contract-account}

一個包含程式碼的帳戶，只要接收到來自其他[帳戶](#account)（[外部帳戶](#eoa)或[合約帳戶](#contract-account)）的[交易](#transaction)，就會 執行該程式碼。

### 合約建立交易 {#contract-creation-transaction}

一個包含合約的啟動程式碼的特殊[交易](#transaction)。 接收位址設定為 `null`，合約部署到由使用者位址和 `nonce` 產生的位址。 隨機數用於註冊[合約](#contract-account)並將其記錄在以太坊區塊鏈上。

### 加密經濟學 {#cryptoeconomics}

加密貨幣經濟學。

## D {#section-d}

### Đ {#d-with-stroke}

Đ（D 加一筆）在古英語、中世紀英語、冰島語和法羅語代表大寫字母「Eth」。 Đ 用於 ĐEV 或 Đapp（去中心化應用程式）等詞，其中 Đ 是古挪威語字母「eth」。 大寫的 eth (Ð) 也用來表示加密貨幣狗狗幣。 這種用法在較早的以太坊文獻中很常見，但如今很少使用。

### 有向無環圖 {#dag}

DAG 代表有向無環圖。 它是由節點和節點之間的連結所組成的一種資料結構。 在合併之前，以太坊在其[工作量證明](#pow)演算法、[Ethash](#ethash) 演算法中使用了有向無環圖，但在[權益證明](#pos)中不再使用 。

### 去中心化應用程式 {#dapp}

Dapp 代表去中心化應用程式。 狹義上來說，去中心化應用程式是一個[智能合約](#smart-contract)，也是一個 Web 使用者介面。 廣義來說，它是建立在開放、去中心化、對等基礎設施服務之上的 Web 應用程式。 此外，許多去中心化應用程式包括去中心化儲存和/或封包協議及平台。

<DocLink to="/developers/docs/dapps/">
   去中心化應用程式簡介
</DocLink>

### 資料可用性 {#data-availability}

一種狀態屬性，任何連接到網路的節點都可以下載它們所期望狀態的任何特定部分。

### 去中心化 {#decentralization}

取消由中心實體控制和執行流程的概念。

### 去中心化自治組織 (DAO) {#dao}

不採用分級管理營運的公司或其他組織。 DAO 也可能指一份名為「The DAO」的合約。 該合約在 2016 年 4 月 30 日發布，後來在 2016 年 6 月遭受駭客攻擊；這件事最終在 1,192,000 區塊引發了一次[硬分叉](#hard-fork)（代碼名稱為 DAO）。 此次分叉逆轉了遭受駭客攻擊的 DAO 合約，並導致分為以太坊和以太坊經典兩個互相競爭的系統。

<DocLink to="/dao/">
   去中心化自治組織 (DAO)
</DocLink>

### 去中心化交易所 (DEX) {#dex}

一種[去中心化應用程式](#dapp)，讓人們可以在網路上交換代幣。 你需要有[以太幣](#ether)才能使用去中心化交易所（以支付[交易費](#transaction-fee)），但它們不像中心化交易所那樣受地理區域限制，而是任何 人都可以參與。

<DocLink to="/get-eth/#dex">
   去中心化交易所
</DocLink>

### 契約 {#deed}

請參閱[非同質化代幣 (NFT)](#nft)。

### 存款合約 {#deposit-contract}

在以太坊上進行質押的方式。 存款合約是以太坊上的智慧合約，它接受以太幣存款並管理驗證者餘額。 如果不將以太幣存入存款合約，驗證者便無法啟動。 合約需要提供以太幣和輸入資料。 這些輸入資料包括由驗證者私鑰簽署的驗證者公鑰和提款公鑰。 [權益證明](#pos)網路需要這些資料來識別和批准驗證者。

### 去中心化金融 (DeFi) {#defi}

DeFi 是「去中心化金融」的縮寫，是一類廣義的[去中心化應用程式](#dapp)，旨在提供由區塊鏈支援的金融服務，無需中介，任何人只需要網路連線就 可以參與。

<DocLink to="/defi/">
   去中心化金融 (DeFi)
</DocLink>

### 難度 {#difficulty}

[工作量證明](#pow)網路中的全網路設置，用於控制找到有效隨機數隨機數所需的平均計算量。 難度由產生的區塊哈希中成為有效哈希需要的前導零的數量表示。 自權益證明過渡後，這個概念在以太坊中棄用。

### 難度炸彈 {#difficulty-bomb}

計劃的使[工作量證明](#pow)[難度](#difficulty)呈指數級增長的設置，旨在促進向[權益證明](#pos)的過渡，並減少發生[分叉](# hard-fork)的幾率。 難度炸彈在[過渡到權益證明](/roadmap/merge)時棄用。

### 數位簽章 {#digital-signatures}

使用者使用[私鑰](#private-key)為文件產生的一串短數據，這樣任何有對應[公鑰](#public-key)、簽名和文件的人都能驗證(1) 文件由該 特定私鑰的所有者“簽名”，以及(2) 文件在簽名後未被更改。

<Divider />

### 發現 {#discovery}

以太坊節點尋找其他要連接的節點的過程。

### 分散式雜湊表 (DHT) {#distributed-hash-table}

包含 `(key, value)` 對的資料結構，以太坊節點使用該結構識別要連接的對等節點，並確定使用哪些協定進行通訊。

### 雙花 {#double-spend}

一個蓄意的區塊鏈分叉，其中擁有足夠多挖礦算力/質押份額的用戶發送一個將一些貨幣轉移到鏈下的交易（例如兌換為法幣或進行鏈下購買），然後重組區塊鏈 以刪除該交易。 成功的雙花讓攻擊者同時擁有鏈上和鏈下資產。

## E {#section-e}

### 橢圓曲線數位簽章演算法 (ECDSA) {#ecdsa}

以太坊使用的一種加密演算法，用於確保資金只能由其所有者使用， 是創建公鑰和私鑰的首選方法。 此演算法與帳戶[地址](#address)產生和[交易](#transaction)驗證有關。

### 加密 {#encryption}

加密是指將電子資料轉換為除正確的解密金鑰所有者以外，任何人都無法讀取的形式。

### 熵 {#entropy}

在加密學範疇裡，熵是指缺乏可預測性或隨機性程度。 在產生金鑰訊息，例如[私密金鑰](#private-key)時，演算法經常需要依賴提供高熵的信源，以確保其輸出不可預測。

### 時段 {#epoch}

32 個[時隙](#slot)為一個時段，每個時隙為 12 秒，共 6.4 分鐘。 出於安全原因，在每個時段驗證者[委員會](#committee)都會被重組。 每個時段都提供[最終確定](#finality)鏈的機會。 每個時段開始時都會給每個驗證者新的職責。

<DocLink to="/developers/docs/consensus-mechanisms/pos/#how-does-validation-work">
   權益證明
</DocLink>

### 模稜兩可 {#equivocation}

驗證者發送兩個相互矛盾的訊息的情況。 一個簡單的例子是交易發送者發送兩筆具有相同隨機數的交易。 另一個例子是區塊提議者在相同的區塊高度（或為相同的時隙）提出兩個區塊。

### 以太坊 1 {#eth1}

「以太坊 1」是指主網以太坊，即現有的工作量證明區塊鏈。 該術語已棄用，取而代之的是“執行層”。 [詳細了解此名稱變更](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/)。

<DocLink to="/roadmap/">
   有關以太坊升級的更多信息
</DocLink>

### 以太坊 2 {#eth2}

「以太坊 2」是指以太坊協議的一系列升級，包括以太坊的權益證明過渡。 該術語已棄用，取而代之的是“共識層”。 [詳細了解此名稱變更](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/)。

<DocLink to="/roadmap/">
   有關以太坊升級的更多信息
</DocLink>

### 以太坊改進提案 (EIP) {#eip}

為以太坊社群提供資訊的一種設計文檔，描述提議的新功能或其流程或環境（請參閱[以太坊意見徵求](#erc)）。

<DocLink to="/eips/">
   以太坊改善提案介紹
</DocLink>

### 以太坊網域服務 (ENS) {#ens}

以太坊網域服務註冊表是一個中心[合約](#smart-contract)，提供從網域到所有者和解析器的映射，如 [EIP](#eip) 137 所述。

[更多資訊請參考 ens.domains](https://ens.domains)

### 執行客戶端 {#execution-client}

執行客戶端（以前稱為「以太坊 1 用戶端」），例如 Besu、Erigon、Go-Ethereum(Geth)、Nethermind，負責處理和廣播交易並管理以太坊的狀態。 它們使用[以太坊虛擬機器](#evm)為每筆交易運行計算，以確保遵守協議的規則。

### 執行層 {#execution-layer}

以太坊的執行層是[執行客戶端](#execution-client)網路。

### 外部帳戶 (EOA) {#eoa}

外部帳戶 (EOA) 是由[私鑰](#private-key)控制的[帳戶](#account)，通常使用[助記詞](#hd-wallet-seed)產生。 與智能合約不同，外部帳戶是不與任何代碼關聯的帳戶。 通常，這些帳戶會用[錢包](#wallet)進行管理。

### 以太坊意見徵求 (ERC) {#erc}

一種標籤，應用於一些試圖定義以太坊具體使用標準的[以太坊改進提案](#eip)。

<DocLink to="/eips/">
   以太坊改善提案介紹
</DocLink>

### Ethash {#ethash}

在以太坊過渡到[權益證明](#pos)之前在以太坊上使用的一種[工作量證明](#pow)演算法。

[了解更多](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash)

### 以太幣 {#ether}

以太坊生態系中使用的原生加密貨幣，用來支付執行交易時的[燃料](#gas)費用。 以太幣也寫 ETH 或符號形式 Ξ，這是希臘字母 Xi 的大寫。

<DocLink to="/eth/">
   我們數位未來的貨幣
</DocLink>

### 事件 {#events}

允許使用[以太坊虛擬機器](#evm)日誌記錄工具。 [去中心化應用程式](#dapp)可以監聽事件，並在使用者介面使用事件觸發 JavaScript 回呼。

<DocLink to="/developers/docs/smart-contracts/anatomy/#events-and-logs">
   事件和日誌
</DocLink>

### 以太坊虛擬機器 (EVM) {#evm}

執行[字節碼](#bytecode)的基於堆疊的虛擬機器。 在以太坊中，執行模型指定如何在給定一系列字節碼指令和一個包含環境資料小元組的情況下變更系統狀態。 透過虛擬狀態機的形式化模型指定係統狀態變更方式。

<DocLink to="/developers/docs/evm/">
   以太坊虛擬機
</DocLink>

### 以太坊虛擬機器組合語言 {#evm-assembly-language}

一種人類可讀形式的以太坊虛擬機器[字節碼](#bytecode)。

<Divider/>

## F {#section-f}

### 回退函數 {#fallback-function}

在缺失資料或無法匹配函數名稱時呼叫的預設函數。

### 水龍頭 {#faucet}

透過[智能合約](#smart-contract)執行的服務，免費提供可在測試網路上使用的測試以太幣。

<DocLink to="/developers/docs/networks/#testnet-faucets">
   測試網水龍頭
</DocLink>

### 最終確定性 {#finality}

最終確定性是在給定時間之前，一組交易不會變更且無法回滾的保證。

<DocLink to="/developers/docs/consensus-mechanisms/pos/#finality">
   權益證明最終確定性
</DocLink>

### Finney {#finney}

[以太幣](#ether)的一種計量單位。 1 finney = 10<sup>15</sup> [wei](#wei)。 10<sup>3</sup> finney = 1 個以太幣。

### 分叉 {#fork}

由於協議更改而引發另一條鏈的生成，或由於時間差異而產生兩條潛在的區塊路徑。

### 分叉選擇演算法 {#fork-choice-algorithm}

用於識別區塊鏈頭的演算法。 在執行層，鏈頭為其後總難度最大的一個區塊。 這意味著真正的鏈頭是需要最大的工作量才能開採的區塊。 在共識層，演算法觀察來自驗證者的累積認證 ([LMD_GHOST](#lmd-ghost))。

### 詐欺證明 {#fraud-proof}

一些[二層網路](#layer-2)解決方案的安全模型。 為了加快交易速度，交易成批[卷疊](#rollups)並在單筆交易中提交給以太坊。 交易假定有效，但如果懷疑有欺詐行為，可以對它們提出質疑。 之後，詐欺證明會運行交易，以確定是否發生詐欺。 這種方法可增加交易量，同時確保安全性。 部分[卷疊](#rollups)採用[有效性證明](#validity-proof)。

<DocLink to="/developers/docs/scaling/optimistic-rollups/">
   樂觀卷疊
</DocLink>

### 邊境 {#frontier}

以太坊的初步測試開發階段，從 2015 年 7 月持續到 2016 年 3 月。

<Divider />

## G {#section-g}

### 燃料 {#gas}

以太坊中為執行智慧合約所消耗的虛擬「燃料」。 [以太坊虛擬機器](#evm)使用一種記帳方法來衡量燃料用量並限制算力資源的消耗（請參閱[圖靈完備](#turing-complete)）。

<DocLink to="/developers/docs/gas/">
   燃料和費用
</DocLink>

### 燃料限制 {#gas-limit}

一筆[交易](#transaction)或一個[區塊](#block)能消耗的最大[燃料](#gas)量。

### 燃料價格 {#gas-price}

交易中指定的一單位燃料的價格，以以太幣計價。

### 創世區塊 {#genesis-block}

[區塊鏈](#blockchain)上第一個區塊，用於初始化特定的網路及其加密貨幣。

### Geth {#geth}

Go Ethereum， 以太坊協議最重要的實作之一，使用 Go 語言編寫。

[更多資訊請參考 geth.ethereum.org](https://geth.ethereum.org/)

### gwei {#gwei}

Gigawei 的縮寫，[以太幣](#ether)的一種計量單位，通常用於[燃料](#gas)價格。 1 gwei = 10<sup>9</sup> [wei](#wei)。 10<sup>9</sup> gwei = 1 個以太幣。

<Divider />

## H {#section-h}

### 硬分叉 {#hard-fork}

[區塊鏈](#blockchain)中的永久性分叉，硬分叉也稱為硬分叉變化。 當未升級節點無法驗證遵循更新[共識機制](#consensus-rules)的已升級節點所創建的區塊時，通常會發生硬分叉。 請勿與分叉、軟分叉、軟體分叉或 Git 分叉混淆。

### 雜湊值 {#hash}

可變長度輸入的固定長度的指紋，由雜湊函數產生。 （請參閱 [keccak-256](#keccak-256)）。

### 哈希率 {#hash-rate}

運行挖礦軟體的電腦每秒進行的哈希計算次數。

### 身分錢包 {#hd-wallet}

使用分層確定性金鑰建立方式和轉帳協定的[錢包](#wallet)。

[更多資訊請上 github.com](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)

### 身分錢包種子 {#hd-wallet-seed}

用來產生身分[錢包](#wallet)中主[私鑰](#private-key)與主鏈碼的值。 錢包種子可以用助記詞表示，方便大家複製、備份、恢復私鑰。

### 家園 {#homestead}

以太坊的第二個開發階段，於 2016 年 3 月在 1,150,000 區塊上啟動。

<Divider />

## I {#section-i}

### 索引 {#index}

一種網路結構，旨在透過提供資訊儲存來源的有效路徑來優化整個[區塊鏈](#blockchain)資訊的查詢。

### 可交換客戶端位址協定 (ICAP) {#icap}

以太坊地址編碼，與國際銀行帳號 (IBAN) 編碼部分相容，為以太坊地址提供經過校驗、可互通的多用途編碼。 可交換客戶端位址協定位址使用一個新的 IBAN 偽國家代碼 XE，全名為“eXended Ethereum”，例如非管轄貨幣中的 X（如 XBT、XRP、XCP）。

### 冰河世紀 {#ice-age}

以太坊區塊200,000 處的[硬分叉](#hard-fork)，帶來了指數級[難度](#difficulty)增加（又稱為[難度炸彈](#difficulty-bomb)），促進以太 坊的[權益證明](#pos)過渡。

### 整合開發環境 (IDE) {#ide}

通常將程式碼編輯器、編譯器、執行時間和偵錯器合併在一起的使用者介面。

<DocLink to="/developers/docs/ides/">
   整合開發環境
</DocLink>

### 部署程式碼無法改變問題 {#immutable-deployed-code-problem}

[合約](#smart-contract)（或[庫](#library)）的程式碼一經部署，便不可更改。 標準軟體開發習慣於能夠修復可能的缺陷並增加新功能，但這對智慧合約開發而言是一個挑戰。

<DocLink to="/developers/docs/smart-contracts/deploying/">
   部署智能合約
</DocLink>

### 內部交易 {#internal-transaction}

從一個[合約帳戶](#contract-account)發送到另一個合約帳戶或[外部帳戶](#eoa)的[交易](#transaction)（請參閱[資訊](#message)）。

<Divider />

### 發行

鑄造新的以太幣以獎勵區塊提出、證明和舉報。

## K {#section-k}

### 金鑰匯出函數 (KDF) {#kdf}

也稱為“密碼拉伸演算法”。 [金鑰庫](#keystore-file)格式使用該演算法，透過對密碼重複進行雜湊運算，防止針對密碼加密的暴力攻擊、字典攻擊和彩虹表攻擊。

<DocLink to="/developers/docs/smart-contracts/security/">
   智能合約安全性
</DocLink>

### 金鑰庫 {#keyfile}

每個帳戶的私鑰/地址對作為單一金鑰檔案存在於以太坊客戶端。 這些是 JSON 文字文件，其中包含帳戶的加密私鑰，只能使用在帳戶建立期間輸入的密碼進行解密。

### keccak-256 {#keccak-256}

以太坊中使用的加密[哈希](#hash)函數。 [SHA](#sha)-3 是從 Keccak-256 規範演化而來。

<Divider />

## L {#section-l}

### 第二層 {#layer-2}

一個開發領域，專注於以太坊協議上的分層改進。 這些改進關係到[交易](#transaction)速度、[交易費](#transaction-fee)的削減以及交易隱私。

<DocLink to="/layer-2/">
   二層網路
</DocLink>

### LevelDB {#level-db}

開源的輕量級單用途硬碟鍵值對儲存[庫](#library)，可以綁定到多個平台。

### 函式庫 {#library}

一種特殊類型的[合約](#smart-contract)，沒有可支付函數，沒有回退函數，也沒有資料儲存。 因此，它不能接收或保存以太幣，也不能儲存資料。 函式庫可用作先前部署的程式碼，其他合約只能進行唯讀調用，以用於計算。

<DocLink to="/developers/docs/smart-contracts/libraries/">
   智能合約庫
</DocLink>

### 輕客戶端 {#light-client}

一種以太坊客戶端，不儲存[區塊鏈](#blockchain)的本地副本，也不驗證區塊和[交易](#transaction)。 它提供[錢包](#wallet)的功能，可以創建和廣播交易。

<Divider />

### LMD_GHOST {#lmd-ghost}

以太坊共識客戶端用於識別鏈頭的[分叉選擇演算法](#fork-choice-algorithm)。 LMD-GHOST 是「Latest Message Driven Greediest Heaviest Observed SubTree」（最新資訊驅動的最貪婪、最重的被觀察子樹）的首字母縮寫，這意味著鏈頭是其創建以來[認證](#attestation) 累積最多的區塊。

## M {#section-m}

### 主網 {#mainnet}

"main network"（主網）的縮寫，是主要的公共以太坊[區塊鏈](#blockchain)。 它具有真正的以太幣、真正的價值和真正的共識。 在討論[二層網路](#layer-2)擴容解決方案時，主網也被稱為一層網路。 （另請參閱[測試網](#testnet)）。

<DocLink to="/developers/docs/networks/">
   以太坊網絡
</DocLink>

### 記憶體困難 {#memory-hard}

記憶體困難函數是指當可用記憶體量稍微減少時，速度或可行性急遽下降的過程， 以太坊挖礦演算法 [Ethash](#ethash) 就是一個例子。

### 梅克爾帕特里夏樹 {#merkle-patricia-tree}

以太坊用於有效儲存鍵值對的資料結構。

### 訊息 {#message}

一種[內部交易](#internal-transaction)，永遠不會被序列化，且僅在[以太坊虛擬機器](#evm)內部發送。

### 訊息呼叫 {#message-call}

將[訊息](#message)從一個帳戶傳遞到另一個帳戶的行為。 如果目標帳戶與[以太坊虛擬機](#evm)代碼相關聯，虛擬機將從該物件的狀態和要依據其執行動作的資訊開始。

### 大都會 {#metropolis}

以太坊的第三個開發階段，於 2017 年 10 月啟動。

### 挖礦 {#mining}

當增加[隨機數](#nonce)時對區塊頭執行哈希運算，一直重複這個過程，直到結果包含任意數量的前導二進制零。 這就是將新[區塊](#block)加入工作量證明[區塊鏈](#blockchain)的過程。 這是以太坊在遷移到[權益證明](#pos)之前用來保障安全的方法。

### 礦工 {#miner}

透過不斷執行雜湊運算，為新區塊找到有效[工作量證明](#pow)的網路[節點](#node)（請參閱 [Ethash](#ethash)）。 礦工不再是以太坊的一部分，在以太坊遷移至[權益證明](#pos)後他們已被驗證者所取代。

<DocLink to="/developers/docs/consensus-mechanisms/pow/mining/">
   挖礦
</DocLink>

### 鑄幣 {#mint}

鑄幣是創建新代幣並投入流通以供使用的過程。 這是一種去中心化機制，可以在沒有中央機構參與的情況下創建新代幣。

<Divider />

## N {#section-n}

### 網路 {#network}

指以太坊網絡，一種向每個以太坊節點（網路參與者）傳播交易和區塊的對等網路。

<DocLink to="/developers/docs/networks/">
   網路
</DocLink>

### 網路哈希率 {#network-hashrate}

整個以太坊挖礦網路產生的總[哈希率](#hashrate)。 在以太坊遷移至[權益證明](#pos)後，以太坊上的挖礦活動已停止。

### 非同質化代幣 (NFT) {#nft}

也稱為“契約”，是 ERC721 提案中提出的代幣標準。 非同質化代幣既能追蹤也可以交易，但每個代幣都是獨一無二的，不可互換，這與以太幣和 [ERC-20 代幣](#token-standard)不同。 非同質化代幣能夠代表數位或實體資產的所有權。

<DocLink to="/nft/">
   非同質化代幣 (NFT)
</DocLink>
<DocLink to="/developers/docs/standards/tokens/erc-721/">
   ERC-721 非同質化代幣標準
</DocLink>

### 節點 {#node}

參與網路的軟體客戶端。

<DocLink to="/developers/docs/nodes-and-clients/">
   節點和客戶端
</DocLink>

### 隨機數 {#nonce}

在密碼學中，是指只能使用一次的值。 帳戶隨機數是每個帳戶中的交易計數器，用於防範重播攻擊。

<Divider />

## O {#section-o}

### 叔塊 {#ommer}

當工作量證明下的一位[礦工](#miner)找到一個有效[區塊](#block)時，另一位礦工可能已經發布了一個競爭區塊並首先添加到了區塊鏈的末端。 這個有效但已過時的區塊可以被更新的區塊納為*叔塊*，並可以獲得部分區塊獎勵。 對於父區塊的同級區塊來說，「叔塊」一詞不分性別，因而為首選，但有時也被稱為「uncle」（叔塊）。 叔塊僅在[工作量證明](#pow)下的以太坊網路中有意義，在[權益證明](#pos)以太坊中不存在，因為後者在每個時隙中有且僅有 一個區塊提議者被選中。

### 樂觀卷疊 {#optimistic-rollup}

使用[詐欺證明](#rollups)的交易的[捲疊](#fraud-proof)，在使用[主網](#layer-2)（一層網路）提供的安全性的同時，提供了更 高的[二層網路](#mainnet)交易吞吐量。 與[以太坊Plasma 擴容解決方案](#plasma)（一種相似的二層網路解決方案）不同，樂觀卷疊可以處理更複雜的交易類型-- [以太坊虛擬機](#evm)中任何 可能的交易。 與[零知識卷疊](#zk-rollups)相比，樂觀卷疊確實存在延遲問題，因為可以透過詐欺證明來質疑交易。

<DocLink to="/developers/docs/scaling/optimistic-rollups/">
   樂觀卷疊
</DocLink>

### 預言機 {#oracle}

預言機是[區塊鏈](#blockchain)與真實世界之間的橋樑。 預言機起到鏈上[應用程式介面](#api)的作用，可以向其查詢訊息，也可在[智能合約](#smart-contract)中使用。

<DocLink to="/developers/docs/oracles/">
   預言機
</DocLink>

<Divider />

## P {#section-p}

### 奇偶校驗 {#parity}

以太坊客戶端軟體最重要的可互通實作之一。

### 對等體 {#peer}

運行以太坊客戶端軟體且具有相同[區塊鏈](#blockchain)副本的聯網電腦。

### 對等網路 {#peer-to-peer-network}

由電腦（[對等體](#peer)）組成的網絡，無需基於伺服器的中心服務即可共同執行功能。

### 以太坊 Plasma 擴充解決方案 {#plasma}

使用[詐欺證明](#fraud-proof)的鏈下擴容解決方案，例如[樂觀卷疊](#optimistic-rollups)。 Plasma 擴充解決方案僅限於簡單交易，例如基本的代幣轉帳和交換。

<DocLink to="/developers/docs/scaling/plasma">
   以太坊 Plasma 擴充解決方案
</DocLink>

### 私鑰（金鑰） {#private-key}

一個密碼，可使以太坊使用者透過產生數位簽章來證明對某個帳戶或合約的所有權（請參閱[公鑰](#public-key)、[地址](#address)、[橢圓曲線數位簽章演算法 ](#ecdsa)）。

### 私有鏈 {#private-chain}

完全私有的區塊鏈是一種需要存取權限的區塊鏈，不能公開使用。

### 權益證明 (PoS) {#pos}

加密貨幣區塊鏈協議用以實現分散式[共識](#consensus)的方法。 權益證明要求用戶證明自己擁有一定數量的加密貨幣（他們在網路中的「質押」），以便能夠參與交易的驗證。

<DocLink to="/developers/docs/consensus-mechanisms/pos/">
   權益證明
</DocLink>

### 工作量證明 (PoW) {#pow}

需要大量計算才能得出的數據（證明）。

<DocLink to="/developers/docs/consensus-mechanisms/pow/">
   工作量證明
</DocLink>

### 公鑰 {#public-key}

透過[私鑰](#private-key)的單向函數衍生的數字。 公鑰可以公開共享，任何人都可以用它來驗證使用對應私鑰簽署的數位簽章。

<Divider />

## R {#section-r}

### 收據 {#receipt}

收據是以太坊客戶端傳回的數據，用來表示特定[交易](#transaction)的結果，其中包含交易的[哈希](#hash)、交易的[區塊](#block)編號、[ 燃料](#gas)消耗量，如果部署了[智能合約](#smart-contract)，則也會傳回該合約的[地址](#address)。

### 重入攻擊 {#re-entrancy-attack}

此攻擊是指攻擊者合約呼叫受害者合約函數，使得在執行期間，受害者會再次呼叫攻擊者合約，如此循環往復。 可能導致的結果包括：透過跳過受害者合約中更新餘額或計算提款金額的部分來竊取資金。

<DocLink to="/developers/docs/smart-contracts/security/#re-entrancy">
   重入攻擊
</DocLink>

### 獎勵 {#reward}

每個新區塊中包含的以太幣金額，由以太坊網路獎勵給找到相應[工作量證明](#pow)解決方案的[礦工](#miner)。

### 遞歸長度前綴編碼 (RLP) {#rlp}

以太坊開發者設計的編碼標準，用於對具有任意複雜性和長度的物件（資料結構）進行編碼和序列化。

### 卷疊 {#rollups}

一種[二層網路](#layer-2)擴容解決方案，將多筆交易分批提交到[以太坊主鏈](#mainnet)的單筆交易中。 這樣可以降低[燃料](#gas)成本，增加[交易](#transaction)吞吐量。 樂觀卷疊和零知識卷疊使用不同的安全方法提供這些可擴展性效益。

<DocLink to="/developers/docs/scaling/#rollups">
   捲疊
</DocLink>

<Divider />

### 遠端過程呼叫 {#rpc}

**遠端程序呼叫 (RPC)**是一種協議，程式透過該協議向網路中另一台電腦上的程式要求服務，而無需了解網路的詳細資訊。

## S {#section-s}

### 安全雜湊演算法 (SHA) {#sha}

由美國國家標準與技術研究所 (NIST) 推出的系列加密雜湊函數。

### 寧靜 {#serenity}

啟動了一組擴容和永續性升級的以太坊開發階段，以前稱為「以太坊 2.0」或「以太坊 2」。

<DocLink to="/roadmap/">
   以太坊升級
</DocLink>

### 序列化 {#serialization}

將資料結構轉換為位元組序列的過程。

### 分片/分片鏈 {#shard}

分片鏈是整個區塊鏈中驗證者的子集可以負責的離散部分。 這將為以太坊提供更高的交易吞吐量，並提高[二層網路](#layer-2)解決方案（如[樂觀卷疊](#optimistic-rollups)和[零知識卷疊](# zk-rollups)）的資料可用性。

<DocLink to="/roadmap/danksharding">
   Danksharding
</DocLink>

### 側鏈 {#sidechain}

一種擴容解決方案，使用具有不同[共識機制](#consensus-rules)（通常速度更快）的單獨鏈。 要將這些側鏈連接到[主網](#mainnet)，需要用到鏈橋。 [卷疊](#rollups)也使用側鏈，但是它們與[主網](#mainnet)協作運作。

<DocLink to="/developers/docs/scaling/sidechains/">
   側鏈
</DocLink>

### 簽章 {#signing}

以加密方式證明交易已獲得特定私鑰持有者的批准。

### 單例 {#singleton}

一種電腦程式設計術語，描述只能存在一個實例的物件。

### 罰沒者 {#slasher}

罰沒者是一個實體，它會掃描認證以搜尋可懲罰的罪行。 罰沒向網路廣播，下一個區塊提議者將證明添加到區塊中。 然後，該區塊提議者會因懲罰惡意驗證者而獲得獎勵。

### 時隙 {#slot}

[權益證明](#pos)系統中的[驗證者](#validator)可以提出新區塊的時間段（12 秒）。 時隙有可能為空， 32 個時隙構成一個[時段](#epoch)。

<DocLink to="/developers/docs/consensus-mechanisms/pos/#how-does-validation-work">
   權益證明
</DocLink>

### 智能合約 {#smart-contract}

在以太坊計算基礎設施上執行的程序。

<DocLink to="/developers/docs/smart-contracts/">
   智能合約簡介
</DocLink>

### 簡潔的非互動式知識論證 (SNARK) {#snark}

SNARK 是「succinct non-interactive argument of knowledge」（簡潔的非互動式知識論證）的縮寫，是一種[零知識證明](#zk-proof)。

<DocLink to="/developers/docs/scaling/zk-rollups/">
   零知識卷疊
</DocLink>

### 軟分叉 {#soft-fork}

[共識規則](#consensus-rules)發生變化時[區塊鏈](#blockchain)中出現的分歧。 與[硬分叉](#hard-fork)相反，軟分叉是向後相容的；升級後的節點可以驗證未升級節點創建的區塊，只要它們遵循新的共識機制。

### Solidity {#solidity}

一種語法類似 JavaScript、C++ 或 Java 的程式化（命令式）程式語言， 是編寫以太坊[智能合約](#smart-contract)最流行、最常用的程式語言。 該語言由 Gavin Wood 博士創造。

<DocLink to="/developers/docs/smart-contracts/languages/#solidity">
   Solidity
</DocLink>

### Solidity 內聯彙編 {#solidity-inline-assembly}

[Solidity](#solidity) 程式中的[以太坊虛擬機器](#evm)組合語言。 Solidity 對內聯彙編的支援簡化了某些操作的寫入。

### 偽龍 {#spurious-dragon}

以太坊區塊鏈在2,675,000 區塊的一個[硬分叉](#hard-fork)，用以解決更多拒絕服務攻擊向量問題和清除狀態（請參閱[橘子口哨](#tangerine-whistle)） 。 另外，還有一個重播攻擊保護機制（請參閱[隨機數](#nonce)）。

### 穩定幣 {#stablecoin}

一種 [ERC-20 代幣](#token-standard)，其價值與另一種資產的價值掛鉤。 有的穩定幣受美元等法定貨幣、黃金等貴金屬以及比特幣等其他加密貨幣的支持。

<DocLink to="/eth/#tokens">
   以太幣不是以太坊唯一的加密貨幣
</DocLink>

### 質押 {#staking}

存入一定量的[以太幣](#ether)（質押）成為驗證者，並保護[以太坊網路](#network)的安全。 在[權益證明](#pos)共識模型中，驗證者檢查[交易](#transaction)並提出[區塊](#block)。 質押能夠為符合網路最大利益的行為提供經濟誘因。 你將會因為履行[驗證者](#validator)職責而獲得獎勵，反之將損失不等數量的以太幣。

<DocLink to="/staking/">
   質押你的以太幣，成為以太坊驗證者
</DocLink>

### 質押池 {#staking-pool}

多個以太坊權益者的合併以太幣，必須達到 32 個以太幣才能啟動一組驗證者金鑰。 節點營運商使用這些金鑰參與共識，[區塊獎勵](#block-reward)分配給參與貢獻的質押者。 質押池或委託質押並不是以太坊協議原生的，但社群已經開發了許多解決方案。

<DocLink to="/staking/pools/">
   聯合質押
</DocLink>

### 可擴展的透明知識論證 (STARK) {#stark}

STARK 是「scalable transparent argument of knowledge」（可擴展的透明知識論證）的縮寫，是一種[零知識證明](#zk-proof)。

<DocLink to="/developers/docs/scaling/zk-rollups/">
   零知識卷疊
</DocLink>

### 狀態 {#state}

區塊鏈上特定時間點的所有餘額和數據的快照，通常指特定區塊的狀況。

### 狀態通道 {#state-channels}

一種[二層網路](#layer-2)解決方案，在參與者之間設置一個通道，以便他們以較低的成本自由交易。 只有開設和關閉通道的[交易](#transaction)才會傳送到[主網](#mainnet)。 這樣可以實現非常高的交易吞吐量，但需要預先知曉參與者人數並鎖定資金。

<DocLink to="/developers/docs/scaling/state-channels/#state-channels">
   狀態通道
</DocLink>

### 絕對多數 {#supermajority}

絕對多數是指超過 2/3 (66%) 的總質押以太幣數量以保護以太坊的安全。 要在信標鏈上[最終確定](#finality)區塊，需要絕對多數投票。

### 同步 {#syncing}

將區塊鏈的完整最新版本下載到節點的過程。

### 同步委員會 {#sync-committee}

同步委員會是隨機選擇的一組[驗證者](#validator)，大約每 27 小時刷新一次。 同步委員會的目的是將他們的簽名添加到有效的區塊頭中。 同步委員會允許[輕客戶端](#light-client)追蹤區塊鏈鏈頭，而無需存取整個驗證者集合。

### szabo {#szabo}

[以太幣](#ether)的一種計量單位。 1 szabo = 10<sup>12</sup> [wei](#wei)，10<sup>6</sup> szabo = 1 個以太幣。

<Divider />

## T {#section-t}

### 橘子口哨 {#tangerine-whistle}

以太坊區塊鏈的一個[硬分叉](#hard-fork)，發生在2,463,000 區塊，更改了某些需要密集輸入/輸出操作的[燃料](#gas)計算，並清除了拒絕服務 攻擊造成的累積狀態。 拒絕服務攻擊利用了這類作業的低燃料成本。

### 終端總難度 (TTD) {#terminal-total-difficulty}

總難度是區塊鏈中某個特定點之前所有區塊的 Ethash 挖礦難度之和。 終端總難度是一個特定的總難度值，用來觸發執行客戶端關閉其挖礦和區塊廣播功能，使網路能夠過渡到權益證明。

### 測試網 {#testnet}

「測試網路」的簡稱，用於模擬乙太坊主網行為的網路（請參閱[主網](#mainnet)）。

<DocLink to="/developers/docs/networks/#ethereum-testnets">
   測試網
</DocLink>

### 代幣 {#token}

以太坊區塊鏈智慧合約中定義的可交易虛擬商品。

### 代幣標準 {#token-standard}

由 ERC-20 提案引入，為同質化代幣提供標準化[智能合約](#smart-contract)結構。 與[非同質化代幣](#nft)不同，可以追蹤、交易和互相兌換相同合約中的代幣。

<DocLink to="/developers/docs/standards/tokens/erc-20/">
   ERC-20 代幣標準
</DocLink>

### 交易 {#transaction}

提交到以太坊區塊鏈的數據，由一個原始[帳戶](#account)簽名，並以一個特定的[地址](#address)為目標。 交易包含交易的[燃料限制](#gas-limit)等元資料。

<DocLink to="/developers/docs/transactions/">
   交易
</DocLink>

### 交易費 {#transaction-fee}

每次使用以太坊網路時需要支付的費用。 例如從你的[錢包](#wallet)或[去中心化應用程式](#dapp)互動中發送資金，例如交換代幣或購買收藏品。 交易費可視為服務費， 費用多少取決於網路的繁忙程度。 這是因為[驗證者](#validator)（負責處理你的交易的人），可能會優先考慮費用較高的交易 — 因此擁堵會迫使價格上漲。

從技術層面來講，交易費與相應交易所需的[燃料](#gas)消耗量有關。

降低交易費目前非常受關注。 請參閱[二層網路](#layer-2)。

### 去信任 {#trustlessness}

以太坊網路進行交易調解的能力，讓任何關聯方無需信任第三方即可調解。

### 圖靈完備 {#turing-complete}

一個以英國數學家和計算機科學家阿蘭·圖靈(Alan Turing) 命名的概念- 一個數據操作規則系統（例如計算機的指令集、程式語言或細胞自動機），如果它可以用來模擬任何圖靈機， 就稱為「圖靈完備」或「計算通用」。

<Divider />

## V {#section-v}

### 驗證者 {#validator}

[權益證明](#pos)系統中的[節點](#node)，負責儲存資料、處理交易並且在區塊鏈中新增區塊。 要啟動驗證者軟體，需要能夠[質押](#staking) 32 個以太幣。

<DocLink to="/developers/docs/consensus-mechanisms/pos">
   權益證明
</DocLink>
<DocLink to="/staking/">
   以太坊中的質押
</DocLink>

### 驗證者的生命週期 {#validator-lifecycle}

驗證者可以處於的狀態序列。 包括：

- 已存款：驗證者已將至少 32 個以太幣存入[存款合約](#deposit-contract)中
- 待處理：驗證者正在啟動佇列中等待已存在的驗證者投票決定其能否進入網絡
- 活躍：目前正在證明和提議區塊
- 懲罰中：驗證者存在不當行為並且正在被懲罰
- 退出中：驗證者被標記為退出網絡，無論他們是自願的還是被強制驅逐的

### 有效性證明 {#validity-proof}

某些[二層網路](#layer-2)解決方案的安全模型，為了提高速度，將交易[卷疊](/#rollups)為若干個批次，並作為單筆交易提交到以太坊。 交易計算在鏈下進行，然後附帶有效性證明提交給主鏈。 這種方法在確保安全性的同時可能增加交易量。 部分[卷疊](#rollups)使用[詐欺證明](#fraud-proof)。

<DocLink to="/developers/docs/scaling/zk-rollups/">
   零知識卷疊
</DocLink>

### Validium {#validium}

使用[有效性證明](#validity-proof)來提高交易吞吐量的鏈下解決方案。 與[零知識卷疊](#zk-rollup)不同，Validium 的資料並沒有儲存在一層網路[主網](#mainnet)中。

<DocLink to="/developers/docs/scaling/validium/">
   Validium
</DocLink>

### Vyper {#vyper}

一種高階程式語言，語法與 Python 類似。 但 Vyper 更接近純函數式語言， 其創造者為 Vitalik Buterin。

<DocLink to="/developers/docs/smart-contracts/languages/#vyper">
   Vyper
</DocLink>

<Divider />

## W {#section-w}

### 錢包 {#wallet}

持有[私鑰](#private-key)的軟體。 錢包用來存取和管理以太坊[帳戶](#account)，並與[智能合約](#smart-contract)互動。 密鑰無需儲存在錢包中，為了提高安全性，可以從離線儲存（如，記憶卡或紙張）檢索。 雖然稱其為“錢包”，但它並未存儲貨幣或代幣。

<DocLink to="/wallets/">
   以太坊錢包
</DocLink>

### Web3 {#web3}

萬維網的第三個版本。 Web3 最初由Gavin Wood 博士提出，代表了Web 應用程式的新願景和關注點- 從集中擁有和管理的應用程式變為基於去中心化協議的應用程式（請參閱[去中心化應用程式](# dapp)）。

<DocLink to="/developers/docs/web2-vs-web3/">
   Web2 與 Web3 的對比
</DocLink>

### wei {#wei}

[以太幣](#ether)的最小計量單位。 10<sup>18</sup> wei = 1 個以太幣。

<Divider />

## Z {#section-z}

### 零位址 {#zero-address}

完全由零組成的以太坊地址，常用作從自有流通中撤出代幣的地址。 透過 burn() 方法從智慧合約的索引中正式移除的代幣與發送到該地址的代幣是不同的。

### 零知識證明 {#zk-proof}

零知識證明是一種加密方法，使個人可以在不傳達任何額外資訊的情況下證明陳述是真實的。

<DocLink to="/developers/docs/scaling/zk-rollups/">
   零知識卷疊
</DocLink>

### 零知識卷疊 {#zk-rollup}

使用[有效性證明](#validity-proof)的交易[卷疊](#rollups)，在使用[主網](#mainnet)（一層網路）安全性的同時，提高了[二層網路] (#layer-2)的交易吞吐量。 雖然無法像[樂觀卷疊](#optimistic-rollups)那樣處理複雜的交易類型，但沒有延遲問題，因為交易在提交時就可以證明其有效性。

<DocLink to="/developers/docs/scaling/zk-rollups/">
   零知識卷疊
</DocLink>

<Divider />

## 來源 {#sources}

_摘自[Andreas M. Antonopoulos、Gavin Wood](https://ethereumbook.info) 的[《精通以太坊》](https://github.com/ethereumbook/ethereumbook)（依據CC-BY-SA 授權協議 ）_

<Divider />

## 完善本頁面 {#contribute-to-this-page}

我們是否還有所遺漏？ 是否存在謬誤？ 請在 GitHub 上為此詞彙表貢獻力量，幫助我們改進！

[詳細了解如何為我們提供協助](/contributing/adding-glossary-terms)
