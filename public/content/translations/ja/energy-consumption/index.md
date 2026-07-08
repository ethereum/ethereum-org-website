---
title: イーサリアムのエネルギー消費量
metaTitle: イーサリアムのエネルギー消費量
description: イーサリアムのエネルギー消費量を理解するために必要な基本情報。
lang: ja
---

[イーサリアム](/)は環境に優しいブロックチェーンです。イーサリアムの[プルーフ・オブ・ステーク (PoS)](/developers/docs/consensus-mechanisms/pos)コンセンサス・メカニズムは、[ネットワークを保護するためにエネルギー](/developers/docs/consensus-mechanisms/pow)の代わりにETHを使用します。イーサリアムのエネルギー消費量は、グローバルネットワーク全体で年間約[0.0026 TWh](https://carbon-ratings.com/eth-report-2022)です。

イーサリアムのエネルギー消費量の推定値は、[CCRI (Crypto Carbon Ratings Institute)](https://carbon-ratings.com)の調査に基づいています。彼らは、イーサリアム・ネットワークの電力消費量とカーボンフットプリントのボトムアップ推定値を算出しました（[レポートを参照](https://carbon-ratings.com/eth-report-2022)）。さまざまなハードウェアおよびクライアントソフトウェア構成を持つ異なるノードの電力消費量を測定しました。ネットワークの年間電力消費量の推定値である**2,601 MWh**（0.0026 TWh）は、地域固有の炭素集約度係数を適用すると、年間**870トンCO2e**の炭素排出量に相当します。この値は、ノードがネットワークに参加したり離脱したりするにつれて変化します。[Cambridge Blockchain Network Sustainability Index](https://ccaf.io/cbnsi/ethereum)による7日間の移動平均推定値を使用して追跡できます（彼らは推定にわずかに異なる方法を使用していることに注意してください。詳細は彼らのサイトで確認できます）。

イーサリアムのエネルギー消費量を文脈化するために、他のいくつかの製品や業界の年換算推定値と比較することができます。これにより、イーサリアムの推定値が高いか低いかをよりよく理解できます。

<EnergyConsumptionChart />

上のグラフは、イーサリアムの年間推定エネルギー消費量（TWh/年）を、他のいくつかの製品や業界と比較して示しています。提供されている推定値は、2023年7月時点でアクセス可能な公開情報から取得したものであり、情報源へのリンクは以下の表に記載されています。

|                     | 年換算エネルギー消費量 (TWh) | PoSイーサリアムとの比較 |                                                                                      情報源                                                                                       |
| :------------------ | :---------------------------------: | :------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| グローバルデータセンター |                 190                 |          73,000倍           |                                    [情報源](https://www.iea.org/commentaries/data-centres-and-energy-from-global-headlines-to-local-headaches)                                    |
| ビットコイン             |                 149                 |          53,000倍           |                                                                 [情報源](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                 |
| 金のマイニング         |                 131                 |          50,000倍           |                                                                 [情報源](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                 |
| 米国のゲーム\*     |                 34                  |          13,000倍           |                 [情報源](https://www.researchgate.net/publication/336909520_Toward_Greener_Gaming_Estimating_National_Energy_Use_and_Energy_Efficiency_Potential)                 |
| PoWイーサリアム        |                 21                  |           8,100倍           |                                                                    [情報源](https://ccaf.io/cbnsi/ethereum/1)                                                                     |
| Google              |                 19                  |           7,300倍           |                                           [情報源](https://www.gstatic.com/gumdrop/sustainability/google-2022-environmental-report.pdf)                                           |
| ネットフリックス             |                0.457                |            176倍            | [情報源](https://assets.ctfassets.net/4cd45et68cgf/7B2bKCqkXDfHLadrjrNWD8/e44583e5b288bdf61e8bf3d7f8562884/2021_US_EN_Netflix_EnvironmentalSocialGovernanceReport-2021_Final.pdf) |
| ペイパル              |                0.26                 |            100倍            |                                 [情報源](<https://s202.q4cdn.com/805890769/files/doc_downloads/global-impact/CDP_Climate_Change_PayPal-(1).pdf>)                                  |
| AirBnB              |                0.02                 |             8倍             |                              [情報源](<https://s26.q4cdn.com/656283129/files/doc_downloads/governance_doc_updated/Airbnb-ESG-Factsheet-(Final).pdf>)                              |
| **PoSイーサリアム**    |             **0.0026**              |           **1倍**           |                                                               [情報源](https://carbon-ratings.com/eth-report-2022)                                                                |

\*PC、ノートパソコン、ゲーム機などのエンドユーザーデバイスを含みます。

エネルギー消費量の正確な推定値を得ることは複雑です。特に、測定対象が複雑なサプライチェーンを持っていたり、効率に影響を与えるデプロイの詳細があったりする場合はなおさらです。たとえば、ネットフリックスやGoogleのエネルギー消費量の推定値は、システムの維持やユーザーへのコンテンツ配信に使用されるエネルギー（*直接消費*）のみを含めるか、コンテンツの制作、オフィスの運営、広告などに必要な消費（*間接消費*）を含めるかによって異なります。間接消費には、テレビ、コンピューター、モバイルなどのエンドユーザーデバイスでコンテンツを消費するために必要なエネルギーも含まれる場合があります。

上記の推定値は完璧な比較ではありません。考慮される間接消費の量は情報源によって異なり、エンドユーザーデバイスからのエネルギーが含まれることはまれです。各情報源には、測定対象に関する詳細が記載されています。

上記の表とグラフには、ビットコインおよびプルーフ・オブ・ワーク (PoW) 版イーサリアムとの比較も含まれています。プルーフ・オブ・ワーク・ネットワークのエネルギー消費量は静的ではなく、日々変化することに注意することが重要です。推定値も情報源によって大きく異なる場合があります。このトピックは、消費されるエネルギー量だけでなく、そのエネルギー源や関連する倫理についても、ニュアンスに富んだ[議論](https://www.coindesk.com/business/2020/05/19/the-last-word-on-bitcoins-energy-consumption/)を引き起こします。異なるプロジェクトが、再生可能エネルギーの割合の大小を含め、異なるエネルギー源を使用する可能性があるため、エネルギー消費量が必ずしも環境フットプリントに正確にマッピングされるわけではありません。たとえば、[Cambridge Bitcoin Electricity Consumption Index](https://ccaf.io/cbnsi/cbeci/comparisons)は、ビットコイン・ネットワークの需要が、理論的にはガスフレアリングや、送配電で失われるはずだった電力によって賄われる可能性があることを示しています。イーサリアムの持続可能性への道は、ネットワークのエネルギーを大量に消費する部分を環境に優しい代替手段に置き換えることでした。

[Cambridge Blockchain Network Sustainability Indexのサイト](https://ccaf.io/cbnsi/ethereum)で、多くの業界のエネルギー消費量と炭素排出量の推定値を閲覧できます。

## トランザクションあたりの推定値 {#per-transaction-estimates}

多くの記事が、ブロックチェーンの「トランザクションあたり」のエネルギー消費量を推定しています。ブロックを提案および検証するために必要なエネルギーは、その中のトランザクション数とは無関係であるため、これは誤解を招く可能性があります。トランザクションあたりのエネルギー消費量という単位は、トランザクションが少なければエネルギー消費量も少なくなり、その逆もまた然りであることを示唆していますが、実際にはそうではありません。また、トランザクションあたりの推定値は、ブロックチェーンのトランザクション・スループットがどのように定義されるかに非常に敏感であり、この定義を微調整することで、値を大きく見せたり小さく見せたりするように操作される可能性があります。

たとえばイーサリアムでは、トランザクション・スループットはベースレイヤーのものだけでなく、すべての「[レイヤー2 (L2)](/layer-2/)」ロールアップのトランザクション・スループットの合計でもあります。レイヤー2は通常、計算には含まれませんが、シーケンサーによって消費される追加のエネルギー（小）と、それらが処理するトランザクション数（大）を考慮すると、トランザクションあたりの推定値は大幅に減少する可能性があります。これが、プラットフォーム間でのトランザクションあたりのエネルギー消費量の比較が誤解を招く可能性がある理由の1つです。

## イーサリアムのカーボンデット（炭素負債） {#carbon-debt}

イーサリアムのエネルギー消費量は非常に低いですが、常にそうであったわけではありません。イーサリアムは当初、現在のプルーフ・オブ・ステーク・メカニズムよりもはるかに環境コストが高いプルーフ・オブ・ワークを使用していました。

イーサリアムは当初から、プルーフ・オブ・ステークに基づくコンセンサス・メカニズムを実装することを計画していましたが、セキュリティと分散化を犠牲にすることなくそれを実現するには、何年にもわたる集中的な研究開発が必要でした。そのため、ネットワークを立ち上げるためにプルーフ・オブ・ワーク・メカニズムが使用されました。プルーフ・オブ・ワークでは、マイナーがコンピューティングハードウェアを使用して値を計算する必要があり、その過程でエネルギーを消費します。

![Comparing Ethereum's energy consumption pre- and post-Merge, using the Eiffel Tower (330 meters tall) on the left to symbolize the high energy consumption before The Merge, and a small 4 cm tall Lego figure on the right to represent the dramatic reduction in energy usage after The Merge](energy_consumption_pre_post_merge.png)

CCRIは、マージによってイーサリアムの年換算電力消費量が**99.988%**以上削減されたと推定しています。同様に、イーサリアムのカーボンフットプリントは約**99.992%**（11,016,000トンから870トンCO2eへ）減少しました。これを大局的に見ると、排出量の削減は、上の図に示されているように、エッフェル塔の高さから小さなプラスチックのおもちゃのフィギュアになるようなものです。その結果、ネットワークを保護するための環境コストは大幅に削減されました。同時に、ネットワークのセキュリティも向上したと考えられています。

## 環境に優しいアプリケーションレイヤー {#green-applications}

イーサリアムのエネルギー消費量は非常に低い一方で、イーサリアム上には実質的で成長を続ける、非常に活発な[**リジェネラティブ・ファイナンス (ReFi)**](/refi/)コミュニティも構築されています。ReFiアプリケーションは、分散型金融 (DeFi) コンポーネントを使用して、環境に利益をもたらす正の外部性を持つ金融アプリケーションを構築します。ReFiは、イーサリアムと密接に連携し、技術の進歩と環境管理を結びつけることを目的とした、より広範な[「ソーラーパンク」](https://en.wikipedia.org/wiki/Solarpunk)ムーブメントの一部です。イーサリアムの分散型、パーミッションレス、およびコンポーザブルな性質は、ReFiおよびソーラーパンクコミュニティにとって理想的なベースレイヤーとなります。

[Gitcoin](https://gitcoin.co)などのWeb3ネイティブな公共財資金調達プラットフォームは、イーサリアムのアプリケーションレイヤーでの環境に配慮した構築を促進するために、クライメートラウンド（気候変動対策ラウンド）を実施しています。これらのイニシアチブ（および[分散型科学 (DeSci)](/desci/)などの他の取り組み）の発展を通じて、イーサリアムは環境的および社会的にネットポジティブなテクノロジーになりつつあります。

<Alert variant="update">
<AlertEmoji text=":evergreen_tree:" />
<AlertContent>
<AlertDescription>
  このページをより正確にできると思われる場合は、IssueまたはPRを作成してください。このページの統計は公開データに基づく推定値であり、ethereum.orgチームまたはイーサリアム財団からの公式な声明や約束を表すものではありません。
</AlertDescription>
</AlertContent>
</Alert>

## 参考文献 {#further-reading}

- [Cambridge Blockchain Network Sustainability Index](https://ccaf.io/cbnsi/ethereum)
- [プルーフ・オブ・ワーク・ブロックチェーンに関するホワイトハウスのレポート](https://web.archive.org/web/20221109005700/https://www.whitehouse.gov/wp-content/uploads/2022/09/09-2022-Crypto-Assets-and-Climate-Report.pdf)
- [Ethereum Emissions: A Bottom-up Estimate](https://kylemcdonald.github.io/ethereum-emissions/) - _Kyle McDonald_
- [Ethereum Energy Consumption Index](https://digiconomist.net/ethereum-energy-consumption/) - _Digiconomist_
- [ETHMerge.com](https://ethmerge.com/) - _[@InsideTheSim](https://twitter.com/InsideTheSim)_
- [The Merge - Implications on the Electricity Consumption and Carbon Footprint of the Ethereum Network](https://carbon-ratings.com/eth-report-2022) - _CCRI_
- [イーサリアムのエネルギー消費量](https://mirror.xyz/jmcook.eth/ODpCLtO4Kq7SCVFbU4He8o8kXs418ZZDTj0lpYlZkR8)

## 関連トピック {#related-topics}

- [ビーコン・チェーン](/roadmap/beacon-chain)
- [マージ](/roadmap/merge/)