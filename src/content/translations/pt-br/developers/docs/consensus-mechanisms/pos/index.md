---
title: Prova de participação (PoS)
description: Explicação do protocolo de consenso "Prova de participação" e seu papel no Ethereum.
lang: pt-br
---

A prova de participação (PoS) é a base do [mecanismo de consenso](/developers/docs/consensus-mechanisms/) do Ethereum. O Ethereum ativou seu mecanismo de prova de participação em 2022 porque é mais seguro, consome menos energia e é melhor para implementar novas soluções de escalabilidade em comparação com a arquitetura de [prova de trabalho](/developers/docs/consensus-mechanisms/pow) anterior.

## Pré-requisitos {#prerequisites}

Para entender melhor esta página, recomendamos que você primeiro leia [mecanismos de consenso](/developers/docs/consensus-mechanisms/).

## O que é prova de participação (PoS)? {#what-is-pos}

A prova de participação está subjacente a certos [mecanismos de consenso](/developers/docs/consensus-mechanisms/) usados por cadeias de blocos para obter consenso distribuído. Na prova de trabalho, os mineradores provam que têm capital em risco gastando energia. O Ethereum usa prova de participação, em que os validadores participam explicitamente do capital na forma de ETH em um contrato inteligente no Ethereum. Esse ETH colocado atua como garantia, que pode ser destruída se o validador se comportar de forma desonesta ou preguiçosa. O validador é então responsável por verificar se os novos blocos propagados pela rede são válidos e se, ocasionalmente, criam e propagam novos blocos por conta própria.

A prova de participação vem com uma série de melhorias no sistema de prova de trabalho agora obsoleto:

- melhor eficiência energética – não há necessidade de usar muita energia em cálculos de prova de trabalho
- barreiras de entrada mais baixas, requisitos de hardware reduzidos — não há necessidade de hardware de elite para ter a possibilidade de criar novos blocos
- risco de centralização reduzido — a prova de participação deve levar a mais nós protegendo a rede
- devido à baixa necessidade de energia, é necessário emitir menos ETH para incentivar a participação
- penalidades econômicas por mau comportamento tornam os ataques de estilo 51% exponencialmente mais caros para um invasor comparado à prova de trabalho
- a comunidade pode recorrer à recuperação social de uma cadeia honesta se um ataque de 51% tiver que superar as defesas criptoeconômicas.

## Validadores {#validators}

Para participar como validador, um usuário deve depositar 32 ETH no contrato de depósito e executar três softwares separados: um cliente de execução, um cliente de consenso e um validador. Ao depositar seu ETH, o usuário entra em uma fila de ativação que limita a taxa de novos validadores que entram na rede. Uma vez ativados, os validadores recebem novos blocos de pares na rede Ethereum. As transações entregues no bloco são reexecutadas e a assinatura do bloco é verificada para garantir que o bloco seja válido. O validador então envia um voto (chamado de atestação) a favor desse bloco para toda a rede.

Enquanto na prova de trabalho, o tempo dos blocos é determinado pela dificuldade de mineração, na prova de participação o tempo é fixo. O tempo na prova de participação do Ethereum é dividido em espaços (12 segundos) e épocas (32 espaços). Um validador é selecionado aleatoriamente para ser um proponente de bloco em cada espaço. Esse validador é responsável por criar um novo bloco e enviá-lo para outros nós da rede. Também em cada slot, um comitê de validadores é escolhido aleatoriamente, cujos votos são utilizados para determinar a validade do bloco proposto.

## Finalidade {#finality}

