---
title: Raspberry Pi 4でイーサリアムノードを実行する
description: Raspberry Pi 4をフラッシュし、イーサネットケーブルを接続し、SSDディスクを繋いでデバイスの電源を入れ、Raspberry Pi 4を完全なイーサリアムノード＋バリデータにする方法
author: "EthereumOnArm"
tags: ["クライアント", "実行レイヤー", "コンセンサスレイヤー", "ノード"]
lang: ja
skill: intermediate
breadcrumb: Raspberry Piノード
published: 2022-06-10
source: Ethereum on ARM
sourceUrl: https://ethereum-on-arm-documentation.readthedocs.io/en/latest/
---

**Ethereum on Armは、Raspberry Piをイーサリアムノードに変えることができるカスタムLinuxイメージです。**

Ethereum on Armを使用してRaspberry Piをイーサリアムノードにするには、以下のハードウェアが推奨されます。

- Raspberry Pi 4（モデルB 8GB）、Odroid M1、またはRock 5B（8GB/16GB RAM）ボード
- MicroSDカード（最低16GB、クラス10）
- 最低2TBのUSB 3.0接続SSDディスク、またはUSB-SATAケース付きSSD
- 電源
- イーサネットケーブル
- ポートフォワーディング（詳細はクライアントを参照）
- ヒートシンクとファン付きのケース
- USBキーボード、モニター、HDMIケーブル（micro-HDMI）（オプション）

## なぜARMでイーサリアムを実行するのか？ {#why-run-ethereum-on-arm}

ARMボードは非常に手頃な価格で、柔軟性のある小型コンピュータです。安価に購入でき、すべてのリソースをノードに集中させるように設定できるため効率的であり、消費電力が少なく、物理的に小さいためどんな家庭にも目立たずに設置できることから、イーサリアムノードを実行するための良い選択肢となります。また、Raspberry PiのMicroSDにビルド済みのイメージをフラッシュするだけでよく、ソフトウェアのダウンロードやビルドが不要なため、ノードを立ち上げるのが非常に簡単です。

## どのような仕組みですか？ {#how-does-it-work}

Raspberry Piのメモリカードには、ビルド済みのイメージがフラッシュされます。このイメージには、イーサリアムノードを実行するために必要なすべてが含まれています。フラッシュされたカードがあれば、ユーザーはRaspberry Piの電源を入れるだけです。ノードの実行に必要なすべてのプロセスが自動的に開始されます。これが機能するのは、メモリカードにLinuxベースのオペレーティングシステム（OS）が含まれており、その上でユニットをイーサリアムノードに変えるシステムレベルのプロセスが自動的に実行されるためです。

人気のRaspberry Pi用Linux OSである「Raspbian」を使用してイーサリアムを実行することはできません。Raspbianは依然として32ビットアーキテクチャを使用しているため、イーサリアムユーザーはメモリの問題に直面し、コンセンサス・クライアントは32ビットバイナリをサポートしていないからです。これを克服するため、Ethereum on Armチームは「Armbian」と呼ばれるネイティブ64ビットOSに移行しました。

**イメージは必要なすべての手順を処理します**。環境の設定やSSDディスクのフォーマットから、イーサリアムソフトウェアのインストールと実行、さらにはブロックチェーンの同期の開始まで行います。

## 実行クライアントとコンセンサス・クライアントに関する注意 {#note-on-execution-and-consensus-clients}

Ethereum on Armのイメージには、ビルド済みの実行クライアントとコンセンサス・クライアントがサービスとして含まれています。イーサリアムノードは、両方のクライアントが同期され、実行されている必要があります。ユーザーはイメージをダウンロードしてフラッシュし、サービスを開始するだけです。イメージには以下の実行クライアントがプリロードされています。

- Geth
- ネザーマインド
- ベス

また、以下のコンセンサス・クライアントも含まれています。

- ライトハウス
- ニンバス
- プリズム
- テク

