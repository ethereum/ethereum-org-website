---
title: "使用 InfluxDB 和 Grafana 監控 Geth"
description: "使用 InfluxDB 和 Grafana 為你的 Geth 節點設定監控，以追蹤效能並找出問題。"
author: "馬里奧·哈維爾"
tags:
  - 客戶端
  - 節點
skill: intermediate
breadcrumb: "監控 Geth"
lang: zh-tw
published: 2021-01-13
---

本教學將協助你為 Geth 節點設定監控，讓你更了解其效能並找出潛在問題。

## 先決條件 {#prerequisites}

- 你應該已經在執行一個 Geth 實例。
- 大多數步驟和範例都是針對 Linux 環境，具備基本的終端機知識會很有幫助。
- 觀看這部關於 Geth 指標套件的概覽影片：[Péter Szilágyi 的監控以太坊基礎設施](https://www.youtube.com/watch?v=cOBab8IJMYI)。

## 監控堆疊 {#monitoring-stack}

以太坊客戶端會收集大量資料，這些資料可以透過時間序列資料庫的形式讀取。為了讓監控更輕鬆，你可以將這些資料輸入到資料視覺化軟體中。有許多可用的選項：

- [Prometheus](https://prometheus.io/)（拉取模型）
- [InfluxDB](https://www.influxdata.com/get-influxdb/)（推送模型）
- [Telegraf](https://www.influxdata.com/time-series-platform/telegraf/)
- [Grafana](https://www.grafana.com/)
- [Datadog](https://www.datadoghq.com/)
- [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/)

如果你偏好 Prometheus，Geth 也可以以 Prometheus 格式公開其指標。使用 `--metrics --metrics.addr 127.0.0.1` 啟動 Geth，並將 Prometheus 指向 `http://127.0.0.1:6060/debug/metrics/prometheus`。

在本教學中，我們將設定你的 Geth 客戶端將資料推送到 InfluxDB 以建立資料庫，並使用 Grafana 建立資料的圖表視覺化。手動執行此操作將幫助你更了解整個過程、進行修改，並在不同的環境中部署。

## 設定 InfluxDB {#setting-up-influxdb}

首先，讓我們下載並安裝 InfluxDB。本教學使用 InfluxDB 1.x (OSS)，Geth 透過下方的 `--metrics.influxdb` 標記支援此版本。較新的 InfluxDB 版本使用不同的設定，包含組織、儲存桶和代幣，而不是資料庫和使用者。Geth 透過 `--metrics.influxdbv2` 標記支援 InfluxDB 2.x，但本教學中的設定步驟僅適用於 1.x。

請遵循適合你環境的 [InfluxDB 1.x 安裝指示](https://docs.influxdata.com/influxdb/v1/introduction/install/)。例如，在 Debian 或 Ubuntu 上，你可以從 InfluxData 儲存庫安裝它。在信任金鑰之前，請查看安裝指示以獲取目前的簽署金鑰指紋：

```sh
curl --silent --location -O https://repos.influxdata.com/influxdata-archive.key
sudo mkdir -p /etc/apt/keyrings
gpg --dearmor < influxdata-archive.key | sudo tee /etc/apt/keyrings/influxdata-archive.gpg > /dev/null
echo "deb [signed-by=/etc/apt/keyrings/influxdata-archive.gpg] https://repos.influxdata.com/debian stable main" | sudo tee /etc/apt/sources.list.d/influxdata.list
sudo apt update
sudo apt install influxdb -y
sudo systemctl enable influxdb
sudo systemctl start influxdb
```

`influxdb` 套件包含了 `influx` 命令列客戶端。

成功安裝 InfluxDB 後，請確保它在背景執行。預設情況下，可以透過 `localhost:8086` 存取它。
在使用 `influx` 客戶端之前，你必須建立一個具有管理員權限的新使用者。此使用者將用於高階管理、建立資料庫和使用者。

```sh
curl -XPOST "http://localhost:8086/query" --data-urlencode "q=CREATE USER username WITH PASSWORD 'password' WITH ALL PRIVILEGES"
```

現在你可以使用 influx 客戶端以該使用者身分進入 [InfluxDB shell](https://docs.influxdata.com/influxdb/v1/tools/shell/)。

```sh
influx -username 'username' -password 'password'
```

在 InfluxDB shell 中直接與其通訊，你可以為 Geth 指標建立資料庫和使用者。

```sql
create database geth
create user geth with password '<geth-password>'
```

使用以下命令驗證建立的項目：

```sql
show databases
show users
```

離開 InfluxDB shell。

```
exit
```

InfluxDB 正在執行，並已設定為儲存來自 Geth 的指標。

## 準備 Geth {#preparing-geth}

設定好資料庫後，我們需要在 Geth 中啟用指標收集。請注意 `geth --help` 中的 `METRICS AND STATS OPTIONS`。那裡可以找到多個選項，在這種情況下，我們希望 Geth 將資料推送到 InfluxDB。
基本設定指定了可以存取 InfluxDB 的端點以及資料庫的驗證。

```sh
geth --metrics --metrics.influxdb --metrics.influxdb.endpoint "http://127.0.0.1:8086" --metrics.influxdb.database "geth" --metrics.influxdb.username "geth" --metrics.influxdb.password "<geth-password>"
```

使用你在建立 `geth` 使用者時設定的相同密碼。這些標記可以附加到啟動客戶端的命令中，或儲存到設定檔中。

你可以驗證 Geth 是否成功推送資料，例如透過列出資料庫中的指標。在 InfluxDB shell 中：

```sql
use geth
show measurements
```

## 設定 Grafana {#setting-up-grafana}

下一步是安裝 Grafana，它將以圖形方式解釋資料。請遵循 Grafana 文件中[適合你環境的安裝流程](https://grafana.com/docs/grafana/latest/setup-grafana/installation/)。除非你有其他需求，否則請確保安裝 OSS 版本。
使用 Grafana 儲存庫在 Debian 或 Ubuntu 上的安裝步驟範例：

```sh
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://apt.grafana.com/gpg.key | gpg --dearmor | sudo tee /etc/apt/keyrings/grafana.gpg > /dev/null
echo "deb [signed-by=/etc/apt/keyrings/grafana.gpg] https://apt.grafana.com stable main" | sudo tee /etc/apt/sources.list.d/grafana.list
sudo apt update
sudo apt install grafana
sudo systemctl enable grafana-server
sudo systemctl start grafana-server
```

當你讓 Grafana 執行後，應該可以透過 `localhost:3000` 存取它。
使用你偏好的瀏覽器存取此路徑，然後使用預設憑證登入（使用者：`admin`，密碼：`admin`）。出現提示時，變更預設密碼並儲存。

![Geth 監控的 Grafana 儀表板螢幕截圖（面板 1）](./grafana1.png)

你將被重新導向到 Grafana 首頁。首先，設定你的來源資料。開啟選單並選擇 **Connections > Data sources**。本教學中的螢幕截圖來自較舊版本的 Grafana，因此你的畫面看起來可能會有些不同。

![Geth 監控的 Grafana 儀表板螢幕截圖（面板 2）](./grafana2.png)

目前尚未建立任何資料來源，點擊「Add data source」來定義一個。

![Geth 監控的 Grafana 儀表板螢幕截圖（面板 3）](./grafana3.png)

對於此設定，選擇「InfluxDB」並繼續。

![Geth 監控的 Grafana 儀表板螢幕截圖（面板 4）](./grafana4.png)

如果你在同一台機器上執行這些工具，資料來源的設定非常簡單。你需要設定 InfluxDB 地址和存取資料庫的詳細資訊。請參考下圖。

![Geth 監控的 Grafana 儀表板螢幕截圖（面板 5）](./grafana5.png)

如果一切完成且可以存取 InfluxDB，點擊「Save and test」並等待確認訊息彈出。

![Geth 監控的 Grafana 儀表板螢幕截圖（面板 6）](./grafana6.png)

Grafana 現在已設定為從 InfluxDB 讀取資料。現在你需要建立一個儀表板來解釋並顯示它。儀表板屬性編碼在 JSON 檔案中，任何人都可以建立並輕鬆匯入。開啟選單並選擇 **Dashboards**，然後點擊 **New > Import**。

![Geth 監控的 Grafana 儀表板螢幕截圖（面板 7）](./grafana7.png)

對於 Geth 監控儀表板，複製[此儀表板](https://grafana.com/grafana/dashboards/13877/)的 ID，並將其貼到 Grafana 的「Import page」中。儲存儀表板後，它應該看起來像這樣：

![Geth 監控的 Grafana 儀表板螢幕截圖（面板 8）](./grafana8.png)

你可以修改你的儀表板。每個面板都可以編輯、移動、移除或新增。你可以變更你的設定。這完全取決於你！要了解更多關於儀表板如何運作的資訊，請參考 [Grafana 的文件](https://grafana.com/docs/grafana/latest/dashboards/)。
你可能也會對[警報](https://grafana.com/docs/grafana/latest/alerting/)感興趣。這讓你可以設定當指標達到特定數值時的警報通知。支援多種通訊管道。
