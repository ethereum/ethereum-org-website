---
title: "節點與客戶端"
description: "以太坊節點與客戶端軟體概覽，以及如何設定節點與為何應該這麼做。"
lang: zh-tw
sidebarDepth: 2
---

[以太坊](/)是一個由電腦（稱為節點）組成的分散式網路，這些電腦執行能夠驗證區塊與交易資料的軟體。必須在你的電腦上執行該軟體，才能將其變成一個以太坊節點。構成一個節點需要兩個獨立的軟體（稱為「客戶端」）。

## 先決條件 {#prerequisites}

在深入探討並執行你自己的以太坊客戶端實例之前，你應該了解點對點網路的概念以及[EVM 的基礎知識](/developers/docs/evm/)。請參閱我們的[以太坊簡介](/developers/docs/intro-to-ethereum/)。

如果你對節點這個主題還很陌生，我們建議你先查看我們關於[執行以太坊節點](/run-a-node)的易懂簡介。

## 什麼是節點與客戶端？ {#what-are-nodes-and-clients}

「節點」是指任何連接到其他同樣執行以太坊軟體的電腦，從而形成一個網路的以太坊客戶端軟體實例。客戶端是以太坊的一種實作，它根據協定規則驗證資料並保持網路安全。一個節點必須執行兩個客戶端：一個共識客戶端和一個執行客戶端。

- 執行客戶端（也稱為執行引擎、EL 客戶端或以前的 Eth1 客戶端）監聽網路中廣播的新交易，在 EVM 中執行它們，並保存所有當前以太坊資料的最新狀態與資料庫。
- 共識客戶端（也稱為信標節點、CL 客戶端或以前的 Eth2 客戶端）實作了權益證明 (PoS) 共識演算法，這使得網路能夠根據來自執行客戶端的已驗證資料達成共識。還有第三個軟體，稱為「驗證者」，可以新增到共識客戶端中，允許節點參與保護網路。

