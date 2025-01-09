---
title: 節點和客戶
description: 以太坊節點及用戶端軟體概述，以及如何設定節點和你為何應該這麼做。
lang: zh-tw
sidebarDepth: 2
---

以太坊是一個由許多電腦（稱為節點）組成的分散式網路，這些節點運行能夠驗證區塊和交易資料的軟體。 這些軟體必須於你的電腦上運行，將電腦轉換成以太坊節點。 一個節點由兩個獨立的軟體（稱為「用戶端」）組成。

## 基本資訊 {#prerequisites}

在深入研究並執行屬於你的以太坊用戶端實例之前，你應該瞭解點對點網路的概念和[以太坊虛擬機基礎知識](/developers/docs/evm/)。 請參閱[以太坊簡介](/developers/docs/intro-to-ethereum/)。

如果你對節點這個主題還很陌生，推薦你首先查看我們適合使用者的[運行以太坊節點](/run-a-node)簡介。

## 什麼是節點與用戶端？ {#what-are-nodes-and-clients}

「節點」是指以太坊用戶端軟體的任何實例，該用戶端軟體連線到其他也在運行以太坊軟體的電腦，進而形成網路。 用戶端是以太坊的實作，根據協定規則驗證資料，並保持網路安全。 一個節點必須運行兩個用戶端：共識用戶端和執行用戶端。

- 執行用戶端（又稱為執行引擎，EL 用戶端或舊稱為 以太坊 1 用戶端）監聽網路上廣播的新交易，在以太坊虛擬機器 (EVM) 中執行交易，並保存所有目前以太坊資料的最新狀態和資料庫。
- 共識用戶端（又稱為信標鏈節點、CL 用戶端或舊稱為以太坊 2 用戶端）執行權益證明共識演算法，使網路能夠依據來自執行用戶端的驗證過的資料達成一致。 此外，還有第三個軟體，稱為「驗證者」；驗證者可以被新增到共識用戶端中，讓節點能參與保護網路安全。

