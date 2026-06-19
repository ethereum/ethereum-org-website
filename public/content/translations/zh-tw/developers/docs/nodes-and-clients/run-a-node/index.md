---
title: "啟動你自己的以太坊節點"
description: "執行你自己的以太坊客戶端實例的一般介紹。"
lang: zh-tw
sidebarDepth: 2
---

執行你自己的節點能為你提供各種好處、開啟新的可能性，並有助於支持生態系。本頁面將引導你啟動自己的節點，並參與驗證[以太坊](/)交易。

請注意，在[合併](/roadmap/merge)之後，執行以太坊節點需要兩個客戶端：一個**執行層 (EL)** 客戶端和一個**共識層 (CL)** 客戶端。本頁面將展示如何安裝、設定並連接這兩個客戶端以執行以太坊節點。

## 先決條件 {#prerequisites}

你應該了解什麼是以太坊節點，以及為什麼你可能想要執行客戶端。這在[節點與客戶端](/developers/docs/nodes-and-clients/)中有詳細說明。

如果你是執行節點的新手，或者正在尋找技術門檻較低的路徑，我們建議你先查看我們關於[執行以太坊節點](/run-a-node)的友善介紹。

## 選擇方法 {#choosing-approach}

啟動節點的第一步是選擇你的方法。根據要求和各種可能性，你必須選擇客戶端實作（包括執行客戶端和共識客戶端）、環境（硬體、系統）以及客戶端設定的參數。

本頁面將引導你完成這些決策，並幫助你找到執行以太坊實例最合適的方法。

