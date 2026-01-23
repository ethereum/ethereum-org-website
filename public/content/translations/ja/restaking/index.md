---
title: "リステーキング"
metaTitle: "リステーキングとは？ | リステーキングのメリットと活用法"
description: "ステークされたETHを使用して他の分散型サービスを保護し、追加の報酬を獲得します。"
lang: ja
template: use-cases
emoji: ":recycle:"
image: /images/use-cases/restaking.png
alt: "イーサリアムにおけるリステーキングの視覚的表現。"
sidebarDepth: 2
summaryPoint1: "ステークされたETHを使用して他の分散型サービスを保護し、追加の報酬を獲得します。"
buttons:
  - content: リステーキングとは？
    toId: what-is-restaking
  - content: 仕組み
    toId: how-does-restaking-work
    isSecondary: false
---

イーサリアムネットワークは、年間365日、24時間体制で数十億ドル相当の価値を保護しています。 どのように？

世界中の人々が、スマートコントラクトに[ether(ETH)](/eth/)をロック(または「ステーク」)して、イーサリアムのトランザクションを処理し、イーサリアムネットワークを保護するソフトウェアを実行しています。 その見返りとして、より多くのETHで報酬を得ます。

リステーキングは、[ステーカー](/staking/)がこのセキュリティを他のサービス、アプリケーション、またはネットワークに拡張するために構築されたテクノロジーです。 その見返りとして、追加のリステーキング報酬を獲得します。 しかし、彼らはまた、ステークされたETHをより大きなリスクにさらすことになります。

**18分でわかるリステーキング**

<YouTube id="rOJo7VwPh7I" />

## リステーキングとは？ {#what-is-restaking}

リステーキングとは、ステーカーがすでにステークしているETHを使用して、他の分散型サービスを保護することです。 その見返りとして、リステーカーは通常のETHステーキング報酬に加えて、それらの他のサービスから追加の報酬を得ることができます。

リステーキングによって保護される分散型サービスは、「アクティブ検証サービス」(AVS)として知られています。
多くのETHステーカーがイーサリアムの検証ソフトウェアを実行するのと同様に、多くのリステーカーが専門のAVSソフトウェアを実行します。

<br/>
<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>知っておくと良いこと</strong></p>
  <p className="mt-2">「アクティブ検証サービス」(AVS) が最も一般的ですが、リステーキングプラットフォームによっては、保護を支援する分散型サービスに「自律検証サービス」、「分散型セキュアサービス」、「ネットワーク」などの別の名称を使用する場合があります。</p>
</AlertDescription>
</AlertContent>
</Alert>

## ステーキングとリステーキングの比較 {#staking-vs-restaking}

| ステーキング          | リステーキング                    |
| --------------- | -------------------------- |
| ETH報酬の獲得        | ETH報酬 + AVS報酬の獲得           |
| イーサリアムネットワークの保護 | イーサリアムネットワーク + AVSの保護      |
| ETHの最小額なし       | ETHの最小額なし                  |
| 低リスクレベル         | 低〜高リスクレベル                  |
| 引き出し時間はキューに依存   | 引き出し時間はキュー + アンボンディング期間に依存 |

## なぜリステーキングが必要なのか？ {#why-do-we-need-restaking}

リステーキングがある世界とない世界、2つの世界を想像してみてください。

 <TabbedSection />

リステーキングがあるこの世界では、AVSとステーカーの両方が、お互いを見つけてセキュリティを取引し、追加の報酬を得ることで利益を得ます。

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>リステーキングの追加メリット</strong></p>
  <p className="mt-2">AVSは、分散化やセキュリティに気を取られることなく、リソースをすべてサービスの構築とマーケティングに注ぐことができます。</p>
</AlertDescription>
</AlertContent>
</Alert>

## リステーキングの仕組みは？ {#how-does-restaking-work}

リステーキングにはいくつかのエンティティが関与しており、それぞれが重要な役割を果たしています。

| **用語**              | **説明**                                                                                                                                                                               |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **リステーキングプラットフォーム** | リステーキングプラットフォームは、AVS、ETHステーカー、オペレーターを接続するサービスです。 ステーカーがETHをリステークするための分散型アプリケーションや、ステーカー、AVS、オペレーターがお互いを見つけることができるマーケットプレイスを構築します。                                                    |
| **ネイティブリステーカー**     | 自身のイーサリアムバリデータを実行してETHをステークしている人々は、ステークされたETHをEigenLayerなどのリステーキングプラットフォームに接続し、ETHバリデータ報酬に加えてリステーキング報酬を獲得することができます。                                                                  |
|                     |                                                                                                                                                                                      |
| **リキッドリステーカー**      | LidoやRocket Poolのようなサードパーティのリキッドステーキングプロバイダーを介してETHをステークする人々は、ステークされたETHを表すリキッドステーキングトークン(LST)を受け取ります。 元のETHをステークしたまま、これらのLSTをリステークしてリステーキング報酬を獲得できます。            |
|                     |                                                                                                                                                                                      |
| **オペレーター**          | オペレーターはAVSのリステーキングソフトウェアを実行し、各AVSが必要とする検証タスクを実行します。 オペレーターは通常、稼働時間やパフォーマンスなどを保証する専門のサービスプロバイダーです。 非オペレーターのリステーカーと同様に、オペレーターはステークされたETHを使用してAVSを保護しますが、オペレーターはその作業の対価として追加の報酬も受け取ります。 |
|                     |                                                                                                                                                                                      |
| **AVS**             | これらは、価格オラクル、トークンブリッジ、データシステムなどの分散型サービスであり、リステーカーからセキュリティを受け、その見返りとしてトークン報酬を提供します。                                                                                                    |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>知っておくと良いこと</strong></p>
  <p className="mt-2">ネイティブおよびリキッドリステーカーは、自分でAVSを保護するためのソフトウェアを実行する代わりに、ステークされたETHをオペレーターに委任することがよくあります。</p>
  <p className="mt-2">これにより、AVSからの複雑な技術要件について心配する必要がなくなりますが、オペレーターよりも低い報酬率を受け取ります。</p>
