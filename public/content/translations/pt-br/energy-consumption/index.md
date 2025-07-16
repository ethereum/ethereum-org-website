---
title: Consumo de energia do Ethereum
description: As informações básicas que você precisa para entender o consumo de energia do Ethereum.
lang: pt-br
---

# Gasto de energia do Ethereum {#proof-of-stake-energy}

Ethereum é uma cadeia de blocos verde. A [prova de participação](/developers/docs/consensus-mechanisms/pos) do Ethereum usa o ETH como mecanismo de consenso ao invés de [energia para proteger a rede](/developers/docs/consensus-mechanisms/pow). O consumo de energia do Ethereum é de aproximadamente [~0,0026 TWh/ano](https://carbon-ratings.com/eth-report-2022) em toda a rede global.

O consumo de energia estimado para o Ethereum vem de um estudo do [CCRI (Crypto Carbon Ratings Institute)](https://carbon-ratings.com). Eles geraram uma estimativa detalhada do consumo de eletricidade e da pegada de carbono da rede Ethereum ([ veja o relatório](https://carbon-ratings.com/eth-report-2022)). Eles mediram o consumo de eletricidade de diferentes nós com várias configurações de hardware e software cliente. A estimativa de **2,601 MWh** (0,0026 TWh) para o consumo anual de eletricidade da rede é correspondente a emissões anuais de carbono de **870 toneladas de CO2e**, aplicando fatores de intensidade de carbono específicas de uma região. Esse valor muda à medida que os nós entram e saem da rede. Você pode acompanhar esta variação graças ao [Índice de Sustentabilidade da Cambridge para a rede Blockchain](https://ccaf.io/cbnsi/ethereum), que oferece uma estimativa média de sete dias corridos (observe que eles usam um método ligeiramente diferente para suas estimativas — detalhes disponíveis no site).

Para contextualizar o consumo de energia do Ethereum, nós podemos fazer a comparação com estimativas anuais de outros produtos e indústrias. Isso nos ajuda a entender melhor se a estimativa do Ethereum é alta ou baixa.

<EnergyConsumptionChart />

O gráfico acima mostra o consumo de energia estimado em TWh/ano para o Ethereum, comparado a diversos produtos e indústrias. As estimativas fornecidas são derivadas de fontes públicas de informação, acessadas em julho de 2023, com links das fontes disponíveis na tabela abaixo.

|                          | Consumo de energia anualizado (TWh) | Comparação com a PoS Ethereum |                                                                                      Fonte                                                                                       |
|:------------------------ |:-----------------------------------:|:-----------------------------:|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| Centros de dados globais |                 190                 |            73.000x            |                                    [fonte](https://www.iea.org/commentaries/data-centres-and-energy-from-global-headlines-to-local-headaches)                                    |
| Bitcoin                  |                 149                 |            53.000x            |                                                                 [fonte](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                 |
| Mineração de ouro        |                 131                 |            50.000x            |                                                                 [fonte](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                 |
| Jogos nos EUA\*        |                 34                  |            13.000x            |                 [fonte](https://www.researchgate.net/publication/336909520_Toward_Greener_Gaming_Estimating_National_Energy_Use_and_Energy_Efficiency_Potential)                 |
| PoW Ethereum             |                 21                  |            8.100x             |                                                                    [fonte](https://ccaf.io/cbnsi/ethereum/1)                                                                     |
| Google                   |                 19                  |            7.300x             |                                           [fonte](https://www.gstatic.com/gumdrop/sustainability/google-2022-environmental-report.pdf)                                           |
| Netflix                  |                0,457                |             176x              | [fonte](https://assets.ctfassets.net/4cd45et68cgf/7B2bKCqkXDfHLadrjrNWD8/e44583e5b288bdf61e8bf3d7f8562884/2021_US_EN_Netflix_EnvironmentalSocialGovernanceReport-2021_Final.pdf) |
| PayPal                   |                0,26                 |             100x              |                                  [fonte](https://s202.q4cdn.com/805890769/files/doc_downloads/global-impact/CDP_Climate_Change_PayPal-(1).pdf)                                   |
| AirBnB                   |                0,02                 |              8x               |                               [fonte](https://s26.q4cdn.com/656283129/files/doc_downloads/governance_doc_updated/Airbnb-ESG-Factsheet-(Final).pdf)                               |
| **PoS Ethereum**         |             **0,0026**              |            **1x**             |                                                               [fonte](https://carbon-ratings.com/eth-report-2022)                                                                |

\*Inclui dispositivos de usuários finais, como PCs, laptops e consoles de jogos.

Obter estimativas precisas do consumo de energia é complicado, especialmente quando o que está sendo avaliado apresenta uma cadeia de fornecimento complexa ou detalhes de implementação que influenciam a sua eficiência. Por exemplo, estimar o consumo de energia para o Netflix e o Google varia de acordo com os seguintes fatores, por exemplo: se incluem a energia usada para manter seu sistema funcional e a entrega de conteúdo aos usuários (_despesas diretas_) ou se incluem as despesas necessárias para criar conteúdo, administrar escritórios corporativos, anuncios, etc (_despesas indiretas_). As despesas indiretas podem incluir também a energia necessária para o consumo do conteúdo pelos dispositivos do usuário final, como TVs, computadores e celulares.

A estimativa acima não é uma comparação perfeita. O montante das despesas indiretas contabilizadas varia de acordo com a fonte, e raramente inclui a energia dos dispositivos do usuário final. Cada fonte subjacente inclui mais detalhes sobre o que está sendo avaliado.

A tabela e o gráfico acima também incluem comparações com o Bitcoin e a prova de trabalho do Ethereum. É importante notar que o consumo de energia das redes de prova de trabalho não é estático e muda a cada dia. As estimativas podem variar amplamente entre as fontes. O tema atrai [debates](https://www.coindesk.com/business/2020/05/19/the-last-word-on-bitcoins-energy-consumption/) moderados, não apenas sobre a quantidade de energia consumida, mas também a fonte dessa energia e a ética relacionada. O consumo de energia não corresponde necessariamente à pegada ambiental, porque diferentes projetos podem utilizar diferentes fontes de energia, incluindo uma proporção menor ou maior de energias renováveis. Por exemplo, o [Índice de Consumo de Eletricidade do Bitcoin de Cambridge](https://ccaf.io/cbnsi/cbeci/comparisons) indica que a demanda da rede Bitcoin poderia, teoricamente, ser alimentada pela queima de gás ou eletricidade que, de outra forma, seria perdida na transmissão e distribuição. O caminho do Ethereum para a sustentabilidade foi substituir a parte da rede que consome muita energia por uma alternativa ecológica.

Você pode consultar as estimativas do consumo de energia e emissão de carbono no [site Índice de Sustentabilidade de Cambridge para a rede Blockchain](https://ccaf.io/cbnsi/ethereum).

## Estimativas por transação {#per-transaction-estimates}

Muitos artigos estimam o gasto de energia “por transação” para blockchains. Isso pode ser enganoso, porque a energia necessária para propor e validar um bloco é independente do número de transações dentro dele. Uma unidade de gasto energético por transação implica que menos transações levariam a um gasto energético menor and vice-versa, o que não é o caso. Além disso, as estimativas por transação são muito sensíveis a como uma taxa de transferência de transação da blockchain é definida, e o ajuste dessa definição pode ser burlado para fazer o valor parecer maior ou menor.

No Ethereum, por exemplo, a taxa de transferência não é apenas a da camada base – é também a soma da taxa de transferência de todos os dois rollups da "[camada 2](/layer-2/)". Geralmente, as camadas 2 não são incluídas nos cálculos, mas contabilizar a energia adicional consumida pelos sequenciadores (pequenos) e o número de transações que eles processam (grandes) provavelmente reduziria drasticamente as estimativas por transação. Esta é a razão pela qual as comparações do consumo de energia por transação entre plataformas podem ser enganosas.

## Deficit de carbono do Ethereum {#carbon-debt}

O gasto de energia do Ethereum é muito baixo, mas nem sempre foi o caso. Originalmente, o Ethereum usava prova de trabalho, que tinha um custo ambiental muito maior do que o mecanismo atual de prova de participação.

Desde o início, o Ethereum planejou implementar um mecanismo de consenso baseado em prova de participação, mas fazer isso sem sacrificar a segurança e a descentralização levou anos de pesquisa e desenvolvimento focados. Portanto, um mecanismo de prova de trabalho foi usado para iniciar a rede. A prova de trabalho exige que mineradores usem seu hardware de computação para calcular um valor, gastando energia no processo.

![Comparação do consumo de energia do Ethereum antes e depois da fusão (A Fusão), usando a Torre Eiffel (330 metros de altura) à esquerda, para simbolizar o elevado consumo de energia antes da Fusão, e uma pequena figura de Lego de 4 cm de altura à direta, para representar a redução drástica do consumo de energia após a Fusão](energy_consumption_pre_post_merge.png)

CCRI estimou que A Fusão reduziu o consumo anual de eletricidade do Ethereum em mais de **99,988%**. Da mesma forma, a emissão de carbono do Ethereum foi reduzido em aproximadamente **99,992%** (de 11.016.000 para 870 toneladas de CO2e). Para colocar isso em perspectiva, a redução das emissões é como ir da altura da Torre Eiffel para um brinquedinho de plástico, como ilustrado na figura acima. Como resultado, o custo ambiental para manter a segurança da rede é consideravelmente reduzido. Ao mesmo tempo, acredita-se que a segurança da rede tenha melhorado.

## Uma camada de aplicação ecológica {#green-applications}

Embora o consumo de energia do Ethereum seja muito baixo, também há uma comunidade de [**finanças regenerativas (ReFi)**](/refi/) considerável, crescente e altamente ativa sendo desenvolvida no Ethereum. Os aplicativos ReFi usam componentes DeFi para criar aplicativos financeiros com externalidades positivas benéficas para o ambiente. O ReFi faz parte de um movimento mais amplo [“solarpunk”](https://en.wikipedia.org/wiki/Solarpunk), que está estreitamente alinhado com o Ethereum e visa unir o avanço tecnológico e a gestão ambiental. A natureza descentralizada, sem necessidade de permissão e composta do Ethereum faz dele a camada base ideal para as comunidades ReFi e solarpunk.

As plataformas nativas de financiamento de bens públicos da Web3, como [Gitcoin](https://gitcoin.co), executam rodadas climáticas para estimular a criação ambientalmente consciente na camada de aplicativos do Ethereum. Através do desenvolvimento dessas iniciativas (e outras, por exemplo, [DeSci](/desci/)), o Ethereum está se tornando uma tecnologia ambiental e socialmente positiva.

<InfoBanner emoji=":evergreen_tree:">
  Se você acha que esta página pode ser mais precisa, comunique o problema ou PR. As estatísticas nesta página são estimativas baseadas em dados disponíveis publicamente – elas não representam uma declaração oficial ou promessa da equipe ethereum.org ou da Ethereum Foundation.
</InfoBanner>

## Leitura adicional {#further-reading}

- [Índice de Sustentabilidade da rede Cambridge Blockchain](https://ccaf.io/cbnsi/ethereum)
- [Relatório da Casa Branca sobre blockchains de prova de trabalho](https://www.whitehouse.gov/wp-content/uploads/2022/09/09-2022-Crypto-Assets-and-Climate-Report.pdf)
- [Emissões do Ethereum: uma estimativa ascendente](https://kylemcdonald.github.io/ethereum-emissions/) - _Kyle McDonald_
- [Índice de consumo de energia do Ethereum](https://digiconomist.net/ethereum-energy-consumption/) – _Digiconomist_
- [ETHMerge.com](https://ethmerge.com/) - _[@InsideTheSim](https://twitter.com/InsideTheSim)_
- [A Fusão — As Implicações no Consumo de Eletricidade e Emissão de Carbono da Rede Ethereum](https://carbon-ratings.com/eth-report-2022) - _CCRI_
- [Consumo de energia do Ethereum](https://mirror.xyz/jmcook.eth/ODpCLtO4Kq7SCVFbU4He8o8kXs418ZZDTj0lpYlZkR8)

## Tópicos relacionados {#related-topics}

- [Visão do Ethereum](/roadmap/vision/)
- [A Beacon Chain](/roadmap/beacon-chain)
- [The Merge (A Fusão)](/roadmap/merge/)
