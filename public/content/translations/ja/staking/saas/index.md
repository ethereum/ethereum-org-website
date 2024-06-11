---
title: ステーキングサービス
description: ETHステーキングプールの始め方の概要
lang: ja
template: staking
emoji: ":money_with_wings:"
image: /staking/leslie-saas.png
alt: 雲に浮かぶサイのレスリー
sidebarDepth: 2
summaryPoints:
  - サードパーティーのノードオペレータが、バリデータクライアントの運用を実施
  - 32 ETHを保有し、ノードを実行することの技術的な複雑さを回避したい方向けの選択肢
  - 信頼せず、必ず引き出し鍵を必ず保持すること
---

## ステーキングサービスとは {#what-is-staking-as-a-service}

ステーキング・アズ・ア・サービス(SaaS)は、バリデータになるための32 ETHを預け入れ、ノードの運用については、サードパーティに委任できるステーキングサービスのことです。 このプロセスでは通常、鍵の生成と預け入れを伴う初期セットアップを案内され、署名鍵をオペレータにアップロードします。 これは、通常は月額手数料で、バリデータの運用を代行するサービスです。

## サービスを使ってステークする利点 {#why-stake-with-a-service}

イーサリアムのプロトコルは、ステーキングの委任をネイティブにはサポートしないため、これらのサービスは需要を満たすために作られたものです。 ステーキングする32 ETHはあるものの、ハードウェアを扱うのが苦手な場合、ステーキング・アズ・ア・サービス(SaaS)を利用すると、難しい部分を委任しながらネイティブブロックの報酬を得ることができます。

<CardGrid>
  <Card title="自分自身のバリデータ" emoji=":desktop_computer:" description="Deposit your own 32 ETH to activate your own set of signing keys that will participate in Ethereum consensus. Monitor your progress with dashboards to watch those ETH rewards accumulate." />
  <Card title="簡単に開始" emoji="🏁" description="Forget about hardware specs, setup, node maintenance and upgrades. SaaS providers let you outsource the hard part by uploading your own signing credentials, allowing them to run a validator on your behalf, for a small cost." />
  <Card title="リスクを制限" emoji=":shield:" description="In many cases users do not have to give up access to the keys that enable withdrawing or transferring staked funds. These are different from the signing keys, and can be stored separately to limit (but not eliminate) your risk as a staker." />
</CardGrid>

<StakingComparison page="saas" />

## 考慮すべき事項 {#what-to-consider}

ETHのステーキングを支援するSaaSプロバイダーの数は増えていrる一方で、それぞれに独自の利点とリスクがあります。 SaaSを選択すること全てにおいて、ホームステーキングに比べて、さらなる信頼の前提が必要になります。 SaaSを選択することは、イーサリアムクライアントをラップするオープンまたは監査不可能な追加のコードが含まれる場合があります。 また、SaaSは、ネットワークの分散化にも悪影響を及ぼします。 設定によっては、自分のバリデータを制御できない場合があります。オペレータがあなたのETHを使用して不正行為を行える可能性があります。

各SaaSプロバイダーの顕著な長所や短所を示すため、下記の属性指標が使用されています。 ステーキングに役立つサービスを選ぶ際に、これらの属性をどのように定義しているかの参考として、このセクションをご利用ください。

<StakingConsiderations page="saas" />

## ステーキングサービスプロバイダーを探す {#saas-providers}

下記は、利用可能なステーキング・アズ・ア・サービス(SaaS)プロバイダーです。 上記の指標を参考に、これらのサービスをご利用ください。

<ProductDisclaimer />

### ステーキングサービスプロバイダー

<StakingProductsCardGrid category="saas" />

[クライアントの多様性](/developers/docs/nodes-and-clients/client-diversity/)をサポートすることが、ネットワークのセキュリティを向上させ、ご自身のリスクを制限する上で、重要であることにご留意ください。 サービスでマジョリティのクライアントの使用を制限している証拠は、<em style={{ textTransform: "uppercase" }}>「実行クライアントの多様性」</em> および <em style={{ textTransform: "uppercase" }}>「コンセンサスクライアントの多様性」</em>で示されます。

### キージェネレーター

<StakingProductsCardGrid category="keyGen" />

ここに記載すべきステーキング・アズ・ア・サービス(SaaS)プロバイダーをご存知の場合は [製品掲載ポリシー](/contributing/adding-staking-products/)を確認し、記載すべきかどうかをご確認の上、レビューに提出してください。

## よくある質問 {#faq}

