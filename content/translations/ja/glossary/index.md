---
title: イーサリアム用語集
description: イーサリアムに関連する専門用語および非専門用語の未完成の用語集。
lang: ja
sidebarDepth: 2
---

# 用語集 {#ethereum-glossary}

<Divider />

## \# {#section-numbers}

### 51%攻撃 {#51-attack}

分散型[ネットワーク](#network)に対する攻撃の一種で、ある 1 つのグループが過半数の[ノード](#node)を支配すること。 その結果、[トランザクション](#transaction)を巻き戻したり、[イーサ](#ether)やその他のトークン消費を 2 倍にしたりすることでブロックチェーンの不正が可能となる。

## A {#section-a}

### アカウント(account) {#account}

[アドレス](#address)、残高、 [ノンス](#nonce)、任意のストレージとコードを含むオブジェクト。 アカウントには、[コントラクトアカウント](#contract-account)と[外部所有口座(EOA)](#eoa)の 2 種類がある。

<DocLink href="/developers/docs/accounts">
  イーサリアムアカウント
</DocLink>

### アドレス (address) {#address}

通常、アドレスはブロックチェーン上で[EOA](#eoa)または<a　href="#contract-account">コントラクト</a>を表すものであり、 ブロックチェーン上で[トランザクション](#transaction)を受信(宛先アドレスの場合)または送信(送信元アドレスの場合)できる。 より具体的に言うと、[ECDSA](#keccak-256)[公開鍵](#ecdsa)の[Keccak ハッシュ](#public-key)の最も右側にある 160 ビットがアドレスである。

### アプリケーション・バイナリ・インターフェイス(ABI) {#abi}

イーサリアムのエコシステムにおいて、 ブロックチェーンの外から、そしてコントラクト間の相互作用で[アカウント](#contract-account)とやり取りを行う標準的な方法。

<DocLink href="/developers/docs/smart-contracts/compiling/#web-applications">
  ABI
</DocLink>

### アプリケーション・プログラミング・インターフェイス(API) {#api}

アプリケーション・プログラミング・インターフェイス(API) は、ソフトウェアの使用方法に関する一連の定義。 API は、アプリケーションと Web サーバの間でデータの転送を行う。

### ASIC {#asic}

特定用途向け集積回路。 通常、暗号通貨マイニング等用のカスタムメイドの集積回路のことを指す。

### アサート(assert) {#assert}

[Solidity](#solidity)では、`assert(false)`は無効なオペコード`0xfe`にコンパイルされ、残りの[ガス](#gas)を使い切って全ての変更が巻き戻される。 `assert()`ステートメントでエラーが発生したときは、大きな間違いがあって、予期せぬことが起こっているため、コードを修正する必要がある。 `assert()`を使って、絶対に発生してはいけない条件を避けることが必要。

<DocLink href="/developers/docs/smart-contracts/security/">
  スマートコントラクトのセキュリティ
</DocLink>

### アテステーション(attestation) {#attestation}

あることが真実であるというエンティティによる主張。 イーサリアムのコンテキストでは、コンセンサスバリデータは、チェーンのあるべき状態について主張しなければならない。 指定された時間に、各バリデータは、このバリデータのチェーンの状態の見解を正式に宣言するさまざまなアテステーションを発行する責任がある。アテステーションには、最後に確定されたチェックポイントとチェーンの現在のヘッドが含まれている。

<DocLink href="/developers/docs/consensus-mechanisms/pos/attestations/">
  認証根拠
</DocLink>

<Divider />

## B {#section-b}

### ベースフィー(Base Fee) {#base-fee}

すべての[ブロック](#block)には「ベースフィー」と呼ばれるリザーブ価格がある。 ユーザーが次のブロックにトランザクションを含めるために支払わなければならない最低限の[ガス](#gas)代のこと。

<DocLink href="/developers/docs/gas/">
  ガスと手数料
</DocLink>

### ビーコンチェーン（Beacon Chain） {#beacon-chain}

ビーコンチェーンは、イーサリアムに[プルーフ・オブ・ステーク(PoS)](#pos)と[バリデータ](#validator)を導入したブロックチェーン。 2020 年 12 月から、2 つのチェーンが 2022 年 9 月にマージされ今日のイーサリアムを形成するまで、プルーフ・オブ・ワーク(PoW)のイーサリアムメインネットと並行して実行された。

<DocLink href="/upgrades/beacon-chain/">
  ビーコンチェーン
</DocLink>

### ビッグエンディアン(big-endian) {#big-endian}

最上位の桁がメモリ上で最初に位置する方式の数値表現のこと。 対義語のリトルエンディアン(little-endian)では最下位の桁がメモリ上の最初に位置する。

### ブロック(block) {#block}

ブロックは、トランザクションの順序リストとコンセンサス関連情報を含む、バンドルされた情報の単位。 プルーフ・オブ・ステーク(PoS)のバリデータによって提案され、その時点ですべてのピアツーピアネットワーク全体で共有される。ここでは、他のすべてのノードによって容易に独立検証できる。 コンセンサスルールは、ブロックのどのコンテンツが有効かを決定し、無効なブロックはネットワークによって無視される。 これらのブロックとその中のトランザクションの順序付けにより、ネットワークの現在の状態を表す先端を持つ決定論的な一連のイベントが作成される。

<DocLink href="/developers/docs/blocks/">
  ブロック
</DocLink>

### ブロックエクスプローラ(block explorer) {#block-explorer}

ブロックチェーンに関する情報をユーザーが検索するためのインターフェイス。 これには、個々のトランザクションや特定のアドレスに関連する状況、およびネットワーク情報の取得が含まれる。

### ブロックヘッダ(block header) {#block-header}

ブロックヘッダは、ブロックに関するメタデータと、実行ペイロードに含まれるトランザクションの概要をまとめたもの。

### ブロック伝播(block propagation) {#block-propagation}

検証済みのブロックをネットワーク上の他のすべてのノードに送信するプロセス。

### ブロックプロポーザ(block proposer) {#block-proposer}

特定の[スロット](#slot)にブロックを作成するために選ばれた特殊なバリデータ。

### ブロック報酬(block reward) {#block-reward}

新たな有効ブロック提案者に報酬として支払われるイーサの量。

### ブロックステータス(block status) {#block-status}

ブロックが存在できる状態。 可能な状態の一例を以下にご紹介します。

- 提案済み: ブロックがバリデータによって提案された
- スケジュール済み: バリデータが現在データを送信中
- 失敗した/スキップした: 提案者が指定時間内にブロックを提案できなかった
- 孤立した: ブロックが[フォーク選択アルゴリズム](#fork-choice-algorithm)によって再編成された

### ブロックタイム(block time) {#block-time}

ブロックがブロックチェーンに追加される時間間隔。

### ブロックバリデーション(block validation) {#block-validation}

新しいブロックに有効なトランザクションと署名が含まれていることを確認するプロセス。最も重く履歴のあるチェーン上に構築され、他のすべてのコンセンサスルールに従う。 有効なブロックはチェーンの末尾に追加され、ネットワーク上の他のブロックに伝播し、 無効なブロックは無視される。

### ブロックチェーン(blockchain) {#blockchain}

[ブロック](#block)の連鎖。どのブロックも、前のブロックのハッシュを参照することによって[始まりのブロック](#genesis-block)まで繋がっている。 ブロックチェーンの整合性は、プルーフ・オブ・ステーク(PoS)に基づく合意メカニズムによって暗号資産エコシステム内で確保されている。

<DocLink href="/developers/docs/intro-to-ethereum#what-is-a-blockchain">
  ブロックチェーンとは
</DocLink>

### ブートノード(bootnode) {#bootnode}

あるノードを実行するとき、ディスカバリープロセスを開始するために使用できるノード。 これらのノードのエンドポイントは、イーサリアムのソースコードに記録される。

### バイトコード(bytecode) {#bytecode}

ソフトウェアのインタープリタや仮想マシンで効率的に実行できるように設計された抽象的な命令セット。 ヒューマンリーダブルソースコードとは異なり、バイトコードは数値で表現される。

### ビザンチウムフォーク(Byzantium fork) {#byzantium-fork}

2 段階に分かれた[メトロポリス(Metropolis)](#metropolis)開発の[ハードフォーク](#hard-fork)の最初の段階。 これには、EIP-649 のメトロポリス[難点爆弾](#difficulty-bomb)遅延とブロック報酬の減額が含まれており、[氷河期](#ice-age)は 1 年延期になり、ブロック報酬は 5 ether から 3 ether に減少した。

<Divider />

## C {#section-c}

### キャスパー FFG(Casper-FFG) {#casper-ffg}

キャスパー FFG は、[LMD-GHOST](#lmd-ghost)フォーク・チョイス・アルゴリズムと組み合わせて実行されるプルーフ・オブ・ステーク(PoS)コンセンサスプロトコル。[コンセンサスクライアント](#consensus-client)によるビーコンチェーン先頭への合意を完了させる。

### チェックポイント(checkpoint) {#checkpoint}

[ビーコンチェーン](#beacon-chain)には、スロット(12 秒)とエポック(32 スロット)に分かれたテンポがあり、 各エポックの最初のスロットはチェックポイントとなる。 バリデータの[スーパーマジョリティ](#supermajority)が 2 つのチェックポイント間のリンクを証明すると、それらは[正当](#justification)となり、その上に別のチェックポイントが正当化されると、[確定](#finality)となる。

### コンパイル(compiling) {#compiling}

高レベルのプログラミング言語([Solidity](#solidity)など)で書かれたコードを低レベルの言語(EVM の[バイトコード](#bytecode)など)に変換すること。

<DocLink href="/developers/docs/smart-contracts/compiling/">
  スマートコントラクトのコンパイル
</DocLink>

### 委員会(committee) {#committee}

最低 128 人の[バリデータ](#validator)からなる、各スロットのブロックを検証するために集められたグループ。 バリデータの中から 1 人が集計者となって、委員会内の他のバリデータの同意署名をまとめる責任を負う。 [同期委員会](#sync-committee)と混同しないこと。

### 計算不可能(computational infeasibility) {#computational-infeasibility}

あるプロセスを実行しようと思った人たちにとって、非現実的にとても長い時間(たとえば数十億年)かかる場合、計算不可能となる。

### コンセンサス {#consensus}

ネットワーク上のスーパーマジョリティのノードすべてが、ローカルで検証された最良のブロックチェーンに同一のブロックを持っている状態。 [コンセンサスルール](#consensus-rules)と混同しないこと。

### コンセンサスクライアント {#consensus-client}

コンセンサスクライアント(Prysm、Teku、Nimbus、Lighthouse、Lodestar など)は、イーサリアムの[プルーフ・オブ・ステーク(PoS)](#pos)コンセンサスアルゴリズムを実行して、ビーコンチェーンの先頭でのネットワークの合意を得ることができる。 コンセンサスクライアントは、トランザクションの検証/ブロードキャスト、状態遷移の実行には参加しない。 [実行クライアント](#execution-client)によって行われる。

### コンセンサスレイヤー {#consensus-layer}

イーサリアムのコンセンサスレイヤーは、[コンセンサスクライアント](#consensus-client)のネットワークです。

### コンセンサスルール(consensus rules) {#consensus-rules}

他のノードとのコンセンサスを維持するために、フルノードが従うべきブロックの検証ルール。 [コンセンサス](#consensus)と混同しないこと。

### アップデートに含めるために検討(CFI: Considered for Inclusion) {#cfi}

メインネットではまだアクティブになっていないコア[EIP](#eip)であり、通常クライアントデベロッパーは、このアイデアに対して肯定的。 メインネットに含めるためのすべての要件を満たしていると仮定すると、ネットワークのアップグレードに含まれる可能性がある(必ずしも次回のアップグレードとは限らない) 。

### コンスタンティノープルフォーク {#constantinople-fork}

[メトロポリス](#metropolis)ステージの第 2 段階で、当初は 2018 年の半ばに計画されていた。 コンセンサスアルゴリズムを[プルーフ・オブ・ワーク(PoW)](#pow)と[プルーフ・オブ・ステーク(PoS)](#pos)のハイブリッドへと切り替えることも期待されていた。

### コントラクトアカウント {#contract-account}

他の[アカウント](#account)([EOA](#eoa)または[コントラクト](#contract-account))から[トランザクション](#transaction)を受け取るたびに実行されるコードを含むアカウント。

### コントラクト作成トランザクション {#contract-creation-transaction}

コントラクトの初期化コードを含む特別な[トランザクション](#transaction)。 受取人は、`null`に設定され、コントラクトはユーザーアドレスと`nonce`から生成されたアドレスにデプロイされる。 [コントラクト](#contract-account)を登録し、イーサリアムブロックチェーンに記録するために使用される。

### クリプトエコノミクス {#cryptoeconomics}

暗号通貨の経済学。

## D {#section-d}

### Đ {#d-with-stroke}

Đ(ストローク付の D)は、は、古英語、中英語、アイスランド語、フェロー語で、大文字の「Eth」の略として使われている。 ĐEV や Đapp(分散アプリケーション)などの単語で使用される。この「Đ」は北欧文字の「eth」。 大文字の eth(Ð)は、暗号通貨のドージコインのシンボルとしても使用される。 古いイーサリアムの文献でよく見られますが、今日ではあまり使用されていない。

### DAG {#dag}

DAG は、Directed Acyclic Graph(有向非巡回グラフ)の略であり、 ノードとノード間のリンクで構成されるデータ構造。 マージ以前のイーサリアムでは、[プルーフ・オブ・ワーク(PoW)](#pow)アルゴリズムの[Ethash](#ethash)で DAG を使用していたが、現在の[プルーフ・オブ・ステーク(PoS)](#pos)では使用していない。

### 分散型アプリケーション(Dapp) {#dapp}

分散型アプリケーション。 最小の構成は、[スマートコントラクト](#smart-contract)とウェブユーザーインターフェイス。 広義では、オープンな分散型の P2P インフラストラクチャサービス上に構築されている Web アプリケーション。 さらに、多くの Dapp には、分散型ストレージや、メッセージプロトコル、プラットフォームが含まれる。

<DocLink href="/developers/docs/dapps/">
  Dapp入門
</DocLink>

### データの可用性(data availability) {#data-availability}

ネットワーク上のどのノードでも、任意の部分データをダウンロードできる状態。

### 分散化(decentralization) {#decentralization}

プロセスの制御と実行を中央組織から移行するという概念です。

### 自律分散型組織(DAO) {#dao}

階層的な管理をせずに運営されている会社やその他の組織のこと。 2016 年 4 月 30 日に立ち上げられた「The DAO」という名のコントラクトを指す場合もある。「The DAO」は 2016 年 6 月にハッキングされ、最終的にブロック 1,192,000 で[ハードフォーク](#hard-fork)(コードネーム: DAO)を実行させることとなり、ハッキングされた DAO コントラクトを巻き戻すことにした。これをきっかけに、イーサリアムとイーサリアムクラシックは競合する 2 つのシステムとして分裂。

<DocLink href="/dao/">
  分散型自律組織(DAO)
</DocLink>

### 分散型取引所(DEX) {#dex}

ネットワーク上のピアとトークンを取引できる[dapp](#dapp)の一種。 使用するには、([トランザクションフィー](#transaction-fee)を支払うため)[イーサリアム](#ether)が必要となるが、中央集権型取引所のような地理的制限はなく、誰でも使用可能。

<DocLink href="/get-eth/#dex">
  分散型取引所
</DocLink>

### deed {#deed}

[非代替性トークン(NFT)を参照](#nft)。

### デポジットコントラクト(deposit contract) {#deposit-contract}

イーサリアムのステーキングの入り口。 デポジットコントラクトは、ETH のデポジットを受け入れ、バリデータの残高を管理するイーサリアム上のスマートコントラクト。 コントラクトに ETH を入金しないと、バリデータを有効にすることはできない。 コントラクトには、ETH と入力データが必要。 この入力データには、バリデータの公開鍵と、バリデータの秘密鍵によって署名された出金用の公開鍵が含まれる。 このデータは、バリデータが[プルーフ・オブ・ステーク(PoS)](#pos)ネットワークによって識別、承認されるために必要となる。

### 分散型金融(DeFi) {#defi}

「非中央集権型金融」の略で、ブロックチェーン上の金融サービス[Dapps](#dapp)のより広義なカテゴリー。仲介業者を介さないため、インターネット環境があれば誰でも利用可能。

<DocLink href="/defi/">
  分散型金融(DeFi)
</DocLink>

### 難易度(difficulty) {#difficulty}

[プルーフ・オブ・ワーク(PoW)](#pow)ネットワークにおけるネットワーク全体の設定で、有効なノンスを見つけるために必要な平均計算量を制御。 難易度は、有効であると見なされるために得られたブロックハッシュに必要な先頭のゼロの数で表される。 このコンセプトは、プルーフ・オブ・ステークへの移行に伴いイーサリアムでは廃止。

### ディフィカルティボム(difficulty bomb) {#difficulty-bomb}

計画的に[プルーフ・オブ・ワーク(PoW)](#pow)の[難易度](#difficulty)設定を急激に上げた。[プルーフ・オブ・ステーク(PoS)](#pos)への移行を促す目的で、[フォーク](#hard-fork)の機会を減らすために設計されたもの。 ディフィカルティボムは、[プルーフ・オブ・ステーク(PoS)](/upgrades/merge)への移行に伴い廃止。

### 電子署名(digital signature) {#digital-signatures}

ユーザーが[秘密鍵](#private-key)を利用してドキュメントを生成する短い文字列で、対応する[公開鍵](#public-key)を利用して、誰でも(1)秘密鍵の所有者によってドキュメントに署名がなされたこと、(2) 署名後にドキュメントが変更されていないことを検証できる。

<Divider />

### ディスカバリー(Discovery) {#discovery}

イーサリアムノードが接続する他のノードを見つけるプロセス。

### 分散ハッシュテーブル(DHT) {#distributed-hash-table}

`(key, value)`ペアを含むデータ構造で、イーサリアムノードが接続するピアの特定と、通信に使用するプロトコルを決定するために使用される。

### 二重支払(double spend) {#double-spend}

意図的なブロックチェーンフォークで、十分な量のマイニングパワーまたはステークを持つユーザーが、ある通貨をオフチェーンに移動するトランザクションを送信し (例: 不換紙幣に交換する、オフチェーンで購入するなど)、そのトランザクションを削除するためにブロックチェーンを再編成すること。 二重支払に成功すると、攻撃者はオンチェーンとオフチェーンの両方の資産を手に入れることができる。

## E {#section-e}

### 楕円曲線 DSA(ECDSA) {#ecdsa}

所有者以外はその資金を使うことができないようにするイーサリアムの暗号論的アルゴリズム。 秘密鍵と公開鍵を作成するための好ましい方法。 アカウント[アドレス](#address)の生成や、[トランザクション](#transaction)の検証に関連している。

### 暗号化(encryption) {#encryption}

暗号化とは、正しい復号化キーを持つ所有者以外は読めない形式に電子データを変換すること。

### エントロピー(entropy) {#entropy}

暗号技術のコンテクストにおいては、予測可能性やランダム性の度合いを指す。 [秘密鍵](#private-key)のような機密情報を生成する際、アルゴリズムは通常、出力結果を予測不可能とするために高エントロピー源に依存する。

### エポック(epoch) {#epoch}

32[スロット](#slot)の期間で、各スロットは 12 秒、合計 6.4 分。 バリデータ[委員会](#committee)はセキュリティ上の理由からエポックごとにシャッフルされる。 各エポックには、チェーンを[確定](#finality)する機会があり、 各バリデータには、各エポックの開始時に新しい役割が割り当てられる。

<DocLink href="/developers/docs/consensus-mechanisms/pos/#how-does-validation-work">
  プルーフ・オブ・ステーク
</DocLink>

### 曖昧度(equivocation) {#equivocation}

お互いに矛盾する 2 つのメッセージを送信するバリデータ。 シンプルな一例として挙げられるのは、トランザクション送信者が、同じノンスで 2 つのトランザクションを送信する場合。 もう一つの例としては、2 つのブロックを同じブロック高(または同じスロット)で提案するブロック提案者。

### Eth1 {#eth1}

「Eth1」は、既存のプルーフ・オブ・ワーク(PoW)ブロックチェーンであるメインネットのイーサリアムを指す用語。 この用語は廃止予定となっており、「実行レイヤー」という用語を使用する。 この名前の変更についての詳細は、[こちら](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/)を参照のこと。

<DocLink href="/upgrades/">
  イーサリアムのアップグレードの詳細
</DocLink>

### Eth2 {#eth2}

「Eth2」は、イーサリアムのプルーフ・オブ・ステーク(PoS)への移行を含む一連のイーサリアムプロトコルのアップグレードのこと。 この用語は廃止予定となっており、「コンセンサスレイヤー」という用語を使います。 [この名前の変更](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/) についてもっと詳しく。

<DocLink href="/upgrades/">
  イーサリアムのアップグレードの詳細
</DocLink>

### イーサリアム改善提案(EIP) {#eip}

イーサリアムコミュニティに情報を提供するための設計文書。提案された新機能やプロセス、環境について説明している([ERC](#erc)を参照のこと)。

<DocLink href="/eips/">
  EIP紹介
</DocLink>

### イーサリアム名サービス(ENS) {#ens}

ENS レジストリは、単一の中央[コントラクト](#smart-contract)で、[EIP](#eip)137 に記述されているような、ドメイン名と所有者やリゾルバとの対応付けを提供。

[詳細は ens.domains を参照のこと。](https://ens.domains)

### 実行クライアント {#execution-client}

ベス (Besu) 、エリゴン (Erigon) 、Geth(Go-ethereum) 、ネザーマインド(Nethermind)などの実行クライアント(以前は「Eth1 クライアント」と呼ばれていた)のタスクは、トランザクションの処理とブロードキャスト、イーサリアムのステート(状態) の管理。 プロトコルのルールが守られていることを確認するために、[イーサリアム仮想マシン](#evm)を使用して各トランザクションの計算を実行する。

### 実行レイヤー {#execution-layer}

イーサリアムの実行レイヤーは、[実行クライアント](#execution-client)のネットワーク。

### 外部所有アカウント(EOA) {#eoa}

[秘密鍵](#private-key)によって制御される[アカウント](#account)のこと。通常は、[シードフレーズ](#hd-wallet-seed)を使用して生成される。 外部所有アカウントは、スマートコントラクトと違いコードが関連付けられていない。 通常、これらのアカウントは[ウォレット](#wallet)で管理される。

### コメントを求めるイーサリアムリクエスト(ERC) {#erc}

一定の[EIP](#eip)に付与されるラベルで、イーサリアムの使用に関する特定の基準を定めたもの。

<DocLink href="/eips/">
  EIP紹介
</DocLink>

### Ethash {#ethash}

[プルーフ・オブ・ステーク(PoS)](#pos)に移行する前にイーサリアムで使用されていた[プルーフ・オブ・ワーク(PoW)](#pow)のアルゴリズム。

[続きを読む](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash)

### イーサ(ether) {#ether}

イーサリアムエコシステムによって使用されるネイティブ暗号通貨で、トランザクションの実行には[ガス](#gas)代がかかる。 ETH またはその記号をギリシャ文字の大文字で「Ξ」と表すこともできる。

<DocLink href="/eth/">
  デジタル未来のための通貨
</DocLink>

### イベント (Event) {#events}

[EVM](#evm)ロギング機能を利用できる。 [Dapp](#dapp)はイベントをリッスンし、ユーザーインタフェイス内の JavaScript で記述されたコールバックをトリガするために利用可能。

<DocLink href="/developers/docs/smart-contracts/anatomy/#events-and-logs">
  イベントとログ(Events and Logs)
</DocLink>

### イーサリアム仮想マシン(EVM) {#evm}

[バイトコード](#bytecode)を実行するスタックベースの仮想マシン。 イーサリアムでは、一連のバイトコード命令と環境データの小さなタプルを与えられた場合に、システムの状態をどのように変化するかを実行モデルが指定する。 これは、仮想状態マシンの正則モデルによって指定されている。

<DocLink href="/developers/docs/evm/">
  イーサリアム仮想マシン (EVM)
</DocLink>

### EVM アセンブリ言語(EVM assembly language) {#evm-assembly-language}

EVM の[バイトコード](#bytecode)をヒューマンリーダブル形式にしたもの。

<Divider />

## F {#section-f}

### フォールバック関数 (fallback function) {#fallback-function}

データや宣言された関数名がない場合に呼び出されるデフォルトの関数のこと。

### フォーセット(faucet) {#faucet}

[スマートコントラクト](#smart-contract)を介して実行されるサービスで、テストネットで使用できる無料のテスト用イーサの形で資金を分配する。

<DocLink href="/developers/docs/networks/#testnet-faucets">
  テストネットのフォーセット
</DocLink>

### ファイナリティ(finality) {#finality}

ファイナリティとは、ある時点以前の一連のトランザクションが変更または撤回できないことを保証するもの。

<DocLink href="/developers/docs/consensus-mechanisms/pos/#finality">
  Proof-of-Stakeにおけるファイナリティ
</DocLink>

### finney {#finney}

[ether](#ether)の単位。 1 finney = 10<sup>15</sup> [wei](#wei)。 10<sup>3</sup> finney = 1 ether。

### フォーク(fork) {#fork}

プロトコルを変更することで、代替チェーンが生成されたり、一時的な分岐によって 2 つの潜在的なブロックパスが生成されたりする。

### フォーク選択アルゴリズム(fork-choice algorithm) {#fork-choice-algorithm}

ブロックチェーンの先頭を特定するために使用されるアルゴリズム。 実行レイヤーでは、チェーンのヘッドは最大の難易度を持つものとして識別される。 つまり、チェーンの真のヘッドが、マイニングに最も多くの作業を要することを意味する。 コンセンサスレイヤーでは、アルゴリズムはバリデータ([LMD_GHOST](#lmd-ghost))から蓄積されたアテステーションを監視。

### 不正証明(fraud proof) {#fraud-proof}

特定の[レイヤー 2](#layer-2)ソリューションに対するセキュリティモデルで、スピードを上げるために複数のトランザクションを 1 つのバッチに[ロールアップ](#rollups)して、1 つのトランザクションとしてイーサリアムに送信。 これらのトランザクションは有効とみなされるが、不正が疑われる場合にはチャレンジを受けることもある。 不正証明は、不正が疑われるときトランザクションを実行し、不正が行われたかどうかを検証する。 この方法は、セキュリティを保持しながら、可能なトランザクションの量を増やすことができる。 [ロールアップ](#rollups)の方法の中には、[有効性証明](#validity-proof)を利用しているものもある。

<DocLink href="/developers/docs/scaling/optimistic-rollups/">
  楽観的ロールアップ
</DocLink>

### フロンティア(Frontier) {#frontier}

2015 年 7 月から 2016 年 3 月までの間のイーサリアムの最初のテスト開発段階。

<Divider />

## G {#section-g}

### ガス {#gas}

イーサリアムでスマートコントラクトを実行するための仮想燃料。 [EVM](#evm)は、ガスの消費量を測定し、コンピューティングリソースの消費を制限する会計メカニズムを使用している。([チューリング完了](#turing-complete)参照)

<DocLink href="/developers/docs/gas/">
  ガスと手数料
</DocLink>

### ガスリミット(gas limit) {#gas-limit}

[トランザクション](#transaction)や[ブロック](#block)が消費する[ガス](#gas)の上限。

### ガス代(gas price) {#gas-price}

所定トランザクション 1 回につきかかる価格(Ether)。

### 始まりのブロック(genesis block) {#genesis-block}

[ブロックチェーン](#blockchain)の最初のブロックで、特定のネットワークとその暗号通貨を初期化するために使用される。

### geth {#geth}

Go Ethereum。 Go で書かれたイーサリアムプロトコルの最も優れた実装の 1 つ。

[詳細は geth.ethereum.org を参照。](https://geth.ethereum.org/)

### gwei {#gwei}

Gigawei の略称で、通常[ガス](#gas)の価格に使われる[イーサ](#ether)の呼称。 1 gwei = 10<sup>9</sup> [wei](#wei)。 10<sup>9</sup> gwei = 1 ether。

<Divider />

## H {#section-h}

### ハードフォーク(hard fork) {#hard-fork}

[ブロックチェーン](#blockchain)の恒久的な分岐。変更ハードフォークとしても知られる。 アップグレードされていないノードが、新しい[コンセンサスルール](#consensus-rules)に遵守するアップグレードされたノードによって作成されたブロックを検証できない場合、このような状況が頻繁に発生。 フォーク、ソフトフォーク、ソフトウェアフォーク、Git フォークと混同しないこと。

### ハッシュ(hash) {#hash}

可変長サイズ入力の固定長フィンガープリントで、ハッシュ関数によって生成される ([keccak-256](#keccak-256)を参照)。

### ハッシュレート(hashrate) {#hash-rate}

マイニングソフトを実行しているコンピュータが、1 秒当たりに計算するハッシュの数。

### HD ウォレット(HD wallet) {#hd-wallet}

階層的決定性(HD)キーの作成と転送プロトコルを使用した[ウォレット](#wallet)。

[詳細は github.com を参照。](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)

### HD ウォレットシード(HD wallet seed) {#hd-wallet-seed}

マスター[秘密鍵](#private-key)と HD[ウォレット](#wallet)のマスターチェーンコードの生成に使用される値。 ウォレットシードはニーモニックと呼ばれる単語の羅列で表すことができるため、秘密鍵のコピー、バックアップ、復元が容易になる。

### ホームステッド(homestead) {#homestead}

2016 年 3 月に、ブロック 1,150,000 でローンチされたイーサリアムの開発第 2 段階。

<Divider />

## I {#section-i}

### インデックス {#index}

ストレージソースへの効率的なパスを最強することによって[ブロックチェーン](#blockchain)全体からの情報のクエリを最適化するためのネットワーク構造。

### 取引所間クライアントアドレスプロトコル(ICAP) {#icap}

国際銀行口座番号(IBAN)形式と部分的に互換性のあるイーサリアムアドレスの形式で、汎用的でチェックサムの付与された、相互運用可能なイーサリアムアドレスの形式を提供する。 ICAP アドレスは、(たとえば XBT、XRP、XCP のような)非管轄通貨で利用される疑似国家コードとして、「eXtended Ethereum」を意味する XE を使用する。

### 氷河期(Ice Age) {#ice-age}

ブロック 200,000 で発生したイーサリアムの[ハードフォーク](#hard-fork)で、[PoS](#pos)への移行を促すために指数関数的な[ディフィカルティ](#difficulty)の増加([ディフィカルティボム](#difficulty-bomb)とも呼ばれる)を導入した。

### 統合開発環境(IDE) {#ide}

一般的にはコードエディタ、コンパイラ、ランタイム、デバッガを統合したユーザーインターフェイス。

<DocLink href="/developers/docs/ides/">
  統合開発環境
</DocLink>

### 不変のデプロイコード問題(immutable deployed code problem) {#immutable-deployed-code-problem}

[コントラクト](#smart-contract)(または[ライブラリ](#library))のコードは一度デプロイすると変更が不可能となる。 標準的なソフトウェア開発の手法では、起こりうるバグの修正や新機能を追加が可能であることを前提としているため、スマートコントラクトの開発における代表的な課題となっている。

<DocLink href="/developers/docs/smart-contracts/deploying/">
  スマートコントラクトのデプロイ
</DocLink>

### 内部取引(internal transaction) {#internal-transaction}

[コントラクトアカウント](#contract-account)から別のコントラクトアカウントまたは[EOA](#eoa)に送信される[トランザクション](#transaction)([メッセージ](#message)を参照)。

<Divider />

### イシュアンス(issuance)

報酬ブロックの提案、アテステーション、不正の告発に対して新しく Ether を発行すること。

## K {#section-k}

### 鍵導出関数(KDF) {#kdf}

「パスワード伸長アルゴリズム」としても知られる。[キーストア](#keystore-file)形式で使われており、パスフレーズによる暗号化において、パスフレーズを繰り返しハッシュ化することで総当たり攻撃や辞書攻撃、レインボー攻撃から保護することができる。

<DocLink href="/developers/docs/smart-contracts/security/">
  スマートコントラクトのセキュリティ
</DocLink>

### キーストア(keystore) {#keyfile}

イーサリアムクライアント内に存在する、すべてのアカウントの秘密鍵とアドレスのペアを保存した単一のファイル。 アカウント作成時に入力したパスワードで復号可能な、暗号化されたアカウントの秘密鍵を含む JSON 形式のテキストファイル。

### keccak-256 {#keccak-256}

イーサリアムで利用されている暗号論的[ハッシュ](#hash)関数。 Keccak-256 は[SHA](#sha)-3 として標準化されている。

<Divider />

## L {#section-l}

### レイヤー 2 {#layer-2}

イーサリアムのプロトコル上で、レイヤーによる改善に焦点を当てた開発分野。 [トランザクション](#transaction)の速度、[トランザクションフィー](#transaction-fee)の低減、トランザクションのプライバシーに関して改善を図るもの。

<DocLink href="/layer-2/">
  レイヤー2
</DocLink>

### LevelDB {#level-db}

オープンソースのオンディスクなキーバリューストアで、軽量かつ単一目的的な[ライブラリ](#library)として実装されており、多くのプラットフォーム向けバインディングが存在している。

### ライブラリ(library) {#library}

payable 関数、フォールバック関数、データストレージを持たない特殊な[コントラクト](#smart-contract)。 つまり、ETH を受け取ったり、保持したり、データを保存することはできない。 ライブラリは以前にデプロイされたコードとして機能し、他のコントラクトから読み取り専用の計算を呼び出すことができる。

<DocLink href="/developers/docs/smart-contracts/libraries/">
  スマートコントラクトライブラリ
</DocLink>

### ライトクライアント(light client) {#light-client}

[ブロックチェーン](#blockchain)のコピーをローカルに保存したり、ブロックや[トランザクション](#transaction)を検証したりしないイーサリアムのクライアント。 [ウォレット](#wallet)としての機能を提供し、トランザクションの作成やブロードキャストができる。

<Divider />

### LMD_GHOST {#lmd-ghost}

イーサリアムのコンセンサスクライアントがチェーンのヘッドを特定するために使用する[フォーク選択アルゴリズム](#fork-choice-algorithm)。 LMD-GHOST は、「Latest Message Driven Greediest Heaviest Observed SubTree」の頭字語であり、チェーンの先頭がその歴史の中で[アテステーション](#attestation)の最大の蓄積を持つブロックであることを意味する。

## M {#section-m}

### メインネット {#mainnet}

「メインネットワーク」の略で、メインの公開イーサリアム [ブロックチェーン](#blockchain)を指す。 本物の ETH であり、実質的な価値を持ち、そして実際に起きている結果。 [レイヤー 2](#layer-2)スケーリングソリューションについて議論するときには、レイヤー 1 とも呼ばれる ([テストネット](#testnet)も参照のこと)。

<DocLink href="/developers/docs/networks/">
  イーサリアムネットワーク
</DocLink>

### メモリハード(memory-hard) {#memory-hard}

メモリハード関数とは、使用可能メモリ量が少しでも減少した場合に、速度や実行可能性が大幅に低下するプロセスのこと。 たとえば、イーサリアムのマイニングアルゴリズム[Ethash](#ethash)が挙げられる。

### マークルパトリシア木(Merkle Patricia trie) {#merkle-patricia-tree}

キーバリューペアを効率的に格納するため、イーサリアムで利用されているデータ構造。

### メッセージ(message) {#message}

[EVM](#evm)の内部でだけ送信され、シリアライズされることのない[内部トランザクション](#internal-transaction)。

### メッセージ呼び出し(message call) {#message-call}

あるアカウントから別のアカウントに[メッセージ](#message)を伝えること。 宛先アカウントが[EVM](#evm)コー ​​ ドと関連付けられている場合、VM はそのオブジェクトの状態で起動され、メッセージが作動する。

### メトロポリス(Metropolis) {#metropolis}

2017 年 10 月にローンチした、イーサリアムの開発第 3 段階。

### マイニング(mining) {#mining}

先頭の任意の数のバイナリゼロが結果に含まれるまで、[ノンス](#nonce)をインクリメントしながらブロックヘッダーを繰り返しハッシュするプロセス。 新しい[ブロック](#block)がプルーフ・オブ・ワーク(PoW)[ブロックチェーン](#blockchain)に追加される。 [プルーフ・オブ・ステーク(PoS)](#pos)に移行する前まで、イーサリアムはこの方法で保護されていた。

### マイナー(miner) {#miner}

新しいブロックに対して有効な[プルーフ・オブ・ワーク(PoW)](#pow)を見つけるために繰り返しパスハッシュを計算するネットワーク[ノード](#node)の一種([Ethash](#ethash)を参照)。 マイナーはもはやイーサリアムの一部ではなく、[プルーフ・オブ・ステーク(PoS)](#pos)への移行に伴い、バリデータに置き換えられた。

<DocLink href="/developers/docs/consensus-mechanisms/pow/mining/">
  マイニング
</DocLink>

### ミント (mint) {#mint}

ミント(Minting)は、新しいトークンを作成し、流通させて使用できるようにするプロセス。 中央当局の関与なしに新しいトークンを作成するための分散型メカニズム。

<Divider />

## N {#section-n}

### ネットワーク(network) {#network}

イーサリアムネットワークのこと。トランザクションやブロックをすべてのイーサリアムノード(ネットワーク参加者)に伝播していくピアツーピアネットワーク。

<DocLink href="/developers/docs/networks/">
  ネットワーク
</DocLink>

### ネットワークハッシュレート(network hashrate) {#network-hashrate}

マイニングネットワーク全体によって生成された集合的な[ハッシュレート](#hashrate)。 [プルーフ・オブ・ステーク(PoS)](#pos)への移行に伴い、イーサリアムでのマイニングはオフになった。

### 非代替性トークン(NFT) {#nft}

「deed」としても知られる ERC-721 で導入されたトークンの標準。 NFT は追跡可能かつ取引可能だが、それぞれのトークンは一意で区別があり、ETH や[ERC-20 トークン](#token-standard)のように相互に取引することはできない。 NFT はデジタル資産や物理的な資産の所有権を表すことができる。

<DocLink href="/nft/">
  非代替性トークン(NFT)
</DocLink>
<DocLink href="/developers/docs/standards/tokens/erc-721/">
  ERC-721 非代替性トークン (NFT) 規格
</DocLink>

### ノード(node) {#node}

ネットワークに参加するソフトウェアクライアントのこと。

<DocLink href="/developers/docs/nodes-and-clients/">
  ノードとクライアント
</DocLink>

### ノンス(nonce) {#nonce}

暗号技術において、一度しか使われない値のこと。 アカウントのノンスは、各アカウントのトランザクションカウンターであり、リプレイ攻撃を防ぐために使用される。

<Divider />

## O {#section-o}

### オマー(アンクル)ブロック(ommer (uncle) block) {#ommer}

プルーフ・オブ・ワークの[マイナー](#miner)が有効な[ブロック](#block)を見つけたとき、先に他のマイナーが競合するブロックを公開し、これがブロックチェーンの先端に追加されること。 古くあっても有効なブロックは*オマー*として新しいブロックに含めることができ、ブロック報酬の一部を受け取ることができる。 オマーとは、親の同生を示すジェンダーニュートラルで好ましい用語であるが、「アンクル」と呼ばれることもある。 これは、[プルーフ・オブ・ワーク(PoW)](#pow)ネットワーク時代のイーサリアムに関連していたものであり、[プルーフ・オブ・ステーク(PoS)](#pos) のイーサリアムの機能ではない。プルーフ・オブ・ステーク(PoS)では、各スロットでブロック提案者 1 人が的確に選ばれる。

### オプティミスティック・ロールアップ(optimistic rollup) {#optimistic-rollup}

[レイヤー 2](#layer-2)によってトランザクションのスループットを上げ、[メインネット](#mainnet)(レイヤー 1)によってセキュリティを提供する、[不正証明](#fraud-proof)を用いたトランザクションの[ロールアップ](#rollups)。 [プラズマ](#plasma)という類似のレイヤー 2 ソリューションとは異なり、オプティミスティック・ロールアップではより複雑なトランザクションのタイプ、つまり[EVM](#evm)で実行できるすべてを処理できる。 [ゼロ知識ロールアップ](#zk-rollups)とは異なり、不正証明を用いるためレイテンシの問題がない。

<DocLink href="/developers/docs/scaling/optimistic-rollups/">
  楽観的ロールアップ
</DocLink>

### オラクル(Oracle) {#oracle}

オラクルとは、[ブロックチェーン](#blockchain)と現実世界を繋ぐブリッジであり、 情報を参照して[スマートコントラクト](#smart-contract)で利用できるオンチェーン[API](#api)として機能する。

<DocLink href="/developers/docs/oracles/">
  神託
</DocLink>

<Divider />

## P {#section-p}

### パリティ(parity) {#parity}

イーサリアムのクライアントソフトウェアの中で最も優れた相互運用可能な実装の 1 つ。

### ピア(peer) {#peer}

イーサリアムのクライアントソフトウェアを実行して接続しているコンピューターで、同一のブロックチェーンのコピーを持っている。

### P2P(Peert To Peer)ネットワーク {#peer-to-peer-network}

コンピューター([ピア](#peer))のネットワークで、中央集権的なサーバーベースのサービスを必要とせずに、集合的に機能を実行できる。

### プラズマ {#plasma}

[オプティミスティック・ロールアップ](#optimistic-rollups)と同様、[不正証明](#fraud-proof)を用いたオフチェーンのスケーリングソリューション。 プラズマは基本的なトークンの転送やスワップなどの単純なトランザクションに限って利用可能。

<DocLink href="/developers/docs/scaling/plasma">
  プラズマ
</DocLink>

### 秘密鍵(シークレットキー) (private key (secret key)) {#private-key}

イーサリアムのユーザーが、電子署名を生成することでアカウントまたはコントラクトの所有権を証明するための秘密の数字([公開鍵](#public-key)、[アドレス](#address)、[ECDSA](#ecdsa)を参照)。

### プライベートチェーン(private chain) {#private-chain}

完全にプライベートなブロックチェーン。許可型のアクセスとなっており、一般公開されていないもの。

### プルーフ・オブ・ステーク(PoS) {#pos}

暗号通貨のブロックチェーンプロトコルによって、分散型[コンセンサス](#consensus)を達成する方法。 トランザクションの検証に参加するため、PoS は一定量の暗号通貨(ネットワーク内のステーク)の所有権を証明するようユーザーに要求する。

<DocLink href="/developers/docs/consensus-mechanisms/pos/">
  プルーフ・オブ・ステーク(PoS)
</DocLink>

### プルーフ・オブ・ワーク(PoW) {#pow}

発見するために大量の計算を要するデータ(証明)の一部。

<DocLink href="/developers/docs/consensus-mechanisms/pow/">
  プルーフ・オブ・ワーク
</DocLink>

### 公開鍵(public key) {#public-key}

[秘密鍵](#private-key)から一方向関数で導出された数字。公開共有され誰でも使用でき、対応する秘密鍵で作られた電子署名を検証できる。

<Divider />

## R {#section-r}

### レシート(receipt) {#receipt}

イーサリアムのクライアントから返されるデータで、特定の[トランザクション](#transaction)の[ハッシュ](#hash)、[ブロック](#block)ナンバー、使用された[ガス](#gas)代および[スマートコントラクト](#smart-contract)のデプロイにおいては[コントラクトアドレス](#address)を含む。

### 再帰可能攻撃(re-entrancy attack) {#re-entrancy-attack}

被害者のコントラクト関数を呼び出す攻撃者のコントラクトで構成される、被害者のコントラクトの実行中に再帰的に攻撃者のコントラクトを呼び出すような攻撃。 たとえば、被害者のコントラクトの一部をスキップして残高を更新したり、引き出す金額をカウントしたりすることで、資金が盗難される可能性がある。

<DocLink href="/developers/docs/smart-contracts/security/#re-entrancy">
  再帰可能(Re-entrancy)
</DocLink>

### 報酬(reward) {#reward}

[プルーフ・オブ・ワーク(PoW)](#pow)ソリューションを見つけた[マイナー](#miner)への報酬として、それぞれの新しいブロックに含まれる ether の量。

### 再帰長プレフィックス(RLP) {#rlp}

イーサリアムのデベロッパーによって設計された、任意の複雑さと長さを持つオブジェクト(データ構造)をエンコードし、シリアライズする表現形式の標準。

### ロールアップ(rollups) {#rollups}

[レイヤー 2](#layer-2)のスケーリングソリューションの一種で、複数のトランザクションをバッチ処理し、[イーサリアムのメインチェーン](#mainnet)に 1 つのトランザクションとして送信する。 これにより、[ガス](#gas)代を低減し、[トランザクション](#transaction)のスループットを高めることができる。 ロールアップには、スケーラビリティを得るためのセキュリティを保障する方法の違いによってオプティミスティック・ロールアップとゼロ知識ロールアップの 2 つが存在する。

<DocLink href="/developers/docs/scaling/#rollups">
  ロールアップ
</DocLink>

<Divider />

### RPC {#rpc}

**リモートプロシージャコール (RPC)**は、ネットワークの詳細を理解する必要がなく、あるプログラムがネットワーク内の別のコンピューターのプログラムからサービスをリクエストするために使用するプロトコル。

## S {#section-s}

### セキュアハッシュアルゴリズム(SHA) {#sha}

米国国立標準技術研究所(NIST)が発表した暗号化ハッシュ関数のファミリー。

### セレニティ(Serenity) {#serenity}

以前は「Ethereum 2.0」または「Eth2」として知られていた、スケーリングと持続可能性のためのアップグレードを開始したイーサリアムの開発段階。

<DocLink href="/upgrades/">
  イーサリアムのアップグレード
</DocLink>

### シリアライゼーション(serialization) {#serialization}

データ構造をバイト列に変換するプロセス。

### シェアード/シェアードチェーン(shard / shard chain) {#shard}

シェアードチェーンは、ブロックチェーン全体の個別のセクションであり、サブセットにバリデータが割り当てられる。 シェアードチェーンにより、イーサリアムのトランザクションスループットが高まり、[オプティミスティック・ロールアップ](#optimistic-rollups)や[ゼロ知識ロールアップ](#zk-rollups)などのレイヤー 2 ソリューションのデータ可用性が向上する。

<DocLink href="/upgrades/shard-chains">
  シャードチェーン
</DocLink>

### サイドチェーン(sidechain) {#sidechain}

スケーリングソリューションの 1 つ。独自(かつ通常は高速)の[コンセンサスルール](#consensus-rules)に従って別のチェーンを使用したもの。 サイドチェーンを[メインネット](#mainnet)に接続するためにはブリッジが必要となる。 [ロールアップ](#rollups)もサイドチェーンを利用するが、こちらは[メインネット](#mainnet)と連携して動作する。

<DocLink href="/developers/docs/scaling/sidechains/">
  サイドチェーン
</DocLink>

### 署名(signing) {#signing}

特定の秘密鍵の保有者によってトランザクションが承認されたことを暗号によって証明すること。

### シングルトン(singleton) {#singleton}

コンピュータプログラミングにおいて、1 つのインスタンスのみが存在できるオブジェクトのこと。

### スラッシャー(slasher) {#slasher}

アテステーションをスキャンして、スラッシング可能な違反を検索するエンティティ。 スラッシングは、ネットワークにブロードキャストされ、次のブロック提案者は、ブロックに証拠を追加し、 悪意のあるバリデータをスラッシングすることで報酬を受け取る。

### スロット (slot) {#slot}

[プルーフ・オブ・ステーク(PoS)](#pos)システムにおいて、[バリデータ](#validator)が新しいブロックを提案できる一定時間(12 秒)。 スロットが空の場合もある。 32 スロットで 1[エポック](#epoch)となる。

<DocLink href="/developers/docs/consensus-mechanisms/pos/#how-does-validation-work">
  プルーフ・オブ・ステーク(PoS)
</DocLink>

### スマートコントラクト(smart contract) {#smart-contract}

イーサリアムのコンピューティングインフラストラクチャ上で実行するプログラム。

<DocLink href="/developers/docs/smart-contracts/">
  スマートコントラクトの紹介
</DocLink>

### SNARK {#snark}

「succinct non-interactive argument of knowledge」の略で、[ゼロ知識証明](#zk-proof)の一種。

<DocLink href="/developers/docs/scaling/zk-rollups/">
  ゼロ知識糾合
</DocLink>

### ソフトフォーク(soft fork) {#soft-fork}

[ブロックチェーン](#blockchain)で、[コンセンサスルール](#consensus-rules)の変更により発生する分岐のこと。 [ハードフォーク](#hard-fork)とは逆に、ソフトフォークには後方互換性がある。新しいコンセンサスルールに従っている限り、アップグレードしたノードは、アップグレードしていないノードが作成したブロックを検証できる。

### Solidity {#solidity}

JavaScript、C++、Java に似た構文を持つ手続き型(命令型)のプログラミング言語。 イーサリアムの[スマートコントラクト](#smart-contract)用の言語で、最も広範囲にわたって頻繁に使用されている。 開発者はギャビン・ウッド博士。

<DocLink href="/developers/docs/smart-contracts/languages/#solidity">
  Solidity
</DocLink>

### Solidity インラインアセンブリ(Solidity inline assembly) {#solidity-inline-assembly}

[Solidity](#solidity)のなかに埋め込まれた[EVM](#evm)アセンブリ言語。 Solidity は特定の操作を容易に記述するためにインラインアセンブリをサポートしている。

### スプリニアスドラゴン(Spurious Dragon) {#spurious-dragon}

ブロック 2,675,000 で発生したイーサリアムブロックチェーンの[ハードフォーク](#hard-fork)で、大量の DoS の攻撃ベクタとクリアな状態に対応([タンジェリンホイッスル](#tangerine-whistle)を参照)。 また、リプレイ攻撃に対する保護メカニズムも組み込まれた([ノンス](#nonce)を参照)。

### ステーブルコイン(stablecoin) {#stablecoin}

他の資産の価値にペッグされた価値を持つ[ERC-20 トークン](#token-standard)。 ドルのような法定通貨や、金のような貴金属、ビットコインのような他の暗号通貨に担保されたステーブルコインがある。

<DocLink href="/eth/#tokens">
  ETHはイーサリアムの唯一の暗号ではありません
</DocLink>

### ステーキング {#staking}

バリデータとなり[ネットワーク](#network)を担保するために一定量の[ETH](#ether)(ステーク)を預け入れること。 バリデータは、[トランザクション](#transaction)を検証し、[PoS](#pos)コンセンサスモデルの下で[ブロック](#block)を提案する。 ステーキングによって、ネットワークの利益を最優先に考えて行動する経済的インセンティブが得られる。 [バリデータ](#validator)の職務を遂行すると報酬が得られるが、職務を怠ると大量の ETH を失うことになる。

<DocLink href="/staking/">
  ETHをステーキングし、イーサリアムのバリデータになる
</DocLink>

### ステーキングプール(staking pool) {#staking-pool}

複数のイーサリアムステーカーの ETH を合計し、バリデータキーのセットを有効にするために必要な 32ETH に到達するために使用される。 ノードオペレーターは、これらのキーを使用しコンセンサスに参加する。 [ブロック報酬](#block-reward)は、貢献しているステーカー間で分配される。 ステーキングプールや委任ステーキングは、イーサリアムプロトコルネイティブではないが、コミュニティによって多数のソリューションが作成されている。

<DocLink href="/staking/pools/">
  ステーキングプール
</DocLink>

### STARK {#stark}

「scalable transparent argument of knowledge」の略で、[ゼロ知識証明](#zk-proof)の一種。

<DocLink href="/developers/docs/scaling/zk-rollups/">
  ゼロ知識糾合
</DocLink>

### ステート(state) {#state}

ブロックチェーン上の特定の時点における全ての残高とデータのスナップショット。通常は特定のブロックの状態を指す。

### ステートチャンネル(state channels) {#state-channels}

参加者間でチャンネルが設定され、自由かつ安価に取引できる[レイヤー 2](#layer-2)のソリューション。 チャンネルを設定、閉じるための[トランザクション](#transaction)だけが[メインネット](#mainnet)に送信される。 非常に高いトランザクションスループットを実現するものの、事前に参加者の数を把握し、資金をロックアップすることに依存する。

<DocLink href="/developers/docs/scaling/state-channels/#state-channels">
  ステートチャンネル
</DocLink>

### スーパーマジョリティ(supermajority) {#supermajority}

スーパーマジョリティとは、イーサリアムを保護するためにステーキングされた ETH の総量の 2/3(66％)を超える量を指す用語。 ビーコンチェーンでブロックを[確定](#finality)するには、スーパーマジョリティの投票が必要となる。

### 同期(syncing) {#syncing}

最新バージョンのブロックチェーン全体をノードにダウンロードするプロセス。

### 同期委員会(sync committee) {#sync-committee}

同期委員会は、[バリデータ](#validator)からランダムに選択されたグループで、約 27 時間ごとに更新され、 有効なブロックヘッダに署名を追加することを目的としている。 同期委員会は、[ライトクライアント](#light-client)がバリデータセット全体にアクセスせずにブロックチェーンの先頭を追跡できるようにする。

### szabo {#szabo}

[ether](#ether)の単位。 1 szabo = 10<sup>12</sup> [wei](#wei)、10<sup>6</sup> szabo = 1 ether。

<Divider />

## T {#section-t}

### タンジェリンホイッスル(Tangerine Whistle) {#tangerine-whistle}

ブロック 2,463,000 で発生したイーサリアムブロックチェーンの[ハードフォーク](#hard-fork)で、特定の I/O 集中型オペレーションの[ガス](#gas)計算を変更し、低いガスコストを悪用したサービス拒否攻撃から蓄積した状態を消去するために発生したもの。

### 最終合計難易度(TTD) {#terminal-total-difficulty}

合計難易度は、ブロックチェーンのある特定の時点までのすべてのブロックの Ethash の採掘難易度の合計。 最終合計難易度は、実行クライアントがマイニングとブロックゴシップ機能を停止し、ネットワークがプルーフ・オブ・ステーク(PoS)に移行するきっかけとして使われた合計難易度の特定の値を指す。

### テストネット(testnet) {#testnet}

テストネットワークの略で、イーサリアムのメインネットワーク([メインネット](#mainnet)参照)の動作をシミュレートするためのネットワーク。

<DocLink href="/developers/docs/networks/#ethereum-testnets">
  テストネット
</DocLink>

### トークン(token) {#token}

イーサリアムブロックチェーン上のスマートコントラクトで定義された取引可能な仮想商品。

### トークン標準(token standard) {#token-standard}

ERC-20 提案によって導入された、これは代替性トークンのための標準化された[スマートコントラクト](#smart-contract)構造を提供。 [NFT](#nft)とは異なり、同一コントラクトからのトークンであれば、追跡、取引、交換が可能。

<DocLink href="/developers/docs/standards/tokens/erc-20/">
  ERC-20トークン規格
</DocLink>

### トランザクション(transaction) {#transaction}

特定の[アドレス](#address)を対象に、発信元[アカウント](#account)によって署名されたイーサリアムブロックチェーンにコミットされたデータ。 トランザクションには、そのトランザクションの[ガスリミット](#gas-limit)などのメタデータが含まれている。

<DocLink href="/developers/docs/transactions/">
  処理
</DocLink>

### トランザクションフィー(transaction fee) {#transaction-fee}

イーサリアムネットワークを使用するたびに支払う必要がある手数料。 たとえば、トークンの交換や収集品の購入などで、[ウォレット](#wallet)から資金を送ったり、[Dapp](#dapp)とやり取りをすることなどが挙げられる。 これはサービス料のようなものであり、 料金はネットワークの混雑状況によって変動する。 トランザクション処理を担当する[バリデータ](#validator)が、より高い手数料のトランザクションを優先する傾向があり、その結果、混雑すると価格が上昇する。

技術的なレベルでは、トランザクションフィーは、トランザクションに必要な[ガス](#gas)の量に関係する。

トランザクションフィーの削減が現在注目されているテーマとなっている。 [レイヤー 2](#layer-2)を参照。

### トラストレス(trustlessness) {#trustlessness}

第三者の信用なしにトランザクションを仲介するネットワークの能力。

### チューリング完了(Turing complete) {#turing-complete}

イギリスの数学者兼コンピュータ科学者であるアラン・チューリングにちなんで名付けられた概念。データ操作規則のシステム(コンピュータの命令セット、プログラミング言語、セル・オートマトンなど)が、あらゆるチューリング機械のシミュレーションに使用できる場合、「チューリング完了」または、「計算普遍」であると呼ばれる。

<Divider />

## V {#section-v}

### バリデータ(validator) {#validator}

[プルーフ・オブ・ステーク(PoS)](#pos)システムにおいて、データの保存、トランザクションの処理、ブロックチェーンへの新しいブロックの追加を行う[ノード](#node)。 バリデータを有効にするためには、32ETH を[ステーク](#staking)できる必要がある。

<DocLink href="/developers/docs/consensus-mechanisms/pos">
  プルーフ・オブ・ステーク
</DocLink>
<DocLink href="/staking/">
  イーサリアムのステーキング
</DocLink>

### バリデータのライフサイクル(validator lifecycle) {#validator-lifecycle}

バリデータが存在できる状態のシーケンス。 たとえば、

- deposited: バリデータが最低 32 ETH を[デポジットコントラクト](#deposit-contract)に入金している
- pending: バリデータがアクティブ化キューの中で、既存のバリデータがネットワークに投票するのを待っている
- active: 現在ブロックのアテステーションと提案を行っている
- slashing: バリデータが不正な動作をしており、スラッシングされている
- exiting: 自発的に終了、もしくは追放されたため、バリデータにネットワーク終了のフラグが立てられている。

### 有効性証明(validity proof) {#validity-proof}

特定の[レイヤー 2](#layer-2)におけるセキュリティモデルで、速度を上げるために複数のトランザクションを 1 つのバッチに[ロールアップ](/#rollups)し、イーサリアムに 1 つのトランザクションとして送信する。 トランザクションの計算はオフチェーンで行われ、その有効性の証明とともにメインチェーンに公開される。 この方法は、セキュリティを維持しつつ処理可能なトランザクションの量を増加させる。 [ロールアップ](#rollups)の中には、[不正証明](#fraud-proof)を利用するものもある。

<DocLink href="/developers/docs/scaling/zk-rollups/">
  ゼロ知識糾合
</DocLink>

### Validium {#validium}

トランザクションのスループットを向上させるために[有効性証明](#validity-proof)を使用するオフチェーンソリューション。 [ゼロ知識ロールアップ](#zk-rollup)とは異なり、Validium はデータをレイヤー 1 の[メインネット](#mainnet)に保存しない。

<DocLink href="/developers/docs/scaling/validium/">
  バリディアム
</DocLink>

### Vyper {#vyper}

Python に似た構文を持つ高水準プログラミング言語。 純粋関数型言語に近づくことを目標としている。 ヴィタリック・ブテリンによって開発された。

<DocLink href="/developers/docs/smart-contracts/languages/#vyper">
  Vyper
</DocLink>

<Divider />

## W {#section-w}

### ウォレット(wallet) {#wallet}

[秘密鍵](#private-key)を保持するソフトウェア。 イーサリアムの[アカウント](#account)へのアクセスおよび操作、または[スマートコントラクト](#smart-contract)とやり取りするために使用する。 鍵をウォレットに保管する必要はなく、セキュリティを向上させるためにオフラインストレージ(たとえば、メモリーカードや紙)から取得することもできる。 ウォレットという名前ではあるが、実際にコインやトークンを保持することはない。

<DocLink href="/wallets/">
  イーサリアムウォレット
</DocLink>

### Web3 {#web3}

Web の 3 番目のバージョン。 ギャビン・ウッド博士によって最初に提案されたもので、中央集権的に所有・管理されるアプリケーションから、分散型プロトコルで構築されたアプリケーションに移行するという Web アプリケーションの新しいビジョンと焦点を示している。 ([dapp](#dapp)を参照)

<DocLink href="/developers/docs/web2-vs-web3/">
  Web2とWeb3の比較
</DocLink>

### wei {#wei}

[イーサ](#ether)の最小単位。 10<sup>18</sup> wei = 1 ether.

<Divider />

## Z {#section-z}

### ゼロアドレス(zero address) {#zero-address}

全てがゼロで構成されたイーサリアムアドレスであり、所有された流通トークンを削除するためのアドレスとして頻繁に使用される。 burn()メソッドによってスマートコントラクトのインデックスから形式的に削除されたトークンと、このアドレスに送信されたトークンは区別される。

### ゼロ知識証明(zero-knowledge proof) {#zk-proof}

ゼロ知識証明とは、ある命題が真であることを、追加の情報を伝えることなく証明することができる暗号方式である。

<DocLink href="/developers/docs/scaling/zk-rollups/">
  ゼロ知識糾合
</DocLink>

### ゼロ知識ロールアップ(zero-knowledge rollup) {#zk-rollup}

[レイヤー 2](#rollups)によってトランザクションのスループットを高め、[メインネット](#validity-proof)(レイヤー 1) によってセキュリティを提供する、[有効性証明](#layer-2)を用いたトランザクションの[ロールアップ](#mainnet)。 [オプティミスティック・ロールアップ](#optimistic-rollups)のように複雑なトランザクションを扱うことはできないが、トランザクションは送信された段階で有効であることが確定し、遅延が発生することはない。

<DocLink href="/developers/docs/scaling/zk-rollups/">
  ゼロ知識ロールアップ
</DocLink>

<Divider />

## 出典 {#sources}

_[『マスタリング・イーサリアム』](https://github.com/ethereumbook/ethereumbook)([アンドレアス・M・ アントノプロス、ギャビン・ウッド](https://ethereumbook.info)著)の一部より CC-BY-SA のもと提供されました。_

<Divider />

## 本ページへの貢献 {#contribute-to-this-page}

不足している情報はありませんか? 誤情報はありませんか? GitHub でこちらの用語集に貢献いただき、改善にご協力ください。

[貢献方法についての詳細を確認](/contributing/adding-glossary-terms)
