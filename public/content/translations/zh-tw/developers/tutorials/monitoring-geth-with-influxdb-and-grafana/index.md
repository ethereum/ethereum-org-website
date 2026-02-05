---
title: 使用 InfluxDB 與 Grafana 監控 Geth
description: 使用 InfluxDB 與 Grafana 設定 Geth 節點的監控，以追蹤效能並識別問題。
author: "Mario Havel"
tags: [ "用戶端", "節點" ]
skill: intermediate
lang: zh-tw
published: 2021-01-13
---

本教學將協助您設定 Geth 節點的監控，以便更深入地了解其效能並識別潛在問題。

## 先決條件 {#prerequisites}

- 您應已在執行一個 Geth 實例。
- 大部分步驟和範例都適用於 Linux 環境，具備基本的終端機知識將會很有幫助。
- 請觀看此 Geth 指標套件的影片概覽：[Monitoring an Ethereum infrastructure by Péter Szilágyi](https://www.youtube.com/watch?v=cOBab8IJMYI)。

## 監控堆疊 {#monitoring-stack}

以太坊用戶端會收集大量資料，這些資料可以按時間順序資料庫的形式讀取。 為簡化監控，您可以將這些資料饋入資料視覺化軟體。 有以下幾種選項可供選擇：

- [Prometheus](https://prometheus.io/) (提取模型)
- [InfluxDB](https://www.influxdata.com/get-influxdb/) (推送模型)
- [Telegraf](https://www.influxdata.com/get-influxdb/)
- [Grafana](https://www.grafana.com/)
- [Datadog](https://www.datadoghq.com/)
- [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/)

此外，還有 [Geth Prometheus Exporter](https://github.com/hunterlong/gethexporter)，這是一個預先配置好 InfluxDB 和 Grafana 的選項。

在本教學中，我們將設定您的 Geth 用戶端，將資料推送到 InfluxDB 以建立資料庫，並推送到 Grafana 以建立資料的圖形化視覺呈現。 手動操作有助於您更深入地了解流程、修改流程，並在不同環境中部署。

## 設定 InfluxDB {#setting-up-influxdb}

首先，我們來下載並安裝 InfluxDB。 您可以在 [Influxdata 發布頁面](https://portal.influxdata.com/downloads/) 找到各種下載選項。 請選擇適合您環境的版本。
您也可以從 [儲存庫](https://repos.influxdata.com/) 安裝。 例如，在 Debian 系列的發行版中：

```
curl -tlsv1.3 --proto =https -sL https://repos.influxdata.com/influxdb.key | sudo apt-key add
source /etc/lsb-release
echo "deb https://repos.influxdata.com/${DISTRIB_ID,,} ${DISTRIB_CODENAME} stable" | sudo tee /etc/apt/sources.list.d/influxdb.list
sudo apt update
sudo apt install influxdb -y
sudo systemctl enable influxdb
sudo systemctl start influxdb
sudo apt install influxdb-client
```

成功安裝 InfluxDB 後，請確保它在背景執行。 依預設，可以在 `localhost:8086` 連線到它。
在使用 `influx` 用戶端之前，您必須建立一個具有管理員權限的新使用者。 此使用者將用於高階管理、建立資料庫和使用者。

```
curl -XPOST "http://localhost:8086/query" --data-urlencode "q=CREATE USER username WITH PASSWORD 'password' WITH ALL PRIVILEGES"
```

現在您可以使用此使用者透過 influx 用戶端進入 [InfluxDB shell](https://docs.influxdata.com/influxdb/v1.8/tools/shell/)。

```
influx -username 'username' -password 'password'
```

在其 shell 中直接與 InfluxDB 通訊，您可以為 geth 指標建立資料庫和使用者。

```
create database geth
create user geth with password choosepassword
```

使用以下指令驗證已建立的項目：

```
show databases
show users
```

離開 InfluxDB shell。

```
exit
```

InfluxDB 正在執行並已設定為儲存來自 Geth 的指標。

## 準備 Geth {#preparing-geth}

設定好資料庫後，我們需要在 Geth 中啟用指標收集。 請注意 `geth --help` 中的 `METRICS AND STATS OPTIONS`。 您可以在那裡找到多個選項，在這種情況下，我們希望 Geth 將資料推送到 InfluxDB。
基本設定指定了 InfluxDB 的可連線端點和資料庫的驗證資訊。

```
geth --metrics --metrics.influxdb --metrics.influxdb.endpoint "http://0.0.0.0:8086" --metrics.influxdb.username "geth" --metrics.influxdb.password "chosenpassword"
```

這些旗標可以附加到啟動用戶端的指令中，或儲存到設定檔中。

您可以透過列出資料庫中的指標等方式，來驗證 Geth 是否成功推送資料。 在 InfluxDB shell 中：

```
use geth
show measurements
```

## 設定 Grafana {#setting-up-grafana}

下一步是安裝 Grafana，它將以圖形方式解譯資料。 請在 Grafana 文件中遵循您環境的安裝程序。 如果您沒有其他需求，請務必安裝 OSS 版本。
使用儲存庫為 Debian 發行版安裝的範例步驟：

```
curl -tlsv1.3 --proto =https -sL https://packages.grafana.com/gpg.key | sudo apt-key add -
echo "deb https://packages.grafana.com/oss/deb stable main" | sudo tee -a /etc/apt/sources.list.d/grafana.list
sudo apt update
sudo apt install grafana
sudo systemctl enable grafana-server
sudo systemctl start grafana-server
```

當 Grafana 執行後，應該可以在 `localhost:3000` 連線到它。
使用您偏好的瀏覽器存取此路徑，然後使用預設憑證登入 (使用者：`admin`，密碼：`admin`)。 出現提示時，請變更預設密碼並儲存。

![](./grafana1.png)

您將被重新導向到 Grafana 首頁。 首先，設定您的資料來源。 按一下左側欄的設定圖示，然後選取 "Data sources"。

![](./grafana2.png)

目前尚未建立任何資料來源，請按一下 "Add data source" 來定義一個。

![](./grafana3.png)

對於此設定，請選取 "InfluxDB" 並繼續。

![](./grafana4.png)

如果您在同一台機器上執行工具，資料來源的設定非常直接。 您需要設定 InfluxDB 位址和存取資料庫的詳細資訊。 請參考下圖。

![](./grafana5.png)

如果一切都已完成且 InfluxDB 可連線，請按一下 "Save and test"，然後等待確認訊息彈出。

![](./grafana6.png)

Grafana 現在已設定為可從 InfluxDB 讀取資料。 現在您需要建立一個儀表板來解譯和顯示資料。 儀表板屬性被編碼在 JSON 檔案中，任何人都可以建立並輕鬆匯入這些檔案。 在左側欄上，按一下 "Create and Import"。

![](./grafana7.png)

若要建立 Geth 監控儀表板，請複製[此儀表板](https://grafana.com/grafana/dashboards/13877/)的 ID，並將其貼到 Grafana 的 "Import page" 中。 儲存儀表板後，它應該看起來像這樣：

![](./grafana8.png)

您可以修改您的儀表板。 每個面板都可以編輯、移動、移除或新增。 您可以變更您的設定。 一切由您決定！ 要了解更多關於儀表板的運作方式，請參考 [Grafana 的文件](https://grafana.com/docs/grafana/latest/dashboards/)。
您可能也對[警示](https://grafana.com/docs/grafana/latest/alerting/)感興趣。 這可讓您設定當指標達到特定值時的警示通知。 支援多種通訊管道。
