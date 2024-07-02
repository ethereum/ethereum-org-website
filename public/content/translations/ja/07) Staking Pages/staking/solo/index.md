---
title: ETHのソロステーキング
description: ETHのソロステーキングする方法の概要
lang: ja
template: staking
emoji: ":money_with_wings:"
image: /staking/leslie-solo.png
alt: コンピュータチップ上にサイのレスリー
sidebarDepth: 2
summaryPoints:
  - バリデータをオンラインで適切に稼働させ続けることで、プロトコルから直接最大限の報酬を獲得
  - 家庭用ハードウェアを稼働させ、イーサリアムネットワークのセキュリティと分散化に個人で貢献
  - 信頼せず、必ず自分の資金の鍵を自己管理すること
---

## ソロステーキングとは {#what-is-solo-staking}

ソロステーキングとは、インターネットに接続された[イーサリアムノードを稼働](/run-a-node/)させ、32 ETHを預け入れ、[バリデータ](#faq)を起動し、ネットワークのコンセンサスに直接参加できるようになることです。

**ソロステーキングは、イーサリアムネットワークをより分散化**させ、イーサリアムの検閲耐性をより高め、攻撃に対して堅牢になります。 ソロステーキングと違い他のステーキング方法では、ネットワークに役立たないことがあります。 ソロステーキングは、イーサリアムを保護するステーキングにおける最善の選択肢です。

イーサリアムのノードは、実行レイヤー(EL)クライアントとコンセンサスレイヤー(CL) クライアントの両方で構成されています。 これらの2つのクライアントは、有効な署名鍵とともに、トランザクションとブロックの検証、正しい先頭チェーンの証明、アテステーションの集約、ブロックの提案などを行うソフトウェアです。

これらのクライアントを動かすために必要なハードウェアの運用は、ソロステーカーが責任をもって行います。 自宅で専用のマシンを使用することを強くお勧めします。これは、ネットワークの健全性にとって非常に有益なことです。

ソロステーカーは、オンラインでバリデータを適切に稼働させ続けることで、プロトコルから直接報酬を受け取ることができます。

## ソロステーキングの利点 {#why-stake-solo}

ソロステーキングはより多くの責任を伴いますが、資金とステーキングのセットアップをご自身で最大限に制御することができます。

<CardGrid>
  <Card title="ETHの獲得" emoji="💸" description="Earn ETH-denominated rewards directly from the protocol when your validator is online, without any middlemen taking a cut." />
  <Card title="フル制御" emoji="🎛️" description="Keep your own keys. Choose the combination of clients and hardware that allows you to minimize your risk and best contribute to the health and security of the network. Third-party staking services make these decisions for you, and they don't always make the safest choices." />
  <Card title="ネットワークセキュリティ" emoji="🔐" description="Solo staking is the most impactful way to stake. By running a validator on your own hardware at home, you strengthen the robustness, decentralization, and security of the Ethereum protocol." />
</CardGrid>

## ソロステーキングを行う前に考慮すべきこと {#considerations-before-staking-solo}

ソロステーキングが誰にでも利用しやすく、リスクが無ければ良いのですが、現実はそうではありません。 ETHのソロステーキングを選択する前に、真剣かつ実践的に考慮すべき点がいくつかあります。

<InfoGrid>
<ExpandableCard title="必読項目" eventCategory="SoloStaking" eventName="clicked required reading">
ノードを運用する際、選択したソフトウェアの使い方を把握するのに時間をかける必要があります。 そのためには、関連するドキュメントを読み、開発チームのコミュニケーションチャネルにも注意を向ける必要があります。

実行するソフトウェアやプルーフ・オブ・ステークがどのように機能するかを理解すればするほど、ステイカーのリスクは減り、ノードオペレータとして稼働する上で発生した問題を修正するのも容易になります。
</ExpandableCard>

<ExpandableCard title="コンピュータの習熟度" eventCategory="SoloStaking" eventName="clicked comfortable with computers">
新しいツールの登場により、徐々に容易にはなってきていますが、ノードのセットアップには、コンピュータの操作にある程度慣れている必要があります。 コマンドラインインターフェイスを理解していると便利ですが、厳密にはもう必要ありません。

また、ハードウェアの基本的なセットアップと、最低限の推奨スペックをある程度理解する必要があります。
</ExpandableCard>

<ExpandableCard title="安全な鍵の管理" eventCategory="SoloStaking" eventName="clicked secure key management">
秘密鍵がイーサリアムアドレスを保護するのと同じように、バリデータ専用の鍵を生成する必要があります。 シードフレーズや秘密鍵を安全に保管する方法を理解する必要があります。{' '}

<a href="/security/">イーサリアムのセキュリティと詐欺対策</a>
</ExpandableCard>

<ExpandableCard title="メンテナンス" eventCategory="SoloStaking" eventName="clicked maintenance">
ハードウェアが故障したり、ネットワーク接続に失敗したり、クライアントソフトウェアのアップグレードが必要になったりすることもあります。 ノードのメンテナンスは避けられないものであり、時にはあなたの注意を必要とすることがあります。 ネットワークのアップグレードや、クライアントの重要なアップグレードが予定されている場合は、常に注意しておく必要があります。
</ExpandableCard>

<ExpandableCard title="信頼性の高い稼働時間" eventCategory="SoloStaking" eventName="clicked reliable uptime">
報酬は、バリデータがオンラインで適切に認証している時間に比例して支払われます。 ダウンタイムにより、同時にオフラインになった他のバリデータの数に比例したペナルティを負いますが、<a href="#faq">スラッシング</a>は発生しません。 また、アテステーションが間に合わないと報酬が減少するため、帯域幅も重要です。 要件は様々ですが、最低でも上下10 Mb/sを推奨します。
</ExpandableCard>

<ExpandableCard title="スラッシングのリスク" eventCategory="SoloStaking" eventName="clicked slashing risk">
オフラインであることによる非稼働のペナルティとは異なり、<em>スラッシング</em>は悪質な不正にのみ適用される、より深刻なペナルティです。 鍵が読み込まれたマイノリティのクライアントを1台のマシンだけで運用する場合、スラッシングのリスクを最小限に抑えることができます。 とはいえ、すべてのステイカーはスラッシングのリスクを認識しておいてください。

<a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50/">スラッシングとバリデータのライフサイクルの詳細</a>
</ExpandableCard>
</InfoGrid>

<StakingComparison page="solo" />

## 仕組み {#how-it-works}

<StakingHowSoloWorks />

アクティブな間、ETHによる報酬を得られ、引き出しアドレスに対して定期的に入金されます。

望まれるのであれば、バリデータを辞めると、オンラインである必要がなくなり、それ以降の報酬も停止します。 あなたの残高は、設定時に指定した引き出しアドレスに引き落とされます。

[ステーキング引き出しの詳細](/staking/withdrawals/)

## ステーキングランチパッドを開始する {#get-started-on-the-staking-launchpad}

ステーキングランチパッドは、ステーキングを始めるのに便利なオープンソースアプリケーションです。 クライアントの選択、鍵の生成、ステーキングデポジットのコントラクトへのETHの預け入れを案内してくれるアプリケーションです。 バリデータを安全にセットアップするためのチェックリストが提供されています。

<StakingLaunchpadWidget />

## ノードとクライアントのセットアップツールで考慮すべきこと {#node-tool-considerations}

ETHのソロステーキングを支援するツールやサービスは増えていますが、それぞれに異なるリスクと利点があります。

各ステーキングツールの顕著な長所や短所を示すため、下記の属性指標が使用されています。 ステーキングに役立つサービスを選ぶ際に、これらの属性をどのように定義しているかの参考として、このセクションをご利用ください。

<StakingConsiderations page="solo" />

## ノードとクライアントのセットアップツールの検討 {#node-and-client-tools}

セットアップに役立つ様々なオプションが用意されています。 上記の指標を参考に、ツールを選択してください。

<ProductDisclaimer />

### ノードツール

<StakingProductsCardGrid category="nodeTools" />

[マイノリティのクライアント](/developers/docs/nodes-and-clients/client-diversity/)を選択することが、ネットワークのセキュリティを向上させ、ご自身のリスクを制限する上で、重要であることにご留意ください。 少数派のクライアントを設定できるツールは、<em style={{ textTransform: "uppercase" }}>「マルチクライアント」</em> と表記されています。

### キージェネレーター

これらのツールは、[ステーキングデポジットCLI](https://github.com/ethereum/staking-deposit-cli/) の代替として、鍵の生成に使用できます。

<StakingProductsCardGrid category="keyGen" />

ここに記載すべきステーキングツールをご存知の場合は [製品掲載ポリシー](/contributing/adding-staking-products/)を確認し、記載すべきかどうかをご確認の上、レビューに提出してください。

## ソロステーキングガイドを探索 {#staking-guides}

<StakingGuides />

## よくある質問 {#faq}

これらは、ステーキングについての最も一般的な質問のいくつかで、知っておく価値があるものです。

<ExpandableCard title="バリデータとは">

<em>バリデータ</em>とは、イーサリアム上で稼働し、イーサリアムプロトコルのコンセンサスに参加する仮想エンティティです。 バリデータは、残高、公開鍵、およびその他のプロパティで表されます。 <em>バリデータクライアント</em>は、バリデータに代わって機能するソフトウェアで、バリデータの秘密鍵を保持し使用します。 1つのバリデータクライアントが複数の鍵ペアを保持し、複数のバリデータを制御することができます。

</ExpandableCard>

<ExpandableCard title="32 ETH超を預け入れできますか?">
バリデータに関連付けられたそれぞれの鍵ペアを、バリデータとして有効化するには、ちょうど32 ETHを必要とします。 バリデータにつき、<a href="https://www.attestant.io/posts/understanding-validator-effective-balance/">有効残高</a>が32 ETHに制限されているため、1つの鍵セットに対して、32 ETH超の預け入れがあった場合でも、報酬が高くなることはありません。 つまり、ステーキングは32 ETH単位で行われ、それぞれに鍵と残高が設定されています。

1つのバリデータに、32 ETHを超えるETHを預け入れないでください。 32ETHを超える預け入れにより、報酬が増えるわけではありません。 バリデータの引き出しアドレスが設定されている場合、32ETHを超える超過資金は、次回の<a href="/saking/withdrawals/#validator-sweeting">バリデータスイープ</a>中にこの引き出しアドレスへ自動的に引き落とされます。

ソロステーキングが難しい場合は、<a href="/staking/saas/">ステーキング・アズ・ア・サービス(SaaS)</a>プロバイダーの利用をご検討ください。また、32 ETH未満でステーキングを行う場合は、<a href="/staking/pools/">ステーキングプール</a>をチェックしてみてください。
</ExpandableCard>

<ExpandableCard title="オフライン状態になるとスラッシングの対象ですか? (答えは、いいえです)">
ネットワークが正しくファイナライズされているときにオフラインになっても、スラッシングは起こりません。 あるエポック(各6.4分間)の間、バリデータがオフラインで証明できない場合、わずかな<em>非稼働によるペナルティ</em>が発生しますが、これは<em>スラッシング</em>とは異なるものです。 このペナルティは、バリデータがオンラインで証明できた場合に得られる報酬よりも若干少ない額になっており、ペナルティによる損失は再びオンラインに戻ると、ほぼ同等の時間をかけて取り戻すことができます。

注：非稼働によるペナルティは、同時にオフラインになったバリデータの数に比例します。 ネットワークの大部分が一度にすべてオフラインになった場合、各バリデータのペナルティは、単一のバリデータがオフラインになった場合よりも高額になります。

極端な場合、3分の1超のバリデータがオフラインになり、ネットワークのファイナライズが停止してしまうと、<em>クアドラティック非稼働消失(quadratic inactivity leak)</em>と呼ばれる、オフラインのバリデータアカウントからETHが指数関数的に消失する結果に見舞われることになります。 これにより、非稼働状態にあるバリデータのETH残高が16 ETHに達するまで燃焼した時、バリデータのプールから自動的に排出され、最終的にネットワークを自己回復させることができます。 残りのオンライン状態のバリデータは、最終的にネットワークの3分の2以上を構成し、再びチェーンをファイナライズするために必要なスーパーマジョリティを満たすことになります。
</ExpandableCard>

<ExpandableCard title="スラッシングされないようにするにはどうすればいいですか?">
要するに、完全には保証することはできませんが、誠実に振る舞い、少数派のクライアントを実行し、署名鍵を一度に1台のマシンにしか格納しないようにすれば、スラッシングされるリスクはほぼゼロになります。

バリデータがスラッシングされ、ネットワークから追放されるような具体的な原因は、ほんの数種類しかありません。 本稿執筆時点では、2台のマシンに署名鍵が格納され、冗長化されたハードウェアでセットアップされた場合にのみ、スラッシングが発生しています。 この場合、誤って自分の鍵から<em>二重投票</em>してしまうことがあり、これはスラッシングの対象となります。

スーパーマジョリティのクライアント(ネットワークの3分の2以上で使用されているクライアント)を実行すると、このクライアントにチェーンフォークを引き起こすバグがあった場合、スラッシングの可能性があるというリスクも伴います。 その結果、誤ったフォークがファイナライズされてしまうことがあります。 意図したチェーンへと修正するには、<em>サラウンド投票 (surround vote)</em>を提出し、ファイナライズさえたブロックを元に戻す必要があります。 また、これはスラッシングの対象となる違反で、マイノリティのクライアントを実行するだけでこのリスクを回避することができます。

<em>マイノリティのクライアントにおける同じようなバグでは、決してファイナライズされません。</em>そのため、サラウンド投票(surrond vote)に至ることはなく、非稼働のペナルティは課されますが、スラッシングされることはありません。

<ul>
  <li><a href="https://hackernoon.com/ethereums-client-diversity-problem">マイノリティのクライアントを実行する重要性についてもっと詳しく</a></li>
  <li><a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50">スラッシング防止についてもっと知る</a></li>
</ul>
</ExpandableCard>

<ExpandableCard title="どのクライアントがベストですか?">
各クライアントは、様々なプログラミング言語を用いて異なるチームにより開発されているため、パフォーマンスやユーザーインターフェースの観点で多少異なる場合があります。 とはいえ、どのクライアントが「ベスト」とは言い切れません。 リリースされているクライアントは、すべてブロックチェーンと同期し、相互作用するという同じコア機能を実行します。

すべてのリリースされているクライアントは同じ基本機能を提供するので、<strong>マイノリティのクライアント</strong>、つまりネットワーク上の大多数のバリデータで現在使用されていないクライアントを選ぶことが、実際のところ非常に重要です。 これは直感に反するように聞こえるかもしれませんが、マジョリティまたはスーパーマジョリティのクライアントを実行すると、そのクライアントにバグが発生した場合にスラッシングの危険性が高まります。 マイノリティのクライアントを稼働することで、こうしたリスクを大幅に軽減することができます。

<a href="https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA">クライアントの多様性が重要な理由についてもっと知る</a>
</ExpandableCard>

<ExpandableCard title="単にVPS(仮想プライベートサーバ)を使用できますか?">
仮想プライベートサーバ (VPS)は自宅のハードウェアの代わりとして使用できますが、バリデータクライアントの物理的なアクセスや場所は<em>重要です</em>。 アマゾンウェブサービスやデジタルオーシャンなどの中央集権型のクラウドソリューションでは、ネットワークの中央集権化という犠牲のもとで、ハードウェアの入手や運用が不要となり、利便性を提供しています。

単一の中央集権型クラウドストレージソリューション上で動作するバリデータクライアントが多ければ多いほど、これらを使用しているユーザーにとって危険になります。 攻撃、規制要求、あるいは単なる停電/インターネットの停止にかかわらず、これらのプロバイダーがオフラインになるような障害があれば、このサーバに依存しているすべてのバリデータクライアントが同時にオフラインになることになるためです。

オフラインのペナルティは、同時にオフラインになった他のバリデータクライアントの数に比例します。 VPSを使用すると、オフラインのペナルティがより厳しくなり、停止が大規模になった場合にクアドラティックリークやスラッシングのリスクが大幅に高まります。 ご自身のリスク、およびネットワークへのリスクを最小限に抑えるため、ご自身でハードウェアを入手し、運用されることを強くお勧めします。
</ExpandableCard>

<ExpandableCard title="報酬のアンロックまたは自分のETHの戻す方法は何ですか？">

ビーコンチェーンからのいかなる種類の引き出しにおいて、引き出し資格情報の設定が必要です。

新規のステーカーは、キーの生成および預け入れ時に引き出し資格情報を設定します。 まだこの設定していない既存のステーカーは、この機能をサポートするためにキーをアップグレードできます。

引き出し資格情報が設定されると、報酬の支払い (初めの32ETHを超えて蓄積されたETH) が定期的に引き出しアドレスに自動分配されます。

アンロックして残高全体を受け取るには、自分のバリデータを除外する手続きを完了する必要があります。

<ButtonLink to="/staking/withdrawals/">ステーキング引き出しの詳細</ButtonLink>
</ExpandableCard>

## 参考文献 {#further-reading}

- [イーサリアム・ステーキング・ディレクトリ](https://www.saking.directory/) - _EridianとSpacesider_
- [イーサリアムのクライアント多様性問題](https://hackernoon.com/ethereums-client-diversity-problem) - _@emmanuelawosika 2022_
- [クライアントの多様性の支援](https://www.attestant.io/posts/helping-client-diversity/) - _Jim McDonald 2022_
- [イーサリアムのコンセンサスレイヤーにおけるクライアントの多様性](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA) - _jmcook.eth 2022_
- [イーサリアムバリデータ用のハードウェアの購入方法](https://www.youtube.com/watch?v=C2wwu1IlhDc) - _EthStaker 2022_
- [イーサリアム2.0テストネットに参加するステップ・バイ・ステップ手順](https://kb.beaconcha.in/guides/tutorial-eth2-multiclient) - _Butta_
- [Eth2スラッシング防止のためのヒント](https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50) - _Raul Jordan 2020_

<QuizWidget quizKey="solo-staking" />
