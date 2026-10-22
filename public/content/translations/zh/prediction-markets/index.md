---
title: "预测市场"
lang: zh
template: use-cases
image: /images/use-cases/prediction-markets.png
sidebarDepth: 2
summaryPoints:
  - "交易未来事件的结果"
  - "价格作为某事发生可能性的实时公开估计"
buttons:
  - content: 了解更多
    toId: how-prediction-markets-work
  - content: 探索应用
    toId: find-a-prediction-market
    isSecondary: false
---

预测市场让人们可以买卖未来事件结果的份额。份额的价格显示了整个市场认为该结果发生的可能性。它们在 2024 年美国大选期间引起了广泛关注。

## 预测市场如何运作 {#how-prediction-markets-work}

每个市场都会提出一个有明确答案的问题，例如“明天里斯本会下雨吗？”。如果答案是肯定的，**是 (Yes)** 份额将支付 1 美元，如果不是，则一无所获。**否 (No)** 份额的运作方式则相反。

如果“是”份额的交易价格为 67 美分，市场就表示大约有 67% 的下雨几率。任何认为实际几率不同的人都可以买入或卖出，这会推动价格变动。因为了解更多信息的人有理由进行交易，新信息往往会迅速反映在价格中。这就是为什么预测市场可以成为有用的预测工具。尽管它们并不完美。

每一份获胜份额的收益都由持有失败方份额的人支付。预测市场是**零和**的：除了手续费之外，赢家赚的钱就是输家亏的钱。

## 为什么这很重要？ {#why-does-this-matter}

基于区块链的预测市场增加了一些传统博彩网站和交易所不具备的特性：

<Grid>
  <Card title="公开数据" emoji="🔍" description="每笔交易都记录在链上，因此任何人都可以查看价格、交易量以及谁赢谁输。"/>
  <Card title="链上结算" emoji="🌎" description="头寸是你自己钱包中的代币，一旦报告了结果，智能合约就会支付获胜份额。" />
  <Card title="市场驱动的赔率" emoji="🤝" description="价格由买卖结果份额的交易者设定，而不是由中心化庄家预先设定。" />
</Grid>

公开数据在实践中很重要。研究人员能够[研究 Polymarket 上的每笔交易](https://cepr.org/publications/dp21615)（涵盖 2022 年 11 月至 2026 年 3 月期间超过 240 万用户），因为其交易在公共区块链上结算。这种独立的检查在 Kalshi 等中心化平台上是不可能的，因为在这些平台上，交易和支付都在公司自己的系统上进行。没有可供审计的公开记录，也没有智能合约保证获胜头寸得到支付。

以下是一个市场从头到尾的运作方式：

1. 围绕一个问题创建一个市场，并制定明确的决定规则。
2. 交易者买卖“是”和“否”份额，价格随之变动。
3. 一旦事件发生，[预言机](/developers/docs/oracles/)就会在链上报告结果。在 Polymarket 上，任何人都可以通过缴纳押金来提出结果，其他任何人都可以提出异议。如果争议未解决，UMA 代币的持有者将对结果进行投票。
4. 每份获胜份额可兑换 1 美元。失败的份额一文不值。
5. 任何人都可以使用价格历史和交易数据进行研究或讨论。

## 寻找预测市场 {#find-a-prediction-market}

这些预测市场在链上结算交易，因此任何人都可以查看价格和交易历史：

<PredictionMarketLists />

<Alert variant="warning">
<AlertEmoji text="💡"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>时刻注意风险</strong></p>
  <p className="mt-2">大多数在预测市场上交易的人都会亏钱。只交易你输得起的金额，并警惕潜在的成瘾行为。</p>
</AlertDescription>
</AlertContent>
</Alert>

## 挑战与风险 {#challenges-and-risks}

预测市场面临着影响公平性、合法性和准确性的现实挑战。

📉 **大多数交易者亏损** – 一项[对 Polymarket 每笔交易的研究](https://cepr.org/publications/dp21615)（2022 年 11 月至 2026 年 3 月）发现，约 69% 的用户最终亏损。在赚钱的用户中，前 1% 的人拿走了 76.5% 的利润。最大的赢家主要是通过限价单提供流动性的交易者，他们通常是专业的且交易量很大。

🕵️ **内幕交易** – 提前知道结果的人可以牺牲其他交易者的利益来获利。[哥伦比亚大学法学院和海法大学的研究人员](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6426778)估计，在 2024 年 2 月至 2026 年 2 月期间，涉嫌知情的交易者在 Polymarket 上赚取了约 1.43 亿美元。

⚖️ **有争议的结果** – 智能合约可以自动支付，但仍然需要有人报告发生了什么。当问题措辞不严谨或事实不清楚时，报告的结果可能会受到质疑。

⚠️ **市场操纵** – 拥有大量资金的交易者可以推动价格变动，尤其是在小市场中。洗盘交易（与自己交易）会使市场看起来比实际更活跃。

💧 **流动性问题** – 参与度低（[流动性不足](https://www.investopedia.com/terms/t/thinmarket.asp)）会使价格变得不太可靠。

🏛 **监管不确定性** – 各国规则不同且变化迅速。在美国，监管机构和法院仍在决定某些事件合约（尤其是体育赛事）是否算作金融产品或赌博。许多平台屏蔽了某些国家/地区的用户。

## 尝试预测市场 {#experimenting-with-prediction-markets}

预测市场的用途不仅限于为了盈利而交易。一种被称为“未来政治 (futarchy)”的理念更进一步，利用市场来帮助做出决策，而不仅仅是预测决策。

例如，一项 [Devcon 改进提案](https://forum.devcon.org/t/futarchy-decision-markets-for-deciding-next-devcon/5305) (DIP) 建议 Devcon 组织者使用预测市场来预测未来可能举办地点的出席人数。这可以帮助他们权衡哪个城市能吸引最大规模的活动，以及哪个城市在国际上最容易到达。它还可以节省比较签证政策、机场交通和生活成本的时间，同时显示潜在与会者有兴趣去哪里。

## 延伸阅读 {#further-reading}

[从预测市场到信息金融](https://vitalik.eth.limo/general/2024/11/09/infofinance.html) - 维塔利克·布特林  
[谁在预测市场中赢了，谁输了？来自 Polymarket 的证据](https://cepr.org/publications/dp21615) - Akey, Grégoire, Harvie, and Martineau  
[Augur 项目白皮书](https://github.com/AugurProject/whitepaper)
