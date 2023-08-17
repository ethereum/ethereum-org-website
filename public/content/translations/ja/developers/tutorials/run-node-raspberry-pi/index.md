---
title: マイクロSDカードに書き込んでRaspberry Pi 4をノードにする方法
description: Raspberry Pi 4に書き込み、イーサネットケーブル、SSDをそれぞれ接続してから電源を入れるとRaspberry Pi 4がフルイーサリアムノードとバリデータになります。
author: "EthereumOnArm"
tags:
  - "クライアント"
  - "実行レイヤ"
  - "コンセンサスレイヤー"
  - "ノード"
lang: ja
skill: intermediate
published: 2022-06-10
source: Ethereum on ARM
sourceUrl: https://ethereum-on-arm-documentation.readthedocs.io/en/latest/
---

**Ethereum on Arm は、Raspberry Pi をイーサリアムノードにするカスタム Linux イメージです。**

Ethereum on Arm を使用して Raspberry Pi をイーサリアムノードにする場合、次のハードウェアが推奨されます。

- Raspberry 4 (モデル B 8 GB)、Odroid M1 または Rock 5B (8 GB / 16 GB RAM)ボード
- マイクロ SD カード(最小構成: 16 GB、クラス 10)
- 2 TB SSD 最小 USB 3.0 ディスクまたは USB-SATA ケース付き SSD
- 電源
- イーサネットケーブル
- ポートフォワーディング機能(詳細はクライアントを参照してください)
- ヒートシンクとファンが付属しているケース
- USB キーボード、モニター、HDMI ケーブル(マイクロ HDMI) (オプション)

## Ethereum on Arm を実行する理由 {#why-run-ethereum-on-arm}

ARM ボードは価格が非常に手頃で、柔軟性の高い、小型のコンピュータです。 このボードは、イーサリアムノードを実行するのに適しています。手ごろな価格で、ノードだけにリソースを使うように設定が可能であり、効率的で電力消費量が少なく、物理的にも小さいので家に置いても邪魔にならないからです。 また、ノードを立ち上げるのも簡単です。Raspberry Pi のマイクロ SD カードは、ビルド済みイメージを簡単に書き込めるので、ソフトウェアのダウンロードやビルドが不要です。

## 動作方法 {#how-does-it-work}

ビルド済みイメージを Raspberry Pi のメモリーカードに書き込みます。 このイメージには、イーサリアムノードを実行するために必要なすべてが含まれています。 この書き込まれたカードがあれば、ユーザーは Raspberry Pi の電源を入れるだけで済みます。 ノードを実行するのに必要なすべてのプロセスは自動で開始します。 メモリーカードに Linux ベースのオペレーティングシステム(OS)が含まれており、その上でシステムレベルのプロセスが自動的に実行され、ARM ボードがイーサリアムノードになります。

イーサリアムは、Raspberry Pi の Linux OS としてよく知られている「Raspbian」では実行できません。Raspbian は、依然として 32 ビットのアーキテクチャを使用しており、これによるメモリの問題が発生します。さらに、コンセンサスクライアントは、32 ビットバイナリをサポートしていません。 これを克服するために、Ethereum on Arm チームは、「Armbian」と呼ばれるネイティブの 64 ビット OS に移行しました。

**このイメージは、必要なステップのすべてを行います**。環境のセットアップ、SSD ディスクのフォーマット、イーサリアムソフトウェアのインストールと実行だけでなくブロックチェーンの同期も開始します。

## 実行クライアントとコンセンサスクライアントに関する注意事項 {#note-on-execution-and-consensus-clients}

Ethereum on Arm のイメージには、ビルド済みの実行クライアントとコンセンサスクライアントがサービスとして組み込まれています。 イーサリアムノードでは、両方のクライアントが同期されて実行される必要があります。 ここでユーザーがすべきことは、イメージをダウンロードして書き込んだ後、サービスを開始するだけです。 イメージには、次の実行クライアントが入っています。

- Geth
- Nethermind
- Besu

コンセンサスクライアントは、次のものが入っています。

- ライトハウス
- ニンバス
- プリズム
- テク

