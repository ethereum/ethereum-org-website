---
title: "ローカルのマルチクライアント・テストネットでdappを開発およびテストする方法"
description: "このガイドでは、マルチクライアントのローカルなイーサリアム・テストネットをインスタンス化して構成する方法を説明し、その後、テストネットを使用してdappをデプロイおよびテストする方法を説明します。"
author: "テディ・ミティク"
tags:
  [
    "クライアント",
    "ノード",
    "スマート・コントラクト",
    "コンポーザビリティ",
    "コンセンサス・レイヤー",
    "実行レイヤー",
    "テスト",
  ]
skill: intermediate
breadcrumb: "マルチクライアント・テストネット"
lang: ja
published: 2023-04-11
---

## はじめに {#introduction}

このガイドでは、構成可能なローカルのイーサリアム・テストネットをインスタンス化し、そこにスマート・コントラクトをデプロイして、テストネットを使用して分散型アプリケーション (dapp) のテストを実行するプロセスを説明します。このガイドは、ライブのテストネットやメインネットにデプロイする前に、さまざまなネットワーク構成に対してローカルでdappを開発およびテストしたいdapp開発者向けに設計されています。

このガイドでは、以下のことを行います。

- [Kurtosis](https://www.kurtosis.com/)を使用して、[`ethereum-package`](https://github.com/ethpandaops/ethereum-package)でローカルのイーサリアム・テストネットをインスタンス化する。
- Hardhatのdapp開発環境をローカルのテストネットに接続し、dappをコンパイル、デプロイ、およびテストする。
- ノード数や特定のEL/CLクライアントのペアリングなどのパラメータを含め、ローカルのテストネットを構成し、さまざまなネットワーク構成に対する開発およびテストのワークフローを可能にする。

### Kurtosisとは？ {#what-is-kurtosis}

[Kurtosis](https://www.kurtosis.com/)は、マルチコンテナのテスト環境を構成するために設計されたコンポーザブルなビルドシステムです。特に、ブロックチェーンのテストネットなど、動的なセットアップロジックを必要とする再現可能な環境を開発者が作成できるようにします。

このガイドでは、[ethPandaOps](https://ethpandaops.io/)によって保守されているKurtosisの`ethereum-package`が、ローカルのイーサリアム・テストネットを立ち上げます。これは、[`geth`](https://geth.ethereum.org/)などの主要な実行レイヤー (EL) クライアント、および[`teku`](https://consensys.io/teku)、[`lighthouse`](https://lighthouse.sigmaprime.io/)、[`lodestar`](https://lodestar.chainsafe.io/)などのコンセンサス・レイヤー (CL) クライアントをすべてサポートしています。このパッケージは、Hardhat NetworkやAnvilなどのフレームワークにおけるネットワークの、構成可能でコンポーザブルな代替手段として機能します。Kurtosisは、使用するテストネットに対するより優れた制御と柔軟性を開発者に提供します。これが、イーサリアムのクライアントチームがネットワークアップグレードのテストにKurtosisを使用する主な理由です。

## Kurtosisのセットアップ {#setting-up-kurtosis}

先に進む前に、以下の準備ができていることを確認してください。

- ローカルマシンに[Dockerエンジンをインストールして起動している](https://docs.kurtosis.com/install/#i-install--start-docker)こと
- [Kurtosis CLIをインストールしている](https://docs.kurtosis.com/install#ii-install-the-cli)こと (すでにCLIがインストールされている場合は、最新リリースにアップグレードしていること)
- [Node.js](https://nodejs.org/en)をインストールしていること (dapp環境用)

## ローカルのイーサリアム・テストネットのインスタンス化 {#instantiate-testnet}

ローカルのイーサリアム・テストネットを立ち上げるには、以下を実行します。

```sh
kurtosis run --enclave local-eth-testnet github.com/ethpandaops/ethereum-package
```

注: このコマンドは、`--enclave`フラグを使用してネットワークに「local-eth-testnet」という名前を付けます。

Kurtosisは、命令を解釈、検証、そして実行する際に、内部で行っている手順を出力します。最後に、作成したエンクレーブの概要を出力します。この概要には、**ファイルアーティファクト**のリストと**ユーザーサービス**のリストが含まれます。デフォルトの構成では、ユーザーサービスには単一のノードが含まれます。

- `el-1-geth-lighthouse`: `geth`実行クライアント
- `cl-1-lighthouse-geth`: `lighthouse`ビーコン・ノード
- `vc-1-geth-lighthouse`: `lighthouse`バリデータクライアント

各サービスは、公開しているポートと、それぞれがマッピングされているローカルポートとともにリストされます。たとえば、`el-1-geth-lighthouse`サービスの`rpc`ポートは、dappツールが使用するJSON-RPCエンドポイントです。正確なサービスとポート番号は、お使いのマシンによって異なります。

以下のコマンドを実行することで、いつでもこの概要を再度表示できます。

```sh
kurtosis enclave inspect local-eth-testnet
```

おめでとうございます！Kurtosisを使用して、Docker上でCL (`lighthouse`) とELクライアント (`geth`) を備えたローカルのイーサリアム・テストネットをインスタンス化しました。

### 振り返り {#review-instantiate-testnet}

このセクションでは、[GitHub上でリモートホストされている`ethereum-package`](https://github.com/ethpandaops/ethereum-package)を使用するようにKurtosisに指示するコマンドを実行し、Kurtosisの[エンクレーブ](https://docs.kurtosis.com/advanced-concepts/enclaves/)内にローカルのイーサリアム・テストネットを立ち上げました。エンクレーブ内には、「ファイルアーティファクト」と「ユーザーサービス」の両方があります。

エンクレーブ内の[ファイルアーティファクト](https://docs.kurtosis.com/advanced-concepts/files-artifacts/)には、ジェネシスファイルやバリデータキーなど、ELおよびCLクライアントをブートストラップするために生成および利用されるすべてのデータが含まれます。ジェネシスデータは、[ethereum-genesis-generator](https://github.com/ethpandaops/ethereum-genesis-generator)を使用して作成されました。

ユーザーサービスには、エンクレーブ内で動作しているすべてのコンテナ化されたサービスが表示されます。ELクライアントとCLクライアントの両方を備えた単一のノードが作成されていることがわかります。

## dapp開発環境をローカルのイーサリアム・テストネットに接続する {#connect-your-dapp}

### dapp開発環境のセットアップ {#set-up-dapp-env}

ローカルのテストネットが稼働したので、dapp開発環境を接続してローカルのテストネットを使用できるようになりました。このガイドでは、Hardhatフレームワークを使用して、ブラックジャックのdappをローカルのテストネットにデプロイします。

dapp開発環境をセットアップするには、サンプルdappが含まれるリポジトリをクローンし、その依存関係をインストールします。以下を実行してください。

```sh
git clone https://github.com/kurtosis-tech/awesome-kurtosis.git
cd awesome-kurtosis/smart-contract-example
npm install --legacy-peer-deps
```

サンプルプロジェクトのHardhatプラグインの一部が、競合するピア依存関係のバージョンを宣言しているため、`--legacy-peer-deps`フラグが必要です。

ここで使用する[smart-contract-example](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example)フォルダには、[Hardhat](https://hardhat.org/)フレームワークを使用するdapp開発者向けの一般的なセットアップが含まれています。

- [`contracts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/contracts)には、ブラックジャックdapp用のいくつかのシンプルなスマート・コントラクトが含まれています。
- [`scripts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/scripts)には、トークンコントラクトをローカルのイーサリアム・ネットワークにデプロイするためのスクリプトが含まれています。
- [`test/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/test)には、ブラックジャックdappの各プレイヤーに1000トークンがミントされていることを確認するための、トークンコントラクト用のシンプルな.jsテストが含まれています。
- [`hardhat.config.ts`](https://github.com/kurtosis-tech/awesome-kurtosis/blob/main/smart-contract-example/hardhat.config.ts)は、Hardhatのセットアップを構成します。

### ローカルのテストネットを使用するようにHardhatを構成する {#configure-hardhat}

dapp開発環境がセットアップされたので、次にKurtosisを使用して生成されたローカルのイーサリアム・テストネットを使用するようにHardhatを接続します。まず、実行クライアントのJSON-RPCエンドポイントのローカルアドレスを見つけます。

```sh
kurtosis port print local-eth-testnet el-1-geth-lighthouse rpc
```

出力は`http://127.0.0.1:32769`のようなURLになります。ポート番号は異なります。`hardhat.config.ts`構成ファイルの`localnet`構造体にある`<PORT>`を、このポートに置き換えてください。

`hardhat.config.ts`の例:

```js
localnet: {
  url: 'http://127.0.0.1:<PORT>',//TODO: <PORT> をETHネットワークのKurtosisパッケージによって生成されたノードURIのポートに置き換えてください
  // これらは、eth-network-packageによって作成された事前資金提供済みテストアカウントに関連付けられた秘密鍵です
  //https://github.com/ethpandaops/ethereum-package/blob/main/src/prelaunch_data_generator/genesis_constants/genesis_constants.star
  accounts: [
    "bcdf20249abf0ed6d944c0288fad489e33f66b3960d9e6229c1cd214ed3bbe31",
    "53321db7c1e331d93a11a41d16f004d7ff63972ec8ec7c25db329728ceeb1710",
    "ab63b23eb7941c1251757e24b3d2350d2bc05c3c388d06f8fe6feafefb1e8c70",
    "5d2344259f42259f82d2c140aa66102ba89b57b4883ee441a8b312622bd42491",
    "27515f805127bebad2fb9b183508bdacb8c763da16f54e0678b16e8f28ef3fff",
    "7ff1a4c1d57e5e784d327c4c7651e952350bc271f156afb3d00d20f5ef924856",
  ],
},
```

これらの秘密鍵は、公に知られているテストキーです。メインネットやパブリックネットワークでは絶対に使用しないでください。

ファイルを保存すると、Hardhatのdapp開発環境がローカルのイーサリアム・テストネットに接続されます！以下のコマンドを実行して、テストネットが機能していることを確認できます。

```sh
npx hardhat balances --network localnet
```

出力には、上記のアカウントそれぞれのアドレスと残高がリストされます。たとえば、最初の行は次のようになります。

```
0x8943545177806ED17B9F23F0a21ee5948eCaa776 has balance <a large balance>
```

これにより、Hardhatがローカルのテストネットを使用しており、`ethereum-package`によって作成された事前資金提供済みのアカウントを検出していることが確認できます。

### ローカルでdappをデプロイおよびテストする {#deploy-and-test-dapp}

dapp開発環境がローカルのイーサリアム・テストネットに完全に接続されたので、ローカルのテストネットを使用してdappに対する開発およびテストのワークフローを実行できるようになりました。

ローカルでのプロトタイピングと開発のために`ChipToken.sol`スマート・コントラクトをコンパイルしてデプロイするには、以下を実行します。

```sh
npx hardhat compile
npx hardhat run scripts/deploy.ts --network localnet
```

出力は次のようになります。

```
ChipToken deployed to: 0xAb2A01BC351770D09611Ac80f1DE076D56E0487d
```

次に、ローカルのdappに対して`ChipToken.js`テストを実行し、ブラックジャックdappの各プレイヤーに1000トークンがミントされていることを確認してみましょう。サンプルテストはまだethers v5の`deployed()`関数を使用していますが、ethers v6では`waitForDeployment()`に置き換えられているため、最初に更新してください。

```sh
sed -i.bak 's/\.deployed()/.waitForDeployment()/' test/ChipToken.js
```

その後、テストを実行します。

```sh
npx hardhat test --network localnet
```

出力は次のようになります。

```
ChipToken
    mint
      ✔ should mint 1000 chips for PLAYER ONE

  1 passing (654ms)
```

### 振り返り {#review-dapp-workflows}

現時点で、dapp開発環境をセットアップし、Kurtosisによって作成されたローカルのイーサリアム・ネットワークに接続し、dappをコンパイル、デプロイして、簡単なテストを実行しました。

次に、さまざまなネットワーク構成の下でdappをテストするために、基盤となるネットワークを構成する方法を見ていきましょう。

## ローカルのイーサリアム・テストネットの構成 {#configure-testnet}

### クライアント構成とノード数の変更 {#configure-client-config-and-num-nodes}

ローカルのイーサリアム・テストネットは、開発またはテストしたいシナリオや特定のネットワーク構成に応じて、異なるELおよびCLクライアントのペアや、さまざまな数のノードを使用するように構成できます。つまり、一度セットアップすれば、カスタマイズされたローカルのテストネットを立ち上げ、それを使用してさまざまなネットワーク構成の下で同じワークフロー (デプロイ、テストなど) を実行し、すべてが期待どおりに機能することを確認できます。変更可能なその他のパラメータの詳細については、[`ethereum-package`の構成ドキュメント](https://github.com/ethpandaops/ethereum-package#configuration)を参照してください。

試してみましょう！YAMLファイルを介して、`ethereum-package`にさまざまな構成オプションを渡すことができます。このネットワークパラメータファイルは、Kurtosisがローカルのイーサリアム・ネットワークをセットアップするために使用する特定の構成を提供します。

異なるEL/CLペアを持つ3つのノードを立ち上げる、`network_params.yaml`というファイルを作成します。

- ノード1: `geth`/`lighthouse`
- ノード2: `geth`/`lodestar`
- ノード3: `geth`/`teku`

この構成により、dappをテストするためのイーサリアム・ノード実装の異種ネットワークが作成されます。構成ファイルは次のようになります。

```yaml
participants:
  - el_type: geth
    cl_type: lighthouse
  - el_type: geth
    cl_type: lodestar
  - el_type: geth
    cl_type: teku
network_params:
  seconds_per_slot: 12
```

`participants`の各エントリはネットワーク内のノードにマッピングされるため、3つの`participants`エントリは、ネットワーク内に3つのノードを立ち上げるようにKurtosisに指示します。各エントリでは、その特定のノードに使用されるELおよびCLペアを指定できます。指定しないパラメータは、デフォルト値を保持します。

`network_params`構造体は、各ノードのジェネシスファイルを作成するために使用されるネットワーク設定や、ネットワークのスロットあたりの秒数などのその他の設定を構成します。

パラメータファイルを保存し、それを使用して以下のコマンドを実行し、Kurtosisパッケージを実行します。

```sh
kurtosis clean -a && kurtosis run --enclave local-eth-testnet github.com/ethpandaops/ethereum-package --args-file ./network_params.yaml
```

注: ここでは、新しいテストネットを起動する前に、古いテストネットとそのコンテンツを破棄するようにKurtosisに指示するために、`kurtosis clean -a`コマンドが使用されています。

再び、Kurtosisはしばらく動作し、実行されている個々の手順を出力します。最終的に、エンクレーブの概要を出力します。今回は、ユーザーサービスに3つのノードが含まれます。たとえば、実行クライアントの`el-1-geth-lighthouse`、`el-2-geth-lodestar`、`el-3-geth-teku`と、それに対応するコンセンサスおよびバリデータクライアントです。

おめでとうございます！ローカルのテストネットを1つではなく3つのノードを持つように正常に構成しました。dappに対して以前と同じワークフロー (デプロイとテスト) を実行するには、`hardhat.config.ts`構成ファイルの`localnet`構造体にある`<PORT>`を、新しい3ノードのローカル・テストネット内の任意の`el-<num>-...`サービスの`rpc`ポートに置き換えて、以前と同じ操作を実行します。

## おわりに {#conclusion}

以上です！この短いガイドをまとめると、以下のことを行いました。

- Kurtosisを使用して、Docker上にローカルのイーサリアム・テストネットを作成した。
- ローカルのdapp開発環境をローカルのイーサリアム・ネットワークに接続した。
- ローカルのイーサリアム・ネットワーク上でdappをデプロイし、それに対して簡単なテストを実行した。
- 基盤となるイーサリアム・ネットワークを3つのノードを持つように構成した。

うまくいった点、改善できる点、または質問など、皆様からのご意見をお待ちしております。[GitHub](https://github.com/kurtosis-tech/kurtosis/issues/new/choose)からお気軽にお問い合わせください！

### その他の例とガイド {#other-examples-guides}

[クイックスタート](https://docs.kurtosis.com/quickstart)や、[awesome-kurtosisリポジトリ](https://github.com/kurtosis-tech/awesome-kurtosis)にあるその他の例もぜひチェックしてみてください。

`ethereum-package`は、トランザクション・スパマー (トランザクションをシミュレートするため)、ブロック・エクスプローラー、接続されたGrafanaおよびPrometheusインスタンスなど、ネットワークと並行して追加のサービスを開始することもできます。これらを有効にするには、[パッケージのドキュメント](https://github.com/ethpandaops/ethereum-package#configuration)で説明されているように、パラメータファイルの`additional_services`の下にリストします。
