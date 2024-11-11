---
title: 運行你自己的以太坊節點
description: 運行你自己的以太坊用戶端實例的一般介紹。
lang: zh-tw
sidebarDepth: 2
---

運行你自己的節點可以為你帶來各種好處，開闢新的可能性，並有助於支援生態系統。 本頁將引導你啟動自己的節點並參與驗證以太坊交易。

注意，在[合併](/roadmap/merge)之後，需要兩個用戶端來運行一個以太坊節點：一個**執行層 (EL)** 用戶端，以及一個**共識層 (CL)** 用戶端。 本頁將展示如何安装、配置和連接這兩種用戶端以運行以太坊節點。

## 前置要求 {#prerequisites}

你應該了解以太坊節點是什麼以及為什麼你可能想要運行用戶端。 [節點與用戶端](/developers/docs/nodes-and-clients/)中對此進行了介紹。

如果你對運行節點這個主題還很陌生，或是尋找技術門檻較低的途徑，推薦你首先查看我們適合使用者的[運行以太坊節點](/run-a-node)簡介。

## 挑選方法 {#choosing-approach}

啟動節點的第一步是選擇方法。 根據要求及不同的可能性，你必須選擇（執行及共識用戶端）的用戶端實作、環境（硬體、系統），以及用戶端設定參數。

本頁將引導你做出這些決定，幫助你找到運行以太坊實例最適合的方式。

