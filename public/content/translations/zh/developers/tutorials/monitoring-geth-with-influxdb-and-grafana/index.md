---
title: "使用 InfluxDB 和 Grafana 监控 Geth"
description: "使用 InfluxDB 和 Grafana 为你的 Geth 节点设置监控，以跟踪性能并识别问题。"
author: "Mario Havel"
tags: [ "客户端", "节点" ]
skill: intermediate
lang: zh
published: 2021-01-13
---

本教程将帮助你为你的 Geth 节点设置监控，以便更好地了解其性能并发现潜在问题。

## 前提条件 {#prerequisites}

- 你应该已经运行一个 Geth 实例。
- 大部分步骤和示例都针对 linux 环境，基础的终端知识会有所帮助。
- 请观看这段关于 Geth 指标集的概览视频：[监测以太坊基础设施（作者 Péter Szilágyi）](https://www.youtube.com/watch?v=cOBab8IJMYI)。

## 监控堆栈 {#monitoring-stack}

以太坊客户端收集大量数据，可以通过时序数据库读取这些数据。 为了便于监控，你可以将数据输入数据可视化软件。 有多种可用选项：

- [Prometheus](https://prometheus.io/)（拉取模型）
- [InfluxDB](https://www.influxdata.com/get-influxdb/)（推送模型）
- [Telegraf](https://www.influxdata.com/get-influxdb/)
- [Grafana](https://www.grafana.com/)
- [Datadog](https://www.datadoghq.com/)
- [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/)

还可以选择 [Geth Prometheus Exporter](https://github.com/hunterlong/gethexporter)，它是一个用 InfluxDB 和 Grafana 预先配置的选项。

在本教程中，我们将设置你的 Geth 客户端，将数据推送到 InfluxDB 以创建数据库，并设置 Grafana 来对数据进行图形可视化。 手动操作将帮助你更好地理解这一过程，你可以加以改动，并在不同的环境中部署。

## 设置 InfluxDB {#setting-up-influxdb}

首先，我们来下载并安装 InfluxDB。 可以在 [Influxdata 发布页面](https://portal.influxdata.com/downloads/)找到各种下载选项。 选择适合你环境的版本。
你也可以从[资源库](https://repos.influxdata.com/)安装。 例如，在基于 Debian 的发行版中：

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

成功安装 InfluxDB 后，请确保它正在后台运行。 默认情况下，可以通过 `localhost:8086` 访问它。
在使用 `influx` 客户端之前，你必须创建一个拥有管理员权限的新用户。 此用户将用于高级别管理，例如创建数据库和用户。

```
curl -XPOST "http://localhost:8086/query" --data-urlencode "q=CREATE USER username WITH PASSWORD 'password' WITH ALL PRIVILEGES"
```

现在你可以用此用户通过 influx 客户端进入 [InfluxDB 命令行](https://docs.influxdata.com/influxdb/v1.8/tools/shell/)。

```
influx -username 'username' -password 'password'
```

在其命令行中与 InfluxDB 直接通信，你可以为 geth 指标创建数据库和用户。

```
create database geth
create user geth with password choosepassword
```

使用以下命令验证创建的条目：

```
show databases
show users
```

退出 InfluxDB 命令行。

```
exit
```

InfluxDB 正在运行，并已配置为存储来自 Geth 的指标。

## 准备 Geth {#preparing-geth}

设置好数据库后，我们需要在 Geth 中启用指标收集功能。 请注意 `geth --help` 中的 `METRICS AND STATS OPTIONS`。 那里有多个选项，在本例中，我们希望 Geth 将数据推送到 InfluxDB。
基本设置指定了 InfluxDB 的可访问端点以及数据库的身份验证信息。

```
geth --metrics --metrics.influxdb --metrics.influxdb.endpoint "http://0.0.0.0:8086" --metrics.influxdb.username "geth" --metrics.influxdb.password "chosenpassword"
```

这些标志可以附加到启动客户端的命令中，或保存到配置文件中。

你可以通过在数据库中列出指标等方式，验证 Geth 是否正在成功推送数据。 在 InfluxDB 命令行中：

```
use geth
show measurements
```

## 设置 Grafana {#setting-up-grafana}

下一步是安装 Grafana，它将以图形方式解译数据。 请遵照 Grafana 文档中适用于你的环境的安装流程进行操作。 若无其他特殊需求，请确保安装 OSS 版本。
使用资源库为 Debian 发行版安装的示例步骤：

```
curl -tlsv1.3 --proto =https -sL https://packages.grafana.com/gpg.key | sudo apt-key add -
echo "deb https://packages.grafana.com/oss/deb stable main" | sudo tee -a /etc/apt/sources.list.d/grafana.list
sudo apt update
sudo apt install grafana
sudo systemctl enable grafana-server
sudo systemctl start grafana-server
```

Grafana 运行后，应该可以通过 `localhost:3000` 访问。
使用你偏好的浏览器访问此路径，然后使用默认凭据（用户：`admin`，密码：`admin`）登录。 出现提示时，请更改默认密码并保存。

![](./grafana1.png)

你将被重定向到 Grafana 主页。 首先，设置你的数据源。 点击左侧栏的配置图标，然后选择“Data sources”。

![](./grafana2.png)

目前还没有创建任何数据源，点击“添加数据源”来定义一个。

![](./grafana3.png)

对于此设置，选择“InfluxDB”并继续。

![](./grafana4.png)

如果你在同一台机器上运行这些工具，数据源配置会非常简单。 你需要设置 InfluxDB 地址和用于访问数据库的详细信息。 请参考下图。

![](./grafana5.png)

如果一切都已完成且 InfluxDB 可访问，请点击“保存并测试”，然后等待确认信息弹出。

![](./grafana6.png)

Grafana 现已设置为从 InfluxDB 读取数据。 现在，你需要创建一个仪表板来解译和显示数据。 仪表板属性在 JSON 文件中编码，任何人都可以创建并轻松导入。 在左侧栏上，点击“创建和导入”。

![](./grafana7.png)

对于 Geth 监控仪表板，请复制[此仪表板](https://grafana.com/grafana/dashboards/13877/)的 ID，并将其粘贴到 Grafana 的“导入页面”中。 保存仪表板后，它应如下所示：

![](./grafana8.png)

你可以修改你的仪表板。 每个面板都可以编辑、移动、移除或添加。 你可以更改你的配置。 一切由你决定！ 要详细了解仪表板的工作原理，请参阅 [Grafana 的文档](https://grafana.com/docs/grafana/latest/dashboards/)。
你可能还对[警报](https://grafana.com/docs/grafana/latest/alerting/)感兴趣。 这使你可以设置当指标达到特定值时的警报通知。 支持多种通信渠道。
