---
title: ステーキングプール
description: ETHステーキングプールの始め方の概要
lang: ja
template: staking
emoji: ":money_with_wings:"
image: /staking/leslie-pool.png
alt: プールで泳ぐサイのレスリー
sidebarDepth: 2
summaryPoints:
  - 他者と協力してETHをステーキングし、報酬を獲得
  - 難しいことは抜きにし、バリデータの運用をサードパーティに委任
  - ステーキングトークンを自身のウォレットで管理する
---

## ステーキングプールとは {#what-are-staking-pools}

ステーキングプールとは、少量のETHを持つ人達が協力して、バリデータ鍵セットの有効化に必要な32 ETHを取得する方法です。 プール機能はプロトコル上、ネイティブでサポートされていないため、別途ソリューションを構築され、需要に対応しています。

一部のプールはスマートコントラクトを使用して運営されており、資金をコントラクトに預けると、コントラクトは管理者による承認を必要とせず、トラストレスにステークを管理・追跡し、預け入れ資金を表すトークンを発行します。 その他のプールは、スマートコントラクトを使用せず、オフチェーンで仲介されます。

## ステーキングプールの利点 {#why-stake-with-a-pool}

[ステーキング入門](/staking/)で概説したメリットに加えて、 プールへのステーキングには数多くの注目すべき利点があります。

<CardGrid>
  <Card title="低い参入障壁" emoji="🐟" description="Not a whale? No problem. Most staking pools let you stake virtually any amount of ETH by joining forces with other stakers, unlike staking solo which requires 32 ETH." />
  <Card title="今すぐステーキング" emoji=":stopwatch:" description="Staking with a pool is as easy as a token swap. No need to worry about hardware setup and node maintenance. Pools allow you to deposit your ETH which enables node operators to run validators. Rewards are then distributed to contributors minus a fee for node operations." />
  <Card title="ステーキングトークン" emoji=":droplet:" description="Many staking pools provide a token that represents a claim on your staked ETH and the rewards it generates. This allows you to make use of your staked ETH, e.g. as collateral in DeFi applications." />
</CardGrid>

<StakingComparison page="pools" />

## 考慮すべき事項 {#what-to-consider}

ステーキングプール、または委任ステーキングは、イーサリアムプロトコルではネイティブでサポートされていませんが、32 ETH未満のステーキングを行う需要を考慮し、ステーキングプールのソリューションの数が増えてきています。

それぞれのプールと、そこで使われるツールやスマートコントラクトは、異なるチームによって作り上げられたもので、それぞれにメリットとリスクがあります。 プールでは、ユーザーは自分のETHを、ステークキングされたETHを表すトークンとスワップすることができます。 このトークンは、ユーザーが実際のETHをコンセンサス層にステークしたまま、分散型取引所でETHを対応する利回りを持つトークンに交換し、元本に適用されるステーキング報酬から収益を得ることができるため有用です (逆も同様)。 これにより、利回りのあるstaked-ETHと「元のETH」との間のスワップを迅速かつ簡単に行うことができます。また、これは32 ETH未満のETHで実行することができます。

しかし、このようなステークされたETHトークンは、カルテルのような行動を引き起こす傾向があり、ステークされた大量のETHは、多くの独立した個人に分散するのではなく、少数の中央集権的な組織の管理下に置かれることになります。 これが検閲やバリュー抽出の条件を作り出します。 ステーキングのゴールドスタンダードは、可能な限り、そして常に、個人が自身のハードウェアでバリデータを実行することです。

[トークンをステーキングするリスク詳細](https://notes.ethereum.org/@djrtwo/risks-of-lsd)

各ステーキングプールの顕著な長所や短所を示すため、下記の属性指標が使用されています。 参加するプールを選択する際に、これらの属性をどのように定義するかについての参考資料としてこのセクションをご利用ください。

<StakingConsiderations page="pools" />

## ステーキングプールを探す {#explore-staking-pools}

セットアップにはさまざまなオプションが用意されています。 上記の指標を参考に、下記のツールをご利用ください。

<ProductDisclaimer />

<StakingProductsCardGrid category="pools" />

[クライアントの多様性](/developers/docs/nodes-and-clients/client-diversity/)に真剣に取り組むサービスを選ぶことが、ネットワークのセキュリティを向上させ、ご自身のリスクを制限する上で、重要であることにご留意ください。 サービスでマジョリティのクライアントの使用を制限している証拠は、<em style={{ textTransform: "uppercase" }}>「実行クライアントの多様性」</em> および <em style={{ textTransform: "uppercase" }}>「コンセンサスクライアントの多様性」</em>で示されます。

ここに記載すべきステーキングツールをご存知の場合は [製品掲載ポリシー](/contributing/adding-staking-products/)を確認し、記載すべきかどうかをご確認の上、レビューに提出してください。

## よくある質問 {#faq}

<ExpandableCard title="報酬を獲得するには">
通常、ERC-20ステーキングトークンは、ステーカーに発行され、ステーキングしたETHの価値と報酬を表します。 プールにより、ステーキング報酬の分配方法は多少異なりますが、ここでは共通点について話します。
</ExpandableCard>

<ExpandableCard title="ステークの引き出し">
今では、 2023年4月に上海/カペラネットワークアップグレードが行われました。それにより、ステーキングの引き出しが導入されました。 ステーキングプールにお金を預けているバリデータアカウントは、指定された引き出しアドレスにETHを出金して終了可能になりました。 これにより、ステークの一部を原資産のETHと引き換えることが可能になります。 この機能のサポート状況については、ステーキングをしているプロバイダーに確認してください。

この代替方法として、ERC-20のステーキングトークンを利用するプールを使用すると、オープンマーケットでトークンを取引でき、ステーキングポジションを売却することができます。実際にステーキングコントラクトからETHを取り除くことなく、効果的に「引き出す」ことができます。

<ButtonLink to="/staking/withdrawals/">ステーキング引き出しの詳細</ButtonLink>
</ExpandableCard>

<ExpandableCard title="取引所でのステーキングとは異なる点">
これらのステーキングプールと、中央集権型取引所の間には多くの類似点があります。 例えば、複数の少額のステーキングをまとめて、バリデータを有効にすることなどです。

中央集権型取引所とは異なり、多くのステーキングプールでは、スマートコントラクトおよび/またはステーキングトークンを利用します。このステーキングトークンは、通常はERC-20トークンで、他のトークンと同様に、購入・販売できます。 このトークンは自分自身で制御でき、主権とセキュリティを提供しますが、バックグラウンドで動作するバリデータクライアントを直接制御することはできません。

これをサポートするノードに関しては、他のものよりも分散化が進んでいるステーキングプールもあります。 ネットワークの健全化と分散化を促進するため、常にパーミッションレスかつ分散化されたノードオペレータを利用するプールサービスを選ぶことが推奨されています。
</ExpandableCard>

## 参考文献 {#further-reading}

- [イーサリアム・ステーキング・ディレクトリ](https://www.saking.directory/) - _EridianとSpacesider_
- [Rocket Poolでステーキング - ステーキングの概要](https://docs.rocketpool.net/guides/staking/overview.html) - _RocketPoolドキュメント_
- [Lidoでイーサリアムをステーキング](https://help.lido.fi/en/collections/2947324-staking-ethereum-with-lido) - _Lidoヘルプドキュメント_
