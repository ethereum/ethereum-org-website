---
title: Consumo de energia da Ethereum
description: A informação básica e necessária para entender o consumo de energia da Ethereum.
lang: pt-br
---

# Consumo de energia do Ethereum {#introduction}

Ethereum é um blockchain verde. Usa um mecanismo de consenso [prova de participação](/developers/docs/consensus-mechanisms/pos) (proof of stake) que pode ser executado em dispositivos de baixa potência e não requer computação pesada para participar. O mecanismo de prova de participação do Ethereum protege a rede usando ETH envolvidos em vez de energia gasta, como em [prova de trabalho](/developers/docs/consensus-mechanisms/pos) (proof of work). A mudança para a prova de participação significa que a energia gasta pela rede Ethereum é relativamente pequena – na ordem de 0,01 TWh/ano.

## Consumo energético da prova de participação {#proof-of-stake-energy}

O gasto de energia do Ethereum é aproximadamente igual ao custo de funcionamento de um laptop modesto para cada nó na rede.

Muitos artigos estimam o gasto de energia "por transação" para comparar blockchain com outros setores. A vantagem disso é que é fácil de entender. Entretanto, estimativas baseadas em transações podem induzir ao erro porque a energia necessária para propor e validar um bloco é independente do número de transações dentro dele. Uma unidade de gasto de energia por transação implica que menos transações levaria a menor gasto de energia e vice-versa, o que não é o caso. Uma estimativa por transação é altamente dependente de como a taxa de transferência de uma transação blockchain é definida, e ajustar esta definição pode ser levado a fazer com que o valor pareça maior ou menor.

Por exemplo, no Ethereum, a taxa de transferência da transação não é apenas a da camada base – é também a soma da taxa de transferência da transação de todos os seus rollups da "[camada 2](/layer-2/)", que geralmente não são incluídos nos cálculos e os reduziriam drasticamente. Essa é uma das razões pelas quais as ferramentas que comparam o consumo de energia por transação entre plataformas são enganosas.

Mais relevante é o consumo total de energia e o rastro de carbono da rede como um todo. A partir desses valores, podemos examinar o que essa rede oferece aos seus usuários e à sociedade em geral, e fazer uma avaliação mais holística se esse gasto de energia é justificado ou não. As medições por transação, por outro lado, implicam que o valor da rede vem apenas de seu papel na transferência criptográfica entre contas e proíbe uma análise honesta de custo-benefício.

