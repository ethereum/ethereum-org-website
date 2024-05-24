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

**Ethereum on Armは、Raspberry PiをイーサリアムノードにするカスタムLinuxイメージです。**

Ethereum on Armを使用してRaspberry Piをイーサリアムノードにする場合、次のハードウェアが推奨されます。

- Raspberry 4 (モデル B 8 GB)、Odroid M1またはRock 5B (8 GB / 16 GB RAM)ボード
- マイクロSDカード(最小構成: 16 GB、クラス10)
- 2 TB SSD最小USB 3.0ディスクまたはUSB-SATAケース付きSSD
- 電源
- イーサネットケーブル
- ポートフォワーディング機能(詳細はクライアントを参照してください)
- ヒートシンクとファンが付属しているケース
- USBキーボード、モニター、HDMIケーブル(マイクロHDMI) (オプション)

## Ethereum on Armを実行する理由 {#why-run-ethereum-on-arm}

ARMボードは価格が非常に手頃で、柔軟性の高い、小型のコンピュータです。 このボードは、イーサリアムノードを実行するのに適しています。手ごろな価格で、ノードだけにリソースを使うように設定が可能であり、効率的で電力消費量が少なく、物理的にも小さいので家に置いても邪魔にならないからです。 また、ノードを立ち上げるのも簡単です。Raspberry PiのマイクロSDカードは、ビルド済みイメージを簡単に書き込めるので、ソフトウェアのダウンロードやビルドが不要です。

## 動作方法 {#how-does-it-work}

ビルド済みイメージをRaspberry Piのメモリーカードに書き込みます。 このイメージには、イーサリアムノードを実行するために必要なすべてが含まれています。 この書き込まれたカードがあれば、ユーザーはRaspberry Piの電源を入れるだけで済みます。 ノードを実行するのに必要なすべてのプロセスは自動で開始します。 メモリーカードにLinuxベースのオペレーティングシステム(OS)が含まれており、その上でシステムレベルのプロセスが自動的に実行され、ARMボードがイーサリアムノードになります。

イーサリアムは、Raspberry PiのLinux OSとしてよく知られている「Raspbian」では実行できません。Raspbianは、依然として32ビットのアーキテクチャを使用しており、これによるメモリの問題が発生します。さらに、コンセンサスクライアントは、32ビットバイナリをサポートしていません。 これを克服するために、Ethereum on Armチームは、「Armbian」と呼ばれるネイティブの64ビットOSに移行しました。

**このイメージは、必要なステップのすべてを行います**。環境のセットアップ、SSDディスクのフォーマット、イーサリアムソフトウェアのインストールと実行だけでなくブロックチェーンの同期も開始します。

## 実行クライアントとコンセンサスクライアントに関する注意事項 {#note-on-execution-and-consensus-clients}

Ethereum on Armのイメージには、ビルド済みの実行クライアントとコンセンサスクライアントがサービスとして組み込まれています。 イーサリアムノードでは、両方のクライアントが同期されて実行される必要があります。 ここでユーザーがすべきことは、イメージをダウンロードして書き込んだ後、サービスを開始するだけです。 イメージには、次の実行クライアントが入っています。

- Geth
- Nethermind
- Besu

コンセンサスクライアントは、次のものが入っています。

- ライトハウス
- ニンバス
- プリズム
- テク

使いたい実行クライアントとコンセンサスクライアントを各1つずつ選びます。すべての実行クライアントは、すべてのコンセンサスクライアントと連携可能です。 クライアントを選択しなかった場合、デフォルトでGethとライトハウスになります。ボードに電源を入れると、これらのクライアントが自動的に実行されます。 Gethがピアを見つけて接続できるように、ルーターで30303ポートを開く必要があります。

## イメージのダウンロード {#downloading-the-image}

Raspberry Pi 4のイーサリアムイメージは、「プラグ・アンド・プレイ」イメージです。実行クライアントとコンセンサスクライアントのインストールとセットアップが自動的に行われ、それらが互いに通信し、イーサリアムネットワークに接続するように設定されます。 ユーザーがすべきことは、単純なコマンドを使用してプロセスを開始するだけです。

