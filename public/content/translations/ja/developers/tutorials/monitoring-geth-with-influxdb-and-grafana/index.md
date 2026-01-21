---
title: InfluxDBとGrafanaを使ったGethの監視
description: InfluxDBとGrafanaを使用してGethノードの監視を設定し、パフォーマンスを追跡して問題を特定します。
author: "Mario Havel"
tags: [ "クライアント", "ノード" ]
skill: intermediate
lang: ja
published: 2021-01-13
---

このチュートリアルでは、Gethノードの監視を設定することで、パフォーマンスをよりよく理解し、潜在的な問題を特定する方法を説明します。

## 前提条件{#prerequisites}

- Gethのインスタンスがすでに実行されている必要があります。
- 手順と例のほとんどはLinux環境向けであり、ターミナルの基本的な知識があると役立ちます。
- Gethの一連のメトリクスの概要については、こちらの動画をご覧ください: [Péter Szilágyi氏によるイーサリアムインフラストラクチャの監視](https://www.youtube.com/watch?v=cOBab8IJMYI)。

## 監視スタック {#monitoring-stack}

イーサリアムクライアントは、時系列データベースの形式で読み取り可能な多くのデータを収集します。 監視を容易にするため、このデータをデータ可視化ソフトウェアに入力することができます。 利用可能なオプションは複数あります:

- [Prometheus](https://prometheus.io/) (プルモデル)
- [InfluxDB](https://www.influxdata.com/get-influxdb/) (プッシュモデル)
- [Telegraf](https://www.influxdata.com/get-influxdb/)
- [Grafana](https://www.grafana.com/)
- [Datadog](https://www.datadoghq.com/)
- [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/)

また、InfluxDBとGrafanaで事前設定されたオプションである[Geth Prometheus Exporter](https://github.com/hunterlong/gethexporter)もあります。

このチュートリアルでは、GethクライアントがInfluxDBにデータをプッシュしてデータベースを作成し、Grafanaがそのデータをグラフで可視化するように設定します。 手動で行うことで、プロセスをよりよく理解し、変更を加え、さまざまな環境にデプロイできるようになります。

## InfluxDBの設定 {#setting-up-influxdb}

まず、InfluxDBをダウンロードしてインストールします。 さまざまなダウンロードオプションは[Influxdataのリリースぺージ](https://portal.influxdata.com/downloads/)で確認できます。 あなたの環境に合わせて選択してください。
[リポジトリ](https://repos.influxdata.com/)からインストールすることもできます。 例えば、Debianベースのディストリビューションの場合は、以下のようになります:

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

InfluxDB を正常にインストールしたら、バックグラウンドで実行されていることを確認してください。 デフォルトでは、`localhost:8086`でアクセスできます。
`influx`クライアントを使用する前に、管理者権限を持つ新しいユーザーを作成する必要があります。 このユーザーは、高度な管理、データベースの作成、ユーザーの作成に使用します。

```
curl -XPOST "http://localhost:8086/query" --data-urlencode "q=CREATE USER username WITH PASSWORD 'password' WITH ALL PRIVILEGES"
```

これで、このユーザーで`influx`クライアントを使用して[InfluxDBシェル](https://docs.influxdata.com/influxdb/v1.8/tools/shell/)に入ることができます。

```
influx -username 'username' -password 'password'
```

シェル内でInfluxDBと直接通信することで、gethメトリクス用のデータベースとユーザーを作成できます。

```
create database geth
create user geth with password choosepassword
```

作成したエントリを以下で確認します:

```
show databases
show users
```

InfluxDBシェルを終了します。

```
exit
```

InfluxDBは実行中で、Gethからのメトリクスを保存するように設定されています。

## Gethの準備 {#preparing-geth}

データベースを設定したら、Gethでのメトリクス収集を有効にする必要があります。 `geth --help`の`METRICS AND STATS OPTIONS`に注意してください。 そこには複数のオプションがありますが、このケースではGethがInfluxDBにデータをプッシュするようにします。
基本設定では、InfluxDBがアクセスできるエンドポイントと、データベースの認証を指定します。

```
geth --metrics --metrics.influxdb --metrics.influxdb.endpoint "http://0.0.0.0:8086" --metrics.influxdb.username "geth" --metrics.influxdb.password "chosenpassword"
```

これらのフラグは、クライアントを起動するコマンドに追加するか、設定ファイルに保存できます。

例えば、データベース内のメトリクスを一覧表示することで、Gethが正常にデータをプッシュしていることを確認できます。 InfluxDBのシェルで、以下を入力してください:

```
use geth
show measurements
```

## Grafanaの設定 {#setting-up-grafana}

次に、データをグラフィック表示するためにGrafanaをインストールします。 Grafanaのドキュメントで、お使いの環境に合わせたインストールプロセスに従ってください。 特別な理由がない限り、OSSバージョンをインストールしてください。
リポジトリを使用したDebianディストリビューションへのインストール手順の例:

```
curl -tlsv1.3 --proto =https -sL https://packages.grafana.com/gpg.key | sudo apt-key add -
echo "deb https://packages.grafana.com/oss/deb stable main" | sudo tee -a /etc/apt/sources.list.d/grafana.list
sudo apt update
sudo apt install grafana
sudo systemctl enable grafana-server
sudo systemctl start grafana-server
```

Grafanaが実行されたら、`localhost:3000`でアクセスできるはずです。
お好みのブラウザでこのパスにアクセスし、デフォルトの認証情報(ユーザー: `admin`、パスワード: `admin`)でログインしてください。 プロンプトが表示されたら、デフォルトのパスワードを変更して保存してください。

![](./grafana1.png)

Grafanaのホームページに転送されます。 まず、ソースデータを設定します。 左のバーにある設定アイコンをクリックし、「Data sources」を選択します。

![](./grafana2.png)

まだデータソースは作成されていません。「Add data source」をクリックして定義します。

![](./grafana3.png)

この設定では、「InfluxDB」を選択して続行します。

![](./grafana4.png)

同じマシンでツールを実行している場合、データソースの設定は非常に簡単です。 データベースにアクセスするには、InfluxDBのアドレスと詳細を設定する必要があります。 以下の画像を参照してください。

![](./grafana5.png)

すべてが完了し、InfluxDBにアクセスできるようになったら、「Save and test」をクリックし、確認のポップアップが表示されるのを待ちます。

![](./grafana6.png)

GrafanaがInfluxDBからデータを読み取るように設定されました。 次に、データを解釈して表示するダッシュボードを作成する必要があります。 ダッシュボードのプロパティはJSONファイルにエンコードされており、誰でも簡単に作成してインポートできます。 左のバーで、「Create and Import」をクリックしてください。

![](./grafana7.png)

Gethのモニタリングダッシュボードには、[このダッシュボード](https://grafana.com/grafana/dashboards/13877/)のIDをコピーして、Grafanaの「Import page」に貼り付けてください。 ダッシュボードを保存すると、次のようになります:

![](./grafana8.png)

ダッシュボードは変更できます。 各パネルは、編集、移動、削除、追加が可能です。 設定は変更できます。 あなた次第です！ ダッシュボードの仕組みについて詳しくは、[Grafanaのドキュメント](https://grafana.com/docs/grafana/latest/dashboards/)を参照してください。
[アラート](https://grafana.com/docs/grafana/latest/alerting/)にも興味があるかもしれません。 これにより、メトリクスが特定の値に達したときにアラート通知を設定できます。 さまざまな通信チャネルがサポートされています。
