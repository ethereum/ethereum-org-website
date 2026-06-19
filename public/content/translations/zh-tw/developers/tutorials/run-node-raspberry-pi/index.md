---
title: 在 Raspberry Pi 4 上執行以太坊節點
description: 燒錄你的 Raspberry Pi 4，插上乙太網路線，連接 SSD 磁碟並開啟裝置電源，將 Raspberry Pi 4 變成完整的以太坊節點與驗證者
author: "EthereumOnArm"
tags:
  - 客戶端
  - 執行層
  - 共識層
  - 節點
lang: zh-tw
skill: intermediate
breadcrumb: Raspberry Pi 節點
published: 2022-06-10
source: Ethereum on ARM
sourceUrl: https://ethereum-on-arm-documentation.readthedocs.io/en/latest/
---

**Ethereum on Arm 是一個自訂的 Linux 映像檔，可以將 Raspberry Pi 變成一個以太坊節點。**

若要使用 Ethereum on Arm 將 Raspberry Pi 變成以太坊節點，建議使用以下硬體：

- Raspberry Pi 4（B 型 8GB）、Odroid M1 或 Rock 5B（8GB/16GB RAM）開發板
- MicroSD 記憶卡（最低 16 GB Class 10）
- 至少 2 TB 的 SSD USB 3.0 磁碟，或帶有 USB 轉 SATA 外接盒的 SSD。
- 電源供應器
- 乙太網路線
- 通訊埠轉發（詳情請參閱客戶端說明）
- 附散熱片與風扇的外殼
- USB 鍵盤、螢幕與 HDMI 線（micro-HDMI）（選用）

## 為什麼要在 ARM 上執行以太坊？ {#why-run-ethereum-on-arm}

ARM 開發板是非常實惠、靈活且小巧的電腦。它們是執行以太坊節點的絕佳選擇，因為它們價格低廉，可以設定為將所有資源集中在節點上以提高效率，耗電量低，而且體積小巧，可以毫不突兀地放置在任何家庭中。啟動節點也非常容易，因為只需將預先建置的映像檔燒錄到 Raspberry Pi 的 MicroSD 卡中，無需下載或建置軟體。

## 它是如何運作的？ {#how-does-it-work}

Raspberry Pi 的記憶卡會燒錄一個預先建置的映像檔。這個映像檔包含執行以太坊節點所需的一切。有了燒錄好的記憶卡，使用者只需開啟 Raspberry Pi 的電源即可。執行節點所需的所有程序都會自動啟動。這是因為記憶卡包含一個基於 Linux 的作業系統 (OS)，在該系統之上會自動執行系統級程序，將裝置變成一個以太坊節點。

以太坊無法使用廣受歡迎的 Raspberry Pi Linux 作業系統「Raspbian」來執行，因為 Raspbian 仍使用 32 位元架構，這會導致以太坊使用者遇到記憶體問題，而且共識客戶端不支援 32 位元二進位檔。為了解決這個問題，Ethereum on Arm 團隊遷移到名為「Armbian」的原生 64 位元作業系統。

**映像檔會處理所有必要的步驟**，從設定環境、格式化 SSD 磁碟，到安裝與執行以太坊軟體，以及啟動區塊鏈同步。

## 關於執行客戶端與共識客戶端的注意事項 {#note-on-execution-and-consensus-clients}

Ethereum on Arm 映像檔包含預先建置的執行客戶端與共識客戶端作為服務。以太坊節點需要這兩個客戶端都處於同步且執行的狀態。你只需要下載並燒錄映像檔，然後啟動服務即可。該映像檔預先載入了以下執行客戶端：

- Geth
- 奈瑟邁 (Nethermind)
- 貝蘇 (Besu)

以及以下共識客戶端：

- 萊特豪斯 (Lighthouse)
- 寧布斯 (Nimbus)
- 普萊斯姆 (Prysm)
- 泰庫 (Teku)