[Ethereum on Arm](https://ethereumonarm-my.sharepoint.com/:u:/p/dlosada/Ec_VmUvr80VFjf3RYSU-NzkBmj2JOteDECj8Bibde929Gw?download=1)からRaspberry Piイメージをダウンロードし、次のようにSHA256ハッシュを確認してください。

```sh
# From directory containing the downloaded image
shasum -a 256 ethonarm_22.04.00.img.zip
# Hash should output: fb497e8f8a7388b62d6e1efbc406b9558bee7ef46ec7e53083630029c117444f
```

Rock 5BとOdroid M1ボードのイメージは、Ethereum-on-Armの[ダウンロードページ](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/quick-guide/download-and-install.html)から入手可能です。

## マイクロSDへの書き込み {#flashing-the-microsd}

Raspberry Piで使用するマイクロSDカードは、まずデスクトップパソコンかノートパソコンに挿入して書き込む必要があります。 以下のターミナルコマンドで、ダウンロードしたイメージをSDカードに書き込みます。

```shell
# check the MicroSD card name
sudo fdisk -l

>> sdxxx
```

SDカード名を正しく取得することは、非常に重要です。次に使うコマンドに`dd`があり、これはイメージを書き込む前にカードの内容を完全に削除するからです。 zipイメージがあるディレクトリに移動して続行します。

```shell
# unzip and flash image
unzip ethonarm_22.04.00.img.zip
sudo dd bs=1M if=ethonarm_22.04.00.img of=/dev/<sdxx> conv=fdatasync status=progress
```

これでカードに書きこまれたので、Raspberry Piに挿入できます。

## ノードの開始 {#start-the-node}

SDカードを挿入したRaspberry Piに、SSDとイーサネットケーブルを接続し、電源を入れてください。 OSが起動し、クライアントソフトウェアのインストールやビルドなど、Raspberry Piをイーサリアムノードにする事前設定処理が自動的に開始します。 この処理には10～15分を要します。

自動インストールおよび設定が完了したら、モニターとキーボードがボードに接続されているならば直接ターミナルを使うか、SSH接続でデバイスへログインしてください。 `ethereum`アカウントを使用してログインします。このアカウントは、ノードの開始に必要なパーミッションを持っています。

```shell
User: ethereum
Password: ethereum
```

デフォルトの実行クライアントであるGethが自動的に開始します。 次のターミナルコマンドを使用してログをチェックすることで、開始を確認できます。

```sh
sudo journalctl -u geth -f
```

コンセンサスクライアントは、明示的に開始する必要があります。 開始するには、まずルーターの9000ポートを開き、ライトハウスがピアを見つけて接続できるようにします。 次にライトハウスサービスを有効にして開始します。

```sh
sudo systemctl enable lighthouse-beacon
sudo systemctl start lighthouse-beacon
```

ログでクライアントの状態を確認してください。

```sh
sudo journalctl -u lighthouse-beacon
```

チェックポイント同期を使用するため、コンセンサスクライアントは数分で同期されることに注意してください。 実行クライアントは、同期により時間がかかります。数時間かかる場合もあります。さらに、コンセンサスクライアントの同期が完了するまで、同期を開始しません(これは、実行クライアントが、同期されたコンセンサスクライアントが提供する同期先のターゲットを必要とするためです)。

Gethとライトハウスのサービスが開始し同期されると、Raspberry Piがイーサリアムノードになります。 イーサリアムネットワークとのやり取りを行うには、8545ポートでGethクライアントに接続し、GethのJavascriptコンソールを使うことが最も一般的な方法です。 また、Curlなどのリクエストツールを使用して、JSONオブジェクトとしてフォーマットされたコマンドを送信することもできます。 詳細は、[Gethのドキュメント](https://geth.ethereum.org/)をご覧ください。

Gethは、ブラウザで表示できるGrafanaダッシュボードに、メトリクスをレポートするように事前設定されています。 この機能を使用してノードの健全性を監視したい上級ユーザーは、`ipaddress:3000`にアクセスして`user: admin`と`passwd: ethereum`を入力してください。

## バリデータ {#validators}

バリデータは、コンセンサスクライアントにオプションで追加することもできます。 バリデータソフトウェアを使用すると、ノードが積極的にコンセンサスに参加し、暗号経済のセキュリティをネットワークに提供できるようになります。 この作業の報酬としてETHを受け取れます。 バリデータを実行するには、まず32 ETHを持っている必要があり、これをデポジットコントラクトに預け入れる必要があります。 **長期的なコミットメントとなるため、このETHはまだ引き出すことはできません。** 預け入れは、[ランチパッド](https://launchpad.ethereum.org/)のステップバイステップガイドに従って行うことができます。 この作業は、デスクトップパソコンまたはノートパソコンで行いますが、キーは生成しないでください。キーはRaspberry Piで直接生成します。

Raspberry Piのターミナルを開き、以下のコマンドを実行して、デポジットキーを生成してください。

```
sudo apt-get update
sudo apt-get install staking-deposit-cli
cd && deposit new-mnemonic --num_validators 1
```

ニーモニックフレーズを安全に保管してください。 上記コマンドで、ノードのキーストアに2つのファイルが生成されました。これらは、バリデータキーとデポジットデータファイルです。 デポジットデータは、ランチパッドにアップロードする必要があるため、Raspberry Piからデスクトップパソコンまたはノートパソコンにコピーする必要があります。 これは、ssh接続や他のコピー/ペーストの手法を用いて行えます。

ランチパッドを実行しているコンピューターでデポジットデータファイルが利用可能になったら、これをランチパッド画面の「`+`」にドラッグ・アンド・ドロップすることができます。 画面の指示に従って、デポジットコントラクトにトランザクションを送信してください。

Raspberry Piに戻ると、バリデータが開始可能になります。 これには、バリデータキーのインポート、報酬を受け取るためのアドレスの設定、事前設定されたバリデータプロセスの開始が必要になります。 以下は、ライトハウス向けの例です。その他のコンセンサス クライアント向けの手順については、[Ethereum on Armのドキュメント](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)を参照してください。

```shell
# import the validator keys
lighthouse account validator import --directory=/home/ethereum/validator_keys

# set the reward address
sudo sed -i 's/<ETH_ADDRESS>' /etc/ethereum/lighthouse-validator.conf

# start the validator
sudo systemctl start lighthouse-validator
```

おめでとうございます。これでフルイーサリアムノードとバリデータが、Raspberry Piで実行されました。

## 詳細情報 {#more-details}

このページでは、Raspberry Piを使用してGethおよびライトハウスのノードとバリデータを設定する方法の概要について説明しました。 さらに詳細な手順は、[Ethereum on Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/index.html)のウェブサイトでご覧いただけます。

## フィードバックご協力のお願い {#feedback-appreciated}

Raspberry Piは多くのユーザーが利用しており、イーサリアムネットワークの健全性に非常に良い影響を与えてきました。 このチュートリアルを深く掘り下げていき、テストネットで実行してみてください。また、Ethereum on ArmのGitHubページの確認、フィードバックの提供、問題提起、プルリクエストの作成による、テクノロジーの進歩とドキュメント化推進へのご協力をお願いします。

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
