---
title: ネットワーク
description: イーサリアムネットワーク概要、およびアプリケーションテスト用のテストネットのイーサ(ETH)の取得場所
lang: ja
---

開発、テスト、本番の用途に応じて、異なるイーサリアム環境にアクセスすることができます。 イーサリアムはプロトコルであるため、プロトコルに準拠した、複数の互いに干渉しない「ネットワーク」が存在します。

イーサリアムアカウントは異なるネットワークすべてで使用できますが、アカウント残高とトランザクション履歴はメインネットから継承されません。 テスト目的に利用可能なネットワークと、テストネットの ETH を取得する方法を知っておくと有用です。

## 前提知識 {#prerequisites}

テストネットワークは試用目的として、安価で安全なイーサリアムを提供します。それぞれのネットワークを読み進める前に、[イーサリアムの基本](/developers/docs/intro-to-ethereum/)を理解する必要があります。

## パブリックネットワーク {#public-networks}

パブリックネットワークは、インターネット接続で世界中の誰でもアクセスできます。 誰でも公開ブロックチェーン上でトランザクションを読み取りまたは作成し、実行されているトランザクションを検証できます。 ピア間のコンセンサスにより、トランザクションとネットワークの状態を追加するかが決まります。

### イーサリアムメインネット {#ethereum-mainnet}

メインネットは、プライマリ、パブリックのイーサリアム本番環境のブロックチェーンであり、実際の価値を持つトランザクションが分散台帳上で実行されています。

ユーザーと取引所が ETH 価格について話す場合は、メインネットの ETH を指しています。

### イーサリアムテストネット {#ethereum-testnets}

メインネットに加えて、パブリックのテストネットがあります。 このテストネットは、プロトコルやスマートコントラクトのデベロッパーが、メインネットへデプロイする前に、実際の運用環境でプロトコルの更新や将来的なスマートコントラクトの双方をテストするためのネットワークです。 これは一般のウェブ開発における、本番とステージングサーバと同じようなものと考えてください。

メインネットにデプロイする前に、テストネットで作成したコントラクトコードをテストする必要があります。 既存のスマートコントラクトと統合する分散型アプリ(Dapp)では、ほとんどのプロジェクトはコピーがテストネットにデプロイされています。

ほとんどのテストネットは、プルーフ・オブ・オーソリティ(PoA)合意メカニズムを使って開始されました。 これは、選ばれた少数のノードがトランザクションを検証し、新しいブロックを作成することで、その過程でアイデンティティをステーキングします。 あるいは、許可された少数のマイナーのプルーフ・オブ・ワークの合意メカニズムを使用して開始されたいくつかのテストネットもあります。 しかし、[マージ](/upgrades/merge)の準備として、これらのテストネットはプルーフ・オブ・ステークへ移行し、イーサリアムメインネットのマージが行われる前に、テストの機会が複数回提供されました。 現在、イーサリアムテストネットは、イーサリアムメインネットと同様にプルーフ・オブ・ステークです。

テストネットの ETH は実価値がないため、テストネットの ETH には市場価値はありません。 実際にイーサリアムを利用するには ETH が必要なので、ほとんどの人はフォーセットからテストネット ETH を取得します。 ほとんどのフォーセットは Web アプリで、ETH を送信するアドレスを入力します。

#### Goerli (ゴエリ) {#goerli}

Goerli (ゴエリ)はプルーフ・オブ・ステークのテストネットです。 アプリケーションデベロッパー向けの安定したテストネットとして、長期的にわたって維持されると見込まれています。 テストネットがマージされる前は、 Goerli はプルーフ・オブ・オーソリティのテストネットでした。

