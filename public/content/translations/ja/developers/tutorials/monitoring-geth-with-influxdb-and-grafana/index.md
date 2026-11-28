---
title: "InfluxDBとGrafanaを使用したGethの監視"
description: "InfluxDBとGrafanaを使用してGethノードの監視を設定し、パフォーマンスを追跡して問題を特定します。"
author: "マリオ・ハベル"
tags:
  - クライアント
  - ノード
skill: intermediate
breadcrumb: "Gethの監視"
lang: ja
published: 2021-01-13
---

このチュートリアルは、Gethノードの監視を設定し、そのパフォーマンスをよりよく理解し、潜在的な問題を特定するのに役立ちます。

## 前提条件 {#prerequisites}

- すでにGethのインスタンスを実行している必要があります。
- ほとんどの手順と例はLinux環境向けであるため、ターミナルの基本的な知識が役立ちます。
- Gethのメトリクススイートの概要については、こちらの動画をご覧ください：[Péter Szilágyiによるイーサリアムインフラストラクチャの監視](https://www.youtube.com/watch?v=cOBab8IJMYI)。

## 監視スタック {#monitoring-stack}

イーサリアムクライアントは、時系列データベースの形式で読み取ることができる大量のデータを収集します。監視を容易にするために、これをデータ視覚化ソフトウェアに入力できます。利用可能なオプションは複数あります：

- [Prometheus](https://prometheus.io/) (プルモデル)
- [InfluxDB](https://www.influxdata.com/get-influxdb/) (プッシュモデル)
- [Telegraf](https://www.influxdata.com/time-series-platform/telegraf/)
- [Grafana](https://www.grafana.com/)
- [Datadog](https://www.datadoghq.com/)
- [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/)

Prometheusを好む場合、GethはPrometheus形式でメトリクスを公開することもできます。`--metrics --metrics.addr 127.0.0.1` を使用してGethを起動し、Prometheusを `http://127.0.0.1:6060/debug/metrics/prometheus` に向けます。

このチュートリアルでは、Gethクライアントを設定してInfluxDBにデータをプッシュしてデータベースを作成し、Grafanaを使用してデータのグラフ視覚化を作成します。手動で行うことで、プロセスをよりよく理解し、変更を加え、さまざまな環境にデプロイするのに役立ちます。

## InfluxDBの設定 {#setting-up-influxdb}

まず、InfluxDBをダウンロードしてインストールしましょう。このチュートリアルでは、Gethが以下の `--metrics.influxdb` フラグでサポートしているInfluxDB 1.x (OSS) を使用します。新しいInfluxDBバージョンでは、データベースとユーザーの代わりに、組織、バケット、トークンを使用した異なる設定が使用されます。Gethは `--metrics.influxdbv2` フラグでInfluxDB 2.xをサポートしていますが、このチュートリアルの設定手順は1.xにのみ適用されます。

環境に合わせて [InfluxDB 1.xのインストール手順](https://docs.influxdata.com/influxdb/v1/introduction/install/) に従ってください。たとえば、DebianやUbuntuでは、InfluxDataリポジトリからインストールできます。鍵を信頼する前に、インストール手順で現在の署名鍵のフィンガープリントを確認してください：

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

`influxdb` パッケージには、`influx` コマンドラインクライアントが含まれています。

InfluxDBを正常にインストールしたら、バックグラウンドで実行されていることを確認します。デフォルトでは、`localhost:8086` でアクセスできます。
`influx` クライアントを使用する前に、管理者権限を持つ新しいユーザーを作成する必要があります。このユーザーは、データベースやユーザーの作成など、高レベルの管理に使用されます。

```sh
curl -XPOST "http://localhost:8086/query" --data-urlencode "q=CREATE USER username WITH PASSWORD 'password' WITH ALL PRIVILEGES"
```

これで、influxクライアントを使用して、このユーザーで [InfluxDBシェル](https://docs.influxdata.com/influxdb/v1/tools/shell/) に入ることができます。

```sh
influx -username 'username' -password 'password'
```

シェルでInfluxDBと直接通信することで、Gethメトリクス用のデータベースとユーザーを作成できます。

```sql
create database geth
create user geth with password '<geth-password>'
```

作成されたエントリを以下で確認します：

```sql
show databases
show users
```

InfluxDBシェルを終了します。

```
exit
```

InfluxDBが実行され、Gethからのメトリクスを保存するように設定されました。

## Gethの準備 {#preparing-geth}

データベースを設定した後、Gethでメトリクス収集を有効にする必要があります。`geth --help` の `METRICS AND STATS OPTIONS` に注意してください。そこには複数のオプションがありますが、この場合、GethがInfluxDBにデータをプッシュするようにします。
基本的な設定では、InfluxDBにアクセスできるエンドポイントとデータベースの認証を指定します。

```sh
geth --metrics --metrics.influxdb --metrics.influxdb.endpoint "http://127.0.0.1:8086" --metrics.influxdb.database "geth" --metrics.influxdb.username "geth" --metrics.influxdb.password "<geth-password>"
```

`geth` ユーザーを作成したときに設定したのと同じパスワードを使用します。これらのフラグは、クライアントを起動するコマンドに追加するか、設定ファイルに保存できます。

たとえば、データベース内のメトリクスを一覧表示することで、Gethが正常にデータをプッシュしていることを確認できます。InfluxDBシェルで：

```sql
use geth
show measurements
```

## Grafanaの設定 {#setting-up-grafana}

次のステップは、データをグラフィカルに解釈するGrafanaのインストールです。Grafanaドキュメントの [環境に合わせたインストールプロセス](https://grafana.com/docs/grafana/latest/setup-grafana/installation/) に従ってください。特別な理由がない限り、OSSバージョンをインストールしてください。
Grafanaリポジトリを使用したDebianまたはUbuntuのインストール手順の例：

```sh
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://apt.grafana.com/gpg.key | gpg --dearmor | sudo tee /etc/apt/keyrings/grafana.gpg > /dev/null
echo "deb [signed-by=/etc/apt/keyrings/grafana.gpg] https://apt.grafana.com stable main" | sudo tee /etc/apt/sources.list.d/grafana.list
sudo apt update
sudo apt install grafana
sudo systemctl enable grafana-server
sudo systemctl start grafana-server
```

Grafanaが実行されると、`localhost:3000` でアクセスできるようになります。
お好みのブラウザを使用してこのパスにアクセスし、デフォルトの認証情報 (ユーザー: `admin`、パスワード: `admin`) でログインします。プロンプトが表示されたら、デフォルトのパスワードを変更して保存します。

![Geth監視用のGrafanaダッシュボードのスクリーンショット (パネル1)](./grafana1.png)

Grafanaのホームページにリダイレクトされます。まず、ソースデータを設定します。メニューを開き、**Connections > Data sources** を選択します。このチュートリアルのスクリーンショットは古いバージョンのGrafanaのものであるため、画面が少し異なる場合があります。

![Geth監視用のGrafanaダッシュボードのスクリーンショット (パネル2)](./grafana2.png)

まだデータソースが作成されていないため、「Add data source」をクリックして定義します。

![Geth監視用のGrafanaダッシュボードのスクリーンショット (パネル3)](./grafana3.png)

この設定では、「InfluxDB」を選択して続行します。

![Geth監視用のGrafanaダッシュボードのスクリーンショット (パネル4)](./grafana4.png)

同じマシンでツールを実行している場合、データソースの設定は非常に簡単です。InfluxDBのアドレスとデータベースにアクセスするための詳細を設定する必要があります。以下の画像を参照してください。

![Geth監視用のGrafanaダッシュボードのスクリーンショット (パネル5)](./grafana5.png)

すべてが完了し、InfluxDBにアクセスできる場合は、「Save and test」をクリックして確認がポップアップするのを待ちます。

![Geth監視用のGrafanaダッシュボードのスクリーンショット (パネル6)](./grafana6.png)

これで、GrafanaがInfluxDBからデータを読み取るように設定されました。次に、データを解釈して表示するダッシュボードを作成する必要があります。ダッシュボードのプロパティはJSONファイルにエンコードされており、誰でも作成して簡単にインポートできます。メニューを開いて **Dashboards** を選択し、**New > Import** をクリックします。

![Geth監視用のGrafanaダッシュボードのスクリーンショット (パネル7)](./grafana7.png)

Geth監視ダッシュボードの場合、[このダッシュボード](https://grafana.com/grafana/dashboards/13877/) のIDをコピーし、Grafanaの「Import page」に貼り付けます。ダッシュボードを保存すると、次のようになります：

![Geth監視用のGrafanaダッシュボードのスクリーンショット (パネル8)](./grafana8.png)

ダッシュボードは変更できます。各パネルは編集、移動、削除、または追加できます。設定を変更することもできます。すべてあなた次第です！ダッシュボードの仕組みについて詳しくは、[Grafanaのドキュメント](https://grafana.com/docs/grafana/latest/dashboards/) を参照してください。
[アラート](https://grafana.com/docs/grafana/latest/alerting/) にも興味があるかもしれません。これにより、メトリクスが特定の値に達したときのアラート通知を設定できます。さまざまな通信チャネルがサポートされています。
