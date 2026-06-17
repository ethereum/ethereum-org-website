---
title: ステーキング・アズ・ア・サービス
description: ステーキング・アズ・ア・サービスについて学ぶ
lang: ja
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-saas.png
alt: 雲に浮かぶサイのレスリー。
sidebarDepth: 2
summaryPoints:
  - サードパーティのノードオペレーターがバリデータクライアントの運用を処理します
  - 32 ETHを保有しているが、ノード運用の技術的な複雑さに対処することに不安を感じる人にとって素晴らしい選択肢です
  - トラストを減らし、引き出し鍵の管理を維持します
---

## ステーキング・アズ・ア・サービスとは？ {#what-is-staking-as-a-service}

ステーキング・アズ・ア・サービス（SaaS）は、バリデータのために自身の32 ETHをステークし、ノードの運用をサードパーティのオペレーターにデリゲートするステーキングサービスのカテゴリーです。このプロセスでは通常、鍵の生成やステークなどの初期設定のガイドを受け、その後、署名鍵をオペレーターにアップロードします。これにより、サービスは通常月額料金で、あなたに代わってバリデータを運用することができます。

## サービスを利用してステークする理由 {#why-stake-with-a-service}

[イーサリアム](/)プロトコルはネイティブでステークの委任をサポートしていないため、この需要を満たすためにこれらのサービスが構築されました。ステークするための32 ETHを持っているが、ハードウェアの扱いに不安がある場合、SaaSサービスを利用すれば、難しい部分をデリゲートしながらネイティブのブロック報酬を得ることができます。

<Grid>
  <Card title="Your own validator" emoji=":desktop_computer:" description="Deposit your own 32 ETH to activate your own set of signing keys that will participate in Ethereum consensus. Monitor your progress with dashboards to watch those ETH rewards accumulate." />
  <Card title="Easy to start" emoji="🏁" description="Forget about hardware specs, setup, node maintenance and upgrades. SaaS providers let you outsource the hard part by uploading your own signing credentials, allowing them to run a validator on your behalf, for a small cost." />
  <Card title="Limit your risk" emoji=":shield:" description="In many cases users do not have to give up access to the keys that enable withdrawing or transferring staked funds. These are different from the signing keys, and can be stored separately to limit (but not eliminate) your risk as a staker." />
</Grid>

<StakingComparison page="saas" />

## 考慮すべきこと {#what-to-consider}

ETHのステーキングを支援するSaaSプロバイダーは増えていますが、それぞれに独自のメリットとリスクがあります。すべてのSaaSオプションは、ホームステーキングと比較して追加のトラスト前提を必要とします。SaaSオプションには、オープンでも監査可能でもない、イーサリアムクライアントをラップする追加のコードが含まれている場合があります。また、SaaSはネットワークの分散化に悪影響を及ぼします。設定によっては、バリデータを制御できない場合があり、オペレーターがあなたのETHを使用して不正に機能する可能性があります。

以下の属性インジケーターは、リストされたSaaSプロバイダーが持つ可能性のある顕著な強みや弱みを示すために使用されます。ステーキングの旅を支援するサービスを選択する際、これらの属性をどのように定義しているかの参考としてこのセクションを使用してください。

<StakingConsiderations page="saas" />

## ステーキングサービスプロバイダーを探す {#saas-providers}

以下は利用可能なSaaSプロバイダーの一部です。上記のインジケーターを使用して、これらのサービスを検討する際の参考にしてください。

<ProductDisclaimer />

### SaaSプロバイダー {#saas-providers-2}

<StakingProductsCardGrid category="saas" />

ネットワークのセキュリティを向上させ、リスクを制限するため、[クライアント・ダイバーシティ](/developers/docs/nodes-and-clients/client-diversity/)をサポートすることの重要性に注意してください。多数派クライアントの使用を制限している証拠があるサービスは、<em style={{ textTransform: "uppercase" }}>「実行クライアント・ダイバーシティ」</em>および<em style={{ textTransform: "uppercase" }}>「コンセンサス・クライアント・ダイバーシティ」</em>で示されています。

### 鍵ジェネレーター {#key-generators}

<StakingProductsCardGrid category="keyGen" />

私たちがリストから漏らしているステーキング・アズ・ア・サービスのプロバイダーの提案がありますか？それが適切かどうかを確認し、レビューのために提出するには、私たちの[プロダクト掲載ポリシー](/contributing/adding-staking-products/)をチェックしてください。

## よくある質問 {#faq}

