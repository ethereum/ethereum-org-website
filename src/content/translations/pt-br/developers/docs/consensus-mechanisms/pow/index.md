---
title: Prova de trabalho (PoW)
description: Uma explicação do protocolo de consenso de prova de trabalho e seu papel no Ethereum.
lang: pt-br
incomplete: true
---

Ethereum, assim como o Bitcoin, usa atualmente um protocolo de consenso chamado **[prova de trabalho (PoW)](https://wikipedia.org/wiki/Proof_of_work)**. Isto permite que a rede Ethereum verifique o estado de todas as informações gravadas no blockchain Ethereum, e previne certos tipos de ataques econômicos.

Ao longo do próximo ano, a prova de trabalho será gradualmente eliminada em favor da **[prova de participação (PoS)](/developers/docs/consensus-mechanisms/pos)**. A transição para a prova de participação também irá eliminar gradualmente a mineração do Ethereum. [Mais sobre a fusão.](/upgrades/merge/)

## Pré-requisitos {#prerequisites}

Para entender melhor esta página, recomendamos ler primeiro sobre [transações](/developers/docs/transactions/), [blocos](/developers/docs/blocks/) e [mecanismos de consenso](/developers/docs/consensus-mechanisms/).

## O que é prova de trabalho (PoW)? {#what-is-pow}

Prova de trabalho (PoW) é o mecanismo que permite que a rede descentralizada Ethereum chegue ao consenso, ou aceite registros, como saldos de conta e a ordem das transações. Isso impede os usuários de "gastar duas vezes" suas moedas e garante que a cadeia Ethereum seja incrivelmente difícil de atacar ou manipular.

## Prova de trabalho e mineração {#pow-and-mining}

Prova de trabalho é o algoritmo subjacente que define a dificuldade e as regras para o trabalho que os mineradores fazem. Minerar é o "trabalho" em si. É o ato de adicionar blocos válidos à cadeia. Isso é importante porque o tamanho da cadeia ajuda a identificar a cadeia Ethereum válida e a entender o estado atual do Ethereum. Quanto mais "trabalho" feito, mais longa a cadeia, e maior o número do bloco, e mais segura a rede pode ser do estado atual das coisas.

[Mais sobre mineração](/developers/docs/consensus-mechanisms/pow/mining/)

## Como funciona a prova de trabalho do Ethereum? {#how-it-works}

As transações Ethereum são processadas em blocos. Cada bloco tem:

- dificuldade de bloco - por exemplo: 3,324,092,183,262,715
- mixHash – por exemplo: `0x44bca881b07a6a09f83b130798072441705d9a665c5ac8bdf2f39a3cdf3bee29`
- nonce – por exemplo: `0xd3ee432b4fb3d26b`

Estes dados do bloco estão diretamente relacionados à prova de trabalho.

### O trabalho em prova-de-trabalho {#the-work}

O protocolo de prova de trabalho, conhecido como Ethash, exige que os mineradores se esforcem muito usando um método de tentativa e erro para encontrar o nonce de um bloco. Apenas blocos com um nonce válido podem ser adicionados à cadeia.

Quando estiver no processo de criar um bloco, um minerador colocará repetidamente um conjunto de dados, que você só pode conseguir baixando e executando a cadeia completa (como faz um minerador), através de uma função matemática. O conjunto de dados é usado para gerar um mixHash que esteja sob o nonce de destino, conforme ditado pela dificuldade do bloco. A melhor maneira de fazer isso é através de tentativa e erro.

A dificuldade determina o alvo para o hash. Quanto menor o alvo, menor será o conjunto de hashes válidos. Uma vez gerado, isso é incrivelmente fácil para outros mineradores e clientes verificarem. Mesmo que uma transação mudasse, o hash seria completamente diferente, sinalizando fraude.

O hashing facilita a detecção de fraude. Mas o prova de trabalho como um processo também é um grande impeditivo para atacar a cadeia.

### Prova de trabalho e segurança {#security}

Os mineradores são incentivados a fazer esse trabalho na cadeia principal do Ethereum. Há pouco incentivo para que um subconjunto de mineradores inicie a sua própria cadeia – isso enfraquece o sistema. As blockchains dependem de uma única fonte de verdade. E os utilizadores escolherão sempre a cadeia mais longa ou mais "pesada".

O objetivo da prova de trabalho é aumentar a cadeia. A maior cadeia é aceita como válida pois ela teve o maior trabalho computacional realizado. Dentro do sistema de prova de trabalho do Ethereum é quase impossível criar novos blocos que apaguem transações, criem transações falsas ou mantenham uma segunda cadeia. Isso porque um minerador malicioso precisaria estar sempre resolvendo o bloco nonce mais rápido que todos os demais mineradores.

Para criar blocos maliciosos, ainda que válidos, você precisaria de mais de 51% do poder de mineração da rede para superar todos os demais mineradores. Você precisaria de muito poder de computação para poder fazer essa quantidade de "trabalho". E o gasto de energia pode até superar os ganhos que você faria em um ataque.

### Aspectos econômicos da prova de trabalho {#economics}

A prova de trabalho também é responsável pela emissão de novas moedas no sistema e pelo incentivo ao trabalho dos mineradores.

Miners who successfully create a block get rewarded with two freshly minted ETH but no longer receive all the transaction fees, as the base fee gets burned, while the tip and block reward goes to the miner. Um minerador também pode receber 1,75 ETH por um bloco do tipo «uncle» (um bloco que foi minerado, mas que ainda não foi adicionado à blockchain). Blocos do tipo "uncle" são blocos válidos criados por um minerador praticamente ao mesmo tempo que outro minerador minerou o bloco de maneira satisfatória. Os blocos do tipo "uncle" costumam existir devido à latência da rede.

## Finalidade {#finality}

Uma transação tem "finalidade" no Ethereum quando ela faz parte de um bloco que não pode mudar.

Como os mineradores trabalham de forma descentralizada, é possível que dois blocos válidos sejam minerados ao mesmo tempo. Isso cria um "fork" (bifurcação) temporário. Eventualmente, uma dessas cadeias se tornará a cadeia aceita depois de um bloco subsequente ter sido minerado e adicionado, tornando-a mais longa.

Mas para complicar ainda mais as coisas, as transações que foram rejeitadas no fork temporário podem ter sido incluídas na cadeia aceita. Isto significa que pode ser revertido. Portanto, "finalidade" se refere ao tempo que você deve esperar antes de considerar uma transação irreversível. Para o Ethereum, o tempo recomendado é de 6 blocos, ou um pouco mais de 1 minuto. Depois disso, você pode dizer com relativa confiança que a transação foi um sucesso. É claro que se pode esperar ainda mais tempo por uma garantia ainda maior.

A finalidade é algo a ter em mente ao desenhar dapps. Seria uma má experiência do usuário representar mal as informações de transação para seus usuários, especialmente se a transação for de alto valor.

Lembre-se, esse tempo não inclui os tempos de espera até que a transação seja selecionada por um minerador.

## Uso de energia na prova de trabalho {#energy}

Uma importante crítica à prova de trabalho é a quantidade de energia necessária para manter a rede segura. Para manter a segurança e a descentralização, o Ethereum na prova de trabalho consome 73,2 TWh anualmente, o equivalente energético de um país de média dimensão como a Áustria.

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
