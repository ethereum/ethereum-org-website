---
title: Raspberry Pi 4でイーサリアムノードを実行する
description: Raspberry Pi 4に書き込み、イーサネットケーブル、SSDをそれぞれ接続してから電源を入れるとRaspberry Pi 4がフルイーサリアムノードとバリデータになります。
author: "EthereumOnArm"
tags: [ "クライアント", "実行レイヤー", "コンセンサスレイヤー", "ノード" ]
lang: ja
skill: intermediate
published: 2022-06-10
source: Ethereum on ARM
sourceUrl: https://ethereum-on-arm-documentation.readthedocs.io/en/latest/
---

**Ethereum on Armは、Raspberry PiをイーサリアムノードにするカスタムLinuxイメージです。**

Ethereum on Armを使用してRaspberry Piをイーサリアムノードにする場合、次のハードウェアが推奨されます。

- Raspberry 4 (モデル B 8 GB)、Odroid M1またはRock 5B (8 GB / 16 GB RAM)ボード
- マイクロSDカード(最小構成: 16 GB、クラス10)
- 最低2TBのUSB 3.0 SSD、またはUSB-SATAケース付きSSD。
- 電源
- イーサネットケーブル
- ポートフォワーディング(詳細はクライアントを参照してください)
- ヒートシンクとファンが付属しているケース
- USBキーボード、モニター、HDMIケーブル(マイクロHDMI) (オプション)

## ARM上でイーサリアムを実行する理由 {#why-run-ethereum-on-arm}

ARMボードは価格が非常に手頃で、柔軟性の高い、小型のコンピュータです。 このボードは、イーサリアムノードを実行するのに適しています。手ごろな価格で、ノードだけにリソースを使うように設定が可能であり、効率的で電力消費量が少なく、物理的にも小さいので家に置いても邪魔にならないからです。 また、ノードを立ち上げるのも簡単です。Raspberry PiのマイクロSDカードは、ビルド済みイメージを簡単に書き込めるので、ソフトウェアのダウンロードやビルドが不要です。

## 仕組み {#how-does-it-work}

ビルド済みイメージをRaspberry Piのメモリーカードに書き込みます。 このイメージには、イーサリアムノードを実行するために必要なすべてが含まれています。 この書き込まれたカードがあれば、ユーザーはRaspberry Piの電源を入れるだけで済みます。 ノードを実行するのに必要なすべてのプロセスは自動で開始します。 メモリーカードにLinuxベースのオペレーティングシステム(OS)が含まれており、その上でシステムレベルのプロセスが自動的に実行され、ARMボードがイーサリアムノードになります。

イーサリアムは、Raspberry PiのLinux OSとしてよく知られている「Raspbian」では実行できません。Raspbianは、依然として32ビットのアーキテクチャを使用しており、これによるメモリの問題が発生します。さらに、コンセンサスクライアントは、32ビットバイナリをサポートしていません。 これを克服するために、Ethereum on Armチームは、「Armbian」と呼ばれるネイティブの64ビットOSに移行しました。

**このイメージは、必要なステップのすべてを行います**。環境のセットアップ、SSDディスクのフォーマット、イーサリアムソフトウェアのインストールと実行だけでなくブロックチェーンの同期も開始します。

## 実行クライアントとコンセンサスクライアントに関する注意 {#note-on-execution-and-consensus-clients}

Ethereum on Armのイメージには、ビルド済みの実行クライアントとコンセンサスクライアントがサービスとして組み込まれています。 イーサリアムノードでは、両方のクライアントが同期されて実行される必要があります。 ユーザーがすべきことは、イメージをダウンロードして書き込んだ後、サービスを開始するだけです。 イメージには、次の実行クライアントが入っています。

- Geth
- Nethermind
- ベス

そして、以下のコンセンサスクライアント：

- Lighthouse
- Nimbus
- Prysm
- Teku

