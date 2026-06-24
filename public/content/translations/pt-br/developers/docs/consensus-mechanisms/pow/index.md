---
title: Prova de Trabalho (PoW)
description: "Uma explicação do protocolo de consenso de Prova de Trabalho (PoW) e seu papel no Ethereum."
lang: pt-br
---

A rede [Ethereum](/) começou usando um mecanismo de consenso que envolvia a **[Prova de Trabalho (PoW)](/developers/docs/consensus-mechanisms/pow)**. Isso permitiu que os nós da rede Ethereum chegassem a um consenso sobre o estado de todas as informações registradas na blockchain do Ethereum e evitou certos tipos de ataques econômicos. No entanto, o Ethereum desativou a Prova de Trabalho (PoW) em 2022 e começou a usar a [Prova de Participação (PoS)](/developers/docs/consensus-mechanisms/pos) em seu lugar.

<Alert variant="update">
<AlertEmoji text=":wave:"/>
<AlertContent>
<AlertDescription>
    A Prova de Trabalho (PoW) foi descontinuada. O Ethereum não usa mais a Prova de Trabalho (PoW) como parte de seu mecanismo de consenso. Em vez disso, ele usa a Prova de Participação (PoS). Leia mais sobre a [Prova de Participação (PoS)](/developers/docs/consensus-mechanisms/pos/) e o [staking](/staking/).
</AlertDescription>
</AlertContent>
</Alert>

## Pré-requisitos {#prerequisites}

Para entender melhor esta página, recomendamos que você leia primeiro sobre [transações](/developers/docs/transactions/), [blocos](/developers/docs/blocks/) e [mecanismos de consenso](/developers/docs/consensus-mechanisms/).

## O que é a Prova de Trabalho (PoW)? {#what-is-pow}

O consenso de Nakamoto, que utiliza a Prova de Trabalho (PoW), é o mecanismo que antes permitia que a rede descentralizada do Ethereum chegasse a um consenso (ou seja, todos os nós concordassem) sobre coisas como saldos de contas e a ordem das transações. Isso impedia que os usuários "gastassem duplamente" suas moedas e garantia que a cadeia do Ethereum fosse tremendamente difícil de atacar ou manipular. Essas propriedades de segurança agora vêm da Prova de Participação (PoS), usando o mecanismo de consenso conhecido como [Gasper](/developers/docs/consensus-mechanisms/pos/gasper/).

## Prova de Trabalho (PoW) e mineração {#pow-and-mining}

A Prova de Trabalho (PoW) é o algoritmo subjacente que define a dificuldade e as regras para o trabalho que os mineradores fazem em blockchains de Prova de Trabalho (PoW). A mineração é o "trabalho" em si. É o ato de adicionar blocos válidos à cadeia. Isso é importante porque o comprimento da cadeia ajuda a rede a seguir a bifurcação correta da blockchain. Quanto mais "trabalho" for feito, mais longa será a cadeia e, quanto maior o número do bloco, mais certeza a rede poderá ter do estado atual das coisas.

[Mais sobre mineração](/developers/docs/consensus-mechanisms/pow/mining/)

## Como funcionava a Prova de Trabalho (PoW) do Ethereum? {#how-it-works}

As transações do Ethereum são processadas em blocos. No agora descontinuado Ethereum de Prova de Trabalho (PoW), cada bloco continha:

- dificuldade do bloco – por exemplo: 3.324.092.183.262.715
- mixHash – por exemplo: `0x44bca881b07a6a09f83b130798072441705d9a665c5ac8bdf2f39a3cdf3bee29`
- nonce – por exemplo: `0xd3ee432b4fb3d26b`

Esses dados do bloco estavam diretamente relacionados à Prova de Trabalho (PoW).

### O trabalho na Prova de Trabalho (PoW) {#the-work}

O protocolo de Prova de Trabalho (PoW), Ethash, exigia que os mineradores passassem por uma intensa corrida de tentativa e erro para encontrar o nonce de um bloco. Apenas blocos com um nonce válido podiam ser adicionados à cadeia.

Ao correr para criar um bloco, um minerador passava repetidamente um conjunto de dados, que só podia ser obtido baixando e executando a cadeia completa (como faz um minerador), por uma função matemática. O conjunto de dados era usado para gerar um mixHash abaixo de um alvo que é ditado pela dificuldade do bloco. A melhor maneira de fazer isso é por tentativa e erro.

A dificuldade determinava o alvo para o hash. Quanto menor o alvo, menor o conjunto de hashes válidos. Uma vez gerado, isso era incrivelmente fácil para outros mineradores e clientes verificarem. Mesmo que uma transação mudasse, o hash seria completamente diferente, sinalizando fraude.

A geração de hash torna a fraude fácil de detectar. Mas a Prova de Trabalho (PoW) como um processo também era um grande impedimento para atacar a cadeia.

### Prova de Trabalho (PoW) e segurança {#security}

Os mineradores eram incentivados a fazer esse trabalho na cadeia principal do Ethereum. Havia pouco incentivo para um subconjunto de mineradores iniciar sua própria cadeia — isso prejudica o sistema. As blockchains dependem de ter um único estado como fonte de verdade.

O objetivo da Prova de Trabalho (PoW) era estender a cadeia. A cadeia mais longa era a mais crível como a válida porque tinha a maior quantidade de trabalho computacional feito para gerá-la. Dentro do sistema PoW do Ethereum, era quase impossível criar novos blocos que apagassem transações, criassem transações falsas ou mantivessem uma segunda cadeia. Isso ocorre porque um minerador mal-intencionado precisaria sempre resolver o nonce do bloco mais rápido do que todos os outros.