若要從客戶端實作中進行選擇，請查看所有可用且支援主網的[執行客戶端](/developers/docs/nodes-and-clients/#execution-clients)、[共識客戶端](/developers/docs/nodes-and-clients/#consensus-clients)，並了解[客戶端多樣性](/developers/docs/nodes-and-clients/client-diversity)。

考慮客戶端的[要求](#requirements)，決定要在你自己的[硬體還是雲端](#local-vs-cloud)上執行軟體。

準備好環境後，使用[適合初學者的介面](#automatized-setup)或使用具有進階選項的終端機[手動](#manual-setup)安裝所選的客戶端。

當節點正在執行並同步時，你就可以準備[使用它](#using-the-node)了，但請務必留意其[維護](#operating-the-node)。

![Client setup](./diagram.png)

### 環境與硬體 {#environment-and-hardware}

#### 本地或雲端 {#local-vs-cloud}

以太坊客戶端能夠在消費級電腦上執行，不需要任何特殊硬體（例如挖礦機）。因此，你可以根據自己的需求選擇各種部署節點的選項。
簡單來說，讓我們考慮在本地實體機器和雲端伺服器上執行節點：

- 雲端
  - 供應商提供高伺服器正常執行時間和靜態公共 IP 地址
  - 取得專用或虛擬伺服器可能比自己建置更方便
  - 缺點是需要信任第三方（伺服器供應商）
  - 由於全節點所需的儲存空間大小，租用伺服器的價格可能會很高
- 自有硬體
  - 更無須信任且具主權的方法
  - 一次性投資
  - 可選擇購買預先設定好的機器
  - 你必須親自準備、維護，並可能需要排除機器和網路的故障

這兩種選項都有上述總結的不同優勢。如果你正在尋找雲端解決方案，除了許多傳統的雲端運算供應商之外，還有專注於部署節點的服務。查看[節點即服務](/developers/docs/nodes-and-clients/nodes-as-a-service/)以獲取更多託管節點的選項。

#### 硬體 {#hardware}

然而，一個抗審查、去中心化的網路不應依賴雲端供應商。相反地，在你自己的本地硬體上執行節點對生態系來說更健康。[估計](https://www.ethernodes.org/networkType/cl/Hosting)顯示有很大一部分的節點在雲端上執行，這可能會成為單點故障。

以太坊客戶端可以在你的電腦、筆記型電腦、伺服器，甚至單板電腦上執行。雖然在個人電腦上執行客戶端是可行的，但擁有一台專門用於節點的機器可以顯著提升其效能和安全性，同時將對你主要電腦的影響降至最低。

使用自己的硬體可以非常簡單。有許多簡單的選項，也有適合技術人員的進階設定。因此，讓我們來看看在你的機器上執行以太坊客戶端的要求和方法。

#### 要求 {#requirements}

硬體要求因客戶端而異，但通常不會太高，因為節點只需要保持同步。不要將其與挖礦混淆，挖礦需要更多的運算能力。不過，更強大的硬體確實能改善同步時間和效能。

在安裝任何客戶端之前，請確保你的電腦有足夠的資源來執行它。你可以在下方找到最低和建議的要求。

硬體的瓶頸主要在於磁碟空間。同步以太坊區塊鏈是非常密集的輸入/輸出操作，並且需要大量空間。最好擁有一個**固態硬碟 (SSD)**，即使在同步之後，仍有數百 GB 的可用空間。

資料庫的大小和初始同步的速度取決於所選的客戶端、其設定以及[同步策略](/developers/docs/nodes-and-clients/#sync-modes)。

此外，請確保你的網際網路連線不受[頻寬上限](https://wikipedia.org/wiki/Data_cap)的限制。建議使用不限流量的連線，因為初始同步和廣播到網路的資料可能會超過你的限制。

##### 作業系統
所有客戶端都支援主要的作業系統 - Linux、macOS、Windows。這意味著你可以在一般桌上型電腦或伺服器機器上，使用最適合你的作業系統 (OS) 來執行節點。請確保你的作業系統是最新的，以避免潛在的問題和安全漏洞。

##### 最低要求
- 2 核心以上的 CPU
- 8 GB RAM
- 2TB SSD
- 10+ MBit/s 頻寬

##### 建議規格
- 4 核心以上的快速 CPU
- 16 GB+ RAM
- 2+TB 的快速 SSD
- 25+ MBit/s 頻寬

你選擇的同步模式和客戶端會影響空間要求，但我們在下方估算了每個客戶端所需的磁碟空間。

| 客戶端 | 磁碟大小（快照同步） | 磁碟大小（完整歸檔） |
| ---------- | --------------------- | ------------------------ |
| 貝蘇 (Besu)       | 800GB+                | 12TB+                    |
| 艾瑞貢 (Erigon)     | 不適用                   | 2.5TB+                   |
| Geth       | 500GB+                | 12TB+                    |
| 奈瑟邁 (Nethermind) | 500GB+                | 12TB+                    |
| 瑞斯 (Reth)       | 不適用                   | 2.2TB+                   |

- 注意：艾瑞貢 (Erigon) 和瑞斯 (Reth) 不提供快照同步，但可以進行完整修剪（艾瑞貢約需 2TB，瑞斯約需 1.2TB）

對於共識客戶端，空間要求也取決於客戶端實作和啟用的功能（例如驗證者罰沒者），但通常需要額外 200GB 用於信標資料。隨著驗證者數量的增加，頻寬負載也會增加。你可以在[這份分析中找到有關共識客戶端要求的詳細資訊](https://mirror.xyz/0x934e6B4D7eee305F8C9C42b46D6EEA09CcFd5EDc/b69LBy8p5UhcGJqUAmT22dpvdkU-Pulg2inrhoS9Mbc)。

#### 隨插即用的解決方案 {#plug-and-play}

使用自有硬體執行節點最簡單的選項是使用隨插即用的設備。來自供應商的預先設定機器提供了最直接的體驗：訂購、連接、執行。一切都已預先設定好並自動執行，並配有直觀的指南和儀表板，用於監控和控制軟體。

- [DappNode](https://dappnode.io/)
- [Avado](https://ava.do/)

#### 在單板電腦上的以太坊 {#ethereum-on-a-single-board-computer}

執行以太坊節點一種簡單且便宜的方法是使用單板電腦，即使是像 Raspberry Pi 這樣具有 ARM 架構的電腦也可以。[Ethereum on ARM](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/) 為 Raspberry Pi 和其他 ARM 開發板提供了多個執行和共識客戶端易於執行的映像檔。

像這樣小巧、實惠且高效的裝置非常適合在家中執行節點，但請記住它們的效能有限。

## 啟動節點 {#spinning-up-node}

實際的客戶端設定可以使用自動化啟動器完成，也可以手動直接設定客戶端軟體。

對於較不進階的使用者，建議的方法是使用啟動器，這是一種引導你完成安裝並自動化客戶端設定過程的軟體。然而，如果你有一些使用終端機的經驗，手動設定的步驟應該很容易遵循。

### 引導設定 {#automatized-setup}

多個使用者友善的專案旨在改善設定客戶端的體驗。這些啟動器提供自動化的客戶端安裝和設定，有些甚至提供圖形介面，用於引導設定和監控客戶端。

以下是一些只需點擊幾下即可幫助你安裝和控制客戶端的專案：

- [DappNode](https://docs.dappnode.io/docs/user/getting-started/choose-your-path) - DappNode 不僅僅是供應商提供的一台機器。該軟體、實際的節點啟動器以及具有許多功能的控制中心，都可以在任意硬體上使用。
- [EthPillar](https://www.coincashew.com/coins/overview-eth/ethpillar) - 設定全節點最快、最簡單的方法。單行指令設定工具和節點管理 TUI。免費。開源。由獨立質押者為以太坊提供的公共財。支援 ARM64 和 AMD64。
- [eth-docker](https://eth-docker.net/) - 使用 Docker 進行自動化設定，專注於簡單且安全的質押，需要基本的終端機和 Docker 知識，建議稍微進階的使用者使用。
- [Stereum](https://stereum-dev.github.io/ethereum-node-web-docs) - 透過 SSH 連線在遠端伺服器上安裝客戶端的啟動器，具有 GUI 設定指南、控制中心和許多其他功能。
- [Sedge](https://docs.sedge.nethermind.io/docs/intro) - 節點設定工具，使用 CLI 精靈自動產生 Docker 設定。由奈瑟邁 (Nethermind) 使用 Go 語言編寫。
- [Chainstack Self-Hosted](https://docs.chainstack.com/docs/self-hosted/introduction) - 用於在 Kubernetes 上部署執行和共識客戶端的 Web UI 和 CLI。包含快照引導和內建監控。免費。不需要 Chainstack 帳戶。由 Chainstack 建置。

### 手動客戶端設定 {#manual-setup}

另一個選項是手動下載、驗證和設定客戶端軟體。即使某些客戶端提供圖形介面，手動設定仍然需要基本的終端機技能，但提供了更多的多功能性。

如前所述，設定你自己的以太坊節點將需要執行一對共識和執行客戶端。某些客戶端可能包含另一種類型的輕客戶端，並且無需任何其他軟體即可同步。然而，完全無須信任的驗證需要這兩種實作。

#### 取得客戶端軟體 {#getting-the-client}

首先，你需要取得你偏好的[執行客戶端](/developers/docs/nodes-and-clients/#execution-clients)和[共識客戶端](/developers/docs/nodes-and-clients/#consensus-clients)軟體。

你可以簡單地下載適合你作業系統和架構的執行檔應用程式或安裝套件。請務必驗證下載套件的簽章和校驗和。某些客戶端還提供儲存庫或 Docker 映像檔，以便更輕鬆地安裝和更新。所有客戶端都是開源的，因此你也可以從原始碼編譯它們。這是一種更進階的方法，但在某些情況下可能是必要的。

每個客戶端的安裝說明都在上述客戶端清單中連結的文件中提供。

以下是客戶端的發布頁面，你可以在其中找到它們預先建置的二進位檔案或安裝說明：

##### 執行客戶端
- [貝蘇 (Besu)](https://github.com/hyperledger/besu/releases)
- [艾瑞貢 (Erigon)](https://github.com/ledgerwatch/erigon/releases)
- [Geth](https://geth.ethereum.org/downloads)
- [奈瑟邁 (Nethermind)](https://downloads.nethermind.io/)
- [瑞斯 (Reth)](https://reth.rs/installation/installation.html)

值得注意的是，客戶端多樣性是[執行層上的一個問題](/developers/docs/nodes-and-clients/client-diversity/#execution-layer)。建議讀者考慮執行少數派的執行客戶端。

##### 共識客戶端
- [萊特豪斯 (Lighthouse)](https://github.com/sigp/lighthouse/releases/latest)
- [洛德斯塔 (Lodestar)](https://chainsafe.github.io/lodestar/run/getting-started/installation#build-from-source/)（不提供預先建置的二進位檔案，僅提供 Docker 映像檔或需從原始碼編譯）
- [寧布斯 (Nimbus)](https://github.com/status-im/nimbus-eth2/releases/latest)
- [普萊斯姆 (Prysm)](https://github.com/prysmaticlabs/prysm/releases/latest)
- [泰庫 (Teku)](https://github.com/ConsenSys/teku/releases)

[客戶端多樣性](/developers/docs/nodes-and-clients/client-diversity/)對於執行驗證者的共識節點至關重要。如果大多數驗證者都在執行單一客戶端實作，網路安全就會面臨風險。因此，建議考慮選擇少數派客戶端。

[查看最新的網路客戶端使用情況](https://clientdiversity.org/)，並了解更多關於[客戶端多樣性](/developers/docs/nodes-and-clients/client-diversity)的資訊。

##### 驗證軟體
從網際網路下載軟體時，建議驗證其完整性。此步驟是可選的，但特別是對於像以太坊客戶端這樣關鍵的基礎設施，了解潛在的攻擊向量並避免它們非常重要。如果你下載了預先建置的二進位檔案，你需要信任它，並承擔攻擊者可能將執行檔替換為惡意檔案的風險。

開發人員使用他們的 PGP 金鑰對發布的二進位檔案進行簽章，因此你可以透過密碼學驗證你執行的正是他們建立的軟體。你只需要取得開發人員使用的公鑰，這些公鑰可以在客戶端發布頁面或文件中找到。下載客戶端發布版本及其簽章後，你可以使用 PGP 實作（例如 [GnuPG](https://gnupg.org/download/index.html)）輕鬆驗證它們。查看關於在 [Linux](https://www.tecmint.com/verify-pgp-signature-downloaded-software/) 或 [Windows/macOS](https://freedom.press/training/verifying-open-source-software/) 上使用 `gpg` 驗證開源軟體的教學。

另一種驗證形式是確保你下載的軟體的雜湊（一種獨特的密碼學指紋）與開發人員提供的雜湊相符。這比使用 PGP 更簡單，而且有些客戶端只提供這個選項。只需對下載的軟體執行雜湊函數，並將其與發布頁面上的雜湊進行比較。例如：

```sh
sha256sum teku-22.6.1.tar.gz

9b2f8c1f8d4dab0404ce70ea314ff4b3c77e9d27aff9d1e4c1933a5439767dde
```

#### 客戶端設定 {#client-setup}

安裝、下載或編譯客戶端軟體後，你就可以準備執行它了。這只意味著它必須以正確的設定執行。客戶端提供豐富的設定選項，可以啟用各種功能。

讓我們從可能顯著影響客戶端效能和資料使用量的選項開始。[同步模式](/developers/docs/nodes-and-clients/#sync-modes)代表下載和驗證區塊鏈資料的不同方法。在啟動節點之前，你應該決定要使用哪個網路和同步模式。最需要考慮的是客戶端所需的磁碟空間和同步時間。請注意客戶端的文件，以確定哪個同步模式是預設的。如果這不適合你，請根據安全等級、可用資料和成本選擇另一個。除了同步演算法之外，你還可以設定修剪不同種類的舊資料。修剪可以刪除過時的資料，即移除從最近區塊無法到達的狀態樹節點。

其他基本設定選項包括：選擇網路（主網或測試網）、啟用 RPC 或 WebSockets 的 HTTP 端點等。你可以在客戶端的文件中找到所有功能和選項。可以透過在 CLI 或設定檔中直接使用相應的標誌執行客戶端來設定各種客戶端設定。每個客戶端都略有不同；請務必參閱其官方文件或說明頁面以獲取有關設定選項的詳細資訊。

出於測試目的，你可能更喜歡在其中一個測試網網路上執行客戶端。[查看支援網路的概述](/developers/docs/nodes-and-clients/#execution-clients)。

在下一節中可以找到使用基本設定執行執行客戶端的範例。

#### 啟動執行客戶端 {#starting-the-execution-client}

在啟動以太坊客戶端軟體之前，請執行最後一次檢查，確保你的環境已準備就緒。例如，請確保：

- 考慮到所選的網路和同步模式，有足夠的磁碟空間。
- 記憶體和 CPU 未被其他程式佔用。
- 作業系統已更新至最新版本。
- 系統具有正確的時間和日期。
- 你的路由器和防火牆接受監聽連接埠上的連線。預設情況下，以太坊客戶端使用一個監聽 (TCP) 連接埠和一個節點發現 (UDP) 連接埠，預設皆為 30303。

先在測試網上執行你的客戶端，以幫助確保一切運作正常。

你需要在啟動時宣告任何非預設的客戶端設定。你可以使用標誌或設定檔來宣告你偏好的設定。每個客戶端的功能集和設定語法都不同。查看你客戶端的文件以了解具體細節。

執行和共識客戶端透過 [Engine API](https://github.com/ethereum/execution-apis/tree/main/src/engine) 中指定的經過驗證的端點進行通訊。為了連接到共識客戶端，執行客戶端必須在已知路徑產生一個 [`jwtsecret`](https://jwt.io/)。基於安全和穩定性原因，客戶端應在同一台機器上執行，並且兩個客戶端都必須知道此路徑，因為它用於驗證它們之間的本地 RPC 連線。執行客戶端還必須為經過驗證的 API 定義一個監聽連接埠。

此代幣由客戶端軟體自動產生，但在某些情況下，你可能需要自己產生。你可以使用 [OpenSSL](https://www.openssl.org/) 產生它：

```sh
openssl rand -hex 32 > jwtsecret
```

#### 執行執行客戶端 {#running-an-execution-client}

本節將引導你啟動執行客戶端。它僅作為基本設定的範例，將使用以下設定啟動客戶端：

- 指定要連接的網路，在我們的範例中為主網
  - 你可以改為選擇[其中一個測試網](/developers/docs/networks/)來對你的設定進行初步測試
- 定義資料目錄，所有資料（包括區塊鏈）都將儲存在此處
  - 請確保將路徑替換為真實路徑，例如指向你的外接硬碟
- 啟用與客戶端通訊的介面
  - 包括用於與共識客戶端通訊的 JSON-RPC 和 Engine API
- 定義經過驗證的 API 的 `jwtsecret` 路徑
  - 請確保將範例路徑替換為客戶端可以存取的真實路徑，例如 `/tmp/jwtsecret`

請記住，這只是一個基本範例，所有其他設定都將設為預設值。請注意每個客戶端的文件，以了解預設值、設定和功能。如需更多功能（例如執行驗證者、監控等），請參閱特定客戶端的文件。

> 注意，範例中的反斜線 `\` 僅用於格式化目的；設定標誌可以在單行中定義。

##### 執行貝蘇 (Besu)
此範例在主網上啟動貝蘇 (Besu)，將區塊鏈資料以預設格式儲存在 `/data/ethereum`，啟用 JSON-RPC 和 Engine RPC 以連接共識客戶端。Engine API 使用代幣 `jwtsecret` 進行驗證，並且僅允許來自 `localhost` 的呼叫。

```sh
besu --network=mainnet \
    --data-path=/data/ethereum \
    --rpc-http-enabled=true \
    --engine-rpc-enabled=true \
    --engine-host-allowlist="*" \
    --engine-jwt-enabled=true \
    --engine-jwt-secret=/path/to/jwtsecret
```

貝蘇 (Besu) 還提供了一個啟動器選項，它會詢問一系列問題並產生設定檔。使用以下指令執行互動式啟動器：

```sh
besu --Xlauncher
```

[貝蘇 (Besu) 的文件](https://besu.hyperledger.org/public-networks/get-started/start-node/)包含其他選項和設定詳細資訊。

##### 執行艾瑞貢 (Erigon)
此範例在主網上啟動艾瑞貢 (Erigon)，將區塊鏈資料儲存在 `/data/ethereum`，啟用 JSON-RPC，定義允許哪些命名空間，並啟用連接共識客戶端的驗證（由 `jwtsecret` 路徑定義）。

```sh
erigon --chain mainnet \
    --datadir /data/ethereum  \
    --http --http.api=engine,eth,web3,net \
    --authrpc.jwtsecret=/path/to/jwtsecret
```

艾瑞貢 (Erigon) 預設使用 8GB HDD 執行完整同步，這將產生超過 2TB 的歸檔資料。請確保 `datadir` 指向具有足夠可用空間的磁碟，或者查看可以修剪不同種類資料的 `--prune` 標誌。查看艾瑞貢 (Erigon) 的 `--help` 以了解更多資訊。

##### 執行 Geth
此範例在主網上啟動 Geth，將區塊鏈資料儲存在 `/data/ethereum`，啟用 JSON-RPC 並定義允許哪些命名空間。它還啟用了連接共識客戶端的驗證，這需要 `jwtsecret` 的路徑，以及定義允許哪些連線的選項，在我們的範例中僅允許來自 `localhost` 的連線。

```sh
geth --mainnet \
    --datadir "/data/ethereum" \
    --http --authrpc.addr localhost \
    --authrpc.vhosts="localhost" \
    --authrpc.port 8551
    --authrpc.jwtsecret=/path/to/jwtsecret
```

查看[所有設定選項的文件](https://geth.ethereum.org/docs/fundamentals/command-line-options)，並了解更多關於[與共識客戶端一起執行 Geth](https://geth.ethereum.org/docs/getting-started/consensus-clients) 的資訊。

##### 執行奈瑟邁 (Nethermind)
奈瑟邁 (Nethermind) 提供各種[安裝選項](https://docs.nethermind.io/get-started/installing-nethermind)。該套件附帶各種二進位檔案，包括一個帶有引導設定的啟動器，這將幫助你互動式地建立設定。或者，你可以找到 Runner，它是執行檔本身，你可以直接使用設定標誌執行它。JSON-RPC 預設為啟用。

```sh
Nethermind.Runner --config mainnet \
    --datadir /data/ethereum \
    --JsonRpc.JwtSecretFile=/path/to/jwtsecret
```

奈瑟邁 (Nethermind) 文件提供了關於與共識客戶端一起執行奈瑟邁 (Nethermind) 的[完整指南](https://docs.nethermind.io/get-started/running-node/)。

執行客戶端將啟動其核心功能、選擇的端點，並開始尋找對等節點。成功發現對等節點後，客戶端開始同步。執行客戶端將等待來自共識客戶端的連線。一旦客戶端成功同步到當前狀態，當前的區塊鏈資料將可用。

##### 執行瑞斯 (Reth)
此範例在主網上啟動瑞斯 (Reth)，使用預設資料位置。啟用 JSON-RPC 和 Engine RPC 驗證以連接共識客戶端（由 `jwtsecret` 路徑定義），並且僅允許來自 `localhost` 的呼叫。

```sh
reth node \
    --authrpc.jwtsecret /path/to/jwtsecret \
    --authrpc.addr 127.0.0.1 \
    --authrpc.port 8551
```

請參閱[設定瑞斯 (Reth)](https://reth.rs/run/config.html?highlight=data%20directory#configuring-reth) 以了解更多關於預設資料目錄的資訊。[瑞斯 (Reth) 的文件](https://reth.rs/run/mainnet.html)包含其他選項和設定詳細資訊。

#### 啟動共識客戶端 {#starting-the-consensus-client}

共識客戶端必須以正確的連接埠設定啟動，以建立與執行客戶端的本地 RPC 連線。共識客戶端必須使用暴露的執行客戶端連接埠作為設定參數來執行。

共識客戶端還需要執行客戶端的 `jwt-secret` 路徑，以便驗證它們之間的 RPC 連線。與上述執行範例類似，每個共識客戶端都有一個設定標誌，該標誌將 jwt 代幣檔案路徑作為參數。這必須與提供給執行客戶端的 `jwtsecret` 路徑一致。

如果你計劃執行驗證者，請確保新增一個設定標誌來指定費用接收者的以太坊地址。這是你的驗證者累積以太幣獎勵的地方。每個共識客戶端都有一個選項（例如 `--suggested-fee-recipient=0xabcd1`），該選項將以太坊地址作為參數。

在測試網上啟動信標節點時，你可以透過使用公共端點進行[檢查點同步](https://notes.ethereum.org/@launchpad/checkpoint-sync)來節省大量的同步時間。

#### 執行共識客戶端 {#running-a-consensus-client}

##### 執行萊特豪斯 (Lighthouse)
在執行萊特豪斯 (Lighthouse) 之前，請在 [Lighthouse Book](https://lighthouse-book.sigmaprime.io/installation.html) 中了解更多關於如何安裝和設定它的資訊。

```sh
lighthouse beacon_node \
    --network mainnet \
    --datadir /data/ethereum \
    --http \
    --execution-endpoint http://127.0.0.1:8551 \
    --execution-jwt /path/to/jwtsecret
```

##### 執行洛德斯塔 (Lodestar)
透過編譯或下載 Docker 映像檔來安裝洛德斯塔 (Lodestar) 軟體。在[文件](https://chainsafe.github.io/lodestar/)和更全面的[設定指南](https://hackmd.io/@philknows/rk5cDvKmK)中了解更多資訊。

```sh
lodestar beacon \
    --dataDir="/data/ethereum" \
    --network=mainnet \
    --eth1.enabled=true \
    --execution.urls="http://127.0.0.1:8551" \
    --jwt-secret="/path/to/jwtsecret"
```

##### 執行寧布斯 (Nimbus)
寧布斯 (Nimbus) 附帶共識和執行客戶端。即使在運算能力非常有限的各種裝置上，它也可以執行。
在[安裝依賴項和寧布斯 (Nimbus) 本身](https://nimbus.guide/quick-start.html)之後，你可以執行其共識客戶端：

```sh
nimbus_beacon_node \
    --network=mainnet \
    --web3-url=http://127.0.0.1:8551 \
    --rest \
    --jwt-secret="/path/to/jwtsecret"
```

##### 執行普萊斯姆 (Prysm)
普萊斯姆 (Prysm) 附帶允許輕鬆自動安裝的腳本。詳細資訊可以在[普萊斯姆 (Prysm) 文件](https://prysm.offchainlabs.com/docs/install-prysm/install-with-script/)中找到。

```sh
./prysm.sh beacon-chain \
    --mainnet \
    --datadir /data/ethereum  \
    --execution-endpoint=http://localhost:8551  \
    --jwt-secret=/path/to/jwtsecret
```

##### 執行泰庫 (Teku)
```sh
teku --network mainnet \
    --data-path "/data/ethereum" \
    --ee-endpoint http://localhost:8551 \
    --ee-jwt-secret-file "/path/to/jwtsecret"
```

當共識客戶端連接到執行客戶端以讀取存款合約並識別驗證者時，它也會連接到其他信標節點對等節點，並開始從創世區塊同步共識時隙。一旦信標節點達到當前紀元，Beacon API 就可以供你的驗證者使用。了解更多關於 [Beacon Node API](https://eth2docs.vercel.app/) 的資訊。

### 新增驗證者 {#adding-validators}

共識客戶端作為信標節點供驗證者連接。每個共識客戶端都有自己的驗證者軟體，在其各自的文件中有詳細描述。

執行你自己的驗證者允許進行[獨立質押](/staking/solo/)，這是支持以太坊網路最具影響力且無須信任的方法。然而，這需要存入 32 ETH。若要以較小的金額在你自己的節點上執行驗證者，具有無需許可節點營運商的去中心化礦池（例如 [Rocket Pool](https://rocketpool.net/node-operators)）可能會讓你感興趣。

開始質押和產生驗證者金鑰最簡單的方法是使用 [Hoodi 測試網質押啟動平台](https://hoodi.launchpad.ethereum.org/)，它允許你透過[在 Hoodi 上執行節點](https://notes.ethereum.org/@launchpad/hoodi)來測試你的設定。當你準備好進入主網時，你可以使用[主網質押啟動平台](https://launchpad.ethereum.org/)重複這些步驟。

查看[質押頁面](/staking)以獲取有關質押選項的概述。

### 使用節點 {#using-the-node}

執行客戶端提供 [RPC API 端點](/developers/docs/apis/json-rpc/)，你可以使用它們以各種方式在以太坊網路上提交交易、互動或部署智慧合約：

- 使用合適的協定手動呼叫它們（例如，使用 `curl`）
- 附加提供的控制台（例如，`geth attach`）
- 使用 Web3 函式庫在應用程式中實作它們，例如 [Web3.py](https://web3py.readthedocs.io/en/stable/overview.html#overview)、[ethers](https://github.com/ethers-io/ethers.js/)

不同的客戶端對 RPC 端點有不同的實作。但有一個標準的 JSON-RPC，你可以與每個客戶端一起使用。如需概述，請[閱讀 JSON-RPC 文件](/developers/docs/apis/json-rpc/)。需要來自以太坊網路資訊的應用程式可以使用此 RPC。例如，受歡迎的錢包梅塔馬斯克 (MetaMask) 讓你[連接到你自己的 RPC 端點](https://metamask.zendesk.com/hc/en-us/articles/360015290012-Using-a-Local-Node)，這具有強大的隱私和安全優勢。

共識客戶端都暴露了一個 [Beacon API](https://ethereum.github.io/beacon-APIs)，可用於檢查共識客戶端的狀態，或透過使用 [Curl](https://curl.se) 等工具發送請求來下載區塊和共識資料。有關此方面的更多資訊，可以在每個共識客戶端的文件中找到。

#### 存取 RPC {#reaching-rpc}

執行客戶端 JSON-RPC 的預設連接埠是 `8545`，但你可以在設定中修改本地端點的連接埠。預設情況下，RPC 介面只能在你的電腦的 localhost 上存取。為了使其可遠端存取，你可能希望透過將地址變更為 `0.0.0.0` 來將其暴露給公眾。這將使其可透過區域網路和公共 IP 地址存取。在大多數情況下，你還需要在路由器上設定通訊埠轉發。

請謹慎處理將連接埠暴露到網際網路的操作，因為這將讓網際網路上的任何人控制你的節點。如果你將客戶端用作錢包，惡意行為者可能會存取你的節點以癱瘓你的系統或竊取你的資金。

解決此問題的一種方法是防止潛在有害的 RPC 方法被修改。例如，使用 Geth，你可以使用標誌宣告可修改的方法：`--http.api web3,eth,txpool`。

透過開發邊緣層 API 或網頁伺服器應用程式（如 Nginx），並將它們連接到你客戶端的本地地址和連接埠，可以擴展對 RPC 介面的存取。利用中介層還可以讓開發人員能夠設定憑證，以建立到 RPC 介面的安全 `https` 連線。

設定網頁伺服器、代理伺服器或面向外部的 Rest API 並不是提供存取節點 RPC 端點的唯一方法。另一種保護隱私的設定可公開存取端點的方法是，在你自己的 [Tor](https://www.torproject.org/) 洋蔥服務上託管節點。這將讓你可以在沒有靜態公共 IP 地址或開啟連接埠的情況下，在區域網路外部存取 RPC。然而，使用此設定可能只允許透過 Tor 網路存取 RPC 端點，這並非所有應用程式都支援，並且可能會導致連線問題。

為此，你必須建立自己的[洋蔥服務](https://community.torproject.org/onion-services/)。查看關於洋蔥服務設定的[文件](https://community.torproject.org/onion-services/setup/)以託管你自己的服務。你可以將其指向具有 RPC 連接埠代理的網頁伺服器，或者直接指向 RPC。

最後，提供內部網路存取最受歡迎的方法之一是透過 VPN 連線。根據你的使用案例和需要存取你節點的使用者數量，安全的 VPN 連線可能是一個選項。[OpenVPN](https://openvpn.net/) 是一個功能齊全的 SSL VPN，它使用業界標準的 SSL/TLS 協定實作 OSI 第 2 層或第 3 層安全網路擴展，支援基於憑證、智慧卡和/或使用者名稱/密碼憑證的靈活客戶端驗證方法，並允許使用套用於 VPN 虛擬介面的防火牆規則來實施特定於使用者或群組的存取控制策略。

### 營運節點 {#operating-the-node}

你應該定期監控你的節點，以確保它正常執行。你可能需要偶爾進行維護。

#### 保持節點上線 {#keeping-node-online}

你的節點不必一直保持上線，但你應該盡可能讓它保持上線，以使其與網路保持同步。你可以將其關閉以重新啟動，但請記住：

- 如果最近的狀態仍在寫入磁碟，關閉可能需要幾分鐘的時間。
- 強制關閉可能會損壞資料庫，需要你重新同步整個節點。
- 你的客戶端將與網路失去同步，並在重新啟動時需要重新同步。雖然節點可以從上次關閉的地方開始同步，但該過程可能需要一些時間，具體取決於它離線的時間長短。

_這不適用於共識層驗證者節點。_ 將你的節點離線將影響所有依賴它的服務。如果你是為了_質押_目的而執行節點，你應該盡量將停機時間降至最低。

#### 建立客戶端服務 {#creating-client-services}

考慮建立一個服務，以便在啟動時自動執行你的客戶端。例如，在 Linux 伺服器上，良好的做法是建立一個服務（例如使用 `systemd`），該服務在權限受限的使用者下以正確的設定執行客戶端，並自動重新啟動。

#### 更新客戶端 {#updating-clients}

你需要使用最新的安全修補程式、功能和 [EIP](/eips/) 來保持你的客戶端軟體處於最新狀態。特別是在[硬分叉](/ethereum-forks/)之前，請確保你執行的是正確的客戶端版本。

> 在重要的網路更新之前，以太坊基金會 (EF) 會在其[部落格](https://blog.ethereum.org)上發布文章。你可以[訂閱這些公告](https://blog.ethereum.org/category/protocol#subscribe)，以便在你的節點需要更新時收到電子郵件通知。

更新客戶端非常簡單。每個客戶端在其文件中都有具體的說明，但過程通常只是下載最新版本並使用新的執行檔重新啟動客戶端。客戶端應該會從中斷的地方繼續，但已套用更新。

每個客戶端實作都有一個人類可讀的版本字串，用於點對點協定中，但也可以從命令列存取。此版本字串讓使用者可以檢查他們是否執行正確的版本，並允許區塊瀏覽器和其他有興趣量化特定客戶端在網路上分佈的分析工具使用。請參閱個別客戶端文件以獲取有關版本字串的更多資訊。

#### 執行其他服務 {#running-additional-services}

執行你自己的節點讓你可以使用需要直接存取以太坊客戶端 RPC 的服務。這些是建構在以太坊之上的服務，例如[第二層 (L2) 解決方案](/developers/docs/scaling/#layer-2-scaling)、錢包後端、區塊瀏覽器、開發人員工具和其他以太坊基礎設施。

#### 監控節點 {#monitoring-the-node}

為了正確監控你的節點，請考慮收集指標。客戶端提供指標端點，因此你可以獲得有關節點的全面資料。使用 [InfluxDB](https://www.influxdata.com/get-influxdb/) 或 [Prometheus](https://prometheus.io/) 等工具建立資料庫，你可以將其轉換為 [Grafana](https://grafana.com/) 等軟體中的視覺化和圖表。有許多使用此軟體的設定和不同的 Grafana 儀表板，供你視覺化你的節點和整個網路。例如，查看[關於監控 Geth 的教學](/developers/tutorials/monitoring-geth-with-influxdb-and-grafana/)。

作為監控的一部分，請務必留意機器的效能。在節點的初始同步期間，客戶端軟體可能會大量佔用 CPU 和 RAM。除了 Grafana 之外，你還可以使用作業系統提供的工具（例如 `htop` 或 `uptime`）來執行此操作。

## 進一步閱讀 {#further-reading}

- [以太坊質押指南](https://github.com/SomerEsat/ethereum-staking-guides) - _Somer Esat，經常更新_
- [指南 | 如何在主網上設定以太坊質押的驗證者](https://www.coincashew.com/coins/overview-eth/guide-or-how-to-setup-a-validator-on-eth2-mainnet) _– CoinCashew，經常更新_
- [EthStaker 關於在測試網上執行驗證者的指南](https://github.com/remyroy/ethstaker#guides) – _EthStaker，定期更新_
- [適用於以太坊節點的範例 AWS 區塊鏈節點執行器應用程式](https://aws-samples.github.io/aws-blockchain-node-runners/docs/Blueprints/Ethereum) - _AWS，經常更新_
- [節點營運商的合併常見問題](https://notes.ethereum.org/@launchpad/node-faq-merge) - _2022 年 7 月_
- [分析成為以太坊完全驗證節點的硬體要求](https://medium.com/coinmonks/analyzing-the-hardware-requirements-to-be-an-ethereum-full-validated-node-dc064f167902) _– Albert Palau，2018 年 9 月 24 日_
- [執行以太坊全節點：給缺乏動力者的指南](https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _– Justin Leroux，2019 年 11 月 7 日_
- [在以太坊主網上執行 Hyperledger Besu 節點：好處、要求和設定](https://pegasys.tech/running-a-hyperledger-besu-node-on-the-ethereum-mainnet-benefits-requirements-and-setup/) _– Felipe Faraggi，2020 年 5 月 7 日_
- [使用監控堆疊部署奈瑟邁 (Nethermind) 以太坊客戶端](https://medium.com/nethermind-eth/deploying-nethermind-ethereum-client-with-monitoring-stack-55ce1622edbd) _– Nethermind.eth，2020 年 7 月 8 日_

## 相關主題 {#related-topics}

- [節點與客戶端](/developers/docs/nodes-and-clients/)
- [區塊](/developers/docs/blocks/)
- [網路](/developers/docs/networks/)