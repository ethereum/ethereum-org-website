---
title: "ネットワーク"
description: "イーサリアムのネットワークの概要と、アプリケーションのテスト用にテストネットのイーサ（ETH）を入手できる場所について説明します。"
lang: ja
---

[イーサリアム](/)のネットワークは、イーサリアムのプロトコルを使用して通信する、接続されたコンピュータのグループです。イーサリアム・メインネットは1つしかありませんが、テストや開発の目的で、同じプロトコルのルールに準拠した独立したネットワークを作成することができます。互いにやり取りすることなくプロトコルに準拠している独立した「ネットワーク」は多数存在します。スマート・コントラクトやWeb3アプリをテストするために、自分のコンピュータ上でローカルにネットワークを立ち上げることも可能です。

イーサリアムのアカウントは異なるネットワーク間でも機能しますが、アカウントの残高やトランザクション履歴はメインのイーサリアム・ネットワークから引き継がれません。テスト目的においては、どのネットワークが利用可能か、そして試用するためのテストネットETHをどのように入手するかを知っておくと便利です。一般的に、セキュリティ上の理由から、メインネットのアカウントをテストネットで再利用したり、その逆を行ったりすることは推奨されません。

## 前提条件 {#prerequisites}

テストネットワークは、試用するための安価で安全なバージョンのイーサリアムを提供するため、さまざまなネットワークについて読む前に、[イーサリアムの基礎](/developers/docs/intro-to-ethereum/)を理解しておく必要があります。

## パブリック・ネットワーク {#public-networks}

パブリック・ネットワークは、インターネット接続があれば世界中の誰でもアクセスできます。誰でもパブリックなブロックチェーン上でトランザクションを読み取ったり作成したりでき、実行されるトランザクションを検証できます。ピア間のコンセンサスによって、トランザクションの包含とネットワークの状態が決定されます。

### イーサリアム・メインネット {#ethereum-mainnet}

メインネットは、イーサリアムの主要なパブリック本番ブロックチェーンであり、分散型台帳上で実際の価値を持つトランザクションが発生する場所です。

人々や取引所がETHの価格について話すとき、それはメインネットのETHを指しています。

### イーサリアムのテストネット {#ethereum-testnets}

メインネットに加えて、パブリックなテストネットが存在します。これらは、プロトコル開発者やスマート・コントラクト開発者が、メインネットへのデプロイ前に、本番環境に近い環境でプロトコルのアップグレードや潜在的なスマート・コントラクトをテストするために使用するネットワークです。これは、本番サーバーとステージング・サーバーの関係に似ていると考えてください。

作成したコントラクトのコードは、メインネットにデプロイする前にテストネットでテストする必要があります。既存のスマート・コントラクトと統合する分散型アプリケーション (dapp) のうち、ほとんどのプロジェクトはテストネットにコピーをデプロイしています。

ほとんどのテストネットは、パーミッションドなプルーフ・オブ・オーソリティのコンセンサス・メカニズムを使用することから始まりました。これは、少数のノードがトランザクションを検証し、新しいブロックを作成するために選ばれることを意味し、その過程で自身のアイデンティティをステーキングします。あるいは、一部のテストネットはオープンなプルーフ・オブ・ステーク (PoS) のコンセンサス・メカニズムを備えており、イーサリアム・メインネットと同様に、誰でもバリデータの実行をテストできます。

テストネット上のETHには実際の価値はないとされていますが、希少になったり入手が困難になったりした特定の種類のテストネットETHに対して市場が形成されたこともあります。（テストネットであっても）イーサリアムと実際にやり取りするにはETHが必要なため、ほとんどの人はフォーセットから無料でテストネットETHを入手します。ほとんどのフォーセットは、ETHの送信をリクエストするアドレスを入力できるWebアプリです。

#### どのテストネットを使用すべきですか？ {#which-testnet-should-i-use}

