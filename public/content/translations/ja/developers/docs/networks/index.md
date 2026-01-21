---
title: ネットワーク
description: イーサリアムネットワーク概要、およびアプリケーションテスト用のテストネットのイーサ(ETH)の取得場所
lang: ja
---

イーサリアムネットワークは、接続されたコンピューターのグループで、イーサリアムプロトコルを使って通信します。 イーサリアムメインネットは、1つしかありませんが、同じプロトコルのルールに準拠した独立したネットワークをテストや開発のために作成することができます。 プロトコルに準拠した、互いに干渉しない多くの「ネットワーク」が存在します。 自分のコンピュータ上でローカルに起動して、スマートコントラクトやweb3アプリのテストに利用できます。

イーサリアムアカウントは異なるネットワークすべてで使用できますが、アカウント残高とトランザクション履歴はメインネットから継承されません。 テスト目的に利用可能なネットワークと、テストネットのETHを取得する方法を知っておくと有用です。 セキュリティの観点から、一般にはメインネットのアカウントをテストネットで再利用すること(またはその逆)は推奨されません。

## 前提条件{#prerequisites}

さまざまなネットワークについて学ぶ前に、[イーサリアムの基本](/developers/docs/intro-to-ethereum/)を理解しておく必要があります。テストネットワークは、安価で安全なバージョンのイーサリアムを試用できるようにしてくれます。

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

現在クライアント開発者がメンテナンスしている2つのパブリックテストネットは、SepoliaとHoodiです。 Sepoliaは、コントラクトやアプリケーションのデベロッパーのためのネットワークで、アプリケーションのテストに使用されます。 Hoodiネットワークでは、プロトコル開発者はネットワークのアップグレードをテストでき、ステーカーはバリデータの実行をテストできます。

#### Sepolia {#sepolia}

**Sepoliaは、アプリケーション開発に推奨されるデフォルトのテストネットです**。 Sepoliaネットワークは、クライアントチームとテストチームによって管理される、パーミッション制のバリデータセットを使用しています。

##### リソース

