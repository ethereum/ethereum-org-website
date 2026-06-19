---
title: InfluxDBとGrafanaを使用したGethの監視
description: InfluxDBとGrafanaを使用してGethノードの監視を設定し、パフォーマンスを追跡して問題を特定します。
author: "マリオ・ハベル"
tags:
  - クライアント
  - ノード
skill: intermediate
breadcrumb: Gethの監視
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

- [Prometheus](https://prometheus.io/)（プルモデル）
- [InfluxDB](https://www.influxdata.com/get-influxdb/)（プッシュモデル）
- [Telegraf](https://www.influxdata.com/get-influxdb/)
- [Grafana](https://www.grafana.com/)
- [Datadog](https://www.datadoghq.com/)
- [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/)

また、InfluxDBとGrafanaが事前設定されたオプションである[Geth Prometheus Exporter](https://github.com/hunterlong/gethexporter)もあります。

このチュートリアルでは、GethクライアントがInfluxDBにデータをプッシュしてデータベースを作成し、Grafanaでデータのグラフ視覚化を作成するように設定します。手動で行うことで、プロセスをよりよく理解し、変更を加えたり、さまざまな環境にデプロイしたりするのに役立ちます。

## InfluxDBの設定 {#setting-up-influxdb}

まず、InfluxDBをダウンロードしてインストールしましょう。さまざまなダウンロードオプションは、[Influxdataのリリースぺージ](https://portal.influxdata.com/downloads/)にあります。環境に合ったものを選択してください。
[リポジトリ](https://repos.influxdata.com/)からインストールすることもできます。たとえば、Debianベースのディストリビューションの場合：

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

InfluxDBを正常にインストールしたら、バックグラウンドで実行されていることを確認します。デフォルトでは、`localhost:8086`でアクセスできます。
`influx`クライアントを使用する前に、管理者権限を持つ新しいユーザーを作成する必要があります。このユーザーは、データベースやユーザーの作成など、高レベルの管理に使用されます。

```
curl -XPOST "http://localhost:8086/query" --data-urlencode "q=CREATE USER username WITH PASSWORD 'password' WITH ALL PRIVILEGES"
```

これで、influxクライアントを使用して、このユーザーで[InfluxDBシェル](https://docs.influxdata.com/influxdb/v1.8/tools/shell/)に入ることができます。

```
influx -username 'username' -password 'password'
```

シェルでInfluxDBと直接通信することで、Gethメトリクス用のデータベースとユーザーを作成できます。

```
create database geth
create user geth with password choosepassword
```

作成されたエントリを以下で確認します：

```
show databases
show users
```

InfluxDBシェルを終了します。

```
exit
```

InfluxDBが実行され、Gethからのメトリクスを保存するように設定されました。

## Gethの準備 {#preparing-geth}

データベースを設定した後、Gethでメトリクス収集を有効にする必要があります。`geth --help`の`METRICS AND STATS OPTIONS`に注意してください。そこには複数のオプションがありますが、この場合はGethがInfluxDBにデータをプッシュするようにします。
基本的な設定では、InfluxDBにアクセスできるエンドポイントとデータベースの認証を指定します。

```
geth --metrics --metrics.influxdb --metrics.influxdb.endpoint "http://0.0.0.0:8086" --metrics.influxdb.username "geth" --metrics.influxdb.password "chosenpassword"
```

これらのフラグは、クライアントを起動するコマンドに追加するか、設定ファイルに保存できます。

たとえば、データベース内のメトリクスを一覧表示することで、Gethが正常にデータをプッシュしていることを確認できます。InfluxDBシェルで以下を実行します：

```
use geth
show measurements
```

## Grafanaの設定 {#setting-up-grafana}

次のステップは、データをグラフィカルに解釈するGrafanaのインストールです。Grafanaのドキュメントにある環境ごとのインストール手順に従ってください。特に希望がない場合は、OSSバージョンをインストールするようにしてください。
リポジトリを使用したDebianディストリビューションのインストール手順の例：

```
curl -tlsv1.3 --proto =https -sL https://packages.grafana.com/gpg.key | sudo apt-key add -
echo "deb https://packages.grafana.com/oss/deb stable main" | sudo tee -a /etc/apt/sources.list.d/grafana.list
sudo apt update
sudo apt install grafana
sudo systemctl enable grafana-server
sudo systemctl start grafana-server
```

Grafanaが実行されると、`localhost:3000`でアクセスできるようになります。
お好みのブラウザを使用してこのパスにアクセスし、デフォルトの認証情報（ユーザー：`admin`、パスワード：`admin`）でログインします。プロンプトが表示されたら、デフォルトのパスワードを変更して保存します。

![Grafana dashboard screenshot for Geth monitoring (panel 1)](./grafana1.png)

Grafanaのホームページにリダイレクトされます。まず、ソースデータを設定します。左側のバーにある設定アイコンをクリックし、「Data sources」を選択します。

![Grafana dashboard screenshot for Geth monitoring (panel 2)](./grafana2.png)

まだデータソースが作成されていないため、「Add data source」をクリックして定義します。

![Grafana dashboard screenshot for Geth monitoring (panel 3)](./grafana3.png)

この設定では、「InfluxDB」を選択して続行します。

![Grafana dashboard screenshot for Geth monitoring (panel 4)](./grafana4.png)

同じマシンでツールを実行している場合、データソースの設定は非常に簡単です。InfluxDBのアドレスとデータベースにアクセスするための詳細を設定する必要があります。以下の画像を参照してください。

![Grafana dashboard screenshot for Geth monitoring (panel 5)](./grafana5.png)

すべてが完了し、InfluxDBにアクセスできる場合は、「Save and test」をクリックして確認がポップアップするのを待ちます。

![Grafana dashboard screenshot for Geth monitoring (panel 6)](./grafana6.png)

これで、GrafanaがInfluxDBからデータを読み取るように設定されました。次に、データを解釈して表示するダッシュボードを作成する必要があります。ダッシュボードのプロパティはJSONファイルにエンコードされており、誰でも作成して簡単にインポートできます。左側のバーで、「Create and Import」をクリックします。

![Grafana dashboard screenshot for Geth monitoring (panel 7)](./grafana7.png)

Geth監視ダッシュボードの場合は、[このダッシュボード](https://grafana.com/grafana/dashboards/13877/)のIDをコピーし、Grafanaの「Import page」に貼り付けます。ダッシュボードを保存すると、次のようになります：

![Grafana dashboard screenshot for Geth monitoring (panel 8)](./grafana8.png)

ダッシュボードは変更できます。各パネルは編集、移動、削除、追加が可能です。設定を変更することもできます。すべてあなた次第です！ダッシュボードの仕組みについて詳しくは、[Grafanaのドキュメント](https://grafana.com/docs/grafana/latest/dashboards/)を参照してください。
[アラート](https://grafana.com/docs/grafana/latest/alerting/)にも興味があるかもしれません。これにより、メトリクスが特定の値に達したときのアラート通知を設定できます。さまざまな通信チャネルがサポートされています。