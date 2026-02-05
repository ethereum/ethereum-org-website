---
title: "運行你自己的以太坊節點"
description: "運行你自己的以太坊用戶端實例的一般介紹。"
lang: zh-tw
sidebarDepth: 2
---

運行你自己的節點可以為你帶來各種好處，開闢新的可能性，並有助於支援生態系統。 本頁將引導你啟動自己的節點並參與驗證以太坊交易。

請注意，在[合併](/roadmap/merge)之後，需要兩個用戶端才能執行一個以太坊節點：一個**執行層 (EL)** 用戶端以及一個**共識層 (CL)** 用戶端。 本頁將展示如何安装、配置和連接這兩種用戶端以運行以太坊節點。

## 先決條件 {#prerequisites}

你應該了解以太坊節點是什麼以及為什麼你可能想要運行用戶端。 [節點與用戶端](/developers/docs/nodes-and-clients/)中涵蓋了這個主題。

如果您是執行節點的新手，或正在尋找技術性較低的途徑，我們建議您先查看我們為使用者準備的[執行以太坊節點](/run-a-node)簡介。

## 選擇方法 {#choosing-approach}

啟動節點的第一步是選擇方法。 根據要求及不同的可能性，你必須選擇（執行及共識用戶端）的用戶端實作、環境（硬體、系統），以及用戶端設定參數。

本頁將引導你做出這些決定，幫助你找到運行以太坊實例最適合的方式。

