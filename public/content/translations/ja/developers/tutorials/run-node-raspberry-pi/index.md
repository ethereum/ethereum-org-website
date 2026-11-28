---
title: "Raspberry Pi 5でイーサリアムノードを実行する"
description: "Raspberry Pi 5をフラッシュし、イーサネットケーブルを接続し、NVMeディスクを接続してデバイスの電源を入れ、Raspberry Pi 5を完全なイーサリアムノードとバリデータにする方法"
author: "EthereumOnArm"
tags: ["クライアント", "実行レイヤー", "コンセンサスレイヤー", "ノード"]
lang: ja
skill: intermediate
breadcrumb: "Raspberry Piノード"
published: 2022-06-10
source: Ethereum on ARM
sourceUrl: https://ethereum-on-arm-documentation.readthedocs.io/en/latest/
---

**Ethereum on Armは、Raspberry Piをイーサリアムノードに変えることができるカスタムLinuxイメージです。**

Ethereum on Armを使用してRaspberry Piをイーサリアムノードにするには、以下のハードウェアが推奨されます。

- 16 GBのRAMを搭載したRaspberry Pi 5
- NVMeディスクを接続するためのRaspberry Pi 5用NVMe HAT
- NVMe SSD (M.2 2280)、最低4 TB。互換性の問題が知られているPhisonコントローラを搭載したディスクは避けてください。
- MicroSDカード (最低16 GB、Class 10)
- 電源
- イーサネットケーブル
- ポートフォワーディング (詳細はクライアントを参照)
- ヒートシンク付きケース
- USBキーボード、モニター、HDMIケーブル (micro-HDMI) (オプション)

Ethereum on Armは、NanoPC T6、Rock 5B、Orange Pi 5 Plusなどの他のARMボードもサポートしています。これらのボードはネイティブでNVMeをサポートしているため、新しいハードウェアを購入する場合は、Ethereum on ArmチームはRaspberry Pi 5よりもこれらを推奨しています。詳細は[推奨ハードウェアリスト](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/overview/supported-hardware.html)を参照してください。このチュートリアルの残りの部分は、ダウンロードするイメージファイルを除き、サポートされているすべてのボードで同じです。

## なぜARMでイーサリアムを実行するのか？ {#why-run-ethereum-on-arm}

ARMボードは非常に手頃な価格で、柔軟性のある小型コンピュータです。安価に購入でき、すべてのリソースをノードに集中させるように設定できるため効率的であり、消費電力が少なく、物理的に小さいためどんな家庭にも目立たずに設置できることから、イーサリアムノードを実行するための良い選択肢となります。また、Raspberry PiのMicroSDにビルド済みのイメージをフラッシュするだけでよく、ソフトウェアのダウンロードやビルドが不要なため、ノードを立ち上げるのが非常に簡単です。

## 仕組み {#how-does-it-work}

Raspberry Piのメモリカードには、ビルド済みのイメージがフラッシュされます。このイメージには、イーサリアムノードを実行するために必要なすべてが含まれています。フラッシュされたカードがあれば、ユーザーはRaspberry Piの電源を入れるだけです。ノードの実行に必要なすべてのプロセスが自動的に開始されます。これが機能するのは、メモリカードにLinuxベースのオペレーティングシステム(OS)が含まれており、その上でシステムレベルのプロセスが自動的に実行されて、ユニットがイーサリアムノードに変わるためです。

Ethereum on Armのイメージは、イーサリアムノードの実行に最適化された64ビットLinuxディストリビューションに基づいており、ビルド済みのイーサリアムクライアントが含まれています。

**イメージは、環境のセットアップやNVMeディスクのフォーマットからイーサリアムソフトウェアのインストールまで、必要なすべての手順を処理します**。

## 実行クライアントとコンセンサス・クライアントに関する注意 {#note-on-execution-and-consensus-clients}

Ethereum on Armのイメージには、ビルド済みの実行クライアントとコンセンサス・クライアントがサービスとして含まれています。イーサリアムノードでは、両方のクライアントが同期して実行されている必要があります。イメージをダウンロードしてフラッシュし、サービスを開始するだけで済みます。イメージには、いくつかの実行クライアント(Geth、Nethermind、Besu、Erigon、Rethなど)とコンセンサス・クライアント(Lighthouse、Prysm、Teku、Nimbus、Lodestarなど)がプリロードされています。現在のリストについては、[Ethereum on Armのドキュメント](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/running-a-node/managing-clients.html)を参照してください。