<ExpandableCard title="誰が私の鍵を保持しますか？" eventCategory="SaasStaking" eventName="clicked who holds my keys">
取り決めはプロバイダーによって異なりますが、一般的には、必要な署名鍵（32 ETHにつき1つ）の設定をガイドされ、これらをプロバイダーにアップロードして、あなたに代わって検証できるようにします。署名鍵だけでは、資金を引き出し、送金、または使用する能力は与えられません。ただし、コンセンサスに向けて投票する能力は提供され、これが適切に行われない場合、オフラインペナルティやスラッシングにつながる可能性があります。
</ExpandableCard>

<ExpandableCard title="つまり、2組の鍵があるということですか？" eventCategory="SaasStaking" eventName="clicked so there are two sets of keys">
はい。各アカウントは、BLS<em>署名</em>鍵とBLS<em>引き出し</em>鍵の両方で構成されています。バリデータがチェーンの状態を証明し、同期委員会に参加し、ブロックを提案するためには、署名鍵がバリデータクライアントから容易にアクセス可能でなければなりません。これらは何らかの形でインターネットに接続されている必要があり、したがって本質的に「ホット」キーと見なされます。これはバリデータが証明できるようにするための要件であり、そのため、資金の送金や引き出しに使用される鍵はセキュリティ上の理由から分離されています。

BLS引き出し鍵は、ステーキング報酬とエグジットした資金がどの実行レイヤーアカウントに送られるべきかを宣言する1回限りのメッセージに署名するために使用されます。このメッセージがブロードキャストされると、<em>BLS引き出し</em>鍵は不要になります。代わりに、引き出された資金の制御は、あなたが提供したアドレスに永久に委任されます。これにより、独自のコールドストレージで保護された引き出しアドレスを設定でき、他の誰かがバリデータの署名鍵を制御している場合でも、バリデータ資金へのリスクを最小限に抑えることができます。

出金クレデンシャルの更新は、引き出しを有効にするために必要なステップです\*。このプロセスには、ニーモニックのシード・フレーズを使用して引き出し鍵を生成することが含まれます。

<strong>このシード・フレーズを安全にバックアップしていることを確認してください。そうしないと、いざという時に引き出し鍵を生成できなくなります。</strong>

\*最初のステーク時に引き出しアドレスを提供したステーカーは、これを設定する必要はありません。バリデータの準備方法に関するサポートについては、SaaSプロバイダーに確認してください。
</ExpandableCard>

<ExpandableCard title="いつ引き出しできますか？" eventCategory="SaasStaking" eventName="clicked when can I withdraw">
ステーカーは引き出しアドレスを提供する必要があり（最初のステーク時に提供されていない場合）、報酬の支払いは数日ごとの定期的なベースで自動的に分配され始めます。

バリデータは、バリデータとして完全にエグジットすることもでき、これにより残りのETH残高が引き出しのためにロック解除されます。実行引き出しアドレスを提供し、エグジットプロセスを完了したアカウントは、次のバリデータスイープ中に、提供された引き出しアドレスに全残高を受け取ります。

<ButtonLink href="/staking/withdrawals/">ステーキングの引き出しについてさらに詳しく</ButtonLink>
</ButtonLink>

<ExpandableCard title="スラッシングされたらどうなりますか？" eventCategory="SaasStaking" eventName="clicked what happens if I get slashed">
SaaSプロバイダーを使用することで、ノードの運用を他の誰かに委ねることになります。これには、あなたの制御が及ばないノードのパフォーマンス低下のリスクが伴います。バリデータがスラッシングされた場合、バリデータの残高はペナルティを受け、バリデータプールから強制的に削除されます。

スラッシング/エグジットプロセスが完了すると、これらの資金はバリデータに割り当てられた引き出しアドレスに送金されます。これを有効にするには、引き出しアドレスを提供する必要があります。これは最初のステーク時に提供されているかもしれません。そうでない場合、バリデータの引き出し鍵を使用して、引き出しアドレスを宣言するメッセージに署名する必要があります。引き出しアドレスが提供されていない場合、資金は提供されるまでロックされたままになります。

保証や保険のオプションの詳細、および引き出しアドレスの提供方法に関する指示については、個々のSaaSプロバイダーにお問い合わせください。バリデータの設定を完全に制御したい場合は、[ETHのソロステーキング方法についてさらに詳しく学んでください](/staking/solo/)。
</ExpandableCard>

## 参考文献 {#further-reading}

- [イーサリアムステーキングディレクトリ](https://www.staking.directory/) - _EridianおよびSpacesider_
- [ステーキングサービスの評価](https://www.attestant.io/posts/evaluating-staking-services/) - _Jim McDonald 2020_