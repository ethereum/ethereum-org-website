---
title: Consumo de energia da Ethereum
description: As informações básicas que você precisa para entender o consumo de energia da Ethereum.
lang: pt-br
---

# Gasto de energia do Ethereum {#proof-of-stake-energy}

Ethereum é uma cadeia de blocos verde. A [prova de participação](/developers/docs/consensus-mechanisms/pos) do Ethereum usa o ETH como mecanismo de consenso ao invés de [energia para proteger a rede](/developers/docs/consensus-mechanisms/pow). O consumo de energia do Ethereum é de aproximadamente [~0,0026 TWh/ano](https://carbon-ratings.com/eth-report-2022) em toda a rede global.

O consumo de energia estimado para o Ethereum vem de um estudo do [CCRI (Crypto Carbon Ratings Institute)](https://carbon-ratings.com). Eles geraram estimativas de baixo para cima do consumo de eletricidade e dos rastros de carbono da rede Ethereum ([veja o relatório](https://carbon-ratings.com/eth-report-2022)). Eles mediram o consumo de eletricidade de diferentes nós com várias configurações de hardware e software cliente. A estimativa de **2,601 MWh** (0,0026 TWh) para o consumo anual de eletricidade da rede é correspondente a emissões anuais de carbono de **870 toneladas de CO2e**, aplicando fatores de intensidade de carbono específicas de uma região. Esse valor muda à medida que os nós entram e saem da rede — você pode acompanhar isso utilizando uma média estimada de 7 dias pelo [Índice de Sustentabilidade da rede Cambridge Blockchain](https://ccaf.io/cbnsi/ethereum) (observe que eles usam um método ligeiramente diferente para suas estimativas — detalhes disponíveis no site).

Para contextualizar o consumo de energia do Ethereum, nós podemos comparar as estimativas anualizadas de outros setores. Isso nos ajuda a entender melhor se a estimativa do Ethereum é alta ou baixa.

<EnergyConsumptionChart />

O gráfico acima apresenta o consumo anual de energia estimada em TWh/ano para o Ethereum, em comparação com outros diversos setores. As estimativas fornecidas são derivadas de informações disponíveis ao público, acessadas em maio de 2023, com links para as fontes disponíveis no quadro abaixo:

|                               | Consumo de energia anualizado (TWh) | Comparação com a PoS Ethereum | Fonte                                                                                                                                                                            |
| :---------------------------- | :---------------------------------: | :---------------------------: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Centros de dados globais      |                 200                 |            77.000x            | [fonte](https://www.iea.org/commentaries/data-centres-and-energy-from-global-headlines-to-local-headaches)                                                                       |
| Mineração de ouro             |                 131                 |            50.000x            | [fonte](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                                                                                 |
| Bitcoin                       |                 131                 |            50.000x            | [fonte](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                                                                                 |
| PoW Ethereum                  |                 78                  |            30.000x            | [fonte](https://digiconomist.net/ethereum-energy-consumption)                                                                                                                    |
| YouTube (somente diretamente) |                 12                  |            4.600x             | [fonte](https://www.gstatic.com/gumdrop/sustainability/google-2020-environmental-report.pdf)                                                                                     |
| Gaming nos EUA                |                 34                  |            13.000x            | [fonte](https://www.researchgate.net/publication/336909520_Toward_Greener_Gaming_Estimating_National_Energy_Use_and_Energy_Efficiency_Potential)                                 |
| Netflix                       |                0,451                |             173x              | [fonte](https://assets.ctfassets.net/4cd45et68cgf/7B2bKCqkXDfHLadrjrNWD8/e44583e5b288bdf61e8bf3d7f8562884/2021_US_EN_Netflix_EnvironmentalSocialGovernanceReport-2021_Final.pdf) |
| PayPal                        |                0,26                 |             100x              | [fonte](https://app.impaakt.com/analyses/paypal-consumed-264100-mwh-of-energy-in-2020-24-from-non-renewable-sources-27261)                                                       |
| AirBnB                        |                0,02                 |              8x               | [fonte](<https://s26.q4cdn.com/656283129/files/doc_downloads/governance_doc_updated/Airbnb-ESG-Factsheet-(Final).pdf>)                                                           |
| PoS Ethereum                  |               0,0026                |              1x               | [fonte](https://carbon-ratings.com/eth-report-2022)                                                                                                                              |

É complicado adquirir estimativas exatas do consumo de energia, especialmente quando o que está sendo medido tem uma cadeia complexa de suprimentos ou detalhes de implantação que influenciam sua eficiência. Considere a Netflix ou o YouTube como exemplos. As estimativas do seu consumo de energia podem variar dependendo se incluem apenas a energia usada para preservar seus sistemas e entregar satisfação aos usuários (_despesas diretas_) ou se eles incluem as despesas necessárias para gerar satisfação, administrar escritórios corporativos, anunciar, etc. (_despesas indiretas_). O uso indireto também pode incluir a energia necessária para consumir conteúdo em dispositivos do usuário final, como TVs, computadores e celulares, que, por outro lado, depende de quais dispositivos são usados.

Há uma discussão sobre isso no [Carbon Brief](https://www.carbonbrief.org/factcheck-what-is-the-carbon-footprint-of-streaming-video-on-netflix). No quadro acima, o valor indicado para a Netflix inclui o valor autodeclarado de utilização _direta_ e _indireta_. O Youtube disponibiliza apenas uma aproximação da própria despesa _direta_ de energia, que chega a [12 TWh/ano](https://www.gstatic.com/gumdrop/sustainability/google-2020-environmental-report.pdf).

A tabela e o gráfico acima também incluem comparações com o Bitcoin e a prova de trabalho do Ethereum. É importante notar que o consumo de energia das redes de prova de trabalho não é estático — ele muda a cada dia. O valor usado para a prova de trabalho do Ethereum foi um pouco antes do [The Merge](/roadmap/merge/) para prova de participação, como previsto pelo [Digiconomist](https://digiconomist.net/ethereum-energy-consumption). Outras fontes, como o [Índice de Sustentabilidade da rede Cambridge Blockchain](https://ccaf.io/cbnsi/ethereum/1) estimam que o consumo de energia tenha sido muito menor (mais próximo de 20 TWh/ano). As estimativas para o consumo de energia do Bitcoin também mudam muito entre as fontes e é um tema que atrai muitos [debates](https://www.coindesk.com/business/2020/05/19/the-last-word-on-bitcoins-energy-consumption/) sobre não apenas a quantidade de carga consumida, mas também as fontes dessa energia e a ética relacionada com ela. O consumo de energia não corresponde necessariamente à pegada ambiental, porque diferentes projetos podem utilizar diferentes fontes de energia como, por exemplo, uma proporção menor ou maior de energias renováveis. Por exemplo, o [Índice de Consumo de Eletricidade Bitcoin de Cambridge](https://ccaf.io/cbnsi/cbeci/comparisons) indicam que a demanda da rede Bitcoin poderia, teoricamente, ser alimentada por queima de gás ou de eletricidade que, de certa forma, seria perdida na transmissão e distribuição. O caminho do Ethereum para a sustentabilidade foi substituir a parte que consume muita energia da rede por uma alternativa ecológica.

Você pode consultar as estimativas do consumo de energia e emissão de carbono no [site Índice de Sustentabilidade da rede Cambridge Blockchain](https://ccaf.io/cbnsi/ethereum).

## Estimativas por transação {#per-transaction-estimates}

Muitos artigos estimam o gasto de energia “por transação” para blockchains. Isso pode ser enganoso, pois a energia necessária para propor e validar um bloco é independente do número de transações dentro dele. Uma unidade de gasto de energia por transação implica que menos transações levariam a um gasto de energia menor e vice-versa, o que não é o caso. Além disso, as estimativas por transação são muito sensíveis a como uma taxa de transferência de transação da blockchain é definida, e o ajuste dessa definição pode ser burlado para fazer o valor parecer maior ou menor.

Por exemplo, no Ethereum, a taxa de transferência de transação não é apenas a da camada base — ela também é a soma da taxa de transferência de transação de todos os seus roll-ups de “[camada 2](/layer-2/)”. Geralmente, as camadas 2 não são incluídas nos cálculos, mas contabilizar a energia adicional consumida pelos sequenciadores (pequenos) e o número de transações que eles processam (grandes) provavelmente reduziria drasticamente as estimativas por transação. Essa é uma razão pela qual as comparações do consumo de energia por transação entre plataformas podem ser enganosas.

## Deficit de carbono do Ethereum {#carbon-debt}

O gasto de energia do Ethereum é muito baixo, mas nem sempre tem sido o caso. Originalmente, o Ethereum usava prova de trabalho, que tinha um custo ambiental muito maior do que o mecanismo atual de prova de participação.

Desde o início, o Ethereum planejou implementar um mecanismo de consenso baseado em prova de participação, mas fazer isso sem sacrificar a segurança e a descentralização levou anos de pesquisa e desenvolvimento focados. Portanto, um mecanismo de prova de trabalho foi usado para iniciar a rede. A prova de trabalho exige que mineradores usem seu hardware de computação para calcular um valor, gastando energia no processo.

![Comparação do consumo de energia do Ethereum antes e depois da fusão (The Merge), usando a Torre Eiffel (330 metros de altura) à esquerda, para simbolizar o elevado consumo de energia antes do The Merge, e uma pequena figura de Lego de 4 cm de altura à direta, para representar a redução drástica do consumo de energia após o The Merge.](energy_consumption_pre_post_merge.png)

CCRI estima que o The Merge reduziu o consumo anual de eletricidade do Ethereum em mais de **99,988%**. Da mesma forma, a emissão de carbono do Ethereum foi reduzido em aproximadamente **99,992%** (de 11.016.000 para 870 toneladas de CO2e). Para colocar isso em perspectiva, a redução das emissões é como ir da altura da Torre Eiffel para um brinquedinho de plástico, como ilustrado na figura acima. Consequentemente, o custo ambiental da segurança da rede é drasticamente reduzido. Ao mesmo tempo, acredita-se que a segurança da rede tenha melhorado.

## Uma camada de aplicação ecológica {#green-applications}

Embora o consumo de energia do Ethereum seja muito baixo, há também uma comunidade sobre **finanças regenerativas (ReFi)** substancial, crescente e altamente ativa construída no Ethereum. Os aplicativos ReFi usam componentes DeFi para construir aplicativos financeiros com externalidades positivas benéficas para o ambiente. O ReFi faz parte de um movimento [“solarpunk”](https://en.wikipedia.org/wiki/Solarpunk) mais amplo, que está intimamente alinhado com o Ethereum e visa unir o avanço tecnológico e a gestão ambiental. A natureza descentralizada, sem permissão e combinável do Ethereum faz dele a camada base ideal para as comunidades ReFi e solarpunk.

As plataformas nativas de financiamento de bens públicos da Web3, como [Gitcoin](https://gitcoin.co), executam rodadas climáticas para estimular uma construção com consciência ambiental na camada de aplicações do Ethereum. Por meio do desenvolvimento dessas iniciativas (e outras, por exemplo, [DeSci](/desci/)), o Ethereum está se tornando uma tecnologia social e ambientalmente positiva.

<InfoBanner emoji=":evergreen_tree:">
  Se você acha que esta página pode ser mais precisa, comunique o problema ou PR. As estatísticas nesta página são estimativas baseadas em dados disponíveis publicamente – elas não representam uma declaração oficial ou promessa da equipe ethereum.org ou da Ethereum Foundation.
</InfoBanner>

## Leitura adicional {#further-reading}

- [Índice de Sustentabilidade da rede Cambridge Blockchain](https://ccaf.io/cbnsi/ethereum)
- [Relatório da Casa Branca sobre blockchains de prova de trabalho](https://www.whitehouse.gov/wp-content/uploads/2022/09/09-2022-Crypto-Assets-and-Climate-Report.pdf)
- [Emissões do Ethereum: uma estimativa minuciosa](https://kylemcdonald.github.io/ethereum-emissions/) _ Kyle McDonald_
- [Índice de consumo de energia do Ethereum](https://digiconomist.net/ethereum-energy-consumption/) – _Digiconomist_
- [ETHMerge.com](https://ethmerge.com/) — _[@InsideTheSim](https://twitter.com/InsideTheSim)_
- [A Fusão — As Implicações no Consumo de Eletricidade e Emissão de Carbono da Rede Ethereum](https://carbon-ratings.com/eth-report-2022) - _CCRI_
- [Consumo de energia do Ethereum](https://mirror.xyz/jmcook.eth/ODpCLtO4Kq7SCVFbU4He8o8kXs418ZZDTj0lpYlZkR8)

## Tópicos relacionados {#related-topics}

- [Visão do Ethereum](/roadmap/vision/)
- [A Beacon Chain](/roadmap/beacon-chain)
- [The Merge (A Fusão)](/roadmap/merge/)
