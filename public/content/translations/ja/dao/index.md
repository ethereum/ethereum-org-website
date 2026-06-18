---
title: "DAOとは？"
metaTitle: "DAOとは？ | 分散型自律組織 (Decentralized Autonomous Organization)"
description: "イーサリアム上のDAOの概要"
lang: ja
template: use-cases
sidebarDepth: 2
image: /images/use-cases/dao-2.png
alt: "提案に投票するDAOの表現。"
summaryPoints:
  - "中央集権的なリーダーシップを持たない、メンバー所有のコミュニティ。"
  - "インターネット上の見知らぬ人々と安全に協力する方法。"
  - "特定の目的のために安全に資金を拠出できる場所。"
---

## DAOとは？ {#what-are-daos}

DAOは、共通の使命に向かって活動する、共同所有の組織です。

DAOを利用することで、資金や運営を管理する慈悲深いリーダーを信頼することなく、世界中の志を同じくする人々と協力することができます。気まぐれで資金を費やすCEOや、帳簿を操作できるCFOはいません。代わりに、コードに組み込まれたブロックチェーンベースのルールが、組織の仕組みや資金の使途を定義します。

DAOには組み込みのトレジャリーがあり、グループの承認なしには誰もアクセスする権限を持ちません。意思決定は提案と投票によってガバナンスされ、組織内の全員が発言権を持つことが保証されます。そして、すべてが[オンチェーン](/glossary/#onchain)で透明に行われます。

## なぜDAOが必要なのか？ {#why-dao}

資金やお金が絡む組織を誰かと立ち上げるには、一緒に働く人々への多大な信頼が必要です。しかし、インターネット上でしかやり取りしたことのない人を信頼するのは困難です。DAOでは、グループ内の他の誰かを信頼する必要はなく、100%透明で誰でも検証可能なDAOのコードだけを信頼すればよいのです。

これにより、グローバルなコラボレーションと調整のための多くの新しい機会が開かれます。

### 比較 {#dao-comparison}

| DAO                                                                                                                     | 従来の組織                                                                       |
| ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| 通常はフラットで、完全に民主化されている。                                                                                   | 通常は階層的である。                                                                            |
| 変更を実施するには、メンバーによる投票が必要。                                                           | 構造によっては、単一の当事者から変更が要求される場合や、投票が提供される場合がある。     |
| 投票が集計され、信頼できる仲介者なしで結果が自動的に実行される。                                      | 投票が許可されている場合、投票は内部で集計され、投票結果は手動で処理する必要がある。 |
| 提供されるサービスは、分散型で自動的に処理される（例：慈善資金の分配）。 | 人手による処理、または中央集権的に制御された自動化が必要であり、操作されやすい。              |
| すべての活動は透明であり、完全に公開されている。                                                                           | 活動は通常非公開であり、一般への公開は限定的である。                                        |

### DAOの例 {#dao-examples}

より理解しやすくするために、DAOの活用例をいくつか紹介します。

- **慈善団体** – 世界中の誰からでも寄付を受け付け、どの目的に資金を提供するかを投票できます。
- **共同所有** – 物理的またはデジタルな資産を購入し、メンバーがその使用方法について投票できます。
- **ベンチャーと助成金** – 投資資金をプールし、支援するベンチャー企業に投票するベンチャーファンドを設立できます。返済された資金は、後でDAOメンバー間で再分配できます。

<VideoWatch slug="dao-build-next-great-city" />

## DAOの仕組み {#how-daos-work}

DAOのバックボーンは、組織のルールを定義し、グループのトレジャリーを保持する[スマート・コントラクト](/glossary/#smart-contract)です。コントラクトが[イーサリアム](/)上で稼働すると、投票による場合を除き、誰もルールを変更できなくなります。コード内のルールやロジックでカバーされていないことを誰かが実行しようとしても、失敗します。また、トレジャリーもスマート・コントラクトによって定義されているため、グループの承認なしには誰もお金を使うことができません。これは、DAOには中央権威が必要ないことを意味します。代わりに、グループが共同で意思決定を行い、投票が可決されると支払いが自動的に承認されます。

これが可能なのは、スマート・コントラクトがイーサリアム上で稼働すると改ざんできなくなるためです。すべてが公開されているため、誰にも気づかれずにコード（DAOのルール）を編集することはできません。

## イーサリアムとDAO {#ethereum-and-daos}

イーサリアムは、いくつかの理由からDAOにとって完璧な基盤です。

- イーサリアム独自のコンセンサスは分散型であり、組織がネットワークを信頼するのに十分なほど確立されています。
- スマート・コントラクトのコードは、一度稼働すると、所有者であっても変更できません。これにより、DAOはプログラムされたルールに従って実行されます。
- スマート・コントラクトは資金を送受信できます。これがなければ、グループの資金を管理するために信頼できる仲介者が必要になります。
- イーサリアムコミュニティは競争的というよりも協力的であることが証明されており、ベストプラクティスやサポートシステムが迅速に現れることを可能にしています。

## DAOのガバナンス {#dao-governance}

DAOをガバナンスする際には、投票や提案がどのように機能するかなど、多くの考慮事項があります。

### 委任 {#governance-delegation}

委任は、DAO版の代議制民主主義のようなものです。トークン保有者は、自ら立候補し、プロトコルの管理と情報収集に努めることを約束したユーザーに投票をデリゲートします。

#### 有名な例 {#governance-example}

[ENS](https://claim.ens.domains/delegate-ranking) – ENS保有者は、熱心なコミュニティメンバーに投票をデリゲートして、自分たちの代表とすることができます。

### 自動トランザクションガバナンス {#governance-example-2}

多くのDAOでは、定足数のメンバーが賛成票を投じると、トランザクションが自動的に実行されます。

#### 有名な例 {#governance-example-3}

[Nouns](https://nouns.wtf) – Nouns DAOでは、創設者によって拒否権が発動されない限り、定足数の投票が満たされ、過半数が賛成票を投じると、トランザクションが自動的に実行されます。

### マルチシグガバナンス {#governance-example-4}

DAOには何千人もの投票メンバーがいる場合がありますが、資金は、信頼され、通常は身元が公開されている（コミュニティに公的アイデンティティが知られている）5〜20人のアクティブなコミュニティメンバーが共有する[ウォレット](/glossary/#wallet)に保管されることがあります。投票後、[マルチシグ](/glossary/#multisig)の署名者がコミュニティの意志を実行します。

## DAOに関する法律 {#dao-laws}

1977年、ワイオミング州は起業家を保護し、その責任を制限するLLC（有限責任会社）を考案しました。最近では、DAOの法的地位を確立するDAO法を先駆けて制定しました。現在、ワイオミング州、バーモント州、およびバージン諸島には、何らかの形でDAOに関する法律があります。

### 有名な例 {#law-example}

[CityDAO](https://citizen.citydao.io/) – CityDAOはワイオミング州のDAO法を利用して、イエローストーン国立公園近くの40エーカーの土地を購入しました。

## DAOのメンバーシップ {#dao-membership}

DAOのメンバーシップにはさまざまなモデルがあります。メンバーシップは、投票の仕組みやDAOのその他の重要な部分を決定する可能性があります。

### トークンベースのメンバーシップ {#token-based-membership}

使用されるトークンにもよりますが、通常は完全に[パーミッションレス](/glossary/#permissionless)です。ほとんどの場合、これらのガバナンストークンは[分散型取引所](/glossary/#dex)でパーミッションレスに取引できます。その他のトークンは、流動性の提供やその他の「プルーフ・オブ・ワーク（PoW）」を通じて獲得する必要があります。いずれにせよ、トークンを保持するだけで投票へのアクセスが許可されます。

_通常、広範な分散型プロトコルやトークン自体のガバナンスに使用されます。_

#### 有名な例 {#token-example}

[メイカーダオ](https://makerdao.com) – メイカーダオのトークンであるMKRは分散型取引所で広く入手可能であり、誰でも購入してMakerプロトコルの将来に対する投票権を持つことができます。

### シェアベースのメンバーシップ {#share-based-membership}

シェアベースのDAOはよりパーミッションドですが、それでもかなりオープンです。入会希望者は誰でもDAOに参加するための提案を提出でき、通常はトークンや労働の形で何らかの価値ある貢献を提供します。シェアは直接的な投票権と所有権を表します。メンバーは、トレジャリーの比例配分を持っていつでもエグジットできます。

_通常、慈善団体、労働者集団、投資クラブなど、より緊密で人間中心の組織に使用されます。プロトコルやトークンのガバナンスを行うこともできます。_

### レピュテーションベースのメンバーシップ {#reputation-based-membership}

レピュテーション（評判）は参加の証明を表し、DAOでの投票権を付与します。トークンやシェアベースのメンバーシップとは異なり、レピュテーションベースのDAOは貢献者に所有権を譲渡しません。レピュテーションは購入、譲渡、または委任することはできず、DAOメンバーは参加を通じてレピュテーションを獲得する必要があります。オンチェーンでの投票はパーミッションレスであり、入会希望者はDAOに参加するための提案を自由に提出し、貢献と引き換えに報酬としてレピュテーションとトークンを受け取るよう要求できます。

_通常、プロトコルや[分散型アプリケーション (dapp)](/glossary/#dapp)の分散型開発とガバナンスに使用されますが、慈善団体、労働者集団、投資クラブなどの多様な組織にも適しています。_

#### 有名な例 {#reputation-example}

[DXdao](https://DXdao.eth.limo) – DXdaoは、2019年以来、分散型プロトコルとアプリケーションを構築およびガバナンスするグローバルな主権的集団でした。レピュテーションベースのガバナンスと[ホログラフィック・コンセンサス](/glossary/#holographic-consensus)を活用して資金を調整および管理しており、誰もお金でその将来やガバナンスに影響を与えることはできませんでした。

## DAOに参加する / 立ち上げる {#join-start-a-dao}

### DAOに参加する {#join-a-dao}

- [イーサリアムコミュニティのDAO](/community/get-involved/#decentralized-autonomous-organizations-daos)
- [DAOHausのDAOリスト](https://app.daohaus.club/explore)
- [Tally.xyzのDAOリスト](https://www.tally.xyz/explore)
- [DeGov.AIのDAOリスト](https://apps.degov.ai/)

### DAOを立ち上げる {#start-a-dao}

- [DAOHausでDAOを召喚する](https://app.daohaus.club/summon)
- [TallyでGovernor DAOを立ち上げる](https://www.tally.xyz/get-started)
- [Aragonを利用したDAOを作成する](https://aragon.org/product)
- [Colonyを立ち上げる](https://colony.io/)
- [DAOstackのホログラフィック・コンセンサスでDAOを作成する](https://alchemy.daostack.io/daos/create)
- [DeGov LauncherでDAOをローンチする](https://docs.degov.ai/integration/deploy)

## 参考文献 {#further-reading}

### DAOに関する記事 {#dao-articles}

- [DAOとは？](https://aragon.org/dao) – [Aragon](https://aragon.org/)
- [House of DAOs](https://wiki.metagame.wtf/docs/great-houses/house-of-daos) – [Metagame](https://wiki.metagame.wtf/)
- [DAOとは何か、何のためにあるのか？](https://daohaus.substack.com/p/-what-is-a-dao-and-what-is-it-for) – [DAOhaus](https://daohaus.club/)
- [DAOを活用したデジタルコミュニティの始め方](https://daohaus.substack.com/p/four-and-a-half-steps-to-start-a) – [DAOhaus](https://daohaus.club/)
- [DAOとは？](https://coinmarketcap.com/alexandria/article/what-is-a-dao) – [Coinmarketcap](https://coinmarketcap.com)
- [ホログラフィック・コンセンサスとは？](https://medium.com/daostack/holographic-consensus-part-1-116a73ba1e1c) - [DAOstack](https://daostack.io/)
- [DAOは企業ではない：自律組織における分散化が重要な理由（ヴィタリック著）](https://vitalik.eth.limo/general/2022/09/20/daos.html)
- [DAO、DAC、DAなど：不完全な用語ガイド](https://blog.ethereum.org/2014/05/06/daos-dacs-das-and-more-an-incomplete-terminology-guide) - [Ethereum Blog](https://blog.ethereum.org)

### ビデオ {#videos}

- [暗号資産におけるDAOとは？](https://youtu.be/KHm0uUPqmVE)
- [DAOは都市を建設できるか？](https://www.ted.com/talks/scott_fitsimones_could_a_dao_build_the_next_great_city) – [TED](https://www.ted.com/)

<Divider />

<QuizWidget quizKey="daos" />