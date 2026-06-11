---
title: 이더리움의 에너지 소비량
metaTitle: 이더리움 에너지 소비량
description: 이더리움의 에너지 소비량을 이해하는 데 필요한 기본 정보입니다.
lang: ko
---

[이더리움](/)은 친환경적인 블록체인입니다. 이더리움의 [지분 증명 (PoS)](/developers/docs/consensus-mechanisms/pos) 합의 메커니즘은 [네트워크를 보호하기 위해 에너지](/developers/docs/consensus-mechanisms/pow) 대신 ETH를 사용합니다. 전 세계 네트워크를 통틀어 이더리움의 에너지 소비량은 대략 [연간 약 0.0026 TWh](https://carbon-ratings.com/eth-report-2022)입니다.

이더리움의 에너지 소비량 추정치는 [CCRI(Crypto Carbon Ratings Institute)](https://carbon-ratings.com)의 연구에서 가져왔습니다. 이들은 이더리움 네트워크의 전력 소비량과 탄소 발자국에 대한 상향식(bottom-up) 추정치를 생성했습니다([보고서 보기](https://carbon-ratings.com/eth-report-2022)). 이들은 다양한 하드웨어 및 클라이언트 소프트웨어 구성을 가진 여러 노드의 전력 소비량을 측정했습니다. 네트워크의 연간 전력 소비량으로 추정되는 **2,601 MWh**(0.0026 TWh)는 지역별 탄소 집약도 계수를 적용했을 때 연간 **870톤의 CO2e** 탄소 배출량에 해당합니다. 이 값은 노드가 네트워크에 참여하고 떠남에 따라 변경됩니다. [케임브리지 블록체인 네트워크 지속가능성 인덱스(Cambridge Blockchain Network Sustainability Index)](https://ccaf.io/cbnsi/ethereum)의 7일 이동 평균 추정치를 사용하여 추적할 수 있습니다(이들은 추정에 약간 다른 방법을 사용하며, 자세한 내용은 해당 사이트에서 확인할 수 있습니다).

이더리움의 에너지 소비량을 맥락화하기 위해, 다른 제품 및 산업의 연간 추정치와 비교해 볼 수 있습니다. 이를 통해 이더리움의 추정치가 높은지 낮은지 더 잘 이해할 수 있습니다.

<EnergyConsumptionChart />

위 차트는 이더리움의 연간 예상 에너지 소비량(TWh/yr)을 다른 여러 제품 및 산업과 비교하여 보여줍니다. 제공된 추정치는 2023년 7월에 액세스한 공개적으로 사용 가능한 정보를 기반으로 하며, 출처 링크는 아래 표에서 확인할 수 있습니다.

|                     | 연간 에너지 소비량 (TWh) | 지분 증명(PoS) 이더리움과의 비교 |                                                                                      출처                                                                                       |
| :------------------ | :---------------------------------: | :------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| 글로벌 데이터 센터 |                 190                 |          73,000배           |                                    [출처](https://www.iea.org/commentaries/data-centres-and-energy-from-global-headlines-to-local-headaches)                                    |
| 비트코인             |                 149                 |          53,000배           |                                                                 [출처](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                 |
| 금 채굴         |                 131                 |          50,000배           |                                                                 [출처](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                 |
| 미국 내 게임\*     |                 34                  |          13,000배           |                 [출처](https://www.researchgate.net/publication/336909520_Toward_Greener_Gaming_Estimating_National_Energy_Use_and_Energy_Efficiency_Potential)                 |
| 작업증명(PoW) 이더리움        |                 21                  |           8,100배           |                                                                    [출처](https://ccaf.io/cbnsi/ethereum/1)                                                                     |
| Google              |                 19                  |           7,300배           |                                           [출처](https://www.gstatic.com/gumdrop/sustainability/google-2022-environmental-report.pdf)                                           |
| 넷플릭스             |                0.457                |            176배            | [출처](https://assets.ctfassets.net/4cd45et68cgf/7B2bKCqkXDfHLadrjrNWD8/e44583e5b288bdf61e8bf3d7f8562884/2021_US_EN_Netflix_EnvironmentalSocialGovernanceReport-2021_Final.pdf) |
| 페이팔              |                0.26                 |            100배            |                                 [출처](<https://s202.q4cdn.com/805890769/files/doc_downloads/global-impact/CDP_Climate_Change_PayPal-(1).pdf>)                                  |
| AirBnB              |                0.02                 |             8배             |                              [출처](<https://s26.q4cdn.com/656283129/files/doc_downloads/governance_doc_updated/Airbnb-ESG-Factsheet-(Final).pdf>)                              |
| **지분 증명(PoS) 이더리움**    |             **0.0026**              |           **1배**           |                                                               [출처](https://carbon-ratings.com/eth-report-2022)                                                                |

\*PC, 노트북, 게임 콘솔과 같은 최종 사용자 기기를 포함합니다.

에너지 소비량에 대한 정확한 추정치를 얻는 것은 복잡하며, 특히 측정 대상이 효율성에 영향을 미치는 복잡한 공급망이나 배포 세부 정보를 가지고 있을 때 더욱 그렇습니다. 예를 들어, 넷플릭스와 Google의 에너지 소비량 추정치는 시스템을 유지하고 사용자에게 콘텐츠를 전송하는 데 사용되는 에너지(_직접 소비_)만 포함하는지, 아니면 콘텐츠 제작, 기업 사무실 운영, 광고 등에 필요한 소비(_간접 소비_)를 포함하는지에 따라 달라집니다. 간접 소비에는 TV, 컴퓨터, 모바일과 같은 최종 사용자 기기에서 콘텐츠를 소비하는 데 필요한 에너지도 포함될 수 있습니다.

위의 추정치들이 완벽한 비교 대상은 아닙니다. 고려되는 간접 소비의 양은 출처마다 다르며, 최종 사용자 기기의 에너지를 포함하는 경우는 드뭅니다. 각 기본 출처에는 측정 대상에 대한 자세한 내용이 포함되어 있습니다.

위의 표와 차트에는 비트코인 및 작업증명(PoW) 이더리움과의 비교도 포함되어 있습니다. 작업증명 네트워크의 에너지 소비량은 고정되어 있지 않으며 매일 변한다는 점에 유의해야 합니다. 추정치 또한 출처에 따라 크게 다를 수 있습니다. 이 주제는 소비되는 에너지의 양뿐만 아니라 해당 에너지의 출처 및 관련 윤리에 대해서도 미묘한 [논쟁](https://www.coindesk.com/business/2020/05/19/the-last-word-on-bitcoins-energy-consumption/)을 불러일으킵니다. 프로젝트마다 재생 에너지의 비율이 다르거나 다른 에너지원을 사용할 수 있기 때문에 에너지 소비량이 반드시 환경 발자국과 정확히 일치하는 것은 아닙니다. 예를 들어, [케임브리지 비트코인 전력 소비 인덱스(Cambridge Bitcoin Electricity Consumption Index)](https://ccaf.io/cbnsi/cbeci/comparisons)는 비트코인 네트워크 수요가 이론적으로 가스 플레어링이나 송배전 과정에서 손실될 전력으로 충당될 수 있음을 시사합니다. 지속 가능성을 향한 이더리움의 경로는 네트워크에서 에너지를 많이 소비하는 부분을 친환경적인 대안으로 대체하는 것이었습니다.

[케임브리지 블록체인 네트워크 지속가능성 인덱스 사이트](https://ccaf.io/cbnsi/ethereum)에서 여러 산업의 에너지 소비량 및 탄소 배출량 추정치를 찾아볼 수 있습니다.

## 트랜잭션당 추정치 {#per-transaction-estimates}

많은 기사에서 블록체인의 "트랜잭션당" 에너지 소비량을 추정합니다. 블록을 제안하고 검증하는 데 필요한 에너지는 블록 내의 트랜잭션 수와 무관하기 때문에 이는 오해의 소지가 있을 수 있습니다. 트랜잭션당 에너지 소비 단위는 트랜잭션 수가 적으면 에너지 소비량이 줄어들고 그 반대의 경우도 마찬가지임을 암시하지만, 실제로는 그렇지 않습니다. 또한 트랜잭션당 추정치는 블록체인의 트랜잭션 처리량이 어떻게 정의되는지에 매우 민감하며, 이 정의를 조정하여 값을 더 크거나 작게 보이도록 조작할 수 있습니다.

예를 들어 이더리움의 경우, 트랜잭션 처리량은 기본 레이어의 처리량뿐만 아니라 모든 "[레이어 2 (l2)](/layer-2/)" 롤업의 트랜잭션 처리량의 합이기도 합니다. 레이어 2는 일반적으로 계산에 포함되지 않지만, 시퀀서가 소비하는 추가 에너지(적음)와 이들이 처리하는 트랜잭션 수(많음)를 고려하면 트랜잭션당 추정치가 크게 줄어들 가능성이 높습니다. 이것이 플랫폼 간 트랜잭션당 에너지 소비량 비교가 오해를 불러일으킬 수 있는 한 가지 이유입니다.

## 이더리움의 탄소 부채 {#carbon-debt}

이더리움의 에너지 소비량은 매우 낮지만, 항상 그랬던 것은 아닙니다. 이더리움은 원래 현재의 지분 증명 메커니즘보다 환경적 비용이 훨씬 더 큰 작업증명을 사용했습니다.

초기부터 이더리움은 지분 증명 기반의 합의 메커니즘을 구현할 계획이었지만, 보안과 탈중앙화를 희생하지 않고 이를 달성하기 위해서는 수년간의 집중적인 연구 개발이 필요했습니다. 따라서 네트워크를 시작하기 위해 작업증명 메커니즘이 사용되었습니다. 작업증명은 채굴자가 컴퓨팅 하드웨어를 사용하여 값을 계산하도록 요구하며, 이 과정에서 에너지를 소비합니다.

![Comparing Ethereum's energy consumption pre- and post-Merge, using the Eiffel Tower (330 meters tall) on the left to symbolize the high energy consumption before The Merge, and a small 4 cm tall Lego figure on the right to represent the dramatic reduction in energy usage after The Merge](energy_consumption_pre_post_merge.png)

CCRI는 머지로 인해 이더리움의 연간 전력 소비량이 **99.988%** 이상 감소했다고 추정합니다. 마찬가지로 이더리움의 탄소 발자국은 약 **99.992%**(11,016,000톤에서 870톤 CO2e로) 감소했습니다. 이를 이해하기 쉽게 설명하자면, 배출량 감소는 위 그림에 설명된 것처럼 에펠탑 높이에서 작은 플라스틱 장난감 피규어 크기로 줄어든 것과 같습니다. 결과적으로 네트워크를 보호하는 데 드는 환경적 비용이 크게 감소했습니다. 동시에 네트워크의 보안도 향상된 것으로 여겨집니다.

## 친환경 애플리케이션 레이어 {#green-applications}

이더리움의 에너지 소비량은 매우 낮지만, 이더리움 위에서 구축되는 실질적이고 성장하며 매우 활동적인 [**재생 금융(ReFi)**](/refi/) 커뮤니티도 존재합니다. 재생 금융 애플리케이션은 탈중앙화 금융 (DeFi) 구성 요소를 사용하여 환경에 유익한 긍정적인 외부 효과를 갖는 금융 애플리케이션을 구축합니다. 재생 금융은 이더리움과 밀접하게 연계되어 있으며 기술 발전과 환경 관리를 결합하는 것을 목표로 하는 더 넓은 ["솔라펑크(solarpunk)"](https://en.wikipedia.org/wiki/Solarpunk) 운동의 일부입니다. 이더리움의 탈중앙화된, 무허가성 및 조합 가능한 특성은 재생 금융 및 솔라펑크 커뮤니티를 위한 이상적인 기본 레이어가 되게 합니다.

[Gitcoin](https://gitcoin.co)과 같은 Web3 네이티브 공공재 펀딩 플랫폼은 이더리움의 애플리케이션 레이어에서 환경을 고려한 구축을 촉진하기 위해 기후 라운드를 운영합니다. 이러한 이니셔티브(및 [탈중앙화 과학(DeSci)](/desci/) 등 기타 이니셔티브)의 개발을 통해 이더리움은 환경적, 사회적으로 순기능을 하는 기술이 되고 있습니다.

<Alert variant="update">
<AlertEmoji text=":evergreen_tree:" />
<AlertContent>
<AlertDescription>
  이 페이지를 더 정확하게 만들 수 있다고 생각하시면 이슈나 PR을 제기해 주세요. 이 페이지의 통계는 공개적으로 사용 가능한 데이터를 기반으로 한 추정치이며, ethereum.org 팀이나 이더리움 재단의 공식적인 성명이나 약속을 나타내지 않습니다.
</AlertDescription>
</AlertContent>
</Alert>

## 더 읽을거리 {#further-reading}

- [케임브리지 블록체인 네트워크 지속가능성 인덱스(Cambridge Blockchain Network Sustainability Index)](https://ccaf.io/cbnsi/ethereum)
- [작업증명 블록체인에 대한 백악관 보고서](https://web.archive.org/web/20221109005700/https://www.whitehouse.gov/wp-content/uploads/2022/09/09-2022-Crypto-Assets-and-Climate-Report.pdf)
- [이더리움 배출량: 상향식 추정(Ethereum Emissions: A Bottom-up Estimate)](https://kylemcdonald.github.io/ethereum-emissions/) - _Kyle McDonald_
- [이더리움 에너지 소비 인덱스(Ethereum Energy Consumption Index)](https://digiconomist.net/ethereum-energy-consumption/) - _Digiconomist_
- [ETHMerge.com](https://ethmerge.com/) - _[@InsideTheSim](https://twitter.com/InsideTheSim)_
- [머지 - 이더리움 네트워크의 전력 소비 및 탄소 발자국에 미치는 영향(The Merge - Implications on the Electricity Consumption and Carbon Footprint of the Ethereum Network)](https://carbon-ratings.com/eth-report-2022) - _CCRI_
- [이더리움의 에너지 소비량](https://mirror.xyz/jmcook.eth/ODpCLtO4Kq7SCVFbU4He8o8kXs418ZZDTj0lpYlZkR8)

## 관련 주제 {#related-topics}

- [비콘 체인](/roadmap/beacon-chain)
- [머지](/roadmap/merge/)