若要從用戶端實作中進行選擇，請查看所有可用的主網就緒[執行用戶端](/developers/docs/nodes-and-clients/#execution-clients)、[共識用戶端](/developers/docs/nodes-and-clients/#consensus-clients)，並瞭解[用戶端多樣性](/developers/docs/nodes-and-clients/client-diversity)。

根據用戶端的[要求](#requirements)，決定是否要在自己的[硬體或是雲端上](#local-vs-cloud)運行軟體。

準備好環境後，使用[初學者友好介面](#automatized-setup)或[手動](#manual-setup)使用具有進階選項的終端機安裝所選的用戶端。

當節點在運行且同步時，你已經準備好[使用它](#using-the-node)，但務必留意節點的[維護](#operating-the-node)。

![用戶端設定](./diagram.png)

### 環境與硬體 {#environment-and-hardware}

#### 本機或雲端 {#local-vs-cloud}

以太坊用戶端可以在消費級電腦上運行，並且不需要任何如挖礦機的特殊硬體。 因此，根據你的需求，你有多種選項來部署節點。 為了簡單起見，我們考慮一下在本地實體機和雲端伺服器上都運行一個節點：

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

然而，抗審查的去中心化網路不應依賴雲端提供者。 因而，在自己的本機硬體上運行自己的節點對生態系統來說更健全。 [預估](https://www.ethernodes.org/networkType/Hosting)顯示大部分節點在雲端上運行，這可能造成單點故障。

以太坊用戶端可以在自己的電腦、筆記型電腦、伺服器，或甚至是單板電腦上運行。 當在你的個人電腦上運行用戶端成為可能時，弄台專門運行節點的機器可以大幅提高效能和安全性，同時將最大程度上減小對你主要電腦的影響。

使用你自己的硬體非常容易。 有許多簡易的選項，適合較技術性人士的進階設定。 那麼，我們來看看在你的裝置上運行以太坊節點的要求和方法吧。

#### 要求 {#requirements}

硬體要求因用戶端而異，但通常不會那麼高，因為節點只需要保持同步。 請別和挖礦搞混了，挖礦需要的算力遠高於此。 然而，使用更強大的硬體，同步時間和效能確實會提高。

在安裝任何用戶端之前，請確保你的電腦有足夠的資源來運行用戶端。 你可以在下方找到最低和推薦的硬體要求。

硬體瓶頸主要是磁碟空間。 同步以太坊區塊鏈是輸入/輸出非常密集的操作，且需要大量空間。 最佳選擇是使用在同步完畢後仍有數百 GB 空間的**固態硬碟 (SSD)**。

資料庫的大小及初始同步速度視使用的用戶端、設定及[同步策略](/developers/docs/nodes-and-clients/#sync-modes)而定。

也請確保你的網路連線不受[帶寬上限](https://wikipedia.org/wiki/Data_cap)的限制。 建議使用不按流量計費的連線，因為初始同步和廣播到網路的資料可能會超出你的限制。

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

| 客戶         | 磁碟空間（快速同步） | 磁碟空間（完整歸檔） |
| ---------- | ---------- | ---------- |
| Besu       | 800GB 以上   | 12TB 以上    |
| Erigon     | 不適用        | 2.5TB 以上   |
| Geth       | 500GB 以上   | 12TB 以上    |
| Nethermind | 500GB 以上   | 12TB 以上    |
| Reth       | 不適用        | 2.2TB 以上   |

- 注意：Erigon 和 Reth 不提供快照同步，但支援完全修剪（Erigon 約 2TB，Reth 約 1.2TB）

至於共識用戶端，所需硬碟容量也視用戶端實作及啟用的功能而定 (如罰沒驗證者的功能)，但通常還需要額外的 200G 以儲存信標資料。 由於龐大的驗證者數量，帶寬負載也隨之增長。 你可以[在此分析中找到有關共識用戶端要求的詳細資料](https://mirror.xyz/0x934e6B4D7eee305F8C9C42b46D6EEA09CcFd5EDc/b69LBy8p5UhcGJqUAmT22dpvdkU-Pulg2inrhoS9Mbc)。

#### 隨插即用解決方案 {#plug-and-play}

在你自己的硬體上運行節點最簡單的方法是使用隨插即用盒。 供應商的預設置機器提供了最直覺的體驗：排序、連接、運行。 所有部分都預先設置完畢且自動運行，搭配用以監控和控制軟體的直覺指南和儀表板。

- [DappNode](https://dappnode.io/)
- [Avado](https://ava.do/)

#### 單板電腦上的以太坊 {#ethereum-on-a-single-board-computer}

使用單板電腦是其中一種能便利、便宜運行以太坊節點的方式，甚至可以使用 ARM 架構的開發板，如樹莓派。 [ARM 架構上的以太坊](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)為樹莓派及其他 ARM 開發板提供了多個執行用戶端和共識用戶端的簡單易用映像檔。

這類小型、平價且高效的裝置對在家運行節點是非常理想的，不過要注意的是它們效能有限。

## 啟動節點 {#spinning-up-node}

實際的用戶端設定可以透過自動啟動器或手動完成，即直接設定用戶端軟體。

對於不是那麼進階的使用者，推薦使用啟動器，它是一種指引你安裝及自動化用戶端設定流程的軟體。 然而，如果你有使用終端機的經驗，手動設定的步驟對你來說應該很容易。

### 引導式設定 {#automatized-setup}

多個使用者友善的專案都致力於改善設定用戶端的體驗。 這些啟動器提供了自動用戶端安裝及設定，有的甚至會提供圖形介面，用於引導式設定和監控用戶端。

以下是一些只要點按幾下就能幫助你安裝並控制用戶端的專案：

- [DappNode](https://docs.dappnode.io/docs/user/getting-started/choose-your-path) - DappNode 並非只能使用供應商提供的機器。 軟體、實際節點啟動器和擁有許多功能的控制中心可在任意硬體上使用。
- [eth-docker](https://eth-docker.net/) - 使用 Docker 進行自動化設定，專注於打造輕鬆安全的質押體驗，需要對終端機和 Docker 有基本認識，適合較進階的使用者。
- [Stereum](https://stereum.net/ethereum-node-setup/) - 該啟動器具有圖形化使用者介面設定指南、控制中心以及許多其他功能，可透過 SSH 連接在遠端伺服器上安裝用戶端。
- [NiceNode](https://www.nicenode.xyz/) - 該啟動器提供直覺化使用者體驗，可在你的電腦上運行節點。 只要選擇用戶端並簡單點按幾下即可啟動。 仍在開發中。
- [Sedge](https://docs.sedge.nethermind.io/docs/intro) - 該節點設定工具使用 CLI 精靈自動產生 Docker 設定文件。 由 Nethermind 使用 Go 語言開發。

### 手動用戶端設定 {#manual-setup}

另一個選擇是手動下載、驗證並設定用戶端軟體。 即使一些用戶端提供圖形介面，手動設定仍需要對終端機有基本認識，不過也提供了更多功能。

如前所述，設定你自己的以太坊節點需要運行一對共識和執行用戶端。 有些用戶端可能包含其他類型的輕量用戶端，且不需要其他軟體即可同步。 然而，完整去信任驗證需要上述兩種實作。

#### 取得用戶端軟體 {#getting-the-client}

首先，你需要取得你偏好的[執行用戶端](/developers/docs/nodes-and-clients/#execution-clients)及[共識用戶端](/developers/docs/nodes-and-clients/#consensus-clients)軟體。

你只須下載符合你作業系統和架構的可執行應用程式或安裝包。 總是驗證下載的安裝包的簽名和校驗和。 有些用戶端也提供程式碼儲存庫或 Docker 映像檔，使安裝及更新更容易。 所有的用戶端都是開源的，所以你可以從原始碼開始建構。 這是較進階的方法，但在某些情況下可能是必要的。

上方用戶端清單連結的文件中提供了安裝各個用戶端的說明。

以下是一些用戶端的版本發佈頁面，你可以在此找到預先建置的二進位檔案或安裝說明：

##### 執行客戶

- [Besu](https://github.com/hyperledger/besu/releases)
- [Erigon](https://github.com/ledgerwatch/erigon/releases)
- [Geth](https://geth.ethereum.org/downloads/)
- [Nethermind](https://downloads.nethermind.io/)
- [Reth](https://reth.rs/installation/installation.html)

值得注意的是，用戶端多樣性是[執行層上的一個問題](/developers/docs/nodes-and-clients/client-diversity/#execution-layer)。 建議讀者們考慮運行小眾執行用戶端。

##### 共識客戶

- [Lighthouse](https://github.com/sigp/lighthouse/releases/latest)
- [Lodestar](https://chainsafe.github.io/lodestar/install/source/)（並未提供預先建置的二進位檔案，只有一個 Docker 映像檔，或者自行編譯原始碼）
- [Nimbus](https://github.com/status-im/nimbus-eth2/releases/latest)
- [Prysm](https://github.com/prysmaticlabs/prysm/releases/latest)
- [Teku](https://github.com/ConsenSys/teku/releases)

[用戶端多樣性](/developers/docs/nodes-and-clients/client-diversity/)對運行驗證者的共識節點來說非常重要。 如果大多驗證者都運行單一用戶端，網路安全將面臨風險。 因此，建議可以考慮選擇小眾用戶端。

[查看最新的網路用戶端使用情況](https://clientdiversity.org/)並瞭解關於[用戶端多樣性](/developers/docs/nodes-and-clients/client-diversity)的更多資訊。

##### 驗證軟體

從網際網路上下載軟體時，建議驗證其完整性。 這個步驟是可選的，但對於諸如以太坊用戶端等重要基礎設施，了解並避免潛在的攻擊非常重要。 如果你下載了預先建置的二進位檔案，你需要信任它並承擔攻擊者將其替換成惡意檔案的風險。

開發者使用他們的 PGP 金鑰簽署發佈的二進位檔案，如此一來你就可以使用密碼學方式驗證你運行的是他們建立的軟體。 你只需要獲得開發者使用的公鑰，這些公鑰可以在用戶端發佈頁面或文件中找到。 在下載用戶端版本及其簽名後，你可以使用 PGP 實作，如 [GnuPG](https://gnupg.org/download/index.html) 來輕鬆驗證用戶端。 查看在 [linux](https://www.tecmint.com/verify-pgp-signature-downloaded-software/) 或 [Windows/MacOS](https://freedom.press/training/verifying-open-source-software/) 上使用 `gpg` 驗證開源軟體的教學。

另一種驗證方式是確定你下載軟體的雜湊（獨一無二的密碼學指紋）和開發者提供的雜湊相符。 這比使用 PGP 進行驗證更加容易，有些用戶端也只提供此選項。 只需對下載的軟體運行雜湊函數，並將其與軟體發佈頁面的雜湊比較即可。 例如：

```sh
sha256sum teku-22.6.1.tar.gz

9b2f8c1f8d4dab0404ce70ea314ff4b3c77e9d27aff9d1e4c1933a5439767dde
```

#### 用戶端設定 {#client-setup}

在安裝、下載或編譯用戶端軟體後，你就可以執行用戶端了。 這只表示需要用正確的設定執行用戶端。 用戶端提供了豐富的設定選項，可用於啟用各種功能。

我們從會大幅影響用戶端效能和資料使用的選項開始。 [同步模式](/developers/docs/nodes-and-clients/#sync-modes)代表下載和驗證區塊鏈資料的不同方法。 在啟動節點之前，你應該決定要使用什麼網路和同步模式。 應考慮的最重要部分是用戶端所需的磁碟空間和同步時間。 留意用戶端的文件以確認預設的同步模式是哪種。 如果預設同步模式不適合你，可以視安全層級、可用資料及支出，以挑選其他同步模式。 除了同步演算法外，你還可以設定不同類型舊資料的修剪。 修剪可以刪除過時的資料，例如刪除最近區塊中無法存取的狀態樹節點。

其他基礎設定選項範例包括：選擇網路 - 主網或測試網、為遠端程序呼叫或 WebSocket 啟用超文字傳輸協定端點等等。 你可以在用戶端文件上找到所有功能和選項。 可以直接在命令列介面或設定檔中使用對應的標記，來設定各種用戶端設定。 每個用戶端略有差異，請務必參考官方文件或幫助頁面以獲得設定選項的細節。

為了測試，你可能偏好在測試網上運行用戶端。 [參閱受支援網路的概覽](/developers/docs/nodes-and-clients/#execution-clients)。

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

執行和共識用戶端透過[引擎應用程式介面](https://github.com/ethereum/execution-apis/tree/main/src/engine)中指定的經驗證端點通訊。 要連接至共識用戶端，執行用戶端必須在已知路徑上產生一個 [`jwtsecret`](https://jwt.io/)。 鑑於安全性及穩定性，用戶端應在同一個機器上運行，且兩個用戶端必須都知道此路徑，因為此路徑用於驗證它們之間的本地遠端程序呼叫連接。 執行用戶端也必須為經過驗證的應用程式介面定義一個偵聽連接埠。

此驗證權杖由用戶端軟體自動產生，但某些情況下，你可能需要自行手動產生。 你可以透過 [OpenSSL](https://www.openssl.org/) 產生它：

```sh
openssl rand -hex 32 > jwtsecret
```

#### 運行執行用戶端 {#running-an-execution-client}

此章節將引導你啟動執行用戶端。 它僅做為基本設定的範例，此範例會以下列設定啟動用戶端：

- 指定欲連線的網路，在此例子中為主網
  - 你可以選擇[任意一個測試網](/developers/docs/networks/)，以初步測試你的設定
- 定義資料目錄，用於儲存所有包含區塊鏈的資料
  - 請確保將預設路徑替換成真實路徑：如指向你外部硬碟的路徑
- 啟用與用戶端通訊的介面
  - 包括用於與共識用戶端通訊的 JSON-RPC 和引擎應用程式介面
- 定義經過驗證的應用程式介面的 `jwtsecret` 路徑
  - 請確保將範例路徑替換成用戶端能夠存取的真實路徑，如：`/tmp/jwtsecret`

請注意，這只是基本的範例，其餘的設定都會被設為預設值。 仔細閱讀各個用戶端的文件，以了解預設值、設定及功能。 關於更多其他功能，如運行驗證者、監控等等，請參考特定用戶端的文件。

> 請注意，範例中的反斜線 `\` 僅用於設定格式；設定標記可以在單行內定義。

##### 運行 Besu

此範例在主網上運行 Besu，將區塊鏈資料以預設格式儲存在 `/data/ethereum`，啟用 JSON-RPC 及引擎遠端程序呼叫以連線至共識用戶端。 引擎應用程式介面使用 `jwtsecret` 權杖驗證，且只允許來自 `localhost` 的呼叫。

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

[Besu 的文件](https://besu.hyperledger.org/en/latest/HowTo/Get-Started/Starting-node/)包含了額外的選項及設定細節。

##### 運行 Erigon

此範例在主網上運行 Erigon，將區塊鏈資料儲存在 `/data/ethereum`，啟用 JSON-RPC，定義了哪些命名空間是允許的，並啟用連線由 `jwtsecret` 路徑定義的共識用戶端時的身份驗證。

```sh
erigon --chain mainnet \
    --datadir /data/ethereum  \
    --http --http.api=engine,eth,web3,net \
    --authrpc.jwtsecret=/path/to/jwtsecret
```

Erigon 預設與 8GB 的硬碟執行完整同步，這會產生超過 2TB 的歸檔資料。 請確保 `datadir` 指向的磁碟有充足的剩餘空間，或者考慮使用可以修剪不同類型資料的 `--prune` 標記。 參考 Erigon 的 `--help` 指令以獲得更多資訊。

##### 運行 Geth

此範例在主網上運行 Geth，將區塊鏈資料儲存在 `/data/ethereum`，啟用 JSON-RPC 並定義了哪些命名空間是允許的。 它也啟用了連接至共識用戶端的身份驗證，這需要 `jwtsecrest` 路徑並可以選擇定義哪些連接是允許的，在這個例子中，只允許 `localhost`。

```sh
geth --mainnet \
    --datadir "/data/ethereum" \
    --http --authrpc.addr localhost \
    --authrpc.vhosts="localhost" \
    --authrpc.port 8551
    --authrpc.jwtsecret=/path/to/jwtsecret
```

查看[文檔以了解所有設定選項](https://geth.ethereum.org/docs/fundamentals/command-line-options)並了解更多與[與共識用戶端一起運行 Geth](https://geth.ethereum.org/docs/getting-started/consensus-clients) 相關的資訊。

##### 運行 Nethermind

Nethermind 提供多種 [安裝選項](https://docs.nethermind.io/nethermind/first-steps-with-nethermind/getting-started)。 此套件包含許多二進位檔案，包括有引導式設定的啟動器，可以互動式幫助你建立設定。 或者，你可以找到可執行執行器，並使用設定標記執行它。 JSON-RPC 是預設啟用的。

```sh
Nethermind.Runner --config mainnet \
    --datadir /data/ethereum \
    --JsonRpc.JwtSecretFile=/path/to/jwtsecret
```

Nethermind 文檔提供了與共識用戶端一起運行 Nethermind 的 [完整指南](https://docs.nethermind.io/nethermind/first-steps-with-nethermind/running-nethermind-post-merge)。

執行用戶端會啟用它的核心功能、選擇端點並開始尋找對等用戶端。 成功發現對等用戶端後，用戶端開始同步。 執行用戶端會等待來自共識用戶端的連接。 在用戶端成功與目前狀態同步以後，目前的區塊鏈資料就可以使用。

##### 運行 Reth

此範例在主網上運行 Reth，使用預設的資料儲存路徑。 啟用 JSON-RPC 和引擎遠端程序呼叫驗證，以連線由 `jwtsecret` 路徑定義的共識用戶端，並且僅允許來自 `localhost` 的調用。

```sh
reth node \
    --authrpc.jwtsecret /path/to/jwtsecret \
    --authrpc.addr 127.0.0.1 \
    --authrpc.port 8551
```

請參閱[設定 Reth](https://reth.rs/run/config.html?highlight=data%20directory#configuring-reth) 以瞭解有關預設資料目錄的更多資訊。 [Besu 文件](https://reth.rs/run/mainnet.html)包含了額外的選項及設定細節。

#### 啟動共識用戶端 {#starting-the-consensus-client}

共識用戶端必須在正確的連接埠設定下啟動，以建立與執行用戶端的本地遠端程序呼叫連接。 共識用戶端在執行時需要使用公開的執行用戶端通訊埠作為設定參數。

共識用戶端還需要執行用戶端 `jwt-secret` 的路徑，以驗證它們之間的遠端程序呼叫連接。 與上述執行用戶端例子相似，每個共識用戶端都有一個設定標記，將 jwt 權杖檔案路徑做為參數。 此路徑需與提供執行用戶端的 `jwtsecret` 路徑保持一致。

如果你打算運行驗證者，請確保新增一個用作以太坊費用接收地址的設定標記。 這是你的驗證者累積以太幣獎勵的地方。 每個共識用戶端都有一個接受一個以太坊地址作為參數的選項，如：`--suggested-fee-recipient=0xabcd1`。

當在測試網上開始運行信標節點時，藉由[檢查點同步](https://notes.ethereum.org/@launchpad/checkpoint-sync)的公共端點，可以大幅縮短同步時間。

#### 運行共識用戶端 {#running-a-consensus-client}

##### 運行 Lighthouse

在運行 Lighthouse 前，請在 [Lighthouse 手冊](https://lighthouse-book.sigmaprime.io/installation.html)中了解如何安裝並設定。

```sh
lighthouse beacon_node \
    --network mainnet \
    --datadir /data/ethereum \
    --http \
    --execution-endpoint http://127.0.0.1:8551 \
    --execution-jwt /path/to/jwtsecret
```

##### 運行 Lodestar

透過編譯 Lodestar 軟體或下載 Docker 映像檔來安裝 Lodestar 軟體。 在[文檔](https://chainsafe.github.io/lodestar/)中了解更多，在[設定指南](https://hackmd.io/@philknows/rk5cDvKmK)中獲得更完整的資訊。

```sh
lodestar beacon \
    --rootDir="/data/ethereum" \
    --network=mainnet \
    --eth1.enabled=true \
    --execution.urls="http://127.0.0.1:8551" \
    --jwt-secret="/path/to/jwtsecret"
```

##### 運行 Nimbus

Nimbus 包括共識用戶端與執行用戶端。 它可在各種裝置上運行，即使是性能不高的裝置。 在[安裝依賴項和 Nimbus 本體](https://nimbus.guide/quick-start.html)後，你可以透過以下指令運行共識用戶端：

```sh
nimbus_beacon_node \
    --network=mainnet \
    --web3-url=http://127.0.0.1:8551 \
    --rest \
    --jwt-secret="/path/to/jwtsecret"
```

##### 運行 Prysm

Prysm 有可以輕鬆自動安裝的腳本。 詳情請見 [Prysm 文檔](https://docs.prylabs.network/docs/install/install-with-script)。

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

當共識用戶端連接至執行用戶端，並讀取存款合約以及識別驗證者時，它同時也會連接至其他對等信標節點，並從創世塊開始同步共識時隙。 當信標節點到達目前時期時，信標應用程式介面就可以供你的驗證者使用。 了解關於[信標節點應用程式介面](https://eth2docs.vercel.app/)的更多資訊。

### 新增驗證者 {#adding-validators}

共識用戶端作為供驗證者連接的信標節點。 每個共識用戶端都有自己的驗證者軟體，可以在各自的文檔中找到詳細描述。

運行自己的驗證者允許[單獨質押](/staking/solo/)，單獨質押是支援以太坊的最具影響且最去信任的方法。 然而，單獨質押要求存入 32 以太幣。 若要以較少的以太幣在你自己的節點上運行驗證者，你可能會對擁有無需許可的節點營運者的去中心化質押池 （如 [Rocket Pool](https://rocketpool.net/node-operators)）感興趣。

開始質押和產生驗證者金鑰最簡單的方法就是使用 [Holesky 測試網質押啟動面板](https://holesky.launchpad.ethereum.org/)，這可讓你透過[在 Holesky 上運行節點](https://notes.ethereum.org/@launchpad/holesky)來測試你的設定。 當你準備好部署到主網時，即可使用[主網質押啟動面板](https://launchpad.ethereum.org/)重複這些步驟。

請見[質押頁面](/staking)以查看質押選項概覽。

### 使用節點 {#using-the-node}

執行用戶端提供了[遠端程序呼叫應用程式介面端點](/developers/docs/apis/json-rpc/)，可透過多種方式提交交易、在以太坊上部署智慧型合約或與以太坊上的智慧型合約互動：

- 使用合適的協定手動呼叫它們（例如使用 `curl`）
- 附加提供的控制台（例如 `geth attach`）
- 透過 wbe3 函式庫在應用程式中實作它們，如 [web3.py](https://web3py.readthedocs.io/en/stable/overview.html#overview) 及 [ethers](https://github.com/ethers-io/ethers.js/)

不同的用戶端有不同的遠端程序呼叫端點實作。 但是有一個標準的 JSON-RPC，可以用於每個用戶端。 有關概述，[請閱讀 JSON-RPC 文件](/developers/docs/apis/json-rpc/)。 需要從以太坊網路取得資訊的應用程式可以使用這個遠端程序呼叫。 舉例來說，熱門錢包 MetaMask 可讓你[連接至你自己的遠端程序呼叫端點](https://metamask.zendesk.com/hc/en-us/articles/360015290012-Using-a-Local-Node)，提供了強大的隱私及安全優勢。

共識用戶端皆會公開[信標應用程式介面](https://ethereum.github.io/beacon-APIs)，可用於確認共識用戶端的狀態，或者透過工具（如 [Curl](https://curl.se)）發送請求以下載區塊和共識資料。 更多資訊可在每個共識用戶端的文檔上找到。

#### 存取遠端程序呼叫 {#reaching-rpc}

執行用戶端 JSON-RPC 的預設通訊埠是 `8545`，但你可以在設定中修改本地端點的通訊埠。 遠端程序呼叫介面預設只能透過你電腦的 localhost 存取。 為了要在遠端也能存取遠端程序呼叫介面，你可將位址變更為 `0.0.0.0` 將其公開。 這樣一來，就可透過本地網路以及公網 IP 位址存取遠端程序呼叫介面了。 在多數情況下，你也需要在路由器上設定通訊埠轉發。

公開通訊埠至網際網路時應謹慎，因為這會使網際網路上的任何人都能控制你的節點。 如果你將用戶端作為錢包使用，惡意人士可能存取你的節點以癱瘓你的系統，或者竊取其中的資產。

解決上述問題的辦法是，避免讓潛在的高危遠端程序呼叫方法可被修改。 舉例來說，使用 Geth 時，你可以透過標記 `--http.api web3,eth,txpool` 宣告可修改的方法。

開發邊緣層應用程式介面或網頁伺服器應用程式（如 Nginx），並將它們連接至你用戶端的本機位址及通訊埠，這可以擴展對遠端程序呼叫介面的存取方式。 透過中間層也使開發者能夠為連接至遠端程序呼叫介面的 `https` 安全連線設置憑證。

設置網頁伺服器、代理伺服器或外部的 Rest API 並非對你節點的遠端程序呼叫端點提供存取的唯一方式。 設定可公開存取的端點的另一種保護隱私的方法是，將節點託管在自己的 [Tor](https://www.torproject.org/) 洋蔥服務上。 這可讓你在沒有靜態公共 IP 位址或開放通訊埠的情況下，仍可存取本地網路外的遠端程序呼叫。 然而，使用此設定只會允許透過 Tor 網路存取遠端程序呼叫端點，但並非所有應用程式都支援此網路，且可能造成連線問題。

要完成設定，你需要建立自己的[洋蔥服務](https://community.torproject.org/onion-services/)。 閱讀洋蔥服務設定的[文檔](https://community.torproject.org/onion-services/setup/)以託管你自己的洋蔥服務。 你可將其指向有代理伺服器的遠端程序呼叫通訊埠網頁伺服器，或者直接指向遠端程序呼叫。

最後一種提供內部網路存取的方式是透過虛擬私人網路連線，這同時也是最受歡迎的一種方式。 依據你的用例，以及需要存取你的節點的使用者數量，安全的虛擬私人網路連線或許是個可選方案。 [OpenVPN](https://openvpn.net/) 是功能完備的 SSL VPN，使用業界標準的 SSL/TSL 協議實現了 OSI 第二、三層的安全網路插件，且支援基於證書、智慧卡和/或使用者名稱/密碼等彈性用戶端驗證方法，並可以使用基於使用者或群組的存取控制政策，該政策使用套用於虛擬私人網路虛擬介面的防火牆規則。

### 運行節點 {#operating-the-node}

你應該定期監控你的節點以確保其正常運行。 你可能需要偶爾進行維護。

#### 維持節點上線 {#keeping-node-online}

你的節點不需要一直保持上線，但應儘可能維持它的上線狀態，以持續與網路同步。 你可以關閉它並重啟，但請記得：

- 若磁碟仍正在寫入最近的狀態，關閉節點可能會花上數分鐘。
- 強制關閉可能會損害資料庫，這樣可能必須重新同步整個節點。
- 你的用戶端將與網路不同步，並且在重新啟動時需要重新同步。 雖然節點可以從上次關閉時的地方開始同步，但此流程會依離線的時長而定。

_這不適用於共識層驗證者節點。_節點離線將影響所有依賴節點的服務。 如果你是為了_質押_而運行節點，應該儘可能降低停機時間。

#### 建立用戶端服務 {#creating-client-services}

考慮建立一個在啟動時自動運行你的用戶端的服務。 例如，在 Linux 伺服器上，最佳案例為建立一個服務（如透過 `systemmd`），它會在適當設定的情況下執行用戶端，可限制使用者權限並自動重啟。

#### 更新用戶端 {#updating-clients}

你需要確保透過安全補丁、功能與[以太坊改善提議](/eips/)讓你的用戶端軟體保持最新。 特別是[硬分叉](/history/)前，請確保你運行的是正確的用戶端版本。

> 在重大的網路更新前，以太坊基金會在它們的[部落格](https://blog.ethereum.org)上發布貼文。 你可以[訂閱這些公告](https://blog.ethereum.org/category/protocol#subscribe)，在你的節點需要更新時，透過電子郵件接收通知。

更新用戶端非常簡單。 在每個用戶端的文檔中都有具體的說明，但實際上只要下載最新版的用戶端並透過最新的可執行檔重新啟動用戶端即可。 用戶端應從上次同步中斷的地方繼續同步，且完成用戶端更新。

每個用戶端實作都有用於點對點協定的人類可讀版本的字串，但也可透過指令存取該字串。 這個版本的字串可讓使用者檢查是否正執行正確的版本，並支援區塊瀏覽器和有興趣量化網路上特定用戶端的分佈的其他分析工具。 請參閱個別的用戶端文件以取得版本字串的更多資訊。

#### 運行額外服務 {#running-additional-services}

運行你自己的節點，可讓你使用需要直接存取以太坊用戶端遠端程序呼叫的服務。 這些是建立在以太坊之上的服務，如[二層網路解決方案 ](/developers/docs/scaling/#layer-2-scaling)、錢包的後端、區塊鏈瀏覽器、開發者工具以及其他以太坊基礎設施。

#### 監控節點 {#monitoring-the-node}

要正確監控你的節點，請考慮收集指標。 用戶端提供指標端點，因此你可以取得關於你節點的綜合資料。 使用諸如 [InfluxDB](https://www.influxdata.com/get-influxdb/) 或 [Prometheus](https://prometheus.io/) 等工具來建立資料庫，可讓你在像是 [Grafana](https://grafana.com/) 的軟體中將資料視覺化和圖表化。 使用此軟體有許多設定可以使用，還有不同的 Grafana 儀表板來將你的節點和整個網路視覺化。 詳細範例請見[監控 Geth 教學](/developers/tutorials/monitoring-geth-with-influxdb-and-grafana/)。

在監控時，請務必注意機器的效能。 在節點的初次同步期間，用戶端軟體可能會耗用大量的 CPU 和 RAM 資源。 除了 Grafana，你也可以使用其他作業系統提供的工具，像是 `htop` 或 `uptime` 來執行。

## 衍生閱讀 {#further-reading}

- [以太坊質押指南](https://github.com/SomerEsat/ethereum-staking-guides) - _Somer Esat，時常更新_
- [ 指南｜如何設定用於以太坊主網上質押的驗證者](https://www.coincashew.com/coins/overview-eth/guide-or-how-to-setup-a-validator-on-eth2-mainnet) _– CoinCashew，經常更新_
- [在測試網上運行驗證者的 ETHStaker 指南](https://github.com/remyroy/ethstaker#guides) – _ETHStaker，經常更新_
- [面向節點營運者的合併常見問題](https://notes.ethereum.org/@launchpad/node-faq-merge) - _2022 年 7 月_
- [分析以太坊完整驗證節點的硬體要求](https://medium.com/coinmonks/analyzing-the-hardware-requirements-to-be-an-ethereum-full-validated-node-dc064f167902)_ – Albert Palau，2018 年9 月24 日_
- [運行以太坊全節點：針對幾乎沒有動力的人提供的指南](https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31)_ – Justin Leroux，2019 年 11 月 7 日_
- [在以太坊主網上運行 Hyperledger Besu 節點：優勢、要求和設定](https://pegasys.tech/running-a-hyperledger-besu-node-on-the-ethereum-mainnet-benefits-requirements-and-setup/)_ – Felipe Faraggi，2020 年 5 月 7 日_
- [使用監控堆疊部署 Nethermind 以太坊用戶端](https://medium.com/nethermind-eth/deploying-nethermind-ethereum-client-with-monitoring-stack-55ce1622edbd) _ – Nethermind.eth，2020 年 7 月 8 日_

## 相關主題 {#related-topics}

- [節點和用戶端](/developers/docs/nodes-and-clients/)
- [分塊](/developers/docs/blocks/)
- [網路](/developers/docs/networks/)
