---
title: 以太坊研究的活躍領域
description: 探索不同領域的開放研究，並瞭解如何參與。
lang: zh-tw
---

# 以太坊研究的活躍領域 {#active-areas-of-ethereum-research}

以太坊的其中一個主要優勢是有活躍的研究和工程社群在持續改進以太坊。 來自世界各地的許多熱情、有才能的人們都致力於解決以太坊中的未解問題，但找出這些問題有時並不容易。 此頁面概述了關鍵的活躍研究領域，粗略介紹以太坊的前沿資訊。

## 以太坊研究如何進行 {#how-ethereum-research-works}

以太坊研究是公開透明的，體現了 [去中心化科研 (DeSci)](https://hackernoon.com/desci-decentralized-science-as-our-chance-to-recover-the-real-science) 的原則。 這種文化使研究工具和產出盡可能開放且可以互動，例如透過可執行筆記本達成此目的。 以太坊研究進步非常迅速，新的發現都會在開放論壇如 [ethresear.ch](https://ethresear.ch/) 上發文和討論，而非經過多輪同行評審後，再透過傳統出版物傳達給社群。

## 一般研究資源 {#general-research-resources}

不論是哪個特定主題，在 [ethresear.ch](https://ethresear.ch) 和 [以太坊研發 Discord 頻道](https://discord.gg/qGpsxSA) 都能獲得大量關於以太坊研究的資訊。 這些是以太坊研究者討論最新想法和開發機會的主要場所。

這份由 [DelphiDigital](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum) 在 2022 年 5 月發佈的報告詳細地介紹了以太坊開發藍圖。

## 資金來源 {#sources-of-funding}

你可以參與以太坊研究並獲得報酬！ 舉例來說，[以太坊基金會](/foundation/) 最近舉行了 [一輪學術募資](https://esp.ethereum.foundation/academic-grants)。 你可以在 [以太坊資助頁面](/community/grants/) 找到有關目前和即將到來的募資機會的資訊。

## 協定研究 {#protocol-research}

協定研究涉及以太坊的基礎層 - 定義了節點如何連線、通訊、交換和儲存以太坊資料，並就區塊鏈狀態達成共識的一組規則。 協定研究分為兩大類別：共識和執行。

### 共識 {#consensus}

共識研究涉及 [以太坊權益證明機制](/developers/docs/consensus-mechanisms/pos/)。 一些共識研究主題如下：

- 識別和修復漏洞；
- 量化加密經濟安全；
- 提高用戶端實作的安全性或效能；
- 以及開發輕量用戶端。

除了前瞻性研究外，以太坊也在研究如何重新設計一些基本協定，例如單一時隙最確定性，以實作以太坊的重大改進。 此外，效率、安全和監控共識用戶端之間的點對點網路也是重要的研究課題。

#### 背景介紹讀物 {#background-reading}

- [權益證明簡介](/developers/docs/consensus-mechanisms/pos/)
- [Casper-FFG paper](https://arxiv.org/abs/1710.09437)
- [Casper-FFG 說明](https://arxiv.org/abs/1710.09437)
- [Gasper 論文](https://arxiv.org/abs/2003.03052)

#### 近期研究 {#recent-research}

- [Ethresear.ch 共識](https://ethresear.ch/c/consensus/29)
- [可用性/最終確定性兩難問題](https://arxiv.org/abs/2009.04987)
- [單一時隙最終確定性](https://ethresear.ch/t/a-model-for-cumulative-committee-based-finality/10259)
- [提交者-建置者分離](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)

### 執行 {#execution}

執行層負責執行交易，運行 [以太坊虛擬機 (EVM)](/developers/docs/evm/)，以及產生執行有效負載以傳遞給共識層。 活躍的研究領域有很多，包括：

- 發展輕量用戶端支援；
- 研究燃料限制；
- 以及與新資料結構的相容性（如沃克爾樹）。

#### 背景介紹讀物 {#background-reading-1}

- [以太坊虛擬機介紹](/developers/docs/evm)
- [Ethresear.ch 執行層](https://ethresear.ch/c/execution-layer-research/37)

#### 近期研究 {#recent-research-1}

- [資料庫最佳化](https://github.com/ledgerwatch/erigon/blob/devel/docs/programmers_guide/db_faq.md)
- [狀態過期](https://notes.ethereum.org/@vbuterin/state_expiry_eip)
- [狀態過期的路徑](https://hackmd.io/@vbuterin/state_expiry_paths)
- [沃克爾樹和狀態過期提案](https://notes.ethereum.org/@vbuterin/verkle_and_state_expiry_proposal)
- [歷史紀錄管理](https://eips.ethereum.org/EIPS/eip-4444)
- [沃克爾樹](https://vitalik.eth.limo/general/2021/06/18/verkle.html)
- [資料可用性取樣](https://github.com/ethereum/research/wiki/A-note-on-data-availability-and-erasure-coding)

## 用戶端開發 {#client-development}

以太坊用戶端是以太坊協定的協定。 用戶端開發將協定研究的成果建置於用戶端中，以實作這些成果。 用戶端開發包括了更新用戶端規範和建置特定實作。

以太坊節點需要執行兩個軟體：

1. 能夠追蹤區塊鏈頭部、廣播區塊以及處理共識邏輯的共識用戶端
2. 支援以太坊虛擬機和執行交易及智慧型合約的執行用戶端

查看 [節點及用戶端頁面](/developers/docs/nodes-and-clients/) 以獲得關於節點和用戶端的詳細資訊，以及所有目前用戶端實作的清單。 你也可以在 [歷史紀錄頁面](/history/) 找到以太坊的所有升級的歷史紀錄。

### 執行用戶端 {#execution-clients}

- [執行用戶端規範](https://github.com/ethereum/execution-specs)
- [執行應用程式介面規範](https://github.com/ethereum/execution-apis)

### 共識用戶端 {#consensus-clients}

- [共識用戶端規範](https://github.com/ethereum/consensus-specs)
- [信標應用程式介面規範](https://ethereum.github.io/beacon-APIs/#/Beacon/getStateRoot)

## 擴容與效能 {#scaling-and-performance}

擴容以太坊是以太坊研究者關注的重大領域。 目前的方法包括將交易轉移到卷軸上，以及透過資料二進位大型物件讓交易儘可能便宜。 擴容以太坊的相關介紹可以在 [擴容頁面](/developers/docs/scaling) 查看。

### 二層網路 {#layer-2}

目前有多種二層網路協定透過使用不同技術在一層網路上實現批量交易並確保交易，來擴容以太坊。 這是個快速發展的主題，且有很大的研究及開發潛力。

#### 背景介紹讀物 {#background-reading-2}

- [二層網路簡介](/layer-2/)
- [Polynya：卷軸、資料可用性和模組化鏈](https://polynya.medium.com/rollups-data-availability-layers-modular-blockchains-introductory-meta-post-5a1e7a60119d)

#### 近期研究 {#recent-research-2}

- [排序者的 Arbitrum 公平排序](https://eprint.iacr.org/2021/1465)
- [ethresear.ch 二層網路](https://ethresear.ch/c/layer-2/32)
- [以卷軸為中心的開發藍圖](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698)
- [L2Beat](https://l2beat.com/)

### 跨鏈橋 {#bridges}

二層網路需要更多研究和開發的一個特別領域是安全有效的跨鏈橋。 這包含了各種二層網路之間的跨鏈橋，以及一層網路和二層網路之間的跨鏈橋。 這是一個特別重要的研究領域，因為跨鏈橋通常是駭客的攻擊目標。

#### 背景介紹讀物 {#background-reading-3}

- [區塊鏈跨鏈橋簡介](/bridges/)
- [Vitalik 討論跨鏈橋](https://old.reddit.com/r/ethereum/comments/rwojtk/ama_we_are_the_efs_research_team_pt_7_07_january/hrngyk8/)
- [區塊鏈跨鏈橋文章](https://medium.com/1kxnetwork/blockchain-bridges-5db6afac44f8)
- [跨鏈橋中鎖定之資金](https://dune.com/eliasimos/Bridge-Away-\(from-Ethereum\))

#### 近期研究 {#recent-research-3}

- [驗證跨鏈橋](https://stonecoldpat.github.io/images/validatingbridges.pdf)

### 分片 {#sharding}

以太坊區塊鏈分片一直都是開發藍圖的一部分。 然而，新的擴容解決方案如「Danksharding」正是目前的焦點。

全面 Danksharding 的前身稱為 Proto-Danksharding，已隨著 Cancun-Deneb（「坎昆」）網路升級上線。

[更多有關坎昆升級的資訊](/roadmap/dencun/)

#### 背景介紹讀物 {#background-reading-4}

- [Proto-Danksharding 筆記](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq)
- [去銀行化 Danksharding 影片](https://www.youtube.com/watch?v=N5p0TB77flM)
- [以太坊分片研究概要](https://notes.ethereum.org/@serenity/H1PGqDhpm?type=view)
- [Danksharding (Polynya)](https://polynya.medium.com/danksharding-36dc0c8067fe)

#### 近期研究 {#recent-research-4}

- [EIP-4844: Proto-Danksharding](https://eips.ethereum.org/EIPS/eip-4844)
- [Vitalik 討論分片與資料可用性取樣](https://hackmd.io/@vbuterin/sharding_proposal)

### 硬體 {#hardware}

在普通的硬體上 [運行節點](/developers/docs/nodes-and-clients/run-a-node/) 是使以太坊保持去中心化的基礎。 所以，最大程度上降低運行節點的硬體需求的活躍研究是重要的研究領域。

#### 背景介紹讀物 {#background-reading-5}

- [ARM 架構上的以太坊](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)

#### 近期研究 {#recent-research-5}

- [FPGA 上的橢圓曲線數位簽章演算法](https://ethresear.ch/t/does-ecdsa-on-fpga-solve-the-scaling-problem/6738)

## 安全性 {#security}

安全性是個廣泛的議題，可能包含了垃圾郵件/詐騙預防、錢包安全、硬體安全、加密經濟安全、漏洞懸賞、應用程式和用戶端軟體的偵錯和測試及金鑰管理。 貢獻這些領域的知識將有助於加速主流採用。

### 密碼學與零知識證明 {#cryptography--zkp}

零知識證明 (ZKP) 和密碼學都對在以太坊和其應用程式上實現隱私性及安全性非常重要。 零知識是一個相對新穎但快速發展的領域，有許多開放研究與開發機會。 一些可能的機會包括開發更高效的 [Keccak 雜湊演算法](https://hackmd.io/sK7v0lr8Txi1bgION1rRpw?view#Overview) 實作、找到比現存更好的多項式承諾，或降低產生橢圓曲線簽章演算法公鑰和簽章驗證電路的成本。

#### 背景介紹讀物 {#background-reading-6}

- [0xparc 部落格](https://0xparc.org/blog)
- [zkp.science](https://zkp.science/)
- [零知識播客](https://zeroknowledge.fm/)

#### 近期研究 {#recent-research-6}

- [橢圓曲線密碼學的近期進展](https://ethresear.ch/t/the-ec-fft-algorithm-without-elliptic-curve-and-isogenies/11346)
- [Ethresear.ch 零知識](https://ethresear.ch/c/zk-s-nt-arks/13)

### 錢包 {#wallets}

以太坊錢包可以是瀏覽器擴充功能、桌上型電腦和行動應用程式，又或者是以太坊上的智慧型合約。 目前正在積極研究社交恢復錢包，該錢包可以降低與個人使用者金鑰管理相關的風險。 與錢包開發相關的是研究帳戶抽象的替代形式，這是新興研究的一個重要領域。

#### 背景介紹讀物 {#background-reading-7}

- [錢包簡介](/wallets/)
- [錢包安全簡介](/security/)
- [ethresear.ch 安全性](https://ethresear.ch/tag/security)
- [EIP-2938 帳戶抽象](https://eips.ethereum.org/EIPS/eip-2938)
- [EIP-4337 帳戶抽象](https://eips.ethereum.org/EIPS/eip-4337)

#### 近期研究 {#recent-research-7}

- [專注於智慧型合約錢包的驗證](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)
- [帳戶的未來](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)
- [EIP-3074 AUTH 和 AUTHCALL 操作碼](https://eips.ethereum.org/EIPS/eip-3074)
- [在外部帳戶地址發佈程式碼](https://eips.ethereum.org/EIPS/eip-5003)

## 社群、教育及外展 {#community-education-and-outreach}

讓新的使用者加入以太坊需要新的教育資源及外展方法。 這可能包括部落格文章、書籍、播客、迷因、教學資源、活動以及任何建構社群、迎接新手及教授人們以太坊相關知識所需的資源。

### 使用者體驗/介面 {#uxui}

為了讓更多人加入以太坊生態系統，必須改進使用者體驗/介面。 這需要設計師和產品專家重新檢視錢包和應用程式的設計。

#### 背景介紹讀物 {#background-reading-8}

- [Ethresear.ch 使用者體驗/介面](https://ethresear.ch/c/ui-ux/24)

#### 近期研究 {#recent-research-8}

- [Web3 設計 Discord](https://discord.gg/FsCFPMTSm9)
- [Web3 設計原則](https://www.web3designprinciples.com/)
- [Ethereum Magicians 使用者體驗討論](https://ethereum-magicians.org/t/og-council-ux-follow-up/9032/3)

### 經濟學 {#economics}

以太坊的經濟學研究主要遵循兩種方法：驗證依賴經濟激勵之機制的安全性（「微觀經濟學」），以及分析協定、應用程式和使用者間的價值流動（「宏觀經濟學」）。 以太坊的原生資產（以太幣）和基於以太幣建構的代幣（例如非同質化代幣和 ERC20 代幣）存在著複雜的加密經濟因素。

#### 背景介紹讀物 {#background-reading-9}

- [穩健激勵群組](https://ethereum.github.io/rig/)
- [Devconnect 上的 ETHconomics 研討會](https://www.youtube.com/playlist?list=PLTLjFJ0OQOj5PHRvA2snoOKt2udVsyXEm)

#### 近期研究 {#recent-research-9}

- [EIP1559 的實證分析](https://arxiv.org/abs/2201.05574)
- [流通供應量平衡](https://ethresear.ch/t/circulating-supply-equilibrium-for-ethereum-and-minimum-viable-issuance-during-the-proof-of-stake-era/10954)
- [量化最大可提取價值：森林究竟有多黑暗？](https://arxiv.org/abs/2101.05511)

### 區塊空間與費用市場 {#blockspace-fee-markets}

區塊空間市場管理最終使用者交易的納入，無論是直接在以太坊（一層網路）上還是在橋接網路上，例如卷軸（二層網路）。 在以太坊上，交易會被提交到作為 EIP-1559 部署的費用市場，以保護鏈免於垃圾郵件及定價堵塞。 在這兩層上，交易都可能產生外部效應，如最大可提取價值 (MEV)，這會導致產生新的市場結構來獲取或管理這些外部效應。

#### 背景介紹讀物 {#background-reading-10}

- [為以太坊區塊鏈設計的交易費機制：EIP-1559 的經濟學分析（Tim Roughgarden，2020 年）](https://timroughgarden.org/papers/eip1559.pdf)
- [EIP-1559 模擬（穩健激勵群組）](https://ethereum.github.io/abm1559)
- [由第一原理瞭解卷軸經濟](https://barnabe.substack.com/p/understanding-rollup-economics-from?utm_source=url)
- [Flash Boys 2.0：去中心化交易所的交易搶跑、交易重新排序和共識不穩定性](https://arxiv.org/abs/1904.05234)

#### 近期研究 {#recent-research-10}

- [多維度 EIP-1559 影片展示](https://youtu.be/QbR4MTgnCko)
- [跨域最大可提取價值](http://arxiv.org/abs/2112.01472)
- [最大可提取價值競價](https://ethresear.ch/t/mev-auction-auctioning-transaction-ordering-rights-as-a-solution-to-miner-extractable-value/6788)

### 權益證明激勵 {#proof-of-stake-incentives}

驗證者使用以太坊的原生資產（以太幣）作為對抗不誠實行為的抵押品。 其加密經濟學決定了網路的安全性。 經驗老道的驗證者可利用激勵層的細微差別發動明確的攻擊。

#### 背景介紹讀物 {#background-reading-11}

- [精通以太坊經濟學課程與經濟模型](https://github.com/CADLabs/ethereum-economic-model)
- [權益證明激勵模擬（穩健激勵群組）](https://ethereum.github.io/beaconrunner/)

#### 近期研究 {#recent-research-11}

- [在提交者/建置者分離 (PBS) 機制下提升交易的抗審查性](https://notes.ethereum.org/s3JToeApTx6CKLJt8AbhFQ)
- [權益證明以太坊上的三種攻擊方式](https://arxiv.org/abs/2110.10086)

### 流動性質押和衍生品 {#liquid-staking-and-derivatives}

流動性質押藉由將以太幣兌換成一種代表質押以太幣，且可以用於去中心化金融的代幣，讓持有低於 32 個以太幣的使用者也能獲得質押收益。 然而，流動性質押相關的激勵和市場動態仍在發掘階段，它對以太坊安全性的影響（例如中心化風險）亦然。

#### 背景介紹讀物 {#background-reading-12}

- [Ethresear.ch 流動性質押](https://ethresear.ch/search?q=liquid%20staking)
- [Lido：邁向去信任的以太坊質押之路](https://blog.lido.fi/the-road-to-trustless-ethereum-staking/)
- [Rocket Pool：質押協定介紹](https://medium.com/rocket-pool/rocket-pool-staking-protocol-part-1-8be4859e5fbd)

#### 近期研究 {#recent-research-12}

- [處理從 Lido 提款](https://ethresear.ch/t/handling-withdrawals-in-lidos-eth-liquid-stake-protocol/8873)
- [提款憑證](https://ethresear.ch/t/withdrawal-credential-rotation-from-bls-to-eth1/8722)
- [流動性質押衍生品的風險](https://notes.ethereum.org/@djrtwo/risks-of-lsd)

## 測試 {#testing}

### 形式化驗證 {#formal-verification}

形式化驗證透過編寫程式碼來驗證以太坊共識規範正確無誤且沒有錯誤。 此規範有個以 Python 撰寫的可執行版本，需要維護和開發。 進一步的研究可以幫助改進規範的 Python 實作，並新增一些能夠更穩健地驗證正確性和偵測問題的工具。

#### 背景介紹讀物 {#background-reading-13}

- [形式化驗證簡介](https://ptolemy.berkeley.edu/projects/embedded/research/vis/doc/VisUser/vis_user/node4.html)
- [形式化驗證 (Intel)](https://www.cl.cam.ac.uk/~jrh13/papers/mark10.pdf)

#### 近期研究 {#recent-research-13}

- [存款合約的形式化驗證](https://github.com/runtimeverification/deposit-contract-verification)
- [信標鏈規範的形式化驗證](https://github.com/runtimeverification/deposit-contract-verification)

## 資料科學與分析 {#data-science-and-analytics}

需要更多能夠提供以太坊活動及網路健康度詳細資訊的資料分析工具和儀表板。

### 背景介紹讀物 {#background-reading-14}

- [Dune Analytics](https://dune.com/browse/dashboards)
- [用戶端多樣性儀表板](https://clientdiversity.org/)

#### 近期研究 {#recent-research-14}

- [穩健激勵群組資料分析](https://ethereum.github.io/rig/)

## 應用程式和工具 {#apps-and-tooling}

應用層支援多種程式生態系統，可在以太坊基礎層上結算交易。 開發團隊一直在尋找新方法，以利用以太坊建立可組合、無許可和抗審查的重要 Web2 應用程式，或建立全新的 Web3 原生概念。 於此同時，新的專用工具被開發出來，使在以太坊上建構應用程式不太複雜。

### 去中心化金融 {#defi}

去中心化金融 (DeFi) 是建立在以太坊之上的主要應用程式類別之一。 去中心化金融旨在建立可組合的「貨幣樂高」，讓使用者可以透過智慧型合約儲存、轉移、出借、借用和投資加密資產。 去中心化金融是發展快速且常常更新的領域。 需要持續對安全、效率及可存取協定進行研究。

#### 背景介紹讀物 {#background-reading-15}

- [去中心化金融](/defi/)
- [Coinbase：去中心化金融是什麼？](https://www.coinbase.com/learn/crypto-basics/what-is-defi)

#### 近期研究 {#recent-research-15}

- [去中心化金融，中心化所有權？](https://arxiv.org/pdf/2012.09306.pdf)
- [Optimism：邁向低於一美元交易費用之路](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92)

### 去中心化自治組織 {#daos}

以太坊一個頗具影響力的使用案例是透過使用去中心化自治組織，以去中心化的方式進行整合。 目前，有許多活躍的研究，關乎如何開發和利用以太坊上的去中心化自治組織，將其作為一種所需信任最小化的協調工具，大幅擴展了人們的選擇，不在限於傳統公司和組織。

#### 背景介紹讀物 {#background-reading-16}

- [去中心化自治組織簡介](/dao/)
- [去中心化自治組織集合](https://daocollective.xyz/)

#### 近期研究 {#recent-research-16}

- [規劃去中心化自治組織生態系統](https://www.researchgate.net/publication/358694594_Mapping_out_the_DAO_Ecosystem_and_Assessing_DAO_Autonomy)

### 開發者工具 {#developer-tools}

為以太坊開發者打造的工具日新月異。 在這個領域中，有許多活躍的研究和開發工作要做。

#### 背景介紹讀物 {#background-reading-17}

- [依程式語言分類的開發工具](/developers/docs/programming-languages/)
- [開發者框架](/developers/docs/frameworks/)
- [共識開發者工具列表](https://github.com/ConsenSys/ethereum-developer-tools-list)
- [代幣標準](/developers/docs/standards/tokens/)
- [CryptoDevHub：以太坊虛擬機工具](https://cryptodevhub.io/wiki/ethereum-virtual-machine-tools)

#### 近期研究 {#recent-research-17}

- [以太坊研發 Discord 的共識工具頻道](https://discordapp.com/channels/595666850260713488/746343380900118528)

### 預言機 {#oracles}

預言機透過無需許可和去中心化的方式將鏈下資料匯入區塊鏈上。 將此資料上鏈使去中心化應用程式可對現實世界的現象做出反應，如現實世界的資產價格波動、鏈下應用程式的事件，甚至是天氣變化。

#### 背景介紹讀物 {#background-reading-18}

- [預言機簡介](/developers/docs/oracles/)

#### 近期研究 {#recent-research-18}

- [區塊鏈預言機調查](https://arxiv.org/pdf/2004.07140.pdf)
- [Chainlink 白皮書](https://chain.link/whitepaper)

### 應用程式安全性 {#app-security}

一般發生在以太坊上的攻擊都是利用單一應用程式的漏洞，而非協定本身的漏洞。 駭客和應用程式開發者正在進行一場競賽，分別開發新的攻擊和防禦手段。 這表示研究和發展對保持應用程式的安全、遠離被駭一直都很重要。

#### 背景介紹讀物 {#background-reading-19}

- [Wormhole 漏洞報告](https://blog.chainalysis.com/reports/wormhole-hack-february-2022/)
- [遭駭以太坊合約事後分析列表](https://forum.openzeppelin.com/t/list-of-ethereum-smart-contracts-post-mortems/1191)
- [Rekt 新聞](https://twitter.com/RektHQ?s=20\&t=3otjYQdM9Bqk8k3n1a1Adg)

#### 近期研究 {#recent-research-19}

- [ethresear.ch 應用程式](https://ethresear.ch/c/applications/18)

### 技術堆疊 {#technology-stack}

整個以太坊技術堆疊的去中心化是個重要的研究領域。 目前，以太坊上的去中心化應用程式有不同程度的中心化，因為它們依賴中心化工具或基礎設施。

#### 背景介紹讀物 {#background-reading-20}

- [以太坊堆疊](/developers/docs/ethereum-stack/)
- [Coinbase：Web3 堆疊簡介](https://blog.coinbase.com/a-simple-guide-to-the-web3-stack-785240e557f0)
- [智慧型合約簡介](/developers/docs/smart-contracts/)
- [去中心化儲存簡介](/developers/docs/storage/)

#### 近期研究 {#recent-research-20}

- [智慧型合約的可組合性](/developers/docs/smart-contracts/composability/)
