---
title: リステーキング
metaTitle: リステーキングとは？ | リステーキングのメリットと用途
description: ステークされたETHを使用して他の分散型サービスを保護し、追加の報酬を獲得します。
lang: ja
template: use-cases
image: /images/use-cases/restaking.png
alt: イーサリアムにおけるリステーキングの視覚的表現。
sidebarDepth: 2
summaryPoints:
  - "ステークされたETHを使用して他の分散型サービスを保護し、追加の報酬を獲得します。"
buttons:
  - content: リステーキングとは？
    toId: what-is-restaking
  - content: どのような仕組みですか？
    toId: how-does-restaking-work
    isSecondary: false
---

イーサリアムネットワークは、24時間365日、数十億ドルもの価値を保護しています。どのようにしてでしょうか？

世界中の人々が、イーサリアムのトランザクションを処理し、イーサリアムネットワークを保護するソフトウェアを実行するために、スマート・コントラクトに[イーサ (ETH)](/what-is-ether/)をロック（または「ステーク」）しています。その見返りとして、彼らはより多くのETHを報酬として受け取ります。

リステーキングは、[ステーカー](/staking/)がこのセキュリティを他のサービス、アプリケーション、またはネットワークに拡張するために構築された技術です。その見返りとして、追加のリステーキング報酬を獲得します。しかし、ステークしたETHをより大きなリスクにさらすことにもなります。

**18分でわかるリステーキングの解説**

<VideoWatch slug="restaking-explained" />

## リステーキングとは？ {#what-is-restaking}

リステーキングとは、ステーカーがすでにステークしているETHを使用して、他の分散型サービスを保護することです。その見返りとして、リステーカーは通常のETHステーキング報酬に加えて、それらの他のサービスから追加の報酬を得ることができます。

リステーキングによって保護される分散型サービスは、「Actively Validated Services (AVS)」として知られています。
多くのETHステーカーがイーサリアムの検証ソフトウェアを実行するのと同じように、多くのリステーカーは専用のAVSソフトウェアを実行します。

<br/>
<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>知っておくべきこと</strong></strong>
  <p className="mt-2">「Actively Validated Services (AVS)」が最も一般的ですが、リステーキングプラットフォームによっては、保護を支援する分散型サービスに対して「Autonomously Validated Services」、「Distributed Secure Services」、「ネットワーク」などの別の名称を使用する場合があります。</p>
</AlertDescription>
</AlertContent>
</Alert>

## ステーキングとリステーキングの比較 {#staking-vs-restaking}

| ステーキング | リステーキング |
| ------------------------------ | ------------------------------------------------- |
| ETH報酬を獲得 | ETH報酬 + AVS報酬を獲得 |
| イーサリアムネットワークを保護 | イーサリアムネットワーク + AVSを保護 |
| 最小ETH要件なし | 最小ETH要件なし |
| 低リスク | 低〜高リスク |
| 引き出し時間はキューに依存 | 引き出し時間はキュー + アンボンディング期間に依存 |

## なぜリステーキングが必要なのか？ {#why-do-we-need-restaking}

リステーキングがある世界とない世界の2つを想像してみてください。

 <TabbedSection />

リステーキングがある世界では、AVSとステーカーの双方が互いを見つけ、セキュリティと追加報酬を交換できるというメリットを享受します。

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>リステーキングの追加のメリット</strong></strong>
  <p className="mt-2">AVSは、分散化やセキュリティに気を取られることなく、すべてのリソースをサービスの構築とマーケティングに注ぐことができます。</p>
</AlertDescription>
</AlertContent>
</Alert>

## リステーキングはどのような仕組みですか？ {#how-does-restaking-work}

リステーキングにはいくつかのエンティティが関与しており、それぞれが重要な役割を果たしています。

| **用語** | **説明** |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **リステーキングプラットフォーム** | リステーキングプラットフォームは、AVS、ETHステーカー、およびオペレーターを接続するサービスです。ステーカーがETHをリステークするための分散型アプリケーションや、ステーカー、AVS、オペレーターが互いを見つけることができるマーケットプレイスを構築します。 |
| **ネイティブリステーカー** | 独自のイーサリアムバリデータを使用してETHをステークしている人々は、ステークしたETHをEigenLayerなどのリステーキングプラットフォームに接続し、ETHバリデータ報酬に加えてリステーキング報酬を獲得できます。 |
| **リキッドリステーカー** | リドやRocket Poolなどのサードパーティのリキッド・ステーキング・プロバイダーを通じてETHをステークする人々は、ステークしたETHを表すリキッド・ステーキング・トークン (LST) を受け取ります。元のETHをステークしたまま、これらのLSTをリステークしてリステーキング報酬を獲得できます。 |
| **オペレーター** | オペレーターはAVSのリステーキングソフトウェアを実行し、各AVSが必要とする検証タスクを実行します。オペレーターは通常、稼働時間やパフォーマンスなどを保証する専門のサービスプロバイダーです。非オペレーターのリステーカーと同様に、オペレーターはステークされたETHを使用してAVSを保護しますが、オペレーターはその作業と引き換えに追加の報酬も受け取ります。 |
| **AVS** | これらは、価格オラクル、トークンブリッジ、データシステムなどの分散型サービスであり、リステーカーからセキュリティの提供を受け、その見返りとしてトークン報酬を提供します。 |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>知っておくべきこと</strong></strong>
  <p className="mt-2">ネイティブおよびリキッドリステーカーは、AVSを保護するためのソフトウェアを自分で実行する代わりに、ステークしたETHをオペレーターにデリゲートすることがよくあります。</p>
  <p className="mt-2">この方法により、オペレーターよりも報酬率は低くなりますが、AVSの複雑な技術的要件について心配する必要がなくなります。</p>
