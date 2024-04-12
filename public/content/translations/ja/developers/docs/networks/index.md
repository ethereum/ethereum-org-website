---
title: ネットワーク
description: イーサリアムネットワーク概要、およびアプリケーションテスト用のテストネットのイーサ(ETH)の取得場所
lang: ja
---

イーサリアムネットワークは、接続されたコンピューターのグループで、イーサリアムプロトコルを使って通信します。 イーサリアムメインネットは、1つしかありませんが、同じプロトコルのルールに準拠した独立したネットワークをテストや開発のために作成することができます。 プロトコルに準拠した、互いに干渉しない多くの「ネットワーク」が存在します。 自分のコンピュータ上でローカルに起動して、スマートコントラクトやweb3アプリのテストに利用できます。

イーサリアムアカウントは異なるネットワークすべてで使用できますが、アカウント残高とトランザクション履歴はメインネットから継承されません。 テスト目的に利用可能なネットワークと、テストネットのETHを取得する方法を知っておくと有用です。 セキュリティの観点から、一般にはメインネットのアカウントをテストネットで再利用すること(またはその逆)は推奨されません。

## 前提知識 {#prerequisites}

テストネットワークは試用目的として、安価で安全なイーサリアムを提供します。それぞれのネットワークを読み進める前に、[イーサリアムの基本](/developers/docs/intro-to-ethereum/)を理解する必要があります。

## パブリックネットワーク {#public-networks}

パブリックネットワークは、インターネット接続で世界中の誰でもアクセスできます。 誰でも公開ブロックチェーン上でトランザクションを読み取りまたは作成し、実行されているトランザクションを検証できます。 ピア間のコンセンサスにより、トランザクションとネットワークの状態を追加するかが決まります。

### イーサリアムメインネット {#ethereum-mainnet}

メインネットは、プライマリ、パブリックのイーサリアム本番環境のブロックチェーンであり、実際の価値を持つトランザクションが分散台帳上で実行されています。

ユーザーと取引所がETH価格について話す場合は、メインネットのETHを指しています。

### イーサリアムテストネット {#ethereum-testnets}

メインネットに加えて、パブリックのテストネットがあります。 このテストネットは、プロトコルやスマートコントラクトのデベロッパーが、メインネットへデプロイする前に、実際の運用環境でプロトコルの更新や将来的なスマートコントラクトの双方をテストするためのネットワークです。 これは一般のウェブ開発における、本番とステージングサーバと同じようなものと考えてください。

メインネットにデプロイする前に、テストネットで作成したコントラクトコードをテストする必要があります。 既存のスマートコントラクトと統合する分散型アプリ(Dapp)では、ほとんどのプロジェクトはコピーがテストネットにデプロイされています。

ほとんどのテストネットは、プルーフ・オブ・オーソリティ(PoA)の合意メカニズムで立ち上げられました。 このメカニズムでは、選ばれた少数のノードがトランザクションを検証し、新しいブロックを作成することで、その過程でアイデンティティをステーキングします。 また、テストネットの中にはイーサリアムのメインネットのように、誰もがバリデータの実行をテストできるオープンなプルーフ・オブ・ステークの合意メカニズムを備えているものもあります。

テストネット上のETHは、本来は価値がないとされています。しかし、特定のタイプのテストネットでは、希少性や入手が困難なことから、価値を持つようになったETHのマーケットが形成されています。 実際にイーサリアムを利用するには(テストネットであれ)ETHが必要なので、ほとんどの人はフォーセットからテストネットETHを取得します。 ほとんどのフォーセットはWebアプリで、ETHを送信するアドレスを入力します。

#### 推奨テストネット

現在クライアントデベロッパーによってメンテナンスされているパブリックのテストネットは、SepoliaとGoerliの2つです。 Sepoliaは、コントラクトやアプリケーションのデベロッパーのためのネットワークで、アプリケーションのテストに使用されます。 Goerliは、プロトコルのデベロッパーがネットワークのアップグレードをテストしたり、ステーカーがバリデータの実行をテストしたりするために使用されるネットワークです。

#### Sepolia(セポリア) {#sepolia}

**Sepoliaはアプリケーション開発に推奨されるデフォルトのテストネットです。** Sepoliaネットワークは、許可型のバリデータセットを使用しています。 また、まだ新しいものであるため、ステートや履歴などデータ量が少ないことも特徴です。 そのため、ネットワークを素早く同期でき、ノードを実行するのに必要なストレージ容量が少なくて済みます。 これは、ノードを素早く起動してネットワークと直接やり取りしたい場合に便利です。

- クライアントとテストチームが管理する非公開のバリデータセット
- 他のテストネットに比べてアプリケーションのデプロイが少ない、新しいテストネット
- 同期が速く、ノードを実行するには最小限のディスク容量が必要

##### リソース

