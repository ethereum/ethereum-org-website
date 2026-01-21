---
title: 予測市場
lang: ja
template: use-cases
image: /images/use-cases/prediction-markets.png
sidebarDepth: 2
summaryPoint1: 金融的インセンティブを受け取って正確な予測を実行 
summaryPoint2: 将来のイベントに関する高品質の予測
buttons:
  - content: もっと詳しく
    toId: how-prediction-markets-work
  - content: アプリを検索
    toId: find-a-prediction-market
    isSecondary: false
---

予測市場では、集合知と金銭的なインセンティブを用いてイベントを予測します。 同市場は、2024年の米国大統領選挙の期間中、多彩かつ高品質なデータの提供により大きな支持を集めました 。

## 予測市場の仕組み {#how-prediction-markets-work}

専門家の意見、限られた調査サンプル、過去のデータに依存する従来の予測方法とは異なり、予測市場では「リアルタイムの金銭的なインセンティブ」と「集合知」の活用により、選挙、暗号資産価格、スポーツの試合結果などに関する洞察を提供します。

これにより、誰もが特定の結果に対して金銭的なコミットメントを伴う支持を表明できるようになります。
新たな情報の登場に伴い、現実世界のイベントへのベッティング（賭け）や価格調整が可能となることにより、情報に基づく意見の価値が高まるほか、正確性が評価されるようになります。

理論的には、賭け手は正確であることにより利益を得られるため、予測市場における結果の精度が高いものとなります。 ブロックチェーンベースの予測市場は、誰もがコンピューター上で予測に参加し、ステーブルコインまたは暗号通貨による報酬を獲得できる環境であるため、従来の予測市場よりも魅力的であると言えます。

## 予測市場の重要性 {#why-does-this-matter}

従来の予測市場とは異なり、ブロックチェーンベースの予測市場には以下の特徴があります。

<CardGrid>
  <Card title="Incentivized" emoji=":money_with_wings:" description="Participants stake real funds, which infers high-quality predictions."/>
  <Card title="Decentralization" emoji="🌎" description="Using blockchain and smart contracts ensures transparent and automated payouts." />
  <Card title="Market driven odds" emoji="🤝" description="Prices are set by traders buying and selling outcome shares, rather than preset by a centralized bookmaker." />
</CardGrid>

同市場の観察者に該当する場合でも、通常は入手できない貴重なデータを活用することができます。 具体的な内容は、次の通りです。

1. 予測は、特定のイベントに紐付きます（例：Beam Chainは2030年までにデプロイされるか否か）。
2. 市場の参加者は、結果に対する自信に基づき、それぞれの持ち分を売買します。
3. より多くの参加者が自身の予測に対してステーキングすることで、価格が調整され、予測市場にリアルタイムの洞察が反映されます。
4. 正しい予測を行った参加者は、ステーキングした額に応じて報酬を獲得できます。
5. 市場の参加者は、公開データを活用して研究や議論の質を高めることができます。

## 予測市場を見つける {#find-a-prediction-market}

利用できるイーサリアムベースの予測市場は、いくつかあります。 現在最もよく知られている予測市場を、以下に挙げます。

<PredictionMarketLists />

<Alert variant="warning">
<AlertEmoji text="💡"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>リスクにご注意ください</strong></p>
  <p className="mt-2">ご自身の許容範囲でのみベッティング（賭け）を行うようにし、潜在的な依存行動にご注意ください。</p>
</AlertDescription>
</AlertContent>
</Alert>

## 問題とリスク {#challenges-and-risks}

ブロックチェーンにおける予測市場は、公平性、適法性、正確性に影響を与え得るいくつかの課題に直面しています。

⚠️「市場操作」– 資金力のある市場参加者がウォッシュトレードを行い、結果を歪める可能性があります。  
💧「流動性の問題」– 参加者が少なくなると ([thin liquidity](https://www.investopedia.com/terms/t/thinmarket.asp))、市場の信頼性が低下する場合があります。  
🏛「規制の不確実性」– 一部のプラットフォームに対し、政府による制限が課されています。

イーサリアムの開発者は、こうした問題に対処するために、フタルキー（予測市場によるガバナンス）や分散型ID認証などの解決策を試行しています。

## 予測市場に関する実験 {#experimenting-with-prediction-markets}

予測市場により、デジタル時代における意思決定の在り方が徐々に変わっています。 イーサリアムの活用により、公平でオープンかつインセンティブ型の未来予測方法が実現します。

予測ツールには、金銭的な利益以外にもさまざまな用途があります。 例えば、[DevCon Improvement Proposal](https://forum.devcon.org/t/futarchy-decision-markets-for-deciding-next-devcon/5305) (DIP) では、将来開催予定のイベントにおける参加者数の予測を目的に、予測市場の活用が提案されました。

こうしたイベントの主催者は予測市場の活用により、最大規模のイベントにつながる開催地や、国際的にアクセスしやすい開催地について判断できるようになります。 これらのメリットにより、Devconの主催者は、ビザに関する複数の要件、空港へのアクセス、現地の生活コストなどの確認に求められる時間を短縮できるほか、参加予定者が魅力を感じる訪問先に関するデータの収集が可能となります。

## 参考リンク{#further-reading}

[From prediction markets to info finance：予測市場から情報金融へ](https://vitalik.eth.limo/general/2024/11/09/infofinance.html) - Vitalik Buterin  [Decentralized Prediction Market Development on Ethereum：イーサリアムにおける分散型予測市場の開発](https://blockchain.oodles.io/dev-blog/decentralized-prediction-market-development-ethereum/)  [The Augur Project Whitepaper：Augurプロジェクトホワイトペーパー](https://github.com/AugurProject/whitepaper)