使いたい実行クライアントとコンセンサスクライアントを各1つずつ選びます。すべての実行クライアントは、すべてのコンセンサスクライアントと連携可能です。 クライアントを明示的に選択しなかった場合、ノードはデフォルトのGethとLighthouseにフォールバックし、ボードに電源を入れると自動的に実行されます。 Gethがピアを見つけて接続できるように、ルーターで30303ポートを開く必要があります。

## イメージのダウンロード {#downloading-the-image}

Raspberry Pi 4のイーサリアムイメージは、「プラグ・アンド・プレイ」イメージです。実行クライアントとコンセンサスクライアントのインストールとセットアップが自動的に行われ、それらが互いに通信し、イーサリアムネットワークに接続するように設定されます。 ユーザーがすべきことは、単純なコマンドを使用してプロセスを開始するだけです。

[Ethereum on Arm](https://ethereumonarm-my.sharepoint.com/:u:/p/dlosada/Ec_VmUvr80VFjf3RYSU-NzkBmj2JOteDECj8Bibde929Gw?download=1)からRaspberry Piのイメージをダウンロードし、SHA256ハッシュを検証します：

```sh
# ダウンロードしたイメージがあるディレクトリから
shasum -a 256 ethonarm_22.04.00.img.zip
# ハッシュ出力は次のようになります: fb497e8f8a7388b62d6e1efbc406b9558bee7ef46ec7e53083630029c117444f
```

Rock 5BおよびOdroid M1ボード用のイメージは、Ethereum-on-Armの[ダウンロードページ](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/quick-guide/download-and-install.html)で入手できます。

## MicroSDへの書き込み {#flashing-the-microsd}

Raspberry Piで使用するマイクロSDカードは、まずデスクトップパソコンかノートパソコンに挿入して書き込む必要があります。 以下のターミナルコマンドで、ダウンロードしたイメージをSDカードに書き込みます。

```shell
# MicroSDカード名を確認
sudo fdisk -l

>> sdxxx
```

次のコマンドには `dd` が含まれており、これはイメージを書き込む前にカードの既存のコンテンツを完全に消去するため、名前を正しく入力することが非常に重要です。 続行するには、zipイメージが含まれているディレクトリに移動します。

```shell
# イメージを解凍して書き込み
unzip ethonarm_22.04.00.img.zip
sudo dd bs=1M if=ethonarm_22.04.00.img of=/dev/<sdxx> conv=fdatasync status=progress
```

これでカードに書きこまれたので、Raspberry Piに挿入できます。

## ノードの起動 {#start-the-node}

SDカードを挿入したRaspberry Piに、イーサネットケーブルとSSDを接続し、電源を入れてください。 OSが起動し、クライアントソフトウェアのインストールやビルドなど、Raspberry Piをイーサリアムノードにする事前設定処理が自動的に開始します。 この処理には10～15分を要します。

すべてがインストールおよび設定されたら、ssh接続でデバイスにログインするか、モニターとキーボードがボードに接続されている場合はターミナルを直接使用します。 ノードの開始に必要な権限を持つ `ethereum` アカウントを使用してログインします。

```shell
ユーザー: ethereum
パスワード: ethereum
```

デフォルトの実行クライアントであるGethが自動的に開始します。 次のターミナルコマンドを使用してログをチェックすることで、これを確認できます。

```sh
sudo journalctl -u geth -f
```

コンセンサスクライアントは明示的に起動する必要があります。 これを行うには、まずルーターのポート9000を開き、Lighthouseがピアを見つけて接続できるようにします。 次にLighthouseサービスを有効にして開始します。

```sh
sudo systemctl enable lighthouse-beacon
sudo systemctl start lighthouse-beacon
```

ログを使ってクライアントを確認してください。

```sh
sudo journalctl -u lighthouse-beacon
```

コンセンサスクライアントはチェックポイント同期を使用するため、数分で同期されることに注意してください。 実行クライアントは、同期により時間がかかります。数時間かかる場合もあります。さらに、コンセンサスクライアントの同期が完了するまで、同期を開始しません(これは、実行クライアントが、同期されたコンセンサスクライアントが提供する同期先のターゲットを必要とするためです)。

GethとLighthouseのサービスが開始し同期されると、Raspberry Piがイーサリアムノードになります。 イーサリアムネットワークとのやり取りを行うには、8545ポートでGethクライアントに接続し、GethのJavascriptコンソールを使うことが最も一般的な方法です。 また、Curlなどのリクエストツールを使用して、JSONオブジェクトとしてフォーマットされたコマンドを送信することもできます。 詳細は[Gethドキュメント](https://geth.ethereum.org/)をご覧ください。

Gethは、ブラウザで表示できるGrafanaダッシュボードに、メトリクスをレポートするように事前設定されています。 上級ユーザーは、この機能を使用して`ipaddress:3000`にアクセスし、`user: admin`と`passwd: ethereum`を渡してノードの状態を監視することができます。

## バリデータ {#validators}

バリデータは、コンセンサスクライアントにオプションで追加することもできます。 バリデータソフトウェアを使用すると、ノードが積極的にコンセンサスに参加し、暗号経済のセキュリティをネットワークに提供できるようになります。 この作業の報酬としてETHを受け取れます。 バリデータを実行するには、まず32 ETHを持っている必要があり、これをデポジットコントラクトに預け入れる必要があります。 預け入れは、[Launchpad](https://launchpad.ethereum.org/)のステップバイステップガイドに従って行うことができます。 この作業はデスクトップ/ラップトップで行いますが、キーは生成しないでください — これはRaspberry Piで直接行うことができます。

Raspberry Piのターミナルを開き、以下のコマンドを実行して、デポジットキーを生成してください。

```
sudo apt-get update
sudo apt-get install staking-deposit-cli
cd && deposit new-mnemonic --num_validators 1
```

(または、[staking-deposit-cli](https://github.com/ethereum/staking-deposit-cli)をダウンロードしてエアギャップマシンで実行し、`deposit new-mnemnonic`コマンドを実行します)

ニーモニックフレーズを安全に保管してください。 上記コマンドで、ノードのキーストアに2つのファイル(バリデータキーとデポジットデータファイル)が生成されました。 デポジットデータは、Launchpadにアップロードする必要があるため、Raspberry Piからデスクトップまたはラップトップにコピーする必要があります。 これは、ssh接続や他のコピー/ペーストの手法を用いて行えます。

Launchpadを実行しているコンピューターでデポジットデータファイルが利用可能になったら、これをLaunchpad画面の「+」にドラッグ・アンド・ドロップすることができます。 画面の指示に従って、デポジットコントラクトにトランザクションを送信してください。

Raspberry Piに戻ると、バリデータが開始可能になります。 これには、バリデータキーのインポート、報酬を受け取るためのアドレスの設定、事前設定されたバリデータプロセスの開始が必要になります。 以下の例はLighthouseのものです。他のコンセンサスクライアント向けの手順は、[Ethereum on Armドキュメント](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)で参照できます：

```shell
# バリデータキーのインポート
lighthouse account validator import --directory=/home/ethereum/validator_keys

# 報酬受取アドレスの設定
sudo sed -i 's/<ETH_ADDRESS>' /etc/ethereum/lighthouse-validator.conf

# バリデータの開始
sudo systemctl start lighthouse-validator
```

おめでとうございます。これでフルイーサリアムノードとバリデータが、Raspberry Piで実行されました。

## 詳細 {#more-details}

このページでは、Raspberry Piを使用してGeth-Lighthouseノードとバリデータを設定する方法の概要について説明しました。 より詳細な手順は、[Ethereum-on-Armウェブサイト](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/index.html)で入手できます。

## フィードバックのお願い {#feedback-appreciated}

Raspberry Piには膨大なユーザーベースがあり、イーサリアムネットワークの健全性に非常に良い影響を与える可能性があります。
このチュートリアルを深く掘り下げていき、テストネットで実行してみてください。また、Ethereum on ArmのGitHubページの確認、フィードバックの提供、問題提起、プルリクエストの作成による、テクノロジーの進歩とドキュメント化推進へのご協力をお願いします。

## 参考資料 {#references}

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
