---
title: "預測市場"
lang: zh-tw
template: use-cases
image: /images/use-cases/prediction-markets.png
sidebarDepth: 2
summaryPoints:
  - "針對未來事件的結果進行交易"
  - "價格可作為某件事發生機率的即時、公開估計"
buttons:
  - content: 了解更多
    toId: how-prediction-markets-work
  - content: 探索應用程式
    toId: find-a-prediction-market
    isSecondary: false
---

預測市場讓人們可以買賣未來事件結果的份額。份額的價格顯示了整個市場認為該結果發生的可能性。它們在 2024 年美國大選期間引起了廣泛關注。

## 預測市場如何運作 {#how-prediction-markets-work}

每個市場都會提出一個有明確答案的問題，例如「明天里斯本會下雨嗎？」。如果答案是肯定的，**是 (Yes)** 的份額將支付 1 美元，如果不是則不支付任何費用。**否 (No)** 的份額則相反。

如果「是」的份額以 67 美分交易，市場就表示大約有 67% 的降雨機率。任何認為實際機率不同的人都可以買入或賣出，這會推動價格變動。因為了解更多資訊的人有理由進行交易，新資訊往往會迅速反映在價格上。這就是為什麼預測市場可以成為有用的預測工具。但它們並不完美。

每一份獲勝的份額都是由持有失敗方的人支付的。預測市場是**零和遊戲**：除了手續費之外，贏家賺的錢就是輸家賠的錢。

## 為什麼這很重要？ {#why-does-this-matter}

基於區塊鏈的預測市場增加了一些傳統博彩網站和交易所沒有的功能：

<Grid>
  <Card title="開放數據" emoji="🔍" description="每筆交易都記錄在鏈上，因此任何人都可以查看價格、交易量以及誰贏誰輸。"/>
  <Card title="鏈上結算" emoji="🌎" description="倉位是你自己錢包中的代幣，一旦報告結果，智能合約就會支付獲勝的份額。" />
  <Card title="市場驅動的賠率" emoji="🤝" description="價格由買賣結果份額的交易者決定，而不是由中心化莊家預先設定。" />
</Grid>

開放數據在實務上很重要。研究人員能夠[研究 Polymarket 上的每筆交易](https://cepr.org/publications/dp21615)，涵蓋 2022 年 11 月至 2026 年 3 月期間超過 240 萬名用戶，因為其交易是在公共區塊鏈上結算的。這種獨立檢查在 Kalshi 等中心化平台上是不可能的，因為交易和支付都發生在公司自己的系統上。沒有可供審計的公開記錄，也沒有保證獲勝倉位能獲得支付的智能合約。

以下是市場從頭到尾的運作方式：

1. 圍繞一個問題創建一個市場，並制定明確的決定規則。
2. 交易者買賣「是」和「否」的份額，價格隨之變動。
3. 一旦事件發生，[預言機](/developers/docs/oracles/)就會在鏈上報告結果。在 Polymarket 上，任何人都可以透過繳納押金來提出結果，其他人也可以對此提出異議。如果爭議未解決，UMA 代幣的持有者將對結果進行投票。
4. 每個獲勝的份額可以兌換 1 美元。失敗的份額則一文不值。
5. 任何人都可以使用價格歷史和交易數據進行研究或討論。

## 尋找預測市場 {#find-a-prediction-market}

這些預測市場在鏈上結算交易，因此任何人都可以查看價格和交易歷史：

<PredictionMarketLists />

<Alert variant="warning">
<AlertEmoji text="💡"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>留意風險</strong></p>
  <p className="mt-2">大多數在預測市場上交易的人都會虧錢。只用你能承受損失的資金進行交易，並注意潛在的成癮行為。</p>
</AlertDescription>
</AlertContent>
</Alert>

## 挑戰與風險 {#challenges-and-risks}

預測市場面臨著影響公平性、合法性和準確性的實際挑戰。

📉 **大多數交易者虧損** – 一項針對 2022 年 11 月至 2026 年 3 月期間[每筆 Polymarket 交易的研究](https://cepr.org/publications/dp21615)發現，約 69% 的用戶最終虧損。在賺錢的用戶中，前 1% 的人拿走了 76.5% 的利潤。最大的贏家主要是透過限價單提供流動性的交易者，他們通常是專業且交易量龐大的。

🕵️ **內線交易** – 提前知道結果的人可以犧牲其他交易者的利益來獲利。[哥倫比亞法學院和海法大學的研究人員](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6426778)估計，在 2024 年 2 月至 2026 年 2 月期間，涉嫌知情的交易者在 Polymarket 上賺取了約 1.43 億美元。

⚖️ **有爭議的結果** – 智能合約可以自動支付，但仍然需要有人報告發生了什麼事。當問題措辭不嚴謹或事實不清楚時，報告的結果可能會受到質疑。

⚠️ **市場操縱** – 擁有大量資金的交易者可以推動價格，尤其是在小型市場中。洗售交易（與自己交易）會讓市場看起來比實際更活躍。

💧 **流動性問題** – 參與度低（[流動性不足](https://www.investopedia.com/terms/t/thinmarket.asp)）會使價格變得較不可靠。

🏛 **監管不確定性** – 規則因國家/地區而異，且變化迅速。在美國，監管機構和法院仍在決定某些事件合約（尤其是體育賽事）是否算作金融產品或賭博。許多平台會封鎖某些國家/地區的用戶。

## 嘗試預測市場 {#experimenting-with-prediction-markets}

預測市場的用途不僅限於為了獲利而交易。一種被稱為「未來政治 (futarchy)」的理念更進一步，利用市場來幫助做出決策，而不僅僅是預測決策。

例如，一項 [Devcon 改進提案](https://forum.devcon.org/t/futarchy-decision-markets-for-deciding-next-devcon/5305) (DIP) 建議 Devcon 組織者使用預測市場來預測未來可能舉辦地點的出席人數。這可以幫助他們權衡哪個城市能吸引最大規模的活動，以及哪個城市在國際上最容易抵達。這還可以節省比較簽證政策、機場交通和生活成本所花費的時間，同時顯示潛在與會者會很興奮想去哪裡。

## 進一步閱讀 {#further-reading}

[從預測市場到資訊金融](https://vitalik.eth.limo/general/2024/11/09/infofinance.html) - 維塔利克·布特林  
[誰在預測市場中贏了，誰輸了？來自 Polymarket 的證據](https://cepr.org/publications/dp21615) - Akey, Grégoire, Harvie, and Martineau  
[Augur 專案白皮書](https://github.com/AugurProject/whitepaper)
