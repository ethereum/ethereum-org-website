---
title: "以太坊研究的活躍領域"
description: "探索開放研究的不同領域，並了解如何參與其中。"
lang: zh-tw
---

以太坊的主要優勢之一是活躍的研究與工程社群不斷地對其進行改進。全世界有許多熱情且技術精湛的人希望致力於解決以太坊中尚未解決的問題，但要找出這些問題是什麼並不總是那麼容易。本頁面概述了關鍵的活躍研究領域，作為了解以太坊最前沿技術的粗略指南。

## 以太坊研究如何運作 {#how-ethereum-research-works}

以太坊研究是公開透明的。其文化是盡可能讓研究工具和成果保持開放與互動性，例如透過可執行的筆記本。以太坊研究進展迅速，新發現會發布在 [ethresear.ch](https://ethresear.ch/) 等論壇上公開討論，而不是在經過多輪同儕審查後才透過傳統出版物傳達給社群。以太坊基金會也會發布其優先事項及原因，讓任何人都能了解目前哪些問題被認為是迫切的。

## 一般研究資源 {#general-research-resources}

無論具體主題為何，都可以在 [ethresear.ch](https://ethresear.ch) 和 [Eth R&D Discord 頻道](https://discord.gg/qGpsxSA)找到豐富的以太坊研究資訊。這些是以太坊研究人員討論最新想法和開發機會的主要場所。

若要了解協定未來的發展方向，請從[以太坊路線圖](/roadmap/)開始，然後閱讀以太坊基金會的 [2026 年協定優先事項更新](https://blog.ethereum.org/2026/02/18/protocol-priorities-update-2026)以及報告相關進展的[協定叢集更新](https://blog.ethereum.org/2026/05/11/protocol-update-may-26)。對於想要致力於協定本身的人來說，[以太坊協定研究 (Ethereum Protocol Studies)](https://blog.ethereum.org/2026/02/17/ethereum-protocol-studies-26) 是一個結構化的切入點。

## 資金來源 {#sources-of-funding}

您可以參與以太坊研究並獲得報酬。[以太坊基金會](/foundation/)透過其[生態系統支援計畫](https://esp.ethereum.foundation/applicants)資助研究和公共財，該計畫會發布願望清單項目和提案請求，描述其希望解決的問題。您可以在[以太坊資助頁面](/community/grants/)上找到有關活躍和即將到來的資金機會的資訊。

## 協定研究 {#protocol-research}

協定研究關注以太坊的基礎層：定義節點如何連接、通訊、交換和儲存以太坊資料，並對區塊鏈狀態達成共識的一套規則。其兩個長期的類別是共識和執行，而現在有幾個研究主題橫跨這兩者。

### 共識 {#consensus}

共識研究關注[以太坊的權益證明 (PoS) 機制](/developers/docs/consensus-mechanisms/pos/)：分叉選擇規則和最終性小工具的安全性、質押的加密經濟學、傳輸區塊、證明和資料塊 (blob) 資料的點對點網路，以及驗證者用來簽章的密碼學。一些共識研究主題的範例包括：

- 識別並修補漏洞；
- 量化加密經濟學安全性；
- 減少區塊達到最終性所需的時間；
- 以及改善共識客戶端之間點對點網路的效率、安全性和監控。

許多這項工作已經從論文轉向規範。資料可用性採樣已在 [富薩卡 (Fusaka)](/roadmap/fusaka/) 升級中發布，關於區塊建構方式以及如何保證交易被包含的變更已在即將到來的升級中指定，而一項被稱為精簡共識 (lean consensus) 的長期重新設計正在探索更快的最終性以及後量子簽章。

#### 背景閱讀 {#background-reading}

- [權益證明簡介](/developers/docs/consensus-mechanisms/pos/)
- [單槽最終性](/roadmap/single-slot-finality/)
- [Casper 友善最終性小工具 (Casper-FFG) 論文](https://arxiv.org/abs/1710.09437)
- [Gasper 論文](https://arxiv.org/abs/2003.03052)
- [精簡以太坊 (lean Ethereum)](https://blog.ethereum.org/2025/07/31/lean-ethereum)

#### 近期研究 {#recent-research}

- [Ethresear.ch 共識](https://ethresear.ch/c/consensus/29)
- [可用性/最終性困境](https://arxiv.org/abs/2009.04987)
- [3 槽最終性：SSF 不僅僅是關於「單一」時槽](https://ethresear.ch/t/3-slot-finality-ssf-is-not-about-single-slot/20927)

### 執行 {#execution}

執行層關注於執行交易、運行[以太坊虛擬機 (EVM)](/developers/docs/evm/)，以及產生執行負載以傳遞給共識層。這裡的研究分為兩個方向：讓狀態的持有和證明變得便宜，以及在不增加運行節點人員成本的情況下提高吞吐量。有許多活躍的研究領域，包括：

- 重新定價建立狀態的操作的燃料 (gas) 成本；
- 讓節點不再需要提供的歷史記錄過期；
- 允許平行驗證交易的區塊級存取清單；
- 將狀態、資料和運算分開定價的多維度手續費市場；
- 以及使用 zkEVM 證明第一層 (L1) 區塊的執行。

#### 背景閱讀 {#background-reading-1}

- [EVM 簡介](/developers/docs/evm/)
- [Ethresear.ch 執行層](https://ethresear.ch/c/execution-layer-research/37)
- [以太坊執行層規範](https://github.com/ethereum/execution-specs)
- [資料庫最佳化](https://github.com/erigontech/erigon/blob/main/docs/programmers_guide/db_faq.md)

#### 近期研究 {#recent-research-1}

- [EIP-7928：區塊級存取清單](https://eips.ethereum.org/EIPS/eip-7928)
- [EIP-8037：狀態建立燃料成本增加](https://eips.ethereum.org/EIPS/eip-8037)
- [EIP-7999：統一的多維度手續費市場](https://eips.ethereum.org/EIPS/eip-7999)
- [EIP-7642：eth/69、歷史記錄過期與更簡單的收據](https://eips.ethereum.org/EIPS/eip-7642)
- [發布 L1 zkEVM：即時證明](https://blog.ethereum.org/2025/07/10/realtime-proving)

### 抗審查性與區塊建構 {#censorship-resistance-and-block-building}

目前大多數以太坊區塊由少數專業的建構者組裝，這集中了決定包含哪些交易的權力。該領域的研究涵蓋將建構者市場引入協定本身，以便提案者和建構區塊的角色由共識規則分離，而不是由協定外的軟體分離，並為驗證者提供一種方法來強制包含建構者遺漏的交易。

#### 背景閱讀 {#background-reading-21}

- [提案者與建構者分離 (PBS)](/roadmap/pbs/)
- [單一秘密領導者選舉 (SSLE)](/roadmap/secret-leader-election/)

#### 近期研究 {#recent-research-21}

- [EIP-7732：內建提案者與建構者分離](https://eips.ethereum.org/EIPS/eip-7732)
- [EIP-7805：分叉選擇強制包含清單](https://eips.ethereum.org/EIPS/eip-7805)
- [在提案者與建構者分離下提高交易的抗審查性](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)

### 狀態增長與無狀態性 {#state-growth-and-statelessness}

每個全節點都儲存以太坊的狀態，因此該狀態增長的速度設定了運行全節點的成本下限。在短期內，研究重點是重新定價建立狀態的操作，以及讓節點不再需要保留的歷史記錄過期。從長遠來看，計畫是用產生更小證明的二元樹取代以太坊的十六進制默克爾-帕特里夏樹 (Merkle-Patricia trie)，並朝著無狀態性邁進，以便節點可以在不持有整個狀態的情況下驗證區塊。該領域早期的工作假設使用沃克爾樹 (Verkle trees)；目前的提案是統一的二元樹，它延續了為早期工作指定的見證燃料時間表。

#### 背景閱讀 {#background-reading-22}

- [無狀態性與狀態過期](/roadmap/statelessness/)
- [以太坊無狀態手冊](https://stateless.fyi/)

#### 近期研究 {#recent-research-22}

- [EIP-7864：使用統一二元樹的以太坊狀態](https://eips.ethereum.org/EIPS/eip-7864)
- [EIP-4762：無狀態性燃料成本變更](https://eips.ethereum.org/EIPS/eip-4762)
- [為什麼去中心化狀態對以太坊很重要](https://ethresear.ch/t/why-decentralized-state-is-important-for-ethereum/25622)

### 後量子密碼學 {#post-quantum-cryptography}

以太坊的驗證者簽章及其大部分應用層依賴於橢圓曲線密碼學，而能力足夠強大的量子電腦將會破解它。讓以太坊具備抗量子能力意味著用基於雜湊或基於格的替代方案取代這些簽章，保持簽章聚合對於大型驗證者集足夠高效，並為現有帳戶提供遷移路徑。以太坊基金會設有一個專門的後量子團隊，這是路線圖上最長遠的計畫之一。

#### 背景閱讀 {#background-reading-23}

- [抗量子性](/roadmap/security/quantum-resistance/)
- [後量子以太坊](https://pq.ethereum.org/)

#### 近期研究 {#recent-research-23}

- [精簡以太坊 (lean Ethereum)](https://blog.ethereum.org/2025/07/31/lean-ethereum)
- [Ethresear.ch 密碼學](https://ethresear.ch/c/cryptography/28)
- [精簡以太坊實作](https://github.com/leanEthereum)

## 客戶端開發 {#client-development}

以太坊客戶端是以太坊協定的實作。客戶端開發透過將協定研究的成果建構到這些客戶端中，使其成為現實。客戶端開發包括更新客戶端規範以及建構特定的實作。

一個以太坊節點需要運行兩套軟體：

1. 一個共識客戶端，用於追蹤區塊鏈的頂端、廣播區塊並處理共識邏輯
2. 一個執行客戶端，用於支援以太坊虛擬機並執行交易和智能合約

除了這兩者之外，正在開發新類別客戶端的原型，包括證明 L1 區塊執行的客戶端，以及圍繞後量子簽章建構的精簡共識客戶端。

有關節點和客戶端的更多詳細資訊，以及所有目前客戶端實作的清單，請參閱[節點與客戶端頁面](/developers/docs/nodes-and-clients/)。您也可以在[歷史頁面](/ethereum-forks/)上找到所有以太坊升級的歷史記錄。

### 執行客戶端 {#execution-clients}

- [執行客戶端規範](https://github.com/ethereum/execution-specs)
- [執行 API 規範](https://github.com/ethereum/execution-apis)

### 共識客戶端 {#consensus-clients}

- [共識客戶端規範](https://github.com/ethereum/consensus-specs)
- [信標 API 規範](https://ethereum.github.io/beacon-APIs/)

### zkEVM 客戶端 {#zkevm-clients}

- [zkEVM](/roadmap/zkevm/)
- [Ethproofs](https://ethproofs.org/)
- [發布 L1 zkEVM：安全基礎](https://blog.ethereum.org/2025/12/18/zkevm-security-foundations)

## 擴容與效能 {#scaling-and-performance}

擴容以太坊是以太坊研究人員關注的一大領域，它同時在兩條軌道上進行：提高第一層 (L1) 本身的吞吐量，以及將執行轉移到將資料發布到以太坊的匯總 (rollup) 上。目前的工作包括增加區塊 Gas 限制、重新定價狀態增長、擴大匯總資料的資料塊 (blob) 容量，以及減少節點必須儲存和驗證的內容。關於擴容以太坊的介紹資訊可在我們的[擴容頁面](/developers/docs/scaling/)和[擴容路線圖](/roadmap/scaling/)上找到。

### 第二層 (L2) {#layer-2}

現在有幾個第二層 (L2) 協定使用不同的技術來批次處理交易並在以太坊第一層上保護它們，藉此擴容以太坊。開放研究包括降低證明的延遲和成本、縮短交易達到無須信任最終性所需的時間，以及為使用者在許多匯總中提供單一連貫的體驗。

#### 背景閱讀 {#background-reading-2}

- [第二層 (L2) 簡介](/layer-2/)
- [L2BEAT：擴容摘要](https://l2beat.com/scaling/summary)
- [以匯總為中心的以太坊路線圖](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698)

#### 近期研究 {#recent-research-2}

- [Ethresear.ch 第二層 (L2)](https://ethresear.ch/c/layer-2/32)
- [L2BEAT：鏈上成本](https://l2beat.com/scaling/costs)
- [2026 年在以太坊上建構：發生了什麼變化](/latest/building-on-ethereum-in-2026/)

### 互操作性 {#interoperability}

使用者和資產分散在以太坊第一層和許多第二層上，而研究問題是讓他們在不信任中介的情況下跨這些鏈移動和行動。這裡的工作涵蓋基於意圖的轉帳、標準化的跨鏈定址和命名、通用訊息傳遞，以及錢包層級的鏈抽象。這取代了由託管橋接器持有資產的模型，而橋接器在歷史上一直是生態系統中最大的損失來源之一，因此任何跨鏈機制的安全性仍然是核心關注點。

#### 背景閱讀 {#background-reading-3}

- [區塊鏈橋接器簡介](/bridges/)
- [讓以太坊再次感覺像是一條鏈](https://blog.ethereum.org/2025/11/18/eil)
- [開放意圖框架 (Open Intents Framework)](https://openintents.xyz/)
- [驗證橋接器](https://stonecoldpat.github.io/images/validatingbridges.pdf)

#### 近期研究 {#recent-research-3}

- [ERC-7683：跨鏈意圖](https://eips.ethereum.org/EIPS/eip-7683)
- [ERC-7930：可互操作的地址](https://eips.ethereum.org/EIPS/eip-7930)
- [ERC-7828：可互操作的名稱](https://eips.ethereum.org/EIPS/eip-7828)

### 資料可用性與資料塊擴容 {#data-availability-and-blob-scaling}

匯總將其資料以資料塊 (blob) 的形式發布到以太坊，而擴容該資料層本身就是一個獨立於擴容執行的研究問題。以太坊現在使用資料可用性採樣，因此驗證者可以透過採樣部分資料塊資料來驗證其是否已發布，而不是下載全部資料，並且資料塊容量透過專用的僅資料塊參數分叉逐步提高。開放性問題包括採樣可以推進到什麼程度、如何讓在家質押的人的頻寬需求保持在可控範圍內，以及資料塊定價應如何回應需求。

#### 背景閱讀 {#background-reading-4}

- [PeerDAS](/roadmap/fusaka/peerdas/)
- [富薩卡 (Fusaka) 升級](/roadmap/fusaka/)
- [丹克分片 (Danksharding)](/roadmap/danksharding/)
- [資料可用性](/developers/docs/data-availability/)
- [EIP-4844：分片資料塊交易](https://eips.ethereum.org/EIPS/eip-4844)
- [原始 Danksharding 筆記](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq)

#### 近期研究 {#recent-research-4}

- [EIP-7594：PeerDAS](https://eips.ethereum.org/EIPS/eip-7594)
- [EIP-7892：僅資料塊參數硬分叉](https://eips.ethereum.org/EIPS/eip-7892)
- [Ethresear.ch 分片](https://ethresear.ch/c/sharding/6)

### 硬體 {#hardware}

在適度的硬體上[運行節點](/developers/docs/nodes-and-clients/run-a-node/)是保持以太坊去中心化的基礎，因此吞吐量的每一次增加都必須與節點營運商的成本進行權衡。隨著區塊 Gas 限制的上升以及計畫中的進一步增加，活躍的研究涵蓋了狀態增長及其定價方式、較大狀態下的同步和資料庫效能、歷史記錄過期可節省的磁碟空間，以及最終的無狀態性。

#### 背景閱讀 {#background-reading-5}

- [啟動您自己的以太坊節點](/developers/docs/nodes-and-clients/run-a-node/)
- [無狀態性與狀態過期](/roadmap/statelessness/)
- [ARM 上的以太坊](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)

#### 近期研究 {#recent-research-5}

- [擴容以太坊：邁向更高 Gas 限制及更遠的道路](https://ethpandaops.io/posts/gaslimit-scaling/)
- [EIP-8261：Gas 限制時間表](https://eips.ethereum.org/EIPS/eip-8261)
- [EIP-8037：狀態建立燃料成本增加](https://eips.ethereum.org/EIPS/eip-8037)

## 安全性 {#security}

安全性是一個廣泛的主題，可能包括防止垃圾訊息和詐騙、錢包安全性、硬體安全性、加密經濟學安全性、抗審查性、後量子準備、漏洞尋找，以及應用程式和客戶端軟體的測試與驗證。以太坊的[安全性路線圖](/roadmap/security/)涵蓋了協定層級的工作。

### 密碼學與零知識證明 (ZKP) {#cryptography--zkp}

零知識證明 (ZKP) 和密碼學對於在以太坊及其應用程式中建立隱私和安全性至關重要。零知識證明已經從研究轉向生產基礎設施：證明真實以太坊區塊的證明者現在在延遲、成本和可靠性方面進行公開基準測試。開放性問題也相應地轉移，轉向足夠快地證明 L1 區塊以實現即時證明、嚴格說明所使用證明系統的安全性，以及為後量子密碼學做準備。

#### 背景閱讀 {#background-reading-6}

- [zkEVM](/roadmap/zkevm/)
- [隱私](/roadmap/privacy/)
- [Zero Knowledge Podcast](https://zeroknowledge.fm/)

#### 近期研究 {#recent-research-6}

- [Ethresear.ch 零知識 (ZK)](https://ethresear.ch/c/zk-s-nt-arks/13)
- [Ethresear.ch 密碼學](https://ethresear.ch/c/cryptography/28)
- [基於雜湊的 zkEVM 證明系統的可靠性計算機](https://github.com/ethereum/soundcalc)
- [發布 L1 zkEVM：安全基礎](https://blog.ethereum.org/2025/12/18/zkevm-security-foundations)

### 錢包 {#wallets}

以太坊錢包可以是瀏覽器擴充功能、桌面和行動應用程式，或以太坊上的智能合約。帳戶抽象化不再是實驗性的：ERC-4337 在不更改協定的情況下提供智能帳戶，而 EIP-7702 讓普通帳戶可以設定程式碼，以便交易批次處理、燃料贊助和社交恢復可以與使用者已有的地址一起運作。目前的開放研究集中在協定本身的本機帳戶抽象化、模組化和可稽核的帳戶架構，以及普通人可以安全操作的金鑰管理和恢復。

#### 背景閱讀 {#background-reading-7}

- [錢包簡介](/wallets/)
- [錢包安全性簡介](/security/)
- [帳戶抽象化](/roadmap/account-abstraction/)
- [EIP-7702](/roadmap/pectra/7702/)
- [Ethresear.ch 安全性](https://ethresear.ch/c/security/25)

#### 近期研究 {#recent-research-7}

- [EIP-8141：框架交易](https://eips.ethereum.org/EIPS/eip-8141)
- [ERC-5792：錢包呼叫 API](https://eips.ethereum.org/EIPS/eip-5792)
- [ERC-6963：多重注入提供者發現](https://eips.ethereum.org/EIPS/eip-6963)
- [專注於驗證的智能合約錢包](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)

## 社群、教育與推廣 {#community-education-and-outreach}

引導新使用者進入以太坊需要新的教育資源和推廣方法。這可能包括部落格文章和專文、書籍、Podcast、迷因、教學資源、事件，以及任何其他建立社群、歡迎新手並教育人們了解以太坊的事物。

### 設計與使用者體驗 (UX) {#design-and-ux}

為了引導更多人進入以太坊，生態系統必須改善其設計和使用者體驗。這需要設計師和產品專家重新審視錢包和應用程式的運作方式，而且這越來越意味著要針對已經存在的標準進行設計：批次錢包呼叫、燃料贊助、可恢復的帳戶，以及帶有其所屬鏈的人類可讀地址。Web3 UX 研究的權威場所相對較少，因此已發表的研究和設計指南往往比較分散。

#### 背景閱讀 {#background-reading-8}

- [Web3 中的設計與 UX](/developers/docs/design-and-ux/)
- [以太坊使用者體驗路線圖](/roadmap/user-experience/)
- [Web3 設計手冊](https://learnweb3.design/)
- [Web3 UX 設計手冊](https://web3ux.design/)

#### 近期研究 {#recent-research-8}

- [Ethresear.ch UX/UI](https://ethresear.ch/c/ui-ux/24)
- [ERC-5792：錢包呼叫 API](https://eips.ethereum.org/EIPS/eip-5792)
- [ERC-7828：可互操作的名稱](https://eips.ethereum.org/EIPS/eip-7828)

### 經濟學 {#economics}

以太坊的經濟學研究大致遵循兩種方法：驗證依賴經濟誘因的機制安全性（「個體經濟學」），以及分析協定、應用程式和使用者之間的價值流動（「總體經濟學」）。有關以太坊原生資產（以太幣）及其之上建構的代幣（例如 NFT 和 ERC-20 代幣）存在著複雜的加密經濟學因素。

#### 背景閱讀 {#background-reading-9}

- [穩健誘因小組 (Robust Incentives Group)](https://rig.ethereum.org/)
- [以太坊經濟學大師班與經濟模型](https://github.com/CADLabs/ethereum-economic-model)

#### 近期研究 {#recent-research-9}

- [Ethresear.ch 經濟學](https://ethresear.ch/c/economics/16)
- [流通供應量均衡](https://ethresear.ch/t/circulating-supply-equilibrium-for-ethereum-and-minimum-viable-issuance-during-the-proof-of-stake-era/10954)
- [量化 MEV：這座森林有多黑？](https://arxiv.org/abs/2101.05511)

### 區塊空間與手續費市場 {#blockspace-fee-markets}

區塊空間市場管理終端使用者交易的包含，無論是直接在以太坊（第一層）上，還是在橋接網路上，例如匯總（第二層）。在以太坊上，交易被提交到作為 EIP-1559 部署在協定內的手續費市場，保護鏈免受垃圾訊息的影響並為擁塞定價。在這兩層上，交易可能會產生外部性，稱為最大可提取價值 (MEV)，這會引發新的市場結構來捕獲或管理這些外部性。目前的工作將其擴展到同時為多種資源定價，因為狀態、資料和運算會獨立擁塞，並改變由誰組裝區塊以及在什麼條件下組裝。

#### 背景閱讀 {#background-reading-10}

- [以太坊區塊鏈的交易手續費機制設計：EIP-1559 的經濟分析 (Tim Roughgarden, 2020)](https://timroughgarden.org/papers/eip1559.pdf)
- [EIP-1559 模擬 (穩健誘因小組)](https://ethereum.github.io/abm1559)
- [從第一原理看匯總經濟學](https://barnabe.substack.com/p/understanding-rollup-economics-from?utm_source=url)
- [閃電男孩 2.0：去中心化交易所中的搶先交易、交易重新排序與共識不穩定性](https://arxiv.org/abs/1904.05234)

#### 近期研究 {#recent-research-10}

- [EIP-7999：統一的多維度手續費市場](https://eips.ethereum.org/EIPS/eip-7999)
- [EIP-7928：區塊級存取清單](https://eips.ethereum.org/EIPS/eip-7928)
- [跨域 MEV](https://arxiv.org/abs/2112.01472)

### 權益證明誘因 {#proof-of-stake-incentives}

驗證者使用以太坊的原生資產（以太幣）作為抵押品，以防止不誠實的行為。這種加密經濟學決定了網路的安全性。經驗豐富的驗證者可能可以利用誘因層的細微差別來發動明確的攻擊。自佩克特拉 (Pectra) 升級以來，驗證者還可以持有並賺取大得多的有效餘額，並將多個驗證者合併為一個，這改變了運行它們的經濟學。

#### 背景閱讀 {#background-reading-11}

- [最大有效餘額](/roadmap/pectra/maxeb/)
- [以太坊經濟學大師班與經濟模型](https://github.com/CADLabs/ethereum-economic-model)
- [PoS 誘因模擬 (穩健誘因小組)](https://ethereum.github.io/beaconrunner/)

#### 近期研究 {#recent-research-11}

- [穩健誘因小組](https://rig.ethereum.org/)
- [對 PoS 以太坊的三種攻擊](https://arxiv.org/abs/2110.10086)

### 流動性質押與衍生品 {#liquid-staking-and-derivatives}

流動性質押允許擁有少於 32 ETH 的使用者透過將以太幣交換為代表已質押以太幣的代幣來獲得質押收益，該代幣可用於去中心化金融 (DeFi)。然而，與流動性質押相關的誘因和市場動態仍在探索中，其對以太坊安全性的影響（例如中心化風險）也是如此。

#### 背景閱讀 {#background-reading-12}

- [Ethresear.ch 流動性質押](https://ethresear.ch/search?q=liquid%20staking)
- [Lido：通往無須信任的以太坊質押之路](https://blog.lido.fi/the-road-to-trustless-ethereum-staking/)

#### 近期研究 {#recent-research-12}

- [流動性質押衍生品的風險](https://notes.ethereum.org/@djrtwo/risks-of-lsd)
- [處理從 Lido 的提款](https://ethresear.ch/t/handling-withdrawals-in-lidos-eth-liquid-staking-protocol/8873)

## 測試 {#testing}

### 客戶端與網路測試 {#client-and-network-testing}

以太坊的規範是可執行的，從中產生的測試設備是客戶端團隊用來檢查其實作的標準。除此之外，共享的測試工具會讓客戶端互相對抗，並在故意設置的惡意網路條件下運行，而公共測試網會在升級到達主網之前對其進行演練。改善這個基礎設施是目前最具影響力的工作之一，因為這是如何在錯誤到達使用者之前將其捕獲的方法。

#### 背景閱讀 {#background-reading-24}

- [以太坊執行層規範](https://github.com/ethereum/execution-specs)
- [共識客戶端規範](https://github.com/ethereum/consensus-specs)

#### 近期研究 {#recent-research-24}

- [hive，一個端到端客戶端測試工具](https://github.com/ethereum/hive)
- [Assertoor，一個測試網測試工具](https://github.com/ethpandaops/assertoor)

### 形式化驗證 {#formal-verification}

形式化驗證使用機器檢查的數學證明來確定規範或實作的行為符合預期。在以太坊中，這涵蓋了證明 EVM 實作符合形式語意、證明零知識證明者所依賴的電路和證明系統的可靠性，以及驗證其底層的密碼學原語。進一步的研究可以加強這些證明，並將其擴展到堆疊的更多部分。

#### 背景閱讀 {#background-reading-13}

- [已驗證的 zkEVM](https://verified-zkevm.org/)
- [形式化驗證 (Intel)](https://www.cl.cam.ac.uk/~jrh13/papers/mark10.pdf)

#### 近期研究 {#recent-research-13}

- [已驗證的 zkEVM 專案概述](https://github.com/Verified-zkEVM/Overview)
- [KEVM：K 語言中的 EVM 語意](https://github.com/runtimeverification/evm-semantics)
- [存款合約的形式化驗證](https://github.com/runtimeverification/deposit-contract-verification)

## 資料科學與分析 {#data-science-and-analytics}

需要更多的資料分析工具和儀表板，以提供有關以太坊活動和網路健康狀況的詳細資訊。大部分底層資料都是公開且可查詢的，因此差距通常在於分析和呈現，而不是存取。

### 背景閱讀 {#background-reading-14}

- [Dune Analytics](https://dune.com/browse/dashboards)
- [客戶端多樣性儀表板](https://clientdiversity.org/)
- [以太坊 JSON-RPC 執行 API 規範](https://ethereum.github.io/execution-apis/)

#### 近期研究 {#recent-research-14}

- [穩健誘因小組資料分析](https://rig.ethereum.org/)
- [ethPandaOps 開放資料](https://ethpandaops.io/data/)
- [L2BEAT：擴容摘要](https://l2beat.com/scaling/summary)

## 應用程式與工具 {#apps-and-tooling}

應用層支援一個多樣化的程式生態系統，這些程式在以太坊的基礎層上結算交易。開發團隊不斷尋找利用以太坊的新方法，以建立重要 Web2 應用程式的可組合、無需許可且抗審查的版本，或創造全新的 Web3 原生概念。同時，正在開發新工具，使在以太坊上建構去中心化應用程式 (dapp) 變得不那麼複雜。

### 去中心化金融 (DeFi) {#defi}

去中心化金融 (DeFi) 是建構在以太坊之上的主要應用程式類別之一。DeFi 旨在建立可組合的「金錢樂高」，讓使用者可以使用智能合約儲存、轉帳、借貸和投資加密資產。DeFi 是一個快速發展且不斷更新的領域。持續需要對安全、高效且易於存取的協定進行研究。

#### 背景閱讀 {#background-reading-15}

- [去中心化金融 (DeFi)](/defi/)
- [Coinbase：什麼是 DeFi？](https://www.coinbase.com/learn/crypto-basics/what-is-defi)

#### 近期研究 {#recent-research-15}

- [去中心化金融，中心化所有權？](https://arxiv.org/pdf/2012.09306.pdf)
- [Ethresear.ch 應用程式](https://ethresear.ch/c/applications/18)

### 去中心化自治組織 (DAO) {#daos}

以太坊一個具影響力的使用案例是能夠透過使用 DAO 以去中心化的方式進行組織。關於如何開發和利用以太坊上的 DAO 來執行改進的治理形式，作為一種信任最小化的協調工具，極大地擴展了人們在傳統公司和組織之外的選擇，有許多活躍的研究。

#### 背景閱讀 {#background-reading-16}

- [DAO 簡介](/dao/)

#### 近期研究 {#recent-research-16}

- [繪製 DAO 生態系統地圖](https://www.researchgate.net/publication/358694594_Mapping_out_the_DAO_Ecosystem_and_Assessing_DAO_Autonomy)

### 開發者工具 {#developer-tools}

以太坊開發者的工具正在迅速改善。在這個一般領域有許多活躍的研究和開發工作要做。

#### 背景閱讀 {#background-reading-17}

- [依程式語言分類的工具](/developers/docs/programming-languages/)
- [開發者框架](/developers/docs/frameworks/)
- [去中心化應用程式 (dapp) 簡介](/developers/docs/dapps/)
- [代幣標準](/developers/docs/standards/tokens/)

#### 近期研究 {#recent-research-17}

- [Eth R&D Discord](https://discord.gg/qGpsxSA)
- [以太坊執行 API 規範](https://github.com/ethereum/execution-apis)

### 預言機 {#oracles}

預言機以無需許可且去中心化的方式將鏈下資料匯入區塊鏈。將這些資料放到鏈上，使 dapp 能夠對現實世界的現象做出反應，例如現實世界資產的價格波動、鏈下應用程式中的事件，甚至是天氣的變化。

#### 背景閱讀 {#background-reading-18}

- [預言機簡介](/developers/docs/oracles/)

#### 近期研究 {#recent-research-18}

- [區塊鏈預言機調查](https://arxiv.org/pdf/2004.07140.pdf)

### 應用程式安全性 {#app-security}

以太坊上的駭客攻擊通常是利用個別應用程式中的漏洞，而不是協定本身的漏洞。駭客和應用程式開發者陷入了開發新攻擊和防禦的軍備競賽。這意味著始終需要進行重要的研究和開發，以確保應用程式免受駭客攻擊。

#### 背景閱讀 {#background-reading-19}

- [智能合約安全性](/developers/docs/smart-contracts/security/)
- [Wormhole 漏洞利用報告](https://www.chainalysis.com/blog/wormhole-hack-february-2022/)
- [以太坊合約駭客攻擊事後分析清單](https://forum.openzeppelin.com/t/list-of-ethereum-smart-contracts-post-mortems/1191)
- [Rekt News](https://rekt.news/)

#### 近期研究 {#recent-research-19}

- [Ethresear.ch 應用程式](https://ethresear.ch/c/applications/18)

### 技術堆疊 {#technology-stack}

去中心化整個以太坊技術堆疊是一個重要的研究領域。目前，以太坊上的 dapp 通常有一些中心化點，因為它們依賴於中心化的工具或基礎設施。減少這種依賴意味著讓應用程式在不信任單一提供者的情況下讀取以太坊變得切實可行，這正是輕客戶端和無須信任地存取節點資料發揮作用的地方。

#### 背景閱讀 {#background-reading-20}

- [以太坊堆疊](/developers/docs/ethereum-stack/)
- [輕客戶端](/developers/docs/nodes-and-clients/light-clients/)
- [智能合約簡介](/developers/docs/smart-contracts/)
- [去中心化儲存簡介](/developers/docs/storage/)

#### 近期研究 {#recent-research-20}

- [智能合約可組合性](/developers/docs/smart-contracts/composability/)
- [Coinbase：Web3 堆疊簡介](https://www.coinbase.com/blog/a-simple-guide-to-the-web3-stack)