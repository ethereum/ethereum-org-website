---
title: 以太坊研究的活躍領域
description: 探索開放研究的不同領域，並了解如何參與其中。
lang: zh-tw
---

以太坊的主要優勢之一是活躍的研究與工程社群不斷地對其進行改進。全世界有許多熱情且技術精湛的人希望致力於解決以太坊中尚未解決的問題，但要找出這些問題是什麼並不總是那麼容易。本頁面概述了關鍵的活躍研究領域，作為了解以太坊最前沿技術的粗略指南。

## 以太坊研究如何運作 {#how-ethereum-research-works}

以太坊研究是公開透明的，體現了[去中心化科學 (DeSci)](https://hackernoon.com/desci-decentralized-science-as-our-chance-to-recover-the-real-science)的原則。其文化是盡可能讓研究工具和成果保持開放和互動，例如透過可執行的筆記本。以太坊研究進展迅速，新發現會在 [ethresear.ch](https://ethresear.ch/) 等論壇上公開發布和討論，而不是在經過多輪同儕審查後才透過傳統出版物傳達給社群。

## 一般研究資源 {#general-research-resources}

無論具體主題為何，都可以在 [ethresear.ch](https://ethresear.ch) 和 [Eth R&D Discord 頻道](https://discord.gg/qGpsxSA)找到豐富的以太坊研究資訊。這些是以太坊研究人員討論最新想法和開發機會的主要場所。

這份由 [DelphiDigital](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum) 於 2022 年 5 月發布的報告提供了以太坊路線圖的良好概述。

## 資金來源 {#sources-of-funding}

你可以參與以太坊研究並獲得報酬！例如，[以太坊基金會](/foundation/)最近舉辦了一輪[學術資助](https://esp.ethereum.foundation/academic-grants)。你可以在[以太坊資助頁面](/community/grants/)上找到有關活躍和即將到來的資金機會的資訊。

## 協定研究 {#protocol-research}

協定研究關注以太坊的基礎層——這是一套定義節點如何連接、通訊、交換和儲存以太坊資料，並對區塊鏈狀態達成共識的規則。協定研究分為兩個頂層類別：共識和執行。

### 共識 {#consensus}

共識研究關注[以太坊的權益證明 (PoS) 機制](/developers/docs/consensus-mechanisms/pos/)。一些共識研究主題的範例包括：

- 識別並修補漏洞；
- 量化加密經濟學安全性；
- 提高客戶端實作的安全性或效能；
- 以及開發輕客戶端。

除了前瞻性研究之外，目前也正在研究對協定進行一些根本性的重新設計（例如單槽最終性），以大幅改進以太坊。此外，共識客戶端之間點對點網路的效率、安全性和監控也是重要的研究主題。

#### 背景閱讀 {#background-reading}

- [權益證明簡介](/developers/docs/consensus-mechanisms/pos/)
- [Casper FFG 論文](https://arxiv.org/abs/1710.09437)
- [Casper FFG 解說](https://medium.com/unitychain/intro-to-casper-ffg-9ed944d98b2d)
- [Gasper 論文](https://arxiv.org/abs/2003.03052)

#### 近期研究 {#recent-research}

- [Ethresear.ch 共識](https://ethresear.ch/c/consensus/29)
- [可用性/最終性困境](https://arxiv.org/abs/2009.04987)
- [單槽最終性](https://ethresear.ch/t/a-model-for-cumulative-committee-based-finality/10259)
- [提案者與建構者分離](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)

### 執行 {#execution}

執行層關注於執行交易、運行[以太坊虛擬機 (EVM)](/developers/docs/evm/)，以及產生執行有效負載以傳遞給共識層。有許多活躍的研究領域，包括：

- 建立輕客戶端支援；
- 研究燃料限制；
- 以及整合新的資料結構（例如沃克爾樹）。

#### 背景閱讀 {#background-reading-1}

- [EVM 簡介](/developers/docs/evm)
- [Ethresear.ch 執行層](https://ethresear.ch/c/execution-layer-research/37)

#### 近期研究 {#recent-research-1}

- [資料庫最佳化](https://github.com/ledgerwatch/erigon/blob/devel/docs/programmers_guide/db_faq.md)
- [狀態過期](https://notes.ethereum.org/@vbuterin/state_expiry_eip)
- [實現狀態過期的途徑](https://hackmd.io/@vbuterin/state_expiry_paths)
- [沃克爾樹與狀態過期提案](https://notes.ethereum.org/@vbuterin/verkle_and_state_expiry_proposal)
- [歷史記錄管理](https://eips.ethereum.org/EIPS/eip-4444)
- [沃克爾樹](https://vitalik.eth.limo/general/2021/06/18/verkle.html)
- [資料可用性取樣 (DAS)](https://github.com/ethereum/research/wiki/A-note-on-data-availability-and-erasure-coding)

## 客戶端開發 {#client-development}

以太坊客戶端是以太坊協定的實作。客戶端開發透過將協定研究的成果內建到這些客戶端中，使其成為現實。客戶端開發包括更新客戶端規範以及建構特定的實作。

一個以太坊節點需要運行兩個軟體：

1. 一個共識客戶端，用於追蹤區塊鏈的頂端、廣播區塊並處理共識邏輯
2. 一個執行客戶端，用於支援以太坊虛擬機並執行交易和智能合約

有關節點和客戶端的更多詳細資訊，以及所有目前客戶端實作的清單，請參閱[節點與客戶端頁面](/developers/docs/nodes-and-clients/)。你也可以在[歷史頁面](/ethereum-forks/)上找到所有以太坊升級的歷史記錄。

### 執行客戶端 {#execution-clients}

- [執行客戶端規範](https://github.com/ethereum/execution-specs)
- [執行 API 規範](https://github.com/ethereum/execution-apis)

### 共識客戶端 {#consensus-clients}

- [共識客戶端規範](https://github.com/ethereum/consensus-specs)
- [信標鏈 API 規範](https://ethereum.github.io/beacon-APIs/#/Beacon/getStateRoot)

## 擴容與效能 {#scaling-and-performance}

擴容以太坊是以太坊研究人員關注的一大領域。目前的方法包括將交易卸載到匯總上，並使用資料斑點 (data blobs) 使其盡可能便宜。有關擴容以太坊的介紹資訊，請參閱我們的[擴容頁面](/developers/docs/scaling)。

### 第二層 (L2) {#layer-2}

現在有幾個第二層 (L2) 協定使用不同的技術來批次處理交易，並在以太坊第一層 (L1) 上確保其安全性，藉此擴容以太坊。這是一個快速成長的主題，具有很大的研究和開發潛力。

#### 背景閱讀 {#background-reading-2}

- [第二層 (L2) 簡介](/layer-2/)
- [Polynya：匯總、DA 與模組化鏈](https://polynya.medium.com/rollups-data-availability-layers-modular-blockchains-introductory-meta-post-5a1e7a60119d)

#### 近期研究 {#recent-research-2}

- [Arbitrum 排序器的公平排序](https://eprint.iacr.org/2021/1465)
- [Ethresear.ch 第二層 (L2)](https://ethresear.ch/c/layer-2/32)
- [以匯總為中心的路線圖](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698)
- [L2BEAT](https://l2beat.com/)

### 跨鏈橋 {#bridges}

第二層 (L2) 中一個特別需要更多研究和開發的領域是安全且高效能的跨鏈橋。這包括各種第二層 (L2) 之間的跨鏈橋，以及第一層 (L1) 和第二層 (L2) 之間的跨鏈橋。這是一個特別重要的研究領域，因為跨鏈橋經常成為駭客攻擊的目標。

#### 背景閱讀 {#background-reading-3}

- [區塊鏈跨鏈橋簡介](/bridges/)
- [Vitalik 談跨鏈橋](https://old.reddit.com/r/ethereum/comments/rwojtk/ama_we_are_the_efs_research_team_pt_7_07_january/hrngyk8/)
- [區塊鏈跨鏈橋文章](https://medium.com/1kxnetwork/blockchain-bridges-5db6afac44f8)
- [跨鏈橋中的鎖倉價值](<https://dune.com/eliasimos/Bridge-Away-(from-Ethereum)>)

#### 近期研究 {#recent-research-3}

- [驗證跨鏈橋](https://stonecoldpat.github.io/images/validatingbridges.pdf)

### 分片 {#sharding}

對以太坊區塊鏈進行分片長期以來一直是開發路線圖的一部分。然而，像「丹克分片」這樣的新擴容解決方案目前正佔據中心舞台。

被稱為原始 Danksharding 的完整丹克分片前身，已隨著 Cancun-Deneb（「Dencun」）網路升級上線。

[更多關於 Dencun 升級的資訊](/roadmap/dencun/)

#### 背景閱讀 {#background-reading-4}

- [原始 Danksharding 筆記](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq)
- [Bankless 丹克分片影片](https://www.youtube.com/watch?v=N5p0TB77flM)
- [以太坊分片研究彙編](https://notes.ethereum.org/@serenity/H1PGqDhpm?type=view)
- [丹克分片 (Polynya)](https://polynya.medium.com/danksharding-36dc0c8067fe)

#### 近期研究 {#recent-research-4}

- [EIP-4844：原始 Danksharding](https://eips.ethereum.org/EIPS/eip-4844)
- [Vitalik 談分片與資料可用性取樣](https://hackmd.io/@vbuterin/sharding_proposal)

### 硬體 {#hardware}

在普通的硬體上[運行節點](/developers/docs/nodes-and-clients/run-a-node/)是保持以太坊去中心化的基礎。因此，積極研究如何最小化運行節點的硬體要求是一個重要的研究領域。

#### 背景閱讀 {#background-reading-5}

- [ARM 上的以太坊](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)

#### 近期研究 {#recent-research-5}

- [FPGA 上的 ECDSA](https://ethresear.ch/t/does-ecdsa-on-fpga-solve-the-scaling-problem/6738)

## 安全性 {#security}

安全性是一個廣泛的主題，可能包括防止垃圾訊息/詐騙、錢包安全、硬體安全、加密經濟學安全、尋找漏洞以及測試應用程式和客戶端軟體，還有金鑰管理。為這些領域的知識做出貢獻將有助於促進主流採用。

### 密碼學與 ZKP {#cryptography--zkp}

零知識證明 (ZKP) 和密碼學對於在以太坊及其應用程式中建立隱私和安全性至關重要。零知識是一個相對年輕但發展迅速的領域，擁有許多開放的研究和開發機會。一些可能性包括開發更有效率的 [Keccak 雜湊運算演算法](https://hackmd.io/sK7v0lr8Txi1bgION1rRpw?view#Overview)實作、尋找比目前更好的多項式承諾，或降低 ECDSA 公鑰生成和簽章驗證電路的成本。

#### 背景閱讀 {#background-reading-6}

- [0xparc 部落格](https://0xparc.org/blog)
- [zkp.science](https://zkp.science/)
- [Zero Knowledge Podcast](https://zeroknowledge.fm/)

#### 近期研究 {#recent-research-6}

- [橢圓曲線密碼學的最新進展](https://ethresear.ch/t/the-ec-fft-algorithm-without-elliptic-curve-and-isogenies/11346)
- [Ethresear.ch ZK](https://ethresear.ch/c/zk-s-nt-arks/13)

### 錢包 {#wallets}

以太坊錢包可以是瀏覽器擴充功能、桌面和行動應用程式，或是以太坊上的智能合約。目前正積極研究社交恢復錢包，以降低與個人使用者金鑰管理相關的一些風險。與錢包開發相關的是對帳戶抽象化替代形式的研究，這是一個重要的新興研究領域。

#### 背景閱讀 {#background-reading-7}

- [錢包簡介](/wallets/)
- [錢包安全簡介](/security/)
- [Ethresear.ch 安全性](https://ethresear.ch/tag/security)
- [EIP-2938 帳戶抽象化](https://eips.ethereum.org/EIPS/eip-2938)
- [EIP-4337 帳戶抽象化](https://eips.ethereum.org/EIPS/eip-4337)

#### 近期研究 {#recent-research-7}

- [專注於驗證的智能合約錢包](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)
- [帳戶的未來](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)
- [EIP-3074 AUTH 與 AUTHCALL 操作碼](https://eips.ethereum.org/EIPS/eip-3074)
- [在 EOA 地址發布程式碼](https://eips.ethereum.org/EIPS/eip-5003)

## 社群、教育與推廣 {#community-education-and-outreach}

將新使用者入門引導至以太坊需要新的教育資源和推廣方法。這可能包括部落格文章和報導、書籍、Podcast、迷因、教學資源、事件，以及任何其他能建立社群、歡迎新手並教育人們了解以太坊的事物。

### UX/UI {#uxui}

為了讓更多人入門引導至以太坊，生態系統必須改善 UX/UI。這將需要設計師和產品專家重新審視錢包和應用程式的設計。

#### 背景閱讀 {#background-reading-8}

- [Ethresear.ch UX/UI](https://ethresear.ch/c/ui-ux/24)

#### 近期研究 {#recent-research-8}

- [Web3 Design Discord](https://discord.gg/FsCFPMTSm9)
- [Web3 設計原則](https://www.web3designprinciples.com/)
- [Ethereum Magicians UX 討論](https://ethereum-magicians.org/t/og-council-ux-follow-up/9032/3)

### 經濟學 {#economics}

以太坊的經濟學研究大致遵循兩種方法：驗證依賴經濟誘因的機制安全性（「個體經濟學」），以及分析協定、應用程式和使用者之間的價值流動（「總體經濟學」）。與以太坊原生資產（以太幣）及其之上建構的代幣（例如 NFT 和 ERC-20 代幣）相關的加密經濟學因素非常複雜。

#### 背景閱讀 {#background-reading-9}

- [穩健誘因小組 (Robust Incentives Group)](https://rig.ethereum.org/)
- [Devconnect 上的 ETHconomics 工作坊](https://www.youtube.com/playlist?list=PLTLjFJ0OQOj5PHRvA2snoOKt2udVsyXEm)

#### 近期研究 {#recent-research-9}

- [EIP-1559 的實證分析](https://arxiv.org/abs/2201.05574)
- [流通供應量均衡](https://ethresear.ch/t/circulating-supply-equilibrium-for-ethereum-and-minimum-viable-issuance-during-the-proof-of-stake-era/10954)
- [量化 MEV：這座森林有多黑暗？](https://arxiv.org/abs/2101.05511)

### 區塊空間與手續費市場 {#blockspace-fee-markets}

區塊空間市場管理終端使用者交易的納入，無論是直接在以太坊（第一層 (L1)）上，還是在橋接網路（例如匯總（第二層 (L2)））上。在以太坊上，交易會提交到作為 EIP-1559 部署在協定內的手續費市場，以保護鏈免受垃圾訊息的影響並為網路擁塞定價。在這兩層上，交易可能會產生外部性，稱為最大可提取價值 (MEV)，這會引發新的市場結構來捕獲或管理這些外部性。

#### 背景閱讀 {#background-reading-10}

- [以太坊區塊鏈的交易手續費機制設計：EIP-1559 的經濟學分析 (Tim Roughgarden, 2020)](https://timroughgarden.org/papers/eip1559.pdf)
- [EIP-1559 模擬 (穩健誘因小組)](https://ethereum.github.io/abm1559)
- [從第一性原理看匯總經濟學](https://barnabe.substack.com/p/understanding-rollup-economics-from?utm_source=url)
- [快閃男孩 2.0：去中心化交易所中的搶先交易、交易重排與共識不穩定性](https://arxiv.org/abs/1904.05234)

#### 近期研究 {#recent-research-10}

- [多維度 EIP-1559 影片簡報](https://youtu.be/QbR4MTgnCko)
- [跨網域 MEV](https://arxiv.org/abs/2112.01472)
- [MEV 拍賣](https://ethresear.ch/t/mev-auction-auctioning-transaction-ordering-rights-as-a-solution-to-miner-extractable-value/6788)

### 權益證明誘因 {#proof-of-stake-incentives}

驗證者使用以太坊的原生資產（以太幣）作為抵押品，以防止不誠實的行為。這種機制的加密經濟學決定了網路的安全性。經驗豐富的驗證者可能可以利用誘因層的細微差別來發動明確的攻擊。

#### 背景閱讀 {#background-reading-11}

- [以太坊經濟學大師班與經濟模型](https://github.com/CADLabs/ethereum-economic-model)
- [PoS 誘因模擬 (穩健誘因小組)](https://ethereum.github.io/beaconrunner/)

#### 近期研究 {#recent-research-11}

- [在提案者與建構者分離 (PBS) 下提高交易的抗審查性](https://notes.ethereum.org/s3JToeApTx6CKLJt8AbhFQ)
- [對 PoS 以太坊的三種攻擊](https://arxiv.org/abs/2110.10086)

### 流動性質押與衍生品 {#liquid-staking-and-derivatives}

流動性質押允許擁有少於 32 ETH 的使用者，透過將以太幣兌換為代表已質押以太幣的代幣（可用於去中心化金融 (DeFi) 中）來獲得質押收益。然而，與流動性質押相關的誘因和市場動態，以及其對以太坊安全性的影響（例如中心化風險），仍在探索中。

#### 背景閱讀 {#background-reading-12}

- [Ethresear.ch 流動性質押](https://ethresear.ch/search?q=liquid%20staking)
- [Lido：通往無須信任的以太坊質押之路](https://blog.lido.fi/the-road-to-trustless-ethereum-staking/)
- [Rocket Pool：質押協定簡介](https://medium.com/rocket-pool/rocket-pool-staking-protocol-part-1-8be4859e5fbd)

#### 近期研究 {#recent-research-12}

- [處理從 Lido 的提款](https://ethresear.ch/t/handling-withdrawals-in-lidos-eth-liquid-staking-protocol/8873)
- [提款憑證](https://ethresear.ch/t/withdrawal-credential-rotation-from-bls-to-eth1/8722)
- [流動性質押衍生品的風險](https://notes.ethereum.org/@djrtwo/risks-of-lsd)

## 測試 {#testing}

### 形式化驗證 {#formal-verification}

形式化驗證是編寫程式碼來驗證以太坊的共識規範是否正確且無錯誤。有一個用 Python 編寫的規範可執行版本，需要維護和開發。進一步的研究可以幫助改進規範的 Python 實作，並添加能夠更穩健地驗證正確性並識別問題的工具。

#### 背景閱讀 {#background-reading-13}

- [形式化驗證簡介](https://ptolemy.berkeley.edu/projects/embedded/research/vis/doc/VisUser/vis_user/node4.html)
- [形式化驗證 (Intel)](https://www.cl.cam.ac.uk/~jrh13/papers/mark10.pdf)

#### 近期研究 {#recent-research-13}

- [存款合約的形式化驗證](https://github.com/runtimeverification/deposit-contract-verification)
- [信標鏈規範的形式化驗證](https://github.com/runtimeverification/deposit-contract-verification)

## 資料科學與分析 {#data-science-and-analytics}

我們需要更多資料分析工具和儀表板，以提供有關以太坊上活動和網路健康狀況的詳細資訊。

### 背景閱讀 {#background-reading-14}

- [Dune Analytics](https://dune.com/browse/dashboards)
- [客戶端多樣性儀表板](https://clientdiversity.org/)

#### 近期研究 {#recent-research-14}

- [穩健誘因小組資料分析](https://rig.ethereum.org/)

## 應用程式與工具 {#apps-and-tooling}

應用程式層支援一個多樣化的程式生態系統，這些程式在以太坊的基礎層上結算交易。開發團隊不斷尋找利用以太坊的新方法，以創建重要 Web2 應用程式的可組合的、無需許可且抗審查的版本，或創建全新的 Web3 原生概念。同時，正在開發的新工具使得在以太坊上建構去中心化應用程式 (dapp) 變得不那麼複雜。

### DeFi {#defi}

去中心化金融 (DeFi) 是建構在以太坊之上的主要應用程式類別之一。DeFi 旨在創建可組合的「金錢樂高」，允許使用者使用智能合約來儲存、轉帳、借貸和投資加密資產。DeFi 是一個快速發展且不斷更新的領域。持續需要對安全、高效且易於存取的協定進行研究。

#### 背景閱讀 {#background-reading-15}

- [DeFi](/defi/)
- [Coinbase：什麼是 DeFi？](https://www.coinbase.com/learn/crypto-basics/what-is-defi)

#### 近期研究 {#recent-research-15}

- [去中心化金融，中心化所有權？](https://arxiv.org/pdf/2012.09306.pdf)
- [Optimism：通往低於一美元交易之路](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92)

### DAO {#daos}

以太坊一個具影響力的使用案例是能夠透過使用 DAO 以去中心化的方式進行組織。目前有許多活躍的研究探討如何開發和利用以太坊上的 DAO 來執行改進的治理形式，作為一種信任最小化的協調工具，這極大地擴展了人們在傳統公司和組織之外的選擇。

#### 背景閱讀 {#background-reading-16}

- [DAO 簡介](/dao/)
- [DAO Collective](https://daocollective.xyz/)

#### 近期研究 {#recent-research-16}

- [繪製 DAO 生態系統地圖](https://www.researchgate.net/publication/358694594_Mapping_out_the_DAO_Ecosystem_and_Assessing_DAO_Autonomy)

### 開發者工具 {#developer-tools}

以太坊開發者的工具正在迅速改進。在這個總體領域中，有許多活躍的研究和開發工作要做。

#### 背景閱讀 {#background-reading-17}

- [依程式語言分類的工具](/developers/docs/programming-languages/)
- [開發者框架](/developers/docs/frameworks/)
- [共識開發者工具清單](https://github.com/ConsenSys/ethereum-developer-tools-list)
- [代幣標準](/developers/docs/standards/tokens/)
- [CryptoDevHub：EVM 工具](https://cryptodevhub.io/wiki/ethereum-virtual-machine-tools)

#### 近期研究 {#recent-research-17}

- [Eth R&D Discord 共識工具頻道](https://discordapp.com/channels/595666850260713488/746343380900118528)

### 預言機 {#oracles}

預言機以無需許可且去中心化的方式將鏈下資料匯入區塊鏈。將這些資料放到鏈上，使得去中心化應用程式 (dapp) 能夠對現實世界的現象做出反應，例如現實世界資產的價格波動、鏈下應用程式中的事件，甚至是天氣的變化。

#### 背景閱讀 {#background-reading-18}

- [預言機簡介](/developers/docs/oracles/)

#### 近期研究 {#recent-research-18}

- [區塊鏈預言機調查](https://arxiv.org/pdf/2004.07140.pdf)
- [切林克 (Chainlink) 白皮書](https://chain.link/whitepaper)

### 應用程式安全 {#app-security}

對以太坊的駭客攻擊通常是利用個別應用程式中的漏洞，而不是協定本身的漏洞。駭客和應用程式開發者陷入了一場開發新攻擊和防禦手段的軍備競賽。這意味著始終需要進行重要的研究和開發，以確保應用程式免受駭客攻擊。

#### 背景閱讀 {#background-reading-19}

- [Wormhole 漏洞利用報告](https://blog.chainalysis.com/reports/wormhole-hack-february-2022/)
- [以太坊合約駭客攻擊事後分析清單](https://forum.openzeppelin.com/t/list-of-ethereum-smart-contracts-post-mortems/1191)
- [Rekt News](https://x.com/RektHQ?s=20&t=3otjYQdM9Bqk8k3n1a1Adg)

#### 近期研究 {#recent-research-19}

- [Ethresear.ch 應用程式](https://ethresear.ch/c/applications/18)

### 技術堆疊 {#technology-stack}

將整個以太坊技術堆疊去中心化是一個重要的研究領域。目前，以太坊上的去中心化應用程式 (dapp) 通常存在一些中心化點，因為它們依賴中心化的工具或基礎設施。

#### 背景閱讀 {#background-reading-20}

- [以太坊堆疊](/developers/docs/ethereum-stack/)
- [Coinbase：Web3 堆疊簡介](https://blog.coinbase.com/a-simple-guide-to-the-web3-stack-785240e557f0)
- [智能合約簡介](/developers/docs/smart-contracts/)
- [去中心化儲存簡介](/developers/docs/storage/)

#### 近期研究 {#recent-research-20}

- [智能合約可組合性](/developers/docs/smart-contracts/composability/)