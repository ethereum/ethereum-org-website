---
title: "在 Raspberry Pi 4 上執行一個以太坊節點"
description: "為您的 Raspberry Pi 4 刷機、插入乙太網路線、連接 SSD 硬碟並開啟裝置電源，即可將 Raspberry Pi 4 變成一個完整的以太坊節點 + 驗證程式"
author: "EthereumOnArm"
tags: [ "用戶端", "執行層", "共識層", "節點" ]
lang: zh-tw
skill: intermediate
published: 2022-06-10
source: Ethereum on ARM
sourceUrl: https://ethereum-on-arm-documentation.readthedocs.io/en/latest/
---

**Ethereum on Arm 是一個自訂的 Linux 映像檔，可以將 Raspberry Pi 變成一個以太坊節點。**

要使用 Ethereum on Arm 將 Raspberry Pi 變成一個以太坊節點，建議使用以下硬體：

- Raspberry 4 (B 型 8GB)、Odroid M1 或 Rock 5B (8GB/16GB RAM) 開發板
- MicroSD 卡 (最低 16 GB Class 10)
- 最低 2 TB SSD USB 3.0 磁碟，或附帶 USB 轉 SATA 外接盒的 SSD。
- 電源供應器
- 乙太網路線
- 通訊埠轉發 (詳情請參閱用戶端)
- 附散熱片和風扇的機殼
- USB 鍵盤、螢幕和 HDMI 連接線 (micro-HDMI) (選用)

## 為什麼要在 ARM 上執行以太坊？ {#why-run-ethereum-on-arm}

ARM 開發板是非常實惠、靈活的小型電腦。 它們是執行以太坊節點的絕佳選擇，因為它們價格低廉，可以設定成將所有資源都集中在節點上，從而提高效率，而且它們耗電量低、體積小，可以不佔空間地放置在家中任何地方。 啟動節點也非常容易，因為 Raspberry Pi 的 MicroSD 只要用預先建置的映像檔刷機即可，不需要下載或建置軟體。

## 它是如何運作的？ {#how-does-it-work}

Raspberry Pi 的記憶卡已用預先建置的映像檔刷機。 此映像檔包含執行以太坊節點所需的一切。 使用已刷機的記憶卡，使用者只需要開啟 Raspberry Pi 的電源。 所有執行節點所需的程序都會自動啟動。 這是可行的，因為記憶卡包含一個以 Linux 為基礎的作業系統 (OS)，系統級的程序會在其上自動執行，將裝置變成一個以太坊節點。

無法使用熱門的 Raspberry Pi Linux 作業系統「Raspbian」來執行以太坊，因為 Raspbian 仍使用 32 位元架構，這會導致以太坊使用者遇到記憶體問題，而且共識用戶端不支援 32 位元二進位檔。 為了克服這個問題，Ethereum on Arm 團隊遷移到一個名為「Armbian」的原生 64 位元作業系統。

**映像檔會處理所有必要的步驟**，從設定環境和格式化 SSD 磁碟，到安裝並執行以太坊軟體，以及開始區塊鏈同步。

## 關於執行與共識用戶端的注意事項 {#note-on-execution-and-consensus-clients}

Ethereum on Arm 映像檔包含預先建置的執行用戶端和共識用戶端作為服務。 以太坊節點需要兩個用戶端都保持同步和執行。 您只需要下載並刷入映像檔，然後啟動服務。 映像檔預先載入了以下執行用戶端：

- Geth
- Nethermind
- Besu

以及下列共識用戶端：

- Lighthouse
- Nimbus
- Prysm
- Teku

您應該各選擇一個來執行，所有執行用戶端都與所有共識用戶端相容。 如果您沒有明確選擇用戶端，節點將會使用預設值 Geth 和 Lighthouse，並在開發板通電時自動執行它們。 您必須在路由器上開啟通訊埠 30303，這樣 Geth 才能找到並連接到對等點。

## 下載映像檔 {#downloading-the-image}

Raspberry Pi 4 以太坊映像檔是一個「隨插即用」的映像檔，它會自動安裝和設定執行用戶端和共識用戶端，並設定它們彼此通訊及連接到以太坊網路。 使用者只需要使用一個簡單的指令來啟動他們的程序。

