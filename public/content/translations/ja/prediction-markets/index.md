---
title: 予測市場
lang: ja
template: use-cases
image: /images/use-cases/prediction-markets.png
sidebarDepth: 2
summaryPoints:
  - "正確な予測を生成することで金銭的なインセンティブを受け取る"
  - "将来のイベントに関する高品質な予測"
buttons: 
  - content: 詳細を見る
    toId: how-prediction-markets-work
  - content: アプリを探す
    toId: find-a-prediction-market
    isSecondary: false
---

予測市場は、群衆の知恵と金銭的インセンティブを利用してイベントを予測します。多様で高品質なデータを提供し、2024年の米国選挙の際に注目を集めました。

## 予測市場の仕組み {#how-prediction-markets-work}

専門家の意見、限られた調査サンプル、または過去のデータに依存する従来の予測手法とは異なり、予測市場は**リアルタイムの金銭的インセンティブ**と**群衆の知恵**を活用して、選挙、暗号資産の価格、スポーツの結果など、あらゆる特定のイベントに関する洞察を生成します。

これにより、誰でも金銭的なコミットメントを伴って特定の結果に対する支持を示すことができます。
 
現実世界のイベントへの賭けを可能にし、新しい情報が発生するにつれて価格を調整することで、情報に基づいた意見が高く評価され、正確性に報酬が与えられます。

理論的には、賭け手は正解することで利益を得られるため、予測市場は非常に高い精度で結果を予測できます。ブロックチェーンベースの予測市場はさらにエキサイティングで、事実上誰でも予測に参加し、ステーブルコインや暗号資産の報酬を得ることができます。

## なぜこれが重要なのか？ {#why-does-this-matter}

従来の予測とは異なり、ブロックチェーンベースの予測市場には以下の特徴があります。

<Grid>
  <Card title="Incentivized" emoji=":money_with_wings:" description="参加者が実際の資金をステークすることで、質の高い予測が導き出されます。"/>
  <Card title="Decentralization" emoji="🌎" description="ブロックチェーンとスマートコントラクトを利用することで、透明性の高い自動化された支払いが保証されます。" />
  <Card title="市場主導のオッズ" emoji="🤝" description="価格は中央集権的なブックメーカーによって事前に設定されるのではなく、結果のシェアを売買するトレーダーによって決定されます。" />
</Grid>

市場の観察者であっても、他では得られない貴重なデータを評価することができます。次のように考えてみてください。

1. 予測は特定のイベントに結びついています（例：Beam Chainは2030年までにデプロイされるか？）。
2. 市場参加者は、結果に対する自信に基づいてシェアを売買します。
3. より多くの参加者が自らの信念にステークするにつれて価格が調整され、リアルタイムの洞察が反映されます。
4. 正しく賭けた人は、ステークした金額に比例して報酬を得ます。 
5. 市場の観察者は、オープンデータを活用して調査や議論に役立てることができます。

## 予測市場を探す {#find-a-prediction-market}

イーサリアムベースの予測市場はいくつか存在します。以下は、現在最もよく知られている予測市場の一部です。

<PredictionMarketLists />

<Alert variant="warning">
<AlertEmoji text="💡"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>リスクに注意する</strong></strong>
  <p className="mt-2">失っても問題ない範囲の金額でのみ賭けを行い、依存症になる可能性に注意してください。</p>
</AlertDescription>
</AlertContent>
</Alert>

## 課題とリスク {#challenges-and-risks}

ブロックチェーン上の予測市場は、公平性、合法性、正確性に影響を与える可能性のあるいくつかの課題に直面しています。

⚠️ **市場操作** – 裕福な参加者がウォッシュトレードを通じて結果を歪める可能性があります。  
💧 **流動性の問題** – 参加者が少ない（[流動性が低い](https://www.investopedia.com/terms/t/thinmarket.asp)）と、市場の信頼性が低下する可能性があります。  
🏛 **規制の不確実性** – 政府が一部のプラットフォームに制限を課している場合があります。

これらの問題を軽減するため、イーサリアムの開発者はフューターキー（予測市場によるガバナンス）や分散型アイデンティティ (DID) の検証などの解決策を実験しています。

## 予測市場での実験 {#experimenting-with-prediction-markets}

予測市場は、デジタル時代における意思決定のあり方を再構築しています。イーサリアムを活用することで、**公平でオープン、かつ報酬の得られる未来予測の方法**を提供します。

金銭的な利益以外にも、予測ツールを使用する方法は数多くあります。例えば、[DevCon改善提案](https://forum.devcon.org/t/futarchy-decision-markets-for-deciding-next-devcon/5305)（DIP）では、DevConの主催者が将来のイベントの参加者数を予測するために予測市場を使用することが提案されました。

これにより、主催者はどの場所が最大のイベントにつながるか、あるいはどの場所が国際的に最もアクセスしやすいかを判断するのに役立ちます。この利点として、DevConの主催者は、複数のビザポリシー、空港へのアクセス、その地域の生活費を審査するのに必要な時間を短縮できると同時に、参加予定者がどこに行きたいかに関するデータを収集することができます。

## 参考文献 {#further-reading}

[予測市場から情報ファイナンスへ](https://vitalik.eth.limo/general/2024/11/09/infofinance.html) - ヴィタリック・ブテリン  
[イーサリアム上での分散型予測市場の開発](https://blockchain.oodles.io/dev-blog/decentralized-prediction-market-development-ethereum/)  
[Augurプロジェクトのホワイトペーパー](https://github.com/AugurProject/whitepaper)