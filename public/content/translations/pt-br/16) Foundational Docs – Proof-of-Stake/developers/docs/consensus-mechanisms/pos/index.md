---
title: Prova de participação (PoS)
description: Explicação do protocolo de consenso "Prova de participação" e seu papel no Ethereum.
lang: pt-br
---

A prova de participação (PoS) é a base do [mecanismo de consenso](/developers/docs/consensus-mechanisms/) do Ethereum. O Ethereum ativou seu mecanismo de prova de participação em 2022 porque é mais seguro, consome menos energia e é melhor para implementar novas soluções de escalabilidade em comparação com a arquitetura de [prova de trabalho](/developers/docs/consensus-mechanisms/pow) anterior.

## Pré-requisitos {#prerequisites}

Para entender melhor esta página, recomendamos que você primeiro leia [mecanismos de consenso](/developers/docs/consensus-mechanisms/).

## O que é prova de participação (PoS)? {#what-is-pos}

A prova de participação é um meio de provar que os validadores colocam algo de valor na rede, para que possa ser destruído se agirem de forma desonesta. Na prova de participação do Ethereum, os validadores colocam explicitamente o capital na forma de ETH em um contrato inteligente no Ethereum. O validador é então responsável por verificar se os novos blocos propagados pela rede são válidos e se, ocasionalmente, criam e propagam novos blocos por conta própria. Se eles tentarem defraudar a rede (por exemplo, propondo múltiplos blocos, quando eles deveriam enviar um só ou estar enviando atestações conflitantes), alguns ou todos os seus ETH colocados podem ser destruídos.

## Validadores {#validators}

Para participar como validador, um usuário deve depositar 32 ETH no contrato de depósito e executar três softwares separados: um cliente de execução, um cliente de consenso e um cliente validador. Ao depositar seu ETH, o usuário entra em uma fila de ativação que limita a taxa de novos validadores que entram na rede. Uma vez ativados, os validadores recebem novos blocos de pares na rede Ethereum. As transações entregues no bloco são reexecutadas para verificar se, as alterações propostas para o estado do Ethereum são válidas e a assinatura do bloco é verificada. O validador então envia um voto (chamado de atestação) a favor desse bloco para toda a rede.

Enquanto na prova de trabalho, o tempo dos blocos é determinado pela dificuldade de mineração, na prova de participação o tempo é fixo. O tempo na prova de participação do Ethereum é dividido em slots (12 segundos) e épocas (32 slots). Um validador é selecionado aleatoriamente para ser um proponente de bloco em cada espaço. Esse validador é responsável por criar um novo bloco e enviá-lo para outros nós da rede. Também em cada slot, um comitê de validadores é escolhido aleatoriamente, cujos votos são utilizados para determinar a validade do bloco proposto. Dividir o validador configurado em comitês é importante para manter a carga de rede gerenciável. Os comitês dividem o conjunto de validadores, de modo que cada validador ativo ateste em cada época, mas não em cada espaço (slot).

## Como uma transação é executada na Ethereum PoS {#transaction-execution-ethereum-pos}

O seguinte fornece uma explicação de ponta a ponta de como uma transação é executada na proof-of-stake da Ethereum.

