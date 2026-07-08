---
title: Gasto de energia do Ethereum
metaTitle: Consumo de energia do Ethereum
description: As informações básicas que você precisa para entender o consumo de energia do Ethereum.
lang: pt-br
---

[Ethereum](/) é uma blockchain verde. O mecanismo de consenso de [Prova de Participação (PoS)](/developers/docs/consensus-mechanisms/pos) do Ethereum usa ETH em vez de [energia para proteger a rede](/developers/docs/consensus-mechanisms/pow). O consumo de energia do Ethereum é de aproximadamente [~0,0026 TWh/ano](https://carbon-ratings.com/eth-report-2022) em toda a rede global.

A estimativa de consumo de energia do Ethereum vem de um estudo do [CCRI (Crypto Carbon Ratings Institute)](https://carbon-ratings.com). Eles geraram estimativas de baixo para cima (bottom-up) do consumo de eletricidade e da pegada de carbono da rede Ethereum ([veja o relatório](https://carbon-ratings.com/eth-report-2022)). Eles mediram o consumo de eletricidade de diferentes nós com várias configurações de hardware e software de cliente. Os **2.601 MWh** (0,0026 TWh) estimados para o consumo anual de eletricidade da rede correspondem a emissões anuais de carbono de **870 toneladas de CO2e**, aplicando fatores de intensidade de carbono específicos da região. Esse valor muda à medida que os nós entram e saem da rede - você pode acompanhar usando uma estimativa de média móvel de 7 dias pelo [índice de sustentabilidade da rede Cambridge Blockchain](https://ccaf.io/cbnsi/ethereum) (observe que eles usam um método ligeiramente diferente para suas estimativas - detalhes disponíveis no site deles).

Para contextualizar o consumo de energia do Ethereum, podemos comparar estimativas anualizadas de alguns outros produtos e indústrias. Isso nos ajuda a entender melhor se a estimativa para o Ethereum é alta ou baixa.

<EnergyConsumptionChart />

O gráfico acima exibe o consumo de energia estimado em TWh/ano para o Ethereum, em comparação com vários outros produtos e indústrias. As estimativas fornecidas são provenientes de informações disponíveis publicamente, acessadas em julho de 2023, com links para as fontes disponíveis na tabela abaixo.

|                     | Consumo de energia anualizado (TWh) | Comparação com o Ethereum PoS |                                                                                      Fonte                                                                                       |
| :------------------ | :---------------------------------: | :------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| Data centers globais |                 190                 |          73.000x           |                                    [fonte](https://www.iea.org/commentaries/data-centres-and-energy-from-global-headlines-to-local-headaches)                                    |
| Bitcoin             |                 149                 |          53.000x           |                                                                 [fonte](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                 |
| Mineração de ouro   |                 131                 |          50.000x           |                                                                 [fonte](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                 |
| Jogos nos EUA\*     |                 34                  |          13.000x           |                 [fonte](https://www.researchgate.net/publication/336909520_Toward_Greener_Gaming_Estimating_National_Energy_Use_and_Energy_Efficiency_Potential)                 |
| Ethereum PoW        |                 21                  |           8.100x           |                                                                    [fonte](https://ccaf.io/cbnsi/ethereum/1)                                                                     |
| Google              |                 19                  |           7.300x           |                                           [fonte](https://www.gstatic.com/gumdrop/sustainability/google-2022-environmental-report.pdf)                                           |
| Netflix             |                0,457                |            176x            | [fonte](https://assets.ctfassets.net/4cd45et68cgf/7B2bKCqkXDfHLadrjrNWD8/e44583e5b288bdf61e8bf3d7f8562884/2021_US_EN_Netflix_EnvironmentalSocialGovernanceReport-2021_Final.pdf) |
| PayPal              |                0,26                 |            100x            |                                 [fonte](<https://s202.q4cdn.com/805890769/files/doc_downloads/global-impact/CDP_Climate_Change_PayPal-(1).pdf>)                                  |
| AirBnB              |                0,02                 |             8x             |                              [fonte](<https://s26.q4cdn.com/656283129/files/doc_downloads/governance_doc_updated/Airbnb-ESG-Factsheet-(Final).pdf>)                              |
| **Ethereum PoS**    |             **0,0026**              |           **1x**           |                                                               [fonte](https://carbon-ratings.com/eth-report-2022)                                                                |

\*Inclui dispositivos de usuário final, como PCs, laptops e consoles de videogame.

Obter estimativas precisas para o consumo de energia é complicado, especialmente quando o que está sendo medido tem uma cadeia de suprimentos complexa ou detalhes de implantação que influenciam sua eficiência. Por exemplo, as estimativas de consumo de energia para a Netflix e o Google variam dependendo se incluem apenas a energia usada para manter seus sistemas e fornecer conteúdo aos usuários (_gasto direto_) ou se incluem o gasto necessário para produzir conteúdo, administrar escritórios corporativos, anunciar, etc. (_gasto indireto_). O gasto indireto também pode incluir a energia necessária para consumir conteúdo em dispositivos de usuário final, como TVs, computadores e celulares.

As estimativas acima não são comparações perfeitas. A quantidade de gastos indiretos contabilizada varia de acordo com a fonte e raramente inclui a energia de dispositivos de usuário final. Cada fonte subjacente inclui mais detalhes sobre o que está sendo medido.

A tabela e o gráfico acima também incluem comparações com o Bitcoin e o Ethereum de Prova de Trabalho (PoW). É importante notar que o consumo de energia das redes de Prova de Trabalho não é estático e muda dia a dia. As estimativas também podem variar amplamente entre as fontes. O tópico atrai um [debate](https://www.coindesk.com/business/2020/05/19/the-last-word-on-bitcoins-energy-consumption/) com muitas nuances, não apenas sobre a quantidade de energia consumida, mas também sobre as fontes dessa energia e a ética relacionada. O consumo de energia não mapeia necessariamente com precisão a pegada ambiental porque diferentes projetos podem usar diferentes fontes de energia, incluindo uma proporção menor ou maior de energias renováveis. Por exemplo, o [Índice de Consumo de Eletricidade do Bitcoin de Cambridge](https://ccaf.io/cbnsi/cbeci/comparisons) indica que a demanda da rede Bitcoin poderia teoricamente ser alimentada por queima de gás ou eletricidade que de outra forma seria perdida na transmissão e distribuição. A rota do Ethereum para a sustentabilidade foi substituir a parte da rede que consome muita energia por uma alternativa verde.

Você pode navegar pelas estimativas de consumo de energia e emissão de carbono para muitas indústrias no [site do Índice de Sustentabilidade da Rede Cambridge Blockchain](https://ccaf.io/cbnsi/ethereum).

## Estimativas por transação {#per-transaction-estimates}

Muitos artigos estimam o gasto de energia "por transação" para blockchains. Isso pode ser enganoso porque a energia necessária para propor e validar um bloco é independente do número de transações dentro dele. Uma unidade de gasto de energia por transação implica que menos transações levariam a um gasto de energia menor e vice-versa, o que não é o caso. Além disso, as estimativas por transação são muito sensíveis a como a vazão de transações de uma blockchain é definida, e ajustar essa definição pode ser manipulado para fazer o valor parecer maior ou menor.

No Ethereum, por exemplo, a vazão de transações não é apenas a da camada base - é também a soma da vazão de transações de todos os seus rollups de "[camada 2 (l2)](/layer-2/)". As camadas 2 geralmente não são incluídas nos cálculos, mas contabilizar a energia adicional consumida pelos sequenciadores (pequena) e o número de transações que eles processam (grande) provavelmente reduziria drasticamente as estimativas por transação. Essa é uma das razões pelas quais as comparações de consumo de energia por transação entre plataformas podem ser enganosas.

## A dívida de carbono do Ethereum {#carbon-debt}

O gasto de energia do Ethereum é muito baixo, mas nem sempre foi assim. O Ethereum usava originalmente a Prova de Trabalho (PoW), que tinha um custo ambiental muito maior do que o atual mecanismo de Prova de Participação (PoS).

Desde o início, o Ethereum planejou implementar um mecanismo de consenso baseado em Prova de Participação, mas fazer isso sem sacrificar a segurança e a descentralização levou anos de pesquisa e desenvolvimento focados. Portanto, um mecanismo de Prova de Trabalho foi usado para iniciar a rede. A Prova de Trabalho exige que os mineradores usem seu hardware de computação para calcular um valor, gastando energia no processo.

![Comparing Ethereum's energy consumption pre- and post-Merge, using the Eiffel Tower (330 meters tall) on the left to symbolize the high energy consumption before The Merge, and a small 4 cm tall Lego figure on the right to represent the dramatic reduction in energy usage after The Merge](energy_consumption_pre_post_merge.png)

O CCRI estima que The Merge reduziu o consumo anualizado de eletricidade do Ethereum em mais de **99,988%**. Da mesma forma, a pegada de carbono do Ethereum diminuiu em aproximadamente **99,992%** (de 11.016.000 para 870 toneladas de CO2e). Para colocar isso em perspectiva, a redução nas emissões é como ir da altura da Torre Eiffel para um pequeno boneco de plástico, conforme ilustrado na figura acima. Como resultado, o custo ambiental de proteger a rede é drasticamente reduzido. Ao mesmo tempo, acredita-se que a segurança da rede tenha melhorado.

## Uma camada de aplicação verde {#green-applications}

Embora o consumo de energia do Ethereum seja muito baixo, há também uma comunidade de [**finanças regenerativas (ReFi)**](/refi/) substancial, crescente e altamente ativa construindo no Ethereum. Os aplicativos ReFi usam componentes de finanças descentralizadas (DeFi) para construir aplicativos financeiros que têm externalidades positivas beneficiando o meio ambiente. ReFi faz parte de um movimento ["solarpunk"](https://en.wikipedia.org/wiki/Solarpunk) mais amplo que está intimamente alinhado com o Ethereum e visa unir o avanço tecnológico e a gestão ambiental. A natureza descentralizada, não permissionada e compunível do Ethereum o torna a camada base ideal para as comunidades ReFi e solarpunk.

Plataformas de financiamento de bens públicos nativas da Web3, como o [Gitcoin](https://gitcoin.co), realizam rodadas climáticas para estimular a construção com consciência ambiental na camada de aplicação do Ethereum. Através do desenvolvimento dessas iniciativas (e outras, por exemplo, [ciência descentralizada (desci)](/desci/)), o Ethereum está se tornando uma tecnologia ambiental e socialmente positiva.

<Alert variant="update">
<AlertEmoji text=":evergreen_tree:" />
<AlertContent>
<AlertDescription>
  Se você acha que esta página pode ser mais precisa, abra uma issue ou um PR. As estatísticas nesta página são estimativas baseadas em dados disponíveis publicamente - elas não representam uma declaração oficial ou promessa da equipe ethereum.org ou da Fundação Ethereum.
</AlertDescription>
</AlertContent>
</Alert>

## Leitura adicional {#further-reading}

- [Índice de Sustentabilidade da Rede Cambridge Blockchain](https://ccaf.io/cbnsi/ethereum)
- [Relatório da Casa Branca sobre blockchains de Prova de Trabalho](https://web.archive.org/web/20221109005700/https://www.whitehouse.gov/wp-content/uploads/2022/09/09-2022-Crypto-Assets-and-Climate-Report.pdf)
- [Emissões do Ethereum: Uma Estimativa Bottom-up](https://kylemcdonald.github.io/ethereum-emissions/) - _Kyle McDonald_
- [Índice de Consumo de Energia do Ethereum](https://digiconomist.net/ethereum-energy-consumption/) - _Digiconomist_
- [ETHMerge.com](https://ethmerge.com/) - _[@InsideTheSim](https://twitter.com/InsideTheSim)_
- [The Merge - Implicações no Consumo de Eletricidade e na Pegada de Carbono da Rede Ethereum](https://carbon-ratings.com/eth-report-2022) - _CCRI_
- [Consumo de energia do Ethereum](https://mirror.xyz/jmcook.eth/ODpCLtO4Kq7SCVFbU4He8o8kXs418ZZDTj0lpYlZkR8)

## Tópicos relacionados {#related-topics}

- [A Beacon Chain](/roadmap/beacon-chain)
- [The Merge](/roadmap/merge/)