這些用戶端共同運作以追蹤以太坊區塊鏈的頭部並使用戶可以和以太坊網路互動。 這種多個軟體協同工作的模組化設計稱為[封裝複雜性](https://vitalik.eth.limo/general/2022/02/28/complexity.html)。 此方法可以更簡單地無縫執行[合併](/roadmap/merge)，讓用戶端軟體更容易維運和開發，並能重複利用個別的用戶端，例如在[二層網路生態系統](/layer-2/)中使用。

![關聯的執行和共識用戶端](./eth1eth2client.png) 關聯的執行用戶端和共識用戶端的簡化示意圖。

### 用戶的多樣化 {#client-diversity}

[執行用戶端](/developers/docs/nodes-and-clients/#execution-clients)和[共識用戶端](/developers/docs/nodes-and-clients/#consensus-clients)存在於由不同團隊開發的多種程式語言中。

多種用戶端實作可以降低對單一程式碼庫的依賴，從而使網路更強大。 理想目標是達到多樣性，沒有任一用戶端在網路中佔有主導地位，從而消除潛在的單點故障。 語言多樣化也可以吸引更廣泛的開發者社群，並讓他們可以用自己偏好的語言來建立整合。

瞭解更多關於[用戶端多樣化](/developers/docs/nodes-and-clients/client-diversity/)的資訊。

這些實作的共通點就是都遵循一套統一規範。 這些規範決定以太坊網路和區塊鏈的運作方式。 所有的技術細節都已經定義，規範如下：

- 最初的[以太坊黃皮書](https://ethereum.github.io/yellowpaper/paper.pdf)
- [執行規範](https://github.com/ethereum/execution-specs/)
- [共識規範](https://github.com/ethereum/consensus-specs)
- 各種[網路升級](/history/)中實作的[以太坊改善提議](https://eips.ethereum.org/)

### 追蹤網路中的節點 {#network-overview}

多種追蹤器提供以太坊網路中節點的即時概覽。 必須注意，由於去中心化網路的特性，這些爬蟲僅能提供有限的網路資訊，並且可能會報告不同的結果。

- Etherscan 提供的[節點地圖](https://etherscan.io/nodetracker)
- Bitfly 提供的[Ethernodes](https://ethernodes.org/)
- Chainsafe 提供的 [Nodewatch](https://www.nodewatch.io/)，爬取共識節點
- [Monitoreth](https://monitoreth.io/) – 由 MigaLabs 開發的分散式網路監控工具

## 節點類型 {#node-types}

如果你想[運行你自己的節點](/developers/docs/nodes-and-clients/run-a-node/)，你需要瞭解：不同類型的節點以不同的方式消耗資料。 事實上，用戶端可以運行三種類型的節點：輕節點、全節點和歸檔節點。 還可以選擇不同的同步策略，從而達成更快的同步時間。 同步是指取得以太坊最新狀態資訊的速度。

### 全節點 {#full-node}

全節點對區塊鏈上的區塊逐一驗證，包括下載和驗證每個區塊的區塊體和狀態資料。 全節點有不同的類型 - 一些全節點會從初始區塊開始，驗證整個區塊鏈歷史上的每一個區塊。 另外一些全節點，僅從較近期的、它們認為有效的區塊開始驗證（例如：Geth 的 「快照同步」）。 不論從哪裡開始，全節點僅保留相對近期的資料（通常是最新的 128 個區塊）的本機副本，允許刪除較舊的資料以節省磁碟空間。 舊的資料可以在需要時重新生成。

- 儲存完整區塊鏈資料（儘管會定期修剪，全節點並不會將所有狀態資料儲存回創世塊）
- 參與區塊驗證，驗證所有區塊和狀態。
- 所有的狀態都可以從本機儲存中取得，或由全節點從「快照」中重新產生。
- 為網路提供服務並根據請求提供資料。

### 歸檔節點 {#archive-node}

從初始區塊開始驗證每一個區塊並且從不刪除任何已下載資料的全節點，稱為歸檔節點。

- 儲存全節點中保存的所有內容並建立歷史狀態檔案。 歸檔節點可供查詢鏈上資料，像是某個帳戶在第 #4,000,000 區塊的餘額，或是簡單可靠的測試一組自己的交易而無須使用追蹤功能來挖掘這些資料。
- 這些資料量以兆位元為單位，因此歸檔節點對於一般使用者來說較沒有吸引力，但是對於區塊瀏覽器、錢包服務商、鏈分析則十分方便。

以檔案以外的任何模式同步用戶端都會導致區塊鏈資料被修剪。 這意味著，沒有所有歷史狀態的存檔，但全節點能夠按需建立該存檔。

瞭解更多關於[歸檔節點](/developers/docs/nodes-and-clients/archive-nodes)的資訊。

### 輕節點 {#light-node}

相較於下載所有的區塊，輕節點僅下載區塊頭。 這些區塊頭包含了區塊內容的摘要資訊。 輕節點所需要的任何其他資訊，都須向全節點發送請求來取得。 然後，輕節點可以根據區塊頭中的狀態根獨立驗證接收的資料。 輕節點讓使用者能參與以太坊網路，而無需運行全節點所需的強大的硬體或高帶寬。 最終，輕節點可能可以在行動電話或是嵌入式裝置中運行。 輕節點並不參與共識（意即不能成為礦工/驗證者），但是可以存取以太坊區塊鏈，並具有與全節點相同的功能和安全保證。

輕量用戶端是以太坊積極發展的領域，我們預期很快可以看到共識層和執行層的輕量用戶端。 也有一些潛在的路徑可以透過[廣播網路](https://www.ethportal.net/)提供輕量用戶端資料。 這是有利的，因為廣播網路可以支援輕節點網路，而不需要全節點來處理請求。

以太坊目前還不支援大量的輕節點，但輕節點支援是預計在不久的將來會快速發展的領域。 特別像是 [Nimbus](https://nimbus.team/)、[Helios](https://github.com/a16z/helios) 及 [LodeStar](https://lodestar.chainsafe.io/) 等用戶端，目前都著重聚焦在輕節點。

## 運行以太坊節點之理由？ {#why-should-i-run-an-ethereum-node}

運行節點可以讓你直接、去信任並私密地使用以太坊，同時透過保持網路強健和去中心化來支持以太坊網路。

### 對你之好處 {#benefits-to-you}

運行自己的節點讓你可以透過私密、自給自足和去信任的方式來使用以太坊。 你無須信任網路，因為你可以透過你的用戶端驗證資料。 「不要信任，要驗證」是流行的區塊鏈口號。

- 你的節點依據共識規則自行驗證所有交易和區塊。 這意味著你不必依賴或完全信任網路中的任何其他節點。
- 你可以將自己的以太坊錢包與自己的節點一起使用。 你可以更安全和私密地使用去中心化應用程式，而不需要洩漏你的地址和餘額給中介機構。 一切都可以透過你的用戶端核實。 [MetaMask](https://metamask.io)、[Frame](https://frame.sh/) 和[許多其他錢包](/wallets/find-wallet/)都有提供遠端程序呼叫匯入，讓他們可以使用你的節點。
- 你可以運行並自託管其他依賴以太坊資料的服務。 例如：信標鏈驗證者、諸如二層網路的軟體、基礎設施、區塊瀏覽器、支付處理商等等。
- 你可以提供自己的自訂[遠端程序呼叫端點](/developers/docs/apis/json-rpc/)。 你甚至可以公開提供這些端點給社群，以協助他們避開大型中心化提供者。
- 你可以透過**行程間通訊 (IPC)** 來連線到自己的節點，或者你可以重新編寫節點，使其能夠載入你的外掛程式。 這樣可以降低延遲，會帶來諸多好處，例如利用 web3 函式庫處理大量資料時，或是當你需要盡可能快速替換交易時（例如：預先交易）。
- 你可以直接質押 ETH 來維護網路安全並賺取獎勵。 請參考[單獨質押](/staking/solo/)瞭解更多。

![你如何透過應用程式和節點存取以太坊](./nodes.png)

### 網路優點 {#network-benefits}

多樣化的節點對於以太坊的健康、安全和營運彈性非常重要。

- 全節點強制執行共識規則，因此不會被欺騙而接受不遵循這些規則的區塊。 這對網路提供了額外的安全性，因為如果所有的節點都是不執行完整驗證的輕節點，驗證者可以攻擊網路。
- 如果攻擊攻破了[權益證明](/developers/docs/consensus-mechanisms/pos/#what-is-pos)的加密貨幣經濟防禦，全節點可以選擇追隨最誠實的區塊鏈，執行社交恢復。
- 網路中的節點越多，就越能打造更多樣化和強韌的網路，這是去中心化的最終目的，提供一個抗審查且可靠的系統。
- 全節點為依賴區塊鏈資料的輕量用戶端提供這些區塊鏈資料的存取權限。 輕節點不會儲存整個區塊鏈，而是透過[區塊頭中的狀態根](/developers/docs/blocks/#block-anatomy)來驗證資料。 若有需要，輕節點可以向全節點索取更多的資訊。

如果你運行一個全節點，整個以太坊網路均會受益，即便你沒有運行驗證者。

## 運行你自己的節點 {#running-your-own-node}

有興趣運行自己的以太坊用戶端嗎？

如需適合初學者的介紹，請造訪我們的[運行節點](/run-a-node)頁面以瞭解更多資訊。

如果你是技術性使用者，請瞭解有關如何[啟動自己的節點](/developers/docs/nodes-and-clients/run-a-node/)的更多資訊和選項。

## 替代方案 {#alternatives}

設定自己的節點需要時間和資源，但你不一定需要自己運行。 在這種情況下，你可以使用第三方應用程式介面提供者。 有關使用這些服務的概述，請參閱[節點即服務](/developers/docs/nodes-and-clients/nodes-as-a-service/)。

如果在你的社群中，有人運行以太坊節點並提供公開應用程式介面，你可以透過自訂遠端程序呼叫將你的錢包指向社群節點，比起隨機選擇一個可信的第三方，可以獲得更多的隱私。

另一方面，如果你運行用戶端，可以與需要此用戶端的朋友分享。

## 執行用戶端 {#execution-clients}

以太坊社群維護多個開源執行用戶端（以前稱為「以太坊 1 用戶端」，或直接稱為「以太坊用戶端」），這些用戶端由不同團隊使用不同程式語言開發。 這使網路更強大也更[多樣化](/developers/docs/nodes-and-clients/client-diversity/)。 理想目標是達成多樣性，沒有任一用戶端佔有主導地位，以減少單點故障。

此表總結了不同的用戶端。 所有這些用戶端都通過了[用戶端測試](https://github.com/ethereum/tests)，並積極維護以保持最新的網路升級狀態。

| 用戶端                                                                    | 語言         | 作業系統                  | 網路                        | 同步策略                                               | 狀態修剪   |
| ---------------------------------------------------------------------- | ---------- | --------------------- | ------------------------- | -------------------------------------------------- | ------ |
| [Geth](https://geth.ethereum.org/)                                     | Go         | Linux, Windows, macOS | Mainnet, Sepolia, Holesky | [快照](#snap-sync)、[完整](#full-sync)                  | 歸檔、已修剪 |
| [Nethermind](https://www.nethermind.io/)                               | C#、.NET    | Linux、Windows、macOS   | Mainnet, Sepolia, Holesky | [快照](#snap-sync) (不提供服務)、快速、[完整](#full-sync)       | 歸檔, 緩衝 |
| [Besu](https://besu.hyperledger.org/en/stable/)                        | Java       | Linux, Windows, macOS | Mainnet, Sepolia, Holesky | [快照](#snap-sync)、[快速](#fast-sync)、[完整](#full-sync) | 歸檔, 緩衝 |
| [Erigon](https://github.com/ledgerwatch/erigon)                        | Go         | Linux, Windows, macOS | Mainnet, Sepolia, Holesky | [完整](#full-sync)                                   | 歸檔, 緩衝 |
| [Reth](https://reth.rs/)                                               | Rust       | Linux、Windows、macOS   | Mainnet, Sepolia, Holesky | [完整](#full-sync)                                   | 歸檔、已修剪 |
| [EthereumJS](https://github.com/ethereumjs/ethereumjs-monorepo)_（測試版）_ | TypeScript | Linux, Windows, macOS | Sepolia、Holesky           | [完整](#full-sync)                                   | 已修剪    |

有關受支援網路的更多信息，請閱讀[以太坊網路](/developers/docs/networks/)。

每個用戶端都有獨特的用例和優勢，因此你應該根據自己的偏好進行選擇。 多樣化使實作能夠專注於不同的功能和使用者受眾。 你可能希望根據功能、支援、程式語言或許可證來選擇用戶端。

### Besu {#besu}

Hyperledger Besu 是適用於公共和授權網路的企業級以太坊用戶端。 它運行所有以太坊主網功能，從追蹤到 GraphQL，具有廣泛的監控功能，並由 ConsenSys 在開放社群管道和企業商業 SLA 中提供支援。 它是用 Java 編寫的，並獲得 Apache 2.0 許可。

Besu 詳盡的 [文件](https://besu.hyperledger.org/en/stable/)會引導你學習其所有功能及設定的細節。

### Erigon {#erigon}

Erigon，舊稱 Turbo‐Geth，最初為 Go Ethereum 的分叉，專注於速度與磁碟空間效率。 Eirgon 是完全重構過的以太坊實作，目前以 Go 語言編寫，而其他語言的實作仍在開發中。 Erigon 的目標是提供更快、更模組化、更優化的以太坊實作。 它可在 3 天內使用 2TB 磁碟空間完成完整歸檔節點同步。

### Go Ethereum {#geth}

Go Ethereum（簡稱 Geth）是以太坊協定的原始實作之一。 目前，它是使用最廣泛的用戶端，擁有最大的使用者群體，並為使用者和開發者提供的各種工具。 它是用 Go 編寫的，完全開源，並獲得 GNU LGPL v3 許可。

從相關[文件](https://geth.ethereum.org/docs/)中了解有關 Geth 的更多資訊。

### Nethermind {#nethermind}

Nethermind 是使用 C# .NET 技術堆疊開發的以太坊實作，以 LGPL-3.0 授權，在包含 ARM 的所有主要平臺上運行。 在以下方面提供出色效能：

- 最佳化的虛擬機
- 狀態存取
- 網路和豐富的功能，如 Prometheus/Grafana 儀表板、seq 企業日誌記錄支援、JSON-RPC 追蹤和分析插件。

Nethermind 也為高級使用者提供[詳細文件](https://docs.nethermind.io)、強大的開發支援、線上社群和全年無休支援。

### Reth {#reth}

Reth（Rust Ethereum 的簡稱）是以太坊全節點的實作，致力於達成使用者友善、高度模組化、快速高效等目標。 Reth 最初由 Paradigm 開發並推動，且使用了 Apache 和 MIT 授權。

Reth 是生產就緒的執行用戶端，且適用於質押或高正常運作時間的服務等重要任務上。 在一些高效能、高利潤下的使用案例中表現優秀，如遠端程序呼叫、最大可提取價值、索引、模擬和點對點活動等。

查看 [Reth Book](https://reth.rs/) 或 [ Reth 的 GitHub 儲存庫](https://github.com/paradigmxyz/reth?tab=readme-ov-file#reth)以獲得更多資訊。

### 開發中 {#execution-in-development}

這些用戶端仍處於開發早期階段，尚未推薦正式使用。

#### EthereumJS {#ethereumjs}

EthereumJS 執行用戶端 (EthereumJS) 是以 TypeScript 編寫，並由多個套件組成，包括以區塊表示的核心以太坊基礎單元、交易和梅克爾帕特里夏樹據結構類別，以及核心用戶端元件，包括以太坊虛擬機 (EVM) 的實作、區塊鏈類別和 DevP2P 網路堆疊。

閱讀相關[文件](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master)，了解更多資訊。

## 共識用戶端 {#consensus-clients}

有多種共識用戶端（以前稱為「以太坊 2」用戶端）支援[共識升級](/roadmap/beacon-chain/)。 它們負責所有共識相關的邏輯，包含了分叉選擇演算法、處理證明並管理[權益證明](/developers/docs/consensus-mechanisms/pos)的獎勵和懲處。

| 用戶端                                                           | 程式語言       | 作業系統                  | 網路                                          |
| ------------------------------------------------------------- | ---------- | --------------------- | ------------------------------------------- |
| [Lighthouse](https://lighthouse.sigmaprime.io/)               | Rust       | Linux, Windows, macOS | 信標鏈、Goerli、Pyrmont、Sepolia、Ropsten 等        |
| [Lodestar](https://lodestar.chainsafe.io/)                    | TypeScript | Linux, Windows, macOS | 信標鏈、Goerli、Sepolia、Ropsten 等                |
| [Nimbus](https://nimbus.team/)                                | Nim        | Linux, Windows, macOS | 信標鏈、Goerli、Sepolia、Ropsten 等                |
| [Prysm](https://docs.prylabs.network/docs/getting-started/)   | 開始         | Linux, Windows, macOS | 信標鏈、Gnosis、Goerli、Pyrmont、Sepolia、Ropsten 等 |
| [Teku](https://consensys.net/knowledge-base/ethereum-2/teku/) | Java       | Linux、Windows、macOS   | 信標鏈、Gnosis、Goerli、Sepolia、Ropsten 等         |
| [Grandine](https://docs.grandine.io/)（測試版）                    | Rust       | Linux、Windows、macOS   | 信標鏈、Goerli、Sepolia 等                        |

### Lighthouse {#lighthouse}

Lighthouse 是以 Rust 開發的共識用戶端實作，以 Apache-2.0 授權。 它由 Sigma Prime 維護，自信標鏈問世以來一直穩定且可直接用於生產。 各企業、質押池及個人都依賴它。 它的目標是從桌上型個人電腦到複雜的自動化部署，在各環境中都保持安全、高效及可互通性。

文件可在 [Lighthouse 手冊](https://lighthouse-book.sigmaprime.io/)中找到

### Lodestar {#lodestar}

Lodestar 是以 Typescript 編寫，生產就緒的共識用戶端實作，以 LGPL-3.0 授權。 它由 ChainSafe Systems 維護，此外也是為單獨質押者、開發者、研究者而生的最新共識用戶端。 Lodestar 包含了信標節點及驗證者用戶端，該用戶端由以太坊協定的 JavaScript 實作提供支援。 Lodestar 致力於提升以太坊輕量用戶端的可用性，並為更多開發者擴大可存取性，以及提高以太坊生態系統多樣性。

更多資訊可在 [Lodestar 官網](https://lodestar.chainsafe.io/)找到

### Nimbus {#nimbus}

Nimbus 是以 Nim 開發的共識用戶端實作，以 Apache-2.0 授權。 它是生產就緒的用戶端，常被單獨質押者及質押池使用。 Nimbus 專為資源效率而生，可在資源有限的裝置及企業基礎設施上輕鬆運行，而不影響其穩定性及獎勵效能。 更少的資源佔用意味著網路面臨壓力時，用戶端有更大的安全邊際。

在 [Nimbus 文檔](https://nimbus.guide/)中瞭解更多

### Prysm {#prysm}

Prysm 是功能完整且開源的共識用戶端，以 Go 語言開發並以 GPL-3.0 授權。 它有可選的網頁應用用戶介面，並將自行質押者及機構使用者的使用者體驗、文檔及設定檔放在第一位。

閱讀 [Prysm 文檔](https://docs.prylabs.network/docs/getting-started/)以獲得更多資訊。

### Teku {#teku}

Teku 是最初的信標鏈創世用戶端之一。 除了一般的目標（安全性、穩定性、可用性、效能）外，Teku 特別致力於遵循各式各樣的用戶端標準。

Teku 提供了非常彈性的部署選項。 信標節點與驗證者用戶端可以在同個進程一起運行，對單獨質押者來說非常方便，節點也可分開運行，以完成複雜的質押操作。 此外，Teku 與 [Web3Signer](https://github.com/ConsenSys/web3signer/) 完全相容，以實現簽署金鑰安全及罰沒保護。

Teku 以 Java 編寫，並以 Apache 2.0 授權發佈。 它由 ConsenSys 的 Protocols 團隊開發，該團隊也負責 Besu 和 Web3Signer 開發。 在 [Teku 文檔中](https://docs.teku.consensys.net/en/latest/)瞭解更多。

### Grandine {#grandine}

Grandine 是以 Rust 語言編寫，以 GPL-3.0 授權的共識用戶端實作。 它由 Grandine 核心團隊維護，具有速度快、高效能和輕量的特點。 它適用於各類的質押者，從使用低資源裝置（如樹莓派）的單獨質押者，到運行數萬個驗證者的大機構質押者都能使用。

文件可在 [Grandine 手冊](https://docs.grandine.io/)中找到

## 同步模式 {#sync-modes}

為了追蹤和驗證網路中的當前資料，以太坊用戶端需要與最新的網路狀態同步。 這是透過從對等用戶端下載資料、以加密方式驗證其完整性並建立本地區塊鏈資料庫來完成的。

同步模式代表了達成此過程的不同方法以及各種權衡。 用戶端同步演算法的實作也各不相同。 請務必參閱你選擇的用戶端的官方文件，以了解實作的具體資訊。

### 執行層同步模式 {#execution-layer-sync-modes}

執行層可以於不同的模式下運行，從重新執行區塊鏈的全域狀態到僅與來自可信任檢查點的鏈尖同步，以適應不同的用例。

#### 完整同步 {#full-sync}

完整同步會下載所有區塊（包括區塊頭和區塊體），並透過執行創世區塊以來的每個區塊來增量地重新生成區塊鏈的狀態。

- 透過驗證每筆交易，最大限度地減少信任依賴並提供最高的安全性。
- 隨著交易數量不斷增加，處理所有交易可能需要幾天到幾週的時間。

[歸檔節點](#archive-node)執行完整同步，以建立（並保留）每個區塊中每個交易所做的狀態變更的完整歷史記錄。

#### 快速同步 {#fast-sync}

與完整同步一樣，快速同步會下載所有區塊（包括區塊頭、交易和收據）。 然而，快速同步不會重新處理歷史交易，而是依賴收據直到它到達最近的區塊頭，此時它切換到匯入和處理區塊以提供完整節點。

- 快速同步策略。
- 減少處理需求，有利頻寬使用。

#### 快照同步 {#snap-sync}

快照同步也會逐塊去驗證鏈。 然而，快照同步不是從創世區塊開始，而是從更新的及已知是真正區塊鏈一部分的「可信任」檢查點開始。 節點會儲存週期性檢查點，同時刪除比某時間點早的資料。 這些快照用於根據需要重新產生狀態資料，而不是永久儲存該資料。

- 最快的同步策略，目前為以太坊主網的預設策略。
- 在不犧牲安全性的情況下，節省了大量的磁碟空間和網路頻寬。

[更多有關快照同步的資訊](https://github.com/ethereum/devp2p/blob/master/caps/snap.md)。

#### 輕量同步 {#light-sync}

輕量用戶端模式下載所有區塊頭、區塊資料，並進行隨機驗證。 僅從受信任的檢查點同步鏈尖。

- 依靠對開發者的信任和共識機制，只取得最新狀態。
- 用戶端可在幾分鐘內在目前網路狀態下使用。

**NB** 輕量同步目前無法在權益證明以太坊上使用，新版本的輕量同步應很快會發佈！

[關於輕量用戶端的更多資訊](/developers/docs/nodes-and-clients/light-clients/)

### 共識層同步模式 {#consensus-layer-sync-modes}

#### 樂觀同步 {#optimistic-sync}

樂觀同步是一種合併後同步策略，被設計為可選擇向後兼容，可使執行節點透過預先建立的方法同步。 執行引擎可以_樂觀地_匯入信標區塊而不需要完整驗證，找到最新的區塊頭，並使用上述方法開始同步鏈。 接著，在執行用戶端同步至最新狀態後，它會通知共識用戶端信標鏈中交易的有效性。

[關於樂觀同步的更多資訊](https://github.com/ethereum/consensus-specs/blob/dev/sync/optimistic.md)

#### 檢查點同步 {#checkpoint-sync}

檢查點同步又稱弱主觀性同步，在同步信標節點時提供優異的使用者體驗。 它是基於[弱主觀性](/developers/docs/consensus-mechanisms/pos/weak-subjectivity/)假設，使信標鏈能夠從近期的弱主觀性檢查點開始同步，而不是從創世塊開始。 檢查點同步顯著縮短了初始同步時間，其信任假設與從[創世塊](/glossary/#genesis-block)開始同步相同。

在實際運作上，這表示你的節點會連接至遠端服務，以下載近期最終確定的狀態，並從該點開始繼續驗證資料。 提供資料的第三方會受到信任，因此應謹慎選擇。

關於[檢查點同步](https://notes.ethereum.org/@djrtwo/ws-sync-in-practice)的更多資訊

## 衍生閱讀 {#further-reading}

- [以太坊 101 - 第 2 部分 - 瞭解節點](https://kauri.io/ethereum-101-part-2-understanding-nodes/48d5098292fd4f11b251d1b1814f0bba/a) _– Wil Barnes，2019 年 2 月 13 日_
- [運行以太坊全節點：針對幾乎沒有動力的人提供的指南](https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31)_ – Justin Leroux，2019 年 11 月 7 日_

## 相關主題 {#related-topics}

- [分塊](/developers/docs/blocks/)
- [網路](/developers/docs/networks/)

## 相關教學 {#related-tutorials}

- [只需刷寫 MicroSD 卡即可將你的樹莓派 4 變成驗證者節點 -- 安裝指南](/developers/tutorials/run-node-raspberry-pi/) _ -- 刷寫你的樹莓派 4，插入乙太網路纜線，連接 SSD 磁碟，然後啟動設備，將樹莓派 4 轉變為運行執行層（主網）和/或共識層（信標鏈/驗證者）的完整以太坊節點。_
