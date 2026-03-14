---
title: "以太坊能耗"
description: "了解以太坊能耗時的必要基本資訊。"
lang: zh-tw
---

# 以太坊的能源消耗 {#proof-of-stake-energy}

以太坊是講求綠色環保的區塊鏈。 以太坊的 [權益證明](/developers/docs/consensus-mechanisms/pos) 共識機制使用 ETH，而非 [能源來保護網路安全](/developers/docs/consensus-mechanisms/pow)。 以太坊整個全球網路的能源消耗約為 [~0.0026 TWh/yr](https://carbon-ratings.com/eth-report-2022)。

以太坊的能源消耗估計來自 [CCRI (Crypto Carbon Ratings Institute)](https://carbon-ratings.com) 的一項研究。 他們由下而上估算了以太坊網路的電力消耗和碳足跡 ([參閱報告](https://carbon-ratings.com/eth-report-2022))。 他們測量了不同節點的電力消耗，這些節點具有不同的硬體和用戶端軟體配置。 網路的年度電力消耗估計為 **2,601 MWh** (0.0026 TWh)，套用特定區域的碳強度因素後，相當於年度碳排放量 **870 公噸 CO2e**。 這個值會隨著節點加入和離開網路而改變——你可以使用 [劍橋區塊鏈網路永續性指標](https://ccaf.io/cbnsi/ethereum) 的 7 天滾動平均估計值來追蹤 (請注意，他們使用稍微不同的方法進行估計——詳細資訊可在其網站上找到)。

要深入瞭解以太坊的能耗，我們可以將其與一些其他產品與產業的年度估計值進行比較。 這有助於我們更加了解以太坊的估計值是高還是低。

<EnergyConsumptionChart />

上圖比較了以太坊與其他幾種產品和產業的估計能源消耗（單位為太瓦時/年）。 此處提供的估計值來自 2023 年 7 月取用的公開資訊，下表亦提供來源連結。

|             |          年度能耗（太瓦時）         | 相較於權益證明以太坊 |                                                                                       來源                                                                                      |
| :---------- | :------------------------: | :--------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| 全球資料中心      |             190            |  73,000 倍  |                                    [來源](https://www.iea.org/commentaries/data-centres-and-energy-from-global-headlines-to-local-headaches)                                    |
| 比特幣         |             149            |  53,000 倍  |                                                                 [來源](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                 |
| 開採金礦        |             131            |  50,000 倍  |                                                                 [來源](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                 |
| 美國電競產業\*    |             34             |  13,000 倍  |                 [來源](https://www.researchgate.net/publication/336909520_Toward_Greener_Gaming_Estimating_National_Energy_Use_and_Energy_Efficiency_Potential)                 |
| 工作量證明以太坊    |             21             |   8,100 倍  |                                                                     [來源](https://ccaf.io/cbnsi/ethereum/1)                                                                    |
| Google      |             19             |   7,300 倍  |                                           [來源](https://www.gstatic.com/gumdrop/sustainability/google-2022-environmental-report.pdf)                                           |
| Netflix      |    0.457   |    176 倍   | [來源](https://assets.ctfassets.net/4cd45et68cgf/7B2bKCqkXDfHLadrjrNWD8/e44583e5b288bdf61e8bf3d7f8562884/2021_US_EN_Netflix_EnvironmentalSocialGovernanceReport-2021_Final.pdf) |
| PayPal      |    0.26    |    100 倍   |                                  [來源](https://s202.q4cdn.com/805890769/files/doc_downloads/global-impact/CDP_Climate_Change_PayPal-\(1\).pdf)                                 |
| AirBnB      |    0.02    |     8 倍    |                              [來源](https://s26.q4cdn.com/656283129/files/doc_downloads/governance_doc_updated/Airbnb-ESG-Factsheet-\(Final\).pdf)                              |
| **權益證明以太坊** | **0.0026** |   **1x**   |                                                                [來源](https://carbon-ratings.com/eth-report-2022)                                                               |

\*包含終端使用者裝置，如：個人電腦、筆電及遊戲機。

要準確估計能耗是很複雜的，尤其是當測量對象具有複雜的供應鏈時，或具有會影響效率的部署細節時。 例如，Netflix 和 Google 的能源消耗估計值會有所不同，取決於其計算是否只包含維護系統和向使用者提供內容所用的能源（_直接開銷_），還是也包含製作內容、營運公司辦公室、廣告等所需的開銷（_間接開銷_）。 間接能耗也包括電視、電腦及手機等終端使用者裝置使用內容所消耗的能源。

上述能耗估計值的比較並非完美。 間接能耗的總量因來源而異，且往往未包含終端使用者裝置使用的能源。 每個潛在來源都包含了關於測量對象的更多資訊。

上面的表格與圖表，也包含了與比特幣及工作量證明以太坊的比較。 需注意的是，工作量證明網路的能耗不是固定的，而是每天都會改變。 不同來源的能耗估計值也各有差異。 這個主題引發了細緻的[辯論](https://www.coindesk.com/business/2020/05/19/the-last-word-on-bitcoins-energy-consumption/)，不僅關於能源消耗量，也關於能源的來源及相關的倫理問題。 能源消耗不一定與環境足跡精準對應，因為不同專案可能使用不同的能源，例如較小或較大比例的再生能源。 例如，[劍橋比特幣電力消耗指數](https://ccaf.io/cbnsi/cbeci/comparisons) 指出，比特幣網路的需求理論上可以由天然氣燃燒或在傳輸和配送過程中本會損失的電力來供電。 以太坊的永續性路線，是以環保方案取代網路高耗能的部分。

你可以在 [劍橋區塊鏈網路永續性指標網站](https://ccaf.io/cbnsi/ethereum) 上，瀏覽許多產業的能源消耗和碳排放估計值。

## 每筆交易的估計值 {#per-transaction-estimates}

許多文章估算了區塊鏈「每筆交易」的能耗。 這可能會產生誤導，因為提出和驗證區塊所需的能量與其中的交易數量無關。 若以單筆交易作為計算能耗的單位，意味交易越少能耗將越低，反之亦然，但事實並非如此。 此外，每筆交易的估計值，很大程度上取決於區塊鏈的交易吞吐量是如何定義的，並且可以透過調整這個定義來使估計值看起來更大或更小。

例如，在以太坊上，交易吞吐量不僅是基礎層的吞吐量，也是其所有「[第 2 層](/layer-2/)」卷軸的交易吞吐量總和。 二層網路通常不列入計算，但考慮排序者消耗的額外能量（少量）及其處理的交易量（大量），很可能會大幅降低每筆交易的估計值。 這就是為什麼跨平臺比較每筆交易能耗可能產生誤導的原因之一。

## 以太坊的碳債 {#carbon-debt}

目前以太坊的能耗非常低，但並非一直都是如此。 以太坊一開始使用工作量證明，其環境成本比現在的權益證明機制大了許多。

最一開始，以太坊就計劃要實現以權益證明為基礎的共識機制，但為了同時確保安全性和去中心化，需要花費多年專注投入研發工作。 因此，一開始網路採用了工作量證明機制。 工作量證明要求礦工使用運算硬體來計算數值，過程中會消耗能源。

![比較以太坊在合併前後的能源消耗，左側使用艾菲爾鐵塔 (高 330 公尺) 象徵合併前的高能源消耗，右側使用一個 4 公分高的樂高人偶代表合併後能源使用量的大幅減少](energy_consumption_pre_post_merge.png)

CCRI 估計，合併使以太坊的年化電力消耗減少了 **99.988%** 以上。 同樣地，以太坊的碳足跡也減少了約 **99.992%** (從 11,016,000 噸降至 870 公噸 CO2e)。 如上圖所示，從這一角度來看，減少的碳排放就如同從艾菲爾鐵塔的高度下降到小塑膠玩偶的高度。 因此，確保以太坊網路安全性的環境成本大幅降低。 同時，網路的安全性相信也已得到改善。

## 綠色應用層 {#green-applications}

雖然以太坊的能源消耗非常低，但在以太坊上還有一個龐大、不斷成長且高度活躍的 [**再生金融 (ReFi)**](/refi/) 社群。 再生金融應用程式使用去中心化金融組件來構建具有積極外部影響、有益於環境的金融應用程式。 ReFi 是更廣泛的 [「太陽龐克」](https://en.wikipedia.org/wiki/Solarpunk) 運動的一部分，該運動與以太坊緊密結合，旨在將技術進步與環境管理結合起來。 以太坊具有去中心化、無需許可以及可組合性的特性，這些特性使其成為再生金融和 solarpunk 社群理想的基礎層。

像 [Gitcoin](https://gitcoin.co) 這樣的 Web3 原生公共財募資平台會舉辦氣候募資輪，以鼓勵在以太坊應用層上進行具有環保意識的建設。 透過這些倡議 (以及其他，例如 [DeSci](/desci/)) 的發展，以太坊正成為一種對環境和社會具有淨正面效益的技術。

<Alert variant="update">
<AlertEmoji text=":evergreen_tree:" />
<AlertContent>
<AlertDescription>
  如果你認為此頁內容能更加準確，請提出議題或提取請求 (PR)。 呈現在此頁面上的統計數據皆是基於公開數據的估計值 - 它們不代表 ethereum.org 團隊或以太坊基金會的官方聲明或承諾。
</AlertDescription>
</AlertContent>
</Alert>

## 延伸閱讀 {#further-reading}

- [劍橋區塊鏈網路永續性指標](https://ccaf.io/cbnsi/ethereum)
- [白宮關於工作量證明區塊鏈的報告](https://web.archive.org/web/20221109005700/https://www.whitehouse.gov/wp-content/uploads/2022/09/09-2022-Crypto-Assets-and-Climate-Report.pdf)
- [以太坊排放：由下而上的估計](https://kylemcdonald.github.io/ethereum-emissions/) - _Kyle McDonald_
- [以太坊能源消耗指數](https://digiconomist.net/ethereum-energy-consumption/) - _Digiconomist_
- [ETHMerge.com](https://ethmerge.com/) - _[@InsideTheSim](https://twitter.com/InsideTheSim)_
- [合併 - 對以太坊網路電力消耗和碳足跡的影響](https://carbon-ratings.com/eth-report-2022) - _CCRI_
- [以太坊的能源消耗](https://mirror.xyz/jmcook.eth/ODpCLtO4Kq7SCVFbU4He8o8kXs418ZZDTj0lpYlZkR8)

## 相關主題 {#related-topics}

- [信標鏈](/roadmap/beacon-chain)
- [合併](/roadmap/merge/)