這些客戶端協同工作以追蹤以太坊鏈的頂端，並允許使用者與以太坊網路互動。這種由多個軟體協同工作的模組化設計被稱為[封裝複雜性](https://vitalik.eth.limo/general/2022/02/28/complexity.html)。這種方法使得無縫執行[合併](/roadmap/merge)變得更加容易，使客戶端軟體更易於維護和開發，並實現了個別客戶端的重複使用，例如在[第二層 (L2) 生態系統](/layer-2/)中。

![Coupled execution and consensus clients](./eth1eth2client.png)
耦合的執行與共識客戶端簡化圖。

### 客戶端多樣性 {#client-diversity}

[執行客戶端](/developers/docs/nodes-and-clients/#execution-clients)與[共識客戶端](/developers/docs/nodes-and-clients/#consensus-clients)都有由不同團隊使用各種程式語言開發的版本。

多種客戶端實作可以減少對單一程式碼庫的依賴，從而使網路更加強大。理想的目標是實現多樣性，而沒有任何一個客戶端主導網路，從而消除潛在的單點故障。
多種語言也吸引了更廣泛的開發者社群，並允許他們使用自己偏好的語言建立整合。

了解更多關於[客戶端多樣性](/developers/docs/nodes-and-clients/client-diversity/)的資訊。

這些實作的共同點是它們都遵循單一規範。規範規定了以太坊網路和區塊鏈的運作方式。每個技術細節都有定義，規範可以在以下位置找到：

- 最初的[以太坊黃皮書](https://ethereum.github.io/yellowpaper/paper.pdf)
- [執行規範](https://github.com/ethereum/execution-specs/)
- [共識規範](https://github.com/ethereum/consensus-specs)
- 在各種[網路升級](/ethereum-forks/)中實作的 [EIP](https://eips.ethereum.org/)

### 追蹤網路中的節點 {#network-overview}

多個追蹤器提供了以太坊網路中節點的即時概覽。請注意，由於去中心化網路的性質，這些爬蟲只能提供網路的有限視圖，並且可能會報告不同的結果。

- Etherscan 的[節點地圖](https://etherscan.io/nodetracker)
- Bitfly 的 [Ethernodes](https://ethernodes.org/)
- Chainsafe 的 [Nodewatch](https://www.nodewatch.io/)，爬取共識節點
- MigaLabs 的 [Monitoreth](https://monitoreth.io/)，一個分散式網路監控工具
- ProbeLab 的[每週網路健康報告](https://probelab.io)，使用 [Nebula 爬蟲](https://github.com/dennis-tra/nebula)和其他工具

## 節點類型 {#node-types}

如果你想[執行自己的節點](/developers/docs/nodes-and-clients/run-a-node/)，你應該了解有不同類型的節點，它們消耗資料的方式也不同。事實上，客戶端可以執行三種不同類型的節點：輕節點、全節點和歸檔節點。還有不同同步策略的選項，可以實現更快的同步時間。同步是指它能多快獲取關於以太坊狀態的最新資訊。

### 全節點 {#full-node}

全節點對區塊鏈進行逐個區塊驗證，包括下載並驗證每個區塊的區塊主體和狀態資料。全節點有不同的類別——有些從創世區塊開始，並驗證區塊鏈整個歷史中的每一個區塊。其他則從它們信任為有效的較新區塊開始驗證（例如，Geth 的「快照同步 (snap sync)」）。無論驗證從哪裡開始，全節點只保留相對較新資料的本機副本（通常是最近的 128 個區塊），允許刪除較舊的資料以節省磁碟空間。較舊的資料可以在需要時重新產生。

- 儲存完整的區塊鏈資料（儘管這會定期修剪，因此全節點不會儲存追溯到創世區塊的所有狀態資料）
- 參與區塊驗證，驗證所有區塊和狀態。
- 全節點可以從本機儲存中擷取所有狀態，或從「快照」中重新產生。
- 服務網路並根據請求提供資料。

### 歸檔節點 {#archive-node}

歸檔節點是從創世區塊開始驗證每個區塊且從不刪除任何已下載資料的全節點。

- 儲存全節點中保留的所有內容，並建立歷史狀態的歸檔。如果你想查詢例如第 4,000,000 個區塊的帳戶餘額，或者只是可靠地測試你自己的交易集而無需使用追蹤來驗證它們，就需要它。
- 這些資料以 TB 為單位，這使得歸檔節點對一般使用者較不具吸引力，但對於區塊瀏覽器、錢包供應商和鏈上分析等服務來說可能很方便。

在歸檔以外的任何模式下同步客戶端都會導致區塊鏈資料被修剪。這意味著，沒有所有歷史狀態的歸檔，但全節點能夠根據需求建立它們。

了解更多關於[歸檔節點](/developers/docs/nodes-and-clients/archive-nodes)的資訊。

### 輕節點 {#light-node}

輕節點不下載每個區塊，而是只下載區塊標頭。這些標頭包含有關區塊內容的摘要資訊。輕節點所需的任何其他資訊都會向全節點請求。然後，輕節點可以根據區塊標頭中的狀態根獨立驗證它們收到的資料。輕節點使用戶能夠參與以太坊網路，而無需執行全節點所需的強大硬體或高頻寬。最終，輕節點可能會在手機或嵌入式裝置上執行。輕節點不參與共識（即它們不能成為驗證者），但它們可以存取以太坊區塊鏈，並具有與全節點相同的功能和安全保證。

輕客戶端是以太坊積極開發的領域，我們預計很快就會看到用於共識層和執行層的新輕客戶端。
還有一些潛在的途徑可以透過 [gossip 網路](https://www.ethportal.net/)提供輕客戶端資料。這是有利的，因為 gossip 網路可以支援輕節點網路，而不需要全節點來服務請求。

以太坊目前還不支援大量的輕節點，但輕節點支援是預計在不久的將來會快速發展的領域。特別是像 [寧布斯](https://nimbus.team/)、[Helios](https://github.com/a16z/helios) 和 [洛德斯塔](https://lodestar.chainsafe.io/) 這樣的客戶端目前正大力專注於輕節點。

## 為什麼我應該執行以太坊節點？ {#why-should-i-run-an-ethereum-node}

執行節點允許你直接、無須信任且私密地使用以太坊，同時透過保持網路更加穩健和去中心化來支援網路。

### 對你的好處 {#benefits-to-you}

執行你自己的節點使你能夠以私密、自給自足且無須信任的方式使用以太坊。你不需要信任網路，因為你可以使用你的客戶端自行驗證資料。「不要信任，要驗證」是一句流行的區塊鏈格言。

- 你的節點會自行根據共識規則驗證所有交易和區塊。這意味著你不必依賴網路中的任何其他節點或完全信任它們。
- 你可以將以太坊錢包與你自己的節點一起使用。你可以更安全、更私密地使用去中心化應用程式 (dapp)，因為你不必向中介機構洩露你的地址和餘額。一切都可以用你自己的客戶端進行檢查。[梅塔馬斯克](https://metamask.io)、[Frame](https://frame.sh/) 和[許多其他錢包](/wallets/find-wallet/)提供 RPC 匯入功能，允許它們使用你的節點。
- 你可以執行並自行託管依賴以太坊資料的其他服務。例如，這可能是信標鏈驗證者、像第二層 (L2) 這樣的軟體、基礎設施、區塊瀏覽器、支付處理器等。
- 你可以提供自己的自訂 [RPC 端點](/developers/docs/apis/json-rpc/)。你甚至可以向社群公開提供這些端點，以幫助他們避開大型中心化供應商。
- 你可以使用**行程間通訊 (IPC)** 連接到你的節點，或者重寫節點以將你的程式作為外掛程式載入。這提供了低延遲，這非常有幫助，例如，當使用 Web3 函式庫處理大量資料時，或者當你需要盡快替換交易時（即搶先交易）。
- 你可以直接質押 ETH 來保護網路並賺取獎勵。請參閱[獨立質押](/staking/solo/)以開始使用。

![How you access Ethereum via your application and nodes](./nodes.png)

### 網路好處 {#network-benefits}

多樣化的節點集合對於以太坊的健康、安全和營運彈性非常重要。

- 全節點強制執行共識規則，因此它們不會被欺騙去接受不遵循規則的區塊。這在網路中提供了額外的安全性，因為如果所有節點都是不進行完整驗證的輕節點，驗證者就可以攻擊網路。
- 如果發生克服了[權益證明 (PoS)](/developers/docs/consensus-mechanisms/pos/#what-is-pos)加密經濟防禦的攻擊，全節點可以透過選擇跟隨誠實鏈來執行社交恢復。
- 網路中更多的節點會產生更多樣化和穩健的網路，這是去中心化的最終目標，它實現了一個抗審查且可靠的系統。
- 全節點為依賴它的輕量級客戶端提供對區塊鏈資料的存取。輕節點不儲存整個區塊鏈，而是透過[區塊標頭中的狀態根](/developers/docs/blocks/#block-anatomy)驗證資料。如果需要，它們可以向全節點請求更多資訊。

如果你執行全節點，整個以太坊網路都會從中受益，即使你不執行驗證者。

## 執行你自己的節點 {#running-your-own-node}

有興趣執行你自己的以太坊客戶端嗎？

如需適合初學者的簡介，請造訪我們的[執行節點](/run-a-node)頁面以了解更多資訊。

如果你是偏向技術的使用者，請深入了解有關如何[啟動你自己的節點](/developers/docs/nodes-and-clients/run-a-node/)的更多詳細資訊和選項。

## 替代方案 {#alternatives}

設定你自己的節點可能會花費你的時間和資源，但你並不總是需要執行自己的實例。在這種情況下，你可以使用第三方 API 供應商。有關使用這些服務的概覽，請查看[節點即服務](/developers/docs/nodes-and-clients/nodes-as-a-service/)。

如果有人在你的社群中執行帶有公共 API 的以太坊節點，你可以透過自訂 RPC 將你的錢包指向社群節點，並獲得比使用某些隨機受信任第三方更多的隱私。

另一方面，如果你執行客戶端，你可以與可能需要它的朋友分享。

## 執行客戶端 {#execution-clients}

以太坊社群維護著多個開源執行客戶端（以前稱為「Eth1 客戶端」，或簡稱「以太坊客戶端」），由不同團隊使用不同的程式語言開發。這使得網路更加強大且更具[多樣性](/developers/docs/nodes-and-clients/client-diversity/)。理想的目標是實現多樣性，而沒有任何客戶端佔主導地位，以減少任何單點故障。

下表總結了不同的客戶端。它們都通過了[客戶端測試](https://github.com/ethereum/tests)，並得到積極維護以跟上網路升級。

| 客戶端                                                                   | 語言   | 作業系統     | 網路                | 同步策略                                            | 狀態修剪   |
| ------------------------------------------------------------------------ | ---------- | --------------------- | ----------------------- | ---------------------------------------------------------- | --------------- |
| [Geth](https://geth.ethereum.org/)                                       | Go         | Linux, Windows, macOS | Mainnet, Sepolia, Hoodi | [快照 (Snap)](#snap-sync), [完整 (Full)](#full-sync)                     | 歸檔、已修剪 |
| [奈瑟邁](https://www.nethermind.io/)                                 | C#, .NET   | Linux, Windows, macOS | Mainnet, Sepolia, Hoodi | [快照 (Snap)](#snap-sync), 快速 (Fast), [完整 (Full)](#full-sync)               | 歸檔、已修剪 |
| [貝蘇](https://besu.hyperledger.org/en/stable/)                          | Java       | Linux, Windows, macOS | Mainnet, Sepolia, Hoodi | [快照 (Snap)](#snap-sync), [快速 (Fast)](#fast-sync), [完整 (Full)](#full-sync) | 歸檔、已修剪 |
| [艾瑞貢](https://github.com/ledgerwatch/erigon)                          | Go         | Linux, Windows, macOS | Mainnet, Sepolia, Hoodi | [完整 (Full)](#full-sync)                                         | 歸檔、已修剪 |
| [瑞斯](https://reth.rs/)                                                 | Rust       | Linux, Windows, macOS | Mainnet, Sepolia, Hoodi | [完整 (Full)](#full-sync)                                         | 歸檔、已修剪 |
| [EthereumJS](https://github.com/ethereumjs/ethereumjs-monorepo) _(測試版)_ | TypeScript | Linux, Windows, macOS | Sepolia, Hoodi          | [完整 (Full)](#full-sync)                                         | 已修剪          |

有關支援網路的更多資訊，請閱讀[以太坊網路](/developers/docs/networks/)。

每個客戶端都有獨特的使用案例和優勢，因此你應該根據自己的偏好選擇一個。多樣性允許實作專注於不同的功能和使用者受眾。你可能希望根據功能、支援、程式語言或授權來選擇客戶端。

### 貝蘇 {#besu}

Hyperledger Besu 是一個適用於公共和許可制網路的企業級以太坊客戶端。它執行所有以太坊主網功能，從追蹤到 GraphQL，具有廣泛的監控，並由 ConsenSys 支援，無論是在開放的社群管道中，還是透過企業的商業 SLA。它是用 Java 編寫的，並獲得 Apache 2.0 授權。

貝蘇廣泛的[文件](https://besu.hyperledger.org/en/stable/)將引導你了解其功能和設定的所有細節。

### 艾瑞貢 {#erigon}

艾瑞貢（以前稱為 Turbo-Geth）最初是 Go 以太坊的一個分叉，旨在提高速度和磁碟空間效率。艾瑞貢是一個完全重新架構的以太坊實作，目前用 Go 編寫，但其他語言的實作正在開發中。艾瑞貢的目標是提供一個更快、更模組化且更優化的以太坊實作。它可以在不到 3 天的時間內使用大約 2TB 的磁碟空間執行完整的歸檔節點同步。

### Go 以太坊 (Geth) {#geth}

Go 以太坊（簡稱 Geth）是以太坊協定的最初實作之一。目前，它是最廣泛的客戶端，擁有最大的使用者群以及為使用者和開發者提供的各種工具。它是用 Go 編寫的，完全開源，並在 GNU LGPL v3 下獲得授權。

在它的[文件](https://geth.ethereum.org/docs)中了解更多關於 Geth 的資訊。

### 奈瑟邁 {#nethermind}

奈瑟邁是一個使用 C# .NET 技術堆疊建立的以太坊實作，獲得 LGPL-3.0 授權，在包括 ARM 在內的所有主要平台上執行。它提供了卓越的效能，具有：

- 優化的虛擬機
- 狀態存取
- 網路和豐富的功能，如 Prometheus/Grafana 儀表板、seq 企業日誌記錄支援、JSON-RPC 追蹤和分析外掛程式。

奈瑟邁還擁有[詳細的文件](https://docs.nethermind.io)、強大的開發支援、線上社群以及為進階使用者提供的 24/7 支援。

### 瑞斯 {#reth}

瑞斯（Rust Ethereum 的簡稱）是一個以太坊全節點實作，專注於使用者友善、高度模組化、快速且高效。瑞斯最初由 Paradigm 建立和推動，並在 Apache 和 MIT 授權下獲得授權。

瑞斯已準備好投入生產，適用於關鍵任務環境，例如質押或高正常執行時間服務。在需要高效能和巨大餘裕的使用案例中表現良好，例如 RPC、MEV、索引、模擬和 P2P 活動。

透過查看 [Reth Book](https://reth.rs/) 或 [Reth GitHub 儲存庫](https://github.com/paradigmxyz/reth?tab=readme-ov-file#reth)了解更多資訊。

### 開發中 {#execution-in-development}

這些客戶端仍處於早期開發階段，尚不建議用於生產環境。

#### EthereumJS {#ethereumjs}

EthereumJS 執行客戶端 (EthereumJS) 是用 TypeScript 編寫的，由許多套件組成，包括由區塊、交易和 Merkle-Patricia Trie 類別表示的核心以太坊原語，以及核心客戶端元件，包括以太坊虛擬機 (EVM) 的實作、區塊鏈類別和 devp2p 網路堆疊。

透過閱讀其[文件](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master)了解更多資訊

## 共識客戶端 {#consensus-clients}

有多個共識客戶端（以前稱為「Eth2」客戶端）來支援[共識升級](/roadmap/beacon-chain/)。它們負責所有與共識相關的邏輯，包括分叉選擇演算法、處理證明以及管理[權益證明 (PoS)](/developers/docs/consensus-mechanisms/pos)獎勵和罰沒。

| 客戶端                                                        | 語言   | 作業系統     | 網路                                                |
| ------------------------------------------------------------- | ---------- | --------------------- | ------------------------------------------------------- |
| [萊特豪斯](https://lighthouse.sigmaprime.io/)               | Rust       | Linux, Windows, macOS | 信標鏈、Hoodi、Pyrmont、Sepolia 等         |
| [洛德斯塔](https://lodestar.chainsafe.io/)                    | TypeScript | Linux, Windows, macOS | 信標鏈、Hoodi、Sepolia 等                  |
| [寧布斯](https://nimbus.team/)                                | Nim        | Linux, Windows, macOS | 信標鏈、Hoodi、Sepolia 等                  |
| [普萊斯姆](https://prysm.offchainlabs.com/docs/)                 | Go         | Linux, Windows, macOS | 信標鏈、Gnosis、Hoodi、Pyrmont、Sepolia 等 |
| [泰庫](https://consensys.net/knowledge-base/ethereum-2/teku/) | Java       | Linux, Windows, macOS | 信標鏈、Gnosis、Hoodi、Sepolia 等          |
| [Grandine](https://docs.grandine.io/)                         | Rust       | Linux, Windows, macOS | 信標鏈、Hoodi、Sepolia 等                  |

### 萊特豪斯 {#lighthouse}

萊特豪斯是一個在 Apache-2.0 授權下用 Rust 編寫的共識客戶端實作。它由 Sigma Prime 維護，自信標鏈創世以來一直穩定且可用於生產。它受到各種企業、質押池和個人的依賴。它的目標是在從桌上型電腦到複雜的自動化部署等各種環境中保持安全、高效能和可互操作的。

文件可以在 [Lighthouse Book](https://lighthouse-book.sigmaprime.io/) 中找到

### 洛德斯塔 {#lodestar}

洛德斯塔是一個在 LGPL-3.0 授權下用 TypeScript 編寫的生產就緒共識客戶端實作。它由 ChainSafe Systems 維護，是為獨立質押者、開發者和研究人員提供的最新共識客戶端。洛德斯塔由信標節點和驗證者客戶端組成，由以太坊協定的 JavaScript 實作提供支援。洛德斯塔旨在透過輕客戶端提高以太坊的可用性，擴大對更多開發者的可及性，並進一步為生態系統多樣性做出貢獻。

更多資訊可以在[洛德斯塔網站](https://lodestar.chainsafe.io/)上找到

### 寧布斯 {#nimbus}

寧布斯是一個在 Apache-2.0 授權下用 Nim 編寫的共識客戶端實作。它是一個生產就緒的客戶端，被獨立質押者和質押池使用。寧布斯專為資源效率而設計，使其能夠輕鬆地在資源受限的裝置和企業基礎設施上執行，而不會影響穩定性或獎勵效能。較輕的資源佔用意味著當網路處於壓力下時，客戶端具有更大的安全餘裕。

在[寧布斯文件](https://nimbus.guide/)中了解更多資訊

### 普萊斯姆 {#prysm}

普萊斯姆是一個在 GPL-3.0 授權下用 Go 編寫的功能齊全的開源共識客戶端。它具有可選的網頁應用程式 UI，並優先考慮在家質押和機構使用者的使用者體驗、文件和可配置性。

造訪[普萊斯姆文件](https://prysm.offchainlabs.com/docs/)以了解更多資訊。

### 泰庫 {#teku}

泰庫是最初的信標鏈創世客戶端之一。除了通常的目標（安全性、穩健性、穩定性、可用性、效能）之外，泰庫特別旨在完全遵守所有各種共識客戶端標準。

泰庫提供非常靈活的部署選項。信標節點和驗證者客戶端可以作為單一行程一起執行，這對於獨立質押者來說非常方便，或者節點可以分開執行以進行複雜的質押操作。此外，泰庫與 [Web3Signer](https://github.com/ConsenSys/web3signer/) 完全可互操作的，以實現簽署金鑰安全和罰沒保護。

泰庫是用 Java 編寫的，並獲得 Apache 2.0 授權。它由 ConsenSys 的協定團隊開發，該團隊也負責貝蘇和 Web3Signer。在[泰庫文件](https://docs.teku.consensys.net/en/latest/)中了解更多資訊。

### Grandine {#grandine}

Grandine 是一個在 GPL-3.0 授權下用 Rust 編寫的共識客戶端實作。它由 Grandine 核心團隊維護，具有快速、高效能和輕量級的特點。它適合廣泛的質押者，從在 Raspberry Pi 等低資源裝置上執行的獨立質押者，到執行數萬個驗證者的大型機構質押者。

文件可以在 [Grandine Book](https://docs.grandine.io/) 中找到

## 同步模式 {#sync-modes}

為了追蹤和驗證網路中的當前資料，以太坊客戶端需要與最新的網路狀態同步。這是透過從對等節點下載資料、以密碼學方式驗證其完整性並建立本機區塊鏈資料庫來完成的。

同步模式代表了這個過程的不同方法，並帶有各種權衡。客戶端在同步演算法的實作上也有所不同。請務必參考你所選客戶端的官方文件以了解實作的具體細節。

### 執行層同步模式 {#execution-layer-sync-modes}

執行層可以以不同的模式執行以適應不同的使用案例，從重新執行區塊鏈的世界狀態到僅從受信任的檢查點與鏈的頂端同步。

#### 完整同步 (Full sync) {#full-sync}

完整同步會下載所有區塊（包括標頭和區塊主體），並透過從創世區塊開始執行每個區塊來逐步重新產生區塊鏈的狀態。

- 透過驗證每筆交易，將信任降至最低並提供最高安全性。
- 隨著交易數量的增加，處理所有交易可能需要數天到數週的時間。

[歸檔節點](#archive-node)執行完整同步，以建立（並保留）每個區塊中每筆交易所做狀態變更的完整歷史記錄。

#### 快速同步 (Fast sync) {#fast-sync}

與完整同步一樣，快速同步會下載所有區塊（包括標頭、交易和收據）。然而，快速同步不重新處理歷史交易，而是依賴收據，直到它到達最近的頂端，此時它會切換到匯入和處理區塊以提供全節點。

- 快速同步策略。
- 減少處理需求以利於頻寬使用。

#### 快照同步 (Snap sync) {#snap-sync}

快照同步也逐個區塊驗證鏈。然而，快照同步不是從創世區塊開始，而是從一個已知是真實區塊鏈一部分的較新「受信任」檢查點開始。節點會儲存定期檢查點，同時刪除超過特定時間的資料。這些快照用於根據需要重新產生狀態資料，而不是永久儲存它。

- 最快的同步策略，目前是以太坊主網的預設策略。
- 節省大量磁碟使用量和網路頻寬，而不會犧牲安全性。

[更多關於快照同步的資訊](https://github.com/ethereum/devp2p/blob/master/caps/snap.md)。

#### 輕同步 (Light sync) {#light-sync}

輕客戶端模式下載所有區塊標頭、區塊資料，並隨機驗證一些。僅從受信任的檢查點同步鏈的頂端。

- 僅獲取最新狀態，同時依賴對開發者和共識機制的信任。
- 客戶端在幾分鐘內即可使用當前網路狀態。

**注意** 輕同步尚不適用於權益證明 (PoS) 以太坊——新版本的輕同步應該很快就會發布！

[更多關於輕客戶端的資訊](/developers/docs/nodes-and-clients/light-clients/)

### 共識層同步模式 {#consensus-layer-sync-modes}

#### 樂觀同步 (Optimistic sync) {#optimistic-sync}

樂觀同步是一種合併後的同步策略，設計為可選且向後相容，允許執行節點透過既定方法進行同步。執行引擎可以_樂觀地_匯入信標區塊而無需完全驗證它們，找到最新的頂端，然後開始使用上述方法同步鏈。然後，在執行客戶端趕上之後，它將通知共識客戶端信標鏈中交易的有效性。

[更多關於樂觀同步的資訊](https://github.com/ethereum/consensus-specs/blob/master/sync/optimistic.md)

#### 檢查點同步 (Checkpoint sync) {#checkpoint-sync}

檢查點同步，也稱為弱主觀性同步，為同步信標節點創造了卓越的使用者體驗。它基於[弱主觀性](/developers/docs/consensus-mechanisms/pos/weak-subjectivity/)的假設，這使得能夠從最近的弱主觀性檢查點而不是創世區塊同步信標鏈。檢查點同步使初始同步時間顯著加快，並具有與從[創世區塊](/glossary/#genesis-block)同步相似的信任假設。

在實踐中，這意味著你的節點連接到遠端服務以下載最近已定案的狀態，並從該點繼續驗證資料。提供資料的第三方是受信任的，應該仔細挑選。

更多關於[檢查點同步](https://notes.ethereum.org/@djrtwo/ws-sync-in-practice)的資訊

## 進一步閱讀 {#further-reading}

- [以太坊 101 - 第 2 部分 - 了解節點](https://kauri.io/ethereum-101-part-2-understanding-nodes/48d5098292fd4f11b251d1b1814f0bba/a) _– Wil Barnes，2019 年 2 月 13 日_
- [執行以太坊全節點：給幾乎沒有動力的人的指南](https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _– Justin Leroux，2019 年 11 月 7 日_

## 相關主題 {#related-topics}

- [區塊](/developers/docs/blocks/)
- [網路](/developers/docs/networks/)

## 相關教學 {#related-tutorials}

- [只需燒錄 MicroSD 卡即可將你的 Raspberry Pi 4 變成驗證者節點 – 安裝指南](/developers/tutorials/run-node-raspberry-pi/) _– 燒錄你的 Raspberry Pi 4，插入乙太網路線，連接 SSD 磁碟並開啟裝置電源，即可將 Raspberry Pi 4 變成執行執行層（主網）和/或共識層（信標鏈/驗證者）的完整以太坊節點。_