</AlertDescription>
</AlertContent>
</Alert>

## リステーキングの例にはどのようなものがありますか？ {#what-are-some-examples-of-restaking}

斬新なアイデアではありますが、リステーキングの可能性を探るためにいくつかのプロジェクトが出現しています。

<RestakingList/>

<br/>

<Alert variant="warning" className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>誤称アラート</strong></p>
  <p className="mt-2">「リステーキング」をDeFiにおけるLSTの貸し借りだと混同する人がいます。 どちらもステークされたETHを活用しますが、リステーキングは単にLSTで利回りを得るだけでなく、AVSを保護することを意味します。</p>
</AlertDescription>
</AlertContent>
</Alert>

## リステーキングでいくら稼げますか？ {#how-much-can-i-make-from-restaking}

AVSはさまざまなレートを提供しますが、eETHのようなリキッドリステーキングトークン(LRT)は、どれだけ稼げるかの目安になります。 ETHをステーキングしてstETHのようなLSTを取得するのと同じように、stETHをリステーキングしてeETHのようなLRTを取得できます。 これらのトークンは、ETHステーキング報酬とリステーキング報酬を獲得します。

**リステーキングに伴うリスクを認識することが重要です。 潜在的な報酬は魅力的かもしれませんが、リスクがないわけではありません。**

## リステーキングのリスクとは？ {#what-are-the-risks-of-restaking}

| **リスク**                                   | **説明**                                                                                                                            |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **ペナルティ(または「スラッシング」)** | ETHステーキングと同様に、リステーカー/オペレーターがオフラインになったり、メッセージを検閲したり、ネットワークを破損させようとしたりすると、そのステークは部分的または全体的にスラッシュ(焼却)される可能性があります。 |
| **中央集権化**                                 | 少数のオペレーターがリステーキングのほとんどを支配する場合、彼らはリステーカー、AVS、さらにはリステーキングプラットフォームに大きな影響力を持つ可能性があります。                                                |
| **連鎖反応**                                  | リステーカーが複数のAVSを保護している間にスラッシュされると、他のAVSのセキュリティが低下し、脆弱になる可能性があります。                                                                   |
| **資金への即時アクセス**                            | リステークされたETHを引き出すには待ち時間(または「アンボンディング期間」)があるため、常にすぐにアクセスできるとは限りません。                                              |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>イーサリアムの共同創設者が入力中...</strong></p>
  <p className="mt-2">
    イーサリアムの共同創設者であるヴィタリックは、2021年のブログ投稿「<a href = "https://vitalik.eth.limo/general/2023/05/21/dont_overload.html">コンセンサスに過負荷をかけるな</a>」で、リステーキングの潜在的なリスクについて警告しました。 </a>  
</p>
</AlertDescription>
</AlertContent>
</Alert>

## リステーキングを始めるには？ {#how-to-get-started-with-restaking}

| 🫡 初心者                                                                      | 🤓 上級ユーザー                                                           |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| 1. LidoやRocket PoolのようなプラットフォームでETHをステークしてLSTを取得します。 | 1. イーサリアムのバリデータとしてETHをステークします。               |
| 2. これらのLSTを使用して、リステーキングサービスでリステーキングを開始します。           | 2. EigenLayerやSymbioticなどのリステーキングサービスを比較します。 |
|                                                                             | 3. 指示に従って、バリデータをリステーキングのスマートコントラクトに接続します。    |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":eyes:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>イーサリアムのステーキング：</strong>その仕組みは？</p>
  <ButtonLink href="/staking/">
    さらに詳しく
  </ButtonLink>
</AlertDescription>
</AlertContent>
</Alert>

## 上級 {#advanced}

<YouTube id="-V-fG4J1N_M" />

## 参考リンク{#further-reading}

1. [ethereum.org - ETHステーキングガイド](https://ethereum.org/en/staking/)
2. [Ledger Academy - イーサリアムのリステーキングとは？](https://www.ledger.com/academy/what-is-ethereum-restaking)
3. [Consensys - EigenLayer：分散型イーサリアムリステーキングプロトコルの解説](https://consensys.io/blog/eigenlayer-decentralized-ethereum-restaking-protocol-explained)
4. [ヴィタリック・ブテリン - イーサリアムのコンセンサスに過負荷をかけるな](https://vitalik.eth.limo/general/2023/05/21/dont_overload.html)
5. [Cointelegraph - EigenLayerとは？ イーサリアムのリステーキングプロトコル解説](https://cointelegraph.com/explained/what-is-eigenlayer-ethereums-restaking-protocol-explained)
6. [a16z crypto research - EigenLayer: Sreeram Kannanによるイーサリアムへのパーミッションレスな機能追加](https://www.youtube.com/watch?v=-V-fG4J1N_M)
7. [Junion - EigenLayerの解説：リステーキングとは？](https://www.youtube.com/watch?v=5r0SooSQFJg)
8. [The Block - リステーキングデータダッシュ](https://www.theblock.co/data/decentralized-finance/restaking)
