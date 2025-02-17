---
title: Prova de trabalho (PoW)
description: Uma explicação do protocolo de consenso de prova de trabalho e seu papel no Ethereum.
lang: pt-br
---

A rede Ethereum começou usando um mecanismo de consenso que envolvia **[Prova de trabalho (PoW)](/developers/docs/consensus-mechanisms/pow)**. Isso permitiu que os nós da rede Ethereum concordassem com o estado de todas as informações registradas na cadeia de blocos Ethereum e impediu certos tipos de ataques econômicos. No entanto, o Ethereum desativou a prova de trabalho em 2022 e começou a usar a [prova de participação](/developers/docs/consensus-mechanisms/pos).

<InfoBanner emoji=":wave:">
    A prova de trabalho agora está obsoleta. O Ethereum não usa mais a prova de trabalho como parte de seu mecanismo de consenso. Em vez disso, ele usa a prova de participação. Leia mais sobre <a href="/developers/docs/consensus-mechanisms/pos/">prova de participação</a> e <a href="/staking/">participação</a>.
</InfoBanner>

## Pré-requisitos {#prerequisites}

Para entender melhor esta página, recomendamos ler primeiro sobre [ transações ](/developers/docs/transactions/), [blocos](/developers/docs/blocks/) e [mecanismos de consenso](/developers/docs/consensus-mechanisms/).

## O que é prova de trabalho (PoW)? {#what-is-pow}

O consenso de Nakamoto, que utiliza prova de trabalho, é o mecanismo que uma vez permitiu que a rede descentralizada Ethereum chegasse a um consenso (ou seja, todos os nós concordam) em coisas como saldos de contas e a ordem das transações. Isso impediu os usuários de "gastar duas vezes" suas moedas e garantiu que a cadeia Ethereum se tornasse tremendamente difícil de atacar ou manipular. Essas propriedades de segurança agora vêm da prova de participação usando o mecanismo de consenso conhecido como [Gasper](/developers/docs/consensus-mechanisms/pos/gasper/).

## Prova de trabalho e mineração {#pow-and-mining}

A prova de trabalho é o algoritmo subjacente que define a dificuldade e as regras para os mineiros trabalharem em cadeias de blocos de prova de trabalho. Minerar é o "trabalho" em si. É o ato de adicionar blocos válidos à cadeia. Isso é importante porque o comprimento da cadeia ajuda a rede a seguir a bifurcação correta da blockchain. Quanto mais "trabalho" feito, mais longa é a cadeia, e quanto maior o número do bloco, mais a rede pode ter certeza do estado atual das coisas.

[Mais sobre mineração](/developers/docs/consensus-mechanisms/pow/mining/)

## Como funcionou a prova de trabalho do Ethereum? {#how-it-works}

As transações Ethereum são processadas em blocos. Na agora obsoleta prova de trabalho do Ethereum, cada bloco continha:

- dificuldade de bloco - por exemplo: 3,324,092,183,262,715
- mixHash – por exemplo: `0x44bca881b07a6a09f83b130798072441705d9a665c5ac8bdf2f39a3cdf3bee29`
- nonce – por exemplo: `0xd3ee432b4fb3d26b`

Esses dados de bloco estavam diretamente relacionados à prova de trabalho.

### O trabalho em prova-de-trabalho {#the-work}

O protocolo de prova de trabalho, Ethash, exigia que os mineradores passassem por uma intensa corrida de tentativa e erro para encontrar o nonce para um bloco. Apenas blocos com um nonce válido podem ser adicionados à cadeia.

Ao correr para criar um bloco, um minerador repetidamente coloca um conjunto de dados, que só poderia ser obtido baixando e executando a cadeia completa (como um minerador faz), por meio de uma função matemática. O conjunto de dados foi usado para gerar um mixHash abaixo de um alvo que é ditado pela dificuldade do bloco. A melhor maneira de fazer isso é através de tentativa e erro.

A dificuldade determinou o alvo para o hash. Quanto menor o alvo, menor será o conjunto de hashes válidos. Uma vez gerado, isso foi incrivelmente fácil para outros mineradores e clientes verificarem. Mesmo que uma transação mudasse, o hash seria completamente diferente, sinalizando fraude.

O hashing facilita a detecção de fraude. Mas a prova de trabalho como um processo também foi um grande impedimento para atacar a cadeia.

### Prova de trabalho e segurança {#security}

Os mineradores foram incentivados a fazer esse trabalho na cadeia principal do Ethereum. Havia pouco incentivo para um subconjunto de mineradores iniciar sua própria cadeia – isso prejudica o sistema. As cadeias de blocos dependem de ter uma única fonte de verdade.

O objetivo da prova de trabalho era estender a cadeia. A cadeia mais longa era mais aceita como válida porque teve o maior trabalho computacional feito para gerá-la. No sistema PoW do Ethereum, era quase impossível criar novos blocos que apagassem transações, criassem transações falsas ou mantivessem uma segunda cadeia. Isso porque um minerador malicioso precisaria sempre resolver o bloco nonce mais rápido do que todos os outros.

