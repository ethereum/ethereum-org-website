---
title: "在 Raspberry Pi 5 上執行以太坊節點"
description: "燒錄你的 Raspberry Pi 5，插上乙太網路線，連接 NVMe 磁碟並開啟裝置電源，將 Raspberry Pi 5 變成完整的以太坊節點與驗證者"
author: "EthereumOnArm"
tags:
  - 客戶端
  - 執行層
  - 共識層
  - 節點
lang: zh-tw
skill: intermediate
breadcrumb: "Raspberry Pi 節點"
published: 2022-06-10
source: Ethereum on ARM
sourceUrl: https://ethereum-on-arm-documentation.readthedocs.io/en/latest/
---

**Ethereum on Arm 是一個自訂的 Linux 映像檔，可以將 Raspberry Pi 變成以太坊節點。**

若要使用 Ethereum on Arm 將 Raspberry Pi 變成以太坊節點，建議使用以下硬體：

- 配備 16 GB RAM 的 Raspberry Pi 5
- 適用於 Raspberry Pi 5 的 NVMe HAT，用於連接 NVMe 磁碟
- NVMe SSD (M.2 2280)，至少 4 TB。請避免使用配備 Phison 控制器的磁碟，因為它們有已知的相容性問題。
- MicroSD 卡（至少 16 GB Class 10）
- 電源供應器
- 乙太網路線
- 通訊埠轉發（詳情請參閱客戶端）
- 附散熱片的機殼
- USB 鍵盤、螢幕和 HDMI 線 (micro-HDMI)（選用）

Ethereum on Arm 也支援其他 ARM 開發板，例如 NanoPC T6、Rock 5B 和 Orange Pi 5 Plus。這些開發板原生支援 NVMe，因此如果你要購買新硬體，Ethereum on Arm 團隊建議優先選擇它們，而不是 Raspberry Pi 5。詳情請參閱[建議硬體清單](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/overview/supported-hardware.html)。除了下載的映像檔不同之外，本教學的其餘部分適用於所有支援的開發板。

## 為什麼要在 ARM 上執行以太坊？ {#why-run-ethereum-on-arm}

ARM 開發板是非常實惠、靈活且小巧的電腦。它們是執行以太坊節點的絕佳選擇，因為它們價格低廉，可以設定為將所有資源集中在節點上以提高效率，耗電量低，而且體積小巧，可以毫不突兀地放置在任何家庭中。啟動節點也非常容易，因為只需將預先建置的映像檔燒錄到 Raspberry Pi 的 MicroSD 卡中，無需下載或建置軟體。

## 它是如何運作的？ {#how-does-it-work}

Raspberry Pi 的記憶卡會燒錄一個預先建置的映像檔。這個映像檔包含執行以太坊節點所需的一切。有了燒錄好的記憶卡，使用者只需開啟 Raspberry Pi 的電源即可。執行節點所需的所有程序都會自動啟動。這是因為記憶卡包含一個基於 Linux 的作業系統 (OS)，在該系統上會自動執行系統層級的程序，將裝置變成以太坊節點。

Ethereum on Arm 映像檔基於針對執行以太坊節點進行最佳化的 64 位元 Linux 發行版，並且包含預先建置的以太坊客戶端。

**映像檔會處理所有必要的步驟**，從設定環境、格式化 NVMe 磁碟到安裝以太坊軟體。

## 關於執行客戶端與共識客戶端的注意事項 {#note-on-execution-and-consensus-clients}

Ethereum on Arm 映像檔包含預先建置的執行客戶端與共識客戶端作為服務。以太坊節點需要這兩個客戶端都保持同步並執行。你只需要下載並燒錄映像檔，然後啟動服務即可。映像檔預先載入了多個執行客戶端（例如 Geth、Nethermind、Besu、Erigon 和 Reth）以及共識客戶端（例如 Lighthouse、Prysm、Teku、Nimbus 和 Lodestar）。請參閱 [Ethereum on Arm 文件](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/running-a-node/managing-clients.html)以取得目前的清單。

你應該各選擇一個來執行 - 所有執行客戶端都與所有共識客戶端相容。本教學使用 Geth 和 Lighthouse。