若要從用戶端實作中選擇，請參閱所有可用的主網就緒[執行用戶端](/developers/docs/nodes-and-clients/#execution-clients)、[共識用戶端](/developers/docs/nodes-and-clients/#consensus-clients)，並了解[用戶端多樣性](/developers/docs/nodes-and-clients/client-diversity)。

根據用戶端的[要求](#requirements)，決定要在自己的[硬體或雲端](#local-vs-cloud)上執行軟體。

準備好環境後，使用適合新手的介面 ([自動設定](#automatized-setup)) 或[手動](#manual-setup)使用有進階選項的終端機安裝所選的用戶端。

當節點執行和同步時，您就可以[使用它](#using-the-node)了，但請務必留意其[維護](#operating-the-node)。

![用戶端設定](./diagram.png)

### 環境與硬體 {#environment-and-hardware}

#### 本地或雲端 {#local-vs-cloud}

以太坊用戶端可以在消費級電腦上運行，並且不需要任何如挖礦機的特殊硬體。 因此，根據你的需求，你有多種選項來部署節點。
為了簡單起見，我們考慮一下在本地實體機和雲端伺服器上都運行一個節點：

- 雲端
  - 提供者提供伺服器高正常運行時間和靜態公開 IP 位址
  - 取得專用或虛擬伺服器會比打造你自己的伺服器更容易
  - 其中的取捨在於信任第三方 - 伺服器提供商
  - 由於全節點所需的儲存大小，租用伺服器的價格可能會很高
- 自有硬體
  - 更加去信任，自主權更高的方法
  - 一次性投資
  - 購買預先配置機器的選項
  - 你必須親自準備、維護，並可能需排除機器和網路的問題。

兩種選項具有上面總結的不同的優點。 如果你正在尋找雲端解決方案，除了許多傳統的雲端運算提供者之外，還有專注於部署節點的服務可供選擇。 查看[節點即服務](/developers/docs/nodes-and-clients/nodes-as-a-service/)，了解更多關於託管節點的選項。

#### 硬體 {#hardware}

然而，抗審查的去中心化網路不應依賴雲端提供者。 因而，在自己的本機硬體上運行自己的節點對生態系統來說更健全。 [估計](https://www.ethernodes.org/networkType/cl/Hosting)顯示大部分節點在雲端執行，這可能成為單點故障。

以太坊用戶端可以在自己的電腦、筆記型電腦、伺服器，或甚至是單板電腦上運行。 當在你的個人電腦上運行用戶端成為可能時，弄台專門運行節點的機器可以大幅提高效能和安全性，同時將最大程度上減小對你主要電腦的影響。

使用你自己的硬體非常容易。 有許多簡易的選項，適合較技術性人士的進階設定。 那麼，我們來看看在你的裝置上運行以太坊節點的要求和方法吧。

#### 需求 {#requirements}

硬體要求因用戶端而異，但通常不會那麼高，因為節點只需要保持同步。 請別和挖礦搞混了，挖礦需要的算力遠高於此。 然而，使用更強大的硬體，同步時間和效能確實會提高。

在安裝任何用戶端之前，請確保你的電腦有足夠的資源來運行用戶端。 你可以在下方找到最低和推薦的硬體要求。

硬體瓶頸主要是磁碟空間。 同步以太坊區塊鏈是輸入/輸出非常密集的操作，且需要大量空間。 最好有一個**固態硬碟 (SSD)**，即使在同步後仍有數百 GB 的可用空間。

資料庫的大小和初始同步的速度，取決於所選的用戶端、其設定和[同步策略](/developers/docs/nodes-and-clients/#sync-modes)。

另外，請確保您的網際網路連線沒有[頻寬上限](https://wikipedia.org/wiki/Data_cap)的限制。 建議使用不按流量計費的連線，因為初始同步和廣播到網路的資料可能會超出你的限制。

##### 作業系統

所有用戶端都支援主要作業系統 - Linux、MacOS、Windows。 這表示你可以使用最適合你的作業系統 (OS) 在常規桌上型電腦或伺服器電腦上運行節點。 確保你的作業系統是最新的，以避免潛在的問題和安全漏洞。

##### 最低要求

- 具有 2 個以上核心的 CPU
- 8 GB RAM
- 2 TB 固態硬碟
- 10+ MBit/s 帶寬

##### 推薦規格

- 具有 4 個以上核心的快速 CPU
- 16 GB+ RAM
- 2TB 以上的快速固態硬碟
- 25+ MBit/s 帶寬

你選擇的同步模式及用戶端將影響所需磁碟空間，我們在下表估計了每個用戶端所需的磁碟空間。

| 用戶端        | 磁碟空間（快速同步） | 磁碟空間（完整歸檔）               |
| ---------- | ---------- | ------------------------ |
| Besu       | 800GB 以上   | 12TB 以上                  |
| Erigon     | 不適用        | 2.5TB 以上 |
| Geth       | 500GB 以上   | 12TB 以上                  |
| Nethermind | 500GB 以上   | 12TB 以上                  |
| Reth       | 不適用        | 2.2TB 以上 |

- 注意：Erigon 和 Reth 不提供快照同步，但支援完全修剪（Erigon 約 2TB，Reth 約 1.2TB）

對於共識用戶端，空間需求也取決於用戶端實作和啟用的功能 (例如，驗證程式懲罰者)，但通常需要額外 200GB 的空間來儲存信標資料。 由於龐大的驗證者數量，帶寬負載也隨之增長。 您可以在[此分析中找到關於共識用戶端需求的詳細資訊](https://mirror.xyz/0x934e6B4D7eee305F8C9C42b46D6EEA09CcFd5EDc/b69LBy8p5UhcGJqUAmT22dpvdkU-Pulg2inrhoS9Mbc)。

#### 隨插即用解決方案 {#plug-and-play}

在你自己的硬體上運行節點最簡單的方法是使用隨插即用盒。 供應商的預設置機器提供了最直覺的體驗：排序、連接、運行。 所有部分都預先設置完畢且自動運行，搭配用以監控和控制軟體的直覺指南和儀表板。

- [DappNode](https://dappnode.io/)
- [Avado](https://ava.do/)

#### 在單板電腦上執行以太坊 {#ethereum-on-a-single-board-computer}

使用單板電腦是其中一種能便利、便宜運行以太坊節點的方式，甚至可以使用 ARM 架構的開發板，如樹莓派。 [ARM 上的以太坊](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)為 Raspberry Pi 和其他 ARM 板提供了多個執行用戶端和共識用戶端的易於執行的映像檔。

這類小型、平價且高效的裝置對在家運行節點是非常理想的，不過要注意的是它們效能有限。

## 啟動節點 {#spinning-up-node}

實際的用戶端設定可以透過自動啟動器或手動完成，即直接設定用戶端軟體。

對於不是那麼進階的使用者，推薦使用啟動器，它是一種指引你安裝及自動化用戶端設定流程的軟體。 然而，如果你有使用終端機的經驗，手動設定的步驟對你來說應該很容易。

### 引導式設定 {#automatized-setup}

多個使用者友善的專案都致力於改善設定用戶端的體驗。 這些啟動器提供了自動用戶端安裝及設定，有的甚至會提供圖形介面，用於引導式設定和監控用戶端。

以下是一些只要點按幾下就能幫助你安裝並控制用戶端的專案：

- [DappNode](https://docs.dappnode.io/docs/user/getting-started/choose-your-path) - DappNode 不僅僅是來自供應商的機器。 軟體、實際節點啟動器和擁有許多功能的控制中心可在任意硬體上使用。
- [EthPillar](https://www.coincashew.com/coins/overview-eth/ethpillar) - 設定完整節點最快、最簡單的方法。 單行設置工具和節點管理 TUI。 免費。 開源. 由單獨質押者提供的以太坊公共物品。 ARM64 和 AMD64 支援。
- [eth-docker](https://eth-docker.net/) - 使用 Docker 的自動化設定，專注於簡單安全的質押，需要基本的終端機和 Docker 知識，建議給較進階的使用者。
- [Stereum](https://stereum-dev.github.io/ethereum-node-web-docs) - 透過 SSH 連線在遠端伺服器上安裝用戶端的啟動器，附有 GUI 設定指南、控制中心和許多其他功能。
- [NiceNode](https://www.nicenode.xyz/) - 一款啟動器，提供直觀的使用者體驗，可在您的電腦上執行節點。 只要選擇用戶端並簡單點按幾下即可啟動。 仍在開發中。
- [Sedge](https://docs.sedge.nethermind.io/docs/intro) - 節點設定工具，使用 CLI 精靈自動產生 Docker 設定。 由 Nethermind 使用 Go 語言開發。

### 手動設定用戶端 {#manual-setup}

另一個選擇是手動下載、驗證並設定用戶端軟體。 即使一些用戶端提供圖形介面，手動設定仍需要對終端機有基本認識，不過也提供了更多功能。

如前所述，設定你自己的以太坊節點需要運行一對共識和執行用戶端。 有些用戶端可能包含其他類型的輕量用戶端，且不需要其他軟體即可同步。 然而，完整去信任驗證需要上述兩種實作。

#### 取得用戶端軟體 {#getting-the-client}

首先，您需要取得您偏好的[執行用戶端](/developers/docs/nodes-and-clients/#execution-clients)和[共識用戶端](/developers/docs/nodes-and-clients/#consensus-clients)軟體。

你只須下載符合你作業系統和架構的可執行應用程式或安裝包。 總是驗證下載的安裝包的簽名和校驗和。 有些用戶端也提供程式碼儲存庫或 Docker 映像檔，使安裝及更新更容易。 所有的用戶端都是開源的，所以你可以從原始碼開始建構。 這是較進階的方法，但在某些情況下可能是必要的。

上方用戶端清單連結的文件中提供了安裝各個用戶端的說明。

以下是一些用戶端的版本發佈頁面，你可以在此找到預先建置的二進位檔案或安裝說明：

##### 執行用戶端

- [Besu](https://github.com/hyperledger/besu/releases)
- [Erigon](https://github.com/ledgerwatch/erigon/releases)
- [Geth](https://geth.ethereum.org/downloads/)
- [Nethermind](https://downloads.nethermind.io/)
- [Reth](https://reth.rs/installation/installation.html)

值得注意的是，用戶端多樣性是[執行層上的一個問題](/developers/docs/nodes-and-clients/client-diversity/#execution-layer)。 建議讀者們考慮運行小眾執行用戶端。

##### 共識用戶端

- [Lighthouse](https://github.com/sigp/lighthouse/releases/latest)
- [Lodestar](https://chainsafe.github.io/lodestar/run/getting-started/installation#build-from-source) (不提供預先建置的二進位檔，只有 Docker 映像檔或從原始碼建置)
- [Nimbus](https://github.com/status-im/nimbus-eth2/releases/latest)
- [Prysm](https://github.com/prysmaticlabs/prysm/releases/latest)
- [Teku](https://github.com/ConsenSys/teku/releases)

[用戶端多樣性](/developers/docs/nodes-and-clients/client-diversity/)對於執行驗證程式的共識節點至關重要。 如果大多驗證者都運行單一用戶端，網路安全將面臨風險。 因此，建議可以考慮選擇小眾用戶端。

[查看最新的網路用戶端使用情況](https://clientdiversity.org/)並深入了解[用戶端多樣性](/developers/docs/nodes-and-clients/client-diversity)。

##### 驗證軟體

從網際網路上下載軟體時，建議驗證其完整性。 這個步驟是可選的，但對於諸如以太坊用戶端等重要基礎設施，了解並避免潛在的攻擊非常重要。 如果你下載了預先建置的二進位檔案，你需要信任它並承擔攻擊者將其替換成惡意檔案的風險。

開發者使用他們的 PGP 金鑰簽署發佈的二進位檔案，如此一來你就可以使用密碼學方式驗證你運行的是他們建立的軟體。 你只需要獲得開發者使用的公鑰，這些公鑰可以在用戶端發佈頁面或文件中找到。 下載用戶端發行版及其簽章後，您可以使用 PGP 實作 (例如 [GnuPG](https://gnupg.org/download/index.html)) 來輕鬆地驗證它們。 請查看在 [Linux](https://www.tecmint.com/verify-pgp-signature-downloaded-software/) 或 [Windows/MacOS](https://freedom.press/training/verifying-open-source-software/) 上使用 `gpg` 驗證開源軟體的教學。

另一種驗證方式是確定你下載軟體的雜湊（獨一無二的密碼學指紋）和開發者提供的雜湊相符。 這比使用 PGP 進行驗證更加容易，有些用戶端也只提供此選項。 只需對下載的軟體運行雜湊函數，並將其與軟體發佈頁面的雜湊比較即可。 例如：

```sh
sha256sum teku-22.6.1.tar.gz

9b2f8c1f8d4dab0404ce70ea314ff4b3c77e9d27aff9d1e4c1933a5439767dde
```

#### 用戶端設定 {#client-setup}

在安裝、下載或編譯用戶端軟體後，你就可以執行用戶端了。 這只表示需要用正確的設定執行用戶端。 用戶端提供了豐富的設定選項，可用於啟用各種功能。

我們從會大幅影響用戶端效能和資料使用的選項開始。 [同步模式](/developers/docs/nodes-and-clients/#sync-modes)代表下載和驗證區塊鏈資料的不同方法。 在啟動節點之前，你應該決定要使用什麼網路和同步模式。 應考慮的最重要部分是用戶端所需的磁碟空間和同步時間。 留意用戶端的文件以確認預設的同步模式是哪種。 如果預設同步模式不適合你，可以視安全層級、可用資料及支出，以挑選其他同步模式。 除了同步演算法外，你還可以設定不同類型舊資料的修剪。 修剪可以刪除過時的資料，即移除最近區塊無法存取的狀態樹節點。

其他基本設定選項包括：選擇網路 (主網或測試網)、為 RPC 或 WebSocket 啟用 HTTP 端點等。 你可以在用戶端文件上找到所有功能和選項。 可以直接在命令列介面或設定檔中使用對應的標記，來設定各種用戶端設定。 每個用戶端略有差異，請務必參考官方文件或幫助頁面以獲得設定選項的細節。

為了測試，你可能偏好在測試網上運行用戶端。 [查看支援的網路概覽](/developers/docs/nodes-and-clients/#execution-clients)。

在基礎設定下運行執行用戶端的範例請見下個章節。

#### 啟動執行用戶端 {#starting-the-execution-client}

在啟動以太坊用戶端軟體前，請檢查最後一次，以確認你的環境是否就緒。 例如，請確保：

- 選定的網路和同步模式下，所需磁碟空間足夠。
- 記憶體與中央處理器未被其他程式停止。
- 作業系統已更新至最新版。
- 系統的時間日期正確。
- 你的路由器和防火牆接受偵聽連接埠上的連線。 預設情況下，以太坊用戶端使用偵聽器 (TCP) 連接埠和發現 (UDP) 連接埠，預設均位於 30303。

首先在測試網上運行你的用戶端，以幫助確保一切正常運作。

你需要在開始時宣告所有非預設的用戶端設定。 你可以使用標記或設定檔來宣告你的偏好設定。 功能組和設定語法因用戶端而異。 請查看你的用戶端的文件，以了解細節。

執行用戶端和共識用戶端透過 [Engine API](https://github.com/ethereum/execution-apis/tree/main/src/engine) 中指定的已驗證端點進行通訊。 為了連接到共識用戶端，執行用戶端必須在已知路徑產生一個 [`jwtsecret`](https://jwt.io/)。 鑑於安全性及穩定性，用戶端應在同一個機器上運行，且兩個用戶端必須都知道此路徑，因為此路徑用於驗證它們之間的本地遠端程序呼叫連接。 執行用戶端也必須為經過驗證的應用程式介面定義一個偵聽連接埠。

此驗證權杖由用戶端軟體自動產生，但某些情況下，你可能需要自行手動產生。 您可以使用 [OpenSSL](https://www.openssl.org/) 來產生它：

```sh
openssl rand -hex 32 > jwtsecret
```

#### 執行執行用戶端 {#running-an-execution-client}

此章節將引導你啟動執行用戶端。 它僅做為基本設定的範例，此範例會以下列設定啟動用戶端：

- 指定欲連線的網路，在此例子中為主網
  - 您可以改為選擇[其中一個測試網](/developers/docs/networks/)來對您的設定進行初步測試。
- 定義資料目錄，用於儲存所有包含區塊鏈的資料
  - 請務必用真實路徑替換，例如指向您的外部硬碟。
- 啟用與用戶端通訊的介面
  - 包括用於與共識用戶端通訊的 JSON-RPC 和引擎應用程式介面
- 為已驗證的 API 定義 `jwtsecret` 的路徑。
  - 請務必將範例路徑替換為用戶端可以存取的真實路徑，例如 `/tmp/jwtsecret`。

請注意，這只是基本的範例，其餘的設定都會被設為預設值。 仔細閱讀各個用戶端的文件，以了解預設值、設定及功能。 關於更多其他功能，如運行驗證者、監控等等，請參考特定用戶端的文件。

> 請注意，範例中的反斜線 `` 僅用於格式化目的；設定旗標可以在單行中定義。

##### 運行 Besu

此範例在主網上啟動 Besu，將區塊鏈資料以預設格式儲存在 `/data/ethereum`，並為連接共識用戶端啟用 JSON-RPC 和 Engine RPC。 Engine API 使用 `jwtsecret` 權杖進行驗證，且只允許來自 `localhost` 的呼叫。

```sh
besu --network=mainnet \
    --data-path=/data/ethereum \
    --rpc-http-enabled=true \
    --engine-rpc-enabled=true \
    --engine-host-allowlist="*" \
    --engine-jwt-enabled=true \
    --engine-jwt-secret=/path/to/jwtsecret
```

Besu 還有個啟動器選項，會詢問一系列問題並產生設定檔案。 透過以下指令運行互動式啟動器：

```sh
besu --Xlauncher
```

[Besu 的文件](https://besu.hyperledger.org/public-networks/get-started/start-node/)包含額外的選項和設定細節。

##### 運行 Erigon

此範例在主網上啟動 Erigon，將區塊鏈資料儲存在 `/data/ethereum`，啟用 JSON-RPC，定義允許哪些命名空間，並為連接由 `jwtsecret` 路徑定義的共識用戶端啟用驗證。

```sh
erigon --chain mainnet \
    --datadir /data/ethereum  \
    --http --http.api=engine,eth,web3,net \
    --authrpc.jwtsecret=/path/to/jwtsecret
```

Erigon 預設與 8GB 的硬碟執行完整同步，這會產生超過 2TB 的歸檔資料。 請確保 `datadir` 指向有足夠可用空間的磁碟，或研究可以修剪不同類型資料的 `--prune` 旗標。 查看 Erigon 的 `--help` 以了解更多資訊。

##### 運行 Geth

此範例在主網上啟動 Geth，將區塊鏈資料儲存在 `/data/ethereum`，啟用 JSON-RPC 並定義允許的命名空間。 它還為連接共識用戶端啟用驗證，這需要 `jwtsecret` 的路徑，以及定義允許哪些連線的選項，在我們的範例中僅允許來自 `localhost` 的連線。

```sh
geth --mainnet \
    --datadir "/data/ethereum" \
    --http --authrpc.addr localhost \
    --authrpc.vhosts="localhost" \
    --authrpc.port 8551
    --authrpc.jwtsecret=/path/to/jwtsecret
```

查看[所有設定選項的文件](https://geth.ethereum.org/docs/fundamentals/command-line-options)，並深入了解[如何與共識用戶端一起執行 Geth](https://geth.ethereum.org/docs/getting-started/consensus-clients)。

##### 運行 Nethermind

Nethermind 提供多種[安裝選項](https://docs.nethermind.io/get-started/installing-nethermind)。 此套件包含許多二進位檔案，包括有引導式設定的啟動器，可以互動式幫助你建立設定。 或者，你可以找到可執行執行器，並使用設定標記執行它。 JSON-RPC 是預設啟用的。

```sh
Nethermind.Runner --config mainnet \
    --datadir /data/ethereum \
    --JsonRpc.JwtSecretFile=/path/to/jwtsecret
```

Nethermind 文件提供了一份關於如何與共識用戶端一起執行 Nethermind 的[完整指南](https://docs.nethermind.io/get-started/running-node/)。

執行用戶端會啟用它的核心功能、選擇端點並開始尋找對等用戶端。 成功發現對等用戶端後，用戶端開始同步。 執行用戶端會等待來自共識用戶端的連接。 在用戶端成功與目前狀態同步以後，目前的區塊鏈資料就可以使用。

##### 運行 Reth

此範例在主網上運行 Reth，使用預設的資料儲存路徑。 為連接由 `jwtsecret` 路徑定義的共識用戶端啟用 JSON-RPC 和 Engine RPC 驗證，僅允許來自 `localhost` 的呼叫。

```sh
reth node \
    --authrpc.jwtsecret /path/to/jwtsecret \
    --authrpc.addr 127.0.0.1 \
    --authrpc.port 8551
```

請參閱 [設定 Reth](https://reth.rs/run/config.html?highlight=data%20directory#configuring-reth) 以了解更多關於預設資料目錄的資訊。 [Reth 的文件](https://reth.rs/run/mainnet.html)包含額外的選項和設定細節。

#### 啟動共識用戶端 {#starting-the-consensus-client}

共識用戶端必須在正確的連接埠設定下啟動，以建立與執行用戶端的本地遠端程序呼叫連接。 共識用戶端在執行時需要使用公開的執行用戶端通訊埠作為設定參數。

共識用戶端也需要執行用戶端的 `jwt-secret` 路徑，以便對它們之間的 RPC 連線進行驗證。 與上述執行用戶端例子相似，每個共識用戶端都有一個設定標記，將 jwt 權杖檔案路徑做為參數。 此路徑必須與提供給執行用戶端的 `jwtsecret` 路徑一致。

如果你打算運行驗證者，請確保新增一個用作以太坊費用接收地址的設定標記。 這是你的驗證者累積以太幣獎勵的地方。 每個共識用戶端都有一個選項，例如 `--suggested-fee-recipient=0xabcd1`，它接受一個以太坊地址作為引數。

在測試網上啟動信標節點時，您可以使用[檢查點同步](https://notes.ethereum.org/@launchpad/checkpoint-sync)的公共端點來大幅節省同步時間。

#### 執行共識用戶端 {#running-a-consensus-client}

##### 運行 Lighthouse

在執行 Lighthouse 之前，請在 [Lighthouse Book](https://lighthouse-book.sigmaprime.io/installation.html) 中了解如何安裝和設定它。

```sh
lighthouse beacon_node \
    --network mainnet \
    --datadir /data/ethereum \
    --http \
    --execution-endpoint http://127.0.0.1:8551 \
    --execution-jwt /path/to/jwtsecret
```

##### 運行 Lodestar

透過編譯 Lodestar 軟體或下載 Docker 映像檔來安裝 Lodestar 軟體。 在[文件](https://chainsafe.github.io/lodestar/)和更全面的[設定指南](https://hackmd.io/@philknows/rk5cDvKmK)中了解更多。

```sh
lodestar beacon \
    --dataDir="/data/ethereum" \
    --network=mainnet \
    --eth1.enabled=true \
    --execution.urls="http://127.0.0.1:8551" \
    --jwt-secret="/path/to/jwtsecret"
```

##### 運行 Nimbus

Nimbus 包括共識用戶端與執行用戶端。 它可在各種裝置上運行，即使是性能不高的裝置。
[安裝完相依套件和 Nimbus 本身](https://nimbus.guide/quick-start.html)後，您就可以執行其共識用戶端：

```sh
nimbus_beacon_node \
    --network=mainnet \
    --web3-url=http://127.0.0.1:8551 \
    --rest \
    --jwt-secret="/path/to/jwtsecret"
```

##### 運行 Prysm

Prysm 有可以輕鬆自動安裝的腳本。 詳細資訊可以在 [Prysm 文件](https://prysm.offchainlabs.com/docs/install-prysm/install-with-script/)中找到。

```sh
./prysm.sh beacon-chain \
    --mainnet \
    --datadir /data/ethereum  \
    --execution-endpoint=http://localhost:8551  \
    --jwt-secret=/path/to/jwtsecret
```

##### 運行 Teku

```sh
teku --network mainnet \
    --data-path "/data/ethereum" \
    --ee-endpoint http://localhost:8551 \
    --ee-jwt-secret-file "/path/to/jwtsecret"
```

當共識用戶端連接至執行用戶端，並讀取存款合約以及識別驗證者時，它同時也會連接至其他對等信標節點，並從創世塊開始同步共識時隙。 當信標節點到達目前時期時，信標應用程式介面就可以供你的驗證者使用。 深入了解[信標節點 API](https://eth2docs.vercel.app/)。

### 新增驗證程式 {#adding-validators}

共識用戶端作為供驗證者連接的信標節點。 每個共識用戶端都有自己的驗證者軟體，可以在各自的文檔中找到詳細描述。

執行您自己的驗證程式可實現[個人質押](/staking/solo/)，這是支援以太坊網路最具影響力且無需信任的方法。 然而，單獨質押要求存入 32 以太幣。 若要用較少的金額在您自己的節點上執行驗證程式，您可能會對擁有無需許可的節點操作員的去中心化池感興趣，例如 [Rocket Pool](https://rocketpool.net/node-operators)。

開始進行質押和驗證程式金鑰產生的最簡單方法是使用 [Hoodi 測試網質押啟動台](https://hoodi.launchpad.ethereum.org/)，它讓您可透過[在 Hoodi 上執行節點](https://notes.ethereum.org/@launchpad/hoodi)來測試您的設定。 當您準備好在主網上進行時，您可以使用[主網質押啟動台](https://launchpad.ethereum.org/)重複這些步驟。

查看[質押頁面](/staking)以取得質押選項的概覽。

### 使用節點 {#using-the-node}

執行用戶端提供 [RPC API 端點](/developers/docs/apis/json-rpc/)，您可以用多種方式使用它們在以太坊網路上提交交易、與智能合約互動或部署智能合約：

- 使用合適的協定手動呼叫它們 (例如使用 `curl`)
- 附加提供的控制台 (例如 `geth attach`)
- 在應用程式中使用 web3 程式庫來實作它們，例如 [web3.py](https://web3py.readthedocs.io/en/stable/overview.html#overview)、[ethers](https://github.com/ethers-io/ethers.js/)

不同的用戶端有不同的遠端程序呼叫端點實作。 但是有一個標準的 JSON-RPC，可以用於每個用戶端。 如需概覽，請[閱讀 JSON-RPC 文件](/developers/docs/apis/json-rpc/)。 需要從以太坊網路取得資訊的應用程式可以使用這個遠端程序呼叫。 例如，熱門錢包 MetaMask 讓您[連接到您自己的 RPC 端點](https://metamask.zendesk.com/hc/en-us/articles/360015290012-Using-a-Local-Node)，這具有強大的隱私和安全優勢。

所有共識用戶端都會公開一個 [Beacon API](https://ethereum.github.io/beacon-APIs)，可用於檢查共識用戶端的狀態，或使用 [Curl](https://curl.se) 等工具發送請求來下載區塊和共識資料。 更多資訊可在每個共識用戶端的文檔上找到。

#### 存取 RPC {#reaching-rpc}

執行用戶端 JSON-RPC 的預設連接埠為 `8545`，但您可以在設定中修改本機端點的連接埠。 遠端程序呼叫介面預設只能透過你電腦的 localhost 存取。 為了讓它能夠遠端存取，您可能會想透過將地址變更為 `0.0.0.0` 來將其公開。 這樣一來，就可透過本地網路以及公網 IP 位址存取遠端程序呼叫介面了。 在多數情況下，你也需要在路由器上設定通訊埠轉發。

公開通訊埠至網際網路時應謹慎，因為這會使網際網路上的任何人都能控制你的節點。 如果你將用戶端作為錢包使用，惡意人士可能存取你的節點以癱瘓你的系統，或者竊取其中的資產。

解決上述問題的辦法是，避免讓潛在的高危遠端程序呼叫方法可被修改。 例如，使用 Geth 時，您可以使用旗標宣告可修改的方法：`--http.api web3,eth,txpool`。

開發邊緣層應用程式介面或網頁伺服器應用程式（如 Nginx），並將它們連接至你用戶端的本機位址及通訊埠，這可以擴展對遠端程序呼叫介面的存取方式。 利用中介層也可讓開發者能夠為到 RPC 介面的安全 `https` 連線設定憑證。

設置網頁伺服器、代理伺服器或外部的 Rest API 並非對你節點的遠端程序呼叫端點提供存取的唯一方式。 設定可公開存取之端點的另一種保護隱私的方法是，將節點託管在您自己的 [Tor](https://www.torproject.org/) 洋蔥服務上。 這可讓你在沒有靜態公共 IP 位址或開放通訊埠的情況下，仍可存取本地網路外的遠端程序呼叫。 然而，使用此設定只會允許透過 Tor 網路存取遠端程序呼叫端點，但並非所有應用程式都支援此網路，且可能造成連線問題。

為此，您必須建立自己的[洋蔥服務](https://community.torproject.org/onion-services/)。 查看關於設定洋蔥服務以託管您自己的服務的[文件](https://community.torproject.org/onion-services/setup/)。 你可將其指向有代理伺服器的遠端程序呼叫通訊埠網頁伺服器，或者直接指向遠端程序呼叫。

最後一種提供內部網路存取的方式是透過虛擬私人網路連線，這同時也是最受歡迎的一種方式。 依據你的用例，以及需要存取你的節點的使用者數量，安全的虛擬私人網路連線或許是個可選方案。 [OpenVPN](https://openvpn.net/) 是一種功能齊全的 SSL VPN，它使用業界標準的 SSL/TLS 協定實作 OSI 第 2 層或第 3 層的安全網路延伸，支援基於憑證、智慧卡和/或使用者名稱/密碼憑證的彈性用戶端驗證方法，並允許使用套用到 VPN 虛擬介面的防火牆規則來制定使用者或群組特定的存取控制策略。

### 操作節點 {#operating-the-node}

你應該定期監控你的節點以確保其正常運行。 你可能需要偶爾進行維護。

#### 保持節點在線 {#keeping-node-online}

你的節點不需要一直保持上線，但應儘可能維持它的上線狀態，以持續與網路同步。 你可以關閉它並重啟，但請記得：

- 若磁碟仍正在寫入最近的狀態，關閉節點可能會花上數分鐘。
- 強制關閉可能會損害資料庫，這樣可能必須重新同步整個節點。
- 你的用戶端將與網路不同步，並且在重新啟動時需要重新同步。 雖然節點可以從上次關閉時的地方開始同步，但此流程會依離線的時長而定。

_這不適用於共識層驗證程式節點。_ 讓您的節點離線會影響所有依賴它的服務。 如果您是為了_質押_而執行節點，您應該盡可能地減少停機時間。

#### 建立用戶端服務 {#creating-client-services}

考慮建立一個在啟動時自動運行你的用戶端的服務。 例如，在 Linux 伺服器上，一個好的做法是建立一個服務 (例如使用 `systemd`)，該服務以有限權限的使用者身分使用適當的設定檔執行用戶端，並會自動重新啟動。

#### 更新用戶端 {#updating-clients}

您需要讓您的用戶端軟體保持最新狀態，包含最新的安全性修補程式、功能和 [EIP](/eips/)。 特別是在[硬分叉](/ethereum-forks/)之前，請確保您執行的是正確的用戶端版本。

> 在重要的網路更新之前，EF 會在其[部落格](https://blog.ethereum.org)上發佈一篇文章。 您可以[訂閱這些公告](https://blog.ethereum.org/category/protocol#subscribe)，以便在您的節點需要更新時收到郵件通知。

更新用戶端非常簡單。 在每個用戶端的文檔中都有具體的說明，但實際上只要下載最新版的用戶端並透過最新的可執行檔重新啟動用戶端即可。 用戶端應從上次同步中斷的地方繼續同步，且完成用戶端更新。

每個用戶端實作都有用於點對點協定的人類可讀版本的字串，但也可透過指令存取該字串。 這個版本的字串可讓使用者檢查是否正執行正確的版本，並支援區塊瀏覽器和有興趣量化網路上特定用戶端的分佈的其他分析工具。 請參閱個別的用戶端文件以取得版本字串的更多資訊。

#### 執行額外服務 {#running-additional-services}

運行你自己的節點，可讓你使用需要直接存取以太坊用戶端遠端程序呼叫的服務。 這些是建立在以太坊上的服務，例如[第 2 層解決方案](/developers/docs/scaling/#layer-2-scaling)、錢包後端、區塊瀏覽器、開發人員工具和其他以太坊基礎設施。

#### 監控節點 {#monitoring-the-node}

要正確監控你的節點，請考慮收集指標。 用戶端提供指標端點，因此你可以取得關於你節點的綜合資料。 使用 [InfluxDB](https://www.influxdata.com/get-influxdb/) 或 [Prometheus](https://prometheus.io/) 等工具來建立資料庫，然後您可以在 [Grafana](https://grafana.com/) 等軟體中將其轉換為視覺化和圖表。 使用此軟體有許多設定可以使用，還有不同的 Grafana 儀表板來將你的節點和整個網路視覺化。 例如，查看[關於使用 InfluxDB 和 Grafana 監控 Geth 的教學](/developers/tutorials/monitoring-geth-with-influxdb-and-grafana/)。

在監控時，請務必注意機器的效能。 在節點的初次同步期間，用戶端軟體可能會耗用大量的 CPU 和 RAM 資源。 除了 Grafana，您還可以使用作業系統提供的工具 (例如 `htop` 或 `uptime`) 來執行此操作。

## 延伸閱讀 {#further-reading}

- [以太坊質押指南](https://github.com/SomerEsat/ethereum-staking-guides) - _Somer Esat，經常更新_
- [指南 | 如何在主網上為以太坊質押設定驗證程式](https://www.coincashew.com/coins/overview-eth/guide-or-how-to-setup-a-validator-on-eth2-mainnet) _– CoinCashew，經常更新_
- [ETHStaker 關於在測試網上執行驗證程式的指南](https://github.com/remyroy/ethstaker#guides) – _ETHStaker，定期更新_
- [適用於以太坊節點的 AWS 區塊鏈節點執行器範例應用程式](https://aws-samples.github.io/aws-blockchain-node-runners/docs/Blueprints/Ethereum) - _AWS，經常更新_
- [針對節點營運商的「合併」常見問答](https://notes.ethereum.org/@launchpad/node-faq-merge) - _2022 年 7 月_
- [分析成為以太坊完整驗證節點的硬體需求](https://medium.com/coinmonks/analyzing-the-hardware-requirements-to-be-an-ethereum-full-validated-node-dc064f167902) _– Albert Palau，2018 年 9 月 24 日_
- [執行以太坊完整節點：一份寫給有點懶的人的指南](https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _– Justin Leroux，2019 年 11 月 7 日_
- [在以太坊主網上執行 Hyperledger Besu 節點：優點、需求和設定](https://pegasys.tech/running-a-hyperledger-besu-node-on-the-ethereum-mainnet-benefits-requirements-and-setup/) _– Felipe Faraggi，2020 年 5 月 7 日_
- [部署帶有監控堆疊的 Nethermind 以太坊用戶端](https://medium.com/nethermind-eth/deploying-nethermind-ethereum-client-with-monitoring-stack-55ce1622edbd) _– Nethermind.eth，2020 年 7 月 8 日_

## 相關主題 {#related-topics}

- [節點和用戶端](/developers/docs/nodes-and-clients/)
- [區塊](/developers/docs/blocks/)
- [網路](/developers/docs/networks/)