<ExpandableCard title="鍵の保有者" eventCategory="SaasStaking" eventName="clicked who holds my keys">
流れはプロバイダーによって異なりますが、一般的には、必要な署名鍵(32 ETHにつき1つの鍵)を設定し、プロバイダーにアップロードし、プロバイダーが代理で検証を行います。 署名鍵だけでは、あなたの資金を引き出したり、送金したり、使用することはできません。 ただし、コンセンサスのための投票はできるため、適切に行われない場合はオフラインでのペナルティやスラッシングにつながる可能性があります。
</ExpandableCard>

<ExpandableCard title="鍵は2種類" eventCategory="SaasStaking" eventName="clicked so there are two sets of keys">
  すべてのアカウントは、BLS<em>署名鍵</em>とBLS<em>引き出し鍵</em>の両方で構成されています。 バリデータがチェーンの状態を証明し、同期し、ブロックを提案するには、バリデータクライアントが署名鍵に容易にアクセスできる必要があります。 これらは何らかの形でインターネットに接続されていなければならないため、本質的に「ホットキー」とみなされます。 署名鍵は、バリデータが証明できるようにするための必須の鍵であり、送金や引き出しに使用する鍵とは、セキュリティ上の理由から別のものになっています。

BLS引き出し鍵は、ステーキング報酬とステーキングを終了した資金がどの実行レイヤーのアカウントに送られるかを宣言するワンタイムメッセージに署名するために使われます。 ひとたび、このメッセージがブロードキャストされると、<em>BLS引き出し</em>鍵は不要になります。 これにより、引き出した資金の管理は、指定したアドレスに永久に委任されます。 これで自分のコールドストレージを介して安全に引き出しアドレスを設定できるため、たとえ他人がバリデータの署名鍵を管理していたとしても、バリデータ資金へのリスクを最小限に抑えることができます。

引き出し資格情報の更新は、引き出しを有効にするために必要な手順です\*。 この過程では、ニーモニックシードフレーズを使用して引き出し鍵を生成することを伴います。

<strong>必ずこのシードフレーズを安全なところにバックアップしてください。さもないと、しかるべき時に引き出し鍵を生成できなくなります。</strong>

\*最初の入金時に引きだしアドレスを提供したステーカーは、この設定は必要ありません。 バリデータを用意する方法に関するサポートについては、SaaSプロバイダーに問い合わせてください。
</ExpandableCard>

<ExpandableCard title="引き出しが可能になる時期" eventCategory="SaasStaking" eventName="clicked when can I withdraw">
ステーキングの引き出しは、2023年4月の上海/カペラアップグレードで実装されました。 引き出しアドレスを最初の入金時に提供していないステーカーはは、提供する必要があります。また、報酬の支払いは、数日ごとに定期的に自動的に分配されます。

バリデータは、バリデータとしての役割りを完全に終了することもできます。終了すると、ETH残高がアンロックされ、引き出しできるようになります。 実行引き出しアドレスを提供し、バリデータの終了プロセスを完了したアカウントは、次のバリデータスイープ中に、提供した引き出しアドレスにすべての残高を受け取ることができます。

<ButtonLink to="/staking/withdrawals/">ステーキング引き出しの詳細</ButtonLink>
</ExpandableCard>

<ExpandableCard title="スラッシングされた場合" eventCategory="SaasStaking" eventName="clicked what happens if I get slashed">
SaaSプロバイダーを利用することは、ノードの運用を誰かに委ねるということです。 このため、ノードのパフォーマンスが低下するリスクが伴い、このリスクはご自身で制御することはできません。 バリデータがスラッシングされた場合は、自分のバリデータ残高にペナルティが課せられ、バリデータプールから強制的に取り上げられます。

スラッシングおよび退出プロセスが完了すると、これらの資金は、バリデータに指定した引き出しアドレスに転送されます。 これには、有効にするための引き出しアドレスを提供する必要があります。 このアドレスを最初の入金時に提供しているかもしれません。 提供していない場合は、バリデータ引き出し鍵を使用して、引き出しアドレスを宣言するメッセージに署名する必要があります。 引き出しアドレスが提供されていない場合、アドレスが提供されるまで資金はロックされたままになります。

保証や保険オプションなどの詳細や、引き出しアドレスの提供方法については、それぞれのSaaSプロバイダーにお問い合わせください。 バリデータのセットアップをご自身で完全に制御したい場合は、<a href="/staking/solo/">ETHのソロステークの方法</a>についてさらに学びましょう。
</ExpandableCard>

## 参考文献 {#further-reading}

- [イーサリアム・ステーキング・ディレクトリ](https://www.saking.directory/) - _EridianとSpacesider_
- [ステーキングサービスの評価](https://www.attestant.io/posts/evaluating-staking-services/) - _Jim McDonald 2020_