クライアント開発者が現在維持している2つのパブリックなテストネットは、SepoliaとHoodiです。Sepoliaは、コントラクトおよびアプリケーション開発者が自身のアプリケーションをテストするためのネットワークです。Hoodiネットワークでは、プロトコル開発者がネットワークのアップグレードをテストしたり、ステーカーがバリデータの実行をテストしたりできます。

#### Sepolia {#sepolia}

**Sepoliaは、アプリケーション開発において推奨されるデフォルトのテストネットです**。Sepoliaネットワークは、クライアントおよびテストチームによって管理されるパーミッションドなバリデータセットを使用します。

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
- [ethfaucet.com Sepoliaフォーセット](https://ethfaucet.com/networks/ethereum)
- [Google Cloud Web3 Sepoliaフォーセット](https://cloud.google.com/application/web3/faucet/ethereum/sepolia)
- [Grabteeth](https://grabteeth.xyz/)
- [Infura Sepoliaフォーセット](https://www.infura.io/faucet)
- [OpenFaucet.org Sepoliaフォーセット](https://openfaucet.org/ethereum-sepolia)
- [PoWフォーセット](https://sepolia-faucet.pk910.de/)
- [QuickNode Sepoliaフォーセット](https://faucet.quicknode.com/ethereum/sepolia)

#### Hoodi {#hoodi}

Hoodiは、検証とステーキングをテストするためのテストネットです。Hoodiネットワークは、テストネットのバリデータを実行したいユーザーに開かれています。したがって、メインネットにデプロイされる前にプロトコルのアップグレードをテストしたいステーカーは、Hoodiを使用する必要があります。

- オープンなバリデータセットであり、ステーカーはネットワークのアップグレードをテスト可能
- 状態が大きく、複雑なスマート・コントラクトの相互作用のテストに有用
- 同期に時間がかかり、ノードの実行により多くのストレージが必要

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
- [OpenFaucet.org Hoodiフォーセット](https://openfaucet.org/ethereum-hoodi)
- [PoWフォーセット](https://hoodi-faucet.pk910.de/)

#### Ephemery {#ephemery}

Ephemeryは、毎月完全にリセットされるユニークな種類のテストネットです。実行とコンセンサスの状態は28日ごとにジェネシスに戻るため、テストネット上で起こることはすべて一時的（エフェメラル）です。このため、短期的なテスト、高速なノードのブートストラップ、および永続性を必要としない「Hello World」のようなアプリケーションに最適です。

- 常に新鮮な状態であり、バリデータやアプリの短期的なテストが可能
- 基本的なコントラクトのセットのみを含む
- オープンなバリデータセットであり、大量の資金に簡単にアクセス可能
- 最小のノード要件と最速の同期（平均5GB未満）

##### リソース

- [ウェブサイト](https://ephemery.dev/)
- [GitHub](https://github.com/ephemery-testnet/ephemery-resources)
- [コミュニティチャット](https://matrix.to/#/#staker-testnet:matrix.org)
- [Blockscout](https://explorer.ephemery.dev/)
- [Otterscan](https://otter.bordel.wtf/)
- [ビーコン・エクスプローラー](https://beaconlight.ephemery.dev/)
- [チェックポイント同期](https://checkpoint-sync.ephemery.ethpandaops.io)
- [ローンチパッド](https://launchpad.ephemery.dev/)

#### フォーセット {#faucets}

- [Bordelフォーセット](https://faucet.bordel.wtf/)
- [Pk910 PoWフォーセット](https://ephemery-faucet.pk910.de/)

#### ホルスキー (非推奨) {#holesky}

ホルスキー・テストネットは2025年9月をもって非推奨となりました。ステーキング・オペレーターやインフラストラクチャ・プロバイダーは、バリデータのテストに代わりにHoodiを使用する必要があります。

- [ホルスキー・テストネットのシャットダウンに関するお知らせ](https://blog.ethereum.org/2025/09/01/holesky-shutdown-announcement) - _EFブログ、2025年9月1日_
- [ホルスキーおよびHoodiテストネットのアップデート](https://blog.ethereum.org/2025/03/18/hoodi-holesky) - _EFブログ、2025年3月18日_

### レイヤー2のテストネット {#layer-2-testnets}

[レイヤー2 (L2)](/layer-2/)は、イーサリアムのスケーリング・ソリューションの特定のセットを表す総称です。レイヤー2は、イーサリアムを拡張し、イーサリアムのセキュリティ保証を継承する独立したブロックチェーンです。レイヤー2のテストネットは通常、パブリックなイーサリアムのテストネットと密接に結びついています。

#### Arbitrum Sepolia {#arbitrum-sepolia}

[アービトラム](https://arbitrum.io/)のテストネットです。

##### リソース

- [Etherscan](https://sepolia.arbiscan.io/)
- [Blockscout](https://sepolia-explorer.arbitrum.io/)

##### フォーセット

- [Alchemy アービトラム Sepoliaフォーセット](https://www.alchemy.com/faucets/arbitrum-sepolia)
- [チェーンリンク アービトラム Sepoliaフォーセット](https://faucets.chain.link/arbitrum-sepolia)
- [ethfaucet.com アービトラム Sepoliaフォーセット](https://ethfaucet.com/networks/arbitrum)
- [OpenFaucet.org アービトラム Sepoliaフォーセット](https://openfaucet.org/arbitrum-sepolia)
- [QuickNode アービトラム Sepoliaフォーセット](https://faucet.quicknode.com/arbitrum/sepolia)

#### Optimistic Sepolia {#optimistic-sepolia}

[オプティミズム](https://www.optimism.io/)のテストネットです。

##### リソース

- [Etherscan](https://sepolia-optimistic.etherscan.io/)
- [Blockscout](https://optimism-sepolia.blockscout.com/)

##### フォーセット

- [Alchemyフォーセット](https://www.alchemy.com/faucets/optimism-sepolia)
- [チェーンリンク・フォーセット](https://faucets.chain.link/optimism-sepolia)
- [ethfaucet.com オプティミズム Sepoliaフォーセット](https://ethfaucet.com/networks/optimism)
- [OpenFaucet.org オプティミズム Sepoliaフォーセット](https://openfaucet.org/optimism-sepolia)
- [テストネット・フォーセット](https://docs.optimism.io/app-developers/tools/faucets)

#### スタークネット Sepolia {#starknet-sepolia}

[スタークネット](https://www.starknet.io)のテストネットです。

##### リソース

- [Voyager Sepolia Scan](https://sepolia.voyager.online/)

##### フォーセット

- [Alchemyフォーセット](https://www.alchemy.com/faucets/starknet-sepolia)
- [Blast スタークネット Sepoliaフォーセット](https://blastapi.io/faucets/starknet-sepolia-eth)
- [スタークネット・フォーセット](https://starknet-faucet.vercel.app/)

## プライベート・ネットワーク {#private-networks}

ノードがパブリック・ネットワーク（つまり、メインネットやテストネット）に接続されていない場合、そのイーサリアムのネットワークはプライベート・ネットワークとなります。この文脈において、プライベートとは保護されている、あるいは安全であるという意味ではなく、単に予約されている、または隔離されていることを意味します。

### 開発ネットワーク {#development-networks}

イーサリアムのアプリケーションを開発する際、デプロイする前にプライベート・ネットワーク上で実行して動作を確認したいと考えるでしょう。Web開発のためにコンピュータ上にローカルサーバーを作成するのと同じように、分散型アプリケーション (dapp) をテストするためのローカルなブロックチェーン・インスタンスを作成できます。これにより、パブリックなテストネットよりもはるかに高速なイテレーションが可能になります。

これを支援するための専用のプロジェクトやツールが存在します。[開発ネットワーク](/developers/docs/development-networks/)についてさらに学ぶ。

### コンソーシアム・ネットワーク {#consortium-networks}

コンセンサス・プロセスは、信頼されている事前定義されたノードのセットによって制御されます。例えば、既知の学術機関がそれぞれ単一のノードを管理するプライベート・ネットワークがあり、ネットワーク内の署名者のしきい値によってブロックが検証されるような場合です。

パブリックなイーサリアムのネットワークがパブリックなインターネットのようなものだとすれば、コンソーシアム・ネットワークはプライベートなイントラネットのようなものです。

## <Emoji text="🚉" /> なぜイーサリアムのテストネットは地下鉄の駅名にちなんで名付けられているのですか？ {#why-naming}

イーサリアムのテストネットの多くは、現実世界の地下鉄や電車の駅名にちなんで名付けられています。この命名の伝統は初期に始まり、コントリビューターが生活したり働いたりした世界中の都市を反映しています。これは象徴的で、記憶に残りやすく、実用的です。テストネットがイーサリアム・メインネットから隔離されているように、地下鉄の路線も地上の交通とは分離して運行されています。

### <Emoji text="🚧" /> 一般的に使用されているテストネットとレガシーなテストネット {#common-and-legacy-testnets}

- **Sepolia** - ギリシャのアテネにある地下鉄が通る地域。現在はスマート・コントラクトやdappのテストに使用されています。
- **Hoodi** - インドのベンガルールにあるHoodi地下鉄駅にちなんで名付けられました。バリデータやプロトコルのアップグレードのテストに使用されています。
- **ゴエリ** _(非推奨)_ - ドイツのベルリンにあるゲルリッツァー駅 (Görlitzer Bahnhof) にちなんで名付けられました。
- **Rinkeby** _(非推奨)_ - 地下鉄の駅があるストックホルムの郊外にちなんで名付けられました。
- **ロプステン** _(非推奨)_ - ストックホルムの地域であり、かつてのフェリー/地下鉄ターミナルを指します。
- **Kovan** _(非推奨)_ - シンガポールのMRTの駅にちなんで名付けられました。
- **Morden** _(非推奨)_ - ロンドン地下鉄の駅にちなんで名付けられました。イーサリアム初のパブリックなテストネットです。

### <Emoji text="🧪" /> その他の特化したテストネット {#other-testnets}

一部のテストネットは、短期的なテストやアップグレードに特化したテストのために作成されており、必ずしも地下鉄をテーマにしているわけではありません。

- **ホルスキー** _(非推奨)_ - プラハのホレショヴィツェ (Holešovice) 駅にちなんで名付けられました。バリデータのテストに使用され、2025年に非推奨となりました。
- **Kiln**、**Zhejiang**、**Shandong**、**Prater**、**Pyrmont**、**Olympic** _(すべて非推奨)_ および **Ephemery** - マージやシャンハイなどのアップグレードのシミュレーション、またはバリデータの実験のために専用に構築されました。一部の名前は地下鉄ベースではなく、地域的またはテーマに基づいています。

地下鉄の駅名を使用することで、開発者は数値のチェーンIDに頼ることなく、テストネットをすばやく識別して記憶することができます。これはまた、実用的でグローバル、そして人間中心というイーサリアムの文化を反映しています。

## 関連ツール {#related-tools}

- [Chainlist](https://chainlist.org/) _ウォレットやプロバイダーを適切なチェーンIDおよびネットワークIDに接続するためのEVMネットワークのリスト_
- [EVM-based Chains](https://github.com/ethereum-lists/chains) _Chainlistを機能させるチェーンのメタデータのGitHubリポジトリ_

## 参考文献 {#further-reading}

- [提案: 予測可能なイーサリアムのテストネットのライフサイクル](https://ethereum-magicians.org/t/proposal-predictable-ethereum-testnet-lifecycle/11575/17)
- [イーサリアムのテストネットの進化](https://etherworld.co/2022/08/19/the-evolution-of-ethereum-testnet/)