Para criar consistentemente blocos maliciosos, ainda que válidos, um minerador mal-intencionado precisaria de mais de 51% do poder de mineração da rede para superar todos os demais. Essa quantidade de "trabalho" requer muito poder de computação caro e a energia gasta pode até ter superado os ganhos obtidos em um ataque.

### Aspectos econômicos da prova de trabalho {#economics}

A prova de trabalho também foi responsável por emitir novas moedas no sistema e incentivar os mineradores a fazer o trabalho.

Desde a [atualização de Constantinopla](/history/#constantinople), os mineradores que criaram com sucesso um bloco foram recompensados com dois ETH recém-cunhados e parte das taxas de transação. Os blocos Omner também compensaram 1,75 ETH. Os blocos Ommer eram blocos válidos criados por um minerador praticamente ao mesmo tempo que outro minerador criava o bloco canônico, o que foi determinado em última instância por qual cadeia foi construída em cima da primeira. Os blocos Ommer geralmente aconteciam devido à latência da rede.

## Finalidade {#finality}

Uma transação tem "finalidade" no Ethereum quando ela faz parte de um bloco que não pode mudar.

Como os mineradores trabalhavam de maneira descentralizada, dois blocos válidos poderiam ser minerados ao mesmo tempo. Isso cria uma bifurcação temporária. Por fim, uma dessas cadeias se tornou a cadeia aceita depois que os blocos subsequentes foram minerados e adicionados a ela, tornando-a mais longa.

Para complicar ainda mais, as transações rejeitadas na bifurcação temporária podem não ter sido incluídas na cadeia aceita. Ou seja, isso poderia ser revertido. Portanto, a finalização se refere ao tempo que você deve esperar antes de considerar uma transação irreversível. Na prova de trabalho Ethereum anterior, quanto mais blocos foram extraídos em cima de um bloco `N` específico, maior a confiança de que as transações em `N` foram bem-sucedidas e não seriam revertidas. Agora, com a prova de participação, a finalização é uma propriedade explícita, e não probabilística, de um bloco.

## Uso de energia na prova de trabalho {#energy}

Uma importante crítica à prova de trabalho é a quantidade de energia necessária para manter a rede segura. Para manter a segurança e a descentralização, o Ethereum na prova de trabalho consumia grandes quantidades de energia. Pouco antes de mudar para a prova de participação, os mineradores do Ethereum consumiam coletivamente cerca de 70 TWh/ano (aproximadamente o mesmo que a República Tcheca, de acordo com [digiconomist](https://digiconomist.net/) em 18 de julho de 2022).

## Prós e contras {#pros-and-cons}

| Prós                                                                                                                                                                                                                                                        | Contras                                                                                                                                                                              |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| A prova de trabalho é neutra. Você não precisa de ETH para começar, e as recompensas por bloco permitem que você vá de 0 ETH a um saldo positivo. Na [prova de participação](/developers/docs/consensus-mechanisms/pos/), você precisa de ETH para começar. | A prova de trabalho consome tanta energia que é prejudicial ao meio ambiente.                                                                                                        |
| A prova de trabalho é um mecanismo de consenso testado que manteve o Bitcoin e o Ethereum seguros e descentralizados por muitos anos.                                                                                                                       | Se você quer minerar, você precisa de equipamento especializado, e isso é um grande investimento para começar.                                                                       |
| Comparada com a prova de participação, é relativamente fácil de implementar.                                                                                                                                                                                | Devido ao aumento necessário do cálculo de mineração, as pools de mineração poderiam potencialmente dominar o mercado de mineração, levando à centralização e a riscos de segurança. |

## Comparação com a prova de participação {#compared-to-pos}

Em termos gerais, a prova de participação tem o mesmo objetivo final que a prova de trabalho: ajudar a rede descentralizada alcançar consenso de forma segura. No entanto, existem algumas diferenças em termos de processo e de pessoal:

- A prova de participação substitui a importância do poder computacional pelo ETH de participação.
- A prova de participação substitui mineradores por validadores. Os validadores apostam seus ETH para poder ter a capacidade de criar novos blocos.
- Os validadores não competem para criar blocos, em vez disso, eles são escolhidos aleatoriamente por um algoritmo.
- A finalidade é clara: em certos pontos de controle, se 2/3 dos validadores concordam com o estado do bloco então ele é considerado finalizado. Os validadores devem apostar todas as suas fichas nisso, assim, caso tentem conspirar, irão perder toda a aposta.

[Mais sobre prova de participação](/developers/docs/consensus-mechanisms/pos/)

## Você é o tipo de pessoa que aprende mais com recursos visuais? {#visual-learner}

<YouTube id="3EUAcxhuoU4" />

## Leitura adicional {#further-reading}

- [Ataque majoritário](https://en.bitcoin.it/wiki/Majority_attack)
- [Finalidade do acordo](https://blog.ethereum.org/2016/05/09/on-settlement-finality/)

### Vídeos {#videos}

- [Uma explicação técnica dos protocolos de prova de trabalho](https://youtu.be/9V1bipPkCTU)

## Tópicos relacionados {#related-topics}

- [Mineração](/developers/docs/consensus-mechanisms/pow/mining/)
- [Prova de participação](/developers/docs/consensus-mechanisms/pos/)
- [Prova de autoridade](/developers/docs/consensus-mechanisms/poa/)