- [ウェブサイト](https://sepolia.dev/)
- [GitHub](https://github.com/eth-clients/sepolia)
- [Otterscan](https://sepolia.otterscan.io/)
- [Etherscan](https://sepolia.etherscan.io)

##### フォーセット

- [QuickNode Sepolia Faucet](https://faucet.quicknode.com/drip)
- [Grabteeth](https://grabteeth.xyz/)
- [PoW faucet](https://sepolia-faucet.pk910.de/)
- [Coinbase Wallet Faucet | Sepolia](https://coinbase.com/faucets/ethereum-sepolia-faucet)
- [Alchemy Sepolia faucet](https://sepoliafaucet.com/)
- [Infura Sepolia faucet](https://www.infura.io/faucet)
- [Chainstack Sepolia faucet](https://faucet.chainstack.com/sepolia-faucet)
- [テストネットフォーセット | Sepolia](https://testnet-faucet.com/sepolia/)

#### Goerli(ゴエリ) _(長期サポート)_ {#goerli}

_注: [Goerliテストネットは廃止予定となっており](https://ethereum-magicians.org/t/proposal-predictable-ethereum-testnet-lifecycle/11575/17)、2023年に[Holesovice](https://github.com/eth-clients/holesovice)に置き換わります。 アプリケーションのSepoliaへの移行をご検討ください。_

Goerliは、バリデーションやステーキングのテストを行うためのテストネットです。 Goerliネットワークは、テストネットバリデータを実行したいユーザーのために公開されています。 メインネットにデプロイする前にプロトコルのアップグレードをテストしたいステーカーは、Goerliを使用する必要があります。

- オープンなバリデータセット。ステーカーはネットワークのアップグレードをテスト可能。
- 大きなステート。複雑なスマートコントラクトのインタラクションのテストに有効。
- 同期に時間がかかり、ノードを実行するために多くのストレージが必要。

##### リソース

- [ウェブサイト](https://goerli.net/)
- [GitHub](https://github.com/eth-clients/goerli)
- [Etherscan](https://goerli.etherscan.io)

##### フォーセット

- [QuickNode Goerli Faucet](https://faucet.quicknode.com/drip)
- [Grabteeth](https://grabteeth.xyz/)
- [PoW faucet](https://goerli-faucet.pk910.de/)
- [Paradigm faucet](https://faucet.paradigm.xyz/)
- [Alchemy Goerli Faucet](https://goerlifaucet.com/)
- [All That Node Goerli Faucet](https://www.allthatnode.com/faucet/ethereum.dsrv)
- [Coinbase Wallet Faucet | Goerli](https://coinbase.com/faucets/ethereum-goerli-faucet)
- [Chainstack Goerli faucet](https://faucet.chainstack.com/goerli-faucet)

Goerliテストネットでバリデータを起動するには、ethstakerの["cheap goerli validator" launchpad](https://goerli.launchpad.ethstaker.cc/en/)を使用してください。

### レイヤー2テストネット {#layer-2-testnets}

[レイヤー2(L2)](/layer-2/)は、イーサリアムのスケーリングソリューションの総称であり、 レイヤー2はイーサリアムを拡張し、またイーサリアムのセキュリティ保証を継承する独立したブロックチェーンです。 レイヤー2のテストネットは、通常、パブリックイーサリアムのテストネットと対になっています。

#### Arbitrum Goerli {#arbitrum-goerli}

[Arbitrum](https://arbitrum.io/)のテストネット。

##### フォーセット

- [Chainlinkフォーセット](https://faucets.chain.link/)

#### Optimistic Goerli {#optimistic-goerli}

[Optimism](https://www.optimism.io/)のテストネット。

##### フォーセット

- [Paradigm faucet](https://faucet.paradigm.xyz/)
- [Coinbase Wallet Faucet | Optimism Goerli](https://coinbase.com/faucets/optimism-goerli-faucet)

#### Starknet Goerli {#starknet-goerli}

[Starknet](https://www.starknet.io)のテストネット

##### フォーセット

- [Starknetフォーセット](https://faucet.goerli.starknet.io)

## プライベートネットワーク {#private-networks}

イーサリアムネットワークは、ノードがパブリックネットワーク(メインネットやテストネット) に接続されていない場合は、プライベートネットワークとなります。 ここでのプライベートとは、保護されており安全という意味ではなく、他のネットワークから分離されているという意味です。

### 開発フレームワーク {#development-networks}

イーサリアムアプリケーションを構築する場合は、プライベートネットワークで実行して、デプロイする前に動作確認をすることをお勧めします。 自身のコンピュータ上でローカルサーバを作成し、Web開発するのと同様に、ローカルのブロックチェーンインスタンスを作成し、開発中の分散型アプリ(Dapp)をテストできます。 プライベートネットワークでのテストは、パブリックテストネットよりもはるかに高速に反復処理を行うことができます。

これをサポートするためのプロジェクトやツールがあります。 [開発ネットワーク](/developers/docs/development-networks/)の詳細をご覧ください。

### コンソーシアムネットワーク {#consortium-networks}

コンセンサスプロセスは、信頼される事前定義された一連のノードにより制御されます。 例えば、既知の学術機関のプライベートネットワークが単一ノードを管理し、ブロックはネットワークの署名者数のしきい値により検証されます。

パブリックイーサリアムネットワークがパブリックなインターネットだとすると、コンソーシアムネットワークはプライベートなイントラネットと考えることができます。

## 関連ツール {#related-tools}

- [Chainlist](https://chainlist.org/) _ウォレットとプロバイダを適切なチェーンIDとネットワークIDに接続するEVMネットワークのリスト_
- [EVMベースのチェーン](https://github.com/ethereum-lists/chains) _Chainlist_を動かすチェーンメタデータのGitHubリポジトリ

## 参考文献 {#further-reading}

- [提案: 予測可能なイーサリアムテストネットのライフサイクル](https://ethereum-magicians.org/t/proposal-predictable-ethereum-testnet-lifecycle/11575/17)
- [イーサリアムテストネットの進化](https://etherworld.co/2022/08/19/the-evolution-of-ethereum-testnet/)
