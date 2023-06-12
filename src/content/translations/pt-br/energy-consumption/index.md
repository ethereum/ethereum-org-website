---
title: Consumo de energia da Ethereum
description: As informações básicas que você precisa para entender o consumo de energia da Ethereum.
lang: pt-br
---

# Gasto de energia do Ethereum {#proof-of-stake-energy}

Ethereum é uma cadeia de blocos verde. Ele usa um mecanismo de consenso chamado [prova de participação](/developers/docs/consensus-mechanisms/pos/), que usa ETH ao invés de [energia para proteger a rede](/developers/docs/consensus-mechanisms/pow/). O mecanismo de prova de participação do Ethereum usa apenas [~0,0026 TWh/ano](https://carbon-ratings.com/eth-report-2022) em toda a rede global.

O [CCRI (Crypto Carbon Ratings Institute)](https://carbon-ratings.com) gerou estimativas do consumo de eletricidade e da pegada de carbono da rede Ethereum ([veja o relatório](https://carbon-ratings.com/eth-report-2022)). Eles mediram o consumo de eletricidade de diferentes nós com várias configurações de hardware e software cliente. Isso gerou uma estimativa de **2,601 MWh** (0,0026 TWh) para o consumo anual de eletricidade da rede (setembro de 2022), correspondente a **870 toneladas de CO2, ** com a aplicação de fatores de intensidade de carbono específicos de cada região.

<EnergyConsumptionChart />

O gráfico acima mostra o consumo anual estimado de energia em TWh/ano para vários setores (recuperado em junho de 2022). Observe que as estimativas apresentadas no gráfico são de fontes disponíveis publicamente e seus links se encontram na tabela abaixo. CEBCI refere-se ao índice Cambridge Bitcoin Electricity Consumption. Os valores são ilustrativos e não representam estimativa, compromisso ou previsão oficial.

Para contextualizar o consumo de energia do Ethereum, podemos comparar estimativas anualizadas para outras indústrias, o que nos permite entender melhor se 0,0026 TWh é muito ou pouco. Os dados estão resumidos no gráfico de barras acima, e mais detalhes são fornecidos na tabela abaixo:

|                          | Consumo de energia anualizado (TWh) | Comparação com a PoS Ethereum | Fonte                                                                                                                                            |
| :----------------------- | :---------------------------------: | :---------------------------: | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Mineração de ouro        |                 240                 |            92.000x            | [fonte](https://www.kitco.com/news/2021-05-17/Gold-s-energy-consumption-doubles-that-of-bitcoin-Galaxy-Digital.html)                             |
| Mineração de Ouro        |                 130                 |            50.000x            | [fonte](https://ccaf.io/cbeci/index/comparisons)                                                                                                 |
| Bitcoin                  |                 130                 |            50.000x            | [fonte](https://digiconomist.net/bitcoin-energy-consumption)                                                                                     |
| Bitcoin                  |                 100                 |            38.000x            | [fonte](https://ccaf.io/cbeci/index/comparisons)                                                                                                 |
| YouTube                  |                 244                 |           94.000 x            | [fonte](https://thefactsource.com/how-much-electricity-does-youtube-use/)                                                                        |
| Centros de dados globais |                 200                 |            78.000x            | [fonte](https://www.iea.org/commentaries/data-centres-and-energy-from-global-headlines-to-local-headaches)                                       |
| Netflix                  |                0,45                 |             175x              | [fonte](https://s22.q4cdn.com/959853165/files/doc_downloads/2020/02/0220_Netflix_EnvironmentalSocialGovernanceReport_FINAL.pdf)                  |
| Netflix                  |                 94                  |            36.000x            | [fonte](https://theshiftproject.org/en/article/unsustainable-use-online-video/)                                                                  |
| PayPal                   |                0,26                 |             100x              | [fonte](https://app.impaakt.com/analyses/paypal-consumed-264100-mwh-of-energy-in-2020-24-from-non-renewable-sources-27261)                       |
| Jogos nos EUA            |                 34                  |            13.000x            | [fonte](https://www.researchgate.net/publication/336909520_Toward_Greener_Gaming_Estimating_National_Energy_Use_and_Energy_Efficiency_Potential) |
| PoW Ethereum             |                 78                  |            30.000x            | [fonte](https://digiconomist.net/ethereum-energy-consumption)                                                                                    |
| PoS Ethereum             |               0,0026                |              1x               | [fonte](https://carbon-ratings.com/eth-report-2022)                                                                                              |

As estimativas do gasto de energia do YouTube também foram discriminadas por canal e vídeos individuais. [Essas estimativas](https://thefactsource.com/how-much-electricity-does-youtube-use/) mostram que o YouTube usou 175 vezes mais energia assistindo Gangnam Style em 2019 do que a Ethereum usa por ano.

É complicado obter estimativas precisas de consumo de energia, especialmente quando o que está sendo medido tem uma cadeia de suprimentos complexa ou detalhes de implantação que influenciam sua eficiência. Por exemplo, incluímos uma estimativa máxima e mínima para a mineração de ouro que diverge em cerca de 90 TWh. As estimativas de consumo de energia da Netflix variam drasticamente, dependendo da fonte. Suas próprias estimativas relatadas são cerca de 20 vezes menores do que uma estimativa independente. Veja algumas discussões sobre as razões para esse fenômeno em [Carbon Brief](https://www.carbonbrief.org/factcheck-what-is-the-carbon-footprint-of-streaming-video-on-netflix). Da mesma forma, estima-se que o YouTube gaste cerca de [244 TWh/ano](https://thefactsource.com/how-much-electricity-does-youtube-use/), embora o consumo de energia dependa muito do tipo de dispositivo no qual os vídeos são transmitidos e a eficiência energética da infraestrutura subjacente, como data centers. No entanto, é difícil estimar valores adequados para esses parâmetros, gerando uma incerteza substancial.

O gráfico acima também inclui comparações com Bitcoin e Ethereum (enquanto este ainda usava o mecanismo de prova de trabalho). As estimativas para o consumo de energia do Bitcoin variam amplamente entre as fontes e é um tópico que atrai muitos [debates](https://www.coindesk.com/business/2020/05/19/the-last-word-on-bitcoins-energy-consumption/), não apenas sobre a quantidade de energia consumida, mas também sobre as fontes dessa energia e a ética associada a elas.

Muitos artigos estimam o gasto de energia "por transação" para blockchains. Isso pode ser enganoso, porque a energia necessária para propor e validar um bloco é independente do número de transações dentro dele. Uma unidade de gasto de energia por transação implica que menos transações levariam a um gasto de energia menor e vice-versa, o que não é o caso. Além disso, as estimativas por transação são muito sensíveis a como uma taxa de transferência de transação da blockchain é definida, e o ajuste dessa definição pode ser burlado para fazer o valor parecer maior ou menor.

Por exemplo, na Ethereum, a taxa de transferência de transação não é apenas a da camada base – ela também é a soma da taxa de transferência de transação de todos os seus roll-ups de "[camada 2](/layer-2/) ". Geralmente, as camadas 2 não são incluídas nos cálculos, mas contabilizar a energia adicional consumida pelos sequenciadores (pequenos) e o número de transações que eles processam (grandes) provavelmente reduziria drasticamente as estimativas por transação. Esta é uma razão pela qual as comparações do consumo de energia por transação entre plataformas podem ser enganosas.

## Deficit de carbono do Ethereum {#carbon-debt}

O gasto de energia do Ethereum é muito baixo, mas nem sempre tem sido o caso. O Ethereum originalmente usava prova de trabalho, que tinha um custo ambiental muito maior do que o mecanismo atual de prova de participação.

Desde o início, o Ethereum planejou implementar um mecanismo de consenso baseado em prova de participação, mas fazer isso sem sacrificar a segurança e a descentralização levou anos de pesquisa e desenvolvimento focados. Portanto, um mecanismo de prova de trabalho foi usado para iniciar a rede. A prova de trabalho exige que mineradores usem seu hardware de computação para calcular um valor, gastando energia no processo. O consumo total de energia do Ethereum atingiu seu pico durante o ápice do mercado em alta de criptomoedas em fevereiro de 2022, a pouco menos de 94 TWh/ano. Pouco antes da mudança para prova de participação, o consumo de energia estava mais próximo de [78 TWh/ano](https://digiconomist.net/ethereum-energy-consumption), comparável ao do Uzbequistão, com uma emissão de carbono equivalente à do Azerbaijão (33 MT/ano).

![Comparação do consumo de energia do Ethereum antes e depois da Fusão. Exibe, à esquerda, a torre Eiffel com 330 metros de altura e, à direita, uma figura de brinquedo de plástico com 4 cm de altura visto de dentro de uma lupa.](energy_consumption_pre_post_merge.png)

O CCRI examinou o impacto da transição do Ethereum de prova de trabalho para prova de participação. O consumo anualizado de eletricidade foi reduzido em mais de **99,988 %**. Da mesma forma, a emissão de carbono do Ethereum foi reduzido em aproximadamente **99,992%** (de 11.016.000 para 870 toneladas de CO2e). Representado metaforicamente, isso corresponde a uma redução nas emissões da altura da Torre Eiffel para uma pequena figura de brinquedo de plástico, conforme mostrado na figura acima. Portanto, o custo ambiental de proteção da rede é drasticamente reduzido. Simultaneamente, estima-se que a segurança da rede tenha aumentado.

## Uma camada de aplicação verde {#green-applications}

Embora o consumo de energia do Ethereum seja muito baixo, há também uma comunidade sobre **finanças regenerativas (ReFi)** substancial, crescente e altamente ativa construída no Ethereum. Os aplicativos ReFi usam componentes DeFi para construir aplicações financeiras com externalidades positivas benéficas para o ambiente. O ReFi faz parte de um movimento ["solarpunk"](https://en.wikipedia.org/wiki/Solarpunk) mais amplo que está intimamente alinhado com o Ethereum e visa unir o avanço tecnológico e a gestão ambiental. A natureza descentralizada, sem permissão e combinável do Ethereum faz dele a camada base ideal para as comunidades ReFi e solarpunk.

As plataformas nativas de financiamento de bens públicos da Web3, como [Gitcoin](https://gitcoin.co), executam rodadas climáticas para estimular uma construção com consciência ambiental na camada de aplicações do Ethereum. Por meio do desenvolvimento dessas iniciativas (e outras, por exemplo, [DeSci](/desci/)), o Ethereum está se tornando uma tecnologia social e ambientalmente positiva.

<InfoBanner emoji=":evergreen_tree:">
  Se você acha que esta página pode ser mais precisa, comunique o problema ou PR. As estatísticas nesta página são estimativas baseadas em dados disponíveis publicamente – elas não representam uma declaração oficial ou promessa da equipe ethereum.org ou da Ethereum Foundation. 
</InfoBanner>

## Leitura adicional {#further-reading}

- [Relatório da Casa Branca sobre blockchains de prova de trabalho](https://www.whitehouse.gov/wp-content/uploads/2022/09/09-2022-Crypto-Assets-and-Climate-Report.pdf)
- [Consumo de energia do Ethereum](https://mirror.xyz/jmcook.eth/ODpCLtO4Kq7SCVFbU4He8o8kXs418ZZDTj0lpYlZkR8)
- [Emissões do Ethereum: uma estimativa minuciosa](https://kylemcdonald.github.io/ethereum-emissions/) _ Kyle McDonald_
- [Índice de consumo de energia do Ethereum](https://digiconomist.net/ethereum-energy-consumption/) – _Digiconomist_
- [ETHMerge.com](https://ethmerge.com/) — _[@InsideTheSim](https://twitter.com/InsideTheSim)_
- [A Fusão — As Implicações no Consumo de Eletricidade e Emissão de Carbono da Rede Ethereum](https://carbon-ratings.com/eth-report-2022) - _CCRI_

## Tópicos relacionados {#related-topics}

- [Visão do Ethereum](/roadmap/vision/)
- [A Beacon Chain](/roadmap/beacon-chain)
- [The Merge (A Fusão)](/roadmap/merge/)