1. Um usuário cria e assina uma href="/developers/docs/transactions/">transação/a> com sua chave privada. Isso geralmente é feito por uma carteira ou uma biblioteca como a [ether.js](https://docs.ethers.io/v5/), [web3js](https://docs.web3js.org/), [web3py](https://web3py.readthedocs.io/en/v5/) etc, mas sem o conhecimento do usuário está fazendo uma solicitação para um nó usando o Ethereum [JSON-RPC API](/developers/docs/apis/json-rpc/). O usuário define a quantidade de gás que está disposto a pagar como gorjeta a um validador para incentivá-lo a incluir a transação em um bloco. As [dicas](/developers/docs/gas/#priority-fee) são pagas ao validador enquanto a [taxa básica](/developers/docs/gas/#base-fee) é paga queimado.
2. A transação é enviada para um [cliente de execução](/developers/docs/nodes-and-clients/#execution-client) Ethereum que verifica a sua validade. Isto significa garantir que o remetente tem ETH suficiente para realizar a transação e eles o assinaram com a chave correta.
3. Se a transação for válida, o cliente de execução adiciona-o à sua mempool local (lista de transações pendentes) e também a transmite para outros nós por meio da rede gossip da camada de execução. Quando outros nós ouvem sobre a transação, eles a adicionam à sua mempool local também. Os usuários avançados podem abster-se de transmitir sua transações e, em vez disso, encaminhá-la a criadores de blocos especializados, como [Flashbots Auction](https://docs.flashbots.net/flashbots-auction/overview). Isso permite que eles organizem as transações nos próximos blocos para obter o máximo lucro ([MEV](/developers/docs/mev/#mev-extraction)).
4. Um dos nós validadores na rede é o proponente de bloco para o slot atual, tendo sido selecionado pseudo-aleatoriamente usando RANDAO. Este nó é responsável pela construção e transmissão do próximo bloco a ser adicionado à blockchain Ethereum e pela atualização do estado global. O nó é composto por três partes: um cliente de execução, um cliente de consenso e um cliente validador. O cliente de execução empacota transações da mempool local em um "payload de execução" e executa-os localmente para gerar uma mudança de estado. Essas informações são passadas para o cliente de consenso em que a carga da execução é agrupada como parte de um "bloco de sinalização" que também contém informações sobre as recopensas, penalidades, cortes, atestações etc. que permitem que a rede entre em acordo sobre a sequência de blocks no topo da cadeia. A comunicação entre os clientes de execução e consenso é descrita em mais detalhes em [Conectando os clientes de consenso e de execução](/developers/docs/networking-layer/#connecting-clients).
5. Outros nós recebem o novo bloco beacon na rede gossip na camada de consenso. Eles o passam para seu cliente de execução onde as transações são novamente executadas localmente para garantir que a proposta alteração de estado é válida. O cliente validador então atesta que o bloco é válido e é o bloco seguinte lógico em sua visão da cadeia (ou seja, ele constrói na cadeia com o maior peso de atestações, conforme definido nas [regras de escolha de fork (bifurcação)](/developers/docs/consensus-mechanisms/pos/#fork-choice)). O bloco é adicionado ao banco de dados local em cada nó que o atestar.
6. A transação pode ser considerada "finalizada", se fizer parte de uma cadeia com um "vínculo majoritário" entre dois pontos de verificação. Os pontos de verificação ocorrem no início de cada época e existem para explicar o fato de que apenas um subconjunto de validadores ativos atestam em cada espaço, mas todos os validadores ativos atestam em cada época. Portanto, é apenas entre as épocas que um 'vínculo de supermaioria' pode ser demonstrado (isto é onde 66% do total de ETH envolvido na rede concorda em dois pontos de verificação).

Mais detalhes sobre finalidade podem ser encontrados abaixo.

## Finalidade {#finality}

Uma transação tem "finalidade" em redes distribuídas quando faz parte de um bloco que não pode mudar, sem que uma grande quantidade de ETH seja queimada. Na prova de participação da Ethereum, isto é gerenciado usando blocos de pontos de verificação. O primeiro bloco em cada época é um ponto de verificação. Os validadores votam nos pares de pontos de verificação que eles consideram válidos. Se um par de pontos de verificação atrair votos que representem pelo menos dois terços do total de ETH envolvido, os checkpoints serão atualizados. O mais recente dos dois (alvo) torna-se "justificado". O primeiro dos dois já é justificado porque era o "alvo" na época anterior. Agora ele é atualizado para "finalizado".

Para reverter um bloco finalizado, um invasor se comprometeria a perder pelo menos um terço do fornecimento total de ETH envolvido. A razão exata para isso é explicada nesta [postagem do blog da Ethereum Foundation](https://blog.ethereum.org/2016/05/09/on-settlement-finality/). Uma vez que a finalidade exige a maioria de dois terços, um invasor poderia impedir que a rede chegue à finalidade votando com um terço da participação total. Existe um mecanismo de defesa contra isso: o [vazamento de inatividade](https://eth2book.info/bellatrix/part2/incentives/inactivity). Isso é ativado sempre que a cadeia falha em finalizar por mais de quatro épocas. O vazamento de inatividade afasta o ETH envolvido dos validadores que votam contra a maioria, permitindo que a maioria recupere uma maioria de dois terços e finalize a cadeia.

## Segurança criptoeconômica {#crypto-economic-security}

A execução de um validador é um compromisso. Espera-se que o validador mantenha hardware e conectividade suficientes para participar da validação e proposta de bloco. Em troca, o validador é pago em ETH (seu saldo colocado aumenta). Por outro lado, participar como validador também abre novos caminhos para os usuários atacarem a rede para ganho pessoal ou sabotagem. Para evitar isso, os validadores perdem as recompensas de ETH se não participarem quando chamados, e sua participação existente pode ser destruída ao se comportarem de forma desonesta. Dois comportamentos principais podem ser considerados desonestos: propor múltiplos blocos em um único espaço (equívoco) e apresentar atestações contraditórias.

A quantidade de ETH reduzida depende de quantos validadores também estão sendo removidos ao mesmo tempo. Isso é conhecido como ["penalidade de correlação"](https://eth2book.info/bellatrix/part2/incentives/slashing#the-correlation-penalty) e pode ser menor (em torno de ~1% de participação para um único validador reduzido por si só) ou pode resultar na destruição de 100% da participação do validador (evento de remoção em massa). É imposto no meio de um período de saída forçada que começa com uma penalidade imediata (até 1 ETH) no dia 1, a penalidade de correlação no dia 18 e, finalmente, a ejeção da rede no dia 36. Os validadores recebem todos os dias pequenas penalidades de atestações porque estão presentes na rede, mas não enviam votos. Tudo isso significa que um ataque coordenado seria muito caro para o invasor.

## Escolha da bifurcação {#fork-choice}

Quando a rede funciona de maneira otimizada e honesta, há apenas um novo bloco no início da cadeia, e todos os validadores o atestam. No entanto, é possível que os validadores tenham visões diferentes do cabeçalho da cadeia devido à latência de rede ou porque um proponente de bloco se equivocou. Portanto, os clientes de consenso exigem um algoritmo para decidir qual deles favorecer. O algoritmo usado na prova de participação do Ethereum se chama [LMD-GHOST](https://arxiv.org/pdf/2003.03052.pdf) e funciona identificando a bifurcação que tem o maior peso de atestações em seu histórico.

## Prova de participação e segurança {#pos-and-security}

A ameaça de um [ataque de 51%](https://www.investopedia.com/terms/1/51-attack.asp) ainda existe na prova de participação, como na prova de trabalho, mas ainda é mais arriscada para os invasores. Um invasor precisaria de 51% do ETH colocado em participação. Eles poderiam então usar suas próprias atestações para garantir que sua bifurcação preferida fosse aquela com o maior número de atestações acumuladas. O “peso” das atestações acumuladas é o que os clientes de consenso usam para determinar a cadeia correta, de modo que esse invasor conseguiria tornar sua bifurcação a opção padrão. No entanto, um ponto forte da prova de participação sobre a prova de trabalho é que a comunidade tem flexibilidade para montar um contra-ataque. Por exemplo, os validadores honestos podem decidir continuar construindo a cadeia minoritária e ignorar a bifurcação do invasor enquanto encorajam aplicativos, agências de câmbio e pools a fazerem o mesmo. Eles também podem decidir remover forçadamente o invasor da rede e destruir o ETH colocado em participação. Estas são defesas econômicas fortes contra um ataque de 51%.

Além dos ataques de 51%, agentes maliciosos também podem tentar outros tipos de atividades prejudiciais, como:

- ataques de longo prazo (embora o gadget de finalização neutralize esse vetor de ataque)
- reorganizações de curto prazo (embora o reforço do proponente e os prazos de atestação mitiguem isso)
- ataques de "bouncing" e "balancing" (também mitigados pelo reforço do proponente, e esses ataques, de qualquer forma, foram demonstrados apenas em condições de rede idealizadas)
- ataques de avalanche (neutralizados pela regra dos algoritmos de escolha de fork de considerar apenas a mensagem mais recente)

No geral, a prova de participação, conforme implementada no Ethereum, demonstrou ser economicamente mais segura do que a prova de trabalho.

## Prós e contras {#pros-and-cons}

| Prós                                                                                                                                                                                                                                      | Contras                                                                                                 |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| O staking facilita a participação dos indivíduos na segurança da rede, promovendo a descentralização. o nó validador pode ser executado em um laptop normal. Os pools de participação permitem que os usuários participem sem ter 32 ETH. | A prova de participação é mais recente e menos testada na prática em comparação com a prova de trabalho |
| A participação é mais descentralizada, As economias de escala não se aplicam da mesma forma que para a mineração de PoW.                                                                                                                  | A prova de participação é mais complexa de implementar do que a prova de trabalho                       |
| A prova de participação oferece maior segurança criptoeconômica do que a prova de trabalho                                                                                                                                                | Os usuários precisam executar três softwares para participar da prova de participação do Ethereum.      |
| É necessário emitir uma quantidade menor de novos ETH para incentivar os participantes da rede                                                                                                                                            |                                                                                                         |

### Comparação com a prova de trabalho {#comparison-to-proof-of-work}

O Ethereum originalmente usava prova de trabalho, mas mudou para prova de participação em setembro de 2022. A PoS oferece várias vantagens sobre a PoW, como:

- melhor eficiência energética – não há necessidade de usar muita energia em cálculos de prova de trabalho
- barreiras de entrada mais baixas, requisitos de hardware reduzidos — não há necessidade de hardware de elite para ter a possibilidade de criar novos blocos
- risco de centralização reduzido — a prova de participação deve levar a mais nós protegendo a rede
- devido à baixa necessidade de energia, é necessário emitir menos ETH para incentivar a participação
- as penalidades econômicas por mau comportamento tornam os custos de ataques 51% mais caros para um invasor em comparação com a prova de trabalho
- a comunidade pode recorrer à recuperação social de uma cadeia honesta se um ataque de 51% tiver que superar as defesas criptoeconômicas.

## Leitura adicional {#further-reading}

- [Perguntas frequentes sobre prova de participação](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html) _Vitalik Buterin_
- [O que é prova de participação](https://consensys.net/blog/blockchain-explained/what-is-proof-of-stake/) _ConsenSys_
- [O que prova de participação é por que é importante](https://bitcoinmagazine.com/culture/what-proof-of-stake-is-and-why-it-matters-1377531463) _Vitalik Buterin_
- [Por que a prova de participação (nov. de 2020)](https://vitalik.eth.limo/general/2020/11/06/pos2020.html) _Vitalik Buterin_
- [Prova da participação: como aprendi a amar a pouca subjetividade](https://blog.ethereum.org/2014/11/25/proof-stake-learned-love-weak-subjectivity/) _Vitalik Buterin_
- [Ataque e defesa da prova de participação do Ethereum](https://mirror.xyz/jmcook.eth/YqHargbVWVNRQqQpVpzrqEQ8IqwNUJDIpwRP7SS5FXs)
- [A filosofia por trás do design da prova de participação](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51) _Vitalik Buterin_
- [Vídeo: Vitalik buterin explica a prova de participação para Lex Fridman](https://www.youtube.com/watch?v=3yrqBG-7EVE)

## Tópicos relacionados {#related-topics}

- [Prova de trabalho](/developers/docs/consensus-mechanisms/pow/)
- [Prova de autoridade](/developers/docs/consensus-mechanisms/poa/)