使いたい実行クライアントとコンセンサスクライアントを各 1 つずつ選びます。すべての実行クライアントは、すべてのコンセンサスクライアントと連携可能です。 クライアントを選択しなかった場合、デフォルトで Geth とライトハウスになります。ボードに電源を入れると、これらのクライアントが自動的に実行されます。 Geth がピアを見つけて接続できるように、ルーターで 30303 ポートを開く必要があります。

## イメージのダウンロード {#downloading-the-image}

Raspberry Pi 4 のイーサリアムイメージは、「プラグ・アンド・プレイ」イメージです。実行クライアントとコンセンサスクライアントのインストールとセットアップが自動的に行われ、それらが互いに通信し、イーサリアムネットワークに接続するように設定されます。 ユーザーがすべきことは、単純なコマンドを使用してプロセスを開始するだけです。

[Ethereum on Arm](https://ethereumonarm-my.sharepoint.com/:u:/p/dlosada/Ec_VmUvr80VFjf3RYSU-NzkBmj2JOteDECj8Bibde929Gw?download=1)から Raspberry Pi イメージをダウンロードし、次のように SHA256 ハッシュを確認してください。

```sh
# ダウンロードしたイメージがあるディレクトリで以下を実行します。
shasum -a 256 ethonarm_22.04.00.img.zip
# ハッシュは以下である必要があります。
fb497e8f8a7388b62d6e1efbc406b9558bee7ef46ec7e53083630029c117444f
```

Rock 5B と Odroid M1 ボードのイメージは、Ethereum-on-Arm の[ダウンロードページ](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/quick-guide/download-and-install.html)から入手可能です。

## マイクロ SD への書き込み {#flashing-the-microsd}

Raspberry Pi で使用するマイクロ SD カードは、まずデスクトップパソコンかノートパソコンに挿入して書き込む必要があります。 以下のターミナルコマンドで、ダウンロードしたイメージを SD カードに書き込みます。

```shell
# マイクロSDカード名の確認
sudo fdisk -l

>> sdxxx
```

SD カード名を正しく取得することは、非常に重要です。次に使うコマンドに`dd`があり、これはイメージを書き込む前にカードの内容を完全に削除するからです。 zip イメージがあるディレクトリに移動して続行します。

```shell
# zip展開とイメージの書き込み
unzip ethonarm_22.04.00.img.zip
sudo dd bs=1M if=ethonarm_kiln_22.04.00.img of=/dev/mmcblk0 conv=fdatasync status=progress
```

これでカードに書きこまれたので、Raspberry Pi に挿入できます。

## ノードの開始 {#start-the-node}

SD カードを挿入した Raspberry Pi に、SSD とイーサネットケーブルを接続し、電源を入れてください。 OS が起動し、クライアントソフトウェアのインストールやビルドなど、Raspberry Pi をイーサリアムノードにする事前設定処理が自動的に開始します。 この処理には 10 ～ 15 分を要します。

自動インストールおよび設定が完了したら、モニターとキーボードがボードに接続されているならば直接ターミナルを使うか、SSH 接続でデバイスへログインしてください。 `ethereum`アカウントを使用してログインします。このアカウントは、ノードの開始に必要なパーミッションを持っています。

```shell
User: ethereum
Password: ethereum
```

デフォルトの実行クライアントである Geth が自動的に開始します。 次のターミナルコマンドを使用してログをチェックすることで、開始を確認できます。

```sh
sudo journalctl -u geth -f
```

コンセンサスクライアントは、明示的に開始する必要があります。 開始するには、まずルーターの 9000 ポートを開き、ライトハウスがピアを見つけて接続できるようにします。 次にライトハウスサービスを有効にして開始します。

```sh
sudo systemctl enable lighthouse-beacon
sudo systemctl start lighthouse-beacon
```

ログでクライアントの状態を確認してください。

```sh
sudo journalctl -u lighthouse-beacon
```

チェックポイント同期を使用するため、コンセンサスクライアントは数分で同期されることに注意してください。 実行クライアントは、同期により時間がかかります。数時間かかる場合もあります。さらに、コンセンサスクライアントの同期が完了するまで、同期を開始しません(これは、実行クライアントが、同期されたコンセンサスクライアントが提供する同期先のターゲットを必要とするためです)。

Geth とライトハウスのサービスが開始し同期されると、Raspberry Pi がイーサリアムノードになります。 イーサリアムネットワークとのやり取りを行うには、8545 ポートで Geth クライアントに接続し、Geth の Javascript コンソールを使うことが最も一般的な方法です。 また、Curl などのリクエストツールを使用して、JSON オブジェクトとしてフォーマットされたコマンドを送信することもできます。 詳細は、[Geth のドキュメント](geth.ethereum.org)をご覧ください。

Geth は、ブラウザで表示できる Grafana ダッシュボードに、メトリクスをレポートするように事前設定されています。 この機能を使用してノードの健全性を監視したい上級ユーザーは、`ipaddress:3000`にアクセスして`user: admin`と`passwd: ethereum`を入力してください。

## バリデータ {#validators}

バリデータは、コンセンサスクライアントにオプションで追加することもできます。 バリデータソフトウェアを使用すると、ノードが積極的にコンセンサスに参加し、暗号経済のセキュリティをネットワークに提供できるようになります。 この作業の報酬として ETH を受け取れます。 バリデータを実行するには、まず 32 ETH を持っている必要があり、これをデポジットコントラクトに預け入れる必要があります。 **長期的なコミットメントとなるため、この ETH はまだ引き出すことはできません。** 預け入れは、[ランチパッド](https://launchpad.ethereum.org/)のステップバイステップガイドに従って行うことができます。 この作業は、デスクトップパソコンまたはノートパソコンで行いますが、キーは生成しないでください。キーは Raspberry Pi で直接生成します。

Raspberry Pi のターミナルを開き、以下のコマンドを実行して、デポジットキーを生成してください。

```
sudo apt-get update
sudo apt-get install staking-deposit-cli
cd && deposit new-mnemonic --num_validators 1
```

ニーモニックフレーズを安全に保管してください。 上記コマンドで、ノードのキーストアに 2 つのファイルが生成されました。これらは、バリデータキーとデポジットデータファイルです。 デポジットデータは、ランチパッドにアップロードする必要があるため、Raspberry Pi からデスクトップパソコンまたはノートパソコンにコピーする必要があります。 これは、ssh 接続や他のコピー/ペーストの手法を用いて行えます。

ランチパッドを実行しているコンピューターでデポジットデータファイルが利用可能になったら、これをランチパッド画面の「`+`」にドラッグ・アンド・ドロップすることができます。 画面の指示に従って、デポジットコントラクトにトランザクションを送信してください。

Raspberry Pi に戻ると、バリデータが開始可能になります。 これには、バリデータキーのインポート、報酬を受け取るためのアドレスの設定、事前設定されたバリデータプロセスの開始が必要になります。 以下は、ライトハウス向けの例です。その他のコンセンサス クライアント向けの手順については、[Ethereum on Arm のドキュメント](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)を参照してください。

```shell
# バリデータキーのインポート
lighthouse account validator import --directory=/home/ethereum/validator_keys

# 報酬受取アドレスの設定
sudo sed -i 's/<ETH_ADDRESS>' /etc/ethereum/lighthouse-validator.conf

# バリデータの開始
sudo systemctl start lighthouse-validator
```

おめでとうございます。これでフルイーサリアムノードとバリデータが、Raspberry Pi で実行されました。

## 詳細情報 {#more-details}

このページでは、Raspberry Pi を使用して Geth およびライトハウスのノードとバリデータを設定する方法の概要について説明しました。 さらに詳細な手順は、[Ethereum on Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/index.html)のウェブサイトでご覧いただけます。

## フィードバックご協力のお願い {#feedback-appreciated}

Raspberry Pi は多くのユーザーが利用しており、イーサリアムネットワークの健全性に非常に良い影響を与えてきました。 このチュートリアルを深く掘り下げていき、テストネットで実行してみてください。また、Ethereum on Arm の GitHub ページの確認、フィードバックの提供、問題提起、プルリクエストの作成による、テクノロジーの進歩とドキュメント化推進へのご協力をお願いします。

## 参考文献 {#references}

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