從 [Ethereum on Arm](https://ethereumonarm-my.sharepoint.com/:u:/p/dlosada/Ec_VmUvr80VFjf3RYSU-NzkBmj2JOteDECj8Bibde929Gw?download=1) 下載 Raspberry Pi 映像檔並驗證 SHA256 雜湊值：

```sh
# 從包含已下載映像檔的目錄
shasum -a 256 ethonarm_22.04.00.img.zip
# 雜湊值應輸出： fb497e8f8a7388b62d6e1efbc406b9558bee7ef46ec7e53083630029c117444f
```

請注意，Rock 5B 和 Odroid M1 開發板的映像檔可在 Ethereum-on-Arm 的 [下載頁面](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/quick-guide/download-and-install.html) 取得。

## 刷入 MicroSD {#flashing-the-microsd}

要用於 Raspberry Pi 的 MicroSD 卡應先插入桌上型電腦或筆記型電腦以進行刷機。 然後，以下終端機指令會將下載的映像檔刷入 SD 卡：

```shell
# 檢查 MicroSD 卡名稱
sudo fdisk -l

>> sdxxx
```

正確取得名稱非常重要，因為下一個指令包含 `dd`，它會在將映像檔推送到記憶卡之前完全清除其現有內容。 若要繼續，請導覽至包含壓縮映像檔的目錄：

```shell
# 解壓縮並刷入映像檔
unzip ethonarm_22.04.00.img.zip
sudo dd bs=1M if=ethonarm_22.04.00.img of=/dev/<sdxx> conv=fdatasync status=progress
```

記憶卡現在已刷機完成，可以插入 Raspberry Pi 了。

## 啟動節點 {#start-the-node}

將 SD 卡插入 Raspberry Pi 後，連接乙太網路線和 SSD，然後開啟電源。 作業系統將會啟動，並自動開始執行預先設定的任務，將 Raspberry Pi 變成一個以太坊節點，包括安裝和建置用戶端軟體。 這可能需要 10-15 分鐘。

一旦所有內容都安裝並設定完成，請透過 ssh 連線登入裝置，或者如果開發板上連接了螢幕和鍵盤，則直接使用終端機登入。 使用 `ethereum` 帳戶登入，因為它具有啟動節點所需的權限。

```shell
使用者：ethereum
密碼：ethereum
```

預設的執行用戶端 Geth 將會自動啟動。 您可以透過使用以下終端機指令檢查記錄來確認這一點：

```sh
sudo journalctl -u geth -f
```

共識用戶端確實需要明確地啟動。 為此，請先在路由器上開啟通訊埠 9000，以便 Lighthouse 可以找到並連接到對等點。 然後啟用並啟動 lighthouse 服務：

```sh
sudo systemctl enable lighthouse-beacon
sudo systemctl start lighthouse-beacon
```

使用記錄檢查用戶端：

```sh
sudo journalctl -u lighthouse-beacon
```

請注意，共識用戶端將在幾分鐘內同步，因為它使用檢查點同步。 執行用戶端將需要更長的時間，可能需要幾個小時，並且在共識用戶端同步完成之前不會啟動 (這是因為執行用戶端需要一個同步目標，而同步完成的共識用戶端會提供該目標)。

在 Geth 和 Lighthouse 服務執行並同步後，您的 Raspberry Pi 現在就是一個以太坊節點了！ 最常見的與以太坊網路互動的方式是使用 Geth 的 Javascript 主控台，它可以附加到通訊埠 8545 上的 Geth 用戶端。 也可以使用像 Curl 這樣的請求工具來提交格式化為 JSON 物件的指令。 更多資訊請參閱 [Geth 文件](https://geth.ethereum.org/)。

Geth 已預先設定為向 Grafana 儀表板回報指標，該儀表板可在瀏覽器中檢視。 更進階的使用者可能會希望使用此功能來監控其節點的健康狀況，方法是導覽至 `ipaddress:3000`，並傳入 `user: admin` 和 `passwd: ethereum`。

## 驗證程式 {#validators}

也可以選擇性地將驗證程式新增至共識用戶端。 驗證程式軟體可讓您的節點積極參與共識，並為網路提供加密經濟安全性。 您將會因這項工作獲得 ETH 作為酬勞。 若要執行驗證程式，您必須先擁有 32 枚 ETH，這些 ETH 必須存入存款合約中。 可以按照 [Launchpad](https://launchpad.ethereum.org/) 上的逐步指南進行存款。 請在桌上型電腦/筆記型電腦上執行此操作，但不要產生金鑰 — 這可以直接在 Raspberry Pi 上完成。

在 Raspberry Pi 上開啟一個終端機，並執行以下指令來產生存款金鑰：

```
sudo apt-get update
sudo apt-get install staking-deposit-cli
cd && deposit new-mnemonic --num_validators 1
```

(或下載 [staking-deposit-cli](https://github.com/ethereum/staking-deposit-cli) 在離線機器上執行，並執行 `deposit new-mnemnonic` 指令)

請妥善保管您的助憶詞！ 上述指令在節點的密鑰存儲檔案中產生了兩個檔案：驗證程式金鑰和一個存款資料檔案。 存款資料需要上傳到 Launchpad，因此必須將其從 Raspberry Pi 複製到桌上型電腦/筆記型電腦。 這可以透過 ssh 連線或任何其他複製/貼上方法來完成。

一旦執行 Launchpad 的電腦上有了存款資料檔案，就可以將其拖放到 Launchpad 畫面上的 `+` 號上。 按照螢幕上的指示將一筆交易傳送到存款合約。

回到 Raspberry Pi 上，就可以啟動一個驗證程式了。 這需要匯入驗證程式金鑰、設定收取酬勞的地址，然後啟動預先設定的驗證程式程序。 以下範例適用於 Lighthouse—其他共識用戶端的說明可在 [Ethereum on Arm 文件](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/) 中找到：

```shell
# 匯入驗證程式金鑰
lighthouse account validator import --directory=/home/ethereum/validator_keys

# 設定酬勞地址
sudo sed -i 's/<ETH_ADDRESS>' /etc/ethereum/lighthouse-validator.conf

# 啟動驗證程式
sudo systemctl start lighthouse-validator
```

恭喜，您現在已經在 Raspberry Pi 上執行一個完整的以太坊節點和驗證程式了！

## 更多詳細資訊 {#more-details}

本頁面概述了如何使用 Raspberry Pi 設定 Geth-Lighthouse 節點和驗證程式。 更詳細的說明可在 [Ethereum-on-Arm 網站](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/index.html) 上取得。

## 感謝您的回饋 {#feedback-appreciated}

我們知道 Raspberry Pi 擁有龐大的使用者群，這對以太坊網路的健康狀況可能產生非常正面的影響。
請深入研究本使用教學中的詳細資訊、嘗試在測試網上執行、查看 Ethereum on Arm 的 GitHub、提供回饋、提出問題和提取請求，並協助推動技術和文件的進步！

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
11. https://ethersphere.github.io/swarm-home
12. https://raiden.network
13. https://ipfs.io
14. https://status.im
15. https://vipnode.org