</AlertDescription>
</AlertContent>
</Alert>

## リステーキングの例にはどのようなものがありますか？ {#what-are-some-examples-of-restaking}

斬新なアイデアではありますが、リステーキングの可能性を探求するいくつかのプロジェクトが登場しています。

<RestakingList/>

<br/>

<Alert variant="warning" className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>誤称に注意</strong></strong>
  <p className="mt-2">「リステーキング」を分散型金融 (DeFi) におけるLSTのレンディングや借り入れと混同する人がいます。どちらもステークされたETHを活用しますが、リステーキングは単にLSTで利回りを稼ぐことではなく、AVSを保護することを意味します。</p>
</AlertDescription>
</AlertContent>
</Alert>

## リステーキングでどれくらい稼げますか？ {#how-much-can-i-make-from-restaking}

AVSによって提供されるレートは異なりますが、eETHのようなリキッド・リステーキング・トークン (LRT) を見れば、どれくらい稼げるかの目安になります。ETHをステークしてstETHのようなLSTを受け取るのと同じように、stETHをリステークすることでeETHのようなLRTを受け取ることができます。これらのトークンは、ETHステーキング報酬とリステーキング報酬の両方を獲得します。

**リステーキングに伴うリスクを認識することが重要です。潜在的な報酬は魅力的かもしれませんが、リスクがないわけではありません。**

## リステーキングのリスクは何ですか？ {#what-are-the-risks-of-restaking}

| **リスク** | **説明** |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ペナルティ（または「スラッシング」）** | ETHステーキングと同様に、リステーカーやオペレーターがオフラインになったり、メッセージを検閲したり、ネットワークを破壊しようとしたりした場合、ステークの一部または全部がスラッシング（焼却）される可能性があります。 |
| **中央集権化** | 少数のオペレーターがリステーキングの大部分を支配した場合、リステーカー、AVS、さらにはリステーキングプラットフォームに大きな影響を与える可能性があります。 |
| **連鎖反応** | 複数のAVSを保護しているリステーカーがスラッシングされた場合、他のAVSのセキュリティが低下し、脆弱になる可能性があります。 |
| **資金への即時アクセス** | リステークしたETHを引き出すには待ち時間（または「アンボンディング期間」）があるため、常にすぐにアクセスできるとは限りません。 |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>イーサリアムの共同創設者の見解…</strong></strong>
  <p className="mt-2">
    イーサリアムの共同創設者であるヴィタリックは、2021年のブログ記事<a href="https://vitalik.eth.limo/general/2023/05/21/dont_overload.html">Don't Overload Consensus</a>で、リステーキングの潜在的なリスクについて警告しました。
  </a>
</AlertDescription>
</AlertContent>
</Alert>

## リステーキングの始め方 {#how-to-get-started-with-restaking}

| 🫡 初心者向け | 🤓 上級者向け |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| 1. リドやRocket PoolなどのプラットフォームでETHをステークし、LSTを取得します。 | 1. イーサリアムのバリデータとしてETHをステークします。 |
| 2. それらのLSTを使用して、リステーキングサービスでリステーキングを開始します。 | 2. EigenLayer、Symbioticなどのリステーキングサービスを比較します。 |
| | 3. 指示に従って、バリデータをリステーキングのスマート・コントラクトに接続します。 |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":eyes:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>イーサリアムのステーキング：</strong> どのような仕組みですか？</strong>
  <ButtonLink href="/staking/">
    詳細を見る
  </ButtonLink>
</AlertDescription>
</AlertContent>
</Alert>

## 上級者向け {#advanced}

<VideoWatch slug="eigenlayer-permissionless-features" />

## 参考文献 {#further-reading}

1. [ethereum.org - ETHステーキングガイド](/staking/)
2. [Ledger Academy - イーサリアムのリステーキングとは？](https://www.ledger.com/academy/what-is-ethereum-restaking)
3. [コンセンシス - EigenLayer：分散型イーサリアムリステーキングプロトコルの解説](https://consensys.io/blog/eigenlayer-decentralized-ethereum-restaking-protocol-explained)
4. [ヴィタリック・ブテリン - Don't overload Ethereum's consensus](https://vitalik.eth.limo/general/2023/05/21/dont_overload.html)
5. [Cointelegraph - EigenLayerとは？イーサリアムのリステーキングプロトコルの解説](https://cointelegraph.com/explained/what-is-eigenlayer-ethereums-restaking-protocol-explained)
6. [a16z crypto research - EigenLayer：Sreeram Kannanによるイーサリアムへのパーミッションレスな機能追加](https://www.youtube.com/watch?v=-V-fG4J1N_M)
7. [Junion - EigenLayerの解説：リステーキングとは？](https://www.youtube.com/watch?v=5r0SooSQFJg)
8. [The Block - リステーキングデータダッシュボード](https://www.theblock.co/data/decentralized-finance/restaking)