---
title: Consumo de energia da Ethereum
description: A informação básica e necessária para entender o consumo de energia da Ethereum.
lang: pt-br
---

# Consumo de energia do Ethereum {#introduction}

Ethereum é uma cadeia de blocos verde. Usa um mecanismo de consenso [prova de participação](/developers/docs/consensus-mechanisms/pos) (proof of stake) que pode ser executado em dispositivos de baixa potência e não requer computação pesada para participar. O mecanismo de prova de participação do Ethereum protege a rede usando ETH de participação em vez de energia gasta, como na [prova de trabalho](/developers/docs/consensus-mechanisms/pow). A mudança para a prova de participação significa que a energia gasta pela rede Ethereum é relativamente pequena – na ordem de 0,01 TWh/ano.

## Consumo energético da prova de participação {#proof-of-stake-energy}

O gasto de energia do Ethereum é aproximadamente igual ao custo de funcionamento de um laptop modesto para cada nó na rede.

Muitos artigos estimam o gasto de energia "por transação" para comparar cadeias de blocos com outros setores. A vantagem disso é que é fácil de entender. Entretanto, estimativas baseadas em transações podem induzir ao erro porque a energia necessária para propor e validar um bloco é independente do número de transações dentro dele. Uma unidade de gasto de energia por transação implica que menos transações levaria a menor gasto de energia e vice-versa, o que não é o caso. Uma estimativa por transação é altamente dependente de como a taxa de transferência de uma transação de cadeia de blocos é definida, e ajustar esta definição pode ser levado a fazer com que o valor pareça maior ou menor.

Por exemplo, no Ethereum, a taxa de transferência da transação não é apenas a da camada base – é também a soma da taxa de transferência da transação de todos os seus rollups da "[camada 2](/layer-2/)", que geralmente não são incluídos nos cálculos e os reduziriam drasticamente. Essa é uma das razões pelas quais as ferramentas que comparam o consumo de energia por transação entre plataformas são enganosas.

Mais relevante é o consumo total de energia e o rastro de carbono da rede como um todo. A partir desses valores, podemos examinar o que essa rede oferece aos seus usuários e à sociedade em geral, e fazer uma avaliação mais holística se esse gasto de energia é justificado ou não. As medições por transação, por outro lado, implicam que o valor da rede vem apenas de seu papel na transferência criptográfica entre contas e proíbe uma análise honesta de custo-benefício.