それぞれ1つずつ選択して実行する必要があります。すべての実行クライアントは、すべてのコンセンサス・クライアントと互換性があります。クライアントを明示的に選択しない場合、ノードはデフォルトであるGethとライトハウスにフォールバックし、ボードの電源が入ったときにそれらを自動的に実行します。Gethがピアを見つけて接続できるように、ルーターのポート30303を開く必要があります。

## イメージのダウンロード {#downloading-the-image}

Raspberry Pi 4のイーサリアムイメージは「プラグアンドプレイ」イメージであり、実行クライアントとコンセンサス・クライアントの両方を自動的にインストールおよびセットアップし、互いに通信してイーサリアムネットワークに接続するように設定します。ユーザーは簡単なコマンドを使用してプロセスを開始するだけです。

[Ethereum on Arm](https://ethereumonarm-my.sharepoint.com/:u:/p/dlosada/Ec_VmUvr80VFjf3RYSU-NzkBmj2JOteDECj8Bibde929Gw?download=1)からRaspberry Piのイメージをダウンロードし、SHA-256ハッシュを検証します。

```sh
# ダウンロードしたイメージを含むディレクトリから
shasum -a 256 ethonarm_22.04.00.img.zip
# ハッシュの出力は次のようになるはずです: fb497e8f8a7388b62d6e1efbc406b9558bee7ef46ec7e53083630029c117444f
```

Rock 5BおよびOdroid M1ボード用のイメージは、Ethereum-on-Armの[ダウンロードページ](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)で入手できることに注意してください。

## MicroSDのフラッシュ {#flashing-the-microsd}

Raspberry Piで使用するMicroSDカードは、フラッシュできるようにまずデスクトップまたはラップトップに挿入する必要があります。次に、以下のターミナルコマンドを実行して、ダウンロードしたイメージをSDカードにフラッシュします。

```shell
# MicroSDカードの名前を確認する
sudo fdisk -l

>> sdxxx
```

次のコマンドには、イメージを書き込む前にカードの既存のコンテンツを完全に消去する`dd`が含まれているため、名前を正確に指定することが非常に重要です。続行するには、zip圧縮されたイメージが含まれるディレクトリに移動します。

```shell
# イメージを解凍してフラッシュする
unzip ethonarm_22.04.00.img.zip
sudo dd bs=1M if=ethonarm_22.04.00.img of=/dev/<sdxx> conv=fdatasync status=progress
```

これでカードがフラッシュされたので、Raspberry Piに挿入できます。

## ノードの起動 {#start-the-node}

SDカードをRaspberry Piに挿入した状態で、イーサネットケーブルとSSDを接続し、電源を入れます。OSが起動し、クライアントソフトウェアのインストールやビルドなど、Raspberry Piをイーサリアムノードにするための事前設定されたタスクの実行が自動的に開始されます。これにはおそらく10〜15分かかります。

すべてのインストールと設定が完了したら、SSH接続経由でデバイスにログインするか、ボードにモニターとキーボードが接続されている場合は直接ターミナルを使用します。ノードを起動するために必要な権限を持つ`ethereum`アカウントを使用してログインします。

```shell
User: ethereum
Password: ethereum
```

デフォルトの実行クライアントであるGethは自動的に起動します。以下のターミナルコマンドを使用してログを確認することで、これを確認できます。

```sh
sudo journalctl -u geth -f
```

コンセンサス・クライアントは明示的に起動する必要があります。これを行うには、まずライトハウスがピアを見つけて接続できるように、ルーターのポート9000を開きます。次に、lighthouseサービスを有効にして起動します。

```sh
sudo systemctl enable lighthouse-beacon
sudo systemctl start lighthouse-beacon
```

ログを使用してクライアントを確認します。

```sh
sudo journalctl -u lighthouse-beacon
```

コンセンサス・クライアントはチェックポイント同期を使用するため、数分で同期されることに注意してください。実行クライアントにはさらに時間がかかり、数時間かかる可能性もあります。また、コンセンサス・クライアントの同期が完了するまで起動しません（これは、実行クライアントが同期するためのターゲットを必要とし、同期されたコンセンサス・クライアントがそれを提供するためです）。

Gethとライトハウスのサービスが実行され、同期されると、Raspberry Piはイーサリアムノードになります！イーサリアムネットワークとやり取りする最も一般的な方法は、ポート8545でGethクライアントにアタッチできるGethのJavaScriptコンソールを使用することです。Curlなどのリクエストツールを使用して、JSONオブジェクトとしてフォーマットされたコマンドを送信することも可能です。詳細は[Gethのドキュメント](https://geth.ethereum.org/)をご覧ください。

Gethは、ブラウザで表示できるGrafanaダッシュボードにメトリクスを報告するように事前設定されています。より高度なユーザーは、`ipaddress:3000`に移動し、`user: admin`と`passwd: ethereum`を渡すことで、この機能を使用してノードの健全性を監視したいと思うかもしれません。

## バリデータ {#validators}

コンセンサス・クライアントには、オプションでバリデータを追加することもできます。バリデータソフトウェアを使用すると、ノードがコンセンサスに積極的に参加し、ネットワークに暗号経済的なセキュリティを提供できるようになります。この作業の報酬としてETHを受け取ります。バリデータを実行するには、まず32 ETHを用意し、デポジット・コントラクトにデポジットする必要があります。デポジットは、[Launchpad](https://launchpad.ethereum.org/)のステップバイステップガイドに従って行うことができます。これはデスクトップ/ラップトップで行いますが、キーは生成しないでください。キーの生成はRaspberry Pi上で直接行うことができます。

Raspberry Piでターミナルを開き、以下のコマンドを実行してデポジットキーを生成します。

```
sudo apt-get update
sudo apt-get install staking-deposit-cli
cd && deposit new-mnemonic --num_validators 1
```

（または、エアギャップ環境のマシンで実行するために[staking-deposit-cli](https://github.com/ethereum/staking-deposit-cli)をダウンロードし、`deposit new-mnemnonic`コマンドを実行します）

ニーモニックフレーズは安全に保管してください！上記のコマンドにより、ノードのキーストアにバリデータキーとデポジットデータファイルの2つのファイルが生成されました。デポジットデータはLaunchpadにアップロードする必要があるため、Raspberry Piからデスクトップ/ラップトップにコピーする必要があります。これは、SSH接続やその他のコピー/ペースト方法を使用して行うことができます。

Launchpadを実行しているコンピュータでデポジットデータファイルが利用可能になったら、Launchpad画面の`+`にドラッグアンドドロップできます。画面の指示に従って、デポジット・コントラクトにトランザクションを送信します。

Raspberry Piに戻り、バリデータを起動できます。これには、バリデータキーのインポート、報酬を受け取るアドレスの設定、そして事前設定されたバリデータプロセスの開始が必要です。以下の例はライトハウスのものです。他のコンセンサス・クライアントの手順は、[Ethereum on Armのドキュメント](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)で確認できます。

```shell
# バリデータのキーをインポートする
lighthouse account validator import --directory=/home/ethereum/validator_keys

# 報酬アドレスを設定する
sudo sed -i 's/<ETH_ADDRESS>' /etc/ethereum/lighthouse-validator.conf

# バリデータを起動する
sudo systemctl start lighthouse-validator
```

おめでとうございます。これでRaspberry Pi上で完全なイーサリアムノードとバリデータが実行されるようになりました！

## 詳細情報 {#more-details}

このページでは、Raspberry Piを使用してGeth-ライトハウスノードとバリデータをセットアップする方法の概要を説明しました。より詳細な手順は、[Ethereum-on-Armのウェブサイト](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)で確認できます。

## フィードバックのお願い {#feedback-appreciated}

Raspberry Piには膨大なユーザーベースがあり、イーサリアムネットワークの健全性に非常に良い影響を与える可能性があると私たちは考えています。
ぜひこのチュートリアルの詳細を掘り下げ、テストネットでの実行を試し、Ethereum on ArmのGitHubをチェックして、フィードバックの提供、IssueやPull Requestの作成を行い、技術とドキュメントの進歩にご協力ください！

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
11. https://docs.ethswarm.org/
12. https://raiden.network
13. https://ipfs.io
14. https://status.im
15. https://vipnode.org