---
title: ローカルのマルチクライアントテストネットでdAppを開発・テストする方法
description: このガイドでは、まずマルチクライアントのローカルイーサリアムテストネットをインスタンス化して設定する方法を説明し、次にそのテストネットを使用してdAppをデプロイ&テストします。
author: "Tedi Mitiku"
tags:
  [
    "クライアント",
    "ノード",
    "スマート契約",
    "構成可能性",
    "コンセンサスレイヤー",
    "実行レイヤー",
    "テスト"
  ]
skill: intermediate
lang: ja
published: 2023-04-11
---

## はじめに {#introduction}

このガイドでは、設定可能なローカルイーサリアムテストネットのインスタンス化、そこへのスマートコントラクトのデプロイ、およびdAppに対するテストを実行するためのテストネットの使用というプロセスを順を追って説明します。 このガイドは、ライブのテストネットやメインネットにデプロイする前に、さまざまなネットワーク構成に対してdAppをローカルで開発・テストしたいdApp開発者向けに設計されています。

このガイドでは、次のことを行います。

- [Kurtosis](https://www.kurtosis.com/)を使用して、[`eth-network-package`](https://github.com/kurtosis-tech/eth-network-package)でローカルイーサリアムテストネットをインスタンス化する
- Hardhat dApp開発環境をローカルテストネットに接続し、dAppをコンパイル、デプロイ、テストする、そして
- ノード数や特定のEL/CLクライアントのペアリングなどのパラメータを含むローカルテストネットを設定し、さまざまなネットワーク構成に対する開発およびテストのワークフローを可能にする。

### Kurtosisとは？ {#what-is-kurtosis}

[Kurtosis](https://www.kurtosis.com/)は、マルチコンテナのテスト環境を構成するために設計された、構成可能なビルドシステムです。 これにより、開発者は、ブロックチェーンテストネットなどの動的なセットアップロジックを必要とする再現可能な環境を作成できます。

このガイドでは、Kurtosis eth-network-packageが、[`geth`](https://geth.ethereum.org/)実行レイヤー(EL)クライアント、および[`teku`](https://consensys.io/teku)、[`lighthouse`](https://lighthouse.sigmaprime.io/)、[`lodestar`](https://lodestar.chainsafe.io/)コンセンサスレイヤー(CL)クライアントをサポートするローカルイーサリアムテストネットを起動します。 このパッケージは、Hardhat Network、Ganache、Anvilのようなフレームワークのネットワークに代わる、設定可能で構成可能な代替手段として機能します。 Kurtosisは、開発者が使用するテストネットに対してより優れた制御と柔軟性を提供します。これは、[イーサリアム・ファウンデーションがマージのテストにKurtosisを使用した](https://www.kurtosis.com/blog/testing-the-ethereum-merge)主な理由であり、ネットワークのアップグレードをテストするためにKurtosisを使い続けている理由でもあります。

## Kurtosisのセットアップ{#setting-up-kurtosis}

続行する前に、次のものがあることを確認してください。

- ローカルマシンに[Dockerエンジンをインストールして起動](https://docs.kurtosis.com/install/#i-install--start-docker)していること
- [Kurtosis CLIをインストール](https://docs.kurtosis.com/install#ii-install-the-cli)していること(CLIがすでにインストールされている場合は、最新リリースにアップグレードしていること)
- [Node.js](https://nodejs.org/en)、[yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)、および[npx](https://www.npmjs.com/package/npx) (dApp環境用) をインストールしていること

## ローカルイーサリアムテストネットのインスタンス化{#instantiate-testnet}

ローカルイーサリアムテストネットを起動するには、次を実行します。

```python
kurtosis --enclave local-eth-testnet run github.com/kurtosis-tech/eth-network-package
```

注: このコマンドは、`--enclave`フラグを使用して、ネットワークに「local-eth-testnet」という名前を付けます。

Kurtosisは、指示を解釈、検証、そして実行する際に、内部で行われている手順を出力します。 最後に、次のような出力が表示されるはずです。

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

おめでとうございます！ Kurtosisを使用して、CL (`lighthouse`)とELクライアント(`geth`)を持つローカルイーサリアムテストネットをDocker経由でインスタンス化しました。

### レビュー{#review-instantiate-testnet}

このセクションでは、Kurtosisに[GitHubでリモートホストされている`eth-network-package`](https://github.com/kurtosis-tech/eth-network-package)を使用して、Kurtosis [Enclave](https://docs.kurtosis.com/advanced-concepts/enclaves/)内にローカルイーサリアムテストネットを起動するよう指示するコマンドを実行しました。 エンクレーブ内には、「ファイルアーティファクト」と「ユーザーサービス」の両方があります。

エンクレーブ内の[ファイルアーティファクト](https://docs.kurtosis.com/advanced-concepts/files-artifacts/)には、ELおよびCLクライアントをブートストラップするために生成および利用されたすべてのデータが含まれます。 データは、この[Dockerイメージ](https://github.com/ethpandaops/ethereum-genesis-generator)から構築された `prelaunch-data-generator` サービスを使用して作成されました。

ユーザーサービスには、エンクレーブで動作しているすべてのコンテナ化されたサービスが表示されます。 ELクライアントとCLクライアントの両方を備えた単一のノードが作成されていることがわかります。

## dApp開発環境をローカルイーサリアムテストネットに接続する{#connect-your-dapp}

### dApp開発環境のセットアップ{#set-up-dapp-env}

実行中のローカルテストネットができたので、dApp開発環境を接続してローカルテストネットを使用できます。 このガイドでは、Hardhatフレームワークを使用して、ブラックジャックdAppをローカルテストネットにデプロイします。

dApp開発環境をセットアップするには、サンプルdAppを含むリポジトリをクローンし、その依存関係をインストールして、次を実行します。

```python
git clone https://github.com/kurtosis-tech/awesome-kurtosis.git && cd awesome-kurtosis/smart-contract-example && yarn
```

ここで使用する[smart-contract-example](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example)フォルダには、[Hardhat](https://hardhat.org/)フレームワークを使用するdApp開発者のための一般的なセットアップが含まれています。

- [`contracts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/contracts) には、Blackjack dApp用のいくつかのシンプルなスマートコントラクトが含まれています
- [`scripts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/scripts) には、ローカルのイーサリアムネットワークにトークンコントラクトをデプロイするためのスクリプトが含まれています
- [`test/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/test) には、Blackjack dAppの各プレイヤーに1000がミントされていることを確認するための、トークンコントラクト用の簡単な .js テストが含まれています
- [`hardhat.config.ts`](https://github.com/kurtosis-tech/awesome-kurtosis/blob/main/smart-contract-example/hardhat.config.ts) はHardhatセットアップを構成します

### Hardhatがローカルテストネットを使用するように設定する{#configure-hardhat}

dApp開発環境がセットアップされたので、今度はHardhatを接続して、Kurtosisを使用して生成されたローカルイーサリアムテストネットを使用します。 これを実現するには、`hardhat.config.ts`設定ファイルの`localnet`構造体にある`<$YOUR_PORT>`を、任意の`el-client-<num>`サービスから出力されたrpc uriのポートに置き換えます。 このサンプルケースでは、ポートは`64248`になります。 ポートは異なります。

`hardhat.config.ts`での例:

```js
localnet: {
url: 'http://127.0.0.1:<$YOUR_PORT>',// TODO: $YOUR_PORTを、ETH NETWORK KURTOSIS PACKAGEによって生成されたノードURIのポートに置き換えてください

// これらはeth-network-packageによって作成された、事前に入金済みのテストアカウントに関連付けられた秘密鍵です
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

ファイルを保存すると、Hardhat dApp開発環境がローカルイーサリアムテストネットに接続されます。 次を実行して、テストネットが機能していることを確認できます。

```python
npx hardhat balances --network localnet
```

出力は次のようになります。

```python
0x878705ba3f8Bc32FCf7F4CAa1A35E72AF65CF766 has balance 10000000000000000000000000
0x4E9A3d9D1cd2A2b2371b8b3F489aE72259886f1A has balance 10000000000000000000000000
0xdF8466f277964Bb7a0FFD819403302C34DCD530A has balance 10000000000000000000000000
0x5c613e39Fc0Ad91AfDA24587e6f52192d75FBA50 has balance 10000000000000000000000000
0x375ae6107f8cC4cF34842B71C6F746a362Ad8EAc has balance 10000000000000000000000000
0x1F6298457C5d76270325B724Da5d1953923a6B88 has balance 10000000000000000000000000
```

これにより、Hardhatがローカルテストネットを使用しており、`eth-network-package`によって作成された事前に入金されたアカウントを検出していることが確認できます。

### dAppをローカルでデプロイしてテストする{#deploy-and-test-dapp}

dApp開発環境がローカルイーサリアムテストネットに完全に接続されたので、ローカルテストネットを使用してdAppに対する開発およびテストワークフローを実行できます。

ローカルでのプロトタイピングと開発のために`ChipToken.sol`スマートコントラクトをコンパイルしてデプロイするには、次を実行します。

```python
npx hardhat compile
npx hardhat run scripts/deploy.ts --network localnet
```

出力は次のようになります。

```python
ChipTokenのデプロイ先: 0xAb2A01BC351770D09611Ac80f1DE076D56E0487d
```

次に、ローカルdAppに対して`simple.js`テストを実行し、Blackjack dAppの各プレイヤーに1000がミントされていることを確認します。

出力は次のようになります。

```python
npx hardhat test --network localnet
```

出力は次のようになります。

```python
ChipToken
    mint
      ✔ PLAYER ONEに1000チップがミントされるべき

  1件合格 (654ms)
```

### レビュー{#review-dapp-workflows}

この時点で、dApp開発環境をセットアップし、Kurtosisによって作成されたローカルイーサリアムネットワークに接続し、dAppに対してコンパイル、デプロイ、および簡単なテストを実行しました。

次に、さまざまなネットワーク構成でdAppをテストするために、基盤となるネットワークをどのように構成できるかを見ていきましょう。

## ローカルイーサリアムテストネットの設定{#configure-testnet}

### クライアント構成とノード数の変更{#configure-client-config-and-num-nodes}

ローカルイーサリアムテストネットは、開発またはテストしたいシナリオや特定のネットワーク構成に応じて、異なるELおよびCLクライアントペア、ならびにさまざまな数のノードを使用するように構成できます。 これは、一度セットアップすれば、カスタマイズされたローカルテストネットを起動し、それを使用して同じワークフロー(デプロイ、テストなど)を実行できることを意味します。 さまざまなネットワーク構成の下で、すべてが期待どおりに機能することを確認します。 変更できる他のパラメータの詳細については、このリンクをご覧ください。

試してみましょう。 JSONファイルを介して、さまざまな構成オプションを `eth-network-package` に渡すことができます。 このネットワークパラメータJSONファイルは、Kurtosisがローカルイーサリアムネットワークをセットアップするために使用する特定の設定を提供します。

デフォルトの設定ファイルを取得し、それを編集して、異なるEL/CLペアを持つ2つのノードを起動します。

- ノード1：`geth`/`lighthouse`
- ノード2：`geth`/`lodestar`
- ノード3：`geth`/`teku`

この構成により、dAppをテストするためのイーサリアムノード実装の異種ネットワークが作成されます。 設定ファイルは次のようになります。

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

各`participants`構造体はネットワーク内のノードにマッピングされるため、3つの`participants`構造体はKurtosisにネットワーク内で3つのノードを起動するように指示します。 各`participants`構造体では、その特定のノードに使用されるELとCLのペアを指定できます。

`network_params`構造体は、各ノードのジェネシスファイルを作成するために使用されるネットワーク設定や、ネットワークのスロットごとの秒数などの他の設定を構成します。

編集したパラメータファイルを任意のディレクトリに保存し(以下の例ではデスクトップに保存)、次を実行してKurtosisパッケージを実行します。

```python
kurtosis clean -a && kurtosis run --enclave local-eth-testnet github.com/kurtosis-tech/eth-network-package "$(cat ~/eth-network-params.json)"
```

注: ここでは、`kurtosis clean -a`コマンドを使用して、新しいテストネットを開始する前に古いテストネットとその内容を破棄するようにKurtosisに指示します。

再び、Kurtosisは少しの間動作し、実行されている個々のステップを出力します。 最終的に、出力は次のようになります。

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

おめでとうございます！ ローカルテストネットを1つではなく3つのノードを持つように正常に設定しました。 dAppに対して以前と同じワークフロー(デプロイ＆テスト)を実行するには、新しい3ノードのローカルテストネットの`el-client-<num>`サービスから出力されたrpc uriのポートで、`hardhat.config.ts`構成ファイルの`localnet`構造体にある`<$YOUR_PORT>`を置き換えることで、以前と同じ操作を実行します。

## 結論 {#conclusion}

完成です！ この短いガイドを要約すると、次のことを行いました。

- Kurtosisを使用してDocker上にローカルイーサリアムテストネットを作成
- ローカルdApp開発環境をローカルイーサリアムネットワークに接続
- dAppをデプロイし、ローカルイーサリアムネットワーク上で簡単なテストを実行
- 基盤となるイーサリアムネットワークを3つのノードを持つように構成

何がうまくいったか、何を改善できるか、また質問への回答など、ご意見をお聞かせください。 [GitHub](https://github.com/kurtosis-tech/kurtosis/issues/new/choose)または[メール](mailto:feedback@kurtosistech.com)でお気軽にご連絡ください。

### その他の例とガイド{#other-examples-guides}

[クイックスタート](https://docs.kurtosis.com/quickstart)(PostgresデータベースとAPIを構築します)や、[awesome-kurtosisリポジトリ](https://github.com/kurtosis-tech/awesome-kurtosis)にあるその他の例を確認することをお勧めします。そこには、次のようなパッケージを含む素晴らしい例があります。

- [同じローカルイーサリアムテストネットを起動](https://github.com/kurtosis-tech/eth2-package)しますが、トランザクションスパマー(トランザクションをシミュレートするため)、フォークモニター、接続されたGrafanaおよびPrometheusインスタンスなどの追加サービスも接続します
- 同じローカルイーサリアムネットワークに対して[サブネットワーキングテスト](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/ethereum-network-partition-test)を実行する