你應該各選擇一個來執行——所有執行客戶端都與所有共識客戶端相容。如果你沒有明確選擇客戶端，節點將退回使用預設值（Geth 和萊特豪斯 (Lighthouse)），並在開發板通電時自動執行它們。你必須在路由器上開啟通訊埠 30303，以便 Geth 能夠尋找並連接到對等節點。

## 下載映像檔 {#downloading-the-image}

Raspberry Pi 4 以太坊映像檔是一個「隨插即用」的映像檔，會自動安裝並設定執行客戶端與共識客戶端，將它們設定為互相通訊並連接到以太坊網路。使用者只需使用一個簡單的指令來啟動它們的程序。

從 [Ethereum on Arm](https://ethereumonarm-my.sharepoint.com/:u:/p/dlosada/Ec_VmUvr80VFjf3RYSU-NzkBmj2JOteDECj8Bibde929Gw?download=1) 下載 Raspberry Pi 映像檔並驗證 SHA-256 雜湊：

```sh
# 從包含已下載映像檔的目錄
shasum -a 256 ethonarm_22.04.00.img.zip
# 雜湊應輸出：fb497e8f8a7388b62d6e1efbc406b9558bee7ef46ec7e53083630029c117444f
```

請注意，Rock 5B 和 Odroid M1 開發板的映像檔可在 Ethereum-on-Arm 的[下載頁面](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)取得。

## 燒錄 MicroSD 卡 {#flashing-the-microsd}

將用於 Raspberry Pi 的 MicroSD 卡應先插入桌上型電腦或筆記型電腦以便進行燒錄。然後，以下終端機指令會將下載的映像檔燒錄到 SD 卡上：

```shell
# 檢查 MicroSD 卡名稱
sudo fdisk -l

>> sdxxx
```

確保名稱正確非常重要，因為下一個指令包含 `dd`，它會在將映像檔推送到卡片之前完全清除卡片上的現有內容。要繼續操作，請導覽至包含壓縮映像檔的目錄：

```shell
# 解壓縮並燒錄映像檔
unzip ethonarm_22.04.00.img.zip
sudo dd bs=1M if=ethonarm_22.04.00.img of=/dev/<sdxx> conv=fdatasync status=progress
```

記憶卡現在已燒錄完畢，可以將其插入 Raspberry Pi 中。

## 啟動節點 {#start-the-node}

將 SD 卡插入 Raspberry Pi 後，連接乙太網路線和 SSD，然後開啟電源。作業系統將會開機並自動開始執行預先設定的任務，將 Raspberry Pi 變成一個以太坊節點，包括安裝和建置客戶端軟體。這大約需要 10 到 15 分鐘。

一旦所有東西都安裝並設定完畢，請透過 SSH 連線登入裝置，或者如果開發板連接了螢幕和鍵盤，則直接使用終端機登入。使用 `ethereum` 帳戶登入，因為該帳戶具有啟動節點所需的權限。

```shell
User: ethereum
Password: ethereum
```

預設的執行客戶端 Geth 將會自動啟動。你可以使用以下終端機指令檢查日誌來確認這一點：

```sh
sudo journalctl -u geth -f
```

共識客戶端確實需要明確啟動。為此，請先在路由器上開啟通訊埠 9000，以便萊特豪斯 (Lighthouse) 能夠尋找並連接到對等節點。然後啟用並啟動 Lighthouse 服務：

```sh
sudo systemctl enable lighthouse-beacon
sudo systemctl start lighthouse-beacon
```

使用日誌檢查客戶端：

```sh
sudo journalctl -u lighthouse-beacon
```

請注意，共識客戶端將在幾分鐘內完成同步，因為它使用檢查點同步。執行客戶端將需要更長的時間——可能需要幾個小時，而且在共識客戶端完成同步之前它不會啟動（這是因為執行客戶端需要一個同步目標，而這由已同步的共識客戶端提供）。

隨著 Geth 和萊特豪斯 (Lighthouse) 服務的執行與同步，你的 Raspberry Pi 現在已經是一個以太坊節點了！最常見的與以太坊網路互動的方式是使用 Geth 的 JavaScript 主控台，它可以附加到通訊埠 8545 上的 Geth 客戶端。也可以使用像 Curl 這樣的請求工具提交格式化為 JSON 物件的指令。詳情請參閱 [Geth 文件](https://geth.ethereum.org/)。

Geth 已預先設定為將指標報告給 Grafana 儀表板，可以在瀏覽器中檢視。進階使用者可能希望使用此功能來監控其節點的健康狀況，方法是導覽至 `ipaddress:3000`，並傳遞 `user: admin` 和 `passwd: ethereum`。

## 驗證者 {#validators}

也可以選擇將驗證者新增至共識客戶端。驗證者軟體允許你的節點積極參與共識，並為網路提供密碼經濟學安全性。你將會獲得 ETH 作為這項工作的獎勵。要執行驗證者，你必須先擁有 32 個 ETH，這些 ETH 必須存入存款合約中。你可以按照 [Launchpad](https://launchpad.ethereum.org/) 上的逐步指南進行存款。請在桌上型電腦/筆記型電腦上執行此操作，但不要產生金鑰——這可以直接在 Raspberry Pi 上完成。

在 Raspberry Pi 上開啟終端機並執行以下指令來產生存款金鑰：

```
sudo apt-get update
sudo apt-get install staking-deposit-cli
cd && deposit new-mnemonic --num_validators 1
```

（或者下載 [staking-deposit-cli](https://github.com/ethereum/staking-deposit-cli) 以在實體隔離的機器上執行，並執行 `deposit new-mnemnonic` 指令）

請妥善保管助記詞！上述指令在節點的金鑰庫中產生了兩個檔案：驗證者金鑰和存款資料檔案。存款資料需要上傳到 Launchpad，因此必須將其從 Raspberry Pi 複製到桌上型電腦/筆記型電腦。這可以使用 SSH 連線或任何其他複製/貼上方法來完成。

一旦執行 Launchpad 的電腦上有了存款資料檔案，就可以將其拖放到 Launchpad 畫面上的 `+` 中。按照畫面上的指示發送交易到存款合約。

回到 Raspberry Pi，現在可以啟動驗證者了。這需要匯入驗證者金鑰，設定收集獎勵的地址，然後啟動預先設定的驗證者程序。以下範例適用於萊特豪斯 (Lighthouse)——其他共識客戶端的指示可在 [Ethereum on Arm 文件](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)中找到：

```shell
# 匯入驗證者金鑰
lighthouse account validator import --directory=/home/ethereum/validator_keys

# 設定獎勵地址
sudo sed -i 's/<ETH_ADDRESS>' /etc/ethereum/lighthouse-validator.conf

# 啟動驗證者
sudo systemctl start lighthouse-validator
```

恭喜，你現在已經在 Raspberry Pi 上執行了一個完整的以太坊節點和驗證者！

## 更多詳細資訊 {#more-details}

本頁面概述了如何使用 Raspberry Pi 設定 Geth-萊特豪斯 (Lighthouse) 節點和驗證者。更詳細的指示可在 [Ethereum-on-Arm 網站](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)上找到。

## 歡迎提供回饋 {#feedback-appreciated}

我們知道 Raspberry Pi 擁有龐大的使用者群，這可能對以太坊網路的健康產生非常正面的影響。
請深入了解本教學中的詳細資訊，嘗試在測試網上執行，查看 Ethereum on Arm 的 GitHub，提供回饋，提出問題 (issue) 和拉取請求 (pull request)，並協助推進技術和文件！

## 參考資料 {#references}

1. https://ubuntu.com/download/raspberry-pi
2. https://wikipedia.org/wiki/Port_forwarding
3. https://prometheus.io
4. https://grafana.com
5. https://forum.armbian.com/topic/5565-zram-vs-swap/
6. https://geth.ethereum.org
7. https://nethermind.io
8. https://www.hyperledger.org/projects/besu
9. https://github.com/prysmaticlabs/prysm
10. https://lighthouse.sigmaprime.io
11. https://docs.ethswarm.org/
12. https://raiden.network
13. https://ipfs.io
14. https://status.im
15. https://vipnode.org