Uma transação tem "finalidade" em redes distribuídas quando é parte de um bloco que não pode mudar sem que uma quantidade significativa de ETH seja queimada. Na prova de participação do Ethereum, isto é gerenciado usando blocos de pontos de verificação. O primeiro bloco em cada época é um ponto de verificação. Os validadores votam nos pares de pontos de verificação que eles consideram válidos. Se um par de pontos de verificação atrair votos que representem pelo menos dois terços do total de ETH envolvido, os checkpoints serão atualizados. O mais recente dos dois (alvo) torna-se "justificado". O primeiro dos dois já é justificado porque era o "alvo" na época anterior. Agora ele é atualizado para "finalizado". Para reverter um bloco finalizado, um invasor se comprometeria a perder pelo menos um terço do fornecimento total de ETH envolvido. A razão exata para isso é explicada nesta [postagem do blog da Ethereum Foundation](https://blog.ethereum.org/2016/05/09/on-settlement-finality/). Uma vez que a finalidade exige a maioria de dois terços, um invasor poderia impedir que a rede chegue à finalidade votando com um terço da participação total. Existe um mecanismo de defesa contra isso: o [vazamento de inatividade](https://arxiv.org/pdf/2003.03052.pdf). Isso é ativado sempre que a cadeia falha em finalizar por mais de quatro épocas. O vazamento de inatividade afasta o ETH envolvido dos validadores que votam contra a maioria, permitindo que a maioria recupere uma maioria de dois terços e finalize a cadeia.

## Segurança criptoeconômica {#crypto-economic-security}

A execução de um validador é um compromisso. É esperado que o validador mantenha hardware e conectividade suficientes para participar da validação e proposta de bloco. Em troca, o validador é pago em ETH (seu saldo colocado aumenta). Por outro lado, participar como validador também abre novos caminhos para os usuários atacarem a rede para ganho pessoal ou sabotagem. Para evitar isso, os validadores perdem as recompensas de ETH se não participarem quando chamados, e sua participação existente pode ser destruída ao se comportarem desonestamente. Existem dois comportamentos primários que podem ser considerados desonestos: propor vários blocos em um único espaço (equívoco) e enviar atestações contraditórias. A quantidade de ETH reduzida depende de quantos validadores também estão sendo removidos ao mesmo tempo. Isso é conhecido como ["penalidade de correlação"](https://arxiv.org/pdf/2003.03052.pdf) e pode ser menor (em torno de ~1% de participação para um único validador reduzido por si só) ou pode resultar na destruição de 100% da participação do validador (evento de remoção em massa). Ela é imposta na metade de um período de saída forçada que começa com uma penalidade imediata (até 0,5 ETH) no dia 1, a penalidade de correlação no dia 18, e finalmente, a expulsão da rede no dia 36. Os validadores recebem todos os dias pequenas penalidades de atestações porque estão presentes na rede, mas não enviam votos. Tudo isso significa que um ataque coordenado seria muito caro para o invasor.

## Escolha da bifurcação {#fork-choice}

Quando a rede funciona de maneira otimizada e honesta, há apenas um novo bloco no início da cadeia, e todos os validadores o atestam. No entanto, é possível que os validadores tenham visões diferentes do cabeçalho da cadeia devido à latência de rede ou porque um proponente de bloco se equivocou. Portanto, os clientes de consenso exigem um algoritmo para decidir qual deles favorecer. O algoritmo usado na prova de participação do Ethereum se chama [LMD-GHOST](https://arxiv.org/pdf/2003.03052.pdf) e funciona identificando a bifurcação que tem o maior peso de atestações em seu histórico.

## Prova de participação e segurança {#pos-and-security}

A ameaça de um [ataque de 51%](https://www.investopedia.com/terms/1/51-attack.asp) ainda existe na prova de participação, como na prova de trabalho, mas ainda é mais arriscada para os invasores. Um invasor precisaria de 51% do ETH colocado. Eles poderiam então usar suas próprias atestações para garantir que sua bifurcação preferida fosse aquela com o maior número de atestações acumuladas. O "peso" das atestações acumuladas é o que os clientes de consenso usam para determinar a cadeia correta, de modo que esse invasor seria capaz de tornar sua bifurcação a cadeia canônica. No entanto, um ponto forte da prova de participação sobre a prova de trabalho é que a comunidade tem flexibilidade para montar um contra-ataque. Por exemplo, os validadores honestos podem decidir continuar construindo a cadeia minoritária e ignorar a bifurcação do invasor enquanto encorajam aplicativos, exchanges e pools a fazerem o mesmo. Eles também podem decidir remover forçadamente o invasor da rede e destruir o ETH colocado. Estas são defesas econômicas fortes contra um ataque de 51%.

51% dos ataques são apenas um tipo de atividade maliciosa. Os maus atores podem tentar ataques de longo alcance (embora a finalidade do dispositivo neutralize esse vetor de ataque), "reorganizações" de curto alcance (embora os prazos de reforço e atestações do proponente atenuem isso), ataques de devolução e de saldo (também atenuados pelo reforço do proponente, e mesmo assim, esses ataques só foram demonstrados sob condições de rede idealizadas) ou ataques de avalanche (neutralizados pela regra dos algoritmos de escolha de fork, considerarando apenas, a mensagem mais recente).

No geral, a prova de participação, conforme implementada no Ethereum, demonstrou ser economicamente mais segura do que a prova de participação.

## Prós e contras {#pros-and-cons}

| Prós                                                                                                                                                                                                                                      | Contras                                                                                                 |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| O staking facilita a participação dos indivíduos na segurança da rede, promovendo a descentralização. o nó validador pode ser executado em um laptop normal. Os pools de participação permitem que os usuários participem sem ter 32 ETH. | A prova de participação é mais recente e menos testada na prática em comparação com a prova de trabalho |
| A participação é mais descentralizada, As economias de escala não se aplicam da mesma forma que para a mineração de PoW.                                                                                                                  | A prova de participação é mais complexa de implementar do que a prova de trabalho                       |
| A prova de participação oferece maior segurança criptoeconômica do que a prova de trabalho                                                                                                                                                | Os usuários precisam executar três softwares para participar da prova de participação do Ethereum.      |
| É necessário emitir uma quantidade menor de novos ETH para incentivar os participantes da rede                                                                                                                                            |                                                                                                         |

## Você é o tipo de pessoa que aprende mais com recursos visuais? {#visual-learner}

<YouTube id="psKDXvXdr7k" />

## Leitura adicional {#further-reading}

- [Perguntas frequentes sobre prova de participação](https://vitalik.ca/general/2017/12/31/pos_faq.html) _Vitalik Buterin_
- [O que é prova de participação](https://consensys.net/blog/blockchain-explained/what-is-proof-of-stake/) _ConsenSys_
- [O que prova de participação é por que é importante](https://bitcoinmagazine.com/culture/what-proof-of-stake-is-and-why-it-matters-1377531463) _Vitalik Buterin_
- [A explicação sobre Beacon Chain Ethereum 2.0 que você precisa ler primeiro](https://ethos.dev/beacon-chain) _Ethos.dev_
- [Por que a prova de participação (nov. de 2020)](https://vitalik.ca/general/2020/11/06/pos2020.html) _Vitalik Buterin_
- [Prova da participação: como aprendi a amar a pouca subjetividade](https://blog.ethereum.org/2014/11/25/proof-stake-learned-love-weak-subjectivity/) _Vitalik Buterin_
- [Ataque e defesa da prova de participação do Ethereum](https://mirror.xyz/jmcook.eth/YqHargbVWVNRQqQpVpzrqEQ8IqwNUJDIpwRP7SS5FXs)
- [A filosofia por trás do design da prova de participação](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51) _Vitalik Buterin_

## Tópicos relacionados {#related-topics}

- [Prova de trabalho](/developers/docs/consensus-mechanisms/pow/)
