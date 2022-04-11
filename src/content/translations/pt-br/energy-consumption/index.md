---
title: Consumo de energia da Ethereum
description: A informação básica e necessária para entender o consumo de energia da Ethereum.
lang: pt-br
sidebar: true
---

# Consumo de energia do Ethereum {#introduction}

Atualmente, a despesa de energia da Ethereum por meio da [prova de trabalho](/developers/docs/consensus-mechanisms/#proof-of-work) é demasiado alta e insustentável. A resolução das preocupações relativas a tais despesas energéticas, sem sacrificar segurança e descentralização, é um desafio técnico significativo, o qual tem sido foco de investigação e desenvolvimento durante anos. Vejamos por que o funcionamento atual da Ethereum tem um alto impacto ambiental, e como a próxima atualização da rede para [prova de participação](/developers/docs/consensus-mechanisms/pos) mudará drasticamente esse problema.

## A energia segura a rede {#energy-secures-the-network}

As transações no blockchain de Ethereum são validadas pelos [mineradores](/developers/docs/consensus-mechanisms/pow/mining). Os mineradores empacotam as transações em blocos ordenados e os adicionam ao blockchain de Ethereum. Os novos blocos são transmitidos para o resto dos operadores de nós, que executam as transações independentemente e verificam sua validez. Qualquer desonestidade mostraria uma inconsistência entre nós diferentes. Desta maneira, apenas os blocos honestos são adicionados à blockchain, tornando-se imutáveis.

A capacidade de qualquer minerador para adicionar novos blocos só funciona se houver um custo associado à mineração e uma imprevisibilidade sobre qual será o nó específico que enviará o próximo bloco. Estas condições são satisfeitas impondo a prova de trabalho (PoW). Para ser elegível para enviar um bloco de transações, um minerador deve resolver um quebra-cabeça computacional arbitrário mais rápido do que qualquer outro minerador. A resolução deste quebra-cabeças cria concorrência entre os mineradores e os custos sob a forma de despesas de energia. Para enganar a blockchain, um minerador desonesto teria que ganhar consistentemente a corrida da prova de trabalho, o que é muito improvável e preventivamente caro.

Ethereum tem usado a prova de trabalho desde sua origem. A migração da prova de trabalho para a prova de participação sempre foi um objetivo fundamental da Ethereum. No entanto, desenvolver um sistema de prova de participação que adira aos princípios fundamentais da Ethereum de segurança e descentralização não é trivial. Isto tem exigido muita pesquisa e avanços em criptografia, criptoeconomia e “design” de mecanismo para chegar a um ponto em que a transição seja possível.

## Consumo de energia da prova de trabalho {#proof-of-work}

A prova de trabalho é uma forma robusta de proteger a rede e impor mudanças honestas no blockchain. Entretanto, é problemática por várias razões. Visto que o direito de minerar um bloco requer a resolução de um desafio computacional arbitrário, os mineradores podem aumentar suas chances de sucesso investindo em hardware mais poderoso. Estes incentivos provocam uma corrida frenética entre os mineradores, que adquirem equipamentos de mineração que consomem cada vez mais. De fato, atualmente, o consumo anual de energia do protocolo de prova de trabalho do Ethereum é aproximadamente igual ao da Finlândia <sup>[^1]</sup> e a pegada de carbono é semelhante a da Suíça<sup>[^1]</sup>.

## Prova de participação {#proof-of-stake}

Um futuro mais ecológico já está sendo construído mediante um algoritmo de [**prova de participação (PoS)**](/upgrades/beacon-chain/). Sob a [prova de participação](/developers/docs/consensus-mechanisms/pos/), a resolução arbitrária do quebra-cabeças se torna desnecessária. Encontrar uma solução para o problema reduz consideravelmente os gastos de energia necessários para segurar a rede. Na prova de participação, os mineradores são substituídos por validadores, os quais desempenham a mesma função, exceto que, em vez de estes investirem seu capital em favor de um maior trabalho computacional, o investem fazendo stake de ETH como garantia (colateral) contra comportamentos desonestos. Se o validador está offline (quando se espera que ele cumpra alguma tarefa de validador) o ETH que emprestou pode diminuir lentamente. Já um comportamento comprovadamente desonesto resulta na remoção do ativos reservados. Isto incentiva uma participação ativa e honesta, para proteger a rede.

De maneira similar à prova de trabalho, uma entidade maliciosa precisaria de, pelo menos, 51% do ETH emprestado na rede para efetuar um [ataque de 51%](/glossary/#51-attack). No entanto, ao contrário da prova de trabalho, na qual a perda potencial de um ataque falho seria apenas o custo energético de haver gerado o hash requerido para a mineração, na prova de participação, a perda potencial de tal ataque seria a quantidade total de ETH usado como garantia. Esta estrutura de desincentivo permite a segurança da rede com prova de participação enquanto elimina a necessidade de gastar energia em computação arbitrária. Explicações detalhadas com respeito à segurança da rede sob o conceito de prova de participação podem ser encontradas [aqui](/developers/docs/consensus-mechanisms/pos/) e [aqui](https://vitalik.ca/general/2017/12/31/pos_faq.html).

## A integração {#the-merge}

Há uma cadeia funcional com base no protocolo de prova de participação denominada [Beacon Chain](/upgrades/beacon-chain/) que vem sendo executada desde dezembro de 2020 e que está demonstrando a viabilidade desse protocolo. A integração entre as duas cadeias se dará quando o Ethereum deixe de usar a prova de trabalho e adote completamente a prova de participação. Espera-se que essa integração ocorra no 2º trimestre de 2022. [Mais sobre a integração](/upgrades/merge/).

## Consumo energético da prova de participação {#proof-of-stake-energy}

Além de tornar o conceito de prova de participação mais confiável, a Beacon Chain também permitirá avaliar o uso de energia do Ethereum após a integração. Uma [estimativa recente](https://blog.ethereum.org/2021/05/18/country-power-no-more/) sugeriu que a mudança para a prova de participação poderia resultar em uma redução de 99,95% no consumo total de energia. Ou seja, a prova de participação seria 2.000 vezes mais eficiente do ponto de vista energético do que a prova de trabalho. Desta maneira, o consumo de energia do Ethereum seria aproximadamente igual ao custo de usar um computador pessoal de escritório para cada nó da rede.

![imagem](./energy_use_per_transaction.png)

<p style="text-align: center;"><small><i>As estimativas do consumo energético da prova de trabalho (PoW) por transação mostradas neste imagem se baseiam em <a href="https://blog.ethereum.org/2021/05/18/country-power-no-more/" target="_blank" rel="noopener noreferrer">dados de maio de 2021</a>, os quais sugerem um consumo de até <a href="https://digiconomist.net/ethereum-energy-consumption" target="_blank" rel="noopener noreferrer">175,56 kWh</a></i></small></p>

Vamos comparar esses números com um serviço como a Visa. 100.000 transações da Visa usam 149 kWh de energia<sup>[^2]</sup>. Assumindo que a fragmentação foi implementada, a taxa de transação atual do Ethereum (15 transações por segundo) será aumentada em pelo menos 64 vezes (equivalente ao número de fragmentos). Isso sem contabilizar a otimização adicional proporcionada pelos rollups. Uma estimativa realista para o Ethereum após a integração, usando a fragmentação e os rollups, seria de [25.000 a 100.000](https://twitter.com/VitalikButerin/status/1312905884549300224?s=20) transações por segundo. Podemos usar essa informação para estimar a despesa máxima e mínima de energia por cada 100.000 transações.

- `25.000` transações por segundo.
- `100.000/25.000 = 4` segundos para processar 100.000 transações.

Podemos também avaliar o consumo energético do Ethereum por segundo fazendo uma estimativa conservadora de que 10.000 validadores ativos estão protegendo a rede (na verdade, há mais de [250.000 validadores na Beacon Chain](https://beaconscan.com/)no momento, mas muitos deles podem operar em um único nó; de fato, estima-se que há atualmente entre 3.000 e 4.000 nós individuais, portanto 10.000 é uma estimativa conservadora após a integração):

`uso diário de 1,44 kWh * 10.000 nós de rede = 14.400 kWh` por dia. Um dia tem 86.400 segundos, logo `14.400 kWh/86.400 s = 0,1667 kWh` por segundo.

Se multiplicamos isso pela quantidade de tempo que leva para processar 100.000 transações, temos `0,1667 kWh * 4 = 0,667 kWh`.

Isso equivale a ~0,4% da energia utilizada pela Visa para o mesmo número de transações, ou seja, uma redução do consumo energético por um fator de ~225 em comparação com a rede atual baseada na prova de trabalho do Ethereum.

Repetindo o cálculo para o máximo de transações por segundo, temos 0,1667 kWh/s, o que representa cerca de 0,1% das despesas energéticas da Visa, ou seja, uma redução de ~894.

_Nota: não é tão preciso comparar em base ao número de transações, já que o uso de energia no Ethereum é atrelado ao tempo. De fato, o uso de energia do Ethereum é o mesmo durante 1 minuto, independentemente de se são executadas 1 ou 1.000 transações._

_Também devemos considerar que o Ethereum não está limitado a simples transações financeiras, mas também é uma plataforma completa criadas para contratos inteligentes e aplicativos descentralizados._

## Um Ethereum mais ecológico {#green-ethereum}

Embora a energia consumida pelo Ethereum seja substancial, investimos muito tempo de desenvolvimento e conhecimento para fazer a transição da validação de blocos de alto consumo energético para uma que faça um uso mais eficiente de energia. Para citar [Bankless,](http://podcast.banklesshq.com/), a melhor maneira de reduzir a energia consumida pela prova de trabalho é simplesmente "deixar de usá-la", e essa é a abordagem que o Ethereum se comprometeu a adotar.

<InfoBanner emoji=":evergreen_tree:">
  Se você acha que essas estatísticas estão incorretas ou podem ser mais precisas, abra um problema ou PR. Estas são estimativas da equipe da ethereum.org feitas usando informações acessíveis ao público e o atual roadmap do Ethereum. Essas afirmações não representam uma promessa oficial da Fundação Ethereum. 
</InfoBanner>

## Leitura adicional {#further-reading}

- [Melhor eficiência energética do Ethereum](https://blog.ethereum.org/2021/05/18/country-power-no-more/) (em inglês) – _Carl Beekhuizen, 18 de maio de 2021_
- [Emissões do Ethereum: uma estimativa minuciosa](https://kylemcdonald.github.io/ethereum-emissions/) _ Kyle McDonald_
- [Índice de consumo de energia do Ethereum](https://digiconomist.net/ethereum-energy-consumption/) – _Digiconomist_
- [ETHMerge.com](https://ethmerge.com/) — _[@InsideTheSim](https://twitter.com/InsideTheSim)_

## Tópicos relacionados {#related-topics}

- [Visão do Ethereum](/upgrades/vision/)
- [A Beacon Chain](/upgrades/beacon-chain)
- [A integração](/upgrades/merge/)
- [Fragmentação](/upgrades/beacon-chain/)

### Notas de rodapé e fontes {#footnotes-and-sources}

#### 1. Consumo de energia da prova de trabalho do Ethereum {#fn-1}

[Consumo de energia por país inc. Ethereum (TWh anual)](https://digiconomist.net/ethereum-energy-consumption)

#### 2. Consumo de energia da Visa {#fn-2}

[Consumo médio de energia da rede Bitcoin por transação em comparação com a rede VISA a partir de 2020, Statista](https://www.statista.com/statistics/881541/bitcoin-energy-consumption-transaction-comparison-visa/)

[Relatório financeiro da Visa, 4º trimestre de 2020](https://s1.q4cdn.com/050606653/files/doc_financials/2020/q4/Visa-Inc.-Q4-2020-Operational-Performance-Data.pdf)