## 下載映像檔 {#downloading-the-image}

Ethereum on Arm 映像檔是一個「隨插即用」的映像檔，會自動安裝並設定執行客戶端與共識客戶端，將它們設定為互相通訊並連接到以太坊網路。使用者只需使用簡單的指令啟動它們的程序即可。

從 [Ethereum on Arm 下載頁面](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/getting-started/installation.html#image-downloads)下載適用於你的開發板的最新映像檔。下載頁面也列出了每個映像檔的 SHA-256 總和檢查碼。請對照它來驗證下載的檔案：

```sh
# 從包含已下載映像檔的目錄
sha256sum ethonarm_rpi5_<version>.img.zip
# 將輸出與下載頁面上的校驗和進行比較
```

## 燒錄 MicroSD 卡 {#flashing-the-microsd}

將用於 Raspberry Pi 的 MicroSD 卡應先插入桌上型電腦或筆記型電腦，以便進行燒錄。然後，以下終端機指令會將下載的映像檔燒錄到 SD 卡上：

```shell
# 檢查 MicroSD 卡名稱
sudo fdisk -l

>> sdxxx
```

確保名稱正確非常重要，因為下一個指令包含 `dd`，它會在將映像檔寫入卡片之前完全清除卡片現有的內容。若要繼續，請導覽至包含壓縮映像檔的目錄：

```shell
# 解壓縮並燒錄映像檔
unzip ethonarm_rpi5_<version>.img.zip
sudo dd bs=1M if=ethonarm_rpi5_<version>.img of=/dev/<sdxx> conv=fdatasync status=progress
```

卡片現在已燒錄完成，可以插入 Raspberry Pi 中。

## 啟動節點 {#start-the-node}

將 SD 卡插入 Raspberry Pi 後，連接乙太網路線和 NVMe 磁碟，然後開啟電源。作業系統將會開機並自動開始執行預先設定的任務，將 Raspberry Pi 變成以太坊節點，包括格式化 NVMe 磁碟和安裝客戶端軟體。這可能需要 10-15 分鐘，完成後開發板會自動重新開機。在此期間請勿中斷電源。

一旦所有東西都安裝並設定完畢，請透過 ssh 連線登入裝置，或者如果開發板連接了螢幕和鍵盤，則直接使用終端機登入。使用 `ethereum` 帳戶登入，因為它具有啟動節點所需的權限。

```shell
User: ethereum
Password: ethereum
```

首次登入時，系統會要求你變更預設密碼。請務必變更，否則任何可以連線到你節點的人都可以使用預設密碼登入。系統防火牆預設為停用，因此如果你的節點有公開 IP 地址，請參閱 [Ethereum on Arm 安全指南](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/system/security.html)來啟用它。

首先啟動共識客戶端。在你的路由器上開啟通訊埠 9000（TCP 和 UDP），以便 Lighthouse 可以找到並連接到對等節點。然後啟用並啟動 lighthouse 服務，這樣它在重新開機後也會重新啟動：

```sh
sudo systemctl enable --now lighthouse-beacon
```

使用日誌檢查客戶端：

```sh
sudo journalctl -u lighthouse-beacon -f
```

接下來，啟動執行客戶端。在你的路由器上開啟通訊埠 30303（TCP 和 UDP），以便 Geth 可以找到並連接到對等節點。然後啟用並啟動 geth 服務：

```sh
sudo systemctl enable --now geth
```

你可以透過檢查日誌來確認它正在執行：

```sh
sudo journalctl -u geth -f
```

請注意，共識客戶端將在幾分鐘內同步，因為它使用檢查點同步。執行客戶端將需要更長的時間 - 可能需要幾個小時。兩個客戶端同時執行：共識客戶端告訴執行客戶端哪個區塊是鏈的頂端，而執行客戶端則下載並驗證直到該區塊的區塊。

隨著 Geth 和 Lighthouse 服務執行並同步，你的 Raspberry Pi 現在是一個以太坊節點了！最常見的與以太坊網路互動的方式是使用 Geth 的 JavaScript 主控台，它可以附加到通訊埠 8545 上的 Geth 客戶端。也可以使用像 Curl 這樣的請求工具提交格式化為 JSON 物件的指令。詳情請參閱 [Geth 文件](https://geth.ethereum.org/)。

該映像檔還包含一個 Grafana 儀表板，進階使用者可以透過在瀏覽器中導覽至 `ipaddress:3000` 來監控其節點的健康狀況。

## 驗證者 {#validators}

也可以選擇將驗證者新增到共識客戶端。驗證者軟體允許你的節點積極參與共識，並為網路提供密碼經濟學安全性。你會因為這項工作而獲得 ETH 獎勵。要執行驗證者，你必須先擁有 32 ETH，這些 ETH 必須存入存款合約中。可以按照 [Launchpad](https://launchpad.ethereum.org/) 上的逐步指南進行存款。請在桌上型電腦/筆記型電腦上執行此操作，但不要產生金鑰 — 這可以直接在 Raspberry Pi 上完成。

[ethstaker-deposit-cli](https://github.com/ethstaker/ethstaker-deposit-cli) 工具會產生驗證者金鑰。目前的映像檔已包含它；如果你執行的是較舊的映像檔，請先安裝它。然後產生存款金鑰，將 `<YOUR_ETH_ADDRESS>` 替換為應接收你提款的地址：

```sh
sudo apt-get update
sudo apt-get install ethstaker-deposit-cli
cd && deposit new-mnemonic --num_validators 1 --execution_address <YOUR_ETH_ADDRESS> --chain mainnet
```

（或者下載 [ethstaker-deposit-cli](https://github.com/ethstaker/ethstaker-deposit-cli) 以在實體隔離的機器上執行，並在那裡執行 `deposit new-mnemonic` 指令）

請妥善保管助記詞！上面的指令在 `validator_keys` 目錄中產生了兩個檔案：驗證者金鑰和存款資料檔案。存款資料需要上傳到 Launchpad，因此必須將其從 Raspberry Pi 複製到桌上型電腦/筆記型電腦。這可以使用 ssh 連線或任何其他複製/貼上方法來完成。

一旦執行 Launchpad 的電腦上有了存款資料檔案，就可以將其拖放到 Launchpad 畫面上的 `+`。按照畫面上的指示發送交易到存款合約。

回到 Raspberry Pi，可以啟動驗證者了。這需要匯入驗證者金鑰、設定收取獎勵的地址，然後啟動預先設定的驗證者程序。以下範例適用於 Lighthouse — 其他共識客戶端的指示可在 [Ethereum on Arm 文件](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/staking/solo-staking.html)中找到：

```shell
# 匯入驗證者金鑰
lighthouse account validator import --directory=/home/ethereum/validator_keys

# 設定獎勵地址（請將 <YOUR_ETH_ADDRESS> 替換為您的地址）
sudo sed -i 's/changeme/<YOUR_ETH_ADDRESS>/' /etc/ethereum/lighthouse-validator.conf

# 啟動驗證者
sudo systemctl enable --now lighthouse-validator
```

恭喜，你現在已經在 Raspberry Pi 上執行了一個完整的以太坊節點和驗證者！

## 更多詳細資訊 {#more-details}

本頁面概述了如何使用 Raspberry Pi 設定 Geth-萊特豪斯 (Lighthouse) 節點和驗證者。更詳細的指示可在 [Ethereum-on-Arm 網站](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)上找到。

## 歡迎提供回饋 {#feedback-appreciated}

我們知道 Raspberry Pi 擁有龐大的使用者基礎，這可能對以太坊網路的健康產生非常正面的影響。
請深入了解本教學中的詳細資訊，嘗試在測試網上執行，查看 [Ethereum on Arm GitHub](https://github.com/EOA-Blockchain-Labs/ethereumonarm)，提供回饋、提出問題 (issue) 和拉取請求 (pull request)，並協助推進技術和文件！

## 參考資料 {#references}

1. https://ethereum-on-arm-documentation.readthedocs.io/en/latest/
2. https://wikipedia.org/wiki/Port_forwarding
3. https://prometheus.io
4. https://grafana.com
5. https://geth.ethereum.org
6. https://lighthouse.sigmaprime.io
7. https://github.com/ethstaker/ethstaker-deposit-cli
