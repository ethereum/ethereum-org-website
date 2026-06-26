---
title: "ローカルのマルチクライアント・テストネットでdappを開発およびテストする方法"
description: "このガイドでは、まずマルチクライアントのローカルなイーサリアムテストネットをインスタンス化して構成する方法を説明し、その後、そのテストネットを使用してdappをデプロイおよびテストします。"
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

このガイドでは、構成可能なローカルのイーサリアムテストネットをインスタンス化し、そこにスマート・コントラクトをデプロイして、テストネットを使用して分散型アプリケーション (dapp) のテストを実行するプロセスを説明します。このガイドは、ライブのテストネットやメインネットにデプロイする前に、さまざまなネットワーク構成に対してローカルでdappを開発およびテストしたいdapp開発者を対象としています。

このガイドでは、以下のことを行います。

- [Kurtosis](https://www.kurtosis.com/)を使用して、[`eth-network-package`](https://github.com/kurtosis-tech/eth-network-package)でローカルのイーサリアムテストネットをインスタンス化する。
- Hardhatのdapp開発環境をローカルのテストネットに接続し、dappをコンパイル、デプロイ、およびテストする。
- ノード数や特定のEL/CLクライアントのペアリングなどのパラメーターを含め、ローカルのテストネットを構成し、さまざまなネットワーク構成に対する開発およびテストのワークフローを可能にする。

### Kurtosisとは？ {#what-is-kurtosis}

[Kurtosis](https://www.kurtosis.com/)は、マルチコンテナのテスト環境を構成するために設計されたコンポーザブルなビルドシステムです。特に、ブロックチェーンのテストネットなど、動的なセットアップロジックを必要とする再現可能な環境を開発者が作成できるようにします。

このガイドでは、Kurtosisのeth-network-packageを使用して、[`geth`](https://geth.ethereum.org/)実行レイヤー (EL) クライアント、および[`teku`](https://consensys.io/teku)、[`lighthouse`](https://lighthouse.sigmaprime.io/)、[`lodestar`](https://lodestar.chainsafe.io/)コンセンサス・レイヤー (CL) クライアントをサポートするローカルのイーサリアムテストネットを立ち上げます。このパッケージは、Hardhat Network、Ganache、Anvilなどのフレームワークにおけるネットワークの、構成可能でコンポーザブルな代替手段として機能します。Kurtosisは、使用するテストネットに対するより優れた制御と柔軟性を開発者に提供します。これが、[イーサリアム財団がマージのテストにKurtosisを使用し](https://www.kurtosis.com/blog/testing-the-ethereum-merge)、ネットワークアップグレードのテストに引き続き使用している主な理由です。

## Kurtosisのセットアップ {#setting-up-kurtosis}

先に進む前に、以下の準備ができていることを確認してください。

- ローカルマシンに[Dockerエンジンをインストールして起動している](https://docs.kurtosis.com/install/#i-install--start-docker)こと
- [Kurtosis CLIをインストールしている](https://docs.kurtosis.com/install#ii-install-the-cli)こと (すでにCLIがインストールされている場合は、最新リリースにアップグレードしていること)
- [Node.js](https://nodejs.org/en)、[yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)、および[npx](https://www.npmjs.com/package/npx)をインストールしていること (dapp環境用)

## ローカルのイーサリアムテストネットのインスタンス化 {#instantiate-testnet}

ローカルのイーサリアムテストネットを立ち上げるには、以下を実行します。

```python
kurtosis --enclave local-eth-testnet run github.com/kurtosis-tech/eth-network-package
```

注: このコマンドは、`--enclave`フラグを使用してネットワークに「local-eth-testnet」という名前を付けます。

Kurtosisは、命令を解釈、検証、実行する際に、内部で実行している手順を出力します。最後に、以下のような出力が表示されるはずです。

```python
INFO[2023-04-04T18:09:44-04:00] ======================================================
INFO[2023-04-04T18:09:44-04:00] ||          Created enclave: local-eth-testnet      ||
INFO[2023-04-04T18:09:44-04:00] ======================================================
Name:            local-eth-testnet
UUID:            39372d756ae8
Status:          RUNNING
Creation Time:   Tue, 04 Apr 2023 18:09:03 EDT

========================================= Files Artifacts =========================================
UUID           Name
d4085a064230   cl-genesis-data
1c62cb792e4c   el-genesis-data
bd60489b73a7   genesis-generation-config-cl
b2e593fe5228   genesis-generation-config-el
d552a54acf78   geth-prefunded-keys
5f7e661eb838   prysm-password
054e7338bb59   validator-keystore-0

========================================== User Services ==========================================
UUID           Name                                           Ports                                         Status
e20f129ee0c5   cl-client-0-beacon                             http: 4000/tcp -> <http://127.0.0.1:54261>    RUNNING
                                                              metrics: 5054/tcp -> <http://127.0.0.1:54262>
                                                              tcp-discovery: 9000/tcp -> 127.0.0.1:54263
                                                              udp-discovery: 9000/udp -> 127.0.0.1:60470
a8b6c926cdb4   cl-client-0-validator                          http: 5042/tcp -> 127.0.0.1:54267             RUNNING
                                                              metrics: 5064/tcp -> <http://127.0.0.1:54268>
d7b802f623e8   el-client-0                                    engine-rpc: 8551/tcp -> 127.0.0.1:54253       RUNNING
                                                              rpc: 8545/tcp -> 127.0.0.1:54251
                                                              tcp-discovery: 30303/tcp -> 127.0.0.1:54254
                                                              udp-discovery: 30303/udp -> 127.0.0.1:53834
                                                              ws: 8546/tcp -> 127.0.0.1:54252
514a829c0a84   prelaunch-data-generator-1680646157905431468   <none>                                        STOPPED
62bd62d0aa7a   prelaunch-data-generator-1680646157915424301   <none>                                        STOPPED
05e9619e0e90   prelaunch-data-generator-1680646157922872635   <none>                                        STOPPED

```

おめでとうございます！Kurtosisを使用して、Docker上でCL (`lighthouse`) およびELクライアント (`geth`) を備えたローカルのイーサリアムテストネットをインスタンス化しました。

### レビュー {#review-instantiate-testnet}

このセクションでは、[GitHub上でリモートホストされている`eth-network-package`](https://github.com/kurtosis-tech/eth-network-package)を使用して、Kurtosisの[エンクレーブ (Enclave)](https://docs.kurtosis.com/advanced-concepts/enclaves/)内にローカルのイーサリアムテストネットを立ち上げるようKurtosisに指示するコマンドを実行しました。エンクレーブ内には、「ファイルアーティファクト (file artifacts)」と「ユーザーサービス (user services)」の両方があります。

エンクレーブ内の[ファイルアーティファクト](https://docs.kurtosis.com/advanced-concepts/files-artifacts/)には、ELおよびCLクライアントをブートストラップするために生成および利用されるすべてのデータが含まれています。このデータは、この[Dockerイメージ](https://github.com/ethpandaops/ethereum-genesis-generator)から構築された`prelaunch-data-generator`サービスを使用して作成されました。

ユーザーサービスには、エンクレーブ内で動作しているすべてのコンテナ化されたサービスが表示されます。ELクライアントとCLクライアントの両方を備えた単一のノードが作成されていることがわかります。

## dapp開発環境をローカルのイーサリアムテストネットに接続する {#connect-your-dapp}

### dapp開発環境のセットアップ {#set-up-dapp-env}

ローカルのテストネットが稼働したので、dapp開発環境を接続してローカルのテストネットを使用できるようになりました。このガイドでは、Hardhatフレームワークを使用して、ブラックジャックのdappをローカルのテストネットにデプロイします。

dapp開発環境をセットアップするには、サンプルdappが含まれるリポジトリをクローンし、その依存関係をインストールします。以下を実行してください。

```python
git clone https://github.com/kurtosis-tech/awesome-kurtosis.git && cd awesome-kurtosis/smart-contract-example && yarn
```

ここで使用する[smart-contract-example](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example)フォルダーには、[Hardhat](https://hardhat.org/)フレームワークを使用するdapp開発者向けの一般的なセットアップが含まれています。

- [`contracts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/contracts)には、ブラックジャックdapp用のいくつかのシンプルなスマート・コントラクトが含まれています。
- [`scripts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/scripts)には、トークンコントラクトをローカルのイーサリアムネットワークにデプロイするためのスクリプトが含まれています。
- [`test/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/test)には、ブラックジャックdappの各プレイヤーに1000トークンがミントされていることを確認するための、トークンコントラクト用のシンプルな.jsテストが含まれています。
- [`hardhat.config.ts`](https://github.com/kurtosis-tech/awesome-kurtosis/blob/main/smart-contract-example/hardhat.config.ts)は、Hardhatのセットアップを構成します。

### ローカルのテストネットを使用するようにHardhatを構成する {#configure-hardhat}

dapp開発環境のセットアップが完了したら、次にHardhatを接続して、Kurtosisを使用して生成されたローカルのイーサリアムテストネットを使用するようにします。これを実現するには、`hardhat.config.ts`構成ファイル内の`localnet`構造体にある`<$YOUR_PORT>`を、任意の`el-client-<num>`サービスから出力されたRPC URIのポートに置き換えます。このサンプルの場合、ポートは`64248`になります。あなたのポートは異なる場合があります。

`hardhat.config.ts`の例:

```js
localnet: {
url: 'http://127.0.0.1:<$YOUR_PORT>',// TODO: $YOUR_PORT をETHネットワークのKurtosisパッケージによって生成されたノードURIのポートに置き換えてください

// これらは、eth-network-packageによって作成された、事前に資金が供給されたテストアカウントに関連付けられた秘密鍵です
// <https://github.com/kurtosis-tech/eth-network-package/blob/main/src/prelaunch_data_generator/genesis_constants/genesis_constants.star>
accounts: [
    "ef5177cd0b6b21c87db5a0bf35d4084a8a57a9d6a064f86d51ac85f2b873a4e2",
    "48fcc39ae27a0e8bf0274021ae6ebd8fe4a0e12623d61464c498900b28feb567",
    "7988b3a148716ff800414935b305436493e1f25237a2a03e5eebc343735e2f31",
    "b3c409b6b0b3aa5e65ab2dc1930534608239a478106acf6f3d9178e9f9b00b35",
    "df9bb6de5d3dc59595bcaa676397d837ff49441d211878c024eabda2cd067c9f",
    "7da08f856b5956d40a72968f93396f6acff17193f013e8053f6fbb6c08c194d6",
  ],
},
```

ファイルを保存すると、Hardhatのdapp開発環境がローカルのイーサリアムテストネットに接続されます！以下を実行することで、テストネットが機能していることを確認できます。

```python
npx hardhat balances --network localnet
```

出力は以下のようになります。

```python
0x878705ba3f8Bc32FCf7F4CAa1A35E72AF65CF766 has balance 10000000000000000000000000
0x4E9A3d9D1cd2A2b2371b8b3F489aE72259886f1A has balance 10000000000000000000000000
0xdF8466f277964Bb7a0FFD819403302C34DCD530A has balance 10000000000000000000000000
0x5c613e39Fc0Ad91AfDA24587e6f52192d75FBA50 has balance 10000000000000000000000000
0x375ae6107f8cC4cF34842B71C6F746a362Ad8EAc has balance 10000000000000000000000000
0x1F6298457C5d76270325B724Da5d1953923a6B88 has balance 10000000000000000000000000
```

これにより、Hardhatがローカルのテストネットを使用しており、`eth-network-package`によって作成された事前資金提供済みのアカウントを検出していることが確認できます。

### ローカルでのdappのデプロイとテスト {#deploy-and-test-dapp}

dapp開発環境がローカルのイーサリアムテストネットに完全に接続されたので、ローカルのテストネットを使用してdappに対する開発およびテストのワークフローを実行できるようになりました。

ローカルでのプロトタイピングと開発のために`ChipToken.sol`スマート・コントラクトをコンパイルしてデプロイするには、以下を実行します。

```python
npx hardhat compile
npx hardhat run scripts/deploy.ts --network localnet
```

出力は以下のようになります。

```python
ChipToken deployed to: 0xAb2A01BC351770D09611Ac80f1DE076D56E0487d
```

次に、ローカルのdappに対して`simple.js`テストを実行し、ブラックジャックdappの各プレイヤーに1000トークンがミントされていることを確認してみましょう。

出力は以下のようになります。

```python
npx hardhat test --network localnet
```

出力は以下のようになります。

```python
ChipToken
    mint
      ✔ should mint 1000 chips for PLAYER ONE

  1 passing (654ms)
```

### レビュー {#review-dapp-workflows}

この時点で、dapp開発環境をセットアップし、Kurtosisによって作成されたローカルのイーサリアムネットワークに接続し、dappをコンパイル、デプロイして、簡単なテストを実行しました。

次に、さまざまなネットワーク構成でdappをテストするために、基盤となるネットワークを構成する方法を見ていきましょう。

## ローカルのイーサリアムテストネットの構成 {#configure-testnet}

### クライアント構成とノード数の変更 {#configure-client-config-and-num-nodes}

ローカルのイーサリアムテストネットは、開発またはテストしたいシナリオや特定のネットワーク構成に応じて、異なるELおよびCLクライアントのペアや、さまざまな数のノードを使用するように構成できます。つまり、一度セットアップすれば、カスタマイズされたローカルのテストネットを立ち上げ、それを使用してさまざまなネットワーク構成で同じワークフロー (デプロイ、テストなど) を実行し、すべてが期待どおりに機能することを確認できます。変更可能なその他のパラメーターについて詳しくは、こちらのリンクをご覧ください。

試してみましょう！JSONファイルを介して、`eth-network-package`にさまざまな構成オプションを渡すことができます。このネットワークパラメーターのJSONファイルは、Kurtosisがローカルのイーサリアムネットワークをセットアップするために使用する特定の構成を提供します。

デフォルトの構成ファイルを取得し、異なるEL/CLペアを持つ2つのノードを立ち上げるように編集します。

- `geth`/`lighthouse`のノード1
- `geth`/`lodestar`のノード2
- `geth`/`teku`のノード3

この構成により、dappをテストするためのイーサリアムノード実装のヘテロジニアス (異種混合) ネットワークが作成されます。構成ファイルは以下のようになります。

```yaml
{
  "participants":
    [
      {
        "el_client_type": "geth",
        "el_client_image": "",
        "el_client_log_level": "",
        "cl_client_type": "lighthouse",
        "cl_client_image": "",
        "cl_client_log_level": "",
        "beacon_extra_params": [],
        "el_extra_params": [],
        "validator_extra_params": [],
        "builder_network_params": null,
      },
      {
        "el_client_type": "geth",
        "el_client_image": "",
        "el_client_log_level": "",
        "cl_client_type": "lodestar",
        "cl_client_image": "",
        "cl_client_log_level": "",
        "beacon_extra_params": [],
        "el_extra_params": [],
        "validator_extra_params": [],
        "builder_network_params": null,
      },
      {
        "el_client_type": "geth",
        "el_client_image": "",
        "el_client_log_level": "",
        "cl_client_type": "teku",
        "cl_client_image": "",
        "cl_client_log_level": "",
        "beacon_extra_params": [],
        "el_extra_params": [],
        "validator_extra_params": [],
        "builder_network_params": null,
      },
    ],
  "network_params":
    {
      "preregistered_validator_keys_mnemonic": "giant issue aisle success illegal bike spike question tent bar rely arctic volcano long crawl hungry vocal artwork sniff fantasy very lucky have athlete",
      "num_validator_keys_per_node": 64,
      "network_id": "3151908",
      "deposit_contract_address": "0x4242424242424242424242424242424242424242",
      "seconds_per_slot": 12,
      "genesis_delay": 120,
      "capella_fork_epoch": 5,
    },
}
```

各`participants`構造体はネットワーク内のノードにマッピングされるため、3つの`participants`構造体は、ネットワーク内に3つのノードを立ち上げるようKurtosisに指示します。各`participants`構造体により、その特定のノードに使用されるELおよびCLペアを指定できます。

`network_params`構造体は、各ノードのジェネシスファイルを作成するために使用されるネットワーク設定や、ネットワークのスロットあたりの秒数などのその他の設定を構成します。

編集したパラメーターファイルを任意のディレクトリ (以下の例ではデスクトップに保存されています) に保存し、それを使用して以下を実行することでKurtosisパッケージを実行します。

```python
kurtosis clean -a && kurtosis run --enclave local-eth-testnet github.com/kurtosis-tech/eth-network-package "$(cat ~/eth-network-params.json)"
```

注: ここでは、新しいテストネットを起動する前に、古いテストネットとそのコンテンツを破棄するようKurtosisに指示するために、`kurtosis clean -a`コマンドが使用されています。

ここでも、Kurtosisはしばらく動作し、実行されている個々の手順を出力します。最終的に、出力は以下のようになります。

```python
Starlark code successfully run. No output was returned.
INFO[2023-04-07T11:43:16-04:00] ==========================================================
INFO[2023-04-07T11:43:16-04:00] ||          Created enclave: local-eth-testnet          ||
INFO[2023-04-07T11:43:16-04:00] ==========================================================
Name:            local-eth-testnet
UUID:            bef8c192008e
Status:          RUNNING
Creation Time:   Fri, 07 Apr 2023 11:41:58 EDT

========================================= Files Artifacts =========================================
UUID           Name
cc495a8e364a   cl-genesis-data
7033fcdb5471   el-genesis-data
a3aef43fc738   genesis-generation-config-cl
8e968005fc9d   genesis-generation-config-el
3182cca9d3cd   geth-prefunded-keys
8421166e234f   prysm-password
d9e6e8d44d99   validator-keystore-0
23f5ba517394   validator-keystore-1
4d28dea40b5c   validator-keystore-2

========================================== User Services ==========================================
UUID           Name                                           Ports                                            Status
485e6fde55ae   cl-client-0-beacon                             http: 4000/tcp -> http://127.0.0.1:65010         RUNNING
                                                              metrics: 5054/tcp -> http://127.0.0.1:65011
                                                              tcp-discovery: 9000/tcp -> 127.0.0.1:65012
                                                              udp-discovery: 9000/udp -> 127.0.0.1:54455
73739bd158b2   cl-client-0-validator                          http: 5042/tcp -> 127.0.0.1:65016                RUNNING
                                                              metrics: 5064/tcp -> http://127.0.0.1:65017
1b0a233cd011   cl-client-1-beacon                             http: 4000/tcp -> 127.0.0.1:65021                RUNNING
                                                              metrics: 8008/tcp -> 127.0.0.1:65023
                                                              tcp-discovery: 9000/tcp -> 127.0.0.1:65024
                                                              udp-discovery: 9000/udp -> 127.0.0.1:56031
                                                              validator-metrics: 5064/tcp -> 127.0.0.1:65022
949b8220cd53   cl-client-1-validator                          http: 4000/tcp -> 127.0.0.1:65028                RUNNING
                                                              metrics: 8008/tcp -> 127.0.0.1:65030
                                                              tcp-discovery: 9000/tcp -> 127.0.0.1:65031
                                                              udp-discovery: 9000/udp -> 127.0.0.1:60784
                                                              validator-metrics: 5064/tcp -> 127.0.0.1:65029
c34417bea5fa   cl-client-2                                    http: 4000/tcp -> 127.0.0.1:65037                RUNNING
                                                              metrics: 8008/tcp -> 127.0.0.1:65035
                                                              tcp-discovery: 9000/tcp -> 127.0.0.1:65036
                                                              udp-discovery: 9000/udp -> 127.0.0.1:63581
e19738e6329d   el-client-0                                    engine-rpc: 8551/tcp -> 127.0.0.1:64986          RUNNING
                                                              rpc: 8545/tcp -> 127.0.0.1:64988
                                                              tcp-discovery: 30303/tcp -> 127.0.0.1:64987
                                                              udp-discovery: 30303/udp -> 127.0.0.1:55706
                                                              ws: 8546/tcp -> 127.0.0.1:64989
e904687449d9   el-client-1                                    engine-rpc: 8551/tcp -> 127.0.0.1:64993          RUNNING
                                                              rpc: 8545/tcp -> 127.0.0.1:64995
                                                              tcp-discovery: 30303/tcp -> 127.0.0.1:64994
                                                              udp-discovery: 30303/udp -> 127.0.0.1:58096
                                                              ws: 8546/tcp -> 127.0.0.1:64996
ad6f401126fa   el-client-2                                    engine-rpc: 8551/tcp -> 127.0.0.1:65003          RUNNING
                                                              rpc: 8545/tcp -> 127.0.0.1:65001
                                                              tcp-discovery: 30303/tcp -> 127.0.0.1:65000
                                                              udp-discovery: 30303/udp -> 127.0.0.1:57269
                                                              ws: 8546/tcp -> 127.0.0.1:65002
12d04a9dbb69   prelaunch-data-generator-1680882122181135513   <none>                                           STOPPED
5b45f9c0504b   prelaunch-data-generator-1680882122192182847   <none>                                           STOPPED
3d4aaa75e218   prelaunch-data-generator-1680882122201668972   <none>                                           STOPPED
```

おめでとうございます！ローカルのテストネットを1つではなく3つのノードを持つように正常に構成しました。dappに対して以前と同じワークフロー (デプロイとテスト) を実行するには、`hardhat.config.ts`構成ファイル内の`localnet`構造体にある`<$YOUR_PORT>`を、新しい3ノードのローカルテストネット内の任意の`el-client-<num>`サービスから出力されたRPC URIのポートに置き換えて、以前と同じ操作を実行します。

## おわりに {#conclusion}

以上です！この短いガイドをまとめると、以下のことを行いました。

- Kurtosisを使用して、Docker上にローカルのイーサリアムテストネットを作成した
- ローカルのdapp開発環境をローカルのイーサリアムネットワークに接続した
- ローカルのイーサリアムネットワーク上でdappをデプロイし、簡単なテストを実行した
- 基盤となるイーサリアムネットワークが3つのノードを持つように構成した

何がうまくいったか、何を改善できるかについてのご意見や、ご質問への回答など、皆様からのご連絡をお待ちしております。[GitHub](https://github.com/kurtosis-tech/kurtosis/issues/new/choose)または[メール](mailto:feedback@kurtosistech.com)でお気軽にお問い合わせください！

### その他の例とガイド {#other-examples-guides}

[クイックスタート](https://docs.kurtosis.com/quickstart) (Postgresデータベースとその上にAPIを構築します) や、[awesome-kurtosisリポジトリ](https://github.com/kurtosis-tech/awesome-kurtosis)にあるその他の例をぜひチェックしてみてください。そこには、以下のようなパッケージを含む素晴らしい例がいくつかあります。

- [同じローカルのイーサリアムテストネットを立ち上げる](https://github.com/kurtosis-tech/eth2-package)が、トランザクションスパマー (トランザクションをシミュレートするため)、フォークモニター、接続されたGrafanaおよびPrometheusインスタンスなどの追加サービスが接続されているもの
- 同じローカルのイーサリアムネットワークに対して[サブネットワーキングテスト](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/ethereum-network-partition-test)を実行するもの