- [ウェブサイト](https://goerli.net/)
- [GitHub](https://github.com/goerli/testnet)
- [Etherscan](https://goerli.etherscan.io)

##### Goerli フォーセット

- [Goerli faucet](https://faucet.goerli.mudit.blog/)
- [Chainlink faucet](https://faucets.chain.link/)
- [Alchemy Goerli Faucet](https://goerlifaucet.com/)

#### Sepolia (セポリア) {#sepolia}

Sepolia (セポリア)は、プルーフ・オブ・ステークのテストネットです。 Sepolia はまだ稼働していますが、長期的には維持されない予定です。 2022 年 6 月にマージされる前は、Sepolia はプルーフ・オブ・ワークのテストネットでした。

- [ウェブサイト](https://sepolia.dev/)
- [GitHub](https://github.com/goerli/sepolia)
- [Otterscan](https://sepolia.otterscan.io/)
- [Etherscan](https://sepolia.etherscan.io)

##### Sepolia フォーセット

- [Sepolia faucet](https://faucet.sepolia.dev/)
- [FaucETH](https://fauceth.komputing.org)

#### Ropsten (ロプステン) _(非推奨)_ {#ropsten}

_注意: [Ropsten (ロプステン)テストネットは非推奨](https://github.com/ethereum/pm/issues/460)であり、プロトコルのアップグレードは行われません。 Sepolia または Goerli にアプリケーションを移行することを検討してください。_

Ropsten は、プルーフ・オブ・ステークのテストネットです。 2022 年後半に廃止される予定です。 2022 年 6 月にマージされる前は、ロプステンはプルーフ・オブ・ワークのテストネットでした。

##### Ropsten フォーセット

- [FaucETH](https://fauceth.komputing.org) (ソーシャルアカウントを必要としない複数チェーンのフォーセット)
- [Paradigm faucet](https://faucet.paradigm.xyz/)

#### Rinkeby (リンケビュー) _(非推奨)_ {#rinkeby}

_注意: [Rinkeby (リンケビュー)テストネットは非推奨](https://github.com/ethereum/pm/issues/460)であり、プロトコルのアップグレードは行われません。 Sepolia または Goerli にアプリケーションを移行することを検討してください。_

古いバージョンの Geth クライアントに対応している、プルーフ・オブ・オーソリティのテストネット。

##### Rinkeby フォーセット

- [FaucETH](https://fauceth.komputing.org) (ソーシャルアカウントを必要としない複数チェーンのフォーセット)
- [Alchemy faucet](https://RinkebyFaucet.com)
- [Chainlink faucet](https://faucets.chain.link/)
- [Paradigm faucet](https://faucet.paradigm.xyz/)
- [Rinkeby Faucet](https://faucet.rinkeby.io/)

#### Kovan (コバン) _(非推奨)_ {#kovan}

_注意: [Kovan (コバン)テストネットは非推奨](https://github.com/ethereum/pm/issues/460)であり、プロトコルのアップグレードは行われません。 Sepolia または Goerli にアプリケーションを移行することを検討してください。_

OpenEthereum クライアントに対応している、非常に古いプルーフ・オブ・オーソリティのテストネット。

##### Kovan フォーセット

- [FaucETH](https://fauceth.komputing.org) (ソーシャルアカウントを必要としない複数チェーンのフォーセット)
- [Chainlink faucet](https://faucets.chain.link/)
- [Paradigm faucet](https://faucet.paradigm.xyz/)

### レイヤー 2 テストネット {#layer-2-testnets}

[レイヤー 2 (L2)](/layer-2/)は、イーサリアムのスケーリングソリューションの総称です。 レイヤー 2 はイーサリアムを拡張し、またイーサリアムのセキュリティ保証を継承する独立したブロックチェーンです。 レイヤー 2 テストネットは、通常、パブリックイーサリアムテストネットと対になっています。

#### Arbitrum Rinkeby (アービトラム・リンケビー) {#arbitrum-rinkeby}

[Arbitrum](https://arbitrum.io/)のテストネット。

Arbitrum Rinkeby フォーセット:

- [FaucETH](https://fauceth.komputing.org) (ソーシャルアカウントを必要としない複数チェーンのフォーセット)
- [Chainlink faucet](https://faucets.chain.link/)
- [Paradigm faucet](https://faucet.paradigm.xyz/)

#### Optimistic Kovan (オプティミスティック・コバン) {#optimistic-kovan}

[Optimism](https://www.optimism.io/)のテストネット。

Optimistic Kovan フォーセット:

- [FaucETH](https://fauceth.komputing.org) (ソーシャルアカウントを必要としない複数チェーンのフォーセット)
- [Paradigm faucet](https://faucet.paradigm.xyz/)

## プライベートネットワーク {#private-networks}

イーサリアムネットワークは、ノードがパブリックネットワーク(メインネットやテストネット)に接続しなければ、プライベートネットワーク です。 ここでのプライベートとは、保護されており安全という意味ではなく、別のまたは分離されていることを意味します。

### 開発フレームワーク {#development-networks}

イーサリアムアプリケーションを構築する場合は、プライベートネットワークで実行して、デプロイする前に動作確認をすることをお勧めします。 自身のコンピュータ上でローカルサーバを作成し、Web 開発するのと同様に、ローカルのブロックチェーンインスタンスを作成し、開発中の分散型アプリ(Dapp)をテストできます。 プライベートネットワークでのテストは、パブリックテストネットよりもはるかに高速な反復処理が可能です。

これをサポートするためのプロジェクトやツールがあります。 [開発ネットワーク](/developers/docs/development-networks/)の詳細をご覧ください。

### コンソーシアムネットワーク {#consortium-networks}

コンセンサスプロセスは、信頼される事前定義された一連のノードにより制御されます。 例えば、既知の学術機関のプライベートネットワークが単一ノードを管理し、ブロックはネットワークの署名者数のしきい値により検証されます。

パブリックイーサリアムネットワークがパブリックなインターネットだとすると、コンソーシアムネットワークはプライベートなイントラネットと考えることができます。

## 関連ツール {#related-tools}

- [Chainlist](https://chainlist.org/) _ウォレットとプロバイダを適切なチェーン ID とネットワーク ID に接続する EVM ネットワークのリスト_
- [EVM ベースのチェーン](https://github.com/ethereum-lists/chains) *Chainlist*を動かすチェーンメタデータの GitHub リポジトリ

## 参考文献 {#further-reading}

- [イーサリアムテストネットの進化](https://etherworld.co/2022/08/19/the-evolution-of-ethereum-testnet/)