- [ウェブサイト](https://sepolia.dev/)
- [GitHub](https://github.com/eth-clients/sepolia)
- [Otterscan](https://sepolia.otterscan.io/)
- [Etherscan](https://sepolia.etherscan.io)
- [Blockscout](https://eth-sepolia.blockscout.com/)

##### フォーセット

- [Alchemy Sepoliaフォーセット](https://www.alchemy.com/faucets/ethereum-sepolia)
- [Chain Platform Sepoliaフォーセット](https://faucet.chainplatform.co/faucets/ethereum-sepolia/)
- [Chainstack Sepoliaフォーセット](https://faucet.chainstack.com/sepolia-testnet-faucet)
- [Ethereum Ecosystemフォーセット](https://www.ethereum-ecosystem.com/faucets/ethereum-sepolia)
- [ethfaucet.com Sepoliaフォーセット](https://ethfaucet.com/networks/ethereum)
- [Google Cloud Web3 Sepoliaフォーセット](https://cloud.google.com/application/web3/faucet/ethereum/sepolia)
- [Grabteeth](https://grabteeth.xyz/)
- [Infura Sepoliaフォーセット](https://www.infura.io/faucet)
- [PoWフォーセット](https://sepolia-faucet.pk910.de/)
- [QuickNode Sepoliaフォーセット](https://faucet.quicknode.com/ethereum/sepolia)

#### Hoodi {#hoodi}

Hoodiは、バリデーションやステーキングのテストを行うためのテストネットです。 Hoodiネットワークは、テストネットバリデータを実行したいユーザーのために公開されています。 メインネットにデプロイする前にプロトコルのアップグレードをテストしたいステーカーは、Hoodiを使用する必要があります。

- オープンなバリデータセット。ステーカーはネットワークのアップグレードをテスト可能。
- 大きなステート。複雑なスマートコントラクトのインタラクションのテストに有効。
- 同期に時間がかかり、ノードを実行するために多くのストレージが必要。

##### リソース

- [ウェブサイト](https://hoodi.ethpandaops.io/)
- [GitHub](https://github.com/eth-clients/hoodi)
- [エクスプローラー](https://explorer.hoodi.ethpandaops.io/)
- [チェックポイント同期](https://checkpoint-sync.hoodi.ethpandaops.io/)
- [Otterscan](https://hoodi.otterscan.io/)
- [Etherscan](https://hoodi.etherscan.io/)

##### フォーセット

- [Chain Platform Hoodiフォーセット](https://faucet.chainplatform.co/faucets/ethereum-hoodi/)
- [Hoodiフォーセット](https://hoodi.ethpandaops.io/)
- [PoWフォーセット](https://hoodi-faucet.pk910.de/)

#### Ephemery {#ephemery}

Ephemeryは、毎月完全にリセットされるユニークなテストネットです。 実行状態とコンセンサス状態は28日ごとにジェネシス(初期状態)に戻ります。つまり、テストネット上で起こることはすべて一時的なものです。 このため、永続性を必要としない短期的なテストや、高速なノードのブートストラップ、「hello world」のような種類のアプリケーションに最適です。

- 常に新しい状態、バリデータやアプリの短期テスト
- 基本的なコントラクトセットのみを含む
- オープンなバリデータセットで、多額の資金に簡単にアクセス可能
- 最小のノード要件と最速の同期、平均5GB未満

##### リソース

- [ウェブサイト](https://ephemery.dev/)
- [Github](https://github.com/ephemery-testnet/ephemery-resources)
- [コミュニティチャット](https://matrix.to/#/#staker-testnet:matrix.org)
- [Blockscout](https://explorer.ephemery.dev/)
- [Otterscan](https://otter.bordel.wtf/)
- [Beaconエクスプローラー](https://beaconlight.ephemery.dev/)
- [チェックポイント同期](https://checkpoint-sync.ephemery.ethpandaops.io)
- [Launchpad](https://launchpad.ephemery.dev/)

#### フォーセット

- [Bordelフォーセット](https://faucet.bordel.wtf/)
- [Pk910 PoWフォーセット](https://ephemery-faucet.pk910.de/)

#### Holesky (非推奨) {#holesky}

Holeskyテストネットは2025年9月をもって非推奨となります。 ステーキングオペレーターとインフラプロバイダーは、代わりにHoodiをバリデータテストに使用すべきです。

- [Holeskyテストネットのシャットダウンに関するお知らせ](https://blog.ethereum.org/2025/09/01/holesky-shutdown-announcement) - _EFブログ、2025年9月1日_
- [HoleskyおよびHoodiテストネットのアップデート](https://blog.ethereum.org/en/2025/03/18/hoodi-holesky) - _EFブログ、2025年3月18日_

### レイヤー2テストネット {#layer-2-testnets}

[レイヤー2(L2)](/layer-2/)は、特定の一群のイーサリアムスケーリングソリューションを説明するための総称です。 レイヤー2はイーサリアムを拡張し、またイーサリアムのセキュリティ保証を継承する独立したブロックチェーンです。 レイヤー2のテストネットは、通常、パブリックイーサリアムのテストネットと対になっています。

#### Arbitrum Sepolia {#arbitrum-sepolia}

[Arbitrum](https://arbitrum.io/)用のテストネットです。

##### リソース

- [Etherscan](https://sepolia.arbiscan.io/)
- [Blockscout](https://sepolia-explorer.arbitrum.io/)

##### フォーセット

- [Alchemy Arbitrum Sepoliaフォーセット](https://www.alchemy.com/faucets/arbitrum-sepolia)
- [Chainlink Arbitrum Sepoliaフォーセット](https://faucets.chain.link/arbitrum-sepolia)
- [ethfaucet.com Arbitrum Sepoliaフォーセット](https://ethfaucet.com/networks/arbitrum)
- [QuickNode Arbitrum Sepoliaフォーセット](https://faucet.quicknode.com/arbitrum/sepolia)

#### Optimistic Sepolia {#optimistic-sepolia}

[Optimism](https://www.optimism.io/)用のテストネットです。

##### リソース

- [Etherscan](https://sepolia-optimistic.etherscan.io/)
- [Blockscout](https://optimism-sepolia.blockscout.com/)

##### フォーセット

- [Alchemyフォーセット](https://www.alchemy.com/faucets/optimism-sepolia)
- [Chainlinkフォーセット](https://faucets.chain.link/optimism-sepolia)
- [ethfaucet.com Optimism Sepoliaフォーセット](https://ethfaucet.com/networks/optimism)
- [テストネットフォーセット](https://docs.optimism.io/builders/tools/build/faucets)

#### Starknet Sepolia {#starknet-sepolia}

[Starknet](https://www.starknet.io)用のテストネットです。

##### リソース

- [Starkscan](https://sepolia.starkscan.co/)

##### フォーセット

- [Alchemyフォーセット](https://www.alchemy.com/faucets/starknet-sepolia)
- [Blast Starknet Sepoliaフォーセット](https://blastapi.io/faucets/starknet-sepolia-eth)
- [Starknetフォーセット](https://starknet-faucet.vercel.app/)

## プライベートネットワーク {#private-networks}

イーサリアムネットワークのノードがパブリックネットワーク(つまり、メインネットやテストネット)に接続されていない場合、そのネットワークはプライベートネットワークです。 ここでのプライベートとは、保護されており安全という意味ではなく、他のネットワークから分離されているという意味です。

### 開発ネットワーク {#development-networks}

イーサリアムアプリケーションを構築する場合は、プライベートネットワークで実行して、デプロイする前に動作確認をすることをお勧めします。 自身のコンピュータ上でローカルサーバを作成し、Web開発するのと同様に、ローカルのブロックチェーンインスタンスを作成し、開発中の分散型アプリ(Dapp)をテストできます。 プライベートネットワークでのテストは、パブリックテストネットよりもはるかに高速に反復処理を行うことができます。

これをサポートするためのプロジェクトやツールがあります。 [開発ネットワーク](/developers/docs/development-networks/)に関する詳細はこちら。

### コンソーシアムネットワーク {#consortium-networks}

コンセンサスプロセスは、信頼される事前定義された一連のノードにより制御されます。 例えば、既知の学術機関のプライベートネットワークが単一ノードを管理し、ブロックはネットワークの署名者数のしきい値により検証されます。

パブリックイーサリアムネットワークがパブリックなインターネットだとすると、コンソーシアムネットワークはプライベートなイントラネットと考えることができます。

## <Emoji text="🚉" /> なぜイーサリアムのテストネットは地下鉄の駅名にちなんで名付けられているのですか？ {#why-naming}

多くのイーサリアムテストネットは、実在する地下鉄や鉄道の駅名にちなんで名付けられています。 この命名の伝統は初期に始まり、コントリビューターが住んでいた、あるいは働いていた世界中の都市を反映しています。 それは象徴的で、覚えやすく、実用的です。 テストネットがイーサリアムメインネットから隔離されているように、地下鉄の路線も地上の交通とは別に運行されています。

### <Emoji text="🚧" /> 一般的に使用されるテストネットとレガシーテストネット {#common-and-legacy-testnets}

- **Sepolia** - ギリシャのアテネにある、地下鉄で結ばれた地区。 現在、スマートコントラクトとdAppのテストに使用されています。
- **Hoodi** - インドのベンガルールにあるフーディ地下鉄駅にちなんで命名。 バリデータとプロトコルのアップグレードテストに使用されます。
- **Goerli** _(非推奨)_ - ドイツのベルリンにあるゲルリッツァー駅にちなんで命名。
- **Rinkeby** _(非推奨)_ - ストックホルムの地下鉄駅がある郊外の地名にちなんで命名。
- **Ropsten** _(非推奨)_ - ストックホルムのかつてのフェリー/地下鉄ターミナルがあった地域を指します。
- **Kovan** _(非推奨)_ - シンガポールのMRT駅にちなんで命名。
- **Morden** _(非推奨)_ - ロンドン地下鉄の駅にちなんで命名。 イーサリアム初のパブリックテストネット。

### <Emoji text="🧪" /> その他の専門テストネット {#other-testnets}

一部のテストネットは、短期またはアップグレード固有のテストのために作成されたものであり、必ずしも地下鉄をテーマにしているわけではありません。

- **Holesky** _(非推奨)_ - プラハのホレショヴィツェ駅にちなんで命名。 バリデータのテストに使用。2025年に非推奨となりました。
- **Kiln**、**Zhejiang**、**Shandong**、**Prater**、**Pyrmont**、**Olympic** _(すべて非推奨)_ および **Ephemery** - マージ、Shanghai、バリデータの実験といったアップグレードシミュレーションのために専用に構築されました。 いくつかの名前は、地下鉄ベースではなく、地域やテーマに基づいています。

地下鉄の駅名を使用することで、開発者は数値のチェーンIDに頼ることなく、テストネットを迅速に識別し、記憶することができます。 また、実用的、グローバル、人間中心というイーサリアムの文化も反映しています。

## 関連ツール {#related-tools}

- [Chainlist](https://chainlist.org/) _ウォレットとプロバイダを適切なチェーンIDとネットワークIDに接続するためのEVMネットワークのリスト_
- [EVMベースのチェーン](https://github.com/ethereum-lists/chains) _Chainlistを動かすチェーンメタデータのGitHubリポジトリ_

## 参考リンク{#further-reading}

- [提案: 予測可能なイーサリアムテストネットのライフサイクル](https://ethereum-magicians.org/t/proposal-predictable-ethereum-testnet-lifecycle/11575/17)
- [イーサリアムテストネットの進化](https://etherworld.co/2022/08/19/the-evolution-of-ethereum-testnet/)
