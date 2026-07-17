---
title: "使用 InfluxDB 和 Grafana 监控 Geth"
description: "使用 InfluxDB 和 Grafana 为你的 Geth 节点设置监控，以跟踪性能并识别问题。"
author: "马里奥·哈维尔"
tags:
  - 客户端
  - 节点
skill: intermediate
breadcrumb: "监控 Geth"
lang: zh
published: 2021-01-13
---

本教程将帮助你为 Geth 节点设置监控，以便你更好地了解其性能并识别潜在问题。

## 先决条件 {#prerequisites}

- 你应该已经运行了一个 Geth 实例。
- 大多数步骤和示例都适用于 Linux 环境，具备基本的终端知识会很有帮助。
- 观看此视频以了解 Geth 指标套件的概述：[Péter Szilágyi 讲解的监控以太坊基础设施](https://www.youtube.com/watch?v=cOBab8IJMYI)。

## 监控技术栈 {#monitoring-stack}

以太坊客户端会收集大量数据，这些数据可以按时间序列数据库的形式读取。为了使监控更加容易，你可以将这些数据输入到数据可视化软件中。有多种可用选项：

- [Prometheus](https://prometheus.io/)（拉取模型）
- [InfluxDB](https://www.influxdata.com/get-influxdb/)（推送模型）
- [Telegraf](https://www.influxdata.com/get-influxdb/)
- [Grafana](https://www.grafana.com/)
- [Datadog](https://www.datadoghq.com/)
- [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/)

此外还有 [Geth Prometheus Exporter](https://github.com/hunterlong/gethexporter)，这是一个预先配置了 InfluxDB 和 Grafana 的选项。

在本教程中，我们将设置你的 Geth 客户端将数据推送到 InfluxDB 以创建数据库，并使用 Grafana 创建数据的图形可视化。手动执行此操作将帮助你更好地理解该过程、对其进行修改并在不同环境中部署。

## 设置 InfluxDB {#setting-up-influxdb}

首先，让我们下载并安装 InfluxDB。可以在 [Influxdata 发布页面](https://portal.influxdata.com/downloads/)找到各种下载选项。选择适合你环境的选项。
你也可以从[代码库](https://repos.influxdata.com/)安装它。例如，在基于 Debian 的发行版中：

成功安装 InfluxDB 后，确保它在后台运行。默认情况下，可以通过 `localhost:8086` 访问它。
在使用 `influx` 客户端之前，你必须创建一个具有管理员权限的新用户。该用户将用于高级管理、创建数据库和用户。

现在你可以使用 influx 客户端以该用户身份进入 [InfluxDB shell](https://docs.influxdata.com/influxdb/v1.8/tools/shell/)。

直接在其 shell 中与 InfluxDB 通信，你可以为 Geth 指标创建数据库和用户。

使用以下命令验证创建的条目：

退出 InfluxDB shell。

InfluxDB 正在运行并已配置为存储来自 Geth 的指标。

## 准备 Geth {#preparing-geth}

设置好数据库后，我们需要在 Geth 中启用指标收集。请注意 `geth --help` 中的 `METRICS AND STATS OPTIONS`。那里可以找到多个选项，在这种情况下，我们希望 Geth 将数据推送到 InfluxDB。
基本设置指定了可访问 InfluxDB 的端点以及数据库的身份验证。

这些标志可以附加到启动客户端的命令中，也可以保存到配置文件中。

你可以验证 Geth 是否成功推送数据，例如通过列出数据库中的指标。在 InfluxDB shell 中：

## 设置 Grafana {#setting-up-grafana}

下一步是安装 Grafana，它将以图形方式解释数据。请按照 Grafana 文档中针对你环境的安装过程进行操作。除非你有其他需求，否则请确保安装 OSS 版本。
使用代码库在 Debian 发行版上的示例安装步骤：

当 Grafana 运行后，应该可以通过 `localhost:3000` 访问它。
使用你喜欢的浏览器访问此路径，然后使用默认凭据（用户：`admin`，密码：`admin`）登录。出现提示时，更改默认密码并保存。

![Grafana dashboard screenshot for Geth monitoring (panel 1)](./grafana1.png)

你将被重定向到 Grafana 主页。首先，设置你的源数据。点击左侧栏中的配置图标，然后选择“Data sources”（数据源）。

![Grafana dashboard screenshot for Geth monitoring (panel 2)](./grafana2.png)

目前还没有创建任何数据源，点击“Add data source”（添加数据源）来定义一个。

![Grafana dashboard screenshot for Geth monitoring (panel 3)](./grafana3.png)

对于此设置，选择“InfluxDB”并继续。

![Grafana dashboard screenshot for Geth monitoring (panel 4)](./grafana4.png)

如果你在同一台机器上运行这些工具，数据源配置非常简单。你需要设置 InfluxDB 地址和访问数据库的详细信息。请参考下图。

![Grafana dashboard screenshot for Geth monitoring (panel 5)](./grafana5.png)

如果一切完成且 InfluxDB 可访问，点击“Save and test”（保存并测试），然后等待确认弹出。

![Grafana dashboard screenshot for Geth monitoring (panel 6)](./grafana6.png)

Grafana 现在已设置为从 InfluxDB 读取数据。现在你需要创建一个仪表板来解释和显示这些数据。仪表板属性编码在 JSON 文件中，任何人都可以创建并轻松导入。在左侧栏上，点击“Create and Import”（创建并导入）。

![Grafana dashboard screenshot for Geth monitoring (panel 7)](./grafana7.png)

对于 Geth 监控仪表板，复制[此仪表板](https://grafana.com/grafana/dashboards/13877/)的 ID，并将其粘贴到 Grafana 的“Import”（导入）页面中。保存仪表板后，它应该如下所示：

![Grafana dashboard screenshot for Geth monitoring (panel 8)](./grafana8.png)

你可以修改你的仪表板。每个面板都可以编辑、移动、删除或添加。你可以更改配置。这完全取决于你！要了解有关仪表板工作原理的更多信息，请参阅 [Grafana 文档](https://grafana.com/docs/grafana/latest/dashboards/)。
你可能还对[警报](https://grafana.com/docs/grafana/latest/alerting/)感兴趣。这允许你在指标达到特定值时设置警报通知。支持各种通信渠道。