O [CCRI](https://carbon-ratings.com) (Crypto Carbon Ratings Institute) analisou extensivamente o consumo de eletricidade e a emissão de carbono da rede Ethereum (consulte o relatório [_A Fusão — Implicações no Consumo de Eletricidade e Emissão de Carbono da Rede Ethereum_](https://carbon-ratings.com/eth-report-2022)). O CCRI mediu o consumo de eletricidade de diferentes nós com várias configurações de hardware e software cliente. Isso resultou em uma estimativa de **2,601 MWh** (0,0026 TWh) para o consumo anual de eletricidade da rede no momento da análise (setembro de 2022), o que corresponde a emissões anuais de carbono de **870 toneladas de CO2e**, aplicando a fatores regionais específicos de intensidade de carbono.

[A Digiconomist fornece as pegadas de carbono e de consumo de energia de toda a rede para Bitcoin e Ethereum](https://digiconomist.net/ethereum-energy-consumption). No momento da redação deste artigo, o Bitcoin gasta cerca de 200 TWh/ano de energia e emite cerca de 100 MT (megatons) de carbono por ano, enquanto gera cerca de 32.000 T de resíduos elétricos de hardware obsoleto anualmente. Em comparação, o gasto total de energia para proteger o Ethereum está mais próximo de **0,01 TWh/ano**.

<EnergyConsumptionChart />

A figura acima mostra o consumo anual de energia estimado em TWh/ano para vários setores (recuperado em junho de 2022). _Observe que as estimativas apresentadas no gráfico são de fontes publicamente disponíveis vinculadas no texto abaixo. Elas são ilustrativas e não representam uma estimativa, promessa nem previsão oficial._

Para colocar o consumo de energia do Ethereum no contexto, podemos comparar estimativas anualizadas para outros setores. Considerando que o Ethereum é uma plataforma que visa manter com segurança ativos digitais como investimentos, talvez possamos compará-la com mineração de ouro, cujo gasto é estimado em cerca de [240 TWh/ano](https://www.kitco.com/news/2021-05-17/Gold-s-energy-consumption-doubles-that-of-bitcoin-Galaxy-Digital.html). Como uma plataforma de pagamentos digitais, talvez possamos compará-la com o PayPal (cujo consumo é estimado em de cerca de [0,26 TWh/ano](https://app.impaakt.com/analyses/paypal-consumed-264100-mwh-of-energy-in-2020-24-from-non-renewable-sources-27261)). Como plataforma de entretenimento, talvez possamos comparar com a indústria de jogos, cujo gasto é estimado em cerca de [34 TW/ano](https://www.researchgate.net/publication/336909520_Toward_Greener_Gaming_Estimating_National_Energy_Use_and_Energy_Efficiency_Potential) _somente nos Estados Unidos_. As estimativas de consumo energético da Netflix variam drasticamente entre [cerca de 0,45 TWhr/ano](https://s22.q4cdn.com/959853165/files/doc_downloads/2020/02/0220_Netflix_EnvironmentalSocialGovernanceReport_FINAL.pdf) (estimativas próprias reportadas em 2019) até cerca de 94 TWh/ano (estimado pelo [Shift Project](https://theshiftproject.org/en/article/unsustainable-use-online-video/)) — há alguma discussão sobre as suposições subjacentes a essas estimativas disponíveis em [Carbon Brief](https://www.carbonbrief.org/factcheck-what-is-the-carbon-footprint-of-streaming-video-on-netflix). Como alternativa, o Ethereum pode ser comparado ao Youtube, que estima gastar cerca de [244 TWh/ano](https://thefactsource.com/how-much-electricity-does-youtube-use/), embora esses valores dependam muito do tipo de dispositivo em que os vídeos são transmitidos e da eficiência energética da infraestrutura subjacente, como os centros de dados. As estimativas do gasto de energia do YouTube foram divididas por canais e vídeos individuais. [Essas estimativas](https://thefactsource.com/how-much-electricity-does-youtube-use/) implicam que as pessoas consumiram 45 vezes mais energia assistindo Gangnam Style em 2019 do que as provas de participação Ethereum usam em um ano.

## Uma camada de aplicação verde {#green-applications}

Embora o consumo de energia do Ethereum seja muito baixo, há também uma comunidade sobre **finanças regenerativas (ReFi)** substancial, crescente e altamente ativa construída no Ethereum. Os aplicativos ReFi usam componentes DeFi para construir aplicativos financeiros que têm externalidades positivas que beneficiam o ambiente. O ReFi faz parte de um movimento ["solarpunk"](https://en.wikipedia.org/wiki/Solarpunk) mais amplo que está intimamente alinhado com o Ethereum e visa unir o avanço tecnológico e a gestão ambiental. A natureza descentralizada, sem permissão e composta do Ethereum faz dele a camada base ideal para as comunidades ReFi e solarpunk. Por meio do desenvolvimento destes (e outros, por exemplo, [DeSci](/desci/)), o Ethereum está se tornando uma tecnologia ambiental e socialmente positiva.

## Déficit de carbono do Ethereum {#carbon-debt}

O gasto atual de energia do Ethereum é muito baixo, mas nem sempre foi assim. O Ethereum mudou seu mecanismo de consenso de prova de participação no 3.º trimestre de 2022. No entanto, o Ethereum usou um mecanismo de prova de trabalho de 2014 a 2022, que teve um custo ambiental muito maior.

Desde seu início, o Ethereum pretendia implementar um mecanismo de consenso de prova de participação, mas fazê-lo sem sacrificar a segurança e a descentralização levou anos de pesquisa e desenvolvimento focalizados. Portanto, um mecanismo de prova de trabalho foi usado para iniciar a rede. O consenso de prova de trabalho exige que os mineradores usem seu hardware de computação para resolver um enigma, gastando energia no processo. A solução para o enigma prova que a energia foi gasta pelo minerador, demonstrando que eles investiram valor no mundo real pelo direito de adicionar à cadeia de blocos. O consumo total de energia do Ethereum atingiu seu pico durante o ápice do mercado em alta de criptomoedas em fevereiro de 2022, com pouco menos de 94 TWh/ano. No verão anterior à mudança para a prova de participação, o consumo de energia estava próximo de 60 TWh/ano, comparável ao do Uzbequistão, com uma emissão de carbono equivalente à do Azerbaijão (33 MT/ano).

O [CCRI](https://carbon-ratings.com) examinou o impacto da fusão do Ethereum, da prova de trabalho para a prova de participação; os resultados sublinharam o impacto significativo da mudança do protocolo de consenso: o consumo anual de eletricidade foi reduzido de 22.900.320 MWh para 2.601 MWh e, portanto, mais de **99,988%**. Da mesma forma, a emissão de carbono do Ethereum foi reduzida em aproximadamente **99,992%** (de 11.016.000 para 870 toneladas de CO2e). Representado metaforicamente, isso corresponde a uma redução nas emissões da altura da Torre Eiffel para uma pequena figura de brinquedo de plástico, como mostra a figura abaixo.

![Comparação do consumo de energia do Ethereum antes e depois da Fusão. Exibe, à esquerda, a torre Eiffel com 330 metros de altura e, à direita, uma figura de brinquedo de plástico com 4 cm de altura dentro de uma lupa.](energy_consumption_pre_post_merge.png)

Tanto a prova de trabalho quanto a prova de participação são apenas mecanismos para decidir quem adiciona o próximo bloco. Trocar a prova de trabalho por prova de participação, em que o valor real investido vem do ETH colocado em participação diretamente em um contrato inteligente, elimina a necessidade de queima de energia pelos mineradores para adicionar à cadeia de blocos. Portanto, o custo ambiental de proteção da rede é drasticamente reduzido.

## Por que a prova de participação é mais ecológica do que a prova de trabalho? {#why-pos-is-greener-than-pow}

A prova de trabalho é uma maneira sólida de proteger a rede. As transações na cadeia de blocos Ethereum no sistema de prova de trabalho anterior foram validadas por [mineradores](/developers/docs/consensus-mechanisms/pow/mining). Os mineradores empacotaram as transações em blocos ordenados e as adicionaram à cadeia de blocos Ethereum. Os novos blocos foram transmitidos para todos os outros operadores de nós que executam as transações de forma independente e verificam se são válidas. Qualquer desonestidade apareceu como uma inconsistência entre diferentes nós. Blocos honestos foram adicionados à blockchain e se tornaram uma parte imutável da história. A capacidade de qualquer minerador de adicionar novos blocos só funciona se houver um custo associado à mineração e uma imprevisibilidade sobre qual será o nó específico que enviará o próximo bloco. Essas condições são atendidas pela imposição da prova de trabalho. Para ser elegível ao envio de um bloco de transações, um minerador deve ser o primeiro a enviar a solução para um enigma computacionalmente caro. Para assumir com sucesso o controle da cadeia de blocos, um minerador desonesto teria que vencer consistentemente a corrida da prova de trabalho, investindo em hardware e energia suficientes para superar a maioria dos outros mineradores.

Este mecanismo de segurança da rede é problemático por várias razões. Primeiro, os mineradores aumentariam suas chances de sucesso investindo em hardwares mais poderosos, criando condições para uma disputa acirrada com os mineradores, que adquirem equipamentos de mineração cada vez mais famintos por energia. Isso aumentou o consumo de energia da rede e gerou desperdício de hardware. Em segundo lugar, o protocolo de prova de trabalho do Ethereum (antes da transição para prova de participação) tinha um consumo total anual de energia aproximadamente igual ao da Finlândia <sup>[^1]</sup> e uma pegada de carbono semelhante à da Suíça <sup>[^1]</sup>.

A prova de participação usa validadores em vez de mineradores. Os validadores desempenham a mesma função que os mineradores, exceto que, em vez de gastar seus ativos antecipadamente como gasto de energia, eles participam com o ETH como garantia contra comportamentos desonestos. Este ETH de participação pode ser destruído se o validador agir de forma desonesta, com penalidades mais severas para ações mais nefastas. Isso incentiva fortemente a participação ativa e honesta na segurança da rede sem exigir grandes gastos de energia. Como quase toda a energia gasta para proteger a rede de prova de trabalho veio do algoritmo de mineração, a mudança para prova de participação reduziu drasticamente o gasto de energia. Além disso, não há vantagens em investir em hardware mais poderoso na prova de participação, portanto, não há condição de disputas acirradas e menos desperdício eletrônico. Os validadores Ethereum podem ser executados em laptops típicos ou dispositivos de baixo consumo de energia, como um [Raspberry Pi](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/index.html).

Leia mais sobre [como o Ethereum implementa a prova de participação](/developers/docs/consensus-mechanisms/pos) e como ele se compara à prova de trabalho.

<InfoBanner emoji=":evergreen_tree:">
  Se você acha que essas estatísticas estão incorretas ou podem ser mais precisas, abra um problema ou PR. Estas são estimativas da equipe da ethereum.org feitas usando informações acessíveis ao público e o atual roadmap do Ethereum. Essas afirmações não representam uma promessa oficial da Fundação Ethereum. 
</InfoBanner>

## Leia mais {#further-reading}

- [Melhor eficiência energética do Ethereum](https://blog.ethereum.org/2021/05/18/country-power-no-more/) – _Carl Beekhuizen, 18 de maio de 2021_
- [Consumo de energia do Ethereum](https://mirror.xyz/jmcook.eth/ODpCLtO4Kq7SCVFbU4He8o8kXs418ZZDTj0lpYlZkR8)
- [Emissões do Ethereum: uma estimativa minuciosa](https://kylemcdonald.github.io/ethereum-emissions/) _ Kyle McDonald_
- [Índice de consumo de energia do Ethereum](https://digiconomist.net/ethereum-energy-consumption/) – _Digiconomist_
- [ETHMerge.com](https://ethmerge.com/) — _[@InsideTheSim](https://twitter.com/InsideTheSim)_
- [A Fusão — As Implicações no Consumo de Eletricidade e Emissão de Carbono da Rede Ethereum](https://carbon-ratings.com/eth-report-2022) - _CCRI_

## Tópicos relacionados {#related-topics}

- [Visão do Ethereum](/roadmap/vision/)
- [A Beacon Chain](/upgrades/beacon-chain)
- [The Merge (A Fusão)](/upgrades/merge/)
- [Fragmentação](/upgrades/beacon-chain/)
