---
title: 以太坊能耗
description: 了解以太坊能耗時的必要基本資訊。
lang: zh-tw
---

# 以太坊的能耗 {#proof-of-stake-energy}

以太坊是講求綠色環保的區塊鏈。 以太坊的[權益證明](/developers/docs/consensus-mechanisms/pos)共識機制，使用以太幣而非[能源來維持網路的安全性](/developers/docs/consensus-mechanisms/pow)。 以太坊全球網路的能耗約為[每年 0.0026 太瓦／時](https://carbon-ratings.com/eth-report-2022)。

以太坊能源消耗的估算方式，是由 [CCRI (Crypto Carbon Ratings Institute)](https://carbon-ratings.com) 的研究而來。 他們由下往上估算以太坊網路的電力消耗與碳足跡（[查看報告](https://carbon-ratings.com/eth-report-2022)）。 他們測量了不同節點的電力消耗，這些節點具有不同的硬體和用戶端軟體配置。 以太坊網路年度電力消耗之估計值為 **2,601（兆瓦/時）**（0.0026 太瓦/時）；套用區域特定碳強度因素後，等同一年碳排放為 **870 公噸二氧化碳當量**。 該值會隨著節點加入或離開網路而變化 - 你可使用[劍橋區塊鏈網路永續性指標](https://ccaf.io/cbnsi/ethereum)（注意：他們使用稍微不同的方法估計，詳情請見官網）提供的滾動式七天平均估計值持續追蹤。

要從實際的背景來考慮以太坊的能耗，我們可以比較某些其他產業的年度估計值。 這有助於我們更加了解以太坊的估計值是高還是低。

<EnergyConsumptionChart />

圖表展示了以太坊年度能耗估計值與其他幾個產業的比較（單位：太瓦時/年）。 此處提供的估計值來自 2023 年 5 月取用的公開資訊，下表亦提供來源連結：

|                           | 年度能耗（太瓦時） | 相較於權益證明以太坊 | 來源                                                                                                                                                                            |
| :------------------------ | :----------------: | :------------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 全球資料中心              |        200         |      77,000 倍       | [來源](https://www.iea.org/commentaries/data-centres-and-energy-from-global-headlines-to-local-headaches)                                                                       |
| 淘金                      |        131         |      50,000 倍       | [來源](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                                                                                 |
| 比特幣                    |        131         |       50,000x        | [來源](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                                                                                 |
| 工作量證明以太坊          |         78         |      30,000 倍       | [來源](https://digiconomist.net/ethereum-energy-consumption)                                                                                                                    |
| Youtube（僅考慮直接消耗） |         12         |       4600 倍        | [來源](https://www.gstatic.com/gumdrop/sustainability/google-2020-environmental-report.pdf)                                                                                     |
| 美國電競產業              |         34         |      13,000 倍       | [來源](https://www.researchgate.net/publication/336909520_Toward_Greener_Gaming_Estimating_National_Energy_Use_and_Energy_Efficiency_Potential)                                 |
| 網飛                      |       0.451        |        173 倍        | [來源](https://assets.ctfassets.net/4cd45et68cgf/7B2bKCqkXDfHLadrjrNWD8/e44583e5b288bdf61e8bf3d7f8562884/2021_US_EN_Netflix_EnvironmentalSocialGovernanceReport-2021_Final.pdf) |
| PayPal                    |        0.26        |        100 倍        | [來源](https://app.impaakt.com/analyses/paypal-consumed-264100-mwh-of-energy-in-2020-24-from-non-renewable-sources-27261)                                                       |
| AirBnB                    |        0.02        |         8 倍         | [來源](<https://s26.q4cdn.com/656283129/files/doc_downloads/governance_doc_updated/Airbnb-ESG-Factsheet-(Final).pdf>)                                                           |
| 權益證明以太坊            |       0.0026       |         1 倍         | [來源](https://carbon-ratings.com/eth-report-2022)                                                                                                                              |

要準確估計能耗是很複雜的，尤其是當測量對象具有複雜的供應鏈時，或具有會影響效率的部署細節時。 以網飛和 Youtube 為例。 其能源消耗估計值隨以下條件而變化：是否只包含用以維護系統及傳遞內容給使用者所消耗的能量（_直接支出_），還是包含產出內容、經營企業辦公室、廣告等等（_間接支出_）所需的能量消耗。 間接耗能也可包括終端使用者裝置使用內容所需的能源，例如電視、電腦及手機，其又取決於使用的裝置而定。

這個問題在 [Carbon Brief](https://www.carbonbrief.org/factcheck-what-is-the-carbon-footprint-of-streaming-video-on-netflix) 上有一些詳細的討論。 上表中，網飛報告值包含了他們自己報告的*直接*和*間接*耗能。 Youtube 只提供其*直接*耗能的估計值，約為 [12 太瓦時/年](https://www.gstatic.com/gumdrop/sustainability/google-2020-environmental-report.pdf)。

上面的表格與圖表，也包含了與比特幣及工作量證明以太坊的比較。 需注意的是，工作量證明的能耗並非固定，而是每天都會改變。 工作量證明以太坊所使用的數值，來自[合併](/roadmap/merge/)（升級為權益證明）的前夕，由 [Digiconomist](https://digiconomist.net/ethereum-energy-consumption) 所預測。 [劍橋區塊鏈網路永續指標](https://ccaf.io/cbnsi/ethereum/1)等其他來源，其估計的能耗更低得多（接近 20 太瓦/年）。 比特幣能耗量的估計值，在不同來源之間也有很大的差異，此主題引發了很多複雜的[辯論](https://www.coindesk.com/business/2020/05/19/the-last-word-on-bitcoins-energy-consumption/)，不僅是能源消耗量方面，還包括能源的來源和相關道德問題。 能源消耗不一定與環境足跡精準對應，因為不同專案可能使用不同的能源，例如較小或較大比例的再生能源。 舉例來說，[劍橋比特幣電力消耗指標](https://ccaf.io/cbnsi/cbeci/comparisons)指出，天然氣燃除原本會在運送或散佈時損耗的或電力，理論上可以作為比特幣網路需求的驅動來源。 以太坊的永續性路線，是以環保方案取代網路高耗能的部分。

你可以在[劍橋區塊鏈網路永續性指標的官網](https://ccaf.io/cbnsi/ethereum)，瀏覽許多產業的能耗與碳排放估計值。

## 每筆交易能耗估計值 {#per-transaction-estimates}

許多文章估算了區塊鏈「每筆交易」的能耗。 這可能會產生誤導，因為提出和驗證區塊所需的能量與其中的交易數量無關。 每筆交易每個單位的能耗，意味著交易越少，能耗越少，反之亦然，但事實並非如此。 此外，每筆交易的估計值，很大程度上取決於區塊鏈的交易吞吐量是如何定義的，並且可以透過調整這個定義來使估計值看起來更大或更小。

例如，在以太坊上，交易吞吐量不僅是基礎層的交易吞吐量，也是所有「[二層網路](/layer-2/)」卷軸之交易吞吐量的總和。 二層網絡通常不列入計算，但考慮排序者消耗的其他能量（少量）及其處理的交易量（大量），很可能會大幅降低每筆交易的估計值。 這就是比較跨平台每筆交易能耗的數據時，可能產生誤導的原因之一。

## 以太坊的碳債 {#carbon-debt}

目前以太坊的能耗非常低，但並非一直都是如此。 以太坊一開始使用工作量證明，其環境成本比現在的權益證明機制大了許多。

最一開始，以太坊就計劃要實現以權益證明為基礎的共識機制，但為了不犧牲安全性和去中心化，許多年專注投入研發工作。 因此，一開始網路採用了工作量證明機制。 工作量證明要求礦工使用運算硬體來計算數值，過程中會消耗能源。

![比較以太坊合併前後的能源消耗，以左方的艾菲爾鐵塔（高度 330 公尺）象徵合併前的高能耗，以及右方 4 公分高的樂高小玩偶，象徵合併後大幅降低的能源消耗](energy_consumption_pre_post_merge.png)

根據 CCRI 估算，合併使以太坊年度電力消耗降低了 **99.988%** 以上。 同樣，以太坊碳足跡減少了約 **99.992%**（從 11,016,000 噸減至 870 噸二氧化碳當量）。 正確來看，減少的碳排放就如同從艾菲爾鐵塔的高度下降到小塑膠玩偶的高度，如上圖所示。 因此，保護以太坊網路的環境成本大幅降低。 同時，網路的安全性相信也已得到改善。

## 綠色應用程式層 {#green-applications}

即使以太坊能耗極低，以太坊上仍有穩定成長及高度活躍的[**再生金融 (ReFi)**](/refi/) 廣大社群。 再生金融應用程式使用去中心化金融組件，來建構具有積極外部影響、進而使環境受益的金融應用程式。 再生金融是[「solarpunk」](https://en.wikipedia.org/wiki/Solarpunk)這項廣大運動的一部分，該運動與以太坊緊密結合，目標是將技術進步與環境管理結合。 以太坊去中心化、無需許可，且具有可組合性，這些特性使其成為再生金融和 solarpunk 社群理想的基礎層。

[Gitcoin](https://gitcoin.co) 等 Web 3 原生公共財募資平台，舉辦氣候募資輪，以促進以太坊應用程式層開展具環保意識的構建。 透過開發這些倡議（以及[去中心化科研](/desci/)等等），以太坊正成為一項對環境及社會具有淨正效益的科技。

<InfoBanner emoji=":evergreen_tree:">
  如果你認為此頁內容能更加準確，請提出議題或提取請求 (PR)。 呈現在此頁面上的統計數據皆是基於公開數據的估計值 - 它們不代表 ethereum.org 團隊或以太坊基金會的官方聲明或承諾。
</InfoBanner>

## 了解更多 {#further-reading}

- [劍橋區塊鏈網路永續性指標](https://ccaf.io/cbnsi/ethereum)
- [美國白宮對工作量證明區塊鏈所作的調查報告](https://www.whitehouse.gov/wp-content/uploads/2022/09/09-2022-Crypto-Assets-and-Climate-Report.pdf)
- [以太坊排放量：由下而上估算](https://kylemcdonald.github.io/ethereum-emissions/) - _Kyle McDonald_
- [以太坊的能耗指標](https://digiconomist.net/ethereum-energy-consumption/) – _Digiconomist_
- [ETHMerge.com](https://ethmerge.com/) - _[@InsideTheSim](https://twitter.com/InsideTheSim)_
- [合併 - 對以太坊網路電力消耗及碳足跡之影響](https://carbon-ratings.com/eth-report-2022) - _CCRI_
- [以太坊的能耗](https://mirror.xyz/jmcook.eth/ODpCLtO4Kq7SCVFbU4He8o8kXs418ZZDTj0lpYlZkR8)

## 相關主題 {#related-topics}

- [以太坊的展望](/roadmap/vision/)
- [信標鏈（Beacon Chain）](/roadmap/beacon-chain)
- [合併](/roadmap/merge/)
