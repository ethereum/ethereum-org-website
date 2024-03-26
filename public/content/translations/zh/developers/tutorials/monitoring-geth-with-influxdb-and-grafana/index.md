---
title: 使用 InfluxDB 和 Grafana 监测 Geth
description:
author: "Mario Havel"
tags:
  - "客户端"
  - "节点"
skill: intermediate
lang: zh
published: 2021-01-13
---

本教程将帮助您设置 Geth 节点的监测方法，以便更好地了解其性能并发现潜在问题。

## 前提条件 {#prerequisites}

- 您应该已经运行一个 Geth 实例。
- 大部分步骤和示例都针对 linux 环境，基础的终端知识会有所帮助。
- 请观看这段关于 Geth 指标集的概览视频：[监测以太坊基础设施（作者 Péter Szilágyi）](https://www.youtube.com/watch?v=cOBab8IJMYI)

## 监测堆栈 {#monitoring-stack}

以太坊客户端收集大量数据，可以通过时序数据库读取这些数据。 为了便于监测，您可以将数据输入数据可视化软件。 下面提供了多种选项供您选择：

- [Prometheus](https://prometheus.io/)（拉取模式）
- [InfluxDB](https://www.influxdata.com/get-influxdb/)（推送模式）
- [Telegraf](https://www.influxdata.com/get-influxdb/)
- [Grafana](https://www.grafana.com/)
- [Datadog](https://www.datadoghq.com/)
- [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/)

还可以选择 [Geth Prometheus Exporter](https://github.com/hunterlong/gethexporter)，它是一个用 InfluxDB 和 Grafana 预先配置的选项。 您可以使用 docker 和适用于树莓派 4 的 [Ethbian 操作系统](https://ethbian.org/index.html) 轻松设置它。

在本教程中，我们将设置您的 Geth 客户端，将数据推送到 InfluxDB 以创建数据库，并设置 Grafana 来对数据进行图形可视化。 手动操作将帮助您更好地理解这一过程，您可以加以改动，并在不同的环境中部署。

## 设置 InfluxDB {#setting-up-influxdb}

首先，下载并安装 InfluxDB。 [Influxdata 下载页面](https://portal.influxdata.com/downloads/)提供了多种下载选项。 选择适合您安装环境的下载选项。 您还可以通过[资源库](https://repos.influxdata.com/)安装它。 例如，在基于 Debian 的发行版中：

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

在成功安装 InfluxDB 后，确保它在后台运行。 默认情况下，可以通过 `localhost:8086` 访问它。 在使用 `influx` 客户端前，您必须创建具有管理员权限的新用户。 该用户将进行高级管理，创建数据库和用户。

```
curl -XPOST "http://localhost:8086/query" --data-urlencode "q=CREATE USER username WITH PASSWORD 'password' WITH ALL PRIVILEGES"
```

现在，您可以用此用户的身份通过 influx 客户端进入 [InfluxDB 命令行](https://docs.influxdata.com/influxdb/v1.8/tools/shell/)。

```
influx -username 'username' -password 'password'
```

您可以通过其命令行直接与 InfluxDB 通信，为 geth 指标创建数据库和用户。

```
create database geth
create user geth with password choosepassword
```

如下验证已创建的条目：

```
show databases
show users
```

退出 InfluxDB 命令行。

```
exit
```

InfluxDB 正在运作，将其配置为存储来自 Geth 的指标。

## 准备 Geth {#preparing-geth}

设置好数据库后，我们需要在 Geth 中启用指标收集。 留意 `geth - help` 中的 `METRICS AND STATS OPTIONS`。 此处可以找到多个选项，在此例中，我们希望 Geth 将数据推送到 InfluxDB。 基本设置指定了端点，可以通过它访问 InfluxDB 并进行数据库身份验证。

```
geth --metrics --metrics.influxdb --metrics.influxdb.endpoint "http://0.0.0.0:8086" --metrics.influxdb.username "geth" --metrics.influxdb.password "chosenpassword"
```

此标记可以附加到启动客户端的命令或保存到配置文件中。

您可以通过在数据库中列出指标来验证 Geth 是否成功推送了数据。 在 InfluxDB 命令行中:

```
use geth
show measurements
```

## 设置 Grafana {#setting-up-grafana}

下一步是安装 Grafana，后者通过图形解释数据。 按照 Grafana 文档中针对您安装环境的安装过程操作。 如果不想安装其他版本，确保安装 OSS 版本。 下面是通过资源库安装 发行版本的示例安装步骤：

```
curl -tlsv1.3 --proto =https -sL https://packages.grafana.com/gpg.key | sudo apt-key add -
echo "deb https://packages.grafana.com/oss/deb stable main" | sudo tee -a /etc/apt/sources.list.d/grafana.list
sudo apt update
sudo apt install grafana
sudo systemctl enable grafana-server
sudo systemctl start grafana-server
```

在 Grafana 开始运行后，应该能够在 `localhost:3000` 访问它。 使用您喜欢的浏览器访问此路径，然后用默认凭据登录（用户：`admin` 和密码：`admin`）。 当提示时，更改默认密码并保存。

![](./grafana1.png)

您将被重定向到 Grafana 主页。 首先，设置您的源数据。 点击左边栏中的配置图标并选择“Data sources”。

![](./grafana2.png)

现在尚未创建任何数据源，点击“Add data source”定义一个数据源。

![](./grafana3.png)

在本次设置中，请选择“InfluxDB”并继续操作。

![](./grafana4.png)

如果您在同台一机器上运行工具，数据源配置就相当简单。 您需要设置 InfluxDB 地址和详细信息，以便访问数据库。 请参考下图。

![](./grafana5.png)

如果所有操作都已完成并且 InfluxDB 可以访问，请点击“Save and test”，等待确认信息弹出。

![](./grafana6.png)

现在 Grafana 设置为读取 InfluxDB 中的数据。 此时，您需要创建一个解释和显示数据的仪表板。 仪表板属性是在 JSON 文件中编码的，可让任何人创建并轻松导入。 在左侧栏上，点击“Create and Import”。

![](./grafana7.png)

要创建 Geth 监测仪表板，复制[此仪表板](https://grafana.com/grafana/dashboards/13877/)的 ID 并粘贴到 Grafana 的“导入页面”中。 保存仪表板后，其外观应该如下所示：

![](./grafana8.png)

您可以修改您的仪表板。 每个面板都可以编辑、移动、删除或添加。 您可以更改您的配置。 一切由您决定！ 要了解有关仪表板工作原理的更多信息，请参阅 [Grafana 文档](https://grafana.com/docs/grafana/latest/dashboards/)。 您也可能对[警报](https://grafana.com/docs/grafana/latest/alerting/)感兴趣。 这可以让您设置在指标达到特定值时的提醒通知。 支持各种交流渠道。