それぞれ1つずつ選択して実行する必要があります。すべての実行クライアントは、すべてのコンセンサス・クライアントと互換性があります。このチュートリアルでは、GethとLighthouseを使用します。

## イメージのダウンロード {#downloading-the-image}

Ethereum on Armのイメージは、実行クライアントとコンセンサス・クライアントの両方を自動的にインストールしてセットアップし、互いに通信してイーサリアムネットワークに接続するように構成する「プラグアンドプレイ」イメージです。ユーザーは、簡単なコマンドを使用してプロセスを開始するだけです。

[Ethereum on Armのダウンロードページ](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/getting-started/installation.html#image-downloads)から、お使いのボード用の最新イメージをダウンロードします。ダウンロードページには、各イメージのSHA256チェックサムも記載されています。ダウンロードしたファイルをそれと照合して検証します。

```sh
# ダウンロードしたイメージを含むディレクトリから
sha256sum ethonarm_rpi5_<version>.img.zip
# 出力をダウンロードページのチェックサムと比較する
```

## MicroSDのフラッシュ {#flashing-the-microsd}

Raspberry Piに使用するMicroSDカードは、フラッシュできるように、まずデスクトップまたはノートパソコンに挿入する必要があります。次に、以下のターミナルコマンドを実行して、ダウンロードしたイメージをSDカードにフラッシュします。

```shell
# MicroSDカードの名前を確認する
sudo fdisk -l

>> sdxxx
```

次のコマンドには、イメージをカードに書き込む前にカードの既存のコンテンツを完全に消去する`dd`が含まれているため、名前を正確に指定することが非常に重要です。続行するには、zip圧縮されたイメージが含まれているディレクトリに移動します。

```shell
# イメージを解凍してフラッシュする
unzip ethonarm_rpi5_<version>.img.zip
sudo dd bs=1M if=ethonarm_rpi5_<version>.img of=/dev/<sdxx> conv=fdatasync status=progress
```

これでカードがフラッシュされたので、Raspberry Piに挿入できます。

## ノードの起動 {#start-the-node}

SDカードをRaspberry Piに挿入した状態で、イーサネットケーブルとNVMeディスクを接続し、電源を入れます。OSが起動し、NVMeディスクのフォーマットやクライアントソフトウェアのインストールなど、Raspberry Piをイーサリアムノードにするための事前設定されたタスクの実行が自動的に開始されます。これにはおそらく10〜15分かかり、完了するとボードは自動的に再起動します。この間は電源を切らないでください。

すべてのインストールと設定が完了したら、ssh接続経由でデバイスにログインするか、モニターとキーボードがボードに接続されている場合はターミナルを直接使用してログインします。ノードの起動に必要な権限を持つ`ethereum`アカウントを使用してログインします。

```shell
User: ethereum
Password: ethereum
```

初回ログイン時にデフォルトのパスワードを変更するように求められます。ノードにアクセスできる人なら誰でもデフォルトのパスワードでログインできてしまうため、必ず変更してください。システムのファイアウォールはデフォルトで無効になっているため、ノードにパブリックIPアドレスがある場合は、[Ethereum on Armのセキュリティガイド](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/system/security.html)を参照して有効にしてください。

最初にコンセンサス・クライアントを起動します。Lighthouseがピアを見つけて接続できるように、ルーターのポート9000 (TCPおよびUDP)を開きます。次に、lighthouseサービスを有効にして起動し、再起動後も自動的に起動するようにします。

```sh
sudo systemctl enable --now lighthouse-beacon
```

ログを使用してクライアントを確認します。

```sh
sudo journalctl -u lighthouse-beacon -f
```

次に、実行クライアントを起動します。Gethがピアを見つけて接続できるように、ルーターのポート30303 (TCPおよびUDP)を開きます。次に、gethサービスを有効にして起動します。

```sh
sudo systemctl enable --now geth
```

ログを確認することで、実行されていることを確認できます。

```sh
sudo journalctl -u geth -f
```

コンセンサス・クライアントはチェックポイント同期を使用するため、数分で同期されることに注意してください。実行クライアントにはさらに時間がかかり、数時間かかる可能性があります。両方のクライアントは同時に実行されます。コンセンサス・クライアントは実行クライアントにどのブロックがチェーンの先頭であるかを伝え、実行クライアントはそこまでのブロックをダウンロードして検証します。

GethとLighthouseのサービスが実行され、同期されると、Raspberry Piはイーサリアムノードになります！イーサリアムネットワークとのやり取りには、ポート8545でGethクライアントにアタッチできるGethのJavaScriptコンソールを使用するのが最も一般的です。Curlなどのリクエストツールを使用して、JSONオブジェクトとしてフォーマットされたコマンドを送信することも可能です。詳細は[Gethのドキュメント](https://geth.ethereum.org/)を参照してください。

イメージにはGrafanaダッシュボードも含まれており、上級ユーザーはブラウザで`ipaddress:3000`に移動することで、ノードの健全性を監視するために使用できます。

## バリデータ {#validators}

オプションで、コンセンサス・クライアントにバリデータを追加することもできます。バリデータソフトウェアを使用すると、ノードがコンセンサスに積極的に参加し、ネットワークに暗号経済的セキュリティを提供できるようになります。この作業の報酬としてETHを受け取ります。バリデータを実行するには、まず32 ETHを用意し、デポジット・コントラクトにデポジットする必要があります。デポジットは、[Launchpad](https://launchpad.ethereum.org/)のステップバイステップガイドに従って行うことができます。これはデスクトップ/ノートパソコンで行いますが、キーは生成しないでください。これはRaspberry Piで直接行うことができます。

[ethstaker-deposit-cli](https://github.com/ethstaker/ethstaker-deposit-cli)ツールは、バリデータキーを生成します。現在のイメージには含まれていますが、古いイメージを実行している場合は、最初にインストールしてください。次に、`<YOUR_ETH_ADDRESS>`を引き出しを受け取るアドレスに置き換えて、デポジットキーを生成します。

```sh
sudo apt-get update
sudo apt-get install ethstaker-deposit-cli
cd && deposit new-mnemonic --num_validators 1 --execution_address <YOUR_ETH_ADDRESS> --chain mainnet
```

(または、エアギャップマシンで実行するために[ethstaker-deposit-cli](https://github.com/ethstaker/ethstaker-deposit-cli)をダウンロードし、そこで`deposit new-mnemonic`コマンドを実行します)

ニーモニックフレーズは安全に保管してください！上記のコマンドにより、`validator_keys`ディレクトリにバリデータキーとデポジットデータファイルの2つのファイルが生成されました。デポジットデータはLaunchpadにアップロードする必要があるため、Raspberry Piからデスクトップ/ノートパソコンにコピーする必要があります。これは、ssh接続またはその他のコピー/ペースト方法を使用して行うことができます。

Launchpadを実行しているコンピュータでデポジットデータファイルが利用可能になったら、Launchpad画面の`+`にドラッグアンドドロップできます。画面の指示に従って、デポジット・コントラクトにトランザクションを送信します。

Raspberry Piに戻り、バリデータを起動できます。これには、バリデータキーのインポート、報酬を収集するアドレスの設定、そして事前設定されたバリデータプロセスの開始が必要です。以下の例はLighthouseのものです。他のコンセンサス・クライアントの手順は、[Ethereum on Armのドキュメント](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/staking/solo-staking.html)で確認できます。

```shell
# バリデータキーをインポートする
lighthouse account validator import --directory=/home/ethereum/validator_keys

# 報酬アドレスを設定する（<YOUR_ETH_ADDRESS>をあなたのアドレスに置き換える）
sudo sed -i 's/changeme/<YOUR_ETH_ADDRESS>/' /etc/ethereum/lighthouse-validator.conf

# バリデータを起動する
sudo systemctl enable --now lighthouse-validator
```

おめでとうございます。これで、Raspberry Pi上で完全なイーサリアムノードとバリデータが実行されるようになりました！

## 詳細情報 {#more-details}

このページでは、Raspberry Piを使用してGeth-ライトハウスノードとバリデータをセットアップする方法の概要を説明しました。より詳細な手順は、[Ethereum-on-Armのウェブサイト](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)で確認できます。

## フィードバックのお願い {#feedback-appreciated}

Raspberry Piには膨大なユーザーベースがあり、イーサリアムネットワークの健全性に非常に良い影響を与える可能性があると私たちは考えています。
このチュートリアルの詳細を掘り下げ、テストネットでの実行を試し、[Ethereum on ArmのGitHub](https://github.com/EOA-Blockchain-Labs/ethereumonarm)をチェックし、フィードバックを提供し、Issueやプルリクエストを提起して、テクノロジーとドキュメントの進歩にご協力ください！

## 参考文献 {#references}

1. https://ethereum-on-arm-documentation.readthedocs.io/en/latest/
2. https://wikipedia.org/wiki/Port_forwarding
3. https://prometheus.io
4. https://grafana.com
5. https://geth.ethereum.org
6. https://lighthouse.sigmaprime.io
7. https://github.com/ethstaker/ethstaker-deposit-cli