Para criar consistentemente blocos maliciosos, mas válidos, um minerador mal-intencionado precisaria de mais de 51% do poder de mineração da rede para superar todos os outros. Essa quantidade de "trabalho" requer muito poder de computação caro e a energia gasta poderia até ter superado os ganhos obtidos em um ataque.

### Economia da Prova de Trabalho (PoW) {#economics}

A Prova de Trabalho (PoW) também era responsável por emitir nova moeda no sistema e incentivar os mineradores a fazer o trabalho.

Desde a [atualização Constantinopla](/ethereum-forks/#constantinople), os mineradores que criavam um bloco com sucesso eram recompensados com dois ETH recém-cunhados e parte das taxas de transação. Os blocos ommer também compensavam 1,75 ETH. Blocos ommer eram blocos válidos criados por um minerador praticamente ao mesmo tempo em que outro minerador criava o bloco canônico, o que era determinado em última análise por qual cadeia era construída em cima primeiro. Blocos ommer geralmente aconteciam devido à latência da rede.

## Finalidade {#finality}

Uma transação tem "finalidade" no Ethereum quando faz parte de um bloco que não pode mudar.

Como os mineradores trabalhavam de forma descentralizada, dois blocos válidos podiam ser minerados ao mesmo tempo. Isso cria uma bifurcação temporária. Eventualmente, uma dessas cadeias se tornava a cadeia aceita depois que blocos subsequentes eram minerados e adicionados a ela, tornando-a mais longa.

Para complicar ainda mais as coisas, as transações rejeitadas na bifurcação temporária podem não ter sido incluídas na cadeia aceita. Isso significa que ela poderia ser revertida. Portanto, a finalidade refere-se ao tempo que você deve esperar antes de considerar uma transação irreversível. Sob o Ethereum de Prova de Trabalho (PoW) anterior, quanto mais blocos eram minerados em cima de um bloco específico `N`, maior a confiança de que as transações em `N` foram bem-sucedidas e não seriam revertidas. Agora, com a Prova de Participação (PoS), a finalização é uma propriedade explícita, em vez de probabilística, de um bloco.

## Uso de energia da Prova de Trabalho (PoW) {#energy}

Uma grande crítica à Prova de Trabalho (PoW) é a quantidade de energia necessária para manter a rede segura. Para manter a segurança e a descentralização, o Ethereum na Prova de Trabalho (PoW) consumia grandes quantidades de energia. Pouco antes de mudar para a Prova de Participação (PoS), os mineradores do Ethereum consumiam coletivamente cerca de 70 TWh/ano (quase o mesmo que a República Tcheca - de acordo com o [digiconomist](https://digiconomist.net/) em 18 de julho de 2022).

## Prós e contras {#pros-and-cons}

| Prós                                                                                                                                                                                                                         | Contras                                                                                                                                         |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| A Prova de Trabalho (PoW) é neutra. Você não precisa de ETH para começar e as recompensas de bloco permitem que você vá de 0 ETH para um saldo positivo. Com a [Prova de Participação (PoS)](/developers/docs/consensus-mechanisms/pos/), você precisa de ETH para começar. | A Prova de Trabalho (PoW) consome tanta energia que é ruim para o meio ambiente.                                                                      |
| A Prova de Trabalho (PoW) é um mecanismo de consenso testado e comprovado que manteve o Bitcoin e o Ethereum seguros e descentralizados por muitos anos.                                                                                          | Se você quiser minerar, precisará de equipamentos tão especializados que é um grande investimento para começar.                                                |
| Em comparação com a Prova de Participação (PoS), é relativamente fácil de implementar.                                                                                                                                                                | Devido ao aumento da computação necessária, os pools de mineração poderiam potencialmente dominar o jogo da mineração, levando à centralização e a riscos de segurança. |

## Em comparação com a Prova de Participação (PoS) {#compared-to-pos}

Em alto nível, a Prova de Participação (PoS) tem o mesmo objetivo final que a Prova de Trabalho (PoW): ajudar a rede descentralizada a chegar a um consenso com segurança. Mas tem algumas diferenças no processo e no pessoal:

- A Prova de Participação (PoS) troca a importância do poder computacional pelo ETH em stake.
- A Prova de Participação (PoS) substitui os mineradores por validadores. Os validadores fazem stake de seus ETH para ativar a capacidade de criar novos blocos.
- Os validadores não competem para criar blocos, em vez disso, eles são escolhidos aleatoriamente por um algoritmo.
- A finalidade é mais clara: em certos pontos de verificação, se 2/3 dos validadores concordarem com o estado do bloco, ele é considerado final. Os validadores devem apostar todo o seu stake nisso, então, se tentarem conspirar no futuro, perderão todo o seu stake.

[Mais sobre a Prova de Participação (PoS)](/developers/docs/consensus-mechanisms/pos/)

## Aprende melhor visualmente? {#visual-learner}

<VideoWatch slug="proof-of-work-explained" />

## Leitura adicional {#further-reading}

- [Ataque majoritário](https://en.bitcoin.it/wiki/Majority_attack)
- [Sobre a finalidade da liquidação](https://blog.ethereum.org/2016/05/09/on-settlement-finality)

### Vídeos {#videos}

- [Uma explicação técnica dos protocolos de Prova de Trabalho (PoW)](https://youtu.be/9V1bipPkCTU)

## Tópicos relacionados {#related-topics}

- [Mineração](/developers/docs/consensus-mechanisms/pow/mining/)
- [Prova de Participação (PoS)](/developers/docs/consensus-mechanisms/pos/)
- [Prova de autoridade (PoA)](/developers/docs/consensus-mechanisms/poa/)