[Digiconomist fornece o consumo de energia de toda a rede e sinais de carbono para Bitcoin e Ethereum](https://digiconomist.net/ethereum-energy-consumption). No momento da redação deste artigo, o Bitcoin gasta cerca de 200 TWh/ano de energia e emite cerca de 100 MT (megatons) de carbono por ano, enquanto gera cerca de 32.000 T de resíduos elétricos de hardware obsoleto anualmente. Em comparação, o gasto total de energia para proteger o Ethereum está mais próximo de **0.01 TWh/ano**.

![Comparação das despesas de energia entre setores](./energy.png)

A figura acima mostra o consumo anual de energia estimado em TWh/ano para vários setores (recuperado em Junho de 2022). _Observe que as estimativas apresentadas no gráfico são de fontes publicamente disponíveis vinculadas no texto abaixo. São ilustrativas e não representam uma estimativa, promessa nem previsão oficial._

Para colocar o consumo de energia do Ethereum no contexto, podemos comparar estimativas anualizadas para outros setores. Considerando o Ethereum uma plataforma para manter com segurança ativos digitais como investimentos, talvez possamos comparar com a mineração de ouro, o qual estima-se gastar cerca de [240 TWh/ano](https://www.kitco.com/news/2021-05-17/Gold-s-energy-consumption-doubles-that-of-bitcoin-Galaxy-Digital.html). Como uma plataforma de pagamentos digitais, talvez possamos comparar com o PayPal (estima-se um consumo de cerca de [0,26 TWh/ano](https://app.impaakt.com/analyses/paypal-consumed-264100-mwh-of-energy-in-2020-24-from-non-renewable-sources-27261)). Como plataforma de entretenimento, talvez possamos comparar com o setor de jogos, que estima gastar cerca de [34 TW/ano](https://www.researchgate.net/publication/336909520_Toward_Greener_Gaming_Estimating_National_Energy_Use_and_Energy_Efficiency_Potential). As estimativas de consumo energético da Netflix variam drasticamente entre [cerca de 0,45TWhr/ano](https://s22.q4cdn.com/959853165/files/doc_downloads/2020/02/0220_Netflix_EnvironmentalSocialGovernanceReport_FINAL.pdf) (estimativas próprias relatadas em 2019) até cerca de 94 TWh/ano (estimado pelo [Shift Project](https://theshiftproject.org/en/article/unsustainable-use-online-video/)) - há alguma discussão sobre as suposições subjacentes a essas estimativas disponíveis em [Carbon Brief](https://www.carbonbrief.org/factcheck-what-is-the-carbon-footprint-of-streaming-video-on-netflix). Como alternativa, o Ethereum pode ser comparado ao Youtube, que estima gastar cerca de [244 TWh/ano](https://thefactsource.com/how-much-electricity-does-youtube-use/), embora esses valores dependam muito do tipo de dispositivo em que os vídeos transmitidos e da eficiência energética da infraestrutura subjacente, nos centros de dados. As estimativas do gasto de energia do YouTube foram divididas por canais e vídeos individuais. [Essas estimativas](https://thefactsource.com/how-much-electricity-does-youtube-use/) implicam que as pessoas consumiram 45 vezes mais energia assistindo Gangnam Style em 2019 do que provas de participação Ethereum usam em um ano.

## Uma camada de aplicação verde {#green-applications}

Embora o consumo de energia do Ethereum seja muito baixo, há também uma comunidade sobre **finanças regenerativas (ReFi)** substancial, crescente e altamente ativa construída no Ethereum. Os aplicativos ReFi usam componentes DeFi para construir aplicativos financeiros que têm externalidades positivas que beneficiam o meio ambiente. O ReFi faz parte de um movimento ["solarpunk"](https://en.wikipedia.org/wiki/Solarpunk) mais amplo que está intimamente alinhado com o Ethereum e visa unir o avanço tecnológico e a gestão ambiental. A natureza descentralizada, sem permissão e combinável do Ethereum faz dele a camada base ideal para as comunidades ReFi e solarpunk. Por meio do desenvolvimento destes (e outros, por exemplo, [DeSci](/desci/)), o Ethereum está se tornando uma tecnologia ambiental e socialmente positiva.

## Déficit de carbono do Ethereum {#carbon-debt}

O gasto atual de energia do Ethereum é muito baixo, mas nem sempre foi assim. O Ethereum mudou seu mecanismo de consenso de prova de participação (proof of stake) no 3.º trimestre de 2022. Entretanto, o Ethereum usou um mecanismo de prova de trabalho (proof of work) de 2014-2022, que teve um custo ambiental muito maior.

Desde seu início, o Ethereum pretendia implementar um mecanismo de consenso de prova de participação, mas fazê-lo sem sacrificar a segurança e a descentralização levou anos de pesquisa e desenvolvimento focados. Portanto, um mecanismo de prova de trabalho foi usado para iniciar a rede. O consenso de prova de trabalho exige que os mineradores usem seu hardware de computação para resolver um enigma, gastando energia no processo. A solução para o enigma prova que a energia foi gasta pelo minerador, demonstrando que eles investiram valor no mundo real pelo direito de adicionar à blockchain. O consumo total de energia do Ethereum atingiu seu pico durante o ápice do mercado em alta de criptomoedas em fevereiro de 2022, a pouco menos de 94 TWh/ano. No verão anterior à mudança para a prova de participação, o consumo de energia estava próximo de 60 TWh/ano, comparável ao do Uzbequistão, com uma emissão de carbono equivalente à do Azerbaijão (33 MT/ano).

Tanto a prova de trabalho quanto a prova de participação são apenas mecanismos para decidir quem adiciona o próximo bloco. Trocar a prova de trabalho por prova de participação, em que o valor real investido vem do ETH colocado em stake diretamente em um contrato inteligente, elimina a necessidade de queima de energia pelos mineradores para adicionar à blockchain. Portanto, o custo ambiental de proteção da rede é drasticamente reduzido.

## Por que a prova de participação é mais ecológica do que a prova de trabalho? {#why-pos-is-greener-than-pow}

A prova de trabalho é uma forma robusta de proteger a rede. As transações no blockchain Ethereum sob o sistema de prova de trabalho anterior foram validadas por [mineradores](/developers/docs/consensus-mechanisms/pow/mining). Os mineradores empacotam as transações em blocos ordenados e os adicionaram ao blockchain Ethereum. Os novos blocos foram transmitidos para todos os outros operadores de nós que executam as transações de forma independente e verificam se são válidas. Qualquer desonestidade apareceu como uma inconsistência entre diferentes nós. Blocos honestos foram adicionados ao blockchain e se tornaram uma parte imutável da história. A capacidade de qualquer minerador para adicionar novos blocos só funciona se houver um custo associado à mineração e uma imprevisibilidade sobre qual será o nó específico que enviará o próximo bloco. Essas condições são atendidas pela imposição da prova de trabalho. Para ser elegível ao envio de um bloco de transações, um minerador deve ser o primeiro a enviar a solução para um enigma computacionalmente caro. Para assumir com sucesso o controle do blockchain, um minerador desonesto teria que vencer consistentemente a corrida de prova de trabalho, investindo em hardware e energia suficientes para superar a maioria dos outros mineradores.

Este mecanismo de segurança da rede é problemático por várias razões. Primeiro, os mineradores aumentariam suas chances de sucesso investindo em hardwares mais poderosos, criando condições para uma disputa acirrada com os mineradores adquirindo equipamentos de mineração cada vez mais famintos por energia. Isso aumentou o consumo de energia da rede e gerou desperdício de hardware. Em segundo lugar, o protocolo de prova de trabalho do Ethereum (antes da transição para prova de participação) tinha um consumo total anual de energia aproximadamente igual ao da Finlândia <sup>[^1]</sup> e um rastro de carbono semelhante à Suíça <sup>[^1]</sup>.

A prova de participação usa validadores em vez de mineradores. Os validadores desempenham a mesma função que os mineradores, exceto que, em vez de gastar seus ativos antecipadamente como gasto de energia, eles fazem staking do ETH como garantia contra comportamentos desonestos. Este ETH em staking pode ser destruído se o validador agir de forma desonesta, com penalidades mais severas para ações mais nefastas. Isso incentiva fortemente a participação ativa e honesta na segurança da rede sem exigir grandes gastos de energia. Como quase toda a energia gasta para proteger a rede de prova de trabalho veio do algoritmo de mineração, a mudança para prova de participação reduziu drasticamente o gasto de energia. Além disso, não há benefício em investir em hardware mais poderoso sob prova de participação, portanto, não há condição de dipustas acirradas e menos desperdício eletrônico. Os validadores Ethereum podem ser executados em laptops ou dispositivos de baixo consumo de energia, como um [Raspberry Pi](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/user-guide/ethereum2.0.html).

Leia mais sobre [como o Ethereum implementa o proof-of-stake](/developers/docs/consensus-mechanisms/pos) e como ele se compara à proof-of-work.

<InfoBanner emoji=":evergreen_tree:">
  Se você acha que essas estatísticas estão incorretas ou podem ser mais precisas, abra um problema ou PR. Estas são estimativas da equipe da ethereum.org feitas usando informações acessíveis ao público e o atual roadmap do Ethereum. Essas afirmações não representam uma promessa oficial da Fundação Ethereum. 
</InfoBanner>

## Leia mais {#further-reading}

- [Melhor eficiência energética do Ethereum](https://blog.ethereum.org/2021/05/18/country-power-no-more/) – _Carl Beekhuizen, 18 de maio de 2021_
- [Consumo de energia do Ethereum](https://mirror.xyz/jmcook.eth/ODpCLtO4Kq7SCVFbU4He8o8kXs418ZZDTj0lpYlZkR8)
- [Emissões do Ethereum: uma estimativa minuciosa](https://kylemcdonald.github.io/ethereum-emissions/) _ Kyle McDonald_
- [Índice de consumo de energia do Ethereum](https://digiconomist.net/ethereum-energy-consumption/) – _Digiconomist_
- [ETHMerge.com](https://ethmerge.com/) — _[@InsideTheSim](https://twitter.com/InsideTheSim)_

## Tópicos relacionados {#related-topics}

- [Visão do Ethereum](/upgrades/vision/)
- [A Beacon Chain](/upgrades/beacon-chain)
- [The Merge (A Fusão)](/upgrades/merge/)
- [Fragmentação](/upgrades/beacon-chain/)
