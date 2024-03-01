---
title: InfluxDBとGrafanaを使って、Gethを監視する
description:
author: "Mario Havel"
tags:
  - "クライアント"
  - "Geth"
  - "ノード"
skill: intermediate
lang: ja
published: 2021-01-13
---

このチュートリアルでは、Geth ノードのモニタリングを設定する方法について説明します。これにより、モニタリングのパフォーマンスについて理解を深め、どのような問題が発生しうるかを理解することができます。

## 事前に必要な環境 {#prerequisites}

- Geth のインスタンスを実行していること。
- 大部分の作業ステップ／具体例は Linux を用いていますので、基本的なターミナルの知識が必要でしょう。
- Geth における一連のモニタリング指標については、以下の動画を参考にしてください：[イーサリアムのインフラをモニタリングする（Péter Szilágyi）](https://www.youtube.com/watch?v=cOBab8IJMYI)。

## モニタリング用のスタック {#monitoring-stack}

イーサリアムのクライアントは、時系列データベースの形式で読み取り可能な多くのデータを収集します。 このデータをデータ可視化ソフトウェアにフィードすることで、モニタリング作業を容易にすることができます。 利用できるデータ可視化ソフトウェアには、以下があります：

- [Prometheus](https://prometheus.io/) （プル型）
- [InfluxDB](https://www.influxdata.com/get-influxdb/)（プッシュ型）
- [Telegraf](https://www.influxdata.com/get-influxdb/)
- [Grafana](https://www.grafana.com/)
- [Datadog](https://www.datadoghq.com/)
- [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/)

さらに、[Geth Prometheus Exporter](https://github.com/hunterlong/gethexporter)がありますが、これは InfluxDB および Grafana 上ですでに設定済みのオプションです。 Docker ならびに RPi 4 向けの[Ethbian OS](https://ethbian.org/index.html)を使用すれば、簡単に設定することができます。

このチュートリアルでは、InfluxDB にデータをプッシュするように Geth クライアントを設定し、さらに、Grafana がこのデータをグラフ化するように設定します。 この設定を手動で行うことで、設定プロセスについての理解を深めることができ、設定を変更したり、異なる環境でデプロイする方法を学ぶことができます。

## InfluxDB を設定する {#setting-up-influxdb}

まず、InfluxDB をダウンロードしてインストールします。 [Influxdata のリリースページ](https://portal.influxdata.com/downloads/)では、さまざまなダウンロードのオプションが提供されています。 あなたの環境に合わせて選択してください。 また、[リポジトリ](https://repos.influxdata.com/)からインストールすることもできます。 例えば、Debian ベースのディストリビューションの場合、以下のように実行します：

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

InfluxDB を正常にインストールしたら、バックグラウンドで実行されていることを確認してください。 デフォルトでは、`localhost:8086`からアクセス可能です。 `influx`クライアントを使用する前に、管理者権限を持つ新規ユーザーを作成する必要があります。 管理者ユーザーは、データベースおよびユーザーを作成し、高レベルの管理を行うユーザーです。

```
curl -XPOST "http://localhost:8086/query" --data-urlencode "q=CREATE USER username WITH PASSWORD 'password' WITH ALL PRIVILEGES"
```

管理者ユーザーを作成すると、Influx クライアントから、[InfluxDB シェル](https://docs.influxdata.com/influxdb/v1.8/tools/shell/)にアクセスできるようになります。

```
influx -username 'username' -password 'password'
```

このシェルから InfluxDB と直接やりとりを行うことで、データベースとユーザーを作成し、Geth のモニタリング指標を取得することができます。

```
create database geth
create user geth with password choosepassword
```

作成したデータベース／ユーザーを、以下で確認します：

```
show databases
show users
```

InfluxDB シェルを終了します。

```
exit
```

InfluxDB はバックグラウンドで実行しており、Geth から送信される数値を保存するように設定されています。

## Geth 側の設定 {#preparing-geth}

データベースを設定したら、Geth 上でのデータ収集を有効化する必要があります。 geth-help の`geth --help`の`METRICS AND STATS OPTIONS`を確認してください。 複数のオプションが提供されていますが、ここでは、Geth が InfluxDB にデータをプッシュするように設定する必要があります。 基本的な設定では、InfluxDB がリーチ可能なエンドポイントと、当該データベースに対する認証について設定します。

```
geth --metrics --metrics.influxdb --metrics.influxdb.endpoint "http://0.0.0.0:8086" --metrics.influxdb.username "geth" --metrics.influxdb.password "chosenpassword"
```

このフラグは、クライアントを起動するコマンドに追加するか、設定ファイル上で保存することが可能です。

データベースに含まれる数値をリストアップするなどの方法で、Geth が実際にデータをプッシュしているかどうかを確認できます。 InfluxDB のシェルで、以下を入力してください：

```
use geth
show measurements
```

## Grafana を設定する {#setting-up-grafana}

次に、データをグラフィック表示するために Grafana をインストールします。 Grafana のドキュメンテーションを参照して、お使いの環境におけるインストール作業を実行してください。 特別な理由がない限り、OSS バージョンをインストールしてください。 レポジトリを利用して Debian のディストリビューションをインストールするステップは、以下の通りです：

```
curl -tlsv1.3 --proto =https -sL https://packages.grafana.com/gpg.key | sudo apt-key add -
echo "deb https://packages.grafana.com/oss/deb stable main" | sudo tee -a /etc/apt/sources.list.d/grafana.list
sudo apt update
sudo apt install grafana
sudo systemctl enable grafana-server
sudo systemctl start grafana-server
```

Grafana が実行されている場合、`localhost:3000`でアクセスできるはずです。 お好みのブラウザからこのパスにアクセスして、デフォルトの認証情報（ユーザー：`admin`、パスワード：`admin`）でログインします。 プロンプトが表示されたら、デフォルトのパスワードを変更して保存してください。

![](./grafana1.png)

Grafana のホームページに転送されます。 まず、ソースデータを設定します。 左のバーにある Configuration アイコンをクリックし、「Data sources」を選択します。

![](./grafana2.png)

データソースを作成していないので、「Add data source」をクリックしてデータソースを定義します。

![](./grafana3.png)

今回の設定では、「InfluxDB」を選択して、次に進みます。

![](./grafana4.png)

同一のマシンでツールを実行している場合、データソースの設定は非常に簡単です。 データベースにアクセスするには、InfluxDB のアドレスと詳細を設定する必要があります。 以下の画像を参照してください。

![](./grafana5.png)

設定が完了し、InfluxDB がアクセス可能になったら、「Save and test」をクリックして、確認のポップアップ画面が表示されるまで待ってください。

![](./grafana6.png)

Grafana の設定が完了し、InfluxDB のデータを読み込めるようになりました。 次に、データを分析して表示するダッシュボードを作成します。 ダッシュボードの属性は JSON ファイルでエンコードされますので、誰でも簡単に作成し、インポートすることが可能です。 左のバーで、「Create and Import」をクリックしてください。

![](./grafana7.png)

Geth のモニタリング用ダッシュボードの場合、[このダッシュボード](https://grafana.com/grafana/dashboards/13877/)の ID をコピーして、Grafana の「Import page」にペーストしてください。 ダッシュボードを保存すると、以下のような状態になっているはずです：

![](./grafana8.png)

ダッシュボードの表示は変更可能です。 各パネルは、編集、移動、削除、追加が可能です。 各自の好みに合わせて、ダッシュボードの設定を変更してください。 あなた次第です！ ダッシュボードの詳細な仕組みについては、 [Grafana のドキュメンテーション](https://grafana.com/docs/grafana/latest/dashboards/)を参照してください。 また、[アラート機能](https://grafana.com/docs/grafana/latest/alerting/)も参照するとよいでしょう。 これは、各指標において一定の値に達した場合、アラート通知を受け取るように設定するものです。 アラート通知は、様々な通信チャネルに対応しています。
