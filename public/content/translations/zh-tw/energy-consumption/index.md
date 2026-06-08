---
title: 以太坊的能源消耗
metaTitle: 以太坊能源消耗
description: 了解以太坊能源消耗所需的基本資訊。
lang: zh-tw
---

[以太坊](/)是一個環保的區塊鏈。以太坊的[權益證明 (PoS)](/developers/docs/consensus-mechanisms/pos)共識機制使用 ETH 而不是[能源來保護網路安全](/developers/docs/consensus-mechanisms/pow)。以太坊在全球網路的能源消耗約為 [~0.0026 TWh/yr](https://carbon-ratings.com/eth-report-2022)。

以太坊的能源消耗估算來自 [CCRI（加密貨幣碳評級機構）](https://carbon-ratings.com)的一項研究。他們由下而上估算了以太坊網路的電力消耗和碳足跡（[查看報告](https://carbon-ratings.com/eth-report-2022)）。他們測量了具有各種硬體和客戶端軟體配置的不同節點的電力消耗。應用特定地區的碳強度係數，該網路預估的年度電力消耗 **2,601 MWh**（0.0026 TWh）相當於每年 **870 噸二氧化碳當量 (CO2e)** 的碳排放量。這個數值會隨著節點加入和離開網路而改變——你可以使用[劍橋區塊鏈網路永續性指數](https://ccaf.io/cbnsi/ethereum)的 7 天滾動平均估算值來追蹤（請注意，他們使用的估算方法略有不同——詳情請見其網站）。

為了將以太坊的能源消耗具體化，我們可以比較其他一些產品和產業的年化估算值。這有助於我們更了解以太坊的估算值是高還是低。

<EnergyConsumptionChart />

上圖顯示了以太坊與其他幾種產品和產業相比的預估能源消耗（單位：TWh/yr）。提供的估算值來自 2023 年 7 月取得的公開資訊，來源連結請見下表。

|                     | 年化能源消耗 (TWh) | 與 PoS 以太坊的比較 |                                                                                      來源                                                                                       |
| :------------------ | :---------------------------------: | :------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| 全球資料中心 |                 190                 |          73,000x           |                                    [來源](https://www.iea.org/commentaries/data-centres-and-energy-from-global-headlines-to-local-headaches)                                    |
| 比特幣             |                 149                 |          53,000x           |                                                                 [來源](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                 |
| 黃金開採         |                 131                 |          50,000x           |                                                                 [來源](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                 |
| 美國遊戲產業\*     |                 34                  |          13,000x           |                 [來源](https://www.researchgate.net/publication/336909520_Toward_Greener_Gaming_Estimating_National_Energy_Use_and_Energy_Efficiency_Potential)                 |
| PoW 以太坊        |                 21                  |           8,100x           |                                                                    [來源](https://ccaf.io/cbnsi/ethereum/1)                                                                     |
| Google              |                 19                  |           7,300x           |                                           [來源](https://www.gstatic.com/gumdrop/sustainability/google-2022-environmental-report.pdf)                                           |
| 網飛             |                0.457                |            176x            | [來源](https://assets.ctfassets.net/4cd45et68cgf/7B2bKCqkXDfHLadrjrNWD8/e44583e5b288bdf61e8bf3d7f8562884/2021_US_EN_Netflix_EnvironmentalSocialGovernanceReport-2021_Final.pdf) |
| PayPal              |                0.26                 |            100x            |                                 [來源](<https://s202.q4cdn.com/805890769/files/doc_downloads/global-impact/CDP_Climate_Change_PayPal-(1).pdf>)                                  |
| AirBnB              |                0.02                 |             8x             |                              [來源](<https://s26.q4cdn.com/656283129/files/doc_downloads/governance_doc_updated/Airbnb-ESG-Factsheet-(Final).pdf>)                              |
| **PoS 以太坊**    |             **0.0026**              |           **1x**           |                                                               [來源](https://carbon-ratings.com/eth-report-2022)                                                                |

\*包含個人電腦、筆記型電腦和遊戲機等終端使用者裝置。

要獲得準確的能源消耗估算值很複雜，特別是當被測量對象具有複雜的供應鏈或影響其效率的部署細節時。例如，網飛和 Google 的能源消耗估算值會有所不同，取決於它們是否僅包含用於維護其系統和向使用者傳遞內容的能源（*直接消耗*），或者是否包含製作內容、營運企業辦公室、廣告等所需的消耗（*間接消耗*）。間接消耗也可能包含在電視、電腦和手機等終端使用者裝置上消費內容所需的能源。

上述估算值並非完美的比較。計入的間接消耗量因來源而異，且很少包含來自終端使用者裝置的能源。每個基礎來源都包含有關測量內容的更多細節。

上方的表格和圖表也包含了與比特幣和工作量證明 (PoW) 以太坊的比較。需要注意的是，工作量證明網路的能源消耗並非靜態的，而是每天都在變化。不同來源的估算值也可能差異很大。這個主題引發了細微的[爭論](https://www.coindesk.com/business/2020/05/19/the-last-word-on-bitcoins-energy-consumption/)，不僅涉及消耗的能源量，還涉及這些能源的來源和相關的道德問題。能源消耗不一定能精確對應到環境足跡，因為不同的專案可能使用不同的能源，包含比例不等的再生能源。例如，[劍橋比特幣電力消耗指數](https://ccaf.io/cbnsi/cbeci/comparisons)指出，比特幣網路的需求理論上可以由天然氣燃燒或原本會在輸配電過程中流失的電力來提供。以太坊邁向永續發展的途徑是將網路中耗能的部分替換為環保的替代方案。

你可以在[劍橋區塊鏈網路永續性指數網站](https://ccaf.io/cbnsi/ethereum)上瀏覽許多產業的能源消耗和碳排放估算值。

## 單筆交易估算 {#per-transaction-estimates}

許多文章估算了區塊鏈的「單筆交易」能源消耗。這可能會產生誤導，因為提議和驗證一個區塊所需的能源與其中的交易數量無關。單筆交易的能源消耗單位意味著較少的交易會導致較小的能源消耗，反之亦然，但事實並非如此。此外，單筆交易的估算值對區塊鏈交易吞吐量的定義非常敏感，調整這個定義可能會被用來操縱數值，使其看起來更大或更小。

例如，在以太坊上，交易吞吐量不僅是基礎層的吞吐量，也是其所有「[第二層 (L2)](/layer-2/)」匯總 (rollup) 交易吞吐量的總和。第二層 (L2) 通常不包含在計算中，但如果將定序器消耗的額外能源（很少）和它們處理的交易數量（很多）考慮進去，可能會大幅降低單筆交易的估算值。這就是為什麼跨平台比較單筆交易能源消耗可能會產生誤導的原因之一。

## 以太坊的碳債 {#carbon-debt}

以太坊的能源消耗非常低，但情況並非總是如此。以太坊最初使用工作量證明 (PoW)，其環境成本遠高於目前的權益證明 (PoS) 機制。

從一開始，以太坊就計畫實施基於權益證明的共識機制，但在不犧牲安全性和去中心化的情況下做到這一點，花費了多年的專注研發。因此，最初使用了工作量證明機制來啟動網路。工作量證明要求礦工使用他們的運算硬體來計算一個數值，在此過程中會消耗能源。

![Comparing Ethereum's energy consumption pre- and post-Merge, using the Eiffel Tower (330 meters tall) on the left to symbolize the high energy consumption before The Merge, and a small 4 cm tall Lego figure on the right to represent the dramatic reduction in energy usage after The Merge](energy_consumption_pre_post_merge.png)

CCRI 估計，合併 (The Merge) 使以太坊的年化電力消耗減少了 **99.988%** 以上。同樣地，以太坊的碳足跡減少了約 **99.992%**（從 11,016,000 噸降至 870 噸二氧化碳當量）。客觀來看，如上圖所示，排放量的減少就像是從艾菲爾鐵塔的高度縮小到一個小塑膠玩具人偶。因此，保護網路安全的環境成本大幅降低。同時，網路的安全性也被認為有所提升。

## 環保的應用層 {#green-applications}

雖然以太坊的能源消耗非常低，但在以太坊上也有一個龐大、不斷成長且高度活躍的[**再生金融 (ReFi)**](/refi/)社群正在進行建設。ReFi 應用程式使用去中心化金融 (DeFi) 元件來建立對環境有正面外部效益的金融應用程式。ReFi 是更廣泛的「[太陽龐克 (solarpunk)](https://en.wikipedia.org/wiki/Solarpunk)」運動的一部分，該運動與以太坊密切相關，旨在將技術進步與環境管理結合。以太坊去中心化的、無需許可且可組合的特性，使其成為 ReFi 和太陽龐克社群理想的基礎層。

Web3 原生的公共財資助平台（如 [Gitcoin](https://gitcoin.co)）舉辦氣候輪次融資，以刺激在以太坊應用層上進行具備環保意識的建設。透過這些倡議（以及其他倡議，例如[去中心化科學 (DeSci)](/desci/)）的發展，以太坊正成為一項對環境和社會具有淨正面影響的技術。

<Alert variant="update">
<AlertEmoji text=":evergreen_tree:" />
<AlertContent>
<AlertDescription>
  如果你認為這個頁面可以更準確，請提出 issue 或 PR。本頁面上的統計數據是基於公開資料的估算值——它們不代表 ethereum.org 團隊或以太坊基金會的官方聲明或承諾。
</AlertDescription>
</AlertContent>
</Alert>

## 延伸閱讀 {#further-reading}

- [劍橋區塊鏈網路永續性指數](https://ccaf.io/cbnsi/ethereum)
- [白宮關於工作量證明區塊鏈的報告](https://web.archive.org/web/20221109005700/https://www.whitehouse.gov/wp-content/uploads/2022/09/09-2022-Crypto-Assets-and-Climate-Report.pdf)
- [以太坊排放量：由下而上的估算](https://kylemcdonald.github.io/ethereum-emissions/) - _Kyle McDonald_
- [以太坊能源消耗指數](https://digiconomist.net/ethereum-energy-consumption/) - _Digiconomist_
- [ETHMerge.com](https://ethmerge.com/) - _[@InsideTheSim](https://twitter.com/InsideTheSim)_
- [合併——對以太坊網路電力消耗和碳足跡的影響](https://carbon-ratings.com/eth-report-2022) - _CCRI_
- [以太坊的能源消耗](https://mirror.xyz/jmcook.eth/ODpCLtO4Kq7SCVFbU4He8o8kXs418ZZDTj0lpYlZkR8)

## 相關主題 {#related-topics}

- [信標鏈](/roadmap/beacon-chain)
- [合併](/roadmap/merge/)